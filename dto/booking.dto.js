'use strict';

import DB from '../config/app/query.config.js';
import mysql from '../config/database/database.config.js';
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
    const data = await mysql.query(query, { replacements, type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetBookingDTO: error.message });
    throw new Error(error.message);
  }
};

const GetCurrentBookingsDTO = async (location) => {
  try {
    const replacements = {
      location: location ? location : null,
    };
    const query = DB.QUERY.GET_CURRENT_BOOKINGS;
    const data = await mysql.query(query, { replacements, type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetCurrentBookingsDTO: error.message });
    throw new Error(error.message);
  }
};

const GetBookingConflictDTO = async (car_id, start_date, start_time, end_date, end_time) => {
  try {
    const replacements = {
      car_id,
      start_date,
      start_time,
      end_date,
      end_time,
    };
    const query = DB.QUERY.GET_BOOKING_CONFLICT;
    const [data] = await mysql.query(query, { replacements, type: QueryTypes.SELECT });
    const Conflict = data.availability_status === 0 ? false : true;
    return Conflict;
  } catch (error) {
    logger.error({ GetBookingConflictDTO: error.message });
    throw new Error(error.message);
  }
};

const AddBoookingDTO = async (
  user_id,
  car_id,
  start_date,
  start_time,
  end_date,
  end_time,
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
      start_time,
      end_date,
      end_time,
      total_price,
      booking_status,
      payment_mode,
      created_by,
    };
    const query = DB.QUERY.ADD_BOOKING;
    const data = await mysql.query(query, { replacements, type: QueryTypes.INSERT });
    const [bookingData] = await mysql.query('SELECT LAST_INSERT_ID() AS booking_id');
    return bookingData;
  } catch (error) {
    logger.error({ AddBoookingDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateBoookingDTO = async (booking_id, booking_status, transaction_id, updated_by) => {
  try {
    const replacements = {
      booking_id,
      booking_status,
      transaction_id,
      updated_by,
    };
    const query = DB.QUERY.UPDATE_BOOKING;
    const data = await mysql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateBoookingDTO: error.message });
    throw new Error(error.message);
  }
};

const CancelBoookingDTO = async (booking_id) => {
  try {
    const replacements = {
      booking_id,
    };
    const query = DB.QUERY.CANCEL_BOOKING;
    const data = await mysql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ CancelBoookingDTO: error.message });
    throw new Error(error.message);
  }
};

const GetAvilableSlotsDTO = async (start_date, start_time, end_date, end_time, car_id) => {
  try {
    const replacements = { start_date, start_time, end_date, end_time, car_id };
    const query = DB.QUERY.GET_AVILABLE_SLOTS;
    const data = await mysql.query(query, { replacements, type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetAvilableSlotsDTO: error.message });
    throw new Error(error.message);
  }
};

const GetAvilableSlotsByStartDateDTO = async (start_date, start_time, car_id) => {
  try {
    const replacements = { start_date, start_time, car_id };
    const query = DB.QUERY.GET_AVILABLE_SLOTS_BY_START_DATE;
    const data = await mysql.query(query, { replacements, type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetAvilableSlotsByStartDateDTO: error.message });
    throw new Error(error.message);
  }
};

const PostBookingReviewDTO = async (userId, bookingId, rating, comment) => {
  try {
    const replacements = { userId, bookingId, rating, comment };
    const query = DB.QUERY.POST_REVIEW;
    const data = await mysql.query(query, { replacements, type: QueryTypes.INSERT });
    return data;
  } catch (error) {
    logger.error({ PostBookingReviewDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateBookingReviewDTO = async (userId, bookingId, rating, comment) => {
  try {
    const replacements = { userId, bookingId, rating, comment };
    const query = DB.QUERY.UPDATE_REVIEW;
    const data = await mysql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateBookingReviewDTO: error.message });
    throw new Error(error.message);
  }
};

const GetBookingReviewDTO = async (userId, bookingId) => {
  try {
    const replacements = { userId, bookingId };
    const query = DB.QUERY.GET_REVIEW;
    const data = await mysql.query(query, { replacements, type: QueryTypes.SELECT });
    return data;
  } catch (error) {
    logger.error({ GetBookingReviewDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateBookingPickUpDTO = async (booking_id) => {
  try {
    const query = DB.QUERY.UPDATE_BOOKING_PICKUP;
    const replacements = {
      booking_id,
    };
    const data = await mysql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateBookingPickUpDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateBookingDropDTO = async (booking_id) => {
  try {
    const query = DB.QUERY.UPDATE_BOOKING_DROP;
    const replacements = {
      booking_id,
    };
    const data = await mysql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateBookingDropDTO: error.message });
    throw new Error(error.message);
  }
};

const BookingDTO = {
  AddBoookingDTO,
  GetBookingDTO,
  GetBookingConflictDTO,
  UpdateBoookingDTO,
  GetAvilableSlotsByStartDateDTO,
  GetAvilableSlotsDTO,
  GetCurrentBookingsDTO,
  PostBookingReviewDTO,
  UpdateBookingReviewDTO,
  GetBookingReviewDTO,
  CancelBoookingDTO,
  UpdateBookingDropDTO,
  UpdateBookingPickUpDTO,
};

export default BookingDTO;
