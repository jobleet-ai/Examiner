import { CheckCircle2, ExternalLink, FileText, Gift, ListChecks, Sparkles, Target } from "lucide-react";

const JDFormatter = ({ description }) => {
  if (!description) return null;

  // Helper to get Icon based on header name
  const getSectionIcon = (header) => {
    const h = header.toLowerCase();
    if (h.includes('description')) return <FileText className="w-5 h-5 text-blue-500" />;
    if (h.includes('responsibilit')) return <Target className="w-5 h-5 text-orange-500" />;
    if (h.includes('requirement')) return <ListChecks className="w-5 h-5 text-violet-500" />;
    if (h.includes('nice to have') || h.includes('nicetohave')) return <Sparkles className="w-5 h-5 text-amber-500" />;
    if (h.includes('benefit') || h.includes('perk')) return <Gift className="w-5 h-5 text-emerald-500" />;
    if (h.includes('qualif')) return <CheckCircle2 className="w-5 h-5 text-indigo-500" />;
    if (h.includes('salary') || h.includes('compensation')) return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    return <CheckCircle2 className="w-5 h-5 text-slate-400" />;
  };

  const lines = description.split('\n');
  const elements = [];
  let currentSection = null;
  let sectionContent = [];

  const flushSection = () => {
    if (currentSection) {
      elements.push({
        type: 'section',
        header: currentSection,
        content: sectionContent
      });
      sectionContent = [];
      currentSection = null;
    }
  };

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    // Clean formatting artifacts
    const cleanLine = trimmedLine.replace(/\*{1,}/g, '').replace(/â€¢/g, '•');

    // Check if it's a section header (ends with colon)
    if (cleanLine.match(/^[A-Z][^:]*:$/i)) {
      flushSection();
      const header = cleanLine.replace(/:$/, '').trim();
      const headerLower = header.toLowerCase();
      
      // Filter out redundant metadata
      if (headerLower.includes('title') && headerLower !== 'job title') return;
      
      currentSection = header;
      return;
    }

    // Check for markdown headers
    if (cleanLine.match(/^#{1,3}\s/)) {
      flushSection();
      const title = cleanLine.replace(/^#+\s*/, '');
      elements.push({ type: 'markdown-header', title });
      return;
    }

    // Check for bullet points (•, -, *, numbered)
    const bulletMatch = cleanLine.match(/^([•\-*]|\d+\.)\s+(.+)/);
    if (bulletMatch) {
      const content = bulletMatch[2];
      if (currentSection) {
        sectionContent.push({ type: 'bullet', content });
      } else {
        elements.push({ type: 'bullet', content });
      }
      return;
    }

    // Regular content
    if (currentSection) {
      sectionContent.push({ type: 'text', content: cleanLine });
    } else {
      elements.push({ type: 'text', content: cleanLine });
    }
  });

  flushSection();

  return (
    <div className="space-y-6">
      {elements.map((element, idx) => {
        if (element.type === 'section') {
          const headerLower = element.header.toLowerCase();
          const isMainSection = 
            headerLower.includes('description') || 
            headerLower.includes('responsibilit') || 
            headerLower.includes('requirement') || 
            headerLower.includes('nice to have') ||
            headerLower.includes('nicetohave') ||
            headerLower.includes('benefit') ||
            headerLower.includes('qualif') ||
            headerLower.includes('salary') ||
            headerLower.includes('compensation') ||
            headerLower.includes('skill') ||
            headerLower.includes('experience') ||
            headerLower.includes('education') ||
            headerLower.includes('perk');

          if (!isMainSection) return null;

          return (
            <div key={idx} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-center gap-3 mb-4 border-b border-slate-200 pb-2">
                {getSectionIcon(headerLower)}
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight">
                  {element.header}
                </h3>
              </div>
              <div className="space-y-2.5">
                {element.content.map((item, itemIdx) => {
                  // Always render as bullet point for better consistency
                  return (
                    <div key={itemIdx} className="flex gap-3 text-slate-700 group">
                      <span className="text-violet-500 mt-1 flex-shrink-0 font-bold">•</span>
                      <span className="text-[15px] leading-relaxed group-hover:text-slate-900 transition-colors">
                        {item.content}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        if (element.type === 'markdown-header') {
          return (
            <h3 key={idx} className="text-lg font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-violet-500 rounded-full" />
              {element.title}
            </h3>
          );
        }

        if (element.type === 'bullet') {
          return (
            <div key={idx} className="flex gap-3 text-slate-700 mb-2.5 group hover:translate-x-1 transition-transform pl-2">
              <span className="text-violet-500 mt-1 flex-shrink-0 font-bold">•</span>
              <span className="text-[15px] leading-relaxed group-hover:text-slate-900 transition-colors">
                {element.content}
              </span>
            </div>
          );
        }

        if (element.type === 'text') {
          const isWebsite = element.content.toLowerCase().includes("website:");
          
          // If it's a website, we strip "website:" to get the clean URL for the href
          const cleanUrl = isWebsite 
            ? element.content.toLowerCase().replace("website:", "").trim() 
            : element.content;

          return (
            <div key={idx}>
              {isWebsite ? (
                <p className="flex items-center gap-2 mb-3 pl-2">
                  <span className="font-bold text-gray-700">Website:</span>
                  <a 
                    href={cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 font-medium hover:underline flex items-center gap-1 transition-all"
                  >
                    {cleanUrl}
                    <ExternalLink size={14} className="opacity-70" />
                  </a>
                </p>
              ) : (
                <p className="text-slate-700 mb-3 leading-relaxed text-[15px] pl-2">
                  {element.content}
                </p>
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default JDFormatter; 