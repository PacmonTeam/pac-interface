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
