import { sitPapers } from "@/data/exam";
import type { MockResult, ProgressState } from "@/lib/types";

export const PROGRESS_KEY = "grade-a-it-desk-progress-v1";
export const LAST_RESULT_KEY = "grade-a-it-desk-last-result";
const LIVE_PREFIX = "grade-a-it-desk-live-";

const empty = (): ProgressState => ({
  attempts: {},
  bookmarks: [],
  mocks: [],
});

export function liveExamKey(paperId: string) {
  return `${LIVE_PREFIX}${paperId}`;
}

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      attempts: parsed.attempts ?? {},
      bookmarks: parsed.bookmarks ?? [],
      mocks: parsed.mocks ?? [],
    };
  } catch {
    return empty();
  }
}

function saveProgress(state: ProgressState) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(state));
}

export function recordAttempt(questionId: string, correct: boolean) {
  const state = loadProgress();
  state.attempts[questionId] = { correct, at: Date.now() };
  saveProgress(state);
  return state;
}

export function toggleBookmark(questionId: string) {
  const state = loadProgress();
  if (state.bookmarks.includes(questionId)) {
    state.bookmarks = state.bookmarks.filter((id) => id !== questionId);
  } else {
    state.bookmarks = [...state.bookmarks, questionId];
  }
  saveProgress(state);
  return state;
}

export function recordMock(result: MockResult) {
  const state = loadProgress();
  state.mocks = [result, ...state.mocks].slice(0, 30);
  for (const a of result.attempts) {
    if (a.chosen === null) continue;
    state.attempts[a.questionId] = { correct: a.correct, at: result.finishedAt };
  }
  saveProgress(state);
  return state;
}

export function resetProgress() {
  if (typeof window !== "undefined") {
    const extra: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        (key.startsWith(LIVE_PREFIX) || key === LAST_RESULT_KEY)
      ) {
        extra.push(key);
      }
    }
    for (const key of extra) localStorage.removeItem(key);
  }
  const state = empty();
  saveProgress(state);
  return state;
}

export function wrongQuestionIds(state: ProgressState): string[] {
  return Object.entries(state.attempts)
    .filter(([, v]) => !v.correct)
    .map(([id]) => id);
}

export function unansweredQuestions<T extends { id: string }>(
  questions: T[],
  attempts: ProgressState["attempts"],
): T[] {
  return questions.filter((question) => !attempts[question.id]);
}

export function paperIdOf(result: MockResult): string | undefined {
  if (result.paperId) return result.paperId;
  const ids = sitPapers.map((paper) => paper.id).sort((a, b) => b.length - a.length);
  return ids.find((id) => result.id === id || result.id.startsWith(`${id}-`));
}

export function latestResultForPaper(
  paperId: string,
  state: ProgressState = loadProgress(),
): MockResult | undefined {
  return state.mocks.find((result) => paperIdOf(result) === paperId);
}

export function readLiveExam<T>(paperId: string): T | null {
  if (typeof window === "undefined") return null;
  const key = liveExamKey(paperId);
  const fromLocal = localStorage.getItem(key);
  const fromSession = sessionStorage.getItem(key);
  const raw = fromLocal ?? fromSession;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as T;
    if (!fromLocal && fromSession) {
      localStorage.setItem(key, fromSession);
      sessionStorage.removeItem(key);
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeLiveExam(paperId: string, live: unknown) {
  localStorage.setItem(liveExamKey(paperId), JSON.stringify(live));
}

export function clearLiveExam(paperId: string) {
  localStorage.removeItem(liveExamKey(paperId));
  sessionStorage.removeItem(liveExamKey(paperId));
}

export function saveLastResult(result: MockResult) {
  localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(result));
}

export function loadLastResult(): MockResult | null {
  if (typeof window === "undefined") return null;
  const raw =
    localStorage.getItem(LAST_RESULT_KEY) ??
    sessionStorage.getItem(LAST_RESULT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as MockResult;
  } catch {
    return null;
  }
}

export function exportProgressJson(): string {
  return JSON.stringify(loadProgress());
}

export function parseProgressJson(raw: string): ProgressState {
  const parsed = JSON.parse(raw) as ProgressState;
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Not a progress file");
  }
  return {
    attempts:
      parsed.attempts && typeof parsed.attempts === "object"
        ? parsed.attempts
        : {},
    bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
    mocks: Array.isArray(parsed.mocks) ? parsed.mocks : [],
  };
}

export function mergeProgress(
  local: ProgressState,
  incoming: ProgressState,
): ProgressState {
  const attempts = { ...local.attempts };
  for (const [id, record] of Object.entries(incoming.attempts)) {
    const existing = attempts[id];
    if (!existing || record.at >= existing.at) attempts[id] = record;
  }
  const bookmarks = [...new Set([...local.bookmarks, ...incoming.bookmarks])];
  const byId = new Map<string, MockResult>();
  for (const result of [...local.mocks, ...incoming.mocks]) {
    const prev = byId.get(result.id);
    if (!prev || result.finishedAt >= prev.finishedAt) byId.set(result.id, result);
  }
  const mocks = [...byId.values()]
    .sort((a, b) => b.finishedAt - a.finishedAt)
    .slice(0, 30);
  return { attempts, bookmarks, mocks };
}

export function importProgressJson(raw: string): ProgressState {
  const merged = mergeProgress(loadProgress(), parseProgressJson(raw));
  saveProgress(merged);
  return merged;
}
