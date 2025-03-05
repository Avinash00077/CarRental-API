'use strict';
/**
 * @module Ecma2015
 * @constant {AppConfig}
 */
import express from 'express';
import AppConfig from './config/app/app.config.js';
import cors from 'cors';
import helmet from 'helmet';
import mysql from './config/database/database.config.js';
import UserRoutes from './routes/user.routes.js';
import AdminRoutes from './routes/admin.routes.js'
import logger from './utility/logger.utility.js';
import customUtility from './utility/custom.utility.js';
const {STATUS_MESSAGES }= AppConfig

const app = express();

app.use(express.json());

app.use(helmet());

app.use(cors());

app.use(express.urlencoded({ extended: false }));

// Handle invalid JSON in request body
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      return res.status(400).json({
          status: 400,
          message: "Invalid JSON format in request body."
      });
  }
  next();
});

app.get('/health', async (req, res) => {
  let dbStatus;
  try {
    logger.info('Health check initiated for db');
    await mysql.authenticate();
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
    return res.status(200).json({message: STATUS_MESSAGES[200], status: healthCheck });
  } else {
    return res.status(503).json({ message: STATUS_MESSAGES[503], status: healthCheck });
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
  return res.status(200).json({ message: STATUS_MESSAGES[200], status: healthCheck });
});

app.use('/user', UserRoutes);

app.use('/admin', AdminRoutes);

// Handle invalid routes (404)
app.use((request, response) => {
 return response.status(404).json({
      status: 404,
      message: "Route not found."
  });
});

const databaseConnection = async () => {
  try {
    await mysql.authenticate();
    logger.info('Database connected sucessfully');
  } catch (error) {
    logger.error(` database connection failed with ${error.message}`);
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
