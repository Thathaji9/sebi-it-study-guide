export type EssayDrill = {
  id: string;
  prompt: string;
  guide: string[];
};

export const essayDrills: EssayDrill[] = [
  {
    id: "ess-01",
    prompt:
      "Optional T+0 settlement in Indian cash equities is being introduced in phases. Discuss the investor benefit, the operational strain on brokers and custodians, and what a regulator should refuse to rush.",
    guide: [
      "Open with the policy goal: shorter counterparty risk without breaking funding, corporate-action, and fail-management clocks.",
      "Name one concrete IT strain (same-day reconciliation, UPI-block cut-offs, or custodian affirmation windows).",
      "Distinguish a phased optional window from a mandatory overnight flip — optionality is a control, not a slogan.",
      "Close with one residual risk the regulator should still publish after go-live (liquidity at the open, or retail error rates).",
    ],
  },
  {
    id: "ess-02",
    prompt:
      "Retail participation in equity derivatives has grown faster than literacy. What product, disclosure, or distribution rules actually change behaviour, and which merely look strict?",
    guide: [
      "State a thesis: complexity plus leverage plus social proof is a conduct problem, not only an education problem.",
      "Give one tool that bites (position limits, peak-margin, product design, or suitability at the point of sale).",
      "Give one tool that often fails (tiny risk disclaimers under a “join the trade” video).",
      "End with what an IT Grade A officer might measure: who opened the position, after which funnel, and whether cooling-off changed take-up.",
    ],
  },
  {
    id: "ess-03",
    prompt:
      "“Finfluencers” sit outside the old research-analyst perimeter. Should the law chase the person, the platform, or the payment trail — and what would over-reach look like?",
    guide: [
      "Define the harm: unregistered advice, undisclosed consideration, and herd flow into illiquid names.",
      "Argue that payment trails and platform distribution logs are more reliable than chasing every username.",
      "Acknowledge speech and satire: a joke about a stock is not automatically a research report.",
      "Propose one implementable line (registration if consideration, disclosure if affiliate link, take-down if fraud) and one limit (do not license every comment).",
    ],
  },
  {
    id: "ess-04",
    prompt:
      "Artificial intelligence in market surveillance will rank queues, not replace officers — or will it? Take a position on human-in-the-loop for enforcement.",
    guide: [
      "Separate ranking (triage) from deciding (legal characterisation of abuse).",
      "Explain why undocumented features and vendor-changed thresholds are due-process risks.",
      "Give one pattern a model will miss (novel layering, or wash via new entity types).",
      "Close with a control: model-change audit trail treated like a circular amendment, plus human sign-off on novel flags.",
    ],
  },
  {
    id: "ess-05",
    prompt:
      "Cyber outages at brokers are treated as IT incidents until they strand client money and orders. Discuss when operational resilience becomes a market-integrity file.",
    guide: [
      "Name the statutory interest: fair access, orderly markets, and client-asset protection — not uptime vanity.",
      "Give one incident class (DDoS on a discount broker at the open, ransomware on a registrar, or failed DR failover).",
      "Argue for public post-incident principles: timeline, blast radius, client impact, and what will change.",
      "Distinguish a genuine attack from a capacity miss; both can be supervisory, but remedies differ.",
    ],
  },
  {
    id: "ess-06",
    prompt:
      "Cloud residency, vendor lock-in, and incident response: write from a market regulator’s chair on intermediaries that run core systems off-premises.",
    guide: [
      "Residency is not the same as security; say what you actually need (access for inspection, logs, and exit).",
      "Lock-in: data formats, IAM, and runbooks that only the vendor can execute are the real traps.",
      "Incident response: who calls the exchange, who notifies clients, and who holds the encryption keys at 2 a.m.",
      "Close with outcome-based rules plus inspectability, not a ban on cloud.",
    ],
  },
  {
    id: "ess-07",
    prompt:
      "Unique identifiers (PAN, LEI, UCC, ISIN) stitch a market together. How does bad master data become a gift to collusion, and what should “golden record” work be worth inside a regulator?",
    guide: [
      "Show a join failure: two codes for one beneficial owner, or one UCC reused, and wash-trade graphs go blind.",
      "Treat golden records as a control, not janitorial work that models can paper over.",
      "Mention related-party and acting-in-concert graphs — identifiers are nodes, not decoration.",
      "End with one hygiene metric (duplicate rate, unmatched PAN, or stale LEI) a supervisor could actually demand.",
    ],
  },
  {
    id: "ess-08",
    prompt:
      "Should a securities regulator build more software in-house or specify outcomes and buy? Argue using surveillance or corporate filings as the example.",
    guide: [
      "State the trade-off: control of the statutory mind versus speed and specialised engineering.",
      "In-house: you can explain the rule in court; you may ship slowly and lose people.",
      "Buy: you get a platform; you may outsource the definition of “abusive” if features are opaque.",
      "Propose a hybrid: own the theory of harm, the data model, and the audit trail; buy undifferentiated plumbing.",
    ],
  },
  {
    id: "ess-09",
    prompt:
      "Maker-checker is boring until it fails. Discuss four-eye controls in corporate filings, intermediary operations, and a regulator’s own privilege accounts.",
    guide: [
      "Define four-eye: two independent humans (or a human plus a constrained system) for irreversible acts.",
      "Filings: a wrong share-capital number is a market event, not a typo.",
      "Ops: who can release a payout file, change a UCC mapping, or disable a surveillance rule.",
      "Close with privilege: admin access without logging is a paper control.",
    ],
  },
  {
    id: "ess-10",
    prompt:
      "Settlements buy speed; fully reasoned orders build precedent. Which should enforcement prefer when the file is a novel technology abuse, and why?",
    guide: [
      "Do not pick “always settle” or “always litigate”; tie the choice to whether the law needs a public characterisation.",
      "Novel abuse (a new spoofing flavour, a new social-media pump) may need a reasoned order so the market can learn the line.",
      "Repeat, well-understood books-and-records failures may settle if the remedy is real (systems, not a cheque only).",
      "Mention due process: a settlement is not a finding the next officer can blindly copy.",
    ],
  },
  {
    id: "ess-11",
    prompt:
      "Index concentration means a handful of names dominate benchmarks and passive flows. What should a regulator worry about, and what should it refuse to micro-manage?",
    guide: [
      "Worry: herding, liquidity illusion, and governance of the index provider.",
      "Do not pretend a regulator can pick a “better” sector mix for the economy from Dalal Street.",
      "Tools: disclosure of methodology, conflict rules for index administrators, and stress of tracking products.",
      "Close with what is not the job: capping a successful company because it is large.",
    ],
  },
  {
    id: "ess-12",
    prompt:
      "ESG labels can inform capital or they can greenwash it. How should disclosure rules treat that risk without turning listing into a morality exam?",
    guide: [
      "Thesis: ESG is a disclosure and naming problem before it is a virtue problem.",
      "Require comparable metrics and assurance where claims are used to sell a product.",
      "Warn against a taxonomy so political that issuers game the label instead of the operations.",
      "IT angle: machine-readable filings beat PDF poetry for both investors and surveillance of contradictions.",
    ],
  },
  {
    id: "ess-13",
    prompt:
      "Open-source software in a regulator’s stack: advantages, supply-chain risk, and what “ownership” of a fork should mean when an incident hits.",
    guide: [
      "Advantage: inspectability, no licence ambush, a skills market.",
      "Risk: a poisoned dependency, an unmaintained library, and a volunteer who disappears.",
      "Ownership: who patches, who SBOM-tracks, who is on call — a fork without a team is a souvenir.",
      "Policy line: allow OSS, require provenance and a named owner, same as a vendor product.",
    ],
  },
  {
    id: "ess-14",
    prompt:
      "Financial literacy campaigns are popular. When are they a complement to product regulation, and when are they an alibi for leaving a harmful product on the shelf?",
    guide: [
      "Literacy helps when the product is useful but easy to misuse (SIP vs leveraged options).",
      "It is an alibi when the distribution incentive is to sell complexity the average client cannot price.",
      "Give one example of a rule that does not depend on the client becoming an expert (leverage caps, cooling-off).",
      "Close: education is not a substitute for suitability and honest packaging.",
    ],
  },
  {
    id: "ess-15",
    prompt:
      "Cross-border listings and depository receipts complicate enforcement. What can a domestic securities regulator still do well?",
    guide: [
      "Domestic perimeter: what trades here, who intermediates here, and what is disclosed to domestic investors.",
      "Cooperation: MoUs, audit access, and freeze of local accounts beat empty extra-territorial speeches.",
      "Admit the limit: you may not get a server in another country by lunchtime.",
      "IT still matters: trade reconstruction on the local venue is yours even if the issuer is not.",
    ],
  },
  {
    id: "ess-16",
    prompt:
      "Is “technology neutrality” a useful principle when an instrument looks like a token, trades like a security, and clears like neither?",
    guide: [
      "Neutrality means same economic function, same core protections — not “ignore the rails”.",
      "If it is a security in substance, disclosure, intermediaries, and market-abuse rules should attach.",
      "Rails still need their own operational rules (keys, forks, settlement finality).",
      "Avoid both: banning a word (“crypto”) and pretending a white paper is a prospectus.",
    ],
  },
  {
    id: "ess-17",
    prompt:
      "Using personal trading data of employees inside a regulator or a market infrastructure institution: write on the ethics and the control design.",
    guide: [
      "Purpose limitation: detect conflicts and insider misuse, not lifestyle scoring.",
      "Least privilege, logging of who viewed a file, and a clear legal basis.",
      "False positives destroy trust; a human review step is part of ethics, not softness.",
      "Close with reciprocity: the same institution must not leak the watchlist it uses to police others.",
    ],
  },
  {
    id: "ess-18",
    prompt:
      "Innovation sandboxes are often public relations. Describe a sandbox that would change a sceptic’s mind, and one design that would confirm the cynicism.",
    guide: [
      "A real sandbox: time-bound relief, published tests, exit criteria, and a kill-switch if retail harm appears.",
      "Cynicism: a press note, no data sharing with supervisors, and a product that graduates without a post-mortem.",
      "IT: the sandbox must produce inspectable logs, not a slide deck.",
      "The sceptic is persuaded by a refusal to graduate a pretty but unsafe idea.",
    ],
  },
  {
    id: "ess-19",
    prompt:
      "Should SEBI-style disclosure keep pace with social-media rumours, or is speed the enemy of accuracy? Argue with one market example.",
    guide: [
      "Rumour-plus-silence can be as informative as a lie; issuers gaming “no comment” is a problem.",
      "Speed without verification creates a second rumour in official clothing.",
      "A middle path: confirm/deny material events quickly; fuller numbers on a known clock.",
      "Example: a leak of results, a promoter rumour, or a circulating fake circular.",
    ],
  },
  {
    id: "ess-20",
    prompt:
      "Outages at exchanges or depositories are systemic events. Draft the principles of a public post-incident report that would actually help the next officer.",
    guide: [
      "Timeline in local time, with when the market was told versus when the system knew.",
      "Blast radius: which segments, which clients, what was unreconciled.",
      "Root cause in engineering language plus the control that failed (capacity, failover, change management).",
      "What will change, who owns it, and a date — not “we take this seriously”.",
    ],
  },
  {
    id: "ess-21",
    prompt:
      "Same risk, same rule is easy to slogan. Examine it for brokers, investment advisers, and unregistered digital “tips”. Where does the slogan break?",
    guide: [
      "The slogan is a starting test for economic function, not a drafting instruction.",
      "A broker holds client assets; a tipster may only hold attention — capital and conduct rules cannot copy-paste.",
      "Where it holds: if you are paid to influence a trade, disclosure and fraud rules should find you.",
      "Where it breaks: licensing every group chat would be theatre and would miss the paid funnel.",
    ],
  },
  {
    id: "ess-22",
    prompt:
      "Algorithmic trading compressed reaction times. How should a regulator separate legitimate liquidity from abusive latency without taxing every quote?",
    guide: [
      "Purpose test: would the quote still make sense if it had to rest, or if cancels cost money?",
      "Keep public goods: tighter spreads and faster incorporation of public news.",
      "Price the tricks: flicker quotes, spoofing, layering — with clock sync and stable order IDs.",
      "Humility: some “manipulation” is a market maker hit on a stale quote.",
    ],
  },
  {
    id: "ess-23",
    prompt:
      "Data is the new surveillance fuel. Write on using alternative data for enforcement versus protecting investor privacy.",
    guide: [
      "Enforcement needs join keys; privacy needs purpose limitation and retention clocks.",
      "Scraping social posts is not the same as buying a brokerage’s entire clickstream without a legal hook.",
      "A useful test: would the same collection survive a decent defence and a parliamentary question.",
      "IT: classify data, document the theory of harm, and do not hoard “just in case”.",
    ],
  },
  {
    id: "ess-24",
    prompt:
      "Conflict-of-interest rules for research analysts still fail when the product is a short video rather than a printed report. Why, and what would a workable rule look like?",
    guide: [
      "The old rule assumed a document, a firm, and a compliance officer.",
      "A video is distribution plus personality; the consideration may be an IPO allocation or a bag of tokens.",
      "Workable: if you are paid or allocated, say so in the same frame; platforms keep the money trail.",
      "Do not require a 40-page disclaimer that nobody reads; require a true one-liner and a registry of paid promoters.",
    ],
  },
  {
    id: "ess-25",
    prompt:
      "The case for and against a shorter trading day or additional call auctions in Indian cash equities. Take a position and name the IT consequences.",
    guide: [
      "For: concentration of liquidity, less overnight gap theatre, operational rest.",
      "Against: discovery for news that arrives in the extra hour, and global overlap.",
      "Auctions: can reduce open/close chaos if the matching rules are understood.",
      "IT: batch windows, capacity at the close, and surveillance that does not assume a continuous book.",
    ],
  },
  {
    id: "ess-26",
    prompt:
      "Culture in a market-infrastructure institution rarely survives a change of CEO unless it is written into controls. Discuss with one example (exchange, depository, or clearing).",
    guide: [
      "Culture as slogans dies with the town hall; culture as maker-checker, incident reports, and no-blame logging survives.",
      "Example: how an outage is discussed internally — heroics versus runbooks.",
      "A regulator cannot inspect “values”; it can inspect whether the DR test was real.",
      "Close: hire for the control you will audit, not the poster you will like.",
    ],
  },
  {
    id: "ess-27",
    prompt:
      "Machine learning versus human intelligence in market surveillance: will models replace officers, or only rank their queues? Argue for a Grade A IT audience.",
    guide: [
      "Models scale known patterns; officers own the legal “why”.",
      "Replacement talk fails when the defence asks for the feature list.",
      "Ranking is the honest use: more files get a first look; the last mile stays human.",
      "The IT officer’s job is to make the ranking auditable, not magical.",
    ],
  },
  {
    id: "ess-28",
    prompt:
      "Should banks and market intermediaries treat social healthcare or “impact” products as a listing theme, a CSR slide, or a conduct risk? Write as a policy essay.",
    guide: [
      "If it is sold as an investment, it is a disclosure product, not a charity flyer.",
      "Impact claims without metrics are marketing; with metrics they are testable.",
      "Conduct risk: bundling a feel-good wrapper around an unsuitable product.",
      "Keep the regulator’s job: honesty of the pitch, not picking the social cause.",
    ],
  },
  {
    id: "ess-29",
    prompt:
      "UPI-based blocking of funds for public issues changed the IPO cash cycle. What operational and investor-protection problems did it solve, and which new ones did it create?",
    guide: [
      "Solved: large idle application money, some refund friction, and a cleaner cash trail.",
      "Created: bank/UPI outages at the window, mandate failures, and a new vendor surface.",
      "Investor protection is only as good as the error path when the block fails at 4:59 p.m.",
      "IT: idempotent blocks, clear status APIs, and a public incident language with banks.",
    ],
  },
  {
    id: "ess-30",
    prompt:
      "A “unique client code” that is not unique is a surveillance hole. Write on one-client-one-code discipline as a technology and a legal problem.",
    guide: [
      "Legal: attribution of trades to a person; without it, wash and insider stories collapse.",
      "Technology: onboarding, PAN validation, family accounts, and NRI structures.",
      "Incentives: some intermediaries like fuzzy codes because they hide churn.",
      "Remedy: master-data audits, not a new ML model on dirty keys.",
    ],
  },
  {
    id: "ess-31",
    prompt:
      "Clock synchronisation across exchanges, brokers, and a regulator’s own capture: why is it a legal issue, not only an NTP footnote?",
    guide: [
      "Order of events is the fact pattern in spoofing, insider, and outage files.",
      "Unsynchronised clocks manufacture or destroy “priority” and “knowledge”.",
      "Ask for a standard (exchange clock, offset bound) and a retention of sync logs.",
      "An officer who cannot reconstruct time cannot reconstruct intent.",
    ],
  },
  {
    id: "ess-32",
    prompt:
      "Front-running in an electronic market is both an old crime and a new latency story. Discuss evidence, not slogans.",
    guide: [
      "Define: trading ahead of a known client or known unpublished order.",
      "Evidence: sequence, mapping of the information leak (human or wire), and P&L that is not luck.",
      "Latency alone is not front-running; a co-located market maker is not automatically a thief.",
      "IT: who could see the order, when, and whether the log can prove it.",
    ],
  },
  {
    id: "ess-33",
    prompt:
      "Should a regulator publish machine-readable circulars and filings as a first-class product, or is a PDF on a website still enough?",
    guide: [
      "Humans read PDFs; systems need schemas, versions, and stable identifiers.",
      "Machine-readable rules reduce “we missed the circular” as a defence and as a genuine accident.",
      "Cost: you must version the schema, not only the English.",
      "Take the side that a statutory body in 2020s markets owes the market a parseable feed of its own law.",
    ],
  },
  {
    id: "ess-34",
    prompt:
      "Privilege creep in a surveillance or filings system is how insider risk is born inside the regulator. Discuss technical and cultural controls.",
    guide: [
      "Least privilege, time-bound access, and logging of queries on sensitive names.",
      "Culture: curiosity about a neighbour’s holding is a disciplinary event, not a joke.",
      "Vendor staff and interns are in the threat model.",
      "Close with a test: can you show who touched a file after a leak?",
    ],
  },
  {
    id: "ess-35",
    prompt:
      "Retail “algo” products sold as a subscription sit between advisory, brokerage, and software. How should policy classify them?",
    guide: [
      "Ask what the client is buying: a signal, an execution, or a toy.",
      "If the vendor decides the trade, it is closer to advisory/portfolio; if the client clicks, it may be a tool — still with disclosure.",
      "Performance advertising is the usual lie; audited track records are rare.",
      "Do not let a licence gap become the business model.",
    ],
  },
  {
    id: "ess-36",
    prompt:
      "Disaster recovery that is never failed-over in anger is a story. What would you require of a systemically important intermediary before you believed its DR slide?",
    guide: [
      "A real failover with production-like load, not a ping of a warm box.",
      "RPO/RTO in writing, tested, and matched to the market’s clock (the open is not a weekend).",
      "People: who is on the bridge, with whose runbook, including the vendor.",
      "Evidence: logs of the last test, defects found, and defects still open.",
    ],
  },
  {
    id: "ess-37",
    prompt:
      "Whistle-blowers and cyber researchers often reach a regulator before the intermediary’s CISO does. How should intake, legal privilege, and IT forensics be designed?",
    guide: [
      "Intake must not bounce a researcher into a public mailbox that leaks.",
      "Preserve the artefact; do not “clean it up” before hashing.",
      "Legal: good-faith research versus extortion; do not criminalise the messenger by default.",
      "Feedback loop: if nothing is ever acknowledged, the next person sells the bug on a forum.",
    ],
  },
  {
    id: "ess-38",
    prompt:
      "Corporate announcements still arrive as PDFs and scans. Discuss the market-integrity cost of unstructured disclosure, and a realistic path to structured filings.",
    guide: [
      "Cost: slow digestion, unequal parsers, and surveillance that cannot join “related party” across years.",
      "Path: XBRL-like for a core set, then expand; do not wait for perfect ontology.",
      "Issuers will resist; make the structured file the official one, PDF a human copy.",
      "IT Grade A work is schema, validation, and rejecting garbage at the gate.",
    ],
  },
  {
    id: "ess-39",
    prompt:
      "A “free” trading app is paid for by attention, payment for order flow, or product push. Write on conflicts the retail client cannot see.",
    guide: [
      "Name the business model; free is a price, not a charity.",
      "Conflicts: which order is routed where, which product is on the home screen, which “learn” video is an ad.",
      "Disclosure in a settings page is not disclosure; the conflict belongs next to the button.",
      "Regulator tool: conduct rules on incentives, not a ban on neat UX.",
    ],
  },
  {
    id: "ess-40",
    prompt:
      "How should a market regulator think about third-party risk when the critical software is a library, a KYC vendor, and a cloud region — all at once?",
    guide: [
      "Map concentration: many brokers on one KYC API is a systemic story.",
      "Contractual audit rights that cannot be exercised are decoration.",
      "Fourth parties: the vendor’s vendor, and the open-source maintainer.",
      "Ask for an inventory and a tested exit, not a certificate on letterhead.",
    ],
  },
  {
    id: "ess-41",
    prompt:
      "Insider-trading surveillance is only as good as the definition of UPSI and the map of who had it. Discuss the IT problem of “who knew, when”.",
    guide: [
      "UPSI is a legal status, not a sentiment score on Twitter.",
      "The map: employees, advisors, printers, cloud admins, and the group chat.",
      "Timestamps and access logs beat anecdotes.",
      "False confidence: a model that flags every relative who bought a stock.",
    ],
  },
  {
    id: "ess-42",
    prompt:
      "Should enforcement use “naming and shaming” on social media, or only reasoned orders on the official site? Consider due process and deterrence.",
    guide: [
      "Deterrence loves a headline; due process loves a record that can be appealed.",
      "A tweet is not service of an order and can prejudice a pending matter.",
      "A middle path: official publication of orders, plain-language summaries, no pile-on.",
      "IT still publishes; it should not freelance communications risk.",
    ],
  },
  {
    id: "ess-43",
    prompt:
      "Capacity planning for a market system is a public-interest problem when the open auction is the busiest minute of the month. Discuss.",
    guide: [
      "Peak, not average, is the design load; Indian opens and F&O expiries are not SaaS traffic.",
      "Graceful degradation beats a silent hang.",
      "Publish what you will shed (new logins vs matching) so the market can plan.",
      "Post-incident: was the peak known and unfunded, or unknown?",
    ],
  },
  {
    id: "ess-44",
    prompt:
      "Explain, in essay form, why books-and-records rules are the unglamorous core of market integrity in an electronic market.",
    guide: [
      "Without reconstructable books, every other rule is a speech.",
      "Records must survive the vendor, the format change, and the officer who left.",
      "Retention clocks and immutability matter more than a pretty dashboard.",
      "An IT officer who treats logs as a cost centre has misunderstood the statute.",
    ],
  },
  {
    id: "ess-45",
    prompt:
      "A listed company’s cybersecurity incident is both an IT event and a disclosure event. Where should listing rules draw the line between panic and silence?",
    guide: [
      "Materiality: client data, trading halt risk, or ransom that hits operations.",
      "Silence that lets insiders trade is the classic failure.",
      "Panic disclosures without facts create a second incident in the share price.",
      "A prepared holding statement plus a clock for verified facts is the professional path.",
    ],
  },
  {
    id: "ess-46",
    prompt:
      "Do “gamification” features on trading apps (streaks, confetti, leaderboards) change the product into something a conduct regulator should notice?",
    guide: [
      "UX is not neutral if it is designed to increase frequency of bets.",
      "Distinguish a clear portfolio view from dopamine loops around options.",
      "Evidence: A/B tests that maximise trades are a discoverable intent.",
      "Remedy: restrict certain patterns for retail F&O, not a ban on colour.",
    ],
  },
  {
    id: "ess-47",
    prompt:
      "The role of a Grade A IT officer is not to “digitise” a circular. Write on what technical judgement a statutory body actually needs in the next five years.",
    guide: [
      "Judgement: what to build, what to inspect, and when a vendor story is false.",
      "Skills: data model of the market, security, and the humility to ask the law side.",
      "The next five years: more machine-readable law, more third-party concentration, more social-media conduct.",
      "Avoid the career essay that is only “I like coding”.",
    ],
  },
  {
    id: "ess-48",
    prompt:
      "When two identifiers disagree — the exchange’s client code and the depository’s demat account — who should be believed, and how should systems be designed so the disagreement is rare?",
    guide: [
      "Neither “always exchange” nor “always depository”; design a reconciliation with an owner.",
      "Rarity comes from onboarding that writes both from the same KYC event.",
      "Disagreements that persist are a gift to layering of identities.",
      "Supervisory metric: open breaks, age of breaks, and who can force a map.",
    ],
  },
  {
    id: "ess-49",
    prompt:
      "A false positive in surveillance can freeze a genuine trader. Write on the ethics of automated holds, human review SLAs, and the cost of being wrong in both directions.",
    guide: [
      "Wrong hold: due process and market access; wrong miss: integrity and victims.",
      "Automation should rank and pause only with a short, owned review clock.",
      "Document the threshold; a secret score is not a fair procedure.",
      "The officer’s job includes releasing the innocent quickly, not only catching the guilty.",
    ],
  },
  {
    id: "ess-50",
    prompt:
      "If you had to pick one unglamorous IT control that would most improve Indian securities markets in the next decade, what would it be, and why is it not a new AI model?",
    guide: [
      "Pick something boring and true: golden identifiers, clock sync, structured filings, or reconstructable logs.",
      "Explain why models on dirty data amplify the dirt.",
      "Show a causal chain from the control to a real file type (wash, insider, outage).",
      "End with how you would measure success in two years, not in a keynote.",
    ],
  },
];
