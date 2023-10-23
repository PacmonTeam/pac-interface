import { BASE_API } from "@/config/url";
import useSWR from "swr";
import { Node } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useManageNode = <T = Node>(nodeId: any) => {
  const {
    data,
    error,
    isLoading,
  }: { data: T; isLoading: boolean; error: any } = useSWR(
    nodeId ? `${BASE_API}/nodes/${nodeId}` : null,
    fetcher
  );

  if (error) {
    console.error(error);
  }
  return { data, error, isLoading };
};
