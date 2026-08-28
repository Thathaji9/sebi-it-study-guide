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
        {
          title: "HAVING with no GROUP BY is one bag",
          prompt:
            "VAULT rows: (V9, 15), (V9, 35), (V4, 9), (V8, 60). SELECT SUM(qty) HAVING SUM(qty) >= 100 — legal? What prints? What if HAVING SUM(qty) >= 200?",
          code: "SELECT SUM(qty) AS tot\nFROM vault\nHAVING SUM(qty) >= 100;",
          language: "sql",
          steps: [
            {
              do: "No GROUP BY means the whole table is one group. SUM(qty) = 15+35+9+60 = 119.",
              why: "HAVING still waits until a group exists. One invisible bag holds every row.",
            },
            {
              do: "119 >= 100 is true, so one result row prints 119.",
              why: "HAVING keeps or drops that single bag. It is not a per-row WHERE.",
            },
            {
              do: "HAVING SUM(qty) >= 200 is false, so the result is empty — not a row of NULL.",
              why: "A failed bag-check deletes the group. There is no leftover placeholder.",
            },
            {
              do: "WHERE SUM(qty) >= 100 is still illegal. WHERE cannot see aggregates.",
              why: "You cannot weigh the bag before you have put apples in it.",
            },
            {
              do: "If you wanted vaults whose own total ≥ 100, you must GROUP BY vault_id first (V9=50, V4=9, V8=60 — nobody passes 100).",
              why: "Missing GROUP BY is a different question: the grand total, not per vault.",
            },
          ],
          result: "Legal. One row 119. HAVING SUM(qty) >= 200 returns no rows. WHERE SUM is still illegal.",
        },
        {
          title: "SELECT alias is invisible in WHERE",
          prompt:
            "SELECT vault_id, qty * 2 AS doubled FROM vault WHERE doubled > 40 — legal? Rewrite it. Rows: (V9, 15), (V4, 9), (V8, 60).",
          code: "SELECT vault_id, qty * 2 AS doubled\nFROM vault\nWHERE qty * 2 > 40;",
          language: "sql",
          steps: [
            {
              do: "WHERE doubled > 40 is illegal in standard SQL. WHERE runs before SELECT aliases exist.",
              why: "Recite the order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. doubled is born in SELECT.",
            },
            {
              do: "Rewrite the filter as WHERE qty * 2 > 40 (or wrap the SELECT in a derived table and filter outside).",
              why: "Repeat the expression, or name the subquery, so WHERE can see a real column.",
            },
            {
              do: "Walk rows: V9 doubled 30 drop, V4 doubled 18 drop, V8 doubled 120 keep.",
              why: "Tick the rows. Do not guess from the English.",
            },
            {
              do: "ORDER BY doubled is allowed in many engines because ORDER BY runs after SELECT.",
              why: "Aliases are late. WHERE is early. HAVING is after GROUP BY, still before SELECT in the standard story, so HAVING tot is also exam-unsafe — write HAVING SUM(qty).",
            },
            {
              do: "Do not “fix” it with WHERE doubled > 40 just because a vendor might accept it.",
              why: "The paper wants the homework order, not your laptop’s dialect.",
            },
          ],
          result:
            "WHERE doubled is not standard. Filter with WHERE qty * 2 > 40. Only (V8, 120) remains.",
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
        {
          title: "Zero is not NULL in AVG",
          prompt:
            "fee: 5, 0, NULL, 15. Compute COUNT(*), COUNT(fee), SUM(fee), AVG(fee), and AVG if you wrongly treat NULL as 0.",
          code: "SELECT COUNT(*), COUNT(fee), SUM(fee), AVG(fee)\nFROM lot_fee;",
          language: "sql",
          steps: [
            {
              do: "Four rows → COUNT(*) = 4. Known fees 5, 0, 15 → COUNT(fee) = 3.",
              why: "Star counts paper rows. COUNT(col) counts filled boxes. 0 is filled.",
            },
            {
              do: "SUM skips NULL but keeps 0: 5+0+15 = 20. AVG = 20/3, not 20/4.",
              why: "AVG’s divisor is COUNT(fee), the known numbers. 0 is a known number.",
            },
            {
              do: "If the English said “treat missing as 0”, that is SUM(COALESCE(fee,0))/COUNT(*) = 20/4 = 5.",
              why: "That is a different formula. Default AVG does not invent zeros for holes.",
            },
            {
              do: "Do not drop the 0 from COUNT(fee). Only NULL is a hole.",
              why: "Zero rupees is a fact. Unknown rupees is a hole.",
            },
            {
              do: "All-NULL column would give SUM NULL, COUNT(fee) 0, COUNT(*) still 4.",
              why: "SUM of no known numbers is unknown, not 0, unless you COALESCE.",
            },
          ],
          result: "4, 3, 20, 20/3. Treating NULL as 0 would be 20/4 = 5, which is not default AVG.",
        },
        {
          title: "COUNT(DISTINCT city) skips NULL then unique",
          prompt:
            "city: Hyd, Hyd, NULL, Nagpur, Hyd. COUNT(*), COUNT(city), COUNT(DISTINCT city).",
          code: "SELECT COUNT(*), COUNT(city), COUNT(DISTINCT city)\nFROM stop;",
          language: "sql",
          steps: [
            {
              do: "Five rows → COUNT(*) = 5.",
              why: "Star does not care about holes or copies.",
            },
            {
              do: "COUNT(city) skips the NULL → 4 (three Hyd and one Nagpur).",
              why: "COUNT(col) is “how many filled boxes”, copies still count.",
            },
            {
              do: "COUNT(DISTINCT city) skips NULL then unique-ifies {Hyd, Nagpur} → 2.",
              why: "DISTINCT is after the NULL skip. NULL is not a city name in this count.",
            },
            {
              do: "Two NULL cities would still add 0 to COUNT(DISTINCT city), not 1.",
              why: "NULLs are not grouped as a distinct value in COUNT(DISTINCT) in the exam story.",
            },
            {
              do: "If they wanted “how many different labels including unknown”, that is not COUNT(DISTINCT city).",
              why: "Read the English. Default COUNT(DISTINCT) ignores holes.",
            },
          ],
          result: "5, 4, 2. DISTINCT city is Hyd and Nagpur. The NULL is not a third city.",
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
        {
          title: "Fan-out: three lots on one custodian",
          prompt:
            "CUSTODIAN: (C1, HDFC), (C2, ICICI). LOT: (L1, C1), (L2, C1), (L3, C1), (L4, C2), (L5, C9). INNER JOIN on cust_id. How many rows? Who vanishes?",
          code: "SELECT l.lot_id, c.name\nFROM lot l\nINNER JOIN custodian c ON l.cust_id = c.id;",
          language: "sql",
          steps: [
            {
              do: "L1, L2, L3 match HDFC (three copies of C1). L4 matches ICICI. L5’s C9 is missing — drop.",
              why: "Inner join is a handshake. No partner, no row. k matches → k copies of the parent.",
            },
            {
              do: "Count four result rows, not two custodians and not five lots.",
              why: "You count matching pairs, not parents and not the original lot list.",
            },
            {
              do: "HDFC appears three times because it has three lots. That is fan-out, not a bug.",
              why: "One-to-many multiplies the “one” side.",
            },
            {
              do: "A custodian with zero lots (if you added C3) would also vanish on INNER JOIN.",
              why: "Zero matches → gone. Only LEFT JOIN would keep that empty seat.",
            },
            {
              do: "ON and WHERE agree here: WHERE l.cust_id = c.id after CROSS JOIN yields the same four rows.",
              why: "For inner joins, ON and WHERE both filter the grid. They split only on outer joins.",
            },
          ],
          result:
            "(L1, HDFC), (L2, HDFC), (L3, HDFC), (L4, ICICI). Lot L5 and any lot-less custodian disappear.",
        },
        {
          title: "Empty right table wipes an inner join",
          prompt:
            "KRA has 3 rows. MATCHED is empty. SELECT * FROM kra k INNER JOIN matched m ON k.pan = m.pan. How many rows? What about CROSS JOIN?",
          code: "SELECT k.pan\nFROM kra k\nINNER JOIN matched m ON k.pan = m.pan;",
          language: "sql",
          steps: [
            {
              do: "Inner join of 3 × 0 matches = 0 rows. Every KRA pan fails the handshake.",
              why: "No partner, no row. Empty is the extreme “zero matches”.",
            },
            {
              do: "CROSS JOIN is also 3 × 0 = 0. An empty operand wipes the product.",
              why: "Keeping the other table is an outer-join idea, not a product idea.",
            },
            {
              do: "LEFT JOIN FROM kra LEFT JOIN matched would keep 3 KRA rows padded with NULL.",
              why: "Left join preserves the left even without a partner. That is the next heading’s tool.",
            },
            {
              do: "Do not say “3 rows of KRA” for INNER JOIN. That is mixing join kinds.",
              why: "Exam trap: empty child table does not “keep the parents” on an inner join.",
            },
            {
              do: "INNER JOIN ON TRUE with an empty right is still empty (same as CROSS JOIN).",
              why: "TRUE does not invent right-hand rows.",
            },
          ],
          result: "Inner join: 0 rows. CROSS JOIN: 0 rows. Only LEFT JOIN would keep the 3 KRA pans.",
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
        {
          title: "FULL JOIN keeps both orphans",
          prompt:
            "KRA pans: P11, P12. FILED pans: P12, P19. FULL OUTER JOIN on pan. List rows. Who would INNER / LEFT / RIGHT keep?",
          code: "SELECT k.pan AS kra_pan, f.pan AS filed_pan\nFROM kra k\nFULL OUTER JOIN filed f ON k.pan = f.pan;",
          language: "sql",
          steps: [
            {
              do: "Match first: P12 pairs with P12. Then pad unused left P11 with NULL on the right, unused right P19 with NULL on the left.",
              why: "FULL JOIN = inner matches + left orphans + right orphans. Do not duplicate the match.",
            },
            {
              do: "Three result rows: (P11, NULL), (P12, P12), (NULL, P19).",
              why: "Paper method: matches, then one padded row per unused side.",
            },
            {
              do: "INNER would keep only (P12, P12). LEFT FROM kra would keep P11 and P12, drop P19. RIGHT FROM kra would keep P12 and P19, drop P11.",
              why: "The preserved side is the difference between the four join words.",
            },
            {
              do: "Never add a second (P12, P12) when you add pads.",
              why: "Pads are only for unused keys. Matched keys already have a row.",
            },
            {
              do: "WHERE f.pan IS NOT NULL after FULL JOIN throws P11 away and is no longer full.",
              why: "A WHERE on the other side’s key turns outer back toward inner.",
            },
          ],
          result:
            "FULL: (P11, NULL), (P12, P12), (NULL, P19). INNER only P12. LEFT drops P19. RIGHT drops P11.",
        },
        {
          title: "Put the right filter in ON to keep the pad",
          prompt:
            "FROM kra k LEFT JOIN filed f ON k.pan = f.pan AND f.year = 2026. KRA: P11, P12. FILED: (P12, 2025), (P12, 2026). What stays?",
          code: "SELECT k.pan, f.year\nFROM kra k\nLEFT JOIN filed f\n  ON k.pan = f.pan AND f.year = 2026;",
          language: "sql",
          steps: [
            {
              do: "ON decides matching. P12 matches the 2026 row only. The 2025 row is not a match.",
              why: "Extra ON predicates are match rules, not “delete the left row”.",
            },
            {
              do: "P11 has no 2026 file → keep P11 with year NULL (the pad).",
              why: "Left join preserves the left even when the extra ON filter fails.",
            },
            {
              do: "Result: (P11, NULL) and (P12, 2026). The 2025 filing is invisible from this join.",
              why: "Unmatched right rows are not kept on a left join.",
            },
            {
              do: "If you had LEFT JOIN only on pan, then WHERE f.year = 2026, P11’s NULL year would fail WHERE and vanish — inner join in disguise.",
              why: "WHERE on a right column throws empty seats away. ON keeps them.",
            },
            {
              do: "Need “parents with zero 2026 files”? This ON pattern, then COUNT(f.pan) = 0 in HAVING.",
              why: "Zeros need the pad, then COUNT of the child key, not COUNT(*).",
            },
          ],
          result:
            "(P11, NULL) and (P12, 2026). Filter year in ON, not WHERE, if you still want unmatched KRA rows.",
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
        {
          title: "Grouped view cannot take INSERT",
          prompt:
            "View v_desk_tot = SELECT desk, SUM(qty) FROM fill GROUP BY desk. INSERT INTO v_desk_tot VALUES ('D7', 40). Simple view v_nse = fills WHERE venue='NSE' — can that INSERT a BSE row without CHECK OPTION?",
          code: "CREATE VIEW v_desk_tot AS\nSELECT desk, SUM(qty) AS tot FROM fill GROUP BY desk;\nINSERT INTO v_desk_tot VALUES ('D7', 40);",
          language: "sql",
          steps: [
            {
              do: "v_desk_tot is grouped. There is no single base row to write back to. INSERT is rejected.",
              why: "A bag of fills is not one fill. GROUP BY and DISTINCT views are usually not updatable.",
            },
            {
              do: "v_nse is a simple row filter. Without CHECK OPTION, INSERT of a BSE row can succeed on FILL and then vanish from the view.",
              why: "That vanishing row is legal unless WITH CHECK OPTION is on.",
            },
            {
              do: "WITH CHECK OPTION on v_nse would refuse the BSE insert because the row would fall out of venue='NSE'.",
              why: "The window must still show the row after the change.",
            },
            {
              do: "CHECK OPTION does not magically make v_desk_tot updatable.",
              why: "The grouped view is blocked by grain, not by the filter.",
            },
            {
              do: "DROP VIEW v_desk_tot leaves FILL in place. DROP TABLE fill would take the view with CASCADE, or fail with RESTRICT.",
              why: "VIEW gone ≠ table gone. Know which object you named.",
            },
          ],
          result:
            "INSERT into the SUM view fails. Simple v_nse can accept a BSE row without CHECK OPTION (then it disappears from the view).",
        },
        {
          title: "ALTER ADD COLUMN keeps rows; DROP TABLE does not",
          prompt:
            "Table SIP has 6 rows. Contrast ALTER TABLE sip ADD COLUMN step_up INT; with DROP TABLE sip; and DELETE FROM sip;",
          code: "ALTER TABLE sip ADD COLUMN step_up INT;\nDELETE FROM sip;\nDROP TABLE sip;",
          language: "sql",
          steps: [
            {
              do: "ALTER ADD COLUMN keeps the 6 rows. New step_up is NULL (unless a default is given).",
              why: "ALTER changes shape. The notebook stays; you add a new margin column.",
            },
            {
              do: "DELETE FROM sip removes the 6 rows but the table (and indexes, grants) remain. You may INSERT again.",
              why: "DELETE is row-level emptying. WHERE would have been allowed. Triggers fire.",
            },
            {
              do: "DROP TABLE sip removes the object. Rows, indexes, and the name are gone. A later SELECT sip fails.",
              why: "DROP is “throw away the notebook”, not “erase the lines”.",
            },
            {
              do: "TRUNCATE would also empty all rows, with no WHERE, usually no per-row triggers.",
              why: "TRUNCATE is the bulk reset between DELETE and DROP.",
            },
            {
              do: "Need the 6 SIPs plus a new column → ALTER. Need the rows gone but the table kept → DELETE/TRUNCATE. Need the name gone → DROP.",
              why: "Exam quartet: ALTER = shape, DELETE/TRUNCATE = rows, DROP = the thing is gone.",
            },
          ],
          result:
            "ALTER ADD: 6 rows remain, step_up NULL. DELETE: 0 rows, table remains. DROP: table gone.",
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
        {
          title: "UNION ALL then DISTINCT is UNION",
          prompt:
            "WATCH_A: Q1, Q1, Q2. WATCH_B: Q2, Q3, Q3. Row counts for UNION ALL, UNION, and SELECT DISTINCT of the UNION ALL.",
          code: "SELECT isin FROM watch_a\nUNION ALL\nSELECT isin FROM watch_b;",
          language: "sql",
          steps: [
            {
              do: "UNION ALL concatenates six rows: Q1, Q1, Q2, Q2, Q3, Q3.",
              why: "ALL means “keep the pile, do not tidy”. Copies from both sides stay.",
            },
            {
              do: "UNION unique-ifies to {Q1, Q2, Q3} — three rows.",
              why: "Plain UNION is concat + DISTINCT.",
            },
            {
              do: "SELECT DISTINCT of that UNION ALL is also {Q1, Q2, Q3}. Same three names, extra work.",
              why: "DISTINCT after UNION ALL reconstructs UNION. Prefer UNION if that is the meaning.",
            },
            {
              do: "Two NULL rows, one on each side, collapse to one under UNION and stay two under UNION ALL.",
              why: "Set operators treat NULL as equal to NULL, unlike WHERE col = NULL.",
            },
            {
              do: "Column count must match. UNION of (isin, qty) with (isin) is an error.",
              why: "Stacking needs the same width. Names come from the first SELECT.",
            },
          ],
          result: "UNION ALL → 6 rows. UNION → 3 rows (Q1, Q2, Q3). DISTINCT of UNION ALL is the same 3.",
        },
        {
          title: "EXCEPT drops the left-only names",
          prompt:
            "LIST_A: P7, P8, P8, P9. LIST_B: P8, P10. LIST_A EXCEPT LIST_B, then the swap, then INTERSECT.",
          code: "SELECT pan FROM list_a\nEXCEPT\nSELECT pan FROM list_b;",
          language: "sql",
          steps: [
            {
              do: "Distinct sets: A = {P7, P8, P9}, B = {P8, P10}. A − B = {P7, P9}.",
              why: "Default EXCEPT is DISTINCT. Extra P8 on the left still removes P8 once it appears on the right.",
            },
            {
              do: "Swap: B − A = {P10}. Not the same as {P7, P9}.",
              why: "EXCEPT is not symmetric. Always name which query is the left.",
            },
            {
              do: "INTERSECT is {P8}. One row, even though A had P8 twice.",
              why: "Intersect compares whole rows as a set by default. It does not fan out like a join.",
            },
            {
              do: "EXCEPT ALL (where supported) would start from two P8s on the left and subtract one P8, leaving one P8 plus P7 and P9.",
              why: "ALL uses multiplicities. If the paper is silent, answer DISTINCT EXCEPT.",
            },
            {
              do: "Empty LIST_B ⇒ LIST_A EXCEPT LIST_B is {P7, P8, P9} (distinct left).",
              why: "Minus nothing leaves the left set. That is not the NOT IN plus NULL trap.",
            },
          ],
          result: "A EXCEPT B = {P7, P9}. B EXCEPT A = {P10}. INTERSECT = {P8}.",
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
        {
          title: "IN does not fan out duplicates",
          prompt:
            "PAN_ROLL: P21, P22, P23. FILED: P21, P21, P22. WHERE pan IN (SELECT pan FROM filed).",
          code: "SELECT pan FROM pan_roll\nWHERE pan IN (SELECT pan FROM filed);",
          language: "sql",
          steps: [
            {
              do: "Inner set {P21, P22}. Keep P21 and P22. Drop P23.",
              why: "IN is a membership test, like “is this roll number on the sheet?”, not a join.",
            },
            {
              do: "Two P21 rows in FILED do not duplicate P21 in the result.",
              why: "IN is not a join fan-out. One outer row still prints once.",
            },
            {
              do: "EXISTS (SELECT 1 FROM filed f WHERE f.pan = pan_roll.pan) returns the same two pans.",
              why: "No NULLs, so IN and EXISTS agree.",
            },
            {
              do: "An INNER JOIN on pan would print P21 twice (2 inner copies × 1 outer).",
              why: "That is the join-versus-IN trap. Membership does not multiply.",
            },
            {
              do: "Empty FILED would keep nobody for IN, and keep everybody for NOT IN (still no NULL).",
              why: "Empty is vacuous, not poison. Poison is a NULL inside NOT IN.",
            },
          ],
          result: "P21 and P22 once each. IN does not copy duplicates from the subquery.",
        },
        {
          title: "NOT EXISTS survives a NULL inner row",
          prompt:
            "PAN_ROLL P21, P22, P23. FILED pans: P21 and NULL. NOT EXISTS (SELECT 1 FROM filed f WHERE f.pan = pan_roll.pan).",
          code: "SELECT pan FROM pan_roll p\nWHERE NOT EXISTS (\n  SELECT 1 FROM filed f\n  WHERE f.pan = p.pan\n);",
          language: "sql",
          steps: [
            {
              do: "For P21 the inner finds the P21 file row → EXISTS true → NOT EXISTS drops P21.",
              why: "A real equal match is enough. Extra NULL in FILED does not matter for this pan.",
            },
            {
              do: "For P22: f.pan = P22 is false on P21 and unknown on NULL. No row qualifies → EXISTS false → keep P22. Same for P23.",
              why: "NOT EXISTS only cares whether a matching row appeared. NULL = P22 is not true, so that inner row is not a match.",
            },
            {
              do: "NOT IN (SELECT pan FROM filed) would be P22 <> P21 AND P22 <> NULL → unknown, and every outer pan dies.",
              why: "That is the poison. Same data, opposite outer result.",
            },
            {
              do: "Prefer NOT EXISTS (or LEFT JOIN … WHERE f.pan IS NULL) for “not in the list”.",
              why: "Exam slogan: anti-membership → NOT EXISTS, never NOT IN (nullable_col).",
            },
            {
              do: "Filter the subquery with pan IS NOT NULL inside NOT IN if you must use IN.",
              why: "A clean list has no poison. EXISTS does not need that extra filter to stay safe.",
            },
          ],
          result:
            "NOT EXISTS keeps P22 and P23. NOT IN on the same list would return zero rows because of the NULL.",
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
        {
          title: "Scalar subquery: 0 becomes NULL, 2 is an error",
          prompt:
            "DESK has D4 margin 9 and D5 margin 9. WHERE id = (SELECT id FROM desk WHERE margin = 9). What happens? What if margin = 9 matches nobody? What if you wrap with AVG?",
          code: "SELECT id FROM desk\nWHERE id = (SELECT id FROM desk WHERE margin = 9);",
          language: "sql",
          steps: [
            {
              do: "The inner SELECT returns D4 and D5 — two rows, one column. A scalar subquery must be at most one row. The query errors.",
              why: "Equals wants one value. Two names cannot sit on the right of =.",
            },
            {
              do: "If nobody has margin 9, the scalar becomes NULL. id = NULL is unknown, so WHERE keeps nobody.",
              why: "Zero rows in a scalar is NULL, not an error. Unknown fails the test.",
            },
            {
              do: "IN (SELECT id FROM desk WHERE margin = 9) would legally keep D4 and D5.",
              why: "IN/EXISTS may return many rows. Scalar may not.",
            },
            {
              do: "(SELECT AVG(margin) FROM desk) always returns one row, even if DESK is empty (AVG of empty is NULL; COUNT of empty is 0).",
              why: "An aggregate without GROUP BY is a one-row scalar. That is the safe rewrite when you wanted “the typical margin”.",
            },
            {
              do: "Do not write WHERE margin = AVG(margin) without a subquery — AVG is not a per-row WHERE function.",
              why: "Aggregates need GROUP BY/HAVING or a subquery.",
            },
          ],
          result:
            "Two matching ids → scalar error. Zero matches → NULL, outer WHERE empty. Use IN or AVG to avoid the two-row crash.",
        },
        {
          title: "Correlated: fee above the city’s average",
          prompt:
            "STOP rows: (Mum, 8), (Mum, 4), (Pune, 12), (Pune, 3), (Pune, 6). Keep cities’ rows whose fee > AVG(fee) of the same city.",
          code: "SELECT city, fee FROM stop s\nWHERE fee > (\n  SELECT AVG(fee) FROM stop t\n  WHERE t.city = s.city\n);",
          language: "sql",
          steps: [
            {
              do: "The inner query mentions s.city, so it is correlated — conceptually once per outer row.",
              why: "Each stop asks “what is the average fee in my city?”",
            },
            {
              do: "Mum AVG = (8+4)/2 = 6. Keep Mum 8, drop Mum 4. Pune AVG = (12+3+6)/3 = 7. Keep Pune 12, drop 3 and 6.",
              why: "Tick groups separately. The grand average is 33/5 = 6.6 — a different bar. Correlation uses the city’s own average.",
            },
            {
              do: "The uncorrelated WHERE fee > (SELECT AVG(fee) FROM stop) compares everyone to 6.6, so Pune 6 would still drop, but the English would be “above the overall average”, not “above my city”.",
              why: "Correlation is the “same city” pin. Remove t.city = s.city and you changed the English.",
            },
            {
              do: "A derived table of city averages joined on city is the uncorrelated rewrite: JOIN (SELECT city, AVG(fee) AS a FROM stop GROUP BY city) x ON x.city = s.city WHERE s.fee > x.a.",
              why: "Same answer, one group-by, then a join. Alias the derived table.",
            },
            {
              do: "Rows that tie the city average drop. Need “≥” if the English said “at least the city average”.",
              why: "Read the comparison. This stem was strict >.",
            },
          ],
          result: "Keep (Mum, 8) and (Pune, 12). City AVGs are 6 and 7. Grand AVG 6.6 is a different question.",
        },
      ],
    },
  ],
};
