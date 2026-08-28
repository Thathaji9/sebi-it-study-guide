import type { TopicNote } from "@/data/notes";

export const notesQuant: TopicNote = {
  topic: "quant",
  title: "Quantitative Aptitude for SEBI Paper 1 — worked notes",
  blurb:
    "Phase I Quant is about 25 marks of timed arithmetic: BODMAS, percentages, SI versus CI, profit and loss, ratio, TSD, time and work, probability, quadratic comparison, number series, and a small DI table. Every example below is fully calculated — no ‘obvious’. Copy the algebra onto paper once, then drill the practice bank with a stopwatch.",
  blocks: [
    {
      heading: "Simplification — BODMAS as a five-line audit",
      body: "BODMAS / PEMDAS is the only licence you have in a simplification item: Brackets, Orders (powers and roots), Division and Multiplication from left to right, Addition and Subtraction from left to right. Division does not outrank multiplication; they share a left-to-right pass. 36 ÷ 9 × 4 is 4 × 4 = 16, not 36 ÷ 36 = 1. Addition does not outrank subtraction: 18 + 16 − 5 is 29, not 18 + (16 − 5) unless brackets say so.\n\nRewrite every mixed expression as a vertical audit: (1) innermost brackets (2) roots and powers (3) × and ÷ scanning left to right, replacing as you go (4) + and − scanning left to right (5) box the integer. Paper 1 almost never needs logarithms. Fractions of the form of mean × and ÷: 3/4 of 240 is (3 × 240)/4.\n\nVinculum / bar questions are rare; if a bar sits over a + pair, treat that pair as a bracket. Decimal–fraction conversions that appear inside BODMAS should be done before the left-to-right pass (0.25 = 1/4) so you do not carry 0.333… errors. If two options are 84 and 48, you probably swapped a × and a ÷.\n\nApproximation items (separate from exact BODMAS) round first, then compute; do not mix the two games. The four worked lines below are exact.",
      bullets: [
        "× and ÷ are equal rank, left to right; + and − likewise.",
        "Powers and roots before the ×÷ pass; brackets before everything.",
        "of means multiply: 15% of 240 = 0.15 × 240.",
        "Never skip a rewritten line; that is where 36 ÷ 9 × 4 becomes 16.",
      ],
      examples: [
        {
          title: "Brackets, power, then left-to-right ×÷",
          prompt: "Evaluate 48 ÷ 6 × (15 − 9) + 7² − 13.",
          steps: [
            "Brackets first: 15 − 9 = 6. Expression becomes 48 ÷ 6 × 6 + 7² − 13.",
            "Orders: 7² = 49. Expression becomes 48 ÷ 6 × 6 + 49 − 13.",
            "Division and multiplication left to right: 48 ÷ 6 = 8, then 8 × 6 = 48. Now 48 + 49 − 13.",
            "Addition and subtraction left to right: 48 + 49 = 97, then 97 − 13 = 84.",
            "Sense-check: if you had done 48 ÷ (6 × 6) you would get 48 ÷ 36 + 49 − 13 = 1.333 + 36 = wrong. The left-to-right pass forbids that.",
          ],
          result: "84",
        },
        {
          title: "No brackets — ÷ then × then +−",
          prompt: "Evaluate 18 + 36 ÷ 9 × 4 − 5.",
          steps: [
            "No brackets and no powers. First the ×÷ pass from the left: 36 ÷ 9 = 4.",
            "Still in the ×÷ pass: 4 × 4 = 16. Expression is now 18 + 16 − 5.",
            "Addition/subtraction left to right: 18 + 16 = 34.",
            "Then 34 − 5 = 29.",
            "Wrong path that yields 1: treating ÷ 9 × 4 as ÷ (9 × 4) = ÷ 36, then 18 + 1 − 5 = 14, also wrong. The designed trap is 18 + 4 − 5 = 17 if you drop the × 4. The value is 29.",
          ],
          result: "29",
        },
        {
          title: "Root, cube, mixed ×÷",
          prompt: "Evaluate √81 + 5³ − 12 × 4 + 18 ÷ 3.",
          steps: [
            "Orders: √81 = 9 and 5³ = 125. Expression becomes 9 + 125 − 12 × 4 + 18 ÷ 3.",
            "×÷ pass left to right: 12 × 4 = 48, and 18 ÷ 3 = 6. Expression becomes 9 + 125 − 48 + 6.",
            "9 + 125 = 134.",
            "134 − 48 = 86.",
            "86 + 6 = 92. (If you subtracted 6 instead of adding you would get 80 — the sign in front of 18 ÷ 3 is +.)",
          ],
          result: "92",
        },
        {
          title: "Bracketed subtraction then ÷ ×",
          prompt: "Evaluate (125 − 17) ÷ 4 × 3 + 9 × 6 − 11.",
          steps: [
            "Brackets: 125 − 17 = 108. Expression becomes 108 ÷ 4 × 3 + 9 × 6 − 11.",
            "×÷ pass: 108 ÷ 4 = 27, then 27 × 3 = 81. Alongside, 9 × 6 = 54. Expression becomes 81 + 54 − 11.",
            "81 + 54 = 135.",
            "135 − 11 = 124.",
            "If you had grouped (108 ÷ 4 × 3 + 9) × 6 you would invent brackets. There are none around that sum. Answer 124.",
          ],
          result: "124",
        },
      ],
    },
    {
      heading: "Percentages — of, increase, successive, and reverse",
      body: "x% of N is (x/100) × N. A 25% increase multiplies by 1.25; a 25% decrease multiplies by 0.75. Successive changes multiply: up 12.5% then down 8% is × 1.125 × 0.92, not × 1.045. The order of two percentage changes on the same base is commutative (1.125 × 0.92 = 0.92 × 1.125); a percentage of a new base is not the same as the same percentage of the old base.\n\nReverse percentage: if a number after a 25% rise is 340, the original is 340 / 1.25, not 340 − 25%. ‘x is 40% of y’ means x = 0.40 y, so y = x / 0.40. Marks: scored / maximum × 100. Passing marks are a stated percentage of maximum, not of the score.\n\nPopulation, salary, and price items are the same multiplier machine. For two-step population, compute the intermediate (do not skip it): it is the base of the second percentage. Fraction shortcuts: 12.5% = 1/8, 8% = 2/25 but 0.08 is safer in mixed decimals, 37.5% = 3/8, 6.25% = 1/16.\n\nComparison: ‘A is 20% more than B’ means A = 1.2 B, so B is A/1.2 and B is not 20% less than A (that would be 0.8 A). 100/1.2 ≈ 83.33, so B is 16.67% less than A. That reverse-percentage trap is a Paper 1 regular.",
      bullets: [
        "x% of N = xN/100; after +x% multiply by (1 + x/100).",
        "Successive changes multiply; the second % uses the new base.",
        "Reverse: original = new / (1 ± r). Never subtract the percentage points from the new value.",
        "‘20% more than B’ is not inverted by ‘20% less than A’.",
      ],
      examples: [
        {
          title: "Straight ‘of’",
          prompt: "What is 18% of 450?",
          steps: [
            "18% of 450 = (18/100) × 450.",
            "18 × 450 = 8100.",
            "8100 / 100 = 81.",
            "Shortcut: 10% of 450 = 45, so 20% = 90, therefore 18% = 90 − (2% of 450). 2% of 450 = 9, and 90 − 9 = 81.",
            "Same number from both routes. Answer 81, not 18 × 45 = 810 (that forgot the remaining /10).",
          ],
          result: "81",
        },
        {
          title: "Reverse a 25% increase",
          prompt: "A number, when increased by 25%, becomes 340. Find the original number.",
          steps: [
            "Let the original be x. Then x × (1 + 25/100) = 340, so 1.25x = 340.",
            "x = 340 / 1.25. 1.25 = 5/4, so divide by 5/4 means multiply by 4/5.",
            "340 × 4 = 1360, then 1360 / 5 = 272.",
            "Forward check: 25% of 272 = 272/4 = 68, and 272 + 68 = 340. Matches.",
            "Trap: 340 − 25 = 315, or 340 − 0.25 × 340 = 255, both wrong because 25% was of the unknown original, not of 340.",
          ],
          result: "272",
        },
        {
          title: "40% of x, then 12.5% of that x",
          prompt: "If 40% of x equals 96, find x. Then find 12.5% of x.",
          steps: [
            "0.40x = 96, so x = 96 / 0.40.",
            "96 / 0.40 = 9600 / 40 = 240. Thus x = 240.",
            "12.5% = 1/8, so 12.5% of 240 = 240 / 8 = 30.",
            "Decimal route: 0.125 × 240 = 31.25? No: 0.125 × 240 = (1/8) × 240 = 30. (0.125 × 200 = 25, 0.125 × 40 = 5, total 30.)",
            "Both asked values: x = 240 and 12.5% of x = 30.",
          ],
          result: "x = 240; 12.5% of x = 30",
        },
        {
          title: "Successive population change 12.5% up, 8% down",
          prompt:
            "A town has 12,800 people. Population grows 12.5% in a year, then declines 8% the next year. Find the population after two years.",
          steps: [
            "First year: 12.5% = 1/8. Increase = 12,800 / 8 = 1,600. Intermediate population = 12,800 + 1,600 = 14,400.",
            "Second year base is 14,400, not 12,800. Decline 8% of 14,400.",
            "8% of 14,400 = (8/100) × 14,400 = 8 × 144 = 1,152.",
            "Final population = 14,400 − 1,152 = 13,248.",
            "Multiplier check: 12,800 × 1.125 × 0.92. 12,800 × 1.125 = 14,400, then 14,400 × 0.92 = 13,248. Net change = 13,248 − 12,800 = +448, which is not +4.5% of 12,800 (that would be +576). Successive % are not added.",
          ],
          result: "13,248",
        },
      ],
    },
    {
      heading: "Simple interest versus compound interest — year by year",
      body: "Simple interest on principal P at r% per annum for t years is SI = P r t / 100, and the amount is A = P + SI. The interest each year is the same cash slice of the original P. Compound interest (annual compounding, unless stated otherwise) adds each year’s interest to the base: Year-1 interest = P r/100, new base = P + that; Year-2 interest = (new base) r/100, and so on. Amount after n years at annual compounding is P (1 + r/100)^n. CI = A − P.\n\nAlways table CI year by year in this paper when n = 2 or 3; do not jump to the formula until the table matches. Difference CI − SI for 2 years equals P (r/100)^2, which is interest on the first year’s interest. For 3 years the extra over SI is P (r/100)^2 × (3 + r/100), but the table is safer in a 60-minute paper.\n\nIf a sum doubles in 5 years at SI, then SI = P so P r t / 100 = P, hence r t = 100, r = 20% when t = 5. That doubling shortcut is SI-only; CI doubling uses the 72-rule as a rough check, not an exact Paper 1 key.\n\nCompounded half-yearly means rate per half-year = r/2 and number of periods = 2t. The examples below are annual compounding unless a step says otherwise. Unique principals are used so you cannot copy a remembered 8000-at-10% as if every question were that.",
      bullets: [
        "SI = Prt/100, same rupee interest every year on original P.",
        "CI: add interest to the base each year; write the three-row table.",
        "2-year CI − SI = P (r/100)².",
        "Doubling in t years at SI ⇒ r = 100/t. That is not the CI rule.",
      ],
      examples: [
        {
          title: "P = 8000, r = 10%, t = 3, SI versus CI table",
          prompt:
            "On Rs 8,000 at 10% per annum for 3 years, compute SI, then CI with a year-by-year table, then the difference.",
          steps: [
            "SI = 8000 × 10 × 3 / 100 = 8000 × 30 / 100 = 240,000 / 100 = 2,400. SI amount = 8,000 + 2,400 = 10,400.",
            "CI Year 1: interest = 8,000 × 10/100 = 800. Amount at end of Year 1 = 8,000 + 800 = 8,800.",
            "CI Year 2: interest = 8,800 × 10/100 = 880. Amount at end of Year 2 = 8,800 + 880 = 9,680.",
            "CI Year 3: interest = 9,680 × 10/100 = 968. Amount at end of Year 3 = 9,680 + 968 = 10,648. Total CI = 800 + 880 + 968 = 2,648.",
            "Difference CI − SI = 2,648 − 2,400 = 248. Formula check for 3 years: extra = 8000 × 0.01 × (3 + 0.1) wait: P(r/100)²(3 + r/100) = 8000 × 0.01 × 3.1 = 80 × 3.1 = 248. Matches.",
          ],
          result: "SI = Rs 2,400; CI = Rs 2,648; difference = Rs 248; CI amount = Rs 10,648",
        },
        {
          title: "P = 12,500, r = 8%, t = 2, year-by-year CI",
          prompt:
            "Find CI and SI on Rs 12,500 at 8% per annum for 2 years, showing each CI year.",
          steps: [
            "SI = 12,500 × 8 × 2 / 100 = 12,500 × 16 / 100 = 200,000 / 100 = 2,000.",
            "CI Year 1: 12,500 × 8/100 = 1,000. Amount = 12,500 + 1,000 = 13,500.",
            "CI Year 2: 13,500 × 8/100 = 1,080. Amount = 13,500 + 1,080 = 14,580.",
            "CI = 1,000 + 1,080 = 2,080. Difference CI − SI = 2,080 − 2,000 = 80.",
            "Two-year shortcut: P (r/100)² = 12,500 × 0.08² = 12,500 × 0.0064 = 80. Matches the extra 80.",
          ],
          result: "SI = Rs 2,000; CI = Rs 2,080; CI amount = Rs 14,580; extra = Rs 80",
        },
        {
          title: "Find P from A = 9,261 in 3 years at 5% CI",
          prompt:
            "A sum amounts to Rs 9,261 in 3 years at 5% per annum compound interest. Find the principal.",
          steps: [
            "A = P (1.05)³ = 9,261. Compute 1.05² = 1.1025.",
            "1.1025 × 1.05: 1.1025 × 1 = 1.1025; 1.1025 × 0.05 = 0.055125; sum = 1.157625. So (1.05)³ = 1.157625.",
            "P = 9,261 / 1.157625. Test P = 8,000: 8,000 × 1.157625 = 8,000 × 1.15 = 9,200; 8,000 × 0.007625 = 61; total 9,261.",
            "Year-by-year check from 8,000: Y1 interest 400, amount 8,400. Y2 interest 420, amount 8,820. Y3 interest 441, amount 9,261. Matches.",
            "Principal is Rs 8,000. (If you used SI reverse: 9261 = P + P×5×3/100 = P×1.15, P = 8,053.04, which is the wrong interest type.)",
          ],
          result: "P = Rs 8,000",
        },
        {
          title: "Two-year CI−SI difference given, find P",
          prompt:
            "The difference between CI and SI on a sum for 2 years at 8% per annum is Rs 48. Find the sum.",
          steps: [
            "For 2 years, CI − SI = P (r/100)².",
            "r/100 = 0.08, so (0.08)² = 0.0064.",
            "P × 0.0064 = 48, therefore P = 48 / 0.0064.",
            "48 / 0.0064 = 480,000 / 64 (multiply numerator and denominator by 10,000). 64 × 7,500 = 480,000, so P = 7,500.",
            "Check table: P = 7,500. Y1 interest 600, amount 8,100. Y2 CI interest 648. Total CI 1,248. SI = 7,500 × 8 × 2 / 100 = 1,200. Difference 48. Matches.",
          ],
          result: "P = Rs 7,500",
        },
      ],
    },
    {
      heading: "Profit and loss — CP, SP, marked price, successive discounts",
      body: "Profit = SP − CP when SP > CP; loss = CP − SP otherwise. Profit % is always on CP unless the question says ‘on SP’: profit% = (profit / CP) × 100. If there is a 10% loss, SP = 0.90 × CP, so CP = SP / 0.90. Marked price (MP) is the tag; discount is off MP; SP = MP × (1 − d/100). Two successive discounts of a% and b% are equivalent to a single discount of [1 − (1 − a/100)(1 − b/100)] × 100 percent, not a + b.\n\nWhen both CP and profit% change in a story (‘if CP were Rs 50 more and SP the same, profit would be 10%’), write two equations in the same SP. Do not assume the profit rupees stayed fixed. False-weight items: if a trader uses 900 g as 1 kg, he effectively buys 900 g for the price of 1 kg; compute CP per gram then SP per gram.\n\nPaper 1 likes integer rupees. If your CP comes to 3818.18, you probably mixed 12.5% discount with a 10% profit on the wrong base. Re-base every percentage on the quantity the sentence names (on CP, on SP, or on MP).\n\nVAT / GST overlay: tax is usually on SP. If the question is silent, ignore tax. The four examples below have no tax and use distinct numbers from the SI block.",
      bullets: [
        "Profit% and loss% are on CP unless named otherwise.",
        "SP = CP × (1 ± r/100); reverse with division, not subtraction of rupees.",
        "Successive discounts multiply residual factors; they do not add.",
        "Two-scenario items: same SP, two CPs, two profit% — two equations.",
      ],
      examples: [
        {
          title: "CP 840, SP 966 — profit %",
          prompt: "An article is bought for Rs 840 and sold for Rs 966. Find the profit percentage.",
          steps: [
            "Profit = SP − CP = 966 − 840 = 126.",
            "Profit % = (126 / 840) × 100.",
            "126 / 840 = 126 ÷ 840. Divide numerator and denominator by 42: 126 ÷ 42 = 3, 840 ÷ 42 = 20, so 3/20.",
            "3/20 × 100 = 15. So 15%.",
            "Check: 15% of 840 = 126, and 840 + 126 = 966. If you used 126/966 you would get 13.04% on SP — the wrong base.",
          ],
          result: "15%",
        },
        {
          title: "10% loss, SP 1,170 — find CP",
          prompt: "Sold at a 10% loss for Rs 1,170. Find the cost price.",
          steps: [
            "SP is 90% of CP, so 0.90 × CP = 1,170.",
            "CP = 1,170 / 0.90 = 11,700 / 9 = 1,300.",
            "Loss rupees = 1,300 − 1,170 = 130.",
            "Loss % check: 130 / 1,300 × 100 = 10%. Matches.",
            "Trap: 1,170 − 10% of 1,170 = 1,170 − 117 = 1,053, which treats 10% as of SP. Wrong base.",
          ],
          result: "CP = Rs 1,300",
        },
        {
          title: "Successive 20% and 15% off 2,500",
          prompt:
            "Marked price Rs 2,500. Successive discounts 20% then 15%. Find SP, rupee discount, and the single equivalent discount %.",
          steps: [
            "After 20%: residual 80% of 2,500 = 0.80 × 2,500 = 2,000.",
            "After 15% on 2,000: residual 85% of 2,000 = 0.85 × 2,000 = 1,700. That is SP.",
            "Total rupee discount = 2,500 − 1,700 = 800.",
            "Equivalent single discount factor = 0.80 × 0.85 = 0.68, so equivalent discount = 32%. Check: 32% of 2,500 = 800. Matches.",
            "Not 20 + 15 = 35% (that would discount 875 and SP 1,625). Successive discounts are not added.",
          ],
          result: "SP = Rs 1,700; discount = Rs 800; equivalent = 32%",
        },
        {
          title: "Two-scenario profit with extra CP",
          prompt:
            "A dealer sells at 20% profit. If the cost had been Rs 50 more and the selling price the same, the profit would have been 10%. Find the original CP and the SP.",
          steps: [
            "Let original CP = x. Then SP = 1.20x.",
            "New CP = x + 50, same SP, 10% profit: 1.20x = 1.10 (x + 50).",
            "1.20x = 1.10x + 55. Subtract 1.10x: 0.10x = 55, so x = 550.",
            "SP = 1.20 × 550 = 660. New CP = 600; 10% of 600 = 60; 600 + 60 = 660. Matches.",
            "Original profit rupees = 660 − 550 = 110, which is 20% of 550. Both scenarios share SP 660, not the same profit rupees (110 versus 60).",
          ],
          result: "Original CP = Rs 550; SP = Rs 660",
        },
      ],
    },
    {
      heading: "Ratio and proportion — chain ratios and mixtures",
      body: "A : B = 3 : 5 means A/B = 3/5, or A = 3k, B = 5k. To chain A : B = 3 : 5 and B : C = 10 : 9, make the B-terms equal: 3 : 5 becomes 6 : 10, then A : B : C = 6 : 10 : 9. Parts sum to 6 + 10 + 9 = 25; if the total is 500, one part = 20, and A = 120, B = 200, C = 180.\n\nDividing a number in a given ratio uses the same parts. Mixture: if milk : water = 5 : 2 in 35 litres, milk = 25 L, water = 10 L. Adding 9 L water changes only water to 19 L; the new ratio is 25 : 19. Alligation is the cross for two-strength mixing; the four examples below stay with parts and products so the arithmetic stays visible.\n\nIf 40% of A = 60% of B, then 0.4 A = 0.6 B, so A/B = 0.6/0.4 = 3/2. Then A : B = 3 : 2. Combine with a total if given. Inverse ratio appears in time-and-work and in TSD (speed inverse to time for a fixed distance).\n\nKeep units identical before you write a ratio (paise versus rupees, months versus years). The numbers in this block are not the 8,000 / 840 set from earlier blocks.",
      bullets: [
        "Equalise the common term to chain two ratios.",
        "Value of one part = total / (sum of parts).",
        "Adding a component changes only that part of the mixture.",
        "Percent-equal statements convert to a two-term ratio by cross-multiplication.",
      ],
      examples: [
        {
          title: "Chain 3 : 5 and 10 : 9 into a 500 total",
          prompt:
            "A : B = 3 : 5 and B : C = 10 : 9. If A + B + C = 500, find A, B and C.",
          steps: [
            "Make B equal in both ratios. A : B = 3 : 5 = 6 : 10 (multiply by 2). B : C is already 10 : 9.",
            "A : B : C = 6 : 10 : 9. Sum of parts = 6 + 10 + 9 = 25.",
            "One part = 500 / 25 = 20.",
            "A = 6 × 20 = 120, B = 10 × 20 = 200, C = 9 × 20 = 180.",
            "Check: 120 + 200 + 180 = 500, 120 : 200 = 3 : 5, 200 : 180 = 10 : 9. All three conditions hold.",
          ],
          result: "A = 120, B = 200, C = 180",
        },
        {
          title: "Divide 1,170 into 2 : 3 : 4",
          prompt: "Divide Rs 1,170 among P, Q, R in the ratio 2 : 3 : 4.",
          steps: [
            "Parts = 2 + 3 + 4 = 9.",
            "One part = 1,170 / 9 = 130.",
            "P = 2 × 130 = 260, Q = 3 × 130 = 390, R = 4 × 130 = 520.",
            "Check sum: 260 + 390 = 650, 650 + 520 = 1,170.",
            "Check ratios: 260 : 390 = 2 : 3, 390 : 520 = 3 : 4. Matches 2 : 3 : 4.",
          ],
          result: "260, 390 and 520",
        },
        {
          title: "Milk : water 5 : 2, then add 9 L water",
          prompt:
            "35 litres of a mixture has milk : water = 5 : 2. Then 9 litres of water are added. Find the new ratio of milk to water.",
          steps: [
            "Parts 5 + 2 = 7. One part of 35 L = 35 / 7 = 5 L.",
            "Milk = 5 × 5 = 25 L. Water = 2 × 5 = 10 L. Check 25 + 10 = 35.",
            "Add 9 L water: water becomes 10 + 9 = 19 L. Milk is still 25 L.",
            "New ratio milk : water = 25 : 19 (already coprime; 25 and 19 share no common factor).",
            "Trap: adding 9 L to the whole 35 and keeping 5 : 2. That would ignore that only water was added. The milk quantity cannot rise.",
          ],
          result: "25 : 19",
        },
        {
          title: "40% of A equals 60% of B, total 450",
          prompt:
            "40% of A = 60% of B, and A + B = 450. Find A and B.",
          steps: [
            "0.40 A = 0.60 B, so A / B = 0.60 / 0.40 = 6/4 = 3/2.",
            "A : B = 3 : 2. Parts = 5. One part = 450 / 5 = 90.",
            "A = 3 × 90 = 270, B = 2 × 90 = 180.",
            "Check the percent statement: 40% of 270 = 108. 60% of 180 = 108. Equal.",
            "Check total: 270 + 180 = 450. Both conditions hold. (If you set 40% of A = 60% of A you would have collapsed A and B.)",
          ],
          result: "A = 270, B = 180",
        },
      ],
    },
    {
      heading: "Time, speed and distance — units, trains, boats",
      body: "Distance = speed × time. Convert km/h to m/s by multiplying by 5/18; m/s to km/h by 18/5. Average speed for two equal distances is the harmonic mean 2xy/(x+y), not (x+y)/2. For unequal distances, total distance over total time is the only definition.\n\nA train passing a pole (or a person) covers its own length. Passing a platform or another train covers the sum of lengths. Opposite directions: add speeds; same direction: subtract. Boats: downstream speed = boat + current; upstream = boat − current; boat = (down + up)/2; current = (down − up)/2.\n\nKeep one unit system in a question. 54 km/h = 54 × 5/18 = 15 m/s is the most common conversion in this paper; 72 km/h = 20 m/s; 36 km/h = 10 m/s; 90 km/h = 25 m/s. Write the conversion as a step, not as a remembered jump, so a 63 km/h item (17.5 m/s) does not get faked as 15.\n\nRelative speed is a signed combination only after both speeds are in the same units. The four examples use 40/60, 72, 54, and a 24 km stream — none repeats the 180 m / 54 km/h pole item from the short bank.",
      bullets: [
        "km/h → m/s: × 5/18. Pole: own length. Platform: sum of lengths.",
        "Opposite trains: add speeds. Same direction: subtract.",
        "Equal distances: harmonic mean. Unequal: total s / total t.",
        "Boat = (down + up)/2; current = (down − up)/2.",
      ],
      examples: [
        {
          title: "Two equal 60 km legs at 40 and 60 km/h",
          prompt:
            "A car covers 60 km at 40 km/h and the next 60 km at 60 km/h. Find the average speed for the 120 km.",
          steps: [
            "Time for first 60 km = 60/40 = 1.5 hours.",
            "Time for second 60 km = 60/60 = 1 hour.",
            "Total distance = 120 km. Total time = 1.5 + 1 = 2.5 hours.",
            "Average speed = 120 / 2.5 = 48 km/h.",
            "Harmonic check for equal distances: 2×40×60 / (40+60) = 4,800 / 100 = 48. Arithmetic mean would have been 50 — that is the trap.",
          ],
          result: "48 km/h",
        },
        {
          title: "240 m train at 72 km/h past a pole",
          prompt: "A train 240 m long runs at 72 km/h. Time to pass a pole?",
          steps: [
            "Convert: 72 km/h = 72 × 5/18 m/s. 72/18 = 4, then 4 × 5 = 20 m/s.",
            "Distance to pass a pole = length of train = 240 m.",
            "Time = distance / speed = 240 / 20 = 12 seconds.",
            "If someone leaves speed in km/h: 240 m = 0.24 km, 0.24/72 hours = 0.00333 h × 3600 = 12 s. Same answer, clumsier units.",
            "A platform would add the platform length. A pole does not. Answer 12 s.",
          ],
          result: "12 seconds",
        },
        {
          title: "180 m train at 54 km/h past a 120 m platform",
          prompt:
            "A train 180 m long running at 54 km/h passes a 120 m platform. Find the time taken.",
          steps: [
            "Speed: 54 km/h = 54 × 5/18 = (54/18) × 5 = 3 × 5 = 15 m/s.",
            "Distance to clear the platform = train + platform = 180 + 120 = 300 m.",
            "Time = 300 / 15 = 20 seconds.",
            "Pole-only trap would have used 180/15 = 12 s — that ignores the platform.",
            "In minutes: 20/60 = 1/3 minute, not a usual option. The answer is 20 s.",
          ],
          result: "20 seconds",
        },
        {
          title: "Downstream 24 km in 2 h, upstream 24 km in 3 h",
          prompt:
            "A boat covers 24 km downstream in 2 hours and the same 24 km upstream in 3 hours. Find the speed of the boat in still water and the speed of the current.",
          steps: [
            "Downstream speed = 24/2 = 12 km/h. Upstream speed = 24/3 = 8 km/h.",
            "Still-water boat speed b = (12 + 8) / 2 = 20/2 = 10 km/h.",
            "Current c = (12 − 8) / 2 = 4/2 = 2 km/h.",
            "Check: down = 10 + 2 = 12, up = 10 − 2 = 8. Times: 24/12 = 2 h, 24/8 = 3 h. Matches.",
            "If you averaged 2 h and 3 h first (2.5 h for 24 km) you would invent 9.6 km/h, which is neither b nor c.",
          ],
          result: "Boat = 10 km/h; current = 2 km/h",
        },
      ],
    },
    {
      heading: "Time and work — rates, pipes, and two-equation crews",
      body: "If A finishes a job in a days, A’s rate is 1/a job per day. Together, rates add (or subtract for an emptying pipe). Total work can also be counted in man-days: 8 men × 15 days = 120 man-days, so 10 men need 12 days at the same rate. When men and women have different rates, you need two mixed-crew equations and you solve the system; you cannot scale a mixed crew as if it were one type of worker.\n\nLCM of the given days is a convenient ‘work unit’ (36 units if 12-day and 18-day workers). Pipes: fill rates positive, leak/empty rates negative. If A fills in 20 min, B in 30 min, C empties in 15 min, net rate = 1/20 + 1/30 − 1/15.\n\nA+B, B+C, C+A puzzles: add all three pairwise rates to get 2(A+B+C), then halve, then peel off one person by subtracting a pair. Keep fractions over an LCM (60, 24, 36) rather than early decimals.\n\nThe 6-men-8-women / 8-men-6-women system in the last example is the one place candidates skip algebra. Do not skip it: every number is written out.",
      bullets: [
        "Rate = 1/time. Together = sum of rates. Man-days = men × days.",
        "LCM of days = dummy total work, then share as integers.",
        "Emptying pipe / leak = minus rate.",
        "Two mixed crews: two linear equations in two rates; do not scale a mix as one worker-type.",
      ],
      examples: [
        {
          title: "A in 12 days, B in 18; then A works 3 days",
          prompt:
            "A can finish a job in 12 days, B in 18 days. (i) How long together? (ii) If A works 3 days and then stops, how long will B take to finish the rest?",
          steps: [
            "Rates: A = 1/12, B = 1/18. LCM of 12 and 18 is 36, so A = 3/36 per day, B = 2/36 per day, together 5/36 per day.",
            "Together time = 36/5 = 7.2 days = 7 days 4 hours 48 minutes if a day is 24 hours — but the exam wants 36/5 or 7.2 days. Keep 36/5 days.",
            "A in 3 days does 3/12 = 1/4 of the job. Remaining = 3/4.",
            "B’s time for 3/4: (3/4) / (1/18) = (3/4) × 18 = 54/4 = 13.5 days.",
            "Check remaining in 36-units: total 36, A’s 3 days = 9 units, remaining 27; B does 2 units/day, 27/2 = 13.5. Matches.",
          ],
          result: "Together = 36/5 days; B after A’s 3 days = 13.5 days",
        },
        {
          title: "Man-days: 8 men, 15 days → 10 men",
          prompt:
            "8 men finish a job in 15 days. How many days will 10 men take, same rate?",
          steps: [
            "Total work = 8 × 15 = 120 man-days.",
            "10 men produce 10 man-days per calendar day.",
            "Days needed = 120 / 10 = 12 days.",
            "Inverse proportion: men × days constant, 8 × 15 = 10 × d, d = 120/10 = 12.",
            "If someone scales 15 × 10/8 = 18.75 they inverted the wrong way (more men must take fewer days).",
          ],
          result: "12 days",
        },
        {
          title: "A+B, B+C, C+A pairwise",
          prompt:
            "A and B finish in 10 days, B and C in 12 days, C and A in 15 days. Find (i) days for A+B+C together (ii) days for A alone.",
          steps: [
            "Rates: A+B = 1/10, B+C = 1/12, C+A = 1/15.",
            "Add: 2(A+B+C) = 1/10 + 1/12 + 1/15. LCM of 10, 12, 15 = 60. 6/60 + 5/60 + 4/60 = 15/60 = 1/4.",
            "So A+B+C = (1/4)/2 = 1/8 job per day. Together they need 8 days.",
            "A alone = (A+B+C) − (B+C) = 1/8 − 1/12. LCM 24: 3/24 − 2/24 = 1/24. A needs 24 days.",
            "Peel B: (A+B+C) − (C+A) = 1/8 − 1/15. LCM 120: 15/120 − 8/120 = 7/120, B needs 120/7 days. Peel C: 1/8 − 1/10 = 1/40, C needs 40 days. Asked limbs: 8 days together, A = 24 days.",
          ],
          result: "A+B+C together = 8 days; A alone = 24 days",
        },
        {
          title: "Pipes A 20, B 30, leak C 15",
          prompt:
            "Pipe A fills a tank in 20 minutes, pipe B in 30 minutes. Tap C empties it in 15 minutes. If all three are open, how long to fill the tank?",
          steps: [
            "Rates per minute: A = 1/20, B = 1/30, C = −1/15.",
            "Net = 1/20 + 1/30 − 1/15. LCM of 20, 30, 15 = 60.",
            "3/60 + 2/60 − 4/60 = (3 + 2 − 4)/60 = 1/60 tank per minute.",
            "Time to fill = 60 minutes.",
            "If C were also a filler, net would be 3+2+4 = 9/60 = 3/20, time 20/3 min. The minus on C is the whole question. Answer 60 min.",
          ],
          result: "60 minutes",
        },
        {
          title: "Two mixed crews — 6 men 8 women, then 8 men 6 women",
          prompt:
            "6 men and 8 women finish a job in 10 days. 8 men and 6 women finish the same job in 8 days. How many days will 10 men and 10 women take?",
          steps: [
            "Let m be one man’s one-day rate and w one woman’s. Then 6m + 8w = 1/10, and 8m + 6w = 1/8.",
            "Multiply the first equation by 3 and the second by 4 so the w-coefficients match: 18m + 24w = 3/10, and 32m + 24w = 4/8 = 1/2 = 5/10.",
            "Subtract the first from the second: (32m − 18m) + (24w − 24w) = 5/10 − 3/10, so 14m = 2/10 = 1/5, hence m = (1/5)/14 = 1/70.",
            "Put m into 6m + 8w = 1/10: 6/70 + 8w = 1/10, so 3/35 + 8w = 1/10. 8w = 1/10 − 3/35. LCM 70: 7/70 − 6/70 = 1/70. Thus w = (1/70)/8 = 1/560.",
            "10 men + 10 women: 10m + 10w = 10/70 + 10/560 = 1/7 + 1/56. LCM 56: 8/56 + 1/56 = 9/56 job per day. Days = 56/9 days. (Do not scale the 6+8 crew as if it were 14 identical workers.)",
          ],
          result: "56/9 days",
        },
      ],
    },
    {
      heading: "Probability — counting, cards, dice, coins",
      body: "P(E) = n(E) / n(S) when outcomes are equally likely. Combination C(n,r) = n! / (r! (n−r)!) counts unordered hands; permutation P(n,r) counts ordered draws. ‘At least one’ is usually 1 − P(none). ‘And’ for independent events multiplies; ‘or’ for mutually exclusive events adds; overlapping or uses P(A)+P(B)−P(A and B).\n\nA deck has 52 cards, 4 suits, 13 ranks, 4 kings, 13 hearts, 1 king of hearts (do not double-count in a king-or-heart item). A fair die has 6 faces; two dice have 36 ordered pairs. Two coins have 4 outcomes; three coins have 8.\n\nConditional probability is rarer in Paper 1; if it appears, restrict the sample space first. Do not cancel numbers that are not factors of the same combination. Every example below writes C(n,r) as an integer ratio, then simplifies.",
      bullets: [
        "P = favourable / total; at least = 1 − none.",
        "C(n,r) for unordered; add speeds of thinking, not of cards.",
        "King or heart: 4 + 13 − 1 = 16, not 17.",
        "Independent and → multiply; exclusive or → add.",
      ],
      examples: [
        {
          title: "5 red, 7 blue, two cards both red",
          prompt:
            "A bag has 5 red and 7 blue balls. Two balls are drawn at random without replacement. Probability both are red?",
          steps: [
            "Total balls = 5 + 7 = 12. Unordered pairs: C(12,2) = 12×11/2 = 66.",
            "Red pairs: C(5,2) = 5×4/2 = 10.",
            "P = 10/66 = 5/33 after dividing by 2.",
            "Sequential: P(first red) = 5/12, P(second red | first red) = 4/11, product = 20/132 = 5/33. Same.",
            "With-replacement trap would be (5/12)² = 25/144. The stem said without replacement (standard two-draw bag).",
          ],
          result: "5/33",
        },
        {
          title: "Two dice, sum 9",
          prompt: "Two fair dice are thrown. Probability that the sum is 9?",
          steps: [
            "Sample space = 6 × 6 = 36 ordered pairs.",
            "Pairs summing to 9: (3,6), (4,5), (5,4), (6,3). That is 4 pairs. (2,7) is impossible; (9,0) is impossible.",
            "(3,6) and (6,3) are distinct ordered outcomes. Do not collapse them.",
            "P = 4/36 = 1/9.",
            "Sum 7 would have been 6/36 = 1/6 (the modal sum). Sum 9 is thinner. Answer 1/9, not 1/6.",
          ],
          result: "1/9",
        },
        {
          title: "King or heart from 52",
          prompt:
            "One card from a 52-card deck. Probability it is a king or a heart?",
          steps: [
            "Kings = 4, hearts = 13. King of hearts is in both sets.",
            "Inclusion: 4 + 13 − 1 = 16 favourable cards.",
            "P = 16/52. Divide by 4: 4/13.",
            "If you add 4+13 = 17 you double-count the king of hearts and get 17/52, the standard trap.",
            "Hearts that are not kings = 12, plus 4 kings = 16. Same count. Answer 4/13.",
          ],
          result: "4/13",
        },
        {
          title: "Three coins, at least two heads; and C(8,3) with a named person",
          prompt:
            "(i) Three fair coins: probability of at least two heads. (ii) 8 people, a committee of 3; probability that a particular person A is on it.",
          steps: [
            "Three coins, 8 equally likely outcomes: HHH, HHT, HTH, THH, HTT, THT, TTH, TTT.",
            "At least two heads: HHH, HHT, HTH, THH — 4 outcomes. P = 4/8 = 1/2. (At least one head would be 1 − 1/8 = 7/8; that is a different stem.)",
            "Committees: C(8,3) = 8×7×6 / (3×2×1) = 336 / 6 = 56 total.",
            "Committees including A: choose 2 more from the other 7: C(7,2) = 21. P = 21/56 = 3/8.",
            "Shortcut: A is equally likely to be in or out in each slot of a random triple; P(A included) = 3/8. Same. Two answers: 1/2 and 3/8.",
          ],
          result: "(i) 1/2  (ii) 3/8",
        },
      ],
    },
    {
      heading: "Quadratic comparison — roots first, then all four pairings",
      body: "Paper 1 gives two quadratic equations, one in x and one in y, and asks which relation holds: x > y, x < y, x ≥ y, x ≤ y, or cannot be determined. There is no shortcut that reads coefficients without roots. Factor (or quadratic formula), list the two x-roots and two y-roots, then test every pairing.\n\nIf the smallest x is still larger than the largest y, then x > y always. If one pairing is > and another is <, the relation cannot be determined. Equality of one root across equations produces ≥ or ≤ when the other pairings do not reverse the inequality.\n\nSign check: product of roots = c/a, sum = −b/a. Use that to catch a factoring error before you compare. Do not compare sums of roots and call that x versus y. The four examples use four different integer/half-integer root sets.",
      bullets: [
        "Factor both equations; write the two x values and two y values.",
        "Test all four (x,y) pairings before picking ≥ or ‘cannot say’.",
        "x > y for all pairings iff min x > max y.",
        "Sum/product checks catch factoring slips; they are not the comparison.",
      ],
      examples: [
        {
          title: "x² − 7x + 12 = 0 versus y² − 5y + 6 = 0",
          prompt:
            "I. x² − 7x + 12 = 0  II. y² − 5y + 6 = 0. Compare x and y: greater, less, ≥, ≤, or cannot say.",
          steps: [
            "I: x² − 7x + 12 = (x − 3)(x − 4) = 0, so x = 3 or x = 4. Sum 7, product 12. Checks.",
            "II: y² − 5y + 6 = (y − 2)(y − 3) = 0, so y = 2 or y = 3. Sum 5, product 6. Checks.",
            "Pairings: (3,2) → x > y; (3,3) → x = y; (4,2) → x > y; (4,3) → x > y.",
            "No pairing has x < y. One pairing is equal. Therefore x ≥ y.",
            "Not ‘x > y’, because equality is possible when x = 3 and y = 3. Not ‘cannot say’, because x is never smaller.",
          ],
          result: "x ≥ y",
        },
        {
          title: "Mixed signs — cannot determine",
          prompt:
            "I. x² + 5x + 6 = 0  II. y² + y − 6 = 0. Relation between x and y?",
          steps: [
            "I: x² + 5x + 6 = (x + 2)(x + 3) = 0, so x = −2 or x = −3.",
            "II: y² + y − 6 = (y + 3)(y − 2) = 0, so y = −3 or y = 2.",
            "Pairings: (−2, −3) → x > y; (−2, 2) → x < y; (−3, −3) → equal; (−3, 2) → x < y.",
            "We have x > y, x = y, and x < y among the pairings.",
            "No single inequality holds for all pairings. Relation cannot be determined.",
          ],
          result: "Relation cannot be determined",
        },
        {
          title: "2x² − 11x + 15 = 0 versus y² − 9y + 20 = 0",
          prompt: "Compare x and y.",
          steps: [
            "I: 2x² − 11x + 15 = 0. Split −11x as −6x − 5x: 2x² − 6x − 5x + 15 = 2x(x − 3) − 5(x − 3) = (2x − 5)(x − 3) = 0.",
            "x = 5/2 = 2.5 or x = 3. Sum = 11/2 = 5.5, product = 15/2 = 7.5. Checks with −b/a and c/a.",
            "II: y² − 9y + 20 = (y − 4)(y − 5) = 0, so y = 4 or y = 5.",
            "Max x is 3; min y is 4. Every x is less than every y: 2.5 < 4, 2.5 < 5, 3 < 4, 3 < 5.",
            "Therefore x < y (strict). Not ≤, because equality never occurs.",
          ],
          result: "x < y",
        },
        {
          title: "x² − 8x + 15 = 0 versus 2y² − 9y + 10 = 0",
          prompt: "Compare x and y.",
          steps: [
            "I: x² − 8x + 15 = (x − 3)(x − 5) = 0, so x = 3 or x = 5.",
            "II: 2y² − 9y + 10 = 0. Split −9y as −4y − 5y: 2y² − 4y − 5y + 10 = 2y(y − 2) − 5(y − 2) = (2y − 5)(y − 2) = 0.",
            "y = 5/2 = 2.5 or y = 2. Sum = 9/2 = 4.5, product = 5. Checks.",
            "Min x = 3; max y = 2.5. Pairings: 3 > 2.5, 3 > 2, 5 > 2.5, 5 > 2. All four give x > y.",
            "Therefore x > y. Not ≥, because they are never equal.",
          ],
          result: "x > y",
        },
      ],
    },
    {
      heading: "Number series — name the rule before you extend",
      body: "A missing-term series is a rule hunt. Try, in order: (1) first differences (arithmetic) (2) second differences (quadratic) (3) ×k ± m with a small k (4) ×k − k or ×k − 1 (5) +1², +2², +3²… or +1³, +2³ (6) n³ + c (7) interleaved two series. Write the differences on paper; do not ‘see’ a 193 from a 97 without the line 97 × 2 − 1.\n\nWrong options are usually the next term under a rival rule (×2 instead of ×2 − 1, or +36 instead of +49). If two rules fit four terms, the fifth term is the tie-break — that is why you compute every step on the given terms first, then extend.\n\nLetter-number mixed series belong to reasoning. Here everything is numeric. Unique starts: 7, 11, 5, 3 — none is the 2, 3, 8, 27 cliché without working.",
      bullets: [
        "Write differences or ×k ± m under every consecutive pair first.",
        "Powers: +n², +n³, or the term itself is n³ + c.",
        "Interleaved series: odd places one rule, even places another.",
        "Compute the given chain fully; only then predict the blank.",
      ],
      examples: [
        {
          title: "×2 − 1 from 7",
          prompt: "7, 13, 25, 49, 97, ?",
          steps: [
            "13 versus 7: 7 × 2 − 1 = 14 − 1 = 13.",
            "25 versus 13: 13 × 2 − 1 = 26 − 1 = 25.",
            "49 versus 25: 25 × 2 − 1 = 50 − 1 = 49.",
            "97 versus 49: 49 × 2 − 1 = 98 − 1 = 97. Rule holds on every given step.",
            "Next: 97 × 2 − 1 = 194 − 1 = 193. (×2 alone would give 194, a common trap option.)",
          ],
          result: "193",
        },
        {
          title: "×2 − 2 from 11",
          prompt: "11, 20, 38, 74, 146, ?",
          steps: [
            "11 × 2 − 2 = 22 − 2 = 20.",
            "20 × 2 − 2 = 40 − 2 = 38.",
            "38 × 2 − 2 = 76 − 2 = 74.",
            "74 × 2 − 2 = 148 − 2 = 146. All four given steps match ×2 − 2.",
            "Next: 146 × 2 − 2 = 292 − 2 = 290. (×2 − 1 would have broken already at 11 → 21, not 20.)",
          ],
          result: "290",
        },
        {
          title: "Plus squares from 5",
          prompt: "5, 9, 18, 34, 59, 95, ?",
          steps: [
            "Differences: 9 − 5 = 4, 18 − 9 = 9, 34 − 18 = 16, 59 − 34 = 25, 95 − 59 = 36.",
            "Those differences are 2², 3², 4², 5², 6².",
            "The next difference must be 7² = 49.",
            "Next term = 95 + 49 = 144.",
            "If you added 6² again (36) you would get 131. If you thought cubes, 4, 9, 16 are not cubes. Answer 144.",
          ],
          result: "144",
        },
        {
          title: "n³ + 2 from n = 1",
          prompt: "3, 10, 29, 66, 127, ?",
          steps: [
            "Test n³ + 2: 1³ + 2 = 3. Matches the first term.",
            "2³ + 2 = 8 + 2 = 10. Matches.",
            "3³ + 2 = 27 + 2 = 29. Matches.",
            "4³ + 2 = 64 + 2 = 66; 5³ + 2 = 125 + 2 = 127. The whole given chain is n³ + 2 for n = 1,2,3,4,5.",
            "Next n = 6: 6³ + 2 = 216 + 2 = 218. (6³ − 2 = 214 would be a different rule that already fails at the first term.)",
          ],
          result: "218",
        },
      ],
    },
    {
      heading: "A tiny DI table — add, ratio, average, percent of a cell",
      body: "Data interpretation in Paper 1 is often one table or one bar set and three to five arithmetic questions. The method is the same as the rest of Quant: copy the cells you need, add in a column, then divide. Do not read a total from a neighbouring company. Annual sales are the sum of four quarters, not the last quarter times four unless the stem says so.\n\nPercentage change uses the earlier cell as base: (new − old)/old × 100. A ratio of two annual totals should be left in lowest terms only after both annuals are computed. Averages divide by 4 for quarterly arithmetic means, not by 3.\n\nThe table below is small enough to compute by hand in under a minute per question. Unique cells: Alpha 48, 56, 63, 72; Beta 35, 42, 40, 51; Gamma 60, 55, 70, 65 — not a 100-based ‘nice percent’ table, so every percent is earned.",
      bullets: [
        "Annual = Q1+Q2+Q3+Q4; do not ×4 the last quarter.",
        "% change = (new − old)/old × 100, old in the denominator.",
        "Average of four quarters divides by 4.",
        "Write the four-cell sum as a step; that sum is reused.",
      ],
      examples: [
        {
          title: "Alpha annual and Q1→Q4 % rise",
          prompt:
            "Quarterly sales (Rs crore): Alpha 48, 56, 63, 72; Beta 35, 42, 40, 51; Gamma 60, 55, 70, 65. Find Alpha’s annual sales and the percentage increase from Alpha Q1 to Alpha Q4.",
          steps: [
            "Alpha annual = 48 + 56 = 104; 104 + 63 = 167; 167 + 72 = 239. Annual = 239.",
            "Q1→Q4 absolute increase = 72 − 48 = 24.",
            "Percentage increase = (24 / 48) × 100.",
            "24/48 = 1/2, so 50%.",
            "Base is Q1 = 48, not the annual 239 and not Q4. Answer pair: 239 and 50%.",
          ],
          result: "Alpha annual = 239; Q1 to Q4 increase = 50%",
        },
        {
          title: "Highest Q3 and Gamma−Beta in Q3",
          prompt: "Using the same table, who has the highest Q3 sales, and by how much does Gamma beat Beta in Q3?",
          steps: [
            "Q3 values: Alpha 63, Beta 40, Gamma 70.",
            "Highest Q3 is Gamma at 70 (70 > 63 > 40).",
            "Gamma − Beta in Q3 = 70 − 40 = 30.",
            "Alpha is second, not first; a glance at Gamma’s Q1 (60) is the wrong quarter.",
            "Answers: Gamma highest Q3; difference versus Beta = 30.",
          ],
          result: "Gamma (70); difference over Beta = 30",
        },
        {
          title: "Beta’s average quarter",
          prompt: "Find Beta’s average quarterly sales.",
          steps: [
            "Beta quarters: 35 + 42 = 77.",
            "77 + 40 = 117.",
            "117 + 51 = 168.",
            "Average = 168 / 4 = 42.",
            "Note that 42 is also Beta’s Q2 cell; that is coincidence, verified by the sum 168, not assumed from Q2.",
          ],
          result: "42",
        },
        {
          title: "Gamma annual : Alpha annual, and Beta Q2 as % of Alpha Q2",
          prompt:
            "Find the ratio of Gamma’s annual sales to Alpha’s, and find Beta Q2 as a percentage of Alpha Q2.",
          steps: [
            "Gamma annual: 60 + 55 = 115; 115 + 70 = 185; 185 + 65 = 250.",
            "Alpha annual was 239 (from the first example: 48+56+63+72). Ratio Gamma : Alpha = 250 : 239. (Already coprime — 239 is prime, 250 = 2 × 5³, no common factor.)",
            "Beta Q2 = 42, Alpha Q2 = 56.",
            "Percentage = (42 / 56) × 100. 42/56 = 3/4 = 0.75, so 75%.",
            "Two answers: 250 : 239 and 75%. Do not reduce 250 : 239 to a decimal unless asked.",
          ],
          result: "250 : 239; Beta Q2 is 75% of Alpha Q2",
        },
      ],
    },
  ],
};
