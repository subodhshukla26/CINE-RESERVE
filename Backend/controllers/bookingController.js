import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  try {
    const {
      movieId,
      movieName,
      moviePoster,
      theatreName,
      screenName,
      showDate,
      showTime,
      movieFormat,
      selectedSeats,
      amountPaid,
    } = req.body;

    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required.',
      });
    }

    if (
      !movieId ||
      !movieName ||
      !theatreName ||
      !screenName ||
      !showDate ||
      !showTime ||
      !selectedSeats ||
      selectedSeats.length === 0 ||
      amountPaid === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields for creating booking.',
      });
    }

    // Create the booking record first to get the _id
    const booking = new Booking({
      userId,
      movieId,
      movieName,
      moviePoster,
      theatreName,
      screenName,
      showDate,
      showTime,
      movieFormat: movieFormat || '2D',
      selectedSeats,
      amountPaid,
      status: 'Confirmed',
      transactionDate: new Date(),
    });

    // Generate a QR code using a free external API based on the booking ID
    booking.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${booking._id}`;

    await booking.save();

    return res.status(201).json({
      success: true,
      message: 'Booking created successfully.',
      booking,
    });
  } catch (error) {
    console.error('Create booking error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to process booking.',
    });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required.',
      });
    }

    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Bookings retrieved successfully.',
      bookings,
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to retrieve bookings.',
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User authentication required.',
      });
    }

    const booking = await Booking.findOne({ _id: id, userId });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found.',
      });
    }

    if (booking.status === 'Cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled.',
      });
    }

    booking.status = 'Cancelled';
    await booking.save();

    return res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully.',
      booking,
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to cancel booking.',
    });
  }
};
