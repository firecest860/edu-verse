import React, { useState, useEffect } from 'react';
import { dbStore, subscribeToStore } from './db/store';
import { apiClient } from './services/apiClient';
import { 
  User, 
  UserRole, 
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
} from './types';

// Components
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { NotificationDrawer } from './components/layout/NotificationDrawer';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { AILearningStudio } from './components/teacher/AILearningStudio';
import { TeacherAnalytics } from './components/teacher/TeacherAnalytics';
import { StudentDashboard } from './components/student/StudentDashboard';
import { StudentOnboardingModal } from './components/student/StudentOnboardingModal';
import { CharacterLoadingScreen } from './components/student/CharacterLoadingScreen';
import { AIComicLearning } from './components/student/AIComicLearning';
import { WorldSelectorModal } from './components/student/WorldSelectorModal';
import { AssessmentModal } from './components/student/AssessmentModal';
import { AssessmentResultModal } from './components/student/AssessmentResultModal';
import { ParentDashboard } from './components/parent/ParentDashboard';
import { CForLoopWorld } from './components/world/CForLoopWorld';
import { ChemistryLabWorld } from './components/world/ChemistryLabWorld';

export function App() {
  useEffect(() => {
    dbStore.init();
  }, []);

  // Reactive State loaded from store
  const [currentUser, setCurrentUser] = useState<User>(dbStore.getCurrentUser());
  const [students, setStudents] = useState<StudentProfile[]>(dbStore.getStudents());
  const [classes, setClasses] = useState<ClassRoom[]>(dbStore.getClasses());
  const [lessons, setLessons] = useState<Lesson[]>(dbStore.getLessons());
  const [attempts, setAttempts] = useState<AssessmentAttempt[]>(dbStore.getAttempts());
  const [announcements, setAnnouncements] = useState<Announcement[]>(dbStore.getAnnouncements());
  const [messages, setMessages] = useState<Message[]>(dbStore.getMessages());
  const [notifications, setNotifications] = useState<NotificationItem[]>(dbStore.getNotifications());

  // Navigation state
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  // Modals state
  const [previewLesson, setPreviewLesson] = useState<Lesson | null>(null);
  const [activeAssessmentLesson, setActiveAssessmentLesson] = useState<Lesson | null>(null);
  const [latestCompletedAttempt, setLatestCompletedAttempt] = useState<AssessmentAttempt | null>(null);
  const [showWorldSelector, setShowWorldSelector] = useState<boolean>(false);

  // Onboarding & Loading sequence states
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [loadingCompanionId, setLoadingCompanionId] = useState<CompanionId | null>(null);

  // Subscribe to store mutations
  useEffect(() => {
    const unsubscribe = subscribeToStore(() => {
      setCurrentUser(dbStore.getCurrentUser());
      setStudents(dbStore.getStudents());
      setClasses(dbStore.getClasses());
      setLessons(dbStore.getLessons());
      setAttempts(dbStore.getAttempts());
      setAnnouncements(dbStore.getAnnouncements());
      setMessages(dbStore.getMessages());
      setNotifications(dbStore.getNotifications());
    });
    return unsubscribe;
  }, []);

  const currentStudentProfile = students.find(s => s.userId === currentUser.id) || students[0];

  useEffect(() => {
    if (currentUser.role === 'STUDENT' && currentStudentProfile && !currentStudentProfile.onboardingCompleted) {
      setShowOnboarding(true);
    }
  }, [currentUser.role, currentStudentProfile]);

  const handleRoleSwitch = async (role: UserRole) => {
    const targetUser = await apiClient.auth.switchRole(role);
    setCurrentUser(targetUser);
    setActiveTab('dashboard');
  };

  const handleLessonCreated = (newLesson: Lesson) => {
    setActiveTab('dashboard');
  };

  const handleSelectWorld = async (worldId: WorldArchetype) => {
    await apiClient.students.updatePreferredWorld(currentStudentProfile.id, worldId);
  };

  const handleCompleteOnboarding = async (companionId: CompanionId, learningStyle: LearningStyle, motivation: Motivation) => {
    setShowOnboarding(false);
    await apiClient.students.updatePersonalization(currentStudentProfile.id, {
      companionId,
      learningStyle,
      motivation,
      onboardingCompleted: true
    });
    setLoadingCompanionId(companionId);
  };

  const handleSendMessageFromParent = async (content: string) => {
    await apiClient.messages.send({
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      receiverId: 'u-teacher-1',
      receiverName: 'Dr. Sarah Jenkins',
      content,
      studentContextName: currentStudentProfile.name
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Navbar
        currentUser={currentUser}
        studentProfile={currentUser.role === 'STUDENT' ? currentStudentProfile : undefined}
        onRoleSwitch={handleRoleSwitch}
        onToggleNotifications={() => setShowNotifications(!showNotifications)}
        unreadNotificationsCount={unreadCount}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          role={currentUser.role}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {/* TEACHER PORTAL VIEWS */}
          {currentUser.role === 'TEACHER' && (
            <>
              {activeTab === 'dashboard' && (
                <TeacherDashboard
                  classes={classes}
                  lessons={lessons}
                  attempts={attempts}
                  students={students}
                  onOpenStudio={() => setActiveTab('studio')}
                  onOpenAnalytics={() => setActiveTab('analytics')}
                  onOpenPreviewLesson={(l) => setPreviewLesson(l)}
                />
              )}

              {activeTab === 'studio' && (
                <AILearningStudio
                  classes={classes}
                  teacherId={currentUser.id}
                  teacherName={currentUser.name}
                  onLessonCreated={handleLessonCreated}
                  onOpenPreview={(l) => setPreviewLesson(l)}
                />
              )}

              {activeTab === 'analytics' && (
                <TeacherAnalytics
                  students={students}
                  classes={classes}
                />
              )}

              {activeTab === 'communication' && (
                <ParentDashboard
                  student={currentStudentProfile}
                  attempts={attempts}
                  messages={messages}
                  announcements={announcements}
                  onSendMessage={handleSendMessageFromParent}
                />
              )}
            </>
          )}

          {/* STUDENT PORTAL VIEWS */}
          {currentUser.role === 'STUDENT' && (
            <>
              {activeTab === 'dashboard' && (
                <StudentDashboard
                  studentProfile={currentStudentProfile}
                  lessons={lessons}
                  onOpenWorldSelector={() => setShowWorldSelector(true)}
                  onLaunchLesson={(l) => setActiveTab('builder-world')}
                  onLaunchChemistryLab={() => setActiveTab('chemistry-lab')}
                />
              )}

              {activeTab === 'comics' && (
                <AIComicLearning
                  companionId={currentStudentProfile.companionId}
                  lessons={lessons}
                  onLaunchSimulation={(subject) => {
                    if (subject === 'Chemistry') {
                      setActiveTab('chemistry-lab');
                    } else {
                      setActiveTab('builder-world');
                    }
                  }}
                />
              )}

              {activeTab === 'builder-world' && (
                <CForLoopWorld
                  onLaunchAssessment={() => {
                    const cLesson = lessons.find(l => l.subject === 'Programming') || lessons[0];
                    setActiveAssessmentLesson(cLesson);
                  }}
                />
              )}

              {activeTab === 'chemistry-lab' && (
                <ChemistryLabWorld
                  onCompleteLab={() => {
                    const chemLesson = lessons.find(l => l.subject === 'Chemistry') || lessons[1] || lessons[0];
                    setActiveAssessmentLesson(chemLesson);
                  }}
                />
              )}

              {activeTab === 'achievements' && (
                <StudentDashboard
                  studentProfile={currentStudentProfile}
                  lessons={lessons}
                  onOpenWorldSelector={() => setShowWorldSelector(true)}
                  onLaunchLesson={() => setActiveTab('builder-world')}
                  onLaunchChemistryLab={() => setActiveTab('chemistry-lab')}
                />
              )}
            </>
          )}

          {/* PARENT PORTAL VIEWS */}
          {currentUser.role === 'PARENT' && (
            <ParentDashboard
              student={currentStudentProfile}
              attempts={attempts}
              messages={messages}
              announcements={announcements}
              onSendMessage={handleSendMessageFromParent}
            />
          )}
        </main>
      </div>

      {/* MODALS */}

      {/* Student Onboarding Modal */}
      {showOnboarding && (
        <StudentOnboardingModal
          onComplete={handleCompleteOnboarding}
        />
      )}

      {/* Companion AI Loading Experience */}
      {loadingCompanionId && (
        <CharacterLoadingScreen
          companionId={loadingCompanionId}
          onFinished={() => setLoadingCompanionId(null)}
        />
      )}

      {/* World Selector Modal */}
      {showWorldSelector && (
        <WorldSelectorModal
          currentWorld={currentStudentProfile.preferredWorld}
          onSelectWorld={handleSelectWorld}
          onClose={() => setShowWorldSelector(false)}
        />
      )}

      {/* Assessment Quiz Runner Modal */}
      {activeAssessmentLesson && (
        <AssessmentModal
          assessment={activeAssessmentLesson.assessment}
          lessonId={activeAssessmentLesson.id}
          studentId={currentStudentProfile.id}
          studentName={currentStudentProfile.name}
          topicName={activeAssessmentLesson.topic}
          onClose={() => setActiveAssessmentLesson(null)}
          onSubmitted={(attempt) => {
            setActiveAssessmentLesson(null);
            setLatestCompletedAttempt(attempt);
          }}
        />
      )}

      {/* Assessment Results Modal */}
      {latestCompletedAttempt && (
        <AssessmentResultModal
          attempt={latestCompletedAttempt}
          onClose={() => setLatestCompletedAttempt(null)}
        />
      )}

      {/* Notification Drawer */}
      {showNotifications && (
        <NotificationDrawer
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
}

export default App;
