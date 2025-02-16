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

const { OTP_CODES, STATUS_MESSAGES } = AppConfig;
const { customExceptionMessage, generateOtp, maskEmail } = customUtility;
const GetAuthService = async (request) => {
  try {
    const { user_name, password } = request.headers;
    const data = await UserDTO.GetUserByUserNameDTO(user_name);
    if (data.length === 0) {
      return customExceptionMessage(401, 'User does not exist');
    }
    const comparePasssword = await bcrypt.compare(password, data[0].password);
    if (!comparePasssword) {
      return customExceptionMessage(401, 'Invalid password please check the password');
    }
    const drivingLicenseExpiry = new Date(data[0].driving_license_expiry);
    const today = new Date();
    const driving_license_expiry = drivingLicenseExpiry <= today ? 'Y' : 'N';
    const userData = {
      userId: data[0].user_id,
      driving_license_verified: data[0].driving_license_verified,
      aadhar_verified: data[0].aadhar_verified,
      driving_license_expiry: driving_license_expiry,
    };

    const token = JWT.GenerateToken(userData);
    const userDetails = {
      user_name: data[0].user_name,
      user_id: data[0].user_id,
      first_name: data[0].first_name,
      last_name: data[0].last_name,
      email: data[0].email,
      phone_number: data[0].phone_number,
      last_login: data[0].last_login,
      driving_license_verified: data[0].driving_license_verified,
      aadhar_verified: data[0].aadhar_verified,
      driving_license_expiry: driving_license_expiry,
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
    const { user_name, first_name, last_name, gender, email, password, phone_number, dob } = request.body;
    const data = await UserDTO.GetUserByUserNameDTO(user_name);
    if (data.length > 0) {
      return customExceptionMessage(401, 'User already exist with this username');
    }
    const GetUserByEmail = await UserDTO.GetUserByEmailDTO(email);
    if (GetUserByEmail.length > 0) {
      return customExceptionMessage(400, 'User already exist with this email');
    }
    const GetUserByNumber = await UserDTO.GetUserByEmailDTO(null, phone_number);
    if (GetUserByNumber.length > 0) {
      return customExceptionMessage(400, 'User already exist with this mobile number');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await UserDTO.AddNewUserDTO(user_name, first_name, last_name, email, gender, hashedPassword, phone_number, dob);
    request.headers.user_name = user_name;
    request.headers.password = password;
    const name = `${first_name + ' ' + last_name}`;
    const emailTemplate = emailTemplates.userRegestartionTemplate(name);
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

const GenerateOtpForUserNameService = async (request) => {
  try {
    const { email, dob } = request.headers;
    const userDetails = await UserDTO.GetUserNameDTO(email, dob);
    if (userDetails.length === 0) {
      return customExceptionMessage(404, 'No user found with email');
    }
    const user_id = userDetails[0].user_id;
    const user_email = userDetails[0].email;
    const otp = generateOtp();
    await OtpDTO.InserOtpDTO(user_id, otp, OTP_CODES.USER_NAME);
    const name = `${userDetails[0].first_name + ' ' + userDetails[0].last_name}`;
    const emailTemplate = emailTemplates.getUserNameTemplate(name, otp);
    const subject = emailTemplate.subject;
    const body = emailTemplate.body;
    await sendEmail(user_email, subject, body);
    return maskEmail(user_email);
  } catch (error) {
    logger.error({ GenerateOtpForUserName: error.message });
    throw new Error(error.message);
  }
};

const GetUserNameService = async (request) => {
  try {
    const { email, dob, otp } = request.headers;
    const userDetails = await UserDTO.GetUserNameDTO(email, dob);
    if (userDetails.length === 0) {
      return customExceptionMessage(404, 'No user found with email and dob');
    }
    const user_id = userDetails[0].user_id;
    const [otpDetails] = await OtpDTO.GetOtpDTO(user_id, OTP_CODES.USER_NAME);
    if (otpDetails.is_verified) {
      return customExceptionMessage(400, 'Otp already verified');
    }
    if (otpDetails.is_expired) {
      return customExceptionMessage(401, 'otp expired please generate new otp');
    }
    if (otpDetails.otp_code != otp) {
      return customExceptionMessage(401, 'Invalid otp');
    }
    return userDetails[0].user_name;
  } catch (error) {
    logger.error({ GetUserNameService: error.message });
    throw new Error(error.message);
  }
};

const GetUserNameAvailabilityService = async (request) => {
  try {
    const { user_name } = request.headers;
    const data = await UserDTO.GetUserByUserNameDTO(user_name);
    return data.length > 0 ? false : true;
  } catch (error) {
    logger.error({ GetUserNameAvailabilityService: error.message });
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
    console.log(GetUserByEmail[0].user_id != userId, GetUserByEmail[0].user_id, userId);
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
    const { user_name } = request.headers;
    const userDetails = await UserDTO.GetUserByUserNameDTO(user_name);
    if (userDetails.length === 0) {
      return customExceptionMessage(404, 'No user found with email');
    }
    const user_id = userDetails[0].user_id;
    const email = userDetails[0].email;
    const otp = generateOtp();
    await OtpDTO.InserOtpDTO(user_id, otp, OTP_CODES.RESET_PASSWORD);
    const name = `${userDetails[0].first_name + ' ' + userDetails[0].last_name}`;
    const emailTemplate = emailTemplates.passwordResetTemplate(name, otp);
    const subject = emailTemplate.subject;
    const body = emailTemplate.body;
    await sendEmail(email, subject, body);
    return maskEmail(email);
  } catch (error) {
    logger.error({ GenerateOtpForUserPassword: error.message });
    throw new Error(error.message);
  }
};

const UpdateUserPasswordService = async (request) => {
  try {
    const { user_name, password, otp } = request.body;
    const userDetails = await UserDTO.GetUserByUserNameDTO(user_name);
    if (userDetails.length === 0) {
      return customExceptionMessage(404, 'No user found with user_name');
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
    const { image_type, aadhar_number, driving_license_number, driving_license_expiry } = request.body;
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
      data = await UserDTO.UpdateUserDrivingLicenseDTO(user_id, driving_license_number, image, fileName, driving_license_expiry);
    } else if (image_type === 'cover') {
      const image = request.files.cover_image[0].buffer;
      const fileName = request.files.cover_image[0].originalname.split('.')?.pop();
      data = await UserDTO.UpdateUserCoverImageDTO(user_id, image, fileName);
    } else {
      return customExceptionMessage(400, 'Invalid Image Type');
    }
    return data;
  } catch (error) {
    logger.error({ userImageUploadService: error.message });
    throw new Error(error.message);
  }
};

const GetUsersForVerficationService = async (request) => {
  try {
    const adminId = request.adminId;
    if (!adminId) {
      return customExceptionMessage(403, STATUS_MESSAGES[403]);
    }
    const data = await UserDTO.GetUsersForVerficationDTO();
    return data;
  } catch (error) {
    logger.error({ GetUsersForVerficationService: error.message });
    throw new Error(error.message);
  }
};

const UpdateUserVerficationService = async (request) => {
  try {
    const adminId = request.adminId;
    if (!adminId) {
      return customExceptionMessage(403, STATUS_MESSAGES[403]);
    }
    let { user_id, driving_license_verified, aadhar_verified } = request.body;
    const userData = await UserDTO.GetUsersForVerficationDTO();
    const user = userData.filter((u) => u.user_id === user_id);
    if (!user) {
      return customExceptionMessage(404, STATUS_MESSAGES[400]);
    }
    const driving_license_verified_email_flag = driving_license_verified ? true : false;
    const aadhar_verified_email_flag = aadhar_verified ? true : false;

    driving_license_verified = driving_license_verified ? driving_license_verified : user[0].driving_license_verified;

    aadhar_verified = aadhar_verified ? aadhar_verified : user[0].aadhar_verified;
    const data = await UserDTO.UpdateUserVerficationDTO(user_id, driving_license_verified, aadhar_verified);
    if (driving_license_verified_email_flag) {
      const approved = driving_license_verified === 'Y' ? true : false;
      const status = driving_license_verified === 'Y' ? 'approved' : 'rejected';
      const userName = `${user[0].first_name} ${user[0].last_name}`;
      const emailTemplate = emailTemplates.verficationTemplate(status, userName, approved, 'Driving Lisence');
      const subject = emailTemplate.subject;
      const body = emailTemplate.body;
      await sendEmail(user[0].email, subject, body);
    }
    if (aadhar_verified_email_flag) {
      const approved = aadhar_verified === 'Y' ? true : false;
      const status = aadhar_verified === 'Y' ? 'approved' : 'rejected';
      const userName = `${user[0].first_name} ${user[0].last_name}`;
      const emailTemplate = emailTemplates.verficationTemplate(status, userName, approved, 'Aadhar');
      const subject = emailTemplate.subject;
      const body = emailTemplate.body;
      await sendEmail(user[0].email, subject, body);
    }
    return data;
  } catch (error) {
    logger.error({ UpdateUserVerficationService: error.message });
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
  GetUserNameAvailabilityService,
  GenerateOtpForUserNameService,
  GetUserNameService,
  GetUsersForVerficationService,
  UpdateUserVerficationService,
};

export default UserService;
