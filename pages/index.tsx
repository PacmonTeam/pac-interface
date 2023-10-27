import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/project");
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div className="container max-w-[1024px] gap-4 relative self-center">
        🚦 Redirecting...
      </div>
    </div>
  );
}
