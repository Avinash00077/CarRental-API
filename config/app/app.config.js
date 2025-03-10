'use strict';
import properties from '../index.config.js';

const OTP_CODES = {
  RESET_PASSWORD: 1,
  USER_NAME: 2,
  BOOKING: 3,
};

const STATUS_MESSAGES = {
  200: 'OK - Request successful.',
  201: 'Created - Resource added successfully.',
  400: 'Bad Request - Invalid request format.',
  401: 'Unauthorized - Authentication required.',
  403: 'Forbidden - Access denied.',
  404: 'Not Found - Resource not available.',
  409: 'Conflict - Request conflicts with current state.',
  415: 'Unsupported Media Type - Format not supported.',
  422: 'Unprocessable Entity - Validation failed.',
  500: 'Internal Server Error - Server issue.',
  503: 'Service Unavailable - Server overloaded or down.',
};

const USER_MESSAGES = {
  USER_REGISTERED: 'User registered successfully.',
  USER_LOGGED_IN: 'Login successful.',
  USER_UPDATED: 'User profile updated successfully.',
  USER_DELETED: 'User account deleted successfully.',
  USER_NOT_FOUND: 'User not found.',
  INVALID_CREDENTIALS: 'Invalid credentials. Please try again.',
  UNAUTHORIZED_ACCESS: 'Unauthorized access. Please log in.',
  FORBIDDEN_ACTION: 'You do not have permission to perform this action.',
  PASSWORD_UPDATE: 'Password Updated Successfully',
};

const CAR_MESSAGES = {
  CAR_ADDED: 'Car added successfully.',
  CAR_UPDATED: 'Car details updated successfully.',
  CAR_DELETED: 'Car removed successfully.',
  CAR_AVAILABLE: 'Car is available for booking.',
  CAR_UNAVAILABLE: 'Car is currently unavailable.',
  CAR_NOT_FOUND: 'Car not found.',
  CAR_ALREADY_BOOKED: 'Car is already booked for the selected dates.',
};

const BOOKING_MESSAGES = {
  BOOKING_CREATED: 'Booking created successfully.',
  BOOKING_UPDATED: 'Booking details updated successfully.',
  BOOKING_CANCELED: 'Booking canceled successfully.',
  BOOKING_CONFIRMED: 'Booking confirmed.',
  BOOKING_COMPLETED: 'Booking completed successfully.',
  BOOKING_FAILED: 'Booking request failed. Please try again.',
  BOOKING_NOT_FOUND: 'Booking not found.',
  BOOKING_ALREADY_EXISTS: 'You already have a booking for this car during the selected dates.',
};

const USER_IMAGE_NAMES = ['profile_image', 'aadhar_image', 'driving_license_image', 'cover_image'];

const AppConfig = {
  PORT: properties.get('app.port'),
  APPNAME: properties.get('app.appName'),
  JWTEXPIRYTIME: properties.get('app.jwtExpiryTime'),
  JWTSECRETKEY: properties.get('app.jwtSecretKey'),
  ADMINJWTSECRETKEY: properties.get('app.adminJwtSecretKey'),
  ADMINJWTEXPIRYTIME: properties.get('app.adminJwtExpiryTime'),
  OTP_CODES: OTP_CODES,
  STATUS_MESSAGES: STATUS_MESSAGES,
  USER_MESSAGES: USER_MESSAGES,
  CAR_MESSAGES: CAR_MESSAGES,
  BOOKING_MESSAGES: BOOKING_MESSAGES,
  USER_IMAGE_NAMES: USER_IMAGE_NAMES,
  EMAIL_ADDRESS: properties.get('email.email'),
  EMAIL_PASSWORD: properties.get('email.password'),
};

export default AppConfig;
