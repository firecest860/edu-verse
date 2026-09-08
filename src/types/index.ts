export type UserRole = 'TEACHER' | 'STUDENT' | 'PARENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  studentId?: string;
  parentId?: string;
  classId?: string;
}

export type WorldArchetype = 
  | 'BUILDER_WORLD' 
  | 'SPACE_EXPLORER' 
  | 'TECH_GUARDIAN' 
  | 'WEB_HERO' 
  | 'LAB_SCIENTIST' 
  | 'NATURE_EXPLORER';

export type CompanionId = 'NOVA' | 'LYRA' | 'AXEL';
export type LearningStyle = 'BUILD' | 'DISCOVER' | 'SOLVE';
export type Motivation = 'MASTERY' | 'CHALLENGES' | 'EXPLORING' | 'PROGRESS';

export interface CompanionInfo {
  id: CompanionId;
  name: string;
  title: string;
  tagline: string;
  description: string;
  avatarUrl: string;
  bgGradient: string;
  accentColor: string;
  borderGlow: string;
  quote: string;
}

export interface WorldArchetypeInfo {
  id: WorldArchetype;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  themeColor: string;
  bgGradient: string;
  accentBorder: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  grade: string;
  classId: string;
  className: string;
  xp: number;
  level: number;
  streakDays: number;
  preferredWorld: WorldArchetype;
  companionId: CompanionId;
  learningStyle: LearningStyle;
  motivation: Motivation;
  onboardingCompleted: boolean;
  overallMastery: number; // 0-100%
  completedLessonsCount: number;
  achievements: Achievement[];
  parentName: string;
  parentEmail: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  xpReward: number;
  category: 'MISSION' | 'STREAK' | 'CODE' | 'MASTERY';
}

export interface ClassRoom {
  id: string;
  name: string;
  grade: string;
  subject: string;
  studentCount: number;
  averageMastery: number;
  code: string;
}

export interface KeyConcept {
  id: string;
  name: string;
  definition: string;
  codeExample?: string;
  importance: 'HIGH' | 'MEDIUM' | 'FOUNDATIONAL';
  masteryScore?: number;
}

export interface Question {
  id: string;
  type: 'MULTIPLE_CHOICE' | 'PREDICT_OUTPUT' | 'DEBUGGING' | 'COMPLETE_CODE';
  prompt: string;
  codeSnippet?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  conceptId: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  totalXP: number;
  passingScore: number;
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  studentId: string;
  studentName: string;
  lessonId: string;
  score: number;
  accuracy: number;
  xpEarned: number;
  timeSpentSeconds: number;
  answers: { questionId: string; selectedIndex: number; isCorrect: boolean }[];
  completedAt: string;
  conceptMasteryUpdates: { conceptId: string; conceptName: string; score: number }[];
  aiAnalysis: {
    strengthSummary: string;
    weaknessSummary: string;
    naturalLanguageInsight: string;
    recommendedNextStep: string;
    parentSimpleReport?: string;
  };
}

export interface GameChallenge {
  id: string;
  type: 'C_FOR_LOOP_BUILDER' | 'CHEMISTRY_LAB_PH' | 'GENERIC_QUIZ';
  title: string;
  instruction: string;
  initialCode?: string;
  targetGoal: string;
}

// Comic Learning Types
export interface ComicPredictionChoice {
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface ComicPanel {
  id: string;
  chapterNumber: number;
  chapterTitle: string;
  title: string;
  characterDialogue: string;
  conceptHighlight: string;
  codeOrFormulaSnippet?: string;
  predictionChoice?: ComicPredictionChoice;
  bgTheme: string;
  illustrationType: 'FORTRESS' | 'LAB' | 'SPACE' | 'TECH';
}

export interface ComicStory {
  id: string;
  lessonId: string;
  title: string;
  topic: string;
  subject: string;
  companionId: CompanionId;
  panels: ComicPanel[];
  totalXP: number;
  summary: string;
}

// Textbook & Voice Lesson Types
export interface TextbookChapter {
  chapterNumber: number;
  title: string;
  explanation: string;
  workedExample?: {
    codeOrFormula: string;
    explanation: string;
  };
  keyTakeaways: string[];
  understandingCheck?: {
    question: string;
    options: string[];
    correctOptionIndex: number;
    explanation: string;
  };
}

export interface TextbookLessonData {
  id: string;
  lessonId: string;
  title: string;
  topic: string;
  subject: string;
  chapters: TextbookChapter[];
  summary: string;
  audioTranscript?: string;
}

// Academic Attendance Data
export interface AttendanceRecord {
  id: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  subject: string;
  topic?: string;
  remarks?: string;
}

export interface SubjectAttendance {
  subject: string;
  teacher?: string;
  percentage: number;
  attendedClasses: number;
  totalClasses: number;
}

// Examination Data
export interface ExamRecord {
  id: string;
  examName: string;
  title?: string;
  code?: string;
  subject: string;
  date: string;
  time: string;
  duration?: string;
  location: string;
  topics?: string[];
  status: 'upcoming' | 'completed';
  score?: number;
  marks?: number;
  totalMarks?: number;
  percentage?: number;
  grade?: string;
  feedback?: string;
  teacherComment?: string;
}

export interface Lesson {
  id: string;
  title: string;
  subject: 'Programming' | 'Chemistry' | 'Physics' | 'Mathematics' | 'Biology';
  topic: string;
  grade: string;
  classId: string;
  className: string;
  teacherId: string;
  teacherName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  objective: string;
  content: string;
  summary: string;
  keyConcepts: KeyConcept[];
  worldType: WorldArchetype;
  challenge: GameChallenge;
  assessment: Assessment;
  comicStory?: ComicStory;
  textbookData?: TextbookLessonData;
  createdAt: string;
  assignedStudentIds: string[];
  status: 'DRAFT' | 'PUBLISHED';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'EXAM' | 'HOMEWORK' | 'NOTICE' | 'HOLIDAY';
  authorName: string;
  createdAt: string;
  targetRole: 'ALL' | 'STUDENT' | 'PARENT';
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  receiverId: string;
  receiverName: string;
  content: string;
  timestamp: string;
  read: boolean;
  studentContextName?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'MISSION' | 'RESULT' | 'MESSAGE' | 'ANNOUNCEMENT';
  linkTarget?: string;
}

export interface GenerationStage {
  id: number;
  label: string;
  detail: string;
  status: 'PENDING' | 'LOADING' | 'COMPLETED';
}
