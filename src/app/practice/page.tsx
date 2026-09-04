import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { phase1Paper1Sections, phase1Paper2, phase2Paper2 } from "@/data/exam";
import { questionsByTopic } from "@/lib/quiz";
import type { TopicId } from "@/lib/types";

function TopicGrid({
  title,
  ids,
}: {
  title: string;
  ids: { id: TopicId; name: string; hint: string }[];
}) {
  return (
    <section>
      <h2 className="font-heading text-2xl">{title}</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ids.map((t) => {
          const n = questionsByTopic(t.id).length;
          return (
            <Link
              key={t.id}
              href={`/practice/${t.id}`}
              className="rounded-xl border bg-card p-4 hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{t.name}</p>
                <Badge variant="secondary">{n}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.hint}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function PracticeIndexPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-heading text-3xl">Topic practice</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Immediate feedback and explanations. Each topic bank aims at 200
          original mock MCQs plus memory-based PYQ reconstructions. Start with
          programming (30% of Phase I Paper 2), then SQL, networks, and
          security. Phase II topics train dry-runs.
        </p>
        <p className="mt-3 text-sm">
          <Link href="/revise" className="text-primary underline-offset-2 hover:underline">
            Open wrong-question revision →
          </Link>
        </p>
      </header>

      <TopicGrid
        title="Phase I Paper 2"
        ids={phase1Paper2.map((t) => ({
          id: t.id,
          name: t.name,
          hint: `${t.weightage}% weight · ${t.whyItMatters}`,
        }))}
      />
      <TopicGrid
        title="Phase II Paper 2"
        ids={phase2Paper2.map((t) => ({
          id: t.id,
          name: t.name,
          hint: `${t.weightage}% weight · ${t.whyItMatters}`,
        }))}
      />
      <TopicGrid
        title="Phase I Paper 1"
        ids={phase1Paper1Sections.map((t) => ({
          id: t.id,
          name: t.name,
          hint: t.topics,
        }))}
      />
    </div>
  );
}
