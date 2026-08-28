import { paper1Questions } from "@/data/questions-paper1";
import { phase1Questions } from "@/data/questions-phase1";
import { phase2Questions } from "@/data/questions-phase2";
import type { Question, TopicId } from "@/lib/types";

export const allQuestions: Question[] = [
  ...phase1Questions,
  ...phase2Questions,
  ...paper1Questions,
];

export function questionsByTopic(topic: TopicId): Question[] {
  return allQuestions.filter((q) => q.topic === topic);
}

export function questionById(id: string): Question | undefined {
  return allQuestions.find((q) => q.id === id);
}
