import { 
  User, 
  StudentProfile, 
  ClassRoom, 
  Lesson, 
  AssessmentAttempt, 
  Announcement, 
  Message, 
  NotificationItem, 
  WorldArchetypeInfo,
  CompanionInfo
} from '../types';

export const COMPANIONS: CompanionInfo[] = [
  {
    id: 'NOVA',
    name: 'NOVA',
    title: 'Strategic Explorer',
    tagline: 'Navigates complex systems, logic maps, and galactic vectors',
    description: 'Analytical and vision-focused. Nova breaks down big challenges into clear strategic steps.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    bgGradient: 'from-cyan-950 via-slate-900 to-indigo-950',
    accentColor: '#00f0ff',
    borderGlow: 'border-cyan-500/60 shadow-glow-cyan',
    quote: '"Every complex problem is just a series of simple steps waiting to be mapped."'
  },
  {
    id: 'LYRA',
    name: 'LYRA',
    title: 'Creative Scientist',
    tagline: 'Discovers molecular secrets, pH spectra, and natural laws',
    description: 'Inquisitive and experimental. Lyra turns abstract science into vivid living experiments.',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    bgGradient: 'from-emerald-950 via-slate-900 to-teal-950',
    accentColor: '#10b981',
    borderGlow: 'border-emerald-500/60 shadow-glow-emerald',
    quote: '"Test every hypothesis. The universe is full of answers waiting to be found."'
  },
  {
    id: 'AXEL',
    name: 'AXEL',
    title: 'Builder & Problem Solver',
    tagline: 'Constructs castles, algorithms, and fortress architecture',
    description: 'Pragmatic and action-oriented. Axel turns lines of code into physical structures.',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    bgGradient: 'from-amber-950 via-slate-900 to-indigo-950',
    accentColor: '#f59e0b',
    borderGlow: 'border-amber-500/60 shadow-glow-indigo',
    quote: '"Code is structural magic. Write one loop, build ten walls."'
  }
];

export const WORLD_ARCHETYPES: WorldArchetypeInfo[] = [
  {
    id: 'BUILDER_WORLD',
    name: 'Builder World',
    tagline: 'Construct structures, villages, and bridges through loop mechanics',
    description: 'Transform code execution into physical block construction in a high-fantasy medieval realm.',
    icon: 'Hammer',
    themeColor: '#00f0ff',
    bgGradient: 'from-cyan-950 via-slate-900 to-indigo-950',
    accentBorder: 'border-cyan-500/40',
  },
  {
    id: 'SPACE_EXPLORER',
    name: 'Space Explorer',
    tagline: 'Navigate cosmos, orbital vectors, and star systems',
    description: 'Solve mathematical trajectories and physics simulations while piloting starships across galaxies.',
    icon: 'Rocket',
    themeColor: '#a855f7',
    bgGradient: 'from-purple-950 via-slate-900 to-slate-950',
    accentBorder: 'border-purple-500/40',
  },
  {
    id: 'TECH_GUARDIAN',
    name: 'Tech Guardian',
    tagline: 'Defend neural networks, cyber gateways, and quantum cores',
    description: 'Master logic gates, boolean algebra, and security protocols in a futuristic cyberpunk city.',
    icon: 'Shield',
    themeColor: '#6366f1',
    bgGradient: 'from-indigo-950 via-slate-900 to-blue-950',
    accentBorder: 'border-indigo-500/40',
  },
  {
    id: 'LAB_SCIENTIST',
    name: 'Lab Scientist',
    tagline: 'Simulate molecular reactions, titrations, and energy states',
    description: 'Mix reagents, adjust pH balances, and observe atomic reactions in a state-of-the-art virtual laboratory.',
    icon: 'FlaskConical',
    themeColor: '#10b981',
    bgGradient: 'from-emerald-950 via-slate-900 to-teal-950',
    accentBorder: 'border-emerald-500/40',
  },
  {
    id: 'WEB_HERO',
    name: 'Web Hero',
    tagline: 'Deploy global web applications, APIs, and client interfaces',
    description: 'Craft modern web interfaces, master DOM manipulation, and connect distributed microservices.',
    icon: 'Globe',
    themeColor: '#f59e0b',
    bgGradient: 'from-amber-950 via-slate-900 to-stone-950',
    accentBorder: 'border-amber-500/40',
  },
  {
    id: 'NATURE_EXPLORER',
    name: 'Nature Explorer',
    tagline: 'Model ecosystems, genetics, and biological feedback loops',
    description: 'Analyze cellular respiration, DNA sequencing, and environmental dynamics in a living biosphere.',
    icon: 'TreePine',
    themeColor: '#84cc16',
    bgGradient: 'from-lime-950 via-slate-900 to-emerald-950',
    accentBorder: 'border-lime-500/40',
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'u-teacher-1',
    name: 'Dr. Sarah Jenkins',
    email: 'teacher@eduverse.demo',
    role: 'TEACHER',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    classId: 'class-1',
  },
  {
    id: 'u-student-1',
    name: 'Alex Rivera',
    email: 'student@eduverse.demo',
    role: 'STUDENT',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    studentId: 'std-1',
    parentId: 'u-parent-1',
    classId: 'class-1',
  },
  {
    id: 'u-parent-1',
    name: 'Elena Rivera',
    email: 'parent@eduverse.demo',
    role: 'PARENT',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    studentId: 'std-1',
  }
];

