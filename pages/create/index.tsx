"use client";

import { useState } from "react";
import _ from "lodash";
import AddContractButton from "../../components/create/AddContractButton";
import { ContractType, ScriptType } from "@/utils";
import TemplateRow, { TemplateRowProps } from "@/components/create/TemplateRow";
import {
  solidityPlaceholder,
  yamlPlaceholder,
} from "@/components/create/CodePlaceholder";

export default function Page({ children }: { children: React.ReactNode }) {
  const [templateRows, setTemplateRows] = useState<TemplateRowProps[]>([]);
  const toText = (c: ContractType) => {
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
  const setScript = (script: string, scriptType: ScriptType, id: string) => {
    const nextTemplateRows = templateRows.map((props) => {
      if (props.id === id) {
        switch (scriptType) {
          case ScriptType.SOLIDITY:
            return { ...props, solidityScript: script };
          case ScriptType.YAML:
            return { ...props, yamlConfiguration: script };
        }
      }
      return props;
    });
    setTemplateRows(nextTemplateRows);
  };
  const onClickAddContract = (c: ContractType) => {
    setTemplateRows([
      ...templateRows,
      {
        id: `${toText(c)}-${templateRows.length}`,
        text: toText(c),
        contractType: c,
        solidityScript: solidityPlaceholder,
        yamlConfiguration: yamlPlaceholder,
        setScript: setScript,
      },
    ]);
  };
  return (
    <div className="container flex flex-col items-center">
      {templateRows.map((props) => {
        return (
          <TemplateRow
            key={props.id}
            id={props.id}
            text={props.text}
            contractType={props.contractType}
            solidityScript={props.solidityScript}
            yamlConfiguration={props.yamlConfiguration}
            setScript={setScript}
          />
        );
      })}
      <AddContractButton onClick={onClickAddContract}></AddContractButton>
    </div>
  );
}
