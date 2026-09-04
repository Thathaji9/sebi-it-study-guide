import { makeQuestion } from "@/data/make-question";
import type { DescriptivePaper } from "@/data/descriptive";

const rc = makeQuestion(2, 1);

function rcq(
  set: number,
  n: number,
  question: string,
  options: [string, string, string, string],
  answer: 0 | 1 | 2 | 3,
  explanation: string,
) {
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

export const descriptiveExtraPapers: DescriptivePaper[] = [
  {
    set: 7,
    essayWordLimit: 250,
    essayMarks: 30,
    precisWordLimit: 90,
    precisMarks: 30,
    rcMarks: 40,
    essayPrompts: [
      "Operational resilience is measured by services restored, not servers restarted. Discuss how SEBI should frame outcome-based recovery obligations for market intermediaries.",
      "Should an exchange disclose a serious trading outage before its root cause is known? Balance market confidence, accuracy, and the need for timely public information.",
      "A disaster-recovery site that passes an annual announced drill may still fail on an ordinary Monday. Examine the case for unannounced and scenario-based resilience testing.",
      "Public incident reports can promote collective learning but also reveal defensive weaknesses. Propose a disclosure policy that serves both transparency and security.",
    ],
    essayGuide: [
      "State the critical market service, the plausible disruption, and the public-interest consequence.",
      "Distinguish recovery targets, evidence from realistic drills, and communication duties instead of treating uptime as one number.",
      "Address one counter-risk such as premature attribution, disclosure of exploitable detail, or correlated dependence on a recovery vendor.",
      "Close with a measurable control: service-level recovery evidence, an independent exercise, a dated status notice, or tracked remediation.",
    ],
    precisPassage: `Disaster recovery is frequently tested as theatre. Staff receive the date, the alternate site is warmed, and the application chosen for demonstration is the one most likely to behave. A green report then certifies that the institution can survive an event that resembles the rehearsal. Real disruptions are less considerate. They arrive during settlement, disable identity services as well as trading systems, and make the usual conference bridge unavailable.

A credible exercise begins with a service, not a machine. The question is whether clients can place, cancel, fund, and reconcile transactions within tolerable limits while components are missing. That requires business staff, technology teams, vendors, and communications officers to work from the same imperfect facts. It also requires testing degraded operation, because an orderly reduction in service may protect the market better than a heroic but unstable restart.

Recovery-time objectives are useful only when their starting point and endpoint are explicit. A database becoming reachable is not the same as a broker restoring accurate client positions. Supervisors should therefore ask for timestamped evidence, unresolved exceptions, and proof that lessons were assigned to named owners. A drill that produces no uncomfortable finding has probably tested the script rather than resilience.`,
    precisModel:
      "Announced disaster-recovery drills can become theatre, proving only that a prepared site survives a convenient script. Real incidents may strike during settlement and disable shared services. Credible tests start with client outcomes—placing, cancelling, funding, and reconciling—not machine availability, and involve business, technology, vendors, and communications under imperfect facts. Degraded service may be safer than an unstable restart. Recovery objectives need explicit start and end points, timestamped evidence, exceptions, and named remediation owners. A drill with no uncomfortable finding probably tested compliance, not resilience.",
    rcPassage: `A useful public incident report is neither a confession nor a victory lap. Its first duty is to establish a dependable sequence: when the service degraded, when the operator knew, what users experienced, and when normal processing resumed. That chronology can be published before engineers agree on the deepest cause. Facts may be labelled preliminary without being concealed.

Later, the report should separate trigger, contributing conditions, and impact. A failed network device may be the trigger; an untested routing change and an overloaded help desk may explain why the failure became a market event. Calling the device the root cause would turn a systems lesson into a shopping list.

Security is a legitimate reason to withhold exploit details, not a licence to replace explanation with “technical issue”. The report can describe failed controls, decision rights, and remediation milestones without publishing credentials or network diagrams. Most importantly, promised fixes need public closure. Otherwise every report ends at the moment accountability becomes measurable, and the market accumulates assurances instead of evidence.`,
    rc: [
      rcq(
        7,
        1,
        "What does the passage identify as the first duty of a public incident report?",
        [
          "Name the engineer who made the error",
          "Establish a dependable chronology of degradation, awareness, user impact, and restoration",
          "Publish network diagrams immediately",
          "Wait until every engineer agrees on the root cause",
        ],
        1,
        "The opening paragraph says the first duty is a dependable sequence of the incident and expressly allows preliminary facts before final causal agreement.",
      ),
      rcq(
        7,
        2,
        "Why would calling a failed network device the root cause be inadequate?",
        [
          "Network devices cannot fail during trading",
          "It ignores contributing conditions that allowed a component failure to become a market event",
          "Only a regulator may use the phrase root cause",
          "The help desk is always the root cause",
        ],
        1,
        "The passage distinguishes the trigger from routing and support weaknesses that amplified its impact.",
      ),
      rcq(
        7,
        3,
        "Which information may legitimately be withheld on security grounds?",
        [
          "The fact that users lost service",
          "All remediation milestones",
          "Exploit details such as credentials or network diagrams",
          "The time at which normal processing resumed",
        ],
        2,
        "The final paragraph permits withholding exploit details, credentials, and network diagrams, while requiring meaningful explanation.",
      ),
      rcq(
        7,
        4,
        "The phrase “assurances instead of evidence” criticises reports that:",
        [
          "Use preliminary labels",
          "Separate triggers from contributing conditions",
          "Do not publicly close promised remediation actions",
          "Describe decision rights",
        ],
        2,
        "The passage says fixes need public closure or reports stop just before accountability becomes measurable.",
      ),
      rcq(
        7,
        5,
        "The author’s preferred approach to uncertain early facts is to:",
        [
          "Conceal them until the final forensic report",
          "Publish them as settled conclusions",
          "Label them preliminary while still providing a useful chronology",
          "Let affected users infer the timeline",
        ],
        2,
        "The first paragraph says a chronology can precede final causal agreement and that preliminary facts can be labelled rather than hidden.",
      ),
    ],
  },
  {
    set: 8,
    essayWordLimit: 250,
    essayMarks: 30,
    precisWordLimit: 90,
    precisMarks: 30,
    rcMarks: 40,
    essayPrompts: [
      "Structured disclosure improves comparison only when the taxonomy reflects economic reality. Discuss SEBI’s role in governing XBRL definitions, extensions, and data quality.",
      "Should listed entities be liable when a human-readable filing is correct but its machine-readable version carries a material tagging error?",
      "Machine-readable regulation promises automated compliance. Examine why legal obligations need identifiers, version histories, and computable tests without being reduced to code alone.",
      "A common reporting schema can lower search costs while imposing disproportionate burdens on smaller issuers. Propose a phased policy for structured filings.",
    ],
    essayGuide: [
      "Identify the user and decision served by structure: investor comparison, supervisory screening, or an intermediary’s compliance control.",
      "Separate syntax validation from semantic accuracy, and give one example of a tag that can be valid yet misleading.",
      "Recognise limits such as entity-specific facts, legal discretion, taxonomy lag, and the implementation burden on smaller filers.",
      "Conclude with a governable mechanism: versioned taxonomies, extension review, dual-format reconciliation, or a tested transition period.",
    ],
    precisPassage: `Structured reporting is often sold as the end of document search. Once every fact has a tag, the story goes, a supervisor can compare issuers at the press of a key. But tags do not remove judgement; they relocate it. A company must decide whether an unusual obligation is debt, a provision, or something requiring an extension. Two valid files may therefore describe similar economics with different labels.

Taxonomy governance is the quiet centre of the system. Definitions need examples, effective dates, and a process for resolving questions before each filer invents a private dialect. Extensions are necessary for genuine novelty, yet excessive extensions destroy comparison. Rejecting all extensions is equally harmful because it forces new facts into old boxes.

Validation must also operate at two levels. Software can detect a missing identifier or an impossible date. It cannot by itself decide whether management tagged a recurring expense as exceptional to flatter a trend. That semantic question needs accounting knowledge, peer comparison, and sometimes enforcement.

The prize remains substantial: faster screening, fewer manual transcriptions, and data that investors can reuse. It is earned through stewardship, not merely by requiring uploads in a fashionable format.`,
    precisModel:
      "Structured reporting relocates rather than removes judgement: similar obligations may receive different valid tags. Taxonomy governance therefore needs definitions, examples, effective dates, and timely interpretation. Genuine extensions preserve novel facts, but excessive ones defeat comparison, while banning them forces facts into wrong categories. Validation must cover syntax and meaning; software catches missing identifiers, not an opportunistic classification of recurring expense as exceptional. Structured data can accelerate screening, reduce transcription, and aid reuse, but those benefits depend on continuing stewardship rather than a fashionable upload mandate.",
    rcPassage: `A machine-readable rulebook is not a translation of prose into a long computer program. Its first useful layer is less ambitious: stable identifiers for obligations, regulated entities, forms, and exceptions. An intermediary should be able to tell which requirement changed, when the change takes effect, and which earlier instruction it replaces. Today those answers may be buried across a circular, a corrigendum, and a frequently asked questions page.

Computable tests are valuable where the law already contains a crisp threshold. A system can check whether a return arrived within seven days or whether a field exceeds a stated limit. It should not pretend to decide whether conduct was “fair”, a conflict was “material”, or delay was “reasonable”. Those standards preserve judgement for facts that rule writers cannot enumerate.

The danger is false certainty. If unofficial code differs from authoritative text, firms may comply with the test and breach the law. Every machine-readable element therefore needs provenance, versioning, and a link to controlling language. Code can make an obligation easier to find and test. It cannot acquire legal authority by being easier to execute.`,
    rc: [
      rcq(
        8,
        1,
        "What is the proposed first layer of a machine-readable rulebook?",
        [
          "Replacing every legal standard with software",
          "Stable identifiers for obligations, entities, forms, and exceptions",
          "Removing effective dates from circulars",
          "Combining all laws into one unversioned file",
        ],
        1,
        "The opening paragraph proposes stable identifiers as the useful, deliberately modest first layer.",
      ),
      rcq(
        8,
        2,
        "Which question is most suitable for a computable test under the passage?",
        [
          "Was a conflict material?",
          "Was the intermediary fair?",
          "Did the return arrive within seven days?",
          "Was a delay reasonable?",
        ],
        2,
        "The passage treats explicit deadlines and numerical limits as computable, unlike open-textured legal standards.",
      ),
      rcq(
        8,
        3,
        "Why do standards such as “reasonable” preserve human judgement?",
        [
          "They are typographical errors",
          "Rule writers cannot enumerate every relevant factual situation",
          "Computers cannot store the word",
          "They never have legal effect",
        ],
        1,
        "The second paragraph explains that these standards address facts the rule writer cannot fully list in advance.",
      ),
      rcq(
        8,
        4,
        "The principal danger of unofficial compliance code is that:",
        [
          "It is always slower than reading prose",
          "A firm may pass the code’s test while violating the authoritative law",
          "It cannot contain dates",
          "It automatically repeals circulars",
        ],
        1,
        "The final paragraph warns of false certainty when executable tests diverge from controlling text.",
      ),
      rcq(
        8,
        5,
        "Which safeguard links machine-readable elements to legal authority?",
        [
          "Provenance, versioning, and links to controlling language",
          "Anonymous publication without dates",
          "Eliminating the prose rulebook",
          "Allowing each firm to choose its own effective date",
        ],
        0,
        "The author expressly requires provenance, versions, and a link back to controlling language.",
      ),
    ],
  },
  {
    set: 9,
    essayWordLimit: 250,
    essayMarks: 30,
    precisWordLimit: 90,
    precisMarks: 30,
    rcMarks: 40,
    essayPrompts: [
      "When a retail trading app celebrates order frequency, interface design becomes a conduct issue. Discuss the regulatory case for governing prompts, streaks, and rewards.",
      "A zero-brokerage claim may conceal compensation from venues or product manufacturers. How should a best-execution framework address PFOF-like conflicts?",
      "Attention is the scarce asset in mobile markets. Examine whether engagement algorithms should owe special duties when they rank leveraged or speculative products.",
      "Investor choice can be protected by friction as well as disclosure. Argue for or against cooling-off periods and confirmation screens in high-risk retail trades.",
    ],
    essayGuide: [
      "Describe the business incentive behind the interface, including order flow, spread capture, product commission, or retention.",
      "Connect a specific design choice to a measurable harm rather than assuming every colourful feature is manipulative.",
      "Test disclosure against stronger tools such as best execution, reward restrictions, risk-sensitive friction, and outcome monitoring.",
      "End with a proportionate rule that preserves useful access while preventing the platform from profiting invisibly from avoidable harm.",
    ],
    precisPassage: `A trading app does not merely display choices. It arranges them. The placement of a derivatives tab, the colour of a gain notification, and the timing of a prompt can alter behaviour without changing the formal product terms. This is why an interface cannot be assessed only by asking whether every mandatory risk sentence appeared somewhere on the screen.

Not every convenience is suspect. A saved bank mandate may reduce errors, and a clear portfolio view may improve decisions. The regulatory question is whether a feature helps the investor complete an intended task or creates another task that chiefly earns revenue for the platform. Rewards tied to deposits, referrals, or repeated orders deserve particular scrutiny when the economic cost is hidden in spreads or product charges.

Evidence should guide intervention. Firms can compare complaint rates, rapid reversals, losses after prompts, and behaviour of inexperienced users. Supervisors can require such tests and challenge designs whose profits depend on confusion. A blanket ban on engaging design would freeze poor interfaces along with harmful ones. The better rule is that the firm must be able to explain whose objective each influential design choice serves.`,
    precisModel:
      "Trading apps arrange choices through placement, colour, and prompts, so formal risk text alone cannot establish fairness. Convenience may reduce errors or clarify portfolios; concern arises when design creates activity that chiefly earns platform revenue. Deposit, referral, and order rewards need scrutiny where costs hide in spreads or charges. Intervention should use evidence such as complaints, quick reversals, post-prompt losses, and novice behaviour. Rather than ban engaging design, require firms to test influential features and explain whether they serve the investor’s objective or the platform’s.",
    rcPassage: `“Free” execution can involve a buyer other than the investor. A trading venue, market maker, or product issuer may reward the app for sending it orders. The payment need not copy a foreign commission formula to create the same question: did the broker choose the route for execution quality or for its own revenue?

Disclosure is necessary but weak when it says only that the firm “may receive benefits”. Investors cannot evaluate an unnamed payment against fractions of price improvement. The broker, however, has order-level data. It can compare price, likelihood of execution, speed, and total cost across available routes, then show whether customers systematically lose when the broker earns more.

The conflict may not end at routing. An app can give greater visual space to products carrying distribution fees or send alerts that manufacture order flow. Best execution should therefore examine the whole pathway from recommendation and screen placement to the completed trade. A payment is not automatically proof of poor execution. Refusing to measure its effect is evidence that the conflict is not being managed.`,
    rc: [
      rcq(
        9,
        1,
        "What central conflict can arise in nominally free execution?",
        [
          "The investor may prefer a paper contract note",
          "The broker may route orders for its own compensation rather than execution quality",
          "Every market maker refuses retail orders",
          "Price improvement is prohibited",
        ],
        1,
        "The first paragraph asks whether routing served execution quality or the broker’s revenue.",
      ),
      rcq(
        9,
        2,
        "Why is a generic statement that the firm “may receive benefits” considered weak?",
        [
          "Benefits can never be disclosed",
          "Investors lack enough detail to compare the payment with execution outcomes",
          "All investors already possess order-level routing data",
          "The statement guarantees poor execution",
        ],
        1,
        "The passage says an unnamed benefit cannot be weighed against small differences in price improvement.",
      ),
      rcq(
        9,
        3,
        "Which evidence does the passage say a broker can compare across routes?",
        [
          "Only the app’s download count",
          "Price, execution likelihood, speed, and total cost",
          "Employee attendance and office rent",
          "The colour and size of the trade button only",
        ],
        1,
        "The middle paragraph lists those four order-level dimensions.",
      ),
      rcq(
        9,
        4,
        "Why should best-execution review extend beyond the final routing decision?",
        [
          "Screen placement and alerts may steer users toward fee-bearing products and create flow",
          "Routing never affects customer outcomes",
          "Product issuers control every broker",
          "Recommendations are always legally binding",
        ],
        0,
        "The final paragraph treats recommendations, visual prominence, and alerts as parts of the conflicted pathway.",
      ),
      rcq(
        9,
        5,
        "What is the author’s position on payments connected with order flow?",
        [
          "Every payment conclusively proves bad execution",
          "Payments are irrelevant if brokerage is zero",
          "Their effects must be measured; the payment alone is not conclusive",
          "They should remain undisclosed because investors cannot calculate them",
        ],
        2,
        "The closing lines distinguish a payment from proof of harm but treat refusal to measure its effect as a governance failure.",
      ),
    ],
  },
  {
    set: 10,
    essayWordLimit: 250,
    essayMarks: 30,
    precisWordLimit: 90,
    precisMarks: 30,
    rcMarks: 40,
    essayPrompts: [
      "An intermediary may outsource a technology service but not its regulatory accountability. Discuss minimum controls for critical third-party providers.",
      "Open-source components accelerate financial software while obscuring chains of dependency. Should software bills of materials become a supervisory requirement?",
      "Vendor concentration can turn one provider’s failure into a market-wide event. Propose a policy that tests substitutability rather than merely counting vendors.",
      "When a critical vulnerability is disclosed, immediate patching may itself disrupt trading. Explain how intermediaries should govern testing, exceptions, and compensating controls.",
    ],
    essayGuide: [
      "Map the critical service and its dependency chain, including subcontractors and open-source components.",
      "Explain the failure mode in operational terms: loss of confidentiality, corrupted processing, unavailable service, or simultaneous market impact.",
      "Balance prescriptive inventory and patch duties with risk-based testing, contractual rights, and realistic migration constraints.",
      "Finish with verifiable evidence such as an SBOM, dependency owner, exercised exit plan, signed artefact, or time-bound exception.",
    ],
    precisPassage: `Modern financial software is assembled as much as it is written. A small authentication library may sit inside a vendor product, which runs in a managed container, which depends on a public package registry. The intermediary sees one contract while its service rests on several communities and firms that never signed it.

A software bill of materials helps by naming components and versions. It converts an urgent vulnerability notice from a search across guesswork into a query. Yet an inventory that is generated once and forgotten creates false comfort. Components change during builds, optional modules appear in production, and a library can be renamed or embedded. The bill must therefore attach to the released artefact and be tested against what actually runs.

Ownership matters more than abundance. Thousands of listed components are useless if nobody must decide whether a warning applies, whether a patch is safe, or what temporary control reduces exposure. Critical dependencies need named owners, supported versions, and escalation clocks.

Open source is not uniquely unsafe; hidden and abandoned code exists under every licence. The governance advantage begins when an institution can identify what it operates and ends when that knowledge is not connected to a decision.`,
    precisModel:
      "Financial software combines vendor products, containers, registries, and community libraries beyond the visible contract. An SBOM names components and versions, turning vulnerability guesswork into a query, but a stale inventory gives false comfort because builds and production differ. It should attach to each released artefact and be checked against running software. Long lists are useless without owners deciding applicability, patch safety, and temporary controls; critical dependencies need supported versions and escalation clocks. Open source is not uniquely risky: governance depends on identifying operational code and linking knowledge to decisions.",
    rcPassage: `An exit plan that begins after a supplier fails is a procurement wish. A credible plan identifies the data, credentials, interfaces, and specialist knowledge needed to continue the service elsewhere. It also states how long migration would take while the incumbent is cooperative, because that period will not become shorter during insolvency or a cyber incident.

Substitutability is often overstated. Two intermediaries may name different vendors while both vendors depend on the same identity platform or cloud region. Conversely, an internal team may not be a real alternative if it cannot access current documentation or source escrow. Counting contracts therefore says little about market concentration.

Testing an exit need not mean terminating a useful relationship. A firm can restore data into an independent environment, rotate credentials without vendor assistance, or run a limited process through an alternate provider. Failures in those exercises are valuable if they lead to funded remediation.

The board cannot outsource this judgement to a clause stating that the supplier will assist. Contractual rights are inputs. Operational capability is the result the regulator should expect to see.`,
    rc: [
      rcq(
        10,
        1,
        "Why is an exit plan created only after supplier failure called a “procurement wish”?",
        [
          "Procurement teams may never use contracts",
          "The necessary assets, knowledge, and migration path were not prepared in advance",
          "Supplier failure always shortens migration",
          "Regulators prohibit alternative providers",
        ],
        1,
        "The opening paragraph requires advance identification of data, access, interfaces, knowledge, and realistic migration time.",
      ),
      rcq(
        10,
        2,
        "How can apparently different vendors still create concentration risk?",
        [
          "They may share an underlying identity platform or cloud region",
          "They always charge the same fee",
          "They must use identical brand names",
          "They employ the same procurement officer",
        ],
        0,
        "The second paragraph notes common hidden dependencies beneath nominally different suppliers.",
      ),
      rcq(
        10,
        3,
        "Which example would provide practical evidence that an exit plan works?",
        [
          "Renewing the incumbent’s contract without review",
          "Reading the supplier-assistance clause at a board meeting",
          "Restoring data independently or operating a limited process through an alternate provider",
          "Counting the number of pages in the contract",
        ],
        2,
        "The passage recommends limited technical exercises such as independent restoration, credential rotation, and alternate processing.",
      ),
      rcq(
        10,
        4,
        "Why might an internal team fail to qualify as a substitute?",
        [
          "Internal teams are never permitted to run financial systems",
          "It may lack current documentation or access to escrowed source",
          "It does not have a separate vendor contract",
          "Employees cannot rotate credentials",
        ],
        1,
        "The author tests actual capability, noting that an internal label is meaningless without documentation and source access.",
      ),
      rcq(
        10,
        5,
        "The final distinction between contractual rights and operational capability means that:",
        [
          "A supplier-assistance clause alone does not prove the service can be migrated",
          "Contracts should never contain exit assistance",
          "Boards should avoid reviewing suppliers",
          "Only regulators may negotiate technology contracts",
        ],
        0,
        "The closing says contractual promises are inputs; demonstrated ability to continue or migrate is the required result.",
      ),
    ],
  },
  {
    set: 11,
    essayWordLimit: 250,
    essayMarks: 30,
    precisWordLimit: 90,
    precisMarks: 30,
    rcMarks: 40,
    essayPrompts: [
      "A static list of designated persons cannot capture how unpublished price sensitive information actually moves. Explain how dynamic UPSI maps could improve prevention and investigation.",
      "Legal privilege protects candid advice, not every document copied to counsel. Discuss how firms should preserve privilege while maintaining auditable insider-trading controls.",
      "Employee trading surveillance can protect market trust and still become disproportionate workplace monitoring. Propose ethical limits on collection, access, and retention.",
      "Should a regulator use relationship and communication metadata to identify possible information leaks? Balance investigative value, due process, and privacy.",
    ],
    essayGuide: [
      "Define the sensitive event, the people or systems that may receive it, and the control purpose.",
      "Distinguish content from metadata, preventive access controls from later surveillance, and privilege from secrecy.",
      "Apply necessity and proportionality: scope, notice, access, retention, challenge rights, and treatment of innocent associations.",
      "Conclude with an auditable safeguard such as event-based lists, reason-coded access, segregated review, or deletion after a fixed period.",
    ],
    precisPassage: `An insider list is often treated as a roster: names enter when a transaction begins and leave when it is announced. Information rarely follows such neat boundaries. A finance analyst may see an unusual forecast before the deal team exists; an administrator may infer urgency from a newly restricted data room; a vendor may receive test data that is realistic enough to reveal the event.

A useful UPSI map starts with the information and records the paths by which it can move. It links documents, systems, meetings, external advisers, and approval stages to time. That map supports preventive controls by limiting access, and investigative fairness by showing when a person could actually have known the fact.

The map must remain a control, not a theory of guilt. Access establishes opportunity, not use. Broad departmental labels can produce impressive networks that merely reflect ordinary work. Owners should verify important edges, record why access was granted, and close the event when the information becomes public or stale.

Done well, mapping narrows surveillance to evidence. Done badly, it converts organisational proximity into permanent suspicion.`,
    precisModel:
      "Insider rosters miss how information crosses early analysis, administrators, systems, and vendors. A UPSI map should begin with the information and time-link its documents, meetings, advisers, systems, and approvals. It can restrict access and later show whether someone could have known a fact. But opportunity is not use: broad labels create misleading networks of ordinary work. Owners must verify important links, record access reasons, and close events when information becomes public or stale. Good mapping narrows surveillance; bad mapping turns proximity into lasting suspicion.",
    rcPassage: `Employee-trading surveillance joins two sensitive records: what a worker owns and what the institution knows. The combination can reveal conflicts, but it can also expose family wealth, medical fundraising, or personal relationships irrelevant to market integrity. Ethical design begins by collecting only what a stated control can use.

Privilege adds a separate boundary. A legal team may need to review communications to advise on a suspected leak. That does not mean compliance investigators should freely browse all lawyer-client material. A segregated reviewer can identify responsive facts, preserve legal advice where appropriate, and record the basis for each disclosure.

Alerts also require humility. A trade near a corporate event is a lead, not a verdict. The system should preserve exculpatory timing, permit correction of account data, and prevent managers from using surveillance results for unrelated performance disputes. Access logs and retention limits matter because a database built for one investigation is tempting in the next.

Trust does not require choosing between no monitoring and total visibility. It requires powers fitted to a purpose, with evidence that those boundaries are observed.`,
    rc: [
      rcq(
        11,
        1,
        "Why is employee-trading surveillance especially sensitive?",
        [
          "It combines personal holdings with institutional information and may expose irrelevant private facts",
          "Employees never have brokerage accounts",
          "All ownership data is already public",
          "It can analyse only legal advice",
        ],
        0,
        "The opening explains both the useful conflict signal and the unrelated personal information exposed by joining the records.",
      ),
      rcq(
        11,
        2,
        "What role does the passage propose for a segregated reviewer?",
        [
          "Approve employee performance ratings",
          "Publish all lawyer-client communications",
          "Identify responsive facts while preserving privileged legal advice where appropriate",
          "Eliminate every insider-trading alert",
        ],
        2,
        "The reviewer maintains the boundary between relevant investigative facts and protected legal advice.",
      ),
      rcq(
        11,
        3,
        "The statement that an alert is “a lead, not a verdict” implies that:",
        [
          "Alerts should automatically trigger dismissal",
          "Nearby trades require contextual review and may have exculpatory facts",
          "Event timing should be deleted",
          "Surveillance systems should generate no alerts",
        ],
        1,
        "The author calls for humility, preserved exculpatory timing, and correction rather than automatic guilt.",
      ),
      rcq(
        11,
        4,
        "Which misuse does the passage expressly seek to prevent?",
        [
          "Correcting inaccurate account information",
          "Using trading-surveillance results in unrelated employee performance disputes",
          "Recording access to sensitive data",
          "Applying retention limits",
        ],
        1,
        "The third paragraph says managers must not repurpose surveillance outputs for unrelated performance matters.",
      ),
      rcq(
        11,
        5,
        "What principle unifies the passage’s proposed safeguards?",
        [
          "Total visibility creates trust",
          "Monitoring powers should be limited to a stated purpose and demonstrably kept within it",
          "Privilege prevents all compliance review",
          "Personal data should be retained permanently",
        ],
        1,
        "The conclusion supports purpose-fitted powers and evidence that boundaries on those powers are followed.",
      ),
    ],
  },
  {
    set: 12,
    essayWordLimit: 250,
    essayMarks: 30,
    precisWordLimit: 90,
    precisMarks: 30,
    rcMarks: 40,
    essayPrompts: [
      "Capacity planning becomes investor protection when markets are stressed. Discuss whether intermediaries should size systems for observed peaks, designed scenarios, or both.",
      "Clock synchronisation is legal infrastructure for electronic markets. Explain how timestamp quality affects surveillance, dispute resolution, and accountability.",
      "Books-and-records duties should apply to algorithmic decisions as well as final transactions. What must be retained to reconstruct an automated order?",
      "A system can process record volumes yet fail because queues, people, and reconciliation controls saturate first. Propose an end-to-end regulatory approach to capacity.",
    ],
    essayGuide: [
      "Identify the legal or market decision that depends on the infrastructure: order priority, client authority, settlement completion, or reconstruction of conduct.",
      "Treat capacity, time, and records as end-to-end qualities, including queues, dependencies, manual operations, and modification histories.",
      "Explain one evidentiary failure caused by average-load testing, clock drift, missing configuration, or mutable logs.",
      "Close with a testable obligation: stressed scenarios, traceable time sources, durable decision records, reconciliation, and supervised exceptions.",
    ],
    precisPassage: `Capacity is not the largest number a system processed during a laboratory test. It is the amount of useful work an institution can complete while the market is disorderly. A gateway may accept every order while risk checks queue, confirmations lag, and the operations desk loses the ability to reconcile exceptions. Headline throughput then disguises a failing service.

Planning from last year’s peak is equally fragile. Historical volume records what happened under old products and behaviour, not what could happen after a margin change, index event, or rush to cancel. Scenario design should combine observed peaks with plausible changes in message mix. Cancellations, modifications, and rejected orders may consume resources differently from trades.

Tests must include dependencies and people. A database that scales while an identity provider throttles requests has not passed. Nor has a process that assumes operators can clear thousands of alerts manually. Results should state where queues formed, what service degraded first, and whether controls remained effective.

Spare capacity costs money, but invisible saturation transfers cost to clients and the market. The policy aim is not infinite headroom. It is evidence that critical services fail gradually, visibly, and within chosen tolerances.`,
    precisModel:
      "Capacity means useful work completed during disorder, not laboratory throughput. Gateways may accept orders while risk checks, confirmations, and reconciliation fail. Last year’s peak misses changed products, margins, and message mixes; scenarios should combine history with plausible surges in cancellations, modifications, and rejects. Tests must include dependencies and human alert handling, then identify queues, first degradation, and control effectiveness. Infinite headroom is unnecessary, but hidden saturation shifts costs to clients. Critical services should be shown to degrade gradually, visibly, and within deliberate tolerances.",
    rcPassage: `In an electronic market, sequence can decide legality. Whether an order preceded a client instruction, a price-sensitive announcement, or another trader’s quote may determine the outcome of a dispute. A timestamp is therefore evidence, not decorative system metadata.

Precision alone is insufficient. Two machines can print nanoseconds while disagreeing about the time. Firms need traceable sources, measured drift, synchronisation alerts, and records of corrections. They must also preserve the link between an event and the clock that stamped it; otherwise a later investigator cannot quantify uncertainty.

Books-and-records duties extend beyond the final order. Reconstruction may require the client message, algorithm version, parameters, risk response, routing decision, modification chain, and acknowledgement from the venue. If those items use unrelated identifiers, accurate clocks will only produce several tidy but disconnected stories.

Reliable evidence therefore comes from a system: clocks, identifiers, retention, and reconciliation. Each supports the others. A regulator asking only for a tighter timestamp may receive more decimal places without receiving a truer account of what happened.`,
    rc: [
      rcq(
        12,
        1,
        "Why does the passage describe a timestamp as evidence?",
        [
          "Its sequence may determine whether conduct preceded an instruction, announcement, or quote",
          "Every timestamp proves intentional misconduct",
          "Decorative metadata is required in advertisements",
          "Nanoseconds eliminate all disputes",
        ],
        0,
        "The opening ties event sequence directly to legal and factual determinations.",
      ),
      rcq(
        12,
        2,
        "Why is high timestamp precision alone inadequate?",
        [
          "Precise clocks cannot record orders",
          "Machines may display fine units while disagreeing on actual time",
          "Only dates, not times, have evidentiary value",
          "Precision prevents synchronisation alerts",
        ],
        1,
        "The second paragraph distinguishes fine display precision from agreement with a traceable time source.",
      ),
      rcq(
        12,
        3,
        "Which item is NOT listed as part of reconstructing an automated order?",
        [
          "The algorithm version and parameters",
          "The risk response and routing decision",
          "The venue acknowledgement",
          "The developer’s annual performance rating",
        ],
        3,
        "The passage lists decision and message records relevant to the order, not unrelated employment records.",
      ),
      rcq(
        12,
        4,
        "What problem arises when relevant records use unrelated identifiers?",
        [
          "The clocks stop recording time",
          "Investigators get accurate but disconnected stories that cannot form one chain",
          "Retention periods automatically increase",
          "Venue acknowledgements become privileged",
        ],
        1,
        "The third paragraph warns that clocks cannot connect records if identifiers do not link the events.",
      ),
      rcq(
        12,
        5,
        "What is implied by “more decimal places without ... a truer account”?",
        [
          "Timestamp formatting is the only relevant control",
          "Narrow precision mandates cannot replace integrated clocks, identifiers, retention, and reconciliation",
          "Regulators should prohibit precise timestamps",
          "Books-and-records rules apply only to final trades",
        ],
        1,
        "The conclusion argues that evidentiary reliability is systemic, not the product of precision in isolation.",
      ),
    ],
  },
];
