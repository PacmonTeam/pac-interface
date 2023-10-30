import { useContractWrite } from "wagmi";
import { abi as PacDemoABI } from "./abi/PacDemo";
import { abi as PacERC20ABI } from "./abi/PacERC20";

interface DemoContract {
  abi: typeof PacDemoABI;
  address: `0x${string}`;
}

export const useDemoBalance = (demoContractAddress: `0x${string}`) => {
  const demoContract: DemoContract = {
    address: demoContractAddress,
    abi: PacDemoABI,
  };
  const balance = useContractWrite({
    ...demoContract,
    functionName: "balance",
  });

  return {
    balance,
  };
};

export const useDemoInteraction = (
  demoContractAddress: `0x${string}`,
  tokenAddress: `0x${string}`
) => {
  const demoContract: DemoContract = {
    address: demoContractAddress,
    abi: PacDemoABI,
  };
  const tokenContract = {
    address: tokenAddress,
    abi: PacERC20ABI,
  };

  const approveToken = useContractWrite({
    ...tokenContract,
    functionName: "approve",
  });
  const deposit = useContractWrite({
    ...demoContract,
    functionName: "deposit",
  });
  const withdraw = useContractWrite({
    ...demoContract,
    functionName: "withdraw",
  });
  return {
    approveToken,
    deposit,
    withdraw,
  };
};
