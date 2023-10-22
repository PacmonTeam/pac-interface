import useSwr from "swr";
import { BASE_API } from "@/config/url";
import { toast } from "react-toastify";
import { Project } from "./types";

export const useProjects = () => {
  const { data, error, isLoading } = useSwr(
    `${BASE_API}/projects`,
    (url: string) => fetch(url).then((r) => r.json())
  );

  if (error) {
    console.error(error);
  }
  return { data, error, isLoading };
};

export const useDeleteProject = () => {
  const deleteProject = async (project: Project) => {
    try {
      const response = await fetch(`${BASE_API}/projects/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id }),
      });
      const { success } = await response.json();

      if (success) {
        toast.success(`Project "${project.name}" was deleted!`, {
          icon: "🌈",
        });
      } else {
        throw new Error("Success is not True!");
      }
    } catch (error) {
      toast.error("Delete Project Fail");
      console.error(error);
    }
  };
  return [deleteProject];
};
