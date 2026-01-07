import { Storage } from '@google-cloud/storage';
const storage = new Storage();

async function createJobleetBucket() {
  const bucketName = 'jobleet-resumes'; // MUST be globally unique
  try {
    await storage.createBucket(bucketName, {
      location: 'asia-south2', // Delhi region
      storageClass: 'STANDARD',
    });
    console.log(`Bucket ${bucketName} created successfully.`);
  } catch (err) {
    console.error('ERROR:', err.message);
  }
}

createJobleetBucket();