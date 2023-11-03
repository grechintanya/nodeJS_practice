import { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

export class ValidationError extends AppError {
  constructor(
    statusCode: number,
    message: string,
    public errors: any[],
  ) {
    super(statusCode, message);
  }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err.errors);
  }
  const status = err instanceof AppError ? err?.statusCode : 500;
  const message = err.message || 'Something went wrong';
  return res.status(status).json(message);
};
