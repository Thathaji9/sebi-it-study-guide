import { essayDrills, type EssayDrill } from "@/data/descriptive-essays";
import { precisDrills, type PrecisDrill } from "@/data/descriptive-precis";
import { rcDrills, type RcDrill } from "@/data/descriptive-rc";
import type { Question } from "@/lib/types";

export type { EssayDrill, PrecisDrill, RcDrill };
export { essayDrills, precisDrills, rcDrills };

/** Practice-only RC MCQs. Not folded into Phase I English topic practice. */
export const descriptivePracticeRcQuestions: Question[] = rcDrills.flatMap(
  (item) => item.questions,
);
