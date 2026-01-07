import jwt from 'jsonwebtoken';

// Middleware to verify JWT token
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // ... (rest of the authenticateToken logic remains the same)
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access token required' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        message: 'Invalid or expired token' 
      });
    }
    
    req.user = user; // { userId, email, role }
    next();
  });
};

// Middleware to check if user is a recruiter
export const isRecruiter = (req, res, next) => {
  if (req.user.role !== 'recruiter') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Recruiter role required.' 
    });
  }
  next();
};

// Middleware to check if user is a job seeker
export const isJobSeeker = (req, res, next) => {
  if (req.user.role !== 'jobseeker') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Job seeker role required.' 
    });
  }
  next();
};

// Middleware to check if user is a job seeker
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Admin role required.' 
    });
  }
  next();
};
// No need for module.exports here, the named exports above suffice.