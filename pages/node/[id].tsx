import { Spinner, Snippet, Input, Button } from "@nextui-org/react";
import { useRouter } from "next/router";

import { useManageNode } from "@/lib/useManageNode";
import { Contract, NodeWithSigner } from "@/lib/types";
import ManageNodeHeader from "@/components/node/ManageNodeHeader";
import { convertYAMLStringToJson } from "@/lib/utils";
import { useEffect, useState } from "react";
import { TbFaceIdError } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

interface ContractWithConverted extends Contract {
  configurationJson: { [key: string]: any };
}

interface ContractList {
  [address: string]: ContractWithConverted;
}

const mockManageFunctions = [
  {
    name: "mint",
    arguments: [
      {
        name: "to",
        type: "address",
      },
      { name: "amount", type: "uint256" },
    ],
  },
  {
    name: "transfer",
    arguments: [
      {
        name: "to",
        type: "address",
      },
      { name: "amount", type: "uint256" },
    ],
  },
];

export default function Page() {
  const router = useRouter();
  const nodeId = router.query.id;
  const { data: node, isLoading } = useManageNode<NodeWithSigner>(nodeId);
  const [convertedContract, setConvertedContract] = useState<ContractList>();
  const [selectedContractAddress, setSelectedContractAddress] =
    useState<string>("");

  useEffect(() => {
    if (!selectedContractAddress && node) {
      setSelectedContractAddress(node.contracts[0]?.address);
    }
    if (node) {
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
  }, [node, selectedContractAddress]);

  if (isLoading || !node) {
    return <Spinner color="default" />;
  }

  const renderContractContent = () => {
    // if (!selectedContractAddress) {
    //   return <Spinner color="default" />;
    // }

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
    console.log("selectedContract =:", selectedContract);

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
    return (
      <div className="mt-8 grid grid-cols-6 gap-6 px-0">
        {mockManageFunctions.map((manageFn, index) => {
          return (
            <>
              <div key={index} className="text-sm font-extralight leading-6">
                <>
                  <span className="text-default-500 pr-2">{index + 1}.</span>
                  <span className="font-medium">{manageFn.name}</span>
                </>
                <div className="mt-2">
                  <Button size="sm" startContent={<TfiWrite />}>
                    Call
                  </Button>
                </div>
              </div>
              <div className="text-sm col-span-5 mt-0">
                <ul className="divide-y divide-gray-100/50 rounded-md border border-gray-200/50">
                  {manageFn.arguments.map((arg, argIndex) => {
                    const label = `${arg.name} (${arg.type})`;
                    return (
                      <li
                        key={argIndex}
                        className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                      >
                        <div className="flex w-0 flex-1 items-center">
                          <span className="truncate text-medium pr-2">
                            {label}
                          </span>
                          <span className="text-danger">*</span>
                        </div>
                        <div className="flex-shrink-0 flex-1">
                          <Input label={label} size="sm" />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
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
        />
        <div className="px-5 mt-2 flex w-full flex-col">
          {renderContractContent()}
          {renderManageFunctions()}
        </div>
      </div>
    </div>
  );
}
