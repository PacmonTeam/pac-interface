import { BASE_API } from "@/config/url";
import {
  ContractWithConverted,
  FunctionOnConfiguration,
  ICompileContractOutput,
  NodeWithSigner,
} from "../types";
import { useState } from "react";

export const useCallContract = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const callContract =
    (
      compliedContract: ICompileContractOutput,
      contract: ContractWithConverted,
      fn: FunctionOnConfiguration,
      node: NodeWithSigner
    ) =>
    async (...args: (string | boolean)[]) => {
      setLoading(true);
      try {
        const encodedData = compliedContract[
          contract.configurationJson.contractName
        ].contractFactory.interface.encodeFunctionData(fn.name, args);

        const response = await fetch(`${BASE_API}/nodes/call`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nodeId: node.id,
            contractAddress: contract.address,
            encodedData,
            callerAddress: node.signers[0].address,
          }),
        });

        if (!response.ok) {
          throw response;
        }
        return response.json();
      } catch (error: any) {
        console.error("😐 call function fail =:", error);
      } finally {
        setLoading(false);
      }
    };
  return { call: callContract, loading };
};
