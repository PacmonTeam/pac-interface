import { Snippet } from "@nextui-org/react";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import { TbFaceIdError } from "react-icons/tb";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import { useCompileContracts, getManageNodeById } from "@/lib/useManageNode";
import {
  ContractWithConverted,
  FunctionOnConfiguration,
  ICompileContractInput,
  NodeWithSigner,
} from "@/lib/types";
import ManageNodeHeader from "@/components/node/ManageNodeHeader";
import { convertYAMLStringToJson } from "@/lib/utils";
import PreparingData from "@/components/node/PreparingData";
import FunctionPanel from "@/components/node/FunctionPanel";
import { useCallContract } from "@/lib/contract/useCallContract";
import GeneratedWalletSlide from "@/components/node/GeneratedWalletSlide";
import { getNodes } from "@/lib/useNodes";

interface ContractList {
  [address: string]: ContractWithConverted;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const nodes = await getNodes();
  const paths = nodes?.map((node) => {
    return {
      params: { id: String(node.id) },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = (async ({ params }) => {
  const nodeId = String(params?.id) || "";
  const node = await getManageNodeById(nodeId);

  return { props: { node } };
}) satisfies GetStaticProps<{
  node: NodeWithSigner;
}>;

export default function Page({
  node,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [convertedContract, setConvertedContract] = useState<ContractList>();
  const [openSlide, setOpenSlide] = useState(false);
  const router = useRouter();
  const {
    compile,
    data: compiledData,
    error: compileError,
    compiling: isCompiling,
  } = useCompileContracts();
  const [selectedContractAddress, setSelectedContractAddress] =
    useState<string>("");
  const { call, loading: calling } = useCallContract();

  useEffect(() => {
    if (!selectedContractAddress && node?.id) {
      setSelectedContractAddress(node.contracts[0]?.address);
    }
    if (node?.id) {
      const convertedNode = node.contracts.reduce<ContractList>(
        (prev, contract) => {
          prev[contract.address] = {
            configurationJson: convertYAMLStringToJson(contract.configuration),
            ...contract,
          };
          return prev;
        },
        {}
      );
      setConvertedContract(convertedNode);
    }
  }, [node]);

  useEffect(() => {
    (async () => {
      if (convertedContract) {
        const convertedNodeByContractName = Object.keys(
          convertedContract
        ).reduce<ICompileContractInput>((prev, key) => {
          const cotract = convertedContract[key];
          prev[cotract.configurationJson.contractName] = cotract.script;
          return prev;
        }, {});
        await compile(convertedNodeByContractName);
      }
    })();
  }, [convertedContract]);

  if (!router.isFallback && !node?.id) {
    return (
      <ErrorPage
        statusCode={404}
        title={`Node (ID=${router.query.id?.toString()}) could not be found. Please check your Node ID`}
      />
    );
  }

  if (!node?.id || isCompiling) {
    return (
      <PreparingData
        isPluginsLoading={!node?.id}
        isProjectLoading={!node?.id}
        isCompiling={isCompiling || !compiledData}
      />
    );
  }
  const renderContractContent = () => {
    if (!convertedContract || node.contracts?.length === 0) {
      return (
        <div className="rounded-lg border border-dashed border-neutral-50/50 bg-transparent p-4">
          <div className="w-full text-default-500/80">
            <div className="flex justify-center items-center">
              <TbFaceIdError size="50" />
            </div>
            <div className="flex justify-center items-center text-xs font-bold">
              Deployed Contract is empty!
            </div>
          </div>
        </div>
      );
    }
    const selectedContract = convertedContract[selectedContractAddress];

    return (
      <div className="flex items-center w-full justify-between mt-6">
        <div className="flex flex-row justify-center items-center">
          <div className="pr-2 flex justify-center items-center">
            <Jazzicon
              diameter={30}
              seed={jsNumberForAddress(selectedContract.address)}
            />
          </div>
          <span className="text-3xl font-medium uppercase">
            {selectedContract.name}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-light mb-1 text-default-500">
            Contract Address
          </span>
          <Snippet size="sm" symbol=" ">
            {selectedContract.address}
          </Snippet>
        </div>
      </div>
    );
  };

  const renderManageFunctions = () => {
    if (!convertedContract) {
      return;
    }
    const selectedContract = convertedContract[selectedContractAddress];
    const manage = selectedContract.configurationJson.manage;

    if (!manage || manage?.functions.length === 0) {
      return (
        <div className="rounded-lg mt-8 border border-dashed border-neutral-50/50 bg-transparent p-4">
          <div className="w-full text-default-500/80">
            <div className="flex justify-center items-center">
              <TbFaceIdError size="50" />
            </div>
            <div className="flex justify-center items-center text-xs font-bold">
              Manageable function not found
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="mt-8 px-0 gap-2 flex flex-col">
        {manage?.functions.map((fn: FunctionOnConfiguration, index: number) => {
          return (
            <FunctionPanel
              no={index + 1}
              fn={fn}
              key={index}
              calling={calling}
              selectedContractAddress={selectedContractAddress}
              onCall={async (...args) => {
                if (compiledData) {
                  await call(compiledData, selectedContract, fn, node)(...args);
                }
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex w-full justify-center">
      <div className="container max-w-[1024px] gap-4 relative">
        <ManageNodeHeader
          node={node}
          onSelectContract={(address) => setSelectedContractAddress(address)}
          openSlide={setOpenSlide}
        />
        <div className="px-5 mt-2 flex w-full flex-col">
          {renderContractContent()}
          {renderManageFunctions()}
        </div>
      </div>
      <GeneratedWalletSlide
        open={openSlide}
        setOpen={setOpenSlide}
        node={node}
      />
    </div>
  );
}
