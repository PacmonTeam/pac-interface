import { ScriptType } from "@/lib/types";
import { langs } from "@uiw/codemirror-extensions-langs";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";

interface EditorProps {
  script: string;
  scriptType: ScriptType;
  isEditable: boolean;
  onChange: (value: string) => void;
}

export default function Editor(props: EditorProps) {
  let language = undefined;
  if (props.scriptType === ScriptType.SOLIDITY) language = langs.solidity();
  else language = langs.yaml();

  return (
    <CodeMirror
      value={props.script}
      height="200px"
      extensions={[language]}
      basicSetup={{
        highlightActiveLine: props.isEditable,
      }}
      theme={vscodeDark}
      editable={props.isEditable}
      onChange={props.onChange}
    />
  );
}
