'use strict';
/**
 * @module Ecma2015
 * @constant {AppConfig}
 */
import express from 'express';
import AppConfig from './config/app/app.config.js';
import cors from 'cors';
import helmet from 'helmet';
import pgsql from './config/database/database.config.js';
import Router from './routes/index.routes.js';
import logger from './utility/logger.utility.js';
import customUtility from './utility/custom.utility.js';

const app = express();

app.use(express.json());

app.use(helmet());

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.get('/health', async (req, res) => {
  let dbStatus;
  try {
    logger.info('Health check initiated for db');
    await pgsql.authenticate();
    dbStatus = 'healthy';
  } catch (error) {
    dbStatus = 'unhealthy';
    logger.error(` database connection faild with ${error.message}`);
  }
  const timestamp = customUtility.istTimestamp();
  const message = dbStatus === 'healthy' ? 'OK' : 'NOT OK';
  const healthCheck = {
    uptime: `${(process.uptime() / 60).toFixed(2)} minutes`,
    message,
    timestamp,
    dbStatus: dbStatus,
  };
  logger.info(`Health check status completed and overall status is ${message}`);
  if (message === 'OK') {
    return res.status(200).json({ status: healthCheck });
  } else {
    return res.status(503).json({ status: healthCheck });
  }
});

app.get('/health/monitor', async (req, res) => {
  logger.info('Health check initiated by monitor');
  const timestamp = customUtility.istTimestamp();
  const message = 'OK';
  const healthCheck = {
    uptime: `${(process.uptime() / 60).toFixed(2)} minutes`,
    message,
    timestamp,
  };
  logger.info(`Health check status completed and overall status is ${message}`);
  return res.status(200).json({ status: healthCheck });
});

app.use(Router);

const databaseConnection = async () => {
  try {
    await pgsql.authenticate();
    logger.info('Database connected sucessfully');
  } catch (error) {
    logger.error(` database connection faild with ${error.message}`);
  }
};

const StartServer = () => {
  try {
    app.listen(AppConfig.PORT || 3000, () => {
      logger.info(`${AppConfig.APPNAME} is listening on port ${AppConfig.PORT}`);
    });
  } catch (error) {
    logger.error(`Error while starting server ${error.message}`);
    process.exit(-1);
  }
};


databaseConnection();
StartServer();
