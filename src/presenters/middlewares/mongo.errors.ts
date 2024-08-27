import { NextFunction, Request, Response } from 'express';

interface CustomError extends Error {
  status?: number;
  details?: unknown;
}

export function mongoErrorInterceptor(err: CustomError, req: Request, res: Response, next: NextFunction) {
  let { status = 500, message } = err;
  let isMongoError = false;

  if (err.name === 'EntityNotFoundError') {
    status = 404;
    message = 'Entity not found.';
    isMongoError = true;
  }
  if (err.name === 'MongoBulkWriteError') {
    status = 400;
    isMongoError = true;
  }

  if (isMongoError) {
    res.status(status).json({
      status,
      message,
      details: err.details || err.message,
    });
  } else {
    next(err);
  }
}

export default mongoErrorInterceptor;
