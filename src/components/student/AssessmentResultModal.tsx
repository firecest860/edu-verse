import React, { useEffect } from 'react';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  BrainCircuit, 
  ArrowRight, 
  Zap, 
  Star 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AssessmentAttempt } from '../../types';

interface AssessmentResultModalProps {
  attempt: AssessmentAttempt;
  onClose: () => void;
  onViewAnalytics?: () => void;
}

export const AssessmentResultModal: React.FC<AssessmentResultModalProps> = ({
  attempt,
  onClose,
  onViewAnalytics,
}) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {}
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in zoom-in-95 duration-200">
      <div className="bg-[#131b2e] border border-cyan-500/40 rounded-3xl w-full max-w-xl overflow-hidden shadow-glow-cyan space-y-0 relative">
        {/* Top Celebration Banner */}
        <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border-b border-slate-800 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-400 to-indigo-500 p-[1px] mx-auto shadow-glow-cyan animate-bounce">
              <div className="w-full h-full bg-[#0b0f19] rounded-[23px] flex items-center justify-center text-cyan-400">
                <Award className="w-8 h-8" />
              </div>
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-extrabold uppercase tracking-wider">
              🎉 Mission Completed!
            </span>

            <h2 className="text-2xl font-extrabold text-white">Assessment Mastery Result</h2>
            <p className="text-xs text-slate-300">{attempt.studentName}</p>
          </div>
        </div>

        {/* Score & XP Grid */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Mastery Score</p>
              <p className="text-3xl font-extrabold text-cyan-300 mt-1">{attempt.score}%</p>
              <span className="text-[11px] text-emerald-400 font-bold mt-0.5 inline-block">
                {attempt.score >= 70 ? 'Passed' : 'Needs Practice'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase">XP Earned</p>
              <p className="text-3xl font-extrabold text-indigo-300 mt-1">+{attempt.xpEarned}</p>
              <span className="text-[11px] text-amber-300 font-bold mt-0.5 inline-block flex items-center justify-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>Level Progress</span>
              </span>
            </div>
          </div>

          {/* AI Performance Analysis Section */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-purple-300">
              <BrainCircuit className="w-4 h-4 text-cyan-400" />
              <span>AI Mastery Analysis</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-300">Strength: </span>
                  <span>{attempt.aiAnalysis.strengthSummary}</span>
                </div>
              </div>

              <div className="flex items-start space-x-2 text-slate-200">
                <TrendingUp className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-indigo-300">Recommended Next Step: </span>
                  <span>{attempt.aiAnalysis.recommendedNextStep}</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              "{attempt.aiAnalysis.naturalLanguageInsight}"
            </p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Progress & Mastery Recorded
            </span>
            <span className="text-[10px] text-slate-400">Teacher & Parent Portals Updated</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-900/90 border-t border-slate-800 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-glow-cyan flex items-center justify-center space-x-2 transition-all"
          >
            <span>Continue Learning Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
