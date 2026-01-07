import React, { useEffect, useRef, useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Flag, Send, 
  LayoutDashboard, Info, AlertCircle, 
  CheckCircle,
  Menu,
  X,
  Clock,
  MicOff,
  Mic
} from 'lucide-react';

const MCQQuestion = ({ question, selectedAnswer, onSelect }) => {
 return (
  <div className="space-y-2">
   <h3 className="text-xl font-semibold text-gray-800">{question.question}</h3>
   <div className="grid gap-3">
    {question.options.map((option, index) => (
     <button
      key={index}
      onClick={() => onSelect(index)}
      className={`p-1 text-left rounded-lg border-2 transition-all transform hover:scale-102 ${
       selectedAnswer === index
        ? 'border-blue-500 bg-blue-50 shadow-md'
        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
      }`}
     >
      <div className="flex items-center gap-3">
       <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
        selectedAnswer === index
         ? 'border-blue-500 bg-blue-500'
         : 'border-gray-300'
       }`}>
        {selectedAnswer === index && (
         <CheckCircle className="w-4 h-4 text-white" />
        )}
       </div>
       <span className="font-medium text-gray-700">
        {String.fromCharCode(65 + index)}
       </span>
       <span className="text-gray-800">{option}</span>
      </div>
     </button>
    ))}
   </div>
  </div>
 );
};

const SubjectiveQuestion = ({ question, answer, onAnswerChange }) => {
 const words = answer ? answer.trim().split(/\s+/).filter(Boolean).length : 0;
 const chars = answer ? answer.length : 0;

 const { isListening, toggle, isSupported } = useVoiceToText((transcript) => {
  onAnswerChange(transcript);
 });

 return (
  <div className="space-y-4">
   <h3 className="text-xl font-semibold text-gray-800">{question.question}</h3>
   <div className="relative">
    <textarea
     value={answer || ''}
     onChange={(e) => onAnswerChange(e.target.value)}
     placeholder="Type your answer here..."
     className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
    />
    {isSupported && (
     <button
      onClick={toggle}
      className={`absolute bottom-4 right-4 p-3 rounded-full transition-all ${
       isListening
        ? 'bg-red-500 text-white animate-pulse'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
     >
      {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
     </button>
    )}
   </div>
   <div className="flex gap-6 text-sm text-gray-600">
    <span>Words: <strong className="text-gray-800">{words}</strong></span>
    <span>Characters: <strong className="text-gray-800">{chars}</strong></span>
   </div>
  </div>
 );
};

// The Component Definition
const Timer = ({ timeRemaining }) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  
  const isWarning = timeRemaining < 300; // 5 minutes left
  const isCritical = timeRemaining < 60;  // 1 minute left

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-bold transition-colors ${
      isCritical ? 'bg-red-100 text-red-600 animate-pulse' : 
      isWarning ? 'bg-orange-100 text-orange-600' : 
      'bg-blue-100 text-blue-600'
    }`}>
      <Clock className="w-4 h-4" />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};
const useVoiceToText = (onResult) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const finalTranscript = useRef(""); // Keeps track of confirmed text

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) return;

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true; // Crucial for "smooth" feel
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interimTranscript = "";
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript.current += event.results[i][0].transcript + " ";
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      // Merge final and interim to show real-time progress
      onResult(finalTranscript.current + interimTranscript);
    };

    recognition.onend = () => {
      // If the app thinks it should still be listening, restart it
      if (isListening) {
        recognition.start();
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech Error:", event.error);
      if (event.error === 'no-speech') return; // Ignore silent timeouts
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [isListening, onResult]);

  const toggle = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      finalTranscript.current = ""; // Reset for new session
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return { isListening, toggle, isSupported: !!window.webkitSpeechRecognition };
};

const ExamView = ({ 
  questions, 
  answers, 
  currentQuestion, 
  timeRemaining, 
  onAnswerChange, 
  onNext, 
  onPrevious, 
  onSubmit,
  onJumpToQuestion 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [flagged, setFlagged] = useState({});
  const allQuestions = [...questions.mcq, ...questions.subjective];
  const current = allQuestions[currentQuestion];
  const isMCQ = currentQuestion < questions.mcq.length;

  const toggleFlag = (id) => {
    setFlagged(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen-[8vh] bg-slate-50 flex flex-col">
      
      {/* --- Responsive Header --- */}
      <header className="sticky top-0 z-30 w-full bg-white border-b border-slate-200 px-4 py-3 sm:px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
          <div className="hidden sm:block">
            <h2 className="font-bold text-slate-800">Exam Mode</h2>
            <p className="text-[10px] text-slate-400 uppercase font-black">{current.topic}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
            <Timer timeRemaining={timeRemaining} />
          </div>
          <button 
            onClick={onSubmit}
            className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-xs sm:text-sm hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100"
          >
            Submit
          </button>
        </div>
      </header>

      <div className="flex flex-1 relative">
        
        {/* --- Sidebar (Mobile Drawer / Desktop Static) --- */}
        <aside className={`
          fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
          z-40 w-72 bg-white border-r border-slate-200 p-6 flex flex-col
          h-[calc(100vh-64px)] lg:h-auto
        `}>
          <div className="mb-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Progress</p>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all" 
                style={{ width: `${((currentQuestion + 1) / allQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 overflow-y-auto">
            {allQuestions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  onJumpToQuestion?.(idx);
                  setIsSidebarOpen(false);
                }}
                className={`h-10 rounded-lg text-xs font-bold transition-all ${
                  currentQuestion === idx ? 'ring-2 ring-blue-600 ring-offset-1' : ''
                } ${
                  answers[q.id] ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'
                } ${flagged[q.id] ? 'border-b-4 border-orange-500' : ''}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </aside>

        {/* --- Main Question Window --- */}
        <main className="flex-1 flex flex-col w-full max-w-full overflow-x-hidden">
          <div className="flex-1 p-4 sm:p-8 lg:p-4 overflow-y-auto">
            <div className="max-w-3xl mx-auto w-full">
              
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-black uppercase">
                  {isMCQ ? 'Part A: MCQ' : 'Part B: Subjective'}
                </span>
                <button 
                  onClick={() => toggleFlag(current.id)}
                  className={`flex items-center gap-2 text-xs font-bold transition-colors ${
                    flagged[current.id] ? 'text-orange-500' : 'text-slate-400'
                  }`}
                >
                  <Flag className={`w-4 h-4 ${flagged[current.id] ? 'fill-current' : ''}`} />
                  {flagged[current.id] ? 'Review Later' : 'Flag Question'}
                </button>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-4 border border-slate-200 shadow-sm transition-all duration-300">
                {isMCQ ? (
                  <MCQQuestion
                    question={current}
                    selectedAnswer={answers[current.id]}
                    onSelect={(index) => onAnswerChange(current.id, index)}
                  />
                ) : (
                  <SubjectiveQuestion
                    question={current}
                    answer={answers[current.id]}
                    onAnswerChange={(text) => onAnswerChange(current.id, text)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* --- Bottom Navigation --- */}
          <footer className="bg-white border-t border-slate-200 p-4 flex items-center justify-between sm:justify-center gap-4 sticky bottom-0">
            <button
              onClick={onPrevious}
              disabled={currentQuestion === 0}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 rounded-2xl font-bold text-slate-600 disabled:opacity-30 transition-all hover:bg-slate-50"
            >
              <ChevronLeft className="w-5 h-5" /> <span className="hidden sm:inline">Previous</span>
            </button>

            <button
              onClick={onNext}
              disabled={currentQuestion === allQuestions.length - 1}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-10 py-3 bg-slate-900 text-white rounded-2xl font-bold disabled:opacity-30 transition-all hover:shadow-lg active:scale-95"
            >
              <span className="hidden sm:inline">Next</span> <ChevronRight className="w-5 h-5" />
            </button>
          </footer>
        </main>
      </div>

      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ExamView;