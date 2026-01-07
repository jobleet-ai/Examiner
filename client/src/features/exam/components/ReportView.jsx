import React from 'react';
import { Award, TrendingUp, TrendingDown, BookOpen, CheckCircle, AlertCircle, Download, FileText, LayoutDashboard } from 'lucide-react';

const ReportView = ({ report, config, onRestart }) => {
  // 1. Convert Topic Analysis (Handling 'score/possible' or 'correct/total')
  const topicAnalysisArray = Object.entries(report.topicAnalysis || {}).map(([topic, data]) => {
    const score = data.score ?? data.correct ?? 0;
    const total = data.possible ?? data.total ?? 1;
    return {
      topic,
      score,
      maxScore: total,
      percentage: (score / total) * 100,
      feedback: data.feedback
    };
  });

  // 2. Map weaknesses to recommendations
  const mappedRecommendations = (report.recommendations || report.weaknesses || []).map((text, index) => ({
    id: `rec-${index}`,
    stepNumber: index + 1,
    content: text
  }));

  const generatePDF = () => {
    const topicAnalysisText = topicAnalysisArray
      .map(t => `${t.topic}: ${t.score}/${t.maxScore}\nFeedback: ${t.feedback}`)
      .join('\n\n');

    const content = `
EXAM PERFORMANCE REPORT: ${config.subject}
==================================================
Overall Score: ${report.totalScore}/${report.maxScore} (${report.percentage}%)
Grade: ${report.grade}

STRENGTHS:
${report.strengths.join('\n')}

TOPIC ANALYSIS:
${topicAnalysisText}

AI SUMMARY:
${typeof report.detailedFeedback === 'string' ? report.detailedFeedback : 'See individual question breakdown.'}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Report_${config.subject}.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 py-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Main Card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
          
          {/* Top Banner: Score & Grade */}
          <div className="bg-slate-900 p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <p className="text-blue-400 font-black uppercase tracking-[0.2em] text-xs mb-2">Diagnostic Result</p>
                <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">
                  {report.grade}
                </h1>
                <p className="text-slate-400 font-medium">
                  {config.subject} • {config.grade} • {config.board}
                </p>
              </div>

              <div className="flex gap-4">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center min-w-[120px]">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Total Score</p>
                  <p className="text-3xl font-black">{report.totalScore}<span className="text-sm text-slate-500">/{report.maxScore}</span></p>
                </div>
                <div className="bg-blue-600 p-6 rounded-2xl text-center min-w-[120px] shadow-lg shadow-blue-900/20">
                  <p className="text-[10px] uppercase font-bold text-blue-200 mb-1">Percentage</p>
                  <p className="text-3xl font-black">{report.percentage}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Left & Middle Column: Analysis */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* Topic Breakdown */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                      <LayoutDashboard size={18} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Topic-wise Mastery</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {topicAnalysisArray.map((item, index) => (
                      <div key={index} className="group">
                        <div className="flex justify-between items-end mb-2">
                          <span className="font-bold text-slate-700 text-sm">{item.topic}</span>
                          <span className="text-xs font-bold text-slate-400">{item.score}/{item.maxScore}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              item.percentage >= 70 ? 'bg-emerald-500' : item.percentage >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.feedback}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Subjective/Detailed Feedback Summary */}
                <section className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <div className="flex items-center gap-3 mb-4 text-slate-800">
                    <FileText size={20} className="text-blue-600" />
                    <h3 className="font-bold">Expert AI Feedback</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {typeof report.detailedFeedback === 'string' 
                      ? report.detailedFeedback 
                      : "Review the individual question breakdown in your exported PDF for specific improvement points."}
                  </p>
                </section>
              </div>

              {/* Right Column: Strengths & Path */}
              <div className="space-y-8">
                {/* Strengths Card */}
                <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                  <h4 className="text-emerald-900 font-bold flex items-center gap-2 mb-4">
                    <TrendingUp size={18} /> Strengths
                  </h4>
                  <ul className="space-y-3">
                    {report.strengths.map((s, i) => (
                      <li key={i} className="flex gap-2 text-xs font-medium text-emerald-700">
                        <CheckCircle size={14} className="mt-0.5 flex-shrink-0" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvement Path */}
                <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100">
                  <h4 className="text-rose-900 font-bold flex items-center gap-2 mb-4">
                    <TrendingDown size={18} /> Improvement Areas
                  </h4>
                  <ul className="space-y-4">
                    {mappedRecommendations.slice(0, 4).map((rec) => (
                      <li key={rec.id} className="flex gap-3">
                        <span className="text-[10px] font-black w-5 h-5 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center flex-shrink-0">
                          {rec.stepNumber}
                        </span>
                        <p className="text-xs font-medium text-rose-800 leading-tight">{rec.content}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
              <button
                onClick={generatePDF}
                className="flex-1 h-14 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95"
              >
                <Download size={18} /> Download Detailed PDF
              </button>
              <button
                onClick={onRestart}
                className="flex-1 h-14 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95"
              >
                Restart Session
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportView;