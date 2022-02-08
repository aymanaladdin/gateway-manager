import { model, Schema } from 'mongoose';
import { Device, DeviceStatus, Gateway } from './types';

export const deviceSchema = new Schema<Device>(
  {
    uid: {
      type: String, required: true, unique: true, sparse: true,
    },
    vendor: { type: String, required: true },
    status: { type: String, enum: Object.values(DeviceStatus) },
  },
  { timestamps: true },
);

const gatewaySchema = new Schema<Gateway>(
  {
    serial: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    ip: { type: String, required: true },
    devices: [{
      _id: false,
      uid: {
        type: String, required: true, unique: true, sparse: true,
      },
      vendor: { type: String, required: true },
      status: { type: String, enum: Object.values(DeviceStatus) },
    },
    { timestamps: true },
    ],
  },
  { timestamps: true },
);

const GatewayModel = model<Gateway>('Gateway', gatewaySchema);

export default GatewayModel;
