import httpStatus, { HttpStatus } from 'http-status';

export type APIErrorOptions = {
  message?: string;
  stack?: any;
  status: number;
};

class APIError extends Error {
  stack: any;

  status: number;

  constructor(options: APIErrorOptions) {
    super(options.message);
    this.stack = options.stack;
    this.status = options.status || httpStatus.INTERNAL_SERVER_ERROR;
  }
}

export default APIError;
