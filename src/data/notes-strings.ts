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
        {
          title: "Java substring throws on a wild end; Python would clip",
          prompt: "What is the result?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    String s = "SEBI";
    try {
      System.out.print(s.substring(1, 9));
    } catch (StringIndexOutOfBoundsException e) {
      System.out.print("X");
    }
    try {
      System.out.print(s.substring(3, 1));
    } catch (StringIndexOutOfBoundsException e) {
      System.out.print("Y");
    }
  }
}`,
          steps: [
            {
              do: "s = SEBI, length 4. substring(1, 9): end 9 is past length.",
              why: "Java requires 0 ≤ start ≤ end ≤ length.",
            },
            {
              do: "Java throws StringIndexOutOfBoundsException. First catch prints X.",
              why: "Wild substring bounds are errors, not clipped letters.",
            },
            {
              do: "substring(3, 1): start 3 > end 1. That also throws. Second catch prints Y.",
              why: "Java does not swap the two indexes. i > j is illegal.",
            },
            {
              do: "Python s[1:9] would have clipped to BI. Python s[3:1] would have been empty.",
              why: "Same fences, kinder language. Do not mix the two on the exam.",
            },
            {
              do: "print XY. There is no EBI and no empty string in this Java run.",
              why: "If the question is Java, pick the exception, not the Python clip.",
            },
          ],
          result: "XY",
        },
        {
          title: "Translate Java substring(i, j) into C++ substr",
          prompt: "On \"SEBI\", Java substring(1, 3) is \"EB\". What C++ call matches it? What does C++ substr(1, 3) give?",
          language: "cpp",
          code: `#include <iostream>
#include <string>
int main() {
  std::string s = "SEBI";
  std::cout << s.substr(1, 3 - 1) << " " << s.substr(1, 3);
}`,
          steps: [
            {
              do: "Java/Python second number is an exclusive index. Length of the piece is j − i.",
              why: "substring(1, 3) takes 3−1 = 2 letters, so EB.",
            },
            {
              do: "C++ second number is a count. Matching call is substr(1, 2), which is substr(1, 3-1).",
              why: "Translate: C++ count = Java end − Java start.",
            },
            {
              do: "s.substr(1, 3) takes three letters from E → EBI. That is Java substring(1, 4), not (1, 3).",
              why: "Copying the two numbers across languages is the trap.",
            },
            {
              do: "print EB EBI.",
              why: "First call is the translation. Second call is the wrong copy-paste.",
            },
            {
              do: "Exam recipe: Java/Python [i, j) ↔ C++ substr(i, j−i).",
              why: "Write the formula once, then fill the numbers.",
            },
          ],
          result: "EB EBI",
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
        {
          title: "Empty string: length 0, no valid index",
          prompt: "s = \"\". What is s.length()? What happens for charAt(0)?",
          language: "java",
          code: `String s = "";
