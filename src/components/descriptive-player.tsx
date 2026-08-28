"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { descriptiveBySet } from "@/data/descriptive";
import { recordMock } from "@/lib/progress";
import { mockConfig, scoreAttempt } from "@/lib/quiz";
import { cn } from "@/lib/utils";

const letters = ["A", "B", "C", "D"] as const;

type LiveWriting = {
  paperId: string;
  set: number;
  title: string;
  remaining: number;
  startedAt: number;
  tab: "essay" | "precis" | "rc";
  chosenEssay: number | null;
  essay: string;
  precis: string;
  answers: Record<string, number | null>;
};

function persistKey(id: string) {
  return `grade-a-it-desk-live-${id}`;
}

function formatTime(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function wordCount(text: string) {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
}

export function DescriptiveRunner({
  paperId,
  fresh,
}: {
  paperId: string;
  fresh?: boolean;
}) {
  const config = mockConfig(paperId);
  const paper = config ? descriptiveBySet(config.set) : undefined;
  const [live, setLive] = useState<LiveWriting | null>(null);

  useEffect(() => {
    if (!config || !paper) return;
    const key = persistKey(paperId);
    if (fresh) sessionStorage.removeItem(key);
    const raw = !fresh ? sessionStorage.getItem(key) : null;
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as LiveWriting;
        if (parsed.set === paper.set) {
          queueMicrotask(() => setLive(parsed));
          return;
        }
      } catch {
        /* fall through */
      }
    }
    queueMicrotask(() =>
      setLive({
        paperId,
        set: paper.set,
        title: config.title,
        remaining: config.minutes * 60,
        startedAt: Date.now(),
        tab: "essay",
        chosenEssay: null,
        essay: "",
        precis: "",
        answers: {},
      }),
    );
  }, [paperId, fresh, config, paper]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paperId, live?.startedAt]);

  const patch = (partial: Partial<LiveWriting>) => {
    setLive((prev) => {
      if (!prev) return prev;
      const next: LiveWriting = {
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

  if (!config || !paper) {
    return <p className="text-muted-foreground">Unknown descriptive paper.</p>;
  }
  if (!live) {
    return (
      <p className="text-sm text-muted-foreground">Loading the paper…</p>
    );
  }

  return (
    <DescriptivePlayer
      live={live}
      paper={paper}
      marksEach={config.marksEach}
      cutoffPercent={config.cutoffPercent}
      onChange={patch}
    />
  );
}

function DescriptivePlayer({
  live,
  paper,
  marksEach,
  cutoffPercent,
  onChange,
}: {
  live: LiveWriting;
  paper: NonNullable<ReturnType<typeof descriptiveBySet>>;
  marksEach: number;
  cutoffPercent: number;
  onChange: (partial: Partial<LiveWriting>) => void;
}) {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const submitted = useRef(false);
  const essayWords = wordCount(live.essay);
  const precisWords = wordCount(live.precis);
  const rcUnanswered = paper.rc.filter((q) => live.answers[q.id] == null).length;

  const submit = useCallback(() => {
    if (submitted.current) return;
    submitted.current = true;
    const filled: Record<string, number | null> = {};
    for (const item of paper.rc) filled[item.id] = live.answers[item.id] ?? null;
    const tallied = scoreAttempt(paper.rc, filled, marksEach);
    const result = {
      id: `${live.paperId}-${live.startedAt}`,
      kind: "phase2-paper1" as const,
      title: live.title,
      startedAt: live.startedAt,
      finishedAt: Date.now(),
      score: Math.round(tallied.score * 100) / 100,
      maxScore: tallied.maxScore,
      correct: tallied.correct,
      wrong: tallied.wrong,
      skipped: tallied.skipped,
      cutoffPercent,
      attempts: paper.rc.map((item) => ({
        questionId: item.id,
        chosen: filled[item.id],
        correct: filled[item.id] === item.answer,
        at: Date.now(),
      })),
      writing: {
        set: paper.set,
        chosenEssay: live.chosenEssay ?? 0,
        essay: live.essay,
        precis: live.precis,
      },
    };
    recordMock(result);
    sessionStorage.setItem("grade-a-it-desk-last-result", JSON.stringify(result));
    sessionStorage.removeItem(persistKey(live.paperId));
    router.push("/result");
  }, [paper, live, marksEach, cutoffPercent, router]);

  useEffect(() => {
    if (live.remaining === 0 && !submitted.current) submit();
  }, [live.remaining, submit]);

  const warning = useMemo(() => {
    const bits = [];
    if (live.chosenEssay == null) bits.push("no essay topic chosen");
    if (essayWords === 0) bits.push("essay empty");
    if (precisWords === 0) bits.push("precis empty");
    if (rcUnanswered) bits.push(`${rcUnanswered} RC unanswered`);
    return bits;
  }, [live.chosenEssay, essayWords, precisWords, rcUnanswered]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-card px-4 py-3">
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            {live.title}
          </p>
          <p className="text-sm text-muted-foreground">
            Essay {paper.essayMarks} · Precis {paper.precisMarks} · RC{" "}
            {paper.rcMarks} · official cut-off 30/100
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

      <Tabs
        value={live.tab}
        onValueChange={(v) =>
          onChange({ tab: v as LiveWriting["tab"] })
        }
      >
        <TabsList>
          <TabsTrigger value="essay">Essay (30)</TabsTrigger>
          <TabsTrigger value="precis">Precis (30)</TabsTrigger>
          <TabsTrigger value="rc">Comprehension (40)</TabsTrigger>
        </TabsList>

        <TabsContent value="essay" className="mt-4">
          <section className="rounded-xl border bg-card p-4 sm:p-6">
            <p className="text-sm text-muted-foreground">
              Attempt any one. About {paper.essayWordLimit} words. This desk
              cannot mark prose — the key after submit is a scoring sketch, not
              a model essay to memorise.
            </p>
            <ul className="mt-4 space-y-3">
              {paper.essayPrompts.map((prompt, i) => (
                <li key={prompt}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                    <input
                      type="radio"
                      name="essay-topic"
                      className="mt-1"
                      checked={live.chosenEssay === i}
                      onChange={() => onChange({ chosenEssay: i })}
                    />
                    <span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {i + 1}.
                      </span>{" "}
                      {prompt}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            <textarea
              className="mt-4 min-h-64 w-full rounded-lg border bg-background px-3 py-2 text-sm leading-relaxed"
              placeholder="Type the essay here…"
              value={live.essay}
              onChange={(e) => onChange({ essay: e.target.value })}
            />
            <p className="mt-2 text-xs text-muted-foreground">
              {essayWords} words
              {essayWords > paper.essayWordLimit + 40
                ? " — over the usual band; trim"
                : ""}
            </p>
          </section>
        </TabsContent>

        <TabsContent value="precis" className="mt-4">
          <section className="rounded-xl border bg-card p-4 sm:p-6">
            <p className="text-sm text-muted-foreground">
              Reduce to about {paper.precisWordLimit} words. Keep the argument;
              drop examples and flourishes. Do not add your own views.
            </p>
            <article className="mt-4 rounded-lg bg-muted/50 p-4 text-sm leading-relaxed">
              {paper.precisPassage}
            </article>
            <textarea
              className="mt-4 min-h-48 w-full rounded-lg border bg-background px-3 py-2 text-sm leading-relaxed"
              placeholder="Type the precis here…"
              value={live.precis}
              onChange={(e) => onChange({ precis: e.target.value })}
            />
            <p className="mt-2 text-xs text-muted-foreground">
              {precisWords} words (target ~{paper.precisWordLimit})
            </p>
          </section>
        </TabsContent>

        <TabsContent value="rc" className="mt-4">
          <section className="space-y-4">
            <article className="rounded-xl border bg-card p-4 sm:p-6 text-sm leading-relaxed">
              {paper.rcPassage}
            </article>
            {paper.rc.map((q, qi) => (
              <article key={q.id} className="rounded-xl border bg-card p-4">
                <p className="text-sm font-medium">
                  Q.{qi + 1} · {q.question}
                </p>
                <div className="mt-3 grid gap-2">
                  {q.options.map((opt, i) => {
                    const selected = live.answers[q.id] === i;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() =>
                          onChange({
                            answers: { ...live.answers, [q.id]: i },
                          })
                        }
                        className={cn(
                          "flex items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm hover:border-primary/50",
                          selected &&
                            "border-primary bg-primary/10 ring-1 ring-primary/30",
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
              </article>
            ))}
            <p className="text-xs text-muted-foreground">
              RC is auto-marked at {marksEach} marks each, −{marksEach * 0.25}{" "}
              if wrong. Essay and precis are compared with the key after submit.
            </p>
          </section>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={() => setConfirm(true)}>Submit paper</Button>
      </div>

      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit this descriptive paper?</DialogTitle>
            <DialogDescription>
              {warning.length
                ? `Still incomplete: ${warning.join("; ")}.`
                : "Essay, precis, and RC all have content. Submit to mark RC and see writing keys."}{" "}
              Unanswered RC scores 0; a wrong RC costs one-fourth of its marks.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirm(false)}>
              Keep writing
            </Button>
            <Button onClick={submit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
