import { Snippet } from "@nextui-org/react";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import { TbFaceIdError } from "react-icons/tb";

import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { toast } from "react-toastify";
import { Link } from "@nextui-org/react";

import { useCompileContracts, useManageNode } from "@/lib/useManageNode";
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

interface ContractList {
  [address: string]: ContractWithConverted;
}

const ToastFeedBack = ({
  message,
  txHash,
}: {
  message: string;
  txHash?: string;
}) => {
  return (
    <div className="flex flex-col">
      <div className="font-light ">{message}</div>
      {txHash && (
        <Link
          size="sm"
          isExternal
          color="success"
          href={`https://explorer.pacmon.suijin.xyz/tx/${txHash}`}
          showAnchorIcon
        >
          View on explorer
        </Link>
      )}
    </div>
  );
};

export default function Page() {
  const [convertedContract, setConvertedContract] = useState<ContractList>();
  const [openSlide, setOpenSlide] = useState(false);
  const router = useRouter();
  const nodeId = String(router.query?.id || "0");
  const {
    data: node,
    isLoading,
    error: nodeDataError,
  } = useManageNode<NodeWithSigner>(nodeId);

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

  if (!node?.id && !isLoading && nodeId !== "0") {
    return (
      <ErrorPage
        statusCode={404}
        title={`Node (ID=${router.query.id?.toString()}) could not be found. Please check your Node ID`}
      />
    );
  }
  if (nodeId === "0" || isLoading || isCompiling) {
    return (
      <PreparingData
        isPluginsLoading={nodeId === "0"}
        isProjectLoading={!node?.id || isLoading}
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
          <div className="flex flex-row mb-1 text-default-500">
            <div className="text-xs font-light mr-1">Contract Address</div>
            <Link
              size="sm"
              isExternal
              color="foreground"
              showAnchorIcon
              href={`https://explorer.pacmon.suijin.xyz/address/${selectedContract.address}`}
            />
          </div>
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
                  const tId = toast.loading(`Calling function "${fn.name}"`);
                  try {
                    const result = await call(
                      compiledData,
                      selectedContract,
                      fn,
                      node
                    )(...args);
                    const txHash = result.txHash;
                    toast.update(tId, {
                      render: (
                        <ToastFeedBack
                          message={`Call function "${fn.name}" success!`}
                          txHash={txHash}
                        />
                      ),
                      type: "success",
                      icon: "🌈",
                      autoClose: 8000,
                      closeOnClick: true,
                      isLoading: false,
                    });
                  } catch (error) {
                    console.error("😐 call function fail =:", error);
                    toast.update(tId, {
                      render: (
                        <ToastFeedBack
                          message={`Call function(${fn.name}) fail!`}
                        />
                      ),
                      type: "error",
                      icon: "😐",
                      autoClose: 8000,
                      closeOnClick: true,
                      isLoading: false,
                    });
                  }
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
