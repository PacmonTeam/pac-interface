import {
  Card,
  CardBody,
  Select,
  SelectItem,
  Button,
  Spinner,
} from "@nextui-org/react";
import { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { TbFaceIdError } from "react-icons/tb";
import { GoRocket } from "react-icons/go";

import { formatDate } from "@/lib/formatDate";
import { useProjects } from "@/lib/useProjects";
import { AVAILABLE_NODES } from "@/lib/constants";

import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

type TemplateModel = {
  script: string;
  configuration: string;
};
type ProjectCardProps = {
  isLoading: boolean;
  project: {
    name: string;
    template: TemplateModel[];
    createdAt: string;
  };
};

export default function ProjectList() {
  const { data: projects, isLoading } = useProjects();

  const renderCardList = () => {
    if (isLoading) {
      return <Spinner color="default" />;
    }

    if (!projects && projects?.length === 0) {
      return (
        <div className="rounded-lg border border-dashed border-neutral-50/50 bg-transparent p-4">
          <div className="w-full text-default-500/80">
            <div className="flex justify-center items-center">
              <TbFaceIdError size="50" />
            </div>
            <div className="flex justify-center items-center text-xs font-bold">
              Project is Empty!
            </div>
          </div>
        </div>
      );
    }

    return projects.map((project: any, index: number) => (
      <ProjectCard key={index} isLoading={false} project={project} />
    ));
  };
  return <div className="grid gap-2">{renderCardList()}</div>;
}

function ProjectCard({ project }: ProjectCardProps) {
  const [selectedNode, setSelectedNode] = useState<any>();
  const disabledNode = AVAILABLE_NODES.filter((e) => e.isDisabled).map(
    (e) => e.id
  );

  return (
    <Card className="w-full">
      <CardBody>
        <div className="grid grid-cols-12">
          <div className="flex flex-col col-span-8 gap-4">
            <div className="flex flex-row gap-4">
              <Jazzicon diameter={40} seed={jsNumberForAddress(project.name)} />
              <div className="flex flex-col">
                <h3 className="font-semibold text-foreground/90">
                  {project.name}
                </h3>
                <small className="text-default-500">
                  Created At - {formatDate(project.createdAt)}
                </small>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" startContent={<AiFillEdit />}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="ghost"
                color="danger"
                startContent={<AiFillDelete />}
              >
                Delete
              </Button>
            </div>
          </div>
          <div className="flex col-span-4 gap-2 flex-col items-end justify-end">
            <div className="w-full flex flex-col gap-2">
              <Select
                size="sm"
                label="Select a node"
                selectedKeys={selectedNode}
                defaultSelectedKeys={["1"]}
                onSelectionChange={setSelectedNode}
                disabledKeys={disabledNode}
              >
                {AVAILABLE_NODES.map((node) => (
                  <SelectItem
                    key={node.id}
                    value={node.id}
                    textValue={`CPU: ${node.CPU} RAM: ${node.RAM}`}
                  >
                    CPU: {node.CPU} RAM: {node.RAM}
                  </SelectItem>
                ))}
              </Select>
              <Button size="sm" color="success" startContent={<GoRocket />}>
                Deploy New Node
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
