'use strict';
import properties from '../index.config.js';

const QUERY = {
  //
  INSERT_OTP: properties.get('query.insert_otp'),
  GET_OTP: properties.get('query.get_otp'),
  UPDATE_OTP: properties.get('query.update_otp'),

  //user
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

  //admin
  GET_ADMIN_BY_EMAIL: properties.get('query.get_adminbyemail'),
  GET_ADMINBY_ID: properties.get('query.get_adminby_id'),
  ADD_NEW_ADMIN: properties.get('query.post_newadmin'),
  UPDATE_ADMIN: properties.get('query.update_admin'),
  CHANGE_ADMIN_PASSWORD: properties.get('query.change_admin_password'),

  //cars
  GET_RANDOM_CARS: properties.get('query.get_random_cars'),
  GET_CARS: properties.get('query.get_cars'),
  GET_CAR_BY_ID: properties.get('query.get_car_by_id'),
  GET_CAR_BY_NUMBER: properties.get('query.get_car_by_number'),
  ADD_CAR: properties.get('query.add_car'),
  UPDATE_CAR: properties.get('query.update_car'),
  UPDATE_CAR_AVILABILITY: properties.get('query.update_car_avilability'),
  UPDATE_CAR_IMAGE: properties.get('query.update_car_image'),
 


  //booking
  GET_BOOKING: properties.get('query.get_booking'),
  ADD_BOOKING: properties.get('query.add_booking'),
  UPDATE_BOOKING: properties.get('query.update_booking'),
  GET_BOOKING_CONFLICT: properties.get('query.get_booking_conflict'),
  GET_AVILABLE_SLOTS: properties.get('query.get_avilable_slots'),
  GET_AVILABLE_SLOTS_BY_START_DATE: properties.get('query.get_avilable_slots_by_start_date'),
};

const DB = { QUERY };
export default DB;
