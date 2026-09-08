import React, { useState, useEffect } from 'react';
import { 
  Award, 
  BookOpen, 
  TrendingUp, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ChevronRight,
  Brain,
  Star,
  Zap,
  Target
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';

interface Props {
  onNavigate?: (tab: string, topicId?: string) => void;
}

export const AcademicReview: React.FC<Props> = ({ onNavigate }) => {
  const [loading, setLoading] = useState(true);
  const [academicData, setAcademicData] = useState<any>(null);
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'cs' | 'math' | 'chem'>('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await apiClient.academic.getOverview();
        setAcademicData(data);
      } catch (err) {
        console.error('Failed to load academic overview', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const subjects = [
    {
      id: 'cs',
      name: 'Computer Science',
      code: 'CS-201',
      teacher: 'Mr. David Harrison',
      mastery: 95,
      grade: 'A+',
      status: 'Mastered',
      color: 'from-cyan-500 to-blue-600',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      icon: Brain,
      recentTopic: 'Iterative Structures & For-Loop Logic',
      teacherNote: 'Alex shows exceptional conceptual grasp of loop execution flow and memory stack mechanics. Ready for dynamic data structures.'
    },
    {
      id: 'chem',
      name: 'Chemistry',
      code: 'CHEM-102',
      teacher: 'Dr. Elena Vance',
      mastery: 91,
      grade: 'A',
      status: 'Advanced',
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      icon: Zap,
      recentTopic: 'Acid-Base Neutralization & pH Titration',
      teacherNote: 'Great performance in virtual lab simulations. Precision in chemical reaction measurement is outstanding.'
    },
    {
      id: 'math',
      name: 'Mathematics',
      code: 'MATH-301',
      teacher: 'Prof. Marcus Miller',
      mastery: 88,
      grade: 'A-',
      status: 'Proficient',
      color: 'from-purple-500 to-indigo-600',
      badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      icon: Target,
      recentTopic: 'Differential Calculus & Rate of Change',
      teacherNote: 'Strong problem-solving methodology. Working on optimizing solution paths for complex multi-step calculus problems.'
    }
  ];

  const milestones = [
    {
      date: 'Yesterday, 4:30 PM',
      title: 'Mastered For-Loop Iteration Simulation',
      subject: 'Computer Science',
      xp: '+350 XP',
      type: 'simulation',
      icon: CheckCircle2,
      color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30'
    },
    {
      date: 'Sep 6, 2026',
      title: 'Completed Acid-Base Neutralization Lab',
      subject: 'Chemistry',
      xp: '+400 XP',
      type: 'lab',
      icon: Sparkles,
      color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30'
    },
    {
      date: 'Sep 5, 2026',
      title: 'Passed Chapter 3 Calculus Evaluation (92%)',
      subject: 'Mathematics',
      xp: '+250 XP',
      type: 'exam',
      icon: Award,
      color: 'text-purple-400 border-purple-500/40 bg-purple-950/30'
    },
    {
      date: 'Sep 4, 2026',
      title: 'AI Companion Nova Unlocked Level 4 Blueprint',
      subject: 'AI Growth',
      xp: '+150 XP',
      type: 'companion',
      icon: Star,
      color: 'text-amber-400 border-amber-500/40 bg-amber-950/30'
    }
  ];

  const filteredSubjects = selectedSubject === 'all' 
    ? subjects 
    : subjects.filter(s => s.id === selectedSubject);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-slate-800 p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              Academic Performance Evaluation
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Academic Review & Mastery</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Comprehensive report of concept mastery, teacher feedback, learning milestones, and AI companion diagnostic insights.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
            <div className="text-center px-4 border-r border-slate-800">
              <p className="text-xs text-slate-400 font-medium">Overall Mastery</p>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">91.3%</p>
            </div>
            <div className="text-center px-4 border-r border-slate-800">
              <p className="text-xs text-slate-400 font-medium">Grade Average</p>
              <p className="text-2xl font-bold text-emerald-400">A / 3.92</p>
            </div>
            <div className="text-center px-4">
              <p className="text-xs text-slate-400 font-medium">Active Streak</p>
              <p className="text-2xl font-bold text-amber-400">14 Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          Subject Mastery Breakdowns
        </h2>
        <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
          {(['all', 'cs', 'math', 'chem'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedSubject(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                selectedSubject === tab
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {tab === 'all' ? 'All Subjects' : tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredSubjects.map(sub => {
          const Icon = sub.icon;
          return (
            <div 
              key={sub.id} 
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${sub.color} text-white shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">{sub.name}</h3>
                      <p className="text-xs text-slate-400 font-mono">{sub.code}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${sub.badgeColor}`}>
                    {sub.grade} ({sub.mastery}%)
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Mastery Level</span>
                    <span className="text-slate-200 font-semibold">{sub.mastery}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${sub.color} transition-all duration-1000`}
                      style={{ width: `${sub.mastery}%` }}
                    />
                  </div>
                </div>

                {/* Recent Topic & Teacher Note */}
                <div className="space-y-3">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                    <p className="text-xs text-slate-400 font-medium mb-1">Current Focus Topic:</p>
                    <p className="text-xs text-slate-200 font-semibold">{sub.recentTopic}</p>
                  </div>

                  <div className="p-3 bg-purple-950/20 rounded-xl border border-purple-900/30">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-300 mb-1">
                      <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                      {sub.teacher}
                    </div>
                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      "{sub.teacherNote}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {sub.status}
                </span>
                <button
                  onClick={() => onNavigate?.(sub.id === 'cs' ? 'builder-world' : sub.id === 'chem' ? 'chemistry-lab' : 'textbook')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Enter Practice <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid Section: Teacher Notes & Milestone History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Academic Milestones Timeline */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              Recent Academic Achievements & History
            </h3>
            <span className="text-xs text-slate-400">Last 7 Days</span>
          </div>

          <div className="space-y-4">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div 
                  key={idx}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${m.color}`}
                >
                  <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-current mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{m.title}</h4>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        {m.xp}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                      <span>{m.subject}</span>
                      <span>•</span>
                      <span>{m.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Diagnostic Summary Card */}
        <div className="bg-gradient-to-b from-slate-900 to-purple-950/30 border border-purple-900/40 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              AI Learning Diagnostic
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Companion Learning Profile</h3>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-medium mb-1">Dominant Learning Modality:</span>
                <span className="text-cyan-300 font-bold">Visual & Interactive Simulation</span>
                <p className="text-slate-400 mt-1 text-[11px]">You retain 84% more logic structure when manipulating physical code blocks in 3D/canvas space.</p>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-medium mb-1">Primary Motivation Driver:</span>
                <span className="text-amber-300 font-bold">Achievement & Skill Mastery</span>
                <p className="text-slate-400 mt-1 text-[11px]">Responds best to step-by-step challenge tiers and instant feedback on solution accuracy.</p>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-medium mb-1">Recommended Next Step:</span>
                <span className="text-emerald-300 font-bold">Complete Chemistry Reaction Quiz</span>
                <p className="text-slate-400 mt-1 text-[11px]">Recommended by Dr. Vance to solidify titration principles before upcoming midterm.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate?.('textbook')}
            className="mt-6 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
          >
            Launch Suggested AI Textbook Chapter
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
