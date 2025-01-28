'use strict';
const date = new Date();
const year = date.getFullYear();
const AppointmentConfirmationTemplate = (
  PatientName = '',
  doctorName = '',
  department = '',
  date = '',
  slotTime = '',
  appointmentId = '',
  queue = '',
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background: linear-gradient(to bottom, #ffffff, #f9f9f9);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      border: 1px solid #e0e0e0;
    }
    .header {
      background: linear-gradient(135deg, #5a9a6f, #72c78b);
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
      font-size: 26px;
      font-weight: bold;
      letter-spacing: 1px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
      border-bottom: 3px solid #e0e0e0;
    }
    .content {
      padding: 25px 20px;
      color: #333333;
      line-height: 1.7;
    }
    .content p {
      margin: 12px 0;
    }
    .details {
      margin: 20px 0;
      padding: 20px;
      background: linear-gradient(to right, #f9fdf9, #ffffff);
      border: 1px solid #d1e9dc;
      border-radius: 8px;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .details p {
      margin: 8px 0;
      color: #555555;
      font-size: 16px;
    }
    .details p span {
      font-weight: bold;
      color: #333333;
    }
    .footer {
      background: linear-gradient(to bottom, #f9f9f9, #e9ecef);
      color: #777777;
      padding: 15px;
      text-align: center;
      font-size: 14px;
      border-top: 1px solid #dcdcdc;
    }
    .footer a {
      color: #5a9a6f;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    .cta-button {
      display: inline-block;
      margin: 20px 0 10px;
      padding: 12px 28px;
      background: linear-gradient(to bottom, #5a9a6f, #4a865d);
      color: #ffffff;
      text-decoration: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
    }
    .cta-button:hover {
      background: linear-gradient(to bottom, #72c78b, #5a9a6f);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      🩺 Appointment Confirmed
    </div>
    <div class="content">
      <p>Dear <strong>${PatientName}</strong>,</p>
      <p>We are excited to confirm your appointment with <strong>${doctorName}</strong>. Please review the appointment details below:</p>
      <div class="details">
        <p>👨‍⚕️ <span>Doctor:</span> ${doctorName}</p>
        <p>🏢 <span>Department:</span> ${department}</p>
        <p>📅 <span>Date:</span> ${date}</p>
        <p>⏰ <span>Time Slot:</span> ${slotTime}</p>
        <p>🆔 <span>Appointment ID:</span> ${appointmentId}</p>
        <p>👤 <span>Appointment Queue:</span> ${queue}</p>
      </div>
      <p>Please arrive at least 10 minutes early to ensure a smooth check-in process. If you need assistance or wish to reschedule, contact us at <a href="mailto:clinic@example.com">clinic@example.com</a>.</p>
      <a href="https://mediboard-66331.web.app/Patient/${appointmentId}" class="cta-button">View Appointment Details</a>
    </div>
    <div class="footer">
      <p>Thank you for choosing <strong>MediBoard</strong>.</p>
      <p><em>If you cannot attend, please notify us at least 24 hours in advance.</em></p>
      <p>&copy; ${year} MediBoard. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>


`;
};

const DoctorSlotEmail = () => {
  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Slot Notification</title>
    <style>
        /* General Styles */
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
            color: #444;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: linear-gradient(to bottom, #ffffff, #f9f9f9);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
            border: 1px solid #e0e0e0;
        }
        /* Header */
        .header {
            background: linear-gradient(135deg, #4e54c8, #8f94fb);
            color: #ffffff;
            text-align: center;
            padding: 30px 20px;
            border-bottom: 3px solid #e0e0e0;
        }
        .header h1 {
            margin: 0;
            font-size: 26px;
            font-weight: 700;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }
        /* Content */
        .content {
            padding: 25px 20px;
            line-height: 1.7;
        }
        .content h2 {
            font-size: 22px;
            margin: 0 0 10px;
            color: #4e54c8;
        }
        .content p {
            margin: 15px 0;
            font-size: 16px;
        }
        /* Slot Details */
        .slot-details {
            margin: 20px 0;
            padding: 20px;
            background: linear-gradient(to right, #f8f9fc, #ffffff);
            border-radius: 8px;
            border: 1px solid #d1d9e6;
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        .slot-details p {
            margin: 8px 0;
            font-size: 16px;
            color: #333;
        }
        .slot-details strong {
            color: #4e54c8;
        }
        /* Footer */
        .footer {
            text-align: center;
            padding: 15px;
            background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
            border-top: 1px solid #dcdcdc;
            color: #777;
            font-size: 14px;
        }
        .footer a {
            color: #4e54c8;
            text-decoration: none;
        }
        /* Buttons */
        .button {
            display: inline-block;
            background: linear-gradient(to bottom, #6a7cf8, #4e54c8);
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
        }
        .button:hover {
            background: linear-gradient(to bottom, #8f94fb, #6a7cf8);
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>New Slot Notification</h1>
        </div>

        <!-- Content -->
        <div class="content">
            <h2>Dear Dr. [Doctor's Name],</h2>
            <p>
                We are excited to let you know that a new slot has been added to your schedule. Below are the details of the slot:
            </p>

            <!-- Slot Details -->
            <div class="slot-details">
                <p><strong>Date:</strong> [Slot Date]</p>
                <p><strong>Time:</strong> [Slot Time]</p>
                <p><strong>Location:</strong> [Clinic/Hospital Name]</p>
                <p><strong>Purpose:</strong> [General Consultation/Specialty]</p>
            </div>

            <p>
                If you have any questions or need assistance, please feel free to reach out to us at 
                <a href="mailto:[Contact Email]">[Contact Email]</a> or call us at [Contact Number].
            </p>

            <p>
                <a href="[Action Link]" class="button">View Full Schedule</a>
            </p>

            <p>Thank you for your dedication and excellence in patient care.</p>

            <p>Best regards,</p>
            <p>
                [Your Full Name]<br>
                [Your Position]<br>
                [Your Organization Name]<br>
                <a href="mailto:[Contact Email]">[Contact Email]</a> | [Contact Number]
            </p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>&copy; [Year] [Your Organization Name]. All rights reserved.</p>
            <p>
                <a href="#">Privacy Policy</a> | <a href="#">Contact Us</a>
            </p>
        </div>
    </div>
</body>
</html>
`;
};

const EmailTemplates = {
  AppointmentConfirmationTemplate,
};

export default EmailTemplates;
