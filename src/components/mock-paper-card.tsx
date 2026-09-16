"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  latestResultForPaper,
  liveExamKey,
} from "@/lib/progress";
import type { MockResult } from "@/lib/types";

export function MockPaperCard({
  paperId,
  title,
  blurb,
  startLabel,
}: {
  paperId: string;
  title: string;
  blurb: string;
  startLabel: string;
}) {
  const [status, setStatus] = useState<"loading" | "fresh" | "live" | "done">(
    "loading",
  );
  const [result, setResult] = useState<MockResult | null>(null);

  useEffect(() => {
    const live =
      typeof window !== "undefined" &&
      Boolean(
        localStorage.getItem(liveExamKey(paperId)) ??
          sessionStorage.getItem(liveExamKey(paperId)),
      );
    const latest = latestResultForPaper(paperId);
    queueMicrotask(() => {
      if (live) {
        setStatus("live");
        setResult(latest ?? null);
        return;
      }
      if (latest) {
        setStatus("done");
        setResult(latest);
        return;
      }
      setStatus("fresh");
    });
  }, [paperId]);

  return (
    <article className="flex flex-col rounded-lg border bg-background p-4">
      <h3 className="font-heading text-lg">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{blurb}</p>
      {status === "done" && result ? (
        <p className="mt-2 text-sm">
          Last score{" "}
          <span className="font-medium">
            {result.score}/{result.maxScore}
          </span>
        </p>
      ) : null}
      {status === "live" ? (
        <p className="mt-2 text-sm text-muted-foreground">In progress on this device</p>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {status === "loading" ? (
          <p className="text-xs text-muted-foreground">Checking this paper…</p>
        ) : null}
        {status === "fresh" ? (
          <Button asChild>
            <Link href={`/mock/${paperId}`}>{startLabel}</Link>
          </Button>
        ) : null}
        {status === "live" ? (
          <>
            <Button asChild>
              <Link href={`/mock/${paperId}`}>Continue</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/mock/${paperId}?new=1`}>Try again</Link>
            </Button>
          </>
        ) : null}
        {status === "done" ? (
          <>
            <Button variant="outline" asChild>
              <Link href={`/result?paper=${encodeURIComponent(paperId)}`}>
                Review
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/mock/${paperId}?new=1`}>Try again</Link>
            </Button>
          </>
        ) : null}
      </div>
    </article>
  );
}
