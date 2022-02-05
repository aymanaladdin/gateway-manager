import { Router } from 'express';
import gateWayRoutes from './gateway/routes';
import deviceRoutes from './device/routes';
import { GATEWAY_DEVICE_PATH, GATEWAY_PATH } from '../util/constants';

const appRoutes = Router();

appRoutes.use(GATEWAY_PATH, gateWayRoutes);
appRoutes.use(GATEWAY_DEVICE_PATH, deviceRoutes);

export default appRoutes;
