import useSwr from "swr";
import { BASE_API } from "@/config/url";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useProjects = () => {
  const { data, error, isLoading } = useSwr(`${BASE_API}/projects`, fetcher);

  if (error) {
    console.error(error);
  }
  return { data, error, isLoading };
};
