import pino from 'pino';

// Custom timestamp function for IST
const istTimestamp = () => {
  const now = new Date();
  const offset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const istTime = new Date(now.getTime() + offset).toISOString().replace('T', ' ').substring(0, 19);
  return `,"time":"${istTime}"`;
};

// Create Pino logger
const logger = pino({
  level: 'info', // Include PID and hostname in logs
  timestamp: () => `,"time":"${istTimestamp()}"`, // Use custom IST timestamp
  formatters: {
    level(label) {
      return { level: label }; // Output "level" as a string
    },
  },
});

export default logger;
