# Grade A IT Desk

A browser study desk for **SEBI Officer Grade A (Assistant Manager), Information Technology stream**.

It is built around the IT annexure in the 2025 SEBI Grade A advertisement: Phase I Paper 2 topic weights, Phase II coding-logic MCQs, official-style cut-offs, and negative marking.

Mocks are pitched at **SEBI Grade A IT difficulty or a notch harder** (GATE-style traces, serializability, binding traps). This is practice material, not an official SEBI product. Always confirm dates, vacancies, and the syllabus on [sebi.gov.in](https://www.sebi.gov.in).

## What you can do here

- **Syllabus** — Phase I Paper 2 (IT), Phase II Paper 2 (DSA / strings / OOP), and Paper 1 screening topics, with indicative weightages
- **Notes** — high-yield revision sheets (normal forms, OSI ports, CIA, ETL, shell specials, OOP pillars)
- **Topic practice** — MCQs with immediate explanations, including Java/C++/Python dry-runs
- **Timed mocks** — **six distinct papers** per stage
  - Phase I Paper 2: 50 questions, 40 minutes, 2 marks each, −0.5 if wrong, 40% cut-off
  - Phase I Paper 1: 40 questions, 30 minutes, 1.25 marks each, 30% cut-off
  - Phase II Paper 2: 25 dry-run / debug MCQs, 45 minutes, 4 marks each, 40% cut-off
- **Interview** — pattern (15% of final merit) plus three mock panels with talking points
- **Review** — score vs cut-off, topic split, full answer key
- **Wrong-question revision** — misses stay on this browser (localStorage)

Progress never leaves your machine.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

```bash
npm run build
npm start
```

## How to study with it

1. Read **Pattern** so the cut-offs are in your head (Phase I is screening only; Phase II Paper 2 is 2/3 of Phase II and 85% of final merit with the interview).
2. Drill **Programming Concepts** first — 30% of Phase I Paper 2.
3. Sit a full **Phase I Paper 2** mock under 40 minutes. Skip when two options still look equal.
4. Shift to Phase II dry-runs (stacks, BST inorder, KMP, DP traces) once Paper 2 scoring is stable.
5. Work an **interview panel** out loud: claim → mechanism → tiny example.
6. Keep financial-sector GA warm for Paper 1; descriptive English (essay / precis / comprehension) still needs separate typing practice.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
