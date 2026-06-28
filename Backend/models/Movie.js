import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const MovieSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    posterImage: {
      type: String,
      required: [true, 'Poster image is required'],
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    genre: {
      type: [String],
      required: [true, 'Genre is required'],
    },
    languages: {
      type: [String],
      required: [true, 'Languages are required'],
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
    },
    releaseDate: {
      type: String,
      required: [true, 'Release date is required'],
    },
    formats: {
      type: [String],
      required: [true, 'Formats are required'],
    },
    director: {
      type: String,
      required: [true, 'Director is required'],
      trim: true,
    },
    cast: {
      type: [
        {
          name: {
            type: String,
            required: [true, 'Cast member name is required'],
            trim: true,
          },
          photo: {
            type: String,
            required: [true, 'Cast member photo is required'],
          },
        },
      ],
      required: [true, 'Cast is required'],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: ['NOW_SHOWING', 'COMING_SOON'],
    },
  },
  {
    timestamps: true,
  }
);

const Movie = model('Movie', MovieSchema);

export default Movie;
