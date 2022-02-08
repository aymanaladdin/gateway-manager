export type Gateway = {
  serial: string,
  name: string,
  ip: string,
  devices: Device[]
};

export type Device = {
  uid: number,
  vendor: string,
  createAt: Date,
  status: DeviceStatus
};

export enum DeviceStatus {
  OFFLINE = 'offline',
  ONLINE = 'online',
}