System.out.print(s.length());
// s.charAt(0)  → StringIndexOutOfBoundsException
// s.substring(0, 0) is ""  (legal)`,
          steps: [
            {
              do: "Count letters: there are none. length is 0.",
              why: "Length is a count of boxes. Zero boxes is a legal string.",
            },
            {
              do: "Last index would be length − 1 = −1. There is no letter there.",
              why: "The last-index formula assumes n ≥ 1.",
            },
            {
              do: "charAt(0) asks for a box that does not exist → throws.",
              why: "Index 0 is only valid when length is at least 1.",
            },
            {
              do: "substring(0, 0) is the empty string, and that is legal.",
              why: "Equal start and end is an empty piece, not a character read.",
            },
            {
              do: "print 0 for length. charAt(0) is the error path.",
              why: "Empty is a real exam case. Do not invent a space or null.",
            },
          ],
          result: "length 0; charAt(0) throws; substring(0, 0) is empty.",
        },
        {
          title: "C++ s[n] vs at(n) at the end fence",
          prompt: "s = \"AM\", n = s.size(). What about s[n] and s.at(n)?",
          language: "cpp",
          code: `#include <iostream>
#include <string>
int main() {
  std::string s = "AM";
  std::cout << s.size() << " " << (s[s.size()] == '\\0');
  try {
    s.at(s.size());
  } catch (const std::out_of_range&) {
    std::cout << " X";
  }
}`,
          steps: [
            {
              do: "s has A, M. size() is 2. Last valid index is 1.",
              why: "Same 0-based line as Java. Last letter is at n − 1.",
            },
            {
              do: "s.at(2) checks the bound and throws out_of_range. catch prints X.",
              why: "at is the safe reader. Past-the-end is an exception.",
            },
            {
              do: "s[2] is the data() fence. For std::string it is defined as the stored '\\0'. The == test prints 1 (true).",
              why: "Operator [] at size() is a special C++ case. Do not use it to ‘read the last letter’.",
            },
            {
              do: "s[3] would be undefined. Last letter is s[1] or s.at(1), which is M.",
              why: "Index equal to length is not a letter in the exam sense.",
            },
            {
              do: "Output 2 1 X. Prefer at or s[n-1] in answers about the last character.",
              why: "size is a count. The character sits on n−1.",
            },
          ],
          result: "2 1 X  (size 2; s[size] is '\\0'; at(size) throws)",
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
        {
          title: "Java lastIndexOf walks from the right",
          prompt: "What is printed?",
          language: "java",
          code: `String s = "SEBI-SEBI";
System.out.print(s.indexOf("SE") + " " + s.lastIndexOf("SE") + " " + s.lastIndexOf("Z"));`,
          steps: [
            {
              do: "Indexes: 0 S 1 E … 4 - 5 S 6 E 7 B 8 I.",
              why: "Need the number line for both left and right searches.",
            },
            {
              do: "indexOf(\"SE\") takes the first hit from the left → 0.",
              why: "First match from the left is the usual indexOf.",
            },
            {
              do: "lastIndexOf(\"SE\") takes the last hit. The second SE starts at 5.",
              why: "Same needle, other end. Not ‘length minus first index’ as a lucky guess — draw it.",
            },
            {
              do: "lastIndexOf(\"Z\") never matches → −1. Missing is still −1 from the right.",
              why: "Both methods use −1 for not found.",
            },
            {
              do: "print 0 5 -1.",
              why: "Two directions, one missing-rule.",
            },
          ],
          result: "0 5 -1",
        },
        {
          title: "Empty needle sits at the start (and at the end for lastIndexOf)",
          prompt: "What is printed?",
          language: "java",
          code: `String s = "SEBI";
System.out.print(s.indexOf("") + " " + s.lastIndexOf("") + " " + s.indexOf("SEBI"));`,
          steps: [
            {
              do: "The empty string \"\" is a needle of length 0.",
              why: "It can sit between letters, including before the first letter.",
            },
            {
              do: "indexOf(\"\") is 0. The first place an empty needle fits is index 0.",
              why: "Java’s rule: empty needle is found immediately at the start.",
            },
            {
              do: "lastIndexOf(\"\") is 4, which equals length. That is the fence after I.",
              why: "From the right, the last empty slot is the end fence, not index 3.",
            },
            {
              do: "indexOf(\"SEBI\") is 0: the whole word matches at the start.",
              why: "A needle equal to the haystack starts at 0.",
            },
            {
              do: "print 0 4 0. Do not pick −1 for the empty needle.",
              why: "The empty-needle MCQ is ‘0’, not ‘not found’.",
            },
          ],
          result: "0 4 0",
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
        {
          title: "Dot is any character; \\d is only a digit",
          prompt: "Does 9z9 match ^\\d.\\d$ ? Does it match ^\\d\\d\\d$ ?",
          steps: [
            {
              do: "Pattern ^\\d.\\d$ : start, a digit, one any-char, a digit, end. Length must be 3.",
              why: "Read tokens in order. . is not ‘dot the punctuation’ unless escaped.",
            },
            {
              do: "9z9: first 9 is a digit, z is any char, last 9 is a digit. Match.",
              why: "z is allowed by . and forbidden by \\d.",
            },
            {
              do: "^\\d\\d\\d$ wants three digits. z is not a digit. 9z9 fails.",
              why: "One token change (. vs \\d) flips the answer.",
            },
            {
              do: "909 matches both. 9.9 matches the first (the middle . is ‘any char’, which includes a real dot).",
              why: "A real dot in the text is just another character to .",
            },
            {
              do: "To match a real dot only, the pattern uses \\.  Exam: ‘any char’ vs ‘digit’ vs ‘literal dot’.",
              why: "Name the token before you say yes or no.",
            },
          ],
          result: "9z9 matches ^\\d.\\d$ and does not match ^\\d\\d\\d$.",
        },
        {
          title: "^ and $ pin the whole string",
          prompt: "Does re.search(r\"^SE\", \"SEBI\") match? Does re.search(r\"SE$\", \"SEBI\") match?",
          language: "python",
          code: `import re
print(bool(re.search(r"^SE", "SEBI")),
      bool(re.search(r"SE$", "SEBI")),
      bool(re.search(r"BI$", "SEBI")))`,
          steps: [
            {
              do: "^SE means ‘SE at the start’. SEBI starts with SE → True.",
              why: "^ is the start anchor, even inside search.",
            },
            {
              do: "SE$ means ‘SE at the end’. SEBI ends with BI, not SE → False.",
              why: "$ is the end anchor. The letters SE are at the front, not the end.",
            },
            {
              do: "BI$ is BI at the end. SEBI ends with BI → True.",
              why: "Same word, different pin.",
            },
            {
              do: "print True False True.",
              why: "search without ^ or $ could find SE in the middle; here the anchors decide.",
            },
            {
              do: "fullmatch(\"SE\", \"SEBI\") would be False because the whole string is not just SE.",
              why: "^SE is ‘starts with’. Full match is ‘is exactly’.",
            },
          ],
          result: "True False True",
        },
      ],
    },
    {
      heading: "replace / concatenation / immutability (Java String vs StringBuilder)",
      body: "A Java String cannot change its letters. replace, concat, substring, and toUpperCase build a new String. If you ignore the result, the old variable still points at the old letters. s.replace(\"a\",\"x\") without s = leaves s unchanged. s = s + \"x\" rebinds s to a new object.\n\nStringBuilder is a mutable box. append, reverse, and setCharAt write the same object. Two variables that point at one builder see each other’s edits. Building a long string in a loop with + makes many throw-away String objects. A builder appends into one box.\n\n== on String tests the same object. equals tests the same letters. Python strings are immutable too: s.replace returns a new str. Use a list and join if you must build in a loop.",
      howTo: [
        "Ask: String or StringBuilder (or Python str vs list)?",
        "String method → new object. If you do not assign, the old variable is unchanged.",
        "StringBuilder method → same object changes. append returns this, so chaining is one box.",
        "s = s + t rebinds s. That is concatenation with a new String, not an in-place write.",
        "== is identity. equals (Python ==) is letters for content questions.",
      ],
      bullets: [
        "String is immutable. replace/concat must be assigned.",
        "s = s + \"x\" rebinds. StringBuilder.append mutates.",
        "Loop of s = s + piece builds many Strings. A builder is one buffer.",
        "== on Java String is identity. equals is letters.",
      ],
      examples: [
        {
          title: "Discarded replace leaves the String alone",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    String s = "banana";
    s.replace("a", "o");
    String t = s.replace("a", "o");
    System.out.print(s + " " + t);
  }
}`,
          steps: [
            {
              do: "s points at \"banana\".",
              why: "The object’s letters cannot change.",
            },
            {
              do: "s.replace(\"a\", \"o\") builds \"bonono\" and throws it away. s is still \"banana\".",
              why: "Ignoring the return does not write s.",
            },
            {
              do: "t = s.replace(\"a\", \"o\") keeps the new \"bonono\". s is still \"banana\".",
              why: "You must assign if you want the replacement.",
            },
            {
              do: "Every ‘a’ was replaced in the new string, not only the first. replace(CharSequence, CharSequence) replaces all.",
              why: "Read the method: all non-overlapping hits, left to right.",
            },
            {
              do: "print banana bonono.",
              why: "Two arrows, two objects. The old word survived.",
            },
          ],
          result: "banana bonono",
        },
        {
          title: "Concatenation rebinds; concat must be assigned too",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    String s = "SE";
    s.concat("BI");
    s = s + "BI";
    System.out.print(s);
  }
}`,
          steps: [
            {
              do: "s points at \"SE\".",
              why: "Start with the old arrow.",
            },
            {
              do: "s.concat(\"BI\") builds \"SEBI\" and throws it away. s is still \"SE\".",
              why: "concat is a String method. No assign → no change.",
            },
            {
              do: "s = s + \"BI\" builds a new \"SEBI\" and moves the name s.",
              why: "+ with assignment rebinds. That is the usual exam spelling of concat-and-keep.",
            },
            {
              do: "print SEBI.",
              why: "Only the second line kept the glued word.",
            },
            {
              do: "s += \"BI\" is the same rebind as s = s + \"BI\". Still a new String, not a mutated old one.",
              why: "The operator looks in-place. For String it is not.",
            },
          ],
          result: "SEBI",
        },
        {
          title: "StringBuilder append and reverse share one object",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    StringBuilder sb = new StringBuilder("SE");
    StringBuilder tb = sb;
    sb.append("BI");
    tb.reverse();
    System.out.print(sb.toString() + " " + (sb == tb));
  }
}`,
          steps: [
            {
              do: "sb → builder holding SE. tb = sb copies the arrow. One object.",
              why: "tb = sb does not copy the letters.",
            },
            {
              do: "sb.append(\"BI\") mutates to SEBI. tb sees SEBI too.",
              why: "append writes in place and returns this.",
            },
            {
              do: "tb.reverse() mutates the same object to IBES.",
              why: "reverse also writes in place. Both names share it.",
            },
            {
              do: "sb == tb is true (same arrow). toString is IBES. print IBES true.",
              why: "== on two builders is identity.",
            },
            {
              do: "If these had been String, reverse would not exist, and concat would have needed assign.",
              why: "Mutable vs immutable is the whole heading.",
            },
          ],
          result: "IBES true",
        },
        {
          title: "Loop + on String vs one StringBuilder",
          prompt: "What does each version build, and which mutates one box?",
          language: "java",
          code: `String s = "";
