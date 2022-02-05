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
