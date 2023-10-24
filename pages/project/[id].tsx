import AddContractButton from "@/components/create/AddContractButton";
import TemplateRow, { TemplateRowProps } from "@/components/create/TemplateRow";
import { getTemplateRowPropsArrayFromProject } from "@/lib/TemplateUtils";
import { ScriptType } from "@/lib/types";
import { useProject } from "@/lib/useProjects";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";

export default function Page() {
  const router = useRouter();
  const projectId: number = parseInt(router.query.id?.toString() || "0");
  const { data: project } = useProject(projectId);

  // TOFIX: Fix the bug that update would replace template rows with empty array
  const [templateRowProps, setTemplateRowProps] = useState<TemplateRowProps[]>(
    []
  );

  useEffect(() => {
    setTemplateRowProps((t) =>
      getTemplateRowPropsArrayFromProject(
        project,
        (script: string, scriptType: ScriptType, id: string) => {
          console.log("setScript()", t);
          const nextTemplateRowProps = t.map((props) => {
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
          console.log(nextTemplateRowProps);
          setTemplateRowProps(nextTemplateRowProps);
        }
      )
    );
  }, [project]);

  const deleteTemplateRowProps = (id: string) => {
    const nextTemplateRowProps = templateRowProps.filter(
      (props) => props.id !== id
    );
    setTemplateRowProps(nextTemplateRowProps);
  };

  return (
    <div className="container flex flex-col items-center">
      <div className="container max-w-[1024px] gap-4 relative">
        <div className="mx-auto w-full px-5 pb-6 flex flex-row justify-between">
          <h1 className="text-3xl font-thin uppercase justify-center">
            Project #{project?.id}: {project?.name}
          </h1>
          <div className="flex flex-row">
            <div className="flex flex-row gap-2">
              <AddContractButton onClick={() => {}}></AddContractButton>
              {templateRowProps.length > 0 ? (
                <Button
                  color="primary"
                  onClick={() => {
                    // onOpen();
                    return;
                  }}
                >
                  <AiOutlineSave />
                  Save project
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div>
        {templateRowProps.map((props) => {
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
              deleteTemplate={deleteTemplateRowProps}
            />
          );
        })}
      </div>
    </div>
  );
}
