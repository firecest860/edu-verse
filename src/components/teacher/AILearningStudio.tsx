import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  Play, 
  Eye, 
  Send, 
  BookOpen,
  Hammer,
  GraduationCap,
  FlaskConical
} from 'lucide-react';
import { lessonGenerator, GenerateLessonInput } from '../../services/ai/lessonGenerator';
import { comicGenerator } from '../../services/ai/comicGenerator';
import { apiClient } from '../../services/apiClient';
import { Lesson, GenerationStage, ClassRoom, ComicStory } from '../../types';

interface AILearningStudioProps {
  classes: ClassRoom[];
  teacherId: string;
  teacherName: string;
  onLessonCreated: (lesson: Lesson) => void;
  onOpenPreview: (lesson: Lesson) => void;
}

const INITIAL_STAGES: GenerationStage[] = [
  { id: 1, label: 'Understanding lesson content...', detail: 'Extracting key topic parameters, target grade level, and learning objectives.', status: 'PENDING' },
  { id: 2, label: 'Extracting key concepts...', detail: 'Mapping Initialization, Relational Conditions, and Increment Steps.', status: 'PENDING' },
  { id: 3, label: 'Designing learning journey...', detail: 'Structuring EXPLORE → UNDERSTAND → TRY → CHALLENGE → ASSESS phases.', status: 'PENDING' },
  { id: 4, label: 'Generating AI Comic Story...', detail: 'Building multi-chapter story panels with student companion dialogue.', status: 'PENDING' },
  { id: 5, label: 'Creating interactive world...', detail: 'Configuring 2D simulation canvas scene & challenges.', status: 'PENDING' },
  { id: 6, label: 'Generating assessment...', detail: 'Formulating 4 multi-type questions with instant feedback explanations.', status: 'PENDING' },
  { id: 7, label: 'Personalizing experience...', detail: 'Adapting challenge difficulty to student mastery profiles.', status: 'PENDING' },
  { id: 8, label: 'Experience ready!', detail: 'Finalizing interactive mission bundle for deployment.', status: 'PENDING' }
];

