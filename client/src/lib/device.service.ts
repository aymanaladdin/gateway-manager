import axios from "axios";
import { API_URL } from "./constants";
import { Device } from "./types";

const httpClient = axios.create({ baseURL: API_URL });

const deviceService = {
  removeGatewayDevice: async (serial: string, uid: number) => {
    await httpClient.delete(`/gateways/${serial}/devices/${uid}`);
  },

  addGatewayDevice: async (serial: string, deviceBody: Pick<Device, 'vendor' | 'status'>) => {
    const {data} = await httpClient.post<Device>(`/gateways/${serial}/devices`, deviceBody);

    return data
  },
};

export default deviceService;