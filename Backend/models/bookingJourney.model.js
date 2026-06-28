import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const BookingJourneySchema = new Schema(
  {
    selectedMovieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
      required: [true, 'Selected movie is required'],
    },
    selectedMovieName: {
      type: String,
      required: [true, 'Selected movie name is required'],
      trim: true,
    },
    event: {
      type: String,
      default: 'Movie Selected',
      trim: true,
    },
    selectedDate: {
      type: String,
      trim: true,
    },
    selectedMovieFormat: {
      type: String,
      enum: ['2D', '3D'],
      trim: true,
    },
    selectedShowTime: {
      type: String,
      trim: true,
    },
    selectedTheatre: {
      type: Schema.Types.Mixed,
    },
    selectedSeats: {
      type: [String],
      default: [],
    },
    totalSelectedSeats: {
      type: Number,
      default: 0,
    },
    actionTimestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const BookingJourney = model('BookingJourney', BookingJourneySchema);

export default BookingJourney;
