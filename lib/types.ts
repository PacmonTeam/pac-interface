// TODO: merge with status below
enum STATUS {
  ACTIVE,
  INACTIVE,
}

export enum ContractType {
  ERC_20 = "ERC-20 Token",
  UNISWAP_V2 = "Uniswap V2 Pair",
  PRICE_FEED = "Price Feed",
  CUSTOM = "custom",
}

export enum ScriptType {
  SOLIDITY,
  YAML,
}

export interface Template {
  id: number;
  script: string;
  configuration: string;
  sequence: number;
  status: STATUS;
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
export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

interface TemplateRequest {
  script: string;
  configuration: string;
  sequence: number;
  status: Status;
}
export interface CreateProjectRequest {
  name: string;
  templates: TemplateRequest[];
}

export interface CreateProjectResponse {
  // TODO: Fill in if we use or delete
}

interface TemplateResponse {
  id: number;
  script: string;
  configuration: string;
  type: ContractType;
  sequence: number;
  status: Status;
  projectId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectResponse {
  id: number;
  name: string;
  templates?: Array<TemplateResponse>;
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
