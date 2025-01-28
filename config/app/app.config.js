'use strict'
import properties from '../index.config.js';

const AppConfig = {
  PORT: properties.get('app.port'),
  APPNAME: properties.get('app.appName'),
  JWTEXPIRYTIME:properties.get('app.jwtExpiryTime'),
  JWTSECRETKEY:properties.get('app.jwtSecretKey'),
  OPENAPIPATH:properties.get('app.openApiPath')
};

export default AppConfig;
