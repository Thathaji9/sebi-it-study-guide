import Link from "next/link";

import { Button } from "@/components/ui/button";
import { mockFamilies, mocks } from "@/data/exam";

export default function MockIndexPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-heading text-3xl">Timed mocks</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Six distinct papers per stage, written at SEBI Grade A IT difficulty
          or a notch harder (GATE-style traces, traps, and multi-step reasoning).
          Official-style weightages, a running clock, question palette,
          mark-for-review, and −¼ negative marking.
        </p>
      </header>

      {mockFamilies.map((family) => {
        const papers = mocks.filter((m) => m.kind === family.kind);
        return (
          <section key={family.kind} className="rounded-xl border bg-card p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-heading text-2xl">{family.familyTitle}</h2>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                  {family.familyBlurb}
                </p>
              </div>
              <ul className="text-sm text-muted-foreground">
                <li>
                  {family.questions} questions · {family.minutes} min
                </li>
                <li>
                  {family.marksEach} marks each · −{family.marksEach * 0.25} if
                  wrong
                </li>
                <li>Cut-off {family.cutoffPercent}%</li>
              </ul>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {papers.map((m) => (
                <article
                  key={m.id}
                  className="flex flex-col rounded-lg border bg-background p-4"
                >
                  <h3 className="font-heading text-lg">Mock {m.set}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Distinct paper · same pattern as the real exam
                  </p>
                  <Button className="mt-3" asChild>
                    <Link href={`/mock/${m.id}?new=1`}>Start Mock {m.set}</Link>
                  </Button>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <section className="rounded-xl border bg-card p-5">
        <h2 className="font-heading text-2xl">Phase III · Interview</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          15% of final merit. Three mock panels plus a browsable bank of
          technical, SEBI-market, HR, and situational prompts with talking
          points — not a timed MCQ paper.
        </p>
        <Button className="mt-4" asChild>
          <Link href="/interview">Open interview desk</Link>
        </Button>
      </section>

      <p className="text-sm text-muted-foreground">
        If a paper is already in progress in this tab, open it without{" "}
        <code className="rounded bg-muted px-1">?new=1</code> to resume.
      </p>
    </div>
  );
}
