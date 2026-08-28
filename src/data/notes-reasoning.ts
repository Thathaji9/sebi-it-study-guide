import type { TopicNote } from "@/data/notes";

export const notesReasoning: TopicNote = {
  topic: "reasoning",
  title: "Reasoning for SEBI Paper 1 — worked notes",
  blurb:
    "Phase I Reasoning is about 25 marks of timed puzzles: syllogism, coded inequality, blood relations, directions, coding-decoding, a small linear or circular row, order ranking, one input-output machine, and a one-question box puzzle. Draw. Do not ‘see’. Every seating example below names left and right from the person’s view, step by step.",
  blocks: [
    {
      heading: "Syllogism — Venn, some / all / none, and the extra-overlap ban",
      body: "A syllogism item gives two or three categorical premises and four conclusions. You may tick only what must be true in every diagram the premises allow. ‘Some A are B’ is an existential overlap: at least one A-B. ‘All A are B’ puts the A circle inside B (A can still equal B). ‘No A is B’ is disjoint circles. ‘Some A are not B’ is an A-region outside B.\n\nThe exam’s favourite trap is assuming extra overlap. From ‘All markets are regulated’ and ‘Some regulated entities are listed’, the listed blob may sit entirely in the non-market part of regulated. You may not conclude that some markets are listed, nor that no market is listed. ‘Possibility’ conclusions (if the paper uses that older style) follow when a diagram can be drawn; definite conclusions follow only when every diagram agrees.\n\nStandard conversions that do follow: All A are B ⇒ Some B are A (in exam syllogism, ‘all’ is taken to import existence). No A is B ⇔ No B is A. Some A are B ⇔ Some B are A. All A are B plus All B are C ⇒ All A are C, and also Some C are A. No A is B plus All C are B ⇒ No C is A (C sits inside B, which is disjoint from A).\n\nTwo ‘some’ premises never force a ‘some’ between the ends: Some A are B and Some B are C does not give Some A are C. Complement conclusions (‘some not’) follow from All A are B plus No B is C ⇒ No A is C, hence Some A are not C if existence is assumed. Draw two Venns when in doubt; if they disagree on the conclusion, it does not follow.",
      bullets: [
        "Definite = true in every allowed Venn; possibility = true in at least one.",
        "Do not add overlap that the premises do not force.",
        "All A are B ⇒ Some B are A (exam import). Two ‘somes’ do not chain.",
        "No A is B plus All C are B ⇒ No C is A.",
      ],
      examples: [
        {
          title: "All markets are regulated; some regulated are listed",
          prompt:
            "Statements: All markets are regulated. Some regulated entities are listed. Conclusions: I Some markets are listed. II No market is listed. III Some markets may be listed — cannot say from the premises as given. Which follows as a definite claim?",
          steps: [
            "Draw circle Market inside circle Regulated. Place a Listed blob that intersects Regulated.",
            "The Listed blob can sit wholly in Regulated-but-not-Market. Then I is false in that diagram.",
            "The Listed blob can also cut Market. Then I is true in that diagram, and II is false.",
            "Because I is not true in every diagram and II is not true in every diagram, neither I nor II is a definite conclusion. The honest definite statement is that overlap between markets and listed is not forced.",
            "Exam key: do not assume extra overlap. The option ‘Some markets may be listed — cannot say from the premises as given’ is the correct attitude; ‘All listed entities are markets’ and ‘All regulated entities are markets’ reverse the first premise and fail.",
          ],
          result:
            "Neither ‘some markets are listed’ nor ‘no market is listed’ is definite. Extra overlap is forbidden. Possibility of overlap remains.",
        },
        {
          title: "All A are B, all B are C — some / all that follow",
          prompt:
            "Statements: All brokers are intermediaries. All intermediaries are registered. Conclusions: I All brokers are registered. II Some registered are brokers. III Some registered are not brokers. IV No broker is registered.",
          steps: [
            "Venn: Brokers ⊂ Intermediaries ⊂ Registered. So Brokers ⊂ Registered. I follows (all).",
            "Because the inner circle of brokers sits inside registered, at least those brokers are registered entities. Conversion of I gives II: Some registered are brokers. Follows.",
            "III (some registered are not brokers) is a possibility — registered may be larger — but it is not forced: the three circles could coincide. In strict definite syllogism, III does not follow.",
            "IV contradicts I. Does not follow.",
            "Tick I and II only. ‘Some / all / none’ map: I is all, II is some (conversion), III is a non-forced some-not, IV is none (false).",
          ],
          result: "Only I and II follow (all brokers registered; some registered are brokers).",
        },
        {
          title: "No A is B, all C are B — none follows",
          prompt:
            "Statements: No insider is a public shareholder in this model. All designated persons are insiders. Conclusions: I No designated person is a public shareholder. II Some public shareholders are designated persons. III All public shareholders are designated persons.",
          steps: [
            "No insider is a public shareholder: the Insider and Public-shareholder circles are disjoint.",
            "All designated persons are insiders: Designated ⊂ Insider. So Designated sits entirely inside a circle that does not meet Public-shareholder.",
            "Therefore Designated is disjoint from Public-shareholder: I follows (none).",
            "II requires overlap of public shareholders and designated persons — forbidden by the disjoint diagram. III puts all public shareholders inside designated, which would put them inside insiders, contradicting ‘no insider is a public shareholder’.",
            "Only I follows. This is the ‘no / all / none’ chain: All C are B, No A is B (here A = public shareholder, B = insider) ⇒ No C is A.",
          ],
          result: "Only I: no designated person is a public shareholder. II and III fail.",
        },
        {
          title: "Some + some does not give some on the ends",
          prompt:
            "Statements: Some FPIs are pension funds. Some pension funds are listed. Conclusions: I Some FPIs are listed. II Some listed are pension funds. III All FPIs are listed.",
          steps: [
            "Some FPIs are pension funds: overlap FPI ∩ Pension. Some pension funds are listed: overlap Pension ∩ Listed.",
            "Those two overlaps can be different slices of Pension. FPI and Listed need not meet. I does not follow.",
            "II is the conversion of the second premise (Some pension funds are listed ⇔ Some listed are pension funds). II follows from statement 2 alone.",
            "III (all FPIs listed) is stronger than I and also unforced.",
            "Tick II only. Memory: two ‘somes’ never chain to a definite ‘some’ on the end terms; conversion of a given ‘some’ is safe.",
          ],
          result: "Only II follows. I is the extra-overlap trap; III is an illicit all.",
        },
      ],
    },
    {
      heading: "Inequalities — coded signs and the missing-link test",
      body: "A chain such as P > Q ≥ R = S < T is read left to right. Equal signs copy the value; ≥ and ≤ are ‘at least / at most’. A definite > between two letters exists only if you can walk from one to the other using a path that is entirely ≥ or = except at least one strict > in the same direction, and no opposing break.\n\nIn P > Q ≥ R = S, you have P > S (because P > Q and Q is at least S). You do not have Q < T: the path Q ≥ R = S < T goes down after S, so Q could be 10 and T 9, or Q 10 and T 100. When a < and a > fight inside the same walk, the pair is incomparable.\n\nCoded inequality replaces symbols with letters: @ means ≥, * means >, # means =, $ means ≤, & means < — the mapping is given in the stem, not memorised. Decode onto a scratch chain first, then apply the same walk test. Combined items give two conclusions I and II: only I, only II, either, both, or neither.\n\n‘Either I or II’ is rare and needs complementary conclusions (x > y or x ≤ y covering all cases). Do not tick ‘either’ just because both look possible. Either is for when exactly one of two complementary statements must hold and you cannot tell which.",
      bullets: [
        "Decode coded signs onto >, ≥, =, ≤, < before comparing.",
        "A definite > needs a same-direction path with at least one strict inequality.",
        "A < facing a > in the same walk ⇒ cannot compare.",
        "Either/or only for complementary pairs, not for two ‘maybes’.",
      ],
      examples: [
        {
          title: "P > Q ≥ R = S < T — which conclusions",
          prompt:
            "Statements: P > Q ≥ R = S < T. Conclusions: I. P > S  II. Q < T. Options: only I, only II, both, neither.",
          steps: [
            "Path P to S: P > Q ≥ R = S. From P down to Q (strict), then Q is ≥ S. So P is strictly above S. I follows.",
            "Path Q to T: Q ≥ R = S < T. After S the chain rises to T. Q could still be larger than T (Q = 10, S = 8, T = 9) or smaller (Q = 8, S = 8, T = 12).",
            "Because both Q > T and Q < T (and Q = T) are drawable, II does not follow as a definite.",
            "Not ‘both’. Not ‘either’ — I is already definite; II is not complementary to I.",
            "Answer: only I. The S < T limb does not licence a comparison between Q and T.",
          ],
          result: "Only I follows (P > S). Q and T are incomparable.",
        },
        {
          title: "Coded: @ is ≥, * is >, # is =",
          prompt:
            "If A @ B means A ≥ B, A * B means A > B, A # B means A = B, A $ B means A ≤ B. Statement: M * N @ P # Q $ R. Conclusions: I. M > Q  II. N ≥ R.",
          steps: [
            "Decode: M * N is M > N. N @ P is N ≥ P. P # Q is P = Q. Q $ R is Q ≤ R. Chain: M > N ≥ P = Q ≤ R.",
            "I: M to Q is M > N ≥ P = Q, so M > Q. I follows.",
            "II: N ≥ P = Q ≤ R. N is at least Q, and Q is at most R, so N versus R is the same incomparable pattern as Q versus T above. N could be 5, R 9; or N 9, R 9; or N 12, R 9.",
            "II does not follow. (N ≥ R would require a ≥ path from N to R with no opposing rise after Q.)",
            "Only I. If a third conclusion M > R were offered, it would also fail: M > Q ≤ R leaves M versus R open.",
          ],
          result: "Only I (M > Q). N ≥ R does not follow from N ≥ Q ≤ R.",
        },
        {
          title: "Both conclusions, no missing link",
          prompt:
            "A ≥ B > C = D ≥ E. Conclusions: I. A > E  II. B > D.",
          steps: [
            "A to E: A ≥ B > C = D ≥ E. There is a strict > between B and C on that path, and every other sign is ≥ or =. So A > E. I follows.",
            "B to D: B > C = D, hence B > D. II follows (the = copies C onto D).",
            "Both walks are same-direction with a strict inequality. No opposing break.",
            "Tick both I and II. Not ‘either’.",
            "A = E is impossible because of B > C in the middle. So I is strict >, not ≥. That matches the stated I.",
          ],
          result: "Both I and II follow (A > E and B > D).",
        },
        {
          title: "Neither — opposing signs in the middle",
          prompt:
            "F > G < H ≥ I = J. Conclusions: I. F > I  II. G < J.",
          steps: [
            "F to I: F > G < H ≥ I. After G the chain goes the other way (up to H). F and I are not comparable. I fails.",
            "G to J: G < H ≥ I = J. G is below H, J is at most H, so G could be 2, J 5 (G < J) or G 4, J 3 if H = 5, I = J = 3 (G > J). II fails.",
            "Neither conclusion is definite.",
            "A follow-up that would work: H ≥ J (true, because H ≥ I = J). If that had been I, it would follow.",
            "Answer: neither I nor II. The < between G and H is the break.",
          ],
          result: "Neither I nor II follows. G < H ≥ I blocks both walks.",
        },
      ],
    },
    {
      heading: "Blood relations — only-child, photograph, and coded relations",
      body: "Translate every phrase into a tiny family tree before you look at options. ‘My grandfather’s only son’ is father (if the speaker is a child of that grandfather through that son — and if grandfather has only one son, that son is unique). ‘Son of my grandfather’s only son’ is the speaker or the speaker’s brother. Gender of the photograph is given by ‘he’ or ‘she’; do not assume the speaker’s gender unless named.\n\nOnly / only daughter / only son are the strongest words: they collapse extra branches. Brother-in-law is spouse’s brother or sister’s husband — two diagrams until the stem decides. Maternal uncle is mother’s brother. Paternal aunt is father’s sister.\n\nCoded relations (‘A + B means A is the father of B’) must be decoded into a directed labelled edge. Combine two codes only at a shared person. Generation checks: if the conclusion skips a generation the code did not, it is false.\n\nPointing-to-a-photograph items: replace ‘my’ with the speaker’s name, draw, then name the photographed person relative to the speaker. If two answers remain (himself or brother), the option ‘brother or himself’ is the designed key.",
      bullets: [
        "Grandfather’s only son = father of the speaker (given one paternal grandfather).",
        "That father’s son = speaker or speaker’s brother.",
        "Only collapses extra siblings. In-laws need two candidate diagrams.",
        "Decode +/− codes to labelled edges before combining.",
      ],
      examples: [
        {
          title: "Photograph — grandfather’s only son",
          prompt:
            "Pointing to a photograph, Ravi says, ‘He is the son of my grandfather’s only son.’ The person is Ravi’s: (A) brother or himself (B) uncle (C) cousin only (D) father.",
          steps: [
            "Ravi’s grandfather’s only son is unique: that man is Ravi’s father (Ravi’s grandfather has no other son).",
            "‘He’ is the son of that man, i.e. a son of Ravi’s father.",
            "Sons of Ravi’s father are Ravi and Ravi’s brothers (if any).",
            "(B) uncle would be grandfather’s son other than father — but there is no other son. (C) cousin needs an uncle’s child. (D) father is the ‘only son’, not the ‘son of the only son’.",
            "The photograph is therefore Ravi or Ravi’s brother. Key (A). The stem does not tell us whether Ravi has a brother, so both remain.",
          ],
          result: "Brother or himself. Not uncle, cousin, or father.",
        },
        {
          title: "Only daughter of only son",
          prompt:
            "Pointing to a girl, Meera says, ‘She is the only daughter of the only son of my grandmother.’ How is the girl related to Meera if Meera’s grandmother has a single son who is Meera’s father?",
          steps: [
            "Meera’s grandmother’s only son = Meera’s father (the stem’s extra clause confirms the unique son is the father).",
            "The only daughter of that father is Meera herself if Meera is female and an only daughter, or Meera’s sister if the only daughter is a sister and Meera is not that daughter.",
            "The girl is the unique daughter of Meera’s father. If Meera is that unique daughter, the girl is Meera. If Meera has no sister and is that daughter, photograph = Meera.",
            "Standard key when the speaker is a woman and the girl is ‘only daughter of my father’: the girl is the speaker (or the speaker is pointing at herself — unusual) / the girl is the speaker’s sister only if Meera is not herself the only daughter, which would contradict ‘only’.",
            "With ‘only daughter’, there is exactly one daughter of the father: Meera is that daughter, so the girl is Meera. Relation: she herself. (If an option says ‘sister’, it needed a second daughter, which ‘only’ forbids.)",
          ],
          result:
            "The girl is Meera (the only daughter of her father). ‘Sister’ would require a second daughter.",
        },
        {
          title: "Coded: P × Q = P is mother of Q",
          prompt:
            "P × Q means P is the mother of Q; P + Q means P is the father of Q; P − Q means P is the sister of Q. Expression: A × B + C − D. How is A related to D?",
          steps: [
            "A × B: A is mother of B. A is female, B is A’s child.",
            "B + C: B is father of C. So B is male. Thus B is A’s son, and C is B’s child, i.e. A’s grandchild.",
            "C − D: C is sister of D. C is female; D is C’s sibling, also B’s child, also A’s grandchild.",
            "A is the mother of D’s father B, hence A is D’s paternal grandmother.",
            "Gender of D is not fixed by ‘sister of D’ (D can be brother or sister). The relation of A to D is grandmother either way.",
          ],
          result: "A is D’s grandmother (paternal). D’s gender is open.",
        },
        {
          title: "Two-step in-law",
          prompt:
            "Karan is the brother of Lata. Lata is the wife of Mohit. Nisha is Mohit’s sister. How is Karan related to Nisha?",
          steps: [
            "Karan — brother — Lata. Lata — wife — Mohit, so Mohit is Karan’s brother-in-law.",
            "Nisha is Mohit’s sister, so Nisha is Lata’s sister-in-law.",
            "Karan is Lata’s brother, therefore Karan is also a brother-in-law of Mohit, and to Nisha he is her brother’s wife’s brother.",
            "In ordinary exam options that relation is ‘brother-in-law’ only if they treat Karan as Nisha’s sister-in-law’s brother; the precise label is ‘wife’s brother’ relative to Mohit, and relative to Nisha it is ‘brother of brother’s wife’ — not Nisha’s brother.",
            "Karan is not Nisha’s brother (different parents unless stated). The designed relation: Karan is Nisha’s sister-in-law’s brother, i.e. no blood relation, in-law via Mohit–Lata. If options give ‘Brother-in-law’, that is from Mohit’s view, not Nisha’s. From Nisha: brother’s brother-in-law.",
          ],
          result:
            "Karan is the brother of Nisha’s sister-in-law Lata (no blood tie). Not Nisha’s brother.",
        },
      ],
    },
    {
      heading: "Directions — square walks, turns, and shortest distance",
      body: "Draw a plus sign: North up, East right, South down, West left. A person facing North who turns right faces East; left faces West; about-turn faces South. Each segment needs a length if a distance is asked. Pythagoras on a right-angled leftover: √(a² + b²).\n\n‘A is to the north of B’ places A above B. ‘C is to the east of B’ places C to B’s right. If AB = CD and the four points form a square, D ends east of A (or west, depending on the turning sense — draw it). Do not rotate the page mentally without redrawing.\n\nSunrise / shadow items: in India, morning sun is east, so a shadow falls west. The exam still mostly uses the plus-sign walk, not astronomy. Two-person meeting items: draw both paths on the same axes.\n\nIf the question asks ‘in which direction is D from A’, the answer is the compass of the vector A → D, not D’s facing. Facing and location are different questions; read the last five words.",
      bullets: [
        "North up, East right. Right turn from North = East.",
        "Location (‘D is to the east of A’) ≠ facing.",
        "Equal-length square: walk the four sides in the stated order, then read A→D.",
        "Shortest distance: remaining legs as a right triangle, then √(x²+y²).",
      ],
      examples: [
        {
          title: "Square ABCD — D east of A",
          prompt:
            "A is to the north of B. C is to the east of B. D is to the north of C. AB = CD and all four segments are equal-length sides of a square. D is to the _____ of A.",
          steps: [
            "Place B. A is north of B, so A is one side-length up from B. Draw A above B.",
            "C is east of B, same length, so C is one side-length right of B. Now we have a right angle at B.",
            "D is north of C, same length as AB (and CD = AB), so D is one side-length up from C.",
            "Compare D and A: both are one side-length north of the B–C line, and D is one side-length east of A (because C is east of B by that length). Vector A→D is due east.",
            "Options: North would be D above A; West would reverse the C-from-B step; South would put D below. Answer East. (If C had been west of B, D would be west of A.)",
          ],
          result: "East. Square A–B–C–D with B south of A and C east of B puts D east of A.",
        },
        {
          title: "Walk with two right turns",
          prompt:
            "Priya walks 8 km north, turns right, walks 6 km, turns right, walks 8 km. How far and in which direction is she from the start, and which way does she now face?",
          steps: [
            "Start facing north by implication of the first leg (or at least moving north). After 8 km north she is at (0, 8) if start is (0,0).",
            "Turn right: she was heading north, right = east. Walk 6 km to (6, 8).",
            "Turn right: heading east, right = south. Walk 8 km to (6, 0).",
            "From start (0,0) to (6,0): 6 km east. She faces south (last heading).",
            "Location versus facing: she is 6 km east of start, facing south. Do not answer ‘south’ for the location question.",
          ],
          result: "6 km east of start; facing south.",
        },
        {
          title: "Shortest distance after a dog-leg",
          prompt:
            "A man walks 12 km west, 5 km south, then 12 km east. How far is he from the starting point?",
          steps: [
            "West 12: (−12, 0). South 5: (−12, −5). East 12: (0, −5).",
            "The east leg cancels the west leg exactly.",
            "He is 5 km due south of start. Straight-line distance = 5 km.",
            "Pythagoras is unnecessary here because the leftover is a single axis. If the east leg had been 9 km he would be at (−3, −5), distance √(9+25)=√34.",
            "Answer 5 km south (distance 5 km). Not 12, not 17 (the total walking distance).",
          ],
          result: "5 km (due south of start). Walking distance 29 km is a trap.",
        },
        {
          title: "Two people, who is north-west of whom",
          prompt:
            "X walks 10 km east from P. Y walks 10 km north from P. Who is north-west of whom, and what is the straight-line XY?",
          steps: [
            "P at (0,0). X at (10, 0). Y at (0, 10).",
            "Vector X→Y = (−10, 10): 10 west and 10 north, i.e. north-west of X. So Y is north-west of X.",
            "Vector Y→X = (10, −10): south-east. X is south-east of Y, not north-west.",
            "Straight-line XY = √(10² + 10²) = √200 = 10√2 km.",
            "Read ‘who is north-west of whom’ as location of the first relative to the second. Y is north-west of X. Distance 10√2 km.",
          ],
          result: "Y is north-west of X; XY = 10√2 km.",
        },
      ],
    },
    {
      heading: "Coding–decoding — letter +1, reverse, and mixed number-letter",
      body: "The cheapest coding item is a uniform Caesar shift: each letter +1, SEBI → T, F, C, J. Apply the same shift to NIFTY: N→O, I→J, F→G, T→U, Y→Z, hence OJGUZ. Check the last letter first so you do not decode four letters and then guess the fifth.\n\nOther regulars: reverse the word then shift; opposite letters (A↔Z, B↔Y, position k maps to 27−k); consonant +1 vowel −1; or a number code from position values (A=1, …, Z=26) summed or multiplied. Mixed series (A2, C5, F10, J17) is +1 letter-skip growing plus +3, +5, +7 on the numbers.\n\nIn sentence coding (‘red is called blue…’) replace from the inside: if they ask the colour of the sky and sky is ‘called grass’, the answer is the new name, not the real-world colour. Keep a two-column table.\n\nNever mix two rules. If SEBI → TFCJ is +1, NIFTY is not a reverse of NIFTY. The distractor MJESX is −1; OHGSX is a botched skip. Work every letter.",
      bullets: [
        "Uniform shift: check the last letter first, then fill the rest.",
        "Opposite letter of k is 27−k (A=1).",
        "Sentence codes: answer in the coded language, not in English reality.",
        "One rule per item; MJESX is the −1 trap for a +1 stem.",
      ],
      examples: [
        {
          title: "SEBI → TFCJ, code NIFTY",
          prompt:
            "In a certain code SEBI is written as TFCJ. How is NIFTY written? (A) OJGUZ (B) MJESX (C) OHGSX (D) OJGUX",
          steps: [
            "S→T is +1, E→F is +1, B→C is +1, I→J is +1. Uniform +1, no reverse.",
            "N + 1 = O. I + 1 = J. F + 1 = G. T + 1 = U. Y + 1 = Z. That is O-J-G-U-Z.",
            "(B) MJESX is each letter −1 (N→M, …). Wrong direction.",
            "(C) OHGSX mishandles I and T. (D) OJGUX is OJGUZ with Z dropped to X — last-letter slip.",
            "Answer (A) OJGUZ. Last-letter check: Y must become Z, which only (A) has.",
          ],
          result: "OJGUZ (each letter +1). MJESX is the minus-one trap.",
        },
        {
          title: "Reverse then +1",
          prompt:
            "If RBI is coded as JCS, test the rule ‘reverse then +1’ on SEBI, and code NABARD under reverse-then-+1.",
          steps: [
            "RBI reversed is IBR. +1 on each: JCS. That matches the stem, so the rule is reverse then +1.",
            "SEBI reversed is IBES. +1: J, C, F, T → JCFT. (Not TFCJ — that was the other item’s rule.)",
            "NABARD reversed is DRABAN. +1: E, S, B, C, B, O → ESBCBO.",
            "Do not apply reverse-then-+1 to a stem that already fitted uniform +1 without reverse. Each question has its own code.",
            "Asked code: NABARD → ESBCBO. Check last letter: N (first of NABARD) becomes the last of the reverse (N) then +1 = O. Last letter O is the checksum.",
          ],
          result: "NABARD → ESBCBO under reverse-then-+1. SEBI would be JCFT under that same rule.",
        },
        {
          title: "Opposite letters",
          prompt:
            "If HOLD is coded as SLOW, decode the rule, then code MINT.",
          steps: [
            "Positions: H=8, opposite 27−8=19 = S. O=15, 27−15=12 = L. L=12, 27−12=15 = O. D=4, 27−4=23 = W. HOLD → SLOW. Opposite-letter code.",
            "M=13, 27−13=14 = N. I=9, 27−9=18 = R. N=14, 27−14=13 = M. T=20, 27−20=7 = G.",
            "MINT → NRMG.",
            "Checksum: first letter M (13) opposite N; last T opposite G. If an option ends in H you used 27−19 by mistake.",
            "This is not +1 (that would be NJOS). Do not mix with the SEBI item.",
          ],
          result: "MINT → NRMG (each letter’s opposite in the alphabet).",
        },
        {
          title: "Sentence code — sky is called…",
          prompt:
            "If ‘red’ is called ‘blue’, ‘blue’ is called ‘green’, ‘green’ is called ‘white’, and ‘white’ is called ‘black’, what is the colour of milk in that language? And the colour of the clear afternoon sky?",
          steps: [
            "Real colour of milk is white. In the code, white is called black. Milk is ‘black’.",
            "Real colour of a clear afternoon sky is blue. In the code, blue is called green. Sky is ‘green’.",
            "Do not answer ‘white’ for milk (that is English, not the code). Do not answer ‘blue’ for sky.",
            "Chain only one step from the real colour to what that word is called. Do not double-step milk→white→black→… into a further colour.",
            "Two answers: milk = black; sky = green.",
          ],
          result: "Milk is called black; the sky is called green. One substitution from the real colour.",
        },
      ],
    },
    {
      heading: "Linear and circular seating — draw left and right from the person",
      body: "Linear row, everyone facing north: the person’s left is west, right is east. If you draw positions 1 to 6 from west to east (left to right on the page when north is up), then ‘immediate left of B’ is the next lower index, i.e. towards position 1. ‘A is second to the left of B’ means two seats westward of B. Say it in words as you place each person: ‘A is 2nd left of B, so if B is at seat 5, A is at seat 3’.\n\nCircular table facing the centre: from above, a person’s left-hand neighbour is clockwise (the left hand of someone facing inward points clockwise). ‘Second to the left of B’ is two seats clockwise from B. If they face outward, left and right swap. This file’s circular examples all face the centre; the first sentence of each example restates that.\n\n‘Immediate neighbours of X are Y and Z’ places Y and Z on the two sides of X without yet saying who is left. Combine with a left/right clue to lock the side. Opposite in a hexagon (6 seats) is three seats away. Opposite in an octagon is four seats away. Five people in a circle have no unique geometric opposite; the paper will not ask ‘opposite’ for five unless it defines a facing pair.\n\nNever place two people in one seat. If a clue contradicts a drawing, the last clue is not wrong — an earlier optional branch was. Keep two sketches until a clue kills one.",
      bullets: [
        "Facing north in a row: left = west. Number seats west→east as 1…n.",
        "Facing centre in a circle: left = clockwise (from above).",
        "‘Second to the left of B’ = skip one seat in B’s left direction.",
        "Opposite in even-n circle = n/2 seats away.",
      ],
      examples: [
        {
          title: "Six in a row facing north — place by left-counts",
          prompt:
            "Six people A, B, C, D, E, F sit in a straight line facing north (so their left is west). Seats 1–6 are west to east. B sits at seat 4. A is second to the left of B. C is immediate right of A. F is at the east end. D is not next to F. Who sits at seats 1 to 6?",
          steps: [
            "Facing north, left = west = towards seat 1. B is at 4. A is second to the left of B: from 4, one left is 3, two left is 2. A is at 2. (‘A is 2nd left of B so A is two seats west of B.’)",
            "C is immediate right of A. A’s right is east = seat 3. C at 3.",
            "F is at the east end = seat 6.",
            "Remaining people D and E for seats 1 and 5. D is not next to F. F at 6 is next to 5, so D cannot be at 5. D at 1, therefore E at 5.",
            "Order west→east: D, A, C, B, E, F. Check: A (seat 2) is two left of B (4); C (3) is immediate right of A; F east end; D not next to F.",
          ],
          result: "West to east: D, A, C, B, E, F.",
        },
        {
          title: "Five in a row — ends and a neighbour pair",
          prompt:
            "P, Q, R, S, T face north in a row. Seats 1–5 are west to east. P is at the west end. T is second to the right of P. Q is at the east end. S is immediate left of Q. Who sits between T and Q, and who is at seat 2?",
          steps: [
            "Facing north, right = east. Seat 1 is west, seat 5 is east. P at the west end ⇒ P at 1.",
            "T is second to the right of P: from seat 1, first right is 2, second right is 3. T at 3. (‘T is 2nd right of P so T is two seats east of P.’)",
            "Q is at the east end ⇒ Q at 5.",
            "S is immediate left of Q. Left = west, so the seat immediately west of 5 is 4. S at 4.",
            "The leftover seat is 2 and the leftover person is R. West-to-east order: P, R, T, S, Q. Between T (seat 3) and Q (seat 5) sits S. Seat 2 is R.",
          ],
          result: "West to east: P, R, T, S, Q. S sits between T and Q. Seat 2 is R.",
        },
        {
          title: "Six around a table facing the centre",
          prompt:
            "A, B, C, D, E, F sit around a hexagon facing the centre (left = clockwise from above). A sits second to the left of B. C sits immediate right of A. D sits opposite B. E sits immediate left of D. F sits immediate right of B. Who sits opposite C, and who are B’s neighbours?",
          steps: [
            "Place B at position 1. Number 1–6 clockwise. Facing the centre, left = clockwise and right = anti-clockwise.",
            "A is second to the left of B: two seats clockwise from 1 is 3. A at 3. (‘A is 2nd left of B so from B skip one clockwise seat to A.’)",
            "C is immediate right of A. Right of A is anti-clockwise from 3, which is 2. C at 2.",
            "D sits opposite B. In a hexagon opposite is three seats away: from 1 that is 4. D at 4. E is immediate left of D: clockwise from 4 is 5. E at 5. F is immediate right of B: anti-clockwise from 1 is 6. F at 6.",
            "Clockwise from B: B, C, A, D, E, F. Opposite C (seat 2) is seat 5 = E. B’s neighbours are C (clockwise) and F (anti-clockwise). Check: A two left of B, C right of A, D opposite B, E left of D, F right of B.",
          ],
          result:
            "Clockwise from B: B, C, A, D, E, F. Opposite C is E. B’s neighbours are C and F.",
        },
        {
          title: "Four facing centre — second left spoken out loud",
          prompt:
            "Four people W, X, Y, Z sit around a square table facing the centre. W is second to the left of X. Y is immediate left of X. Who sits opposite W, and who is immediate right of X?",
          steps: [
            "Four seats, facing centre, left = clockwise. Opposite = two seats away.",
            "Place X at seat 1. Second to the left of X is two clockwise = seat 3. W at 3. (‘W is 2nd left of X so W sits opposite X on a square.’)",
            "Y is immediate left of X: one clockwise from 1 is 2. Y at 2. The leftover seat 4 is Z.",
            "Immediate right of X: right = anti-clockwise from 1, which is seat 4 = Z.",
            "Opposite W (seat 3) is seat 1 = X. Clockwise: X, Y, W, Z. Neighbours of X are Y (left) and Z (right).",
          ],
          result:
            "W sits opposite X. Immediate right of X is Z. Clockwise: X, Y, W, Z.",
        },
      ],
    },
    {
      heading: "Order and ranking — from left, from right, and between",
      body: "If A is 7th from the left and 12th from the right in a row, the total number of people is 7 + 12 − 1 = 18. You subtract one because A was counted in both ranks. Rank from the other end = total − rank_from_this_end + 1.\n\nPeople between two positions i and j (i < j) in a numbered row: j − i − 1. If A is 8th from left and B is 13th from left, people between them = 4. If ranks are given from opposite ends, convert one rank to the same end first using the total, or using total = l + r − 1 if one person supplies both.\n\nOver / under in a height queue: ‘A is taller than only two’ means A is 3rd shortest. ‘B is shorter than only one’ means B is 2nd tallest. Combine by writing a total order with slots, not by translating both into ‘greater than’ without the ‘only’.\n\nTwo rows facing each other use ranking plus seating: left of a person facing north is west, left of a person facing south is east. Convert before you count ‘second left’.",
      bullets: [
        "Total = (from left) + (from right) − 1.",
        "Other-end rank = total − this-end rank + 1.",
        "Between i and j = |j − i| − 1 after both ranks face the same end.",
        "‘Taller than only k’ = (k+1)th from the shortest.",
      ],
      examples: [
        {
          title: "7th left, 12th right — total",
          prompt:
            "A is 7th from the left and 12th from the right in a row. How many people are in the row? What is A’s rank from the right if you only knew total 18 and 7th from left?",
          steps: [
            "Total = 7 + 12 − 1 = 18. The −1 stops double-counting A.",
            "Check: positions 1–6 left of A (6 people), A, 7–17? From the right: 12th means 11 people to A’s right. 6 + 1 + 11 = 18. Matches.",
            "Reverse formula: rank from right = total − left-rank + 1 = 18 − 7 + 1 = 12. Recovers the given 12.",
            "If an option is 19, that candidate added 7+12 with no −1. If 17, they subtracted 2.",
            "Answer: 18 people; the reverse rank formula returns 12.",
          ],
          result: "18 people. Rank-from-right = 18 − 7 + 1 = 12.",
        },
        {
          title: "People between two left-ranks",
          prompt:
            "In a row of 20, Gita is 8th from the left and Hari is 13th from the left. How many sit between them? How many to Hari’s right?",
          steps: [
            "Both ranks from the left: Gita at 8, Hari at 13.",
            "Between = 13 − 8 − 1 = 4 people (seats 9,10,11,12).",
            "Hari’s rank from the right = 20 − 13 + 1 = 8, so people to Hari’s right = 7 (or 8th from right means 7 on his right).",
            "If Hari had been 13th from the right, you would convert: left-rank of Hari = 20 − 13 + 1 = 8, then Hari and Gita would be at the same seat — a different question.",
            "Answers: 4 between them; 7 people to Hari’s right.",
          ],
          result: "4 between Gita and Hari; 7 people to Hari’s right.",
        },
        {
          title: "Taller than only two",
          prompt:
            "Among six friends, Vani is taller than only two. Om is shorter than only one. Pia is taller than Vani but shorter than Om. Who is the shortest possible for Pia’s rank, and who can be tallest?",
          steps: [
            "Six heights, 1 = shortest, 6 = tallest. Vani taller than only two ⇒ Vani is 3rd shortest (rank 3 from bottom).",
            "Om shorter than only one ⇒ one person taller than Om ⇒ Om is 2nd tallest (rank 5 from bottom, 2 from top).",
            "Pia is taller than Vani (so Pia’s rank > 3) and shorter than Om (so Pia’s rank < 5). The only integer slot is rank 4.",
            "Tallest is rank 6, the unique person taller than Om. Shortest two are the two below Vani. Pia cannot be tallest or shortest.",
            "Pia is 3rd tallest (rank 4 of 6). Tallest is the unnamed friend above Om. Vani is 4th tallest.",
          ],
          result: "Pia is exactly 4th from shortest (3rd tallest). Om is 2nd tallest. Vani is 3rd shortest.",
        },
        {
          title: "Two ranks, find who swapped",
          prompt:
            "In a queue of 15, Neel is 6th from the front. After two people immediately in front of him step out, what is Neel’s new position from the front, and from the back?",
          steps: [
            "Front = left of a facing-front queue. Neel is 6th, so 5 people in front.",
            "Two of those in front leave. People in front of Neel become 3. Neel is now 4th from the front.",
            "Total remaining = 15 − 2 = 13.",
            "Rank from the back = 13 − 4 + 1 = 10. So 10th from the back.",
            "If the two who left had been behind Neel, front rank would stay 6 and total 13, back rank 13 − 6 + 1 = 8. The stem said they were in front. Use 4th front, 10th back.",
          ],
          result: "4th from the front and 10th from the back in a queue of 13.",
        },
      ],
    },
    {
      heading: "Input–output — one machine, numbers left, words right",
      body: "An input-output machine rearranges a line in steps by a fixed rule. The machine in this note does two placements per step: the smallest remaining number moves to the leftmost free ‘settled’ slot, and the alphabetically earliest remaining word moves to the rightmost free slot. Unarranged tokens keep their relative order in the middle.\n\nWrite the input, then rewrite the full line after every step. Do not jump to step IV from the input. When numbers are exhausted or words are exhausted, a later step may move only one token. The output is numbers in ascending order from the left and words in reverse alphabetical order from the left (equivalently, alphabetical from the right).\n\nQuestions ask: the line at step II; the position of a token at step III; how many steps to the output; which token is 4th from the left after step I. If a proposed step cannot be produced by the rule, it is not a step of this machine — that is the ‘which of the following is not a step’ item.\n\nOther machines (odd numbers +1 to the left, even −1, words reversed) exist in bank papers. Do not mix them into this example. Decode the rule from the first given step if a full working is printed in the question; here the rule is stated so you can see every placement.",
      bullets: [
        "One number to the left (ascending), one word to the right (alphabetical) per step.",
        "Middle tokens keep order. Rewrite the whole line each step.",
        "Output: numbers ASC on the left, words alpha from the right.",
        "Count steps; do not assume four steps if 3 numbers and 3 words finish in three.",
      ],
      examples: [
        {
          title: "Run the machine on 87 cat 23 ball 56 open 14 ten",
          prompt:
            "Input: 87 cat 23 ball 56 open 14 ten. The machine each step parks the smallest leftover number at the left and the earliest leftover word at the right. Write steps I–IV.",
          steps: [
            "Numbers in play: 14, 23, 56, 87. Words: ball, cat, open, ten. Input order: 87, cat, 23, ball, 56, open, 14, ten.",
            "Step I: smallest number 14 to the left; first word ball to the right. Remaining in order: 87 cat 23 56 open ten. Line: 14 87 cat 23 56 open ten ball.",
            "Step II: next number 23 to the left (after 14); next word cat to the right (before ball). Remaining: 87 56 open ten. Line: 14 23 87 56 open ten cat ball.",
            "Step III: next number 56 left; next word open right. Remaining: 87 ten. Line: 14 23 56 87 ten open cat ball.",
            "Step IV: last number 87 is already at the left of the middle; last word ten to the right. Line: 14 23 56 87 ten open cat ball. That is also the output (numbers 14,23,56,87 then words ten, open, cat, ball — alphabetical from the right).",
          ],
          result:
            "I: 14 87 cat 23 56 open ten ball. II: 14 23 87 56 open ten cat ball. III: 14 23 56 87 ten open cat ball. IV = output: 14 23 56 87 ten open cat ball.",
        },
        {
          title: "Position question at step II",
          prompt:
            "On the same input, which token is 4th from the left in step II, and which is 2nd from the right?",
          steps: [
            "Step II from the previous working: 14 23 87 56 open ten cat ball.",
            "Left ranks: 1=14, 2=23, 3=87, 4=56. Fourth from the left is 56.",
            "Right ranks: 1st from right = ball, 2nd from right = cat.",
            "Do not use step I (14 87 cat 23 56 open ten ball) where 4th from left is 23. The question named step II.",
            "Answers: 56, and cat.",
          ],
          result: "Step II: 4th from left = 56; 2nd from right = cat.",
        },
        {
          title: "How many steps, and a false step",
          prompt:
            "How many steps are required to reach the output? Is ‘14 23 56 87 open ten cat ball’ a step of this machine?",
          steps: [
            "Step IV already equals the output, so four steps are required (three pair-moves plus the last number/word lock). After step III the line was already 14 23 56 87 ten open cat ball, which is the output — so the output appears at step III, and step IV is identical.",
            "Count of pair-moves needed = max(count of numbers, count of words) if both move each step, but here after three pair-moves the line is already sorted: 14,23,56 parked, 87 already in the remaining slot, words open,cat,ball parked with ten in the remaining inner slot which is its final place. So the output is first reached at step III.",
            "The proposed line 14 23 56 87 open ten cat ball would have open immediately after 87, but the rule parks words from the right in order ball, then cat, then open, so open cannot sit left of ten in a genuine step: after step III ten is left of open. That proposed line is not a step.",
            "If the question asks ‘which is not a step’, pick any line that breaks ascending-left or alpha-from-right partial settlement.",
            "Answers: output first appears at step III; the open-ten swapped line is not a step.",
          ],
          result:
            "Output at step III (step IV identical). ‘14 23 56 87 open ten cat ball’ is not a step of this machine.",
        },
        {
          title: "New input, only step I demanded",
          prompt:
            "Input: 42 mango 15 egg 8 zest 27. Same machine. What is step I, and where is zest after step I?",
          steps: [
            "Numbers: 8, 15, 27, 42. Words: egg, mango, zest. Smallest number 8; first word egg.",
            "Remove 8 and egg from 42 mango 15 egg 8 zest 27, keeping order of the rest: 42 mango 15 zest 27.",
            "Step I: 8 42 mango 15 zest 27 egg.",
            "zest is 5th from the left in that line (8, 42, mango, 15, zest, 27, egg).",
            "Do not also move 15 in step I — one number per step. Step II would park 15 left and mango right: 8 15 42 zest 27 mango egg.",
          ],
          result: "Step I: 8 42 mango 15 zest 27 egg. zest is 5th from the left.",
        },
      ],
    },
    {
      heading: "One-question puzzle — five floors, five people, five cities",
      body: "A one-question puzzle packs a 5×1 building (or five slots) with two attribute lists. The method is a grid: people down the side, floors 1–5 across, and a second pass for the city (or colour, or department). Place the only-clue first (the person on floor 5, the one who is immediately above). Then use ‘two floors above’ as a gap of one. Never let two people share a floor.\n\nWrite ‘immediately above’ as floor n+1 if 1 is the ground. Some papers number 1 as the top; the stem will say ‘ground floor numbered 1’. Stick to that. ‘A lives on an odd-numbered floor’ leaves 1,3,5 until killed.\n\nWhen only one question is asked (‘who lives on floor 3?’), you may not need the full assignment, but filling the full assignment is still faster than branching. The worked puzzle below asks one question after five clues; the steps fill every floor so you can see there is no leftover permutation.\n\nIf two sketches survive until the last clue, the last clue’s job is to kill one. If both survive, the question is under-determined — that is not how Paper 1 keys work; you missed a ‘only’ or an ‘immediate’.",
      bullets: [
        "Ground = 1 unless the stem numbers the top as 1.",
        "Immediately above = next integer floor. Two above = +2.",
        "Odd floors 1,3,5. One person per floor.",
        "Place unique clues first; use the last clue to kill the leftover sketch.",
      ],
      examples: [
        {
          title: "Five floors — who is on 3?",
          prompt:
            "Five people — J, K, L, M, N — live on five floors, ground = 1, top = 5. (1) N lives on floor 5. (2) K lives on an odd-numbered floor other than 5. (3) L lives immediately above K. (4) J lives on the ground floor. (5) M lives immediately above J. Who lives on floor 3?",
          steps: [
            "N is on 5 (clue 1). J is on 1 (clue 4). M lives immediately above J, so M is on 2 (clue 5).",
            "K lives on an odd floor other than 5. Odd floors are 1, 3, 5. Floor 5 is N and floor 1 is J, so K must be on 3.",
            "L lives immediately above K, so L is on 4. Every floor is filled once: J=1, M=2, K=3, L=4, N=5.",
            "K cannot be 1 (J is there) and cannot be 5 (N is there). The odd-not-top clue plus the occupied ends force K=3.",
            "Floor 3 is K. Check: L on 4 is immediately above K; M on 2 is immediately above J; N on top. No double booking.",
          ],
          result: "K lives on floor 3. Ground-to-top: J, M, K, L, N.",
        },
        {
          title: "Same building — a between-gap that fits",
          prompt:
            "Keep J=1, M=2, K=3, L=4, N=5. How many floors are between J and K? Between M and L? Between J and N? Which pairs have exactly one floor between them?",
          steps: [
            "J on 1 and K on 3: floors between them = 3 − 1 − 1 = 1 (only floor 2). Pair J–K has exactly one floor between.",
            "M on 2 and L on 4: 4 − 2 − 1 = 1 (floor 3). Pair M–L also has exactly one floor between.",
            "J on 1 and N on 5: 5 − 1 − 1 = 3 floors between (2, 3 and 4).",
            "K on 3 and N on 5: 5 − 3 − 1 = 1 (floor 4). Pair K–N also has exactly one between.",
            "The three pairs with exactly one floor between are J–K, M–L and K–N. Adjacent pairs (J–M, M–K, K–L, L–N) have zero between. Do not confuse ‘immediately above’ (zero between) with ‘one between’.",
          ],
          result:
            "Exactly one floor between J and K, between M and L, and between K and N. J and N have three floors between them.",
        },
        {
          title: "Colour overlay on the same five floors",
          prompt:
            "Using J=1, M=2, K=3, L=4, N=5, add colours Red, Blue, Green, Yellow, White. (1) N likes Blue. (2) J likes Green. (3) Red is immediately above Green. (4) Yellow is on an even-numbered floor. (5) K likes White. Who likes Red, and who likes Yellow?",
          steps: [
            "J on 1 likes Green. Red immediately above Green ⇒ Red on floor 2. Floor 2 is M, so M likes Red.",
            "N on 5 likes Blue. K on 3 likes White (clue 5).",
            "The leftover colour is Yellow and the leftover person is L on floor 4.",
            "Check clue 4: Yellow on an even floor. Floor 4 is even, and floor 2 is already Red, so Yellow on 4 matches.",
            "Colours ground-to-top: Green (J), Red (M), White (K), Yellow (L), Blue (N). Red = M; Yellow = L.",
          ],
          result: "Red = M (floor 2). Yellow = L (floor 4). White = K; Blue = N; Green = J.",
        },
        {
          title: "One question, stop when it is forced",
          prompt:
            "The paper asks only ‘who lives immediately above K?’ given: N on 5, J on 1, M immediately above J, K on an odd floor other than 5, L immediately above K. Answer that one question, then note which clues you did not need for it.",
          steps: [
            "The clue ‘L lives immediately above K’ names the person: L.",
            "Consistency check: K is on 3 (the only odd floor left after 1=J and 5=N), so immediately above K is floor 4, occupied by L — the same person.",
            "M immediately above J only tells you floor 2 is M. That does not change who is above K.",
            "Under time pressure, if the stem already says L lives immediately above K, tick L and move. Rebuild the tower only if an option tries to put M or N above K against that clue.",
            "Answer: L. The unused-for-this-question clue is M’s placement, except as a check that floor 2 is not claiming to be above K.",
          ],
          result:
            "L lives immediately above K (floor 4 above K on 3). If that is already a premise, do not rebuild the whole tower unless an option contradicts it.",
        },
      ],
    },
  ],
};
