import useSwr, { useSWRConfig } from "swr";
import { BASE_API } from "@/config/url";
import { Node } from "./types";
import { toast } from "react-toastify";
import { useState } from "react";

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

export const useDeleteNode = () => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const deleteNode = async (node: Node) => {
    setLoading(true);
    const tId = toast.loading(`Deleting node "${node.name}"`);
    try {
      const response = await fetch(`${BASE_API}/nodes/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodeId: node.id }),
      });
      const { success } = await response.json();

      if (success) {
        toast.update(tId, {
          render: `Node "${node.name}" was deleted!`,
          type: "success",
          icon: "🌈",
          autoClose: 8000,
          closeOnClick: true,
          isLoading: false,
        });
        mutate(`${BASE_API}/nodes`);
      } else {
        throw new Error("Success is not True!");
      }
    } catch (error) {
      toast.update(tId, {
        render: `Delete Node{${node.id}} Fail`,
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
  return { deleteNode, loading };
};
