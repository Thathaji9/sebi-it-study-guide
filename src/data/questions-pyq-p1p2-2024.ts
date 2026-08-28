import { makeQuestion } from "@/data/make-question";

const q = makeQuestion(1, 2);

export const pyqP1P2_2024 = [
  q(
    "pyq-2024-p1p2-db-01",
    "database",
    "hard",
    "A surveillance relation CaseStaff(case_id, statute, officer) has FDs {case_id, statute} → officer and officer → statute. Which statement is correct?",
    [
      "The relation is not in 2NF because officer depends on part of a candidate key",
      "The relation is in 3NF but not BCNF, because officer → statute has a non-superkey determinant whose right-hand side is prime",
      "The relation is in BCNF because every left-hand side is a candidate key",
      "There is no candidate key other than {case_id, statute}",
    ],
    1,
    "Candidate keys are {case_id, statute} and {case_id, officer}. officer → statute violates BCNF (officer is not a superkey) but 3NF holds because statute is prime.",
  ),
  q(
    "pyq-2024-p1p2-db-02",
    "database",
    "hard",
    "A read-heavy MIS dashboard runs short queries against a slowly changing reference table. Conflicts are rare. Why is optimistic concurrency control (OCC) often preferred to strict two-phase locking here?",
    [
      "OCC never aborts, so readers always see a consistent snapshot without validation",
      "OCC avoids holding read/write locks for the whole transaction and aborts only if validation at commit detects a conflicting write; 2PL would block on locks even when no conflict occurs",
      "OCC is the only protocol that guarantees conflict serializability",
      "Strict 2PL cannot be used on read-only transactions",
    ],
    1,
    "OCC: read/compute without locks, validate at commit, abort/retry on conflict. Attractive when writes collide infrequently. Strict 2PL serializes via locks and can stall readers. Both can be made serializable; the difference is blocking versus abort.",
  ),
  q(
    "pyq-2024-p1p2-db-03",
    "database",
    "hard",
    "Schedule S over item X: r1(X) w2(X) w1(X) c1 c2. Which statement is true?",
    [
      "S is conflict serializable because both transactions commit",
      "The conflict graph has a cycle T1 → T2 and T2 → T1, so S is not conflict serializable",
      "S is identical to the serial order T2 then T1",
      "There are no conflicting operations because the item is the same",
    ],
    1,
    "r1(X)–w2(X) is a rw conflict (T1 → T2) and w2(X)–w1(X) is a ww conflict (T2 → T1). A cycle means S is not CSR. Commit order does not repair the cycle.",
  ),
  q(
    "pyq-2024-p1p2-db-04",
    "database",
    "moderate",
    "In a B+ tree index on trade_id, a range scan of all trades with trade_id between two values is efficient mainly because:",
    [
      "Internal nodes store full records, so the scan never touches leaves",
      "All record pointers live in leaves and those leaves are chained, so the scan walks a linked sequence after finding the start leaf",
      "Hash overflow chains replace the leaf level for ranges",
      "Every internal node is itself a complete sorted file of records",
    ],
    1,
    "B+ internals hold separator keys only. Data pointers sit in leaves; sibling links make a range a sequential leaf walk after one root-to-leaf descent.",
  ),
  q(
    "pyq-2024-p1p2-db-05",
    "database",
    "moderate",
    "Two clerks read the same unfilled order quantity 100, each allocates 40, and both write back 60. The remaining quantity should have been 20. This anomaly is:",
    [
      "A dirty read, because one clerk read uncommitted data",
      "A lost update: both based their write on the same original value, so one increment/decrement disappeared",
      "A phantom, because a new row appeared in a range",
      "A deadlock, because each waited for the other",
    ],
    1,
    "Classic lost update: two read-modify-write cycles without mutual exclusion. Dirty read needs an uncommitted write; phantom needs a changing result set; deadlock is waiting, not a silent overwrite.",
  ),

  q(
    "pyq-2024-p1p2-sql-01",
    "sql",
    "hard",
    "Table orders has rows (oid) 1 and 2. Table fills has rows (oid, qty) (1,10) and (1,20). How many rows does the query return?",
    ["1", "2", "3", "4"],
    2,
    "LEFT JOIN keeps every order. oid 1 matches two fills (two rows). oid 2 matches none, so one row with NULL fill columns. Total 3.",
    {
      language: "sql",
      code: `SELECT o.oid, f.qty
FROM orders o
LEFT JOIN fills f ON o.oid = f.oid;`,
    },
  ),
  q(
    "pyq-2024-p1p2-sql-02",
    "sql",
    "hard",
    "Table t(x) holds 1, 2 and NULL. What does the query return?",
    ["2 and 2", "2 and 3", "3 and 3", "3 and 2"],
    1,
    "COUNT(x) ignores NULL, so 2. COUNT(*) counts rows, so 3.",
    {
      language: "sql",
      code: `SELECT COUNT(x), COUNT(*) FROM t;`,
    },
  ),
  q(
    "pyq-2024-p1p2-sql-03",
    "sql",
    "moderate",
    "A desk wants brokers who have at least one trade above 1 crore. Which predicate is a semi-join test that stops at the first matching trade and does not depend on the subquery SELECT list?",
    [
      "amt IN (SELECT amt FROM trade)",
      "EXISTS (SELECT 1 FROM trade t WHERE t.broker_id = b.id AND t.amt > 10000000)",
      "NOT IN (SELECT amt FROM trade WHERE amt IS NULL)",
      "COUNT(*) OVER (PARTITION BY broker_id) = 1",
    ],
    1,
    "EXISTS is true iff the subquery produces any row. SELECT 1 is a convention; the engine does not use that 1 as a value. IN compares a scalar list and can stumble on NULLs.",
  ),
  q(
    "pyq-2024-p1p2-sql-04",
    "sql",
    "hard",
    "The query below is run on emp(dept, salary) with three rows in dept A (salaries 10, 20, 30) and one row in dept B (salary 50). Which departments appear in the result?",
    ["Only A", "Only B", "A and B", "Neither; HAVING cannot use AVG"],
    0,
    "GROUP BY builds one group per dept. HAVING filters groups: AVG(A)=20 which is less than 40, AVG(B)=50 which is not. Only A survives. WHERE cannot host AVG because aggregation happens after grouping.",
    {
      language: "sql",
      code: `SELECT dept, AVG(salary)
FROM emp
GROUP BY dept
HAVING AVG(salary) < 40;`,
    },
  ),
  q(
    "pyq-2024-p1p2-sql-05",
    "sql",
    "moderate",
    "Which pair is equivalent for two union-compatible queries Q1 and Q2 that never produce NULL rows?",
    [
      "Q1 EXCEPT Q2 is rows in Q1 that are also in Q2",
      "Q1 UNION ALL Q2 concatenates bags and keeps duplicates; Q1 UNION Q2 is the set union",
      "Q1 INTERSECT Q2 is the same as Q1 UNION Q2",
      "EXCEPT and INTERSECT both keep duplicates by default in the SQL standard",
    ],
    1,
    "UNION ALL is bag concatenation. UNION, INTERSECT and EXCEPT are set operators (DISTINCT). EXCEPT is difference, not intersection.",
  ),

  q(
    "pyq-2024-p1p2-prog-01",
    "programming",
    "hard",
    "What is printed by the following Java program?",
    ["3 3", "3 9", "9 3", "9 9"],
    1,
    "Field access uses the compile-time type of the reference, so x.k is A's 3. Instance method f() is dispatched on the runtime object, so B.f() returns 9.",
    {
      language: "java",
      code: `class A {
  int k = 3;
  int f() { return k; }
}
class B extends A {
  int k = 9;
  int f() { return k; }
}
public class Main {
  public static void main(String[] args) {
    A x = new B();
    System.out.print(x.k + " " + x.f());
  }
}`,
    },
  ),
  q(
    "pyq-2024-p1p2-prog-02",
    "programming",
    "hard",
    "What is printed by the following Java program?",
    ["P2C", "2PC", "PC2", "P C2"],
    0,
    "C() calls super(2). P(int) first delegates to P() via this(), which prints P, then prints 2, then C() prints C. Output P2C.",
    {
      language: "java",
      code: `class P {
  P() { System.out.print("P"); }
  P(int n) { this(); System.out.print(n); }
}
class C extends P {
  C() { super(2); System.out.print("C"); }
}
public class Main {
  public static void main(String[] args) {
    new C();
  }
}`,
    },
  ),
  q(
    "pyq-2024-p1p2-prog-03",
    "programming",
    "hard",
    "What is printed by the following C++ program?",
    ["023", "123", "003", "223"],
    0,
    "a is a copy, so assigning a does not change x. b is a reference to y, so y becomes 2. c points at z, so *c writes 3. Prints 023.",
    {
      language: "cpp",
      code: `#include <iostream>
using namespace std;
void f(int a, int &b, int *c) {
  a = 1; b = 2; *c = 3;
}
int main() {
  int x = 0, y = 0, z = 0;
  f(x, y, &z);
  cout << x << y << z;
}`,
    },
  ),
  q(
    "pyq-2024-p1p2-prog-04",
    "programming",
    "moderate",
    "What is printed by the following Java program?",
    ["SE", "SEBI", "BI", "null"],
    0,
    "String.concat returns a new String and does not mutate the receiver. The local s still refers to \"SE\".",
    {
      language: "java",
      code: `public class Main {
  public static void main(String[] args) {
    String s = "SE";
    s.concat("BI");
    System.out.print(s);
  }
}`,
    },
  ),
  q(
    "pyq-2024-p1p2-prog-05",
    "programming",
    "moderate",
    "What is printed by the following C++ program?",
    ["A", "B", "AB", "compilation error"],
    1,
    "p() is virtual. The static type of q is A* but the dynamic type is B, so B::p runs.",
    {
      language: "cpp",
      code: `#include <iostream>
using namespace std;
struct A { virtual void p() { cout << "A"; } };
struct B : A { void p() { cout << "B"; } };
int main() {
  A *q = new B();
  q->p();
}`,
    },
  ),
  q(
    "pyq-2024-p1p2-prog-06",
    "programming",
    "hard",
    "What does g() return?",
    ["0", "1", "2", "The method does not compile"],
    1,
    "The return value 1 is captured before finally runs. finally assigns 2 to the local x but does not return, so the already-captured 1 is still delivered.",
    {
      language: "java",
      code: `public class Main {
  static int g() {
    int x = 0;
    try {
      x = 1;
      return x;
    } finally {
      x = 2;
    }
  }
  public static void main(String[] args) {
    System.out.print(g());
  }
}`,
    },
  ),
  q(
    "pyq-2024-p1p2-prog-07",
    "programming",
    "hard",
    "What is printed by the following Java program?",
    ["A", "B", "AB", "compilation fails because static methods cannot be hidden"],
    0,
    "static m() is resolved on the compile-time type of t, which is A. B.m hides rather than overrides. The call prints A.",
    {
      language: "java",
      code: `class A { static void m() { System.out.print("A"); } }
class B extends A { static void m() { System.out.print("B"); } }
public class Main {
  public static void main(String[] args) {
    A t = new B();
    t.m();
  }
}`,
    },
  ),
  q(
    "pyq-2024-p1p2-prog-08",
    "programming",
    "moderate",
    "What is printed by the following Java program?",
    ["2", "3", "5", "6"],
    2,
    "case 2 matches and there is no break, so execution falls through case 3. s becomes 2+3=5.",
    {
      language: "java",
      code: `public class Main {
  public static void main(String[] args) {
    int n = 2, s = 0;
    switch (n) {
      case 1: s += 1;
      case 2: s += 2;
      case 3: s += 3;
    }
    System.out.print(s);
  }
}`,
    },
  ),
  q(
    "pyq-2024-p1p2-prog-09",
    "programming",
    "moderate",
    "What is printed by the following Java program?",
    ["3", "5", "8", "The call does not terminate"],
    1,
    "p is Fibonacci: p(0)=0, p(1)=1, p(2)=1, p(3)=2, p(4)=3, p(5)=5.",
    {
      language: "java",
      code: `public class Main {
  static int p(int n) {
    if (n <= 1) return n;
    return p(n - 1) + p(n - 2);
  }
  public static void main(String[] args) {
    System.out.print(p(5));
  }
}`,
    },
  ),
  q(
    "pyq-2024-p1p2-prog-10",
    "programming",
    "hard",
    "What is printed by the following Java program?",
    ["1", "7", "9", "ArrayIndexOutOfBoundsException"],
    1,
    "a[0]=7 mutates the caller's array. Rebinding a to a new array is local to the parameter. t[0] remains 7.",
    {
      language: "java",
      code: `public class Main {
  static void bump(int[] a) {
    a[0] = 7;
    a = new int[] { 9 };
  }
  public static void main(String[] args) {
    int[] t = { 1 };
    bump(t);
    System.out.print(t[0]);
  }
}`,
    },
  ),
  q(
    "pyq-2024-p1p2-prog-11",
    "programming",
    "moderate",
    "What is printed by the following C++ program?",
    ["445", "466", "456", "555"],
    1,
    "n++ yields 4 then n becomes 5. ++n then yields 6 and n is 6. Prints 466.",
    {
      language: "cpp",
      code: `#include <iostream>
using namespace std;
int main() {
  int n = 4;
  int x = n++;
  int y = ++n;
  cout << x << y << n;
}`,
    },
  ),
  q(
    "pyq-2024-p1p2-prog-12",
    "programming",
    "hard",
    "With the usual Integer cache of -128 through 127, what is printed?",
    ["true true", "true false", "false true", "false false"],
    1,
    "valueOf(40) is cached, so a and b are the same object. 400 is outside the mandated cache, so c and d are distinct objects even though they compare equal by value.",
    {
      language: "java",
      code: `public class Main {
  public static void main(String[] args) {
    Integer a = 40, b = 40;
    Integer c = 400, d = 400;
    System.out.print((a == b) + " " + (c == d));
  }
}`,
    },
  ),
  q(
    "pyq-2024-p1p2-prog-13",
    "programming",
    "moderate",
    "A Java abstract class used as a service base type may:",
    [
      "It can be instantiated if it declares a constructor",
      "It may mix abstract and concrete methods and may declare constructors for use by subclasses",
      "It may extend two other classes",
      "It cannot declare fields",
    ],
    1,
    "Abstract classes are not instantiated, may hold state and constructors, and Java still allows only single class inheritance.",
  ),
  q(
    "pyq-2024-p1p2-prog-14",
    "programming",
    "hard",
    "Multiple class inheritance in C++ can duplicate a common ancestor (the diamond). The usual language-level fix is:",
    [
      "Declaring the shared base as a friend of both children",
      "Virtual inheritance of the common base so there is a single shared subobject",
      "Making every destructor inline",
      "Replacing virtual functions with function templates",
    ],
    1,
    "virtual base classes collapse the duplicated ancestor into one subobject. Friends and templates do not fix layout duplication.",
  ),
  q(
    "pyq-2024-p1p2-prog-15",
    "programming",
    "moderate",
    "A Java subclass method that overrides a parent method throwing IOException may:",
    [
      "Throw Exception (a broader checked exception)",
      "Throw FileNotFoundException (a more specific checked exception) or throw nothing",
      "Throw any Error subclass only if the parent listed it",
      "Never throw RuntimeException",
    ],
    1,
    "An override cannot add new or broader checked exceptions. Narrowing the checked set, or throwing unchecked exceptions, is allowed.",
  ),

  q(
    "pyq-2024-p1p2-py-01",
    "python",
    "hard",
    "If s = 'GRADE', what is s[-4:-1]?",
    ["'RAD'", "'RADE'", "'GAD'", "'RA'"],
    0,
    "Index -4 is 'R' (same as 1). The end -1 is exclusive, so the slice stops before 'E'. Characters are R, A, D.",
  ),
  q(
    "pyq-2024-p1p2-py-02",
    "python",
    "hard",
    "A script must read the first line of an existing positions.csv and then overwrite a field in place without wiping the rest of the file. Which open mode is appropriate?",
    [
      "'w', because it opens for writing at the start",
      "'r+', because the file must already exist, the pointer starts at the beginning, and both reads and writes are allowed without truncating",
      "'w+', because it never truncates",
      "'a', because append mode lets you seek and rewrite earlier bytes portably",
    ],
    1,
    "'r+' is read/write, no truncate, pointer at start; FileNotFoundError if missing. 'w'/'w+' truncate. 'a' forces writes to the end.",
  ),
  q(
    "pyq-2024-p1p2-py-03",
    "python",
    "moderate",
    "What is printed by the following Python snippet?",
    ["['12', '3']", "['1', '2', '3']", "['A12', 'B3']", "['A', 'B']"],
    0,
    "The pattern \\d+ matches one or more digits. findall returns the two maximal digit runs '12' and '3', not single digits.",
    {
      language: "python",
      code: `import re
print(re.findall(r"\\d+", "A12-B3"))`,
    },
  ),
  q(
    "pyq-2024-p1p2-py-04",
    "python",
    "hard",
    "What is printed by the following Python snippet?",
    ["[1, 8, 4]", "[1, 8, 3, 4]", "[1, [8], 4]", "[8, 4]"],
    0,
    "Slice assignment replaces the span [1:3] (values 2 and 3) with the single element 8, so the list becomes [1, 8, 4].",
    {
      language: "python",
      code: `a = [1, 2, 3, 4]
a[1:3] = [8]
print(a)`,
    },
  ),
  q(
    "pyq-2024-p1p2-py-05",
    "python",
    "hard",
    "What is printed by the following Python snippet?",
    ["3 c", "1 c", "1 a", "2 b"],
    1,
    "In Python, 1, True and 1.0 are equal and hash-equal, so they occupy one dict slot. Later writes overwrite. len is 1 and d[1] is the last value 'c'.",
    {
      language: "python",
      code: `d = {1: "a", True: "b", 1.0: "c"}
print(len(d), d[1])`,
    },
  ),

  q(
    "pyq-2024-p1p2-algo-01",
    "algorithms",
    "hard",
    "For comparison-based merge sort on n keys, the worst-case time is:",
    [
      "Θ(n) when the input is already sorted",
      "Θ(n log n) on every input, including reverse-sorted arrays",
      "Θ(n²) on reverse-sorted input, like naive quicksort",
      "Θ(log n) because the merge step is constant time",
    ],
    1,
    "The recursion tree always has Θ(log n) levels and Θ(n) work per level. Sorted or reverse-sorted input does not unbalance merge sort. That quadratic trap is for a bad quicksort pivot.",
  ),
  q(
    "pyq-2024-p1p2-algo-02",
    "algorithms",
    "moderate",
    "A surveillance graph of brokers (unweighted edges = 'traded with') should report the fewest hops from a seed broker to every other reachable broker. Which algorithm is appropriate?",
    [
      "Dijkstra with negative-edge handling",
      "BFS from the seed, because hop distance on an unweighted graph is the BFS layer",
      "Kruskal, because a minimum spanning tree minimises hops",
      "Binary search on the adjacency matrix",
    ],
    1,
    "Unweighted shortest paths = BFS. Dijkstra is for non-negative weights and is unnecessary here. MST does not preserve hop distances. Binary search needs a sorted array, not a graph.",
  ),
  q(
    "pyq-2024-p1p2-algo-03",
    "algorithms",
    "hard",
    "Quicksort that always pivots on the last element is run on an already sorted array of n distinct keys. The time is:",
    ["Θ(n log n)", "Θ(n)", "Θ(n²)", "Θ(n log log n)"],
    2,
    "Each partition is 0 vs n-1, so the recurrence is T(n)=T(n-1)+Θ(n) = Θ(n²). Average case with a random/median pivot is still Θ(n log n).",
  ),
  q(
    "pyq-2024-p1p2-algo-04",
    "algorithms",
    "moderate",
    "Under simple uniform hashing with n keys in m slots and load factor α = n/m, expected unsuccessful search with separate chaining is:",
    ["Θ(m)", "Θ(1 + α)", "Θ(n log m)", "Θ(α²)"],
    1,
    "The scan of a chain is proportional to its expected length α, plus the address computation, hence Θ(1+α).",
  ),
  q(
    "pyq-2024-p1p2-algo-05",
    "algorithms",
    "moderate",
    "The 0/1 knapsack (take each item at most once) is solved optimally in O(nW) time by:",
    [
      "Greedy selection by value/weight ratio, as in fractional knapsack",
      "Dynamic programming on remaining capacity",
      "Huffman coding of item weights",
      "DFS of the MST of items",
    ],
    1,
    "DP over items and capacity is pseudo-polynomial and optimal for 0/1. Ratio greedy is optimal only when fractions are allowed.",
  ),

  q(
    "pyq-2024-p1p2-net-01",
    "networking",
    "moderate",
    "A packet is forwarded from one IP subnet to another using the destination IP and a routing table. That function sits at which OSI layer?",
    ["Data link", "Network", "Transport", "Presentation"],
    1,
    "Logical addressing and routing are network-layer (IP). Data link uses MAC/framing. Transport is end-to-end (TCP/UDP). Presentation is syntax/encryption conveniences.",
  ),
  q(
    "pyq-2024-p1p2-net-02",
    "networking",
    "hard",
    "An exchange publishes a one-to-many market-data feed where a lost tick is preferable to the delay of retransmission. Which transport is the usual fit?",
    [
      "TCP, because it is the only protocol that can carry UDP ports",
      "UDP (often with multicast), because it is connectionless and does not stall the stream for lost datagrams",
      "SMTP, because it already fans out messages",
      "FTP passive mode, because it opens a second connection per tick",
    ],
    1,
    "UDP/multicast matches loss-tolerant, latency-sensitive fan-out. TCP's reliability and head-of-line retransmission hurt this workload.",
  ),
  q(
    "pyq-2024-p1p2-net-03",
    "networking",
    "moderate",
    "A Layer-2 Ethernet switch decides the egress port of a unicast frame primarily from:",
    [
      "The destination IP and OSPF",
      "The destination MAC looked up in a CAM/MAC learning table",
      "The TCP destination port",
      "The ASN in the BGP path",
    ],
    1,
    "Switches learn source MACs and forward on destination MAC. IP/OSPF/BGP are router control-plane concerns; ports are transport.",
  ),
  q(
    "pyq-2024-p1p2-net-04",
    "networking",
    "easy",
    "DNS A/AAAA records map:",
    [
      "A MAC address to a switch port",
      "A domain name to an IP address",
      "An email password to an MX host",
      "A TCP port to a PID on the client only",
    ],
    1,
    "DNS names resolve to addresses (and MX, CNAME, …). ARP, not DNS, maps IP to MAC on a LAN.",
  ),
  q(
    "pyq-2024-p1p2-net-05",
    "networking",
    "moderate",
    "SMTP is typically used to _____ messages; IMAP is typically used to _____ them from a mailbox while leaving them on the server.",
    [
      "encrypt; compress",
      "submit and relay; retrieve and manage",
      "retrieve; submit and relay",
      "route IP; assign MAC addresses",
    ],
    1,
    "SMTP sends. IMAP (unlike classic POP3) is designed for multi-device access with mail remaining on the server.",
  ),

  q(
    "pyq-2024-p1p2-sec-01",
    "security",
    "hard",
    "A ransomware strain encrypts a broker's local trade-confirmation store and withholds the key until a ransom is paid. No data is known to have been leaked. Which CIA properties are most directly violated?",
    [
      "Confidentiality only, because encryption always means secrecy",
      "Integrity and availability: files are altered without authorisation and the business cannot use them",
      "Non-repudiation only, because the attacker signed the files",
      "Confidentiality only, because availability is unaffected if backups exist somewhere",
    ],
    1,
    "Unauthorised transformation of bytes is an integrity failure. The store is unusable, so availability fails. Classic locker ransomware is not primarily a confidentiality incident unless there is also exfiltration.",
  ),
  q(
    "pyq-2024-p1p2-sec-02",
    "security",
    "moderate",
    "A staffer is mailed a look-alike 'SEBI e-filing' link and typed a password into the fake form. The dominant failure class is:",
    [
      "A buffer overflow in the mail transfer agent",
      "Social engineering (phishing), not a cryptographic break of TLS on sebi.gov.in",
      "SQL injection against the staffer's laptop BIOS",
      "A VLAN hop inside the fake HTML",
    ],
    1,
    "The user was deceived into handing over a secret. The genuine site's TLS was not broken. That is phishing, a social-engineering attack.",
  ),
  q(
    "pyq-2024-p1p2-sec-03",
    "security",
    "moderate",
    "Which control most directly stops classic SQL injection in a Java service that queries a trade table?",
    [
      "Turning off HTTPS so parameters are not encoded twice",
      "Parameterised queries / PreparedStatement so user input is never concatenated into SQL text",
      "Storing passwords with reversible AES instead of a hash",
      "Opening port 1433 to the internet so the database can authenticate users itself",
    ],
    1,
    "Injection succeeds when untrusted strings become syntax. Bound parameters keep them as data. HTTPS, password storage and exposing the DB do not fix concatenation.",
  ),
  q(
    "pyq-2024-p1p2-sec-04",
    "security",
    "easy",
    "A hardware token that produces a one-time code is which authentication factor?",
    [
      "Something you know",
      "Something you have",
      "Something you are",
      "Somewhere you are, exclusively",
    ],
    1,
    "Possession of the token is 'something you have'. Passwords are knowledge; biometrics are inherence.",
  ),
  q(
    "pyq-2024-p1p2-sec-05",
    "security",
    "moderate",
    "Password stores at a market intermediary should keep a slow salted hash rather than reversible encryption primarily because:",
    [
      "Hashes are always shorter than AES ciphertexts",
      "The verifier need not be able to recover the original password after a disk breach",
      "RFC 1918 forbids encrypting passwords",
      "Hashing is required for TLS session tickets",
    ],
    1,
    "A stolen hash (with salt and a slow KDF) should not yield the password. Encryption would put a decryption key next to the loot.",
  ),

  q(
    "pyq-2024-p1p2-wh-01",
    "warehouse",
    "moderate",
    "An analyst viewing all-India brokerage revenue by year clicks through to the same measure by quarter, then by month. That OLAP operation is:",
    [
      "Roll-up, because the time hierarchy is being collapsed",
      "Drill-down, because a coarser grain is replaced by a finer grain on the same dimension",
      "Slicing, because a second dimension is being removed",
      "Pivoting, because facts are being deleted",
    ],
    1,
    "Drill-down walks a hierarchy toward more detail (year → quarter → month). Roll-up is the reverse. Slice fixes a dimension value; dice restricts several.",
  ),
  q(
    "pyq-2024-p1p2-wh-02",
    "warehouse",
    "moderate",
    "In a star schema for trade surveillance, the fact table typically stores _____ while dimension tables store _____.",
    [
      "descriptive slowly changing attributes; numeric measures only",
      "numeric measures plus foreign keys; descriptive attributes of entities such as time, instrument and broker",
      "XML filings only; PDF filings only",
      "indexes exclusively; nothing",
    ],
    1,
    "Facts are additive (or semi-additive) measures at a stated grain, with FKs. Dimensions hold the labels and hierarchies used to slice those measures.",
  ),

  q(
    "pyq-2024-p1p2-sh-01",
    "shell",
    "moderate",
    "In a POSIX shell script, which expansion is the number of positional parameters?",
    ["$?", "$#", "$$", "$!"],
    1,
    "$# is argc. $? is the last exit status, $$ is the current PID, $! is the last background PID.",
  ),
  q(
    "pyq-2024-p1p2-sh-02",
    "shell",
    "hard",
    "What is printed by the following shell fragment?",
    ["yes", "no", "5", "a syntax error because [ needs no spaces"],
    0,
    "[ $x -eq 5 ] is an integer test. Spaces around [ and ] are required. The then-branch prints yes.",
    {
      language: "bash",
      code: `x=5
if [ $x -eq 5 ]; then echo yes; else echo no; fi`,
    },
  ),
  q(
    "pyq-2024-p1p2-sh-03",
    "shell",
    "moderate",
    "What is printed (no spaces)?",
    ["123", "1 2 3", "3", "12"],
    0,
    "The for-list yields 1, then 2, then 3. echo -n prints each without a newline, so 123.",
    {
      language: "bash",
      code: `for i in 1 2 3; do echo -n "$i"; done`,
    },
  ),
];
