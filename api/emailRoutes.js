const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const sendEmail = (req, res) => {
  // Extract booking details from the request body
  const {
    recipientEmail,
    fullName,
    scooterName,
    startDate,
    endDate,
    pickupTime,
    dropoffTime,
    numberOfDays,
    totalPrice,
    pickupLocation,
    dropoffLocation,
  } = req.body;

  // Set up the transporter with your email service and credentials
  let transporter = nodemailer.createTransport({
    host: 'smtp.kelvinmotorbike.co.tz', // Replace with your SMTP server
    port: 465, // Replace with the correct port
    secure: true, // Set to true if using port 465 (SSL)
    auth: {
      user: 'booking@kelvinmotorbike.co.tz', // Replace with your email
      pass: 'kelvinmotorbike1', // Replace with your email password
    },
  });

  // Define email options for the user with the updated message
  let userMailOptions = {
    from: 'booking@kelvinmotorbike.co.tz',
    to: recipientEmail,
    subject: 'Booking Confirmation',
    text: `Dear ${fullName},

Thank you for booking with our company. The price covers insurance, unlimited mileage, and government taxes.

Please send us your driving license so we can make a driving permit for you to drive in Zanzibar, which may cost $10 per driver.

Your booking details:
- Scooter Name: ${scooterName}
- Start Date: ${startDate}
- End Date: ${endDate}
- Pickup Location: ${pickupLocation}
- Dropoff Location: ${dropoffLocation}
- Pickup Time: ${pickupTime}
- Dropoff Time: ${dropoffTime}
- Number of Days: ${numberOfDays}
- Total Price: $${totalPrice}

Best regards,
KelvinMotorBike`,
  };

  // Define email options for the fixed email address
  let fixedMailOptions = {
    from: 'booking@kelvinmotorbike.co.tz',
    to: 'info@kelvinmotorbike.co.tz',
    subject: 'New Booking Received',
    text: `A new booking has been made.

Customer Name: ${fullName}
Scooter Name: ${scooterName}
Start Date: ${startDate}
End Date: ${endDate}
Pickup Location: ${pickupLocation}
Dropoff Location: ${dropoffLocation}
Pickup Time: ${pickupTime}
Dropoff Time: ${dropoffTime}
Number of Days: ${numberOfDays}
Total Price: $${totalPrice}`,
  };

  // Send the user's email
  transporter.sendMail(userMailOptions, (error, info) => {
    if (error) {
      console.error('Error sending user email: ', error.message);
      return res.status(500).send('Error sending user email: ' + error.message);
    }
    console.log('User email sent: ' + info.response);

    // Send the fixed email
    transporter.sendMail(fixedMailOptions, (error, info) => {
      if (error) {
        console.error('Error sending fixed email: ', error.message);
        return res.status(500).send('Error sending fixed email: ' + error.message);
      }
      console.log('Fixed email sent: ' + info.response);
      res.status(200).send('Emails sent successfully.');
    });
  });
};

// Define the route for sending emails
router.post('/send-email', sendEmail);

module.exports = router;


