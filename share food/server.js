const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// POST route for form submission
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'abhisheksainsain91@gmail.com',
      pass: 'your_password'
    }
  });

  // Email options
  const mailOptions = {
    from: email,
    to: 'abhisheksainsain91@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error: Something went wrong. Please try again later.');
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('/thank-you.html'); // Redirect to thank you page
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
