"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  essayDrills,
  precisDrills,
  rcDrills,
  type EssayDrill,
  type PrecisDrill,
  type RcDrill,
} from "@/data/descriptive-practice";
import { recordAttempt } from "@/lib/progress";
import { cn, wordCount } from "@/lib/utils";

const letters = ["A", "B", "C", "D"] as const;

export function DescriptivePracticeDesk({
  defaultTab = "essay",
}: {
  defaultTab?: "essay" | "precis" | "rc";
}) {
  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList className="h-auto flex-wrap">
        <TabsTrigger value="essay">Essay ({essayDrills.length})</TabsTrigger>
        <TabsTrigger value="precis">Precis ({precisDrills.length})</TabsTrigger>
        <TabsTrigger value="rc">
          RC ({rcDrills.length} × 5)
        </TabsTrigger>
      </TabsList>
      <TabsContent value="essay" className="mt-4">
        <EssayDesk />
      </TabsContent>
      <TabsContent value="precis" className="mt-4">
        <PrecisDesk />
      </TabsContent>
      <TabsContent value="rc" className="mt-4">
        <RcDesk />
      </TabsContent>
    </Tabs>
  );
}

function Jump({
  label,
  index,
  total,
  onPrev,
  onNext,
  onJump,
}: {
  label: string;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onJump: (n: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <p className="text-sm text-muted-foreground">
        {label} {index + 1} of {total}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <select
          className="h-8 rounded-lg border bg-background px-2 text-sm"
          value={index}
          onChange={(e) => onJump(Number(e.target.value))}
          aria-label={`Jump to ${label}`}
        >
          {Array.from({ length: total }, (_, i) => (
            <option key={i} value={i}>
              {label} {i + 1}
            </option>
          ))}
        </select>
        <Button variant="outline" size="sm" disabled={index === 0} onClick={onPrev}>
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={index === total - 1}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function EssayDesk() {
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState("");
  const [open, setOpen] = useState(false);
  const item: EssayDrill = essayDrills[index];
  const words = wordCount(draft);

  const go = (n: number) => {
    setIndex(n);
    setDraft("");
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <Jump
        label="Prompt"
        index={index}
        total={essayDrills.length}
        onPrev={() => go(index - 1)}
        onNext={() => go(index + 1)}
        onJump={go}
      />
      <article className="rounded-xl border bg-card p-4 sm:p-6">
        <Badge variant="outline">~250 words · pick a thesis</Badge>
        <h2 className="mt-3 font-heading text-xl leading-snug">{item.prompt}</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Type a timed-style draft if you want. This desk cannot mark prose —
          reveal the scoring sketch after you have a structure, not before.
        </p>
        <textarea
          className="mt-4 min-h-56 w-full rounded-lg border bg-background px-3 py-2 text-sm leading-relaxed"
          placeholder="Type the essay here…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {words} words
          {words > 290 ? " — over the usual band; trim" : ""}
        </p>
        <div className="mt-4">
          <Button variant="outline" onClick={() => setOpen((v) => !v)}>
            {open ? "Hide scoring sketch" : "Reveal scoring sketch"}
          </Button>
        </div>
        {open ? (
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            {item.guide.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        ) : null}
      </article>
    </div>
  );
}

function PrecisDesk() {
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState("");
  const [open, setOpen] = useState(false);
  const item: PrecisDrill = precisDrills[index];
  const words = wordCount(draft);

  const go = (n: number) => {
    setIndex(n);
    setDraft("");
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <Jump
        label="Passage"
        index={index}
        total={precisDrills.length}
        onPrev={() => go(index - 1)}
        onNext={() => go(index + 1)}
        onJump={go}
      />
      <article className="rounded-xl border bg-card p-4 sm:p-6">
        <Badge variant="outline">Target ~{item.wordLimit} words</Badge>
        <p className="mt-3 text-sm text-muted-foreground">
          Keep the argument. Drop examples and flourishes. Do not add your own
          views.
        </p>
        <div className="mt-4 rounded-lg bg-muted/50 p-4 text-sm leading-relaxed">
          {item.passage}
        </div>
        <textarea
          className="mt-4 min-h-40 w-full rounded-lg border bg-background px-3 py-2 text-sm leading-relaxed"
          placeholder="Type the precis here…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {words} words (target ~{item.wordLimit})
        </p>
        <div className="mt-4">
          <Button variant="outline" onClick={() => setOpen((v) => !v)}>
            {open ? "Hide model precis" : "Reveal model precis"}
          </Button>
        </div>
        {open ? (
          <div className="mt-4 rounded-lg border bg-muted/40 p-4 text-sm leading-relaxed">
            {item.model}
          </div>
        ) : null}
      </article>
    </div>
  );
}

function RcDesk() {
  const [index, setIndex] = useState(0);
  const item: RcDrill = rcDrills[index];

  const go = (n: number) => {
    setIndex(n);
  };

  return (
    <div className="space-y-4">
      <Jump
        label="Passage"
        index={index}
        total={rcDrills.length}
        onPrev={() => go(index - 1)}
        onNext={() => go(index + 1)}
        onJump={go}
      />
      <RcPassage key={item.id} item={item} />
    </div>
  );
}

function RcPassage({ item }: { item: RcDrill }) {
  const [chosen, setChosen] = useState<Record<string, number | null>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const tallied = useMemo(() => {
    let correct = 0;
    let attempted = 0;
    for (const q of item.questions) {
      if (!revealed[q.id] || chosen[q.id] == null) continue;
      attempted += 1;
      if (chosen[q.id] === q.answer) correct += 1;
    }
    return { correct, attempted };
  }, [item.questions, chosen, revealed]);

  return (
    <section className="space-y-4">
      <article className="rounded-xl border bg-card p-4 sm:p-6">
        <h2 className="font-heading text-xl">{item.title}</h2>
        <p className="mt-3 text-sm leading-relaxed">{item.passage}</p>
      </article>
      {item.questions.map((q, qi) => {
        const picked = chosen[q.id] ?? null;
        const open = Boolean(revealed[q.id]);
        return (
          <article key={q.id} className="rounded-xl border bg-card p-4">
            <p className="text-sm font-medium">
              Q.{qi + 1} · {q.question}
            </p>
            <div className="mt-3 grid gap-2">
              {q.options.map((opt, i) => {
                const isChosen = picked === i;
                const isAnswer = open && i === q.answer;
                const isWrong = open && isChosen && i !== q.answer;
                return (
                  <button
                    key={`${q.id}-${i}`}
                    type="button"
                    disabled={open}
                    onClick={() => {
                      if (open) return;
                      setChosen((prev) => ({ ...prev, [q.id]: i }));
                      setRevealed((prev) => ({ ...prev, [q.id]: true }));
                      recordAttempt(q.id, i === q.answer);
                    }}
                    className={cn(
                      "flex items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm",
                      !open && "hover:border-primary/50 hover:bg-accent",
                      isAnswer &&
                        "border-emerald-700/40 bg-ok-muted text-ok-muted-foreground",
                      isWrong && "border-destructive/40 bg-destructive/10",
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
            {open ? (
              <p className="mt-3 text-sm text-muted-foreground">{q.explanation}</p>
            ) : null}
          </article>
        );
      })}
      <p className="text-sm text-muted-foreground">
        This passage: {tallied.attempted
          ? `${tallied.correct}/${tallied.attempted} correct`
          : "pick an option to lock it"}
        . These RC items stay on this desk — they are not mixed into Phase I
        English topic practice.
      </p>
    </section>
  );
}
