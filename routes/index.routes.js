'use strict';

import express from 'express';
import JWT from '../middlewares/jwt.middleware.js';
import UserController from '../controllers/user.controller.js';
import AdminController from '../controllers/admin.controller.js';
import multer from 'multer';
import UserValidations from '../middlewares/validators/user.validation.js';
import CarController from '../controllers/car.controller.js';
import BookingController from '../controllers/booking.controller.js';
import CarValidations from '../middlewares/validators/car.validation.js';
import customUtility from '../utility/custom.utility.js';
import BookingValidation from '../middlewares/validators/booking.validation.js';

const upload = multer({ storage: multer.memoryStorage() });

const Router = express.Router();

Router.use(customUtility.setTimeZone);

//user
Router.get('/user/auth', UserValidations.UserloginValidation, UserController.GetAuthController);

Router.post('/user/add', UserValidations.addUserCheck, UserController.AddNewUserController);

Router.get('/user/password-reset/otp', UserValidations.UserEmailCheck, UserController.GenerateOtpForUserPasswordController);

Router.put('/user/password-reset/confirm', UserValidations.ConfirmPasswordCheck, UserController.UpdateUserPasswordController);

//admin
Router.get('/admin/auth', UserValidations.UserloginValidation, AdminController.GetAuthController);

//car
Router.get('/car/random', CarValidations.LocationCheck, CarController.GetRandomCarsController);

Router.use(JWT.VerifyToken);

//user
Router.get('/user/id', UserController.GetUserByIdController);

Router.put('/user/update', UserValidations.updateUserCheck, UserController.UpdateUserController);

Router.put(
  '/user/image-upload',
  upload.fields([
    { name: 'profile_image', maxCount: 1 },
    { name: 'aadhar_image', maxCount: 1 },
    { name: 'driving_license_image', maxCount: 1 },
  ]),
  UserValidations.UserImageValidation,
  UserController.UserImageUploadController,
);

//admin
Router.post('/admin/add', AdminController.AddNewAdminController);

Router.get('/admin/id', AdminController.GetAdminByIdController);

//car

Router.get('/car', CarValidations.GetCarCheck, CarController.GetCarsController);

Router.get('/admin/car/id', CarController.GetCarByIdController);

Router.get('/admin/car/registration-number', CarController.GetCarByRegistrationNumberController);

Router.post('/car', upload.fields([{ name: 'car_image', maxCount: 1 }]), CarValidations.AddCarValidation, CarController.AddCarController);

Router.put('/car', CarController.UpdateCarController);

Router.put('/car/avilability', CarController.UpdateCarAvilabilityController);

Router.put('/car/image', upload.fields({ name: 'car_image', maxCount: 1 }), CarController.UpdateCarImageController);

//booking

Router.get('/bookings/slots', BookingController.GetAvilableSlotsController);

Router.get('/bookings/slots-start-date', BookingController.GetAvilableSlotsByStartDateController);

Router.get('/bookings', BookingController.GetUserBookingsController);

Router.get('/admin/bookings', BookingController.GetBookingsController);

Router.post('/booking', BookingValidation.AddbookingValidation, BookingController.AddBookingController);

Router.post('/admin/booking', BookingController.AddBookingByAdminController);

Router.put('/booking', BookingController.UpdateBookingController);

Router.put('/admin/booking', BookingController.UpdateBookingByAdminController);

export default Router;
