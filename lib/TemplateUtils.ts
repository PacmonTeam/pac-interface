import { ContractType, ProjectResponse } from "./types";
import { TemplateRowProps } from "@/components/create/TemplateRow";

// TODO: Might not need this anymore since enum has the same display text value
export const toText = (c: ContractType) => {
  switch (c) {
    case ContractType.ERC_20:
      return "ERC-20 Token";
    case ContractType.UNISWAP_V2:
      return "Uniswap V2 Pair";
    case ContractType.PRICE_FEED:
      return "Uniswap V2 Pair";
    case ContractType.CUSTOM:
      return "Custom";
    default:
      return "N/A";
  }
};

export const getTemplateRowPropsArrayFromProject = (
  project: ProjectResponse | undefined
): TemplateRowProps[] => {
  return project
    ? project.templates
      ? project.templates.map((template, i) => {
          const contractType = template.type;
          return {
            key: template.id,
            id: `${toText(contractType)}-${i}`,
            index: i,
            text: toText(contractType),
            contractType: contractType,
            solidityScript: template.script,
            yamlConfiguration: template.configuration,
          };
        })
      : []
    : [];
};
