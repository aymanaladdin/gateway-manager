import Joi from 'joi';
import { DeviceStatus } from '../types';

export const createGatewaySchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    ip: Joi.string().ip({ version: ['ipv4'] }),
    devices: Joi.array()
      .items(
        Joi.object({
          vendor: Joi.string().required(),
          status: Joi.string().valid(...Object.values(DeviceStatus)).required(),
        }),
      )
      .min(1).max(10),
  }),
});

export const gatewaySerialSchema = Joi.object({
  params: Joi.object({
    serial: Joi.string().max(21).required(),
  }),
});
