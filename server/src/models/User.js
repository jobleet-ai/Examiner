import mongoose from 'mongoose';

const { Schema } = mongoose;

const ResumeRefSchema = new Schema({
  resumeUrl: { type: String, required: true },         // S3 URL or storage path
  filename: String,
  uploadedAt: { type: Date, default: Date.now },
  version: { type: Number, default: 1 },
}, { _id: false });

/* Main user schema supporting both roles */
const userSchema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['recruiter', 'jobseeker', 'admin'], default: 'jobseeker', index: true },
  avatar: {
    type: String,
    default: null // Explicitly allow null
  },
  name: { type: String, default: '' },
  agreed: { type: Boolean, default: false },
  company: String,
  status:  { type: String, enum: ['verified', 'pending', 'rejected'], default: 'pending' },

  resetPasswordToken: String,
  resetPasswordExpires: Date,

  lastAiReset: String,
  aiCreditsUsed: { type: Number, default: 0 },

  dailyJobCount: { type: Number, default: 0 },
  lastJobPostDate: { type: String, default: "" },
  subscriptionTier: { type: String, enum: ['free', 'pro'], default: 'free' }

}, { timestamps: true });

export default mongoose.model('User', userSchema);