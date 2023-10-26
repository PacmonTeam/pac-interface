export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum TemplateType {
  ERC_20 = "ERC-20 Token",
  UNISWAP_V2 = "Uniswap V2 Pair",
  PRICE_FEED = "Price Feed",
  CUSTOM = "custom",
}

export enum ScriptType {
  SOLIDITY = "Solidity",
  YAML = "YAML",
}

interface UpsertTemplateRequest {
  displayName: string;
  script: string;
  configuration: string;
  sequence: number;
  status: Status;
  type: TemplateType;
}
export interface CreateProjectRequest {
  name: string;
  templates: UpsertTemplateRequest[];
}

export interface UpsertProjectRequest extends CreateProjectRequest {
  id: number;
}

export interface Template extends UpsertTemplateRequest {
  id: number;
  address: string;
  projectId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  name: string;
  templates: Template[];
  createdAt: string;
  updatedAt: string;
}

export interface Node {
  id: number;
  name: string;
  rpc: string;
  project: Project;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectResponse {
  // TODO: Fill in if we use or delete
}

export interface ProjectResponse {
  id: number;
  name: string;
  templates?: Array<Template>;
  createdAt: Date;
  updatedAt: Date;
}

// Note: The name 'Plugin' is duplicated with native browser Plugin which makes autocomplete misunderstood
export interface PluginTemplate {
  defaultDisplayName: string;
  description: string;
  name: string;
  owner: string;
  url: string;
  sampleScript: string;
  sampleConfiguration: string;
}

export type PluginTemplateMap = { [key: string]: PluginTemplate };
