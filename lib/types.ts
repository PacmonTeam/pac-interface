import { ethers } from "ethers";
// TODO: merge with status below
enum STATUS {
  ACTIVE,
  INACTIVE,
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

enum ArgumentType {
  address,
  uint256,
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
