export interface ExecutionFrame {
  step: number;
  phase: 'INITIALIZATION' | 'CONDITION' | 'BODY' | 'INCREMENT' | 'TERMINATED';
  variableName: string;
  variableValue: number;
  conditionExpr: string;
  conditionResult: boolean;
  wallConstructed?: number; // 1-indexed wall count created at this step
  logMessage: string;
}

export interface SimulationResult {
  success: boolean;
  concept: string;
  targetIterations: number;
  completedIterations: number;
  wallsConstructed: number;
  executionFrames: ExecutionFrame[];
  logs: string[];
  summaryFeedback: string;
}

export const codeSimulationEngine = {
  simulateCForLoop(code: string): SimulationResult {
    const frames: ExecutionFrame[] = [];
    const logs: string[] = [];

    // Parse loop parameters from code or fallback to standard for(int i = 0; i < N; i++)
    let loopLimit = 10;
    const match = code.match(/i\s*<\s*(\d+)/);
    if (match && match[1]) {
      loopLimit = parseInt(match[1], 10);
    }
    
    // Safety cap for hackathon demo
    if (loopLimit > 20) loopLimit = 20;
    if (loopLimit < 1) loopLimit = 1;

    let stepCounter = 1;
    let wallCount = 0;

    // Frame 1: Initialization
    logs.push(`[SIMULATION INIT] Executing initialization: int i = 0;`);
    frames.push({
      step: stepCounter++,
      phase: 'INITIALIZATION',
      variableName: 'i',
      variableValue: 0,
      conditionExpr: `i < ${loopLimit}`,
      conditionResult: true,
      logMessage: `[INIT] Counter variable 'i' initialized to 0.`
    });

    // Iterations Loop
    for (let i = 0; i < loopLimit; i++) {
      // Phase A: Condition check
      const isCondTrue = i < loopLimit;
      logs.push(`[CONDITION] Testing i (${i}) < ${loopLimit} -> ${isCondTrue ? 'TRUE' : 'FALSE'}`);
      frames.push({
        step: stepCounter++,
        phase: 'CONDITION',
        variableName: 'i',
        variableValue: i,
        conditionExpr: `${i} < ${loopLimit}`,
        conditionResult: isCondTrue,
        logMessage: `[CONDITION] ${i} < ${loopLimit} is TRUE. Proceeding to loop body.`
      });

      // Phase B: Body execution
      wallCount++;
      logs.push(`[EXECUTE BODY] buildWall(${wallCount}); Wall #${wallCount} constructed!`);
      frames.push({
        step: stepCounter++,
        phase: 'BODY',
        variableName: 'i',
        variableValue: i,
        conditionExpr: `${i} < ${loopLimit}`,
        conditionResult: true,
        wallConstructed: wallCount,
        logMessage: `[BODY] Executing buildWall(${wallCount}). Wall #${wallCount} added to fortress!`
      });

      // Phase C: Increment step
      logs.push(`[INCREMENT] i++ executed. i changes from ${i} to ${i + 1}.`);
      frames.push({
        step: stepCounter++,
        phase: 'INCREMENT',
        variableName: 'i',
        variableValue: i + 1,
        conditionExpr: `${i + 1} < ${loopLimit}`,
        conditionResult: (i + 1) < loopLimit,
        logMessage: `[INCREMENT] i++ incremented counter variable to ${i + 1}.`
      });
    }

    // Final termination check
    logs.push(`[TERMINATED] Condition check ${loopLimit} < ${loopLimit} -> FALSE. Loop terminated successfully.`);
    frames.push({
      step: stepCounter++,
      phase: 'TERMINATED',
      variableName: 'i',
      variableValue: loopLimit,
      conditionExpr: `${loopLimit} < ${loopLimit}`,
      conditionResult: false,
      logMessage: `[TERMINATED] Loop condition ${loopLimit} < ${loopLimit} is FALSE. Finished building ${wallCount} walls!`
    });

    return {
      success: true,
      concept: 'C For-Loop Repetition & Boundary Control',
      targetIterations: loopLimit,
      completedIterations: loopLimit,
      wallsConstructed: wallCount,
      executionFrames: frames,
      logs,
      summaryFeedback: `The C for loop executed ${loopLimit} iterations, dynamically constructing ${wallCount} walls in Builder Village with 100% precision.`
    };
  }
};
