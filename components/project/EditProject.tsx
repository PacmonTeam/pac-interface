import TemplateRow, { TemplateRowProps } from "../create/TemplateRow";

interface EditProjectProps {
  templateRowProps: TemplateRowProps[];
}

export default function EditProject(props: EditProjectProps) {
  return (
    <div>
      {props.templateRowProps.map((props) => {
        return (
          <TemplateRow
            key={props.id}
            id={props.id}
            index={props.index}
            text={props.text}
            contractType={props.contractType}
            solidityScript={props.solidityScript}
            yamlConfiguration={props.yamlConfiguration}
            setScript={props.setScript}
          />
        );
      })}
    </div>
  );
}
