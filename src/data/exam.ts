import type { TopicId } from "@/lib/types";

export const APP_NAME = "Grade A IT Desk";

export const examMeta = {
  post: "Officer Grade A (Assistant Manager)",
  stream: "Information Technology",
  authority: "Securities and Exchange Board of India",
  cycle: "Based on the 2025 official advertisement",
  officialSite: "https://www.sebi.gov.in",
};

export type SyllabusTopic = {
  id: TopicId;
  name: string;
  phase: 1 | 2;
  paper: 1 | 2;
  weightage: number;
  details: string;
  whyItMatters: string;
};

export const phase1Paper2: SyllabusTopic[] = [
  {
    id: "database",
    name: "Database Concepts",
    phase: 1,
    paper: 2,
    weightage: 10,
    details:
      "ER-model. Relational model: relational algebra, tuple calculus. Integrity constraints, normal forms. File organisation, indexing (B and B+ trees). Transactions and concurrency control.",
    whyItMatters:
      "Short, high-yield theory. Normal forms, keys, and 2PL/serializability are frequent.",
  },
  {
    id: "sql",
    name: "SQL Queries",
    phase: 1,
    paper: 2,
    weightage: 10,
    details:
      "SELECT, VIEW, TRUNCATE, DELETE, UPDATE, ALTER. Inner join and outer joins. Aggregate functions. UNION, INTERSECTION, EXCEPT, IN and EXISTS. Nested queries.",
    whyItMatters:
      "Output-of-query questions are scoring if you practise joins, EXISTS, and GROUP BY/HAVING.",
  },
  {
    id: "programming",
    name: "Programming Concepts (Java / C / C++)",
    phase: 1,
    paper: 2,
    weightage: 30,
    details:
      "Program control (iteration, recursion, functions), scope and binding, parameter passing, functional and logic programming, OOP, inheritance, class and object, constructors, functions, exception handling.",
    whyItMatters:
      "Largest Phase 1 Paper 2 slice. Dry-runs, OOP, and binding questions decide the cut-off.",
  },
  {
    id: "python",
    name: "Data Analytics Languages (Python / R)",
    phase: 1,
    paper: 2,
    weightage: 10,
    details:
      "Regex, slicing, data reshaping, dataframes, dictionaries and sets, file management, classes and functions, data mining, lists, importing and exporting data, charts and graphs.",
    whyItMatters:
      "Python slicing, mutability, pandas reshape, and regex show up as short MCQs.",
  },
  {
    id: "algorithms",
    name: "Algorithms for Problem Solving",
    phase: 1,
    paper: 2,
    weightage: 10,
    details:
      "Tree and graph traversals, connected components, spanning trees, shortest paths, hashing, sorting, searching, greedy, dynamic programming, divide-and-conquer.",
    whyItMatters:
      "Complexity and “which algorithm” questions. Overlaps heavily with Phase 2.",
  },
  {
    id: "networking",
    name: "Networking Concepts",
    phase: 1,
    paper: 2,
    weightage: 10,
    details:
      "ISO/OSI stack, LAN technologies (Ethernet, Token Ring), TCP/UDP, IP, switches, gateways and routers, application layer protocols (DNS, SMTP, POP, FTP, HTTP), firewalls.",
    whyItMatters:
      "Layer mapping and protocol purpose questions are quick marks if you memorise the stack.",
  },
  {
    id: "security",
    name: "Information & Cyber Security",
    phase: 1,
    paper: 2,
    weightage: 10,
    details:
      "Cyber attacks, software development security, network security, authentication, CIA triad, network audit, systems audit.",
    whyItMatters:
      "Definitions plus attack-vs-control matching. CIA and auth factors are staples.",
  },
  {
    id: "warehouse",
    name: "Data Warehousing",
    phase: 1,
    paper: 2,
    weightage: 5,
    details:
      "Data extraction, cleaning, transformation, loading, metadata, data cube, data mart, data models.",
    whyItMatters:
      "Small slice. ETL order, star vs snowflake, and mart vs warehouse are enough.",
  },
  {
    id: "shell",
    name: "Shell Programming",
    phase: 1,
    paper: 2,
    weightage: 5,
    details:
      "Shell scripting basics, variables, arguments, if statement, loops, return, basic UNIX commands.",
    whyItMatters:
      "Special variables ($#, $?, $@) and a handful of commands cover most MCQs.",
  },
];

