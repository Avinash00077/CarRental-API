import nodemailer from 'nodemailer';
import logger from './logger.utility.js';
import AppConfig from '../config/app/app.config.js';
const { EMAIL_ADDRESS, EMAIL_PASSWORD } = AppConfig;

const sendEmail = async (recipientEmail, subject, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // e.g., 'Gmail'
      auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: EMAIL_ADDRESS,
      to: recipientEmail,
      subject: subject,
      html: body,
    };
    const info = await transporter.sendMail(mailOptions);
    logger.info({ EmailSent: info.response });
  } catch (error) {
    logger.error({ ErrorSendingEmail: error });
  }
};

export default sendEmail;
