import { dbStore } from '../db/store';
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

const delay = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));

export const apiClient = {
  auth: {
    async getCurrentUser(): Promise<User> {
      await delay(50);
      return dbStore.getCurrentUser();
    },
    async switchRole(role: 'TEACHER' | 'STUDENT' | 'PARENT'): Promise<User> {
      await delay(100);
      const users = dbStore.getUsers();
      const targetUser = users.find(u => u.role === role) || users[0];
      dbStore.setCurrentUser(targetUser.id);
      return targetUser;
    },
    async getAllUsers(): Promise<User[]> {
      await delay(50);
      return dbStore.getUsers();
    }
  },

  students: {
    async getAll(): Promise<StudentProfile[]> {
      await delay(100);
      return dbStore.getStudents();
    },
    async getById(id: string): Promise<StudentProfile | undefined> {
      await delay(100);
      return dbStore.getStudentById(id);
    },
    async getByUserId(userId: string): Promise<StudentProfile | undefined> {
      await delay(100);
      return dbStore.getStudentByUserId(userId);
    },
    async updatePreferredWorld(studentId: string, world: WorldArchetype): Promise<void> {
      await delay(150);
      dbStore.updateStudentPreferredWorld(studentId, world);
    },
    async updatePersonalization(
      studentId: string,
      data: { companionId: CompanionId; learningStyle: LearningStyle; motivation: Motivation; onboardingCompleted: boolean }
    ): Promise<void> {
      await delay(150);
      dbStore.updateStudentPersonalization(studentId, data);
    },
    async awardXP(studentId: string, xp: number) {
      await delay(100);
      return dbStore.addStudentXP(studentId, xp);
    }
  },

  classes: {
    async getAll(): Promise<ClassRoom[]> {
      await delay(100);
      return dbStore.getClasses();
    }
  },

  lessons: {
    async getAll(): Promise<Lesson[]> {
      await delay(150);
      return dbStore.getLessons();
    },
    async getById(id: string): Promise<Lesson | undefined> {
      await delay(100);
      return dbStore.getLessonById(id);
    },
    async create(lessonData: Omit<Lesson, 'id' | 'createdAt'>): Promise<Lesson> {
      await delay(200);
      const newLesson: Lesson = {
        ...lessonData,
        id: `les-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      dbStore.saveLesson(newLesson);

      dbStore.addNotification({
        id: `notif-${Date.now()}`,
        title: '🏰 New Mission Assigned',
        message: `${newLesson.teacherName} created new lesson: ${newLesson.title}`,
        timestamp: 'Just now',
        read: false,
        type: 'MISSION',
        linkTarget: newLesson.id,
      });

      return newLesson;
    }
  },

  attempts: {
    async submit(attemptData: Omit<AssessmentAttempt, 'id' | 'completedAt'>): Promise<AssessmentAttempt> {
      await delay(250);
      const newAttempt: AssessmentAttempt = {
        ...attemptData,
        id: `att-${Date.now()}`,
        completedAt: new Date().toISOString(),
      };

      dbStore.saveAttempt(newAttempt);
      dbStore.addStudentXP(newAttempt.studentId, newAttempt.xpEarned);

      dbStore.addNotification({
        id: `notif-${Date.now()}`,
        title: '🎯 Mission Assessment Completed',
        message: `You scored ${newAttempt.score}% on ${newAttempt.studentName}'s mission! +${newAttempt.xpEarned} XP`,
        timestamp: 'Just now',
        read: false,
        type: 'RESULT',
      });

      return newAttempt;
    },
    async getByStudent(studentId: string): Promise<AssessmentAttempt[]> {
      await delay(100);
      return dbStore.getAttempts().filter(a => a.studentId === studentId);
    },
    async getAll(): Promise<AssessmentAttempt[]> {
      await delay(100);
      return dbStore.getAttempts();
    }
  },

  announcements: {
    async getAll(): Promise<Announcement[]> {
      await delay(100);
      return dbStore.getAnnouncements();
    },
    async create(announcement: Omit<Announcement, 'id' | 'createdAt'>): Promise<Announcement> {
      await delay(150);
      const newAnn: Announcement = {
        ...announcement,
        id: `ann-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      dbStore.addAnnouncement(newAnn);
      return newAnn;
    }
  },

  messages: {
    async getAll(): Promise<Message[]> {
      await delay(100);
      return dbStore.getMessages();
    },
    async send(msg: Omit<Message, 'id' | 'timestamp' | 'read'>): Promise<Message> {
      await delay(150);
      const newMsg: Message = {
        ...msg,
        id: `msg-${Date.now()}`,
        timestamp: new Date().toISOString(),
        read: false
      };
      dbStore.addMessage(newMsg);
      return newMsg;
    }
  },

  notifications: {
    async getAll(): Promise<NotificationItem[]> {
      await delay(100);
      return dbStore.getNotifications();
    }
  }
};
