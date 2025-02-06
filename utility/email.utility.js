import nodemailer from 'nodemailer';
import logger from './logger.utility.js';

const sendEmail = async (recipientEmail, subject, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // e.g., 'Gmail'
      auth: {
        user: 'avinashreddytummuri77@gmail.com',
        pass: 'bddtpkvzjbugtyek',
      },
    });

    const mailOptions = {
      from: 'dndcarrental@gmail.com',
      to: recipientEmail,
      subject: subject,
      html: body,
    };
    const info = await transporter.sendMail(mailOptions);
    logger.info({EmailSent:info.response});
  } catch (error) {
    logger.error({ErrorSendingEmail: error});
  }
};

export default sendEmail;
