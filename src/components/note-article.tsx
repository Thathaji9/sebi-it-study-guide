import Link from "next/link";

import { CodeBlock } from "@/components/practice-session";
import { Button } from "@/components/ui/button";
import type { TopicNote } from "@/data/notes";
import { noteStats, stepDo, stepWhy } from "@/data/notes";

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
          {stats.sections} techniques · {stats.examples} worked examples with
          numbered steps
        </p>
        <p className="mt-3 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm">
          Every technique on this page has a <span className="font-medium">How to solve</span> recipe
          and exam examples. Each example is <span className="font-medium">Question → numbered
          steps (what / why) → Final answer</span>.
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
          <p className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">
            In simple words
          </p>
          <div className="mt-1.5">
            <Paragraphs text={b.body} />
          </div>
          {b.howTo?.length ? (
            <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-xs tracking-wide text-primary uppercase">
                How to solve — do this every time
              </p>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">
                {b.howTo.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </div>
          ) : null}
          {b.bullets?.length ? (
            <div className="mt-3">
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Remember
              </p>
              <ul className="mt-1.5 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
                {b.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {b.examples?.map((ex, ei) => (
            <div
              key={`${b.heading}-${ex.title}`}
              className="mt-5 rounded-lg border bg-background p-4"
            >
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Example {ei + 1} of {b.examples?.length ?? 0}
              </p>
              <h3 className="mt-1 font-heading text-lg">{ex.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">
                <span className="font-medium">Question. </span>
                {ex.prompt}
              </p>
              {ex.code ? (
                <div className="mt-3">
                  <CodeBlock code={ex.code} language={ex.language} />
                </div>
              ) : null}
              <p className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">
                Steps
              </p>
              <ol className="mt-2 space-y-3">
                {ex.steps.map((step, si) => {
                  const why = stepWhy(step);
                  return (
                    <li key={si} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md bg-muted font-mono text-xs">
                        {si + 1}
                      </span>
                      <div className="min-w-0">
                        <p>{stepDo(step)}</p>
                        {why ? (
                          <p className="mt-1 text-muted-foreground">
                            <span className="font-medium text-foreground/80">
                              Why.{" "}
                            </span>
                            {why}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ol>
              <p className="mt-3 rounded-md bg-muted px-3 py-2 text-sm">
                <span className="font-medium">Final answer. </span>
                {ex.result}
              </p>
            </div>
          ))}
        </section>
      ))}
    </article>
  );
}
