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

const UtiityDTO = {
  GetLocationsDTO,
  GetCarBrandsDTO
};

export default UtiityDTO;
