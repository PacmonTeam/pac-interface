import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return <p>Manage Node: {router.query.id}</p>;
}
