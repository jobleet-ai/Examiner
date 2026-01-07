export const SHORTLIST_CANDIDATE = 'SHORTLIST_CANDIDATE';

export const shortlistCandidate = (payload) => {
  return (dispatch) => {
      dispatch({
          type: SHORTLIST_CANDIDATE,
          payload
      })
  }
}