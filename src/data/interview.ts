import {
  extraInterviewItems,
  extraInterviewSets,
} from "@/data/interview-extra";

export type InterviewCategory =
  | "technical"
  | "sebi"
  | "hr"
  | "situational";

export type InterviewItem = {
  id: string;
  set: number;
  category: InterviewCategory;
  question: string;
  talkingPoints: string[];
  followUp?: string;
};

export const interviewPattern = {
  weight: "15% of final merit (Phase II carries the other 85%).",
  language: "You may choose Hindi or English for the interview.",
  duration: "Typically 15–25 minutes. Some panels run shorter; do not pad.",
  panel:
    "Usually SEBI officers. Expect a mix of technical probing, securities-market awareness, projects, and integrity/HR. There is no published official question paper.",
  howItFeels:
    "The IT stream is not a coding test at this stage. They want to know whether you can reason about systems, explain a project without jargon fog, and why a market regulator should hire you rather than a product company.",
  scoringNote:
    "A strong Phase II Paper 2 still dominates rank. The interview rarely rescues a weak written score, but a poor interview can drop you below a rival with a similar Phase II mark.",
};

export const interviewPlaybook = [
  {
    title: "Open with a 60-second arc",
    body: "Education → one concrete project (problem, your role, a number) → why SEBI IT now. Do not recite the advertisement. Name a real SEBI tech or market problem you have actually thought about.",
  },
  {
    title: "Technical answers need a diagram in words",
    body: "For DSA/DBMS/networks: state the claim, give the complexity or invariant, then a tiny example. If you freeze, say what you would look up rather than inventing a protocol.",
  },
  {
    title: "Markets literacy is not optional for IT",
    body: "Know T+1 / optional T+0, PIT vs PFUTP, SCORES, UPI-block mechanism at a high level, why surveillance and cyber resilience matter to a regulator. You are not expected to quote every circular number.",
  },
  {
    title: "Integrity questions are scored",
    body: "SEBI hires for a statutory body. Conflicts of interest, handling UPSI, vendor capture, and “what if a friend asks for a listing tip” are fair game. Answer slowly and specifically.",
  },
];

