import Link from "next/link";

import { DescriptivePracticeDesk } from "@/components/descriptive-practice-desk";
import { Button } from "@/components/ui/button";
import {
  essayDrills,
  precisDrills,
  rcDrills,
} from "@/data/descriptive-practice";

export default function DescriptivePracticePage() {
  const rcCount = rcDrills.reduce((n, p) => n + p.questions.length, 0);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          Phase II · Paper 1
        </p>
        <h1 className="font-heading text-3xl">Descriptive English drill</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Untimed essay, precis, and comprehension practice for the official
          60-minute paper (Essay 30 + Precis 30 + RC 40, 30% cut-off). Prose is
          self-checked against a scoring sketch or model precis; RC is
          auto-marked. This is not a 200-MCQ topic bank — sit a timed paper on
          Mocks when you want the clock.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {essayDrills.length} essay prompts · {precisDrills.length} precis
          passages · {rcDrills.length} RC passages ({rcCount} MCQs)
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href="/mock">Timed Paper 1 mocks &amp; PYQs</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/practice">MCQ topic practice</Link>
          </Button>
        </div>
      </header>
      <DescriptivePracticeDesk />
    </div>
  );
}
