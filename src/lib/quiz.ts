import { descriptiveBySet } from "@/data/descriptive";
import { allQuestions, questionsByTopic } from "@/data/questions";
import { mockById, mocks } from "@/data/exam";
import type { ExamKind, MockPaper, Question, TopicId } from "@/lib/types";

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
  { topic: "ga", count: 10 },
  { topic: "english", count: 10 },
  { topic: "quant", count: 10 },
  { topic: "reasoning", count: 10 },
];

const PHASE2_P2: { topic: TopicId; count: number }[] = [
  { topic: "ds", count: 10 },
  { topic: "algorithms", count: 7 },
  { topic: "oops", count: 5 },
  { topic: "strings", count: 3 },
];

function quotaFor(kind: MockPaper["kind"]) {
  if (kind === "phase1-paper2") return PHASE1_P2;
  if (kind === "phase1-paper1") return PHASE1_P1;
  if (kind === "phase2-paper2") return PHASE2_P2;
  return [];
}

function isPyqQuestion(q: Question) {
  return q.id.startsWith("pyq-");
}

function poolFor(kind: MockPaper["kind"]) {
  // Keep named mocks disjoint from PYQ reconstructions.
  const bank = allQuestions.filter((q) => !isPyqQuestion(q));
  if (kind === "phase1-paper2") {
    return bank.filter((q) => q.phase === 1 && q.paper === 2);
  }
  if (kind === "phase1-paper1") {
    return bank.filter((q) => q.phase === 1 && q.paper === 1);
  }
  if (kind === "phase2-paper2") {
    return bank.filter((q) => q.phase === 2 && q.paper === 2);
  }
  return [];
}

/** Stable order so Mock N always draws the same slice of each topic. */
function byId(a: Question, b: Question) {
  return a.id.localeCompare(b.id);
}

function sliceForSet(
  pool: Question[],
  topic: TopicId,
  count: number,
  setIndex: number,
) {
  const from = pool.filter((q) => q.topic === topic).sort(byId);
  if (from.length === 0 || count <= 0) return [];
  const start = ((setIndex - 1) * count) % from.length;
  const picked: Question[] = [];
  const used = new Set<string>();
  for (let i = 0; i < from.length && picked.length < count; i++) {
    const item = from[(start + i) % from.length];
    if (used.has(item.id)) continue;
    used.add(item.id);
    picked.push(item);
  }
  return picked;
}

function questionsByPrefix(prefix: string): Question[] {
  return allQuestions.filter((q) => q.id.startsWith(prefix)).sort(byId);
}

export function buildMockPaper(paper: MockPaper): Question[] {
  if (paper.kind === "phase2-paper1") {
    return descriptiveBySet(paper.set)?.rc ?? [];
  }
  if (paper.idPrefix) {
    const listed = questionsByPrefix(paper.idPrefix);
    const rng = mulberry32(paper.year ?? paper.set * 9973 + 17);
    const picked =
      listed.length >= paper.questions
        ? listed.slice(0, paper.questions)
        : listed;
    return shuffle(picked, rng);
  }
  const rng = mulberry32(paper.set * 9973 + 17);
  const pool = poolFor(paper.kind);
  const picked = quotaFor(paper.kind).flatMap(({ topic, count }) =>
    sliceForSet(pool, topic, count, paper.set),
  );
  if (picked.length < paper.questions) {
    const extras = pool
      .filter((q) => !picked.some((p) => p.id === q.id))
      .sort(byId);
    picked.push(...extras.slice(0, paper.questions - picked.length));
  }
  return shuffle(picked.slice(0, paper.questions), rng);
}

/** @deprecated Prefer buildMockPaper; kept for callers that only have a kind. */
export function buildMock(kind: ExamKind, seed = Date.now()): Question[] {
  const paper = mocks.find((m) => m.kind === kind);
  if (!paper) return [];
  if (kind === "topic" || kind === "revise-wrong") return [];
  return buildMockPaper({ ...paper, set: (seed % 6) + 1 });
}

export function mockConfig(id: string) {
  return mockById(id);
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
