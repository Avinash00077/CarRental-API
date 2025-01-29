'use strict';

import DB from '../config/app/query.config.js';
import pgsql from '../config/database/database.config.js';
import logger from '../utility/logger.utility.js';
import { QueryTypes } from 'sequelize';

const GetBookingDTO = async (booking_id, email, phone_number, car_id, booking_status, user_id) => {
  try {
    const replacements = {
      booking_id: booking_id ? booking_id : null,
      email: email ? email : null,
      phone_number: phone_number ? phone_number : null,
      car_id: car_id ? car_id : null,
      booking_status: booking_status ? booking_status : null,
      user_id: user_id ? user_id : null,
    };
    const query = DB.QUERY.GET_BOOKING;
    const data = await pgsql.query(query, { replacements, type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetBookingDTO: error.message });
    throw new Error(error.message);
  }
};

const GetBookingConflictDTO = async (car_id, booking_id, from_date, to_date) => {
  try {
    const replacements = {
      car_id: car_id ? car_id : null,
      booking_id: booking_id ? booking_id : null,
      from_date: from_date ? from_date : null,
      to_date: to_date ? to_date : null,
    };
    const query = DB.QUERY.GET_BOOKING_CONFLICT;
    const data = await pgsql.query(query, { replacements, type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetBookingConflictDTO: error.message });
    throw new Error(error.message);
  }
};

const AddBoookingDTO = async (
  user_id,
  car_id,
  start_date,
  end_date,
  total_price,
  booking_status,
  payment_mode,
  created_by,
) => {
  try {
    const replacements = {
      user_id,
      car_id,
      start_date,
      end_date,
      total_price,
      booking_status,
      payment_mode,
      created_by,
    };
    const query = DB.QUERY.ADD_BOOKING;
    const data = await pgsql.query(query, { replacements, type: QueryTypes.INSERT });
    return data;
  } catch (error) {
    console.log(error);
    logger.error({ AddBoookingDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateBoookingDTO = async (
  booking_id,
  start_date,
  end_date,
  total_price,
  booking_status,
  payment_mode,
  updated_by,
) => {
  try {
    const replacements = {
      booking_id,
      start_date,
      end_date,
      total_price,
      booking_status,
      payment_mode,
      updated_by,
    };
    const query = DB.QUERY.UPDATE_BOOKING;
    const data = await pgsql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateBoookingDTO: error.message });
    throw new Error(error.message);
  }
};

const BookingDTO = { AddBoookingDTO, GetBookingDTO, GetBookingConflictDTO, UpdateBoookingDTO };

export default BookingDTO;
