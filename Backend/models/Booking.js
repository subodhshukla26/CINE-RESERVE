import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const BookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    movieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
      required: [true, 'Movie ID is required'],
    },
    movieName: {
      type: String,
      required: [true, 'Movie name is required'],
      trim: true,
    },
    moviePoster: {
      type: String,
      trim: true,
    },
    theatreName: {
      type: String,
      required: [true, 'Theatre name is required'],
      trim: true,
    },
    screenName: {
      type: String,
      required: [true, 'Screen name is required'],
      trim: true,
    },
    showDate: {
      type: String,
      required: [true, 'Show date is required'],
      trim: true,
    },
    showTime: {
      type: String,
      required: [true, 'Show time is required'],
      trim: true,
    },
    movieFormat: {
      type: String,
      default: '2D',
      trim: true,
    },
    selectedSeats: {
      type: [String],
      required: [true, 'Booked seats are required'],
    },
    amountPaid: {
      type: Number,
      required: [true, 'Amount paid is required'],
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Cancelled'],
      default: 'Confirmed',
    },
    qrCodeUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = model('Booking', BookingSchema);

export default Booking;
