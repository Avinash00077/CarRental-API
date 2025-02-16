'use-strict';
import UserService from '../services/user.service.js';
import logger from '../utility/logger.utility.js';
import AppConfig from '../config/app/app.config.js';
const { STATUS_MESSAGES, USER_MESSAGES } = AppConfig;

const GetAuthController = async (request, response) => {
  try {
    const data = await UserService.GetAuthService(request);
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

const AddNewUserController = async (request, response) => {
  try {
    const data = await UserService.AddNewUserService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: USER_MESSAGES.USER_REGISTERED, data: data });
    }
  } catch (error) {
    logger.error({ AddNewUserController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const UpdateUserController = async (request, response) => {
  try {
    const data = await UserService.UpdateUserService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: USER_MESSAGES.USER_UPDATED });
    }
  } catch (error) {
    logger.error({ UpdateUserController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const UserImageUploadController = async (request, response) => {
  try {
    const data = await UserService.userImageUploadService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      const { image_type } = request.body;
      return response.status(200).json({ message: `${image_type} Image Updated Successfully` });
    }
  } catch (error) {
    logger.error({ UserImageUploadController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const GetUserByIdController = async (request, response) => {
  try {
    const data = await UserService.GetUserByIdService(request);
    return response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    logger.error({ GetUserByIdController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const GetUserNameAvailabilityController = async (request, response) => {
  try {
    const data = await UserService.GetUserNameAvailabilityService(request);
    return response.status(200).json({ message: STATUS_MESSAGES[200], userNameAvilable: data });
  } catch (error) {
    logger.error({ GetUserNameAvailabilityController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const GenerateOtpForUserPasswordController = async (request, response) => {
  try {
    const data = await UserService.GenerateOtpForUserPassword(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: `OTP sent Successfully to ${data}` });
    }
  } catch (error) {
    logger.error({ GenerateOtpForUserPasswordController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const UpdateUserPasswordController = async (request, response) => {
  try {
    const data = await UserService.UpdateUserPasswordService(request);
    if (data?.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: USER_MESSAGES.PASSWORD_UPDATE });
    }
  } catch (error) {
    logger.error({ UpdateUserPasswordController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const GenerateOtpForUserNameController = async (request, response) => {
  try {
    const data = await UserService.GenerateOtpForUserNameService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: `OTP sent Successfully to ${data}` });
    }
  } catch (error) {
    logger.error({ GenerateOtpForUserNameController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const GetUserNameController = async (request, response) => {
  try {
    const data = await UserService.GetUserNameService(request);
    if (data?.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: `Your user name is ${data}` });
    }
  } catch (error) {
    logger.error({ GetUserNameController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const GetUsersForVerficationController = async (request, response) => {
  try {
    const data = await UserService.GetUsersForVerficationService(request);
    if (data?.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
    }
  } catch (error) {
    logger.error({ GetUsersForVerficationController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const UpdateUsersVerficationController = async (request, response) => {
  try {
    const data = await UserService.UpdateUserVerficationService(request);
    if (data?.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: STATUS_MESSAGES[200]});
    }
  } catch (error) {
    logger.error({ UpdateUsersVerficationController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const UserController = {
  GetAuthController,
  AddNewUserController,
  GetUserByIdController,
  GenerateOtpForUserPasswordController,
  UpdateUserPasswordController,
  UpdateUserController,
  UserImageUploadController,
  GetUserNameAvailabilityController,
  GenerateOtpForUserNameController,
  GetUserNameController,
  GetUsersForVerficationController,
  UpdateUsersVerficationController,
};
export default UserController;
