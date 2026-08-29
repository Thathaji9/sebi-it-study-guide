import type { TopicNote } from "@/data/notes";

export const notesAlgorithms: TopicNote = {
  topic: "algorithms",
  title: "Algorithms — simple notes",
  blurb:
    "We explain algorithms like class notes a Class-10 student can read: a fire spreading room by room, a maze, a pack of cards, a cheapest road, a shiniest coin, a rubber stamp, a dictionary. Then we solve five tiny examples in each topic, one queue snapshot or one number at a time.",
  blocks: [
    {
      heading: "BFS — fire spreading room by room",
      body: "Picture a fire spreading through a house, or a ticket queue at a window. The first person in line is served first (FIFO). The fire reaches the next-door rooms before it reaches rooms two doors away. You never jump a whole floor; you finish one ring of rooms, then the next ring.\n\nOn the exam, BFS is that ticket line written as a queue. Start at room s. Visit every neighbour of s, then every room two edges away, and so on. On a map where every door costs 1, the first time BFS reaches a room is a shortest path in number of doors. Time is O(V+E) with neighbour lists. Mark a room seen when you put it in the line, so each room enters once. Write the queue after every take-from-front. Neighbour order matters.",
      howTo: [
        "Put the start room at the back of the ticket line. Tick it seen.",
        "Take the person at the front. That room is the one you process now.",
        "For each next-door room you have not seen, put it at the back and tick it seen (in the given list order).",
        "Write the queue after every step. Distance equals which ring of the fire you are on.",
        "If the neighbour lists are sorted, the trace is unique. State that order before you walk.",
        "On a one-way map, you may only walk along arrows. Starting at a dead end visits only that room.",
      ],
      bullets: [
        "BFS = ticket queue (first in, first out). Fire spreads room by room.",
        "Tick a room seen when you put it in line, not when you take it out.",
        "First reach = fewest doors on an unweighted map. Time O(V+E).",
        "Write the queue after every dequeue. Neighbour order matters.",
        "Directed edges go one way: start at E and you may not reach A.",
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
              do: "Start: seen={A}, queue=[A].",
              why: "The ticket line begins with the start room. First in line is served first.",
            },
            {
              do: "Take A from the front. Put unseen next-door rooms B then C at the back. Queue is B, C. Visit order: A.",
              why: "New rooms join the rear of the line. Sorted lists put B before C.",
            },
            {
              do: "Take B. A is already seen. Put D, E at the back. Queue is C, D, E. Visit order: A, B.",
              why: "A does not join the line again. Tick-on-join keeps each room once.",
            },
            {
              do: "Take C. Put F at the back. Queue is D, E, F. Then D, E, F each leave with no new rooms. Visit order A, B, C, D, E, F.",
              why: "B and C were the next-door ring. D, E, F are two doors away.",
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
              why: "Each door in this map costs 1. Next-door rooms sit on ring 1 of the fire.",
            },
            {
              do: "After expanding B and C, D, E, F get dist 2.",
              why: "They are next door to ring-1 rooms, so they sit on ring 2.",
            },
            {
              do: "F is first seen from C. dist[F]=2. No later door can beat 2, because BFS would have found a shorter walk earlier.",
              why: "When every door costs 1, the first time the fire reaches a room the distance is final.",
            },
            {
              do: "Printed distances: A0 B1 C1 D2 E2 F2.",
              why: "That layering is the whole point of the ticket queue.",
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
              why: "One start room in the ticket line.",
            },
            {
              do: "Take A. Put B then C at the back. After A the queue is B, C.",
              why: "Alphabetical neighbours: B before C.",
            },
            {
              do: "Take B. A is already seen. Put D at the back. After B the queue is C, D.",
              why: "The question asks for the line just after B is served, not the visit order.",
            },
            {
              do: "Answer [C, D]. C is still waiting from A’s expansion.",
              why: "First in, first out: C joined before D, so C is still at the front.",
            },
          ],
          result: "Queue after B is dequeued: [C, D].",
        },
        {
          title: "Mark visited when you enqueue, not when you dequeue",
          prompt:
            "Undirected A—B, A—C, B—C. Neighbours alphabetical. Start at A. If you mark visited only when you dequeue, how many times can C sit in the queue?",
          language: "python",
          code: `from collections import deque
g = {"A": ["B", "C"], "B": ["A", "C"], "C": ["A", "B"]}
# buggy: mark on dequeue
q = deque(["A"])
seen = set()
while q:
    u = q.popleft()
    if u in seen:
        continue
    seen.add(u)
    for v in g[u]:
        q.append(v)
# C is enqueued from A and again from B`,
          steps: [
            {
              do: "Start queue [A]. Take A, tick A, put B and C at the back. Queue is B, C.",
              why: "A’s next-door rooms are still unseen because we have not served them yet.",
            },
            {
              do: "Take B, tick B. Neighbours A (already ticked) and C. Put C at the back again. Queue is C, C.",
              why: "C was not ticked yet. Tick-only-when-served lets a room wait twice.",
            },
            {
              do: "Correct BFS ticks C when it first joins from A, so B does not put C in again. Queue after B would be [C].",
              why: "Tick-on-join means each room enters the ticket line once.",
            },
            {
              do: "Exam flag: if the question shows C twice in the queue, the trace forgot to mark on enqueue.",
              why: "The rule is ‘each room is queued at most once’.",
            },
          ],
          result: "Buggy mark-on-dequeue can put C in the queue twice. Mark when you enqueue.",
        },
        {
          title: "Directed BFS: edges go one way",
          prompt:
            "Directed lists (sorted): A:[B,C] B:[D] C:[D] D:[E] E:[]. Start BFS at A. Visit order? Distances? What if we start at E?",
          language: "python",
          code: `from collections import deque
g = {"A":["B","C"],"B":["D"],"C":["D"],"D":["E"],"E":[]}
dist, q = {"A": 0}, deque(["A"])
order = []
while q:
    u = q.popleft()
    order.append(u)
    for v in g[u]:
        if v not in dist:
            dist[v] = dist[u] + 1
            q.append(v)
print(order, dist)`,
          steps: [
            {
              do: "Take A, put B then C at the back. Visit so far A. Queue B, C. Dist B=1, C=1.",
              why: "One-way arrows out of A are the only doors the fire may follow from A.",
            },
            {
              do: "Take B, put D (dist 2). Queue C, D. Take C: D is already seen, skip. Take D, put E (dist 3). Then E.",
              why: "First time we reach D is from B, so dist[D]=2. C→D is a later door on the same ring.",
            },
            {
              do: "Visit order A, B, C, D, E. Distances 0,1,1,2,3.",
              why: "Still ring by ring. Direction only limits which next-door rooms exist.",
            },
            {
              do: "BFS from E: E has no outgoing arrow. Only E is visited. A is not reachable backwards.",
              why: "On a one-way map, ‘can I get there?’ depends on the start room.",
            },
          ],
          result: "From A: A, B, C, D, E with dist 0,1,1,2,3. From E: only E.",
        },
      ],
    },
    {
      heading: "DFS — maze, go as deep as you can",
      body: "Picture exploring a maze. You pick one corridor and walk as deep as you can. When you hit a dead end, you backtrack to the last fork and try the next corridor. You do not finish a whole ring of rooms first; you dive.\n\nOn the exam, that dive is a stack (or recursion, which is a stack). DFS does not give fewest-door paths. It is the usual tool for cycles, topological sort on a one-way map with no cycles, and maze walking. Write the call stack after every push and pop. On an undirected map, tick rooms seen or you bounce on a two-way door. Discovery order is ‘when I first tick the room’, not ‘when I return’.",
      howTo: [
        "Start at s. Tick s. Walk its first unseen neighbour, then that room’s first unseen neighbour, and so on.",
        "When a room has no unseen neighbour, pop (return) and try the next neighbour of the room below.",
        "Write the stack of live calls. Discovery order is the order you tick rooms.",
        "Do not use DFS distances as fewest-door paths on an unweighted map.",
        "A back-door to a still-open ancestor is a directed cycle. Skip the parent on an undirected map.",
        "Finish (post) order, reversed, is a topological listing of a DAG. Discovery order is not.",
      ],
      bullets: [
        "DFS = maze: last plate on the stack, go as deep as you can, then backtrack.",
        "Not fewest doors. Use BFS for unweighted shortest paths.",
        "Discovery order ≠ BFS visit order on the same map.",
        "A back-edge to a grey (still-open) ancestor is a directed cycle.",
        "Finish order reversed = one valid topological order on a DAG.",
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
              do: "dfs(A) ticks A. First unseen neighbour is B. Stack of calls: A → B.",
              why: "The maze takes the first corridor immediately, not the whole ring of rooms.",
            },
            {
              do: "dfs(B): A is seen, D is not. Recurse D. Stack: A → B → D. D’s only neighbour B is seen, so D returns. Discovery so far: A, B, D.",
              why: "A dead end pops. That is backtracking in the maze.",
            },
            {
              do: "Back in B, next neighbour E. Recurse E, then E returns. Discovery: A, B, D, E. Then B returns.",
              why: "The whole B-corridor finishes before A looks at C.",
            },
            {
              do: "dfs(C), then dfs(F). Discovery order A, B, D, E, C, F.",
              why: "This is not A, B, C, D, E, F. That was the fire / ticket-queue walk.",
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
              why: "The stack holds rooms still to visit, like plates: last on, first off.",
            },
            {
              do: "Push C then B (reversed alphabetical). After expanding A the stack is C, B with B on top.",
              why: "Pushing right-to-left matches recursive DFS that tries B first.",
            },
            {
              do: "Next pop is B, then push D. Stack becomes C, D.",
              why: "Deep into B’s corridor before C — that is the maze rule.",
            },
            {
              do: "BFS would have had queue [B, C] after expanding A. Same neighbours, other end.",
              why: "Ticket line versus plate stack is the whole contrast.",
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
              why: "The maze has no ‘first reach is shortest’ rule. It just dives.",
            },
            {
              do: "T is ticked. The later neighbour T of S is skipped as already seen.",
              why: "Seen means ‘do not re-enter’, not ‘try a cheaper walk’.",
            },
            {
              do: "BFS from S would take S from the front and see T at distance 1 immediately.",
              why: "The ticket line processes all doors out of S before going deeper.",
            },
            {
              do: "Exam pick for fewest hops: BFS. DFS may report 3 on this graph.",
              why: "Wrong picture, wrong rule. Maze ≠ fire spreading.",
            },
          ],
          result: "DFS may record dist(T)=3. BFS records 1. Use BFS for unweighted shortest paths.",
        },
        {
          title: "Grey ancestor = directed cycle",
          prompt:
            "Directed A→B, B→C, C→A. Recursive DFS from A. When we look at C→A, A is still on the call stack. Cycle?",
          language: "python",
          code: `g = {"A": ["B"], "B": ["C"], "C": ["A"]}
WHITE, GREY, BLACK = 0, 1, 2
color = {v: WHITE for v in g}
cycle = False
def dfs(u):
    global cycle
    color[u] = GREY
    for v in g[u]:
        if color[v] == GREY:
            cycle = True
        elif color[v] == WHITE:
            dfs(v)
    color[u] = BLACK
dfs("A")
print(cycle)`,
          steps: [
            {
              do: "dfs(A) paints A grey. Recurse B (grey), then C (grey). Stack of live calls: A → B → C.",
              why: "Grey means ‘started, not finished’ — still walking that corridor of the maze.",
            },
            {
              do: "From C the arrow C→A hits grey A. That is a back-door to an ancestor. Set cycle = True.",
              why: "A path down the stack plus this arrow is a directed loop A-B-C-A.",
            },
            {
              do: "Then C, B, A finish and turn black. A black neighbour is a finished branch, not a new cycle alarm.",
              why: "Only grey (not white, not black) proves a cycle in directed DFS.",
            },
            {
              do: "On an undirected graph, ignore the single parent edge or you will call every two-way door a cycle.",
              why: "Undirected A—B always looks like a back-door unless you skip the parent.",
            },
          ],
          result: "Yes, a directed cycle. C→A is a back-edge to grey A.",
        },
        {
          title: "Discovery order versus finish (post) order",
          prompt:
            "DAG: A→C, A→B, B→D, C→D. Neighbours alphabetical. Recursive DFS from A. Discovery list? Finish list?",
          language: "python",
          code: `g = {"A": ["B", "C"], "B": ["D"], "C": ["D"], "D": []}
seen, disc, fin = set(), [], []
def dfs(u):
    seen.add(u)
    disc.append(u)
    for v in g[u]:
        if v not in seen:
            dfs(v)
    fin.append(u)
dfs("A")
print("discover", disc)
print("finish", fin)`,
          steps: [
            {
              do: "dfs(A) discovers A. First neighbour B. dfs(B) discovers B, then D. D has no child, so D finishes first.",
              why: "Finish (post) order records a room when its whole maze-branch is done.",
            },
            {
              do: "B finishes after D. Back in A, C is next. C’s neighbour D is already seen, so C finishes at once. A finishes last.",
              why: "Discovery A, B, D, C. Finish D, B, C, A.",
            },
            {
              do: "Reverse of finish order is A, C, B, D — one valid topological order of this DAG.",
              why: "A room finishes only after every room it can reach. That is the listing trick.",
            },
            {
              do: "Do not use discovery order as a topological sort. Discovery was A, B, D, C, which still has C after D even though C→D.",
              why: "Finish (or reverse finish) is the DAG listing. Discovery is ‘when I first ticked’.",
            },
          ],
          result: "Discover A, B, D, C. Finish D, B, C, A. Reverse finish A, C, B, D is a topo order.",
        },
      ],
    },
    {
      heading: "Merge sort — split the cards, zip two piles",
      body: "Picture a pack of cards. Split the pack in half, then split each half, until every pile is one card. A single card is already sorted. Then zip two sorted piles: always take the smaller top card, like merging two sorted rows of kids by height.\n\nOn the exam, that zip is merge. The split tree has about log₂ n levels. Each level copies n cards. That is why the cost is n log n in every case — best, average, and worst. Recurrence T(n)=2T(n/2)+Θ(n). Merge with ≤ (not <) is stable: equal keys keep their original order. Extra memory is Θ(n) for the merge buffer. Quick sort’s worst case is n²; merge sort does not have that trap.",
      howTo: [
        "Split in half until every piece has one card (a singleton is sorted).",
        "Zip two sorted piles: compare the two top cards, take the smaller, advance that pile.",
        "Count levels: log₂ n splits. Work per level: n copies. Total n log n.",
        "If two tops are equal, take the left one first (stability).",
        "When one pile empties, copy the leftover of the other. That leftover is already sorted.",
        "A reversed pack does not add levels. Worst case is still n log n.",
      ],
      bullets: [
        "Split the pack, then zip two sorted piles. Always Θ(n log n).",
        "Stable if you take the left equal key first. Extra Θ(n) memory.",
        "Not in-place (usual textbook merge).",
        "Quick sort’s worst case is n²; merge sort does not have that trap.",
        "One leftover pile after the other empties: copy it. Merge is linear in the two pile sizes.",
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
              why: "Each half is a new smaller pack, size n/2.",
            },
            {
              do: "Split left to [38] and [27]. Zip: 27≤38 so [27, 38]. Split right to [43] and [3]. Zip: [3, 43].",
              why: "One-card piles are already sorted. Zipping is the only work.",
            },
            {
              do: "Zip [27, 38] with [3, 43]: take 3, then 27, then 38, then leftover 43. Result [3, 27, 38, 43].",
              why: "Each take compares the two current top cards and advances one pile.",
            },
            {
              do: "Two split levels, 4 copies of work per level. 4 × 2 = 8, which matches n log₂ n = 4×2.",
              why: "That counting is the n log n story on a tiny pack.",
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
              why: "The split tree of even halves is log n deep, like cutting a pack again and again.",
            },
            {
              do: "At every level the pieces together still hold 8 numbers. Zipping them copies 8 cards.",
              why: "Work per level is Θ(n), not Θ(n²).",
            },
            {
              do: "3 levels × 8 copies = 24 = n log n.",
              why: "Master theorem picture: two halves, combine n cards, so n log n.",
            },
            {
              do: "A reversed pack does not add levels. Worst case is still n log n.",
              why: "Unlike insertion sort, merge sort does not become n² on reversed cards.",
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
              do: "Tops 2a and 2b. 2a <= 2b, so take 2a. After this take the output is 2a.",
              why: "Using ≤ (not <) prefers the left pile on a tie. That is stability.",
            },
            {
              do: "Tops 4 and 2b. 4 > 2b, take 2b. After this take the output is 2a, 2b.",
              why: "2b came from the right pile and keeps its place after 2a.",
            },
            {
              do: "Tops 4 and 3. Take 3, then leftover 4. Output [2a, 2b, 3, 4].",
              why: "Equal keys did not swap order. Merge sort is stable.",
            },
            {
              do: "If the zip had used <, a tie would take the right key first and break stability.",
              why: "The comparison on equals is the whole stability trick.",
            },
          ],
          result: "[2a, 2b, 3, 4]. Left equal key stays first. Merge sort is stable.",
        },
        {
          title: "Merge leftover: one run empties first",
          prompt:
            "Merge L=[1, 4, 9] with R=[2, 3]. Show each take. What happens after R is empty?",
          language: "python",
          code: `L, R = [1, 4, 9], [2, 3]
i = j = 0
out = []
while i < len(L) and j < len(R):
    if L[i] <= R[j]:
        out.append(L[i]); i += 1
    else:
        out.append(R[j]); j += 1
out += L[i:] + R[j:]
print(out)`,
          steps: [
            {
              do: "Tops 1 vs 2: take 1. Tops 4 vs 2: take 2. Tops 4 vs 3: take 3. After that take, R is empty. Output so far 1, 2, 3.",
              why: "Each step compares the two current top cards and advances only that pile.",
            },
            {
              do: "The while loop stops because j==len(R). Append leftover L[i:] = [4, 9].",
              why: "No more compares. The rest of the non-empty pile is already sorted, so copy it.",
            },
            {
              do: "Result [1, 2, 3, 4, 9]. Total takes: 3 compares + 2 copies = 5 = n.",
              why: "A zip of n cards does Θ(n) work, never Θ(n²).",
            },
            {
              do: "If L had emptied first, we would have copied leftover R the same way.",
              why: "The code `out + L[i:] + R[j:]` covers both leftovers; one of them is empty.",
            },
          ],
          result: "[1, 2, 3, 4, 9]. After R empties, copy leftover 4, 9. Merge is linear in the two run lengths.",
        },
        {
          title: "Reversed array: merge sort still n log n",
          prompt:
            "[4, 3, 2, 1]. Insertion sort does 6 swaps (n(n−1)/2). Merge sort: how many split levels? Why is that not n²?",
          language: "python",
          code: `# insertion: 4,3,2,1 -> 6 adjacent inversions, Theta(n^2)
# merge sort: mid splits
# [4,3] | [2,1]
# [4]|[3]  [2]|[1]
# merge [3,4] and [1,2], then [1,2,3,4]
# 2 levels of n copies = 8 = n log2 n`,
          steps: [
            {
              do: "Insertion sort walks left and swaps past every inversion. Reversed n=4 has 6 inversions. That grows like n².",
              why: "Each pair is out of order. Insertion pays per pair.",
            },
            {
              do: "Merge sort still splits twice to singletons, then zips. Two levels × 4 copies ≈ n log n.",
              why: "The split tree does not grow extra levels just because the cards are reversed.",
            },
            {
              do: "Zips: [3,4], [1,2], then [1,2,3,4]. Same shape as a random pack of length 4.",
              why: "Input order changes which top you take, not how many levels you pay.",
            },
            {
              do: "Exam pick: worst-case Θ(n log n) sorter that is stable → merge sort, not insertion, not naive quick sort.",
              why: "Quick sort’s worst case on sorted/reversed input is n² unless you pick a better pivot.",
            },
          ],
          result: "2 split levels, Θ(n) per level, still Θ(n log n). Insertion sort on the same input is Θ(n²).",
        },
      ],
    },
    {
      heading: "Dijkstra vs Bellman-Ford — cheapest road vs negative coupon",
      body: "Picture a road map. Dijkstra is the cheapest-road walk when every toll is zero or a positive fee — no negative coupons. You always lock in the cheapest unfinished town, then look at its roads. Once a town is locked, its price is final. With a heap this is O((V+E) log V).\n\nBellman-Ford allows a negative coupon (a road that pays you). It walks every road |V|−1 times. One extra round that still finds a cheaper price proves a money-printing loop you can reach from the start. Time O(VE). Unweighted maps are BFS, not these two. All-pairs with possible negatives is Floyd-Warshall. A negative coupon with no loop still breaks Dijkstra.",
      howTo: [
        "Check tolls. Any negative coupon → do not use Dijkstra. Use Bellman-Ford (or Floyd if all pairs).",
        "Dijkstra: write tentative prices. Repeatedly lock the cheapest unfinished town. Relax its roads.",
        "Bellman-Ford: repeat |V|−1 full passes over every road. Cheapen v if dist[u]+w is smaller.",
        "One extra Bellman-Ford pass. If any road still cheapens a town, report a money-printing loop.",
        "Unweighted / every door cost 1 → BFS, not a heap.",
        "Once Dijkstra locks a town, do not reopen it. That proof needs all remaining tolls ≥ 0.",
      ],
      bullets: [
        "Dijkstra: cheapest road, no negative tolls, lock the cheapest unfinished town.",
        "Bellman-Ford: negative coupon OK, |V|−1 rounds, extra round = money-printing-loop test.",
        "A negative edge with no negative cycle still breaks Dijkstra.",
        "Unweighted map → BFS. All-pairs with negatives → Floyd-Warshall.",
        "Dijkstra with a heap is O((V+E) log V). Bellman-Ford is O(VE).",
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
              do: "Init A=0, B=C=D=∞. Lock A. Cheapen B←4, C←2, D←10. Tentatives: C=2, B=4, D=10.",
              why: "Dijkstra starts by looking at the start town’s outgoing roads.",
            },
            {
              do: "Smallest unfinished is C=2. Lock C. B via C: 2+1=3 < 4, so B←3. D via C: 2+8=10, D stays 10.",
              why: "Always lock the unfinished town with the cheapest price. No negative tolls here.",
            },
            {
              do: "Lock B=3. D via B: 3+5=8 < 10, so D←8. Then lock D=8.",
              why: "A later cheaper road to D is allowed until D is locked. Remaining tolls are ≥ 0, so 8 is final.",
            },
            {
              do: "dist A=0, C=2, B=3, D=8. Path A-C-B-D. Lock order A, C, B, D.",
              why: "A→D toll 10 and C→D toll 8 are not used in the final cheapest-road tree.",
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
              why: "A negative coupon can make a longer hop-count cheaper.",
            },
            {
              do: "Dijkstra from S sets B←1 and A←2. Smallest unfinished is B at 1, so B is locked.",
              why: "The cheapest-now step thinks 1 is done. It does not expect a coupon later.",
            },
            {
              do: "A is locked next. Cheapening 2-10=−8 wants to improve B, but a locked town is not reopened.",
              why: "The proof that locked prices are best used ‘remaining tolls ≥ 0’, which is false here.",
            },
            {
              do: "Dijkstra reports dist(B)=1. Wrong. Bellman-Ford would get −8.",
              why: "Any negative coupon → Bellman-Ford (or Floyd), not Dijkstra.",
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
              why: "Each cheapening is ‘if a known walk to u plus this road beats dist[v], take it’.",
            },
            {
              do: "Rounds 2 and 3 do not change the table. |V|-1 rounds are enough for a shortest simple path.",
              why: "A simple walk has at most |V|-1 roads, so |V|-1 passes suffice when there is no money-printing loop.",
            },
            {
              do: "Extra 4th round: no road improves. No negative cycle reachable from A.",
              why: "A still-cheapening extra pass is the money-printing-loop alarm.",
            },
            {
              do: "Final A=0, B=4, C=1, D=5 (path A-B-C-D). Dijkstra would also work here, but B→C is negative so the safe named algorithm is Bellman-Ford.",
              why: "Exam: negative coupon in the picture → Bellman-Ford even if a loop is absent.",
            },
          ],
          result: "A=0, B=4, C=1, D=5. No negative cycle. Bellman-Ford is the safe choice because of B→C.",
        },
        {
          title: "Extra Bellman-Ford round catches a negative cycle",
          prompt:
            "Directed: A→B 1, B→C 1, C→B −3. Source A, |V|=3 so 2 rounds then a test round. What happens?",
          language: "python",
          code: `edges = [("A","B",1),("B","C",1),("C","B",-3)]
dist = {"A":0,"B":10**9,"C":10**9}
for _ in range(2):
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            dist[v] = dist[u] + w
changed = False
for u, v, w in edges:
    if dist[u] + w < dist[v]:
        changed = True
print(dist, "neg_cycle" if changed else "ok")`,
          steps: [
            {
              do: "Round 1: B←1, C←2, then C→B: 2+(−3)=−1 so B←−1. Distances keep dropping around B-C.",
              why: "Each loop B→C→B subtracts 2. There is no cheapest road once a reachable money-printing loop exists.",
            },
            {
              do: "After |V|-1=2 rounds the table is still not ‘final’. The extra 3rd round still cheapens B or C.",
              why: "A still-cheapening extra pass is the money-printing-loop alarm.",
            },
            {
              do: "Report: negative cycle reachable from A. Do not print B=… as a shortest path.",
              why: "Cheapest roads are undefined when you can loop cheaper forever.",
            },
            {
              do: "Dijkstra is illegal here (negative coupon) and would also miss the cycle test.",
              why: "Bellman-Ford’s extra round is the named exam tool for ‘is there a money-printing loop?’.",
            },
          ],
          result: "Extra round still relaxes. Negative cycle B-C-B. No finite shortest path to B or C.",
        },
        {
          title: "Pick BFS, Dijkstra, or Bellman-Ford",
          prompt:
            "(i) unweighted city map (ii) road times, all ≥ 0 (iii) one toll of −5, no cycle (iv) need to know if a negative cycle exists.",
          language: "java",
          code: `// (i) BFS
// (ii) Dijkstra
// (iii) Bellman-Ford (negatives, no cycle needed for correctness)
// (iv) Bellman-Ford extra round`,
          steps: [
            {
              do: "(i) Unweighted / every door cost 1 → BFS. Distance = hop count.",
              why: "A heap is wasted when every road is the same. That is the fire picture.",
            },
            {
              do: "(ii) Non-negative tolls → Dijkstra. Lock the cheapest unfinished town.",
              why: "Cheapest-now is safe only when remaining tolls are ≥ 0.",
            },
            {
              do: "(iii) Any negative coupon → Bellman-Ford even if you believe there is no loop.",
              why: "Dijkstra’s proof is already broken by one negative toll.",
            },
            {
              do: "(iv) Run |V|-1 rounds then one extra. If anything still cheapens, tick negative cycle.",
              why: "That extra pass is the money-printing-loop test. Floyd-Warshall also flags a negative on the diagonal for all-pairs.",
            },
          ],
          result: "BFS (unweighted), Dijkstra (weights ≥ 0), Bellman-Ford (negatives or cycle test).",
        },
      ],
    },
    {
      heading: "Greedy vs DP — shiniest coin vs a marks table",
      body: "Picture a greedy child who always picks the shiniest coin on the table right now and never puts it back. That is correct only when a proof says so. Activity selection (earliest finish) and fractional knapsack (best value per weight) are greedy. 0/1 knapsack, LCS, and many coin systems are not.\n\nDynamic programming is a marks table: you fill cells so you reuse homework you already did. 0/1 knapsack fills dp[i][w]. If the question lets you cut an item, greedy density works. If you must take or leave the whole item, fill a DP table. Greedy does not mean ‘sort and take largest’.",
      howTo: [
        "Ask: can I take a fraction / a cut of an item? Yes → greedy density. No → 0/1 DP.",
        "Ask: does a local best stay safe? If a small counter-example beats greedy, switch to DP.",
        "Greedy: sort by the right key, then scan once (finish time, v/w, lightest Huffman nodes).",
        "DP: name the state (i, w) or (i, j), write the recurrence, fill by increasing size.",
        "Shiniest-now is not a theorem. Coins {1,3,4} amount 6: greedy 4+1+1, DP two 3s.",
        "LCS is a marks table, not ‘take the first matching letter’.",
      ],
      bullets: [
        "Greedy = always pick the shiniest coin now. Never undo.",
        "DP = fill a marks table so you reuse homework.",
        "Fractional knapsack: greedy v/w. 0/1 knapsack: DP O(nW).",
        "Activity selection: sort by finish time, take next compatible.",
        "If greedy fails a 3-item example, do not force it. Use DP.",
        "General coin change is DP. Earliest-finish intervals are greedy.",
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
              why: "When you may cut, the shiniest rule is value per weight, not raw value.",
            },
            {
              do: "Take all of item 1: value 60, remaining 40. Take all of item 2: value 100, remaining 20.",
              why: "Whole items that fit and have the best remaining shine are taken fully.",
            },
            {
              do: "Item 3 weighs 30>20, so take 20/30. Value added = 80. Total 240.",
              why: "A cut of the next item fills the leftover bag.",
            },
            {
              do: "If fractions were forbidden this 240 would be illegal. 0/1 would need a DP table (items 1+2 = 160).",
              why: "The word ‘fractional’ picks greedy. The word ‘whole item’ picks the marks table.",
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
              why: "The shinier item blocks the bag. Greedy cannot put it back.",
            },
            {
              do: "True 0/1: take the (4,5) alone. Value 5, which beats 4.",
              why: "A local shine choice is not safe when items are whole.",
            },
            {
              do: "DP skip-or-take: dp[3][5] ends at 5 (take item 3, skip the 3-weight items).",
              why: "dp[i][w] = max(skip item i, take it if it fits). The marks table is allowed to skip a shiny item.",
            },
            {
              do: "Exam flag: ‘take or leave the whole item’ → DP. ‘cut a gold bar’ → greedy.",
              why: "Same story, two algorithms: shiniest-now versus reuse homework.",
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
              why: "Earliest-finish greedy is safe for maximum count of non-overlapping slots.",
            },
            {
              do: "Coins {1,3,4} amount 6. Greedy largest-first takes 4 then 1 then 1 = 3 coins.",
              why: "Always-shiniest is not a theorem. This coin system is not canonical.",
            },
            {
              do: "Unbounded DP: 3+3 = 2 coins. Better.",
              why: "Min-coin change is a marks table (unbounded knapsack). Reuse dp[x-c] in the same row.",
            },
            {
              do: "Two different problems: intervals → greedy finish time. General coins → DP.",
              why: "Match the picture to the question. Do not stamp ‘greedy’ on every sort.",
            },
          ],
          result: "Activities: {(1,4),(5,7),(8,11)} size 3. Coins: greedy 3, DP 2 (3+3).",
        },
        {
          title: "Same bag: fractional 240 versus 0/1 220",
          prompt:
            "Items (w,v)=(10,60),(20,100),(30,120), W=50. Fractions allowed vs whole items only. Two numbers to write.",
          language: "python",
          code: `# fractional greedy v/w: 60 + 100 + 80 = 240
# 0/1 candidates:
# 10+20=30 -> 160
# 20+30=50 -> 220
# 10+30=40 -> 180
# best 0/1 is 220 (items 2 and 3)`,
          steps: [
            {
              do: "Fractional: densities 6, 5, 4. Take all of 1 and 2, then 20/30 of 3. Value 240.",
              why: "Cutting item 3 is legal only in the fractional problem.",
            },
            {
              do: "0/1: you may not cut. Items 2+3 weigh 50 and value 220. Items 1+2=160. Items 1+3=180. Best 220.",
              why: "The whole-item rule changes what fits. Greedy density would have taken item 1 first and stopped at 160.",
            },
            {
              do: "So greedy density is optimal for fractional (240) and wrong as a 0/1 policy if you take item 1 first.",
              why: "0/1 needs the skip-or-take marks table (or an exhaustive check on tiny n).",
            },
            {
              do: "Exam words: ‘you may take a fraction’ → 240 greedy. ‘whole item’ → DP, here 220.",
              why: "Same numbers, two problems. Read the constraint.",
            },
          ],
          result: "Fractional optimum 240. 0/1 optimum 220 (items 2+3). Greedy-by-density for 0/1 that keeps item 1 scores only 160.",
        },
        {
          title: "Tiny LCS table is DP, not greedy",
          prompt:
            "X=ABCB, Y=BDCB. Fill dp[i][j] = LCS of prefixes. What is dp[4][4]? Why is ‘take first common letter’ greedy unsafe?",
          language: "python",
          code: `X, Y = "ABCB", "BDCB"
n, m = len(X), len(Y)
dp = [[0]*(m+1) for _ in range(n+1)]
for i in range(1, n+1):
    for j in range(1, m+1):
        if X[i-1] == Y[j-1]:
            dp[i][j] = dp[i-1][j-1] + 1
        else:
            dp[i][j] = max(dp[i-1][j], dp[i][j-1])
print(dp[4][4])`,
          steps: [
            {
              do: "When letters match, dp = diagonal+1. Else dp = max(skip X letter, skip Y letter).",
              why: "LCS homework overlaps. The marks table stores each prefix pair once.",
            },
            {
              do: "Match path: B, C, B of X with B, C, B of Y. Length 3. dp[4][4]=3.",
              why: "One LCS is BCB. The whole strings are length 4, so 3 is possible.",
            },
            {
              do: "Greedy ‘first common letter A vs B — take B of Y with first B of X’ can still be repaired, but ‘always take the leftmost match and never skip’ can miss a longer later chain.",
              why: "There is no safe shiniest-now rule for LCS. Fill the table.",
            },
            {
              do: "Exam: subsequence (may skip) vs substring (must be contiguous). LCS is DP. Longest common substring is a different table (reset on mismatch).",
              why: "Name the cell. Do not stamp greedy on a matching problem.",
            },
          ],
          result: "dp[4][4]=3 (e.g. BCB). LCS is DP. Greedy leftmost match is not a theorem.",
        },
      ],
    },
    {
      heading: "KMP — a rubber stamp of the pattern",
      body: "Picture a rubber stamp of the pattern. You press it along the page. When a letter fails, you do not rewind the page; the stamp already knows how much of itself still matches. Naive search slides and, on a mismatch, may re-check letters it already matched. Worst time O(n m).\n\nOn the exam, that stamp is the LPS / prefix table: for each pattern prefix, the longest proper prefix that is also a suffix. On mismatch it jumps the pattern using that table. The text index never decreases. Time O(n+m): one pass on the pattern of length m, one pass on the text of length n. Extra space O(m). You may fill a tiny LPS row and say what the jump is. Rabin–Karp is rolling hash. Boyer–Moore is bad-character / good-suffix. KMP is the prefix table.",
      howTo: [
        "LPS[0] is always 0. Walk i from 1. Grow length when P[i]==P[length]. On mismatch set length = LPS[length-1] (or 0).",
        "lps[i] = longest proper prefix of P[0..i] that is also a suffix of P[0..i].",
        "During search, a mismatch at pattern index j sets j = lps[j-1]. The text index i stays (or steps by 1 if j was 0).",
        "Pick O(n+m), not O(n m). The rubber stamp / prefix table is the named idea.",
        "Never rewind the page. Naive search would slide back and re-read matched letters.",
        "Proper means ‘not the whole string’. LPS of AAAA ends 3, not 4.",
      ],
      bullets: [
        "KMP = a rubber stamp of the pattern so you never rewind the page.",
        "LPS[i] = longest proper prefix-suffix of pat[0..i].",
        "KMP: O(n+m), no backup on the text pointer. Naive: O(nm) worst case.",
        "Rabin–Karp is rolling hash. Boyer–Moore is bad-character / good-suffix. KMP is the prefix table.",
        "Extra memory O(m) for the stamp. A full match still uses LPS so overlapping hits are not missed.",
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
              why: "A one-letter stamp has no proper prefix.",
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
              why: "LPS of ABA is 1: the trailing A is also a prefix A. The stamp already knows that A still matches.",
            },
            {
              do: "Compare the current text letter with P[1], without moving the text pointer back.",
              why: "That is the rubber-stamp idea: never rewind the page.",
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
              why: "Each page letter is consumed a constant number of times because i never decreases.",
            },
            {
              do: "Here n+m=13. Printed O(13) is the concrete count of that bound.",
              why: "The asymptotic label on the MCQ is O(n+m).",
            },
            {
              do: "Naive worst case tries about (n−m+1)×m comparisons, here about 24, labelled O(n m).",
              why: "AAAA… vs AAAX is the usual naive blow-up: rewind and re-check.",
            },
            {
              do: "Exam pick: linear pattern search with a prefix table → KMP, O(n+m), extra O(m).",
              why: "Not O(n log m), not O(n m). The stamp is the named idea.",
            },
          ],
          result: "KMP O(n+m). Naive worst O(nm). Extra memory O(m) for LPS.",
        },
        {
          title: "Search AABA inside AACAABA",
          prompt:
            "Pattern AABA, LPS [0,1,0,1], text AACAABA. Walk i and j. Where does the match start? Does i ever decrease?",
          language: "python",
          code: `t, p = "AACAABA", "AABA"
lps = [0, 1, 0, 1]
i = j = 0
hits = []
while i < len(t):
    if t[i] == p[j]:
        i += 1
        j += 1
        if j == len(p):
            hits.append(i - j)
            j = lps[j - 1]
    elif j:
        j = lps[j - 1]
    else:
        i += 1
print(hits)`,
          steps: [
            {
              do: "Match AA, then text C vs pattern B. Mismatch at j=2. Set j=lps[1]=1. i stays on C.",
              why: "The stamp reuses the overlapping A. The page pointer i does not walk back.",
            },
            {
              do: "C vs P[1]=A: still mismatch, j=lps[0] path → j=0, then i steps to the next letter A.",
              why: "When j is already 0, the only move left is i += 1.",
            },
            {
              do: "From index 3 the four letters AABA match. Hit at start index 3. j resets to lps[3]=1.",
              why: "A full match still uses LPS so overlapping hits are not missed.",
            },
            {
              do: "i only stayed or went forward. That is why search is O(n+m), not O(n m).",
              why: "Never rewind the page. Naive search would have slid back.",
            },
          ],
          result: "Match starts at index 3. i never decreases. Hits = [3].",
        },
        {
          title: "LPS of AAAA",
          prompt:
            "Pattern AAAA. Fill four LPS entries. Why is LPS[3]=3, not 4?",
          language: "python",
          code: `def lps(p):
    pi = [0] * len(p)
    length = 0
    i = 1
    while i < len(p):
        if p[i] == p[length]:
            length += 1
            pi[i] = length
            i += 1
        elif length:
            length = pi[length - 1]
        else:
            i += 1
    return pi
print(lps("AAAA"))`,
          steps: [
            {
              do: "pi[0]=0. i=1, A==A → pi[1]=1. i=2, A==A → pi[2]=2. i=3, A==A → pi[3]=3.",
              why: "Each longer prefix of AAAA has a longer proper prefix-suffix of all A’s.",
            },
            {
              do: "LPS = [0, 1, 2, 3].",
              why: "Proper means ‘not the whole stamp’. The whole AAAA cannot count as its own prefix-suffix.",
            },
            {
              do: "So LPS[3]=3, not 4. The proper prefix AAA equals the suffix AAA.",
              why: "That overlap of 3 is what KMP jumps on after a full match of AAAA in a run of A’s.",
            },
            {
              do: "Contrast AABA whose LPS ended [0,1,0,1]. Repeating letters grow LPS; a break resets toward 0.",
              why: "LPS is about self-overlap of the stamp, not of the page.",
            },
          ],
          result: "[0, 1, 2, 3]. LPS[3]=3 because a proper prefix-suffix cannot be the whole pattern.",
        },
      ],
    },
    {
      heading: "Binary search — open the dictionary in the middle",
      body: "Picture a dictionary. Open it in the middle. If your word is earlier, throw away the right half. If later, throw away the left half. Keep opening the middle of what remains. Each step halves the search window.\n\nOn the exam, the dictionary must already be sorted in the same order you compare. Unsorted input makes the discarded half a lie. Time Θ(log n) comparisons. Extra memory Θ(1) for the loop. Write left, mid, right after every step. When left passes right, the key is missing. Ordinary binary search may land on any duplicate; keep searching the left half for the first occurrence.",
      howTo: [
        "Check the array is sorted. Set left=0, right=n−1.",
        "While left ≤ right: mid = floor((left+right)/2). Compare a[mid] with the key.",
        "Equal → found. Key < a[mid] → right = mid−1. Key > a[mid] → left = mid+1.",
        "If left > right, the key is not there. Count the steps: about log₂ n.",
        "For the leftmost duplicate: on a hit, record the index and still set right = mid−1.",
        "If they did not say the array is sorted, do not tick binary search.",
      ],
      bullets: [
        "Open the dictionary in the middle. Needs a sorted array.",
        "Mid index, then shrink left or right. Θ(log n) time, Θ(1) extra memory for the loop.",
        "When left > right the search missed. Unsorted input is undefined.",
        "First occurrence: on a hit, keep searching the left half.",
        "n=16 is about 5 mid checks worst case. Linear search is 16.",
      ],
      examples: [
        {
          title: "Find 7 in [1, 3, 5, 7, 9]",
          prompt:
            "Iterative binary search for 7. Show left, mid, right after each compare.",
          language: "python",
          code: `a = [1, 3, 5, 7, 9]
key = 7
left, right = 0, len(a) - 1
while left <= right:
    mid = (left + right) // 2
    if a[mid] == key:
        print("found", mid)
        break
    if key < a[mid]:
        right = mid - 1
    else:
        left = mid + 1`,
          steps: [
            {
              do: "n=5, left=0, right=4. mid=2, a[2]=5. 7>5 so left ← 3. After this step left=3, right=4.",
              why: "Everything at mid and left of mid is ≤ 5, so 7 cannot live there. Throw away the left half of the dictionary.",
            },
            {
              do: "mid=(3+4)//2=3, a[3]=7. Equal. Found at index 3.",
              why: "The next middle of the remaining window is the key.",
            },
            {
              do: "Two compares. log₂ 5 is a bit more than 2, so this is the expected ballpark.",
              why: "Each compare throws away about half of the dictionary.",
            },
            {
              do: "Do not scan 1,3,5,7 from the left. That would be linear search.",
              why: "Binary search jumps to mid. Linear search walks one by one.",
            },
          ],
          result: "Found 7 at index 3. Windows: [0..4] mid 5 → [3..4] mid 7.",
        },
        {
          title: "Miss: left walks past right",
          prompt:
            "Same array. Search 6. Show the last window and why the answer is ‘not found’.",
          language: "python",
          code: `a = [1, 3, 5, 7, 9]
key = 6
left, right = 0, 4
while left <= right:
    mid = (left + right) // 2
    if a[mid] == key:
        break
    if key < a[mid]:
        right = mid - 1
    else:
        left = mid + 1
print(left, right)  # left > right`,
          steps: [
            {
              do: "left=0, right=4, mid=2, a[2]=5. 6>5 so left=3.",
              why: "6 would have to sit among the values ≥ 7 if it existed.",
            },
            {
              do: "mid=(3+4)//2=3, a[3]=7. 6<7 so right=2. Now left=3 and right=2.",
              why: "The window collapsed. There is no index between 3 and 2.",
            },
            {
              do: "left > right, loop ends. 6 is not in the array.",
              why: "The sorted dictionary jumped from 5 to 7. Binary search proved the gap is empty.",
            },
            {
              do: "A linear scan would also miss, but would look at every cell. Binary search looked at 5 then 7 only.",
              why: "Logarithmic compares even on a miss.",
            },
          ],
          result: "Not found. After comparing 5 then 7, left=3 > right=2.",
        },
        {
          title: "First occurrence of a duplicate",
          prompt:
            "[1, 2, 2, 2, 5], key=2. Ordinary binary search may land on any 2. How do you force the leftmost 2?",
          language: "python",
          code: `a = [1, 2, 2, 2, 5]
key = 2
left, right, ans = 0, 4, -1
while left <= right:
    mid = (left + right) // 2
    if a[mid] >= key:
        if a[mid] == key:
            ans = mid
        right = mid - 1
    else:
        left = mid + 1
print(ans)`,
          steps: [
            {
              do: "Ordinary ‘return on equal’ might hit index 2 or 3 depending on mid. All are correct 2’s, not the first.",
              why: "The basic algorithm only promises some page of the key.",
            },
            {
              do: "To get the first: when a[mid]==2, record ans=mid and still set right=mid−1. Keep searching the left half.",
              why: "A still-smaller index might also hold 2. Shrink toward the left of the dictionary.",
            },
            {
              do: "Trace: mid=2 is 2, ans=2, right=1. Next mid=0 is 1, left=1. Next mid=1 is 2, ans=1, right=0. Then left>right. ans=1.",
              why: "Index 1 is the first 2. We did not stop at the first hit.",
            },
            {
              do: "Last occurrence is the mirror: on equal, record and set left=mid+1.",
              why: "Same idea, shrink toward the right end of the run.",
            },
          ],
          result: "Leftmost 2 is index 1. On a hit, keep searching the left half.",
        },
        {
          title: "Unsorted array: binary search lies",
          prompt:
            "Array [9, 1, 7, 3, 5], search 3 with the same mid logic. What can happen? What must you do first?",
          language: "java",
          code: `// not sorted
// left=0, right=4, mid=2, a[2]=7
// 3<7 so discard the right half [3,5]  -- but 3 lives there
// then search [9,1,7] and miss`,
          steps: [
            {
              do: "First mid is index 2, value 7. The code thinks ‘3<7 so throw away indexes 3 and 4’.",
              why: "That discard is only legal if everything to the right of mid is ≥ 7. A shuffled dictionary lies.",
            },
            {
              do: "Here index 3 holds 3 — the key you just threw away. Later the loop misses.",
              why: "The rule ‘left half ≤ mid ≤ right half’ is false on an unsorted array.",
            },
            {
              do: "Fix: sort first (n log n) then binary search (log n), or just scan in O(n) if you search once.",
              why: "Sorting to search once is usually slower than a linear scan.",
            },
            {
              do: "Exam: if they did not say the array is sorted, do not tick binary search.",
              why: "Sorted is part of the pre-condition, not a detail.",
            },
          ],
          result: "May miss 3 after discarding the half that held it. Sort first, or use linear search.",
        },
        {
          title: "How many compares: n=16",
          prompt:
            "n=16, worst-case binary search. About how many mid checks until left>right? Contrast linear search.",
          language: "python",
          code: `# n=16, each step halves
# 16 -> 8 -> 4 -> 2 -> 1 -> empty
# about log2(16)+1 = 5 compares worst case
# linear worst case = 16`,
          steps: [
            {
              do: "A window of 16 becomes at most 8, then 4, then 2, then 1, then empty. That is 5 mid checks in the worst miss.",
              why: "Halving 16 down to 1 is log₂ 16 = 4 steps, plus the last compare on the singleton.",
            },
            {
              do: "Linear search worst case looks at all 16 cells (key absent or at the end).",
              why: "No discard. Every cell is a candidate until you see it.",
            },
            {
              do: "n=10⁹ still about 30 binary compares. Linear would be a billion.",
              why: "Log grows slowly. That is the point of opening the dictionary in the middle.",
            },
            {
              do: "Write Θ(log n) time, Θ(1) extra space for the loop (recursion would use Θ(log n) stack).",
              why: "The exam wants the bound and the sorted pre-condition.",
            },
          ],
          result: "About 5 compares for n=16 worst case. Linear is 16. Binary search is Θ(log n) on a sorted array.",
        },
      ],
    },
  ],
};
