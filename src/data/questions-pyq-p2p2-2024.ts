import { makeQuestion } from "@/data/make-question";

const q = makeQuestion(2, 2);

export const pyqP2P2_2024 = [
  q(
    "pyq-2024-p2p2-ds-01",
    "ds",
    "hard",
    "The Dutch-national-flag walk partitions [2, 0, 2, 1, 1, 0] into 0s, then 1s, then 2s. What is printed?",
    ["[0, 0, 1, 1, 2, 2]", "[0, 1, 2, 0, 1, 2]", "[2, 2, 1, 1, 0, 0]", "[0, 0, 2, 2, 1, 1]"],
    0,
    "lo/mid start at 0 and hi at 5. Zeros are swapped to the left and twos to the right; ones advance mid. The stable colour order is [0, 0, 1, 1, 2, 2].",
    {
      language: "python",
      code: `a = [2, 0, 2, 1, 1, 0]
lo = mid = 0
hi = len(a) - 1
while mid <= hi:
    if a[mid] == 0:
        a[lo], a[mid] = a[mid], a[lo]
        lo += 1
        mid += 1
    elif a[mid] == 1:
        mid += 1
    else:
        a[mid], a[hi] = a[hi], a[mid]
        hi -= 1
print(a)`,
    },
  ),
  q(
    "pyq-2024-p2p2-ds-02",
    "ds",
    "hard",
    "A circular buffer of length 5 stores front at index 0. After enqueue 1,2,3,4, one dequeue, then enqueue 5 and 6, the backing array is:",
    [
      "[1, 2, 3, 4, 5]",
      "[6, 2, 3, 4, 5]",
      "[2, 3, 4, 5, 6]",
      "[6, 5, 4, 3, 2]",
    ],
    1,
    "Dequeue clears slot 0 and advances front to 1. Enqueue 5 fills index 4; enqueue 6 wraps rear to index 0, so the array is [6, 2, 3, 4, 5] with front still at 1.",
    {
      language: "python",
      code: `cap, arr, front, rear = 5, [None] * 5, 0, 0

def enq(x):
    global rear
    arr[rear] = x
    rear = (rear + 1) % cap

def deq():
    global front
    arr[front] = None
    front = (front + 1) % cap

for x in [1, 2, 3, 4]:
    enq(x)
deq()
enq(5)
enq(6)
print(arr)`,
    },
  ),
  q(
    "pyq-2024-p2p2-ds-03",
    "ds",
    "hard",
    "0-based max-heapify at index 0 is run on [3, 9, 8, 4, 5, 7]. The resulting array is:",
    ["[9, 5, 8, 4, 3, 7]", "[9, 8, 7, 4, 5, 3]", "[8, 9, 7, 4, 5, 3]", "[9, 3, 8, 4, 5, 7]"],
    0,
    "3 swaps with the larger child 9, then in that subtree 3 swaps with 5, producing [9, 5, 8, 4, 3, 7].",
    {
      language: "python",
      code: `h = [3, 9, 8, 4, 5, 7]

def heapify(i, n):
    largest, l, r = i, 2 * i + 1, 2 * i + 2
    if l < n and h[l] > h[largest]:
        largest = l
    if r < n and h[r] > h[largest]:
        largest = r
    if largest != i:
        h[i], h[largest] = h[largest], h[i]
        heapify(largest, n)

heapify(0, len(h))
print(h)`,
    },
  ),
  q(
    "pyq-2024-p2p2-ds-04",
    "ds",
    "hard",
    "Quadratic probing uses slots (h(k) + i^2) mod 11 for i = 0,1,2,3 with h(k)=7. The first four candidate indices are:",
    ["7, 8, 9, 10", "7, 8, 0, 5", "7, 9, 2, 8", "7, 6, 3, 9"],
    1,
    "Offsets 0, 1, 4, 9 added to 7 modulo 11 give 7, 8, 11 mod 11 = 0, and 16 mod 11 = 5.",
    {
      language: "python",
      code: `print([(7 + i * i) % 11 for i in range(4)])`,
    },
  ),
  q(
    "pyq-2024-p2p2-ds-05",
    "ds",
    "hard",
    "A clockwise spiral dump of [[1,2,3],[4,5,6],[7,8,9]] prints which sequence?",
    ["1 2 3 6 9 8 7 4 5", "1 4 7 8 9 6 3 2 5", "1 2 3 4 5 6 7 8 9", "5 4 7 8 9 6 3 2 1"],
    0,
    "Top row 1 2 3, right column 6 9, bottom row reversed 8 7, left column 4, then the remaining centre 5.",
    {
      language: "python",
      code: `m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
r0, r1, c0, c1, out = 0, 2, 0, 2, []
while r0 <= r1 and c0 <= c1:
    for c in range(c0, c1 + 1):
        out.append(m[r0][c])
    r0 += 1
    for r in range(r0, r1 + 1):
        out.append(m[r][c1])
    c1 -= 1
    if r0 <= r1:
        for c in range(c1, c0 - 1, -1):
            out.append(m[r1][c])
        r1 -= 1
    if c0 <= c1:
        for r in range(r1, r0 - 1, -1):
            out.append(m[r][c0])
        c0 += 1
print(out)`,
    },
  ),
  q(
    "pyq-2024-p2p2-ds-06",
    "ds",
    "hard",
    "A sliding-window maximum of width 3 is computed on [1, 3, -1, -3, 5, 3, 6, 7] with a decreasing deque of indices. What is printed?",
    ["[1, 3, -1, -3, 5, 3, 6]", "[3, 3, 5, 5, 6, 7]", "[3, -1, 5, 3, 6, 7]", "[1, 3, 5, 6, 7]"],
    1,
    "Windows are [1,3,-1], [3,-1,-3], [-1,-3,5], [-3,5,3], [5,3,6], [3,6,7]; maxima 3,3,5,5,6,7. Stale indices leave the front; smaller tail values are popped.",
    {
      language: "python",
      code: `from collections import deque
a, k, d, out = [1, 3, -1, -3, 5, 3, 6, 7], 3, deque(), []
for i, x in enumerate(a):
    while d and d[0] <= i - k:
        d.popleft()
    while d and a[d[-1]] <= x:
        d.pop()
    d.append(i)
    if i >= k - 1:
        out.append(a[d[0]])
print(out)`,
    },
  ),
  q(
    "pyq-2024-p2p2-ds-07",
    "ds",
    "hard",
    "An LRU cache of capacity 2 is driven as put(1,1), put(2,2), get(1), put(3,3), get(2). What are the last get and the remaining keys in recency order (LRU first)?",
    ["1 and keys [2, 3]", "-1 and keys [1, 3]", "2 and keys [1, 3]", "-1 and keys [2, 3]"],
    1,
    "get(1) makes 1 most-recent. put(3,3) evicts LRU key 2. get(2) misses (−1). Remaining map order is 1 then 3.",
    {
      language: "python",
      code: `from collections import OrderedDict

class LRU:
    def __init__(self, cap):
        self.cap, self.d = cap, OrderedDict()
    def get(self, k):
        if k not in self.d:
            return -1
        self.d.move_to_end(k)
        return self.d[k]
    def put(self, k, v):
        if k in self.d:
            self.d.move_to_end(k)
        self.d[k] = v
        if len(self.d) > self.cap:
            self.d.popitem(last=False)

lru = LRU(2)
lru.put(1, 1)
lru.put(2, 2)
print(lru.get(1))
lru.put(3, 3)
print(lru.get(2), list(lru.d))`,
    },
  ),
  q(
    "pyq-2024-p2p2-ds-08",
    "ds",
    "hard",
    "p points at node 1 in 1→2→3→4 and executes p.next = p.next.next. The values then reachable from the head are:",
    ["124", "134", "234", "14"],
    1,
    "p.next originally names 2; assigning 2’s successor 3 bypasses node 2, leaving 1→3→4.",
    {
      language: "java",
      code: `class Node {
  int v; Node next;
  Node(int v, Node n) { this.v = v; next = n; }
}
Node n4 = new Node(4, null);
Node n3 = new Node(3, n4);
Node n2 = new Node(2, n3);
Node n1 = new Node(1, n2);
Node p = n1;
p.next = p.next.next;
for (Node x = n1; x != null; x = x.next) System.out.print(x.v);`,
    },
  ),
  q(
    "pyq-2024-p2p2-ds-09",
    "ds",
    "hard",
    "Keys 20, 10, 30, 5, 15, 25, 35 fill a BST. The inorder sequence’s 3rd key (1-based) is:",
    ["10", "15", "20", "25"],
    1,
    "Inorder of a BST is sorted: 5,10,15,20,25,30,35. The 3rd key is 15.",
    {
      language: "python",
      code: `class T:
    def __init__(self, v):
        self.v, self.l, self.r = v, None, None

def ins(n, v):
    if not n:
        return T(v)
    if v < n.v:
        n.l = ins(n.l, v)
    else:
        n.r = ins(n.r, v)
    return n

def inorder(n, o):
    if not n:
        return
    inorder(n.l, o)
    o.append(n.v)
    inorder(n.r, o)

r, out = None, []
for v in [20, 10, 30, 5, 15, 25, 35]:
    r = ins(r, v)
inorder(r, out)
print(out[2])`,
    },
  ),
  q(
    "pyq-2024-p2p2-ds-10",
    "ds",
    "hard",
    "zip(*m) on a 3×2 matrix transposes it. What is printed?",
    ["[(1, 2), (3, 4), (5, 6)]", "[(1, 3, 5), (2, 4, 6)]", "[[1, 2, 3], [4, 5, 6]]", "[(6, 5), (4, 3), (2, 1)]"],
    1,
    "The star unpacks rows as parallel iterables, so columns become tuples (1,3,5) and (2,4,6).",
    {
      language: "python",
      code: `m = [[1, 2], [3, 4], [5, 6]]
print(list(zip(*m)))`,
    },
  ),
  q(
    "pyq-2024-p2p2-algo-01",
    "algorithms",
    "hard",
    "The O(n log n) LIS tails walk on [10, 9, 2, 5, 3, 7, 101, 18] reports what length, and what is tails at the end?",
    [
      "length 4, tails [2, 3, 7, 18]",
      "length 5, tails [2, 3, 7, 18, 101]",
      "length 4, tails [10, 9, 2, 5]",
      "length 3, tails [2, 5, 7]",
    ],
    0,
    "tails[i] is the smallest tail of an increasing subsequence of length i+1. 101 is replaced by 18 in the last slot, so length stays 4 with tails [2, 3, 7, 18].",
    {
      language: "python",
      code: `import bisect
a, tails = [10, 9, 2, 5, 3, 7, 101, 18], []
for x in a:
    i = bisect.bisect_left(tails, x)
    if i == len(tails):
        tails.append(x)
    else:
        tails[i] = x
print(len(tails), tails)`,
    },
  ),
  q(
    "pyq-2024-p2p2-algo-02",
    "algorithms",
    "hard",
    "Minimum-coin DP with coins {1, 3, 4} and amount 6 stores what value in dp[6]?",
    ["1", "2", "3", "6"],
    1,
    "3+3 and 1+1+4 both use two coins; greedy 4+1+1 also uses three, so the optimum is 2, not the greedy count.",
    {
      language: "python",
      code: `coins, amt = [1, 3, 4], 6
dp = [99] * (amt + 1)
dp[0] = 0
for x in range(1, amt + 1):
    for c in coins:
        if c <= x:
            dp[x] = min(dp[x], dp[x - c] + 1)
print(dp[amt])`,
    },
  ),
  q(
    "pyq-2024-p2p2-algo-03",
    "algorithms",
    "hard",
    "A 4-queens backtracker counts distinct solutions, treating mirrors as different. How many solutions are found?",
    ["0", "1", "2", "4"],
    2,
    "The only two placements (column permutations 2,4,1,3 and 3,1,4,2) are mirrors of each other; both are counted.",
    {
      language: "python",
      code: `n, cols, d1, d2, cnt = 4, set(), set(), set(), [0]

def bt(r):
    if r == n:
        cnt[0] += 1
        return
    for c in range(n):
        if c in cols or (r - c) in d1 or (r + c) in d2:
            continue
        cols.add(c); d1.add(r - c); d2.add(r + c)
        bt(r + 1)
        cols.remove(c); d1.remove(r - c); d2.remove(r + c)

bt(0)
print(cnt[0])`,
    },
  ),
  q(
    "pyq-2024-p2p2-algo-04",
    "algorithms",
    "hard",
    "Insertion sort is run on [4, 3, 2, 1], counting each right-shift of a larger element. How many shifts occur?",
    ["3", "4", "6", "12"],
    2,
    "The inversions are all six pairs. Each inversion causes one shift: 1, then 2, then 3 more, totalling 6, and the array becomes [1, 2, 3, 4].",
    {
      language: "python",
      code: `a, shifts = [4, 3, 2, 1], 0
for i in range(1, len(a)):
    key, j = a[i], i - 1
    while j >= 0 and a[j] > key:
        a[j + 1] = a[j]
        j -= 1
        shifts += 1
    a[j + 1] = key
print(shifts)`,
    },
  ),
  q(
    "pyq-2024-p2p2-algo-05",
    "algorithms",
    "hard",
    "Merge-sort inversion counting on [2, 4, 1, 3, 5] returns:",
    ["2", "3", "4", "5"],
    1,
    "The inverted pairs are (2,1), (4,1) and (4,3). Merge from [2,4] and [1,3,5] charges those three split inversions.",
    {
      language: "python",
      code: `def inv(a):
    def ms(x):
        if len(x) <= 1:
            return x, 0
        mid = len(x) // 2
        L, il = ms(x[:mid])
        R, ir = ms(x[mid:])
        i = j = c = 0
        out = []
        while i < len(L) and j < len(R):
            if L[i] <= R[j]:
                out.append(L[i]); i += 1
            else:
                out.append(R[j]); c += len(L) - i; j += 1
        out.extend(L[i:]); out.extend(R[j:])
        return out, il + ir + c
    return ms(a)[1]
print(inv([2, 4, 1, 3, 5]))`,
    },
  ),
  q(
    "pyq-2024-p2p2-algo-06",
    "algorithms",
    "hard",
    "KMP search for pattern AABA in text AABAACAADAABAABA reports match starting indices:",
    ["[0, 9, 12]", "[0, 9]", "[9, 12]", "[0, 1, 9, 12]"],
    0,
    "Hits begin at 0, 9 and 12. After a match, KMP resumes using lps[3]=1 rather than restarting at the next text character from scratch.",
    {
      language: "python",
      code: `def lps(p):
    l, length, i = [0] * len(p), 0, 1
    while i < len(p):
        if p[i] == p[length]:
            length += 1; l[i] = length; i += 1
        elif length:
            length = l[length - 1]
        else:
            l[i] = 0; i += 1
    return l

text, pat = "AABAACAADAABAABA", "AABA"
l, i, j, hits = lps(pat), 0, 0, []
while i < len(text):
    if text[i] == pat[j]:
        i += 1; j += 1
        if j == len(pat):
            hits.append(i - j)
            j = l[j - 1]
    elif j:
        j = l[j - 1]
    else:
        i += 1
print(hits)`,
    },
  ),
  q(
    "pyq-2024-p2p2-algo-07",
    "algorithms",
    "hard",
    "A rotated-array binary search looks for 4 in [6, 7, 1, 2, 3, 4, 5]. Which 0-based index is returned?",
    ["3", "4", "5", "6"],
    2,
    "The left half [6,7,1] is not sorted when mid is 2, so the search keeps the sorted right half that contains 4 at index 5.",
    {
      language: "python",
      code: `a, t = [6, 7, 1, 2, 3, 4, 5], 4
lo, hi = 0, len(a) - 1
while lo <= hi:
    mid = (lo + hi) // 2
    if a[mid] == t:
        print(mid)
        break
    if a[lo] <= a[mid]:
        if a[lo] <= t < a[mid]:
            hi = mid - 1
        else:
            lo = mid + 1
    else:
        if a[mid] < t <= a[hi]:
            lo = mid + 1
        else:
            hi = mid - 1`,
    },
  ),
  q(
    "pyq-2024-p2p2-oops-01",
    "oops",
    "hard",
    "What is printed when a B instance is viewed through an A reference?",
    ["As Ap", "As Bp", "Bs Bp", "Bs Ap"],
    1,
    "Static s() is resolved on the compile-time type A, so As is used. Instance p() is virtual and overridden, so Bp runs.",
    {
      language: "java",
      code: `class A {
  static String s() { return "As"; }
  String p() { return "Ap"; }
}
class B extends A {
  static String s() { return "Bs"; }
  String p() { return "Bp"; }
}
A x = new B();
System.out.print(x.s() + " " + x.p());`,
    },
  ),
  q(
    "pyq-2024-p2p2-oops-02",
    "oops",
    "hard",
    "f is not virtual. What does the C++ fragment print?",
    ["D", "B", "BD", "Undefined behaviour always crashes"],
    1,
    "Without virtual, p->f() is bound to B::f using the pointer’s static type, even though the object is a D.",
    {
      language: "cpp",
      code: `struct B { void f() { std::cout << "B"; } };
struct D : B { void f() { std::cout << "D"; } };
B* p = new D();
p->f();`,
    },
  ),
  q(
    "pyq-2024-p2p2-oops-03",
    "oops",
    "hard",
    "C is constructed as an automatic object. What characters are printed (construction then destruction)?",
    ["ABCcba", "CABcba", "ABCabc", "CBAcba"],
    0,
    "Bases construct first (A), then members (B), then the C body. Destruction is the reverse: c, then member b, then base a.",
    {
      language: "cpp",
      code: `struct A { A() { std::cout << "A"; } ~A() { std::cout << "a"; } };
struct B { B() { std::cout << "B"; } ~B() { std::cout << "b"; } };
struct C : A {
  B b;
  C() { std::cout << "C"; }
  ~C() { std::cout << "c"; }
};
C x;`,
    },
  ),
  q(
    "pyq-2024-p2p2-oops-04",
    "oops",
    "hard",
    "Both instances share the class-level list. What is printed?",
    ["[1] []", "[1] [1]", "[] [1]", "AttributeError"],
    1,
    "items is a single list on the class object. a.items.append mutates that shared list, so both prints show [1].",
    {
      language: "python",
      code: `class C:
    items = []
a, b = C(), C()
a.items.append(1)
print(a.items, b.items)`,
    },
  ),
  q(
    "pyq-2024-p2p2-oops-05",
    "oops",
    "hard",
    "Java overload resolution prefers the more specific match. What is printed?",
    ["int Integer", "Integer Integer", "int int", "The calls are ambiguous"],
    0,
    "The literal 3 is an int, so f(int) wins. Integer.valueOf(3) is Integer, so f(Integer) wins. Autoboxing is not used when an exact primitive overload exists.",
    {
      language: "java",
      code: `class A {
  void f(int x) { System.out.print("int "); }
  void f(Integer x) { System.out.print("Integer"); }
}
A a = new A();
a.f(3);
a.f(Integer.valueOf(3));`,
    },
  ),
  q(
    "pyq-2024-p2p2-str-01",
    "strings",
    "hard",
    "What does the StringBuilder chain print?",
    ["AXBC", "XABC", "ABXC", "ACXB"],
    0,
    "append(\"C\") yields ABC; insert(1, \"X\") splices X at index 1, producing AXBC.",
    {
      language: "java",
      code: `StringBuilder sb = new StringBuilder("AB");
sb.append("C").insert(1, "X");
System.out.print(sb);`,
    },
  ),
  q(
    "pyq-2024-p2p2-str-02",
    "strings",
    "hard",
    "For s = \"mississippi\", what is printed?",
    ["2 1 ippi", "3 1 ippi", "2 2 ssis", "4 1 ippi"],
    0,
    "Non-overlapping count of \"ss\" finds two runs (indices 2 and 5). \"issi\" occurs once. s[::-1][:4] is the first four characters of the reverse, ippi.",
    {
      language: "python",
      code: `s = "mississippi"
print(s.count("ss"), s.count("issi"), s[::-1][:4])`,
    },
  ),
  q(
    "pyq-2024-p2p2-str-03",
    "strings",
    "hard",
    "Greedy versus lazy quantification on \"abaca\": what are the two findall results in order?",
    [
      "['abaca'] then ['aba']",
      "['aba'] then ['abaca']",
      "['aa'] then ['aca']",
      "['abaca'] then ['abaca']",
    ],
    0,
    "a.*a is greedy and swallows the whole abaca. a.*?a is lazy and stops at the first closing a, matching only aba (the later aca is not a second match because findall continues after the first match).",
    {
      language: "python",
      code: `import re
print(re.findall(r"a.*a", "abaca"))
print(re.findall(r"a.*?a", "abaca"))`,
    },
  ),
];
