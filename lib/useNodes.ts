import useSwr from "swr";
import { BASE_API } from "@/config/url";
import { Node } from "./types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useNodes = () => {
  const {
    data,
    error,
    isLoading,
  }: { data: Node[] | undefined; error: any; isLoading: boolean } = useSwr(
    `${BASE_API}/nodes`,
    fetcher
  );

  if (error) {
    console.error(error);
  }
  return { data, error, isLoading };
};
