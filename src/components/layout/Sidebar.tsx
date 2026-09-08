import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  BarChart3, 
  MessageSquare, 
  Compass, 
  Award, 
  FlaskConical,
  Bell,
  BookOpen,
  Layers,
  Settings,
  UserCheck,
  FileText,
  BookMarked
} from 'lucide-react';
import { UserRole } from '../../types';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, onTabChange }) => {
  const getNavItems = () => {
    switch (role) {
      case 'TEACHER':
        return [
          { id: 'dashboard', label: 'Class Overview', icon: LayoutDashboard },
          { id: 'studio', label: 'AI Learning Studio', icon: Sparkles, badge: 'HOT' },
          { id: 'analytics', label: 'Student Analytics', icon: BarChart3 },
          { id: 'communication', label: 'Parent Messages & News', icon: MessageSquare },
        ];
      case 'STUDENT':
        return [
          { id: 'dashboard', label: 'Learning Universe', icon: Compass },
          { id: 'textbook', label: 'AI Interactive Textbook', icon: BookMarked, badge: 'READ' },
          { id: 'comics', label: 'AI Interactive Comics', icon: BookOpen, badge: 'NEW' },
          { id: 'builder-world', label: 'C Builder World', icon: Sparkles, badge: 'FLAGSHIP' },
          { id: 'chemistry-lab', label: 'Chemistry Virtual Lab', icon: FlaskConical },
          { id: 'academic-review', label: 'Academic Review', icon: Award },
          { id: 'attendance', label: 'Attendance (94%)', icon: UserCheck },
          { id: 'examinations', label: 'Examinations', icon: FileText },
          { id: 'achievements', label: 'Badges & XP', icon: Award },
        ];
      case 'PARENT':
        return [
          { id: 'dashboard', label: 'Student Growth Summary', icon: LayoutDashboard },
          { id: 'teacher-feedback', label: 'Teacher Updates & Chat', icon: MessageSquare },
          { id: 'announcements', label: 'Academic Announcements', icon: Bell },
        ];
    }
  };

  const items = getNavItems();

  return (
    <aside className="w-64 bg-[#0b0f19]/90 border-r border-slate-800/80 p-4 flex flex-col justify-between shrink-0 hidden md:flex">
      <div className="space-y-6">
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">
            Navigation — {role} PORTAL
          </p>
          <nav className="space-y-1">
            {items.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 text-white border border-indigo-500/40 shadow-glow-indigo'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Demo Quick Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-500/20 text-xs">
          <div className="flex items-center space-x-2 text-indigo-300 font-bold mb-1">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Signature Demo</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            AI Comic Story ➔ Student enters Builder World ➔ 10 walls built ➔ Real-time assessment & insights!
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between px-2">
        <span>EduVerse AI v1.0</span>
        <div className="flex items-center space-x-1 text-slate-400">
          <Settings className="w-3.5 h-3.5" />
          <span>Hackathon Engine</span>
        </div>
      </div>
    </aside>
  );
};
