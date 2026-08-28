import type { TopicNote } from "@/data/notes";

export const notesSql: TopicNote = {
  topic: "sql",
  title: "SQL — worked notes",
  blurb:
    "SEBI Grade A IT SQL is almost always a small-table dry-run: WHERE versus HAVING, COUNT(*) versus COUNT(col), every join flavour, set operators, the NOT IN plus NULL trap, and correlated subqueries. Walk the rows; do not guess from English.",
  blocks: [
    {
      heading: "SELECT, WHERE versus HAVING, GROUP BY",
      body: "SELECT builds a result table. Logical processing order, which GATE expects you to recite, is FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. WHERE therefore cannot see column aliases defined in SELECT, and it cannot use aggregates. HAVING filters groups after aggregation and may use both group keys and aggregates.\n\nGROUP BY collapses rows that share the same values of the grouped columns. In standard SQL every non-aggregated SELECT item must appear in the GROUP BY list. Selecting a naked column that is neither grouped nor aggregated is a common exam error (MySQL’s old ONLY_FULL_GROUP_BY=off behaviour is not the exam answer).\n\nWHERE predicates are applied to individual base rows. If you need “members whose total qty exceeds 1000”, that is a predicate on a group total, so it belongs in HAVING, not WHERE. You may still use WHERE to drop rows before they ever enter a group (for example WHERE asset_class = 'EQ' then GROUP BY member HAVING SUM(qty) > 1000).\n\nORDER BY is the only clause that may legally use a SELECT alias in standard SQL. DISTINCT is applied after SELECT expressions. A GROUP BY already produces one row per group, so DISTINCT on the group key is redundant.",
      bullets: [
        "Logical order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.",
        "WHERE filters rows; HAVING filters groups. Aggregates live in HAVING or SELECT, never in WHERE.",
        "Every selected non-aggregate must be in the GROUP BY list (standard SQL).",
      ],
      examples: [
        {
          title: "WHERE cannot hold an aggregate",
          prompt:
            "TRADE(member, qty) rows: (M1, 10), (M1, 40), (M2, 5), (M3, 80). You want members whose total qty is at least 50. Which of the two queries is legal, and what does it return?",
          code: "-- illegal\nSELECT member, SUM(qty)\nFROM trade\nWHERE SUM(qty) >= 50\nGROUP BY member;\n\n-- legal\nSELECT member, SUM(qty) AS tot\nFROM trade\nGROUP BY member\nHAVING SUM(qty) >= 50;",
          language: "sql",
          steps: [
            "WHERE runs before GROUP BY. At WHERE time each row is still a single trade, so SUM(qty) is not defined. The first query is illegal in standard SQL.",
            "The second query groups first. Groups: M1 qty {10,40} sum 50; M2 {5} sum 5; M3 {80} sum 80.",
            "HAVING SUM(qty) >= 50 keeps M1 (50) and M3 (80) and drops M2 (5).",
            "SELECT then emits member and the sum: (M1, 50), (M3, 80). Order is implementation-defined without ORDER BY.",
            "A hybrid that is also legal: WHERE qty >= 10 GROUP BY member HAVING SUM(qty) >= 50. That would drop M2’s 5 before grouping, and M1 would still sum 50. Use WHERE for row predicates, HAVING for group predicates.",
            "You cannot write WHERE tot >= 50 using the alias tot: the alias does not exist yet. HAVING tot >= 50 is accepted by some engines after SELECT, but the portable exam form is HAVING SUM(qty) >= 50.",
          ],
          result:
            "Only the HAVING query is legal; it returns (M1, 50) and (M3, 80).",
        },
        {
          title: "GROUP BY with a WHERE that changes the groups",
          prompt:
            "TRADE(isin, side, qty): (INEA, B, 10), (INEA, S, 4), (INEB, B, 7), (INEA, B, 6). Query: SELECT isin, SUM(qty) FROM trade WHERE side = 'B' GROUP BY isin. Walk the rows.",
          code: "SELECT isin, SUM(qty) AS buy_qty\nFROM trade\nWHERE side = 'B'\nGROUP BY isin;",
          language: "sql",
          steps: [
            "FROM yields four rows.",
            "WHERE side = 'B' keeps (INEA, B, 10), (INEB, B, 7), (INEA, B, 6) and drops the S row of INEA.",
            "GROUP BY isin forms two groups: INEA with qty {10, 6}, INEB with qty {7}.",
            "SUM(qty) is 16 for INEA and 7 for INEB.",
            "If WHERE had been omitted, INEA would have summed 10+4+6 = 20, mixing buys and sells. That is why the row filter must sit in WHERE, not in HAVING, unless you really wanted to filter groups after mixing sides.",
            "HAVING SUM(qty) > 10 would then keep only INEA. HAVING is optional here because the question did not filter groups.",
          ],
          result: "Two result rows: (INEA, 16) and (INEB, 7). The sell row never entered a group.",
        },
        {
          title: "Illegal SELECT column not in GROUP BY",
          prompt:
            "TRADE(member, city, qty) with member → city. Query: SELECT member, city, SUM(qty) FROM trade GROUP BY member. Is this standard SQL? What if we GROUP BY member, city?",
          code: "SELECT member, city, SUM(qty)\nFROM trade\nGROUP BY member;\n-- standard SQL: error (city not grouped)\n\nSELECT member, city, SUM(qty)\nFROM trade\nGROUP BY member, city;",
          language: "sql",
          steps: [
            "Standard SQL: city is neither an aggregate nor a GROUP BY expression, so the first query is illegal even if member functionally determines city.",
            "SQL-99 optional functional-dependency extra would allow city if the engine proves member → city from a unique constraint. SEBI/GATE answers treat it as illegal unless city is grouped.",
            "GROUP BY member, city is legal. If member → city really holds, each member still produces one group, because city does not split the member further.",
            "If the FD is a lie in the data (M1 lives in both Mumbai and Pune), GROUP BY member, city correctly emits two groups for M1, one per city.",
            "SELECT city, SUM(qty) GROUP BY member is also illegal: city is not grouped. SELECT MAX(city), SUM(qty) GROUP BY member is legal but semantically ugly.",
            "Exam move: if you need a descriptive column next to a group key, include it in GROUP BY or wrap it in an aggregate.",
          ],
          result:
            "First query is not standard SQL. GROUP BY member, city is legal and matches one group per member when member → city.",
        },
        {
          title: "HAVING without GROUP BY is a single-group filter",
          prompt:
            "TRADE qty values: 10, 40, 5. Query: SELECT SUM(qty) FROM trade HAVING SUM(qty) > 100; then the same with > 50. Also: SELECT member FROM trade HAVING SUM(qty) > 50 with no GROUP BY.",
          code: "SELECT SUM(qty) FROM trade HAVING SUM(qty) > 100;\nSELECT SUM(qty) FROM trade HAVING SUM(qty) > 50;\nSELECT member FROM trade HAVING SUM(qty) > 50;",
          language: "sql",
          steps: [
            "No GROUP BY means the whole table is one group. SUM(qty) = 55.",
            "HAVING SUM(qty) > 100 fails for that one group, so the first query returns zero rows (not NULL — the group is discarded).",
            "HAVING SUM(qty) > 50 succeeds, so the second query returns one row: 55.",
            "The third query selects member, which is not an aggregate and there is no GROUP BY. In standard SQL this is illegal (same rule as before).",
            "Some engines would return an arbitrary member if the HAVING passed; that is a trap, not the exam answer.",
            "Use GROUP BY member HAVING SUM(qty) > 50 when you meant per-member totals.",
          ],
          result:
            "SUM with HAVING > 100 returns empty; > 50 returns 55. Bare member with HAVING and no GROUP BY is illegal in standard SQL.",
        },
      ],
    },
    {
      heading: "Aggregates: COUNT(*) versus COUNT(col), SUM, AVG, NULL",
      body: "COUNT(*) counts rows, including rows whose columns are NULL. COUNT(col) counts non-null values of col. COUNT(DISTINCT col) counts distinct non-null values. SUM and AVG ignore NULLs; AVG is SUM of non-nulls divided by the count of non-nulls, not divided by COUNT(*). If every value is NULL, SUM returns NULL, not 0, and AVG returns NULL.\n\nThis is the highest-yield SQL MCQ family after joins. A table of ten trades with qty NULL on two rows has COUNT(*) = 10, COUNT(qty) = 8, SUM(qty) equal to the eight known quantities, and AVG(qty) = that sum / 8. Replacing NULL with 0 in the data would change SUM and AVG but not COUNT(*).\n\nMIN and MAX also skip NULLs. There is no MIN of an empty non-null set: MIN of all-NULL column is NULL. GROUP BY produces a group even when the aggregate of that group is NULL (all qty NULL in that group): the group still exists, COUNT(*) is positive, COUNT(qty) is 0.\n\nFILTER / WHERE inside aggregates is engine-specific. The portable pattern is SUM(CASE WHEN side = 'B' THEN qty ELSE 0 END) or SUM(CASE WHEN side = 'B' THEN qty END) — the latter is SUM of buys and NULL on sells, so sells do not contribute, which matches “ignore NULL” semantics.",
      bullets: [
        "COUNT(*) = rows; COUNT(col) skips NULL; COUNT(DISTINCT col) skips NULL then distinct.",
        "SUM/AVG/MIN/MAX skip NULL. AVG divisor is COUNT(col), not COUNT(*).",
        "All-NULL column: SUM and AVG are NULL, COUNT(col) is 0, COUNT(*) is still the row count.",
      ],
      examples: [
        {
          title: "COUNT star versus COUNT qty on a table with holes",
          prompt:
            "TRADE(tid, qty): (T1, 10), (T2, NULL), (T3, 10), (T4, NULL), (T5, 30). Compute COUNT(*), COUNT(qty), COUNT(DISTINCT qty), SUM(qty), AVG(qty).",
          code: "SELECT\n  COUNT(*)            AS n_rows,\n  COUNT(qty)          AS n_qty,\n  COUNT(DISTINCT qty) AS n_distinct_qty,\n  SUM(qty)            AS sum_qty,\n  AVG(qty)            AS avg_qty\nFROM trade;",
          language: "sql",
          steps: [
            "Five rows, so COUNT(*) = 5. The two NULL qty rows still count.",
            "COUNT(qty) sees non-null qty values 10, 10, 30 → 3.",
            "COUNT(DISTINCT qty) on non-nulls {10, 10, 30} → 2.",
            "SUM(qty) = 10 + 10 + 30 = 50. NULLs add nothing; they do not zero the sum.",
            "AVG(qty) = 50 / 3, not 50 / 5. So 16.666… (engine decimal rules aside).",
            "If the question asked AVG of “all rows treating missing as 0”, that would be 50 / 5 = 10, which is SUM(qty) / COUNT(*), a different expression: COALESCE(SUM(qty),0)*1.0/COUNT(*).",
          ],
          result:
            "COUNT(*)=5, COUNT(qty)=3, COUNT(DISTINCT qty)=2, SUM=50, AVG=50/3.",
        },
        {
          title: "GROUP BY city with mixed NULL qty",
          prompt:
            "TRADE(city, qty): (Mum, 10), (Mum, NULL), (Pune, NULL), (Pune, NULL). SELECT city, COUNT(*), COUNT(qty), SUM(qty) FROM trade GROUP BY city.",
          code: "SELECT city, COUNT(*) AS n, COUNT(qty) AS nq, SUM(qty) AS s\nFROM trade\nGROUP BY city;",
          language: "sql",
          steps: [
            "Groups: Mum rows two; Pune rows two.",
            "Mum: COUNT(*) = 2, COUNT(qty) = 1 (only the 10), SUM(qty) = 10.",
            "Pune: COUNT(*) = 2, COUNT(qty) = 0, SUM(qty) = NULL (no non-null addends), not 0.",
            "A later WHERE SUM(qty) > 0 is illegal (WHERE vs aggregate). HAVING SUM(qty) > 0 drops Pune because NULL > 0 is unknown, not true.",
            "HAVING COUNT(qty) = 0 keeps Pune. HAVING COUNT(*) = 0 can never keep a group that exists; groups are formed from at least one row unless you are doing a grouped outer join trick.",
            "COALESCE(SUM(qty), 0) would report Pune’s sum as 0 if the report needs a numeric zero instead of NULL.",
          ],
          result:
            "Mum → (2, 1, 10); Pune → (2, 0, NULL). Pune’s SUM is NULL, not 0.",
        },
        {
          title: "AVG after WHERE versus AVG of everything",
          prompt:
            "Same five-row TRADE as the first example. Compare AVG(qty) with AVG(qty) filtered by WHERE qty >= 10, and with AVG(CASE WHEN qty >= 10 THEN qty END).",
          code: "SELECT AVG(qty) FROM trade;\nSELECT AVG(qty) FROM trade WHERE qty >= 10;\nSELECT AVG(CASE WHEN qty >= 10 THEN qty END) FROM trade;",
          language: "sql",
          steps: [
            "Bare AVG(qty) skips two NULLs and averages 10, 10, 30 → 50/3.",
            "WHERE qty >= 10: NULL >= 10 is unknown, so the two NULL rows are dropped. Remaining 10, 10, 30. AVG still 50/3. The WHERE did not change the average because NULLs were already skipped by AVG.",
            "If a row (T6, 5) existed, WHERE qty >= 10 would drop 5 and the AVG would rise; the CASE form would also skip 5 because CASE yields NULL on that row and AVG skips NULL.",
            "The CASE form without WHERE keeps all five rows in the FROM, then AVG sees 10, NULL, 10, NULL, 30 — still 50/3. Equivalent to AVG on the filtered non-null ≥ 10 values here.",
            "COUNT(*) in the WHERE query is 3. COUNT(*) in the CASE query is 5. That is the observable difference: WHERE removes rows from every aggregate in the SELECT list; CASE removes values from one aggregate.",
            "Exam pick: use WHERE when every aggregate should ignore the dropped rows; use CASE when COUNT(*) must still see them.",
          ],
          result:
            "All three AVG expressions equal 50/3 here; WHERE changes COUNT(*) to 3 while CASE leaves COUNT(*) at 5.",
        },
        {
          title: "SUM of a CASE to split buy and sell",
          prompt:
            "TRADE(side, qty): (B, 10), (S, 4), (B, 6), (S, NULL). Produce buy_qty and sell_qty in one row using SUM(CASE…).",
          code: "SELECT\n  SUM(CASE WHEN side = 'B' THEN qty END) AS buy_qty,\n  SUM(CASE WHEN side = 'S' THEN qty END) AS sell_qty,\n  SUM(qty) AS all_qty\nFROM trade;",
          language: "sql",
          steps: [
            "Buy CASE yields 10, NULL, 6, NULL. SUM of those non-nulls = 16.",
            "Sell CASE yields NULL, 4, NULL, NULL (the S row with NULL qty contributes NULL). SUM = 4.",
            "SUM(qty) without CASE = 10+4+6 = 20, skipping the NULL. 16+4 = 20, consistent.",
            "ELSE 0 versus ELSE omitted: SUM(CASE WHEN side = 'S' THEN qty ELSE 0 END) would add 0 on buy rows and still skip nothing extra; the NULL sell becomes CASE NULL, and SUM of {0, 4, 0, NULL} is still 4.",
            "Writing SUM(qty) WHERE side = 'B' cannot produce both buy and sell in one row: WHERE would drop the other side first.",
            "COUNT(CASE WHEN side = 'B' THEN 1 END) counts buy rows including buys with NULL qty if you THEN 1, which does not look at qty. COUNT(CASE WHEN side = 'B' THEN qty END) would skip the NULL-qty buy. Pick the one the question asked.",
          ],
          result: "One row: buy_qty = 16, sell_qty = 4, all_qty = 20.",
        },
      ],
    },
    {
      heading: "INNER JOIN and CROSS JOIN, row by row",
      body: "A join is a cartesian product followed by a selector, except that inner-join ON/USING drops non-matches. CROSS JOIN is the pure product: every row of the left table with every row of the right;  m × n result rows, no predicate. INNER JOIN … ON pred keeps only product pairs that satisfy pred. Missing matches on either side disappear: that is the whole difference from outer joins.\n\nWalk joins on paper by writing the left row, scanning the right table for keys that match, and emitting one result row per match. If a left key matches three right rows, that left row appears three times. If it matches zero, it appears zero times in an inner join.\n\nON versus WHERE in an inner join are equivalent (both filter the product). They are not equivalent in outer joins: WHERE on a right-hand column after a LEFT JOIN turns it back into an inner join by discarding the padded NULL rows. The inner-join examples below stay with ON.\n\nUSING(col) is an inner (or outer) join on equality of the named column and projects that column once. NATURAL JOIN joins on all like-named columns — dangerous if both tables carry a leftover updated_at column. Prefer explicit ON in exam answers unless the question forces NATURAL.",
      bullets: [
        "CROSS JOIN: |L| × |R| rows. INNER JOIN: only matching pairs.",
        "A left row with k matches appears k times; with 0 matches it vanishes.",
        "ON and WHERE coincide for INNER JOIN; they do not coincide for LEFT JOIN.",
      ],
      examples: [
        {
          title: "INNER JOIN matching a broker to trades",
          prompt:
            "BROKER(id, name): (1, Nuvama), (2, Zerodha), (3, Angel). TRADE(tid, broker_id, qty): (10, 1, 100), (11, 1, 50), (12, 3, 20), (13, 9, 5). Walk SELECT t.tid, b.name, t.qty FROM trade t INNER JOIN broker b ON t.broker_id = b.id.",
          code: "SELECT t.tid, b.name, t.qty\nFROM trade t\nINNER JOIN broker b ON t.broker_id = b.id;",
          language: "sql",
          steps: [
            "Start with TRADE row (10, 1, 100). Scan BROKER for id = 1: match Nuvama. Emit (10, Nuvama, 100).",
            "TRADE (11, 1, 50) again matches broker 1. Emit (11, Nuvama, 50).",
            "TRADE (12, 3, 20) matches broker 3 Angel. Emit (12, Angel, 20).",
            "TRADE (13, 9, 5) has no broker id 9. Inner join emits nothing for this row. The orphan trade is dropped.",
            "Broker 2 Zerodha matched no trade. Inner join drops Zerodha as well.",
            "Result has three rows. It does not have four (the orphan is gone) and does not have a Zerodha row.",
          ],
          result:
            "Three rows: (10, Nuvama, 100), (11, Nuvama, 50), (12, Angel, 20). Zerodha and trade 13 disappear.",
        },
        {
          title: "CROSS JOIN of two tiny tables",
          prompt:
            "SIDE(s): B, S. VENUE(v): NSE, BSE. SELECT s, v FROM side CROSS JOIN venue. Then the same with INNER JOIN ON true (if the engine allows).",
          code: "SELECT s.s, v.v\nFROM side s\nCROSS JOIN venue v;",
          language: "sql",
          steps: [
            "CROSS JOIN is the cartesian product. |SIDE| = 2, |VENUE| = 2, so 4 rows.",
            "Pair B with NSE, B with BSE, S with NSE, S with BSE. No predicate drops anything.",
            "There is no “match” notion: even unrelated columns are paired.",
            "INNER JOIN ON 1 = 1 (or ON TRUE) produces the same four rows. INNER JOIN with no ON is a syntax error in standard SQL; CROSS JOIN is the spelled-out product.",
            "A comma FROM side, venue is the old-style product, also four rows, then a WHERE can turn it into an inner join.",
            "If either table is empty, the product is empty (0 × n = 0). That surprises people who expected the other table to survive — survival is an outer-join idea.",
          ],
          result:
            "Four rows: (B, NSE), (B, BSE), (S, NSE), (S, BSE). Empty operand ⇒ empty product.",
        },
        {
          title: "One-to-many fan-out counted on paper",
          prompt:
            "CIRCULAR(cid, title): (C1, 'KYC'), (C2, 'Algo'). ACK(cid, member): (C1, M1), (C1, M2), (C1, M3), (C2, M1). SELECT c.title, COUNT(*) FROM circular c INNER JOIN ack a ON c.cid = a.cid GROUP BY c.title.",
          code: "SELECT c.title, COUNT(*) AS n_ack\nFROM circular c\nINNER JOIN ack a ON c.cid = a.cid\nGROUP BY c.title;",
          language: "sql",
          steps: [
            "Join C1-KYC to three ACK rows: three joined rows for KYC.",
            "Join C2-Algo to one ACK row: one joined row for Algo.",
            "GROUP BY title: KYC group size 3, Algo group size 1.",
            "COUNT(*) therefore is 3 and 1, which is the number of matching join rows, i.e. acknowledgements, not the number of circulars.",
            "COUNT(c.cid) would be the same here because c.cid is never NULL after an inner join.",
            "If a C3 circular had zero acks, inner join would drop C3 and it would not appear with COUNT 0. That requires a LEFT JOIN plus COUNT(a.cid).",
          ],
          result: "KYC → 3, Algo → 1. Inner join plus COUNT(*) counts matching children, not parents.",
        },
        {
          title: "Self inner join of a reporting chain",
          prompt:
            "EMP(id, name, boss): (1, 'Ira', NULL), (2, 'Dev', 1), (3, 'Nia', 1), (4, 'Raj', 2). SELECT e.name AS emp, m.name AS mgr FROM emp e INNER JOIN emp m ON e.boss = m.id.",
          code: "SELECT e.name AS emp, m.name AS mgr\nFROM emp e\nINNER JOIN emp m ON e.boss = m.id;",
          language: "sql",
          steps: [
            "Alias e is the employee, m is the manager, both the same table. This is a self join.",
            "e = Ira, boss NULL. NULL = m.id is unknown, never true. Ira drops out of the inner join (the CEO has no manager row).",
            "e = Dev, boss 1, matches m = Ira. Emit (Dev, Ira).",
            "e = Nia, boss 1, matches Ira. Emit (Nia, Ira).",
            "e = Raj, boss 2, matches Dev. Emit (Raj, Dev).",
            "Three result rows. Ira appears only on the right-hand side. A LEFT JOIN would have kept (Ira, NULL) as a fourth row.",
          ],
          result: "Three rows: (Dev, Ira), (Nia, Ira), (Raj, Dev). CEO Ira is dropped by INNER JOIN.",
        },
      ],
    },
    {
      heading: "LEFT, RIGHT and FULL outer joins",
      body: "LEFT OUTER JOIN keeps every left row. Matches produce the same columns as inner join; a left row with no match is padded with NULLs for every right-hand column. RIGHT OUTER JOIN is symmetric (keep all right rows). FULL OUTER JOIN is the union of both paddings: unmatched left rows with right NULLs and unmatched right rows with left NULLs.\n\nThe paper method: first write the inner-join matches, then add one padded row for every unused left row (LEFT), every unused right row (RIGHT), or both (FULL). Do not duplicate a matched row.\n\nA WHERE predicate on a right column after a LEFT JOIN (WHERE r.id IS NOT NULL, or WHERE r.city = 'Mumbai') discards the padded rows and usually the unmatched left rows, collapsing the left join into an inner join. Filter the right table in a subquery or put the predicate in ON if you still want unmatched left rows.\n\nCOUNT(*) after a left join counts padded rows too. COUNT(right.pk) skips the padded NULLs and therefore counts matches only — that is how you emit zeros for parents with no children.",
      bullets: [
        "LEFT: all left rows + NULL pads. RIGHT: all right rows. FULL: both unmatched sides.",
        "WHERE on a right column after LEFT JOIN typically becomes an inner join.",
        "COUNT(child.pk) with LEFT JOIN gives zeros; COUNT(*) does not.",
      ],
      examples: [
        {
          title: "LEFT JOIN keeps Zerodha and drops the orphan the other way",
          prompt:
            "Same BROKER and TRADE as the inner-join example: brokers 1 Nuvama, 2 Zerodha, 3 Angel; trades 10→1, 11→1, 12→3, 13→9. SELECT b.name, t.tid FROM broker b LEFT JOIN trade t ON t.broker_id = b.id.",
          code: "SELECT b.name, t.tid\nFROM broker b\nLEFT JOIN trade t ON t.broker_id = b.id;",
          language: "sql",
          steps: [
            "Inner matches first: Nuvama-10, Nuvama-11, Angel-12. Three rows as before.",
            "Left table is BROKER. Unused left row: Zerodha (id 2) matched no trade. Add (Zerodha, NULL).",
            "Trade 13 references broker 9, which is not in BROKER. Left join from broker does not invent a left row for that orphan. Trade 13 is omitted.",
            "Result four rows: three matches plus (Zerodha, NULL).",
            "If the FROM order were trade LEFT JOIN broker, trade 13 would survive as (NULL, 13) and Zerodha would vanish. The preserved side is the LEFT operand.",
            "RIGHT JOIN with FROM trade RIGHT JOIN broker is the same as broker LEFT JOIN trade.",
          ],
          result:
            "(Nuvama, 10), (Nuvama, 11), (Angel, 12), (Zerodha, NULL). Trade 13 is not in this left join.",
        },
        {
          title: "FULL JOIN shows both orphans",
          prompt:
            "Same tables. SELECT b.name, t.tid FROM broker b FULL OUTER JOIN trade t ON t.broker_id = b.id. List every result row.",
          code: "SELECT b.name, t.tid\nFROM broker b\nFULL OUTER JOIN trade t ON t.broker_id = b.id;",
          language: "sql",
          steps: [
            "Matches: (Nuvama, 10), (Nuvama, 11), (Angel, 12).",
            "Unmatched broker: (Zerodha, NULL).",
            "Unmatched trade: broker columns NULL, tid 13 → (NULL, 13).",
            "Five rows in total. No match is duplicated.",
            "MySQL historically lacked FULL JOIN; the exam still asks the operator. Rewrite as LEFT UNION ALL unmatched-right if an engine MCQ appears.",
            "FULL JOIN is not CROSS JOIN. Unrelated brokers and trades do not pair; only key matches plus one pad per unmatched row.",
          ],
          result:
            "Five rows: three matches, (Zerodha, NULL), and (NULL, 13).",
        },
        {
          title: "WHERE after LEFT JOIN wipes the pad",
          prompt:
            "Using the LEFT JOIN of broker to trade, add WHERE t.qty >= 50. Trades: 10 qty 100, 11 qty 50, 12 qty 20, 13 qty 5. What remains, and what join did you actually compute?",
          code: "SELECT b.name, t.tid, t.qty\nFROM broker b\nLEFT JOIN trade t ON t.broker_id = b.id\nWHERE t.qty >= 50;",
          language: "sql",
          steps: [
            "Left join intermediate: (Nuvama, 10, 100), (Nuvama, 11, 50), (Angel, 12, 20), (Zerodha, NULL, NULL).",
            "WHERE t.qty >= 50: 100 ≥ 50 true, keep 10. 50 ≥ 50 true, keep 11. 20 ≥ 50 false, drop 12. NULL ≥ 50 unknown, drop Zerodha’s pad.",
            "Trade 13 never appeared. Result: two rows, both Nuvama.",
            "Angel died because its only trade failed the WHERE, not because the join failed. Zerodha died because the pad’s qty is NULL.",
            "This is exactly INNER JOIN plus WHERE t.qty >= 50. The left join bought you nothing.",
            "To keep Zerodha while filtering trades, put the qty predicate in ON: LEFT JOIN trade t ON t.broker_id = b.id AND t.qty >= 50. Then Angel pads (qty 20 fails ON) and Zerodha pads, Nuvama still matches 10 and 11.",
          ],
          result:
            "Only (Nuvama, 10, 100) and (Nuvama, 11, 50). WHERE on t.qty turned the LEFT JOIN into an inner join.",
        },
        {
          title: "LEFT JOIN plus COUNT to show zero acknowledgements",
          prompt:
            "CIRCULAR C1 KYC, C2 Algo, C3 Insider. ACK only: (C1,M1), (C1,M2), (C2,M1). SELECT c.title, COUNT(a.cid) FROM circular c LEFT JOIN ack a ON c.cid = a.cid GROUP BY c.title.",
          code: "SELECT c.title, COUNT(a.cid) AS n_ack\nFROM circular c\nLEFT JOIN ack a ON c.cid = a.cid\nGROUP BY c.title;",
          language: "sql",
          steps: [
            "C1 joins two acks → two rows. COUNT(a.cid) = 2.",
            "C2 joins one ack → one row. COUNT(a.cid) = 1.",
            "C3 joins nothing → one padded row with a.cid NULL. COUNT(a.cid) skips NULL → 0. The group still exists because the left row survived.",
            "COUNT(*) for C3 would be 1 (the pad), wrongly reporting one acknowledgement.",
            "Inner join would have dropped C3 entirely, so you would never see the zero.",
            "COALESCE is not required for the zero: COUNT already produced 0. Use COALESCE when the measure is SUM(a.amount) on a pad, because SUM of all-NULL is NULL not 0.",
          ],
          result:
            "KYC → 2, Algo → 1, Insider → 0. Must LEFT JOIN and COUNT(a.cid), not COUNT(*).",
        },
      ],
    },
    {
      heading: "VIEW, UPDATE, DELETE versus TRUNCATE versus DROP versus ALTER",
      body: "A VIEW is a stored SELECT. By default it is virtual: the query is rewritten into the invoker’s statement. WITH CHECK OPTION on an updatable view rejects inserts/updates that would disappear from the view. Views that contain DISTINCT, GROUP BY, aggregates, or many-to-many joins are generally not updatable.\n\nUPDATE rewrites column values in existing rows; it logs each row and fires triggers. DELETE removes rows; WITH WHERE deletes a subset, without WHERE it deletes all rows but still logs them and keeps the table, indexes, grants and identity counter (engine-dependent). TRUNCATE is a bulk unlogged (or minimally logged) drop of all rows; it typically cannot fire per-row delete triggers, cannot take a WHERE, and may reset identity. DROP TABLE removes the object and its data, indexes and constraints. ALTER TABLE changes the definition (add/drop column, constraint, type).\n\nDROP VIEW removes the view definition, not the base table. DROP TABLE ... CASCADE may drop dependent views. CREATE OR REPLACE VIEW changes the stored SELECT without dropping grants in some engines.\n\nSEBI MCQs love the quartet DELETE / TRUNCATE / DROP / ALTER. Answer with what object remains, whether ROLLBACK can undo it (TRUNCATE is often auto-committing in MySQL; in PostgreSQL it is transactional), and whether an ON DELETE trigger runs.",
      bullets: [
        "VIEW = stored SELECT. Updatable only in simple cases; WITH CHECK OPTION enforces the view predicate.",
        "DELETE: row-level, WHERE allowed, triggers fire, can ROLLBACK (in a transaction).",
        "TRUNCATE: all rows, no WHERE, typically no per-row triggers. DROP: object gone. ALTER: shape changes.",
      ],
      examples: [
        {
          title: "A simple view and WITH CHECK OPTION",
          prompt:
            "Base MEMBER(id, city, margin) with (M1, Mumbai, 8), (M2, Pune, 3). View v_mum AS SELECT * FROM member WHERE city = 'Mumbai' WITH CHECK OPTION. What happens on UPDATE v_mum SET city = 'Pune' WHERE id = 'M1'? On INSERT INTO v_mum VALUES ('M3','Pune',1)?",
          code: "CREATE VIEW v_mum AS\nSELECT id, city, margin\nFROM member\nWHERE city = 'Mumbai'\nWITH CHECK OPTION;",
          language: "sql",
          steps: [
            "SELECT * FROM v_mum currently returns only M1.",
            "UPDATE that sets M1’s city to Pune would make the row fail the view predicate. WITH CHECK OPTION rejects the update. M1 stays Mumbai.",
            "Without CHECK OPTION the update would succeed on the base table and M1 would vanish from the view (a “disappearing row”).",
            "INSERT of M3 Pune also fails CHECK OPTION because the new row would not be visible in v_mum.",
            "INSERT of M4 Mumbai 2 succeeds and appears both in member and in v_mum.",
            "A view SELECT id, SUM(margin) FROM member GROUP BY id is not updatable, CHECK OPTION or not, because of the aggregate.",
          ],
          result:
            "Both the city-changing UPDATE and the Pune INSERT are rejected by WITH CHECK OPTION. M1 remains Mumbai.",
        },
        {
          title: "DELETE versus TRUNCATE on TRADE",
          prompt:
            "TRADE has 4 rows, a DELETE trigger that writes to AUDIT, and an identity tid. Contrast DELETE FROM trade; with TRUNCATE TABLE trade; inside a transaction that is then rolled back (PostgreSQL-style).",
          code: "DELETE FROM trade;     -- all rows, logs, triggers\nTRUNCATE TABLE trade;  -- bulk empty the table",
          language: "sql",
          steps: [
            "DELETE FROM trade (no WHERE) visits each of the 4 rows, fires the DELETE trigger 4 times, writes 4 AUDIT rows, and empties TRADE. In a transaction, ROLLBACK restores TRADE and undoes AUDIT if AUDIT was in the same transaction.",
            "TRUNCATE empties TRADE in one metadata operation. Per-row DELETE triggers do not run, so AUDIT stays empty.",
            "TRUNCATE typically cannot have a WHERE. To remove only NSE trades you must DELETE FROM trade WHERE venue = 'NSE'.",
            "TRUNCATE may reset the identity counter to 1; DELETE does not. After DELETE the next tid might still be 5; after TRUNCATE it might be 1.",
            "TRUNCATE requires a stronger lock and is blocked by incoming FKs referencing TRADE (you cannot truncate a parent that still has children, unless CASCADE is specified where supported).",
            "MySQL TRUNCATE is implicit-commit: a ROLLBACK after it will not bring the rows back. Read the engine if the question names one; otherwise say “DELETE is transactional row-level; TRUNCATE is a bulk reset”.",
          ],
          result:
            "DELETE: 4 trigger firings, rollback-able in PG. TRUNCATE: no per-row triggers, no WHERE, may reset identity, FK-blocked if children exist.",
        },
        {
          title: "DROP TABLE versus DROP VIEW versus ALTER",
          prompt:
            "Objects: table MEMBER, view v_mum on MEMBER, index ix_city on MEMBER.city. Predict the survivors after (a) DROP VIEW v_mum, (b) ALTER TABLE member DROP COLUMN margin, (c) DROP TABLE member RESTRICT.",
          code: "DROP VIEW v_mum;\nALTER TABLE member DROP COLUMN margin;\nDROP TABLE member RESTRICT;",
          language: "sql",
          steps: [
            "DROP VIEW v_mum removes only the view definition. MEMBER and ix_city remain populated.",
            "ALTER TABLE DROP COLUMN margin removes the column from MEMBER. Rows remain, minus that attribute. v_mum, if it selected margin and still existed, would become invalid; we already dropped it in (a). ix_city is on city, so it survives.",
            "DROP TABLE member RESTRICT fails if any remaining view or FK still depends on MEMBER. With v_mum gone, RESTRICT succeeds if no child table references MEMBER, and then MEMBER and ix_city both disappear.",
            "DROP TABLE member CASCADE would additionally drop dependent views and FKs. Data in child tables is not deleted unless those FKs specify ON DELETE CASCADE as a separate constraint action — CASCADE on DROP is about dependent objects, not child rows in a kept table.",
            "ALTER cannot be replaced by DROP + CREATE without losing data: DROP TABLE would wipe rows.",
            "Exam quartet: ALTER changes shape; DELETE/TRUNCATE change rows; DROP removes the object.",
          ],
          result:
            "(a) table remains; (b) rows remain without margin; (c) RESTRICT drops the table and its indexes if no dependents remain.",
        },
        {
          title: "UPDATE with a join-style FROM",
          prompt:
            "MEMBER(id, city): (M1, Mumbai), (M2, Pune). MOVE(id, new_city): (M1, Delhi). UPDATE member SET city = move.new_city FROM move WHERE member.id = move.id (PostgreSQL). What is M2’s city? How would you write it in standard MERGE or in MySQL?",
          code: "-- PostgreSQL\nUPDATE member m\nSET city = x.new_city\nFROM move x\nWHERE m.id = x.id;\n\n-- MySQL\nUPDATE member m\nJOIN move x ON m.id = x.id\nSET m.city = x.new_city;",
          language: "sql",
          steps: [
            "Only M1 appears in MOVE, so only M1 matches the WHERE/JOIN. M1’s city becomes Delhi.",
            "M2 does not match MOVE, so M2 stays Pune. UPDATE is not an inner-join-delete of non-matches; non-matches are simply not updated.",
            "If MOVE had two rows for M1 with different cities, PostgreSQL would pick one nondeterministically and raise an error in newer versions. Exam assumption: keys in the source are unique.",
            "Standard SQL MERGE INTO member USING move ON member.id = move.id WHEN MATCHED THEN UPDATE SET city = move.new_city; is the portable spelling.",
            "A correlated subquery UPDATE member SET city = (SELECT new_city FROM move WHERE move.id = member.id) would set M2’s city to NULL if the scalar subquery returns no row (in some engines) — a famous trap. The FROM/JOIN form leaves M2 untouched.",
            "Always decide whether unmatched targets should stay or go NULL before you pick JOIN-UPDATE versus scalar subquery.",
          ],
          result:
            "M1 → Delhi, M2 stays Pune. Unmatched targets are not updated by a join UPDATE; a scalar subquery may NULL them.",
        },
      ],
    },
    {
      heading: "UNION, UNION ALL, INTERSECT, EXCEPT",
      body: "Set operators combine two queries of equal arity and compatible types. UNION concatenates and then distinct-eliminates. UNION ALL concatenates and keeps duplicates. INTERSECT returns distinct rows that appear in both sides (ALL variant keeps the minimum multiplicity). EXCEPT (MINUS in Oracle) returns distinct rows in the left side that are not in the right.\n\nNULL handling: two NULLs compare as equal for set operators, unlike in a WHERE = predicate. UNION of a NULL row with another NULL row yields one NULL row. Column names in the result come from the first query. ORDER BY may appear only at the end of the chain unless you wrap a subquery.\n\nPrecedence is implementation-defined when you mix UNION and EXCEPT without parentheses. Always parenthesise. A common exam question: UNION ALL of two identical three-row tables has six rows; UNION has three.\n\nSELECT a FROM t EXCEPT SELECT b FROM u is not the same as a LEFT JOIN anti-join if NULLs or duplicates differ, but for NOT-NULL unique columns they coincide. INTERSECT is not INNER JOIN: join can fan out columns; intersect compares whole rows.",
      bullets: [
        "UNION = concat + DISTINCT. UNION ALL = concat. INTERSECT = both. EXCEPT = left minus right.",
        "Set operators treat NULLs as equal. WHERE col = NULL never is.",
        "Same number of columns; names taken from the first SELECT; ORDER BY only at the end.",
      ],
      examples: [
        {
          title: "UNION versus UNION ALL on two watchlists",
          prompt:
            "W1(isin): INEA, INEB, INEA. W2(isin): INEB, INEC. Compute SELECT isin FROM w1 UNION SELECT isin FROM w2 and the ALL variant. Walk multiplicities.",
          code: "SELECT isin FROM w1\nUNION\nSELECT isin FROM w2;\n\nSELECT isin FROM w1\nUNION ALL\nSELECT isin FROM w2;",
          language: "sql",
          steps: [
            "W1 bag: INEA, INEB, INEA. W2 bag: INEB, INEC.",
            "UNION ALL concatenates: INEA, INEB, INEA, INEB, INEC — five rows, duplicates kept.",
            "UNION then distinct-eliminates: {INEA, INEB, INEC} — three rows. The extra INEA and extra INEB collapse.",
            "UNION is not “UNION ALL plus a sort” in meaning, but engines often sort or hash to distinct-eliminate, so UNION is not cheaper.",
            "If W1 had a NULL and W2 had a NULL, UNION would keep one NULL row; UNION ALL would keep two.",
            "Column count must match. SELECT isin, tag FROM w1 UNION SELECT isin FROM w2 is an error.",
          ],
          result: "UNION → {INEA, INEB, INEC}. UNION ALL → five rows including two INEA and two INEB.",
        },
        {
          title: "INTERSECT of members who traded and members who were inspected",
          prompt:
            "TRADED(member): M1, M2, M2, M3. INSPECTED(member): M2, M4, M2. SELECT member FROM traded INTERSECT SELECT member FROM inspected.",
          code: "SELECT member FROM traded\nINTERSECT\nSELECT member FROM inspected;",
          language: "sql",
          steps: [
            "Distinct members in TRADED: M1, M2, M3. In INSPECTED: M2, M4.",
            "Intersection of the sets: {M2}. M1 and M3 were never inspected. M4 never traded.",
            "Default INTERSECT is DISTINCT, so M2 appears once even though both sides had M2 twice.",
            "INTERSECT ALL (where supported) would take min(multiplicity_left, multiplicity_right) = min(2, 2) = 2 copies of M2.",
            "An INNER JOIN on member would also produce M2, but the join of two M2-rows on each side would fan out to 2×2 = 4 rows. Intersect does not fan out.",
            "To count “how many times they appear on both lists” you want INTERSECT ALL or a grouped join, not INNER JOIN without aggregation.",
          ],
          result:
            "INTERSECT (distinct) returns a single row M2. Join would have fanned out to four M2 pairs.",
        },
        {
          title: "EXCEPT for circulars never acknowledged",
          prompt:
            "CIRC(cid): C1, C2, C3. ACK(cid): C1, C1, C2. SELECT cid FROM circ EXCEPT SELECT cid FROM ack. Then swap the operands.",
          code: "SELECT cid FROM circ\nEXCEPT\nSELECT cid FROM ack;\n\nSELECT cid FROM ack\nEXCEPT\nSELECT cid FROM circ;",
          language: "sql",
          steps: [
            "Left minus right, distinct: {C1, C2, C3} − {C1, C2} = {C3}. C3 was never acknowledged.",
            "Duplicates on the right do not matter for EXCEPT (distinct): two C1 acks still remove C1 once.",
            "Swapped EXCEPT: {C1, C2} − {C1, C2, C3} = empty. Every ack points at a known circular.",
            "EXCEPT ALL (if C1 appeared twice on the left and once on the right) would leave one C1. Default EXCEPT would still drop C1 entirely.",
            "This is the set-operator form of an anti-join. The join form is SELECT c.cid FROM circ c LEFT JOIN ack a ON c.cid = a.cid WHERE a.cid IS NULL.",
            "If ACK had a NULL cid, EXCEPT would treat that NULL as a value equal to a NULL in CIRC; the anti-join WHERE a.cid IS NULL would also keep unmatched circ rows and would additionally be confused by a matching-NULL join (NULL = NULL is unknown, so a NULL cid does not inner-match). Prefer NOT NULL keys in exam tables.",
          ],
          result: "circ EXCEPT ack = {C3}. ack EXCEPT circ = empty. EXCEPT is not symmetric.",
        },
        {
          title: "Parentheses when mixing UNION and EXCEPT",
          prompt:
            "A = {1,2}, B = {2,3}, C = {1}. Evaluate (SELECT * FROM a UNION SELECT * FROM b) EXCEPT SELECT * FROM c versus SELECT * FROM a UNION (SELECT * FROM b EXCEPT SELECT * FROM c). Use integer tables of one column x.",
          code: "(SELECT x FROM a UNION SELECT x FROM b)\nEXCEPT\nSELECT x FROM c;\n\nSELECT x FROM a\nUNION\n(SELECT x FROM b EXCEPT SELECT x FROM c);",
          language: "sql",
          steps: [
            "A ∪ B = {1, 2, 3}. Minus C {1} = {2, 3}. That is the first expression.",
            "B EXCEPT C: {2, 3} − {1} = {2, 3}. Then A ∪ that = {1, 2, 3}. That is the second expression.",
            "The 1 survives in the second expression because it came from A and was never subtracted. In the first expression 1 was subtracted after the union.",
            "Without parentheses, mixing UNION and EXCEPT is engine-defined (left to right versus UNION-first). Always parenthesise in an answer booklet.",
            "Replacing UNION by UNION ALL would keep duplicate 2 if both A and B held 2, then EXCEPT (distinct) would still emit 2 once in the first style.",
            "Numeric 1 here is a stand-in for circ_id values; the algebra is the same for CHAR keys.",
          ],
          result:
            "First expression {2, 3}; second {1, 2, 3}. Mixing UNION and EXCEPT without parentheses is a live exam trap.",
        },
      ],
    },
    {
      heading: "IN versus EXISTS, and the NOT IN plus NULL trap",
      body: "IN (list) is equality to any element. IN (subquery) is membership in the subquery’s one-column result. EXISTS (subquery) is true if the subquery returns any row; the SELECT list inside EXISTS is irrelevant (write SELECT 1). A correlated EXISTS references outer columns and is re-evaluated per outer row.\n\nFor NOT-NULL sets, IN and EXISTS are equivalent: x IN (SELECT y FROM t) ⇔ EXISTS (SELECT 1 FROM t WHERE t.y = x). They stop being equivalent when NULLs appear.\n\nThe trap: NOT IN (subquery) is equivalent to AND of x <> y for every y. If any y is NULL, x <> NULL is unknown, the AND is unknown, and the outer row is filtered out. If the subquery is empty, NOT IN is true for every x (vacuous). If the subquery is all NULL, NOT IN is never true. EXISTS / NOT EXISTS do not have this three-valued collapse: NOT EXISTS (SELECT 1 FROM t WHERE t.y = x) is still true when t.y is NULL, because NULL = x is unknown and that inner row does not count as a match.\n\nExam advice: prefer NOT EXISTS (or a LEFT JOIN ... WHERE right.pk IS NULL) for anti-semijoins. Use IN for small non-null lists. Never write NOT IN (SELECT nullable_col …) unless you have filtered the NULLs.",
      bullets: [
        "IN ≈ EXISTS when the set has no NULLs. NOT IN + any NULL ⇒ empty result.",
        "NOT EXISTS is the safe anti-semijoin. Empty subquery: IN is false, NOT IN is true.",
        "EXISTS cares about rows, not the SELECT list. Correlate on the ON/WHERE, not on the SELECT.",
      ],
      examples: [
        {
          title: "IN with a clean non-null subquery",
          prompt:
            "MEMBER(id): M1, M2, M3. TRADED(member): M1, M2. SELECT id FROM member WHERE id IN (SELECT member FROM traded). Walk each outer row.",
          code: "SELECT id\nFROM member\nWHERE id IN (SELECT member FROM traded);",
          language: "sql",
          steps: [
            "Subquery evaluates (uncorrelated) to the set {M1, M2}.",
            "M1 IN {M1, M2} true → keep M1.",
            "M2 IN {M1, M2} true → keep M2.",
            "M3 IN {M1, M2} false → drop M3.",
            "Equivalent EXISTS: WHERE EXISTS (SELECT 1 FROM traded t WHERE t.member = member.id). Same three tests, same two rows.",
            "Duplicate M1 in TRADED does not duplicate M1 in the outer result: IN is a membership test, not a join fan-out.",
          ],
          result: "M1 and M2. IN does not fan out duplicates from the subquery.",
        },
        {
          title: "NOT IN with a NULL in the subquery — empty answer",
          prompt:
            "MEMBER ids M1, M2, M3. TRADED members M1 and NULL (one unknown member). SELECT id FROM member WHERE id NOT IN (SELECT member FROM traded). Evaluate three-valued logic for M2.",
          code: "SELECT id\nFROM member\nWHERE id NOT IN (SELECT member FROM traded);\n-- traded.member values: 'M1', NULL",
          language: "sql",
          steps: [
            "NOT IN expands to id <> 'M1' AND id <> NULL.",
            "For M2: (M2 <> M1) is true, (M2 <> NULL) is unknown. true AND unknown = unknown, which WHERE rejects.",
            "For M1: (M1 <> M1) is false, already dead, AND unknown still false/unknown. Rejected.",
            "For M3: same as M2 — true AND unknown = unknown. Rejected.",
            "The query therefore returns zero rows, even though M2 and M3 were never traded. This is the trap.",
            "Fix: WHERE id NOT IN (SELECT member FROM traded WHERE member IS NOT NULL), which is {M1} and then M2 and M3 survive; or WHERE NOT EXISTS (SELECT 1 FROM traded t WHERE t.member = member.id), which treats the NULL traded row as non-matching and also keeps M2 and M3.",
          ],
          result:
            "Zero rows. A single NULL in the NOT IN list poisons every outer row. Use NOT EXISTS.",
        },
        {
          title: "Empty subquery: IN false, NOT IN true",
          prompt:
            "TRADED is empty. MEMBER still M1, M2, M3. Evaluate WHERE id IN (SELECT member FROM traded) and WHERE id NOT IN (SELECT member FROM traded), and the same with NOT EXISTS.",
          code: "SELECT id FROM member WHERE id IN (SELECT member FROM traded);\nSELECT id FROM member WHERE id NOT IN (SELECT member FROM traded);\nSELECT id FROM member WHERE NOT EXISTS (\n  SELECT 1 FROM traded t WHERE t.member = member.id\n);",
          language: "sql",
          steps: [
            "IN of an empty set is false for every id. First query returns empty.",
            "NOT IN of an empty set is vacuously true (there is no element that id equals). Second query returns M1, M2, M3.",
            "No NULL is present, so NOT IN is safe here. The poison needs at least one NULL, not emptiness.",
            "NOT EXISTS: for each member the inner SELECT finds no row, EXISTS is false, NOT EXISTS is true. Third query also returns M1, M2, M3.",
            "EXISTS (empty) is false, matching IN’s emptiness behaviour; NOT EXISTS matches NOT IN on empty non-null sets.",
            "Exam pair to memorise: empty ⇒ IN empty, NOT IN all rows; NULL-in-list ⇒ NOT IN empty; NOT EXISTS still all non-matching rows.",
          ],
          result:
            "IN → no rows; NOT IN and NOT EXISTS → all three members. Emptiness is not the NULL trap.",
        },
        {
          title: "IN a list that itself contains NULL",
          prompt:
            "SELECT 'M2' FROM (VALUES (1)) v WHERE 'M2' NOT IN ('M1', NULL) versus WHERE 'M2' NOT IN ('M1', 'M3'). No table needed beyond the list.",
          code: "SELECT 1 WHERE 'M2' NOT IN ('M1', NULL);\nSELECT 1 WHERE 'M2' NOT IN ('M1', 'M3');",
          language: "sql",
          steps: [
            "First predicate: M2 <> M1 is true, M2 <> NULL is unknown, AND is unknown. WHERE rejects. Query returns no row.",
            "Second predicate: M2 <> M1 true, M2 <> M3 true, AND true. Query returns 1.",
            "The list form of NOT IN is the same three-valued trap as the subquery form.",
            "IN ('M1', NULL) for 'M2' is unknown (not true), so WHERE 'M2' IN ('M1', NULL) also returns no row. IN needs a true, not an unknown.",
            "WHERE 'M1' IN ('M1', NULL) is true because one equality succeeds. The NULL does not poison IN the way it poisons NOT IN; it only poisons when no listed non-null matches and a NULL is present (IN becomes unknown rather than false).",
            "For a positive IN, a matching non-null is enough. For a NOT IN, every element including NULLs must be unequal, which is impossible with a NULL.",
          ],
          result:
            "NOT IN ('M1', NULL) yields empty; NOT IN ('M1', 'M3') yields a row. NULL poisons NOT IN, not a successful IN.",
        },
      ],
    },
    {
      heading: "Nested queries and correlated subqueries",
      body: "A nested subquery sits in WHERE, HAVING, FROM (derived table), or SELECT (scalar). An uncorrelated subquery does not mention outer columns and can be evaluated once. A correlated subquery mentions outer columns and is conceptually evaluated once per outer row.\n\nScalar subqueries must return at most one row and one column. Two rows raise a runtime cardinally error. Zero rows become NULL in a scalar context (so SET col = (SELECT …) can unexpectedly NULL a column). IN/EXISTS subqueries may return many rows.\n\nDerived tables in FROM must be aliased. They are a way to filter then join, or to pre-aggregate: FROM (SELECT member, SUM(qty) AS tot FROM trade GROUP BY member) t JOIN member m ON m.id = t.member WHERE t.tot > 1000.\n\nCorrelation is not evil: EXISTS (SELECT 1 FROM ack a WHERE a.cid = c.cid) is the idiomatic “circulars that have at least one ack”. Rewriting as a join plus DISTINCT is equivalent for this semijoin but can fan out if you forget DISTINCT. For anti-semijoins, correlated NOT EXISTS is the safe rewrite, as the previous section showed.",
      bullets: [
        "Uncorrelated: evaluate once. Correlated: once per outer row (conceptually).",
        "Scalar subquery: 0 rows → NULL, 2 rows → error. IN/EXISTS: many rows fine.",
        "FROM (SELECT …) AS d must be named. Pre-aggregate in a derived table, then join.",
      ],
      examples: [
        {
          title: "Uncorrelated scalar: members above average margin",
          prompt:
            "MEMBER(id, margin): (M1, 8), (M2, 3), (M3, 10), (M4, 3). SELECT id FROM member WHERE margin > (SELECT AVG(margin) FROM member). Compute the average on paper first.",
          code: "SELECT id\nFROM member\nWHERE margin > (SELECT AVG(margin) FROM member);",
          language: "sql",
          steps: [
            "Inner AVG(margin) is uncorrelated: (8+3+10+3)/4 = 6.",
            "Outer test: M1 8>6 keep, M2 3>6 drop, M3 10>6 keep, M4 3>6 drop.",
            "The inner query runs once, not four times, because it does not mention the outer member.",
            "If a margin were NULL, AVG would skip it and the divisor would shrink. COUNT(*) in the denominator would be a different (wrong) average.",
            "Writing WHERE margin > AVG(margin) without a subquery is illegal: AVG is an aggregate, so it belongs in HAVING after GROUP BY, which would be one group of the whole table and could not return per-id rows.",
            "Result ids M1 and M3. Tie values equal to 6 would be dropped by > (use >= if the question says “at least average”).",
          ],
          result: "AVG = 6; result M1 and M3. The subquery is uncorrelated and evaluated once.",
        },
        {
          title: "Correlated EXISTS: circulars with an ack from M1",
          prompt:
            "CIRCULAR(cid): C1, C2, C3. ACK(cid, member): (C1, M1), (C1, M2), (C2, M3). SELECT cid FROM circular c WHERE EXISTS (SELECT 1 FROM ack a WHERE a.cid = c.cid AND a.member = 'M1').",
          code: "SELECT c.cid\nFROM circular c\nWHERE EXISTS (\n  SELECT 1 FROM ack a\n  WHERE a.cid = c.cid\n    AND a.member = 'M1'\n);",
          language: "sql",
          steps: [
            "Outer C1: inner looks for ack rows with cid C1 and member M1. Finds (C1, M1). EXISTS true. Keep C1.",
            "Outer C2: inner looks for C2 and M1. Only (C2, M3) exists. No row. EXISTS false. Drop C2.",
            "Outer C3: no ack rows at all. EXISTS false. Drop C3.",
            "The SELECT 1 could have been SELECT a.member or SELECT 1/0; EXISTS only checks for the presence of a row. (Do not actually write 1/0 in an exam engine that evaluates the select list early.)",
            "Join form: SELECT DISTINCT c.cid FROM circular c INNER JOIN ack a ON a.cid = c.cid AND a.member = 'M1'. DISTINCT is required if M1 could ack C1 twice; EXISTS never duplicates C1.",
            "This subquery is correlated because a.cid = c.cid mentions the outer alias c.",
          ],
          result: "Only C1. EXISTS is a semijoin: C1 is not duplicated even if M1 acked twice.",
        },
        {
          title: "Correlated scalar in SELECT: ack count per circular",
          prompt:
            "Same circulars and acks as the previous example. SELECT c.cid, (SELECT COUNT(*) FROM ack a WHERE a.cid = c.cid) AS n FROM circular c. Include C3.",
          code: "SELECT c.cid,\n       (SELECT COUNT(*) FROM ack a WHERE a.cid = c.cid) AS n\nFROM circular c;",
          language: "sql",
          steps: [
            "C1: COUNT(*) of acks with cid C1 = 2. Scalar returns 2.",
            "C2: COUNT(*) = 1.",
            "C3: COUNT(*) of an empty set = 0, not NULL. COUNT never returns NULL. Keep C3 with 0.",
            "Each outer row runs the subquery (conceptually). The subquery is scalar: one column, one row (aggregates without GROUP BY always return one row).",
            "LEFT JOIN plus GROUP BY COUNT(a.cid) produces the same three rows and is usually cheaper. Both are acceptable; the scalar version is the nested-query illustration.",
            "If you wrote (SELECT a.member FROM ack a WHERE a.cid = c.cid) without an aggregate, C1 would return two rows and the scalar subquery would raise a cardinality error.",
          ],
          result: "(C1, 2), (C2, 1), (C3, 0). Empty COUNT is 0; a non-aggregate scalar would crash on C1.",
        },
        {
          title: "Derived table then join: only heavy members",
          prompt:
            "TRADE(member, qty): (M1, 10), (M1, 90), (M2, 5), (M3, 40), (M3, 20). MEMBER(id, city): (M1, Mum), (M2, Mum), (M3, Pune). List city of members whose total qty ≥ 50, using a FROM subquery.",
          code: "SELECT m.id, m.city, t.tot\nFROM member m\nJOIN (\n  SELECT member, SUM(qty) AS tot\n  FROM trade\n  GROUP BY member\n  HAVING SUM(qty) >= 50\n) t ON t.member = m.id;",
          language: "sql",
          steps: [
            "Derived table groups trades: M1 sum 100, M2 sum 5, M3 sum 60. HAVING keeps M1 (100) and M3 (60). M2 drops.",
            "Join to MEMBER on id: M1 Mumbai tot 100, M3 Pune tot 60. M2 never appears (not in the derived table), even though M2 exists in MEMBER.",
            "This is an inner join to a pre-aggregated set, so members with no trades also disappear (they are absent from the grouped table).",
            "To keep zero-trade members you would LEFT JOIN the derived table and COALESCE(t.tot, 0), then filter in WHERE — but WHERE t.tot >= 50 would again drop the pads; use WHERE COALESCE(t.tot,0) >= 50 if zeros should drop, which they should here.",
            "The derived table must have an alias t. Omitting it is a syntax error in standard SQL.",
            "You cannot put HAVING SUM(qty) >= 50 on MEMBER without grouping MEMBER with TRADE first. The nested FROM is the clean split: aggregate, then join attributes.",
          ],
          result:
            "(M1, Mum, 100) and (M3, Pune, 60). M2 is filtered by HAVING before the join.",
        },
      ],
    },
  ],
};
