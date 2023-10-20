// import { useProjects } from "../lib/useProject";
// import { Skeleton } from "@nextui-org/react";

export default function Home() {
  // const { data: projects, isLoading: isProjectsLoading } = useProjects();
  return (
    <div className="flex w-full justify-center">
      <div className="container max-w-[1024px] px-6 gap-4 relative">
        <div className="flex basis-0 gap-4">
          Project
          {/* <Skeleton isLoaded={isProjectsLoading}>
              <div className="h-24 rounded-lg bg-secondary"></div>
            </Skeleton> */}
        </div>
        <div className="flex basis-0 gap-4">Node List</div>
      </div>
    </div>
  );
}
