import { body, header, validationResult } from 'express-validator';

const UserloginValidation = [
  header('email').trim().notEmpty().isEmail().withMessage('Enter valid email'),
  header('password').trim().notEmpty().isLength({ min: 7, max: 20 }).withMessage('Enter Valid password'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    next();
  },
];

const addUserCheck = [
  body('email').trim().notEmpty().isEmail().withMessage('Enter valid Email'),
  body('password').trim().notEmpty().isLength({ min: 7, max: 20 }).withMessage('Enter valid password'),
  body('name').trim().notEmpty().isLength({ min: 2, max: 100 }).withMessage('Enter valid name'),
  body('phone_number').trim().notEmpty().isLength({ min: 10, max: 10 }).isInt().withMessage('Enter valid Phone Number'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    next();
  },
];

const UserEmailCheck = [
  body('email').trim().notEmpty().isEmail().withMessage('Enter valid Email'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    next();
  },
];

const ConfirmPasswordCheck = [
  body('email').trim().notEmpty().isEmail().withMessage('Enter valid Email'),
  body('password').trim().notEmpty().isLength({ min: 7, max: 20 }).withMessage('Enter valid password'),
  body('otp').trim().isLength({ min: 6, max: 6 }).withMessage('Enter valid otp'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    next();
  },
];
const UserValidations = { UserloginValidation, addUserCheck, UserEmailCheck, ConfirmPasswordCheck };

export default UserValidations;
