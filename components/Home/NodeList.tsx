import { Button, User, Snippet } from "@nextui-org/react";
import { Key, useCallback, useState } from "react";
import { AiFillDelete, AiOutlineSetting } from "react-icons/ai";
import { FaEthereum } from "react-icons/fa";

type NodesProps = {};

const mockNodeList = [
  {
    id: 1,
    name: "Pacmon",
    rpc: "http://localhost:8545",
    project: {
      id: 1,
      name: "Pacmon",
      templates: [
        {
          id: 1,
          script: "// SOLIDITY CODE",
          configuration: "// YAML CONFIG",
          sequence: 0,
          status: "ACTIVE",
          address: "0x1234567890",
          projectId: 1,
          createdAt: "2021-01-01T00:00:00.000Z",
          updatedAt: "2021-01-01T00:00:00.000Z",
        },
      ],
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
    },
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2021-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Pacmon",
    rpc: "http://localhost:8545",
    project: {
      id: 1,
      name: "Pacmon",
      templates: [
        {
          id: 1,
          script: "// SOLIDITY CODE",
          configuration: "// YAML CONFIG",
          sequence: 0,
          status: "ACTIVE",
          address: "0x1234567890",
          projectId: 1,
          createdAt: "2021-01-01T00:00:00.000Z",
          updatedAt: "2021-01-01T00:00:00.000Z",
        },
      ],
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
    },
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2021-01-01T00:00:00.000Z",
  },
];

const ActiveStatus = () => (
  <div className="flex items-center gap-x-1.5">
    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
    </div>
    <p className="text-xs leading-5 text-gray-500">Active</p>
  </div>
);

export default function NodeList(props: NodesProps) {
  return (
    <ul className="divide-y divide-gray-600">
      {mockNodeList.map((node, index) => (
        <li key={index} className="grid grid-cols-12 gap-4 py-4">
          <div className="col-span-3 flex items-center">
            <div className="flex min-w-0 gap-x-4">
              <div className="h-12 w-12 rounded-full text-4xl text-gray-700 flex justify-center items-center bg-gray-50">
                <FaEthereum />
              </div>
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6">{node.name}</p>
                <p className="truncate text-xs leading-5 text-gray-500">
                  {node.createdAt}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-2 flex flex-col items-start justify-center">
            <p className="truncate text-xs leading-6">
              {node.project.name} Project
            </p>
            <ActiveStatus />
          </div>
          <div className="col-span-4 flex items-center justify-center">
            <Snippet className="w-full" size="sm">
              {node.rpc}
            </Snippet>
          </div>
          <div className="col-span-3 flex items-center gap-2 justify-end px-2">
            <Button size="sm" startContent={<AiOutlineSetting />}>
              Manage
            </Button>
            <Button
              size="sm"
              color="danger"
              variant="ghost"
              startContent={<AiFillDelete />}
            >
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
