'use strict'
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

const customUtility = {customExceptionMessage, formatDateTime, istTimestamp};
export default customUtility;