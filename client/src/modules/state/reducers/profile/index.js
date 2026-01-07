import { combineReducers } from "redux";
import skillsReducer from "./skillsReducer";
import aboutReducer from "./aboutReducer";
import profileReducer from "./profileReducer";
import experienceReducer from "./experienceReducer";
import educationReducer from "./educationReducer";
import fileReducer from "./fileReducer";
import sectionReducer from "./sectionReducer";

const reducers = combineReducers({
    // skills: skillsReducer,
    // file: fileReducer,
    // about: aboutReducer,
     profile: profileReducer,
     section: sectionReducer,
    // experienceList: experienceReducer,
    // educationList: educationReducer,
});

export default reducers