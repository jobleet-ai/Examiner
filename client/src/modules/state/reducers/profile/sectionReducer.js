const sectionReducer = (profile={}, action) => {
    switch(action.type){
        case "SECTION_EDIT":
            return action.payload;
        // case "SECTION_EDIT":
        //     return action.payload;
        default:
            return profile;
    }
}
export default sectionReducer