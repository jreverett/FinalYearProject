const nodemailer = require('nodemailer');

function send(mailOptions) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASS,
    },
  });

  // terminate here if email sending is disabled
  if (process.env.NO_EMAIL) {
    return;
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

exports.send = send;
