import { makeQuestion } from "@/data/make-question";
import type { DescriptivePaper } from "@/data/descriptive";

const rc = makeQuestion(2, 1);

function rcq(
  year: number,
  n: number,
  question: string,
  options: [string, string, string, string],
  answer: 0 | 1 | 2 | 3,
  explanation: string,
) {
  return rc(
    `pyq-${year}-p2p1-rc${n}`,
    "english",
    "hard",
    question,
    options,
    answer,
    explanation,
  );
}

/** Memory-based descriptive themes from candidate analyses (original passages). */
export const descriptivePyqPapers: DescriptivePaper[] = [
  {
    set: 2024,
    essayWordLimit: 260,
    essayMarks: 30,
    precisWordLimit: 150,
    precisMarks: 30,
    rcMarks: 40,
    essayPrompts: [
      "How do organisations and managers cultivate culture that survives a change of CEO? Argue with one market-infrastructure example.",
      "ESG norms are spreading from listing requirements into capital allocation. Discuss benefits and the risk of box-ticking disclosure.",
      "What role should banks play in embedding social healthcare into a country’s financial architecture?",
      "Machine learning versus human intelligence in market surveillance: will models replace officers, or only rank their queues?",
    ],
    essayGuide: [
      "Pick one prompt; state a policy thesis in the first paragraph.",
      "Use one concrete SEBI/market example (listing, surveillance, or disclosure).",
      "Acknowledge a trade-off (innovation vs integrity, or speed vs due process).",
      "Close with an implementable control, not a slogan.",
    ],
    precisPassage: `The video-game industry after 2000 did not merely get faster chips. It rebuilt its cash engine. Packaged discs sold a finite story; live-service titles sell a relationship. Season passes, cosmetic skins, and battle-pass calendars turned a one-time purchase into a stream of micro-transactions that finance studios can model like a subscription, even when the player never signed a contract that used that word.

The same shift created a regulatory silhouette. Loot boxes sit uncomfortably close to gambling when the odds are opaque and the audience is young. Influencer marketing of in-game items blurs advertising and play. Cross-border stores mean a title can be priced, taxed, and age-gated differently in two tabs of the same launcher. Payments rails, KYC for high-value wallets, and the custody of digital items that players treat as property are no longer “tech side quests”; they are consumer-protection files.

None of this implies that games are a vice. They are a large export, a skills pipeline, and a social space. The policy error is to regulate them as if they were still cardboard boxes on a shelf, or to treat every randomised reward as a casino. The useful questions are older than Unity: is the price clear, is the chance of a prize disclosed, can a child spend without a parent, and who is accountable when the item vanishes with the server? Those are disclosure and conduct problems wearing a headset.`,
    precisModel:
      "After 2000, games moved from one-off discs to live-service cashflows—passes, cosmetics, battle calendars—that behave like subscriptions. That shift raised conduct issues: opaque loot-box odds near gambling, influencer ads mixed with play, and stores that price and age-gate differently across borders. Payments, KYC, and custody of digital items are consumer-protection issues, not side quests. Games remain a legitimate export and social space; the error is to treat them as cardboard boxes or as casinos. The live questions are old: clear prices, disclosed odds, child spending controls, and accountability when items vanish with the server.",
    rcPassage: `Social influence did not begin with a ring light. What changed is the unit of persuasion. A newspaper column persuaded by masthead; a television spot persuaded by repetition and reach. A creator persuades by parasocial proximity—the feeling that a stranger is a slightly more successful friend. That intimacy is an economic asset. It is also a disclosure problem. When the friend is paid, and the payment is a story rather than a label, the audience cannot discount the advice.

Securities markets feel this earlier than most sectors because a “tip” is not a shampoo. A twenty-second clip that names a small-cap, flashes a chart, and ends with “not financial advice” can still move a float if the follower graph is large enough and the stock is thin enough. Platforms optimise for watch-time, not for whether the speaker is registered as an investment adviser. The adviser-regulation perimeter was built for offices and visiting cards, not for a bedroom studio that can reach a million people before lunch.

The mature response is not to ban speech. It is to make the commercial relationship visible, to treat scale as a reason for the perimeter to apply, and to keep enforcement boring: archive the clip, follow the money, and ask whether the speaker was in the market. Influence is a distribution channel. Distribution channels already have rules; they just used to be printed on the last page.`,
    rc: [
      rcq(
        2024,
        1,
        "The author’s central claim about creator persuasion is that:",
        [
          "Ring lights caused market abuse",
          "Parasocial intimacy is an economic asset and therefore a disclosure problem when it is paid",
          "Newspapers never persuaded anyone",
          "All short videos should be banned",
        ],
        1,
        "Paragraph 1: intimacy is an asset and a disclosure problem when payment is hidden in the story.",
      ),
      rcq(
        2024,
        2,
        "Why do securities markets “feel this earlier than most sectors”?",
        [
          "Because shampoos are more tightly regulated than shares",
          "Because a named thin-float stock can move on a clip even with a disclaimer",
          "Because SEBI licenses every YouTube channel",
          "Because watch-time is a listed security",
        ],
        1,
        "Paragraph 2: a tip is not a shampoo; a clip can move a thin stock despite “not financial advice”.",
      ),
      rcq(
        2024,
        3,
        "According to the passage, platform incentives currently maximise:",
        [
          "Whether the speaker is a registered adviser",
          "Watch-time, not adviser status",
          "Best execution for viewers",
          "KYC of every follower",
        ],
        1,
        "Paragraph 2: platforms optimise for watch-time, not registration.",
      ),
      rcq(
        2024,
        4,
        "The “mature response” rejected by the author would be:",
        [
          "Making the commercial relationship visible",
          "Banning speech",
          "Treating scale as a reason the adviser perimeter may apply",
          "Archiving clips and following the money",
        ],
        1,
        "Paragraph 3: “The mature response is not to ban speech.”",
      ),
      rcq(
        2024,
        5,
        "“Influence is a distribution channel” implies that:",
        [
          "Creators are exempt from conduct rules",
          "Existing distribution rules should be adapted rather than invented from zero",
          "Only print ads need disclosure",
          "SEBI should own the platform",
        ],
        1,
        "Closing: channels already have rules; they used to be on the last page.",
      ),
    ],
  },
  {
    set: 2026,
    essayWordLimit: 260,
    essayMarks: 30,
    precisWordLimit: 150,
    precisMarks: 30,
    rcMarks: 40,
    essayPrompts: [
      "Social media platforms shape public opinion and political discourse. What should a financial-sector regulator worry about that a press council would not?",
      "Can high-speed rail be a genuine alternative to air travel in India, or only a complement on a few corridors?",
      "More Indians are recognised globally as high-net-worth individuals. What does that imply for market integrity, tax transparency, and product suitability?",
      "If you were drafting a circular on “finfluencers”, which two bright-line tests would you actually enforce?",
    ],
    essayGuide: [
      "Open with a thesis that a Grade A officer could defend in an interview.",
      "Use one statute or circular as an anchor (SEBI Act, adviser rules, or LODR).",
      "Separate what technology enables from what law already forbids.",
      "End with a measurable supervisory step.",
    ],
    precisPassage: `Tariffs look like a customs problem until they hit a balance sheet. A duty on a component is a cost; a duty that appears, pauses, and reappears is a volatility product. Firms that had treated trade policy as a background parameter suddenly need scenarios: what if the input is reclassified, what if a “national security” overlay lands on a software-defined tool, what if the exemption is firm-specific and therefore a political asset?

Financial markets price that uncertainty faster than factories can re-tool. Forward curves, freight, and the currency all move on rumours of a list. Listed companies then face a disclosure question that is easy to get wrong: when is a draft tariff “material”, and when is it noise that will be walked back before the next earnings call? Silence can be as misleading as a heroic forecast.

The policy moral is not “free trade or protection”. It is that trade instruments now have the same information-risk profile as other contingent government actions. Investors need the assumptions, not the patriotism. Supervisors need to know which issuers are one HS-code away from a profit warning, and whether their hedging is economics or theatre.`,
    precisModel:
      "Tariffs are not only customs: a duty is a cost, but a duty that appears and vanishes is volatility. Firms must scenario-plan reclassifications, security overlays, and political exemptions. Markets reprice rumours via forwards, freight, and FX before factories re-tool. Issuers then face a materiality call—draft lists versus noise—and silence can mislead as much as heroics. The issue is not a slogan about free trade; trade tools now carry information risk like other contingent state acts. Investors need assumptions; supervisors need to know who is one HS-code from a warning and whether hedges are real.",
    rcPassage: `A data centre is a building that turns electricity into latency. The unfashionable input is water. Cooling towers evaporate it; chillers move heat into it; drought turns a “cloud region” into a local political fight. The marketing language of dematerialised computing hides a very material pipe.

Municipalities that courted campuses with cheap land are discovering that the same campuses can outbid farmers in a dry year. Operators reply that closed-loop systems and non-potable sources shrink the footprint, which is sometimes true and sometimes a slide. The honest metric is litres per kilowatt-hour of IT load across a season, not a glossy “water positive” claim that banks on a distant replenishment project.

For a securities regulator the file is not plumbing. It is disclosure and concentration. If a listed infrastructure trust’s cash flows assume unlimited municipal supply, that assumption belongs next to occupancy rates. If several “independent” cloud regions share an aquifer, a heatwave is a correlated outage, not three uncorrelated SLAs. Environmental, social, and governance reporting that cannot name the watershed is costume jewellery. The technology is real; so is the river.`,
    rc: [
      rcq(
        2026,
        1,
        "The opening metaphor “electricity into latency” is immediately qualified by:",
        [
          "A claim that clouds have no physical plant",
          "Water as the unfashionable cooling input",
          "A call to ban data centres",
          "A defence of diesel generators",
        ],
        1,
        "Paragraph 1: the unfashionable input is water.",
      ),
      rcq(
        2026,
        2,
        "Municipalities that courted campuses with cheap land now face:",
        [
          "Unlimited potable supply by statute",
          "Competition between campuses and farmers for water in a dry year",
          "A ban on closed-loop cooling",
          "SEBI licensing of chillers",
        ],
        1,
        "Paragraph 2: campuses can outbid farmers in a dry year.",
      ),
      rcq(
        2026,
        3,
        "The “honest metric” the author wants is:",
        [
          "A distant replenishment offset branded water-positive",
          "Litres per kilowatt-hour of IT load across a season",
          "Number of marketing slides",
          "Rack count only",
        ],
        1,
        "Paragraph 2: litres per kWh of IT load across a season.",
      ),
      rcq(
        2026,
        4,
        "For a securities regulator the issue is framed as:",
        [
          "Plumbing inspections",
          "Disclosure and concentration risk, including shared aquifers",
          "Setting electricity tariffs",
          "Designing cooling towers",
        ],
        1,
        "Paragraph 3: disclosure and concentration, not plumbing.",
      ),
      rcq(
        2026,
        5,
        "ESG reporting that cannot name the watershed is called:",
        [
          "Best practice",
          "Costume jewellery",
          "A listing requirement already met",
          "A substitute for occupancy disclosure",
        ],
        1,
        "Closing: unnamed-watershed ESG is costume jewellery.",
      ),
    ],
  },
];
