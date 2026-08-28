import { descriptiveRcQuestions } from "@/data/descriptive";
import { paper1Hard } from "@/data/questions-paper1-hard";
import { paper1Questions } from "@/data/questions-paper1";
import { phase1HardDbSql, phase1HardRest } from "@/data/questions-phase1-hard";
import { phase1HardProg } from "@/data/questions-phase1-prog-hard";
import { phase1Questions } from "@/data/questions-phase1";
import { phase2Hard } from "@/data/questions-phase2-hard";
import { phase2Questions } from "@/data/questions-phase2";
import type { Question, TopicId } from "@/lib/types";

export const allQuestions: Question[] = [
  ...phase1Questions,
  ...phase1HardDbSql,
  ...phase1HardRest,
  ...phase1HardProg,
  ...phase2Questions,
  ...phase2Hard,
  ...paper1Questions,
  ...paper1Hard,
  ...descriptiveRcQuestions,
];

export function questionsByTopic(topic: TopicId): Question[] {
  return allQuestions.filter((q) => q.topic === topic);
}

export function questionById(id: string): Question | undefined {
  return allQuestions.find((q) => q.id === id);
}
