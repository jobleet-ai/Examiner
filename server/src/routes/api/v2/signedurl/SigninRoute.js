import express from 'express';
import AWS from 'aws-sdk';

const router = express.Router();


const bucketName = 'joblient';
const folderName = 'workspace';


// Configure AWS credentials (replace with your actual credentials)
AWS.config.update({
    accessKeyId: 'AKIATQZCSWIFK43LYJ42',
    secretAccessKey: 'bb3hNWt7QXel8zw8JMxUz3FfNwgioFg7wRvSFp7S',
    region: 'ap-south-1' // e.g., 'us-east-1'
  });
  
  const s3 = new AWS.S3();


async function getSignedUrl(file) {
  const fileName = `${folderName}/${file}`;

      const params = {
        Bucket: bucketName, 
        Key: fileName, 
        Expires: 60 * 2 // URL will expire in 1 hour (seconds)
      };
      var signedURL = ''

      await s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) {
          console.error('Error generating signed URL:', err);
        } else {
          //console.log('Signed URL:', url);
          signedURL = url;
          // Use the generated URL to access the object 
        }
      });
      console.log('signedURL:', signedURL);
      return signedURL;
}

router.get("/", async(req, res)=>{
    console.log('signedurl url Invoked:', req.query.filename);
    let file = req.query.filename;
  
    let url = await getSignedUrl(file);

    res.json({url: url});
})

export default router;



