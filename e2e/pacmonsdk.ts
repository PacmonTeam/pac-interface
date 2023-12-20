import _ from "lodash";
import { PacDemo__factory } from "./typechain";
import { PacDemoInterface } from "./typechain/PacDemo";
import axios, { Axios } from "axios";

interface Contracts {
  demo: string;
  pool: string;
  pricefeed1: string;
  pricefeed2: string;
  token1: string;
  token2: string;
}

interface Interfaces {
  demo: PacDemoInterface;
}

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

export class PacmonDemoSDK extends PacmonSDK {
  contracts: Contracts;
  interfaces: Interfaces;
  signerAddress: string;

  constructor(projectId: number, api: string) {
    super(projectId, api);
    this.contracts = {
      demo: "",
      pool: "",
      pricefeed1: "",
      pricefeed2: "",
      token1: "",
      token2: "",
    };
    this.interfaces = {
      demo: PacDemo__factory.createInterface(),
    };
    this.signerAddress = "";
  }

  async init(nodeId?: number) {
    this.nodeId = nodeId || (await this.createNode());
    const { contracts, signers } = await this.getNodeInfo();
    const sortedContracts = _.sortBy(contracts, "sequence");
    this.contracts = {
      token1: sortedContracts[0].address,
      token2: sortedContracts[1].address,
      pool: sortedContracts[2].address,
      pricefeed1: sortedContracts[3].address,
      pricefeed2: sortedContracts[4].address,
      demo: sortedContracts[5].address,
    };
    this.signerAddress = signers[0].address;
  }

  async enableDeposit() {
    const data = this.interfaces.demo.encodeFunctionData("setDepositEnabled", [
      true,
    ]);
    await this.call(this.contracts.demo, data, this.signerAddress);
  }

  async disableDeposit() {
    const data = this.interfaces.demo.encodeFunctionData("setDepositEnabled", [
      false,
    ]);
    await this.call(this.contracts.demo, data, this.signerAddress);
  }

  async enableWithdraw() {
    const data = this.interfaces.demo.encodeFunctionData("setWithdrawEnabled", [
      true,
    ]);
    await this.call(this.contracts.demo, data, this.signerAddress);
  }

  async disableWithdraw() {
    const data = this.interfaces.demo.encodeFunctionData("setWithdrawEnabled", [
      false,
    ]);
    await this.call(this.contracts.demo, data, this.signerAddress);
  }

  async setPrice1(price: number) {}
}
