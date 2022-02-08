import Joi from 'joi';
import express from 'express';
import { BAD_REQUEST } from 'http-status';
import APIError from './api-error';

const apiValidateMiddleware = (schema: any) => {
  const options = { abortEarly: false, allowUnknown: true, stripUnknown: true };

  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const data = { body: req.body, params: req.params, query: req.query };
    const { error, value: validatedData } = schema.validate(data, options);

    if (error) {
      const message = `Validation error: ${error.details.map((x: Joi.ErrorReport) => x.message).join(', ')}`;

      throw new APIError({ message, status: BAD_REQUEST, stack: error.stack });
    }

    Object.assign(req, validatedData);

    next();
  };
};

export default apiValidateMiddleware;
