import useSwr, { useSWRConfig } from "swr";
import { BASE_API } from "@/config/url";
import { toast } from "react-toastify";
import { Project } from "./types";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const PROJECTS_URL = `${BASE_API}/projects`;

export const getProjects = async (): Promise<Project[]> => {
  return fetcher(PROJECTS_URL);
};

export const useProjects = () => {
  const { data, error, isLoading } = useSwr(PROJECTS_URL, fetcher);

  if (error) {
    console.error(error);
  }
  return { data, error, isLoading };
};

export const useDeleteProject = () => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const deleteProject = async (project: Project) => {
    setLoading(true);
    const tId = toast.loading(`Deleting project "${project.name}"`);
    try {
      const response = await fetch(`${BASE_API}/projects/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id }),
      });
      const { success } = await response.json();

      if (success) {
        toast.update(tId, {
          render: `Project "${project.name}" was deleted!`,
          type: "success",
          icon: "🌈",
          autoClose: 8000,
          closeOnClick: true,
          isLoading: false,
        });
        mutate(`${BASE_API}/projects`);
      } else {
        throw new Error("Success is not True!");
      }
    } catch (error) {
      toast.update(tId, {
        render: "Fail to delete project",
        type: "error",
        autoClose: 8000,
        closeOnClick: true,
        isLoading: false,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { deleteProject, loading };
};

export const useDeployProject = () => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();

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
          autoClose: 8000,
          closeOnClick: true,
          isLoading: false,
        });
        mutate(`${BASE_API}/nodes`);
      } else {
        throw new Error("Node not found!");
      }
    } catch (error) {
      toast.update(tId, {
        render: "Deploy Project Fail!",
        type: "error",
        closeOnClick: true,
        autoClose: 8000,
        isLoading: false,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { deployProject, loading };
};
