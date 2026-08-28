import { makeQuestion } from "@/data/make-question";

const q = makeQuestion(1, 2);

export const pyqP1P2_2022 = [
  q(
    "pyq-2022-p1p2-db-01",
    "database",
    "hard",
    "Relation Offer(Course, Teacher, Slot) has FDs {Course, Slot} → Teacher and Teacher → Course. Which is correct?",
    [
      "The relation is in BCNF",
      "It is in 3NF but not BCNF: Teacher → Course, Teacher is not a candidate key, and Course is prime",
      "It is not in 2NF because Course is a proper subset of a key",
      "Teacher is the sole candidate key",
    ],
    1,
    "Keys are {Course, Slot} and {Teacher, Slot}. Teacher → Course violates BCNF. 3NF holds because Course is prime. Slot does not appear alone as a determinant, so this is not a partial dependency of a non-prime attribute.",
  ),
  q(
    "pyq-2022-p1p2-db-02",
    "database",
    "hard",
    "Thomas' write rule in timestamp ordering:",
    [
      "Rejects a late write and aborts the writer",
      "Ignores a write that would have been overwritten by a later timestamp, allowing some view-serializable schedules that are not conflict serializable",
      "Forces every write to take an exclusive lock",
      "Is identical to the basic TO protocol's write rule",
    ],
    1,
    "If TS(T) < W-timestamp(X), the write is obsolete and is skipped instead of aborting T. The resulting schedules need not be conflict serializable. Basic TO would abort T on that obsolete write.",
  ),
  q(
    "pyq-2022-p1p2-db-03",
    "database",
    "hard",
    "Under ANSI isolation, phantom reads are possible at REPEATABLE READ but forbidden at:",
    [
      "READ UNCOMMITTED only",
      "READ COMMITTED",
      "SERIALIZABLE",
      "No isolation level forbids phantoms",
    ],
    2,
    "Dirty reads stop at READ COMMITTED. Non-repeatable reads stop at REPEATABLE READ. Phantoms (new rows matching a previous predicate) are prevented by SERIALIZABLE (or snapshot isolation in some engines, which is not the ANSI name).",
  ),
  q(
    "pyq-2022-p1p2-db-04",
    "database",
    "hard",
    "Wait-die deadlock prevention: transaction Ti (older) needs a lock held by Tj (younger). Ti will:",
    [
      "Abort immediately (die)",
      "Wait; if the holder were older, the requester would abort",
      "Preempt Tj and take the lock (wound)",
      "Upgrade to a table lock",
    ],
    1,
    "Wait-die is non-preemptive: an older requester waits for a younger holder. A younger requester dies and restarts. Wound-wait is the preemptive dual.",
  ),
  q(
    "pyq-2022-p1p2-db-05",
    "database",
    "hard",
    "Schedule r1(X) w2(X) w1(X) is:",
    [
      "Conflict serializable because each item is written once by T1 at the end",
      "Not conflict serializable: r1(X)–w2(X) gives T1 → T2 and w2(X)–w1(X) gives T2 → T1",
      "View serializable only if T2 commits first",
      "Allowed by strict 2PL without waiting",
    ],
    1,
    "The two conflicts point opposite ways, so the precedence graph has a cycle. Strict 2PL would make T2 wait for T1's lock on X after r1, or T1 would already hold X; this interleaving is not produced.",
  ),
  q(
    "pyq-2022-p1p2-sql-01",
    "sql",
    "hard",
    "This query is equivalent to which of the following?",
    [
      "All rows of A, with B filled when flag = 1 and NULLs otherwise",
      "An inner join: A rows that have at least one B match with flag = 1",
      "A rows that have no B match",
      "A Cartesian product filtered on flag IS NULL",
    ],
    1,
    "LEFT JOIN can produce unmatched A rows with B columns NULL. WHERE b.flag = 1 rejects those NULLs (unknown), so unmatched A rows disappear and the query behaves as an inner join on id plus flag = 1.",
    {
      language: "sql",
      code: `SELECT a.id, b.flag
FROM A a
LEFT JOIN B b ON a.id = b.a_id
WHERE b.flag = 1;`,
    },
  ),
  q(
    "pyq-2022-p1p2-sql-02",
    "sql",
    "hard",
    "IT salaries are 50, 60 and 70 (no NULLs). The query returns employees whose salary is:",
    [
      "Greater than 50",
      "Greater than 60",
      "Strictly greater than every IT salary, i.e. greater than 70",
      "Greater than the sum of IT salaries",
    ],
    2,
    "x > ALL (S) is true iff x is greater than every element of S, equivalently x > MAX(S) when S is non-empty and NULL-free.",
    {
      language: "sql",
      code: `SELECT name
FROM emp
WHERE salary > ALL (
  SELECT salary FROM emp WHERE dept = 'IT'
);`,
    },
  ),
  q(
    "pyq-2022-p1p2-sql-03",
    "sql",
    "moderate",
    "Bag R = {1, 2, 2} and bag S = {2, 3}. How many rows do R UNION S and R UNION ALL S produce?",
    [
      "UNION 3, UNION ALL 5",
      "UNION 4, UNION ALL 5",
      "UNION 3, UNION ALL 4",
      "Both produce 3",
    ],
    0,
    "UNION eliminates duplicates: {1, 2, 3} — three rows. UNION ALL concatenates bags: 1, 2, 2, 2, 3 — five rows.",
  ),
  q(
    "pyq-2022-p1p2-sql-04",
    "sql",
    "hard",
    "Find staff who earn more than the staff they report to. The usual pattern is:",
    [
      "A GROUP BY on salary without a join",
      "A self-join of staff to itself, matching reports_to with id",
      "A FULL OUTER JOIN to a dummy row",
      "SELECT DISTINCT salary FROM staff",
    ],
    1,
    "Alias the table twice (e.g. e and m) and join e.reports_to = m.id, then compare e.salary > m.salary. That is a self-join, not an aggregate.",
  ),
  q(
    "pyq-2022-p1p2-sql-05",
    "sql",
    "hard",
    "city is nullable. SELECT name FROM trader WHERE NOT (city = 'MUM') returns:",
    [
      "Every row whose city is not Mumbai, including rows where city IS NULL",
      "Rows with a non-NULL city other than 'MUM'; NULL city yields UNKNOWN and is discarded",
      "Only rows where city IS NULL",
      "A syntax error because NOT cannot wrap a comparison",
    ],
    1,
    "NULL = 'MUM' is UNKNOWN; NOT UNKNOWN is UNKNOWN. WHERE keeps only TRUE rows, so NULL cities are dropped. Use IS DISTINCT FROM or (city IS NULL OR city <> 'MUM') if NULLs must appear.",
  ),
  q(
    "pyq-2022-p1p2-prog-01",
    "programming",
    "hard",
    "What is printed by the following Java program?",
    ["7", "0", "A", "Compilation fails"],
    1,
    "new B() first runs A's constructor. B.x still has the default 0 because instance initializers have not run. show() is virtual, so B.show() prints 0. Then x is set to 7.",
    {
      language: "java",
      code: `class A {
  A() { show(); }
  void show() { System.out.print("A"); }
}
class B extends A {
  int x = 7;
  void show() { System.out.print(x); }
}
public class Main {
  public static void main(String[] args) {
    new B();
  }
}`,
    },
  ),
  q(
    "pyq-2022-p1p2-prog-02",
    "programming",
    "hard",
    "What is printed by the following C++ program?",
    ["A", "B", "AB", "Undefined behaviour, so no portable output"],
    0,
    "While A::A() runs, the object is not yet a B; the virtual call uses A's vtable and prints A. (This is defined, unlike deleting a B through an A* without a virtual destructor.)",
    {
      language: "cpp",
      code: `#include <iostream>
using namespace std;
class A {
public:
  A() { f(); }
  virtual void f() { cout << "A"; }
};
class B : public A {
public:
  void f() { cout << "B"; }
};
int main() { B b; }`,
    },
  ),
  q(
    "pyq-2022-p1p2-prog-03",
    "programming",
    "hard",
    "What is printed by the following Java program?",
    ["7 8 0", "8 8 1", "8 9 1", "7 8 1"],
    1,
    "The left-hand index uses i++ : it names a[0], then i becomes 1. The right-hand side then reads a[1] which is 8. So a[0] becomes 8 and i is 1.",
    {
      language: "java",
      code: `public class Main {
  public static void main(String[] args) {
    int[] a = {7, 8, 9};
    int i = 0;
    a[i++] = a[i];
    System.out.print(a[0] + " " + a[1] + " " + i);
  }
}`,
    },
  ),
  q(
    "pyq-2022-p1p2-prog-04",
    "programming",
    "hard",
    "What is printed by the following C++ program?",
    ["49", "91", "99", "41"],
    1,
    "*p = *q copies 9 into a. p = q makes p point at b. *p = 1 writes 1 into b. a remains 9, so the digits printed are 9 then 1.",
    {
      language: "cpp",
      code: `#include <iostream>
using namespace std;
int main() {
  int a = 4, b = 9;
  int *p = &a, *q = &b;
  *p = *q;
  p = q;
  *p = 1;
  cout << a << b;
}`,
    },
  ),
  q(
    "pyq-2022-p1p2-prog-05",
    "programming",
    "hard",
    "What is printed by the following Java program?",
    ["true true abc", "false true abc", "false false abc", "true false ab"],
    1,
    "concat returns a new String, so s == t is false. append mutates the same StringBuilder, so sb == tb stays true and tb shows abc.",
    {
      language: "java",
      code: `public class Main {
  public static void main(String[] args) {
    String s = "ab";
    String t = s;
    s = s.concat("c");
    StringBuilder sb = new StringBuilder("ab");
    StringBuilder tb = sb;
    sb.append("c");
    System.out.print((s == t) + " " + (sb == tb) + " " + tb);
  }
}`,
    },
  ),
  q(
    "pyq-2022-p1p2-prog-06",
    "programming",
    "hard",
    "What is printed by the following C++ program?",
    ["NN", "CC", "NC", "CN"],
    2,
    "Non-const a selects the non-const overload (N). const object b can only call the const overload (C).",
    {
      language: "cpp",
      code: `#include <iostream>
using namespace std;
class C {
public:
  void m() { cout << "N"; }
  void m() const { cout << "C"; }
};
int main() {
  C a;
  const C b;
  a.m();
  b.m();
}`,
    },
  ),
  q(
    "pyq-2022-p1p2-prog-07",
    "programming",
    "hard",
    "What is printed by the following Java program?",
    ["1", "5", "7", "9"],
    2,
    "Precedence makes this f() + (f() * f()). Arguments evaluate left to right: x++ yields 1, then 2, then 3. 1 + 2 * 3 = 7.",
    {
      language: "java",
      code: `public class Main {
  static int x = 1;
  static int f() { return x++; }
  public static void main(String[] args) {
    System.out.print(f() + f() * f());
  }
}`,
    },
  ),
  q(
    "pyq-2022-p1p2-prog-08",
    "programming",
    "hard",
    "What is printed by the following Java program?",
    ["VV", "IIV", "VII", "Compilation fails as ambiguous"],
    1,
    "f(1, 2) prefers the exact (int, int) overload over varargs. f(1) matches only the varargs form. Output IIV.",
    {
      language: "java",
      code: `public class Main {
  static void f(int a, int b) { System.out.print("II"); }
  static void f(int... a) { System.out.print("V"); }
  public static void main(String[] args) {
    f(1, 2);
    f(1);
  }
}`,
    },
  ),
  q(
    "pyq-2022-p1p2-prog-09",
    "programming",
    "hard",
    "What is printed by the following C++ program?",
    ["1", "9", "0", "Compilation fails: arrays cannot be parameters"],
    1,
    "An array parameter decays to a pointer to the first element. f writes through that pointer, so the caller's x[0] becomes 9.",
    {
      language: "cpp",
      code: `#include <iostream>
using namespace std;
void f(int a[]) { a[0] = 9; }
int main() {
  int x[] = {1, 2};
  f(x);
  cout << x[0];
}`,
    },
  ),
  q(
    "pyq-2022-p1p2-prog-10",
    "programming",
    "hard",
    "What is printed by the following Java program?",
    ["1", "2", "An exception escapes main", "Compilation fails: finally cannot return"],
    1,
    "A return in finally discards both the caught exception and the pending return 1. The method returns 2.",
    {
      language: "java",
      code: `public class Main {
  static int f() {
    try {
      throw new RuntimeException();
    } catch (RuntimeException e) {
      return 1;
    } finally {
      return 2;
    }
  }
  public static void main(String[] args) {
    System.out.print(f());
  }
}`,
    },
  ),
  q(
    "pyq-2022-p1p2-prog-11",
    "programming",
    "hard",
    "What is printed by the following C++ program?",
    ["1", "2", "0", "The program is undefined because n is modified twice"],
    0,
    "n > 0 is true, so || short-circuits and inc is not called. n stays 1. There is only one modification of n in the actual execution path.",
    {
      language: "cpp",
      code: `#include <iostream>
using namespace std;
int inc(int &n) { n++; return n; }
int main() {
  int n = 1;
  if (n > 0 || inc(n) > 0)
    cout << n;
}`,
    },
  ),
  q(
    "pyq-2022-p1p2-prog-12",
    "programming",
    "hard",
    "What is printed by the following Java program?",
    ["2 2", "1 2", "1 1", "2 1"],
    1,
    "Instance fields are not dispatched. p.x uses P's x because p's compile-time type is P. The cast sees C's hiding field 2.",
    {
      language: "java",
      code: `class P { int x = 1; }
class C extends P { int x = 2; }
public class Main {
  public static void main(String[] args) {
    P p = new C();
    System.out.print(p.x + " " + ((C) p).x);
  }
}`,
    },
  ),
  q(
    "pyq-2022-p1p2-prog-13",
    "programming",
    "hard",
    "In C++, delete p when p has type Base* and actually points to a Derived object, and Base's destructor is not virtual, is:",
    [
      "Always well-defined and calls ~Derived then ~Base",
      "Undefined behaviour; ~Derived may never run",
      "A compile-time error on the delete",
      "Well-defined if Derived has no members",
    ],
    1,
    "Deleting a derived object through a non-polymorphic base destructor is UB. Declaring ~Base() virtual restores defined destruction of the complete object.",
  ),
  q(
    "pyq-2022-p1p2-prog-14",
    "programming",
    "moderate",
    "In Java, IOException is a checked exception. A method that executes new FileReader(path) and does not catch it must:",
    [
      "Do nothing; FileReader is unchecked",
      "Declare throws IOException (or a supertype) or handle it in a try/catch",
      "Only wrap it in RuntimeException, never declare throws",
      "Use a finally block instead of throws",
    ],
    1,
    "Checked exceptions are part of the method contract. Callers must catch them or propagate them. RuntimeException wrappers are optional, not required, and finally does not replace the rule.",
  ),
  q(
    "pyq-2022-p1p2-prog-15",
    "programming",
    "moderate",
    "A Java subclass declares static void m() with the same signature as a static void m() in its superclass. Calls through a superclass-typed reference:",
    [
      "Dispatch to the subclass at runtime (true override)",
      "Bind to the superclass method at compile time (hiding, not overriding)",
      "Fail to compile",
      "Dispatch based on the runtime type only if m is also final",
    ],
    1,
    "static methods are hidden, not overridden. The compile-time type of the reference selects which static m() is called. final on a static method only forbids hiding.",
  ),
  q(
    "pyq-2022-p1p2-py-01",
    "python",
    "hard",
    "What does this snippet print?",
    [
      "[6, 4, 2] [0, 1, 2]",
      "[6, 4] [0, 1, 2]",
      "[6, 5, 4, 3, 2] [0, 1, 2]",
      "[7, 5, 3] [0, 1, 2]",
    ],
    0,
    "range(8) is 0..7. Slice [6:1:-2] starts at index 6, steps −2, and stops before index 1 → 6, 4, 2. a[:3] is the prefix [0, 1, 2].",
    {
      language: "python",
      code: `a = list(range(8))
print(a[6:1:-2], a[:3])`,
    },
  ),
  q(
    "pyq-2022-p1p2-py-02",
    "python",
    "hard",
    "What does this snippet print?",
    [
      "[1, 2] [1, 2] True",
      "[1] [2] False",
      "[1] [2] True",
      "[1, 2] [2] False",
    ],
    1,
    "The None sentinel allocates a new list on every call that omits seq. a and b are distinct objects [1] and [2].",
    {
      language: "python",
      code: `def g(n, seq=None):
    if seq is None:
        seq = []
    seq.append(n)
    return seq
a = g(1)
b = g(2)
print(a, b, a is b)`,
    },
  ),
  q(
    "pyq-2022-p1p2-py-03",
    "python",
    "hard",
    "File t.txt initially contains exactly ABCD. After this snippet, what is read?",
    ["XYCD", "XY", "ABCDXY", "XYABCD"],
    0,
    "'r+' opens for update without truncating and positions at byte 0. write('XY') overwrites the first two characters, leaving CD. seek(0) then reads the whole file XYCD. Mode 'w' would have truncated first.",
    {
      language: "python",
      code: `f = open('t.txt', 'r+')
f.write('XY')
f.seek(0)
print(f.read())`,
    },
  ),
  q(
    "pyq-2022-p1p2-py-04",
    "python",
    "hard",
    "What does this snippet print?",
    [
      "['a', 'b', 'c', 'd']",
      "['a', 'b', 'c', '', 'd']",
      "['a,b;c,,d']",
      "['a', 'b;c', '', 'd']",
    ],
    1,
    "split on the character class [,;] cuts at every comma or semicolon and keeps empty strings between adjacent separators, so c,,d yields an empty field.",
    {
      language: "python",
      code: `import re
print(re.split('[,;]', 'a,b;c,,d'))`,
    },
  ),
  q(
    "pyq-2022-p1p2-py-05",
    "python",
    "hard",
    "What does this snippet print?",
    ["(1, 2, 3) (1, 2, 3)", "(1, 2, 3) (1, 2)", "(1, 2) (1, 2)", "TypeError: tuples cannot use +="],
    1,
    "Tuples are immutable, so x += (3,) allocates a new tuple and rebinds x. y still names the original (1, 2).",
    {
      language: "python",
      code: `x = (1, 2)
y = x
x += (3,)
print(x, y)`,
    },
  ),
  q(
    "pyq-2022-p1p2-algo-01",
    "algorithms",
    "hard",
    "Any comparison-based sorting algorithm requires, in the worst case:",
    [
      "Ω(n) comparisons",
      "Ω(n log n) comparisons",
      "Ω(n²) comparisons",
      "O(n) comparisons",
    ],
    1,
    "A binary decision tree that distinguishes n! permutations has height at least log2(n!), which is Ω(n log n) by Stirling's approximation. Linear-time sorts exist only by leaving the comparison model (counting, radix).",
  ),
  q(
    "pyq-2022-p1p2-algo-02",
    "algorithms",
    "hard",
    "Counting sort on n integers from {0, …, k} runs in Θ(n + k) time. It is linear in n when:",
    [
      "k = Θ(n²)",
      "k = O(n)",
      "The array is already sorted",
      "A comparison-based lower bound still forces Ω(n log n)",
    ],
    1,
    "Θ(n + k) = Θ(n) precisely when k = O(n). The comparison lower bound does not apply: counting sort inspects keys as integers, not via pairwise comparisons.",
  ),
  q(
    "pyq-2022-p1p2-algo-03",
    "algorithms",
    "moderate",
    "BFS from a source on an unweighted directed graph computes:",
    [
      "A minimum spanning tree",
      "Shortest paths in number of edges",
      "Shortest paths for arbitrary (possibly negative) real weights",
      "A topological order even if the graph has a cycle",
    ],
    1,
    "Each BFS layer is exactly one hop farther. Weighted shortest paths need Dijkstra (non-negative) or Bellman–Ford (negative allowed, no negative cycle on the path). Topological order requires a DAG.",
  ),
  q(
    "pyq-2022-p1p2-algo-04",
    "algorithms",
    "hard",
    "Kruskal's MST algorithm differs from Prim's in that Kruskal:",
    [
      "Grows a single tree from a start vertex using a decrease-key heap",
      "Scans edges in increasing weight and adds an edge when it joins distinct components (union–find)",
      "Requires a dense adjacency matrix to be asymptotically optimal",
      "Does not work on disconnected graphs (forests)",
    ],
    1,
    "Kruskal is edge-centric and uses disjoint sets. Prim is vertex-centric. Both produce an MST (or a minimum spanning forest if the graph is disconnected).",
  ),
  q(
    "pyq-2022-p1p2-algo-05",
    "algorithms",
    "moderate",
    "Quicksort that always pivots on the last element of a subarray has worst-case time Θ(n²) on:",
    [
      "Only random permutations",
      "An already sorted array (and the reverse-sorted array)",
      "Every input, including balanced partitions",
      "Inputs of length less than 16 only",
    ],
    1,
    "A sorted array then always yields partitions of size n−1 and 0. Balanced partitions still give the Θ(n log n) average/best family of recurrences.",
  ),
  q(
    "pyq-2022-p1p2-net-01",
    "networking",
    "hard",
    "How many usable host addresses are in IPv4 network 10.20.30.0/27 (standard directed-broadcast convention)?",
    ["32", "30", "27", "64"],
    1,
    "Host bits = 32 − 27 = 5, so 2^5 = 32 addresses. Subtract network and broadcast: 30 usable hosts. Mask is 255.255.255.224.",
  ),
  q(
    "pyq-2022-p1p2-net-02",
    "networking",
    "hard",
    "Distance-vector routing (e.g. RIP) versus link-state (e.g. OSPF):",
    [
      "Both flood complete topology databases to every router on every hello",
      "Distance-vector exchanges only path costs to neighbours and can count to infinity; link-state floods LSAs and each router runs Dijkstra",
      "Link-state cannot use Dijkstra because weights may be negative",
      "RIP is a transport-layer protocol and OSPF is application-layer DNS",
    ],
    1,
    "Bellman–Ford style DV advertises vectors of distances. Count-to-infinity is the classic DV failure mode. OSPF floods link-state advertisements and computes SPF locally.",
  ),
  q(
    "pyq-2022-p1p2-net-03",
    "networking",
    "moderate",
    "A TCP three-way handshake in the usual successful case is the segment sequence:",
    [
      "SYN, ACK, FIN",
      "SYN, SYN-ACK, ACK",
      "ACK, SYN, ACK",
      "FIN, FIN-ACK, ACK",
    ],
    1,
    "The client sends SYN with its ISN. The server replies SYN-ACK with its own ISN and acknowledgement. The client completes with ACK. FIN belongs to teardown.",
  ),
  q(
    "pyq-2022-p1p2-net-04",
    "networking",
    "moderate",
    "Which statement about UDP is correct?",
    [
      "UDP provides congestion control identical to TCP's AIMD",
      "UDP is connectionless, does not retransmit lost datagrams, and does not guarantee order",
      "UDP cannot be used for DNS because DNS needs reliability",
      "UDP segments carry a mandatory 20-byte header like TCP",
    ],
    1,
    "UDP is a 8-byte header datagram service. DNS commonly uses UDP for queries despite no reliability; retries sit in the application. Congestion control is not built in.",
  ),
  q(
    "pyq-2022-p1p2-net-05",
    "networking",
    "hard",
    "ARP (IPv4) and DNS operate, respectively, at which layers of the usual TCP/IP stack?",
    [
      "Both at the application layer",
      "ARP at the link/network boundary (IP-to-MAC resolution); DNS at the application layer",
      "Both at the transport layer because they use ports",
      "ARP at the physical layer; DNS at the network layer",
    ],
    1,
    "ARP messages are encapsulated in Ethernet (or similar) and map IPv4 addresses to MAC addresses. DNS is an application protocol, typically over UDP/TCP port 53.",
  ),
  q(
    "pyq-2022-p1p2-sec-01",
    "security",
    "hard",
    "To send a confidential file that only registrar Bob can read, Alice should encrypt the session key (or file) with:",
    [
      "Alice's private key",
      "Alice's public key",
      "Bob's public key",
      "Bob's private key",
    ],
    2,
    "Confidentiality uses the recipient's public key so only Bob's private key decrypts. Alice's private key is for signing. Encrypting with Bob's private key is impossible for Alice and would not be confidential anyway.",
  ),
  q(
    "pyq-2022-p1p2-sec-02",
    "security",
    "hard",
    "A page that echoes unsanitised query text into HTML, so an attacker's script runs in the victim's browser, is:",
    [
      "CSRF",
      "Reflected XSS",
      "SQL injection against the browser",
      "A padding-oracle attack on TLS",
    ],
    1,
    "Reflected XSS injects script into a response that the victim's browser executes in the site's origin. CSRF forges a request using the victim's existing cookies without needing script in the page. SQLi targets the database parser.",
  ),
  q(
    "pyq-2022-p1p2-sec-03",
    "security",
    "moderate",
    "Which control is aimed first at confidentiality in the CIA triad?",
    [
      "A SHA-256 checksum published beside a download",
      "AES-GCM encryption of a database backup with keys in an HSM",
      "RAID-6 on a reporting warehouse",
      "An NTP cluster so logs share a clock",
    ],
    1,
    "Encryption (and key custody) hides content. Checksums detect integrity issues. RAID and NTP support availability and forensic integrity, not secrecy of the payload.",
  ),
  q(
    "pyq-2022-p1p2-sec-04",
    "security",
    "hard",
    "The most reliable operational recovery from crypto-ransomware that has encrypted primary file servers is:",
    [
      "Paying the ransom as the documented first response",
      "Restoring from offline or immutable backups that were not reachable by the same credentials",
      "Rebooting into safe mode so the cipher keys remain in RAM",
      "Switching the site from HTTPS to HTTP to bypass the encryptor",
    ],
    1,
    "Backups that the malware could not overwrite (air-gapped, immutable object lock, separate IAM) restore availability. Payment is discouraged, does not guarantee keys, and funds crime. Safe mode and HTTP do not decrypt disks.",
  ),
  q(
    "pyq-2022-p1p2-sec-05",
    "security",
    "hard",
    "Salting a password hash primarily prevents:",
    [
      "An attacker who stole the hash file from using a precomputed rainbow table across users",
      "TLS interception on the login POST",
      "Online lockout after three failures",
      "The need for a slow KDF such as Argon2",
    ],
    0,
    "A unique per-user salt makes each hash distinct even for the same password, so one rainbow table cannot crack every account. It does not replace TLS, lockouts, or a slow password-hashing function.",
  ),
  q(
    "pyq-2022-p1p2-wh-01",
    "warehouse",
    "hard",
    "On a cube with Time, Product and Region, restricting Time to {2021, 2022} and Region to {West, South} while keeping Product is:",
    [
      "Slice (one dimension fixed to a singleton)",
      "Dice (a subcube selected on two or more dimensions)",
      "Roll-up along Product",
      "Pivot of the fact grain",
    ],
    1,
    "Dice selects ranges or sets on multiple dimensions. Slice would fix exactly one dimension to a single value. Roll-up changes hierarchy grain; pivot rotates the displayed axes.",
  ),
  q(
    "pyq-2022-p1p2-wh-02",
    "warehouse",
    "moderate",
    "In a star schema, compared with a snowflake schema, dimension tables are typically:",
    [
      "Normalised into many small tables joined back to the fact table through bridges only",
      "Denormalised (few joins from fact to each dimension) at the cost of some redundancy",
      "Stored as slowly changing facts rather than dimensions",
      "Forbidden from having surrogate keys",
    ],
    1,
    "Star: one wide dimension table per business entity, denormalised. Snowflake: dimensions normalised into sub-tables. Surrogate keys are usual in both.",
  ),
  q(
    "pyq-2022-p1p2-sh-01",
    "shell",
    "hard",
    "After set -- a b c and IFS=,, echo \"$*\" versus echo \"$@\" print:",
    [
      "Both a b c",
      "a,b,c versus a b c",
      "Both a,b,c",
      "a b c versus a,b,c",
    ],
    1,
    "\"$*\" joins positional parameters with the first IFS character into one word. \"$@\" preserves each parameter as its own word; echo then inserts spaces between arguments.",
    {
      language: "bash",
      code: `set -- a b c
IFS=,
echo "$*"
echo "$@"`,
    },
  ),
  q(
    "pyq-2022-p1p2-sh-02",
    "shell",
    "moderate",
    "In a POSIX shell, cmd1 && cmd2 runs cmd2 if and only if:",
    [
      "cmd1 writes to stdout",
      "cmd1 exits with status 0",
      "cmd1 exits with any non-zero status",
      "cmd1 is a builtin",
    ],
    1,
    "&& is short-circuit AND on exit status. 0 is success. cmd1 || cmd2 runs cmd2 only when cmd1 fails.",
  ),
  q(
    "pyq-2022-p1p2-sh-03",
    "shell",
    "hard",
    "What does this snippet print?",
    ["0", "7", "1", "empty line"],
    1,
    "return inside a function sets the function's exit status. $? then expands to 7. A bare return with no argument would use the status of the previous command instead.",
    {
      language: "bash",
      code: `f() { return 7; }
f
echo $?`,
    },
  ),
];
