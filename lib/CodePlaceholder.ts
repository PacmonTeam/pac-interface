import { ScriptType, TemplateType, PluginTemplateMap } from "@/lib/types";

// Use this dude: https://jsstringconverter.bbody.io/
// Note: Default template placeholder when something went wrong
const PLACEHOLDER_SOLIDITY_ERC20 = `// Solidity Code`;

const PLACEHOLDER_YAML_ERC20 = `contractName:
constructor:
manage:
  functions:
output:`;

export const getPluginTemplateCode = (
  scriptType: ScriptType,
  templateType: TemplateType,
  pluginTemplateMap: PluginTemplateMap
) => {
  let code = "";
  if (pluginTemplateMap[templateType]) {
    if (scriptType === ScriptType.SOLIDITY)
      code = pluginTemplateMap[templateType].sampleScript;
    else if (scriptType === ScriptType.YAML)
      code = pluginTemplateMap[templateType].sampleConfiguration;
  } else {
    // default code: when loading fails
    if (scriptType === ScriptType.SOLIDITY) code = PLACEHOLDER_SOLIDITY_ERC20;
    else if (scriptType === ScriptType.YAML) code = PLACEHOLDER_YAML_ERC20;
  }

  return code;
};
