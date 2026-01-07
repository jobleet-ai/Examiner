import express from "express"
import bodyParser from "body-parser"
import cors  from "cors"
import fs from "fs";

import 'dotenv/config'; // or require('dotenv').config();
// --- Modern Mongoose Connection ---
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name from the file path
const __dirname = path.dirname(__filename);
// Import Routes
// import authRoutes from'./routes/auth.js';
// import jobRoutes from'./routes/job.js';
import apiRoutes from'./src/routes/api/ApiRoute.js';
import Job from "./src/models/Job.js";
// 1. Import the middleware functions using their names
// import { 
//   authenticateToken, 
//   isRecruiter, 
//   isJobSeeker 
// } from './middleware/auth.js';

//const { initWSS } = require("./src/websocket");


  const app = express();
  const port = process.env.PORT || '4444';
  //const port = 4444;

  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  // Setting up middlewares
  app.use(cors());
  app.use(express.json());
  app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));
 // app.use(cookieParser());
  app.set("trust proxy", true);

  // Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Joblient API is running' });
  });

  // ==================== ERROR HANDLING ====================

  // 404 Handler
  // app.use((req, res) => {
  //   res.status(404).json({ error: 'Route not found' });
  // });

  // Global Error Handler
  app.use((err, req, res, next) => {
    console.error('Global Error:', err);
    res.status(500).json({ 
      error: 'Internal server error',
      message: err.message 
    });
  });

const dist = path.join(process.cwd(), 'frontend', 'dist')
// serve static files (build output)
app.use(express.static(dist));


// Critical: serve static files BEFORE SPA fallback
app.use(express.static(dist, {
  setHeaders(res, path) {
    if (path.endsWith(".js")) {
      res.setHeader("Content-Type", "application/javascript");
    }
    if (path.endsWith(".wasm")) {
      res.setHeader("Content-Type", "application/wasm");
    }
  }
}));



// Routing Server API
console.log("server route hits");
app.use("/api", apiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date()
  });
});

app.get('/sitemap.xml', async (req, res) => {
  const jobs = await Job.find({ status: 'active' }).select('_id postedDate');
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://jobleet.com/</loc><priority>1.0</priority></url>
    <url><loc>https://jobleet.com/jobs</loc><priority>0.9</priority></url>`;

  jobs.forEach(job => {
    xml += `
    <url>
      <loc>https://jobleet.com/jobs/${job._id}</loc>
      <lastmod>${job.postedDate.toISOString().split('T')[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`;
  });

  xml += `</urlset>`;
  
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

  // fallback: serve index.html for any non-API route
app.get(/.*/, (req, res) => {
  // If you namespace API at /api, avoid overriding them.
  if (req.path.startsWith('/api')) return res.status(404).send('Not found');

  res.sendFile(path.join(process.cwd(), 'frontend', 'dist', 'index.html'));
});


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => console.error('❌ MongoDB connection error:', err));








  app.listen(port, () => {
    console.log(`Server started on port ${port} !`);
  });





