import { BASE_API } from "@/config/url";
import useSwr from "swr";
import { PluginTemplate, PluginTemplateMap } from "./types";

export const usePluginTemplateMap = () => {
  const fetcher = (url: string): Promise<PluginTemplate[]> => {
    return fetch(url).then((r) => r.json());
  };
  const { data, error, isLoading } = useSwr(
    `${BASE_API}/plugins/list`,
    fetcher
  );
  const pluginTemplateMap: PluginTemplateMap = {};

  if (error) {
    // TODO: show some error noti
    console.error(error);
  }

  if (data) {
    data.forEach((pluginTemplate) => {
      // need to ensure that pluginTemplate.name == TemplateType value
      pluginTemplateMap[pluginTemplate.name] = pluginTemplate;
    });
  }

  return { pluginTemplateMap, error, isLoading };
};
