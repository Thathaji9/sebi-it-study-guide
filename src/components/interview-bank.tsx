"use client";

import { useMemo, useState } from "react";

import { InterviewSession } from "@/components/interview-session";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  allInterviewItems,
  categoryLabel,
  itemsForCategory,
  type InterviewCategory,
} from "@/data/interview";

const categories: Array<InterviewCategory | "all"> = [
  "all",
  "technical",
  "sebi",
  "hr",
  "situational",
];

function label(cat: InterviewCategory | "all") {
  return cat === "all" ? "All prompts" : categoryLabel[cat];
}

export function InterviewBank({
  initialCategory = "all",
}: {
  initialCategory?: InterviewCategory | "all";
}) {
  const [cat, setCat] = useState<InterviewCategory | "all">(initialCategory);
  const items = useMemo(
    () => (cat === "all" ? allInterviewItems : itemsForCategory(cat)),
    [cat],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <Button
            key={c}
            size="sm"
            variant={cat === c ? "default" : "outline"}
            onClick={() => setCat(c)}
          >
            {label(c)}
            <Badge variant="secondary" className="ml-2">
              {c === "all"
                ? allInterviewItems.length
                : itemsForCategory(c).length}
            </Badge>
          </Button>
        ))}
      </div>
      <InterviewSession key={cat} items={items} />
    </div>
  );
}
