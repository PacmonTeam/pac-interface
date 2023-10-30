import { BASE_API } from "@/config/url";
import useSWR from "swr";
import {
  ICompileContractInput,
  ICompileSource,
  ICompileOutputSelection,
  Node,
  ICompileContractOutput,
  NodeWithSigner,
} from "@/lib/types";
import { ethers } from "ethers";
import _ from "lodash";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const getManageNodeById = async (
  nodeId: string
): Promise<NodeWithSigner> => {
  return fetcher(`${BASE_API}/nodes/${nodeId}`);
};

export const useManageNode = <T = Node>(nodeId: any) => {
  const {
    data,
    error,
    isLoading,
  }: { data: T; isLoading: boolean; error: any } = useSWR(
    nodeId ? `${BASE_API}/nodes/${nodeId}` : null,
    fetcher
  );

  if (error) {
    console.error(error);
  }
  return { data, error, isLoading };
};

export const useCompileContracts = () => {
  const [data, setData] = useState<ICompileContractOutput>();
  const [error, setError] = useState<string>();
  const [compiling, setCompiling] = useState<boolean>(true);

  const compile = async (contracts: ICompileContractInput) => {
    setCompiling(true);
    const worker = new Worker(new URL("./worker/worker.ts", import.meta.url), {
      type: "module",
    });
    const sources = _.reduce(
      contracts,
      (prev, code, name) => {
        prev[name] = {
          content: code,
        };
        return prev;
      },
      {} as ICompileSource
    );
    const outputSelection = _.reduce(
      contracts,
      (prev, code, name) => {
        prev[name] = {
          [name]: ["*"],
        };
        return prev;
      },
      {} as ICompileOutputSelection
    );

    const input = {
      language: "Solidity",
      sources: sources,
      settings: {
        outputSelection,
      },
    };

    worker.postMessage({ input });
    worker.onerror = (e: any) => {
      console.error(e);
      setCompiling(false);
    };
    worker.onmessage = (e: any) => {
      const output = e.data.output;
      if (output.errors) {
        setError(output.errors[0].message);
        return;
      }

      const out = _.reduce(
        contracts,
        (prev, code, name) => {
          const contracts = output.contracts;
          const bytecode = contracts[name][name].evm.bytecode.object;
          prev[name] = {
            bytecode,
            contractFactory: ethers.ContractFactory.fromSolidity(
              contracts[name][name]
            ),
          };
          return prev;
        },
        {} as ICompileContractOutput
      );
      setData(out);
      setCompiling(false);
    };
  };

  return { compile, data, error, compiling };
};
