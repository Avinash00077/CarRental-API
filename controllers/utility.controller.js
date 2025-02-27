'use strict';

import UtilityService from '../services/utility.service.js';
import logger from '../utility/logger.utility.js';
import AppConfig from '../config/app/app.config.js';
const {STATUS_MESSAGES, USER_MESSAGES} = AppConfig

const GetLocationsController = async (request, response) => {
  try {
    const data = await UtilityService.GetLocationsService(request);
    response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    logger.error({ GetUserBookingsController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const GetCarBrandsController = async (request, response) => {
  try {
    const data = await UtilityService.GetCarBrandsService(request);
    response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    logger.error({ GetUserBookingsController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const UtiityController = {
  GetCarBrandsController,
  GetLocationsController,
};

export default UtiityController;
