import { makeQuestion } from "@/data/make-question";

const q = makeQuestion(1, 2);

/** Memory-style Phase I Paper 2 bank for the 2018 Grade A cycle (original items). */
export const pyqP1P2_2018 = [
  q(
    "pyq-2018-p1p2-db-01",
    "database",
    "hard",
    "Relation R(A, B, C) has FDs A → B and B → C. Candidate keys and the highest normal form of R are:",
    [
      "Only {A} is a key; R is in BCNF",
      "Only {A} is a key; R is in 3NF but not BCNF",
      "Only {A} is a key; R is in 2NF but not 3NF",
      "{A} and {B} are keys; R is in BCNF",
    ],
    2,
    "A determines B and then C, so {A} is the sole candidate key. A → B is a full key dependency (2NF holds). B → C is a transitive dependency of a non-prime on a non-key, so 3NF fails.",
  ),
  q(
    "pyq-2018-p1p2-db-02",
    "database",
    "hard",
    "Under strict two-phase locking a transaction may release an exclusive lock only:",
    [
      "Immediately after the last write of that item, even if it will write again",
      "At commit or abort, so a peer cannot read an uncommitted write",
      "During the growing phase, to reduce deadlock",
      "Never; exclusive locks are held for the life of the DBMS process",
    ],
    1,
    "Basic 2PL already forbids lock acquisition after the first release. Strict 2PL keeps X-locks until end of transaction, which prevents cascading aborts from dirty reads.",
  ),
  q(
    "pyq-2018-p1p2-db-03",
    "database",
    "hard",
    "In a B+ tree of order 3 (at most 2 keys per node), which statement is correct?",
    [
      "All keys live only in internal nodes; leaves store pointers but no search keys",
      "All data-record pointers sit in the leaves, and leaves are linked for range scans",
      "A leaf may hold a different number of keys than its siblings after a legal split",
      "Internal nodes store full records, not routing keys",
    ],
    1,
    "B+ trees keep every record pointer in the leaf level and chain leaves so an ordered scan does not walk internal nodes. Internal nodes store separators only.",
  ),
  q(
    "pyq-2018-p1p2-db-04",
    "database",
    "moderate",
    "Which isolation anomaly is prevented by making a schedule conflict serializable?",
    [
      "Dirty reads only; lost updates may still occur",
      "Any conflict-equivalent interleaving that is not serial, including lost updates and write-write races that would cycle the precedence graph",
      "Phantoms caused by predicate inserts, even under a read-uncommitted lock protocol",
      "Media failure of the log disk",
    ],
    1,
    "Conflict serializability means the conflict graph is acyclic, so the schedule is conflict-equivalent to a serial one. Phantom anomalies need predicate/next-key locking; durability is a recovery property.",
  ),
  q(
    "pyq-2018-p1p2-db-05",
    "database",
    "hard",
    "Schedule: w1(X) r2(X) c2 c1. Recoverability fails because:",
    [
      "T1 writes X after T2 commits",
      "T2 reads T1’s uncommitted X and commits first, so T1 abort cannot be undone cleanly",
      "Two commits in a row are illegal in SQL",
      "The schedule has no writes",
    ],
    1,
    "A schedule is recoverable only if every dirty reader commits after the writer. Here T2 reads X from T1 and commits before T1.",
  ),

  q(
    "pyq-2018-p1p2-sql-01",
    "sql",
    "hard",
    "What does the query return?",
    [
      "Desks that have at least one OPEN ticket",
      "Desks that have no OPEN ticket, including desks with zero ticket rows",
      "Desks whose every ticket is OPEN",
      "A syntax error, because EXISTS cannot be negated",
    ],
    1,
    "NOT EXISTS is an anti-semi-join. A desk survives when the correlated subquery finds no OPEN ticket. Desks with no ticket rows also survive.",
    {
      language: "sql",
      code: `SELECT d.name
FROM desk d
WHERE NOT EXISTS (
  SELECT 1
  FROM ticket t
  WHERE t.desk_id = d.id
    AND t.status = 'OPEN'
);`,
    },
  ),
  q(
    "pyq-2018-p1p2-sql-02",
    "sql",
    "hard",
    "Team T1 has 7 staff; 3 of them earn more than 90,000. For this query, T1:",
    [
      "Appears with c = 7, because GROUP BY sees every staff row",
      "Appears with c = 3, because HAVING is ignored when WHERE is present",
      "Does not appear: WHERE leaves 3 rows and HAVING COUNT(*) >= 4 then rejects the group",
      "Appears with c = 4 after SQL rounds the count up",
    ],
    2,
    "WHERE is applied before grouping, so T1 contributes 3 rows and COUNT(*) is 3. HAVING then tests 3 >= 4 and drops the group.",
    {
      language: "sql",
      code: `SELECT team_id, COUNT(*) AS c
FROM staff
WHERE salary > 90000
GROUP BY team_id
HAVING COUNT(*) >= 4;`,
    },
  ),
  q(
    "pyq-2018-p1p2-sql-03",
    "sql",
    "moderate",
    "Which statement about TRUNCATE versus DELETE (no WHERE) on a heap table is typically correct?",
    [
      "TRUNCATE logs every deleted row and can be rolled back row-by-row in every engine",
      "DELETE without WHERE always drops the table definition",
      "TRUNCATE is a DDL-style bulk deallocate: it empties the table faster and typically cannot fire per-row DELETE triggers",
      "Both commands are identical to DROP TABLE",
    ],
    2,
    "TRUNCATE deallocates pages and resets identity in most engines; it is not a row-by-row DML loop. DELETE removes rows, can take a WHERE, and fires row triggers. Neither is DROP.",
  ),
  q(
    "pyq-2018-p1p2-sql-04",
    "sql",
    "hard",
    "Tables L and R have a NULL in the join column on one L row. An INNER JOIN on that column:",
    [
      "Matches the NULL to every R row",
      "Matches the NULL to any R NULL (NULL = NULL is true)",
      "Drops that L row, because NULL compared with any value (including NULL) fails the equality",
      "Becomes a LEFT JOIN automatically",
    ],
    2,
    "SQL three-valued logic treats NULL = x as unknown, so the inner-join predicate rejects the row. NULL = NULL is not true.",
  ),
  q(
    "pyq-2018-p1p2-sql-05",
    "sql",
    "moderate",
    "SELECT a FROM t UNION SELECT a FROM u  differs from UNION ALL in that UNION:",
    [
      "Preserves duplicate rows from both sides",
      "Eliminates duplicate rows in the combined result",
      "Requires the same table name on both sides",
      "Is illegal unless both queries have an ORDER BY",
    ],
    1,
    "UNION is a set operator and removes duplicates. UNION ALL is the bag version and keeps them.",
  ),

  q(
    "pyq-2018-p1p2-prog-01",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["6 6", "6 9", "9 6", "9 9"],
    1,
    "Java passes the int by value, so bump only changes its local copy. The array reference is copied but the object is shared, so a[0] becomes 9.",
    {
      language: "java",
      code: `public class Main {
  static void bump(int n, int[] a) {
    n = n + 3;
    a[0] = a[0] + 3;
  }
  public static void main(String[] args) {
    int n = 6;
    int[] a = {6};
    bump(n, a);
    System.out.print(n + " " + a[0]);
  }
}`,
    },
  ),
  q(
    "pyq-2018-p1p2-prog-02",
    "programming",
    "hard",
    "What is printed?",
    ["3", "4", "5", "6"],
    2,
    "The loop body runs for i = 0,1,2,3,4. When i becomes 5 the condition fails. Five increments of s yield 5.",
    {
      language: "java",
      code: `int s = 0;
for (int i = 0; i < 5; i++) s++;
System.out.print(s);`,
    },
  ),
  q(
    "pyq-2018-p1p2-prog-03",
    "programming",
    "hard",
    "What is printed by the C++ program?",
    ["12", "13", "20", "21"],
    0,
    "g(x) uses a reference, so x becomes 11. f receives a copy of 11 and returns 11+1=12. The caller’s x is already 11; the function result is 12.",
    {
      language: "cpp",
      code: `#include <iostream>
int f(int n) { return n + 1; }
void g(int& n) { n = n + 1; }
int main() {
  int x = 10;
  g(x);
  std::cout << f(x);
}`,
    },
  ),
  q(
    "pyq-2018-p1p2-prog-04",
    "programming",
    "hard",
    "What is printed?",
    ["120", "24", "6", "The call does not terminate"],
    1,
    "fact(4) = 4*fact(3)=4*3*fact(2)=4*3*2*fact(1)=24. The base case n<=1 returns 1.",
    {
      language: "java",
      code: `static int fact(int n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
}
System.out.print(fact(4));`,
    },
  ),
  q(
    "pyq-2018-p1p2-prog-05",
    "programming",
    "moderate",
    "In C, the declaration void f(int *p); and the call f(&x) for an int x pass:",
    [
      "The value of x by copy only; f cannot change x",
      "The address of x, so f may assign through p and update x",
      "A reference in the C++ sense, so p cannot be reseated",
      "The array x[] even if x is a scalar",
    ],
    1,
    "C has only pass-by-value, but the value passed is a pointer. Dereferencing that pointer writes the caller’s object.",
  ),
  q(
    "pyq-2018-p1p2-prog-06",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["A", "B", "AB", "Compilation fails"],
    1,
    "speak() is an instance method, so the call on an A reference bound to a B object dispatches to B.speak().",
    {
      language: "java",
      code: `class A { void speak() { System.out.print("A"); } }
class B extends A { void speak() { System.out.print("B"); } }
A x = new B();
x.speak();`,
    },
  ),
  q(
    "pyq-2018-p1p2-prog-07",
    "programming",
    "hard",
    "What is printed?",
    ["0 1 2", "1 2 3", "0 2 4", "1 3 5"],
    0,
    "i starts at 0. The body prints i then increments. The loop stops when i reaches 3, so 0 1 2 are printed.",
    {
      language: "cpp",
      code: `#include <iostream>
int main() {
  int i = 0;
  while (i < 3) {
    std::cout << i << " ";
    i++;
  }
}`,
    },
  ),
  q(
    "pyq-2018-p1p2-prog-08",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["caught 1", "caught 0", "uncaught", "caught 2"],
    0,
    "f(0) throws. The catch handler runs and prints caught. The finally block increments n after the print, so the printed value is 1.",
    {
      language: "java",
      code: `static int n = 0;
static void f(int x) {
  try {
    if (x == 0) throw new RuntimeException();
  } catch (RuntimeException e) {
    n++;
    System.out.print("caught " + n);
  } finally {
    n++;
  }
}
f(0);`,
    },
  ),
  q(
    "pyq-2018-p1p2-prog-09",
    "programming",
    "moderate",
    "A Java constructor of a subclass:",
    [
      "Must never call super, because fields are defaulted automatically",
      "Implicitly or explicitly invokes a superclass constructor before the subclass body runs",
      "Can be abstract",
      "Is inherited by subclasses as a method named after the parent",
    ],
    1,
    "The first action of a constructor is a super(...) (or this(...)) call. Constructors are not inherited as ordinary methods and cannot be abstract.",
  ),
  q(
    "pyq-2018-p1p2-prog-10",
    "programming",
    "hard",
    "What is printed by the C++ program?",
    ["2", "3", "5", "6"],
    2,
    "*p and a refer to the same int. After a = 3 the pointee is 3; *p += 2 makes it 5.",
    {
      language: "cpp",
      code: `#include <iostream>
int main() {
  int a = 1;
  int* p = &a;
  a = 3;
  *p += 2;
  std::cout << a;
}`,
    },
  ),
  q(
    "pyq-2018-p1p2-prog-11",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["99 99", "0 4", "0 99", "99 4"],
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
    System.out.print(f(-2) + " " + f(4));
  }
}`,
    },
  ),
  q(
    "pyq-2018-p1p2-prog-12",
    "programming",
    "hard",
    "What is printed by the C++ program?",
    ["PQqp", "QPpq", "PQpq", "QPqp"],
    0,
    "The base constructs first (P) then the derived (Q). Destruction is reverse: q then p.",
    {
      language: "cpp",
      code: `#include <iostream>
