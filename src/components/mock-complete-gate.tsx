"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { MockResult } from "@/lib/types";

export function MockCompleteGate({
  result,
  paperId,
}: {
  result: MockResult;
  paperId: string;
}) {
  const pct = result.maxScore
    ? Math.round((result.score / result.maxScore) * 1000) / 10
    : 0;
  const needed = (result.cutoffPercent / 100) * result.maxScore;
  const cleared = result.score + 1e-9 >= needed;
  const isWriting = Boolean(result.writing);

  return (
    <div className="mx-auto max-w-lg rounded-xl border bg-card p-6 text-center">
      <p className="text-sm text-muted-foreground">Already sat this paper</p>
      <p className="mt-1 font-heading text-xl">{result.title}</p>
      <p className="mt-3 font-heading text-4xl tabular-nums">
        {result.score}
        <span className="text-xl text-muted-foreground">/{result.maxScore}</span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        {isWriting
          ? `Comprehension ${pct}% of ${result.maxScore} (writing is self-checked)`
          : `${pct}% · cut-off ${result.cutoffPercent}%`}
      </p>
      {!isWriting ? (
        <Badge className="mt-3" variant={cleared ? "default" : "destructive"}>
          {cleared ? "Above cut-off" : "Below cut-off"}
        </Badge>
      ) : null}
      <p className="mt-4 text-sm text-muted-foreground">
        Opening it again does not restart the clock. Review your answers, or
        sit a fresh attempt with Try again.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <Button variant="outline" asChild>
          <Link href={`/result?paper=${encodeURIComponent(paperId)}`}>
            Review
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/mock/${paperId}?new=1`}>Try again</Link>
        </Button>
      </div>
    </div>
  );
}
