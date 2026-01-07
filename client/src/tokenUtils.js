export const isAuth = () => {
  if (typeof localStorage !== 'undefined') {
    return getItem("token");
  }
  return false;
}
export const clear = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.clear();
  }
  
}

export const userType = () => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem("type");
  }
  return '';
}

export const getItem = (key) => {
   if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}

export const setItem = (key, value) => {
   if (typeof localStorage !== 'undefined') {
    return localStorage.setItem(key, value);
  }
  return null;
}

export const removeItem = (key) => {
   if (typeof localStorage !== 'undefined') {
    return localStorage.removeItem(key);
  }
  return null;
}