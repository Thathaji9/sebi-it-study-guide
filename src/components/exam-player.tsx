"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Flag } from "lucide-react";

import { CodeBlock } from "@/components/practice-session";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { topicById } from "@/data/exam";
import { recordMock } from "@/lib/progress";
import { buildMockPaper, mockConfig, scoreAttempt } from "@/lib/quiz";
import type { ExamKind, Question } from "@/lib/types";
import { cn } from "@/lib/utils";

const letters = ["A", "B", "C", "D"] as const;

type PaletteState = "unseen" | "seen" | "answered" | "marked";

type LiveExam = {
  kind: ExamKind;
  paperId: string;
  title: string;
  questions: Question[];
  answers: Record<string, number | null>;
  marked: string[];
  seen: string[];
  index: number;
  remaining: number;
  startedAt: number;
};

function persistKey(kind: string) {
  return `grade-a-it-desk-live-${kind}`;
}

function formatTime(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function MockRunner({
  paperId,
  fresh,
}: {
  paperId: string;
  fresh?: boolean;
}) {
  const config = mockConfig(paperId);
  const [live, setLive] = useState<LiveExam | null>(null);

  useEffect(() => {
    if (!config) return;
    const key = persistKey(paperId);
    if (fresh) sessionStorage.removeItem(key);
    const raw = !fresh ? sessionStorage.getItem(key) : null;
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as LiveExam;
        if (parsed.questions?.length) {
          parsed.paperId = parsed.paperId ?? paperId;
          queueMicrotask(() => setLive(parsed));
          return;
        }
      } catch {
        /* fall through */
      }
    }
    const questions = buildMockPaper(config);
    queueMicrotask(() =>
      setLive({
        kind: config.kind,
        paperId,
        title: config.title,
        questions,
        answers: {},
        marked: [],
        seen: questions[0] ? [questions[0].id] : [],
        index: 0,
        remaining: config.minutes * 60,
        startedAt: Date.now(),
      }),
    );
  }, [paperId, fresh, config]);

  useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => {
      setLive((prev) => {
        if (!prev || prev.remaining <= 0) return prev;
        const next = { ...prev, remaining: prev.remaining - 1 };
        sessionStorage.setItem(persistKey(paperId), JSON.stringify(next));
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
    // Start the clock once a paper is in memory; do not restart on each tick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paperId, live?.startedAt]);

  const updateLive = (partial: Partial<LiveExam>) => {
    setLive((prev) => {
      if (!prev) return prev;
      const next: LiveExam = {
        ...prev,
        ...partial,
        answers: partial.answers
          ? { ...prev.answers, ...partial.answers }
          : prev.answers,
      };
      sessionStorage.setItem(persistKey(paperId), JSON.stringify(next));
      return next;
    });
  };

  if (!config) {
    return <p className="text-muted-foreground">Unknown paper.</p>;
  }
  if (!live) {
    return (
      <p className="text-sm text-muted-foreground">Loading the question paper…</p>
    );
  }

  return (
    <ExamPlayer
      live={live}
      marksEach={config.marksEach}
      cutoffPercent={config.cutoffPercent}
      onChange={updateLive}
    />
  );
}

function ExamPlayer({
  live,
  marksEach,
  cutoffPercent,
  onChange,
}: {
  live: LiveExam;
  marksEach: number;
  cutoffPercent: number;
  onChange: (partial: Partial<LiveExam>) => void;
}) {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const submitted = useRef(false);
  const { questions, index } = live;
  const q = questions[index];

  const patch = onChange;

  const submit = useCallback(() => {
    if (submitted.current) return;
    submitted.current = true;
    const filled: Record<string, number | null> = {};
    for (const item of questions) {
      filled[item.id] = live.answers[item.id] ?? null;
    }
    const tallied = scoreAttempt(questions, filled, marksEach);
    const result = {
      id: `${live.paperId ?? live.kind}-${live.startedAt}`,
      kind: live.kind,
      title: live.title,
      startedAt: live.startedAt,
      finishedAt: Date.now(),
      score: Math.round(tallied.score * 100) / 100,
      maxScore: tallied.maxScore,
      correct: tallied.correct,
      wrong: tallied.wrong,
      skipped: tallied.skipped,
      cutoffPercent,
      attempts: questions.map((item) => ({
        questionId: item.id,
        chosen: filled[item.id],
        correct: filled[item.id] === item.answer,
        at: Date.now(),
      })),
    };
    recordMock(result);
    sessionStorage.setItem("grade-a-it-desk-last-result", JSON.stringify(result));
    sessionStorage.removeItem(persistKey(live.paperId ?? live.kind));
    router.push("/result");
  }, [questions, live, marksEach, cutoffPercent, router]);

  useEffect(() => {
    if (live.remaining === 0 && !submitted.current) submit();
  }, [live.remaining, submit]);

  const unanswered = useMemo(
    () => questions.filter((item) => live.answers[item.id] == null).length,
    [questions, live.answers],
  );

  const paletteOf = (item: Question): PaletteState => {
    if (live.marked.includes(item.id)) return "marked";
    if (live.answers[item.id] != null) return "answered";
    if (live.seen.includes(item.id)) return "seen";
    return "unseen";
  };

  if (!q) return null;
  const topic = topicById[q.topic];

  const goTo = (nextIndex: number) => {
    const nextQ = questions[nextIndex];
    const seen = live.seen.includes(nextQ.id)
      ? live.seen
      : [...live.seen, nextQ.id];
    patch({ index: nextIndex, seen });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <section className="rounded-xl border bg-card p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b pb-3">
          <div>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">
              {live.title}
            </p>
            <p className="font-heading text-lg">
              Q.{index + 1}{" "}
              <span className="font-sans text-sm font-normal text-muted-foreground">
                of {questions.length}
                {topic ? ` · ${topic.name}` : ""}
              </span>
            </p>
          </div>
          <div
            className={cn(
              "rounded-lg px-3 py-1.5 font-mono text-lg tabular-nums",
              live.remaining < 60
                ? "bg-destructive/15 text-destructive"
                : "bg-muted",
            )}
          >
            {formatTime(live.remaining)}
          </div>
        </div>

        <p className="text-base leading-relaxed">{q.question}</p>
        {q.code ? (
          <div className="mt-4">
            <CodeBlock code={q.code} language={q.language} />
          </div>
        ) : null}

        <div className="mt-5 grid gap-2">
          {q.options.map((opt, i) => {
            const selected = live.answers[q.id] === i;
            return (
              <button
                key={`${q.id}-${i}`}
                type="button"
                aria-pressed={selected}
                onClick={() =>
                  patch({ answers: { ...live.answers, [q.id]: i } })
                }
                className={cn(
                  "flex items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm hover:border-primary/50",
                  selected &&
                    "border-primary bg-primary/10 ring-2 ring-primary/40",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid size-6 shrink-0 place-items-center rounded-md font-mono text-xs",
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted",
                  )}
                >
                  {letters[i]}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            disabled={index === 0}
            onClick={() => goTo(index - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={index === questions.length - 1}
            onClick={() => goTo(index + 1)}
          >
            Next
          </Button>
          <Button
            variant={live.marked.includes(q.id) ? "secondary" : "ghost"}
            onClick={() => {
              const marked = live.marked.includes(q.id)
                ? live.marked.filter((id) => id !== q.id)
                : [...live.marked, q.id];
              patch({ marked });
            }}
          >
            <Flag className="size-4" />
            {live.marked.includes(q.id) ? "Marked" : "Mark for review"}
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              patch({ answers: { ...live.answers, [q.id]: null } })
            }
          >
            Clear
          </Button>
          <Button className="ml-auto" onClick={() => setConfirm(true)}>
            Submit paper
          </Button>
        </div>
      </section>

      <aside className="h-fit rounded-xl border bg-card p-4">
        <p className="text-sm font-medium">Question palette</p>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {questions.map((item, i) => {
            const state = paletteOf(item);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(i)}
                className={cn(
                  "grid h-9 place-items-center rounded-md text-xs font-medium",
                  state === "unseen" && "bg-muted text-muted-foreground",
                  state === "seen" && "bg-red-100 text-red-900",
                  state === "answered" && "bg-emerald-700 text-white",
                  state === "marked" && "bg-amber-500 text-white",
                  i === index && "ring-2 ring-primary ring-offset-1",
                )}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground">
          <li>Green — answered</li>
          <li>Amber — marked for review</li>
          <li>Red — seen, not answered</li>
          <li>Grey — not visited</li>
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          {unanswered} unanswered · −¼ mark per wrong
        </p>
      </aside>

      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit this paper?</DialogTitle>
            <DialogDescription>
              {unanswered > 0
                ? `${unanswered} question(s) are still unanswered. Unanswered items score 0; a wrong answer costs one-fourth of its marks.`
                : "Every question has a response. Submit to see the score against the cut-off."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirm(false)}>
              Keep working
            </Button>
            <Button onClick={submit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
