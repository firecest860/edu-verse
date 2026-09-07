import React from 'react';
import { CheckCircle2, Lock, Sparkles, Award, Play } from 'lucide-react';

interface SkillNode {
  id: string;
  title: string;
  concept: string;
  status: 'COMPLETED' | 'ACTIVE' | 'LOCKED';
  xpReward: number;
  icon?: string;
}

interface SkillProgressionMapProps {
  onLaunchActiveMission: () => void;
}

const SKILL_TREE: SkillNode[] = [
  { id: 'node-1', title: '01. FOUNDATIONS', concept: 'C Syntax & Printing', status: 'COMPLETED', xpReward: 100 },
  { id: 'node-2', title: '02. VARIABLES', concept: 'Data Types & Values', status: 'COMPLETED', xpReward: 120 },
  { id: 'node-3', title: '03. LOOPS & REPETITION', concept: 'For Loop Builder World', status: 'ACTIVE', xpReward: 150 },
  { id: 'node-4', title: '04. CONDITIONS', concept: 'If/Else Logic Gates', status: 'LOCKED', xpReward: 180 },
  { id: 'node-5', title: '05. FUNCTIONS', concept: 'Scope & Parameters', status: 'LOCKED', xpReward: 200 },
  { id: 'node-6', title: '06. BOSS CHALLENGE', concept: 'FORTRESS MASTER', status: 'LOCKED', xpReward: 500 }
];

export const SkillProgressionMap: React.FC<SkillProgressionMapProps> = ({ onLaunchActiveMission }) => {
  return (
    <div className="bg-[#131b2e] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Skill Progression Map</span>
          </h3>
          <p className="text-[11px] text-slate-400">Master concepts sequentially to unlock the Boss Challenge</p>
        </div>
        <span className="text-xs font-bold text-cyan-300 bg-cyan-500/20 border border-cyan-500/40 px-2.5 py-0.5 rounded-full">
          Level 5 CS Path
        </span>
      </div>

      {/* Vertical Skill Tree Path */}
      <div className="relative py-2 space-y-4">
        {SKILL_TREE.map((node, idx) => {
          const isCompleted = node.status === 'COMPLETED';
          const isActive = node.status === 'ACTIVE';
          const isLocked = node.status === 'LOCKED';

          return (
            <div key={node.id} className="relative flex items-center space-x-4">
              {/* Connector Line */}
              {idx < SKILL_TREE.length - 1 && (
                <div 
                  className={`absolute left-5 top-10 w-0.5 h-8 -z-0 ${
                    isCompleted ? 'bg-emerald-500' : isActive ? 'bg-cyan-500/60' : 'bg-slate-800'
                  }`}
                />
              )}

              {/* Node Icon */}
              <div 
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 z-10 transition-all ${
                  isCompleted
                    ? 'bg-emerald-950 border border-emerald-500 text-emerald-400 shadow-glow-emerald'
                    : isActive
                    ? 'bg-cyan-950 border-2 border-cyan-400 text-cyan-300 shadow-glow-cyan animate-pulse'
                    : 'bg-slate-900 border border-slate-800 text-slate-600'
                }`}
              >
                {isCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                {isActive && <Sparkles className="w-5 h-5 text-cyan-300" />}
                {isLocked && <Lock className="w-4 h-4 text-slate-600" />}
              </div>

              {/* Node Card */}
              <div 
                className={`flex-1 p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border-cyan-400 shadow-glow-cyan'
                    : isCompleted
                    ? 'bg-slate-900/60 border-slate-800/80 text-slate-300'
                    : 'bg-slate-950/40 border-slate-900 text-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400">{node.title}</span>
                    {isActive && (
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        Current Mission
                      </span>
                    )}
                  </div>
                  <h4 className={`text-xs font-bold ${isActive ? 'text-white' : isCompleted ? 'text-slate-200' : 'text-slate-500'}`}>
                    {node.concept}
                  </h4>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-bold text-amber-300">+{node.xpReward} XP</span>
                  {isActive && (
                    <button
                      onClick={onLaunchActiveMission}
                      className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-[11px] shadow-glow-cyan flex items-center space-x-1 transition-all"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Start</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
