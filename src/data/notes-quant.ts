import type { TopicNote } from "@/data/notes";

export const notesQuant: TopicNote = {
  topic: "quant",
  title: "Quant — techniques (beginner)",
  blurb:
    "Paper 1 Quant is short timed sums. Each section below is one technique. Read the two-line idea, follow the recipe, then copy the five worked examples onto paper. Every step shows the arithmetic and the reason, so you never have to guess a missing line.",
  blocks: [
    {
      heading: "BODMAS / left-to-right (× and ÷ same rank)",
      body: "BODMAS is the order of work: Brackets, Orders (squares and roots), Division and Multiplication, Addition and Subtraction.\n\nThe exam gives one mixed line such as 36 ÷ 4 × 6 + 25. The trap is treating × as stronger than ÷. They share the same rank, so you walk left to right: 36 ÷ 4 = 9, then 9 × 6 = 54.",
      howTo: [
        "Write the expression again, leaving space under it for a new line after each pass.",
        "Clear the innermost brackets first. Replace that pair with one number.",
        "Do squares and roots next. Replace each with one number.",
        "Walk left to right doing every × and ÷ as you meet it. Do not skip ahead.",
        "Walk left to right doing every + and − as you meet it.",
        "Check by asking: did I invent a bracket that was not written?",
      ],
      bullets: [
        "× and ÷ are equal. + and − are equal. Left to right in each pair.",
        "Brackets beat everything. Squares and roots beat × and ÷.",
        "If two options are 16 and 1, you probably grouped 9 × 4 before dividing.",
      ],
      examples: [
        {
          title: "Brackets, square, then ×÷ left to right",
          prompt: "Evaluate 36 ÷ 4 × (8 − 2) + 5² − 9.",
          steps: [
            {
              do: "Brackets first: 8 − 2 = 6. The line is now 36 ÷ 4 × 6 + 5² − 9.",
              why: "BODMAS starts with brackets. The pair (8 − 2) must become one number before anything else.",
            },
            {
              do: "Orders: 5² means 5 × 5 = 25. The line is now 36 ÷ 4 × 6 + 25 − 9.",
              why: "Squares sit in the Orders pass. They happen before any × or ÷.",
            },
            {
              do: "× and ÷ from the left: 36 ÷ 4 = 9. The line is now 9 × 6 + 25 − 9.",
              why: "Division and multiplication share one left-to-right walk. The ÷ is met first, so it is done first.",
            },
            {
              do: "Still in that walk: 9 × 6 = 54. The line is now 54 + 25 − 9.",
              why: "The × is the next ×÷ mark from the left. Only after this pass do we touch + and −.",
            },
            {
              do: "+ and − from the left: 54 + 25 = 79, then 79 − 9 = 70.",
              why: "Addition and subtraction also share one left-to-right walk. 54 + 25 is met before the − 9.",
            },
            {
              do: "Trap check: 36 ÷ (4 × 6) would be 36 ÷ 24 = 1.5, then 1.5 + 25 − 9 = 17.5. That invented a bracket.",
              why: "There is no bracket around 4 × 6. Equal-rank ×÷ forbids that grouping.",
            },
          ],
          result: "70",
        },
        {
          title: "No brackets — ÷ then × then +−",
          prompt: "Evaluate 15 + 48 ÷ 8 × 3 − 6.",
          steps: [
            {
              do: "There are no brackets and no squares. Start the ×÷ walk from the left: 48 ÷ 8 = 6.",
              why: "÷ and × outrank + and −, so the 15 and the − 6 wait. Inside ×÷, the ÷ is the leftmost mark.",
            },
            {
              do: "Next mark in that walk: 6 × 3 = 18. The line is now 15 + 18 − 6.",
              why: "After 48 ÷ 8 became 6, the × 3 still belongs to the same pass.",
            },
            {
              do: "Now + and − from the left: 15 + 18 = 33.",
              why: "The remaining marks are + and −, which share their own left-to-right walk.",
            },
            {
              do: "Then 33 − 6 = 27.",
              why: "The last mark is −. 33 minus 6 is 27.",
            },
            {
              do: "Trap: treating 48 ÷ 8 × 3 as 48 ÷ (8 × 3) = 48 ÷ 24 = 2, then 15 + 2 − 6 = 11.",
              why: "That groups × before ÷. They are the same rank, so the ÷ on the left wins.",
            },
            {
              do: "Second trap: doing 15 + 48 first. That would mix a + into the ×÷ pass.",
              why: "+ waits until every × and ÷ is gone. The value is 27, not 11 and not 57.",
            },
          ],
          result: "27",
        },
        {
          title: "Root, cube, mixed ×÷",
          prompt: "Evaluate √64 + 3³ − 10 × 2 + 24 ÷ 4.",
          steps: [
            {
              do: "Orders: √64 = 8 because 8 × 8 = 64. And 3³ = 3 × 3 × 3 = 9 × 3 = 27.",
              why: "Roots and cubes are Orders. They happen before × and ÷. The line is 8 + 27 − 10 × 2 + 24 ÷ 4.",
            },
            {
              do: "×÷ walk: 10 × 2 = 20, and 24 ÷ 4 = 6. The line is now 8 + 27 − 20 + 6.",
              why: "These two marks do not sit on top of each other, so each is replaced in the same pass.",
            },
            {
              do: "+− walk from the left: 8 + 27 = 35.",
              why: "The first remaining mark from the left is +.",
            },
            {
              do: "Then 35 − 20 = 15.",
              why: "The next mark is −. Subtract 20 from 35.",
            },
            {
              do: "Then 15 + 6 = 21.",
              why: "The last mark is +. The sign in front of 24 ÷ 4 was +, so we add 6, we do not subtract it.",
            },
            {
              do: "If you subtracted 6 you would get 9. That changes + 24 ÷ 4 into a minus.",
              why: "Keep the written sign. The value is 21.",
            },
          ],
          result: "21",
        },
        {
          title: "Brackets and square, then ×÷ left to right",
          prompt: "Evaluate 72 ÷ 8 × (9 − 3) + 4² − 10.",
          steps: [
            {
              do: "Brackets first: 9 − 3 = 6. The line is now 72 ÷ 8 × 6 + 4² − 10.",
              why: "The pair (9 − 3) must become one number before ×, ÷, + or −.",
            },
            {
              do: "Orders: 4² means 4 × 4 = 16. The line is now 72 ÷ 8 × 6 + 16 − 10.",
              why: "Squares sit in the Orders pass, before any × or ÷.",
            },
            {
              do: "×÷ from the left: 72 ÷ 8 = 9. The line is now 9 × 6 + 16 − 10.",
              why: "Division and multiplication share one left-to-right walk. The ÷ is met first.",
            },
            {
              do: "Still in that walk: 9 × 6 = 54. The line is now 54 + 16 − 10.",
              why: "The × is the next ×÷ mark. Only after this pass do we touch + and −.",
            },
            {
              do: "+ and − from the left: 54 + 16 = 70, then 70 − 10 = 60.",
              why: "Addition and subtraction share their own left-to-right walk.",
            },
            {
              do: "Trap check: 72 ÷ (8 × 6) would be 72 ÷ 48 = 1.5, then 1.5 + 16 − 10 = 7.5. That invented a bracket.",
              why: "There is no bracket around 8 × 6. Equal-rank ×÷ forbids that grouping.",
            },
          ],
          result: "60",
        },
        {
          title: "No brackets — ÷ then × then −+",
          prompt: "Evaluate 20 − 96 ÷ 12 × 2 + 7.",
          steps: [
            {
              do: "There are no brackets and no squares. Start the ×÷ walk from the left: 96 ÷ 12 = 8.",
              why: "÷ and × outrank + and −, so the 20 and the + 7 wait. Inside ×÷, the ÷ is met first.",
            },
            {
              do: "Next mark in that walk: 8 × 2 = 16. The line is now 20 − 16 + 7.",
              why: "After 96 ÷ 12 became 8, the × 2 still belongs to the same pass.",
            },
            {
              do: "Now + and − from the left: 20 − 16 = 4.",
              why: "The remaining marks are − and +, which share their own left-to-right walk. The − is met first.",
            },
            {
              do: "Then 4 + 7 = 11.",
              why: "The last mark is +. The written sign in front of 7 is +, so we add 7.",
            },
            {
              do: "Trap: treating 96 ÷ 12 × 2 as 96 ÷ (12 × 2) = 96 ÷ 24 = 4, then 20 − 4 + 7 = 23.",
              why: "That groups × before ÷. They are the same rank, so the ÷ on the left wins.",
            },
            {
              do: "Second trap: doing 20 − 96 first. That would mix a − into the ×÷ pass.",
              why: "+ and − wait until every × and ÷ is gone. The value is 11, not 23.",
            },
          ],
          result: "11",
        },
      ],
    },
    {
      heading: "Percentage of a number",
      body: "x% of N means (x ÷ 100) × N. So 15% of 360 is 15 × 360 ÷ 100.\n\nThe exam asks ‘what is 18% of 450?’ or ‘12.5% of 480’. The trap is forgetting the ÷ 100, which makes the answer 100 times too big (8100 instead of 81).",
      howTo: [
        "Write (x / 100) × N as x × N / 100.",
        "Multiply x × N first. Write the full product.",
        "Divide that product by 100 (or shift the decimal two places left).",
        "Check with a split: 10% of N is N ÷ 10, then build the rest from that.",
        "If 12.5% appears, you may use 12.5% = 1/8, so divide N by 8.",
      ],
      bullets: [
        "x% of N = x × N ÷ 100. The ÷ 100 is not optional.",
        "10% is N ÷ 10. 5% is half of that. 1% is N ÷ 100.",
        "12.5% = 1/8. 25% = 1/4. 50% = 1/2. 20% = 1/5.",
      ],
      examples: [
        {
          title: "15% of 360",
          prompt: "What is 15% of 360?",
          steps: [
            {
              do: "Write 15% of 360 = (15 / 100) × 360 = 15 × 360 / 100.",
              why: "Per cent means ‘per hundred’. We always put the 15 over 100.",
            },
            {
              do: "Multiply 15 × 360. 15 × 300 = 4,500 and 15 × 60 = 900. Sum = 5,400.",
              why: "Do the product in full. Do not skip to a guessed 54.",
            },
            {
              do: "Divide by 100: 5,400 / 100 = 54.",
              why: "Dividing by 100 moves the decimal two places left: 5400 → 54.00.",
            },
            {
              do: "Split check: 10% of 360 = 36. 5% of 360 = 18 (half of 36). 15% = 36 + 18 = 54.",
              why: "A second route that uses 10% and 5% should match the first route.",
            },
            {
              do: "Trap: 15 × 360 = 5,400, offered as the answer because someone forgot / 100.",
              why: "5,400 is 1500% of 360, not 15%. The value is 54.",
            },
          ],
          result: "54",
        },
        {
          title: "12.5% of 480 using 1/8",
          prompt: "What is 12.5% of 480?",
          steps: [
            {
              do: "12.5% = 12.5 / 100 = 0.125. Also 12.5% = 1/8, because 1 ÷ 8 = 0.125.",
              why: "The fraction 1/8 is faster and avoids a messy decimal multiply.",
            },
            {
              do: "So 12.5% of 480 = 480 / 8.",
              why: "‘Of’ with a fraction means multiply, and (1/8) × 480 is 480 ÷ 8.",
            },
            {
              do: "480 ÷ 8 = 60, because 8 × 60 = 480.",
              why: "Write the inverse multiply so the division is checked on the same line.",
            },
            {
              do: "Decimal check: 0.125 × 480. First 0.125 × 400 = 50. Then 0.125 × 80 = 10. Sum = 60.",
              why: "0.125 × 80: 0.125 × 8 = 1, so 0.125 × 80 = 10. Both routes give 60.",
            },
            {
              do: "Trap: treating 12.5% as 12.5 × 480 = 6,000 (forgot / 100) or as 1/12 of 480 = 40.",
              why: "12.5% is 12.5 per hundred, not 12.5 as a raw multiply, and not 1/12.",
            },
          ],
          result: "60",
        },
        {
          title: "7% of 850",
          prompt: "What is 7% of 850?",
          steps: [
            {
              do: "Write 7% of 850 = 7 × 850 / 100.",
              why: "Same machine as before: x × N / 100.",
            },
            {
              do: "7 × 850: 7 × 800 = 5,600 and 7 × 50 = 350. Sum = 5,950.",
              why: "Split 850 into 800 + 50 so each multiply is easy.",
            },
            {
              do: "5,950 / 100 = 59.50.",
              why: "Two places left: 5950 → 59.50.",
            },
            {
              do: "1% of 850 = 8.50. Then 7% = 7 × 8.50. 7 × 8 = 56 and 7 × 0.50 = 3.50. Sum = 59.50.",
              why: "Building from 1% is a good check when the percent is an odd number like 7.",
            },
            {
              do: "10% of 850 = 85, which is larger than 59.50, as it should be, because 7% is less than 10%.",
              why: "A size check catches a slipped decimal. 595 would be 70%, which is far too big.",
            },
          ],
          result: "59.5",
        },
        {
          title: "18% of 250",
          prompt: "What is 18% of 250?",
          steps: [
            {
              do: "Write 18% of 250 = (18 / 100) × 250 = 18 × 250 / 100.",
              why: "Per cent means ‘per hundred’. We always put the 18 over 100.",
            },
            {
              do: "Multiply 18 × 250. 18 × 200 = 3,600 and 18 × 50 = 900. Sum = 4,500.",
              why: "Do the product in full. Split 250 into 200 + 50 so each multiply is easy.",
            },
            {
              do: "Divide by 100: 4,500 / 100 = 45.",
              why: "Dividing by 100 moves the decimal two places left: 4500 → 45.00.",
            },
            {
              do: "Split check: 10% of 250 = 25. 8% of 250 = 20 (because 1% is 2.50, so 8% is 20). 18% = 25 + 20 = 45.",
              why: "A second route that uses 10% and 8% should match the first route.",
            },
            {
              do: "Trap: 18 × 250 = 4,500, offered as the answer because someone forgot / 100.",
              why: "4,500 is 1800% of 250, not 18%. The value is 45.",
            },
          ],
          result: "45",
        },
        {
          title: "22% of 650",
          prompt: "What is 22% of 650?",
          steps: [
            {
              do: "Write 22% of 650 = 22 × 650 / 100.",
              why: "Same machine: x × N / 100.",
            },
            {
              do: "22 × 650: 20 × 650 = 13,000 and 2 × 650 = 1,300. Sum = 14,300.",
              why: "Split 22 into 20 + 2 so each multiply is easy.",
            },
            {
              do: "14,300 / 100 = 143.",
              why: "Two places left: 14300 → 143.00.",
            },
            {
              do: "Split check: 10% of 650 = 65. 20% = 130. 2% of 650 = 13. Then 130 + 13 = 143.",
              why: "Building from 10% and 2% should match 22 × 650 / 100.",
            },
            {
              do: "10% of 650 = 65, which is smaller than 143, as it should be, because 22% is more than 10%.",
              why: "A size check catches a slipped decimal. 1,430 would be 220%, which is far too big.",
            },
          ],
          result: "143",
        },
      ],
    },
    {
      heading: "Percentage increase and decrease",
      body: "To increase a number by x%, add x% of that number to it (or multiply by 1 + x/100). To decrease by x%, subtract x% of that number (or multiply by 1 − x/100).\n\nThe exam says ‘240 is increased by 20%’ or ‘salary falls 16%’. The trap is adding 20 to 240 instead of 20% of 240. Twenty percent of 240 is 48, not 20.",
      howTo: [
        "Name the starting number N and the percent x.",
        "Find x% of N: x × N / 100. Write that rupee (or unit) change.",
        "For an increase, add the change to N. For a decrease, subtract it from N.",
        "Or multiply: increase uses (100 + x)/100; decrease uses (100 − x)/100.",
        "Check by going backwards: from the new value, undo the same percent.",
      ],
      bullets: [
        "The percent is of the starting number, not of 100 as a raw add-on.",
        "Increase: new = N + (x% of N). Decrease: new = N − (x% of N).",
        "A 20% rise then uses 120/100 = 1.20 as a one-step multiply.",
      ],
      examples: [
        {
          title: "240 increased by 20%",
          prompt: "A price of Rs 240 is increased by 20%. Find the new price.",
          steps: [
            {
              do: "20% of 240 = 20 × 240 / 100.",
              why: "The rise is 20% of the old price, not 20 rupees.",
            },
            {
              do: "20 × 240 = 4,800. Then 4,800 / 100 = 48. The rise is Rs 48.",
              why: "Full product, then ÷ 100. 10% of 240 is 24, so 20% is 48 — same figure.",
            },
            {
              do: "New price = 240 + 48 = 288.",
              why: "Increase means add the change to the starting number.",
            },
            {
              do: "Multiply check: 240 × 1.20. 240 × 1 = 240. 240 × 0.20 = 48. Sum = 288.",
              why: "1.20 is 120/100, which is ‘the old 100% plus the extra 20%’.",
            },
            {
              do: "Trap: 240 + 20 = 260. That added 20 rupees, not 20 percent.",
              why: "Percent needs the / 100 step. The new price is 288, not 260.",
            },
          ],
          result: "Rs 288",
        },
        {
          title: "750 decreased by 16%",
          prompt: "A quantity 750 is decreased by 16%. Find the new quantity.",
          steps: [
            {
              do: "16% of 750 = 16 × 750 / 100.",
              why: "The fall is 16% of 750, the starting quantity.",
            },
            {
              do: "16 × 750: 10 × 750 = 7,500 and 6 × 750 = 4,500. Sum = 12,000. Then 12,000 / 100 = 120.",
              why: "Split 16 into 10 + 6. The fall is 120.",
            },
            {
              do: "New quantity = 750 − 120 = 630.",
              why: "Decrease means subtract the change.",
            },
            {
              do: "Multiply check: leftover is 84% because 100 − 16 = 84. 750 × 0.84. 750 × 0.80 = 600. 750 × 0.04 = 30. Sum = 630.",
              why: "0.84 = 84/100. Adding 600 + 30 confirms 630.",
            },
            {
              do: "Trap: 750 − 16 = 734, or 750 × 0.16 = 120 offered as the new value (that is only the fall).",
              why: "The question asks for the new quantity, which is what remains after the fall: 630.",
            },
          ],
          result: "630",
        },
        {
          title: "Salary 18,000 up 12%",
          prompt: "A monthly salary of Rs 18,000 is raised by 12%. Find the new salary.",
          steps: [
            {
              do: "12% of 18,000 = 12 × 18,000 / 100.",
              why: "The raise is 12% of the current salary.",
            },
            {
              do: "12 × 18,000 = 216,000. Then 216,000 / 100 = 2,160. The raise is Rs 2,160.",
              why: "Or split: 10% of 18,000 = 1,800. 2% of 18,000 = 360. 1,800 + 360 = 2,160.",
            },
            {
              do: "New salary = 18,000 + 2,160 = 20,160.",
              why: "Add the raise to the old salary.",
            },
            {
              do: "Multiply check: 18,000 × 1.12. 18,000 × 1 = 18,000. 18,000 × 0.12 = 2,160. Sum = 20,160.",
              why: "1.12 is 112/100.",
            },
            {
              do: "Trap: 18,000 × 12 = 216,000 (forgot / 100) or 18,000 + 12 = 18,012.",
              why: "Both skip the meaning of percent. The new salary is Rs 20,160.",
            },
          ],
          result: "Rs 20,160",
        },
        {
          title: "450 increased by 8%",
          prompt: "A price of Rs 450 is increased by 8%. Find the new price.",
          steps: [
            {
              do: "8% of 450 = 8 × 450 / 100.",
              why: "The rise is 8% of the old price, not 8 rupees.",
            },
            {
              do: "8 × 450 = 3,600. Then 3,600 / 100 = 36. The rise is Rs 36.",
              why: "Full product, then ÷ 100. 1% of 450 is 4.50, so 8% is 36 — same figure.",
            },
            {
              do: "New price = 450 + 36 = 486.",
              why: "Increase means add the change to the starting number.",
            },
            {
              do: "Multiply check: 450 × 1.08. 450 × 1 = 450. 450 × 0.08 = 36. Sum = 486.",
              why: "1.08 is 108/100, which is ‘the old 100% plus the extra 8%’.",
            },
            {
              do: "Trap: 450 + 8 = 458. That added 8 rupees, not 8 percent.",
              why: "Percent needs the / 100 step. The new price is 486, not 458.",
            },
          ],
          result: "Rs 486",
        },
        {
          title: "960 decreased by 25%",
          prompt: "A quantity 960 is decreased by 25%. Find the new quantity.",
          steps: [
            {
              do: "25% of 960 = 25 × 960 / 100.",
              why: "The fall is 25% of 960, the starting quantity.",
            },
            {
              do: "25% = 1/4, so 960 / 4 = 240. The fall is 240.",
              why: "A quarter of 960 is 240. 25 × 960 = 24,000, then 24,000 / 100 = 240. Same.",
            },
            {
              do: "New quantity = 960 − 240 = 720.",
              why: "Decrease means subtract the change.",
            },
            {
              do: "Multiply check: leftover is 75% because 100 − 25 = 75. 960 × 0.75. 960 × 0.70 = 672. 960 × 0.05 = 48. Sum = 720.",
              why: "0.75 = 75/100. Adding 672 + 48 confirms 720.",
            },
            {
              do: "Trap: 960 − 25 = 935, or 960 × 0.25 = 240 offered as the new value (that is only the fall).",
              why: "The question asks for the new quantity, which is what remains after the fall: 720.",
            },
          ],
          result: "720",
        },
      ],
    },
    {
      heading: "Successive percentage changes",
      body: "Two percent changes in a row multiply. After the first change you have a new base; the second percent is of that new base, not of the first number.\n\nThe exam says ‘grows 10% then falls 10%’ or ‘up 25% then up 20%’. The trap is adding the percents (10 − 10 = 0, or 25 + 20 = 45). Up 10% then down 10% does not return to the start.",
      howTo: [
        "Write the starting number N.",
        "Do the first change in full. Box the middle value M.",
        "Do the second change on M, not on N.",
        "Multiply check: N × (1 ± first/100) × (1 ± second/100).",
        "Compare with the wrong add-the-percents value so you can kill that option.",
      ],
      bullets: [
        "Second percent uses the new number, never the original.",
        "Up x% then down x% leaves a small loss, not zero change.",
        "Do not add +25% and +20% into +45%. Multiply 1.25 × 1.20 = 1.50.",
      ],
      examples: [
        {
          title: "Up 10% then down 10% on 8,000",
          prompt:
            "A town has 8,000 people. Population rises 10% in one year, then falls 10% the next year. Find the population after two years.",
          steps: [
            {
              do: "First year, +10% of 8,000. 10% of 8,000 = 800. Middle population = 8,000 + 800 = 8,800.",
              why: "The first percent uses the start. Box 8,800; it is the base of year two.",
            },
            {
              do: "Second year, −10% of 8,800 (not of 8,000). 10% of 8,800 = 880.",
              why: "The fall is of the new figure. 10% of 8,800 is 880, which is larger than 800.",
            },
            {
              do: "Final population = 8,800 − 880 = 7,920.",
              why: "Subtract the second-year fall from the middle value.",
            },
            {
              do: "Multiply check: 8,000 × 1.10 × 0.90. 8,000 × 1.10 = 8,800. 8,800 × 0.90 = 7,920.",
              why: "1.10 is a 10% rise. 0.90 is a 10% fall. The product 1.10 × 0.90 = 0.99, so 1% is lost.",
            },
            {
              do: "Trap: 10% up and 10% down cancel, so answer 8,000. They do not cancel.",
              why: "The fall is 10% of a bigger number than the rise was. Net = 7,920, which is 80 less.",
            },
          ],
          result: "7,920",
        },
        {
          title: "Up 25% then up 20% on 6,400",
          prompt:
            "A salary of Rs 6,400 rises 25% and then rises a further 20%. Find the salary after both rises.",
          steps: [
            {
              do: "First rise, 25% of 6,400. 25% = 1/4, so 6,400 / 4 = 1,600. Middle = 6,400 + 1,600 = 8,000.",
              why: "25% of a number is that number divided by 4.",
            },
            {
              do: "Second rise, 20% of 8,000. 20% = 1/5, so 8,000 / 5 = 1,600. Final = 8,000 + 1,600 = 9,600.",
              why: "The 20% uses 8,000, not 6,400. 20% of 6,400 would have been 1,280, which is the wrong base.",
            },
            {
              do: "Multiply check: 6,400 × 1.25 × 1.20. 6,400 × 1.25 = 8,000. 8,000 × 1.20 = 9,600.",
              why: "1.25 × 1.20 = 1.50, so the two rises together multiply by 1.50, which is a 50% rise, not 45%.",
            },
            {
              do: "Wrong add: 25 + 20 = 45%, and 45% of 6,400 = 0.45 × 6,400 = 2,880. Then 6,400 + 2,880 = 9,280.",
              why: "9,280 is a trap option. Successive rises multiply; they do not add.",
            },
            {
              do: "Difference between right and trap: 9,600 − 9,280 = 320. That 320 is 5% of 6,400, the extra from compounding.",
              why: "The second 20% includes 20% of the first rise 1,600, which is 320.",
            },
          ],
          result: "Rs 9,600",
        },
        {
          title: "12,000 up 10% then down 5%",
          prompt:
            "A price of Rs 12,000 rises 10% and then falls 5%. Find the final price.",
          steps: [
            {
              do: "First, +10% of 12,000. 10% of 12,000 = 1,200. Middle = 12,000 + 1,200 = 13,200.",
              why: "Box 13,200. The next percent uses this, not 12,000.",
            },
            {
              do: "Then −5% of 13,200. 5% of 13,200 = 13,200 / 20 = 660 (because 5% = 1/20).",
              why: "5% of 13,200: 10% would be 1,320, so 5% is half of that, 660. Same number.",
            },
            {
              do: "Final price = 13,200 − 660 = 12,540.",
              why: "Subtract the 5% fall from the middle price.",
            },
            {
              do: "Multiply check: 12,000 × 1.10 × 0.95. 12,000 × 1.10 = 13,200. 13,200 × 0.95: 13,200 × 1 = 13,200 minus 13,200 × 0.05 = 660, which is 12,540.",
              why: "0.95 is ‘keep 95%’. 1.10 × 0.95 = 1.045, a net 4.5% rise, not a 5% rise.",
            },
            {
              do: "Trap: net +5% of 12,000 = 600, giving 12,600. That added 10 − 5.",
              why: "Adding percents ignores the new base. The final price is 12,540, not 12,600.",
            },
          ],
          result: "Rs 12,540",
        },
        {
          title: "Down 20% then up 20% on 5,000",
          prompt:
            "A price of Rs 5,000 falls 20% and then rises 20%. Find the final price.",
          steps: [
            {
              do: "First, −20% of 5,000. 20% of 5,000 = 1,000. Middle = 5,000 − 1,000 = 4,000.",
              why: "Box 4,000. The next percent uses this, not 5,000.",
            },
            {
              do: "Then +20% of 4,000. 20% of 4,000 = 800. Final = 4,000 + 800 = 4,800.",
              why: "The rise is of 4,000, not of 5,000. 20% of 5,000 would have been 1,000, which is the wrong base.",
            },
            {
              do: "Multiply check: 5,000 × 0.80 × 1.20. 5,000 × 0.80 = 4,000. 4,000 × 1.20 = 4,800.",
              why: "0.80 × 1.20 = 0.96, so 4% is lost. Down 20% then up 20% does not return to the start.",
            },
            {
              do: "Trap: 20% down and 20% up cancel, so answer 5,000. They do not cancel.",
              why: "The rise is 20% of a smaller number than the fall was. Net = 4,800, which is 200 less.",
            },
            {
              do: "Difference: 5,000 − 4,800 = 200, which is 4% of 5,000. That matches 0.80 × 1.20 = 0.96.",
              why: "The second 20% is 20% of 4,000, not 20% of 5,000. Final price is 4,800.",
            },
          ],
          result: "Rs 4,800",
        },
        {
          title: "Up 15% then up 10% on 2,000",
          prompt:
            "A salary of Rs 2,000 rises 15% and then rises a further 10%. Find the salary after both rises.",
          steps: [
            {
              do: "First rise, 15% of 2,000. 10% of 2,000 = 200 and 5% = 100, so 15% = 300. Middle = 2,000 + 300 = 2,300.",
              why: "The first percent uses the start. Box 2,300; it is the base of the second rise.",
            },
            {
              do: "Second rise, 10% of 2,300. 10% of 2,300 = 230. Final = 2,300 + 230 = 2,530.",
              why: "The 10% uses 2,300, not 2,000. 10% of 2,000 would have been 200, which is the wrong base.",
            },
            {
              do: "Multiply check: 2,000 × 1.15 × 1.10. 2,000 × 1.15 = 2,300. 2,300 × 1.10 = 2,530.",
              why: "1.15 × 1.10 = 1.265, so the two rises together multiply by 1.265, which is a 26.5% rise, not 25%.",
            },
            {
              do: "Wrong add: 15 + 10 = 25%, and 25% of 2,000 = 500. Then 2,000 + 500 = 2,500.",
              why: "2,500 is a trap option. Successive rises multiply; they do not add.",
            },
            {
              do: "Difference between right and trap: 2,530 − 2,500 = 30. That 30 is 10% of the first rise 300.",
              why: "The second 10% includes 10% of the first rise 300, which is 30. Answer Rs 2,530.",
            },
          ],
          result: "Rs 2,530",
        },
      ],
    },
    {
      heading: "Reverse percentage (find original)",
      body: "If a number after a percent change is given, divide by the multiplier to get back to the original. After a 25% rise the multiplier is 1.25, so original = new ÷ 1.25.\n\nThe exam says ‘after a 20% increase the value is 480 — find the original’ or ‘35% of a number is 140’. The trap is taking 20% of the new value and subtracting. That 20% belonged to the unknown original, not to 480.",
      howTo: [
        "Write the sentence as original × multiplier = new value.",
        "For a rise of x%, multiplier = (100 + x)/100. For a fall, multiplier = (100 − x)/100.",
        "Divide: original = new ÷ multiplier. Do the division in full.",
        "If ‘x% of N is K’, then N = K × 100 / x.",
        "Check by going forward: apply the percent to your original and see if you recover the given new value.",
      ],
      bullets: [
        "Original = new ÷ (1 ± r). Never subtract x% of the new value.",
        "A 25% rise means new is 125% of original, so divide by 1.25 (or × 4/5).",
        "‘x% of N is K’ ⇒ N = K × 100 / x.",
      ],
      examples: [
        {
          title: "After a 25% rise the number is 450",
          prompt:
            "A number, when increased by 25%, becomes 450. Find the original number.",
          steps: [
            {
              do: "Let the original be x. Then x × (1 + 25/100) = 450, so 1.25x = 450.",
              why: "The 25% is of x, the unknown start. After the rise we hold 125% of x.",
            },
            {
              do: "x = 450 / 1.25. Write 1.25 as 5/4. Dividing by 5/4 is multiplying by 4/5.",
              why: "1.25 = 125/100 = 5/4. The inverse of 5/4 is 4/5.",
            },
            {
              do: "450 × 4 = 1,800. Then 1,800 / 5 = 360. So x = 360.",
              why: "Do 450 × 4 first, then divide by 5. 5 × 360 = 1,800, which checks the divide.",
            },
            {
              do: "Forward check: 25% of 360 = 360 / 4 = 90. Then 360 + 90 = 450. Matches.",
              why: "If the original is right, putting the percent back on must rebuild 450.",
            },
            {
              do: "Trap: 450 − 25% of 450. 25% of 450 = 112.5, and 450 − 112.5 = 337.5.",
              why: "That treats 25% as of 450. The 25% was of the smaller original. Answer 360, not 337.5.",
            },
          ],
          result: "360",
        },
        {
          title: "After a 20% fall the number is 640",
          prompt:
            "After a decrease of 20%, a number becomes 640. Find the original number.",
          steps: [
            {
              do: "Let original be x. After a 20% fall we have 80% of x, so 0.80x = 640.",
              why: "100% − 20% = 80%. The given 640 is the leftover 80%, not the start.",
            },
            {
              do: "x = 640 / 0.80. 0.80 = 4/5, so divide by 4/5 means multiply by 5/4.",
              why: "Or 640 / 0.8 = 6,400 / 8 = 800. Same value.",
            },
            {
              do: "640 × 5 = 3,200. Then 3,200 / 4 = 800. Original = 800.",
              why: "5/4 × 640: ×5 then ÷4.",
            },
            {
              do: "Forward check: 20% of 800 = 160. 800 − 160 = 640. Matches.",
              why: "Going forward from 800 must rebuild the given 640.",
            },
            {
              do: "Trap: 640 + 20% of 640. 20% of 640 = 128, and 640 + 128 = 768.",
              why: "Adding 20% of the new value overshoots. The fall was 20% of 800, which is 160, not 128.",
            },
          ],
          result: "800",
        },
        {
          title: "35% of a number is 140",
          prompt: "If 35% of a number is 140, find the number.",
          steps: [
            {
              do: "Write 35% of x = 140, so (35 / 100) × x = 140, or 0.35x = 140.",
              why: "‘35% of’ means multiply by 35/100. We are solving for x.",
            },
            {
              do: "x = 140 / 0.35. Multiply top and bottom by 100: x = 14,000 / 35.",
              why: "Clearing the decimal makes a whole-number divide.",
            },
            {
              do: "35 × 400 = 14,000, because 35 × 100 = 3,500 and 35 × 4 = 140, so 35 × 400 = 14,000. Thus x = 400.",
              why: "The quotient is 400.",
            },
            {
              do: "Forward check: 35% of 400 = 35 × 400 / 100 = 14,000 / 100 = 140. Matches.",
              why: "10% of 400 = 40, so 30% = 120 and 5% = 20, total 140. Same.",
            },
            {
              do: "Trap: 140 − 35 = 105, or 140 × 35 = 4,900.",
              why: "Neither is ‘undo 35% of’. We divide 140 by 0.35. The number is 400.",
            },
          ],
          result: "400",
        },
        {
          title: "After a 12% rise the number is 560",
          prompt:
            "A number, when increased by 12%, becomes 560. Find the original number.",
          steps: [
            {
              do: "Let the original be x. Then x × (1 + 12/100) = 560, so 1.12x = 560.",
              why: "The 12% is of x, the unknown start. After the rise we hold 112% of x.",
            },
            {
              do: "x = 560 / 1.12. Write 1.12 as 112/100 = 28/25. Dividing by 28/25 is multiplying by 25/28.",
              why: "1.12 = 112/100. Cancel 4: 28/25. The inverse of 28/25 is 25/28.",
            },
            {
              do: "Clear the decimal: 560 / 1.12 = 56,000 / 112. 112 × 500 = 56,000, so x = 500.",
              why: "112 × 5 = 560, therefore 112 × 500 = 56,000. Original = 500.",
            },
            {
              do: "Forward check: 12% of 500 = 60. Then 500 + 60 = 560. Matches.",
              why: "If the original is right, putting the percent back on must rebuild 560.",
            },
            {
              do: "Trap: 560 − 12% of 560. 12% of 560 = 67.2, and 560 − 67.2 = 492.8.",
              why: "That treats 12% as of 560. The 12% was of the smaller original. Answer 500, not 492.8.",
            },
          ],
          result: "500",
        },
        {
          title: "After a 15% fall the number is 510",
          prompt:
            "After a decrease of 15%, a number becomes 510. Find the original number.",
          steps: [
            {
              do: "Let original be x. After a 15% fall we have 85% of x, so 0.85x = 510.",
              why: "100% − 15% = 85%. The given 510 is the leftover 85%, not the start.",
            },
            {
              do: "x = 510 / 0.85. Multiply top and bottom by 100: x = 51,000 / 85.",
              why: "Clearing the decimal makes a whole-number divide.",
            },
            {
              do: "85 × 600 = 51,000, because 85 × 6 = 510, so 85 × 600 = 51,000. Original = 600.",
              why: "The quotient is 600.",
            },
            {
              do: "Forward check: 15% of 600 = 90. 600 − 90 = 510. Matches.",
              why: "Going forward from 600 must rebuild the given 510.",
            },
            {
              do: "Trap: 510 + 15% of 510. 15% of 510 = 76.5, and 510 + 76.5 = 586.5.",
              why: "Adding 15% of the new value undershoots. The fall was 15% of 600, which is 90, not 76.5.",
            },
          ],
          result: "600",
        },
      ],
    },
    {
      heading: "Simple interest",
      body: "Simple interest (SI) is a fixed rupee slice of the starting money (principal P) every year. SI = P × r × t / 100, where r is the percent per year and t is the number of years. Amount = P + SI.\n\nThe exam gives P, r, t and asks for SI, or gives SI and asks for P or r. The trap is using a new total each year (that is compound interest). In SI the 8% is always of the original P, so year 1 and year 2 earn the same rupees.",
      howTo: [
        "Write P (start), r (percent per year), t (years).",
        "Compute SI = P × r × t / 100. Multiply P × r × t first, then divide by 100.",
        "Amount, if asked, is P + SI.",
        "If SI is given and P is unknown, rearrange: P = SI × 100 / (r × t).",
        "If r is unknown: r = SI × 100 / (P × t).",
        "Check: one year’s interest is P × r / 100; times t years should equal SI.",
      ],
      bullets: [
        "SI = P × r × t / 100. Same rupees every year, always on original P.",
        "Amount = P + SI. Do not call SI the amount.",
        "This is not compound interest. Do not add interest onto P between years.",
      ],
      examples: [
        {
          title: "P = 6,000, r = 8%, t = 3 years",
          prompt:
            "Find the simple interest and the amount on Rs 6,000 at 8% per year for 3 years.",
          steps: [
            {
              do: "SI = 6,000 × 8 × 3 / 100.",
              why: "Plug P = 6,000, r = 8, t = 3 into SI = P r t / 100.",
            },
            {
              do: "First 6,000 × 8 = 48,000. Then 48,000 × 3 = 144,000. Then 144,000 / 100 = 1,440.",
              why: "Multiply in a chain, then the / 100. SI = Rs 1,440.",
            },
            {
              do: "Amount = 6,000 + 1,440 = 7,440.",
              why: "Amount means principal plus interest.",
            },
            {
              do: "Yearly slice: 8% of 6,000 = 480. Three years: 480 × 3 = 1,440. Same SI.",
              why: "In simple interest the yearly slice never grows, because it is always of 6,000.",
            },
            {
              do: "Trap: treating year 2 as 8% of 6,480. That would be compound interest.",
              why: "The question said simple. SI stays 1,440 and amount stays 7,440.",
            },
          ],
          result: "SI = Rs 1,440; amount = Rs 7,440",
        },
        {
          title: "SI = 720, r = 6%, t = 4 years — find P",
          prompt:
            "The simple interest on a sum at 6% per year for 4 years is Rs 720. Find the principal.",
          steps: [
            {
              do: "720 = P × 6 × 4 / 100.",
              why: "Same formula, now SI and r and t are known, P is not.",
            },
            {
              do: "6 × 4 = 24, so 720 = 24P / 100, which is 720 = 0.24 P.",
              why: "r × t = 24. Then 24/100 = 0.24 is the fraction of P that became interest.",
            },
            {
              do: "P = 720 / 0.24. Multiply top and bottom by 100: P = 72,000 / 24.",
              why: "Clear the decimal so the divide is whole numbers.",
            },
            {
              do: "24 × 3,000 = 72,000, so P = 3,000.",
              why: "24 × 3 = 72, therefore 24 × 3,000 = 72,000.",
            },
            {
              do: "Check: SI = 3,000 × 6 × 4 / 100 = 3,000 × 24 / 100 = 72,000 / 100 = 720. Matches.",
              why: "Putting P back into the formula must rebuild the given SI.",
            },
          ],
          result: "P = Rs 3,000",
        },
        {
          title: "P = 4,500, SI = 540 in 2 years — find r",
          prompt:
            "Rs 4,500 earns Rs 540 simple interest in 2 years. Find the rate percent per year.",
          steps: [
            {
              do: "540 = 4,500 × r × 2 / 100.",
              why: "P, SI and t are known. r is the unknown.",
            },
            {
              do: "4,500 × 2 / 100 = 9,000 / 100 = 90. So 540 = 90 r.",
              why: "The 4,500 × 2 / 100 block is the interest at 1% per year for 2 years, which is 90.",
            },
            {
              do: "r = 540 / 90 = 6.",
              why: "90 × 6 = 540. Rate is 6% per year.",
            },
            {
              do: "Check: 4,500 × 6 × 2 / 100. 4,500 × 12 = 54,000. 54,000 / 100 = 540. Matches.",
              why: "6 × 2 = 12, then 4,500 × 12 = 54,000.",
            },
            {
              do: "Trap: r = 540 / 4,500 × 100 = 12, which forgets to divide by t = 2.",
              why: "12% would be the two-year percent in total, not the per-year rate. The rate is 6% per year.",
            },
          ],
          result: "6% per year",
        },
        {
          title: "P = 8,000, r = 5%, t = 4 years",
          prompt:
            "Find the simple interest and the amount on Rs 8,000 at 5% per year for 4 years.",
          steps: [
            {
              do: "SI = 8,000 × 5 × 4 / 100.",
              why: "Plug P = 8,000, r = 5, t = 4 into SI = P r t / 100.",
            },
            {
              do: "First 8,000 × 5 = 40,000. Then 40,000 × 4 = 160,000. Then 160,000 / 100 = 1,600.",
              why: "Multiply in a chain, then the / 100. SI = Rs 1,600.",
            },
            {
              do: "Amount = 8,000 + 1,600 = 9,600.",
              why: "Amount means principal plus interest.",
            },
            {
              do: "Yearly slice: 5% of 8,000 = 400. Four years: 400 × 4 = 1,600. Same SI.",
              why: "In simple interest the yearly slice never grows, because it is always of 8,000.",
            },
            {
              do: "Trap: treating year 2 as 5% of 8,400. That would be compound interest.",
              why: "The question said simple. SI stays 1,600 and amount stays 9,600.",
            },
          ],
          result: "SI = Rs 1,600; amount = Rs 9,600",
        },
        {
          title: "SI = 900, r = 9%, t = 5 years — find P",
          prompt:
            "The simple interest on a sum at 9% per year for 5 years is Rs 900. Find the principal.",
          steps: [
            {
              do: "900 = P × 9 × 5 / 100.",
              why: "Same formula, now SI and r and t are known, P is not.",
            },
            {
              do: "9 × 5 = 45, so 900 = 45P / 100, which is 900 = 0.45 P.",
              why: "r × t = 45. Then 45/100 = 0.45 is the fraction of P that became interest.",
            },
            {
              do: "P = 900 / 0.45. Multiply top and bottom by 100: P = 90,000 / 45.",
              why: "Clear the decimal so the divide is whole numbers.",
            },
            {
              do: "45 × 2,000 = 90,000, so P = 2,000.",
              why: "45 × 2 = 90, therefore 45 × 2,000 = 90,000.",
            },
            {
              do: "Check: SI = 2,000 × 9 × 5 / 100 = 2,000 × 45 / 100 = 90,000 / 100 = 900. Matches.",
              why: "Putting P back into the formula must rebuild the given SI.",
            },
          ],
          result: "P = Rs 2,000",
        },
      ],
    },
    {
      heading: "Compound interest (year-by-year table)",
      body: "Compound interest (CI) adds each year’s interest onto the money before the next year starts. Year 1 uses P. Year 2 uses P plus year-1 interest.\n\nThe exam asks for CI over 2 or 3 years. The trap is using the SI formula P r t / 100, which keeps the same slice every year. Draw a three-row table (start, interest, new total) and you will not mix the two.",
      howTo: [
        "Write P and r. Year-1 interest = P × r / 100. New total = P + that interest.",
        "Year-2 interest = (new total) × r / 100. Add again. Repeat for year 3 if needed.",
        "CI is the sum of the yearly interest rows (or final total − P).",
        "If asked, SI = P × r × t / 100 on the side, so you can see CI is a little larger.",
        "Check the last addition: each new total must equal the previous total plus that year’s interest.",
      ],
      bullets: [
        "Each year, interest is of the current total, not of the first P after year 1.",
        "Write a table: start → interest → new total. Do not jump to a memory formula in this paper.",
        "CI is more than SI because extra interest is earned on earlier interest.",
      ],
      examples: [
        {
          title: "P = 5,000 at 10% for 2 years",
          prompt:
            "Find the compound interest and the amount on Rs 5,000 at 10% per year for 2 years. Show each year.",
          steps: [
            {
              do: "Year 1 start = 5,000. Interest = 5,000 × 10 / 100 = 500. New total = 5,000 + 500 = 5,500.",
              why: "The first year is the same as simple interest, because we still sit on the original P.",
            },
            {
              do: "Year 2 start = 5,500. Interest = 5,500 × 10 / 100 = 550. New total = 5,500 + 550 = 6,050.",
              why: "The 10% is now of 5,500. That is why year-2 interest (550) is bigger than year-1 (500).",
            },
            {
              do: "CI = 500 + 550 = 1,050. Amount = 6,050.",
              why: "CI is the interest only. Amount is the final total.",
            },
            {
              do: "SI on the side: 5,000 × 10 × 2 / 100 = 1,000. Extra CI over SI = 1,050 − 1,000 = 50.",
              why: "The extra 50 is 10% of the first year’s 500. That is interest on interest.",
            },
            {
              do: "Trap: answering 1,000 because 10% × 2 years feels like 20% of 5,000.",
              why: "That is SI. Compound interest is 1,050 and the amount is 6,050.",
            },
          ],
          result: "CI = Rs 1,050; amount = Rs 6,050",
        },
        {
          title: "P = 2,000 at 10% for 3 years",
          prompt:
            "Find the compound interest on Rs 2,000 at 10% per year for 3 years, year by year.",
          steps: [
            {
              do: "Year 1: interest = 2,000 × 10 / 100 = 200. Total = 2,000 + 200 = 2,200.",
              why: "First year uses the original 2,000.",
            },
            {
              do: "Year 2: interest = 2,200 × 10 / 100 = 220. Total = 2,200 + 220 = 2,420.",
              why: "10% of 2,200 is 220. Add it on.",
            },
            {
              do: "Year 3: interest = 2,420 × 10 / 100 = 242. Total = 2,420 + 242 = 2,662.",
              why: "10% of 2,420: 10% of 2,400 = 240 and 10% of 20 = 2, so 242.",
            },
            {
              do: "CI = 200 + 220 + 242. 200 + 220 = 420, then 420 + 242 = 662.",
              why: "Sum the three interest rows. Also 2,662 − 2,000 = 662, same CI.",
            },
            {
              do: "SI would be 2,000 × 10 × 3 / 100 = 600. Extra = 662 − 600 = 62.",
              why: "The extra is interest on earlier interest. Do not use 600 as the CI answer.",
            },
            {
              do: "Trap: 2,000 × (1.10)³ guessed as 2,600 without the table. The table’s last total is 2,662.",
              why: "The year-by-year add is the safe Paper 1 method. CI = 662, amount = 2,662.",
            },
          ],
          result: "CI = Rs 662; amount = Rs 2,662",
        },
        {
          title: "P = 2,500 at 8% for 2 years",
          prompt:
            "Find CI on Rs 2,500 at 8% per year for 2 years, with a year-by-year table.",
          steps: [
            {
              do: "Year 1: 8% of 2,500 = 8 × 2,500 / 100 = 20,000 / 100 = 200. Total = 2,500 + 200 = 2,700.",
              why: "8 × 25 = 200 is the same as 8% of 2,500, because 1% of 2,500 is 25.",
            },
            {
              do: "Year 2: 8% of 2,700 = 8 × 2,700 / 100. 8 × 2,700 = 21,600. 21,600 / 100 = 216.",
              why: "The base is now 2,700, not 2,500.",
            },
            {
              do: "New total = 2,700 + 216 = 2,916. CI = 200 + 216 = 416.",
              why: "Amount 2,916 minus P 2,500 is also 416.",
            },
            {
              do: "SI = 2,500 × 8 × 2 / 100 = 2,500 × 16 / 100 = 40,000 / 100 = 400. Extra = 416 − 400 = 16.",
              why: "Extra for 2 years equals P × (r/100)² = 2,500 × 0.08 × 0.08 = 2,500 × 0.0064 = 16.",
            },
            {
              do: "2,500 × 0.0064: 2,500 × 64 / 10,000. 2,500 × 64 = 160,000. 160,000 / 10,000 = 16. Matches.",
              why: "The shortcut and the table agree, so CI is 416.",
            },
          ],
          result: "CI = Rs 416; amount = Rs 2,916",
        },
        {
          title: "P = 4,000 at 5% for 2 years",
          prompt:
            "Find the compound interest and the amount on Rs 4,000 at 5% per year for 2 years. Show each year.",
          steps: [
            {
              do: "Year 1 start = 4,000. Interest = 4,000 × 5 / 100 = 200. New total = 4,000 + 200 = 4,200.",
              why: "The first year is the same as simple interest, because we still sit on the original P.",
            },
            {
              do: "Year 2 start = 4,200. Interest = 4,200 × 5 / 100 = 210. New total = 4,200 + 210 = 4,410.",
              why: "The 5% is now of 4,200. That is why year-2 interest (210) is bigger than year-1 (200).",
            },
            {
              do: "CI = 200 + 210 = 410. Amount = 4,410.",
              why: "CI is the interest only. Amount is the final total.",
            },
            {
              do: "SI on the side: 4,000 × 5 × 2 / 100 = 400. Extra CI over SI = 410 − 400 = 10.",
              why: "The extra 10 is 5% of the first year’s 200. That is interest on interest.",
            },
            {
              do: "Trap: answering 400 because 5% × 2 years feels like 10% of 4,000.",
              why: "That is SI. Compound interest is 410 and the amount is 4,410.",
            },
          ],
          result: "CI = Rs 410; amount = Rs 4,410",
        },
        {
          title: "P = 3,000 at 10% for 2 years",
          prompt:
            "Find CI on Rs 3,000 at 10% per year for 2 years, with a year-by-year table.",
          steps: [
            {
              do: "Year 1: 10% of 3,000 = 300. Total = 3,000 + 300 = 3,300.",
              why: "First year uses the original 3,000.",
            },
            {
              do: "Year 2: 10% of 3,300 = 330. Total = 3,300 + 330 = 3,630.",
              why: "The base is now 3,300, not 3,000.",
            },
            {
              do: "CI = 300 + 330 = 630. Amount = 3,630.",
              why: "Amount 3,630 minus P 3,000 is also 630.",
            },
            {
              do: "SI = 3,000 × 10 × 2 / 100 = 600. Extra = 630 − 600 = 30.",
              why: "Extra for 2 years equals 10% of the first year’s 300, which is 30.",
            },
            {
              do: "Trap: answering 600 from the SI formula, or 3,000 × 1.10 × 1.10 guessed as 3,600 without the table.",
              why: "The year-by-year add is the safe Paper 1 method. CI = 630, amount = 3,630.",
            },
          ],
          result: "CI = Rs 630; amount = Rs 3,630",
        },
      ],
    },
    {
      heading: "Profit and loss (profit% always on CP unless said otherwise)",
      body: "Cost price (CP) is what you pay. Selling price (SP) is what you sell for. Profit = SP − CP when SP is larger. Profit percent = (profit ÷ CP) × 100. Loss percent uses CP in the same way.\n\nThe exam gives CP and SP, or gives SP and a loss % and asks for CP. The trap is putting profit percent on SP. Unless the question says ‘on SP’, the base is always CP.",
      howTo: [
        "Write CP and SP. Profit = SP − CP. Loss = CP − SP.",
        "Profit % = (profit / CP) × 100. Loss % = (loss / CP) × 100.",
        "If SP and profit % are given, SP is (100 + profit%) / 100 of CP, so CP = SP × 100 / (100 + profit%).",
        "If there is a loss of x%, SP is (100 − x)/100 of CP, so CP = SP × 100 / (100 − x).",
        "Check by putting the percent back on your CP and rebuilding SP.",
      ],
      bullets: [
        "Profit % and loss % sit on CP, not on SP, unless the question says otherwise.",
        "SP = CP × (100 ± percent) / 100. Reverse with division, not by subtracting rupees from SP.",
        "A 10% loss means SP is 90% of CP, so CP = SP / 0.90.",
      ],
      examples: [
        {
          title: "CP 720, SP 864 — profit %",
          prompt:
            "An article is bought for Rs 720 and sold for Rs 864. Find the profit percent.",
          steps: [
            {
              do: "Profit = SP − CP = 864 − 720 = 144.",
              why: "SP is larger, so this is a profit of 144 rupees.",
            },
            {
              do: "Profit % = (144 / 720) × 100.",
              why: "The base is CP = 720, not SP = 864.",
            },
            {
              do: "144 / 720: divide top and bottom by 144. 144 ÷ 144 = 1. 720 ÷ 144 = 5. So 144/720 = 1/5.",
              why: "144 × 5 = 720. The fraction is 1/5.",
            },
            {
              do: "1/5 × 100 = 20. Profit percent = 20%.",
              why: "A fifth of 100 is 20.",
            },
            {
              do: "Check: 20% of 720 = 144, and 720 + 144 = 864. Matches.",
              why: "Forward from CP must rebuild SP.",
            },
            {
              do: "Trap: (144 / 864) × 100. 144/864 = 144 ÷ 864. 144 ÷ 72 = 2, 864 ÷ 72 = 12, so 2/12 = 1/6 ≈ 16.67%. That is profit on SP.",
              why: "Wrong base. The answer is 20%, not 16.67%.",
            },
          ],
          result: "20%",
        },
        {
          title: "12% loss, SP 880 — find CP",
          prompt: "An article is sold at a 12% loss for Rs 880. Find the cost price.",
          steps: [
            {
              do: "A 12% loss means SP is 88% of CP, because 100 − 12 = 88.",
              why: "Loss percent is of CP, so we keep 88% of CP as the selling price.",
            },
            {
              do: "0.88 × CP = 880, so CP = 880 / 0.88.",
              why: "Divide both sides by 0.88 to isolate CP.",
            },
            {
              do: "880 / 0.88 = 88,000 / 88 = 1,000. (Multiply top and bottom by 100.)",
              why: "88 × 1,000 = 88,000. CP = Rs 1,000.",
            },
            {
              do: "Check: 12% of 1,000 = 120. SP = 1,000 − 120 = 880. Matches.",
              why: "Forward from CP must rebuild the given SP.",
            },
            {
              do: "Trap: 880 + 12% of 880. 12% of 880 = 105.60, and 880 + 105.60 = 985.60.",
              why: "That treats 12% as of SP. The 12% was of the unknown CP. Answer Rs 1,000.",
            },
          ],
          result: "CP = Rs 1,000",
        },
        {
          title: "25% profit on CP 480 — find SP",
          prompt:
            "The cost price of an article is Rs 480. It is sold at a profit of 25%. Find the selling price.",
          steps: [
            {
              do: "Profit = 25% of 480 = 25 × 480 / 100.",
              why: "Profit percent is on CP, so 25% of 480 is the extra rupees.",
            },
            {
              do: "25 × 480 = 12,000. Then 12,000 / 100 = 120. Profit = Rs 120.",
              why: "Or 25% = 1/4, so 480 / 4 = 120. Same profit.",
            },
            {
              do: "SP = CP + profit = 480 + 120 = 600.",
              why: "Selling price is cost plus the profit rupees.",
            },
            {
              do: "Multiply check: 480 × 1.25. 480 × 1 = 480. 480 × 0.25 = 120. Sum = 600.",
              why: "1.25 is 125/100, which is CP plus 25% of CP.",
            },
            {
              do: "Trap: 480 + 25 = 505, adding 25 rupees instead of 25 percent.",
              why: "Percent needs the / 100. SP is Rs 600.",
            },
          ],
          result: "SP = Rs 600",
        },
        {
          title: "CP 540, SP 459 — loss %",
          prompt:
            "An article is bought for Rs 540 and sold for Rs 459. Find the loss percent.",
          steps: [
            {
              do: "Loss = CP − SP = 540 − 459 = 81.",
              why: "SP is smaller, so this is a loss of 81 rupees.",
            },
            {
              do: "Loss % = (81 / 540) × 100.",
              why: "The base is CP = 540, not SP = 459.",
            },
            {
              do: "81 / 540: divide top and bottom by 81. 81 ÷ 81 = 1. 540 ÷ 81 = 6.666… Better: divide by 27. 81 ÷ 27 = 3. 540 ÷ 27 = 20. So 81/540 = 3/20.",
              why: "27 × 20 = 540. The fraction is 3/20.",
            },
            {
              do: "3/20 × 100 = 300 / 20 = 15. Loss percent = 15%.",
              why: "Three twentieths of 100 is 15.",
            },
            {
              do: "Check: 15% of 540 = 81, and 540 − 81 = 459. Matches.",
              why: "Forward from CP must rebuild SP.",
            },
            {
              do: "Trap: (81 / 459) × 100 ≈ 17.65%. That is loss on SP.",
              why: "Wrong base. The answer is 15%, not 17.65%.",
            },
          ],
          result: "15%",
        },
        {
          title: "20% profit, SP 840 — find CP",
          prompt: "An article is sold at a 20% profit for Rs 840. Find the cost price.",
          steps: [
            {
              do: "A 20% profit means SP is 120% of CP, because 100 + 20 = 120.",
              why: "Profit percent is of CP, so we hold 120% of CP as the selling price.",
            },
            {
              do: "1.20 × CP = 840, so CP = 840 / 1.20.",
              why: "Divide both sides by 1.20 to isolate CP.",
            },
            {
              do: "840 / 1.20 = 84,000 / 120 = 700. (Multiply top and bottom by 100.)",
              why: "120 × 700 = 84,000. CP = Rs 700.",
            },
            {
              do: "Check: 20% of 700 = 140. SP = 700 + 140 = 840. Matches.",
              why: "Forward from CP must rebuild the given SP.",
            },
            {
              do: "Trap: 840 − 20% of 840. 20% of 840 = 168, and 840 − 168 = 672.",
              why: "That treats 20% as of SP. The 20% was of the unknown CP. Answer Rs 700.",
            },
          ],
          result: "CP = Rs 700",
        },
      ],
    },
    {
      heading: "Marked price and discount",
      body: "Marked price (MP) is the tag on the article. Discount is a percent off the tag, not off the cost. Selling price = MP minus the discount, or SP = MP × (100 − d)/100.\n\nThe exam gives MP and a discount, or two discounts in a row, or SP after a discount and asks for MP. The trap is adding two discounts (20% + 15% = 35%). The second discount is of the already-reduced price.",
      howTo: [
        "Write the tag MP and the discount d%.",
        "Discount rupees = d × MP / 100. SP = MP − that.",
        "Or leftover = (100 − d)/100 of MP.",
        "For two discounts, do the first fully, then take the second percent of the new figure.",
        "If SP and d% are given, SP is (100 − d)% of MP, so MP = SP × 100 / (100 − d).",
        "Check: discount rupees plus SP must equal MP.",
      ],
      bullets: [
        "Discount is always of marked price, not of cost price.",
        "Two discounts multiply leftovers: 20% then 15% is × 0.80 × 0.85, not −35%.",
        "To get MP from SP after d% off, divide SP by (100 − d)/100.",
      ],
      examples: [
        {
          title: "MP 2,000, discount 15%",
          prompt:
            "The marked price is Rs 2,000. A discount of 15% is given. Find the selling price.",
          steps: [
            {
              do: "15% of 2,000 = 15 × 2,000 / 100 = 30,000 / 100 = 300. Discount = Rs 300.",
              why: "The percent is of the tag 2,000.",
            },
            {
              do: "SP = 2,000 − 300 = 1,700.",
              why: "Selling price is tag minus discount.",
            },
            {
              do: "Leftover check: 85% of 2,000 because 100 − 15 = 85. 0.85 × 2,000 = 1,700.",
              why: "85% of 2,000: 10% = 200 so 80% = 1,600 and 5% = 100, total 1,700.",
            },
            {
              do: "300 + 1,700 = 2,000, which rebuilds the tag.",
              why: "Discount rupees plus SP must equal MP.",
            },
            {
              do: "Trap: 2,000 − 15 = 1,985, treating 15 as rupees.",
              why: "15% of 2,000 is 300, not 15. SP is Rs 1,700.",
            },
          ],
          result: "SP = Rs 1,700",
        },
        {
          title: "Successive 10% and 20% off 1,500",
          prompt:
            "Marked price Rs 1,500. Two discounts are given one after the other: 10% then 20%. Find the selling price and the single discount that matches it.",
          steps: [
            {
              do: "After 10%: leftover 90% of 1,500 = 0.90 × 1,500 = 1,350.",
              why: "First discount uses the tag. 10% of 1,500 = 150, and 1,500 − 150 = 1,350.",
            },
            {
              do: "After 20% of 1,350: 20% of 1,350 = 270. SP = 1,350 − 270 = 1,080.",
              why: "The second discount is of 1,350, not of 1,500. 20% of 1,500 would be 300, which is the wrong base.",
            },
            {
              do: "Leftover factors: 0.90 × 0.80 = 0.72. So 72% of 1,500 remains. 0.72 × 1,500 = 1,080. Same SP.",
              why: "0.72 × 1,500: 0.70 × 1,500 = 1,050 and 0.02 × 1,500 = 30, sum 1,080.",
            },
            {
              do: "Single equivalent discount = 100% − 72% = 28%. 28% of 1,500 = 420. 1,500 − 420 = 1,080.",
              why: "28% matches the two-step fall of 420 rupees.",
            },
            {
              do: "Trap: 10 + 20 = 30% off. 30% of 1,500 = 450, SP = 1,050.",
              why: "Adding discounts overstates the fall. SP is 1,080, equivalent discount 28%, not 30%.",
            },
          ],
          result: "SP = Rs 1,080; equivalent single discount = 28%",
        },
        {
          title: "SP 1,360 after 15% off — find MP",
          prompt:
            "After a 15% discount the selling price is Rs 1,360. Find the marked price.",
          steps: [
            {
              do: "SP is 85% of MP, because 100 − 15 = 85. So 0.85 × MP = 1,360.",
              why: "The given 1,360 is the leftover after 15% came off the unknown tag.",
            },
            {
              do: "MP = 1,360 / 0.85. Multiply top and bottom by 100: MP = 136,000 / 85.",
              why: "Clear the decimal.",
            },
            {
              do: "85 × 1,600 = 85 × 16 × 100. 85 × 10 = 850, 85 × 6 = 510, sum 1,360. Then × 100 = 136,000. So MP = 1,600.",
              why: "85 × 16 = 1,360, therefore 85 × 1,600 = 136,000.",
            },
            {
              do: "Check: 15% of 1,600 = 240. SP = 1,600 − 240 = 1,360. Matches.",
              why: "Forward from MP must rebuild SP.",
            },
            {
              do: "Trap: 1,360 + 15% of 1,360. 15% of 1,360 = 204, and 1,360 + 204 = 1,564.",
              why: "That adds 15% of SP. The 15% was of the larger MP. Answer Rs 1,600.",
            },
          ],
          result: "MP = Rs 1,600",
        },
        {
          title: "MP 2,400, discount 25%",
          prompt:
            "The marked price is Rs 2,400. A discount of 25% is given. Find the selling price.",
          steps: [
            {
              do: "25% of 2,400 = 25 × 2,400 / 100 = 60,000 / 100 = 600. Discount = Rs 600.",
              why: "The percent is of the tag 2,400. Or 25% = 1/4, so 2,400 / 4 = 600.",
            },
            {
              do: "SP = 2,400 − 600 = 1,800.",
              why: "Selling price is tag minus discount.",
            },
            {
              do: "Leftover check: 75% of 2,400 because 100 − 25 = 75. 0.75 × 2,400 = 1,800.",
              why: "75% of 2,400: 50% = 1,200 and 25% = 600, total 1,800.",
            },
            {
              do: "600 + 1,800 = 2,400, which rebuilds the tag.",
              why: "Discount rupees plus SP must equal MP.",
            },
            {
              do: "Trap: 2,400 − 25 = 2,375, treating 25 as rupees.",
              why: "25% of 2,400 is 600, not 25. SP is Rs 1,800.",
            },
          ],
          result: "SP = Rs 1,800",
        },
        {
          title: "Successive 20% and 10% off 2,000",
          prompt:
            "Marked price Rs 2,000. Two discounts are given one after the other: 20% then 10%. Find the selling price and the single discount that matches it.",
          steps: [
            {
              do: "After 20%: leftover 80% of 2,000 = 0.80 × 2,000 = 1,600.",
              why: "First discount uses the tag. 20% of 2,000 = 400, and 2,000 − 400 = 1,600.",
            },
            {
              do: "After 10% of 1,600: 10% of 1,600 = 160. SP = 1,600 − 160 = 1,440.",
              why: "The second discount is of 1,600, not of 2,000. 10% of 2,000 would be 200, which is the wrong base.",
            },
            {
              do: "Leftover factors: 0.80 × 0.90 = 0.72. So 72% of 2,000 remains. 0.72 × 2,000 = 1,440. Same SP.",
              why: "0.72 × 2,000: 0.70 × 2,000 = 1,400 and 0.02 × 2,000 = 40, sum 1,440.",
            },
            {
              do: "Single equivalent discount = 100% − 72% = 28%. 28% of 2,000 = 560. 2,000 − 560 = 1,440.",
              why: "28% matches the two-step fall of 560 rupees.",
            },
            {
              do: "Trap: 20 + 10 = 30% off. 30% of 2,000 = 600, SP = 1,400.",
              why: "Adding discounts overstates the fall. SP is 1,440, equivalent discount 28%, not 30%.",
            },
          ],
          result: "SP = Rs 1,440; equivalent single discount = 28%",
        },
      ],
    },
    {
      heading: "Ratio and proportion",
      body: "A ratio A : B = 3 : 5 means A/B = 3/5, or A = 3k and B = 5k for the same k. To share a total, add the parts, divide the total by that sum, then multiply back.\n\nThe exam asks you to split a rupee amount, to chain A : B and B : C, or to solve 3 : 5 = x : 35. The trap is using the parts as the answers (giving 3, 4, 5 instead of 210, 280, 350) or chaining two ratios without first making the common letter equal.",
      howTo: [
        "Write each ratio as parts (for 3 : 4 : 5 the parts are 3, 4 and 5).",
        "Add the parts. One part = total ÷ (sum of parts).",
        "Each share = (its part) × (one part). Check that the shares add to the total.",
        "To chain A : B and B : C, multiply so the two B-numbers become equal, then write A : B : C.",
        "For a proportion a : b = c : d, the product a × d equals b × c. Solve for the unknown.",
      ],
      bullets: [
        "One part = total / (sum of parts). Shares are parts times that.",
        "Chain ratios only after the common term is the same number in both.",
        "In a : b = c : d, a × d = b × c (cross multiply).",
      ],
      examples: [
        {
          title: "Divide 840 in 3 : 4 : 5",
          prompt: "Divide Rs 840 among A, B and C in the ratio 3 : 4 : 5.",
          steps: [
            {
              do: "Parts = 3 + 4 + 5 = 12.",
              why: "The whole 840 is 12 equal pieces.",
            },
            {
              do: "One part = 840 / 12 = 70, because 12 × 70 = 840.",
              why: "840 ÷ 12: 12 × 70 = 840.",
            },
            {
              do: "A = 3 × 70 = 210. B = 4 × 70 = 280. C = 5 × 70 = 350.",
              why: "Each person gets their part-count times 70.",
            },
            {
              do: "Check sum: 210 + 280 = 490, then 490 + 350 = 840.",
              why: "The three shares must rebuild the total.",
            },
            {
              do: "Check ratio: 210 : 280 : 350. Divide by 70: 3 : 4 : 5. Matches.",
              why: "If the ratio is right, dividing out the common 70 returns 3 : 4 : 5.",
            },
            {
              do: "Trap: answering 3, 4 and 5, or splitting 840 by 3 to get 280 each.",
              why: "The parts are weights, not rupees. The rupees are 210, 280 and 350.",
            },
          ],
          result: "A = Rs 210, B = Rs 280, C = Rs 350",
        },
        {
          title: "Chain A : B = 2 : 3 and B : C = 3 : 4, total 630",
          prompt:
            "A : B = 2 : 3 and B : C = 3 : 4. If A + B + C = 630, find A, B and C.",
          steps: [
            {
              do: "The B-term is already 3 in both ratios, so we can write A : B : C = 2 : 3 : 4.",
              why: "When the common letter matches, the three-term ratio is just the two ratios joined.",
            },
            {
              do: "Parts = 2 + 3 + 4 = 9. One part = 630 / 9 = 70, because 9 × 70 = 630.",
              why: "Same sharing machine as the last example.",
            },
            {
              do: "A = 2 × 70 = 140. B = 3 × 70 = 210. C = 4 × 70 = 280.",
              why: "Multiply each part by 70.",
            },
            {
              do: "Check total: 140 + 210 = 350, then 350 + 280 = 630.",
              why: "Must rebuild 630.",
            },
            {
              do: "Check the given ratios: 140 : 210 = 2 : 3 (divide by 70). 210 : 280 = 3 : 4 (divide by 70). Both match.",
              why: "Both original ratios must hold, not just the total.",
            },
            {
              do: "If B had been 3 in one ratio and 6 in the other, we would first double 2 : 3 into 4 : 6 so B matches.",
              why: "Never chain until the common term is the same number.",
            },
          ],
          result: "A = 140, B = 210, C = 280",
        },
        {
          title: "Proportion 3 : 5 = x : 35",
          prompt: "If 3 : 5 = x : 35, find x.",
          steps: [
            {
              do: "Write the proportion as 3 / 5 = x / 35.",
              why: "A ratio a : b is the fraction a/b. Both sides are equal fractions.",
            },
            {
              do: "Cross multiply: 3 × 35 = 5 × x.",
              why: "In a/b = c/d we have a × d = b × c. Here a = 3, b = 5, c = x, d = 35.",
            },
            {
              do: "3 × 35 = 105. So 5x = 105.",
              why: "3 × 30 = 90 and 3 × 5 = 15, sum 105.",
            },
            {
              do: "x = 105 / 5 = 21, because 5 × 21 = 105.",
              why: "Divide both sides by 5.",
            },
            {
              do: "Check: 3 : 5 and 21 : 35. Divide 21 and 35 by 7: 3 : 5. Same ratio.",
              why: "The two ratios reduce to the same pair, so x = 21 is right.",
            },
            {
              do: "Trap: x = 35 − 5 + 3 = 33, treating the numbers as an add-on pattern.",
              why: "Proportion is equal fractions, not equal gaps. x = 21.",
            },
          ],
          result: "21",
        },
        {
          title: "Divide 960 in 2 : 3 : 7",
          prompt: "Divide Rs 960 among A, B and C in the ratio 2 : 3 : 7.",
          steps: [
            {
              do: "Parts = 2 + 3 + 7 = 12.",
              why: "The whole 960 is 12 equal pieces.",
            },
            {
              do: "One part = 960 / 12 = 80, because 12 × 80 = 960.",
              why: "960 ÷ 12: 12 × 80 = 960.",
            },
            {
              do: "A = 2 × 80 = 160. B = 3 × 80 = 240. C = 7 × 80 = 560.",
              why: "Each person gets their part-count times 80.",
            },
            {
              do: "Check sum: 160 + 240 = 400, then 400 + 560 = 960.",
              why: "The three shares must rebuild the total.",
            },
            {
              do: "Check ratio: 160 : 240 : 560. Divide by 80: 2 : 3 : 7. Matches.",
              why: "If the ratio is right, dividing out the common 80 returns 2 : 3 : 7.",
            },
            {
              do: "Trap: answering 2, 3 and 7, or splitting 960 by 3 to get 320 each.",
              why: "The parts are weights, not rupees. The rupees are 160, 240 and 560.",
            },
          ],
          result: "A = Rs 160, B = Rs 240, C = Rs 560",
        },
        {
          title: "Proportion 4 : 7 = 28 : x",
          prompt: "If 4 : 7 = 28 : x, find x.",
          steps: [
            {
              do: "Write the proportion as 4 / 7 = 28 / x.",
              why: "A ratio a : b is the fraction a/b. Both sides are equal fractions.",
            },
            {
              do: "Cross multiply: 4 × x = 7 × 28.",
              why: "In a/b = c/d we have a × d = b × c. Here a = 4, b = 7, c = 28, d = x.",
            },
            {
              do: "7 × 28 = 196. So 4x = 196.",
              why: "7 × 20 = 140 and 7 × 8 = 56, sum 196.",
            },
            {
              do: "x = 196 / 4 = 49, because 4 × 49 = 196.",
              why: "Divide both sides by 4.",
            },
            {
              do: "Check: 4 : 7 and 28 : 49. Divide 28 and 49 by 7: 4 : 7. Same ratio.",
              why: "The two ratios reduce to the same pair, so x = 49 is right.",
            },
            {
              do: "Trap: x = 28 − 7 + 4 = 25, treating the numbers as an add-on pattern.",
              why: "Proportion is equal fractions, not equal gaps. x = 49.",
            },
          ],
          result: "49",
        },
      ],
    },
    {
      heading: "Time, speed, distance (distance = speed × time)",
      body: "Distance = speed × time. Then time = distance ÷ speed, and speed = distance ÷ time. Keep the units in one family (km with hours, or metres with seconds).\n\nThe exam gives two of the three and asks for the third, sometimes with 2 hours 40 minutes. The trap is mixing hours and minutes (using 2.40 hours for 2 h 40 min). Forty minutes is 40/60 = 2/3 hour, so 2 h 40 min is 8/3 hours, not 2.40.",
      howTo: [
        "Write the three words: distance, speed, time. Circle the two you are given.",
        "Put time in hours if speed is km/h (or in seconds if speed is m/s).",
        "Use distance = speed × time, or rearrange by dividing.",
        "Do the multiply or divide in full. Write units on the answer.",
        "Check by putting your answer back: speed × time must rebuild distance.",
      ],
      bullets: [
        "distance = speed × time. The other two are this formula rearranged.",
        "40 minutes = 40/60 = 2/3 hour. Never write 2 h 40 min as 2.40 hours.",
        "km/h with km and hours. m/s with metres and seconds. Do not mix in one line.",
      ],
      examples: [
        {
          title: "240 km at 60 km/h — time",
          prompt: "A car covers 240 km at 60 km/h. How long does it take?",
          steps: [
            {
              do: "Time = distance ÷ speed = 240 ÷ 60.",
              why: "We have distance and speed. The missing piece is time.",
            },
            {
              do: "240 ÷ 60 = 4, because 60 × 4 = 240.",
              why: "The divide is exact. Time = 4 hours.",
            },
            {
              do: "Check: speed × time = 60 × 4 = 240 km. Rebuilds the distance.",
              why: "If time were 3 hours, 60 × 3 = 180 km, which is short of 240.",
            },
            {
              do: "In minutes: 4 hours = 4 × 60 = 240 minutes. Same duration.",
              why: "Only convert if the options are in minutes. The clean value is 4 hours.",
            },
            {
              do: "Trap: 240 × 60 = 14,400, multiplying instead of dividing.",
              why: "Time is distance over speed, not distance times speed. Answer 4 hours.",
            },
          ],
          result: "4 hours",
        },
        {
          title: "90 km in 1.5 hours, then 3 hours at that speed",
          prompt:
            "A bus covers 90 km in 1 hour 30 minutes. Find its speed. How far does it go in 3 hours at that speed?",
          steps: [
            {
              do: "1 hour 30 minutes = 1 + 30/60 = 1 + 0.5 = 1.5 hours.",
              why: "30 minutes is half an hour. We need hours because we want km/h.",
            },
            {
              do: "Speed = 90 ÷ 1.5. 1.5 × 60 = 90, so 90 ÷ 1.5 = 60. Speed = 60 km/h.",
              why: "Or 90 ÷ (3/2) = 90 × 2/3 = 180/3 = 60.",
            },
            {
              do: "Distance in 3 hours = 60 × 3 = 180 km.",
              why: "Same speed, new time. Distance = speed × time.",
            },
            {
              do: "Check the first leg: 60 × 1.5 = 60 × 1 + 60 × 0.5 = 60 + 30 = 90 km. Matches.",
              why: "The speed must rebuild the given 90 km in 1.5 hours.",
            },
            {
              do: "Trap: treating 1 hour 30 min as 1.30 hours, then 90 / 1.30 ≈ 69.2 km/h.",
              why: "1.30 hours would be 1 hour 18 minutes. 30 minutes is 0.50 hour, not 0.30. Speed is 60 km/h; 3-hour distance is 180 km.",
            },
          ],
          result: "60 km/h; 180 km in 3 hours",
        },
        {
          title: "45 km/h for 2 hours 40 minutes",
          prompt:
            "A scooter runs at 45 km/h for 2 hours 40 minutes. Find the distance.",
          steps: [
            {
              do: "40 minutes = 40/60 hour = 2/3 hour. Total time = 2 + 2/3 = 6/3 + 2/3 = 8/3 hours.",
              why: "Put minutes over 60. 2 hours is 6/3, plus 2/3 is 8/3.",
            },
            {
              do: "Distance = 45 × (8/3). First 45 / 3 = 15. Then 15 × 8 = 120. Distance = 120 km.",
              why: "Cancel 3 into 45, then multiply by 8.",
            },
            {
              do: "Split check: in 2 hours, 45 × 2 = 90 km. In 40 minutes, time = 2/3 h, so 45 × 2/3 = 90/3 = 30 km.",
              why: "Two hours plus forty minutes as two separate products.",
            },
            {
              do: "90 + 30 = 120 km. Same as 45 × 8/3.",
              why: "Both routes agree.",
            },
            {
              do: "Trap: 45 × 2.40 = 108 km, reading 2 h 40 min as 2.40 hours.",
              why: "2.40 hours is 2 hours 24 minutes. Real time is 8/3 ≈ 2.667 hours. Distance is 120 km.",
            },
          ],
          result: "120 km",
        },
        {
          title: "210 km at 35 km/h — time",
          prompt: "A car covers 210 km at 35 km/h. How long does it take?",
          steps: [
            {
              do: "Time = distance ÷ speed = 210 ÷ 35.",
              why: "We have distance and speed. The missing piece is time.",
            },
            {
              do: "210 ÷ 35 = 6, because 35 × 6 = 210.",
              why: "The divide is exact. Time = 6 hours.",
            },
            {
              do: "Check: speed × time = 35 × 6 = 210 km. Rebuilds the distance.",
              why: "If time were 5 hours, 35 × 5 = 175 km, which is short of 210.",
            },
            {
              do: "In minutes: 6 hours = 6 × 60 = 360 minutes. Same duration.",
              why: "Only convert if the options are in minutes. The clean value is 6 hours.",
            },
            {
              do: "Trap: 210 × 35 = 7,350, multiplying instead of dividing.",
              why: "Time is distance over speed, not distance times speed. Answer 6 hours.",
            },
          ],
          result: "6 hours",
        },
        {
          title: "72 km/h for 1 hour 15 minutes",
          prompt:
            "A scooter runs at 72 km/h for 1 hour 15 minutes. Find the distance.",
          steps: [
            {
              do: "15 minutes = 15/60 hour = 1/4 hour. Total time = 1 + 1/4 = 5/4 hours.",
              why: "Put minutes over 60. 15 minutes is a quarter of an hour, not 0.15 hour.",
            },
            {
              do: "Distance = 72 × (5/4). First 72 / 4 = 18. Then 18 × 5 = 90. Distance = 90 km.",
              why: "Cancel 4 into 72, then multiply by 5.",
            },
            {
              do: "Split check: in 1 hour, 72 × 1 = 72 km. In 15 minutes, time = 1/4 h, so 72 × 1/4 = 18 km.",
              why: "One hour plus fifteen minutes as two separate products.",
            },
            {
              do: "72 + 18 = 90 km. Same as 72 × 5/4.",
              why: "Both routes agree.",
            },
            {
              do: "Trap: 72 × 1.15 = 82.8 km, reading 1 h 15 min as 1.15 hours.",
              why: "1.15 hours is 1 hour 9 minutes. Real time is 1.25 hours. Distance is 90 km.",
            },
          ],
          result: "90 km",
        },
      ],
    },
    {
      heading: "Relative speed (trains / same vs opposite)",
      body: "Relative speed is how fast the gap between two moving things closes. Opposite directions: add the speeds. Same direction: subtract the smaller from the larger. A train passing a pole covers its own length; two trains passing each other cover the sum of lengths.\n\nThe exam gives two train lengths and two speeds. The trap is forgetting to convert km/h to m/s (multiply by 5/18) when length is in metres and time is wanted in seconds. Also: same direction uses subtract, not add.",
      howTo: [
        "Decide: same direction (subtract speeds) or opposite (add speeds).",
        "Convert both speeds to m/s if lengths are in metres: km/h × 5/18 = m/s.",
        "Distance to cover = one length (pole or man) or sum of lengths (platform or second train).",
        "Time in seconds = distance in metres ÷ relative speed in m/s.",
        "Check the conversion: 18 km/h = 5 m/s, 36 km/h = 10 m/s, 54 km/h = 15 m/s, 72 km/h = 20 m/s, 90 km/h = 25 m/s.",
      ],
      bullets: [
        "Opposite → add speeds. Same way → subtract speeds.",
        "Pole or standing man: distance = length of the train. Two trains: add the lengths.",
        "km/h to m/s: multiply by 5/18. Do this before dividing metres by speed.",
      ],
      examples: [
        {
          title: "Two trains opposite, 180 m and 120 m",
          prompt:
            "A train 180 m long running at 54 km/h meets a train 120 m long running at 36 km/h in the opposite direction. How many seconds do they take to pass each other?",
          steps: [
            {
              do: "Opposite directions, so add speeds: 54 + 36 = 90 km/h.",
              why: "The gap closes at the sum of the two speeds when they run at each other.",
            },
            {
              do: "Convert 90 km/h to m/s: 90 × 5 / 18. 90 / 18 = 5, then 5 × 5 = 25 m/s.",
              why: "Lengths are in metres, so speed must be metres per second.",
            },
            {
              do: "Distance to cover = 180 + 120 = 300 m (both lengths).",
              why: "Each train must clear the other’s full length. That is the sum.",
            },
            {
              do: "Time = 300 / 25 = 12 seconds, because 25 × 12 = 300.",
              why: "Time = distance ÷ relative speed.",
            },
            {
              do: "Trap: using 54 − 36 = 18 km/h (same-direction rule) or leaving 90 km/h unconverted (300 / 90 = 3.33, which is not seconds).",
              why: "Opposite means add. Metres and seconds need m/s. Answer 12 seconds.",
            },
          ],
          result: "12 seconds",
        },
        {
          title: "Same direction, 240 m and 160 m",
          prompt:
            "A train 240 m long at 72 km/h overtakes a train 160 m long at 36 km/h, both going the same way. Time to pass?",
          steps: [
            {
              do: "Same direction, so subtract speeds: 72 − 36 = 36 km/h.",
              why: "The faster train only gains at the difference of the speeds.",
            },
            {
              do: "36 km/h to m/s: 36 × 5 / 18. 36 / 18 = 2, then 2 × 5 = 10 m/s.",
              why: "Same conversion rule. 36 km/h is a standard 10 m/s.",
            },
            {
              do: "Distance = 240 + 160 = 400 m.",
              why: "To overtake, the faster train covers its own length plus the slower train’s length.",
            },
            {
              do: "Time = 400 / 10 = 40 seconds.",
              why: "400 ÷ 10 = 40.",
            },
            {
              do: "Trap: adding 72 + 36 = 108 km/h as if they were opposite. 108 km/h = 108 × 5/18 = 30 m/s, then 400 / 30 ≈ 13.3 s.",
              why: "Same way uses subtract. Answer 40 seconds, not 13.3.",
            },
          ],
          result: "40 seconds",
        },
        {
          title: "200 m train and a man walking the other way",
          prompt:
            "A 200 m train runs at 72 km/h. A man walks at 18 km/h in the opposite direction. How long does the train take to pass the man?",
          steps: [
            {
              do: "Opposite, so add: 72 + 18 = 90 km/h.",
              why: "The man walks into the train, so the gap closes faster than 72 km/h.",
            },
            {
              do: "90 km/h = 90 × 5 / 18 = 25 m/s (90 / 18 = 5, 5 × 5 = 25).",
              why: "Need m/s because 200 m and an answer in seconds.",
            },
            {
              do: "Distance = 200 m (the man’s length is treated as zero, like a pole).",
              why: "Passing a person or a pole means covering only the train’s own length.",
            },
            {
              do: "Time = 200 / 25 = 8 seconds, because 25 × 8 = 200.",
              why: "Distance ÷ relative speed.",
            },
            {
              do: "If the man stood still, relative speed would be just 72 km/h = 20 m/s, and time = 200 / 20 = 10 s.",
              why: "Walking the other way shortens the time from 10 s to 8 s, which matches adding 18 km/h.",
            },
            {
              do: "Trap: subtracting 72 − 18 because ‘the man is slower’. Subtract is for the same direction.",
              why: "The question said opposite. Answer 8 seconds.",
            },
          ],
          result: "8 seconds",
        },
        {
          title: "270 m train passing a pole at 36 km/h",
          prompt:
            "A train 270 m long runs at 36 km/h. How many seconds does it take to pass a pole?",
          steps: [
            {
              do: "A pole has no length, so distance to cover = 270 m (the train’s own length).",
              why: "Passing a pole or a standing person means covering only the train’s length.",
            },
            {
              do: "Convert 36 km/h to m/s: 36 × 5 / 18. 36 / 18 = 2, then 2 × 5 = 10 m/s.",
              why: "Length is in metres, so speed must be metres per second. 36 km/h is a standard 10 m/s.",
            },
            {
              do: "Time = 270 / 10 = 27 seconds.",
              why: "Time = distance ÷ speed.",
            },
            {
              do: "Check: 10 × 27 = 270. Yes.",
              why: "The inverse multiply rebuilds the length.",
            },
            {
              do: "Trap: leaving 36 km/h unconverted (270 / 36 = 7.5, which is not seconds), or using 270 + 270 as if a second train were there.",
              why: "A pole is not a second train. Metres and seconds need m/s. Answer 27 seconds.",
            },
          ],
          result: "27 seconds",
        },
        {
          title: "Two trains opposite, 250 m and 150 m",
          prompt:
            "A train 250 m long running at 90 km/h meets a train 150 m long running at 54 km/h in the opposite direction. How many seconds do they take to pass each other?",
          steps: [
            {
              do: "Opposite directions, so add speeds: 90 + 54 = 144 km/h.",
              why: "The gap closes at the sum of the two speeds when they run at each other.",
            },
            {
              do: "Convert 144 km/h to m/s: 144 × 5 / 18. 144 / 18 = 8, then 8 × 5 = 40 m/s.",
              why: "Lengths are in metres, so speed must be metres per second.",
            },
            {
              do: "Distance to cover = 250 + 150 = 400 m (both lengths).",
              why: "Each train must clear the other’s full length. That is the sum.",
            },
            {
              do: "Time = 400 / 40 = 10 seconds, because 40 × 10 = 400.",
              why: "Time = distance ÷ relative speed.",
            },
            {
              do: "Trap: using 90 − 54 = 36 km/h (same-direction rule) or leaving 144 km/h unconverted (400 / 144 ≈ 2.78, which is not seconds).",
              why: "Opposite means add. Metres and seconds need m/s. Answer 10 seconds.",
            },
          ],
          result: "10 seconds",
        },
      ],
    },
    {
      heading: "Time and work (LCM method)",
      body: "If A finishes a job in 12 days, A does 1/12 of the job each day. The LCM method turns that into whole units: take the smallest shared multiple of the days (LCM), call that the job size in units, then each person does (LCM ÷ their days) units per day.\n\nThe exam gives two or three people and their days, or ‘A and B together 8 days, A alone 12, find B’. The trap is adding the days (12 + 18 = 30) instead of adding the work rates. Together they are faster, so the time must be less than 12.",
      howTo: [
        "List each person’s days to finish the job alone.",
        "Find the LCM of those days. Call that LCM the total units of work.",
        "Each person’s daily units = LCM ÷ that person’s days.",
        "Together, add the daily units. Days together = LCM ÷ (sum of daily units).",
        "If one person is missing, subtract their daily units from the together rate, then days = LCM ÷ that remainder.",
        "Check: together-days must be smaller than the fastest person working alone.",
      ],
      bullets: [
        "LCM of the days = size of the job in units. Daily work = LCM ÷ days.",
        "Add rates, never add the days, when people work together.",
        "Together-time is less than any one person’s alone-time.",
      ],
      examples: [
        {
          title: "A in 12 days, B in 18 days",
          prompt:
            "A can finish a job in 12 days. B can finish the same job in 18 days. How many days do they take together?",
          steps: [
            {
              do: "LCM of 12 and 18. 12 = 2 × 2 × 3. 18 = 2 × 3 × 3. LCM = 2 × 2 × 3 × 3 = 36. The job is 36 units.",
              why: "36 is the smallest number that both 12 and 18 divide. Whole units avoid fractions of a job.",
            },
            {
              do: "A’s rate = 36 / 12 = 3 units per day. B’s rate = 36 / 18 = 2 units per day.",
              why: "Each person does ‘job size ÷ their days’ in one day.",
            },
            {
              do: "Together = 3 + 2 = 5 units per day.",
              why: "When they work at the same time, rates add.",
            },
            {
              do: "Days together = 36 / 5 = 7.2 days, which is 36/5 days or 7 1/5 days.",
              why: "5 × 7 = 35, remainder 1 unit, so 7 + 1/5 = 7.2 days.",
            },
            {
              do: "Trap: (12 + 18) / 2 = 15 days, or 12 + 18 = 30 days. Both are slower than A alone, which is impossible.",
              why: "Together must beat 12 days. 7.2 is less than 12, so it passes the sense check.",
            },
          ],
          result: "36/5 days (7.2 days)",
        },
        {
          title: "A 10 days, B 15 days, C 30 days",
          prompt:
            "A, B and C can finish a job in 10, 15 and 30 days. How many days do all three take together?",
          steps: [
            {
              do: "LCM of 10, 15 and 30. 10 = 2 × 5, 15 = 3 × 5, 30 = 2 × 3 × 5. LCM = 2 × 3 × 5 = 30 units.",
              why: "30 is a multiple of 10, of 15, and of 30.",
            },
            {
              do: "A: 30/10 = 3 units/day. B: 30/15 = 2 units/day. C: 30/30 = 1 unit/day.",
              why: "Same rule: LCM ÷ days.",
            },
            {
              do: "Together = 3 + 2 + 1 = 6 units per day.",
              why: "Add the three rates.",
            },
            {
              do: "Days = 30 / 6 = 5.",
              why: "6 × 5 = 30. They finish in 5 days.",
            },
            {
              do: "Check vs fastest: A alone is 10 days. Together 5 days is faster, as it should be.",
              why: "If you got 12 or 20, the rates were subtracted or the days were added.",
            },
          ],
          result: "5 days",
        },
        {
          title: "A + B in 8 days, A alone 12 days — find B",
          prompt:
            "A and B together finish a job in 8 days. A alone finishes it in 12 days. How many days does B take alone?",
          steps: [
            {
              do: "LCM of 8 and 12. 8 = 2 × 2 × 2. 12 = 2 × 2 × 3. LCM = 2 × 2 × 2 × 3 = 24 units.",
              why: "24 is a multiple of both 8 and 12. Use it as the job size.",
            },
            {
              do: "Together rate = 24 / 8 = 3 units per day. A’s rate = 24 / 12 = 2 units per day.",
              why: "The together figure already includes A and B.",
            },
            {
              do: "B’s rate = 3 − 2 = 1 unit per day.",
              why: "Take A out of the together rate. The leftover is B.",
            },
            {
              do: "B alone = 24 / 1 = 24 days.",
              why: "At 1 unit a day, 24 units take 24 days.",
            },
            {
              do: "Check: in 8 days A does 2 × 8 = 16 units and B does 1 × 8 = 8 units. 16 + 8 = 24. Full job. Matches.",
              why: "The two rates over 8 days must add to the whole job.",
            },
            {
              do: "Trap: B = 12 − 8 = 4 days. That subtracts days instead of rates. 4 days would make B faster than A and faster than both together, which cannot be.",
              why: "B is slower than A. 24 days is slower than 12, which fits.",
            },
          ],
          result: "24 days",
        },
        {
          title: "A in 15 days, B in 10 days",
          prompt:
            "A can finish a job in 15 days. B can finish the same job in 10 days. How many days do they take together?",
          steps: [
            {
              do: "LCM of 15 and 10. 15 = 3 × 5. 10 = 2 × 5. LCM = 2 × 3 × 5 = 30. The job is 30 units.",
              why: "30 is the smallest number that both 15 and 10 divide. Whole units avoid fractions of a job.",
            },
            {
              do: "A’s rate = 30 / 15 = 2 units per day. B’s rate = 30 / 10 = 3 units per day.",
              why: "Each person does ‘job size ÷ their days’ in one day.",
            },
            {
              do: "Together = 2 + 3 = 5 units per day.",
              why: "When they work at the same time, rates add.",
            },
            {
              do: "Days together = 30 / 5 = 6.",
              why: "5 × 6 = 30. They finish in 6 days.",
            },
            {
              do: "Trap: (15 + 10) / 2 = 12.5 days, or 15 + 10 = 25 days. Both are slower than B alone (10 days), which is impossible.",
              why: "Together must beat 10 days. 6 is less than 10, so it passes the sense check.",
            },
          ],
          result: "6 days",
        },
        {
          title: "A + B in 6 days, B alone 9 days — find A",
          prompt:
            "A and B together finish a job in 6 days. B alone finishes it in 9 days. How many days does A take alone?",
          steps: [
            {
              do: "LCM of 6 and 9. 6 = 2 × 3. 9 = 3 × 3. LCM = 2 × 3 × 3 = 18 units.",
              why: "18 is a multiple of both 6 and 9. Use it as the job size.",
            },
            {
              do: "Together rate = 18 / 6 = 3 units per day. B’s rate = 18 / 9 = 2 units per day.",
              why: "The together figure already includes A and B.",
            },
            {
              do: "A’s rate = 3 − 2 = 1 unit per day.",
              why: "Take B out of the together rate. The leftover is A.",
            },
            {
              do: "A alone = 18 / 1 = 18 days.",
              why: "At 1 unit a day, 18 units take 18 days.",
            },
            {
              do: "Check: in 6 days B does 2 × 6 = 12 units and A does 1 × 6 = 6 units. 12 + 6 = 18. Full job. Matches.",
              why: "The two rates over 6 days must add to the whole job.",
            },
            {
              do: "Trap: A = 9 − 6 = 3 days. That subtracts days instead of rates. 3 days would make A faster than both together, which cannot be.",
              why: "A is slower than B. 18 days is slower than 9, which fits.",
            },
          ],
          result: "18 days",
        },
      ],
    },
    {
      heading: "Averages",
      body: "The average of a list is (sum of the numbers) ÷ (how many numbers). If the average and the count are given, sum = average × count.\n\nThe exam gives five numbers, or an average of 6 numbers and then one is removed. The trap is averaging the averages without going back to the sum (for example treating a new average as the old average plus the new number).",
      howTo: [
        "Write sum = add every number (or sum = average × count if the average is given).",
        "Count the items. Include the new one, or drop the removed one, in the count.",
        "Average = sum ÷ count. Do the divide in full.",
        "If a number is added, new sum = old sum + that number. New count = old count + 1.",
        "If a number is removed, new sum = old sum − that number. New count = old count − 1.",
        "Check: average × count must rebuild the sum.",
      ],
      bullets: [
        "Average = sum ÷ count. Sum = average × count.",
        "When a number joins or leaves, change the sum first, then divide by the new count.",
        "Do not add two averages and divide by 2 unless both groups have the same size.",
      ],
      examples: [
        {
          title: "Average of 12, 18, 24, 30, 16",
          prompt: "Find the average of 12, 18, 24, 30 and 16.",
          steps: [
            {
              do: "Add: 12 + 18 = 30.",
              why: "Build the sum in pairs so a missed number is less likely.",
            },
            {
              do: "30 + 24 = 54. 54 + 30 = 84. 84 + 16 = 100. Sum = 100.",
              why: "Five numbers, all included. 84 + 16 = 100.",
            },
            {
              do: "Count = 5. Average = 100 / 5 = 20.",
              why: "Average is sum divided by how many.",
            },
            {
              do: "Check: 20 × 5 = 100, which is the sum.",
              why: "Average times count must rebuild the sum.",
            },
            {
              do: "Trap: (12 + 16) / 2 = 14, averaging only the ends, or 100 / 4 = 25, counting four numbers.",
              why: "All five numbers sit in the sum. Average is 20.",
            },
          ],
          result: "20",
        },
        {
          title: "Average of 6 numbers is 25; remove 40",
          prompt:
            "The average of 6 numbers is 25. One of them, 40, is removed. Find the average of the remaining 5.",
          steps: [
            {
              do: "Sum of the 6 numbers = 25 × 6 = 150.",
              why: "Sum = average × count. 25 × 6: 20 × 6 = 120 and 5 × 6 = 30, total 150.",
            },
            {
              do: "After removing 40, new sum = 150 − 40 = 110.",
              why: "Take the leaving number out of the sum, not out of the average.",
            },
            {
              do: "New count = 5. New average = 110 / 5 = 22.",
              why: "5 × 22 = 110.",
            },
            {
              do: "Sense: 40 is larger than 25, so removing it should pull the average down. 22 is less than 25. Good.",
              why: "If you got 28, you added 40 instead of subtracting it.",
            },
            {
              do: "Trap: 25 − 40 / 6 ≈ 18.3, subtracting 40 from the old average, or new average = 25 − 40 = −15.",
              why: "Always go through the sum. The average of the five is 22.",
            },
          ],
          result: "22",
        },
        {
          title: "Average of 4 numbers is 20; add 32",
          prompt:
            "The average of 4 numbers is 20. A fifth number 32 is included. Find the new average.",
          steps: [
            {
              do: "Sum of the 4 numbers = 20 × 4 = 80.",
              why: "Sum = average × count.",
            },
            {
              do: "New sum = 80 + 32 = 112.",
              why: "The new number is added to the old sum.",
            },
            {
              do: "New count = 5. New average = 112 / 5 = 22.4.",
              why: "5 × 22 = 110, remainder 2, so 22 + 2/5 = 22.4.",
            },
            {
              do: "Check: 22.4 × 5 = 112. Yes.",
              why: "22.4 × 5: 22 × 5 = 110 and 0.4 × 5 = 2, total 112.",
            },
            {
              do: "Trap: (20 + 32) / 2 = 26, averaging the old average with 32 as if both were single numbers of equal weight.",
              why: "The old 20 already stands for four numbers. They outweigh 32. New average is 22.4, closer to 20 than to 32.",
            },
          ],
          result: "22.4",
        },
        {
          title: "Average of 8, 14, 21, 27, 10",
          prompt: "Find the average of 8, 14, 21, 27 and 10.",
          steps: [
            {
              do: "Add: 8 + 14 = 22.",
              why: "Build the sum in pairs so a missed number is less likely.",
            },
            {
              do: "22 + 21 = 43. 43 + 27 = 70. 70 + 10 = 80. Sum = 80.",
              why: "Five numbers, all included. 70 + 10 = 80.",
            },
            {
              do: "Count = 5. Average = 80 / 5 = 16.",
              why: "Average is sum divided by how many.",
            },
            {
              do: "Check: 16 × 5 = 80, which is the sum.",
              why: "Average times count must rebuild the sum.",
            },
            {
              do: "Trap: (8 + 10) / 2 = 9, averaging only the ends, or 80 / 4 = 20, counting four numbers.",
              why: "All five numbers sit in the sum. Average is 16.",
            },
          ],
          result: "16",
        },
        {
          title: "Average of 5 numbers is 18; add 36",
          prompt:
            "The average of 5 numbers is 18. A sixth number 36 is included. Find the new average.",
          steps: [
            {
              do: "Sum of the 5 numbers = 18 × 5 = 90.",
              why: "Sum = average × count.",
            },
            {
              do: "New sum = 90 + 36 = 126.",
              why: "The new number is added to the old sum.",
            },
            {
              do: "New count = 6. New average = 126 / 6 = 21.",
              why: "6 × 21 = 126.",
            },
            {
              do: "Check: 21 × 6 = 126. Yes.",
              why: "Average times the new count must rebuild the new sum.",
            },
            {
              do: "Trap: (18 + 36) / 2 = 27, averaging the old average with 36 as if both were single numbers of equal weight.",
              why: "The old 18 already stands for five numbers. They outweigh 36. New average is 21, closer to 18 than to 36.",
            },
          ],
          result: "21",
        },
      ],
    },
    {
      heading: "Probability (favourable / total)",
      body: "Probability of an event = (number of favourable outcomes) ÷ (number of equally likely outcomes). It is a fraction between 0 and 1, sometimes written as a percent.\n\nThe exam uses a die, a pack of 52 cards, or a bag of coloured balls. The trap is counting the same outcome twice, or using 13 red cards as 13 + 13 because ‘hearts and diamonds’. Red cards are 26, kings are 4.",
      howTo: [
        "Write the total number of equally likely outcomes (faces of a die, cards in the pack, balls in the bag).",
        "Count only the outcomes the question wants. That is the favourable count.",
        "Probability = favourable ÷ total. Cancel the fraction if you can.",
        "Check: favourable cannot be larger than total. The fraction cannot be more than 1.",
        "If two groups overlap (king of hearts is both a king and a heart), do not count that card twice.",
      ],
      bullets: [
        "P = favourable / total. Total is the whole sample (52 cards, 6 faces, all balls).",
        "A pack has 52 cards, 4 suits of 13, 4 kings, 26 red, 26 black.",
        "A fair die has 6 faces. Even faces are 2, 4, 6 — three of them.",
      ],
      examples: [
        {
          title: "One card, probability it is a king",
          prompt:
            "One card is drawn at random from a pack of 52. What is the probability that it is a king?",
          steps: [
            {
              do: "Total outcomes = 52 (every card is equally likely).",
              why: "A standard pack has 52 cards and we draw one.",
            },
            {
              do: "Favourable = 4, because there are 4 kings (spades, hearts, diamonds, clubs).",
              why: "Each suit has one king.",
            },
            {
              do: "Probability = 4 / 52.",
              why: "Favourable over total.",
            },
            {
              do: "Cancel by 4: 4 ÷ 4 = 1 and 52 ÷ 4 = 13. So 4/52 = 1/13.",
              why: "The simplified fraction is the usual exam form.",
            },
            {
              do: "Trap: 13/52 because ‘13 cards in a suit’, or 1/52 as if there were only one king.",
              why: "Kings are not a suit. There are four of them. Answer 1/13.",
            },
          ],
          result: "1/13",
        },
        {
          title: "A die, number greater than 4",
          prompt:
            "A fair six-faced die is thrown. Find the probability that the number is greater than 4.",
          steps: [
            {
              do: "Total outcomes = 6 (faces 1, 2, 3, 4, 5, 6).",
              why: "A fair die makes each face equally likely.",
            },
            {
              do: "Greater than 4 means 5 and 6. That is 2 faces. Favourable = 2.",
              why: "4 is not greater than 4. Do not include 4.",
            },
            {
              do: "Probability = 2 / 6.",
              why: "Favourable over total.",
            },
            {
              do: "Cancel by 2: 2/6 = 1/3.",
              why: "2 ÷ 2 = 1, 6 ÷ 2 = 3.",
            },
            {
              do: "Trap: counting 4, 5, 6 as ‘greater than 4’, which is 3/6 = 1/2. That is ‘at least 4’, not ‘greater than 4’.",
              why: "Greater than 4 is only 5 and 6. Answer 1/3.",
            },
          ],
          result: "1/3",
        },
        {
          title: "Bag with 5 red and 7 blue, pick blue",
          prompt:
            "A bag holds 5 red balls and 7 blue balls. One ball is picked at random. Find the probability that it is blue.",
          steps: [
            {
              do: "Total balls = 5 + 7 = 12.",
              why: "Every ball in the bag is one possible outcome.",
            },
            {
              do: "Favourable = 7 (the blue balls).",
              why: "The question wants blue.",
            },
            {
              do: "Probability = 7 / 12.",
              why: "7 and 12 share no common factor other than 1, so the fraction stays 7/12.",
            },
            {
              do: "Check the other colour: P(red) = 5/12. Then 7/12 + 5/12 = 12/12 = 1. The two colours cover every ball.",
              why: "All probabilities of a complete split must add to 1.",
            },
            {
              do: "Trap: 7/5, using red as the total, or 7/7 = 1.",
              why: "The total is red plus blue, which is 12. Answer 7/12.",
            },
          ],
          result: "7/12",
        },
        {
          title: "One card, probability it is a heart",
          prompt:
            "One card is drawn at random from a pack of 52. What is the probability that it is a heart?",
          steps: [
            {
              do: "Total outcomes = 52 (every card is equally likely).",
              why: "A standard pack has 52 cards and we draw one.",
            },
            {
              do: "Favourable = 13, because there are 13 hearts in one suit.",
              why: "Each of the four suits has 13 cards. Hearts is one suit.",
            },
            {
              do: "Probability = 13 / 52.",
              why: "Favourable over total.",
            },
            {
              do: "Cancel by 13: 13 ÷ 13 = 1 and 52 ÷ 13 = 4. So 13/52 = 1/4.",
              why: "The simplified fraction is the usual exam form.",
            },
            {
              do: "Trap: 26/52 because ‘hearts are red and there are 26 red cards’, or 4/52 as if there were only four hearts.",
              why: "Hearts are one suit of 13, not all red cards and not four face cards. Answer 1/4.",
            },
          ],
          result: "1/4",
        },
        {
          title: "A die, even number",
          prompt:
            "A fair six-faced die is thrown. Find the probability that the number is even.",
          steps: [
            {
              do: "Total outcomes = 6 (faces 1, 2, 3, 4, 5, 6).",
              why: "A fair die makes each face equally likely.",
            },
            {
              do: "Even faces are 2, 4 and 6. That is 3 faces. Favourable = 3.",
              why: "1, 3 and 5 are odd. Do not count them.",
            },
            {
              do: "Probability = 3 / 6.",
              why: "Favourable over total.",
            },
            {
              do: "Cancel by 3: 3/6 = 1/2.",
              why: "3 ÷ 3 = 1, 6 ÷ 3 = 2.",
            },
            {
              do: "Trap: counting 4, 6 and 8, or treating 0 as even on a die. A standard die has no 0 and no 8.",
              why: "Even faces on a die are only 2, 4, 6. Answer 1/2.",
            },
          ],
          result: "1/2",
        },
      ],
    },
    {
      heading: "Number series (difference / multiply / squares)",
      body: "A number series asks for the next term. First try the gaps (each term minus the one before). If the gaps themselves form a simple pattern, use that. If the gaps explode, try multiplying by a fixed number, or matching squares and cubes (1, 4, 9, 16 or 8, 27, 64, 125).\n\nThe exam shows five or six numbers and a question mark. The trap is fitting the first two gaps and ignoring the rest. A real pattern must work on every step, not just the opening pair.",
      howTo: [
        "Write the series with space under it. Under each pair, write the difference (next − previous).",
        "Look at those differences. Do they rise by a fixed amount? If yes, continue that and add to the last term.",
        "If differences look wild, try ‘×2, ×3, ×2, ×3…’ or a single multiply such as ×2 every time.",
        "If that fails, test squares (n²) or cubes (n³) of 1, 2, 3, 4, …",
        "Check the pattern on every step already given, then apply it once more for the missing term.",
      ],
      bullets: [
        "First tool: write the differences. Second: multiply. Third: squares or cubes.",
        "The pattern must fit every given step, not only the first gap.",
        "Common cubes: 8, 27, 64, 125, 216. Common squares: 1, 4, 9, 16, 25, 36, 49.",
      ],
      examples: [
        {
          title: "Difference series: 4, 10, 18, 28, 40, ?",
          prompt: "Find the next number: 4, 10, 18, 28, 40, ?",
          steps: [
            {
              do: "Differences: 10 − 4 = 6. 18 − 10 = 8. 28 − 18 = 10. 40 − 28 = 12.",
              why: "The first tool is the gap between neighbours.",
            },
            {
              do: "The gaps are 6, 8, 10, 12. Each gap is 2 more than the last.",
              why: "That is a steady +2 on the differences.",
            },
            {
              do: "The next gap should be 12 + 2 = 14.",
              why: "Continue the same +2 rule one more time.",
            },
            {
              do: "Next term = 40 + 14 = 54.",
              why: "Add the new gap to the last given term.",
            },
            {
              do: "Check backwards: 4+6=10, 10+8=18, 18+10=28, 28+12=40, 40+14=54. Every given step fits.",
              why: "If any given step had broken the +2 on gaps, this would not be the pattern.",
            },
            {
              do: "Trap: seeing × something (4 × 2.5 = 10) that then fails on 10 to 18.",
              why: "A multiply rule must work on all steps. Here the difference rule does. Answer 54.",
            },
          ],
          result: "54",
        },
        {
          title: "Multiply series: 5, 10, 20, 40, 80, ?",
          prompt: "Find the next number: 5, 10, 20, 40, 80, ?",
          steps: [
            {
              do: "Differences: 10 − 5 = 5, 20 − 10 = 10, 40 − 20 = 20, 80 − 40 = 40. The gaps double, which hints at multiplying the terms.",
              why: "When gaps themselves double, the terms are often ×2 each time.",
            },
            {
              do: "Check multiply: 5 × 2 = 10. 10 × 2 = 20. 20 × 2 = 40. 40 × 2 = 80. Every step is ×2.",
              why: "The same ×2 works on all four given steps.",
            },
            {
              do: "Next term = 80 × 2 = 160.",
              why: "Apply ×2 once more.",
            },
            {
              do: "80 × 2: 80 + 80 = 160.",
              why: "Write the product. Do not jump from 80 to 180.",
            },
            {
              do: "Trap: adding 40 again (the last gap) to get 80 + 40 = 120. That treats a ×2 series as a fixed-gap series.",
              why: "The last gap was 40, but the next gap under ×2 is 80, giving 160, not 120.",
            },
          ],
          result: "160",
        },
        {
          title: "Cubes: 8, 27, 64, 125, ?",
          prompt: "Find the next number: 8, 27, 64, 125, ?",
          steps: [
            {
              do: "Differences: 27 − 8 = 19, 64 − 27 = 37, 125 − 64 = 61. The gaps 19, 37, 61 are not a simple +2 or +4.",
              why: "When differences look messy, try squares or cubes.",
            },
            {
              do: "Test cubes: 2³ = 2 × 2 × 2 = 8. 3³ = 3 × 3 × 3 = 9 × 3 = 27. 4³ = 4 × 4 × 4 = 16 × 4 = 64. 5³ = 5 × 5 × 5 = 25 × 5 = 125.",
              why: "Each given term is n³ for n = 2, 3, 4, 5.",
            },
            {
              do: "The next n is 6. 6³ = 6 × 6 × 6. First 6 × 6 = 36. Then 36 × 6 = 216.",
              why: "36 × 6: 30 × 6 = 180 and 6 × 6 = 36, sum 216.",
            },
            {
              do: "So the next term is 216.",
              why: "The pattern is consecutive cubes starting at 2³.",
            },
            {
              do: "Trap: treating them as +19, +37, +61 and guessing the next gap (maybe +91) to get 125 + 91 = 216 by luck, or +85 to get 210.",
              why: "The cube reading is the one that fits every term exactly. Answer 216.",
            },
          ],
          result: "216",
        },
        {
          title: "Difference series: 3, 8, 15, 24, 35, ?",
          prompt: "Find the next number: 3, 8, 15, 24, 35, ?",
          steps: [
            {
              do: "Differences: 8 − 3 = 5. 15 − 8 = 7. 24 − 15 = 9. 35 − 24 = 11.",
              why: "The first tool is the gap between neighbours.",
            },
            {
              do: "The gaps are 5, 7, 9, 11. Each gap is 2 more than the last.",
              why: "That is a steady +2 on the differences.",
            },
            {
              do: "The next gap should be 11 + 2 = 13.",
              why: "Continue the same +2 rule one more time.",
            },
            {
              do: "Next term = 35 + 13 = 48.",
              why: "Add the new gap to the last given term.",
            },
            {
              do: "Check backwards: 3+5=8, 8+7=15, 15+9=24, 24+11=35, 35+13=48. Every given step fits.",
              why: "If any given step had broken the +2 on gaps, this would not be the pattern.",
            },
            {
              do: "Trap: seeing × something (3 × 2 + 2 = 8) that then fails on 8 to 15, or adding 11 again to get 35 + 11 = 46.",
              why: "A multiply rule must work on all steps. Here the difference rule does. Answer 48.",
            },
          ],
          result: "48",
        },
        {
          title: "Squares: 1, 4, 9, 16, 25, ?",
          prompt: "Find the next number: 1, 4, 9, 16, 25, ?",
          steps: [
            {
              do: "Differences: 4 − 1 = 3, 9 − 4 = 5, 16 − 9 = 7, 25 − 16 = 9. The gaps 3, 5, 7, 9 rise by 2, which also matches consecutive squares.",
              why: "When gaps of odd numbers appear, test squares of 1, 2, 3, 4, …",
            },
            {
              do: "Test squares: 1² = 1. 2² = 4. 3² = 9. 4² = 16. 5² = 25.",
              why: "Each given term is n² for n = 1, 2, 3, 4, 5.",
            },
            {
              do: "The next n is 6. 6² = 6 × 6 = 36.",
              why: "6 × 6 = 36. Write the product. Do not jump to 30 or 49.",
            },
            {
              do: "So the next term is 36.",
              why: "The pattern is consecutive squares starting at 1².",
            },
            {
              do: "Trap: adding 9 again (the last gap) to get 25 + 9 = 34, or guessing 5² + 6² = 61.",
              why: "The square reading is the one that fits every term exactly. Answer 36.",
            },
          ],
          result: "36",
        },
      ],
    },
    {
      heading: "Quadratic comparison (sum and product of roots, or sign of f(x))",
      body: "A quadratic x² − (sum)x + (product) = 0 has two roots that add to the middle number (with the sign flipped) and multiply to the last number. For x² − 5x + 6 = 0 the roots add to 5 and multiply to 6, so they are 2 and 3. To compare x and y, list both pairs and test every pairing.\n\nThe exam gives two equations and asks whether x > y, x < y, x ≥ y, or ‘cannot say’. The trap is comparing only the larger roots, or only the sums. If one pairing is x = y and another is x < y, the safe tick is x ≤ y, not x < y. For sign of f(x), a U-shaped graph (positive x²) is negative between the roots and positive outside.",
      howTo: [
        "For each equation, find two numbers that add to the sum of roots and multiply to the product.",
        "Sum of roots for x² − s x + p = 0 is s. Product is p. Factor as (x − a)(x − b).",
        "Write the two x-values and the two y-values as lists.",
        "Check all four pairings (each x with each y). See which of >, <, ≥, ≤ holds in every pairing.",
        "If two pairings disagree (one x < y and one x > y), the relation cannot be said.",
        "For sign of f(x): factor, mark the roots, then plug the given x and compute f(x) in full.",
      ],
      bullets: [
        "x² − (sum)x + (product) = 0. Find two numbers with that sum and that product.",
        "Compare every pairing of roots, not just the bigger ones.",
        "If x² is positive, f(x) is negative between the two roots and positive outside.",
      ],
      examples: [
        {
          title: "x² − 5x + 6 = 0 versus y² − 7y + 12 = 0",
          prompt:
            "I: x² − 5x + 6 = 0. II: y² − 7y + 12 = 0. Find the relation between x and y (greater, less, equal, or cannot say).",
          steps: [
            {
              do: "For I, sum of roots = 5 and product = 6. Two numbers: 2 and 3, because 2 + 3 = 5 and 2 × 3 = 6. So x = 2 or x = 3.",
              why: "The middle coefficient 5 (after the minus) is the sum. The last number 6 is the product.",
            },
            {
              do: "Check: (x − 2)(x − 3) = x² − 5x + 6. Yes. Roots 2 and 3.",
              why: "Expanding: x² − 3x − 2x + 6 = x² − 5x + 6.",
            },
            {
              do: "For II, sum = 7, product = 12. Two numbers: 3 and 4, because 3 + 4 = 7 and 3 × 4 = 12. So y = 3 or y = 4.",
              why: "Same reading of sum and product on the second equation.",
            },
            {
              do: "The four pairings: (x, y) = (2, 3), (2, 4), (3, 3), (3, 4). That is x < y, x < y, x = y, x < y.",
              why: "Every x must be tried with every y, because the question does not say which root is picked.",
            },
            {
              do: "In every pairing x is less than or equal to y. It is not always strictly less (when both are 3).",
              why: "x < y fails on (3, 3). x ≤ y holds on all four. x > y never holds.",
            },
            {
              do: "Trap: ‘x is 2 or 3, y is 3 or 4, so x < y’ — that drops the equal case.",
              why: "The relation that always holds is x ≤ y.",
            },
          ],
          result: "x ≤ y",
        },
        {
          title: "x² − 9x + 20 = 0 versus y² − 5y + 6 = 0",
          prompt:
            "I: x² − 9x + 20 = 0. II: y² − 5y + 6 = 0. Compare x and y.",
          steps: [
            {
              do: "For I, sum = 9, product = 20. Two numbers: 4 and 5, because 4 + 5 = 9 and 4 × 5 = 20. x = 4 or 5.",
              why: "Check: (x − 4)(x − 5) = x² − 9x + 20.",
            },
            {
              do: "4 × 5 = 20 and 4 + 5 = 9, confirmed. (x − 4)(x − 5) = x² − 5x − 4x + 20 = x² − 9x + 20.",
              why: "The expand rebuilds equation I, so the roots are right.",
            },
            {
              do: "For II, sum = 5, product = 6. Two numbers: 2 and 3. y = 2 or 3.",
              why: "2 + 3 = 5, 2 × 3 = 6. (y − 2)(y − 3) = y² − 5y + 6.",
            },
            {
              do: "Four pairings: (4, 2), (4, 3), (5, 2), (5, 3). In each, x is 4 or 5 and y is 2 or 3, so x is always larger.",
              why: "The smallest x is 4 and the largest y is 3. 4 > 3, so every x beats every y.",
            },
            {
              do: "So x > y in every pairing.",
              why: "No equal case and no reverse case.",
            },
            {
              do: "Trap: comparing sums 9 and 5 and stopping, or comparing products 20 and 6. Those hints are not a proof until the four pairings are listed.",
              why: "Listing is short and safe. Relation: x > y.",
            },
          ],
          result: "x > y",
        },
        {
          title: "Sign of f(x) = x² − 4x + 3 at 0, 2 and 5",
          prompt:
            "Let f(x) = x² − 4x + 3. Find f(0), f(2) and f(5), and say whether each is positive, negative, or zero.",
          steps: [
            {
              do: "Sum of roots = 4, product = 3. Two numbers: 1 and 3. So f(x) = (x − 1)(x − 3).",
              why: "1 + 3 = 4, 1 × 3 = 3. Expand: x² − 3x − x + 3 = x² − 4x + 3.",
            },
            {
              do: "f(0) = 0² − 4×0 + 3 = 0 − 0 + 3 = 3, which is positive.",
              why: "Plug x = 0 into the original. Also (0 − 1)(0 − 3) = (−1)(−3) = 3.",
            },
            {
              do: "f(2) = 2² − 4×2 + 3 = 4 − 8 + 3. 4 − 8 = −4, then −4 + 3 = −1, which is negative.",
              why: "x = 2 sits between the roots 1 and 3. For a U-shape (x² positive), f is negative between the roots.",
            },
            {
              do: "Check with factors: (2 − 1)(2 − 3) = (1)(−1) = −1. Same.",
              why: "Two routes must agree.",
            },
            {
              do: "f(5) = 5² − 4×5 + 3 = 25 − 20 + 3. 25 − 20 = 5, then 5 + 3 = 8, which is positive.",
              why: "x = 5 is to the right of both roots, so the U-shape is above the axis. Factors: (5 − 1)(5 − 3) = 4 × 2 = 8.",
            },
            {
              do: "Trap: ‘squares are always positive, so f(2) is positive’. f(2) = −1. The −4x term can win in the middle.",
              why: "Compute the value. Do not guess the sign from x² alone.",
            },
          ],
          result: "f(0) = 3 (positive); f(2) = −1 (negative); f(5) = 8 (positive)",
        },
        {
          title: "x² − 6x + 8 = 0 versus y² − 9y + 18 = 0",
          prompt:
            "I: x² − 6x + 8 = 0. II: y² − 9y + 18 = 0. Find the relation between x and y (greater, less, equal, or cannot say).",
          steps: [
            {
              do: "For I, sum of roots = 6 and product = 8. Two numbers: 2 and 4, because 2 + 4 = 6 and 2 × 4 = 8. So x = 2 or x = 4.",
              why: "The middle coefficient 6 (after the minus) is the sum. The last number 8 is the product.",
            },
            {
              do: "Check: (x − 2)(x − 4) = x² − 6x + 8. Yes. Roots 2 and 4.",
              why: "Expanding: x² − 4x − 2x + 8 = x² − 6x + 8.",
            },
            {
              do: "For II, sum = 9, product = 18. Two numbers: 3 and 6, because 3 + 6 = 9 and 3 × 6 = 18. So y = 3 or y = 6.",
              why: "Same reading of sum and product on the second equation.",
            },
            {
              do: "The four pairings: (x, y) = (2, 3), (2, 6), (4, 3), (4, 6). That is x < y, x < y, x > y, x < y.",
              why: "Every x must be tried with every y, because the question does not say which root is picked.",
            },
            {
              do: "One pairing has x > y (4 versus 3) and the others have x < y. No single inequality holds in every pairing.",
              why: "x < y fails on (4, 3). x > y fails on the other three. x ≤ y and x ≥ y also fail.",
            },
            {
              do: "Trap: comparing only the larger roots (4 and 6) and ticking x < y, or comparing only the sums 6 and 9.",
              why: "Listing all four pairings is short and safe. Relation: cannot say.",
            },
          ],
          result: "cannot say",
        },
        {
          title: "Sign of f(x) = x² − 5x + 6 at 0, 2.5 and 4",
          prompt:
            "Let f(x) = x² − 5x + 6. Find f(0), f(2.5) and f(4), and say whether each is positive, negative, or zero.",
          steps: [
            {
              do: "Sum of roots = 5, product = 6. Two numbers: 2 and 3. So f(x) = (x − 2)(x − 3).",
              why: "2 + 3 = 5, 2 × 3 = 6. Expand: x² − 3x − 2x + 6 = x² − 5x + 6.",
            },
            {
              do: "f(0) = 0² − 5×0 + 6 = 6, which is positive.",
              why: "Plug x = 0 into the original. Also (0 − 2)(0 − 3) = (−2)(−3) = 6.",
            },
            {
              do: "f(2.5) = (2.5)² − 5×2.5 + 6 = 6.25 − 12.5 + 6. 6.25 + 6 = 12.25, then 12.25 − 12.5 = −0.25, which is negative.",
              why: "x = 2.5 sits between the roots 2 and 3. For a U-shape (x² positive), f is negative between the roots.",
            },
            {
              do: "Check with factors: (2.5 − 2)(2.5 − 3) = (0.5)(−0.5) = −0.25. Same.",
              why: "Two routes must agree.",
            },
            {
              do: "f(4) = 4² − 5×4 + 6 = 16 − 20 + 6. 16 − 20 = −4, then −4 + 6 = 2, which is positive.",
              why: "x = 4 is to the right of both roots, so the U-shape is above the axis. Factors: (4 − 2)(4 − 3) = 2 × 1 = 2.",
            },
            {
              do: "Trap: ‘squares are always positive, so f(2.5) is positive’. f(2.5) = −0.25. The −5x term can win in the middle.",
              why: "Compute the value. Do not guess the sign from x² alone.",
            },
          ],
          result: "f(0) = 6 (positive); f(2.5) = −0.25 (negative); f(4) = 2 (positive)",
        },
      ],
    },
    {
      heading: "Reading a small DI table",
      body: "Data interpretation (DI) here is a small table of numbers. You add a column, take a percent of a total, or write a ratio of two cells. Read the row name and the column name before you pick a number.\n\nThe exam puts four or five rows and two years. The trap is using the wrong year, or taking a percent of a row instead of of the column total. Point at the cell with your pen, then add.",
      howTo: [
        "Read the title of each column and each row. Copy the cells you need onto scratch paper.",
        "For a total, add every cell in that column (or row). Add in pairs and write the running sum.",
        "For a percent, identify the part and the whole. Percent = (part / whole) × 100.",
        "For a ratio, write the two cells as a : b and cancel a common factor.",
        "Check that you did not mix 2023 with 2024, and that the whole really is the total you used.",
      ],
      bullets: [
        "Copy the cells first. Do not add from memory across the table.",
        "A percent needs a clearly named whole (usually a column total).",
        "Cancel a ratio only after both numbers are the right cells.",
      ],
      examples: [
        {
          title: "Total of the 2023 column",
          prompt:
            "Applications received: Pune 120 in 2023 and 150 in 2024; Nashik 80 in 2023 and 100 in 2024; Nagpur 90 in 2023 and 70 in 2024; Kolhapur 60 in 2023 and 80 in 2024. Find the total applications in 2023.",
          steps: [
            {
              do: "2023 cells: Pune 120, Nashik 80, Nagpur 90, Kolhapur 60.",
              why: "The question asks for 2023 only. Leave the 2024 column alone.",
            },
            {
              do: "120 + 80 = 200.",
              why: "Add in pairs.",
            },
            {
              do: "200 + 90 = 290.",
              why: "Running sum after three cities.",
            },
            {
              do: "290 + 60 = 350. Total = 350.",
              why: "Four cities, all of 2023.",
            },
            {
              do: "Trap: adding both years (350 + 150+100+70+80). 2024 sum is 400, grand total 750, which is not asked.",
              why: "The question named 2023. Answer 350.",
            },
          ],
          result: "350",
        },
        {
          title: "Pune’s 2024 share of the 2024 total",
          prompt:
            "Same table: Pune 120 (2023), 150 (2024); Nashik 80, 100; Nagpur 90, 70; Kolhapur 60, 80. What percent of 2024’s total is Pune’s 2024 figure?",
          steps: [
            {
              do: "2024 cells: 150, 100, 70, 80.",
              why: "The whole is the 2024 column, not the two-year grand total.",
            },
            {
              do: "150 + 100 = 250. 250 + 70 = 320. 320 + 80 = 400. 2024 total = 400.",
              why: "Add the four 2024 figures. 320 + 80 = 400.",
            },
            {
              do: "Pune 2024 = 150. Percent = (150 / 400) × 100.",
              why: "Part is Pune’s 2024 cell. Whole is 400.",
            },
            {
              do: "150 / 400 = 15 / 40 = 3 / 8. Then 3/8 × 100 = 300 / 8 = 37.5.",
              why: "Cancel 50: 150÷50=3, 400÷50=8. 8 × 37.5 = 300, so 300/8 = 37.5.",
            },
            {
              do: "Trap: 150 / 350 × 100 using the 2023 total as the whole, or 150 / 270 × 100 using Pune’s two-year sum 270 as the whole.",
              why: "The question said percent of 2024’s total. That whole is 400. Answer 37.5%.",
            },
          ],
          result: "37.5%",
        },
        {
          title: "Ratio Nashik 2023 to Nagpur 2024",
          prompt:
            "Same table: Pune 120, 150; Nashik 80, 100; Nagpur 90, 70; Kolhapur 60, 80. Find the ratio of Nashik’s 2023 applications to Nagpur’s 2024 applications.",
          steps: [
            {
              do: "Nashik 2023 = 80. Nagpur 2024 = 70.",
              why: "Two different cities and two different years. Point at each cell separately.",
            },
            {
              do: "Ratio = 80 : 70.",
              why: "Write part : part in the order the question named them.",
            },
            {
              do: "Cancel 10: 80 ÷ 10 = 8 and 70 ÷ 10 = 7. Ratio = 8 : 7.",
              why: "10 is a common factor. 8 and 7 share no further factor.",
            },
            {
              do: "Check: 8 × 10 = 80 and 7 × 10 = 70. The cancelled pair rebuilds the cells.",
              why: "Cancelling must be reversible.",
            },
            {
              do: "Trap: 80 : 90 (both 2023) or 100 : 70 (both 2024) or 80 : 70 left uncancelled as if 80:70 were already simplest.",
              why: "The named pair is Nashik 2023 : Nagpur 2024. Simplest form is 8 : 7.",
            },
          ],
          result: "8 : 7",
        },
        {
          title: "Total of the 2022 column",
          prompt:
            "Unit sales: Store A 40 in 2022 and 55 in 2023; Store B 70 in 2022 and 65 in 2023; Store C 90 in 2022 and 80 in 2023; Store D 50 in 2022 and 100 in 2023. Find the total sales in 2022.",
          steps: [
            {
              do: "2022 cells: A 40, B 70, C 90, D 50.",
              why: "The question asks for 2022 only. Leave the 2023 column alone.",
            },
            {
              do: "40 + 70 = 110.",
              why: "Add in pairs.",
            },
            {
              do: "110 + 90 = 200.",
              why: "Running sum after three stores.",
            },
            {
              do: "200 + 50 = 250. Total = 250.",
              why: "Four stores, all of 2022.",
            },
            {
              do: "Trap: adding both years (250 + 55+65+80+100). 2023 sum is 300, grand total 550, which is not asked.",
              why: "The question named 2022. Answer 250.",
            },
          ],
          result: "250",
        },
        {
          title: "Ratio C 2022 to D 2023",
          prompt:
            "Same table: A 40, 55; B 70, 65; C 90, 80; D 50, 100. Find the ratio of Store C’s 2022 sales to Store D’s 2023 sales.",
          steps: [
            {
              do: "C 2022 = 90. D 2023 = 100.",
              why: "Two different stores and two different years. Point at each cell separately.",
            },
            {
              do: "Ratio = 90 : 100.",
              why: "Write part : part in the order the question named them.",
            },
            {
              do: "Cancel 10: 90 ÷ 10 = 9 and 100 ÷ 10 = 10. Ratio = 9 : 10.",
              why: "10 is a common factor. 9 and 10 share no further factor.",
            },
            {
              do: "Check: 9 × 10 = 90 and 10 × 10 = 100. The cancelled pair rebuilds the cells.",
              why: "Cancelling must be reversible.",
            },
            {
              do: "Trap: 90 : 80 (both C) or 50 : 100 (both D) or 90 : 100 left uncancelled as if 90:100 were already simplest.",
              why: "The named pair is C 2022 : D 2023. Simplest form is 9 : 10.",
            },
          ],
          result: "9 : 10",
        },
      ],
    },
  ],
};
