import type { TopicNote } from "@/data/notes";

export const notesEnglish: TopicNote = {
  topic: "english",
  title: "English — techniques (beginner)",
  blurb:
    "Seven simple techniques for exam English. Match the verb to the real subject. Pick a, an, or the. Find the one error. Fill a blank in a money sentence. Put jumbled sentences in order. In a passage, split fact, inference, and tone. For a precis, cut extra stories, keep the numbers, keep the main claim.",
  blocks: [
    {
      heading: "Subject–verb agreement",
      body: "The verb must match the real subject, not the nearest noun. A phrase in the middle does not steal the number. In ‘The quality of the reports is poor’, the head word is quality (one thing), so the verb is is, not are.\n\nIgnore tails like along with, together with, as well as, and besides. ‘The Chairperson, along with the members, has signed’ — Chairperson is still one person, so has is right.\n\nWords like each, every, everyone, neither, and either take a singular verb in this exam. ‘Neither of the reports is complete.’ When two names are joined by or or nor, the verb follows the nearer name: ‘Neither the trustees nor the AMC has’ but ‘Neither the AMC nor the trustees have’.\n\nA number of means many, so the verb is plural. The number of is one figure, so the verb is singular.",
      howTo: [
        "Underline the real subject. Cross out of-phrases and along-with tails.",
        "Ask: is that head word one thing or many?",
        "Match the verb: one → is/has/was; many → are/have/were.",
        "If you see or / nor, match the verb to the name closest to it.",
        "Check the pair a number of (plural) versus the number of (singular).",
      ],
      bullets: [
        "The verb agrees with the head, not the nearest noun.",
        "along with / together with / as well as do not make a plural subject.",
        "neither / either / each are singular here.",
        "a number of = plural; the number of = singular.",
      ],
      examples: [
        {
          title: "Neither of + plural noun",
          prompt:
            "Find the error: ‘Neither of the reports are complete.’ (A) No error (B) Change are to is (C) Change reports to report (D) Change complete to completed.",
          steps: [
            {
              do: "Find the real subject. It is Neither, not reports.",
              why: "of the reports is only a phrase that names the group. The head word is still neither, which is one.",
            },
            {
              do: "Check the verb. are is a plural verb.",
              why: "A singular head cannot take are. That mismatch is the error.",
            },
            {
              do: "Test (C). Keep reports plural after of.",
              why: "You pick from a group, so the noun after of stays plural. Changing it to report is wrong.",
            },
            {
              do: "Test (D). Keep complete as an adjective.",
              why: "complete describes the reports. completed would need a different grammar, like has been completed.",
            },
            {
              do: "Pick (B): Neither of the reports is complete.",
              why: "Fix the verb only. The rest of the sentence is already fine.",
            },
          ],
          result:
            "(B) Neither of the reports is complete. Neither is singular; reports stays plural.",
        },
        {
          title: "Along with does not make a plural",
          prompt:
            "Pick the correct sentence. (A) The Chairperson, along with the members, have signed the order. (B) The Chairperson, along with the members, has signed the order. (C) The Chairperson along with the members have signed the order.",
          steps: [
            {
              do: "Name the head: Chairperson.",
              why: "along with the members is extra information. It is not a second subject joined by and.",
            },
            {
              do: "Drop (A) and (C) because they use have.",
              why: "have is plural. The head is one person, so the verb must be has.",
            },
            {
              do: "Keep (B): …has signed the order.",
              why: "has matches Chairperson. The commas around along with also mark it as extra, not a compound subject.",
            },
          ],
          result:
            "(B) The Chairperson, along with the members, has signed the order.",
        },
        {
          title: "A number of versus the number of",
          prompt:
            "Fill both verbs: ‘A number of funds ___ filed; the number of funds ___ risen.’ (A) has, have (B) have, has (C) have, have (D) has, has.",
          steps: [
            {
              do: "Read a number of funds as many funds.",
              why: "In exam English, a number of + plural noun takes a plural verb. So the first blank is have.",
            },
            {
              do: "Read the number of funds as one figure.",
              why: "the number is a single count, so the second blank is has.",
            },
            {
              do: "Pick (B). Reject the others.",
              why: "(A) swaps both. (C) makes the number plural. (D) makes a number singular.",
            },
          ],
          result:
            "(B) A number of funds have filed; the number of funds has risen.",
        },
        {
          title: "or / nor follows the nearer name",
          prompt:
            "Pick the correct pair. (A) Neither the trustees nor the AMC have filed; neither the AMC nor the trustees has filed. (B) Neither the trustees nor the AMC has filed; neither the AMC nor the trustees have filed. (C) Neither the trustees nor the AMC have filed; neither the AMC nor the trustees have filed.",
          steps: [
            {
              do: "Find or / nor. The verb must match the name closest to it.",
              why: "When two names are joined by or or nor, the nearer name wins. Do not add the two names together.",
            },
            {
              do: "First clause: … nor the AMC. AMC is one body.",
              why: "The nearer name is singular, so the verb is has, not have.",
            },
            {
              do: "Second clause: … nor the trustees. trustees is plural.",
              why: "The nearer name is many people, so the verb is have, not has.",
            },
            {
              do: "Drop (A). It swaps both verbs.",
              why: "have next to AMC and has next to trustees is the opposite of the nearer-name rule.",
            },
            {
              do: "Drop (C). It uses have in both slots.",
              why: "have next to AMC treats one AMC as many.",
            },
            {
              do: "Pick (B).",
              why: "has matches AMC; have matches trustees. That is the exam pair.",
            },
          ],
          result:
            "(B) nor the AMC has; nor the trustees have. Match the name next to the verb.",
        },
        {
          title: "each is singular; ignore the of-phrase",
          prompt:
            "Find the errors: (i) ‘Each of the circulars have been filed.’ (ii) ‘The quality of the reports are poor.’ Fixes: (A) have → has; are → is (B) circulars → circular; reports → report (C) No error in either.",
          steps: [
            {
              do: "In (i), underline Each. Cross out of the circulars.",
              why: "Each is the head. The of-phrase only names the group. each takes a singular verb in this exam.",
            },
            {
              do: "Change have to has in (i).",
              why: "has matches Each. Keep circulars plural after of — you pick from a group.",
            },
            {
              do: "In (ii), underline quality. Cross out of the reports.",
              why: "quality is one thing. reports is only the tail. The nearest noun must not steal the verb.",
            },
            {
              do: "Change are to is in (ii).",
              why: "is matches quality. Do not make reports the subject.",
            },
            {
              do: "Reject (B).",
              why: "Changing the nouns after of is the wrong fix. The nouns stay plural; the verbs change.",
            },
            {
              do: "Pick (A).",
              why: "Both sentences needed a singular verb for a singular head.",
            },
          ],
          result:
            "(A) Each of the circulars has been filed. The quality of the reports is poor.",
        },
      ],
    },
    {
      heading: "Articles — a, an, the",
      body: "Use a or an for one non-unique countable thing. Use a before a consonant sound (a circular, a union, a SEBI report). Use an before a vowel sound (an order, an hour, an IPO). The letter that starts the word is not the test — the sound is. hour starts with a vowel sound, so an hour. union starts with a ‘y’ sound, so a union.\n\nUse the when the listener can tell which one you mean: a unique thing (the SEBI Act), something already named, or the only one in that context (the Chairperson of SEBI).\n\nUse no article for a general plural or a general mass noun: Investors need disclosure. Information is power. Do not write the investors when you mean investors in general.\n\nA unique law takes the, not a: the SEBI Act, 1992 — not a SEBI Act.",
      howTo: [
        "Ask: is this one countable thing, a unique named thing, or a general group?",
        "One new countable thing → a or an. Unique or already known → the. General plural/mass → no article.",
        "For a / an, say the next word out loud. Consonant sound → a. Vowel sound → an.",
        "Laws, offices, and ‘the only one’ almost always take the.",
        "Read the full sentence. Do not pick an article that fights the meaning.",
      ],
      bullets: [
        "a / an = one, not unique. the = this one, unique or already named.",
        "Sound, not spelling: an hour, a union, an IPO.",
        "the SEBI Act (unique law). investors with no article (people in general).",
      ],
      examples: [
        {
          title: "A unique law needs the",
          prompt:
            "Spot the article error: ‘A SEBI Act requires the investors to read a prospectus.’ (A) A SEBI Act (B) requires (C) the investors (D) a prospectus.",
          steps: [
            {
              do: "Look at A SEBI Act. There is only one such statute.",
              why: "A unique law takes the, not a. So (A) is the designed error.",
            },
            {
              do: "Check the investors. The sentence means investors in general.",
              why: "A general plural takes no article: requires investors. This can be a second weak spot, but the first slot is the clear error.",
            },
            {
              do: "Keep a prospectus. It is one countable document, not yet unique.",
              why: "The reader does not know which prospectus yet, so a is right.",
            },
            {
              do: "Write the fix: The SEBI Act requires investors to read a prospectus.",
              why: "the for the unique Act; zero article for generic investors; a for one prospectus.",
            },
          ],
          result:
            "Error in (A): say the SEBI Act, not a SEBI Act. Generic investors need no the.",
        },
        {
          title: "A versus an — listen to the sound",
          prompt:
            "Fill the blanks: ‘SEBI issued ___ order after ___ hour of debate on ___ union of two schemes.’ (A) a, a, an (B) an, an, a (C) an, a, a (D) a, an, an.",
          steps: [
            {
              do: "Say order. It starts with a vowel sound (or-).",
              why: "Vowel sound → an order.",
            },
            {
              do: "Say hour. The h is silent.",
              why: "You hear our, a vowel sound → an hour, not a hour.",
            },
            {
              do: "Say union. It starts with a ‘y’ sound (you-nion).",
              why: "Consonant sound → a union, even though the letter is u.",
            },
            {
              do: "Pick (B): an order, an hour, a union.",
              why: "The test is sound, not the first letter on the page.",
            },
          ],
          result: "(B) an order; an hour; a union.",
        },
        {
          title: "The for a named office, zero for a mass noun",
          prompt:
            "Choose: (A) Chairperson issued information to public. (B) The Chairperson issued the information to the public. (C) The Chairperson issued information to the public. (D) A Chairperson issued an information to public.",
          steps: [
            {
              do: "The sentence means SEBI’s Chairperson, a unique office here.",
              why: "That office takes the. Bare Chairperson in (A) is too bald for this exam style.",
            },
            {
              do: "information is a mass noun. You do not say an information.",
              why: "(D) is wrong for that reason. information usually takes no article when it means news in general.",
            },
            {
              do: "the public is a set phrase for people as a group.",
              why: "Exam English prefers the public, not public alone, in this slot.",
            },
            {
              do: "Prefer (C) over (B).",
              why: "(B) makes the information sound like one already-known packet. (C) keeps information general and still names the office and the public.",
            },
          ],
          result:
            "(C) The Chairperson issued information to the public. Unique office → the; mass noun → no article.",
        },
        {
          title: "an IPO, a SEBI report — say the letters",
          prompt:
            "Fill the blanks: ‘___ IPO follows ___ SEBI circular and ___ RBI note on ___ hour’s delay.’ (A) A, an, a, a (B) An, a, an, an (C) An, an, a, an (D) A, a, an, a.",
          steps: [
            {
              do: "Say IPO out loud: eye-pee-oh.",
              why: "The first sound is a vowel (eye). Vowel sound → an IPO.",
            },
            {
              do: "Say SEBI: seb-ee. It starts with an s sound.",
              why: "Consonant sound → a SEBI circular, even though other S-words can begin with ‘ess’.",
            },
            {
              do: "Say RBI: are-bee-eye.",
              why: "The first sound is a vowel (are). Vowel sound → an RBI note.",
            },
            {
              do: "Say hour. The h is silent.",
              why: "You hear our → an hour, so an hour’s delay.",
            },
            {
              do: "Drop (A) and (D) because they start with A IPO.",
              why: "A before a vowel sound is the classic trap.",
            },
            {
              do: "Drop (C) because it writes an SEBI. Pick (B).",
              why: "SEBI does not start with a vowel sound. The test is sound, not the first letter on the page.",
            },
          ],
          result:
            "(B) an IPO; a SEBI circular; an RBI note; an hour’s delay. Sound, not the first letter.",
        },
        {
          title: "Zero article for people in general",
          prompt:
            "Choose: (A) The investors need the disclosure before they buy. (B) Investors need disclosure before they buy. (C) An investors need a disclosure before they buy. (D) Investors need an information before they buy.",
          steps: [
            {
              do: "Ask whether the sentence means all investors, or a named group already in the story.",
              why: "A general group takes no article. A unique or already-named group takes the.",
            },
            {
              do: "Here it means investors as a class, and disclosure as the idea of telling facts.",
              why: "So both nouns stay bare: Investors need disclosure.",
            },
            {
              do: "Drop (A) because the investors and the disclosure sound like one known packet.",
              why: "the is for ‘this set’ or a unique office, not a general rule.",
            },
            {
              do: "Drop (C). An investors mixes a singular article with a plural noun.",
              why: "an cannot sit before a plural.",
            },
            {
              do: "Drop (D). information is a mass noun.",
              why: "You do not write an information. You write information or a piece of information.",
            },
            {
              do: "Pick (B).",
              why: "General plural and general mass noun both take zero article.",
            },
          ],
          result:
            "(B) Investors need disclosure before they buy. General people and a mass idea take no article.",
        },
      ],
    },
    {
      heading: "Error spotting — find the one error",
      body: "These items hide one fault, not three. Read the sentence once for sense, once for agreement, once for articles, once for a wrong small word (preposition), and once for a broken list.\n\nCommon small-word traps: comply with a rule (not comply to); issued to the people who must follow it; issued by the author; issued under a law; issued for a purpose; prohibit someone from doing; eligible for; consist of.\n\nLists must keep the same shape. After shall you want three verbs: protect, promote, and regulate — not protect, promoting, and regulation. After not only … but also, keep two verbs or two nouns, not a mix.\n\nIf a part looks fine, it may be the ‘no error’ option — but that is rarer than students hope. When two faults exist, the paper usually underlines one slot. Fix that slot.",
      howTo: [
        "Read the whole sentence. Do not stop at the first odd word.",
        "Check the verb against the real subject.",
        "Check a / an / the.",
        "Check small words: with, to, by, under, from, for.",
        "Check lists and not only … but also for the same grammar shape.",
        "Pick the one underlined fault. Do not rewrite the whole sentence unless asked.",
      ],
      bullets: [
        "One error is the game. Do not hunt for a second unless two parts are marked.",
        "comply with; issued to / by / under / for; prohibit from.",
        "A list after and must stay parallel: three verbs, or three nouns, not a mix.",
      ],
      examples: [
        {
          title: "Wrong small word: comply to",
          prompt:
            "Spot the error: ‘The broker must comply to the code and file returns on time.’ (A) must (B) comply to (C) the code (D) file returns on time.",
          steps: [
            {
              do: "Look at comply to.",
              why: "The set phrase is comply with a rule. comply to is the error.",
            },
            {
              do: "Keep must, the code, and file returns.",
              why: "The rest is ordinary formal English. The paper wants the one bad preposition.",
            },
            {
              do: "Write the fix: comply with the code.",
              why: "with names the rule you follow. to would name a person you go toward, which is the wrong idea.",
            },
          ],
          result: "Error in (B): comply with, not comply to.",
        },
        {
          title: "A broken list after shall",
          prompt:
            "Which sentence is parallel? (A) SEBI shall protect investors, promoting markets, and regulation of intermediaries. (B) SEBI shall protect investors, promote markets, and regulate intermediaries. (C) SEBI shall protect investors, to promote markets, and regulating intermediaries.",
          steps: [
            {
              do: "After shall, look for the same verb shape three times.",
              why: "shall is shared. The list should be protect / promote / regulate — three base verbs.",
            },
            {
              do: "Drop (A): promoting and regulation break the chain.",
              why: "One verb, then an -ing word, then a noun is not a matching list.",
            },
            {
              do: "Drop (C): to promote and regulating do not match protect.",
              why: "You cannot mix a bare verb, a to-verb, and an -ing word in one shall-list.",
            },
            {
              do: "Keep (B).",
              why: "Three verbs share shall. That is the parallel form.",
            },
          ],
          result: "(B) protect, promote, and regulate — three verbs sharing shall.",
        },
        {
          title: "Issued to the recipients",
          prompt:
            "Fill in: ‘The circular was issued ___ all registered brokers.’ (A) for (B) to (C) at (D) by.",
          steps: [
            {
              do: "Ask what the blank names. It names the people who receive the circular.",
              why: "Recipients take issued to.",
            },
            {
              do: "Reject for, at, and by in this slot.",
              why: "for is a purpose (issued for comments). at is a place or time. by is the author (issued by SEBI).",
            },
            {
              do: "Pick (B) to.",
              why: "Memory line: issued by SEBI to brokers under the Act for compliance.",
            },
          ],
          result:
            "(B) to. Recipients take to; author takes by; law takes under; purpose takes for.",
        },
        {
          title: "prohibit from, not prohibit to",
          prompt:
            "Spot the error: ‘SEBI shall prohibit connected persons to trade while they hold unpublished results.’ (A) shall prohibit (B) connected persons to trade (C) while they hold (D) unpublished results.",
          steps: [
            {
              do: "Look at prohibit … to trade.",
              why: "The set phrase is prohibit someone from doing. prohibit to trade is the error.",
            },
            {
              do: "Keep shall prohibit as the verb idea.",
              why: "shall plus prohibit is fine. The fault is the small word after the people.",
            },
            {
              do: "Keep while they hold as ordinary English.",
              why: "The time clause is not the designed error.",
            },
            {
              do: "Keep unpublished results as sense, not grammar.",
              why: "The idea is UPSI in GA. This item wants the preposition, not a new noun.",
            },
            {
              do: "Write the fix: prohibit connected persons from trading.",
              why: "from + -ing is the shape after prohibit. to would name a purpose, which is the wrong idea.",
            },
            {
              do: "Remember a cousin pair: eligible for a licence, not eligible of.",
              why: "Another small-word trap in the same family. Do not mix it into this underlined slot.",
            },
          ],
          result: "Error in (B): prohibit from trading, not prohibit to trade.",
        },
        {
          title: "not only … but also must stay parallel",
          prompt:
            "Pick the parallel sentence. (A) The circular not only requires disclosure but also filing on time. (B) The circular requires not only disclosure but also a timely filing. (C) The circular not only requires disclosure but also to file on time.",
          steps: [
            {
              do: "Underline not only and but also. Check that the two halves have the same grammar shape.",
              why: "The pair must join two verbs, or two nouns, not a noun and a to-verb.",
            },
            {
              do: "In (A), not only sits before requires (a verb) but but also sits before filing (a noun).",
              why: "Verb then noun is a broken pair.",
            },
            {
              do: "In (C), disclosure is a noun and to file is a to-verb.",
              why: "That mix is the same trap as a broken list after shall.",
            },
            {
              do: "In (B), not only disclosure … but also a timely filing.",
              why: "Two noun phrases share requires. That is a matching pair.",
            },
            {
              do: "A second good shape would be requires not only to disclose but also to file.",
              why: "Two to-verbs would also match. That option is not on this list.",
            },
            {
              do: "Pick (B).",
              why: "Same shape on both sides of but also.",
            },
          ],
          result:
            "(B) not only disclosure but also a timely filing — two nouns after requires.",
        },
      ],
    },
    {
      heading: "Fillers and vocabulary in a financial sentence",
      body: "A blank in a money or market sentence is three tests in one. First the grammar must fit on both sides. Then the meaning must fit. Then the word must sound official, not slang.\n\naims to prohibit is fine. aims at prohibit is not (you need aims at prohibiting, or aims to prohibit). disclose material events is the official pair. hide trivial events is both illegal and the wrong tone.\n\nUseful words: mitigate means reduce a risk (mitigate counterparty risk). disclosure means telling the market a fact you must tell. surveillance means watching trades for tricks. material means important enough to move a decision or a price. prudent means carefully wise.\n\nConnectors: although + a full clause; despite + a noun; however often starts a new sentence; because shows cause, not contrast.",
      howTo: [
        "Read the whole sentence before you open the options.",
        "Kill any option that breaks grammar, even if the fact sounds true.",
        "Then pick the word that matches the meaning (risk, disclosure, watch, contrast).",
        "Prefer dry official words: disclose, material, mitigate — not juicy, hide, fix up.",
        "For two blanks, solve the easier blank first.",
      ],
      bullets: [
        "Grammar first, meaning second, official tone third.",
        "mitigate a risk; disclose a material event; surveillance watches trades.",
        "although + clause; despite + noun; however is not a clause-linker in the middle of one sentence.",
      ],
      examples: [
        {
          title: "Grammar beats a true market fact",
          prompt:
            "The Board aims ___ insider trading in listed shares. (A) at prohibit (B) to prohibit (C) prohibiting to (D) for prohibit.",
          steps: [
            {
              do: "Look at what can follow aims.",
              why: "aims to + verb (aims to prohibit) is standard. aims at + -ing (aims at prohibiting) is also standard. The options must match one of those shapes.",
            },
            {
              do: "Drop (A) at prohibit and (D) for prohibit.",
              why: "at needs prohibiting, not prohibit. for prohibit is not English.",
            },
            {
              do: "Drop (C) prohibiting to.",
              why: "The extra to after the -ing word leaves the sentence unfinished.",
            },
            {
              do: "Pick (B) to prohibit.",
              why: "The idea ‘SEBI stops insider trading’ is true, but a true fact cannot save bad grammar in (A).",
            },
          ],
          result: "(B) to prohibit. A true GA fact does not fix a broken verb.",
        },
        {
          title: "Disclose material events",
          prompt:
            "Listed companies must ___ all ___ events to the stock exchanges without delay. (A) hide, trivial (B) disclose, material (C) mitigate, festive (D) surveil, edible.",
          steps: [
            {
              do: "Blank 1 is what a company does toward the exchange.",
              why: "The duty is to tell the market. That verb is disclose, not hide or surveil.",
            },
            {
              do: "Blank 2 is the kind of event that must be told.",
              why: "Official English uses material — important to price or to an investor’s choice.",
            },
            {
              do: "Kill (A), (C), and (D).",
              why: "hide trivial is the opposite. mitigate festive mixes a risk-verb with a party word. surveil edible is nonsense.",
            },
            {
              do: "Pick (B).",
              why: "disclose material events is the set pair. Surveillance is what exchanges do to trades, not what companies file.",
            },
          ],
          result:
            "(B) disclose, material. Companies disclose; exchanges watch (surveillance).",
        },
        {
          title: "Mitigate the risk, not a lookalike",
          prompt:
            "T+1 was designed to ___ overnight counterparty exposure. (A) migrate (B) mitigate (C) militate (D) meditate.",
          steps: [
            {
              do: "Name the object: exposure, which is a risk.",
              why: "You need a verb that means reduce that risk.",
            },
            {
              do: "mitigate means reduce the harm of something you may not fully remove.",
              why: "That matches overnight counterparty exposure. Pick (B).",
            },
            {
              do: "Reject migrate, militate, and meditate.",
              why: "migrate = move home or system. militate (against) = work against, and it wants against. meditate = think quietly. All three are lookalikes with the wrong job.",
            },
          ],
          result:
            "(B) mitigate. You mitigate a risk. You do not mitigate a Chairperson or a circular.",
        },
        {
          title: "although + clause; despite + noun",
          prompt:
            "Fill both blanks: ‘___ the Board warned early, brokers delayed the upgrade. ___ that delay, T+1 still went live in phases.’ (A) Although, Despite (B) Despite, Although (C) However, Although (D) Although, However.",
          steps: [
            {
              do: "Look at blank 1. It sits before a full clause: the Board warned early.",
              why: "although takes a clause. despite would need a noun, as in despite the warning.",
            },
            {
              do: "Look at blank 2. It sits before a noun phrase: that delay.",
              why: "despite takes a noun. although that delay is missing a verb.",
            },
            {
              do: "Drop (B). It swaps the two connectors.",
              why: "Despite the Board warned is not English. Although that delay is not a full clause.",
            },
            {
              do: "Drop (C). However the Board warned tries to join two clauses with however.",
              why: "however usually starts a new sentence. It is not although.",
            },
            {
              do: "Drop (D). However that delay is the same noun-after-however fault.",
              why: "You would need a full stop: Brokers delayed. However, T+1 still went live.",
            },
            {
              do: "Pick (A).",
              why: "although + clause; despite + noun. That is the connector pair to memorise.",
            },
          ],
          result:
            "(A) Although the Board warned early … Despite that delay …. however is not a mid-clause linker.",
        },
        {
          title: "surveillance watches trades; prudent is carefully wise",
          prompt:
            "Stock exchanges keep the order book under ___. A ___ intermediary still discloses a material rumour. (A) disclosure, festive (B) surveillance, prudent (C) novation, edible (D) repo, comic.",
          steps: [
            {
              do: "Blank 1 is what exchanges do to the order book.",
              why: "Watching trades for tricks is surveillance, not disclosure (companies file) and not novation (the CCP stands in the middle).",
            },
            {
              do: "Blank 2 describes the intermediary who still tells the market.",
              why: "prudent means carefully wise. That matches a rule-following intermediary, not a party word.",
            },
            {
              do: "Kill (A). festive is not official English, and disclosure is the company’s job.",
              why: "Exchanges watch; companies disclose. Do not swap the verbs.",
            },
            {
              do: "Kill (C) and (D) as nonsense tone.",
              why: "edible and comic are not market words. repo is an RBI tool, not an order-book watch.",
            },
            {
              do: "Pick (B).",
              why: "Both blanks fit: surveillance on the book; a prudent intermediary discloses.",
            },
            {
              do: "Remember material from the earlier pair: the rumour must be important enough to matter.",
              why: "Official tone wants disclose / material / surveillance / prudent, not hide / juicy / fix up.",
            },
          ],
          result:
            "(B) surveillance, prudent. Exchanges watch the book; prudent means carefully wise.",
        },
      ],
    },
    {
      heading: "Para jumbles — opener, then pair, then closer",
      body: "Do not try all 24 orders. Use three tests.\n\nFirst find the opener. It names the topic. It does not start with this, these, such, that, therefore, hence, or however (those words look backward). A definition or a plain problem sentence is a good start.\n\nSecond find a mandatory pair. Two sentences must sit together because of a pronoun (that stack), a repeated noun with the, or a cause word (that is why). If B names shortening settlement and C says that operational stack, C cannot come before B.\n\nThird find the closer. therefore, hence, thus, or a practical path (so they phased the change) usually ends the paragraph.\n\nThen drop leftover sentences into the holes. Read the full order once. If a pronoun has no home, the order is wrong. A true market fact can still sit in the wrong slot.",
      howTo: [
        "Find the opener: no this / therefore / hence / however to an unseen claim.",
        "Find a pair: a pointing word (that, such, this) must follow the sentence it points to.",
        "Find the closer: therefore / hence / the practical path.",
        "Place leftovers in the remaining holes.",
        "Read the paragraph aloud. Kill any order that strands a pronoun.",
      ],
      bullets: [
        "Opener names the topic and looks forward, not back.",
        "Pair = pronoun or that is why glued to the line it needs.",
        "Closer = therefore / hence / the method they chose.",
      ],
      examples: [
        {
          title: "Four sentences on T+1",
          prompt:
            "Arrange: A. Phased inclusion of stocks was therefore the practical path. B. Shortening settlement cuts counterparty risk. C. Operational capacity at brokers and custodians cannot be assumed overnight. D. That is why a jump from T+2 to T+1 for every stock on one day was not the 2022 design.",
          steps: [
            {
              do: "Find the opener. Pick B.",
              why: "A has therefore (result). D has That is why (needs a cause). C is a limit, usually after the idea it limits. B names the topic with no backward word.",
            },
            {
              do: "Pair B with C, then glue D on.",
              why: "B names shortening settlement. C says operations cannot switch overnight. D’s That is why points at that tension.",
            },
            {
              do: "Put A last.",
              why: "therefore names the practical path after D has rejected the one-day jump.",
            },
            {
              do: "Read B–C–D–A as a paragraph.",
              why: "Idea, cost, ‘that is why’, then the method. No stranded pronoun.",
            },
          ],
          result: "B–C–D–A. Opener B; pair B–C then C–D; closer A.",
        },
        {
          title: "Which sentence comes first?",
          prompt:
            "A. A limited test therefore checks operations without forcing the whole market onto a new clock. B. Same-day settlement needs funding, confirmation and custody to finish before evening. C. That operational stack is heavier than T+1. D. Hence T+0 began as an optional, narrow basket. Which is first?",
          steps: [
            {
              do: "Cross out A and D as openers.",
              why: "therefore and Hence mark results. Results are not first.",
            },
            {
              do: "Cross out C as opener.",
              why: "That operational stack needs a stack already named.",
            },
            {
              do: "Pick B as first.",
              why: "B names same-day settlement and the jobs that must finish. Nothing in B looks backward.",
            },
            {
              do: "Note the pair B–C even if the question only asks the first line.",
              why: "C’s That points at B’s list. A true fact in A does not make A first.",
            },
          ],
          result: "B is the opener. A and D close; C’s That follows B.",
        },
        {
          title: "Pronoun pair in a disclosure jumble",
          prompt:
            "A. Such silence can itself mislead investors. B. Listed companies sometimes delay an exchange filing while they check a rumour. C. The listing rules, however, expect timely disclosure of material events. D. Checking is necessary, but it is not a licence to wait until the price has already moved. Find opener, pair, closer.",
          steps: [
            {
              do: "Pick B as opener.",
              why: "A’s Such silence needs a delay already named. C’s however needs a claim to push against. D’s it needs checking already on the table. B introduces the delay with no backward word.",
            },
            {
              do: "Pair B with D.",
              why: "B names delay-while-checking. D comments on that checking. D cannot start the paragraph.",
            },
            {
              do: "Put A last. Park C in the middle.",
              why: "Such silence packs B’s delay into a result, so A closes. however is a mid-paragraph contrast, never first.",
            },
          ],
          result:
            "Opener B; pair B–D; closer A. A good full order is B–D–C–A.",
        },
        {
          title: "Four sentences on UPSI",
          prompt:
            "Arrange: A. Hence a private chat is still communication, not a safe harbour. B. Unpublished price-sensitive information can move a share price if it leaks. C. That is why PIT allows sharing only for a real work or legal need, with records. D. An oral promise not to trade does not make a leak safe.",
          steps: [
            {
              do: "Find the opener. Pick B.",
              why: "A has Hence (result). C has That is why (needs a cause). D is a later warning about a promise. B names UPSI with no backward word.",
            },
            {
              do: "Pair B with C.",
              why: "C’s That is why points at B’s idea that a leak can move the price.",
            },
            {
              do: "Place D after C.",
              why: "D comments on a false defence once the sharing rule is on the table. D cannot open the paragraph.",
            },
            {
              do: "Put A last.",
              why: "Hence packs the warning into a closer: a private chat is still communication.",
            },
            {
              do: "Reject orders that start with A or C.",
              why: "Hence and That is why look backward. They cannot open.",
            },
            {
              do: "Read B–C–D–A as a paragraph.",
              why: "Idea, rule, false defence, then the chat-group closer. No stranded pronoun.",
            },
          ],
          result: "B–C–D–A. Opener B; pair B–C; closer A.",
        },
        {
          title: "this / these cannot open",
          prompt:
            "A. These ratios are RBI tools, not SEBI listing rules. B. Repo injects rupees against collateral; CRR parks cash at the Reserve Bank. C. Therefore a sentence that says ‘SEBI’s repo’ is already wrong. D. That mix of two regulators is a common Paper 1 trap. Find opener, pair, closer.",
          steps: [
            {
              do: "Cross out A as opener.",
              why: "These ratios needs ratios already named.",
            },
            {
              do: "Cross out C as opener.",
              why: "Therefore marks a result.",
            },
            {
              do: "Cross out D as opener.",
              why: "That mix needs a mix already on the table.",
            },
            {
              do: "Pick B as first. Pair B with A.",
              why: "B names repo and CRR. A’s These ratios points at that pair.",
            },
            {
              do: "Park D after A. Put C last.",
              why: "D’s That mix points at the SEBI/RBI mix. Therefore then closes: ‘SEBI’s repo’ is wrong.",
            },
            {
              do: "Read B–A–D–C. Kill any order that strands These or That.",
              why: "A true RBI fact in A does not make A first. A pointing word still needs a home.",
            },
          ],
          result: "B–A–D–C. Opener B; pair B–A; closer C.",
        },
      ],
    },
    {
      heading: "Reading comprehension — fact, inference, tone",
      body: "A fact question is answered by a line you can point to: a date, a name, a definition. If the passage says T+1 became the default from 27 January 2023, that date is the fact — not a date you remember from class.\n\nAn inference must follow from the passage, but it is not printed as a ready sentence. Take one small logical step. Do not add outside knowledge. From ‘optional T+0 is a limited extra path, not a replacement’, you may infer that T+0 is not treated as already compulsory for every stock. You may not infer that the author wants T+0 banned.\n\nTone is the author’s attitude: cautious, critical, approving, calm-and-diagnostic. Official prose is usually calm analysis, not a rant and not a cheer. Mentioning a reform is not a celebration of that reform.\n\nExtreme words (always, never, must, only) are often wrong unless the passage was that strong. The main idea covers the whole argument, not one detail and not your own reform plan.",
      howTo: [
        "Label the question: fact, inference, tone, or main idea.",
        "Fact: point to a line. Copy the date or name as printed.",
        "Inference: write the small step. If you needed extra GK, it is not an inference.",
        "Tone: pick the attitude word that matches the heat of the prose (calm vs angry vs happy).",
        "Kill options that add a new policy, a new product, or always / never.",
      ],
      bullets: [
        "Fact = in the passage. Inference = one necessary step, no extra GK.",
        "Tone = attitude, not the topic name.",
        "Main idea = the whole claim. A true detail can still be too small.",
      ],
      examples: [
        {
          title: "Fact versus inference on settlement",
          prompt:
            "Passage: ‘T+1 has been the default cash-equity cycle since 27 January 2023. Optional T+0 continued as a limited extra path, not as a replacement of T+1.’ Q1 (fact): what is the default cycle? Q2 (inference): does the author treat T+0 as already universal?",
          steps: [
            {
              do: "Answer Q1 from the printed date and label.",
              why: "The passage says the default is T+1 from 27 January 2023. That is a fact lookup, not a memory test.",
            },
            {
              do: "For Q2, use limited extra path, not a replacement.",
              why: "Those words force the step: T+0 is not treated as market-wide and compulsory. That is an inference.",
            },
            {
              do: "Reject ‘the author wants T+0 repealed’.",
              why: "That extra wish is not in the passage. An inference cannot add a new policy.",
            },
          ],
          result:
            "Fact: default T+1 since 27 January 2023. Inference: T+0 is extra and limited, not a full replacement.",
        },
        {
          title: "Tone — calm diagnosis, not a rant",
          prompt:
            "Closing lines: ‘The useful questions are older than the new app: is the price clear, is the chance of a prize disclosed, can a child spend without a parent?’ Tone: (A) celebratory (B) angry polemic (C) dry, careful diagnosis (D) comic parody.",
          steps: [
            {
              do: "Notice the author lists tests in calm sentences.",
              why: "Naming checks (price, prize, child) is diagnostic. There is no cheer and no insult.",
            },
            {
              do: "Drop (A) celebratory.",
              why: "A list of risks is not praise.",
            },
            {
              do: "Drop (B) and (D).",
              why: "Angry would shout or demand a ban. Parody would mock the regulator’s voice. useful questions is cool, not furious or jokey.",
            },
            {
              do: "Pick (C).",
              why: "Dry and careful matches official-exam tone.",
            },
          ],
          result: "(C) dry, careful diagnosis. Not a cheer, not a rant, not a joke.",
        },
        {
          title: "Main idea versus a true detail",
          prompt:
            "Passage arc: rumours move faster than checked disclosure; instant forced denials can be wrong; slow silence lets prices move on lies; a middle path is a short duty to confirm or deny a specific material rumour. Options: (A) Prices never move on rumours (B) The live problem is the timing and truth of company speech (C) T+0 abolished rumours (D) The 2025 Chairperson invented this rule.",
          steps: [
            {
              do: "Drop (A).",
              why: "The passage says prices can move on lies. never contradicts it.",
            },
            {
              do: "Drop (C) and (D).",
              why: "They import other GA. Even if a date is true in the world, it is not this passage’s idea.",
            },
            {
              do: "Keep (B).",
              why: "It covers speed versus accuracy and the middle duty, without a new gadget.",
            },
          ],
          result:
            "(B) is the main idea. (A) fights the passage. (C) and (D) are off-passage.",
        },
        {
          title: "Kill always / never unless the passage is that strong",
          prompt:
            "Passage: ‘Optional T+0 is a limited extra path. Most cash stocks still settle T+1.’ Options: (A) Every listed stock must settle on the trade date (B) T+0 is not the default for every stock (C) India never uses T+1 (D) Brokers always finish custody by noon. Which follows?",
          steps: [
            {
              do: "Label the question as inference, not a memory test.",
              why: "You may use only the printed lines.",
            },
            {
              do: "Drop (A). must and every plus trade date over-claim T+0.",
              why: "The passage calls T+0 limited and extra, not compulsory same-day for all.",
            },
            {
              do: "Drop (C). never fights the line that most stocks still settle T+1.",
              why: "Extreme never is wrong when the passage names T+1 as the usual cycle.",
            },
            {
              do: "Drop (D). always and by noon are not in the passage.",
              why: "A true operations worry from class is still extra GK here.",
            },
            {
              do: "Keep (B).",
              why: "limited extra path plus most stocks still T+1 force that one step: T+0 is not the default for every stock.",
            },
            {
              do: "Write the extreme-word test in the margin: always / never / must / only.",
              why: "Those words are often wrong unless the passage was that strong.",
            },
          ],
          result:
            "(B). (A), (C), and (D) add always / never / must. The passage was not that strong.",
        },
        {
          title: "Do not add outside Chairperson GK",
          prompt:
            "Passage: ‘The Board’s 2024 annual report was signed while the then Chairperson still had months left in the term that began in March 2022.’ A student picks Pandey because ‘that is today’s Chair’. What does the passage actually support?",
          steps: [
            {
              do: "Treat this as a fact question about the passage’s own dating.",
              why: "Fact = point to a line. The line says the term began in March 2022 and still covered 2024.",
            },
            {
              do: "March 2022 start matches Buch’s term in the GA table, but you still follow the passage.",
              why: "Even if you know the names, the passage did not print Pandey.",
            },
            {
              do: "Reject Pandey as an import.",
              why: "Pandey took charge in March 2025. That is true in the world and still the wrong answer to this passage.",
            },
            {
              do: "Reject Tyagi.",
              why: "Tyagi’s term ended February 2022, before a March 2022 start.",
            },
            {
              do: "Answer with the passage: the Chair whose term began March 2022 and covered 2024.",
              why: "If the options name Buch, that is the fact lookup. If they only paraphrase the dates, pick that paraphrase.",
            },
            {
              do: "Write the rule: a true later fact can still be off-passage.",
              why: "Same trap as inventing a Chair in a precis.",
            },
          ],
          result:
            "Fact: the March 2022 Chair still signed in 2024 (Buch in GA). Pandey is true later, not this passage.",
        },
      ],
    },
    {
      heading: "Precis — cut examples, keep numbers, keep the main claim",
      body: "A precis is a short faithful copy of the author’s point. Same stance. Same order of ideas. About one third of the words. No ‘I think’. No new advice.\n\nCut examples and stories. If the passage uses a kettle or a list of office names only to prove a claim, keep the claim and drop the props.\n\nKeep numbers and dates that carry the claim (T+1 from 27 January 2023; a basket of 25 stocks). You may drop a decorative figure. You may not change 25 into 250, and you may not invent a year.\n\nKeep the main claim. If the author says T+0 should stay optional, your precis may not say it must be made compulsory. Title the precis with a plain noun phrase of the issue, not a slogan like ‘T+0 forever’.",
      howTo: [
        "List the idea units in order (problem, how it works, risk, policy, warning).",
        "Drop examples, jokes, and extra names that do not carry the claim.",
        "Keep load-bearing numbers and dates. Do not change them. Do not invent new ones.",
        "Write the same stance in your own short sentences.",
        "Check: did I add a must / should the author did not say? If yes, cut it.",
      ],
      bullets: [
        "Cut examples. Keep the claim the example was proving.",
        "Keep numbers that change the meaning. Never replace a figure with a guess.",
        "Same stance, shorter words, no ‘I think’.",
      ],
      examples: [
        {
          title: "Do not reverse the author’s stance",
          prompt:
            "Passage stance: optional T+0 should stay a limited test because custody and funding may not finish by evening. Student openings: (A) Same-day settlement needs those jobs to finish by evening, so a limited optional test checks the stack without forcing every stock onto a new clock. (B) SEBI must make T+0 compulsory for all stocks at once. (C) I feel settlement is boring. Which precis opening is allowed?",
          steps: [
            {
              do: "Keep (A).",
              why: "It keeps the caution and the mechanism. That is precis work.",
            },
            {
              do: "Kill (B).",
              why: "It turns optional into compulsory. That changes the main claim.",
            },
            {
              do: "Kill (C).",
              why: "First person and a new feeling are not in the passage.",
            },
          ],
          result:
            "Only (A). (B) reverses the claim. (C) adds the student.",
        },
        {
          title: "Compress four ideas; drop the extra list",
          prompt:
            "Original: ‘Shortening settlement cuts counterparty risk. Operational capacity at brokers, custodians and depositories cannot be assumed overnight. That is why a jump from T+2 to T+1 for every stock on one day was not the 2022 design. Phased inclusion of stocks was therefore the practical path.’ Write one sentence and say what you cut.",
          steps: [
            {
              do: "Name the four claims: faster cycle cuts risk; operations cannot flip overnight; so no one-day jump; so they phased it.",
              why: "A precis must hit each unit in that order, not only the last line.",
            },
            {
              do: "Write: ‘Because faster settlement cuts risk but operations cannot switch overnight, India phased T+1 rather than moving every stock in one jump.’",
              why: "One sentence, same stance, same order.",
            },
            {
              do: "Cut the full list brokers / custodians / depositories. Keep T+1 / T+2 if they carry the claim.",
              why: "The list was an example of ‘operations’. The cycle labels are load-bearing.",
            },
            {
              do: "Do not add T+0, a Chairperson, or ‘this must now be compulsory’.",
              why: "Those ideas are other paragraphs. A precis does not import them.",
            },
          ],
          result:
            "Phased T+1 because speed cuts risk but operations cannot flip overnight. Cut the office list; do not add new policy.",
        },
        {
          title: "Keep the number; do not invent a Chair",
          prompt:
            "Passage: ‘a limited basket (initially 25 stocks) from 28 March 2024’. Student precis: ‘T+0 for 250 stocks in 2022 under Chairperson Pandey.’ List the faults and write a faithful line.",
          steps: [
            {
              do: "Mark 25 → 250 as a fault.",
              why: "You may drop 25 to save words. You may not inflate it.",
            },
            {
              do: "Mark 2024 → 2022 as a fault.",
              why: "The date carries the claim. Changing the year changes the history.",
            },
            {
              do: "Mark Pandey as a fault.",
              why: "The passage did not name a Chair. Do not import GK. (Pandey also took charge only in March 2025.)",
            },
            {
              do: "Write: ‘In March 2024 exchanges began a limited optional T+0 basket beside T+1.’",
              why: "Same claim, shorter. Keep 25 if you have room.",
            },
          ],
          result:
            "Faults: 250 for 25, 2022 for 2024, extra Chair. Faithful: limited optional T+0 from March 2024 beside T+1.",
        },
        {
          title: "Cut the story; keep the claim it proved",
          prompt:
            "Passage: ‘A kettle on a desk does not make the water safe. In the same way, a new trading app does not make the price, the prize, or a child’s spend safe. The useful tests stay old: is the price clear, is the chance of a prize disclosed, can a child spend without a parent?’ Student precis: ‘A kettle on a desk is a SEBI product. Ban all apps.’ Rewrite.",
          steps: [
            {
              do: "Name the claim: a new app does not by itself make three old risks go away.",
              why: "The kettle is only a picture. The claim is about price, prize, and a child’s spend.",
            },
            {
              do: "Drop the kettle from the precis (or keep it in three words if you must).",
              why: "Examples and props are the first cut. The exam wants the idea, not the furniture.",
            },
            {
              do: "Keep the three tests in short words.",
              why: "Those tests carry the claim. Cutting them leaves only a slogan.",
            },
            {
              do: "Kill Ban all apps.",
              why: "The author asked useful questions. The author did not order a ban. Same-stance rule.",
            },
            {
              do: "Kill A kettle … is a SEBI product.",
              why: "That invents a product and a regulator fact the passage did not state.",
            },
            {
              do: "Write: ‘A new app does not remove old duties: clear price, disclosed prize, and a check on a child’s spend.’",
              why: "Same order, shorter, no new policy.",
            },
          ],
          result:
            "Keep the three tests. Cut the kettle. Do not add a ban or a fake SEBI product.",
        },
        {
          title: "Title the precis with a noun phrase, not a slogan",
          prompt:
            "Passage stance: optional T+0 should stay a limited test. Candidate titles: (A) T+0 forever (B) Make T+0 compulsory now (C) Optional same-day settlement as a limited test (D) I hate settlement cycles. Which title is allowed?",
          steps: [
            {
              do: "A precis title is a plain noun phrase of the issue.",
              why: "It names the topic. It does not cheer, ban, or add ‘I’.",
            },
            {
              do: "Drop (A) T+0 forever.",
              why: "That is a slogan and it reverses limited test.",
            },
            {
              do: "Drop (B).",
              why: "compulsory fights optional. The title cannot change the stance.",
            },
            {
              do: "Drop (D).",
              why: "First person and a feeling are not the author’s title.",
            },
            {
              do: "Keep (C).",
              why: "It names optional same-day settlement and keeps limited test, without a campaign line.",
            },
            {
              do: "If you write a one-line precis under that title, keep the custody-and-funding caution.",
              why: "The title is not enough. The body must still match the author’s warning.",
            },
          ],
          result:
            "(C) Optional same-day settlement as a limited test. No slogan, no reverse, no ‘I’.",
        },
      ],
    },
  ],
};
