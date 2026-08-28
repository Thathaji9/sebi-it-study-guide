import { notFound } from "next/navigation";

import { NoteArticle } from "@/components/note-article";
import { noteFor } from "@/data/notes";
import type { TopicId } from "@/lib/types";

export default async function NotePage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const note = noteFor(topic as TopicId);
  if (!note) notFound();

  return <NoteArticle note={note} topic={topic} />;
}
