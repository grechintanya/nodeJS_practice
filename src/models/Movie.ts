import mongoose, { Schema } from 'mongoose';

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  genres: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Genre',
      required: true,
    },
  ],
});

export default mongoose.model('Movie', movieSchema);
