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
        {
          title: "Even and odd letters with a step",
          prompt: "What is printed?",
          language: "python",
          code: `s = "GRADE"
print(s[::2], s[1::2], s[::-2])`,
          steps: [
            {
              do: "Number line:  0 1 2 3 4   G R A D E. n=5.",
              why: "A step of 2 still uses the half-open idea, but it skips boxes.",
            },
            {
              do: "s[::2] means start 0, stop 5, step +2. Take 0, 2, 4 → G, A, E → 'GAE'.",
              why: "Omitted start is 0 when the step is positive.",
            },
            {
              do: "s[1::2] starts at 1, step +2. Take 1, 3 → R, D → 'RD'. Index 5 is the fence.",
              why: "Odd indexes are the other team of letters.",
            },
            {
              do: "s[::-2]: negative step, so we walk backwards by 2 from the end. Letters E, A, G → 'EAG'.",
              why: "Omitted start with a negative step means ‘begin at the last letter’.",
            },
            {
              do: "print GAE RD EAG.",
              why: "Same word, three different fences. Draw the line; do not guess from English ‘every other’.",
            },
          ],
          result: "GAE RD EAG",
        },
        {
          title: "Assigning into a slice changes the list in place",
          prompt: "What is printed?",
          language: "python",
          code: `a = [0, 1, 2, 3, 4]
a[1:4] = [9, 9]
print(a)
b = [0, 1, 2]
b[1:1] = [7]
print(b)`,
          steps: [
            {
              do: "a is [0, 1, 2, 3, 4]. Slice [1:4] covers indexes 1,2,3 → values 1,2,3.",
              why: "The stop fence 4 is not in the slice. Three boxes will be replaced.",
            },
            {
              do: "a[1:4] = [9, 9] drops those three boxes and puts two 9s there. a becomes [0, 9, 9, 4].",
              why: "A slice assignment may change the length. Two values replaced three.",
            },
            {
              do: "b is [0, 1, 2]. b[1:1] is an empty slice sitting at the fence before index 1.",
              why: "Start equals stop means ‘insert here’, not ‘replace a letter’.",
            },
            {
              do: "b[1:1] = [7] inserts 7 at that fence. b becomes [0, 7, 1, 2].",
              why: "Nothing was removed. The new values are spliced in.",
            },
            {
              do: "Two lines: [0, 9, 9, 4] then [0, 7, 1, 2]. The name a still points at the same list object.",
              why: "Slice assignment mutates. It does not rebind a to a brand-new list.",
            },
          ],
          result: "[0, 9, 9, 4]\n[0, 7, 1, 2]",
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
        {
          title: "Shallow copy: nested lists are still shared",
          prompt: "What is printed?",
          language: "python",
          code: `a = [[1], [2]]
b = a[:]
b[0].append(9)
print(a, b, a is b, a[0] is b[0])`,
          steps: [
            {
              do: "a → outer list L1 whose slots hold arrows to inner lists [1] and [2].",
              why: "A list of lists is one outer box plus inner boxes.",
            },
            {
              do: "b = a[:] builds a new outer list L2. L2 copies the arrows, not the inner boxes. a is b is False.",
              why: "A slice copy is shallow. Only the outer list is new.",
            },
            {
              do: "a[0] is b[0] is True. Both outers still point at the same inner [1].",
              why: "The inner list was not cloned.",
            },
            {
              do: "b[0].append(9) writes that shared inner list. It becomes [1, 9]. a sees it too.",
              why: "append mutates the object both outers share at slot 0.",
            },
            {
              do: "print [[1, 9], [2]] [[1, 9], [2]] False True.",
              why: "Need a real deep copy (copy.deepcopy) if inner lists must be separate.",
            },
          ],
          result: "[[1, 9], [2]] [[1, 9], [2]] False True",
        },
        {
          title: "Rebind one name; the alias keeps the old list",
          prompt: "What is printed?",
          language: "python",
          code: `a = [1, 2]
b = a
a = a + [3]
print(a, b, a is b)`,
          steps: [
            {
              do: "Start: a and b both → L=[1, 2]. a is b is True.",
              why: "b = a copied the arrow.",
            },
            {
              do: "a = a + [3] builds a new list [1, 2, 3] and moves only the name a.",
              why: "+ always allocates. The assignment rebinds a, it does not write into L.",
            },
            {
              do: "b still → L, which is still [1, 2]. a is b is now False.",
              why: "b was never on the left of that =, so its arrow did not move.",
            },
            {
              do: "print [1, 2, 3] [1, 2] False.",
              why: "Contrast with a += [3], which would have mutated L and been seen by b.",
            },
            {
              do: "Exam phrase: = with + rebinds. append / += mutates.",
              why: "Circle the operator before you decide what b still sees.",
            },
          ],
          result: "[1, 2, 3] [1, 2] False",
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
        {
          title: "A default dict is shared the same way",
          prompt: "What is printed?",
          language: "python",
          code: `def f(k, d={}):
    d[k] = d.get(k, 0) + 1
    return d
print(f("a"), f("b"))`,
          steps: [
            {
              do: "At def time one dict D={} is stored as the default for d.",
              why: "dict is mutable. The default object is born once, like a default list.",
            },
            {
              do: "f(\"a\"): d is D. D has no 'a', so get returns 0, then D['a']=1. Return D.",
              why: "Omitting d means ‘use the stored default’.",
            },
            {
              do: "f(\"b\"): same D. D['b']=1. D is now {'a': 1, 'b': 1}. Return D.",
              why: "The second call does not get a new {}.",
            },
            {
              do: "print shows both returns. Both arrows point at D. Output {'a': 1, 'b': 1} {'a': 1, 'b': 1}.",
              why: "print evaluates left to right, then prints the two results of the same object.",
            },
            {
              do: "Safe pattern is d=None, then if d is None: d = {} inside the function.",
              why: "None is immutable. A new dict is born on each omitted call.",
            },
          ],
          result: "{'a': 1, 'b': 1} {'a': 1, 'b': 1}",
        },
        {
          title: "Two calls with the same explicit list share that list, not the default",
          prompt: "What is printed?",
          language: "python",
          code: `def f(x, acc=[]):
    acc.append(x)
    return acc
mine = []
print(f(1, mine), f(2, mine), f(3))`,
          steps: [
            {
              do: "mine = [] is box M. The default L=[] still exists unused for the first two calls.",
              why: "An explicit acc skips the default.",
            },
            {
              do: "f(1, mine): append 1 onto M. M=[1]. Return M.",
              why: "First write goes to the caller’s list.",
            },
            {
              do: "f(2, mine): same M. append 2. M=[1, 2]. Return M.",
              why: "Passing the same list twice is an alias, on purpose here.",
            },
            {
              do: "f(3): acc omitted, so acc is L. append 3. L=[3]. Return L.",
              why: "The default was never given 1 or 2.",
            },
            {
              do: "print [1, 2] [1, 2] [3]. First two arrows are M; the third is L.",
              why: "Shared explicit list vs unused default are two different boxes.",
            },
          ],
          result: "[1, 2] [1, 2] [3]",
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
        {
          title: "w+ wipes, then you may read after seek",
          prompt: "File starts as HELLO. What is printed?",
          language: "python",
          code: `f = open("f.txt", "w+")
f.write("HI")
f.seek(0)
print(f.read())`,
          steps: [
            {
              do: "Start file: HELLO. Mode w+ means wipe first, then allow read and write.",
              why: "The + adds reading. The w still truncates. HELLO is gone before write.",
            },
            {
              do: "After open, the file is empty and the pointer is 0. write HI stores two letters.",
              why: "There is nothing left to overlay. This is not r+.",
            },
            {
              do: "The pointer now sits after HI. read() without seek would return empty.",
              why: "A read starts at the pointer, not automatically at 0.",
            },
            {
              do: "seek(0) moves back to the start. read → HI. print HI.",
              why: "w+ can read, but you must put the pointer where you want to read.",
            },
            {
              do: "If the exam wanted BYELO, that is r+, not w+. w+ never keeps HELLO.",
              why: "Wipe vs overlay is the whole mode question.",
            },
          ],
          result: "HI",
        },
        {
          title: "a+ writes at the end; read needs seek(0)",
          prompt: "File starts as HELLO. What is printed?",
          language: "python",
          code: `f = open("f.txt", "a+")
f.write("BYE")
print("here", repr(f.read()))
f.seek(0)
print(f.read())`,
          steps: [
            {
              do: "a+: HELLO is kept. The pointer for writes sits at EOF (after O).",
              why: "Append mode always adds at the end, even with +.",
            },
            {
              do: "write BYE → HELLOBYE. The pointer is still at the new end.",
              why: "After a write in a+, there is nothing left to the right of the pointer.",
            },
            {
              do: "f.read() from EOF returns ''. First print is here '' .",
              why: "repr shows the empty string so you can see it. A silent print would look like a blank.",
            },
            {
              do: "seek(0) then read → HELLOBYE. Second print is HELLOBYE.",
              why: "a+ can read the whole file, but only after you move the pointer.",
            },
            {
              do: "Two lines: here '' then HELLOBYE.",
              why: "Do not pick HELLOBYE on the first read. The pointer was at the end.",
            },
          ],
          result: "here ''\nHELLOBYE",
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
        {
          title: "match can succeed without eating the whole string",
          prompt: "What is printed?",
          language: "python",
          code: `import re
s = "2024SEBI"
print(bool(re.match(r"\\d+", s)),
      bool(re.fullmatch(r"\\d+", s)),
      bool(re.search(r"[A-Z]+", s)))`,
          steps: [
            {
              do: "s = 2024SEBI. match \\d+ must start at index 0. Index 0 is 2, a digit. + takes 2024.",
              why: "match is ‘anchored at 0’. It does not have to consume SEBI.",
            },
            {
              do: "So match returns a match object → True. The leftover letters are fine for match.",
              why: "This is the usual mix-up with Java String.matches, which is a full match.",
            },
            {
              do: "fullmatch \\d+ needs every character to be a digit. SEBI spoils it → False.",
              why: "fullmatch is the whole-string test.",
            },
            {
              do: "search [A-Z]+ may start anywhere. It finds SEBI → True.",
              why: "search is the ‘somewhere in the middle’ tool.",
            },
            {
              do: "print True False True.",
              why: "Three different questions: start? whole? anywhere?",
            },
          ],
          result: "True False True",
        },
        {
          title: "findall with one group returns the group, not group 0",
          prompt: "What is printed?",
          language: "python",
          code: `import re
print(re.findall(r"\\d+", "A12-B3"))
print(re.findall(r"[A-Z](\\d+)", "A12-B3"))`,
          steps: [
            {
              do: "First pattern \\d+ has no parentheses. findall returns the whole matches: ['12', '3'].",
              why: "Zero groups → list of group-0 strings.",
            },
            {
              do: "Second pattern [A-Z](\\d+): a letter, then capture the following digits.",
              why: "One pair of parentheses is group 1.",
            },
            {
              do: "Matches are A12 and B3. Group 1 of each is 12 and 3. findall returns ['12', '3'].",
              why: "With exactly one group, findall lists that group, not the full A12.",
            },
            {
              do: "The two printed lists look the same here, but the second dropped the letters on purpose.",
              why: "Change the string to A12-B to see the difference: first still has '12', second needs a letter-plus-digits pair.",
            },
            {
              do: "Exam: if the pattern has one ( ), expect the captured piece in the list.",
              why: "That is the standing findall-group trap.",
            },
          ],
          result: "['12', '3']\n['12', '3']",
        },
      ],
    },
    {
      heading: "Dictionaries and sets (key lookup, unique, mutable keys trap)",
      body: "A dict maps a key to a value. d['SEBI'] jumps to that key. If the key is missing, d[k] raises KeyError. d.get(k) returns None (or a default you pass). The same key cannot sit twice: a later write overwrites the old value.\n\nA set is a bag of unique keys with no values. set([1,1,2]) is {1, 2}. Membership k in s is the usual exam use.\n\nKeys of a dict and members of a set must be hashable: numbers, strings, tuples of hashables. A list is mutable, so it is not a legal key. Using a list as a dict key is TypeError. If you need a compound key, use a tuple.",
      howTo: [
        "Draw the dict as a table of key → value. A later write to the same key replaces the value.",
        "d[k] needs the key to exist. d.get(k) is safe. k in d tests membership of the key.",
        "A set keeps each value once. Build it from a list when the question asks ‘unique’.",
        "If the key is a list or a dict, it is not hashable → TypeError. Switch to a tuple.",
      ],
      bullets: [
        "dict: key → value. Missing d[k] is KeyError. get is safe.",
        "set: unique membership. {1, 1, 2} has length 2.",
        "Keys must be hashable. list is not a key. tuple can be.",
        "Overwrite: d['a']=1 then d['a']=9 leaves {'a': 9}.",
      ],
      examples: [
        {
          title: "Key lookup: [] vs get vs in",
          prompt: "What is printed?",
          language: "python",
          code: `d = {"A": 1, "B": 2}
print(d["A"], d.get("C"), d.get("C", 0), "B" in d, "C" in d)
try:
    print(d["C"])
except KeyError:
    print("K")`,
          steps: [
            {
              do: "Table: A→1, B→2. d[\"A\"] is 1.",
              why: "[] looks up the key and returns the value.",
            },
            {
              do: "d.get(\"C\") is None because C is missing and no default was given.",
              why: "get never raises. Missing → None unless you pass a second argument.",
            },
            {
              do: "d.get(\"C\", 0) is 0. \"B\" in d is True. \"C\" in d is False.",
              why: "in on a dict tests keys, not values. 1 in d would be False.",
            },
            {
              do: "d[\"C\"] raises KeyError. except prints K.",
              why: "[] is the strict lookup. Missing is an error, not None.",
            },
            {
              do: "First print: 1 None 0 True False. Second print: K.",
              why: "Four tools, four answers: value, None, default, membership, or error.",
            },
          ],
          result: "1 None 0 True False\nK",
        },
        {
          title: "A set keeps unique values",
          prompt: "What is printed?",
          language: "python",
          code: `a = [1, 2, 2, 3, 1]
s = set(a)
print(len(a), len(s), sorted(s), 2 in s, 4 in s)`,
          steps: [
            {
              do: "a has five slots: 1, 2, 2, 3, 1. Length 5. Duplicates still count in a list.",
              why: "A list is an ordered row. Repeats are extra boxes.",
            },
            {
              do: "set(a) keeps {1, 2, 3}. Length 3.",
              why: "A set stores each hashable value once.",
            },
            {
              do: "sorted(s) is [1, 2, 3] so the print is stable. A raw set print order is not a good exam bet.",
              why: "Do not rely on {1, 2, 3} vs {2, 1, 3} in answers unless the question sorted.",
            },
            {
              do: "2 in s is True. 4 in s is False.",
              why: "Membership is the usual O(1) exam use of a set.",
            },
            {
              do: "print 5 3 [1, 2, 3] True False.",
              why: "List length vs unique count is the standing ‘how many different’ trick.",
            },
          ],
          result: "5 3 [1, 2, 3] True False",
        },
        {
          title: "A list cannot be a dict key",
          prompt: "What happens?",
          language: "python",
          code: `d = {}
try:
    d[[1, 2]] = "no"
    print("ok")
except TypeError:
    print("T")
d[(1, 2)] = "yes"
print(d[(1, 2)], (1, 2) in d)`,
          steps: [
            {
              do: "d[[1, 2]] tries to use a list as a key.",
              why: "Dict keys must be hashable so Python can jump to a bucket.",
            },
            {
              do: "A list is mutable (append can change it), so it is not hashable. TypeError. print ok is skipped. print T.",
              why: "If the key could change later, the bucket would be a lie.",
            },
            {
              do: "d[(1, 2)] uses a tuple. Tuples of numbers are hashable. Store \"yes\".",
              why: "A tuple is frozen. That is the legal compound key.",
            },
            {
              do: "(1, 2) in d is True. print yes True.",
              why: "Lookup uses the same tuple value, not a list.",
            },
            {
              do: "Two lines: T then yes True. Exam pick: list key → TypeError; tuple key → fine.",
              why: "Mutable keys trap in one sentence.",
            },
          ],
          result: "T\nyes True",
        },
        {
          title: "Same key written twice keeps the last value",
          prompt: "What is printed?",
          language: "python",
          code: `d = {}
d["A"] = 1
d["B"] = 2
d["A"] = 9
print(d["A"], len(d), list(d.keys()))`,
          steps: [
            {
              do: "First write: A→1. Second: B→2. Table has two keys.",
              why: "New keys add a row.",
            },
            {
              do: "d[\"A\"] = 9 finds the existing key A and replaces 1 with 9. It does not add a second A.",
              why: "A dict key is unique. A later write overwrites.",
            },
            {
              do: "len(d) is 2. Keys are A and B. d[\"A\"] is 9.",
              why: "Length counts keys, not how many times you assigned.",
            },
            {
              do: "list(d.keys()) is ['A', 'B'] in insertion order (A was first created, B second).",
              why: "Modern Python keeps insertion order. Overwriting A does not move it to the end.",
            },
            {
              do: "print 9 2 ['A', 'B'].",
              why: "Overwrite changes the value, not the number of keys.",
            },
          ],
          result: "9 2 ['A', 'B']",
        },
        {
          title: "set vs dict: unique keys, and a set of tuples",
          prompt: "What is printed?",
          language: "python",
          code: `s = set()
s.add((1, 2))
s.add((1, 2))
s.add((2, 1))
print(len(s), (1, 2) in s)
d = {"x": 1, "y": 1}
print(len(d), 1 in d, 1 in d.values())`,
          steps: [
            {
              do: "add (1, 2) twice. A set keeps it once. Then add (2, 1), which is a different tuple.",
              why: "Equality of tuples is by content and order. (1, 2) ≠ (2, 1).",
            },
            {
              do: "len(s) is 2. (1, 2) in s is True.",
              why: "Two unique frozen pairs.",
            },
            {
              do: "d has keys x, y and both values are 1. len(d) is 2 (two keys).",
              why: "Values may repeat. Keys may not.",
            },
            {
              do: "1 in d is False, because in on a dict tests keys. 1 in d.values() is True.",
              why: "The standing trap: membership of a dict is key membership.",
            },
            {
              do: "print 2 True then 2 False True.",
              why: "Set of tuples + ‘in dict means keys’ in one dry-run.",
            },
          ],
          result: "2 True\n2 False True",
        },
      ],
    },
  ],
};
