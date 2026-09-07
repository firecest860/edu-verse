import React, { useState } from 'react';
import { COMPANIONS } from '../../db/initialData';
import { CompanionId, LearningStyle, Motivation, CompanionInfo } from '../../types';
import { 
  Sparkles, 
  Hammer, 
  Compass, 
  BrainCircuit, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Award,
  Flame,
  TrendingUp
} from 'lucide-react';

interface StudentOnboardingModalProps {
  onComplete: (companionId: CompanionId, learningStyle: LearningStyle, motivation: Motivation) => void;
}

export const StudentOnboardingModal: React.FC<StudentOnboardingModalProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedStyle, setSelectedStyle] = useState<LearningStyle>('BUILD');
  const [selectedMotivation, setSelectedMotivation] = useState<Motivation>('CHALLENGES');
  const [selectedCompanion, setSelectedCompanion] = useState<CompanionId>('AXEL');

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(selectedCompanion, selectedStyle, selectedMotivation);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
      <div className="bg-[#131b2e] border border-cyan-500/40 rounded-3xl w-full max-w-3xl overflow-hidden shadow-glow-cyan space-y-0 relative">
        {/* Top Header */}
        <div className="p-8 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-b border-slate-800 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10 space-y-2">
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PERSONALIZED ONBOARDING</span>
            </span>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              LET'S BUILD YOUR LEARNING WORLD
            </h1>
            <p className="text-xs text-slate-300 max-w-lg mx-auto">
              Tell us a little about how you like to learn. We'll shape your experience around you.
            </p>

            {/* Step Indicators */}
            <div className="flex items-center justify-center space-x-2 pt-3">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === step
                      ? 'w-10 bg-cyan-400 shadow-glow-cyan'
                      : s < step
                      ? 'w-6 bg-emerald-400'
                      : 'w-6 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* STEP 1: Learning Style */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">QUESTION 1 OF 3</span>
                <h2 className="text-xl font-extrabold text-white">How do you like to learn?</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <button
                  onClick={() => setSelectedStyle('BUILD')}
                  className={`p-6 rounded-2xl border text-left space-y-3 transition-all ${
                    selectedStyle === 'BUILD'
                      ? 'bg-gradient-to-br from-cyan-950/80 via-slate-900 to-indigo-950/80 border-cyan-400 shadow-glow-cyan'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <Hammer className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">BUILD</h3>
                    <p className="text-xs text-slate-300 mt-1">"I learn best by creating and doing."</p>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedStyle('DISCOVER')}
                  className={`p-6 rounded-2xl border text-left space-y-3 transition-all ${
                    selectedStyle === 'DISCOVER'
                      ? 'bg-gradient-to-br from-emerald-950/80 via-slate-900 to-teal-950/80 border-emerald-400 shadow-glow-emerald'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">DISCOVER</h3>
                    <p className="text-xs text-slate-300 mt-1">"I learn best by experimenting and exploring."</p>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedStyle('SOLVE')}
                  className={`p-6 rounded-2xl border text-left space-y-3 transition-all ${
                    selectedStyle === 'SOLVE'
                      ? 'bg-gradient-to-br from-purple-950/80 via-slate-900 to-indigo-950/80 border-purple-400 shadow-glow-purple'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">SOLVE</h3>
                    <p className="text-xs text-slate-300 mt-1">"I learn best by solving challenging problems."</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Motivation */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">QUESTION 2 OF 3</span>
                <h2 className="text-xl font-extrabold text-white">What keeps you motivated?</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { id: 'MASTERY', label: 'Mastering difficult concepts', desc: 'Deep understanding of fundamental rules', icon: BrainCircuit },
                  { id: 'CHALLENGES', label: 'Completing challenges', desc: 'Overcoming tough missions & simulations', icon: Flame },
                  { id: 'EXPLORING', label: 'Exploring new things', desc: 'Discovering fresh subjects & environments', icon: Compass },
                  { id: 'PROGRESS', label: 'Seeing my progress', desc: 'Watching XP, levels, and mastery grow', icon: TrendingUp }
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = selectedMotivation === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMotivation(m.id as Motivation)}
                      className={`p-5 rounded-2xl border text-left flex items-start space-x-3.5 transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/80 border-indigo-400 shadow-glow-indigo'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{m.label}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{m.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Companion Selection */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase">QUESTION 3 OF 3</span>
                <h2 className="text-xl font-extrabold text-white">Choose your learning companion</h2>
                <p className="text-xs text-slate-300">Your companion acts as your active guide throughout your learning missions.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {COMPANIONS.map((comp) => {
                  const isSelected = selectedCompanion === comp.id;
                  return (
                    <button
                      key={comp.id}
                      onClick={() => setSelectedCompanion(comp.id)}
                      className={`p-5 rounded-2xl border text-left space-y-3 transition-all relative overflow-hidden ${
                        isSelected
                          ? `bg-gradient-to-br ${comp.bgGradient} ${comp.borderGlow}`
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <img 
                          src={comp.avatarUrl} 
                          alt={comp.name}
                          className="w-12 h-12 rounded-2xl object-cover ring-2 ring-cyan-500/40 shadow-md"
                        />
                        <div>
                          <h3 className="text-sm font-extrabold text-white">{comp.name}</h3>
                          <p className="text-[11px] font-semibold text-cyan-300">{comp.title}</p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{comp.description}</p>
                      <p className="text-[11px] text-slate-400 italic bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                        {comp.quote}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
            >
              Back
            </button>
          ) : <div />}

          <button
            onClick={handleNext}
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-glow-cyan flex items-center space-x-2 transition-all"
          >
            <span>{step === 3 ? 'Create My Learning Universe' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
