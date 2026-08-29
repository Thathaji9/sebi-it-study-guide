import type { TopicNote } from "@/data/notes";

export const notesWarehouse: TopicNote = {
  topic: "warehouse",
  title: "Data warehouse — simple notes",
  blurb:
    "We explain a data warehouse like class notes a Class-10 student can read: a store-room of yesterday’s shop ledgers, boxes wiped and put on labelled shelves, a cube you can slice. Then we solve five tiny examples in each topic, one job or one number at a time.",
  blocks: [
    {
      heading: "ETL: extract, transform, load",
      body: "A data warehouse is a big store-room of yesterday’s shop ledgers. The live till still rings in the shop. The warehouse only keeps a calm copy so you can ask questions later. ETL is how the copy arrives: pick the boxes off the van (Extract), wipe the dust and rewrite the labels (Transform), then put them on labelled shelves (Load).\n\nThe exam order is Extract → Transform → Load. Load the “who / what / when” shelves (dimensions) before the number boxes (facts), because facts store those shelf numbers. ELT dumps the raw bag into a lake first, then cleans inside. Write E-T-L unless the paper names a lake. Live trading numbers are OLTP. Yesterday’s tidy snapshot is the warehouse. Do not mix the two jobs.",
      howTo: [
        "Name the job: copy the file = Extract; clean, rename, or look up keys = Transform; insert into FACT_ = Load.",
        "Put dimension shelves up first, then facts. A missing broker key needs a stub row before the fact.",
        "If you run the same date twice, wipe that date’s slice first so you do not count twice.",
        "Live till = OLTP. Yesterday’s store-room = warehouse. Do not mix the jobs.",
        "If they say data lake / ELT, land the raw bag first, then clean inside.",
      ],
      bullets: [
        "Warehouse = a store-room of yesterday’s shop ledgers, not the live till.",
        "ETL order: Extract → Transform → Load.",
        "Load dimensions (who / what / when) before facts (the numbers).",
        "ELT lands raw first, then transforms. Exams still want E-T-L unless they name a lake.",
        "Rerun a date by replacing that slice, not by inserting again.",
      ],
      examples: [
        {
          title: "Place five jobs on the timeline",
          prompt:
            "Jobs: (A) lookup member_sk, (B) copy yesterday’s trade file, (C) bulk insert FACT_TRADE, (D) map city “BOM” → “Mumbai”, (E) reject qty ≤ 0. Order them.",
          steps: [
            {
              do: "B copies yesterday’s trade file. That is Extract. The store-room has not changed yet.",
              why: "Extract is picking the boxes off the van. You have not wiped them yet.",
            },
            {
              do: "E, D, and A are Transform: throw bad qty, rewrite BOM as Mumbai, stamp warehouse keys. Then C is Load.",
              why: "Wipe dust and write labels before you put boxes on the shelves. Do not load numbers before the labels exist.",
            },
            {
              do: "Write the order: B → E → D → A → C.",
              why: "Pick boxes, throw rotten ones, rewrite labels, stamp IDs, then put them on the shelves.",
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
              do: "If the fact needs a real broker_sk and BR9 is missing, the load should fail.",
              why: "Facts point at dimension keys the way a marksheet points at a roll number that must exist.",
            },
            {
              do: "If you allow a blank broker_sk, BR9 piles into “unknown”. The number loaded, but you cannot cut by broker.",
              why: "A silent unknown shelf is worse than a loud fail. You lost that slice of the cube.",
            },
            {
              do: "Correct: put a stub broker row on the shelf first, then load the fact with that key. Later fill in the proper name (Type 1 or Type 2).",
              why: "Late-arriving dimension = the person showed up in the numbers before their name card.",
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
              do: "A second INSERT of 2026-04-06 would pile the same boxes again and double every total.",
              why: "The van will send the same file again. Load must replace that date, not stack on top.",
            },
            {
              do: "DELETE or TRUNCATE that date’s slice, then INSERT, or MERGE on (exchange_trade_id, trade_date).",
              why: "Wipe that chalkboard date, then rewrite it. A second run should leave the same store-room.",
            },
            {
              do: "Do not empty the whole fact table. Keep other dates. Write in the log which dates succeeded.",
              why: "Only the failed day’s shelf needs a redo.",
            },
          ],
          result:
            "Replace the business-date slice (partition delete or MERGE) before insert. Naive INSERT double-counts.",
        },
        {
          title: "ELT lands raw first",
          prompt:
            "Jobs: (F) copy the NSE fill file into a lake folder, (G) reject qty ≤ 0 inside the lake, (H) map “BOM” → “Mumbai” in a lake table, (I) lookup member_sk, (J) INSERT FACT_TRADE. Label ETL vs ELT and order them.",
          steps: [
            {
              do: "F is still Extract. In ELT you next dump the raw bag into the lake. That landing is the first Load.",
              why: "ELT unpacks groceries into the fridge first, then chops inside the kitchen. Same three jobs, different room.",
            },
            {
              do: "G, H, I are Transform in the lake (reject, rewrite names, stamp keys). J is the modelled Load into the star.",
              why: "Do not look up keys for doomed rows. Do not load facts before keys exist — that rule did not vanish.",
            },
            {
              do: "ELT order: F → land raw (lake) → G → H → I → J. If they say “classical warehouse”, write Extract → Transform → Load.",
              why: "Name the lake and they want ELT. Name a warehouse and they still want E-T-L.",
            },
            {
              do: "F is not Transform. Copying bytes is Extract even when the destination is a lake.",
              why: "Transform is clean / rename / lookup, not “the file moved”.",
            },
            {
              do: "Live shop position is still OLTP. Yesterday’s lake copy is not the trading book.",
              why: "ELT does not turn the store-room into a live till. Do not mix the jobs.",
            },
          ],
          result:
            "ELT: F extract, land raw, then G/H/I transform, then J load the star. Sequence F → land → G → H → I → J.",
        },
        {
          title: "Date dimension before member before fact",
          prompt:
            "Tonight’s batch: DIM_DATE for 2026-08-21 is missing, new member MP44 is missing, 900 fills wait. In which order do you load, and what if you skip DIM_DATE?",
          steps: [
            {
              do: "Load DIM_DATE first (the calendar card), then DIM_MEMBER (stub MP44 if the name file is late), then FACT_FILL with those keys.",
              why: "Facts store shelf numbers. The calendar shelf and the member shelf must exist first.",
            },
            {
              do: "If FACT_FILL is loaded with a missing date_sk, the load fails — or every fill piles into Unknown date.",
              why: "A silent unknown date wrecks every time slice. Fail loud or stub on purpose. Do not skip.",
            },
            {
              do: "Late MP44: insert a stub member row (natural key MP44, name = 'Unknown'), load the 900 fills on that member_sk, later Type-1 or Type-2 the proper name.",
              why: "The person arrived in the numbers before their name card. Stub first, then the fact.",
            },
            {
              do: "Do not load 900 facts and “do dimensions later”. You would have to rewrite every key.",
              why: "Dimensions before facts is the nightly rule, not a preference.",
            },
            {
              do: "One shared DIM_DATE is enough. Other facts reuse it.",
              why: "One calendar spelling keeps every report honest when they join on date.",
            },
          ],
          result:
            "DIM_DATE, then stub DIM_MEMBER for MP44, then FACT_FILL. Fact-first fails the date FK or dumps fills into Unknown.",
        },
      ],
    },
    {
      heading: "Staging and metadata",
      body: "Staging is the kitchen counter by the store-room door. Today’s raw boxes land there: messy, maybe duplicated, still in shop codes. It is not for dashboards. Keep a few days of files so you can replay a bad night.\n\nMetadata is the recipe card on the wall — data about the pipeline, not the sales themselves. Technical: types and source-to-target maps. Business: “one FACT_TRADE row is one fill”. Operational: last run, rows in, rows rejected. Without that card you have a pile of tables, not a governed warehouse. extract minus reject should equal loaded. Do not trust job SUCCESS alone.",
      howTo: [
        "Tag the artefact: raw dated copy → staging; keys + grain → warehouse; run log / grain sentence → metadata.",
        "Check the count: extract − reject should equal loaded.",
        "Rejects are a hospital. If analysts need them, model a real warehouse fact. Do not cube the reject file.",
        "Write the unit conversion on the recipe card (paise → crore) so the next person does not invent a factor.",
        "Persistent staging lets you replay. Transient staging needs the shop to still have yesterday.",
      ],
      bullets: [
        "Staging = kitchen counter. Warehouse = labelled shelves. Dashboards query the warehouse.",
        "Metadata = the recipe card: maps, grain sentences, run counts.",
        "extract − reject = loaded. SUCCESS alone is not enough.",
        "Persistent staging keeps the bag so you can replay. Transient staging throws it away.",
        "Do not point a cube at staging or at rejects.",
      ],
      examples: [
        {
          title: "Tag four artefacts",
          prompt:
            "(1) STG_TRADE_20260407 byte-copy of the exchange file (2) FACT_TRADE with member_sk (3) ETL_JOB_LOG (4) “FACT_TRADE grain is one fill”.",
          steps: [
            {
              do: "(1) staging (2) warehouse fact (3) operational metadata (4) business metadata.",
              why: "Staging still looks like the shop file. Facts have warehouse keys. Logs describe the job. Grain is a definition.",
            },
            {
              do: "DIM_MEMBER is warehouse data, not metadata, even though it “describes” members.",
              why: "Metadata is data-about-data (maps, grain, run counts), not the dimension itself.",
            },
            {
              do: "A dashboard on STG_TRADE is the wrong layer even if a quiet day looks fine.",
              why: "Uncleaned shop codes will bite on the next synonym (“Bombay” vs “Mumbai”).",
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
              why: "Exit code 0 is not business success. The recipe card must reconcile counts.",
            },
            {
              do: "The grain sentence did not change. The run log did.",
              why: "This is an operational miss, not a modelling miss.",
            },
            {
              do: "If staging was emptied at the start, you must re-extract to replay. Persistent staging still holds the 120000.",
              why: "Replay needs either the kitchen counter or the shop still having yesterday.",
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
              why: "The recipe card plus a sum check catches unit bugs before a report goes out.",
            },
          ],
          result:
            "Map t_qty INTEGER → qty_cr DECIMAL, formula t_qty/1e9 (paise to crore). Reconcile sums.",
        },
        {
          title: "Persistent staging lets you replay Tuesday",
          prompt:
            "Tuesday extract 88000 fills landed in STG_FILL_20260825. The warehouse load failed after truncate of that date. The exchange now only keeps Wednesday. Can you replay Tuesday?",
          steps: [
            {
              do: "Persistent staging still holds the 88000. Replay Transform + Load from STG_FILL_20260825 without calling the exchange.",
              why: "The kitchen counter kept yesterday’s bag. That is the point of a dated landing zone.",
            },
            {
              do: "Transient staging that emptied itself at 06:00 cannot replay — the shop no longer has Tuesday.",
              why: "If you throw the bag away, you need the shop to still have the list. Here it does not.",
            },
            {
              do: "Job SUCCESS on Wednesday does not repair Tuesday’s empty fact shelf. The run log should show Tuesday loaded = 0.",
              why: "Exit code 0 on a later date is not a backfill. Check the log per business date.",
            },
            {
              do: "Do not cube STG_FILL. Analysts query FACT_FILL after keys and rejects.",
              why: "Staging may be messy, duplicated, still in shop codes. Dashboards belong on the warehouse.",
            },
            {
              do: "Keep a few days of persistent files so a late reject fix can be re-run. Metadata should name how long you keep STG.",
              why: "Without the recipe card (how long we keep STG), the next operator guesses.",
            },
          ],
          result:
            "Persistent STG_FILL_20260825 can replay Tuesday. Transient staging cannot once the exchange dropped the day.",
        },
        {
          title: "Rejects are a hospital, not a cube",
          prompt:
            "Last night: extract 50000, reject 40 (qty ≤ 0), loaded 49960. Surveillance wants a chart of the 40 rejects by broker. Where do the 40 rows live?",
          steps: [
            {
              do: "The 40 rows sit in a reject file / STG_REJECT — the hospital. extract − reject = 49960 matches loaded.",
              why: "The recipe card must reconcile. Do not trust SUCCESS alone.",
            },
            {
              do: "Do not point a cube at STG_REJECT. Codes are uncleaned and grain is “failed row”, not “fill”.",
              why: "A dashboard on the kitchen counter will break on the next synonym.",
            },
            {
              do: "If analysts truly need reject counts, model a small warehouse fact (grain: one rejected extract row) with a tidy DIM_BROKER, then mart from that.",
              why: "Promote it on purpose. Do not pretend the reject file is FACT_TRADE.",
            },
            {
              do: "The 49960 loaded rows are warehouse facts. Mixing them with 40 rejects in one SUM would lie about turnover.",
              why: "Rejected qty ≤ 0 must not enter market totals.",
            },
            {
              do: "Write “reject reason = qty ≤ 0” in business metadata so the next person does not invent a new rule.",
              why: "Metadata is the recipe card. The hospital needs a diagnosis label.",
            },
          ],
          result:
            "40 rows stay in reject/staging. Cube the warehouse, not the hospital. Promote rejects only if you model a real fact.",
        },
      ],
    },
    {
      heading: "Star versus snowflake, fact versus dimension, grain",
      body: "A star puts one fact table in the middle like a sun, with dimension tables as rays. City, state, and region all sit on DIM_MEMBER. A snowflake splits those rays further: member → city → state. Stars are simpler to query. Exams prefer star unless they stress tidy dimensions.\n\nGrain is one sentence: “one row per fill”, not a pile of column names. Additive facts (value) sum everywhere. Semi-additive (end-of-day position) sum across members on one date, not across dates — two photos are not two piles. Non-additive (a ratio) must be recomputed after you add the parts. Fact = the numbers at that grain. Dimension = who / what / where / when.",
      howTo: [
        "Write the grain in one sentence. If two measures need different sentences, split the fact tables.",
        "Star: hierarchy columns on the dimension. Snowflake: extra tables and extra joins. Grain of the fact does not change.",
        "Ask of each measure: can I SUM across this axis? If not, last-of-period or recompute.",
        "High-cardinality id with no attributes → store it on the fact (degenerate). Tiny flags → junk dimension or fact flags.",
        "Do not answer “snowflake it” when the bug is a mixed grain or a SUM of ratios.",
      ],
      bullets: [
        "Star = one fact table in the middle like a sun. Dimensions are the rays.",
        "Snowflake = those rays split further (city → state).",
        "Fact = measures at a grain. Dimension = who / what / where / when.",
        "Grain is a sentence: “one row per fill”.",
        "Additive / semi-additive / non-additive. Sum of ratios ≠ ratio of sums.",
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
              do: "Split FACT_FILL and FACT_POSITION_DAILY. Share DIM_MEMBER, DIM_ISIN, DIM_DATE (same spelling).",
              why: "You may join on shared dimensions. You must not UNION mixed grains.",
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
              why: "Splitting the ray further saves space and keeps city–state consistent. It costs a join.",
            },
            {
              do: "Fact grain is unchanged. A galaxy is two facts sharing dimensions, not a snowflake.",
              why: "Do not mix those words. “Star schema” on the paper means the first picture.",
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
        {
          title: "Degenerate trade_id sits on the fact",
          prompt:
            "Each fill has exchange_trade_id (high-cardinality, no city/name attributes) and a side flag B/S. Star design: where does each go?",
          steps: [
            {
              do: "Put exchange_trade_id on FACT_FILL. That is a degenerate dimension — an id with no dimension table.",
              why: "A dimension table with only the id would be a shadow of the fact. High-cardinality id, no extra labels → store on the fact.",
            },
            {
              do: "Do not snowflake a DIM_TRADE_ID with one column. It adds a join and no extra labels.",
              why: "Snowflake is for a real split (city → state), not for a lonely ticket number.",
            },
            {
              do: "Side B/S is a tiny flag. Keep it on the fact or pack it in a junk dimension with other flags (odd-lot, auction).",
              why: "Tiny flags should not explode into three mini-dimensions. Junk = a grab-bag of leftover codes.",
            },
            {
              do: "Grain sentence stays “one row per fill”. The extra id does not change grain.",
              why: "Grain is a sentence, not a pile of extra columns.",
            },
            {
              do: "A user still GROUP BYs venue and date; they rarely GROUP BY exchange_trade_id except to look up one fill.",
              why: "Degenerate keys are for trace-back to the exchange, not for a region report.",
            },
          ],
          result:
            "exchange_trade_id is degenerate on the fact. Side is a fact flag or junk dimension. No DIM_TRADE_ID table.",
        },
        {
          title: "Do not SUM a ratio across members",
          prompt:
            "Member MP7 issued 100, held 25 (ratio 0.25). MP8 issued 100, held 5 (ratio 0.05). A report SUMs the two ratios to 0.30. What should it print instead?",
          steps: [
            {
              do: "held/issued is non-additive. 0.25+0.05 = 0.30 is not “the book’s share”.",
              why: "Sum of ratios ≠ ratio of sums. Exam shortcut: money and fills additive; balances semi; percentages non.",
            },
            {
              do: "Recompute after you add the parts: (25+5)/(100+100) = 30/200 = 0.15.",
              why: "Store the additive parts (held_qty, issued_qty) on the fact. Divide in the query or cube formula.",
            },
            {
              do: "You may SUM held_qty across members on one date. You may not SUM eod held_qty across dates (semi-additive photo).",
              why: "Two photos are not two piles. Last-of-period or average if they ask a week.",
            },
            {
              do: "If issued_qty lives on DIM_ISIN, join then divide. Do not hide the ratio as the only stored measure.",
              why: "A stored-only percentage cannot be rolled up honestly.",
            },
            {
              do: "A star vs snowflake choice does not fix this. Grain and additivity are measure questions.",
              why: "Do not answer “snowflake it” when the bug is a non-additive SUM.",
            },
          ],
          result:
            "Print 0.15 from (25+5)/(100+100), not 0.30. Store additive parts; recompute the ratio after aggregation.",
        },
      ],
    },
    {
      heading: "Warehouse versus mart, and the cube",
      body: "The warehouse is the whole store-room with one spelling of “Mumbai”. A data mart is one department’s smaller room (surveillance, HR). Dependent marts are filled from the warehouse and stay consistent. Independent marts built from the shop files drift (“Mumbai” vs “Bombay”) and cannot be joined fairly. A cube is a 3D box of sales by city / product / month — a grid of measures indexed by dimensions.\n\nMOLAP stores the grid; ROLAP is SQL on the star; HOLAP mixes. Slice, dice, and roll-up reshape what you see; they do not change the fact grain underneath. “Normalised EDW plus departmental stars” is Inmon. “Bus of shared dimensions” is Kimball. A filtered view of the warehouse is still a (logical) dependent mart. It is not staging and not a cube.",
      howTo: [
        "Disagreeing city names across teams → independent marts. Fix: one shared DIM_MEMBER, dependent marts.",
        "“Normalised EDW plus departmental stars” → Inmon. “Bus of shared dimensions” → Kimball.",
        "Cube without a stored grid can still be a SQL GROUP BY. Drill to fills needs fill grain, not a pre-summed cube.",
        "A filtered view of the warehouse is still a dependent mart. It is not staging and not a cube.",
        "Dependent = inherit the store-room spelling. Independent = each room extracts from the shop and drifts.",
      ],
      bullets: [
        "Warehouse = the whole store-room. Mart = one department’s smaller room.",
        "Dependent marts inherit one spelling. Independent marts from shop files drift.",
        "Cube = a 3D box of sales by city / product / month.",
        "MOLAP stores the grid. ROLAP is SQL on the star. HOLAP mixes.",
        "Slice / dice / roll-up change the view, not the fact grain.",
      ],
      examples: [
        {
          title: "Independent marts split one member",
          prompt:
            "Surveillance DIM_MEMBER: M1 city Mumbai. Finance: M1 city Bombay. A board pack joins alerts-by-city to fees-by-city. What breaks?",
          steps: [
            {
              do: "M1 becomes two cities. Alerts sit in Mumbai, fees in Bombay. The join across rooms is wrong.",
              why: "Each small room is “correct” inside itself. The shared word “city” is not shared meaning.",
            },
            {
              do: "Fix with one warehouse DIM_MEMBER (city standardised in Transform). Both marts load from it.",
              why: "Dependent rooms inherit the same member_sk and the same city spelling.",
            },
            {
              do: "A one-off REPLACE('Bombay','Mumbai') in the board pack is not conformity.",
              why: "The next synonym (“Bom”) breaks it again. Clean the name in ETL.",
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
              do: "Base cube is 8000 cells. MOLAP can answer Product-only from a stored sum. ROLAP GROUP BYs the star (maybe millions of fills).",
              why: "MOLAP did some sums in advance, like a times-table. ROLAP computes on demand.",
            },
            {
              do: "HOLAP might keep detail in tables and store Product-only in MOLAP. This query then hits MOLAP.",
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
              do: "Dependent logical mart: brokers only, keys still shared, sourced from the warehouse.",
              why: "Subject slice + from the store-room = mart, even with no extra physical tables.",
            },
            {
              do: "Not a cube (no stored 3D sums). Not staging (rows are already tidy warehouse rows).",
              why: "The FROM clause is the tell. Staging would still look like the shop file.",
            },
            {
              do: "A physical mart would COPY the filtered star for isolation. Access control on the view is a reason to have a logical mart anyway.",
              why: "Mart is about subject and who may see it, not only extra disks.",
            },
          ],
          result:
            "Dependent logical mart (broker-filtered view). Not a cube, not staging.",
        },
        {
          title: "Kimball bus versus Inmon filing room",
          prompt:
            "Team A: “conformed DIM_MEMBER and DIM_DATE shared by FACT_FILL and FACT_FEE (bus).” Team B: “3NF enterprise tables first, then a surveillance star.” Name the schools. Can both still have dependent marts?",
          steps: [
            {
              do: "Team A is Kimball: a bus of shared dimensions, facts plug in like bus stops.",
              why: "The exam phrase “bus of conformed dimensions” is Kimball’s poster.",
            },
            {
              do: "Team B is Inmon: a normalised enterprise warehouse first, then departmental stars as marts.",
              why: "“Normalised EDW plus departmental stars” is Inmon’s poster.",
            },
            {
              do: "Dependent marts exist in both pictures: they are filled from the shared store-room, not from raw shop files.",
              why: "Dependent = inherit spelling. Independent = each team extracts from source and drifts.",
            },
            {
              do: "If surveillance and finance both extract city from two shop copies, you get Mumbai vs Bombay — independent marts, not either school done well.",
              why: "The failure mode is source-fed small rooms, not the Kimball/Inmon slogan.",
            },
            {
              do: "A cube on top is storage (MOLAP/ROLAP). It does not pick Kimball vs Inmon.",
              why: "Do not mix architecture words with cube storage words.",
            },
          ],
          result:
            "A = Kimball bus. B = Inmon EDW then stars. Both can have dependent marts; independent source-fed marts still drift.",
        },
        {
          title: "Two dependent marts drill-across on DIM_DATE",
          prompt:
            "MART_SURV has alerts by date_sk. MART_FEE has fees by the same date_sk from warehouse DIM_DATE. Board pack: alerts and fees for 2026-08-21. Why does this join work when Bombay/Mumbai did not?",
          steps: [
            {
              do: "Both marts store the same date_sk from one DIM_DATE. 2026-08-21 is one row, one key.",
              why: "Shared dimension = shared meaning, shared key. Drill-across is a join on that key.",
            },
            {
              do: "The earlier Mumbai/Bombay split was two independent member dimensions. Here date was not independently rebuilt.",
              why: "Dependent rooms inherit the store-room calendar. Independent rooms invent their own.",
            },
            {
              do: "You still cannot UNION alert rows with fee rows — different grains. You join sums on date_sk.",
              why: "Drill-across is “same dimensions, separate facts”, not “one mixed-grain fact”.",
            },
            {
              do: "If MART_FEE had used load_date instead of business date_sk, 21 Aug fees could sit on 22 Aug and the pack would lie.",
              why: "Share the grain of time too: event date, not the ETL postmark, unless the report is about load lag.",
            },
            {
              do: "A filtered view of FACT_FEE for one desk is still a dependent logical mart. Extra disks are optional.",
              why: "Mart is subject + who may see it, not only extra tables.",
            },
          ],
          result:
            "Join both marts on shared date_sk for 2026-08-21. Works because DIM_DATE is conformed, unlike two source-fed city lists.",
        },
      ],
    },
    {
      heading: "OLAP: slice, dice, roll-up, drill-down",
      body: "Hold a cube: a 3D box of sales by product, region, and quarter. Product {Equity, Debt, MF} × Region {East, West} × Quarter {Q1, Q2}. Measure = turnover. Cells: Equity-East 12,15; Equity-West 8,10; Debt-East 6,7; Debt-West 9,11; MF-East 4,5; MF-West 3,6. Grand total 96. A slice is one face of the cube — fix one dimension to one value and drop that axis.\n\nDice keeps a smaller box by restricting two or more dimensions. Roll-up sums up a hierarchy or drops an axis (quarters → year). Drill-down is the inverse. Pivot rotates axes; numbers do not change. Write the surviving cells, then add. One equality on one dimension → slice. Two filters or a list/range → dice. Roll-up of an additive measure keeps the grand total. Slice/filter changes it. SQL: WHERE is slice/dice; GROUP BY with fewer columns is roll-up.",
      howTo: [
        "Write the surviving cells, then add. Vocabulary without the number scores poorly.",
        "One equality on one dimension → slice (one face). Two filters or a list/range → dice (smaller box).",
        "Roll-up of an additive measure keeps the grand total. Slice/filter changes it.",
        "SQL: WHERE is slice/dice; GROUP BY with fewer columns is roll-up.",
        "Pivot only turns the page. If the total left 96 you rolled up or pivoted; if it shrank you sliced.",
      ],
      bullets: [
        "Cube = a 3D box of sales by city / product / month (here Product × Region × Quarter = 96).",
        "Slice = one face of the cube. One dimension fixed to one value.",
        "Dice = a smaller box. Restrict two or more dimensions.",
        "Roll-up = coarser hierarchy or drop an axis (SUM). Drill-down = finer.",
        "Pivot changes layout, not cell values.",
      ],
      examples: [
        {
          title: "Slice Product = Equity",
          prompt:
            "Slice the 96-cube where Product = Equity. Write Region × Quarter and the slice total.",
          steps: [
            {
              do: "Four cells: East-Q1=12, East-Q2=15, West-Q1=8, West-Q2=10. Total 45.",
              why: "You cut one face of the cube: Product = Equity. That axis drops. A 2-D layer remains.",
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
              why: "Two dimensions restricted → dice, a smaller box. MF-West 3+6 = 9 was excluded by the product list.",
            },
            {
              do: "Slice Region = West alone would keep MF too: 38+9 = 47.",
              why: "Dice is the smaller box. Slice West is “one face including MF”.",
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
              why: "If the grand total left 96, you rolled up or pivoted. If it became 49, you sliced. Pivot would keep every cell 12, 15, … and still 96.",
            },
          ],
          result:
            "Year table totals 96. Product×Quarter after dropping Region also 96. East slice is 49, not a roll-up.",
        },
        {
          title: "Slice Quarter = Q1",
          prompt:
            "On the 96-cube, slice Quarter = Q1. Write Product × Region and the slice total. Contrast with rolling Q1+Q2 into Year.",
          steps: [
            {
              do: "Q1 cells: Equity East 12 West 8, Debt East 6 West 9, MF East 4 West 3. Total 12+8+6+9+4+3 = 42.",
              why: "You cut one face: Quarter = Q1. That axis drops. A 2-D layer remains.",
            },
            {
              do: "Q2 (15+10+7+11+5+6 = 54) is gone. Grand total is no longer 96.",
              why: "A slice filters. The missing face is discarded, not folded in.",
            },
            {
              do: "Roll-up Quarter → Year would keep both Q1 and Q2 and still total 96.",
              why: "Roll-up of an additive measure keeps the grand total. Slice does not.",
            },
            {
              do: "SQL analogue: WHERE quarter = 'Q1' GROUP BY product, region.",
              why: "WHERE is the slice; GROUP BY is the remaining axes.",
            },
            {
              do: "Pivot that Q1 table (swap Product and Region on the page) still lists 12, 8, 6, 9, 4, 3 and still 42.",
              why: "Pivot changes layout, not cell values.",
            },
          ],
          result: "Q1 slice: 12, 8, 6, 9, 4, 3. Total 42. Year roll-up would have stayed 96.",
        },
        {
          title: "Dice MF and Q2 only",
          prompt:
            "Dice the 96-cube to Product = MF and Quarter = Q2, both regions. List cells and total. What would a MF-only slice (both quarters) have totalled?",
          steps: [
            {
              do: "Two dimensions restricted → dice. Cells: MF-East-Q2 = 5, MF-West-Q2 = 6. Total 11.",
              why: "Dice is a smaller box. Equity/Debt and Q1 are outside the box.",
            },
            {
              do: "MF-only slice (both quarters, both regions): East 4+5, West 3+6 = 18.",
              why: "Slice Product = MF is one face; it keeps Q1 as well (4 and 3). Dice dropped those.",
            },
            {
              do: "If you instead rolled up Region on this dice, you would get one number 11 (MF-Q2).",
              why: "After the dice, dropping Region is a roll-up of the remaining additive cells. Total stays 11.",
            },
            {
              do: "SQL analogue: WHERE product = 'MF' AND quarter = 'Q2' GROUP BY region.",
              why: "Two filters in WHERE are the dice; GROUP BY region keeps the leftover axis.",
            },
            {
              do: "Write 5 and 6 before you argue slice vs dice. Marks sit on 11.",
              why: "Vocabulary without the number scores poorly.",
            },
          ],
          result: "Dice cells 5 and 6, total 11. MF slice including Q1 would be 18.",
        },
      ],
    },
    {
      heading: "Slowly changing dimensions Type 1 and Type 2",
      body: "A broker moves city. Slowly changing dimension (SCD) policy says what the store-room does. Type 1 overwrites the old address — history of that label is lost; old facts now wear the new city, like correcting a spelling on a name-tag. Type 2 keeps the old address and the new one, each with dates, and a new surrogate key — like issuing a new library card when you move house, and keeping old loans on the old card.\n\nFacts store the surrogate that was current at event time, not the natural key. Lookup is (natural key + business date), never “always the is_current row” for historical fills. Does history of the attribute matter? Yes → Type 2. Typo / “never was true” → Type 1. Stamp facts by trade_date between effective_from and effective_to — not by load_date. Do not Type-2 a fact table. Fills already are history.",
      howTo: [
        "Does history of the attribute matter for the report? Yes → Type 2. Typo / “never was true” → Type 1.",
        "Type 1: overwrite the old address on the same row. Old facts now wear the new label.",
        "Type 2: close the old row (end_date, is_current=N), insert a new key, same natural key, new city and dates.",
        "Stamp facts by trade_date between effective_from and effective_to — not by load_date.",
        "Do not Type-2 a fact table. Fills already are history.",
      ],
      bullets: [
        "Type 1 = overwrite the old address. Old facts appear under the new label.",
        "Type 2 = keep old and new address with dates, and a new surrogate key.",
        "Facts point at surrogate keys if you want Type-2 history to work.",
        "Lookup = natural key + event date in the window, not always is_current.",
        "Load date is the postmark. Event date chooses the version.",
      ],
      examples: [
        {
          title: "Type 1 overwrite of city",
          prompt:
            "DIM sk=7 BR1 Pune. Two facts on sk 7: 1 Jan qty 10, 1 Jun qty 20. Move to Mumbai on 1 May. Apply Type 1. SUM(qty) GROUP BY city?",
          steps: [
            {
              do: "UPDATE city = 'Mumbai' on sk 7. Still one row. Facts untouched.",
              why: "Type 1 overwrites the old address. No new library card.",
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
              why: "Type 2 keeps old and new address with dates. Two cards, same legal name BR1.",
            },
            {
              do: "1 Jan fact stays on 7. 1 Jun fact uses 88. GROUP BY city: Pune 10, Mumbai 20. Natural key BR1 still sums to 30.",
              why: "Event-time geography is kept. You can still roll up the legal entity on broker_id.",
            },
            {
              do: "A lookup that always uses is_current = Y would wrongly hang January on Mumbai.",
              why: "Point-in-time lookup is natural key + trade_date in the date window.",
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
              why: "Type-2 lookup is when the trade happened, not when the file showed up. Load date is the postmark.",
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
        {
          title: "Type 1 typo versus Type 2 real move",
          prompt:
            "DIM sk=21 BR4 city Nashik. Facts on sk 21: 3 Feb qty 5, 9 Aug qty 14. (a) City was always Surat — typo. (b) Broker really moved Surat on 1 Jul. Pick Type 1 or 2 for each, and the GROUP BY city after (b) Type 2 with new sk 90.",
          steps: [
            {
              do: "(a) Typo “never was Nashik” → Type 1 overwrite city = Surat on sk 21. Both facts now display Surat. GROUP BY: Surat 19.",
              why: "Type 1 overwrites the old address for “never true”. History of the wrong label should die.",
            },
            {
              do: "(b) Real move → Type 2: close sk 21 (Nashik until 30 Jun), insert sk 90 (Surat from 1 Jul).",
              why: "Keep old and new address with dates. Two library cards, same legal name BR4.",
            },
            {
              do: "3 Feb stays on 21 (Nashik 5). 9 Aug uses 90 (Surat 14). GROUP BY city: Nashik 5, Surat 14. Natural key BR4 still sums to 19.",
              why: "Event-time geography is kept. You can still roll up the legal entity on broker_id.",
            },
            {
              do: "Do not Type-2 the fact table. The two fills already are history. Only the dimension versions.",
              why: "Facts point at surrogates. They do not grow SCD rows of their own.",
            },
            {
              do: "If you Type-1’d the real move, August and February would both wear Surat and a regulator asking “where in February?” would hear a lie.",
              why: "The sentence “does history matter?” picks the type. Here it did.",
            },
          ],
          result:
            "(a) Type 1: both 19 under Surat. (b) Type 2: sk21 Nashik 5, sk90 Surat 14, BR4 still 19.",
        },
        {
          title: "is_current lookup hangs March on the new city",
          prompt:
            "sk=33 BR8 Jaipur until 28 Feb 2026, sk=41 BR8 Kota from 1 Mar, is_current=Y on 41. A late fill arrives 10 Apr with trade_date 20 Jan. Which sk if you lookup is_current=Y? Which sk is correct?",
          steps: [
            {
              do: "is_current = Y always returns sk 41 Kota. Stamping 41 on a 20 Jan fill rewrites January geography.",
              why: "Current card is today’s address. January’s fill needs January’s card.",
            },
            {
              do: "Correct Type-2 lookup: natural key BR8 + trade_date 20 Jan inside effective_from/to → sk 33 Jaipur.",
              why: "Point-in-time lookup is natural key + event date in the window, never “always the current row” for historical fills.",
            },
            {
              do: "load_date 10 Apr would also wrongly pick Kota if you used load time. Same bug, different clock.",
              why: "Load date is the postmark. Event date is the exam date.",
            },
            {
              do: "If two versions overlap on 20 Jan, reject the fill. If none cover, stub then restate.",
              why: "Broken effective dates are a dimension bug, not a guess.",
            },
            {
              do: "Reports that want “BR8 as they are today” may use is_current on purpose — that is a Type-1-like view, and must be labelled.",
              why: "As-was versus as-is are different English sentences. Default warehouse facts are as-was.",
            },
          ],
          result:
            "is_current stamps sk 41 Kota (wrong). Event-time stamps sk 33 Jaipur. Late arrival does not change January.",
        },
      ],
    },
  ],
};
