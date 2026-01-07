
import axios from "axios";
import API_BASE from "./API_BASE";
import { getItem } from "../auth/tokenUtils";

export const API = API_BASE;

export const saveData = async(api, data, message , setPopup)=>{
    console.log('API SERVCIE save data::', data)
    // if(action) {
    //     dispatch(action([data]));
    // }
    const token = getItem("token");
    try {
        if (token) { 
            let res = await axios
            .post(api, data,
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            )

            setPopup && setPopup({
            open: true,
            severity: "success",
            message:  message + " saved successfully",
            });
            console.log("SAVE", message);
            return res;
        } else {
            setPopup && setPopup({
                open: true,
                severity: "error",
                message: 'To Save Data Login Required',
            });
            console.log('To Save Data Login Required');
            return false;
        }
        } catch(err){
           
            setPopup && setPopup({
                open: true,
                severity: "error",
                message: err.Error ? err.Error : 'Error in saving data',
            });
            console.log(err);
            return false;
        } 
}


export const fetchData = async (api, message , dispatch, action, setPopup)=>{
    const token = getItem("token");
    try{
        let result = await axios.get(api,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        )
        setPopup && setPopup({
            open: true,
            severity: "success",
            message:  message + " fetched successfully",
        });
        if (action) {
            dispatch(action(result.data));
        }
        console.log("FETCH:", message, result.data);
        console.log("FETCH SUCCSS:", message);

        return result.data;

    }catch(err){
        console.log(err.response)
    }
    return null;



    // if (token) {
    //     await axios.get(api,
    //         {
    //         headers: {
    //             Authorization: `Bearer ${getItem("token")}`,
    //         },
    //         }
    //     )
    //     .then((response) => {
    //         setPopup && setPopup({
    //             open: true,
    //             severity: "success",
    //             message:  message + " fetched successfully",
    //         });
    //         if (action) {
    //             dispatch(action(response.data));
    //         }
    //         console.log("FETCH:", message, response.data);
    //         return response.data;

    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         setPopup && setPopup({
    //             open: true,
    //             severity: "error",
    //             message: err.response.data.message,
    //         });
            
    //     });
    // } else {
        
    // }
}

export const fetchDataWoToken = async (api, message)=>{
    try{
        let result = await axios.get(api);
        return result.data;
    }catch(ex){
        console.log(ex)
    }
    return null;
}

export const saveDataWoToken = async(api, data, message , setPopup)=>{
    try{
    await axios
    .post(api, data,
        {
        headers: {
            Authorization: `Bearer ${getItem("token")}`,
        },
        }
    )
    setPopup && setPopup({
        open: true,
        severity: "success",
        message:  message + " Saved Successfully",
    });
    }catch(err){
        console.log(err)
        setPopup && setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
        });
    }
    
}

export const getQuestionsWithoutAuth = async (api, message, dispatch, action, setPopup) => {
    // const token = getItem("token");
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTY0YjY3YzZlMTU2ZjQwZmQxYjg3YzIiLCJpYXQiOjE3MDEwOTkxMzJ9.RUCQevhqXg3C1G5jfrfC8N4lu1r7Tt5p6-nO4-jhVZ8'
    try {
        let result = await axios.get(api,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        setPopup && setPopup({
            open: true,
            severity: "success",
            message: message + " fetched successfully",
        });
        if (action) {
            dispatch(action(result.data));
        }
        console.log("FETCH:", message, result.data);
        console.log("FETCH SUCCSS:", message);

        return result.data;

    } catch (err) {
        console.log(err.response)
    }
    return null;
}



export const submitTestResult = async (api, { requestBody, testId }) => {
    const result = await axios.post(api, requestBody);
    const data = await result.data;
    console.log(result);
}

export const createNewTest = async (api,data) => {
    try {
        const response = await axios.post(api, data,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: getItem('token')
            }
        });
        if (response.status !== 201) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = response.data;
        return responseData;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

export const getTestsByRecruiterId = async (api) => {
    try {
        const response = await axios.get(api,
            {
                headers: {
                    Authorization: `Bearer ${getItem("token")}`,
                },
            }
        )
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export const getTestById = async (api) => {
    try {
        const response = await axios.get(api);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}
