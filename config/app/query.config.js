'use strict';
import properties from '../index.config.js';

const QUERY = {
  //
  INSERT_OTP: properties.get('query.insert_otp'),
  GET_OTP: properties.get('query.get_otp'),
  UPDATE_OTP: properties.get('query.update_otp'),
  UPDATE_BOOKING_OTP: properties.get('query.update_booking_otp'),


  //user
  GET_USER_NAME: properties.get('query.get_user_name'),
  GET_USER_BY_USER_NAME: properties.get('query.get_user_by_user_name'),
  GET_USER_BY_EMAIL: properties.get('query.get_userbyemail'),
  GET_USERBY_ID: properties.get('query.get_userby_id'),
  ADD_NEW_USER: properties.get('query.post_newuser'),
  UPDATE_USER: properties.get('query.update_user'),
  CHANGE_USER_PASSWORD: properties.get('query.change_user_password'),
  UPDATE_LAST_LOGIN: properties.get('query.update_last_login'),
  UPDATE_USER_IMAGE: properties.get('query.update_user_image'),
  UPDATE_USER_AADHAR:properties.get('query.update_user_aadhar'),
  UPDATE_USER_DRIVING_LICENSE: properties.get('query.update_user_driving_license'),
  UPDATE_USER_COVER_IMAGE: properties.get('query.update_user_cover_image'),
  GET_USERS_FOR_VERIFICATION: properties.get('query.get_users_for_verification'),
  UPDATE_USER_VERFICATION: properties.get('query.update_user_verfication'),

  //admin
  GET_ADMIN_BY_EMAIL: properties.get('query.get_adminbyemail'),
  GET_ADMINBY_ID: properties.get('query.get_adminby_id'),
  ADD_NEW_ADMIN: properties.get('query.post_newadmin'),
  UPDATE_ADMIN: properties.get('query.update_admin'),
  CHANGE_ADMIN_PASSWORD: properties.get('query.change_admin_password'),

  //cars
  GET_ALL_CARS : properties.get('query.get_all_cars'),
  GET_RANDOM_CARS: properties.get('query.get_random_cars'),
  GET_CARS: properties.get('query.get_cars'),
  GET_CAR_BY_ID: properties.get('query.get_car_by_id'),
  GET_CAR_BY_NUMBER: properties.get('query.get_car_by_number'),
  ADD_CAR: properties.get('query.add_car'),
  UPDATE_CAR: properties.get('query.update_car'),
  UPDATE_CAR_AVILABILITY: properties.get('query.update_car_avilability'),
  UPDATE_CAR_IMAGE: properties.get('query.update_car_image'),
 


  //booking
  GET_CURRENT_BOOKINGS: properties.get('query.get_current_bookings'),
  GET_BOOKING: properties.get('query.get_booking'),
  ADD_BOOKING: properties.get('query.add_booking'),
  UPDATE_BOOKING: properties.get('query.update_booking'),
  GET_BOOKING_CONFLICT: properties.get('query.get_booking_conflict'),
  GET_AVILABLE_SLOTS: properties.get('query.get_avilable_slots'),
  GET_AVILABLE_SLOTS_BY_START_DATE: properties.get('query.get_avilable_slots_by_start_date'),
  UPDATE_BOOKING_STATUS_PICKUP: properties.get('query.update_booking_status_pickup'),
  POST_REVIEW : properties.get('query.post_review'),
  UPDATE_REVIEW: properties.get('query.update_review'),
  GET_REVIEW: properties.get('query.get_review'),
  UPDATE_BOOKING_PICKUP : properties.get('query.update_booking_pickup'),
  UPDATE_BOOKING_DROP : properties.get('query.update_booking_drop'),
  UPDATE_BOOKING_IMAGES: properties.get('query.update_booking_images'),
  GET_BOOKING_IMAGES : properties.get('query.get_booking_images'),
  CANCEL_BOOKING : properties.get('query.cancel_booking'),

  //utility
  GET_LOCATIONS :properties.get('query.get_locations'),
  GET_CAR_BRANDS: properties.get('query.get_car_brands')
  
};

const DB = { QUERY };
export default DB;
