# 🌌 EduVerse AI — Personalize & Transform Learning into Interactive Universes

> **Tagline:** *“What your teacher teaches becomes your world.”*  
> **Core USP:** *“We don't put games around education. We turn education itself into the game.”*

![EduVerse AI Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80)

---

## 🚀 Overview

**EduVerse AI** is a next-generation AI-powered personalized learning platform that transforms standard teacher curriculum into immersive 2D virtual worlds, interactive story-driven comics, digital textbooks, and adaptive mastery assessments.

Designed for students, teachers, and parents, EduVerse AI bridges classroom instruction with interactive learning by turning abstract academic logic into physical, visual simulations.

---

## 🔄 The 6-Stage Learning Loop

EduVerse AI follows a continuous 6-stage pedagogical journey:

```
[ 1. Teacher Content Input ]
          ↓
[ 2. AI Concept Transformation ]
          ↓
[ 3. Interactive AI Textbook (Read / Listen) ]
          ↓
[ 4. AI Interactive Comic Story ]
          ↓
[ 5. 2D Interactive World Simulation (Builder / Chem Lab) ]
          ↓
[ 6. Gamified Challenge & Mastery Assessment ]
          ↓
[ Real-Time Teacher Analytics & Parent Updates ]
```

---

## 🌟 Key Features

### 🎓 1. Student Learning Universe
- **AI Companions (NOVA, LYRA, AXEL)**: Personalized AI learning guides tailored to student motivation and learning styles.
- **Interactive AI Textbook (Primary Read Mode)**:
  - Table of Contents sidebar for seamless chapter navigation.
  - Concept definitions, syntax-highlighted code/formula worked examples, and key takeaways.
  - "Check Your Understanding" checkpoints with instant feedback and **+25 XP** rewards.
- **Optional Voice Read-Along Mode**:
  - Secondary "Listen to Lesson" audio player with Play/Pause, speed control (1.0x, 1.25x, 1.5x), and live audio transcript display.
- **AI Interactive Comics**:
  - Story-driven panel lessons with interactive prediction challenges (+25 XP).
  - Seamless transition: *"Enter the World → Apply What You Learned"*.
- **2D Virtual World Simulations**:
  - **C For-Loop Builder World**: Flagship 2D algorithm simulation where executing C code (`for (int i = 0; i < 10; i++) buildWall();`) constructs 10 fortress walls in real time. High-DPI 4K `devicePixelRatio` canvas engine.
  - **Chemistry Virtual Lab**: Acid-base titration physics engine simulating HCl + NaOH neutralization, dynamic pH spectrum, phenolphthalein indicator transitions, and stirring animation.
- **Institutional Academic Pages**:
  - **Academic Review**: Subject mastery breakdowns (CS 95%, Math 88%, Chem 91%), teacher notes, and learning timeline.
  - **Attendance Tracking**: Institutional 94% attendance record, class logs with status filters (`present`, `late`, `absent`), and monthly calendar view.
  - **Examinations & Grade Cards**: Evaluated grade cards (`88/100` Grade A) and upcoming exam timetable with **"Prepare with EduVerse AI"** launcher.

### 👩‍🏫 2. Teacher SaaS Studio & Analytics
- **AI Learning Studio**: Input topic and teaching content to generate multi-format lessons across `[World]`, `[Comic]`, `[Challenge]`, `[Quiz]`, `[Textbook]`, and `[Voice]`.
- **Student Analytics**: Professional data tables, cohort performance metrics, concept mastery breakdown, and diagnostic reports.

### 👨‍👩‍👧 3. Parent Progress Portal
- Plain-language weekly growth summaries without jargon.
- Direct teacher messaging channel and academic announcements.
- Attendance summary (94%) and exam grade card cards.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, Lucide React Icons, Custom CSS Gradients |
| **Canvas Engine** | HTML5 2D Canvas with `window.devicePixelRatio` 4K scaling |
| **State & Persistence** | Reactive `dbStore` state management with IndexedDB / localStorage |
| **Service Facade** | `apiClient` mock service layer with deterministic AI simulation fallback |
| **Build & Tooling** | Vite v6, TypeScript Compiler (`tsc`), PostCSS, Autoprefixer |

---

## 🏁 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/firecest860/edu-verse.git
   cd edu-verse
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🎯 Hackathon Demonstration Flow

To demonstrate EduVerse AI to judges:

1. **Teacher View**: Open **AI Learning Studio**, type topic `C For Loops`, and click **Generate Lesson Package**.
2. **Preview & Assign**: Preview generated Textbook, Comic, World, and Assessment formats, then click **Assign to Class**.
3. **Student View**: Switch role to **Student**. Welcome message from active AI Companion (**NOVA**).
4. **Read Textbook**: Open **AI Interactive Textbook** chapter, try the "Check Your Understanding" checkpoint (+25 XP).
5. **AI Comic**: Click **Read AI Comic Story**, navigate panels, answer prediction challenge, and click **Enter the World → Apply What You Learned**.
6. **2D Simulation**: Click **Run Code** in **C Builder World** to observe 10 fortress walls constructed via C for-loop iteration.
7. **Take Quiz & Mastery**: Click **Take Mastery Assessment**, complete quiz, and view results card confirming progress broadcast.
8. **Teacher & Parent Verification**: Switch roles to verify student progress reflected in **Teacher Analytics** and **Parent Portal**.

---

## 📜 License

This project is licensed under the MIT License — see the `LICENSE` file for details.

---

*EduVerse AI — Transform education itself into the game.*
