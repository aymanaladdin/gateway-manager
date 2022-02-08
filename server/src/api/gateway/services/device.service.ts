import { BAD_REQUEST, NOT_FOUND } from 'http-status';
import { nanoid } from 'nanoid';
import APIError from '../../../util/api-error';
import GatewayModel from '../gateway.model';
import { Device } from '../types';

const deviceService = {
  addDeviceToGateway: async (serial: string, device: Device) => {
    const gateway = await GatewayModel.findOne({ serial }).lean();

    if (!gateway) {
      throw new APIError({ status: NOT_FOUND, message: `Gateway ${serial} not found!` });
    }

    if (gateway.devices.length === 10) {
      throw new APIError({ status: BAD_REQUEST, message: 'Max allowed devices per gateway is 10 devices' })
    }

    const deviceData = { ...device, uid: nanoid(), createdAt: new Date(), updatedAt: new Date() }

    await GatewayModel.updateOne({ serial }, { $push: { devices: deviceData } })

    return deviceData;
  },

  removeDeviceFromGateway: async (serial: string, deviceId: string) => {
    const gateway = await GatewayModel.findOne({ serial }).lean();

    if (!gateway) {
      throw new APIError({ status: NOT_FOUND, message: `Gateway ${serial} not found!` });
    }

    console.log('serial', serial, 'uid:', deviceId);

    await GatewayModel.updateOne({ serial }, { $pull: { devices: { uid: deviceId } } });
  },
};

export default deviceService;
