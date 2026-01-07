const wsReducer = (state={coding:[], items:[], select:0, activeIVW:null, menu:[{}], interview: {sessions:[]}, rev:[]}, action) => {
    switch(action.type){
        case "ADD_CODE_ITEM":
            return {...state, codings: [...state.codings , action.payload]};

        case "EDIT_PROBLEM":
            let newArr = [...state]
            newArr[action.payload.id] = action.payload;
            return newArr;

        case "DELETE_CODE_ITEM":
            let arr = [...state.codings]
            const index = action.payload;
            arr.splice(index, 1);
            return {...state, codings: arr};

        case "SELECT_PROBLEM":
                return [ ...state, action.payload];


        case "ADD_TO_REVISION":
                //return {...state, rev: action.payload};
                let temp = {...state}
                temp.menu[0].items = action.payload;
                console.log('ADD_TO_REVISION', temp);
                return temp;

                //return {...state, menu: rev: action.payload};

        case "FETCH_CODING_SUCCESS":
                return {...state, codings: action.payload};
                
        case "FETCH_DESIGN_SUCCESS":
                return {...state, designs: action.payload};

        case "FETCH_CONCEPTS_SUCCESS":
                return {...state, concepts: action.payload};                    
                    
        case "SELECT_COURSE_ITEM":
                return {...state, selected: action.payload};

        case "FETCH_COURSE_OPTIONS":
                return {...state, courseOptions: action.payload};                    
                        
        case "SELECT_COURSE_OPTION":
                return {...state, optionSelected: action.payload};

        case "FETCH_WORKSPACE":
                return {...state, menu: action.payload};

        case "INTERVIEW_SESSIONS":
                let ivw = {...state}
                ivw.interview.sessions = action.payload;
                return ivw;

        case "ACTIVE_INTERVIEW":

                return {...state, activeIVW: action.payload};
                // let tempSt = {...state}

                // tempSt.interview.active = action.payload;
                // console.log('tempSt.interview.active:', tempSt.interview)
                // if(tempSt.interview.active) {
                //         tempSt.menu = initInterviewSession(tempSt.interview.active.assessments);
                // }
                // return tempSt;

        case "WORKSPACE_ITEMS": 
                return {...state, items: action.payload};

        // case "WORKSPACE_SELECT": 
        //         return action.payload;
        default:
            return state;
    }
}
export default wsReducer