export const LOG_OPTION = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

export const API_VERSION = '/api/v1';

export const GATEWAY_PATH = '/gateways';

export const GATEWAY_DEVICE_PATH = '/:serial/devices';

export const DEFAULT_SELECT = { __v: 0, updatedAt: 0, _id: 0 };
