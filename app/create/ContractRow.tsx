import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { createTheme } from "@uiw/codemirror-themes";
import { ContractType } from "@/utils";

export interface ContractRowProps {
  key: string;
  contractType: ContractType;
  solidityCode: string;
  yamlCode: string;
  setSolidityCode?: (code: string, key: string) => void;
  setYamlCode?: (code: string, key: string) => void;
}

export default function ContractRow(props: ContractRowProps) {
  const myTheme = createTheme({
    theme: "dark",
    settings: {},
    styles: [],
  });
  return (
    <div className="flex flex-row">
      <div className="w-1/2">
        <CodeMirror
          value={props.solidityCode}
          height="200px"
          extensions={[langs.solidity()]}
          theme={myTheme}
          onChange={(value) => {
            if (props.setSolidityCode) props.setSolidityCode(value, props.key);
          }}
        />
      </div>
      <div className="w-1/2">
        <CodeMirror
          value={props.yamlCode}
          height="200px"
          extensions={[langs.yaml()]}
          theme={myTheme}
          onChange={(value) => {
            if (props.setYamlCode) props.setYamlCode(value, props.key);
          }}
        />
      </div>
    </div>
  );
}
