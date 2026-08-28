import type { CodeLang, TopicId } from "@/lib/types";

import { notesAlgorithms } from "@/data/notes-algorithms";
import { notesDatabase } from "@/data/notes-database";
import { notesDs } from "@/data/notes-ds";
import { notesEnglish } from "@/data/notes-english";
import { notesGa } from "@/data/notes-ga";
import { notesNetworking } from "@/data/notes-networking";
import { notesOops } from "@/data/notes-oops";
import { notesProgramming } from "@/data/notes-programming";
import { notesPython } from "@/data/notes-python";
import { notesQuant } from "@/data/notes-quant";
import { notesReasoning } from "@/data/notes-reasoning";
import { notesSecurity } from "@/data/notes-security";
import { notesShell } from "@/data/notes-shell";
import { notesSql } from "@/data/notes-sql";
import { notesStrings } from "@/data/notes-strings";
import { notesWarehouse } from "@/data/notes-warehouse";

export type NoteExample = {
  title: string;
  prompt: string;
  code?: string;
  language?: CodeLang;
  steps: string[];
  result: string;
};

export type NoteBlock = {
  heading: string;
  body: string;
  bullets?: string[];
  examples?: NoteExample[];
};

export type TopicNote = {
  topic: TopicId;
  title: string;
  blurb: string;
  blocks: NoteBlock[];
};

export const notes: TopicNote[] = [
  notesDatabase,
  notesSql,
  notesProgramming,
  notesPython,
  notesAlgorithms,
  notesNetworking,
  notesSecurity,
  notesWarehouse,
  notesShell,
  notesDs,
  notesStrings,
  notesOops,
  notesGa,
  notesEnglish,
  notesQuant,
  notesReasoning,
];

export function noteFor(topic: TopicId): TopicNote | undefined {
  return notes.find((n) => n.topic === topic);
}

export function noteStats(note: TopicNote) {
  const examples = note.blocks.reduce(
    (n, b) => n + (b.examples?.length ?? 0),
    0,
  );
  return { sections: note.blocks.length, examples };
}
