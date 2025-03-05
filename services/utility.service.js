'use strict';

import UtiityDTO from '../dto/utility.dto.js';
import logger from '../utility/logger.utility.js';

const GetLocationsService = async (request) => {
  try {
    let data = await UtiityDTO.GetLocationsDTO();
    const adminType = request.user_type;
    if (adminType !== 'super_user' && adminType) {
      const adminLocation = request.location;
      console.log(adminLocation);
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

const GetCarBrandsService = async (request) => {
  try {
    const data = await UtiityDTO.GetCarBrandsDTO();
    return data;
  } catch (error) {
    logger.error({ GetCarBrandsService: error.message });
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
    const {rating, comments } = request.body;
    const data = await UtiityDTO.PostFeedbackDTO(userId, rating, comments);
    return data;
  } catch (error) {
    logger.error({ PostFeedbacksService: error.message });
    throw new Error(error.message);
  }
};

const UtilityService = {
  GetCarBrandsService,
  GetLocationsService,
  GetFeedbacksService,
  PostFeedbacksService,
};

export default UtilityService;
