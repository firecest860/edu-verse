import React from 'react';
import { 
  Users, 
  BookOpen, 
  Sparkles, 
  Award, 
  TrendingUp, 
  Plus, 
  CheckCircle2, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { ClassRoom, Lesson, AssessmentAttempt, StudentProfile } from '../../types';

interface TeacherDashboardProps {
  classes: ClassRoom[];
  lessons: Lesson[];
  attempts: AssessmentAttempt[];
  students: StudentProfile[];
  onOpenStudio: () => void;
  onOpenAnalytics: () => void;
  onOpenPreviewLesson: (lesson: Lesson) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  classes,
  lessons,
  attempts,
  students,
  onOpenStudio,
  onOpenAnalytics,
  onOpenPreviewLesson,
}) => {
  const totalStudents = students.length;
  const avgMastery = Math.round(students.reduce((acc, s) => acc + s.overallMastery, 0) / (students.length || 1));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Teacher Portal Overview</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Welcome back, Dr. Sarah Jenkins</h1>
          <p className="text-xs text-slate-300 mt-1">
            Transform academic syllabus content into personalized gamified learning universes for Grade 10 CS.
          </p>
        </div>

        <button
          onClick={onOpenStudio}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-glow-indigo flex items-center space-x-2 shrink-0 transition-all"
        >
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span>Launch AI Learning Studio</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#131b2e] border border-slate-800 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Active Classes</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{classes.length}</p>
          <span className="text-[11px] text-slate-400 font-medium">Grade 10 CS & Grade 9 Chem</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131b2e] border border-slate-800 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Enrolled Students</span>
            <GraduationCap className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-extrabold text-cyan-300">{totalStudents}</p>
          <span className="text-[11px] text-emerald-400 font-semibold">+100% Active Participation</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131b2e] border border-slate-800 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Created Lessons</span>
            <BookOpen className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-extrabold text-purple-300">{lessons.length}</p>
          <span className="text-[11px] text-slate-400 font-medium">Flagship C Loop Published</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#131b2e] border border-slate-800 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Class Avg Mastery</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-300">{avgMastery}%</p>
          <span className="text-[11px] text-emerald-400 font-semibold">+12% vs last term</span>
        </div>
      </div>

      {/* Main Grid: Active Lessons & Class Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Lessons List (7 Cols) */}
        <div className="lg:col-span-7 bg-[#131b2e] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Published AI Lessons</span>
            </h3>
            <button
              onClick={onOpenStudio}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Lesson</span>
            </button>
          </div>

          <div className="space-y-3">
            {lessons.map((lesson) => (
              <div 
                key={lesson.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-all flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {lesson.worldType}
                    </span>
                    <span className="text-[11px] text-slate-400">{lesson.className}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{lesson.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1">{lesson.summary}</p>
                </div>

                <button
                  onClick={() => onOpenPreviewLesson(lesson)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white shrink-0 transition-colors"
                >
                  Preview
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Student Roster Overview (5 Cols) */}
        <div className="lg:col-span-5 bg-[#131b2e] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span>Class Roster & Mastery</span>
            </h3>
            <button
              onClick={onOpenAnalytics}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
            >
              <span>Full Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {students.slice(0, 5).map((std) => (
              <div key={std.id} className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={std.avatar} alt={std.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-bold text-white">{std.name}</p>
                    <p className="text-[10px] text-slate-400">Level {std.level} • {std.preferredWorld}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-extrabold text-emerald-400">{std.overallMastery}%</span>
                  <p className="text-[10px] text-slate-400">{std.xp} XP</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
