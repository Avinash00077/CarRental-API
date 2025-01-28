'use strict';

import UserDTO from '../dto/user.dto.js';
import JWT from '../middlewares/jwt.middleware.js';
import customUtility from '../utility/custom.utility.js';
import bcrypt from 'bcrypt';
import logger from '../utility/logger.utility.js';

const { customExceptionMessage } = customUtility;
const GetAuthService = async (request) => {
  try {
    const { email, password } = request.headers;
    const data = await UserDTO.GetUserByEmailDTO(email);
    if (data.length === 0) {
      return customExceptionMessage(401, 'User does not exist');
    }
    const comparePasssword = await bcrypt.compare(password, data[0].password);
    if (!comparePasssword) {
      return customExceptionMessage(401, 'Invalid password please check the password');
    }
    const userData = { userId: data[0].user_id };
    const token = JWT.GenerateToken(userData);
    const userDetails = {
      user_id: data[0].user_id,
      name: data[0].name,
      email: data[0].email,
      phone_number: data[0].phone_number,
    };
    return {token,userDetails};
  } catch (error) {
    logger.error({ GetAuthService: error.message });
    throw new Error(error.message);
  }
};
const AddNewUserService = async (request) => {
  try {
    const { name, email, password, phone_number } = request.body;

    const GetUserByEmail = await UserDTO.GetUserByEmailDTO(email);
    if (GetUserByEmail.length > 0) {
      return customExceptionMessage(400, 'User already exist with this email');
    }
    const GetUserByNumber = await UserDTO.GetUserByEmailDTO(null, phone_number);
    if (GetUserByNumber.length > 0) {
      return customExceptionMessage(400, 'User already exist with this mobile number');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const data = await UserDTO.AddNewUserDTO(name, email, hashedPassword, phone_number, 'guest');
    return data;
  } catch (error) {
    logger.error({ AddNewUserService: error.message });
    throw new Error(error.message);
  }
};

const GetUserByIdService = async (request) => {
  try {
    const {user_id} = request.headers;
    const userId = user_id? user_id: request.userId
    const data = await UserDTO.GetUserByIdDTO(userId);
    return data;
  } catch (error) {
    logger.error({ GetUserByIdService: error.message });
    throw new Error(error.message); 
  }
}

const UpdateUserService = async (request) => {
  try {
    const { user_id, name, email } = request.body;

    const user = await UserDTO.GetUserByIdDTO(user_id);
    if (user.length === 0) {
      return customExceptionMessage(400, 'User not found');
    }
    const GetUserByEmail = await UserDTO.GetUserByEmailDTO(email);
    if (GetUserByEmail.length > 0 && GetUserByEmail[0].user_id != user_id) {
      return customExceptionMessage(400, 'User already exist with this email');
    }
    const data = await UserDTO.UpdateUserDTO(name, email, user_id);
    return data;
  } catch (error) {
    logger.error({ UpdateUserService: error.message });
    throw new Error(error.message);
  }
};

const UpdateUserPasswordService = async (request) => {
  try {
    const { user_id, password } = request.body;

    const user = await UserDTO.GetUserByIdDTO(user_id);
    if (user.length === 0) {
      return customExceptionMessage(400, 'User not found');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const data = await UserDTO.UserPasswordDTO(hashedPassword, user_id);
    return data;
  } catch (error) {
    logger.error({ UpdateUserPasswordService: error.message });
    throw new Error(error.message);
  }
};



const UserService = { GetAuthService, AddNewUserService, GetUserByIdService, UpdateUserService, UpdateUserPasswordService };

export default UserService;
