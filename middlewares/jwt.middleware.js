'use strict';
import jwt from 'jsonwebtoken';
import AppConfig from '../config/app/app.config.js';
import logger from '../utility/logger.utility.js';
const GenerateToken = (data) => {
  try {
    const token = jwt.sign(data, AppConfig.JWTSECRETKEY, { expiresIn: AppConfig.JWTEXPIRYTIME });
    return token;
  } catch (error) {
    logger.error({ GenerateToken: error.message });
    throw new Error(error.message);
  }
};

const VerifyToken = (request, response, next) => {
  try {
    let token = request.get('Authorization');
    if (!token) {
      return response.status(401).json({ message: AppConfig.STATUS_MESSAGES[401] });
    }
    token = request.get('Authorization').split(' ')[1];
    const decodedToken = jwt.verify(token, AppConfig.JWTSECRETKEY);
    //admin
    request.adminId = decodedToken.adminId ? decodedToken.adminId : null;
    //user
    const userId = decodedToken.userId ? decodedToken.userId : null;
    const aadhar_verified = decodedToken.aadhar_verified ? decodedToken.aadhar_verified : null;
    const driving_license_verified = decodedToken.driving_license_verified ? decodedToken.driving_license_verified : null;
    const driving_license_expiry = decodedToken.driving_license_expiry ? decodedToken.driving_license_expiry : null;
    request.userId = userId;
    request.aadhar_verified = aadhar_verified;
    request.driving_license_verified = driving_license_verified;
    request.driving_license_expiry = driving_license_expiry;
    next();
  } catch (error) {
    logger.error({ VerifyToken: error.message });
    return response.status(401).json({ message: 'InValid Token', technicalError: error.message });
  }
};

const JWT = { GenerateToken, VerifyToken };
export default JWT;
