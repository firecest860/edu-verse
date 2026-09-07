import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Award, 
  TrendingUp, 
  Send, 
  Bell, 
  CheckCircle2, 
  Sparkles,
  Heart
} from 'lucide-react';
import { StudentProfile, AssessmentAttempt, Message, Announcement } from '../../types';
import { apiClient } from '../../services/apiClient';

interface ParentDashboardProps {
  student: StudentProfile;
  attempts: AssessmentAttempt[];
  messages: Message[];
  announcements: Announcement[];
  onSendMessage: (content: string) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  student,
  attempts,
  messages,
  announcements,
  onSendMessage,
}) => {
  const [replyContent, setReplyContent] = useState('');

  const latestAttempt = attempts[0];

  const handleSend = () => {
    if (!replyContent.trim()) return;
    onSendMessage(replyContent);
    setReplyContent('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Parent Progress Portal</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            {student.name}'s Learning Journey Report
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Simplified AI progress updates translated into plain language. No technical jargon!
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-2 flex items-center space-x-3 shrink-0">
          <Heart className="w-5 h-5 text-rose-400 animate-pulse" />
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Current Progress</p>
            <p className="text-sm font-extrabold text-emerald-300">Level {student.level} • {student.overallMastery}% Mastery</p>
          </div>
        </div>
      </div>

      {/* Main AI Plain-Language Report Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-purple-950/40 border border-indigo-500/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>Weekly Growth Summary for Parents</span>
          </h2>
          <span className="text-xs font-bold text-emerald-400">Updated Today</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Key Accomplishment</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {latestAttempt?.aiAnalysis.parentSimpleReport || 
              `Alex mastered C For Loops repetition today! They scored 88% on their mission assessment and successfully constructed 10 walls in Builder World.`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Learning Streak</p>
            <p className="text-base font-extrabold text-amber-300 mt-0.5">🔥 {student.streakDays} Days Active</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Experience Points</p>
            <p className="text-base font-extrabold text-indigo-300 mt-0.5">⭐ {student.xp} XP Earned</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Teacher Notes</p>
            <p className="text-base font-extrabold text-emerald-300 mt-0.5">Class Leader</p>
          </div>
        </div>
      </div>

      {/* Grid: Teacher Messaging Feed (Left) & Announcements (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Teacher Messaging Feed */}
        <div className="lg:col-span-7 bg-[#131b2e] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span>Direct Communication with Dr. Sarah Jenkins</span>
            </h3>
          </div>

          {/* Chat Messages */}
          <div className="h-56 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3 overflow-y-auto">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`p-3.5 rounded-2xl max-w-[85%] text-xs space-y-1 ${
                  msg.senderRole === 'PARENT'
                    ? 'ml-auto bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-200 border border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between space-x-2 text-[10px] opacity-75">
                  <span className="font-bold">{msg.senderName}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <p className="leading-relaxed">{msg.content}</p>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Send message to Dr. Sarah Jenkins..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleSend}
              className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors shadow-glow-indigo"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </div>
        </div>

        {/* Announcements List */}
        <div className="lg:col-span-5 bg-[#131b2e] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Bell className="w-4 h-4 text-cyan-400" />
              <span>School & Class Announcements</span>
            </h3>
          </div>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {ann.type}
                  </span>
                  <span className="text-[10px] text-slate-400">{ann.authorName}</span>
                </div>
                <h4 className="text-xs font-bold text-white">{ann.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
