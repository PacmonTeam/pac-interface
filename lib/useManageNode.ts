import { BASE_API } from "@/config/url";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useManageNode = (nodeId: any) => {
  const { data, error, isLoading } = useSWR(
    `${BASE_API}/nodes/${nodeId}`,
    fetcher
  );

  if (error) {
    console.error(error);
  }
  return { data, error, isLoading };
};
