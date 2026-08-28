import { notFound } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { noteFor } from "@/data/notes";
import type { TopicId } from "@/lib/types";

export default async function NotePage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const note = noteFor(topic as TopicId);
  if (!note) notFound();

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="font-heading text-3xl">{note.title}</h1>
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
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {b.body}
          </p>
          {b.bullets ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              {b.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </article>
  );
}