export const INITIAL_CLASSES: ClassRoom[] = [
  {
    id: 'class-1',
    name: 'Grade 10 CS — Cyber Knights',
    grade: 'Grade 10',
    subject: 'Computer Science',
    studentCount: 14,
    averageMastery: 84,
    code: 'CS10-2026',
  },
  {
    id: 'class-2',
    name: 'Grade 9 Chemistry — Alchemy Lab',
    grade: 'Grade 9',
    subject: 'Chemistry',
    studentCount: 12,
    averageMastery: 78,
    code: 'CHEM9-2026',
  }
];

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'std-1',
    userId: 'u-student-1',
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    grade: 'Grade 10',
    classId: 'class-1',
    className: 'Grade 10 CS — Cyber Knights',
    xp: 1450,
    level: 5,
    streakDays: 7,
    preferredWorld: 'BUILDER_WORLD',
    companionId: 'AXEL',
    learningStyle: 'BUILD',
    motivation: 'CHALLENGES',
    onboardingCompleted: true,
    overallMastery: 86,
    completedLessonsCount: 8,
    parentName: 'Elena Rivera',
    parentEmail: 'parent@eduverse.demo',
    achievements: [
      {
        id: 'ach-1',
        title: 'Loop Legend',
        description: 'Constructed 10 walls with a single C for loop!',
        icon: 'Hammer',
        unlockedAt: '2026-09-06',
        xpReward: 200,
        category: 'CODE'
      },
      {
        id: 'ach-2',
        title: '7-Day Streak',
        description: 'Learned continuously for 7 days in a row.',
        icon: 'Zap',
        unlockedAt: '2026-09-07',
        xpReward: 150,
        category: 'STREAK'
      },
      {
        id: 'ach-3',
        title: 'Lab Chemist',
        description: 'Mastered pH scale titrations in Chemistry Lab.',
        icon: 'FlaskConical',
        unlockedAt: '2026-09-04',
        xpReward: 100,
        category: 'MASTERY'
      }
    ]
  },
  {
    id: 'std-2', userId: 'u-std-2', name: 'Maya Lin', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    grade: 'Grade 10', classId: 'class-1', className: 'Grade 10 CS — Cyber Knights', xp: 1820, level: 6, streakDays: 12, preferredWorld: 'SPACE_EXPLORER',
    companionId: 'NOVA', learningStyle: 'SOLVE', motivation: 'MASTERY', onboardingCompleted: true,
    overallMastery: 92, completedLessonsCount: 10, parentName: 'David Lin', parentEmail: 'david.l@example.com', achievements: []
  },
  {
    id: 'std-3', userId: 'u-std-3', name: 'Liam Chen', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    grade: 'Grade 10', classId: 'class-1', className: 'Grade 10 CS — Cyber Knights', xp: 1200, level: 4, streakDays: 3, preferredWorld: 'TECH_GUARDIAN',
    companionId: 'AXEL', learningStyle: 'BUILD', motivation: 'PROGRESS', onboardingCompleted: true,
    overallMastery: 76, completedLessonsCount: 6, parentName: 'Grace Chen', parentEmail: 'grace.c@example.com', achievements: []
  },
  {
    id: 'std-4', userId: 'u-std-4', name: 'Sophia Patel', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    grade: 'Grade 10', classId: 'class-1', className: 'Grade 10 CS — Cyber Knights', xp: 2100, level: 7, streakDays: 15, preferredWorld: 'BUILDER_WORLD',
    companionId: 'AXEL', learningStyle: 'BUILD', motivation: 'MASTERY', onboardingCompleted: true,
    overallMastery: 95, completedLessonsCount: 12, parentName: 'Rajesh Patel', parentEmail: 'raj.p@example.com', achievements: []
  },
  {
    id: 'std-5', userId: 'u-std-5', name: 'Ethan Vance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    grade: 'Grade 10', classId: 'class-1', className: 'Grade 10 CS — Cyber Knights', xp: 950, level: 3, streakDays: 2, preferredWorld: 'WEB_HERO',
    companionId: 'NOVA', learningStyle: 'DISCOVER', motivation: 'EXPLORING', onboardingCompleted: true,
    overallMastery: 68, completedLessonsCount: 4, parentName: 'Laura Vance', parentEmail: 'laura.v@example.com', achievements: []
  },
  {
    id: 'std-6', userId: 'u-std-6', name: 'Zara Kim', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    grade: 'Grade 10', classId: 'class-1', className: 'Grade 10 CS — Cyber Knights', xp: 1600, level: 5, streakDays: 9, preferredWorld: 'LAB_SCIENTIST',
    companionId: 'LYRA', learningStyle: 'DISCOVER', motivation: 'MASTERY', onboardingCompleted: true,
    overallMastery: 88, completedLessonsCount: 9, parentName: 'Sung Kim', parentEmail: 'sung.k@example.com', achievements: []
  }
];

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: 'les-1',
    title: 'Mastering C For Loops — Builder World Construction',
    subject: 'Programming',
    topic: 'For Loop Mechanics in C',
    grade: 'Grade 10',
    classId: 'class-1',
    className: 'Grade 10 CS — Cyber Knights',
    teacherId: 'u-teacher-1',
    teacherName: 'Dr. Sarah Jenkins',
    difficulty: 'Beginner',
    durationMinutes: 20,
    objective: 'Understand loop initialization, relational condition evaluation, loop body execution, and counter incrementation by building 10 walls in Builder World.',
    content: `In C programming, a for loop allows executing a code block repeatedly a specified number of times.
Syntax:
for(initialization; condition; increment) {
    // Repeated action
}
Example:
for(int i = 0; i < 10; i++) {
    buildWall();
}
Execution flow:
1. Initialization: int i = 0 executes ONCE at the start.
2. Condition Check: Is i < 10? If true, enter loop body.
3. Body Execution: Call buildWall() to place a wall block on screen.
4. Increment: i++ adds 1 to i.
5. Repeat step 2 until condition becomes false (when i reaches 10).`,
    summary: 'Transform C loop syntax into dynamic fantasy architecture! Learn how initialization, termination conditions, and increments automate repetitive tasks.',
    keyConcepts: [
      {
        id: 'cpt-1',
        name: 'Loop Initialization',
        definition: 'Setting up the counter variable (e.g. int i = 0) before iteration starts.',
        codeExample: 'int i = 0;',
        importance: 'FOUNDATIONAL',
        masteryScore: 92,
      },
      {
        id: 'cpt-2',
        name: 'Relational Condition',
        definition: 'The boolean test evaluated before every iteration (e.g. i < 10). If false, loop terminates.',
        codeExample: 'i < 10;',
        importance: 'HIGH',
        masteryScore: 78,
      },
      {
        id: 'cpt-3',
        name: 'Increment Step',
        definition: 'Updating the counter variable after each iteration body completes (e.g. i++).',
        codeExample: 'i++',
        importance: 'HIGH',
        masteryScore: 89,
      },
      {
        id: 'cpt-4',
        name: 'Loop Body Repetition',
        definition: 'The statement or function executed during each iteration cycle.',
        codeExample: 'buildWall();',
        importance: 'FOUNDATIONAL',
        masteryScore: 95,
      }
    ],
    worldType: 'BUILDER_WORLD',
    challenge: {
      id: 'ch-1',
      type: 'C_FOR_LOOP_BUILDER',
      title: 'Builder Village Fortress Mission',
      instruction: 'Run the C for loop simulation below. Observe how loop control statements construct 10 stone walls step-by-step.',
      initialCode: `// Builder Village Construction Protocol
#include <stdio.h>

void buildWall(int wallNum) {
    printf("Constructing Wall #%d\\n", wallNum);
}

int main() {
    // Mission: Build 10 walls around the fortress
    for (int i = 0; i < 10; i++) {
        buildWall(i + 1);
    }
    return 0;
}`,
      targetGoal: 'Build 10 walls using loop iteration'
    },
    assessment: {
      id: 'asm-1',
      title: 'C For Loop Mastery Quiz',
      description: 'Test your understanding of loop execution cycles, boundary checks, and iteration logic.',
      totalXP: 150,
      passingScore: 70,
      questions: [
        {
          id: 'q-1',
          type: 'MULTIPLE_CHOICE',
          prompt: 'In the loop `for (int i = 0; i < 10; i++)`, how many total times will `buildWall()` execute?',
          options: ['9 times', '10 times', '11 times', 'Infinite times'],
          correctOptionIndex: 1,
          explanation: 'The counter `i` starts at 0 and increments up to 9 (0,1,2,3,4,5,6,7,8,9), totaling exactly 10 iterations. When `i` becomes 10, `i < 10` is false.',
          conceptId: 'cpt-2',
          difficulty: 'EASY'
        },
        {
          id: 'q-2',
          type: 'PREDICT_OUTPUT',
          prompt: 'What will be the final value of variable `i` AFTER the loop `for (int i = 0; i < 5; i++)` finishes?',
          options: ['4', '5', '0', '6'],
          correctOptionIndex: 1,
          explanation: 'The loop body runs while `i < 5` (when i=0,1,2,3,4). After the 5th iteration, `i++` increases `i` to 5. Then `5 < 5` evaluates to false and the loop terminates with `i = 5`.',
          conceptId: 'cpt-3',
          difficulty: 'MEDIUM'
        },
        {
          id: 'q-3',
          type: 'DEBUGGING',
          prompt: 'Which line contains a bug that causes an infinite loop: `for (int i = 0; i < 10; i--)`?',
          options: ['`int i = 0;`', '`i < 10;`', '`i--` (decrements instead of increments)', '`int` variable type'],
          correctOptionIndex: 2,
          explanation: 'Decrementing `i--` makes `i` become negative (-1, -2, -3...), so `i < 10` remains true forever, leading to an infinite loop!',
          conceptId: 'cpt-3',
          difficulty: 'HARD'
        },
        {
          id: 'q-4',
          type: 'COMPLETE_CODE',
          prompt: 'To construct 15 walls starting from 0, what should the condition expression be?',
          options: ['i <= 15', 'i < 15', 'i == 15', 'i > 15'],
          correctOptionIndex: 1,
          explanation: '`i < 15` with `i = 0` runs for index values 0 through 14, which totals 15 iterations.',
          conceptId: 'cpt-2',
          difficulty: 'EASY'
        }
      ]
    },
    createdAt: '2026-09-06T10:00:00Z',
    assignedStudentIds: ['std-1', 'std-2', 'std-3', 'std-4', 'std-5', 'std-6'],
    status: 'PUBLISHED'
  },
  {
    id: 'les-2',
    title: 'Acids, Bases & The pH Spectrum — Virtual Chemistry Lab',
    subject: 'Chemistry',
    topic: 'pH Titration and Chemical Indicators',
    grade: 'Grade 9',
    classId: 'class-2',
    className: 'Grade 9 Chemistry — Alchemy Lab',
    teacherId: 'u-teacher-1',
    teacherName: 'Dr. Sarah Jenkins',
    difficulty: 'Beginner',
    durationMinutes: 25,
    objective: 'Simulate mixing Hydrochloric Acid (HCl) and Sodium Hydroxide (NaOH) while observing Phenolphthalein indicator color changes along the 0-14 pH logarithmic scale.',
    content: `Acids are chemical substances that release hydrogen ions (H+) in solution, with pH values less than 7.
Bases release hydroxide ions (OH-) with pH values greater than 7.
Neutral solutions like pure water have a pH of 7.0.
When an acid and base react, neutralization occurs forming salt and water!`,
    summary: 'Conduct live pH scale titrations in a virtual chemical apparatus with real-time liquid color spectrum feedback.',
    keyConcepts: [
      { id: 'cpt-chem-1', name: 'Logarithmic pH Scale', definition: 'Scale from 0 (strong acid) to 14 (strong base) representing H+ ion concentration.', importance: 'FOUNDATIONAL', masteryScore: 90 },
      { id: 'cpt-chem-2', name: 'Neutralization Reaction', definition: 'Acid + Base -> Salt + Water, shifting pH towards 7.0.', importance: 'HIGH', masteryScore: 82 },
      { id: 'cpt-chem-3', name: 'Chemical Indicators', definition: 'Substances like phenolphthalein that alter color based on solution acidity.', importance: 'MEDIUM', masteryScore: 85 }
    ],
    worldType: 'LAB_SCIENTIST',
    challenge: {
      id: 'ch-2',
      type: 'CHEMISTRY_LAB_PH',
      title: 'Neutralization Titration Lab',
      instruction: 'Adjust acid and base reagent volumes to bring the beaker solution to a neutral pH of 7.0!',
      targetGoal: 'Achieve pH 7.0 neutralization'
    },
    assessment: {
      id: 'asm-2',
      title: 'Acids & Bases Lab Assessment',
      description: 'Evaluate pH levels, chemical indicators, and neutralization concepts.',
      totalXP: 120,
      passingScore: 70,
      questions: [
        {
          id: 'q-chem-1',
          type: 'MULTIPLE_CHOICE',
          prompt: 'What color does Phenolphthalein turn in a strongly basic solution (pH > 8.2)?',
          options: ['Colorless', 'Vibrant Pink / Magenta', 'Bright Red', 'Yellow'],
          correctOptionIndex: 1,
          explanation: 'Phenolphthalein is colorless in acidic solutions and turns bright pink/magenta in alkaline conditions (pH > 8.2).',
          conceptId: 'cpt-chem-3',
          difficulty: 'EASY'
        },
        {
          id: 'q-chem-2',
          type: 'MULTIPLE_CHOICE',
          prompt: 'A solution with pH 3.0 is added to a solution with pH 11.0. What happens to the pH of the combined mixture?',
          options: ['Increases above 14', 'Moves towards neutral 7.0', 'Stays exactly at 3.0', 'Drops below 0'],
          correctOptionIndex: 1,
          explanation: 'Mixing acid (pH 3) and base (pH 11) results in partial neutralization, driving the pH towards 7.0.',
          conceptId: 'cpt-chem-2',
          difficulty: 'MEDIUM'
        }
      ]
    },
    createdAt: '2026-09-05T14:30:00Z',
    assignedStudentIds: ['std-1', 'std-2', 'std-3', 'std-4', 'std-5', 'std-6'],
    status: 'PUBLISHED'
  }
];

