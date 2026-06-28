import BookingJourney from '../models/bookingJourney.model.js';

const updateBookingJourneyByMovieId = async (req, res, updateFields, successMessage, notFoundMessage) => {
  try {
    const { selectedMovieId } = req.body;

    const journey = await BookingJourney.findOneAndUpdate(
      { selectedMovieId },
      {
        ...updateFields,
        actionTimestamp: new Date(),
      },
      {
        new: true,
        runValidators: true,
        sort: { updatedAt: -1 },
      }
    );

    if (!journey) {
      return res.status(404).json({
        success: false,
        message: notFoundMessage,
      });
    }

    return res.status(200).json({
      success: true,
      message: successMessage,
      journey,
    });
  } catch (error) {
    console.error('Update booking journey error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to update booking journey.',
    });
  }
};

export const createBookingJourney = async (req, res) => {
  try {
    const { selectedMovieId, selectedMovieName, event } = req.body;

    if (!selectedMovieId?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Selected movie ID is required.',
      });
    }

    if (!selectedMovieName?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Selected movie name is required.',
      });
    }

    if (!event?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Event is required.',
      });
    }

    const journey = await BookingJourney.create({
      selectedMovieId,
      selectedMovieName: selectedMovieName.trim(),
      event: event.trim(),
    });

    return res.status(201).json({
      success: true,
      message: 'Booking journey started successfully.',
      journey,
    });
  } catch (error) {
    console.error('Create booking journey error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to start booking journey.',
    });
  }
};

export const updateBookingJourneyDate = async (req, res) => {
  try {
    const { selectedMovieId, selectedDate } = req.body;

    const journey = await BookingJourney.findOneAndUpdate(
      { selectedMovieId },
      {
        selectedDate: selectedDate.trim(),
        actionTimestamp: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!journey) {
      return res.status(404).json({
        success: false,
        message: 'Booking journey not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Booking journey date updated successfully.',
      journey,
    });
  } catch (error) {
    console.error('Update booking journey date error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to update booking journey date.',
    });
  }
};

export const updateBookingJourneyTheatre = async (req, res) => {
  try {
    const { selectedMovieId, selectedTheatre } = req.body;

    const journey = await BookingJourney.findOneAndUpdate(
      { selectedMovieId },
      {
        selectedTheatre,
        actionTimestamp: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!journey) {
      return res.status(404).json({
        success: false,
        message: 'Booking journey not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Booking journey theatre updated successfully.',
      journey,
    });
  } catch (error) {
    console.error('Update booking journey theatre error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to update booking journey theatre.',
    });
  }
};

export const updateBookingJourneyFormat = async (req, res) =>
  updateBookingJourneyByMovieId(
    req,
    res,
    {
      selectedMovieFormat: req.body.selectedMovieFormat,
    },
    'Booking journey format updated successfully.',
    'Booking journey not found.'
  );

export const updateBookingJourneyShowTime = async (req, res) =>
  updateBookingJourneyByMovieId(
    req,
    res,
    {
      selectedShowTime: req.body.selectedShowTime,
    },
    'Booking journey show time updated successfully.',
    'Booking journey not found.'
  );

export const updateBookingJourneySeats = async (req, res) => {
  const { selectedSeats } = req.body;
  const totalSelectedSeats = Array.isArray(selectedSeats) ? selectedSeats.length : 0;

  return updateBookingJourneyByMovieId(
    req,
    res,
    {
      selectedSeats,
      totalSelectedSeats,
    },
    'Booking journey seats updated successfully.',
    'Booking journey not found.'
  );
};
