/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface PacDemoInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "PRICE_PRECISION"
      | "_swap"
      | "balance"
      | "balances0"
      | "balances1"
      | "deposit"
      | "depositEnabled"
      | "getAMMPrices"
      | "getPrice0"
      | "getPrice1"
      | "getPrices"
      | "getReserves"
      | "getValue0"
      | "getValue1"
      | "getValues"
      | "gov"
      | "pair"
      | "pricefeed0"
      | "pricefeed1"
      | "setDepositEnabled"
      | "setWithdrawEnabled"
      | "swap"
      | "token0"
      | "token1"
      | "withdraw"
      | "withdrawEnabled"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "PRICE_PRECISION",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_swap",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balance", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "balances0",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "balances1",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "depositEnabled",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAMMPrices",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getPrice0", values?: undefined): string;
  encodeFunctionData(functionFragment: "getPrice1", values?: undefined): string;
  encodeFunctionData(functionFragment: "getPrices", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getReserves",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getValue0",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getValue1",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getValues",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "gov", values?: undefined): string;
  encodeFunctionData(functionFragment: "pair", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pricefeed0",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "pricefeed1",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setDepositEnabled",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setWithdrawEnabled",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "swap",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "token0", values?: undefined): string;
  encodeFunctionData(functionFragment: "token1", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawEnabled",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "PRICE_PRECISION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "_swap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balances0", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balances1", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "depositEnabled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAMMPrices",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPrice0", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getPrice1", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getPrices", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getReserves",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getValue0", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getValue1", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getValues", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gov", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pair", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pricefeed0", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pricefeed1", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setDepositEnabled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setWithdrawEnabled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token0", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token1", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawEnabled",
    data: BytesLike
  ): Result;
}

export interface PacDemo extends BaseContract {
  connect(runner?: ContractRunner | null): PacDemo;
  waitForDeployment(): Promise<this>;

  interface: PacDemoInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  PRICE_PRECISION: TypedContractMethod<[], [bigint], "view">;

  _swap: TypedContractMethod<
    [fromToken: AddressLike, toToken: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  balance: TypedContractMethod<[], [void], "nonpayable">;

  balances0: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  balances1: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  deposit: TypedContractMethod<
    [token: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  depositEnabled: TypedContractMethod<[], [boolean], "view">;

  getAMMPrices: TypedContractMethod<
    [],
    [[bigint, bigint] & { ammPrice0: bigint; ammPrice1: bigint }],
    "view"
  >;

  getPrice0: TypedContractMethod<[], [bigint], "view">;

  getPrice1: TypedContractMethod<[], [bigint], "view">;

  getPrices: TypedContractMethod<
    [],
    [[bigint, bigint] & { price0: bigint; price1: bigint }],
    "view"
  >;

  getReserves: TypedContractMethod<
    [],
    [[bigint, bigint] & { reserve0: bigint; reserve1: bigint }],
    "view"
  >;

  getValue0: TypedContractMethod<[account: AddressLike], [bigint], "view">;

  getValue1: TypedContractMethod<[account: AddressLike], [bigint], "view">;

  getValues: TypedContractMethod<
    [account: AddressLike],
    [
      [bigint, bigint, bigint] & {
        value0: bigint;
        value1: bigint;
        value: bigint;
      }
    ],
    "view"
  >;

  gov: TypedContractMethod<[], [string], "view">;

  pair: TypedContractMethod<[], [string], "view">;

  pricefeed0: TypedContractMethod<[], [string], "view">;

  pricefeed1: TypedContractMethod<[], [string], "view">;

  setDepositEnabled: TypedContractMethod<
    [_depositEnabled: boolean],
    [void],
    "nonpayable"
  >;

  setWithdrawEnabled: TypedContractMethod<
    [_withdrawEnabled: boolean],
    [void],
    "nonpayable"
  >;

  swap: TypedContractMethod<
    [fromToken: AddressLike, toToken: AddressLike, amount: BigNumberish],
    [bigint],
    "nonpayable"
  >;

  token0: TypedContractMethod<[], [string], "view">;

  token1: TypedContractMethod<[], [string], "view">;

  withdraw: TypedContractMethod<
    [token: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  withdrawEnabled: TypedContractMethod<[], [boolean], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "PRICE_PRECISION"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "_swap"
  ): TypedContractMethod<
    [fromToken: AddressLike, toToken: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "balance"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "balances0"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "balances1"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "deposit"
  ): TypedContractMethod<
    [token: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "depositEnabled"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "getAMMPrices"
  ): TypedContractMethod<
    [],
    [[bigint, bigint] & { ammPrice0: bigint; ammPrice1: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "getPrice0"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getPrice1"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getPrices"
  ): TypedContractMethod<
    [],
    [[bigint, bigint] & { price0: bigint; price1: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "getReserves"
  ): TypedContractMethod<
    [],
    [[bigint, bigint] & { reserve0: bigint; reserve1: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "getValue0"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getValue1"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getValues"
  ): TypedContractMethod<
    [account: AddressLike],
    [
      [bigint, bigint, bigint] & {
        value0: bigint;
        value1: bigint;
        value: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "gov"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "pair"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "pricefeed0"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "pricefeed1"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "setDepositEnabled"
  ): TypedContractMethod<[_depositEnabled: boolean], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setWithdrawEnabled"
  ): TypedContractMethod<[_withdrawEnabled: boolean], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "swap"
  ): TypedContractMethod<
    [fromToken: AddressLike, toToken: AddressLike, amount: BigNumberish],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "token0"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "token1"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<
    [token: AddressLike, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "withdrawEnabled"
  ): TypedContractMethod<[], [boolean], "view">;

  filters: {};
}
