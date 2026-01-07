import express from 'express';
import Feedback from '../../../../models/Feedback.js';

const router = express.Router();

// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    const { name, email, type, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newFeedback = new Feedback({ name, email, type, message });
    await newFeedback.save();

    res.status(201).json({ 
      success: true, 
      message: "Feedback submitted successfully!" 
    });
  } catch (error) {
    console.error("Feedback Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// 1. READ ALL (Paginated, Sorted, Filtered)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, type, sort = '-createdAt' } = req.query;

    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;

    const feedbacks = await Feedback.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Feedback.countDocuments(query);

    res.json({
      feedbacks,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalEntries: count
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. UPDATE STATUS (Take Action)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(feedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: "Feedback deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;