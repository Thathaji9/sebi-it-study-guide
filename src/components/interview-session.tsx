"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  categoryLabel,
  type InterviewItem,
} from "@/data/interview";

export function InterviewSession({ items }: { items: InterviewItem[] }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const item = items[index];
  if (!item) return null;

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        Q.{index + 1} of {items.length} · say the answer out loud before you
        reveal talking points
      </p>
      <article className="rounded-xl border bg-card p-5 sm:p-6">
        <Badge variant="outline">{categoryLabel[item.category]}</Badge>
        <h2 className="mt-3 font-heading text-xl leading-snug sm:text-2xl">
          {item.question}
        </h2>
        {open ? (
          <div className="mt-5 space-y-3">
            <p className="text-xs tracking-wide text-muted-foreground uppercase">
              Talking points
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
              {item.talkingPoints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            {item.followUp ? (
              <p className="rounded-lg bg-muted/70 px-3 py-2 text-sm">
                <span className="font-medium">Likely follow-up: </span>
                {item.followUp}
              </p>
            ) : null}
          </div>
        ) : (
          <p className="mt-5 text-sm text-muted-foreground">
            Structure: claim → mechanism → tiny example → what you would check
            if unsure. Then reveal.
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setOpen((v) => !v)}>
            {open ? "Hide points" : "Reveal talking points"}
          </Button>
          <Button
            variant="outline"
            disabled={index === 0}
            onClick={() => {
              setIndex((i) => i - 1);
              setOpen(false);
            }}
          >
            Previous
          </Button>
          <Button
            disabled={index === items.length - 1}
            onClick={() => {
              setIndex((i) => i + 1);
              setOpen(false);
            }}
          >
            Next prompt
          </Button>
        </div>
      </article>
    </div>
  );
}
