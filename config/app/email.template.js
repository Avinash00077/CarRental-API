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
            background-color: white;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            text-align: center;
        }
        .header {
            background: #121212;
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
            background: #121212;
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
</html>`,
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
            background-color: white;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            text-align: center;
        }
        .header {
            background: #121212;
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
            background: #121212;
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

const getUserNameTemplate = (user_name, name) => {
    return {
      subject: 'Your Username Retrieval Request 🔐',
      body: `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Username Retrieval</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                text-align: center;
            }
            .header {
                background: #4CAF50;
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
            .username-box {
                font-size: 24px;
                font-weight: bold;
                background: #4CAF50;
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
            <div class="header">Username Retrieval Request</div>
            <div class="content">
                <p>Dear <strong>${name}</strong>,</p>
                <p>We received a request to retrieve your username. Your username is:</p>
                <div class="username-box">${user_name}</div>
                <p>Use this username to log in to your account.</p>
                <p>If you did not request this, please ignore this email or contact our support team immediately for assistance.</p>
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
  

const bookingTemplate = (name, start_date, start_time, end_date, end_time, bookingId, model, location, otp) => {
  return {
    subject: 'Fasten Your Seatbelt! 🚘 Your Car Booking is Confirmed!',
    body: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Booking Confirmation</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: white;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-top: 5px solid #121212;
        }
        h2 {
            color: #121212;
            text-align: center;
        }
        .details, .policies {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 15px;
        }
        .details p, .policies p {
            margin: 8px 0;
            color: #333;
        }
        .otp {
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            color: white;
            background: #121212;
            padding: 12px;
            border-radius: 8px;
        }
        ul {
            padding-left: 20px;
        }
        .note {
            font-size: 14px;
            color: #6c757d;
            margin-top: 15px;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #6c757d;
            margin-top: 20px;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
        .btn {
            display: block;
            width: 100%;
            max-width: 220px;
            margin: 20px auto;
            padding: 12px;
            text-align: center;
            background-color:  #121212;;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            transition: 0.3s;
        }
        .btn:hover {
            background-color: #121212;
            color: white;
            transform: scale(1.05);
        }
        .section-title {
            font-weight: bold;
            font-size: 16px;
            margin-top: 10px;
            color:  #121212;;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>🚗 Car Booking Confirmed</h2>

    <p>Dear <strong>${name}</strong>,</p>
    <p>We’re excited to confirm your car booking with <strong>DND CarRental</strong>. Below are your booking details:</p>

    <div class="details">
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>Car:</strong> ${model}</p>
        <p><strong>Pickup Date & Time:</strong> ${start_date} ${start_time}</p>
        <p><strong>Drop-off Date & Time:</strong> ${end_date} ${end_time}</p>
        <p><strong>Pickup Location:</strong> ${location}</p>
        <p><strong>Drop-off Location:</strong> ${location}</p>
    </div>

    <div class="otp">
        🔑 Your OTP: <strong>${otp}</strong>
    </div>

    <p style="text-align: center; font-weight: bold;">Please share this OTP with our executive at the time of vehicle pickup.</p>

    <p class="section-title">📌 Required Documents for Car Pickup:</p>
    <ul>
        <li>Aadhar Card (or any valid Government-issued ID)</li>
        <li>Valid Driving License (matching the renter's name)</li>
    </ul>

    <p class="section-title">📢 Important Guidelines:</p>
    <ul>
        <li>Arrive at the pickup location 15 minutes before your scheduled time.</li>
        <li>The car will be inspected before and after your trip for any damages.</li>
        <li>Ensure the fuel level is the same as at pickup to avoid refueling charges.</li>
        <li>Late returns may attract additional charges as per rental policy.</li>
        <li>The renter is responsible for toll charges, parking fees, and traffic violations.</li>
    </ul>

    <div class="policies">
        <p class="section-title">⚠️ Company Policies:</p>
        <ul>
            <li><strong>Damage Policy:</strong> Any damage beyond normal wear and tear will be charged as per company guidelines.</li>
            <li><strong>Cancellation & Refund:</strong> Cancellations made <strong>6 hours</strong> before the pickup time will be eligible for a refund as per our policy.</li>
            <li><strong>Usage Restrictions:</strong> The rented car must not be used for commercial purposes, racing, or illegal activities. Violations may result in legal action.</li>
        </ul>
    </div>

    <p class="note"><strong>By proceeding with the booking, you agree to our <a href="[Company Website]" style="color: #007bff;">Terms & Conditions</a>.</strong></p>

    <a href="[Company Website]" class="btn">Manage Your Booking</a>

    <div class="footer">
        <p>For any assistance, contact us at <a href="mailto:[Customer Support Email]" style="color: #007bff;">[Customer Support Email]</a> or call <strong>[Customer Support Number]</strong>.</p>
        <p>&copy; <span id="year"></span>DND CarRental. All rights reserved.</p>
    </div>
</div>

<script>
    document.getElementById("year").textContent = new Date().getFullYear();
</script>

</body>
</html>
`,
  };
};

const cancellationTemplate = (name, start_date, start_time, end_date, end_time, bookingId, model, location, refundAmount) => {
    return {
      subject: 'Booking Cancellation Confirmation 🚫',
      body: `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Car Booking Cancellation</title>
      <style>
          body {
              font-family: 'Arial', sans-serif;
              background-color: white;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              border-top: 5px solid #d9534f;
          }
          h2 {
              color: #d9534f;
              text-align: center;
          }
          .details, .refund {
              background: #f9f9f9;
              padding: 15px;
              border-radius: 5px;
              margin-bottom: 15px;
          }
          .details p, .refund p {
              margin: 8px 0;
              color: #333;
          }
          .refund-amount {
              text-align: center;
              font-size: 22px;
              font-weight: bold;
              color: #d9534f;
              background: #fce4e4;
              padding: 12px;
              border-radius: 8px;
          }
          .note {
              font-size: 14px;
              color: #6c757d;
              margin-top: 15px;
          }
          .footer {
              text-align: center;
              font-size: 14px;
              color: #6c757d;
              margin-top: 20px;
              border-top: 1px solid #ddd;
              padding-top: 10px;
          }
          .btn {
              display: block;
              width: 100%;
              max-width: 220px;
              margin: 20px auto;
              padding: 12px;
              text-align: center;
              background-color: #d9534f;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              transition: 0.3s;
          }
          .btn:hover {
              background-color: #c9302c;
              color: white;
              transform: scale(1.05);
          }
          .section-title {
              font-weight: bold;
              font-size: 16px;
              margin-top: 10px;
              color: #d9534f;
          }
      </style>
  </head>
  <body>
  
  <div class="container">
      <h2>🚫 Car Booking Cancelled</h2>
  
      <p>Dear <strong>${name}</strong>,</p>
      <p>We regret to inform you that your car booking with <strong>DND CarRental</strong> has been cancelled. Below are the cancellation details:</p>
  
      <div class="details">
          <p><strong>Booking ID:</strong> ${bookingId}</p>
          <p><strong>Car:</strong> ${model}</p>
          <p><strong>Original Pickup Date & Time:</strong> ${start_date} ${start_time}</p>
          <p><strong>Original Drop-off Date & Time:</strong> ${end_date} ${end_time}</p>
          <p><strong>Pickup Location:</strong> ${location}</p>
          <p><strong>Drop-off Location:</strong> ${location}</p>
      </div>
  
      <div class="refund">
          <p class="section-title">💸 Refund Details:</p>
          <div class="refund-amount">Refund Amount: ₹${refundAmount}</div>
          <p>Please allow 5-7 business days for the refund to reflect in your account.</p>
      </div>
  
      <p class="section-title">📢 Important Information:</p>
      <ul>
          <li>If you wish to rebook, you can visit our website or contact our support team.</li>
          <li>For urgent concerns, please reach out to our support helpline.</li>
      </ul>
  
      <a href="[Company Website]" class="btn">Visit Our Website</a>
  
      <div class="footer">
          <p>For any assistance, contact us at <a href="mailto:[Customer Support Email]" style="color: #007bff;">[Customer Support Email]</a> or call <strong>[Customer Support Number]</strong>.</p>
          <p>&copy; <span id="year"></span>DND CarRental. All rights reserved.</p>
      </div>
  </div>
  
  <script>
      document.getElementById("year").textContent = new Date().getFullYear();
  </script>
  
  </body>
  </html>
  `,
    };
  };
  

const verficationTemplate = (STATUS, USER_NAME, APPROVED, DOCUMENT_TYPE) => {
  return {
    subject: APPROVED
      ? `✅ ${DOCUMENT_TYPE} Verification Approved - You're Ready to Rent a Car!`
      : `⚠️ ${DOCUMENT_TYPE} Verification Failed - Action Required`,
    body: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Status</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: white;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            background: #ffffff;
            margin: 20px auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-top: 5px solid #121212;
        }
        .header {
            background-color: #121212;
            color: #ffffff;
            text-align: center;
            padding: 20px;
            font-size: 24px;
            font-weight: bold;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .content {
            padding: 20px;
            text-align: center;
            font-size: 17px;
            line-height: 1.6;
            color: #333;
        }
        .approved {
            color: #28a745;
            font-weight: bold;
        }
        .rejected {
            color: #dc3545;
            font-weight: bold;
        }
        .divider {
            height: 1px;
            background: #ddd;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #6c757d;
            border-top: 1px solid #ddd;
            margin-top: 20px;
            background: #f8f9fa;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
        .button {
            display: block;
            width: 100%;
            max-width: 220px;
            margin: 20px auto;
            padding: 12px;
            text-align: center;
            background-color: #121212;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            transition: background 0.3s ease-in-out;
        }
        .button:hover {
            background-color: #121212;
            color: white;
            transform: scale(1.05);
        }
        .note {
            font-size: 14px;
            color: #6c757d;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Verification Status</div>
        <div class="content">
            <p>Dear <strong>${USER_NAME}</strong>,</p>
            <p>Your <strong>${DOCUMENT_TYPE}</strong> verification for our car rental service has been <strong class="${STATUS}">${STATUS}</strong>.</p>
            
            <div class="divider"></div>
            
            ${
              APPROVED
                ? `
            <p class="success">🎉 Congratulations! Your verification was successful.</p>`
                : `
            <p class="error">⚠️ Unfortunately, we were unable to verify your document. Please ensure the details are correct and try again.</p>
            <a href="#" class="button">Re-upload Document</a>
            `
            }
        </div>
        <div class="footer">
            <p>For any assistance, contact our support team.</p>
            <p>&copy; 2025 Car Rental Service</p>
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
  getUserNameTemplate,
  bookingTemplate,
  verficationTemplate,
  cancellationTemplate,
};

export default emailTemplates;
