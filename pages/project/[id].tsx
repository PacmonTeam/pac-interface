import AddContractButton from "@/components/create/AddContractButton";
import EditProject from "@/components/project/EditProject";
import { ProjectResponse } from "@/lib/types";
import { useProject } from "@/lib/useProjects";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { AiOutlineSave } from "react-icons/ai";

export default function Page() {
  const router = useRouter();
  const projectId: number = parseInt(router.query.id?.toString() || "0");
  const { data: project } = useProject(projectId);
  console.log(project);

  return (
    <div className="container flex flex-col items-center">
      <div className="container max-w-[1024px] gap-4 relative">
        <div className="mx-auto w-full px-5 pb-6 flex flex-row justify-between">
          <h1 className="text-3xl font-thin uppercase justify-center">
            Project / Project #{project?.id}: {project?.name}
          </h1>
          <div className="flex flex-row">
            <div className="flex flex-row gap-2">
              <AddContractButton onClick={() => {}}></AddContractButton>
              {/* {templateRows.length > 0 ? ( */}
              <Button
                color="primary"
                onClick={() => {
                  // onOpen();
                  return;
                }}
              >
                <AiOutlineSave />
                Save project
              </Button>
            </div>
          </div>
        </div>
      </div>
      <EditProject project={project} />
    </div>
  );
}
