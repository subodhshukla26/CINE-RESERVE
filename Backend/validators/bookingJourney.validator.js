import { body, validationResult } from 'express-validator';

export const createBookingJourneyValidation = [
  body('selectedMovieId')
    .notEmpty()
    .withMessage('Movie ID is required.')
    .isMongoId()
    .withMessage('Movie ID must be a valid MongoDB ObjectId.'),

  body('selectedMovieName')
    .trim()
    .notEmpty()
    .withMessage('Movie name is required.')
    .isString()
    .withMessage('Movie name must be a string.')
    .isLength({ min: 1, max: 150 })
    .withMessage('Movie name must be between 1 and 150 characters.'),

  body('selectedDate')
    .trim()
    .notEmpty()
    .withMessage('Date is required.')
    .isISO8601({ strict: true })
    .withMessage('Date must be in a valid ISO 8601 format (YYYY-MM-DD).'),

  body('selectedTheatreName')
    .optional({ values: 'falsy' })
    .trim()
    .isString()
    .withMessage('Theatre name must be a string.')
    .isLength({ min: 3, max: 100 })
    .withMessage('Theatre name must be between 3 and 100 characters.'),

  body('selectedTheatre.name')
    .optional({ values: 'falsy' })
    .trim()
    .isString()
    .withMessage('Theatre name must be a string.')
    .isLength({ min: 3, max: 100 })
    .withMessage('Theatre name must be between 3 and 100 characters.'),

  body()
    .custom((_, { req }) => {
      const theatreName = req.body?.selectedTheatreName || req.body?.selectedTheatre?.name;

      if (!theatreName) {
        throw new Error('Theatre name is required.');
      }

      return true;
    }),
];

export const updateBookingJourneyDateValidation = [
  body('selectedMovieId')
    .notEmpty()
    .withMessage('Movie ID is required.')
    .isMongoId()
    .withMessage('Movie ID must be a valid MongoDB ObjectId.'),

  body('selectedDate')
    .trim()
    .notEmpty()
    .withMessage('Date is required.')
    .isISO8601({ strict: true })
    .withMessage('Date must be in a valid ISO 8601 format (YYYY-MM-DD).'),
];

export const updateBookingJourneyTheatreValidation = [
  body('selectedMovieId')
    .notEmpty()
    .withMessage('Movie ID is required.')
    .isMongoId()
    .withMessage('Movie ID must be a valid MongoDB ObjectId.'),

  body('selectedTheatre')
    .notEmpty()
    .withMessage('Selected theatre is required.')
    .custom((value) => value && typeof value === 'object' && !Array.isArray(value))
    .withMessage('Selected theatre must be an object.'),

  body('selectedTheatre.name')
    .trim()
    .notEmpty()
    .withMessage('Theatre name is required.')
    .isString()
    .withMessage('Theatre name must be a string.')
    .isLength({ min: 3, max: 100 })
    .withMessage('Theatre name must be between 3 and 100 characters.'),
];

export const updateBookingJourneyFormatValidation = [
  body('selectedMovieId')
    .notEmpty()
    .withMessage('Movie ID is required.')
    .isMongoId()
    .withMessage('Movie ID must be a valid MongoDB ObjectId.'),

  body('selectedMovieFormat')
    .trim()
    .notEmpty()
    .withMessage('Movie format is required.')
    .isIn(['2D', '3D'])
    .withMessage('Movie format must be either 2D or 3D.'),
];

export const updateBookingJourneyShowTimeValidation = [
  body('selectedMovieId')
    .notEmpty()
    .withMessage('Movie ID is required.')
    .isMongoId()
    .withMessage('Movie ID must be a valid MongoDB ObjectId.'),

  body('selectedShowTime')
    .trim()
    .notEmpty()
    .withMessage('Show time is required.')
    .isString()
    .withMessage('Show time must be a string.')
    .isLength({ min: 1, max: 50 })
    .withMessage('Show time must be between 1 and 50 characters.'),
];

export const updateBookingJourneySeatsValidation = [
  body('selectedMovieId')
    .notEmpty()
    .withMessage('Movie ID is required.')
    .isMongoId()
    .withMessage('Movie ID must be a valid MongoDB ObjectId.'),

  body('selectedSeats')
    .isArray()
    .withMessage('Selected seats must be an array of seat numbers.'),

  body('selectedSeats.*')
    .isString()
    .withMessage('Each seat number must be a string.'),
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
