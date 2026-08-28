import type { TopicNote } from "@/data/notes";

export const notesStrings: TopicNote = {
  topic: "strings",
  title: "String manipulation — worked notes",
  blurb:
    "String MCQs on SEBI Grade A are off-by-one drills plus a little regex and search theory. Java s.substring(i, j) and Python s[i:j] are half-open [i, j): they return the characters at i, i+1, …, j-1. C++ s.substr(pos, count) takes a length, not an end index — the usual trap. indexOf / find return the first index or −1 / npos. Java String is immutable; Python str is immutable; C++ std::string is mutable. Regex character classes decide digits/word/space; search vs match vs fullmatch changes whether the pattern may sit in the middle. replace is non-overlapping left-to-right. reverse is in-place on a builder/list or a new string. KMP is the linear-time pattern search that uses a prefix table (LPS) so the text pointer never backs up; you only need the idea, not a full code dump.",
  blocks: [
    {
      heading: "Java substring(i, j) is [i, j)",
      body: "s.substring(beginIndex, endIndex) copies the half-open range. Length of the result is endIndex - beginIndex. s.substring(i, i) is \"\". s.substring(0, s.length()) is the whole string. A single-arg substring(i) means [i, length). Indices are 0-based char positions (UTF-16 code units in Java; exams use ASCII).\n\nIf beginIndex < 0, endIndex > length, or beginIndex > endIndex, Java throws StringIndexOutOfBoundsException (a RuntimeException). That is unlike Python slices, which clip. Do not pick “empty string” for substring(2, 1).\n\nTrace with a diagram: write the string, put an index before each character and one after the last. substring(1,3) of SEBI is the chars sitting between fence 1 and fence 3.\n\nLength of a successful substring(i, j) is always j−i. If begin > end or an index is wild, Java throws — it does not clip like Python.",
      bullets: [
        "substring(i, j) length = j - i. Never include s.charAt(j).",
        "charAt(j) is the character at j; substring(j, j+1) is the one-char String.",
      ],
      examples: [
        {
          title: "SEBI fences",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    String s = "SEBI";
    System.out.print(s.substring(1, 3) + " " + s.substring(2) + " " + s.substring(1, 1).length());
  }
}`,
          steps: [
            "Diagram: fences 0 S 1 E 2 B 3 I 4. n=4.",
            "substring(1,3): fences 1..3 → E,B → \"EB\". Does not include I at 3.",
            "substring(2): [2,4) → B,I → \"BI\".",
            "substring(1,1): empty, length 0.",
            "print EB BI 0.",
          ],
          result: "EB BI 0",
        },
        {
          title: "begin > end throws",
          prompt: "What happens?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    String s = "SEBI";
    try {
      System.out.print(s.substring(3, 1));
    } catch (StringIndexOutOfBoundsException e) {
      System.out.print("X");
    }
  }
}`,
          steps: [
            "substring(3,1) has begin 3 > end 1.",
            "Java does not swap or clip. It throws StringIndexOutOfBoundsException.",
            "print of the substring is skipped.",
            "catch prints X.",
            "Result X — not IB, not empty.",
          ],
          result: "X",
        },
        {
          title: "substring does not mutate",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    String s = "SEBI";
    s.substring(0, 2);
    System.out.print(s + " " + s.substring(0, 2));
  }
}`,
          steps: [
            "s → \"SEBI\". substring returns a new String.",
            "The discarded substring(0,2) would have been \"SE\". s unchanged.",
            "Second substring(0,2) is \"SE\" and is concatenated in the print.",
            "print SEBI SE.",
            "Immutability: you must assign if you want to keep a slice.",
          ],
          result: "SEBI SE",
        },
        {
          title: "Length identity",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    String s = "GRADE";
    int i = 1, j = 4;
    String t = s.substring(i, j);
    System.out.print(t + t.length() + (j - i));
  }
}`,
          steps: [
            "GRADE fences: 0 G 1 R 2 A 3 D 4 E 5.",
            "substring(1,4) → R,A,D → \"RAD\".",
            "t.length() is 3. j-i is 4-1=3. Always equal when the call succeeds.",
            "print RAD then 3 then 3 with no extra spaces: RAD33.",
            "Output RAD33.",
          ],
          result: "RAD33",
        },
      ],
    },
    {
      heading: "Python s[i:j] and C++ substr(pos, count)",
      body: "Python s[i:j] is the same half-open rule as Java substring, with two extra kindnesses: negative indices, and out-of-range bounds clip instead of throwing. s[1:3] on 'SEBI' is 'EB'. s[-3:-1] needs the conversion table. s[i:j:k] adds a step (see the Python notes for reverse slices).\n\nC++ s.substr(pos) is the suffix from pos. s.substr(pos, count) takes count characters, not an end index. s.substr(1, 3) on \"SEBI\" is \"EBI\" (three chars), not \"EB\". If pos > size(), it throws std::out_of_range. If pos is valid but pos+count overshoots, the result is clipped to the end (no throw).\n\nMemorise one row: Java/Python (i, j exclusive end) versus C++ (pos, length). Mixing them is the most common 1-mark mistake on this topic.\n\nQuick translation: Java/Python s[1:3] / substring(1,3) equals C++ substr(1, 2). C++ substr(1, 3) is three characters, which is Java substring(1, 4).",
      bullets: [
        "C++ count is a length. Java/Python second argument is an exclusive index.",
        "Python clips; Java substring throws; C++ throws only if pos is past the end.",
      ],
      examples: [
        {
          title: "Python half-open with a diagram",
          prompt: "What is printed?",
          language: "python",
          code: `s = "SEBI"
print(s[1:3], s[1:3:1], s[-3:-1], s[3:1])`,
          steps: [
            "Diagram:  0 1 2 3   S E B I    -4 -3 -2 -1.",
            "s[1:3] → indices 1,2 → EB. s[1:3:1] same EB.",
            "s[-3:-1]: -3→1, -1→3, [1,3) → EB.",
            "s[3:1] positive step but start>stop → empty string.",
            "print EB EB EB and a trailing empty (spaces between the four args).",
          ],
          result: "EB EB EB ",
        },
        {
          title: "Python clips a wild stop",
          prompt: "What is printed?",
          language: "python",
          code: `s = "SEBI"
print(s[2:99], s[-99:2], len(s[99:100]))`,
          steps: [
            "s[2:99]: stop clipped to 4 → indices 2,3 → BI.",
            "s[-99:2]: start clipped to 0, stop 2 → SE.",
            "s[99:100] both clipped to empty. len 0. No IndexError.",
            "print BI SE 0.",
            "Contrast: s[99] as a single index would IndexError.",
          ],
          result: "BI SE 0",
        },
        {
          title: "C++ substr uses count",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
#include <string>
int main() {
  std::string s = "SEBI";
  std::cout << s.substr(1, 2) << " " << s.substr(1, 3) << " " << s.substr(2);
}`,
          steps: [
            "s = SEBI, size 4. Indices 0:S 1:E 2:B 3:I.",
            "substr(1,2): pos 1, length 2 → E,B → EB. This matches Java substring(1,3), not substring(1,2).",
            "substr(1,3): length 3 → E,B,I → EBI. Java substring(1,3) would have been EB — trap.",
            "substr(2): rest from 2 → BI.",
            "print EB EBI BI.",
          ],
          result: "EB EBI BI",
        },
        {
          title: "C++ pos past the end throws; oversize count clips",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
#include <string>
int main() {
  std::string s = "SEBI";
  std::cout << s.substr(2, 99);
  try {
    std::cout << s.substr(5, 1);
  } catch (const std::out_of_range&) {
    std::cout << "X";
  }
}`,
          steps: [
            "substr(2,99): pos 2 is valid. count 99 overshoots; clipped to \"BI\". Prints BI.",
            "size is 4, so pos 0..4 is allowed (pos==size yields empty). pos 5 > 4.",
            "substr(5,1) throws std::out_of_range.",
            "catch prints X.",
            "Output BIX.",
          ],
          result: "BIX",
        },
      ],
    },
    {
      heading: "indexOf, find, npos",
      body: "Java s.indexOf(t) is the smallest i such that s.substring(i, i+t.length()).equals(t), or −1 if t is absent. indexOf(t, fromIndex) starts the search at fromIndex. lastIndexOf searches from the right. char versions exist. indexOf(\"\") is 0 on any string (empty pattern at the start).\n\nC++ s.find(t) returns a size_t index or std::string::npos. Never write if (s.find(t) == -1) without care: npos is all-bits-one unsigned, which compares equal to −1 after conversion, but if (s.find(t)) is the wrong test because 0 is a valid index (found at start) and is falsy. Prefer s.find(t) != npos.\n\nPython s.find(t) is Java-like (−1 if missing). s.index(t) raises ValueError instead. str.startswith / endswith are the anchored versions. Trace by sliding a window of length |pattern| from left to right; first full match wins.\n\n0 is a hit at the start. −1 / npos is a miss. In C++ never write if (s.find(t)) — that treats a match at index 0 as false.",
      bullets: [
        "0 is a successful find at the start. −1 / npos is failure. Do not treat 0 as false in C++.",
        "indexOf is not regex; it is exact substring search.",
      ],
      examples: [
        {
          title: "Java indexOf with a second start",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    String s = "BANANA";
    System.out.print(s.indexOf("ANA") + " " + s.indexOf("ANA", 2) + " " + s.indexOf("X"));
  }
}`,
          steps: [
            "B A N A N A  indices 0 1 2 3 4 5. Pattern ANA length 3.",
            "First ANA: i=1 (A N A). indexOf(\"ANA\")=1.",
            "indexOf(\"ANA\", 2): start at 2. Window 2..4 is NAN; 3..5 is ANA. Returns 3.",
            "indexOf(\"X\") no match → −1.",
            "print 1 3 -1.",
          ],
          result: "1 3 -1",
        },
        {
          title: "C++ find versus npos",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
#include <string>
int main() {
  std::string s = "SEBI";
  auto a = s.find("SE");
  auto b = s.find("BI");
  auto c = s.find("X");
  std::cout << a << " " << b << " " << (c == std::string::npos);
}`,
          steps: [
            "find(\"SE\") at 0. a=0 (valid).",
            "find(\"BI\") at 2. b=2.",
            "find(\"X\") fails. c is npos. c == npos is true (printed 1).",
            "If someone tested if (a) they would skip a successful hit at 0 — not done here.",
            "print 0 2 1.",
          ],
          result: "0 2 1",
        },
        {
          title: "Python find vs index",
          prompt: "What is printed?",
          language: "python",
          code: `s = "SEBI"
print(s.find("EB"), s.find("Z"))
try:
    print(s.index("Z"))
except ValueError:
    print("V")`,
          steps: [
            "s.find('EB'): window at 1 matches. Returns 1.",
            "s.find('Z'): −1, no exception.",
            "s.index('Z'): same search but raises ValueError.",
            "except prints V.",
            "Two lines: 1 -1 then V.",
          ],
          result: "1 -1\nV",
        },
        {
          title: "Empty pattern and overlapping thought",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    String s = "AAA";
    System.out.print(s.indexOf("") + " " + s.indexOf("AA") + " " + s.indexOf("AA", 1));
  }
}`,
          steps: [
            "indexOf(\"\") is 0 (empty string occurs at the start).",
            "indexOf(\"AA\") first window 0..1 matches. Returns 0. (There is also a match at 1; first wins.)",
            "indexOf(\"AA\", 1) starts at 1: positions 1..2 are AA. Returns 1.",
            "indexOf does not skip by pattern length; the fromIndex you pass controls the next search.",
            "print 0 0 1.",
          ],
          result: "0 0 1",
        },
      ],
    },
    {
      heading: "Immutability",
      body: "Java String and Python str never change in place. Concatenation, replace, upper, strip, substring all return new objects. A method call whose result you ignore is a no-op on the original variable. C++ std::string and Java StringBuilder / Python list-of-chars are the mutable tools.\n\nIdentity: interned literals may share a reference. Runtime concatenation usually does not. == in Java on String is identity; use equals. Python == on str is content (and small interned strings may also be is). C++ == on std::string is content.\n\nWhen a question prints a String after concat without assignment, the answer is the old value. When it uses StringBuilder.append, the answer is the new contents of the same object.\n\nIdentity versus content: Java == on String is identity (use equals). Python == on str is content. C++ == on std::string is content. StringBuilder == is identity of the builder.",
      bullets: [
        "s.concat / s.replace / s.toUpperCase without assignment → original s.",
        "StringBuilder.append / reverse mutate even if you ignore the return (it returns this).",
      ],
      examples: [
        {
          title: "Java String replace is not in-place",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    String s = "ABAB";
    s.replace("AB", "X");
    String t = s.replace("AB", "X");
    System.out.print(s + " " + t);
  }
}`,
          steps: [
            "s → \"ABAB\". replace scans non-overlapping AB, AB → would produce \"XX\" as a new string.",
            "First replace is discarded. s still ABAB.",
            "t captures \"XX\".",
            "print ABAB XX.",
            "replace here is the String method (literal, not regex). String.replaceAll is regex.",
          ],
          result: "ABAB XX",
        },
        {
          title: "Python str upper discarded",
          prompt: "What is printed?",
          language: "python",
          code: `s = "sebi"
s.upper()
t = s.upper()
print(s, t, s is t)`,
          steps: [
            "s → 'sebi'. s.upper() returns 'SEBI' and is thrown away.",
            "t = s.upper() → t is 'SEBI'. s still 'sebi'.",
            "s is t is False (different objects, different contents anyway).",
            "print sebi SEBI False.",
            "Lists would have been mutable: a[0]='S' would change a.",
          ],
          result: "sebi SEBI False",
        },
        {
          title: "StringBuilder reverse in place",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    StringBuilder sb = new StringBuilder("ab");
    sb.append("c").reverse();
    System.out.print(sb);
  }
}`,
          steps: [
            "sb holds a,b.",
            "append(\"c\") mutates to a,b,c and returns this for chaining.",
            "reverse() mutates to c,b,a.",
            "print uses toString implicitly → cba.",
            "One object throughout.",
          ],
          result: "cba",
        },
        {
          title: "C++ string mutable element write",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
#include <string>
#include <algorithm>
int main() {
  std::string s = "ab";
  s.push_back('c');
  std::reverse(s.begin(), s.end());
  std::cout << s;
}`,
          steps: [
            "s = ab. push_back('c') mutates to abc. std::string is not immutable.",
            "std::reverse swaps in place → cba.",
            "Unlike Java String, there is no extra assignment.",
            "cout cba.",
            "Output cba.",
          ],
          result: "cba",
        },
      ],
    },
    {
      heading: "Regex character classes; search vs match vs fullmatch",
      body: "Character classes: \\d [0-9], \\D non-digit, \\w [A-Za-z0-9_], \\W, \\s whitespace, . any (not newline by default). [A-Z] user class; [^0-9] negation; [a-c] range. Anchors ^ and $ pin the start and end. In Java, String.matches(regex) is a full match of the entire string (like Python fullmatch). Matcher.find() is a search. Looking at Pattern.matcher(s).matches() vs .find() is the same distinction.\n\nPython: re.search scans for a substring; re.match tries only at index 0 (not a full-string match); re.fullmatch must consume everything. Java String.matches is closer to fullmatch than to search. That cross-language mix-up is deliberate exam bait.\n\nGroups: ( … ) capture. Backreferences \\1 in the pattern mean the same text. Replacement: Java replaceAll(\"(a)(b)\", \"$2$1\") swaps using $1; Python re.sub uses \\1 or \\g<1>.\n\nJava String.matches is a full-string match. Python re.match is only “at index 0”, not fullmatch. re.search is a substring scan, like Matcher.find().",
      bullets: [
        "Java s.matches(\"\\\\d+\") true only if the whole string is digits.",
        "Python re.match(r\"\\d+\", \"A1\") is False; search is True.",
      ],
      examples: [
        {
          title: "Java matches is fullmatch",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    String s = "P2";
    System.out.print(s.matches("\\\\d+") + " " + s.matches(".*\\\\d.*") + " " + s.matches("[A-Z]\\\\d"));
  }
}`,
          steps: [
            "s = P2. matches(\\\\d+) means the entire string is one or more digits. P2 is not → false.",
            "matches(.*\\\\d.*) : any, a digit, any — whole string may have a digit anywhere. P2 matches → true.",
            "matches([A-Z]\\\\d): one capital, one digit, whole string. P2 matches → true.",
            "In a Java string literal, \\\\d is the regex \\d.",
            "print false true true.",
          ],
          result: "false true true",
        },
        {
          title: "Python search / match / fullmatch",
          prompt: "What is printed?",
          language: "python",
          code: `import re
s = "P2"
print(bool(re.search(r"\\d+", s)),
      bool(re.match(r"\\d+", s)),
      bool(re.fullmatch(r"\\d+", s)),
      bool(re.match(r"[A-Z]\\d", s)))`,
          steps: [
            "search \\d+: finds 2 in the middle/end → True.",
            "match \\d+: must start at 0; 0 is P → False.",
            "fullmatch \\d+: whole string digits → False.",
            "match [A-Z]\\d at 0: P then 2, consumes all → True (match need not be fullmatch, but here it is full).",
            "print True False False True.",
          ],
          result: "True False False True",
        },
        {
          title: "Class \\\\w versus letters-only",
          prompt: "What is printed?",
          language: "python",
          code: `import re
print(bool(re.fullmatch(r"\\w+", "A_1")),
      bool(re.fullmatch(r"[A-Za-z]+", "A_1")),
      bool(re.fullmatch(r"\\s+", " \\t")))`,
          steps: [
            "\\w is [A-Za-z0-9_]. A_1 is three word chars → fullmatch True.",
            "[A-Za-z]+ cannot eat _ or 1 → fullmatch False.",
            "\\s+ whitespace. space + tab → True. (May depend on exact tab; here the string is space plus tab.)",
            "Underscore is a word char — standing trap versus “letters”.",
            "print True False True.",
          ],
          result: "True False True",
        },
        {
          title: "Java find versus matches on the same regex",
          prompt: "What is printed?",
          language: "java",
          code: `import java.util.regex.*;
class Main {
  public static void main(String[] args) {
    Matcher m = Pattern.compile("\\\\d+").matcher("A12B");
    System.out.print(m.matches() + " " + Pattern.compile("\\\\d+").matcher("A12B").find());
  }
}`,
          steps: [
            "Pattern \\d+ on A12B.",
            "m.matches() requires the entire region to be digits. A12B is not → false.",
            "A fresh matcher .find() looks for a substring of digits. It finds 12 → true.",
            "Reusing m after matches() without reset would be a different (stateful) story; we used a new matcher.",
            "print false true.",
          ],
          result: "false true",
        },
      ],
    },
    {
      heading: "Replace (non-overlapping) and reverse",
      body: "Literal replace walks left to right and does not re-scan replacements. \"AAA\".replace(\"AA\", \"B\") in Java/Python becomes \"BA\" not \"BB\" or \"AB\": the first AA is taken, the leftover A is not paired with the inserted B. Regex replaceAll is the same non-overlapping rule on match spans.\n\nReverse: Java new StringBuilder(s).reverse(); Python s[::-1] or reversed; C++ std::reverse. Palindrome checks compare s with its reverse, or two indices i=0, j=n-1 walking inward — O(n) time, O(1) extra if you do not allocate the reversed copy.\n\nCount replacements or the final length when the replacement string has a different size. Draw the source, strike each taken span, write the substitution, continue after the span.\n\nNon-overlapping means the engine does not rescan inserted text. \"AAA\".replace(\"AA\",\"B\") is BA, not BB. Reverse is a new str in Python, in-place on StringBuilder and std::string.",
      bullets: [
        "Non-overlapping: after a match, continue at the next index after the match, not inside the inserted text.",
        "\"aaa\".replace(\"aa\",\"a\") once → leftover depends on language method (Python str.replace can take a count).",
      ],
      examples: [
        {
          title: "Java non-overlapping AA → B",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    System.out.print("AAA".replace("AA", "B") + " " + "AAAA".replace("AA", "B"));
  }
}`,
          steps: [
            "AAA: take indices 0-1 AA → B, leftover index 2 A. Result BA. Do not then combine B with A.",
            "AAAA: take 0-1 AA → B, then 2-3 AA → B. Result BB.",
            "Not ABA, not BBB.",
            "print BA BB.",
            "String.replace(CharSequence, CharSequence) is literal, not regex.",
          ],
          result: "BA BB",
        },
        {
          title: "Python replace with count",
          prompt: "What is printed?",
          language: "python",
          code: `s = "AAAA"
print(s.replace("AA", "B"), s.replace("AA", "B", 1), s)`,
          steps: [
            "s.replace('AA','B') all non-overlapping: AAAA → BB. s itself unchanged (immutable).",
            "count=1: only the first AA → B + leftover AA → BAA.",
            "Third printed value is original AAAA.",
            "print BB BAA AAAA.",
            "The inserted B is not scanned for a new AA.",
          ],
          result: "BB BAA AAAA",
        },
        {
          title: "Reverse equality palindrome",
          prompt: "What is printed?",
          language: "python",
          code: `def pal(s):
    return s == s[::-1]
print(pal("SEES"), pal("SEBI"), "AB"[::-1])`,
          steps: [
            "s[::-1] step -1: reverse copy. SEES reversed is SEES → True.",
            "SEBI reversed IBES ≠ SEBI → False.",
            "\"AB\"[::-1] is BA.",
            "Two-pointer version: i=0,j=n-1, compare and step inward — same boolean.",
            "print True False BA.",
          ],
          result: "True False BA",
        },
        {
          title: "C++ reverse then compare",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
#include <string>
#include <algorithm>
int main() {
  std::string s = "abba";
  std::string t = s;
  std::reverse(t.begin(), t.end());
  std::cout << (s == t) << s;
}`,
          steps: [
            "s = abba. t is a copy abba.",
            "reverse t in place → abba (palindrome). s untouched.",
            "s == t content equality → true, printed as 1.",
            "Then cout s still abba.",
            "Output 1abba.",
          ],
          result: "1abba",
        },
      ],
    },
    {
      heading: "KMP idea for pattern search (MCQ level)",
      body: "Naive search slides the pattern along the text and, on a mismatch, moves the pattern by one and may re-check characters already matched. Worst time Θ((n−m+1) m). KMP (Knuth–Morris–Pratt) precomputes an LPS / π / prefix table: for each pattern prefix, the longest proper prefix that is also a suffix. On mismatch it shifts the pattern using only that table so the text index never decreases.\n\nTime Θ(n + m): one linear pass to build LPS on the pattern of length m, one linear pass on the text of length n. Extra space Θ(m) for the table. You will not be asked to write the full algorithm; you may be asked which algorithm is linear, what LPS(i) means, or how far to shift after a partial match.\n\nExample intuition: text AAAA…, pattern AAAX. After matching AAA and failing X, LPS of “AAA” is 2 (the suffix AA is also a prefix), so you do not restart at the next A from scratch; you already know two A’s still match. Rabin–Karp (rolling hash) and Boyer–Moore (bad-character / good-suffix) are the other named scanners; KMP is the one with the prefix table.\n\nMCQ pick: linear pattern search with a prefix table → KMP, time O(n+m), extra O(m). Naive worst case O(nm). You will not have to implement the full automaton.",
      bullets: [
        "LPS[i] = longest proper prefix of pat[0..i] that is also a suffix of it.",
        "KMP: O(n+m), no backup on the text pointer. Naive: O(nm) worst case.",
      ],
      examples: [
        {
          title: "Naive window count on a tiny text",
          prompt: "How many character comparisons does a naive scan make (every window fully compared until mismatch or success)? Print comparisons and the found index.",
          language: "python",
          code: `def naive(t, p):
    n, m, cmp, found = len(t), len(p), 0, -1
    for i in range(n - m + 1):
        ok = True
        for j in range(m):
            cmp += 1
            if t[i + j] != p[j]:
                ok = False
                break
        if ok:
            found = i
            break
    return cmp, found
print(naive("ABABABC", "ABC"))`,
          steps: [
            "t=ABABABC n=7, p=ABC m=3. Windows i=0..4.",
            "i=0: A=A, B=B, A≠C. cmp=3. Table i=0 cmp=3.",
            "i=1: B≠A. cmp=4. i=2: A=A, B=B, A≠C. cmp=7. i=3: B≠A. cmp=8.",
            "i=4: A=A, B=B, C=C. cmp=11. found=4. Stop.",
            "print (11, 4).",
          ],
          result: "(11, 4)",
        },
        {
          title: "LPS / prefix table for AABA",
          prompt: "Compute LPS for pattern AABA. Print the four entries.",
          language: "python",
          code: `def lps(p):
    m = len(p)
    pi = [0] * m
    length = 0
    i = 1
    while i < m:
        if p[i] == p[length]:
            length += 1
            pi[i] = length
            i += 1
        elif length:
            length = pi[length - 1]
        else:
            pi[i] = 0
            i += 1
    return pi
print(lps("AABA"))`,
          steps: [
            "p = A A B A  indices 0 1 2 3. pi[0] always 0 (no proper prefix of a 1-char string).",
            "i=1, A==A: length=1, pi[1]=1. Table: 0,1,_,_.",
            "i=2, B vs p[1]=A: mismatch, length=pi[0]=0; B vs p[0]=A mismatch; pi[2]=0; i=3.",
            "i=3, A vs p[0]=A: length=1, pi[3]=1.",
            "LPS = [0, 1, 0, 1]. Proper prefix-suffix of whole AABA is just A (not AA, because AA is not a suffix).",
          ],
          result: "[0, 1, 0, 1]",
        },
        {
          title: "What the shift uses",
          prompt: "After matching the first three chars of pattern ABABC against text …ABAB… and failing the fourth, how far does KMP conceptually skip? Print lps[2] (last matched index 2).",
          language: "python",
          code: `p = "ABABC"
# LPS of ABABC is [0,0,1,2,0]
lps = [0, 0, 1, 2, 0]
matched = 3
print(lps[matched - 1])`,
          steps: [
            "Pattern A B A B C. Suppose text aligned so the first three matched: ABA, next text char ≠ C.",
            "matched=3, last matched index=2. LPS[2] for prefix ABA is 1 (the trailing A is a prefix A).",
            "KMP sets the next pattern index to 1, not 0: the current text char is compared with pattern[1], without moving the text pointer backwards.",
            "Naive would slide by 1 and re-read characters. That is the exam distinction.",
            "print 1.",
          ],
          result: "1",
        },
        {
          title: "Complexity identification snippet",
          prompt: "Which printed label matches KMP’s time on text n and pattern m?",
          language: "java",
          code: `class Main {
  static String kmp(int n, int m) {
    return "O(" + (n + m) + ") linear in n+m";
  }
  public static void main(String[] args) {
    System.out.print(kmp(10, 3).startsWith("O(13)"));
  }
}`,
          steps: [
            "KMP is Θ(n+m), here n=10 m=3, n+m=13.",
            "The helper builds the string O(13) linear in n+m.",
            "startsWith(\"O(13)\") is true.",
            "Naive worst case is Θ(n m) = Θ(30) here, not what we print.",
            "print true. (MCQ form: pick O(n+m), not O(nm), not O(n log m).)",
          ],
          result: "true",
        },
      ],
    },
  ],
};
