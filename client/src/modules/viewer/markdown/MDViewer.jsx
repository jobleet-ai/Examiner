
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import rehypeRaw from "rehype-raw"

import React, { useEffect, useRef, useState } from 'react';

import { fetchDataWoToken } from '@/config/apiService';

import './styles/custom.scss'
import './styles/theme.scss'


import { loadBlobData } from "../../utils/blobloader";
import { useNavigate, useLocation } from "react-router-dom";

import { ChevronLeft } from 'lucide-react';


const MDViewer = ({parent})=>{

    const location = useLocation()
    const navigate = useNavigate();
    const [md, setMD] = useState();

useEffect( ()=>{
    getDataBlob();
}, [location.pathname])

/**
 * Resolves any browser path to a .md file path
 * Matches patterns like /skills-prep/dsa/searching-algorithms
 * Returns: skills-prep/dsa/searching_algorithms.md
 */
function getBrowserPathToStorage(browserPath) {
  // 1. Remove leading slash
  let path = browserPath.startsWith('/') ? browserPath.substring(1) : browserPath;
  
  // 2. Identify the parts (e.g., ["skills-prep", "dsa", "searching-algorithms"])
  const segments = path.split('/');
  
  // 3. The last segment is the filename/slug
  const lastSegment = segments.pop();
  
  // 4. Convert hyphens to underscores for the filename
  const fileName = lastSegment.replace(/-/g, '_');
  
  // 5. Reconstruct the path with the .md extension
  return `${segments.join('/')}/${fileName}.md`;
}

const getDataBlob = async ()=>{
    let found = false;
    
    console.log('MDViewer Path1 :', location.pathname, parent);
    // USER TO CATCH MD FILES
    // if (getItem(selected.source)) {
    //     try{
    //         console.log('CACHE DATA124:', selected.source);
    //         data = JSON.parse(getItem(selected.source));
    //         setMD(data);
    //         found = true;
    //     }catch(ex) {
    //         console.log('fetchGITData parse error:', ex);
    //         found = false;
    //     }
    // } 


    if (found === false) {
        let blobUrl = getBrowserPathToStorage(location.pathname);
        console.log('MDViewer Path2 :', blobUrl);
        let url = await loadBlobData(blobUrl);
        
        let data = await fetchDataWoToken(url);
        //res = decodeBase64(res);
        //let tokens = url.split(selected.source);

        //console.log('tokens::::', tokens);

        if(data){
   
            //let host = `https://jobleet.com/api/v2/assets?key=`;
            data = data.replaceAll('assets/', `https://cdn.jobleet.com/assets/`);
            setMD(data);
        }
    }
        //working for Azure blob
        //     if (res) { 
        //         let data = res;
        //         data = data.replaceAll('assets/', tokens[0]);
        //         data = data.replaceAll('.png', `.png${tokens[1]}`);
        //         data = data.replaceAll('.jpg', `.jpg${tokens[1]}`);
        //         data = data.replaceAll('.gif', `.gif${tokens[1]}`);
        //         setMD(data);
        //         setItem(selected.source, JSON.stringify(data));
        //    }
        // }       
}


return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <button onClick={()=>navigate('/'+ parent)}
              className="flex items-center gap-2 text-blue-600 hover:text-teal-500 font-semibold"
            >
              <ChevronLeft size={20} /> Back to Menu
            </button>
            
          </div>

        <div className="text-[20px] md:text-[20px] markdown-body md-section tracking-wider max-w-none prose prose xl:prose-lg 2xl:prose-xl">
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
        </div>
        </div>
        </div>
    )
}

export default MDViewer;