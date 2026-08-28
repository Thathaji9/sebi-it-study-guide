import { makeQuestion } from "@/data/make-question";

const q = makeQuestion(2, 2);

export const pyqP2P2_2022 = [
  q(
    "pyq-2022-p2p2-ds-01",
    "ds",
    "hard",
    "What is printed after the in-place two-pointer reversal?",
    ["[5, 1, 4, 1, 3]", "[3, 1, 4, 1, 5]", "[5, 4, 1, 1, 3]", "[1, 3, 4, 1, 5]"],
    0,
    "The pointers swap a[0] with a[4], then a[1] with a[3], and meet at the middle 4, producing [5, 1, 4, 1, 3].",
    {
      language: "python",
      code: `a = [3, 1, 4, 1, 5]
i, j = 0, len(a) - 1
while i < j:
    a[i], a[j] = a[j], a[i]
    i += 1
    j -= 1
print(a)`,
    },
  ),
  q(
    "pyq-2022-p2p2-ds-02",
    "ds",
    "hard",
    "Nodes hold 1→2→3→4. After this in-place reverse, the values reachable from the returned head are:",
    ["1 2 3 4", "4 3 2 1", "2 1 4 3", "4 1 2 3"],
    1,
    "Each iteration saves nxt, points curr at prev, then advances. After four steps prev is the original tail 4, so the list prints 4 3 2 1.",
    {
      language: "python",
      code: `class Node:
    def __init__(self, v, nxt=None):
        self.v, self.nxt = v, nxt

head = Node(1, Node(2, Node(3, Node(4))))
prev, curr = None, head
while curr:
    nxt = curr.nxt
    curr.nxt = prev
    prev = curr
    curr = nxt
p = prev
while p:
    print(p.v, end=" ")
    p = p.nxt`,
    },
  ),
  q(
    "pyq-2022-p2p2-ds-03",
    "ds",
    "hard",
    "This monotonic stack computes the next strictly greater element to the right (−1 if none). What is printed for [4, 5, 2, 25]?",
    ["[5, 25, 25, -1]", "[5, 25, 25, 25]", "[-1, -1, 25, -1]", "[5, -1, 25, -1]"],
    0,
    "4 is resolved by 5; both 5 and 2 are resolved when 25 arrives; 25 never sees a larger value, so the vector is [5, 25, 25, -1].",
    {
      language: "python",
      code: `a = [4, 5, 2, 25]
res, st = [-1] * len(a), []
for i, x in enumerate(a):
    while st and a[st[-1]] < x:
        res[st.pop()] = x
    st.append(i)
print(res)`,
    },
  ),
  q(
    "pyq-2022-p2p2-ds-04",
    "ds",
    "hard",
    "A queue is simulated with two stacks: enqueue pushes onto s1; dequeue, if s2 is empty, pours s1 onto s2 then pops s2. After enqueue 4, 6, 9 and one dequeue, what are s1 and s2 (bottoms first)?",
    [
      "s1=[], s2=[9, 6]",
      "s1=[4, 6, 9], s2=[]",
      "s1=[], s2=[6, 9]",
      "s1=[9, 6], s2=[]",
    ],
    0,
    "Pouring reverses 4,6,9 onto s2 as bottom→top [9,6,4]. Popping for dequeue removes 4, leaving s2 bottom→top [9, 6] and s1 empty.",
    {
      language: "python",
      code: `s1, s2 = [], []
for x in [4, 6, 9]:
    s1.append(x)
if not s2:
    while s1:
        s2.append(s1.pop())
print(s2.pop(), s1, s2)`,
    },
  ),
  q(
    "pyq-2022-p2p2-ds-05",
    "ds",
    "hard",
    "Keys 15, 10, 20, 8, 12, 17, 25 are inserted into an empty BST (no balancing). What is the postorder traversal?",
    [
      "15 10 8 12 20 17 25",
      "8 12 10 17 25 20 15",
      "8 10 12 15 17 20 25",
      "15 20 25 17 10 12 8",
    ],
    1,
    "Left subtree of 15 is 10 with children 8 and 12; right is 20 with 17 and 25. Postorder emits left, right, root: 8 12 10, then 17 25 20, then 15.",
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

def post(n, o):
    if not n:
        return
    post(n.l, o)
    post(n.r, o)
    o.append(n.v)

r = None
for v in [15, 10, 20, 8, 12, 17, 25]:
    r = ins(r, v)
out = []
post(r, out)
print(out)`,
    },
  ),
  q(
    "pyq-2022-p2p2-ds-06",
    "ds",
    "hard",
    "A 0-based min-heap array starts as [3, 8, 5]. After inserting 1 with swim, the array is:",
    ["[1, 8, 5, 3]", "[1, 3, 5, 8]", "[3, 1, 5, 8]", "[1, 8, 3, 5]"],
    1,
    "1 is appended as the left child of 8, swapped with 8, then swapped with root 3, yielding [1, 3, 5, 8].",
    {
      language: "python",
      code: `h = [3, 8, 5]
h.append(1)
i = len(h) - 1
while i > 0:
    p = (i - 1) // 2
    if h[i] < h[p]:
        h[i], h[p] = h[p], h[i]
        i = p
    else:
        break
print(h)`,
    },
  ),
  q(
    "pyq-2022-p2p2-ds-07",
    "ds",
    "hard",
    "An initially empty table of size 7 uses h(k)=k mod 7 and linear probing. Inserting 10, then 17, then 24 occupies which indices?",
    ["3, 3, 3", "3, 4, 5", "3, 5, 0", "0, 1, 2"],
    1,
    "Each key hashes to 3. Linear probing takes the next free slots, so 10→3, 17→4, 24→5.",
    {
      language: "python",
      code: `size = 7
t = [None] * size
for k in [10, 17, 24]:
    i = k % size
    while t[i] is not None:
        i = (i + 1) % size
    t[i] = k
print(t)`,
    },
  ),
  q(
    "pyq-2022-p2p2-ds-08",
    "ds",
    "hard",
    "A 3×3 matrix is rotated 90° clockwise by transposing and then reversing each row. What is printed?",
    [
      "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]",
      "[[3, 6, 9], [2, 5, 8], [1, 4, 7]]",
      "[[9, 8, 7], [6, 5, 4], [3, 2, 1]]",
      "[[1, 4, 7], [2, 5, 8], [3, 6, 9]]",
    ],
    0,
    "Transpose yields [[1,4,7],[2,5,8],[3,6,9]]. Reversing each row produces [[7,4,1],[8,5,2],[9,6,3]].",
    {
      language: "python",
      code: `m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
t = [list(row) for row in zip(*m)]
rot = [row[::-1] for row in t]
print(rot)`,
    },
  ),
  q(
    "pyq-2022-p2p2-ds-09",
    "ds",
    "hard",
    "Floyd’s middle-node walk starts both pointers at the head of 1→2→3→4. What value does slow hold when the loop ends?",
    ["1", "2", "3", "4"],
    2,
    "Iteration 1: slow=2, fast=3. Iteration 2: slow=3, fast=None because 3.next.next is None. For even length this lands on the second middle, node 3.",
    {
      language: "python",
      code: `class Node:
    def __init__(self, v, nxt=None):
        self.v, self.nxt = v, nxt

head = Node(1, Node(2, Node(3, Node(4))))
slow = fast = head
while fast and fast.nxt:
    slow = slow.nxt
    fast = fast.nxt.nxt
print(slow.v)`,
    },
  ),
  q(
    "pyq-2022-p2p2-ds-10",
    "ds",
    "hard",
    "A nested mapping (JSON-like) is queried as shown. What is printed?",
    ["7", "9", "[7, 9]", "KeyError"],
    1,
    "rows[1] is the second object, whose v field is 9.",
    {
      language: "python",
      code: `d = {"rows": [{"v": 7}, {"v": 9}]}
print(d["rows"][1]["v"])`,
    },
  ),
  q(
    "pyq-2022-p2p2-algo-01",
    "algorithms",
    "hard",
    "Binary search looks for 7 in the 0-based sorted array [1, 3, 5, 7, 9, 11]. How many mid-element comparisons occur before it returns, and which index is found?",
    ["2 comparisons, index 2", "3 comparisons, index 3", "4 comparisons, index 3", "1 comparison, index 3"],
    1,
    "mids are index 2 (value 5), then 4 (value 9), then 3 (value 7). Three comparisons locate index 3.",
    {
      language: "python",
      code: `a = [1, 3, 5, 7, 9, 11]
lo, hi, steps = 0, len(a) - 1, 0
while lo <= hi:
    mid = (lo + hi) // 2
    steps += 1
    if a[mid] == 7:
        print(mid, steps)
        break
    elif a[mid] < 7:
        lo = mid + 1
    else:
        hi = mid - 1`,
    },
  ),
  q(
    "pyq-2022-p2p2-algo-02",
    "algorithms",
    "hard",
    "Lomuto partition uses the last element as pivot on [10, 80, 30, 90, 40, 50, 70]. After one partition, the array and pivot index are:",
    [
      "[10, 30, 40, 50, 70, 90, 80] at index 4",
      "[10, 30, 40, 50, 70, 80, 90] at index 4",
      "[70, 10, 30, 40, 50, 80, 90] at index 0",
      "[10, 80, 30, 90, 40, 50, 70] at index 6",
    ],
    0,
    "Values ≤70 are swapped leftward in order 10,30,40,50; the pivot then swaps into index 4, leaving 90 and 80 on its right.",
    {
      language: "python",
      code: `a = [10, 80, 30, 90, 40, 50, 70]
pivot, i = a[-1], -1
for j in range(len(a) - 1):
    if a[j] <= pivot:
        i += 1
        a[i], a[j] = a[j], a[i]
a[i + 1], a[-1] = a[-1], a[i + 1]
print(a, i + 1)`,
    },
  ),
  q(
    "pyq-2022-p2p2-algo-03",
    "algorithms",
    "hard",
    "The standard two-pointer merge of sorted runs L=[1,4,7] and R=[2,3,8] produces:",
    ["[1, 4, 7, 2, 3, 8]", "[1, 2, 3, 4, 7, 8]", "[1, 2, 4, 3, 7, 8]", "[8, 7, 4, 3, 2, 1]"],
    1,
    "At each step the smaller head is taken: 1, then 2, 3, 4, 7, then leftover 8.",
    {
      language: "python",
      code: `L, R = [1, 4, 7], [2, 3, 8]
i = j = 0
out = []
while i < len(L) and j < len(R):
    if L[i] <= R[j]:
        out.append(L[i])
        i += 1
    else:
        out.append(R[j])
        j += 1
out.extend(L[i:])
out.extend(R[j:])
print(out)`,
    },
  ),
  q(
    "pyq-2022-p2p2-algo-04",
    "algorithms",
    "hard",
    "0/1 knapsack DP with capacity 5 and items (weight,value)=(1,1), (2,6), (3,10) stores what optimum in dp[3][5]?",
    ["7", "11", "16", "17"],
    2,
    "The table chooses item 3 plus item 2 (weights 3+2) for 10+6=16, which beats 1+6=7 or 10+1=11.",
    {
      language: "python",
      code: `items = [(1, 1), (2, 6), (3, 10)]
W, n = 5, 3
dp = [[0] * (W + 1) for _ in range(n + 1)]
for i in range(1, n + 1):
    w, v = items[i - 1]
    for c in range(W + 1):
        dp[i][c] = dp[i - 1][c]
        if w <= c:
            dp[i][c] = max(dp[i][c], dp[i - 1][c - w] + v)
print(dp[n][W])`,
    },
  ),
  q(
    "pyq-2022-p2p2-algo-05",
    "algorithms",
    "hard",
    "Unweighted interval scheduling on (start,finish) pairs (1,4), (3,5), (0,6), (5,7), (8,9), (5,9) uses earliest-finish greedy. How many intervals are selected, and which ones?",
    [
      "2: (0,6) and (8,9)",
      "3: (1,4), (5,7), (8,9)",
      "3: (3,5), (5,7), (8,9)",
      "4: (1,4), (3,5), (5,7), (8,9)",
    ],
    1,
    "Sort by finish: (1,4) is first, (3,5) and (0,6) overlap it, (5,7) is next compatible, then (8,9). Three intervals. Earliest-finish is the greedy rule that maximises count; 0/1 knapsack on values would be DP instead.",
  ),
  q(
    "pyq-2022-p2p2-algo-06",
    "algorithms",
    "hard",
    "A subset-sum backtracker counts subsets of [1, 2, 3, 6] that sum to 6 (each item used at most once). How many subsets are counted?",
    ["1", "2", "3", "4"],
    1,
    "The accepting leaves are {1,2,3} and {6}. No other combination of the distinct items totals 6.",
    {
      language: "python",
      code: `nums, target = [1, 2, 3, 6], 6

def dfs(i, s):
    if s == target:
        return 1
    if i == len(nums) or s > target:
        return 0
    return dfs(i + 1, s + nums[i]) + dfs(i + 1, s)

print(dfs(0, 0))`,
    },
  ),
  q(
    "pyq-2022-p2p2-algo-07",
    "algorithms",
    "hard",
    "KMP builds the LPS (longest proper prefix that is also a suffix) array for pattern ABABCABAB. What is printed?",
    [
      "[0, 0, 1, 2, 0, 1, 2, 3, 4]",
      "[0, 1, 2, 3, 0, 1, 2, 3, 4]",
      "[0, 0, 0, 1, 2, 0, 1, 2, 3]",
      "[1, 2, 0, 1, 2, 3, 4, 0, 0]",
    ],
    0,
    "Matches grow through ABAB, reset at the C (LPS 0), then rebuild ABAB as a prefix-suffix of length 4: [0,0,1,2,0,1,2,3,4].",
    {
      language: "python",
      code: `p = "ABABCABAB"
lps, length, i = [0] * len(p), 0, 1
while i < len(p):
    if p[i] == p[length]:
        length += 1
        lps[i] = length
        i += 1
    elif length:
        length = lps[length - 1]
    else:
        lps[i] = 0
        i += 1
print(lps)`,
    },
  ),
  q(
    "pyq-2022-p2p2-oops-01",
    "oops",
    "hard",
    "In Java, a constructor of A calls overridable f(). What does constructing B print?",
    ["A1 B1", "A1 B2", "A2 B2", "A2 B1"],
    2,
    "Unlike C++, Java instance methods are dispatched on the runtime type even while a superclass constructor is running. Both calls therefore execute B.f() and print A2 B2.",
    {
      language: "java",
      code: `class A {
  A() { System.out.print("A" + f() + " "); }
  int f() { return 1; }
}
class B extends A {
  int f() { return 2; }
  B() { System.out.print("B" + f()); }
}
new B();`,
    },
  ),
  q(
    "pyq-2022-p2p2-oops-02",
    "oops",
    "hard",
    "What is printed through the base pointer?",
    ["B", "D", "BD", "The program does not compile"],
    1,
    "f is virtual, so the call uses D’s vtable entry and prints D. Without virtual it would bind to B::f at compile time.",
    {
      language: "cpp",
      code: `struct B { virtual void f() { std::cout << "B"; } };
struct D : B { void f() { std::cout << "D"; } };
B* p = new D();
p->f();`,
    },
  ),
  q(
    "pyq-2022-p2p2-oops-03",
    "oops",
    "hard",
    "What does this Java fragment print?",
    ["A", "B", "AB", "Compilation fails"],
    0,
    "A.call() invokes A’s private p(), which is not inherited and is not overridden by B’s package-visible p(). Dynamic dispatch never sees B.p().",
    {
      language: "java",
      code: `class A {
  private void p() { System.out.print("A"); }
  void call() { p(); }
}
class B extends A {
  void p() { System.out.print("B"); }
}
A x = new B();
x.call();`,
    },
  ),
  q(
    "pyq-2022-p2p2-oops-04",
    "oops",
    "hard",
    "What is printed?",
    ["2 2", "2 1", "1 1", "AttributeError"],
    1,
    "a.x += 1 reads class attribute 1 then writes instance attribute a.x=2. b still looks up C.x, which remains 1.",
    {
      language: "python",
      code: `class C:
    x = 1
a = C()
b = C()
a.x += 1
print(a.x, b.x)`,
    },
  ),
  q(
    "pyq-2022-p2p2-oops-05",
    "oops",
    "hard",
    "Java private fields are inaccessible from other classes, yet this compiles. What is printed, and why is that allowed?",
    [
      "4, because private is per-class: leak may read other.n of another Box",
      "4, because private is per-object and any method of any class may read n",
      "Compilation fails: other.n is a different instance",
      "0, because n is not initialised for other",
    ],
    0,
    "Encapsulation in Java hides n from foreign types, not from other instances of Box. leak(Box other) may legally read other.n.",
    {
      language: "java",
      code: `class Box {
  private int n = 4;
  int leak(Box other) { return other.n; }
}
Box a = new Box();
Box b = new Box();
System.out.print(a.leak(b));`,
    },
  ),
  q(
    "pyq-2022-p2p2-str-01",
    "strings",
    "hard",
    "What does this Java fragment print?",
    ["EB 2 4", "SE 1 4", "EB 1 4", "BI 2 3"],
    0,
    "substring(1,3) is end-exclusive so characters at 1 and 2 yield EB. indexOf('B') is 2. length is 4.",
    {
      language: "java",
      code: `String s = "SEBI";
System.out.print(s.substring(1, 3) + " " + s.indexOf('B') + " " + s.length());`,
    },
  ),
  q(
    "pyq-2022-p2p2-str-02",
    "strings",
    "hard",
    "What list does the Python regex produce?",
    ["['A12', 'B3', 'C45']", "['12', '3', '45']", "['1', '2', '3', '4', '5']", "['A12B3C45']"],
    1,
    "\\d+ consumes maximal digit runs, so the non-digits split the string into 12, 3 and 45.",
    {
      language: "python",
      code: `import re
print(re.findall(r"\\d+", "A12B3C45"))`,
    },
  ),
  q(
    "pyq-2022-p2p2-str-03",
    "strings",
    "hard",
    "C++ std::string::substr(pos, count) takes a length, not an exclusive end. What is printed for s = \"GRADE-A\"?",
    ["RAD 2 7", "RAD 4 7", "RADE 2 7", "RADE- 0 7"],
    0,
    "substr(1,3) copies three characters starting at index 1: RAD. find(\"A\") returns the first A at index 2. size() is 7.",
    {
      language: "cpp",
      code: `std::string s = "GRADE-A";
std::cout << s.substr(1, 3) << " " << s.find("A") << " " << s.size();`,
    },
  ),
];
