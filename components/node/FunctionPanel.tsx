import {
  FunctionArgument,
  FunctionOnConfiguration,
  ArgumentType,
} from "@/lib/types";
import { SiSolidity } from "react-icons/si";
import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { isAddress } from "web3-validator";
import Web3 from "web3";

interface FunctionPanelProps {
  no: number;
  fn: FunctionOnConfiguration;
  calling: boolean;
  selectedContractAddress: string;
  onCall: (...args: string[]) => void;
}

interface ArgumentInputProps {
  isInvalid: boolean;
  value: string;
  arg: FunctionArgument;
  setIsInvalid: (value: boolean) => void;
  setValue: (value: string) => void;
}

const validator = (type: ArgumentType, value: string): boolean => {
  if (type === ArgumentType.address) {
    return isAddress(value);
  }
  if (type === ArgumentType.uint256) {
    try {
      Web3.utils.toBigInt(value);
      return true;
    } catch {
      return false;
    }
  }
  return false;
};

function ArgumentInput({
  arg,
  value,
  setValue,
  isInvalid,
  setIsInvalid,
}: ArgumentInputProps) {
  const label = `${arg.name} (${arg.type})`;

  const onValueChange = (value: string) => {
    const isValid = validator(arg.type, value);
    setIsInvalid(!isValid);
    setValue(value);
  };

  return (
    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
      <div className="flex w-0 flex-1 items-center">
        <span className="truncate text-medium pr-2">{label}</span>
        <span className="text-danger">*</span>
      </div>
      <div className="flex-shrink-0 flex-1">
        <Input
          label={label}
          size="sm"
          value={value || ""}
          isInvalid={isInvalid}
          errorMessage={isInvalid && `invalid argument type (${arg.type})`}
          onValueChange={onValueChange}
        />
      </div>
    </li>
  );
}

export default function FunctionPanel({
  no,
  fn,
  onCall,
  calling,
  selectedContractAddress,
}: FunctionPanelProps) {
  const [args, setArgs] = useState<string[]>([]);
  const [argValues, setArgValues] = useState<string[]>(args.map(() => ""));
  const [isInvalids, setIsInvalids] = useState<boolean[]>(
    args.map(() => false)
  );
  const [prevSelectedContractAddress, setPrev] = useState<string>();
  useEffect(() => {
    console.log(
      "selectedContractAddress =",
      selectedContractAddress,
      prevSelectedContractAddress,
      prevSelectedContractAddress !== selectedContractAddress
    );
    if (prevSelectedContractAddress !== selectedContractAddress) {
      const tmpIsInvalids = fn.arguments.map(() => false);
      setArgs([]);
      setIsInvalids(tmpIsInvalids);
      setPrev(selectedContractAddress);
    }
  }, [selectedContractAddress]);

  const onCallValidate = () => {
    const inValidList = fn.arguments.map((arg, index) => {
      const value = args[index];
      const isValid = validator(arg.type, value);
      return !isValid;
    });
    setIsInvalids(inValidList);
    return;
  };

  return (
    <div key={no} className="grid grid-cols-6 gap-6">
      <div className="text-sm font-extralight leading-6">
        <>
          <span className="text-default-500 pr-2">{no}.</span>
          <span className="font-medium">{fn.name}</span>
        </>
        <div className="mt-2">
          <Button
            size="sm"
            startContent={<SiSolidity />}
            onPress={() => {
              onCallValidate();
              onCall(...args);
            }}
            isLoading={calling}
          >
            Call
          </Button>
        </div>
      </div>
      <div className="text-sm col-span-5 mt-0">
        <ul className="divide-y divide-gray-100/50 rounded-md border border-gray-200/50">
          {fn.arguments.map((arg, argIndex) => (
            <ArgumentInput
              key={argIndex}
              arg={arg}
              value={args[argIndex]}
              isInvalid={isInvalids[argIndex]}
              setIsInvalid={(isInvalid) => {
                setIsInvalids((prev) => {
                  const tmp = [...prev];
                  tmp[argIndex] = isInvalid;
                  return tmp;
                });
              }}
              setValue={(value) => {
                setArgs((prev) => {
                  const tmp = [...prev];
                  tmp[argIndex] = value;
                  return tmp;
                });
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
