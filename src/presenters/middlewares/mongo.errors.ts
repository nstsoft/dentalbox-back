import { NextFunction, Request, Response } from 'express';
import { MongoError } from 'mongodb'; // Import MongoDB error types if using MongoDB native driver

// Define a type for custom error handling
interface CustomError extends Error {
  status?: number;
  details?: unknown;
}

export function mongoErrorInterceptor(err: CustomError, req: Request, res: Response, next: NextFunction) {
  if (err instanceof MongoError) {
    console.error('MongoDB Error:', err.message); // Log the error details

    // Customize the response based on error type
    let status = 500;
    let message = 'An unexpected error occurred.';

    if (err.code === 11000) {
      // Duplicate key error
      status = 400;
      message = 'Duplicate key error.';
    } else if (err.name === 'ValidationError') {
      status = 400;
      message = 'Validation error.';
    }

    const mongoErr: CustomError = err;

    res.status(status).json({
      status,
      message,
      details: mongoErr.details || mongoErr.message,
    });
  } else {
    // For other types of errors, pass them to the default error handler
    next(err);
  }
}

export default mongoErrorInterceptor;
