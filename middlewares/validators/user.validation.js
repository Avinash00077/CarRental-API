import { body, header, validationResult } from 'express-validator';

const UserloginValidation = [
  header('user_name').trim().notEmpty().withMessage('Enter valid user_name'),
  header('password').trim().notEmpty().isLength({ min: 7, max: 20 }).withMessage('Enter Valid password'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    next();
  },
];

const UserNameValidation = [
  header('user_name').trim().notEmpty().withMessage('Enter valid user_name'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    next();
  },
];

const addUserCheck = [
  body('first_name')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),

  body('last_name')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),

  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),

  body('gender')
    .trim()
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Gender must be Male, Female, or Other'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  body('phone_number')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone number must be 10 digits long'),

  body('dob')
    .trim()
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Invalid date format (use YYYY-MM-DD)')
    .custom((value) => {
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 18) {
        throw new Error('User must be at least 18 years old');
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

const updateUserCheck = [
  body('first_name')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),

  body('last_name')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),

  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),

  body('gender')
    .trim()
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Gender must be Male, Female, or Other'),

  body('dob')
    .trim()
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Invalid date format (use YYYY-MM-DD)')
    .custom((value) => {
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 18) {
        throw new Error('User must be at least 18 years old');
      }
      return true;
    }),
  body('address').trim().optional({values: 'falsy'}).isLength({ min: 5, max: 255 }).withMessage('Address must be between 5 and 255 characters'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    next();
  },
];

const UserImageValidation = [
  body('image_type')
    .optional()
    .isIn(['profile', 'aadhar', 'driving_license'])
    .withMessage('Invalid image type, must be "profile", "aadhar", or "driving_license"'),

  body('profile_image')
    .if(body('image_type').equals('profile'))
    .custom((value, { req }) => {
      if (!req.files || !req.files.profile_image) {
        throw new Error('Profile image file is required');
      }
      return true;
    }),

  body('aadhar_image')
    .if(body('image_type').equals('aadhar'))
    .custom((value, { req }) => {
      if (!req.files || !req.files.aadhar_image) {
        throw new Error('Aadhar image file is required');
      }
      return true;
    }),

  body('aadhar_number')
    .if(body('image_type').equals('aadhar'))
    .notEmpty()
    .withMessage('Aadhar number is required')
    .matches(/^\d{12}$/)
    .withMessage('Aadhar number must be a 12-digit number'),

  body('driving_license_number')
    .if(body('image_type').equals('driving_license'))
    .notEmpty()
    .withMessage('Driving license number is required')
    .matches(/^[A-Z0-9]{5,20}$/)
    .withMessage('Driving license number must be alphanumeric and between 5 to 20 characters'),

  body('driving_license_image')
    .if(body('image_type').equals('driving_license'))
    .custom((value, { req }) => {
      if (!req.files || !req.files.driving_license_image) {
        throw new Error('Driving license image file is required');
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

const UserEmailCheck = [
  header('email').trim().notEmpty().isEmail().withMessage('Enter valid Email'),
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ message: errors.array() });
    }
    next();
  },
];

const ConfirmPasswordCheck = [
  body('user_name').trim().notEmpty().withMessage('Enter valid Email'),
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
const UserValidations = {
  UserloginValidation,
  addUserCheck,
  updateUserCheck,
  UserImageValidation,
  UserEmailCheck,
  ConfirmPasswordCheck,
  UserNameValidation,
};

export default UserValidations;
