import { descriptiveExtraPapers } from "@/data/descriptive-extra";
import { descriptivePyqPapers } from "@/data/descriptive-pyq";
import { makeQuestion } from "@/data/make-question";
import type { Question } from "@/lib/types";

const rc = makeQuestion(2, 1);

export type DescriptivePaper = {
  set: number;
  essayPrompts: string[];
  essayWordLimit: number;
  essayMarks: number;
  essayGuide: string[];
  precisPassage: string;
  precisWordLimit: number;
  precisMarks: number;
  precisModel: string;
  rcPassage: string;
  rcMarks: number;
  rc: Question[];
};

function rcq(
  set: number,
  n: number,
  question: string,
  options: [string, string, string, string],
  answer: 0 | 1 | 2 | 3,
  explanation: string,
): Question {
  return rc(
    `p2p1-m${set}-rc${n}`,
    "english",
    "hard",
    question,
    options,
    answer,
    explanation,
  );
}

const descriptiveCore: DescriptivePaper[] = [
  {
    set: 1,
    essayWordLimit: 250,
    essayMarks: 30,
    precisWordLimit: 90,
    precisMarks: 30,
    rcMarks: 40,
    essayPrompts: [
      "Algorithmic trading has compressed reaction times in cash equities. Discuss how a market regulator should draw the line between legitimate liquidity and abusive latency strategies.",
      "“Same risk, same rule” is easier to slogan than to code. Examine this in the context of brokers, investment advisers, and unregistered digital “tips” on social media.",
      "India’s T+1 settlement reduced counterparty exposure. What new operational and technology risks did it create, and how should policy treat them?",
      "Data is the new surveillance fuel. Write on the tension between using alternative data for enforcement and protecting privacy of investors.",
    ],
    essayGuide: [
      "Introduce the policy problem in two sentences; name the statutory goal (integrity, fairness, or resilience).",
      "Give one concrete market example (spoofing, social-media tips, funding fails, or alternative data).",
      "State a test the regulator can apply (intent + market impact + records), not a vague “ban technology”.",
      "Close with one implementable control (audit trail, clock sync, disclosure, or sandbox) and a residual risk.",
    ],
    precisPassage: `High-frequency and algorithmic trading are often discussed as if they were a single phenomenon. They are not. An algorithm that slices a mutual-fund order across the day to minimise market impact is a risk-management tool. A strategy that enters and cancels large orders in milliseconds to create a false impression of depth is a different animal, even if both are “electronic”. The policy error is to regulate the pipe rather than the purpose.

A useful test is whether the strategy would still make economic sense if every order were required to rest for a minimum time, or if every cancel were as expensive as a trade. Liquidity that vanishes the moment a genuine buyer appears is not liquidity; it is scenery. Exchanges already collect order-level timestamps. The missing piece is often not data but a legal characterisation that distinguishes inventory management from deception, and a supervisory capacity that can reconstruct the book after the fact.

None of this implies that speed itself is illegitimate. Tighter spreads and faster incorporation of public news are public goods. The regulator’s job is to keep the public goods and price the private tricks. That requires clock synchronisation, unique order identifiers that survive modifications, and the humility to admit that some apparent “manipulation” is just a market maker getting hit on stale quotes. Enforcement without that humility becomes a tax on quoting.`,
    precisModel:
      "Algorithmic trading is not one activity: impact-minimising execution differs from deceptive flicker quotes. Policy should test purpose—whether quotes would survive a minimum rest or costly cancels—rather than punish speed. True liquidity does not vanish from real flow. Exchanges already have timestamps; what is needed is a legal line between inventory management and deception, plus book reconstruction. Speed and tighter spreads can be public goods; the task is to keep those while pricing tricks, using clock sync and stable order IDs, without treating every stale-quote loss as manipulation.",
    rcPassage: `A securities regulator is not a ministry of technology, yet almost every modern misconduct file is a technology file. Wash trades hide in unique client codes that were never unique. Insider rumours travel on messaging apps faster than a listed company’s disclosure. A surveillance model trained on last year’s spoofing will miss next year’s “layering” variant that never quite crosses an old threshold.

The temptation is to buy a platform and declare the problem solved. Platforms help. They do not decide what “abusive” means, who may see a flag, or how long a false positive may freeze a genuine trader. Those are legal and organisational choices. If the model’s features are undocumented, the enforcement order will not survive a decent defence. If the vendor can change a rule without an audit trail, the regulator has outsourced part of its statutory mind.

The mature posture is slower and less glamorous: classify data, write down the theory of harm, keep humans in the loop for novel patterns, and treat model updates as if they were amendments to a circular. That is how information technology becomes a force-multiplier for law rather than a substitute for it.`,
    rc: [
      rcq(
        1,
        1,
        "The author’s primary claim is that:",
        [
          "Buying a surveillance platform solves market abuse",
          "Technology files still require legal definitions, accountability, and human judgement",
          "Messaging apps should be banned for listed-company staff",
          "Unique client codes have made wash trades impossible",
        ],
        1,
        "The passage argues platforms help but do not decide what is abusive; undocumented models and vendor rule-changes undermine enforcement.",
      ),
      rcq(
        1,
        2,
        "“Outsourced part of its statutory mind” most nearly means:",
        [
          "Hiring more data scientists",
          "Letting a vendor change detection logic without a traceable, owned decision",
          "Using cloud servers abroad",
          "Publishing circulars in machine-readable form",
        ],
        1,
        "The sentence follows the warning that a vendor changing a rule without an audit trail transfers a legal function.",
      ),
      rcq(
        1,
        3,
        "A surveillance model trained only on last year’s spoofing is a problem because:",
        [
          "Spoofing is legal in T+1 markets",
          "Abusive tactics mutate; a static threshold misses new variants",
          "Models cannot use order-level data",
          "Exchanges refuse to share timestamps",
        ],
        1,
        "The opening paragraph uses next year’s layering variant that never crosses an old threshold.",
      ),
      rcq(
        1,
        4,
        "Which organisational control does the author recommend for model updates?",
        [
          "Treat them like amendments to a circular: documented and owned",
          "Never update models once deployed",
          "Allow the vendor full discretion for speed",
          "Publish every feature weight in a newspaper",
        ],
        0,
        "The last paragraph: treat model updates as if they were amendments to a circular.",
      ),
      rcq(
        1,
        5,
        "The tone of the passage is best described as:",
        [
          "Uncritical enthusiasm for automation",
          "Luddite rejection of platforms",
          "Cautious: tools help, but law and process remain primary",
          "Satirical about unique client codes only",
        ],
        2,
        "Platforms help; they do not replace legal characterisation or human review of novel patterns.",
      ),
    ],
  },
  {
    set: 2,
    essayWordLimit: 250,
    essayMarks: 30,
    precisWordLimit: 90,
    precisMarks: 30,
    rcMarks: 40,
    essayPrompts: [
      "Cloud computing for market infrastructure: discuss residency, vendor lock-in, and incident response from a regulator’s chair.",
      "Should SEBI-style disclosure keep pace with social media rumours, or is speed the enemy of accuracy? Argue with examples.",
      "Retail participation in equity derivatives has grown. What investor-protection tools actually change behaviour, and which only look strict?",
      "Cyber resilience of brokers is a market-integrity issue, not an IT fashion. Discuss.",
    ],
    essayGuide: [
      "Define the public-interest harm (outage, rumour, leveraged retail loss, or stolen credentials).",
      "Separate disclosure speed from verification; or cloud convenience from contractual control.",
      "Name one tool that changes incentives (position limits, 2FA, cooling-off, tabletop incident drills).",
      "Admit a trade-off (false rumours vs delayed facts; on-prem cost vs cloud agility).",
    ],
    precisPassage: `Rumour and disclosure live on different clocks. A screenshot of an “imminent” acquisition can circle a trading group before the listed company has finished checking whether the story is even about the right entity. If the regulator demands an instant denial, it may force a company to speak while facts are still wet. If it waits for a perfect circular, the price may have already moved on a lie.

The workable middle is not “always tweet”. It is a duty to confirm or deny within a short, known window when a rumour is material and specific, plus a safe harbour for good-faith “we are checking”. Surveillance should watch the rumour’s first print as carefully as the company’s reply. The first print is often the insider’s fingerprint.

Technology can shorten the window: pre-drafted holding statements, authenticated channels, and a single source of truth for what was said. It cannot abolish the legal question of when silence becomes misleading. That question is older than the smartphone. The new fact is only that the cost of silence compounds in minutes rather than days.`,
    precisModel:
      "Rumours move faster than verified disclosure. Instant forced denials risk inaccurate speech; slow circulars let prices move on lies. A middle path is a short duty to confirm or deny material, specific rumours, with a safe harbour for good-faith checking. Watch the rumour’s first print as well as the reply—it may identify an insider. Tech can shorten response via holding statements and authenticated channels, but cannot replace the old legal question of when silence misleads; only the cost of silence is now measured in minutes.",
    rcPassage: `Cyber incidents at intermediaries are often narrated as “an IT glitch”. That phrase is a gift to whoever hopes the market will forget. A broker that cannot distinguish a genuine client order from a session hijack is not merely inconvenienced; it is an unauthorised trader with a licence. The harm is not only stolen money. It is contaminated audit trails, delayed pay-ins, and a loss of confidence that other clients will be next.

Minimum cyber baselines—multi-factor authentication, network segmentation, logging that cannot be quietly truncated—exist because voluntary excellence is uneven. The enforcement problem is proving that a control was missing before the incident, not after the consultant’s report. That is why tabletop exercises, privileged-access reviews, and immutable logs are not bureaucracy. They are how a statutory body later reconstructs who knew what, and when.

A mature circular does not pretend that zero incidents are achievable. It asks whether the entity detected, contained, notified, and learned. An entity that hides a breach to protect its brand has chosen its brand over the market’s clearing chain. That choice should be expensive.`,
    rc: [
      rcq(
        2,
        1,
        "Calling a broker breach “an IT glitch” is criticised because:",
        [
          "Glitches are always the exchange’s fault",
          "It conceals market-integrity harm: unauthorised trading, bad audit trails, lost confidence",
          "IT staff should never be blamed",
          "Only banks suffer cyber risk",
        ],
        1,
        "The author says the phrase helps people forget; the harm is unauthorised trading and contaminated trails, not mere inconvenience.",
      ),
      rcq(
        2,
        2,
        "Why are tabletop exercises and immutable logs more than bureaucracy?",
        [
          "They replace all firewalls",
          "They let a regulator reconstruct knowledge and timing after an incident",
          "They guarantee zero breaches",
          "They are required only for listed companies, not brokers",
        ],
        1,
        "The middle paragraph: they reconstruct who knew what and when, and prove controls existed before the incident.",
      ),
      rcq(
        2,
        3,
        "A “mature circular”, according to the passage, would:",
        [
          "Demand zero incidents as a legal duty",
          "Judge detection, containment, notification, and learning",
          "Ban all third-party vendors",
          "Publish every broker’s source code",
        ],
        1,
        "Last paragraph: does not pretend zero incidents; asks whether the entity detected, contained, notified, and learned.",
      ),
      rcq(
        2,
        4,
        "Hiding a breach to protect a brand is described as:",
        [
          "A legitimate trade-secret choice",
          "Choosing brand over the market’s clearing chain, which should be costly",
          "Required under insider-trading law",
          "Only a problem if money was stolen",
        ],
        1,
        "Closing lines: hiding a breach prefers brand to the clearing chain and should be expensive.",
      ),
      rcq(
        2,
        5,
        "“Unauthorised trader with a licence” refers to:",
        [
          "SEBI staff trading on UPSI",
          "A broker that cannot tell a real client from a hijacked session",
          "An unregistered YouTube adviser",
          "A depository participant without PAN",
        ],
        1,
        "Second sentence of paragraph 1: session hijack means the intermediary is effectively trading without authority.",
      ),
    ],
  },
  {
    set: 3,
    essayWordLimit: 250,
    essayMarks: 30,
    precisWordLimit: 90,
    precisMarks: 30,
    rcMarks: 40,
    essayPrompts: [
      "Index concentration: when a handful of stocks dominate a benchmark, what should a regulator worry about, and what should it not try to micro-manage?",
      "Environmental, social and governance (ESG) labels can inform or they can greenwash. How should disclosure rules treat that risk?",
      "The case for and against a shorter trading day or additional call auctions in Indian cash equities.",
      "Why conflict-of-interest rules for research analysts still fail when the product is a “finfluencer” video rather than a printed report.",
    ],
    essayGuide: [
      "State the market failure (herding, misleading labels, close-price games, unlicensed advice).",
      "Say what regulation can measure (disclosure, registration, auction design) versus what it cannot (taste for a stock).",
      "Use one Indian or comparative example without inventing a fake circular number.",
      "End with a test of success: fewer surprises, better comparison, or cleaner close—not “more PDFs”.",
    ],
    precisPassage: `ESG investing promised to price externalities that financial statements ignored. In practice, the label often prices a story. Two funds can hold similar energy majors, apply different vendor scores, and both call themselves “sustainable”. The investor who thought she had sold carbon may only have bought a methodology.

Regulators cannot decree a single true ethics. They can insist that a name, a score, and an advertisement match a written methodology that is stable enough to audit. They can punish the gap between the brochure and the portfolio more readily than they can punish the portfolio for existing. That is disclosure-plus-enforcement, not industrial policy.

The residual risk is that standardised templates become a new box-tick, while the real allocation barely moves. The answer is not to abandon standards. It is to keep a small number of comparable metrics, require an explanation of divergence, and let the market laugh at a “green” fund that owns what it claims to shun—provided the holdings are actually visible in time.`,
    precisModel:
      "ESG labels often sell a story: similar portfolios can carry different vendor scores and both claim sustainability, so an investor may not have reduced carbon at all. Regulators cannot fix one true ethics, but they can make names, scores, and ads match an auditable methodology and punish brochure–portfolio gaps. The risk is box-ticking while allocations stay put. Keep a few comparable metrics, explain divergences, and rely on visible holdings so the market can expose a “green” fund that owns what it claims to avoid.",
    rcPassage: `A benchmark is a public good that private issuers maintain. That awkward sentence explains most index controversies. If a methodology is opaque, the index is a rumour with a ticker. If it is perfectly rigid, it cannot handle a merger, a listing freeze, or a stock that became half the market by accident. The committee that tweaks weights is therefore doing policy, whether it admits it or not.

Regulators need not pick winners. They should care when a methodology change is whispered to some participants first, when a rebalance is a licensed front-running window, or when a “passive” product is sold as low-risk while its top names are a concentrated bet. Transparency of rules, a published calendar, and Chinese walls around the tweak are more honest tools than pretending the index is a force of nature.

Investors, for their part, should stop treating the benchmark as a moral judgement. It is a recipe. Recipes can be copied, criticised, and priced. They should not be worshipped.`,
    rc: [
      rcq(
        3,
        1,
        "Why does the author call a benchmark a public good maintained privately?",
        [
          "Because only the government may compute indices",
          "Many products depend on it, yet a private issuer writes the recipe",
          "Indices are always free of conflicts",
          "Passive funds are illegal without a public index",
        ],
        1,
        "Opening: a public good that private issuers maintain — products depend on it; the methodology is private.",
      ),
      rcq(
        3,
        2,
        "A methodology that is “perfectly rigid” is a problem because:",
        [
          "It cannot handle mergers, freezes, or accidental concentration",
          "It always leaks to high-frequency traders",
          "It violates PIT regulations automatically",
          "It forces daily rebalances",
        ],
        0,
        "Paragraph 1 lists merger, listing freeze, and a stock becoming half the market.",
      ),
      rcq(
        3,
        3,
        "Which supervisory concern is NOT listed?",
        [
          "Selective whispering of a methodology change",
          "Rebalance as a front-running window",
          "Selling concentrated “passive” as low-risk",
          "Banning all passive funds",
        ],
        3,
        "Paragraph 2 lists whisper, front-running window, and concentrated-bet marketing—not a ban on passive products.",
      ),
      rcq(
        3,
        4,
        "“Chinese walls around the tweak” refers to:",
        [
          "Physical walls at the exchange",
          "Information barriers so methodology changes are not used as a private tip",
          "A Great Wall ETF",
          "Translating the methodology into Mandarin",
        ],
        1,
        "In context with whispering and front-running: keep the tweak from leaking as a trading edge.",
      ),
      rcq(
        3,
        5,
        "Investors are told to treat the benchmark as:",
        [
          "A moral judgement of companies",
          "A recipe that can be copied, criticised, and priced",
          "An official SEBI rating",
          "A guarantee of low volatility",
        ],
        1,
        "Final paragraph: it is a recipe, not a moral judgement, and should not be worshipped.",
      ),
    ],
  },
  {
    set: 4,
    essayWordLimit: 250,
    essayMarks: 30,
    precisWordLimit: 90,
    precisMarks: 30,
    rcMarks: 40,
    essayPrompts: [
      "Maker-checker is boring until it fails. Discuss four-eye controls in the context of corporate filings and intermediary operations.",
      "Should enforcement prefer settlements that buy speed, or fully reasoned orders that build precedent? Take a position.",
      "Open-source software in a regulator’s own stack: advantages, supply-chain risk, and what “ownership” of a fork should mean.",
      "Financial literacy campaigns are popular. When are they a complement to product regulation, and when are they an alibi?",
    ],
    essayGuide: [
      "Pick a side early; a fence-sitting essay scores poorly in 250 words.",
      "Give one failure mode (unsigned filing, silent settlement with no law, a compromised library, a complex product sold to the uninformed).",
      "State the counter-argument in one sentence and defeat it.",
      "Close with a practical test SEBI IT or supervision could actually run.",
    ],
    precisPassage: `Settlement of enforcement proceedings is often defended as efficiency. The file closes, the investor fund receives money, and counsel go home. The hidden cost is a thin public record. If every interesting case becomes a cheque and a neither-admit-nor-deny paragraph, the market never learns which fact pattern crossed the line. Junior officers never inherit a map. Defence counsel, conversely, learn that opacity has a price list.

A regulator can keep settlements and still write. It can publish a statement of facts sufficient for the next compliance officer, reserve fully reasoned orders for novel or systemic files, and refuse settlement where the conduct was concealed from the supervisor. Speed and precedent are not a binary if the institution is deliberate about which lever it pulls.

What it cannot do is pretend that a confidential annexure is the same thing as law. Markets price law. They cannot price a rumour that someone, somewhere, paid.`,
    precisModel:
      "Settlements are efficient—files close and funds are paid—but they can starve the public of fact patterns, leaving officers without a map and teaching that opacity has a tariff. A regulator may still settle if it publishes enough facts for compliance teams, reserves full orders for novel or systemic cases, and refuses settlement after concealment. Speed and precedent can coexist if levers are chosen deliberately. A confidential annexure is not law; markets cannot price a rumour that someone paid.",
    rcPassage: `Financial literacy is the favourite appendix of every product-regulation debate. Teach the investor, and perhaps the product may stay complex. The evidence from other markets is mixed. People who can define a derivative still buy one at the wrong time because the app is frictionless and the story is social. Literacy without friction is a leaflet in a casino.

That does not make education worthless. It is most useful when the decision is rare and deliberative: a first IPO application, a first mutual-fund folio, a first complaint on a grievance portal. It is least useful as a substitute for banning a structure that only profits if the buyer misreads the payoff. A regulator that funds workshops while leaving the payoff opaque has purchased moral cover.

The IT analogue is a help page that explains a dangerous default. Better to change the default. Literacy can then explain why the safer default exists, which is a smaller, more honest job.`,
    rc: [
      rcq(
        4,
        1,
        "“A leaflet in a casino” suggests that literacy alone:",
        [
          "Always prevents gambling",
          "Fails when the interface is frictionless and the narrative is social",
          "Is illegal under SEBI rules",
          "Only works for high-frequency traders",
        ],
        1,
        "Paragraph 1: people who understand derivatives still buy at the wrong time because of apps and social stories.",
      ),
      rcq(
        4,
        2,
        "When is education most useful, according to the author?",
        [
          "For high-frequency order-routing choices",
          "For rare, deliberative first decisions (IPO, folio, complaint)",
          "As a replacement for banning opaque payoffs",
          "Only after a market crash",
        ],
        1,
        "Paragraph 2: rare and deliberative firsts — IPO, folio, grievance portal.",
      ),
      rcq(
        4,
        3,
        "Funding workshops while leaving payoffs opaque is called:",
        [
          "Best-practice disclosure",
          "Purchasing moral cover",
          "A substitute for criminal law only",
          "Required by T+1",
        ],
        1,
        "Paragraph 2 closing: moral cover.",
      ),
      rcq(
        4,
        4,
        "The recommended IT analogue is:",
        [
          "A longer help page for a dangerous default",
          "Change the default, then explain why the safer one exists",
          "Remove all defaults so users choose every time",
          "Hide complexity behind a single “I agree” click",
        ],
        1,
        "Last paragraph: better to change the default; literacy explains the safer default.",
      ),
      rcq(
        4,
        5,
        "The author’s stance on literacy is:",
        [
          "Abolish all investor education",
          "Treat it as a complement to product design, not an alibi for opacity",
          "Make it the only tool for derivatives",
          "Outsource it entirely to exchanges",
        ],
        1,
        "Education is useful for deliberative firsts; it must not substitute for regulating opaque structures.",
      ),
    ],
  },
  {
    set: 5,
    essayWordLimit: 250,
    essayMarks: 30,
    precisWordLimit: 90,
    precisMarks: 30,
    rcMarks: 40,
    essayPrompts: [
      "Artificial intelligence in market surveillance: where should a human officer remain in the loop, and why?",
      "Cross-border listings and depository receipts complicate enforcement. What can a domestic securities regulator still do well?",
      "Is “technology neutrality” a useful principle for regulating crypto-adjacent instruments that behave like securities?",
      "Write on the ethics of using personal trading data of employees inside a regulator or a market infrastructure institution.",
    ],
    essayGuide: [
      "Define the capability (pattern detection, overseas issuer, instrument classification, staff monitoring).",
      "State a rights or due-process constraint (explainability, jurisdiction, economic-substance test, proportionality).",
      "Give a failure if the constraint is ignored (black-box ban, empty extra-territorial order, unregistered security, witch-hunt).",
      "Propose one governance artefact: model card, MoU, how-to-determine note, or access log.",
    ],
    precisPassage: `Technology neutrality sounds like fairness: regulate the economic function, not the brand name of the rail. In a market that invents a new wrapper every quarter, the principle is a survival skill. If an instrument pays equity-like upside, is marketed to the public, and depends on the efforts of others, calling it a “token” should not be a magic spell.

Neutrality has a limit. Payment systems, banking books, and securities books have different failure modes. A rule written for a listed share may be nonsense for a fully collateralised payment coin, and vice versa. The adult version of neutrality is therefore a mapping exercise: which statutory book does this cash-flow belong in, and which book is being avoided for convenience?

Regulators who skip the mapping either over-ban and drive activity into darker venues, or under-ban and discover in a crash that the “utility token” was a share certificate with extra steps. The paperwork of classification is not pedantry. It is how a later court is told why the law applied.`,
    precisModel:
      "Technology neutrality means regulating economic function, not the wrapper’s name—equity-like public instruments should not escape as “tokens”. The limit is that payments, banks, and securities fail differently, so a share rule may not fit a payment coin. Adult neutrality maps cash-flows to the right statutory book instead of picking the convenient one. Skipping that mapping over-bans into dark venues or under-bans until a crash shows the token was a share. Classification paperwork is how a court later sees why the law applied.",
    rcPassage: `Employee trading policies inside a regulator look, from the outside, like hygiene. They are in fact a legitimacy system. The public will forgive a missed spoofing file more readily than a story that the people who write the files were long the stock. That is not because the missed file is unimportant. It is because legitimacy is a wasting asset, and personal trading is an easy story.

A workable policy is not a monastic ban on all markets. It is pre-clearance for sensitive names, cooling-off around unpublished supervisory work, a small list of blind vehicles, and logs that a second person can audit without drama. The IT implementation matters: if pre-clearance is an email to oneself, it will fail the first determined abuse. If it is a system with maker-checker and an immutable trail, the honest majority can live with it.

The ethical twist is over-collection. A regulator that hoovers employees’ personal brokerage as a permanent dossier has created a new insider. Proportionality is not softness. It is how the institution avoids becoming what it polices.`,
    rc: [
      rcq(
        5,
        1,
        "Why does the public treat staff trading scandals as worse than a missed spoofing file?",
        [
          "Spoofing is legal",
          "Legitimacy is fragile; “they were long the stock” is an easy, fatal story",
          "Staff trading always moves the index",
          "SEBI staff are forbidden from reading files",
        ],
        1,
        "Paragraph 1: legitimacy is a wasting asset; personal trading is an easy story.",
      ),
      rcq(
        5,
        2,
        "A “workable policy” includes all EXCEPT:",
        [
          "Pre-clearance for sensitive names",
          "Cooling-off around unpublished work",
          "A monastic ban on all markets as the only option",
          "Auditable logs",
        ],
        2,
        "The author rejects a monastic ban; lists pre-clearance, cooling-off, blind vehicles, and logs.",
      ),
      rcq(
        5,
        3,
        "Email-to-oneself pre-clearance fails because:",
        [
          "Email is always encrypted",
          "It will not stop the first determined abuse; there is no maker-checker trail",
          "SEBI does not use email",
          "It violates T+1",
        ],
        1,
        "Paragraph 2: email to oneself fails determined abuse; contrast with maker-checker and immutable trail.",
      ),
      rcq(
        5,
        4,
        "Over-collection of employees’ brokerage data is a problem because:",
        [
          "It creates a new insider and a dossier; proportionality is required",
          "Logs are illegal",
          "Brokers cannot send files",
          "It reduces T+0 capacity",
        ],
        0,
        "Final paragraph: a permanent dossier creates a new insider; proportionality is not softness.",
      ),
      rcq(
        5,
        5,
        "The phrase “avoid becoming what it polices” warns against:",
        [
          "Regulators using opaque, unaccountable personal-data power",
          "Hiring technologists",
          "Publishing circulars",
          "Using maker-checker",
        ],
        0,
        "If the institution hoovers personal data without proportion, it mirrors the information-abuse it exists to stop.",
      ),
    ],
  },
  {
    set: 6,
    essayWordLimit: 250,
    essayMarks: 30,
    precisWordLimit: 90,
    precisMarks: 30,
    rcMarks: 40,
    essayPrompts: [
      "Outages at exchanges or depositories are systemic events. Draft the principles of a public post-incident report that would actually help the next officer.",
      "Can “innovation sandboxes” be more than public relations? Describe a sandbox that would change your mind if you were sceptical.",
      "The role of unique identifiers (PAN, LEI, UCC, ISIN) in stitching a market together — and how bad master data becomes a gift to collusion.",
      "Write on whether a securities regulator should build more software in-house or specify outcomes and buy. Use surveillance or filings as the example.",
    ],
    essayGuide: [
      "Open with the failure of the last opaque “technical glitch” note, or of a sandbox that never graduates a rule.",
      "List three artefacts (timeline, root cause vs trigger, identifiers used, kill-criteria for a sandbox, build-vs-buy test).",
      "Mention an incentive: entities hide outages; vendors hide lock-in; sandboxes hide that no rule changed.",
      "Finish with what “done” looks like: a dated public note, a graduated circular, or a system the officer can still explain.",
    ],
    precisPassage: `A sandbox that never graduates a rule is a press release with a waiting room. Genuine regulatory learning looks different. It has a hypothesis (“this disclosure format will reduce search costs”), a time box, a small cohort, and kill-criteria published in advance. If the experiment fails, the honest output is a short note on why, not a silent extension.

If it succeeds, the output is a general rule, not a permanent VIP lane for the first movers. A VIP lane is the opposite of a sandbox: it is a private law. Markets notice. They will either queue for the privilege or route around the regulator.

Technology makes cheap experiments possible—new filing schemas, new complaint workflows, new confirmations. It does not make courage automatic. The scarce resource is the willingness to kill a pet project and to write down the lesson before the team that ran it is posted out.`,
    precisModel:
      "A sandbox that never becomes a rule is a press release with a waiting room. Real learning needs a hypothesis, time box, small cohort, and published kill-criteria; failure should yield a short public why, not a silent extension. Success should become a general rule, not a VIP lane—which is private law and will be queued for or routed around. Tech cheapens experiments in filings and workflows; the scarce resource is killing a pet project and writing the lesson before the team is posted out.",
    rcPassage: `Master data is unglamorous until a circular-trading ring uses three client codes, two PANs that almost match, and a stack of related-party vehicles that never quite share a director on the same day. Then everyone discovers that “unique” was a slogan. Surveillance graphs are only as honest as the identifiers they sit on.

The policy response is not one more field on a form. It is stewardship: who may create an identifier, who may edit it, what evidence is required, how duplicates are merged, and how a merge is explained years later in court. LEI, PAN, UCC and ISIN each solve a different join. Pretending they are synonyms is how analysts double-count or, worse, miss a cluster.

IT officers who treat golden-record work as janitorial will spend their careers buying smarter models to compensate for dirt. That is an expensive personality trait. Clean keys are a control. Models are an opinion about the keys.`,
    rc: [
      rcq(
        6,
        1,
        "Circular-trading rings expose master-data failure because:",
        [
          "Exchanges do not timestamp orders",
          "Multiple near-duplicate identifiers hide that the same interest sits on both sides",
          "PAN is illegal to store",
          "Graphs cannot represent companies",
        ],
        1,
        "Opening: three client codes, almost-matching PANs, related vehicles — “unique” was a slogan.",
      ),
      rcq(
        6,
        2,
        "Stewardship of identifiers includes all EXCEPT:",
        [
          "Who may create and edit",
          "Evidence required and how duplicates merge",
          "Explaining a merge years later in court",
          "Replacing all identifiers with a single social-media handle",
        ],
        3,
        "Paragraph 2 lists create/edit, evidence, merge, court explanation—not social-media IDs.",
      ),
      rcq(
        6,
        3,
        "LEI, PAN, UCC and ISIN are described as:",
        [
          "Synonyms for the same join",
          "Each solving a different join; treating them as synonyms causes double-counts or missed clusters",
          "Obsolete after T+1",
          "Only used in the government securities market",
        ],
        1,
        "Paragraph 2: each solves a different join; synonyms cause double-count or missed cluster.",
      ),
      rcq(
        6,
        4,
        "Buying smarter models to compensate for dirty keys is:",
        [
          "Best practice",
          "An expensive personality trait; clean keys are a control, models are an opinion about keys",
          "Required by BCNF",
          "The only way to catch spoofing",
        ],
        1,
        "Closing paragraph: golden-record work is a control; models opine on the keys.",
      ),
      rcq(
        6,
        5,
        "The author’s implied advice to an IT Grade A officer is:",
        [
          "Ignore identifiers and train deep nets",
          "Treat golden records as a first-class control, not janitorial work",
          "Merge all identifiers into one overnight",
          "Publish every PAN on the website",
        ],
        1,
        "The whole passage: unglamorous key hygiene is what makes surveillance graphs honest.",
      ),
    ],
  },
];

export const descriptivePapers: DescriptivePaper[] = [
  ...descriptiveCore,
  ...descriptiveExtraPapers,
];

export function descriptiveBySet(set: number) {
  return (
    descriptivePapers.find((p) => p.set === set) ??
    descriptivePyqPapers.find((p) => p.set === set)
  );
}

export const descriptiveRcQuestions: Question[] = [
  ...descriptivePapers.flatMap((p) => p.rc),
  ...descriptivePyqPapers.flatMap((p) => p.rc),
];
