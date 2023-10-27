import { useAccount, useContractReads } from "wagmi";
import { useEffect } from "react";

import { abi as PacDemoABI } from "./abi/PacDemo";
import { abi as PacERC20ABI } from "./abi/PacERC20";
import { abi as PacPriceFeedABI } from "./abi/PacPriceFeed";
import { abi as PacUniswapV2PairABI } from "./abi/PacUniswapV2Pair";

interface DemoContract {
  abi: typeof PacDemoABI;
  address: `0x${string}`;
}
interface TokenContract {
  abi: typeof PacERC20ABI;
  address: `0x${string}`;
}
interface PairContract {
  abi: typeof PacUniswapV2PairABI;
  address: `0x${string}`;
}

interface DemoConfig {
  token0?: `0x${string}`;
  token1?: `0x${string}`;
  pair?: `0x${string}`;
  pricefeed0?: `0x${string}`;
  pricefeed1?: `0x${string}`;
}

const useDemoConfig = (demoContract: DemoContract) => {
  const { data, isError, isLoading, refetch } = useContractReads({
    contracts: [
      {
        ...demoContract,
        functionName: "token0",
      },
      {
        ...demoContract,
        functionName: "token1",
      },
      {
        ...demoContract,
        functionName: "pair",
      },
      {
        ...demoContract,
        functionName: "pricefeed0",
      },
      {
        ...demoContract,
        functionName: "pricefeed1",
      },
    ],
  });
  useEffect(() => {
    refetch();
  }, [refetch, demoContract.address]);
  const result: DemoConfig = data
    ? {
        token0: data[0].result,
        token1: data[1].result,
        pair: data[2].result,
        pricefeed0: data[3].result,
        pricefeed1: data[4].result,
      }
    : {};

  return {
    result,
    isError,
    isLoading,
    refetch,
  };
};

interface DemoTokenInfo {
  token0: {
    name?: string;
    symbol?: string;
    decimals?: bigint;
  };
  token1: {
    name?: string;
    symbol?: string;
    decimals?: bigint;
  };
  pair: {
    reserve0?: bigint;
    reserve1?: bigint;
  };
}

const useDemoTokenInfo = (demoConfig: DemoConfig) => {
  const token0Contract: TokenContract = {
    abi: PacERC20ABI,
    address: demoConfig.token0 || "0x",
  };
  const token1Contract: TokenContract = {
    abi: PacERC20ABI,
    address: demoConfig.token1 || "0x",
  };
  const pairContract: PairContract = {
    abi: PacUniswapV2PairABI,
    address: demoConfig.pair || "0x",
  };
  const { data, isError, isLoading, refetch } = useContractReads({
    contracts: [
      {
        ...token0Contract,
        functionName: "name",
      },
      {
        ...token0Contract,
        functionName: "symbol",
      },
      {
        ...token0Contract,
        functionName: "decimals",
      },
      {
        ...token1Contract,
        functionName: "name",
      },
      {
        ...token1Contract,
        functionName: "symbol",
      },
      {
        ...token1Contract,
        functionName: "decimals",
      },
      {
        ...pairContract,
        functionName: "getReserves",
      },
    ],
  });
  useEffect(() => {
    refetch();
  }, [refetch, token0Contract.address, token1Contract.address]);
  const result: DemoTokenInfo = data
    ? {
        token0: {
          name: data[0].result,
          symbol: data[1].result,
          decimals: BigInt(data[2].result || 0),
        },
        token1: {
          name: data[3].result,
          symbol: data[4].result,
          decimals: BigInt(data[5].result || 0),
        },
        pair: {
          reserve0: data[6].result ? BigInt(data[6].result[0]) : undefined,
          reserve1: data[6].result ? BigInt(data[6].result[1]) : undefined,
        },
      }
    : {
        token0: {
          name: "",
          symbol: "",
          decimals: 0n,
        },
        token1: {
          name: "",
          symbol: "",
          decimals: 0n,
        },
        pair: {
          reserve0: 0n,
          reserve1: 0n,
        },
      };

  return {
    result,
    isError,
    isLoading,
    refetch,
  };
};

interface DemoInfo {
  price0?: bigint;
  price1?: bigint;
  ammPrice0?: bigint;
  ammPrice1?: bigint;
  value0?: bigint;
  value1?: bigint;
  balance0?: bigint;
  balance1?: bigint;
  depositEnabled?: boolean;
  withdrawEnabled?: boolean;
}

const useDemoInfo = (demoContract: DemoContract) => {
  const account = useAccount();
  const { data, isError, isLoading, refetch } = useContractReads({
    staleTime: 1000 * 1,
    watch: true,
    contracts: [
      {
        ...demoContract,
        functionName: "getPrices",
      },
      {
        ...demoContract,
        functionName: "getAMMPrices",
      },
      {
        ...demoContract,
        functionName: "getValues",
        args: [account.address!],
      },
      {
        ...demoContract,
        functionName: "balances0",
        args: [account.address!],
      },
      {
        ...demoContract,
        functionName: "balances1",
        args: [account.address!],
      },
      {
        ...demoContract,
        functionName: "depositEnabled",
      },
      {
        ...demoContract,
        functionName: "withdrawEnabled",
      },
    ],
  });

  useEffect(() => {
    refetch();
  }, [refetch, demoContract.address, account.address]);

  const result: DemoInfo = data
    ? {
        price0: data[0].result ? BigInt(data[0].result[0]) : undefined,
        price1: data[0].result ? BigInt(data[0].result[1]) : undefined,
        ammPrice0: data[1].result ? BigInt(data[1].result[0]) : undefined,
        ammPrice1: data[1].result ? BigInt(data[1].result[1]) : undefined,
        value0: data[2].result ? BigInt(data[2].result[0]) : undefined,
        value1: data[2].result ? BigInt(data[2].result[1]) : undefined,
        balance0: data[3].result ? BigInt(data[3].result) : undefined,
        balance1: data[4].result ? BigInt(data[4].result) : undefined,
        depositEnabled: data[5].result,
        withdrawEnabled: data[6].result,
      }
    : {};

  return {
    result,
    isError,
    isLoading,
    refetch,
  };
};

export interface DemoData {
  config: DemoConfig;
  tokenInfo: DemoTokenInfo;
  info: DemoInfo;
}

export const useDemo = (contractAddress: `0x${string}`) => {
  const account = useAccount();

  const demoContract = {
    abi: PacDemoABI,
    address: contractAddress,
  };

  const demoConfig = useDemoConfig(demoContract);
  const demoTokenInfo = useDemoTokenInfo(demoConfig.result);
  const demoInfo = useDemoInfo(demoContract);

  return {
    config: demoConfig,
    tokenInfo: demoTokenInfo,
    info: demoInfo,
  };
};
