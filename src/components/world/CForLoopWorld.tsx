import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  StepForward, 
  Hammer, 
  Terminal, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Zap,
  Code2,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { codeSimulationEngine, SimulationResult, ExecutionFrame } from '../../services/ai/codeSimulationEngine';

interface CForLoopWorldProps {
  onCompleteChallenge?: () => void;
  onLaunchAssessment?: () => void;
}

export const CForLoopWorld: React.FC<CForLoopWorldProps> = ({
  onCompleteChallenge,
  onLaunchAssessment,
}) => {
  // C Code state
  const [code, setCode] = useState<string>(`// C For-Loop Builder Village Fortress Protocol
#include <stdio.h>

void buildWall(int wallNum) {
    printf("Constructing Wall #%d\\n", wallNum);
}

int main() {
    // Mission: Construct 10 fortress walls automatically
    for (int i = 0; i < 10; i++) {
        buildWall(i + 1);
    }
    return 0;
}`);

  // Simulation state
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize simulation when code changes
  useEffect(() => {
    const result = codeSimulationEngine.simulateCForLoop(code);
    setSimResult(result);
    setCurrentFrameIndex(0);
    setIsPlaying(false);
    setIsCompleted(false);
  }, [code]);

  // Handle Playback Animation Timer
  useEffect(() => {
    if (isPlaying && simResult) {
      const intervalMs = Math.round(500 / speedMultiplier);
      timerRef.current = setInterval(() => {
        setCurrentFrameIndex(prev => {
          if (prev < simResult.executionFrames.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            setIsCompleted(true);
            triggerCelebrationConfetti();
            if (onCompleteChallenge) onCompleteChallenge();
            return prev;
          }
        });
      }, intervalMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, simResult, speedMultiplier]);

  const triggerCelebrationConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti triggered');
    }
  };

  const handleStepForward = () => {
    if (!simResult) return;
    if (currentFrameIndex < simResult.executionFrames.length - 1) {
      const nextIdx = currentFrameIndex + 1;
      setCurrentFrameIndex(nextIdx);
      if (nextIdx === simResult.executionFrames.length - 1) {
        setIsCompleted(true);
        triggerCelebrationConfetti();
        if (onCompleteChallenge) onCompleteChallenge();
      }
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentFrameIndex(0);
    setIsCompleted(false);
  };

  const currentFrame: ExecutionFrame | undefined = simResult?.executionFrames[currentFrameIndex];
  const wallsBuiltSoFar = currentFrame?.wallConstructed || 
    (currentFrameIndex > 0 ? simResult?.executionFrames.slice(0, currentFrameIndex + 1).reduce((max, f) => f.wallConstructed ? Math.max(max, f.wallConstructed) : max, 0) || 0 : 0);

  // Canvas Drawing Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // 1. Draw Sky Gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height * 0.7);
    skyGradient.addColorStop(0, '#0a0f24');
    skyGradient.addColorStop(0.5, '#151d3b');
    skyGradient.addColorStop(1, '#1e2942');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height);

    // Draw background distant mountains & moon
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(width * 0.85, 50, 24, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.7);
    ctx.lineTo(width * 0.3, height * 0.45);
    ctx.lineTo(width * 0.6, height * 0.7);
    ctx.fill();

    // 2. Draw Rolling Grass Landscape
    const grassGradient = ctx.createLinearGradient(0, height * 0.65, 0, height);
    grassGradient.addColorStop(0, '#059669');
    grassGradient.addColorStop(0.3, '#047857');
    grassGradient.addColorStop(1, '#064e3b');
    ctx.fillStyle = grassGradient;
    ctx.beginPath();
    ctx.ellipse(width / 2, height * 0.85, width * 0.6, height * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    // 3. Draw Left Castle Tower Base
    ctx.fillStyle = '#334155';
    ctx.fillRect(20, height * 0.45, 50, height * 0.35);
    ctx.fillStyle = '#475569';
    ctx.fillRect(15, height * 0.42, 60, 15);

    // 4. Draw 10 Fortress Wall Slots
    const totalWallsToDraw = simResult?.targetIterations || 10;
    const wallAreaWidth = width - 180;
    const startX = 90;
    const wallSlotWidth = Math.min(45, (wallAreaWidth / totalWallsToDraw) - 6);
    const wallHeight = 55;
    const wallY = height * 0.62;

    for (let idx = 0; idx < totalWallsToDraw; idx++) {
      const x = startX + idx * (wallSlotWidth + 6);
      const isBuilt = idx < wallsBuiltSoFar;
      const isCurrentlyBuilding = currentFrame?.phase === 'BODY' && currentFrame?.wallConstructed === (idx + 1);

      if (isBuilt) {
        // Built Stone Wall with texture & glow
        ctx.fillStyle = isCurrentlyBuilding ? '#00f0ff' : '#64748b';
        ctx.fillRect(x, wallY, wallSlotWidth, wallHeight);

        // Stone Brick detail lines
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, wallY, wallSlotWidth, wallHeight);
        ctx.beginPath();
        ctx.moveTo(x, wallY + wallHeight / 2);
        ctx.lineTo(x + wallSlotWidth, wallY + wallHeight / 2);
        ctx.stroke();

        // Label Wall Number
        ctx.fillStyle = isCurrentlyBuilding ? '#ffffff' : '#e2e8f0';
        ctx.font = 'bold 10px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`#${idx + 1}`, x + wallSlotWidth / 2, wallY + wallHeight / 2 + 3);
      } else {
        // Unbuilt Wall Outline Slot
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(x, wallY, wallSlotWidth, wallHeight);
        ctx.setLineDash([]);

        ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.font = '10px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${idx + 1}`, x + wallSlotWidth / 2, wallY + wallHeight / 2 + 3);
      }
    }

    // 5. Draw Right Castle Tower Finish Line
    const rightTowerX = startX + totalWallsToDraw * (wallSlotWidth + 6) + 10;
    ctx.fillStyle = '#334155';
    ctx.fillRect(rightTowerX, height * 0.45, 50, height * 0.35);
    ctx.fillStyle = '#475569';
    ctx.fillRect(rightTowerX - 5, height * 0.42, 60, 15);

    // 6. Draw Animated Builder Avatar holding a Hammer
    const avatarX = startX + Math.min(wallsBuiltSoFar, totalWallsToDraw) * (wallSlotWidth + 6) - 15;
    const avatarY = height * 0.58;

    // Avatar Head & Body
    ctx.fillStyle = '#f59e0b'; // Helmet
    ctx.fillRect(avatarX + 4, avatarY - 24, 16, 8);
    ctx.fillStyle = '#fde047'; // Face
    ctx.beginPath();
    ctx.arc(avatarX + 12, avatarY - 12, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#3b82f6'; // Shirt
    ctx.fillRect(avatarX + 4, avatarY - 4, 16, 16);

    // Hammer Icon
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(avatarX + 18, avatarY - 10, 8, 4);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(avatarX + 20, avatarY - 6, 3, 10);

  }, [simResult, currentFrameIndex, wallsBuiltSoFar, currentFrame]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Simulation Header */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border border-cyan-500/40 shadow-glow-cyan flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold">
              BUILDER WORLD SIMULATION
            </span>
            <span className="text-xs text-slate-400">Flagship C Algorithm Interactive Demo</span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-1">
            Build 10 Fortress Walls with a C For Loop
          </h2>
        </div>

        {/* Status Counter Badge */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-2 flex items-center space-x-3">
            <Hammer className="w-5 h-5 text-cyan-400" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Walls Constructed</p>
              <p className="text-base font-extrabold text-cyan-300">{wallsBuiltSoFar} / {simResult?.targetIterations || 10}</p>
            </div>
          </div>

          {isCompleted && (
            <button
              onClick={onLaunchAssessment}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-extrabold text-xs shadow-glow-emerald animate-bounce flex items-center space-x-2"
            >
              <Award className="w-4 h-4" />
              <span>Take Quiz (+150 XP)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main 2D Canvas Scene Rendering Builder Village */}
      <div className="relative rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
        <canvas
          ref={canvasRef}
          width={800}
          height={260}
          className="w-full h-[260px] object-cover"
        />

        {/* Phase Indicator Overlay Badge */}
        <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl px-4 py-2 flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Current Execution Phase</p>
            <p className="text-xs font-extrabold text-cyan-300">
              {currentFrame?.phase || 'INITIALIZATION'}
            </p>
          </div>
        </div>

        {/* Variable Counter Inspector Box */}
        <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl px-4 py-2 font-mono text-xs flex items-center space-x-3">
          <span className="text-slate-400">Counter Variable:</span>
          <span className="text-amber-300 font-bold text-sm">i = {currentFrame?.variableValue ?? 0}</span>
        </div>
      </div>

      {/* Playback Controls Bar */}
      <div className="p-4 rounded-2xl bg-[#131b2e] border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold shadow-glow-cyan transition-all flex items-center space-x-2 text-xs"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Run C Simulation</span>
              </>
            )}
          </button>

          <button
            onClick={handleStepForward}
            disabled={isPlaying || currentFrameIndex >= (simResult?.executionFrames.length || 0) - 1}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center space-x-1.5 disabled:opacity-40"
          >
            <StepForward className="w-4 h-4 text-cyan-400" />
            <span>Step Forward</span>
          </button>

          <button
            onClick={handleReset}
            className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold transition-colors flex items-center space-x-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* Speed Multiplier Segment */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium">Speed:</span>
          {[0.5, 1.0, 2.0].map(s => (
            <button
              key={s}
              onClick={() => setSpeedMultiplier(s)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                speedMultiplier === s
                  ? 'bg-indigo-600 text-white border border-indigo-400'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout: Code Sandbox (Left) & Live C Terminal Logs (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Code Sandbox Panel */}
        <div className="lg:col-span-7 bg-[#131b2e] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white">C Code Sandbox</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">main.c</span>
          </div>

          <textarea
            rows={10}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 font-mono text-xs text-cyan-300 focus:outline-none focus:border-indigo-500 leading-relaxed shadow-inner"
          />
          <p className="text-[11px] text-slate-400">
            💡 <span className="font-semibold text-slate-300">Try modifying:</span> Change <code className="text-amber-300 font-mono bg-slate-900 px-1 py-0.5 rounded">i &lt; 10</code> to <code className="text-amber-300 font-mono bg-slate-900 px-1 py-0.5 rounded">i &lt; 5</code> or <code className="text-amber-300 font-mono bg-slate-900 px-1 py-0.5 rounded">i &lt; 12</code> to see Builder Village adapt dynamically!
          </p>
        </div>

        {/* C Terminal Output Log */}
        <div className="lg:col-span-5 bg-[#131b2e] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-white">C Execution Terminal</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>LIVE LOG</span>
            </span>
          </div>

          <div className="h-56 bg-[#0b0f19] border border-slate-800 rounded-2xl p-3.5 font-mono text-[11px] space-y-1.5 overflow-y-auto">
            {simResult?.logs.slice(0, currentFrameIndex + 1).map((log, idx) => (
              <div key={idx} className="text-slate-300 leading-tight">
                {log.includes('BODY') ? (
                  <span className="text-cyan-300 font-bold">{log}</span>
                ) : log.includes('CONDITION') ? (
                  <span className="text-purple-300">{log}</span>
                ) : log.includes('INCREMENT') ? (
                  <span className="text-amber-300">{log}</span>
                ) : (
                  <span className="text-slate-400">{log}</span>
                )}
              </div>
            ))}
          </div>

          {currentFrame && (
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <p className="text-slate-300 font-medium">{currentFrame.logMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
