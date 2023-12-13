import { Response, Request, NextFunction } from 'express';

export class FakeExpress {
  constructor(req: Partial<Request>) {
    this.req = req;
  }
  res: Partial<Response> = {
    statusCode: 200,
    status: jest.fn().mockImplementation((code) => {
      this.res.statusCode = code;
      return this.res;
    }),
    json: jest.fn().mockImplementation((param) => {
      this.responseData = param;
      return this.res;
    }),
    sendStatus: jest.fn().mockImplementation((code) => {
      this.res.statusCode = code;
      return this.res;
    }),
  };
  req: Partial<Request>;
  next: NextFunction = jest.fn().mockImplementation((err) => {
    this.error = err;
  });

  responseData: any;
  error: any;
}
