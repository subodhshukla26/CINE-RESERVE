import { body, validationResult } from 'express-validator';

export const createBookingActivityValidation = [
  body('selectedMovieId')
    .trim()
    .notEmpty()
    .withMessage('Selected movie is required.')
    .isMongoId()
    .withMessage('Selected movie must be a valid MongoDB ObjectId.'),

  body('eventName')
    .trim()
    .notEmpty()
    .withMessage('Event name is required.')
    .isIn([
      'Movie Selected',
      'Get Tickets Clicked',
      'Date Selected',
      'Theatre Selected',
      'Movie Format Selected',
      'Show Time Selected',
      'Seat Selected',
      'Seat Deselected',
    ])
    .withMessage(
      'Event name must be one of: Movie Selected, Get Tickets Clicked, Date Selected, Theatre Selected, Movie Format Selected, Show Time Selected, Seat Selected, Seat Deselected.'
    ),
];

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    success: false,
    errors: errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    })),
  });
};
