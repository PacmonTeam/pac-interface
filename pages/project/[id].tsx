import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return <p>Manage Project: {router.query.id}</p>;
}
