import { ComicStory, ComicPanel, CompanionId } from '../../types';
import { COMPANIONS } from '../../db/initialData';

export const comicGenerator = {
  generateComicStory(
    subject: string,
    topic: string,
    lessonTitle: string,
    companionId: CompanionId = 'AXEL'
  ): ComicStory {
    const companion = COMPANIONS.find(c => c.id === companionId) || COMPANIONS[2];

    if (subject === 'Chemistry') {
      const panels: ComicPanel[] = [
        {
          id: 'p-chem-1',
          chapterNumber: 1,
          chapterTitle: 'CHAPTER 1: THE LAB DISCOVERY',
          title: 'The Acidic Challenge',
          characterDialogue: `${companion.name}: "Welcome to the Virtual Chemistry Laboratory! We have 50 mL of Hydrochloric Acid (HCl) at pH 1.0."`,
          conceptHighlight: 'Acids release H+ ions in water, giving solutions a pH value below 7.0.',
          codeOrFormulaSnippet: 'HCl (aq) -> H+ (aq) + Cl- (aq)',
          bgTheme: 'from-emerald-950 via-slate-900 to-teal-950',
          illustrationType: 'LAB'
        },
        {
          id: 'p-chem-2',
          chapterNumber: 2,
          chapterTitle: 'CHAPTER 2: CHEMICAL INDICATORS',
          title: 'The Phenolphthalein Spectrum',
          characterDialogue: `${companion.name}: "We added Phenolphthalein indicator drops to our solution. How will it react when we add base?"`,
          conceptHighlight: 'Phenolphthalein remains colorless in acids (pH < 8.2) and shifts to bright magenta in alkaline bases.',
          predictionChoice: {
            question: 'What color does Phenolphthalein turn when solution pH rises above 8.2 (Basic)?',
            options: [
              'Colorless & Clear',
              'Vibrant Magenta / Pink',
              'Dark Brown'
            ],
            correctOptionIndex: 1,
            explanation: 'Phenolphthalein turns vibrant pink/magenta in basic solutions with pH greater than 8.2!'
          },
          bgTheme: 'from-fuchsia-950 via-slate-900 to-purple-950',
          illustrationType: 'LAB'
        },
        {
          id: 'p-chem-3',
          chapterNumber: 3,
          chapterTitle: 'CHAPTER 3: NEUTRALIZATION',
          title: 'Achieving pH 7.0 Equilibrium',
          characterDialogue: `${companion.name}: "Adding Sodium Hydroxide (NaOH) base causes H+ and OH- ions to combine into pure water and salt!"`,
          conceptHighlight: 'Neutralization Formula: Acid + Base -> Salt + Water.',
          codeOrFormulaSnippet: 'HCl (aq) + NaOH (aq) -> NaCl (aq) + H2O (l) [pH 7.0]',
          bgTheme: 'from-cyan-950 via-slate-900 to-emerald-950',
          illustrationType: 'LAB'
        }
      ];

      return {
        id: `story-${Date.now()}`,
        lessonId: 'les-2',
        title: 'The pH Spectrum Quest',
        topic,
        subject,
        companionId,
        panels,
        totalXP: 100,
        summary: `Join ${companion.name} in a story quest through acids, bases, and pH titration chemistry!`
      };
    }

    // Default Programming C For-Loop Story
    const panels: ComicPanel[] = [
      {
        id: 'p-c-1',
        chapterNumber: 1,
        chapterTitle: 'CHAPTER 1: THE COLLAPSED FORTRESS',
        title: 'The Need for Automation',
        characterDialogue: `${companion.name}: "Look! The fortress wall has collapsed. We need 10 stone walls constructed automatically!"`,
        conceptHighlight: 'Manual repetition causes slow execution and human error. Loops automate repeated actions.',
        codeOrFormulaSnippet: '// Manual approach (Slow)\nbuildWall(1); buildWall(2); ... buildWall(10);',
        bgTheme: 'from-indigo-950 via-slate-900 to-purple-950',
        illustrationType: 'FORTRESS'
      },
      {
        id: 'p-c-2',
        chapterNumber: 2,
        chapterTitle: 'CHAPTER 2: COUNTER INITIALIZATION',
        title: 'The Counter Variable (i = 0)',
        characterDialogue: `${companion.name}: "Instead of manual placement, we create a loop counter variable int i = 0 to track our progress."`,
        conceptHighlight: 'Loop Initialization: int i = 0 sets up the starting counter before iteration begins.',
        predictionChoice: {
          question: 'If int i = 0 and condition is i < 10 with i++, how many total times will buildWall() execute?',
          options: [
            '9 times',
            '10 times',
            '11 times'
          ],
          correctOptionIndex: 1,
          explanation: 'Starting at 0 and running while i < 10 (0,1,2,3,4,5,6,7,8,9) totals exactly 10 iterations!'
        },
        bgTheme: 'from-cyan-950 via-slate-900 to-indigo-950',
        illustrationType: 'FORTRESS'
      },
      {
        id: 'p-c-3',
        chapterNumber: 3,
        chapterTitle: 'CHAPTER 3: THE FOR-LOOP PROTOCOL',
        title: 'Constructing 10 Walls with 1 Loop',
        characterDialogue: `${companion.name}: "With for(int i = 0; i < 10; i++), the system evaluates condition i < 10, builds a wall, and increments i++!"`,
        conceptHighlight: 'For Loop Syntax: for(initialization; condition; increment) { body }',
        codeOrFormulaSnippet: 'for (int i = 0; i < 10; i++) {\n    buildWall(i + 1);\n}',
        bgTheme: 'from-cyan-950 via-slate-900 to-emerald-950',
        illustrationType: 'FORTRESS'
      }
    ];

    return {
      id: `story-${Date.now()}`,
      lessonId: 'les-1',
      title: 'The Fortress of Ten — C For Loops',
      topic,
      subject,
      companionId,
      panels,
      totalXP: 100,
      summary: `Join ${companion.name} as you transform C loop code into physical fortress walls in Builder Village!`
    };
  }
};
