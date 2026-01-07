/**
 * setUploadContext(type, options)
 *
 * type: 'resume' | 'picture' | 'generic'
 * options: {
 *   ref: 'user'|'application'|'job'|custom,
 *   idFrom: 'params.jobId' | 'body.applicationId' | 'user.id', // where to get the id
 *   subfolder: 'resumes'|'avatars' etc optional
 * }
 *
 * Example usage:
 *   router.post('/apply/:jobId', authenticateToken, setUploadContext('resume', { ref: 'application', idFrom: 'body.applicationId' }), upload.single('resume'), handler)
 */
export default function setUploadContext(type = 'generic', opts = {}) {
  return (req, res, next) => {
    try {
      const ctx = {};
      ctx.type = type;
      ctx.ref = opts.ref || 'user';

      // id resolution helpers
      const idFrom = opts.idFrom;
      let refId = null;
      if (idFrom) {
        // idFrom may be 'params.jobId' or 'body.applicationId' or 'user.id'
        const parts = idFrom.split('.');
        let cur = req;
        for (const p of parts) {
          if (cur == null) break;
          cur = cur[p];
        }
        refId = cur;
      }

      // fallback: applicationId in body, then params, then user id
      if (!refId) refId = req.body?.applicationId || req.params?.applicationId || req.params?.jobId || (req.user && req.user.id) || req.user?.userId;

      ctx.refId = String(refId || 'unknown');
      ctx.subfolder = opts.subfolder || (type === 'picture' ? 'avatar' : (type === 'resume' ? 'resumes' : 'files'));

      req.uploadContext = ctx;
      next();
    } catch (err) {
      next(err);
    }
  };
}
