import { NextFunction, Request, Response } from 'express';

import { Genre, GenreObj } from '../models';
import { AppError } from '../middleware/errorHandlers';

export const getAllGenres = async (req: Request, res: Response) => {
  const genres: GenreObj[] = await Genre.find();
  res.json(genres);
};

export const createGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const savedGenre: GenreObj = await Genre.create(req.body);
    res.status(201).json({ genre: savedGenre });
  } catch (err) {
    next(err);
  }
};

export const updateGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const updatedGenre = req.body;
    const result = await Genre.updateOne({ _id: id }, updatedGenre);
    if (!result.matchedCount) {
      throw new AppError(404, 'Genre not found');
    }
    res.status(200).json({ message: `Genre with id ${id} was updated` });
  } catch (err) {
    next(err);
  }
};

export const deleteGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await Genre.deleteOne({ _id: id });
    if (!result.deletedCount) {
      throw new AppError(404, 'Genre not found');
    }
    res.status(200).json({ message: `Genre with id ${id} was deleted` });
  } catch (err) {
    next(err);
  }
};
