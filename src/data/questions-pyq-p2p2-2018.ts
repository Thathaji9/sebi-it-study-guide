import { makeQuestion } from "@/data/make-question";

const q = makeQuestion(2, 2);

/** Memory-style Phase II Paper 2 bank for the 2018 Grade A cycle (original items). */
export const pyqP2P2_2018 = [
  q(
    "pyq-2018-p2p2-ds-01",
    "ds",
    "hard",
    "What is printed after the in-place two-pointer reversal?",
    ["[8, 2, 6, 4, 1]", "[1, 4, 6, 2, 8]", "[8, 6, 2, 4, 1]", "[1, 2, 6, 4, 8]"],
    0,
    "The pointers swap a[0] with a[4], then a[1] with a[3], and meet at the middle 6, producing [8, 2, 6, 4, 1].",
    {
      language: "python",
      code: `a = [1, 4, 6, 2, 8]
i, j = 0, len(a) - 1
while i < j:
    a[i], a[j] = a[j], a[i]
    i += 1
    j -= 1
print(a)`,
    },
  ),
  q(
    "pyq-2018-p2p2-ds-02",
    "ds",
    "hard",
    "Nodes hold 2→5→7→9. After this in-place reverse, the values reachable from the returned head are:",
    ["2 5 7 9", "9 7 5 2", "5 2 9 7", "9 2 5 7"],
    1,
    "Each iteration saves nxt, points curr at prev, then advances. After four steps prev is the original tail 9, so the list prints 9 7 5 2.",
    {
      language: "python",
      code: `class Node:
    def __init__(self, v, nxt=None):
        self.v, self.nxt = v, nxt

head = Node(2, Node(5, Node(7, Node(9))))
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
    "pyq-2018-p2p2-ds-03",
    "ds",
    "hard",
    "This monotonic stack computes the next strictly greater element to the right (−1 if none). What is printed for [3, 7, 1, 20]?",
    ["[7, 20, 20, -1]", "[7, 20, 20, 20]", "[-1, -1, 20, -1]", "[7, -1, 20, -1]"],
    0,
    "3 is resolved by 7; both 7 and 1 are resolved when 20 arrives; 20 never sees a larger value, so the vector is [7, 20, 20, -1].",
    {
      language: "python",
      code: `a = [3, 7, 1, 20]
res, st = [-1] * len(a), []
for i, x in enumerate(a):
    while st and a[st[-1]] < x:
        res[st.pop()] = x
    st.append(i)
print(res)`,
    },
  ),
  q(
    "pyq-2018-p2p2-ds-04",
    "ds",
    "hard",
    "A queue is simulated with two stacks: enqueue pushes onto s1; dequeue, if s2 is empty, pours s1 onto s2 then pops s2. After enqueue 2, 5, 8 and one dequeue, what are s1 and s2 (bottoms first)?",
    [
      "s1=[], s2=[8, 5]",
      "s1=[2, 5, 8], s2=[]",
      "s1=[], s2=[5, 8]",
      "s1=[8, 5], s2=[]",
    ],
    0,
    "Pouring reverses 2,5,8 onto s2 as bottom→top [8,5,2]. Popping for dequeue removes 2, leaving s2 bottom→top [8, 5] and s1 empty.",
    {
      language: "python",
      code: `s1, s2 = [], []
for x in [2, 5, 8]:
    s1.append(x)
if not s2:
    while s1:
        s2.append(s1.pop())
print(s2.pop(), s1, s2)`,
    },
  ),
  q(
    "pyq-2018-p2p2-ds-05",
    "ds",
    "hard",
    "Keys 12, 7, 18, 4, 9, 15, 21 are inserted into an empty BST (no balancing). What is the postorder traversal?",
    [
      "12 7 4 9 18 15 21",
      "4 9 7 15 21 18 12",
      "4 7 9 12 15 18 21",
      "12 18 21 15 7 9 4",
    ],
    1,
    "Left subtree of 12 is 7 with children 4 and 9; right is 18 with 15 and 21. Postorder emits left, right, root: 4 9 7, then 15 21 18, then 12.",
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
for v in [12, 7, 18, 4, 9, 15, 21]:
    r = ins(r, v)
out = []
post(r, out)
print(out)`,
    },
  ),
  q(
    "pyq-2018-p2p2-ds-06",
    "ds",
    "hard",
    "A 0-based min-heap array starts as [4, 9, 6]. After inserting 2 with swim, the array is:",
    ["[2, 9, 6, 4]", "[2, 4, 6, 9]", "[4, 2, 6, 9]", "[2, 9, 4, 6]"],
    1,
    "2 is appended as the left child of 9, swapped with 9, then swapped with root 4, yielding [2, 4, 6, 9].",
    {
      language: "python",
      code: `h = [4, 9, 6]
h.append(2)
i = len(h) - 1
while i > 0:
    p = (i - 1) // 2
    if h[p] <= h[i]:
        break
    h[p], h[i] = h[i], h[p]
    i = p
print(h)`,
    },
  ),
  q(
    "pyq-2018-p2p2-ds-07",
    "ds",
    "hard",
    "Separate chaining: table size 5, hash h(k)=k%5. Keys 12, 7, 17, 22 are inserted in that order. Chain at slot 2 (head insertion) is:",
    ["12 → 7 → 17 → 22", "22 → 17 → 7 → 12", "22 → 7 → 12", "7 → 17 → 22"],
    1,
    "12, 7, 17 and 22 all satisfy k % 5 == 2, so they share one chain. Head insertion prepends each key, leaving 22 → 17 → 7 → 12.",
    {
      language: "python",
      code: `table = [[] for _ in range(5)]
for k in [12, 7, 17, 22]:
    table[k % 5].insert(0, k)
print(table[2])`,
    },
  ),
  q(
    "pyq-2018-p2p2-ds-08",
    "ds",
    "hard",
    "What is printed after the in-order walk of this binary tree (left, root, right)?",
    ["2 4 6 8 10", "8 4 2 6 10", "2 6 4 10 8", "4 2 8 6 10"],
    0,
    "In-order of a BST is sorted. The tree is a BST on 8 with left 4 (children 2, 6) and right 10, so the walk prints 2 4 6 8 10.",
    {
      language: "cpp",
      code: `//        8
//       / \\
//      4   10
//     / \\
//    2   6
void inorder(Node* n) {
  if (!n) return;
  inorder(n->left);
  cout << n->val << " ";
  inorder(n->right);
}`,
    },
  ),
  q(
    "pyq-2018-p2p2-ds-09",
    "ds",
    "hard",
    "A circular queue of capacity 4 uses front and rear indices and a size counter. After enqueue 3, 5, 7, one dequeue, then enqueue 9, the array (index 0 first) is:",
    ["[9, 5, 7, _]", "[3, 5, 7, 9]", "[_, 5, 7, 9]", "[5, 7, 9, _]"],
    2,
    "Slots fill 3,5,7 at indices 0,1,2. Dequeue vacates index 0. Enqueue 9 lands at index 3. Remaining live cells are 5,7,9 at 1,2,3.",
    {
      language: "python",
      code: `cap, q, front, size = 4, [None] * 4, 0, 0
def enq(x):
    global size
    q[(front + size) % cap] = x
    size += 1
def deq():
    global front, size
    q[front] = None
    front = (front + 1) % cap
    size -= 1
for x in (3, 5, 7):
    enq(x)
deq()
enq(9)
print(q)`,
    },
  ),
  q(
    "pyq-2018-p2p2-ds-10",
    "ds",
    "hard",
    "What is printed? (The list’s end is the stack top.)",
    ["[1, 2, 3, 4]", "[4, 3, 2, 1]", "[2, 3, 4, 1]", "[1, 4, 3, 2]"],
    1,
    "pop() removes the top 4 first, then 3, 2 and 1, so the output list is [4, 3, 2, 1].",
    {
      language: "python",
      code: `st = [1, 2, 3, 4]
out = []
while st:
    out.append(st.pop())
print(out)`,
    },
  ),

  q(
    "pyq-2018-p2p2-algo-01",
    "algorithms",
    "hard",
    "Insertion-sort inner loop on [5, 2, 4, 1]. After the first pass (placing 2), the array is:",
    ["[2, 5, 4, 1]", "[1, 2, 4, 5]", "[5, 2, 4, 1]", "[2, 4, 5, 1]"],
    0,
    "2 is compared with 5 and swapped into index 0, leaving [2, 5, 4, 1]. Later passes have not run.",
    {
      language: "python",
      code: `a = [5, 2, 4, 1]
# first insertion-sort pass (i = 1)
key, j = a[1], 0
while j >= 0 and a[j] > key:
    a[j + 1] = a[j]
    j -= 1
a[j + 1] = key
print(a)`,
    },
  ),
  q(
    "pyq-2018-p2p2-algo-02",
    "algorithms",
    "hard",
    "Binary search for 9 in the 0-based array [1, 3, 5, 7, 9, 11]. How many mid-index probes occur before success?",
    ["1", "2", "3", "4"],
    1,
    "lo=0, hi=5, mid=2 (5); 9>5 so lo=3; mid=4 (9) hits. Two probes.",
    {
      language: "python",
      code: `a, x = [1, 3, 5, 7, 9, 11], 9
lo, hi, probes = 0, len(a) - 1, 0
while lo <= hi:
    mid = (lo + hi) // 2
    probes += 1
    if a[mid] == x:
        break
    if a[mid] < x:
        lo = mid + 1
    else:
        hi = mid - 1
print(probes)`,
    },
  ),
  q(
    "pyq-2018-p2p2-algo-03",
    "algorithms",
    "hard",
    "Merge of sorted runs L=[1, 4, 7] and R=[2, 3, 8] as in mergesort. What is printed?",
    ["[1, 2, 3, 4, 7, 8]", "[1, 4, 7, 2, 3, 8]", "[8, 7, 4, 3, 2, 1]", "[1, 2, 3, 4, 8, 7]"],
    0,
    "The two-pointer merge always takes the smaller head: 1, then 2, 3, 4, 7, then 8.",
    {
      language: "python",
      code: `L, R = [1, 4, 7], [2, 3, 8]
out, i, j = [], 0, 0
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
    "pyq-2018-p2p2-algo-04",
    "algorithms",
    "hard",
    "0/1 knapsack DP with capacity 6 and items (weight,value)=(2,3), (3,4), (4,8) stores what optimum in dp[3][6]?",
    ["7", "8", "11", "15"],
    2,
    "Best is item 1 plus item 3 (weights 2+4) for 3+8=11, which beats 4+3=7 or 8 alone.",
    {
      language: "python",
      code: `items = [(2, 3), (3, 4), (4, 8)]
W, n = 6, 3
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
    "pyq-2018-p2p2-algo-05",
    "algorithms",
    "hard",
    "Unweighted interval scheduling on (start,finish) pairs (0,3), (1,4), (3,5), (4,6), (7,8), (5,8) uses earliest-finish greedy. How many intervals are selected?",
    ["2", "3", "4", "5"],
    1,
    "Sort by finish: (0,3) first, (1,4) overlaps, (3,5) is next compatible, (4,6) overlaps it, (7,8) is next; (5,8) overlaps. Three intervals.",
  ),
  q(
    "pyq-2018-p2p2-algo-06",
    "algorithms",
    "hard",
    "A subset-sum backtracker counts subsets of [2, 3, 5, 7] that sum to 7 (each item used at most once). How many subsets are counted?",
    ["1", "2", "3", "4"],
    1,
    "The accepting leaves are {2,5} and {7}. {3} plus nothing else reaches only 3; no other combination of the distinct items totals 7.",
    {
      language: "python",
      code: `nums, target = [2, 3, 5, 7], 7

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
    "pyq-2018-p2p2-algo-07",
    "algorithms",
    "hard",
    "KMP builds the LPS (longest proper prefix that is also a suffix) array for pattern AABAABAA. What is printed?",
    [
      "[0, 1, 0, 1, 2, 3, 4, 5]",
      "[0, 0, 1, 1, 2, 3, 4, 5]",
      "[0, 1, 0, 1, 2, 2, 3, 4]",
      "[1, 2, 0, 1, 2, 3, 4, 0]",
    ],
    0,
    "A repeats build 1, reset at B, then AABA A rebuilds to length 5: [0,1,0,1,2,3,4,5].",
    {
      language: "python",
      code: `p = "AABAABAA"
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
    "pyq-2018-p2p2-oop-01",
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
    "pyq-2018-p2p2-oop-02",
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
    "pyq-2018-p2p2-oop-03",
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
new B().call();`,
    },
  ),
  q(
    "pyq-2018-p2p2-oop-04",
    "oops",
    "moderate",
    "Encapsulation in an exam-style Java class is best described as:",
    [
      "Making every field public so callers can write invariants",
      "Hiding representation behind methods (and typically private fields) so clients depend on a stable interface",
      "Using multiple inheritance of state from two concrete classes",
      "Forbidding any constructor",
    ],
    1,
    "Encapsulation bundles state with the operations that maintain it and hides the representation. Public fields and multiple class inheritance are the opposite lesson.",
  ),
  q(
    "pyq-2018-p2p2-oop-05",
    "oops",
    "hard",
    "What is printed?",
    ["X", "Y", "XY", "Compilation fails"],
    1,
    "show() is an instance method. The compile-time type is X but the runtime object is Y, so Y.show() runs.",
    {
      language: "java",
      code: `class X { void show() { System.out.print("X"); } }
class Y extends X { void show() { System.out.print("Y"); } }
X t = new Y();
t.show();`,
    },
  ),

  q(
    "pyq-2018-p2p2-str-01",
    "strings",
    "hard",
    "What is printed?",
    ["3", "4", "5", "6"],
    1,
    "s[1:5] is 'odeX' (indices 1,2,3,4). Its length is 4.",
    {
      language: "python",
      code: `s = "codeX9"
print(len(s[1:5]))`,
    },
  ),
  q(
    "pyq-2018-p2p2-str-02",
    "strings",
    "hard",
    "What is printed?",
    ["2", "3", "4", "5"],
    1,
    "indexOf('a') from index 2 finds the 'a' at position 3 in \"bazaar\".",
    {
      language: "java",
      code: `String s = "bazaar";
System.out.print(s.indexOf('a', 2));`,
    },
  ),
  q(
    "pyq-2018-p2p2-str-03",
    "strings",
    "hard",
    "What is printed?",
    ["SEBI", "sebi", "Sebi", "SEBi"],
    0,
    "The loop uppercases every character. isupper/islower checks do not matter after toupper is applied to each.",
    {
      language: "cpp",
      code: `#include <iostream>
#include <cctype>
#include <string>
int main() {
  std::string s = "SeBi";
  for (char& c : s) c = static_cast<char>(std::toupper(static_cast<unsigned char>(c)));
  std::cout << s;
}`,
    },
  ),
];
