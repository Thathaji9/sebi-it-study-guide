import type { TopicId } from "@/lib/types";

export type NoteBlock = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type TopicNote = {
  topic: TopicId;
  title: string;
  blocks: NoteBlock[];
};

export const notes: TopicNote[] = [
  {
    topic: "database",
    title: "Database Concepts — revision",
    blocks: [
      {
        heading: "Normal forms (exam order)",
        body: "1NF: atomic values. 2NF: 1NF + no partial dependency on a composite key. 3NF: 2NF + no transitive dependency of non-prime attributes. BCNF: every determinant is a candidate key (stricter than 3NF).",
      },
      {
        heading: "Keys",
        body: "Superkey: uniquely identifies a tuple. Candidate key: minimal superkey. Primary key: chosen candidate. Foreign key: refers to a candidate key of another (or same) relation.",
      },
      {
        heading: "Relational algebra vs calculus",
        body: "Algebra is procedural (σ, π, ∪, −, ×, ⋈). Tuple/domain calculus is declarative. Join is not primitive: ⋈ = σ(×) [+ π].",
      },
      {
        heading: "Indexing & files",
        body: "Dense index: one entry per record. Sparse: one per block, needs ordered file. B-tree: keys in all nodes. B+ tree: all records at leaves, leaves linked for range scans.",
      },
      {
        heading: "Transactions",
        body: "ACID. Conflict serializability ⇔ acyclic precedence graph. 2PL: grow then shrink. Strict 2PL: hold X-locks until commit (no cascading abort). Dirty read / non-repeatable / phantom / lost update.",
      },
    ],
  },
  {
    topic: "sql",
    title: "SQL Queries — revision",
    blocks: [
      {
        heading: "DML vs DDL you’ll be asked",
        body: "DELETE: DML, row-by-row, WHERE, triggers, rollback. TRUNCATE: DDL in most engines, all rows, typically no DELETE triggers. DROP: removes the object. ALTER: schema change.",
      },
      {
        heading: "Joins",
        body: "INNER: matches only. LEFT/RIGHT/FULL OUTER: preserve that side, NULL-pad the other. CROSS: Cartesian product.",
      },
      {
        heading: "WHERE vs HAVING",
        body: "WHERE filters rows before GROUP BY. HAVING filters groups after aggregates. COUNT(*) counts rows; COUNT(col) skips NULLs.",
      },
      {
        heading: "Sets and subqueries",
        body: "UNION distinct, UNION ALL keeps duplicates. EXCEPT/MINUS: first minus second. INTERSECT: overlap. EXISTS: true if any row. NOT IN + NULL in the list yields UNKNOWN — prefer NOT EXISTS.",
      },
    ],
  },
  {
    topic: "programming",
    title: "Java / C / C++ — revision",
    blocks: [
      {
        heading: "Binding & polymorphism",
        body: "Overloading and operator overloading: compile-time. Virtual / overridden instance methods: runtime (dynamic dispatch on the object, not the reference type). Java fields, static and private methods: compile-time.",
      },
      {
        heading: "Parameter passing",
        body: "C/Java primitives: pass-by-value. Java objects: pass-by-value of the reference (callee cannot rebind caller’s variable). C++: pass-by-value, pointer, or reference (&).",
      },
      {
        heading: "Object lifetime",
        body: "Java constructor: same name, no return type, super()/this() first. C++ destructor runs at end of scope or delete. If you delete via a base pointer, the base destructor should be virtual.",
      },
      {
        heading: "Exceptions",
        body: "catch most-specific first. Java finally runs on both success and catch (except JVM halt). C++ stack unwinding calls destructors.",
      },
      {
        heading: "Dry-run habits",
        body: "Trace a table of variables. Watch i++ vs ++i, String immutability, and whether a method mutates an object or rebinds a local copy.",
      },
    ],
  },
  {
    topic: "python",
    title: "Python / R — revision",
    blocks: [
      {
        heading: "Slicing",
        body: "s[start:stop:step] is half-open. Negative indices count from the end. range(2, 8, 2) → 2,4,6.",
      },
      {
        heading: "Mutability",
        body: "Mutable: list, dict, set. Immutable: tuple, str, frozenset. b = a on a list aliases; b.append changes a. Mutable default arguments are created once — never use acc=[].",
      },
      {
        heading: "pandas reshape",
        body: "melt / stack: wide → long. pivot: long → wide. merge: SQL join. groupby + agg: GROUP BY. DataFrame is the exam workhorse; Series is one column.",
      },
      {
        heading: "Regex (Python re)",
        body: "\\d digit, \\w word, \\s space, . any (except newline). {m,n} counts. ^ $ anchors. [A-Z] class. findall returns all non-overlapping matches.",
      },
    ],
  },
  {
    topic: "algorithms",
    title: "Algorithms — revision",
    blocks: [
      {
        heading: "Traversals",
        body: "BFS: queue, shortest hops in unweighted graphs, connected components. DFS: stack/recursion, cycle detect, topo sort on DAGs, connected components.",
      },
      {
        heading: "Shortest paths & MST",
        body: "Dijkstra: non-negative weights. Bellman–Ford: negatives, detects negative cycles. Floyd–Warshall: all-pairs DP. Kruskal: sort edges + Union-Find. Prim: grow tree from a vertex.",
      },
      {
        heading: "Sorting / hashing / search",
        body: "Merge sort: D&C, stable, Θ(n log n). Heap sort: not stable, Θ(n log n). Quicksort average n log n, worst n². Binary search needs sorted random-access. Chaining search ~ 1+α.",
      },
      {
        heading: "Design techniques",
        body: "Greedy: Huffman, Kruskal, activity selection, fractional knapsack. DP: 0/1 knapsack, LCS, Fibonacci. D&C: merge/quick, binary search. Backtracking: N-Queens, subsets.",
      },
    ],
  },
  {
    topic: "networking",
    title: "Networking — revision",
    blocks: [
      {
        heading: "OSI cheat sheet",
        body: "7 App, 6 Presentation, 5 Session, 4 Transport (TCP/UDP), 3 Network (IP, routing), 2 Data-link (MAC, Ethernet), 1 Physical. TCP/IP collapses 5–7 into Application.",
      },
      {
        heading: "Devices",
        body: "Hub: physical, repeats bits. Switch: MAC table, frames. Router: IP, subnets. Gateway: often protocol translation / default route off the LAN. Firewall: filter (stateless ACL or stateful session table).",
      },
      {
        heading: "Ports to memorise",
        body: "FTP 21 (data 20/passive), SSH 22, SMTP 25, DNS 53, HTTP 80, POP3 110, IMAP 143, HTTPS 443.",
      },
      {
        heading: "LAN",
        body: "Classic Ethernet: CSMA/CD + exponential backoff. Token Ring: token. Switched Ethernet is what you actually see today — collisions are rare.",
      },
    ],
  },
  {
    topic: "security",
    title: "Cyber Security — revision",
    blocks: [
      {
        heading: "CIA",
        body: "Confidentiality: no unauthorised disclosure (encryption, access control). Integrity: no undetected change (hash, MAC, signatures). Availability: usable when needed (redundancy, DDoS defence).",
      },
      {
        heading: "Attacks vs controls",
        body: "Phishing: social engineering. SQLi: parameterise queries. XSS: escape output / CSP. CSRF: anti-csrf tokens. MITM: TLS. Buffer overflow: memory-safe languages, ASLR, NX.",
      },
      {
        heading: "Authentication factors",
        body: "Know (password), have (token, card), are (biometric). MFA uses two different categories. Hash passwords with a slow salted KDF; do not store reversible encryption of passwords.",
      },
      {
        heading: "Audit",
        body: "Network audit: topology, firewall rules, segmentation, IDS. Systems audit: OS hardening, identity, patches, application logs, access rights.",
      },
    ],
  },
  {
    topic: "warehouse",
    title: "Data Warehousing — revision",
    blocks: [
      {
        heading: "ETL",
        body: "Extract → Transform (clean, conform) → Load. Metadata describes sources, grain, owners, refresh. Staging holds raw extracts.",
      },
      {
        heading: "Models",
        body: "Star: denormalised dimensions around a fact table of measures + FKs. Snowflake: normalised dimensions. Data mart: department slice. Cube: pre-aggregated OLAP (slice, dice, roll-up, drill-down).",
      },
    ],
  },
  {
    topic: "shell",
    title: "Shell Programming — revision",
    blocks: [
      {
        heading: "Specials",
        body: "$0 script, $1..$9 args, $# count, $@ all args, $? last exit status (0 = success), $$ PID, $! last background PID.",
      },
      {
        heading: "Tests and loops",
        body: "[ -f file ] regular file, -d dir, -r readable, -z empty string. Spaces around [ ] are required. if/then/fi, for x in ...; do ...; done. Exit with return in a function, exit in a script.",
      },
      {
        heading: "Commands",
        body: "ls -la, cat, grep -i, wc, chmod, ps, kill, pipe |, redirect >, >>, 2>. awk/sed show up as “basic UNIX” extras.",
      },
    ],
  },
  {
    topic: "ds",
    title: "Data Structures — revision",
    blocks: [
      {
        heading: "Complexities to recite",
        body: "Array index O(1), insert middle O(n). Singly list insert-after O(1), search O(n). Stack/queue O(1) ends. BST search average O(log n), worst O(n). Heap insert/extract O(log n), get-min/max O(1). Hash expected O(1).",
      },
      {
        heading: "Traversals",
        body: "Inorder BST = sorted keys. Preorder = root first (prefix). Postorder = children then root. Level order = BFS.",
      },
      {
        heading: "JSON",
        body: "Object = key/value map (Python dict / Java Map). Array = ordered list. Nesting is normal. Treat as a tree when tracing.",
      },
    ],
  },
  {
    topic: "strings",
    title: "String Manipulation — revision",
    blocks: [
      {
        heading: "Off-by-one",
        body: "Java substring(i, j) and Python s[i:j] are [i, j). C++ s.substr(pos, count) uses a length, not an end index. len/length count characters (Unicode caveats exist but exams use ASCII).",
      },
      {
        heading: "Search",
        body: "Java indexOf, C++ find (npos if missing), Python str.find / re.search. Regex character classes and anchors decide whether a match is a substring or the whole string.",
      },
    ],
  },
  {
    topic: "oops",
    title: "OOP — revision",
    blocks: [
      {
        heading: "Four pillars",
        body: "Abstraction: essential interface. Encapsulation: hide state. Inheritance: reuse/extend. Polymorphism: one name, many behaviours (overload vs override).",
      },
      {
        heading: "Access",
        body: "C++: private / protected / public. Java adds package-private (default) and protected-includes-package. Python: convention (_ / __ name mangling), not true privacy.",
      },
    ],
  },
  {
    topic: "ga",
    title: "Financial GA for SEBI — revision",
    blocks: [
      {
        heading: "SEBI facts",
        body: "Statutory body under SEBI Act, 1992. HQ Mumbai. Regulates securities markets, intermediaries, listed companies (LODR), FPI, mutual funds, insider trading (PIT), fraud (PFUTP).",
      },
      {
        heading: "Market plumbing",
        body: "Primary vs secondary market. Exchanges, depositories (NSDL/CDSL), clearing corporations. Cash equity T+1 (T+0 being phased). Circuit breakers, F&O, G-Secs, corporate bonds.",
      },
      {
        heading: "RBI overlap",
        body: "Repo, SDF/reverse repo, CRR, SLR, inflation targeting. Know that SEBI ≠ RBI: banks vs securities. Both appear in Paper 1 GA.",
      },
    ],
  },
];

export function noteFor(topic: TopicId): TopicNote | undefined {
  return notes.find((n) => n.topic === topic);
}
