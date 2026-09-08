import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Play, 
  Award, 
  Hammer, 
  FlaskConical,
  MessageSquare
} from 'lucide-react';
import { COMPANIONS } from '../../db/initialData';
import { ComicStory, ComicPanel, CompanionId, Lesson } from '../../types';
import { comicGenerator } from '../../services/ai/comicGenerator';

interface AIComicLearningProps {
  companionId: CompanionId;
  lessons: Lesson[];
  onLaunchSimulation: (subject: string) => void;
}

export const AIComicLearning: React.FC<AIComicLearningProps> = ({
  companionId,
  lessons,
  onLaunchSimulation,
}) => {
  const companion = COMPANIONS.find(c => c.id === companionId) || COMPANIONS[2];

  // Active Story selection state
  const [selectedStory, setSelectedStory] = useState<ComicStory | null>(null);
  const [currentPanelIdx, setCurrentPanelIdx] = useState<number>(0);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);
  const [showChoiceExplanation, setShowChoiceExplanation] = useState<boolean>(false);
  const [earnedXP, setEarnedXP] = useState<number>(0);

  // Generate stories for C loops and Chemistry
  const programmingStory = comicGenerator.generateComicStory('Programming', 'For Loops in C', 'Mastering C For Loops', companionId);
  const chemistryStory = comicGenerator.generateComicStory('Chemistry', 'Acids and Bases', 'pH Spectrum Lab', companionId);

  const stories = [programmingStory, chemistryStory];

  const handleStartStory = (story: ComicStory) => {
    setSelectedStory(story);
    setCurrentPanelIdx(0);
    setSelectedChoiceIdx(null);
    setShowChoiceExplanation(false);
  };

  const handleNextPanel = () => {
    if (!selectedStory) return;
    if (currentPanelIdx < selectedStory.panels.length - 1) {
      setCurrentPanelIdx(prev => prev + 1);
      setSelectedChoiceIdx(null);
      setShowChoiceExplanation(false);
    }
  };

  const handlePrevPanel = () => {
    if (currentPanelIdx > 0) {
      setCurrentPanelIdx(prev => prev - 1);
      setSelectedChoiceIdx(null);
      setShowChoiceExplanation(false);
    }
  };

  const handleSelectPrediction = (idx: number, correctIdx: number) => {
    if (showChoiceExplanation) return;
    setSelectedChoiceIdx(idx);
    setShowChoiceExplanation(true);
    if (idx === correctIdx) {
      setEarnedXP(prev => prev + 25);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Landing View (When no story is currently active) */}
      {!selectedStory ? (
        <div className="space-y-6">
          {/* Hero Banner */}
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative z-10 space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-extrabold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>AI INTERACTIVE COMIC LEARNING</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Learn it. Live it. Remember it.
              </h1>
              <p className="text-xs text-slate-300 leading-relaxed">
                Transform academic syllabus concepts into interactive narrative comics with your companion <span className="text-cyan-300 font-bold">{companion.name}</span>!
              </p>
            </div>

            {/* Companion Card */}
            <div className="flex items-center space-x-3 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl shrink-0">
              <img src={companion.avatarUrl} alt={companion.name} className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <p className="text-xs font-extrabold text-white">{companion.name}</p>
                <p className="text-[10px] text-cyan-300">{companion.title}</p>
              </div>
            </div>
          </div>

          {/* Stories Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Today's Learning Stories</span>
              </h2>
              <span className="text-xs text-slate-400">{stories.length} Stories Available</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stories.map((story) => (
                <div 
                  key={story.id}
                  className="p-6 rounded-3xl bg-[#131b2e] border border-slate-800 hover:border-purple-500/50 shadow-xl transition-all space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-extrabold uppercase">
                        {story.subject}
                      </span>
                      <span className="text-xs font-bold text-amber-300 flex items-center space-x-1">
                        <Award className="w-3.5 h-3.5" />
                        <span>+{story.totalXP} XP</span>
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-extrabold text-white group-hover:text-purple-300 transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1">{story.summary}</p>
                    </div>

                    <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Guide: {companion.name}</span>
                      <span>{story.panels.length} Chapters</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartStory(story)}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-glow-purple flex items-center justify-center space-x-2 transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read Interactive Comic</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Interactive Comic Panel Reader */
        <div className="bg-[#131b2e] border border-purple-500/40 rounded-3xl overflow-hidden shadow-2xl space-y-0 animate-in zoom-in-95 duration-200">
          {/* Comic Header */}
          <div className="p-6 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedStory(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Exit Comic</span>
              </button>
              <div>
                <span className="text-[10px] font-extrabold text-cyan-300 uppercase tracking-wider">
                  {selectedStory.panels[currentPanelIdx].chapterTitle}
                </span>
                <h2 className="text-base font-extrabold text-white">{selectedStory.title}</h2>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xs text-amber-300 font-bold flex items-center space-x-1 bg-amber-500/20 border border-amber-500/40 px-3 py-1 rounded-full">
                <Award className="w-3.5 h-3.5" />
                <span>+{earnedXP} XP Earned</span>
              </span>
            </div>
          </div>

          {/* Chapter Progress Bar */}
          <div className="w-full bg-slate-900 h-1.5">
            <div 
              className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-full transition-all duration-300"
              style={{ width: `${((currentPanelIdx + 1) / selectedStory.panels.length) * 100}%` }}
            />
          </div>

          {/* Panel Main Scene Body */}
          {(() => {
            const panel = selectedStory.panels[currentPanelIdx];
            return (
              <div className={`p-6 md:p-8 bg-gradient-to-br ${panel.bgTheme} space-y-6`}>
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Companion Dialogue Speech Bubble */}
                  <div className="flex items-start space-x-4 flex-1">
                    <img 
                      src={companion.avatarUrl} 
                      alt={companion.name} 
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-cyan-400 shadow-xl shrink-0"
                    />
                    <div className="bg-slate-900/90 border border-slate-700/80 p-4 rounded-3xl shadow-xl relative text-xs space-y-1">
                      <p className="font-extrabold text-cyan-300">{companion.name} ({companion.title})</p>
                      <p className="text-slate-100 text-sm leading-relaxed font-medium">
                        {panel.characterDialogue}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Concept Highlight Box */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-indigo-500/30 text-xs space-y-1">
                  <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">Concept Key</span>
                  <p className="text-slate-200 font-semibold">{panel.conceptHighlight}</p>
                </div>

                {/* Code or Formula Snippet */}
                {panel.codeOrFormulaSnippet && (
                  <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 font-mono text-xs text-cyan-300 shadow-inner">
                    <pre>{panel.codeOrFormulaSnippet}</pre>
                  </div>
                )}

                {/* Interactive Decision / Prediction Choice */}
                {panel.predictionChoice && (
                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-bold text-cyan-300">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Interactive Prediction Challenge (+25 XP)</span>
                    </div>

                    <p className="text-xs font-bold text-white leading-snug">
                      {panel.predictionChoice.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {panel.predictionChoice.options.map((opt, idx) => {
                        const isCorrect = idx === panel.predictionChoice?.correctOptionIndex;
                        const isSelected = selectedChoiceIdx === idx;

                        let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';
                        if (showChoiceExplanation) {
                          if (isCorrect) btnStyle = 'bg-emerald-950/60 border-emerald-400 text-emerald-200 shadow-glow-emerald';
                          else if (isSelected && !isCorrect) btnStyle = 'bg-rose-950/60 border-rose-400 text-rose-200';
                          else btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-50';
                        }

                        return (
                          <button
                            key={idx}
                            disabled={showChoiceExplanation}
                            onClick={() => handleSelectPrediction(idx, panel.predictionChoice!.correctOptionIndex)}
                            className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${btnStyle}`}
                          >
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {showChoiceExplanation && (
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 font-medium">
                        ✓ {panel.predictionChoice.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Comic Navigation Footer Controls */}
          <div className="p-6 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={handlePrevPanel}
              disabled={currentPanelIdx === 0}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center space-x-1.5 disabled:opacity-40 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Panel</span>
            </button>

            <span className="text-xs font-mono text-slate-400">
              Panel {currentPanelIdx + 1} of {selectedStory.panels.length}
            </span>

            {currentPanelIdx < selectedStory.panels.length - 1 ? (
              <button
                onClick={handleNextPanel}
                className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-glow-purple flex items-center space-x-1.5 transition-all"
              >
                <span>Next Panel</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              /* Final Panel CTA to Enter 2D Simulation World */
              <button
                onClick={() => onLaunchSimulation(selectedStory.subject)}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-black text-xs shadow-glow-emerald flex items-center space-x-2 animate-bounce transition-all"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Enter the World → Apply What You Learned</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
