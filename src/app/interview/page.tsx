import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  allInterviewItems,
  interviewPattern,
  interviewPlaybook,
  interviewSets,
} from "@/data/interview";

export default function InterviewIndexPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-heading text-3xl">Phase III · Interview</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {interviewPattern.weight} {interviewPattern.language}{" "}
          {interviewPattern.duration}
        </p>
      </header>

      <section className="rounded-xl border bg-card p-5 text-sm leading-relaxed">
        <h2 className="font-heading text-xl">How the panel usually runs</h2>
        <p className="mt-2 text-muted-foreground">{interviewPattern.panel}</p>
        <p className="mt-2 text-muted-foreground">
          {interviewPattern.howItFeels}
        </p>
        <p className="mt-2 text-muted-foreground">
          {interviewPattern.scoringNote}
        </p>
      </section>

      <section>
        <h2 className="font-heading text-2xl">Playbook</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {interviewPlaybook.map((p) => (
            <article key={p.title} className="rounded-xl border bg-card p-4">
              <p className="font-medium">{p.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-card p-5">
        <h2 className="font-heading text-2xl">Talking-point bank</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {allInterviewItems.length} prompts you can filter by technical,
          SEBI/markets, HR, or situational — not a timed MCQ paper.
        </p>
        <Button className="mt-4" asChild>
          <Link href="/interview/bank">Browse all talking points</Link>
        </Button>
      </section>

      <section>
        <h2 className="font-heading text-2xl">
          {interviewSets.length} mock panels
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Twelve prompts each. Speak the answer, then open the talking points.
          Difficulty is meant to sit at or above a typical SEBI Grade A IT viva.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {interviewSets.map((s) => (
            <article
              key={s.id}
              className="flex flex-col rounded-xl border bg-card p-5"
            >
              <h3 className="font-heading text-lg">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {s.blurb}
              </p>
              <Button className="mt-4" asChild>
                <Link href={`/interview/${s.id}`}>Start panel {s.id}</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
