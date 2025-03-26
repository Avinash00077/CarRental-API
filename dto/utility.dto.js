'use strict';

import { QueryTypes } from 'sequelize';
import DB from '../config/app/query.config.js';
import mysql from '../config/database/database.config.js';
import logger from '../utility/logger.utility.js';

const GetLocationsDTO = async () => {
  try {
    const query = DB.QUERY.GET_LOCATIONS;
    const data = await mysql.query(query, { type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetLocationsDTO: error.message });
    throw new Error(error.message);
  }
};

const PostLocationsDTO = async (location, address, activeInd, latitude, longitude) => {
  try {
    const replacements = {
      location,
      address,
      activeInd,
      latitude,
      longitude,
    };
    const query = DB.QUERY.POST_LOCATIONS;
    const data = await mysql.query(query, { replacements, type: QueryTypes.INSERT });
    return data;
  } catch (error) {
    logger.error({ PostLocationsDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateLocationsDTO = async (location_id, location, address, activeInd, latitude, longitude) => {
  try {
    const replacements = {
      location_id,
      location,
      address,
      activeInd,
      latitude,
      longitude,
    };
    const query = DB.QUERY.UPDATE_LOCATIONS;
    const data = await mysql.query(query, { replacements, type: QueryTypes.INSERT });
    return data;
  } catch (error) {
    logger.error({ UpdateLocationsDTO: error.message });
    throw new Error(error.message);
  }
};

const GetCarBrandsDTO = async () => {
  try {
    const query = DB.QUERY.GET_CAR_BRANDS;
    const data = await mysql.query(query, { type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetCarBrandsDTO: error.message });
    throw new Error(error.message);
  }
};

const PostCarBrandDTO = async (car_brand, car_name, car_type, seater, car_modal_year) => {
  try {
    const replacements = {
      car_brand,
      car_name,
      car_type,
      seater,
      car_modal_year,
    };
    const query = DB.QUERY.POST_CAR_BRANDS;
    const data = await mysql.query(query, { replacements, type: QueryTypes.INSERT });
    return data;
  } catch (error) {
    logger.error({ PostCarBrandDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateCarBrandDTO = async ( car_id ,car_brand, car_name, car_type, seater, car_modal_year, activeInd) => {
  try {
    const replacements = {
      car_id ,
      car_brand,
      car_name,
      car_type,
      seater,
      car_modal_year,
      activeInd,
    };
    const query = DB.QUERY.UPDATE_CAR_BRANDS;
    const data = await mysql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateCarBrandDTO: error.message });
    throw new Error(error.message);
  }
};

const PostFeedbackDTO = async (user_id, rating, comments) => {
  try {
    const query = DB.QUERY.POST_FEEDBACK;
    const replacements = {
      user_id,
      rating,
      comments,
    };
    const data = await mysql.query(query, { replacements, type: QueryTypes.INSERT });
    return data;
  } catch (error) {
    logger.error({ PostFeedbackDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateFeedbackDTO = async (user_id, rating, comments) => {
  try {
    const query = DB.QUERY.UPDATE_FEEDBACK;
    const replacements = {
      user_id,
      rating,
      comments,
    };
    const data = await mysql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateFeedbackDTO: error.message });
    throw new Error(error.message);
  }
};

const GetFeedbacksDTO = async () => {
  try {
    const query = DB.QUERY.GET_FEEDBACKS;
    const data = await mysql.query(query, { type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetFeedbacksDTO: error.message });
    throw new Error(error.message);
  }
};

const UtiityDTO = {
  GetLocationsDTO,
  GetCarBrandsDTO,
  PostFeedbackDTO,
  GetFeedbacksDTO,
  UpdateFeedbackDTO,
  PostLocationsDTO,
  UpdateLocationsDTO,
  PostCarBrandDTO,
  UpdateCarBrandDTO,
};

export default UtiityDTO;
