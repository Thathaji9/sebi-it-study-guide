export type Phase = 1 | 2;
export type Paper = 1 | 2;
export type Difficulty = "easy" | "moderate" | "hard";
export type CodeLang = "java" | "cpp" | "python" | "sql" | "bash" | "r";

export type TopicId =
  | "database"
  | "sql"
  | "programming"
  | "python"
  | "algorithms"
  | "networking"
  | "security"
  | "warehouse"
  | "shell"
  | "ds"
  | "strings"
  | "oops"
  | "ga"
  | "english"
  | "quant"
  | "reasoning";

export type Question = {
  id: string;
  topic: TopicId;
  phase: Phase;
  paper: Paper;
  difficulty: Difficulty;
  question: string;
  code?: string;
  language?: CodeLang;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  explanation: string;
};

export type ExamKind =
  | "phase1-paper2"
  | "phase1-paper1"
  | "phase2-paper2"
  | "phase2-paper1"
  | "topic"
  | "revise-wrong";

export type MockPaper = {
  id: string;
  kind: Exclude<ExamKind, "topic" | "revise-wrong">;
  set: number;
  title: string;
  blurb: string;
  questions: number;
  minutes: number;
  marksEach: number;
  cutoffPercent: number;
  mode?: "mcq" | "descriptive";
  /** Timed practice paper vs memory-based previous-year reconstruction. */
  source?: "mock" | "pyq";
  year?: number;
  /** When set, the paper is the questions whose ids start with this prefix. */
  idPrefix?: string;
};

export type AttemptRecord = {
  questionId: string;
  chosen: number | null;
  correct: boolean;
  at: number;
};

export type MockResult = {
  id: string;
  kind: ExamKind;
  title: string;
  startedAt: number;
  finishedAt: number;
  score: number;
  maxScore: number;
  correct: number;
  wrong: number;
  skipped: number;
  cutoffPercent: number;
  attempts: AttemptRecord[];
  writing?: {
    set: number;
    chosenEssay: number;
    essay: string;
    precis: string;
  };
};

export type ProgressState = {
  attempts: Record<string, { correct: boolean; at: number }>;
  bookmarks: string[];
  mocks: MockResult[];
  notesRead: string[];
};
