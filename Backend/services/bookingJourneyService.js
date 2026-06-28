import BookingJourney from '../models/bookingJourney.model.js';

export const startBookingJourney = async ({ selectedMovieId, selectedMovieName, event }) => {
  return BookingJourney.create({
    selectedMovieId,
    selectedMovieName,
    event,
  });
};
