'use-strict';
import CarService from '../services/car.service.js';
import logger from '../utility/logger.utility.js';
import AppConfig from '../config/app/app.config.js';
const { STATUS_MESSAGES, CAR_MESSAGES } = AppConfig;

const GetRandomCarsController = async (request, response) => {
  try {
    const data = await CarService.GetRandomCarsService(request);
    return response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    logger.error({ GetRandomCarsController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const GetCarsController = async (request, response) => {
  try {
    const data = await CarService.GetCarsService(request);
    return response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    logger.error({ GetCarsController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const GetCarByIdController = async (request, response) => {
  try {
    const data = await CarService.GetCarByIdService(request);
    return response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    logger.error({ GetCarByIdController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const GetCarByRegistrationNumberController = async (request, response) => {
  try {
    const data = await CarService.GetCarByRegistrationNumberService(request);
    return response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    logger.error({ GetCarByRegistrationNumberController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const AddCarController = async (request, response) => {
  try {
    const data = await CarService.AddCarService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: CAR_MESSAGES.CAR_ADDED });
    }
  } catch (error) {
    logger.error({ AddCarController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const UpdateCarController = async (request, response) => {
  try {
    const data = await CarService.UpdateCarService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(201).json({ message: CAR_MESSAGES.CAR_UPDATED });
    }
  } catch (error) {
    logger.error({ UpdateCarController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const UpdateCarAvilabilityController = async (request, response) => {
  try {
    const data = await CarService.UpdateCarAvilabilityService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: CAR_MESSAGES.CAR_UPDATED });
    }
  } catch (error) {
    logger.error({ UpdateCarAvilabilityController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const UpdateCarImageController = async (request, response) => {
  try {
    const data = await CarService.UpdateCarImageService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: CAR_MESSAGES.CAR_UPDATED });
    }
  } catch (error) {
    logger.error({ UpdateCarImageController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const CarController = {
  GetRandomCarsController,
  GetCarByIdController,
  GetCarByRegistrationNumberController,
  GetCarsController,
  AddCarController,
  UpdateCarAvilabilityController,
  UpdateCarController,
  UpdateCarImageController,
};

export default CarController;
