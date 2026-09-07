import { Lesson, KeyConcept, WorldArchetype, GameChallenge, Assessment } from '../../types';

export interface GenerateLessonInput {
  subject: 'Programming' | 'Chemistry' | 'Physics' | 'Mathematics' | 'Biology';
  topic: string;
  title: string;
  objective: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  content: string;
  teacherId: string;
  teacherName: string;
  classId: string;
  className: string;
}

export const lessonGenerator = {
  async generateLesson(input: GenerateLessonInput): Promise<Lesson> {
    // Determine target world archetype
    let worldType: WorldArchetype = 'BUILDER_WORLD';
    if (input.subject === 'Chemistry') worldType = 'LAB_SCIENTIST';
    if (input.subject === 'Physics') worldType = 'SPACE_EXPLORER';
    if (input.subject === 'Mathematics') worldType = 'TECH_GUARDIAN';
    if (input.subject === 'Biology') worldType = 'NATURE_EXPLORER';

    const keyConcepts: KeyConcept[] = [
      {
        id: `cpt-gen-1`,
        name: `${input.topic} — Foundation`,
        definition: `Fundamental principles of ${input.topic} in ${input.subject}.`,
        codeExample: input.subject === 'Programming' ? `for(int i = 0; i < 10; i++) { action(); }` : undefined,
        importance: 'FOUNDATIONAL',
        masteryScore: 85,
      },
      {
        id: `cpt-gen-2`,
        name: `${input.topic} — Execution & Boundaries`,
        definition: `Understanding edge conditions, scope limits, and operational rules.`,
        importance: 'HIGH',
        masteryScore: 80,
      },
      {
        id: `cpt-gen-3`,
        name: `${input.topic} — Real-World Application`,
        definition: `Applying ${input.topic} to solve complex challenges in ${worldType}.`,
        importance: 'HIGH',
        masteryScore: 78,
      }
    ];

    const challenge: GameChallenge = {
      id: `ch-${Date.now()}`,
      type: input.subject === 'Chemistry' ? 'CHEMISTRY_LAB_PH' : 'C_FOR_LOOP_BUILDER',
      title: `${input.topic} Interactive Simulation Mission`,
      instruction: `Execute and interact with the ${input.topic} simulation to witness theory transformed into physical world actions!`,
      initialCode: input.subject === 'Programming' ? `// EduVerse AI Generated Protocol
#include <stdio.h>

void buildWall(int wallNum) {
    printf("Constructing Wall #%d\\n", wallNum);
}

int main() {
    for (int i = 0; i < 10; i++) {
        buildWall(i + 1);
    }
    return 0;
}` : undefined,
      targetGoal: `Complete the ${input.topic} simulation challenge`
    };

    const assessment: Assessment = {
      id: `asm-${Date.now()}`,
      title: `${input.topic} AI Assessment`,
      description: `Evaluate your core understanding of ${input.topic} concepts.`,
      totalXP: 150,
      passingScore: 70,
      questions: [
        {
          id: `q-gen-1`,
          type: 'MULTIPLE_CHOICE',
          prompt: `What is the primary role of ${input.topic} in ${input.subject}?`,
          options: [
            `Automating repetitive tasks through controlled iteration`,
            `Storing arbitrary unstructured data`,
            `Executing one-off setup routines`,
            `Closing system processes`
          ],
          correctOptionIndex: 0,
          explanation: `${input.topic} optimizes code by repeating statements efficiently without manual duplication.`,
          conceptId: 'cpt-gen-1',
          difficulty: 'EASY'
        },
        {
          id: `q-gen-2`,
          type: 'PREDICT_OUTPUT',
          prompt: `In a standard 10-step iteration loop starting at index 0, when does execution terminate?`,
          options: [
            `When the counter variable reaches 10`,
            `When the counter variable reaches 0`,
            `When 100 iterations complete`,
            `Never`
          ],
          correctOptionIndex: 0,
          explanation: `Once the counter reaches 10, the condition evaluated (10 < 10) returns FALSE and terminates the loop.`,
          conceptId: 'cpt-gen-2',
          difficulty: 'MEDIUM'
        },
        {
          id: `q-gen-3`,
          type: 'DEBUGGING',
          prompt: `Which change prevents an infinite loop when counter 'i' starts at 0 and target is 10?`,
          options: [
            `Incrementing 'i' with i++ during each iteration`,
            `Decrementing 'i' with i--`,
            `Setting condition to i < -10`,
            `Removing the loop body`
          ],
          correctOptionIndex: 0,
          explanation: `Incrementing 'i++' ensures the counter moves towards the termination limit of 10.`,
          conceptId: 'cpt-gen-3',
          difficulty: 'HARD'
        }
      ]
    };

    return {
      id: `les-${Date.now()}`,
      title: input.title || `${input.topic} in ${input.subject}`,
      subject: input.subject,
      topic: input.topic,
      grade: 'Grade 10',
      classId: input.classId,
      className: input.className,
      teacherId: input.teacherId,
      teacherName: input.teacherName,
      difficulty: input.difficulty,
      durationMinutes: input.durationMinutes,
      objective: input.objective,
      content: input.content,
      summary: `AI generated interactive lesson transforming ${input.topic} into a gamified ${worldType} experience.`,
      keyConcepts,
      worldType,
      challenge,
      assessment,
      createdAt: new Date().toISOString(),
      assignedStudentIds: ['std-1', 'std-2', 'std-3', 'std-4', 'std-5', 'std-6'],
      status: 'PUBLISHED'
    };
  }
};
