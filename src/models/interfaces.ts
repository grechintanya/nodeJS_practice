import { ObjectId } from 'mongodb';

export interface GenreObj {
  _id?: ObjectId | string;
  name: string;
}

export interface MovieObj {
  _id?: ObjectId | string;
  title: string;
  description: string;
  releaseDate: Date | string;
  genres: ObjectId[] | string[];
}
