import { ProjectResponse } from "@/lib/types";
import { useState } from "react";
import TemplateRow, { TemplateRowProps } from "../create/TemplateRow";
import { toText } from "@/lib/TemplateUtils";
import { ContractType, ScriptType } from "@/utils";

interface EditProjectProps {
  project?: ProjectResponse;
}

export default function EditProject(props: EditProjectProps) {
  // TODO: Get the contract type from configuration
  const contractType = ContractType.ERC_20;
  const setScript = (script: string, scriptType: ScriptType, id: string) => {
    const nextTemplateRowProps = templateRowProps.map((props) => {
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
    setTemplateRowProps(nextTemplateRowProps);
  };
  const initTemplateRowProps: TemplateRowProps[] = props.project
    ? props.project.templates.map((template, i) => {
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
      })
    : [];
  const [templateRowProps, setTemplateRowProps] =
    useState<TemplateRowProps[]>(initTemplateRowProps);
  return (
    <div>
      {templateRowProps.map((props) => {
        return (
          <TemplateRow
            key={props.id}
            id={props.id}
            index={props.index}
            text={toText(contractType)}
            contractType={contractType}
            solidityScript={props.solidityScript}
            yamlConfiguration={props.yamlConfiguration}
            setScript={props.setScript}
          />
        );
      })}
    </div>
  );
}
