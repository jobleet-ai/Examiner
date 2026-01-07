// import { API, fetchData, fetchDataWoToken } from "@/config/apiService";
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import ArchitectureIcon from '@mui/icons-material/Architecture';
// import CreateIcon from '@mui/icons-material/Create';
// import ViewCozyIcon from '@mui/icons-material/ViewCozy';

// export const fetchGITData = async(key)=>{
//     console.log('fetchGITData::::', key);
//     let data = [];
//     let found = false;

//     if (getItem('gitproblist')) {
//         console.log('data available in local cache gitproblist');
//         try {
//             data = JSON.parse(getItem('gitproblist'));
//             found = true;
//             return data;
//         }catch(ex) {
//             console.log('fetchGITData parse error:', ex);
//             found = false;
//         }
      
//     } 
//     if (found === false) {
//         let res = await fetchData(`${API.git}?list=all`);
//         let items = [];
//         let pCount = 1;
//         let cCount = 1;
//         res?.map( item=>{
//             if(item.contentType==='directory') {
//                 let names  = item.name.split('-');
//                 let name = names.map(str=>(str.charAt(0).toUpperCase() + str.slice(1)));

//                 items.push({title: name.join(" "), path:item.name, category: 'html'})

//                 if (items.length===10) {
//                     let item = {title: `Problem Set Week ${pCount}`, items: items}
//                     data.push(item);
//                     pCount++;
//                     items = [];
//                 }
//             } else {
//                 if (pCount > 0 && items.length>0) {
//                     let item = {title: `Problem Set ${pCount}`, items: items}
//                     data.push(item);
//                     pCount++;
//                     items = [];
//                     pCount = 0;
//                 }
//                 let d ="";
//                 let index= item.name.lastIndexOf('.');
//                 let lang = item.name.substring(index +1,item.name.length)
//                 let desc = item.name.substring(0, index);
//                 if (lang ==='py') lang = 'python';

//                 items.push({title: item.name, category: 'gitcode', lang: lang, desc: desc});

//                 if (items.length===10) {
//                     let item = {title: `Code Set Week ${cCount}`, items: items }
//                     data.push(item);
//                     cCount++;
//                     items = [];
//                 }
                
//             }
//         });
//         if (items.length > 0) {
//             let item = {title: `Code Set ${cCount}`, items: items }
//             data.push(item);
//             cCount++;
//             items = [];
//         }

//         // let item = {title: 'Leetcode', items: items }
//         // data.push(item);
//         //console.log('fetchGITData::::', data);
//         setItem('gitproblist', JSON.stringify(data));

//         return data;
//     }

   
// }


// export const fetchWSData = async(key)=>{
//     console.log("Fetching course data: ", key);
//     let found = false;
//     let data = [];

//     // if (getItem(key)) {
//     //     console.log('data available in local cache', key, data);
//     //     try {
//     //         data = JSON.parse(getItem(key));
//     //         found = true;
//     //         return data;
//     //     }catch(ex) {
//     //         console.log('json parse error:', ex);
//     //         found = false;
//     //     }
//     // } 
//     if (found === false) {
//         let res = await fetchData(`${API.ws}?key=${key}`, key);
//         data = res;
//         setItem(key, JSON.stringify(res));
//         return data;
//     }
//     //console.log('fetchWSData:', res)
   
// }

// export const fetchMyWS = async(mywsList)=> {

//     const response = await fetchData(`${API.workspace}`,"my workspace");
//     console.log("fetch my workspace data" , response);
//     //let tmenu = [...menu];
//     let mycodes = response?.filter(item=>item.category === 'code');
//     console.log('mycodes:', mycodes)
//     let mydesigns = response?.filter(item=>item.category === 'design');
//     //let myrevs = response.filter(item=>item.category == 'revision');
//     let mock = response.filter(item=>item.category == 'mock');

//     console.log('mycodes:', mycodes, mydesigns)
//     mycodes = mycodes?.map(item=>{ 
//         let t = {...item};
//         mywsList[t.title] = item;  
//         t.title = item.group + " - " + item.title; 
//         return t;
//     })
//     // codes, designs, revisions, mocks

//     let mywsItems = [];
//     // mywsItems.push({
//     //     "icon": <CreateIcon/>,
//     //     "title": 'Create New (Own)',
//     //     "category": 'new',
//     //     "items": [],
//     // })
//     // if (mycodes.length>0) 
//     // {
//     //     mywsItems.push({
//     //         "icon": <ViewCozyIcon/>,
//     //         "title": 'Code',
//     //         "items": mycodes,
//     //     })
//     // }
//     // if (mydesigns.length>0) 
//     // {
//     //     mywsItems.push({
//     //         "icon": <ArchitectureIcon />,
//     //         "title": 'Design',
//     //         "items": mydesigns,
//     //     })
//     // }
//     // if (mock) {
//     //     mywsItems.push({
//     //         "icon": <AssessmentIcon />,
//     //         "title": 'Mock Test',
//     //         "items": mock,
//     //     })
//     // }

//     // mywsItems.push({
//     //     "icon": <AssessmentIcon/>,
//     //     "title": 'Your Test',
//     //     "category": 'mock',
//     //     "items": mock,
//     // })
    
//     return mywsItems;
//   }

//   export const loadWorkspaceData = async (mywsList)=>{
//     let data = {};

//     let token = getItem('token');
//     if (token) {
//         if (token.type==='guest') {

//             let time = getItem('time');

//             if (time) {
//                 let curTime =  (new Date).getTime();
//                 let timeDiff = curTime - time;
//                 let daysOlder = timeDiff / (1000 * 3600 * 24);
//                 // if (daysOlder>7) {
//                 //     console.log(401).json(`Need to create login, guest user time of 7 days has expired!, please create login it's free`);
//                 //     return;
//                 // }
//             }
//         }
    
//     data.codings = await fetchWSData('code');
//     //data.designs = require("../../data/practice-design").designs;
//     data.design = await fetchWSData('design');
//     data.cheatsheet = require("../../data/cheatsheet").catalogue;
//     data.learnings = await fetchWSData('learning');
//     data.ivwprep = await fetchWSData('ivwprep');
//     data.courses = await fetchWSData('courses');
//     data.gitProbs = await fetchGITData();

//     let practiceData = [];
//     data.codings && data.codings.map(item=> practiceData.push(item));
//     data.gitProbs && data.gitProbs.map(item=> practiceData.push(item));

//     data.practiceData = practiceData;

//     data.mywsData = await fetchMyWS(mywsList);

//     console.log('data.mywsData:', data.mywsData)
//     } else {
//         console.log("Signup is required, please signup it's free")
//     }

//     return data;


// }