"use client";

import { useState } from "react";
import AddContractButton from "./AddContractButton";
import TemplateRow, { TemplateRowProps } from "@/components/create/TemplateRow";
import { getPluginTemplateCode } from "@/components/create/CodePlaceholder";
import { Button, useDisclosure } from "@nextui-org/react";
import { BsCloudUploadFill } from "react-icons/bs";
import {
  ContractType,
  CreateProjectRequest,
  CreateProjectResponse,
  PluginTemplateMap,
  ScriptType,
  Status,
} from "@/lib/types";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import SaveProjectModal from "../project/SaveProjectModal";

interface CreateProjectSectionProps {
  createProject: (
    request: CreateProjectRequest
  ) => Promise<CreateProjectResponse>;
  pluginTemplateMap: PluginTemplateMap;
}

export default function CreateProjectSection(props: CreateProjectSectionProps) {
  const router = useRouter();
  const [templateRowProps, setTemplateRowProps] = useState<TemplateRowProps[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          props.pluginTemplateMap
        ),
        yamlConfiguration: getPluginTemplateCode(
          ScriptType.YAML,
          contractType,
          props.pluginTemplateMap
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
          type: template.contractType,
        };
      }),
    };
    await props
      .createProject(request)
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
    <div className="container flex flex-col items-center">
      <div className="container max-w-[1024px] gap-4 relative">
        <div className="mx-auto w-full px-5 pb-6 flex flex-row justify-between">
          <h1 className="text-3xl font-thin uppercase justify-center">
            Create New Project
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
              contractType={props.contractType}
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
  );
}
