
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import rehypeRaw from "rehype-raw"

import React, { useEffect, useState } from 'react';

import API_BASE from '../@/config/API_BASE';
import { API, fetchData, fetchDataWoToken } from '../@/config/apiService';
import './styles/custom.scss'
import './styles/theme.scss'
import '../../interviewrank/SkillTest.scss';
import { Typography, styled } from "@material-ui/core";
import { default as MuiMenuItem } from "@mui/material/MenuItem";
import { loadBlobData } from "../../../utils/datautil/blobloader";
import { isMobile } from "../../../utils/mobileUtil";
import { getItem, setItem } from "@/auth/tokenUtils";
const mappings = {'visual-basic-for-applications-(vba)': 'vba', 'transact-sql-(t-sql)':'t-sql', 'search-engine-optimization-(seo)': 'search-engine-optimization', }

export const MenuItem = styled(MuiMenuItem)`
  color: blue;
  padding: 50px;
  max-width:700px;

  &.Mui-selected {
    background-color: red;
  }

  // Add this
  &.Mui-selected:hover{ 
    background-color: red;
  }

  &:hover {
    background-color: green;
  }
`;

const QuizMDViewer = ()=>{
    
const [md, setMD] = useState();
const [topics, setTopics] = useState([]);
const [selected, setSelected] = useState();
const myRef = React.createRef();

const dir ="ivw/quiz"

useEffect(()=>{
    loadData();
}, [])

const loadData = async()=>{
    // if (getItem('quizskills')){
    //     console.log('data available in local cache','quizz skills');
    //     let quizzes = JSON.parse(getItem('quizskills'));
    //     setTopics(quizzes);
    // } else {
    //     let address = `${API.skill}/quiz?topic=skills`
    //     let temp = await fetchData(address,"Quiz Catalog" );
    //     setTopics(temp.quizzes);
    //     setItem('quizskills', JSON.stringify(temp.quizzes));
    // }
    let found = false;

    if (getItem('quizskills')) {
        console.log('data available in local cache', 'quizskills');
        try {
            let quizzes = JSON.parse(getItem('quizskills'));
            setTopics(quizzes);

            found = true;
        }catch(ex) {
            console.log('fetchGITData parse error:', ex);
            found = false;
        }
    } 
    if (found === false) {
        let address = `${API.skill}/quiz?topic=skills`
        let temp = await fetchData(address,"Quiz Catalog" );
        setTopics(temp.quizzes);
        setItem('quizskills', JSON.stringify(temp.quizzes));
    }
}

const getNameMapping = (course)=>{
    if( mappings[course]) {
        return mappings[course];
    } else return course;
}

const getQuizData = async(topic)=>{
    topic = getNameMapping(topic.toLowerCase());
    const q = `folder=${dir}`;
    if(topic.startsWith('.')) {
        topic = topic.replace('.', 'dot');
    }
    topic = topic.replace(".", "").replace("#", "-sharp");
    let data = null;
    if (getItem(topic)) {
        console.log('data available in local cache', topic);
        data = JSON.parse(getItem(topic));
        setMD(data);
    } else {
        // let url = `${API_BASE.course}${topic}?${q}`;
        let url = await loadBlobData(topic+'-quiz.md');
        console.log('url: ', url);
        let res = await fetchDataWoToken(url);
        data = res.replaceAll('[x]', '[.]') ; //.replaceAll('assets', `${API_BASE.course}markdown/assets`);
        setMD(data);
        setItem(topic, JSON.stringify(data));
    }

  
}

const onItemSelect = (topic)=>{
    setSelected(topic);
    getQuizData(topic);
    handleScrollToElement();
}

const handleScrollToElement = (event)=> {
      window.scrollTo(0, 200);
}

return (
    (topics && topics.length>0)&&
    
    <div className="pt-8 pl-2 pr-2 mb-10 topic-chip-container">
    <h2>
        {/* <span className="x_576e2b6f">Top Interview Questions</span> */}
        <Typography style={{display:'flex', justifyContent:'left', marginBottom:'0.4em'}} variant={'h5'}>Practice Quizzes</Typography>
        <hr></hr>
    </h2>
        
        <div style={{padding:'10px'}} className="topic-chip-container">
            { topics && topics.length>0 && topics.map((item, key) =>{
            return <div key={key} className="topic-chip hovered" onClick={()=>onItemSelect(item.skill_name)}>
                    <div className="justify-content-center align-self-center">
                        <img className="topic-logo1" style={{boxSizing:'border-box'}}/>
                        <span style={{color:'#37465A'}}><b>&nbsp;&nbsp;{item.skill_name}</b></span>
                    </div>
                   </div>
            })}
        </div>

        {md&&<div ref={myRef} className="markdown-body qzmd-body quiz-section question-section">
        <ReactMarkdown 
            children={md}
            rehypePlugins={[rehypeRaw]}
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "")
                    return !inline && match ? (
                        <SyntaxHighlighter
                            {...props}
                            children={String(children).replace(/\n$/, "")}
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                        />
                    ) : (
                        <code {...props} className={className}>
                            {children}
                        </code>
                    )
                },
            }}
        />
        </div>}
    </div>
)
}


export default QuizMDViewer;