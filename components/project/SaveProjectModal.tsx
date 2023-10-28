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
import { useState } from "react";

interface SaveProjectModalProps {
  isOpen: boolean;
  isLoading: boolean;
  projectName?: string;
  onClose: () => void;
  onSaveProjectClick: (projectName: string) => void;
}

export default function SaveProjectModal(props: SaveProjectModalProps) {
  const [projectName, setProjectName] = useState<string>(
    props.projectName || ""
  );
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={() => {
        setProjectName(props.projectName || "");
        props.onClose();
      }}
    >
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
                value={projectName}
                onValueChange={(value) => {
                  setProjectName(value);
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  setProjectName(props.projectName || "");
                  onClose();
                }}
              >
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  if (projectName === "") return;
                  props.onSaveProjectClick(projectName);
                }}
                isLoading={props.isLoading}
                isDisabled={projectName === ""}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
