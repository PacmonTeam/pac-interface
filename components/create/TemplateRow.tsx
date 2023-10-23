import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { ContractType, ScriptType } from "@/utils";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { MdOutlineEditOff, MdOutlineModeEditOutline } from "react-icons/md";
import { SiSolidity, SiYaml } from "react-icons/si";

export type TemplateRowPropsSetScriptFunction = (
  script: string,
  scriptType: ScriptType,
  id: string
) => void;

export interface TemplateRowProps {
  id: string;
  index: number;
  text: string;
  contractType: ContractType;
  solidityScript: string;
  yamlConfiguration: string;
  setScript?: TemplateRowPropsSetScriptFunction;
}

export default function TemplateRow(props: TemplateRowProps) {
  const isSolidityScriptEditable = props.contractType === ContractType.CUSTOM;
  const editableTheme = vscodeDark;
  const solidityEditableBadge = () => {
    return isSolidityScriptEditable ? (
      <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-green-700 border-green-600 ring-1 ring-inset ring-green-600/20">
        <MdOutlineModeEditOutline />
        &nbsp;&nbsp;Editable
      </span>
    ) : (
      <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-gray-600 border-gray-600 ring-1 ring-inset ring-gray-500/10">
        <MdOutlineEditOff />
        &nbsp;&nbsp;Not editable
      </span>
    );
  };
  return (
    <div className="flex flex-col mb-4 p-unit-lg box-border rounded-lg bg-content1 w-full">
      <div className="mb-4">
        <span className="text-slate-400 font-light">#{props.index + 1}:</span>
        &nbsp;
        <span className="text-slate-100">{props.text}</span>
      </div>
      <div className="flex flex-row text-xs">
        <div className="w-2/3">
          <div className="flex flex-row gap-2 mb-2">
            <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-indigo-700 border-indigo-700 ring-1 ring-inset ring-indigo-700/10">
              <SiSolidity />
            </span>
            {solidityEditableBadge()}
          </div>
          <CodeMirror
            value={props.solidityScript}
            height="200px"
            extensions={[langs.solidity()]}
            basicSetup={{
              highlightActiveLine: isSolidityScriptEditable,
            }}
            theme={vscodeDark}
            editable={isSolidityScriptEditable}
            onChange={(value) => {
              if (props.setScript)
                props.setScript(value, ScriptType.SOLIDITY, props.id);
            }}
          />
        </div>
        <div className="w-1/3 pl-4">
          <div className="flex flex-row gap-2 mb-2">
            <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-yellow-800 border-yellow-600 ring-1 ring-inset ring-yellow-600/10">
              <SiYaml />
            </span>
            <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-green-700 border-green-600 ring-1 ring-inset ring-green-600/20">
              <MdOutlineModeEditOutline />
              &nbsp;&nbsp;Editable
            </span>
          </div>
          <CodeMirror
            value={props.yamlConfiguration}
            height="200px"
            extensions={[langs.yaml()]}
            theme={editableTheme}
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
