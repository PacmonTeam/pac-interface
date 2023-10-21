import ProjectList from "@/components/Home/ProjectList";
import NodeList from "@/components/Home/NodeList";
import { useProjects } from "@/lib/useProject";

export default function Home() {
  const { data: projects, isLoading: isProjectsLoading } = useProjects();

  console.log("use projects =:", projects, isProjectsLoading);
  return (
    <div className="flex w-full justify-center">
      <div className="container max-w-[1024px] gap-4 relative">
        <div className="flex my-2 flex-col">
          <div className="mx-auto max-w-7xl py-6 flex flex-row items-center gap-2">
            <h1 className="text-xl font-extrabold uppercase">Project</h1>
          </div>
          <ProjectList />
        </div>
        <div className="flex my-2 flex-col">
          <div className="mx-auto max-w-7xl py-6 flex flex-row items-center gap-2">
            <h1 className="text-xl font-extrabold uppercase">Node</h1>
          </div>
          <NodeList />
        </div>
      </div>
    </div>
  );
}
