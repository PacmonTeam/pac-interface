import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { ContractType } from "@/utils";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

export interface TemplateRowProps {
  key: string;
  contractType: ContractType;
  solidityCode: string;
  yamlCode: string;
  setSolidityCode?: (code: string, key: string) => void;
  setYamlCode?: (code: string, key: string) => void;
}

export default function TemplateRow(props: TemplateRowProps) {
  return (
    <div className="flex flex-row gap-12 rounded-lg bg-content1">
      <div className="">
        <CodeMirror
          value={props.solidityCode}
          height="200px"
          extensions={[langs.solidity()]}
          theme={vscodeDark}
          // Editable only in custom
          editable={props.contractType === ContractType.CUSTOM}
          onChange={(value) => {
            if (props.setSolidityCode) props.setSolidityCode(value, props.key);
          }}
        />
      </div>
      <div className="">
        <CodeMirror
          value={props.yamlCode}
          height="200px"
          extensions={[langs.yaml()]}
          theme={vscodeDark}
          onChange={(value) => {
            if (props.setYamlCode) props.setYamlCode(value, props.key);
          }}
        />
      </div>
    </div>
  );
}
