'use strict';
import properties from '../index.config.js';

const QUERY = {
  //user
  GET_USER_BY_EMAIL: properties.get('query.get_userbyemail'),
  GET_USERBY_ID: properties.get('query.get_userby_id'),
  ADD_NEW_USER: properties.get('query.post_newuser'),
  UPDATE_USER: properties.get('query.update_user'),
  CHANGE_USER_PASSWORD: properties.get('query.change_user_password'),

  //admin
  GET_ADMIN_BY_EMAIL: properties.get('query.get_adminbyemail'),
  GET_ADMINBY_ID: properties.get('query.get_adminby_id'),
  ADD_NEW_ADMIN: properties.get('query.post_newadmin'),
  UPDATE_ADMIN: properties.get('query.update_admin'),
  CHANGE_ADMIN_PASSWORD: properties.get('query.change_admin_password'),

  //cars
  GET_CARS: properties.get('query.get_cars'),
  GET_CAR_BY_ID: properties.get('query.get_car_by_id'),
  GET_CAR_BY_NUMBER: properties.get('query.get_car_by_number'),
  ADD_CAR: properties.get('query.add_car'),
  UPDATE_CAR: properties.get('query.update_car'),
  UPDATE_CAR_AVILABILITY: properties.get('query.update_car_avilability'),
  UPDATE_CAR_IMAGE: properties.get('query.update_car_image')
};

const DB = { QUERY };
export default DB;
