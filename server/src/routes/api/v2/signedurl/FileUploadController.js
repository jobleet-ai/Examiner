import { Storage } from'@google-cloud/storage';

const storage = new Storage({
  projectId: 'helpful-chiller-482303-c8',
  keyFilename: '/home/jobleet/keys/jobleet_file_upload_key.json', // Full path to the downloaded file
});

const BUCKET_NAME = 'jobleet';

/**
 * Generates a signed URL for uploading files
 * @param {string} userId - The ID of the user
 * @param {string} fileType - 'resume' or 'photo'
 * @param {boolean} saveToProfile - If true, targets the profile folder
 * @param {string} jobId - (Optional) ID of the job if applying
 */

 const generateUploadUrl = async (userId, fileType, saveToProfile, jobId, contentType) => {
  let filePath = '';
  
  // Ensure we use the correct extension based on the actual mime type
  const extension = contentType.split('/')[1]; 

  if (fileType === 'avatar') {
    filePath = `profiles/photos/${userId}.${extension}`;
  } else {
    filePath = saveToProfile 
      ? `profiles/resumes/${userId}.pdf` 
      : `applications/resumes/${userId}_${jobId}_${Date.now()}.pdf`;
  }

  const options = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000,
    contentType: contentType, // This MUST match the frontend exactly
  };

  const [url] = await storage.bucket(BUCKET_NAME).file(filePath).getSignedUrl(options);
  return { url, filePath };
};
/**
 * Explicitly delete a file (for the "Remove" button)
 */
async function deleteFile(filePath) {
  try {
    await storage.bucket(BUCKET_NAME).file(filePath).delete();
    return { success: true };
  } catch (error) {
    // If file doesn't exist, we don't want to crash
    if (error.code === 404) return { success: true };
    throw error;
  }
}

// storage-service.js
const getDownloadUrl = async (filePath, originalFileName) => {
  const options = {
    version: 'v4',
    action: 'read',
    expires: Date.now() + 60 * 60 * 1000, // 1 hour
    //contentType: 'application/pdf', // Force this for resumes
    // This forces the browser to download the file with its original name
    responseDisposition: `attachment; filename="${originalFileName}"`,
  };
 console.log("filePath", originalFileName);
  try {
    const [url] = await storage.bucket(BUCKET_NAME).file(filePath).getSignedUrl(options);
    return url;
  } catch (error) {
    console.error("Error generating download URL:", error);
    throw error;
  }
};

const getReadUrl = async (filePath, time=24*60*60*1000) => {
  const options = {
    version: 'v4',
    action: 'read',
    expires: Date.now() + time, // URL lasts for 24 hours
  };

  const [url] = await storage
    .bucket(BUCKET_NAME)
    .file(filePath)
    .getSignedUrl(options);

  return url;
};


 const createResumeSnapshot = async (userId, jobId) => {
  const profilePath = `profiles/resumes/${userId}.pdf`;
  const timestamp = Date.now();
  const snapshotPath = `applications/resumes/${userId}_${jobId}.pdf`;

  try {
    // Copy the file within the same bucket
    await storage
      .bucket(BUCKET_NAME)
      .file(profilePath)
      .copy(storage.bucket(BUCKET_NAME).file(snapshotPath));
    console.log("Resume snapshot created:", snapshotPath);
    return snapshotPath;
  } catch (error) {
    console.error("Error creating resume snapshot:", error);
    throw new Error("Could not capture profile resume for application.");
  }
};

export { generateUploadUrl, deleteFile , getDownloadUrl, getReadUrl, createResumeSnapshot};