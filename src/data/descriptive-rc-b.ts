import { makeQuestion } from "@/data/make-question";
import type { Question } from "@/lib/types";

const rc = makeQuestion(2, 1);

export type RcDrill = {
  id: string;
  title: string;
  passage: string;
  questions: Question[];
};

function rcq(
  passage: number,
  n: number,
  question: string,
  options: [string, string, string, string],
  answer: 0 | 1 | 2 | 3,
  explanation: string,
): Question {
  return rc(
    `p2p1-drill-rc${passage}-q${n}`,
    "english",
    "hard",
    question,
    options,
    answer,
    explanation,
  );
}

export const rcDrillsB: RcDrill[] = [
  {
    id: "rc-21",
    title: "The Signal and the Shield",
    passage: `Whistle-blower systems are often measured by the number of complaints received. That is a poor measure. A silent year may indicate an ethical organisation, or merely a channel nobody trusts. Conversely, a surge may reflect growing confidence rather than growing misconduct. The useful question is whether a person can report a specific concern without surrendering identity to the very hierarchy implicated by it.

An anonymous web form is not automatically a safe channel. Uploaded documents carry metadata; case numbers may reveal reporting order; follow-up questions can expose a person's role. Nor should anonymity mean evidentiary weightlessness. A credible programme separates identity from allegation, records every access to both, and lets an independent reviewer ask questions through a masked mailbox. Deliberately false complaints can still be investigated without treating initial uncertainty as malice.

Protection also extends beyond dismissal. An employee may retain her title yet lose meetings, data access, or meaningful assignments. Those small exclusions are difficult to prove one by one but obvious as a pattern. Regulators should therefore examine changes in access, appraisal, and reporting lines after a complaint. The aim is not to guarantee every informant a favourable outcome. It is to make the route from signal to investigation auditable, while making retaliation costly even when it arrives disguised as ordinary management.`,
    questions: [
      rcq(
        21,
        1,
        "What is the central argument of the passage?",
        [
          "Complaint volume alone is the best measure of organisational ethics",
          "Effective whistle-blower systems protect identity, preserve evidence, and detect subtle retaliation",
          "Anonymous allegations should automatically result in punishment",
          "Managers should be denied access to all internal investigations",
        ],
        1,
        "The passage rejects raw complaint counts and describes identity separation, auditable handling, and monitoring for disguised retaliation.",
      ),
      rcq(
        21,
        2,
        "What can reasonably be inferred from a sudden increase in complaints?",
        [
          "Misconduct has certainly increased by the same proportion",
          "The reporting system has necessarily been compromised",
          "Employees may have become more willing to trust the channel",
          "All complaints are likely to come from one department",
        ],
        2,
        "The first paragraph says a surge may reflect growing confidence rather than more misconduct.",
      ),
      rcq(
        21,
        3,
        "In context, “evidentiary weightlessness” most nearly means:",
        [
          "The allegation is treated as having no value merely because the source is anonymous",
          "The evidence is stored in a compressed digital format",
          "The complainant bears no legal costs",
          "The investigator must ignore documentary attachments",
        ],
        0,
        "The author warns that anonymity should not make a complaint count for nothing as evidence.",
      ),
      rcq(
        21,
        4,
        "Why does the author mention lost meetings and data access?",
        [
          "To show that all role changes are unlawful",
          "To argue that informants should receive promotions",
          "To illustrate retaliation that can occur without formal dismissal",
          "To recommend public disclosure of employee calendars",
        ],
        2,
        "These examples show quiet managerial exclusions that preserve a title while harming the complainant.",
      ),
      rcq(
        21,
        5,
        "Which safeguard is NOT advocated in the passage?",
        [
          "Logging access to identities and allegations",
          "Allowing masked follow-up communication",
          "Monitoring post-complaint changes in an employee's role",
          "Guaranteeing that every informant's allegation will be upheld",
        ],
        3,
        "The final paragraph expressly says the aim is not to guarantee every informant a favourable outcome.",
      ),
    ],
  },
  {
    id: "rc-22",
    title: "When Filings Acquire Structure",
    passage: `A structured filing is sometimes described as a PDF with better manners. That understates the change. In a document, “revenue” is a word a reader locates. In a structured return, it is a tagged fact with a period, unit, entity, and definition. The gain is not prettier presentation but the ability to compare thousands of issuers without first teaching software where each table begins.

Structure, however, can manufacture false comparability. One company may tag gross revenue while another chooses a nearby concept for net revenue. A third may create a custom tag whose label sounds familiar but whose definition is not. A validator can confirm that all three files obey the schema while missing the economic disagreement. Validation is grammar, not truth.

The regulatory response should combine narrow taxonomies with visible exceptions. Common facts deserve common tags; genuinely unusual facts need extensions linked to the nearest standard concept and explained in human language. Version histories must also remain available, because a restatement that silently replaces yesterday's file destroys the evidence of what the market originally saw. Structured data becomes reliable when issuers own their tagging choices, auditors test meaning rather than file syntax, and users can reconstruct corrections. Without those controls, automation merely compares errors at greater speed.`,
    questions: [
      rcq(
        22,
        1,
        "What is the passage mainly concerned with?",
        [
          "Why all company filings should be replaced by images",
          "How structured filings enable comparison but require semantic and version controls",
          "Why custom tags should always be prohibited",
          "How investors can design corporate websites",
        ],
        1,
        "The author values tagged facts for scale but warns that valid syntax can conceal differing meanings and overwritten history.",
      ),
      rcq(
        22,
        2,
        "Which inference follows from the discussion of validators?",
        [
          "A technically valid filing may still be economically misleading",
          "Validators can determine whether a company's revenue is genuine",
          "Schema compliance eliminates the need for audit",
          "Net revenue can never be represented structurally",
        ],
        0,
        "The passage distinguishes grammatical validity from truth and gives inconsistent revenue tagging as the example.",
      ),
      rcq(
        22,
        3,
        "The phrase “PDF with better manners” is used to describe:",
        [
          "The author's complete definition of structured reporting",
          "A dismissive view that misses the analytical significance of tagged facts",
          "A filing with corrected spelling and punctuation",
          "A document approved by an exchange",
        ],
        1,
        "The phrase represents an inadequate description; structured data changes facts into comparable, machine-readable objects.",
      ),
      rcq(
        22,
        4,
        "Why should prior versions of a filing remain available?",
        [
          "To increase storage expenditure",
          "To let companies reuse obsolete taxonomies",
          "To reconstruct what the market saw before a restatement",
          "To prevent any correction after publication",
        ],
        2,
        "The final paragraph says silent replacement destroys evidence of the originally published information.",
      ),
      rcq(
        22,
        5,
        "Which claim is NOT made by the author?",
        [
          "Common facts should ordinarily use common tags",
          "Unusual facts may justify explained extensions",
          "Auditors should examine meaning as well as syntax",
          "Every extension necessarily proves an attempt to deceive",
        ],
        3,
        "The author permits extensions for genuinely unusual facts if they are linked and explained.",
      ),
    ],
  },
  {
    id: "rc-23",
    title: "The Investor as Player",
    passage: `A burst of confetti after a first trade appears harmless. It may even make an intimidating product feel accessible. But interface rewards are not neutral decoration when they celebrate an action from which the platform earns money. The relevant question is not whether an app looks playful; it is whether its cues shorten deliberation precisely where risk warrants a pause.

Gamification also works through omission. A streak counter displays consecutive trading days but not consecutive days of losses. A leaderboard ranks returns without showing leverage or survivorship. A push alert says an option is “moving” without stating that its remaining time value is evaporating. None of these statements need be literally false to create a distorted decision environment.

A sensible rule would not prescribe grey screens. It would test whether prompts are symmetric and tied to the investor's interest. If an app celebrates frequent orders, it might also interrupt repeated loss-making trades, show total costs, and cool access to a product after an appropriateness failure. Firms should retain the sequence of screens and experiments shown to each user, not merely the final click. That record reveals whether consent was informed or engineered. Design can educate and simplify; the objection begins when behavioural insight is used to maximise an intermediary's transaction revenue while the resulting risk remains with the customer.`,
    questions: [
      rcq(
        23,
        1,
        "Which statement best captures the author's main point?",
        [
          "Colourful interfaces should be banned from financial apps",
          "Gamified design is problematic when it accelerates risky, revenue-generating behaviour without balanced cues",
          "Retail investors should trade only through telephone orders",
          "Every push notification contains a false statement",
        ],
        1,
        "The passage focuses on incentive-aligned design that compresses deliberation and proposes symmetric prompts and auditability.",
      ),
      rcq(
        23,
        2,
        "What is implied by the example of a returns leaderboard?",
        [
          "Rankings can mislead even when the displayed returns are accurate",
          "All highly ranked investors used no leverage",
          "Leaderboards guarantee future performance",
          "Survivorship information is irrelevant to comparison",
        ],
        0,
        "Omitting leverage and failed participants distorts interpretation without requiring the shown return to be false.",
      ),
      rcq(
        23,
        3,
        "The author's attitude toward design in financial apps is best described as:",
        [
          "Hostile to every attempt at simplification",
          "Indifferent because investors always act rationally",
          "Conditional: design can help, but incentive-driven manipulation requires controls",
          "Enthusiastic about any feature that raises trading frequency",
        ],
        2,
        "The author accepts education and simplification while objecting to design used to maximise platform revenue at customer risk.",
      ),
      rcq(
        23,
        4,
        "What purpose would retaining the sequence of screens shown to a user serve?",
        [
          "It would establish whether the interface engineered the user's consent",
          "It would eliminate the need to retain the final order",
          "It would permit apps to hide experimental variants",
          "It would calculate the exchange's closing price",
        ],
        0,
        "The sequence provides evidence about prompts and experiments preceding the final click.",
      ),
      rcq(
        23,
        5,
        "Which control is NOT suggested in the passage?",
        [
          "Displaying total costs",
          "Interrupting repeated loss-making trades",
          "Cooling access after an appropriateness failure",
          "Requiring every investment app to use a monochrome interface",
        ],
        3,
        "The author explicitly says a sensible rule would not prescribe grey screens.",
      ),
    ],
  },
  {
    id: "rc-24",
    title: "Nine-Fifteen Is a Capacity Event",
    passage: `An exchange may process the day's average order flow comfortably and still fail at the opening bell. Capacity is consumed by peaks, not averages. At the open, overnight news, queued retail instructions, algorithm restarts, and price-discovery messages arrive together. A system sized to an ordinary minute can therefore be “available” all day except when availability matters most.

Adding servers is only part of the answer. The opening path may contain a serial risk check, a shared database lock, or a login service that every session must cross. Such bottlenecks do not disappear when order gateways multiply. Nor is a test meaningful if it replays smooth historical traffic. A credible exercise compresses cancellations, modifications, logins, and market-data subscriptions into the same interval, then introduces a slow dependency to observe whether back-pressure works.

Governance matters because capacity claims invite optimism. Business teams forecast a comfortable peak; engineers know which queue was nearly full; vendors certify only their own component. The board should receive service-level headroom for the complete transaction path, together with rejected-message counts and recovery behaviour. Controlled admission may be less damaging than accepting instructions that expire unseen. The standard is not infinite capacity. It is honest knowledge of the limiting resource and a predictable response before congestion becomes disorderly access.`,
    questions: [
      rcq(
        24,
        1,
        "What is the main idea of the passage?",
        [
          "Daily average volume is sufficient for exchange capacity planning",
          "Opening capacity must be tested end to end against concentrated, mixed demand and known bottlenecks",
          "All opening orders should be postponed until noon",
          "Hardware expansion alone guarantees orderly access",
        ],
        1,
        "The author emphasises peak demand, serial dependencies, realistic stress, and governance of end-to-end headroom.",
      ),
      rcq(
        24,
        2,
        "Why might multiplying order gateways fail to improve opening capacity?",
        [
          "Gateways cannot receive cancellations",
          "A shared serial dependency may remain the true bottleneck",
          "Retail instructions never pass through gateways",
          "Market data is published only after the close",
        ],
        1,
        "The passage identifies serial checks, locks, and common login services that remain constrained despite more gateways.",
      ),
      rcq(
        24,
        3,
        "In the passage, “back-pressure” most nearly refers to:",
        [
          "A mechanism for controlling incoming work when a downstream dependency slows",
          "Pressure from directors to conceal an outage",
          "A legal challenge from rejected investors",
          "The physical cooling of exchange servers",
        ],
        0,
        "The stress test slows a dependency to see whether the system limits or manages incoming load safely.",
      ),
      rcq(
        24,
        4,
        "Why does the author contrast controlled admission with accepting all instructions?",
        [
          "To claim rejected messages never matter",
          "To show that explicit throttling can be safer than silently stranded orders",
          "To require unlimited capacity at all times",
          "To recommend removing service-level metrics",
        ],
        1,
        "The accepted instruction may expire unseen, while controlled admission gives a predictable congestion response.",
      ),
      rcq(
        24,
        5,
        "Which item is NOT proposed as part of capacity governance?",
        [
          "End-to-end service headroom",
          "Rejected-message counts",
          "Recovery behaviour",
          "A guarantee that demand can never exceed capacity",
        ],
        3,
        "The author expressly rejects infinite capacity as the standard.",
      ),
    ],
  },
  {
    id: "rc-25",
    title: "The Record Behind the Screen",
    passage: `Books-and-records duties sound inherited from an age of ledgers. Their purpose is not nostalgic. A regulated firm must be able to show how an instruction became an order, an allocation, a fee, and finally a statement. A modern interface can make that chain harder to see because each step lives in a different service and some decisions are made by configurable rules.

Keeping database rows is not enough. If a broker cannot reproduce the fee table, routing preference, or risk limit that applied at the time, yesterday's transaction will be judged using today's configuration. Chat approvals and spreadsheet overrides are equally fragile when attachments disappear or cells change without attribution. A useful record therefore includes the event, the governing rule's version, the actor or service that invoked it, and any later correction.

Retention should nevertheless be selective. Saving every debug trace forever makes relevant evidence expensive to locate and exposes client data without purpose. Firms need a schedule linked to legal obligations, holds that suspend deletion for identified matters, and tests proving that archived material can actually be restored. The regulator's demand is not that storage be endless. It is that a firm can produce a coherent, time-specific account without rebuilding history from employee memory after a dispute has begun.`,
    questions: [
      rcq(
        25,
        1,
        "What is the author's principal argument?",
        [
          "Modern firms no longer require books-and-records rules",
          "Records must reconstruct transactions with the rules and actors that applied at the time",
          "Every system trace should be retained permanently",
          "Paper ledgers are more reliable than databases in all cases",
        ],
        1,
        "The passage defines records as a time-specific chain linking instructions, configurations, actors, and corrections.",
      ),
      rcq(
        25,
        2,
        "What is implied about a database row stored without configuration history?",
        [
          "It may not explain why the transaction received its original treatment",
          "It is necessarily fraudulent",
          "It contains too much information for a regulator",
          "It can automatically recover missing chat attachments",
        ],
        0,
        "Without the historical fee, routing, or risk configuration, the firm may apply today's rules when explaining yesterday.",
      ),
      rcq(
        25,
        3,
        "The word “fragile” as applied to chat approvals and spreadsheets means they are:",
        [
          "Physically easy to break",
          "Unreliable as durable, attributable evidence",
          "Always prohibited by law",
          "Too expensive to transmit",
        ],
        1,
        "Attachments can vanish and cells can change without attribution, weakening the evidentiary chain.",
      ),
      rcq(
        25,
        4,
        "What is the function of a legal hold?",
        [
          "To suspend scheduled deletion for material relevant to an identified matter",
          "To prevent any client from trading",
          "To preserve only today's software configuration",
          "To replace archive-restoration tests",
        ],
        0,
        "The final paragraph identifies holds as exceptions to normal deletion for specific matters.",
      ),
      rcq(
        25,
        5,
        "Which position is NOT taken in the passage?",
        [
          "Archived information should be tested for restorability",
          "Retention schedules should reflect legal duties",
          "Corrections should be part of the record",
          "All debug traces should be stored forever regardless of purpose",
        ],
        3,
        "The author rejects indiscriminate permanent retention because it raises search costs and data exposure.",
      ),
    ],
  },
  {
    id: "rc-26",
    title: "Material Cyber Facts",
    passage: `A listed company confronting a cyberattack faces two bad instincts. The first is to announce every technical alert before its significance is known. The second is to wait for a complete forensic report, by which time customers, counterparties, and traders may have learned fragments elsewhere. Securities disclosure should turn neither packet loss nor perfect certainty into the threshold.

Materiality depends on business effect: prolonged loss of a critical service, compromise of information likely to create liability, manipulation of financial records, or disruption that changes expected performance. The initial notice can state what is known, what remains uncertain, and when the next update will arrive. That is not an admission that every feared consequence occurred. It is disciplined uncertainty.

Boilerplate is the greater long-term danger. If each incident produces the same sentence about “unauthorised access with no material impact,” investors cannot distinguish a contained probe from stolen customer credentials. Boards should approve escalation criteria before a crisis, preserve the evidence behind materiality decisions, and correct earlier statements visibly rather than editing a webpage in silence. Cyber disclosure is not a substitute for containment, and disclosure rules should not force publication of details that help an attacker. Their function is narrower: prevent management from using technical complexity as a reason to delay market-relevant facts.`,
    questions: [
      rcq(
        26,
        1,
        "What approach to cyber disclosure does the passage advocate?",
        [
          "Immediate publication of every technical alert",
          "Waiting until all forensic uncertainty has disappeared",
          "Timely, business-focused disclosure that states known facts and remaining uncertainty",
          "Permanent secrecy whenever an attack is ongoing",
        ],
        2,
        "The passage rejects both instant alert disclosure and perfect-certainty delay, using business effects and staged updates.",
      ),
      rcq(
        26,
        2,
        "What may be inferred about an initial cyber notice?",
        [
          "It can be useful without resolving every forensic question",
          "It must assign criminal responsibility",
          "It should contain exploit instructions",
          "It can never be corrected later",
        ],
        0,
        "The author calls a notice separating known and uncertain matters “disciplined uncertainty.”",
      ),
      rcq(
        26,
        3,
        "The author's attitude toward boilerplate disclosure is:",
        [
          "Approving because consistency is always informative",
          "Critical because repeated generic language obscures meaningful differences",
          "Neutral because investors ignore disclosures",
          "Supportive only when customer data was stolen",
        ],
        1,
        "Generic “no material impact” language prevents investors from distinguishing minor and serious events.",
      ),
      rcq(
        26,
        4,
        "Why should boards set escalation criteria before an incident?",
        [
          "To eliminate the need for technical containment",
          "To avoid improvising materiality decisions under crisis pressure",
          "To guarantee that attacks never occur",
          "To delegate every disclosure decision to the attacker",
        ],
        1,
        "Pre-approved criteria make escalation disciplined and provide a basis for the decision during a crisis.",
      ),
      rcq(
        26,
        5,
        "Which disclosure is NOT demanded by the passage?",
        [
          "Market-relevant business effects",
          "A visible correction of an earlier statement",
          "A statement of known and uncertain facts",
          "Technical details that would materially assist the attacker",
        ],
        3,
        "The final paragraph says rules should not force publication of details useful to an attacker.",
      ),
    ],
  },
  {
    id: "rc-27",
    title: "One Vendor, Many Gates",
    passage: `Outsourcing customer verification can lower costs and improve consistency. It can also create a concentration that remains invisible because each broker sees only its own contract. If dozens of intermediaries rely on the same identity API, a software defect or compromised update can admit false customers—or reject genuine ones—across the market at once.

The usual vendor review asks about uptime, encryption, and certifications. Those questions matter, but they do not reveal common dependency. A provider may itself call the same document-reading library, cloud region, or government gateway used by its competitors. Two apparently independent vendors can therefore fail together. Concentration must be mapped below the brand name.

No intermediary can solve the market-wide problem alone. Each can retain evidence of the checks performed, provide a manual path for disputed rejections, and rehearse a switch to a secondary service without lowering standards. Supervisors can collect dependency information under confidentiality and test correlated outage scenarios. The objective is not to duplicate every KYC function inside every firm. Nor is a second contract useful if it rests on the same hidden utility. Resilience comes from knowing where diversity is real, ensuring that a vendor's conclusion can be examined, and preventing a shared technical failure from becoming a shared failure of market access.`,
    questions: [
      rcq(
        27,
        1,
        "What is the main concern raised by the passage?",
        [
          "Outsourced KYC is always less accurate than manual KYC",
          "Hidden common dependencies can turn vendor failures into market-wide access failures",
          "Certifications should replace vendor testing",
          "Every broker must build a government identity gateway",
        ],
        1,
        "The passage centres on correlated failures hidden beneath separate contracts and vendor brands.",
      ),
      rcq(
        27,
        2,
        "Why might contracts with two different vendors provide little resilience?",
        [
          "Both vendors may depend on the same underlying library, region, or gateway",
          "Secondary vendors never perform document checks",
          "Regulators prohibit switching vendors",
          "Separate vendors must charge identical prices",
        ],
        0,
        "Brand-level diversity may conceal a common technical utility that causes both providers to fail together.",
      ),
      rcq(
        27,
        3,
        "In context, “mapped below the brand name” means:",
        [
          "Displaying a vendor's office on a street map",
          "Examining the shared technical dependencies behind nominally separate providers",
          "Removing company names from contracts",
          "Ranking vendors only by market share",
        ],
        1,
        "The preceding examples identify libraries, cloud regions, and gateways beneath the visible provider.",
      ),
      rcq(
        27,
        4,
        "What is the purpose of a manual path for disputed rejections?",
        [
          "To permit access without any identity checks",
          "To give genuine applicants recourse when automated verification fails",
          "To hide vendor error rates",
          "To replace all automated verification permanently",
        ],
        1,
        "A manual route prevents a technical false rejection from becoming an unreviewable denial of access.",
      ),
      rcq(
        27,
        5,
        "Which measure is NOT supported by the passage?",
        [
          "Confidential supervisory collection of dependency data",
          "Testing correlated outages",
          "Retaining evidence of completed checks",
          "Assuming a second vendor is independent merely because its brand differs",
        ],
        3,
        "The passage specifically warns that different brands may share the same hidden dependency.",
      ),
    ],
  },
  {
    id: "rc-28",
    title: "Access That Outlives Its Reason",
    passage: `Privilege creep rarely begins with an intruder. It begins with useful people doing useful work. An analyst joins a project, receives production access for a migration, moves to another team, and keeps the old entitlement “just in case.” Contractors accumulate roles across renewals. Service accounts inherit broad permissions because nobody knows which nightly job still needs them.

Annual access certification often turns this problem into theatre. A manager receives a spreadsheet containing hundreds of unfamiliar role codes and approves them before a deadline. The signature proves that a review occurred, not that anyone understood it. Better evidence comes from usage: which privileged actions were performed, which entitlements have been dormant, and whether sensitive combinations allow one person to create and approve the same change.

Removal must be safe as well as strict. Teams resist least-privilege programmes when revocation can break an undocumented process and emergency restoration takes days. A mature system ties access to time-limited tasks, tests dependencies before removal, and offers logged, rapidly expiring emergency access. It also treats machine identities as subjects, not plumbing. The goal is not the smallest theoretical permission set. It is a permission set whose business purpose is current, whose dangerous combinations are visible, and whose exceptions expire without relying on someone's memory.`,
    questions: [
      rcq(
        28,
        1,
        "What is the passage primarily arguing?",
        [
          "Privilege creep is caused only by external attackers",
          "Access governance should use purpose, usage, separation, and expiry rather than ceremonial reviews",
          "All production access should be removed immediately",
          "Service accounts do not require access review",
        ],
        1,
        "The author critiques accumulated entitlements and spreadsheet certification, then proposes current purpose, usage evidence, and expiring access.",
      ),
      rcq(
        28,
        2,
        "Why might teams resist privilege removal?",
        [
          "They prefer annual spreadsheets",
          "Revocation may disrupt an unknown dependency while restoration is slow",
          "Dormant access always improves performance",
          "Managers are prohibited from reviewing role codes",
        ],
        1,
        "The final paragraph links resistance to the risk of breaking undocumented processes and poor emergency restoration.",
      ),
      rcq(
        28,
        3,
        "Calling annual certification “theatre” suggests that it:",
        [
          "Produces the appearance of control without informed review",
          "Requires actors to approve entitlements",
          "Is an entertaining way to train managers",
          "Should be conducted in public",
        ],
        0,
        "A deadline signature shows occurrence but not comprehension of hundreds of obscure codes.",
      ),
      rcq(
        28,
        4,
        "Why does the author mention creating and approving the same change?",
        [
          "To illustrate a dangerous combination of permissions",
          "To recommend that one person control every change",
          "To describe a dormant entitlement",
          "To define an external cyberattack",
        ],
        0,
        "The example demonstrates failure of separation of duties even if each individual entitlement appears justified.",
      ),
      rcq(
        28,
        5,
        "Which implied control best addresses privilege creep?",
        [
          "Permanent emergency administrator accounts",
          "Automatic expiry linked to a time-limited task",
          "Approval of every role code without usage evidence",
          "Excluding machine identities from governance",
        ],
        1,
        "Time-limited task access directly prevents a temporary entitlement from persisting indefinitely.",
      ),
    ],
  },
  {
    id: "rc-29",
    title: "Circulars That Software Can Read",
    passage: `A regulatory circular usually addresses people, yet it increasingly changes software. A new reporting threshold, permitted value, or deadline must be translated into validation rules by hundreds of firms. When the circular expresses those elements only in prose and tables embedded in a PDF, each firm performs its own interpretation. The resulting diversity is not innovation; it is duplicated ambiguity.

Machine-readable circulars should expose operative elements in a maintained format: defined terms, dates, affected entities, field constraints, and links to the provisions being changed. That layer does not replace signed legal text. Code cannot conveniently carry every exception, and legal meaning should not depend on whether a parser works. It can, however, reveal that one date appears in the rule package while another remains in the narrative.

Publication discipline is essential. A corrected file needs a new version, a change log, and an effective status; silently replacing a schema is equivalent to changing a traffic signal without telling drivers. Test examples should include invalid cases, since a sample showing only the happy path says little about boundaries. The prize is not automated obedience. It is a common starting point from which firms can identify genuine legal questions instead of spending their time retyping dates and guessing whether “up to” includes the stated limit.`,
    questions: [
      rcq(
        29,
        1,
        "What is the passage's central proposal?",
        [
          "Replace all legal circulars with executable code",
          "Publish maintained machine-readable operative elements alongside authoritative legal text",
          "Allow each firm to invent its own reporting deadline",
          "Remove defined terms from regulatory documents",
        ],
        1,
        "The author proposes a structured layer for dates, entities, and constraints while preserving signed legal text.",
      ),
      rcq(
        29,
        2,
        "What can a machine-readable layer reveal even though it is not legally complete?",
        [
          "A mismatch between a structured date and the narrative",
          "The regulator's private enforcement strategy",
          "Every possible factual exception",
          "Whether a court will uphold the circular",
        ],
        0,
        "The second paragraph specifically notes that the layer can expose inconsistent dates.",
      ),
      rcq(
        29,
        3,
        "The phrase “duplicated ambiguity” refers to:",
        [
          "Multiple firms independently interpreting the same prose uncertainty",
          "Two copies of an identical valid schema",
          "A circular signed by two officials",
          "Legal text translated into two languages",
        ],
        0,
        "Each firm separately translates PDF prose, multiplying uncertainty rather than producing useful innovation.",
      ),
      rcq(
        29,
        4,
        "Why should test examples include invalid cases?",
        [
          "To encourage firms to submit defective reports",
          "To clarify the boundaries of constraints, not merely the successful path",
          "To eliminate the need for a schema",
          "To make parsers ignore effective dates",
        ],
        1,
        "Invalid examples identify where a boundary rejects input; happy-path samples do not.",
      ),
      rcq(
        29,
        5,
        "Which claim is NOT made in the passage?",
        [
          "Machine-readable content should identify affected entities",
          "Corrections should carry versions and change logs",
          "The structured layer should determine legal meaning whenever a parser fails",
          "The signed legal text remains authoritative",
        ],
        2,
        "The author says legal meaning should not depend on whether a parser works.",
      ),
    ],
  },
  {
    id: "rc-30",
    title: "Knowing First and Moving Fast",
    passage: `Front-running and low-latency trading can produce the same sequence on a chart: one trader buys, a large order follows, and the first trader sells at a gain. The legal difference lies in how the first trader knew. Speed derived from public market data is not equivalent to using a client's confidential instruction, even when both anticipate demand.

That distinction is harder to prove than to state. A broker may infer likely flow from public fragments while also handling a customer order. A strategy's source code will show what signals it could consume, but not necessarily which human disclosure influenced a parameter that morning. Investigators need an evidence chain joining information access, communication, model changes, clocked orders, and economic purpose.

Rules based only on a minimum time gap invite evasion and error. A fast misuse of entrusted information remains improper; a slow response to public data does not become improper through delay. Useful controls therefore separate customer-order data from proprietary trading, record exceptional access, and preserve model deployments with reliable timestamps. Statistical patterns can select cases, but they should not by themselves decide culpability. The issue is not whether one order preceded another. It is whether the earlier position converted a duty of confidence into a private trading advantage.`,
    questions: [
      rcq(
        30,
        1,
        "What distinction does the passage emphasise?",
        [
          "Any profitable trade before a large order is front-running",
          "The source and permitted use of knowledge distinguish front-running from lawful latency",
          "Public market data may never be used by fast traders",
          "Slow trading cannot misuse confidential information",
        ],
        1,
        "The passage makes information source and duty of confidence central, rather than sequence or speed alone.",
      ),
      rcq(
        30,
        2,
        "Why may source code be insufficient evidence by itself?",
        [
          "Source code never identifies possible data inputs",
          "It may not reveal a human disclosure that influenced a parameter",
          "Investigators are prohibited from reading source code",
          "All model parameters are selected randomly",
        ],
        1,
        "The second paragraph distinguishes what software could consume from human influence on a deployment or parameter.",
      ),
      rcq(
        30,
        3,
        "In context, “converted a duty of confidence” means:",
        [
          "Changed a legal obligation into a personal trading benefit",
          "Encrypted a customer's order",
          "Measured confidence in a statistical model",
          "Transferred a duty to an exchange",
        ],
        0,
        "The concluding sentence concerns exploiting entrusted client information for private advantage.",
      ),
      rcq(
        30,
        4,
        "What function should statistical patterns perform according to the author?",
        [
          "They should conclusively determine guilt",
          "They should help select matters for investigation",
          "They should replace timestamps and communications",
          "They should impose a universal minimum time gap",
        ],
        1,
        "Patterns may select cases but should not independently decide culpability.",
      ),
      rcq(
        30,
        5,
        "Which control is NOT recommended?",
        [
          "Separating customer-order data from proprietary trading",
          "Logging exceptional access",
          "Preserving timestamped model deployments",
          "Treating every earlier profitable order as conclusive proof",
        ],
        3,
        "The passage rejects sequence alone as a basis for culpability.",
      ),
    ],
  },
  {
    id: "rc-31",
    title: "Money Reserved, Not Yet Paid",
    passage: `The block mechanism used for public-issue applications solves a familiar problem: an applicant's money remains in the bank while being reserved for possible allotment. A UPI mandate makes that arrangement convenient, but convenience can blur the states involved. A request sent, a mandate displayed, a block confirmed, and an application accepted are not the same event.

When traffic peaks near an issue's close, delays between those states matter. An investor may approve promptly yet receive confirmation after the intermediary's cutoff. Repeated taps can create duplicate requests, while a premature success screen can make a failed block look complete. Reconciliation must therefore join the application identifier, mandate, bank response, intermediary record, and final allotment rather than treating a mobile notification as proof.

Good design shows the current state and an actionable deadline, prevents duplicate submission while a response is pending, and provides a route for correction before closure. Participants also need agreed rules for clock differences and late acknowledgements. The objective is not to promise allotment or to eliminate every network delay. It is to ensure that technical uncertainty does not silently decide who entered the book. Where a failure still occurs, the records should identify the responsible hop so redress does not become a circular journey among bank, app, and intermediary.`,
    questions: [
      rcq(
        31,
        1,
        "What is the passage mainly arguing?",
        [
          "A mobile notification should conclusively prove an IPO application",
          "UPI IPO workflows require explicit states, joined reconciliation, and clear failure responsibility",
          "Applicants should transfer funds directly to issuers",
          "Network delays can be completely eliminated",
        ],
        1,
        "The author distinguishes workflow states and asks for end-to-end reconciliation, transparent status, and attributable failures.",
      ),
      rcq(
        31,
        2,
        "What is implied about a success screen shown before bank confirmation?",
        [
          "It may cause an investor to stop acting even though the block failed",
          "It guarantees allotment",
          "It prevents all duplicate requests",
          "It extends the issue deadline",
        ],
        0,
        "The passage says a premature success screen can make a failed block appear complete.",
      ),
      rcq(
        31,
        3,
        "In the final sentence, “responsible hop” most nearly means:",
        [
          "The investor's physical journey to a bank",
          "The particular participant or system stage where failure occurred",
          "A second application submitted by the investor",
          "The issuer's post-listing price movement",
        ],
        1,
        "The workflow crosses bank, app, and intermediary; the relevant hop is the stage responsible for failure.",
      ),
      rcq(
        31,
        4,
        "Why does the author list request, display, block, and acceptance separately?",
        [
          "To show that UPI applications require four different investors",
          "To demonstrate that apparent progress does not equal completed entry",
          "To argue against digital applications",
          "To describe the allotment formula",
        ],
        1,
        "The list establishes distinct states that interfaces and reconciliation must not collapse.",
      ),
      rcq(
        31,
        5,
        "Which outcome does the author explicitly NOT promise?",
        [
          "A visible current status",
          "A route to correct problems before closure",
          "Identification of the failed stage",
          "Allotment to every applicant whose block succeeds",
        ],
        3,
        "The final paragraph says the objective is not to promise allotment.",
      ),
    ],
  },
  {
    id: "rc-32",
    title: "The Theatre of Failover",
    passage: `A disaster-recovery exercise can succeed on paper while proving almost nothing. Teams announce the date, copy fresh data to the secondary site, disable risky integrations, and place experts beside every console. The application starts, a few test orders pass, and the report records a clean failover. Ordinary recovery will enjoy none of those advantages.

Honest testing introduces distance from rehearsal. The secondary site should demonstrate that it can use data replicated through the normal process, discover configuration drift, and operate with the people actually rostered for an incident. Dependencies such as identity, telecom, market data, and certificate services must be included. A trading engine that runs while users cannot authenticate is not a recovered market.

This does not mean every drill must surprise every employee. Unannounced destruction can create real harm and discourage useful learning. Scenarios should instead vary, assistance should be recorded, and exceptions should remain visible in the final report. Recovery-point and recovery-time results need distributions, not a single best number. Most importantly, the organisation should test returning to the primary environment; many systems can flee but cannot come home without losing transactions. A candid failed drill reduces future risk. A choreographed success merely transfers that risk from the dashboard to the next real outage.`,
    questions: [
      rcq(
        32,
        1,
        "What is the main argument of the passage?",
        [
          "Disaster-recovery drills should always destroy production systems",
          "Recovery tests must reflect normal data, dependencies, staffing, and return operations rather than stage success",
          "A few successful test orders prove full recovery",
          "All employees must be surprised during every drill",
        ],
        1,
        "The author contrasts choreographed exercises with realistic end-to-end recovery and candid reporting.",
      ),
      rcq(
        32,
        2,
        "Why is starting the trading engine alone insufficient?",
        [
          "The engine cannot process test orders",
          "Other essential dependencies may still prevent users from accessing the market",
          "Secondary sites never contain certificates",
          "Market data is irrelevant during recovery",
        ],
        1,
        "Authentication, telecom, market data, and certificates are needed for an operational market, not just a running engine.",
      ),
      rcq(
        32,
        3,
        "The phrase “can flee but cannot come home” refers to systems that:",
        [
          "Move to recovery infrastructure but cannot safely return to primary operations",
          "Reject orders from foreign investors",
          "Lack remote employee access",
          "Cannot transfer data to an archive",
        ],
        0,
        "The image describes failover without a tested failback, which may lose transactions.",
      ),
      rcq(
        32,
        4,
        "Why should assistance during a drill be recorded?",
        [
          "To punish every expert who participates",
          "To show which exceptional support made the result possible",
          "To conceal configuration drift",
          "To replace recovery-time measurement",
        ],
        1,
        "Visible assistance prevents a heavily supported rehearsal from being reported as ordinary recovery capability.",
      ),
      rcq(
        32,
        5,
        "Which practice is NOT endorsed?",
        [
          "Varying scenarios",
          "Including external dependencies",
          "Testing return to the primary environment",
          "Causing unannounced destructive harm in every exercise",
        ],
        3,
        "The author explicitly rejects a requirement for surprise destruction because it can create harm and inhibit learning.",
      ),
    ],
  },
  {
    id: "rc-33",
    title: "The Algorithm in a Subscription",
    passage: `Retail algorithm subscriptions are marketed as if software converts a strategy into a product. Yet the commercial arrangements vary. One provider sells fixed execution logic, another streams changing signals, and a third can place orders through a broker's interface while calling itself an education service. The label “algorithm” says little about who exercises judgement or bears responsibility.

Oversight should follow control. If a provider changes parameters across subscribers after reading the market, it resembles ongoing advice more than a static tool. If a broker selects which algorithms receive prominent placement or shares in transaction revenue, it is not merely a neutral pipe. Performance displays also require context: drawdowns, fees, capacity limits, rejected orders, and the treatment of discontinued strategies can transform an advertised return.

Registration alone will not cure poor engineering. Subscribers need a clear kill control, limits that the strategy cannot override, notice of material changes, and records identifying the version that produced each order. Simulated and live results must be separated. Regulators need not certify that an algorithm will profit; doing so would convert supervision into a warranty. They should ensure that discretion is named, conflicts are disclosed, and a customer can stop the machine without first locating the person who sold the subscription.`,
    questions: [
      rcq(
        33,
        1,
        "What is the passage's main thesis?",
        [
          "Every algorithm subscription is merely educational content",
          "Oversight should reflect actual control, discretion, conflicts, and operational safeguards",
          "Regulators should guarantee the profitability of registered algorithms",
          "Static tools and changing signal services are identical",
        ],
        1,
        "The passage looks beyond the algorithm label to functional control, marketing context, and customer safeguards.",
      ),
      rcq(
        33,
        2,
        "When does a provider most closely resemble an ongoing adviser?",
        [
          "When it sells unchanging execution code",
          "When it changes subscriber parameters after exercising market judgement",
          "When it publishes a user manual",
          "When customers independently write every parameter",
        ],
        1,
        "Central parameter changes based on current market judgement amount to continuing discretion, not a static tool.",
      ),
      rcq(
        33,
        3,
        "The phrase “neutral pipe” denotes:",
        [
          "An intermediary that only transmits orders without selecting or profiting from promoted strategies",
          "A strategy with no profitable trades",
          "A network connection without encryption",
          "A regulator that certifies returns",
        ],
        0,
        "Selection, placement, and revenue sharing undermine a broker's claim to be a passive transmission channel.",
      ),
      rcq(
        33,
        4,
        "Why must discontinued strategies be considered in performance displays?",
        [
          "Their omission may make the surviving record look better than the full experience",
          "They always outperform active strategies",
          "They contain no historical orders",
          "Their fees are paid by the regulator",
        ],
        0,
        "Excluding failed or withdrawn strategies creates survivorship distortion in advertised performance.",
      ),
      rcq(
        33,
        5,
        "Which responsibility does the passage NOT assign to regulators?",
        [
          "Requiring disclosure of conflicts",
          "Ensuring discretion is accurately described",
          "Promoting effective customer kill controls",
          "Certifying that registered algorithms will earn profits",
        ],
        3,
        "The author expressly rejects regulatory profitability warranties.",
      ),
    ],
  },
  {
    id: "rc-34",
    title: "Publicity and the Speaking Order",
    passage: `Publishing the names of entities under scrutiny can warn investors quickly. It can also impose a sanction before facts have been tested. The debate is often framed as secrecy versus courage, but timing and language matter more. A notice that accurately says an investigation has begun is different from a headline that treats investigation as guilt.

Reasoned orders perform work that publicity cannot. They identify evidence, answer defences, interpret duties, and permit an appellate body to examine the path from fact to consequence. That path guides other firms. A list of names may attract attention, yet it leaves compliance officers guessing which conduct must change. Conversely, waiting years for a final order can leave an ongoing solicitation untouched.

A defensible system uses graduated communication. Urgent interim restrictions should state their evidentiary basis and provide prompt review. Investigation announcements should avoid conclusions and receive visible updates when matters close without action. Final orders should remain searchable and should not be displaced by a louder press release. Naming is therefore neither inherently brave nor inherently unfair. Its legitimacy depends on procedural status, necessity, and correction. The regulator should optimise for useful warning and durable law, not for the number of names that appear in tomorrow's newspaper.`,
    questions: [
      rcq(
        34,
        1,
        "Which statement best expresses the passage's main idea?",
        [
          "Regulators should never identify an entity before final appeal",
          "Public naming should be graduated, status-accurate, reviewable, and supported by reasoned orders",
          "Press releases are more useful than legal orders",
          "Every investigation announcement should declare guilt",
        ],
        1,
        "The author balances timely warning with procedural accuracy, review, correction, and durable reasoning.",
      ),
      rcq(
        34,
        2,
        "What can be inferred about a searchable final order?",
        [
          "It offers compliance guidance beyond the immediate party",
          "It should be removed after a press release",
          "It cannot be appealed",
          "It serves only to attract newspaper coverage",
        ],
        0,
        "Reasoned orders explain evidence and duties, thereby guiding other firms and enabling review.",
      ),
      rcq(
        34,
        3,
        "The author's attitude toward naming-and-shaming is:",
        [
          "Unconditionally supportive",
          "Unconditionally opposed",
          "Qualified, with emphasis on procedural status and necessity",
          "Dismissive of investor warnings",
        ],
        2,
        "The passage says naming is neither inherently brave nor unfair; legitimacy depends on process and need.",
      ),
      rcq(
        34,
        4,
        "Why should an investigation announcement be updated if the matter closes without action?",
        [
          "To make the initial allegation stronger",
          "To correct the public record and avoid leaving suspicion as the last word",
          "To reopen the investigation automatically",
          "To replace the final order with a headline",
        ],
        1,
        "Visible closure updates provide the correction required when an earlier public notice created suspicion.",
      ),
      rcq(
        34,
        5,
        "Which objective is NOT endorsed by the author?",
        [
          "Providing useful investor warnings",
          "Developing durable legal guidance",
          "Allowing prompt review of urgent restrictions",
          "Maximising names in the next day's news regardless of status",
        ],
        3,
        "The concluding sentence expressly rejects newspaper name counts as the objective.",
      ),
    ],
  },
  {
    id: "rc-35",
    title: "When a Millisecond Becomes Evidence",
    passage: `Clock synchronisation appears to be an engineering standard until a disputed sequence reaches enforcement. Then a millisecond becomes testimony. If a broker, exchange, and client gateway disagree about time, each log can be internally tidy while their combined story is impossible. The party with the fastest clock may appear to have acted first without actually doing so.

A rule requiring clocks to stay within a tolerance is necessary but incomplete. Systems need a traceable time source, monitoring of drift, alerts for excursions, and records of correction. Investigators must know whether timestamps mark receipt, risk approval, dispatch, or acknowledgement. Precision printed to nine decimal places is not accuracy if the underlying event and clock are undefined.

Time governance should also survive failure. A service that loses its reference may continue stamping events rather than stop a market, but those stamps should carry a quality flag. Manual clock changes and leap-second handling require special records. These controls do not prove manipulative intent; they protect the ordering evidence from which intent may later be inferred. In that sense, synchronisation is part of procedural law. It determines whether different institutions can present one contestable chronology instead of several confident but incompatible histories.`,
    questions: [
      rcq(
        35,
        1,
        "What is the principal claim of the passage?",
        [
          "Clock synchronisation is relevant only to hardware performance",
          "Reliable, defined, and quality-marked time is essential to legal reconstruction of market events",
          "Nine decimal places always guarantee timestamp accuracy",
          "Markets should stop whenever a reference clock is lost",
        ],
        1,
        "The passage treats time controls as the foundation for a common evidentiary chronology.",
      ),
      rcq(
        35,
        2,
        "What follows if systems have internally consistent but mutually misaligned clocks?",
        [
          "Their combined ordering of events may be false",
          "Every order becomes legally invalid",
          "The exchange clock is necessarily slowest",
          "Intent can no longer matter",
        ],
        0,
        "Separate tidy logs can create an impossible joint story and wrongly identify which action came first.",
      ),
      rcq(
        35,
        3,
        "The statement “a millisecond becomes testimony” means that:",
        [
          "Time measurements may function as evidence in a disputed sequence",
          "Only human witnesses can read timestamps",
          "All enforcement hearings last one millisecond",
          "Engineers must testify about every order",
        ],
        0,
        "The metaphor elevates clock data from an operational metric to evidence about chronology.",
      ),
      rcq(
        35,
        4,
        "What is the purpose of a timestamp quality flag?",
        [
          "To claim a disconnected clock remains fully accurate",
          "To indicate that an event time was recorded while the reference was degraded",
          "To erase events recorded during drift",
          "To identify the trader's nationality",
        ],
        1,
        "A service may continue operating after losing reference, but users of its logs must know the timestamp's reduced assurance.",
      ),
      rcq(
        35,
        5,
        "Which statement is NOT claimed?",
        [
          "The meaning of each timestamp should be defined",
          "Clock corrections should leave records",
          "Synchronised clocks by themselves prove manipulative intent",
          "Drift should be monitored",
        ],
        2,
        "The final paragraph explicitly says time controls do not prove intent; they protect ordering evidence.",
      ),
    ],
  },
  {
    id: "rc-36",
    title: "Relationships Hidden in Plain Sight",
    passage: `Related-party review often begins with a list supplied by the company. That list is necessary, but it reflects legal categories and declared relationships at a moment in time. Economic influence travels through former directors, family-controlled trusts, common addresses, guarantees, and suppliers dependent on a single buyer. No one field captures it.

A graph can connect people, entities, contracts, payments, and dates, making indirect paths visible. It may show that a vendor is three edges away from a promoter or that several bidders share contact details. Yet an edge is not a verdict. Common addresses may belong to a business centre; a former director may have genuinely departed. Graph scoring without context turns proximity into accusation.

The useful control is an inquiry queue, not an automatic blacklist. High-risk paths should lead reviewers to underlying declarations, invoices, beneficial-ownership records, and approval minutes. Data must be time-bounded so a relationship existing after a transaction is not projected backward. Companies should also be able to explain or correct links while the original observation remains preserved. Graphs are valuable because they widen the field of questions. They become dangerous when visual neatness persuades an officer that the questions have already been answered.`,
    questions: [
      rcq(
        36,
        1,
        "What is the main message of the passage?",
        [
          "Company-supplied related-party lists are always fraudulent",
          "Graphs can reveal indirect relationships but should trigger contextual inquiry, not automatic conclusions",
          "Every shared address proves common control",
          "Related-party analysis needs no time information",
        ],
        1,
        "The author supports graph-based discovery while warning that connections require source evidence and temporal context.",
      ),
      rcq(
        36,
        2,
        "Why must graph data be time-bounded?",
        [
          "To prevent a later relationship from being treated as if it existed during an earlier transaction",
          "To remove all former directors from records",
          "To ensure every relationship lasts one year",
          "To replace approval minutes",
        ],
        0,
        "The third paragraph specifically warns against projecting a post-transaction relationship backward.",
      ),
      rcq(
        36,
        3,
        "The warning that “an edge is not a verdict” means:",
        [
          "A graph connection is a lead that still requires interpretation and evidence",
          "Graph databases cannot store legal decisions",
          "Only direct relationships are relevant",
          "Every indirect path should be deleted",
        ],
        0,
        "Shared attributes can have innocent explanations, so proximity alone cannot establish wrongdoing.",
      ),
      rcq(
        36,
        4,
        "What function should high-risk graph paths perform?",
        [
          "Automatically ban all connected vendors",
          "Direct reviewers to declarations, invoices, ownership records, and minutes",
          "Replace the company's books",
          "Conceal the original observation after correction",
        ],
        1,
        "The passage treats graph paths as a prioritisation device for examination of underlying records.",
      ),
      rcq(
        36,
        5,
        "Which claim is NOT made?",
        [
          "Declared lists may miss economic influence",
          "Common addresses can have innocent explanations",
          "Companies should have a route to explain links",
          "A visually neat graph conclusively answers related-party questions",
        ],
        3,
        "The concluding warning states precisely the opposite: visual neatness can falsely suggest that inquiry is complete.",
      ),
    ],
  },
  {
    id: "rc-37",
    title: "A Sandbox With an Exit",
    passage: `Scepticism about regulatory sandboxes is earned when admission produces publicity but graduation produces nothing. A small firm spends months reporting to supervisors, only to return to the same uncertain rule at the end. The regulator publishes participant numbers as evidence of innovation while keeping silent about what it learned.

A credible sandbox begins with a regulatory question, not a queue of fashionable products. For example, can a particular disclosure and transaction cap protect users of a new distribution model? The test then needs a comparison, measurable harms, a fixed end date, and a decision owner. Participants should know in advance whether success may lead to a general rule, a licence route, or evidence that the activity should not continue.

Failure can be productive if the evidence is published without exposing customers or trade secrets. Repeated complaints, operational breaks, or low comprehension may disprove the hypothesis. Extensions should require reasons rather than becoming the default. Most importantly, temporary relief must not become an advantage that incumbents cannot contest and later entrants cannot obtain. The test of a sandbox is not how many logos enter it. It is whether uncertainty is reduced for the market after they leave.`,
    questions: [
      rcq(
        37,
        1,
        "What standard does the author apply to a regulatory sandbox?",
        [
          "The number of participant logos displayed",
          "Whether it tests a defined question and reduces market uncertainty after exit",
          "Whether every participant receives permanent relief",
          "Whether fashionable products receive priority",
        ],
        1,
        "The passage demands hypotheses, measures, decisions, and general learning rather than publicity.",
      ),
      rcq(
        37,
        2,
        "What can be inferred about a failed sandbox experiment?",
        [
          "It is useless and should always be concealed",
          "It can still inform policy if evidence and reasons are reported",
          "It must automatically be extended",
          "It proves all innovation should be prohibited",
        ],
        1,
        "The author says complaints, breaks, or poor comprehension may productively disprove the hypothesis.",
      ),
      rcq(
        37,
        3,
        "The opening statement that scepticism is “earned” conveys:",
        [
          "Approval of every existing sandbox",
          "Recognition that past publicity without outcomes justifies doubt",
          "Hostility toward all experimentation",
          "Certainty that small firms never benefit",
        ],
        1,
        "The author treats cynicism as a reasonable response to programmes that publicise entry but produce no policy result.",
      ),
      rcq(
        37,
        4,
        "Why should participants know the possible exit outcomes in advance?",
        [
          "So success and failure connect to a defined regulatory decision",
          "So every firm can avoid reporting harms",
          "So temporary relief becomes permanent",
          "So no general rule can follow",
        ],
        0,
        "Predefined outcomes stop the exercise from ending in renewed uncertainty despite accumulated evidence.",
      ),
      rcq(
        37,
        5,
        "Which practice is NOT endorsed?",
        [
          "A fixed end date",
          "Reasons for extensions",
          "Protection of customer data in published findings",
          "An uncontestable permanent advantage for early participants",
        ],
        3,
        "The final paragraph warns against temporary relief becoming an entrenched advantage.",
      ),
    ],
  },
  {
    id: "rc-38",
    title: "A Token by Any Other Name",
    passage: `Digital tokens invite arguments over vocabulary because names can be designed faster than statutes. An issuer may call a unit a membership, a utility, or a governance right. Those labels are evidence of marketing, not conclusions about legal character. The more useful inquiry follows the money and the promises.

If purchasers fund a common venture, expect value from managerial work, and can trade the unit, the arrangement may carry the substance of an investment even if it also unlocks a service. Conversely, a token used immediately for a functioning service, sold without an appreciation story, may present different risks. Technical decentralisation is similarly not binary. Publishing code does not remove dependence if one team controls upgrades, treasury assets, and the public narrative.

Substance-based analysis does not mean every token belongs under securities law. Payment claims, collectibles, access credentials, and investments can fail in different ways. Regulators should publish the factors they weigh, require issuers to preserve evidence of representations and control, and revisit classification when the arrangement changes. A token that begins as access can acquire an investment character after a speculative secondary market and managerial promises emerge. Legal treatment should not oscillate with price, but neither should an early label freeze the facts forever.`,
    questions: [
      rcq(
        38,
        1,
        "What is the passage's central argument?",
        [
          "Every digital token is necessarily a security",
          "Classification should follow economic substance, control, and changing promises rather than labels alone",
          "Published code proves complete decentralisation",
          "Token prices should determine legal treatment each day",
        ],
        1,
        "The author follows funds, expectations, managerial dependence, and evolution while rejecting both blanket classification and labels.",
      ),
      rcq(
        38,
        2,
        "What may be inferred about a token that unlocks a service?",
        [
          "The utility feature alone cannot settle whether it also functions as an investment",
          "It can never be traded",
          "It must be a collectible",
          "It is outside all regulation",
        ],
        0,
        "The second paragraph says an instrument may have investment substance even if it also unlocks a service.",
      ),
      rcq(
        38,
        3,
        "The phrase “follows the money and the promises” means examining:",
        [
          "Only the token's brand name",
          "How funds are used and what purchasers are led to expect",
          "The programming language used by the issuer",
          "Daily price movement without other facts",
        ],
        1,
        "Economic funding and representations about value are more probative than a chosen label.",
      ),
      rcq(
        38,
        4,
        "Why does the author mention control over upgrades, treasury, and narrative?",
        [
          "To show that open code may coexist with practical managerial dependence",
          "To prove that all software is centralised",
          "To describe payment settlement",
          "To recommend secret code",
        ],
        0,
        "Those forms of practical control undermine a simplistic claim of decentralisation based only on publishing code.",
      ),
      rcq(
        38,
        5,
        "Which proposition is NOT advanced?",
        [
          "Classification factors should be public",
          "Classification may need review as facts change",
          "Different token functions create different risks",
          "A token's initial label should permanently determine its legal status",
        ],
        3,
        "The final sentence says an early label should not freeze the facts forever.",
      ),
    ],
  },
  {
    id: "rc-39",
    title: "The Index Maker's Other Customer",
    passage: `An index provider appears to sell a measurement, but its revenue may come from several directions. It licenses the benchmark to funds, sells constituent data to traders, and may advise an issuer seeking eligibility. Each activity can be legitimate. Together they create questions about who learns of methodology decisions and whose interests shape them.

The sharpest conflict arises before a rebalance. Advance files help licensed funds trade accurately, yet early knowledge can also be monetised. Fees linked to assets tracking the index may encourage rules that attract products, while consulting revenue may make exclusion of a client uncomfortable. Disclosure of these incentives is necessary, but a paragraph in a methodology document does not neutralise them.

Governance should separate commercial staff from decisions, record reasons for discretionary departures, and release changes on a calendar with equivalent access for similarly placed users. Committees need members able to challenge both technical and revenue arguments. Unexpected market events will still require judgement; eliminating all discretion would merely hide it in the drafting of rigid rules. The goal is not a conflict-free index, which is unlikely, but a process in which conflicts cannot silently choose the constituents.`,
    questions: [
      rcq(
        39,
        1,
        "What is the main point of the passage?",
        [
          "Index providers should have no paying customers",
          "Multiple revenue roles create conflicts that require separation, records, and fair access",
          "All index discretion should be eliminated",
          "Consulting automatically invalidates every benchmark",
        ],
        1,
        "The passage identifies legitimate but conflicting roles and proposes governance to keep incentives from silently deciding composition.",
      ),
      rcq(
        39,
        2,
        "Why does disclosure alone not resolve index-provider conflicts?",
        [
          "Investors cannot read methodology documents",
          "Stating an incentive does not prevent it from influencing a decision",
          "Disclosures are always confidential",
          "Revenue has no connection to methodology",
        ],
        1,
        "The author says a paragraph naming conflicts does not neutralise their practical effect.",
      ),
      rcq(
        39,
        3,
        "In context, “silently choose the constituents” means:",
        [
          "Commercial incentives determine composition without accountable reasoning",
          "Committee members vote without speaking",
          "Software selects stocks without producing output",
          "Funds trade after the rebalance announcement",
        ],
        0,
        "The concluding concern is that unmanaged conflicts, rather than an accountable methodology process, shape inclusion.",
      ),
      rcq(
        39,
        4,
        "What is the function of recording discretionary departures?",
        [
          "To make exceptions traceable and reviewable",
          "To prohibit responses to unexpected events",
          "To guarantee higher index returns",
          "To disclose client trading positions",
        ],
        0,
        "A reasoned record exposes where and why judgement departed from ordinary methodology.",
      ),
      rcq(
        39,
        5,
        "Which measure is NOT advocated?",
        [
          "Separating commercial staff from methodology decisions",
          "Equivalent release access for similarly placed users",
          "Committee capacity to challenge revenue arguments",
          "Pretending that rigid rules eliminate all discretion",
        ],
        3,
        "The passage says rigid rules can merely relocate and conceal discretion.",
      ),
    ],
  },
  {
    id: "rc-40",
    title: "The Price of a Free Trade",
    passage: `A zero brokerage label describes what the customer sees, not how the service is financed. An app may earn interest on idle cash, sell premium features, receive payments connected to order routing, or benefit from directing flow to an affiliated venue. None of these models is automatically abusive. The risk begins when the revenue source rewards a choice that is worse for the customer.

Best execution cannot therefore be reduced to the displayed commission. Price improvement, likelihood of execution, speed, information leakage, and the treatment of partial fills all matter. A venue paying for flow may still produce a good result, while an unpaid venue may not. But the intermediary must compare outcomes rather than assume that a contractual payment and customer interest conveniently coincide.

“Free” also shapes behaviour. Customers may trade more when each order appears costless, despite spreads, taxes, market impact, and losses from haste. Clear aggregate cost and execution reports can expose those effects. Routing logic should be versioned, conflicts should be prominent at the decision point, and quality should be tested against realistic alternatives. The answer is not to ban a price of zero. It is to stop zero from functioning as a curtain behind which the customer pays in poorer execution, greater activity, or use of assets she did not realise were financing the app.`,
    questions: [
      rcq(
        40,
        1,
        "What is the passage's central claim?",
        [
          "Zero-commission apps have no source of revenue",
          "Free trading should be banned in every form",
          "Revenue models are acceptable only if conflicts and full execution costs are controlled and visible",
          "Displayed commission is the sole measure of best execution",
        ],
        2,
        "The author accepts varied revenue models but demands outcome comparison, conflict disclosure, and visibility of indirect costs.",
      ),
      rcq(
        40,
        2,
        "What can be inferred about a venue that pays for order flow?",
        [
          "It necessarily provides the worst execution",
          "It may provide good execution, but payment cannot substitute for outcome testing",
          "It can ignore partial fills",
          "It must be affiliated with the app",
        ],
        1,
        "The passage avoids a categorical conclusion and requires comparison of actual customer outcomes.",
      ),
      rcq(
        40,
        3,
        "The metaphor of zero as a “curtain” suggests that:",
        [
          "The advertised price can conceal other ways the customer bears cost",
          "Apps should hide their interfaces",
          "Commission rates are theatrical performances",
          "Routing venues should close during trading",
        ],
        0,
        "Poorer execution, excess activity, and asset use may remain hidden behind the visible zero charge.",
      ),
      rcq(
        40,
        4,
        "Why should routing logic be versioned?",
        [
          "To reconstruct which decision rules applied to an order at a given time",
          "To prevent any future routing improvement",
          "To replace execution-quality comparisons",
          "To guarantee that every order receives a full fill",
        ],
        0,
        "Versioning makes historical routing decisions auditable against the logic then in force.",
      ),
      rcq(
        40,
        5,
        "Which claim is NOT made by the passage?",
        [
          "Frequent trading may rise when each order appears free",
          "Best execution includes more than commission",
          "All payment-for-order-flow arrangements are automatically abusive",
          "Aggregate reports can reveal indirect effects",
        ],
        2,
        "The opening says none of the listed revenue models is automatically abusive, and the second paragraph allows that a paying venue may perform well.",
      ),
    ],
  },
];
