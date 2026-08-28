"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { allQuestions } from "@/data/questions";
import { phase1Paper2 } from "@/data/exam";
import { loadProgress, resetProgress } from "@/lib/progress";
import type { ProgressState } from "@/lib/types";
import { questionsByTopic } from "@/lib/quiz";

export function HomeProgress() {
  const [state, setState] = useState<ProgressState | null>(null);

  useEffect(() => {
    const next = loadProgress();
    queueMicrotask(() => setState(next));
  }, []);

  const stats = useMemo(() => {
    if (!state) return null;
    const attempted = Object.keys(state.attempts).length;
    const correct = Object.values(state.attempts).filter((a) => a.correct).length;
    const coverage = phase1Paper2.map((t) => {
      const bank = questionsByTopic(t.id);
      const done = bank.filter((q) => state.attempts[q.id]).length;
      return { ...t, done, total: bank.length };
    });
    const last = state.mocks[0];
    return {
      attempted,
      correct,
      accuracy: attempted ? Math.round((correct / attempted) * 100) : 0,
      coverage,
      last,
      mockCount: state.mocks.length,
      bank: allQuestions.length,
    };
  }, [state]);

  if (!stats) {
    return <p className="text-sm text-muted-foreground">Loading your desk…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat
          label="Questions attempted"
          value={`${stats.attempted}`}
          hint={`of ${stats.bank} in this bank`}
        />
        <Stat
          label="Accuracy"
          value={stats.attempted ? `${stats.accuracy}%` : "—"}
          hint={`${stats.correct} correct so far`}
        />
        <Stat
          label="Mocks submitted"
          value={`${stats.mockCount}`}
          hint={
            stats.last
              ? `Last: ${stats.last.score}/${stats.last.maxScore}`
              : "Sit a timed paper when you are ready"
          }
        />
      </div>

      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="font-heading text-lg">Phase I Paper 2 coverage</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/practice">Open practice</Link>
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {stats.coverage.map((t) => {
            const pct = t.total ? Math.round((t.done / t.total) * 100) : 0;
            return (
              <Link
                key={t.id}
                href={`/practice/${t.id}`}
                className="rounded-lg border px-3 py-2.5 hover:bg-accent"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{t.name}</span>
                  <span className="text-muted-foreground">
                    {t.weightage}% · {t.done}/{t.total}
                  </span>
                </div>
                <Progress value={pct} className="mt-2 h-1.5" />
              </Link>
            );
          })}
        </div>
      </div>

      {stats.last ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card px-4 py-3">
          <p className="text-sm">
            Last mock · {stats.last.title}:{" "}
            <span className="font-medium">
              {stats.last.score}/{stats.last.maxScore}
            </span>{" "}
            {stats.last.score >=
            (stats.last.cutoffPercent / 100) * stats.last.maxScore
              ? "— above cut-off"
              : "— below cut-off"}
          </p>
          <Button variant="outline" size="sm" asChild>
            <Link href="/result">Review</Link>
          </Button>
        </div>
      ) : null}

      {stats.attempted > 0 ? (
        <button
          type="button"
          className="text-xs text-muted-foreground underline-offset-2 hover:underline"
          onClick={() => {
            setState(resetProgress());
          }}
        >
          Reset local progress on this browser
        </button>
      ) : null}
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border bg-card px-4 py-3">
      <p className="text-xs tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-1 font-heading text-2xl">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
