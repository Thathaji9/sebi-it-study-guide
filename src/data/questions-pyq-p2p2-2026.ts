import { makeQuestion } from "@/data/make-question";

const q = makeQuestion(2, 2);

export const pyqP2P2_2026 = [
  q(
    "pyq-2026-p2p2-ds-01",
    "ds",
    "hard",
    "The array [1,2,3,4,5,6,7] is rotated right by k=3 using slice concatenation. What is printed?",
    ["[3, 4, 5, 6, 7, 1, 2]", "[5, 6, 7, 1, 2, 3, 4]", "[4, 5, 6, 7, 1, 2, 3]", "[7, 6, 5, 4, 3, 2, 1]"],
    1,
    "k %= n leaves k=3. The last three elements 5,6,7 move to the front, followed by the prefix 1..4.",
    {
      language: "python",
      code: `a, k = [1, 2, 3, 4, 5, 6, 7], 3
k %= len(a)
a = a[-k:] + a[:-k]
print(a)`,
    },
  ),
  q(
    "pyq-2026-p2p2-ds-02",
    "ds",
    "hard",
    "Overlapping intervals [[1,3],[2,6],[8,10],[15,18]] are merged in-place on a sorted list. What remains?",
    [
      "[[1, 3], [2, 6], [8, 10], [15, 18]]",
      "[[1, 6], [8, 10], [15, 18]]",
      "[[1, 18]]",
      "[[2, 6], [8, 10], [15, 18]]",
    ],
    1,
    "[1,3] and [2,6] overlap so they become [1,6]. The later intervals do not touch that range.",
    {
      language: "python",
      code: `iv = [[1, 3], [2, 6], [8, 10], [15, 18]]
iv.sort()
m = [iv[0]]
for s, e in iv[1:]:
    if s <= m[-1][1]:
        m[-1][1] = max(m[-1][1], e)
    else:
        m.append([s, e])
print(m)`,
    },
  ),
  q(
    "pyq-2026-p2p2-ds-03",
    "ds",
    "hard",
    "A next-smaller-to-the-right stack on [4, 5, 2, 10, 8] prints:",
    ["[2, 2, -1, 8, -1]", "[2, 2, -1, -1, -1]", "[5, 10, 10, -1, -1]", "[2, 2, 8, 8, -1]"],
    0,
    "4 and 5 are both resolved by 2; 2 never sees a smaller value; 10 is resolved by 8; 8 has none. Hence [2, 2, -1, 8, -1].",
    {
      language: "python",
      code: `a = [4, 5, 2, 10, 8]
res, st = [-1] * len(a), []
for i, x in enumerate(a):
    while st and a[st[-1]] > x:
        res[st.pop()] = x
    st.append(i)
print(res)`,
    },
  ),
  q(
    "pyq-2026-p2p2-ds-04",
    "ds",
    "hard",
    "Circular next-greater on [1, 2, 1] (the array is conceptually concatenated once) prints:",
    ["[2, -1, 2]", "[2, 1, 2]", "[2, 2, 2]", "[-1, -1, 2]"],
    0,
    "Index 0’s 1 sees 2; index 1’s 2 has no greater in the wrap-around; index 2’s 1 sees the 2 at index 1 after wrapping. Result [2, -1, 2].",
    {
      language: "python",
      code: `a = [1, 2, 1]
n, res, st = len(a), [-1] * 3, []
for i in range(2 * n):
    x = a[i % n]
    while st and a[st[-1]] < x:
        res[st.pop()] = x
    if i < n:
        st.append(i)
print(res)`,
    },
  ),
  q(
    "pyq-2026-p2p2-ds-05",
    "ds",
    "hard",
    "A 0-based min-heap is grown by inserting 5, 3, 8, 1, 4 with swim after each insert. The final array is:",
    ["[1, 3, 8, 5, 4]", "[1, 4, 8, 5, 3]", "[1, 3, 5, 8, 4]", "[5, 3, 8, 1, 4]"],
    0,
    "After 5,3,8 the heap is [3,5,8]. Inserting 1 swims to the root: [1,5,8,3] then the last insert 4 swaps with 5, producing [1, 3, 8, 5, 4].",
    {
      language: "python",
      code: `h = []

def push(x):
    h.append(x)
    i = len(h) - 1
    while i > 0:
        p = (i - 1) // 2
        if h[i] < h[p]:
            h[i], h[p] = h[p], h[i]
            i = p
        else:
            break

for x in [5, 3, 8, 1, 4]:
    push(x)
print(h)`,
    },
  ),
  q(
    "pyq-2026-p2p2-ds-06",
    "ds",
    "hard",
    "This C++ walk stops at the node whose next.next is null on 1→2→3. What is printed?",
    ["1", "2", "3", "Segmentation fault is guaranteed"],
    1,
    "p starts at 1; 1→2→3 so next.next is non-null and p advances to 2. From 2, next.next is null, so the loop ends and p->v is 2 (the penultimate node).",
    {
      language: "cpp",
      code: `struct Node {
  int v; Node* next;
  Node(int x, Node* n = nullptr) : v(x), next(n) {}
};
Node* h = new Node(1, new Node(2, new Node(3)));
Node* p = h;
while (p->next->next) p = p->next;
std::cout << p->v;`,
    },
  ),
  q(
    "pyq-2026-p2p2-ds-07",
    "ds",
    "hard",
    "A Java ArrayDeque is used as a stack: push 1,2,3 then pop, peek, pop. What is printed?",
    ["321", "322", "123", "312"],
    1,
    "After three pushes the top is 3. pop prints 3, peek still sees 2, the second pop prints 2, giving 322.",
    {
      language: "java",
      code: `Deque<Integer> st = new ArrayDeque<>();
st.push(1); st.push(2); st.push(3);
System.out.print(st.pop() + "" + st.peek() + "" + st.pop());`,
    },
  ),
  q(
    "pyq-2026-p2p2-ds-08",
    "ds",
    "hard",
    "BST built from 50,30,70,20,40,60,80. Deleting 50 by replacing it with its inorder successor uses which key?",
    ["40", "60", "70", "80"],
    1,
    "The inorder successor of a node with two children is the minimum of the right subtree, here 60.",
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

def minn(n):
    while n.l:
        n = n.l
    return n

r = None
for v in [50, 30, 70, 20, 40, 60, 80]:
    r = ins(r, v)
print(minn(r.r).v)`,
    },
  ),
  q(
    "pyq-2026-p2p2-ds-09",
    "ds",
    "hard",
    "For the 3×3 matrix below, a[2][0] + a[0][2] evaluates to:",
    ["6", "8", "10", "12"],
    2,
    "a[2][0] is 7 and a[0][2] is 3, summing to 10. Row-major layout does not change the logical indices.",
    {
      language: "cpp",
      code: `int a[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
std::cout << a[2][0] + a[0][2];`,
    },
  ),
  q(
    "pyq-2026-p2p2-ds-10",
    "ds",
    "hard",
    "Two-sum with a hash map on [2, 7, 11, 15], target 9, prints which 0-based index pair?",
    ["0 1", "1 2", "0 3", "2 3"],
    0,
    "2 is stored at index 0; 7 finds 9−7=2 already in the map, so indices 0 and 1 are reported.",
    {
      language: "python",
      code: `a, t, seen = [2, 7, 11, 15], 9, {}
for i, x in enumerate(a):
    if t - x in seen:
        print(seen[t - x], i)
        break
    seen[x] = i`,
    },
  ),
  q(
    "pyq-2026-p2p2-algo-01",
    "algorithms",
    "hard",
    "Postfix evaluation of 4 5 2 * 3 + + uses a stack of integers. What is the result?",
    ["14", "17", "24", "40"],
    1,
    "5 2 * yields 10; 10 3 + yields 13; 4 13 + yields 17. The operators bind left-to-right from the stack, not from infix precedence rereadings.",
    {
      language: "python",
      code: `st = []
for t in "4 5 2 * 3 + +".split():
    if t in "+-*":
        b, a = st.pop(), st.pop()
        st.append(a + b if t == "+" else a - b if t == "-" else a * b)
    else:
        st.append(int(t))
print(st[-1])`,
    },
  ),
  q(
    "pyq-2026-p2p2-algo-02",
    "algorithms",
    "hard",
    "Shunting-yard (stack of operators, conventional precedence, left associativity) converts a+b*(c-d) to postfix:",
    ["abc-d*+", "abcd-*+", "ab+cd-*", "a+b*c-d"],
    1,
    "* waits until the parenthesised subtraction is emitted as cd-, then * and finally +. The postfix is abcd-*+.",
    {
      language: "python",
      code: `def prec(op):
    return {"+": 1, "-": 1, "*": 2, "/": 2}.get(op, 0)

expr, out, st = "a+b*(c-d)", [], []
for ch in expr:
    if ch.isalpha():
        out.append(ch)
    elif ch == "(":
        st.append(ch)
    elif ch == ")":
        while st[-1] != "(":
            out.append(st.pop())
        st.pop()
    else:
        while st and prec(st[-1]) >= prec(ch):
            out.append(st.pop())
        st.append(ch)
while st:
    out.append(st.pop())
print("".join(out))`,
    },
  ),
  q(
    "pyq-2026-p2p2-algo-03",
    "algorithms",
    "hard",
    "Unique-paths DP on a 3×3 grid (moves only right or down) stores what in the bottom-right cell?",
    ["3", "4", "6", "9"],
    2,
    "First row and column stay 1. Interior cells sum from above and left: the 2×2 interior becomes 2,3 / 3,6. Six paths exist from corner to corner.",
    {
      language: "python",
      code: `m = n = 3
dp = [[1] * n for _ in range(m)]
for i in range(1, m):
    for j in range(1, n):
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
print(dp[-1][-1])`,
    },
  ),
  q(
    "pyq-2026-p2p2-algo-04",
    "algorithms",
    "hard",
    "LCS length of AGGTAB and GXTXAYB is:",
    ["2", "3", "4", "5"],
    2,
    "GTAB is a common subsequence of length 4. The DP table’s corner stores 4; no length-5 common subsequence exists.",
    {
      language: "python",
      code: `a, b = "AGGTAB", "GXTXAYB"
m, n = len(a), len(b)
dp = [[0] * (n + 1) for _ in range(m + 1)]
for i in range(1, m + 1):
    for j in range(1, n + 1):
        if a[i - 1] == b[j - 1]:
            dp[i][j] = dp[i - 1][j - 1] + 1
        else:
            dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
print(dp[m][n])`,
    },
  ),
  q(
    "pyq-2026-p2p2-algo-05",
    "algorithms",
    "hard",
    "Bubble sort on [4, 1, 3, 2] counts every adjacent swap. How many swaps occur?",
    ["3", "4", "5", "6"],
    1,
    "Pass 1: 4↔1, 4↔3, 4↔2 (three swaps) → [1,3,2,4]. Pass 2: 3↔2 (one swap) → [1,2,3,4]. Pass 3 does nothing. Total 4, equal to the inversion count.",
    {
      language: "cpp",
      code: `int a[] = {4, 1, 3, 2};
int n = 4, swaps = 0;
for (int i = 0; i < n - 1; i++)
  for (int j = 0; j < n - 1 - i; j++)
    if (a[j] > a[j + 1]) {
      int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
      swaps++;
    }
std::cout << swaps;`,
    },
  ),
  q(
    "pyq-2026-p2p2-algo-06",
    "algorithms",
    "hard",
    "Jump-game II on nums = [2, 3, 1, 1, 4] (greedy farthest reach) reports how many jumps?",
    ["1", "2", "3", "4"],
    1,
    "From index 0 the window ends at 2; the farthest reachable is 4 via the 3 at index 1. One jump expands the window, the next jump lands on the last index: 2 jumps.",
    {
      language: "python",
      code: `a, jumps, end, farthest = [2, 3, 1, 1, 4], 0, 0, 0
for i in range(len(a) - 1):
    farthest = max(farthest, i + a[i])
    if i == end:
        jumps += 1
        end = farthest
print(jumps)`,
    },
  ),
  q(
    "pyq-2026-p2p2-algo-07",
    "algorithms",
    "hard",
    "KMP LPS for ABCAB is:",
    ["[0, 0, 0, 1, 2]", "[0, 1, 2, 0, 1]", "[0, 0, 1, 2, 0]", "[1, 0, 0, 1, 2]"],
    0,
    "No prefix-suffix until the second A (index 3) matches p[0], then B matches p[1], giving [0,0,0,1,2]. That LPS lets a later search shift to the prefix AB after a mismatch.",
    {
      language: "python",
      code: `p = "ABCAB"
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
    "pyq-2026-p2p2-oops-01",
    "oops",
    "moderate",
    "Compile-time polymorphism in C++ is mainly achieved using ________ and ________.",
    [
      "inheritance and pointers",
      "virtual functions and inheritance",
      "function overloading and operator overloading",
      "dynamic binding and a base-class reference",
    ],
    2,
    "Overloading of functions and of operators is resolved using the static types of the arguments, i.e. at compile time. Virtual functions plus a base pointer/reference give run-time (dynamic) polymorphism, not compile-time.",
    {
      language: "cpp",
      code: `int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }
// add(2, 3) binds to the int overload at compile time
// a virtual f() on a base pointer would bind at run time instead`,
    },
  ),
  q(
    "pyq-2026-p2p2-oops-02",
    "oops",
    "hard",
    "Python C3 MRO for class D(B, C) with B(A) and C(A): cooperative super().f() on D() prints:",
    ["D B A C", "D B C A", "D C B A", "A C B D"],
    1,
    "MRO is D, B, C, A, object. Each f prints its name then super().f(), so the output is D B C A.",
    {
      language: "python",
      code: `class A:
    def f(self):
        print("A", end=" ")
class B(A):
    def f(self):
        print("B", end=" "); super().f()
class C(A):
    def f(self):
        print("C", end=" "); super().f()
class D(B, C):
    def f(self):
        print("D", end=" "); super().f()
D().f()`,
    },
  ),
  q(
    "pyq-2026-p2p2-oops-03",
    "oops",
    "hard",
    "A class implements two interfaces that both provide default f(). The class resolves the clash by calling both. What is printed?",
    ["I", "J", "IJ", "Compilation fails and cannot be resolved"],
    2,
    "Java rejects the class unless it overrides f. The override may explicitly choose I.super.f() and J.super.f(), concatenating to IJ.",
    {
      language: "java",
      code: `interface I { default String f() { return "I"; } }
interface J { default String f() { return "J"; } }
class C implements I, J {
  public String f() { return I.super.f() + J.super.f(); }
}
System.out.print(new C().f());`,
    },
  ),
  q(
    "pyq-2026-p2p2-oops-04",
    "oops",
    "hard",
    "Overloaded add(int,int) and add(double,double) are called as add(2,3) and add(2.5, 0.5). What is printed?",
    ["5 3", "5 3.0", "5.0 3.0", "The int call is ambiguous"],
    0,
    "Compile-time overload resolution picks add(int,int) for 2 and 3, printing 5. add(2.5, 0.5) binds to add(double,double). iostream's default format writes the whole value 3.0 as 3, so the line is 5 3.",
    {
      language: "cpp",
      code: `int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }
std::cout << add(2, 3) << " " << add(2.5, 0.5);`,
    },
  ),
  q(
    "pyq-2026-p2p2-oops-05",
    "oops",
    "hard",
    "Child.__init__ prints C0, then super().__init__, then C1. What is printed?",
    ["BC0C1", "C0BC1", "C0C1B", "C1C0B"],
    1,
    "Python does not insert the base constructor automatically. C0 prints first, super() runs Base.__init__ (B), then C1. The sequence is C0BC1.",
    {
      language: "python",
      code: `class Base:
    def __init__(self):
        print("B", end="")
class Child(Base):
    def __init__(self):
        print("C0", end="")
        super().__init__()
        print("C1", end="")
Child()`,
    },
  ),
  q(
    "pyq-2026-p2p2-str-01",
    "strings",
    "hard",
    "Which regex matches a string that starts and ends with the same digit?",
    ["^(\\d).*\\1$", "^(\\d)\\d*\\1$", "^\\d+\\d$", "^(\\d)\\1$"],
    0,
    "^(\\d).*\\1$ captures the first digit and requires the last character to be that same digit; .* may include non-digits (so 9z9 matches). ^(\\d)\\d*\\1$ allows only digits in the middle. ^\\d+\\d$ is any two-or-more-digit string and does not force the ends equal (12 matches). ^(\\d)\\1$ is only two identical digits (11, not 121).",
  ),
  q(
    "pyq-2026-p2p2-str-02",
    "strings",
    "hard",
    "Python str.replace is sequential and non-overlapping from the left. What is printed?",
    ["b", "bb", "baa", "aaaa"],
    1,
    "\"aaaa\".replace(\"aa\",\"b\") replaces the first pair, then the next remaining pair, yielding bb rather than a nested or overlapping rewrite.",
    {
      language: "python",
      code: `print("aaaa".replace("aa", "b"))`,
    },
  ),
  q(
    "pyq-2026-p2p2-str-03",
    "strings",
    "hard",
    "What does this Python fragment print?",
    ["IBES S*BI", "IBES *SBI", "SEBI S*BI", "IBES SEBI"],
    0,
    "[::-1] reverses SEBI to IBES. replace(\"E\",\"*\") substitutes the single E, producing S*BI. The two expressions are independent; reverse does not mutate s.",
    {
      language: "python",
      code: `print("SEBI"[::-1], "SEBI".replace("E", "*"))`,
    },
  ),
];
