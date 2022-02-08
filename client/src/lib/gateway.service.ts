import httpClient from "./http-client";
import { Gateway } from "./types";

const gatewayService = {
  getAll: async () => {
    const { data } = await httpClient.get<Gateway[]>('/gateways');

    return data;
  },
  
  getDetails: async (serial: string) => {
    const { data } = await httpClient.get<Gateway>(`/gateways/${serial}`);

    return data;
  }
};

export default gatewayService;