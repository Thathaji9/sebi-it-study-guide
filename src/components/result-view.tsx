"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/practice-session";
import { topicById } from "@/data/exam";
import { questionById } from "@/data/questions";
import { loadProgress } from "@/lib/progress";
import { topicStats } from "@/lib/quiz";
import type { MockResult } from "@/lib/types";
import { cn } from "@/lib/utils";

const letters = ["A", "B", "C", "D"] as const;

export function ResultView() {
  const [result, setResult] = useState<MockResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("grade-a-it-desk-last-result");
    const parsed = raw
      ? (JSON.parse(raw) as MockResult)
      : (loadProgress().mocks[0] ?? null);
    queueMicrotask(() => setResult(parsed));
  }, []);

  const questions = useMemo(
    () =>
      result
        ? result.attempts
            .map((a) => questionById(a.questionId))
            .filter((q) => q != null)
        : [],
    [result],
  );

  const answers = useMemo(() => {
    const map: Record<string, number | null> = {};
    if (!result) return map;
    for (const a of result.attempts) map[a.questionId] = a.chosen;
    return map;
  }, [result]);

  const byTopic = useMemo(
    () => (questions.length ? topicStats(questions, answers) : null),
    [questions, answers],
  );

  if (!result) {
    return (
      <div className="rounded-xl border bg-card p-6 text-center">
        <p className="font-heading text-xl">No paper in review</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Submit a timed mock to see cut-off, topic splits, and explanations.
        </p>
        <Button className="mt-4" asChild>
          <Link href="/mock">Go to mocks</Link>
        </Button>
      </div>
    );
  }

  const pct = result.maxScore
    ? Math.round((result.score / result.maxScore) * 1000) / 10
    : 0;
  const needed = (result.cutoffPercent / 100) * result.maxScore;
  const cleared = result.score + 1e-9 >= needed;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-5">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          {result.title}
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-heading text-4xl tabular-nums">
              {result.score}
              <span className="text-xl text-muted-foreground">
                /{result.maxScore}
              </span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {pct}% · cut-off {result.cutoffPercent}% ({needed} marks)
            </p>
          </div>
          <Badge variant={cleared ? "default" : "destructive"}>
            {cleared ? "Above cut-off" : "Below cut-off"}
          </Badge>
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
          <div className="rounded-lg bg-muted/60 py-2">
            <dt className="text-xs text-muted-foreground">Correct</dt>
            <dd className="font-medium">{result.correct}</dd>
          </div>
          <div className="rounded-lg bg-muted/60 py-2">
            <dt className="text-xs text-muted-foreground">Wrong</dt>
            <dd className="font-medium">{result.wrong}</dd>
          </div>
          <div className="rounded-lg bg-muted/60 py-2">
            <dt className="text-xs text-muted-foreground">Skipped</dt>
            <dd className="font-medium">{result.skipped}</dd>
          </div>
        </dl>
      </div>

      {byTopic ? (
        <div className="rounded-xl border bg-card p-5">
          <h2 className="font-heading text-lg">Topic split</h2>
          <ul className="mt-3 space-y-2">
            {[...byTopic.entries()].map(([id, row]) => (
              <li
                key={id}
                className="flex items-center justify-between text-sm"
              >
                <span>{topicById[id]?.name ?? id}</span>
                <span className="text-muted-foreground">
                  {row.correct}/{row.total} correct
                  {row.wrong ? ` · ${row.wrong} wrong` : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="space-y-4">
        <h2 className="font-heading text-lg">Answer key</h2>
        {questions.map((q, i) => {
          const chosen = answers[q.id];
          const ok = chosen === q.answer;
          return (
            <article key={q.id} className="rounded-xl border bg-card p-4">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">Q.{i + 1}</span>
                <Badge variant={ok ? "secondary" : "destructive"}>
                  {chosen == null ? "Skipped" : ok ? "Correct" : "Wrong"}
                </Badge>
                <Badge variant="outline">{topicById[q.topic]?.name}</Badge>
              </div>
              <p className="text-sm leading-relaxed">{q.question}</p>
              {q.code ? (
                <div className="mt-3">
                  <CodeBlock code={q.code} language={q.language} />
                </div>
              ) : null}
              <ul className="mt-3 space-y-1.5 text-sm">
                {q.options.map((opt, idx) => (
                  <li
                    key={opt}
                    className={cn(
                      "rounded-md px-2 py-1",
                      idx === q.answer && "bg-emerald-50",
                      chosen === idx && idx !== q.answer && "bg-destructive/10",
                    )}
                  >
                    <span className="mr-2 font-mono text-xs">
                      {letters[idx]}
                    </span>
                    {opt}
                    {idx === q.answer ? " — key" : ""}
                    {chosen === idx && idx !== q.answer ? " — your pick" : ""}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-muted-foreground">
                {q.explanation}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
