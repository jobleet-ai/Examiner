import express from "express";
console.log("ApiRoute");
const router = express.Router();
// Import Routes
import v2Routes from './v2/V2Route.js';
import Job from "../../models/Job.js";


// API Routes
router.use('/v2/', v2Routes);

router.get('/sitemap.xml', async (req, res) => {
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

export default router;
