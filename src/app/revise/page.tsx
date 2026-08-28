"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { PracticeSession } from "@/components/practice-session";
import { Button } from "@/components/ui/button";
import { questionById } from "@/data/questions";
import { loadProgress, wrongQuestionIds } from "@/lib/progress";
import type { Question } from "@/lib/types";

export default function RevisePage() {
  const [wrong, setWrong] = useState<Question[] | null>(null);
  const [bookmarked, setBookmarked] = useState<Question[]>([]);

  useEffect(() => {
    const state = loadProgress();
    queueMicrotask(() => {
      setWrong(
        wrongQuestionIds(state)
          .map((id) => questionById(id))
          .filter((q): q is Question => Boolean(q)),
      );
      setBookmarked(
        state.bookmarks
          .map((id) => questionById(id))
          .filter((q): q is Question => Boolean(q)),
      );
    });
  }, []);

  if (wrong === null) {
    return <p className="text-sm text-muted-foreground">Loading revision set…</p>;
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-3xl">Wrong-question revision</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Every miss from practice and mocks lands here. Bookmark from a drill
          if you want to force a question back into rotation.
        </p>
      </header>

      {wrong.length === 0 ? (
        <div className="rounded-xl border bg-card p-6 text-center">
          <p className="font-heading text-xl">No misses stored yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Sit a topic drill or a mock. Incorrect answers will collect here.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/practice">Go to practice</Link>
          </Button>
        </div>
      ) : (
        <PracticeSession questions={wrong} />
      )}

      {bookmarked.length > 0 ? (
        <p className="text-sm text-muted-foreground">
          {bookmarked.length} bookmarked question
          {bookmarked.length === 1 ? "" : "s"} are saved on this browser. They
          stay in the question bank even after you answer them correctly.
        </p>
      ) : null}
    </div>
  );
}
