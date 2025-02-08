import { body, header, validationResult } from 'express-validator';

const validTimes = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

const AddbookingValidation = [
  // Car ID - Must be a positive integer
  body('car_id').isInt({ min: 1 }).withMessage('Car ID must be a positive integer'),

  // Start Date - Must be in YYYY-MM-DD format and should be in the future
  body('start_date')
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Start date must be in YYYY-MM-DD format')
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
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('End date must be in YYYY-MM-DD format')
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

const BookingValidation = {
    AddbookingValidation,
}

export default BookingValidation
