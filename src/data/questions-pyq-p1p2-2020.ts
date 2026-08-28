import { makeQuestion } from "@/data/make-question";

const q = makeQuestion(1, 2);

export const pyqP1P2_2020 = [
  q(
    "pyq-2020-p1p2-db-01",
    "database",
    "hard",
    "Relation R(Student, Subject, Teacher) has FDs {Student, Subject} → Teacher and Teacher → Subject. Which statement is correct?",
    [
      "R is in BCNF because every determinant is a superkey",
      "R is in 3NF but not BCNF: Teacher → Subject and Teacher is not a candidate key, yet Subject is prime",
      "R is not in 2NF because Subject depends on part of a key",
      "The only candidate key is {Student, Subject}",
    ],
    1,
    "Candidate keys are {Student, Subject} and {Student, Teacher}. Teacher → Subject has a non-superkey determinant, so BCNF fails. 3NF holds because Subject is prime. Student alone determines neither remaining attribute, so there is no partial dependency.",
  ),
  q(
    "pyq-2020-p1p2-db-02",
    "database",
    "hard",
    "Basic two-phase locking guarantees conflict serializability but can still allow cascading aborts. Strict 2PL additionally requires that a transaction:",
    [
      "Acquire all locks before it begins execution (conservative 2PL)",
      "Hold exclusive locks until it commits or aborts",
      "Never acquire a shared lock after it has released any lock",
      "Use timestamps instead of a wait-for graph",
    ],
    1,
    "Basic 2PL already forbids lock acquisition after the first release. Strict 2PL keeps X-locks until end of transaction so no peer can read a dirty write. Conservative 2PL is a separate deadlock-avoidance policy.",
  ),
  q(
    "pyq-2020-p1p2-db-03",
    "database",
    "hard",
    "Schedule S over T1, T2: r1(X) r2(X) w2(X) w1(Y) r2(Y). Which statement is true?",
    [
      "S is not conflict serializable because r1(X) and r2(X) conflict",
      "The precedence graph has edge T1 → T2 only, so S is conflict serializable and equivalent to T1 then T2",
      "The precedence graph contains a cycle T1 ⇄ T2",
      "S is conflict serializable and equivalent only to T2 then T1",
    ],
    1,
    "Reads do not conflict with each other. Conflicting pairs are r1(X) before w2(X) and w1(Y) before r2(Y), both T1 → T2. The graph is acyclic, so S ≡ T1; T2.",
  ),
  q(
    "pyq-2020-p1p2-db-04",
    "database",
    "hard",
    "In Kung–Robinson optimistic concurrency control, a transaction during its read phase:",
    [
      "Acquires exclusive locks on every item it intends to update",
      "Reads committed database values into a private workspace without locking those items",
      "Writes its updates in-place and records them in an undo log",
      "Must wait if another transaction is currently in its validation phase",
    ],
    1,
    "OCC defers conflict detection. The read phase copies items locally with no locks. Writes are installed only after a successful validation phase; a failed validation aborts the transaction.",
  ),
  q(
    "pyq-2020-p1p2-db-05",
    "database",
    "hard",
    "Schedule: w1(A) r2(A) w2(B) c2 c1. This schedule is:",
    [
      "Recoverable, because T2 commits before T1",
      "Not recoverable, because T2 reads A written by T1 and commits before T1",
      "Cascadeless, because no value is read twice",
      "Strict, because T2 writes a different item B",
    ],
    1,
    "Recoverability requires that a dirty reader commit only after the writer commits. T2 reads T1's A and commits first, so aborting T1 cannot be undone cleanly. Cascadeless schedules read only committed data.",
  ),
  q(
    "pyq-2020-p1p2-sql-01",
    "sql",
    "hard",
    "What does the query return?",
    [
      "Staff who lead at least one OPEN assignment",
      "Staff who have no OPEN assignment, including staff with zero assignment rows",
      "Staff whose every assignment is OPEN",
      "A syntax error, because EXISTS cannot be negated",
    ],
    1,
    "NOT EXISTS is an anti-semi-join. A staff row survives when the correlated subquery finds no OPEN assignment. Staff with no assignment rows also survive.",
    {
      language: "sql",
      code: `SELECT s.name
FROM staff s
WHERE NOT EXISTS (
  SELECT 1
  FROM assignment a
  WHERE a.staff_id = s.id
    AND a.status = 'OPEN'
);`,
    },
  ),
  q(
    "pyq-2020-p1p2-sql-02",
    "sql",
    "hard",
    "Department D1 has 6 employees; 4 of them earn more than 80,000. For this query, D1:",
    [
      "Appears with c = 6, because GROUP BY sees every employee",
      "Appears with c = 4, because HAVING is ignored when WHERE is present",
      "Does not appear: WHERE leaves 4 rows and HAVING COUNT(*) >= 5 then rejects the group",
      "Appears with c = 5 after SQL rounds the count up",
    ],
    2,
    "WHERE is applied before grouping, so D1 contributes 4 rows and COUNT(*) is 4. HAVING then tests 4 >= 5 and drops the group.",
    {
      language: "sql",
      code: `SELECT dept_id, COUNT(*) AS c
FROM emp
WHERE salary > 80000
GROUP BY dept_id
HAVING COUNT(*) >= 5;`,
    },
  ),
  q(
    "pyq-2020-p1p2-sql-03",
    "sql",
    "moderate",
    "Tables A(id) = {1,2} and B(a_id) = {1,1}. How many rows does SELECT * FROM A INNER JOIN B ON A.id = B.a_id return, and how many does A LEFT JOIN B on the same condition return?",
    [
      "Inner 2, left 2",
      "Inner 2, left 3",
      "Inner 1, left 2",
      "Inner 3, left 3",
    ],
    1,
    "Id 1 matches two B rows, so the inner join has two rows and drops id 2. LEFT JOIN keeps id 2 with NULLs in B's columns: two matches plus one padded row, total three.",
  ),
  q(
    "pyq-2020-p1p2-sql-04",
    "sql",
    "hard",
    "In standard SQL, which SELECT list is illegal together with GROUP BY dept_id?",
    [
      "dept_id, COUNT(*)",
      "dept_id, AVG(salary)",
      "dept_id, emp_name",
      "dept_id, MIN(salary), MAX(salary)",
    ],
    2,
    "Every selected column must be a grouping column or an aggregate. emp_name is neither, so the query is illegal in standard SQL (engines that pick an arbitrary emp_name are non-compliant).",
  ),
  q(
    "pyq-2020-p1p2-sql-05",
    "sql",
    "hard",
    "t has three rows with amt 10, NULL, 20. What is SELECT COUNT(amt), COUNT(*), SUM(amt) FROM t?",
    [
      "3, 3, 30",
      "2, 3, 30",
      "2, 2, 30",
      "3, 3, NULL",
    ],
    1,
    "COUNT(amt) skips NULL, COUNT(*) counts rows, SUM ignores NULL and adds 10+20. SUM of an empty set would be NULL, but here two numeric values exist.",
  ),
  q(
    "pyq-2020-p1p2-prog-01",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["0 2", "6 2", "6 3", "0 3"],
    1,
    "Java passes the Box reference and the int by value. b.n += k mutates the shared object (4+2=6). k++ changes only the copy. b = new Box(0) rebinds the local parameter, not the caller's variable.",
    {
      language: "java",
      code: `class Box {
  int n;
  Box(int n) { this.n = n; }
}
public class Main {
  static void bump(Box b, int k) {
    b.n += k;
    k++;
    b = new Box(0);
  }
  public static void main(String[] args) {
    Box b = new Box(4);
    int k = 2;
    bump(b, k);
    System.out.print(b.n + " " + k);
  }
}`,
    },
  ),
  q(
    "pyq-2020-p1p2-prog-02",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["4 7", "6 7", "6 12", "4 12"],
    1,
    "a.f(3) resolves to A's f(int) at compile time, then dispatches to B's override → 6. a.f(3, 4) has no override in B, so A's f(int,int) returns 7.",
    {
      language: "java",
      code: `class A {
  int f(int x) { return x + 1; }
  int f(int x, int y) { return x + y; }
}
class B extends A {
  int f(int x) { return x * 2; }
}
public class Main {
  public static void main(String[] args) {
    A a = new B();
    System.out.print(a.f(3) + " " + a.f(3, 4));
  }
}`,
    },
  ),
  q(
    "pyq-2020-p1p2-prog-03",
    "programming",
    "hard",
    "What is printed by the C++ program?",
    ["3 8", "3 6", "2 5", "3 4"],
    0,
    "s is a static local, so it survives calls. f(2): s=2, g=1+2=3. f(3): s=2+3=5, g=3+5=8. The chained operator<< evaluates left to right.",
    {
      language: "cpp",
      code: `#include <iostream>
using namespace std;
int g = 1;
int f(int x) {
  static int s = 0;
  s += x;
  g += s;
  return g;
}
int main() {
  cout << f(2) << " " << f(3);
}`,
    },
  ),
  q(
    "pyq-2020-p1p2-prog-04",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["2 2 3", "2 1 3", "3 1 3", "2 1 2"],
    1,
    "The block uses the local x (2), then assigns 3 to that local. Main.x remains the static field 1. After the block, the local is 3.",
    {
      language: "java",
      code: `public class Main {
  static int x = 1;
  public static void main(String[] args) {
    int x = 2;
    {
      System.out.print(x + " ");
      x = 3;
    }
    System.out.print(Main.x + " " + x);
  }
}`,
    },
  ),
  q(
    "pyq-2020-p1p2-prog-05",
    "programming",
    "hard",
    "What is printed by the C++ program?",
    ["Bb", "Db", "BD", "Dd"],
    1,
    "f is virtual, so p->f() uses Der::f. g is non-virtual, so p->g() uses Base::g selected from the pointer's static type.",
    {
      language: "cpp",
      code: `#include <iostream>
using namespace std;
class Base {
public:
  virtual void f() { cout << "B"; }
  void g() { cout << "b"; }
};
class Der : public Base {
public:
  void f() { cout << "D"; }
  void g() { cout << "d"; }
};
int main() {
  Base *p = new Der();
  p->f();
  p->g();
}`,
    },
  ),
  q(
    "pyq-2020-p1p2-prog-06",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["SITIT", "ITSIT", "STITI", "SITTI"],
    0,
    "The static block runs once on class initialization (S). Each construction then runs the instance initializer (I) followed by the constructor body (T).",
    {
      language: "java",
      code: `class T {
  T() { System.out.print("T"); }
  { System.out.print("I"); }
  static { System.out.print("S"); }
}
public class Main {
  public static void main(String[] args) {
    new T();
    new T();
  }
}`,
    },
  ),
  q(
    "pyq-2020-p1p2-prog-07",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["true true", "false true", "true false", "false false"],
    1,
    "concat allocates a new String, so a and b are different references. The new contents equal \"sebi\".",
    {
      language: "java",
      code: `public class Main {
  public static void main(String[] args) {
    String a = "se";
    String b = a;
    a = a + "bi";
    System.out.print((a == b) + " " + a.equals("sebi"));
  }
}`,
    },
  ),
  q(
    "pyq-2020-p1p2-prog-08",
    "programming",
    "hard",
    "What is printed by the C++ program?",
    ["123", "321", "1213121", "112131"],
    2,
    "f(1) prints 1. f(2) prints f(1), 2, f(1) → 121. f(3) prints 121, 3, 121 → 1213121.",
    {
      language: "cpp",
      code: `#include <iostream>
using namespace std;
void f(int n) {
  if (n == 0) return;
  f(n - 1);
  cout << n;
  f(n - 1);
}
int main() { f(3); }`,
    },
  ),
  q(
    "pyq-2020-p1p2-prog-09",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["1", "2", "3", "Compilation fails as ambiguous"],
    1,
    "byte can widen to int, long, or double. Overload resolution picks the most specific applicable method, which is m(int).",
    {
      language: "java",
      code: `class C {
  int m(double x) { return 1; }
  int m(int x) { return 2; }
  int m(long x) { return 3; }
}
public class Main {
  public static void main(String[] args) {
    C c = new C();
    byte b = 4;
    System.out.print(c.m(b));
  }
}`,
    },
  ),
  q(
    "pyq-2020-p1p2-prog-10",
    "programming",
    "hard",
    "What is printed by the C++ program?",
    ["5", "8", "9", "6"],
    2,
    "r is an alias for a, so r = 8 sets a to 8. *p names the same object, so *p = r + 1 writes 9 into a.",
    {
      language: "cpp",
      code: `#include <iostream>
using namespace std;
int main() {
  int a = 5;
  int &r = a;
  int *p = &a;
  r = 8;
  *p = r + 1;
  cout << a;
}`,
    },
  ),
  q(
    "pyq-2020-p1p2-prog-11",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["99 99", "0 3", "0 99", "99 3"],
    1,
    "A finally block that does not return leaves the pending return value unchanged. Assigning n = 99 mutates a local copy after that value has already been captured.",
    {
      language: "java",
      code: `public class Main {
  static int f(int n) {
    try {
      if (n < 0) throw new RuntimeException();
      return n;
    } catch (RuntimeException e) {
      return 0;
    } finally {
      n = 99;
    }
  }
  public static void main(String[] args) {
    System.out.print(f(-1) + " " + f(3));
  }
}`,
    },
  ),
  q(
    "pyq-2020-p1p2-prog-12",
    "programming",
    "hard",
    "What is printed by the C++ program?",
    ["BDdb", "DBbd", "BDbd", "DBdb"],
    0,
    "Bases construct before derived members: B then D. Destruction is reverse: ~D then ~B, printing d then b.",
    {
      language: "cpp",
      code: `#include <iostream>
using namespace std;
class B {
public:
  B() { cout << "B"; }
  ~B() { cout << "b"; }
};
class D : public B {
public:
  D() { cout << "D"; }
  ~D() { cout << "d"; }
};
int main() { D x; }`,
    },
  ),
  q(
    "pyq-2020-p1p2-prog-13",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["I", "A", "B", "Compilation fails: default method conflict"],
    2,
    "Default methods are instance methods. x.id() uses dynamic dispatch on the runtime type B. B's override wins over A's override of I's default.",
    {
      language: "java",
      code: `interface I { default String id() { return "I"; } }
class A implements I { public String id() { return "A"; } }
class B extends A { public String id() { return "B"; } }
public class Main {
  public static void main(String[] args) {
    I x = new B();
    System.out.print(x.id());
  }
}`,
    },
  ),
  q(
    "pyq-2020-p1p2-prog-14",
    "programming",
    "hard",
    "In C++, the declarations void f(int a, int b = 1); and void f(int a); make the call f(3):",
    [
      "Invoke the one-argument overload",
      "Invoke the two-argument overload with b = 1",
      "Ambiguous, so the program is ill-formed",
      "Always a linker error, never a compile error",
    ],
    2,
    "Both overloads are viable for a single int argument because of the default argument. Overload resolution cannot choose a unique best function.",
  ),
  q(
    "pyq-2020-p1p2-prog-15",
    "programming",
    "moderate",
    "Which statement about a Java abstract class is correct?",
    [
      "It cannot declare a constructor",
      "It may mix concrete methods with abstract methods, and it cannot be instantiated directly",
      "It may be instantiated if every method has a body even when the class is marked abstract",
      "It cannot extend another class because Java forbids mixed inheritance",
    ],
    1,
    "Abstract classes exist to be subclassed. They may have constructors (invoked via super), fields, and concrete methods. The abstract modifier forbids new even if all methods happen to be concrete.",
  ),
  q(
    "pyq-2020-p1p2-py-01",
    "python",
    "hard",
    "What is printed?",
    [
      "[1, 3] [4, 3, 2]",
      "[1, 3] [4, 3]",
      "[1, 3, 5] [5, 4, 3, 2]",
      "[1, 2, 3] [4, 3, 2]",
    ],
    0,
    "a[1:5:2] takes indices 1 and 3 → [1, 3]. a[-2:1:-1] starts at index 4, steps backward, and stops before index 1 → [4, 3, 2].",
    {
      language: "python",
      code: `a = [0, 1, 2, 3, 4, 5]
print(a[1:5:2], a[-2:1:-1])`,
    },
  ),
  q(
    "pyq-2020-p1p2-py-02",
    "python",
    "hard",
    "What is printed?",
    [
      "[1] [2] [3] then False False",
      "[1, 2] [1, 2] [3] then True False",
      "[1, 2] [1, 2] [3] then False False",
      "[1] [1, 2] [3] then True False",
    ],
    1,
    "The default list is created once. f(1) and f(2) append to that same object, so x is y. The call f(3, []) supplies a fresh list, so x is not z.",
    {
      language: "python",
      code: `def f(x, acc=[]):
    acc.append(x)
    return acc
x = f(1)
y = f(2)
z = f(3, [])
print(x, y, z)
print(x is y, x is z)`,
    },
  ),
  q(
    "pyq-2020-p1p2-py-03",
    "python",
    "moderate",
    "An existing text file holds bytes. Which open mode truncates that file to length zero as soon as open succeeds?",
    [
      "'r'",
      "'r+'",
      "'w'",
      "'a'",
    ],
    2,
    "'w' (and 'w+') truncate. 'r' is read-only and does not create or truncate. 'r+' updates in place from offset 0 without truncating. 'a' appends and preserves existing bytes.",
  ),
  q(
    "pyq-2020-p1p2-py-04",
    "python",
    "hard",
    "What is printed?",
    [
      "['123', '45'] False True",
      "['123', '45'] True True",
      "['x123y45'] False True",
      "['12345'] False True",
    ],
    1,
    "findall with [0-9]+ yields the two digit runs. match must succeed at the start, so match(...) is None is True. search succeeds anywhere, so the last flag is also True.",
    {
      language: "python",
      code: `import re
s = 'x123y45'
print(re.findall('[0-9]+', s), re.match('[0-9]+', s) is None, re.search('[0-9]+', s) is not None)`,
    },
  ),
  q(
    "pyq-2020-p1p2-py-05",
    "python",
    "hard",
    "Which object can be used as a dict key?",
    [
      "[1, 2]",
      "{1, 2}",
      "(1, [2])",
      "(1, (2, 3))",
    ],
    3,
    "Keys must be hashable. Lists and sets are mutable. A tuple is hashable only when every element is; the nested list in (1, [2]) makes it unhashable. (1, (2, 3)) is a nested tuple of immutables.",
  ),
  q(
    "pyq-2020-p1p2-algo-01",
    "algorithms",
    "hard",
    "Which comparison sort is Θ(n log n) in the worst case and is stable?",
    [
      "Heapsort",
      "Mergesort",
      "Quicksort with a fixed pivot",
      "Selection sort",
    ],
    1,
    "Mergesort is Θ(n log n) in every case and is stable. Heapsort is Θ(n log n) but not stable. Typical quicksort is Θ(n²) worst case and not stable. Selection sort is Θ(n²).",
  ),
  q(
    "pyq-2020-p1p2-algo-02",
    "algorithms",
    "moderate",
    "The recurrence T(n) = 2T(n/2) + Θ(n) with T(1) = Θ(1) solves to:",
    ["Θ(n)", "Θ(n log n)", "Θ(n²)", "Θ(2^n)"],
    1,
    "Master theorem case 2: a = 2, b = 2, f(n) = Θ(n^{log_b a}). The solution is Θ(n log n), the same as the mergesort recurrence.",
  ),
  q(
    "pyq-2020-p1p2-algo-03",
    "algorithms",
    "hard",
    "Dijkstra's algorithm, implemented with a binary heap, is unsafe or incorrect when the input graph:",
    [
      "Is a directed acyclic graph",
      "Contains a negative-weight edge",
      "Contains a cycle of non-negative weights",
      "Is disconnected",
    ],
    1,
    "The algorithm permanently labels a vertex when it is extracted from the priority queue. A later cheaper path through a negative edge would violate that assumption. Disconnected graphs and non-negative cycles are fine; unreachable vertices keep distance ∞.",
  ),
  q(
    "pyq-2020-p1p2-algo-04",
    "algorithms",
    "moderate",
    "Worst-case search time in a separately chained hash table that stores n keys, with no bound on chain length, is:",
    ["Θ(1)", "Θ(log n)", "Θ(n)", "Θ(n log n)"],
    2,
    "All n keys can collide in one chain. Walking that list is Θ(n). Expected time under uniform hashing is Θ(1+α), which is a different bound.",
  ),
  q(
    "pyq-2020-p1p2-algo-05",
    "algorithms",
    "hard",
    "Insertion sort on an already sorted n-element array performs how many comparisons in the usual implementation that scans left until the insertion point?",
    ["Θ(1)", "Θ(n)", "Θ(n log n)", "Θ(n²)"],
    1,
    "Each new element is compared once with its already-sorted left neighbour and stops. That is n−1 comparisons, Θ(n) best case. The worst case (reverse order) is Θ(n²).",
  ),
  q(
    "pyq-2020-p1p2-net-01",
    "networking",
    "moderate",
    "End-to-end process addressing with port numbers, and reliable byte-stream delivery with retransmission, are functions of which OSI layer?",
    ["Network", "Transport", "Session", "Data link"],
    1,
    "TCP lives at the transport layer: ports multiplex applications, and ACK/retransmit give reliability. Routing and IP addresses are network-layer; frames and MAC addresses are data-link.",
  ),
  q(
    "pyq-2020-p1p2-net-02",
    "networking",
    "hard",
    "A 1500-byte IPv4 datagram (20-byte header, 1480-byte payload) must cross a 500-byte MTU link (also 20-byte IP headers). How many fragments are produced if fragmentation is allowed and options are absent?",
    ["2", "3", "4", "5"],
    2,
    "Each fragment's payload must be a multiple of 8. With 20-byte headers, max payload per fragment is 480 bytes (60×8). 1480 = 480+480+480+40, so four fragments.",
  ),
  q(
    "pyq-2020-p1p2-net-03",
    "networking",
    "hard",
    "CSMA/CD as used on classic shared Ethernet, versus CSMA/CA as used on 802.11, differ primarily because wireless stations:",
    [
      "Never collide, so collision detection is unnecessary",
      "Often cannot reliably hear a third station's transmission (hidden terminal), so they avoid collisions with RTS/CTS and random backoff rather than detecting them mid-frame",
      "Use token passing instead of carrier sense",
      "Operate only at the network layer",
    ],
    1,
    "A transmitting radio usually cannot listen for collisions on the same channel. 802.11 therefore randomizes access and may reserve the medium. Hidden terminals make CD unreliable even if energy could be sensed.",
  ),
  q(
    "pyq-2020-p1p2-net-04",
    "networking",
    "moderate",
    "Which device operates primarily with MAC addresses and does not decrement an IP TTL?",
    [
      "A router forwarding between two IPv4 subnets",
      "A Layer-2 switch forwarding an Ethernet frame inside one VLAN",
      "A host running traceroute",
      "A NAT gateway rewriting source IPs",
    ],
    1,
    "A pure L2 switch forwards on MAC learning and leaves the IP header untouched. Routers and NAT boxes are L3 and decrement TTL on routed packets.",
  ),
  q(
    "pyq-2020-p1p2-net-05",
    "networking",
    "hard",
    "In OSI terms, TLS record encryption and certificate-based peer authentication sit principally at the:",
    [
      "Physical layer, because they use ciphers",
      "Network layer, because they replace IPsec",
      "Presentation / session-adjacent layer above TCP, providing confidentiality and integrity of application bytes",
      "Data-link layer, because they need MAC addresses",
    ],
    2,
    "TLS runs over a transport (usually TCP) and presents a secure byte stream to HTTP and similar. It is the modern analogue of OSI presentation (and some session) services, not routing or framing.",
  ),
  q(
    "pyq-2020-p1p2-sec-01",
    "security",
    "moderate",
    "Crypto-ransomware that encrypts a registrar's file servers and withholds the keys until payment is made primarily attacks which CIA property?",
    [
      "Confidentiality only, because ciphertext is unreadable",
      "Integrity only, because bits change",
      "Availability, because authorized users cannot use the data until keys are restored",
      "Non-repudiation",
    ],
    2,
    "The operational harm is that the data cannot be used. Confidentiality may also suffer in double-extortion leaks, but the defining CIA impact of locking files is availability. Non-repudiation is not a CIA triad member.",
  ),
  q(
    "pyq-2020-p1p2-sec-02",
    "security",
    "hard",
    "A digital signature generated with the sender's private key, and verified with the sender's public key, provides:",
    [
      "Confidentiality of the message against eavesdroppers",
      "Integrity and origin authentication (and non-repudiation if keys are bound to identity), but not confidentiality",
      "Availability of the network path",
      "Forward secrecy for past sessions",
    ],
    1,
    "Anyone with the public key can verify, so the signature does not hide the payload. Alteration breaks the verify step, and only the private-key holder could have produced it.",
  ),
  q(
    "pyq-2020-p1p2-sec-03",
    "security",
    "hard",
    "Which defence stops classic in-band SQL injection even if the application concatenates no user text into SQL?",
    [
      "Escaping quotes in the application and then concatenating",
      "Parameterized queries / prepared statements that bind user values outside the SQL text",
      "HTTPS on the login form",
      "Storing passwords with SHA-1",
    ],
    1,
    "Bound parameters are never parsed as SQL. Ad-hoc escaping is brittle. TLS protects the pipe, not the query parser. Password hashing is unrelated to injection.",
  ),
  q(
    "pyq-2020-p1p2-sec-04",
    "security",
    "moderate",
    "A cryptographic hash used for password storage should be:",
    [
      "Invertible with the server's public key",
      "Slow (intentionally) and salted, so identical passwords hash differently and brute force is costly",
      "CRC32, because it is fast in hardware",
      "The same as encryption with a key stored next to the hash",
    ],
    1,
    "Hashes are one-way. A unique salt defeats rainbow tables. Password hashes (Argon2, bcrypt, scrypt, PBKDF2) are deliberately expensive. CRC32 is not a cryptographic hash.",
  ),
  q(
    "pyq-2020-p1p2-sec-05",
    "security",
    "hard",
    "In the CIA triad, which control is aimed first at integrity rather than confidentiality?",
    [
      "Encrypting a backup tape with AES-256",
      "An HMAC or a signed hash over a clearing file, checked before import",
      "A Faraday cage around a radio",
      "A site-to-site VPN whose only goal is to hide packet contents",
    ],
    1,
    "MAC/signature verification detects modification. Encryption and VPNs primarily hide content (confidentiality). A cage is an emanation/availability-adjacent physical control.",
  ),
  q(
    "pyq-2020-p1p2-wh-01",
    "warehouse",
    "moderate",
    "On a sales cube with dimensions Time, Product, Geography, selecting the single Time value 2020 and retaining Product × Geography is which OLAP operation?",
    ["Drill-down", "Roll-up", "Slice", "Pivot"],
    2,
    "A slice fixes one dimension to a single value and reduces dimensionality by one. Drill-down goes finer in a hierarchy; roll-up goes coarser; pivot rotates axes.",
  ),
  q(
    "pyq-2020-p1p2-wh-02",
    "warehouse",
    "hard",
    "Geography hierarchy is Country → State → City. Replacing City-level totals by State-level totals is:",
    [
      "Drill-down",
      "Roll-up",
      "Dice",
      "A star-schema fact insert",
    ],
    1,
    "Roll-up aggregates up a concept hierarchy. Drill-down would split states into cities. Dice selects a subcube on two or more dimensions without necessarily changing grain.",
  ),
  q(
    "pyq-2020-p1p2-sh-01",
    "shell",
    "moderate",
    "In a POSIX shell, $# expands to:",
    [
      "The process ID of the shell",
      "The number of positional parameters",
      "The exit status of the previous command",
      "The name of the current script",
    ],
    1,
    "$# is the count of $1, $2, …. $$ is PID, $? is the last exit status, $0 is the script or shell name.",
  ),
  q(
    "pyq-2020-p1p2-sh-02",
    "shell",
    "hard",
    "What is printed (on two lines)?",
    ["3 then 0", "3 then 1", "2 then 1", "3 then 3"],
    1,
    "set -- replaces the positional list with three words, so $# is 3. false exits with status 1, which $? reports.",
    {
      language: "bash",
      code: `set -- a b c
echo $#
false
echo $?`,
    },
  ),
  q(
    "pyq-2020-p1p2-sh-03",
    "shell",
    "hard",
    "Inside a shell script, $0 and $1 are respectively:",
    [
      "The last exit status and the argument count",
      "The script name (as invoked) and the first positional argument",
      "The first argument and the script name",
      "Always empty unless exported",
    ],
    1,
    "$0 is the name used to invoke the script. $1 is the first argument after that name. They need not be exported.",
  ),
];
