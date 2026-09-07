import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Award, 
  Bell, 
  UserCheck, 
  ChevronDown,
  BookOpen,
  GraduationCap,
  Users
} from 'lucide-react';
import { User, UserRole, StudentProfile } from '../../types';

interface NavbarProps {
  currentUser: User;
  studentProfile?: StudentProfile;
  onRoleSwitch: (role: UserRole) => void;
  onToggleNotifications: () => void;
  unreadNotificationsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  studentProfile,
  onRoleSwitch,
  onToggleNotifications,
  unreadNotificationsCount,
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'TEACHER': return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'STUDENT': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'PARENT': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'TEACHER': return <GraduationCap className="w-4 h-4 text-purple-400" />;
      case 'STUDENT': return <BookOpen className="w-4 h-4 text-cyan-400" />;
      case 'PARENT': return <Users className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0f19]/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 p-[1px] shadow-glow-indigo">
          <div className="w-full h-full bg-[#0b0f19] rounded-[11px] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse-slow" />
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300">
              EduVerse<span className="text-cyan-400">.AI</span>
            </span>
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              PROTOTYPE
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block">What your teacher teaches becomes your world</p>
        </div>
      </div>

      {/* Center / Gamification Bar (For Student Role) */}
      {currentUser.role === 'STUDENT' && studentProfile && (
        <div className="hidden md:flex items-center space-x-4 bg-slate-900/80 border border-slate-800 rounded-full px-4 py-1.5 shadow-inner">
          <div className="flex items-center space-x-1.5">
            <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
            <span className="text-xs font-bold text-amber-300">{studentProfile.streakDays} Day Streak</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-800" />
          <div className="flex items-center space-x-1.5">
            <Award className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-300">Lvl {studentProfile.level}</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-800" />
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-extrabold text-indigo-300">{studentProfile.xp} XP</span>
          </div>
        </div>
      )}

      {/* Right Controls: Role Switcher & Notifications */}
      <div className="flex items-center space-x-3">
        {/* Notification Bell */}
        <button
          onClick={onToggleNotifications}
          className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Demo Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all text-left"
          >
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/30"
            />
            <div className="hidden sm:block">
              <div className="text-xs font-semibold text-white flex items-center space-x-1">
                <span>{currentUser.name}</span>
              </div>
              <div className={`text-[10px] font-bold px-1.5 py-0.2 rounded border inline-flex items-center space-x-1 mt-0.5 ${getRoleBadgeColor(currentUser.role)}`}>
                {getRoleIcon(currentUser.role)}
                <span className="ml-1">{currentUser.role}</span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-3 py-2 border-b border-slate-800/80">
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Switch Demo Role</p>
                <p className="text-xs font-semibold text-indigo-300">Hackathon Persona Switcher</p>
              </div>

              <div className="p-1 space-y-1">
                <button
                  onClick={() => {
                    onRoleSwitch('TEACHER');
                    setRoleDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentUser.role === 'TEACHER' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4 text-purple-400" />
                    <span>Teacher (Dr. Sarah)</span>
                  </div>
                  {currentUser.role === 'TEACHER' && <UserCheck className="w-3.5 h-3.5 text-purple-400" />}
                </button>

                <button
                  onClick={() => {
                    onRoleSwitch('STUDENT');
                    setRoleDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentUser.role === 'STUDENT' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>Student (Alex Rivera)</span>
                  </div>
                  {currentUser.role === 'STUDENT' && <UserCheck className="w-3.5 h-3.5 text-cyan-400" />}
                </button>

                <button
                  onClick={() => {
                    onRoleSwitch('PARENT');
                    setRoleDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentUser.role === 'PARENT' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Parent (Elena Rivera)</span>
                  </div>
                  {currentUser.role === 'PARENT' && <UserCheck className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
