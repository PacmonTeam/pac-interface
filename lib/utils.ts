import YAML from "yaml";

export const convertYAMLStringToJson = (data: string): any => {
  return YAML.parse(data);
};
