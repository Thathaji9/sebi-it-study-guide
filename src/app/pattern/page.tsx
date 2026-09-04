import Link from "next/link";

import { pattern } from "@/data/exam";

export default function PatternPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-heading text-3xl">Exam pattern & cut-offs</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Selection is three stages. Phase I only shortlists. Final merit is
          Phase II (85%) + interview (15%). Always re-read the latest
          advertisement on sebi.gov.in — numbers below follow the 2025 cycle.
        </p>
      </header>

      {pattern.phases.map((phase) => (
        <section key={phase.name} className="rounded-xl border bg-card p-5">
          <h2 className="font-heading text-2xl">{phase.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{phase.note}</p>
          {phase.papers.length ? (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead className="border-b text-xs tracking-wide uppercase">
                  <tr>
                    <th className="py-2 pr-3 font-medium">Paper</th>
                    <th className="py-2 pr-3 font-medium">Marks</th>
                    <th className="py-2 pr-3 font-medium">Time</th>
                    <th className="py-2 pr-3 font-medium">Cut-off</th>
                    <th className="py-2 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {phase.papers.map((p) => (
                    <tr key={p.name} className="border-b last:border-0">
                      <td className="py-3 pr-3 font-medium">{p.name}</td>
                      <td className="py-3 pr-3">{p.marks}</td>
                      <td className="py-3 pr-3">{p.durationMin} min</td>
                      <td className="py-3 pr-3">{p.cutoff}%</td>
                      <td className="py-3 text-muted-foreground">{p.extra}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>
      ))}

      <section className="rounded-xl border bg-card p-5 text-sm leading-relaxed">
        <p>
          <span className="font-medium">Negative marking:</span>{" "}
          {pattern.negativeMarking}
        </p>
        <p className="mt-2">
          <span className="font-medium">Language:</span> {pattern.bilingual}
        </p>
        <p className="mt-2 text-muted-foreground">
          Phase II Paper 1 (descriptive English) is Essay 30 + Precis 30 +
          Comprehension 40. Drill essay, precis, and RC untimed under Practice,
          then sit a 60-minute paper on the Mocks desk — essay and precis are
          typed and keyed for self-check; RC is auto-marked. Memory-based PYQ
          themes (2024, 2026) sit in the same list as the twelve mocks.
        </p>
        <p className="mt-4 flex flex-wrap gap-4">
          <Link href="/practice/descriptive" className="text-primary underline-offset-2 hover:underline">
            Descriptive English drill →
          </Link>
          <Link href="/mock" className="text-primary underline-offset-2 hover:underline">
            Sit a timed mock or PYQ →
          </Link>
          <Link
            href="/interview"
            className="text-primary underline-offset-2 hover:underline"
          >
            Interview pattern & mock panels →
          </Link>
        </p>
      </section>
    </div>
  );
}
