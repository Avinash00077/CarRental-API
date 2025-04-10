'use strict';

import UtilityService from '../services/utility.service.js';
import logger from '../utility/logger.utility.js';
import AppConfig from '../config/app/app.config.js';
const { STATUS_MESSAGES, USER_MESSAGES } = AppConfig;

const GetLocationsController = async (request, response) => {
  try {
    const data = await UtilityService.GetLocationsService(request);
    response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    logger.error({ GetUserBookingsController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const PostLocationController = async (request, response) => {
  try {
    const data = await UtilityService.PostLocationsService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: STATUS_MESSAGES[201] });
    }
  } catch (error) {
    logger.error({ PostLocationController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const UpdateLocationController = async (request, response) => {
  try {
    const data = await UtilityService.UpdateLocationsService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: STATUS_MESSAGES[201] });
    }
  } catch (error) {
    logger.error({ UpdateLocationController: error.message });
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

const PostCarBrandController = async (request, response) => {
  try {
    const data = await UtilityService.PostCarBrandService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: STATUS_MESSAGES[201] });
    }
  } catch (error) {
    logger.error({ PostCarBrandController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const UpdateCarBrandController = async (request, response) => {
  try {
    const data = await UtilityService.UpdateCarBrandService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: STATUS_MESSAGES[201] });
    }
  } catch (error) {
    logger.error({ UpdateCarBrandController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const GetUserFeedbacksController = async (request, response) => {
  try {
    const data = await UtilityService.GetUserFeedbacksService(request);
    response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    logger.error({ GetUserFeedbacksController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const GetFeedbacksController = async (request, response) => {
  try {
    const data = await UtilityService.GetFeedbacksService(request);
    response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    logger.error({ GetFeedbacksController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const PostFeedbacksController = async (request, response) => {
  try {
    const data = await UtilityService.PostFeedbacksService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: STATUS_MESSAGES[201] });
    }
  } catch (error) {
    logger.error({ PostFeedbacksController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const UpdateFeedbacksController = async (request, response) => {
  try {
    const data = await UtilityService.UpdateFeedbacksService(request);
    if (data.errorCode) {
      return response.status(data.errorCode).json({ message: data.errorMessage });
    } else {
      return response.status(200).json({ message: STATUS_MESSAGES[201] });
    }
  } catch (error) {
    logger.error({ UpdateFeedbacksController: error.message });
    response.status(500).json({ message: STATUS_MESSAGES[500] });
  }
};

const UtiityController = {
  GetCarBrandsController,
  GetLocationsController,
  GetFeedbacksController,
  PostFeedbacksController,
  GetUserFeedbacksController,
  UpdateFeedbacksController,
  PostLocationController,
  UpdateLocationController,
  PostCarBrandController,
  UpdateCarBrandController,
};

export default UtiityController;
