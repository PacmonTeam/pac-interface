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
  const contractTypeItems: Array<{ key: ContractType; text: string }> = [
    { key: ContractType.ERC_20, text: "ERC-20" },
    { key: ContractType.UNISWAP_V2, text: "UniswapV2" },
    { key: ContractType.PRICE_FEED, text: "PriceFeed" },
    { key: ContractType.CUSTOM, text: "Custom" },
  ];
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
          {contractTypeItems.map((item) => {
            return (
              <DropdownItem key={item.key} onClick={() => onClick(item.key)}>
                {item.text}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
