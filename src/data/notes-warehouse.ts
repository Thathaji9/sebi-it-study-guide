import type { TopicNote } from "@/data/notes";

export const notesWarehouse: TopicNote = {
  topic: "warehouse",
  title: "Warehouse — techniques (beginner)",
  blurb:
    "A data warehouse is a calm copy of business facts for questions, not for live trading. Learn ETL order, star versus snowflake, and the cube moves slice, dice, and roll-up. Walk every cube with real numbers.",
  blocks: [
    {
      heading: "ETL: extract, transform, load",
      body: "ETL is the nightly pipeline: Extract (copy from the live systems), Transform (clean, rename, look up keys), Load (put tidy rows into warehouse tables). Think unpack groceries, wash and chop, then put them in the fridge — in that order.\n\nELT loads the raw bag into a lake first, then chops inside the platform. Exams still want E-T-L unless they name a lake. Load dimension tables (the “who/what/when” cards) before facts (the numbers), because facts store those cards’ surrogate keys.",
      howTo: [
        "Name the stage: copy file = Extract; reject/clean/lookup = Transform; insert into FACT_ = Load.",
        "Dimensions before facts. A missing broker key is a late-arriving dimension — stub first, then the fact.",
        "Reruns must not double-count: delete/truncate that date’s partition or MERGE on a natural key.",
        "Live position for trading is OLTP. Yesterday’s conformed snapshot is ETL. Do not mix the jobs.",
      ],
      bullets: [
        "Classical order: Extract → Transform (clean, conform, keys) → Load.",
        "Load dimensions before facts. Facts store dimension keys.",
        "ELT: land raw first, transform in place. Same three jobs, different machine.",
      ],
      examples: [
        {
          title: "Place five jobs on the timeline",
          prompt:
            "Jobs: (A) lookup member_sk, (B) copy yesterday’s trade file, (C) bulk insert FACT_TRADE, (D) map city “BOM” → “Mumbai”, (E) reject qty ≤ 0. Order them.",
          steps: [
            {
              do: "B is Extract — pull the source file. Nothing in the warehouse has changed yet.",
              why: "Extract is photocopying the shopping list, not cooking.",
            },
            {
              do: "E, D, A are Transform (reject bad rows, standardise names, replace IDs with warehouse keys). Then C is Load.",
              why: "Do not look up keys for doomed rows. Do not load facts before keys exist.",
            },
            {
              do: "Compact order: B → E → D → A → C.",
              why: "Unpack, throw rotten fruit, rewrite labels, stamp IDs, then fridge.",
            },
          ],
          result:
            "B extract; E, D, A transform; C load. Sequence B → E → D → A → C.",
        },
        {
          title: "Facts cannot load before dimensions",
          prompt:
            "New broker BR9 is in today’s fills but not in DIM_BROKER. What if you load FACT_TRADE first?",
          steps: [
            {
              do: "A real broker_sk that is missing violates the foreign key — the load should fail.",
              why: "Facts point at dimension keys the way a marksheet points at a roll number that must exist.",
            },
            {
              do: "NULL broker_sk (if allowed) dumps BR9 into “unknown” — a silent wrong slice.",
              why: "The number loaded, but you can no longer cut the cube by broker.",
            },
            {
              do: "Correct: insert a stub dimension row, then load the fact with that surrogate. Later, fill in the proper name (Type 1 or Type 2).",
              why: "Late-arriving dimension = the person arrived in the numbers before their ID card.",
            },
          ],
          result:
            "Fact-first fails the FK or piles trades into Unknown. Stub the dimension, then load the fact.",
        },
        {
          title: "Idempotent reload of one date",
          prompt:
            "Monday’s job loaded 1.2 lakh rows for 2026-04-06, then crashed halfway through 2026-04-07. The operator re-runs both dates. How do you avoid double-counting the 6th?",
          steps: [
            {
              do: "A naive second INSERT would duplicate 2026-04-06 and double every total.",
              why: "Extract will send the same file again. Load must be a replace, not a pile-on.",
            },
            {
              do: "DELETE/TRUNCATE those date partitions, then INSERT, or MERGE on (exchange_trade_id, trade_date).",
              why: "Re-running then yields the same warehouse state — that is idempotent, like wiping a chalkboard date before rewriting it.",
            },
            {
              do: "Do not DELETE the whole fact table. Keep other dates. Metadata should record which dates succeeded.",
              why: "Only the failed slice needs a redo.",
            },
          ],
          result:
            "Replace the business-date slice (partition delete or MERGE) before insert. Naive INSERT double-counts.",
        },
      ],
    },
    {
      heading: "Staging and metadata",
      body: "Staging is the kitchen counter: today’s raw extracts, rejects, maybe a few days of files. It is not for dashboards. Rows may be messy, duplicated, still in source codes.\n\nMetadata is data about the pipeline — the recipe card. Technical: types and source-to-target maps. Business: “one FACT_TRADE row is one fill”. Operational: last run, rows in, rows rejected. Without metadata you have a pile of tables, not a governed warehouse.",
      howTo: [
        "Classify: raw dated copy → staging; surrogate keys + grain → warehouse; run log / wiki grain sentence → metadata.",
        "Reconcile: extract − reject should equal loaded. Do not trust job SUCCESS alone.",
        "Rejects are a hospital. If analysts need them, model a warehouse fact, do not cube the reject file.",
        "Write the unit conversion in metadata (paise → crore) so the next person does not invent a factor.",
      ],
      bullets: [
        "Staging: land and check. Warehouse: conformed and keyed. Dashboards query the warehouse.",
        "Metadata: technical maps, business definitions, operational counts.",
        "Persistent staging lets you replay; transient staging needs the source to still have yesterday.",
      ],
      examples: [
        {
          title: "Tag four artefacts",
          prompt:
            "(1) STG_TRADE_20260407 byte-copy of the exchange file (2) FACT_TRADE with member_sk (3) ETL_JOB_LOG (4) “FACT_TRADE grain is one fill”.",
          steps: [
            {
              do: "(1) staging (2) warehouse fact (3) operational metadata (4) business metadata.",
              why: "Staging still looks like the source. Facts have warehouse keys. Logs describe the job, not the market. Grain is a definition.",
            },
            {
              do: "DIM_MEMBER is warehouse data, not metadata, even though it “describes” members.",
              why: "Metadata is data-about-data (maps, grain, run counts), not the dimension itself.",
            },
            {
              do: "A dashboard on STG_TRADE is the wrong layer even if a quiet day looks fine.",
              why: "Unconformed codes will bite on the next synonym (“Bombay” vs “Mumbai”).",
            },
          ],
          result:
            "(1) staging (2) warehouse fact (3) operational metadata (4) business metadata (grain).",
        },
        {
          title: "Count check catches an empty load",
          prompt:
            "Last night: extract 120000, reject 12, loaded 119988. Tonight: extract 120000, reject 12, loaded 0, job SUCCESS. What fails?",
          steps: [
            {
              do: "Check extract − reject = loaded. 119988 ≠ 0. Fail the SLA.",
              why: "Exit code 0 is not business success. Operational metadata must reconcile counts.",
            },
            {
              do: "Grain (business metadata) did not change — the run log did.",
              why: "This is an operational miss, not a modelling miss.",
            },
            {
              do: "If staging was truncated at the start, you must re-extract to replay. Persistent staging still holds the 120000.",
              why: "Replay needs either the landing zone or the source.",
            },
          ],
          result:
            "Reconciliation 120000 − 12 = 119988 ≠ 0. SUCCESS without that check is a silent empty load.",
        },
        {
          title: "Map one column in metadata",
          prompt:
            "Source t_qty is INTEGER paise. Target qty_cr is DECIMAL crore. Write the map and the factor (1 rupee = 100 paise, 1 crore rupees = 10^7 rupees).",
          steps: [
            {
              do: "Record source OMS.FILL.t_qty INTEGER → FACT_TRADE.qty_cr DECIMAL(18,4).",
              why: "Technical metadata is the wiring diagram so nobody reverse-engineers a 400-line script.",
            },
            {
              do: "1 crore rupees = 10^7 rupees = 10^9 paise, so qty_cr = t_qty / 1e9.",
              why: "A wrong 1e8 halves the market. Write the factor on the recipe card.",
            },
            {
              do: "Operational check: SUM(qty_cr) * 1e9 ≈ SUM(t_qty) for the run.",
              why: "Metadata plus a sum check catches unit bugs before a SEBI report.",
            },
          ],
          result:
            "Map t_qty INTEGER → qty_cr DECIMAL, formula t_qty/1e9 (paise to crore). Reconcile sums.",
        },
      ],
    },
    {
      heading: "Star versus snowflake, fact versus dimension, grain",
      body: "A star schema puts a fact table (the numbers) in the middle, like a sun, with denormalised dimension tables as rays — city, state, region all sit on DIM_MEMBER. A snowflake normalises those rays: member → city → state. Stars are simpler to query. Exams prefer star unless they stress tidy dimensions.\n\nGrain is a sentence: “one row per fill”, not a pile of column names. Additive facts (value) sum everywhere. Semi-additive (end-of-day position) sum across members on one date, not across dates. Non-additive (a ratio) must be recomputed after you add the parts.",
      howTo: [
        "Write the grain in one sentence. If two measures need different sentences, split the fact tables.",
        "Star: hierarchy columns on the dimension. Snowflake: extra tables and extra joins. Grain of the fact does not change.",
        "Ask of each measure: can I SUM across this axis? If not, last-of-period or recompute.",
        "High-cardinality id with no attributes → degenerate (store on the fact). Low-cardinality flags → junk dimension or fact flags.",
      ],
      bullets: [
        "Star: denormalised dimensions. Snowflake: normalised dimension hierarchy.",
        "Fact = measures at a grain. Dimension = who / what / where / when.",
        "Additive / semi-additive / non-additive. Grain is a sentence.",
      ],
      examples: [
        {
          title: "Reject mixed grain",
          prompt:
            "FACT_MARKET has fill_qty (many per day) and eod_position_qty (one per member-ISIN-day) on the same row. Why split?",
          steps: [
            {
              do: "fill_qty’s grain is one fill. eod_position_qty’s grain is one member-ISIN-day.",
              why: "Two different “what is one row?” answers cannot share a table.",
            },
            {
              do: "Repeating eod_position on every fill would multiply it when a user SUMs. Putting it on only one fill would hide it.",
              why: "SUM would mean two different things on the same row set.",
            },
            {
              do: "Split FACT_FILL and FACT_POSITION_DAILY. Share DIM_MEMBER, DIM_ISIN, DIM_DATE (conformed).",
              why: "You may drill across shared dimensions. You must not UNION mixed grains.",
            },
          ],
          result:
            "Illegal mixed grain. Per-fill fact and per-member-ISIN-day fact, conformed dimensions.",
        },
        {
          title: "Star or snowflake for geography",
          prompt:
            "DIM_MEMBER has city, state, region on the same row. A modeller splits DIM_GEO. Which is the star, and what SQL changes for “value by region”?",
          steps: [
            {
              do: "Star: region is a column on DIM_MEMBER. One join: fact JOIN member GROUP BY region.",
              why: "The sun’s ray already carries the whole address label.",
            },
            {
              do: "Snowflake: extra join to DIM_GEO. Mumbai appears once in GEO, not once per member.",
              why: "Normalising the hierarchy saves space and enforces city–state consistency. It costs a join.",
            },
            {
              do: "Fact grain is unchanged. A galaxy is two facts sharing dimensions, not a snowflake.",
              why: "Do not mix those words. SEBI “star schema” means the first picture.",
            },
          ],
          result:
            "Star keeps geo on DIM_MEMBER (one join). Snowflake adds DIM_GEO (two joins). Grain unchanged.",
        },
        {
          title: "Do not SUM snapshots across dates",
          prompt:
            "Position 1 Apr = 10, 2 Apr = 12. Fills on 2 Apr: +3 and −1. Which sums are legal?",
          steps: [
            {
              do: "Do not add 10+12 = 22 as “the position”. Take last-of-period (12) or an average if asked.",
              why: "eod_qty is a photo. Two photos are not two piles of stock. Semi-additive: sum across members on one date, not across dates.",
            },
            {
              do: "Fills +3 + (−1) = +2, and you may SUM fills across dates.",
              why: "Fill qty is additive, like counting coins.",
            },
            {
              do: "A ratio eod / issued_capital is non-additive: divide after you aggregate the parts.",
              why: "Sum of ratios ≠ ratio of sums. Exam shortcut: money and fills additive; balances semi; percentages non.",
            },
          ],
          result:
            "Do not SUM eod_qty across dates. SUM fill_qty freely. Recompute ratios after aggregation.",
        },
      ],
    },
    {
      heading: "Warehouse versus mart, and the cube",
      body: "A warehouse is the whole school’s shared filing room with one spelling of “Mumbai”. A data mart is one department’s slice (surveillance, HR). Dependent marts are filled from the warehouse and stay consistent. Independent marts built from source systems drift (“Mumbai” vs “Bombay”) and cannot be drilled across.\n\nA cube is a grid of measures indexed by dimensions — Product × Region × Quarter. MOLAP stores the grid; ROLAP is SQL on the star; HOLAP mixes. Slice/dice/roll-up reshape what you see; they do not change the fact grain underneath.",
      howTo: [
        "Disagreeing city names across teams → independent marts. Fix: one conformed DIM_MEMBER, dependent marts.",
        "“Normalised EDW plus departmental stars” → Inmon. “Bus of conformed dimensions” → Kimball.",
        "Cube without a stored grid can still be a SQL GROUP BY. Drill to fills needs fill grain, not a pre-summed PRQ cube.",
        "A filtered view of the warehouse is still a (logical) dependent mart. It is not staging and not a cube.",
      ],
      bullets: [
        "Warehouse: enterprise, conformed. Mart: subject area. Dependent marts inherit conformity.",
        "Independent marts from sources cause inconsistent dimensions.",
        "Cube: measure indexed by dimensions. MOLAP / ROLAP / HOLAP is storage.",
      ],
      examples: [
        {
          title: "Independent marts split one member",
          prompt:
            "Surveillance DIM_MEMBER: M1 city Mumbai. Finance: M1 city Bombay. A board pack joins alerts-by-city to fees-by-city. What breaks?",
          steps: [
            {
              do: "M1 becomes two cities. Alerts sit in Mumbai, fees in Bombay. Drill-across is wrong.",
              why: "Each mart is “correct” inside itself. The shared word “city” is not shared meaning.",
            },
            {
              do: "Fix with one warehouse DIM_MEMBER (city standardised in Transform). Both marts load from it.",
              why: "Dependent marts inherit the same member_sk and the same city spelling.",
            },
            {
              do: "A one-off REPLACE('Bombay','Mumbai') in the board pack is not conformity.",
              why: "The next synonym (“Bom”) breaks it again. Conform in ETL.",
            },
          ],
          result:
            "Drill-across splits M1. Conformed DIM_MEMBER in a warehouse (dependent marts), not two source-fed marts.",
        },
        {
          title: "MOLAP versus ROLAP on a tiny cube",
          prompt:
            "50 products × 8 regions × 20 quarters. User asks value by Product only (roll-up the other axes). Where is the work?",
          steps: [
            {
              do: "Base cube is 8000 cells. MOLAP can answer Product-only from a stored aggregate. ROLAP GROUP BYs the star (maybe millions of fills).",
              why: "MOLAP did some sums in advance, like a times-table. ROLAP computes on demand.",
            },
            {
              do: "HOLAP might keep detail relational and store Product-only in MOLAP. This query then hits MOLAP.",
              why: "Hybrid is “some cheat-sheets, plus the raw notebook”.",
            },
            {
              do: "If the cube grain is already Product-Region-Quarter, you cannot drill to one fill. That is grain, not MOLAP vs ROLAP.",
              why: "Operators cannot invent detail that was summed away.",
            },
          ],
          result:
            "MOLAP uses a stored/array aggregate; ROLAP GROUP BYs the star. Drill to fills needs fact grain.",
        },
        {
          title: "A view can still be a mart",
          prompt:
            "CREATE VIEW mart_surv_fill AS SELECT … FROM fact_fill JOIN dim_member WHERE member_type = 'Broker'. Extra tables? Cube? Staging?",
          steps: [
            {
              do: "Dependent logical mart: brokers only, keys still conformed, sourced from the warehouse.",
              why: "Subject slice + from the warehouse = mart, even with no extra physical tables.",
            },
            {
              do: "Not a cube (no stored multidimensional sums). Not staging (rows are already tidy warehouse rows).",
              why: "The FROM clause is the tell. Staging would still look like the source file.",
            },
            {
              do: "A physical mart would COPY the filtered star for isolation. Access control on the view is a reason to have a logical mart anyway.",
              why: "Mart is about subject and governance, not only extra disks.",
            },
          ],
          result:
            "Dependent logical mart (broker-filtered view). Not a cube, not staging.",
        },
      ],
    },
    {
      heading: "OLAP: slice, dice, roll-up, drill-down",
      body: "Hold this toy cube. Product {Equity, Debt, MF} × Region {East, West} × Quarter {Q1, Q2}. Measure = turnover. Cells: Equity-East 12,15; Equity-West 8,10; Debt-East 6,7; Debt-West 9,11; MF-East 4,5; MF-West 3,6. Grand total 96.\n\nSlice fixes one dimension to one value (cut one layer of a cake) and drops that axis. Dice keeps a subcube by restricting two or more dimensions (a smaller box). Roll-up sums up a hierarchy or drops an axis (quarters → year). Drill-down is the inverse. Pivot rotates axes; numbers do not change.",
      howTo: [
        "Write the surviving cells, then add. Vocabulary without the number scores poorly.",
        "One equality on one dimension → slice. Two filters or a list/range → dice.",
        "Roll-up of an additive measure keeps the grand total. Slice/filter changes it.",
        "SQL: WHERE is slice/dice; GROUP BY with fewer columns is roll-up.",
      ],
      bullets: [
        "Slice: one dimension fixed to one value. Dice: restrict ≥2 dimensions.",
        "Roll-up: coarser hierarchy or drop an axis (SUM). Drill-down: finer.",
        "Pivot changes layout, not cell values. This page’s cube totals 96.",
      ],
      examples: [
        {
          title: "Slice Product = Equity",
          prompt:
            "Slice the 96-cube where Product = Equity. Write Region × Quarter and the slice total.",
          steps: [
            {
              do: "Four cells: East-Q1=12, East-Q2=15, West-Q1=8, West-Q2=10. Total 45.",
              why: "You fixed Product to one value and dropped that axis — a 2-D layer, like one cake slice.",
            },
            {
              do: "Debt and MF (51) are gone. Grand total is no longer 96.",
              why: "A slice filters. Roll-up would have kept everyone and only thickened the time axis.",
            },
            {
              do: "SQL analogue: WHERE product = 'Equity' GROUP BY region, quarter.",
              why: "WHERE is the slice; GROUP BY is the remaining axes.",
            },
          ],
          result: "Equity slice: 12, 15, 8, 10. Total 45.",
        },
        {
          title: "Dice Equity+Debt and Region = West",
          prompt:
            "Dice to Product ∈ {Equity, Debt} and Region = West, both quarters. List cells and total. What would a West-only slice (keeping MF) have totalled?",
          steps: [
            {
              do: "Cells: Equity-West 8,10 and Debt-West 9,11. Total 38.",
              why: "Two dimensions restricted → dice. MF-West 3+6 = 9 was excluded by the product list.",
            },
            {
              do: "Slice Region = West alone would keep MF too: 38+9 = 47.",
              why: "Dice is the smaller box. Slice West is “one layer including MF”.",
            },
            {
              do: "If the paper wants numbers, compute cells first; do not argue slice vs dice vocabulary without the total.",
              why: "Marks sit on 38, not on the dictionary fight.",
            },
          ],
          result: "Cells 8, 10, 9, 11 total 38. West slice including MF would be 47.",
        },
        {
          title: "Roll-up Quarter to Year, then drop Region",
          prompt:
            "(a) Year = Q1+Q2 for each Product × Region. (b) From the base cube, drop Region (Product × Quarter). Contrast with an East slice.",
          steps: [
            {
              do: "Year: Equity East/West 27, 18; Debt 13, 20; MF 9, 9. Total still 96.",
              why: "Roll-up of an additive measure keeps the grand total. You did not drop Debt; you folded time.",
            },
            {
              do: "Drop Region: Equity-Q1=20, Q2=25; Debt 15, 18; MF 7, 11. Total 96.",
              why: "East+West for each Product-Quarter. Still a roll-up (axis dropped), not a slice.",
            },
            {
              do: "East slice total is 12+15+6+7+4+5 = 49, because West is discarded, not summed in.",
              why: "If the grand total left 96, you rolled up or pivoted. If it became 49, you sliced/filtered. Pivot would keep every cell 12, 15, … and still 96.",
            },
          ],
          result:
            "Year table totals 96. Product×Quarter after dropping Region also 96. East slice is 49, not a roll-up.",
        },
      ],
    },
    {
      heading: "Slowly changing dimensions Type 1 and Type 2",
      body: "Dimensions change: a broker moves city. Slowly changing dimension (SCD) policy says what the warehouse does. Type 1 overwrites the attribute — history of that label is lost; old facts now wear the new city, like correcting a spelling on a name-tag. Type 2 inserts a new dimension row with a new surrogate key, closes the old row, and leaves old facts on the old key — like issuing a new library card when you move house, and keeping old loans on the old card.\n\nFacts store the surrogate that was current at event time, not the natural key. Lookup is (natural key + business date), never “always the is_current row” for historical fills.",
      howTo: [
        "Does history of the attribute matter for the report? Yes → Type 2. Typo / “never was true” → Type 1.",
        "Type 2: close old row (end_date, is_current=N), insert new sk, same natural key, new city.",
        "Stamp facts by trade_date between effective_from and effective_to — not by load_date.",
        "Do not Type-2 a fact table. Fills already are history.",
      ],
      bullets: [
        "Type 1: overwrite; old facts appear under the new label.",
        "Type 2: new row + new surrogate; old facts keep the old version.",
        "Facts point at surrogate keys if you want Type-2 history to work.",
      ],
      examples: [
        {
          title: "Type 1 overwrite of city",
          prompt:
            "DIM sk=7 BR1 Pune. Two facts on sk 7: 1 Jan qty 10, 1 Jun qty 20. Move to Mumbai on 1 May. Apply Type 1. SUM(qty) GROUP BY city?",
          steps: [
            {
              do: "UPDATE city = 'Mumbai' on sk 7. Still one row. Facts untouched.",
              why: "Type 1 is a sticker change. No new library card.",
            },
            {
              do: "Both trades now display Mumbai. GROUP BY city: Mumbai 30, Pune 0.",
              why: "January’s Pune history is gone. All facts that pointed at 7 wear the new label.",
            },
            {
              do: "Use Type 1 for “Punr” → “Pune” (never true). Use Type 2 if a regulator will ask “where was this broker in January?”.",
              why: "The sentence “does history matter?” picks the type.",
            },
          ],
          result:
            "One DIM row city=Mumbai. Both trades (30 qty) group under Mumbai. January’s Pune is lost.",
        },
        {
          title: "Type 2 versioning of the same move",
          prompt:
            "Same start. Assign sk 88 to the Mumbai version. Walk fact keys and GROUP BY city.",
          steps: [
            {
              do: "Close sk 7 (Pune, end 30 Apr). Insert sk 88 (Mumbai, from 1 May, current).",
              why: "Two cards, same legal name BR1, different cities and dates.",
            },
            {
              do: "1 Jan fact stays on 7. 1 Jun fact uses 88. GROUP BY city: Pune 10, Mumbai 20. Natural key BR1 still sums to 30.",
              why: "Event-time geography is preserved. You can still roll up the legal entity on broker_id.",
            },
            {
              do: "A lookup that always uses is_current = Y would wrongly hang January on Mumbai.",
              why: "Point-in-time lookup is natural key + trade_date in the effective range.",
            },
          ],
          result:
            "sk7 Pune closed, sk88 Mumbai current. Jan 10 stays Pune; Jun 20 is Mumbai. BR1 still totals 30.",
        },
        {
          title: "Late fill: event date, not load date",
          prompt:
            "sk7 Pune until 30 Apr 2026, sk88 Mumbai from 1 May. A fill arrives 1 Jun with trade_date 15 Mar. Which sk?",
          steps: [
            {
              do: "15 Mar 2026 is in the Pune window → stamp sk 7.",
              why: "Type-2 lookup is when the trade happened, not when the file showed up. Load date is the postmark, not the exam date.",
            },
            {
              do: "Using load_date 1 Jun would stamp 88 and rewrite March geography — a sloppy Type-1 corruption.",
              why: "The fact would lie about where the broker was.",
            },
            {
              do: "If two versions overlap on a date, reject the row. If none cover, stub then restate.",
              why: "Broken effective dates are a dimension bug, not a guess.",
            },
          ],
          result: "Stamp sk 7 (Pune). Event date chooses the Type-2 version, not load date.",
        },
      ],
    },
  ],
};
