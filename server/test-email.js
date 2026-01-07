import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER, // Log in with Gmail
    pass: process.env.EMAIL_PASSWORD, // 16-digit App Password
  },
});

console.log("Checking Gmail SMTP connection...");

transporter.verify((error, success) => {
  if (error) {
    console.error("Connection Failed:", error);
    console.log("Tip: Check if 2FA is on and you are using a 16-digit App Password.");
  } else {
    console.log("Success! Your server is ready to send reset emails.");
  }
});