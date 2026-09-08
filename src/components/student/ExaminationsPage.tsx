import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Award, 
  Clock, 
  Calendar as CalendarIcon, 
  Sparkles, 
  ChevronRight, 
  BookOpen, 
  CheckCircle2,
  AlertTriangle,
  Brain
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { ExamRecord } from '../../types';

interface Props {
  onNavigate?: (tab: string, topicId?: string) => void;
}

export const ExaminationsPage: React.FC<Props> = ({ onNavigate }) => {
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState<ExamRecord[]>([]);

  useEffect(() => {
    const loadExams = async () => {
      setLoading(true);
      try {
        const data = await apiClient.exams.getAll();
        setExams(data);
      } catch (err) {
        console.error('Failed to load exams', err);
      } finally {
        setLoading(false);
      }
    };
    loadExams();
  }, []);

  const completedExams = exams.filter(e => e.status === 'completed');
  const upcomingExams = exams.filter(e => e.status === 'upcoming');

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              Institutional Examination Portal
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Examinations & Grade Cards</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Track upcoming exam schedules, review evaluated grade cards, and prepare with targeted AI companion study sessions.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
            <div className="text-center px-4 border-r border-slate-800">
              <p className="text-xs text-slate-400 font-medium">Completed Exams</p>
              <p className="text-2xl font-bold text-white">{completedExams.length}</p>
            </div>
            <div className="text-center px-4 border-r border-slate-800">
              <p className="text-xs text-slate-400 font-medium">Average Score</p>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">91.6%</p>
            </div>
            <div className="text-center px-4">
              <p className="text-xs text-slate-400 font-medium">Upcoming</p>
              <p className="text-2xl font-bold text-amber-400">{upcomingExams.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Upcoming Exams with AI Preparation Launcher */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-amber-400" />
          Upcoming Examination Timetable & AI Study Launchpad
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingExams.map(exam => (
            <div 
              key={exam.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    Scheduled Test
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> {exam.date} • {exam.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{exam.title}</h3>
                <p className="text-xs text-slate-400 mb-4">{exam.subject} ({exam.code})</p>

                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2 mb-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Marks:</span>
                    <span className="text-slate-200 font-semibold">{exam.totalMarks} Marks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Syllabus Scope:</span>
                    <span className="text-cyan-300 font-semibold">{exam.topics?.join(', ') || 'All Syllabus Chapters'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Brain className="w-4 h-4 text-purple-400" /> AI Practice Ready
                </span>
                <button
                  onClick={() => onNavigate?.('textbook')}
                  className="py-2 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-purple-500/20 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Prepare with EduVerse AI
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Completed Exam Grade Cards */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" />
          Evaluated Grade Cards & Teacher Feedback
        </h2>

        <div className="space-y-4">
          {completedExams.map(exam => (
            <div 
              key={exam.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-700 transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Grade Card Released
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Date: {exam.date}</span>
                </div>

                <h3 className="text-lg font-bold text-white">{exam.title}</h3>
                <p className="text-xs text-slate-400 mb-3">{exam.subject} ({exam.code})</p>

                {exam.teacherComment && (
                  <div className="p-3 bg-purple-950/20 rounded-xl border border-purple-900/30 text-xs text-purple-200 italic">
                    "{exam.teacherComment}"
                  </div>
                )}
              </div>

              {/* Grade Badge */}
              <div className="flex items-center gap-6 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 min-w-[240px] justify-between">
                <div>
                  <p className="text-xs text-slate-400">Score Obtained</p>
                  <p className="text-2xl font-black text-white">
                    {exam.score} <span className="text-sm font-normal text-slate-500">/ {exam.totalMarks}</span>
                  </p>
                  <p className="text-xs text-emerald-400 font-bold mt-0.5">
                    {Math.round(((exam.score || 0) / (exam.totalMarks || 100)) * 100)}% Overall Score
                  </p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-emerald-500/20">
                  {exam.grade}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
