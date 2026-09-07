import React from 'react';
import { 
  Compass, 
  Sparkles, 
  Flame, 
  Award, 
  Play, 
  CheckCircle2, 
  Hammer, 
  FlaskConical, 
  ArrowRight,
  BrainCircuit,
  TrendingUp
} from 'lucide-react';
import { StudentProfile, Lesson, WorldArchetype } from '../../types';
import { WORLD_ARCHETYPES, COMPANIONS } from '../../db/initialData';
import { SkillProgressionMap } from './SkillProgressionMap';

interface StudentDashboardProps {
  studentProfile: StudentProfile;
  lessons: Lesson[];
  onOpenWorldSelector: () => void;
  onLaunchLesson: (lesson: Lesson) => void;
  onLaunchChemistryLab: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  studentProfile,
  lessons,
  onOpenWorldSelector,
  onLaunchLesson,
  onLaunchChemistryLab,
}) => {
  const currentWorldInfo = WORLD_ARCHETYPES.find(w => w.id === studentProfile.preferredWorld) || WORLD_ARCHETYPES[0];
  const companion = COMPANIONS.find(c => c.id === studentProfile.companionId) || COMPANIONS[2];

  const flagshipLesson = lessons.find(l => l.subject === 'Programming') || lessons[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Personalized Hero Banner with Companion */}
      <div className={`p-6 md:p-8 rounded-3xl bg-gradient-to-r ${currentWorldInfo.bgGradient} border ${currentWorldInfo.accentBorder} shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6`}>
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-extrabold flex items-center space-x-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>MY LEARNING UNIVERSE</span>
            </span>

            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold">
              GUIDE: {companion.name} ({companion.title})
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Good evening, {studentProfile.name}!
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed italic">
            "{companion.quote}"
          </p>

          <div className="pt-2 flex items-center space-x-3">
            <button
              onClick={() => onLaunchLesson(flagshipLesson)}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-glow-cyan flex items-center space-x-2 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Continue C Fortress Mission</span>
            </button>

            <button
              onClick={onOpenWorldSelector}
              className="py-3 px-4 rounded-2xl bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-slate-300 font-bold text-xs flex items-center space-x-2 transition-all shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Switch Realm</span>
            </button>
          </div>
        </div>

        {/* Companion Avatar Card */}
        <div className="relative shrink-0 hidden sm:block">
          <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${companion.bgGradient} p-1 shadow-2xl ring-4 ring-cyan-500/30`}>
            <img 
              src={companion.avatarUrl} 
              alt={companion.name} 
              className="w-full h-full rounded-[20px] object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-slate-700 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-cyan-300 shadow">
            {companion.name} ACTIVE
          </div>
        </div>
      </div>

      {/* Gamification Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#131b2e] border border-slate-800 flex items-center space-x-3 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Flame className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Daily Streak</p>
            <p className="text-base font-extrabold text-amber-300">{studentProfile.streakDays} Days</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#131b2e] border border-slate-800 flex items-center space-x-3 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Experience Points</p>
            <p className="text-base font-extrabold text-indigo-300">{studentProfile.xp} XP</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#131b2e] border border-slate-800 flex items-center space-x-3 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Hero Level</p>
            <p className="text-base font-extrabold text-cyan-300">Lvl {studentProfile.level}</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#131b2e] border border-slate-800 flex items-center space-x-3 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Overall Mastery</p>
            <p className="text-base font-extrabold text-emerald-300">{studentProfile.overallMastery}%</p>
          </div>
        </div>
      </div>

      {/* Grid: Skill Progression Map (Left 7 Cols) & AI Recommendation (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <SkillProgressionMap 
            onLaunchActiveMission={() => onLaunchLesson(flagshipLesson)}
          />
        </div>

        <div className="lg:col-span-5 space-y-6">
          {/* AI Companion Recommendation Card */}
          <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/60 border border-indigo-500/40 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-300 bg-cyan-500/20 border border-cyan-500/40 px-2.5 py-1 rounded-full flex items-center space-x-1">
                <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
                <span>{companion.name}'s Recommendation</span>
              </span>
              <span className="text-xs text-slate-400">Personalized</span>
            </div>

            <div>
              <h4 className="text-base font-extrabold text-white">Recommended: Builder Fortress Challenge</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Based on your preference for <span className="text-cyan-300 font-bold">{studentProfile.learningStyle}</span> and <span className="text-purple-300 font-bold">{studentProfile.motivation}</span>, {companion.name} recommends practicing C loop boundary conditions in Builder Village.
              </p>
            </div>

            <button
              onClick={() => onLaunchLesson(flagshipLesson)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-glow-cyan flex items-center justify-center space-x-2 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Recommended Mission (+150 XP)</span>
            </button>
          </div>

          {/* Chemistry Lab Secondary Mission Card */}
          <div className="bg-[#131b2e] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                VIRTUAL SCIENCE LAB
              </span>
              <span className="text-xs font-bold text-emerald-400">+120 XP</span>
            </div>

            <div>
              <h4 className="text-sm font-extrabold text-white">Acids, Bases & pH Spectrum</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Simulate Hydrochloric acid and Sodium hydroxide titration with phenolphthalein indicator.
              </p>
            </div>

            <button
              onClick={onLaunchChemistryLab}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-300 font-extrabold text-xs flex items-center justify-center space-x-2 transition-colors"
            >
              <FlaskConical className="w-4 h-4 text-emerald-400" />
              <span>Enter Chemistry Lab</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
