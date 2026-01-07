import { combineReducers } from "redux";
import profileReducer from '../reducers/profile/index';
import wsReducer from '../reducers/workspace/index';
import jobsReducer from "../reducers/job/index";
import shortlistReducer from '../reducers/test/index';
import questionReducer from "../reducers/questions/index";


const reducer = combineReducers({
    profile: profileReducer,
    workspace: wsReducer,
    search: jobsReducer,
    shortlistReducer: shortlistReducer,
    questionReducer: questionReducer
  });

  export default reducer;
  