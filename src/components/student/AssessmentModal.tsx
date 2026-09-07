import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  Award, 
  Clock, 
  Code2,
  X
} from 'lucide-react';
import { Assessment, Question, AssessmentAttempt } from '../../types';
import { performanceAnalyzer } from '../../services/ai/performanceAnalyzer';
import { apiClient } from '../../services/apiClient';

interface AssessmentModalProps {
  assessment: Assessment;
  lessonId: string;
  studentId: string;
  studentName: string;
  topicName: string;
  onClose: () => void;
  onSubmitted: (attempt: AssessmentAttempt) => void;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  assessment,
  lessonId,
  studentId,
  studentName,
  topicName,
  onClose,
  onSubmitted,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question: Question = assessment.questions[currentQuestionIndex];
  const totalQuestions = assessment.questions.length;
  const isSelected = selectedAnswers[question.id] !== undefined;
  const selectedIndex = selectedAnswers[question.id];

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return;
    setSelectedAnswers(prev => ({ ...prev, [question.id]: idx }));
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmitAssessment();
    }
  };

  const handleSubmitAssessment = async () => {
    setIsSubmitting(true);

    // Compute score & accuracy
    let correctCount = 0;
    const answerRecords = assessment.questions.map(q => {
      const selected = selectedAnswers[q.id] ?? -1;
      const isCorrect = selected === q.correctOptionIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        selectedIndex: selected,
        isCorrect
      };
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    const xpEarned = Math.round(assessment.totalXP * (score / 100));

    // Get AI Performance analysis
    const aiAnalysis = performanceAnalyzer.analyzeAttempt(score, score, topicName);

    const attemptPayload: Omit<AssessmentAttempt, 'id' | 'completedAt'> = {
      assessmentId: assessment.id,
      studentId,
      studentName,
      lessonId,
      score,
      accuracy: score,
      xpEarned,
      timeSpentSeconds: 120,
      answers: answerRecords,
      conceptMasteryUpdates: [
        { conceptId: 'cpt-1', conceptName: 'Loop Initialization', score: Math.min(100, score + 5) },
        { conceptId: 'cpt-2', conceptName: 'Relational Condition', score },
        { conceptId: 'cpt-3', conceptName: 'Increment Step', score: Math.min(100, score + 3) }
      ],
      aiAnalysis,
    };

    const savedAttempt = await apiClient.attempts.submit(attemptPayload);
    setIsSubmitting(false);
    onSubmitted(savedAttempt);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#131b2e] border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-0 relative">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-cyan-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">{assessment.title}</h2>
              <p className="text-xs text-slate-400">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-900 h-1.5">
          <div 
            className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question Body */}
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
              {question.difficulty} DIFFICULTY
            </span>
            <div className="flex items-center space-x-1 text-xs text-amber-300 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>+{Math.round(assessment.totalXP / totalQuestions)} XP</span>
            </div>
          </div>

          <h3 className="text-base font-bold text-white leading-snug">
            {question.prompt}
          </h3>

          {question.codeSnippet && (
            <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 font-mono text-xs text-cyan-300 shadow-inner">
              <pre>{question.codeSnippet}</pre>
            </div>
          )}

          {/* Options Grid */}
          <div className="space-y-3 pt-2">
            {question.options.map((option, idx) => {
              const isOptionSelected = selectedIndex === idx;
              const isCorrectOption = idx === question.correctOptionIndex;

              let btnStyle = 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-slate-700';

              if (showExplanation) {
                if (isCorrectOption) {
                  btnStyle = 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200 shadow-glow-emerald';
                } else if (isOptionSelected && !isCorrectOption) {
                  btnStyle = 'bg-rose-950/40 border-rose-500/80 text-rose-200';
                } else {
                  btnStyle = 'bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-2xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${btnStyle}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-[11px] shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {showExplanation && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                  {showExplanation && isOptionSelected && !isCorrectOption && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Immediate Feedback Explanation Box */}
          {showExplanation && (
            <div className={`p-4 rounded-2xl border text-xs space-y-1.5 animate-in fade-in duration-200 ${
              selectedIndex === question.correctOptionIndex 
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
            }`}>
              <div className="flex items-center space-x-2 font-bold">
                {selectedIndex === question.correctOptionIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Correct Answer!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>Incorrect Answer</span>
                  </>
                )}
              </div>
              <p className="text-slate-300 leading-relaxed pl-6">{question.explanation}</p>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="p-6 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {isSelected ? 'Click Next Question to continue' : 'Select an option above'}
          </span>

          <button
            onClick={handleNextQuestion}
            disabled={!isSelected || isSubmitting}
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-glow-indigo flex items-center space-x-2 disabled:opacity-40 transition-all"
          >
            <span>{currentQuestionIndex === totalQuestions - 1 ? 'Submit Assessment' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
