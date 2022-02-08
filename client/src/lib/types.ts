export type Gateway = {
    serial: string,
    name: string,
    ip: string,
    devices: Device[]
    createdAt: Date,
    updatedAt: Date,
  };
  
  export type Device = {
    uid: number,
    vendor: string,
    status: DeviceStatus
    createdAt: Date,
    updatedAt: Date,
  };
  
  export enum DeviceStatus {
    OFFLINE = 'offline',
    ONLINE = 'online',
  }
  