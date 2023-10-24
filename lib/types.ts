// TODO: merge with status below
enum STATUS {
  ACTIVE,
  INACTIVE,
}

export enum ContractType {
  ERC_20 = "ERC-20",
  UNISWAP_V2 = "UniswapV2",
  PRICE_FEED = "PriceFeed",
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
