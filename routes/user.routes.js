'use strict';

import express from 'express';
import JWT from '../middlewares/jwt.middleware.js';
import UserController from '../controllers/user.controller.js';
import multer from 'multer';
import UserValidations from '../middlewares/validators/user.validation.js';
import CarController from '../controllers/car.controller.js';
import BookingController from '../controllers/booking.controller.js';
import CarValidations from '../middlewares/validators/car.validation.js';
import customUtility from '../utility/custom.utility.js';
import BookingValidation from '../middlewares/validators/booking.validation.js';
import UtiityController from '../controllers/utility.controller.js';

const upload = multer({ storage: multer.memoryStorage() });

const Router = express.Router();

Router.use(customUtility.setTimeZone);

//user

Router.get('/locations', UtiityController.GetLocationsController);

Router.get('/user-name/availability', UserValidations.UserNameValidation, UserController.GetUserNameAvailabilityController);

Router.get('/auth', UserValidations.UserloginValidation, UserController.GetAuthController);

Router.post('/add', UserValidations.addUserCheck, UserController.AddNewUserController);

Router.get('/password-reset/otp', UserValidations.UserNameValidation, UserController.GenerateOtpForUserPasswordController);

Router.put('/password-reset/confirm', UserValidations.ConfirmPasswordCheck, UserController.UpdateUserPasswordController);

Router.get('/user-name/otp', UserValidations.UserEmailDobCheck, UserController.GenerateOtpForUserNameController);

Router.get('/user-name/confirm', UserValidations.GetUserNameCheck, UserController.GetUserNameController);

//car
Router.get('/car/random', CarValidations.LocationCheck, CarController.GetRandomCarsController);

//JWT Verfication starts
Router.use(JWT.VerifyToken);

//user
Router.get('/id', UserController.GetUserByIdController);

Router.put('/update', UserValidations.updateUserCheck, UserController.UpdateUserController);

Router.put(
  '/image-upload',
  upload.fields([
    { name: 'profile_image', maxCount: 1 },
    { name: 'aadhar_image', maxCount: 1 },
    { name: 'driving_license_image', maxCount: 1 },
    { name: 'cover_image', maxCount: 1 },
  ]),
  UserValidations.UserImageValidation,
  UserController.UserImageUploadController,
);

//car
Router.get('/car', CarValidations.GetCarCheck, CarController.GetCarsController);

Router.get('/car/id',  CarController.GetCarByIdController);

//booking

Router.get('/bookings/slots', BookingValidation.slotsValidation, BookingController.GetAvilableSlotsController);

Router.get('/bookings/slots-start-date', BookingValidation.slotsAfterValidation, BookingController.GetAvilableSlotsByStartDateController);

Router.get('/bookings', BookingController.GetUserBookingsController);

Router.post('/booking', BookingValidation.AddbookingValidation, BookingController.AddBookingController);

Router.put('/booking', BookingController.UpdateBookingController);

Router.put('/booking/cancel', BookingController.CancelBookingController);

Router.post('/booking/review', BookingValidation.validateReview, BookingController.PostBookingReviewController);

Router.put('/booking/review', BookingValidation.validateReview, BookingController.UpdateBookingReviewController);

export default Router;
