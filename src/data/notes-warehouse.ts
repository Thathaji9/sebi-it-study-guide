import type { TopicNote } from "@/data/notes";

export const notesWarehouse: TopicNote = {
  topic: "warehouse",
  title: "Data Warehousing & OLAP — worked notes",
  blurb:
    "SEBI Grade A IT warehouse items are process-and-model questions: ETL order, staging and metadata, star versus snowflake, grain, mart versus warehouse, and OLAP operators on a small cube. Walk every cube with actual numbers; do not recite definitions without a slice.",
  blocks: [
    {
      heading: "ETL order and what happens at each stage",
      body: "ETL is Extract, Transform, Load — in that order in the classical warehouse. Extract copies data from source systems (OMS, depositories, HR, GL) without making the warehouse the system of record. Transform cleanses, conforms, deduplicates, applies business rules, assigns surrogate keys, and converts source codes to warehouse codes. Load writes the results into warehouse tables, usually in bulk, often overnight, sometimes micro-batched.\n\nELT reverses the last two letters: load raw extracts into a staging or lake area first, then transform with SQL inside the platform. SEBI papers still expect the letters ETL in extract-transform-load order unless they name a lakehouse. The operational source keeps running; the warehouse is not updated in the same ACID transaction as the trade.\n\nA typical nightly pipeline for a market-surveillance warehouse: extract today’s trades and member master deltas; land them in staging; reject rows that fail schema checks; look up surrogate keys; compute daily position facts; load dimension upserts first, then facts (facts depend on dimension keys). Loading facts before dimensions produces late-arriving-dimension problems (unknown member_key).\n\nFailures are not retries of the whole alphabet. If transform fails, you do not re-extract unless the extract files were discarded. Idempotent loads (delete-and-insert a partition for that business date, or merge on a natural key) matter because overnight jobs do re-run. Exam phrase: “ETL is pull-clean-publish; OLTP is the source, OLAP is the target.”",
      bullets: [
        "Classical order: Extract from OLTP → Transform (clean, conform, surrogate keys) → Load into the warehouse.",
        "Load dimensions before facts. Facts store dimension surrogate keys.",
        "ELT: land raw first, transform in-place. Same three jobs, different machine.",
      ],
      examples: [
        {
          title: "Place five jobs on the ETL timeline",
          prompt:
            "Jobs: (A) ASSIGN member_sk by looking up DIM_MEMBER, (B) COPY yesterday’s TRADE_FILL file from the exchange, (C) BULK INSERT into FACT_TRADE, (D) STANDARDISE city names (“BOM” → “Mumbai”), (E) REJECT rows with qty ≤ 0 into an error file. Order them and name the stage of each.",
          steps: [
            "B is Extract: pull the source file. Nothing in the warehouse has changed yet.",
            "E is a Transform quality gate (sometimes done as a staging constraint). You cannot load negative qty into a fact that grain-assumes a fill.",
            "D is Transform: conforming a descriptive attribute to a reference list. This may also update a city lookup dimension later.",
            "A is Transform (key resolution): replace the natural member_id with the warehouse surrogate member_sk. Requires DIM_MEMBER to already contain that member (dimension load first).",
            "C is Load: facts land only after keys exist and rules have passed.",
            "Order: B (Extract), then E and D and A (Transform; E usually before A so you do not look up keys for doomed rows), then C (Load). A compact answer: B → E → D → A → C.",
          ],
          result:
            "B extract; E, D, A transform (reject, conform, surrogate); C load. Sequence B → E → D → A → C.",
        },
        {
          title: "Why facts cannot load before dimensions",
          prompt:
            "New broker BR9 appears in today’s fill file and is not yet in DIM_BROKER. What happens if FACT_TRADE is loaded first with broker_sk = NULL, versus if the pipeline inserts a dimension stub then the fact?",
          steps: [
            "FACT_TRADE.broker_sk is a foreign key to DIM_BROKER. Loading the fact first with a real sk that does not exist violates referential integrity and the load should fail.",
            "Loading with NULL broker_sk succeeds only if the FK is nullable. The fact then cannot be sliced by broker: every BR9 trade piles into “unknown broker”. That is a silent analytic error.",
            "Correct ETL: detect the unknown natural key during transform, insert a stub row into DIM_BROKER (sk = 904, name = 'BR9 pending', type-2 dates open), then load the fact with broker_sk = 904.",
            "A later master-data extract for BR9 updates the stub (Type 1 overwrite of name, or Type 2 new version). Facts already pointing at 904 now display the proper name if Type 1, or you must decide whether old facts stay on the stub version.",
            "Late-arriving dimension is the name of this pattern. Late-arriving fact is the opposite (dimension existed, the fill file showed up tomorrow) and is easier: just load the fact with the existing sk.",
            "Exam line: dimension first, fact second; never park a production sk of 0 without an explicit Unknown member that analysts know about.",
          ],
          result:
            "Fact-first either fails the FK or dumps trades into Unknown. Insert a dimension stub, then load the fact with that surrogate.",
        },
        {
          title: "Idempotent reload of one business date",
          prompt:
            "FACT_TRADE is partitioned by trade_date. Monday’s job loaded 1.2 lakh rows for 2026-04-06, then crashed after half of 2026-04-07. The operator re-runs Monday’s extractor for both dates. What must Transform/Load do so you do not double-count 2026-04-06?",
          steps: [
            "Extract will produce another full file for 2026-04-06. A naive INSERT would duplicate every Monday trade and double every cube total.",
            "Idempotent pattern: DELETE FROM fact_trade WHERE trade_date IN ('2026-04-06','2026-04-07') (or TRUNCATE those partitions), then INSERT the fresh extract. Re-running yields the same warehouse state.",
            "Alternative: MERGE on (exchange_trade_id, trade_date) so duplicates update in place. Requires a durable natural key from the exchange.",
            "Do not DELETE the whole fact table: Tuesday’s already-committed 2026-04-07 fragment is mixed with older dates you must keep.",
            "Dimensions for those dates may also need a rerun if Type-2 rows were half-written; facts are the usual double-count victim.",
            "A checkpoint “loaded_dates” metadata table should record 2026-04-06 = success and 2026-04-07 = fail, so a smart scheduler re-extracts only the failed date. That is still ETL, plus metadata.",
          ],
          result:
            "Replace (delete/truncate partition or MERGE) the business-date slice before insert. Naive INSERT on rerun double-counts.",
        },
        {
          title: "ETL versus OLTP trigger: who computes the daily position?",
          prompt:
            "Position-at-day-close can be (i) a trigger on the OMS trade table that upserts POSITION, or (ii) a warehouse transform that sums FACT_TRADE overnight into FACT_POSITION_DAILY. Which belongs where, and what breaks if the warehouse tries to be the OMS?",
          steps: [
            "The OMS must show a trader their position immediately. That is OLTP and belongs in the source system (or a streaming store), not in last-night’s warehouse.",
            "The warehouse FACT_POSITION_DAILY is an analytic grain: one row per member, ISIN, date, after conforming and after late trades have been repaired. It is allowed to lag.",
            "If the warehouse is treated as the OMS, a failed nightly load would freeze live trading — durability and availability requirements of ACID OLTP, not of ETL.",
            "Extract should read either the OMS POSITION table (if trusted) or rebuild from trades. Rebuilding from FACT_TRADE is Transform, and it must use the warehouse grain (include/exclude cancelled fills).",
            "Do not put SEBI-report numbers that need yesterday’s close into an OLTP trigger that can see in-flight uncommitted fills; that is a dirty-read of an operational total.",
            "Split: OLTP = current position for trading; ETL = conformed daily snapshot for surveillance cubes and statutory reports.",
          ],
          result:
            "Live position is OLTP; daily conformed snapshot is ETL. The warehouse must not be the trading system of record.",
        },
      ],
    },
    {
      heading: "Metadata and the staging area",
      body: "Staging is a landing zone between the source and the warehouse proper. It holds today’s extracts, rejected rows, and sometimes a persistent history of raw files. Staging tables are not for dashboards: they may lack keys, may contain duplicates, and may use source codes. Analysts who query staging by mistake mix unconformed data into a SEBI report.\n\nMetadata is data about the pipeline and the model. Technical metadata: column types, source-to-target maps, job last-run, row counts, checksums. Business metadata: definition of “active member”, owner of DIM_ISIN, grain of FACT_TRADE (“one row per fill”). Operational metadata: start time, rows extracted, rows rejected, SLA breach. The warehouse without metadata is a pile of tables; with metadata it is a governed system.\n\nA staging design choice: transient (truncate every night after a successful load) versus persistent (keep raw extracts for 90 days so you can rebuild). Persistent staging costs disk and eases audits. Transient staging is simpler and dangerous if the warehouse load succeeded but you later discover a transform bug — you have nothing to replay except the source, which may already have overwritten yesterday.\n\nDo not put Type-2 history in staging. History of dimensions is a warehouse concern (SCD). Staging may keep a file-level history of extracts, which is not the same thing as a slowly changing dimension.",
      bullets: [
        "Staging: land, check, reject; not a semantic layer. Warehouse: conformed, keyed, queryable.",
        "Metadata: technical (maps, types), business (definitions, grain), operational (run logs, counts).",
        "Persistent staging lets you replay; transient staging needs the source to still have the data.",
      ],
      examples: [
        {
          title: "Classify four artefacts as staging, warehouse, or metadata",
          prompt:
            "Artefacts: (1) table STG_TRADE_20260407 with columns copied byte-for-byte from the exchange file, (2) table FACT_TRADE with member_sk and qty_cr, (3) table ETL_JOB_LOG with rows_in, rows_reject, ended_at, (4) a wiki sentence “FACT_TRADE grain is one executed fill”. Tag each.",
          steps: [
            "STG_TRADE_20260407 is staging: source layout, dated landing, not conformed.",
            "FACT_TRADE is warehouse (presentation area): surrogate keys, analytic grain.",
            "ETL_JOB_LOG is operational metadata. It is not a fact about the market; it is a fact about the pipeline.",
            "The wiki sentence is business metadata: it tells an analyst what one row means. It should also live in a data-dictionary table, not only in a wiki.",
            "A fifth artefact people mix up: DIM_MEMBER. That is warehouse, not metadata, even though it describes members — it is dimensional data, not data-about-data.",
            "If STG_TRADE is queried by a dashboard, the architecture is wrong even if the numbers look plausible on a quiet day.",
          ],
          result:
            "(1) staging, (2) warehouse fact, (3) operational metadata, (4) business metadata (grain).",
        },
        {
          title: "Row-count metadata that catches a silent truncate",
          prompt:
            "Last night ETL_JOB_LOG said extract_rows = 120000, reject_rows = 12, fact_insert_rows = 119988. Tonight extract_rows = 120000, reject_rows = 12, fact_insert_rows = 0, job status SUCCESS because the load step was skipped by a bad if-condition. What metadata check fails the SLA?",
          steps: [
            "Technical success of the scheduler (exit code 0) is not business success. Operational metadata must include a reconciliation: extract − reject = loaded.",
            "Tonight 120000 − 12 = 119988 ≠ 0. A control that asserts loaded = extract − reject would fail.",
            "A second control compares today’s extract_rows to a trailing average. 120000 matching yesterday is plausible; 0 loaded is not.",
            "Business metadata is not what catches this: the grain definition did not change. Operational metadata did.",
            "Staging still holds the 120000 rows, so a replay is possible if staging is persistent. If staging was truncated at the start of the job, you must re-extract.",
            "Exam answer: reconcile counts, do not trust job SUCCESS. Warehouse QA is metadata, not a SELECT from FACT that an analyst might skip.",
          ],
          result:
            "Reconciliation extract − reject = loaded fails (119988 ≠ 0). SUCCESS without that check is a silent empty load.",
        },
        {
          title: "Should rejected qty ≤ 0 rows stay in staging?",
          prompt:
            "12 fills have qty 0 because they are administrative busts. Transform writes them to STG_TRADE_REJECT. A surveillance analyst wants them in a cube of “busted fills”. Where should they live after ETL?",
          steps: [
            "Staging reject files are a hospital, not a mart. Analysts should not build a cube on STG_TRADE_REJECT.",
            "If busted fills are an analytic subject, define a warehouse fact FACT_TRADE_BUSTED or a status column on FACT_TRADE (status = 'BUST') with grain still one fill.",
            "That is a business-metadata decision: are busts in or out of FACT_TRADE’s grain? Write it down, then Transform implements it.",
            "Leaving them only in staging means they disappear when staging is truncated, and they never pick up member_sk.",
            "Loading them into FACT_TRADE without a status flag would pollute qty sums (zeros) but more dangerously would mix busts into counts of trades. COUNT(*) would include them.",
            "Pipeline: reject from the “valid fill” stream, then a second explicit load path into a busted-fill fact if the grain says so. Staging is the fork, not the destination.",
          ],
          result:
            "Keep rejects in staging only briefly; if analysts need busts, load a modelled warehouse fact (or a status on FACT_TRADE), not the reject file.",
        },
        {
          title: "Technical metadata map for one column",
          prompt:
            "Source OMS column t_qty is INTEGER paise. Warehouse FACT_TRADE.qty_cr is DECIMAL(18,4) crore. Write the source-to-target metadata line and the transform formula a developer should not have to reverse-engineer from code.",
          steps: [
            "Technical metadata row: source_system = OMS, source_table = FILL, source_col = t_qty, source_type = INTEGER, target_table = FACT_TRADE, target_col = qty_cr, target_type = DECIMAL(18,4).",
            "Transform rule: qty_cr = t_qty / 1e8, because 1 crore rupees = 10^8 paise (1 rupee = 100 paise, 1 crore rupees = 10^7 rupees = 10^9 paise — stop and check units on paper).",
            "Unit check: 1 rupee = 100 paise. 1 crore rupees = 10^7 rupees = 10^7 × 100 = 10^9 paise. So qty_cr = t_qty / 1e9, not 1e8. The metadata must record the factor or the next developer halves the market.",
            "Business metadata: “qty_cr is signed fill quantity in crore rupees, buys positive.” That sentence is not a data type.",
            "Operational metadata later stores, for a run, SUM(t_qty) and SUM(qty_cr) so the factor can be regression-tested: SUM(qty_cr) * 1e9 ≈ SUM(t_qty).",
            "Without this map, ELT SQL buried in a 400-line script is the only documentation. That fails an audit, which is the point of metadata in a SEBI-grade warehouse.",
          ],
          result:
            "Map OMS.FILL.t_qty INTEGER → FACT_TRADE.qty_cr DECIMAL, formula t_qty/1e9 (paise to crore). Reconcile sums in operational metadata.",
        },
      ],
    },
    {
      heading: "Star versus snowflake, fact versus dimension, grain",
      body: "A star schema puts a fact table in the centre, surrounded by denormalised dimension tables. DIM_MEMBER carries city, state and region on the same row. A snowflake normalises dimensions: DIM_MEMBER.city_sk references DIM_CITY, which references DIM_STATE. Stars are simpler to query and faster for OLAP; snowflakes save some space and enforce city–state consistency. SEBI answers: prefer star unless the question stresses normalisation of dimensions.\n\nA fact table stores measures (qty, value, count) at a declared grain. Additive facts (trade value) sum across every dimension. Semi-additive facts (account balance, inventory) sum across some dimensions (member) but not time — you cannot add today’s balance to yesterday’s. Non-additive facts (ratio, interest rate) do not sum; they must be recomputed from additive components.\n\nA dimension stores the descriptive context: who, what, where, when. Degenerate dimensions are fact-table columns that look like dimensions but have no dimension table (exchange_trade_id). Conformed dimensions are reused across facts (the same DIM_DATE and DIM_MEMBER in FACT_TRADE and FACT_ALERT) so a drill-across query is meaningful.\n\nGrain is a sentence: “one row per executed fill”, “one row per member per ISIN per day”. Change the grain and every measure and every join changes. Mixing two grains in one fact table (a daily snapshot row plus a fill row) is the classic modelling error.",
      bullets: [
        "Star: denormalised dimensions. Snowflake: normalised dimension hierarchy.",
        "Fact = measures at a grain. Dimension = descriptive context. Degenerate = id sitting on the fact.",
        "Additive / semi-additive / non-additive. Grain is a sentence, not a list of columns.",
      ],
      examples: [
        {
          title: "Name the grain and reject a mixed-grain design",
          prompt:
            "A designer proposes FACT_MARKET with columns date, member_sk, isin_sk, fill_qty, fill_value, eod_position_qty. Fills occur many times a day; eod_position_qty is one number per member-ISIN-day. Why is this illegal, and how do you split it?",
          steps: [
            "fill_qty has grain “one fill”. Several fills share the same (date, member, isin).",
            "eod_position_qty has grain “one member-ISIN-day”. Repeating it on every fill row would multiply the position when a user SUMs, and putting it on only one fill row would hide it from the others.",
            "Those two grains cannot share a table. SUM(fill_qty) and SUM(eod_position_qty) would mean different things on the same row set.",
            "Split: FACT_FILL grain = one executed fill, measures fill_qty, fill_value. FACT_POSITION_DAILY grain = member × ISIN × date, measure eod_position_qty (semi-additive across time).",
            "Both facts share conformed DIM_MEMBER, DIM_ISIN, DIM_DATE. Drill-across is allowed; UNION of the two facts is not.",
            "A count-of-fills measure belongs on FACT_FILL (additive 1 per row) or as COUNT(*) ; putting “number_of_fills” on FACT_POSITION_DAILY is a different grain (daily aggregate), which is fine if declared.",
          ],
          result:
            "Illegal mixed grain. FACT_FILL (per fill) and FACT_POSITION_DAILY (per member-ISIN-day) with conformed dimensions.",
        },
        {
          title: "Star or snowflake for member geography",
          prompt:
            "DIM_MEMBER currently has member_sk, name, city, state, region. A modeller splits city, state, region into DIM_GEO and leaves city_sk on DIM_MEMBER. Draw both and say which is the star. What SQL changes for “value by region”?",
          steps: [
            "Star: FACT_TRADE → DIM_MEMBER, and city, state, region live as columns on DIM_MEMBER. Query: FROM fact JOIN dim_member ON member_sk GROUP BY region.",
            "Snowflake: FACT_TRADE → DIM_MEMBER → DIM_GEO (city_sk) and DIM_GEO may itself snowflake to DIM_REGION. Query needs an extra join: fact JOIN member JOIN geo GROUP BY geo.region.",
            "The snowflake is more normalised (Mumbai appears once in DIM_GEO, not once per member). The star duplicates Mumbai on every Mumbai member — cheap, and it survives a geo-table outage in queries that do not need geo.",
            "For SEBI Grade A, “star schema” means the first picture. Snowflake is the normalised-dimension variant of a dimensional model, still not 3NF of the whole warehouse.",
            "A galaxy / fact constellation is two facts sharing dimensions, not a snowflake.",
            "If region is only used in 1% of queries, snowflaking geo is a maintenance choice, not a correctness requirement. Grain of the fact does not change.",
          ],
          result:
            "Star keeps city/state/region on DIM_MEMBER (one join). Snowflake adds DIM_GEO (two joins). Fact grain unchanged.",
        },
        {
          title: "Additive versus semi-additive on a position cube",
          prompt:
            "FACT_POSITION_DAILY rows for M1, ISIN INEA: 1 Apr eod_qty 10, 2 Apr eod_qty 12. FACT_FILL for M1 INEA: 2 Apr two fills +3 and −1. Which sums are legal across date? Across member?",
          steps: [
            "eod_qty is a snapshot. 10 + 12 = 22 is not M1’s position; it double-counts stock. Semi-additive: sum across member or ISIN for a fixed date; do not sum across date. Use last-of-period (12 at 2 Apr) or average if the question asks average inventory.",
            "fill_qty is additive. +3 + (−1) = +2 net fills on 2 Apr, and you may also sum fills across dates to get a period net.",
            "Across member, on 2 Apr, SUM(eod_qty) of all members is total shares outstanding in the warehouse’s coverage — legal if every member is present, still a same-date sum.",
            "A ratio eod_qty / issued_capital is non-additive: sum of ratios ≠ ratio of sums. Store issued_capital as a separate additive (or slowly changing) measure and divide after aggregation.",
            "COUNT(*) of position rows across dates is a count of snapshots, not a quantity. Do not report it as volume.",
            "Exam shortcut: money and fill qty usually additive; balances, headcount-on-a-day, inventory semi-additive; percentages non-additive.",
          ],
          result:
            "Do not SUM eod_qty across dates (take last or avg). SUM fill_qty across dates and members. Ratios recompute after aggregation.",
        },
        {
          title: "Degenerate dimension and a junk dimension",
          prompt:
            "FACT_FILL has exchange_trade_id (unique per fill), side (B/S), algo_flag (Y/N), and venue. None of these has a big descriptive table. Which are degenerate, which belong in a junk dimension, and which might still deserve a tiny dimension?",
          steps: [
            "exchange_trade_id is a degenerate dimension: a high-cardinality identifier stored on the fact, no DIM_TRADE_ID table that would be one row per fact row.",
            "side and algo_flag are low-cardinality flags. Packing them into one DIM_FILL_JUNK with a row per combination (B-Y, B-N, S-Y, S-N) is a junk dimension. The fact stores junk_sk.",
            "venue (NSE/BSE/MSE) might stay as a tiny DIM_VENUE because it has a name, timezone, and regulator code that will grow. It can also sit as a degenerate code if it truly never grows attributes.",
            "Putting exchange_trade_id into a dimension table that only repeats the id is wasted join cost and is not a junk dimension (cardinality equals the fact).",
            "Grain check: still one fact row per fill. Degenerate and junk choices do not change grain.",
            "Filter “algo buys on NSE” in a star: JOIN junk WHERE side='B' AND algo_flag='Y' JOIN venue WHERE code='NSE'. In a fully degenerate design those would be WHERE clauses on the fact itself, which also works and is simpler at this size.",
          ],
          result:
            "exchange_trade_id degenerate on the fact; side+algo_flag junk dimension (or fact flags); venue a small real dimension if it has attributes.",
        },
      ],
    },
    {
      heading: "Data mart versus warehouse, and the cube",
      body: "A data warehouse is the enterprise conformed store: many subjects, conformed dimensions, one DIM_MEMBER used by surveillance, HR and finance. A data mart is a subject-oriented slice, often departmental (a surveillance mart, a HR mart). Independent marts built directly from sources diverge (“Mumbai” vs “Bombay”) and cannot be drilled across. Dependent marts are filled from the warehouse and stay conformed. Inmon: warehouse first (normalised EDW) then marts. Kimball: dimensional bus of conformed dimensions, marts may be the warehouse.\n\nA cube is a multidimensional array of measures indexed by dimensions. A 3-D cube Product × Region × Quarter holds one cell per combination. OLAP operations reshape what the analyst sees without changing the underlying grain of the fact: slice, dice, roll-up, drill-down, pivot (rotate). MOLAP stores the cube physically; ROLAP queries the star with SQL; HOLAP mixes both.\n\nSEBI questions will hand you a small cube and ask for the result of a slice or a roll-up. Compute. Do not answer “slice means filter” without the number.\n\nA mart that is just a SQL view of the warehouse is still a mart (access layer). A cube built on that mart is an OLAP layer on top. Three layers: staging → warehouse/mart → cube/report.",
      bullets: [
        "Warehouse: enterprise, conformed. Mart: subject area. Dependent marts inherit conformity.",
        "Independent marts from source systems cause inconsistent dimensions.",
        "Cube: measure indexed by dimensions. MOLAP / ROLAP / HOLAP is the storage choice.",
      ],
      examples: [
        {
          title: "Independent marts disagree on a member city",
          prompt:
            "Surveillance mart DIM_MEMBER: M1 city Mumbai. Finance mart DIM_MEMBER: M1 city Bombay. Both extracted from different source screens. A board pack joins “alerts by city” to “fees by city”. What breaks, and what architecture fixes it?",
          steps: [
            "The join on city strings splits M1 into two cities. Alerts sit in Mumbai, fees in Bombay. The drill-across is wrong even though both numbers are “correct” inside their mart.",
            "Root cause: independent marts, no conformed DIM_MEMBER. This is not an OLAP operator bug.",
            "Fix: a warehouse (or Kimball bus) with one DIM_MEMBER, city standardised to Mumbai in Transform, both marts loaded from that dimension.",
            "A dependent surveillance mart and dependent finance mart would both receive member_sk 441 and city Mumbai. Cubes on top would slice the same way.",
            "A one-off SQL REPLACE('Bombay','Mumbai') in the board pack is not conformity; the next source synonym (“Bom”) breaks it again. Conform in ETL.",
            "Exam labels: independent mart = from source; dependent mart = from warehouse; conformed dimension = same keys and attributes across facts/marts.",
          ],
          result:
            "Drill-across splits M1. Fix with a conformed DIM_MEMBER in a warehouse (dependent marts), not two independent source-fed marts.",
        },
        {
          title: "Inmon versus Kimball in one sentence each, applied",
          prompt:
            "SEBI IT wants (i) a 3NF enterprise model of members, instruments and trades, plus (ii) a star for the surveillance team. Which layer is Inmon’s EDW, which is the mart, and where does ETL land twice?",
          steps: [
            "Inmon: ETL from sources into a normalised enterprise data warehouse (EDW) — 3NF members, trades, instruments, many tables, integrity. That is (i).",
            "Then a second ETL (or views plus a dimensional build) populates a surveillance star: FACT_FILL and DIM_*. That is (ii), a dependent mart.",
            "Kimball would skip the 3NF EDW, conform DIM_MEMBER once, and let the surveillance star be the warehouse, with a finance star sharing the same dimensions.",
            "SEBI Grade A typically accepts both vocabularies. If the question says “normalised warehouse plus departmental stars”, it is Inmon. If it says “bus of conformed dimensions”, it is Kimball.",
            "Staging exists in both: landing is not the EDW and not the mart.",
            "You do not OLAP-query Inmon’s 3NF EDW directly for a cube; you query the star/cube. The EDW is the integration layer.",
          ],
          result:
            "3NF EDW = Inmon warehouse; surveillance star = dependent mart. Kimball would treat the conformed stars as the warehouse.",
        },
        {
          title: "MOLAP versus ROLAP for a 3-D surveillance cube",
          prompt:
            "Cube SALES is Product × Region × Quarter, 50 products, 8 regions, 20 quarters, one measure value_cr. MOLAP pre-aggregates; ROLAP is SQL on the star. A user asks for value by Product only (roll-up Region and Quarter). Where is the work done?",
          steps: [
            "Cell count of the base cube: 50 × 8 × 20 = 8000 base cells, tiny. Either engine is fine; this is a teaching size.",
            "MOLAP: the roll-up Product-only total is likely already stored as an aggregate cell (or computed from a compact array). Query does not scan FACT_FILL.",
            "ROLAP: SQL GROUP BY product_sk on the fact, joining DIM_PRODUCT. Work is a scan/aggregate of fact rows (maybe millions) even though the cube is 8000 cells conceptually.",
            "HOLAP: keep base facts in relational storage, store some aggregations (Product-only, Region-only) in MOLAP. The user’s Product-only query hits the MOLAP aggregate.",
            "If the next query is a drill-down to individual fill-level rows, MOLAP may not have that grain and the engine goes to relational detail (HOLAP) or fails if the cube grain is already Product-Region-Quarter.",
            "Cube grain versus fact grain: if the cube is already aggregated to Product-Region-Quarter you cannot drill to a single fill. That is a grain question, not MOLAP versus ROLAP.",
          ],
          result:
            "MOLAP answers Product-only from a stored/array aggregate; ROLAP GROUP BYs the star. Drill to fills needs fact grain, not a PRQ cube.",
        },
        {
          title: "Mart that is only a view — still a mart?",
          prompt:
            "Warehouse has FACT_FILL and all dimensions. Surveillance is given CREATE VIEW mart_surv_fill AS SELECT … FROM fact_fill JOIN dim_member WHERE member_type = 'Broker'. No extra tables. Is this a data mart? A cube? Staging?",
          steps: [
            "It is a dependent data mart (logical): subject-oriented (brokers only), sourced from the warehouse, conformed keys preserved.",
            "It is not a cube: there is no multidimensional aggregation or OLAP operator stored. A cube might be built on top of the view.",
            "It is not staging: rows are conformed warehouse rows, just filtered.",
            "Physical mart would COPY the filtered star into another schema for workload isolation. Logical mart shares storage and isolation is at the query layer.",
            "If the view joined staging tables, it would be a rogue mart and would break conformity. The FROM clause is the tell.",
            "Access control on the view (only surveillance role) is a reason to have a mart even when no extra ETL exists.",
          ],
          result:
            "Dependent logical mart (broker-filtered view of the warehouse). Not a cube, not staging.",
        },
      ],
    },
    {
      heading: "OLAP operators: slice, dice, roll-up, drill-down",
      body: "Hold one 3-D cube in your head for this whole section. Dimensions: Product ∈ {Equity, Debt, MF}, Region ∈ {East, West}, Quarter ∈ {Q1, Q2}. Measure: turnover in ₹ crore. Twelve cells:\n\nEquity-East-Q1=12, Equity-East-Q2=15, Equity-West-Q1=8, Equity-West-Q2=10, Debt-East-Q1=6, Debt-East-Q2=7, Debt-West-Q1=9, Debt-West-Q2=11, MF-East-Q1=4, MF-East-Q2=5, MF-West-Q1=3, MF-West-Q2=6. Grand total 96.\n\nSlice fixes one dimension to a single value and drops that axis: a 3-D cube becomes 2-D. Dice selects a subcube by restricting two or more dimensions (ranges or lists) and keeps the remaining dimensionality. Roll-up aggregates along a hierarchy (Quarter → Year, Region → Country) or by dropping a dimension (sum over Region). Drill-down is the inverse: Year → Quarter, or add a dimension back. Pivot (rotate) swaps axes; it does not change numbers.\n\nHierarchies must be declared: Quarter rolls to Year, not to Product. You cannot roll Product into Region. If the cube has no Year level stored, roll-up to Year still means SUM of Q1 and Q2 in this two-quarter toy year.",
      bullets: [
        "Slice: one dimension fixed to one value. Dice: restrict ≥2 dimensions. Both filter; dice keeps a subcube.",
        "Roll-up: coarser hierarchy or drop an axis (SUM). Drill-down: finer hierarchy or add an axis.",
        "Pivot changes layout, not cell values. Totals on this page use the 3×2×2 cube summing to 96.",
      ],
      examples: [
        {
          title: "Slice Product = Equity",
          prompt:
            "Using the cube in the section body, slice where Product = Equity. Write the remaining 2-D table Region × Quarter and the slice total. Contrast with a dice that also keeps only Equity.",
          steps: [
            "Fix Product = Equity. Remaining axes: Region and Quarter. Four cells: East-Q1=12, East-Q2=15, West-Q1=8, West-Q2=10.",
            "Slice total = 12+15+8+10 = 45. Debt and MF (51) are gone.",
            "The result is 2-dimensional. That dropped axis is the definition of slice.",
            "A “dice” that only lists Product = Equity (one restriction) is often casually called a slice. Strict exam usage: one equality on one dimension = slice.",
            "If the question instead said Product ∈ {Equity, Debt} and Region = West, that is two dimensions restricted → dice, not slice.",
            "SQL analogue of this slice: WHERE product = 'Equity' then GROUP BY region, quarter. The WHERE is the slice; the GROUP BY is the remaining axes.",
          ],
          result:
            "Equity slice is a 2-D Region×Quarter table: 12, 15, 8, 10. Total 45.",
        },
        {
          title: "Dice Product in {Equity, Debt} and Region = West",
          prompt:
            "Dice the same cube to Product ∈ {Equity, Debt} and Region = West, both quarters. List surviving cells and the total. Then say what a slice Region = West alone would have kept.",
          steps: [
            "Region = West keeps West cells only. Product list drops MF. Quarters unrestricted, so Q1 and Q2 both stay.",
            "Surviving cells: Equity-West-Q1=8, Equity-West-Q2=10, Debt-West-Q1=9, Debt-West-Q2=11.",
            "Dice total = 8+10+9+11 = 38. MF-West 3+6 = 9 was excluded by the product list.",
            "Dimensionality: Product still has two values, Quarter has two, Region is fixed. Some books still call this a 2-D result (Product × Quarter) because the fixed region was sliced away. Either description is fine if the cells are right.",
            "Slice Region = West alone would also have kept MF-West Q1=3 and Q2=6, total 38+9 = 47.",
            "Dice is the “subcube” operator: more than one filter, or a range/list rather than a single equality. Compute the cells; do not argue vocabulary if the numbers are required.",
          ],
          result:
            "Cells 8, 10, 9, 11 total 38. Region=West slice without dropping MF would have totalled 47.",
        },
        {
          title: "Roll-up Quarter to Year, then drill-down again",
          prompt:
            "Roll the cube up from Quarter to Year (this toy year = Q1+Q2). Write Product × Region at Year. Then drill-down Equity-East back to quarters.",
          steps: [
            "For each (Product, Region), Year = Q1 + Q2.",
            "Equity-East: 12+15 = 27. Equity-West: 8+10 = 18.",
            "Debt-East: 6+7 = 13. Debt-West: 9+11 = 20.",
            "MF-East: 4+5 = 9. MF-West: 3+6 = 9. Six cells. Grand total still 96 (roll-up preserves the measure if it is additive).",
            "Drill-down Equity-East Year 27 → the two children Equity-East-Q1=12 and Equity-East-Q2=15. Other year cells stay aggregated until drilled.",
            "Roll-up is not a slice: you did not drop Debt. You changed the time hierarchy. SQL: GROUP BY product, region (drop quarter). Drill-down: GROUP BY product, region, quarter again, perhaps filtered to Equity-East.",
          ],
          result:
            "Year table: Equity 27/18, Debt 13/20, MF 9/9 (East/West). Equity-East drills to 12 and 15. Total remains 96.",
        },
        {
          title: "Roll-up that drops Region, versus a slice, versus a pivot",
          prompt:
            "From the base cube, (a) roll-up by dropping Region (Product × Quarter totals), (b) slice Region = East, (c) pivot Product and Quarter on the full cube. Compute (a). Explain why (b) and (c) are different operations even if a GUI looks similar.",
          steps: [
            "Drop Region: sum East+West for each Product-Quarter.",
            "Equity-Q1: 12+8 = 20. Equity-Q2: 15+10 = 25. Debt-Q1: 6+9 = 15. Debt-Q2: 7+11 = 18. MF-Q1: 4+3 = 7. MF-Q2: 5+6 = 11. Total 20+25+15+18+7+11 = 96.",
            "Slice Region = East does not sum West in; it discards West. Equity-East-Q1 stays 12, not 20. Slice total = 12+15+6+7+4+5 = 49, which is East only.",
            "Pivot rearranges axes (put Quarter on rows, Product on columns) but every cell keeps its number: Equity-East-Q1 is still 12. Pivot total is still 96 and no cell is dropped or summed.",
            "A user who “hides West” in a UI might think they pivoted; they sliced (or filtered). A user who “shows Product on columns” pivoted. A user who “views India instead of East/West” rolled up.",
            "Check: if the grand total changed from 96, you sliced or filtered, not rolled-up-additive or pivoted. Roll-up of an additive measure keeps 96; slice to East yields 49.",
          ],
          result:
            "(a) Product×Quarter: 20,25,15,18,7,11 total 96. (b) East slice total 49. (c) Pivot does not change 96 or any cell.",
        },
      ],
    },
    {
      heading: "Slowly changing dimensions Type 1 and Type 2",
      body: "Dimensions change: a broker relocates from Pune to Mumbai, a member is renamed after a merger. Slowly changing dimension (SCD) policy decides what the warehouse does. Type 0: never change (founding date). Type 1: overwrite the attribute in place; history of the attribute is lost; all facts, past and present, now describe the new value. Type 2: insert a new dimension row with a new surrogate key, close the old row (end_date, is_current=N), leave old facts on the old sk so they keep the old city.\n\nType 2 columns typically include effective_from, effective_to, is_current. Natural key (sebi_reg) is stable; surrogate key changes with each version. Facts always store the surrogate that was current at event time, so a 2024 trade of a then-Pune broker stays on the Pune version even after the 2026 move.\n\nType 3 (not asked in depth) keeps a previous_city column on the same row — limited history, one step back. Hybrid Type 1+2: overwrite a misspelling (Type 1) but version a true relocation (Type 2). The exam wants you to pick Type 1 versus Type 2 from a sentence about whether history matters.\n\nDo not Type-2 a fact table. Facts at fill grain already are history. Degenerate ids do not version. Mini-dimensions (a junk of rapidly changing flags) are an alternative when a Type-2 member dimension would explode.",
      bullets: [
        "Type 1: overwrite; history lost; old facts appear under the new attribute.",
        "Type 2: new row + new surrogate; old facts keep the old version via the old sk.",
        "Facts point at surrogate keys, never at the natural key, if you want Type-2 history to work.",
      ],
      examples: [
        {
          title: "Type 1 overwrite of a broker city",
          prompt:
            "DIM_BROKER before: sk=7, broker_id='BR1', city='Pune'. FACT_TRADE has two rows with broker_sk=7, dates 1 Jan and 1 Jun, qty 10 and 20. On 1 May BR1 moves to Mumbai. Apply Type 1. What does SUM(qty) GROUP BY city show?",
          steps: [
            "Type 1 UPDATE dim_broker SET city = 'Mumbai' WHERE sk = 7. Still one row, sk still 7.",
            "Both facts still point at sk 7. They now both display Mumbai, including the 1 Jan trade that happened in Pune.",
            "GROUP BY city: Mumbai 30, Pune 0. History of the city attribute is gone.",
            "No new surrogate is allocated. Fact table is untouched (good: facts were not restated, only the label changed).",
            "Use Type 1 when the old value was an error (“Punr” → “Pune”) or when nobody will ever ask “where was this broker then?”.",
            "If a report “trades in Pune in January” is a regulatory question, Type 1 just destroyed the answer. That requirement forces Type 2.",
          ],
          result:
            "One DIM row city=Mumbai. Both trades (30 qty) group under Mumbai. January’s Pune history is lost.",
        },
        {
          title: "Type 2 versioning of the same move",
          prompt:
            "Same starting point: sk 7 BR1 Pune, facts 1 Jan qty 10 and 1 Jun qty 20, move on 1 May to Mumbai. Apply Type 2. Assign sk 88 to the new version. Walk fact keys and the GROUP BY city.",
          steps: [
            "Close old row: sk 7, city Pune, effective_to = 30 Apr, is_current = N.",
            "Insert sk 88, broker_id BR1 (same natural key), city Mumbai, effective_from = 1 May, is_current = Y.",
            "1 Jan fact stays on broker_sk = 7 (event time was before the move). 1 Jun fact must use broker_sk = 88. The 1 Jun load (or a late correction) looks up the dimension version current on 1 Jun.",
            "GROUP BY city: Pune 10, Mumbai 20. History is preserved.",
            "GROUP BY broker_id (natural key) still totals 30 for BR1. That is why the natural key stays on both versions: you can still roll up “this legal entity” without the city split.",
            "A lookup that always uses is_current = Y would wrongly attach even the 1 Jan fill to Mumbai if someone “fixes” history. Point-in-time lookup is: natural key + trade_date between effective_from and effective_to.",
          ],
          result:
            "sk7 Pune closed, sk88 Mumbai current. Jan fact 10 stays Pune; Jun fact 20 is Mumbai. Natural key BR1 still sums to 30.",
        },
        {
          title: "ETL lookup: which Type-2 row for a late fill?",
          prompt:
            "BR1 versions: sk7 Pune from 1 Jan 2025 to 30 Apr 2026, sk88 Mumbai from 1 May 2026 onwards. A fill arrives late with trade_date = 2026-03-15 (Pune era) but load_date = 2026-06-01 (Mumbai era). Which sk does Transform stamp?",
          steps: [
            "Type-2 lookup is by event time, not by load time. trade_date 15 Mar 2026 falls in [1 Jan 2025, 30 Apr 2026] → sk 7 Pune.",
            "Using load_date 1 Jun would stamp sk 88 and rewrite geography of a March trade. That is a Type-1-like corruption implemented by a sloppy lookup.",
            "Pseudo-code: SELECT sk FROM dim_broker WHERE broker_id = 'BR1' AND '2026-03-15' >= effective_from AND '2026-03-15' < effective_to (or effective_to IS NULL for the open row).",
            "If two versions overlap on a date, the dimension is broken; Transform should fail the row into reject, not pick arbitrarily.",
            "If no version covers the date (broker on-boarded in April but a March trade exists), late-arriving dimension stub, then restatement.",
            "Exam: SCD2 lookup key is (natural key, business date), never (natural key, is_current) for historical facts.",
          ],
          result:
            "Stamp sk 7 (Pune). Event date, not load date, chooses the Type-2 version.",
        },
        {
          title: "Type 1 correction versus Type 2 true change on the same column",
          prompt:
            "city for BR1 is 'Punr' (typo) from the first load. Facts already use sk 7. Tomorrow the master file says city = 'Pune' (same office, spelling fix). Next year the office actually moves to Mumbai. Which SCD type for each event, and do you allocate a new sk for the typo?",
          steps: [
            "Typo Punr → Pune is a correction of a value that was never true. Type 1 overwrite on sk 7. No new surrogate. All facts with sk 7 now show Pune, which is what they should have shown.",
            "Allocating a Type-2 row for the typo would preserve “Punr” as if it were a real historical city. Analysts would split a fake geography. Do not Type-2 data-quality fixes.",
            "The later real move Pune → Mumbai is Type 2: close sk 7, insert sk 88 Mumbai, new facts after the move use 88.",
            "Hybrid policy written in metadata: “city: Type 2 on real relocation; Type 1 on spelling and standardisation to the city reference list.”",
            "If Punr was loaded yesterday and no facts exist yet, Type 1 and Type 2 look the same operationally (one row). The policy still matters the day the first fact lands.",
            "Document the rule in business metadata so two ETL developers do not disagree on the next typo.",
          ],
          result:
            "Typo: Type 1 on sk 7, no new key. Real move: Type 2 new sk. Do not version spelling mistakes.",
        },
      ],
    },
    {
      heading: "Putting the cube and the star together",
      body: "A cube cell is an aggregation of fact rows that share dimension values. The Equity-East-Q1 cell 12 in the earlier cube is SUM(value_cr) FROM fact JOIN dim_product JOIN dim_region JOIN dim_date WHERE product='Equity' AND region='East' AND quarter='Q1'. If the fact grain is a fill, many fills sit behind that 12. Slice/dice/roll-up are therefore SQL GROUP BY plus WHERE, or precomputed aggregates in MOLAP.\n\nMaterialised aggregations (aggregate fact tables) store some roll-ups physically: FACT_FILL_MONTHLY grain member × ISIN × month. A query at month grain should hit that table, not scan fills. This is still a warehouse object, not staging. Metadata must record that it is derived and how to refresh it after the base fact loads.\n\nWhen an SCD Type 2 city change happens, a cube that groups by city is grouping by the dimension version attached to each fact, not by the member’s current city — if you modelled Type 2 correctly. A Type 1 city change restates every cube cell that used that member. Know which restatement your regulator wanted before you pick SCD type.\n\nExam wrap: ETL fills a star at a declared grain; a cube is an OLAP view of that star; marts are subject slices; metadata and staging keep the pipeline honest. If a number in a cube cannot be traced to fact rows, the grain or the load is wrong.",
      bullets: [
        "Cube cell = aggregated facts for a dimension tuple. Operators are WHERE/GROUP BY or MOLAP.",
        "Aggregate fact tables are stored roll-ups; refresh them after base loads.",
        "Type 2 city splits cube cells historically; Type 1 restates them.",
      ],
      examples: [
        {
          title: "Trace cell 12 back to fills",
          prompt:
            "FACT_FILL (product, region, date, value_cr): (Equity, East, 2026-01-10, 5), (Equity, East, 2026-02-02, 7), (Equity, East, 2026-04-01, 4), (Debt, East, 2026-01-10, 6). Q1 = Jan–Mar. Which rows form Equity-East-Q1, and what is the cell?",
          steps: [
            "Filter Product Equity, Region East, date in Q1 (Jan–Mar 2026).",
            "Row 5 (10 Jan) qualifies. Row 7 (2 Feb) qualifies. Row 4 (1 Apr) is Q2, out. Debt row is wrong product, out.",
            "Cell = 5+7 = 12, matching the teaching cube. Two fills, one cell.",
            "Slice Product=Equity keeps these plus Equity cells of other regions/quarters; it does not by itself sum them.",
            "Roll-up to Year would add the Q2 4 as well: Equity-East-Year = 12+4 = 16 from these rows (plus any other Equity-East fills not listed).",
            "If grain were already Product-Region-Quarter, you could not list the two fills; drill-down would stop at 12. Here grain is fill, so drill-down past the cube cell is legal.",
          ],
          result:
            "Equity-East-Q1 = 5+7 = 12 from two fills. The 1 Apr fill is Q2; the Debt fill is another product.",
        },
        {
          title: "Aggregate fact versus query-time roll-up",
          prompt:
            "FACT_FILL has 10 million rows. FACT_PRQ is an aggregate at Product × Region × Quarter with 12 rows matching our toy cube. A dashboard asks for grand total 96. Which table, and what must ETL do after a late fill of Equity-East-Q1 worth +1?",
          steps: [
            "Grand total can come from SUM(value_cr) of FACT_PRQ (12 cells) or of FACT_FILL (10 million rows). Use FACT_PRQ.",
            "Late fill +1 to Equity-East-Q1 means base FACT_FILL gains a row, and FACT_PRQ’s Equity-East-Q1 cell must become 13, grand total 97.",
            "ETL refresh: incremental (+1 to that aggregate cell) or rebuild FACT_PRQ from FACT_FILL for that quarter partition. Stale aggregate is worse than a slow query.",
            "Metadata: FACT_PRQ.derived_from = FACT_FILL, grain declared, last_refresh timestamp. Dashboards should refuse a cube older than the base fact.",
            "Slice/dice on FACT_PRQ cannot drill to the late fill’s trade_id: that degenerate dimension was summed away. Drill-through must go to FACT_FILL with the same WHERE.",
            "Do not leave FACT_PRQ in staging. It is a warehouse aggregate table (performance mart).",
          ],
          result:
            "Read 96 from FACT_PRQ. After a +1 late fill, refresh the Equity-East-Q1 aggregate cell to 13 (total 97) or rebuild the partition.",
        },
        {
          title: "Type 2 restatement of a cube city slice",
          prompt:
            "Two fills of BR1, value 10 (Jan, then Pune, sk7) and 20 (Jun, Mumbai, sk88). Cube slices city=Pune versus city=Mumbai. Then someone Type-1 overwrites sk7 to Mumbai by mistake. What do the slices show before and after the mistake?",
          steps: [
            "Correct Type 2: Pune slice includes 10, Mumbai slice includes 20. Grand total 30.",
            "Mistaken Type 1 on sk7: both dimension rows that facts use… wait, sk7’s city becomes Mumbai, sk88 already Mumbai. Both facts now join to Mumbai.",
            "Pune slice becomes 0. Mumbai slice becomes 30. January’s geography is restated.",
            "The fact values did not change; the dimension join did. Cube operators were correct; the SCD policy was violated.",
            "A Type 2-aware report “current city of the broker” would join through is_current = Y (sk88 Mumbai) and attribute both 10 and 20 to Mumbai on purpose. That is a different query, using current attributes, not event-time attributes.",
            "Know which query the circular asked for: event-time geography (Type 2 join on the fact’s sk) versus current geography (lookup is_current).",
          ],
          result:
            "Before mistake: Pune 10, Mumbai 20. After Type-1 overwrite of sk7: Pune 0, Mumbai 30. Facts unchanged.",
        },
        {
          title: "Dice then roll-up on the teaching cube, one chain",
          prompt:
            "Start from the 96-cube. Dice to Product ∈ {Equity, MF} and Quarter = Q2. Then roll-up Region (drop Region). Compute the two remaining Product cells and their total.",
          steps: [
            "Dice filters: drop Debt entirely; drop Q1 entirely; keep East and West.",
            "Remaining cells: Equity-East-Q2=15, Equity-West-Q2=10, MF-East-Q2=5, MF-West-Q2=6. Dice total 36.",
            "Roll-up drop Region: Equity-Q2 = 15+10 = 25. MF-Q2 = 5+6 = 11.",
            "Two cells, total 36, same as the dice (additive). Debt-Q2 18 never entered.",
            "Order matters for thinking, not for the additive result: roll-up first to Product×Quarter then filter Product and Q2 would also yield 25 and 11. For non-additive measures (averages, distinct counts) filter (dice/slice) before averaging, or you average leftovers you intended to drop.",
            "SQL: WHERE product IN ('Equity','MF') AND quarter = 'Q2' GROUP BY product. The WHERE is the dice; GROUP BY product (no region) is the roll-up.",
          ],
          result: "Equity-Q2 = 25, MF-Q2 = 11, total 36. Debt excluded by the dice.",
        },
      ],
    },
  ],
};
