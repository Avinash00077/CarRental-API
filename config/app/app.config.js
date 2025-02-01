'use strict'
import properties from '../index.config.js';

const OTP_CODES = {
  RESET_PASSWORD : 1,
}

const AppConfig = {
  PORT: properties.get('app.port'),
  APPNAME: properties.get('app.appName'),
  JWTEXPIRYTIME:properties.get('app.jwtExpiryTime'),
  JWTSECRETKEY:properties.get('app.jwtSecretKey'),
  OPENAPIPATH:properties.get('app.openApiPath'),
  OTP_CODES: OTP_CODES,
};

export default AppConfig;
