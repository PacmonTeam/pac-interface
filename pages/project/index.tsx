import { Button } from "@nextui-org/react";
import ProjectList from "@/components/project/ProjectList";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-full justify-center">
      <div className="container max-w-[1024px] gap-4 relative">
        <div className="mx-auto w-full px-5 pb-6 flex flex-row justify-between">
          <h1 className="text-3xl font-thin uppercase justify-center">
            Project
          </h1>
          <Button as={Link} color="primary" href="/create">
            Create New Project
          </Button>
        </div>
        <ProjectList />
      </div>
    </div>
  );
}
