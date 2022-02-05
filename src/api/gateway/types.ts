import { Device } from '../device/types';

export type Gateway = {
  serialNumber: string,
  name: string,
  ipAddress: string,
  peripheralDevices: Device[]
};
