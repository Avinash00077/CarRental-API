'use strict';

import express from 'express';
import ADMINJWT from '../middlewares/jwt.admin.middleware.js';
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

Router.get('/auth', AdminController.GetAuthController);

//JWT Verfication starts
Router.use(ADMINJWT.VerifyToken);

Router.post('/add', AdminController.AddNewAdminController);

Router.get('/id', AdminController.GetAdminByIdController);

//user
Router.get('/user/verfication', UserController.GetUsersForVerficationController);

Router.put('/user/verfication', UserController.UpdateUsersVerficationController);

//car

Router.get('/car', CarValidations.GetCarCheck, CarController.GetCarsController);

Router.post('/car', upload.fields([{ name: 'car_image', maxCount: 1 }]), CarValidations.AddCarValidation, CarController.AddCarController);

Router.put('/car', CarController.UpdateCarController);

Router.put('/car/avilability', CarController.UpdateCarAvilabilityController);

Router.put('/car/image', upload.fields({ name: 'car_image', maxCount: 1 }), CarController.UpdateCarImageController);

Router.get('/car/id', CarController.GetCarByIdController);

Router.get('/car/registration-number', CarController.GetCarByRegistrationNumberController);

//booking
Router.get('/bookings', BookingController.GetBookingsController);

Router.get('/bookings/current', BookingController.GetCurrentBookingsController);

Router.post('/booking', BookingController.AddBookingByAdminController);

Router.put('/booking', BookingController.UpdateBookingByAdminController);

export default Router;