const interviewItems: InterviewItem[] = [
  // —— Mock panel 1: technical-heavy ——
  {
    id: "iv-1-01",
    set: 1,
    category: "technical",
    question:
      "Walk us through how you would detect a wash-trade pattern in a stream of orders. Which data structures, and what would you index?",
    talkingPoints: [
      "Define wash-like behaviour: same beneficial owner (or collusive cluster) on both sides, little inventory change, price impact or circular volume.",
      "Need entity resolution first (PANs, client codes, related parties) — a graph, not a flat table.",
      "Per-security sliding window of trades: hash map from (security, window) to order/trade lists; Fenwick/segment tree only if you need range aggregates on price/volume.",
      "Graph: bipartite or directed edges between clients weighted by opposite-side volume; look for near-cycles and high reciprocity.",
      "False positives: market makers, genuine two-way flow. Stress thresholds and supervisor review, not auto-ban.",
    ],
    followUp: "How would this change if the stream were 10× NSE’s peak OPRA-like rate?",
  },
  {
    id: "iv-1-02",
    set: 1,
    category: "technical",
    question:
      "A reporting database is in 3NF but queries that join five tables time out. When is denormalisation justified, and what do you lose?",
    talkingPoints: [
      "OLTP vs OLAP: keep 3NF/BCNF for writes and integrity; star/snowflake or materialised views for surveillance/reporting.",
      "You lose update anomalies, extra storage, and the risk of stale facts if ETL lags.",
      "Prefer indexed views / nightly facts over ad-hoc denormalised OLTP tables.",
      "Mention slowly changing dimensions if historical holding snapshots matter for insider-trading windows.",
    ],
  },
  {
    id: "iv-1-03",
    set: 1,
    category: "technical",
    question:
      "Explain conflict serializability vs view serializability. Give a schedule that is view-serializable but not conflict-serializable.",
    talkingPoints: [
      "Conflict: conflicting operations (rw, wr, ww on same item) induce a precedence graph; acyclic ⇔ conflict serializable.",
      "View: same reads-from relation and same final writes as some serial schedule — weaker, allows some blind writes.",
      "Classic example: W1(A) W2(A) W1(A) — often view-serializable (equivalent to T2 then T1 or similar depending on reads) but has a conflict cycle or is not conflict-serializable.",
      "Exam-safe example: T1: W(A); T2: W(A); T1: W(A) with no reads — blind writes. Be ready to draw the graph.",
    ],
    followUp: "Which isolation level in SQL most closely approximates conflict serializability?",
  },
  {
    id: "iv-1-04",
    set: 1,
    category: "technical",
    question:
      "TCP slow start vs congestion avoidance. A flow just suffered a triple-duplicate ACK. What happens to cwnd and ssthresh under classic Reno?",
    talkingPoints: [
      "Slow start: cwnd grows exponentially (roughly doubles per RTT) until ssthresh.",
      "Congestion avoidance: additive increase (~1 MSS per RTT).",
      "Triple-dup ACK (Reno): ssthresh = cwnd/2, fast retransmit, fast recovery (cwnd ≈ ssthresh + 3, inflate on further dupacks) — not a full timeout restart.",
      "Timeout: ssthresh = cwnd/2, cwnd back to 1 MSS, slow start.",
      "CUBIC/BBR exist in the wild; say you know Reno is the exam model.",
    ],
  },
  {
    id: "iv-1-05",
    set: 1,
    category: "technical",
    question:
      "You must store API keys that a SEBI internal tool uses to call an exchange. How do you design secret storage?",
    talkingPoints: [
      "Never in git, never in application.properties in plaintext, never in a ticket.",
      "HSM / cloud KMS / vault; short-lived credentials; rotate; audit who decrypted.",
      "Least privilege IAM; separate prod from UAT; network allow-lists.",
      "If a leak is suspected: revoke, rotate, check access logs, inform CISO — do not discuss on WhatsApp groups.",
    ],
  },
  {
    id: "iv-1-06",
    set: 1,
    category: "sebi",
    question:
      "What problem does T+1 settlement solve, and what new operational risk does it create for brokers’ IT?",
    talkingPoints: [
      "Shorter counterparty and market risk; India moved cash equities to T+1; optional T+0 in phases.",
      "IT: compressed reconciliation, funding, corporate-action, and fail-to-deliver windows.",
      "Need straight-through processing, better clock sync, and clearer cut-offs with custodians and banks.",
      "Do not claim T+1 abolished all risk.",
    ],
  },
  {
    id: "iv-1-07",
    set: 1,
    category: "sebi",
    question: "PIT versus PFUTP — which regulation would you reach for, and why?",
    talkingPoints: [
      "PIT (Prohibition of Insider Trading) Regulations: UPSI, insiders, connected persons, trading plans, disclosures.",
      "PFUTP: broader market manipulation, fraudulent devices, front-running in many fact patterns, rumours.",
      "A wash-trade or spoofing story is usually PFUTP; a CFO trading before results is PIT. Some matters invoke both.",
    ],
  },
  {
    id: "iv-1-08",
    set: 1,
    category: "hr",
    question: "You have an offer from a product company at 1.5× this CTC. Why SEBI?",
    talkingPoints: [
      "Do not insult industry. Contrast: public-goods infrastructure, market integrity, asymmetric information, systemic risk.",
      "IT at a regulator is constraint-heavy (audit, law, vendors) — say you want that, not despite that.",
      "Name one SEBI-adjacent problem you would be proud to ship (surveillance, cyber, filings, SCORES).",
      "Avoid “stable government job” as the first sentence.",
    ],
  },
  {
    id: "iv-1-09",
    set: 1,
    category: "situational",
    question:
      "A vendor’s engineer asks you to whitelist their debug IP on a production surveillance box “just for tonight”. What do you do?",
    talkingPoints: [
      "No. Change control, CAB/CISO path, time-bound exception with logging if truly an incident.",
      "Personal WhatsApp requests are a red flag. Record the ask.",
      "If production is down, follow the incident runbook — still not an undocumented hole.",
    ],
  },
  {
    id: "iv-1-10",
    set: 1,
    category: "technical",
    question:
      "Compare B-tree and B+ tree for a range query on trade timestamps. Why do databases prefer B+?",
    talkingPoints: [
      "B+: all records (or rids) at leaves; leaves linked → sequential range scan.",
      "Internal nodes are dense separators → higher fanout, shallower tree.",
      "B-tree stores records in internal nodes too — range scan jumps around.",
      "Hash index is excellent for equality, useless for “last 5 minutes of trades”.",
    ],
  },
  {
    id: "iv-1-11",
    set: 1,
    category: "technical",
    question:
      "Write the recurrence for merge sort and apply the Master theorem. What changes if the split is 1/3–2/3 instead of 1/2–1/2?",
    talkingPoints: [
      "T(n) = 2T(n/2) + Θ(n) → a=2,b=2,f=n = Θ(n^{log_b a}) → Θ(n log n).",
      "Uneven split: still Θ(n log n) for a fixed fraction; the recursion tree depth is log_{3/2} n vs log_2 n, same class.",
      "Worst-case quicksort T(n)=T(n-1)+Θ(n)=Θ(n²); average Θ(n log n).",
    ],
  },
  {
    id: "iv-1-12",
    set: 1,
    category: "hr",
    question: "Tell us about a time you were wrong in production or in a contest. What did you change?",
    talkingPoints: [
      "One incident, your mistake (not the team’s), detection, blast radius, fix, and a lasting control (test, alert, checklist).",
      "Regulators care about learning loops more than heroics.",
    ],
  },

  // —— Mock panel 2: markets + SEBI + systems ——
  {
    id: "iv-2-01",
    set: 2,
    category: "sebi",
    question: "What does SEBI actually do in the market stack? Who does CDSL, NSDL, NSE, RBI, MCA own?",
    talkingPoints: [
      "SEBI: securities markets — exchanges, brokers, depositories, mutual funds, REITs, etc., under SEBI Act 1992.",
      "RBI: banks, payment systems, government securities in large part, forex under FEMA overlap — do not say SEBI regulates banks.",
      "Depositories (NSDL/CDSL) are SEBI-regulated market infrastructure.",
      "MCA/RoC: companies; SEBI overlays listed-company disclosure and market conduct.",
    ],
    followUp: "Where would a UPI block mechanism for secondary-market payments sit?",
  },
  {
    id: "iv-2-02",
    set: 2,
    category: "sebi",
    question: "Explain SCORES (or SCORES 2.0) as if you were briefing a new officer.",
    talkingPoints: [
      "Centralised grievance redress for SEBI-regulated entities; investors lodge complaints; entities must respond in defined timelines.",
      "IT angle: identity, audit trail, SLA clocks, escalation, integration with exchanges/depositories.",
      "It is not a trading system and not a substitute for courts.",
    ],
  },
  {
    id: "iv-2-03",
    set: 2,
    category: "technical",
    question:
      "Design a highly available filing portal (think merchant banker / listed-company submissions). RPO, RTO, and what you will not over-engineer as a Grade A officer.",
    talkingPoints: [
      "RPO: how much data loss is tolerable (filings: near-zero; use sync replication or confirmed write).",
      "RTO: how fast to come back (hours vs minutes — be honest about on-prem vs cloud).",
      "Active-passive vs active-active; object store for PDFs; checksums; WORM/legal hold if needed.",
      "AuthN: e-sign / 2FA; AuthZ: maker-checker.",
      "Do not propose Kubernetes for a 50-request/minute form unless asked to justify ops cost.",
    ],
  },
  {
    id: "iv-2-04",
    set: 2,
    category: "technical",
    question: "CIA triad applied to a price-feed. Give one control for each letter, and one that is not CIA.",
    talkingPoints: [
      "Confidentiality: who may see pre-open or unpublished surveillance flags — encryption + IAM.",
      "Integrity: signed feeds, checksums, so a stale or spoofed LTP cannot pass.",
      "Availability: redundant NICs, exchange colo fallback, status page for internal users.",
      "Non-repudiation / authenticity sit beside CIA; privacy is related but distinct.",
    ],
  },
  {
    id: "iv-2-05",
    set: 2,
    category: "technical",
    question:
      "SQL: why is `WHERE col NOT IN (SELECT x FROM t)` dangerous if `t.x` can be NULL? What do you write instead?",
    talkingPoints: [
      "NOT IN + NULL in the list yields UNKNOWN for every row → empty result.",
      "Prefer NOT EXISTS or `col NOT IN (...)` after filtering NULLs, or anti-join `LEFT JOIN ... WHERE t.x IS NULL`.",
      "This is a favourite written-exam trap; saying it in interview shows you have been cut by it.",
    ],
  },
  {
    id: "iv-2-06",
    set: 2,
    category: "sebi",
    question: "What is a unique client code, and why does SEBI care about one-client-one-code discipline?",
    talkingPoints: [
      "UCC ties trades to a client for audit, tax, and surveillance; multiple codes hide concentration and circular trading.",
      "KYC/KRA, PAN, and demat linkage sit underneath.",
      "IT: master data quality, not just a unique index — related-party graphs still needed.",
    ],
  },
  {
    id: "iv-2-07",
    set: 2,
    category: "hr",
    question: "You will often work with lawyers and supervisory officers, not only engineers. How do you explain a technical risk to a non-IT member?",
    talkingPoints: [
      "Lead with the market/legal consequence (wrong order, leaked UPSI, missed SLA), then the mechanism in one sentence, then the option set.",
      "Avoid dumping logs. Offer a decision: accept / mitigate / transfer.",
    ],
  },
  {
    id: "iv-2-08",
    set: 2,
    category: "situational",
    question:
      "You find a listed-company XBRL filing that your parser flags as inconsistent with the PDF. The listed entity says the PDF is the source of truth. Walk the next hour.",
    talkingPoints: [
      "Preserve both artefacts, hashes, timestamps. Do not silently “fix” XML.",
      "Escalate to the business owner of filings; check schema vs manual error vs possible misstatement.",
      "If it could be market-moving, involve the relevant supervision team — you do not freelance a tweet.",
    ],
  },
  {
    id: "iv-2-09",
    set: 2,
    category: "technical",
    question: "Hashing vs encryption vs MAC vs digital signature — four sentences, no overlap.",
    talkingPoints: [
      "Hash: one-way fingerprint; not secret; collisions matter (SHA-256 vs SHA-1).",
      "Encryption: confidentiality; reversible with a key.",
      "MAC (HMAC): integrity + authenticity with a shared secret; not non-repudiation.",
      "Digital signature: private-key sign, public-key verify; non-repudiation if keys are bound to identity.",
    ],
  },
  {
    id: "iv-2-10",
    set: 2,
    category: "technical",
    question:
      "A heap of n elements: complexity of k successive extract-min operations. When would you use a BST instead?",
    talkingPoints: [
      "Binary heap extract-min is O(log n) each → O(k log n), plus O(n) build.",
      "Heap does not support arbitrary delete or search by key in O(log n) without handles.",
      "BST/TreeMap: ordered iteration, successor, delete-by-key; worse constants; unbalanced BST is O(n).",
    ],
  },
  {
    id: "iv-2-11",
    set: 2,
    category: "sebi",
    question: "Why might a regulator care about cloud and offshore processing of market data?",
    talkingPoints: [
      "Data localisation / contractual control, access by foreign law enforcement, vendor lock-in, shared-tenancy leakage.",
      "SEBI has issued cloud / cyber frameworks for regulated entities — speak at principle level, admit you will re-read the latest circular.",
      "For SEBI’s own systems: classification, encryption, audit, Indian-region residency as policy may require.",
    ],
  },
  {
    id: "iv-2-12",
    set: 2,
    category: "hr",
    question: "Where do you see yourself in five years inside SEBI, not in the private sector?",
    talkingPoints: [
      "Grade A is a generalist-specialist: supervision + IT delivery. Say you want to own a system (surveillance, cyber, filings) and still sit with the business.",
      "Avoid “I will be CTO”. Avoid “I will prepare for UPSC on the side”.",
    ],
  },

  // —— Mock panel 3: coding logic + HR + cyber ——
  {
    id: "iv-3-01",
    set: 3,
    category: "technical",
    question:
      "Dry-run on a whiteboard: invert a binary tree vs “mirror equals original”. What is the complexity, and what pitfall do people hit with shared nodes?",
    talkingPoints: [
      "Invert: swap left/right recursively or with a queue; Θ(n) time, Θ(h) stack.",
      "Symmetric tree: compare left and right mirrors — not the same as invert-in-place.",
      "Aliasing: if you swap pointers without copying, you can corrupt a DAG mistaken for a tree.",
    ],
  },
  {
    id: "iv-3-02",
    set: 3,
    category: "technical",
    question:
      "Java: why is `synchronized (this)` on a public method a design smell for a market-data cache?",
    talkingPoints: [
      "Callers can lock on the same object and deadlock or block your internals.",
      "Prefer a private final lock object; or java.util.concurrent structures (CHM, ReadWriteLock) with documented striping.",
      "Also mention visibility (happens-before), not just mutual exclusion.",
    ],
  },
  {
    id: "iv-3-03",
    set: 3,
    category: "technical",
    question: "C++: when must a destructor be virtual? What goes wrong if it is not?",
    talkingPoints: [
      "When you delete a derived object through a base pointer.",
      "Otherwise only the base destructor runs → resource leak / UB.",
      "If a class is not designed as a polymorphic base, prefer final / no virtuals — don’t virtualise “just in case”.",
    ],
  },
  {
    id: "iv-3-04",
    set: 3,
    category: "technical",
    question:
      "Python: `def f(a=[]): a.append(1); return a` called thrice. What is returned, and how do you fix it?",
    talkingPoints: [
      "Mutable default is evaluated once at function definition → shared list → [1], [1,1], [1,1,1].",
      "Fix: `a=None` then `if a is None: a = []`.",
      "Same class of bug: late-binding closures in `lambdas` inside a loop — bind with default arg `i=i`.",
    ],
  },
  {
    id: "iv-3-05",
    set: 3,
    category: "technical",
    question:
      "KMP failure function for pattern `ababaca`. Compute π, then explain one mismatch transition.",
    talkingPoints: [
      "π[i] = longest proper prefix that is also suffix of pat[0..i].",
      "For ababaca a common table is [0,0,1,2,3,0,1] (0-based; confirm at the board).",
      "On mismatch at i, jump to π[i-1], never restart from zero blindly — that is the point vs naive.",
    ],
  },
  {
    id: "iv-3-06",
    set: 3,
    category: "sebi",
    question:
      "What is spoofing / layering in the order book, and what IT artefact would you keep to prove it later?",
    talkingPoints: [
      "Non-bona-fide orders to create a false impression of depth, cancelled before execution.",
      "Need order-level timestamps (exchange clock), cancel/replace trail, trader IDs, and the book snapshot or enough incremental updates to reconstruct.",
      "Clock sync and unique order IDs are evidentiary, not “nice to have”.",
    ],
  },
  {
    id: "iv-3-07",
    set: 3,
    category: "situational",
    question:
      "You are on-call. A dashboard shows a 40% drop in inbound exchange files at 09:16. Walk the first ten minutes.",
    talkingPoints: [
      "Is it our poller, the exchange, DNS, cert expiry, or a holiday calendar bug?",
      "Check heartbeats, last successful file hash/time, peer status page, disk, and whether only one segment failed.",
      "Escalate with a timeline; do not restart blindly if that would drop an in-flight file.",
      "Communicate “what we know / don’t know / next check-at” to the desk.",
    ],
  },
  {
    id: "iv-3-08",
    set: 3,
    category: "hr",
    question: "SEBI postings can be outside your home city. Are you mobile? Any constraint we should know?",
    talkingPoints: [
      "Answer yes/no honestly. Grade A is an all-India service-like posting culture.",
      "If there is a genuine constraint, state it once; do not negotiate the interview.",
    ],
  },
  {
    id: "iv-3-09",
    set: 3,
    category: "situational",
    question:
      "A college friend now at a broker asks, “just conceptually, is SEBI looking at XYZ stock this week?”",
    talkingPoints: [
      "That is a request for unpublished supervisory information. Refuse, even as a joke.",
      "Do not confirm or deny investigations. Report the approach if it feels like fishing.",
      "UPSI / office information stays inside the building.",
    ],
  },
  {
    id: "iv-3-10",
    set: 3,
    category: "technical",
    question:
      "Normal forms: give a relation that is 3NF but not BCNF. Why do we still teach BCNF?",
    talkingPoints: [
      "Classic: R(J,K,L) with FDs JK→L and L→K. Candidate keys JK and JL; L→K is a dependency whose determinant L is not a candidate key → not BCNF, but 3NF because K is prime.",
      "BCNF removes remaining anomalies; 3NF preserves some FDs more often in decomposition trade-offs.",
    ],
  },
  {
    id: "iv-3-11",
    set: 3,
    category: "technical",
    question:
      "OSI vs TCP/IP: at which layer would you put TLS, and why do people still argue?",
    talkingPoints: [
      "TLS is often called “session/presentation” in OSI folklore; in practice it is a shim between TCP (transport) and HTTP (application).",
      "Do not say TLS is layer 3. Do not say HTTPS is only layer 7 with no transport story.",
    ],
  },
  {
    id: "iv-3-12",
    set: 3,
    category: "hr",
    question: "Questions for us?",
    talkingPoints: [
      "Ask about the first six months of an IT Grade A officer, or how IT and a supervision department share a backlog — not about CTC, leave, or “work-life balance” as opener.",
      "A sharp question: “Which internal system would you most want a new officer to understand in month one?”",
    ],
  },
];

