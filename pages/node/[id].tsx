import { useManageNode } from "@/lib/useManageNode";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const nodeId = router.query.id;
  const { data, isLoading } = useManageNode(nodeId);

  if (isLoading) {
    return <Spinner color="default" />;
  }

  console.log("manage node =:", data);

  return (
    <>
      <p>Manage Node: {router.query.id}</p>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}
