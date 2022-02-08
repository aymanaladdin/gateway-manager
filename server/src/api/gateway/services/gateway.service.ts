import { nanoid } from 'nanoid';
import { Device, Gateway } from '../types';
import GatewayModel from '../gateway.model';
import { DEFAULT_SELECT } from '../../../util/constants';

const prepareGatewayDevices = (devices: Device[]) => {
  const uid = nanoid();

  return devices.map((device) => ({...device, uid}))
}


const gatewayService = {
  listGateways: async () => {
    const gateways = await GatewayModel.find()
      .select(DEFAULT_SELECT)
      .lean();

    return gateways;
  },

  createGateway: async (gateway: Gateway) => {
    const serial = gateway.serial || nanoid();
    const createdGateway = await GatewayModel.create({ ...gateway, serial });

    return createdGateway;
  },

  getGatewayDetails: async (serial: string) => {
    const gateway = await GatewayModel.findOne({ serial })
      .select(DEFAULT_SELECT)
      .lean();

    return gateway;
  },

  removeGateway: async (serial: string) => {
    await GatewayModel.deleteOne({ serial })
  },
};

export default gatewayService;
