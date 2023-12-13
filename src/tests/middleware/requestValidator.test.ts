import { describe, test } from '@jest/globals';
import { body, ValidationChain } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

import { FakeExpress } from '../fakeExpress';
import createRequestValidator from '../../middleware/requestValidator';
import { ValidationError } from '../../middleware/errorHandlers';

describe('Request Validator', () => {
  const validations: ValidationChain[] = [
    body('id').trim().notEmpty().withMessage('ID is required'),
    body('name').trim().notEmpty().withMessage('Name is required'),
  ];
  let fakeExpress: FakeExpress;
  let requestValidator = createRequestValidator(validations);

  test('if input data is valid, should call next function', async () => {
    const req: Partial<Request> = { body: { id: 111, name: 'test' } };
    fakeExpress = new FakeExpress(req);
    await requestValidator(fakeExpress.req as Request, fakeExpress.res as Response, fakeExpress.next as NextFunction);
    expect(fakeExpress.next).toHaveBeenCalled();
    expect(fakeExpress.error).toBeFalsy();
  });

  test('if input data is invalid, should throw error', async () => {
    const req: Partial<Request> = { body: { name: 'test' } };
    fakeExpress = new FakeExpress(req);
    await requestValidator(fakeExpress.req as Request, fakeExpress.res as Response, fakeExpress.next as NextFunction);
    expect(fakeExpress.error).toBeInstanceOf(ValidationError);
    expect(fakeExpress.error.message).toBe('Invalid input!');
    expect(fakeExpress.error.statusCode).toBe(400);
    expect(fakeExpress.error.errors[0]).toHaveProperty('msg', 'ID is required');
  });
});
