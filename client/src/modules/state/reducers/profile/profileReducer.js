const profileReducer = (state = {token:null, profile:{
    type: "Applicant",
    email: "",
    password: "",
    name: "",
    education:[{
      institutionName:"",
      degree:"",
      startYear:1930,
      endYear:""
    }],
    skills: [],
    location:"",
    organizations: [],
    designation: "",
    experience: "",
    resume: "",
    profile: "",
    bio: "",
    mobile: "",
  }}, action) => {
    //console.log('aaaaaaa:::',action);
  switch(action.type){
      case "MANAGE_PROFILE":
          return  {...state, profile: action.payload};
      case "LOGGED_IN":

          return {...state, token: action.payload};
      default:
          return state;
  }
}
export default profileReducer

// const profileReducer = (profile={
//     name: "Your Name",
//     location: "City, Name",
//     github: "",
//     linkedin: "",
//     website: "",
//     email: "",
//     contact: "",
//     position: "Your Position",
//     tagline: "Describe yourself in one line"
// }, action) => {
//     switch(action.type){
//         case "MANAGE_PROFILE":
//             return action.payload;
//         default:
//             return profile;
//     }
// }
// export default profileReducer