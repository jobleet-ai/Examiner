import { 
  GET_ALL_QUESTIONS,
  GET_QUESTION, 
  SAVE_ANSWER,
  ADD_QUESTIONS
} from "../../action-creators/questions";

const initialState = {
  questions: [],
  score: 0
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTION:
      const { index } = action.payload;
      return {
        ...state,
        currentQuestion: state.questions[index],
      };

    case GET_ALL_QUESTIONS:
      return {
        ...state,
        questions: state.questions,
      };

    case SAVE_ANSWER:
      const { questionIndex, check } = action.payload;
      let isRight = false;
      const updatedQuestionsForSaveAnswer = state.questions.map((q, idx) =>
        idx === questionIndex ? { ...q, check } : q
        );
        console.log('check = ',check,'question = ',state.questions[questionIndex])
      if(check === state.questions[questionIndex]._ps) isRight = true;
      return {
        ...state,
        questions: updatedQuestionsForSaveAnswer,
        score: isRight ? state.score+1 : state.score
      };

    case ADD_QUESTIONS:
      // Concatenate the new questions from the payload to the existing questions array
      const updatedQuestionsForAdd = [...state.questions, ...action.payload];
      return {
        ...state,
        questions: updatedQuestionsForAdd,
      };

    default:
      return state;
  }
};

export default questionReducer;