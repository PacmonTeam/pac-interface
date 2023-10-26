import { ContractType } from "@/lib/types";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { IoIosArrowDropdown } from "react-icons/io";

interface AddContractButtonProps {
  onClick: (c: ContractType) => void;
}

export default function AddContractButton({ onClick }: AddContractButtonProps) {
  const getContractTypes = (): ContractType[] => {
    return Object.values(ContractType);
  };
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">
            Add Contract&nbsp;
            <IoIosArrowDropdown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          {getContractTypes().map((contractType) => {
            // TODO: scroll to the bottom when contract is clicked
            return (
              <DropdownItem
                key={contractType}
                onClick={() => onClick(contractType)}
              >
                {contractType}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
