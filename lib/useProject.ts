import useSwr, { mutate } from "swr";
import { BASE_API } from "@/config/url";
import { Project } from "./types";

const fetcher = (url: string): Promise<Project> => {
  // skip if id is not fetched
  // if (id === "0" || id === undefined) {
  //   return Promise.resolve(undefined);
  // }
  return fetch(url).then((r) => r.json());
};

export const getProjectById = async (id: string): Promise<Project> => {
  const url = `${BASE_API}/projects/${id}`;
  const result = await fetcher(url);
  mutate(url, result, false);
  return result;
};

export const useProject = (id: string) => {
  const { data, error, isLoading, mutate } = useSwr(
    `${BASE_API}/projects/${id}`,
    (url) => fetcher(url)
  );

  if (error) {
    console.error(error);
  }
  return { data, error, isLoading, mutate };
};
