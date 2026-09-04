import Link from "next/link";

import { InterviewBank } from "@/components/interview-bank";
import { Button } from "@/components/ui/button";
import {
  allInterviewItems,
  type InterviewCategory,
} from "@/data/interview";

const allowed = new Set(["technical", "sebi", "hr", "situational"]);

export default async function InterviewBankPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const initial =
    category && allowed.has(category)
      ? (category as InterviewCategory)
      : "all";

  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          Phase III · Interview
        </p>
        <h1 className="mt-1 font-heading text-3xl">Talking-point bank</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {allInterviewItems.length} prompts across technical, SEBI/markets, HR,
          and situational files. Speak the answer, then open the talking
          points. Filter by category, or sit a 12-prompt mock panel instead.
        </p>
        <Button variant="outline" size="sm" className="mt-3" asChild>
          <Link href="/interview">All panels</Link>
        </Button>
      </header>
      <InterviewBank initialCategory={initial} />
    </div>
  );
}
