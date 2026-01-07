import React, { useEffect, useState } from 'react';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChevronLeft, BookOpen, FileText, Layout, PlayCircle } from 'lucide-react';

import { fetchDataWoToken } from '@/config/apiService';
import { loadBlobData } from "../../utils/blobloader";
import SystemDesignStudyView from "@/features/skills-prep/system-desgn/components/SystemDesignStudyView";

import './styles/custom.scss';
import './styles/theme.scss';
import DesignMockTestController from '@/modules/design/DesignMockTestController';
const availableSummary = { 'tweeter' : true }

const MarkDownViewer = ({ route }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [view, setView] = useState('detailed');
    const [menu, setMenu] = useState([]);
    const [md, setMD] = useState();
    const [loading, setLoading] = useState(false);
    const [slug, setSlug] = useState("");
    
    const ws = useSelector(state => state.workspace);

    useEffect(() => {
        if(location.pathname.includes('tweeter')) {
            setView('summary');
            setMenu([
                    { id: 'summary', label: 'Summary', icon: Layout },
                    { id: 'detailed', label: 'Detailed', icon: FileText },
                    { id: 'mocktest', label: 'Practice', icon: PlayCircle }
                    ]);
        } else {
            setView('detailed');
            setMenu([
                    { id: 'detailed', label: 'Detailed', icon: FileText },
                    { id: 'mocktest', label: 'Practice', icon: PlayCircle }
                ]);
        }
    }, []);

    useEffect(() => {
        if (view === 'detailed') getDataBlob();
    }, [location.pathname, view]);

    const getDataBlob = async () => {
        if(md) return;
        setLoading(true);
        const blobUrl = resolveBrowserToStoragePath(location.pathname);
        try {
            let url = await loadBlobData(blobUrl);
            let data = await fetchDataWoToken(url);
            if (data) {
                // Fixed regex to prevent double-prefixing
                const host = `https://cdn.jobleet.com/assets/`;
                data = data.replace(/(?<!https:\/\/cdn\.jobleet\.com\/)assets\//g, host);
                setMD(data);
            }
        } catch (error) {
            console.error("Failed to load content", error);
        } finally {
            setLoading(false);
        }
    };

    function resolveBrowserToStoragePath(browserPath) {
        const path = browserPath.startsWith('/') ? browserPath.substring(1) : browserPath;
        const caseStudyRegex = /(.+)\/case-study-([\w-]+)$/;
        const conceptRegex = /(.+\/concepts)\/([\w-]+)$/;

        const caseMatch = path.match(caseStudyRegex);
        if (caseMatch) {
            const [_, prefix, slug] = caseMatch;
            setSlug(slug);
            console.log('slug:', slug);
            return `${prefix}/case-studies/design_${slug.replace(/-/g, '_')}.md`;
        }

        const conceptMatch = path.match(conceptRegex);
        if (conceptMatch) {
            const [_, prefix, slug] = conceptMatch;
            return `${prefix}/${slug.replace(/-/g, '_')}.md`;
        }
        return path;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* --- Sticky Top Header --- */}
            <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <button 
                        onClick={() => navigate('/' + route)}
                        className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-bold text-sm"
                    >
                        <ChevronLeft size={18} />
                        <span className="hidden sm:inline">Back to Menu</span>
                    </button>

                    {/* View Switcher (Segmented Control) */}
                    <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                        {menu.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setView(tab.id)}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    view === tab.id 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                <tab.icon size={14} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="w-24 hidden sm:block"> {/* Spacer */} </div>
                </div>
            </nav>

            {/* --- Content Area --- */}
            <main className="flex-1 mx-auto w-full p-4 sm:p-4">
                {view === 'summary' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <SystemDesignStudyView topic={slug} />
                    </div>
                )}

                {view === 'detailed' && (
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10 animate-in fade-in zoom-in-95 duration-300">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-slate-400 font-medium animate-pulse">Loading detailed specs...</p>
                            </div>
                        ) : (
                            <article className="prose prose-slate max-w-none md:prose-lg lg:prose-xl prose-headings:font-black prose-a:text-blue-600 markdown-body md-section tracking-wider max-w-none prose prose xl:prose-lg 2xl:prose-xl">
                                <ReactMarkdown
                                    children={md}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        code({ node, inline, className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || "");
                                            return !inline && match ? (
                                                <div className="relative group">
                                                    <div className="absolute right-4 top-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {match[1]}
                                                    </div>
                                                    <SyntaxHighlighter
                                                        {...props}
                                                        children={String(children).replace(/\n$/, "")}
                                                        style={oneDark}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        className="rounded-2xl !bg-slate-900 shadow-xl"
                                                    />
                                                </div>
                                            ) : (
                                                <code {...props} className="bg-slate-100 text-rose-500 px-1.5 py-0.5 rounded-md font-bold italic">
                                                    {children}
                                                </code>
                                            );
                                        },
                                        img: ({node, ...props}) => (
                                            <img 
                                                {...props} 
                                                className="rounded-2xl border border-slate-200 shadow-lg mx-auto" 
                                                loading="lazy" 
                                            />
                                        )
                                    }}
                                />
                            </article>
                        )}
                    </div>
                )}

                {view === 'mocktest' && (
                <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <DesignMockTestController 
                        topic={slug} 
                        onClose={() => setView('detailed')} // Renamed setView to onClose for clarity
                    />
                </div>
                )}
            </main>
        </div>
    );
};

export default MarkDownViewer;