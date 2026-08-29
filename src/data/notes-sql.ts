import type { TopicNote } from "@/data/notes";

export const notesSql: TopicNote = {
  topic: "sql",
  title: "SQL — simple notes",
  blurb:
    "SQL talks to tables. We learn one command, then solve 5 tiny tables step by step.",
  blocks: [
    {
      heading: "What is SQL / CRUD (create, read, update, delete)",
      body: "In simple words, SQL is how we talk to a table. A table is a grid: each row is one thing (one kid, one mark), each column is one fact (name, age).\n\nCRUD is four jobs. Create adds a row. Read looks at rows. Update changes a cell. Delete removes a row. Learn the job first, then the spelling.",
      howTo: [
        "Name the table and draw its tiny grid.",
        "Ask: am I adding, looking, changing, or removing?",
        "Write the command. If you change or delete, add WHERE so only the right rows move.",
        "Tick every row: before → after. That is the answer.",
      ],
      bullets: [
        "SQL = talk to tables.",
        "Create = INSERT. Read = SELECT. Update = UPDATE. Delete = DELETE.",
        "A table has a name, columns, and rows.",
        "WHERE says which rows. No WHERE on UPDATE/DELETE hits every row.",
        "CREATE TABLE makes the empty grid. INSERT fills it.",
      ],
      examples: [
        {
          title: "Name the CRUD job",
          prompt:
            "Kid\nid | name | age\n1  | Pia  | 10\n2  | Dev  | 9\n\nWhich job is each command: INSERT, SELECT, UPDATE, DELETE?",
          code: "INSERT INTO kid VALUES (3, 'Nia', 10);\nSELECT name FROM kid;\nUPDATE kid SET age = 11 WHERE id = 1;\nDELETE FROM kid WHERE id = 2;",
          language: "sql",
          steps: [
            {
              do: "Draw the grid. Two rows: Pia 10, Dev 9.",
              why: "CRUD always starts from the table on the paper.",
            },
            {
              do: "INSERT adds Nia. That is Create.",
              why: "Create means a new row appears.",
            },
            {
              do: "SELECT name only looks. That is Read. The grid does not change.",
              why: "Read never rewrites a cell.",
            },
            {
              do: "UPDATE … WHERE id = 1 changes Pia’s age. That is Update.",
              why: "Update rewrites a fact on a row that already exists.",
            },
            {
              do: "DELETE … WHERE id = 2 removes Dev. That is Delete.",
              why: "Delete takes a row away. The table name is still there.",
            },
            {
              do: "After all four, the grid is Pia 11 and Nia 10 (if we ran them in order).",
              why: "Walk the jobs in order. Do not mix the spellings.",
            },
            {
              do: "None of these four is DROP TABLE. DROP is a different job: throw the grid away.",
              why: "CRUD is about rows. DROP is about the table object.",
            },
          ],
          result: "INSERT=Create, SELECT=Read, UPDATE=Update, DELETE=Delete.",
        },
        {
          title: "INSERT one kid",
          prompt:
            "Kid (before)\nid | name | age\n1  | Pia  | 10\n2  | Dev  | 9\n\nRun INSERT INTO kid VALUES (3, 'Nia', 10); What does the table look like?",
          code: "INSERT INTO kid VALUES (3, 'Nia', 10);",
          language: "sql",
          steps: [
            {
              do: "Tick row 1: Pia stays. We did not touch her.",
              why: "INSERT adds. It does not edit old rows.",
            },
            {
              do: "Tick row 2: Dev stays.",
              why: "Same: old rows keep their cells.",
            },
            {
              do: "Add row 3: id 3, name Nia, age 10.",
              why: "VALUES lists one new row in column order.",
            },
            {
              do: "Count rows: 2 became 3.",
              why: "Create grew the table by one.",
            },
            {
              do: "If id 3 already existed and id is unique, the INSERT would fail.",
              why: "A primary key cannot repeat. This paper grid was free.",
            },
            {
              do: "INSERT is DML: it changes data, not the column list.",
              why: "The heading id | name | age is the same.",
            },
            {
              do: "Read-back: SELECT * FROM kid now prints three rows.",
              why: "Create first, then Read to check.",
            },
          ],
          result: "Three rows: Pia 10, Dev 9, Nia 10.",
        },
        {
          title: "SELECT is Read — walk every row",
          prompt:
            "Kid\nid | name | age\n1  | Pia  | 10\n2  | Dev  | 9\n3  | Nia  | 10\n\nSELECT name, age FROM kid;",
          code: "SELECT name, age FROM kid;",
          language: "sql",
          steps: [
            {
              do: "This is Read. We copy cells out. We do not change Kid.",
              why: "SELECT never writes the table.",
            },
            {
              do: "We asked for name and age, not id. Drop the id column from the answer.",
              why: "The column list is a shopping list. Star would have taken every column.",
            },
            {
              do: "Tick row 1: copy Pia, 10.",
              why: "Read walks row by row.",
            },
            {
              do: "Tick row 2: copy Dev, 9.",
              why: "Same walk.",
            },
            {
              do: "Tick row 3: copy Nia, 10.",
              why: "Every row is kept because there is no WHERE.",
            },
            {
              do: "Kid on disk is still three rows with id.",
              why: "A result grid is a print-out, not a new saved table.",
            },
            {
              do: "Three result rows, two columns.",
              why: "Count pairs, not feelings.",
            },
          ],
          result: "(Pia, 10), (Dev, 9), (Nia, 10). Kid itself is unchanged.",
        },
        {
          title: "UPDATE with WHERE — only Pia",
          prompt:
            "Kid\nid | name | age\n1  | Pia  | 10\n2  | Dev  | 9\n3  | Nia  | 10\n\nUPDATE kid SET age = 11 WHERE name = 'Pia';",
          code: "UPDATE kid SET age = 11 WHERE name = 'Pia';",
          language: "sql",
          steps: [
            {
              do: "This is Update. SET age = 11 is the new fact. WHERE picks the row.",
              why: "Without WHERE every age would become 11.",
            },
            {
              do: "Tick row 1 Pia: name is Pia → rewrite age 10 to 11.",
              why: "WHERE matched. Only this cell changes.",
            },
            {
              do: "Tick row 2 Dev: name is not Pia → leave 9.",
              why: "A failed WHERE leaves the row alone.",
            },
            {
              do: "Tick row 3 Nia: name is not Pia → leave 10.",
              why: "Same skip.",
            },
            {
              do: "id and name columns never appeared in SET, so they stay.",
              why: "SET lists only the columns you rewrite.",
            },
            {
              do: "One row changed. Two rows did not.",
              why: "Count matches of WHERE, not the whole table.",
            },
            {
              do: "If two kids were named Pia, both ages would become 11.",
              why: "WHERE matches every row that fits, not “the first Pia”.",
            },
          ],
          result: "Pia 11, Dev 9, Nia 10. Only the WHERE row changed.",
        },
        {
          title: "DELETE with WHERE — Dev leaves",
          prompt:
            "Kid\nid | name | age\n1  | Pia  | 10\n2  | Dev  | 9\n3  | Nia  | 10\n\nDELETE FROM kid WHERE id = 2;",
          code: "DELETE FROM kid WHERE id = 2;",
          language: "sql",
          steps: [
            {
              do: "This is Delete. WHERE id = 2 names the row to throw away.",
              why: "DELETE without WHERE would empty the table.",
            },
            {
              do: "Tick row 1: id 1 ≠ 2 → keep Pia.",
              why: "Failed WHERE means stay.",
            },
            {
              do: "Tick row 2: id 2 → remove the whole Dev row.",
              why: "Delete takes the row, not one cell.",
            },
            {
              do: "Tick row 3: id 3 ≠ 2 → keep Nia.",
              why: "Same as Pia.",
            },
            {
              do: "The table Kid still exists. It now has two rows.",
              why: "Delete is CRUD on rows. The grid’s name stays.",
            },
            {
              do: "You can INSERT Dev again later. The column list is still id, name, age.",
              why: "Structure survived. Only a row left.",
            },
            {
              do: "DROP TABLE kid would remove the grid itself. That is not this command.",
              why: "CRUD Delete ≠ DROP.",
            },
          ],
          result: "Pia 10 and Nia 10 remain. Dev’s row is gone. Table Kid remains.",
        },
      ],
    },
    {
      heading: "SELECT (star vs column list) + ORDER BY",
      body: "In simple words, SELECT picks which columns to print. Star (*) means every column. A column list means only those names, in that order.\n\nORDER BY sorts the print-out. ASC is small to big (the default). DESC is big to small. ORDER BY runs last, after the rows are chosen. It does not change the saved table.",
      howTo: [
        "Draw the table. Write the column names you were asked for.",
        "If you see *, copy every column. If you see a list, copy only that list.",
        "Walk each row and copy those cells.",
        "If ORDER BY is there, sort the copied rows. ASC unless it says DESC.",
        "A second ORDER BY name is the tie-break.",
      ],
      bullets: [
        "SELECT * = every column. SELECT a, b = only a then b.",
        "Column order in SELECT is the print order, not the table order.",
        "ORDER BY sorts the result. Default is ASC.",
        "Ties: add a second column, like ORDER BY age, name.",
        "ORDER BY does not rewrite the stored table.",
      ],
      examples: [
        {
          title: "Star copies every column",
          prompt:
            "Kid\nid | name | age\n1  | Pia  | 10\n2  | Dev  | 9\n\nSELECT * FROM kid;",
          code: "SELECT * FROM kid;",
          language: "sql",
          steps: [
            {
              do: "Star means id, name, age — the full heading.",
              why: "* is “all columns”, not “all rows”. Rows still come from FROM.",
            },
            {
              do: "Tick row 1: copy (1, Pia, 10).",
              why: "Walk the grid top to bottom unless ORDER BY says otherwise.",
            },
            {
              do: "Tick row 2: copy (2, Dev, 9).",
              why: "No WHERE, so both rows print.",
            },
            {
              do: "Two result rows, three columns.",
              why: "Star kept the width of Kid.",
            },
            {
              do: "Kid on disk is unchanged.",
              why: "SELECT is Read.",
            },
            {
              do: "If a new column hobby is added later, SELECT * would start printing hobby too.",
              why: "Star follows the live heading. A written column list would not.",
            },
            {
              do: "Exam habit: prefer a column list when the paper names the columns.",
              why: "Then the print order is under your control.",
            },
          ],
          result: "(1, Pia, 10) and (2, Dev, 9).",
        },
        {
          title: "Column list drops id and swaps order",
          prompt:
            "Kid\nid | name | age\n1  | Pia  | 10\n2  | Dev  | 9\n3  | Nia  | 10\n\nSELECT age, name FROM kid;",
          code: "SELECT age, name FROM kid;",
          language: "sql",
          steps: [
            {
              do: "The list is age then name. id is not asked, so drop it.",
              why: "You only print what SELECT names.",
            },
            {
              do: "Tick row 1: (10, Pia).",
              why: "Put age first because the list said age, name.",
            },
            {
              do: "Tick row 2: (9, Dev).",
              why: "Same column order on every row.",
            },
            {
              do: "Tick row 3: (10, Nia).",
              why: "All three rows still appear.",
            },
            {
              do: "The stored table is still id | name | age.",
              why: "Print order ≠ storage order.",
            },
            {
              do: "SELECT name, name would print the name twice. Legal, just odd.",
              why: "The list can repeat a column.",
            },
            {
              do: "Three rows, two columns: age, name.",
              why: "Count the list, not the star.",
            },
          ],
          result: "(10, Pia), (9, Dev), (10, Nia).",
        },
        {
          title: "ORDER BY age ASC",
          prompt:
            "Kid\nid | name | age\n1  | Pia  | 10\n2  | Dev  | 9\n3  | Nia  | 8\n\nSELECT name, age FROM kid ORDER BY age;",
          code: "SELECT name, age FROM kid\nORDER BY age;",
          language: "sql",
          steps: [
            {
              do: "Copy name and age from each row first: Pia 10, Dev 9, Nia 8.",
              why: "ORDER BY sorts the result. It waits until the rows are picked.",
            },
            {
              do: "No WHERE, so all three rows are in the pile.",
              why: "Sort does not drop rows.",
            },
            {
              do: "ORDER BY age with no word means ASC: 8, then 9, then 10.",
              why: "Default sort is small to big.",
            },
            {
              do: "Nia 8 goes first.",
              why: "8 is the smallest age.",
            },
            {
              do: "Dev 9 goes second.",
              why: "9 sits between 8 and 10.",
            },
            {
              do: "Pia 10 goes last.",
              why: "10 is the biggest age.",
            },
            {
              do: "Kid on disk may still be Pia, Dev, Nia in id order.",
              why: "ORDER BY only changes the print-out.",
            },
          ],
          result: "(Nia, 8), (Dev, 9), (Pia, 10).",
        },
        {
          title: "ORDER BY age DESC, then name",
          prompt:
            "Kid\nid | name | age\n1  | Pia  | 10\n2  | Dev  | 9\n3  | Nia  | 10\n4  | Amy  | 9\n\nSELECT name, age FROM kid ORDER BY age DESC, name;",
          code: "SELECT name, age FROM kid\nORDER BY age DESC, name;",
          language: "sql",
          steps: [
            {
              do: "Copy four pairs: Pia 10, Dev 9, Nia 10, Amy 9.",
              why: "Sort last. First collect.",
            },
            {
              do: "age DESC: 10s before 9s.",
              why: "DESC is big to small.",
            },
            {
              do: "Two ages are 10: Pia and Nia. Tie-break is name ASC.",
              why: "The second key is used only when the first key is equal.",
            },
            {
              do: "Nia before Pia? N comes before P, so Nia 10, then Pia 10.",
              why: "Name ASC is dictionary order A→Z.",
            },
            {
              do: "Two ages are 9: Amy and Dev. Amy before Dev.",
              why: "A before D.",
            },
            {
              do: "Full print: Nia 10, Pia 10, Amy 9, Dev 9.",
              why: "First key DESC, second key ASC.",
            },
            {
              do: "If you only wrote ORDER BY age DESC, Pia vs Nia would be engine-dependent.",
              why: "Always add the tie-break the paper cares about.",
            },
          ],
          result: "(Nia, 10), (Pia, 10), (Amy, 9), (Dev, 9).",
        },
        {
          title: "SELECT list order is not ORDER BY",
          prompt:
            "Mark\nname | subject | score\nPia  | Maths   | 80\nDev  | Maths   | 40\nNia  | Art     | 90\n\nSELECT subject, name FROM mark ORDER BY score DESC;",
          code: "SELECT subject, name FROM mark\nORDER BY score DESC;",
          language: "sql",
          steps: [
            {
              do: "Print columns are subject, name. score is used only to sort.",
              why: "You may ORDER BY a column you do not print (in common SQL).",
            },
            {
              do: "Tick Pia Maths 80, Dev Maths 40, Nia Art 90.",
              why: "Collect first.",
            },
            {
              do: "score DESC: 90, 80, 40.",
              why: "Biggest mark first.",
            },
            {
              do: "Nia Art first (90).",
              why: "Top score.",
            },
            {
              do: "Pia Maths second (80).",
              why: "Middle score.",
            },
            {
              do: "Dev Maths last (40).",
              why: "Lowest score.",
            },
            {
              do: "Printed pairs: (Art, Nia), (Maths, Pia), (Maths, Dev).",
              why: "The SELECT list, in sort order.",
            },
          ],
          result: "(Art, Nia), (Maths, Pia), (Maths, Dev).",
        },
      ],
    },
    {
      heading: "WHERE vs HAVING + GROUP BY",
      body: "In simple words, WHERE tests one raw row, like “is this kid in class B?”. GROUP BY bags rows that share a key. HAVING tests the bag, like “does this class have at least 2 kids?”.\n\nRecite the homework order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. WHERE cannot see SUM. HAVING cannot see a row that WHERE already dropped. SELECT aliases are born late, so do not use them in WHERE.",
      howTo: [
        "Recite: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY.",
        "Row test (class = 'B', score >= 50) → WHERE.",
        "Bag test (COUNT(*) >= 2, SUM(score) >= 100) → HAVING.",
        "GROUP BY the columns that name the bag. Other selected columns need an aggregate.",
        "Tick: filter rows, make bags, filter bags, then print.",
      ],
      bullets: [
        "WHERE = each row. HAVING = each group.",
        "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.",
        "SUM/COUNT never go in WHERE.",
        "No GROUP BY + HAVING = one bag (the whole table).",
        "SELECT aliases are invisible in WHERE.",
      ],
      examples: [
        {
          title: "WHERE ticks rows, not bags",
          prompt:
            "Mark\nname | class | score\nPia  | B     | 80\nDev  | B     | 40\nNia  | A     | 90\nAmy  | B     | 70\n\nSELECT name FROM mark WHERE class = 'B';",
          code: "SELECT name FROM mark\nWHERE class = 'B';",
          language: "sql",
          steps: [
            {
              do: "FROM is Mark. Four raw rows.",
              why: "Homework starts at FROM.",
            },
            {
              do: "WHERE class = 'B'. Tick Pia B → keep.",
              why: "WHERE looks at one row’s class cell.",
            },
            {
              do: "Tick Dev B → keep.",
              why: "Same test.",
            },
            {
              do: "Tick Nia A → drop.",
              why: "A is not B.",
            },
            {
              do: "Tick Amy B → keep.",
              why: "Three B rows survive.",
            },
            {
              do: "No GROUP BY, no HAVING. SELECT name: Pia, Dev, Amy.",
              why: "The remaining rows print as they are.",
            },
            {
              do: "This is not “classes with many kids”. That would need GROUP BY class.",
              why: "WHERE never bags.",
            },
          ],
          result: "Pia, Dev, Amy. Nia dropped because class A.",
        },
        {
          title: "GROUP BY then HAVING",
          prompt:
            "Mark\nname | class | score\nPia  | B     | 80\nDev  | B     | 40\nNia  | A     | 90\nAmy  | B     | 70\nRaj  | A     | 20\n\nSELECT class, COUNT(*) AS n FROM mark GROUP BY class HAVING COUNT(*) >= 3;",
          code: "SELECT class, COUNT(*) AS n\nFROM mark\nGROUP BY class\nHAVING COUNT(*) >= 3;",
          language: "sql",
          steps: [
            {
              do: "FROM: five rows. No WHERE, so all five enter grouping.",
              why: "WHERE would have run first if it existed.",
            },
            {
              do: "GROUP BY class. Bag A: Nia, Raj. Bag B: Pia, Dev, Amy.",
              why: "Same class letter → same bag.",
            },
            {
              do: "Bag A has 2 rows. Bag B has 3 rows.",
              why: "COUNT(*) counts rows in the bag, holes or not.",
            },
            {
              do: "HAVING COUNT(*) >= 3. Bag A: 2 ≥ 3? No → drop A.",
              why: "HAVING tests the bag after it exists.",
            },
            {
              do: "Bag B: 3 ≥ 3? Yes → keep B.",
              why: "Only B passes the bag test.",
            },
            {
              do: "SELECT class, COUNT(*): one row (B, 3).",
              why: "One result row per surviving group.",
            },
            {
              do: "WHERE COUNT(*) >= 3 would be illegal.",
              why: "WHERE runs before bags. Recite the order.",
            },
          ],
          result: "One row: (B, 3). Class A had only 2 kids.",
        },
        {
          title: "WHERE first, then GROUP BY",
          prompt:
            "Mark\nname | class | score\nPia  | B     | 80\nDev  | B     | 40\nNia  | A     | 90\nAmy  | B     | 70\n\nSELECT class, SUM(score) FROM mark WHERE score >= 50 GROUP BY class;",
          code: "SELECT class, SUM(score)\nFROM mark\nWHERE score >= 50\nGROUP BY class;",
          language: "sql",
          steps: [
            {
              do: "WHERE score >= 50. Tick Pia 80 → keep.",
              why: "Row filter before bags.",
            },
            {
              do: "Tick Dev 40 → drop.",
              why: "40 fails 50. Dev never enters a bag.",
            },
            {
              do: "Tick Nia 90 → keep.",
              why: "Pass.",
            },
            {
              do: "Tick Amy 70 → keep.",
              why: "Pass.",
            },
            {
              do: "GROUP BY class. A: {90} sum 90. B: {80, 70} sum 150.",
              why: "Dev’s 40 is gone, so B is not 80+40+70.",
            },
            {
              do: "No HAVING. Print (A, 90) and (B, 150).",
              why: "Both bags exist after WHERE.",
            },
            {
              do: "If the English wanted “classes whose total is at least 100”, add HAVING SUM(score) >= 100 (A would drop).",
              why: "Totals are bag facts. HAVING, not WHERE.",
            },
          ],
          result: "(A, 90) and (B, 150). Dev never entered group B.",
        },
        {
          title: "SUM cannot live in WHERE",
          prompt:
            "Sale\ndesk | qty\nM1   | 10\nM1   | 40\nM2   | 5\nM3   | 80\n\nMembers whose total qty is at least 50. Why not WHERE SUM(qty) >= 50?",
          code: "SELECT desk, SUM(qty) AS tot\nFROM sale\nGROUP BY desk\nHAVING SUM(qty) >= 50;",
          language: "sql",
          steps: [
            {
              do: "Reject WHERE SUM(qty) >= 50. Recite: WHERE is before GROUP BY.",
              why: "Each row is still one sale. There is no total yet.",
            },
            {
              do: "GROUP BY desk. M1: 10+40=50. M2: 5. M3: 80.",
              why: "Bags first, then weigh them.",
            },
            {
              do: "HAVING SUM(qty) >= 50. Keep M1 (50) and M3 (80).",
              why: "HAVING is the bag-check.",
            },
            {
              do: "Drop M2 (5).",
              why: "5 is below 50.",
            },
            {
              do: "You may still WHERE qty >= 10 first, then group, then HAVING.",
              why: "Row filter then bag filter. They answer different questions.",
            },
            {
              do: "Do not write HAVING tot >= 50 on the exam if tot is a SELECT alias.",
              why: "HAVING is before SELECT in the standard story. Write HAVING SUM(qty).",
            },
            {
              do: "Result rows: (M1, 50), (M3, 80).",
              why: "Two bags passed.",
            },
          ],
          result: "Use HAVING. Result (M1, 50) and (M3, 80).",
        },
        {
          title: "HAVING with no GROUP BY is one bag",
          prompt:
            "Box\nid | qty\nV9 | 15\nV9 | 35\nV4 | 9\nV8 | 60\n\nSELECT SUM(qty) FROM box HAVING SUM(qty) >= 100; What if >= 200?",
          code: "SELECT SUM(qty) AS tot\nFROM box\nHAVING SUM(qty) >= 100;",
          language: "sql",
          steps: [
            {
              do: "No WHERE. All four rows enter.",
              why: "FROM then WHERE (none).",
            },
            {
              do: "No GROUP BY → one invisible bag holds every row.",
              why: "The whole table is one group.",
            },
            {
              do: "SUM = 15+35+9+60 = 119.",
              why: "Add the bag.",
            },
            {
              do: "HAVING 119 >= 100 is true → one result row 119.",
              why: "HAVING keeps or drops that single bag.",
            },
            {
              do: "HAVING SUM(qty) >= 200 is false → empty result, not a NULL row.",
              why: "A failed bag-check deletes the group.",
            },
            {
              do: "WHERE SUM(qty) >= 100 is still illegal.",
              why: "Recite: WHERE before groups. Aggregates are late.",
            },
            {
              do: "Per-box totals would need GROUP BY id (V9=50, V4=9, V8=60 — nobody has 100).",
              why: "Missing GROUP BY asked a different question: grand total.",
            },
          ],
          result: "Legal. One row 119. HAVING >= 200 returns no rows.",
        },
      ],
    },
    {
      heading: "Aggregates: COUNT(*) vs COUNT(col) and NULL",
      body: "In simple words, COUNT(*) counts paper rows, even rows with holes. COUNT(col) counts how many times that column is not NULL. SUM and AVG also skip NULLs. AVG divides by the known numbers, not by COUNT(*).\n\nNULL is “unknown”, not zero. If every qty is NULL, SUM is NULL and COUNT(qty) is 0, but COUNT(*) is still the row count. Zero is a real number and it does count.",
      howTo: [
        "Draw the column. Cross out NULLs for COUNT(col), SUM, AVG.",
        "Keep those rows for COUNT(*).",
        "AVG = (sum of known numbers) / (how many known numbers).",
        "All-NULL group: SUM is NULL, COUNT(col) is 0, the group still exists.",
        "0 is not NULL. Count the zero.",
      ],
      bullets: [
        "COUNT(*) = rows. COUNT(col) skips NULL.",
        "COUNT(DISTINCT col) skips NULL, then unique.",
        "SUM/AVG skip NULL. AVG’s divisor is COUNT(col).",
        "All NULL → SUM/AVG are NULL, not 0.",
        "Zero is filled. NULL is a hole.",
      ],
      examples: [
        {
          title: "Five scores, two holes",
          prompt:
            "Mark\nname | score\nPia  | 10\nDev  | NULL\nNia  | 10\nAmy  | NULL\nRaj  | 30\n\nCOUNT(*), COUNT(score), COUNT(DISTINCT score), SUM(score), AVG(score).",
          code: "SELECT COUNT(*), COUNT(score), COUNT(DISTINCT score),\n       SUM(score), AVG(score)\nFROM mark;",
          language: "sql",
          steps: [
            {
              do: "Five paper rows → COUNT(*) = 5.",
              why: "Star counts rows, holes included.",
            },
            {
              do: "Tick Pia 10 — filled. Tick Dev NULL — skip for COUNT(score).",
              why: "COUNT(col) wants a known cell.",
            },
            {
              do: "Tick Nia 10 — filled. Tick Amy NULL — skip. Tick Raj 30 — filled.",
              why: "Filled boxes: 10, 10, 30 → COUNT(score) = 3.",
            },
            {
              do: "Distinct known scores {10, 30} → COUNT(DISTINCT score) = 2.",
              why: "NULL is not a score name. Copies of 10 collapse.",
            },
            {
              do: "SUM = 10+10+30 = 50. AVG = 50/3, not 50/5.",
              why: "AVG’s divisor is the known count, not COUNT(*).",
            },
            {
              do: "Do not treat the two NULLs as 0 unless the English said COALESCE.",
              why: "Unknown is not zero.",
            },
            {
              do: "Write 5, 3, 2, 50, 50/3.",
              why: "Five numbers, five rules.",
            },
          ],
          result: "5, 3, 2, 50, 50/3.",
        },
        {
          title: "GROUP BY city with mixed NULL",
          prompt:
            "Stop\ncity | fee\nMum  | 10\nMum  | NULL\nPune | NULL\nPune | NULL\n\nSELECT city, COUNT(*), COUNT(fee), SUM(fee) GROUP BY city;",
          code: "SELECT city, COUNT(*) AS n, COUNT(fee) AS nq, SUM(fee) AS s\nFROM stop\nGROUP BY city;",
          language: "sql",
          steps: [
            {
              do: "Bag Mum: two rows (10 and NULL).",
              why: "GROUP BY city.",
            },
            {
              do: "Mum COUNT(*) = 2. COUNT(fee) = 1. SUM = 10.",
              why: "One filled fee. Star still counts the hole row.",
            },
            {
              do: "Bag Pune: two rows, both NULL.",
              why: "The bag exists because two rows made it.",
            },
            {
              do: "Pune COUNT(*) = 2. COUNT(fee) = 0. SUM = NULL (not 0).",
              why: "SUM of no known numbers is unknown.",
            },
            {
              do: "HAVING SUM(fee) > 0 would drop Pune, because NULL > 0 is not true.",
              why: "Unknown fails a test.",
            },
            {
              do: "HAVING COUNT(fee) = 0 would keep Pune.",
              why: "That test looks at filled boxes, and Pune has none.",
            },
            {
              do: "COALESCE(SUM(fee), 0) would print 0 for Pune if a report wanted a zero.",
              why: "That is an extra wrapper, not default SUM.",
            },
          ],
          result: "Mum → (2, 1, 10). Pune → (2, 0, NULL).",
        },
        {
          title: "Zero is not NULL in AVG",
          prompt:
            "Fee\nkid | fee\nPia | 5\nDev | 0\nNia | NULL\nAmy | 15\n\nCOUNT(*), COUNT(fee), SUM(fee), AVG(fee). What if you wrongly treat NULL as 0?",
          code: "SELECT COUNT(*), COUNT(fee), SUM(fee), AVG(fee)\nFROM fee;",
          language: "sql",
          steps: [
            {
              do: "Four rows → COUNT(*) = 4.",
              why: "Star counts paper rows.",
            },
            {
              do: "Tick Pia 5 — filled. Tick Dev 0 — filled (zero is a fact).",
              why: "0 is not a hole.",
            },
            {
              do: "Tick Nia NULL — skip for COUNT(fee). Tick Amy 15 — filled.",
              why: "COUNT(fee) = 3.",
            },
            {
              do: "SUM skips NULL, keeps 0: 5+0+15 = 20.",
              why: "Zero rupees add nothing, but they are known.",
            },
            {
              do: "AVG = 20/3, not 20/4.",
              why: "Divisor is COUNT(fee).",
            },
            {
              do: "Treat-missing-as-0 would be SUM(COALESCE(fee,0))/COUNT(*) = 20/4 = 5.",
              why: "Different English, different formula.",
            },
            {
              do: "All-NULL column: SUM NULL, COUNT(fee) 0, COUNT(*) still 4.",
              why: "SUM of no known numbers is unknown unless you COALESCE.",
            },
          ],
          result: "4, 3, 20, 20/3. Treating NULL as 0 would be 5, which is not default AVG.",
        },
        {
          title: "COUNT(DISTINCT city) skips NULL then unique",
          prompt:
            "Stop\ncity\nHyd\nHyd\nNULL\nNagpur\nHyd\n\nCOUNT(*), COUNT(city), COUNT(DISTINCT city).",
          code: "SELECT COUNT(*), COUNT(city), COUNT(DISTINCT city)\nFROM stop;",
          language: "sql",
          steps: [
            {
              do: "Five rows → COUNT(*) = 5.",
              why: "Star ignores holes and copies.",
            },
            {
              do: "Tick Hyd, Hyd — both filled. Tick NULL — skip for COUNT(city).",
              why: "Holes drop out of COUNT(col).",
            },
            {
              do: "Tick Nagpur — filled. Tick Hyd — filled. COUNT(city) = 4.",
              why: "Copies still count for COUNT(city).",
            },
            {
              do: "COUNT(DISTINCT city): skip NULL, then unique {Hyd, Nagpur} → 2.",
              why: "DISTINCT is after the NULL skip.",
            },
            {
              do: "Two NULL cities would still add 0 to COUNT(DISTINCT city), not 1.",
              why: "NULL is not a city name in this count.",
            },
            {
              do: "If they wanted “labels including unknown”, that is not COUNT(DISTINCT city).",
              why: "Read the English.",
            },
            {
              do: "Write 5, 4, 2.",
              why: "Rows, filled, unique filled.",
            },
          ],
          result: "5, 4, 2. DISTINCT cities are Hyd and Nagpur.",
        },
        {
          title: "CASE lets you SUM two sides in one row",
          prompt:
            "Trade\nside | qty\nB    | 10\nS    | 4\nB    | 6\nS    | NULL\n\nOne row: buy_qty, sell_qty, all_qty.",
          code: "SELECT\n  SUM(CASE WHEN side = 'B' THEN qty END) AS buy_qty,\n  SUM(CASE WHEN side = 'S' THEN qty END) AS sell_qty,\n  SUM(qty) AS all_qty\nFROM trade;",
          language: "sql",
          steps: [
            {
              do: "Buy CASE: Pia-side B 10 keep, S 4 becomes NULL, B 6 keep, S NULL stays NULL.",
              why: "CASE turns the other side into NULL. SUM skips NULL.",
            },
            {
              do: "buy_qty = 10+6 = 16.",
              why: "Only B qtys.",
            },
            {
              do: "Sell CASE: 4, and the NULL sell is skipped → sell_qty = 4.",
              why: "NULL qty is not 0.",
            },
            {
              do: "SUM(qty) = 10+4+6 = 20 (NULL skipped).",
              why: "all_qty ignores the hole, not the sell rows.",
            },
            {
              do: "You cannot WHERE side = 'B' and still get sell_qty in the same row.",
              why: "WHERE would throw sell rows away before SUM.",
            },
            {
              do: "COUNT(CASE WHEN side = 'B' THEN 1 END) counts buy rows even if qty is NULL.",
              why: "THEN 1 looks at the row. THEN qty looks at the number.",
            },
            {
              do: "One result row: 16, 4, 20.",
              why: "No GROUP BY → one bag, the whole table.",
            },
          ],
          result: "One row: buy_qty = 16, sell_qty = 4, all_qty = 20.",
        },
      ],
    },
    {
      heading: "VIEW — a saved query, a virtual table",
      body: "In simple words, a VIEW is a saved SELECT with a name. It looks like a table when you read it, but the rows are not copied. Each time you SELECT from the view, the engine runs the saved query again.\n\nCreate it with CREATE VIEW name AS SELECT …. Dropping the view does not drop the real table. Teachers use views for a short window (only class B) and for security (hide a phone column by not selecting it).",
      howTo: [
        "Write the SELECT you wish you could type every time.",
        "Wrap it: CREATE VIEW v AS SELECT … .",
        "Read with SELECT … FROM v. Tick the base table, then apply the saved filter.",
        "Ask: did the base table change? Then the view’s next read changes too.",
        "DROP VIEW removes the window, not the base table.",
      ],
      bullets: [
        "VIEW = named SELECT. Virtual table, not a second copy.",
        "CREATE VIEW v AS SELECT … FROM base …;",
        "SELECT from v re-runs the query.",
        "DROP VIEW keeps the base table.",
        "Security: grant the view, hide columns you did not SELECT.",
        "GROUP BY views are usually not updatable.",
      ],
      examples: [
        {
          title: "CREATE VIEW is a saved SELECT",
          prompt:
            "Kid\nid | name | class | age\n1  | Pia  | B     | 10\n2  | Dev  | A     | 9\n3  | Nia  | B     | 10\n\nCREATE VIEW v_b AS SELECT name, age FROM kid WHERE class = 'B';",
          code: "CREATE VIEW v_b AS\nSELECT name, age FROM kid\nWHERE class = 'B';",
          language: "sql",
          steps: [
            {
              do: "The view stores the query, not a photocopy of Pia and Nia.",
              why: "Virtual means “run me later”.",
            },
            {
              do: "Base Kid still has three rows including Dev.",
              why: "CREATE VIEW does not DELETE the other class.",
            },
            {
              do: "The view’s heading is name, age — class was used in WHERE, not printed.",
              why: "The SELECT list is the window’s columns.",
            },
            {
              do: "No rows are “inside” v_b until someone reads it.",
              why: "It is a recipe, not a lunchbox.",
            },
            {
              do: "You now have two names: kid (base) and v_b (window).",
              why: "Both can appear in FROM.",
            },
            {
              do: "If CREATE VIEW fails because v_b exists, DROP VIEW first or use OR REPLACE where allowed.",
              why: "A view name is unique in the schema.",
            },
            {
              do: "This is DDL for the view object, not INSERT.",
              why: "You created a window, not a row.",
            },
          ],
          result: "v_b is a named query on class B. Kid still has 3 rows.",
        },
        {
          title: "SELECT from the view — tick the base",
          prompt:
            "Same Kid as above, view v_b = class B names and ages.\nSELECT * FROM v_b;",
          code: "SELECT * FROM v_b;",
          language: "sql",
          steps: [
            {
              do: "The engine runs the saved SELECT on Kid.",
              why: "Reading a view = running its query.",
            },
            {
              do: "Tick Pia class B → keep (Pia, 10).",
              why: "WHERE class = 'B'.",
            },
            {
              do: "Tick Dev class A → drop.",
              why: "He is not in the window.",
            },
            {
              do: "Tick Nia class B → keep (Nia, 10).",
              why: "Same filter.",
            },
            {
              do: "Star on v_b means the view columns: name, age. Not id.",
              why: "The window’s heading, not Kid’s full heading.",
            },
            {
              do: "Two result rows.",
              why: "Two B kids.",
            },
            {
              do: "Kid is unchanged.",
              why: "SELECT is still Read.",
            },
          ],
          result: "(Pia, 10) and (Nia, 10). Dev is hidden by the view.",
        },
        {
          title: "Base INSERT shows up in the view",
          prompt:
            "After v_b exists, run INSERT INTO kid VALUES (4, 'Amy', 'B', 8);\nThen SELECT name FROM v_b;",
          code: "INSERT INTO kid VALUES (4, 'Amy', 'B', 8);\nSELECT name FROM v_b;",
          language: "sql",
          steps: [
            {
              do: "INSERT writes the base table Kid. Amy is a new base row.",
              why: "The view is not a copy, so we add to Kid.",
            },
            {
              do: "Next read of v_b re-runs WHERE class = 'B'.",
              why: "Virtual: always fresh.",
            },
            {
              do: "Tick Pia B — still in.",
              why: "Old row still matches.",
            },
            {
              do: "Tick Dev A — still out.",
              why: "Filter unchanged.",
            },
            {
              do: "Tick Nia B — still in.",
              why: "Same.",
            },
            {
              do: "Tick Amy B — now in.",
              why: "New base row matches the saved WHERE.",
            },
            {
              do: "If Amy had been class A, the view would still hide her.",
              why: "The window did not get a private extra row.",
            },
          ],
          result: "Pia, Nia, Amy. The view picked up the new B kid.",
        },
        {
          title: "DROP VIEW keeps the table",
          prompt:
            "Kid has 4 rows. View v_b exists.\nDROP VIEW v_b; then SELECT COUNT(*) FROM kid;",
          code: "DROP VIEW v_b;\nSELECT COUNT(*) FROM kid;",
          language: "sql",
          steps: [
            {
              do: "DROP VIEW removes the named query v_b.",
              why: "The window is gone.",
            },
            {
              do: "SELECT from v_b now errors (unknown table/view).",
              why: "The name is no longer there.",
            },
            {
              do: "Kid still has its rows. COUNT(*) is still 4.",
              why: "VIEW gone ≠ table gone.",
            },
            {
              do: "DROP TABLE kid would remove the grid and usually break the view first, or CASCADE.",
              why: "That is a different DROP.",
            },
            {
              do: "You can CREATE VIEW v_b again with the same SELECT.",
              why: "The recipe can be rewritten.",
            },
            {
              do: "Indexes and grants on Kid stay.",
              why: "We only dropped the window object.",
            },
            {
              do: "Security windows vanish with DROP VIEW — users who only had the view lose that read.",
              why: "The view was the door you gave them.",
            },
          ],
          result: "v_b is gone. Kid still has 4 rows.",
        },
        {
          title: "Security: hide the phone column",
          prompt:
            "Staff\nid | name | phone\n1  | Pia  | 111\n2  | Dev  | 222\n\nCREATE VIEW v_public AS SELECT id, name FROM staff;\nA helper may SELECT from v_public, not from staff. What can they see?",
          code: "CREATE VIEW v_public AS\nSELECT id, name FROM staff;",
          language: "sql",
          steps: [
            {
              do: "The view’s SELECT list has id and name only.",
              why: "Phone is not in the window.",
            },
            {
              do: "Tick Pia: public row is (1, Pia). Phone 111 is not copied out.",
              why: "Unselected columns are hidden.",
            },
            {
              do: "Tick Dev: (2, Dev). Phone 222 hidden.",
              why: "Same window.",
            },
            {
              do: "SELECT * FROM v_public cannot print phone. There is no such column on v_public.",
              why: "Star follows the view heading.",
            },
            {
              do: "SELECT phone FROM staff is blocked if the helper has no grant on staff.",
              why: "Security is: grant the view, not the base.",
            },
            {
              do: "The phones still sit in Staff. A teacher with base rights still sees them.",
              why: "Hiding in a view is not encrypting the base table.",
            },
            {
              do: "This is a common reason to use views: a short, safer shape.",
              why: "Virtual table + column list = privacy window.",
            },
          ],
          result: "Helper sees (1, Pia) and (2, Dev). Phones stay off the view.",
        },
      ],
    },
    {
      heading: "INNER JOIN — only matching rows",
      body: "In simple words, INNER JOIN keeps a pair only when both sides match the ON rule. No partner, no row. If Pia matches two courses, Pia appears twice. If Nia matches zero courses, Nia vanishes.\n\nWalk the left table. For each left row, scan the right table. Emit one result per handshake. Count pairs, not parents.",
      howTo: [
        "Draw Student and Course as two tiny grids.",
        "Pick a Student row. Scan Course for the same sid.",
        "Each match prints one pair. Zero matches → print nothing for that student.",
        "Then check unused Course rows: they also vanish on INNER JOIN.",
        "Count result rows = number of handshakes.",
      ],
      bullets: [
        "INNER JOIN = matching pairs only.",
        "k matches → k copies of that student.",
        "0 matches → that student is gone.",
        "Unused course rows are gone too.",
        "ON and WHERE agree for inner joins.",
      ],
      examples: [
        {
          title: "Walk Student ⋈ Course",
          prompt:
            "Student\nsid | sname\n1   | Pia\n2   | Dev\n3   | Nia\n\nCourse\ncname | sid\nMaths | 1\nArt   | 1\nMaths | 2\nChess | 9\n\nFROM student s INNER JOIN course c ON s.sid = c.sid",
          code: "SELECT s.sname, c.cname\nFROM student s\nINNER JOIN course c ON s.sid = c.sid;",
          language: "sql",
          steps: [
            {
              do: "Start with Pia sid 1. Scan Course for sid 1.",
              why: "Inner join is a handshake on sid.",
            },
            {
              do: "Course Maths|1 matches → print (Pia, Maths).",
              why: "One pair, one result row.",
            },
            {
              do: "Course Art|1 matches → print (Pia, Art).",
              why: "Two matches → Pia appears twice. That is fan-out, not a bug.",
            },
            {
              do: "Dev sid 2. Course Maths|2 matches → print (Dev, Maths).",
              why: "One handshake.",
            },
            {
              do: "Nia sid 3. No course with sid 3 → print nothing for Nia.",
              why: "Zero matches → gone.",
            },
            {
              do: "Course Chess|9 has no student 9 → Chess is gone.",
              why: "Inner join drops both lonely sides.",
            },
            {
              do: "Three result rows, not 3 students and not 4 courses.",
              why: "Count pairs.",
            },
          ],
          result: "(Pia, Maths), (Pia, Art), (Dev, Maths). Nia and Chess disappear.",
        },
        {
          title: "Fan-out: one student, two courses",
          prompt:
            "Student\nsid | sname\n1   | Pia\n2   | Dev\n\nCourse\ncname | sid\nMaths | 1\nArt   | 1\nPE    | 1\nMaths | 2\n\nHow many rows for Pia? For Dev?",
          code: "SELECT s.sname, c.cname\nFROM student s\nINNER JOIN course c ON s.sid = c.sid;",
          language: "sql",
          steps: [
            {
              do: "Pia sid 1. Tick Course Maths|1 → (Pia, Maths).",
              why: "First handshake.",
            },
            {
              do: "Tick Art|1 → (Pia, Art).",
              why: "Second handshake.",
            },
            {
              do: "Tick PE|1 → (Pia, PE).",
              why: "Third handshake. k = 3 copies of Pia.",
            },
            {
              do: "Dev sid 2. Tick Maths|2 → (Dev, Maths).",
              why: "k = 1.",
            },
            {
              do: "No leftover courses. No leftover students.",
              why: "Everyone found at least one partner.",
            },
            {
              do: "Four result rows.",
              why: "3 + 1 pairs.",
            },
            {
              do: "SELECT DISTINCT sname would print Pia and Dev once — a different question.",
              why: "Join lists pairs. DISTINCT names people.",
            },
          ],
          result: "(Pia, Maths), (Pia, Art), (Pia, PE), (Dev, Maths). Four rows.",
        },
        {
          title: "Nia has no course — she vanishes",
          prompt:
            "Student\nsid | sname\n1   | Pia\n3   | Nia\n\nCourse\ncname | sid\nMaths | 1\n\nINNER JOIN on sid. Who prints?",
          code: "SELECT s.sname, c.cname\nFROM student s\nINNER JOIN course c ON s.sid = c.sid;",
          language: "sql",
          steps: [
            {
              do: "Pia sid 1 matches Maths|1 → (Pia, Maths).",
              why: "Handshake.",
            },
            {
              do: "Nia sid 3: scan Course. No sid 3.",
              why: "Empty match list.",
            },
            {
              do: "Emit nothing for Nia.",
              why: "Inner join does not invent a course.",
            },
            {
              do: "Do not print (Nia, NULL). That is LEFT JOIN.",
              why: "Wrong join word.",
            },
            {
              do: "One result row.",
              why: "One pair.",
            },
            {
              do: "Student still has Nia if you SELECT from student alone.",
              why: "The join result is a new grid, not a DELETE.",
            },
            {
              do: "Need Nia with a blank course? Use LEFT JOIN from Student.",
              why: "Next heading.",
            },
          ],
          result: "Only (Pia, Maths). Nia vanishes on INNER JOIN.",
        },
        {
          title: "Orphan course Chess vanishes",
          prompt:
            "Student\nsid | sname\n1   | Pia\n\nCourse\ncname | sid\nMaths | 1\nChess | 9\n\nINNER JOIN on sid.",
          code: "SELECT s.sname, c.cname\nFROM student s\nINNER JOIN course c ON s.sid = c.sid;",
          language: "sql",
          steps: [
            {
              do: "Pia sid 1 matches Maths|1 → (Pia, Maths).",
              why: "Handshake.",
            },
            {
              do: "Chess sid 9: is there a Student 9? No.",
              why: "Right side lonely.",
            },
            {
              do: "Drop Chess.",
              why: "Inner join drops unused right rows.",
            },
            {
              do: "Do not print (NULL, Chess). That is RIGHT JOIN.",
              why: "Wrong join word.",
            },
            {
              do: "One result row.",
              why: "One pair.",
            },
            {
              do: "FROM course INNER JOIN student would still drop Chess.",
              why: "Inner is symmetric on matches. Table order does not save orphans.",
            },
            {
              do: "Need Chess with a blank student? RIGHT JOIN or FULL JOIN.",
              why: "Later headings.",
            },
          ],
          result: "Only (Pia, Maths). Chess disappears.",
        },
        {
          title: "Empty Course wipes the inner join",
          prompt:
            "Student has 3 rows (Pia, Dev, Nia). Course has 0 rows.\nSELECT sname FROM student s INNER JOIN course c ON s.sid = c.sid;",
          code: "SELECT s.sname\nFROM student s\nINNER JOIN course c ON s.sid = c.sid;",
          language: "sql",
          steps: [
            {
              do: "Pia looks for a course. Course is empty → no handshake.",
              why: "Zero matches.",
            },
            {
              do: "Dev: same, no handshake.",
              why: "Empty right table.",
            },
            {
              do: "Nia: same.",
              why: "Every left row fails.",
            },
            {
              do: "Result has 0 rows, not 3.",
              why: "Do not say “keep the students”. That is LEFT JOIN.",
            },
            {
              do: "CROSS JOIN of 3 × 0 is also 0.",
              why: "Empty operand wipes a product too.",
            },
            {
              do: "INNER JOIN ON TRUE with empty Course is still empty.",
              why: "TRUE does not invent right rows.",
            },
            {
              do: "LEFT JOIN FROM student would keep 3 padded rows.",
              why: "Different join. Next block.",
            },
          ],
          result: "0 rows. Empty Course wipes INNER JOIN.",
        },
      ],
    },
    {
      heading: "LEFT JOIN — all left + NULL pad",
      body: "In simple words, LEFT JOIN keeps every left row. Matches still look like inner join. A lonely left row gets NULLs on the right, like an empty seat. Right-only rows (Chess with no student) still vanish.\n\nWalk each left student in order. If she has courses, print those pairs. If she has none, print her name once with NULL course. Do not also add unused right rows.",
      howTo: [
        "Same two tables. Left table is the one after FROM (Student).",
        "Walk each Student row.",
        "If matches exist, print every match (fan-out).",
        "If no match, print the student once with cname NULL.",
        "Do not keep Course rows whose sid is missing on the left.",
      ],
      bullets: [
        "LEFT JOIN: all left rows + NULL pads.",
        "Right orphans are still gone.",
        "WHERE on a right column after LEFT JOIN throws pads away (inner in disguise).",
        "Put extra right filters in ON if you still want the pad.",
        "COUNT(cname) skips pads; COUNT(*) counts pads.",
      ],
      examples: [
        {
          title: "Walk each student — Nia gets NULL",
          prompt:
            "Student\nsid | sname\n1   | Pia\n2   | Dev\n3   | Nia\n\nCourse\ncname | sid\nMaths | 1\nArt   | 1\nMaths | 2\nChess | 9\n\nFROM student s LEFT JOIN course c ON s.sid = c.sid",
          code: "SELECT s.sname, c.cname\nFROM student s\nLEFT JOIN course c ON s.sid = c.sid;",
          language: "sql",
          steps: [
            {
              do: "Pia sid 1: two matches → (Pia, Maths), (Pia, Art).",
              why: "Matches look like inner join.",
            },
            {
              do: "Dev sid 2: one match → (Dev, Maths).",
              why: "Handshake.",
            },
            {
              do: "Nia sid 3: zero matches → (Nia, NULL).",
              why: "Left join keeps the left and pads the right.",
            },
            {
              do: "Chess sid 9 is not a left row. Drop Chess.",
              why: "LEFT JOIN does not keep right orphans.",
            },
            {
              do: "Four result rows (three inner pairs + one pad).",
              why: "Do not duplicate Pia when you add Nia’s pad.",
            },
            {
              do: "Nia’s pad is one row, not one row per course.",
              why: "Zero matches → exactly one padded row.",
            },
            {
              do: "Student is the preserved side because it was written first.",
              why: "LEFT means the FROM table.",
            },
          ],
          result: "(Pia, Maths), (Pia, Art), (Dev, Maths), (Nia, NULL). Chess is not here.",
        },
        {
          title: "Swap the FROM table, swap who is kept",
          prompt:
            "Same tables. FROM course c LEFT JOIN student s ON c.sid = s.sid. What happens to Nia and Chess?",
          code: "SELECT s.sname, c.cname\nFROM course c\nLEFT JOIN student s ON c.sid = s.sid;",
          language: "sql",
          steps: [
            {
              do: "Left is now Course. Walk Maths|1 → (Pia, Maths).",
              why: "sid 1 finds Pia.",
            },
            {
              do: "Walk Art|1 → (Pia, Art).",
              why: "Handshake.",
            },
            {
              do: "Walk Maths|2 → (Dev, Maths).",
              why: "Handshake.",
            },
            {
              do: "Walk Chess|9: no student 9 → (NULL, Chess).",
              why: "Pad the student side. Chess is preserved.",
            },
            {
              do: "Nia is not on the left. Drop Nia.",
              why: "She is a left-orphan of the other join direction.",
            },
            {
              do: "Four rows again, but the pad is Chess, not Nia.",
              why: "Preserved side flipped.",
            },
            {
              do: "This is the same shape as Student RIGHT JOIN Course on the original FROM order.",
              why: "RIGHT JOIN is LEFT JOIN with tables swapped.",
            },
          ],
          result: "(Pia, Maths), (Pia, Art), (Dev, Maths), (NULL, Chess). Nia is gone.",
        },
        {
          title: "WHERE after LEFT JOIN wipes Nia’s pad",
          prompt:
            "FROM student LEFT JOIN course, then WHERE c.cname = 'Maths'. Same tables as the first LEFT JOIN example.",
          code: "SELECT s.sname, c.cname\nFROM student s\nLEFT JOIN course c ON s.sid = c.sid\nWHERE c.cname = 'Maths';",
          language: "sql",
          steps: [
            {
              do: "After the LEFT JOIN, Nia has cname NULL. Pia has Maths and Art. Dev has Maths. Chess is already gone.",
              why: "Pads use NULL for every course column.",
            },
            {
              do: "WHERE cname = 'Maths'. Tick (Pia, Maths) → keep.",
              why: "True.",
            },
            {
              do: "Tick (Pia, Art) → drop.",
              why: "Art is not Maths.",
            },
            {
              do: "Tick (Dev, Maths) → keep.",
              why: "True.",
            },
            {
              do: "Tick (Nia, NULL): NULL = 'Maths' is unknown → drop Nia.",
              why: "WHERE does not keep empty seats.",
            },
            {
              do: "You just computed an inner join on Maths.",
              why: "A WHERE on a right column throws pads away.",
            },
            {
              do: "To keep Nia while only matching Maths courses, put cname = 'Maths' in ON, not WHERE.",
              why: "ON decides matching. Failed match still pads the left row.",
            },
          ],
          result: "(Pia, Maths) and (Dev, Maths). Nia’s pad died in WHERE.",
        },
        {
          title: "Filter in ON to keep the pad",
          prompt:
            "FROM student s LEFT JOIN course c ON s.sid = c.sid AND c.cname = 'Maths'. Same four course rows.",
          code: "SELECT s.sname, c.cname\nFROM student s\nLEFT JOIN course c\n  ON s.sid = c.sid AND c.cname = 'Maths';",
          language: "sql",
          steps: [
            {
              do: "ON is the match rule. Pia sid 1 matches Maths|1 only. Art is not a match.",
              why: "Extra ON predicates do not delete Pia.",
            },
            {
              do: "Print (Pia, Maths). Do not print (Pia, Art).",
              why: "Art failed the ON filter, so it is not paired.",
            },
            {
              do: "Dev matches Maths|2 → (Dev, Maths).",
              why: "Handshake.",
            },
            {
              do: "Nia still has no Maths row → (Nia, NULL).",
              why: "Left join preserves Nia.",
            },
            {
              do: "Chess is still a right orphan → gone.",
              why: "LEFT JOIN.",
            },
            {
              do: "If this ON filter had been WHERE, Nia would vanish.",
              why: "That was the previous example.",
            },
            {
              do: "Three rows: Pia Maths, Dev Maths, Nia NULL.",
              why: "Pads kept, Art hidden.",
            },
          ],
          result: "(Pia, Maths), (Dev, Maths), (Nia, NULL). Filter Maths in ON.",
        },
        {
          title: "COUNT(cname) gives zeros; COUNT(*) does not",
          prompt:
            "Student Pia, Dev, Nia. Course: Pia Maths, Pia Art, Dev Maths. No course for Nia.\nSELECT sname, COUNT(c.cname), COUNT(*) FROM student s LEFT JOIN course c ON s.sid = c.sid GROUP BY sname;",
          code: "SELECT s.sname, COUNT(c.cname) AS n_course, COUNT(*) AS n_rows\nFROM student s\nLEFT JOIN course c ON s.sid = c.sid\nGROUP BY s.sname;",
          language: "sql",
          steps: [
            {
              do: "Pia’s bag: two real course names. COUNT(cname)=2. COUNT(*)=2.",
              why: "No pad in her bag.",
            },
            {
              do: "Dev’s bag: one Maths. COUNT(cname)=1. COUNT(*)=1.",
              why: "One pair.",
            },
            {
              do: "Nia’s bag: one padded row, cname NULL.",
              why: "LEFT JOIN built the empty seat.",
            },
            {
              do: "Nia COUNT(cname)=0 because COUNT skips NULL.",
              why: "That is the zero we wanted: zero courses.",
            },
            {
              do: "Nia COUNT(*)=1 — wrongly looks like “one course”.",
              why: "Star counts the pad row.",
            },
            {
              do: "INNER JOIN would hide Nia, so you would never see the zero.",
              why: "Zeros need the pad, then COUNT of the right column.",
            },
            {
              do: "Report n_course, not n_rows, for “how many courses”.",
              why: "Exam slogan.",
            },
          ],
          result: "Pia 2, Dev 1, Nia 0. Must LEFT JOIN and COUNT(cname).",
        },
      ],
    },
    {
      heading: "RIGHT JOIN and FULL JOIN",
      body: "In simple words, RIGHT JOIN keeps every right row and NULL-pads the left when there is no match. It is LEFT JOIN with the tables swapped. FULL JOIN keeps both lonely sides: left pads plus extra right rows.\n\nMySQL often has no FULL JOIN word. Write LEFT JOIN UNION RIGHT JOIN (UNION drops the duplicate matches). Walk matches first, then add each unused left row, then each unused right row. Never duplicate a match.",
      howTo: [
        "Write the inner matches first.",
        "RIGHT JOIN: add one pad per unused right row. Drop unused left rows.",
        "FULL JOIN: add unused left pads and unused right pads.",
        "MySQL full: (left join) UNION (right join).",
        "WHERE on either side’s key after FULL/outer throws pads away.",
      ],
      bullets: [
        "RIGHT JOIN = all right + NULL pad on the left.",
        "RIGHT JOIN = LEFT JOIN with FROM tables swapped.",
        "FULL JOIN = matches + left orphans + right orphans.",
        "MySQL: UNION of left join and right join.",
        "Do not duplicate matched rows when adding pads.",
      ],
      examples: [
        {
          title: "RIGHT JOIN keeps Chess, drops Nia",
          prompt:
            "Student\nsid | sname\n1   | Pia\n2   | Dev\n3   | Nia\n\nCourse\ncname | sid\nMaths | 1\nArt   | 1\nMaths | 2\nChess | 9\n\nFROM student s RIGHT JOIN course c ON s.sid = c.sid",
          code: "SELECT s.sname, c.cname\nFROM student s\nRIGHT JOIN course c ON s.sid = c.sid;",
          language: "sql",
          steps: [
            {
              do: "Matches first: (Pia, Maths), (Pia, Art), (Dev, Maths).",
              why: "Same handshakes as inner join.",
            },
            {
              do: "Right table is Course. Unused right row: Chess|9.",
              why: "No student 9.",
            },
            {
              do: "Add (NULL, Chess).",
              why: "RIGHT JOIN pads the left.",
            },
            {
              do: "Nia is unused left. Drop Nia.",
              why: "Right join does not keep left orphans.",
            },
            {
              do: "Four rows. Do not add a second (Pia, Maths).",
              why: "Pads are only for unused keys.",
            },
            {
              do: "Walk Course, not Student, if that is easier: each course row must appear.",
              why: "Preserved side is Course.",
            },
            {
              do: "Same result as FROM course LEFT JOIN student.",
              why: "Swap trick.",
            },
          ],
          result: "(Pia, Maths), (Pia, Art), (Dev, Maths), (NULL, Chess). Nia is gone.",
        },
        {
          title: "RIGHT JOIN is swapped LEFT JOIN",
          prompt:
            "Tiny pair:\nL\nid\n1\n2\nR\nid\n2\n3\n\nFROM L RIGHT JOIN R ON L.id = R.id  vs  FROM R LEFT JOIN L ON R.id = L.id.",
          code: "SELECT L.id AS l, R.id AS r\nFROM L RIGHT JOIN R ON L.id = R.id;",
          language: "sql",
          steps: [
            {
              do: "Match: id 2 pairs → (2, 2).",
              why: "Handshake.",
            },
            {
              do: "Right id 3 unused → (NULL, 3).",
              why: "RIGHT JOIN pad.",
            },
            {
              do: "Left id 1 unused → drop.",
              why: "Not preserved.",
            },
            {
              do: "FROM R LEFT JOIN L: walk R’s 2 → (2, 2). Walk R’s 3 → (NULL, 3).",
              why: "Same two rows.",
            },
            {
              do: "Left’s 1 still dropped on that LEFT JOIN, because L is now the right table.",
              why: "Preserved side is whoever is LEFT in that spelling.",
            },
            {
              do: "Exam: rewrite RIGHT JOIN as LEFT JOIN by swapping FROM tables.",
              why: "Many people remember only LEFT JOIN.",
            },
            {
              do: "Result of both spellings: (2, 2) and (NULL, 3).",
              why: "Same bags.",
            },
          ],
          result: "(2, 2) and (NULL, 3). Swapped LEFT JOIN matches RIGHT JOIN.",
        },
        {
          title: "FULL JOIN keeps Nia and Chess",
          prompt:
            "Same Student and Course as the first join examples (Pia, Dev, Nia / Maths, Art, Maths, Chess).\nFULL OUTER JOIN on sid.",
          code: "SELECT s.sname, c.cname\nFROM student s\nFULL OUTER JOIN course c ON s.sid = c.sid;",
          language: "sql",
          steps: [
            {
              do: "Matches: (Pia, Maths), (Pia, Art), (Dev, Maths).",
              why: "Inner part first.",
            },
            {
              do: "Unused left: Nia → add (Nia, NULL).",
              why: "FULL keeps left orphans.",
            },
            {
              do: "Unused right: Chess → add (NULL, Chess).",
              why: "FULL keeps right orphans.",
            },
            {
              do: "Do not add a second Pia Maths.",
              why: "Matched keys already have rows.",
            },
            {
              do: "Five result rows.",
              why: "3 matches + 1 left pad + 1 right pad.",
            },
            {
              do: "INNER would be 3 rows. LEFT from Student would drop Chess. RIGHT from Student would drop Nia.",
              why: "The join word is which orphans you keep.",
            },
            {
              do: "WHERE c.cname IS NOT NULL after FULL throws Nia away — no longer full.",
              why: "WHERE on the other side’s column kills pads.",
            },
          ],
          result: "(Pia, Maths), (Pia, Art), (Dev, Maths), (Nia, NULL), (NULL, Chess).",
        },
        {
          title: "MySQL FULL JOIN via UNION",
          prompt:
            "L ids: 1, 2. R ids: 2, 3. MySQL has no FULL JOIN. Write UNION of left and right joins.",
          code: "SELECT L.id AS l, R.id AS r\nFROM L LEFT JOIN R ON L.id = R.id\nUNION\nSELECT L.id, R.id\nFROM L RIGHT JOIN R ON L.id = R.id;",
          language: "sql",
          steps: [
            {
              do: "Left join: (1, NULL) and (2, 2).",
              why: "Keep L. Pad R for id 1.",
            },
            {
              do: "Right join: (2, 2) and (NULL, 3).",
              why: "Keep R. Pad L for id 3.",
            },
            {
              do: "UNION stacks them, then drops the duplicate (2, 2).",
              why: "Plain UNION is concat + DISTINCT. Matches must not double.",
            },
            {
              do: "Kept: (1, NULL), (2, 2), (NULL, 3).",
              why: "That is FULL JOIN.",
            },
            {
              do: "UNION ALL would keep (2, 2) twice — too many matches.",
              why: "Use UNION, not UNION ALL, for this recipe.",
            },
            {
              do: "Two NULLs in different columns are different rows: (1, NULL) vs (NULL, 3).",
              why: "Do not merge those pads.",
            },
            {
              do: "This UNION trick is the MySQL exam spelling of FULL JOIN.",
              why: "Engine gap, same picture.",
            },
          ],
          result: "(1, NULL), (2, 2), (NULL, 3). UNION, not UNION ALL.",
        },
        {
          title: "WHERE after FULL JOIN is not full any more",
          prompt:
            "FULL JOIN of L{1,2} and R{2,3} gives (1,NULL), (2,2), (NULL,3).\nThen WHERE r IS NOT NULL.",
          code: "SELECT L.id AS l, R.id AS r\nFROM L FULL OUTER JOIN R ON L.id = R.id\nWHERE R.id IS NOT NULL;",
          language: "sql",
          steps: [
            {
              do: "Start from the three FULL rows.",
              why: "WHERE runs after the join in the homework story.",
            },
            {
              do: "Tick (1, NULL): r IS NOT NULL? No → drop id 1.",
              why: "The left pad fails.",
            },
            {
              do: "Tick (2, 2): r is 2 → keep.",
              why: "Match survives.",
            },
            {
              do: "Tick (NULL, 3): r is 3 → keep.",
              why: "Right pad has a real r.",
            },
            {
              do: "Left: (2, 2) and (NULL, 3). That is RIGHT JOIN, not FULL.",
              why: "Filtering the right key kept right orphans and matches only.",
            },
            {
              do: "WHERE l IS NOT NULL would have kept LEFT JOIN’s shape.",
              why: "Each WHERE on a side key throws the other side’s pads away.",
            },
            {
              do: "Need true FULL? Do not WHERE-away the NULLs.",
              why: "Pads are the point of FULL.",
            },
          ],
          result: "(2, 2) and (NULL, 3). WHERE turned FULL into RIGHT-like.",
        },
      ],
    },
    {
      heading: "INSERT and UPDATE (always WHERE on UPDATE)",
      body: "In simple words, INSERT adds new rows. You list columns or follow the table order in VALUES. UPDATE rewrites cells on rows that already exist.\n\nAlways write WHERE on UPDATE, or every row gets the new value. Tick each row: match → change; no match → leave. One UPDATE can set two columns at once. INSERT does not use WHERE.",
      howTo: [
        "INSERT: write the new row. Check unique id is free.",
        "UPDATE: write SET column = value.",
        "Add WHERE that names the row(s). Tick every row against WHERE.",
        "If you forget WHERE, tick every row as changed — that is the trap.",
        "Read back with SELECT to check.",
      ],
      bullets: [
        "INSERT adds rows. No WHERE.",
        "UPDATE changes cells. Always WHERE.",
        "No WHERE on UPDATE → every row changes.",
        "SET a = 1, b = 2 changes two columns on matching rows.",
        "INSERT can list many VALUES rows.",
      ],
      examples: [
        {
          title: "INSERT one row",
          prompt:
            "Kid\nid | name | age\n1  | Pia  | 10\n\nINSERT INTO kid (id, name, age) VALUES (2, 'Dev', 9);",
          code: "INSERT INTO kid (id, name, age)\nVALUES (2, 'Dev', 9);",
          language: "sql",
          steps: [
            {
              do: "Tick old row Pia: still there.",
              why: "INSERT does not rewrite Pia.",
            },
            {
              do: "New row: 2, Dev, 9.",
              why: "VALUES is one new paper row.",
            },
            {
              do: "Column list (id, name, age) matches VALUES order.",
              why: "If you write (name, id) you must swap the values too.",
            },
            {
              do: "Two rows now.",
              why: "Create grew the table.",
            },
            {
              do: "INSERT has no WHERE. You cannot “insert where id = 2” to mean update.",
              why: "Wrong job. Use UPDATE to change.",
            },
            {
              do: "If id 2 already existed, a primary-key INSERT would fail.",
              why: "Keys stay unique.",
            },
            {
              do: "SELECT * shows Pia and Dev.",
              why: "Read to check Create.",
            },
          ],
          result: "Pia 10 and Dev 9. One new row.",
        },
        {
          title: "INSERT two rows at once",
          prompt:
            "Kid starts empty.\nINSERT INTO kid VALUES (1, 'Pia', 10), (2, 'Dev', 9);",
          code: "INSERT INTO kid VALUES (1, 'Pia', 10), (2, 'Dev', 9);",
          language: "sql",
          steps: [
            {
              do: "Empty table: zero ticks yet.",
              why: "Start from the grid you have.",
            },
            {
              do: "First VALUES tuple → row Pia 10.",
              why: "Comma-separated VALUES are many rows.",
            },
            {
              do: "Second tuple → row Dev 9.",
              why: "One INSERT statement, two rows.",
            },
            {
              do: "COUNT(*) = 2.",
              why: "Two creates.",
            },
            {
              do: "This is still not UPDATE. Ages are brand new cells.",
              why: "There were no old ages to rewrite.",
            },
            {
              do: "If the second tuple reused id 1, the statement fails (or only the first row lands, depending on the engine). Exam: unique id.",
              why: "Do not insert two kids with the same roll number.",
            },
            {
              do: "Table: (1, Pia, 10), (2, Dev, 9).",
              why: "Both tuples.",
            },
          ],
          result: "Two rows inserted: Pia 10, Dev 9.",
        },
        {
          title: "UPDATE with WHERE — one age",
          prompt:
            "Kid\nid | name | age\n1  | Pia  | 10\n2  | Dev  | 9\n3  | Nia  | 10\n\nUPDATE kid SET age = 11 WHERE id = 1;",
          code: "UPDATE kid SET age = 11 WHERE id = 1;",
          language: "sql",
          steps: [
            {
              do: "WHERE id = 1. Tick Pia: match → age 10 becomes 11.",
              why: "SET rewrites matching rows.",
            },
            {
              do: "Tick Dev id 2: no match → stay 9.",
              why: "Failed WHERE.",
            },
            {
              do: "Tick Nia id 3: no match → stay 10.",
              why: "Failed WHERE.",
            },
            {
              do: "name column not in SET → names stay.",
              why: "Only listed columns change.",
            },
            {
              do: "One row updated.",
              why: "Count WHERE hits.",
            },
            {
              do: "UPDATE is DML. The heading is the same.",
              why: "Shape did not change.",
            },
            {
              do: "Always glance at WHERE before you run UPDATE.",
              why: "The next example is the accident.",
            },
          ],
          result: "Pia 11, Dev 9, Nia 10.",
        },
        {
          title: "UPDATE without WHERE — every row",
          prompt:
            "Kid\nid | name | age\n1  | Pia  | 10\n2  | Dev  | 9\n3  | Nia  | 10\n\nUPDATE kid SET age = 11;",
          code: "UPDATE kid SET age = 11;",
          language: "sql",
          steps: [
            {
              do: "There is no WHERE. Every row is a match.",
              why: "Missing WHERE means the whole table.",
            },
            {
              do: "Tick Pia: age → 11.",
              why: "All rows get SET.",
            },
            {
              do: "Tick Dev: age 9 → 11.",
              why: "Dev was not “safe”.",
            },
            {
              do: "Tick Nia: age → 11.",
              why: "Three updates.",
            },
            {
              do: "Names unchanged.",
              why: "SET listed only age.",
            },
            {
              do: "This is legal SQL and usually a mistake.",
              why: "Exam trap: always WHERE on UPDATE.",
            },
            {
              do: "In a transaction you might ROLLBACK. Still write WHERE.",
              why: "Do not rely on undo as your filter.",
            },
          ],
          result: "Every age is 11. Pia 11, Dev 11, Nia 11.",
        },
        {
          title: "UPDATE two columns on class B",
          prompt:
            "Kid\nid | name | class | age | star\n1  | Pia  | B     | 10  | N\n2  | Dev  | A     | 9   | N\n3  | Nia  | B     | 10  | N\n\nUPDATE kid SET age = age + 1, star = 'Y' WHERE class = 'B';",
          code: "UPDATE kid\nSET age = age + 1, star = 'Y'\nWHERE class = 'B';",
          language: "sql",
          steps: [
            {
              do: "WHERE class = 'B'. Tick Pia B → match.",
              why: "Row filter.",
            },
            {
              do: "Pia: age 10+1=11, star Y.",
              why: "One SET list, two cells.",
            },
            {
              do: "Tick Dev A → skip. Stay 9 and N.",
              why: "WHERE failed.",
            },
            {
              do: "Tick Nia B → age 11, star Y.",
              why: "Second match.",
            },
            {
              do: "class and name did not appear in SET, so they stay.",
              why: "Only SET columns move.",
            },
            {
              do: "age = age + 1 uses the old age on that row, then writes the new one.",
              why: "The right-hand age is the value before this UPDATE.",
            },
            {
              do: "Two rows changed, one did not.",
              why: "Tick WHERE, then apply SET.",
            },
          ],
          result: "Pia (B, 11, Y), Dev (A, 9, N), Nia (B, 11, Y).",
        },
      ],
    },
    {
      heading: "DELETE vs TRUNCATE vs DROP vs ALTER (DML vs DDL)",
      body: "In simple words, DELETE removes rows. You may WHERE. You may ROLLBACK in a transaction. TRUNCATE empties every row but keeps the table shape. DROP removes the table itself. ALTER changes the shape: add, rename, or drop a column.\n\nDELETE is DML (data). TRUNCATE, DROP, ALTER, CREATE are DDL (definition) in the usual class story. Mix them on tiny tables: ask “do rows remain? does the table remain? can I WHERE?”.",
      howTo: [
        "Ask: rows left? table left? WHERE allowed? rollback?",
        "Need some rows gone → DELETE … WHERE.",
        "Need all rows gone, table kept → TRUNCATE (or DELETE without WHERE).",
        "Need a new/renamed/dropped column → ALTER.",
        "Need the name gone → DROP TABLE.",
      ],
      bullets: [
        "DELETE: DML, WHERE, can ROLLBACK, table stays.",
        "TRUNCATE: empty table, keep structure, no WHERE.",
        "DROP TABLE: table gone.",
        "ALTER: add / rename / drop a column. Rows stay (minus a dropped column).",
        "DROP VIEW ≠ DROP TABLE.",
      ],
      examples: [
        {
          title: "DELETE WHERE — one row, table stays",
          prompt:
            "Kid\nid | name\n1  | Pia\n2  | Dev\n3  | Nia\n\nDELETE FROM kid WHERE name = 'Dev';",
          code: "DELETE FROM kid WHERE name = 'Dev';",
          language: "sql",
          steps: [
            {
              do: "Tick Pia: name not Dev → keep.",
              why: "WHERE miss.",
            },
            {
              do: "Tick Dev: match → remove the row.",
              why: "DELETE takes the whole row.",
            },
            {
              do: "Tick Nia: keep.",
              why: "WHERE miss.",
            },
            {
              do: "Table Kid still exists. Heading still id | name.",
              why: "DELETE is rows, not DROP.",
            },
            {
              do: "You could ROLLBACK in a transaction and Dev would return (usual class story).",
              why: "DML is transactional.",
            },
            {
              do: "DELETE without WHERE would remove Pia and Nia too.",
              why: "Same trap as UPDATE.",
            },
            {
              do: "Two rows left.",
              why: "Count remaining.",
            },
          ],
          result: "Pia and Nia remain. Table Kid remains. Dev’s row is gone.",
        },
        {
          title: "TRUNCATE empties, keeps structure",
          prompt:
            "Kid has 3 rows. TRUNCATE TABLE kid; vs DELETE FROM kid;",
          code: "TRUNCATE TABLE kid;\n-- contrast:\nDELETE FROM kid;",
          language: "sql",
          steps: [
            {
              do: "TRUNCATE: all three rows go. No WHERE to save Pia.",
              why: "TRUNCATE cannot pick rows.",
            },
            {
              do: "The table Kid still exists. You can INSERT again into the same columns.",
              why: "Structure stays.",
            },
            {
              do: "SELECT * FROM kid returns 0 rows, not an error.",
              why: "The grid is empty, not missing.",
            },
            {
              do: "DELETE FROM kid also ends at 0 rows, but it is row-level DML: WHERE was allowed, triggers may fire, ROLLBACK may work.",
              why: "That is the exam contrast.",
            },
            {
              do: "TRUNCATE usually skips per-row DELETE triggers and may reset id counters.",
              why: "Bulk empty, not line-by-line erase.",
            },
            {
              do: "MySQL TRUNCATE often auto-commits, so ROLLBACK will not bring rows back.",
              why: "If the paper names MySQL, say auto-commit. If silent, say: DELETE transactional; TRUNCATE bulk reset.",
            },
            {
              do: "DROP TABLE would make SELECT kid fail.",
              why: "TRUNCATE is not DROP.",
            },
          ],
          result: "TRUNCATE: 0 rows, table remains. DELETE all: 0 rows too, but WHERE/rollback/triggers differ.",
        },
        {
          title: "DROP TABLE removes the grid",
          prompt:
            "Kid has 3 rows. DROP TABLE kid; then SELECT * FROM kid;",
          code: "DROP TABLE kid;",
          language: "sql",
          steps: [
            {
              do: "DROP TABLE throws away the object Kid.",
              why: "DDL: definition gone.",
            },
            {
              do: "The three rows are gone with it.",
              why: "No table means no rows.",
            },
            {
              do: "SELECT * FROM kid errors: unknown table.",
              why: "The name is not there.",
            },
            {
              do: "Indexes and the column list are gone too.",
              why: "DROP is “throw the notebook”, not “erase the lines”.",
            },
            {
              do: "DROP VIEW v would have left Kid in place.",
              why: "Know which object you named.",
            },
            {
              do: "Need the data back? You cannot ROLLBACK a committed DROP in the usual exam story. Restore from backup.",
              why: "DROP is not DELETE.",
            },
            {
              do: "CREATE TABLE kid (…) would start an empty new grid with the same name.",
              why: "That is a new object, not undelete.",
            },
          ],
          result: "Table gone. SELECT kid fails. Rows, columns, and name are gone.",
        },
        {
          title: "ALTER ADD / RENAME / DROP COLUMN",
          prompt:
            "Kid\nid | name\n1  | Pia\n2  | Dev\n\n(1) ALTER TABLE kid ADD age INT;\n(2) ALTER TABLE kid RENAME COLUMN name TO sname;\n(3) ALTER TABLE kid DROP COLUMN age;",
          code: "ALTER TABLE kid ADD age INT;\nALTER TABLE kid RENAME COLUMN name TO sname;\nALTER TABLE kid DROP COLUMN age;",
          language: "sql",
          steps: [
            {
              do: "(1) ADD age: two rows stay. New age is NULL (no default given).",
              why: "ALTER changes shape. Data remains.",
            },
            {
              do: "Grid after ADD: Pia NULL, Dev NULL, column age exists.",
              why: "Tick both kids. Neither was deleted.",
            },
            {
              do: "(2) RENAME name → sname. Values Pia and Dev still sit in that column.",
              why: "Rename is a heading change, not a new empty column.",
            },
            {
              do: "(3) DROP COLUMN age: rows still Pia and Dev. Age cells vanish.",
              why: "Dropping a column throws that fact away, not the kid.",
            },
            {
              do: "Do not DROP TABLE + CREATE to “add a column” if you need the rows.",
              why: "DROP wipes data. ALTER ADD keeps it.",
            },
            {
              do: "ALTER is DDL. SELECT still works on Kid after each step.",
              why: "The table name remained.",
            },
            {
              do: "After all three, heading is id | sname, two rows, no age.",
              why: "Add then drop age cancels the extra column; rename stuck.",
            },
          ],
          result: "ADD keeps rows (age NULL). RENAME keeps values. DROP COLUMN keeps rows minus that column.",
        },
        {
          title: "Mix four commands on one tiny table",
          prompt:
            "Start: Kid (id, name) with Pia, Dev.\nThen: ALTER ADD star; UPDATE star='Y' WHERE name='Pia'; DELETE WHERE name='Dev'; TRUNCATE; DROP.",
          code: "ALTER TABLE kid ADD star CHAR(1);\nUPDATE kid SET star = 'Y' WHERE name = 'Pia';\nDELETE FROM kid WHERE name = 'Dev';\nTRUNCATE TABLE kid;\nDROP TABLE kid;",
          language: "sql",
          steps: [
            {
              do: "ALTER ADD star: Pia and Dev stay, star NULL. DDL, shape changed.",
              why: "Table remains. Two rows remain.",
            },
            {
              do: "UPDATE … WHERE Pia: Pia star Y. Dev still NULL. DML.",
              why: "WHERE saved Dev from the SET.",
            },
            {
              do: "DELETE … WHERE Dev: Dev gone. Pia Y remains. DML. ROLLBACK could still undo this.",
              why: "Table remains with one row.",
            },
            {
              do: "TRUNCATE: Pia gone too. Empty Kid, columns id, name, star still there. No WHERE.",
              why: "Structure kept, rows all gone.",
            },
            {
              do: "DROP TABLE: SELECT kid now fails.",
              why: "Object gone.",
            },
            {
              do: "Label them: ALTER/TRUNCATE/DROP = DDL. UPDATE/DELETE = DML.",
              why: "Exam mix: shape vs data vs object.",
            },
            {
              do: "If we had stopped before DROP, INSERT could refill the empty table.",
              why: "TRUNCATE is empty notebook, same cover. DROP throws the notebook away.",
            },
          ],
          result: "After ALTER+UPDATE+DELETE: only Pia Y. After TRUNCATE: empty table. After DROP: no table.",
        },
      ],
    },
    {
      heading: "UNION / UNION ALL / INTERSECT / EXCEPT",
      body: "In simple words, these stack two SELECTs that have the same number of columns. UNION = stack then drop copies. UNION ALL = stack and keep copies. INTERSECT = rows in both. EXCEPT = left minus right (Oracle often says MINUS).\n\nSet operators treat two NULLs as equal (unlike WHERE col = NULL). Names come from the first SELECT. ORDER BY only at the end. INTERSECT is not a join: it does not fan out pairs.",
      howTo: [
        "Check both sides have the same width.",
        "Write the two lists as bags of whole rows.",
        "UNION ALL: pour together. UNION: then unique.",
        "INTERSECT: keep names in both (usually distinct).",
        "EXCEPT: keep left names that are not on the right. Not symmetric.",
      ],
      bullets: [
        "UNION = concat + DISTINCT. UNION ALL = concat.",
        "INTERSECT = in both. EXCEPT = left minus right.",
        "NULLs count as equal for set ops.",
        "Same column count. Names from the first SELECT.",
        "INTERSECT does not fan out like JOIN.",
      ],
      examples: [
        {
          title: "UNION vs UNION ALL",
          prompt:
            "W1\nisin\nINEA\nINEB\nINEA\n\nW2\nisin\nINEB\nINEC\n\nUNION vs UNION ALL.",
          code: "SELECT isin FROM w1\nUNION\nSELECT isin FROM w2;",
          language: "sql",
          steps: [
            {
              do: "W1 list: INEA, INEB, INEA. W2 list: INEB, INEC.",
              why: "Two bags, same one column.",
            },
            {
              do: "UNION ALL pours five rows: INEA, INEB, INEA, INEB, INEC.",
              why: "ALL means keep the pile.",
            },
            {
              do: "Two INEA stay two. Two INEB stay two.",
              why: "No tidy step.",
            },
            {
              do: "UNION then unique-ifies to {INEA, INEB, INEC} — three rows.",
              why: "Plain UNION is the set of names on either list.",
            },
            {
              do: "Tick: INEA is only on W1, still in UNION.",
              why: "Union is “either side”.",
            },
            {
              do: "Tick: INEC is only on W2, still in UNION.",
              why: "Same.",
            },
            {
              do: "Column count must match. UNION of (isin, qty) with (isin) errors.",
              why: "Stacking needs the same width.",
            },
          ],
          result: "UNION → 3 rows. UNION ALL → 5 rows.",
        },
        {
          title: "INTERSECT does not fan out",
          prompt:
            "Traded\nmember\nM1\nM2\nM2\nM3\n\nInspected\nmember\nM2\nM4\nM2\n\nINTERSECT on member.",
          code: "SELECT member FROM traded\nINTERSECT\nSELECT member FROM inspected;",
          language: "sql",
          steps: [
            {
              do: "Distinct traded {M1, M2, M3}. Distinct inspected {M2, M4}.",
              why: "Default INTERSECT is a set.",
            },
            {
              do: "Tick M1: not in inspected → drop.",
              why: "Need both sides.",
            },
            {
              do: "Tick M2: in both → keep one M2.",
              why: "Two copies on each side still make one INTERSECT row.",
            },
            {
              do: "Tick M3: not in inspected → drop.",
              why: "Left only.",
            },
            {
              do: "M4 is right only → drop.",
              why: "INTERSECT is not UNION.",
            },
            {
              do: "INNER JOIN of those bags would be 2×2 = 4 M2 pairs.",
              why: "Join multiplies. Intersect does not.",
            },
            {
              do: "INTERSECT ALL (where supported) would keep min(2,2)=2 copies of M2.",
              why: "ALL uses multiplicities. If silent, answer DISTINCT INTERSECT.",
            },
          ],
          result: "One row M2. A join would have fanned out to four pairs.",
        },
        {
          title: "EXCEPT is left minus right",
          prompt:
            "Circ\ncid\nC1\nC2\nC3\n\nAck\ncid\nC1\nC1\nC2\n\ncirc EXCEPT ack, then the swap.",
          code: "SELECT cid FROM circ\nEXCEPT\nSELECT cid FROM ack;",
          language: "sql",
          steps: [
            {
              do: "Left set {C1, C2, C3}. Right set {C1, C2}.",
              why: "Default EXCEPT is DISTINCT.",
            },
            {
              do: "Tick C1: on the right → remove from left.",
              why: "Minus.",
            },
            {
              do: "Tick C2: on the right → remove.",
              why: "Extra C1 copies on Ack do not matter for distinct EXCEPT.",
            },
            {
              do: "Tick C3: not on the right → keep.",
              why: "Left only.",
            },
            {
              do: "circ EXCEPT ack = {C3}.",
              why: "Circulars with no ack, as a set.",
            },
            {
              do: "Swap: ack EXCEPT circ. Right has C1,C2,C3 so left {C1,C2} minus that is empty.",
              why: "EXCEPT is not symmetric.",
            },
            {
              do: "Parenthesise if you mix with UNION: (A ∪ B) − C is not A ∪ (B − C).",
              why: "Write the brackets.",
            },
          ],
          result: "circ EXCEPT ack = {C3}. ack EXCEPT circ = empty.",
        },
        {
          title: "UNION treats two NULLs as equal",
          prompt:
            "A\nx\nP7\nNULL\n\nB\nx\nNULL\nP8\n\nUNION vs UNION ALL vs WHERE x = NULL.",
          code: "SELECT x FROM a\nUNION\nSELECT x FROM b;",
          language: "sql",
          steps: [
            {
              do: "UNION ALL: P7, NULL, NULL, P8 — four rows.",
              why: "Keep the pile, two NULL rows stay two.",
            },
            {
              do: "UNION: NULL equals NULL, so one NULL plus P7 and P8 — three rows.",
              why: "Set operators treat NULL as a value equal to NULL.",
            },
            {
              do: "WHERE x = NULL on A would keep nobody, because = NULL is unknown.",
              why: "Different NULL story. Set ops ≠ WHERE.",
            },
            {
              do: "Tick P7: only in A, in the UNION.",
              why: "Either side.",
            },
            {
              do: "Tick P8: only in B, in the UNION.",
              why: "Either side.",
            },
            {
              do: "INTERSECT of A and B is {NULL} (one row), because NULL is in both bags.",
              why: "Same equality rule.",
            },
            {
              do: "A EXCEPT B is {P7}. The NULL on A is cancelled by the NULL on B.",
              why: "EXCEPT uses the same NULL-equals-NULL rule.",
            },
          ],
          result: "UNION → P7, NULL, P8 (3 rows). UNION ALL → 4 rows.",
        },
        {
          title: "EXCEPT ALL vs distinct, and empty right",
          prompt:
            "List_a: P7, P8, P8, P9. List_b: P8, P10.\nA EXCEPT B, B EXCEPT A, INTERSECT. Empty B?",
          code: "SELECT pan FROM list_a\nEXCEPT\nSELECT pan FROM list_b;",
          language: "sql",
          steps: [
            {
              do: "Distinct A {P7,P8,P9}, B {P8,P10}. A − B = {P7, P9}.",
              why: "Default EXCEPT is DISTINCT. Extra P8 on A still goes away once P8 is in B.",
            },
            {
              do: "B − A = {P10}.",
              why: "Not the same as {P7,P9}. Name the left.",
            },
            {
              do: "INTERSECT = {P8}, one row.",
              why: "Set intersection.",
            },
            {
              do: "EXCEPT ALL (where supported): A has two P8s, B has one, leftover one P8 plus P7 and P9.",
              why: "ALL uses multiplicities.",
            },
            {
              do: "Empty B ⇒ A EXCEPT B is {P7,P8,P9} (distinct left).",
              why: "Minus nothing leaves the left set.",
            },
            {
              do: "That empty-right case is not the NOT IN plus NULL trap.",
              why: "Different heading.",
            },
            {
              do: "Join form of “A not in B”: LEFT JOIN … WHERE b.pan IS NULL, on clean keys.",
              why: "EXCEPT and anti-join agree when keys are NOT NULL unique.",
            },
          ],
          result: "A EXCEPT B = {P7, P9}. B EXCEPT A = {P10}. INTERSECT = {P8}.",
        },
      ],
    },
    {
      heading: "IN vs EXISTS and the NOT IN + NULL trap",
      body: "In simple words, IN (list) asks “is this value equal to any of these?”. EXISTS (subquery) asks “did that inner SELECT find even one row?”. On a clean list with no NULLs they agree.\n\nNOT IN plus even one NULL is poison: x <> NULL is unknown, so every outer row dies. NOT EXISTS does not collapse: a NULL inner value is not a true match, so other outer rows survive. Empty list: IN keeps nobody; NOT IN keeps everybody (no NULL). Prefer NOT EXISTS for “not in the list”.",
      howTo: [
        "Positive membership, no NULLs → IN or EXISTS.",
        "Walk each outer row. For IN, test membership in the inner set.",
        "For EXISTS, run the inner WHERE with that outer row; one hit is enough.",
        "Anti-membership → NOT EXISTS (or LEFT JOIN … WHERE right IS NULL).",
        "Never NOT IN (nullable_col). Empty list is not the NULL trap.",
      ],
      bullets: [
        "IN ≈ EXISTS when the set has no NULLs.",
        "NOT IN + any NULL ⇒ empty result.",
        "NOT EXISTS is the safe “not in the list”.",
        "Empty subquery: IN false, NOT IN true.",
        "IN does not fan out duplicates like a join.",
      ],
      examples: [
        {
          title: "IN with a clean list",
          prompt:
            "Member\nid\nM1\nM2\nM3\n\nTraded\nmember\nM1\nM2\n\nWHERE id IN (SELECT member FROM traded).",
          code: "SELECT id FROM member\nWHERE id IN (SELECT member FROM traded);",
          language: "sql",
          steps: [
            {
              do: "Inner set {M1, M2}. No NULL.",
              why: "Clean list.",
            },
            {
              do: "Tick M1: in the set → keep.",
              why: "IN is membership.",
            },
            {
              do: "Tick M2: keep.",
              why: "On the sheet.",
            },
            {
              do: "Tick M3: not in the set → drop.",
              why: "Failed membership.",
            },
            {
              do: "Duplicate M1 in Traded would not print M1 twice.",
              why: "IN is not join fan-out.",
            },
            {
              do: "EXISTS (SELECT 1 FROM traded t WHERE t.member = member.id) keeps the same two ids.",
              why: "No NULLs, IN and EXISTS agree.",
            },
            {
              do: "INNER JOIN would keep M1 once here (one outer copy), but two inner copies would duplicate M1.",
              why: "That is the join-versus-IN trap.",
            },
          ],
          result: "M1 and M2. IN does not copy duplicates from the subquery.",
        },
        {
          title: "NOT IN with a NULL — zero rows",
          prompt:
            "Member M1, M2, M3. Traded members: M1 and NULL.\nWHERE id NOT IN (SELECT member FROM traded).",
          code: "SELECT id FROM member\nWHERE id NOT IN (SELECT member FROM traded);",
          language: "sql",
          steps: [
            {
              do: "NOT IN means id <> 'M1' AND id <> NULL.",
              why: "Must be not equal to every element, including the hole.",
            },
            {
              do: "Tick M1: already id <> M1 is false → drop.",
              why: "He is in the list.",
            },
            {
              do: "Tick M2: M2 <> M1 is true, M2 <> NULL is unknown. true AND unknown = unknown.",
              why: "WHERE needs true. Unknown drops the row.",
            },
            {
              do: "Tick M3: same unknown → drop.",
              why: "Every outer row dies. This is the trap.",
            },
            {
              do: "Result is empty, even though M2 and M3 were never traded.",
              why: "One NULL poisoned the list.",
            },
            {
              do: "Fix: NOT EXISTS (SELECT 1 FROM traded t WHERE t.member = member.id).",
              why: "Or filter member IS NOT NULL inside the IN list.",
            },
            {
              do: "Do not “fix” by guessing M2 survives NOT IN.",
              why: "Three-valued logic. Tick unknown as drop.",
            },
          ],
          result: "Zero rows. One NULL in NOT IN poisons every outer row.",
        },
        {
          title: "NOT EXISTS survives a NULL inner row",
          prompt:
            "Member M1, M2, M3. Traded: M1 and NULL.\nNOT EXISTS (SELECT 1 FROM traded t WHERE t.member = member.id).",
          code: "SELECT id FROM member m\nWHERE NOT EXISTS (\n  SELECT 1 FROM traded t\n  WHERE t.member = m.id\n);",
          language: "sql",
          steps: [
            {
              do: "Tick M1: inner finds traded M1 → EXISTS true → NOT EXISTS drops M1.",
              why: "A real equal match is enough.",
            },
            {
              do: "Tick M2: t.member = M2 is false on M1 and unknown on NULL. No inner row qualifies.",
              why: "NULL = M2 is not true, so that inner row is not a match.",
            },
            {
              do: "EXISTS is false for M2 → NOT EXISTS keeps M2.",
              why: "NOT EXISTS only cares whether a matching row appeared.",
            },
            {
              do: "Tick M3: same as M2 → keep.",
              why: "No true match.",
            },
            {
              do: "NOT IN on this same list would have returned zero rows.",
              why: "Same data, opposite outer result. That is the exam pair.",
            },
            {
              do: "LEFT JOIN traded ON member = id WHERE traded.member IS NULL also keeps M2 and M3 (NULL inner key does not match).",
              why: "Anti-join is the other safe spelling.",
            },
            {
              do: "Prefer NOT EXISTS for “not in the list”.",
              why: "Never NOT IN (nullable_col).",
            },
          ],
          result: "NOT EXISTS keeps M2 and M3. NOT IN on the same list keeps nobody.",
        },
        {
          title: "Empty subquery is not the poison",
          prompt:
            "Member M1, M2, M3. Traded is empty (0 rows).\nIN vs NOT IN vs NOT EXISTS.",
          code: "SELECT id FROM member WHERE id IN (SELECT member FROM traded);\nSELECT id FROM member WHERE id NOT IN (SELECT member FROM traded);",
          language: "sql",
          steps: [
            {
              do: "Inner list is empty. No NULL is present.",
              why: "Emptiness ≠ NULL-in-list.",
            },
            {
              do: "IN of empty: no element equals M1/M2/M3 → keep nobody.",
              why: "IN is false.",
            },
            {
              do: "NOT IN of empty: there is no element that id equals, so “not in the list” is true for each member.",
              why: "Vacuous true. Keep M1, M2, M3.",
            },
            {
              do: "Tick each outer id the same way: nobody is in the empty set, everybody is not-in the empty set.",
              why: "Walk all three; same answer.",
            },
            {
              do: "NOT EXISTS also keeps all three, because the inner SELECT finds nothing.",
              why: "On empty non-null sets, NOT IN and NOT EXISTS agree.",
            },
            {
              do: "Memorise the pair: empty makes NOT IN full; NULL-in-list makes NOT IN empty.",
              why: "Two different three-valued-logic stories.",
            },
            {
              do: "Do not mix this with TRUNCATE. Empty table, not missing table.",
              why: "FROM traded still works; it just has no rows.",
            },
          ],
          result: "IN → no rows. NOT IN and NOT EXISTS → M1, M2, M3.",
        },
        {
          title: "IN does not fan out; JOIN does",
          prompt:
            "Pan_roll: P21, P22, P23. Filed: P21, P21, P22.\nWHERE pan IN (SELECT pan FROM filed) vs INNER JOIN on pan.",
          code: "SELECT pan FROM pan_roll\nWHERE pan IN (SELECT pan FROM filed);",
          language: "sql",
          steps: [
            {
              do: "Inner set {P21, P22}.",
              why: "IN unique-ifies for membership.",
            },
            {
              do: "Tick P21: in set → keep once.",
              why: "One outer row prints once.",
            },
            {
              do: "Two P21 rows in Filed do not duplicate P21 in the IN result.",
              why: "Membership, not a pair list.",
            },
            {
              do: "Tick P22: keep once.",
              why: "On the sheet.",
            },
            {
              do: "Tick P23: drop.",
              why: "Not filed.",
            },
            {
              do: "INNER JOIN pan_roll ⋈ filed would print P21 twice (2 inner copies).",
              why: "Join fan-out. IN does not.",
            },
            {
              do: "EXISTS (SELECT 1 FROM filed f WHERE f.pan = pan_roll.pan) matches IN here (no NULLs): P21, P22 once each.",
              why: "Semijoin, like IN.",
            },
          ],
          result: "IN: P21 and P22 once each. JOIN would copy P21 twice.",
        },
      ],
    },
    {
      heading: "Nested and correlated subqueries",
      body: "In simple words, a subquery is a SELECT inside another SELECT. Uncorrelated means it does not mention the outer row — think once. Correlated means the inner query uses the outer alias — think once per outer row.\n\nScalar subquery: one column, at most one row. Zero inner rows become NULL; two inner rows are an error. IN/EXISTS may return many rows. A FROM (SELECT …) AS d must be named. Walk: pick an outer row, plug it into the inner WHERE, tick the inner table.",
      howTo: [
        "Does the inner query mention the outer alias? If yes, correlated — walk one outer row at a time.",
        "If no, compute the inner result once, then filter the outer table.",
        "Scalar: 0 → NULL, 2 → error. COUNT of empty is 0, not NULL.",
        "“Has at least one child” → correlated EXISTS (no extra duplicates).",
        "Alias every derived table.",
      ],
      bullets: [
        "Uncorrelated: once. Correlated: once per outer row.",
        "Scalar: 0 rows → NULL, 2 rows → error.",
        "EXISTS is yes/no; extra inner hits do not duplicate the outer row.",
        "FROM (SELECT …) AS d must have a name.",
        "WHERE col > AVG(col) without a subquery is illegal.",
      ],
      examples: [
        {
          title: "Above-average mark (uncorrelated)",
          prompt:
            "Mark\nname | score\nPia  | 8\nDev  | 3\nNia  | 10\nAmy  | 3\n\nWHERE score > (SELECT AVG(score) FROM mark).",
          code: "SELECT name FROM mark\nWHERE score > (SELECT AVG(score) FROM mark);",
          language: "sql",
          steps: [
            {
              do: "Inner query does not mention the outer name. Compute AVG once: (8+3+10+3)/4 = 6.",
              why: "Uncorrelated = one inner answer.",
            },
            {
              do: "Tick Pia 8 > 6 → keep.",
              why: "Outer WHERE uses the saved 6.",
            },
            {
              do: "Tick Dev 3 > 6 → drop.",
              why: "Below average.",
            },
            {
              do: "Tick Nia 10 > 6 → keep.",
              why: "Above.",
            },
            {
              do: "Tick Amy 3 > 6 → drop.",
              why: "Below.",
            },
            {
              do: "WHERE score > AVG(score) without a subquery is illegal.",
              why: "AVG is an aggregate; it needs a subquery or GROUP BY/HAVING.",
            },
            {
              do: "If a score were NULL, AVG would skip it and the divisor would shrink.",
              why: "Same NULL rule as COUNT(col).",
            },
          ],
          result: "AVG = 6; result Pia and Nia. Inner query ran once.",
        },
        {
          title: "Correlated: score above the class average",
          prompt:
            "Mark\nname | class | score\nPia  | B     | 8\nDev  | B     | 4\nNia  | A     | 12\nAmy  | A     | 3\nRaj  | A     | 6\n\nKeep rows whose score > AVG(score) of the same class.",
          code: "SELECT name, class, score FROM mark s\nWHERE score > (\n  SELECT AVG(score) FROM mark t\n  WHERE t.class = s.class\n);",
          language: "sql",
          steps: [
            {
              do: "Inner mentions s.class, so it is correlated. Walk outer rows.",
              why: "Each kid asks “what is my class average?”",
            },
            {
              do: "Class B AVG = (8+4)/2 = 6. Pia 8 > 6 keep. Dev 4 > 6 drop.",
              why: "Tick the B bag.",
            },
            {
              do: "Class A AVG = (12+3+6)/3 = 7. Nia 12 > 7 keep. Amy 3 drop. Raj 6 drop.",
              why: "Tick the A bag. 6 is not > 7.",
            },
            {
              do: "Grand AVG 33/5 = 6.6 is a different bar. Correlation uses the class’s own average.",
              why: "Remove t.class = s.class and you changed the English.",
            },
            {
              do: "Pia is kept because of B’s 6, not because of 6.6.",
              why: "Same number here, but the reason is the class bag.",
            },
            {
              do: "A derived table of class averages joined on class is the uncorrelated rewrite. Alias it.",
              why: "Same answer, one GROUP BY, then a join.",
            },
            {
              do: "Ties with the class average drop on strict >. Need ≥ if the paper said “at least”.",
              why: "Read the comparison.",
            },
          ],
          result: "Keep (Pia, B, 8) and (Nia, A, 12). Class AVGs are 6 and 7.",
        },
        {
          title: "EXISTS: kids who took Maths",
          prompt:
            "Student\nsid | sname\n1   | Pia\n2   | Dev\n3   | Nia\n\nCourse\ncname | sid\nMaths | 1\nArt   | 1\nMaths | 2\nChess | 9\n\nEXISTS a Maths course for this student.",
          code: "SELECT s.sname FROM student s\nWHERE EXISTS (\n  SELECT 1 FROM course c\n  WHERE c.sid = s.sid AND c.cname = 'Maths'\n);",
          language: "sql",
          steps: [
            {
              do: "Correlated: c.sid = s.sid uses the outer student.",
              why: "Each kid asks “do I have a Maths row?”",
            },
            {
              do: "Tick Pia: inner finds Maths|1 → EXISTS true → keep Pia.",
              why: "Art is extra; EXISTS already said yes. Pia prints once.",
            },
            {
              do: "Tick Dev: inner finds Maths|2 → keep Dev.",
              why: "One hit is enough.",
            },
            {
              do: "Tick Nia: no course sid 3 → EXISTS false → drop Nia.",
              why: "No handshake.",
            },
            {
              do: "Chess|9 never helps an outer student, because no sid 9 in Student.",
              why: "EXISTS walks from the outer table.",
            },
            {
              do: "JOIN Student to Course on Maths could duplicate Pia if she had two Maths rows. EXISTS never duplicates.",
              why: "Semijoin versus join fan-out.",
            },
            {
              do: "Write SELECT 1 inside EXISTS. The inner columns are not printed.",
              why: "EXISTS only cares that a row appears.",
            },
          ],
          result: "Pia and Dev. Nia has no Maths. EXISTS is a semijoin.",
        },
        {
          title: "Scalar subquery: 0 becomes NULL, 2 is an error",
          prompt:
            "Desk\nid | margin\nD4 | 9\nD5 | 9\nD6 | 4\n\nWHERE id = (SELECT id FROM desk WHERE margin = 9). What if margin = 99 matches nobody? What about AVG?",
          code: "SELECT id FROM desk\nWHERE id = (SELECT id FROM desk WHERE margin = 9);",
          language: "sql",
          steps: [
            {
              do: "Inner SELECT for margin 9 returns D4 and D5 — two rows.",
              why: "Two desks share 9.",
            },
            {
              do: "A scalar subquery must be at most one row. The query errors.",
              why: "Equals wants one value. Two names cannot sit on the right of =.",
            },
            {
              do: "If nobody has margin 9, the scalar becomes NULL. id = NULL is unknown, so WHERE keeps nobody.",
              why: "Zero rows in a scalar is NULL, not an error.",
            },
            {
              do: "IN (SELECT id FROM desk WHERE margin = 9) legally keeps D4 and D5.",
              why: "IN/EXISTS may return many rows. Scalar may not.",
            },
            {
              do: "(SELECT AVG(margin) FROM desk) always returns one row, even if Desk is empty (AVG of empty is NULL; COUNT of empty is 0).",
              why: "Aggregate without GROUP BY is a one-row scalar.",
            },
            {
              do: "Do not write WHERE margin = AVG(margin) without a subquery.",
              why: "Aggregates are not per-row WHERE functions.",
            },
            {
              do: "Tick the rule: 2 rows → crash. 0 rows → NULL. 1 row → compare.",
              why: "Scalar checklist.",
            },
          ],
          result: "Two matching ids → scalar error. Zero matches → NULL, outer WHERE empty. Use IN or AVG to avoid the crash.",
        },
        {
          title: "Derived table of heavy desks, then join",
          prompt:
            "Sale\ndesk | qty\nM1   | 10\nM1   | 90\nM2   | 5\nM3   | 40\nM3   | 20\n\nMember\nid | city\nM1 | Mum\nM2 | Pune\nM3 | Mum\nM4 | Hyd\n\nKeep desks with total qty ≥ 50, with city.",
          code: "SELECT m.id, m.city, t.tot\nFROM member m\nJOIN (\n  SELECT desk, SUM(qty) AS tot\n  FROM sale\n  GROUP BY desk\n  HAVING SUM(qty) >= 50\n) t ON t.desk = m.id;",
          language: "sql",
          steps: [
            {
              do: "Inner derived table: bag M1 10+90=100 keep, M2 5 drop, M3 40+20=60 keep.",
              why: "GROUP BY then HAVING. Alias t is required.",
            },
            {
              do: "t has two rows: (M1, 100), (M3, 60).",
              why: "M2 never left the subquery.",
            },
            {
              do: "Join to Member. Tick M1: city Mum → (M1, Mum, 100).",
              why: "Attach the description after the total.",
            },
            {
              do: "Tick M3: city Mum → (M3, Mum, 60).",
              why: "Second keep.",
            },
            {
              do: "M2 is in Member but not in t → inner join drops M2.",
              why: "That is what we wanted: not heavy.",
            },
            {
              do: "M4 has no sales → not in t → dropped.",
              why: "A LEFT JOIN plus COALESCE would keep zeros. Different English.",
            },
            {
              do: "HAVING filtered before the join, so city never mixed into the SUM.",
              why: "Pre-aggregate in the derived table.",
            },
          ],
          result: "(M1, Mum, 100) and (M3, Mum, 60). HAVING filtered before the join.",
        },
      ],
    },
  ],
};
