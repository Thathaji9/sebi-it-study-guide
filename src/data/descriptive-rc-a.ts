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

export const rcDrillsA: RcDrill[] = [
  {
    id: "rc-01",
    title: "When Filing Formats Become Market Infrastructure",
    passage: `A machine-readable filing is often treated as the digital twin of a paper disclosure. It is more consequential than that. Once analysts, lenders, and trading systems consume tagged fields automatically, the schema determines what can be compared cheaply. A field called “revenue” may conceal whether an issuer reports gross marketplace receipts or only its commission. The document can remain legally accurate while the data feed manufactures false comparability.

This does not justify freezing a taxonomy. New business models require new tags, and old tags acquire exceptions. But every revision imposes costs on issuers and breaks code downstream. A regulator should therefore version schemas, publish validation rules before they become mandatory, and preserve mappings from retired fields. Rejected filings should produce precise errors rather than invite companies to upload a PDF and escape the structured obligation.

The deeper point is institutional. Data standards are not clerical stationery; they are market infrastructure. Their governance should include public change logs, test environments, and named owners for disputed definitions. Better tags cannot guarantee honest disclosure, because a perfectly tagged lie remains a lie. They can, however, make inconsistencies visible sooner and make corrections propagate without forcing every user to reinterpret an entire annual report.`,
    questions: [
      rcq(
        1,
        1,
        "What is the passage’s primary claim?",
        [
          "Paper filings should immediately be prohibited",
          "Structured filing schemas are governed market infrastructure, not mere clerical formats",
          "All issuers should use one permanent definition of revenue",
          "Tagged data guarantees truthful corporate disclosure",
        ],
        1,
        "The author argues that schemas shape comparison and therefore require versioning, ownership, and transparent governance.",
      ),
      rcq(
        1,
        2,
        "What can reasonably be inferred about an unannounced schema revision?",
        [
          "It may disrupt downstream analytical code even if issuers comply",
          "It will make every historical filing fraudulent",
          "It eliminates the need for validation rules",
          "It affects only companies that still file on paper",
        ],
        0,
        "The passage says revisions impose issuer costs and break downstream code, which makes unannounced changes especially disruptive.",
      ),
      rcq(
        1,
        3,
        "In context, “manufactures false comparability” most nearly means:",
        [
          "Creates illegal securities",
          "Makes unlike figures appear directly equivalent",
          "Prevents analysts from downloading data",
          "Changes audited revenue into estimated revenue",
        ],
        1,
        "Differently defined revenue placed under one tag can make economically unlike figures look comparable.",
      ),
      rcq(
        1,
        4,
        "What function does the example of the “revenue” field serve?",
        [
          "It proves commissions are never revenue",
          "It illustrates how technically valid tagging can still distort comparison",
          "It argues that marketplaces need no disclosure rules",
          "It explains why annual reports should be shorter",
        ],
        1,
        "The example concretely shows that a shared label can conceal materially different accounting scopes.",
      ),
      rcq(
        1,
        5,
        "Which claim does the author NOT make?",
        [
          "Schema changes should have public logs",
          "Mappings from retired fields should be preserved",
          "Accurate tagging by itself ensures honest disclosure",
          "Validation errors should be precise",
        ],
        2,
        "The author expressly notes that a perfectly tagged lie remains a lie.",
      ),
    ],
  },
  {
    id: "rc-02",
    title: "The Uneven Economics of Faster Settlement",
    passage: `Shortening settlement is usually presented as subtraction: one less day of counterparty exposure, therefore one less day of risk. The arithmetic is sound but incomplete. A seller must deliver securities sooner, while a buyer must mobilise cash sooner. Large institutions can automate these movements across custodians and time zones; smaller brokers and foreign investors may hold larger buffers simply to avoid a late instruction becoming a failed trade.

An optional same-day window can reveal whether the market values speed without forcing every participant onto the fastest rail. Yet optionality creates its own sorting problem. The most liquid clients may migrate first, leaving slower settlement with a less diversified pool. Prices for the same security could briefly differ across windows, not because the asset changed, but because funding did. Regulators should observe those spreads rather than declare them evidence of manipulation.

The case for speed is strongest when plumbing is ready: real-time confirmation, predictable securities lending, and clear treatment of failed deliveries. Speed imposed before those supports exist converts counterparty risk into liquidity risk. The goal is not the shortest settlement cycle that software can display. It is the shortest cycle the whole market can finance reliably, including on a volatile day when credit lines contract.`,
    questions: [
      rcq(
        2,
        1,
        "What is the central argument of the passage?",
        [
          "Settlement should remain slow because technology never reduces risk",
          "Faster settlement is beneficial only when funding and operational supports make it broadly reliable",
          "Foreign investors should be excluded from same-day settlement",
          "Price differences across settlement windows always prove manipulation",
        ],
        1,
        "The passage balances lower counterparty exposure against liquidity demands and conditions speed on adequate market plumbing.",
      ),
      rcq(
        2,
        2,
        "Why might an optional faster window change the composition of the slower pool?",
        [
          "Liquid clients may migrate first and leave less diverse participants behind",
          "All securities in the slower pool become unlisted",
          "Custodians are barred from processing slower trades",
          "The regulator fixes separate fundamental values",
        ],
        0,
        "The author infers that early migration by liquid clients could reduce diversification in the remaining pool.",
      ),
      rcq(
        2,
        3,
        "The author would most likely agree that:",
        [
          "A volatile-day funding test is more meaningful than a normal-day technology demo",
          "The fastest technically possible cycle is necessarily optimal",
          "Liquidity risk disappears when counterparty exposure falls",
          "Every cross-window price spread should trigger enforcement",
        ],
        0,
        "The closing emphasis is on what the whole market can finance when volatility contracts credit lines.",
      ),
      rcq(
        2,
        4,
        "What is the purpose of mentioning price differences across windows?",
        [
          "To demand a single official security price",
          "To show that funding conditions can explain a spread without misconduct",
          "To establish that optional settlement is unconstitutional",
          "To recommend banning arbitrage between windows",
        ],
        1,
        "The detail warns supervisors not to mistake funding-driven segmentation for manipulation.",
      ),
      rcq(
        2,
        5,
        "Which control is implied before settlement is shortened further?",
        [
          "Reliable real-time confirmation and clear fail handling",
          "A prohibition on securities lending",
          "Permanent credit lines at fixed prices",
          "Manual confirmation of every retail order",
        ],
        0,
        "The passage identifies confirmation, securities lending, and failed-delivery rules as necessary supports.",
      ),
    ],
  },
  {
    id: "rc-03",
    title: "Transparency Without Emptying Bond Market Depth",
    passage: `Transparency in corporate bonds is easy to praise because opacity sounds like a defence of dealers. Yet the timing of transparency matters. If a dealer must reveal a large, illiquid trade instantly, competitors can infer the inventory it still needs to unwind. They may move prices against it. The dealer responds rationally by quoting less size to the pension fund that wanted certainty in the first place.

The choice is therefore not between disclosure and secrecy. It is between calibrated publication and careless publication. Small trades in frequently traded bonds can appear quickly. Block trades or thin issues may warrant a delay and temporarily masked size. The calibration should be based on observed depth and transaction costs, not on an issuer’s lobbying power or a permanent label of liquidity.

Delayed reporting must not become a private tunnel. The regulator should receive full trade data immediately even when the public tape waits. It can then detect off-market transfers, related-party patterns, and repeated use of exemptions. Public transparency serves price discovery; supervisory transparency serves integrity. Treating the two clocks as identical may damage liquidity, while allowing either clock to stop protects incumbents rather than investors.`,
    questions: [
      rcq(
        3,
        1,
        "What is the passage’s main idea?",
        [
          "Corporate bond trades should remain permanently secret",
          "Public bond reporting should be calibrated while regulators receive immediate full data",
          "Only pension funds should see block-trade prices",
          "Dealer inventories should be published before execution",
        ],
        1,
        "The author distinguishes delayed or masked public reporting from immediate supervisory access.",
      ),
      rcq(
        3,
        2,
        "What is likely if every large illiquid trade is published instantly?",
        [
          "Dealers may quote smaller sizes to avoid being traded against",
          "Every bond becomes more liquid by definition",
          "Transaction costs necessarily fall to zero",
          "Supervisors lose access to trade records",
        ],
        0,
        "The first paragraph explains that exposed inventory can cause dealers to reduce quoted size.",
      ),
      rcq(
        3,
        3,
        "In context, a “private tunnel” refers to:",
        [
          "A secure regulator network",
          "A delay exemption that hides trades from both public and meaningful scrutiny",
          "A dealer’s internal messaging channel",
          "A physical route between exchanges",
        ],
        1,
        "The phrase warns that delayed publication must not become an unmonitored route for opaque dealing.",
      ),
      rcq(
        3,
        4,
        "Why does the author distinguish two transparency clocks?",
        [
          "To separate price-discovery needs from immediate supervisory oversight",
          "To let issuers choose when misconduct becomes legal",
          "To eliminate reporting of thinly traded issues",
          "To show that regulators need less data than investors",
        ],
        0,
        "Public and supervisory transparency serve different purposes and need not occur at the same moment.",
      ),
      rcq(
        3,
        5,
        "Which basis for delayed publication does the author reject?",
        [
          "Observed market depth",
          "Measured transaction costs",
          "The size and liquidity of a trade",
          "An issuer’s lobbying influence",
        ],
        3,
        "The passage says calibration should not depend on lobbying power or a permanent label.",
      ),
    ],
  },
  {
    id: "rc-04",
    title: "Explaining Algorithms That Judge Investor Suitability",
    passage: `A digital distributor can ask ten questions and recommend a portfolio before a human adviser has opened a notebook. Efficiency is not the difficult issue. The difficult issue is whether the recommendation responds to the investor’s answers or merely steers every profitable customer toward the product paying the highest commission. A complex model can conceal that conflict more effectively than a crude sales script.

Requiring an explanation does not mean printing every coefficient. The useful explanation is counterfactual: which answer materially changed the recommendation, what product constraint followed, and what would have been offered if the investor’s loss tolerance were lower? Such tests expose a model that collects risk information ceremonially but ignores it operationally. They also give complaint officers something firmer than the vendor’s assurance that the score was “AI-driven”.

Human review should focus on exceptions, not decorate every automated decision with an unread signature. Abrupt changes in stated income, repeated overrides, and recommendations near a suitability boundary deserve attention. The objective is accountable automation, not nostalgia for paper forms. A handwritten recommendation distorted by commission is no fairer than an algorithmic one; it is simply harder to test at scale.`,
    questions: [
      rcq(
        4,
        1,
        "What is the author’s primary claim?",
        [
          "Automated suitability should be banned in favour of paper forms",
          "Automated recommendations need conflict-sensitive, testable accountability",
          "Publishing every model coefficient eliminates mis-selling",
          "Human signatures make recommendations inherently fair",
        ],
        1,
        "The passage supports automation but requires explanations, counterfactual tests, and targeted review.",
      ),
      rcq(
        4,
        2,
        "What would ceremonial collection of risk information imply?",
        [
          "Investor answers are recorded but do not alter recommendations",
          "The model uses too many relevant constraints",
          "Complaint officers can fully reproduce every decision",
          "Commissions have been removed from all products",
        ],
        0,
        "The author describes models that solicit risk answers yet ignore them in operation.",
      ),
      rcq(
        4,
        3,
        "The author would agree that a useful model explanation should:",
        [
          "State only that artificial intelligence was used",
          "Show how a material change in an answer would affect the result",
          "Reveal proprietary source code to every investor",
          "Replace all complaint investigation",
        ],
        1,
        "The recommended counterfactual explanation identifies answers that changed the recommendation and alternative outcomes.",
      ),
      rcq(
        4,
        4,
        "What function does the final comparison with handwritten advice serve?",
        [
          "It rejects automation as less personal",
          "It shows that the regulatory target is conflicted advice, regardless of medium",
          "It proves paper records are impossible to audit",
          "It recommends handwritten overrides near every boundary",
        ],
        1,
        "The comparison prevents the critique of algorithms from becoming an uncritical defence of manual advice.",
      ),
      rcq(
        4,
        5,
        "Which practice does the passage NOT recommend?",
        [
          "Reviewing abrupt income changes",
          "Examining repeated overrides",
          "Adding an unread human signature to every automated result",
          "Testing recommendations near suitability boundaries",
        ],
        2,
        "The author says human review should target exceptions rather than decorate every decision.",
      ),
    ],
  },
  {
    id: "rc-05",
    title: "Portability Needs Consent With Practical Friction",
    passage: `Broker portability is often reduced to an export button. A downloadable file is useful, but portability means more: another service must interpret holdings, cost bases, mandates, and tax lots without asking the investor to reconstruct years of activity. Common application interfaces can lower switching costs and let investors compare execution or advisory services without abandoning their records.

The same interface can industrialise extraction. A brightly coloured budgeting app may request continuous access to a portfolio when a one-time balance would suffice. Consent buried inside a bundle is technically captured but economically meaningless. Good design makes scope, duration, and purpose separable; it also lets the investor revoke access without closing the underlying brokerage account. Sensitive actions, such as placing orders, should require authority distinct from permission to read holdings.

Standardisation is thus necessary but not neutral. A common interface shifts power toward whoever can aggregate the richest view of a household. Regulators should require access logs visible to investors, short-lived credentials, and clear liability for an intermediary that acts after revocation. Portability succeeds when exit becomes easier without turning every new app into a permanent observer or accidental trader.`,
    questions: [
      rcq(
        5,
        1,
        "What is the passage’s main argument?",
        [
          "A download button alone provides complete broker portability",
          "Portability requires interoperable records plus granular and revocable authority",
          "Third-party financial apps should have permanent portfolio access",
          "Reading holdings and placing orders require identical consent",
        ],
        1,
        "The author links useful interoperability to scoped consent, revocation, logs, and separate transactional authority.",
      ),
      rcq(
        5,
        2,
        "What can be inferred about bundled consent?",
        [
          "It may satisfy a formal capture step while failing to express an informed choice",
          "It always limits access to a single balance",
          "It makes revocation technically impossible in every system",
          "It gives investors lower execution prices",
        ],
        0,
        "The passage calls bundled consent technically captured but economically meaningless.",
      ),
      rcq(
        5,
        3,
        "In context, “industrialise extraction” most nearly means:",
        [
          "Automate large-scale collection of more data than is needed",
          "Move brokerage servers into factories",
          "Convert holdings into industrial securities",
          "Require manual data entry by every investor",
        ],
        0,
        "The phrase describes interfaces enabling continuous, scalable access beyond the immediate purpose.",
      ),
      rcq(
        5,
        4,
        "Why does the passage distinguish reading holdings from placing orders?",
        [
          "To argue that portfolio values are public information",
          "To establish that different risks require separate grants of authority",
          "To prevent investors from viewing their own accounts",
          "To make tax-lot portability unnecessary",
        ],
        1,
        "Viewing data and transacting create different harms, so consent to one should not authorise the other.",
      ),
      rcq(
        5,
        5,
        "Which control is NOT advocated?",
        [
          "Investor-visible access logs",
          "Short-lived credentials",
          "Continued action by an app after revocation",
          "Separate scope and duration choices",
        ],
        2,
        "The author instead calls for liability when an intermediary acts after revocation.",
      ),
    ],
  },
  {
    id: "rc-06",
    title: "Authenticating Disclosure in the Deepfake Era",
    passage: `A convincing video of a chief executive announcing a takeover can now be produced before the company has drafted a denial. The regulatory problem is not merely that some viewers will be fooled. Trading systems and news desks increasingly ingest audiovisual material at machine speed, so a fabricated statement can enter prices before a human notices an unnatural blink or mismatched voice.

Watermarks may help, but a watermark is evidence only if official publishers protect signing keys and archives preserve the original. A universal warning pasted onto every video would train audiences to ignore warnings. More useful is a chain of provenance: an authenticated company channel, a timestamped source file, and rapid confirmation through the exchange’s announcement system. Platforms can label an unverified copy without deciding whether the underlying corporate claim is true.

Issuers also have duties. They should register authoritative channels in advance and rehearse a response that distinguishes “this media is fake” from “the transaction rumour is false”. Those are not the same statement. Authentication cannot settle whether undisclosed negotiations exist; it can settle whether a particular clip came from the issuer. Narrow certainty, delivered quickly, is more valuable than a sweeping denial that later requires correction.`,
    questions: [
      rcq(
        6,
        1,
        "What is the passage’s central proposal?",
        [
          "Prohibit all executive video announcements",
          "Use provenance and authoritative channels to authenticate media without overclaiming truth",
          "Require viewers to detect unnatural blinking",
          "Treat every takeover rumour as false",
        ],
        1,
        "The author advocates a verifiable publication chain and carefully limited issuer responses.",
      ),
      rcq(
        6,
        2,
        "Why can a fabricated clip affect prices unusually quickly?",
        [
          "News desks and trading systems may process media before human inspection",
          "Company denials are legally barred on the same day",
          "Watermarks automatically execute market orders",
          "Every audiovisual statement is official by default",
        ],
        0,
        "The first paragraph notes machine-speed ingestion before people detect visual or audio anomalies.",
      ),
      rcq(
        6,
        3,
        "The author would most likely agree that:",
        [
          "Authenticating a clip proves every claim within it",
          "A narrow statement about origin can be safer than denying all related negotiations",
          "Warnings become stronger when attached to every video",
          "Signing keys need no special protection",
        ],
        1,
        "The passage separates certainty about a clip’s source from uncertainty about an underlying transaction.",
      ),
      rcq(
        6,
        4,
        "What is the function of distinguishing two possible issuer responses?",
        [
          "To show that media authenticity and corporate facts are separate questions",
          "To encourage companies to conceal genuine transactions",
          "To prove all transaction rumours arise from fake videos",
          "To transfer disclosure duties entirely to platforms",
        ],
        0,
        "The distinction prevents a response to forged media from becoming an inaccurate denial of real negotiations.",
      ),
      rcq(
        6,
        5,
        "Which safeguard does the author NOT claim is sufficient by itself?",
        [
          "A watermark",
          "A protected signing key",
          "A timestamped source file",
          "An authenticated company channel",
        ],
        0,
        "The passage says watermarks help only within a protected and preserved provenance system.",
      ),
    ],
  },
  {
    id: "rc-07",
    title: "Margins That Bend Before Markets Break",
    passage: `A margin model protects a clearing system by asking members to fund plausible losses. Trouble begins when “plausible” is estimated almost entirely from the recent past. Calm weeks produce low requirements and encourage larger positions; a sudden shock then raises measured volatility and margin at precisely the moment cash is scarce. A model intended to absorb risk can amplify forced selling.

The remedy is not permanently high margin. Excessive buffers make hedging expensive and push activity toward less transparent venues. A better design combines current risk with floors, stress scenarios, and measured anti-procyclical cushions accumulated during calm periods. Changes should be phased where possible, but a phase-in cannot become a promise to ignore a genuinely broken assumption.

Governance matters as much as formulae. Clearing corporations should disclose the broad drivers of changes, test effects on differently sized members, and maintain procedures for exceptional calls. Members, in turn, need simulations that show more than yesterday’s requirement. No model can make leverage painless. The regulatory aim is to prevent predictable model mechanics from turning a price shock into a scramble for cash that the model itself helped create.`,
    questions: [
      rcq(
        7,
        1,
        "What is the passage’s main claim?",
        [
          "Margin requirements should never respond to volatility",
          "Margin design should control procyclicality without making buffers permanently excessive",
          "Clearing members should set their own undisclosed margins",
          "Historical data has no use in risk models",
        ],
        1,
        "The author recommends floors, stress tests, cushions, and governance to balance resilience with market access.",
      ),
      rcq(
        7,
        2,
        "How can a recent-history model amplify a shock?",
        [
          "It lowers positions during calm markets",
          "It demands more cash after volatility rises, contributing to forced sales",
          "It prevents clearing corporations from observing prices",
          "It moves all trades to transparent venues",
        ],
        1,
        "Low calm-period margins encourage positions before shock-driven calls intensify cash pressure.",
      ),
      rcq(
        7,
        3,
        "In context, margins that “bend” would be those that:",
        [
          "Adapt with cushions and stress controls rather than jump mechanically",
          "Are waived whenever a member requests relief",
          "Remain zero until a default occurs",
          "Depend only on the latest trading day",
        ],
        0,
        "The proposed design tempers abrupt volatility-driven changes through floors, scenarios, and accumulated cushions.",
      ),
      rcq(
        7,
        4,
        "Why does the author discuss excessive buffers?",
        [
          "To acknowledge that resilience controls can impose costs and displace activity",
          "To prove all margin is unnecessary",
          "To recommend opaque venues",
          "To show that hedging increases volatility by definition",
        ],
        0,
        "The detail supplies the trade-off that rules out simply setting permanently high margin.",
      ),
      rcq(
        7,
        5,
        "Which claim does the author NOT make?",
        [
          "Members need forward-looking simulations",
          "Different-sized members may experience changes differently",
          "A phase-in must override evidence that an assumption has failed",
          "Broad drivers of margin changes should be disclosed",
        ],
        2,
        "The passage says phasing cannot become a commitment to preserve a genuinely broken assumption.",
      ),
    ],
  },
  {
    id: "rc-08",
    title: "Proportionate Disclosure for Smaller Listed Firms",
    passage: `Disclosure rules often assume that more pages produce more protection. For a small listed manufacturer, however, a requirement written for a diversified conglomerate may generate boilerplate drafted by an outside adviser. Investors receive a longer document but little new information about the firm’s two customers, ageing machinery, or dependence on one working-capital lender.

Proportionality should not mean a softer rule against concealment. It should mean concentrating effort on the risks that can move a smaller issuer. A concise template could require customer concentration bands, promoter-related transactions, cash conversion, and key-person dependence. Machine-readable fields would support comparison, while a narrative box would let the issuer explain an unusual business model. The regulator could demand deeper detail when thresholds or warning signals are crossed.

There is a danger in creating a permanent “light” class. Firms may structure themselves to remain below a threshold, and investors may mistake fewer fields for regulatory approval. Periodic review, random verification, and automatic graduation rules are therefore essential. Proportionate disclosure is defensible only if it improves the signal, not if it simply lowers the issuer’s bill or moves material facts beyond the form.`,
    questions: [
      rcq(
        8,
        1,
        "What is the central argument?",
        [
          "Small issuers should be exempt from concealment rules",
          "Disclosure for smaller firms should be focused on material risks and backed by escalation controls",
          "Longer documents always provide stronger investor protection",
          "Narrative disclosure should replace all comparable data",
        ],
        1,
        "The passage supports proportionate, risk-focused templates without weakening truthfulness or supervision.",
      ),
      rcq(
        8,
        2,
        "Why might a conglomerate-style requirement fail a small manufacturer?",
        [
          "It can produce generic text instead of information about concentrated risks",
          "Small manufacturers have no investors",
          "Outside advisers cannot draft legal documents",
          "Working-capital dependence is never material",
        ],
        0,
        "The first paragraph contrasts boilerplate with facts about customers, machinery, and one lender.",
      ),
      rcq(
        8,
        3,
        "The author would most likely agree that proportionality:",
        [
          "Concerns relevance and intensity, not permission to hide facts",
          "Requires permanently lower standards for all small firms",
          "Should be based solely on an issuer’s compliance cost",
          "Makes random verification unnecessary",
        ],
        0,
        "The author distinguishes focused disclosure from a softer prohibition on concealment.",
      ),
      rcq(
        8,
        4,
        "What function do the proposed disclosure fields serve?",
        [
          "They illustrate risks likely to matter disproportionately for smaller issuers",
          "They provide a complete list for every industry",
          "They eliminate the need for narrative explanation",
          "They guarantee that no issuer will fail",
        ],
        0,
        "The examples show how a concise form can target concentrated business and financing exposures.",
      ),
      rcq(
        8,
        5,
        "Which control addresses firms trying to remain in the lighter class?",
        [
          "Automatic graduation rules and periodic review",
          "A ban on machine-readable fields",
          "Permanent reliance on self-classification",
          "Removal of all size thresholds",
        ],
        0,
        "The final paragraph names review, verification, and automatic graduation as safeguards against gaming.",
      ),
    ],
  },
  {
    id: "rc-09",
    title: "Pricing the Cost of Fund Liquidity",
    passage: `An open-ended fund promises redemption at a calculated value, but the assets behind that promise may take days to sell. On ordinary days the mismatch is harmless. During stress, early redeemers receive cash before the fund has realised the full cost of liquidation. Investors who remain then bear market impact and transaction charges created by those who left.

Swing pricing attempts to move that cost back to transacting investors by adjusting the fund’s dealing price when flows cross a threshold. It is not a penalty for nervousness; it is an allocation rule. Yet a threshold published too precisely can become a target: a large investor may split an order or redeem just before others are expected to trigger the adjustment. Excessive secrecy, on the other hand, makes outcomes impossible to anticipate or challenge.

A sound framework publishes the method and governance while allowing limited discretion over calibration. Boards should review override patterns, asset-sale assumptions, and whether similar flows receive similar treatment. Stress tests should include the behaviour of investors, not merely the time needed to sell a bond. Liquidity is partly physical and partly strategic: a portfolio may be sellable in theory but costly when everyone chooses the same exit.`,
    questions: [
      rcq(
        9,
        1,
        "What is the passage’s primary claim?",
        [
          "Open-ended funds should never permit redemptions",
          "Swing pricing can allocate liquidity costs fairly but needs guarded calibration and oversight",
          "All fund assets can be sold instantly in stress",
          "Precise thresholds should always be public in advance",
        ],
        1,
        "The author supports swing pricing while addressing gaming, discretion, and governance.",
      ),
      rcq(
        9,
        2,
        "Who bears liquidation costs when early redeemers receive an unadjusted value?",
        [
          "Only the fund’s auditor",
          "Investors who remain in the fund",
          "The exchange alone",
          "Future bond issuers",
        ],
        1,
        "The opening paragraph says remaining investors absorb impact and charges caused by exiting investors.",
      ),
      rcq(
        9,
        3,
        "In context, calling swing pricing an “allocation rule” means it:",
        [
          "Assigns transaction-caused costs to the investors generating them",
          "Rations fund units by lottery",
          "Punishes every redemption equally",
          "Guarantees a fund against losses",
        ],
        0,
        "Its stated purpose is to shift liquidation costs from remaining holders toward transacting investors.",
      ),
      rcq(
        9,
        4,
        "Why does the author mention order splitting?",
        [
          "To illustrate how an overly predictable trigger can be gamed",
          "To recommend that all investors redeem early",
          "To prove thresholds should have no governance",
          "To show that small orders cause no costs",
        ],
        0,
        "Splitting an order is an example of strategic avoidance of a precisely published threshold.",
      ),
      rcq(
        9,
        5,
        "Which factor does the author say stress tests should NOT omit?",
        [
          "Investor behaviour during common exits",
          "The fund manager’s office rent",
          "The issuer’s advertising budget",
          "Daily equity index composition",
        ],
        0,
        "The final paragraph explicitly requires stress tests to include behaviour as well as asset-sale time.",
      ),
    ],
  },
  {
    id: "rc-10",
    title: "Tokenised Securities Still Need Legal Finality",
    passage: `Putting a bond on a distributed ledger can shorten reconciliation because participants share a record. It does not answer the prior legal question: which record proves ownership? If a court, a depository, and a token platform recognise different moments of transfer, technical consensus may coexist with legal disagreement. A flawless ledger can then preserve the wrong answer with impressive durability.

Tokenisation also exposes mundane corporate actions. Interest, tax withholding, freezes, succession, and corrections must work when keys are lost or an order is reversed. Code that refuses every amendment may look tamper-proof but fail ordinary securities law. Conversely, an administrator with an invisible power to rewrite balances recreates a central register without its familiar controls.

Policy should begin with legal finality and operational roles, not with a preferred database. Rules must identify the authoritative record, the conditions for correction, and the party liable when code and law diverge. Interoperability tests should include insolvency and disputed ownership, not only a successful coupon payment. The useful promise of tokenisation is less reconciliation, not the disappearance of institutions. Institutions remain; the task is to make their authority explicit rather than hiding it behind software.`,
    questions: [
      rcq(
        10,
        1,
        "What is the passage’s main argument?",
        [
          "Distributed ledgers eliminate the need for securities law",
          "Tokenisation is useful only when legal authority, correction, and liability are explicit",
          "Courts should always accept the latest technical timestamp",
          "Immutable code should prevent every corporate-action correction",
        ],
        1,
        "The author treats shared ledgers as useful infrastructure that cannot replace legal finality and accountable roles.",
      ),
      rcq(
        10,
        2,
        "What can be inferred from “preserve the wrong answer”?",
        [
          "Technical integrity does not ensure that the recorded entitlement is legally valid",
          "Distributed ledgers routinely delete every valid trade",
          "Courts can never understand electronic records",
          "Ownership disputes disappear once data is replicated",
        ],
        0,
        "The passage contrasts flawless technical consensus with disagreement over legally authoritative ownership.",
      ),
      rcq(
        10,
        3,
        "The author would most likely agree that immutability:",
        [
          "Must be reconciled with lawful freezes, succession, and corrections",
          "Is more important than all corporate-action obligations",
          "Makes an administrator’s powers irrelevant",
          "Automatically determines liability",
        ],
        0,
        "The second paragraph shows that ordinary legal events sometimes require controlled amendments.",
      ),
      rcq(
        10,
        4,
        "What purpose does the invisible administrator example serve?",
        [
          "It shows that claimed decentralisation may conceal unchecked central power",
          "It recommends secret balance changes",
          "It proves central registers have no controls",
          "It argues against identifying operational roles",
        ],
        0,
        "The example warns that hidden rewrite authority recreates central control without established safeguards.",
      ),
      rcq(
        10,
        5,
        "Which test does the author imply is inadequate by itself?",
        [
          "A successful routine coupon payment",
          "A disputed-ownership scenario",
          "An insolvency simulation",
          "A review of correction conditions",
        ],
        0,
        "The passage says interoperability must test insolvency and disputes, not only a successful coupon payment.",
      ),
    ],
  },
  {
    id: "rc-11",
    title: "Mapping Hidden Dependencies in Market Software",
    passage: `An exchange may operate two data centres and still have one point of failure: a small software library embedded in both. Traditional resilience inventories count servers, links, and named vendors. They often miss a common code component maintained by three volunteers, or a certificate service used indirectly through several contractors. Apparent redundancy then becomes two copies of the same dependency.

A software bill of materials can reveal shared components, but a list alone is not resilience. Versions change, project names fork, and a vulnerable package may be present without being reachable in production. Market institutions need a living map that connects components to critical services, records who can patch them, and distinguishes exposure from mere presence. Procurement contracts should require notice when a vendor silently replaces a dependency.

Supervisors need not demand public release of every architectural detail. They do need evidence that firms can identify a common component quickly, assess its use, and deploy a tested remedy without disabling the market. Exercises should begin with the failure of an obscure dependency rather than the loss of an entire site. Site loss is visible; correlated software weakness is dangerous precisely because firms can call themselves independent until they fail together.`,
    questions: [
      rcq(
        11,
        1,
        "What is the passage’s main argument?",
        [
          "Geographically separate data centres guarantee software independence",
          "Resilience requires mapping and managing shared software dependencies, not merely listing physical assets",
          "Every open-source component should be prohibited",
          "Architecture details must always be published in full",
        ],
        1,
        "The passage argues for a living service-level dependency map and tested remediation.",
      ),
      rcq(
        11,
        2,
        "Why can two data centres still fail together?",
        [
          "They may rely on the same vulnerable library or certificate service",
          "All site failures are caused by weather",
          "Separate sites cannot use different hardware",
          "Supervisors require identical passwords",
        ],
        0,
        "The opening explains that physical redundancy can conceal a common software dependency.",
      ),
      rcq(
        11,
        3,
        "In context, a “living map” is one that:",
        [
          "Is continuously updated and links components to services and patch responsibility",
          "Contains only the original procurement list",
          "Excludes indirect vendors",
          "Treats component presence as proven exploitation",
        ],
        0,
        "The passage contrasts a static list with current versions, service links, reachability, and ownership.",
      ),
      rcq(
        11,
        4,
        "Why does the author propose exercises involving obscure dependencies?",
        [
          "To test a less visible source of correlated failure",
          "To avoid testing remediation procedures",
          "To prove site-loss exercises are unlawful",
          "To shift patching entirely to volunteers",
        ],
        0,
        "An obscure shared component tests whether supposedly independent firms can detect and remedy correlated exposure.",
      ),
      rcq(
        11,
        5,
        "Which control does the passage NOT advocate?",
        [
          "Vendor notice of dependency replacement",
          "Identification of who can patch a component",
          "Assuming a component is exploitable merely because it appears on a list",
          "Testing remedies before deployment",
        ],
        2,
        "The author explicitly distinguishes actual production exposure from mere component presence.",
      ),
    ],
  },
  {
    id: "rc-12",
    title: "Useful Market Data Without Investor Exposure",
    passage: `Public transaction data helps researchers test execution quality and lets smaller firms challenge claims made by dominant intermediaries. Removing names does not necessarily make such data anonymous. A rare security, an exact timestamp, and a distinctive quantity may identify a trade when combined with a fund’s disclosed holdings. The more useful the dataset becomes, the easier linkage may become.

The answer is not to publish nothing. Regulators can release information at different resolutions: exact fields for accredited secure rooms, aggregated tables for the public, and synthetic records for software development. Statistical privacy techniques can add controlled noise, but their parameters are policy choices. Too much noise hides discrimination or concentration; too little turns privacy into a mathematical label attached to identifiable activity.

Every release should begin with the question it is meant to answer. Fields that do not serve that purpose should be removed, and repeated releases should be assessed together because separate harmless tables can combine into a revealing profile. Access conditions, query logs, and a fixed privacy budget are controls, not signs that evidence is being suppressed. Open data is valuable when openness is designed, rather than confused with uploading the regulator’s raw memory.`,
    questions: [
      rcq(
        12,
        1,
        "What is the passage’s central claim?",
        [
          "All transaction data should remain confidential",
          "Market data should be released through purpose-based tiers with controls against re-identification",
          "Deleting investor names always guarantees anonymity",
          "Synthetic data is suitable for every enforcement decision",
        ],
        1,
        "The author supports useful publication while tailoring resolution, access, and privacy safeguards.",
      ),
      rcq(
        12,
        2,
        "How might a nameless record identify an investor?",
        [
          "Distinctive trade details can be linked with separately disclosed holdings",
          "Every timestamp contains the investor’s tax number",
          "Synthetic records reproduce legal identities",
          "Aggregated tables always list account names",
        ],
        0,
        "The first paragraph describes linkage through a rare security, exact time, quantity, and public holdings.",
      ),
      rcq(
        12,
        3,
        "The author would most likely agree that privacy parameters:",
        [
          "Require a trade-off between analytical value and disclosure risk",
          "Can be selected without considering the dataset’s purpose",
          "Should maximise noise in every circumstance",
          "Matter only when names are included",
        ],
        0,
        "The passage says too much noise conceals useful patterns while too little leaves activity identifiable.",
      ),
      rcq(
        12,
        4,
        "What is the function of mentioning repeated releases?",
        [
          "To show that privacy risk can accumulate across individually harmless datasets",
          "To argue that data may be released only once",
          "To prove query logs reveal no useful information",
          "To recommend identical fields in every publication",
        ],
        0,
        "The detail explains that separate tables can combine into a revealing profile.",
      ),
      rcq(
        12,
        5,
        "Which practice does the author NOT support?",
        [
          "Removing fields unrelated to the stated purpose",
          "Using secure rooms for exact records",
          "Uploading raw regulatory data merely in the name of openness",
          "Logging access and queries",
        ],
        2,
        "The closing sentence rejects equating open data with uploading the regulator’s raw memory.",
      ),
    ],
  },
  {
    id: "rc-13",
    title: "Accessible Trading Is a Market Control",
    passage: `Digital accessibility is often placed under customer service, as though readable text and keyboard navigation were cosmetic comforts. In securities markets they are also controls. If an investor using a screen reader cannot distinguish “buy” from “sell” after a volatile redesign, the resulting order is not merely an inconvenient click. It is a foreseeable conduct failure in the transaction channel.

Compliance cannot be established by testing the home page once a year. Trading journeys include authentication, risk warnings, contract notes, charts, and cancellation under time pressure. Updates to a shared design component can break all of them at once. Firms should combine automated checks with users who rely on assistive technology, and they should test critical paths after material interface changes. Equivalent access need not mean an identical visual experience; it means that the same decision can be understood and completed with comparable certainty.

There are limits. Accessibility does not require removing every complex product or guaranteeing that every investor makes a wise choice. It requires avoiding barriers created by the intermediary’s own design. Incident logs should therefore capture accessibility failures alongside latency and rejected orders. What is not measured will be dismissed as an isolated complaint, even when one defective component has excluded thousands.`,
    questions: [
      rcq(
        13,
        1,
        "What is the passage’s main idea?",
        [
          "Accessibility is only a cosmetic customer-service concern",
          "Accessibility in trading channels is a conduct and operational control requiring continuous testing",
          "Every investor must receive an identical visual interface",
          "Accessible design guarantees wise investment decisions",
        ],
        1,
        "The author connects accessible transaction paths to order integrity, testing, and incident management.",
      ),
      rcq(
        13,
        2,
        "Why is annual home-page testing inadequate?",
        [
          "Critical trading paths extend beyond the home page and can break after updates",
          "Home pages never contain text",
          "Automated checks are legally prohibited",
          "Authentication has no accessibility implications",
        ],
        0,
        "The passage lists multiple time-sensitive journeys and notes that component updates can disrupt them together.",
      ),
      rcq(
        13,
        3,
        "In context, “equivalent access” means:",
        [
          "The same decision can be completed with comparable understanding and certainty",
          "Every screen must look visually identical to every user",
          "Complex products must be removed from the market",
          "Assistive technology users need no risk warnings",
        ],
        0,
        "The author defines equivalence by decision quality rather than identical visual presentation.",
      ),
      rcq(
        13,
        4,
        "What purpose does the buy-versus-sell example serve?",
        [
          "It demonstrates that inaccessible design can directly cause a market transaction error",
          "It proves screen readers cannot process any finance app",
          "It argues that redesigns should never occur",
          "It shifts all responsibility to investors",
        ],
        0,
        "The example turns accessibility from an abstract comfort into a foreseeable order-entry risk.",
      ),
      rcq(
        13,
        5,
        "Which outcome does the author NOT claim accessibility rules can ensure?",
        [
          "Comparable certainty in completing a decision",
          "Detection of failures after interface changes",
          "Wise investment choices by every user",
          "Fewer intermediary-created barriers",
        ],
        2,
        "The passage explicitly says accessibility cannot guarantee that every investor chooses wisely.",
      ),
    ],
  },
  {
    id: "rc-14",
    title: "Closing Complaints Is Not Resolving Them",
    passage: `A grievance portal can make a regulator look efficient by converting every complaint into a status. The easiest status to optimise is “closed”. An intermediary uploads a standard reply, the timer stops, and the dashboard improves even if the investor cannot withdraw securities or understand the answer. Administrative closure has then been mistaken for remedy.

Resolution should be measured through outcomes and recurrence. Did the investor receive the asset, correction, or reasoned rejection? Was the same root cause reported by other clients after the fix? Reopening rates and complaints that migrate between entities are more revealing than a single average turnaround time. Text analysis can group similar cases, but it should not silently reject a novel complaint merely because its language resembles a familiar, low-value category.

Good workflow design also preserves disagreement. The intermediary’s response, the investor’s acceptance or objection, and the evidence considered should remain distinct in the record. Escalation rules should focus human review on vulnerable investors, repeated failures, and cases where an entity controls the proof. A portal is successful when it changes conduct outside the portal, not when it teaches regulated firms which button makes a red clock turn green.`,
    questions: [
      rcq(
        14,
        1,
        "What is the passage’s primary argument?",
        [
          "Complaint portals should maximise the number marked closed",
          "Grievance systems should measure actual remedy and recurring causes, not administrative closure",
          "Text analysis should decide every complaint automatically",
          "Average turnaround time is the only useful measure",
        ],
        1,
        "The author replaces closure counts with outcomes, recurrence, preserved evidence, and targeted escalation.",
      ),
      rcq(
        14,
        2,
        "What does a high reopening rate likely indicate?",
        [
          "Initial closure may not have solved the investor’s problem",
          "Every investor received the requested asset",
          "The portal has no status field",
          "Intermediaries are responding too slowly by definition",
        ],
        0,
        "The passage presents reopening as evidence more revealing than a nominally fast closure.",
      ),
      rcq(
        14,
        3,
        "In context, “preserves disagreement” means the system should:",
        [
          "Retain separate records of the response, objection, and evidence",
          "Force investors to accept an intermediary’s reply",
          "Delete cases once an answer is uploaded",
          "Prevent any complaint from being settled",
        ],
        0,
        "The third paragraph defines preservation through distinct positions and an evidentiary record.",
      ),
      rcq(
        14,
        4,
        "Why does the author mention the red clock turning green?",
        [
          "To criticise incentives to satisfy a dashboard rather than remedy harm",
          "To recommend colour as the sole measure of service",
          "To show all late complaints are invalid",
          "To prove portals should have no deadlines",
        ],
        0,
        "The image illustrates firms learning to stop a metric without fixing conduct.",
      ),
      rcq(
        14,
        5,
        "Which automated action does the author NOT endorse?",
        [
          "Grouping similar complaints for analysis",
          "Finding recurring causes across clients",
          "Silently rejecting a novel case based on linguistic resemblance",
          "Using data to support escalation",
        ],
        2,
        "The passage warns that textual similarity must not silently dispose of a novel complaint.",
      ),
    ],
  },
  {
    id: "rc-15",
    title: "KYC Memory Should Have an Expiry",
    passage: `Know-your-client systems are built to remember. A document collected for onboarding is copied to archives, analytics stores, vendor queues, and recovery sites. Years later, an intermediary may be unable to say which copy still serves a legal purpose. Retention then becomes habit disguised as compliance. The breach impact grows while the evidentiary value of stale copies declines.

Deletion is not as simple as pressing a key. Securities law may require records for investigations, pending disputes can justify holds, and backups cannot always erase one customer instantly. A defensible schedule therefore starts from purpose: verify identity, maintain the relationship, meet a specified retention duty, then delete or irreversibly minimise. Legal holds should be scoped and reviewed, not used as a permanent exception for an entire database.

Regulators should test whether an intermediary can locate all classes of a document, stop unnecessary replication, and prove deletion after the applicable period. A certificate saying “purged” is weak if old images return during disaster recovery. Data minimisation does not conflict with enforcement; well-indexed, authorised records are more useful than uncontrolled copies of uncertain origin. The relevant question is not whether KYC once justified collection, but whether each surviving copy remains justified now.`,
    questions: [
      rcq(
        15,
        1,
        "What is the passage’s main claim?",
        [
          "KYC documents should be deleted immediately after onboarding",
          "Each retained KYC copy should remain purpose-bound, discoverable, and subject to verified expiry",
          "Backups make retention governance impossible",
          "More copies always improve enforcement evidence",
        ],
        1,
        "The passage advocates purpose-based schedules, scoped holds, controlled replication, and tested deletion.",
      ),
      rcq(
        15,
        2,
        "Why can stale KYC copies become a liability?",
        [
          "Their breach impact persists while their evidentiary value may decline",
          "They automatically cancel the client relationship",
          "They cannot exist in recovery systems",
          "They always satisfy a current legal hold",
        ],
        0,
        "The first paragraph directly contrasts growing breach exposure with declining value.",
      ),
      rcq(
        15,
        3,
        "In context, retention as “habit disguised as compliance” means:",
        [
          "Copies are kept without checking whether a present legal purpose remains",
          "Every statute prohibits record retention",
          "Clients habitually submit false documents",
          "Compliance teams never use archives",
        ],
        0,
        "The criticism targets automatic retention whose current purpose cannot be identified.",
      ),
      rcq(
        15,
        4,
        "What function does the disaster-recovery example serve?",
        [
          "It shows that deletion must be tested across restoration, not merely certified",
          "It proves disaster recovery should be abolished",
          "It recommends keeping all old images online",
          "It limits minimisation to paper files",
        ],
        0,
        "A supposedly purged image reappearing after recovery exposes incomplete deletion.",
      ),
      rcq(
        15,
        5,
        "Which control is implied for legal holds?",
        [
          "They should have defined scope and periodic review",
          "They should cover every database forever",
          "They should be created only by storage vendors",
          "They should prevent indexing of retained records",
        ],
        0,
        "The passage says holds must be scoped and reviewed rather than becoming permanent blanket exceptions.",
      ),
    ],
  },
  {
    id: "rc-16",
    title: "Electronic Voting Across the Ownership Chain",
    passage: `Electronic voting has reduced the cost of casting a shareholder vote, but it has not removed the ownership chain between investor and issuer. A beneficial owner may sit behind a broker, custodian, depository, and global nominee. If each system applies a different cut-off or rounds entitlements differently, a valid instruction can disappear while every intermediary reports that its own file balanced.

End-to-end confirmation is more than an email saying “vote received”. The investor should be able to learn whether the instruction was accepted into the final count, rejected, or reduced because another party claimed the same entitlement. That visibility must not expose how every named investor voted to the company. Verification and ballot secrecy are compatible when systems return a receipt tied to an instruction rather than publish the voter’s choice.

Regulation should require common status codes, reconciliation before the meeting, and an audit path across intermediaries. It should also define responsibility when an omnibus account submits more votes than its position permits. Faster interfaces do not cure ambiguous accountability. Electronic democracy in a company is credible only when a vote can cross the chain intact and a missing vote can be traced without turning the ballot into a public register.`,
    questions: [
      rcq(
        16,
        1,
        "What is the passage’s central argument?",
        [
          "Electronic voting has eliminated all intermediary risk",
          "Credible e-voting requires end-to-end confirmation, reconciliation, privacy, and accountability",
          "Companies should publish every investor’s ballot",
          "An initial receipt proves inclusion in the final count",
        ],
        1,
        "The author focuses on traceability across the ownership chain without sacrificing ballot secrecy.",
      ),
      rcq(
        16,
        2,
        "How can a vote disappear even when each intermediary balances its file?",
        [
          "Different cut-offs or entitlement rules can break the instruction between systems",
          "Electronic votes have no legal value",
          "Investors can vote only through paper ballots",
          "Depositories never store beneficial ownership",
        ],
        0,
        "The opening describes local reconciliation coexisting with an end-to-end failure.",
      ),
      rcq(
        16,
        3,
        "The author would most likely agree that ballot secrecy:",
        [
          "Can coexist with a receipt confirming processing status",
          "Requires investors to receive no information after submission",
          "Means rejected votes cannot be investigated",
          "Requires publication of each named choice",
        ],
        0,
        "The passage distinguishes a status receipt tied to an instruction from disclosure of the voter’s choice.",
      ),
      rcq(
        16,
        4,
        "Why is an over-voting omnibus account mentioned?",
        [
          "To identify a case where responsibility must be assigned across the chain",
          "To recommend accepting votes above the position",
          "To argue against pre-meeting reconciliation",
          "To show global nominees own no securities",
        ],
        0,
        "The example illustrates that technical status codes are insufficient without a liability rule.",
      ),
      rcq(
        16,
        5,
        "Which claim does the author NOT make?",
        [
          "A receipt of initial submission always proves final inclusion",
          "Common status codes can support traceability",
          "Reconciliation should occur before the meeting",
          "Missing votes should be auditable across intermediaries",
        ],
        0,
        "The passage expressly says confirmation must go beyond a message that the vote was merely received.",
      ),
    ],
  },
  {
    id: "rc-17",
    title: "Lent Shares and the Right to Vote",
    passage: `Securities lending improves settlement and supports short selling, but it divides an investment into pieces that ordinary language treats as one. The lender retains economic exposure under a contract while the borrower receives legal title and may transfer the share again. On a voting record date, the party who thinks of itself as the long-term owner may discover that the vote travelled with the loan.

A blanket rule requiring recall before every meeting would preserve votes at the cost of lending liquidity. Doing nothing would let asset managers advertise stewardship while routinely surrendering important ballots for small fees. A better approach requires funds to identify material votes in advance, compare the value of recalling with the lending income, and disclose the policy and aggregate outcomes. Not every routine resolution warrants recall, but conflicts and control transactions may.

Technology can flag approaching record dates and trace open loans, yet the decision remains fiduciary. Beneficiaries should know whether revenue or voting power was prioritised and why. Disclosure should avoid a false precision that claims to price the social value of every vote. Its purpose is narrower: make the trade-off visible, assign responsibility, and prevent stewardship claims from becoming detached from operational lending choices.`,
    questions: [
      rcq(
        17,
        1,
        "What is the passage’s main argument?",
        [
          "Securities lending should cease before every company meeting",
          "Funds should govern and disclose the trade-off between lending revenue and material voting rights",
          "Borrowers never receive legal title to lent shares",
          "Technology can determine the fiduciary value of every vote",
        ],
        1,
        "The passage proposes materiality-based recall decisions with policy, disclosure, and responsibility.",
      ),
      rcq(
        17,
        2,
        "Why may a long-term investor be unable to vote?",
        [
          "The vote may follow legal title transferred through a securities loan",
          "Economic exposure always cancels voting rights permanently",
          "Record dates apply only to borrowers",
          "Asset managers are barred from recalling shares",
        ],
        0,
        "The first paragraph explains that legal title and its vote may travel with the loan.",
      ),
      rcq(
        17,
        3,
        "In context, stewardship claims becoming “detached” means:",
        [
          "Public voting commitments do not match actual lending and recall decisions",
          "Funds stop receiving all lending income",
          "Beneficiaries directly operate the lending platform",
          "Every routine resolution becomes material",
        ],
        0,
        "The author wants disclosure to connect advertised stewardship with operational treatment of votes.",
      ),
      rcq(
        17,
        4,
        "What function does the blanket-recall proposal serve?",
        [
          "It presents an overbroad solution whose liquidity cost motivates a calibrated rule",
          "It states the author’s preferred policy",
          "It proves lending has no settlement benefit",
          "It removes the need to assess material votes",
        ],
        0,
        "The rejected extreme frames the case for selective recall based on importance and income.",
      ),
      rcq(
        17,
        5,
        "Which conclusion does the author NOT reach?",
        [
          "Conflicts and control transactions may justify recall",
          "Every vote’s social value can be priced exactly",
          "Technology can flag record dates",
          "Beneficiaries should see the reason for prioritisation",
        ],
        1,
        "The passage warns against false precision in assigning a price to every vote’s social value.",
      ),
    ],
  },
  {
    id: "rc-18",
    title: "Municipal Bond Data Beyond Annual Accounts",
    passage: `A municipal bond may finance an asset with a thirty-year life, while the issuer’s most visible financial document arrives annually and late. Investors then price a city through stale aggregates even though operational signals—property-tax collection, water billing, project completion, and state transfers—change monthly. The problem is not simply too little disclosure; it is a mismatch between reporting frequency and the cash flows supporting repayment.

Building a dashboard does not solve the mismatch if definitions drift. “Collection efficiency” can rise because arrears were written off, and project completion can refer to money spent rather than kilometres delivered. Data standards should define numerators, denominators, revision histories, and responsible officers. Independent assurance can focus on high-risk fields instead of reproducing a full annual audit every month.

Real-time publication is neither feasible nor always desirable. Preliminary numbers need correction, and small municipalities have limited staff. A proportionate regime can set quarterly core indicators, event-driven warnings for material deviations, and technical support through common reporting tools. The objective is not to turn city officers into market terminals. It is to ensure that investors learn about a weakening repayment source before an overdue annual statement makes the deterioration undeniable.`,
    questions: [
      rcq(
        18,
        1,
        "What is the passage’s main claim?",
        [
          "Municipal issuers must publish every figure in real time",
          "Municipal bond reporting should align timely, defined indicators with repayment risks",
          "Annual accounts contain no useful information",
          "Dashboards eliminate the need for data definitions",
        ],
        1,
        "The author recommends proportionate periodic indicators, consistent definitions, and event-driven warnings.",
      ),
      rcq(
        18,
        2,
        "Why can annual disclosure be insufficient for a municipal bond?",
        [
          "Repayment-related operational conditions may change well before the annual report",
          "Municipal assets never last more than one year",
          "Investors are prohibited from reading city accounts",
          "State transfers remain constant each month",
        ],
        0,
        "The first paragraph says monthly operational signals can move while annual aggregates remain stale.",
      ),
      rcq(
        18,
        3,
        "In context, definitions that “drift” are definitions that:",
        [
          "Change over time and make the same label conceal different calculations",
          "Are permanently fixed by accounting law",
          "Measure only geographical movement",
          "Always understate collection efficiency",
        ],
        0,
        "The examples show labels changing meaning through write-offs or expenditure-based completion.",
      ),
      rcq(
        18,
        4,
        "Why does the author mention limited municipal staff?",
        [
          "To support a proportionate reporting frequency and common technical tools",
          "To exempt every city from bond disclosure",
          "To require a full audit each month",
          "To transfer repayment duties to investors",
        ],
        0,
        "Capacity constraints justify quarterly core reporting rather than indiscriminate real-time publication.",
      ),
      rcq(
        18,
        5,
        "Which measure does the author NOT propose?",
        [
          "Quarterly core indicators",
          "Warnings after material deviations",
          "A complete monthly audit of every field",
          "Revision histories for reported data",
        ],
        2,
        "The passage favours targeted assurance rather than reproducing a full annual audit monthly.",
      ),
    ],
  },
  {
    id: "rc-19",
    title: "Who Owns an AI Research Note",
    passage: `A research house may use a language model to summarise filings, draft valuation commentary, or translate a note. Calling the tool an assistant does not settle responsibility for the output. If a fabricated covenant enters a recommendation, the investor cannot seek an explanation from a model weight. The licensed entity chose the data, workflow, reviewer, and publication channel.

Mandatory labelling of every machine-written sentence may create noise without revealing risk. More useful disclosure identifies material dependence: whether the model generated factual claims, whether confidential information entered an external service, and what verification occurred before release. A generic footer saying “AI may have been used” should not dilute an analyst’s attestation. Responsibility must remain concentrated even when production is distributed.

Controls should match the task. Source-linked extraction can be checked against a filing; speculative scenario generation needs boundaries and prominent human judgement. Firms should retain prompts and cited sources where they affect a published conclusion, while avoiding indiscriminate storage of sensitive inputs. The policy objective is not literary purity. It is to preserve a reviewable chain from evidence to recommendation, so automation accelerates analysis without making error ownership evaporate.`,
    questions: [
      rcq(
        19,
        1,
        "What is the passage’s central claim?",
        [
          "Language models should receive research licences",
          "Licensed research entities remain accountable for AI-assisted outputs and need reviewable controls",
          "Every machine-written sentence must carry a separate label",
          "AI may be used only for translation",
        ],
        1,
        "The author places responsibility on the entity and asks for material disclosure and evidence-linked review.",
      ),
      rcq(
        19,
        2,
        "Why is a generic AI footer considered weak?",
        [
          "It can disclose possible use without explaining material reliance or verification",
          "It always reveals confidential prompts",
          "It transfers legal responsibility to the investor",
          "It guarantees every factual claim is sourced",
        ],
        0,
        "The passage contrasts a vague footer with disclosure of factual generation, data handling, and checks.",
      ),
      rcq(
        19,
        3,
        "In context, responsibility must remain “concentrated” means:",
        [
          "The licensed entity cannot diffuse accountability among tools and workflow participants",
          "Only one analyst may work on a note",
          "All research must use one central computer",
          "Models must be trained on one filing",
        ],
        0,
        "Distributed production does not displace the licensed entity’s ownership of publication decisions.",
      ),
      rcq(
        19,
        4,
        "What function does the fabricated covenant example serve?",
        [
          "It demonstrates why a humanly accountable entity must own model-assisted factual errors",
          "It proves every covenant in a filing is false",
          "It argues that valuation commentary needs no sources",
          "It assigns complaint handling to model developers",
        ],
        0,
        "The example shows that a model itself cannot answer to an investor for a consequential invented fact.",
      ),
      rcq(
        19,
        5,
        "Which practice does the author NOT endorse?",
        [
          "Checking extracted facts against source filings",
          "Retaining prompts that affect published conclusions",
          "Indiscriminately storing all sensitive model inputs",
          "Applying controls according to the task’s risk",
        ],
        2,
        "The passage specifically warns against indiscriminate retention of sensitive inputs.",
      ),
    ],
  },
  {
    id: "rc-20",
    title: "Short-Sale Transparency Without a Squeeze Map",
    passage: `Short selling contributes sceptical information to prices, but concentrated short positions can also create crowded exits. Public disclosure is proposed as the cure for both suspicion and instability. The difficulty is granularity. Naming every manager’s position in near real time can invite copycat trades, retaliation, or a coordinated squeeze unrelated to the issuer’s fundamentals.

Complete secrecy has costs too. Regulators and investors may miss leverage building across prime brokers, and issuers can dismiss all criticism as anonymous speculation. A layered regime can collect position-level data confidentially, publish delayed market-wide aggregates, and require a manager to disclose a material report or conflict when it campaigns publicly about an issuer. The trigger should depend on economic exposure, including relevant derivatives, not merely registered share borrowing.

Aggregation rules must prevent both double counting and strategic fragmentation across related funds. Supervisors also need authority to examine sudden position changes around public allegations. None of this makes a negative thesis abusive merely because it profits. The control is evidence: accurate exposure, disclosed conflicts where advocacy occurs, and an audit trail linking trades to statements. Transparency should illuminate systemic crowding and promotional incentives without publishing a convenient map for punishing dissent.`,
    questions: [
      rcq(
        20,
        1,
        "What is the passage’s main argument?",
        [
          "Every short seller should publish positions immediately",
          "Short-sale transparency should be layered to reveal systemic and advocacy risks without enabling squeezes",
          "Negative investment theses are inherently abusive",
          "Derivatives should never count toward short exposure",
        ],
        1,
        "The author balances confidential supervisory detail, delayed aggregates, and conflict disclosure against squeeze risk.",
      ),
      rcq(
        20,
        2,
        "Why might near-real-time manager identification harm price discovery?",
        [
          "It can facilitate copycats, retaliation, or a squeeze detached from fundamentals",
          "It prevents regulators from seeing position data",
          "It makes all short positions illegal",
          "It removes every issuer’s incentive to disclose",
        ],
        0,
        "The first paragraph warns that granular immediate publication can produce strategic attacks on positions.",
      ),
      rcq(
        20,
        3,
        "The author would most likely agree that:",
        [
          "Profit from a negative thesis is sufficient proof of abuse",
          "A public campaign creates a stronger case for disclosing material exposure and conflicts",
          "Registered share borrowing captures every economic short",
          "Complete secrecy best protects investors",
        ],
        1,
        "The proposed regime ties advocacy about an issuer to disclosure of material reports or conflicts.",
      ),
      rcq(
        20,
        4,
        "What function does the reference to derivatives serve?",
        [
          "It prevents the disclosure trigger from being evaded through another instrument",
          "It excludes synthetic exposure from supervision",
          "It proves derivatives have no economic effect",
          "It recommends counting every derivative twice",
        ],
        0,
        "Economic-exposure measurement closes an avoidance route based on instrument form.",
      ),
      rcq(
        20,
        5,
        "Which position does the author NOT take?",
        [
          "Related funds should not fragment positions to avoid aggregation",
          "Supervisors should inspect trades around public allegations",
          "Publishing a negative view while profiting is automatically misconduct",
          "Position-level information can remain confidential while aggregates are published",
        ],
        2,
        "The passage expressly rejects treating a profitable negative thesis as abusive without further evidence.",
      ),
    ],
  },
];
