import {
  Button,
  Snippet,
  Divider,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";

import { ActiveStatus } from "@/components/node/NodeList";
import { formatDate } from "@/lib/formatDate";
import { NodeWithSigner } from "@/lib/types";

import { SiSolidity } from "react-icons/si";

interface ManageNodeHeaderProps {
  node: NodeWithSigner;
  onSelectContract: (address: string) => void;
  openSlide: (value: boolean) => void;
}

export default function ManageNodeHeader({
  node,
  onSelectContract,
  openSlide,
}: ManageNodeHeaderProps) {
  return (
    <>
      <div className="grid grid-cols-12 mx-auto w-full px-5 pb-6">
        <div className="col-span-10">
          <div className="flex justify-start">
            <div className="pr-4">
              <h1 className="flex text-3xl font-thin uppercase">
                Node / <span className="font-medium pl-2">{node.name}</span>
              </h1>
            </div>
            <div className="flex justify-start items-center">
              <ActiveStatus />
            </div>
          </div>
          <div className="flex mt-2 flex-row space-x-2">
            <div className="flex items-center text-sm">
              <Snippet className="w-full" size="sm">
                {node.rpc}
              </Snippet>
            </div>
            <div className="flex pl-2 items-center text-sm font-medium text-default-600">
              {node.project.name}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              Created on {formatDate(node.createdAt)}
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <Dropdown showArrow>
            <DropdownTrigger>
              <Button color="warning" size="sm" startContent={<SiSolidity />}>
                Deployed Contract
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Deployed Contract!"
              onAction={(key) => {
                onSelectContract(key.toString());
              }}
            >
              <DropdownSection title="Contracts">
                {node.contracts.map((contract) => (
                  <DropdownItem
                    key={contract.address}
                    description={contract.address}
                  >
                    {contract.name}
                  </DropdownItem>
                ))}
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
          <Button variant="bordered" size="sm" onPress={() => openSlide(true)}>
            Generated Wallets
          </Button>
        </div>
      </div>
      <Divider />
    </>
  );
}
