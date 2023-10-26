import { ProjectResponse } from "./types";
import { TemplateRowProps } from "@/components/template/TemplateRow";

export const getTemplateRowPropsArrayFromProject = (
  project: ProjectResponse | undefined
): TemplateRowProps[] => {
  return project
    ? project.templates
      ? project.templates.map((template, i) => {
          return {
            key: template.id,
            id: `${template.type}-${i}`,
            index: i,
            text: template.type,
            templateType: template.type,
            solidityScript: template.script,
            yamlConfiguration: template.configuration,
          };
        })
      : []
    : [];
};
