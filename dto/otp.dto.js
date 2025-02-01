'use strict';

import { QueryTypes } from 'sequelize';
import DB from '../config/app/query.config.js';
import pgsql from '../config/database/database.config.js';
import logger from '../utility/logger.utility.js';

const GetOtpDTO = async (user_id, otp_type) => {
  try {
    const replacements = {
      user_id,
      otp_type,
    };
    const query = DB.QUERY.GET_OTP;
    const data = await pgsql.query(query, { replacements, type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetOtpDTO: error.message });
    throw new Error(error.message);
  }
};

const InserOtpDTO = async (user_id, otp_code, otp_type) => {
  try {
    const replacements = {
      user_id,
      otp_code,
      otp_type,
    };
    const query = DB.QUERY.INSERT_OTP;
    const data = await pgsql.query(query, { replacements, type: QueryTypes.INSERT });
    return data;
  } catch (error) {
    logger.error({ InserOtpDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateOtpDTO = async (user_id, otp_code, otp_type) => {
  try {
    const replacements = {
      user_id,
      otp_code,
      otp_type,
    };
    const query = DB.QUERY.UPDATE_OTP;
    const data = await pgsql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateOtpDTO: error.message });
    throw new Error(error.message);
  }
};

const OtpDTO = {
  GetOtpDTO,
  InserOtpDTO,
  UpdateOtpDTO,
};

export default OtpDTO;