export const AILearningStudio: React.FC<AILearningStudioProps> = ({
  classes,
  teacherId,
  teacherName,
  onLessonCreated,
  onOpenPreview
}) => {
  // Form State
  const [subject, setSubject] = useState<'Programming' | 'Chemistry' | 'Physics' | 'Mathematics' | 'Biology'>('Programming');
  const [topic, setTopic] = useState('For Loops in C');
  const [title, setTitle] = useState('Mastering C For Loops — Builder World Construction');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [durationMinutes, setDurationMinutes] = useState(20);
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || 'class-1');
  const [objective, setObjective] = useState('Understand loop initialization, relational condition evaluation, loop body execution, and counter incrementation by building 10 walls in Builder World.');
  const [content, setContent] = useState(`In C programming, a for loop executes a statement block repeatedly.
Syntax: for(int i = 0; i < 10; i++) { buildWall(); }
1. Initialization: int i = 0 executes once.
2. Condition Check: Is i < 10?
3. Body Execution: buildWall() adds a stone wall.
4. Increment: i++ increments counter.`);

  // Generation Format selection
  const [formatOption, setFormatOption] = useState<'WORLD' | 'COMIC' | 'CHALLENGE' | 'QUIZ'>('COMIC');

  // Generation Animation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [stages, setStages] = useState<GenerationStage[]>(INITIAL_STAGES);
  const [generatedLesson, setGeneratedLesson] = useState<Lesson | null>(null);
  const [generatedComic, setGeneratedComic] = useState<ComicStory | null>(null);
  const [showComicPreviewModal, setShowComicPreviewModal] = useState<boolean>(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedLesson(null);
    setGeneratedComic(null);
    const updatedStages = INITIAL_STAGES.map(s => ({ ...s, status: 'PENDING' as const }));
    setStages(updatedStages);

    const selectedClass = classes.find(c => c.id === selectedClassId) || classes[0];

    const inputData: GenerateLessonInput = {
      subject,
      topic,
      title,
      objective,
      difficulty,
      durationMinutes,
      content,
      teacherId,
      teacherName,
      classId: selectedClass.id,
      className: selectedClass.name,
    };

    for (let i = 0; i < updatedStages.length; i++) {
      setStages(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'LOADING' } : s));
      await new Promise(res => setTimeout(res, 260));
      setStages(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'COMPLETED' } : s));
    }

    const lessonResult = await lessonGenerator.generateLesson(inputData);
    const comicResult = comicGenerator.generateComicStory(subject, topic, title, 'AXEL');
    lessonResult.comicStory = comicResult;

    setGeneratedLesson(lessonResult);
    setGeneratedComic(comicResult);
    setIsGenerating(false);
  };

  const handleAssignToClass = async () => {
    if (!generatedLesson) return;
    const created = await apiClient.lessons.create(generatedLesson);
    onLessonCreated(created);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>AI Content Transformation Studio</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Transform Syllabus into Interactive Comics & 2D Worlds
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Professional AI workspace for teachers to format raw academic content into story comics, code challenges, and virtual labs.
          </p>
        </div>

        <button
          onClick={() => {
            setSubject('Programming');
            setTopic('For Loops in C');
            setTitle('Mastering C For Loops — Builder World Construction');
            setDifficulty('Beginner');
          }}
          className="px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-bold transition-all flex items-center space-x-2 shrink-0 shadow-glow-purple"
        >
          <Hammer className="w-4 h-4 text-cyan-400" />
          <span>Load C Demo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Form (7 Cols) */}
        <div className="lg:col-span-7 bg-[#131b2e] border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Lesson Parameters & Experience Format</span>
            </h2>
          </div>

          {/* Format Selector Pills */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Generation Format</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'COMIC', label: 'AI Comic Story', icon: BookOpen },
                { id: 'WORLD', label: '2D Simulation World', icon: Hammer },
                { id: 'CHALLENGE', label: 'Code Challenge', icon: Sparkles },
                { id: 'QUIZ', label: 'Assessment Quiz', icon: GraduationCap }
              ].map((fmt) => {
                const Icon = fmt.icon;
                const isSelected = formatOption === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    onClick={() => setFormatOption(fmt.id as any)}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                      isSelected
                        ? 'bg-purple-600/30 border-purple-500 text-white shadow-glow-purple'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{fmt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Programming">Programming (C / Code)</option>
                <option value="Chemistry">Chemistry (pH & Lab)</option>
                <option value="Physics">Physics (Vectors)</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Biology">Biology</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Lesson Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Raw Content</label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            disabled={isGenerating}
            onClick={handleGenerate}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-glow-indigo transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-cyan-200" />
                <span>AI Generating Experience & Comic Panels...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-cyan-300" />
                <span>Generate Learning Experience</span>
              </>
            )}
          </button>
        </div>

        {/* Timeline & Result (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#131b2e] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>AI Generation Timeline</span>
              </h3>
            </div>

            <div className="space-y-2.5">
              {stages.map((stage) => (
                <div 
                  key={stage.id}
                  className={`p-2.5 rounded-xl border text-xs transition-all ${
                    stage.status === 'COMPLETED'
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                      : stage.status === 'LOADING'
                      ? 'bg-indigo-950/40 border-indigo-500/60 text-white shadow-glow-indigo animate-pulse'
                      : 'bg-slate-900/40 border-slate-800/60 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {stage.status === 'COMPLETED' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {stage.status === 'LOADING' && <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />}
                      {stage.status === 'PENDING' && <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />}
                      <span className="font-bold">{stage.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {generatedLesson && (
            <div className="bg-gradient-to-br from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/40 rounded-3xl p-6 shadow-glow-purple space-y-4 animate-in zoom-in-95 duration-200">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-cyan-300 bg-cyan-500/20 border border-cyan-500/40 px-2 py-0.5 rounded-full">
                  ✨ AI Comic & World Ready
                </span>
                <h4 className="text-base font-extrabold text-white mt-2">{generatedLesson.title}</h4>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => setShowComicPreviewModal(true)}
                  className="py-2.5 px-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500/50 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-purple-300" />
                  <span>Preview AI Comic</span>
                </button>

                <button
                  onClick={handleAssignToClass}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-xs shadow-glow-emerald flex items-center justify-center space-x-1.5 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Assign to Class</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
