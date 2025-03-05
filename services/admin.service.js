'use strict';

import AdminDTO from '../dto/admin.dto.js';
import ADMINJWT from '../middlewares/jwt.admin.middleware.js';
import customUtility from '../utility/custom.utility.js';
import bcrypt from 'bcrypt';
import logger from '../utility/logger.utility.js';
import AppConfig from '../config/app/app.config.js';

const { STATUS_MESSAGES } = AppConfig;

const { customExceptionMessage } = customUtility;
const GetAuthService = async (request) => {
  try {
    const { email, password } = request.headers;
    const data = await AdminDTO.GetAdminByEmailDTO(email);
    if (data.length === 0) {
      return customExceptionMessage(401, 'Admin does not exist');
    }
    const comparePasssword = await bcrypt.compare(password, data[0].password);
    if (!comparePasssword) {
      return customExceptionMessage(401, 'Invalid password please check the password');
    }
    const userData = { adminId: data[0].admin_id, user_type: data[0].user_type, location: data[0].location };
    const token = ADMINJWT.GenerateToken(userData);
    const adminDetails = {
      admin_id: data[0].admin_id,
      name: data[0].name,
      email: data[0].email,
      phone_number: data[0].phone_number,
      user_type: data[0].user_type,
      location: data[0].location,
    };
    return { token, adminDetails };
  } catch (error) {
    logger.error({ GetAuthService: error.message });
    throw new Error(error.message);
  }
};

const GetAdminsService = async (request) => {
  try {
    const adminType = request.user_type;
    if (adminType !== 'super_user') {
      return customExceptionMessage(403, STATUS_MESSAGES[403]);
    }
    const data = await AdminDTO.GetAdminsDTO();
    return data;
  } catch (error) {
    logger.error({ GetAdminsService: error.message });
    throw new Error(error.message);
  }
};
const AddNewAdminService = async (request) => {
  try {
    const { name, email, password, phone_number, user_type, location } = request.body;

    const adminId = request.adminId;

    const adminData = await AdminDTO.GetAdminByIdDTO(adminId);

    if (!adminId || adminData.length === 0) {
      return customExceptionMessage(401, 'Please login with admin account to add admin');
    }
    const adminType = request.user_type;
    if (adminType !== 'super_user') {
      return customExceptionMessage(403, STATUS_MESSAGES[403]);
    }
    const GetAdminByEmail = await AdminDTO.GetAdminByEmailDTO(email);
    if (GetAdminByEmail.length > 0) {
      return customExceptionMessage(400, 'Admin already exist with this email');
    }
    const GetAdminByNumber = await AdminDTO.GetAdminByEmailDTO(null, phone_number);
    if (GetAdminByNumber.length > 0) {
      return customExceptionMessage(400, 'Admin already exist with this mobile number');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const data = await AdminDTO.AddNewAdminDTO(name, email, hashedPassword, phone_number, user_type, location);
    return data;
  } catch (error) {
    logger.error({ AddNewAdminService: error.message });
    throw new Error(error.message);
  }
};

const GetAdminByIdService = async (request) => {
  try {
    let { admin_id } = request.headers;
    let adminId = admin_id ? admin_id : request.adminId;
    const data = await AdminDTO.GetAdminByIdDTO(adminId);
    return data;
  } catch (error) {
    logger.error({ GetAdminByIdService: error.message });
    throw new Error(error.message);
  }
};

const UpdateAdminService = async (request) => {
  try {
    const { admin_id, name, email, phone_number, active, user_type, location } = request.body;
    const adminType = request.user_type;
    if (adminType !== 'super_user') {
      return customExceptionMessage(403, STATUS_MESSAGES[403]);
    }
    const user = await AdminDTO.GetAdminByIdDTO(admin_id);
    if (user.length === 0) {
      return customExceptionMessage(400, 'Admin not found');
    }
    const GetAdminByEmail = await AdminDTO.GetAdminByEmailDTO(email);
    if (GetAdminByEmail.length > 0 && GetAdminByEmail[0].admin_id != admin_id) {
      return customExceptionMessage(400, 'Admin already exist with this email');
    }
    const data = await AdminDTO.UpdateAdminDTO(name, email, admin_id, phone_number, active, user_type, location);
    return data;
  } catch (error) {
    logger.error({ UpdateAdminService: error.message });
    throw new Error(error.message);
  }
};

const UpdateAdminPasswordService = async (request) => {
  try {
    const { user_id, password } = request.body;

    const user = await AdminDTO.GetAdminByIdDTO(user_id);
    if (user.length === 0) {
      return customExceptionMessage(400, 'Admin not found');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const data = await AdminDTO.AdminPasswordDTO(hashedPassword, user_id);
    return data;
  } catch (error) {
    logger.error({ UpdateAdminPasswordService: error.message });
    throw new Error(error.message);
  }
};

const AdminService = {
  GetAuthService,
  GetAdminsService,
  AddNewAdminService,
  GetAdminByIdService,
  UpdateAdminService,
  UpdateAdminPasswordService,
};

export default AdminService;
