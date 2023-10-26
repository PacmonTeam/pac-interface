"use client";

import { useState } from "react";
import AddContractButton from "./AddContractButton";
import TemplateRow, { TemplateRowProps } from "@/components/create/TemplateRow";
import { getPluginTemplateCode } from "@/components/create/CodePlaceholder";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
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

interface CreateProjectSectionProps {
  createProject: (
    request: CreateProjectRequest
  ) => Promise<CreateProjectResponse>;
  pluginTemplateMap: PluginTemplateMap;
}

export default function CreateProjectSection(props: CreateProjectSectionProps) {
  const router = useRouter();
  const [templateRows, setTemplateRows] = useState<TemplateRowProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const setScript = (script: string, scriptType: ScriptType, id: string) => {
    const nextTemplateRows = templateRows.map((props) => {
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
    setTemplateRows(nextTemplateRows);
  };
  const deleteTemplateRowProps = (id: string) => {
    const nextTemplateRowProps = templateRows.filter(
      (props) => props.id !== id
    );
    setTemplateRows(nextTemplateRowProps);
  };
  const onClickAddContract = (contractType: ContractType) => {
    setTemplateRows([
      ...templateRows,
      {
        id: `${contractType}-${templateRows.length}`,
        index: templateRows.length,
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
              {templateRows.length > 0 ? (
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
        {templateRows.map((props) => {
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
        <Modal size="sm" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Project name
                </ModalHeader>
                <ModalBody>
                  <Textarea
                    minRows={1}
                    placeholder="Enter your project name"
                    className="max-w-sm"
                    onValueChange={(value) => {
                      setProjectName(value);
                    }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      if (projectName === "") return;
                      setIsLoading(true);
                      const tId = toast.loading(
                        `Creating project "${projectName}"`
                      );
                      // prepare request body
                      const request: CreateProjectRequest = {
                        name: projectName,
                        templates: templateRows.map((template, i) => {
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
                      props
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
                    }}
                    isLoading={isLoading}
                    isDisabled={projectName === ""}
                  >
                    Confirm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
