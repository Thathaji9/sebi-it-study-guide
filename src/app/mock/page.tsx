import Link from "next/link";

import { MockPaperCard } from "@/components/mock-paper-card";
import { ProgressSync } from "@/components/progress-sync";
import { Button } from "@/components/ui/button";
import { mockFamilies, mocks, pyqFamilies, pyqPapers } from "@/data/exam";

export default function MockIndexPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-heading text-3xl">Timed mocks &amp; PYQs</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Six distinct MCQ mocks for Papers that are multiple-choice, twelve
          timed descriptive papers for Phase II Paper 1, plus memory-based
          previous-year reconstructions and interview panels. IT MCQs are SEBI
          Grade A or a notch harder. Untimed essay, precis, and RC drills live
          under Practice.
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
                {family.mode === "descriptive" ? (
                  <>
                    <li>Essay + precis (typed) · 5 RC MCQs</li>
                    <li>
                      {family.minutes} min · RC {family.marksEach} marks each
                    </li>
                    <li>Cut-off 30% of 100 (writing is self-checked)</li>
                  </>
                ) : (
                  <>
                    <li>
                      {family.questions} questions · {family.minutes} min
                    </li>
                    <li>
                      {family.marksEach} marks each · −{family.marksEach * 0.25}{" "}
                      if wrong
                    </li>
                    <li>Cut-off {family.cutoffPercent}%</li>
                  </>
                )}
              </ul>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {papers.map((m) => (
                <MockPaperCard
                  key={m.id}
                  paperId={m.id}
                  title={`Mock ${m.set}`}
                  blurb="Distinct paper · same pattern as the real exam"
                  startLabel={`Start Mock ${m.set}`}
                />
              ))}
            </div>
          </section>
        );
      })}

      <header className="pt-2">
        <h2 className="font-heading text-3xl">Previous-year papers</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          SEBI does not release official question papers. These are{" "}
          <span className="text-foreground">memory-based reconstructions</span>{" "}
          in the topic mix reported after each cycle (normalization, OCC, SQL,
          Python slicing/file modes, OSI, DSA complexities, warehousing
          operations, shell, regex, CIA/ransomware, and Paper 1 GA/English/Quant/
          Reasoning). Original items — not copied coaching PDFs.
        </p>
      </header>

      {pyqFamilies.map((family) => {
        const papers = pyqPapers.filter((m) => m.kind === family.kind);
        return (
          <section key={`pyq-${family.kind}`} className="rounded-xl border bg-card p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                  PYQ
                </p>
                <h2 className="font-heading text-2xl">{family.familyTitle}</h2>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                  {papers.length} year-wise papers · {family.years.join(", ")}
                </p>
              </div>
              <ul className="text-sm text-muted-foreground">
                {family.mode === "descriptive" ? (
                  <>
                    <li>Essay + precis (typed) · 5 RC MCQs</li>
                    <li>
                      {family.minutes} min · themes from that year’s analysis
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      {family.questions} questions · {family.minutes} min
                    </li>
                    <li>
                      {family.marksEach} marks each · −{family.marksEach * 0.25}{" "}
                      if wrong
                    </li>
                    <li>Cut-off {family.cutoffPercent}%</li>
                  </>
                )}
              </ul>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {papers.map((m) => (
                <MockPaperCard
                  key={m.id}
                  paperId={m.id}
                  title={`PYQ ${m.year}`}
                  blurb={`Memory-based · ${m.questions} items`}
                  startLabel={`Start PYQ ${m.year}`}
                />
              ))}
            </div>
          </section>
        );
      })}

      <section className="rounded-xl border bg-card p-5">
        <h2 className="font-heading text-2xl">Phase III · Interview</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          15% of final merit. Ten mock panels plus a browsable bank of
          technical, SEBI-market, HR, and situational prompts with talking
          points — not a timed MCQ paper.
        </p>
        <Button className="mt-4" asChild>
          <Link href="/interview">Open interview desk</Link>
        </Button>
      </section>

      <ProgressSync />

      <p className="text-sm text-muted-foreground">
        Submitted papers stay on Review until you tap Try again. An unfinished
        paper continues from this browser after you close the tab.
      </p>
    </div>
  );
}
