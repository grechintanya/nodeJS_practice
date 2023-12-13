import { describe, test } from '@jest/globals';
import { NextFunction, Request, Response } from 'express';

import { AppError, errorHandler, ValidationError } from '../../middleware/errorHandlers';
import { FakeExpress } from '../fakeExpress';

describe('Global Error handler', () => {
  let fakeExpress = new FakeExpress({} as Partial<Request>);
  test('should log error object in console', () => {
    const error = new Error('Something went wrong');
    const fakeLog = jest.spyOn(console, 'log');
    errorHandler(error, fakeExpress.req as Request, fakeExpress.res as Response, fakeExpress.next);
    expect(fakeLog).toHaveBeenCalledWith(error);
  });

  test('if it called with ValidationError, it should sent response with appropriative status code and array of errors', () => {
    const error = new ValidationError(400, 'Bad request!', [{ path: 'name', msg: 'name is Required!' }]);
    errorHandler(error, fakeExpress.req as Request, fakeExpress.res as Response, fakeExpress.next);
    expect(fakeExpress.res.statusCode).toBe(400);
    expect(fakeExpress.responseData).toMatchObject(error.errors);
  });

  test('if error has status code and message, it should send response with them', () => {
    const error = new AppError(400, 'Bad request!');
    errorHandler(error, fakeExpress.req as Request, fakeExpress.res as Response, fakeExpress.next);
    expect(fakeExpress.res.statusCode).toBe(400);
    expect(fakeExpress.responseData).toEqual('Bad request!');
  });

  test(`if error doesn't have status code, it should send response with code 500`, () => {
    const error = new Error('Bad request!');
    errorHandler(error, fakeExpress.req as Request, fakeExpress.res as Response, fakeExpress.next);
    expect(fakeExpress.res.statusCode).toBe(500);
    expect(fakeExpress.responseData).toEqual('Bad request!');
  });

  test(`if error doesn't have error message, it should send response with message 'Something went wrong`, () => {
    const error = new Error();
    errorHandler(error, fakeExpress.req as Request, fakeExpress.res as Response, fakeExpress.next);
    expect(fakeExpress.res.statusCode).toBe(500);
    expect(fakeExpress.responseData).toEqual('Something went wrong');
  });
});