export const phase2Paper2: SyllabusTopic[] = [
  {
    id: "algorithms",
    name: "Algorithms",
    phase: 2,
    paper: 2,
    weightage: 30,
    details:
      "Sorting, searching, greedy algorithms, dynamic programming, backtracking, divide and conquer, pattern searching. Tested in C++ / Java / Python via dry-runs and logic-flow MCQs.",
    whyItMatters:
      "Phase 2 Paper 2 carries 2/3 of Phase 2. This paper is 85% of final merit with the interview.",
  },
  {
    id: "ds",
    name: "Data Structures",
    phase: 2,
    paper: 2,
    weightage: 40,
    details:
      "Array, linked list, stack, queue, binary tree, indexing, BST, heap, hashing, matrix, JSON objects.",
    whyItMatters: "Heaviest Phase 2 topic. Trace pointer/index updates carefully.",
  },
  {
    id: "strings",
    name: "String Manipulation",
    phase: 2,
    paper: 2,
    weightage: 10,
    details: "Length, substring, regex, search in C++ / Java / Python.",
    whyItMatters: "Off-by-one and regex character-class traps are common.",
  },
  {
    id: "oops",
    name: "Object-Oriented Programming",
    phase: 2,
    paper: 2,
    weightage: 20,
    details:
      "Abstraction, encapsulation, polymorphism, inheritance — in C++ / Java / Python.",
    whyItMatters:
      "Compile-time vs runtime polymorphism and access specifiers are frequent.",
  },
];

export const phase1Paper1Sections = [
  {
    id: "ga" as TopicId,
    name: "General Awareness (incl. Financial Sector)",
    marks: 25,
    topics:
      "SEBI, markets, RBI/monetary policy, budget, current affairs, static GK, schemes, financial terms.",
  },
  {
    id: "english" as TopicId,
    name: "English Language",
    marks: 25,
    topics:
      "Reading comprehension, error spotting, fillers, para jumbles, vocab, sentence rearrangement.",
  },
  {
    id: "quant" as TopicId,
    name: "Quantitative Aptitude",
    marks: 25,
    topics:
      "Simplification, DI, number series, quadratic, arithmetic (P&L, SI/CI, TSD, time & work), probability.",
  },
  {
    id: "reasoning" as TopicId,
    name: "Test of Reasoning",
    marks: 25,
    topics:
      "Puzzles, seating, syllogism, inequality, blood relation, coding-decoding, direction, input-output.",
  },
];

export const pattern = {
  phases: [
    {
      name: "Phase I — Online screening",
      note: "Marks are only for shortlisting. They do not count in the final merit.",
      papers: [
        {
          name: "Paper 1 (all streams)",
          marks: 100,
          durationMin: 60,
          cutoff: 30,
          extra:
            "GA, English, Quant, Reasoning. Negative marking: 1/4th of the marks for that question.",
        },
        {
          name: "Paper 2 (IT stream)",
          marks: 100,
          durationMin: 40,
          cutoff: 40,
          extra:
            "50 specialised IT MCQs (typically 2 marks each). Aggregate Phase I cut-off: 40%.",
        },
      ],
    },
    {
      name: "Phase II — Online examination",
      note: "85% of final selection. Need paper-wise cut-offs and 50% aggregate (1/3 Paper 1 + 2/3 Paper 2).",
      papers: [
        {
          name: "Paper 1 — Descriptive English",
          marks: 100,
          durationMin: 60,
          cutoff: 30,
          extra: "Essay 30, Precis 30, Comprehension 40. Weightage 1/3 of Phase II.",
        },
        {
          name: "Paper 2 — IT (objective)",
          marks: 100,
          durationMin: 180,
          cutoff: 40,
          extra:
            "Logic-flow completion, debugging, syntax, program dry-run outputs, data analysis. Weightage 2/3 of Phase II.",
        },
      ],
    },
    {
      name: "Phase III — Interview",
      note: "Interview 15% + Phase II 85%. You may choose Hindi or English. Typical panel: 15–25 minutes, mixed technical + markets + HR. No official published paper — practise talking points, not MCQs.",
      papers: [
        {
          name: "Interview (viva)",
          marks: 100,
          durationMin: 25,
          cutoff: 0,
          extra:
            "Weight 15% of final merit. Depth in DSA/DBMS/networks/security, awareness of SEBI’s tech and market role, projects, and integrity. Language: Hindi or English.",
        },
      ],
    },
  ],
  negativeMarking: "1/4th of the marks assigned to the question (MCQs).",
  bilingual: "Papers except English are bilingual (Hindi and English).",
};

