import Link from "next/link";

import { notes } from "@/data/notes";

export default function NotesIndexPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-3xl">High-yield notes</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Recite these the night before. They are framed around traps that show
          up as MCQs, not as a textbook.
        </p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((n) => (
          <Link
            key={n.topic}
            href={`/notes/${n.topic}`}
            className="rounded-xl border bg-card p-4 hover:border-primary/40"
          >
            <p className="font-heading text-lg">{n.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {n.blocks.length} sections
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
