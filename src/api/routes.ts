import { Router } from 'express';
import gateWayRoutes from './gateway/routes';
import deviceRoutes from './peripheral-device/routes';
import { DEVICE_PATH, GATEWAY_PATH } from '../constants';

const appRoutes = Router();

appRoutes.use(GATEWAY_PATH, gateWayRoutes);
appRoutes.use(DEVICE_PATH, deviceRoutes);

export default appRoutes;
