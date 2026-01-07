import nodemailer from 'nodemailer';
// Transporter configuration for admin@jobleet.com
// Updated authController.js
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: 'smtp.gmail.com',
  port: 465, // Use 465 for secure: true
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Log in with Gmail
    pass: process.env.EMAIL_PASSWORD, // 16-digit App Password
  },
});

export default transporter;