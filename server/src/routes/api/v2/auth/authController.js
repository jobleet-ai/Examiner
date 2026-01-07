import crypto from 'crypto';
import bcrypt from 'bcryptjs';

import User from '../../../../models/User.js';
import transporter from '../../../../utils/emailsend.js';



// 1. Request Password Reset
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log("No user found with that email address.");
      return res.status(404).json({ message: "No user found with that email address." });
    }

    // Create a random reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash the token and set to user field with an expiry (1 hour)
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

    await user.save();

    // The link user clicks in AuthPage.jsx
    const resetUrl = `https://jobleet.com/login?token=${resetToken}`;
 
    const mailOptions = {
      from: '"Jobleet Admin" <admin@jobleet.com>',
      to: user.email,
      subject: "Password Reset Request - Jobleet",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h2>Password Reset Request</h2>
          <p>You requested a password reset for your Jobleet account. Click the button below to set a new password. This link is valid for 1 hour.</p>
          <a href="${resetUrl}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Reset Password</a>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">If you did not request this, please ignore this email.</p>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Reset link sent to email." });

  } catch (error) {
    console.log("Error in forgotPassword:", error);
    res.status(500).json({ message: "Error sending email. Please try again later." });
  }
};

// 2. Reset Password using Token
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log("User not found for password reset:", user);
      return res.status(400).json({ message: "Token is invalid or has expired." });
    }

    // Update password and clear reset fields
    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.log("Error in resetPassword:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};