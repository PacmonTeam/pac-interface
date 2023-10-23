import { Spinner } from "@nextui-org/react";

import { useManageNode } from "@/lib/useManageNode";

import { useRouter } from "next/router";
import { NodeWithSigner } from "@/lib/types";
import ManageNodeHeader from "@/components/node/ManageNodeHeader";

export default function Page() {
  const router = useRouter();
  const nodeId = router.query.id;
  const { data: node, isLoading } = useManageNode<NodeWithSigner>(nodeId);

  if (isLoading || !node) {
    return <Spinner color="default" />;
  }
  console.log("manage node =:", node);

  return (
    <div className="flex w-full justify-center">
      <div className="container max-w-[1024px] gap-4 relative">
        <ManageNodeHeader node={node} />
        <p>Manage Node: {router.query.id}</p>
        <p>{JSON.stringify(node)}</p>
      </div>
    </div>
  );
}
