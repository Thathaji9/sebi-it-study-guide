import type { TopicNote } from "@/data/notes";

export const notesDatabase: TopicNote = {
  topic: "database",
  title: "Database Concepts — worked notes",
  blurb:
    "GATE / SEBI Grade A IT traces for the ER model, keys, normalisation with full FD closures, relational algebra versus tuple calculus, indexes, and concurrency. Copy every numbered dry-run onto paper before you look at the answer line.",
  blocks: [
    {
      heading: "ER model: entity, relationship, cardinality, weak entity",
      body: "An entity type is a set of distinguishable real-world objects that share the same attributes. A strong (regular) entity has its own key attribute; a weak entity has no key of its own and is identified only through an identifying relationship with an owner plus a partial key (discriminator). On an ER diagram the weak entity is drawn with a double rectangle, the identifying relationship with a double diamond, and total participation of the weak side is mandatory: every weak instance must belong to exactly one owner.\n\nA relationship type associates entity types. Cardinality on a binary relationship is one of 1:1, 1:N or M:N and is read from the mini-world, not from wishful table design. Participation is total if every entity must appear in at least one relationship instance, otherwise partial. Mapping to tables is mechanical: a strong entity becomes a relation whose primary key is the entity key; a 1:N relationship is stored as a foreign key on the N-side; an M:N relationship becomes its own relation whose key is the pair of participant keys; a weak entity becomes a relation whose primary key is (owner key, partial key).\n\nTernary relationships are not the same as three binary ones. If a SEBI inspection involves (officer, intermediary, circular) as a single fact — this officer inspected this intermediary against this circular — you cannot reconstruct that fact from the three pairwise tables. Always ask whether the association is inherently three-way before you split it.\n\nAttribute types that trip MCQs: simple versus composite (address = {city, pin}), single-valued versus multi-valued (a broker with many SEBI registration numbers needs a separate table), and derived (age from date of birth is not stored). A multi-valued attribute of a strong entity maps to its own relation with key (entity key, multi-valued attribute).",
      bullets: [
        "Weak entity PK = owner PK + partial key; identifying relationship is 1:N from owner to weak, total on the weak side.",
        "1:N → FK on the N-side; M:N → separate relation; 1:1 → FK on the total-participation side (or either side if both partial).",
        "Cardinality is a constraint on relationship instances, not a count of attributes.",
      ],
      examples: [
        {
          title: "Identify the weak entity and write its primary key",
          prompt:
            "A depository participant (DP) is identified by dp_id. Each DP maintains many demat-account schedules. A schedule is not unique by date alone: two DPs may both have a schedule dated 2026-04-01. A schedule line-item (isin, qty) exists only as part of a schedule. Draw the identifying chain and state the primary key of LINE_ITEM.",
          steps: [
            "Mark DP as a strong entity: it has its own key dp_id.",
            "Schedule has no global key. Date distinguishes schedules only within one DP, so date is a partial key and Schedule is weak, identified by DP through an identifying relationship Maintains.",
            "Primary key of SCHEDULE after mapping is (dp_id, date).",
            "LINE_ITEM is weak under Schedule. Its discriminator is isin (one ISIN appears at most once on a given schedule). qty is a descriptive attribute, not part of the key.",
            "The identifying chain is DP → Schedule → Line_item. Copy the owner key down at each step.",
            "Therefore LINE_ITEM maps to a relation with primary key (dp_id, date, isin) and a non-key attribute qty, plus a foreign key (dp_id, date) referencing SCHEDULE.",
          ],
          result:
            "LINE_ITEM primary key is (dp_id, date, isin); Schedule is weak under DP, Line_item is weak under Schedule.",
        },
        {
          title: "Map a 1:N relationship with partial participation",
          prompt:
            "Entity BROKER(broker_id, name) and entity CITY(city_code, city_name). Mini-world: a broker is headquartered in at most one city; a city may host many brokers; some cities host none; every broker must have a headquarters city. Map to relations and place the foreign key.",
          code: "BROKER(broker_id, name, hq_city)\nCITY(city_code, city_name)\n-- hq_city references CITY.city_code, NOT NULL",
          language: "sql",
          steps: [
            "Read cardinality: many brokers to one city, so BROKER—N:1—CITY.",
            "Participation: brokers are total (every broker has a city); cities are partial (a city may have zero brokers).",
            "The 1:N rule puts the foreign key on the N-side, which is BROKER. Add attribute hq_city referencing CITY.city_code.",
            "Total participation of BROKER forces hq_city NOT NULL (entity-integrity analogue for the relationship).",
            "Do not put a broker_id column on CITY: that would force a city to have at most one broker and would break the N-side.",
            "CITY stays (city_code, city_name) with no broker attributes. Optional city-with-no-broker rows exist because participation of CITY is partial.",
          ],
          result:
            "BROKER(broker_id, name, hq_city NOT NULL FK→CITY); CITY unchanged. FK lives on the N-side.",
        },
        {
          title: "M:N mapping for circulars and intermediaries",
          prompt:
            "A SEBI circular applies to many intermediaries; an intermediary is subject to many circulars. The date on which the intermediary acknowledged the circular is an attribute of the relationship, not of either entity. Write the mapped relations and the key of the relationship table.",
          code: "CIRCULAR(circ_id, title)\nINTERMEDIARY(int_id, legal_name)\nACK(circ_id, int_id, ack_date)\n-- ACK.circ_id → CIRCULAR, ACK.int_id → INTERMEDIARY\n-- PRIMARY KEY (circ_id, int_id)",
          language: "sql",
          steps: [
            "Entities CIRCULAR and INTERMEDIARY are both strong; give each its own key relation.",
            "The association is M:N, so it cannot be stored as a single foreign key on either side without losing history of multiple partners.",
            "Create relationship relation ACK with two foreign keys circ_id and int_id.",
            "Relationship attribute ack_date sits on ACK, not on CIRCULAR (a circular is not acknowledged on one global date) and not on INTERMEDIARY (an intermediary acknowledges many circulars on different dates).",
            "The default primary key of an M:N relationship relation is the pair of participant keys (circ_id, int_id), assuming one acknowledgement per pair.",
            "If the mini-world allowed a pair to acknowledge twice, ACK would become a weak-style table with a discriminator such as ack_seq, and the key would be (circ_id, int_id, ack_seq).",
          ],
          result:
            "Three relations; ACK(circ_id, int_id, ack_date) with PK (circ_id, int_id) holds the relationship attribute.",
        },
        {
          title: "Cardinality from a constraint sentence",
          prompt:
            "Constraint: “Each trade is executed by exactly one trading member. A trading member executes zero or more trades. A trade may be cleared by at most one clearing member; a clearing member may clear many trades.” For relationships Executes and Clears, write cardinality and participation of each side.",
          steps: [
            "Executes involves TRADE and TRADING_MEMBER. “Each trade is executed by exactly one trading member” means TRADE participates totally with cardinality 1 toward TRADING_MEMBER.",
            "“A trading member executes zero or more trades” means TRADING_MEMBER participates partially (zero is allowed) with cardinality N toward TRADE.",
            "So Executes is N:1 from TRADE to TRADING_MEMBER, total on TRADE, partial on TRADING_MEMBER.",
            "Clears involves TRADE and CLEARING_MEMBER. “At most one clearing member” is cardinality 1 on the clearing side, but “at most” (not “exactly”) means TRADE participates only partially in Clears — some trades may still be unmatched.",
            "“A clearing member may clear many trades” is cardinality N on the clearing-member side, and “may” keeps participation partial.",
            "Mapping check: Executes puts a NOT NULL FK trading_member_id on TRADE. Clears puts a nullable FK clearing_member_id on TRADE. Two different columns; do not merge them.",
          ],
          result:
            "Executes is N:1 total on TRADE; Clears is N:1 partial on TRADE (nullable FK). Both are 1:N from the member side.",
        },
      ],
    },
    {
      heading: "Relational model, keys, and integrity",
      body: "The relational model stores data as relations (tables) of tuples over a fixed heading of attributes. A superkey is any set of attributes whose values uniquely identify a tuple: no two distinct tuples agree on all superkey attributes. A candidate key is a minimal superkey: drop any attribute and uniqueness is lost. One candidate key is chosen as the primary key; the others are alternate keys. A foreign key is a (possibly composite) set of attributes in one relation whose values must match a candidate key of another relation, or be null if the schema allows.\n\nEntity integrity: no primary-key attribute may be null, because a null cannot identify a tuple. Referential integrity: every non-null foreign-key value must equal some existing candidate-key value in the referenced relation. Domain integrity restricts each attribute to its declared domain. User-defined integrity covers CHECK constraints and assertions (for example qty > 0).\n\nCounting superkeys is a standard GATE move. If a relation has n attributes and a single candidate key of size k, every superset of that candidate key is a superkey, so there are 2^{n−k} superkeys. If several candidate keys exist, take the union of their supersets and do not double-count sets that contain two different candidates.\n\nA foreign key may reference the same relation (supervisor_id in EMPLOYEE). On delete/update, the engine may NO ACTION / RESTRICT (reject the parent change), CASCADE (propagate), SET NULL, or SET DEFAULT. CASCADE on a self-referential FK can wipe a whole reporting tree; SEBI-style schemas usually RESTRICT deletes of a member that still has trades.",
      bullets: [
        "Superkey ⊇ candidate key; primary key is one chosen candidate; alternate keys are the rest.",
        "Entity integrity: PK ≠ NULL. Referential integrity: FK is NULL or matches a live parent key.",
        "Number of superkeys for one CK of size k in n attributes: 2^{n−k}.",
      ],
      examples: [
        {
          title: "Count superkeys of ALERT(rule, desk, city, severity)",
          prompt:
            "Relation ALERT(rule, desk, city, severity) with the only non-trivial FDs rule → desk city severity. How many superkeys does ALERT have? List them.",
          steps: [
            "Attributes: {rule, desk, city, severity}; n = 4.",
            "Closure: rule+ = {rule, desk, city, severity} = all attributes, so {rule} is a candidate key.",
            "No other singleton works: desk+ = {desk}, city+ = {city}, severity+ = {severity}.",
            "There is exactly one candidate key, of size k = 1. Superkeys are all supersets of {rule}. Count = 2^{4−1} = 8.",
            "List: {rule}, {rule,desk}, {rule,city}, {rule,severity}, {rule,desk,city}, {rule,desk,severity}, {rule,city,severity}, {rule,desk,city,severity}.",
            "Sets that omit rule, such as {desk,city,severity}, are not superkeys because two alerts of different rules could share the same desk, city and severity.",
          ],
          result:
            "Eight superkeys: every subset that contains rule. The only candidate key is {rule}.",
        },
        {
          title: "Find all candidate keys of TRADE(isin, member, day, venue, qty)",
          prompt:
            "FDs: isin member day → venue qty, and venue → member. Work out every candidate key.",
          steps: [
            "Attributes U = {isin, member, day, venue, qty}.",
            "Compute closures of likely left-hand sides. venue+ = {venue, member}. That is not U.",
            "(isin, member, day)+ = {isin, member, day, venue, qty} = U, so {isin, member, day} is a superkey.",
            "Is it minimal? Drop isin: (member, day)+ does not get isin. Drop member: (isin, day)+ gets nothing extra from the given FDs. Drop day: (isin, member)+ does not get day. So {isin, member, day} is a candidate key.",
            "Because venue → member, replace member by venue in that key: (isin, venue, day)+ = {isin, venue, day, member, qty} = U. Minimality: drop isin or day and you lose uniqueness; drop venue and you have {isin, day} which does not determine member. So {isin, venue, day} is a second candidate key.",
            "No other candidates: qty is never on a left-hand side, so it cannot appear in a minimal key. {isin, member, venue, day} is a superkey but not a candidate (it properly contains both CKs).",
          ],
          result:
            "Candidate keys are {isin, member, day} and {isin, venue, day}. Prime attributes: isin, member, day, venue. qty is non-prime.",
        },
        {
          title: "Entity integrity versus a nullable unique column",
          prompt:
            "Table MEMBER(member_id PK, sebi_reg UNIQUE, legal_name). Can sebi_reg be NULL for a newly licensed member awaiting a number? Can member_id be NULL? What happens if two rows have sebi_reg NULL under SQL UNIQUE?",
          code: "CREATE TABLE member (\n  member_id  CHAR(8) PRIMARY KEY,\n  sebi_reg   VARCHAR(16) UNIQUE,\n  legal_name VARCHAR(80) NOT NULL\n);",
          language: "sql",
          steps: [
            "member_id is the primary key. Entity integrity forbids NULL in any PK attribute, so member_id cannot be NULL.",
            "sebi_reg is an alternate key in the textbook sense only if it is unique and not null. SQL UNIQUE allows multiple NULLs in most engines because NULL is not equal to NULL, so two unreadied members can both sit with sebi_reg NULL.",
            "That SQL behaviour is weaker than the relational alternate-key rule. If the exam asks “candidate key”, the column must be unique and non-null.",
            "A newly licensed member can therefore be inserted with sebi_reg NULL without violating the SQL UNIQUE constraint, but that row is identified only by member_id.",
            "Inserting a second member with an already used non-null sebi_reg fails UNIQUE. Inserting a second NULL sebi_reg typically succeeds.",
            "Exam takeaway: PRIMARY KEY implies UNIQUE + NOT NULL; UNIQUE alone does not imply NOT NULL and is not automatically a candidate key.",
          ],
          result:
            "member_id cannot be NULL; sebi_reg may be NULL under SQL UNIQUE; UNIQUE+NULL is not a candidate key.",
        },
        {
          title: "Referential integrity on delete of a parent trade venue",
          prompt:
            "VENUE(venue_id PK, name). TRADE(trade_id PK, venue_id FK → VENUE, qty). VENUE contains {BSE, NSE}. TRADE contains (T1, NSE, 100) and (T2, BSE, 50). What happens under ON DELETE RESTRICT versus ON DELETE CASCADE versus ON DELETE SET NULL if we delete the NSE parent row?",
          code: "ALTER TABLE trade\n  ADD CONSTRAINT fk_venue\n  FOREIGN KEY (venue_id) REFERENCES venue(venue_id)\n  ON DELETE RESTRICT;",
          language: "sql",
          steps: [
            "Child T1 references NSE, so the NSE parent is not a dangling-free delete.",
            "ON DELETE RESTRICT (or NO ACTION at commit): the DELETE FROM venue WHERE venue_id = 'NSE' is rejected; both venue rows and both trades remain.",
            "ON DELETE CASCADE: deleting NSE also deletes T1. Remaining: VENUE{BSE}, TRADE{(T2,BSE,50)}.",
            "ON DELETE SET NULL: deleting NSE sets T1.venue_id to NULL. This is legal only if TRADE.venue_id is nullable. Remaining trades: (T1, NULL, 100), (T2, BSE, 50).",
            "Entity integrity is not violated by a NULL foreign key; referential integrity requires only that non-null FKs match. A NULL venue means “venue unknown”, not “venue NSE”.",
            "SEBI-style ledgers almost always RESTRICT deletes of a venue that still has trades, so history is not silently cascaded away.",
          ],
          result:
            "RESTRICT rejects the delete; CASCADE removes T1; SET NULL keeps T1 with venue_id NULL (if the column allows NULL).",
        },
      ],
    },
    {
      heading: "Functional dependencies, 1NF and 2NF",
      body: "A functional dependency X → Y holds on relation R if whenever two tuples agree on X they agree on Y. Trivial FDs have Y ⊆ X. Armstrong’s axioms (reflexivity, augmentation, transitivity) plus union and decomposition let you derive the closure F+ of a set of FDs. The attribute closure X+ under F is the set of attributes determined by X; the standard algorithm seeds X+ with X and repeatedly adds the right-hand side of any FD whose left-hand side is already inside X+.\n\nFirst normal form (1NF) requires a single atomic value at every row-column intersection: no repeating groups, no nested relations, no “isin1, isin2” packed into one cell. A composite attribute that has been flattened into separate columns (city, pin) is still 1NF. Exam traps that look like 1NF violations are often multi-valued facts stuffed into one cell.\n\nSecond normal form (2NF) applies only when a candidate key is composite. A relation in 1NF is in 2NF if no non-prime attribute is partially dependent on a candidate key, i.e. there is no non-trivial FD X → A with A non-prime, X a proper subset of some candidate key, and A not in X. If every candidate key is a single attribute, 2NF is automatic.\n\nWhen you test a schema on paper, never skip the closures. You cannot classify prime versus non-prime until every candidate key is known, and you cannot see a partial dependency until you know the keys. The worked examples below always list attributes, close FDs, find keys, then test 1NF and 2NF.",
      bullets: [
        "X+ algorithm: start with X; add RHS whenever LHS ⊆ current closure; repeat to a fixpoint.",
        "1NF: atomic cells. Repeating groups fail 1NF even if the rest of the design is tidy.",
        "2NF: no non-prime attribute depends on a proper subset of a candidate key.",
      ],
      examples: [
        {
          title: "Attribute closure A+ with a chain and a blocker",
          prompt:
            "F = {A → B, B → C, CD → E, E → C, G → A}. Compute A+ and AG+. Which attributes are missing from A+ and why?",
          steps: [
            "Seed A+ with {A}.",
            "A → B applies, so add B. Now {A, B}.",
            "B → C applies, so add C. Now {A, B, C}.",
            "CD → E does not apply: D is not in the set. E → C does not add anything new. G → A is irrelevant because G is not in A+. Fixpoint: A+ = {A, B, C}.",
            "Missing D, E, G. D never appears on a right-hand side reachable from A; without D you cannot fire CD → E, so E stays out; G is a determinant of A, not a dependent of A.",
            "Now AG+: seed {A, G}. G → A is already satisfied. Same chain gives B and C. Still no D, so still no E. AG+ = {A, B, C, G}. Adding G does not unlock D or E.",
          ],
          result: "A+ = ABC; AG+ = ABCG. D and E are not determined by A or by AG.",
        },
        {
          title: "1NF violation in a holdings cell",
          prompt:
            "A junior dumps portfolio rows as HOLD(pan, isins) with one row ('AAAPA1111A', 'INE001A,INE002B,INE003C'). Is HOLD in 1NF? How do you rewrite it, and what becomes the key?",
          code: "-- bad: repeating group in one cell\n-- HOLD(pan, isins)\n\n-- 1NF rewrite:\nCREATE TABLE hold (\n  pan  CHAR(10),\n  isin CHAR(12),\n  PRIMARY KEY (pan, isin)\n);",
          language: "sql",
          steps: [
            "1NF demands atomic values. The isins cell contains a list, which is a repeating group, so HOLD is not in 1NF.",
            "Splitting the list in the application layer without changing the schema does not create 1NF; the column type still allows a list.",
            "Rewrite as one row per (pan, isin) pair. Each cell is now atomic.",
            "A PAN can hold many ISINs and an ISIN can be held by many PANs, so the key of the 1NF relation is composite (pan, isin).",
            "Do not keep a qty in the same cell as isin. If quantity exists it is a separate atomic attribute: HOLD(pan, isin, qty) still with PK (pan, isin).",
            "After the rewrite the schema is in 1NF. Whether it is in 2NF depends on FDs among pan, isin and any extra attributes — there is no extra non-prime attribute here, so 2NF holds vacuously.",
          ],
          result:
            "Original HOLD is not in 1NF; rewrite to HOLD(pan, isin) with PK (pan, isin).",
        },
        {
          title: "Partial dependency kills 2NF",
          prompt:
            "Relation FILL(order_id, isin, trader, isin_name, qty) with FDs: order_id isin → trader qty, isin → isin_name, order_id → trader. Assume those are all. Find candidate keys and test 2NF.",
          steps: [
            "Attributes: {order_id, isin, trader, isin_name, qty}.",
            "Closures: isin+ = {isin, isin_name}. order_id+ = {order_id, trader}. (order_id, isin)+ = {order_id, isin, trader, qty, isin_name} = U.",
            "(order_id, isin) is a superkey. Drop order_id: isin+ is not U. Drop isin: order_id+ is not U. So {order_id, isin} is a candidate key. No other candidate appears (trader and qty and isin_name are determined, never needed in a key).",
            "Prime attributes: order_id, isin. Non-prime: trader, isin_name, qty.",
            "1NF assumed (atomic columns). 2NF test: isin → isin_name has left-hand side a proper subset of the candidate key and right-hand side non-prime. That is a partial dependency.",
            "A second partial: order_id → trader, again a proper subset determining a non-prime. qty depends on the full key, which is allowed in 2NF. Conclusion: not in 2NF. Decompose to ISIN_DIM(isin, isin_name), ORDER_TRADER(order_id, trader), FILL_QTY(order_id, isin, qty).",
          ],
          result:
            "Only CK is {order_id, isin}; partial FDs isin → isin_name and order_id → trader violate 2NF.",
        },
        {
          title: "Singleton key: 2NF holds even with a transitive FD",
          prompt:
            "Relation CIRC(circ_id, topic, dept, floor) with circ_id → topic dept, dept → floor. Candidate keys and highest of {1NF, 2NF} that is guaranteed? (Do not decide 3NF yet.)",
          steps: [
            "circ_id+ = {circ_id, topic, dept, floor} = U, so {circ_id} is a candidate key.",
            "dept+ = {dept, floor} ≠ U. topic+ and floor+ are singletons. No other candidate key.",
            "Prime: circ_id. Non-prime: topic, dept, floor.",
            "1NF: treat each column as atomic; 1NF holds.",
            "2NF: the only candidate key is a singleton, so it has no proper nonempty subset that could be a partial determinant of a non-prime. 2NF holds automatically.",
            "There is a transitive dependency circ_id → dept → floor, which is a 3NF issue, not a 2NF issue. Do not mark 2NF as failed because you spotted transitivity.",
          ],
          result:
            "CK = {circ_id}; 1NF and 2NF both hold. Transitivity of floor is postponed to the 3NF test.",
        },
      ],
    },
    {
      heading: "3NF and BCNF with full FD traces",
      body: "A 1NF relation is in third normal form when every non-trivial FD X → A satisfies: X is a superkey, or A is prime. Equivalently, there is no non-prime attribute transitively dependent on a candidate key. Boyce–Codd normal form is stricter: every non-trivial FD X → A has X as a superkey. The only extra BCNF failures are FDs whose right-hand side is prime but whose left-hand side is not a superkey.\n\nThe paper procedure never changes. (1) List attributes. (2) Compute closures and F+. (3) List candidate keys and classify prime / non-prime. (4) Confirm 1NF. (5) Test partial dependencies (2NF). (6) Test each non-trivial FD against the 3NF rule. (7) Test each non-trivial FD against the BCNF rule. Stop at the first failure when the question asks for the highest form that holds.\n\nA BCNF decomposition on a violating FD X → Y (X not a superkey) is R1 = X ∪ Y and R2 = (R − Y) ∪ X, equivalently R − (Y − X). The join is lossless because R1 ∩ R2 = X and X → R1. It need not be dependency-preserving; the classic city-street-zip example loses a dependency that spanned both pieces.\n\nSEBI papers love the schema that is in 3NF but not BCNF: two overlapping candidate keys and an FD from a proper subset of one key into a prime attribute of the other. If every attribute is prime, 3NF is automatic; BCNF may still fail.",
      bullets: [
        "3NF: for every non-trivial X → A, X is a superkey or A is prime.",
        "BCNF: for every non-trivial X → A, X is a superkey.",
        "If all attributes are prime, the schema is in 3NF; it may still miss BCNF.",
      ],
      examples: [
        {
          title: "Full trace: 3NF but not BCNF",
          prompt:
            "Relation DESK(officer, window, shift) with FDs officer window → shift and shift → window. Determine candidate keys, primes, and the highest normal form.",
          steps: [
            "Attributes: {officer, window, shift}.",
            "Closures: (officer, window)+ = {officer, window, shift} = U. shift+ = {shift, window} ≠ U. (officer, shift)+ = {officer, shift, window} = U. window+ = {window}. officer+ = {officer}.",
            "Candidate keys: {officer, window} is minimal (neither singleton works from those two attributes). {officer, shift} is also minimal. {window, shift} is not a key: (window, shift)+ = {window, shift}.",
            "Prime attributes: officer, window, shift (every attribute sits in some candidate key). Non-prime: none.",
            "1NF holds. 2NF: non-prime partial dependency cannot occur because there are no non-primes. 2NF holds.",
            "3NF: inspect shift → window. Left side shift is not a superkey. Right side window is prime. The 3NF escape clause applies. officer window → shift has a superkey on the left, so it is fine. 3NF holds.",
            "BCNF: shift → window is non-trivial and shift is not a superkey, so BCNF fails. Highest form is 3NF.",
          ],
          result:
            "CKs {officer, window} and {officer, shift}; in 3NF but not BCNF because shift → window.",
        },
        {
          title: "Full trace: stops at 2NF (transitive non-prime)",
          prompt:
            "Relation ALLOT(app, cat, city, quota) with app → cat city and city → quota. Highest normal form?",
          steps: [
            "Attributes: {app, cat, city, quota}.",
            "Closures: app+ = {app, cat, city, quota} = U (city → quota fires after city is obtained). city+ = {city, quota}. cat+ = {cat}. quota+ = {quota}.",
            "Only candidate key: {app}. Superkeys are the four supersets of {app} that add any subset of {cat, city, quota} — actually 2^{3} = 8 superkeys, but only one candidate.",
            "Prime: app. Non-prime: cat, city, quota.",
            "1NF holds. 2NF: candidate key is a singleton, so no partial dependency. 2NF holds.",
            "3NF: city → quota is non-trivial, city is not a superkey, quota is non-prime. Violation. Equivalently app → city → quota is a transitive dependence of a non-prime on the key.",
            "BCNF also fails on the same FD. Highest form that holds is 2NF.",
          ],
          result: "CK = {app}; highest form is 2NF (city → quota violates 3NF and BCNF).",
        },
        {
          title: "Full trace: already in BCNF",
          prompt:
            "Relation TRADE(trade_id, isin, qty) with only trade_id → isin qty (and trivials). Confirm BCNF and count the FDs you must check.",
          steps: [
            "Attributes: {trade_id, isin, qty}. trade_id+ = U. isin+ = {isin}, qty+ = {qty}.",
            "Candidate key: {trade_id} only. Prime: trade_id. Non-prime: isin, qty.",
            "Non-trivial FDs implied by the given set include trade_id → isin, trade_id → qty, trade_id → isin qty. Each has a superkey on the left.",
            "There is no FD with isin or qty on the left that determines anything else, so no BCNF counterexample exists.",
            "1NF, 2NF (singleton key), 3NF (every non-trivial FD has a superkey determinant), BCNF all hold.",
            "Exam shortcut: a relation with a single candidate key and all given FDs of the form CK → rest, with no other determinants, is in BCNF.",
          ],
          result:
            "TRADE is in BCNF. The only candidate key is {trade_id}; every non-trivial FD has that superkey on the left.",
        },
        {
          title: "Lossless BCNF split that drops a dependency",
          prompt:
            "R(street, city, zip) with street city → zip and zip → city. This is the classic 3NF-not-BCNF schema. Decompose on zip → city into BCNF and check lossless join and dependency preservation.",
          steps: [
            "Keys of R: {street, city} and {street, zip} (same overlapping-key pattern as DESK). zip → city violates BCNF.",
            "Decompose on zip → city: R1(zip, city) and R2(zip, street). (R2 = (R − {city}) ∪ {zip}.)",
            "Lossless test: R1 ∩ R2 = {zip}, and zip → city so zip → R1. The join is lossless.",
            "Dependencies in R1: zip → city. Dependencies in R2: only trivials (zip does not determine street; street does not determine zip).",
            "The original FD street city → zip is not implied by {zip → city} alone. It is not a local FD of R1 or of R2, so the decomposition is not dependency-preserving.",
            "You can still check the lost FD as a constraint at the application level after joining R1 and R2, but the decomposed schema does not enforce it with local keys. That is the standard BCNF versus 3NF trade-off.",
          ],
          result:
            "R1(zip, city), R2(zip, street): lossless BCNF, not dependency-preserving (street city → zip is lost).",
        },
      ],
    },
    {
      heading: "Relational algebra versus tuple calculus",
      body: "Relational algebra is a procedural language. The operators SEBI/GATE expect by symbol are select σ (restrict rows by a predicate), project π (restrict columns and then duplicate-eliminate), union ∪, set difference −, cartesian product ×, and join ⋈ (theta, equi, or natural). Rename ρ is used when a product would otherwise clash on attribute names. Division r ÷ s expresses “for all”: the X-values in r(X,Y) that appear with every Y-value of s(Y).\n\nA natural join is equivalent to σ_{agree on common names}(r × s) followed by a projection that drops the duplicate copy of each common attribute. An equi-join keeps both copies. Always push σ as far down as possible in an exam simplification: σ_{c}(r ⋈ s) = σ_{c}(r) ⋈ s when c mentions only r-attributes.\n\nTuple relational calculus is declarative. A query is { t | P(t) } where P is a formula built from atoms s ∈ r, comparisons of fields, ∧ ∨ ¬, and quantifiers ∃ ∀. A formula is safe when every value that appears in the result comes from the active domain of the database; unsafe queries such as { t | ¬(t ∈ r) } are rejected. Domain calculus binds individual attributes rather than whole tuples; you will not need it beyond recognising the difference.\n\nAlgebra can express exactly the safe queries of calculus (Codd’s theorem, without aggregation). When a question gives English “members who traded every ISIN in set S”, write division or the calculus universal quantifier, not a single inner join.",
      bullets: [
        "σ rows, π columns (set semantics), × then σ then π implements a join.",
        "r ÷ s: X-values associated with every Y in s.",
        "Calculus { t | P(t) } must be safe; ¬(t ∈ r) is the standard unsafe example.",
      ],
      examples: [
        {
          title: "Select-project versus a join they did not ask for",
          prompt:
            "TRADE(tid, member, isin, qty) and MEMBER(member, city). English: “ISINs traded by members based in Mumbai, with duplicate ISINs shown once.” Write algebra, then a wrong-but-tempting join-free attempt, and fix it.",
          steps: [
            "Need city, which is not in TRADE, so a join (or product plus select) is mandatory. Tempting π_isin(σ_{city='Mumbai'}(TRADE)) is illegal: TRADE has no city.",
            "Correct skeleton: join TRADE with MEMBER on member, select city = Mumbai, project isin.",
            "Natural-join form: π_isin(σ_{city='Mumbai'}(TRADE ⋈ MEMBER)).",
            "Product form, to show you know the definition: π_isin(σ_{TRADE.member=MEMBER.member ∧ city='Mumbai'}(TRADE × MEMBER)).",
            "Push the city predicate to MEMBER before the join: π_isin(TRADE ⋈ σ_{city='Mumbai'}(MEMBER)). This is equivalent and cheaper.",
            "π eliminates duplicate ISINs. If the exam wanted bag semantics or counts, algebra-as-taught in GATE would still duplicate-eliminate unless it explicitly uses a bag variant.",
          ],
          result:
            "π_isin(TRADE ⋈ σ_{city='Mumbai'}(MEMBER)). You cannot select on city inside TRADE alone.",
        },
        {
          title: "Set difference for “traded equity but never debt”",
          prompt:
            "TRADE(member, asset_class, qty) with asset_class in {EQ, DEBT}. Members who have at least one EQ trade and zero DEBT trades. Write algebra using projection and difference, not a nested English sentence.",
          steps: [
            "EQ members: E = π_member(σ_{asset_class='EQ'}(TRADE)).",
            "DEBT members: D = π_member(σ_{asset_class='DEBT'}(TRADE)).",
            "“EQ but never DEBT” is set difference E − D, not E ∪ D and not E ∩ D.",
            "Intersection E ∩ D would be members who traded both classes. Union would be members who traded either.",
            "Do not subtract raw TRADE tuples: TRADE − TRADE is empty and still has asset_class in the heading. Project to member first so the headings match for ∪ − ∩.",
            "If qty were kept in the projection, two EQ rows of the same member with different qty would look like different values and difference would be wrong. Project only member.",
          ],
          result:
            "π_member(σ_{asset_class='EQ'}(TRADE)) − π_member(σ_{asset_class='DEBT'}(TRADE)).",
        },
        {
          title: "Division: members who traded every ISIN in a watchlist",
          prompt:
            "TRADE(member, isin) and WATCH(isin) with WATCH = {INEA, INEB}. Compute TRADE ÷ WATCH on paper from TRADE rows (M1,INEA), (M1,INEB), (M1,INEC), (M2,INEA), (M3,INEA), (M3,INEB).",
          steps: [
            "Division heading is the attributes in TRADE that are not in WATCH, i.e. {member}.",
            "Candidate members are the distinct member values in TRADE: M1, M2, M3.",
            "M1’s ISIN set is {INEA, INEB, INEC}, which is a superset of WATCH {INEA, INEB}. Keep M1.",
            "M2’s ISIN set is {INEA}, missing INEB. Drop M2.",
            "M3’s ISIN set is {INEA, INEB}, equal to WATCH. Keep M3. Extra ISINs are allowed; missing ones are not.",
            "Algebra identity to remember: r ÷ s = π_X(r) − π_X((π_X(r) × s) − r), with X = heading(r) − heading(s). Use it if the question asks you to expand division.",
          ],
          result: "TRADE ÷ WATCH = {M1, M3}. M2 is excluded for missing INEB.",
        },
        {
          title: "Tuple calculus for the same watchlist query",
          prompt:
            "Write a safe tuple-calculus expression for members who traded every ISIN in WATCH. Use range variables t over TRADE and w over WATCH. Then explain why { t | ¬(t ∈ TRADE) } is unsafe.",
          steps: [
            "Result tuples are one-field tuples u with attribute member. Schema of u is (member).",
            "English “for every watch ISIN there exists a trade of that member in that ISIN” becomes a universal quantifier over w and an existential over t.",
            "Formula: { u | ∃ t ∈ TRADE (t.member = u.member ∧ ∀ w ∈ WATCH ∃ s ∈ TRADE (s.member = u.member ∧ s.isin = w.isin)) }.",
            "Safety: every u.member is taken from TRADE, and every compared isin is taken from WATCH or TRADE, so values come from the active domain.",
            "The query { t | ¬(t ∈ TRADE) } would have to return every tuple not in TRADE, including tuples over an infinite domain of unused member names. That is unsafe and not equivalent to any algebra expression.",
            "Existential-only queries such as { t | t ∈ TRADE ∧ t.isin = 'INEA' } are the calculus form of σ_{isin='INEA'}(TRADE) and are safe.",
          ],
          result:
            "Universal quantifier over WATCH plus a TRADE witness for each ISIN; { t | ¬(t ∈ TRADE) } is the canonical unsafe query.",
        },
      ],
    },
    {
      heading: "File organisation, dense versus sparse index, B-tree versus B+",
      body: "Heap (pile) files dump records in insertion order: insert is cheap, equality search is a full scan. A sorted (sequential) file keeps records ordered on a search key: range queries become a scan from the first match, but inserts require sliding records or an overflow chain. A hash file maps a key to a bucket: equality is O(1) expected, range queries are hopeless because hash order is not key order.\n\nAn index is a (key, pointer) file. A dense index stores one index entry per data record (or per search-key occurrence). A sparse index stores one entry per data block, usually the first key of that block, and therefore requires the data file to be sorted on the search key. Sparse indexes are smaller; dense indexes can be built on unsorted files and can answer “does this key exist?” without touching the data file.\n\nA B-tree of order m stores up to m children and m−1 keys in every internal node, and it also stores record pointers in internal nodes. A B+ tree stores record pointers only in the leaves; internal nodes hold copies of keys used as routers. Leaves of a B+ tree are linked, so a range scan walks the leaf chain. Definitions of “order” vary by book: some use order = maximum children, others use order = maximum keys. Read the question’s definition before you compute occupancy.\n\nMinimum occupancy (except the root) is typically ⌈m/2⌉ children for an internal B+ node. Height grows only when the root splits, which is why B+ trees stay shallow on disk. Clustered versus unclustered is a separate axis: a clustered index has the data file in the same order as the index; a table can have at most one clustered index.",
      bullets: [
        "Dense: one index entry per record. Sparse: one per block, data file must be sorted.",
        "B-tree: keys+pointers in internal nodes. B+: data pointers only at linked leaves.",
        "Hash for equality; sorted file or B+ leaf chain for ranges.",
      ],
      examples: [
        {
          title: "Count dense versus sparse entries on a sorted trade file",
          prompt:
            "A sorted file of 10_000 trade records fills 500 blocks (20 records per block). Search key is trade_id (unique). How many entries in a dense primary index? In a sparse primary index with one entry per block? If the index itself packs 100 entries per index block, how many index blocks does each design need (one level)?",
          steps: [
            "Dense primary index: one entry per record = 10_000 entries.",
            "Sparse primary index on a sorted file: one entry per data block = 500 entries.",
            "Index blocking factor 100. Dense index blocks = ceil(10_000 / 100) = 100.",
            "Sparse index blocks = ceil(500 / 100) = 5.",
            "A unique search key does not change the dense count: uniqueness means one record per key, still 10_000 dense entries. Sparse remains one per block, not one per distinct key.",
            "If the question had a secondary index on a non-unique city column, a dense secondary index would still typically store one pointer per record, because two trades in Mumbai live in different data blocks.",
          ],
          result:
            "Dense 10_000 entries (100 index blocks); sparse 500 entries (5 index blocks).",
        },
        {
          title: "Why a sparse index cannot sit on an unsorted heap",
          prompt:
            "TRADE is a heap. Someone proposes a sparse index with one (trade_id, block-id) entry per data block, using the minimum trade_id found in that block as the key. Show that an equality search for trade_id = 500 can miss.",
          steps: [
            "Heap blocks are unordered. Suppose block 7 happens to contain trade_ids {900, 12, 500} and the sparse entry stored for block 7 is the first record on the block, say 900, or the minimum 12 — pick the scheme the proposer named: “first record of the block”.",
            "Let the first record of block 7 be 900. The sparse index therefore has an entry (900, block 7), not (500, block 7).",
            "A search for 500 looks at index keys. 500 is not equal to 900 and need not fall into a range that points at block 7, because neighbouring blocks are also unordered.",
            "The searcher never reads block 7, so trade 500 is missed even though it is on disk.",
            "If instead the sparse key were min(ids in the block) = 12, the index key 12 still does not tell you that 500 lives there; range reasoning on the index fails because block maxima and minima overlap wildly across the heap.",
            "Conclusion: sparse indexes require a sorted (or otherwise partitioned) data file so that a block’s key-range is disjoint from other blocks. Heaps need a dense index or a hash index.",
          ],
          result:
            "Sparse index on a heap can skip the block that holds the target key. Sparse requires a sorted data file.",
        },
        {
          title: "B+ tree order 4: minimum keys in a non-root internal node",
          prompt:
            "A B+ tree of order m = 4 means an internal node has at most 4 child pointers (hence at most 3 keys). Nodes except the root are at least half full. What is the minimum number of keys in a non-root internal node? In a leaf, if a leaf may hold at most 3 search-key values?",
          steps: [
            "Internal node: maximum children = m = 4. Minimum children = ceil(m / 2) = 2.",
            "Number of keys in an internal node is (number of children) − 1. Minimum keys = 2 − 1 = 1.",
            "The root is allowed to have as few as 2 children (1 key) when it is internal, or even 0 keys when the tree is a single empty leaf; the question excluded the root.",
            "Leaf occupancy: if a leaf stores at most 3 keys, half-full means ceil(3 / 2) = 2 keys minimum (common GATE convention unless the prompt uses a different leaf formula).",
            "Data pointers: in a B+ tree those 3 leaf keys each have a pointer to a data record (or to a bucket of records for non-unique keys). Internal keys do not point to data records.",
            "If the question had said “B-tree of order 4” instead, internal nodes would also carry data pointers, and a range scan could not simply walk a leaf linked list.",
          ],
          result:
            "Non-root internal node: minimum 1 key (2 children). Leaf with max 3 keys: minimum 2 keys under the half-full rule.",
        },
        {
          title: "Height comparison: why B+ leaves are linked",
          prompt:
            "A primary B+ index on trade_id has height 3 (root → internal → leaf). A range query wants all trade_id in [1000, 1099], and 40 qualifying keys sit in two adjacent leaves. Count node reads for the B+ tree versus a B-tree of the same height that stores matching keys in an internal node and a leaf, with no leaf links.",
          steps: [
            "B+ : walk root, one internal, first qualifying leaf: 3 reads to the first match.",
            "Then follow the sibling pointer to the next leaf: +1 read. Total 4 node reads. No need to return to the parent.",
            "B-tree without leaf links: some keys in [1000, 1099] may live in an internal node. After reading a leaf you must climb back to the parent to find the next key, then possibly descend again.",
            "A conservative B-tree range walk therefore re-reads the internal node and may read extra siblings. You cannot bound it at 4; it is at least the 3-level descent plus a climb and a second descent (5+).",
            "Internal B-tree nodes are also fatter because they store data pointers, so fanout is smaller and height may be larger than the B+ tree for the same file. The question already fixed height, so the extra cost is the missing leaf chain.",
            "Exam line: B+ trees win on range queries because all records sit in a linked sorted leaf sequence; B-trees win slightly on an equality that hits an internal key (one less disk read), which is why primary indexes in practice are B+.",
          ],
          result:
            "B+ range uses 4 node reads (3 down, 1 sibling). A B-tree without leaf links must climb and re-descend, so it costs more I/O for the same range.",
        },
      ],
    },
    {
      heading: "ACID and the four classic anomalies",
      body: "A transaction is a program unit that must satisfy ACID. Atomicity: all of its writes install, or none do (undo on abort). Consistency: it takes the database from one valid state to another with respect to declared constraints. Isolation: concurrent transactions do not observe each other’s incomplete work; the gold standard is serialisability. Durability: after commit, writes survive a crash (typically via the WAL / redo log).\n\nThe ANSI-style phenomena are the exam’s isolation vocabulary. Dirty read: T1 reads a value T2 wrote but has not committed; T2 may abort. Non-repeatable read: T1 reads a row twice and sees two committed values because T2 updated (or deleted) that row and committed in between. Phantom: T1’s predicate (a range or a SELECT COUNT) sees a new row that T2 inserted and committed. Lost update: two transactions read the same value and both write a new value; the second write overwrites the first without incorporating it.\n\nIsolation levels (classic ANSI table): READ UNCOMMITTED allows dirty reads; READ COMMITTED forbids dirty reads but allows non-repeatable reads and phantoms; REPEATABLE READ forbids dirty and non-repeatable reads but, in the original ANSI draft, still allows phantoms; SERIALIZABLE forbids all three. Real engines (next-key locking in InnoDB, snapshot isolation) do not match the table exactly; answer with the ANSI table unless the question names an engine.\n\nLost update is not always listed as a fourth ANSI phenomenon, but SEBI papers treat it as a concurrency bug of its own. Cursor stability and column-level COMPARE-AND-SET are application-level defences; 2PL and snapshot isolation are engine-level defences.",
      bullets: [
        "Dirty: read uncommitted. Non-repeatable: same row, two committed values. Phantom: new row in a predicate. Lost update: last writer silently wins.",
        "READ COMMITTED stops dirty reads; REPEATABLE READ stops non-repeatable; SERIALIZABLE stops phantoms (ANSI table).",
        "Atomicity is undo; durability is redo. Do not swap them in a crash-recovery MCQ.",
      ],
      examples: [
        {
          title: "Name the anomaly from a two-transaction trace",
          prompt:
            "Initial qty = 100. T1: read qty (100); T2: write qty = 40; T2: abort (qty restored to 100); T1: uses the 40 it already read to authorise a sale. Which anomaly, and which isolation level is the weakest that forbids it?",
          steps: [
            "T1 read a value that T2 had written and not committed. That is the definition of a dirty read.",
            "It is not a non-repeatable read: T1 did not read the same committed row twice. T2 never committed the 40.",
            "It is not a phantom: no new row entered a range. The row identity was fixed.",
            "It is not a lost update: T1 never wrote qty. Lost update needs two writers.",
            "READ UNCOMMITTED allows dirty reads. READ COMMITTED already forbids them (a reader only sees committed data).",
            "REPEATABLE READ and SERIALIZABLE also forbid dirty reads, but the weakest (least locking) level that is sufficient is READ COMMITTED.",
          ],
          result:
            "Dirty read. Weakest ANSI level that forbids it: READ COMMITTED.",
        },
        {
          title: "Non-repeatable read of a margin row",
          prompt:
            "T1: SELECT margin FROM member WHERE id = 'M1' → 8 crore. T2: UPDATE member SET margin = 2 WHERE id = 'M1'; COMMIT. T1: SELECT margin again → 2 crore. T1 then raises an alert using the first figure. Classify, and say whether REPEATABLE READ stops it.",
          steps: [
            "T1 read the same primary-key row twice and saw two different values. Both values were committed (T2 committed before the second read).",
            "That is a non-repeatable read, also called a fuzzy read.",
            "Not dirty: T2 had committed. Not a phantom: the row M1 existed throughout; it was updated, not inserted.",
            "READ COMMITTED allows this (each statement sees the latest committed version). REPEATABLE READ keeps T1’s first snapshot of M1, so the second SELECT still returns 8 crore.",
            "SERIALIZABLE also prevents it. Snapshot isolation (not ANSI) would likewise show T1 a stable snapshot.",
            "If T2 had INSERTed a new member instead of updating M1, T1’s second “SELECT … WHERE margin < 5” might see a new row — that would be a phantom, a different phenomenon.",
          ],
          result:
            "Non-repeatable read of M1. REPEATABLE READ (and SERIALIZABLE) forbid it; READ COMMITTED does not.",
        },
        {
          title: "Phantom in a surveillance count",
          prompt:
            "T1: SELECT COUNT(*) FROM trade WHERE isin = 'INEA' AND day = '2026-04-01' → 4. T2 inserts a fifth trade of INEA that day and commits. T1 repeats the COUNT → 5. T1’s two counts disagree. Classify versus a non-repeatable read.",
          steps: [
            "T1’s predicate is a range (all trades of one ISIN on one day), not a single row identified by primary key.",
            "The extra row did not exist at the first count. A new row matching the predicate is a phantom.",
            "A non-repeatable read would be an existing trade row whose qty changed between the two scans. Here no existing row changed; a new one appeared.",
            "ANSI REPEATABLE READ locks the rows that were found, but not the “gaps” where a new trade could be inserted, so phantoms can remain. SERIALIZABLE (predicate/next-key locks) forbids them.",
            "COUNT(*) is the exam’s favourite phantom vehicle because the result changes even though every previously seen trade_id is unchanged.",
            "If T2 had deleted one of the original four trades, some textbooks still call that a phantom (predicate result set changed); others call a delete of a previously read row a non-repeatable read. For an insert into a range, the name is unambiguously phantom.",
          ],
          result:
            "Phantom insert into T1’s ISIN-day predicate. SERIALIZABLE is the ANSI level that forbids it.",
        },
        {
          title: "Lost update on a position qty",
          prompt:
            "Position qty starts at 10. T1 reads 10, T2 reads 10, T1 writes 10+5 = 15 and commits, T2 writes 10−3 = 7 and commits. Final qty is 7. What was lost, and would the same schedule under SERIALIZABLE 2PL be allowed?",
          steps: [
            "Both transactions based their write on the same original 10. T1’s +5 is overwritten by T2’s write of 7. The net should have been 10+5−3 = 12. That is a lost update.",
            "T2 did not read T1’s 15, so this is not a dirty read. T2 never re-read, so it is not a non-repeatable read from T2’s point of view. No extra row appeared, so not a phantom.",
            "Under strict 2PL, T1 would hold an exclusive lock on the row from its write until commit. T2’s write would block until T1 commits, then T2 would re-read (or be aborted/restarted) and compute 15−3 = 12.",
            "A serial order T1 then T2 yields 12; T2 then T1 yields 10−3+5 = 12 as well in this additive case. The concurrent last-write-wins schedule is not equivalent to either serial order if T2 blindly writes 7 based on the stale 10.",
            "Snapshot isolation can still lose updates of this form unless the engine adds first-committer-wins checks on the same row (write-write detection).",
            "Exam fix: UPDATE position SET qty = qty + :delta (one atomic statement) rather than read-compute-write in two statements.",
          ],
          result:
            "Lost update: final 7 instead of 12. Strict 2PL would serialise the two writes; a blind write of 7 is not conflict-serialisable with T1’s write of 15.",
        },
      ],
    },
    {
      heading: "Conflict serialisability, 2PL versus strict 2PL, OCC",
      body: "Two operations conflict if they belong to different transactions, touch the same object, and at least one is a write. A schedule is conflict serialisable (CSR) when its conflict graph (precedence graph) is acyclic: put an edge Ti → Tj if an operation of Ti precedes a conflicting operation of Tj. Any topological order of an acyclic graph is an equivalent serial order. View serialisability is strictly weaker and is NP-complete to test; GATE almost always wants the conflict graph.\n\nTwo-phase locking (2PL): a transaction has a growing phase (locks only) and then a shrinking phase (unlocks only). Once it has unlocked anything it may not lock again. 2PL guarantees CSR, but it still allows cascading aborts: T2 may read a value T1 wrote, then T1 may abort after T2 unlocked something else. Strict 2PL holds all exclusive locks until commit or abort, which prevents cascading aborts and produces a recoverable, cascadeless, strict schedule. Rigorous 2PL holds both shared and exclusive locks until the end.\n\n2PL can deadlock. Wait-die and wound-wait are timestamp deadlock-prevention schemes; detection uses a waits-for graph. Timestamp ordering and Thomas’ write rule are lock-free alternatives that GATE still asks.\n\nOptimistic concurrency control (OCC, Kung–Robinson) runs three phases: read (work on private copies), validate (check that no conflicting committed transaction overlapped in a dangerous way), write (publish copies if validation passes). OCC shines when conflicts are rare; under contention it aborts a lot. Validation can be backward (compare with already committed transactions) or forward (compare with currently running ones).",
      bullets: [
        "CSR ⇔ acyclic conflict graph. Edge Ti → Tj when Ti’s conflicting op precedes Tj’s.",
        "2PL ⇒ CSR. Strict 2PL: hold X-locks until commit (no cascading abort).",
        "OCC: read → validate → write; abort on failed validation instead of blocking.",
      ],
      examples: [
        {
          title: "Precedence graph of r1(A) w2(A) w1(A) c1 c2",
          prompt:
            "Schedule S: r1(A); w2(A); w1(A); c1; c2. Build the conflict graph, decide CSR, and name a serial order if one exists.",
          steps: [
            "Operations on A: r1, w2, w1. Pairs that conflict: r1 with w2 (rw), r1 with w1 is the same transaction so ignore, w2 with w1 (ww).",
            "r1(A) precedes w2(A) and they conflict ⇒ edge T1 → T2.",
            "w2(A) precedes w1(A) and they conflict ⇒ edge T2 → T1.",
            "The graph is T1 ⇄ T2, a two-cycle. Cyclic ⇒ S is not conflict serialisable.",
            "There is therefore no serial order T1;T2 or T2;T1 that is conflict-equivalent to S. (T1;T2 would have both of T1’s ops before T2’s write; S interleaves them.)",
            "Commits at the end do not remove conflict edges. Recoverability is a different question: T2 writes A and later T1 overwrites A; T2’s write is never read by T1, so dirty-read recoverability is not the issue here — CSR already failed.",
          ],
          result:
            "Cycle T1 → T2 → T1 from the rw and ww pairs on A; S is not conflict serialisable.",
        },
        {
          title: "An acyclic graph and its serial order",
          prompt:
            "S: r1(A); w1(A); r2(A); w2(B); r3(B); c1; c2; c3. Draw the conflict graph and give every serial equivalent.",
          steps: [
            "List conflicting pairs across transactions. On A: w1(A) precedes r2(A) (wr) ⇒ edge T1 → T2. r1(A) with r2(A) is read-read, not a conflict.",
            "On B: w2(B) precedes r3(B) (wr) ⇒ edge T2 → T3. No other B operations exist.",
            "There is no pair of conflicting operations that would draw T2 → T1, T3 → T2, T3 → T1, or T1 → T3 directly. The graph is the chain T1 → T2 → T3.",
            "The graph is acyclic, so S is conflict serialisable. The only topological order is T1 then T2 then T3.",
            "Serial equivalent: T1; T2; T3. T2; T1; T3 is illegal because of T1 → T2. T1; T3; T2 is illegal because of T2 → T3.",
            "Always scan every object. A second object can add a reverse edge and kill CSR even when the first object looked serial; here B only lengthens the same chain.",
          ],
          result:
            "Acyclic chain T1 → T2 → T3; S is conflict-equivalent only to the serial order T1; T2; T3.",
        },
        {
          title: "2PL allowed versus strict 2PL rejected",
          prompt:
            "T1: lock-X(A); w(A); unlock(A); lock-X(B); w(B); unlock(B); commit. Is this 2PL? Is it strict 2PL? Can T2 dirty-read A after the first unlock?",
          steps: [
            "2PL growing/shrinking: T1 unlocked A and then locked B. A lock after an unlock violates the two-phase rule. So this is not 2PL at all.",
            "Rewrite as T1': lock-X(A); lock-X(B); w(A); w(B); unlock(A); unlock(B); commit. Now all locks precede all unlocks: 2PL holds.",
            "Strict 2PL additionally forbids releasing an X-lock before commit. T1' unlocks A before commit, so T1' is 2PL but not strict 2PL.",
            "After T1' unlocks A, T2 can lock-S(A) and read the uncommitted write. If T1' then aborts, T2 has dirty-read and may have to cascade-abort.",
            "Strict 2PL keeps X-locks until commit: T2 cannot read A until T1' commits (or aborts and restores A). Cascading aborts disappear.",
            "Exam pair: 2PL ⇒ conflict serialisable; strict 2PL ⇒ 2PL + cascadeless + recoverable. Rigorous 2PL also holds S-locks until the end.",
          ],
          result:
            "Lock after unlock is not 2PL. Unlock-X before commit is 2PL but not strict; T2 can dirty-read A and cascade.",
        },
        {
          title: "OCC validation on two overlapping margin updates",
          prompt:
            "Both T1 and T2 run OCC on member M1. Timeline: T1-read (margin=8), T2-read (margin=8), T1-validate-write (sets 12, commits), T2-validate. Backward-validate T2 against committed T1. Does T2 commit?",
          steps: [
            "OCC read phase: each transaction copies M1 into private storage and computes a new margin. No locks during read.",
            "T1 validates first. No overlapping committed writer on M1, so T1 writes 12 and commits. T1’s write-set = {M1}.",
            "T2 now validates. Backward validation asks: did any transaction that committed during T2’s read phase write an object T2 read? Yes: T1 committed, wrote M1, and M1 is in T2’s read-set.",
            "Validation fails. T2 aborts, discards its private copy, and may restart, this time reading margin=12.",
            "If T2 had been allowed to write 8+3=11, T1’s 12 would be lost — the same lost-update pattern OCC is designed to catch at validate time rather than with locks.",
            "Forward validation would instead check T2 against still-running transactions; the exam usually wants the read-set/write-set overlap rule: RS(T2) ∩ WS(T1) ≠ ∅ with T1 committed in T2’s window ⇒ abort T2.",
          ],
          result:
            "T2 fails validation (RS(T2) ∩ WS(T1) = {M1}) and aborts; T1’s committed write of 12 stands.",
        },
      ],
    },
  ],
};
