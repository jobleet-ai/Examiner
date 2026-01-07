import axios from "axios";
import { getItem } from ".@/auth/tokenUtils";

export function fetchJobsRequest(){
    return {
      type: "FETCH_JOB_REQUEST"
    }
  }
  
  export function fetchJobsSuccess(payload) {
    return {
      type: "FETCH_JOB_SUCCESS",
      payload
    }
  }

  export function setSearchJobQuery(payload) {
    return {
      type: "SEARCH_JOB_QUERY",
      payload
    }
  }

  export function setSearchProfileQuery(payload) {
    return {
      type: "SEARCH_PROFILE_QUERY",
      payload
    }
  }

  export function setSearchBar(payload) {
    return {
      type: "SEARCH_SHOW",
      payload
    }
  }
  
  function fetchJobsError() {
    return {
      type: "FETCH_JOB_ERROR"
    }
  }
  
  export function fetchJobs(address) {
    return async (dispatch, getState) => {
        try {
          axios
          .get(address, {
            headers: {
              Authorization: `Bearer ${getItem("token")}`,
            },
          })
          .then((response) => {
            console.log('response.data:', response)
           dispatch(fetchJobsSuccess(response.data));
          })
          .catch((err) => {
            console.log(err.response.data);
          });
        }
        catch(err) {
          console.log('ERROR:',err)
        }
    }
  }
