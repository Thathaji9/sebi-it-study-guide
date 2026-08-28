import Link from "next/link";

import { Button } from "@/components/ui/button";
import { mocks } from "@/data/exam";

export default function MockIndexPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-3xl">Timed mocks</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Full-length IT Paper 2 uses official-style weightages, a 40-minute
          clock, a question palette, mark-for-review, and −¼ negative marking.
          Submit to see whether you cleared the cut-off.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {mocks.map((m) => (
          <article key={m.id} className="flex flex-col rounded-xl border bg-card p-5">
            <h2 className="font-heading text-xl">{m.title}</h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{m.blurb}</p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>{m.questions} questions</li>
              <li>{m.minutes} minutes</li>
              <li>{m.marksEach} marks each · −{m.marksEach * 0.25} if wrong</li>
              <li>Cut-off {m.cutoffPercent}%</li>
            </ul>
            <Button className="mt-4" asChild>
              <Link href={`/mock/${m.id}?new=1`}>Start new paper</Link>
            </Button>
          </article>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        If a paper is already in progress in this tab, open it without{" "}
        <code className="rounded bg-muted px-1">?new=1</code> to resume.
      </p>
    </div>
  );
}
