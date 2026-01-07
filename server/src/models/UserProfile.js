// models/UserProfile.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const LocationSchema = new Schema({
  city: String,
  state: String,
  country: String
}, { _id: false });

const ExperienceSchema = new Schema({
  id: Number,
  title: { type: String, required: true },
  company: { type: String, required: true },
  startDate: String,   // YYYY-MM
  endDate: String,     // empty if current
  currentlyWorking: Boolean,
  description: String,
  projects: [Object]
}, { _id: false });

const EducationSchema = new Schema({
  id: Number,
  school: { type: String, required: true },
  degree: String,
  major: String,
  currentlyStudying: Boolean,
  startDate: String,
  endDate: String,
  description: String
}, { _id: false });

const SkillSchema = new Schema({
  name: { type: String, required: true },
  proficiency: String     // e.g., beginner/intermediate/expert
}, { _id: false });

const SocialUrlsSchema = new Schema({
  linkedin: String,
  github: String,
  portfolio: String
}, { _id: false });

const UserProfileSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  headline: String,
  email: String,
  phone: String,
  avatar: {
    type: String,
    default: null // Explicitly allow null
  },
  location: LocationSchema,
  summary: String,
  socialUrls: SocialUrlsSchema,
  experiences: [ExperienceSchema],
  education: [EducationSchema],
  skills: [SkillSchema],
  totalExperienceYears: Number,
  resumeUrl: {
    type: String,
    default: null // Explicitly allow null
  }
}, { timestamps: true });

UserProfileSchema.index({ totalExperienceYears: 1});
UserProfileSchema.index({ totalExperienceYears: 1, 'skills.name': 'text'});

export default mongoose.model('UserProfile', UserProfileSchema);
