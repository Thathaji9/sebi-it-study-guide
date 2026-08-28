import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { phase1Paper1Sections, phase1Paper2, phase2Paper2 } from "@/data/exam";
import { questionsByTopic } from "@/lib/quiz";

export default function SyllabusPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-heading text-3xl">Official IT syllabus</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Weightages are taken from the Information Technology annexure to the
          SEBI Officer Grade A 2025 advertisement. They are indicative, but they
          are the right way to split study time.
        </p>
      </header>

      <section>
        <h2 className="font-heading text-2xl">Phase I · Paper 2 (IT)</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          100 marks · 40 minutes · 40% cut-off. Programming alone is 30%.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b bg-muted/50 text-xs tracking-wide uppercase">
              <tr>
                <th className="px-3 py-2 font-medium">Topic</th>
                <th className="px-3 py-2 font-medium">Wt</th>
                <th className="px-3 py-2 font-medium">Bank</th>
                <th className="px-3 py-2 font-medium">What to cover</th>
              </tr>
            </thead>
            <tbody>
              {phase1Paper2.map((t) => (
                <tr key={t.id} className="border-b last:border-0">
                  <td className="px-3 py-3">
                    <Link href={`/practice/${t.id}`} className="font-medium hover:underline">
                      {t.name}
                    </Link>
                  </td>
                  <td className="px-3 py-3 tabular-nums">{t.weightage}%</td>
                  <td className="px-3 py-3 tabular-nums">
                    {questionsByTopic(t.id).length}
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">{t.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-heading text-2xl">Phase II · Paper 2 (IT)</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          100 marks · 180 minutes · 40% cut-off · 2/3 of Phase II. The 2025
          paper is MCQ: logic-flow, debugging, syntax, dry-run outputs, data
          analysis — in C++ / Java / Python.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {phase2Paper2.map((t) => (
            <Link
              key={t.id}
              href={`/practice/${t.id}`}
              className="rounded-xl border bg-card p-4 hover:border-primary/40"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-heading text-lg">{t.name}</p>
                <Badge variant="secondary">{t.weightage}%</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.details}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-2xl">Phase I · Paper 1 (screening)</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          100 marks · 60 minutes · 30% cut-off. Marks do not count in the final
          merit. Financial-sector GA is the cheap lift.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {phase1Paper1Sections.map((s) => (
            <Link
              key={s.id}
              href={`/practice/${s.id}`}
              className="rounded-xl border bg-card p-4 hover:border-primary/40"
            >
              <p className="font-medium">{s.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                About {s.marks} marks
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.topics}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
