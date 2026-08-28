# Grade A IT Desk

A browser study desk for **SEBI Officer Grade A (Assistant Manager), Information Technology stream**.

It is built around the IT annexure in the 2025 SEBI Grade A advertisement: Phase I Paper 2 topic weights, Phase II coding-logic MCQs, official-style cut-offs, and negative marking.

Mocks are pitched at **SEBI Grade A IT difficulty or a notch harder** (GATE-style traces, serializability, binding traps). This is practice material, not an official SEBI product. Always confirm dates, vacancies, and the syllabus on [sebi.gov.in](https://www.sebi.gov.in).

## What you can do here

- **Syllabus** — Phase I Paper 2 (IT), Phase II Paper 2 (DSA / strings / OOP), and Paper 1 screening topics, with indicative weightages
- **Notes** — every official syllabus topic (IT, DSA, Paper 1). Each technique has a how-to recipe and **five** worked examples with numbered what/why steps.
- **Topic practice** — MCQs with immediate explanations, including Java/C++/Python dry-runs
- **Timed mocks** — **six distinct papers** per official paper
  - Phase I Paper 1: 40 questions, 30 minutes (half-length screening mix)
  - Phase I Paper 2: 50 questions, 40 minutes (official IT length)
  - Phase II Paper 1: descriptive English — essay + precis (typed) + 5 RC MCQs, 60 minutes
  - Phase II Paper 2: 25 dry-run / debug MCQs, 45 minutes
- **PYQs** — memory-based reconstructions (SEBI does not publish official papers) for 2020–2026 cycles across Phase I Papers 1–2 and Phase II Papers 1–2. Original items in the reported topic mix, not copied coaching PDFs.
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
6. Sit **Phase II Paper 1** (descriptive) under 60 minutes — RC is auto-marked; compare essay/precis with the key.
7. Work an **interview panel** out loud: claim → mechanism → tiny example.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
