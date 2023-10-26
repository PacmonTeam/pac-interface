import AddContractButton from "@/components/create/AddContractButton";
import { getPluginTemplateCode } from "@/components/create/CodePlaceholder";
import TemplateRow, { TemplateRowProps } from "@/components/create/TemplateRow";
import SaveProjectModal from "@/components/project/SaveProjectModal";
import { BASE_API } from "@/config/url";
import { getTemplateRowPropsArrayFromProject } from "@/lib/TemplateUtils";
import {
  ContractType,
  ScriptType,
  Status,
  UpsertProjectRequest,
} from "@/lib/types";
import { usePluginTemplateMap } from "@/lib/usePlugins";
import { useProject } from "@/lib/useProjects";
import { Button, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const projectId: number = parseInt(router.query.id?.toString() || "0");
  const { data: project } = useProject(projectId);
  const { pluginTemplateMap } = usePluginTemplateMap();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoaded, setIsLoaded] = useState(false);
  const [templateRowProps, setTemplateRowProps] = useState<TemplateRowProps[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  async function updateProject(request: UpsertProjectRequest) {
    return fetch(`${BASE_API}/projects/update`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  }

  if (!isLoaded && project && project.templates) {
    setTemplateRowProps(getTemplateRowPropsArrayFromProject(project));
    setIsLoaded(true);
  }

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

  const deleteTemplateRowProps = (id: string) => {
    const nextTemplateRowProps = templateRowProps.filter(
      (props) => props.id !== id
    );
    setTemplateRowProps(nextTemplateRowProps);
  };

  const onClickAddContract = (contractType: ContractType) => {
    setTemplateRowProps([
      ...templateRowProps,
      {
        id: `${contractType}-${templateRowProps.length}`,
        index: templateRowProps.length,
        text: contractType,
        contractType: contractType,
        solidityScript: getPluginTemplateCode(
          ScriptType.SOLIDITY,
          contractType,
          pluginTemplateMap
        ),
        yamlConfiguration: getPluginTemplateCode(
          ScriptType.YAML,
          contractType,
          pluginTemplateMap
        ),
        setScript: setScript,
      },
    ]);
  };

  const onSaveProjectClick = async (projectName: string) => {
    setIsLoading(true);
    const tId = toast.loading(`Saving project "${projectName}"`);
    if (project) {
      const request: UpsertProjectRequest = {
        id: project.id,
        name: projectName,
        templates: templateRowProps.map((template, i) => {
          return {
            displayName: template.id,
            script: template.solidityScript,
            configuration: template.yamlConfiguration,
            sequence: i,
            status: Status.ACTIVE,
            type: template.contractType,
          };
        }),
      };
      await updateProject(request)
        .then(() => {
          setIsLoading(false);
          toast.update(tId, {
            render: `Project "${projectName}" was updated!`,
            type: "success",
            icon: "🌈",
            autoClose: 5000,
            closeOnClick: true,
            isLoading: false,
          });
          router.push("/project");
        })
        .catch((reason) => {
          console.error(reason);
          toast.update(tId, {
            render: "Fail to update project",
            type: "error",
            autoClose: 5000,
            closeOnClick: true,
            isLoading: false,
          });
        });
    }
    onClose();
  };

  if (!isLoaded) return null;

  return (
    <div className="container flex flex-col items-center">
      <div className="container max-w-[1024px] gap-4 relative">
        <div className="mx-auto w-full px-5 pb-6 flex flex-row justify-between">
          <h1 className="text-3xl font-thin uppercase justify-center">
            Project #{project?.id}: {project?.name}
          </h1>
          <div className="flex flex-row">
            <div className="flex flex-row gap-2">
              <AddContractButton
                onClick={onClickAddContract}
              ></AddContractButton>
              {templateRowProps.length > 0 ? (
                <Button
                  color="primary"
                  onClick={() => {
                    onOpen();
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
              setScript={setScript}
              deleteTemplate={deleteTemplateRowProps}
            />
          );
        })}
      </div>
      <SaveProjectModal
        projectName={project?.name}
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={onClose}
        onSaveProjectClick={onSaveProjectClick}
      />
    </div>
  );
}
