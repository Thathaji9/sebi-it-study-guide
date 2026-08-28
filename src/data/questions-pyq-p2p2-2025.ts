import { makeQuestion } from "@/data/make-question";

const q = makeQuestion(2, 2);

export const pyqP2P2_2025 = [
  q(
    "pyq-2025-p2p2-ds-01",
    "ds",
    "hard",
    "Kadane’s algorithm on [-2, 1, -3, 4, -1, 2, 1, -5, 4] reports which maximum subarray sum?",
    ["4", "5", "6", "7"],
    2,
    "The best window is 4 + (−1) + 2 + 1 = 6. Negative prefixes are dropped when cur is reset to the next element.",
    {
      language: "python",
      code: `a = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
best = cur = a[0]
for x in a[1:]:
    cur = max(x, cur + x)
    best = max(best, cur)
print(best)`,
    },
  ),
  q(
    "pyq-2025-p2p2-ds-02",
    "ds",
    "hard",
    "Trapped-rainwater on heights [0,1,0,2,1,0,1,3,2,1,2,1] using left/right maxima totals:",
    ["4", "6", "8", "9"],
    1,
    "Each index i holds min(leftMax[i], rightMax[i]) − h[i] units. Summing those non-negative gaps yields 6.",
    {
      language: "python",
      code: `h = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
n = len(h)
L, R = [0] * n, [0] * n
L[0], R[-1] = h[0], h[-1]
for i in range(1, n):
    L[i] = max(L[i - 1], h[i])
for i in range(n - 2, -1, -1):
    R[i] = max(R[i + 1], h[i])
print(sum(min(L[i], R[i]) - h[i] for i in range(n)))`,
    },
  ),
  q(
    "pyq-2025-p2p2-ds-03",
    "ds",
    "hard",
    "Stock span uses a decreasing stack of indices on prices [100, 80, 60, 70, 60, 75, 85]. What span vector is printed?",
    [
      "[1, 1, 1, 2, 1, 4, 6]",
      "[1, 2, 3, 4, 5, 6, 7]",
      "[1, 1, 1, 1, 1, 3, 7]",
      "[1, 1, 1, 2, 1, 2, 3]",
    ],
    0,
    "Span is 1 plus the count of immediately previous prices that are ≤ today. 75 beats 60,70,60 (span 4); 85 then beats that whole run plus 80 (span 6).",
    {
      language: "python",
      code: `p, st, res = [100, 80, 60, 70, 60, 75, 85], [], []
for i, x in enumerate(p):
    while st and p[st[-1]] <= x:
        st.pop()
    res.append(i + 1 if not st else i - st[-1])
    st.append(i)
print(res)`,
    },
  ),
  q(
    "pyq-2025-p2p2-ds-04",
    "ds",
    "hard",
    "A max-heap [50, 30, 40, 10, 20] deletes its root by moving the last value up and sifting down. The resulting array is:",
    ["[40, 30, 20, 10]", "[40, 20, 30, 10]", "[30, 20, 40, 10]", "[20, 30, 40, 10]"],
    0,
    "20 replaces 50 and swaps with the larger child 40. 20’s new children 10 and (none beyond) need no further swap: [40, 30, 20, 10].",
    {
      language: "python",
      code: `h = [50, 30, 40, 10, 20]
h[0] = h[-1]
h.pop()
i, n = 0, len(h)
while True:
    l, r, m = 2 * i + 1, 2 * i + 2, i
    if l < n and h[l] > h[m]:
        m = l
    if r < n and h[r] > h[m]:
        m = r
    if m == i:
        break
    h[i], h[m] = h[m], h[i]
    i = m
print(h)`,
    },
  ),
  q(
    "pyq-2025-p2p2-ds-05",
    "ds",
    "hard",
    "List 1→2→3→4→5 with 5.next = 3 has a cycle. Floyd’s tortoise/hare first meet at which node value, and the subsequent head-synchronised walk finds which entry?",
    ["meet 3, entry 3", "meet 4, entry 3", "meet 5, entry 4", "meet 2, entry 1"],
    1,
    "Start both at 1. After steps they meet at 4 (inside the 3-4-5 loop of length 3). Resetting one pointer to head and advancing both one step at a time meets at the cycle entry 3.",
    {
      language: "python",
      code: `class N:
    def __init__(self, v):
        self.v, self.nxt = v, None

n1, n2, n3, n4, n5 = N(1), N(2), N(3), N(4), N(5)
n1.nxt, n2.nxt, n3.nxt, n4.nxt, n5.nxt = n2, n3, n4, n5, n3
slow = fast = n1
while True:
    slow, fast = slow.nxt, fast.nxt.nxt
    if slow is fast:
        break
meet = slow.v
p = n1
while p is not slow:
    p, slow = p.nxt, slow.nxt
print(meet, p.v)`,
    },
  ),
  q(
    "pyq-2025-p2p2-ds-06",
    "ds",
    "hard",
    "Double hashing uses table size 13, h1(k)=k mod 13, h2(k)=1+(k mod 11). For k=37 the first three probe indices are:",
    ["11, 4, 10", "11, 3, 8", "11, 5, 12", "2, 6, 10"],
    1,
    "37 mod 13 = 11 and 1+(37 mod 11)=5, so probes are 11, (11+5) mod 13 = 3, (11+10) mod 13 = 8.",
    {
      language: "python",
      code: `h1, h2 = 37 % 13, 1 + (37 % 11)
print([(h1 + i * h2) % 13 for i in range(3)])`,
    },
  ),
  q(
    "pyq-2025-p2p2-ds-07",
    "ds",
    "hard",
    "Right-rotate the list 1→2→3→4→5 by k=2. The new sequence of values is:",
    ["2 3 4 5 1", "5 1 2 3 4", "4 5 1 2 3", "3 4 5 1 2"],
    2,
    "n=5, so the new head is the node after n-k-1 = 2 steps from the old head (node 3’s successor 4). Link 5 back to 1 and cut 3.next.",
    {
      language: "python",
      code: `class N:
    def __init__(self, v, n=None):
        self.v, self.next = v, n

head, k = N(1, N(2, N(3, N(4, N(5))))), 2
n, last, t = 0, None, head
while t:
    n += 1
    last, t = t, t.next
k %= n
p = head
for _ in range(n - k - 1):
    p = p.next
newh, p.next, last.next = p.next, None, head
while newh:
    print(newh.v, end=" ")
    newh = newh.next`,
    },
  ),
  q(
    "pyq-2025-p2p2-ds-08",
    "ds",
    "hard",
    "Keys 1,2,3,4,5 are inserted in that order into an unbalanced BST. If height counts edges from the root, the height is:",
    ["2", "3", "4", "5"],
    2,
    "Increasing keys always go right, forming a chain of 5 nodes and 4 edges.",
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

def height(n):
    if not n:
        return -1
    return 1 + max(height(n.l), height(n.r))

r = None
for v in range(1, 6):
    r = ins(r, v)
print(height(r))`,
    },
  ),
  q(
    "pyq-2025-p2p2-ds-09",
    "ds",
    "hard",
    "A 0-based complete binary tree is stored in an array. The parent index of node 10 is:",
    ["4", "5", "9", "20"],
    0,
    "Parent is floor((i−1)/2) = floor(9/2) = 4 (left child of index 4 would be 9, right child 10).",
    {
      language: "python",
      code: `print((10 - 1) // 2)`,
    },
  ),
  q(
    "pyq-2025-p2p2-ds-10",
    "ds",
    "hard",
    "What nested value is printed from this JSON-like object?",
    ["1", "2", "[1, {'c': 2}]", "KeyError"],
    1,
    "a.b is the list [1, {c:2}]; index 1 is the inner object whose c field is 2.",
    {
      language: "python",
      code: `d = {"a": {"b": [1, {"c": 2}]}}
print(d["a"]["b"][1]["c"])`,
    },
  ),
  q(
    "pyq-2025-p2p2-algo-01",
    "algorithms",
    "hard",
    "Selection sort on [64, 25, 12, 22, 11] swaps whenever the min of the unsorted suffix is not already at i. How many swaps run?",
    ["2", "3", "4", "5"],
    1,
    "The minima 11, 12, 22 sit at the far end and each swap once with positions 0,1,2. 25 is already in place at i=3, so three swaps yield [11, 12, 22, 25, 64].",
    {
      language: "python",
      code: `a, swaps = [64, 25, 12, 22, 11], 0
for i in range(len(a)):
    m = i
    for j in range(i + 1, len(a)):
        if a[j] < a[m]:
            m = j
    if m != i:
        a[i], a[m] = a[m], a[i]
        swaps += 1
print(swaps)`,
    },
  ),
  q(
    "pyq-2025-p2p2-algo-02",
    "algorithms",
    "hard",
    "Unit-cost Levenshtein distance from \"horse\" to \"ros\" is:",
    ["2", "3", "4", "5"],
    1,
    "An optimal alignment is horse → rorse (substitute h→r), rorse → rose (delete r), rose → ros (delete e), for total cost 3. The DP corner stores that minimum.",
    {
      language: "python",
      code: `a, b = "horse", "ros"
m, n = len(a), len(b)
dp = [[0] * (n + 1) for _ in range(m + 1)]
for i in range(m + 1):
    dp[i][0] = i
for j in range(n + 1):
    dp[0][j] = j
for i in range(1, m + 1):
    for j in range(1, n + 1):
        if a[i - 1] == b[j - 1]:
            dp[i][j] = dp[i - 1][j - 1]
        else:
            dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
print(dp[m][n])`,
    },
  ),
  q(
    "pyq-2025-p2p2-algo-03",
    "algorithms",
    "hard",
    "Rod-cutting DP: price[length] = [unused, 1, 5, 8, 9, 10] for lengths 1..5. The optimum revenue for a rod of length 5 is:",
    ["10", "12", "13", "16"],
    2,
    "A cut 2+3 yields 5+8=13, which beats selling the whole rod for 10 or 2+2+1 for 11. dp[5] therefore stores 13.",
    {
      language: "python",
      code: `price, n = [0, 1, 5, 8, 9, 10], 5
dp = [0] * (n + 1)
for i in range(1, n + 1):
    for cut in range(1, i + 1):
        dp[i] = max(dp[i], price[cut] + dp[i - cut])
print(dp[n])`,
    },
  ),
  q(
    "pyq-2025-p2p2-algo-04",
    "algorithms",
    "hard",
    "House-robber DP on houses [2, 7, 9, 3, 1] (no two adjacent) stores what optimum?",
    ["10", "11", "12", "13"],
    2,
    "The recurrence max(skip, take+dp[i-2]) yields 2, 7, 11, 11, 12. Taking 2+9+1 = 12 is optimal.",
    {
      language: "python",
      code: `a = [2, 7, 9, 3, 1]
dp = [0] * len(a)
dp[0], dp[1] = a[0], max(a[0], a[1])
for i in range(2, len(a)):
    dp[i] = max(dp[i - 1], dp[i - 2] + a[i])
print(dp[-1])`,
    },
  ),
  q(
    "pyq-2025-p2p2-algo-05",
    "algorithms",
    "hard",
    "This recursion prints a sequence for n=3. What is the output?",
    ["123", "321", "1213121", "12321"],
    2,
    "f(n) prints f(n-1), then n, then f(n-1). Expanding f(3) gives f(2) 3 f(2) = (1 2 1) 3 (1 2 1) → 1213121. It is a classic divide-and-conquer trace, not a linear loop.",
    {
      language: "cpp",
      code: `void f(int n) {
  if (n == 0) return;
  f(n - 1);
  std::cout << n;
  f(n - 1);
}
f(3);`,
    },
  ),
  q(
    "pyq-2025-p2p2-algo-06",
    "algorithms",
    "hard",
    "The nested loops increment c for n=5. What is printed, and what is the asymptotic class for general n?",
    ["10, which is Θ(n log n)", "15, which is Θ(n^2)", "5, which is Θ(n)", "25, which is Θ(n^2)"],
    0,
    "For each i the inner loop runs floor(n/i) times. The harmonic sum 5+2+1+1+1=10, and in general Σ floor(n/i) = Θ(n log n).",
    {
      language: "cpp",
      code: `int n = 5, c = 0;
for (int i = 1; i <= n; i++)
  for (int j = i; j <= n; j += i)
    c++;
std::cout << c;`,
    },
  ),
  q(
    "pyq-2025-p2p2-algo-07",
    "algorithms",
    "hard",
    "KMP LPS for pattern AAAA is:",
    ["[0, 0, 0, 0]", "[0, 1, 2, 3]", "[1, 2, 3, 4]", "[0, 1, 1, 1]"],
    1,
    "Each new A extends the proper prefix-suffix by one, so LPS[i]=i: [0,1,2,3]. A mismatch would fall back via lps[length-1], but here none occurs.",
    {
      language: "python",
      code: `p = "AAAA"
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
    "pyq-2025-p2p2-oops-01",
    "oops",
    "hard",
    "Java class initialisation order for new B() prints:",
    [
      "As Bs Ai Ac Bi Bc",
      "As Ai Ac Bs Bi Bc",
      "Bs As Bi Bc Ai Ac",
      "Ai Bi As Bs Ac Bc",
    ],
    0,
    "Superclass statics run before subclass statics; then superclass instance initialiser and constructor; then subclass instance initialiser and constructor: As Bs Ai Ac Bi Bc.",
    {
      language: "java",
      code: `class A {
  static { System.out.print("As "); }
  { System.out.print("Ai "); }
  A() { System.out.print("Ac "); }
}
class B extends A {
  static { System.out.print("Bs "); }
  { System.out.print("Bi "); }
  B() { System.out.print("Bc"); }
}
new B();`,
    },
  ),
  q(
    "pyq-2025-p2p2-oops-02",
    "oops",
    "hard",
    "Deleting a D object through a B* when ~B is virtual prints:",
    ["B", "D", "DB", "BD"],
    2,
    "A virtual destructor dispatches to ~D first, then the base ~B, so DB. If ~B were non-virtual the derived destructor would not be guaranteed to run.",
    {
      language: "cpp",
      code: `struct B { virtual ~B() { std::cout << "B"; } };
struct D : B { ~D() { std::cout << "D"; } };
B* p = new D();
delete p;`,
    },
  ),
  q(
    "pyq-2025-p2p2-oops-03",
    "oops",
    "hard",
    "What does this C++ construction print, and why does it differ from the analogous Java program?",
    ["A1B2, because during A’s constructor the dynamic type is still A", "A2B2, as in Java", "A1B1", "B2 only"],
    0,
    "C++ adjusts the vtable to the class whose constructor is currently running, so A::f returns 1. After A completes, B::f is used and prints B2.",
    {
      language: "cpp",
      code: `struct A {
  A() { std::cout << "A" << f(); }
  virtual int f() { return 1; }
};
struct B : A {
  B() { std::cout << "B" << f(); }
  int f() { return 2; }
};
B x;`,
    },
  ),
  q(
    "pyq-2025-p2p2-oops-04",
    "oops",
    "hard",
    "Python name-mangling: what is printed?",
    ["7 False True", "7 True True", "AttributeError immediately", "7 True False"],
    0,
    "__x inside class A is stored as _A__x. Direct a.__x is absent (False), but a._A__x exists (True). g() still reads the mangled name and returns 7.",
    {
      language: "python",
      code: `class A:
    def __init__(self):
        self.__x = 7
    def g(self):
        return self.__x
a = A()
print(a.g(), hasattr(a, "__x"), hasattr(a, "_A__x"))`,
    },
  ),
  q(
    "pyq-2025-p2p2-oops-05",
    "oops",
    "hard",
    "Overload resolution uses the compile-time argument type. What does p.show(\"sebi\") print?",
    ["PO", "CO", "CS", "A compile-time error"],
    1,
    "p has static type Parent, so only show(Object) is considered. Dynamic dispatch then runs Child.show(Object) → CO. The String overload is not in the overload set.",
    {
      language: "java",
      code: `class Parent {
  String show(Object x) { return "PO"; }
}
class Child extends Parent {
  @Override String show(Object x) { return "CO"; }
  String show(String x) { return "CS"; }
}
Parent p = new Child();
System.out.print(p.show("sebi"));`,
    },
  ),
  q(
    "pyq-2025-p2p2-str-01",
    "strings",
    "hard",
    "What does this Java fragment print?",
    ["true false true", "true true true", "false false true", "true false false"],
    0,
    "String literals intern, so a==b. new String(\"IT\") allocates a distinct object, so a==c is false, while equals compares contents and is true.",
    {
      language: "java",
      code: `String a = "IT";
String b = "IT";
String c = new String("IT");
System.out.print((a == b) + " " + (a == c) + " " + a.equals(c));`,
    },
  ),
  q(
    "pyq-2025-p2p2-str-02",
    "strings",
    "hard",
    "What groups does the search capture from \"SEBI-12-09-IT\"?",
    ["('SEBI', 'IT')", "('12', '09')", "('12-09',)", "None, because of the hyphens"],
    1,
    "(\\d{2})-(\\d{2}) matches the first two-digit/hyphen/two-digit run, capturing 12 and 09. search, unlike fullmatch, need not consume the whole string.",
    {
      language: "python",
      code: `import re
m = re.search(r"(\\d{2})-(\\d{2})", "SEBI-12-09-IT")
print(m.groups())`,
    },
  ),
  q(
    "pyq-2025-p2p2-str-03",
    "strings",
    "moderate",
    "Which statement about the three fullmatch attempts on ^\\d{2,4}$ is correct?",
    [
      "\"123\" matches; \"1\" and \"12345\" do not",
      "All three match",
      "Only \"12345\" matches because + is greedy",
      "\"1\" matches because {2,4} is optional",
    ],
    0,
    "{2,4} needs between two and four digits for the whole string. 123 is length 3 (ok); 1 is too short; 12345 is too long.",
    {
      language: "python",
      code: `import re
pat = r"^\\d{2,4}$"
print(bool(re.fullmatch(pat, "123")),
      bool(re.fullmatch(pat, "1")),
      bool(re.fullmatch(pat, "12345")))`,
    },
  ),
];
