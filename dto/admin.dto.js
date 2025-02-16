'use strict';

import { QueryTypes } from 'sequelize';
import DB from '../config/app/query.config.js';
import mysql from '../config/database/database.config.js';
import logger from '../utility/logger.utility.js';

const GetAdminByEmailDTO = async (email, number) => {
  try {
    const query = DB.QUERY.GET_ADMIN_BY_EMAIL;
    const replacements = { email: email ? email : null, phone_number: number ? number : null };
    const data = await mysql.query(query, { type: QueryTypes.SELECT, replacements: replacements });
    return data;
  } catch (error) {
    logger.error({ GetAdminByEmailDTO: error.message });
    throw new Error(error.message);
  }
};

const GetAdminByIdDTO = async (user_id) => {
  try {
    const query = DB.QUERY.GET_ADMINBY_ID;
    const replacements = { user_id };
    const data = await pgsql.query(query, { type: QueryTypes.SELECT, replacements: replacements });
    return data;
  } catch (error) {
    logger.error({ GetAdminByIdDTO: error.message });
    throw new Error(error.message);
  }
};

const AddNewAdminDTO = async (name, email, password, phone_number, created_by) => {
  try {
    const query = DB.QUERY.ADD_NEW_ADMIN;
    const replacements = {
      name: name,
      email: email,
      password: password,
      phone_number: phone_number,
      created_by: created_by,
    };
    const data = await mysql.query(query, { type: QueryTypes.INSERT, replacements: replacements });
    return data;
  } catch (error) {
    logger.error({ AddNewAdminDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateAdminDTO = async (name, email, user_id) => {
  try {
    const query = DB.QUERY.UPDATE_ADMIN;
    const replacements = {
      name,
      email,
      user_id,
    };
    const data = await mysql.query(query, { type: QueryTypes.UPDATE, replacements: replacements });
    return data;
  } catch (error) {
    logger.error({ UpdateAdminDTO: error.message });
    throw new Error(error.message);
  }
};

const AdminPasswordDTO = async (password, user_id) => {
  try {
    const query = DB.QUERY.CHANGE_ADMIN_PASSWORD;
    const replacements = {
      password,
      user_id,
    };

    const [data] = await mysql.query(query, { replacements, type: QueryTypes.UPDATE });
    return data;
  } catch (error) {
    logger.error({ AdminPasswordDTO: error.message });
    throw new Error(error.message);
  }
};

const AdminDTO = { GetAdminByEmailDTO, AddNewAdminDTO, UpdateAdminDTO, GetAdminByIdDTO, AdminPasswordDTO };

export default AdminDTO;
