'use strict';
import jwt from 'jsonwebtoken';
import AppConfig from '../config/app/app.config.js';
import logger from '../utility/logger.utility.js';
const GenerateToken = (data) => {
  try {
    const token = jwt.sign(data, AppConfig.ADMINJWTSECRETKEY, { expiresIn: AppConfig.ADMINJWTEXPIRYTIME });
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
    const decodedToken = jwt.verify(token, AppConfig.ADMINJWTSECRETKEY);
    //admin
    request.adminId = decodedToken.adminId ? decodedToken.adminId : null;
    request.location = decodedToken.location ? decodedToken.location : null;
    request.user_type = decodedToken.user_type ? decodedToken.user_type : null;
    next();
  } catch (error) {
    logger.error({ VerifyToken: error.message });
    return response.status(401).json({ message: 'InValid Token', technicalError: error.message });
  }
};

const ADMINJWT = { GenerateToken, VerifyToken };
export default ADMINJWT;
