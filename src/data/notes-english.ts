import type { TopicNote } from "@/data/notes";

export const notesEnglish: TopicNote = {
  topic: "english",
  title: "English for SEBI Paper 1 — worked notes",
  blurb:
    "Phase I English is a 25-mark screening slice: error spotting, fillers, para jumbles, vocabulary, and a short RC. The same habits — agreement, articles, parallel lists, and the difference between an inference and a printed fact — also feed Phase II descriptive precis. Work every example as a five-step elimination, not as a vibe.",
  blocks: [
    {
      heading: "Subject–verb agreement — find the true subject first",
      body: "Bank-exam English treats agreement as a hunting sport: the verb agrees with the grammatical head, not with the nearest noun. A prepositional phrase, an ‘along with’ tail, or a relative clause can sit between the head and the verb and still not steal the number. ‘The quality of the disclosures is poor’ — quality is singular, disclosures is a decoy. ‘The Chairperson, together with the whole-time members, has issued’ — together with / along with / as well as / besides does not make a compound subject; the first noun still governs.\n\nIndefinite pronouns are mostly singular in this paper: each, every, everyone, everybody, anyone, someone, nobody, either, neither. ‘Neither of the reports is complete’ is the expected form: neither is singular; of the reports is a prepositional phrase with a plural object. ‘Either of the two circulars is’ follows the same pattern. When two subjects are joined by or / nor, the verb follows the nearer subject: ‘Neither the trustees nor the AMC has’ versus ‘Neither the AMC nor the trustees have’.\n\nCollective nouns (board, committee, management) take a singular verb when the unit acts as one: ‘The Board has notified.’ A plural is used only when the members are clearly acting separately, which Paper 1 almost never wants. ‘A number of intermediaries have’ (plural) versus ‘The number of intermediaries has’ (singular) is a fixed pair. ‘The data are’ versus ‘the data is’ is messy in real English; many keys still prefer plural data, but a safer exam move is to look at what the options actually test — usually agreement with number / none / each, not a linguistics debate.\n\nAmounts, distances, and time periods that are conceived as one lump take singular: ‘Five crore rupees is a material loss’ in exam English. Titles and names of regulations are singular: ‘The PIT Regulations is a plural-looking title but the paper will usually recast it as ‘The PIT framework is’. Prefer rewriting in your head: ‘This regulation is’ rather than fighting the surface plural.",
      bullets: [
        "Ignore of-phrases: the quality of X is; neither of X is.",
        "along with / together with / as well as → first noun still rules.",
        "or / nor → verb follows the nearer subject.",
        "a number of = plural; the number of = singular.",
      ],
      examples: [
        {
          title: "Neither of + plural noun",
          prompt:
            "Identify the error: ‘Neither of the reports are complete.’ (A) No error (B) ‘Neither’ is singular; use ‘is’ (C) ‘Reports’ should be ‘report’ (D) ‘Complete’ should be ‘completed’ only.",
          steps: [
            "Isolate the true subject. ‘Neither’ is the head; ‘of the reports’ is a prepositional phrase. The head is singular in standard exam English.",
            "The verb ‘are’ is plural. It disagrees with ‘neither’. That is the error.",
            "Test (A): ‘No error’ fails because a singular head cannot take ‘are’ here.",
            "Test (C): ‘Neither of’ requires a plural noun after of (the set from which none is taken). Changing reports → report is ungrammatical. (C) fails.",
            "Test (D): ‘complete’ is a correct predicative adjective. ‘Completed’ would want a passive or a perfect (‘has been completed’). (D) fails. Therefore (B).",
          ],
          result:
            "(B) Neither of the reports is complete. ‘Neither’ singular; ‘reports’ stays plural; ‘complete’ stays an adjective.",
        },
        {
          title: "Along with does not pluralise",
          prompt:
            "Pick the correct sentence. (A) The Chairperson, along with the whole-time members, have signed the order. (B) The Chairperson, along with the whole-time members, has signed the order. (C) The Chairperson along with the whole-time members have signed the order. (D) The Chairperson, along with the whole-time members, are signing the order as a team so the verb is plural.",
          steps: [
            "Head noun: Chairperson (singular). The phrase ‘along with the whole-time members’ is parenthetical, not a compound subject.",
            "(A) uses ‘have’ — plural verb, wrong agreement. Eliminate.",
            "(C) drops commas and still uses ‘have’. Same agreement fault.",
            "(D) invents a ‘team so plural’ rule. Exam English does not convert along-with into and. Eliminate.",
            "(B) keeps ‘has’ with Chairperson. That is the required form.",
          ],
          result:
            "(B) The Chairperson, along with the whole-time members, has signed the order.",
        },
        {
          title: "A number of versus the number of",
          prompt:
            "Fill the verbs: ‘A number of FPIs ___ filed; the number of FPIs ___ risen.’ (A) has, have (B) have, has (C) have, have (D) has, has.",
          steps: [
            "‘A number of + plural’ means ‘many’ and takes a plural verb: have filed.",
            "‘The number of + plural’ means a single figure and takes a singular verb: has risen.",
            "(A) reverses both. (C) makes the number plural. (D) makes a number singular.",
            "Only (B) pairs have with a number of, has with the number of.",
            "Apply the same split to ‘a number of intermediaries were inspected’ / ‘the number of intermediaries was 412’.",
          ],
          result:
            "(B) A number of FPIs have filed; the number of FPIs has risen.",
        },
        {
          title: "Neither…nor nearer-subject rule",
          prompt:
            "Choose: (A) Neither the trustees nor the AMC have issued the addendum. (B) Neither the trustees nor the AMC has issued the addendum. (C) Neither the AMC nor the trustees has issued the addendum. (D) Neither of the two has issued, so both (B) and (C) must be wrong.",
          steps: [
            "With neither…nor the verb agrees with the nearer subject, not with a blended plural.",
            "In (A) the nearer subject is AMC (singular) but the verb is have (plural). Fault.",
            "In (B) nearer subject AMC + has. Agreement holds.",
            "In (C) nearer subject is trustees (plural) but the verb is has (singular). Fault. (The reverse order would need have: Neither the AMC nor the trustees have…)",
            "(D) confuses ‘neither of’ (singular pronoun) with ‘neither…nor’ (two subjects). It is not a reason to reject (B). Answer (B).",
          ],
          result:
            "(B) Neither the trustees nor the AMC has issued the addendum. Flip the order and the verb would become have.",
        },
      ],
    },
    {
      heading: "Error spotting — articles, prepositions, parallelism",
      body: "Error-spot items usually hide in three pockets. Articles: use a/an for a non-unique countable, the for a unique or previously identified noun, and zero article for bare plurals and most mass nouns in general statements. ‘The SEBI Act, 1992’ takes the because it is a unique statute. ‘Investors require disclosure’ needs no article before investors in the generic sense. ‘An UPSI’ is wrong: UPSI begins with a vowel sound, so ‘an unpublished…’, but the abbreviation is usually ‘UPSI’ spoken as letters (you-pee-ess-eye) — exam keys still expect ‘UPSI’ without an, or ‘an unpublished price-sensitive…’. Safer: ‘the communication of UPSI’.\n\nPrepositions in official English are collocational, not logical. A circular is issued to intermediaries (recipients), issued by SEBI (author), issued for a purpose, issued under a regulation (legal source). Eligible for a benefit; comply with a regulation; prohibit someone from doing; differ from; interested in; according to; in accordance with. ‘Comply to’ and ‘according with’ are the usual traps. ‘Comprise of’ is disliked; ‘comprise’ or ‘consist of’ is cleaner.\n\nParallelism requires the same grammatical shape after a coordinator or in a list. ‘The Board seeks to protect investors, to promote development, and to regulate the market’ — three infinitives. Breaking the chain (‘protect investors, promoting development, and regulation’) is the error. After not only…but also, the structure after each marker must match: not only the prospectus but also the advertisements; not only filed but also disseminated. Comparisons with as / than need a comparable noun: ‘The T+1 cycle is shorter than the T+2 cycle’, not ‘shorter than T+2 was having’.\n\nWhen four options label parts of a sentence (A)(B)(C)(D), read once for sense, once for agreement, once for article/preposition, once for parallel lists. If two faults exist, the question usually points at the first underlined slot; this paper’s items are mostly single-error. ‘No error’ is real, but it is rarer than candidates hope.",
      bullets: [
        "issued to (recipients) / by (author) / under (statute) / for (purpose).",
        "comply with; prohibit from; eligible for; consist of (not comprise of).",
        "Lists after and / or / not only…but also must keep the same grammatical form.",
        "the + unique statute (the SEBI Act); zero article for generic plurals (investors).",
      ],
      examples: [
        {
          title: "Issued to / by / under / for",
          prompt:
            "Fill in: ‘The circular was issued _____ all registered intermediaries.’ (A) for (B) to (C) at (D) by for. Explain why the others fail.",
          steps: [
            "The blank names the recipients of the circular. The collocation is issued to someone.",
            "(A) issued for can mark a purpose (‘issued for public comments’), not the addressee list. It fails here.",
            "(C) issued at wants a place or time (‘issued at Mumbai’ / ‘issued at 9 a.m.’), not persons. It fails.",
            "(D) by for is not English. Issued by would name the author (SEBI), but the stem already has ‘was issued’ and wants recipients.",
            "Therefore (B) to. Memory pair: issued by SEBI to intermediaries under the SEBI Act for compliance.",
          ],
          result:
            "(B) to. Recipients take to; author takes by; statute takes under; purpose takes for.",
        },
        {
          title: "Article before a unique statute and a generic plural",
          prompt:
            "Spot the error: ‘A SEBI Act requires the investors to read a prospectus before applying.’ Parts: (A) A SEBI Act (B) requires (C) the investors (D) to read a prospectus before applying.",
          steps: [
            "The statute is unique: the SEBI Act, not a SEBI Act. (A) is the article error.",
            "(B) requires agrees with a singular Act. If we correct (A) to The SEBI Act, requires stays fine.",
            "(C) the investors forces a specific set. Generic investors usually take zero article: ‘requires investors to read’. This can be a second fault, but the underlined first slot is the designed error.",
            "(D) is a correct infinitive of purpose after require X to-infinitive.",
            "Corrected sentence: ‘The SEBI Act requires investors to read a prospectus before applying.’ Why (A) fails: indefinite article on a unique proper statute.",
          ],
          result:
            "Error in (A): unique statute needs the, not a. Generic ‘investors’ is cleaner without the.",
        },
        {
          title: "Parallelism in a three-part statutory list",
          prompt:
            "Which is parallel? (A) SEBI shall protect investors, promoting markets, and regulation of intermediaries. (B) SEBI shall protect investors, promote markets, and regulate intermediaries. (C) SEBI shall protect investors, to promote markets, and regulating intermediaries. (D) SEBI shall protection of investors, promote markets, and regulate intermediaries.",
          steps: [
            "After shall we need a base-form verb chain: protect / promote / regulate.",
            "(A) mixes a verb (protect) with a participle (promoting) and a noun (regulation). Parallelism fails.",
            "(C) mixes to-infinitive and participle after a bare verb. Fails.",
            "(D) starts with a noun (protection) after shall — ungrammatical — then returns to verbs. Fails.",
            "(B) keeps three bare infinitives (the shall is shared). That is the parallel form of the SEBI preamble duties.",
          ],
          result:
            "(B) protect, promote, and regulate — three verbs sharing shall.",
        },
        {
          title: "Not only…but also and a preposition trap",
          prompt:
            "Spot the fault: ‘The intermediary must not only comply to the PIT code but also the LODR filings.’ Why each repair option succeeds or fails.",
          steps: [
            "Two faults can sit together: comply to is the wrong preposition (needs with), and not only…but also is not parallel (verb phrase versus noun phrase).",
            "Repair of preposition only: ‘comply with the PIT code but also the LODR filings’ — still unparallel, because not only takes a verb phrase and but also takes a noun.",
            "Repair of parallelism only: ‘not only comply to the PIT code but also file the LODR filings’ — still contains comply to.",
            "Full repair: ‘must not only comply with the PIT code but also file the LODR returns’ (verb + with-phrase // verb + noun) or ‘must comply with not only the PIT code but also the LODR filings’ (two nouns after with).",
            "If options offer ‘No error’, reject. If they offer ‘replace to with with’, that may be the keyed error when only one slot is underlined. Always check parallelism as a second pass.",
          ],
          result:
            "comply with (not to). Keep the same shape after not only and but also — two verbs or two nouns, not a mix.",
        },
      ],
    },
    {
      heading: "Fillers — collocation, grammar, and one-word logic",
      body: "Cloze / filler items are three different games sold in one packet. Single-blank grammar fillers test articles, prepositions, conjunctions, and agreement: the answer must fit the syntax on both sides. Double-blank vocabulary fillers test collocation pairs (mitigate risk, disclose material facts, conduct surveillance, a prudent investor). Phrase fillers test connectors: however (contrast), moreover (addition), therefore (result), unless (negative condition), lest (negative purpose — rare and formal).\n\nRead the whole sentence before looking at options. Then cancel options that break grammar even if they are thematically related. ‘The regulation aims at prohibit insider trading’ is a grammar fail (aims at + -ing, or aims to + infinitive). ‘The regulation aims to prohibit insider trading’ or ‘aims at prohibiting’. Do not pick prohibit just because the GA fact is true.\n\nTone of official English is Latinate and dry: issued, notified, prescribed, deemed, pursuant to, in so far as. Slang (gutted, slammed, axed) is almost never the filler in a SEBI-flavoured sentence. If two synonyms remain, pick the one that matches the legal register: ‘material’ not ‘juicy’; ‘adverse’ not ‘nasty’; ‘mitigate’ not ‘fix up’.\n\nFor paired blanks, solve the easier blank first. If blank two must be a noun because it follows the, you have already killed verb options. Then test collocation: pose a risk, not pose a danger as often; take cognisance of; give effect to; enter into an agreement; pass an order; levy a penalty.",
      bullets: [
        "Fit syntax first, meaning second, official register third.",
        "aims to + infinitive; aims at + -ing; prohibit X from + -ing.",
        "Connectors: however ≠ therefore; unless = if not; despite + noun, although + clause.",
        "Paired blanks: solve the grammatically forced blank first.",
      ],
      examples: [
        {
          title: "Single blank — grammar beats GA knowledge",
          prompt:
            "The Board aims _____ insider trading in listed securities. (A) at prohibit (B) to prohibit (C) prohibiting to (D) for prohibit.",
          steps: [
            "aims to + infinitive is standard; aims at + gerund is also standard. aims at prohibit mixes at with a base verb — ungrammatical.",
            "(A) at prohibit fails the gerund test. (D) for prohibit is not a collocation of aim.",
            "(C) prohibiting to has the gerund but then a stray to. It does not complete the clause.",
            "(B) to prohibit is the clean infinitive complement. The GA fact (SEBI prohibits insider trading) is true, but (A) would still be wrong if you forced the fact into bad grammar.",
            "Alternate correct sentence not in the options: ‘aims at prohibiting insider trading’. Do not invent it if it is not offered.",
          ],
          result:
            "(B) to prohibit. True market facts cannot rescue a broken complement.",
        },
        {
          title: "Connector filler — despite versus although versus however",
          prompt:
            "_____ T+1 compressed counterparty risk, operational failures at custodians can still delay pay-in. (A) Despite (B) Although (C) However (D) Because.",
          steps: [
            "The blank sits at the start of a clause that already has a finite verb (compressed). We need a subordinator that takes a clause, or a preposition that takes a noun.",
            "(A) Despite takes a noun / -ing, not a finite clause. ‘Despite T+1 compressed…’ is ungrammatical. Despite would need ‘Despite T+1’s compression of…’.",
            "(C) However is an adverb, not a clause-linker in this slot. ‘However, T+1 compressed…’ would start a new sentence and would also reverse the logic.",
            "(D) Because would claim that T+1 is the reason operational failures delay pay-in — the opposite of the intended contrast.",
            "(B) Although correctly marks contrast and takes a clause. Meaning: even though settlement is faster, ops risk remains.",
          ],
          result:
            "(B) Although. despite + noun; although + clause; however as a sentence adverb; because = cause, not contrast.",
        },
        {
          title: "Paired blanks — collocation",
          prompt:
            "Listed companies must _____ all _____ events to the stock exchanges without delay. (A) hide, trivial (B) disclose, material (C) mitigate, festive (D) surveil, edible.",
          steps: [
            "Blank 1 is a verb of communication to exchanges. LODR language is disclose / intimate, not hide.",
            "Blank 2 must be the LODR adjective for price-sensitive or performance-changing events: material. Trivial is the antonym.",
            "(A) hide + trivial is illegal and illogical. (C) mitigate events is the wrong verb (you mitigate risk, you disclose events); festive is nonsense. (D) surveil is a verb often used of markets, not of companies ‘surveilling events’ to exchanges; edible is comic.",
            "Check register: disclose material events is the exact official pair.",
            "Therefore (B). If a later blank used surveillance, that word belongs to the exchange/SEBI watch on trading, not to the company’s filing duty.",
          ],
          result:
            "(B) disclose, material. Company filings = disclosure of material events; surveillance is the market-watch word.",
        },
        {
          title: "Unless versus until versus if",
          prompt:
            "Trading in the scrip will not resume _____ the exchange lifts the restriction. (A) unless (B) until (C) if (D) lest.",
          steps: [
            "The main clause is negative (will not resume). We need the time/condition at which the negative state ends.",
            "until marks the time boundary: not resume until the lift happens. That matches.",
            "unless = if not. ‘will not resume unless the exchange lifts’ is actually possible logically (resume only if lift), but the stem’s ‘will not resume ___ the exchange lifts’ without a verb after unless is missing ‘unless + clause’ wait — ‘unless the exchange lifts the restriction’ is a full clause, so unless is grammatical too.",
            "Prefer until when the idea is a waiting period that ends at a moment. unless is a condition, not a clock. Exam keys for ‘will not…resume ___’ plus a future event usually want until.",
            "(C) if would yield ‘will not resume if the exchange lifts’ — the opposite. (D) lest = so that not, and takes a subjunctive, wrong meaning. Choose (B) until.",
          ],
          result:
            "(B) until. unless is a negative condition; until is the time-limit after a negative; if here reverses the sense.",
        },
      ],
    },
    {
      heading: "Para jumbles — opener, mandatory pair, closer",
      body: "A four-sentence jumble is solved in a fixed order of tests, never by reading all 24 permutations. First find the opener: a sentence that can start a paragraph. It names a topic without a backwards pronoun (this, these, such, that), without a result marker (therefore, hence, consequently), and without a contrast that presupposes a claim (however, nevertheless) unless the contrast is against common knowledge. General definitional sentences and problem statements make good openers.\n\nSecond, hunt a mandatory pair: two sentences that must sit together because of a pronoun, a demonstrative, a repeated noun with the, a cause-effect (therefore / that is why), or a logical contrast (but the 2022 design…). If B introduces ‘shortening settlement’ and C says ‘that operational stack’, C cannot precede B. Third, find the closer: a therefore / hence / thus sentence, a policy conclusion, or a sentence that names the practical path after the reason has been given.\n\nFourth, test leftover sentences in the holes that remain. Fifth, read the sequence aloud as a paragraph and kill any order that strands a pronoun. In SEBI-flavoured jumbles the content is often T+1, T+0, disclosure, or surveillance; do not let true GA facts override the pronoun chain. A factually correct sentence can still be in the wrong slot.\n\nOpening-sentence standalone questions (‘which should come first?’) use the same opener tests. If two sentences look general, pick the one that the others clearly refer back to. A sentence with therefore is almost never first.",
      bullets: [
        "Opener: no this/therefore/however-to-an-unseen-claim; names the topic.",
        "Mandatory pair: pronoun, the + repeated noun, that is why, hence.",
        "Closer: therefore / hence / practical path / named design choice.",
        "True GA content does not beat a broken pronoun chain.",
      ],
      examples: [
        {
          title: "Four-sentence T+1 jumble",
          prompt:
            "Arrange: A. Phased inclusion of stocks was therefore the practical path. B. Shortening settlement compresses counterparty exposure. C. Operational capacity at brokers, custodians and depositories cannot be assumed overnight. D. That is why a jump from T+2 to T+1 for every scrip on a single day was not the 2022 design.",
          steps: [
            "Find the opener. A has therefore — not first. D has That is why — needs an antecedent. C is a constraint, usually after the idea it constrains. B states the policy idea with no backward pointer. Opener = B.",
            "Mandatory pair: B names shortening settlement; C says operational capacity cannot be assumed overnight — the cost of doing B fast. D’s That is why points at the B+C tension. Pair path: B then C, and C then D (or B-C-D as a chain).",
            "Closer: A’s therefore names the practical path (phasing) after D has rejected the big-bang jump. A closes.",
            "Leftover check: B-C-D-A. After B, C is the operational but. After C+B, D explains the 2022 design. A restates the method.",
            "Reject C-B (cannot assume capacity before we know what we are assuming it for). Reject A anywhere but last. Order: B C D A.",
          ],
          result:
            "B–C–D–A. Opener B; pair B–C and C–D; closer A (therefore).",
        },
        {
          title: "Which sentence should come first? (T+0)",
          prompt:
            "A. A limited beta therefore tests operations without forcing the entire market onto a new clock. B. Same-day settlement needs funding, confirmation and custody to finish before evening. C. That operational stack is heavier than T+1. D. Hence T+0 began as an optional, narrow basket. Which is first?",
          steps: [
            "A contains therefore — result, not opener. D contains Hence — result, not opener. C contains That operational stack — That needs a named stack.",
            "B names the topic (same-day settlement) and the operational needs, with no backward word. B is the only legal opener.",
            "Mandatory pair: B lists funding/confirmation/custody; C calls that stack heavier than T+1. Pair B–C.",
            "Closers: A (therefore beta) and D (hence optional basket) both conclude; D is a tighter policy label, A explains the beta logic. A plausible full order is B–C–A–D or B–C–D–A; the question only asked the first sentence.",
            "Answer the asked limb: first sentence is B. Do not pick A because it contains the true GA fact about a limited beta.",
          ],
          result:
            "B is the opener. A and D are therefore/hence closers; C’s That points back to B.",
        },
        {
          title: "Pronoun pair in a disclosure jumble",
          prompt:
            "A. Such silence can itself mislead investors when the rumour is specific and price-sensitive. B. Listed companies sometimes delay an exchange intimation while they verify a market rumour. C. LODR, however, expects timely disclosure of material events, not a perfect internal novel. D. Verification is necessary, but it is not a licence to wait until the price has already moved. Find opener, pair, closer.",
          steps: [
            "Opener test: A’s Such silence needs a prior mention of silence/delay. C’s however needs a claim to contrast. D’s it refers to verification. B introduces the delay-while-verifying behaviour with no backward pronoun. Opener = B.",
            "Mandatory pair: B names delay-while-verify; D comments on verification — D should follow B (or follow a sentence that keeps verification in play). C names the LODR duty as contrast. A’s Such silence packs B’s delay into a consequence.",
            "A natural chain: B (behaviour) → D (verification is not a licence to wait) → C (LODR contrast) → A (such silence misleads). Alternative B–C–D–A also keeps Such silence last.",
            "Closer: A is the consequence sentence (can mislead). Good closer. C’s however can sit mid-paragraph, not first.",
            "Lock B as first and A as last. Between them, D should not precede the first mention of verification in B. Resulting order B–D–C–A (or B–C–D–A if you treat LODR as the immediate contrast). The designed pair is B–D (verification) and A last (Such silence).",
          ],
          result:
            "Opener B; B–D is the verification pair; closer A (Such silence). C’s however is mid-paragraph, never first.",
        },
        {
          title: "Eliminate a fake opener that is true GA",
          prompt:
            "A. Tuhin Kanta Pandey assumed charge as SEBI Chairperson on 1 March 2025. B. For that reason a 2024 memory-based paper that already names him as Chair is mixing cycles. C. Chairperson questions are year-stamped, not timeless GK. D. Madhabi Puri Buch held the post through calendar 2024. The options for first sentence are A or C. Which, and why A can still be second?",
          steps: [
            "Both A and D are dated facts; either can open a timeline paragraph. C is a methodological rule that the other sentences illustrate. The question says the options for first are A or C.",
            "If C opens (‘questions are year-stamped’), A and D become examples and B becomes the consequence (for that reason). That is a clean C–D–A–B or C–A–D–B.",
            "If A opens, we start with 2025, then must still introduce 2024 Buch before B’s ‘2024 paper’. Possible but clumsier unless D follows at once: A is a bad first sentence when the paragraph’s point is the method C.",
            "B’s For that reason needs the method + the two dates. B is a closer, not an opener.",
            "Pick C as opener. A is true GA and still not first, because the paragraph is about the year-stamp rule, which A merely instantiates.",
          ],
          result:
            "Opener C (the rule). A is a true 2025 fact but is an example, not the topic sentence. B is the closer.",
        },
      ],
    },
    {
      heading: "Financial English vocabulary — mitigate, disclosure, surveillance, materiality",
      body: "Four words do an unusual amount of work in SEBI-flavoured English and in Phase II essays. Mitigate means reduce the severity of a risk or harm that you cannot (or have not) eliminated. You mitigate counterparty risk by shortening settlement and collecting margins; you do not ‘mitigate a circular’ or ‘mitigate a Chairperson’. Near-synonyms: lessen, alleviate, cushion. Antonyms in options: aggravate, exacerbate, compound. Do not confuse with militate (against), mediate, or migrate.\n\nDisclosure is the act of making information known to the market under a duty (LODR, offer documents, insider lists). It is not the same as publicity or a press leak. Related: disseminate, intimate (to the exchange), notify. Concealment / omission / silence can be the antonym in a rumour-plus-duty paragraph. Surveillance is the market-infrastructure watch: exchanges and SEBI watch orders, prices, and positions for manipulation and for circuit-breaker triggers. Companies do not ‘surveil’ their own board minutes to the exchange; they disclose. Regulators conduct surveillance; they do not usually ‘disclose’ another company’s UPSI.\n\nMateriality is the threshold at which a fact would matter to an investor’s decision or to the price of securities. A material event must be disclosed; an immaterial operational hiccup need not be dressed as a stock-exchange filing. Related: significant, price-sensitive, relevant. Antonyms: trivial, de minimis, cosmetic. In PIT, unpublished price-sensitive information is a cousin of materiality but a distinct legal term — do not write ‘material UPSI’ as if the words were interchangeable in every blank.\n\nOther high-yield items: prudent (cautiously wise; antonym reckless), precursor (forerunner), optional (antonym mandatory / compulsory), deemed (treated as, by law), pursuant to (in accordance with), caveat (warning), redress (remedy a grievance), novation (substitution of a new party — a legal term, not a halt), fungible (interchangeable units). Spell separately, not seperately; occurrence not occurence; privilege not priviledge.",
      bullets: [
        "mitigate risk / harm (not ‘mitigate a statute’); ≠ militate / mediate.",
        "disclosure = duty to tell the market; surveillance = watch trading.",
        "material = decision- or price-relevant; trivial is the foil.",
        "prudent / reckless; optional / mandatory; precursor = forerunner.",
      ],
      examples: [
        {
          title: "Mitigate in a settlement sentence",
          prompt:
            "T+1 was designed to _____ overnight counterparty exposure. (A) migrate (B) mitigate (C) militate (D) meditate. Why each wrong option fails.",
          steps: [
            "The object is exposure (a risk). The verb must mean reduce that risk. mitigate is the fit.",
            "(A) migrate means move location or system. You can migrate software to T+1; you do not migrate exposure in this sentence.",
            "(C) militate (against) means tend to prevent. Grammar would need against, and the sense would be that T+1 works against exposure — possible in loose prose, but not the set collocation, and the option is bare militate.",
            "(D) meditate is think quietly. Comic in a CCP sentence.",
            "Pick (B). In an essay, write ‘mitigate counterparty risk’; do not write ‘mitigate T+1’ (T+1 is the tool, not the harm).",
          ],
          result:
            "(B) mitigate. migrate/militate/meditate are lookalikes with the wrong meaning or the wrong object.",
        },
        {
          title: "Disclosure versus surveillance",
          prompt:
            "Match: (i) a listed company files a Reg. 30 intimation (ii) the exchange’s alert system flags circular trading (iii) SEBI publishes a consultation paper. Words: disclosure, surveillance, neither-quite.",
          steps: [
            "(i) is disclosure / intimation under LODR — the company telling the market a material fact.",
            "(ii) is surveillance — watching the order book for PFUTP-type patterns. Calling it disclosure would mean the manipulator was ‘disclosing’ the fraud, which is nonsense.",
            "(iii) a consultation paper is public communication by the regulator, but it is not LODR disclosure and not market surveillance. In a two-word trap, pick neither; in a vocab item, ‘public consultation’ / ‘seeking comments’.",
            "A filler that says companies must conduct surveillance of material events to the exchange is mixing the two nouns. Replace with disclose.",
            "Write the pair in the margin: issuer → disclosure; exchange/SEBI on trades → surveillance.",
          ],
          result:
            "(i) disclosure (ii) surveillance (iii) public consultation, not LODR disclosure and not trade surveillance.",
        },
        {
          title: "Materiality — why ‘juicy’ fails",
          prompt:
            "Only _____ events need immediate exchange intimation; a broken office kettle is not one. (A) juicy (B) material (C) optional (D) fungible. Antonym in the second clause?",
          steps: [
            "LODR uses material for events that can affect performance or the price of securities. (B) is the legal adjective.",
            "(A) juicy is tabloid register, not a regulation. It fails tone and precision.",
            "(C) optional describes T+0 versus mandatory T+1, not the importance of an event. An optional event is not a LODR category.",
            "(D) fungible describes interchangeable demat units, not events.",
            "The kettle is trivial / immaterial — the antonym limb. Precis habit: keep material and trivial as a pair, not big and small.",
          ],
          result:
            "(B) material. Foil = trivial. juicy/optional/fungible fail register or meaning.",
        },
        {
          title: "Prudent, precursor, optional — three quick keys",
          prompt:
            "(i) Synonym of prudent: reckless / wise and cautious / obsolete / hostile. (ii) In ‘The circular was a precursor to the full T+1 roll-out,’ precursor means? (iii) Antonym of optional in ‘optional T+0’?",
          steps: [
            "prudent = showing care for the future; wise / cautious. Reckless is the antonym, not the synonym. Obsolete = outdated. Hostile = unfriendly. So (i) wise / cautious.",
            "precursor = forerunner / something that comes before and signals what follows. The circular came before full T+1. Not ‘enemy’, not ‘penalty’, not ‘Chairperson’.",
            "optional T+0 ran beside mandatory / compulsory / default T+1. The antonym of optional here is mandatory (or compulsory), not ‘illegal’ and not ‘surveilled’.",
            "Check spelling of separately if a fourth item appears: separately from separate, never seperate.",
            "Write three answers: wise/cautious; forerunner; mandatory/compulsory.",
          ],
          result:
            "(i) wise / cautious (ii) forerunner (iii) mandatory / compulsory (T+1 remained the default cycle).",
        },
      ],
    },
    {
      heading: "Precis habits — cut without changing the author’s point",
      body: "Phase I may not ask a full precis, but the same muscle is used in RC ‘main idea’ items and is compulsory in Phase II Paper 1 (about 30 marks). A precis is a proportional miniature of the original: same stance, same order of ideas, no new examples, no extra adjectives, no ‘I think’. If the passage argues that T+0 should stay optional, your precis may not conclude that T+0 must be mandated. If the passage is cautious, your miniature must stay cautious.\n\nCount the ideas, not the sentences. A typical 200–250-word passage has four to six idea-units (problem, mechanism, risk, policy test, caveat). Your precis should hit each unit in that order, in about one-third of the words, in your own syntax. Do not lift three consecutive original sentences. Do not open with ‘The author says that’ in every line; one framing clause is enough. Drop illustrations, keep the claim the illustration was proving.\n\nGrammar in a precis is ordinary formal English: agreement, parallel lists, the right preposition. Do not introduce new errors while compressing. Numbers that are load-bearing (T+1 from 27 January 2023; optional T+0 from 28 March 2024; 4% inflation target) stay; decorative numbers go. Names stay if the argument depends on them (Buch versus Pandey in a year-stamp paragraph); ornamental name-dropping goes.\n\nTitle the precis with a noun phrase that names the issue, not a slogan. ‘Optional T+0 as an operational beta, not a mandate’ is a title; ‘T+0 is great’ is not. Never add a recommendation the passage did not make. Never ‘correct’ the author’s economics. Your job is fidelity plus brevity.",
      bullets: [
        "Same stance and same idea-order; about one-third the words.",
        "Keep load-bearing dates/names; drop decorative examples.",
        "No new policy punchline; no ‘I think’; no copied sentence-chains.",
        "Title = noun phrase of the issue, not a cheer.",
      ],
      examples: [
        {
          title: "What a precis may not do",
          prompt:
            "Passage stance: optional T+0 should remain a limited beta because custody and funding may not finish by evening. Four student precis openings — which fails, and why?",
          steps: [
            "Opening A: ‘Same-day settlement needs the funds, confirmation and custody legs to finish before evening, so a limited optional beta tests the stack without forcing every scrip onto a new clock.’ This preserves stance and mechanism. Keep.",
            "Opening B: ‘SEBI must make T+0 compulsory for all listed stocks immediately.’ This reverses the author’s caution into a mandate. Fail.",
            "Opening C: ‘T+0 is a commodity-options product on NCDEX.’ This changes the facts. Fail.",
            "Opening D: ‘I feel settlement cycles are boring but T+1 was nice in 2023.’ First person plus a new value judgement. Fail.",
            "The only surviving precis opening is A. B is the classic Phase II trap: writing the essay you wanted instead of the passage you were given.",
          ],
          result:
            "Keep A. B mandates what the passage kept optional; C misidentifies the product; D adds the student.",
        },
        {
          title: "Compress a four-idea paragraph",
          prompt:
            "Original (trimmed): ‘Shortening settlement compresses counterparty exposure. Operational capacity at brokers, custodians and depositories cannot be assumed overnight. That is why a jump from T+2 to T+1 for every scrip on a single day was not the 2022 design. Phased inclusion of stocks was therefore the practical path.’ Write a one-sentence precis and list what you dropped.",
          steps: [
            "Idea 1: shorter cycle → less counterparty time. Idea 2: ops capacity is a constraint. Idea 3: therefore no big-bang 2022 jump. Idea 4: phasing was the method.",
            "One-sentence miniature: ‘Because faster settlement cuts counterparty risk but operations cannot switch overnight, India phased T+1 rather than moving every scrip in a single jump.’",
            "Dropped: the full list brokers/custodians/depositories (kept as ‘operations’); the exact T+2 label can stay because it is load-bearing, or be implied by ‘jump’.",
            "Did not add: dates 27 January 2023, T+0, Buch, or a recommendation to go to T+0. Those are other paragraphs.",
            "Word count of the original is about 55; the miniature is about 30. Proportional, same order, same stance.",
          ],
          result:
            "Phased T+1 because speed cuts counterparty risk but operations cannot flip overnight — no 2022 big-bang. Do not add T+0 or a mandate.",
        },
        {
          title: "Title versus slogan",
          prompt:
            "Choose a precis title: (A) T+0 forever (B) Optional T+0 as a limited operational beta beside T+1 (C) How I would reform NSE (D) Circuit breakers explained.",
          steps: [
            "(A) is a slogan and picks a side the limited-beta passage did not shout. Bad title.",
            "(C) invites an essay the student wanted to write. Bad.",
            "(D) names the wrong topic. Bad.",
            "(B) is a noun-phrase label of the actual issue: optional, limited, operational, beside T+1. That is precis-title form.",
            "If the passage had been about MWCB 10/15/20%, then (D) would fit and (B) would be off-topic. Titles follow the passage, not the rest of your GA notes.",
          ],
          result:
            "(B). Titles are descriptive noun phrases of the author’s issue, not cheers or a different syllabus item.",
        },
        {
          title: "Numbers: keep, drop, or refuse to invent",
          prompt:
            "Passage mentions ‘a limited basket (initially 25 stocks) from 28 March 2024’. Student precis writes ‘T+0 for 250 stocks in 2022 under Chairman Pandey’. List the faults.",
          steps: [
            "25 → 250 is an invented order-of-magnitude. Precis may drop 25 but may not inflate it.",
            "2024 → 2022 back-dates the beta into the T+1 phasing year. Load-bearing date was changed, not compressed.",
            "Pandey as 2022 Chair is a GA error (Buch was Chair from March 2022; Pandey from March 2025) and was not in the passage anyway. Do not import GK to sound informed.",
            "A faithful compression: ‘In March 2024 exchanges began a limited optional T+0 basket beside T+1.’ The 25 can stay if space allows.",
            "Rule: drop decorative figures; keep figures that change the claim; never replace a figure with a guess; never add a Chair the passage did not name.",
          ],
          result:
            "Faults: 250 for 25, 2022 for 2024, Pandey imported and back-dated. Faithful: limited optional T+0 from March 2024 beside T+1.",
        },
      ],
    },
    {
      heading: "Reading comprehension — fact, inference, and tone",
      body: "RC questions in Paper 1 are shorter than CAT passages but they use the same three labels. A fact question is answered by a sentence you can point to: a date, a name, a definition, a stated cause. If the passage says ‘T+1 became the market-wide cash-equity cycle from 27 January 2023’, a fact item can ask when, and the answer is that date — not 2020, not 28 March 2024 (that is T+0).\n\nAn inference is a conclusion that must follow from the passage but is not printed as a ready sentence. It must be narrower than a world-knowledge essay. From ‘optional T+0 began as a limited beta because the operational stack is heavier than T+1’ you may infer that the author does not treat T+0 as already safe for every scrip. You may not infer that the author wants T+0 abolished, or that NCDEX is involved, or that SEBI will mandate T+0 next month. If you cannot point to the supporting lines plus a small logical step, it is not an inference; it is a guess.\n\nTone is the author’s attitude: cautious, critical, approving, diagnostic, ironic. Official-economic prose is usually analytical / cautionary, not sarcastic. A single adjective in the last sentence (‘the useful questions are older than Unity’) can mark a dry, non-alarmist tone. Do not pick ‘indignant’ unless there is moral heat; do not pick ‘celebratory’ because a reform is mentioned; mentioning T+1 is not a cheer for T+1.\n\nMain-idea items are precis in MCQ form: the option that covers the whole argument without a new policy. Extreme options (always, only, never, must) are usually wrong unless the passage was that absolute. Vocab-in-context items ask what the word means here, not its rarest dictionary sense. Precursor in a T+1 sentence is forerunner, not ‘chemical starter’.",
      bullets: [
        "Fact = point to a line. Inference = one necessary step, no extra GK.",
        "Tone = attitude (cautious/analytical vs indignant/celebratory).",
        "Main idea = whole argument, not a detail and not your reform plan.",
        "Extreme wording is a red flag; vocab = meaning in this sentence.",
      ],
      examples: [
        {
          title: "Fact versus inference on settlement",
          prompt:
            "Passage: ‘T+1 has been the default cash-equity cycle since 27 January 2023. Optional T+0 continued as a limited additional path, not as a replacement of T+1.’ Q1 (fact): default cycle? Q2 (inference): does the author treat T+0 as already universal?",
          steps: [
            "Q1 is a fact lookup. The printed default is T+1 from 27 January 2023. Not T+5, not compulsory T+0.",
            "Q2 cannot be answered by a single quoted phrase ‘T+0 is not universal’, but ‘limited additional path, not a replacement’ forces the inference that T+0 is not treated as market-wide compulsory.",
            "A false inference would be ‘the author wants T+0 repealed’ — the passage did not say that.",
            "A false fact option would be ‘T+1 restored after 2023 to T+2’ — contradicts the printed since 27 January 2023.",
            "Label answers: Q1 fact = T+1 default from 27 Jan 2023. Q2 inference = T+0 is not universal/mandatory. Not a licence to add 2025 Chairperson trivia.",
          ],
          result:
            "Fact: default T+1 since 27 Jan 2023. Inference: T+0 is an extra limited path, not a full replacement. No repeal inference.",
        },
        {
          title: "Tone — analytical, not indignant",
          prompt:
            "Closing lines: ‘The useful questions are older than Unity: is the price clear, is the chance of a prize disclosed, can a child spend without a parent?’ Tone: (A) celebratory (B) indignant polemic (C) dry diagnostic / cautionary (D) comic parody of SEBI.",
          steps: [
            "The author lists old consumer-protection questions in calm syntax. That is diagnostic: naming tests, not shouting.",
            "(A) celebratory would praise games or loot boxes. The close is a list of risks, not a cheer.",
            "(B) indignant polemic would use moral heat, insult, or ‘must be banned’. The phrase ‘useful questions’ is cool, not furious.",
            "(D) parody would mock the regulator’s voice. Using Unity as a timestamp is a wry comparison, not a sketch-comedy turn. Slight dryness ≠ parody.",
            "Pick (C). If a later question asks inference, you may say the author rejects both ‘cardboard boxes on a shelf’ and ‘every randomised reward is a casino’ — those were printed contrasts, not tone labels.",
          ],
          result:
            "(C) dry diagnostic / cautionary. Not a celebration, not a rant, not a parody.",
        },
        {
          title: "Main idea versus a true detail",
          prompt:
            "Passage argues: rumours move faster than verified disclosure; instant forced denials risk inaccuracy; slow circulars let prices move on lies; a middle path is a short duty to confirm or deny material specific rumours. Options: (A) Prices never move on rumours (B) The live policy problem is the timing and truth of issuer speech, not a slogan about social media (C) T+0 abolished rumours (D) Madhabi Puri Buch invented SCORES in 2025.",
          steps: [
            "(A) contradicts any passage that says prices move on lies while companies stay silent. False detail / opposite.",
            "(C) imports settlement-cycle GA that the rumour passage did not use. True-or-false in the world is irrelevant; it is not the main idea.",
            "(D) is year-mixed GK (Buch’s term ended Feb 2025; SCORES is older grievance plumbing). Not in the passage. Kill.",
            "(B) restates the whole arc: speed versus accuracy, and a middle duty, without a new gadget. That is main-idea shape.",
            "A detail option that merely repeats ‘authenticated channels help’ would be true but too narrow for main idea. Prefer the option that covers silence, speed, and the proposed middle path.",
          ],
          result:
            "(B) is the main idea. (A) contradicts; (C) and (D) are off-passage (and (D) also mangled facts).",
        },
        {
          title: "Inference that does not follow",
          prompt:
            "Premises in passage: ‘All markets are regulated’ is not given. Actual: ‘Algorithmic trading is not one activity: impact-minimising execution differs from deceptive flicker quotes.’ Which inference follows? (A) Every algo is spoofing (B) Policy should distinguish purpose, not punish speed as such (C) Spoofing is legal in T+1 markets (D) SEBI has banned all algos.",
          steps: [
            "The printed distinction is between execution algos and deceptive flicker quotes. From that, a fair inference is that a single ban on ‘algorithms’ would over- and under-hit. (B) tracks that.",
            "(A) erases the distinction the passage just drew. Does not follow.",
            "(C) is a legal claim the passage did not make; T+1 is not a spoofing licence. Does not follow. (Also false as GA: spoofing-type conduct is PFUTP territory.)",
            "(D) is an extreme factual claim, not in the passage. Does not follow.",
            "Choose (B). Mark (A)(C)(D) as ‘extra or opposite’. This is the same discipline as syllogism: do not assume overlap the author refused to assume.",
          ],
          result:
            "(B) follows. (A) and (D) smash the distinction; (C) adds a false legal slogan.",
        },
      ],
    },
  ],
};
