import {
  FunctionArgument,
  FunctionOnConfiguration,
  ArgumentType,
} from "@/lib/types";
import { TfiWrite } from "react-icons/tfi";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { isAddress, isBigInt, isNumber } from "web3-validator";
import Web3 from "web3";

interface FunctionPanelProps {
  no: number;
  fn: FunctionOnConfiguration;
  onCall: (...args: string[]) => void;
}

interface ArgumentInputProps {
  arg: FunctionArgument;
  onChange?: (value: string) => void;
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

function ArgumentInput({ arg, onChange }: ArgumentInputProps) {
  // TODO: validate type on input : address, uint256
  const [value, setValue] = useState<string>();
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const label = `${arg.name} (${arg.type})`;
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
          onValueChange={(value) => {
            const isValid = validator(arg.type, value);
            setIsInvalid(!isValid);
            setValue(value);
            if (onChange) {
              onChange(value);
            }
          }}
        />
      </div>
    </li>
  );
}

export default function FunctionPanel({ no, fn, onCall }: FunctionPanelProps) {
  const [args, setArgs] = useState<string[]>([]);
  console.log("args =:", args);
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
            startContent={<TfiWrite />}
            onPress={() => {
              onCall(...args);
            }}
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
              onChange={(value) => {
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
