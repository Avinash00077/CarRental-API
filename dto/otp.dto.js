'use strict';

import { QueryTypes } from 'sequelize';
import DB from '../config/app/query.config.js';
import mysql from '../config/database/database.config.js';
import logger from '../utility/logger.utility.js';

const GetOtpDTO = async (user_id, otp_type, booking_id) => {
  try {
    const replacements = {
      user_id,
      otp_type,
      booking_id : booking_id ? booking_id : null
    };
    const query = DB.QUERY.GET_OTP;
    const data = await mysql.query(query, { replacements, type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetOtpDTO: error.message });
    throw new Error(error.message);
  }
};

const InserOtpDTO = async (user_id, otp_code, otp_type, booking_id) => {
  try {
    const replacements = {
      user_id,
      otp_code,
      otp_type,
      booking_id: booking_id ? booking_id : null,
    };
    const query = DB.QUERY.INSERT_OTP;
    const data = await mysql.query(query, { replacements, type: QueryTypes.INSERT });
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
    const data = await mysql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateOtpDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateBookingOtpDTO = async (booking_id, otp_code, otp_type) => {
  try {
    const replacements = {
      booking_id,
      otp_code,
      otp_type,
    };
    const query = DB.QUERY.UPDATE_BOOKING_OTP;
    const data = await mysql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateBookingOtpDTO: error.message });
    throw new Error(error.message);
  }
};

const OtpDTO = {
  GetOtpDTO,
  InserOtpDTO,
  UpdateOtpDTO,
  UpdateBookingOtpDTO,
};

export default OtpDTO;
