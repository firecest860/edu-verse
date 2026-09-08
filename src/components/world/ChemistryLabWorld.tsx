import React, { useState, useEffect, useRef } from 'react';
import { 
  FlaskConical, 
  Droplet, 
  RotateCcw, 
  CheckCircle2, 
  Award, 
  Sparkles,
  Beaker,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChemistryLabWorldProps {
  onCompleteLab?: () => void;
  onLaunchAssessment?: () => void;
}

export const ChemistryLabWorld: React.FC<ChemistryLabWorldProps> = ({
  onCompleteLab,
  onLaunchAssessment,
}) => {
  // Chemical Titration State Engine
  const [hclVolume, setHclVolume] = useState<number>(50); // mL HCl
  const [naohVolume, setNaohVolume] = useState<number>(0);  // mL NaOH
  const [isStirring, setIsStirring] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Compute calculated pH, indicator state, and total volume
  const totalVolume = hclVolume + naohVolume;
  const netH = Math.max(0, hclVolume - naohVolume);
  const netOH = Math.max(0, naohVolume - hclVolume);

  let calculatedPH = 7.0;
  if (netH > 0) {
    calculatedPH = Number((1.0 + Math.log10(50 / Math.max(0.01, netH))).toFixed(1));
    if (calculatedPH > 6.9) calculatedPH = 6.9;
  } else if (netOH > 0) {
    calculatedPH = Number((14.0 - Math.log10(50 / Math.max(0.01, netOH))).toFixed(1));
    if (calculatedPH < 7.1) calculatedPH = 7.1;
  } else {
    calculatedPH = 7.0;
  }

  const isNeutral = calculatedPH >= 6.8 && calculatedPH <= 7.2;
  const neutralizationPercent = Math.min(100, Math.round((Math.min(hclVolume, naohVolume) / 50) * 100));

  // Determine educational status message based on chemistry state
  const getStatusMessage = () => {
    if (isNeutral) return '✓ Solution fully neutralized! H+ and OH- ions balanced at pH 7.0.';
    if (calculatedPH < 4.0) return 'Solution is strongly acidic (pH < 4.0). Add NaOH base to increase pH.';
    if (calculatedPH < 6.8) return 'Approaching neutralization! Add small NaOH increments.';
    if (calculatedPH > 10.0) return 'Solution is strongly basic (pH > 10.0). Phenolphthalein turns vibrant magenta.';
    return 'Over-titrated past neutral. Add HCl acid to lower pH back to 7.0.';
  };

  // Trigger celebration on neutralization
  useEffect(() => {
    if (isNeutral && !isCompleted) {
      setIsCompleted(true);
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
      if (onCompleteLab) onCompleteLab();
    }
  }, [isNeutral, isCompleted]);

  const handleAddHCl = (amount: number) => {
    setHclVolume(prev => Math.min(150, prev + amount));
    setIsCompleted(false);
  };

  const handleAddNaOH = (amount: number) => {
    setNaohVolume(prev => Math.min(150, prev + amount));
  };

  const handleStir = () => {
    setIsStirring(true);
    setTimeout(() => setIsStirring(false), 1500);
  };

  const handleReset = () => {
    setHclVolume(50);
    setNaohVolume(0);
    setIsCompleted(false);
  };

  // Render 2D Live Beaker Visuals with Canvas liquid mixing physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let waveOffset = 0;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const width = rect.width || canvas.width;
      const height = rect.height || canvas.height;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Lab Table Surface
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, height - 30, width, 30);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, height - 30, width, 3);

      // 2. Draw Beaker Container Bounds
      const beakerX = width / 2 - 80;
      const beakerY = 40;
      const beakerW = 160;
      const beakerH = 220;

      // Glass shadow & interior gradient
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.fillRect(beakerX, beakerY, beakerW, beakerH);

      // Beaker Graduations lines & labels (25mL to 150mL)
      ctx.fillStyle = '#64748b';
      ctx.font = '9px Fira Code, monospace';
      for (let v = 25; v <= 150; v += 25) {
        const markY = beakerY + beakerH - (v / 150) * (beakerH - 20);
        ctx.fillRect(beakerX + beakerW - 15, markY, 15, 1);
        ctx.fillText(`${v}mL`, beakerX + beakerW - 45, markY + 3);
      }

      // 3. Draw Liquid Fill Height & Dynamic Color Spectrum
      const fillPercent = Math.min(1.0, totalVolume / 150);
      const liquidH = Math.max(15, fillPercent * (beakerH - 20));
      const liquidY = beakerY + beakerH - liquidH;

      // Determine fluid fill color based on pH spectrum
      let liquidGradient = ctx.createLinearGradient(0, liquidY, 0, beakerY + beakerH);
      if (calculatedPH < 6.8) {
        // Acid (HCl): Translucent pinkish-clear
        liquidGradient.addColorStop(0, 'rgba(244, 63, 94, 0.35)');
        liquidGradient.addColorStop(1, 'rgba(225, 29, 72, 0.65)');
      } else if (calculatedPH > 8.2) {
        // Base (NaOH): Vibrant magenta/pink
        liquidGradient.addColorStop(0, 'rgba(236, 72, 153, 0.85)');
        liquidGradient.addColorStop(1, 'rgba(192, 38, 211, 0.95)');
      } else {
        // Neutral (pH 7.0): Crystal clear cyan/emerald
        liquidGradient.addColorStop(0, 'rgba(45, 212, 191, 0.6)');
        liquidGradient.addColorStop(1, 'rgba(16, 185, 129, 0.8)');
      }

      // 4. Draw Animated Liquid Surface Sine Waves
      waveOffset += 0.08;
      ctx.fillStyle = liquidGradient;
      ctx.beginPath();
      ctx.moveTo(beakerX, liquidY);

      const amplitude = isStirring ? 6 : 2.5;
      const frequency = 0.05;

      for (let x = beakerX; x <= beakerX + beakerW; x++) {
        const y = liquidY + Math.sin((x - beakerX) * frequency + waveOffset) * amplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(beakerX + beakerW, beakerY + beakerH);
      ctx.lineTo(beakerX, beakerY + beakerH);
      ctx.closePath();
      ctx.fill();

      // 5. Draw Swirling Micro-Particles when stirring
      if (isStirring) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        for (let p = 0; p < 12; p++) {
          const px = beakerX + 20 + Math.random() * (beakerW - 40);
          const py = liquidY + 10 + Math.random() * (liquidH - 20);
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 6. Draw Outer Glass Outline & Rim
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(beakerX - 5, beakerY);
      ctx.lineTo(beakerX, beakerY);
      ctx.lineTo(beakerX, beakerY + beakerH);
      ctx.lineTo(beakerX + beakerW, beakerY + beakerH);
      ctx.lineTo(beakerX + beakerW, beakerY);
      ctx.lineTo(beakerX + beakerW + 5, beakerY);
      ctx.stroke();

      // 7. Draw pH Meter Probe dipping into solution
      ctx.fillStyle = '#334155';
      ctx.fillRect(beakerX + 25, 10, 10, liquidY + 20);
      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.arc(beakerX + 30, liquidY + 20, 5, 0, Math.PI * 2);
      ctx.fill();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [totalVolume, calculatedPH, isStirring]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/40 shadow-glow-emerald flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold uppercase">
              LIVE CHEMISTRY REACTION ENGINE
            </span>
            <span className="text-xs text-slate-400">HCl & NaOH Titration</span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-1">
            Acids, Bases & Neutralization Spectrum
          </h2>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-2 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-400">Measured pH</p>
            <p className={`text-2xl font-extrabold font-mono ${isNeutral ? 'text-emerald-300 animate-pulse' : 'text-cyan-300'}`}>
              {calculatedPH} pH
            </p>
          </div>

          {isCompleted && (
            <button
              onClick={onLaunchAssessment}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-extrabold text-xs shadow-glow-emerald animate-bounce flex items-center space-x-2"
            >
              <Award className="w-4 h-4" />
              <span>Take Quiz (+120 XP)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main 2D Live Reaction Scene */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Beaker Canvas (7 Cols) */}
        <div className="lg:col-span-7 bg-[#131b2e] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col items-center justify-between min-h-[380px] relative overflow-hidden">
          {/* Reaction Equation Banner */}
          <div className="w-full flex items-center justify-between bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-2xl font-mono text-xs text-emerald-300 font-bold">
            <span>HCl (aq) + NaOH (aq) ➔ NaCl (aq) + H₂O (l)</span>
            <span className="text-slate-400 text-[10px]">Volume: {totalVolume} mL</span>
          </div>

          {/* Live Canvas Visual Beaker Rendering */}
          <canvas
            ref={canvasRef}
            width={340}
            height={260}
            className="w-full max-w-[340px] h-[260px] object-contain"
          />

          {/* Educational Feedback Message */}
          <div className="w-full p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-center">
            <p className={`font-semibold ${isNeutral ? 'text-emerald-300 font-bold' : 'text-slate-200'}`}>
              {getStatusMessage()}
            </p>
          </div>
        </div>

        {/* Controls & Chemistry Metrics Panel (5 Cols) */}
        <div className="lg:col-span-5 bg-[#131b2e] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-slate-800/80 pb-3">
            <FlaskConical className="w-4 h-4 text-emerald-400" />
            <span>Interactive Reaction Controls</span>
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-slate-300 mb-1.5">Add Acid Reagent (HCl 0.1M)</p>
              <button
                onClick={() => handleAddHCl(10)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-rose-500/40 text-xs font-bold text-rose-300 transition-colors flex items-center justify-center space-x-2"
              >
                <Droplet className="w-4 h-4 text-rose-400" />
                <span>+10 mL HCl Acid</span>
              </button>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-300 mb-1.5">Add Base Reagent (NaOH 0.1M)</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAddNaOH(5)}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-xs font-bold text-cyan-300 transition-colors"
                >
                  +5 mL NaOH
                </button>

                <button
                  onClick={() => handleAddNaOH(10)}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-xs font-bold text-cyan-300 transition-colors"
                >
                  +10 mL NaOH
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleStir}
                className="py-2.5 px-3 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/40 border border-indigo-500/50 text-indigo-300 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isStirring ? 'animate-spin' : ''}`} />
                <span>Stir Solution</span>
              </button>

              <button
                onClick={handleReset}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Beaker</span>
              </button>
            </div>
          </div>

          {/* pH Indicator Spectrum Reference */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-400">
              <span>Indicator Spectrum</span>
              <span className="text-cyan-300">Phenolphthalein</span>
            </div>
            <div className="h-3 w-full rounded-full bg-gradient-to-r from-rose-500 via-emerald-400 to-fuchsia-500 shadow-inner" />
            <div className="flex justify-between text-[9px] font-mono text-slate-400">
              <span>0 (Acid Clear)</span>
              <span>7 (Neutral)</span>
              <span>14 (Magenta Base)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6-Stage Flow Transition: Stage 4 -> Stage 5 Assessment */}
      {isNeutral && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-500/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-300">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>STAGE 4 COMPLETE — VIRTUAL CHEMISTRY LAB</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">Solution Fully Neutralized at pH 7.0!</h3>
            <p className="text-xs text-slate-300 mt-1">
              You successfully balanced H+ and OH- ions. Now verify your understanding in the Chemistry Mastery Assessment.
            </p>
          </div>

          <button
            onClick={onLaunchAssessment}
            className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm tracking-wide shadow-glow-emerald transition-all flex items-center space-x-2 shrink-0"
          >
            <span>Take Mastery Assessment →</span>
            <Award className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
