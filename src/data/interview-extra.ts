import type { InterviewItem } from "@/data/interview";

export const extraInterviewSets: {
  id: number;
  title: string;
  blurb: string;
}[] = [
  {
    id: 4,
    title: "Mock panel 4 — DBMS and filings",
    blurb:
      "Isolation anomalies, physical indexing, MVCC, recovery, SQL reasoning, and filing-data controls.",
  },
  {
    id: 5,
    title: "Mock panel 5 — Networks and cyber resilience",
    blurb:
      "TLS, DNS, zero trust, ransomware, observability, incident response, and cyber-governance principles.",
  },
  {
    id: 6,
    title: "Mock panel 6 — DSA and coding judgement",
    blurb:
      "Heaps, graphs, hashing, amortised analysis, language traps, and maintainable coding decisions.",
  },
  {
    id: 7,
    title: "Mock panel 7 — Markets infrastructure",
    blurb:
      "Trade lifecycle, clearing and settlement, T+0, blocked funds, insider controls, and research analysts.",
  },
  {
    id: 8,
    title: "Mock panel 8 — Regulator-scale systems design",
    blurb:
      "Surveillance ingestion, identity, evidence, case workflows, resilience, access control, and on-call operations.",
  },
  {
    id: 9,
    title: "Mock panel 9 — Integrity under pressure",
    blurb:
      "Gifts, confidential information, incident candour, privilege mistakes, procurement, and accountable escalation.",
  },
  {
    id: 10,
    title: "Mock panel 10 — Board-level judgement",
    blurb:
      "Public-purpose IT, measurable delivery, legal trade-offs, capacity, AI claims, sourcing, and executive communication.",
  },
];

