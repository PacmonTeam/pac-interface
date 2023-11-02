import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/project");
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div className="container max-w-[1024px] gap-4 text-center font-light text-lg text-default-500">
        🚦 Redirecting...
      </div>
    </div>
  );
}
