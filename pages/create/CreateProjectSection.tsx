"use client";

import { useState } from "react";
import _ from "lodash";
import AddContractButton from "../../components/create/AddContractButton";
import { ContractType, ScriptType } from "@/utils";
import TemplateRow, { TemplateRowProps } from "@/components/create/TemplateRow";
import {
  solidityPlaceholder,
  yamlPlaceholder,
} from "@/components/create/CodePlaceholder";
import { Button, Textarea } from "@nextui-org/react";
import { BsCloudUploadFill } from "react-icons/bs";
import {
  CreateProjectRequest,
  CreateProjectResponse,
  Status,
} from "@/lib/types";
import { useRouter } from "next/router";

interface CreateProjectSectionProps {
  createProject: (
    request: CreateProjectRequest
  ) => Promise<CreateProjectResponse>;
}

export default function CreateProjectSection(props: CreateProjectSectionProps) {
  const router = useRouter();
  const [templateRows, setTemplateRows] = useState<TemplateRowProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [projectName, setProjectName] = useState("");

  const toText = (c: ContractType) => {
    switch (c) {
      case ContractType.ERC_20:
        return "ERC-20";
      case ContractType.UNISWAP_V2:
        return "UniswapV2";
      case ContractType.PRICE_FEED:
        return "PriceFeed";
      case ContractType.CUSTOM:
        return "Custom";
      default:
        return "N/A";
    }
  };
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
  const onClickAddContract = (c: ContractType) => {
    setTemplateRows([
      ...templateRows,
      {
        id: `${toText(c)}-${templateRows.length}`,
        text: toText(c),
        contractType: c,
        solidityScript: solidityPlaceholder,
        yamlConfiguration: yamlPlaceholder,
        setScript: setScript,
      },
    ]);
  };
  return (
    <div className="container flex flex-col items-center">
      {templateRows.map((props) => {
        return (
          <TemplateRow
            key={props.id}
            id={props.id}
            text={props.text}
            contractType={props.contractType}
            solidityScript={props.solidityScript}
            yamlConfiguration={props.yamlConfiguration}
            setScript={setScript}
          />
        );
      })}
      {/* TODO: Improve UI of this section, could fix these comps to buttom and reorder them */}
      <div className="flex flex-col">
        <div className="flex mb-2">
          {templateRows.length > 0 ? (
            <Textarea
              minRows={1}
              isRequired
              label="Project name"
              labelPlacement="outside"
              placeholder="Enter your project name"
              className="max-w-xs"
              onValueChange={(value) => {
                setProjectName(value);
              }}
            />
          ) : null}
        </div>
        <div className="flex flex-row gap-2">
          <AddContractButton onClick={onClickAddContract}></AddContractButton>
          {templateRows.length > 0 ? (
            <Button
              isLoading={isLoading}
              color="primary"
              onClick={() => {
                if (projectName === "") return;
                setIsLoading(true);
                // prepare request body
                const request: CreateProjectRequest = {
                  name: projectName,
                  templates: templateRows.map((template, i) => {
                    return {
                      script: template.solidityScript,
                      configuration: template.yamlConfiguration,
                      sequence: i,
                      status: Status.ACTIVE,
                    };
                  }),
                };
                props
                  .createProject(request)
                  .then((response) => {
                    console.log("done with", response);
                    setIsLoading(false);
                    router.push("/");
                  })
                  .catch((reason) => {
                    console.error(reason);
                    // TODO: show error breadcrumb
                  });
              }}
            >
              <BsCloudUploadFill />
              Create project
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
