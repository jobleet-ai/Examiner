
import express from 'express';

import { Storage } from'@google-cloud/storage';
import { authenticateToken } from '../../../../middleware/auth.js';
import { IAMCredentialsClient } from '@google-cloud/iam-credentials';
import { generateUploadUrl, deleteFile, getDownloadUrl, getReadUrl } from './FileUploadController.js'
import User from '../../../../models/User.js';
import UserProfile from '../../../../models/UserProfile.js';
import Application from '../../../../models/Application.js';
const router = express.Router();


// POST /api/get-upload-link
router.post('/get-upload-link', authenticateToken, async (req, res) => {
    console.log("get-upload-link hit", req.body);
  const { fileType, saveToProfile, jobId, contentType } = req.body;
  const userId = req.user?.userId;
  console.log("get-upload-link hit")
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const result = await generateUploadUrl(userId, fileType, saveToProfile, jobId, contentType);
    console.log("get-upload-link", result);
    // If saving to profile, update your DB with the new path
    if (saveToProfile) {
    //   await db.collection('users').doc(userId).update({
    //     [fileType === 'photo' ? 'photoPath' : 'resumePath']: result.filePath
    //   });
        if (fileType === 'avatar') {
            const updates = { avatar: result.filePath };
            const updated = await User.findByIdAndUpdate(userId, { $set: { avatar: result.filePath } }, { new: true });
            await UserProfile.findOneAndUpdate({userId}, {$set: { avatar: result.filePath } }, { new: true });
        } else {
            const updates = { resumeUrl: result.filePath };
            const updated = await UserProfile.findOneAndUpdate({userId}, { $set: updates }, { new: true });
        }
    } 
    // else if (jobId){
    //         const updates = { resumePath: result.filePath };
    //         const updated = await Application.findOneAndUpdate({jobId}, { $set: updates }, { new: true });
    //         console.log("updated resume url", updated?.resumePath);
    // }
    res.json(result);
  } catch (err) {
    console.log('signederror', err.message);
    res.status(500).json({ error: 'Failed to generate upload link' });
  }
});

// DELETE /api/remove-file
router.delete('/remove-file', authenticateToken, async (req, res) => {
  const userId = req.user?.userId;
  const { fileType } = req.body;
  const filePath = fileType === 'avatar' ? `profiles/photos/${userId}.jpg` : `profiles/resumes/${userId}.pdf`;
  console.log("remove-link hit")
  try {
    await deleteFile(filePath);

    if (fileType === 'avatar') {
        const updated = await User.findOneAndUpdate({userId}, { $set: { avatar: null } }, { new: true });
        await UserProfile.findOneAndUpdate({userId}, {$set: { avatar: null } }, { new: true });
    } else {
        const updated = await UserProfile.findOneAndUpdate({userId}, {$set: { resumeUrl: null } }, { new: true });
        console.log("updated resume url", updated?.resumeUrl);

    }
    res.json({ message: 'Removed successfully'});
  } catch (err) {
    console.log('removeerror', err.message);
    res.status(500).json({ error: 'Failed to remove file' });
  }
});

router.post('/generate-download-link', authenticateToken, async (req, res) => {
  try {
    const { filePath, originalName } = req.body;

    if (!filePath) {
      return res.status(400).json({ error: "File path is required" });
    }

    console.log('downloadFile:', originalName);
    // Generate the URL. We pass originalName so the downloaded 
    // file has a friendly name instead of a random ID.
    const downloadUrl = await getDownloadUrl(filePath, originalName || 'download.pdf');

    res.json({ url: downloadUrl });
  } catch (error) {
    console.error("Download Route Error:", error);
    res.status(500).json({ error: "Could not generate download link" });
  }
});

router.get("/", async(req, res)=>{
    console.log('get read signed url Invoked:', req.query.filename);
    let file = req.query.filename;
  
    let url = await getReadUrl(file, 5*60*1000);
     console.log("read url", url);

    res.json({url: url});
})

export default router;