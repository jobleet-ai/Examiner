//import { loadWSData, loadWorkspace } from "../../../utils/dataUtils";

export const addNewCode = (payload) => {
    return (dispatch) => {
        dispatch({
            type: "ADD_CODE_ITEM",
            payload
        })
    }
}

export const deleteCode = (payload) => {
  console.log('delete code::', payload);
  return (dispatch) => {
      dispatch({
          type: "DELETE_CODE_ITEM",
          payload
      })
  }
}


export const editProblem = (form) => {
    return (dispatch) => {
        dispatch({
            type: "EDIT_PROBLEM",
            payload: form
        })
    }
}

export const selectProblem = (index) => {
    return (dispatch) => {
        dispatch({
            type: "SELECT_PROBLEM",
            payload: index
        })
    }
}

export const removeProblem = (index) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_PROBLEM",
            payload: index
        })
    }
}


// State argument is not application state, only the state
// this reducer is responsible for
export const selectCourseItem = (payload)=> {
  return (dispatch) => {
    dispatch({
        type: "SELECT_COURSE_ITEM",
        payload
    })
}
}

// State argument is not application state, only the state
// this reducer is responsible for
export const addToRevision = (payload)=> {
  return (dispatch) => {
    dispatch({
        type: "ADD_TO_REVISION",
        payload
    })
}
}

// State argument is not application state, only the state
// this reducer is responsible for
export const selectCourseOption = (payload)=> {
  return (dispatch) => {
    dispatch({
        type: "SELECT_COURSE_OPTION",
        payload
    })
}
}


export function fetchCodingSuccess(payload) {
    return {
      type: "FETCH_CODING_SUCCESS",
      payload
    }
  }

  export function fetchDesignSuccess(payload) {
    return {
      type: "FETCH_DESIGN_SUCCESS",
      payload
    }
  }

  export function fetchConceptsSuccess(payload) {
    return {
      type: "FETCH_CONCEPTS_SUCCESS",
      payload
    }
  }

  export function fetchCourseOptions(payload) {
    return {
      type: "FETCH_COURSE_OPTIONS",
      payload
    }
  }

  export function fetchWorkspaceSuccess(payload) {
    return {
      type: "FETCH_WORKSPACE",
      payload
    }
  }

  export function manageInterview(payload) {
    return {
      type: "INTERVIEW_SESSIONS",
      payload
    }
  }
  
  export function activeInterview(payload) {
    return {
      type: "ACTIVE_INTERVIEW",
      payload
    }
  }

  export function setWorkSpaceItems(payload) {
    return {
      type: "WORKSPACE_ITEMS",
      payload
    }
  }

  export function setWorkSpaceSelect(payload) {
    return {
      type: "WORKSPACE_SELECT",
      payload
    }
  } 

export function fetchCourses(userGroup) {
    return async (dispatch, getState) => {
        try {
          console.log('fetchCourses fetchCourses:')
          //const wsData = loadWorkspace(dispatch);
          //console.log('wsData:', wsData)
          //dispatch(fetchWorkspaceSuccess(wsData));

          return;


        //   axios
        //   .get(address, {
        //     headers: {
        //       Authorization: `Bearer ${getItem("token")}`,
        //     },
        //   })
        //   .then((response) => {
        //    dispatch(fetchJobsSuccess(response.data));
        //   })
        //   .catch((err) => {
        //     //console.log(err.response.data);
        //   });

        //course options load
        // const courseOptions = require("../../../data/course/courseOption").courseOptions;
        // dispatch(fetchCourseOptions(courseOptions));
        // if(courseOptions.length>0){
        //   dispatch(selectCourseOption(courseOptions[0]));
        //   console.log('fetchOCourseptions2:', courseOptions[0]);
        // }


        //load coding set data
      //   const codeSets = require("../../../data/practice-code").codeSets;
      //   console.log('codeSets', codeSets);
      //   //dispatch(fetchCodingSuccess(codeSets));
   

      //   //coding data load
      //   // const problems = require("../../../data/course/coding").problems;
      //   // dispatch(fetchCodingSuccess(problems));
      //   // if(problems.length>0){
      //   //   dispatch(selectCourseItem(problems[0]));
      //   // }

      //   //design data load
      //   const designs = require("../../../data/course/design").designs;
      //   //dispatch(fetchDesignSuccess(designs));

      //   //concepts
      //   const concepts = require("../../../data/course/concept").concepts;
      //   //dispatch(fetchConceptsSuccess(concepts));
      //   let your = []
      //   const wsData1 = loadWSData(your, codeSets, designs, concepts);
      //  // console.log('wsData:', wsData)
      //   dispatch(fetchWorkspaceSuccess(wsData1));

        // if(codeSets.length > 0 && codeSets[0].items.length > 0 ){
        //   dispatch(selectCourseItem(codeSets[0].items[0]));
        // }

        }
        catch(err) {
          console.log('ERROR:',err)
        }
    }
  }

  export function fetchOCourseptions() {
    return async (dispatch) => {
        try {
        //   axios
        //   .get(address, {
        //     headers: {
        //       Authorization: `Bearer ${getItem("token")}`,
        //     },
        //   })
        //   .then((response) => {
        //    dispatch(fetchJobsSuccess(response.data));
        //   })
        //   .catch((err) => {
        //     //console.log(err.response.data);
        //   });

        //coding
        //console.log('fetchOCourseptions1:', courseOptions[0]);
        // const courseOptions = require("../../../data/course/courseOption").courseOptions;
        // dispatch(fetchCourseOptions(courseOptions));
        // if(courseOptions.length>0){
        //   dispatch(selectCourseOption(courseOptions[0]));
        //  // console.log('fetchOCourseptions2:', courseOptions[0]);
        // }

        }
        catch(err) {
          console.log('ERROR:',err)
        }
    }
  }



  // export function addNewCourse(category) {
  //   return async (dispatch) => {
  
  //     if(category =='Coding'){
  //       const temp = require("../../../data/course/coding").addNewCodeTemplate;
  //       temp.prob_id = temp.prob_id + 1;
        
  //       const temp2 = [[],temp];
  //       let newCodeItem = {...temp} //temp2[1];
  //       newCodeItem.prob_id =  temp.prob_id + 1;
  //       newCodeItem.title = "Practice - "+ temp.prob_id ;
  //       dispatch(addNewCode(newCodeItem));
  //     } else if(category == 'design'){

  //     }
  //   }
  // }