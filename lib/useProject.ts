import useSwr, { mutate } from "swr";
import { BASE_API } from "@/config/url";
import { Project } from "./types";

const fetcher = (
  url: string,
  id: number | undefined
): Promise<Project | undefined> => {
  // skip if id is not fetched
  if (id === 0 || id === undefined) {
    return Promise.resolve(undefined);
  }
  return fetch(url).then((r) => r.json());
};

export const getProjectById = async (
  id: number | undefined
): Promise<Project | undefined> => {
  const url = `${BASE_API}/projects/${id}`;
  const result = await fetcher(url, id);
  mutate(url, result, false);
  return result;
};

export const useProject = (id: number | undefined) => {
  const { data, error, isLoading, mutate } = useSwr(
    [`${BASE_API}/projects/${id}`, id],
    ([url, id]) => fetcher(url, id)
  );

  if (error) {
    console.error(error);
  }
  return { data, error, isLoading, mutate };
};
