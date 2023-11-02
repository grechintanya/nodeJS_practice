import { Request, Response } from 'express';

import { Genre, GenreObj } from '../models';
import { errorHandler } from '../middleware/errorHandlers';

export const getAllGenres = async (req: Request, res: Response) => {
  const genres: GenreObj[] = await Genre.find();
  if (!genres.length) {
    return res.sendStatus(204);
  }
  res.status(200).json(genres);
};

export const createGenre = async (req: Request, res: Response) => {
  try {
    const savedGenre: GenreObj = await Genre.create(req.body);
    res.status(201).json({ genre: savedGenre });
  } catch (err) {
    errorHandler(err as Error, res);
  }
};

export const updateGenre = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedGenre = req.body;
    const result = await Genre.updateOne({ _id: id }, updatedGenre);
    if (!result.matchedCount) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    res.status(200).json({ message: `Genre with id ${id} was updated` });
  } catch (err) {
    errorHandler(err as Error, res);
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await Genre.deleteOne({ _id: id });
    if (!result.deletedCount) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    res.status(200).json({ message: `Genre with id ${id} was deleted` });
  } catch (err) {
    errorHandler(err as Error, res);
  }
};
