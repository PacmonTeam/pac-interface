import { BASE_API } from "@/config/url";
import {
  ContractWithConverted,
  FunctionOnConfiguration,
  ICompileContractOutput,
  NodeWithSigner,
} from "../types";
import { toast } from "react-toastify";
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
    async (...args: string[]) => {
      setLoading(true);
      const tId = toast.loading(`Calling function "${fn.name}"`);
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
        console.log("🚀 call function success", response);
        toast.update(tId, {
          render: `Call function "${fn.name}" success!`,
          type: "success",
          icon: "🌈",
          autoClose: 8000,
          closeOnClick: true,
          isLoading: false,
        });
      } catch (error: any) {
        console.error("😐 call function fail =:", error);
        toast.update(tId, {
          render: `Call function(${fn.name}) fail!`,
          type: "error",
          icon: "😐",
          autoClose: 8000,
          closeOnClick: true,
          isLoading: false,
        });
      } finally {
        setLoading(false);
      }
    };
  return { call: callContract, loading };
};
