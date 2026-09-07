import React from 'react';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Award, 
  Search,
  Filter
} from 'lucide-react';
import { StudentProfile, ClassRoom } from '../../types';

interface TeacherAnalyticsProps {
  students: StudentProfile[];
  classes: ClassRoom[];
}

export const TeacherAnalytics: React.FC<TeacherAnalyticsProps> = ({ students, classes }) => {
  const conceptBreakdown = [
    { name: 'C For Loops & Repetition', percentage: 88, status: 'EXCELLENT', color: 'bg-cyan-400' },
    { name: 'Relational Loop Conditions', percentage: 74, status: 'STABLE', color: 'bg-indigo-500' },
    { name: 'Functions & Scope', percentage: 69, status: 'ATTENTION', color: 'bg-amber-400' },
    { name: 'Arrays & Memory', percentage: 81, status: 'GOOD', color: 'bg-emerald-400' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>AI Learning Analytics</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Grade 10 CS Concept Mastery Intelligence</h1>
          <p className="text-xs text-slate-300 mt-1">
            Real-time concept mastery tracking across all enrolled students automatically updated from Builder World assessments.
          </p>
        </div>
      </div>

      {/* Concept Mastery Visual Bar Charts */}
      <div className="bg-[#131b2e] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>Class Concept Mastery Metrics</span>
          </h3>
          <span className="text-xs text-slate-400">Class Average: 84%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {conceptBreakdown.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white">{item.name}</span>
                <span className="text-cyan-300">{item.percentage}%</span>
              </div>
              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div 
                  className={`h-full rounded-full ${item.color} transition-all duration-500`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roster Table with Seeded Fictional Students */}
      <div className="bg-[#131b2e] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Users className="w-4 h-4 text-purple-400" />
            <span>Individual Student Performance Roster ({students.length})</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Level / XP</th>
                <th className="py-3 px-4">Streak</th>
                <th className="py-3 px-4">Preferred World</th>
                <th className="py-3 px-4">Concept Mastery</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-white">{student.name}</p>
                        <p className="text-[10px] text-slate-400">{student.parentName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-indigo-300">Lvl {student.level}</span>
                    <p className="text-[10px] text-slate-400">{student.xp} XP</p>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-amber-300">
                    🔥 {student.streakDays} Days
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">
                      {student.preferredWorld}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-400 h-full rounded-full"
                          style={{ width: `${student.overallMastery}%` }}
                        />
                      </div>
                      <span className="font-bold text-emerald-300 text-xs">{student.overallMastery}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {student.overallMastery >= 85 ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        EXCELLING
                      </span>
                    ) : student.overallMastery >= 70 ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        ON TRACK
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        NEEDS PRACTICE
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
