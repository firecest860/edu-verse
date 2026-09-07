import React from 'react';
import { Bell, X, CheckCircle2, Award, BookOpen, MessageSquare } from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationDrawerProps {
  notifications: NotificationItem[];
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ notifications, onClose }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'RESULT': return <Award className="w-4 h-4 text-cyan-400" />;
      case 'MISSION': return <BookOpen className="w-4 h-4 text-purple-400" />;
      case 'MESSAGE': return <MessageSquare className="w-4 h-4 text-emerald-400" />;
      default: return <Bell className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-80 bg-[#131b2e] border-l border-slate-800 shadow-2xl p-5 flex flex-col justify-between animate-in slide-in-from-right duration-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Notifications</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 max-h-[80vh] overflow-y-auto pr-1">
          {notifications.map((notif) => (
            <div key={notif.id} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getIcon(notif.type)}
                  <h4 className="text-xs font-bold text-white">{notif.title}</h4>
                </div>
                <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
              </div>
              <p className="text-xs text-slate-300 pl-6">{notif.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
