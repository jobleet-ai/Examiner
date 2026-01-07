
import React, { useState, useEffect, useRef, createContext, useContext, use } from 'react';
import { Clock, AlertCircle, CheckCircle, Download, Mic, MicOff, BookOpen, Award, TrendingUp, TrendingDown } from 'lucide-react';
import GeminiService from './GeminiExamService';
import SetupView from './components/SetupView';
import ExamView from './components/ExamView';
import { demoData } from './components/examDemoData';
import ReportView from './components/ReportView';
import { showErrorToast, showSuccessToast } from '@/modules/utils/toastMsg';
import { getItem } from '@/tokenUtils';
import { useNavigate } from 'react-router-dom';

// ==================== CONTEXT & STATE MANAGEMENT ====================
const ExamContext = createContext();

const useExamStore = () => {

  const [state, setState] = useState({
    phase: 'setup', // setup, exam, report
    //phase: 'report', // setup, exam, report
    config: null,
    questions: [],
    answers: {},
    currentQuestion: 0,
    timeRemaining: 0,
    report: null,
    isGenerating: false,
    isEvaluating: false
  });

  // const [state, setState] = useState({
  //   phase: 'setup', // setup, exam, report
  //   //phase: 'report', // setup, exam, report
  //   config:  demoData.config,
  //   questions:  demoData.questions,
  //   answers: demoData.answers,
  //   currentQuestion: 0,
  //   timeRemaining: 20,
  //   report: demoData.evaluationData,
  //   isGenerating: false,
  //   isEvaluating: false
  // });



  const setPhase = (phase) => setState(prev => ({ ...prev, phase }));
  const setConfig = (config) => setState(prev => ({ ...prev, config }));
  const setQuestions = (questions) => setState(prev => ({ ...prev, questions }));
  const setAnswer = (questionId, answer) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer }
    }));
  };
  const setCurrentQuestion = (index) => setState(prev => ({ ...prev, currentQuestion: index }));
  const setTimeRemaining = (time) => setState(prev => ({ ...prev, timeRemaining: time }));
  const setReport = (report) => setState(prev => ({ ...prev, report }));
  const setIsGenerating = (val) => setState(prev => ({ ...prev, isGenerating: val }));
  const setIsEvaluating = (val) => setState(prev => ({ ...prev, isEvaluating: val }));

  return {
    state,
    setPhase,
    setConfig,
    setQuestions,
    setAnswer,
    setCurrentQuestion,
    setTimeRemaining,
    setReport,
    setIsGenerating,
    setIsEvaluating
  };
};

// ==================== CUSTOM HOOKS ====================
const useExamTimer = (duration, onTimeUp) => {
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, onTimeUp]);

  return {
    timeRemaining,
    isRunning,
    start: () => setIsRunning(true),
    pause: () => setIsRunning(false),
    reset: (newDuration) => {
      setTimeRemaining(newDuration * 60);
      setIsRunning(false);
    }
  };
};


// ==================== MAIN APP ====================
export default function ExampApp() {
  const store = useExamStore();
  const [demo, setDemo] = useState(false);
  const { state, setPhase, setConfig, setQuestions, setAnswer, setCurrentQuestion, setReport, setIsGenerating, setIsEvaluating } = store;
  const navigate = useNavigate();
  const timer = useExamTimer(state.config?.duration || 30, () => {
    handleSubmit();
  });

  const handleStart = async (config) => {

  let demo1 = false;

  if (getItem('token') === null) {
    // Trigger the confirmation for guests
    const proceedWithDemo = window.confirm(
      "Sign in to continue. Alternatively, would you like to proceed with a Demo version of this tool?"
    );

    if (proceedWithDemo) {
      demo1 = true;
      showSuccessToast("Entering Demo Mode. Progress will not be saved.", "info");
      // Continue to your demo logic here
    } else {
      demo1 = false;
      showErrorToast("Sign in required to access full features.");
      // Optional: Redirect to login
      navigate('/login');
      return; 
    }
  } else {
    // User is already signed in
    demo1 = false;
    // Proceed with full authenticated logic
  }
  setDemo(demo1);


    setConfig(config);
    setIsGenerating(true);
    
    try {
      const questions = await GeminiService.generateQuestions(config, demo1);
      setQuestions(questions);
      timer.reset(config.duration);
      timer.start();
      setPhase('exam');
    } catch (error) {
      alert('Failed to generate exam. Please try again.');
    } finally {
      setIsGenerating(false);
    }
}

// ==================== MAIN APP CONTINUED ====================
  const handleSubmit = async () => {
    timer.pause();
    setIsEvaluating(true);
    
    try {
      const evaluation = await GeminiService.evaluateAnswers(
        state.questions, 
        state.answers, 
        state.config,
        demo
      );
      console.log('evaluation:',evaluation)
      setReport(evaluation);
      setPhase('report');
    } catch (error) {
      alert('Failed to evaluate your exam. Your answers are saved locally, please try submitting again.');
      timer.start(); // Resume timer if evaluation fails
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleRestart = () => {
    if (window.confirm('Are you sure you want to start a new exam? All current progress will be lost.')) {
      window.location.reload(); // Simplest way to reset all complex states
    }
  };

  // Loading Screen Component
  if (state.isGenerating || state.isEvaluating) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {state.isGenerating ? 'AI is Crafting Your Exam...' : 'AI is Grading Your Performance...'}
        </h2>
        <p className="text-gray-600 text-center max-w-md">
          {state.isGenerating 
            ? "We're generating curriculum-specific questions based on your selection. This usually takes 10-15 seconds."
            : "Analyzing your answers against the expected points and calculating your topic-wise mastery."}
        </p>
      </div>
    );
  }

  // Phase Router
  switch (state.phase) {
    case 'setup':
      return <SetupView onStart={handleStart} />;
    
    case 'exam':
      return (
        <ExamView
          questions={state.questions}
          answers={state.answers}
          currentQuestion={state.currentQuestion}
          timeRemaining={timer.timeRemaining}
          onAnswerChange={setAnswer}
          onNext={() => setCurrentQuestion(state.currentQuestion + 1)}
          onPrevious={() => setCurrentQuestion(state.currentQuestion - 1)}
          onSubmit={handleSubmit}
        />
      );
    
    case 'report':
      return (
        <ReportView 
          report={state.report} 
          config={state.config} 
          onRestart={handleRestart} 
        />
      );
    
    default:
      return <SetupView onStart={handleStart} />;
  }
}