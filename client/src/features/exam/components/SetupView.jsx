import React, { useState } from 'react';
import { 
  BookOpen, Landmark, Timer, 
  FileText, ListChecks, Sparkles, ChevronRight 
} from 'lucide-react';

const SetupView = ({ onStart }) => {
  const [config, setConfig] = useState({
    grade: 'Grade 10',
    subject: 'Biology',
    board: 'CBSE',
    duration: 20,
    mcqCount: 10,
    subjectiveCount: 1
  });

  const [activeTab, setActiveTab] = useState('curriculum'); // curriculum, structure

  const grades = ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const subjects = [
    { name: 'Mathematics', icon: 'Σ' },
    { name: 'Physics', icon: '⚛' },
    { name: 'Chemistry', icon: '🧪' },
    { name: 'Biology', icon: '🌿' },
    { name: 'History', icon: '📜' }
  ];
  const boards = ['CBSE', 'ICSE', 'IB', 'IGCSE'];

  const isValid = config.grade && config.subject && config.board;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Info & Branding */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white shadow-xl rounded-2xl mb-2 mx-auto lg:mx-0">
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              AI Exam <span className="text-blue-600">Engine</span>
            </h1>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Our AI analyzes the latest <span className="font-bold">{config.board}</span> curriculum to generate personalized challenges for <span className="font-bold">{config.grade}</span>.
            </p>
          </div>
          
          <div className="hidden lg:block space-y-4">
            <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">1</div>
              Define curriculum parameters
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">2</div>
              Configure exam length
            </div>
          </div>
        </div>

        {/* Right Side: Configuration Card */}
        <div className="lg:col-span-8 bg-white rounded-3xl shadow-2xl shadow-blue-100 border border-slate-100 overflow-hidden">
          {/* Progress Header */}
          <div className="flex border-b border-slate-100">
            <button 
              onClick={() => setActiveTab('curriculum')}
              className={`flex-1 py-4 text-sm font-bold transition-all ${activeTab === 'curriculum' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-slate-400'}`}
            >
              1. Curriculum
            </button>
            <button 
              onClick={() => setActiveTab('structure')}
              className={`flex-1 py-4 text-sm font-bold transition-all ${activeTab === 'structure' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-slate-400'}`}
            >
              2. Exam Structure
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'curriculum' ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                {/* Grade Selection - Pill Style */}
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 block">Select Grade</label>
                  <div className="flex flex-wrap gap-2">
                    {grades.map(g => (
                      <button
                        key={g}
                        onClick={() => setConfig({...config, grade: g})}
                        className={`px-4 py-2 rounded-xl border-2 transition-all text-sm font-bold ${config.grade === g ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200' : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-300'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject Selection - Grid with Icons */}
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 block">Select Subject</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {subjects.map(s => (
                      <button
                        key={s.name}
                        onClick={() => setConfig({...config, subject: s.name})}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${config.subject === s.name ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'}`}
                      >
                        <span className="text-2xl">{s.icon}</span>
                        <span className={`text-xs font-bold ${config.subject === s.name ? 'text-blue-700' : 'text-slate-600'}`}>{s.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Board Selection */}
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 block">Examination Board</label>
                  <div className="grid grid-cols-4 gap-2">
                    {boards.map(b => (
                      <button
                        key={b}
                        onClick={() => setConfig({...config, board: b})}
                        className={`py-3 rounded-xl border-2 text-xs font-bold transition-all ${config.board === b ? 'border-slate-800 bg-slate-800 text-white' : 'border-slate-100 text-slate-500 hover:bg-slate-50'}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                {/* Sliders or Number Inputs with Icons */}
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <Timer className="w-5 h-5 text-blue-600" />
                        <span className="font-bold text-slate-700">Exam Duration</span>
                      </div>
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">{config.duration} min</span>
                    </div>
                    <input 
                      type="range" min="10" max="120" step="5"
                      value={config.duration}
                      onChange={(e) => setConfig({...config, duration: parseInt(e.target.value)})}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <ListChecks className="w-5 h-5 text-emerald-600 mb-3" />
                      <label className="block text-xs font-bold text-slate-500 mb-2 tracking-tight">MCQ COUNT</label>
                      <input 
                        type="number"
                        value={config.mcqCount}
                        onChange={(e) => setConfig({...config, mcqCount: e.target.value})}
                        className="w-full bg-transparent text-2xl font-black text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <FileText className="w-5 h-5 text-purple-600 mb-3" />
                      <label className="block text-xs font-bold text-slate-500 mb-2 tracking-tight">SUBJECTIVE</label>
                      <input 
                        type="number"
                        value={config.subjectiveCount}
                        onChange={(e) => setConfig({...config, subjectiveCount: e.target.value})}
                        className="w-full bg-transparent text-2xl font-black text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="mt-10 flex gap-4">
              {activeTab === 'structure' && (
                <button 
                  onClick={() => setActiveTab('curriculum')}
                  className="px-6 py-4 rounded-2xl font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Back
                </button>
              )}
              
              {activeTab === 'curriculum' ? (
                <button 
                  onClick={() => setActiveTab('structure')}
                  disabled={!isValid}
                  className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-30"
                >
                  Next Step <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={() => onStart(config)}
                  className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95"
                >
                  <Sparkles className="w-5 h-5" /> Generate Exam
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupView;