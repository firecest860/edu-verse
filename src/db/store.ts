import { 
  User, 
  StudentProfile, 
  ClassRoom, 
  Lesson, 
  AssessmentAttempt, 
  Announcement, 
  Message, 
  NotificationItem,
  WorldArchetype,
  CompanionId,
  LearningStyle,
  Motivation
} from '../types';

import { 
  INITIAL_USERS, 
  INITIAL_CLASSES, 
  INITIAL_STUDENTS, 
  INITIAL_LESSONS, 
  INITIAL_ATTEMPTS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_MESSAGES, 
  INITIAL_NOTIFICATIONS 
} from './initialData';

const STORAGE_KEYS = {
  USERS: 'eduverse_users',
  CLASSES: 'eduverse_classes',
  STUDENTS: 'eduverse_students',
  LESSONS: 'eduverse_lessons',
  ATTEMPTS: 'eduverse_attempts',
  ANNOUNCEMENTS: 'eduverse_announcements',
  MESSAGES: 'eduverse_messages',
  NOTIFICATIONS: 'eduverse_notifications',
  CURRENT_USER_ID: 'eduverse_current_user_id',
};

type Listener = () => void;
const listeners: Set<Listener> = new Set();

export const subscribeToStore = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const notifyListeners = () => {
  listeners.forEach(fn => fn());
};

function getItem<T>(key: string, defaultVal: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`LocalStorage read error for key ${key}:`, err);
    return defaultVal;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifyListeners();
  } catch (err) {
    console.warn(`LocalStorage write error for key ${key}:`, err);
  }
}

export const dbStore = {
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CLASSES)) {
      localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(INITIAL_CLASSES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LESSONS)) {
      localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(INITIAL_LESSONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ATTEMPTS)) {
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(INITIAL_ATTEMPTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS)) {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(INITIAL_ANNOUNCEMENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(INITIAL_MESSAGES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, INITIAL_USERS[0].id);
    }
  },

  resetToDefaults() {
    localStorage.clear();
    this.init();
    notifyListeners();
  },

  // USERS & AUTH
  getUsers(): User[] {
    return getItem(STORAGE_KEYS.USERS, INITIAL_USERS);
  },

  getCurrentUser(): User {
    const users = this.getUsers();
    const currentId = getItem(STORAGE_KEYS.CURRENT_USER_ID, INITIAL_USERS[0].id);
    return users.find(u => u.id === currentId) || users[0];
  },

  setCurrentUser(userId: string) {
    setItem(STORAGE_KEYS.CURRENT_USER_ID, userId);
  },

  // STUDENTS
  getStudents(): StudentProfile[] {
    return getItem(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
  },

  getStudentById(studentId: string): StudentProfile | undefined {
    return this.getStudents().find(s => s.id === studentId);
  },

  getStudentByUserId(userId: string): StudentProfile | undefined {
    return this.getStudents().find(s => s.userId === userId);
  },

  updateStudentPreferredWorld(studentId: string, world: WorldArchetype) {
    const students = this.getStudents();
    const updated = students.map(s => s.id === studentId ? { ...s, preferredWorld: world } : s);
    setItem(STORAGE_KEYS.STUDENTS, updated);
  },

  updateStudentPersonalization(
    studentId: string, 
    data: { companionId: CompanionId; learningStyle: LearningStyle; motivation: Motivation; onboardingCompleted: boolean }
  ) {
    const students = this.getStudents();
    const updated = students.map(s => s.id === studentId ? { ...s, ...data } : s);
    setItem(STORAGE_KEYS.STUDENTS, updated);
  },

  addStudentXP(studentId: string, xpEarned: number): { newXP: number; newLevel: number; leveledUp: boolean } {
    const students = this.getStudents();
    let leveledUp = false;
    let newXP = 0;
    let newLevel = 1;

    const updated = students.map(s => {
      if (s.id === studentId) {
        newXP = s.xp + xpEarned;
        const currentLevel = s.level;
        newLevel = Math.floor(newXP / 300) + 1;
        if (newLevel > currentLevel) {
          leveledUp = true;
        }
        return {
          ...s,
          xp: newXP,
          level: newLevel,
        };
      }
      return s;
    });

    setItem(STORAGE_KEYS.STUDENTS, updated);
    return { newXP, newLevel, leveledUp };
  },

  // CLASSES
  getClasses(): ClassRoom[] {
    return getItem(STORAGE_KEYS.CLASSES, INITIAL_CLASSES);
  },

  // LESSONS
  getLessons(): Lesson[] {
    return getItem(STORAGE_KEYS.LESSONS, INITIAL_LESSONS);
  },

  getLessonById(id: string): Lesson | undefined {
    return this.getLessons().find(l => l.id === id);
  },

  saveLesson(lesson: Lesson) {
    const lessons = this.getLessons();
    const existingIndex = lessons.findIndex(l => l.id === lesson.id);
    let updated: Lesson[];
    if (existingIndex >= 0) {
      updated = [...lessons];
      updated[existingIndex] = lesson;
    } else {
      updated = [lesson, ...lessons];
    }
    setItem(STORAGE_KEYS.LESSONS, updated);
  },

  // ATTEMPTS & PERFORMANCE
  getAttempts(): AssessmentAttempt[] {
    return getItem(STORAGE_KEYS.ATTEMPTS, INITIAL_ATTEMPTS);
  },

  saveAttempt(attempt: AssessmentAttempt) {
    const attempts = this.getAttempts();
    const updated = [attempt, ...attempts];
    setItem(STORAGE_KEYS.ATTEMPTS, updated);

    const studentAttempts = updated.filter(a => a.studentId === attempt.studentId);
    if (studentAttempts.length > 0) {
      const avgScore = Math.round(
        studentAttempts.reduce((acc, a) => acc + a.score, 0) / studentAttempts.length
      );
      const students = this.getStudents();
      const updatedStudents = students.map(s => 
        s.id === attempt.studentId 
          ? { 
              ...s, 
              overallMastery: avgScore, 
              completedLessonsCount: s.completedLessonsCount + 1 
            }
          : s
      );
      setItem(STORAGE_KEYS.STUDENTS, updatedStudents);
    }
  },

  // ANNOUNCEMENTS
  getAnnouncements(): Announcement[] {
    return getItem(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  },

  addAnnouncement(announcement: Announcement) {
    const announcements = this.getAnnouncements();
    setItem(STORAGE_KEYS.ANNOUNCEMENTS, [announcement, ...announcements]);
  },

  // MESSAGES
  getMessages(): Message[] {
    return getItem(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
  },

  addMessage(message: Message) {
    const messages = this.getMessages();
    setItem(STORAGE_KEYS.MESSAGES, [...messages, message]);
  },

  // NOTIFICATIONS
  getNotifications(): NotificationItem[] {
    return getItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  },

  addNotification(notif: NotificationItem) {
    const notifications = this.getNotifications();
    setItem(STORAGE_KEYS.NOTIFICATIONS, [notif, ...notifications]);
  }
};
