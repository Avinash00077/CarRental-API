'use strict';

import CarDTO from '../dto/car.dto.js';
import customUtility from '../utility/custom.utility.js';
import logger from '../utility/logger.utility.js';

const { customExceptionMessage } = customUtility;

const GetCarsService = async (request) => {
  try {
    const { location, from_date, to_date } = request.headers;
    const data = await CarDTO.GetCarsDTO(location, from_date, to_date);
    return data;
  } catch (error) {
    logger.error({ GetCarsService: error.message });
    throw new Error(error.message);
  }
};

const GetCarByIdService = async (request) => {
  try {
    const { car_id } = request.headers;
    const adminId = request.adminId;

    if (!adminId) {
      return customExceptionMessage(401, 'Please login with admin account to add car');
    }
    const data = await CarDTO.GetCarByIdDTO(car_id);
    return data;
  } catch (error) {
    logger.error({ GetCarByIdService: error.message });
    throw new Error(error.message);
  }
};

const GetCarByRegistrationNumberService = async (request) => {
  try {
    const { registration_number } = request.headers;
    const adminId = request.adminId;

    if (!adminId) {
      return customExceptionMessage(401, 'Please login with admin account to add car');
    }
    const data = await CarDTO.GetCarByRegistrationNumberDTO(registration_number);
    return data;
  } catch (error) {
    logger.error({ GetCarByRegistrationNumberService: error.message });
    throw new Error(error.message);
  }
};

const AddCarService = async (request) => {
  try {
    const { name, brand, model_year, daily_rent, availability, registration_number, location, description } =
      request.body;

    const adminId = request.adminId;
    const image = request?.file?.buffer;
    const fileName = request?.file?.originalname?.split('.')?.pop();
    if (!adminId) {
      return customExceptionMessage(401, 'Please login with admin account to add car');
    }
    const GetCar = await CarDTO.GetCarByRegistrationNumberDTO(registration_number);
    if (GetCar.length > 0) {
      return customExceptionMessage(400, 'Car already exist with registration number');
    }
    const data = await CarDTO.AddCarDTO(
      name,
      brand,
      model_year,
      daily_rent,
      availability,
      registration_number,
      adminId,
      image,
      fileName,
      location,
      description,
    );
    return data;
  } catch (error) {
    logger.error({ AddCarService: error.message });
    throw new Error(error.message);
  }
};

const UpdateCarService = async (request) => {
  try {
    const { car_id, name, brand, model_year, daily_rent, availability, registration_number, location, description } =
      request.body;
    const adminId = request.adminId;

    if (!adminId) {
      return customExceptionMessage(401, 'Please login with admin account to add car');
    }
    const GetCar = await CarDTO.GetCarByIdDTO(car_id);
    if (GetCar.length === 0) {
      return customExceptionMessage(400, 'No car found to update');
    }
    const data = await CarDTO.UpdateCarDTO(
      car_id,
      name,
      brand,
      model_year,
      daily_rent,
      availability,
      registration_number,
      adminId,
      location,
      description,
    );
    return data;
  } catch (error) {
    logger.error({ UpdateCarService: error.message });
    throw new Error(error.message);
  }
};

const UpdateCarAvilabilityService = async (request) => {
  try {
    const { car_id, availability } = request.body;

    const adminId = request.adminId;

    if (!adminId) {
      return customExceptionMessage(401, 'Please login with admin account ');
    }
    const GetCar = await CarDTO.GetCarByIdDTO(car_id);
    if (GetCar.length === 0) {
      return customExceptionMessage(400, 'No car found to update');
    }
    const data = await CarDTO.UpdateAvilabilityDTO(car_id, availability, adminId);
    return data;
  } catch (error) {
    logger.error({ UpdateCarAvilabilityService: error.message });
    throw new Error(error.message);
  }
};

const UpdateCarImageService = async (request) => {
  try {
    const { car_id } = request.body;

    const adminId = request.adminId;
    const image = request.file.buffer;
    const fileName = request.file.originalname.split('.').pop();
    if (!adminId) {
      return customExceptionMessage(401, 'Please login with admin account ');
    }
    const GetCar = await CarDTO.GetCarByIdDTO(car_id);
    if (GetCar.length === 0) {
      return customExceptionMessage(400, 'No car found to update');
    }
    const data = await CarDTO.UpdatecarImageDTO(car_id, image, fileName, adminId);
    return data;
  } catch (error) {
    logger.error({ UpdateCarImageService: error.message });
    throw new Error(error.message);
  }
};

const CarService = {
  AddCarService,
  GetCarByIdService,
  GetCarByRegistrationNumberService,
  GetCarsService,
  UpdateCarAvilabilityService,
  UpdateCarService,
  UpdateCarImageService,
};

export default CarService;
