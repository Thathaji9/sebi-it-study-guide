import { makeQuestion } from "@/data/make-question";

const q = makeQuestion(1, 2);

export const pyqP1P2_2025 = [
  q(
    "pyq-2025-p1p2-db-01",
    "database",
    "hard",
    "Relation Fill(order_id, leg_no, product_class, qty) has FDs {order_id, leg_no} → product_class, qty and order_id → product_class. The relation is:",
    [
      "In BCNF, because the only determinant is the full composite key",
      "In 2NF but not 3NF, because product_class is transitively dependent on the key via qty",
      "Not in 2NF: product_class, a non-prime attribute, depends on order_id, which is a proper subset of a candidate key",
      "Not in 1NF, because the key is composite",
    ],
    2,
    "Candidate key is {order_id, leg_no}. A partial dependency of a non-prime attribute on part of that key is exactly a 2NF violation. Composite keys are allowed in 1NF.",
  ),
  q(
    "pyq-2025-p1p2-db-02",
    "database",
    "hard",
    "During the validation phase of optimistic concurrency control, transaction T discovers that a data item it read was overwritten by a committed transaction. The protocol's typical next step is:",
    [
      "Convert T's remaining reads into exclusive locks and continue (hybrid 2PL)",
      "Abort T and restart it; unlike 2PL, the conflict is resolved by abort rather than by waiting for a lock",
      "Ignore the overwrite because OCC never aborts committed work of others",
      "Promote T to a strict 2PL transaction that holds locks retroactively on past reads",
    ],
    1,
    "OCC runs without read/write locks, then validates. A failed validation aborts the optimistic transaction. 2PL would have blocked T at the first conflicting lock request and can deadlock; OCC trades blocking for abort/retry.",
  ),
  q(
    "pyq-2025-p1p2-db-03",
    "database",
    "hard",
    "Under basic timestamp ordering, transaction Ti with timestamp TS(Ti) wants to write X, but W-timestamp(X) > TS(Ti). The correct action is:",
    [
      "Allow the write, because later timestamps always win",
      "Reject the write and abort Ti: a later transaction has already written X, so Ti's write is late",
      "Ignore W-timestamp and consult only the lock table",
      "Convert the write into a blind read",
    ],
    1,
    "Thomas' write rule can skip an obsolete write without abort in some variants, but the basic protocol aborts a writer that is too late. The option that matches the basic rule is reject/abort. Locks are a 2PL mechanism, not TSO.",
  ),
  q(
    "pyq-2025-p1p2-db-04",
    "database",
    "moderate",
    "A sparse index on settlement_date is a good design when:",
    [
      "The data file is a heap with random insertion order on that key",
      "The data file is ordered on settlement_date, so one index entry can cover a whole block of consecutive records",
      "Queries never use settlement_date and only hash on trade_id",
      "Every record must have its own index entry regardless of file order",
    ],
    1,
    "Sparse indexes need a clustered/sorted file so a block can be identified from one entry. Unordered heaps need a dense index (or a different access path).",
  ),
  q(
    "pyq-2025-p1p2-db-05",
    "database",
    "hard",
    "T1 reads all open orders with status = 'NEW'. T2 inserts a new NEW order and commits. T1 re-runs the same predicate and sees an extra row. This is:",
    [
      "A dirty read of T2's uncommitted data",
      "A lost update of a single known row",
      "The phantom phenomenon: the set of rows matching a predicate changed",
      "A deadlock between share and exclusive locks on one tuple",
    ],
    2,
    "Phantoms are extra (or missing) rows in a predicate/range, not a changed value of a row T1 already held. Dirty read would require seeing T2 before T2 committed. Predicate/next-key locks are the usual 2PL answer.",
  ),

  q(
    "pyq-2025-p1p2-sql-01",
    "sql",
    "hard",
    "desk(id) has 10 and 20. trader(desk_id, name) has (10,'A'), (10,'B') and (30,'C'). How many rows does the query return?",
    ["2", "3", "4", "5"],
    1,
    "LEFT JOIN keeps both desks. id 10 matches two traders (two rows). id 20 matches none (one padded row). Trader 30 is only on the right, so it is dropped. Total 3.",
    {
      language: "sql",
      code: `SELECT d.id, t.name
FROM desk d
LEFT JOIN trader t ON d.id = t.desk_id;`,
    },
  ),
  q(
    "pyq-2025-p1p2-sql-02",
    "sql",
    "hard",
    "Table ids holds 1 and 2. Table banned holds 2 and NULL. Which statement about the query is correct?",
    [
      "It returns 1, because 1 is not in {2}",
      "It returns no rows: 1 NOT IN (2, NULL) evaluates to UNKNOWN, so the row is filtered out",
      "It returns 1 and 2",
      "It throws a syntax error because NOT IN cannot contain NULL",
    ],
    1,
    "x NOT IN (2, NULL) is NOT (x=2 OR x=NULL). For x=1 that is NOT (FALSE OR UNKNOWN) = UNKNOWN. WHERE keeps only TRUE. Prefer NOT EXISTS when the subquery can be NULL.",
    {
      language: "sql",
      code: `SELECT i FROM ids
WHERE i NOT IN (SELECT b FROM banned);`,
    },
  ),
  q(
    "pyq-2025-p1p2-sql-03",
    "sql",
    "hard",
    "A correlated subquery is one that:",
    [
      "Is rewritten by the optimiser into a Cartesian product always",
      "Refers to a column of the outer query, so it is conceptually re-evaluated for each candidate outer row",
      "Must appear in the FROM clause as a derived table",
      "Cannot be used with EXISTS",
    ],
    1,
    "Correlation is an outer-column reference. EXISTS is a common wrapper. Optimisers may unnest, but the semantics are per-outer-row.",
  ),
  q(
    "pyq-2025-p1p2-sql-04",
    "sql",
    "moderate",
    "TRUNCATE TABLE trade_scratch; compared with DELETE FROM trade_scratch; in typical SQL engines:",
    [
      "TRUNCATE is row-by-row DML that always fires DELETE triggers and is fully transactional in every product",
      "TRUNCATE is usually DDL: it deallocates pages, often auto-commits, and does not fire per-row DELETE triggers",
      "Both are identical to DROP TABLE",
      "DELETE cannot be rolled back; TRUNCATE always can",
    ],
    1,
    "DELETE is logged DML. TRUNCATE is a bulk deallocation (DDL in many engines), skips row triggers, and may auto-commit. Neither is DROP (which removes the object).",
  ),
  q(
    "pyq-2025-p1p2-sql-05",
    "sql",
    "hard",
    "emp(id, mgr_id, name) has (1, NULL, 'Pat'), (2, 1, 'Kim'), (3, 1, 'Raj'). The self-join below lists each employee with their manager's name. How many rows are returned?",
    ["1", "2", "3", "4"],
    1,
    "INNER JOIN drops Pat, who has no manager. Kim and Raj each match Pat. Two rows.",
    {
      language: "sql",
      code: `SELECT e.name AS emp, m.name AS mgr
FROM emp e
JOIN emp m ON e.mgr_id = m.id;`,
    },
  ),

  q(
    "pyq-2025-p1p2-prog-01",
    "programming",
    "hard",
    "What is the output of the following Java program?",
    ["B4", "B0", "4", "0"],
    1,
    "The Base constructor runs before Sub field initialisers. It calls the overridden m(), so n is still 0 (default). Output B0, not B4.",
    {
      language: "java",
      code: `class Base {
  Base() { System.out.print("B"); m(); }
  void m() { System.out.print("X"); }
}
class Sub extends Base {
  int n = 4;
  void m() { System.out.print(n); }
}
public class Main {
  public static void main(String[] args) {
    new Sub();
  }
}`,
    },
  ),
  q(
    "pyq-2025-p1p2-prog-02",
    "programming",
    "hard",
    "What is the output of the following C++ program?",
    ["38", "83", "88", "33"],
    2,
    "x aliases a, so a becomes 8. y is a copy of b, so swapping into y does not change b. Prints 88.",
    {
      language: "cpp",
      code: `#include <iostream>
using namespace std;
void sw(int &x, int y) {
  int t = x; x = y; y = t;
}
int main() {
  int a = 3, b = 8;
  sw(a, b);
  cout << a << b;
}`,
    },
  ),
  q(
    "pyq-2025-p1p2-prog-03",
    "programming",
    "moderate",
    "What is the output of the following Java program?",
    ["abc", "cba", "ab", "ba"],
    1,
    "append mutates the builder to abc; reverse mutates it to cba. StringBuilder is mutable, unlike String.",
    {
      language: "java",
      code: `public class Main {
  public static void main(String[] args) {
    StringBuilder sb = new StringBuilder("ab");
    sb.append("c").reverse();
    System.out.print(sb);
  }
}`,
    },
  ),
  q(
    "pyq-2025-p1p2-prog-04",
    "programming",
    "hard",
    "What is the output of the following Java program?",
    ["6 3", "8 4", "6 4", "8 3"],
    1,
    "i++ yields 2 and i becomes 3. ++i then makes i 4 and yields 4. Product is 8; i is left at 4. Java defines this left-to-right evaluation.",
    {
      language: "java",
      code: `public class Main {
  public static void main(String[] args) {
    int i = 2;
    int j = i++ * ++i;
    System.out.print(j + " " + i);
  }
}`,
    },
  ),
  q(
    "pyq-2025-p1p2-prog-05",
    "programming",
    "hard",
    "What is the output of the following C++ program?",
    ["A", "B", "BA", "AB"],
    2,
    "virtual ~A() makes delete through A* run B's destructor first, then A's. Output BA.",
    {
      language: "cpp",
      code: `#include <iostream>
using namespace std;
struct A { virtual ~A() { cout << "A"; } };
struct B : A { ~B() { cout << "B"; } };
int main() {
  A *p = new B();
  delete p;
}`,
    },
  ),
  q(
    "pyq-2025-p1p2-prog-06",
    "programming",
    "moderate",
    "What is the output of the following Java program?",
    ["TC", "TF", "TCF", "T"],
    2,
    "try prints T and throws. catch prints C and returns, but finally still runs and prints F. Output TCF.",
    {
      language: "java",
      code: `public class Main {
  static void go() {
    try {
      System.out.print("T");
      throw new RuntimeException();
    } catch (RuntimeException e) {
      System.out.print("C");
      return;
    } finally {
      System.out.print("F");
    }
  }
  public static void main(String[] args) {
    go();
  }
}`,
    },
  ),
  q(
    "pyq-2025-p1p2-prog-07",
    "programming",
    "hard",
    "What is the output of the following Java program?",
    ["int", "Integer", "both", "compilation is ambiguous"],
    0,
    "The literal 3 is an int. Overload resolution prefers the exact primitive go(int) over boxing to Integer.",
    {
      language: "java",
      code: `class P {
  String go(int x) { return "int"; }
  String go(Integer x) { return "Integer"; }
}
public class Main {
  public static void main(String[] args) {
    System.out.print(new P().go(3));
  }
}`,
    },
  ),
  q(
    "pyq-2025-p1p2-prog-08",
    "programming",
    "moderate",
    "What is the output of the following Java program?",
    ["0", "6", "24", "The recursion does not terminate"],
    2,
    "s(4)=4*s(3)=4*3*s(2)=4*3*2*s(1)=4*3*2*1*s(0)=24*1=24. The base case n==0 returns 1.",
    {
      language: "java",
      code: `public class Main {
  static int s(int n) {
    if (n == 0) return 1;
    return n * s(n - 1);
  }
  public static void main(String[] args) {
    System.out.print(s(4));
  }
}`,
    },
  ),
  q(
    "pyq-2025-p1p2-prog-09",
    "programming",
    "hard",
    "What is the output of the following Java program?",
    ["A", "B", "AB", "compilation fails because B.p does not override"],
    0,
    "call() is compiled in A and invokes A's private p(). Private methods are statically bound and are not overridden. B.p is a separate method. Prints A.",
    {
      language: "java",
      code: `class A {
  private void p() { System.out.print("A"); }
  void call() { p(); }
}
class B extends A {
  void p() { System.out.print("B"); }
}
public class Main {
  public static void main(String[] args) {
    new B().call();
  }
}`,
    },
  ),
  q(
    "pyq-2025-p1p2-prog-10",
    "programming",
    "moderate",
    "What is the output of the following C++ program?",
    ["2", "4", "6", "undefined behaviour always"],
    1,
    "a decays to a pointer to the first element. p++ steps one int, so *p is 4.",
    {
      language: "cpp",
      code: `#include <iostream>
using namespace std;
int main() {
  int a[] = {2, 4, 6};
  int *p = a;
  p++;
  cout << *p;
}`,
    },
  ),
  q(
    "pyq-2025-p1p2-prog-11",
    "programming",
    "hard",
    "What is the output of the following Java program?",
    ["false false", "false true", "true true", "true false"],
    0,
    "x and y are distinct objects. == compares references. Object.equals is also reference equality unless overridden, so both tests are false.",
    {
      language: "java",
      code: `class Box {
  int v;
  Box(int v) { this.v = v; }
}
public class Main {
  public static void main(String[] args) {
    Box x = new Box(1), y = new Box(1);
    System.out.print((x == y) + " " + x.equals(y));
  }
}`,
    },
  ),
  q(
    "pyq-2025-p1p2-prog-12",
    "programming",
    "hard",
    "A Java catch (Exception e) placed before catch (IOException e) will:",
    [
      "Prefer IOException at runtime because it is more specific",
      "Fail to compile: the IOException handler is unreachable",
      "Run both handlers for every IOException",
      "Convert IOException into an Error",
    ],
    1,
    "Handlers must be ordered from most specific to most general. Exception already covers IOException, so the second catch is dead code.",
  ),
  q(
    "pyq-2025-p1p2-prog-13",
    "programming",
    "moderate",
    "Compile-time (static) polymorphism in C++ is primarily obtained from:",
    [
      "Virtual function calls through a base pointer",
      "Function overloading and templates, resolved before run time",
      "Dynamic_cast of every argument",
      "The destructor of a polymorphic base",
    ],
    1,
    "Overload and template instantiation are compile-time. virtual + base pointer/reference is run-time polymorphism.",
  ),
  q(
    "pyq-2025-p1p2-prog-14",
    "programming",
    "moderate",
    "Java passes object arguments by:",
    [
      "Copying the entire object graph into the callee",
      "Value: the callee receives a copy of the reference, so mutating fields is visible to the caller but rebinding the parameter is not",
      "Name, like a textual macro",
      "Reference to the caller's local variable, so assigning the parameter replaces the caller's variable",
    ],
    1,
    "Java is pass-by-value. The value for objects is the reference. There is no pass-by-reference for locals.",
  ),
  q(
    "pyq-2025-p1p2-prog-15",
    "programming",
    "hard",
    "Deleting a derived object through a base pointer when the base destructor is not virtual is:",
    [
      "Well-defined and always runs the derived destructor first",
      "Undefined behaviour; typically only the base destructor runs, leaking derived resources",
      "A compile-time error in every C++ standard",
      "The same as calling the derived assignment operator",
    ],
    1,
    "If the base destructor is non-virtual, delete p (p typed as Base*) does not dispatch to ~Derived. The program has UB. Make ~Base virtual when deleting through Base*.",
  ),

  q(
    "pyq-2025-p1p2-py-01",
    "python",
    "hard",
    "What does the following Python fragment display?",
    ["cb", "bc", "dc", "ba"],
    0,
    "s[::-1] is 'dcba'. Then [1:3] is indexes 1 and 2 of that result: 'c' and 'b'.",
    {
      language: "python",
      code: `s = "abcd"
print(s[::-1][1:3])`,
    },
  ),
  q(
    "pyq-2025-p1p2-py-02",
    "python",
    "hard",
    "open('book.csv', 'w+') on an existing non-empty file will:",
    [
      "Open for read and write without destroying existing bytes, like 'r+'",
      "Truncate the file to zero length, then allow both reads and writes",
      "Fail if the file exists",
      "Open for append-only writes and forbid seek",
    ],
    1,
    "'w+' creates or truncates, pointer at start, read+write. 'r+' refuses to create and does not truncate. 'x' fails if the path exists. 'a+' appends writes.",
  ),
  q(
    "pyq-2025-p1p2-py-03",
    "python",
    "moderate",
    "What does the following Python fragment display?",
    ["['sebi', 'SEBI']", "['sebi']", "['SEBI']", "[]"],
    1,
    "Without re.I, the pattern is case-sensitive. Only 'sebi' matches. findall returns that one string.",
    {
      language: "python",
      code: `import re
print(re.findall("sebi", "sebi and SEBI"))`,
    },
  ),
  q(
    "pyq-2025-p1p2-py-04",
    "python",
    "hard",
    "What does the following Python fragment display?",
    ["(1, 2, [3])", "(1, 2, [3, 4])", "TypeError: tuple is immutable", "(1, 2, 3, 4)"],
    1,
    "The tuple's identity and slots cannot change, but slot 2 holds a list object. append mutates that list in place. The tuple still has three elements.",
    {
      language: "python",
      code: `a = (1, 2, [3])
a[2].append(4)
print(a)`,
    },
  ),
  q(
    "pyq-2025-p1p2-py-05",
    "python",
    "moderate",
    "In R, what does the snippet print (values)?",
    ["10 20 30 40", "30 40", "TRUE TRUE FALSE FALSE", "20 30"],
    1,
    "Logical indexing keeps elements where the condition is TRUE. 10 and 20 fail x > 20; 30 and 40 pass.",
    {
      language: "r",
      code: `x <- c(10, 20, 30, 40)
print(x[x > 20])`,
    },
  ),

  q(
    "pyq-2025-p1p2-algo-01",
    "algorithms",
    "hard",
    "Heap sort's worst-case time on n keys is:",
    [
      "Θ(n) on sorted input because the heap is already built",
      "Θ(n log n), including on reverse-sorted input; it does not degrade to quadratic the way a fixed-pivot quicksort can",
      "Θ(n²) whenever the input is sorted",
      "Θ(log n) because each extract-max is O(1)",
    ],
    1,
    "Build-heap is Θ(n); each of n extract-max operations is O(log n). The bound holds for every permutation. Merge sort shares the Θ(n log n) worst case; naive quicksort does not.",
  ),
  q(
    "pyq-2025-p1p2-algo-02",
    "algorithms",
    "hard",
    "A directed graph of settlement obligations may contain a negative-weight edge (a rebate) but no negative cycle. Single-source shortest paths should use:",
    [
      "BFS, because negative weights only affect DFS",
      "Bellman–Ford (or another algorithm that relaxes |V|-1 times), not Dijkstra",
      "Dijkstra, which remains correct with negative edges as long as there is no negative cycle",
      "Kruskal, which computes shortest paths as a by-product of the MST",
    ],
    1,
    "Dijkstra's greedy choice fails with negative edges. Bellman–Ford handles negatives and reports a negative cycle if one exists. BFS is hop-count. MST ≠ shortest paths.",
  ),
  q(
    "pyq-2025-p1p2-algo-03",
    "algorithms",
    "moderate",
    "Kruskal's algorithm builds an MST by:",
    [
      "Growing a single tree from a start vertex, always adding the lightest edge out of the tree (Prim)",
      "Sorting edges by increasing weight and adding an edge when its ends lie in different Union-Find components",
      "Running Dijkstra from every vertex",
      "Contracting negative-weight cycles",
    ],
    1,
    "Kruskal is global sort + cycle skip via disjoint sets. Prim is the cut-growing algorithm.",
  ),
  q(
    "pyq-2025-p1p2-algo-04",
    "algorithms",
    "moderate",
    "Binary search for a key in a sorted array of n elements has worst-case comparisons:",
    ["Θ(n)", "Θ(log n)", "Θ(n log n)", "Θ(1) always"],
    1,
    "Each step halves the remaining interval. Worst case is Θ(log n) comparisons. The array must be sorted and random-access.",
  ),
  q(
    "pyq-2025-p1p2-algo-05",
    "algorithms",
    "moderate",
    "Connected components of an undirected broker-graph can be counted by:",
    [
      "A single Dijkstra run from an arbitrary vertex, even if the graph is disconnected",
      "Starting a DFS or BFS from every still-unvisited vertex and counting how many times a new search is launched",
      "Counting vertices of odd degree (Euler's criterion)",
      "Topological sort, which works on any undirected graph",
    ],
    1,
    "Each new search discovers one component. Dijkstra from one source misses other components. Odd-degree counts speak to Euler tours. Topological sort needs a DAG.",
  ),

  q(
    "pyq-2025-p1p2-net-01",
    "networking",
    "moderate",
    "End-to-end reliability, ports, and congestion control for a byte stream are functions of which OSI layer?",
    ["Network", "Data link", "Transport", "Physical"],
    2,
    "TCP lives at transport. IP routing is network. Framing/MAC is data link. Bits on the wire are physical.",
  ),
  q(
    "pyq-2025-p1p2-net-02",
    "networking",
    "moderate",
    "A host must send traffic to 8.8.8.8 but 8.8.8.8 is not on the local subnet. The next hop is:",
    [
      "The DNS root anycast address used as a default MAC",
      "The configured default gateway (a router), after ARP for that gateway's MAC",
      "A Layer-2 switch, which rewrites the IP destination",
      "Port 53 on the local resolver, which forwards IP packets",
    ],
    1,
    "Off-subnet IPv4 is sent to the default router. ARP obtains the router's MAC. The switch does not change the IP destination; DNS is an application mapping, not a hop.",
  ),
  q(
    "pyq-2025-p1p2-net-03",
    "networking",
    "hard",
    "Classic shared-media Ethernet used CSMA/CD. That means a station:",
    [
      "Waits for a token before sending, as on Token Ring",
      "Senses the carrier, transmits, detects a collision if two stations send together, then uses binary exponential backoff",
      "Switches 53-byte ATM cells",
      "Always needs a full-duplex switch and never needed backoff",
    ],
    1,
    "CSMA/CD is carrier sense + collision detection + backoff. Token Ring is different. Switched full-duplex Ethernet largely retired collisions, but the historic exam item is CSMA/CD.",
  ),
  q(
    "pyq-2025-p1p2-net-04",
    "networking",
    "easy",
    "HTTP (cleartext) commonly uses TCP port _____ and HTTPS uses TCP port _____.",
    ["21 and 22", "80 and 443", "25 and 110", "53 and 67"],
    1,
    "HTTP 80, HTTPS 443. FTP 21, SSH 22, SMTP 25, POP3 110, DNS 53.",
  ),
  q(
    "pyq-2025-p1p2-net-05",
    "networking",
    "moderate",
    "A stateful firewall differs from a stateless packet filter because it:",
    [
      "Looks only at MAC addresses",
      "Tracks connection/session state (for example a TCP handshake) rather than judging each packet in isolation",
      "Replaces BGP with static routes",
      "Must run on the application host as an antivirus",
    ],
    1,
    "Stateful inspection remembers established flows and can allow return packets that a pure ACL would have to list explicitly. Host AV is a different control.",
  ),

  q(
    "pyq-2025-p1p2-sec-01",
    "security",
    "hard",
    "Double-extortion ransomware both encrypts a registrar's file server and publishes a sample of stolen client lists. Relative to the CIA triad this is primarily:",
    [
      "An availability incident only; publication does not touch confidentiality",
      "A combined confidentiality, integrity and availability incident: data leaked, bytes altered, service unusable",
      "A non-repudiation failure only, because the attackers used a digital signature",
      "Integrity only, because leaked copies leave the original server untouched",
    ],
    1,
    "Exfiltration breaks confidentiality. Encryption/wiping breaks integrity of stored objects and availability of the service. Exam items now treat modern ransomware as more than a locker.",
  ),
  q(
    "pyq-2025-p1p2-sec-02",
    "security",
    "moderate",
    "Cross-site scripting (XSS) on a broker webmail portal is dangerous mainly because:",
    [
      "It poisons BGP tables at the ISP",
      "Attacker script runs in the victim's browser under the portal's origin and can steal session cookies or act as the user",
      "It is the same bug class as a buffer overflow in the kernel",
      "It only affects users who have disabled JavaScript",
    ],
    1,
    "XSS is an origin-confusion/injection bug in the browser. CSRF forges a request; SQLi targets the database. JS-disabled users are largely not XSS victims.",
  ),
  q(
    "pyq-2025-p1p2-sec-03",
    "security",
    "moderate",
    "Confidentiality of a session between a browser and a filing gateway is provided by:",
    ["CRC32 on each TCP segment", "TLS encryption and server authentication", "RAID-1 of the gateway disks", "NTP leap-second smearing"],
    1,
    "TLS supplies a confidential, authenticated channel (when PKI is used correctly). CRC/RAID are not secrecy. NTP is time.",
  ),
  q(
    "pyq-2025-p1p2-sec-04",
    "security",
    "easy",
    "In the CIA triad, Availability means:",
    [
      "Data is not disclosed to unauthorised parties",
      "Data is not altered in an unauthorised way",
      "Authorised users can use the system when they need to",
      "A sender cannot deny having sent a message",
    ],
    2,
    "C = secrecy, I = authorised modification, A = usable when required. Non-repudiation is a related but separate goal.",
  ),
  q(
    "pyq-2025-p1p2-sec-05",
    "security",
    "moderate",
    "A systems audit of a market intermediary, as distinct from a network audit, spends more time on:",
    [
      "OS hardening, identity and access, patch state, application logs and host configuration",
      "Fibre attenuation and DWDM channel plans only",
      "AS-path prepends in eBGP only",
      "The PHY encoding of 10GBASE-SR",
    ],
    0,
    "Systems audit: hosts, identity, apps. Network audit: topology, firewalls, routing, segmentation. Both appear in the IT stream; the split is the exam distinction.",
  ),

  q(
    "pyq-2025-p1p2-wh-01",
    "warehouse",
    "moderate",
    "An OLAP user looking at branch-level complaint counts clicks to see the same measure at zone and then all-India totals. That operation is:",
    [
      "Drill-down, because more rows are being created in the fact table",
      "Roll-up: the geographic hierarchy is being collapsed toward a coarser grain",
      "A snowflake join that materialises a new fact table",
      "ETL extract, because source systems are queried live",
    ],
    1,
    "Roll-up aggregates up a hierarchy (branch → zone → country). Drill-down is the opposite walk. It is a cube navigation operator, not a load job.",
  ),
  q(
    "pyq-2025-p1p2-wh-02",
    "warehouse",
    "moderate",
    "A snowflake schema differs from a star schema by:",
    [
      "Storing all facts as JSON documents and forbidding keys",
      "Normalising dimension tables into multiple related tables (for example city → state → country) rather than a single denormalised dimension",
      "Eliminating the fact table entirely",
      "Requiring exactly one dimension",
    ],
    1,
    "Snowflake dimensions are split for normalisation. More joins, less redundancy. Star keeps fat denormalised dimensions around a fact table.",
  ),

  q(
    "pyq-2025-p1p2-sh-01",
    "shell",
    "moderate",
    "After the command false, which expansion is 1 (by convention, non-zero meaning failure)?",
    ["$#", "$?", "$$", "$0"],
    1,
    "$? is the exit status of the last foreground command. false exits 1. $# is argument count, $$ is PID, $0 is the shell or script name.",
  ),
  q(
    "pyq-2025-p1p2-sh-02",
    "shell",
    "hard",
    "Which test is true when path f exists and is a regular file?",
    ["[ -d f ]", "[ -f f ]", "[ -z f ]", "[ -n f ]"],
    1,
    "-f regular file, -d directory, -z empty string, -n non-empty string. Use -r/-w/-x for permissions.",
  ),
  q(
    "pyq-2025-p1p2-sh-03",
    "shell",
    "hard",
    "A script is invoked as ./run.sh alpha beta. Inside the script, \"$@\" expands to:",
    [
      "A single word 'alpha beta'",
      "Two separate words alpha and beta, preserving each parameter even if it contained spaces (when quoted)",
      "The integer 2",
      "The PID of the script",
    ],
    1,
    "Quoted \"$@\" is the safe way to forward all positional parameters as distinct words. $* joins them. $# would be 2. $$ is PID.",
  ),
];
