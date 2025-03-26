'use strict';

import UtiityDTO from '../dto/utility.dto.js';
import logger from '../utility/logger.utility.js';
import customUtility from '../utility/custom.utility.js';

const { customExceptionMessage } = customUtility;

const GetLocationsService = async (request) => {
  try {
    let data = await UtiityDTO.GetLocationsDTO();
    const adminType = request.user_type;
    if (adminType !== 'super_user' && adminType) {
      const adminLocation = request.location;
      data = data.filter((i) => {
        return i.location === adminLocation;
      });
    }
    return data;
  } catch (error) {
    logger.error({ GetLocationsService: error.message });
    throw new Error(error.message);
  }
};

const PostLocationsService = async (request) => {
  try {
    const { location, address, latitude, longitude } = request.body;
    let data = await UtiityDTO.GetLocationsDTO();
    const isLocationExists = data.filter((i) => {
      return i.location === location;
    });
    if (isLocationExists.length > 0) {
      return customExceptionMessage(409, 'Location already exists');
    }
    const locationData = await UtiityDTO.PostLocationsDTO(location, address, 'Y', latitude, longitude);
    return locationData;
  } catch (error) {
    logger.error({ GetLocationsService: error.message });
    throw new Error(error.message);
  }
};

const UpdateLocationsService = async (request) => {
  try {
    const { location_id, location, address, activeInd, latitude, longitude } = request.body;
    let data = await UtiityDTO.GetLocationsDTO();
    const isLocationExists = data.filter((i) => {
      return i.location === location;
    });
    if (isLocationExists.length === 0) {
      return customExceptionMessage(404, 'Location not found');
    }
    const locationData = await UtiityDTO.UpdateLocationsDTO(location_id, location, address, activeInd, latitude, longitude);
    return locationData;
  } catch (error) {
    logger.error({ UpdateLocationsService: error.message });
    throw new Error(error.message);
  }
};

const GetCarBrandsService = async (request) => {
  try {
    const data = await UtiityDTO.GetCarBrandsDTO();
    return data;
  } catch (error) {
    logger.error({ GetCarBrandsService: error.message });
    throw new Error(error.message);
  }
};

const PostCarBrandService = async (request) => {
  try {
    const { car_brand, car_name, car_type, seater, car_modal_year } = request.body;
    let data = await UtiityDTO.GetCarBrandsDTO();
    const isLocationExists = data.filter((i) => {
      return (
        i.car_brand === car_brand &&
        i.car_name === car_name &&
        i.car_type === car_type &&
        i.seater === seater &&
        i.car_modal_year === car_modal_year
      );
    });
    if (isLocationExists.length > 0) {
      return customExceptionMessage(409, 'car brand already exists');
    }
    const rData = await UtiityDTO.PostCarBrandDTO(car_brand, car_name, car_type, seater, car_modal_year);
    return rData;
  } catch (error) {
    logger.error({ PostCarBrandService: error.message });
    throw new Error(error.message);
  }
};

const UpdateCarBrandService = async (request) => {
  try {
    const { car_id, car_brand, car_name, car_type, seater, car_modal_year, activeInd } = request.body;
    // let data = await UtiityDTO.GetCarBrandsDTO();
    // const isLocationExists = data.filter((i) => {
    //   return i.car_brand === car_brand && i.car_name === car_name && i.car_type === car_type && i.seater === seater && i.car_modal_year === car_modal_year;
    // });
    // if (isLocationExists.length > 0) {
    //   return customExceptionMessage(409, 'car brand already exists');
    // }
    const rData = await UtiityDTO.UpdateCarBrandDTO(car_id, car_brand, car_name, car_type, seater, car_modal_year, activeInd);
    return rData;
  } catch (error) {
    logger.error({ UpdateCarBrandService: error.message });
    throw new Error(error.message);
  }
};

const GetUserFeedbacksService = async (request) => {
  try {
    const userId = request.userId;
    const data = await UtiityDTO.GetFeedbacksDTO();
    const feedback = data.filter((i) => i.user_id === userId);
    return feedback;
  } catch (error) {
    logger.error({ GetUserFeedbacksService: error.message });
    throw new Error(error.message);
  }
};

const GetFeedbacksService = async (request) => {
  try {
    const data = await UtiityDTO.GetFeedbacksDTO();
    return data;
  } catch (error) {
    logger.error({ GetFeedbacksService: error.message });
    throw new Error(error.message);
  }
};

const PostFeedbacksService = async (request) => {
  try {
    const userId = request.userId;
    const feedbacks = await UtiityDTO.GetFeedbacksDTO();
    const isFeedbackExists = feedbacks.filter((i) => i.user_id === userId);
    if (isFeedbackExists.length > 0) {
      return customExceptionMessage(422, 'Feedback Already Exists');
    }
    const { rating, comments } = request.body;
    const data = await UtiityDTO.PostFeedbackDTO(userId, rating, comments);
    return data;
  } catch (error) {
    logger.error({ PostFeedbacksService: error.message });
    throw new Error(error.message);
  }
};

const UpdateFeedbacksService = async (request) => {
  try {
    const userId = request.userId;
    const feedbacks = await UtiityDTO.GetFeedbacksDTO();
    const isFeedbackExists = feedbacks.filter((i) => i.user_id === userId);
    if (isFeedbackExists.length === 0) {
      return customExceptionMessage(404, 'No Feedback is avilable to update');
    }
    const { rating, comments } = request.body;
    const data = await UtiityDTO.UpdateFeedbackDTO(userId, rating, comments);
    return data;
  } catch (error) {
    logger.error({ UpdateFeedbacksService: error.message });
    throw new Error(error.message);
  }
};

const UtilityService = {
  GetCarBrandsService,
  GetLocationsService,
  GetFeedbacksService,
  PostFeedbacksService,
  GetUserFeedbacksService,
  UpdateFeedbacksService,
  PostLocationsService,
  UpdateLocationsService,
  PostCarBrandService,
  UpdateCarBrandService,
};

export default UtilityService;
