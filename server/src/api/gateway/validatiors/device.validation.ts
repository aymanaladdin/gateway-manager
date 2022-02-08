import Joi from 'joi';
import { DeviceStatus } from '../types';

export const createDeviceSchema = Joi.object({
  params: Joi.object({
    serial: Joi.string().max(21).required(),
  }),

  body: Joi.object({
    vendor: Joi.string().required(),
    status: Joi.string().valid(...Object.values(DeviceStatus)).required(),
  }),
});

export const gatewayDeviceParamSchema = Joi.object({
  params: Joi.object({
    serial: Joi.string().max(21).required(),
    uid: Joi.string().max(21).required(),
  }),

});
