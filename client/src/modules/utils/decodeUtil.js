export function a2b(a) {
    var b, c, d, e = {}, f = 0, g = 0, h = "", i = String.fromCharCode, j = a.length;
    for (b = 0; 64 > b; b++) e["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(b)] = b;
    for (c = 0; j > c; c++) for (b = e[a.charAt(c)], f = (f << 6) + b, g += 6; g >= 8; ) ((d = 255 & f >>> (g -= 8)) || j - 2 > c) && (h += i(d));
    return h;
  }
  

  /**
 * Encodes a string (including full Unicode/UTF-8) into a Base64 string.
 * @param {string} str The string to encode.
 * @returns {string} The Base64 encoded string.
 */
export function encodeBase64(str) {
  // 1. Encode the string to a UTF-8 byte array (Uint8Array)
  const utf8Bytes = new TextEncoder().encode(str);
  
  // 2. Convert the byte array to a "binary string" (where each char is a byte)
  const binaryString = String.fromCodePoint(...utf8Bytes);
  
  // 3. Use the standard btoa to encode the binary string
  return btoa(binaryString);
}

/**
 * Decodes a Base64 string back into a regular string, handling full Unicode/UTF-8.
 * @param {string} base64 The Base64 string to decode.
 * @returns {string} The decoded raw string.
 */
export function decodeBase64(base64) {
  // 1. Use the standard atob to decode the Base64 string into a "binary string"
  const binaryString = atob(base64);

  // 2. Convert the "binary string" back into a byte array
  const utf8Bytes = Uint8Array.from(binaryString, (m) => m.codePointAt(0));

  // 3. Decode the byte array using TextDecoder to get the original UTF-8 string
  return new TextDecoder().decode(utf8Bytes);
}

