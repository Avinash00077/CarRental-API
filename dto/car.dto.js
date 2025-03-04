'use strict';

import DB from '../config/app/query.config.js';
import mysql from '../config/database/database.config.js';
import logger from '../utility/logger.utility.js';
import { QueryTypes } from 'sequelize';

const GetRandomCarsDTO = async (location) => {
  try {
    const replacements = {
      location
    };
    const query = DB.QUERY.GET_RANDOM_CARS;
    const data = await mysql.query(query, { replacements, type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetRandomCarsDTO: error.message });
    throw new Error(error.message);
  }
};


const GetCarsDTO = async (location, start_date, end_date, start_time, end_time) => {
  try {
    const replacements = {
      location: location ? location : null,
      end_date: end_date ? end_date : null,
      start_date: start_date ? start_date : null,
      start_time: start_time ? start_time : null,
      end_time: end_time ? end_time : null,
    };
    const query = DB.QUERY.GET_CARS;
    const data = await mysql.query(query, { replacements, type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetCarsDTO: error.message });
    throw new Error(error.message);
  }
};

const GetAllCarsDTO = async (location) => {
  try {
    const replacements = {
      location: location ? location : null,
    };
    const query = DB.QUERY.GET_ALL_CARS;
    const data = await mysql.query(query, { replacements, type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetCarsDTO: error.message });
    throw new Error(error.message);
  }
};

const GetCarByIdDTO = async (car_id, start_date, end_date, start_time, end_time) => {
  try {
    const query = DB.QUERY.GET_CAR_BY_ID;
    const replacements = {
      car_id,
      end_date: end_date ? end_date : null,
      start_date: start_date ? start_date : null,
      start_time: start_time ? start_time : null,
      end_time: end_time ? end_time : null,
    };
    const data = await mysql.query(query, { replacements, type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetCarByIdDTO: error.message });
    throw new Error(error.message);
  }
};

const GetCarByRegistrationNumberDTO = async (registration_number) => {
  try {
    const query = DB.QUERY.GET_CAR_BY_NUMBER;
    const replacements = {
      registration_number,
    };
    const data = await mysql.query(query, { replacements, type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetCarByRegistrationNumberDTO: error.message });
    throw new Error(error.message);
  }
};

const AddCarDTO = async (
  name,
  brand,
  model_year,
  daily_rent,
  availability,
  registration_number,
  car_cover_img_url,
  location,
  description,
  car_owner,
  car_condition,
  mileage,
  car_type,
  seater,
  fastag_availability,
  location_address,
) => {
  try {
    const query = DB.QUERY.ADD_CAR;
    const replacements = {
      name,
      brand,
      model_year,
      daily_rent,
      availability,
      registration_number,
      car_cover_img_url,
      location,
      description,
      car_owner,
      car_condition,
      mileage,
      car_type,
      seater,
      fastag_availability,
      location_address,
    };
    console.log(replacements);
    const data = await mysql.query(query, { replacements, type: QueryTypes.INSERT });
    return data;
  } catch (error) {
    logger.error({ AddCarDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateCarDTO = async (
  car_id,
  name,
  brand,
  model_year,
  daily_rent,
  availability,
  registration_number,
  updated_by,
  location,
  description,
) => {
  try {
    const query = DB.QUERY.UPDATE_CAR;
    const replacements = {
      car_id,
      name,
      brand,
      model_year,
      daily_rent,
      availability,
      registration_number,
      updated_by,
      location,
      description,
    };
    const data = await mysql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateCarDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateAvilabilityDTO = async (car_id, availability, updated_by) => {
  try {
    const query = DB.QUERY.UPDATE_CAR_AVILABILITY;
    const replacements = {
      car_id,
      availability,
      updated_by,
    };
    const data = await mysql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateAvilabilityDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdatecarImageDTO = async (car_id, car_cover_img_url) => {
  try {
    const query = DB.QUERY.UPDATE_CAR_IMAGE;
    const replacements = {
      car_id,
      car_cover_img_url,
    };
    const data = await mysql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateAvilabilityDTO: error.message });
    throw new Error(error.message);
  }
};

const CarDTO = {
  GetRandomCarsDTO,
  GetCarsDTO,
  GetCarByIdDTO,
  GetCarByRegistrationNumberDTO,
  AddCarDTO,
  UpdateCarDTO,
  UpdateAvilabilityDTO,
  UpdatecarImageDTO,
  GetAllCarsDTO,
};

export default CarDTO;
