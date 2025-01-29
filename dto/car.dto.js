'use strict';

import DB from '../config/app/query.config.js';
import pgsql from '../config/database/database.config.js';
import logger from '../utility/logger.utility.js';
import { QueryTypes } from 'sequelize';

const GetCarsDTO = async (location, from_date, to_date) => {
  try {
    const replacements = {
      location: location ? location : null,
      from_date: from_date ? from_date : null,
      to_date: to_date ? to_date : null,
    };
    const query = DB.QUERY.GET_CARS;
    const data = await pgsql.query(query, { replacements, type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetCarsDTO: error.message });
    throw new Error(error.message);
  }
};

const GetCarByIdDTO = async (car_id) => {
  try {
    const query = DB.QUERY.GET_CAR_BY_ID;
    const replacements = {
      car_id,
    };
    const data = await pgsql.query(query, { replacements, type: QueryTypes.SELECT });
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
    const data = await pgsql.query(query, { replacements, type: QueryTypes.SELECT });
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
  created_by,
  image,
  image_ext,
  location,
  description,
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
      created_by,
      image,
      image_ext,
      location,
      description,
    };
    const data = await pgsql.query(query, { replacements, type: QueryTypes.INSERT });
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
    const data = await pgsql.query(query, { replacements, type: QueryTypes.UPDATE });
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
    const data = await pgsql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateAvilabilityDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdatecarImageDTO = async (car_id, image, image_ext, updated_by) => {
  try {
    const query = DB.QUERY.UPDATE_CAR_IMAGE;
    const replacements = {
      car_id,
      image,
      image_ext,
      updated_by,
    };
    const data = await pgsql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateAvilabilityDTO: error.message });
    throw new Error(error.message);
  }
};

const CarDTO = {
  GetCarsDTO,
  GetCarByIdDTO,
  GetCarByRegistrationNumberDTO,
  AddCarDTO,
  UpdateCarDTO,
  UpdateAvilabilityDTO,
  UpdatecarImageDTO,
};

export default CarDTO;
