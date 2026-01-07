
// //import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
// import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";
// // import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
// // import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
// // import CodeTwoToneIcon from "@material-ui/icons/CodeTwoTone";
// // import CollectionsIcon from "@material-ui/icons/BookRounded";
// // import DashboardIcon from "@material-ui/icons/DashboardRounded";
// import BookmarkIcon from "@material-ui/icons/Bookmark"
// // import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
// // import AdbIcon from '@mui/icons-material/Adb';
// // import HubIcon from '@mui/icons-material/Hub';
// // import LanIcon from '@mui/icons-material/Lan';
// // import designIcon from '../assets/svg/design.svg'
// import { fetchWorkspaceSuccess, setWorkSpaceItems } from "../../state/action-creators/workspace";
// import FolderIcon from '@mui/icons-material/Folder';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import ArticleIcon from '@mui/icons-material/Article';
// import learn from '../../assets/img/learn.png';
// import designIcon from '../../assets/img/dgn.png';
// import intvwIcon from '../../assets/img/intvw.png';
// import leaderIcon from '../../assets/img/leader.png';
// import courseIcon from '../../assets/img/courses.png';
// import codingIcon from '../../assets/img/coding.JPG';
// import targetIcon from '../../assets/img/target.jpg';
// import blogIcon from '../../assets/img/blog.png';


// import { loadWorkspaceData } from "./dataloader";


// const StartedIcon = ()=><svg width="1em" height="1em" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" fontSize="18"><path fillRule="evenodd" clipRule="evenodd" d="M24.971 30.152H7.088c-1.786 0-2.745-2.103-1.574-3.453l19.07-21.988c1.33-1.532 3.835-.4 3.569 1.607L24.97 30.152z" fill="var(--identicons-color-dark, #239ce2)"></path><path fillRule="evenodd" clipRule="evenodd" d="M23.201 17.885h17.885c1.787 0 2.746 2.102 1.575 3.453l-19.073 21.99c-1.33 1.532-3.835.4-3.568-1.607L23.2 17.885z" fill="var(--identicons-color-dark, #239ce2)"></path>
// </svg>
// // const LearningIcon = ()=><img src={learn}/>;

//   export function initInterviewSession(dispatch, assessments) {
//     const wsItems = [];
//     let menu = [];

//     assessments.map((item,key)=>{
//         item.index = wsItems.length; 
//         wsItems.push(item); 
//         menu.push({...item, icon: item.category=='code'?<LocalLibraryOutlinedIcon /> : <BookmarkIcon/>,
//         //menu.push({...item, icon: item.category=='code'?<FolderIcon /> : <FolderIcon/>,
//         })
//     })
    
//     //console.log("menu:" , menu)
//    // menu[1].items = items;
//     dispatch(setWorkSpaceItems(wsItems));
//     dispatch(fetchWorkspaceSuccess(menu));
    
//     return menu;
//   }

// const setIcons = (codes, group, icons)=>{
//     //console.log('codes:', codes)
   
//     return codes.map((_, i)=>{ codes[i].icon = !icons ? <StartedIcon/> : icons[codes[i].category]; //<AdbIcon />;
//     //return codes.map((_, i)=>{codes[i].icon = icon; //<AdbIcon />;
//         codes[i].group = group; 
//     return codes[i] })
// }

// const setWSIndex = (wsItems, items, mywsList)=>{
//     return items?.map((item, i)=>{
//         item.index = wsItems.length;
//         if (mywsList && mywsList[item.title]) {
//             let tempItem = {...mywsList[item.title]};
//             tempItem.ws = 'my';
//             tempItem.icon = item.icon;
//             tempItem.index = wsItems.length;
//             wsItems.push(tempItem);
//             //console.log('mywsList[item.title]:', tempItem);
//             return tempItem;
//         } else {
//           wsItems.push(item);
//         }
//         return item 
//     })
// }

// const mapData = (data, wsItems, mywsList, icons)=>{
//     let sets = data?.map((_,key)=>{
//         data[key].icon =  <FolderIcon color="warning"/>;
//         if (data[key].items && data[key].items.length>0) {
//             let temp = {...data[key]}
//             temp.items = setIcons(data[key].items, data[key].title, icons);
//             temp.items = setWSIndex(wsItems, temp.items, mywsList);

//             return temp;
//         } else 
//             return data[key]
//     })

//     return sets
// }

// export const loadWorkspace = async(dispatch)=> {
//     const wsItems = [];
//     const mywsList = {};
//     console.log('loading data:')
//     let menu = [];
//     const data = await loadWorkspaceData(mywsList);
//     menu.push({ 
//             icon: <img  src={leaderIcon} alt="Available Test" />,
//             routes: "skilltest",
//             group:'Test',
//             //title:"My Workspace",
//             level:0,
//             items: data.mywsData?.map(item =>{ let temp = {...item};  if(temp.items) temp.items = setWSIndex(wsItems, temp.items); return temp})
//         },
//         {
//             icon: <img  src={blogIcon} alt="System Design Blog" />,
//             group: "Design",
//            // title: "Learning",
//             level:0,
//             hr:1,
//              items: data.design && mapData(data.design, wsItems, mywsList, {'pdf':<PictureAsPdfIcon/>, 'md': <ArticleIcon color="red"/>}),
//         },
//         {
//             icon: <img  src={learn} alt="Focused Learning" />,
//             group: "Learn",
//            // title: "Learning",
//             level:0,
//             hr:1,
//              items: data.learnings && mapData(data.learnings, wsItems, mywsList, {'pdf':<PictureAsPdfIcon/>, 'md': <ArticleIcon color="red"/>}),
//         },
//         {
//             icon: <img  src={targetIcon} alt="Code Practice" />,
//             group: "Practice",
//             //title: "Practice",
//             level:0,
//             items: mapData(data.practiceData, wsItems, mywsList),
//         },
//         {
//             icon: <img  src={intvwIcon} alt="Interview Preparation" />,
//             //routes: "feedback",
//             group: "Interview",
//            // title: "Preparation",
//             level:0,
//             hr:1,
//             items: data.ivwprep&&mapData(data.ivwprep, wsItems, mywsList),
//         },
//         {
//             icon: <img  src={designIcon} alt="Design System" />,
//             routes: "systemdesign",
//             group: "Post",
//            // title: "System",
//             level:0,
//             hr:1,
//             items: setWSIndex(wsItems, data.designs)
//         },

//         {
//             icon: <img  src={codingIcon} alt="Code Practice" />,
//             group: "Links",
//             //title: "CheatSheet",
//             level:0,
//             items: data.cheatsheet
//         },
//         {
//             icon: <img  src={courseIcon} alt="Available Courses" />,
//             group: "Courses",
//             //title: "Quick Start",
//             level:0,
//             items: data.courses && mapData(data.courses, wsItems, mywsList, {'pdf':<PictureAsPdfIcon/>, 'md': <ArticleIcon color="red"/>}),
//         }
//     )
//     console.log('menu:::::::', menu)
    
//     dispatch(setWorkSpaceItems(wsItems));
//     dispatch(fetchWorkspaceSuccess(menu));

//     return menu;
//   }