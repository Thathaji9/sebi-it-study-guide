import Link from "next/link";
import { ArrowRight, Clock, Target, Trophy } from "lucide-react";

import { HomeProgress } from "@/components/home-progress";
import { Button } from "@/components/ui/button";
import { examMeta, mockFamilies, strategy } from "@/data/exam";
import { allQuestions } from "@/data/questions";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-2xl border bg-card">
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
              {examMeta.authority}
            </p>
            <h1 className="mt-2 font-heading text-3xl leading-tight sm:text-4xl">
              Prepare for Officer Grade A
              <span className="block text-primary">Information Technology</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              A working desk for the IT stream: official-weightage syllabus,
              high-yield notes, topic MCQs, six timed papers per stage pitched
              at SEBI Grade A or harder, and interview panels. Progress stays in
              this browser.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/mock/phase1-paper2-m1?new=1">
                  Sit Phase I Paper 2 · Mock 1
                  <ArrowRight />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/practice/programming">Drill programming (30%)</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/interview">Interview panels</Link>
              </Button>
            </div>
          </div>
          <ul className="grid gap-2 text-sm">
            <li className="flex items-start gap-2 rounded-lg bg-muted/70 px-3 py-2">
              <Target className="mt-0.5 size-4 text-primary" />
              Phase I Paper 2 cut-off 40% · aggregate 40%
            </li>
            <li className="flex items-start gap-2 rounded-lg bg-muted/70 px-3 py-2">
              <Clock className="mt-0.5 size-4 text-primary" />
              50 IT MCQs in 40 minutes · −¼ marking
            </li>
            <li className="flex items-start gap-2 rounded-lg bg-muted/70 px-3 py-2">
              <Trophy className="mt-0.5 size-4 text-primary" />
              Phase II Paper 2 is 2/3 of Phase II, 85% of final merit
            </li>
          </ul>
        </div>
      </section>

      <HomeProgress />

      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <h2 className="font-heading text-2xl">Timed papers</h2>
          <p className="text-xs text-muted-foreground">
            {allQuestions.length} questions in the bank
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {mockFamilies.map((f) => (
            <Link
              key={f.kind}
              href="/mock"
              className="rounded-xl border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <p className="font-heading text-lg">{f.familyTitle}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                6 distinct mocks · {f.questions} questions · {f.minutes} min
              </p>
              <p className="mt-3 text-sm font-medium text-primary">
                Choose a paper →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-2xl">How to use this desk</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {strategy.map((s) => (
            <div key={s.title} className="rounded-xl border bg-card p-4">
              <p className="font-medium">{s.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
