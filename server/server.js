// import fs from 'node:fs/promises'
// import express from 'express'
// import 'dotenv/config'; // or require('dotenv').config();
// // --- Modern Mongoose Connection ---
// import mongoose from 'mongoose';
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Convert import.meta.url to a file path
// const __filename = fileURLToPath(import.meta.url);
// // Get the directory name from the file path
// const __dirname = path.dirname(__filename);
// // Import Routes
// // import authRoutes from'./routes/auth.js';
// // import jobRoutes from'./routes/job.js';
// import apiRoutes from'./src/routes/api/index.js';
// // 1. Import the middleware functions using their names
// // import { 
// //   authenticateToken, 
// //   isRecruiter, 
// //   isJobSeeker 
// // } from './middleware/auth.js';


// // Constants
// const isProduction = true; // process.env.NODE_ENV === 'production'
// const port = process.env.PORT || 4444
// const base = process.env.BASE || '/'

// // Cached production assets
// const templateHtml = isProduction
//   ? await fs.readFile('./dist/client/index.html', 'utf-8')
//   : ''

// // Create http server
// const app = express()
// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// // Routing Server API
// console.log("server route hits");
// app.use("/api", apiRoutes);

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     success: true, 
//     message: 'Server is running',
//     timestamp: new Date()
//   });
// });

// // Routing react browser app
// app.get("*all", (req, res) => {
//     // ...

//     //console.log('check',`${path.resolve(__dirname, "build", "index.html")}`)
//     res.sendFile(path.resolve(__dirname, "build", "index.html"));
// });
// // Serve static files (uploaded resumes)
// //app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('✅ MongoDB connected successfully'))
// .catch((err) => console.error('❌ MongoDB connection error:', err));


// // const recruiterRoutes = require('./routes/recruiter');
// // const jobseekerRoutes = require('./routes/jobseeker');

// mongoose.connect(process.env.MONGODB_URI) // Use the variable directly
//     .then(() => console.log('✅ MongoDB connected successfully'))
//     .catch((err) => console.error('❌ MongoDB connection error:', err));



// // Add Vite or respective production middlewares
// // /** @type {import('vite').ViteDevServer | undefined} */
// // let vite
// // if (!isProduction) {
// //   const { createServer } = await import('vite')
// //   vite = await createServer({
// //     server: { middlewareMode: true },
// //     appType: 'custom',
// //     base,
// //   })
// //   app.use(vite.middlewares)
// // } else {
// //   const compression = (await import('compression')).default
// //   const sirv = (await import('sirv')).default
// //   app.use(compression())
// //   app.use(base, sirv('./dist/client', { extensions: [] }))
// // }

// // app.use("/api", require("./src/routes/api"));

// // // API Routes
// // app.use('/api/v2/auth', authRoutes);
// // app.use('/api/v2/jobs', jobRoutes);
// // app.use('/api/recruiter', recruiterRoutes);
// // app.use('/api/jobseeker', jobseekerRoutes);


// // Serve HTML
// // app.use('*all', async (req, res) => {
// //   try {
// //     console.log('route all')
// //     const url = req.originalUrl.replace(base, '')

// //     /** @type {string} */
// //     let template
// //     /** @type {import('./src/entry-server.js').render} */
// //     let render
// //     if (!isProduction) {
// //       // Always read fresh template in development
// //       template = await fs.readFile('./index.html', 'utf-8')
// //       template = await vite.transformIndexHtml(url, template)
// //       render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
// //     } else {
// //       template = templateHtml
// //       render = (await import('./dist/server/entry-server.js')).render
// //     }

// //     const rendered = await render(url)

// //     const html = template
// //       .replace(`<!--app-head-->`, rendered.head ?? '')
// //       .replace(`<!--app-html-->`, rendered.html ?? '')

// //     res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
// //   } catch (e) {
// //     vite?.ssrFixStacktrace(e)
// //     console.log(e.stack)
// //     res.status(500).end(e.stack)
// //   }
// // })

// // Start http server
// app.listen(port, () => {
//   console.log(`Server started at http://localhost:${port}`)
// })
