'use-strict';
import UserService from '../services/user.service.js';
import logger from '../utility/logger.utility.js';

const GetAuthController = async (request, response) => {
  try {
    const data = await UserService.GetAuthService(request);
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

const AddNewUserController = async (request, response) => {
  try {
    const data = await UserService.AddNewUserService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'User Added Successfully', data: data });
    }
  } catch (error) {
    logger.error({ AddNewUserController: error.message });
    response.status(500).json({ message: 'Internal server Error' });
  }
};

const UpdateUserController = async (request, response) => {
  try {
    const data = await UserService.UpdateUserService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'User Updated Successfully' });
    }
  } catch (error) {
    logger.error({ UpdateUserController: error.message });
    response.status(500).json({ message: 'Internal server Error' });
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
    response.status(500).json({ message: 'Internal server Error' });
  }
};

const GetUserByIdController = async (request, response) => {
  try {
    const data = await UserService.GetUserByIdService(request);
    return response.status(200).json({ message: 'Okay Request successfull', data: data });
  } catch (error) {
    logger.error({ GetUserByIdController: error.message });
    response.status(500).json({ message: 'Internal server Error' });
  }
};

const GetUserNameAvailabilityController = async (request, response) => {
  try {
    const data = await UserService.GetUserNameAvailabilityService(request);
    return response.status(200).json({ userNameAvilable: data });
  } catch (error) {
    logger.error({ GetUserNameAvailabilityController: error.message });
    response.status(500).json({ message: 'Internal server Error' });
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
    response.status(500).json({ message: 'Internal server Error' });
  }
};

const UpdateUserPasswordController = async (request, response) => {
  try {
    const data = await UserService.UpdateUserPasswordService(request);
    if (data?.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: 'Password Updated Successfully' });
    }
  } catch (error) {
    logger.error({ UpdateUserPasswordController: error.message });
    response.status(500).json({ message: 'Internal server Error' });
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
    response.status(500).json({ message: 'Internal server Error' });
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
    response.status(500).json({ message: 'Internal server Error' });
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
};
export default UserController;
