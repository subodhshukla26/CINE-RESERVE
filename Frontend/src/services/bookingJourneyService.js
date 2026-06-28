import api from './api';

export const createBookingJourney = async ({ selectedMovieId, selectedMovieName, event }) => {
  const response = await api.post('/api/test/booking', {
    selectedMovieId,
    selectedMovieName,
    event,
  });

  return response.data;
};

export const recordBookingActivity = async ({ selectedMovieId, eventName }) => {
  const response = await api.post('/api/test/booking/activity', {
    selectedMovieId,
    eventName,
  });

  return response.data;
};

export const updateBookingDate = async ({ selectedMovieId, selectedDate }) => {
  const response = await api.patch('/api/test/booking/date', {
    selectedMovieId,
    selectedDate,
  });

  return response.data;
};

export const updateBookingTheatre = async ({ selectedMovieId, selectedTheatre }) => {
  const response = await api.patch('/api/test/booking/theatre', {
    selectedMovieId,
    selectedTheatre,
  });

  return response.data;
};

export const updateBookingFormat = async ({ selectedMovieId, selectedMovieFormat }) => {
  const response = await api.patch('/api/test/booking/format', {
    selectedMovieId,
    selectedMovieFormat,
  });

  return response.data;
};

export const updateBookingShowTime = async ({ selectedMovieId, selectedShowTime }) => {
  const response = await api.patch('/api/test/booking/show-time', {
    selectedMovieId,
    selectedShowTime,
  });

  return response.data;
};

export const updateBookingSeats = async ({ selectedMovieId, selectedSeats }) => {
  const response = await api.patch('/api/test/booking/seats', {
    selectedMovieId,
    selectedSeats,
  });

  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await api.post('/api/bookings', bookingData);
  return response.data;
};

export const getUserBookings = async () => {
  const response = await api.get('/api/bookings');
  return response.data;
};

export const cancelBooking = async (bookingId) => {
  const response = await api.patch(`/api/bookings/${bookingId}/cancel`);
  return response.data;
};
