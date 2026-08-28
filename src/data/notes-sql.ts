import type { TopicNote } from "@/data/notes";

export const notesSql: TopicNote = {
  topic: "sql",
  title: "SQL — techniques (beginner)",
  blurb:
    "SQL is the language of tables. Walk every example row by row. The exam loves WHERE versus HAVING, COUNT(*) versus COUNT(col), joins, and the NOT IN plus NULL trap. Do not guess from English — tick the rows.",
  blocks: [
    {
      heading: "WHERE versus HAVING, and GROUP BY",
      body: "SELECT builds a result table. The engine’s homework order is FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. WHERE looks at one raw row, like checking each apple. HAVING looks at a whole group, like checking a bag of apples after you weighed it.\n\nGROUP BY folds rows that share the same group-key. In standard SQL every selected non-aggregate column must be in the GROUP BY list. You cannot put SUM(qty) in WHERE, because WHERE runs before groups exist.",
      howTo: [
        "Recite the order: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY.",
        "Row filter (side = 'B', city = 'Mum') → WHERE. Group filter (SUM(qty) >= 50) → HAVING.",
        "If you SELECT a bare column, it must be in GROUP BY (or wrapped in an aggregate).",
        "Aliases from SELECT are not visible in WHERE. Prefer HAVING SUM(qty) >= 50, not HAVING tot >= 50, in exam answers.",
      ],
      bullets: [
        "WHERE = each row. HAVING = each group. Aggregates never live in WHERE.",
        "GROUP BY already makes one row per group; DISTINCT on the group key is extra.",
        "No GROUP BY + HAVING = one group (the whole table).",
      ],
      examples: [
        {
          title: "SUM belongs in HAVING",
          prompt:
            "TRADE: (M1, 10), (M1, 40), (M2, 5), (M3, 80). Members whose total qty is at least 50?",
          code: "SELECT member, SUM(qty) AS tot\nFROM trade\nGROUP BY member\nHAVING SUM(qty) >= 50;",
          language: "sql",
          steps: [
            {
              do: "Reject WHERE SUM(qty) >= 50. WHERE runs too early; each row is still one trade.",
              why: "You cannot weigh the bag before you have put apples in it.",
            },
            {
              do: "Group: M1 sum 50, M2 sum 5, M3 sum 80. HAVING keeps M1 and M3.",
              why: "HAVING is the bag-check after GROUP BY.",
            },
            {
              do: "You may still WHERE qty >= 10 first, then group, then HAVING — that is row filter then group filter.",
              why: "Both clauses can appear; they just answer different questions.",
            },
          ],
          result: "Legal query uses HAVING. Result (M1, 50) and (M3, 80).",
        },
        {
          title: "WHERE changes what goes into the group",
          prompt:
            "Rows: (INEA, B, 10), (INEA, S, 4), (INEB, B, 7), (INEA, B, 6). SELECT isin, SUM(qty) WHERE side = 'B' GROUP BY isin.",
          code: "SELECT isin, SUM(qty) AS buy_qty\nFROM trade\nWHERE side = 'B'\nGROUP BY isin;",
          language: "sql",
          steps: [
            {
              do: "WHERE keeps the three B rows and drops the S row.",
              why: "Row filters happen before bags are formed.",
            },
            {
              do: "INEA group {10, 6} sums to 16. INEB group {7} sums to 7.",
              why: "Without WHERE, INEA would have been 10+4+6 = 20, mixing buys and sells.",
            },
            {
              do: "If you needed “groups whose buy total > 10”, add HAVING SUM(qty) > 10 after this.",
              why: "HAVING still waits until the groups exist.",
            },
          ],
          result: "(INEA, 16) and (INEB, 7). The sell never entered a group.",
        },
        {
          title: "Naked city next to GROUP BY member",
          prompt:
            "TRADE(member, city, qty), and member → city. SELECT member, city, SUM(qty) GROUP BY member — legal?",
          code: "SELECT member, city, SUM(qty)\nFROM trade\nGROUP BY member, city;",
          language: "sql",
          steps: [
            {
              do: "Standard SQL: city is neither grouped nor aggregated, so GROUP BY member alone is illegal.",
              why: "The engine is not required to guess that member already tells you the city.",
            },
            {
              do: "GROUP BY member, city is legal. If the FD is true, you still get one row per member.",
              why: "City does not split the member further when each member has one city.",
            },
            {
              do: "If the FD is a lie in the data (M1 in two cities), two groups is the honest answer.",
              why: "Putting city in GROUP BY also protects you when the data is messy.",
            },
          ],
          result:
            "First form is not standard SQL. GROUP BY member, city is the exam-safe spelling.",
        },
      ],
    },
    {
      heading: "COUNT(*) versus COUNT(col), SUM, AVG, NULL",
      body: "COUNT(*) counts rows, even rows with holes. COUNT(col) counts how many times col is not NULL. COUNT(DISTINCT col) counts different non-null values. SUM and AVG skip NULLs. AVG divides by the count of non-nulls, not by COUNT(*).\n\nIf every qty is NULL, SUM is NULL (not 0) and COUNT(qty) is 0, but COUNT(*) is still the row count. Think: empty addends are “unknown”, not zero, unless you COALESCE.",
      howTo: [
        "Draw the column. Cross out NULLs for COUNT(col), SUM, AVG. Keep them for COUNT(*).",
        "AVG = (sum of known numbers) / (how many known numbers).",
        "All-NULL group: SUM is NULL, COUNT(qty) is 0, the group still exists.",
        "Need buy and sell in one row? SUM(CASE WHEN side = 'B' THEN qty END), not WHERE side = 'B'.",
      ],
      bullets: [
        "COUNT(*) = rows. COUNT(col) skips NULL. COUNT(DISTINCT col) skips NULL then unique.",
        "SUM/AVG skip NULL. AVG’s divisor is COUNT(col), not COUNT(*).",
        "All NULL → SUM/AVG are NULL, not 0.",
      ],
      examples: [
        {
          title: "Five trades, two holes",
          prompt:
            "qty: 10, NULL, 10, NULL, 30. Compute COUNT(*), COUNT(qty), COUNT(DISTINCT qty), SUM(qty), AVG(qty).",
          code: "SELECT COUNT(*), COUNT(qty), COUNT(DISTINCT qty), SUM(qty), AVG(qty)\nFROM trade;",
          language: "sql",
          steps: [
            {
              do: "Five rows → COUNT(*) = 5. Known qty values 10, 10, 30 → COUNT(qty) = 3.",
              why: "Star counts paper rows. COUNT(col) counts filled boxes.",
            },
            {
              do: "Distinct known qty {10, 30} → 2. SUM = 50. AVG = 50/3, not 50/5.",
              why: "AVG ignores holes; it does not treat them as zero.",
            },
            {
              do: "If the question wanted “treat missing as 0”, that is SUM(qty)/COUNT(*), a different formula.",
              why: "Read the English. Default AVG is not that.",
            },
          ],
          result: "5, 3, 2, 50, 50/3.",
        },
        {
          title: "GROUP BY city with mixed NULL qty",
          prompt:
            "(Mum, 10), (Mum, NULL), (Pune, NULL), (Pune, NULL). SELECT city, COUNT(*), COUNT(qty), SUM(qty) GROUP BY city.",
          code: "SELECT city, COUNT(*) AS n, COUNT(qty) AS nq, SUM(qty) AS s\nFROM trade\nGROUP BY city;",
          language: "sql",
          steps: [
            {
              do: "Mum: n=2, nq=1, s=10. Pune: n=2, nq=0, s=NULL (not 0).",
              why: "SUM of no known numbers is unknown. COALESCE(SUM(qty),0) would print 0 if a report needs a zero.",
            },
            {
              do: "HAVING SUM(qty) > 0 drops Pune, because NULL > 0 is not true.",
              why: "Unknown fails a WHERE/HAVING test.",
            },
            {
              do: "HAVING COUNT(qty) = 0 keeps Pune. HAVING COUNT(*) = 0 cannot keep a group that was built from rows.",
              why: "A group exists because at least one row made it.",
            },
          ],
          result: "Mum → (2, 1, 10). Pune → (2, 0, NULL).",
        },
        {
          title: "Buy and sell in one row with CASE",
          prompt:
            "(B, 10), (S, 4), (B, 6), (S, NULL). One row: buy_qty, sell_qty, all_qty.",
          code: "SELECT\n  SUM(CASE WHEN side = 'B' THEN qty END) AS buy_qty,\n  SUM(CASE WHEN side = 'S' THEN qty END) AS sell_qty,\n  SUM(qty) AS all_qty\nFROM trade;",
          language: "sql",
          steps: [
            {
              do: "Buy CASE yields 10 and 6 → 16. Sell CASE yields 4 (NULL skipped) → 4. SUM(qty) = 20.",
              why: "CASE turns the other side into NULL, and SUM skips NULL. That is “ignore”, not “zero the whole sum”.",
            },
            {
              do: "You cannot WHERE side = 'B' and still get sell_qty in the same row.",
              why: "WHERE would throw the sell rows away before any SUM.",
            },
            {
              do: "COUNT(CASE WHEN side = 'B' THEN 1 END) counts buy rows even if qty is NULL. COUNT(... THEN qty) would skip that hole.",
              why: "THEN 1 looks at the row, THEN qty looks at the number.",
            },
          ],
          result: "One row: buy_qty = 16, sell_qty = 4, all_qty = 20.",
        },
      ],
    },
    {
      heading: "INNER JOIN and CROSS JOIN",
      body: "A join is “pair rows, then keep some pairs”. CROSS JOIN is every left row with every right row — a full grid, m × n cells. INNER JOIN keeps only pairs that match the ON rule. If a left key matches three right rows, that left row appears three times. If it matches zero, it vanishes.\n\nFor inner joins, ON and WHERE agree (both filter the grid). They do not agree for outer joins. Prefer ON col = col. NATURAL JOIN is a trap if leftover like-named columns exist.",
      howTo: [
        "Write the left row. Scan the right table for matches. Emit one result per match.",
        "Zero matches → inner join emits nothing for that row.",
        "Empty table × anything = empty (not “keep the other side”).",
        "Self join: two aliases of the same table (employee and manager).",
      ],
      bullets: [
        "CROSS JOIN: |L| × |R|. INNER JOIN: matching pairs only.",
        "k matches → k copies of the left row. 0 matches → gone.",
        "ON and WHERE coincide for INNER JOIN only.",
      ],
      examples: [
        {
          title: "Walk an inner join",
          prompt:
            "BROKER: (1, Nuvama), (2, Zerodha), (3, Angel). TRADE: (10, 1, 100), (11, 1, 50), (12, 3, 20), (13, 9, 5). INNER JOIN on broker_id = id.",
          code: "SELECT t.tid, b.name, t.qty\nFROM trade t\nINNER JOIN broker b ON t.broker_id = b.id;",
          language: "sql",
          steps: [
            {
              do: "10 and 11 match Nuvama. 12 matches Angel. 13’s broker 9 is missing — drop. Zerodha matched no trade — drop.",
              why: "Inner join is a handshake. No partner, no row.",
            },
            {
              do: "Count three result rows, not four trades and not three brokers.",
              why: "You count matching pairs, not parents.",
            },
            {
              do: "Nuvama appears twice because it has two trades.",
              why: "One-to-many fans out. That is normal, not a bug.",
            },
          ],
          result:
            "(10, Nuvama, 100), (11, Nuvama, 50), (12, Angel, 20). Zerodha and trade 13 disappear.",
        },
        {
          title: "CROSS JOIN of two tiny lists",
          prompt: "SIDE: B, S. VENUE: NSE, BSE. How many rows? What if one list is empty?",
          code: "SELECT s.s, v.v\nFROM side s\nCROSS JOIN venue v;",
          language: "sql",
          steps: [
            {
              do: "2 × 2 = 4 pairs: (B,NSE), (B,BSE), (S,NSE), (S,BSE).",
              why: "Cross join is a grid, not a match.",
            },
            {
              do: "0 × n = 0. An empty operand wipes the product.",
              why: "Keeping the other table is an outer-join idea.",
            },
            {
              do: "INNER JOIN ON TRUE is the same four rows. INNER JOIN with no ON is a syntax error.",
              why: "CROSS JOIN is the spelled-out product.",
            },
          ],
          result: "Four rows. Empty operand ⇒ empty product.",
        },
        {
          title: "Self join of a reporting chain",
          prompt:
            "EMP: (1, Ira, NULL), (2, Dev, 1), (3, Nia, 1), (4, Raj, 2). Join e.boss = m.id. Who drops?",
          code: "SELECT e.name AS emp, m.name AS mgr\nFROM emp e\nINNER JOIN emp m ON e.boss = m.id;",
          language: "sql",
          steps: [
            {
              do: "Ira’s boss is NULL. NULL = m.id is never true. Ira drops.",
              why: "The CEO has no manager row. Inner join will not invent one.",
            },
            {
              do: "Emit (Dev, Ira), (Nia, Ira), (Raj, Dev).",
              why: "Each employee with a real boss id finds that manager alias.",
            },
            {
              do: "A LEFT JOIN would keep (Ira, NULL) as a fourth row.",
              why: "Left join is “keep the left even without a partner”.",
            },
          ],
          result: "Three rows. CEO Ira is dropped by INNER JOIN.",
        },
      ],
    },
    {
      heading: "LEFT, RIGHT, and FULL outer joins",
      body: "LEFT JOIN keeps every left row. Matches look like inner join; a lonely left row gets NULLs on the right, like an empty seat. RIGHT JOIN keeps every right row. FULL JOIN keeps both lonely sides.\n\nPaper method: write the inner matches, then add one padded row per unused left (LEFT), unused right (RIGHT), or both (FULL). A WHERE on a right-hand column after LEFT JOIN usually throws the empty seats away and turns the join back into inner. COUNT(right.pk) skips pads so you can show zeros; COUNT(*) counts pads too.",
      howTo: [
        "Matches first. Then pad unused rows on the preserved side(s).",
        "Never duplicate a matched row when you add pads.",
        "Need “parents with zero children”? LEFT JOIN and COUNT(child.pk), not COUNT(*).",
        "Filter the right table in ON (not WHERE) if you still want unmatched left rows.",
      ],
      bullets: [
        "LEFT: all left + NULL pads. RIGHT: all right. FULL: both orphans.",
        "WHERE on a right column after LEFT JOIN ≈ inner join.",
        "COUNT(child.pk) gives zeros; COUNT(*) does not.",
      ],
      examples: [
        {
          title: "LEFT JOIN keeps Zerodha",
          prompt:
            "Same brokers and trades as the inner-join example. FROM broker LEFT JOIN trade. What happens to Zerodha and to orphan trade 13?",
          code: "SELECT b.name, t.tid\nFROM broker b\nLEFT JOIN trade t ON t.broker_id = b.id;",
          language: "sql",
          steps: [
            {
              do: "Keep the three matches. Add (Zerodha, NULL). Drop trade 13 (it is not on the left).",
              why: "Left join preserves the left table. An orphan on the right is invisible from this side.",
            },
            {
              do: "FROM trade LEFT JOIN broker would keep trade 13 as (NULL, 13) and drop Zerodha.",
              why: "The preserved side is whichever table you wrote first (the LEFT operand).",
            },
            {
              do: "RIGHT JOIN with FROM trade RIGHT JOIN broker is the same as broker LEFT JOIN trade.",
              why: "Right join is left join with the tables swapped.",
            },
          ],
          result:
            "(Nuvama, 10), (Nuvama, 11), (Angel, 12), (Zerodha, NULL). Trade 13 is not here.",
        },
        {
          title: "WHERE after LEFT JOIN wipes the pad",
          prompt:
            "LEFT JOIN broker to trade, then WHERE t.qty >= 50. Trades: 100, 50, 20, and Zerodha’s pad. What remains?",
          code: "SELECT b.name, t.tid, t.qty\nFROM broker b\nLEFT JOIN trade t ON t.broker_id = b.id\nWHERE t.qty >= 50;",
          language: "sql",
          steps: [
            {
              do: "Intermediate has Zerodha with qty NULL, Angel 20, Nuvama 100 and 50.",
              why: "Pads use NULL for every right-hand column.",
            },
            {
              do: "WHERE qty >= 50: keep 100 and 50. Drop 20. NULL >= 50 is unknown — drop Zerodha.",
              why: "WHERE does not keep empty seats. You just computed an inner join.",
            },
            {
              do: "To keep Zerodha while filtering trades, put qty >= 50 in ON, not WHERE.",
              why: "ON decides matching; WHERE decides who survives the result. Pads fail WHERE on right columns.",
            },
          ],
          result:
            "Only Nuvama 100 and Nuvama 50. WHERE on t.qty turned LEFT JOIN into inner join.",
        },
        {
          title: "LEFT JOIN plus COUNT for zeros",
          prompt:
            "Circulars C1 KYC, C2 Algo, C3 Insider. Acks: two for C1, one for C2. COUNT(a.cid) after LEFT JOIN.",
          code: "SELECT c.title, COUNT(a.cid) AS n_ack\nFROM circular c\nLEFT JOIN ack a ON c.cid = a.cid\nGROUP BY c.title;",
          language: "sql",
          steps: [
            {
              do: "KYC → 2, Algo → 1, Insider → one padded row with a.cid NULL, COUNT(a.cid) = 0.",
              why: "COUNT skips NULL. The left row still created a group.",
            },
            {
              do: "COUNT(*) for Insider would be 1 — wrongly “one ack”.",
              why: "The pad is a row. Star counts rows.",
            },
            {
              do: "Inner join would hide C3, so you would never see the zero.",
              why: "Zeros need the pad, then COUNT of the child key.",
            },
          ],
          result: "KYC 2, Algo 1, Insider 0. Must LEFT JOIN and COUNT(a.cid).",
        },
      ],
    },
    {
      heading: "VIEW, DELETE, TRUNCATE, DROP, ALTER",
      body: "A VIEW is a saved SELECT — a window, not a second copy of the rows (unless it is materialised). Simple views can be updated; views with GROUP BY or DISTINCT usually cannot. WITH CHECK OPTION refuses a change that would make the row fall out of the window.\n\nDELETE removes rows (WHERE allowed, triggers fire, can ROLLBACK). TRUNCATE empties the whole table in one go (no WHERE, usually no per-row triggers). DROP removes the object. ALTER changes the shape (add/drop a column). Exam quartet: ALTER = shape, DELETE/TRUNCATE = rows, DROP = the thing is gone.",
      howTo: [
        "Ask: do rows remain? does the table remain? did triggers fire? can you WHERE? can you ROLLBACK?",
        "VIEW gone ≠ table gone. DROP TABLE takes indexes with it.",
        "Need a subset of rows gone → DELETE … WHERE. Need all rows gone fast → TRUNCATE (if allowed).",
        "WITH CHECK OPTION: new/changed rows must still satisfy the view’s WHERE.",
      ],
      bullets: [
        "VIEW = stored SELECT. WITH CHECK OPTION enforces the view filter.",
        "DELETE: row-level, WHERE, triggers, transactional. TRUNCATE: all rows, no WHERE.",
        "DROP removes the object. ALTER changes the definition.",
      ],
      examples: [
        {
          title: "WITH CHECK OPTION rejects a disappearing row",
          prompt:
            "View v_mum = members in Mumbai, WITH CHECK OPTION. UPDATE city to Pune for M1. INSERT a Pune row through the view. What happens?",
          code: "CREATE VIEW v_mum AS\nSELECT id, city, margin FROM member\nWHERE city = 'Mumbai'\nWITH CHECK OPTION;",
          language: "sql",
          steps: [
            {
              do: "Both the city-change and the Pune insert fail CHECK OPTION.",
              why: "The window must still show the row after the change. Pune would vanish from v_mum.",
            },
            {
              do: "Without CHECK OPTION the update would succeed on the base table and M1 would disappear from the view.",
              why: "That “vanishing row” is the bug CHECK OPTION exists to stop.",
            },
            {
              do: "A grouped view (SUM) is not updatable even with CHECK OPTION.",
              why: "There is no single base row to write back to.",
            },
          ],
          result:
            "UPDATE to Pune and INSERT of Pune are rejected. M1 stays Mumbai.",
        },
        {
          title: "DELETE versus TRUNCATE",
          prompt:
            "TRADE has 4 rows and a DELETE trigger into AUDIT. Contrast DELETE FROM trade with TRUNCATE TABLE trade.",
          code: "DELETE FROM trade;\nTRUNCATE TABLE trade;",
          language: "sql",
          steps: [
            {
              do: "DELETE visits each row, fires the trigger 4 times, can ROLLBACK in a transaction (PostgreSQL-style).",
              why: "DELETE is row-level homework. It also allows WHERE venue = 'NSE'.",
            },
            {
              do: "TRUNCATE empties in bulk. Per-row triggers do not run. No WHERE. May reset identity. FK children often block it.",
              why: "TRUNCATE is “replace the notebook”, not “erase line by line”.",
            },
            {
              do: "MySQL TRUNCATE often auto-commits, so ROLLBACK will not bring rows back. Read the engine if named.",
              why: "If the paper is silent, say: DELETE is transactional row-level; TRUNCATE is a bulk reset.",
            },
          ],
          result:
            "DELETE: 4 trigger firings, WHERE allowed. TRUNCATE: no per-row triggers, no WHERE, may reset identity.",
        },
        {
          title: "DROP VIEW versus DROP TABLE versus ALTER",
          prompt:
            "Table MEMBER, view v_mum, index on city. What survives (a) DROP VIEW v_mum (b) ALTER DROP COLUMN margin (c) DROP TABLE member RESTRICT?",
          code: "DROP VIEW v_mum;\nALTER TABLE member DROP COLUMN margin;\nDROP TABLE member RESTRICT;",
          language: "sql",
          steps: [
            {
              do: "(a) only the view goes. Table and index stay. (b) rows stay, minus margin.",
              why: "ALTER changes shape. DROP VIEW does not drop the base table.",
            },
            {
              do: "(c) RESTRICT fails if dependents remain; with the view gone it drops the table and its indexes (if no child FKs).",
              why: "DROP TABLE removes the object. CASCADE would also drop leftover views.",
            },
            {
              do: "Do not DROP + CREATE to “alter” if you need the data. DROP wipes rows.",
              why: "That is the exam contrast: ALTER keeps rows (minus the dropped column).",
            },
          ],
          result:
            "(a) table remains (b) rows remain without margin (c) table and indexes gone if no dependents.",
        },
      ],
    },
    {
      heading: "UNION, UNION ALL, INTERSECT, EXCEPT",
      body: "Set operators stack two queries with the same number of columns. UNION = stack then drop duplicates. UNION ALL = stack and keep copies. INTERSECT = rows in both (distinct by default). EXCEPT (MINUS in Oracle) = left minus right.\n\nFor set operators, two NULLs count as equal (unlike WHERE col = NULL). Names come from the first SELECT. ORDER BY only at the end. Parenthesise when you mix UNION and EXCEPT.",
      howTo: [
        "Check column count and types first.",
        "Ask: keep duplicates? both sides? left only?",
        "INTERSECT is not INNER JOIN — join can fan out pairs; intersect compares whole rows.",
        "Always put parentheses when mixing operators.",
      ],
      bullets: [
        "UNION = concat + DISTINCT. UNION ALL = concat. INTERSECT = both. EXCEPT = left minus right.",
        "Set operators treat NULLs as equal. WHERE col = NULL never is.",
        "EXCEPT is not symmetric. Empty right ⇒ NOT IN-like “all left rows” for distinct EXCEPT of a subset.",
      ],
      examples: [
        {
          title: "UNION versus UNION ALL",
          prompt: "W1: INEA, INEB, INEA. W2: INEB, INEC. UNION vs UNION ALL.",
          code: "SELECT isin FROM w1\nUNION\nSELECT isin FROM w2;",
          language: "sql",
          steps: [
            {
              do: "UNION ALL concatenates five rows (two INEA, two INEB, one INEC).",
              why: "ALL means “keep the pile, do not tidy”.",
            },
            {
              do: "UNION then unique-ifies to {INEA, INEB, INEC}.",
              why: "Plain UNION is “the set of names on either list”.",
            },
            {
              do: "Two NULL rows would collapse to one under UNION, stay two under UNION ALL.",
              why: "Set operators treat NULL as a value equal to NULL.",
            },
          ],
          result: "UNION → three rows. UNION ALL → five rows.",
        },
        {
          title: "INTERSECT does not fan out",
          prompt:
            "TRADED: M1, M2, M2, M3. INSPECTED: M2, M4, M2. INTERSECT on member.",
          code: "SELECT member FROM traded\nINTERSECT\nSELECT member FROM inspected;",
          language: "sql",
          steps: [
            {
              do: "Sets {M1,M2,M3} ∩ {M2,M4} = {M2}. One row.",
              why: "Default INTERSECT is DISTINCT. Both sides having M2 twice still yields one M2.",
            },
            {
              do: "An INNER JOIN of those bags would be 2×2 = 4 M2 pairs.",
              why: "Join multiplies matching copies. Intersect does not.",
            },
            {
              do: "INTERSECT ALL (where supported) would keep min(2,2) = 2 copies of M2.",
              why: "ALL uses multiplicities, like a bag intersection.",
            },
          ],
          result: "INTERSECT returns one row M2. Join would have fanned out to four pairs.",
        },
        {
          title: "EXCEPT is left minus right",
          prompt: "CIRC: C1, C2, C3. ACK: C1, C1, C2. circ EXCEPT ack, then swap.",
          code: "SELECT cid FROM circ\nEXCEPT\nSELECT cid FROM ack;",
          language: "sql",
          steps: [
            {
              do: "{C1,C2,C3} − {C1,C2} = {C3}. Swapped EXCEPT is empty.",
              why: "EXCEPT is not symmetric. Extra copies on the right still remove C1 once (distinct EXCEPT).",
            },
            {
              do: "This is the set form of “circulars with no ack”. Join form: LEFT JOIN … WHERE a.cid IS NULL.",
              why: "Anti-join and EXCEPT agree on NOT NULL unique keys.",
            },
            {
              do: "Parenthesise if you mix with UNION — (A ∪ B) − C is not A ∪ (B − C).",
              why: "Without parentheses, engines differ. Write the brackets in the booklet.",
            },
          ],
          result: "circ EXCEPT ack = {C3}. ack EXCEPT circ = empty.",
        },
      ],
    },
    {
      heading: "IN versus EXISTS, and the NOT IN plus NULL trap",
      body: "IN (list) is “equals any of these”. EXISTS (subquery) is “did that subquery find even one row?”. For clean non-null sets they match. NOT IN plus even one NULL is poison: x <> NULL is unknown, so AND unknown kills every outer row.\n\nNOT EXISTS does not have that collapse: a NULL inner value is not a match (NULL = x is unknown), so non-matching outer rows survive. Empty subquery: IN is false, NOT IN is true (vacuous). Prefer NOT EXISTS (or LEFT JOIN … WHERE right.pk IS NULL) for “not in the list”.",
      howTo: [
        "Positive membership, no NULLs → IN or EXISTS, both fine.",
        "Anti-membership → NOT EXISTS (or anti-join). Never NOT IN (nullable_col).",
        "Empty inner list: IN keeps nobody; NOT IN keeps everybody (if no NULL).",
        "EXISTS only cares that a row appears; write SELECT 1 inside.",
      ],
      bullets: [
        "IN ≈ EXISTS when the set has no NULLs. NOT IN + any NULL ⇒ empty result.",
        "NOT EXISTS is the safe “not in the list”.",
        "Empty subquery: IN false, NOT IN true. Emptiness is not the NULL trap.",
      ],
      examples: [
        {
          title: "IN with a clean list",
          prompt:
            "MEMBER M1, M2, M3. TRADED M1, M2. WHERE id IN (SELECT member FROM traded).",
          code: "SELECT id FROM member\nWHERE id IN (SELECT member FROM traded);",
          language: "sql",
          steps: [
            {
              do: "Inner set {M1, M2}. Keep M1 and M2. Drop M3.",
              why: "IN is a membership test, like “is this roll number on the attendance sheet?”",
            },
            {
              do: "Duplicate M1 in TRADED does not duplicate M1 in the result.",
              why: "IN is not a join fan-out.",
            },
            {
              do: "EXISTS (SELECT 1 FROM traded t WHERE t.member = member.id) returns the same two rows.",
              why: "No NULLs, so IN and EXISTS agree.",
            },
          ],
          result: "M1 and M2. IN does not copy duplicates from the subquery.",
        },
        {
          title: "NOT IN with a NULL — zero rows",
          prompt:
            "TRADED members: M1 and NULL. WHERE id NOT IN (SELECT member FROM traded) for M1, M2, M3.",
          code: "SELECT id FROM member\nWHERE id NOT IN (SELECT member FROM traded);",
          language: "sql",
          steps: [
            {
              do: "NOT IN means id <> 'M1' AND id <> NULL.",
              why: "A NULL in the list makes “not equal to every element” unknown.",
            },
            {
              do: "For M2: true AND unknown = unknown. WHERE rejects. Same for M3. M1 already fails <> M1.",
              why: "Unknown is not true. Every outer row dies. This is the trap.",
            },
            {
              do: "Fix: NOT EXISTS (SELECT 1 FROM traded t WHERE t.member = member.id), or filter member IS NOT NULL inside the IN list.",
              why: "NOT EXISTS treats the NULL traded row as non-matching, so M2 and M3 survive.",
            },
          ],
          result:
            "Zero rows. One NULL in a NOT IN list poisons every outer row. Use NOT EXISTS.",
        },
        {
          title: "Empty subquery is not the poison",
          prompt: "TRADED is empty. IN vs NOT IN vs NOT EXISTS.",
          code: "SELECT id FROM member WHERE id IN (SELECT member FROM traded);\nSELECT id FROM member WHERE id NOT IN (SELECT member FROM traded);",
          language: "sql",
          steps: [
            {
              do: "IN of empty → no rows. NOT IN of empty → all three members (vacuous true).",
              why: "There is no element that id equals, so “not in the list” is true. No NULL is present.",
            },
            {
              do: "NOT EXISTS also returns all three, because the inner SELECT finds nothing.",
              why: "On empty non-null sets, NOT IN and NOT EXISTS agree.",
            },
            {
              do: "Memorise the pair: empty ≠ NULL-in-list. NULL-in-list makes NOT IN empty; empty makes NOT IN full.",
              why: "Two different three-valued-logic stories.",
            },
          ],
          result: "IN → no rows. NOT IN and NOT EXISTS → M1, M2, M3.",
        },
      ],
    },
    {
      heading: "Nested and correlated subqueries",
      body: "A subquery is a SELECT inside another SELECT. Uncorrelated means it does not mention the outer row — evaluate once. Correlated means it uses the outer alias — conceptually once per outer row.\n\nScalar subquery: one column, at most one row. Zero rows become NULL; two rows are an error. IN/EXISTS may return many rows. A FROM (SELECT …) AS d must be named. Pre-aggregate in that derived table, then join.",
      howTo: [
        "Does the inner query mention the outer alias? If yes, correlated; walk one outer row at a time.",
        "Scalar: 0 → NULL, 2 → error. Aggregates without GROUP BY always return one row (COUNT of empty is 0).",
        "“Has at least one child” → correlated EXISTS (semijoin, no extra duplicates).",
        "Alias every derived table. HAVING belongs with the GROUP BY that created the total.",
      ],
      bullets: [
        "Uncorrelated: once. Correlated: once per outer row (conceptually).",
        "Scalar: 0 rows → NULL, 2 rows → error. COUNT of empty is 0, not NULL.",
        "FROM (SELECT …) AS d must be named.",
      ],
      examples: [
        {
          title: "Above-average margin (uncorrelated)",
          prompt:
            "Margins: M1=8, M2=3, M3=10, M4=3. WHERE margin > (SELECT AVG(margin) FROM member).",
          code: "SELECT id FROM member\nWHERE margin > (SELECT AVG(margin) FROM member);",
          language: "sql",
          steps: [
            {
              do: "Inner AVG = (8+3+10+3)/4 = 6, once. Keep M1 and M3.",
              why: "The subquery does not mention the outer member, so it is not re-run four times in meaning.",
            },
            {
              do: "WHERE margin > AVG(margin) without a subquery is illegal.",
              why: "AVG is an aggregate; it needs GROUP BY/HAVING or a subquery, not a per-row WHERE.",
            },
            {
              do: "If a margin were NULL, AVG would skip it and the divisor would shrink.",
              why: "Same NULL rule as the aggregate section.",
            },
          ],
          result: "AVG = 6; result M1 and M3. Uncorrelated, evaluated once.",
        },
        {
          title: "EXISTS: circulars acked by M1",
          prompt:
            "C1, C2, C3. Acks: (C1,M1), (C1,M2), (C2,M3). EXISTS ack of M1.",
          code: "SELECT c.cid FROM circular c\nWHERE EXISTS (\n  SELECT 1 FROM ack a\n  WHERE a.cid = c.cid AND a.member = 'M1'\n);",
          language: "sql",
          steps: [
            {
              do: "C1 finds (C1,M1) → keep. C2 only has M3 → drop. C3 has nothing → drop.",
              why: "EXISTS is a yes/no per outer row. Extra M1 acks would not duplicate C1.",
            },
            {
              do: "This is correlated because a.cid = c.cid uses the outer alias.",
              why: "Each circular asks “do I have an M1 tick?”",
            },
            {
              do: "Join + DISTINCT can match, but DISTINCT is required if M1 acked twice. EXISTS never duplicates.",
              why: "Semijoin versus join fan-out.",
            },
          ],
          result: "Only C1. EXISTS is a semijoin.",
        },
        {
          title: "Derived table of heavy members",
          prompt:
            "Trades: M1 10+90, M2 5, M3 40+20. Keep members with total qty ≥ 50, with city from MEMBER.",
          code: "SELECT m.id, m.city, t.tot\nFROM member m\nJOIN (\n  SELECT member, SUM(qty) AS tot\n  FROM trade\n  GROUP BY member\n  HAVING SUM(qty) >= 50\n) t ON t.member = m.id;",
          language: "sql",
          steps: [
            {
              do: "Derived table: M1=100 keep, M2=5 drop, M3=60 keep. Then join cities.",
              why: "Aggregate first, then attach descriptions. The subquery must have alias t.",
            },
            {
              do: "M2 never appears, even though M2 exists in MEMBER.",
              why: "Inner join to a filtered set hides non-matches. That is what we wanted here.",
            },
            {
              do: "Members with no trades are also absent (not in the grouped table).",
              why: "A LEFT JOIN plus COALESCE would be the “keep zeros” variant.",
            },
          ],
          result: "(M1, city, 100) and (M3, city, 60). HAVING filtered before the join.",
        },
      ],
    },
  ],
};
