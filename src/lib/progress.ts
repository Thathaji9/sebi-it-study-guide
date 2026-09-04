import type { MockResult, ProgressState } from "@/lib/types";

const KEY = "grade-a-it-desk-progress-v1";

const empty = (): ProgressState => ({
  attempts: {},
  bookmarks: [],
  mocks: [],
});

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(KEY);
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
  localStorage.setItem(KEY, JSON.stringify(state));
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
  const state = empty();
  saveProgress(state);
  return state;
}

export function wrongQuestionIds(state: ProgressState): string[] {
  return Object.entries(state.attempts)
    .filter(([, v]) => !v.correct)
    .map(([id]) => id);
}