for (int i = 0; i < 3; i++) s = s + "ab";
StringBuilder b = new StringBuilder();
for (int i = 0; i < 3; i++) b.append("ab");
System.out.print(s + " " + b.toString());`,
          steps: [
            {
              do: "First loop: s starts \"\". Trip 0 builds \"ab\". Trip 1 builds \"abab\". Trip 2 builds \"ababab\". Each trip throws away the old String.",
              why: "s = s + \"ab\" allocates a new object every time. The old one becomes garbage.",
            },
            {
              do: "Three trips made three String objects (plus the empty start). Only the last is kept in s.",
              why: "The cost grows with the number of pieces. That is the exam reason to avoid + in a long loop.",
            },
            {
              do: "Second loop: one builder. append three times into the same buffer: ab, then abab, then ababab.",
              why: "StringBuilder is mutable. One box, growing letters.",
            },
            {
              do: "Both end with letters ababab. print ababab ababab.",
              why: "Same result, different number of objects.",
            },
            {
              do: "Exam pick: short exam snippets may use +. Long building → StringBuilder (Python: list + join).",
              why: "Immutability makes + in a loop expensive, not wrong.",
            },
          ],
          result: "ababab ababab  (String loop made new objects; builder mutated one)",
        },
        {
          title: "Python str.replace is the same immutability idea",
          prompt: "What is printed?",
          language: "python",
          code: `s = "banana"
s.replace("a", "o")
t = s.replace("a", "o")
print(s, t)
parts = []
for p in ["SE", "BI"]:
    parts.append(p)
print("".join(parts))`,
          steps: [
            {
              do: "s is \"banana\". s.replace(\"a\", \"o\") returns \"bonono\" and nobody stores it. s stays \"banana\".",
              why: "Python str is immutable, like Java String.",
            },
            {
              do: "t = s.replace(...) keeps \"bonono\". print banana bonono.",
              why: "Assign to keep the new string.",
            },
            {
              do: "Building in a loop: append pieces to a list, then \"\".join(parts) → SEBI.",
              why: "A list is mutable. join makes one new str at the end. That is the Python StringBuilder.",
            },
            {
              do: "s += \"x\" in Python rebinds s (new str), it does not edit the old one.",
              why: "The name moves. Other aliases of the old str would not see the extra x.",
            },
            {
              do: "Two lines: banana bonono then SEBI.",
              why: "Same two lessons as Java: assign replace, and join a list to concatenate many pieces.",
            },
          ],
          result: "banana bonono\nSEBI",
        },
      ],
    },
  ],
};
