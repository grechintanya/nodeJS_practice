import { Response } from 'express';

export const errorHandler = (err: Error, res: Response) => {
  console.log(err);
  res.status(500).json({ message: 'Internal server error' });
};
