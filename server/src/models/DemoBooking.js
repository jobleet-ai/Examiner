import mongoose from 'mongoose';

// Define the schema for the DemoBooking
const DemoBookingSchema = new mongoose.Schema({
    // Contact Information
    name: {
        type: String,
        required: [true, 'Name is required for the demo request.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Work email is required.'],
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    phone: {
        type: String,
        trim: true,
        required: false, // Optional but good for follow-up
    },

    // Company and Role Information
    company: {
        type: String,
        required: [true, 'Company name is required.'],
        trim: true,
    },
    role: {
        type: String,
        required: [true, 'Job title/role is required.'],
        trim: true,
    },
    
    // Management/Status Information
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
    notes: {
        type: String,
        trim: true,
        required: false,
    },

    // Dates
    dateRequested: {
        type: Date,
        default: Date.now,
    },
    dateScheduled: {
        type: Date,
        required: false, // Set when status changes to 'Confirmed'
    },
    
    // Reference to the recruiter/admin who processed the request
    processedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming a 'User' model for admins/recruiters
        required: false,
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

export default mongoose.model('DemoBooking', DemoBookingSchema);
