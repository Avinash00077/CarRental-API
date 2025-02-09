'use strict';

import UserDTO from '../dto/user.dto.js';
import JWT from '../middlewares/jwt.middleware.js';
import customUtility from '../utility/custom.utility.js';
import bcrypt from 'bcrypt';
import logger from '../utility/logger.utility.js';
import OtpDTO from '../dto/otp.dto.js';
import AppConfig from '../config/app/app.config.js';
import sendEmail from '../utility/email.utility.js';
import emailTemplates from '../config/app/email.template.js';

const { OTP_CODES } = AppConfig;
const { customExceptionMessage, generateOtp } = customUtility;
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
    const userData = {
      userId: data[0].user_id,
      driving_license_verified: data[0].driving_license_verified,
      aadhar_verified: data[0].aadhar_verified,
    };
    const token = JWT.GenerateToken(userData);
    const userDetails = {
      user_id: data[0].user_id,
      first_name: data[0].first_name,
      last_name: data[0].last_name,
      email: data[0].email,
      phone_number: data[0].phone_number,
      last_login: data[0].last_login,
      driving_license_verified: data[0].driving_license_verified,
      aadhar_verified: data[0].aadhar_verified,
    };
    await UserDTO.UpdateLastLoginDTO(userDetails.user_id);
    return { token, userDetails };
  } catch (error) {
    logger.error({ GetAuthService: error.message });
    throw new Error(error.message);
  }
};

const AddNewUserService = async (request) => {
  try {
    const { first_name, last_name, gender, email, password, phone_number, dob } = request.body;

    const GetUserByEmail = await UserDTO.GetUserByEmailDTO(email);
    if (GetUserByEmail.length > 0) {
      return customExceptionMessage(400, 'User already exist with this email');
    }
    const GetUserByNumber = await UserDTO.GetUserByEmailDTO(null, phone_number);
    if (GetUserByNumber.length > 0) {
      return customExceptionMessage(400, 'User already exist with this mobile number');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await UserDTO.AddNewUserDTO(first_name, last_name, email, gender, hashedPassword, phone_number, dob);
    request.headers.email = email;
    request.headers.password = password;
    const user_name = `${first_name + ' ' + last_name}`;
    const emailTemplate = emailTemplates.userRegestartionTemplate(user_name);
    const subject = emailTemplate.subject;
    const body = emailTemplate.body;
    await sendEmail(email, subject, body);
    const loginData = await GetAuthService(request);
    return loginData;
  } catch (error) {
    logger.error({ AddNewUserService: error.message });
    throw new Error(error.message);
  }
};

const GetUserByIdService = async (request) => {
  try {
    const { user_id } = request.headers;
    const userId = request.userId ? request.userId : user_id;
    const data = await UserDTO.GetUserByIdDTO(userId);
    return data;
  } catch (error) {
    logger.error({ GetUserByIdService: error.message });
    throw new Error(error.message);
  }
};

const UpdateUserService = async (request) => {
  try {
    const { first_name, last_name, email, gender, address, dob } = request.body;
    const userId = request.userId;
    const user = await UserDTO.GetUserByIdDTO(userId);
    if (user.length === 0) {
      return customExceptionMessage(400, 'User not found');
    }
    const GetUserByEmail = await UserDTO.GetUserByEmailDTO(email);
    if (GetUserByEmail.length > 0 && GetUserByEmail[0].user_id != userId) {
      return customExceptionMessage(400, 'User already exist with this email');
    }
    const data = await UserDTO.UpdateUserDTO(first_name, last_name, email, gender, address, userId, dob);
    return data;
  } catch (error) {
    logger.error({ UpdateUserService: error.message });
    throw new Error(error.message);
  }
};

const GenerateOtpForUserPassword = async (request) => {
  try {
    const { email } = request.headers;
    const userDetails = await UserDTO.GetUserByEmailDTO(email);
    if (userDetails.length === 0) {
      return customExceptionMessage(404, 'No user found with email');
    }
    const user_id = userDetails[0].user_id;
    const otp = generateOtp();
    await OtpDTO.InserOtpDTO(user_id, otp, OTP_CODES.RESET_PASSWORD);
    const user_name = `${userDetails[0].first_name + ' ' + userDetails[0].last_name}`;
    const emailTemplate = emailTemplates.passwordResetTemplate(user_name, otp);
    const subject = emailTemplate.subject;
    const body = emailTemplate.body;
    await sendEmail(email, subject, body);
    return true;
  } catch (error) {
    logger.error({ GenerateOtpForUserPassword: error.message });
    throw new Error(error.message);
  }
};

const UpdateUserPasswordService = async (request) => {
  try {
    const { email, password, otp } = request.body;
    const userDetails = await UserDTO.GetUserByEmailDTO(email);
    if (userDetails.length === 0) {
      return customExceptionMessage(404, 'No user found with email');
    }
    const user_id = userDetails[0].user_id;
    const [otpDetails] = await OtpDTO.GetOtpDTO(user_id, OTP_CODES.RESET_PASSWORD);
    if (otpDetails.is_verified) {
      return customExceptionMessage(400, 'Otp already verified');
    }
    if (otpDetails.is_expired) {
      return customExceptionMessage(401, 'otp expired please generate new otp');
    }
    if (otpDetails.otp_code != otp) {
      return customExceptionMessage(401, 'Invalid otp');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const data = await UserDTO.UserPasswordDTO(hashedPassword, user_id);
    let stringOtp = otp.toString();
    await OtpDTO.UpdateOtpDTO(user_id, stringOtp, OTP_CODES.RESET_PASSWORD);
    return data;
  } catch (error) {
    logger.error({ UpdateUserPasswordService: error.message });
    throw new Error(error.message);
  }
};

const userImageUploadService = async (request) => {
  try {
    const { image_type, aadhar_number, driving_license_number } = request.body;
    const user_id = request.userId;
    let data;
    if (image_type === 'profile') {
      const image = request.files.profile_image[0].buffer;
      const fileName = request.files.profile_image[0].originalname.split('.')?.pop();
      data = await UserDTO.UpdateUserProfileDTO(user_id, image, fileName);
    } else if (image_type === 'aadhar') {
      const image = request.files.aadhar_image[0].buffer;
      const fileName = request.files.aadhar_image[0].originalname.split('.')?.pop();
      data = await UserDTO.UpdateUserAadharDTO(user_id, aadhar_number, image, fileName);
    } else if (image_type === 'driving_license') {
      const image = request.files.driving_license_image[0].buffer;
      const fileName = request.files.driving_license_image[0].originalname.split('.')?.pop();
      data = await UserDTO.UpdateUserDrivingLicenseDTO(user_id, driving_license_number, image, fileName);
    } else {
      return customExceptionMessage(400, 'Invalid Image Type');
    }
    return data;
  } catch (error) {
    logger.error({ userImageUploadService: error.message });
    throw new Error(error.message);
  }
};

const UserService = {
  GetAuthService,
  AddNewUserService,
  GetUserByIdService,
  UpdateUserService,
  UpdateUserPasswordService,
  GenerateOtpForUserPassword,
  userImageUploadService,
};

export default UserService;
