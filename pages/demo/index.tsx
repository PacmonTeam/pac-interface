import DemoApp from "@/components/demo/DemoApp";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full justify-center">
      <DemoApp />
    </div>
  );
}
