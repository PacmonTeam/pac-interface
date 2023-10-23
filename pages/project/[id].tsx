import AddContractButton from "@/components/create/AddContractButton";
import { TemplateRowProps } from "@/components/create/TemplateRow";
import EditProject from "@/components/project/EditProject";
import {
  getTemplateRowPropsArrayFromProject,
  toText,
} from "@/lib/TemplateUtils";
import { ProjectResponse } from "@/lib/types";
import { useProject } from "@/lib/useProjects";
import { ContractType, ScriptType } from "@/utils";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";

export default function Page() {
  const router = useRouter();
  const projectId: number = parseInt(router.query.id?.toString() || "0");
  const { data: project } = useProject(projectId);
  console.log(project);

  const [templateRowProps, setTemplateRowProps] = useState<TemplateRowProps[]>(
    getTemplateRowPropsArrayFromProject(
      project,
      (script: string, scriptType: ScriptType, id: string) => {
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
      }
    )
  );

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
      <EditProject templateRowProps={templateRowProps} />
    </div>
  );
}
