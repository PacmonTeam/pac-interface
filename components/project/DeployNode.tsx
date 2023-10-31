import { Project } from "@/lib/types";
import { useDeployProject } from "@/lib/useProjects";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter,
  useDisclosure,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { GoRocket } from "react-icons/go";
import { toast } from "react-toastify";

interface DeployNode {
  project: Project;
  nodeType: any;
}

export default function DeployNode({ project, nodeType }: DeployNode) {
  const { deployProject, loading: deploying } = useDeployProject();
  const [nodeName, setNodeName] = useState<string>();
  const [nodeNameError, setNodeNameError] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    onOpen() {
      setNodeName("");
    },
  });

  const onCreateNode = async () => {
    if (!nodeName) {
      toast.error("Node Name is empty", {
        icon: "🔴",
      });
      setNodeNameError(true);
      return;
    }

    await deployProject(project, nodeName);
  };
  return (
    <>
      <Button
        size="sm"
        color="success"
        startContent={<GoRocket />}
        onPress={onOpen}
      >
        Deploy New Node
      </Button>
      <Modal
        backdrop="blur"
        isDismissable={!deploying}
        hideCloseButton={deploying}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row items-center gap-2">
                <GoRocket /> Deploy Node Confirmation
              </ModalHeader>
              <ModalBody>
                <div className="grid gap-2">
                  <div className="font-medium">Project Detail</div>
                  <div className="grid grid-cols-3 gap-4 px-0">
                    <div className="text-sm font-extralight leading-6">
                      Project Name
                    </div>
                    <div className="text-sm leading-6 text-default-500 col-span-2 mt-0">
                      {project.name}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 px-0">
                    <div className="text-sm font-extralight leading-6">
                      Template
                    </div>
                    <div className="text-sm leading-6 text-default-500 col-span-2 mt-0">
                      -
                    </div>
                  </div>
                </div>
                <div className="grid gap-2 pt-4">
                  <div className="font-medium">Node Detail</div>
                  <div className="grid grid-cols-3 gap-4 px-0">
                    <div className="text-sm font-extralight leading-6">
                      Node Type
                    </div>
                    <div className="text-sm leading-6 text-default-500 col-span-2 mt-0">
                      25 GB SSD / 4 TB Transfer
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 px-0">
                    <div className="text-sm font-extralight leading-6 self-center">
                      Node Name<span className="text-danger">*</span>
                    </div>
                    <div className="text-sm leading-6 text-default-500 col-span-2 mt-0">
                      <Input
                        placeholder="Enter your node name"
                        type="text"
                        size="sm"
                        value={nodeName}
                        onValueChange={(value) => {
                          if (value) {
                            setNodeNameError(false);
                          }
                          setNodeName(value);
                        }}
                        isInvalid={nodeNameError}
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  size="sm"
                  onPress={onClose}
                  isLoading={deploying}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  onPress={async () => {
                    await onCreateNode();
                    onClose();
                  }}
                  isLoading={deploying}
                >
                  Create Node
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
