import { formatDate } from "@/lib/formatDate";
import { Button, Snippet, Spinner, Link as LinkUI } from "@nextui-org/react";
import { AiFillDelete, AiOutlineSetting } from "react-icons/ai";
import { FaEthereum } from "react-icons/fa";
import { TbFaceIdError } from "react-icons/tb";

import { useNodes, useDeleteNode } from "@/lib/useNodes";
import { Node } from "@/lib/types";
import Link from "next/link";

interface NodeItemProps extends Node {}

export const ActiveStatus = () => (
  <div className="flex items-center gap-x-1.5">
    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
    </div>
    <p className="text-xs leading-5 text-gray-500">Active</p>
  </div>
);

const NodeItem = (node: NodeItemProps) => {
  const { deleteNode, loading: deleting } = useDeleteNode();
  return (
    <li className="grid grid-cols-12 gap-4 py-4">
      <div className="col-span-3 flex items-center">
        <div className="flex min-w-0 gap-x-4">
          <div className="h-12 w-12 rounded-full text-4xl text-gray-700 flex justify-center items-center bg-gray-50">
            <FaEthereum />
          </div>
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6">{node.name}</p>
            <p className="truncate text-xs leading-5 text-gray-500">
              {formatDate(node.createdAt)}
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex flex-col items-start justify-center overflow-hidden">
        <p className="truncate text-xs leading-6 text-ellipsis w-full">
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
        <Button
          size="sm"
          startContent={<AiOutlineSetting />}
          as={Link}
          href={`/node/${node.id}`}
        >
          Manage
        </Button>
        <Button
          size="sm"
          color="danger"
          variant="ghost"
          startContent={<AiFillDelete />}
          onPress={() => deleteNode(node)}
          isLoading={deleting}
        >
          Delete
        </Button>
      </div>
    </li>
  );
};

export default function NodeList() {
  const { data: nodes, isLoading } = useNodes();

  const render = () => {
    if (isLoading) {
      return <Spinner color="default" />;
    }

    if (!nodes || nodes?.length === 0) {
      return (
        <div className="rounded-lg border border-dashed border-neutral-50/50 bg-transparent p-4">
          <div className="w-full text-default-500/80">
            <div className="flex justify-center items-center pt-6">
              <TbFaceIdError size="50" />
            </div>
            <div className="flex justify-center items-center text-xs font-bold">
              Node is Empty!
            </div>
            <div className="flex justify-center items-center text-xs pt-4 pb-6">
              You can set up and deploy a new node on
              <LinkUI
                className="text-xs pl-1"
                href="/project"
                underline="always"
                as={Link}
              >
                Project Page
              </LinkUI>
            </div>
          </div>
        </div>
      );
    }

    return nodes.map((node, index) => <NodeItem key={index} {...node} />);
  };

  return <ul className="divide-y divide-gray-600">{render()}</ul>;
}
