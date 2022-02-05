import { Router } from 'express';
import gatewayController from './gateway.controller';

const gateWayRoutes = Router();

gateWayRoutes.get('/', gatewayController.listGateways);
gateWayRoutes.post('/', gatewayController.addGateway);
gateWayRoutes.put('/:serialNumber', () => {});
gateWayRoutes.get('/:serialNumber', gatewayController.getGatewayDetails);

export default gateWayRoutes;
