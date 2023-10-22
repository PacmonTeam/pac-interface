import { BASE_API } from "@/config/url";
import CreateProjectSection from "../../components/create/CreateProjectSection";
import { CreateProjectRequest } from "@/lib/types";

export default function Page({ children }: { children: React.ReactNode }) {
  async function createProject(request: CreateProjectRequest) {
    return fetch(`${BASE_API}/projects/create`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  }
  return <CreateProjectSection createProject={createProject} />;
}
