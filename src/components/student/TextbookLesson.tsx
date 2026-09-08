import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Award,
  Bookmark,
  ChevronRight,
  Code2
} from 'lucide-react';
import { CompanionId, Lesson, TextbookLessonData, TextbookChapter } from '../../types';

interface TextbookLessonProps {
  lesson?: Lesson;
  companionId?: CompanionId;
  onLaunchComic?: () => void;
  onLaunchSimulation?: (subject?: string) => void;
}

export const TextbookLesson: React.FC<TextbookLessonProps> = ({
  lesson,
  companionId,
  onLaunchComic,
  onLaunchSimulation,
}) => {
  const defaultLesson: Partial<Lesson> = {
    id: 'les-1',
    title: 'Mastering C For Loops — Builder World Construction',
    subject: 'Programming',
    topic: 'For Loop Mechanics in C'
  };
  const activeLesson = lesson || (defaultLesson as Lesson);
  const data: TextbookLessonData = activeLesson.textbookData || {
    id: `tb-${activeLesson.id}`,
    lessonId: activeLesson.id,
    title: `Chapter 01: Understanding ${activeLesson.topic}`,
    topic: activeLesson.topic,
    subject: activeLesson.subject,
    chapters: [
      {
        chapterNumber: 1,
        title: `Introduction to ${activeLesson.topic}`,
        explanation: `${activeLesson.content}\n\nEduVerse AI transforms raw academic logic into structured understanding. Read through the concept rules and worked examples below.`,
        workedExample: {
          codeOrFormula: activeLesson.subject === 'Programming' 
            ? 'for (int i = 0; i < 10; i++) {\n    buildWall(i + 1);\n}'
            : 'HCl (aq) + NaOH (aq) ➔ NaCl (aq) + H₂O (l)',
          explanation: 'Observe how the control statements manage repetition and operational scope.'
        },
        keyTakeaways: [
          'Core concept logic structures repetitive actions efficiently.',
          'Execution flow evaluates boolean conditions before entering statement body.',
          'State updates occur deterministically after each cycle.'
        ],
        understandingCheck: {
          question: `What is the primary role of ${activeLesson.topic} in ${activeLesson.subject}?`,
          options: [
            'Executing statements repeatedly using counter boundaries',
            'Closing application windows',
            'Randomizing memory values'
          ],
          correctOptionIndex: 0,
          explanation: 'Control logic structures repeat execution cycles based on explicit boundary rules!'
        }
      }
    ],
    summary: activeLesson.summary,
    audioTranscript: `Welcome to the digital textbook for ${activeLesson.title}. Today we learn ${activeLesson.topic}. Let us begin Chapter 1.`
  };

  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(0);
  const [selectedCheckIdx, setSelectedCheckIdx] = useState<number | null>(null);
  const [showCheckExplanation, setShowCheckExplanation] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  const currentChapter: TextbookChapter = data.chapters[activeChapterIdx] || data.chapters[0];

  const handleSelectCheckOption = (idx: number) => {
    setSelectedCheckIdx(idx);
    setShowCheckExplanation(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>PRIMARY READ MODE — INTERACTIVE TEXTBOOK</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">{activeLesson.title}</h1>
          <p className="text-xs text-slate-300 mt-1">{activeLesson.summary}</p>
        </div>

        {/* Optional Voice Read-Along Player */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 flex items-center space-x-3 shrink-0 shadow-lg">
          <button
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs flex items-center space-x-2 shadow-glow-cyan"
          >
            {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isPlayingAudio ? 'Pause Narration' : 'Listen to Lesson'}</span>
          </button>

          <div className="flex items-center space-x-1">
            {[1.0, 1.25, 1.5].map((sp) => (
              <button
                key={sp}
                onClick={() => setPlaybackSpeed(sp)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  playbackSpeed === sp ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {sp}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Voice Transcript Bar (Appears when Audio Player is Active) */}
      {isPlayingAudio && (
        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 text-xs flex items-start space-x-3 animate-in fade-in duration-200">
          <Volume2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
          <div>
            <span className="font-bold text-cyan-300">Voice Audio Transcript ({playbackSpeed}x): </span>
            <span className="text-slate-200 italic">"{data.audioTranscript}"</span>
          </div>
        </div>
      )}

      {/* Main Grid: Chapter TOC Sidebar (4 Cols) & Textbook Reader (8 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* TOC Sidebar */}
        <div className="lg:col-span-4 bg-[#131b2e] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Bookmark className="w-4 h-4 text-cyan-400" />
              <span>Table of Contents</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">{data.chapters.length} Chapters</span>
          </div>

          <div className="space-y-2">
            {data.chapters.map((chap, idx) => (
              <button
                key={chap.chapterNumber}
                onClick={() => {
                  setActiveChapterIdx(idx);
                  setSelectedCheckIdx(null);
                  setShowCheckExplanation(false);
                }}
                className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${
                  activeChapterIdx === idx
                    ? 'bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border-cyan-400 text-white shadow-glow-indigo'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono text-cyan-300 font-bold">CHAPTER 0{chap.chapterNumber}</span>
                  <p className="font-bold text-white mt-0.5">{chap.title}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            ))}
          </div>

          {/* Action Launcher Buttons */}
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <button
              onClick={onLaunchComic}
              className="w-full py-2.5 px-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 font-bold text-xs flex items-center justify-center space-x-2 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Read AI Comic Story</span>
            </button>

            <button
              onClick={() => onLaunchSimulation?.(data.subject)}
              className="w-full py-2.5 px-3 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center justify-center space-x-2 transition-colors"
            >
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>Launch 2D Simulation World</span>
            </button>
          </div>
        </div>

        {/* Textbook Main Content Body */}
        <div className="lg:col-span-8 bg-[#131b2e] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="space-y-2 border-b border-slate-800/80 pb-4">
            <span className="text-xs font-mono font-bold text-cyan-300">CHAPTER 0{currentChapter.chapterNumber}</span>
            <h2 className="text-xl font-extrabold text-white">{currentChapter.title}</h2>
          </div>

          {/* Chapter Text Explanation */}
          <div className="text-sm text-slate-200 leading-relaxed space-y-3 font-normal">
            {currentChapter.explanation.split('\n\n').map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>

          {/* Worked Code or Formula Example */}
          {currentChapter.workedExample && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 shadow-inner">
              <div className="flex items-center space-x-2 text-xs font-bold text-cyan-300">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Worked Example & Syntax Blueprint</span>
              </div>
              <pre className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800 font-mono text-xs text-cyan-300 leading-relaxed overflow-x-auto">
                {currentChapter.workedExample.codeOrFormula}
              </pre>
              <p className="text-xs text-slate-300 italic">{currentChapter.workedExample.explanation}</p>
            </div>
          )}

          {/* Key Takeaways Box */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Key Chapter Takeaways</span>
            <ul className="space-y-1.5 text-xs text-slate-200">
              {currentChapter.keyTakeaways.map((item, tIdx) => (
                <li key={tIdx} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive "Check Your Understanding" Checkpoint */}
          {currentChapter.understandingCheck && (
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Check Your Understanding (+25 XP)</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Interactive Check</span>
              </div>

              <p className="text-xs font-bold text-white">{currentChapter.understandingCheck.question}</p>

              <div className="space-y-2">
                {currentChapter.understandingCheck.options.map((opt, oIdx) => {
                  const isCorrect = oIdx === currentChapter.understandingCheck?.correctOptionIndex;
                  const isSelected = selectedCheckIdx === oIdx;

                  let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';
                  if (showCheckExplanation) {
                    if (isCorrect) btnStyle = 'bg-emerald-950/60 border-emerald-400 text-emerald-200 shadow-glow-emerald';
                    else if (isSelected && !isCorrect) btnStyle = 'bg-rose-950/60 border-rose-400 text-rose-200';
                    else btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-50';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={showCheckExplanation}
                      onClick={() => handleSelectCheckOption(oIdx)}
                      className={`w-full p-3 rounded-xl border text-xs font-semibold text-left transition-all ${btnStyle}`}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {showCheckExplanation && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 font-medium">
                  ✓ {currentChapter.understandingCheck.explanation}
                </div>
              )}
            </div>
          )}

          {/* Textbook Chapter Navigation Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                if (activeChapterIdx > 0) setActiveChapterIdx(prev => prev - 1);
              }}
              disabled={activeChapterIdx === 0}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center space-x-1.5 disabled:opacity-40 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Chapter</span>
            </button>

            {activeChapterIdx < data.chapters.length - 1 ? (
              <button
                onClick={() => setActiveChapterIdx(prev => prev + 1)}
                className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-glow-indigo flex items-center space-x-1.5 transition-all"
              >
                <span>Next Chapter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onLaunchComic}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white font-extrabold text-xs shadow-glow-purple flex items-center space-x-2 transition-all"
              >
                <span>Read AI Comic Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
