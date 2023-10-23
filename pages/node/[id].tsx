import { Spinner, Snippet, Tab, Tabs } from "@nextui-org/react";
import { useRouter } from "next/router";

import { useManageNode } from "@/lib/useManageNode";
import { Contract, NodeWithSigner } from "@/lib/types";
import ManageNodeHeader from "@/components/node/ManageNodeHeader";
import { convertYAMLStringToJson } from "@/lib/utils";
import { useEffect, useState } from "react";
import { TbFaceIdError } from "react-icons/tb";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

interface ContractWithConverted extends Contract {
  configurationJson: { [key: string]: any };
}

interface ContractList {
  [address: string]: ContractWithConverted;
}

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

  const renderManageContract = () => {
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

  return (
    <div className="flex w-full justify-center">
      <div className="container max-w-[1024px] gap-4 relative">
        <ManageNodeHeader
          node={node}
          onSelectContract={(address) => setSelectedContractAddress(address)}
        />
        <div className="px-5 mt-2 flex w-full flex-col">
          {renderManageContract()}
        </div>
      </div>
    </div>
  );
}
