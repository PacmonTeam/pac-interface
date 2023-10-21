import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { ContractType, ScriptType } from "@/utils";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { MdOutlineEditOff, MdOutlineModeEditOutline } from "react-icons/md";
import { SiSolidity, SiYaml } from "react-icons/si";

export interface TemplateRowProps {
  id: string;
  text: string;
  contractType: ContractType;
  solidityScript: string;
  yamlConfiguration: string;
  setScript?: (script: string, scriptType: ScriptType, id: string) => void;
}

export default function TemplateRow(props: TemplateRowProps) {
  return (
    <div className="flex flex-col mb-4 p-unit-lg box-border rounded-lg bg-content1 w-full">
      <div className="mb-4">{props.text}</div>
      <div className="flex flex-row gap-12">
        <div className="w-2/3">
          <div className="flex flex-row">
            <SiSolidity /> <MdOutlineEditOff />
          </div>
          <CodeMirror
            value={props.solidityScript}
            height="200px"
            extensions={[langs.solidity()]}
            theme={vscodeDark}
            // Editable only in custom
            editable={props.contractType === ContractType.CUSTOM}
            onChange={(value) => {
              if (props.setScript)
                props.setScript(value, ScriptType.SOLIDITY, props.id);
            }}
          />
        </div>
        <div className="w-1/3">
          <div className="flex flex-row">
            <SiYaml /> <MdOutlineModeEditOutline />
          </div>
          <CodeMirror
            value={props.yamlConfiguration}
            height="200px"
            extensions={[langs.yaml()]}
            theme={vscodeDark}
            onChange={(value) => {
              if (props.setScript)
                props.setScript(value, ScriptType.YAML, props.id);
            }}
          />
        </div>
      </div>
    </div>
  );
}
