import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const BookingActivitySchema = new Schema(
  {
    selectedMovieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
      required: [true, 'Selected movie is required'],
    },
    eventName: {
      type: String,
      required: [true, 'Event name is required'],
      enum: {
        values: [
          'Movie Selected',
          'Get Tickets Clicked',
          'Date Selected',
          'Theatre Selected',
          'Movie Format Selected',
          'Show Time Selected',
          'Seat Selected',
          'Seat Deselected',
        ],
        message:
          'Event name must be one of: Movie Selected, Get Tickets Clicked, Date Selected, Theatre Selected, Movie Format Selected, Show Time Selected, Seat Selected, Seat Deselected',
      },
      trim: true,
    },
    actionTimestamp: {
      type: Date,
      default: Date.now,
      required: [true, 'Timestamp is required'],
    },
  },
  {
    timestamps: true,
  }
);

const BookingActivity = model('BookingActivity', BookingActivitySchema);

export default BookingActivity;
