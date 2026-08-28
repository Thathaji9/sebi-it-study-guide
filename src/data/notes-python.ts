import type { TopicNote } from "@/data/notes";

export const notesPython: TopicNote = {
  topic: "python",
  title: "Python — worked notes",
  blurb:
    "SEBI Grade A Python items are dry-runs of slices, aliases, defaults, dict/set/tuple, files, regex, pandas reshape, and list comprehensions. Slicing is half-open: s[start:stop:step] yields indices i where start ≤ i < stop (with negatives counted from the end). Draw the character/element row and the 0..n-1 / −n..−1 index rows before you pick an option. b = a on a list aliases; b = a[:] or list(a) copies. Mutable default arguments are created once, at def time. dict keys are unique and hashable; set is unordered unique; tuple is immutable. File modes: r/r+ need an existing file and do not truncate; w/w+ truncate or create; a/a+ always write at the end. re.search finds a substring, match anchors at the start, fullmatch the whole string. pandas melt/stack go wide→long, pivot long→wide, merge is a join, groupby is SQL GROUP BY. Trace small tables, not library internals.",
  blocks: [
    {
      heading: "Slicing: half-open, negatives, step",
      body: "s[start:stop] takes indices start, start+1, …, stop-1. The stop index is never included (half-open, same as Java substring and range). Omitting start means 0 (or n-1 when step is negative); omitting stop means the end in the step’s direction. s[i] is a single element; s[i:i+1] is a one-element sequence.\n\nNegative indices count from the end: -1 is the last element, -n is the first. Convert once: index -k is n-k. Then apply the half-open rule. s[-4:-1] on a length-4 string is indices 0,1,2 — not including the last character.\n\nstep skips: s[::2] even indices; s[::-1] reverses. With a negative step the slice still uses the half-open idea in that direction: start is the first yielded index, stop is the exclusive bound you walk toward. If the direction cannot move from start toward stop, the slice is empty — not an IndexError. Out-of-range slice bounds are clipped; out-of-range single s[i] is IndexError.\n\nAlways draw the fence diagram before picking an option. Convert every negative index to n+i once, then apply [start, stop). Empty is a legal result; IndexError is only for a single-index read off the end.",
      bullets: [
        "Always sketch: positions 0..n-1 above the chars, -n..-1 below.",
        "range(2, 8, 2) → 2,4,6 — stop 8 excluded, same rule as s[2:8:2].",
        "s[1:1] and s[5:2] (positive step) are empty.",
      ],
      examples: [
        {
          title: "Half-open slice on a word",
          prompt: "What is printed?",
          language: "python",
          code: `s = "SEBI"
print(s[1:3], s[0:4], s[1:1], s[2:])`,
          steps: [
            "Index diagram: pos 0 1 2 3  | chars S E B I | neg -4 -3 -2 -1. Length n=4.",
            "s[1:3]: i in [1,3) → 1,2 → E,B → 'EB'.",
            "s[0:4]: i in [0,4) → whole string 'SEBI'. s[0:4] is not an error even though 4 is n.",
            "s[1:1]: i in [1,1) empty → ''. s[2:]: stop defaults to 4 → i=2,3 → 'BI'.",
            "print with spaces between args: EB SEBI  BI (empty string still consumes a space).",
          ],
          result: "EB SEBI  BI",
        },
        {
          title: "Negative indices",
          prompt: "What is printed?",
          language: "python",
          code: `s = "GRADE"
print(s[-4:-1], s[-1], s[-5], s[-4:4])`,
          steps: [
            "Diagram:  0 1 2 3 4   G R A D E    -5 -4 -3 -2 -1. n=5.",
            "-4 → 5-4=1 ('R'). -1 → 4 ('E'). -5 → 0 ('G').",
            "s[-4:-1]: start 1, stop 4 (because -1 → 4), half-open [1,4) → R,A,D → 'RAD'. Stop -1 excludes E.",
            "s[-1] is the character 'E' (not a one-char slice). s[-5] is 'G'.",
            "s[-4:4]: start 1, stop 4 → 'RAD'. print RAD E G RAD.",
          ],
          result: "RAD E G RAD",
        },
        {
          title: "Step and reverse",
          prompt: "What is printed?",
          language: "python",
          code: `a = [0, 1, 2, 3, 4, 5]
print(a[1:5:2], a[::2], a[::-1], a[4:1:-1])`,
          steps: [
            "Diagram: idx 0 1 2 3 4 5  values 0 1 2 3 4 5.",
            "a[1:5:2]: start 1, stop 5, step 2 → indices 1,3 → [1, 3]. 5 excluded so 5 is not a candidate.",
            "a[::2]: 0,2,4 → [0, 2, 4]. a[::-1]: 5,4,3,2,1,0 → [5, 4, 3, 2, 1, 0].",
            "a[4:1:-1]: start 4, stop 1 exclusive, step -1 → indices 4,3,2 (not 1) → [4, 3, 2].",
            "print four lists with spaces.",
          ],
          result: "[1, 3] [0, 2, 4] [5, 4, 3, 2, 1, 0] [4, 3, 2]",
        },
        {
          title: "Clipping versus IndexError",
          prompt: "What is printed?",
          language: "python",
          code: `s = "IT"
print(s[0:99], s[-99:1])
try:
    print(s[99])
except IndexError:
    print("E")`,
          steps: [
            "n=2. Diagram: 0 1  I T  -2 -1.",
            "s[0:99]: stop clipped to 2 → 'IT'. Slices do not IndexError on wild bounds.",
            "s[-99:1]: start clipped to 0, stop 1 → [0,1) → 'I'.",
            "s[99] is element access, not a slice. Index 99 ≥ n → IndexError.",
            "except prints E. Three print lines: IT / I / E.",
          ],
          result: "IT\nI\nE",
        },
      ],
    },
    {
      heading: "List alias versus copy",
      body: "b = a does not copy a list. It copies the reference: two names, one object. b.append, b[0]=, b += [x] mutate that object, so a sees it. b = a[:] or b = list(a) or b = a.copy() is a shallow copy: a new list with the same element references. Nested lists are still shared; b[0].append on a nested list mutates a[0] too.\n\nSlice assignment a[1:3] = [9, 9, 9] can change length. a[i] = x replaces one slot. The idiom a = a + [x] allocates a new list and rebinds a; if another name still pointed at the old list it will not see x.\n\nis tests identity; == tests element-wise equality. After b=a, a is b is True. After b=a[:], a == b is True but a is b is False.\n\nOn every list question, circle whether the statement rebinds the name (=, +) or mutates the object (append, +=, slot write, slice assignment). Aliases see mutations; they do not see later rebinds of the other name.",
      bullets: [
        "+= on a list mutates in place (like extend). + builds a new list.",
        "Nested copy: copy.deepcopy if the exam ever distinguishes it; usually they use flat lists.",
      ],
      examples: [
        {
          title: "Alias append",
          prompt: "What is printed?",
          language: "python",
          code: `a = [1, 2]
b = a
b.append(3)
print(a, b, a is b)`,
          steps: [
            "a → list object L=[1,2].",
            "b = a: b → L. One object.",
            "b.append(3) mutates L to [1,2,3]. a and b both see it.",
            "a is b is True.",
            "print [1, 2, 3] [1, 2, 3] True.",
          ],
          result: "[1, 2, 3] [1, 2, 3] True",
        },
        {
          title: "Slice copy then mutate",
          prompt: "What is printed?",
          language: "python",
          code: `a = [1, 2]
b = a[:]
b.append(3)
print(a, b, a is b, a == b)`,
          steps: [
            "a → L1=[1,2]. a[:] allocates L2=[1,2] with copied slots. b → L2.",
            "b.append(3) mutates only L2 → [1,2,3]. L1 stays [1,2].",
            "a is b is False (two lists).",
            "a == b is False because lengths/contents differ.",
            "print [1, 2] [1, 2, 3] False False.",
          ],
          result: "[1, 2] [1, 2, 3] False False",
        },
        {
          title: "Shallow copy shares nested lists",
          prompt: "What is printed?",
          language: "python",
          code: `a = [[1], [2]]
b = a[:]
b[0].append(9)
b.append([3])
print(a, b)`,
          steps: [
            "a → [inner0=[1], inner1=[2]]. b = a[:] is a new outer list still holding inner0 and inner1.",
            "b[0].append(9) mutates inner0 → [1,9]. a[0] is inner0, so a becomes [[1,9],[2]].",
            "b.append([3]) mutates only the outer list b. a’s outer list does not gain [3].",
            "a is [[1, 9], [2]]. b is [[1, 9], [2], [3]].",
            "print those two lists.",
          ],
          result: "[[1, 9], [2]] [[1, 9], [2], [3]]",
        },
        {
          title: "+= versus + rebind",
          prompt: "What is printed?",
          language: "python",
          code: `a = [1]
b = a
c = a
a += [2]
c = c + [3]
print(a, b, c)`,
          steps: [
            "a,b,c all → L=[1] after the three assignments (c=a aliases too).",
            "a += [2] is a.extend([2]) in place. L becomes [1,2]. b still → L so b is [1,2]. c still → L at this moment, also [1,2].",
            "c = c + [3] allocates a new list [1,2,3] and rebinds only c. L unchanged.",
            "a and b still → L=[1,2]. c → [1,2,3].",
            "print [1, 2] [1, 2] [1, 2, 3].",
          ],
          result: "[1, 2] [1, 2] [1, 2, 3]",
        },
      ],
    },
    {
      heading: "Mutability and mutable default arguments",
      body: "Mutable: list, dict, set, bytearray, most user objects. Immutable: int, float, bool, str, tuple, frozenset, bytes. “Changing” an int (x = x+1) rebinds the name; the old int object is unused. A tuple cannot have t[0]=1, but if t holds a list, t[0].append(1) is allowed — the tuple’s slots did not change, the inner object did.\n\ndef f(x, acc=[]): is evaluated once, when the def runs, not at each call. The same list is reused for every call that omits acc. That is why exam output is [1, 2] [1, 2] rather than [1] [2]. Use acc=None and create a new list inside if you need a fresh accumulator.\n\nDefault values that are immutable (acc=None, n=0, s=\"\") do not have this aliasing bug. The bug is specifically sharing one mutable object.\n\nIf two calls omit the default, assume they share the same list/dict/set and dry-run appends onto that one object. A None sentinel plus acc = [] inside the function gives a fresh list each time.",
      bullets: [
        "Never write def f(a, bucket=[] or {}).",
        "tuple + list inside: “immutable container of mutable elements”.",
      ],
      examples: [
        {
          title: "The classic default-list bug",
          prompt: "What is printed?",
          language: "python",
          code: `def f(x, acc=[]):
    acc.append(x)
    return acc
print(f(1), f(2))`,
          steps: [
            "At def time one list L=[] is stored as the default for acc.",
            "f(1): acc is L, append 1, L=[1], return L.",
            "f(2): acc omitted, same L. append 2, L=[1,2], return L.",
            "print evaluates f(1) then f(2) then prints both return values. Both refer to L, now [1,2].",
            "Output [1, 2] [1, 2] — not [1] [2].",
          ],
          result: "[1, 2] [1, 2]",
        },
        {
          title: "Fresh list when the default is None",
          prompt: "What is printed?",
          language: "python",
          code: `def g(x, acc=None):
    if acc is None:
        acc = []
    acc.append(x)
    return acc
print(g(1), g(2))`,
          steps: [
            "Default acc is None, an immutable sentinel, created once but not mutated.",
            "g(1): acc is None, replace with a new []. append 1. Return [1].",
            "g(2): acc is None again, another new []. append 2. Return [2].",
            "Two different lists.",
            "print [1] [2].",
          ],
          result: "[1] [2]",
        },
        {
          title: "Tuple of a list",
          prompt: "What is printed? Does t[0]= fail?",
          language: "python",
          code: `t = ([1], 2)
t[0].append(3)
print(t)
try:
    t[0] = [9]
except TypeError:
    print("E")`,
          steps: [
            "t is a tuple: slot0 → list [1], slot1 → 2. Tuple slots cannot be rebound.",
            "t[0].append(3) mutates the list. t is now ([1, 3], 2). Legal.",
            "print that tuple.",
            "t[0] = [9] tries to rebind a tuple slot → TypeError.",
            "except prints E. Two lines.",
          ],
          result: "([1, 3], 2)\nE",
        },
        {
          title: "str is immutable; list of chars is not",
          prompt: "What is printed?",
          language: "python",
          code: `s = "ab"
try:
    s[0] = "X"
except TypeError:
    print("T")
s = s + "c"
print(s)
a = ["a", "b"]
a[0] = "X"
print(a)`,
          steps: [
            "s → \"ab\". s[0]='X' is illegal on str → TypeError → print T.",
            "s = s + \"c\" rebinds s to a new string \"abc\". print abc.",
            "a is a list. a[0]='X' mutates to ['X','b'].",
            "print ['X', 'b'].",
            "Three lines: T / abc / ['X', 'b'].",
          ],
          result: "T\nabc\n['X', 'b']",
        },
      ],
    },
    {
      heading: "dict, set, tuple",
      body: "A dict maps hashable keys to values. Duplicate keys in a literal keep the last: {1: 'a', 1: 'b'} is {1: 'b'}. d[k]=v inserts or overwrites. d.get(k) is None if missing; d[k] raises KeyError. Python 3.7+ dicts remember insertion order; SEBI MCQs sometimes still treat order as “not guaranteed” for sets only.\n\nA set is unique, unordered (hash table). {1, 2, 2} is {1, 2}. Sets are mutable; frozenset is the immutable twin and can be a dict key. You cannot dict-key a list; you can key a tuple of immutables.\n\ntuple packing: t = 1, 2. Unpacking: a, b = t. A trailing comma (x,) is a one-tuple; (x) is just x. Concatenation t + (3,) builds a new tuple.\n\nDict lookup: d[k] versus d.get(k). Set membership: in. Unhashable list/dict cannot be a key or a set element; a tuple of immutables can.",
      bullets: [
        "KeyError vs d.get. set.add vs list.append. in tests keys for dict, membership for set/list.",
        "list is unhashable → cannot be a set element or dict key.",
      ],
      examples: [
        {
          title: "dict overwrite and get",
          prompt: "What is printed?",
          language: "python",
          code: `d = {1: "a", 2: "b", 1: "c"}
d[2] = "B"
print(d[1], d.get(3), d.get(2, "x"))
try:
    print(d[3])
except KeyError:
    print("K")`,
          steps: [
            "Literal: key 1 first 'a' then overwritten by 'c'. d starts {1:'c', 2:'b'}.",
            "d[2]='B' overwrites. d={1:'c', 2:'B'}.",
            "d[1] is c. d.get(3) missing → None. d.get(2,'x') finds B, default unused.",
            "d[3] raises KeyError → print K.",
            "First print: c None B. Then K.",
          ],
          result: "c None B\nK",
        },
        {
          title: "set uniqueness and in",
          prompt: "What is printed?",
          language: "python",
          code: `s = {1, 2, 2, 3}
s.add(3)
s.add(4)
print(len(s), 2 in s, 5 in s)`,
          steps: [
            "{1,2,2,3} stores {1,2,3}. len 3 after the literal.",
            "s.add(3) is a no-op. s.add(4) inserts. Now {1,2,3,4}, len 4.",
            "2 in s True. 5 in s False.",
            "print uses spaces: 4 True False.",
            "Do not print the set itself (order not used here).",
          ],
          result: "4 True False",
        },
        {
          title: "tuple unpack and one-tuple",
          prompt: "What is printed?",
          language: "python",
          code: `t = (1, 2, 3)
a, b, c = t
u = (7)
v = (7,)
print(a + b + c, type(u).__name__, type(v).__name__, v + (8,))`,
          steps: [
            "Unpack: a=1, b=2, c=3. Sum 6.",
            "u = (7) is just int 7; parentheses grouping, not a tuple.",
            "v = (7,) is a one-tuple. type names: int vs tuple.",
            "v + (8,) concatenates to (7, 8), a new tuple.",
            "print 6 int tuple (7, 8).",
          ],
          result: "6 int tuple (7, 8)",
        },
        {
          title: "Unhashable list as a key",
          prompt: "What happens?",
          language: "python",
          code: `d = {}
try:
    d[[1, 2]] = 3
except TypeError:
    print("T")
d[(1, 2)] = 3
print(d[(1, 2)])`,
          steps: [
            "[1,2] is a list, unhashable. Using it as a dict key raises TypeError.",
            "except prints T.",
            "(1,2) is a tuple of ints, hashable. Insert succeeds.",
            "d[(1,2)] looks up 3.",
            "Two lines: T then 3.",
          ],
          result: "T\n3",
        },
      ],
    },
    {
      heading: "File modes r / r+ / w / w+ / a",
      body: "Mode chooses existence, truncation, and where writes go. r : read, file must exist, pointer at 0, writes forbidden. r+ : read and write, must exist, no truncate, pointer at 0; writes overlay from the pointer. w : write, create if missing, truncate to empty if present, pointer at 0. w+ : like w but also readable. a : append, create if missing, writes always go to the end (even after a seek on many systems). a+ : append plus read.\n\nBinary variants add b (rb, wb). Encoding is a text-mode concern. Closing flushes. Exam MCQs rarely require you to run open(); they ask “which mode wipes the file” (w/w+) versus “which mode fails if the path is missing” (r/r+) versus “which mode preserves existing bytes and adds at end” (a/a+).\n\nA short dry-run: start with file contents HELLO. open(..., 'w') then write BYE leaves BYE. open(..., 'r+') write BYE leaves BYELO if you wrote 3 chars from offset 0. open(..., 'a') write BYE leaves HELLOBYE.\n\nPick w/w+ when they ask which mode wipes; r/r+ when they ask which mode fails if the path is missing; a/a+ when existing bytes must stay and new writes go to EOF.",
      bullets: [
        "w/w+ truncate. r/r+ require existence. a/a+ write at EOF.",
        "r+ does not truncate; that is the usual trick against w+.",
      ],
      examples: [
        {
          title: "w truncates",
          prompt: "File starts as HELLO. After this program, what are the contents?",
          language: "python",
          code: `open("f.txt", "w").write("BYE")
print(open("f.txt").read())`,
          steps: [
            "Assume f.txt existed with HELLO (5 chars).",
            "open w: truncate to empty, pointer 0, create if needed.",
            "write BYE stores 3 chars. File is BYE, not HELLOBYE and not BYELO.",
            "open default r reads all: BYE.",
            "print BYE.",
          ],
          result: "BYE",
        },
        {
          title: "r+ overwrites from the start, no truncate",
          prompt: "File starts as HELLO. What is printed?",
          language: "python",
          code: `f = open("f.txt", "r+")
f.write("BYE")
f.seek(0)
print(f.read())`,
          steps: [
            "r+ : file must exist, not truncated. Contents HELLO, pointer 0.",
            "write BYE overwrites the first 3 chars. Slots: B Y E L O.",
            "seek(0) to read from the start.",
            "read() → BYELO.",
            "print BYELO.",
          ],
          result: "BYELO",
        },
        {
          title: "a appends even if you do not seek",
          prompt: "File starts as HELLO. What is printed?",
          language: "python",
          code: `f = open("f.txt", "a")
f.write("BYE")
f.close()
print(open("f.txt").read())`,
          steps: [
            "a : pointer conceptually at EOF. HELLO kept.",
            "write BYE adds at end → HELLOBYE.",
            "close flushes.",
            "read entire file HELLOBYE.",
            "print HELLOBYE.",
          ],
          result: "HELLOBYE",
        },
        {
          title: "r on a missing file",
          prompt: "f.txt does not exist. What happens?",
          language: "python",
          code: `try:
    open("f.txt", "r")
    print("ok")
except FileNotFoundError:
    print("N")`,
          steps: [
            "Mode r requires an existing file.",
            "open raises FileNotFoundError before any read.",
            "print ok is skipped.",
            "except prints N.",
            "w or a would have created the file instead.",
          ],
          result: "N",
        },
      ],
    },
    {
      heading: "Regex: \\d \\w ^ $ groups backrefs",
      body: "Python re uses backslash classes: \\d digit [0-9], \\D non-digit, \\w word [A-Za-z0-9_], \\W non-word, \\s whitespace, . any char except newline (unless DOTALL). Anchors: ^ start, $ end (of string, or line with MULTILINE). {m,n} is a count. [A-Z] is a class; [^A-Z] negates.\n\nParentheses capture groups. group(0) is the whole match; group(1) is the first pair of (). Backreference \\1 in the pattern means “the same text group 1 already matched”. In replacement strings, \\1 or \\g<1> inserts that capture (use a raw replacement carefully).\n\nfindall returns all non-overlapping matches (a list of strings, or tuples if the pattern has groups). search looks anywhere; match only at position 0; fullmatch the entire string. * is greedy; *? is lazy. Trace with the input written under a cursor that advances after each match.\n\nAnchor first (does it have to start at 0? fill the whole string?), then the class (\\d vs \\w vs [A-Z]), then groups/backrefs. findall with one pair of parentheses returns the group, not group 0.",
      bullets: [
        "search vs match vs fullmatch is a standing MCQ.",
        "findall with one group returns the group, not the whole match.",
      ],
      examples: [
        {
          title: "\\\\d and findall non-overlapping",
          prompt: "What is printed?",
          language: "python",
          code: `import re
print(re.findall(r"\\d+", "a12b3cd45"))
print(re.findall(r"\\d", "a12b3"))`,
          steps: [
            "Pattern \\d+ : one or more digits. Scan a12b3cd45.",
            "From 'a', skip. At '1' greedy + takes 12. Next 'b' skip. '3' takes 3. 'cd' skip. '45' takes 45.",
            "findall non-overlapping: ['12', '3', '45'].",
            "Pattern \\d : each digit separate. a12b3 → ['1','2','3'].",
            "Two printed lists.",
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
            "s = SEBI2024. \\d+ can match 2024 as a substring → search True.",
            "match anchors at index 0. Index 0 is 'S', not a digit → match(r'\\d+') False.",
            "fullmatch requires the whole string to be digits → False.",
            "match(r'[A-Z]+\\d+') at 0: SEBI then 2024 consumes all → True (match need not consume the whole string, but here it does).",
            "print True False False True.",
          ],
          result: "True False False True",
        },
        {
          title: "Groups and a backreference",
          prompt: "What is printed?",
          language: "python",
          code: `import re
m = re.search(r"(\\w+)-\\1", "ab-ab-cd")
print(m.group(0), m.group(1))
print(bool(re.search(r"(\\w+)-\\1", "ab-cd")))`,
          steps: [
            "Pattern: a word, a hyphen, then the same word again (\\1).",
            "In ab-ab-cd the engine finds ab-ab. group(0)='ab-ab', group(1)='ab'.",
            "ab-cd : after capturing ab, the next chars are -cd, and \\1 would need ab, not cd. search fails.",
            "bool of that search is False.",
            "print ab-ab ab then False.",
          ],
          result: "ab-ab ab\nFalse",
        },
        {
          title: "^ $ and a character class",
          prompt: "What is printed?",
          language: "python",
          code: `import re
print(bool(re.search(r"^[AEIOU]", "SEBI")),
      bool(re.search(r"^[AEIOU]", "Equity")),
      bool(re.search(r"\\d$", "P2")),
      bool(re.search(r"[^0-9]+", "2024")))`,
          steps: [
            "^[AEIOU] : first char must be a capital vowel. S of SEBI is not → False.",
            "Equity starts with E → True. (search with ^ is still 'at start'.)",
            "\\d$ : last char a digit. P2 ends with 2 → True.",
            "[^0-9]+ : one or more non-digits. 2024 is all digits → no match → False.",
            "print False True True False.",
          ],
          result: "False True True False",
        },
      ],
    },
    {
      heading: "pandas melt / pivot / merge / groupby; list comps; *args",
      body: "At MCQ level a DataFrame is a labelled table. melt (and stack) take a wide table (one column per year/product) and produce long format: id_vars stay, the melted column names become a variable column, values become a value column. pivot (and unstack) go the other way: index + columns labels spread a value column wide. merge is relational join: on= key, how='inner'|'left'|'right'|'outer'. groupby(col).sum() / .agg(['min','max']) is SQL GROUP BY.\n\nList comprehensions: [expr for x in seq if cond] build a new list. Nested fors run like nested loops, left to right. A comprehension is not a generator; (expr for x in seq) is. *args collects extra positional arguments into a tuple. f(1,2,3) with def f(a, *rest) binds a=1, rest=(2,3). You can unpack a list into a call: f(*[1,2]).\n\nDo not confuse melt’s value_vars with merge’s on. Draw a 2×3 table before and after.\n\nReshape questions: count output rows (melt: ids × melted columns; inner merge: product of matching keys). List comps are nested loops left to right. *args is a tuple of the leftover positional arguments.",
      bullets: [
        "wide → long: melt. long → wide: pivot. join: merge. aggregate: groupby.",
        "*args is a tuple. **kwargs is a dict (less often asked).",
      ],
      examples: [
        {
          title: "melt wide → long",
          prompt: "After melt, how many rows, and what is the value in the last row?",
          language: "python",
          code: `import pandas as pd
df = pd.DataFrame({"id": ["A", "B"], "y1": [10, 20], "y2": [11, 21]})
long = pd.melt(df, id_vars=["id"], var_name="year", value_name="val")
print(len(long), long.iloc[-1]["val"])`,
          steps: [
            "Wide table: 2 rows (A,B) × two measure columns y1,y2.",
            "melt keeps id, stacks y1 and y2. 2 ids × 2 years = 4 long rows.",
            "Order is typically all y1 then all y2: (A,y1,10), (B,y1,20), (A,y2,11), (B,y2,21).",
            "Last row val is 21.",
            "print 4 21.",
          ],
          result: "4 21",
        },
        {
          title: "pivot long → wide and groupby",
          prompt: "What is printed?",
          language: "python",
          code: `import pandas as pd
long = pd.DataFrame({
    "id": ["A", "A", "B"],
    "year": ["y1", "y2", "y1"],
    "val": [10, 11, 20],
})
wide = long.pivot(index="id", columns="year", values="val")
print(int(wide.loc["A", "y1"]), int(long.groupby("id")["val"].sum()["A"]))`,
          steps: [
            "pivot: rows A/B, columns y1/y2. A,y1=10; A,y2=11; B,y1=20; B,y2 missing = NaN.",
            "wide.loc['A','y1'] is 10.",
            "groupby id on val: A is 10+11=21, B is 20.",
            "sum()['A'] is 21.",
            "print 10 21.",
          ],
          result: "10 21",
        },
        {
          title: "merge as inner join",
          prompt: "How many rows does the inner merge produce?",
          language: "python",
          code: `import pandas as pd
left = pd.DataFrame({"k": [1, 2, 3], "x": [10, 20, 30]})
right = pd.DataFrame({"k": [1, 2, 2], "y": [7, 8, 9]})
m = left.merge(right, on="k", how="inner")
print(len(m), int(m["y"].sum()))`,
          steps: [
            "inner on k: keep keys in both. k=1 once×once → 1 row. k=2 once×two right rows → 2 rows. k=3 unmatched → dropped.",
            "3 result rows: (1,10,7), (2,20,8), (2,20,9).",
            "y sum 7+8+9=24.",
            "len 3.",
            "print 3 24.",
          ],
          result: "3 24",
        },
        {
          title: "list comprehension and *args",
          prompt: "What is printed?",
          language: "python",
          code: `def f(a, *rest):
    return a, rest
xs = [n * n for n in range(5) if n % 2 == 1]
print(xs, f(1, 2, 3), f(*[4, 5]))`,
          steps: [
            "range(5): 0,1,2,3,4. Filter odd: 1,3. Squares: 1, 9. xs=[1,9].",
            "f(1,2,3): a=1, rest=(2,3). Returns (1, (2, 3)).",
            "f(*[4,5]) unpacks to f(4,5): a=4, rest=(5,). Returns (4, (5,)).",
            "print the list and the two tuples.",
            "Output [1, 9] (1, (2, 3)) (4, (5,)).",
          ],
          result: "[1, 9] (1, (2, 3)) (4, (5,))",
        },
      ],
    },
  ],
};
