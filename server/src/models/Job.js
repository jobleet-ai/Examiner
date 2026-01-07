// models/Job.js
import mongoose from 'mongoose';

const preScreeningQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  requiredAnswer: String,
  type: { type: String, enum: ['text', 'yesno', 'number'], required: true }
});


const mockTestSchema = new mongoose.Schema({
  enabled: { type: Boolean, default: false },
  enabledMonitoring: { type: Boolean, default: false },
  testType: String,
  duration: Number, // in minutes
  totalQuestions: Number,
  mockTestId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizSet', required: false },
  passingScore: Number
});

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  logo: String,
  location: {
    type: { type: String, enum: ['Remote', 'Onsite', 'Hybrid'], required: false },
    country: String,
    city: String
  },
  salary: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'USD' }
  },
  experience: String,
  skills: [String],
  description: { type: String, required: false },
  jobType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship','Freelance'], required: false },
  postType: { type: String, enum: ['Direct', 'Referral', 'Agency'], default: 'Direct' },
  sponsorship: { type: Boolean, default: false },
  remote: { type: Boolean, default: false },
  relocation: { type: Boolean, default: false },
  postedDate: { type: Date, default: Date.now },
  validUntil: { type: Date, required: false },
  openings: { type: Number, default: 1 },
  applicants: { type: Number, default: 0 },
  testsTaken: { type: Number, default: 0 },
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  preScreening: {
    enabled: { type: Boolean, default: false },
    questions: [preScreeningQuestionSchema]
  },
  mockTest: mockTestSchema,
  status: { type: String, enum: ['screening', 'active', 'closed', 'draft', 'inactive', 'withdrawn', "rejected"], default: 'screening' },
  slug: { type: String },
  verificationCode: String,
  verificationExpires: Date,
  adminReviewRequested: { type: Boolean, default: false },
  adminReviewData: {
    type: String,
    description: String,
    requestedAt: Date
  },
  // Inside JobSchema
  adminReviewRequested: {
    type: Boolean,
    default: false
  },
  adminReviewData: {
    type: { type: String }, // The "Reason Type" from your modal
    description: { type: String },
    requestedAt: { type: Date }
  },
  adminActionLog: {
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    verifiedAt: { type: Date },
    notes: { type: String }
  }

}, { timestamps: true });

// Indexes for better query performance
jobSchema.index({ recruiterId: 1, status: 1 });
//jobSchema.index({ title: 'text', description: 'text', skills: 'text' });
jobSchema.index({ title: 'text', skills: 'text' });
jobSchema.index({ 'location.country': 1, 'location.city': 1 });
jobSchema.index({ postedDate: -1 });

export default mongoose.model('Job', jobSchema);