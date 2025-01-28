'use-strict';
import AdminService from '../services/admin.service.js';
import logger from '../utility/logger.utility.js';

const GetAuthController = async (request, response) => {
  try {
    const data = await AdminService.GetAuthService(request);
    if (data.errorCode === 401) {
      return response.status(401).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'Login Success', data: data });
    }
  } catch (error) {
    logger.error({ GetAuthController: error.message });
    response.status(500).json({ message: 'internalServerError' });
  }
};

const AddNewAdminController = async (request, response) => {
  try {
    const data = await AdminService.AddNewAdminService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'Admin Added Successfully' });
    }
  } catch (error) {
    logger.error({ AddNewAdminController: error.message });
    response.status(500).json({ message: 'Internal server Error' });
  }
};

const GetAdminByIdController = async (request, response) => {
  try {
    const data = await AdminService.GetAdminByIdService(request);
    return response.status(200).json({ message: 'Okay Request successfull', data: data });
  } catch (error) {
    logger.error({ GetAdminByIdController: error.message });
    response.status(500).json({ message: 'Internal server Error' });
  }
};

const AdminController = { GetAuthController, AddNewAdminController, GetAdminByIdController };
export default AdminController;