using namespace std;
class P {
public:
  P() { cout << "P"; }
  ~P() { cout << "p"; }
};
class Q : public P {
public:
  Q() { cout << "Q"; }
  ~Q() { cout << "q"; }
};
int main() { Q x; }`,
    },
  ),
  q(
    "pyq-2018-p1p2-prog-13",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["P", "Q", "R", "Compilation fails: default method conflict"],
    2,
    "Default methods are instance methods. x.id() uses dynamic dispatch on the runtime type R. R’s override wins.",
    {
      language: "java",
      code: `interface P { default String id() { return "P"; } }
class Q implements P { public String id() { return "Q"; } }
class R extends Q { public String id() { return "R"; } }
public class Main {
  public static void main(String[] args) {
    P x = new R();
    System.out.print(x.id());
  }
}`,
    },
  ),
  q(
    "pyq-2018-p1p2-prog-14",
    "programming",
    "hard",
    "Declarations void g(int x, int y = 0); and void g(int x); make the call g(8):",
    [
      "Select the one-parameter overload uniquely",
      "Select the defaulted overload uniquely",
      "Ambiguous, so the program is ill-formed",
      "A linker error only, never diagnosed at compile time",
    ],
    2,
    "Both overloads are viable for a single int. Default arguments do not break the tie, so overload resolution fails.",
  ),
  q(
    "pyq-2018-p1p2-prog-15",
    "programming",
    "moderate",
    "Which statement about a Java abstract class is correct?",
    [
      "It is forbidden to declare any constructor",
      "It may mix concrete methods with abstract methods, and new AbstractType() is illegal",
      "Marking a class abstract is ignored if every method has a body",
      "It cannot extend another class",
    ],
    1,
    "Abstract classes exist to be subclassed. They may have constructors, fields, and concrete methods. The abstract modifier still forbids direct instantiation.",
  ),

  q(
    "pyq-2018-p1p2-py-01",
    "python",
    "hard",
    "What is printed?",
    [
      "[2, 4] [6, 5, 4]",
      "[2, 4] [6, 5]",
      "[1, 3, 5] [6, 5, 4, 3]",
      "[2, 3, 4] [6, 5, 4]",
    ],
    0,
    "a[1:5:2] takes indices 1 and 3 → [2, 4]. a[-1:2:-1] starts at index 5, steps backward, and stops before index 2 → [6, 5, 4].",
    {
      language: "python",
      code: `a = [1, 2, 3, 4, 5, 6]
