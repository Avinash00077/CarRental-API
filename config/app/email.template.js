'use strict';

const userRegestartionTemplate = (user_name) => {
  return {
    subject: 'Welcome to Car Rental Services – Start Your Journey Today! 🚗✨',
    body: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Car Rental Service</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #fef4e6;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            width: 90%;
            max-width: 600px;
            background: #ffffff;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            text-align: center;
        }
        .header {
            background: #6f82c6;
            color: #ffffff;
            padding: 20px;
            font-size: 26px;
            font-weight: bold;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 20px;
            font-size: 18px;
            color: #333;
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            background: #6f82c6;
            color: #ffffff;
            padding: 14px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-size: 18px;
            font-weight: bold;
            transition: background 0.3s ease, transform 0.2s;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        .button:hover {
            background: #425599;
            transform: scale(1.05);
        }
        .footer {
            margin-top: 25px;
            font-size: 14px;
            color: #777;
            border-top: 1px solid #ddd;
            padding-top: 15px;
        }

        /* 📌 Responsive Styles */
        @media (max-width: 480px) {
            body {
                height: auto;
                padding: 20px;
            }
            .container {
                width: 100%;
                padding: 20px;
            }
            .header {
                font-size: 22px;
                padding: 15px;
            }
            .content {
                font-size: 16px;
                padding: 15px;
            }
            .button {
                font-size: 16px;
                padding: 12px 20px;
                width: 100%;
            }
            .footer {
                font-size: 12px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Welcome to Car Rental Services</div>
        <div class="content">
            <p>Hi <strong>${user_name}</strong>,</p>
            <p>Thank you for registering with us! We are excited to have you on board. Now you can book your favorite car at the best prices.</p>
            <p>Get started by exploring our wide range of vehicles.</p>
            <a href="https://carrentalsdnd.web.app/" class="button">Explore Now</a>
        </div>
        <div class="footer">
            <p>&copy; 2025 Car Rental Services. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`,
  };
};

const passwordResetTemplate = (user_name, otp) => {
  return {
    subject: 'Your OTP for Password Reset – Secure Your Account 🔐',
    body: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP for Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #fef4e6;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            width: 100%;
            max-width: 500px;
            background: #ffffff;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            text-align: center;
        }
        .header {
            background: #6f82c6;
            color: #ffffff;
            padding: 20px;
            font-size: 22px;
            font-weight: bold;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 20px;
            font-size: 18px;
            color: #333;
            line-height: 1.6;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            background: #6f82c6;
            color: #ffffff;
            display: inline-block;
            padding: 10px 20px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
            border-top: 1px solid #ddd;
            padding-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">OTP for Password Reset</div>
        <div class="content">
            <p>Hi <strong>${user_name}</strong>,</p>
            <p>Your One-Time Password (OTP) to reset your password is:</p>
            <div class="otp">${otp}</div>
            <p>Please use this OTP to reset your password. It is valid for a limited time only.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Car Rental Services. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`,
  };
};

const emailTemplates = {
  userRegestartionTemplate,
  passwordResetTemplate,
};

export default emailTemplates;
