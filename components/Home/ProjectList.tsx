import { formatDate } from "@/lib/formatDate";
import { Card, CardBody, Select, SelectItem, Button } from "@nextui-org/react";
import { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GoRocket } from "react-icons/go";

import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

type ProjectsProps = {};

const mockProjectList = [
  {
    name: "Pacmon",
    templates: [
      {
        script: "// SOLIDITY CODE",
        configuration: "// YAML CONFIG",
        sequence: 0,
        status: "ACTIVE",
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z",
      },
    ],
  },
];

const AVAILABLE_NODES = [
  {
    id: "1",
    CPU: "1 CPU",
    RAM: "1 GB",
    Storage: "25 GB",
    isSSD: true,
  },
  {
    id: "2",
    CPU: "1 CPU",
    RAM: "2 GB",
    Storage: "50 GB",
    isSSD: true,
  },
  {
    id: "3",
    CPU: "2 CPU",
    RAM: "4 GB",
    Storage: "100 GB",
    isSSD: true,
    isDisabled: true,
  },
];

export default function ProjectList(props: ProjectsProps) {
  return (
    <div className="grid gap-2">
      {mockProjectList.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  );
}

function ProjectCard(props: ProjectsProps) {
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
              <Jazzicon diameter={40} seed={jsNumberForAddress("Pacman")} />
              <div className="flex flex-col">
                <h3 className="font-semibold text-foreground/90">Pacman</h3>
                <small className="text-default-500">
                  Created At - {formatDate("2021-01-01T00:00:00.000Z")}
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
