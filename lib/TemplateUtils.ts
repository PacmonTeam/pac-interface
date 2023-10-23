import { ContractType } from "@/utils";
import { ProjectResponse } from "./types";
import { TemplateRowProps, TemplateRowPropsSetScriptFunction } from "@/components/create/TemplateRow";

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

export const getTemplateRowPropsArrayFromProject = (
  project: ProjectResponse | undefined, setScript: TemplateRowPropsSetScriptFunction
): TemplateRowProps[] => {
  return project
    ? (project.templates ? project.templates.map((template, i) => {
      // TODO: Get the contract type from configuration
      const contractType = ContractType.ERC_20;
      return {
        key: template.id,
        id: `${toText(contractType)}-${i}`,
        index: i,
        text: toText(contractType),
        contractType: contractType,
        solidityScript: template.script,
        yamlConfiguration: template.configuration,
        setScript: setScript,
      };
    }) : [])
    : [];
};