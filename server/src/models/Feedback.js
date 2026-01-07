import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["General Feedback", "Report a Bug", "Feature Request", "Partnership Inquiry"],
    default: "General Feedback" 
  },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["pending", "inprogress", "resolved", "closed"], 
    default: "pending" 
  },
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);
export default Feedback;