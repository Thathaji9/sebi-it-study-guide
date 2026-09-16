import { notFound } from "next/navigation";

import { DescriptiveRunner } from "@/components/descriptive-player";
import { MockRunner } from "@/components/exam-player";
import { sitPapers } from "@/data/exam";

export default async function MockPaperPage({
  params,
  searchParams,
}: {
  params: Promise<{ kind: string }>;
  searchParams: Promise<{ new?: string }>;
}) {
  const { kind } = await params;
  const query = await searchParams;
  const paper = sitPapers.find((m) => m.id === kind);
  if (!paper) notFound();

  return (
    <div className="space-y-4">
      {paper.mode === "descriptive" ? (
        <DescriptiveRunner paperId={kind} fresh={query.new === "1"} />
      ) : (
        <MockRunner paperId={kind} fresh={query.new === "1"} />
      )}
    </div>
  );
}
