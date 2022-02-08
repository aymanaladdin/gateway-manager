import { Router } from 'express';
import { GATEWAY_DEVICE_PATH } from '../../../util/constants';
import apiValidateMiddleware from '../../../util/validator';
import gatewayController from '../controllers/gateway.controller';
import { createGatewaySchema, gatewaySerialSchema } from '../validatiors/gateway.validation';
import deviceRoutes from './device.routes';

const gateWayRoutes = Router({ mergeParams: true });

gateWayRoutes.get('/', gatewayController.listGateways);
gateWayRoutes.post('/', apiValidateMiddleware(createGatewaySchema), gatewayController.addGateway);
gateWayRoutes.get('/:serial', apiValidateMiddleware(gatewaySerialSchema), gatewayController.getGatewayDetails);
gateWayRoutes.delete('/:serial', apiValidateMiddleware(gatewaySerialSchema), gatewayController.removeGateway);

gateWayRoutes.use(GATEWAY_DEVICE_PATH, deviceRoutes);

export default gateWayRoutes;
