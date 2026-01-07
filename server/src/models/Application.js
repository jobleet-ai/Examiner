// models/Application.js
import mongoose from 'mongoose'


const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appliedDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['pending', 'rejected', 'error', 'aborted', 'test_pending', 'applied', 'withdrawn', 'qualified', 'interviewing', 'pending_review', 'hired'],
    default: 'pending' 
  },
  resumePath: { type: String, required: true },
  //resumeUniqueId: { type: String, required: false },
  preScreeningAnswers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    answer: String,
    isCorrect: Boolean
  }],
  testGenerated: { type: Boolean, default: false },
  testCompleted: { type: Boolean, default: false },
  testScore: Number,
  testCompletedAt: Date,
  notes: String,
  testStartedAt: Date,
  testErrorMessage: String,
  suspicious: Boolean,
  warningCount: Number,
  warnings: String,
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Indexes
applicationSchema.index({ candidateId: 1, appliedDate: -1 });
applicationSchema.index({ jobId: 1, status: 1 });
applicationSchema.index({ candidateId: 1, jobId: 1 }, { unique: true }); // Prevent duplicate applications

export default mongoose.model('Application', applicationSchema);