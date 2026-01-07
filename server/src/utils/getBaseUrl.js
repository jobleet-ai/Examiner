import path from 'path';

// utils/getBaseUrl.js
export function getBaseUrl(req) {


  // 2) If behind proxy and trust proxy=true, req.protocol should reflect forwarded proto.
  //    Use host header (may include port).
  const proto = (req.headers['x-forwarded-proto'] || req.protocol || 'http').split(',')[0].trim();
  // prefer x-forwarded-host if present (could be set by load balancer)
  const host = req.headers['x-forwarded-host'] || req.get('host');

  console.log("getBaseUrl host:", proto,host);
  // 1) Explicit environment override (strongly recommended)
  if (!host.includes('localhost') && process.env.BASE_URL) {
    console.log("process.env.BASE_URL:",process.env.BASE_URL);
    return process.env.BASE_URL.replace(/\/+$/, ''); // trim trailing slash
  }
  console.log("OUTSide , process.env.BASE_URL:",process.env.BASE_URL );

  // 3) If host is missing, fallback to localhost with configured port
  if (!host) {
    const port = process.env.PORT || '4444';
    return `${proto}://localhost:${port}`;
  }

  return `${proto}://${host}`;
}

export function filePathToPublicUrl(req, absolutePath) {
  // Example absolutePath:
  // D:\projects\joblient\jobportal\server\public\uploads\profiles\<id>\file.pdf
  // We assume static is served at /uploads -> public/uploads
  const uploadsRoot = path.join(process.cwd(), 'public', 'uploads') + path.sep; // ends with separator

  // If absolutePath contains the uploadsRoot, map to URL path part
  const idx = absolutePath.indexOf(uploadsRoot);
  if (idx >= 0) {
    const rel = absolutePath.slice(idx + uploadsRoot.length).replace(/\\/g, '/'); // normalize windows separators
    const base = getBaseUrl(req);
    return `${base}/uploads/${rel}`;
  }

  // If not a local upload path, fallback to absolutePath (or null)
  return null;
}

