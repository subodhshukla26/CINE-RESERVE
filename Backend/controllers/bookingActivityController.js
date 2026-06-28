import BookingActivity from '../models/bookingActivity.model.js';

export const createBookingActivity = async (req, res) => {
  try {
    const { selectedMovieId, eventName } = req.body;

    const activity = await BookingActivity.create({
      selectedMovieId,
      eventName: eventName.trim(),
      actionTimestamp: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: 'Booking activity recorded successfully.',
      activity,
    });
  } catch (error) {
    console.error('Create booking activity error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to record booking activity.',
    });
  }
};
