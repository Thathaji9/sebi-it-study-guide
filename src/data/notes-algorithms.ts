import type { TopicNote } from "@/data/notes";

export const notesAlgorithms: TopicNote = {
  topic: "algorithms",
  title: "Algorithms — techniques (beginner)",
  blurb:
    "BFS uses a queue and walks level by level. DFS uses a stack (or recursion) and walks deep first. Merge sort always takes n log n. Dijkstra needs non-negative weights; Bellman-Ford allows negatives and can spot a negative cycle. Greedy takes a local best; DP fills a table when greedy lies. KMP uses a prefix table so the text pointer never walks backwards.",
  blocks: [
    {
      heading: "BFS — queue, level by level",
      body: "Breadth-first search uses a FIFO queue. Start at s. Visit every neighbour of s, then every vertex two edges away, and so on. On an unweighted graph, the first time BFS reaches a vertex is a shortest path in number of edges. Time is O(V+E) with an adjacency list.\n\nWrite the queue after every dequeue. Neighbour order matters. If the lists are sorted, the trace is unique. Mark visited when you enqueue, so each vertex enters the queue once.",
      howTo: [
        "Put the start vertex in a queue. Mark it visited.",
        "Dequeue the front. That is the next vertex you ‘process’.",
        "Enqueue each unseen neighbour at the rear (in the given list order). Mark them visited as you enqueue.",
        "Write the queue after every step. Distances equal the BFS level.",
      ],
      bullets: [
        "BFS: FIFO queue, level order, unweighted shortest path, O(V+E).",
        "Mark visited when you enqueue, not when you dequeue.",
        "State the neighbour order before you trace.",
      ],
      examples: [
        {
          title: "Queue snapshots on a tiny graph",
          prompt:
            "Undirected graph, lists sorted: A:[B,C] B:[A,D,E] C:[A,F] D:[B] E:[B] F:[C]. Start BFS at A. What is the visit order, and the queue after each dequeue starts?",
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
seen = {"A"}
q = deque(["A"])
order = []
while q:
    u = q.popleft()
    order.append(u)
    for v in g[u]:
        if v not in seen:
            seen.add(v)
            q.append(v)
print(order)`,
          steps: [
            {
              do: "Start: visited={A}, queue=[A].",
              why: "BFS begins with the source in a FIFO queue.",
            },
            {
              do: "Dequeue A. Enqueue unseen neighbours B then C. After this step the queue is B, C. Visit order: A.",
              why: "New vertices join the rear. Sorted lists give B before C.",
            },
            {
              do: "Dequeue B. A is seen. Enqueue D, E. After this step the queue is C, D, E. Visit order: A, B.",
              why: "A is not enqueued again. Visited-on-enqueue keeps each vertex once.",
            },
            {
              do: "Dequeue C. Enqueue F. After this step the queue is D, E, F. Then D, E, F each dequeue with no new vertices. Visit order A, B, C, D, E, F.",
              why: "B and C were the level-1 vertices. D, E, F are level 2.",
            },
          ],
          result: "Visit order A, B, C, D, E, F. Queue: [A] → [B,C] → [C,D,E] → [D,E,F] → [E,F] → [F] → [].",
        },
        {
          title: "Unweighted shortest path is the BFS level",
          prompt:
            "Same graph. Distances from A? Why is the first time we reach F a shortest path?",
          language: "python",
          code: `from collections import deque
g = {"A":["B","C"],"B":["A","D","E"],"C":["A","F"],"D":["B"],"E":["B"],"F":["C"]}
dist = {"A": 0}
q = deque(["A"])
while q:
    u = q.popleft()
    for v in g[u]:
        if v not in dist:
            dist[v] = dist[u] + 1
            q.append(v)
print(dist)`,
          steps: [
            {
              do: "A is distance 0. After expanding A, B and C get dist 1.",
              why: "Each edge in an unweighted graph adds 1 to the parent’s distance.",
            },
            {
              do: "After expanding B and C, D, E, F get dist 2.",
              why: "They are neighbours of level-1 vertices, so they sit on level 2.",
            },
            {
              do: "F is first seen from C. dist[F]=2. No later edge can beat 2, because BFS would have found a shorter path earlier.",
              why: "On unweighted graphs, the first time BFS reaches a vertex the distance is final.",
            },
            {
              do: "Printed distances: A0 B1 C1 D2 E2 F2.",
              why: "That layering is the whole point of the queue.",
            },
          ],
          result: "A=0, B=1, C=1, D=2, E=2, F=2. First reach = fewest edges.",
        },
        {
          title: "Queue after visiting B — exam wording",
          prompt:
            "Undirected A—B, A—C, B—D. Neighbours alphabetical. Start BFS at A. What is in the queue just after B is dequeued?",
          language: "java",
          code: `// A: B, C
// B: A, D
// C: A
// D: B
// start queue [A]
// pop A, enqueue B, C  -> [B, C]
// pop B, enqueue D     -> [C, D]`,
          steps: [
            {
              do: "After start the queue is A.",
              why: "One source.",
            },
            {
              do: "Dequeue A. Enqueue B then C. After A the queue is B, C.",
              why: "Alphabetical neighbours: B before C.",
            },
            {
              do: "Dequeue B. A is already visited. Enqueue D. After B the queue is C, D.",
              why: "The question asks for the queue just after B is processed, not the visit order.",
            },
            {
              do: "Answer [C, D]. C is still waiting from A’s expansion.",
              why: "FIFO: C was enqueued before D, so C is still at the front.",
            },
          ],
          result: "Queue after B is dequeued: [C, D].",
        },
      ],
    },
    {
      heading: "DFS — stack / recursion, deep first",
      body: "Depth-first search dives down one branch before it backtracks. Recursion is a stack. An explicit LIFO stack does the same job. DFS does not give unweighted shortest paths. It is the usual tool for cycles, topological sort on a DAG, and maze walking.\n\nWrite the call stack (or the explicit stack) after every push and pop. On undirected graphs, mark visited or you bounce on a two-way edge. Discovery order is ‘when I first mark the vertex’, not ‘when I return’.",
      howTo: [
        "Start at s. Mark s. Walk its first unseen neighbour, then that vertex’s first unseen neighbour, and so on.",
        "When a vertex has no unseen neighbour, pop (return) and try the next neighbour of the vertex below.",
        "Write the stack of live calls. Discovery order is the order you mark vertices.",
        "Do not use DFS distances as shortest paths on an unweighted graph.",
      ],
      bullets: [
        "DFS: LIFO / recursion, not shortest, cycle + topology.",
        "Discovery order ≠ BFS visit order on the same graph.",
        "A back-edge to a grey ancestor is a directed cycle.",
      ],
      examples: [
        {
          title: "Recursive DFS on the BFS graph",
          prompt:
            "Same lists as the BFS example. Recursive DFS from A, neighbours sorted. Discovery order?",
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
print(order)`,
          steps: [
            {
              do: "dfs(A) marks A. First unseen neighbour is B. Stack of calls: A → B.",
              why: "DFS takes the first neighbour immediately, not the whole level.",
            },
            {
              do: "dfs(B): A is seen, D is not. Recurse D. Stack: A → B → D. D’s only neighbour B is seen, so D returns. Discovery so far: A, B, D.",
              why: "A dead-end pops. That is backtracking.",
            },
            {
              do: "Back in B, next neighbour E. Recurse E, then E returns. Discovery: A, B, D, E. Then B returns.",
              why: "The whole B-branch finishes before A looks at C.",
            },
            {
              do: "dfs(C), then dfs(F). Discovery order A, B, D, E, C, F.",
              why: "This is not A, B, C, D, E, F. That was BFS.",
            },
          ],
          result: "DFS discovery A, B, D, E, C, F.",
        },
        {
          title: "Explicit stack after expanding A",
          prompt:
            "Graph A→B, A→C, B→D. Neighbours alphabetical. Iterative DFS pushes neighbours right-to-left so B is popped first. Stack after expanding A?",
          language: "python",
          code: `g = {"A": ["B", "C"], "B": ["D"], "C": [], "D": []}
st = ["A"]
u = st.pop()
for v in reversed(g[u]):
    st.append(v)
print(st)  # B on top`,
          steps: [
            {
              do: "Start stack [A]. Pop A.",
              why: "The stack holds vertices still to visit.",
            },
            {
              do: "Push C then B (reversed alphabetical). After expanding A the stack is C, B with B on top.",
              why: "Pushing right-to-left matches recursive DFS that tries B first.",
            },
            {
              do: "Next pop is B, then push D. Stack becomes C, D.",
              why: "Deep into B’s branch before C — that is DFS.",
            },
            {
              do: "BFS would have had queue [B, C] after expanding A. Same neighbours, other end.",
              why: "Queue vs stack is the whole contrast.",
            },
          ],
          result: "After expanding A, DFS stack [C, B] (B on top). BFS queue would be [B, C].",
        },
        {
          title: "DFS is not a shortest-path algorithm",
          prompt:
            "Undirected unweighted: S—A—B—T and also S—T. Path S-T is 1 edge; S-A-B-T is 3. What can DFS report for dist(T) if A is listed before T?",
          language: "cpp",
          code: `// edges: S-A, A-B, B-T, S-T
// DFS adjacency S: A, T
// recurse S -> A -> B -> T  records length 3
// the later edge S-T is ignored if T is already seen`,
          steps: [
            {
              do: "If DFS from S takes A first, the stack goes S → A → B → T. That path has 3 edges.",
              why: "DFS has no ‘first reach is shortest’ rule.",
            },
            {
              do: "T is marked. The later neighbour T of S is skipped as already seen.",
              why: "Visited means ‘do not re-enter’, not ‘relax a better distance’.",
            },
            {
              do: "BFS from S would dequeue S and see T at distance 1 immediately.",
              why: "The queue processes all edges out of S before going deeper.",
            },
            {
              do: "Exam pick for fewest hops: BFS. DFS may report 3 on this graph.",
              why: "Wrong ADT, wrong invariant.",
            },
          ],
          result: "DFS may record dist(T)=3. BFS records 1. Use BFS for unweighted shortest paths.",
        },
      ],
    },
    {
      heading: "Merge sort — always n log n",
      body: "Merge sort splits the array in half, sorts each half, then merges two sorted runs. The merge walks both runs once, always taking the smaller head. Recurrence T(n)=2T(n/2)+Θ(n) solves to Θ(n log n) in every case — best, average, and worst.\n\nThe split tree has about log₂ n levels. Each level copies n items. That is why the cost is n log n. Merge with ≤ (not <) is stable: equal keys keep their original order. Extra memory is Θ(n) for the merge buffer.",
      howTo: [
        "Split in half until every piece has one element (a singleton is sorted).",
        "Merge two sorted runs: compare heads, take the smaller, advance that run.",
        "Count levels: log₂ n splits. Work per level: n copies. Total n log n.",
        "If two heads are equal, take the left one first (stability).",
      ],
      bullets: [
        "Always Θ(n log n). Stable. Extra Θ(n) memory.",
        "Not in-place (usual textbook merge).",
        "Quick sort’s worst case is n²; merge sort does not have that trap.",
      ],
      examples: [
        {
          title: "Split and merge [38, 27, 43, 3]",
          prompt:
            "Show every split and every merge. Left half is floor(n/2).",
          language: "python",
          code: `def merge(L, R):
    i = j = 0
    out = []
    while i < len(L) and j < len(R):
        if L[i] <= R[j]:
            out.append(L[i]); i += 1
        else:
            out.append(R[j]); j += 1
    return out + L[i:] + R[j:]
def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    return merge(merge_sort(a[:mid]), merge_sort(a[mid:]))
print(merge_sort([38, 27, 43, 3]))`,
          steps: [
            {
              do: "Split [38, 27, 43, 3] at mid=2 → [38, 27] | [43, 3].",
              why: "Each half is a new subproblem of size n/2.",
            },
            {
              do: "Split left to [38] and [27]. Merge: 27≤38 so [27, 38]. Split right to [43] and [3]. Merge: [3, 43].",
              why: "Singletons are already sorted. Merge is the only work.",
            },
            {
              do: "Merge [27, 38] with [3, 43]: take 3, then 27, then 38, then leftover 43. Result [3, 27, 38, 43].",
              why: "Each take compares the two current heads and advances one run.",
            },
            {
              do: "Two split levels, 4 copies of work per level. 4 × 2 = 8, which matches n log₂ n = 4×2.",
              why: "That counting is the n log n story on a tiny array.",
            },
          ],
          result: "[3, 27, 38, 43]. Splits: [38,27]|[43,3] → singletons. Merges: [27,38], [3,43], then the full list.",
        },
        {
          title: "Why the cost is n log n, not n²",
          prompt:
            "n=8. How many levels? How much work per level? Total?",
          language: "python",
          code: `# n = 8
# level 0: one array of 8, split
# level 1: two arrays of 4
# level 2: four arrays of 2
# level 3: eight arrays of 1   -> log2(8) = 3 split levels
# each merge level copies 8 items
# total Theta(8 * 3) = Theta(n log n)`,
          steps: [
            {
              do: "n=8. Number of times you can halve until 1 is log₂ 8 = 3.",
              why: "The recursion depth of even splits is log n.",
            },
            {
              do: "At every level the pieces together still hold 8 numbers. Merging them copies 8 items.",
              why: "Work per level is Θ(n), not Θ(n²).",
            },
            {
              do: "3 levels × 8 copies = 24 = n log n.",
              why: "Master theorem: a=2, b=2, combine n¹, log_b a = k, so n log n.",
            },
            {
              do: "A reversed array does not add levels. Worst case is still n log n.",
              why: "Unlike insertion sort, merge sort does not become n² on reversed input.",
            },
          ],
          result: "3 levels, Θ(n) work each, total Θ(n log n) even in the worst case.",
        },
        {
          title: "Stable merge: equal keys keep left-first order",
          prompt:
            "Merge [2a, 4] with [2b, 3] using <=. What is the output order of 2a and 2b?",
          language: "java",
          code: `// L = [2a, 4]   R = [2b, 3]
// heads 2a vs 2b: 2a <= 2b, take 2a
// heads 4 vs 2b:  4 > 2b,  take 2b
// heads 4 vs 3:   4 > 3,   take 3
// leftover 4
// out = [2a, 2b, 3, 4]`,
          steps: [
            {
              do: "Heads 2a and 2b. 2a <= 2b, so take 2a. After this take the output is 2a.",
              why: "Using <= (not <) prefers the left run on a tie. That is stability.",
            },
            {
              do: "Heads 4 and 2b. 4 > 2b, take 2b. After this take the output is 2a, 2b.",
              why: "2b came from the right run and keeps its place after 2a.",
            },
            {
              do: "Heads 4 and 3. Take 3, then leftover 4. Output [2a, 2b, 3, 4].",
              why: "Equal keys did not swap order. Merge sort is stable.",
            },
            {
              do: "If the merge had used <, a tie would take the right key first and break stability.",
              why: "The comparison on equals is the whole stability trick.",
            },
          ],
          result: "[2a, 2b, 3, 4]. Left equal key stays first. Merge sort is stable.",
        },
      ],
    },
    {
      heading: "Dijkstra vs Bellman-Ford",
      body: "Dijkstra finds shortest paths from one source when every edge weight is ≥ 0. It always settles the unsettled vertex with the smallest tentative distance, then relaxes its outgoing edges. With a heap this is O((V+E) log V). Once a vertex is settled, its distance is final — that proof needs non-negative weights.\n\nBellman-Ford also starts from one source but allows negative weights. It relaxes every edge |V|-1 times. One extra round that still improves a distance proves a negative cycle you can reach from the source. Time O(VE). Unweighted graphs are BFS, not these two. All-pairs with possible negatives is Floyd-Warshall.",
      howTo: [
        "Check weights. Any negative edge → do not use Dijkstra. Use Bellman-Ford (or Floyd if all pairs).",
        "Dijkstra: write tentatives. Repeatedly settle the smallest unsettled vertex. Relax its edges.",
        "Bellman-Ford: repeat |V|-1 full passes over every edge. Relax u→v if dist[u]+w < dist[v].",
        "One extra Bellman-Ford pass. If any edge still relaxes, report a negative cycle.",
      ],
      bullets: [
        "Dijkstra: non-negative, greedy settle, heap O((V+E) log V).",
        "Bellman-Ford: negatives OK, |V|-1 rounds, extra round = cycle test, O(VE).",
        "A negative edge with no negative cycle still breaks Dijkstra.",
      ],
      examples: [
        {
          title: "Dijkstra dry-run, all weights positive",
          prompt:
            "Directed: A→B 4, A→C 2, C→B 1, B→D 5, C→D 8, A→D 10. Shortest paths from A.",
          language: "python",
          code: `import heapq
w = {("A","B"):4,("A","C"):2,("C","B"):1,("B","D"):5,("C","D"):8,("A","D"):10}
g = {"A":["B","C","D"], "B":["D"], "C":["B","D"], "D":[]}
dist = {v: float("inf") for v in g}
dist["A"] = 0
pq = [(0, "A")]
settled = []
while pq:
    d, u = heapq.heappop(pq)
    if d != dist[u]:
        continue
    settled.append(u)
    for v in g[u]:
        nd = d + w[(u, v)]
        if nd < dist[v]:
            dist[v] = nd
            heapq.heappush(pq, (nd, v))
print(settled, dist)`,
          steps: [
            {
              do: "Init A=0, B=C=D=∞. Settle A. Relax B←4, C←2, D←10. Tentatives: C=2, B=4, D=10.",
              why: "Dijkstra starts by relaxing the source’s outgoing edges.",
            },
            {
              do: "Smallest tentative is C=2. Settle C. B via C: 2+1=3 < 4, so B←3. D via C: 2+8=10, D stays 10.",
              why: "Always settle the unsettled vertex with the smallest distance.",
            },
            {
              do: "Settle B=3. D via B: 3+5=8 < 10, so D←8. Then settle D=8.",
              why: "A later cheaper path to D is allowed until D is settled. All remaining weights are ≥ 0, so 8 is final.",
            },
            {
              do: "dist A=0, C=2, B=3, D=8. Path A-C-B-D. Settlement order A, C, B, D.",
              why: "A→D weight 10 and C→D weight 8 are not used in the final tree.",
            },
          ],
          result: "A=0, C=2, B=3, D=8. Order settled: A, C, B, D.",
        },
        {
          title: "Dijkstra fails on a negative edge",
          prompt:
            "Directed: S→B 1, S→A 2, A→B −10. True S-B is −8 via A. What does Dijkstra report?",
          language: "java",
          code: `// settle S: B←1, A←2
// smallest unsettled is B=1; settle B forever
// settle A; 2+(-10)=-8 would improve B, but standard Dijkstra does not reopen B
// reports dist(B)=1, which is wrong`,
          steps: [
            {
              do: "True path S-A-B costs 2+(−10)=−8.",
              why: "Negative edges can make a longer hop-count cheaper.",
            },
            {
              do: "Dijkstra from S sets B←1 and A←2. Smallest unsettled is B at 1, so B is settled.",
              why: "The greedy settle step thinks 1 is done.",
            },
            {
              do: "A is settled next. Relaxation 2-10=−8 wants to improve B, but a settled vertex is not reopened.",
              why: "The proof that settled distances are optimal used ‘remaining edges ≥ 0’, which is false here.",
            },
            {
              do: "Dijkstra reports dist(B)=1. Wrong. Bellman-Ford would get −8.",
              why: "Any negative weight → Bellman-Ford (or Floyd), not Dijkstra.",
            },
          ],
          result: "Dijkstra reports 1 for B and misses S-A-B. Use Bellman-Ford when a weight is negative.",
        },
        {
          title: "Bellman-Ford rounds and a cycle test",
          prompt:
            "Directed: A→B 4, A→C 5, B→C −3, C→D 4, B→D 10. Source A, |V|=4 so 3 rounds. Final dist? Negative cycle?",
          language: "python",
          code: `edges = [("A","B",4),("A","C",5),("B","C",-3),("C","D",4),("B","D",10)]
dist = {"A":0,"B":10**9,"C":10**9,"D":10**9}
for _ in range(3):
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            dist[v] = dist[u] + w
print(dist)
# 4th round: any update => negative cycle`,
          steps: [
            {
              do: "Round 1, listed order: B←4, C←5, then C via B: 4-3=1 so C←1, D via C: 1+4=5. After round 1: A0 B4 C1 D5.",
              why: "Each relaxation is ‘if a known path to u plus the edge beats dist[v], take it’.",
            },
            {
              do: "Rounds 2 and 3 do not change the table. |V|-1 rounds are enough for a shortest simple path.",
              why: "A simple path has at most |V|-1 edges, so |V|-1 passes suffice when there is no negative cycle.",
            },
            {
              do: "Extra 4th round: no edge improves. No negative cycle reachable from A.",
              why: "A still-improving extra pass is the negative-cycle alarm.",
            },
            {
              do: "Final A=0, B=4, C=1, D=5 (path A-B-C-D). Dijkstra would also work here, but B→C is negative so the safe named algorithm is Bellman-Ford.",
              why: "Exam: negative edge in the picture → Bellman-Ford even if a cycle is absent.",
            },
          ],
          result: "A=0, B=4, C=1, D=5. No negative cycle. Bellman-Ford is the safe choice because of B→C.",
        },
      ],
    },
    {
      heading: "Greedy vs DP",
      body: "A greedy algorithm takes the locally best choice and never undoes it. It is correct only when a proof says so. Activity selection (earliest finish) and fractional knapsack (best value per weight) are greedy. 0/1 knapsack, LCS, and many coin systems are not.\n\nDynamic programming stores answers to overlapping subproblems. 0/1 knapsack fills dp[i][w]. If the question lets you cut an item, greedy density works. If you must take or leave the whole item, fill a DP table. Greedy does not mean ‘sort and take largest’.",
      howTo: [
        "Ask: can I take a fraction / a cut of an item? Yes → greedy density. No → 0/1 DP.",
        "Ask: does a local best stay safe? If a small counter-example beats greedy, switch to DP.",
        "Greedy: sort by the right key, then scan once (finish time, v/w, lightest Huffman nodes).",
        "DP: name the state (i, w) or (i, j), write the recurrence, fill by increasing size.",
      ],
      bullets: [
        "Fractional knapsack: greedy v/w. 0/1 knapsack: DP O(nW).",
        "Activity selection: sort by finish time, take next compatible.",
        "If greedy fails a 3-item example, do not force it. Use DP.",
      ],
      examples: [
        {
          title: "Fractional knapsack — greedy by density",
          prompt:
            "Items (weight, value): (10,60), (20,100), (30,120). W=50. Fractions allowed. Optimum?",
          language: "java",
          code: `// density 60/10=6, 100/20=5, 120/30=4
// take all of item1 (v60), remaining 40
// take all of item2 (v100), remaining 20
// take 20/30 of item3: value 80
// total 240`,
          steps: [
            {
              do: "Densities 6, 5, 4. Sort items 1, then 2, then 3.",
              why: "Fractional knapsack’s greedy key is value per weight, not raw value.",
            },
            {
              do: "Take all of item 1: value 60, remaining 40. Take all of item 2: value 100, remaining 20.",
              why: "Whole items that fit and have the best remaining density are taken fully.",
            },
            {
              do: "Item 3 weighs 30>20, so take 20/30. Value added = 80. Total 240.",
              why: "A fraction of the next item fills the leftover capacity.",
            },
            {
              do: "If fractions were forbidden this 240 would be illegal. 0/1 would need a DP table (items 1+2 = 160).",
              why: "The word ‘fractional’ picks greedy. The word ‘whole item’ picks DP.",
            },
          ],
          result: "240 (all of 1 and 2, two-thirds of 3). Greedy by v/w.",
        },
        {
          title: "0/1 knapsack — greedy fails, DP works",
          prompt:
            "No fractions, W=5. Items (w,v)=(3,4), (3,4), (4,5). Density greedy vs true optimum vs DP cell dp[3][5].",
          language: "python",
          code: `w, v, W = [0,3,3,4], [0,4,4,5], 5
n = 3
dp = [[0]*(W+1) for _ in range(n+1)]
for i in range(1, n+1):
    for cap in range(W+1):
        dp[i][cap] = dp[i-1][cap]
        if w[i] <= cap:
            dp[i][cap] = max(dp[i][cap], v[i] + dp[i-1][cap-w[i]])
print(dp[3][5])`,
          steps: [
            {
              do: "Density 4/3, 4/3, 5/4. Greedy takes a (3,4). Leftover 2 fits nothing. Greedy value 4.",
              why: "The denser item blocks the bag. Greedy cannot undo.",
            },
            {
              do: "True 0/1: take the (4,5) alone. Value 5, which beats 4.",
              why: "A local density choice is not safe when items are whole.",
            },
            {
              do: "DP skip-or-take: dp[3][5] ends at 5 (take item 3, skip the 3-weight items).",
              why: "dp[i][w] = max(skip item i, take it if it fits). That table is allowed to skip a dense item.",
            },
            {
              do: "Exam flag: ‘take or leave the whole item’ → DP. ‘cut a gold bar’ → greedy.",
              why: "Same story, two algorithms.",
            },
          ],
          result: "Greedy 4. True / DP optimum 5. Greedy is wrong for 0/1 knapsack.",
        },
        {
          title: "Activity selection is greedy; coin change often is not",
          prompt:
            "Activities (start,finish): (1,4), (3,5), (5,7), (8,11). Max count? Coins {1,3,4}, amount 6, unbounded. Greedy largest-first vs DP min coins.",
          language: "python",
          code: `acts = [(1,4),(3,5),(5,7),(8,11)]
acts.sort(key=lambda x: x[1])
chosen, last = [], 0
for s, f in acts:
    if s >= last:
        chosen.append((s, f))
        last = f
print(chosen)
# coins: greedy 4+1+1 = 3 coins; DP two 3s = 2 coins`,
          steps: [
            {
              do: "Sort by finish: (1,4), (3,5), (5,7), (8,11). Take (1,4), last=4. Skip (3,5). Take (5,7), last=7. Take (8,11). Size 3.",
              why: "Earliest-finish greedy is safe for maximum count of non-overlapping intervals.",
            },
            {
              do: "Coins {1,3,4} amount 6. Greedy largest-first takes 4 then 1 then 1 = 3 coins.",
              why: "‘Always biggest’ is not a theorem. This coin system is not canonical.",
            },
            {
              do: "Unbounded DP: 3+3 = 2 coins. Better.",
              why: "Min-coin change is DP (unbounded knapsack). Reuse dp[x-c] in the same row.",
            },
            {
              do: "Two different problems: intervals → greedy finish time. General coins → DP.",
              why: "Match the invariant to the question. Do not stamp ‘greedy’ on every sort.",
            },
          ],
          result: "Activities: {(1,4),(5,7),(8,11)} size 3. Coins: greedy 3, DP 2 (3+3).",
        },
      ],
    },
    {
      heading: "KMP idea — prefix table, never rewind the text",
      body: "Naive search slides the pattern along the text and, on a mismatch, may re-check letters it already matched. Worst time O(n m). KMP builds an LPS / prefix table: for each pattern prefix, the longest proper prefix that is also a suffix. On mismatch it jumps the pattern using that table. The text index never decreases.\n\nTime O(n+m): one pass on the pattern of length m, one pass on the text of length n. Extra space O(m). You will not write the full automaton in this exam. You may fill a tiny LPS row and say what the jump is.",
      howTo: [
        "LPS[0] is always 0. Walk i from 1. Grow length when P[i]==P[length]. On mismatch set length = LPS[length-1] (or 0).",
        "lps[i] = longest proper prefix of P[0..i] that is also a suffix of P[0..i].",
        "During search, a mismatch at pattern index j sets j = lps[j-1]. The text index i stays (or steps by 1 if j was 0).",
        "Pick O(n+m), not O(n m). The prefix table is the named idea.",
      ],
      bullets: [
        "LPS[i] = longest proper prefix-suffix of pat[0..i].",
        "KMP: O(n+m), no backup on the text pointer. Naive: O(nm) worst case.",
        "Rabin–Karp is rolling hash. Boyer–Moore is bad-character / good-suffix. KMP is the prefix table.",
      ],
      examples: [
        {
          title: "LPS of AABA",
          prompt: "Fill LPS for pattern AABA. Print the four entries.",
          language: "python",
          code: `def lps(p):
    m = len(p)
    pi = [0] * m
    length = 0
    i = 1
    while i < m:
        if p[i] == p[length]:
            length += 1
            pi[i] = length
            i += 1
        elif length:
            length = pi[length - 1]
        else:
            pi[i] = 0
            i += 1
    return pi
print(lps("AABA"))`,
          steps: [
            {
              do: "p = A A B A. pi[0] = 0 always.",
              why: "A one-letter string has no proper prefix.",
            },
            {
              do: "i=1, A==A: length=1, pi[1]=1. After this step LPS is 0, 1, _, _.",
              why: "The prefix AA has longest proper prefix-suffix A (length 1).",
            },
            {
              do: "i=2, B vs A: mismatch, length←0, pi[2]=0. i=3, A vs A: length=1, pi[3]=1.",
              why: "B breaks the A-run. The whole AABA only reuses a single trailing A.",
            },
            {
              do: "LPS = [0, 1, 0, 1].",
              why: "Proper prefix-suffix of whole AABA is A, not AA (AA is not a suffix).",
            },
          ],
          result: "[0, 1, 0, 1]",
        },
        {
          title: "Mismatch jump uses LPS, text index stays",
          prompt:
            "Pattern ABABC, LPS [0,0,1,2,0]. First three letters matched, fourth fails. What does j become? Does i go backwards?",
          language: "python",
          code: `p = "ABABC"
lps = [0, 0, 1, 2, 0]
matched = 3
print(lps[matched - 1])  # next j`,
          steps: [
            {
              do: "Matched prefix ABA (j=3). Next pattern letter is C. Text letter is not C.",
              why: "A mismatch happens at pattern index 3 (0-based next compare is 3).",
            },
            {
              do: "Set j = lps[2] = 1. After the jump the pattern index is 1. i is unchanged.",
              why: "LPS of ABA is 1: the trailing A is also a prefix A. We already know that A still matches.",
            },
            {
              do: "Compare the current text letter with P[1], without moving the text pointer back.",
              why: "That is the KMP idea: never rewind i.",
            },
            {
              do: "Naive search would slide by 1 and re-read the A it already matched. KMP does not.",
              why: "The prefix table stores the overlap so those letters are not compared again.",
            },
          ],
          result: "j ← 1, i stays. LPS avoided rechecking the prefix A.",
        },
        {
          title: "Complexity: O(n+m), not O(n m)",
          prompt:
            "Text length n=10, pattern length m=3. Which time bound is KMP? Naive worst case?",
          language: "java",
          code: `class Main {
  static String kmp(int n, int m) {
    return "O(" + (n + m) + ")";
  }
  public static void main(String[] args) {
    System.out.print(kmp(10, 3));
  }
}`,
          steps: [
            {
              do: "Build LPS on the pattern: O(m). Scan the text: O(n). Together O(n+m).",
              why: "Each text character is consumed a constant number of times because i never decreases.",
            },
            {
              do: "Here n+m=13. Printed O(13) is the concrete count of that bound.",
              why: "The asymptotic label on the MCQ is O(n+m).",
            },
            {
              do: "Naive worst case tries about (n−m+1)×m comparisons, here about 24, labelled O(n m).",
              why: "AAAA… vs AAAX is the usual naive blow-up.",
            },
            {
              do: "Exam pick: linear pattern search with a prefix table → KMP, O(n+m), extra O(m).",
              why: "Not O(n log m), not O(n m).",
            },
          ],
          result: "KMP O(n+m). Naive worst O(nm). Extra memory O(m) for LPS.",
        },
      ],
    },
  ],
};
