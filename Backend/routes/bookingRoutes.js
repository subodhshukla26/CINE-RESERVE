import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  createBookingJourney,
  updateBookingJourneyFormat,
  updateBookingJourneyDate,
  updateBookingJourneyShowTime,
  updateBookingJourneyTheatre,
  updateBookingJourneySeats,
} from '../controllers/bookingJourneyController.js';
import { createBookingActivity } from '../controllers/bookingActivityController.js';
import {
  createBooking,
  getUserBookings,
  cancelBooking,
} from '../controllers/bookingController.js';
import {
  updateBookingJourneyFormatValidation,
  updateBookingJourneyDateValidation,
  updateBookingJourneyShowTimeValidation,
  updateBookingJourneyTheatreValidation,
  updateBookingJourneySeatsValidation,
  validateRequest,
} from '../validators/bookingJourney.validator.js';
import {
  createBookingActivityValidation,
  validateRequest as validateActivityRequest,
} from '../validators/bookingActivity.validator.js';

const router = express.Router();

router.post('/bookings', authMiddleware, createBooking);
router.get('/bookings', authMiddleware, getUserBookings);
router.patch('/bookings/:id/cancel', authMiddleware, cancelBooking);

router.post('/test/booking', createBookingJourney);
router.post(
  '/test/booking/activity',
  createBookingActivityValidation,
  validateActivityRequest,
  createBookingActivity
);
router.patch(
  '/test/booking/date',
  updateBookingJourneyDateValidation,
  validateRequest,
  updateBookingJourneyDate
);
router.patch(
  '/test/booking/format',
  updateBookingJourneyFormatValidation,
  validateRequest,
  updateBookingJourneyFormat
);
router.patch(
  '/test/booking/seats',
  updateBookingJourneySeatsValidation,
  validateRequest,
  updateBookingJourneySeats
);
router.patch(
  '/test/booking/show-time',
  updateBookingJourneyShowTimeValidation,
  validateRequest,
  updateBookingJourneyShowTime
);
router.patch(
  '/test/booking/theatre',
  updateBookingJourneyTheatreValidation,
  validateRequest,
  updateBookingJourneyTheatre
);

export default router;
