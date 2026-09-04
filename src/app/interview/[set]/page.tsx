import Link from "next/link";
import { notFound } from "next/navigation";

import { InterviewSession } from "@/components/interview-session";
import { Button } from "@/components/ui/button";
import { interviewSets, itemsForSet } from "@/data/interview";

export default async function InterviewPanelPage({
  params,
}: {
  params: Promise<{ set: string }>;
}) {
  const { set } = await params;
  const n = Number(set);
  if (!Number.isInteger(n) || n < 1) notFound();
  const meta = interviewSets.find((s) => s.id === n);
  const items = itemsForSet(n);
  if (!meta || items.length === 0) notFound();

  return (
    <div className="space-y-5">
      <header>
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          Phase III · Interview
        </p>
        <h1 className="mt-1 font-heading text-3xl">{meta.title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {meta.blurb}
        </p>
        <Button variant="outline" size="sm" className="mt-3" asChild>
          <Link href="/interview">All panels</Link>
        </Button>
      </header>
      <InterviewSession items={items} />
    </div>
  );
}
