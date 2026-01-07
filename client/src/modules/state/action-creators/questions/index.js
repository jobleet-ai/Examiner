export const GET_QUESTION = 'GET_QUESTION';
export const GET_ALL_QUESTIONS = 'GET_ALL_QUESTIONS';
export const SAVE_ANSWER = 'SAVE_ANSWER';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';


export const getQuestion = (payload) => {
  return (dispatch) => {
      dispatch({
          type: GET_QUESTION,
          payload
      })
  }
}

export const getAllQuestions = (payload) => {
  return (dispatch) => {
      dispatch({
          type: GET_ALL_QUESTIONS,
          payload
      })
  }
}

export const saveAnswer = (payload) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_ANSWER,
      payload
    })
  }
}

export const addQuestions = (payload) => {
  return (dispatch) => {
    dispatch({
      type: ADD_QUESTIONS,
      payload,
    });
  };
};
