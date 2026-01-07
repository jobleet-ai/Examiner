// routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as crypto from 'crypto';

import User from '../../../../models/User.js'; // Ensure file extension for ESM
import UserProfile from '../../../../models/UserProfile.js';
import RecruiterProfile from '../../../../models/RecruiterProfile.js';
import mongoose from 'mongoose';
import { forgotPassword, resetPassword } from './authController.js';

const router = express.Router();

// Define a generic error message for authentication failures (security best practice)
const AUTH_ERROR = 'Invalid credentials or access token.';


router.post('/register', async (req, res) => {
  const session = await mongoose.startSession();
  // We start the transaction early to wrap the entire identity check
  session.startTransaction();

  try {
    const { email, password, role, name, company } = req.body;
    if (!email || !password || !role || !name) {
      throw new Error('Missing required fields');
    }

    const emailLower = email.toLowerCase();
    const emailHash = crypto.createHash('sha256').update(emailLower).digest('hex');

    // 1. Check for Active or Anonymized User
    const existingUser = await User.findOne({
      $or: [
        { email: emailLower },
        { email: { $regex: emailHash } }
      ]
    }).session(session);

    let targetUser;
    let isReactivation = false;

    if (existingUser) {
      const isAnonymized = existingUser.email.includes('@deleted.jobleet.com');

      if (!isAnonymized) {
        // User exists and is active - stop here
        await session.abortTransaction();
        session.endSession();
        return res.status(409).json({ success: false, message: 'User already exists' });
      }

      // 2. REACTIVATION PATH
      isReactivation = true;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      existingUser.email = emailLower;
      existingUser.password = hashedPassword;
      existingUser.name = name;
      existingUser.status = 'verified';
      existingUser.agreed = true;
      if (role === 'recruiter') existingUser.company = company;

      await existingUser.save({ session });
      targetUser = existingUser;

      // Create a fresh Profile for the returning user (using the original userId)
      if (role === 'jobseeker') {
        await UserProfile.create([{ userId: targetUser._id, name, email: emailLower }], { session });
      } else if (role === 'recruiter') {
        await RecruiterProfile.create([{
          recruiterId: targetUser._id,
          recruiterName: name,
          workEmail: emailLower,
          'company.name': company,
        }], { session });
      }
    } else {
      // 3. NEW USER PATH
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUserArray = await User.create([{
        email: emailLower,
        password: hashedPassword,
        role,
        name,
        company
      }], { session });

      targetUser = newUserArray[0];

      if (role === 'jobseeker') {
        await UserProfile.create([{ userId: targetUser._id, name, email: emailLower }], { session });
      } else if (role === 'recruiter') {
        await RecruiterProfile.create([{
          recruiterId: targetUser._id,
          recruiterName: name,
          workEmail: emailLower,
          'company.name': company,
        }], { session });
      }
    }

    // 4. Finalize Transaction
    await session.commitTransaction();
    session.endSession();

    // 5. Generate Token
    const token = jwt.sign(
      { userId: targetUser._id, email: targetUser.email, role: targetUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(isReactivation ? 200 : 201).json({
      success: true,
      message: isReactivation ? 'Account reactivated successfully' : 'User registered successfully',
      data: {
        user: { id: targetUser._id, email: targetUser.email, role: targetUser.role, name: targetUser.name },
        token
      }
    });

  } catch (err) {
    // Only abort if the session is still active
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    console.error('Registration Error:', err);
    res.status(500).json({ success: false, message: err.message || 'Registration failed' });
  }
});

// --- POST - Login ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // 1. Find user, explicitly selecting the password field for comparison
    const uu1 = await User.findOne({ email });
    console.log("uu1:", uu1);

    const user = await User.findOne({ email }).select('+password'); 
    
    // 2. Check if user exists (use generic error for security)
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: AUTH_ERROR 
      });
    }

    // 3. Verify password (use generic error for security)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: AUTH_ERROR 
      });
    }

    // 4. Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 5. Return response, manually stripping the password for the response object
    const userResponse = user.toObject();
    delete userResponse.password; // Crucial: Remove the password field before sending

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: userResponse._id,
          email: userResponse.email,
          role: userResponse.role,
          name: userResponse.name
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({ // Use 500 for general server errors
      success: false,
      message: 'Internal server error during login',
      error: error.message
    });
  }
});

// Route for "Forgot Password" request (Sends email)
router.post('/reset-password', forgotPassword);

// Route for "Update Password" (Final step)
router.post('/update-password', resetPassword);

export default router;