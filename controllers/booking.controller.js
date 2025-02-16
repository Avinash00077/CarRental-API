'use-strict';
import BookingService from '../services/booking.service.js';
import logger from '../utility/logger.utility.js';
import AppConfig from '../config/app/app.config.js';
const {STATUS_MESSAGES, BOOKING_MESSAGES} = AppConfig

const GetUserBookingsController = async (request, response) => {
  try {
    const data = await BookingService.GetUserBookingsService(request);
    response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    logger.error({ GetUserBookingsController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500]  });
  }
};

const GetBookingsController = async (request, response) => {
  try {
    const data = await BookingService.GetBookingsService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      response.status(200).json({ message: STATUS_MESSAGES[200] , data: data });
    }
  } catch (error) {
    logger.error({ GetBookingsController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500]  });
  }
};

const AddBookingController = async (request, response) => {
  try {
    const data = await BookingService.AddBookingService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      response.status(201).json({ message: BOOKING_MESSAGES.BOOKING_CREATED, data: data });
    }
  } catch (error) {
    logger.error({ AddBookingController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500]  });
  }
};

const AddBookingByAdminController = async (request, response) => {
  try {
    const data = await BookingService.AddBookingByAdminService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      response.status(201).json({ message: BOOKING_MESSAGES.BOOKING_CREATED });
    }
  } catch (error) {
    logger.error({ AddBookingByAdminController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500]  });
  }
};

const UpdateBookingController = async (request, response) => {
  try {
    const data = await BookingService.UpdateBookingService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      response.status(200).json({ message: BOOKING_MESSAGES.BOOKING_CONFIRMED });
    }
  } catch (error) {
    logger.error({ UpdateBookingController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500]  });
  }
};

const UpdateBookingByAdminController = async (request, response) => {
  try {
    const data = await BookingService.UpdateBookingByAdminService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      response.status(200).json({ message: BOOKING_MESSAGES.BOOKING_CONFIRMED});
    }
  } catch (error) {
    logger.error({ UpdateBookingByAdminController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500]  });
  }
};

const GetAvilableSlotsController = async (request, response) => {
  try {
    const data = await BookingService.GetAvilableSlotsService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      response.status(200).json({ message: STATUS_MESSAGES[200] , data: data });
    }
  } catch (error) {
    logger.error({ GetAvilableSlotsController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500]  });
  }
};

const GetAvilableSlotsByStartDateController = async (request, response) => {
  try {
    const data = await BookingService.GetAvilableSlotsByStartDateService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      response.status(200).json({ message: STATUS_MESSAGES[200] , data: data });
    }
  } catch (error) {
    logger.error({ GetAvilableSlotsByStartDateController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500]  });
  }
};

const BookingController = {
  GetUserBookingsController,
  GetBookingsController,
  AddBookingController,
  AddBookingByAdminController,
  UpdateBookingController,
  UpdateBookingByAdminController,
  GetAvilableSlotsByStartDateController,
  GetAvilableSlotsController,
};

export default BookingController;
