import path from 'path';
import fs from 'fs/promises';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

// Allowed extensions per type
const ALLOWED = {
  resume: ['.pdf', '.doc', '.docx', '.txt'],
  picture: ['.png', '.jpg', '.jpeg', '.gif'],
  generic: ['.pdf', '.doc', '.docx', '.txt', '.png', '.jpg', '.jpeg', '.gif']
};

// Mime type map optional (extra safety)
const ALLOWED_MIME = {
  resume: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
  picture: ['image/png', 'image/jpeg', 'image/gif'],
  generic: []
};

// base upload folder (publicly served)
export const UPLOAD_BASE = path.join(process.cwd(), 'public', 'uploads');

function sanitizeSegment(segment) {
  // basic sanitize - remove slashes and suspicious chars
  return String(segment || '').replace(/[^a-zA-Z0-9-_]/g, '_');
}

// create diskStorage that uses req.uploadContext set by middleware
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const ctx = req.uploadContext || {};
      // Example ctx: { type: 'resume'|'picture'|'generic', ref: 'user'|'application', refId: '123', subfolder: 'resumes' }
      const type = ctx.type || 'generic';
      const ref = ctx.ref || 'user';
      const refId = sanitizeSegment(ctx.refId || (req.user && req.user.id) || 'anon');
      const subfolder = ctx.subfolder || (type === 'picture' ? 'pictures' : (type === 'resume' ? 'resumes' : 'files'));

      const uploadDir = path.join(UPLOAD_BASE, type, ref, refId, subfolder);
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    // keep original extension, but generate unique name
    const ext = path.extname(file.originalname).toLowerCase();
    const id = uuidv4();
    // optional: preserve some original name slug
    const nameBase = path.basename(file.originalname, ext).slice(0, 40).replace(/[^a-zA-Z0-9-_]/g, '_');
    cb(null, `${id}_${nameBase}${ext}`);
  }
});

/**
 * generic fileFilter uses req.uploadContext.type to decide allowed extensions/mime
 */
function fileFilter(req, file, cb) {
  const ctx = req.uploadContext || {};
  const type = ctx.type || 'generic';
  const ext = path.extname(file.originalname).toLowerCase();

  // extension check
  const allowedExts = ALLOWED[type] || ALLOWED.generic;
  if (!allowedExts.includes(ext)) {
    return cb(new Error(`Invalid file type. Allowed extensions: ${allowedExts.join(', ')}`));
  }

  // optional mime check (if defined)
  const allowedMimes = ALLOWED_MIME[type] || [];
  if (allowedMimes.length > 0 && !allowedMimes.includes(file.mimetype)) {
    return cb(new Error('Invalid mime type for this upload.'));
  }

  cb(null, true);
}

export const createUploader = ({ limits = { fileSize: 5 * 1024 * 1024 } } = {}) => {
  return multer({ storage, fileFilter, limits });
};
