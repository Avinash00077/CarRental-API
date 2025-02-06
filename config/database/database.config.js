'use strict';
import properties from '../index.config.js';
import { Sequelize } from 'sequelize';


const dbpassword = properties.get('db.pgsql.password').split('HYDSCT')
const sequelize = new Sequelize({
  dialect: properties.get('db.pgsql.dialect') || process.env.PGSQL_DIALECT,
  host: properties.get('db.pgsql.host') || process.env.PGSQL_HOST,
  username: properties.get('db.pgsql.username') || process.env.PGSQL_USERNAME,
  password: dbpassword[1] || process.env.PGSQL_PASSWORD,
  database: properties.get('db.pgsql.database') || process.env.PGSQL_DATABASE,
  port: properties.get('db.pgsql.port') || process.env.PGSQL_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This is typically needed if the server uses self-signed SSL certificates
      timezone: 'Asia/Kolkata', // Ensures timestamps use IST

    },
  },
  pool: {
    max: 10,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
});

// const dbpassword = properties.get('db.mysql.password').split('HYDSCT');
// const sequelize = new Sequelize({
//   dialect: properties.get('db.mysql.dialect') || process.env.MYSQL_DIALECT, // Changed to mysql
//   host: properties.get('db.mysql.host') || process.env.MYSQL_HOST,
//   username: properties.get('db.mysql.username') || process.env.MYSQL_USERNAME,
//   password: dbpassword[1] || process.env.MYSQL_PASSWORD,
//   database: properties.get('db.mysql.database') || process.env.MYSQL_DATABASE,
//   port: properties.get('db.mysql.port') || process.env.MYSQL_PORT,
//   dialectOptions: {
//     //timezone: '+05:30', // Ensures timestamps use IST
//   },
//   pool: {
//     max: 10,
//     min: 1,
//     acquire: 30000,
//     idle: 10000,
//   },
// });


export default sequelize;
