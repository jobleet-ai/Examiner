const jobsReducer = (state = { query: "", pquery: "", show: true}, action) => {
    switch (action.type) {
      case "FETCH_JOB_REQUEST":
        return state;

      case "FETCH_JOB_SUCCESS": 
        return {...state, result: action.payload};        

      case "SEARCH_JOB_QUERY": 
        return {...state, query: action.payload};

      case "SEARCH_PROFILE_QUERY": 
        return {...state, pquery: action.payload};

      case "SEARCH_SHOW": 
        return {...state, show: action.payload};

      default:
        return state;
    }
  } 

  export default jobsReducer