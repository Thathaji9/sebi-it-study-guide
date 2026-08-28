import { notFound } from "next/navigation";

import { MockRunner } from "@/components/exam-player";
import { mocks } from "@/data/exam";
import type { ExamKind } from "@/lib/types";

const allowed = new Set(mocks.map((m) => m.id));

export default async function MockPaperPage({
  params,
  searchParams,
}: {
  params: Promise<{ kind: string }>;
  searchParams: Promise<{ new?: string }>;
}) {
  const { kind } = await params;
  const query = await searchParams;
  if (!allowed.has(kind)) notFound();

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        Stay in this tab. The clock keeps running. Unanswered questions score 0;
        a wrong answer costs one-fourth of the marks for that question.
      </p>
      <MockRunner kind={kind as ExamKind} fresh={query.new === "1"} />
    </div>
  );
}
