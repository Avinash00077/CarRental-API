'use strict';
import PropertiesReader from 'properties-reader';

const filePropertyPath = './config/env/config.properties';

const properties = PropertiesReader(filePropertyPath);

export default properties;
