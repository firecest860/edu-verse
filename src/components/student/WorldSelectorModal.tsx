import React from 'react';
import { WORLD_ARCHETYPES } from '../../db/initialData';
import { WorldArchetype, WorldArchetypeInfo } from '../../types';
import { 
  Hammer, 
  Rocket, 
  Shield, 
  FlaskConical, 
  Globe, 
  TreePine, 
  CheckCircle2, 
  X 
} from 'lucide-react';

interface WorldSelectorModalProps {
  currentWorld: WorldArchetype;
  onSelectWorld: (worldId: WorldArchetype) => void;
  onClose: () => void;
}

export const WorldSelectorModal: React.FC<WorldSelectorModalProps> = ({
  currentWorld,
  onSelectWorld,
  onClose,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Hammer': return <Hammer className="w-6 h-6 text-cyan-400" />;
      case 'Rocket': return <Rocket className="w-6 h-6 text-purple-400" />;
      case 'Shield': return <Shield className="w-6 h-6 text-indigo-400" />;
      case 'FlaskConical': return <FlaskConical className="w-6 h-6 text-emerald-400" />;
      case 'Globe': return <Globe className="w-6 h-6 text-amber-400" />;
      case 'TreePine': return <TreePine className="w-6 h-6 text-lime-400" />;
      default: return <Hammer className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#131b2e] border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl space-y-0 relative">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
              PERSONALIZATION ENGINE
            </span>
            <h2 className="text-xl font-extrabold text-white mt-1">Choose Your Preferred World Archetype</h2>
            <p className="text-xs text-slate-300">EduVerse AI tailors future lesson challenges to match your favorite visual realm.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Archetypes Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
          {WORLD_ARCHETYPES.map((arch) => {
            const isSelected = currentWorld === arch.id;
            return (
              <button
                key={arch.id}
                onClick={() => {
                  onSelectWorld(arch.id);
                  onClose();
                }}
                className={`p-5 rounded-2xl border text-left space-y-3 transition-all relative overflow-hidden ${
                  isSelected
                    ? `bg-gradient-to-br ${arch.bgGradient} border-cyan-400 shadow-glow-cyan`
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center">
                    {getIcon(arch.icon)}
                  </div>
                  {isSelected && (
                    <span className="text-xs font-bold text-cyan-300 flex items-center space-x-1 bg-cyan-500/20 border border-cyan-500/40 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">{arch.name}</h3>
                  <p className="text-[11px] font-semibold text-cyan-300 mt-0.5">{arch.tagline}</p>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{arch.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
