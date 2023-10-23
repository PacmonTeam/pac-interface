import { ContractType } from "@/utils";

export const toText = (c: ContractType) => {
  switch (c) {
    case ContractType.ERC_20:
      return "ERC-20";
    case ContractType.UNISWAP_V2:
      return "UniswapV2";
    case ContractType.PRICE_FEED:
      return "PriceFeed";
    case ContractType.CUSTOM:
      return "Custom";
    default:
      return "N/A";
  }
};