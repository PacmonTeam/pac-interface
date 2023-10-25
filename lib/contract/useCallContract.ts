import { BASE_API } from "@/config/url";
import {
  Contract,
  FunctionOnConfiguration,
  ICompileContractOutput,
  Node,
} from "../types";

export const useCallContract = () => {
  const callContract =
    (
      compliedContract: ICompileContractOutput,
      contract: Contract,
      fn: FunctionOnConfiguration,
      node: Node,
      callerAddress: string
    ) =>
    async (...args: string[]) => {
      const encodedData = compliedContract[
        contract.name
      ].contractFactory.interface.encodeFunctionData(fn.name, args);
      console.log("🚀 turbo ~ file: example.ts:46 ~ encoded:", encodedData);
      try {
        const response = await fetch(`${BASE_API}/nodes/call`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nodeId: node.id,
            contractAddress: contract.address,
            encodedData,
            callerAddress,
          }),
        });
        console.log("🚀 call funtion success", response);
      } catch (error) {
        console.error("😐 call function fail", error);
      }
    };
  return [callContract];
};
