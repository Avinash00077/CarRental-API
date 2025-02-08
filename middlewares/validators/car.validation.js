import { body, header, validationResult } from 'express-validator';
import moment from 'moment';

const validTimes = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

const GetCarCheck = [
  header('start_date')
    .notEmpty()
    .withMessage('Start date is required')
    .matches(/^\d{4}\/\d{2}\/\d{2}$/)
    .withMessage('Invalid date format (use YYYY/MM/DD)')
    .custom((value) => {
      const today = moment().format('YYYY/MM/DD');
      if (moment(value, 'YYYY/MM/DD').isBefore(today)) {
        throw new Error('Start date must be greater than today');
      }
      return true;
    }),

  header('end_date')
    .notEmpty()
    .withMessage('End date is required')
    .matches(/^\d{4}\/\d{2}\/\d{2}$/)
    .withMessage('Invalid date format (use YYYY/MM/DD)')
    .custom((value, { req }) => {
      const today = moment().format('YYYY/MM/DD');
      if (moment(value, 'YYYY/MM/DD').isSameOrBefore(today)) {
        throw new Error('End date must be greater than today');
      }
      if (moment(value, 'YYYY/MM/DD').isSameOrBefore(req.body.start_date)) {
        throw new Error('End date must be greater than start date');
      }
      return true;
    }),

  header('start_time')
    .notEmpty()
    .withMessage('Start time is required')
    .isIn(validTimes)
    .withMessage(`Start time must be one of the following: ${validTimes.join(', ')}`),

  header('end_time')
    .notEmpty()
    .withMessage('End time is required')
    .isIn(validTimes)
    .withMessage(`End time must be one of the following: ${validTimes.join(', ')}`)
    .custom((value, { req }) => {
      // Ensure end_time is after start_time if they are on the same date
      if (req.body.start_date === req.body.end_date && value <= req.body.start_time) {
        throw new Error('End time must be after start time on the same date');
      }
      return true;
    }),

  header('location').notEmpty().withMessage('Location is required').isString().withMessage('Location must be a string'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const AddCarValidation = [
  // Name (required, must be a string)
  body('name').trim().notEmpty().withMessage('Car name is required').isString().withMessage('Car name must be a valid string'),

  // Brand (required, must be a string)
  body('brand').trim().notEmpty().withMessage('Brand is required').isString().withMessage('Brand must be a valid string'),

  // Model Year (required, must be a valid 4-digit year)
  body('model_year')
    .notEmpty()
    .withMessage('Model year is required')
    .matches(/^\d{4}$/)
    .withMessage('Model year must be a valid 4-digit year')
    .custom((value) => {
      const year = parseInt(value, 10);
      const currentYear = new Date().getFullYear();
      if (year < 1980 || year > currentYear) {
        throw new Error(`Model year must be between 1980 and ${currentYear}`);
      }
      return true;
    }),

  // Daily Rent (required, must be a positive number)
  body('daily_rent')
    .notEmpty()
    .withMessage('Daily rent is required')
    .isFloat({ gt: 0 })
    .withMessage('Daily rent must be a positive number'),

  // Availability (must be "Y" or "N")
  body('availability').notEmpty().withMessage('Availability is required').isIn(['Y', 'N']).withMessage('Availability must be "Y" or "N"'),

  // Registration Number (required, alphanumeric with 5-15 characters)
  body('registration_number')
    .trim()
    .notEmpty()
    .withMessage('Registration number is required')
    .matches(/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/)
    .withMessage('Invalid Indian vehicle registration number format (e.g., MH12AB1234)'),

  // Location (required, must be a string)
  body('location').trim().notEmpty().withMessage('Location is required').isString().withMessage('Location must be a valid string'),

  // Location Address (required, must be a string)
  body('location_address')
    .trim()
    .notEmpty()
    .withMessage('Location address is required')
    .isString()
    .withMessage('Location address must be a valid string'),

  // Description (must be a string with max 500 characters)
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a valid string')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),

  // Car Owner (required, must be an alphanumeric string)
  body('car_owner').trim().notEmpty().withMessage('Car owner is required').isAlphanumeric().withMessage('Car owner must be alphanumeric'),

  // Car Condition (required, must be "new" or "used")
  body('car_condition').notEmpty().withMessage('Car condition is required'),

  // Mileage (required, must be a positive number)
  body('mileage').notEmpty().withMessage('Mileage is required').isFloat({ gt: 0 }).withMessage('Mileage must be a positive number'),

  // Car Type (required, must be a valid string)
  body('car_type').trim().notEmpty().withMessage('Car type is required').isString().withMessage('Car type must be a valid string'),

  // Seater (required, must be a number between 2 and 10)
  body('seater')
    .notEmpty()
    .withMessage('Number of seats is required')
    .isInt({ min: 2, max: 10 })
    .withMessage('Seater must be between 2 and 10'),

  // Fastag Availability (must be "Y" or "N")
  body('fastag_availability')
    .notEmpty()
    .withMessage('Fastag availability is required')
    .isIn(['Y', 'N'])
    .withMessage('Fastag availability must be "Y" or "N"'),
  body('car_image').custom((value, { req }) => {
    if (!req.files || !req.files.car_image) {
      throw new Error('car image is required');
    }
    return true;
  }),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    next();
  },
];

const CarValidations = {
  GetCarCheck,
  AddCarValidation,
};
export default CarValidations;
