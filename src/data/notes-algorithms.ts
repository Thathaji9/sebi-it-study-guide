import type { TopicNote } from "@/data/notes";

export const notesAlgorithms: TopicNote = {
  topic: "algorithms",
  title: "Algorithms for Problem Solving",
  blurb:
    "SEBI Grade A IT revision: graph search, shortest paths, spanning trees, sorting and searching complexities, hashing, greedy, DP, divide-and-conquer, backtracking and KMP. Every section ends with dry-runs you can copy onto paper.",
  blocks: [
    {
      heading: "BFS versus DFS",
      body: `Breadth-first search (BFS) explores a graph level by level. It uses a FIFO queue. From a source s it first visits every neighbour of s, then every vertex at distance 2, and so on. On an unweighted graph the first time BFS reaches a vertex is a shortest path in number of edges. Time is O(V+E) with an adjacency list, space is O(V) for the queue and the visited array.

Depth-first search (DFS) dives down one branch before backtracking. It is implemented with a recursion stack or an explicit LIFO stack. DFS does not give unweighted shortest paths. It is the engine behind cycle detection, topological sort on a DAG, connected-component labelling, and the discovery/finish times used in Tarjan / Kosaraju strongly-connected-component algorithms.

The exam contrast is data structure plus application. Queue → BFS → shortest unweighted path, bipartite check, broadcasting. Stack → DFS → cycle, topology, maze, SCC. Both need a visited mark on undirected graphs to avoid oscillating on a two-way edge. On directed graphs you still mark visited; for topology you also record a recursion-stack (grey) mark to catch back-edges.

BFS tree edges go to undiscovered neighbours; cross edges can appear toward already-discovered vertices in another branch of the same level. DFS tree edges go to white (undiscovered) vertices; back edges go to grey ancestors and signal a cycle in directed graphs; forward and cross edges complete the four-colour classification.

A tiny graph is enough for a full dry-run. Write the queue (or stack) after every dequeue/pop. MCQs often ask “which vertex is processed third?” or “contents of the queue after visiting B”. Neighbour order matters: if the adjacency list is sorted alphabetically, your trace is unique and matches the official key.`,
      bullets: [
        "BFS: FIFO queue, level order, unweighted shortest path, O(V+E).",
        "DFS: LIFO / recursion, not shortest, cycle + topology + SCC.",
        "Both need visited[]; undirected graphs otherwise loop on (u,v),(v,u).",
        "State the neighbour order (e.g. sorted) before tracing.",
      ],
      examples: [
        {
          title: "BFS queue contents on a tiny graph",
          prompt:
            "Undirected graph, adjacency lists in sorted order: A:[B,C]  B:[A,D,E]  C:[A,F]  D:[B]  E:[B]  F:[C]. Start BFS at A. List the queue after each dequeue, and the visit order.",
          language: "python",
          code: `from collections import deque
g = {
    "A": ["B", "C"],
    "B": ["A", "D", "E"],
    "C": ["A", "F"],
    "D": ["B"],
    "E": ["B"],
    "F": ["C"],
}
def bfs(start):
    seen = {start}
    q = deque([start])
    order = []
    log = []
    while q:
        log.append(list(q))
        u = q.popleft()
        order.append(u)
        for v in g[u]:
            if v not in seen:
                seen.add(v)
                q.append(v)
    return order, log
print(bfs("A"))`,
          steps: [
            "Initialise visited={A}, queue=[A]. Nothing has been dequeued yet.",
            "Dequeue A. Enqueue unseen neighbours B then C (sorted). Queue becomes [B, C]. Visit order: A.",
            "Dequeue B. Neighbours A (seen), D, E. Enqueue D, E. Queue becomes [C, D, E]. Visit order: A, B.",
            "Dequeue C. Neighbours A (seen), F. Enqueue F. Queue becomes [D, E, F]. Visit order: A, B, C.",
            "Dequeue D. Neighbour B is seen. Queue [E, F]. Then dequeue E (B seen). Queue [F]. Then dequeue F (C seen). Queue empty.",
            "Every vertex was enqueued once. Distances from A: B and C at 1, D,E,F at 2. That is the BFS layering.",
          ],
          result:
            "Visit order A, B, C, D, E, F. Queue snapshots: [A] → [B,C] → [C,D,E] → [D,E,F] → [E,F] → [F] → [].",
        },
        {
          title: "DFS recursion (or stack) on the same graph",
          prompt:
            "Same graph as the BFS example. Run recursive DFS from A, always taking the adjacency list in sorted order. Record the discovery order and the explicit call-stack just before each recursive call returns.",
          language: "python",
          code: `g = {
    "A": ["B", "C"], "B": ["A", "D", "E"],
    "C": ["A", "F"], "D": ["B"], "E": ["B"], "F": ["C"],
}
seen, order = set(), []
def dfs(u):
    seen.add(u)
    order.append(u)
    for v in g[u]:
        if v not in seen:
            dfs(v)
dfs("A")
print(order)  # discovery order`,
          steps: [
            "Call dfs(A). Mark A. First unseen neighbour is B, so recurse into B. Stack of active calls: A → B.",
            "dfs(B): neighbours A (seen), D unseen. Recurse D. Stack: A → B → D. D’s only neighbour B is seen, so D returns. Discovery so far: A, B, D.",
            "Back in B, next neighbour E is unseen. Recurse E. E’s neighbour B is seen, E returns. Discovery: A, B, D, E. Then B returns.",
            "Back in A, next neighbour C is unseen. Recurse C. C’s neighbour A is seen; F is not. Recurse F. F returns, C returns, A returns.",
            "Discovery order is A, B, D, E, C, F — a depth-first chain, not a level order. An explicit stack doing ‘push neighbours right-to-left’ yields the same order as this recursion.",
          ],
          result:
            "DFS discovery order A, B, D, E, C, F. Completely different from BFS A, B, C, D, E, F because DFS finished the B-branch before touching C.",
        },
        {
          title: "Unweighted shortest path is BFS, not DFS",
          prompt:
            "Undirected unweighted graph: S—A—B—T and also S—T (direct edge). Path lengths: S-T is 1 edge; S-A-B-T is 3. What does BFS from S report as dist(T)? What can DFS report?",
          language: "cpp",
          code: `// edges: S-A, A-B, B-T, S-T
// BFS distances from S
// dist[S]=0, enqueue S
// pop S: A and T discovered, dist 1
// pop A: B discovered, dist 2
// pop T: already discovered at dist 1 — do not relax
// pop B: T already has dist 1 < 2+1
// answer dist[T] = 1`,
          steps: [
            "BFS guarantees that when a vertex is first dequeued, its distance is final on an unweighted graph. T is found as a neighbour of S at distance 1.",
            "The later path S-A-B-T is seen after T is already visited, so it is ignored. BFS never ‘relaxes’ a discovered vertex on unweighted graphs.",
            "DFS might recurse S → A → B → T first if A is listed before T, recording a path of length 3, and only later see the direct edge. DFS has no distance invariant.",
            "Therefore the exam answer for ‘shortest path in an unweighted maze / social network hops / router hop count’ is BFS.",
            "If edges had positive weights, BFS would be wrong and you would switch to Dijkstra. If some weights were negative, Dijkstra would be wrong and you would switch to Bellman-Ford.",
          ],
          result:
            "BFS dist(T)=1 (the direct edge). DFS may report 3 depending on adjacency order, so DFS is not a shortest-path algorithm on unweighted graphs.",
        },
        {
          title: "Choosing BFS or DFS from the application",
          prompt:
            "Match each task to BFS or DFS: (i) fewest flights between two airports, (ii) detect a cycle in a directed graph, (iii) topological order of compilation, (iv) flood-fill the connected pixels of an image, (v) check whether a graph is bipartite.",
          language: "java",
          code: `// (i)  BFS on the unweighted airport graph
// (ii) DFS with colour: white/grey/black; grey neighbour = back-edge = cycle
// (iii) DFS finish-time reverse, or Kahn BFS on indegrees
// (iv) either; BFS queue or DFS stack both flood a component
// (v)  BFS (or DFS) 2-colouring: neighbour must get the opposite colour`,
          steps: [
            "Fewest flights is an unweighted shortest path, so BFS from the source until the destination is dequeued.",
            "A directed cycle is a back-edge to a grey vertex on the DFS recursion stack. BFS can also detect cycles but the standard textbook test is DFS colours.",
            "Topological sort: DFS finishing times reversed, or Kahn’s algorithm which is BFS on a queue of indegree-zero vertices. Both are accepted; MCQs that say ‘using DFS’ want the finish-time version.",
            "Flood-fill is ‘visit the whole connected component’. Either search works; BFS uses more memory on a fat frontier, DFS uses more memory on a deep thin corridor.",
            "Bipartite check: try to 2-colour. BFS is the usual picture (colour by level parity). A conflict is an edge inside a BFS layer, i.e. an odd cycle.",
          ],
          result:
            "(i) BFS (ii) DFS (iii) DFS finish times or Kahn BFS (iv) either (v) BFS 2-colouring (DFS also works). Pick the algorithm whose invariant matches the question.",
        },
      ],
    },
    {
      heading: "Connected components",
      body: `In an undirected graph a connected component is a maximal set of vertices such that every pair is linked by some path. Running BFS or DFS from an unvisited vertex paints one component. Repeating from the next unvisited vertex counts the components. Time is still O(V+E) because each vertex and edge is processed once.

On a directed graph there are two notions. Weakly connected means the underlying undirected graph is connected. Strongly connected means every vertex can reach every other along directed paths. Strongly connected components (SCCs) partition the vertices; the condensation of SCCs is always a DAG. Kosaraju (two DFS passes, the second on the transpose using finish-time order) and Tarjan (one DFS with a low-link stack) both compute SCCs in O(V+E).

Union-Find (Disjoint Set Union) is the incremental view: start with V singleton components, union the two ends of each undirected edge, and the number of remaining parents is the component count. With union-by-rank and path compression the almost-O(1) inverse-Ackermann bound makes Kruskal cheap; the same structure answers ‘are u and v already connected?’

Exam traps: an isolated vertex is a component of size 1. A single directed edge A→B is weakly connected but not strongly connected. Grid ‘number of islands’ is connected components on a 4-neighbour (or 8-neighbour) implicit graph. Connectivity of an undirected graph is ‘exactly one component’.

When the question gives an adjacency matrix rather than a list, BFS/DFS is O(V²) because scanning a row is O(V). That is the right complexity to bubble if no list is mentioned.`,
      bullets: [
        "Undirected CC: repeat BFS/DFS from unvisited vertices; count the restarts.",
        "Directed: weak = ignore direction; strong = Kosaraju/Tarjan SCC.",
        "Union-Find counts undirected components while edges stream in.",
        "Isolated vertices count. Matrix form is O(V²).",
      ],
      examples: [
        {
          title: "Count undirected components with DFS",
          prompt:
            "Vertices 1..6. Edges {1-2, 2-3, 4-5}. How many connected components? Show the DFS restarts.",
          language: "python",
          code: `g = {1:[2], 2:[1,3], 3:[2], 4:[5], 5:[4], 6:[]}
seen = set()
def dfs(u):
    seen.add(u)
    for v in g[u]:
        if v not in seen:
            dfs(v)
comps = 0
for u in range(1, 7):
    if u not in seen:
        comps += 1
        dfs(u)
print(comps, seen)`,
          steps: [
            "Start at 1 (unseen). DFS paints 1-2-3. Restart count becomes 1. seen={1,2,3}.",
            "Vertex 2 and 3 are already seen, so they do not start a new search.",
            "Vertex 4 is unseen. DFS paints 4-5. Restart count becomes 2. seen={1,2,3,4,5}.",
            "Vertex 6 is unseen and has no edges. DFS paints only 6. Restart count becomes 3.",
            "No vertex remains. The three components are {1,2,3}, {4,5} and {6}. An isolated vertex is never dropped.",
          ],
          result: "3 connected components: {1,2,3}, {4,5}, {6}.",
        },
        {
          title: "Directed graph: weak versus strong",
          prompt:
            "Directed edges A→B, B→C, C→A, D→C. Is the graph weakly connected? How many SCCs? Name them.",
          language: "python",
          code: `# Kosaraju sketch
# pass 1 DFS finish order on G: start D then A-B-C (cycle)
# transpose: B→A, C→B, A→C, C→D
# pass 2 in reverse finish: the A-B-C cycle is one SCC; D is another`,
          steps: [
            "Ignore directions: A-B-C-D is a single undirected piece, so the graph is weakly connected.",
            "A, B, C lie on a directed cycle, so each can reach the other two. They form one SCC.",
            "D can reach C (hence A and B) but nothing in {A,B,C} can reach D, so D is a separate SCC.",
            "Condensation DAG: {D} → {A,B,C}. A DAG of SCCs is the exam picture for ‘can we share a strongly-connected cluster?’",
            "Kosaraju finish-time order processes the sink SCC {A,B,C} first on the transpose, then {D}. Two SCCs total.",
          ],
          result:
            "Weakly connected: yes. Strongly connected: no. Two SCCs: {A,B,C} and {D}.",
        },
        {
          title: "Number of islands on a grid",
          prompt:
            "4-neighbour grid (up/down/left/right). 1 = land, 0 = water:\n1 1 0 0\n0 1 0 1\n0 0 0 1\n1 0 0 0\nHow many islands? Trace the BFS/DFS floods.",
          language: "java",
          code: `int[][] a = {
  {1,1,0,0},
  {0,1,0,1},
  {0,0,0,1},
  {1,0,0,0}
};
// flood from each unvisited 1; 4-direction DFS/BFS
// island 1: (0,0)-(0,1)-(1,1)
// island 2: (1,3)-(2,3)
// island 3: (3,0)`,
          steps: [
            "Scan row-major. First land is (0,0). Flood 4-neighbours: (0,1) and then (1,1). That blob of three 1s is island 1. Mark them visited (or zero them).",
            "Continue the scan. (0,2),(0,3),(1,0) are water or already painted. (1,3) is a fresh 1. Flood down to (2,3). Island 2.",
            "(2,0..2) water; (3,0) is a fresh 1 with no land neighbour. Island 3.",
            "Rest of row 3 is water. Three restarts of the flood, so three islands.",
            "If the question used 8-neighbour connectivity, (1,1) would still not touch (1,3), so the count would stay 3. A diagonal bridge would merge islands — always read the neighbourhood.",
          ],
          result: "3 islands under 4-connectivity: {(0,0),(0,1),(1,1)}, {(1,3),(2,3)}, {(3,0)}.",
        },
        {
          title: "Union-Find while edges arrive",
          prompt:
            "Vertices {1,2,3,4,5}. Stream of undirected edges: 1-2, 3-4, 2-3, 1-4, 5-1. After each edge, how many components remain? When does a cycle appear?",
          language: "cpp",
          code: `// parent initially i -> i, 5 components
// union(1,2): comps=4
// union(3,4): comps=3
// union(2,3): merges the two pairs, comps=2
// union(1,4): already same parent -> cycle, comps stay 2
// union(5,1): comps=1`,
          steps: [
            "Start with 5 singleton parents. Each successful union decreases the component count by 1.",
            "1-2 merges {1}{2} → 4 components. 3-4 merges {3}{4} → 3 components.",
            "2-3 links the two pairs into {1,2,3,4} → 2 components. Vertex 5 is still alone.",
            "1-4: find(1)==find(4) already, so this edge is redundant and closes a cycle. Component count stays 2. This is exactly Kruskal’s ‘skip if same set’ test.",
            "5-1 merges the last singleton → 1 component. The graph is now connected; further edges can only add cycles.",
          ],
          result:
            "Component counts after each edge: 4, 3, 2, 2 (cycle), 1. The cycle is detected on edge 1-4.",
        },
      ],
    },
    {
      heading: "Shortest paths: Dijkstra, Bellman-Ford, Floyd-Warshall",
      body: `Dijkstra computes single-source shortest paths on graphs with non-negative edge weights. It is a greedy expansion: always settle the unsettled vertex with smallest tentative distance, then relax its outgoing edges. With a binary heap it is O((V+E) log V); with a Fibonacci heap O(E + V log V); with an array O(V²). Once a vertex is settled its distance is final — that proof needs non-negative weights.

Bellman-Ford also computes single-source shortest paths but allows negative weights. It relaxes every edge |V|-1 times. After that, one more pass that still succeeds in relaxing an edge proves a negative cycle reachable from the source. Time is O(VE). Use it when Dijkstra’s non-negative assumption fails, or when you must report ‘negative cycle, no finite shortest path’.

Floyd-Warshall computes all-pairs shortest paths by dynamic programming. Let d[k][i][j] be the shortest i→j path that only uses intermediates from {1..k}. The in-place recurrence is d[i][j] = min(d[i][j], d[i][k]+d[k][j]) looping k, then i, then j. Time O(V³), space O(V²). Negative edges are fine; a negative diagonal d[i][i] < 0 after the loops signals a negative cycle.

Exam comparison table: one source, weights ≥ 0 → Dijkstra. One source, negatives, need cycle detect → Bellman-Ford. All pairs, dense graph, V up to a few hundred → Floyd. Unweighted → BFS, not any of these. DAG → one topological pass of relaxations in O(V+E).

A common trap is running Dijkstra on a graph that has a negative edge but no negative cycle. The algorithm can settle a vertex too early and miss a cheaper path that used the negative edge later. Always check the weight hypothesis before naming the algorithm.`,
      bullets: [
        "Dijkstra: non-negative, greedy settle, heap O((V+E) log V).",
        "Bellman-Ford: negatives OK, |V|-1 relax rounds, extra round = cycle test, O(VE).",
        "Floyd-Warshall: all pairs, O(V³), intermediates k = 1..V.",
        "Negative cycle: BF extra relaxation or Floyd negative self-distance.",
      ],
      examples: [
        {
          title: "Dijkstra dry-run on four vertices",
          prompt:
            "Directed edges: A→B 4, A→C 2, C→B 1, B→D 5, C→D 8, A→D 10. Compute shortest paths from A with Dijkstra. Show the settled set and tentatives after each settlement.",
          language: "python",
          code: `import heapq
w = {("A","B"):4,("A","C"):2,("C","B"):1,("B","D"):5,("C","D"):8,("A","D"):10}
g = {"A":["B","C","D"], "B":["D"], "C":["B","D"], "D":[]}
dist = {v: float("inf") for v in g}
dist["A"] = 0
pq = [(0, "A")]
settled = []
while pq:
    d,u = heapq.heappop(pq)
    if d != dist[u]:
        continue
    settled.append(u)
    for v in g[u]:
        nd = d + w[(u,v)]
        if nd < dist[v]:
            dist[v] = nd
            heapq.heappush(pq, (nd, v))
print(settled, dist)`,
          steps: [
            "Init dist A=0, B=C=D=∞. Unsettled: {A,B,C,D}. Pop A (0). Relax B←4, C←2, D←10. Settled {A}. Tentatives: B=4, C=2, D=10.",
            "Smallest tentative is C=2. Settle C. Relax B via C: 2+1=3 < 4, so B←3. Relax D via C: 2+8=10, D stays 10.",
            "Smallest remaining is B=3. Settle B. Relax D via B: 3+5=8 < 10, so D←8.",
            "Settle D=8. No outgoing edges. All vertices settled. Paths: A; A-C; A-C-B; A-C-B-D.",
            "Note we never used A→D weight 10 or C→D weight 8 in the final tree. Greedy settlement of C then B found the cheaper 8.",
          ],
          result:
            "dist: A=0, C=2, B=3, D=8. Settlement order A, C, B, D. Shortest A-to-D path A-C-B-D.",
        },
        {
          title: "Why Dijkstra fails with a negative edge",
          prompt:
            "Directed edges S→A 1, S→B 100, A→B -50. True shortest S to B is S-A-B cost 1-50 = -49. What does Dijkstra (settling by tentative) do?",
          language: "java",
          code: `// tentatives: S=0, A=∞, B=∞
// settle S: A←1, B←100
// next smallest is A=1; settle A; relax B ← 1+(-50)= -49  (this time we are lucky)
// BUT if S→B 0 and A is deeper, Dijkstra may settle B before A
// classic fail: S→B 1, S→A 2, A→B -10
// settle S: B←1, A←2; settle B first at 1; never reconsider B; true is 2-10= -8`,
          steps: [
            "Take the classic failing instance: S→B weight 1, S→A weight 2, A→B weight −10. True S-B is −8 via A.",
            "Dijkstra from S relaxes B←1 and A←2. The smallest unsettled vertex is B at 1, so B is settled permanently.",
            "A is settled next. The relaxation 2+(−10)=−8 would improve B, but Dijkstra does not reopen a settled vertex (standard version).",
            "The algorithm reports dist(B)=1, which is wrong. The proof that settled distances are optimal used ‘all remaining edges are ≥ 0’, which is false here.",
            "Bellman-Ford would relax every edge twice (|V|-1 = 2) and obtain dist(B)=−8. That is the algorithm the exam wants when a negative weight is present.",
          ],
          result:
            "Dijkstra can settle B too early and miss S-A-B. With negative weights use Bellman-Ford (or Floyd if all-pairs).",
        },
        {
          title: "Bellman-Ford relaxation rounds",
          prompt:
            "Directed edges: A→B 4, A→C 5, B→C −3, C→D 4, B→D 10. Source A, |V|=4 so 3 rounds. Show dist after each round. Is there a negative cycle?",
          language: "python",
          code: `edges = [("A","B",4),("A","C",5),("B","C",-3),("C","D",4),("B","D",10)]
dist = {"A":0,"B":10**9,"C":10**9,"D":10**9}
for round in range(3):
    for u,v,w in edges:
        if dist[u]+w < dist[v]:
            dist[v] = dist[u]+w
    print(round+1, dist)
# 4th round: if any update, negative cycle`,
          steps: [
            "Round 1, process in listed order: B←4, C←5, then C via B: 4+(−3)=1 so C←1, D via C: 1+4=5, D via B: 4+10=14 so D stays 5. After round 1: A0 B4 C1 D5.",
            "Round 2: A→B 0+4=4 (no change), A→C 5>1, B→C 4-3=1, C→D 1+4=5, B→D 14>5. Distances already stable.",
            "Round 3: no further change. |V|-1 rounds are enough for a shortest simple path (at most |V|-1 edges).",
            "Extra 4th round: no edge relaxes, so no negative cycle reachable from A.",
            "If we added D→B −10, then D=5 would make B←−5, then C and D would keep dropping every round — the extra pass would still succeed, flagging a negative cycle.",
          ],
          result:
            "Final dist A=0, B=4, C=1, D=5 (path A-B-C-D). No negative cycle. Bellman-Ford needed the negative B→C which Dijkstra would also handle here, but BF is the safe choice.",
        },
        {
          title: "Floyd-Warshall one k-iteration",
          prompt:
            "Three vertices 1,2,3. Weight matrix (∞ = no edge): row-from, column-to\n    1 2 3\n1   0 3 8\n2   ∞ 0 2\n3   1 ∞ 0\nRun Floyd with k=1 then k=2 then k=3. Report the all-pairs matrix.",
          language: "cpp",
          code: `const int INF = 1e9;
int d[4][4] = {
  {},
  {0, 0, 3, 8},
  {0, INF, 0, 2},
  {0, 1, INF, 0}
};
for (int k = 1; k <= 3; k++)
  for (int i = 1; i <= 3; i++)
    for (int j = 1; j <= 3; j++)
      if (d[i][k] + d[k][j] < d[i][j])
        d[i][j] = d[i][k] + d[k][j];`,
          steps: [
            "k=1 (allow vertex 1 as intermediate). i=2,j=3: d[2][1]+d[1][3]=∞+8, no. i=3,j=2: d[3][1]+d[1][2]=1+3=4 < ∞, so d[3][2]←4. Other cells unchanged. Matrix now has 3→2 = 4 via 1.",
            "k=2. i=1,j=3: d[1][2]+d[2][3]=3+2=5 < 8, so d[1][3]←5 (path 1-2-3). i=3,j=3: 4+2=6 > 0, keep 0. i=1,j=1 unchanged.",
            "k=3. i=2,j=1: d[2][3]+d[3][1]=2+1=3 < ∞, so d[2][1]←3 (path 2-3-1). i=1,j=2: d[1][3]+d[3][2]=5+4=9 > 3, keep 3. i=2,j=2: 2+4=6>0.",
            "Final matrix: row1: 0,3,5; row2: 3,0,2; row3: 1,4,0. Diagonal still 0, so no negative cycle.",
            "Loop order is k outermost. Swapping k inside i,j is a common bug that uses a vertex as intermediate before its own row is ready.",
          ],
          result:
            "All-pairs distances: 1→2=3, 1→3=5, 2→1=3, 2→3=2, 3→1=1, 3→2=4. Negative cycle: none.",
        },
      ],
    },
    {
      heading: "Minimum spanning trees: Kruskal versus Prim",
      body: `A spanning tree of a connected undirected graph is a subset of edges that connects every vertex and contains no cycle. Among all spanning trees a minimum spanning tree (MST) has smallest total weight. If all weights are distinct the MST is unique; equal weights may yield several MSTs of the same cost.

Kruskal sorts every edge by increasing weight and adds an edge if its ends lie in different Union-Find components (i.e. it does not form a cycle). It is edge-centric and works naturally on sparse disconnected graphs, producing a minimum spanning forest. Time O(E log E) from the sort (Union-Find is nearly free).

Prim grows a tree from a start vertex, always adding the cheapest edge that leaves the tree. It is vertex-centric. With a binary heap it is O((V+E) log V), matching Dijkstra’s shape; the difference is the key of a vertex = weight of the cheapest edge into the tree, not a path sum. On dense graphs an O(V²) array implementation is fine.

Cut property: for any cut, the minimum-weight edge crossing the cut belongs to some MST. Cycle property: the maximum-weight edge on any cycle is not needed in an MST. Kruskal is the cycle property (skip an edge that would close a cycle). Prim is the cut property (take the lightest edge out of S).

Exam traps: MST is defined only for undirected graphs; ‘minimum spanning arborescence’ on directed graphs is a different algorithm (Edmonds). Shortest-path tree ≠ MST: Dijkstra from one source can differ from the MST. Prim and Kruskal produce the same total weight; they may pick different edges when ties exist.`,
      bullets: [
        "Kruskal: sort edges, skip if same Union-Find set, O(E log E).",
        "Prim: grow from a vertex, min outgoing edge, heap O((V+E) log V).",
        "Cut property and cycle property justify both.",
        "Undirected, connected, weighted. Forest if disconnected.",
      ],
      examples: [
        {
          title: "Kruskal on a 4-vertex graph",
          prompt:
            "Vertices A,B,C,D. Undirected edges AB 1, BC 2, AC 3, CD 4, BD 5, AD 6. Run Kruskal. Which edges enter the MST and in what order?",
          language: "python",
          code: `edges = [("A","B",1),("B","C",2),("A","C",3),
         ("C","D",4),("B","D",5),("A","D",6)]
parent = {v:v for v in "ABCD"}
def find(x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]
        x = parent[x]
    return x
mst = []
for u,v,w in sorted(edges, key=lambda e: e[2]):
    if find(u) != find(v):
        parent[find(u)] = find(v)
        mst.append((u,v,w))
print(mst, sum(w for _,_,w in mst))`,
          steps: [
            "Sort: AB1, BC2, AC3, CD4, BD5, AD6.",
            "Add AB (A and B were singletons). Components: {A,B} {C} {D}.",
            "Add BC (C was separate). Components: {A,B,C} {D}.",
            "Skip AC: A and C already share a parent — that edge would cycle A-B-C. This is the cycle property.",
            "Add CD, linking D. Four vertices, three edges, stop. Skip BD and AD. MST weight 1+2+4=7.",
          ],
          result: "MST edges AB, BC, CD in that order. Total weight 7. AC, BD, AD rejected.",
        },
        {
          title: "Prim growing from A on the same graph",
          prompt:
            "Same weights as Kruskal. Start Prim at A. Show the cut (tree set S) and the chosen edge at each step.",
          language: "java",
          code: `// S starts {A}
// edges leaving S: AB1, AC3, AD6  -> take AB, S={A,B}
// leaving S: AC3, BD5, AD6, BC2  -> take BC, S={A,B,C}
// leaving S: CD4, BD5, AD6      -> take CD, S={A,B,C,D}
// done, weight 1+2+4=7`,
          steps: [
            "S={A}. Lightest edge out of S is AB weight 1. Add B. (Cut property: AB belongs to some MST.)",
            "S={A,B}. Candidates: AC 3, AD 6, BC 2, BD 5. Lightest leaving edge is BC 2. Add C.",
            "S={A,B,C}. Candidates: AD 6, CD 4, BD 5. Lightest is CD 4. Add D.",
            "S has all four vertices. Tree edges AB, BC, CD — identical to Kruskal here because all weights were distinct.",
            "Implementation with a min-heap of (weight, vertex) keys, decrease-key when a cheaper edge into a vertex appears, is the Dijkstra-like code the exam expects you to recognise.",
          ],
          result:
            "Prim from A also yields AB, BC, CD weight 7. Same MST as Kruskal because weights were unique.",
        },
        {
          title: "Tied weights: two different MSTs, same cost",
          prompt:
            "Triangle A-B 1, B-C 1, C-A 1. How many distinct MSTs exist? What is their common weight? Which algorithm ‘wins’ the tie?",
          language: "cpp",
          code: `// any two of the three edges form a spanning tree of weight 2
// Kruskal: sort is stable-or-not; first two edges in the sort order are kept,
// the third closes the cycle and is skipped
// Prim from A: whichever of AB, AC the heap pops first, then the remaining
// edge to C (or B) of weight 1`,
          steps: [
            "A spanning tree of three vertices has two edges. Any pair of the three unit edges works and has weight 2.",
            "There are C(3,2)=3 distinct MSTs, all optimal. The MST is not unique when weights collide.",
            "Kruskal will pick the first two edges in its sorted list (the third is a cycle). The sort’s tie-break (input order, vertex names) decides which tree you get.",
            "Prim’s heap tie-break likewise. Exam questions that ask ‘the MST’ when ties exist are under-specified unless they ask for the weight only.",
            "Both algorithms are still correct: they return some MST. The cut/cycle proofs allow any lightest eligible edge, not a unique one.",
          ],
          result:
            "Three MSTs, each of weight 2. Kruskal and Prim may return different edge sets; both are valid MSTs.",
        },
        {
          title: "MST versus shortest-path tree",
          prompt:
            "Undirected: S-A 1, S-B 3, A-B 1. MST weight? Dijkstra shortest-path tree from S? Are they the same edge set?",
          language: "python",
          code: `# MST: take SA=1 and AB=1, skip SB=3, total 2. Connects S,A,B.
# Dijkstra from S:
#   dist S=0, A=1 via SA, B=min(3, 1+1)=2 via S-A-B
#   SPT edges: SA and AB. Here they coincide.
# Counter-example: S-A 4, S-B 4, A-B 1, A-T 4, B-T 4, S-T 100
# MST wants AB plus cheap spokes; SPT from S wants SA,SB and then to T.`,
          steps: [
            "On the triangle, MST = {SA, AB} weight 2. Dijkstra from S also uses SA and then AB to reach B at dist 2. Same tree this time.",
            "Four vertices S,A,B,T with edges S-A 4, S-B 4, A-B 1, A-T 4, B-T 4. MST needs 3 edges: take the unique cheap edge AB=1 plus two spokes, e.g. SA=4 and BT=4, total 9.",
            "Dijkstra from S: dist A=4, B=4 (direct), T=min(4+4 via A, 4+4 via B)=8. SPT edges SA, SB, and say AT. Edge AB of weight 1 is not on any shortest path from S (using AB to reach B would be 4+1=5 > 4).",
            "So the MST includes AB; the shortest-path tree from S excludes AB. Different objectives: global cheap connector versus cheap paths from one source.",
            "Exam one-liner: ‘Prim looks like Dijkstra but the key is edge weight into the tree, not path distance.’ That is the distinction to tick.",
          ],
          result:
            "MST minimises total edge weight; shortest-path tree minimises distances from a source. They can differ (AB cheap for MST, useless for SPT from S).",
        },
      ],
    },
    {
      heading: "Sorting: merge, heap, quick, insertion — complexity and stability",
      body: `Insertion sort builds a sorted prefix. Best case is an already-sorted array: each new element compares once, Θ(n). Average and worst are Θ(n²) (reversed array). It is stable if you insert by moving equals to the right of existing equals (the usual implementation). Extra memory Θ(1). Good for n ≲ 40 and as the base case of hybrid sorts.

Merge sort splits in half, sorts recursively, then merges two sorted runs in linear time. Recurrence T(n)=2T(n/2)+Θ(n) → Θ(n log n) best, average and worst. It is stable. Extra memory Θ(n) for the merge buffer (or Θ(n) stack+buffer). The split/merge tree is a favourite dry-run.

Heap sort builds a max-heap in Θ(n) (bottom-up heapify), then repeatedly extracts the max into the tail. Best/average/worst Θ(n log n). Not stable: heap swaps ignore original order of equals. Extra memory Θ(1) (in-place aside from recursion/log stack). The heapify step is shared with the heap data-structure questions.

Quick sort partitions around a pivot then recurses. Best and average Θ(n log n). Worst Θ(n²) when the pivot is always the smallest or largest remaining element (already-sorted array + first/last pivot). Randomised or median-of-three pivot makes worst case unlikely. The common in-place Lomuto/Hoare schemes are not stable. Extra memory Θ(log n) expected stack, Θ(n) worst stack if unbalanced.

Stability matters when you sort records by a secondary key and then a primary key: a stable sort preserves the secondary order among ties. Merge and insertion are the stable pair in this list; heap and typical quick are not. Counting/radix can be stable; the exam may ask that too, but the four named sorts are the core table.`,
      bullets: [
        "Insertion: best n, avg/worst n², stable, in-place.",
        "Merge: always n log n, stable, Θ(n) extra.",
        "Heap: always n log n, not stable, in-place.",
        "Quick: avg n log n, worst n², not stable (usual), in-place.",
      ],
      examples: [
        {
          title: "Merge-sort split and merge of [38, 27, 43, 3]",
          prompt:
            "Show every split down to singletons and every merge back up for merge sort on [38, 27, 43, 3]. Assume the left half is ceil-split as floor(n/2) on the left.",
          language: "python",
          code: `def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left = merge_sort(a[:mid])
    right = merge_sort(a[mid:])
    return merge(left, right)
def merge(L, R):
    i = j = 0
    out = []
    while i < len(L) and j < len(R):
        if L[i] <= R[j]:          # <= keeps stability
            out.append(L[i]); i += 1
        else:
            out.append(R[j]); j += 1
    return out + L[i:] + R[j:]
print(merge_sort([38, 27, 43, 3]))`,
          steps: [
            "Split [38, 27, 43, 3] at mid=2 → left [38, 27] and right [43, 3].",
            "Split left at mid=1 → [38] and [27]. Singletons are sorted. Merge them: 27≤38 so [27, 38].",
            "Split right at mid=1 → [43] and [3]. Merge: 3≤43 so [3, 43].",
            "Merge [27, 38] with [3, 43]: compare 27 vs 3 → take 3; 27 vs 43 → take 27; 38 vs 43 → take 38; leftover 43. Result [3, 27, 38, 43].",
            "Because the merge used ≤, two equal keys would have come from the left run first, which is why merge sort is stable. Depth of recursion is log₂ 4 = 2; work per level is 4 comparisons-or-copies, matching Θ(n log n).",
          ],
          result:
            "Split tree: [38,27,43,3] → [38,27]|[43,3] → [38]|[27] and [43]|[3]. Merges: [27,38], [3,43], then [3, 27, 38, 43].",
        },
        {
          title: "Insertion sort on [5, 2, 4, 6, 1, 3]",
          prompt:
            "Trace the sorted prefix after each insertion. Count the number of pairwise inversions removed. State best/worst for this pattern.",
          language: "cpp",
          code: `int a[] = {5,2,4,6,1,3};
for (int i = 1; i < 6; i++) {
    int key = a[i], j = i - 1;
    while (j >= 0 && a[j] > key) {
        a[j+1] = a[j];
        j--;
    }
    a[j+1] = key;
}`,
          steps: [
            "i=1, key=2. 5>2, shift 5. Array [2, 5, 4, 6, 1, 3]. Sorted prefix length 2.",
            "i=2, key=4. 5>4, shift 5; 2≤4, stop. [2, 4, 5, 6, 1, 3].",
            "i=3, key=6. 5≤6, no shifts. [2, 4, 5, 6, 1, 3]. Best-case behaviour on this element.",
            "i=4, key=1. Shift 6,5,4,2. [1, 2, 4, 5, 6, 3]. i=5, key=3. Shift 6,5,4. [1, 2, 3, 4, 5, 6].",
            "Shifts equal the number of inversions (pairs out of order). Already-sorted input would have done 5 compares and 0 shifts (Θ(n)). Reversed input would be Θ(n²). Stability: an equal key would not enter the while (because of > not ≥), so it stays to the right of earlier equals.",
          ],
          result:
            "Prefixes: [5] → [2,5] → [2,4,5] → [2,4,5,6] → [1,2,4,5,6] → [1,2,3,4,5,6]. Stable, Θ(n²) on this mixed input.",
        },
        {
          title: "Quick-sort Lomuto partition around last pivot",
          prompt:
            "Partition [10, 7, 8, 9, 1, 5] with Lomuto, pivot = last element 5. Then state the two recursive subarrays. Why is sorted input the worst case for ‘pivot = last’?",
          language: "python",
          code: `def lomuto(a, lo, hi):
    pivot = a[hi]
    i = lo
    for j in range(lo, hi):
        if a[j] <= pivot:
            a[i], a[j] = a[j], a[i]
            i += 1
    a[i], a[hi] = a[hi], a[i]
    return i
a = [10, 7, 8, 9, 1, 5]
p = lomuto(a, 0, 5)
print(a, p)`,
          steps: [
            "pivot=5, i=0. Scan j=0..4: 10,7,8,9 are all >5 so i stays 0. j at 1 (value 1): 1≤5, swap a[0] and a[4] → [1, 7, 8, 9, 10, 5], i becomes 1.",
            "End of loop. Swap pivot into place at i=1: swap a[1] and a[5] → [1, 5, 8, 9, 10, 7]. Pivot index 1.",
            "Left subarray [1] (already trivial). Right subarray [8, 9, 10, 7], which will be partitioned next around 7, and so on.",
            "If the array had been sorted [1,5,7,8,9,10] with pivot=last=10, every element is ≤ pivot, i walks the whole range, pivot lands at the right end, and one side is empty — T(n)=T(n-1)+Θ(n)=Θ(n²).",
            "Random pivot or median-of-three makes this degenerate split unlikely. Average T(n)=Θ(n log n) still holds. The usual in-place swap partition is not stable (equal keys can leap over each other during swaps).",
          ],
          result:
            "After one Lomuto pass: [1, 5, 8, 9, 10, 7], pivot index 1. Worst case of last-element pivot is a sorted (or reverse-sorted) array → Θ(n²).",
        },
        {
          title: "Heap-sort one extract and the complexity table",
          prompt:
            "Max-heap array [10, 7, 8, 3, 2, 4]. Perform one heap-sort extract-max step (swap root with tail, heapify). Then fill best/avg/worst/stable/extra-memory for merge, heap, quick, insertion.",
          language: "java",
          code: `// heap [10,7,8,3,2,4], n=6
// swap a[0] with a[5]: [4,7,8,3,2,10]  (10 now in sorted tail)
// heapify index 0, heap-size 5:
//   children 7 and 8, larger is 8 at index 2
//   swap 4 and 8: [8,7,4,3,2,10]
//   index 2=4 has children out of heap-size or 4's children: idx 5 is beyond size 5
// heap is [8,7,4,3,2] with sorted suffix [10]`,
          steps: [
            "Extract-max: swap 10 with the last heap element 4. The tail slot is now sorted. Heap size drops to 5; root 4 may violate the heap property.",
            "Sift down: left child 7 (i=1), right child 8 (i=2). Larger child is 8. 4<8, swap → [8, 7, 4, 3, 2 | 10].",
            "Index 2 now holds 4. Its children would be indices 5 and 6, but heap-size is 5 so index 5 is outside. Stop. Next extract will pull 8.",
            "Complexity row: Merge Θ(n log n)/Θ(n log n)/Θ(n log n), stable, Θ(n) extra. Heap Θ(n log n) all cases, not stable, Θ(1) extra. Quick Θ(n log n)/Θ(n log n)/Θ(n²), not stable, Θ(log n) extra expected. Insertion Θ(n)/Θ(n²)/Θ(n²), stable, Θ(1).",
            "Build-heap from unsorted is Θ(n), not Θ(n log n), because the sift-downs at the bottom are short. Exam trick: ‘heapify the array’ is linear; ‘n insertions into an empty heap’ is Θ(n log n).",
          ],
          result:
            "After one extract: heap [8,7,4,3,2] and sorted tail [10]. Table: merge always n log n stable extra n; heap always n log n unstable in-place; quick avg n log n worst n² unstable; insertion best n worst n² stable in-place.",
        },
      ],
    },
    {
      heading: "Binary search",
      body: `Binary search finds a target in a sorted array (or computes a monotonic predicate’s transition) in O(log n) comparisons. Maintain a closed or half-open interval of candidate indices. The midpoint mid = lo + (hi-lo)/2 avoids overflow that (lo+hi)/2 can cause in fixed-width integers. Compare a[mid] with the target and discard half of the interval.

Best case is Θ(1) when the target sits at the first midpoint. Average and worst are Θ(log n). The algorithm is not a sort; it requires the array to be already sorted (or the search space to be monotonic). On an unsorted array it is simply wrong, not merely slow.

Variants the exam loves: lower_bound (first index with a[i] ≥ x), upper_bound (first index with a[i] > x), search in a rotated sorted array (one half is still sorted — check which), search a 2D matrix that is sorted row-wise and whose next row starts larger than the previous row’s last entry (treat as a virtual 1D array of size m·n).

The loop invariant is the only way to get the off-by-one right. For closed interval [lo, hi] searching for exact match: while lo ≤ hi, if a[mid]<x then lo=mid+1, if a[mid]>x then hi=mid-1, else return mid. Empty interval lo>hi means ‘not found’. Infinite loops come from not moving lo/hi strictly (e.g. hi=mid when mid can equal hi).

Binary search on the answer (parametric search) is the same idea on a numeric range: feasibility(F) is monotonic, so you binary-search F. That is how ‘minimum capacity to ship packages in D days’ and ‘sqrt of an integer’ are solved.`,
      bullets: [
        "Requires sorted / monotonic input. Time Θ(log n) worst, Θ(1) best.",
        "mid = lo + (hi-lo)/2. Move lo or hi strictly to avoid infinite loops.",
        "lower_bound: first ≥ x; upper_bound: first > x.",
        "Rotated array: one side of mid is sorted — binary-search that side or the other.",
      ],
      examples: [
        {
          title: "Exact search for 7 in [1, 3, 5, 7, 9, 11]",
          prompt:
            "Closed interval binary search, lo=0, hi=5. Trace lo, hi, mid and the comparison at every iteration until 7 is found or the interval dies.",
          language: "python",
          code: `a = [1, 3, 5, 7, 9, 11]
lo, hi, x = 0, 5, 7
while lo <= hi:
    mid = lo + (hi - lo) // 2
    print(lo, mid, hi, a[mid])
    if a[mid] == x:
        break
    if a[mid] < x:
        lo = mid + 1
    else:
        hi = mid - 1`,
          steps: [
            "Iteration 1: lo=0, hi=5, mid=2, a[2]=5. 5<7 so discard the left half including mid: lo ← 3.",
            "Iteration 2: lo=3, hi=5, mid=4, a[4]=9. 9>7 so discard the right half: hi ← 3.",
            "Iteration 3: lo=3, hi=3, mid=3, a[3]=7. Equal — return index 3.",
            "Three comparisons on n=6 ≈ log₂ 6. The discarded halves never contained 7, which is the invariant.",
            "If the target had been 8 (absent): after finding 7 we would have lo=4, hi=3 on the next miss path from a 9-branch, and lo>hi stops with ‘not found’.",
          ],
          result: "Found 7 at index 3. Trace (lo,mid,hi): (0,2,5) → (3,4,5) → (3,3,3).",
        },
        {
          title: "lower_bound of 6 in [1, 3, 3, 6, 6, 8, 9]",
          prompt:
            "Find the first index i with a[i] ≥ 6. Use the ‘always shrink, remember candidate’ template.",
          language: "java",
          code: `int[] a = {1,3,3,6,6,8,9};
int lo = 0, hi = a.length, x = 6; // half-open [lo, hi)
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (a[mid] < x) lo = mid + 1;
    else hi = mid;              // a[mid] >= x, this may be the first
}
// lo is the insertion point`,
          steps: [
            "Half-open [0,7). mid=3, a[3]=6 ≥ 6, so hi←3. Candidate interval [0,3).",
            "mid=1, a[1]=3 < 6, so lo←2. Interval [2,3).",
            "mid=2, a[2]=3 < 6, so lo←3. Interval [3,3) empty. lo=3 is the first index ≥ 6.",
            "a[3] and a[4] are both 6; lower_bound must return the leftmost. The ‘hi=mid on ≥’ rule is what walks to the left of the duplicate run.",
            "upper_bound would use ‘if a[mid] ≤ x then lo=mid+1 else hi=mid’ and would land on index 5 (the 8), i.e. first strictly greater than 6. Count of 6s = upper−lower = 2.",
          ],
          result: "lower_bound(6)=3 (first 6). upper_bound(6)=5. Frequency = 2.",
        },
        {
          title: "Rotated sorted array: find 6 in [4, 5, 6, 7, 0, 1, 2]",
          prompt:
            "The array was a sorted cycle. At each mid, one of [lo,mid] or [mid,hi] is sorted. Use that to decide which half holds the target 6.",
          language: "cpp",
          code: `int a[] = {4,5,6,7,0,1,2};
int lo = 0, hi = 6, x = 6;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == x) break;
    if (a[lo] <= a[mid]) {           // left sorted
        if (a[lo] <= x && x < a[mid]) hi = mid - 1;
        else lo = mid + 1;
    } else {                         // right sorted
        if (a[mid] < x && x <= a[hi]) lo = mid + 1;
        else hi = mid - 1;
    }
}`,
          steps: [
            "lo=0, hi=6, mid=3, a[3]=7. Left [4,5,6,7] is sorted (4≤7). Target 6 lies in [4,7), so hi←2.",
            "lo=0, hi=2, mid=1, a[1]=5. Left [4,5] sorted. 6 is not in [4,5), so lo←2.",
            "lo=2, hi=2, mid=2, a[2]=6. Found. Index 2.",
            "Had the target been 1, the first branch would have thrown us into the unsorted right half [0,1,2], which is the side that actually contains 1.",
            "Pitfall: duplicates (e.g. [2,2,2,0,2]) can make a[lo]==a[mid]==a[hi]; then you must shrink lo++ or hi-- linearly. Distinct elements keep O(log n).",
          ],
          result: "6 found at index 2. Decision: at mid=7 the left half was sorted and contained 6, so the search never looked at the 0,1,2 tail.",
        },
        {
          title: "Binary search the answer: integer square root",
          prompt:
            "Compute floor(sqrt(27)) by searching the monotonic predicate mid*mid ≤ 27 on the range lo=1, hi=27.",
          language: "python",
          code: `x = 27
lo, hi, ans = 1, x, 0
while lo <= hi:
    mid = lo + (hi - lo) // 2
    if mid * mid <= x:
        ans = mid
        lo = mid + 1
    else:
        hi = mid - 1
print(ans)  # 5 because 5*5=25 <= 27 < 36`,
          steps: [
            "Feasibility F(mid) = (mid² ≤ 27) is true for 1..5 and false for 6..27. Binary search finds the last true.",
            "mid of [1,27] is 14. 14²=196>27, hi←13. Keep discarding the infeasible right.",
            "Eventually mid=5, 25≤27, record ans=5 and search right for a bigger feasible (lo←6). The next mids fail, hi collapses, ans stays 5.",
            "This is the same loop as lower/upper bound, only the predicate is numeric rather than an array probe. Overflow: compare mid ≤ x/mid in integers instead of mid*mid.",
            "Any ‘minimise the maximum’ exam problem (books on shelves, painter’s partition, split array largest sum) is this template plus a linear feasibility scan.",
          ],
          result: "floor(sqrt(27))=5. The search space was the integers, not an array index.",
        },
      ],
    },
    {
      heading: "Hashing: chaining versus open addressing",
      body: `A hash table maps a key to a bucket via h(k). Uniform hashing spreads n keys over m buckets with load factor α = n/m. Expected search is O(1+α) under that assumption. Worst case is Θ(n) if every key collides (adversarial keys or a weak hash).

Separate chaining stores a linked list (or tree) at each bucket. Insert is O(1) at the head of the list (or O(bucket size)). α can exceed 1; the table degrades gracefully. Deletion is simple: unlink the node. Extra memory for pointers. Java’s HashMap is chaining (with treeification of long buckets).

Open addressing stores every key in the table array itself. A probe sequence h(k,i) for i=0,1,2,… walks until an empty slot. Linear probing: (h(k)+i) mod m — fast, but primary clustering (runs of filled slots grow). Quadratic probing: (h(k)+i²) mod m — weaker clustering, needs m prime and a load bound to guarantee a free slot. Double hashing: (h1(k)+i·h2(k)) mod m — best probe spread among the three.

Load factor in open addressing must stay below 1 (usually rehash at 0.5–0.75). Deletion cannot just clear a slot: that would break probe chains, so slots are marked DELETED (tombstones) and later searches keep walking. Rehashing to a larger m rebuilds from scratch and drops tombstones.

Exam comparisons: chaining handles α>1 and easy deletes; open addressing has better cache locality and no pointers. Universal hashing defeats an adversary. Perfect hashing is for static sets. Collisions are certain by pigeonhole when n>m; the question is how you store them, not how you avoid them forever.`,
      bullets: [
        "α = n/m. Expected O(1+α) under uniform hashing; worst Θ(n).",
        "Chaining: lists in buckets, α may exceed 1, easy delete.",
        "Open addressing: linear / quadratic / double hashing; α<1; tombstones.",
        "Primary clustering is the linear-probing disease.",
      ],
      examples: [
        {
          title: "Chaining with h(k)=k mod 7",
          prompt:
            "Insert 50, 700, 76, 85, 92, 73, 101 into a table of 7 buckets, chaining at the head. Show each bucket’s list. Search cost for 92? for 33?",
          language: "python",
          code: `m = 7
b = [[] for _ in range(m)]
for k in [50, 700, 76, 85, 92, 73, 101]:
    b[k % 7].insert(0, k)
print(b)`,
          steps: [
            "50%7=1 → bucket 1: [50]. 700%7=0 → bucket 0: [700]. 76%7=6 → [76]. 85%7=1 → collide with 50, prepend: bucket 1 [85, 50].",
            "92%7=1 → bucket 1 [92, 85, 50]. 73%7=3 → [73]. 101%7=3 → [101, 73].",
            "Final: 0:[700] 1:[92,85,50] 2:[] 3:[101,73] 4:[] 5:[] 6:[76]. α=7/7=1. Expected chain length 1, but bucket 1 has three keys — variance is normal.",
            "Search 92: hash to 1, first node is 92, one comparison. Search 33: 33%7=5, bucket empty, one hash plus an empty check — miss in O(1).",
            "Delete 85: hash to 1, walk 92→85, unlink. 92 and 50 stay. Chaining delete does not need tombstones.",
          ],
          result:
            "Buckets: 0:[700], 1:[92,85,50], 3:[101,73], 6:[76]. Hit 92 in one chain step; miss 33 on empty bucket 5.",
        },
        {
          title: "Linear probing insert and clustering",
          prompt:
            "Table size m=7, h(k)=k mod 7, linear probing. Insert 10, 3, 17, 24 (all map near slot 3). Show the array after each insert. Why is the next miss expensive?",
          language: "java",
          code: `Integer[] t = new Integer[7];
int[] keys = {10, 3, 17, 24};
for (int k : keys) {
    int i = k % 7;
    while (t[i] != null) i = (i + 1) % 7;
    t[i] = k;
}`,
          steps: [
            "10%7=3, slot 3 empty → [_,_,_,10,_,_,_].",
            "3%7=3, slot 3 taken, probe 4 empty → [_,_,_,10,3,_,_].",
            "17%7=3, slots 3,4 taken, probe 5 empty → [_,_,_,10,3,17,_].",
            "24%7=3, slots 3–5 taken, probe 6 empty → [_,_,_,10,3,17,24]. A contiguous run (cluster) of length 4 now occupies slots 3..6.",
            "A miss for a new key with h=3 walks four filled slots before a hole (wrap to 0). Primary clustering: insertions into a cluster make it longer, which makes future probes even longer. That is why linear probing wants α well below 0.7.",
          ],
          result:
            "Table [empty, empty, empty, 10, 3, 17, 24]. Cluster length 4 at slots 3–6. Next probe starting at 3 is Θ(cluster length).",
        },
        {
          title: "Quadratic probing versus double hashing on one collision",
          prompt:
            "m=11 (prime). h(k)=k mod 11. Key 22 hashes to 0, but slot 0 is full. Where does quadratic probing (i²) try next? Where does double hashing with h2(k)=1+(k mod 10) try next?",
          language: "cpp",
          code: `// quadratic: (h + i*i) mod 11 for i=1,2,3,...
//  i=1 -> 1, i=2 -> 4, i=3 -> 9, i=4 -> 5, ...
// double: h2(22)=1+(22%10)=3
//  probes 0, 3, 6, 9, 1, 4, ...  step 3`,
          steps: [
            "Quadratic sequence from slot 0: 0, 1, 4, 9, 5 (16%11), 3 (25%11), … The steps themselves grow, which skips over a short linear cluster.",
            "Double hashing from slot 0 with step 3: 0, 3, 6, 9, 1, 4, 7, 10, 2, 5, 8 — a permutation of all 11 slots because step 3 is coprime to 11.",
            "If slot 1 is also full (a neighbour of 0), quadratic still finds 4 on the second try; linear would have walked 1 then 2. That is the clustering contrast.",
            "Quadratic probing may not visit every slot unless m is prime and α is bounded (classic theorem: first (m+1)/2 probes distinct for m prime). Double hashing with a coprime step visits all.",
            "Exam pick: ‘primary clustering’ → linear. ‘secondary clustering’ (keys with the same h follow the same quadratic path) → quadratic. ‘best spread among open-addressing’ → double hashing.",
          ],
          result:
            "Quadratic next slots 1,4,9,…. Double hashing next slots 3,6,9,… (step 3). Double hashing avoids both primary and secondary clustering.",
        },
        {
          title: "Tombstones: why open-addressing delete is not a blank write",
          prompt:
            "Linear-probing table [_, 10, 17, 24, _] with h(10)=h(17)=h(24)=1. Delete 17 by writing EMPTY. What goes wrong when we later search for 24? How do tombstones fix it?",
          language: "python",
          code: `# wrong: t[2] = EMPTY after deleting 17
# search 24: h=1, slot1=10 != 24, slot2 EMPTY -> stop, report miss. BUG.
# right: t[2] = TOMBSTONE
# search 24: skip tombstone, find 24 at slot 3
# insert of a new key may reuse the tombstone slot`,
          steps: [
            "24 was placed at slot 3 because slots 1 and 2 were full during its insert. Its probe chain is 1→2→3.",
            "If delete(17) writes EMPTY at slot 2, a later search for 24 stops at the hole and falsely reports ‘not present’.",
            "Marking slot 2 as TOMBSTONE tells search ‘keep walking’ and tells insert ‘you may reuse this slot’.",
            "Too many tombstones slow every search down to a full-table scan; the cure is periodic rehash into a clean array.",
            "Chaining does not have this problem: deleting a node from the bucket list cannot hide a later node in a different slot, because there is no probe sequence.",
          ],
          result:
            "Blanking a slot breaks later keys’ probe chains. Open addressing must use tombstones (or rehash on delete). Chaining just unlinks.",
        },
      ],
    },
    {
      heading: "Greedy algorithms: activity selection, fractional knapsack, Huffman",
      body: `A greedy algorithm commits to a locally optimal choice and never backtracks. It is correct only when an exchange argument or a matroid / optimal-substructure-plus-greedy-choice proof says so. Counter-examples (0/1 knapsack, coin systems that are not canonical, longest path) are as important as the three textbook successes.

Activity selection: n intervals [s_i, f_i). Pick a maximum-cardinality subset of non-overlapping intervals. Sort by finish time, then repeatedly take the next activity that starts at or after the last chosen finish. O(n log n) from the sort. Greedy choice: the earliest-finishing compatible activity is safe. Sorting by start time or by duration is wrong.

Fractional knapsack: n items with value v_i and weight w_i, capacity W; you may take a fraction of an item. Sort by value-density v_i/w_i decreasing, then take whole items until the leftover capacity is filled by a fraction of the next. O(n log n). This fails for 0/1 knapsack (no fractions) — there you need DP.

Huffman coding: given character frequencies, build a prefix-free binary code of minimum weighted external path length. Repeatedly pop the two lightest trees from a min-heap, make them children of a new internal node whose weight is the sum, push back. O(n log n). The two rarest symbols always get the longest codes. The exam may ask you to draw the tree and read the bit-strings.

Greedy does not mean ‘sort and take largest’. MST (Kruskal/Prim), Dijkstra, Huffman, activity, fractional knapsack are greedy. 0/1 knapsack, LCS, matrix-chain, and general coin change are DP. If a question says ‘may I take part of an item?’ you are in fractional (greedy) versus 0/1 (DP) territory.`,
      bullets: [
        "Activity: sort by finish time, take next compatible. Max count, not max duration.",
        "Fractional knapsack: sort v/w, take fractions. 0/1 cannot.",
        "Huffman: repeatedly merge two lightest nodes in a min-heap.",
        "Greedy needs a proof; 0/1 knapsack is the standard counter-example.",
      ],
      examples: [
        {
          title: "Activity selection by finish time",
          prompt:
            "Activities (start,finish): (1,4), (3,5), (0,6), (5,7), (3,9), (5,9), (6,10), (8,11), (8,12), (2,14), (12,16). Select a maximum set, showing the running last-finish.",
          language: "python",
          code: `acts = [(1,4),(3,5),(0,6),(5,7),(3,9),(5,9),
        (6,10),(8,11),(8,12),(2,14),(12,16)]
acts.sort(key=lambda x: x[1])
chosen, last = [], 0
for s, f in acts:
    if s >= last:
        chosen.append((s, f))
        last = f
print(chosen)`,
          steps: [
            "Sort by finish: (1,4), (3,5), (0,6), (5,7), (3,9), (5,9), (6,10), (8,11), (8,12), (2,14), (12,16).",
            "Take (1,4), last=4. Skip (3,5) (3<4) and (0,6). Take (5,7), last=7.",
            "Skip (3,9),(5,9),(6,10) — all start before 7. Take (8,11), last=11.",
            "Skip (8,12) and (2,14). Take (12,16), last=16.",
            "Chosen four activities: (1,4),(5,7),(8,11),(12,16). Any earliest-start greedy would have taken (0,6) and then been blocked until 6, ending with a smaller or equal set — finish-time is the safe rule.",
          ],
          result:
            "Maximum set {(1,4), (5,7), (8,11), (12,16)} of size 4. Greedy key is finish time, not start and not duration.",
        },
        {
          title: "Fractional knapsack capacity 50",
          prompt:
            "Items (weight, value): (10,60), (20,100), (30,120). W=50. Fractions allowed. Compute the optimum and show the density order.",
          language: "java",
          code: `// density: 60/10=6, 100/20=5, 120/30=4
// take all of item1 (w10, v60), remaining 40
// take all of item2 (w20, v100), remaining 20
// take 20/30 of item3: value 80
// total 60+100+80=240`,
          steps: [
            "Densities 6, 5, 4. Sort items as 1 then 2 then 3.",
            "Take 100% of item 1: value 60, remaining capacity 40.",
            "Take 100% of item 2: value 100, remaining capacity 20.",
            "Item 3 weighs 30>20, so take fraction 20/30. Value added = (20/30)×120 = 80. Capacity 0.",
            "Total 240. Taking the heaviest item first (item 3 whole + item 2 whole = 220) is worse. Taking highest value first without density (item 3 + item 2 + none of 1 = 220) is also worse. Density is the greedy key. If fractions were forbidden the answer would be 160 (items 1+2) via 0/1 DP, not 240.",
          ],
          result:
            "Optimum 240 (all of items 1 and 2, 2/3 of item 3). Greedy by v/w. 0/1 version cannot take the fraction and gets only 160.",
        },
        {
          title: "Huffman tree for A:3 B:2 C:2 D:1",
          prompt:
            "Build the Huffman tree, assign 0 to left / 1 to right, and write the code of each symbol. What is the weighted path length?",
          language: "python",
          code: `import heapq
# heap of (weight, label): D1, B2, C2, A3
# merge D+B -> X3; heap C2, A3, X3
# merge C+A -> Y5; heap X3, Y5
# merge X+Y -> root 8
# codes depend on left/right assignment; weighted length is 16`,
          steps: [
            "Min-heap of weights: D1, B2, C2, A3. Pop D and B (the two lightest; C is tied with B — either pairing is valid). Internal node X=D+B=3. Heap: C2, A3, X3.",
            "Pop C2 and A3 (or C and X; take C and A to follow one concrete tie-break). Internal Y=5. Heap: X3, Y5.",
            "Pop X3 and Y5. Root R=8. Tree: R with children X (weight 3) and Y (weight 5). X has D and B; Y has C and A.",
            "Codes (0=left, 1=right), using X left of R, D left of X, C left of Y: D=00, B=01, C=10, A=11. All length 2 this time because the frequencies are close.",
            "Weighted path length = 3·2 + 2·2 + 2·2 + 1·2 = 16. A fixed 2-bit block code would also cost 16; Huffman never does worse than a block code, and on skewed frequencies (e.g. A:90, B:5, C:5) it wins by giving A a 1-bit code.",
          ],
          result:
            "One valid code: D=00, B=01, C=10, A=11 (shape depends on tie-breaks). Weighted external path length 16. Prefix-free by construction.",
        },
        {
          title: "Greedy 0/1 knapsack counter-example",
          prompt:
            "0/1 knapsack (no fractions), W=5. Items: (w,v) = (3,4), (3,4), (4,5). Density greedy takes the 4/3 items first. What happens? What is the true optimum?",
          language: "cpp",
          code: `// density 4/3 ≈ 1.33, 4/3 ≈ 1.33, 5/4 = 1.25
// greedy takes first (3,4), remaining 2, cannot take anything else, value 4
// true: take the (4,5) only, value 5
// or, if W were 6, two (3,4) items value 8 beat one (4,5)`,
          steps: [
            "Densities: two items at 4/3, one at 5/4. Greedy by density takes a (3,4). Leftover capacity 2 cannot fit another item. Greedy value 4.",
            "The skipped (4,5) fits in W=5 alone and is worth 5. Greedy missed it because it committed to the denser but blocking item.",
            "Fractional knapsack would have taken (3,4) plus 2/4 of the (4,5) for value 4+2.5=6.5 — allowed only when fractions are legal.",
            "Hence 0/1 knapsack is a DP problem (next section), not a greedy one. Coin systems like {1,5,10,25} happen to be canonical so greedy change-making works; {1,3,4} and amount 6 do not (greedy 4+1+1 vs two 3s).",
            "Exam flag: the word ‘fractional’ or ‘cut a gold bar’ → greedy density. The word ‘take or leave the whole item’ → DP table.",
          ],
          result:
            "Density greedy gets 4; true 0/1 optimum is 5 (the single heavier item). Greedy is incorrect for 0/1 knapsack.",
        },
      ],
    },
    {
      heading: "Dynamic programming: 0/1 knapsack, LCS, Fibonacci",
      body: `Dynamic programming solves overlapping subproblems with optimal substructure by storing answers. Two implementation habits: bottom-up tabulation (loops filling an array) and top-down memoised recursion. Time is (number of states)×(work per state). Space can often drop a dimension when the recurrence only needs the previous row.

0/1 knapsack: dp[i][w] = max value using the first i items with capacity w. Recurrence: dp[i][w] = dp[i-1][w] if w_i > w, else max(dp[i-1][w], v_i + dp[i-1][w−w_i]). Time O(nW). This is the table you must fill cell by cell in the exam.

Longest common subsequence (LCS) of strings X[1..m], Y[1..n]: dp[i][j] = dp[i-1][j-1]+1 if X_i=Y_j, else max(dp[i-1][j], dp[i][j-1]). Time O(mn). LCS is not the same as longest common substring (substring forces contiguity and uses a reset-to-zero recurrence).

Fibonacci is the mascot of overlapping subproblems: the naïve tree T(n)=T(n-1)+T(n-2) is Θ(φⁿ); an array of n cells is Θ(n); two rolling variables are Θ(1) space. Matrix exponentiation or fast doubling reaches Θ(log n). The exam uses Fibonacci to ask ‘why DP?’ rather than to ask for F_100.

Other DP cameos: coin change (unbounded knapsack), edit distance, matrix-chain ordering, LIS via patience sorting O(n log n) or DP O(n²). If the greedy choice property fails but subproblems overlap, think DP. If subproblems do not overlap (unique partitions of the input, e.g. merge sort), think divide-and-conquer.`,
      bullets: [
        "0/1 knapsack: dp[i][w] = max(skip, take if it fits). O(nW).",
        "LCS: diagonal +1 on match, else max of left/up. O(mn).",
        "Fibonacci: memo turns exponential into linear (or log with matrices).",
        "Tabulate by increasing subproblem size so that dependencies exist.",
      ],
      examples: [
        {
          title: "Fill a 0/1 knapsack table cell by cell",
          prompt:
            "Items (weight, value): i1=(2,3), i2=(3,4), i3=(4,5). Capacity W=5. Fill dp[i][w] for i=0..3, w=0..5. Then read the optimum and one subset.",
          language: "python",
          code: `w = [0, 2, 3, 4]
v = [0, 3, 4, 5]
n, W = 3, 5
dp = [[0]*(W+1) for _ in range(n+1)]
for i in range(1, n+1):
    for cap in range(W+1):
        dp[i][cap] = dp[i-1][cap]
        if w[i] <= cap:
            dp[i][cap] = max(dp[i][cap], v[i] + dp[i-1][cap-w[i]])
for row in dp:
    print(row)`,
          steps: [
            "Row i=0 (no items) is all zeros. Column w=0 is all zeros. Those are the base cases.",
            "i=1, item (2,3). For cap 0–1 cannot take it, stay 0. For cap 2–5, take it: value 3. Row: [0,0,3,3,3,3].",
            "i=2, item (3,4). cap=2: skip, 3. cap=3: max(skip 3, take 4+dp[1][0]=4)=4. cap=4: max(3, 4+dp[1][1]=4)=4. cap=5: max(3, 4+dp[1][2]=7)=7. Row: [0,0,3,4,4,7].",
            "i=3, item (4,5). cap=3: cannot take, 4. cap=4: max(4, 5+dp[2][0]=5)=5. cap=5: max(7, 5+dp[2][1]=5)=7. Row: [0,0,3,4,5,7].",
            "Optimum dp[3][5]=7. Reconstruct: 7 came from skipping item 3 (because take would be 5). 7 at i=2,w=5 came from taking item 2 (4+dp[1][2]=7). dp[1][2]=3 took item 1. Subset {i1,i2} weights 5 values 7.",
          ],
          result:
            "Table rows: [0,0,0,0,0,0], [0,0,3,3,3,3], [0,0,3,4,4,7], [0,0,3,4,5,7]. Optimum 7 from items 1 and 2.",
        },
        {
          title: "LCS of AGGTAB and GXTXAYB",
          prompt:
            "Compute the LCS length table for X=AGGTAB, Y=GXTXAYB. Then backtrack one LCS string.",
          language: "java",
          code: `// X indexed 1..6  A G G T A B
// Y indexed 1..7  G X T X A Y B
// match at (1,5)=A, (2,1)=G, (3,1) not used twice, (4,3)=T,
// (5,5)=A already used as i=1? backtrack handles uniqueness
// standard result LCS = GTAB length 4`,
          steps: [
            "Write a 7×8 table (including empty prefixes). First row and column are 0.",
            "X1=A against Y: no match until Y5=A, so dp[1][5]=1 and stays 1 through Y6,Y7.",
            "X2=G matches Y1=G: dp[2][1]=1. Later Y’s copy the running max. X3=G may match Y1 again but the diagonal from dp[2][0] would also give 1; the second G of X matches nothing new until combinations with later letters.",
            "Continue: T of X matches T of Y, A of X matches A of Y, B of X matches B of Y. Bottom-right dp[6][7]=4.",
            "Backtrack from (6,7): B matches B → include B, go (5,6). A matches A → include A, go (4,4). T matches T → include T, go (3,2). G matches G → include G, go (2,0). String backwards BAG T G → GTAB.",
          ],
          result: "LCS length 4, one LCS is GTAB. (GTAB is the usual textbook reconstruction for this pair.)",
        },
        {
          title: "Fibonacci: recursion tree versus DP",
          prompt:
            "How many additions does naïve recFib(5) perform? Show the call tree. Then fill a bottom-up array F[0..5]. Contrast the complexities.",
          language: "python",
          code: `def rec(n, calls):
    calls[0] += 1
    if n <= 1:
        return n
    return rec(n-1, calls) + rec(n-2, calls)
def dp(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a+b
    return a
c = [0]
print(rec(5, c), "calls", c[0], "dp", dp(5))`,
          steps: [
            "rec(5) calls rec(4) and rec(3). rec(4) calls rec(3) and rec(2). The two rec(3) subtrees are identical — overlapping subproblems.",
            "Full tree: F5 / \\ F4 F3; F4 / \\ F3 F2; each F3 / \\ F2 F1; each F2 / \\ F1 F0. Count of leaves is F6=8; number of addition nodes is F6−1=7. Number of calls is 15 for n=5 (the closed form is 2F_{n+1}−1).",
            "Bottom-up: F0=0, F1=1, F2=1, F3=2, F4=3, F5=5. Five additions with two rolling variables.",
            "Naïve time Θ(φⁿ), DP time Θ(n), matrix exponentiation Θ(log n). Space Θ(n) for the array or Θ(1) rolling or Θ(log n) recursion with memo on the way down.",
            "Exam sentence: ‘Fibonacci has optimal substructure and overlapping subproblems, so DP applies; merge sort has optimal substructure without overlapping subproblems, so D&C applies.’",
          ],
          result:
            "F(5)=5. Naïve recFib(5) explodes into 15 calls / 7 additions. DP computes it in 5 additions. Overlaps are why we store F[3] once.",
        },
        {
          title: "Unbounded coin change versus 0/1",
          prompt:
            "Coins {1,3,4}, amount 6. 0/1 (each coin once) versus unbounded (unlimited supply). What are the optima? Which table?",
          language: "cpp",
          code: `// unbounded min coins: dp[x] = min over c of 1+dp[x-c]
// dp[0]=0, dp[1]=1, dp[2]=2, dp[3]=1, dp[4]=1, dp[5]=2, dp[6]=2 (3+3)
// greedy 4+1+1 = 3 coins, worse than two 3s
// 0/1 with one of each {1,3,4}: no subset sums to 6
// unbounded reuses dp[x-c] in the SAME row; 0/1 uses the previous row`,
          steps: [
            "Unbounded: any coin may be reused. dp[x] = min(1+dp[x−c]) over coins c≤x. Fill: 0→0, 1→1, 2→2, 3→1 (one 3), 4→1 (one 4), 5→2 (4+1 or 3+1+1), 6→2 (3+3). Optimum 2 coins.",
            "Greedy ‘always largest’ would take 4 then 1 then 1 = 3 coins, which is worse. Canonical-coin greedy is not universal.",
            "0/1 with exactly the set {1,3,4} each once: subsets that sum to 6 do not exist (1+3+4=8, 3+4=7, 4+1=5, 3+1=4). Optimum is ‘impossible’.",
            "The unbounded table reuses dp[x−c] from the same row (the coin type is still available). The 0/1 table uses the previous row dp[i−1][w−w_i] so each item is consumed.",
            "That row-index distinction is the entire difference between 0/1 knapsack and unbounded knapsack / coin change. Mixing them is a common coding bug and a common MCQ trap.",
          ],
          result:
            "Unbounded {1,3,4} for 6: 2 coins (3+3). Greedy 4+1+1 loses. 0/1 with one of each cannot make 6. Unbounded DP reuses the same row; 0/1 uses the previous row.",
        },
      ],
    },
    {
      heading: "Divide-and-conquer, backtracking, and the KMP prefix table",
      body: `Divide-and-conquer splits a problem into independent subproblems, solves them recursively, and combines the answers. Master theorem: T(n)=a T(n/b)+O(n^k) compares log_b a with k. Merge sort is a=2,b=2,k=1 → Θ(n log n). Binary search is a=1,b=2,k=0 → Θ(log n). Strassen beats O(n³) matrix multiply. The subproblems do not overlap; if they did, you would memoize and call it DP.

Backtracking is depth-first search in a state space with undo. At each node you try a choice, recurse, then un-choose. Pruning cuts a branch when a partial assignment cannot extend to a solution (N-queens attacking, subset sum exceeding the target). Time is still exponential in the worst case; pruning only changes the base. Exam guests: N-queens, subset sum, Hamiltonian path, Sudoku, generating permutations.

KMP (Knuth–Morris–Pratt) searches for a pattern P of length m inside a text T of length n in O(n+m). The prefix table (LPS, longest proper prefix that is also a suffix) lps[i] is the longest proper prefix of P[0..i] that is also a suffix of P[0..i]. Building LPS is itself a linear scan that looks a lot like the search. During search, a mismatch at P[j] jumps j back to lps[j-1] instead of restarting, so each text character is consumed at most a constant number of times.

LPS of "AAAA" is [0,1,2,3]: each longer run of A’s is a prefix-suffix. LPS of "ABCDE" is all zeros: no proper prefix matches a suffix. LPS of "ABABC" is [0,0,1,2,0]. Computing this array by hand is a standard 2-mark dry-run.

Never confuse KMP with naïve O(nm) sliding, with Rabin–Karp hashing, or with Z-algorithm (which computes an explicit Z-box array). For SEBI, being able to fill LPS and then simulate one mismatch jump is enough.`,
      bullets: [
        "D&C: independent subproblems + combine. Master theorem for the recurrence.",
        "Backtracking: DFS + undo + prune. N-queens / subset sum.",
        "KMP O(n+m) via LPS; mismatch jumps to lps[j-1], never rewinds the text index except by the jump.",
        "lps[i] = longest proper prefix-suffix of P[0..i].",
      ],
      examples: [
        {
          title: "Master theorem on three recurrences",
          prompt:
            "State the Θ bound: (i) T(n)=2T(n/2)+n  (merge sort)  (ii) T(n)=T(n/2)+1  (binary search)  (iii) T(n)=4T(n/2)+n  (a naïve 4-submatrix multiply combine).",
          language: "python",
          code: `# T(n) = a T(n/b) + O(n^k)
# compare log_b(a)  ?  k
# (i) a=2 b=2 k=1, log2 2 = 1 = k  -> Theta(n^k log n) = Theta(n log n)
# (ii) a=1 b=2 k=0, log2 1 = 0 = k  -> Theta(log n)
# (iii) a=4 b=2 k=1, log2 4 = 2 > 1 -> Theta(n^{log_b a}) = Theta(n^2)`,
          steps: [
            "Write each recurrence as a, b, k. Merge sort copies n work to combine two halves: a=2, b=2, k=1.",
            "Case 2 of the master theorem (log_b a = k) multiplies by an extra log n, giving Θ(n log n).",
            "Binary search: one subproblem of half size, constant compare: a=1, b=2, k=0, also case 2, Θ(log n).",
            "Four half-size matrices plus linear combine: log₂ 4 = 2 > 1, case 1, Θ(n²). Strassen reduces a from 8 (classical) toward 7; the point is that a controls the exponent.",
            "If the combine cost had been n² with a=2,b=2 (k=2>1), the root work would dominate: Θ(n²). Always compare the exponent of the work at the root with the exponent of the leaf-work log_b a.",
          ],
          result:
            "(i) Θ(n log n)  (ii) Θ(log n)  (iii) Θ(n²). Master theorem case depends on log_b a versus k.",
        },
        {
          title: "Backtracking subset-sum of 9 from {2,3,5,7}",
          prompt:
            "Decide whether a subset sums to 9. Trace the DFS that tries ‘take then skip’ in index order, pruning when the running sum exceeds 9.",
          language: "java",
          code: `int[] a = {2,3,5,7};
boolean rec(int i, int left) {
    if (left == 0) return true;
    if (i == a.length || left < 0) return false;
    return rec(i+1, left - a[i]) || rec(i+1, left);
}`,
          steps: [
            "Start (i=0, left=9). Take 2 → (1,7). Take 3 → (2,4). Take 5 → (3,−1) prune. Skip 5 → (3,4). Take 7? 4-7<0 prune. Skip 7 → fail this branch.",
            "Back to (1,7), skip 3 → (2,7). Take 5 → (3,2). 7 does not fit; skip 7 fail. Skip 5 → (3,7). Take 7 → (4,0) success. Subset {2,7}.",
            "Once left=0 the search may return true. The only subset of {2,3,5,7} that sums to 9 is {2,7}: 2+3+5=10, 3+7=10, 5+7=12, 3+5=8, and 9 is not in the set.",
            "Pruning on left<0 stops the 2+3+5 branch after adding 5. Without prune we would still fail at the leaves, just later.",
            "N-queens is the same template: try a column in the next row, prune on column/diagonal attack, undo the placement. Exponential, but the picture is DFS+undo.",
          ],
          result:
            "Yes, subset {2,7} sums to 9. The take-branch 2 then skip 3 then skip 5 then take 7 hits left=0. 2+3+5 is pruned at −1.",
        },
        {
          title: "Compute the LPS / prefix table for ABABCABAA",
          prompt:
            "Pattern P = ABABCABAA (length 9). Fill lps[0..8] using the standard KMP π construction (len = lps[i-1], walk back on mismatch).",
          language: "python",
          code: `p = "ABABCABAA"
n = len(p)
lps = [0]*n
length = 0
i = 1
while i < n:
    if p[i] == p[length]:
        length += 1
        lps[i] = length
        i += 1
    elif length != 0:
        length = lps[length-1]
    else:
        lps[i] = 0
        i += 1
print(lps)`,
          steps: [
            "lps[0]=0 always (proper prefix of a single char is empty). i=1, length=0. P[1]=B ≠ P[0]=A, length is already 0, so lps[1]=0.",
            "i=2, P[2]=A = P[0]=A, length←1, lps[2]=1. i=3, P[3]=B = P[1]=B, length←2, lps[3]=2.",
            "i=4, P[4]=C ≠ P[2]=A. length≠0 so length←lps[1]=0. Now P[4]=C ≠ P[0]=A, so lps[4]=0.",
            "i=5, P[5]=A = P[0], length←1, lps[5]=1. i=6, P[6]=B = P[1], length←2, lps[6]=2. i=7, P[7]=A = P[2], length←3, lps[7]=3.",
            "i=8, P[8]=A ≠ P[3]=B. length←lps[2]=1. Now P[8]=A = P[1]? P[1]=B, no. length←lps[0]=0. Now P[8]=A = P[0]=A, length←1, lps[8]=1.",
          ],
          result: "LPS(ABABCABAA) = [0, 0, 1, 2, 0, 1, 2, 3, 1].",
        },
        {
          title: "KMP search: one mismatch jump using LPS",
          prompt:
            "Text T = ABABABCABAA, pattern P = ABABCABAA with the LPS just computed [0,0,1,2,0,1,2,3,1]. Simulate the i (text) and j (pattern) pointers through the first mismatch and the jump.",
          language: "cpp",
          code: `string t = "ABABABCABAA", p = "ABABCABAA";
int lps[] = {0,0,1,2,0,1,2,3,1};
int i = 0, j = 0;
while (i < (int)t.size()) {
    if (t[i] == p[j]) { i++; j++;
        if (j == (int)p.size()) { /* hit at i-j */ j = lps[j-1]; }
    } else if (j) j = lps[j-1];
      else i++;
}`,
          steps: [
            "T = ABABABCABAA. Match P’s first four chars ABAB (i and j advance to 4). P[4] expects C but T[4]=A, so this is the first mismatch.",
            "Instead of sliding the pattern by 1 (naïve), set j = lps[3] = 2. LPS said the prefix AB (length 2) is already a suffix of the matched ABAB, so we keep i at 4 and only rewind the pattern to index 2.",
            "Now compare T[4]=A with P[2]=A — match. Then T[5]=B with P[3]=B — match. T[6]=C with P[4]=C — match. Continue matching A,B,A,A against P[5..8].",
            "j reaches 9 at i=11, occurrence starts at i-j = 2. (Check: T[2..10]=ABABCABAA, yes.)",
            "Naïve would have reset i back as well and re-compared characters already known to match the prefix. KMP’s i never decreases; that is why it is O(n+m).",
          ],
          result:
            "First mismatch at (i,j)=(4,4). Jump j←lps[3]=2, i stays 4. Then the pattern locks in and matches at start index 2. LPS avoided rechecking the ‘AB’ prefix.",
        },
      ],
    },
  ],
};