const coreInterviewSets = [
  {
    id: 1,
    title: "Mock panel 1 — Technical deep-dive",
    blurb:
      "Surveillance DS, serializability, TCP congestion, secrets, T+1, PIT/PFUTP, vendor access.",
  },
  {
    id: 2,
    title: "Mock panel 2 — Markets, filings, systems",
    blurb:
      "SEBI vs RBI vs depositories, SCORES, HA filings, CIA, SQL NULL trap, UCC, cloud.",
  },
  {
    id: 3,
    title: "Mock panel 3 — Coding logic, cyber, integrity",
    blurb:
      "Trees, Java locks, C++ destructors, Python defaults, KMP, spoofing evidence, UPSI.",
  },
];

export const interviewSets = [...coreInterviewSets, ...extraInterviewSets];

export const allInterviewItems: InterviewItem[] = [
  ...interviewItems,
  ...extraInterviewItems,
];

export function itemsForSet(set: number) {
  return allInterviewItems.filter((item) => item.set === set);
}

export function itemsForCategory(category: InterviewCategory) {
  return allInterviewItems.filter((item) => item.category === category);
}

export const categoryLabel: Record<InterviewCategory, string> = {
  technical: "Technical",
  sebi: "SEBI / markets",
  hr: "HR / motivation",
  situational: "Situational",
};
