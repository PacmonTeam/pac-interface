import ProjectList from "@/components/Home/ProjectList";
import { useProjects } from "../lib/useProject";
import { Skeleton, Button } from "@nextui-org/react";

export default function Home() {
  const { data: projects, isLoading: isProjectsLoading } = useProjects();

  console.log("use projects =:", projects, isProjectsLoading);
  return (
    <div className="flex w-full justify-center">
      <div className="container max-w-[1024px] px-6 gap-4 relative">
        <div className="flex my-2 flex-col">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <div className="text-xl uppercase">Project</div>
          </div>
          <ProjectList />
        </div>
        <div className="flex basis-0 gap-4">Node List</div>
      </div>
    </div>
  );
}
