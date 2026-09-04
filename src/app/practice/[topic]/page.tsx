import { notFound } from "next/navigation";
import Link from "next/link";

import { PracticeSession } from "@/components/practice-session";
import { Button } from "@/components/ui/button";
import { topicById } from "@/data/exam";
import { noteFor } from "@/data/notes";
import { questionsByTopic } from "@/lib/quiz";
import type { TopicId } from "@/lib/types";

function shuffle<T>(items: T[], seed: number): T[] {
  const a = [...items];
  let t = seed;
  for (let i = a.length - 1; i > 0; i--) {
    t = (t + 0x6d2b79f5) >>> 0;
    const j = t % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default async function PracticeTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const meta = topicById[topic as TopicId];
  if (!meta) notFound();
  const questions = shuffle(
    questionsByTopic(topic as TopicId),
    Date.now() % 1_000_003,
  );
  const note = noteFor(topic as TopicId);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            Phase {meta.phase} · Paper {meta.paper}
          </p>
          <h1 className="font-heading text-3xl">{meta.name}</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            {meta.details}
          </p>
        </div>
        {note ? (
          <Button variant="outline" asChild>
            <Link href={`/notes/${topic}`}>Revision notes</Link>
          </Button>
        ) : null}
      </header>
      <PracticeSession questions={questions} />
    </div>
  );
}