print(a[1:5:2], a[-1:2:-1])`,
    },
  ),
  q(
    "pyq-2018-p1p2-py-02",
    "python",
    "hard",
    "What is printed?",
    [
      "[10] [20] [30] then False False",
      "[10, 20] [10, 20] [30] then True False",
      "[10, 20] [10, 20] [30] then False False",
      "[10] [10, 20] [30] then True False",
    ],
    1,
    "The default list is created once. g(10) and g(20) append to that same object, so x is y. The call g(30, []) supplies a fresh list, so x is not z.",
    {
      language: "python",
      code: `def g(x, acc=[]):
    acc.append(x)
    return acc
x = g(10)
y = g(20)
z = g(30, [])
print(x, y, z)
print(x is y, x is z)`,
    },
  ),
  q(
    "pyq-2018-p1p2-py-03",
    "python",
    "moderate",
    "An existing text file holds bytes. Which open mode truncates that file to length zero as soon as open succeeds?",
    ["'r'", "'r+'", "'w'", "'a'"],
    2,
    "'w' (and 'w+') truncate. 'r' is read-only and does not create or truncate. 'r+' updates in place from offset 0 without truncating. 'a' appends and preserves existing bytes.",
  ),
  q(
    "pyq-2018-p1p2-py-04",
    "python",
    "hard",
    "What is printed?",
    [
      "['78', '90'] False True",
      "['78', '90'] True True",
      "['a78b90'] False True",
      "['7890'] False True",
    ],
    1,
    "findall with [0-9]+ yields the two digit runs. match must succeed at the start, so match(...) is None is True. search succeeds anywhere, so the last flag is also True.",
    {
      language: "python",
      code: `import re
