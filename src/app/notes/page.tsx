import Link from "next/link";

import { notes, noteStats } from "@/data/notes";

export default function NotesIndexPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-3xl">Worked notes</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Every official syllabus topic is here. Database and SQL now read like
          class notes: a short “in simple words” picture, then five tiny
          examples walked one row at a time. Other topics use the same
          Question → what / why steps → answer pattern.
        </p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((n) => {
          const stats = noteStats(n);
          return (
            <Link
              key={n.topic}
              href={`/notes/${n.topic}`}
              className="rounded-xl border bg-card p-4 hover:border-primary/40"
            >
              <p className="font-heading text-lg">{n.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{n.blurb}</p>
              <p className="mt-3 text-xs font-medium text-primary">
                Worked examples with steps · {stats.sections} techniques ·{" "}
                {stats.examples} examples
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
