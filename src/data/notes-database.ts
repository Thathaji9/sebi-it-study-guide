import type { TopicNote } from "@/data/notes";

export const notesDatabase: TopicNote = {
  topic: "database",
  title: "Database — techniques (beginner)",
  blurb:
    "A database is a careful filing cabinet for facts. These notes walk keys, 1NF to BCNF, indexes, ACID, and 2PL in school English. Read the first sentence of each block, then copy the three examples onto paper.",
  blocks: [
    {
      heading: "ER model: boxes, links, and weak entities",
      body: "An entity is a real thing we store, like a student or a broker. A relationship is a link between things, like “studies in” or “lives in”. Cardinality says how many: one city can hold many brokers (1:N), or many circulars can apply to many firms (M:N).\n\nA weak entity is a thing with no ID of its own — a school locker only makes sense inside one school. We draw it with a double box. Its full name is “owner’s key + a small local name” (the partial key).",
      howTo: [
        "Circle every real-world thing (entity) and every link (relationship).",
        "Ask: does this thing have its own ID? If no, it is weak — copy the owner’s key down.",
        "Read 1:1, 1:N, or M:N from the English, not from how you wish the tables looked.",
        "Map: strong entity → table; 1:N → extra column on the many side; M:N → a third table.",
      ],
      bullets: [
        "Weak entity primary key = owner key + partial key.",
        "1:N puts a foreign key on the N-side. M:N needs its own table.",
        "“Exactly one” means total participation (the column cannot be empty).",
      ],
      examples: [
        {
          title: "Weak schedule under a DP",
          prompt:
            "A depository participant (DP) has dp_id. Each DP has schedules by date. Two DPs may both have a schedule on 2026-04-01. A line-item (isin, qty) lives only inside a schedule. What is the primary key of LINE_ITEM?",
          steps: [
            {
              do: "Mark DP as strong: it already has dp_id.",
              why: "A strong entity is like a student with a roll number — it can stand alone.",
            },
            {
              do: "Mark Schedule as weak. Date is only unique inside one DP.",
              why: "Two schools can both have “Locker 12”. Date is a partial key, not a global ID.",
            },
            {
              do: "Write SCHEDULE’s key as (dp_id, date). Copy that down into LINE_ITEM and add isin.",
              why: "A weak child inherits the parent’s ID, the way a locker number is written “School A / 12”.",
            },
          ],
          result:
            "LINE_ITEM primary key is (dp_id, date, isin). qty is just a number on the line, not part of the key.",
        },
        {
          title: "Put the foreign key on the many side",
          prompt:
            "A broker has one headquarters city. A city may have many brokers, or none. Every broker must have a city. Where does the foreign key go?",
          code: "BROKER(broker_id, name, hq_city NOT NULL)\nCITY(city_code, city_name)",
          language: "sql",
          steps: [
            {
              do: "Say the shape: many brokers → one city, so N:1.",
              why: "Cardinality is “how many arrows”, not “how many columns”.",
            },
            {
              do: "Put hq_city on BROKER, pointing at CITY. Make it NOT NULL.",
              why: "The many side holds the “which one?” note. NOT NULL means every broker must have a city.",
            },
            {
              do: "Do not put broker_id on CITY.",
              why: "That would force a city to have at most one broker, which is the wrong story.",
            },
          ],
          result:
            "BROKER(broker_id, name, hq_city NOT NULL). CITY stays a city list. The N-side holds the key.",
        },
        {
          title: "M:N needs a third table",
          prompt:
            "A circular applies to many firms; a firm follows many circulars. ack_date is “when this firm ticked this circular”. How many tables, and what is the key of the middle one?",
          code: "CIRCULAR(circ_id, title)\nFIRM(firm_id, name)\nACK(circ_id, firm_id, ack_date)",
          language: "sql",
          steps: [
            {
              do: "Keep CIRCULAR and FIRM as two strong tables.",
              why: "Each already has its own ID, like two class lists.",
            },
            {
              do: "Make ACK with both IDs plus ack_date. Key = (circ_id, firm_id).",
              why: "A many-to-many link is a sign-up sheet: one row per pair. The date belongs to the pair, not to the circular alone.",
            },
            {
              do: "Do not store ack_date on CIRCULAR or on FIRM.",
              why: "One circular is not acknowledged on a single global day; one firm acknowledges many circulars on different days.",
            },
          ],
          result:
            "Three tables. ACK’s primary key is (circ_id, firm_id). That row holds ack_date.",
        },
        {
          title: "One PAN, one investor (1:1)",
          prompt:
            "Each investor has exactly one PAN. Each PAN belongs to exactly one investor. pan_issue_date is a fact about the card. How many tables, and where does pan_issue_date live?",
          code: "INVESTOR(inv_id, name, pan_no NOT NULL UNIQUE)\nPAN_CARD(pan_no, pan_issue_date)",
          language: "sql",
          steps: [
            {
              do: "Say the shape: one investor ↔ one PAN, both sides total (exactly one).",
              why: "1:1 is “pair of lockers that always match”, not “maybe later”.",
            },
            {
              do: "You may keep two tables and put pan_no as a UNIQUE NOT NULL foreign key on INVESTOR.",
              why: "A 1:1 foreign key can sit on either side. UNIQUE stops two investors sharing a PAN.",
            },
            {
              do: "Put pan_issue_date on PAN_CARD (or on INVESTOR if you merge). It is not a key.",
              why: "Issue date describes the card, the way a print date describes a pass, not the person.",
            },
            {
              do: "Merging into one table INVESTOR(inv_id, name, pan_no UNIQUE, pan_issue_date) is also legal for total 1:1.",
              why: "When both sides must exist, two boxes can become one row. Optional 1:1 should stay two tables so a missing PAN is a NULL, not a missing person.",
            },
            {
              do: "Do not make a third link table. That is the M:N picture.",
              why: "A sign-up sheet is for many-to-many. Here each person has one card.",
            },
          ],
          result:
            "Two tables (or one merged table). pan_issue_date lives with the card. pan_no is UNIQUE NOT NULL on the investor side.",
        },
        {
          title: "Nominee is weak under a holder",
          prompt:
            "HOLDER has pan. A nominee has only a local name (nom_name) and share_pct. Two holders may both name “Ria”. What is NOMINEE’s primary key?",
          code: "HOLDER(pan, holder_name)\nNOMINEE(pan, nom_name, share_pct)",
          language: "sql",
          steps: [
            {
              do: "Mark HOLDER as strong: pan already names the person.",
              why: "A strong entity is a student with a roll number.",
            },
            {
              do: "Mark NOMINEE as weak. nom_name is unique only inside one holder.",
              why: "Two families can both have a child named Ria. The local name is a partial key.",
            },
            {
              do: "Copy the owner key pan into NOMINEE. Full key = (pan, nom_name).",
              why: "A weak child’s ID is “parent’s ID + the small local name”, like “School A / Locker 12”.",
            },
            {
              do: "share_pct stays off the key — it is a number on that nominee line.",
              why: "Percents can repeat. They do not pick out a row.",
            },
            {
              do: "Draw a double box for NOMINEE and an identifying link to HOLDER.",
              why: "The exam picture of a weak entity is a double rectangle plus a double diamond.",
            },
          ],
          result:
            "NOMINEE primary key is (pan, nom_name). share_pct is a non-key number. Two holders may both have a nominee Ria.",
        },
      ],
    },
    {
      heading: "Keys: superkey, candidate, primary, foreign",
      body: "A key is a name-tag that picks out one row. A superkey is any set of columns that never repeats across two rows — even if it is bigger than needed. A candidate key is a superkey with no spare column; drop any piece and two rows could clash. We pick one candidate as the primary key (the official roll number). The others are alternate keys.\n\nA foreign key is a copy of someone else’s key, like writing a friend’s roll number on a form. Entity integrity: the primary key may not be empty. Referential integrity: a non-empty foreign key must match a real parent row.",
      howTo: [
        "List every column. Find which sets uniquely name a row (closures if you have FDs).",
        "Throw away any unique set that still works after you drop a column — those are candidate keys.",
        "Count superkeys: if one candidate has k columns and the table has n, there are 2^{n−k} superkeys.",
        "Primary key ≠ NULL. Foreign key is NULL or a live parent value.",
      ],
      bullets: [
        "Superkey ⊇ candidate key. Primary key = the chosen candidate.",
        "One candidate of size k in n columns → 2^{n−k} superkeys.",
        "SQL UNIQUE allows extra NULLs; a true candidate key does not.",
      ],
      examples: [
        {
          title: "Count superkeys",
          prompt:
            "ALERT(rule, desk, city, severity) with only rule → desk city severity. How many superkeys? List the candidate key.",
          steps: [
            {
              do: "Close {rule}: it gives desk, city, severity — the whole table. So {rule} is a candidate key.",
              why: "If the rule name already tells you every other column, the rule name is a unique roll number.",
            },
            {
              do: "Check the others: desk, city, or severity alone do not name a full row.",
              why: "Two alerts can share a desk. Only a candidate key must never clash.",
            },
            {
              do: "n = 4, k = 1, so 2^{3} = 8 superkeys: every set that still contains rule.",
              why: "You may add spare columns (desk, city, severity) and uniqueness stays. That is what “super” means — extra baggage is allowed.",
            },
          ],
          result:
            "Eight superkeys, all containing rule. The only candidate key is {rule}.",
        },
        {
          title: "Two candidate keys",
          prompt:
            "TRADE(isin, member, day, venue, qty) with isin member day → venue qty and venue → member. Find every candidate key.",
          steps: [
            {
              do: "Close (isin, member, day): you get venue and qty, so the whole heading. It is a candidate (drop any one piece and it fails).",
              why: "That triple is like “which stock, which broker, which day” — enough to name one trade line.",
            },
            {
              do: "Swap member for venue, because venue → member. Close (isin, venue, day): also the whole table.",
              why: "If the venue already tells you the member, you can use venue as the stand-in in the key.",
            },
            {
              do: "qty is never on the left of an FD, so it is not in any candidate key.",
              why: "qty is a measured number, not an ID. Prime attributes here are isin, member, day, venue.",
            },
          ],
          result:
            "Candidate keys: {isin, member, day} and {isin, venue, day}. qty is non-prime.",
        },
        {
          title: "NULL on UNIQUE is not a candidate key",
          prompt:
            "MEMBER(member_id PRIMARY KEY, sebi_reg UNIQUE, name). Can sebi_reg be NULL? Can member_id? What if two rows have sebi_reg NULL?",
          code: "CREATE TABLE member (\n  member_id CHAR(8) PRIMARY KEY,\n  sebi_reg VARCHAR(16) UNIQUE,\n  name VARCHAR(80) NOT NULL\n);",
          language: "sql",
          steps: [
            {
              do: "member_id cannot be NULL — that is entity integrity.",
              why: "A roll number that is blank cannot pick out a student.",
            },
            {
              do: "SQL UNIQUE still allows several NULLs, because NULL is not “equal” to NULL.",
              why: "The exam’s candidate-key idea is stricter: unique and not null. UNIQUE alone is a weaker sticker.",
            },
            {
              do: "Two new members can both sit with sebi_reg NULL; a second copy of a real number is rejected.",
              why: "PRIMARY KEY = UNIQUE + NOT NULL. Remember that pair for MCQs.",
            },
          ],
          result:
            "member_id never NULL. sebi_reg may be NULL in SQL. UNIQUE + NULL is not a candidate key.",
        },
        {
          title: "Two-column candidate, count superkeys",
          prompt:
            "LOT(wh_id, lot_no, grade, kg) with only wh_id lot_no → grade kg. How many superkeys? List them and the candidate key.",
          steps: [
            {
              do: "Close {wh_id, lot_no}: you get grade and kg — the whole heading. So that pair is a candidate key.",
              why: "Warehouse plus lot number already names the sack. Drop either piece and two sacks can clash.",
            },
            {
              do: "grade or kg alone is not a key. Two lots can share a grade or a weight.",
              why: "Measured columns are almost never IDs.",
            },
            {
              do: "n = 4 columns, k = 2 in the candidate, so 2^{n−k} = 2^2 = 4 superkeys.",
              why: "A superkey is “the candidate plus any spare bag of leftover columns”.",
            },
            {
              do: "List them: {wh_id, lot_no}, {wh_id, lot_no, grade}, {wh_id, lot_no, kg}, and all four columns.",
              why: "Every superkey still contains the candidate. There is no extra candidate here.",
            },
            {
              do: "Do not count {wh_id, grade} — that set does not determine lot_no.",
              why: "One warehouse can have two lots of the same grade. Superkey means unique row, not “looks important”.",
            },
          ],
          result:
            "Four superkeys, all containing {wh_id, lot_no}. The only candidate key is {wh_id, lot_no}.",
        },
        {
          title: "Optional foreign key may be NULL",
          prompt:
            "DEAL(deal_id PRIMARY KEY, desk_id REFERENCES desk(desk_id), notes). Some deals have no desk yet. May desk_id be NULL? May deal_id? What if desk_id = 'ZZ' and DESK has no ZZ?",
          code: "CREATE TABLE deal (\n  deal_id CHAR(10) PRIMARY KEY,\n  desk_id CHAR(6) REFERENCES desk(desk_id),\n  notes VARCHAR(80)\n);",
          language: "sql",
          steps: [
            {
              do: "deal_id cannot be NULL — entity integrity for the primary key.",
              why: "A blank roll number cannot pick out a deal.",
            },
            {
              do: "desk_id may be NULL because the foreign key is optional (no NOT NULL).",
              why: "A foreign key that is empty means “no parent yet”, like a form with the class box left blank.",
            },
            {
              do: "If desk_id is 'ZZ' and DESK has no such row, the INSERT fails — referential integrity.",
              why: "A non-empty foreign key must match a live parent. NULL is the only escape.",
            },
            {
              do: "Two deals may both have desk_id NULL. That does not break the foreign key.",
              why: "NULL is “unknown parent”, not “the same parent twice”.",
            },
            {
              do: "PRIMARY KEY is UNIQUE + NOT NULL. A plain REFERENCES is not a candidate key of DEAL.",
              why: "Many deals can share one desk. The copy of someone else’s key is not your roll number.",
            },
          ],
          result:
            "deal_id never NULL. desk_id may be NULL. A non-NULL desk_id must exist in DESK. ZZ with no parent is rejected.",
        },
      ],
    },
    {
      heading: "1NF and 2NF (no lists, no partial extras)",
      body: "A functional dependency X → Y means: if two rows agree on X, they must agree on Y. Like “roll number → name”: one roll number, one name.\n\nFirst normal form (1NF) means each cell holds one atomic value — one number, one word — not a list. A cell “INE001, INE002” is like stuffing three names into one locker.\n\nSecond normal form (2NF) means: if the key has several columns, no extra (non-key) column may depend on only a piece of that key. If every key is a single column, 2NF is automatic.",
      howTo: [
        "List columns. Compute closures. Find every candidate key. Mark prime vs non-prime.",
        "1NF: is every cell one value? Split lists into extra rows.",
        "2NF: look for a non-prime column that follows a proper subset of a composite key. That is a partial dependency.",
        "Fix 2NF by splitting: key-piece + its extras in their own table.",
      ],
      bullets: [
        "X+ : start with X; add any right-hand side whose left side you already have; repeat.",
        "1NF: atomic cells. Repeating groups fail 1NF.",
        "2NF: no non-prime column depends on only part of a candidate key.",
      ],
      examples: [
        {
          title: "Close A+ on a chain",
          prompt:
            "F = {A → B, B → C, CD → E, E → C, G → A}. Compute A+ and AG+.",
          steps: [
            {
              do: "Start A+ = {A}. Fire A → B, then B → C. Stop at {A, B, C}.",
              why: "You only add a right-hand side when you already hold the whole left-hand side. D is missing, so CD → E never fires.",
            },
            {
              do: "AG+ starts {A, G}. Same chain gives B and C. Still no D, still no E. AG+ = {A, B, C, G}.",
              why: "G tells you A, but A does not tell you G’s friends D and E. Extra letters on the left only help if they unlock a new FD.",
            },
            {
              do: "Write the missing letters: D, E (and G from A+).",
              why: "Exam closures are a flood-fill. If a gate needs a key you do not have, that room stays shut.",
            },
          ],
          result: "A+ = ABC. AG+ = ABCG. D and E are not determined by A or AG.",
        },
        {
          title: "A list in a cell fails 1NF",
          prompt:
            "HOLD(pan, isins) has one row ('AAAPA1111A', 'INE001A,INE002B'). Is it 1NF? Rewrite it.",
          code: "CREATE TABLE hold (\n  pan CHAR(10),\n  isin CHAR(12),\n  PRIMARY KEY (pan, isin)\n);",
          language: "sql",
          steps: [
            {
              do: "Spot the comma list in isins. Mark “not 1NF”.",
              why: "1NF is “one fact per cell”, like one name per form box.",
            },
            {
              do: "Rewrite as one row per (pan, isin).",
              why: "Now each cell is a single code. That is atomic.",
            },
            {
              do: "Key becomes (pan, isin).",
              why: "One person can hold many stocks; one stock can be held by many people. The pair is the ID.",
            },
          ],
          result:
            "Original HOLD is not 1NF. New HOLD(pan, isin) with primary key (pan, isin) is 1NF.",
        },
        {
          title: "Partial dependency fails 2NF",
          prompt:
            "FILL(order_id, isin, trader, isin_name, qty) with order_id isin → trader qty, isin → isin_name, order_id → trader. Test 2NF.",
          steps: [
            {
              do: "Close (order_id, isin): whole table. Neither piece alone is a key. Candidate key = {order_id, isin}.",
              why: "You need both “which order” and “which stock” to name a fill line.",
            },
            {
              do: "isin → isin_name and order_id → trader are extras that follow only a piece of the key.",
              why: "isin_name is a stock’s nickname — it should live on a stock card, not be copied onto every fill. That is a partial dependency.",
            },
            {
              do: "Split: ISIN(isin, isin_name), ORDER_TRADER(order_id, trader), FILL(order_id, isin, qty).",
              why: "2NF puts “facts about a part of the key” in their own table.",
            },
          ],
          result:
            "Not 2NF. Partial FDs isin → isin_name and order_id → trader. qty may stay with the full key.",
        },
        {
          title: "Close W+ when a gate still needs Y",
          prompt:
            "F = {W → X, XY → Z, Z → Y, V → W}. Compute W+, WX+, and VY+.",
          steps: [
            {
              do: "Start W+ = {W}. Fire W → X. Stop at {W, X}. XY → Z never fires because Y is missing.",
              why: "You only add a right-hand side when you already hold the whole left-hand side. One letter short and the gate stays shut.",
            },
            {
              do: "WX+ starts {W, X}. Same story: still no Y, still no Z. WX+ = {W, X}.",
              why: "Adding a letter you already determine does not unlock a new FD. You needed Y, not a second copy of X.",
            },
            {
              do: "VY+ starts {V, Y}. Fire V → W, then W → X. Now you hold X and Y, so XY → Z fires, then Z → Y (already have Y).",
              why: "Y was the missing key for the XY gate. Once it is on the table, Z walks in.",
            },
            {
              do: "VY+ = {V, W, X, Y, Z} — the whole set of letters.",
              why: "A closure is a flood-fill. Write every letter you can reach, then stop.",
            },
            {
              do: "So W alone is not a key of a table with attributes VWXYZ. VY is a key (it closes everything).",
              why: "Exam: a candidate key is a set whose closure is the whole heading.",
            },
          ],
          result: "W+ = WX. WX+ = WX. VY+ = VWXYZ. W never unlocks Z because Y is missing.",
        },
        {
          title: "Scheme name hangs off part of the key",
          prompt:
            "SIP(pan, scheme_id, scheme_name, sip_amt) with pan scheme_id → sip_amt and scheme_id → scheme_name. Test 2NF.",
          steps: [
            {
              do: "Close (pan, scheme_id): whole table. Neither piece alone is a key. Candidate key = {pan, scheme_id}.",
              why: "You need “which person” and “which scheme” to name one SIP line.",
            },
            {
              do: "scheme_id → scheme_name is an extra that follows only a piece of the key.",
              why: "The scheme’s nickname belongs on a scheme card, not copied onto every SIP. That is a partial dependency.",
            },
            {
              do: "sip_amt follows the full key, so it may stay.",
              why: "The amount is a fact about the pair, like “this person, this scheme, this rupee figure”.",
            },
            {
              do: "Split: SCHEME(scheme_id, scheme_name) and SIP(pan, scheme_id, sip_amt).",
              why: "2NF puts “facts about a part of the key” in their own table.",
            },
            {
              do: "After the split, each table has a key → rest shape, so 2NF holds.",
              why: "Fixing the partial FD is the whole 2NF repair.",
            },
          ],
          result:
            "Not 2NF. Partial FD scheme_id → scheme_name. sip_amt stays with the full key (pan, scheme_id).",
        },
      ],
    },
    {
      heading: "3NF and BCNF",
      body: "Third normal form (3NF) says: for every real dependency X → A, either X is a superkey, or A is prime (part of some candidate key). In school words: no extra column should follow another extra column (no “class → classroom → floor” chain hanging off the roll number).\n\nBoyce–Codd normal form (BCNF) is stricter: every real X → A must have a superkey on the left. If every column is prime, 3NF is automatic, but BCNF can still fail. That “3NF but not BCNF” pattern is a favourite exam trap.",
      howTo: [
        "Keys first, then 1NF, then 2NF, then 3NF, then BCNF. Stop at the first fail if they ask “highest form”.",
        "3NF test: left superkey, or right-hand column prime.",
        "BCNF test: left must be a superkey. No escape hatch.",
        "To split a BCNF violation X → Y: one table XY, one table (rest + X). The join is lossless.",
      ],
      bullets: [
        "3NF: X → A is OK if X is a superkey or A is prime.",
        "BCNF: X → A is OK only if X is a superkey.",
        "All-prime attributes ⇒ 3NF, maybe not BCNF.",
      ],
      examples: [
        {
          title: "3NF but not BCNF",
          prompt:
            "DESK(officer, window, shift) with officer window → shift and shift → window. Highest normal form?",
          steps: [
            {
              do: "Close (officer, window) and (officer, shift): both give the whole table. Keys: those two pairs. Every column is prime.",
              why: "Each attribute sits in some candidate key, like every child being “part of some team name”.",
            },
            {
              do: "shift → window: left is not a superkey, but window is prime. 3NF allows this. 2NF is fine (no non-primes).",
              why: "3NF’s escape hatch is “the right-hand side is already part of a key”.",
            },
            {
              do: "BCNF forbids shift → window because shift is not a superkey. Highest form is 3NF.",
              why: "BCNF has no escape hatch. Overlapping keys plus an FD into a prime column is the classic picture.",
            },
          ],
          result:
            "Keys {officer, window} and {officer, shift}. In 3NF, not BCNF, because shift → window.",
        },
        {
          title: "Stops at 2NF (transitive extra)",
          prompt:
            "ALLOT(app, cat, city, quota) with app → cat city and city → quota. Highest form?",
          steps: [
            {
              do: "app+ is the whole table. Only candidate key is {app}. Non-primes: cat, city, quota.",
              why: "A single application number already names the row, like one form ID.",
            },
            {
              do: "Singleton key ⇒ 2NF holds (no partial key to hang extras on).",
              why: "2NF only complains about pieces of a composite key.",
            },
            {
              do: "city → quota: city is not a superkey, quota is not prime. 3NF fails. Highest form is 2NF.",
              why: "quota follows city, and city follows app — a transitive extra. That is a 3NF issue, not 2NF.",
            },
          ],
          result: "CK = {app}. Highest form is 2NF (city → quota breaks 3NF and BCNF).",
        },
        {
          title: "Already in BCNF",
          prompt:
            "TRADE(trade_id, isin, qty) with only trade_id → isin qty. Confirm BCNF.",
          steps: [
            {
              do: "trade_id+ is the whole table. Only candidate key {trade_id}.",
              why: "One trade ID, one row — a simple roll number.",
            },
            {
              do: "Every non-trivial FD has trade_id (a superkey) on the left.",
              why: "Nothing else determines anything else. No hidden city→floor chain.",
            },
            {
              do: "Tick 1NF, 2NF, 3NF, BCNF.",
              why: "Shortcut: one key, and all given FDs are “key → rest”, with no other determinants.",
            },
          ],
          result:
            "TRADE is in BCNF. Only candidate key {trade_id}; every real FD has that superkey on the left.",
        },
        {
          title: "City hangs off warehouse (transitive extra)",
          prompt:
            "BIN(bin_id, warehouse, city) with bin_id → warehouse city and warehouse → city. Highest normal form?",
          steps: [
            {
              do: "bin_id+ is the whole table. Only candidate key is {bin_id}. Non-primes: warehouse, city.",
              why: "One bin number already names the row, like one locker ID.",
            },
            {
              do: "Singleton key ⇒ 2NF holds. There is no composite key to hang a partial extra on.",
              why: "2NF only complains about pieces of a multi-column key.",
            },
            {
              do: "warehouse → city: warehouse is not a superkey, city is not prime. 3NF fails.",
              why: "city follows warehouse, and warehouse follows bin_id — a transitive extra. That is a 3NF issue.",
            },
            {
              do: "BCNF also fails (same FD, left is not a superkey). Highest form is 2NF.",
              why: "Walk 1NF → 2NF → 3NF → BCNF and stop at the first fail if they ask “highest”.",
            },
            {
              do: "Split: WH(warehouse, city) and BIN(bin_id, warehouse).",
              why: "Put the city with the warehouse card. The bin only stores which warehouse it sits in.",
            },
          ],
          result: "CK = {bin_id}. Highest form is 2NF (warehouse → city breaks 3NF and BCNF).",
        },
        {
          title: "Lossless BCNF split of a zip rule",
          prompt:
            "POST(street, city, zip) with street city → zip and zip → city. Write a lossless BCNF decomposition.",
          steps: [
            {
              do: "Close (street, city) and (street, zip): both give the whole table. Keys: those two pairs. Every column is prime.",
              why: "Overlapping keys, like the officer/window/shift picture, but with postal columns.",
            },
            {
              do: "zip → city: left is not a superkey, but city is prime, so 3NF allows it. BCNF forbids it.",
              why: "BCNF has no “right-hand side is prime” escape hatch.",
            },
            {
              do: "Split on the bad FD: R1(zip, city) and R2(street, zip).",
              why: "The repair is “XY in one table, rest plus X in the other” for a violating X → Y.",
            },
            {
              do: "R1 has key {zip} (zip → city). R2 has key {street, zip}. Both sides are BCNF.",
              why: "Each leftover FD has a superkey on the left inside its own table.",
            },
            {
              do: "The join of R1 and R2 on zip is lossless and recovers POST.",
              why: "X (zip) is a key of one piece, so the chase/join does not invent extra rows.",
            },
          ],
          result:
            "R1(zip, city) and R2(street, zip). Original was 3NF not BCNF; the split is BCNF and lossless.",
        },
      ],
    },
    {
      heading: "Relational algebra versus tuple calculus",
      body: "Relational algebra is a recipe language: you say how to cook. Select σ keeps rows, project π keeps columns (and drops duplicate rows), join ⋈ glues tables on matching values, minus − is “in the first list but not the second”. Division r ÷ s means “X-values that appear with every Y in s” — like “students who took every course on a list”.\n\nTuple calculus is a wish list: { t | P(t) } means “the tuples t that pass test P”. It must be safe: answers must come from values already in the database, not from an infinite sea of made-up names.",
      howTo: [
        "English first: which tables, which filter, which columns, set or bag.",
        "If the filter uses a column from another table, you must join (or product + select).",
        "“But never” → project then minus. “Every / all of a list” → division or ∀ in calculus.",
        "Push σ down onto the table that actually holds that column.",
      ],
      bullets: [
        "σ rows, π columns (set). Join = match then keep.",
        "r ÷ s: X that pair with every Y in s.",
        "{ t | ¬(t ∈ r) } is the classic unsafe calculus query.",
      ],
      examples: [
        {
          title: "Join, then project",
          prompt:
            "TRADE(tid, member, isin, qty), MEMBER(member, city). “ISINs traded by Mumbai members, each ISIN once.” Write algebra.",
          steps: [
            {
              do: "City is not in TRADE, so join TRADE with MEMBER on member, then keep city = Mumbai, then π_isin.",
              why: "You cannot filter a column that is not on the table — like asking a maths marksheet for “home city” without the student card.",
            },
            {
              do: "Better: π_isin(TRADE ⋈ σ_{city='Mumbai'}(MEMBER)).",
              why: "Filter the small MEMBER table first. Same answer, less work.",
            },
            {
              do: "π drops duplicate ISINs.",
              why: "Algebra as taught in exams is set-based unless they say otherwise.",
            },
          ],
          result:
            "π_isin(TRADE ⋈ σ_{city='Mumbai'}(MEMBER)). You cannot σ on city inside TRADE alone.",
        },
        {
          title: "Minus for “equity but never debt”",
          prompt:
            "TRADE(member, asset_class, qty) with EQ or DEBT. Members with at least one EQ trade and zero DEBT trades.",
          steps: [
            {
              do: "E = π_member(σ_{asset_class='EQ'}(TRADE)). D = π_member(σ_{asset_class='DEBT'}(TRADE)). Answer E − D.",
              why: "Minus is the word “but never”. Project to member first so both sides have the same heading.",
            },
            {
              do: "Do not use ∩ (that is “both”) or ∪ (that is “either”).",
              why: "Those are different English sentences.",
            },
            {
              do: "Do not subtract raw TRADE rows.",
              why: "Headings would still include asset_class; two EQ lots of the same member would look different.",
            },
          ],
          result:
            "π_member(σ_{asset_class='EQ'}(TRADE)) − π_member(σ_{asset_class='DEBT'}(TRADE)).",
        },
        {
          title: "Division: traded every ISIN on a watchlist",
          prompt:
            "TRADE(member, isin) rows: (M1,INEA), (M1,INEB), (M1,INEC), (M2,INEA), (M3,INEA), (M3,INEB). WATCH = {INEA, INEB}. TRADE ÷ WATCH?",
          steps: [
            {
              do: "Division heading is {member}. Check each member’s ISIN set against WATCH.",
              why: "Division is “for all on the list”. Extra ISINs are allowed; missing ones are not.",
            },
            {
              do: "M1 has {INEA, INEB, INEC} ⊇ WATCH — keep. M3 has exactly WATCH — keep. M2 is missing INEB — drop.",
              why: "Think: who ticked every box on the homework list?",
            },
            {
              do: "If asked, expand: r ÷ s = π_X(r) − π_X((π_X(r) × s) − r).",
              why: "That identity is the algebraic spelling of “remove anyone who misses a pair”.",
            },
          ],
          result: "TRADE ÷ WATCH = {M1, M3}. M2 is out for missing INEB.",
        },
        {
          title: "Filter HOLDER first, then join",
          prompt:
            "HOLD(pan, isin, qty), HOLDER(pan, city). “ISINs held by Pune pans, each ISIN once.” Write algebra two ways.",
          steps: [
            {
              do: "City is not in HOLD, so you must join HOLD with HOLDER on pan, keep city = Pune, then π_isin.",
              why: "You cannot filter a column that is not on the table — like asking a holdings sheet for “home city” without the holder card.",
            },
            {
              do: "Cheaper tree: π_isin(HOLD ⋈ σ_{city='Pune'}(HOLDER)).",
              why: "Filter the small HOLDER table first. Same answer, fewer join rows.",
            },
            {
              do: "Worse tree: σ_{city='Pune'}(HOLD ⋈ HOLDER) then π_isin — same result, more work.",
              why: "Pushing σ down onto the table that holds the column is the exam rewrite.",
            },
            {
              do: "π drops duplicate ISINs, so two Pune pans holding INEZ still print INEZ once.",
              why: "Exam algebra is set-based unless they say bag/multiset.",
            },
            {
              do: "Do not write σ_{city='Pune'}(HOLD). That column does not exist there.",
              why: "A select that names a missing attribute is illegal, not “empty”.",
            },
          ],
          result:
            "π_isin(HOLD ⋈ σ_{city='Pune'}(HOLDER)). You cannot σ on city inside HOLD alone.",
        },
        {
          title: "Unsafe calculus “not in HOLD”",
          prompt:
            "HOLD(pan, isin). Why is { t | ¬(t ∈ HOLD) } unsafe? Write a safe “pans in HOLDER that hold nothing”.",
          steps: [
            {
              do: "The wish list { t | t is not a HOLD row } would include every made-up tuple in the universe — infinite junk names.",
              why: "Safe calculus answers must be built from values already in the database, not from an infinite sea.",
            },
            {
              do: "That query is the classic unsafe example. The exam stem often shows exactly ¬(t ∈ r).",
              why: "Memorise the shape: “everything not in r” with no universe table.",
            },
            {
              do: "Safe version needs a universe: pans that exist in HOLDER. Algebra: π_pan(HOLDER) − π_pan(HOLD).",
              why: "Minus is “in the first list but not the second”, and both lists are finite projections.",
            },
            {
              do: "Calculus spelling: { h.pan | h ∈ HOLDER ∧ ¬∃x (x ∈ HOLD ∧ x.pan = h.pan) }.",
              why: "The outer tuple is pinned to HOLDER, so the answer cannot wander off into fake pans.",
            },
            {
              do: "Do not skip the universe and just write { t.pan | ¬∃x (x ∈ HOLD ∧ x.pan = t.pan) } — t is still free to be anything.",
              why: "A free tuple with only a negative test is the same unsafety in disguise.",
            },
          ],
          result:
            "{ t | ¬(t ∈ HOLD) } is unsafe. Safe: π_pan(HOLDER) − π_pan(HOLD), with HOLDER as the universe.",
        },
      ],
    },
    {
      heading: "Indexes and B+ trees (the dictionary picture)",
      body: "An index is a contents page for a file: (key, pointer). A dense index has one line per record. A sparse index has one line per disk block, and the data file must already be sorted — otherwise the page numbers lie.\n\nA B+ tree is like a printed dictionary: the real words (records) sit in order at the back, on linked leaf pages; the middle pages only store guide words and page numbers so you can jump. A B-tree also keeps some records in the middle pages. Hash files are great for “exactly this key”, bad for “keys from 1000 to 1099”.",
      howTo: [
        "Sorted file? Sparse index is legal. Heap (unsorted pile)? Need dense or hash.",
        "Dense count = number of records. Sparse count = number of data blocks.",
        "B+: data pointers only at linked leaves. Range query = find first leaf, walk the chain.",
        "Read the question’s definition of “order m” before you count keys versus children.",
      ],
      bullets: [
        "Dense: one index entry per record. Sparse: one per block, data must be sorted.",
        "B+ = dictionary: words at the back, page numbers in the middle. Leaves are linked.",
        "Hash for equality; B+ leaf chain for ranges.",
      ],
      examples: [
        {
          title: "Dense versus sparse count",
          prompt:
            "10_000 sorted trades, 500 blocks (20 per block), unique trade_id. Index packs 100 entries per index block. Dense vs sparse: how many entries and index blocks (one level)?",
          steps: [
            {
              do: "Dense: 10_000 entries, ceil(10000/100) = 100 index blocks.",
              why: "One contents-line per trade, even though the key is unique.",
            },
            {
              do: "Sparse: 500 entries (one per data block), ceil(500/100) = 5 index blocks.",
              why: "Sparse only stores “first key of this page”, like a thumb index on a dictionary.",
            },
            {
              do: "Uniqueness does not shrink the dense count.",
              why: "Dense is per record, not per distinct key. Sparse is per block, not per key either.",
            },
          ],
          result: "Dense 10_000 entries (100 blocks). Sparse 500 entries (5 blocks).",
        },
        {
          title: "Sparse index on a heap can miss",
          prompt:
            "TRADE is an unsorted heap. Someone stores one sparse entry per block using the first trade_id on that block. Why can a search for 500 miss?",
          steps: [
            {
              do: "Picture a block whose first record is 900 but 500 also sits on that block.",
              why: "A heap is a junk drawer. Min and max on neighbouring blocks overlap.",
            },
            {
              do: "The index only has (900, that block). A search for 500 never goes there.",
              why: "Sparse search assumes each block owns a clean key range, like sorted dictionary pages.",
            },
            {
              do: "Conclude: sparse needs a sorted data file. Heaps need dense or hash.",
              why: "The contents page only works if the book is in order.",
            },
          ],
          result:
            "Sparse on a heap can skip the block that holds the key. Sparse requires sorted data.",
        },
        {
          title: "B+ order 4: minimum keys",
          prompt:
            "B+ tree, order m = 4 means at most 4 child pointers (at most 3 keys) in an internal node. Half-full rule except the root. Minimum keys in a non-root internal node? In a leaf that holds at most 3 keys?",
          steps: [
            {
              do: "Internal: max children 4, min children ceil(4/2) = 2, so min keys = 1.",
              why: "Keys in the middle are separators: children = keys + 1.",
            },
            {
              do: "Leaf max 3 keys → min ceil(3/2) = 2 under the usual half-full rule.",
              why: "Leaves hold the real words. They still must stay at least half full, like packed dictionary pages.",
            },
            {
              do: "Data pointers live only at leaves in a B+ tree.",
              why: "That is the dictionary analogy: middle pages are only page numbers; the words are at the back, chained for a range scan.",
            },
          ],
          result:
            "Non-root internal: minimum 1 key (2 children). Leaf with max 3 keys: minimum 2 keys.",
        },
        {
          title: "8000 fills, 40 per block",
          prompt:
            "8000 sorted fills, 40 records per data block so 200 data blocks, unique fill_id. Index packs 80 entries per index block. Dense vs sparse: how many entries and index blocks (one level)?",
          steps: [
            {
              do: "Dense: one index line per fill → 8000 entries. ceil(8000/80) = 100 index blocks.",
              why: "Dense is a contents line for every record, even when the key is unique.",
            },
            {
              do: "Sparse: one line per data block → 200 entries. ceil(200/80) = 3 index blocks.",
              why: "Sparse only stores “first key of this page”, like a thumb index.",
            },
            {
              do: "Uniqueness does not shrink the dense count from 8000 to 200.",
              why: "Dense is per record, not per distinct key. Sparse is per block, not per key either.",
            },
            {
              do: "The data file must already be sorted for the sparse count to be legal.",
              why: "Sparse search assumes each block owns a clean key range.",
            },
            {
              do: "If they add a second index level, you would pack those 100 (or 3) blocks again — that is a different question.",
              why: "This stem asked one level. Do not invent a root unless they say so.",
            },
          ],
          result: "Dense 8000 entries (100 blocks). Sparse 200 entries (3 blocks).",
        },
        {
          title: "Hash cannot walk 7200 to 7299",
          prompt:
            "You need every allot_id from 7200 to 7299. The file is hashed on allot_id. Why is a B+ leaf chain better than the hash buckets?",
          steps: [
            {
              do: "Hash sends each key to a bucket with a mix function. Neighbours 7200 and 7201 usually land in different buckets.",
              why: "A hash is a locker number, not a sorted shelf. “From 7200 to 7299” is a range, not one equality.",
            },
            {
              do: "To answer the range you would scan every bucket (or 100 separate point lookups). That is a full file read in disguise.",
              why: "Hash is great for “exactly this key”, bad for “keys from A to B”.",
            },
            {
              do: "A B+ tree stores the real ids in order on linked leaves. Find 7200, then walk the leaf chain until 7299.",
              why: "The dictionary picture: words at the back, in order, with arrows to the next page.",
            },
            {
              do: "Internal B+ nodes are only guide words. Data pointers live at the leaves.",
              why: "That is why the range walk does not bounce around the middle pages.",
            },
            {
              do: "Pick hash for “allot_id = 7241”. Pick B+ for “7200 ≤ allot_id ≤ 7299”.",
              why: "Match the operator: equality → hash; range → B+ leaf chain.",
            },
          ],
          result:
            "Hash scatters neighbours. B+ finds 7200 then walks linked leaves to 7299. Hash for equality; B+ for ranges.",
        },
      ],
    },
    {
      heading: "ACID and the four mix-up bugs",
      body: "A transaction is one unit of work that should look all-or-nothing. ACID: Atomicity — all writes land, or none (undo on abort). Consistency — rules stay true. Isolation — two people at the counter do not see each other’s half-done work. Durability — after commit, a power cut does not eat the write (redo log).\n\nFour classic mix-ups: dirty read (you read ink that was not committed). Non-repeatable read (same row, two committed values). Phantom (a new row appears in a count). Lost update (two people add to a score; the last write wipes the first).",
      howTo: [
        "Name the bug from the trace: uncommitted value? same row twice? extra row in a range? two writers based on the same old number?",
        "Map ANSI levels: READ COMMITTED stops dirty; REPEATABLE READ stops non-repeatable; SERIALIZABLE stops phantoms.",
        "Atomicity = undo. Durability = redo. Do not swap them.",
        "Prefer one SQL UPDATE qty = qty + :d instead of read–compute–write.",
      ],
      bullets: [
        "Dirty = uncommitted. Non-repeatable = same row, two committed values. Phantom = new row in a filter. Lost update = last writer silently wins.",
        "READ COMMITTED ⊂ REPEATABLE READ ⊂ SERIALIZABLE in the ANSI table.",
        "Undo is atomicity; redo is durability.",
      ],
      examples: [
        {
          title: "Dirty read",
          prompt:
            "qty starts 100. T1 reads qty. T2 writes 40 then aborts (back to 100). T1 still uses 40. Name the bug and the weakest ANSI level that forbids it.",
          steps: [
            {
              do: "T1 read a value T2 had not committed. Call it a dirty read.",
              why: "Like reading a draft someone then tore up.",
            },
            {
              do: "Not non-repeatable (T2 never committed 40). Not a phantom (no new row). Not lost update (T1 did not write).",
              why: "Match the definition, not the vibes.",
            },
            {
              do: "Weakest fix: READ COMMITTED.",
              why: "That level only shows committed ink. Stronger levels also work, but the exam asks for the weakest.",
            },
          ],
          result: "Dirty read. Weakest ANSI level that forbids it: READ COMMITTED.",
        },
        {
          title: "Non-repeatable versus phantom",
          prompt:
            "T1 counts trades of INEA today → 4. T2 inserts a fifth INEA trade and commits. T1 counts again → 5. Classify versus “same member row, margin 8 then 2”.",
          steps: [
            {
              do: "The count changed because a new row entered the filter. Call it a phantom.",
              why: "A phantom is a ghost row in a range, not a change to a row you already held by primary key.",
            },
            {
              do: "Margin 8 then 2 on the same id is a non-repeatable read.",
              why: "Same locker, two different committed numbers.",
            },
            {
              do: "SERIALIZABLE (predicate / next-key locks) stops the phantom. REPEATABLE READ may still allow it in the ANSI table.",
              why: "Locking the rows you saw does not lock the empty gaps where a new trade can slip in.",
            },
          ],
          result:
            "Insert into a COUNT is a phantom. Same-row two values is non-repeatable. SERIALIZABLE stops phantoms.",
        },
        {
          title: "Lost update",
          prompt:
            "qty = 10. T1 reads 10, T2 reads 10, T1 writes 15 (add 5), T2 writes 7 (subtract 3). Final 7. What was lost? Would strict 2PL allow this?",
          steps: [
            {
              do: "Net should be 10+5−3 = 12. T2’s write of 7 based on stale 10 wiped T1’s +5. Lost update.",
              why: "Two people edit the same scoreboard from the same photo.",
            },
            {
              do: "Under strict 2PL, T1 keeps an exclusive lock until commit, so T2 waits, then computes 15−3 = 12.",
              why: "Locks force a turn. Blind last-write-wins is not a turn.",
            },
            {
              do: "Exam fix: UPDATE position SET qty = qty + :delta in one statement.",
              why: "Let the engine add atomically instead of read–think–write.",
            },
          ],
          result:
            "Lost update: 7 instead of 12. Strict 2PL would serialise the writes. Prefer qty = qty + :delta.",
        },
        {
          title: "Same cash row, two committed values",
          prompt:
            "cash starts 250. T1 reads 250. T2 writes 180 and commits. T1 reads cash again and sees 180. Name the bug and the weakest ANSI level that forbids it.",
          steps: [
            {
              do: "T1 saw two committed values on the same row. Call it a non-repeatable read.",
              why: "Same locker, two different finished numbers. T2 did commit 180, so the ink was real.",
            },
            {
              do: "Not a dirty read — T2 had committed before the second read.",
              why: "Dirty means you copied a draft that was later torn up.",
            },
            {
              do: "Not a phantom — no new row appeared in a count. Not a lost update — T1 did not write.",
              why: "Match the definition, not the vibes.",
            },
            {
              do: "READ COMMITTED still allows this (each read sees the latest commit). Weakest fix: REPEATABLE READ.",
              why: "That level keeps the first snapshot of the row. SERIALIZABLE also works, but the exam asks for the weakest.",
            },
            {
              do: "A second COUNT of “cash rows where cash > 200” that grows because a new row was inserted would be a phantom instead.",
              why: "Same-row two values ≠ extra row in a filter.",
            },
          ],
          result:
            "Non-repeatable read. Weakest ANSI level that forbids it: REPEATABLE READ.",
        },
        {
          title: "Power cut after COMMIT (durability)",
          prompt:
            "T1 UPDATE qty = 70, then COMMIT. The plug is pulled before the dirty buffer is flushed to the data file. The redo log has the change. What is qty after recovery, and which ACID letter is that?",
          steps: [
            {
              do: "COMMIT succeeded, so the transaction is done. Recovery must restore qty = 70.",
              why: "Durability: after commit, a power cut must not eat the write.",
            },
            {
              do: "Redo the logged change onto the data file. That is the redo log’s job.",
              why: "The log is the durable notebook. The buffer was only a whiteboard.",
            },
            {
              do: "This is not atomicity. Atomicity would UNDO T1 if it had aborted or never committed.",
              why: "Undo is “all or nothing for an unfinished unit”. Redo is “keep the stamp of commit”. Do not swap the letters.",
            },
            {
              do: "If T1 had written 70 but not yet committed, recovery would undo back to the old qty.",
              why: "Uncommitted ink is a draft. Atomicity rubs it out.",
            },
            {
              do: "Isolation and consistency are about other people and rules, not about the crash after commit.",
              why: "Name D for this stem. The crash-after-commit picture is the durability poster.",
            },
          ],
          result:
            "qty is 70 after redo. Durability (D). Atomicity would undo only if T1 had not committed.",
        },
      ],
    },
    {
      heading: "Conflict serialisability and 2PL",
      body: "Two operations conflict if they are from different transactions, touch the same cell, and at least one writes. Draw a conflict graph: arrow Ti → Tj if Ti’s conflicting op happens first. If the graph has no cycle, the schedule is conflict serialisable (CSR) — it matches some one-at-a-time order.\n\nTwo-phase locking (2PL) is “grow then shrink”: take locks, then (later) release them; never lock again after the first unlock. 2PL guarantees CSR. Strict 2PL keeps write locks until commit, so nobody reads ink that might be undone. Optimistic control (OCC) works on a private copy, then checks; if someone else committed a clash, you abort and retry.",
      howTo: [
        "List every pair of ops on the same object where one is a write. Draw Ti → Tj for “i first”.",
        "Cycle ⇒ not CSR. No cycle ⇒ any topological order is an equivalent serial order.",
        "2PL check: any lock after an unlock? If yes, not 2PL. Strict: any write-unlock before commit? If yes, not strict.",
        "OCC: abort if a committed writer touched something you read.",
      ],
      bullets: [
        "CSR ⇔ acyclic conflict graph.",
        "2PL ⇒ CSR. Strict 2PL: hold X-locks until commit (no cascade abort).",
        "OCC: read → validate → write; abort on overlap instead of waiting.",
      ],
      examples: [
        {
          title: "A two-cycle is not CSR",
          prompt: "S: r1(A); w2(A); w1(A); c1; c2. CSR or not?",
          steps: [
            {
              do: "Conflicts: r1 with w2 (T1 → T2), and w2 with w1 (T2 → T1).",
              why: "Read-write and write-write on A both count. Same-transaction pairs do not.",
            },
            {
              do: "Graph is a two-cycle. Not CSR.",
              why: "A cycle means “T1 before T2 and T2 before T1” — no one-at-a-time story matches.",
            },
            {
              do: "Commits at the end do not erase conflict arrows.",
              why: "CSR is about the order of reads and writes, not about who said “done” last.",
            },
          ],
          result: "Cycle T1 ⇄ T2. S is not conflict serialisable.",
        },
        {
          title: "2PL versus strict 2PL",
          prompt:
            "T1: lock-X(A); w(A); unlock(A); lock-X(B); w(B); unlock(B); commit. Is this 2PL? Strict? Can T2 dirty-read A?",
          steps: [
            {
              do: "T1 unlocked A then locked B. That is not two-phase at all.",
              why: "2PL is one growing phase then one shrinking phase — like putting all padlocks on before you start taking any off.",
            },
            {
              do: "Rewrite: lock A and B first, write, then unlock. That is 2PL. Unlocking A before commit is still not strict 2PL.",
              why: "Strict means write-locks stay until the stamp of commit, so nobody copies ink that might be rubbed out.",
            },
            {
              do: "After an early unlock of A, T2 can read uncommitted A and may have to abort if T1 aborts (cascade).",
              why: "That is why exams pair “2PL ⇒ CSR” with “strict 2PL ⇒ no cascading abort”.",
            },
          ],
          result:
            "Lock after unlock is not 2PL. Unlock-X before commit is 2PL but not strict; T2 can dirty-read A.",
        },
        {
          title: "OCC validation fails",
          prompt:
            "T1 and T2 both OCC-read margin=8. T1 validates, writes 12, commits. T2 then validates. Does T2 commit?",
          steps: [
            {
              do: "T1 had no committed rival, so T1 writes 12.",
              why: "OCC does not lock during the read; it bets that clashes are rare.",
            },
            {
              do: "T2’s read-set includes M1, T1’s write-set includes M1, and T1 committed in T2’s window. Validation fails. T2 aborts.",
              why: "RS(T2) ∩ WS(T1) ≠ ∅. Same lost-update pattern, caught at check time instead of with locks.",
            },
            {
              do: "T2 may restart and now read 12.",
              why: "Retry is the OCC “wait” — you throw away the private copy.",
            },
          ],
          result:
            "T2 fails validation (overlap on M1) and aborts. T1’s 12 stands.",
        },
        {
          title: "A chain, not a cycle, is CSR",
          prompt: "S: r1(X); w1(X); r2(X); w2(X); c1; c2. CSR or not? Equivalent serial order?",
          steps: [
            {
              do: "Conflicts on X: r1 with w2, w1 with r2, w1 with w2. In each pair T1 happens first, so arrows T1 → T2.",
              why: "Read-write and write-write on the same cell count. Same-transaction pairs (r1 with w1) do not.",
            },
            {
              do: "No arrow T2 → T1. The graph is a chain, not a cycle.",
              why: "A cycle would mean “T1 before T2 and T2 before T1”. Here every conflict agrees: T1 first.",
            },
            {
              do: "S is conflict serialisable. Equivalent serial order is T1 then T2.",
              why: "Any topological order of an acyclic conflict graph is an equivalent one-at-a-time story.",
            },
            {
              do: "Commits at the end do not add conflict arrows.",
              why: "CSR is about the order of reads and writes, not about who said “done” last.",
            },
            {
              do: "If you swapped in an extra w2(X) before w1(X), you would grow a back-edge and lose CSR.",
              why: "One reversed write-write is enough to make a two-cycle.",
            },
          ],
          result: "Acyclic: only T1 → T2. S is CSR. Equivalent serial order T1 then T2.",
        },
        {
          title: "Grow, write, commit, then unlock",
          prompt:
            "T1: lock-X(P); lock-X(Q); w(P); w(Q); commit; unlock(P); unlock(Q). Is this 2PL? Strict 2PL? Does it guarantee CSR?",
          steps: [
            {
              do: "All locks come first; all unlocks come after the last lock. That is two-phase.",
              why: "2PL is “put every padlock on, then (later) take them off”. No lock after the first unlock.",
            },
            {
              do: "Write-locks stay until commit, then drop. That is strict 2PL.",
              why: "Strict means nobody can copy P or Q until T1 has stamped commit, so there is no cascade abort on those writes.",
            },
            {
              do: "2PL ⇒ conflict serialisable, so this schedule’s conflict graph cannot cycle if every transaction follows 2PL.",
              why: "The exam slogan is “2PL ⇒ CSR”. Strict is extra (no cascade), not extra serialisability.",
            },
            {
              do: "If T1 unlocked P before commit (but after both locks), it would still be 2PL, but not strict.",
              why: "That early unlock is the dirty-read window for T2.",
            },
            {
              do: "If T1 unlocked P and then locked Q, it would not be 2PL at all.",
              why: "A lock after an unlock is a second growing phase — the classic fail.",
            },
          ],
          result:
            "This is strict 2PL (hence 2PL, hence CSR). Unlocks wait until after commit.",
        },
      ],
    },
  ],
};
