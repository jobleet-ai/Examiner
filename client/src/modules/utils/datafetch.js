import { setItem } from "../auth/tokenUtils";
import { API, fetchData, fetchDataWoToken } from "@/config/apiService";

export const fetchWSData = async(key)=>{
    console.log("Fetching course data: ", key);
    let found = false;
    let data = [];

    // if (getItem(key)) {
    //     console.log('data available in local cache', key, data);
    //     try {
    //         data = JSON.parse(getItem(key));
    //         found = true;
    //         return data;
    //     }catch(ex) {
    //         console.log('json parse error:', ex);
    //         found = false;
    //     }
    // } 
    if (found === false) {
        let res = await fetchData(`${API.ws}?key=${key}`, key);
        data = res;
        setItem(key, JSON.stringify(res));
        return data;
    }
    //console.log('fetchWSData:', res)
   
}