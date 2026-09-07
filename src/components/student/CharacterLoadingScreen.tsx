import React, { useState, useEffect } from 'react';
import { COMPANIONS } from '../../db/initialData';
import { CompanionId } from '../../types';
import { Sparkles, CheckCircle2, Loader2, Compass } from 'lucide-react';

interface CharacterLoadingScreenProps {
  companionId: CompanionId;
  onFinished: () => void;
}

const CINEMATIC_STAGES = [
  { stage: 1, title: "Observing your learning preferences...", detail: "Let's see how you like to learn." },
  { stage: 2, title: "Mapping your learning style...", detail: "Structuring interactive visual challenges around your style." },
  { stage: 3, title: "Locating high-growth topics...", detail: "I've found where you can grow fastest in C Programming." },
  { stage: 4, title: "Building your personalized journey...", detail: "Connecting concepts into a skill tree progression map." },
  { stage: 5, title: "Preparing your first challenge...", stageTitle: "Builder Fortress Mission ready", detail: "Your first challenge is almost ready." },
  { stage: 6, title: "Your learning world is ready!", detail: "Entering your personalized learning universe..." }
];

export const CharacterLoadingScreen: React.FC<CharacterLoadingScreenProps> = ({ companionId, onFinished }) => {
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const companion = COMPANIONS.find(c => c.id === companionId) || COMPANIONS[2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIdx(prev => {
        if (prev < CINEMATIC_STAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(onFinished, 400);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [onFinished]);

  const stage = CINEMATIC_STAGES[currentStageIdx];

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0f19] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
      {/* Glow aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full space-y-8">
        {/* Companion Avatar Card */}
        <div className="relative inline-block">
          <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${companion.bgGradient} p-1 shadow-2xl mx-auto ring-4 ring-cyan-500/40 animate-pulse`}>
            <img 
              src={companion.avatarUrl} 
              alt={companion.name}
              className="w-full h-full rounded-[20px] object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-slate-700 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-cyan-300 shadow">
            {companion.name}
          </div>
        </div>

        {/* Header & Stage Quote */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>CREATING YOUR LEARNING UNIVERSE</span>
          </div>

          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {stage.title}
          </h2>
          <p className="text-sm text-cyan-300 italic font-medium">
            "{stage.detail}"
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800 shadow-inner">
          <div 
            className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentStageIdx + 1) / CINEMATIC_STAGES.length) * 100}%` }}
          />
        </div>

        {/* Stage Checklist */}
        <div className="grid grid-cols-2 gap-2 text-left text-xs">
          {CINEMATIC_STAGES.map((s, idx) => {
            const isDone = idx < currentStageIdx;
            const isCurrent = idx === currentStageIdx;
            return (
              <div 
                key={s.stage}
                className={`p-2.5 rounded-xl border flex items-center space-x-2 transition-all ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                    : isCurrent
                    ? 'bg-indigo-950/40 border-cyan-500/60 text-white font-bold'
                    : 'bg-slate-900/30 border-slate-800 text-slate-500'
                }`}
              >
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                {isCurrent && <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin shrink-0" />}
                {!isDone && !isCurrent && <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />}
                <span className="truncate text-[11px]">{s.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
