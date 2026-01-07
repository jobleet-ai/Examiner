/* Recruiter profile */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const recruiterProfileSchema = new Schema({
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recruiterName: String,
  title: String,            // recruiter title e.g., Talent Lead
  phone: String,
  avatar: String,
  workEmail: String,
  company: {
    name: String,
    website: String,
    logoUrl: String,
    industry: String,
    size: String,           // e.g., "51-200"
    headquarters: String,
    country: String,
    description: String,
    verified: { type: Boolean, default: false }
  },
  teams: [{ name: String, teamId: Schema.Types.ObjectId }],
  hiringPreferenceTemplates: [{ type: Object, default: {} }], 
  subscription: {
    plan: String,
    seats: Number,
    credits: Number,
    expiresAt: Date
  },
  metrics: {
    postedJobsCount: { type: Number, default: 0 },
    activeJobs: { type: Number, default: 0 },
    responseRate: Number
  },
  address: {
    street: String, city: String, state: String, postalCode: String, country: String
  },
  timezone: String,
}, { timestamps: true });

export default mongoose.model('RecruiterProfile', recruiterProfileSchema);
