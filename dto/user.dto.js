'use strict';

import { QueryTypes } from 'sequelize';
import DB from '../config/app/query.config.js';
import pgsql from '../config/database/database.config.js';
import logger from '../utility/logger.utility.js';

const GetUserByEmailDTO = async (email, number) => {
  try {
    const query = DB.QUERY.GET_USER_BY_EMAIL;
    const replacements = { email: email ? email : null, phone_number: number ? number : null };
    const data = await pgsql.query(query, { type: pgsql.QueryTypes.SELECT, replacements: replacements });
    return data;
  } catch (error) {
    logger.error({ GetUserByEmailDTO: error.message });
    throw new Error(error.message);
  }
};

const GetUserByIdDTO = async (user_id) => {
  try {
    const query = DB.QUERY.GET_USERBY_ID;
    const replacements = { user_id };
    const data = await pgsql.query(query, { type: pgsql.QueryTypes.SELECT, replacements: replacements });
    return data;
  } catch (error) {
    logger.error({ GetUserByIdDTO: error.message });
    throw new Error(error.message);
  }
};

const AddNewUserDTO = async (first_name, last_name, email, gender, password, phone_number,dob) => {
  try {
    const query = DB.QUERY.ADD_NEW_USER;
    const replacements = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      gender: gender,
      password: password,
      phone_number: phone_number,
      dob: dob,
    };
    const data = await pgsql.query(query, { type: pgsql.QueryTypes.INSERT, replacements: replacements });
    return data;
  } catch (error) {
    logger.error({ AddNewUserDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateUserDTO = async (first_name, last_name, email, gender, address, user_id, dob) => {
  try {
    const query = DB.QUERY.UPDATE_USER;
    const replacements = {
      first_name,
      last_name,
      email,
      gender,
      address : address ? address : null,
      user_id,
      dob
    };
    const data = await pgsql.query(query, { type: pgsql.QueryTypes.UPDATE, replacements: replacements });
    return data;
  } catch (error) {
    logger.error({ UpdateUserDTO: error.message });
    throw new Error(error.message);
  }
};

const UserPasswordDTO = async (password, user_id) => {
  try {
    const query = DB.QUERY.CHANGE_USER_PASSWORD;
    const replacements = {
      password,
      user_id,
    };

    const [data] = await pgsql.query(query, { replacements, type: pgsql.QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UserPasswordDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateLastLoginDTO = async (user_id) => {
  try {
    const replacements = {
      user_id,
    };
    const query = DB.QUERY.UPDATE_LAST_LOGIN;
    const data = await pgsql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateLastLoginDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateUserProfileDTO = async (user_id, profile_image, image_type) => {
  try {
    const replacements = {
      user_id,
      profile_image,
      image_type,
    };
    const query = DB.QUERY.UPDATE_USER_IMAGE;
    const data = await pgsql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateUserProfileDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateUserAadharDTO = async (user_id, aadhar_number, aadhar_image, aadhar_img_type) => {
  try {
    const replacements = {
      user_id,
      aadhar_number,
      aadhar_image,
      aadhar_img_type,
    };
    const query = DB.QUERY.UPDATE_USER_AADHAR;
    const data = await pgsql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateUserAadharDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateUserDrivingLicenseDTO = async (
  user_id,
  driving_license_number,
  driving_license_image,
  driving_license_img_type,
) => {
  try {
    const replacements = {
      user_id,
      driving_license_number,
      driving_license_image,
      driving_license_img_type,
    };
    const query = DB.QUERY.UPDATE_USER_DRIVING_LICENSE;
    const data = await pgsql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ UpdateUserDrivingLicenseDTO: error.message });
    throw new Error(error.message);
  }
};

const UserDTO = {
  GetUserByEmailDTO,
  AddNewUserDTO,
  UpdateUserDTO,
  GetUserByIdDTO,
  UserPasswordDTO,
  UpdateLastLoginDTO,
  UpdateUserProfileDTO,
  UpdateUserAadharDTO,
  UpdateUserDrivingLicenseDTO,
};

export default UserDTO;
