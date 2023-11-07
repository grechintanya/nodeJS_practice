import { ObjectId } from 'mongodb';

export interface GenreObj {
  _id?: ObjectId;
  name: String;
}

export interface MovieObj {
  _id?: ObjectId;
  title: String;
  description: String;
  releaseDate: Date;
  genres: ObjectId[];
}
