import useSwr from "swr";
import { BASE_API } from "@/config/url";
import { toast } from "react-toastify";
import { Project } from "./types";
import { useState } from "react";

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

export const useDeployProject = () => {
  const [loading, setLoading] = useState(false);
  const deployProject = async (project: Project, nodeName: string) => {
    setLoading(true);
    const tId = toast.loading(`Deploying node "${nodeName}"`);
    try {
      const response = await fetch(`${BASE_API}/projects/deploy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id, nodeName }),
      });
      const { name } = await response.json();

      if (name === nodeName) {
        toast.update(tId, {
          render: `Project "${project.name}" was deployed!`,
          type: "success",
          icon: "🌈",
          autoClose: 15000,
          closeOnClick: true,
          isLoading: false,
        });
      } else {
        throw new Error("Node not found!");
      }
    } catch (error) {
      toast.update(tId, {
        render: "Deploy Project Fail!",
        type: "error",
        closeOnClick: true,
        autoClose: 15000,
        isLoading: false,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { deployProject, loading };
};