s = 'a78b90'
print(re.findall('[0-9]+', s), re.match('[0-9]+', s) is None, re.search('[0-9]+', s) is not None)`,
    },
  ),
  q(
    "pyq-2018-p1p2-py-05",
    "python",
    "hard",
    "Which object can be used as a dict key?",
    [
      "[3, 4]",
      "{3, 4}",
      "(3, [4])",
      "(3, (4, 5))",
    ],
    3,
    "Keys must be hashable. Lists and sets are mutable. A tuple is hashable only when every element is; the nested list in (3, [4]) makes it unhashable. (3, (4, 5)) is a nested tuple of immutables.",
  ),

  q(
    "pyq-2018-p1p2-algo-01",
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
    "pyq-2018-p1p2-algo-02",
    "algorithms",
    "moderate",
    "The recurrence T(n) = 2T(n/2) + Θ(n) with T(1) = Θ(1) solves to:",
    ["Θ(n)", "Θ(n log n)", "Θ(n²)", "Θ(2^n)"],
    1,
    "Master theorem case 2: a = 2, b = 2, f(n) = Θ(n^{log_b a}). The solution is Θ(n log n), the same as the mergesort recurrence.",
  ),
  q(
    "pyq-2018-p1p2-algo-03",
    "algorithms",
    "hard",
    "Dijkstra’s algorithm, implemented with a binary heap, is unsafe or incorrect when the input graph:",
    [
      "Is a directed acyclic graph",
      "Contains a negative-weight edge",
      "Contains a cycle of non-negative weights",
      "Is disconnected",
    ],
    1,
    "The algorithm permanently labels a vertex when it is extracted from the priority queue. A later cheaper path through a negative edge would violate that assumption. Disconnected graphs and non-negative cycles are fine.",
  ),
  q(
    "pyq-2018-p1p2-algo-04",
    "algorithms",
    "moderate",
    "Worst-case search time in a separately chained hash table that stores n keys, with no bound on chain length, is:",
    ["Θ(1)", "Θ(log n)", "Θ(n)", "Θ(n log n)"],
    2,
    "All n keys can collide in one chain. Walking that list is Θ(n). Expected time under uniform hashing is Θ(1+α), which is a different bound.",
  ),
  q(
    "pyq-2018-p1p2-algo-05",
    "algorithms",
    "hard",
    "BFS from a source on an unweighted graph computes:",
    [
      "A minimum spanning tree if and only if the graph is directed",
      "Shortest paths in number of edges from the source to every reachable vertex",
      "The same distances as Bellman–Ford even when some edges have negative weight",
      "A topological order of a cyclic graph",
    ],
    1,
    "BFS layers vertices by hop count. That is shortest path only when every edge has the same (usually unit) weight. Negative weights need a different algorithm; cycles forbid a topological order.",
  ),

  q(
    "pyq-2018-p1p2-net-01",
    "networking",
    "moderate",
    "End-to-end process addressing with port numbers, and reliable byte-stream delivery with retransmission, are functions of which OSI layer?",
    ["Network", "Transport", "Session", "Data link"],
    1,
    "TCP lives at the transport layer: ports multiplex applications, and ACK/retransmit give reliability. Routing and IP addresses are network-layer; frames and MAC addresses are data-link.",
  ),
  q(
    "pyq-2018-p1p2-net-02",
    "networking",
    "hard",
    "A host’s IPv4 address is 192.168.10.45/28. The subnet’s usable address range (excluding network and broadcast) begins and ends at:",
    [
      "192.168.10.0 – 192.168.10.255",
      "192.168.10.32 – 192.168.10.47",
      "192.168.10.33 – 192.168.10.46",
      "192.168.10.45 – 192.168.10.45 only",
    ],
    2,
    "/28 means 16 addresses. 45 sits in the block 32–47. Network is .32, broadcast is .47, so hosts are .33–.46.",
  ),
  q(
    "pyq-2018-p1p2-net-03",
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
    "pyq-2018-p1p2-net-04",
    "networking",
    "hard",
    "DNS name resolution for a hostname typically uses UDP port 53. SMTP message transfer between mail servers typically uses:",
    [
      "TCP port 25",
      "UDP port 80",
      "TCP port 22 only",
      "ICMP echo only",
    ],
    0,
    "SMTP’s classic submission/transfer port is TCP 25. HTTP is 80/TCP; SSH is 22/TCP. ICMP is not a mail protocol.",
  ),
  q(
    "pyq-2018-p1p2-net-05",
    "networking",
    "moderate",
    "HTTP, as used on the World Wide Web, is an application-layer protocol that typically rides on:",
    [
      "A raw Ethernet frame with no IP header",
      "TCP (and, with TLS, a secure byte stream above TCP)",
      "UDP only, because browsers never retransmit",
      "The physical layer exclusively",
    ],
    1,
    "Classic HTTP uses TCP port 80; HTTPS wraps HTTP in TLS over TCP 443. UDP is not the usual web-page transport (HTTP/3/QUIC is a later exception, not the 2018 default story).",
  ),

  q(
    "pyq-2018-p1p2-sec-01",
    "security",
    "moderate",
    "Crypto-ransomware that encrypts a registrar’s file servers and withholds the keys until payment is made primarily attacks which CIA property?",
    [
      "Confidentiality only, because ciphertext is unreadable",
      "Integrity only, because bits change",
      "Availability, because authorized users cannot use the data until keys are restored",
      "Non-repudiation",
    ],
    2,
    "The operational harm is that the data cannot be used. Confidentiality may also suffer in double-extortion leaks, but the defining CIA impact of locking files is availability.",
  ),
  q(
    "pyq-2018-p1p2-sec-02",
    "security",
    "hard",
    "A digital signature generated with the sender’s private key, and verified with the sender’s public key, provides:",
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
    "pyq-2018-p1p2-sec-03",
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
    "Bound parameters are never parsed as SQL. Ad-hoc escaping is brittle. TLS protects the pipe, not the query parser.",
  ),
  q(
    "pyq-2018-p1p2-sec-04",
    "security",
    "moderate",
    "A cryptographic hash used for password storage should be:",
    [
      "Invertible with the server’s public key",
      "Slow (intentionally) and salted, so identical passwords hash differently and brute force is costly",
      "CRC32, because it is fast in hardware",
      "The same as encryption with a key stored next to the hash",
    ],
    1,
    "Hashes are one-way. A unique salt defeats rainbow tables. Password hashes (bcrypt, PBKDF2, scrypt, later Argon2) are deliberately expensive. CRC32 is not a cryptographic hash.",
  ),
  q(
    "pyq-2018-p1p2-sec-05",
    "security",
    "moderate",
    "Two-factor authentication that asks for a password and a one-time code from a hardware token combines:",
    [
      "Two knowledge factors",
      "Something you know and something you have",
      "Two inherence (biometric) factors",
      "A firewall rule and a VLAN tag",
    ],
    1,
    "The password is knowledge; the token is possession. Biometrics are inherence. Network plumbing is not an authentication factor.",
  ),

  q(
    "pyq-2018-p1p2-wh-01",
    "warehouse",
    "moderate",
    "On a filings cube with dimensions Time, Desk, Status, selecting the single Time value 2018 and retaining Desk × Status is which OLAP operation?",
    ["Drill-down", "Roll-up", "Slice", "Pivot"],
    2,
    "A slice fixes one dimension to a single value and reduces dimensionality by one. Drill-down goes finer in a hierarchy; roll-up goes coarser; pivot rotates axes.",
  ),
  q(
    "pyq-2018-p1p2-wh-02",
    "warehouse",
    "hard",
    "A star schema stores a central fact table linked to denormalised dimension tables. A snowflake schema additionally:",
    [
      "Forbids any foreign key from fact to dimension",
      "Normalises dimension hierarchies into separate tables (for example City → State → Country)",
      "Stores only XML documents and no numeric facts",
      "Is identical to an OLTP third-normal-form order-entry model",
    ],
    1,
    "Snowflakeing splits dimension attributes along hierarchies. The fact table still holds measures and dimension keys. That is a warehouse modelling choice, not a general OLTP design.",
  ),

  q(
    "pyq-2018-p1p2-sh-01",
    "shell",
    "moderate",
    "In a POSIX shell, $# expands to:",
    [
      "The process ID of the current shell ($$)",
      "How many positional parameters are set",
      "The exit status of the previous command ($?)",
      "The invocation name ($0)",
    ],
    1,
    "$# counts $1, $2, …. $$ is PID, $? is the last status, $0 is the script or shell name.",
  ),
  q(
    "pyq-2018-p1p2-sh-02",
    "shell",
    "hard",
    "What is printed (on two lines)?",
    ["4 then 0", "4 then 1", "3 then 1", "4 then 4"],
    1,
    "set -- replaces the positional list with four words, so $# is 4. false exits with status 1, which $? reports.",
    {
      language: "bash",
      code: `set -- w x y z
echo $#
false
echo $?`,
    },
  ),
  q(
    "pyq-2018-p1p2-sh-03",
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
