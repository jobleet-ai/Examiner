// utils/slugify.js
export function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .normalize("NFKD")                  // decompose diacritics
    .toLowerCase()
    .trim()
    .replace(/['"`]/g, "")              // remove quotes
    .replace(/[^a-z0-9\s-]/g, "")       // remove invalid chars
    .replace(/\s+/g, "-")               // spaces to hyphens
    .replace(/-+/g, "-")                // collapse multiple hyphens
    .slice(0, 100);                     // optional: limit length
}
