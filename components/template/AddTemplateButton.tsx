import { TemplateType } from "@/lib/types";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { IoIosArrowDropdown } from "react-icons/io";

interface AddTemplateButtonProps {
  onClick: (c: TemplateType) => void;
}

export default function AddTemplateButton({ onClick }: AddTemplateButtonProps) {
  const getTemplateTypes = (): TemplateType[] => {
    return Object.values(TemplateType);
  };
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">
            Add Template&nbsp;
            <IoIosArrowDropdown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          {getTemplateTypes().map((templateType) => {
            // TODO: scroll to the bottom when template is clicked
            return (
              <DropdownItem
                key={templateType}
                onClick={() => onClick(templateType)}
              >
                {templateType}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
