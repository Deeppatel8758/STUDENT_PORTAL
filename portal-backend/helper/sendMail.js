const nodemailer = require("nodemailer");

const SendMail = (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE_PROVIDER,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = SendMail;
