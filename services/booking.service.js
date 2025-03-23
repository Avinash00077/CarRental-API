'use strict';

import emailTemplates from '../config/app/email.template.js';
import BookingDTO from '../dto/booking.dto.js';
import CarDTO from '../dto/car.dto.js';
import OtpDTO from '../dto/otp.dto.js';
import customUtility from '../utility/custom.utility.js';
import logger from '../utility/logger.utility.js';
import AppConfig from '../config/app/app.config.js';
import sendEmail from '../utility/email.utility.js';
import cloudinaryUtils from '../utility/cloudinary.js';
const { STATUS_MESSAGES, OTP_CODES, BOOKING_MESSAGES } = AppConfig;
const { customExceptionMessage, generateOtp } = customUtility;
const { uploadToCloudinary,deleteUserImageService } = cloudinaryUtils;

const GetUserBookingsService = async (request) => {
  try {
    const userId = request.userId;
    const {type, booking_status} = request.headers;
    const data = await BookingDTO.GetUserBookingDTO(userId, type, booking_status);
    return data;
  } catch (error) {
    logger.error({ GetUserBookingsService: error.message });
    throw new Error(error.message);
  }
};

const GetBookingsService = async (request) => {
  try {
    const adminId = request.adminId;
    const { location } = request.headers;
    const { type } = request.headers;
    if (!adminId) {
      logger.warn({ message: STATUS_MESSAGES[403] });
      return customExceptionMessage(403, STATUS_MESSAGES[403]);
    }
    const data = await BookingDTO.GetAdminBookingDTO(location,type);
    return data;
  } catch (error) {
    logger.error({ GetBookingsService: error.message });
    throw new Error(error.message);
  }
};

const GetCurrentBookingsService = async (request) => {
  try {
    const adminId = request.adminId;
    const { location } = request.headers;
    if (!adminId) {
      logger.warn({ message: STATUS_MESSAGES[403] });
      return customExceptionMessage(403, STATUS_MESSAGES[403]);
    }
    const data = await BookingDTO.GetCurrentBookingsDTO(location);
    return data;
  } catch (error) {
    logger.error({ GetCurrentBookingsService: error.message });
    throw new Error(error.message);
  }
};

