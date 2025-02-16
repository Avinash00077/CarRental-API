'use-strict';
import AdminService from '../services/admin.service.js';
import logger from '../utility/logger.utility.js';
import AppConfig from '../config/app/app.config.js';
const {STATUS_MESSAGES, USER_MESSAGES} = AppConfig

const GetAuthController = async (request, response) => {
  try {
    const data = await AdminService.GetAuthService(request);
    if (data.errorCode === 401) {
      return response.status(401).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: USER_MESSAGES.USER_LOGGED_IN, data: data });
    }
  } catch (error) {
    logger.error({ GetAuthController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const AddNewAdminController = async (request, response) => {
  try {
    const data = await AdminService.AddNewAdminService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: USER_MESSAGES.USER_REGISTERED });
    }
  } catch (error) {
    logger.error({ AddNewAdminController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500]  });
  }
};

const GetAdminByIdController = async (request, response) => {
  try {
    const data = await AdminService.GetAdminByIdService(request);
    return response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    logger.error({ GetAdminByIdController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500]  });
  }
};

const AdminController = { GetAuthController, AddNewAdminController, GetAdminByIdController };
export default AdminController;
