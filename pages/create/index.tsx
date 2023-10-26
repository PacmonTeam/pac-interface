import { BASE_API } from "@/config/url";
import {
  CreateProjectRequest,
  ScriptType,
  Status,
  TemplateType,
} from "@/lib/types";
import { usePluginTemplateMap } from "@/lib/usePlugins";
import { useRouter } from "next/router";
import SaveProjectModal from "@/components/project/SaveProjectModal";
import AddTemplateButton from "@/components/template/AddTemplateButton";
import TemplateRow, {
  TemplateRowProps,
} from "@/components/template/TemplateRow";
import { getPluginTemplateCode } from "@/lib/CodePlaceholder";
import { useDisclosure, Button } from "@nextui-org/react";
import { useState } from "react";
import { BsCloudUploadFill } from "react-icons/bs";
import { toast } from "react-toastify";

export default function Page({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { pluginTemplateMap } = usePluginTemplateMap();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [templateRowProps, setTemplateRowProps] = useState<TemplateRowProps[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  async function createProject(request: CreateProjectRequest) {
    return fetch(`${BASE_API}/projects/create`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  }

  const setScript = (script: string, scriptType: ScriptType, id: string) => {
    const nextTemplateRows = templateRowProps.map((props) => {
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
    setTemplateRowProps(nextTemplateRows);
  };

  const deleteTemplateRowProps = (id: string) => {
    const nextTemplateRowProps = templateRowProps.filter(
      (props) => props.id !== id
    );
    setTemplateRowProps(nextTemplateRowProps);
  };

  const onClickAddTemplate = (templateType: TemplateType) => {
    setTemplateRowProps([
      ...templateRowProps,
      {
        id: `${templateType}-${templateRowProps.length}`,
        index: templateRowProps.length,
        text: templateType,
        templateType: templateType,
        solidityScript: getPluginTemplateCode(
          ScriptType.SOLIDITY,
          templateType,
          pluginTemplateMap
        ),
        yamlConfiguration: getPluginTemplateCode(
          ScriptType.YAML,
          templateType,
          pluginTemplateMap
        ),
        setScript: setScript,
      },
    ]);
  };

  const onCreateProjectClick = async (projectName: string) => {
    setIsLoading(true);
    const tId = toast.loading(`Creating project "${projectName}"`);
    const request: CreateProjectRequest = {
      name: projectName,
      templates: templateRowProps.map((template, i) => {
        return {
          displayName: template.id,
          script: template.solidityScript,
          configuration: template.yamlConfiguration,
          sequence: i,
          status: Status.ACTIVE,
          type: template.templateType,
        };
      }),
    };
    await createProject(request)
      .then(() => {
        setIsLoading(false);
        toast.update(tId, {
          render: `Project "${projectName}" was created!`,
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
          render: "Fail to create project",
          type: "error",
          autoClose: 5000,
          closeOnClick: true,
          isLoading: false,
        });
      });
    onClose();
  };

  return (
    <div className="flex w-full justify-center">
      <div className="container flex flex-col items-center">
        <div className="container max-w-[1024px] gap-4 relative">
          <div className="mx-auto w-full px-5 pb-6 flex flex-row justify-between">
            <h1 className="text-3xl font-thin uppercase justify-center">
              Create New Project
            </h1>
            <div className="flex flex-row">
              <div className="flex flex-row gap-2">
                <AddTemplateButton
                  onClick={onClickAddTemplate}
                ></AddTemplateButton>
                {templateRowProps.length > 0 ? (
                  <Button
                    color="primary"
                    onClick={() => {
                      onOpen();
                      return;
                    }}
                  >
                    <BsCloudUploadFill />
                    Create project
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
          {templateRowProps.map((props) => {
            return (
              <TemplateRow
                key={props.id}
                id={props.id}
                index={props.index}
                text={props.text}
                templateType={props.templateType}
                solidityScript={props.solidityScript}
                yamlConfiguration={props.yamlConfiguration}
                setScript={setScript}
                deleteTemplate={deleteTemplateRowProps}
              />
            );
          })}
          <SaveProjectModal
            isOpen={isOpen}
            isLoading={isLoading}
            onClose={onClose}
            onSaveProjectClick={onCreateProjectClick}
          />
        </div>
      </div>
    </div>
  );
}
