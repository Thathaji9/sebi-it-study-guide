import { allQuestions, questionsByTopic } from "@/data/questions";
import { mocks } from "@/data/exam";
import type { ExamKind, Question, TopicId } from "@/lib/types";

function mulberry32(seed: number) {
  return function rng() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], rng: () => number): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function take(topic: TopicId, count: number, rng: () => number, pool = allQuestions) {
  const from = shuffle(
    pool.filter((q) => q.topic === topic),
    rng,
  );
  return from.slice(0, Math.min(count, from.length));
}

const PHASE1_P2: { topic: TopicId; count: number }[] = [
  { topic: "database", count: 5 },
  { topic: "sql", count: 5 },
  { topic: "programming", count: 15 },
  { topic: "python", count: 5 },
  { topic: "algorithms", count: 5 },
  { topic: "networking", count: 5 },
  { topic: "security", count: 5 },
  { topic: "warehouse", count: 2 },
  { topic: "shell", count: 3 },
];

const PHASE1_P1: { topic: TopicId; count: number }[] = [
  { topic: "ga", count: 5 },
  { topic: "english", count: 5 },
  { topic: "quant", count: 5 },
  { topic: "reasoning", count: 5 },
];

const PHASE2_P2: { topic: TopicId; count: number }[] = [
  { topic: "ds", count: 10 },
  { topic: "algorithms", count: 7 },
  { topic: "oops", count: 5 },
  { topic: "strings", count: 3 },
];

export function buildMock(kind: ExamKind, seed = Date.now()): Question[] {
  const rng = mulberry32(seed);
  if (kind === "phase1-paper2") {
    const pool = allQuestions.filter((q) => q.phase === 1 && q.paper === 2);
    return shuffle(
      PHASE1_P2.flatMap(({ topic, count }) => take(topic, count, rng, pool)),
      rng,
    );
  }
  if (kind === "phase1-paper1") {
    const pool = allQuestions.filter((q) => q.paper === 1);
    return shuffle(
      PHASE1_P1.flatMap(({ topic, count }) => take(topic, count, rng, pool)),
      rng,
    );
  }
  if (kind === "phase2-paper2") {
    const pool = allQuestions.filter((q) => q.phase === 2);
    const picked = PHASE2_P2.flatMap(({ topic, count }) => take(topic, count, rng, pool));
    if (picked.length < 25) {
      const extras = shuffle(
        pool.filter((q) => !picked.some((p) => p.id === q.id)),
        rng,
      );
      picked.push(...extras.slice(0, 25 - picked.length));
    }
    return shuffle(picked.slice(0, 25), rng);
  }
  return [];
}

export function mockConfig(kind: ExamKind) {
  return mocks.find((m) => m.kind === kind);
}

export function scoreAttempt(
  questions: Question[],
  answers: Record<string, number | null>,
  marksEach: number,
) {
  let correct = 0;
  let wrong = 0;
  let skipped = 0;
  for (const q of questions) {
    const chosen = answers[q.id];
    if (chosen === null || chosen === undefined) skipped += 1;
    else if (chosen === q.answer) correct += 1;
    else wrong += 1;
  }
  const score = correct * marksEach - wrong * marksEach * 0.25;
  const maxScore = questions.length * marksEach;
  return { correct, wrong, skipped, score, maxScore };
}

export function topicStats(
  questions: Question[],
  answers: Record<string, number | null>,
) {
  const map = new Map<
    TopicId,
    { total: number; correct: number; wrong: number; skipped: number }
  >();
  for (const q of questions) {
    const row = map.get(q.topic) ?? { total: 0, correct: 0, wrong: 0, skipped: 0 };
    row.total += 1;
    const chosen = answers[q.id];
    if (chosen === null || chosen === undefined) row.skipped += 1;
    else if (chosen === q.answer) row.correct += 1;
    else row.wrong += 1;
    map.set(q.topic, row);
  }
  return map;
}

export { questionsByTopic };
