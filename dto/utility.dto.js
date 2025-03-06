'use strict';

import { QueryTypes } from 'sequelize';
import DB from '../config/app/query.config.js';
import mysql from '../config/database/database.config.js';
import logger from '../utility/logger.utility.js';

const GetLocationsDTO = async (user_name) => {
  try {
    const query = DB.QUERY.GET_LOCATIONS;
    const data = await mysql.query(query, { type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetLocationsDTO: error.message });
    throw new Error(error.message);
  }
};

const GetCarBrandsDTO = async (user_name) => {
  try {
    const query = DB.QUERY.GET_CAR_BRANDS;
    const data = await mysql.query(query, { type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetCarBrandsDTO: error.message });
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
    const query = DB.QUERY.GET_FEEDBACKS
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
  UpdateFeedbackDTO
};

export default UtiityDTO;
