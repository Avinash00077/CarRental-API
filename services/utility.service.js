'use strict';

import UtiityDTO from '../dto/utility.dto.js';
import logger from '../utility/logger.utility.js';

const GetLocationsService = async (request) => {
  try {
    let data = await UtiityDTO.GetLocationsDTO();
    console.log(data)
    const adminType = request.user_type;
    if (adminType !== 'super_user') {
      const adminLocation = request.location;
      console.log(adminLocation)
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

const UtilityService = {
  GetCarBrandsService,
  GetLocationsService,
};

export default UtilityService;
