import { body, header, validationResult } from 'express-validator';

const GetCarCheck = [
  header('location').trim().notEmpty().withMessage('Location is required'),
  header('from_date').trim().notEmpty().withMessage('from_date is required'),
  header('to_date').trim().notEmpty().withMessage('to_date is required'),
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
};
export default CarValidations;
