'use-strict';
import BookingService from '../services/booking.service.js';
import logger from '../utility/logger.utility.js';

const GetUserBookingsController = async (request, response) => {
  try {
    const data = await BookingService.GetUserBookingsService(request);
    response.status(200).json({ message: 'Okay Request Successful', data: data });
  } catch (error) {
    logger.error({ GetUserBookingsController: error.message });
    response.status(500).json({ message: 'internalServerError' });
  }
};

const GetBookingsController = async (request, response) => {
  try {
    const data = await BookingService.GetBookingsService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      response.status(200).json({ message: 'Okay Request Sucessfull', data: data });
    }
  } catch (error) {
    logger.error({ GetBookingsController: error.message });
    response.status(500).json({ message: 'internalServerError' });
  }
};

const AddBookingController = async (request, response) => {
  try {
    const data = await BookingService.AddBookingService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      response.status(201).json({ message: 'Rental Booking Sucessfull' });
    }
  } catch (error) {
    logger.error({ AddBookingController: error.message });
    response.status(500).json({ message: 'internalServerError' });
  }
};

const AddBookingByAdminController = async (request, response) => {
  try {
    const data = await BookingService.AddBookingByAdminService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      response.status(201).json({ message: 'Rental Booking Sucessfull' });
    }
  } catch (error) {
    logger.error({ AddBookingByAdminController: error.message });
    response.status(500).json({ message: 'internalServerError' });
  }
};

const UpdateBookingController = async (request, response) => {
  try {
    const data = await BookingService.UpdateBookingService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      response.status(200).json({ message: 'Rental Booking update Sucessfull' });
    }
  } catch (error) {
    logger.error({ UpdateBookingController: error.message });
    response.status(500).json({ message: 'internalServerError' });
  }
};

const UpdateBookingByAdminController = async (request, response) => {
  try {
    const data = await BookingService.UpdateBookingByAdminService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      response.status(200).json({ message: 'Rental Booking update Sucessfull' });
    }
  } catch (error) {
    logger.error({ UpdateBookingByAdminController: error.message });
    response.status(500).json({ message: 'internalServerError' });
  }
};

const BookingController = {
  GetUserBookingsController,
  GetBookingsController,
  AddBookingController,
  AddBookingByAdminController,
  UpdateBookingController,
  UpdateBookingByAdminController,
};

export default BookingController;
