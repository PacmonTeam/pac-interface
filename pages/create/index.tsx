"use client";

// import { tags as t } from "@lezer/highlight";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import TemplateRow, { TemplateRowProps } from "./TemplateRow";
import { solidityPlaceholder, yamlPlaceholder } from "./CodePlaceholder";
import _ from "lodash";
import AddContractButton from "./AddContractButton";
import { ContractType } from "@/utils";

export default function Page({ children }: { children: React.ReactNode }) {
  const [contractRowPropsList, setContractRowPropsList] = useState<
    TemplateRowProps[]
  >([]);
  // const setSolidityCode = (code: string, key: string) => {
  //   const targetProps = contractRowPropsList.find((props) => {
  //     return props.key === key;
  //   });
  //   const result = _.find(_.cloneDeep(contractRowPropsList), ["key", key])
  //   setContractRowPropsList(

  //   );
  // };
  // const defaultContractRowProps: ContractRowProps = {
  //   solidityCode: solidityPlaceholder,
  //   yamlCode: yamlPlaceholder,
  //   setSolidityCode: (code: string, key: string) => {
  //     setContractRowPropsList();
  //   },
  // };
  return (
    <div className="container flex flex-col gap-12">
      {contractRowPropsList.map((props) => {
        return (
          <TemplateRow
            key={props.key}
            contractType={props.contractType}
            solidityCode={props.solidityCode}
            yamlCode={props.yamlCode}
          />
        );
      })}
      <AddContractButton
        onClick={(c: ContractType) => {
          setContractRowPropsList([
            ...contractRowPropsList,
            {
              key: "",
              contractType: c,
              solidityCode: solidityPlaceholder,
              yamlCode: yamlPlaceholder,
            },
          ]);
        }}
      ></AddContractButton>
    </div>
  );
}
