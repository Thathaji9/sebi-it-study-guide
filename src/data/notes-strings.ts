import type { TopicNote } from "@/data/notes";

export const notesStrings: TopicNote = {
  topic: "strings",
  title: "String manipulation — techniques (beginner)",
  blurb:
    "Java substring(i, j) and Python s[i:j] take letters from i up to but not including j. C++ substr(pos, len) takes a length, not an end index. That mix-up is the whole topic. Draw a number line. Count. Translate before you pick an option.",
  blocks: [
    {
      heading: "Java substring(i, j) vs Python s[i:j] vs C++ substr(pos, len)",
      body: "Java s.substring(i, j) copies indexes i, i+1, …, j-1. The length is j − i. Python s[i:j] is the same half-open rule. The second number is a fence, not a count.\n\nC++ s.substr(pos, count) starts at pos and takes count letters. s.substr(1, 3) on \"SEBI\" is \"EBI\" (three letters). Java substring(1, 3) on the same word is \"EB\". Translate: Java/Python [1:3] equals C++ substr(1, 2).\n\nJava throws if i < 0, j > length, or i > j. Python clips wild slice bounds. C++ throws only if pos is past size(); a huge count just clips to the end.",
      howTo: [
        "Write the word. Put a number before each letter and one after the last letter.",
        "Ask which language. Java/Python: second number is exclusive index. C++: second number is how many letters.",
        "Length check: Java/Python result length is j − i. C++ result length is count (or less if the string ends).",
        "Wild bounds: Java substring throws. Python slice clips. C++ throws only when pos > size().",
      ],
      bullets: [
        "Java/Python (i, j) = letters i .. j-1. C++ (pos, len) = letters pos .. pos+len-1.",
        "Java substring(1,3) on SEBI is EB. C++ substr(1,3) on SEBI is EBI.",
        "Python clips. Java substring throws. C++ throws only if pos is past the end.",
      ],
      examples: [
        {
          title: "Java substring(i, j) is [i, j)",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    String s = "SEBI";
    System.out.print(s.substring(1, 3) + " " + s.substring(2) + " " + s.substring(1, 1).length());
  }
}`,
          steps: [
            {
              do: "Number line: 0 S 1 E 2 B 3 I 4. n=4.",
              why: "Put a fence before each letter and one after the last letter.",
            },
            {
              do: "substring(1, 3) takes fences 1 to 3 → E,B → \"EB\". Letter I at 3 is not taken.",
              why: "The second argument is an exclusive index, not a length.",
            },
            {
              do: "substring(2) means [2, 4) → \"BI\". substring(1, 1) is empty, length 0.",
              why: "One-arg substring(i) goes to the end. Equal i and j is the empty string, not an error.",
            },
            {
              do: "print EB BI 0. Length of substring(i, j) is always j − i when the call works.",
              why: "If the call had been substring(1, 2) the length would be 1 (\"E\"), which is not C++ substr(1, 2).",
            },
          ],
          result: "EB BI 0",
        },
        {
          title: "Python s[i:j] same fences, kinder bounds",
          prompt: "What is printed?",
          language: "python",
          code: `s = "SEBI"
print(s[1:3], s[-3:-1], s[3:1], s[2:99])`,
          steps: [
            {
              do: "Number line:  0 1 2 3   S E B I    −4 −3 −2 −1.",
              why: "Python uses the same [start, stop) idea as Java substring.",
            },
            {
              do: "s[1:3] takes indexes 1,2 → EB. s[-3:-1]: −3→1, −1→3, same [1,3) → EB.",
              why: "Convert negatives to n+i, then apply the half-open rule.",
            },
            {
              do: "s[3:1] with positive step is empty (start past stop). Java substring(3, 1) would throw.",
              why: "Python does not swap or throw on a backwards empty slice.",
            },
            {
              do: "s[2:99] clips stop to 4 → BI. Four print arguments: EB, EB, empty, BI. Output EB EB  BI (two spaces where the empty string sits).",
              why: "Wild Python slice bounds clip. They never IndexError. (A single s[99] would.)",
            },
          ],
          result: "EB EB  BI",
        },
        {
          title: "C++ substr(pos, len) takes a count — the trap",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
#include <string>
int main() {
  std::string s = "SEBI";
  std::cout << s.substr(1, 2) << " " << s.substr(1, 3) << " " << s.substr(2);
  try {
    std::cout << s.substr(5, 1);
  } catch (const std::out_of_range&) {
    std::cout << " X";
  }
}`,
          steps: [
            {
              do: "s = SEBI, size 4. Indexes 0:S 1:E 2:B 3:I.",
              why: "C++ still 0-based, but the second argument is a length.",
            },
            {
              do: "substr(1, 2): start 1, take 2 letters → EB. This matches Java substring(1, 3), not substring(1, 2).",
              why: "count 2 means two letters, so the exclusive end would be 1+2=3.",
            },
            {
              do: "substr(1, 3): take 3 letters → EBI. Java substring(1, 3) would have been EB. substr(2) is the suffix BI.",
              why: "Mixing (i, j) with (pos, len) is the 1-mark trap.",
            },
            {
              do: "substr(5, 1): pos 5 > size 4 → throws. catch prints \" X\". Huge count on a valid pos would clip (substr(2, 99) is BI). Output EB EBI BI X.",
              why: "C++ throws only when pos is past the end. An oversized length clips.",
            },
          ],
          result: "EB EBI BI X",
        },
      ],
    },
    {
      heading: "Length and 0-based index — count the fences",
      body: "The first letter sits at index 0. Length is how many letters, so the last index is length − 1. “SEBI” has length 4 and last index 3.\n\nThe exam trap is asking for the character at index 2 and hoping you pick the third letter as ‘index 3’. Draw a number line: 0 under the first letter.",
      howTo: [
        "Write the string with a number under each letter, starting at 0.",
        "Length = count of letters. Last index = length − 1.",
        "charAt(i) / s[i] is the letter sitting on number i.",
        "If i is length or more, Java/C++ throw or are undefined; Python s[i] raises IndexError, but slices clip.",
      ],
      bullets: [
        "Index starts at 0. Length is a count, not a last-index.",
        "Last letter of a string of n letters is at n − 1.",
        "Empty string has length 0 and no valid index.",
      ],
      examples: [
        {
          title: "Index of each letter",
          prompt: "String s = \"SEBI\". What are length, char at 0, char at 2, last index?",
          steps: [
            { do: "Write S E B I. Put 0 1 2 3 under them.", why: "0-based means the first letter is 0, not 1." },
            { do: "Count letters: 4. That is length.", why: "Length is a count of boxes, not the last number." },
            { do: "Letter at 0 is S. Letter at 2 is B.", why: "Read the number under the letter. 2 is the third box." },
            { do: "Last index = 4 − 1 = 3, letter I.", why: "Last index is always length minus one." },
            { do: "There is no letter at 4.", why: "Index 4 is the fence after I, not a letter." },
          ],
          result: "length 4; s[0]=S; s[2]=B; last index 3 (I).",
        },
        {
          title: "Python s[i] vs slice when i is large",
          prompt: "s = \"IT\". What happens for s[2] and s[2:9]?",
          language: "python",
          code: `s = "IT"
# s[2]  → IndexError
print(s[2:9])`,
          steps: [
            { do: "s has letters I,T at 0,1. Length 2.", why: "Only two boxes exist." },
            { do: "s[2] asks for a box that does not exist → IndexError.", why: "A single index must land on a letter." },
            { do: "s[2:9] is a slice. Start 2 is at the end fence. Result is empty, not an error.", why: "Slices clip. They do not throw for wild stop values." },
            { do: "print shows a blank line.", why: "The empty string prints as nothing." },
            { do: "Exam: index vs slice are different rules in Python.", why: "Do not mix charAt rules with slice rules." },
          ],
          result: "s[2] errors; s[2:9] is \"\" (empty).",
        },
        {
          title: "Java charAt last letter",
          prompt: "s = \"AM\". What does s.charAt(s.length() - 1) return?",
          language: "java",
          code: `String s = "AM";
System.out.print(s.charAt(s.length() - 1));`,
          steps: [
            { do: "length() is 2.", why: "Two letters: A and M." },
            { do: "s.length() - 1 = 1.", why: "Last index formula." },
            { do: "charAt(1) is M.", why: "0 is A, 1 is M." },
            { do: "charAt(2) would throw.", why: "2 equals length, so it is past the last letter." },
            { do: "print M.", why: "The last-letter recipe is always charAt(length - 1)." },
          ],
          result: "M",
        },
      ],
    },
    {
      heading: "Search — indexOf, find, and ‘not found’",
      body: "Searching asks: from the left, where does this piece first sit? Java indexOf returns −1 if missing. C++ find returns npos if missing. Python str.find returns −1; str.index raises if missing.\n\nThe trap is treating −1 as index 0, or forgetting that search is case-sensitive: \"sebi\" does not find \"SEBI\".",
      howTo: [
        "Write the haystack with indexes.",
        "Slide the needle from the left until every letter matches.",
        "The answer is the starting index of that match.",
        "If it never matches, write the language’s ‘missing’ value (−1, npos, or exception).",
      ],
      bullets: [
        "First match from the left. Case-sensitive unless you lower both sides.",
        "Java/Python find: −1 means missing. C++: npos means missing.",
        "indexOf(\"\") is 0 in Java (empty needle sits at the start).",
      ],
      examples: [
        {
          title: "Java indexOf first hit",
          prompt: "What is printed?",
          language: "java",
          code: `String s = "SEBI-SEBI";
System.out.print(s.indexOf("SE") + " " + s.indexOf("se") + " " + s.indexOf("BI", 3));`,
          steps: [
            { do: "Indexes: 0 S 1 E 2 B 3 I 4 - 5 S 6 E 7 B 8 I.", why: "Need a number line before you search." },
            { do: "\"SE\" matches at 0. indexOf(\"SE\") = 0.", why: "First match from the left wins." },
            { do: "\"se\" has no match (case). indexOf returns −1.", why: "Search does not ignore case." },
            { do: "indexOf(\"BI\", 3) starts looking at 3. Position 3 is I, not B. Next BI is at 7.", why: "The fromIndex skips the first BI at 2." },
            { do: "print 0 -1 7.", why: "Three independent searches." },
          ],
          result: "0 -1 7",
        },
        {
          title: "C++ find and npos",
          prompt: "s = \"GATE\". Does s.find(\"AT\") and s.find(\"XYZ\") print numbers or npos?",
          language: "cpp",
          code: `std::string s = "GATE";
auto a = s.find("AT");
auto b = s.find("XYZ");
std::cout << a << " " << (b == std::string::npos);`,
          steps: [
            { do: "G A T E at 0 1 2 3.", why: "Same 0-based line." },
            { do: "\"AT\" starts at 1. find returns 1.", why: "find returns the start index." },
            { do: "\"XYZ\" never appears. find returns npos.", why: "npos is C++ for ‘not found’, not −1 as an int you print blindly." },
            { do: "b == npos is true, printed as 1.", why: "Compare with npos. Do not assume the missing value is −1." },
            { do: "Output 1 1.", why: "Found at 1; missing test is true." },
          ],
          result: "1 1  (found at 1; second search is npos)",
        },
        {
          title: "Python find vs index",
          prompt: "\"SEBI\".find(\"Z\") vs \"SEBI\".index(\"Z\")",
          language: "python",
          code: `print("SEBI".find("Z"))
# "SEBI".index("Z")  → ValueError`,
          steps: [
            { do: "Needle Z is not in SEBI.", why: "No match from the left." },
            { do: "find returns −1.", why: "find is the safe search." },
            { do: "index raises ValueError.", why: "index wants a hit. Missing is an exception, not −1." },
            { do: "Exam: if the option says −1, they mean find. If it says error, they mean index.", why: "Two methods, two missing-rules." },
            { do: "\"SEBI\".find(\"EB\") is 1.", why: "E sits at 1." },
          ],
          result: "find → −1; index → ValueError.",
        },
      ],
    },
    {
      heading: "Regex — start, end, digit, and a back-reference",
      body: "A regex is a pattern. ^ means start of the string. $ means end. \\d means one digit. . means one character (not newline). * means ‘repeat the previous thing 0 or more times’.\n\nA back-reference \\1 means ‘the same text that group 1 captured’. Group 1 is the first pair of parentheses.",
      howTo: [
        "Read left to right. Write what each token eats.",
        "If you see ^, the match must start at letter 0.",
        "If you see $, the match must finish at the last letter.",
        "If you see ( ), that is a group. \\1 must copy that group later.",
      ],
      bullets: [
        "^ start, $ end, \\d digit, . any char, * repeat.",
        "Same digit at both ends: ^(\\d).*\\1$",
        "Python raw strings r\"\\d\" keep the backslash honest.",
      ],
      examples: [
        {
          title: "Starts and ends with the same digit",
          prompt: "Which strings match ^(\\d).*\\1$  —  121, 11, 12, a1a ?",
          steps: [
            { do: "Pattern: ^ start, (\\d) capture first digit as group 1, .* any middle, \\1 that same digit, $ end.", why: "Read tokens in order." },
            { do: "121: first 1 captured, middle 2, last 1 copies group 1. Match.", why: "Ends equal the captured start digit." },
            { do: "11: first 1, middle empty (.* allows nothing), last 1. Match.", why: ".* can be zero characters." },
            { do: "12: last 2 ≠ captured 1. No match.", why: "\\1 is not ‘any digit’; it is the same digit." },
            { do: "a1a: does not start with a digit. ^(\\d) fails.", why: "^ anchors the first character." },
          ],
          result: "121 and 11 match. 12 and a1a do not.",
        },
        {
          title: "Only digits in the middle is a narrower pattern",
          prompt: "Does 9z9 match ^(\\d)\\d*\\1$ ?",
          steps: [
            { do: "This pattern is: start digit, then only digits, then the same digit at the end.", why: "\\d* is digits, not ‘anything’." },
            { do: "9z9 has a z in the middle.", why: "z is not a digit." },
            { do: "So 9z9 fails ^(\\d)\\d*\\1$ but would match ^(\\d).*\\1$.", why: ".* allows z. \\d* does not." },
            { do: "909 matches both patterns.", why: "Middle 0 is a digit." },
            { do: "Exam: pick the pattern that matches the question’s ‘any characters’ vs ‘digits only’.", why: "One token change flips the answer." },
          ],
          result: "9z9 does not match ^(\\d)\\d*\\1$. Use .* if the middle may be letters.",
        },
        {
          title: "Python re.findall digits",
          prompt: "What does re.findall(r\"\\d+\", \"SEBI 2024 Grade A\") return?",
          language: "python",
          code: `import re
print(re.findall(r"\\d+", "SEBI 2024 Grade A"))`,
          steps: [
            { do: "\\d means a digit. + means one or more.", why: "We want whole numbers, not each digit alone." },
            { do: "Scan the text. Letters are skipped.", why: "They are not digits." },
            { do: "2024 is four digits in a row → one match \"2024\".", why: "+ glues consecutive digits." },
            { do: "No other digit runs. findall returns a list of one string.", why: "findall lists every non-overlapping match." },
            { do: "If the pattern were \\d, the list would be ['2','0','2','4'].", why: "Without + you get one character at a time." },
          ],
          result: "['2024']",
        },
      ],
    },
  ],
};
