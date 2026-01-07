import express from 'express';
const router = express.Router();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 * Note: when creating a signed URL, unless running in a GCP environment,
 * a service account must be used for authorization.
 */
// The ID of your GCS bucket
const bucketName = 'joblient';
const folderName = 'workspace';

// The full path of your file inside the GCS bucket, e.g. 'yourFile.jpg' or 'folder1/folder2/yourFile.jpg'
// const fileName = 'your-file-name';

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
//const storage = new Storage();

const storage = new Storage({
  projectId: 'joblient',
  keyFilename: 'joblient-3b0b8ac3002e.json'
});


async function getSignedUrl(file) {
  const fileName = `${folderName}/${file}`;
  let myDate = new Date(); 

  myDate.setMinutes(myDate.getMinutes() + 5);

  const [url] = await storage
      .bucket(bucketName)
      .file(fileName)
      .getSignedUrl({
          action: 'read',
          expires: myDate      //'12-31-2025 00:00:00' // Set expiration date
      });
      //console.log(`curl '${url}'`);
  return url;
  //setFileUrl(url);
}



router.get("/", async(req, res)=>{
    console.log('signedurl url Invoked:', req.query.filename);
    let file = req.query.filename;
  
    let url = await getSignedUrl(file);

    res.json({url: url});
})

export default router;