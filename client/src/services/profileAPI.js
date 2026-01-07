import { getItem } from '../auth/tokenUtils';
import API_BASE from '@/config/API_BASE';

 function authHeaders(isJSON = true) {
  return {
    ...(isJSON ? { 'Content-Type': 'application/json' } : {}),
    'Authorization': `Bearer ${getItem('token')}`
  };
}

 async function handleResponse(response) {
  const contentType = response.headers.get("content-type");
  let data = null;

  try {
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }
  } catch (e) {
    console.error("Response parse error:", e);
  }

  if (!response.ok) {
    throw new Error(data?.message || data?.error || 'Request failed');
  }

  return data;
}


export async function getRecruiterProfile() {
  const response = await fetch(`${API_BASE.RECRUITERS}`, {
    method: 'GET',
    headers: authHeaders()
  });

  return handleResponse(response);
}

export async function getMyRecruiterProfile() {
  const response = await fetch(`${API_BASE.RECRUITERS}/me`, {
    method: 'GET',
    headers: authHeaders()
  });

  return handleResponse(response);
}


export async function createRecruiterProfile(payload) {
  const response = await fetch(`${API_BASE.RECRUITERS}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload)
  });

  return handleResponse(response);
}


export async function updateRecruiterProfile(id, updates) {
  const response = await fetch(`${API_BASE.RECRUITERS}/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(updates)
  });

  return handleResponse(response);
}

export async function deleteRecruiterProfile(id) {
  const response = await fetch(`${API_BASE.RECRUITERS}/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });

  return handleResponse(response);
}






/* -------------------------
   Profile CRUD API
   Base endpoint example: API_BASE.PROFILE should point to '/api/profiles' or similar
   ------------------------- */

/**
 * Get the authenticated user's profile
 */
export async function getMyProfile() {
  const res = await fetch(`${API_BASE.PROFILES}/me`, {
    method: 'GET',
    headers: authHeaders()
  });
  return handleResponse(res);
}

/**
 * Get profile by profileId
 * @param {string} id
 */
export async function getProfileById(id) {
  const res = await fetch(`${API_BASE.PROFILES}/${id}`, {
    method: 'GET',
    headers: authHeaders()
  });
  return handleResponse(res);
}

/**
 * List profiles with optional query params: ?page=1&limit=20&q=search
 */
export async function listProfiles(params = {}) {
  const q = new URLSearchParams(params).toString();
  const url = q ? `${API_BASE.PROFILES}?${q}` : `${API_BASE.PROFILES}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: authHeaders()
  });
  return handleResponse(res);
}

/**
 * Create profile
 * @param {object} payload
 */
export async function createProfile(payload) {
  const res = await fetch(`${API_BASE.PROFILES}`, {
    method: 'POST',
    headers: authHeaders(true),
    body: JSON.stringify(payload)
  });
  return handleResponse(res);
}

/**
 * Update profile (partial)
 * @param {string} id
 * @param {object} updates
 */
export async function updateProfile(id, updates) {
  console.log('`${API_BASE.PROFILES}/${id}`', `${API_BASE.PROFILES}/${id}`)
  const res = await fetch(`${API_BASE.PROFILES}/${id}`, {
    method: 'PATCH',
    headers: authHeaders(true),
    body: JSON.stringify(updates)
  });
  return handleResponse(res);
}

/**
 * Delete profile
 * @param {string} id
 */
export async function deleteProfile(id) {
  const res = await fetch(`${API_BASE.PROFILES}/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  return handleResponse(res);
}

/* -------------------------
   Media upload helpers
   ------------------------- */

/**
 * Upload avatar (PATCH /profiles/:id/avatar)
 * @param {string} profileId
 * @param {File} file - image file object from <input type="file" />
 */
export async function uploadAvatar(profileId, file) {
  if (!file) throw new Error('No file provided');
  const fd = new FormData();
  fd.append('avatar', file);

  const res = await fetch(`${API_BASE.PROFILES}/${profileId}/avatar`, {
    method: 'PATCH',
    headers: {
      Authorization: authHeaders(false).Authorization // only auth header, no Content-Type
    },
    body: fd
  });
  return handleResponse(res);
}

/**
 * Upload resume (POST /profiles/:id/resume)
 * @param {string} profileId
 * @param {File} file - resume file (pdf/doc/docx/txt)
 *
 * If file is omitted, you can optionally send fallback metadata to request
 * the server to set a default resume path. Most servers expect a file here.
 */
// export async function uploadResume(profileId, file) {
//   const fd = new FormData();
//   if (file) {
//     fd.append('resume', file);
//   } else {
//     // if you explicitly want to pass a workspace fallback path, include it in form data
//     // NOTE: This will only be used if the backend supports that behavior
//     fd.append('fallbackPath', DEFAULT_WORKSPACE_FILE_PATH);
//   }

//   const res = await fetch(`${API_BASE.PROFILES}/${profileId}/resume`, {
//     method: 'POST',
//     headers: {
//       Authorization: authHeaders(false).Authorization
//     },
//     body: fd
//   });
//   return handleResponse(res);
// };

 export async function uploadFile(type, file, id) {
    // profile always should be upload to server even running from local
    //const url_base = "https://jobleet.com/api/v2/profiles/upload/";
    const isAvatar = type === 'avatar';
    const url = isAvatar ? API_BASE.AVATAR_UPLOAD : API_BASE.RESUME_UPLOAD;
    //const url = isAvatar ? url_base + "avatar" : url_base + "resume";
    console.log(`[API] Uploading ${type} to ${url} ...`);
    
    const formData = new FormData();
    formData.append(isAvatar ? 'avatar' : 'resume', file);

    const response = await fetch(`${API_BASE.PROFILES}/${id}/${type}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getItem('token')}`
        },
        body: formData
    });
    if (!response.ok) throw new Error(`Failed to upload ${type}`);
    const data = await response.json();
    console.log(`[API] Uploaded ${type}:`, data);
    // API should return the public URL for the file
    return data.fileUrl;
  }


/* -------------------------
   Convenience wrapper examples
   ------------------------- */

/**
 * Save profile (creates if no id, updates if id)
 * @param {object} profile - if includes _id -> update; otherwise create
 */
export async function saveProfile(profile) {
  if (!profile) throw new Error('Profile required');
  if (profile._id) {
    return updateProfile(profile._id, profile);
  }
  return createProfile(profile);
}

export async function parseResume(file) {

}