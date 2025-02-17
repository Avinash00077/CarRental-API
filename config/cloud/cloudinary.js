'use-strict';

import { v2 as cloudinary } from 'cloudinary';
import properties from '../index.config.js';

cloudinary.config({
  cloud_name: properties.get('cloud.cloud_name') || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: properties.get('cloud.api_key') || process.env.CLOUDINARY_API_KEY,
  api_secret: properties.get('cloud.api_secret') || process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
