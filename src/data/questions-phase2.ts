import type { Question, TopicId } from "@/lib/types";

function q(
  id: string,
  topic: TopicId,
  difficulty: Question["difficulty"],
  question: string,
  options: [string, string, string, string],
  answer: 0 | 1 | 2 | 3,
  explanation: string,
  extra?: Pick<Question, "code" | "language">,
): Question {
  return {
    id,
    topic,
    phase: 2,
    paper: 2,
    difficulty,
    question,
    options,
    answer,
    explanation,
    ...extra,
  };
}

export const phase2Questions: Question[] = [
  q(
    "p2-ds-01",
    "ds",
    "moderate",
    "A stack is used to evaluate the postfix expression 5 1 2 + 4 * + 3 -. What is the result?",
    ["14", "10", "16", "4"],
    0,
    "5 1 2 + → 5 3; 4 * → 5 12; + → 17; 3 - → 14.",
  ),
  q(
    "p2-ds-02",
    "ds",
    "easy",
    "Which structure gives O(1) enqueue and O(1) dequeue when implemented with a circular array and head/tail indices?",
    ["Stack", "Queue", "Binary heap", "BST"],
    1,
    "A circular buffer queue has O(1) both ends. Heap is O(log n) insert/extract. Stack is LIFO, not a queue.",
  ),
  q(
    "p2-ds-03",
    "ds",
    "moderate",
    "In a singly linked list, inserting a node after a given node p (p ≠ null) takes:",
    ["O(n) always", "O(1) time", "O(log n)", "O(n log n)"],
    1,
    "new.next = p.next; p.next = new. Inserting *before* a node, or at a position by index, needs a walk.",
  ),
  q(
    "p2-ds-04",
    "ds",
    "hard",
    "What is printed?",
    ["1 2 3", "3 2 1", "2 1 3", "1 3 2"],
    1,
    "Push 1,2,3 then pop thrice → LIFO 3 2 1.",
    {
      language: "python",
      code: `st = []
for x in [1, 2, 3]:
    st.append(x)
while st:
    print(st.pop(), end=" ")`,
    },
  ),
  q(
    "p2-ds-05",
    "ds",
    "moderate",
    "The height of a complete binary tree with n nodes is:",
    ["Θ(n)", "Θ(log n)", "Θ(n log n)", "Θ(√n)"],
    1,
    "A complete binary tree is filled level by level; height is ⌊log₂ n⌋.",
  ),
  q(
    "p2-ds-06",
    "ds",
    "hard",
    "After inserting 50, 30, 70, 20, 40 into an empty BST (no balancing), the inorder traversal is:",
    ["50 30 20 40 70", "20 30 40 50 70", "20 40 30 70 50", "70 50 40 30 20"],
    1,
    "Inorder of a BST always yields sorted keys: 20 30 40 50 70.",
  ),
  q(
    "p2-ds-07",
    "ds",
    "moderate",
    "A min-heap of integers represented as an array starts at index 1. The children of node i are at:",
    ["i-1 and i+1", "2i and 2i+1", "⌊i/2⌋ only", "i² and i²+1"],
    1,
    "Standard 1-based heap: parent ⌊i/2⌋, children 2i and 2i+1. 0-based: 2i+1 and 2i+2.",
  ),
  q(
    "p2-ds-08",
    "ds",
    "easy",
    "Which collision-resolution method stores colliding keys in a list at the same table index?",
    ["Linear probing", "Quadratic probing", "Separate chaining", "Double hashing"],
    2,
    "Chaining: each slot is a list. The others are open-addressing probes.",
  ),
  q(
    "p2-ds-09",
    "ds",
    "hard",
    "What is the output?",
    ["[2, 4, 6]", "[1, 2, 3]", "[6, 15]", "Error: shape mismatch"],
    0,
    "m[0] is [1, 2, 3]. Doubling each element yields [2, 4, 6]. Phase II often mixes data-analysis traces with DSA.",
    {
      language: "python",
      code: `m = [[1, 2, 3], [4, 5, 6]]
print([x * 2 for x in m[0]])`,
    },
  ),
  q(
    "p2-ds-10",
    "ds",
    "moderate",
    "JSON objects (as in the Phase II syllabus) are closest to which structure?",
    [
      "A contiguous integer-indexed array only",
      "An unordered collection of key–value pairs (with nested arrays/objects allowed)",
      "A binary heap",
      "A circular queue",
    ],
    1,
    "A JSON object is a map/dict; arrays are ordered lists. Nesting is allowed. Hashing/indexing ideas apply.",
  ),
  q(
    "p2-ds-11",
    "ds",
    "hard",
    "Find the bug: this function should reverse a singly linked list in place.",
    [
      "prev should start as head",
      "The line curr.next = prev is missing before advancing, so links are never reversed",
      "curr should be incremented twice",
      "There is no bug",
    ],
    1,
    "Standard reverse: nxt=curr.next; curr.next=prev; prev=curr; curr=nxt. Without curr.next=prev the list is unchanged.",
    {
      language: "python",
      code: `def reverse(head):
    prev, curr = None, head
    while curr:
        nxt = curr.next
        prev = curr
        curr = nxt
    return prev`,
    },
  ),
  q(
    "p2-algo-01",
    "algorithms",
    "moderate",
    "Which pair is a correct match of algorithm to technique?",
    [
      "Merge sort — greedy",
      "Huffman coding — greedy",
      "N-Queens — Dijkstra",
      "Kruskal — dynamic programming",
    ],
    1,
    "Huffman and Kruskal/Prim are greedy. Merge sort is D&C. N-Queens is backtracking. Floyd–Warshall is DP.",
  ),
  q(
    "p2-algo-02",
    "algorithms",
    "hard",
    "Complete the logic: binary search on a sorted array a[lo..hi] looking for t. If a[mid] < t you should set:",
    ["hi = mid - 1", "lo = mid + 1", "lo = mid", "hi = mid"],
    1,
    "If the mid value is too small, discard the left half including mid: lo = mid + 1. The other way around if a[mid] > t.",
  ),
  q(
    "p2-algo-03",
    "algorithms",
    "moderate",
    "KMP pattern search preprocesses the pattern to build the LPS (longest proper prefix which is also suffix) array in order to:",
    [
      "Sort the text",
      "Avoid re-scanning text characters after a mismatch",
      "Hash the entire text in O(1)",
      "Convert the pattern to a DFA of size |text|",
    ],
    1,
    "KMP is O(n+m). Naive search can be O(nm). Rabin–Karp uses hashing; Boyer–Moore uses bad-character/good-suffix shifts.",
  ),
  q(
    "p2-algo-04",
    "algorithms",
    "hard",
    "What does this DP print for n = 5?",
    ["5", "8", "3", "1"],
    0,
    "This is the Fibonacci sequence with dp[0]=0, dp[1]=1. Then dp[2]=1, dp[3]=2, dp[4]=3, dp[5]=5.",
    {
      language: "python",
      code: `n = 5
dp = [0] * (n + 1)
dp[1] = 1
for i in range(2, n + 1):
    dp[i] = dp[i - 1] + dp[i - 2]
print(dp[n])`,
    },
  ),
  q(
    "p2-algo-05",
    "algorithms",
    "easy",
    "Backtracking is the usual technique for:",
    [
      "Computing MST in a dense graph",
      "Generating all N-Queens placements / Hamiltonian paths with prune",
      "Sorting integers in O(n log n) worst case",
      "Single-source shortest paths with negative weights",
    ],
    1,
    "Backtracking: try a choice, recurse, undo. Shortest paths with negatives: Bellman–Ford. Heap sort: O(n log n) worst case.",
  ),
  q(
    "p2-algo-06",
    "algorithms",
    "moderate",
    "A stable sorting algorithm preserves the relative order of equal keys. Which is stable in typical library implementations?",
    ["Heapsort", "Quicksort (in-place naive)", "Mergesort", "Selection sort"],
    2,
    "Mergesort and insertion sort are stably implementable. Plain heapsort and selection sort are not. Quicksort is usually not stable.",
  ),
  q(
    "p2-algo-07",
    "algorithms",
    "hard",
    "Dry-run: how many times is a swap performed?",
    ["0", "1", "2", "3"],
    2,
    "i=0: 4 > 1 → swap → [1, 4, 3]. i=1: 4 > 3 → swap → [1, 3, 4]. Two adjacent swaps (one bubble-sort pass).",
    {
      language: "python",
      code: `a = [4, 1, 3]
swaps = 0
for i in range(len(a) - 1):
    if a[i] > a[i + 1]:
        a[i], a[i + 1] = a[i + 1], a[i]
        swaps += 1
print(swaps)`,
    },
  ),
  q(
    "p2-str-01",
    "strings",
    "easy",
    "In Java, \"SEBI\".substring(1, 3) evaluates to:",
    ['"SE"', '"EB"', '"EBI"', '"BI"'],
    1,
    "substring(beginInclusive, endExclusive) → chars at 1 and 2 → \"EB\".",
  ),
  q(
    "p2-str-02",
    "strings",
    "moderate",
    "Python: re.findall(r'[A-Z]{2,}', 'Sebi GRADE a IT') returns:",
    ["['Sebi', 'GRADE', 'IT']", "['GRADE', 'IT']", "['S']", "['GRADE a IT']"],
    1,
    "[A-Z]{2,} is two or more consecutive uppercase letters: GRADE and IT. 'Sebi' is mixed case.",
  ),
  q(
    "p2-str-03",
    "strings",
    "hard",
    "What is printed?",
    ["6", "5", "11", "Error"],
    0,
    "Python len counts characters: S-E-B-I-space-A = 6 if s='SEBI A'. 'SEBI A' is 6 chars. Yes.",
    {
      language: "python",
      code: `s = "SEBI A"
print(len(s))`,
    },
  ),
  q(
    "p2-str-04",
    "strings",
    "moderate",
    "C++ s.find(\"IT\") on s = \"GRADE A IT\" (string) returns:",
    [
      "A boolean true",
      "The starting index of the first match, or npos if absent",
      "A substring object",
      "The length of s",
    ],
    1,
    "std::string::find returns size_t index or std::string::npos.",
  ),
  q(
    "p2-str-05",
    "strings",
    "easy",
    "Which regex matches a string that is exactly three digits?",
    ["^.*$", "\\d{3}", "^[0-9]{3}$", "[A-Z]{3}"],
    2,
    "Anchors ^ $ make the whole string three digits. \\d{3} can match three digits as a substring unless anchored.",
  ),
  q(
    "p2-oop-01",
    "oops",
    "easy",
    "Encapsulation is best described as:",
    [
      "Allowing many forms of a method name",
      "Bundling data with the methods that operate on it and restricting direct access",
      "Sharing a single copy of a method across processes",
      "Converting a class into a JSON object",
    ],
    1,
    "Encapsulation = data hiding + cohesion of state and behaviour. Polymorphism = many forms. Abstraction = essential interface.",
  ),
  q(
    "p2-oop-02",
    "oops",
    "moderate",
    "Runtime polymorphism requires:",
    [
      "Method overloading only",
      "Overridden methods dispatched via a base reference/pointer to a derived object",
      "All fields public",
      "Templates in every language",
    ],
    1,
    "Overloading is compile-time. Overriding + dynamic dispatch is runtime polymorphism.",
  ),
  q(
    "p2-oop-03",
    "oops",
    "easy",
    "Abstraction in OOP means:",
    [
      "Exposing every field",
      "Showing essential features while hiding implementation details",
      "Using only global functions",
      "Disabling inheritance",
    ],
    1,
    "Interfaces/abstract classes are typical mechanisms.",
  ),
  q(
    "p2-oop-04",
    "oops",
    "hard",
    "What is printed?",
    ["A.foo B.foo", "B.foo B.foo", "A.foo A.foo", "Compile error"],
    1,
    "Both calls use runtime type B. Even through an A reference, foo is overridden.",
    {
      language: "java",
      code: `class A { void foo() { System.out.print("A.foo "); } }
class B extends A { void foo() { System.out.print("B.foo "); } }
A x = new B();
B y = new B();
x.foo(); y.foo();`,
    },
  ),
  q(
    "p2-oop-05",
    "oops",
    "moderate",
    "Python: class C: pass; a=C(); a.x=1. This assignment:",
    [
      "Is illegal because fields must be declared",
      "Creates an instance attribute x on object a (dynamic attributes)",
      "Creates a class-level field shared by all instances always",
      "Overrides __init__",
    ],
    1,
    "Python instances have a __dict__. Class attributes live on the class object unless shadowed.",
  ),
  q(
    "p2-oop-06",
    "oops",
    "moderate",
    "Protected members in C++ (keyword protected) are accessible from:",
    [
      "Only the defining class",
      "The class and its derived classes (and friends), not arbitrary outside code",
      "Any translation unit",
      "Java packages only",
    ],
    1,
    "private: class only. protected: class + derived. public: everyone. Java protected also includes the package.",
  ),
  q(
    "p2-mix-01",
    "ds",
    "hard",
    "Queue using two stacks: enqueue pushes to s1. Dequeue, if s2 is empty, pops all of s1 onto s2 then pops s2. Amortised dequeue is:",
    ["O(n) always", "O(1) amortised", "O(n log n)", "O(n²)"],
    1,
    "Each element moves s1→s2 at most once. Worst-case dequeue is O(n) when transferring, amortised O(1).",
  ),
  q(
    "p2-mix-02",
    "algorithms",
    "moderate",
    "Which algorithm always finds a shortest path in a weighted directed graph with no negative cycles?",
    [
      "BFS ignoring weights",
      "Bellman–Ford from the source",
      "Preorder DFS",
      "Prim’s algorithm",
    ],
    1,
    "Bellman–Ford: O(VE), handles negative edges, reports negative cycles. Prim is MST, not shortest paths. BFS is hops only.",
  ),
];
