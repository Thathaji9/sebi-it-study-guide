"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { topicById } from "@/data/exam";
import { loadProgress, recordAttempt, toggleBookmark } from "@/lib/progress";
import type { Question } from "@/lib/types";
import { cn } from "@/lib/utils";

const letters = ["A", "B", "C", "D"] as const;

export function CodeBlock({
  code,
  language,
}: {
  code: string;
  language?: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-code">
      {language ? (
        <div className="border-b border-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-code-muted">
          {language}
        </div>
      ) : null}
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-code-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function PracticeSession({ questions }: { questions: Question[] }) {
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [bookmarked, setBookmarked] = useState(() => new Set(loadProgress().bookmarks));
  const [correctCount, setCorrectCount] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[index];
  const topic = q ? topicById[q.topic] : undefined;

  const accuracy = attempted === 0 ? 0 : Math.round((correctCount / attempted) * 100);

  const onPick = (i: number) => {
    if (revealed || !q) return;
    setChosen(i);
    setRevealed(true);
    const ok = i === q.answer;
    recordAttempt(q.id, ok);
    setAttempted((n) => n + 1);
    if (ok) setCorrectCount((n) => n + 1);
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setChosen(null);
    setRevealed(false);
  };

  const onBookmark = () => {
    if (!q) return;
    const state = toggleBookmark(q.id);
    setBookmarked(new Set(state.bookmarks));
  };

  const restart = () => {
    setIndex(0);
    setChosen(null);
    setRevealed(false);
    setCorrectCount(0);
    setAttempted(0);
    setDone(false);
  };

  const remaining = useMemo(
    () => questions.length - index - (revealed ? 0 : 0),
    [questions.length, index, revealed],
  );

  if (questions.length === 0) {
    return (
      <p className="text-muted-foreground">No questions in this topic yet.</p>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-lg rounded-xl border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">Topic drill complete</p>
        <p className="mt-2 font-heading text-3xl">
          {correctCount}/{attempted}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{accuracy}% accuracy</p>
        <Button className="mt-5" onClick={restart}>
          Drill again
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">
            {index + 1} / {questions.length}
          </Badge>
          {topic ? <Badge variant="outline">{topic.name}</Badge> : null}
          <Badge variant="outline" className="capitalize">
            {q.difficulty}
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Session accuracy {attempted ? `${accuracy}%` : "—"} · {remaining} left
        </p>
      </div>

      <article className="rounded-xl border bg-card p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-base leading-relaxed font-medium sm:text-lg">
            {q.question}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onBookmark}
            aria-label="Bookmark"
          >
            {bookmarked.has(q.id) ? (
              <BookmarkCheck className="text-primary" />
            ) : (
              <Bookmark />
            )}
          </Button>
        </div>

        {q.code ? (
          <div className="mt-4">
            <CodeBlock code={q.code} language={q.language} />
          </div>
        ) : null}

        <div className="mt-5 grid gap-2">
          {q.options.map((opt, i) => {
            const isChosen = chosen === i;
            const isAnswer = revealed && i === q.answer;
            const isWrong = revealed && isChosen && i !== q.answer;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onPick(i)}
                className={cn(
                  "flex items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
                  !revealed && "hover:border-primary/50 hover:bg-accent",
                  isAnswer &&
                    "border-emerald-700/40 bg-ok-muted text-ok-muted-foreground",
                  isWrong && "border-destructive/40 bg-destructive/10",
                  !revealed && isChosen && "border-primary bg-accent",
                )}
              >
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md bg-muted font-mono text-xs">
                  {letters[i]}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {revealed ? (
          <div className="mt-5 rounded-lg bg-muted/60 px-4 py-3 text-sm leading-relaxed">
            <p className="font-medium">
              {chosen === q.answer ? "Correct" : "Not quite"}
            </p>
            <p className="mt-1 text-muted-foreground">{q.explanation}</p>
            <Button className="mt-4" onClick={next}>
              {index + 1 >= questions.length ? "Finish" : "Next question"}
            </Button>
          </div>
        ) : (
          <p className="mt-4 text-xs text-muted-foreground">
            Pick an option to lock it. Explanation appears immediately in practice
            mode.
          </p>
        )}
      </article>
    </div>
  );
}
