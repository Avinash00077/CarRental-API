import { body, header, validationResult, check } from 'express-validator';
import moment from 'moment';

const validTimes = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

const AddbookingValidation = [
  // Car ID - Must be a positive integer
  body('car_id').isInt({ min: 1 }).withMessage('Car ID must be a positive integer'),

  // Start Date - Must be in YYYY-MM-DD format and should be in the future
  body('start_date')
    .matches(/^\d{4}\/\d{2}\/\d{2}$/)
    .withMessage('Start date must be in YYYY/MM/DD format')
    .custom((value) => {
      const today = new Date();
      const inputDate = new Date(value);
      if (inputDate < today) {
        throw new Error('Start date must be in the future');
      }
      return true;
    }),

  // End Date - Must be in YYYY-MM-DD format and greater than start date
  body('end_date')
    .matches(/^\d{4}\/\d{2}\/\d{2}$/)
    .withMessage('End date must be in YYYY/MM/DD format')
    .custom((value, { req }) => {
      const startDate = new Date(req.body.start_date);
      const endDate = new Date(value);
      if (endDate <= startDate) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),

  // Start Time - Must be between 10:00 and 22:00
  body('start_time')
    .isIn(validTimes)
    .withMessage('Start time must be between 10:00 and 22:00')
    .custom((value) => {
      const hour = parseInt(value.split(':')[0], 10);
      if (hour < 10 || hour > 22) {
        throw new Error('Start time must be between 10:00 and 22:00');
      }
      return true;
    }),

  // End Time - Must be between 10:00 and 22:00
  body('end_time')
    .isIn(validTimes)
    .withMessage('End time must be between 10:00 and 22:00')
    .custom((value) => {
      const hour = parseInt(value.split(':')[0], 10);
      if (hour < 10 || hour > 22) {
        throw new Error('End time must be between 10:00 and 22:00');
      }
      return true;
    }),

  // Payment Mode - Must be either 'ONLINE' or 'CASH'
  body('payment_mode').isIn(['ONLINE', 'CASH']).withMessage('Payment mode must be either "ONLINE" or "CASH"'),

  // Total Price - Must be a positive decimal number
  body('total_price').isFloat({ min: 0.01 }).withMessage('Total price must be a positive number'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    next();
  },
];

const slotsValidation = [
  check('start_date')
    .notEmpty()
    .withMessage('Start date is required')
    .matches(/^\d{4}\/\d{2}\/\d{2}$/)
    .withMessage('Start date must be in YYYY/MM/DD format')
    .custom((value) => {
      const now = moment().format('YYYY/MM/DD'); // Get current date
      if (moment(value).isSameOrBefore(now)) {
        throw new Error('Start date must be in the future');
      }
      return true;
    }),

  check('start_time')
    .notEmpty()
    .withMessage('Start time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Start time must be in HH:mm format')
    .custom((value, { req }) => {
      const now = moment();
      const startDateTime = moment(`${req.headers.start_date} ${value}`, 'YYYY-MM-DD HH:mm');
      if (startDateTime.isSameOrBefore(now)) {
        throw new Error('Start time must be in the future');
      }
      return true;
    }),

  check('end_date')
    .notEmpty()
    .withMessage('End date is required')
    .matches(/^\d{4}\/\d{2}\/\d{2}$/)
    .withMessage('End date must be in YYYY/MM/DD format')
    .custom((value, { req }) => {
      const startDate = req.headers.start_date;
      if (moment(value).isBefore(startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),

  check('end_time')
    .notEmpty()
    .withMessage('End time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('End time must be in HH:mm format'),

  check('car_id').notEmpty().withMessage('Car ID is required').isNumeric().withMessage('Car ID must be a number'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const slotsAfterValidation = [
  check('start_date')
    .notEmpty()
    .withMessage('Start date is required')
    .matches(/^\d{4}\/\d{2}\/\d{2}$/)
    .withMessage('Start date must be in YYYY/MM/DD format')
    .custom((value) => {
      const now = moment().format('YYYY/MM/DD'); // Get current date
      if (moment(value).isSameOrBefore(now)) {
        throw new Error('Start date must be in the future');
      }
      return true;
    }),

  check('start_time')
    .notEmpty()
    .withMessage('Start time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Start time must be in HH:mm format')
    .custom((value, { req }) => {
      const now = moment();
      const startDateTime = moment(`${req.headers.start_date} ${value}`, 'YYYY-MM-DD HH:mm');
      if (startDateTime.isSameOrBefore(now)) {
        throw new Error('Start time must be in the future');
      }
      return true;
    }),

  check('car_id').notEmpty().withMessage('Car ID is required').isNumeric().withMessage('Car ID must be a number'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const BookingValidation = {
  AddbookingValidation,
  slotsValidation,
  slotsAfterValidation,
};

export default BookingValidation;
