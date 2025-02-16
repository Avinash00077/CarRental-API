'use strict';
import properties from '../index.config.js';
import { Sequelize } from 'sequelize';

const dbpassword = properties.get('db.mysql.password').split('HYDSCT');
const sequelize = new Sequelize({
  dialect: properties.get('db.mysql.dialect') || process.env.MYSQL_DIALECT, 
  host: properties.get('db.mysql.host') || process.env.MYSQL_HOST,
  username: properties.get('db.mysql.username') || process.env.MYSQL_USERNAME,
  password: dbpassword[1] || process.env.MYSQL_PASSWORD,
  database: properties.get('db.mysql.database') || process.env.MYSQL_DATABASE,
  port: properties.get('db.mysql.port') || process.env.MYSQL_PORT,
  pool: {
    max: 10,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
});


export default sequelize;
