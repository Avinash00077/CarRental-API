'use strict'

import {generate} from 'otp-generator';
import pgsql from '../config/database/database.config.js';
const customExceptionMessage =(errorCode,errorMessage)=>{
    return {errorCode,errorMessage}
}

const formatDateTime = (date, time) => {
    const [year, month, day] = date.split('-');
    return `${year}-${month}-${day}T${time}`;
  };

  const istTimestamp = () => {
    const now = new Date();
    const offset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const istTime = new Date(now.getTime() + offset).toISOString().replace('T', ' ').substring(0, 19);
    return istTime;
  };
const generateOtp = () => generate(6,{upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false});

const setTimeZone = async (req, res, next) => {
  
  await pgsql.query("SET time_zone = '+05:30';"); // Enforces IST per session
  //await pgsql.query("SET TIME ZONE 'Asia/Kolkata'");
  next();
};

const customUtility = {customExceptionMessage, formatDateTime, istTimestamp, generateOtp, setTimeZone};
export default customUtility;