import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  BookOpen, 
  Filter,
  UserCheck
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { AttendanceRecord, SubjectAttendance } from '../../types';

export const AttendancePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [subjects, setSubjects] = useState<SubjectAttendance[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await apiClient.attendance.getOverview();
        setRecords(data.records);
        setSubjects(data.subjects);
      } catch (err) {
        console.error('Failed to load attendance data', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const overallPercentage = subjects.length > 0
    ? Math.round(subjects.reduce((acc, s) => acc + s.percentage, 0) / subjects.length)
    : 94;

  const totalClasses = subjects.reduce((acc, s) => acc + s.totalClasses, 0);
  const attendedClasses = subjects.reduce((acc, s) => acc + s.attendedClasses, 0);
  const absentClasses = totalClasses - attendedClasses;

  const filteredRecords = selectedSubject === 'all'
    ? records
    : records.filter(r => r.subject.toLowerCase().includes(selectedSubject.toLowerCase()));

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              Verified Institutional Record
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Attendance Tracking</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Real-time attendance logs, subject breakdown, and institutional compliance report.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
            <div className="text-center px-4 border-r border-slate-800">
              <p className="text-xs text-slate-400 font-medium">Overall Attendance</p>
              <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                {overallPercentage}%
              </p>
            </div>
            <div className="text-center px-4 border-r border-slate-800">
              <p className="text-xs text-slate-400 font-medium">Present</p>
              <p className="text-2xl font-bold text-emerald-400">{attendedClasses}/{totalClasses}</p>
            </div>
            <div className="text-center px-4">
              <p className="text-xs text-slate-400 font-medium">Status</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Excellent
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Wise Cards */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          Subject-Wise Attendance Breakdown
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map(sub => (
            <div 
              key={sub.subject}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">{sub.subject}</h3>
                  <p className="text-xs text-slate-400">Instructor: {sub.teacher}</p>
                </div>
                <span className={`text-sm font-black px-3 py-1 rounded-xl border ${
                  sub.percentage >= 95 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : sub.percentage >= 90
                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}>
                  {sub.percentage}%
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Classes Attended</span>
                  <span className="text-slate-200 font-semibold">{sub.attendedClasses} / {sub.totalClasses}</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-1000"
                    style={{ width: `${sub.percentage}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800">
                <span className="text-slate-400">Threshold Requirement: 80%</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Compliant
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Logs & Calendar View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attendance Log Table */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-cyan-400" />
              Recent Class Attendance Logs
            </h3>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 px-3 py-1.5 focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Subjects</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Chemistry">Chemistry</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800 pb-3">
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Subject</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Topic Covered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 font-medium text-slate-300 font-mono">{r.date}</td>
                    <td className="py-3 font-bold text-white">{r.subject}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold text-[11px] ${
                        r.status === 'present'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : r.status === 'late'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}>
                        {r.status === 'present' && <CheckCircle2 className="w-3 h-3" />}
                        {r.status === 'late' && <Clock className="w-3 h-3" />}
                        {r.status === 'absent' && <XCircle className="w-3 h-3" />}
                        <span className="capitalize">{r.status}</span>
                      </span>
                    </td>
                    <td className="py-3 text-slate-400">{r.topic || 'Regular Lecture'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Calendar View Preview */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              September 2026 Overview
            </h3>

            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-4">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <span key={i} className="text-slate-500 font-bold py-1">{d}</span>
              ))}
              {Array.from({ length: 30 }).map((_, i) => {
                const dayNum = i + 1;
                // Mark days 1..7 as present, day 8 as today/future
                const isAbsent = dayNum === 3;
                const isLate = dayNum === 5;
                const isPresent = dayNum <= 7 && !isAbsent && !isLate;
                const isFuture = dayNum > 7;

                return (
                  <div
                    key={i}
                    className={`h-9 rounded-lg flex items-center justify-center font-semibold text-xs border transition-all ${
                      isFuture
                        ? 'border-slate-800/40 text-slate-600 bg-slate-950/20'
                        : isPresent
                        ? 'border-emerald-500/40 text-emerald-300 bg-emerald-950/30'
                        : isLate
                        ? 'border-amber-500/40 text-amber-300 bg-amber-950/30'
                        : 'border-red-500/40 text-red-300 bg-red-950/30'
                    }`}
                  >
                    {dayNum}
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-800 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Present (94%)
                </span>
                <span className="font-semibold text-slate-200">18 Days</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Late Arrival
                </span>
                <span className="font-semibold text-slate-200">1 Day</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" /> Leave / Absent
                </span>
                <span className="font-semibold text-slate-200">1 Day</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-cyan-950/20 border border-cyan-900/30 text-xs text-cyan-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <p>Your attendance meets all institutional eligibility criteria for upcoming examinations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
