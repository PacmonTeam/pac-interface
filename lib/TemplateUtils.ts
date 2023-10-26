import { ProjectResponse } from "./types";
import { TemplateRowProps } from "@/components/create/TemplateRow";

export const getTemplateRowPropsArrayFromProject = (
  project: ProjectResponse | undefined
): TemplateRowProps[] => {
  return project
    ? project.templates
      ? project.templates.map((template, i) => {
          const contractType = template.type;
          return {
            key: template.id,
            id: `${contractType}-${i}`,
            index: i,
            text: contractType,
            contractType: contractType,
            solidityScript: template.script,
            yamlConfiguration: template.configuration,
          };
        })
      : []
    : [];
};
