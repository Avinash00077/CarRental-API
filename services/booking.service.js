'use strict';

import BookingDTO from '../dto/booking.dto.js';
import CarDTO from '../dto/car.dto.js';
import customUtility from '../utility/custom.utility.js';
import logger from '../utility/logger.utility.js';

const { customExceptionMessage } = customUtility;

const GetUserBookingsService = async (request) => {
  try {
    const userId = request.userId;
    const data = await BookingDTO.GetBookingDTO(null, null, null, null, null, userId);
    return data;
  } catch (error) {
    logger.error({ GetUserBookingsService: error.message });
    throw new Error(error.message);
  }
};

const GetBookingsService = async (request) => {
  try {
    const adminId = request.adminId;
    const { booking_id, email, phone_number, car_id, booking_status, user_id } = request.headers;
    if (!adminId) {
      return customExceptionMessage(401, 'Please login with admin account to get car data');
    }
    const data = await BookingDTO.GetBookingDTO(booking_id, email, phone_number, car_id, booking_status, user_id);
    return data;
  } catch (error) {
    logger.error({ GetBookingsService: error.message });
    throw new Error(error.message);
  }
};

const AddBookingService = async (request) => {
  try {
    const { car_id, start_date, end_date, total_price, payment_mode } = request.body;
    const userId = request.userId;
    const carData = await CarDTO.GetCarByIdDTO(car_id);
    if (carData.length === 0) {
      return customExceptionMessage(409, 'Car already booked or car not available');
    }
    const havingConflict = await BookingDTO.GetBookingConflictDTO(
        car_id,
        null,
        start_date,
        end_date,
      );
      if (havingConflict[0].is_conflict) {
        return customExceptionMessage(409, 'Conflict booking found');
      }
    const data = await BookingDTO.AddBoookingDTO(
      userId,
      car_id,
      start_date,
      end_date,
      total_price,
      'PENDING',
      payment_mode,
      'user',
    );
    return data;
  } catch (error) {
    logger.error({ AddBookingService: error.message });
    throw new Error(error.message);
  }
};

const AddBookingByAdminService = async (request) => {
  try {
    const { user_id, car_id, start_date, end_date, total_price, booking_status, payment_mode } = request.body;
    const adminId = request.adminId;
    if (!adminId) {
      return customExceptionMessage(401, 'Please login with admin acccount');
    }
    const carData = await CarDTO.GetCarByIdDTO(car_id);
    if (carData.length === 0 ) {
      return customExceptionMessage(409, 'Car already booked or car not available');
    }

    const havingConflict = await BookingDTO.GetBookingConflictDTO(
        car_id,
        null,
        start_date,
        end_date,
      );
      if (havingConflict[0].is_conflict) {
        return customExceptionMessage(409, 'Conflict booking found');
      }
    const data = await BookingDTO.AddBoookingDTO(
      user_id,
      car_id,
      start_date,
      end_date,
      total_price,
      booking_status,
      payment_mode,
      adminId,
    );
    return data;
  } catch (error) {
    logger.error({ AddBookingByAdminService: error.message });
    throw new Error(error.message);
  }
};

const UpdateBookingService = async (request) => {
  try {
    const { booking_id, start_date, end_date, total_price, booking_status, payment_mode } = request.body;
    const bookingData = await BookingDTO.GetBookingDTO(booking_id);
    if (bookingData.length === 0 || bookingData[0].booking_status === 'COMPLETED') {
      return customExceptionMessage(409, 'Car rental already completed or data not available');
    }
    const havingConflict = await BookingDTO.GetBookingConflictDTO(
      bookingData[0].car_id,
      booking_id,
      start_date,
      end_date,
    );
    if (havingConflict[0].is_conflict) {
      return customExceptionMessage(409, 'Conflict booking found');
    }
    const data = await BookingDTO.UpdateBoookingDTO(
      booking_id,
      start_date,
      end_date,
      total_price,
      booking_status,
      payment_mode,
      'user',
    );
    return data;
  } catch (error) {
    logger.error({ UpdateBookingService: error.message });
    throw new Error(error.message);
  }
};

const UpdateBookingByAdminService = async (request) => {
  try {
    const { booking_id, start_date, end_date, total_price, booking_status, payment_mode } = request.body;
    const adminId = request.adminId;
    if (!adminId) {
      return customExceptionMessage(401, 'Please login with admin acccount');
    }
    const bookingData = await BookingDTO.GetBookingDTO(booking_id);
    if (bookingData.length === 0 || bookingData[0].booking_status === 'COMPLETED') {
      return customExceptionMessage(409, 'Car rental already completed or data not available');
    }

    const havingConflict = await BookingDTO.GetBookingConflictDTO(
        bookingData[0].car_id,
        booking_id,
        start_date,
        end_date,
      );
      if (havingConflict[0].is_conflict) {
        return customExceptionMessage(409, 'Conflict booking found');
      }
    const data = await BookingDTO.UpdateBoookingDTO(
      booking_id,
      start_date,
      end_date,
      total_price,
      booking_status,
      payment_mode,
      adminId,
    );
    return data;
  } catch (error) {
    logger.error({ UpdateBookingByAdminService: error.message });
    throw new Error(error.message);
  }
};

const BookingService = {
  GetUserBookingsService,
  GetBookingsService,
  AddBookingService,
  AddBookingByAdminService,
  UpdateBookingService,
  UpdateBookingByAdminService,
};

export default BookingService;