const AddBookingService = async (request) => {
  try {
    const { car_id, start_date, start_time, end_date, end_time, total_price, payment_mode } = request.body;
    const { userId, aadhar_verified, driving_license_verified, driving_license_expiry } = request;
    if (aadhar_verified !== 'Y' || driving_license_verified !== 'Y') {
      logger.warn({ message: 'User not verified for booking' });
      return customExceptionMessage(422, 'User not verified for booking');
    }
    if (driving_license_expiry === 'Y') {
      logger.warn({ message: 'Driving lisence expired cannot procced with booking' });
      return customExceptionMessage(422, 'Driving lisence expired cannot procced with booking');
    }
    const carData = await CarDTO.GetCarByIdDTO(car_id);
    if (carData.length === 0) {
      logger.warn({ message: 'Car already booked or car not available' });
      return customExceptionMessage(409, 'Car already booked or car not available');
    }
    const havingConflict = await BookingDTO.GetBookingConflictDTO(car_id, start_date, start_time, end_date, end_time);
    if (havingConflict) {
      logger.warn({ message: 'Conflict booking found' });
      return customExceptionMessage(409, 'Conflict booking found');
    }
    const [data] = await BookingDTO.AddBoookingDTO(
      userId,
      car_id,
      start_date,
      start_time,
      end_date,
      end_time,
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
    if (carData.length === 0) {
      return customExceptionMessage(409, 'Car already booked or car not available');
    }

    const havingConflict = await BookingDTO.GetBookingConflictDTO(car_id, null, start_date, end_date);
    if (havingConflict[0].is_conflict) {
      return customExceptionMessage(409, 'Conflict booking found');
    }
    const data = await BookingDTO.AddBoookingDTO(user_id, car_id, start_date, end_date, total_price, booking_status, payment_mode, adminId);

    return data;
  } catch (error) {
    logger.error({ AddBookingByAdminService: error.message });
    throw new Error(error.message);
  }
};

const UpdateBookingService = async (request) => {
  try {
    const { booking_id, booking_status, transaction_id } = request.body;
    const user_id = request.userId;
    const bookingData = await BookingDTO.GetBookingDTO(booking_id);
    if (bookingData.length === 0 || bookingData[0].booking_status === 'COMPLETED') {
      logger.warn({ message: 'Car rental already completed or data not available' });
      return customExceptionMessage(409, 'Car rental already completed or data not available');
    }
    const data = await BookingDTO.UpdateBoookingDTO(booking_id, booking_status, transaction_id, 'user');
    const { name, brand, car_name, user_email, start_date, start_time, end_date, end_time, car_location } = bookingData[0];
    const model = `${brand}-${car_name}`;
    const otp = generateOtp();
    await OtpDTO.InserOtpDTO(user_id, otp, OTP_CODES.BOOKING, booking_id);
    const emailTemplate = emailTemplates.bookingTemplate(
      name,
      start_date,
      start_time,
      end_date,
      end_time,
      booking_id,
      model,
      car_location,
      otp,
    );
    const subject = emailTemplate.subject;
    const body = emailTemplate.body;
    await sendEmail(user_email, subject, body);
    return data;
  } catch (error) {
    logger.error({ UpdateBookingService: error.message });
    throw new Error(error.message);
  }
};

const CancelBookingService = async (request) => {
  try {
    const { booking_id } = request.headers;
    const user_id = request.userId;
    const bookingData = await BookingDTO.GetBookingDTO(booking_id);
    if (bookingData.length === 0 || bookingData[0].booking_status === 'COMPLETED') {
      logger.warn({ message: 'Car rental already completed or data not available' });
      return customExceptionMessage(409, 'Car rental already completed or data not available');
    }
    const data = await BookingDTO.CancelBoookingDTO(booking_id, 'user');
    const { name, brand, car_name, user_email, start_date, start_time, end_date, end_time, car_location, total_price } = bookingData[0];
    const model = `${brand}-${car_name}`;
    const emailTemplate = emailTemplates.cancellationTemplate(
      name,
      start_date,
      start_time,
      end_date,
      end_time,
      booking_id,
      model,
      car_location,
      total_price/2,
    );
    const subject = emailTemplate.subject;
    const body = emailTemplate.body;
    await sendEmail(user_email, subject, body);
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

    const havingConflict = await BookingDTO.GetBookingConflictDTO(bookingData[0].car_id, booking_id, start_date, end_date);
    if (havingConflict[0].is_conflict) {
      return customExceptionMessage(409, 'Conflict booking found');
    }
    const data = await BookingDTO.UpdateBoookingDTO(booking_id, start_date, end_date, total_price, booking_status, payment_mode, adminId);
    return data;
  } catch (error) {
    logger.error({ UpdateBookingByAdminService: error.message });
    throw new Error(error.message);
  }
};

const GetAvilableSlotsService = async (request) => {
  try {
    const { start_date, start_time, end_date, end_time, car_id } = request.headers;
    const data = await BookingDTO.GetAvilableSlotsDTO(start_date, start_time, end_date, end_time, car_id);
    const groupedResults = data.reduce((acc, { available_date, time_slot }) => {
      if (!acc[available_date]) acc[available_date] = [];
      acc[available_date].push(time_slot);
      return acc;
    }, {});
    return groupedResults;
  } catch (error) {
    logger.error({ GetAvilableSlotsService: error.message });
    throw new Error(error.message);
  }
};

const GetAvilableSlotsByStartDateService = async (request) => {
  try {
    const { start_date, start_time, car_id } = request.headers;
    const data = await BookingDTO.GetAvilableSlotsByStartDateDTO(start_date, start_time, car_id);
    let slotsData = [];
    data.map((i) => {
      slotsData.push(i.available_date);
    });
    const uniqueDates = [...new Set(slotsData)];

    let formatedData = uniqueDates.map((i) => {
      let slots = [];
      data
        .filter((s) => s.available_date === i)
        .map((slotItem) => {
          slots.push(slotItem.time_slot);
          return true;
        });
      return { available_date: i, time_slots: slots };
    });
    return formatedData;
  } catch (error) {
    logger.error({ GetAvilableSlotsByStartDateService: error.message });
    throw new Error(error.message);
  }
};

const PostBookingsReviewService = async (request) => {
  try {
    const userId = request.userId;
    const { booking_id, rating, comments } = request.body;
    const getUserBookings = await BookingDTO.GetBookingDTO(booking_id, null, null, null, null, userId);
    if (getUserBookings.length === 0) {
      return customExceptionMessage(404, BOOKING_MESSAGES.BOOKING_NOT_FOUND);
    }
    if (getUserBookings[0].ride_status !== 'COMPLETED') {
      return customExceptionMessage(422, `can't add review before ride completion`);
    }
    const data = await BookingDTO.PostBookingReviewDTO(userId, booking_id, rating, comments);
    return data;
  } catch (error) {
    logger.error({ PostBookingsReviewService: error.message });
    throw new Error(error.message);
  }
};

const UpdateBookingsReviewService = async (request) => {
  try {
    const userId = request.userId;
    const { booking_id, rating, comments } = request.body;
    const getUserBookings = await BookingDTO.GetBookingDTO(booking_id, null, null, null, null, userId);
    if (getUserBookings.length === 0) {
      return customExceptionMessage(404, BOOKING_MESSAGES.BOOKING_NOT_FOUND);
    }
    if (getUserBookings[0].ride_status !== 'COMPLETED') {
      return customExceptionMessage(422, `can't add review before ride completion`);
    }
    const getReview = await BookingDTO.GetBookingReviewDTO(userId, booking_id);
    if (getReview.length === 0) {
      return customExceptionMessage(404, `Review not found`);
    }
    const data = await BookingDTO.UpdateBookingReviewDTO(userId, booking_id, rating, comments);
    return data;
  } catch (error) {
    logger.error({ UpdateBookingsReviewService: error.message });
    throw new Error(error.message);
  }
};

const UpdateBookingPickUpService = async (request) => {
  try {
    const { booking_id, startKm } = request.body;
    const admin = request.adminId;
    if (!admin) {
      return customExceptionMessage(403, STATUS_MESSAGES[403]);
    }
    const bookingData = await BookingDTO.GetBookingDTO(booking_id);
    if (bookingData.length === 0 || bookingData[0].booking_status === 'COMPLETED') {
      return customExceptionMessage(409, 'Car rental already completed or data not available');
    }
        const uploadedImages = {};
        const imageFields = [
          'car_image_front',
          'car_image_back',
          'car_image_side_1',
          'car_image_side_2',
          'extraImge'
        ];
    
        for (const field of imageFields) {
          if (request.files[field]) {
            uploadedImages[field] = await uploadToCloudinary(request.files[field][0], 'bookings');
          }
        }
    const data = await BookingDTO.UpdateBookingPickUpDTO(booking_id,startKm);
    await BookingDTO.bookingCarImagesDTO(booking_id,
      uploadedImages.car_image_front,
      uploadedImages.car_image_back,
      uploadedImages.car_image_side_1,
      uploadedImages.car_image_side_2,
      'B',
      uploadedImages?.extraImge,)
    return data;
  } catch (error) {
    logger.error({ UpdateBookingPickUpService: error.message });
    throw new Error(error.message);
  }
};

const UpdateBookingDropService = async (request) => {
  try {
    const { booking_id,endKm } = request.body;
    const admin = request.adminId;
    if (!admin) {
      return customExceptionMessage(403, STATUS_MESSAGES[403]);
    }
    const bookingData = await BookingDTO.GetBookingDTO(booking_id);
    if (bookingData.length === 0) {
      return customExceptionMessage(409, 'Car rental already completed or data not available');
    }
    const uploadedImages = {};
    const imageFields = [
      'car_image_front',
      'car_image_back',
      'car_image_side_1',
      'car_image_side_2',
      'extraImge'
    ];

    for (const field of imageFields) {
      if (request.files[field]) {
        uploadedImages[field] = await uploadToCloudinary(request.files[field][0], 'bookings');
      }
    }
    const data = await BookingDTO.UpdateBookingDropDTO(booking_id,endKm);
    await BookingDTO.bookingCarImagesDTO(booking_id,
      uploadedImages.car_image_front,
      uploadedImages.car_image_back,
      uploadedImages.car_image_side_1,
      uploadedImages.car_image_side_2,
      'A',
      uploadedImages?.extraImge,)
    return data;
  } catch (error) {
    logger.error({ UpdateBookingDropService: error.message });
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
  GetAvilableSlotsService,
  GetAvilableSlotsByStartDateService,
  GetCurrentBookingsService,
  PostBookingsReviewService,
  UpdateBookingsReviewService,
  CancelBookingService,
  UpdateBookingPickUpService,
  UpdateBookingDropService,
};

export default BookingService;
