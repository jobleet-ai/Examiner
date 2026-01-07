import { fetchDataWoToken } from "@/config/apiService"
import API_BASE from "@/config/API_BASE";

export const loadBlobData = async(file)=>{

    try {
        console.log('file:', file);
        const signedurl = API_BASE.signedurl;
        const api = `${signedurl}?filename=${file}`;
        //const api = `${signedurl}`;

        const {url} = await fetchDataWoToken(api);
        //console.log('signed url', url)

        return url;
    
        } catch(err) {
            console.log('Some error:', err)
        }

        return null;
    }
 
//  export const loadBlobData = async(file)=>{
//      return generateCloudinaryUrl(file); 
//  }
 
//  const cloudinaryBasePath = 'https://res.cloudinary.com/dbg5xqub7/raw/upload/v1730139034'
 
//  function generateCloudinaryUrl(fileName) {
//      return `${cloudinaryBasePath}/${fileName}`;
//  }
    