export const strategy = [
  {
    title: "Paper 2 IT is the exam",
    body: "Phase I Paper 2 has a 40% sectional cut-off and decides whether you even see Phase II. Phase II Paper 2 is 2/3 of Phase II, which itself is 85% of the final score. Programming (30%) plus DSA is where rank is made.",
  },
  {
    title: "Do not ignore Paper 1",
    body: "Phase I Paper 1 needs 30%. Financial-sector GA (SEBI, markets, RBI) is easier to lift than grinding extra Quant. Descriptive English in Phase II is 1/3 of that stage — practise typing essays and precis against a clock.",
  },
  {
    title: "Practise dry-runs, not just theory",
    body: "The 2025 IT Paper 2 (Phase II) is an MCQ coding-logic paper: outputs, bugs, incomplete logic. Trace code on paper every day in Java, C++, and Python.",
  },
  {
    title: "Sit papers harder than the cut-off",
    body: "Mocks here are pitched at SEBI Grade A IT or a notch above (GATE-style dry-runs and traps). If you can clear 40% on these with negative marking, the real Paper 2 feels slower, not stranger.",
  },
];

export const MOCKS_PER_PAPER = 6;

export const mockFamilies = [
  {
    kind: "phase1-paper2" as const,
    familyTitle: "Phase I · Paper 2 (IT)",
    familyBlurb:
      "Official-length IT paper. 50 MCQs · 100 marks · 40 minutes · −0.5 per wrong · 40% cut-off. Six distinct question papers.",
    questions: 50,
    minutes: 40,
    marksEach: 2,
    cutoffPercent: 40,
  },
  {
    kind: "phase1-paper1" as const,
    familyTitle: "Phase I · Paper 1 (screening)",
    familyBlurb:
      "GA, English, Quant, Reasoning. 40 MCQs · 50 marks · 30 minutes · −0.3125 per wrong · 30% cut-off. Six distinct papers.",
    questions: 40,
    minutes: 30,
    marksEach: 1.25,
    cutoffPercent: 30,
  },
  {
    kind: "phase2-paper2" as const,
    familyTitle: "Phase II · Paper 2 (coding logic)",
    familyBlurb:
      "Dry-run / debug / DSA MCQs. 25 questions · 100 marks · 45 minutes · −1 per wrong · 40% cut-off. Six distinct papers.",
    questions: 25,
    minutes: 45,
    marksEach: 4,
    cutoffPercent: 40,
  },
];

export const mocks = mockFamilies.flatMap((family) =>
  Array.from({ length: MOCKS_PER_PAPER }, (_, i) => {
    const set = i + 1;
    return {
      id: `${family.kind}-m${set}`,
      kind: family.kind,
      set,
      title: `${family.familyTitle} · Mock ${set}`,
      blurb: family.familyBlurb,
      questions: family.questions,
      minutes: family.minutes,
      marksEach: family.marksEach,
      cutoffPercent: family.cutoffPercent,
    };
  }),
);

export function mockById(id: string) {
  return mocks.find((m) => m.id === id);
}

export const topicById = Object.fromEntries(
  [...phase1Paper2, ...phase2Paper2, ...phase1Paper1Sections.map((s) => ({
    id: s.id,
    name: s.name,
    phase: 1 as const,
    paper: 1 as const,
    weightage: s.marks,
    details: s.topics,
    whyItMatters: "",
  }))].map((t) => [t.id, t]),
) as Record<TopicId, SyllabusTopic>;
