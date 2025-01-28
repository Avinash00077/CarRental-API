'use-strict';
import CarService from '../services/car.service.js';
import logger from '../utility/logger.utility.js';

const GetCarsController = async (request, response) => {
  try {
    const data = await CarService.GetCarsService(request);
    return response.status(200).json({ message: 'Okay Request successfull', data: data });
  } catch (error) {
    logger.error({ GetCarsController: error.message });
    response.status(500).json({ message: 'internalServerError' });
  }
};

const GetCarByIdController = async (request, response) => {
  try {
    const data = await CarService.GetCarByIdService(request);
    return response.status(200).json({ message: 'Okay Request successfull', data: data });
  } catch (error) {
    logger.error({ GetCarByIdController: error.message });
    response.status(500).json({ message: 'internalServerError' });
  }
};

const GetCarByRegistrationNumberController = async (request, response) => {
  try {
    const data = await CarService.GetCarByRegistrationNumberService(request);
    return response.status(200).json({ message: 'Okay Request successfull', data: data });
  } catch (error) {
    logger.error({ GetCarByRegistrationNumberController: error.message });
    response.status(500).json({ message: 'internalServerError' });
  }
};

const AddCarController = async (request, response) => {
  try {
    const data = await CarService.AddCarService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'New car added successfully' });
    }
  } catch (error) {
    logger.error({ AddCarController: error.message });
    response.status(500).json({ message: 'internalServerError' });
  }
};

const UpdateCarController = async (request, response) => {
  try {
    const data = await CarService.UpdateCarService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(201).json({ message: 'car update successfull' });
    }
  } catch (error) {
    logger.error({ UpdateCarController: error.message });
    response.status(500).json({ message: 'internalServerError' });
  }
};

const UpdateCarAvilabilityController = async (request, response) => {
  try {
    const data = await CarService.UpdateCarAvilabilityService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'car update successfull' });
    }
  } catch (error) {
    logger.error({ UpdateCarAvilabilityController: error.message });
    response.status(500).json({ message: 'internalServerError' });
  }
};

const UpdateCarImageController = async (request, response) => {
  try {
    const data = await CarService.UpdateCarImageService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'car image update successfull' });
    }
  } catch (error) {
    logger.error({ UpdateCarImageController: error.message });
    response.status(500).json({ message: 'internalServerError' });
  }
};

const CarController = {
  GetCarByIdController,
  GetCarByRegistrationNumberController,
  GetCarsController,
  AddCarController,
  UpdateCarAvilabilityController,
  UpdateCarController,
  UpdateCarImageController,
};

export default CarController;
