const initialState = {
    shortlistedCandidates: [],
  };
  
  const shortlistReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SHORTLIST_CANDIDATE':
        const candidateId = action.payload;
        const isCandidateShortlisted = state.shortlistedCandidates.includes(candidateId);
        if (!isCandidateShortlisted) {
          return {
            ...state,
            shortlistedCandidates: [...state.shortlistedCandidates, candidateId],
          };
        }
        return state; 
  
      default:
        return state;
    }
  };
  
  export default shortlistReducer;