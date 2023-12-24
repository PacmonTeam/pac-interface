import axios, { Axios } from "axios";

interface NodeInfoResp {
  contracts: { sequence: number; name: string; address: string }[];
  signers: { address: string }[];
}

export class PacmonSDK {
  projectId: number;
  nodeId?: number;
  axiosClient: Axios;

  constructor(projectId: number, api: string) {
    this.projectId = projectId;
    this.axiosClient = axios.create({
      baseURL: api,
      timeout: 300000,
    });
  }

  async createNode() {
    const resp = await this.axiosClient.post(`projects/deploy`, {
      projectId: this.projectId,
      nodeName: "Test Node",
    });
    return resp.data.id;
  }

  async deleteNode() {
    const resp = await this.axiosClient.post(`nodes/delete`, {
      nodeId: this.nodeId,
    });
  }

  async getNodeInfo() {
    const resp = await this.axiosClient.get<NodeInfoResp>(
      `nodes/${this.nodeId}`
    );
    return resp.data;
  }

  async call(contractAddress: string, data: string, callerAddress: string) {
    const resp = await this.axiosClient.post(`/nodes/call`, {
      nodeId: this.nodeId,
      contractAddress,
      encodedData: data,
      callerAddress,
    });
  }
}
