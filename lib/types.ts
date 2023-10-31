import { ethers } from "ethers";
// TODO: merge with status below
export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum TemplateType {
  ERC_20 = "ERC-20 Token",
  UNISWAP_V2 = "Uniswap V2 Pair",
  PRICE_FEED = "Price Feed",
  CUSTOM = "Custom",
}

export enum ScriptType {
  SOLIDITY = "Solidity",
  YAML = "YAML",
}

export enum ArgumentType {
  address = "address",
  uint256 = "uint256",
  boolean = "boolean",
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

export interface Contract {
  id: number;
  address: string;
  name: string;
  script: string;
  configuration: string;
  sequence: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContractWithConverted extends Contract {
  configurationJson: { [key: string]: any };
}

export interface Node {
  id: number;
  name: string;
  rpc: string;
  project: Project;
  contracts: Contract[];
  createdAt: string;
  updatedAt: string;
}

export interface NodeWithSigner extends Node {
  signers: { address: string; privateKey: string }[];
}

export interface FunctionArgument {
  name: string;
  type: ArgumentType;
}

export interface FunctionOnConfiguration {
  name: string;
  arguments: FunctionArgument[];
}

export interface ManageOnConfiguration {
  manage: {
    functions: FunctionOnConfiguration[];
  };
}

interface TemplateRequest {
  script: string;
  configuration: string;
  sequence: number;
  status: Status;
}

export interface CreateProjectResponse {
  // TODO: Fill in if we use or delete
}

export interface ICompileContractInput {
  [name: string]: string;
}

export interface ICompileSource {
  [name: string]: {
    content: string;
  };
}

export interface ICompileOutputSelection {
  [name: string]: {
    [contractName: string]: string[];
  };
}

export interface ICompileContractOutput {
  [name: string]: {
    bytecode: string;
    contractFactory: ethers.ContractFactory;
  };
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
