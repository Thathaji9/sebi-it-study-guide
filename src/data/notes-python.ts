import type { TopicNote } from "@/data/notes";

export const notesPython: TopicNote = {
  topic: "python",
  title: "Python — techniques (beginner)",
  blurb:
    "Draw a number line for every slice. b = a on a list is two names for one list. A default list in a def is made once. File mode w wipes; r needs the file; a writes at the end. search looks anywhere; match only at the start; fullmatch needs the whole string.",
  blocks: [
    {
      heading: "Slicing [start:stop) on a number line",
      body: "s[start:stop] takes indexes start, start+1, …, stop-1. The stop index is a fence. You never take the letter sitting at stop. This is the same half-open rule as range(start, stop).\n\nWrite the letters. Put 0, 1, 2, … above them. Put −n … −1 below. Index −1 is the last letter. Convert a negative once: −k is n−k. Then use [start, stop). Out-of-range slice bounds clip. A single s[i] off the end is IndexError. An empty slice is legal.",
      howTo: [
        "Write the letters on one row. Write 0, 1, 2, … above. Write −n … −1 below.",
        "Circle start. Draw a fence at stop. Take every index i with start ≤ i < stop.",
        "If an index is negative, rewrite it as n + index first.",
        "If start ≥ stop and step is +1, the result is empty. That is not an error.",
      ],
      bullets: [
        "Length of s[i:j] is j − i when 0 ≤ i ≤ j ≤ n.",
        "s[i] is one element. s[i:i+1] is a one-element sequence.",
        "s[1:1] and s[5:2] (positive step) are empty.",
      ],
      examples: [
        {
          title: "Half-open slice on SEBI",
          prompt: "What is printed?",
          language: "python",
          code: `s = "SEBI"
print(s[1:3], s[0:4], s[1:1], s[2:])`,
          steps: [
            {
              do: "Number line:  0 1 2 3   letters S E B I   negatives −4 −3 −2 −1. n=4.",
              why: "The stop fence sits after a letter. You never take the letter at stop.",
            },
            {
              do: "s[1:3]: indexes 1 and 2 (not 3) → E,B → 'EB'.",
              why: "[start, stop) is half-open. 3 is the fence.",
            },
            {
              do: "s[0:4]: indexes 0,1,2,3 → 'SEBI'. Stop 4 equals n, so it is the end, not an error.",
              why: "A slice may use stop = n. That fence is just past the last letter.",
            },
            {
              do: "s[1:1] is empty. s[2:] uses stop = 4 → 'BI'. print EB SEBI  BI (the empty string still takes a space).",
              why: "print separates arguments with a space even when one argument is ''.",
            },
          ],
          result: "EB SEBI  BI",
        },
        {
          title: "Negatives on the same number line",
          prompt: "What is printed?",
          language: "python",
          code: `s = "GRADE"
print(s[-4:-1], s[-1], s[-5], s[-4:4])`,
          steps: [
            {
              do: "Number line:  0 1 2 3 4   G R A D E    −5 −4 −3 −2 −1. n=5.",
              why: "Convert each negative once, then use the half-open rule.",
            },
            {
              do: "−4 → 1 (R). −1 → 4 (E). −5 → 0 (G).",
              why: "Index −k is n−k.",
            },
            {
              do: "s[-4:-1]: start 1, stop 4, take 1,2,3 → RAD. The fence −1 leaves E out.",
              why: "Stop is exclusive even when it is written as a negative.",
            },
            {
              do: "s[-1] is the character E (not a slice). s[-5] is G. s[-4:4] is RAD. print RAD E G RAD.",
              why: "s[i] is one character. s[i:j] is a string of characters.",
            },
          ],
          result: "RAD E G RAD",
        },
        {
          title: "Step, reverse, and clipping",
          prompt: "What is printed?",
          language: "python",
          code: `a = [0, 1, 2, 3, 4, 5]
print(a[1:5:2], a[::-1], a[4:1:-1])
s = "IT"
print(s[0:99], s[-99:1])`,
          steps: [
            {
              do: "List line: index 0 1 2 3 4 5  values 0 1 2 3 4 5.",
              why: "The same [start, stop) rule holds with a step.",
            },
            {
              do: "a[1:5:2] takes 1, then 3 (5 is the fence) → [1, 3]. a[::-1] is [5, 4, 3, 2, 1, 0]. a[4:1:-1] takes 4,3,2 (not 1) → [4, 3, 2].",
              why: "With a negative step, stop is still a fence you do not take.",
            },
            {
              do: "s='IT', n=2. s[0:99] clips stop to 2 → 'IT'. s[-99:1] clips start to 0 → 'I'.",
              why: "Slice bounds clip. They do not raise IndexError.",
            },
            {
              do: "Two print lines: [1, 3] [5, 4, 3, 2, 1, 0] [4, 3, 2] then IT I.",
              why: "s[99] as a single index would be IndexError. A slice is kinder.",
            },
          ],
          result: "[1, 3] [5, 4, 3, 2, 1, 0] [4, 3, 2]\nIT I",
        },
      ],
    },
    {
      heading: "Alias vs copy",
      body: "b = a on a list copies the arrow, not the cells. Two names, one list. b.append and b[0]= change a as well. b = a[:] or b = list(a) makes a new outer list. Nested lists inside are still shared (shallow copy).\n\n+= on a list extends in place. a = a + [x] builds a new list and moves only the name a. is tests the same object. == tests the same letters/numbers inside.",
      howTo: [
        "Circle the statement: does it move a name (=, +) or change the object (append, +=, a[i]=)?",
        "If b = a, draw one box and two arrows.",
        "If b = a[:], draw two boxes with copied values.",
        "After a mutation, ask which arrows still point at that box.",
      ],
      bullets: [
        "+= on a list is extend (same object). + builds a new list.",
        "After b=a, a is b is True. After b=a[:], a is b is False.",
        "A shallow copy shares nested lists.",
      ],
      examples: [
        {
          title: "Alias: append is seen by both names",
          prompt: "What is printed?",
          language: "python",
          code: `a = [1, 2]
b = a
b.append(3)
print(a, b, a is b)`,
          steps: [
            {
              do: "a → list box L=[1, 2].",
              why: "A list value is an object. The name holds an arrow.",
            },
            {
              do: "b = a. b → L. Still one box.",
              why: "Assignment copies the arrow, not the cells.",
            },
            {
              do: "b.append(3) writes L to [1, 2, 3]. a sees it. a is b is True.",
              why: "append mutates the object both names share.",
            },
            {
              do: "print [1, 2, 3] [1, 2, 3] True.",
              why: "Two names, one list.",
            },
          ],
          result: "[1, 2, 3] [1, 2, 3] True",
        },
        {
          title: "Slice copy: append is not shared",
          prompt: "What is printed?",
          language: "python",
          code: `a = [1, 2]
b = a[:]
b.append(3)
print(a, b, a is b, a == b)`,
          steps: [
            {
              do: "a → L1=[1, 2]. a[:] builds L2=[1, 2]. b → L2.",
              why: "A slice of a list allocates a new outer list.",
            },
            {
              do: "b.append(3) writes only L2 → [1, 2, 3]. L1 stays [1, 2].",
              why: "The copy is a different object, so append does not touch a.",
            },
            {
              do: "a is b is False. a == b is False (contents differ).",
              why: "is is identity. == is contents.",
            },
            {
              do: "print [1, 2] [1, 2, 3] False False.",
              why: "Copy first, then mutate, and the original stays.",
            },
          ],
          result: "[1, 2] [1, 2, 3] False False",
        },
        {
          title: "+= mutates; + rebinds",
          prompt: "What is printed?",
          language: "python",
          code: `a = [1]
b = a
c = a
a += [2]
c = c + [3]
print(a, b, c)`,
          steps: [
            {
              do: "After the three assignments, a, b, and c all → L=[1].",
              why: "Each = copies the same arrow.",
            },
            {
              do: "a += [2] extends L in place. L is [1, 2]. b still → L, so b is [1, 2].",
              why: "List += is mutate, not rebind. Aliases see it.",
            },
            {
              do: "c = c + [3] builds a new list [1, 2, 3] and moves only c. L stays [1, 2].",
              why: "+ always allocates. Only the name on the left of = moves.",
            },
            {
              do: "print [1, 2] [1, 2] [1, 2, 3].",
              why: "a and b still share L. c points at the new list.",
            },
          ],
          result: "[1, 2] [1, 2] [1, 2, 3]",
        },
      ],
    },
    {
      heading: "Mutable default arguments",
      body: "def f(x, acc=[]): makes one list when Python reads the def, not on every call. Every call that omits acc gets that same list. That is why f(1) then f(2) prints [1, 2] [1, 2], not [1] [2].\n\nThe safe pattern is acc=None, then if acc is None: acc = [] inside the function. A new list is born on each call. Immutable defaults (None, 0, \"\") do not have this bug, because you do not append into them.",
      howTo: [
        "Find a default that is a list, dict, or set. Circle it. That object is born once.",
        "For each call that omits the argument, reuse that same object.",
        "Dry-run appends onto one box across calls.",
        "If the default is None and the body does acc = [], draw a fresh box each call.",
      ],
      bullets: [
        "Never write def f(a, bucket=[]) in real code.",
        "print(f(1), f(2)) evaluates f(1) first, then f(2), then prints both returns.",
        "A tuple cannot do t[0]=1, but t[0].append(1) is allowed if t[0] is a list.",
      ],
      examples: [
        {
          title: "The shared default list",
          prompt: "What is printed?",
          language: "python",
          code: `def f(x, acc=[]):
    acc.append(x)
    return acc
print(f(1), f(2))`,
          steps: [
            {
              do: "At def time one list L=[] is stored as the default for acc.",
              why: "Default objects are built when the function is defined, not when it is called.",
            },
            {
              do: "f(1): acc is L, append 1, L=[1], return L.",
              why: "Omitting acc means ‘use the stored default’.",
            },
            {
              do: "f(2): acc omitted, same L. append 2, L=[1, 2], return L.",
              why: "The second call does not get a new [].",
            },
            {
              do: "print shows both returns. Both arrows still point at L, now [1, 2]. Output [1, 2] [1, 2].",
              why: "print evaluates left to right, then prints the two results.",
            },
          ],
          result: "[1, 2] [1, 2]",
        },
        {
          title: "None sentinel: a fresh list each call",
          prompt: "What is printed?",
          language: "python",
          code: `def g(x, acc=None):
    if acc is None:
        acc = []
    acc.append(x)
    return acc
print(g(1), g(2))`,
          steps: [
            {
              do: "Default acc is None. None is not a list.",
              why: "The shared default is an immutable sentinel. We do not append into None.",
            },
            {
              do: "g(1): acc is None, so acc = [] makes a new list. append 1. Return [1].",
              why: "The new [] lives only in this call.",
            },
            {
              do: "g(2): acc is None again, another new []. append 2. Return [2].",
              why: "Each omitted call builds its own list.",
            },
            {
              do: "print [1] [2].",
              why: "Two different lists, two different returns.",
            },
          ],
          result: "[1] [2]",
        },
        {
          title: "Pass your own list — the default is not used",
          prompt: "What is printed?",
          language: "python",
          code: `def f(x, acc=[]):
    acc.append(x)
    return acc
mine = []
print(f(1, mine), f(2), mine)`,
          steps: [
            {
              do: "mine = [] is a separate box M=[]. The default L=[] still exists.",
              why: "The default is used only when the caller omits acc.",
            },
            {
              do: "f(1, mine): acc is M, append 1, M=[1]. Return M.",
              why: "An explicit argument skips the default.",
            },
            {
              do: "f(2): acc omitted, so acc is L. append 2, L=[2]. Return L.",
              why: "The default list was never given the 1. It only has 2.",
            },
            {
              do: "print [1] [2] [1]. mine is still M.",
              why: "Three arrows: M returned, L returned, and mine still M.",
            },
          ],
          result: "[1] [2] [1]",
        },
      ],
    },
    {
      heading: "File modes r / r+ / w / w+ / a",
      body: "Mode picks three things: must the file already exist, do we wipe it, and where do writes go. r reads, file must exist, no wipe, pointer at 0. r+ reads and writes, must exist, no wipe, pointer at 0; writes overlay from the pointer. w writes, creates if missing, wipes to empty. w+ is w plus read. a appends, creates if missing, writes at the end. a+ is append plus read.\n\nStart with HELLO. w then write BYE leaves BYE. r+ then write BYE leaves BYELO. a then write BYE leaves HELLOBYE.",
      howTo: [
        "Does the question need the old bytes? If yes, do not pick w / w+ (they wipe).",
        "Must the path already exist? If yes, r / r+. If missing, those raise FileNotFoundError.",
        "Should new text go at the end? Pick a / a+.",
        "Dry-run from the starting letters. Overlay from index 0 for r+, replace all for w, glue at the end for a.",
      ],
      bullets: [
        "w / w+ truncate. r / r+ require an existing file. a / a+ write at EOF.",
        "r+ does not wipe. That is the usual trap against w+.",
        "Text mode is the exam default. b means binary.",
      ],
      examples: [
        {
          title: "w wipes HELLO",
          prompt: "File starts as HELLO. After this program, what is printed?",
          language: "python",
          code: `open("f.txt", "w").write("BYE")
print(open("f.txt").read())`,
          steps: [
            {
              do: "Start file: H E L L O (5 letters).",
              why: "Write down the old bytes before open.",
            },
            {
              do: "open w: wipe to empty, pointer 0. Create the file if it was missing.",
              why: "w means ‘replace the whole file’.",
            },
            {
              do: "write BYE stores 3 letters. File is BYE, not HELLOBYE and not BYELO.",
              why: "After a wipe there is nothing left to overlay.",
            },
            {
              do: "read prints BYE.",
              why: "Default open is r, which reads from the start.",
            },
          ],
          result: "BYE",
        },
        {
          title: "r+ overlays from the start, no wipe",
          prompt: "File starts as HELLO. What is printed?",
          language: "python",
          code: `f = open("f.txt", "r+")
f.write("BYE")
f.seek(0)
print(f.read())`,
          steps: [
            {
              do: "r+: file must exist, not wiped. Contents HELLO, pointer 0.",
              why: "r+ keeps the old bytes and lets you write on top of them.",
            },
            {
              do: "write BYE overwrites the first 3 letters. File is B Y E L O.",
              why: "A write starts at the pointer. It does not shorten the file.",
            },
            {
              do: "seek(0) moves the pointer back to the start.",
              why: "After a write the pointer sits after BYE. You must seek to read from 0.",
            },
            {
              do: "read → BYELO. print BYELO.",
              why: "The last two letters of HELLO survived.",
            },
          ],
          result: "BYELO",
        },
        {
          title: "a appends; r fails if missing",
          prompt: "First, file starts as HELLO and we append. Second, g.txt does not exist and we open r. What is printed?",
          language: "python",
          code: `f = open("f.txt", "a")
f.write("BYE")
f.close()
print(open("f.txt").read())
try:
    open("g.txt", "r")
    print("ok")
except FileNotFoundError:
    print("N")`,
          steps: [
            {
              do: "Mode a: HELLO is kept. write BYE adds at the end → HELLOBYE.",
              why: "Append writes always go to EOF.",
            },
            {
              do: "First print is HELLOBYE.",
              why: "close flushes. A later open r reads the whole file.",
            },
            {
              do: "open g.txt in r: the file is missing. FileNotFoundError. print ok is skipped.",
              why: "r and r+ require an existing path.",
            },
            {
              do: "except prints N. Two lines: HELLOBYE then N.",
              why: "w or a would have created g.txt instead of raising.",
            },
          ],
          result: "HELLOBYE\nN",
        },
      ],
    },
    {
      heading: "Regex: search, match, fullmatch, groups",
      body: "\\d is a digit. \\w is a letter, digit, or underscore. . is any character except newline. ^ is start. $ is end. + means one or more.\n\nre.search looks for the pattern anywhere. re.match tries only at index 0 (it does not need to eat the whole string). re.fullmatch must eat the whole string. Parentheses capture a group. \\1 in the pattern means ‘the same text group 1 already matched’. findall returns every non-overlapping match.",
      howTo: [
        "Write the string and put a cursor at 0.",
        "Ask: must it start at 0 (match)? Must it fill the whole string (fullmatch)? Or may it sit in the middle (search)?",
        "Walk the class: \\d vs \\w vs [A-Z].",
        "If there are groups, write group(0) = whole match and group(1) = first pair of ().",
      ],
      bullets: [
        "search vs match vs fullmatch is the standing MCQ.",
        "findall with one pair of parentheses returns the group, not group 0.",
        "Java String.matches is a full match. Python re.match is only ‘at index 0’.",
      ],
      examples: [
        {
          title: "findall \\d+ is non-overlapping",
          prompt: "What is printed?",
          language: "python",
          code: `import re
print(re.findall(r"\\d+", "a12b3cd45"))
print(re.findall(r"\\d", "a12b3"))`,
          steps: [
            {
              do: "Pattern \\d+ means one or more digits. Scan a12b3cd45 from the left.",
              why: "findall walks left to right and does not overlap matches.",
            },
            {
              do: "Skip a. At 1 the + takes 12. Skip b. Take 3. Skip cd. Take 45. Result ['12', '3', '45'].",
              why: "Greedy + eats the whole run of digits, then the cursor continues after that run.",
            },
            {
              do: "Pattern \\d (no +) on a12b3 takes each digit: ['1', '2', '3'].",
              why: "Without + each match is one digit.",
            },
            {
              do: "Two printed lists.",
              why: "Each print is one findall call.",
            },
          ],
          result: "['12', '3', '45']\n['1', '2', '3']",
        },
        {
          title: "search vs match vs fullmatch",
          prompt: "What is printed?",
          language: "python",
          code: `import re
s = "SEBI2024"
print(bool(re.search(r"\\d+", s)),
      bool(re.match(r"\\d+", s)),
      bool(re.fullmatch(r"\\d+", s)),
      bool(re.match(r"[A-Z]+\\d+", s)))`,
          steps: [
            {
              do: "s = SEBI2024. search \\d+ finds 2024 in the middle → True.",
              why: "search may start at any index.",
            },
            {
              do: "match \\d+ must start at index 0. Index 0 is S, not a digit → False.",
              why: "match is anchored at the start, not a full-string test.",
            },
            {
              do: "fullmatch \\d+ needs the whole string to be digits → False.",
              why: "Letters at the front spoil a full digit match.",
            },
            {
              do: "match [A-Z]+\\d+ at 0: SEBI then 2024 → True. print True False False True.",
              why: "match can eat the whole string, but it does not have to. Here it does.",
            },
          ],
          result: "True False False True",
        },
        {
          title: "Group and backreference \\1",
          prompt: "What is printed?",
          language: "python",
          code: `import re
m = re.search(r"(\\w+)-\\1", "ab-ab-cd")
print(m.group(0), m.group(1))
print(bool(re.search(r"(\\w+)-\\1", "ab-cd")))`,
          steps: [
            {
              do: "Pattern: a word, a hyphen, then the same word again (\\1).",
              why: "\\1 means ‘copy group 1’, not ‘any second word’.",
            },
            {
              do: "In ab-ab-cd the engine finds ab-ab. group(0)='ab-ab', group(1)='ab'.",
              why: "group(0) is the whole match. group(1) is the first pair of parentheses.",
            },
            {
              do: "ab-cd: group 1 captures ab, then -cd does not repeat ab. search fails → False.",
              why: "A backreference is exact text, not the same shape.",
            },
            {
              do: "print ab-ab ab then False.",
              why: "Two prints: the hit, then the miss.",
            },
          ],
          result: "ab-ab ab\nFalse",
        },
      ],
    },
  ],
};
