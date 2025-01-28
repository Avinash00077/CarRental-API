'use strict';

import express from 'express';
import JWT from '../middlewares/jwt.middleware.js';
import UserController from '../controllers/user.controller.js';
import AdminController from '../controllers/admin.controller.js';
import multer from 'multer';
import UserValidations from '../middlewares/validators/user.validation.js';
import CarController from '../controllers/car.controller.js';

const upload = multer({ storage: multer.memoryStorage() });

const Router = express.Router();

//user
Router.get('/user/auth', UserValidations.UserloginValidation, UserController.GetAuthController);

Router.post('/user/add', UserValidations.addUserCheck, UserController.AddNewUserController);

//admin
Router.get('/admin/auth', UserValidations.UserloginValidation, AdminController.GetAuthController);

Router.use(JWT.VerifyToken);

//user
Router.get('/user/id', UserController.GetUserByIdController);

//admin
Router.post('/admin/add', UserValidations.addUserCheck, AdminController.AddNewAdminController);

Router.get('/admin/id', AdminController.GetAdminByIdController);

//car

Router.get('/car', CarController.GetCarsController);

Router.get('/car/id', CarController.GetCarByIdController);

Router.get('/car/registration-number', CarController.GetCarByRegistrationNumberController);

Router.post('/car', upload.single('image'), CarController.AddCarController);

Router.put('/car', CarController.UpdateCarController);

Router.put('/car/avilability', CarController.UpdateCarAvilabilityController);

Router.put('/car/image', upload.single('image'), CarController.UpdateCarImageController);

export default Router;
