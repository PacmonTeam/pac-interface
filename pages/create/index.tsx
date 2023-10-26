import { BASE_API } from "@/config/url";
import CreateProjectSection from "../../components/create/CreateProjectSection";
import { CreateProjectRequest } from "@/lib/types";
import { usePluginTemplateMap } from "@/lib/usePlugins";
import { plugin } from "postcss";

export default function Page({ children }: { children: React.ReactNode }) {
  const { pluginTemplateMap } = usePluginTemplateMap();
  async function createProject(request: CreateProjectRequest) {
    return fetch(`${BASE_API}/projects/create`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  }
  return (
    <div className="flex w-full justify-center">
      <CreateProjectSection
        createProject={createProject}
        pluginTemplateMap={pluginTemplateMap}
      />
    </div>
  );
}
