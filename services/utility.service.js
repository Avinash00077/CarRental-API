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

const GetCarBrandsService = async (request) => {
  try {
    const data = await UtiityDTO.GetCarBrandsDTO();
    return data;
  } catch (error) {
    logger.error({ GetCarBrandsService: error.message });
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
  UpdateFeedbacksService
};

export default UtilityService;