export const extraInterviewItems: InterviewItem[] = [
  // —— Mock panel 4: DBMS and filings ——
  {
    id: "iv-4-01",
    set: 4,
    category: "technical",
    question:
      "Name the anomalies prevented at Read Committed, Repeatable Read, and Serializable. Where does write skew fit?",
    talkingPoints: [
      "Read Committed prevents dirty reads, but a repeated query may see changed rows and phantoms.",
      "Repeatable Read guarantees vary by engine; snapshot implementations can repeat reads yet still permit write skew.",
      "Write skew occurs when two transactions read the same invariant and update different rows, so row-level write conflicts do not catch it.",
      "Serializable must preserve the invariant through predicate locking, SSI, or explicit locking; test the target database rather than trusting a label.",
    ],
    followUp:
      "How would you protect an invariant that at least one of two approvers remains active?",
  },
  {
    id: "iv-4-02",
    set: 4,
    category: "technical",
    question:
      "You have an index on `(symbol, trade_time, client_id)`. Which predicates can use it efficiently, and why does column order matter?",
    talkingPoints: [
      "A B-tree can seek on the leftmost prefix: symbol alone, or symbol plus a trade-time range.",
      "Once a range is used on trade_time, client_id usually cannot further narrow the seek, though it may still be filtered from the index.",
      "A predicate on client_id alone generally needs another index or a scan because the leading columns are unconstrained.",
      "Choose order from real selectivity and query patterns; inspect the execution plan and row estimates before adding indexes.",
    ],
  },
  {
    id: "iv-4-03",
    set: 4,
    category: "technical",
    question:
      "How do NULLs affect `COUNT`, equality, joins, and uniqueness? Give the answer you would rely on in production.",
    talkingPoints: [
      "`COUNT(*)` counts rows, while `COUNT(column)` skips NULL; `SUM` and `AVG` also ignore NULL inputs.",
      "`col = NULL` is never true under three-valued logic; use `IS NULL` or `IS NOT NULL`.",
      "An inner equijoin does not match two NULL keys, so missing identifiers can silently disappear from reconciliation.",
      "Unique-constraint treatment of multiple NULLs is vendor-specific; verify engine semantics or enforce the business rule with a filtered index or constraint.",
    ],
  },
  {
    id: "iv-4-04",
    set: 4,
    category: "technical",
    question:
      "Explain MVCC to an interviewer, including why a long-running reader can become an operational problem.",
    talkingPoints: [
      "MVCC stores row versions so readers see a transaction-consistent snapshot without blocking ordinary writers.",
      "Each version carries transaction visibility metadata; a reader selects the newest version visible to its snapshot.",
      "Old versions cannot be reclaimed while an old snapshot may still need them, causing table or undo-space growth.",
      "Monitor transaction age, keep transactions short, and tune vacuum or purge; killing a blocker is a controlled operational decision.",
    ],
  },
  {
    id: "iv-4-05",
    set: 4,
    category: "technical",
    question:
      "What is write-ahead logging, and how can a database recover committed work without persisting every changed page at commit time?",
    talkingPoints: [
      "The log record describing a change must reach durable storage before the corresponding data page is flushed.",
      "Commit durability requires the transaction's commit record to be forced according to the configured durability policy.",
      "After a crash, recovery redoes committed changes not yet in data files and undoes incomplete work where the engine requires it.",
      "Checkpoints bound recovery work but do not replace WAL; backups plus archived logs enable point-in-time recovery.",
    ],
    followUp: "What failure remains if the WAL and data files share one failed disk?",
  },
  {
    id: "iv-4-06",
    set: 4,
    category: "technical",
    question:
      "Two filing updates deadlock. How does the database detect it, and how should the application respond?",
    talkingPoints: [
      "A wait-for graph cycle means transactions are mutually waiting; the engine selects a victim and rolls it back.",
      "The application should retry the whole transaction with bounded backoff, not continue after a partial statement failure.",
      "Acquire shared resources in a consistent order and keep lock-holding transactions short to reduce recurrence.",
      "Capture deadlock graphs and query context; raising lock timeouts only hides the ordering defect.",
    ],
  },
  {
    id: "iv-4-07",
    set: 4,
    category: "technical",
    question:
      "Optimistic locking or pessimistic locking for two officers editing the same case file—which would you choose?",
    talkingPoints: [
      "Optimistic locking stores a version number and rejects an update if the version changed since read; it suits low contention.",
      "Pessimistic locking reserves the row early and can be justified for short, high-conflict workflows, but blocks users and risks deadlocks.",
      "For human edits, do not hold a database transaction while a form sits open; use version checks and show a merge or refresh path.",
      "A maker-checker transition also needs an atomic state condition so two approvals cannot both consume the same pending version.",
    ],
  },
  {
    id: "iv-4-08",
    set: 4,
    category: "technical",
    question:
      "Why can adding an index make a system slower even when one dashboard query becomes faster?",
    talkingPoints: [
      "Every insert, delete, and indexed-column update must maintain another tree, adding CPU, I/O, and log volume.",
      "Indexes consume cache and storage; low-value indexes can evict hotter data and lengthen backup or replication work.",
      "A covering index avoids base-table lookups for one query, but wide included columns amplify write and storage cost.",
      "Use workload evidence, missing-index suggestions only as leads, and remove redundant prefixes after measuring.",
    ],
  },
  {
    id: "iv-4-09",
    set: 4,
    category: "technical",
    question:
      "Write the SQL idea for finding each broker's largest day-on-day jump in reported client count.",
    talkingPoints: [
      "First aggregate to one row per broker and reporting date if the source has multiple submissions.",
      "Use `LAG(client_count) OVER (PARTITION BY broker_id ORDER BY report_date)` to obtain the prior reported value.",
      "Compute the delta in an outer query, then use `ROW_NUMBER` ordered by delta descending to pick each broker's maximum.",
      "Define treatment of missing dates, restatements, and ties; window syntax cannot repair an ambiguous business definition.",
    ],
  },
  {
    id: "iv-4-10",
    set: 4,
    category: "technical",
    question:
      "A nightly file may be delivered twice after a timeout. How do you make ingestion idempotent without dropping a legitimate correction?",
    talkingPoints: [
      "Assign a stable delivery identity from source, business date, schema version, and content hash; retain the raw immutable file.",
      "Insert through a transaction with a uniqueness constraint or idempotency key, not a check-then-insert race.",
      "Treat identical content as a replay, but record a changed hash as a new revision linked to the superseded submission.",
      "Publish downstream only after validation and commit, with lineage that identifies exactly which revision produced each record.",
    ],
  },
  {
    id: "iv-4-11",
    set: 4,
    category: "sebi",
    question:
      "What data-quality controls would you put around structured filings received from thousands of regulated entities?",
    talkingPoints: [
      "Validate syntax and taxonomy version first, then business rules such as totals, date ranges, units, and cross-field consistency.",
      "Maintain reference masters for entity and instrument identifiers with effective dates; do not overwrite historical mappings.",
      "Score completeness, timeliness, validity, and reconciliation separately so one green average cannot conceal a severe defect.",
      "Return actionable rejection codes, retain every submitted version, and route material exceptions to domain officers rather than auto-correcting facts.",
    ],
    followUp:
      "How would you roll out a new taxonomy without rejecting every filer on day one?",
  },
  {
    id: "iv-4-12",
    set: 4,
    category: "situational",
    question:
      "After a database migration, source and target row counts match but monetary totals differ by 0.3%. Do you sign off?",
    talkingPoints: [
      "Do not sign off on row count alone; quarantine the release or limit exposure under the migration plan.",
      "Reconcile by date, entity, currency, and amount bands to localise whether precision, duplicate keys, or transformation logic caused the gap.",
      "Check decimal scale, timezone boundaries, NULL defaults, and rejected-row logs; preserve reproducible before-and-after extracts.",
      "Document impact and obtain business-owner acceptance only if the variance is explained and within an explicitly approved tolerance.",
    ],
  },

  // —— Mock panel 5: networks and cyber resilience ——
  {
    id: "iv-5-01",
    set: 5,
    category: "technical",
    question:
      "Walk through a modern TLS handshake from the server certificate to application-data keys.",
    talkingPoints: [
      "The client offers protocol versions, cipher suites, random material, and usually an ephemeral key share; the server selects compatible parameters.",
      "The server sends its certificate chain and proves possession of the private key; the client validates hostname, validity, chain, and trust anchor.",
      "Ephemeral Diffie–Hellman derives a shared secret, and a KDF creates separate authenticated-encryption traffic keys.",
      "TLS 1.3 removes obsolete choices and gives forward secrecy for normal handshakes; certificate validation failure must not be bypassed.",
    ],
    followUp: "What security property is lost if a static private key is later stolen?",
  },
  {
    id: "iv-5-02",
    set: 5,
    category: "technical",
    question:
      "A user types a portal hostname and receives a DNS answer. What happens, and where can an attacker interfere?",
    talkingPoints: [
      "The stub resolver checks local caches, then a recursive resolver follows root, TLD, and authoritative referrals when needed.",
      "Caching follows TTL and includes negative responses; stale or poisoned cache entries can redirect many clients.",
      "DNSSEC authenticates signed DNS data but does not encrypt queries; DoT or DoH protects the resolver path, not a dishonest authoritative source.",
      "TLS hostname validation remains essential even with secure DNS, while split-horizon records and failover TTLs need operational testing.",
    ],
  },
  {
    id: "iv-5-03",
    set: 5,
    category: "technical",
    question:
      "What does zero trust mean beyond the slogan 'never trust, always verify'?",
    talkingPoints: [
      "Make access decisions from verified identity, device posture, resource sensitivity, and current context—not office-network location alone.",
      "Use least-privilege, short-lived sessions, strong authentication, and policy enforcement near each resource.",
      "Segment workloads so one compromised endpoint cannot laterally reach filing, surveillance, and backup systems.",
      "Continuously log and re-evaluate high-risk access; zero trust is an architecture and operating model, not one VPN replacement product.",
    ],
  },
  {
    id: "iv-5-04",
    set: 5,
    category: "technical",
    question:
      "A ransomware note appears on an analyst workstation. What are your containment and recovery priorities?",
    talkingPoints: [
      "Isolate affected endpoints and segments while preserving memory, logs, ransom note, and other evidence; do not power off everything blindly.",
      "Disable or rotate compromised accounts and tokens, hunt for initial access and lateral movement, and protect backup control planes.",
      "Invoke the incident command structure with legal, cyber, business, and communication owners; keep a timestamped decision log.",
      "Rebuild from known-good images and tested offline or immutable backups only after closing persistence, then validate data integrity before reconnecting.",
    ],
  },
  {
    id: "iv-5-05",
    set: 5,
    category: "technical",
    question:
      "What should central security logging collect, and how do you keep the log platform from becoming either noise or a new target?",
    talkingPoints: [
      "Collect identity events, privileged actions, endpoint alerts, network flows, application decisions, and cloud control-plane changes with synchronised clocks.",
      "Normalise stable fields such as actor, asset, action, result, source, and correlation ID while retaining raw evidence.",
      "Tune detections to attack chains and asset criticality; measure false-positive load, missed coverage, and analyst response time.",
      "Restrict and separately audit log administration, encrypt transport and storage, enforce retention, and forward critical records to tamper-resistant storage.",
    ],
  },
  {
    id: "iv-5-06",
    set: 5,
    category: "technical",
    question:
      "When would you use mutual TLS, and what makes operating it harder than enabling ordinary HTTPS?",
    talkingPoints: [
      "mTLS authenticates both peers and is useful for service-to-service links or tightly managed institutional clients.",
      "It does not decide application permission by itself; map certificate identity to a least-privilege service role.",
      "Operations must issue, rotate, revoke, and inventory client certificates without outages, including overlap during renewal.",
      "Protect private keys in managed keystores or HSMs and alert on expiry, unexpected issuers, and use from an unusual workload.",
    ],
  },
  {
    id: "iv-5-07",
    set: 5,
    category: "technical",
    question:
      "Differentiate a network firewall, WAF, IDS, and endpoint detection. Why is one of them not enough?",
    talkingPoints: [
      "A network firewall enforces connection policy mainly from addresses, ports, protocols, and sometimes application identity.",
      "A WAF inspects HTTP semantics for patterns such as injection, but cannot repair unsafe business authorization.",
      "IDS or IPS detects suspicious network activity; EDR observes host processes, files, persistence, and response actions.",
      "They cover different points in an attack path; identity controls, secure code, patching, and monitored response still determine containment.",
    ],
  },
  {
    id: "iv-5-08",
    set: 5,
    category: "technical",
    question:
      "How would you protect a public investor portal from a volumetric DDoS and an application-layer exhaustion attack?",
    talkingPoints: [
      "Use upstream scrubbing, anycast CDN capacity, and provider coordination for traffic that can saturate the internet link.",
      "At the application edge, rate-limit by several signals, cache safe reads, cap expensive request work, and queue bounded submissions.",
      "Separate static status information from transactional paths so investors can still see incident guidance under load.",
      "Load-test degradation modes and protect the origin address; autoscaling alone can amplify cost or move the bottleneck to the database.",
    ],
  },
  {
    id: "iv-5-09",
    set: 5,
    category: "technical",
    question:
      "An OAuth access token is stolen. What limits its value to the attacker?",
    talkingPoints: [
      "Short expiry, narrow audience and scopes, and least-privilege authorization reduce usable lifetime and blast radius.",
      "Keep bearer tokens out of URLs and logs, store browser sessions in secure HttpOnly cookies where appropriate, and protect endpoints with TLS.",
      "Rotate refresh tokens and detect reuse; revoke the session or credential family when compromise is confirmed.",
      "For higher assurance, sender-constrained tokens bind use to a client key, while resource servers still validate issuer, audience, expiry, and signature.",
    ],
  },
  {
    id: "iv-5-10",
    set: 5,
    category: "sebi",
    question:
      "At a high level, what outcomes do SEBI cyber-resilience directions expect from regulated entities?",
    talkingPoints: [
      "Board and senior management must own cyber risk, with defined accountability rather than treating it as an outsourced IT checklist.",
      "Critical assets need inventory, risk-based protection, continuous monitoring, vulnerability management, and controlled third-party access.",
      "Entities need tested incident response, backups, business continuity, and timely reporting through the applicable SEBI or market-infrastructure channel.",
      "Requirements differ by entity class and evolve through circulars; state principles confidently but verify the latest framework, scope, and timelines before advising.",
    ],
  },
  {
    id: "iv-5-11",
    set: 5,
    category: "technical",
    question:
      "A widely used software library announces a critical supply-chain compromise. How do you determine your exposure?",
    talkingPoints: [
      "Query software bills of materials, lockfiles, container inventories, and deployed versions—not only source repositories.",
      "Determine whether the vulnerable component and code path are present, reachable, and exposed in each environment.",
      "Apply vendor mitigation or a tested upgrade, restrict exploit paths meanwhile, and hunt logs for indicators dating before disclosure.",
      "Verify signatures and provenance for replacement artefacts, then record residual risk and improve dependency inventory where discovery was slow.",
    ],
  },
  {
    id: "iv-5-12",
    set: 5,
    category: "situational",
    question:
      "A regulated entity asks you to delay recording its cyber incident until it knows whether customer data escaped. What do you say?",
    talkingPoints: [
      "Do not let uncertainty erase the initial incident time; record known facts, source, severity indicators, and open questions immediately.",
      "Apply the current reporting threshold and timeline, escalating to the authorised cyber and supervisory officers rather than negotiating informally.",
      "Separate an initial notification from later confirmed impact; updates can correct facts while preserving the chronology.",
      "Avoid attribution or public claims without evidence, but preserve logs and containment actions so the eventual assessment is defensible.",
    ],
  },

  // —— Mock panel 6: DSA and coding judgement ——
  {
    id: "iv-6-01",
    set: 6,
    category: "technical",
    question:
      "How would you maintain the median of a live stream of latency measurements?",
    talkingPoints: [
      "Keep the lower half in a max-heap and the upper half in a min-heap, with sizes differing by at most one.",
      "Insert into the appropriate heap, then rebalance by moving one root; each update is O(log n).",
      "The median is one root for odd count or a carefully computed average of both roots for even count.",
      "For a sliding window, heaps also need delayed deletion or indexed handles because an expired non-root value cannot be removed cheaply.",
    ],
  },
  {
    id: "iv-6-02",
    set: 6,
    category: "technical",
    question:
      "When does Dijkstra's algorithm fail, and what would you choose for negative edges or an unweighted graph?",
    talkingPoints: [
      "Dijkstra relies on non-negative edge weights so extracting the current minimum finalises that distance.",
      "A reachable negative edge can produce a cheaper path after finalisation; Bellman–Ford handles negatives and detects reachable negative cycles.",
      "For unweighted graphs, BFS gives shortest edge-count paths in O(V+E) without a priority queue.",
      "With adjacency lists and a binary heap, Dijkstra is O((V+E) log V); stale heap entries can replace decrease-key if checked.",
    ],
  },
  {
    id: "iv-6-03",
    set: 6,
    category: "technical",
    question:
      "A hash table is advertised as O(1). Explain collisions, resizing, and the worst case honestly.",
    talkingPoints: [
      "Expected O(1) assumes a suitable hash distribution and controlled load factor; distinct keys can map to the same bucket.",
      "Separate chaining stores a bucket collection, while open addressing probes alternative slots and requires careful deletion markers.",
      "Resize to a larger table and rehash when load grows; one resize is O(n), but geometric growth makes insertion amortised O(1).",
      "Adversarial collisions can degrade operations to O(n), so runtimes may randomise hashes or treeify crowded buckets.",
    ],
  },
  {
    id: "iv-6-04",
    set: 6,
    category: "technical",
    question:
      "Why is appending to a dynamic array amortised O(1) even though some appends copy every element?",
    talkingPoints: [
      "Most appends write into spare capacity; when full, capacity grows geometrically and existing elements are copied.",
      "Across n appends, copied counts form a geometric series below a constant multiple of n, so total work is O(n).",
      "Growing by one slot each time would copy 1+2+…+n elements and make total work O(n²).",
      "Amortised is a sequence guarantee, not a latency guarantee for one append; reserve capacity when a pause matters.",
    ],
  },
  {
    id: "iv-6-05",
    set: 6,
    category: "technical",
    question:
      "Java: what breaks if `equals` is overridden but `hashCode` is not?",
    talkingPoints: [
      "Equal objects must return the same hash code; otherwise a HashMap may place logically equal keys in different buckets.",
      "A later lookup or removal with an equal object can fail even though list-based equality tests succeed.",
      "Use the same immutable identity fields in both methods; mutating a key after insertion can also make it unreachable.",
      "Records generate value-based methods, but the chosen components and their mutability still need domain review.",
    ],
  },
  {
    id: "iv-6-06",
    set: 6,
    category: "technical",
    question:
      "C++: explain object slicing and one way it can silently defeat polymorphism.",
    talkingPoints: [
      "Copying a derived object into a base object by value retains only the base subobject; derived fields and dynamic type are sliced away.",
      "A function taking `Base` by value therefore invokes base virtual behaviour on its local sliced object, not the original derived object.",
      "Pass by reference or pointer for polymorphism, and use `std::unique_ptr<Base>` when transferring ownership.",
      "Containers of base values also slice; store owning smart pointers or a deliberate value-polymorphism wrapper.",
    ],
  },
  {
    id: "iv-6-07",
    set: 6,
    category: "technical",
    question:
      "Python: does the GIL make a dictionary-based cache thread-safe?",
    talkingPoints: [
      "The GIL permits only one thread to execute Python bytecode at a time in common CPython builds, but it is not a cache correctness contract.",
      "A read-modify-write sequence spans operations and can interleave; C extensions and I/O may release the GIL.",
      "Use a lock around the invariant or a purpose-built concurrent design, and do not rely on current atomic implementation details.",
      "Threads can help I/O-bound work; CPU-bound parallelism often needs processes, native code, or an architecture suited to the runtime version.",
    ],
  },
  {
    id: "iv-6-08",
    set: 6,
    category: "technical",
    question:
      "Show two bugs in `mid = (low + high) / 2` during binary search and state the loop invariant.",
    talkingPoints: [
      "`low + high` can overflow a fixed-width integer; compute `low + (high - low) / 2` when bounds are valid.",
      "Ambiguous inclusive versus half-open bounds causes skipped elements or infinite loops; choose one convention and update it consistently.",
      "For `[low, high)`, the target, if present, remains inside that interval and termination occurs when low equals high.",
      "For lower-bound search, move high to mid when the predicate is true and low to mid+1 otherwise; test empty and one-element inputs.",
    ],
  },
  {
    id: "iv-6-09",
    set: 6,
    category: "technical",
    question:
      "How does union–find detect whether adding an edge creates a cycle in an undirected graph?",
    talkingPoints: [
      "Initially each vertex is its own set; an edge whose endpoints already have the same representative closes a cycle.",
      "Otherwise union their sets; union by rank or size prevents tall trees.",
      "Path compression flattens parent links during find, giving near-constant amortised time O(α(n)).",
      "This method does not directly detect directed cycles; use DFS colouring or topological ordering there.",
    ],
  },
  {
    id: "iv-6-10",
    set: 6,
    category: "technical",
    question:
      "A dependency graph must produce a deployment order. How do you find one and report a useful cycle?",
    talkingPoints: [
      "Topological ordering exists only for a directed acyclic graph; Kahn's algorithm repeatedly removes zero-indegree vertices.",
      "Maintain adjacency lists and indegrees for O(V+E); if fewer than V vertices are emitted, a cycle remains.",
      "A DFS with white, grey, and black states can reconstruct a concrete cycle from a back edge and parent pointers.",
      "Return the cycle path in the error so operators can fix dependencies, instead of only saying sorting failed.",
    ],
  },
  {
    id: "iv-6-11",
    set: 6,
    category: "technical",
    question:
      "Design an O(1) LRU cache and explain which invariant makes it work.",
    talkingPoints: [
      "A hash map locates each key's node in expected O(1); a doubly linked list orders nodes from most to least recently used.",
      "Get moves the found node to the front; put updates or inserts there and evicts the tail when capacity is exceeded.",
      "The invariant is one list node per map entry with both structures updated atomically on every mutation.",
      "Production concerns include locking, memory-based rather than item-count limits, expiry semantics, and avoiding cache stampedes.",
    ],
  },
  {
    id: "iv-6-12",
    set: 6,
    category: "situational",
    question:
      "A colleague replaces clear O(n log n) code with a clever expected-O(n) algorithm that benchmarks 8% faster. Would you merge it?",
    talkingPoints: [
      "Check representative input sizes, distributions, tail latency, memory, and adversarial worst cases before accepting the benchmark claim.",
      "Ask whether the 8% affects an actual service objective or is hidden behind I/O; profile the end-to-end path.",
      "Require tests for invariants and edge cases plus comments or references sufficient for future maintainers.",
      "Merge only if measured operational value outweighs complexity and risk; record the benchmark so the decision can be revisited.",
    ],
  },

  // —— Mock panel 7: markets infrastructure ——
  {
    id: "iv-7-01",
    set: 7,
    category: "sebi",
    question:
      "Follow one cash-equity trade from matching to final settlement. What do the exchange, clearing corporation, depository, and clearing bank each do?",
    talkingPoints: [
      "The exchange matches orders and creates an executed trade with member and client records.",
      "The clearing corporation novates eligible trades, calculates obligations and margins, and manages settlement and counterparty default risk.",
      "Clearing banks move funds for members, while depositories and their participants move securities between demat accounts.",
      "Reconciliation links the same trade through all legs; finality requires both pay-in and pay-out controls, not merely an exchange confirmation.",
    ],
  },
  {
    id: "iv-7-02",
    set: 7,
    category: "sebi",
    question:
      "What must change operationally to offer optional T+0 settlement alongside T+1?",
    talkingPoints: [
      "Trading systems must identify the settlement segment and enforce earlier funds, securities, custody, and instruction cut-offs.",
      "Clearing, banks, depositories, custodians, and brokers need intraday straight-through messages and rapid exception handling.",
      "Liquidity may fragment between otherwise similar T+0 and T+1 instruments, so price discovery and investor choice need monitoring.",
      "Shorter exposure reduces settlement risk but compresses fraud checks, reconciliation, and failure remediation into the same day.",
    ],
  },
  {
    id: "iv-7-03",
    set: 7,
    category: "sebi",
    question:
      "Explain the blocked-funds mechanism for a retail secondary-market trade and the investor-protection logic behind it.",
    talkingPoints: [
      "The investor authorises a block in the bank account rather than transferring trading funds upfront to the broker.",
      "After the trade and clearing obligation are known, only the required amount is debited through the authorised market workflow.",
      "This reduces broker custody and misuse risk, but requires reliable bank, clearing, broker, and exchange status reconciliation.",
      "Systems must handle expiry, partial use, cancellation, duplicate callbacks, and clear investor consent without treating a block as a completed debit.",
    ],
  },
  {
    id: "iv-7-04",
    set: 7,
    category: "sebi",
    question:
      "What are trading-window closure, pre-clearance, and contra-trade restrictions trying to achieve for insiders?",
    talkingPoints: [
      "Window closure restricts designated persons from trading during periods when they are likely to possess unpublished price-sensitive information.",
      "Pre-clearance creates an accountable check before trades above the entity's prescribed threshold; it is not proof that no UPSI exists.",
      "Contra-trade restrictions deter short-term opposite trades, subject to the applicable code and approved exceptions.",
      "A compliance system needs designated-person lists, instrument coverage, effective dates, approvals, holdings, and exchange or depository reconciliation.",
    ],
  },
  {
    id: "iv-7-05",
    set: 7,
    category: "sebi",
    question:
      "Why regulate research analysts, and where can their incentives conflict with investors?",
    talkingPoints: [
      "Investors may rely on apparently expert recommendations, so registration, qualification, disclosures, and conduct standards address information asymmetry.",
      "Conflicts include issuer payments, investment-banking relationships, proprietary positions, compensation links, and selective advance sharing.",
      "Research should distinguish fact, assumption, valuation method, risk, and recommendation while disclosing relevant interests.",
      "A large social-media following does not remove regulatory obligations; examine the substance, consideration, and applicable current framework.",
    ],
  },
  {
    id: "iv-7-06",
    set: 7,
    category: "sebi",
    question:
      "How do the primary and secondary markets differ, and why does disclosure quality connect them?",
    talkingPoints: [
      "In a primary issue, securities are issued and capital generally flows to the issuer or selling holders under an offer process.",
      "In the secondary market, investors trade existing securities and the issuer ordinarily receives no sale proceeds.",
      "Offer documents establish the initial information base; continuing listed-entity disclosures let the secondary market reprice over time.",
      "Poor or unequal disclosure raises information asymmetry and cost of capital, so timely machine-readable and human-readable access matters.",
    ],
  },
  {
    id: "iv-7-07",
    set: 7,
    category: "sebi",
    question:
      "What do margins and a clearing corporation's default waterfall protect against?",
    talkingPoints: [
      "Initial margin covers plausible future exposure during close-out; variation or mark-to-market margin settles current price movement.",
      "The clearing corporation monitors collateral quality, concentration, and member exposures rather than relying on yesterday's balance sheet.",
      "On default, defaulter resources are used under prescribed rules before mutualised layers and other waterfall resources.",
      "Stress tests examine extreme but plausible scenarios; a waterfall allocates loss and incentives but cannot make counterparty risk disappear.",
    ],
  },
  {
    id: "iv-7-08",
    set: 7,
    category: "sebi",
    question:
      "A seller does not deliver shares on settlement day. What happens, and what should the IT trail show?",
    talkingPoints: [
      "The clearing process identifies the short delivery and applies the applicable auction or close-out mechanism and penalties.",
      "The buyer's eventual securities or funds outcome follows market rules; the broker should communicate status rather than fabricate a normal settlement.",
      "The trail should link trade, net obligation, pay-in shortfall, member or client allocation, auction result, and final credit.",
      "Exceptions need age and value monitoring because repeated shortages may indicate weak controls or abusive behaviour.",
    ],
  },
  {
    id: "iv-7-09",
    set: 7,
    category: "sebi",
    question:
      "How does securities lending and borrowing support settlement and short selling?",
    talkingPoints: [
      "SLB provides a regulated mechanism for a lender to temporarily transfer securities against agreed terms and collateral.",
      "A borrower can meet delivery for a permitted short sale, improving settlement discipline and market liquidity.",
      "Corporate benefits and recall or return obligations must be handled under the mechanism so the lender's economics are addressed.",
      "Systems track contract, lender, borrower, collateral, fees, settlement dates, and failure; it is not an uncovered informal share loan.",
    ],
  },
  {
    id: "iv-7-10",
    set: 7,
    category: "technical",
    question:
      "How would you reconcile a corporate action across issuer, exchange, depository, and broker records?",
    talkingPoints: [
      "Create a canonical event keyed by instrument and event type, with announcement, ex-date, record date, ratio or amount, and source versions.",
      "Validate timeline and terms across authoritative feeds; changes become revisions with lineage, not in-place silent edits.",
      "Calculate expected entitlements from record-date positions, then compare aggregate and account-level credits with tolerances appropriate to cash or securities.",
      "Route breaks by cause—identifier mapping, late position, tax, rounding, or missing instruction—and retain approval and resolution evidence.",
    ],
  },
  {
    id: "iv-7-11",
    set: 7,
    category: "sebi",
    question:
      "A finfluencer says a post is 'education, not advice' while naming a target price. What questions should a regulator ask?",
    talkingPoints: [
      "Examine substance: specificity, repeated recommendations, calls to act, personalised interaction, and whether consideration or business activity exists.",
      "Identify compensation, referral links, issuer relationships, holdings, trading around the post, and undisclosed conflicts.",
      "Preserve the post, edits, audience, timestamps, linked channels, and payment trail before content disappears.",
      "Apply the current legal framework and facts; a disclaimer cannot automatically override conduct, but popularity alone is not proof of a violation.",
    ],
  },
  {
    id: "iv-7-12",
    set: 7,
    category: "situational",
    question:
      "A market-wide reconciliation shows a small settlement mismatch five minutes before cut-off. Operations wants to override it. What do you do?",
    talkingPoints: [
      "Quantify affected securities, members, value, and whether the mismatch can create wrong debits, credits, or settlement failure.",
      "Compare independent source totals and last known-good run; preserve inputs and do not overwrite the failed result.",
      "Use only an authorised, logged override with named business and clearing owners, defined scope, and a rollback or correction path.",
      "Escalate before cut-off with facts and options; urgency changes the response speed, not evidence or segregation of duties.",
    ],
  },

  // —— Mock panel 8: regulator-scale systems design ——
  {
    id: "iv-8-01",
    set: 8,
    category: "technical",
    question:
      "Design a surveillance pipeline that ingests orders and trades from multiple venues and raises cases within minutes.",
    talkingPoints: [
      "Land immutable, partitioned raw events with venue sequence number, event time, receive time, schema version, and checksum.",
      "Validate and deduplicate before a stateful stream layer computes windows and joins orders, cancels, trades, reference data, and identities.",
      "Rules emit explainable alerts with evidence references; a separate case layer supports triage, linking, notes, and disposition.",
      "Scale by venue, date, or instrument while handling late and out-of-order data; reconcile stream results to end-of-day source totals.",
      "Measure ingestion lag, sequence gaps, rule latency, alert yield, replay correctness, and case backlog—not only CPU usage.",
    ],
  },
  {
    id: "iv-8-02",
    set: 8,
    category: "technical",
    question:
      "How would you build identity resolution when PAN, demat, bank, phone, address, and broker records disagree?",
    talkingPoints: [
      "Keep source identifiers and effective dates intact; normalise formats but never discard the original evidence.",
      "Use deterministic links for trusted exact identifiers, then scored probabilistic links for weaker attributes with explainable features.",
      "Represent entities and relationships as a versioned graph with confidence, provenance, and manual-review decisions.",
      "False merges can contaminate investigations, so use thresholds by purpose, maker-checker overrides, and the ability to split and replay history.",
    ],
  },
  {
    id: "iv-8-03",
    set: 8,
    category: "technical",
    question:
      "Design audit logging that can support enforcement evidence without exposing sensitive data to every operator.",
    talkingPoints: [
      "Record actor, delegated identity, action, target, before-and-after reference, time, request ID, reason, and policy decision.",
      "Append to access-controlled, tamper-evident storage with retention and legal-hold rules; hash chaining can reveal alteration but needs protected anchors.",
      "Separate audit writers from readers and alert on privileged searches, exports, retention changes, and logging failures.",
      "Minimise sensitive payloads in routine logs while preserving authorised evidence links; test retrieval and chain of custody, not merely ingestion.",
    ],
  },
  {
    id: "iv-8-04",
    set: 8,
    category: "technical",
    question:
      "A filing deadline creates 100 times normal traffic for fifteen minutes. How would the portal absorb it without accepting a filing twice?",
    talkingPoints: [
      "Terminate requests behind rate-aware load balancing and autoscale stateless validation, but protect databases with bounded queues and backpressure.",
      "Give each submission a client-visible idempotency key and durable receipt before asynchronous heavy processing.",
      "Store the original object once, then drive state transitions through transactional outbox events so retries cannot create a second filing.",
      "Pre-scale for known deadlines, load-test the complete dependency chain, and provide status polling rather than encouraging repeated uploads.",
    ],
  },
  {
    id: "iv-8-05",
    set: 8,
    category: "technical",
    question:
      "Define useful SLOs and alerts for a regulatory data platform. Why is '99.9% uptime' insufficient?",
    talkingPoints: [
      "Users need freshness, completeness, correctness, and query availability; a live dashboard with yesterday's trades is functionally down.",
      "Define indicators such as source sequence completeness, p95 ingestion delay, successful case creation, and authorised query success.",
      "Alert on fast and slow error-budget burn with dependency context, so on-call sees actionable symptoms rather than every transient spike.",
      "Publish maintenance and exception rules, then review SLO misses with business impact; an annual average can hide a failure at market open.",
    ],
  },
  {
    id: "iv-8-06",
    set: 8,
    category: "technical",
    question:
      "How do data lineage and model governance change when an alert may lead to regulatory action?",
    talkingPoints: [
      "Version raw sources, transformations, reference data, features, rule or model artefacts, thresholds, and deployment approvals.",
      "For any alert, reproduce which inputs and code version created it and explain the factors that drove its score.",
      "Validate with time-split data, document limitations and protected-data risks, and monitor drift, calibration, yield, and investigator outcomes.",
      "A model prioritises review rather than declaring guilt; material changes need controlled validation, rollback, and retained historical behaviour.",
    ],
  },
  {
    id: "iv-8-07",
    set: 8,
    category: "technical",
    question:
      "How would you roll out a new surveillance rule without flooding officers or missing misconduct?",
    talkingPoints: [
      "Backtest on representative historical periods, including volatile days, and compare alerts against known cases and sampled normal activity.",
      "Run in shadow mode to measure volume, latency, overlap, and segment-level concentration without changing officer queues.",
      "Set thresholds from investigation capacity and risk, then use a canary scope with a named rollback owner.",
      "Capture dispositions and reasons to tune the rule, but protect against feedback bias where only high-scoring alerts ever receive labels.",
    ],
  },
  {
    id: "iv-8-08",
    set: 8,
    category: "technical",
    question:
      "What would a regulator's case-management system need beyond a generic ticketing tool?",
    talkingPoints: [
      "Model allegations, entities, instruments, linked alerts, evidence, statutory milestones, approvals, correspondence, and case relationships.",
      "Enforce role and matter-based access, conflict screens, maker-checker actions, and sealed or need-to-know material.",
      "Preserve immutable history while allowing corrected metadata through explicit revisions; generate defensible chronology and evidence exports.",
      "Support workload and ageing views without leaking sensitive case details, and integrate through stable IDs rather than spreadsheet hand-offs.",
    ],
  },
  {
    id: "iv-8-09",
    set: 8,
    category: "technical",
    question:
      "Design disaster recovery for a system whose database is healthy but whose primary region is unreachable.",
    talkingPoints: [
      "Start from business-approved RTO and RPO, then replicate data, objects, configuration, keys, and identity dependencies to an isolated failure domain.",
      "Use health-checked, controlled failover with fencing so the old primary cannot resume writes and create split brain.",
      "Promote in dependency order, validate data and critical journeys, redirect traffic, and communicate degraded functions and recovery checkpoints.",
      "Exercise regional loss regularly, including staff access and vendor dependencies; replication can faithfully copy corruption, so point-in-time backups remain necessary.",
    ],
  },
  {
    id: "iv-8-10",
    set: 8,
    category: "technical",
    question:
      "How would you enforce least privilege when hundreds of officers move between departments and cases?",
    talkingPoints: [
      "Base durable access on job roles and department, then add time-bound case or task attributes for sensitive resources.",
      "Drive joiner-mover-leaver changes from the authoritative HR source and remove old entitlements during transfers, not at the next annual review.",
      "Require approval and expiry for privileged elevation, use separate admin identities, and log both grant and use.",
      "Run periodic owner attestations and analyse toxic combinations, dormant rights, and emergency access; count orphaned entitlements as a control metric.",
    ],
  },
  {
    id: "iv-8-11",
    set: 8,
    category: "technical",
    question:
      "Your real-time alert count and overnight recomputation differ. How do you design for a defensible answer?",
    talkingPoints: [
      "Give every source event a stable ID and retain event time, arrival time, version, and deduplication decision.",
      "Define watermark and late-data policy explicitly; real-time output can be provisional while the batch run incorporates accepted late events.",
      "Use the same tested business logic or compare two implementations with controlled fixtures to avoid silent semantic drift.",
      "Produce a reconciliation table explaining each difference—late, corrected, duplicate, reference-data revision, or defect—and update cases through versioned amendments.",
    ],
  },
  {
    id: "iv-8-12",
    set: 8,
    category: "situational",
    question:
      "At market open, the surveillance queue is delayed, the filing portal is slow, and one executive dashboard is blank. What gets your attention first?",
    talkingPoints: [
      "Use public and regulatory impact, time criticality, legal deadlines, data-loss risk, and available workarounds—not seniority of the caller.",
      "Assign separate responders if possible; establish one incident lead and a shared timeline so fixes do not compete for dependencies.",
      "Prioritise the surveillance delay if it impairs live risk detection, while protecting a filing deadline and serving a cached or manual executive view.",
      "State assumptions and reassess at fixed checkpoints; communicate owners, current impact, workaround, and next update for each incident.",
    ],
  },

  // —— Mock panel 9: integrity under pressure ——
  {
    id: "iv-9-01",
    set: 9,
    category: "situational",
    question:
      "A vendor bidding for a renewal sends an expensive festival gift to your home. What exactly do you do?",
    talkingPoints: [
      "Do not use or quietly pass on the gift; preserve the delivery details and notify the designated ethics or vigilance channel promptly.",
      "Follow the organisation's gift policy for refusal, return, or deposit and obtain a written record of disposition.",
      "Disclose your role in the procurement and recuse if required so the evaluation remains independently defensible.",
      "Keep vendor communication factual and through official channels; do not trade favourable treatment for making the incident disappear.",
    ],
  },
  {
    id: "iv-9-02",
    set: 9,
    category: "situational",
    question:
      "Your uncle asks whether a company's draft offer document will be cleared soon because he wants to invest. How do you respond?",
    talkingPoints: [
      "Do not confirm timing, concerns, or even non-public process status; an internal regulatory decision can affect investment behaviour.",
      "Say he must rely on public filings and announcements and make his own decision; do not give a wink, delay hint, or recommendation.",
      "Record and report the approach under the applicable internal conduct rules if required, especially if questions persist.",
      "Review personal and connected-person dealing obligations and keep yourself away from the security where a conflict or information restriction applies.",
    ],
  },
  {
    id: "iv-9-03",
    set: 9,
    category: "situational",
    question:
      "A screenshot of a confidential internal dashboard appears in a WhatsApp group. What are your first actions?",
    talkingPoints: [
      "Do not forward it for verification; preserve minimal evidence of the message, sender context, group, and time without widening distribution.",
      "Notify the incident, information-security, and responsible business channels and request preservation through authorised process.",
      "Assess what fields, cases, or credentials are visible, who had access, and whether public or market-moving exposure is ongoing.",
      "Contain through access or link revocation where safe, preserve audit logs, and let authorised teams handle takedown, notification, and attribution.",
    ],
  },
  {
    id: "iv-9-04",
    set: 9,
    category: "situational",
    question:
      "A scheduled DR drill fails, but your manager suggests marking it 'partially successful' to avoid escalation. What do you do?",
    talkingPoints: [
      "Report the tested objectives and evidence separately: what started, what failed, actual recovery time, data state, and untested assumptions.",
      "A label cannot hide that the approved RTO or critical journey was missed; inaccurate reporting creates a larger operational and governance risk.",
      "Propose immediate risk controls, an owner and date for remediation, and a scoped retest while the evidence is fresh.",
      "If pressure to misstate persists, use the documented escalation or assurance channel and retain professional records.",
    ],
  },
  {
    id: "iv-9-05",
    set: 9,
    category: "situational",
    question:
      "You accidentally grant a contractor production-admin access and discover it twenty minutes later. What now?",
    talkingPoints: [
      "Revoke the grant or disable the account immediately through the approved emergency path, without deleting evidence.",
      "Determine whether credentials were issued and used by checking identity, session, command, data-access, and change logs for the exact interval.",
      "Notify the security and system owners with facts, rotate exposed secrets if access made them reachable, and preserve a timeline.",
      "Own the error, assess impact, and fix the grant workflow with scope previews, approval, expiry, or policy guardrails rather than blaming the contractor.",
    ],
  },
  {
    id: "iv-9-06",
    set: 9,
    category: "situational",
    question:
      "During an inquiry, a senior colleague asks you to delete a raw log because it contains unrelated personal data. What do you do?",
    talkingPoints: [
      "Do not alter potential evidence ad hoc; preserve the original under the applicable retention or legal-hold process.",
      "Limit access and create an authorised redacted working copy if unrelated personal data should not be exposed to reviewers.",
      "Record provenance, redaction method, approver, and hashes so the working copy can be tied to the unchanged original.",
      "Escalate conflicting privacy and evidentiary duties to legal, investigation, and data-governance owners for a documented decision.",
    ],
  },
  {
    id: "iv-9-07",
    set: 9,
    category: "situational",
    question:
      "Your reporting officer asks you to remove a severe finding from a vendor assessment because replacement would delay launch. How do you handle it?",
    talkingPoints: [
      "Keep the finding, evidence, likelihood, impact, and affected control explicit; delivery pressure does not change the observed risk.",
      "Offer options such as remediation before launch, compensating controls, narrowed scope, phased launch, or formal risk acceptance.",
      "Ensure the authorised risk owner—not the assessor or vendor—accepts any residual risk with expiry and review conditions.",
      "Escalate attempts to suppress the record through the prescribed governance route while remaining factual and non-accusatory.",
    ],
  },
  {
    id: "iv-9-08",
    set: 9,
    category: "situational",
    question:
      "Your former employer is shortlisted for a contract you will technically evaluate. Is disclosure enough?",
    talkingPoints: [
      "Disclose the relationship, recency, financial interests, personal ties, and any confidential knowledge before accessing bid details.",
      "Let the designated authority decide recusal or safeguards; self-declaring that you can remain objective is not sufficient.",
      "If recused, lose access to documents, discussions, scoring, and informal influence, with a substitute evaluator recorded.",
      "Protect both sides' confidential information and document the control so the procurement outcome withstands later scrutiny.",
    ],
  },
  {
    id: "iv-9-09",
    set: 9,
    category: "situational",
    question:
      "A capable teammate asks to use your privileged account because their access approval is stuck and a deadline is near. What do you do?",
    talkingPoints: [
      "Refuse credential sharing because it defeats attribution, least privilege, and revocation even if you watch the work.",
      "Escalate the pending request or use an approved emergency-access process with named authorization, narrow scope, and automatic expiry.",
      "If policy permits, execute a specific command yourself only under a valid ticket while retaining responsibility and logs; do not create a shadow delegation.",
      "Afterward, fix the access lead-time or on-call role design that made bypassing controls seem necessary.",
    ],
  },
  {
    id: "iv-9-10",
    set: 9,
    category: "situational",
    question:
      "Your surveillance rule wrongly flags a well-known investor, who criticises SEBI publicly. Should you clear the alert quickly?",
    talkingPoints: [
      "Public profile and criticism should neither accelerate clearance nor imply guilt; apply the same evidence and review standard.",
      "Check source completeness, rule version, threshold, identity match, and comparable alerts before disposition.",
      "Record why the alert is closed, retained, or escalated, with independent review where sensitivity warrants it.",
      "Only authorised communication teams address public claims; the analyst should protect case confidentiality and improve the rule if a systemic false positive exists.",
    ],
  },
  {
    id: "iv-9-11",
    set: 9,
    category: "situational",
    question:
      "You discover that a number in a board note you prepared is wrong after the meeting has begun. What do you do?",
    talkingPoints: [
      "Verify the correction and impact rapidly, then tell the note owner or chair through the available official channel before decisions rely on it.",
      "State the incorrect figure, corrected figure, cause, and whether conclusions change; do not bury it in a later formatting update.",
      "Issue a versioned correction and preserve the original distribution trail so recipients know which note is authoritative.",
      "After the meeting, add source links, peer checks, or automated reconciliation proportionate to how the error escaped.",
    ],
  },
  {
    id: "iv-9-12",
    set: 9,
    category: "hr",
    question:
      "What does loyalty to your team mean when reporting a mistake may embarrass the team?",
    talkingPoints: [
      "Loyalty means protecting the institution's mandate, users, evidence, and colleagues from a larger concealed failure—not protecting appearances.",
      "Raise the issue early with verified facts, impact, containment, and a repair plan, giving responsible owners a fair chance to act.",
      "Avoid public blame and distinguish a good-faith error from misconduct, while using formal escalation if material risk remains unaddressed.",
      "Accept your own contribution and build a learning control; candour and procedural fairness can coexist.",
    ],
  },

  // —— Mock panel 10: board-level judgement ——
  {
    id: "iv-10-01",
    set: 10,
    category: "hr",
    question:
      "Why does IT inside a statutory regulator require different judgement from IT in a normal product company?",
    talkingPoints: [
      "Systems implement statutory process and can affect market access, investor rights, confidentiality, and evidentiary fairness—not only conversion or revenue.",
      "Decisions need explainability, consistent treatment, records, segregation of duties, accessibility, and routes for authorised correction or appeal.",
      "Peak-market resilience and long retention may outweigh rapid feature experimentation, while procurement and public accountability constrain choices.",
      "Good regulatory IT still measures users and delivery speed, but optimises for mandate, trust, and defensible outcomes rather than engagement alone.",
    ],
  },
  {
    id: "iv-10-02",
    set: 10,
    category: "hr",
    question:
      "Explain one project in sixty seconds and include a number that proves value rather than activity.",
    talkingPoints: [
      "Use a compact arc: user problem, baseline, your specific decision, delivery constraint, measured result, and one lesson.",
      "Choose an outcome such as error rate, p95 latency, manual hours, recovery time, or reconciliation breaks—not commits, meetings, or lines of code.",
      "State measurement window and denominator: 'failures fell from 3.2% to 0.7% over four weeks' is more credible than 'improved reliability'.",
      "Separate your contribution from the team's and mention one trade-off or limitation so the number does not sound manufactured.",
    ],
  },
  {
    id: "iv-10-03",
    set: 10,
    category: "situational",
    question:
      "A lawyer says every deleted case record must be recoverable forever; you believe that creates security and privacy risk. How do you disagree?",
    talkingPoints: [
      "First clarify the legal purpose, record classes, holds, limitation periods, and meaning of deletion rather than arguing from storage cost.",
      "Explain risks concretely: indefinite sensitive-data exposure, discovery burden, conflicting obligations, and inability to honour approved disposal.",
      "Propose a retention schedule with legal holds, immutable evidence where required, deletion approvals, and auditable destruction by class.",
      "Document unresolved assumptions and take the decision to the authorised legal and records-governance owners; engineering should not invent retention law.",
    ],
  },
  {
    id: "iv-10-04",
    set: 10,
    category: "technical",
    question:
      "The board is offered an ML platform to solve peak-capacity failures. How do you separate capacity engineering from AI hype?",
    talkingPoints: [
      "Start with demand, service-level objective, bottleneck, utilisation, queue depth, and failure mode; prediction cannot add CPU, I/O, or downstream capacity.",
      "Fix load testing, admission control, caching, backpressure, scaling, and graceful degradation before proposing a model.",
      "Forecasting may help pre-scale predictable deadlines, but compare it with a calendar rule and require measurable incremental benefit.",
      "Pilot against a baseline with false forecast costs, override and fallback; reject a solution whose value cannot be observed independently of the vendor.",
    ],
  },
  {
    id: "iv-10-05",
    set: 10,
    category: "situational",
    question:
      "You have one budget request: improve ransomware recovery or add a visible investor-facing feature. How do you brief the board?",
    talkingPoints: [
      "Quantify current recovery gap against approved RTO and RPO, critical services affected, control test results, and plausible loss or mandate impact.",
      "Describe the feature's user outcome with evidence and statutory urgency rather than dismissing it as cosmetic.",
      "Present options: fund recovery first, reduce feature scope, sequence delivery, or explicitly accept residual risk with accountable ownership.",
      "Recommend based on risk and mandate, name what will not be delivered, and define success measures for the chosen spend.",
    ],
  },
  {
    id: "iv-10-06",
    set: 10,
    category: "technical",
    question:
      "When should a regulator build a platform, buy a product, or use a managed service?",
    talkingPoints: [
      "Keep differentiating statutory rules, sensitive evidence handling, and integration control close; buy commodity capability where the market is mature.",
      "Compare total lifecycle cost: customisation, licences, skilled operations, upgrades, migration, exit, audit, and concentration risk.",
      "Assess data control, security assurance, service levels, source or configuration portability, subcontractors, and failure or termination support.",
      "Use a bounded proof with acceptance and exit criteria; a hybrid choice is common, but unclear responsibility is not a strategy.",
    ],
  },
  {
    id: "iv-10-07",
    set: 10,
    category: "sebi",
    question:
      "A surveillance model has 95% accuracy. What would you ask before showing that number to the board?",
    talkingPoints: [
      "Ask the base rate and confusion matrix; a model can reach 95% by predicting no misconduct when positives are rare.",
      "Measure precision, recall, calibration, investigator capacity, and cost of missed versus unnecessary reviews at the chosen threshold.",
      "Check time-based validation, leakage, segment performance, drift, and whether labels reflect proven outcomes or past analyst choices.",
      "Report model-assisted workflow outcomes and limitations, with human review and appeal or correction controls—not one headline accuracy figure.",
    ],
  },
  {
    id: "iv-10-08",
    set: 10,
    category: "technical",
    question:
      "How would you persuade senior management to fund technical-debt work that users cannot see?",
    talkingPoints: [
      "Translate debt into missed releases, incident frequency, recovery time, security exposure, vendor dependence, or rising unit cost.",
      "Bring trend and incident evidence, then identify the smallest debt item that removes a concrete delivery or control bottleneck.",
      "Bundle remediation into product work where practical, but keep ownership and capacity visible so it is not perpetually displaced.",
      "Commit to an outcome measure such as deployment lead time, unsupported components retired, or recurring incidents eliminated.",
    ],
  },
  {
    id: "iv-10-09",
    set: 10,
    category: "sebi",
    question:
      "Should a regulator use generative AI to summarise public filings for officers?",
    talkingPoints: [
      "Start with a narrow assistive use: public source documents, citations to exact passages, and an officer retaining decision responsibility.",
      "Evaluate omission and hallucination by filing type and language, not only fluent examples; compare against search and deterministic extraction.",
      "Prevent confidential prompts from entering unapproved services, define retention and model-provider terms, and log model and prompt versions.",
      "Label generated text, make correction easy, monitor reliance, and prohibit autonomous legal or enforcement conclusions without validated controls.",
    ],
  },
  {
    id: "iv-10-10",
    set: 10,
    category: "technical",
    question:
      "A critical regulatory system depends on two vendor engineers who alone understand it. What is your board-level response?",
    talkingPoints: [
      "Treat key-person and supplier concentration as operational risk: map privileged knowledge, source access, runbooks, dependencies, and contract exit rights.",
      "Require joint operations, documentation tested by independent staff, code and configuration custody, and cross-training tied to milestones.",
      "Exercise restore, failover, deployment, and incident diagnosis without those individuals to reveal false documentation confidence.",
      "Track reduction through tasks independently completed, access recertification, and recovery exercises; consider transition or escrow if the vendor does not cooperate.",
    ],
  },
  {
    id: "iv-10-11",
    set: 10,
    category: "hr",
    question:
      "Which three technology metrics would you put on a SEBI board dashboard, and which metric would you refuse to show alone?",
    talkingPoints: [
      "Use service health tied to mandate: critical-journey SLO or data freshness, significant incident impact and recovery, and overdue high-risk control exposure.",
      "Add trend, target, scope, and material exceptions so green averages cannot hide a failed market-open window or one critical system.",
      "Connect each metric to an owner and decision; a dashboard that cannot trigger action becomes reporting theatre.",
      "Refuse raw alert count, ticket count, or uptime alone because volume lacks severity, outcome, and completeness context.",
    ],
  },
  {
    id: "iv-10-12",
    set: 10,
    category: "situational",
    question:
      "In your first months, officers ask for quick dashboards while core data is inconsistent. How do you earn trust without overpromising?",
    talkingPoints: [
      "Shadow the workflow and publish a short data map: authoritative sources, owners, known breaks, critical definitions, and deadline pain.",
      "Deliver one bounded view with visible freshness and reconciliation status, avoiding polished totals that cannot be defended.",
      "Agree a parallel foundation plan for identifiers, quality rules, lineage, and ownership, sequenced by regulatory impact.",
      "Report progress with corrected breaks and time saved, invite officer validation, and state uncertainty explicitly until controls support stronger claims.",
    ],
  },
];
