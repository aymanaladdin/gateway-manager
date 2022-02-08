import { Router } from 'express';
import apiValidateMiddleware from '../../../util/validator';
import deviceController from '../controllers/device.controller';
import { createDeviceSchema, gatewayDeviceParamSchema } from '../validatiors/device.validation';

const deviceRoutes = Router({ mergeParams: true });

deviceRoutes.post('/', apiValidateMiddleware(createDeviceSchema), deviceController.addPeripheralDevice);
deviceRoutes.delete('/:uid', apiValidateMiddleware(gatewayDeviceParamSchema), deviceController.removePeripheralDevice);

export default deviceRoutes;
