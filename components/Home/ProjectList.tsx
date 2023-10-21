import {
  Card,
  CardBody,
  Select,
  SelectItem,
  Button,
  Divider,
} from "@nextui-org/react";
import { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GrDeploy } from "react-icons/gr";

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
    <Card className="border-none w-full">
      <CardBody>
        <div className="grid grid-cols-12 gap-4 items-center justify-center">
          <div className="relative col-span-1">
            <Jazzicon diameter={50} seed={jsNumberForAddress("Pacman")} />
          </div>
          <div className="flex flex-col col-span-5">
            <h3 className="font-semibold text-foreground/90">Pacman</h3>
            <p className="text-xs text-foreground text-opacity-50">
              created 2021-01-01T00:00:00.000Z
            </p>
          </div>
          <div className="flex col-span-4 gap-2 flex-col items-end justify-end">
            <div className="flex gap-2">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <AiFillEdit />
              </span>
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <AiFillDelete />
              </span>
            </div>
            <div className="w-full flex flex-col gap-2">
              <Select
                label="Select a node"
                className="max-w-xs"
                selectionMode="single"
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
                    CPU: ${node.CPU} RAM: ${node.RAM}
                  </SelectItem>
                ))}
              </Select>
              <Button color="danger" startContent={<GrDeploy color="white" />}>
                Deploy New Node
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

// export default function TemplateCard() {
//   return (
//     <ul role="list" className="divide-y divide-gray-100">
//       <li className="flex justify-between gap-x-6 py-5">
//         <div className="flex min-w-0 gap-x-4">
//           <Image
//             className="h-12 w-12 flex-none rounded-full bg-gray-50"
//             src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//             alt=""
//           />
//           <div className="min-w-0 flex-auto">
//             <p className="text-sm font-semibold leading-6 text-gray-900">
//               Leslie Alexander
//             </p>
//             <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//               leslie.alexander@example.com
//             </p>
//           </div>
//         </div>
//         <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
//           <p className="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
//           <p className="mt-1 text-xs leading-5 text-gray-500">
//             Last seen <div>3h ago</div>
//           </p>
//         </div>
//       </li>
//       <li className="flex justify-between gap-x-6 py-5">
//         <div className="flex min-w-0 gap-x-4">
//           <Image
//             className="h-12 w-12 flex-none rounded-full bg-gray-50"
//             src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//             alt=""
//           />
//           <div className="min-w-0 flex-auto">
//             <p className="text-sm font-semibold leading-6 text-gray-900">
//               Michael Foster
//             </p>
//             <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//               michael.foster@example.com
//             </p>
//           </div>
//         </div>
//         <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
//           <p className="text-sm leading-6 text-gray-900">Co-Founder / CTO</p>
//           <p className="mt-1 text-xs leading-5 text-gray-500">
//             Last seen <div>3h ago</div>
//           </p>
//         </div>
//       </li>
//       <li className="flex justify-between gap-x-6 py-5">
//         <div className="flex min-w-0 gap-x-4">
//           <Image
//             className="h-12 w-12 flex-none rounded-full bg-gray-50"
//             src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//             alt=""
//           />
//           <div className="min-w-0 flex-auto">
//             <p className="text-sm font-semibold leading-6 text-gray-900">
//               Dries Vincent
//             </p>
//             <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//               dries.vincent@example.com
//             </p>
//           </div>
//         </div>
//         <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
//           <p className="text-sm leading-6 text-gray-900">Business Relations</p>
//           <div className="mt-1 flex items-center gap-x-1.5">
//             <div className="flex-none rounded-full bg-emerald-500/20 p-1">
//               <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
//             </div>
//             <p className="text-xs leading-5 text-gray-500">Online</p>
//           </div>
//         </div>
//       </li>
//       <li className="flex justify-between gap-x-6 py-5">
//         <div className="flex min-w-0 gap-x-4">
//           <Image
//             className="h-12 w-12 flex-none rounded-full bg-gray-50"
//             src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//             alt=""
//           />
//           <div className="min-w-0 flex-auto">
//             <p className="text-sm font-semibold leading-6 text-gray-900">
//               Lindsay Walton
//             </p>
//             <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//               lindsay.walton@example.com
//             </p>
//           </div>
//         </div>
//         <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
//           <p className="text-sm leading-6 text-gray-900">Front-end Developer</p>
//           <p className="mt-1 text-xs leading-5 text-gray-500">
//             Last seen <div>3h ago</div>
//           </p>
//         </div>
//       </li>
//       <li className="flex justify-between gap-x-6 py-5">
//         <div className="flex min-w-0 gap-x-4">
//           <Image
//             className="h-12 w-12 flex-none rounded-full bg-gray-50"
//             src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//             alt=""
//           />
//           <div className="min-w-0 flex-auto">
//             <p className="text-sm font-semibold leading-6 text-gray-900">
//               Courtney Henry
//             </p>
//             <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//               courtney.henry@example.com
//             </p>
//           </div>
//         </div>
//         <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
//           <p className="text-sm leading-6 text-gray-900">Designer</p>
//           <p className="mt-1 text-xs leading-5 text-gray-500">
//             Last seen <div>3h ago</div>
//           </p>
//         </div>
//       </li>
//       <li className="flex justify-between gap-x-6 py-5">
//         <div className="flex min-w-0 gap-x-4">
//           <Image
//             className="h-12 w-12 flex-none rounded-full bg-gray-50"
//             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//             alt=""
//           />
//           <div className="min-w-0 flex-auto">
//             <p className="text-sm font-semibold leading-6 text-gray-900">
//               Tom Cook
//             </p>
//             <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//               tom.cook@example.com
//             </p>
//           </div>
//         </div>
//         <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
//           <p className="text-sm leading-6 text-gray-900">Director of Product</p>
//           <div className="mt-1 flex items-center gap-x-1.5">
//             <div className="flex-none rounded-full bg-emerald-500/20 p-1">
//               <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
//             </div>
//             <p className="text-xs leading-5 text-gray-500">Online</p>
//           </div>
//         </div>
//       </li>
//     </ul>
//   );
// }
