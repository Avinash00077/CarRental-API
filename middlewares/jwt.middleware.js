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
      return response.status(401).json({ message: 'Not Authorized' });
    }
    token = request.get('Authorization').split(' ')[1];
    const decodedToken = jwt.verify(token, AppConfig.JWTSECRETKEY);
    request.adminId = decodedToken.adminId ? decodedToken.adminId : null;
    const userId = decodedToken.userId ? decodedToken.userId : null;
    const verified = decodedToken.verified ? decodedToken.verified : null;
    request.userId = userId;
    request.verified = verified;
    next();
  } catch (error) {
    logger.error({ VerifyToken: error.message });
    return response.status(401).json({ message: 'InValid Token', technicalError: error.message });
  }
};

const JWT = { GenerateToken, VerifyToken };
export default JWT;
