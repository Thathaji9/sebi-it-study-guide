import type { TopicNote } from "@/data/notes";

export const notesReasoning: TopicNote = {
  topic: "reasoning",
  title: "Reasoning — techniques (beginner)",
  blurb:
    "Twelve drawing tricks. Each section is one technique: what it is, the usual trap, a short recipe, three remember lines, and three worked examples. Every example step says what to do and why. Draw on paper. Do not guess.",
  blocks: [
    {
      heading: "Syllogism with Venn — all, some, and no",
      body: "A syllogism gives two or three sentences (premises) and asks which conclusions must be true. Draw circles. All A are B: put circle A fully inside circle B. Some A are B: the two circles share a patch (at least one A is a B). No A is B: the two circles stay apart and do not touch.\n\nThe favourite trap is extra overlap. If the sentences do not force two circles to meet, you must not draw them meeting — and you also must not swear they never meet. A conclusion is definite only when every allowed drawing agrees.",
      howTo: [
        "Write the premises. For each, draw a fresh pair of circles (all = inside, some = forced overlap, no = apart).",
        "Do not add a meeting or a gap that the sentences did not force. If two drawings are both legal, keep both.",
        "Read conclusion I. Tick it only if it is true in every legal drawing.",
        "Read conclusion II the same way. If I is true in one drawing and false in another, I does not follow.",
        "Watch reverses: All A are B does not mean All B are A. Two ‘some’ sentences do not chain.",
      ],
      bullets: [
        "Definite = true in every legal Venn. If two drawings disagree, it does not follow.",
        "Never add extra overlap. ‘Some B are C’ need not touch A even if All A are B.",
        "All A are B plus All B are C does give All A are C. Two ‘somes’ do not.",
      ],
      examples: [
        {
          title: "Do not add extra overlap",
          prompt:
            "Statements: All cats are animals. Some animals are brown. Conclusions: I. Some cats are brown. II. No cat is brown. Which follows as definite?",
          steps: [
            {
              do: "Draw circle Cat fully inside circle Animal (All cats are animals).",
              why: "‘All A are B’ means every cat sits in the animal circle. Cat cannot stick out.",
            },
            {
              do: "Draw a Brown patch that cuts the Animal circle. That is ‘Some animals are brown’.",
              why: "‘Some’ only forces a meeting of Animal and Brown. It does not say where that meeting sits.",
            },
            {
              do: "First legal picture: put the Brown patch only in Animal-but-not-Cat. Then I is false and II is true in this picture.",
              why: "The brown animals can all be dogs or cows. Cats need not be brown.",
            },
            {
              do: "Second legal picture: slide Brown so it also cuts Cat. Then I is true and II is false in this picture.",
              why: "The premises still hold: cats are still inside animals, and some animals are still brown.",
            },
            {
              do: "I is not true in every picture. II is not true in every picture. Tick neither.",
              why: "A definite conclusion needs every allowed Venn to agree. Extra overlap was never forced, and a total ban on overlap was never forced either.",
            },
            {
              do: "Reject ‘All brown things are cats’ and ‘All animals are cats’ if those appear as options.",
              why: "Those reverse ‘All cats are animals’. Reversing ‘all’ is a standard wrong tick.",
            },
          ],
          result:
            "Neither I nor II is definite. Some cats may be brown, but you must not add that overlap, and you must not forbid it.",
        },
        {
          title: "All + all chains",
          prompt:
            "Statements: All roses are flowers. All flowers are plants. Conclusions: I. All roses are plants. II. Some plants are roses. III. Some plants are not roses. Which follow?",
          steps: [
            {
              do: "Draw Rose inside Flower, and Flower inside Plant. So Rose sits inside Plant.",
              why: "Two ‘all’ sentences chain: All A are B and All B are C means All A are C.",
            },
            {
              do: "Tick I: All roses are plants.",
              why: "The inner circle cannot leave the outer circle. Every legal drawing has this.",
            },
            {
              do: "Tick II: Some plants are roses.",
              why: "The roses themselves are plants, so at least those plants are roses. Exam syllogism treats ‘all’ as having members, so conversion All A are B gives Some B are A.",
            },
            {
              do: "Leave III unticked: Some plants are not roses.",
              why: "Plant may be bigger than Rose, but the three circles could also be the same size. III is possible, not definite.",
            },
            {
              do: "Reject ‘No rose is a plant’ if it appears.",
              why: "That fights I. A ‘no’ cannot follow from two ‘alls’ in a chain.",
            },
            {
              do: "Final ticks: I and II only.",
              why: "Chain the insides for ‘all’. Convert the outer circle for ‘some’. Do not force a leftover ring for ‘some not’.",
            },
          ],
          result: "Only I and II follow. III is a possible leftover, not a must.",
        },
        {
          title: "No + all gives no",
          prompt:
            "Statements: No dog is a cat. All puppies are dogs. Conclusions: I. No puppy is a cat. II. Some cats are puppies. III. All cats are puppies. Which follow?",
          steps: [
            {
              do: "Draw Dog and Cat as two circles that do not touch (No dog is a cat).",
              why: "‘No A is B’ means the sets are disjoint. No shared patch.",
            },
            {
              do: "Put Puppy fully inside Dog (All puppies are dogs).",
              why: "Every puppy is a dog, so the puppy circle cannot leave the dog circle.",
            },
            {
              do: "Puppy sits inside a circle that never meets Cat, so Puppy never meets Cat. Tick I.",
              why: "All C are B, and No A is B, gives No C is A. Here C = puppy, B = dog, A = cat.",
            },
            {
              do: "II needs a meeting of Cat and Puppy. The drawing forbids that meeting. II fails.",
              why: "You must not add extra overlap against a ‘no’.",
            },
            {
              do: "III puts all cats inside puppies, which would put cats inside dogs and break ‘No dog is a cat’. III fails.",
              why: "An ‘all’ in the reverse direction is even stronger than the illegal ‘some’.",
            },
            {
              do: "Tick I only.",
              why: "A clean ‘no’ plus an inner ‘all’ still gives a ‘no’ on the inner circle. Do not invent a meeting.",
            },
          ],
          result: "Only I follows: no puppy is a cat. II and III need a meeting that the ‘no’ bans.",
        },
      ],
    },
    {
      heading: "Conversions and only-a-few",
      body: "Some conclusions are just a rewrite of one premise. That rewrite is called conversion. All A are B gives Some B are A (and Some A are B). No A is B gives No B is A. Some A are B gives Some B are A. Some A are not B does not convert to Some B are not A.\n\nOnly a few A are B means two things at once: Some A are B, and Some A are not B. The trap is treating ‘only a few’ as a plain ‘some’ (you drop the ‘some not’) or as ‘only A are B’ (which means All B are A — a different sentence).",
      howTo: [
        "If the conclusion uses the same two terms as one premise, try conversion first before drawing a big chain.",
        "Flip All A are B into Some B are A. Flip No A is B into No B is A. Flip Some A are B into Some B are A.",
        "Do not flip Some A are not B. That conversion is not safe.",
        "If you see ‘only a few A are B’, write two ticks: Some A are B, and Some A are not B. Then combine with the other premises.",
        "Do not mix up ‘only a few A are B’ with ‘only A are B’. The second means All B are A.",
      ],
      bullets: [
        "Safe flips: all → some the other way; no ↔ no; some ↔ some. Not ‘some not’.",
        "Only a few A are B = some A are B AND some A are not B.",
        "Two ‘some’ premises still do not chain. Conversion is not a chain.",
      ],
      examples: [
        {
          title: "Safe conversion of all and some",
          prompt:
            "Statement: All banks are offices. Conclusions: I. Some offices are banks. II. Some banks are offices. III. All offices are banks. Which follow?",
          steps: [
            {
              do: "Draw Bank inside Office.",
              why: "All banks are offices. The inner circle may be smaller, or the two circles may match.",
            },
            {
              do: "Tick I: Some offices are banks.",
              why: "The banks themselves are offices, so some offices (at least those) are banks. This is the exam conversion of ‘all’.",
            },
            {
              do: "Tick II: Some banks are offices.",
              why: "That is just a weaker reading of All banks are offices. Every bank is an office, so some are.",
            },
            {
              do: "Leave III: All offices are banks.",
              why: "That reverses the ‘all’. Office can be bigger. The reverse is not forced.",
            },
            {
              do: "If a fourth line said ‘No bank is an office’, reject it.",
              why: "It fights the given ‘all’.",
            },
            {
              do: "Answer: I and II follow; III does not.",
              why: "Conversion of ‘all’ gives ‘some’ both ways. It never gives the reverse ‘all’.",
            },
          ],
          result: "I and II follow. III is the illegal reverse of ‘all’.",
        },
        {
          title: "Only a few means some and some-not",
          prompt:
            "Statements: Only a few cups are plates. All plates are bowls. Conclusions: I. Some cups are bowls. II. Some cups are not plates. III. All cups are bowls. Which follow?",
          steps: [
            {
              do: "Rewrite ‘Only a few cups are plates’ as two facts: Some cups are plates, and Some cups are not plates.",
              why: "That is the meaning of ‘only a few’. You need both the overlap and the leftover.",
            },
            {
              do: "Tick II at once: Some cups are not plates.",
              why: "It is half of the ‘only a few’ sentence. No extra drawing needed.",
            },
            {
              do: "The cups that are plates sit inside Bowl, because All plates are bowls. So some cups are bowls. Tick I.",
              why: "Some A are B plus All B are C gives Some A are C. Here A = cups, B = plates, C = bowls.",
            },
            {
              do: "Leave III: All cups are bowls.",
              why: "Only some cups are plates. The leftover cups (the ‘some not plates’) need not be bowls.",
            },
            {
              do: "Do not tick ‘All bowls are cups’ or ‘Only cups are bowls’.",
              why: "Those mix up ‘only a few’ with ‘only A are B’ (All B are A).",
            },
            {
              do: "Answer: I and II follow; III does not.",
              why: "Keep both halves of ‘only a few’, then chain only the overlap through ‘all plates are bowls’.",
            },
          ],
          result:
            "I and II follow. ‘Only a few’ already gives II. The overlap plus ‘all plates are bowls’ gives I. III is too strong.",
        },
        {
          title: "Some-not from all plus no",
          prompt:
            "Statements: All pens are tools. No tool is a toy. Conclusions: I. Some pens are not toys. II. Some tools are pens. III. Some toys are pens. Which follow?",
          steps: [
            {
              do: "Draw Pen inside Tool. Draw Toy fully apart from Tool.",
              why: "All pens are tools, and no tool is a toy, so the toy circle never meets the tool circle.",
            },
            {
              do: "Pen sits inside Tool, so Pen also never meets Toy. No pen is a toy.",
              why: "Same ‘no + all’ chain as in Venn: the inner circle inherits the gap.",
            },
            {
              do: "Tick I: Some pens are not toys.",
              why: "If no pen is a toy, then (with pens existing) some pens are not toys. This is the ‘some not’ that does follow.",
            },
            {
              do: "Tick II: Some tools are pens.",
              why: "Conversion of All pens are tools. Safe flip.",
            },
            {
              do: "Leave III: Some toys are pens.",
              why: "That needs a meeting that ‘no tool is a toy’ forbids. Do not convert ‘some not’ into a meeting the other way.",
            },
            {
              do: "Answer: I and II follow.",
              why: "‘Some not’ is definite here because a full ‘no’ sits under it. III is extra overlap against a ‘no’.",
            },
          ],
          result: "I and II follow. III is an illegal meeting. ‘Some not’ is safe when a full ‘no’ supports it.",
        },
      ],
    },
    {
      heading: "Coded inequality — decode, then walk the chain",
      body: "A coded inequality replaces >, ≥, =, ≤, < with signs such as @, *, #, $, &. First decode onto a single chain of letters. Then walk from one letter to the other. A definite > needs a same-direction path with at least one strict > (or < the other way) and no break the other way.\n\nThe trap is comparing across a break. In P > Q ≥ R = S < T you can say P > S, but you cannot say Q < T, because after S the chain goes up. When a < and a > fight in the same walk, the pair cannot be compared.",
      howTo: [
        "Copy the code key: which symbol is >, ≥, =, ≤, <.",
        "Rewrite the whole statement as one chain of letters and real signs. Do not compare on the coded symbols.",
        "To test ‘A > B’, walk from A to B. You need every step ≥ or = in that direction, plus at least one strict >.",
        "If the walk goes up and then down (or down then up), stop. Those two letters cannot be compared.",
        "Tick ‘either I or II’ only when the two conclusions are complements (one of them must hold, and they cannot both hold). Two ‘maybes’ are not either/or.",
      ],
      bullets: [
        "Decode first. Never walk on @ and * until they are >, ≥, =, ≤, <.",
        "A definite > needs a one-way path with a strict step and no opposing break.",
        "A < facing a > in the same walk means ‘cannot say’.",
      ],
      examples: [
        {
          title: "Walk P > Q ≥ R = S < T",
          prompt:
            "Statements: P > Q ≥ R = S < T. Conclusions: I. P > S. II. Q < T. Options: only I, only II, both, neither.",
          steps: [
            {
              do: "Write the chain as given: P > Q ≥ R = S < T. No code to decode this time.",
              why: "The walk test is the same for plain and coded items. Start with a clean line.",
            },
            {
              do: "Walk P to S: P > Q ≥ R = S. All steps go the same way, and there is a strict >. Tick I.",
              why: "P is above Q, and Q is at least S, so P is strictly above S.",
            },
            {
              do: "Walk Q to T: Q ≥ R = S < T. After S the chain rises to T.",
              why: "That is a down-then-up break. Q could be 10, S = 8, T = 9 (Q > T) or Q = 8, T = 12 (Q < T).",
            },
            {
              do: "Leave II. Q and T cannot be compared.",
              why: "Both Q < T and Q > T (and Q = T) can be drawn. A definite conclusion needs one result only.",
            },
            {
              do: "Do not pick ‘either’. I is already definite, and II is not the complement of I.",
              why: "Either/or is for a pair such as A > B versus A ≤ B covering every case. That is not this pair.",
            },
            {
              do: "Answer: only I.",
              why: "The limb S < T does not licence a comparison between Q and T.",
            },
          ],
          result: "Only I follows (P > S). Q and T are incomparable.",
        },
        {
          title: "Decode @ * # $ then walk",
          prompt:
            "A @ B means A ≥ B, A * B means A > B, A # B means A = B, A $ B means A ≤ B. Statement: M * N @ P # Q $ R. Conclusions: I. M > Q. II. N ≥ R.",
          steps: [
            {
              do: "Decode each pair: M * N is M > N. N @ P is N ≥ P. P # Q is P = Q. Q $ R is Q ≤ R.",
              why: "The mapping is in the question, not in memory. Write the real signs before any comparison.",
            },
            {
              do: "Chain: M > N ≥ P = Q ≤ R.",
              why: "One line lets you see breaks. Do not jump from the coded string.",
            },
            {
              do: "Walk M to Q: M > N ≥ P = Q. Same direction, with a strict >. Tick I: M > Q.",
              why: "M is above N, and N is at least Q, so M is strictly above Q.",
            },
            {
              do: "Walk N to R: N ≥ P = Q ≤ R. After Q the chain may rise to R.",
              why: "N is at least Q, and Q is at most R, so N versus R is open: N could be 5 and R 9, or N 12 and R 9.",
            },
            {
              do: "Leave II. N ≥ R does not follow.",
              why: "You would need a ≥ path from N down to R with no opposing rise. The ≤ after Q is that rise.",
            },
            {
              do: "If a third line said M > R, leave that too: M > Q ≤ R still has a break.",
              why: "A strict lead on the left of a ≤ does not decide the right end.",
            },
          ],
          result: "Only I (M > Q). N ≥ R does not follow from N ≥ Q ≤ R.",
        },
        {
          title: "Both follow when there is no break",
          prompt:
            "A ≥ B > C = D ≥ E. Conclusions: I. A > E. II. B > D. Both, only I, only II, or neither?",
          steps: [
            {
              do: "Write the chain: A ≥ B > C = D ≥ E.",
              why: "Same-direction signs all the way from A to E, with a strict > in the middle.",
            },
            {
              do: "Walk A to E. There is a strict > between B and C, and every other sign is ≥ or =. Tick I: A > E.",
              why: "A cannot equal E, because B is already strictly above C on that path.",
            },
            {
              do: "Walk B to D: B > C = D, so B > D. Tick II.",
              why: "The equals sign copies C onto D. A strict drop to C is a strict drop to D.",
            },
            {
              do: "No opposing break in either walk. Pick both, not either.",
              why: "Both conclusions are definite. Either/or would need a complementary pair, which this is not.",
            },
            {
              do: "Reject A = E if it appears. The middle > kills equality.",
              why: "I is strict >, not ≥. That matches the stated I.",
            },
            {
              do: "Answer: both I and II follow.",
              why: "Same-direction path plus a strict step is the whole test. Here both walks pass.",
            },
          ],
          result: "Both I and II follow (A > E and B > D).",
        },
      ],
    },
    {
      heading: "Blood relations — draw generations",
      body: "Turn every phrase into a small family tree before you look at options. Put older people on a higher line and children on the next line down. Mark gender when you know it (box for male, circle for female, or just write M/F). ‘Only son’ and ‘only daughter’ close extra branches.\n\nThe trap is skipping a generation or guessing gender. ‘Son of my grandfather’s only son’ is the speaker or the speaker’s brother — not the father and not an uncle. In-laws (brother-in-law, sister-in-law) need two candidate pictures until a clue picks one.",
      howTo: [
        "Replace ‘my’ with the speaker’s name. Pointing-to-a-photo items: the photo is ‘he’ or ‘she’, not the speaker, unless the line says so.",
        "Draw one line per generation. Couple on the same line; their children on the line below.",
        "Honour ‘only’: only son means that man has no brother. Only daughter means no second daughter.",
        "For coded relations (A + B means A is father of B), decode each pair into a labelled arrow, then join at the shared person.",
        "Name the asked person relative to the other person. If two answers remain (himself or brother), that pair is often the key.",
      ],
      bullets: [
        "Grandfather’s only son = the speaker’s father (one son on that line).",
        "That father’s son = the speaker or the speaker’s brother.",
        "Draw generations. Do not jump uncle / cousin without an extra sibling on the upper line.",
      ],
      examples: [
        {
          title: "Photograph — grandfather’s only son",
          prompt:
            "Pointing to a photograph, Ravi says, ‘He is the son of my grandfather’s only son.’ The person is Ravi’s: (A) brother or himself (B) uncle (C) cousin (D) father.",
          steps: [
            {
              do: "Draw Ravi’s grandfather on the top line. ‘Only son’ of that grandfather is one man on the next line.",
              why: "Only one son means no second son, so that man is Ravi’s father, not an uncle.",
            },
            {
              do: "The photo is ‘the son of’ that man, so the photo is a son of Ravi’s father.",
              why: "Sons of Ravi’s father are Ravi and any brothers Ravi has.",
            },
            {
              do: "Reject (D) father. The father is ‘the only son’, not ‘the son of the only son’.",
              why: "The sentence has two steps down from grandfather: only son, then that man’s son.",
            },
            {
              do: "Reject (B) uncle and (C) cousin.",
              why: "Uncle would need a second son of the grandfather. Cousin would need an uncle’s child. ‘Only’ forbids that branch.",
            },
            {
              do: "Keep (A): brother or himself.",
              why: "The stem does not say whether Ravi has a brother, so both remain. That is the designed answer.",
            },
            {
              do: "Gender check: the photo is ‘he’, so a male. That still fits Ravi or a brother.",
              why: "Do not assume the speaker is or is not in the photo until the options force it.",
            },
          ],
          result: "(A) brother or himself. Not uncle, cousin, or father.",
        },
        {
          title: "Three generations on a tree",
          prompt:
            "A is the father of B. B is the sister of C. C is the father of D. How is A related to D?",
          steps: [
            {
              do: "Top line: A (male). Next line: A’s child B. B is sister of C, so C is also A’s child, on the same line as B.",
              why: "Sister means B is female and shares a parent with C. A is father of B, so A is also father of C unless a different parent is named — here there is none.",
            },
            {
              do: "Mark C as male, because C is the father of D. Put D on the line below C.",
              why: "Father is a generation down. D is C’s child, so D is A’s grandchild.",
            },
            {
              do: "B’s gender is female; C’s gender is male. D’s gender is not given.",
              why: "‘Father of D’ does not say whether D is a son or a daughter. The relation of A to D does not need D’s gender.",
            },
            {
              do: "A is male and two generations above D, through C (A’s son). A is D’s grandfather (paternal).",
              why: "The path is A → C → D, both steps father-to-child.",
            },
            {
              do: "Reject uncle, brother, and father.",
              why: "Uncle would be a brother of C. Father would be C. Brother would be the same generation as D.",
            },
            {
              do: "Answer: A is D’s grandfather.",
              why: "Three lines on the page: A; then B and C; then D under C.",
            },
          ],
          result: "A is D’s grandfather. D’s gender is open.",
        },
        {
          title: "Coded: mother, father, sister",
          prompt:
            "P × Q means P is the mother of Q. P + Q means P is the father of Q. P − Q means P is the sister of Q. Expression: A × B + C − D. How is A related to D?",
          steps: [
            {
              do: "Decode A × B: A is mother of B. A is female. B is A’s child (gender still open).",
              why: "Each code is one labelled edge. Do not combine until each pair is a sentence.",
            },
            {
              do: "Decode B + C: B is father of C. So B is male. B is A’s son, and C is B’s child — A’s grandchild.",
              why: "The shared person is B. Mother-of-B plus B-is-father-of-C stacks two generations.",
            },
            {
              do: "Decode C − D: C is sister of D. C is female. D is C’s sibling, also B’s child, also A’s grandchild.",
              why: "Sister places C and D on the same generation. D’s gender is still open.",
            },
            {
              do: "A is the mother of D’s father B, so A is D’s paternal grandmother.",
              why: "Three generations: A (female) → B (male) → C and D.",
            },
            {
              do: "Do not claim D is female. ‘C is sister of D’ does not fix D.",
              why: "D can be a brother or a sister. Grandmother holds either way.",
            },
            {
              do: "Answer: A is D’s grandmother.",
              why: "Coded items fail when you skip a generation or assign a gender the code did not give.",
            },
          ],
          result: "A is D’s grandmother (paternal). D’s gender is open.",
        },
      ],
    },
    {
      heading: "Direction sense — N E S W, turns, shortest path",
      body: "Draw a plus sign every time: North up, East right, South down, West left. A person facing North who turns right faces East; left faces West; about-turn faces South. Write each walking leg as a length on that plus. Location (‘where is she from the start?’) is not the same as facing (‘which way is she looking?’).\n\nThe trap is answering with the last facing when the question asked for location — or adding the walking legs when the question asked for shortest distance. Shortest distance is the straight line, often a leftover on one axis, or √(x² + y²) on a right triangle.",
      howTo: [
        "Sketch N (up), E (right), S (down), W (left). Mark the start as (0, 0) if a distance is asked.",
        "For each leg: move the stated length, then if there is a turn, turn from the heading you just walked.",
        "Right from North = East. Right from East = South. Right from South = West. Right from West = North. Left is the other way.",
        "After the last leg, read the question: facing, or location from start, or shortest distance.",
        "Shortest distance: cancel opposite legs, then if two leftover legs are perpendicular, use √(a² + b²). Do not add the walking total.",
      ],
      bullets: [
        "North up, East right. Right turn from North = East.",
        "Location of a point and facing of a person are different questions.",
        "Shortest path is the leftover triangle, not the sum of the walk.",
      ],
      examples: [
        {
          title: "Two right turns — location versus facing",
          prompt:
            "Priya walks 8 km north, turns right, walks 6 km, turns right, walks 8 km. How far and in which direction is she from the start? Which way does she face now?",
          steps: [
            {
              do: "Put start at (0, 0). First leg 8 km north to (0, 8). She is heading north.",
              why: "North is +y. The first verb is ‘walks north’, so that is both the move and the heading.",
            },
            {
              do: "Turn right from north: she now faces east. Walk 6 km to (6, 8).",
              why: "Right from North is East. East is +x.",
            },
            {
              do: "Turn right from east: she now faces south. Walk 8 km to (6, 0).",
              why: "Right from East is South. South is −y. The 8 km south cancels the 8 km north.",
            },
            {
              do: "From start (0, 0) to (6, 0): 6 km due east. That is location.",
              why: "The north and south legs cancel. Only the 6 km east remains.",
            },
            {
              do: "She faces south (last heading). Do not answer ‘south’ for the location question.",
              why: "The trap is mixing facing with ‘in which direction from the start’.",
            },
            {
              do: "Answer both parts separately: 6 km east of start, facing south.",
              why: "Distance 6 km, direction east, facing south. Three different words.",
            },
          ],
          result: "6 km east of the start; facing south.",
        },
        {
          title: "Shortest distance after a dog-leg",
          prompt:
            "A man walks 12 km west, then 5 km south, then 12 km east. How far is he from the start, and in which direction?",
          steps: [
            {
              do: "Start (0, 0). West 12 km to (−12, 0).",
              why: "West is −x. Write the point; do not keep the path in your head.",
            },
            {
              do: "South 5 km to (−12, −5).",
              why: "South is −y.",
            },
            {
              do: "East 12 km to (0, −5).",
              why: "East +12 cancels the first west 12. Only the south 5 remains.",
            },
            {
              do: "He is 5 km due south of the start. Straight-line distance = 5 km.",
              why: "The leftover is on one axis, so Pythagoras is not needed.",
            },
            {
              do: "Reject 29 km (12+5+12) and reject 17 km (12+5).",
              why: "Those are walking distance, or a partial sum. The question asked how far he is, meaning the straight leftover.",
            },
            {
              do: "If the last leg had been 9 km east he would be at (−3, −5), distance √(9+25)=√34. Here it is simply 5 km south.",
              why: "Use √(x²+y²) only when two leftover legs remain.",
            },
          ],
          result: "5 km due south of the start. Walking distance 29 km is the trap.",
        },
        {
          title: "Who is north-west of whom",
          prompt:
            "From point P, X walks 10 km east and Y walks 10 km north. Who is north-west of whom? What is the straight-line XY?",
          steps: [
            {
              do: "P at (0, 0). X at (10, 0). Y at (0, 10).",
              why: "East is +x for X. North is +y for Y. Same start, two different ends.",
            },
            {
              do: "Vector from X to Y: (−10, +10) — 10 west and 10 north. Y is north-west of X.",
              why: "‘A is north-west of B’ means A sits in the north-west from B. Here A = Y, B = X.",
            },
            {
              do: "Vector from Y to X: (+10, −10) — south-east. X is south-east of Y, not north-west.",
              why: "The trap is flipping the ‘of’. Always read from the second name.",
            },
            {
              do: "Straight-line XY = √(10² + 10²) = √200 = 10√2 km.",
              why: "The leftover is a right triangle with equal legs. Walking total 20 km is not the answer.",
            },
            {
              do: "If the question asked ‘in which direction is X from Y’, the answer is south-east.",
              why: "Location of X as seen from Y is the opposite compass of Y as seen from X.",
            },
            {
              do: "Answer: Y is north-west of X; XY = 10√2 km.",
              why: "Draw both paths on one plus sign, then read one vector and one hypotenuse.",
            },
          ],
          result: "Y is north-west of X. Straight-line XY = 10√2 km.",
        },
      ],
    },
    {
      heading: "Letter coding — +1, −1, and reverse alphabet",
      body: "Letter coding hides a regular alphabet trick. The cheap one is a uniform shift: each letter +1 (SEBI → TFCJ) or each letter −1. Another regular is reverse alphabet: A pairs with Z, B with Y, position k pairs with 27 − k. A third is reverse the word first, then shift.\n\nThe trap is mixing two rules. If SEBI → TFCJ is +1, do not also reverse NIFTY. Check the last letter first so you do not decode four letters and then guess the fifth. The option that is every letter −1 is the usual distractor for a +1 stem.",
      howTo: [
        "Compare the first given pair letter by letter: S to T, E to F, and so on. Write +1, −1, reverse, or reverse-then-shift.",
        "Confirm the same rule on the last letter of that pair. If the last letter disagrees, the rule is mixed (often reverse then shift).",
        "Apply only that rule to the asked word. Work every letter. Do not skip the last one.",
        "Opposite letter of position k is 27 − k (A = 1, Z = 26).",
        "Kill options that are the opposite shift (−1 when the stem was +1) or that drop the last letter.",
      ],
      bullets: [
        "Uniform +1: check the last letter first, then fill the rest.",
        "Opposite of k is 27 − k. A↔Z, B↔Y, C↔X.",
        "One rule per item. MJESX is the −1 trap for a +1 stem.",
      ],
      examples: [
        {
          title: "SEBI → TFCJ, code NIFTY",
          prompt:
            "In a certain code SEBI is written as TFCJ. How is NIFTY written? (A) OJGUZ (B) MJESX (C) OHGSX (D) OJGUX",
          steps: [
            {
              do: "S→T is +1, E→F is +1, B→C is +1, I→J is +1. The rule is uniform +1. No reverse.",
              why: "Every letter moved one step forward. If it had been reverse-then-+1, SEBI reversed is IBES, which is not TFCJ.",
            },
            {
              do: "N+1 = O, I+1 = J, F+1 = G, T+1 = U, Y+1 = Z. That is O-J-G-U-Z.",
              why: "Apply the same +1 to each letter of NIFTY. Do not skip Y.",
            },
            {
              do: "Last-letter check: Y must become Z. Only (A) OJGUZ ends with Z.",
              why: "Checking the last letter first would have killed (D) OJGUX immediately.",
            },
            {
              do: "Reject (B) MJESX: that is each letter −1.",
              why: "N→M, I→H would be −1; the option is the standard opposite-shift trap.",
            },
            {
              do: "Reject (C) OHGSX: it mishandles I and T.",
              why: "A mixed skip is not the stem’s rule. Stick to one shift.",
            },
            {
              do: "Answer (A) OJGUZ.",
              why: "Uniform +1, last letter Z, no reverse.",
            },
          ],
          result: "OJGUZ (each letter +1). MJESX is the minus-one trap.",
        },
        {
          title: "Reverse alphabet: HOLD → SLOW",
          prompt:
            "If HOLD is coded as SLOW, decode the rule, then code MINT.",
          steps: [
            {
              do: "Positions: H=8, opposite 27−8=19=S. O=15, 27−15=12=L. L=12, 27−12=15=O. D=4, 27−4=23=W. HOLD → SLOW.",
              why: "Each letter maps to its opposite in the alphabet. That is not +1 (that would be IPME).",
            },
            {
              do: "M=13, 27−13=14=N. I=9, 27−9=18=R. N=14, 27−14=13=M. T=20, 27−20=7=G.",
              why: "Same opposite rule on MINT, letter by letter.",
            },
            {
              do: "Write NRMG. Checksum: first letter M (13) opposite N; last letter T opposite G.",
              why: "If an option ends in H you used 27−19 by mistake, or you shifted instead of reversing.",
            },
            {
              do: "Reject NJOS (that would be +1) and LHMS (that would be −1).",
              why: "This item is opposite letters, not a Caesar shift. Do not reuse the SEBI rule.",
            },
            {
              do: "A↔Z, B↔Y is the same map: M is the 13th letter, opposite the 14th letter N.",
              why: "You can count in from both ends of the alphabet if you do not want 27−k.",
            },
            {
              do: "Answer: MINT → NRMG.",
              why: "Each letter’s opposite. Last-letter G is the checksum.",
            },
          ],
          result: "MINT → NRMG (opposite letters). Not +1 and not −1.",
        },
        {
          title: "Reverse the word, then +1",
          prompt:
            "If RBI is coded as JCS, test the rule ‘reverse then +1’, then code NABARD under that rule.",
          steps: [
            {
              do: "Reverse RBI: IBR. Then +1 on each letter: JCS. That matches the stem.",
              why: "Uniform +1 without reverse would be SCJ, not JCS. The reverse step is required.",
            },
            {
              do: "NABARD reversed is DRABAN.",
              why: "Write the reverse in full before you shift. Do not shift and reverse in one messy pass.",
            },
            {
              do: "Add 1: D→E, R→S, A→B, B→C, A→B, N→O. Code = ESBCBO.",
              why: "Same two-step rule as the stem. Every letter, including the last.",
            },
            {
              do: "Checksum: the first letter of NABARD is N, which becomes the last letter of the reverse, then +1 = O. The code must end with O.",
              why: "Last-letter check again. If an option ends with N or P, the reverse or the shift slipped.",
            },
            {
              do: "Under this rule SEBI would be JCFT (reverse IBES, then +1), not TFCJ.",
              why: "Each question has its own code. Do not carry +1-without-reverse into this item.",
            },
            {
              do: "Answer: NABARD → ESBCBO.",
              why: "Reverse first, then +1. End letter O.",
            },
          ],
          result: "NABARD → ESBCBO. Reverse, then each letter +1.",
        },
      ],
    },
    {
      heading: "Number and symbol coding",
      body: "Number coding turns words into digits, or turns letters into their place-values. Symbol coding swaps operators (+ means ×) or gives a number-code for each word in a short sentence. Always find what is common: the word that repeats and the digit that repeats are a pair.\n\nThe trap is adding the wrong letters, or assigning a repeating digit to a word that does not repeat. Decode the key first, then apply it. After operator swaps, use normal order of operations on the decoded expression unless the paper says left-to-right only.",
      howTo: [
        "Letter-to-number: write A=1 … Z=26 (or the reverse A=26 … Z=1 if the stem fits that). Sum or list as the stem requires.",
        "Sentence-to-digits: underline the word that appears in two lines, and the digit that appears in those same two lines. That digit is that word.",
        "Repeat until each word has a digit. The leftover word takes the leftover digit.",
        "Operator swap: rewrite the expression with the real signs, then compute with BODMAS.",
        "Never reuse a letter-coding shift here. This is numbers and symbols, not +1 on letters.",
      ],
      bullets: [
        "Repeating word + repeating digit = a matched pair.",
        "A=1 … Z=26 unless the stem uses reverse place-value.",
        "Swap the operators first; then compute. Do not compute on the printed signs.",
      ],
      examples: [
        {
          title: "Place-value sum",
          prompt:
            "If CAT is coded as 24 (C=3, A=1, T=20, sum), how is DOG coded? How is BAT coded?",
          steps: [
            {
              do: "Confirm the rule on CAT: C=3, A=1, T=20. 3+1+20=24. Sum of place-values, A=1.",
              why: "The stem already states the map. Check it so you do not use reverse place-value by habit.",
            },
            {
              do: "DOG: D=4, O=15, G=7. Sum 4+15+7=26.",
              why: "Same map, every letter. O is 15, not 0.",
            },
            {
              do: "BAT: B=2, A=1, T=20. Sum 2+1+20=23.",
              why: "BAT is CAT with C replaced by B, so the code should drop by 1: 24−1=23. Matches.",
            },
            {
              do: "Reject 26 as a code for BAT, and reject 6+15+7=28 if someone used F for G.",
              why: "Off-by-one on a letter is the usual slip. Recheck G=7 and B=2.",
            },
            {
              do: "If a later item used reverse place-value, CAT would be 24+26+7=57. That is a different rule.",
              why: "Do not mix A=1 with A=26 in one item.",
            },
            {
              do: "Answers: DOG = 26, BAT = 23.",
              why: "Place-value sum with A=1.",
            },
          ],
          result: "DOG = 26. BAT = 23. Rule = sum of A=1 positions.",
        },
        {
          title: "Which digit means which word",
          prompt:
            "In a code, 247 means ‘eat hot food’, 256 means ‘hot red chilli’, 367 means ‘eat cold chilli’. What is the code for ‘cold’? What is the code for ‘food’?",
          steps: [
            {
              do: "247 = eat hot food. 256 = hot red chilli. The common word is hot. The common digit is 2. So 2 = hot.",
              why: "A word that repeats and a digit that repeats on the same two lines are a pair.",
            },
            {
              do: "247 = eat hot food. 367 = eat cold chilli. Common word eat. Common digit 7. So 7 = eat.",
              why: "Same matching on a different pair of lines.",
            },
            {
              do: "247 is 2=hot, 7=eat, leftover 4. Leftover word is food. So 4 = food.",
              why: "Once two of three are known, the last digit is the last word.",
            },
            {
              do: "256 and 367 both have chilli. Common digit now (after 2 and 7 are used) is 6. So 6 = chilli. Then 256 leftover 5 = red. 367 leftover 3 = cold.",
              why: "chilli is in 256 and 367. Digits of 256 are 2,5,6; of 367 are 3,6,7. Shared leftover is 6.",
            },
            {
              do: "Code for cold is 3. Code for food is 4.",
              why: "Read back: 367 = 3 cold, 6 chilli, 7 eat. 247 = 2 hot, 4 food, 7 eat. Fits every line.",
            },
            {
              do: "Reject 6 for cold (that is chilli) and 2 for food (that is hot).",
              why: "The trap is pairing a leftover digit with a repeating word.",
            },
          ],
          result: "cold = 3. food = 4. (hot=2, eat=7, chilli=6, red=5)",
        },
        {
          title: "Operator swap, then compute",
          prompt:
            "If + means ×, × means +, − means ÷, and ÷ means −, what is the value of 8 + 2 × 4 − 2?",
          steps: [
            {
              do: "Rewrite every sign: + becomes ×, × becomes +, − becomes ÷. Do not compute yet.",
              why: "The printed 8 + 2 is not a sum. Computing on the page signs is the trap.",
            },
            {
              do: "The expression becomes 8 × 2 + 4 ÷ 2.",
              why: "8 + 2 → 8 × 2. 2 × 4 → 2 + 4. 4 − 2 → 4 ÷ 2. The digits stay; only signs change.",
            },
            {
              do: "BODMAS on the decoded line: × and ÷ first. 8 × 2 = 16. 4 ÷ 2 = 2.",
              why: "After the swap we use ordinary order, unless the paper says left-to-right only (it did not).",
            },
            {
              do: "Then 16 + 2 = 18.",
              why: "The leftover sign is +.",
            },
            {
              do: "Reject 8 + 2 × 4 − 2 computed on the printed signs (that would be 8+8−2=14).",
              why: "That ignores the code. Also reject 8 × 2 + 4 − 2 = 18 then minus 2 as if − stayed minus.",
            },
            {
              do: "Answer 18.",
              why: "Decode, then ordinary ×÷ before +−.",
            },
          ],
          result: "18. Decoded line is 8 × 2 + 4 ÷ 2 = 16 + 2 = 18.",
        },
      ],
    },
    {
      heading: "Linear seating — left and right from the person’s view",
      body: "People in a straight row. Left and right are from each sitter’s view, not from yours if they face you. If everyone faces north, their left is west and their right is east. Draw the row west → east as left → right on the page, so their left matches the left of your drawing.\n\nThe trap is flipping left/right because ‘I am looking at them’. If they face south, their left is east — the left of the page is then their right. Always say it in words: ‘A sits 2nd left of B, so from our left the row is …’.",
      howTo: [
        "Note the facing. Facing north: person’s left = west. Facing south: person’s left = east.",
        "Number seats 1…n from west to east (left to right on the page when north is up).",
        "Place the end clues and any fixed seat first. Then place ‘second to the left of B’ as two seats toward B’s left.",
        "Say the row out loud after each clue: ‘from our left: empty, A, C, B, …’.",
        "Immediate neighbours fill both sides of a person without yet saying who is left. A later left/right clue locks the side.",
        "If a clue fights the drawing, an earlier optional branch was wrong. Keep two sketches until one dies.",
      ],
      bullets: [
        "Facing north: left = west = left of the page. Facing south: left = east.",
        "‘A sits 2nd left of B’ = skip one seat in B’s left direction, then put A.",
        "Never put two people in one seat. Ends are the cheapest clues.",
      ],
      examples: [
        {
          title: "Six facing north — speak the row",
          prompt:
            "A, B, C, D, E, F sit in a row facing north (their left is west). B sits third from the right end. A sits second to the left of B. C sits immediate right of A. F sits at the right end. D is not next to F. Who sits where from left to right?",
          steps: [
            {
              do: "Seats 1–6 west to east, left to right on the page. Right end is seat 6. B is third from the right: seats 6,5,4 so B is at 4.",
              why: "Facing north, right = east = toward seat 6. Third from that end is seat 4.",
            },
            {
              do: "A sits 2nd left of B. B’s left is west. From seat 4, one left is 3, two left is 2. Put A at 2. From our left the row is: empty, A, empty, B, empty, empty.",
              why: "‘2nd left’ skips one seat in the person’s left direction. It is not 2nd from our right.",
            },
            {
              do: "C sits immediate right of A. A’s right is east = seat 3. Put C at 3. From our left: empty, A, C, B, empty, empty.",
              why: "Immediate right is the next seat toward A’s right, not toward the left end.",
            },
            {
              do: "F sits at the right end = seat 6. From our left: empty, A, C, B, empty, F.",
              why: "East end is seat 6 when 1 is west.",
            },
            {
              do: "Left are D and E for seats 1 and 5. D is not next to F. F at 6 is next to 5, so D cannot be at 5. D at 1, E at 5.",
              why: "The negative clue kills one of the two leftover seats.",
            },
            {
              do: "From our left (west to east): D, A, C, B, E, F. Check: A is two left of B; C is immediate right of A; F at right end; D not next to F.",
              why: "Read the row in words once. Every clue should match this one line.",
            },
          ],
          result: "From our left (west to east): D, A, C, B, E, F.",
        },
        {
          title: "Five facing north — ends and a neighbour",
          prompt:
            "P, Q, R, S, T face north in a row. P sits at the west end. T sits second to the right of P. Q sits at the east end. S sits immediate left of Q. Who sits at seat 2, and who sits between T and Q?",
          steps: [
            {
              do: "Seats 1–5 west to east. P at the west end ⇒ P at 1. From our left: P, empty, empty, empty, empty.",
              why: "West end is seat 1 when we draw left = west.",
            },
            {
              do: "T sits 2nd right of P. P’s right is east. From 1, first right is 2, second right is 3. T at 3. From our left: P, empty, T, empty, empty.",
              why: "‘2nd right of P’ means two seats toward P’s right, so two seats east.",
            },
            {
              do: "Q at the east end ⇒ Q at 5. From our left: P, empty, T, empty, Q.",
              why: "East end is seat 5.",
            },
            {
              do: "S sits immediate left of Q. Q’s left is west, so seat 4. S at 4. From our left: P, empty, T, S, Q.",
              why: "Immediate left of Q is the neighbour toward Q’s left, not toward the east end.",
            },
            {
              do: "Leftover seat 2, leftover person R. From our left: P, R, T, S, Q.",
              why: "One seat, one person. No extra overlap of people.",
            },
            {
              do: "Seat 2 is R. Between T (seat 3) and Q (seat 5) sits S.",
              why: "People between 3 and 5 = one person (seat 4).",
            },
          ],
          result: "From our left: P, R, T, S, Q. Seat 2 is R. S sits between T and Q.",
        },
        {
          title: "Facing south flips left on the page",
          prompt:
            "Five people A, B, C, D, E sit in a row facing south (their left is east, their right is west). A sits at the west end. B sits second to the left of A. D sits immediate left of B. E sits at the east end. Who sits in the middle, and who sits at seat 2?",
          steps: [
            {
              do: "Draw seats 1–5 west to east, left to right on the page. They face south, so each person’s left = east = toward seat 5, and each person’s right = west = toward seat 1.",
              why: "The page did not flip. The person’s left did. Say that before you place anyone.",
            },
            {
              do: "A sits at the west end = seat 1. From our left: A, empty, empty, empty, empty.",
              why: "West end is still seat 1. Facing does not change what ‘west end’ means.",
            },
            {
              do: "B sits 2nd left of A. A’s left is east. From seat 1, one left is 2, two left is 3. B at 3. From our left: A, empty, B, empty, empty.",
              why: "From the person’s view, 2nd left of A is two seats toward the east — toward our right on the page. So from our left the row starts A, then a gap, then B."
            },
            {
              do: "D sits immediate left of B. B’s left is east, so the next seat east of 3 is 4. D at 4. From our left: A, empty, B, D, empty.",
              why: "Immediate left is one step in B’s left direction. Facing south, that step is toward the east end, not toward A.",
            },
            {
              do: "E sits at the east end = seat 5. Leftover seat 2, leftover person C. From our left: A, C, B, D, E.",
              why: "One seat, one person. Ends and left-counts already used four people.",
            },
            {
              do: "Middle seat 3 is B. Seat 2 is C. Check: A at west; B is two seats east of A (A’s 2nd left); D is just east of B (B’s immediate left); E at east.",
              why: "Facing south: left toward our right on the page. If you had used the north map you would have put B west of A, which has no seats. That is the trap.",
            },
          ],
          result:
            "From our left (west to east): A, C, B, D, E. The middle is B. Seat 2 is C. Facing south, A’s left runs toward the east end.",
        },
      ],
    },
    {
      heading: "Circular seating — facing centre versus facing out",
      body: "People around a table. Draw a clock and number seats 1, 2, 3… clockwise. If they face the centre, a person’s left is clockwise (from above) and a person’s right is anti-clockwise. If they face out, left and right swap: left is anti-clockwise, right is clockwise.\n\nThe trap is using the facing-centre map on an outward-facing table. ‘A sits 2nd left of B’ must name the facing first. Opposite exists only for an even count: in a hexagon, opposite is three seats away; in a square, two seats away. Five people have no unique opposite.",
      howTo: [
        "Write facing in the first line: centre or out. Pick a person, put them at seat 1, number the rest clockwise.",
        "Facing centre: left = clockwise, right = anti-clockwise. Facing out: left = anti-clockwise, right = clockwise.",
        "Place ‘second to the left of B’ as two seats in B’s left direction. Say it: ‘A is 2nd left of B, so skip one seat that way to A.’",
        "Opposite in 6 seats = three steps. Opposite in 8 seats = four steps. Do not ask opposite in 5.",
        "Neighbours of X are the two seats touching X. A left/right clue decides which neighbour is which.",
        "If two drawings remain, the next left/right clue kills one. Do not seat two people in one chair.",
      ],
      bullets: [
        "Facing centre: left = clockwise from above. Facing out: left = anti-clockwise.",
        "‘2nd left of B’ = skip one seat in B’s left direction — direction depends on facing.",
        "Opposite = n/2 seats away, only when n is even.",
      ],
      examples: [
        {
          title: "Six facing the centre",
          prompt:
            "A, B, C, D, E, F sit around a hexagon facing the centre. A sits second to the left of B. C sits immediate right of A. D sits opposite B. E sits immediate left of D. F sits immediate right of B. Who sits opposite C? Who are B’s neighbours?",
          steps: [
            {
              do: "Facing centre: left = clockwise, right = anti-clockwise. Put B at seat 1. Number 1–6 clockwise.",
              why: "One fixed person and a clockwise numbering make every later ‘left’ a higher seat number (until 6 wraps to 1).",
            },
            {
              do: "A sits 2nd left of B: two seats clockwise from 1 is 3. A at 3. Say it: A is 2nd left of B, so from B skip one clockwise seat to A.",
              why: "Left of someone facing in is clockwise from above.",
            },
            {
              do: "C sits immediate right of A. Right = anti-clockwise, so from 3 that is seat 2. C at 2.",
              why: "Immediate right is one step the other way from left.",
            },
            {
              do: "D opposite B: in a hexagon, opposite is three seats. From 1 that is 4. D at 4. E immediate left of D: clockwise from 4 is 5. E at 5. F immediate right of B: anti-clockwise from 1 is 6. F at 6.",
              why: "Each clue is one placement. Opposite first, then the cheap immediate neighbours.",
            },
            {
              do: "Clockwise from B: B, C, A, D, E, F. Opposite C (seat 2) is seat 5 = E. B’s neighbours are C (clockwise / B’s left) and F (anti-clockwise / B’s right).",
              why: "Read the ring in words. Opposite of 2 is 2+3=5.",
            },
            {
              do: "Check: A two left of B, C right of A, D opposite B, E left of D, F right of B. All match.",
              why: "One full pass over the clues. If one failed, a left/right was flipped.",
            },
          ],
          result:
            "Clockwise from B: B, C, A, D, E, F. Opposite C is E. B’s neighbours are C and F.",
        },
        {
          title: "Six facing out — left flips",
          prompt:
            "Same six people, but now they face out. A sits second to the left of B. C sits immediate right of A. Who sits at the other side of B from C if we only use these two clues plus ‘they sit around a circle’? Place B at 1 and fill A and C.",
          steps: [
            {
              do: "Facing out: left = anti-clockwise, right = clockwise. Put B at seat 1, number 1–6 clockwise as before.",
              why: "Keep the same numbering so only the meaning of left/right changes. Do not also reverse the numbers.",
            },
            {
              do: "A sits 2nd left of B. Left is anti-clockwise: from 1, one anti-clockwise is 6, two is 5. A at 5. Say it: A is 2nd left of B, so from B skip one anti-clockwise seat to A.",
              why: "Facing out swaps the centre map. 2nd left is no longer seat 3.",
            },
            {
              do: "C sits immediate right of A. Right is clockwise, so from 5 clockwise is 6. C at 6.",
              why: "Immediate right is one step clockwise when they face out.",
            },
            {
              do: "Clockwise from B: B (1), empty, empty, empty, A (5), C (6). C is immediate anti-clockwise of B, so C is B’s left-hand neighbour from B’s view? B faces out, B’s left is anti-clockwise = seat 6 = C. Yes C is immediate left of B.",
              why: "Check consistency: A at 5 is two anti-clockwise from B, and C sits between A and B going clockwise from A.",
            },
            {
              do: "If you had used the facing-centre map you would have put A at 3 and C at 2 — the opposite arc. That is the trap.",
              why: "The first word of a circular item is facing. Centre and out are mirror left/right.",
            },
            {
              do: "Partial ring, clockwise: B, _, _, _, A, C. B’s neighbours so far: C on one side (seat 6). The other side of B (seat 2) is still empty.",
              why: "Two clues only place three people. Do not invent D, E, F.",
            },
          ],
          result:
            "Facing out, clockwise from B: B, empty, empty, empty, A, C. A is at seat 5, C at seat 6. Do not use the facing-centre map.",
        },
        {
          title: "Four facing centre — second left is opposite",
          prompt:
            "W, X, Y, Z sit around a square table facing the centre. W sits second to the left of X. Y sits immediate left of X. Who sits opposite W, and who sits immediate right of X?",
          steps: [
            {
              do: "Four seats, facing centre, left = clockwise. Opposite = two seats away. Put X at seat 1.",
              why: "A square is an even ring. Opposite is n/2 = 2 steps.",
            },
            {
              do: "W sits 2nd left of X: two clockwise from 1 is 3. W at 3. Say it: W is 2nd left of X, so W sits opposite X on a square.",
              why: "On four seats, second left and opposite are the same step count.",
            },
            {
              do: "Y sits immediate left of X: one clockwise from 1 is 2. Y at 2. Leftover seat 4 is Z.",
              why: "One clue, one seat. Last person takes last chair.",
            },
            {
              do: "Immediate right of X: right = anti-clockwise from 1, which is seat 4 = Z.",
              why: "Right is the other way from left when they face in.",
            },
            {
              do: "Opposite W (seat 3) is seat 1 = X. Clockwise: X, Y, W, Z. Neighbours of X are Y (left) and Z (right).",
              why: "Read the ring in words: from our clockwise pass, Y is just after X, Z is just before X.",
            },
            {
              do: "Answer: opposite W is X; immediate right of X is Z.",
              why: "Facing centre on a square: 2nd left = opposite.",
            },
          ],
          result:
            "W sits opposite X. Immediate right of X is Z. Clockwise: X, Y, W, Z.",
        },
      ],
    },
    {
      heading: "Order and ranking — from left, from right, total = L + R − 1",
      body: "If A is 7th from the left and 12th from the right, the total number of people is 7 + 12 − 1 = 18. You subtract one because A was counted in both ranks. Rank from the other end = total − this-end rank + 1. People sitting between two positions i and j (same end) = |j − i| − 1.\n\nThe trap is adding L + R with no −1 (that gives 19) or converting only one of two ranks before you count ‘between’. Height items: ‘taller than only two’ means 3rd shortest. ‘Shorter than only one’ means 2nd tallest.",
      howTo: [
        "If one person gives both a left rank and a right rank, total = L + R − 1.",
        "To turn a left rank into a right rank: right = total − left + 1. The other way is the same formula.",
        "Before counting people between A and B, put both ranks on the same end (both from the left, or both from the right).",
        "Between = difference of those two positions, minus 1.",
        "‘Taller than only k’ = (k+1)th from the shortest. ‘Shorter than only k’ = (k+1)th from the tallest. Write a numbered height line.",
      ],
      bullets: [
        "Total = (from left) + (from right) − 1.",
        "Other-end rank = total − this-end rank + 1.",
        "Between two same-end ranks = |j − i| − 1. ‘Taller than only k’ = k+1 from the bottom.",
      ],
      examples: [
        {
          title: "7th left and 12th right",
          prompt:
            "A is 7th from the left and 12th from the right in a row. How many people are in the row? If you only knew total 18 and 7th from left, what is A’s rank from the right?",
          steps: [
            {
              do: "Total = 7 + 12 − 1 = 18.",
              why: "A is in both counts. The −1 stops double-counting A.",
            },
            {
              do: "Check by pieces: 6 people to A’s left, then A, then 11 people to A’s right. 6+1+11=18.",
              why: "7th from left means 6 on the left. 12th from right means 11 on the right.",
            },
            {
              do: "Reverse formula: rank from right = total − left-rank + 1 = 18 − 7 + 1 = 12.",
              why: "This recovers the given 12, so the two formulae agree.",
            },
            {
              do: "Reject 19 (that is 7+12 with no −1) and reject 17 (that subtracted 2).",
              why: "Those two options are the usual arithmetic traps.",
            },
            {
              do: "People to the left of A = 6. People to the right = 11. Do not call those the ranks.",
              why: "Rank counts the person; ‘people to the side’ does not.",
            },
            {
              do: "Answer: 18 people; the reverse rank is 12.",
              why: "Total = L+R−1. Other end = total − this end + 1.",
            },
          ],
          result: "18 people. Rank from the right = 18 − 7 + 1 = 12.",
        },
        {
          title: "People between two left-ranks",
          prompt:
            "In a row of 20, Gita is 8th from the left and Hari is 13th from the left. How many sit between them? How many people sit to Hari’s right?",
          steps: [
            {
              do: "Both ranks are from the left: Gita at 8, Hari at 13. Same end already — no conversion yet.",
              why: "‘Between’ needs one number line. Here both numbers already face left.",
            },
            {
              do: "Between = 13 − 8 − 1 = 4 people (seats 9, 10, 11, 12).",
              why: "Subtract one so you do not count Gita or Hari.",
            },
            {
              do: "Hari’s rank from the right = 20 − 13 + 1 = 8. People to Hari’s right = 7.",
              why: "8th from the right means 7 people on that side. Rank includes Hari.",
            },
            {
              do: "If Hari had been 13th from the right, you would first convert: left-rank of Hari = 20 − 13 + 1 = 8, and then Hari and Gita would share seat 8 — a different question.",
              why: "Never subtract a left rank from a right rank until one of them is flipped.",
            },
            {
              do: "Reject 5 between them (that forgot the −1) and reject 8 to Hari’s right (that used the rank as a side-count).",
              why: "Between and side-count both need a minus one, but from different numbers.",
            },
            {
              do: "Answers: 4 between them; 7 people to Hari’s right.",
              why: "Same-end between formula, then other-end rank for the side.",
            },
          ],
          result: "4 between Gita and Hari. 7 people to Hari’s right.",
        },
        {
          title: "Taller than only two",
          prompt:
            "Among six friends, Vani is taller than only two. Om is shorter than only one. Pia is taller than Vani but shorter than Om. What is Pia’s height rank? Who can be tallest?",
          steps: [
            {
              do: "Six heights. Call 1 the shortest and 6 the tallest. Vani is taller than only two ⇒ two people shorter than Vani ⇒ Vani is 3rd shortest (rank 3).",
              why: "‘Only two’ is a count below her, not a vague ‘quite short’.",
            },
            {
              do: "Om is shorter than only one ⇒ one person taller than Om ⇒ Om is 2nd tallest (rank 5 from the bottom, 2 from the top).",
              why: "‘Only one’ above him fixes his slot from the top.",
            },
            {
              do: "Pia is taller than Vani (rank > 3) and shorter than Om (rank < 5). The only integer slot is rank 4.",
              why: "There is no gap between 3 and 5 except 4. Pia is forced.",
            },
            {
              do: "Tallest is rank 6 — the unique person taller than Om. Pia cannot be tallest. The two shortest are the two below Vani.",
              why: "Slots 1 and 2 are unnamed. Slot 6 is unnamed. Pia is neither.",
            },
            {
              do: "Pia is 3rd tallest (rank 4 of 6). Vani is 4th tallest. Om is 2nd tallest.",
              why: "From the top: 6 = unknown, 5 = Om, 4 = Pia, 3 = Vani, then two unknowns.",
            },
            {
              do: "Answer: Pia is exactly 4th from shortest. Tallest is the unnamed friend above Om.",
              why: "Honour ‘only’. Do not translate both clues into loose ‘greater than’ without the count.",
            },
          ],
          result:
            "Pia is 4th from shortest (3rd tallest). Om is 2nd tallest. Vani is 3rd shortest. Tallest is someone else.",
        },
      ],
    },
    {
      heading: "Input-output — one machine, one step pattern",
      body: "An input-output machine rearranges a line by the same rule at every step. In this note the machine does two placements per step: the smallest remaining number moves to the leftmost free settled slot, and the alphabetically earliest remaining word moves to the rightmost free settled slot. The middle tokens keep their order.\n\nThe trap is jumping to step IV from the input, or moving two numbers in one step. Rewrite the full line after every step. The finished output has numbers ascending from the left and words alphabetical from the right.",
      howTo: [
        "Copy the input. List the numbers from small to large, and the words from A to Z. That is the target order.",
        "Each step: park the next smallest leftover number at the left of the still-messy middle, and park the next earliest leftover word at the right of that middle.",
        "Do not move any other token. The middle keeps its relative order.",
        "Write the whole new line. That is step I. Repeat for step II, III, … until numbers on the left are sorted and words on the right are sorted.",
        "Answer position questions from the line you actually wrote for that step, not from the input and not from the output.",
      ],
      bullets: [
        "One number to the left (ascending) and one word to the right (alphabetical) per step.",
        "Middle tokens keep order. Rewrite the whole line each time.",
        "Output: numbers small-to-large on the left, words A-to-Z from the right.",
      ],
      examples: [
        {
          title: "Run the machine on 87 cat 23 ball 56 open 14 ten",
          prompt:
            "Input: 87 cat 23 ball 56 open 14 ten. Each step parks the smallest leftover number at the left and the earliest leftover word at the right. Write steps I to III.",
          steps: [
            {
              do: "Numbers: 14, 23, 56, 87. Words: ball, cat, open, ten. Input order: 87, cat, 23, ball, 56, open, 14, ten.",
              why: "The lists tell you what will move, in which order. The input tells you the middle’s starting order.",
            },
            {
              do: "Step I: smallest number 14 to the left; first word ball to the right. Remaining in order: 87 cat 23 56 open ten. Line: 14 87 cat 23 56 open ten ball.",
              why: "Only those two tokens move. 87 stays left of cat, and so on.",
            },
            {
              do: "Step II: next number 23 to the left (after 14); next word cat to the right (before ball). Remaining: 87 56 open ten. Line: 14 23 87 56 open ten cat ball.",
              why: "14 and ball are already settled and do not move again.",
            },
            {
              do: "Step III: next number 56 left; next word open right. Remaining: 87 ten. Line: 14 23 56 87 ten open cat ball.",
              why: "After three pair-moves the numbers 14,23,56,87 are in order on the left and the words ten, open, cat, ball read alphabetical from the right. That is the output.",
            },
            {
              do: "Step IV would look the same. Output is first reached at step III.",
              why: "Four numbers and four words, but the last number and last word are already in the last middle slots. Do not force a fake extra shuffle.",
            },
            {
              do: "Keep these three lines for the next two examples. Do not recompute from memory.",
              why: "Position questions are just reading the line you already wrote.",
            },
          ],
          result:
            "I: 14 87 cat 23 56 open ten ball. II: 14 23 87 56 open ten cat ball. III (output): 14 23 56 87 ten open cat ball.",
        },
        {
          title: "Position at step II",
          prompt:
            "On the same input, which token is 4th from the left in step II, and which is 2nd from the right?",
          steps: [
            {
              do: "Copy step II: 14 23 87 56 open ten cat ball.",
              why: "Use the line from the previous working. Do not start from the input.",
            },
            {
              do: "Left ranks: 1=14, 2=23, 3=87, 4=56. Fourth from the left is 56.",
              why: "Count from the left end of that line only.",
            },
            {
              do: "Right ranks: 1st from right = ball, 2nd from right = cat.",
              why: "Count from the right end. Words parked from the right in order ball, then cat.",
            },
            {
              do: "Do not use step I (14 87 cat 23 56 open ten ball), where 4th from left is 23.",
              why: "The question named step II. One step off is a designed trap.",
            },
            {
              do: "Do not use the output, where 4th from left is 87.",
              why: "Same trap on the other side of step II.",
            },
            {
              do: "Answers: 56, and cat.",
              why: "Read step II only.",
            },
          ],
          result: "Step II: 4th from left = 56; 2nd from right = cat.",
        },
        {
          title: "New input, only step I",
          prompt:
            "Input: 42 mango 15 egg 8 zest 27. Same machine. What is step I, and where is zest after step I? What would step II be?",
          steps: [
            {
              do: "Numbers: 8, 15, 27, 42. Words: egg, mango, zest. Smallest number 8; first word egg.",
              why: "New input, same rule. Rebuild the two lists from scratch.",
            },
            {
              do: "Remove 8 and egg from the input, keeping the order of the rest: 42 mango 15 zest 27.",
              why: "Middle keeps relative order. egg sat between 15 and 8; once egg leaves, 15 is followed by zest in the middle.",
            },
            {
              do: "Step I: 8 42 mango 15 zest 27 egg.",
              why: "8 parked left, egg parked right, middle unchanged in order.",
            },
            {
              do: "zest is 5th from the left in that line (8, 42, mango, 15, zest, 27, egg).",
              why: "Count: 1=8, 2=42, 3=mango, 4=15, 5=zest.",
            },
            {
              do: "Step II would park 15 left and mango right: 8 15 42 zest 27 mango egg.",
              why: "One number and one word per step. Do not also move 27 in step I or II until its turn.",
            },
            {
              do: "Answer step I as 8 42 mango 15 zest 27 egg, with zest 5th from the left.",
              why: "The question asked step I first. Step II is the check that you did not double-move.",
            },
          ],
          result:
            "Step I: 8 42 mango 15 zest 27 egg. zest is 5th from the left. Step II: 8 15 42 zest 27 mango egg.",
        },
      ],
    },
    {
      heading: "Floor or box puzzle — place one clue at a time",
      body: "A floor puzzle stacks people on floors 1 (ground) to 5 (top), unless the stem numbers the top as 1. A box puzzle is the same drawing with boxes in a stack. Make a single column of five slots. Place the unique clues first (who is on 5, who is on the ground). Then place ‘immediately above’ as the next integer up.\n\nThe trap is filling two people into one floor, or treating ‘two floors above’ as next door. Two floors above K is a gap of one. Odd floors are 1, 3, 5. If two sketches survive, the last clue’s job is to kill one. Paper-1 keys are unique; if both sketches live, you missed an ‘only’ or an ‘immediate’.",
      howTo: [
        "Draw five slots in a column. Label 1 at the bottom if the stem says ground = 1.",
        "Place every clue that names a floor number or an end (top / ground) first.",
        "Place ‘immediately above X’ in the slot next to X. Place ‘two above X’ with one empty slot between.",
        "Use ‘odd floor’ / ‘even floor’ to cut the leftover slots. One person per slot.",
        "When a second attribute (colour, city) appears, fill it on the same column after the people are locked — or lock a colour when it is tied to a known floor.",
        "Read the asked question. If it is already a premise (‘L lives immediately above K’), tick L, then still check the tower so no option contradicts it.",
      ],
      bullets: [
        "Ground = 1 unless the stem numbers the top as 1. One person (or box) per floor.",
        "Immediately above = next floor. Two above = skip one floor.",
        "Place unique clues first. The last clue kills the leftover sketch.",
      ],
      examples: [
        {
          title: "Five floors — who is on 3?",
          prompt:
            "Five people J, K, L, M, N live on five floors, ground = 1, top = 5. (1) N lives on floor 5. (2) K lives on an odd-numbered floor other than 5. (3) L lives immediately above K. (4) J lives on the ground floor. (5) M lives immediately above J. Who lives on floor 3?",
          steps: [
            {
              do: "Column 1–5, bottom to top. Clue 1: N on 5. Clue 4: J on 1. Write those two first.",
              why: "Named floors are unique. They cost nothing and shrink the rest.",
            },
            {
              do: "Clue 5: M lives immediately above J, so M is on 2.",
              why: "Immediately above ground is floor 2. No gap.",
            },
            {
              do: "Clue 2: K lives on an odd floor other than 5. Odds are 1, 3, 5. Floor 5 is N and floor 1 is J, so K must be on 3.",
              why: "The occupied ends kill two of the three odd slots. One slot left.",
            },
            {
              do: "Clue 3: L lives immediately above K, so L is on 4. Tower ground to top: J, M, K, L, N.",
              why: "Each clue placed one person. No two share a floor.",
            },
            {
              do: "Floor 3 is K. Check: L on 4 is immediately above K; M on 2 is immediately above J; N on top.",
              why: "A full pass. If K had been forced onto 1 or 5, a clue would already have broken.",
            },
            {
              do: "Answer K. Do not leave floor 3 empty ‘because the question only asked who is on 3’ — filling the tower is faster than branching.",
              why: "One-question puzzles still want a unique grid. The leftover person always has a leftover floor.",
            },
          ],
          result: "K lives on floor 3. Ground to top: J, M, K, L, N.",
        },
        {
          title: "Five boxes in a stack",
          prompt:
            "Five boxes A, B, C, D, E are stacked, 1 at the bottom, 5 at the top. (1) A is on the top. (2) C is immediately above D. (3) D is on an even-numbered position. (4) B is immediately above C. (5) E is on the bottom. Which box is on 1, and which is on 3?",
          steps: [
            {
              do: "Slot 5 is A (top). Slot 1 is E (bottom). Remaining floors 2, 3, 4 for B, C, D.",
              why: "Place the named ends first. A box stack is the same drawing as a floor tower.",
            },
            {
              do: "C is immediately above D, and B is immediately above C, so the block B / C / D occupies three consecutive slots with B on top of that block.",
              why: "Two ‘immediately above’ clues glue a triple. Treat B-C-D as one moving piece.",
            },
            {
              do: "The only three consecutive free slots are 2, 3, 4. So D on 2, C on 3, B on 4.",
              why: "The triple cannot sit on 3-4-5 because 5 is already A. It cannot sit on 1-2-3 because 1 is already E.",
            },
            {
              do: "Clue 3 is a check: D is on an even position. D is on 2, which is even. If someone had put D on 4, C would need 5, which is A — already illegal.",
              why: "Even-position clues cut leftover slots. Here they confirm D=2 rather than invent a new place.",
            },
            {
              do: "Box on 1 is E. Box on 3 is C. Stack bottom to top: E, D, C, B, A.",
              why: "One box per slot. The glued triple fills the middle.",
            },
            {
              do: "Check: C immediately above D, B immediately above C, D even (2), A on top, E on bottom. All match.",
              why: "A full pass. ‘Two above D’ would have been B (floor 4 is two above 2) — that is a gap of one, not next door.",
            },
          ],
          result:
            "Bottom to top: E, D, C, B, A. Floor 1 is E. Floor 3 is C.",
        },
        {
          title: "Same five floors, add colours",
          prompt:
            "Keep J=1, M=2, K=3, L=4, N=5. Colours Red, Blue, Green, Yellow, White. (1) N likes Blue. (2) J likes Green. (3) Red is immediately above Green. (4) Yellow is on an even-numbered floor. (5) K likes White. Who likes Red, and who likes Yellow?",
          steps: [
            {
              do: "People are already locked. Write colours in the same column. J on 1 likes Green. N on 5 likes Blue.",
              why: "A second attribute is a second pass on the same tower, not a new tower.",
            },
            {
              do: "Red is immediately above Green. Green is on 1, so Red is on 2. Floor 2 is M, so M likes Red.",
              why: "Immediately above a known colour is a known floor.",
            },
            {
              do: "K on 3 likes White (clue 5).",
              why: "Named person, named colour. Place it at once.",
            },
            {
              do: "Leftover colour Yellow, leftover person L on floor 4. Check clue 4: Yellow on an even floor. Floor 4 is even (floor 2 is already Red), so Yellow on 4 matches.",
              why: "The even clue is a check, not a second choice. Floor 2 was taken by Red.",
            },
            {
              do: "Colours ground to top: Green (J), Red (M), White (K), Yellow (L), Blue (N).",
              why: "One colour per floor. Read the column once.",
            },
            {
              do: "Red = M. Yellow = L.",
              why: "The asked pair. White = K, Blue = N, Green = J as leftover facts.",
            },
          ],
          result: "Red = M (floor 2). Yellow = L (floor 4). White = K; Blue = N; Green = J.",
        },
      ],
    },
  ],
};
