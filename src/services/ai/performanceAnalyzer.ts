import { AssessmentAttempt } from '../../types';

export const performanceAnalyzer = {
  analyzeAttempt(score: number, accuracy: number, topic: string) {
    let strengthSummary = '';
    let weaknessSummary = '';
    let naturalLanguageInsight = '';
    let recommendedNextStep = '';
    let parentSimpleReport = '';

    if (score >= 85) {
      strengthSummary = `Mastered ${topic} core iteration and condition boundaries.`;
      weaknessSummary = `Minor speed refinements on edge-case debugging.`;
      naturalLanguageInsight = `Student demonstrated exceptional logic retention and code execution mastery, scoring ${score}%.`;
      recommendedNextStep = `Advance to nested loops and multi-dimensional structure challenges!`;
      parentSimpleReport = `Your child is doing fantastic! They mastered the ${topic} concept quickly and built all 10 structures in Builder World.`;
    } else if (score >= 70) {
      strengthSummary = `Good understanding of repetition and initialization.`;
      weaknessSummary = `Needs light practice with loop termination boundary tests (< vs <=).`;
      naturalLanguageInsight = `Student understands how the code executes repeatedly, but requires extra confidence on boundary limits.`;
      recommendedNextStep = `Revisit boundary condition practice questions in Builder World.`;
      parentSimpleReport = `Your child understands the basics of ${topic} well! They completed their mission successfully with a solid ${score}% score.`;
    } else {
      strengthSummary = `Grasping visual outcome of loops in Builder Village.`;
      weaknessSummary = `Requires reinforcement on counter variable incrementation.`;
      naturalLanguageInsight = `Student struggled with loop decrement bugs and infinite loop traps.`;
      recommendedNextStep = `Review step-by-step loop playback in Builder World before retrying quiz.`;
      parentSimpleReport = `Your child learned new ideas in ${topic} today. We recommend a 5-minute review together in Builder World to boost confidence.`;
    }

    return {
      strengthSummary,
      weaknessSummary,
      naturalLanguageInsight,
      recommendedNextStep,
      parentSimpleReport,
    };
  }
};
