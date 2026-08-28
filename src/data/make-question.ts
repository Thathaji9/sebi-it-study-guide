import type {
  CodeLang,
  Difficulty,
  Paper,
  Phase,
  Question,
  TopicId,
} from "@/lib/types";

export function makeQuestion(phase: Phase, paper: Paper) {
  return function q(
    id: string,
    topic: TopicId,
    difficulty: Difficulty,
    question: string,
    options: [string, string, string, string],
    answer: 0 | 1 | 2 | 3,
    explanation: string,
    extra?: { code?: string; language?: CodeLang },
  ): Question {
    return {
      id,
      topic,
      phase,
      paper,
      difficulty,
      question,
      options,
      answer,
      explanation,
      ...extra,
    };
  };
}
