import { Input, Skeleton } from "@nextui-org/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMemo, useState } from "react";
import { Address, useAccount } from "wagmi";
import { isAddress } from "web3-validator";
import { DemoData, useDemo } from "./useDemo";

interface DemoDataDisplayProps {
  data: DemoData;
}
const DemoDataDisplay = ({ data }: DemoDataDisplayProps) => {
  return (
    <div className="w-full">
      <div className="text-xl">
        {data.tokenInfo.token0.symbol}-{data.tokenInfo.token1.symbol} Balance
        Pool
      </div>
      <div className="flex text-lg justify-center gap-4"></div>
    </div>
  );
};

interface DemoInteractionProps {
  contractAddress: Address;
}
const DemoInteraction = (props: DemoInteractionProps) => {
  const demo = useDemo(props.contractAddress);
  const loading = useMemo(() => {
    return (
      demo.config.isLoading || demo.tokenInfo.isLoading || demo.info.isLoading
    );
  }, [demo.config.isLoading, demo.tokenInfo.isLoading, demo.info.isLoading]);
  return (
    <div className="w-full text-center">
      {loading ? (
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg" />
        </Skeleton>
      ) : (
        <div className="w-full">
          <div className="text-2xl">
            {demo.tokenInfo.result.token0.symbol}-
            {demo.tokenInfo.result.token1.symbol} Balance Pool
          </div>
          <div className="flex text-lg justify-center gap-4"></div>
        </div>
      )}
    </div>
  );
};

export default function DemoApp() {
  const [contractAddressTouched, setContractAddressTouched] =
    useState<boolean>(false);
  const [contractAddress, setContractAddress] = useState<string>("");

  const account = useAccount();

  const addressInvalid = useMemo(
    () => contractAddressTouched && !isAddress(contractAddress),
    [contractAddressTouched, contractAddress]
  );

  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-full text-center text-default-700 text-6xl mt-4">
        PACMO
      </div>
      <div className="w-full text-center text-default-500/80 text-lg">
        PACMON Demo
      </div>
      <div className="flex w-full justify-center mt-8">
        <ConnectButton />
      </div>

      <div className="flex w-full justify-center max-w-lg mt-4 mb-16">
        <Input
          label="PacDemo Contact Address"
          placeholder="0x"
          type="text"
          size="lg"
          value={contractAddress}
          onValueChange={(value) => {
            if (!contractAddressTouched) setContractAddressTouched(true);
            setContractAddress(value);
          }}
          isInvalid={addressInvalid}
          errorMessage={addressInvalid ? "Not a valid ethereum address" : null}
        />
      </div>

      {account.isConnected && isAddress(contractAddress) ? (
        <DemoInteraction contractAddress={contractAddress as Address} />
      ) : null}
    </div>
  );
}
