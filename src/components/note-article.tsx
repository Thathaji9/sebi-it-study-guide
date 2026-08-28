import Link from "next/link";

import { CodeBlock } from "@/components/practice-session";
import { Button } from "@/components/ui/button";
import type { TopicNote } from "@/data/notes";
import { noteStats } from "@/data/notes";

function Paragraphs({ text }: { text: string }) {
  const parts = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  return (
    <div className="space-y-3">
      {parts.map((p, i) => (
        <p key={i} className="text-sm leading-relaxed text-muted-foreground">
          {p}
        </p>
      ))}
    </div>
  );
}

export function NoteArticle({
  note,
  topic,
}: {
  note: TopicNote;
  topic: string;
}) {
  const stats = noteStats(note);
  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="font-heading text-3xl">{note.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {note.blurb}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {stats.sections} sections · {stats.examples} worked examples
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button asChild>
            <Link href={`/practice/${topic}`}>Practise this topic</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/notes">All notes</Link>
          </Button>
        </div>
      </header>
      {note.blocks.map((b) => (
        <section key={b.heading} className="rounded-xl border bg-card p-5">
          <h2 className="font-heading text-xl">{b.heading}</h2>
          <div className="mt-3">
            <Paragraphs text={b.body} />
          </div>
          {b.bullets?.length ? (
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
              {b.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {b.examples?.map((ex, ei) => (
            <div
              key={`${b.heading}-${ex.title}`}
              className="mt-5 rounded-lg border bg-background p-4"
            >
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Example {ei + 1}
              </p>
              <h3 className="mt-1 font-heading text-lg">{ex.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{ex.prompt}</p>
              {ex.code ? (
                <div className="mt-3">
                  <CodeBlock code={ex.code} language={ex.language} />
                </div>
              ) : null}
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
                {ex.steps.map((step, si) => (
                  <li key={si}>{step}</li>
                ))}
              </ol>
              <p className="mt-3 rounded-md bg-muted px-3 py-2 text-sm">
                <span className="font-medium">Answer. </span>
                {ex.result}
              </p>
            </div>
          ))}
        </section>
      ))}
    </article>
  );
}
