import { Request, Response } from 'express';

import { Movie, Genre, GenreObj, MovieObj } from '../models';
import { errorHandler } from '../middleware/errorHandlers';

export const getAllMovies = async (req: Request, res: Response) => {
  const movies: MovieObj[] = await Movie.find();
  if (!movies.length) {
    return res.sendStatus(204);
  }
  res.json(movies);
};

export const getMoviesByGenre = async (req: Request, res: Response) => {
  const genreName = req.params.genreName;
  const genre: GenreObj | null = await Genre.findOne({ name: genreName });
  if (!genre) {
    return res.status(400).json({ message: 'Invalid genre' });
  }
  const movies: MovieObj[] = await Movie.find({ genres: genre._id });
  if (!movies.length) {
    return res.sendStatus(204);
  }
  res.status(200).json(movies);
};

export const createMovie = async (req: Request, res: Response) => {
  try {
    const newMovie: MovieObj = req.body;
    const savedMovie = (await Movie.create(newMovie)).toObject();
    res.status(201).json({ movie: savedMovie });
  } catch (err) {
    errorHandler(err as Error, res);
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedMovie = req.body as MovieObj;
    const result = await Movie.updateOne({ _id: id }, updatedMovie);
    if (!result.matchedCount) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({ message: `Movie with id ${id} was updated` });
  } catch (err) {
    errorHandler(err as Error, res);
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await Movie.deleteOne({ _id: id });
    if (!result.deletedCount) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({ message: `Movie with id ${id} was deleted` });
  } catch (err) {
    errorHandler(err as Error, res);
  }
};