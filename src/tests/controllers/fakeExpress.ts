import { Response, Request } from 'express';

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
  responseData: any;
}