export const INITIAL_ATTEMPTS: AssessmentAttempt[] = [
  {
    id: 'att-1',
    assessmentId: 'asm-1',
    studentId: 'std-1',
    studentName: 'Alex Rivera',
    lessonId: 'les-1',
    score: 88,
    accuracy: 88,
    xpEarned: 150,
    timeSpentSeconds: 180,
    answers: [
      { questionId: 'q-1', selectedIndex: 1, isCorrect: true },
      { questionId: 'q-2', selectedIndex: 1, isCorrect: true },
      { questionId: 'q-3', selectedIndex: 2, isCorrect: true },
      { questionId: 'q-4', selectedIndex: 0, isCorrect: false }
    ],
    completedAt: '2026-09-07T09:15:00Z',
    conceptMasteryUpdates: [
      { conceptId: 'cpt-1', conceptName: 'Loop Initialization', score: 95 },
      { conceptId: 'cpt-2', conceptName: 'Relational Condition', score: 82 },
      { conceptId: 'cpt-3', conceptName: 'Increment Step', score: 90 }
    ],
    aiAnalysis: {
      strengthSummary: 'Demonstrates outstanding understanding of loop counter updates and basic execution iteration.',
      weaknessSummary: 'Occasional confusion regarding strict `<` vs `<=` boundary conditions.',
      naturalLanguageInsight: 'Alex quickly grasped how the counter variable increments and controls repetition. Practicing nested loop edge cases will solidify mastery.',
      recommendedNextStep: 'Try the Advanced Nested Loop Challenge in Builder World!',
      parentSimpleReport: 'Alex mastered C For Loops repetition today! They scored 88% on their mission assessment and successfully constructed 10 walls in Builder World.'
    }
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: '🚀 Hackathon Showcase: Cyber Knights Builder League',
    content: 'All students are invited to submit their custom Builder World C algorithms by Friday. Top 3 scores earn bonus XP badges!',
    type: 'NOTICE',
    authorName: 'Dr. Sarah Jenkins',
    createdAt: '2026-09-07T08:00:00Z',
    targetRole: 'ALL'
  },
  {
    id: 'ann-2',
    title: '📝 Grade 10 Mid-Term Assessment Schedule',
    content: 'The C Programming & Loops evaluation will take place next Tuesday during 2nd period. Please review lesson 1 modules.',
    type: 'EXAM',
    authorName: 'Dr. Sarah Jenkins',
    createdAt: '2026-09-06T12:00:00Z',
    targetRole: 'ALL'
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    senderId: 'u-teacher-1',
    senderName: 'Dr. Sarah Jenkins',
    senderRole: 'TEACHER',
    receiverId: 'u-parent-1',
    receiverName: 'Elena Rivera',
    content: 'Hello Mrs. Rivera! Alex did fantastic on today\'s C For Loop Builder assignment, scoring 88% and unlocking the Loop Legend badge!',
    timestamp: '2026-09-07T10:30:00Z',
    read: false,
    studentContextName: 'Alex Rivera'
  },
  {
    id: 'msg-2',
    senderId: 'u-parent-1',
    senderName: 'Elena Rivera',
    senderRole: 'PARENT',
    receiverId: 'u-teacher-1',
    receiverName: 'Dr. Sarah Jenkins',
    content: 'Thank you Dr. Jenkins! Alex was so excited showing me the 10 walls being built by code on the tablet.',
    timestamp: '2026-09-07T11:05:00Z',
    read: true,
    studentContextName: 'Alex Rivera'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '🏆 Achievement Unlocked!',
    message: 'You unlocked "7-Day Streak" and earned +150 XP!',
    timestamp: '2 hours ago',
    read: false,
    type: 'RESULT'
  },
  {
    id: 'notif-2',
    title: '🏰 New Mission Assigned',
    message: 'Dr. Sarah Jenkins assigned "Mastering C For Loops — Builder World Construction"',
    timestamp: '1 day ago',
    read: true,
    type: 'MISSION'
  }
];
