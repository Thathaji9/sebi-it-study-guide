import { notFound } from "next/navigation";

import { DescriptiveRunner } from "@/components/descriptive-player";
import { MockRunner } from "@/components/exam-player";
import { mocks } from "@/data/exam";

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
  const paper = mocks.find((m) => m.id === kind);
  if (!paper || !allowed.has(kind)) notFound();

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        Stay in this tab. The clock keeps running.
        {paper.mode === "descriptive"
          ? " Essay and precis are typed; only comprehension MCQs are auto-marked (unanswered 0, wrong −¼)."
          : " Unanswered questions score 0; a wrong answer costs one-fourth of the marks for that question."}
      </p>
      {paper.mode === "descriptive" ? (
        <DescriptiveRunner paperId={kind} fresh={query.new === "1"} />
      ) : (
        <MockRunner paperId={kind} fresh={query.new === "1"} />
      )}
    </div>
  );
}
