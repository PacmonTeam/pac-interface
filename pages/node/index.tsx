import NodeList from "@/components/node/NodeList";

export default function Node() {
  return (
    <div className="flex w-full justify-center">
      <div className="container max-w-[1024px] gap-4 relative">
        <div className="mx-auto w-full px-5 pb-6 flex flex-row justify-between">
          <h1 className="text-3xl font-thin uppercase justify-center">Node</h1>
        </div>
        <NodeList />
      </div>
    </div>
  );
}
