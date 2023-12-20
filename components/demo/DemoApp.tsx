import { Button, Input, Skeleton, Tab, Tabs } from "@nextui-org/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useCallback, useMemo, useState } from "react";
import { Address, useAccount, useBlockNumber } from "wagmi";
import { isAddress } from "web3-validator";
import { GoDotFill } from "react-icons/go";
import { DemoIndividualTokenInfo, useDemo } from "./useDemoData";
import { formatUnits, maxUint256, parseUnits } from "viem";
import { useDemoBalance, useDemoInteraction } from "./useDemoInteraction";
import { Id, toast } from "react-toastify";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const PRICE_PRECISION = 30;

const formatBigInt = (
  value: bigint,
  decimals: number,
  significance: number = 10
) => {
  const n = Number(formatUnits(value, decimals));
  return n.toLocaleString(undefined, {
    maximumFractionDigits: significance,
  });
};

interface DemoDataDisplayProps {
  demoAddress: `0x${string}`;
  baseTokenInfo: DemoIndividualTokenInfo;
  quoteTokenInfo: DemoIndividualTokenInfo;
  balanceOf: bigint;
  allowance: bigint;
  price: bigint;
  quotePrice: bigint;
  ammPrice: bigint;
  value: bigint;
  balance: bigint;
}
const DemoTokenBox = ({
  demoAddress,
  baseTokenInfo,
  quoteTokenInfo,
  balanceOf,
  allowance,
  price,
  quotePrice,
  ammPrice,
  value,
  balance,
}: DemoDataDisplayProps) => {
  const [action, setAction] = useState<string>("deposit");
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");

  const { deposit, withdraw, approveToken } = useDemoInteraction(
    demoAddress,
    baseTokenInfo.address
  );

  const bSymbol = baseTokenInfo.symbol;
  const qSymbol = quoteTokenInfo.symbol;

  const decBalanceOf = useMemo(() => {
    return Number(formatUnits(balanceOf, Number(baseTokenInfo.decimals)));
  }, [balanceOf, baseTokenInfo.decimals]);

  const decBalance = useMemo(() => {
    return Number(formatUnits(balance, Number(baseTokenInfo.decimals)));
  }, [balance, baseTokenInfo.decimals]);

  const decAllowance = useMemo(() => {
    return Number(formatUnits(allowance, Number(baseTokenInfo.decimals)));
  }, [allowance, baseTokenInfo.decimals]);

  const shouldApproveFirst = useMemo(() => {
    return decAllowance < Number(depositAmount);
  }, [decAllowance, depositAmount]);

  const canDeposit = useMemo(() => {
    return (
      !shouldApproveFirst &&
      Number(depositAmount) <= decBalanceOf &&
      Number(depositAmount) > 0 &&
      depositAmount !== ""
    );
  }, [shouldApproveFirst, depositAmount, decBalanceOf]);

  const canWithdraw = useMemo(() => {
    return (
      Number(withdrawAmount) <= decBalance &&
      Number(withdrawAmount) > 0 &&
      withdrawAmount !== ""
    );
  }, [withdrawAmount, decBalance]);

  const onPressApprove = useCallback(async () => {
    const tId = toast.loading(`Approving ${bSymbol}`, {
      closeButton: true,
    });
    try {
      const tx = await approveToken.writeAsync({
        args: [demoAddress, maxUint256],
      });
      toast.update(tId, {
        type: "success",
        icon: "👍",
        autoClose: 8000,
        closeOnClick: true,
        isLoading: false,
        render: `Approve ${bSymbol} success: ${tx.hash}`,
      });
    } catch (err: any) {
      toast.update(tId, {
        type: "error",
        autoClose: 5000,
        closeOnClick: true,
        isLoading: false,
        render: `Approve ${bSymbol} failed`,
      });
    }
  }, [approveToken, bSymbol, demoAddress]);

  const onPressDeposit = useCallback(async () => {
    const depositAmountDisplay = Number(depositAmount).toLocaleString();
    const tId = toast.loading(`Depositing ${depositAmountDisplay} ${bSymbol}`, {
      closeButton: true,
    });
    try {
      const tx = await deposit.writeAsync({
        args: [
          baseTokenInfo.address,
          parseUnits(depositAmount, Number(baseTokenInfo.decimals)),
        ],
      });
      toast.update(tId, {
        type: "success",
        icon: "👍",
        autoClose: 8000,
        closeOnClick: true,
        isLoading: false,
        render: `Deposit ${depositAmountDisplay} ${bSymbol} success: ${tx.hash}`,
      });
    } catch (err: any) {
      toast.update(tId, {
        type: "error",
        autoClose: 5000,
        closeOnClick: true,
        isLoading: false,
        render: `Deposit ${depositAmountDisplay} ${bSymbol} failed`,
      });
    }
  }, [
    depositAmount,
    deposit,
    bSymbol,
    baseTokenInfo.address,
    baseTokenInfo.decimals,
  ]);

  const onPressWithdraw = useCallback(async () => {
    const withdrawAmountDisplay = Number(withdrawAmount).toLocaleString();
    const tId = toast.loading(
      `Withdrawing ${withdrawAmountDisplay} ${bSymbol}`,
      {
        closeButton: true,
      }
    );
    try {
      const tx = await withdraw.writeAsync({
        args: [
          baseTokenInfo.address,
          parseUnits(withdrawAmount, Number(baseTokenInfo.decimals)),
        ],
      });
      toast.update(tId, {
        type: "success",
        icon: "👍",
        autoClose: 8000,
        closeOnClick: true,
        isLoading: false,
        render: `Withdraw ${withdrawAmountDisplay} ${bSymbol} success: ${tx.hash}`,
      });
    } catch (err: any) {
      toast.update(tId, {
        type: "error",
        autoClose: 5000,
        closeOnClick: true,
        isLoading: false,
        render: `Withdraw ${withdrawAmountDisplay} ${bSymbol} failed`,
      });
    }
  }, [
    withdrawAmount,
    withdraw,
    bSymbol,
    baseTokenInfo.address,
    baseTokenInfo.decimals,
  ]);

  return (
    <div className="w-full bg-white bg-opacity-[5%] rounded-xl overflow-hidden p-4 text-sm">
      <div className="text-lg font-bold mb-2">{bSymbol}</div>
      <table className="text-left mx-auto">
        <tr>
          <td className="pr-4">Oracle Price: </td>
          <td>
            <b>${formatBigInt(price, PRICE_PRECISION)}</b>
          </td>
        </tr>
        <tr>
          <td className="pr-4">AMM Price: </td>
          <td>
            <b>${formatBigInt(ammPrice * quotePrice, PRICE_PRECISION * 2)}</b>
          </td>
        </tr>
        <tr>
          <td className="pr-4">Deposited Balance: </td>
          <td>
            <b>
              {formatBigInt(balance, Number(baseTokenInfo.decimals))} {bSymbol}
            </b>
          </td>
        </tr>
        <tr>
          <td className="pr-4">Deposited Value: </td>
          <td>
            <b>${formatBigInt(value, PRICE_PRECISION)}</b>
          </td>
        </tr>
      </table>
      <Tabs
        className="w-full mt-4 [&>div]:w-full"
        size="sm"
        selectedKey={action}
        onSelectionChange={(act: any) => setAction(act)}
      >
        <Tab key="deposit" title="Deposit" className="w-full">
          <Input
            label={`Deposit ${bSymbol}`}
            className="text-right text-xs"
            description={`Wallet Balance: ${formatBigInt(
              balanceOf,
              Number(baseTokenInfo.decimals)
            )}`}
            value={depositAmount}
            onValueChange={(v) => setDepositAmount(v)}
            isInvalid={Number(depositAmount) > decBalanceOf}
            placeholder="0"
            type="number"
            size="md"
          />
          <div className="flex gap-2 w-full mt-4">
            <Button
              className="w-full"
              isDisabled={!shouldApproveFirst}
              onPress={onPressApprove}
            >
              Approve
            </Button>
            <Button
              className="w-full"
              isDisabled={!canDeposit}
              onPress={onPressDeposit}
            >
              Deposit
            </Button>
          </div>
        </Tab>
        <Tab key="withdraw" title="Withdraw" className="w-full">
          <Input
            label={`Withdraw ${bSymbol}`}
            className="text-right text-xs"
            description={`Wallet Balance: ${formatBigInt(
              balanceOf,
              Number(baseTokenInfo.decimals)
            )}`}
            value={withdrawAmount}
            onValueChange={(v) => setWithdrawAmount(v)}
            isInvalid={Number(withdrawAmount) > decBalance}
            placeholder="0"
            type="number"
            size="md"
          />
          <div className="flex gap-2 w-full mt-4">
            <Button
              className="w-full"
              isDisabled={!canWithdraw}
              onPress={onPressWithdraw}
            >
              Withdraw
            </Button>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

interface DemoInteractionProps {
  contractAddress: `0x${string}`;
}
const DemoInteraction = (props: DemoInteractionProps) => {
  const demo = useDemo(props.contractAddress);
  const loading = useMemo(() => {
    return (
      demo.config.isLoading ||
      demo.tokenInfo.isLoading ||
      demo.info.isLoading ||
      demo.tokenData.isLoading
    );
  }, [
    demo.config.isLoading,
    demo.tokenInfo.isLoading,
    demo.info.isLoading,
    demo.tokenData.isLoading,
  ]);

  const { balance } = useDemoBalance(props.contractAddress);

  const onPressBalance = useCallback(async () => {
    const tId = toast.loading(`Balancing`, {
      closeButton: true,
    });
    try {
      const tx = await balance.writeAsync();
      toast.update(tId, {
        type: "success",
        icon: "👍",
        autoClose: 8000,
        closeOnClick: true,
        isLoading: false,
        render: `Balance success: ${tx.hash}`,
      });
    } catch (err: any) {
      toast.update(tId, {
        type: "error",
        autoClose: 5000,
        closeOnClick: true,
        isLoading: false,
        render: `Balance failed`,
      });
    }
  }, [balance]);

  return (
    <div className="w-full text-center">
      {loading ? (
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg" />
        </Skeleton>
      ) : (
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-2xl">
            {demo.tokenInfo.result.token0.symbol}-
            {demo.tokenInfo.result.token1.symbol} Balance Pool
          </div>
          <div className="flex gap-16 w-full justify-center mt-2">
            <div className="text-sm">
              {demo.info.result.depositEnabled ? (
                <span className="flex items-center text-success-400">
                  <AiFillCheckCircle />
                  &nbsp;<b>Deposit</b>&nbsp;Enabled
                </span>
              ) : (
                <span className="flex items-center text-red-400">
                  <AiFillCloseCircle />
                  &nbsp;<b>Deposit</b>&nbsp;Disabled
                </span>
              )}
            </div>
            <div className="text-sm">
              {demo.info.result.withdrawEnabled ? (
                <span className="flex items-center text-success-400">
                  <AiFillCheckCircle />
                  &nbsp;<b>Withdraw</b>&nbsp;Enabled
                </span>
              ) : (
                <span className="flex items-center text-red-400">
                  <AiFillCloseCircle />
                  &nbsp;<b>Withdraw</b>&nbsp;Disabled
                </span>
              )}
            </div>
          </div>
          <div className="flex text-lg justify-center gap-4 p-8">
            <DemoTokenBox
              demoAddress={props.contractAddress}
              balanceOf={demo.tokenData.result.balanceOf0 || 0n}
              allowance={demo.tokenData.result.allowance0 || 0n}
              baseTokenInfo={demo.tokenInfo.result.token0}
              quoteTokenInfo={demo.tokenInfo.result.token1}
              price={demo.info.result.price0 || 0n}
              quotePrice={demo.info.result.price1 || 0n}
              ammPrice={demo.info.result.ammPrice0 || 0n}
              value={demo.info.result.value0 || 0n}
              balance={demo.info.result.balance0 || 0n}
            />
            <DemoTokenBox
              demoAddress={props.contractAddress}
              balanceOf={demo.tokenData.result.balanceOf1 || 0n}
              allowance={demo.tokenData.result.allowance1 || 0n}
              baseTokenInfo={demo.tokenInfo.result.token1}
              quoteTokenInfo={demo.tokenInfo.result.token0}
              price={demo.info.result.price1 || 0n}
              quotePrice={demo.info.result.price0 || 0n}
              ammPrice={demo.info.result.ammPrice1 || 0n}
              value={demo.info.result.value1 || 0n}
              balance={demo.info.result.balance1 || 0n}
            />
          </div>
          <div>
            <Button size="lg" color="primary" onPress={onPressBalance}>
              Balance Token Value
            </Button>
          </div>
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
  const blockNumber = useBlockNumber();

  const addressInvalid = useMemo(
    () => contractAddressTouched && !isAddress(contractAddress),
    [contractAddressTouched, contractAddress]
  );

  return (
    <div className="flex flex-col w-full items-center pb-20">
      <div className="w-full text-center text-default-700 text-6xl mt-4">
        PACMO
      </div>
      <div className="w-full text-center text-default-500/80 text-lg">
        PACMON Demo
      </div>
      <div className="flex w-full justify-center mt-8">
        <ConnectButton />
      </div>

      <div className="fixed top-[72px] right-[12px] text-xs">
        {blockNumber.data ? (
          <div className="flex text-success-500 items-center">
            <GoDotFill className="mt-[2px] mr-1" /> block{" "}
            {blockNumber.data.toString()}
          </div>
        ) : (
          <div className="flex text-warning-500 items-center">
            <GoDotFill className="mt-[2px] mr-1" /> no block
          </div>
        )}
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
