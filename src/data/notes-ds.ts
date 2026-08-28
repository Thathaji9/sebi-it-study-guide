import type { TopicNote } from "@/data/notes";

export const notesDs: TopicNote = {
  topic: "ds",
  title: "Data structures — techniques (beginner)",
  blurb:
    "A stack is LIFO: the last number you pushed is the first one you pop. Postfix uses that rule. A queue is FIFO: the first in is the first out. BST inorder prints keys sorted. A heap is a complete tree in an array; parent beats children, but inorder is not sorted. A hash table is expected O(1) search if the hash spreads keys out.",
  blocks: [
    {
      heading: "Stack LIFO — postfix evaluation",
      body: "A stack is last-in, first-out. Push adds on top. Pop removes the top. Each operation is Θ(1).\n\nPostfix (Reverse Polish) is the exam dry-run. Scan tokens left to right. A number is pushed. An operator pops two values: the first pop is the right operand, the second pop is the left operand. Push the result. At the end the stack holds one number — the answer. Write the stack after every token. Peak depth is the capacity you needed.",
      howTo: [
        "Scan tokens left to right.",
        "Number → push.",
        "Operator → pop right, pop left, apply, push the result.",
        "After each token write the stack from bottom to top. The last remaining number is the value.",
      ],
      bullets: [
        "LIFO. First pop is the right operand.",
        "Well-formed postfix of n numbers and n−1 operators ends with one value.",
        "Peak depth, not n, is the needed capacity.",
      ],
      examples: [
        {
          title: "Evaluate 5 1 2 + 4 * + 3 −",
          prompt: "Show the stack after each token. What is the value? What was the peak depth?",
          language: "python",
          code: `tokens = ["5", "1", "2", "+", "4", "*", "+", "3", "-"]
st = []
for t in tokens:
    if t not in "+-*/":
        st.append(int(t))
    else:
        b = st.pop()
        a = st.pop()
        if t == "+":
            st.append(a + b)
        elif t == "-":
            st.append(a - b)
        elif t == "*":
            st.append(a * b)
        else:
            st.append(a // b)
    print(t, st)
print(st[-1])`,
          steps: [
            {
              do: "Token 5: push. Stack is 5. Token 1: stack is 5, 1. Token 2: stack is 5, 1, 2.",
              why: "A number always goes on the stack. Depth is now 3.",
            },
            {
              do: "Token +: pop right=2, left=1, push 3. After token + the stack is 5, 3.",
              why: "An operator pops two, uses left op right, and pushes one. Net depth −1.",
            },
            {
              do: "Token 4: stack is 5, 3, 4. Token *: pop right=4, left=3, push 12. After token * the stack is 5, 12.",
              why: "That 12 is (1+2)×4. LIFO gave us 4 as the right operand.",
            },
            {
              do: "Token +: stack is 17. Token 3: stack is 17, 3. Token −: pop right=3, left=17, push 14. Stack is 14. Peak depth was 3.",
              why: "Final size 1 is the value. Peak depth is the array capacity you needed.",
            },
          ],
          result: "Value 14. Snapshots: [5] → [5,1] → [5,1,2] → [5,3] → [5,3,4] → [5,12] → [17] → [17,3] → [14]. Peak depth 3.",
        },
        {
          title: "Right vs left operand on a minus",
          prompt: "Postfix 9 5 −. What is the result, and which pop is 5?",
          language: "java",
          code: `// stack after 9: [9]
// stack after 5: [9, 5]
// pop -> 5 (right), pop -> 9 (left), push 9-5=4`,
          steps: [
            {
              do: "Push 9. Stack is 9. Push 5. Stack is 9, 5.",
              why: "Operands wait on the stack until their operator arrives.",
            },
            {
              do: "Minus: first pop is 5 (right). Second pop is 9 (left).",
              why: "The top of a LIFO stack is the most recent number, which is the right operand.",
            },
            {
              do: "9 − 5 = 4. Stack is 4. Not 5 − 9.",
              why: "Reversing left and right is the usual minus/divide bug.",
            },
            {
              do: "Infix 9-5 matches this postfix. Infix 5-9 would be 5 9 −.",
              why: "Order of pushes is the in-order of the numbers. The operator comes after both.",
            },
          ],
          result: "4. First pop is the right operand 5.",
        },
        {
          title: "Matching brackets are the same LIFO rule",
          prompt: "Is ‘([{}])()’ balanced? Is ‘([)]’ balanced? Why is a queue the wrong ADT?",
          language: "cpp",
          code: `bool ok(string s) {
    vector<char> st;
    string open = "([{", close = ")]}";
    for (char c : s) {
        if (open.find(c) != string::npos) st.push_back(c);
        else {
            if (st.empty()) return false;
            char o = st.back(); st.pop_back();
            if (open.find(o) != close.find(c)) return false;
        }
    }
    return st.empty();
}`,
          steps: [
            {
              do: "([{}])(): push (, [, {. After the three opens the stack is (, [, {.",
              why: "An opening bracket waits on the stack until its closer arrives.",
            },
            {
              do: "Then } pops {, ] pops [, ) pops (, () pops the last pair. Stack empty → balanced.",
              why: "The most recently opened bracket must close first. That is LIFO.",
            },
            {
              do: "([)]: push (, push [. Then ) wants the top, which is [, but ) pairs with (. Fail.",
              why: "A mismatch at pop means the closer does not match the latest opener.",
            },
            {
              do: "A queue would close the oldest opener first, which is not how brackets nest.",
              why: "Nested structure is a stack problem, not a FIFO problem.",
            },
          ],
          result: "‘([{}])()’ is balanced. ‘([)]’ fails. Matching brackets need a stack.",
        },
      ],
    },
    {
      heading: "Queue FIFO",
      body: "A queue is first-in, first-out. Enqueue adds at the rear. Dequeue removes the front. A linked queue with head and tail pointers is Θ(1) per operation. A circular array uses (i+1)%C so free slots at the front can be reused.\n\nBFS uses a queue. Printers and buffers use a queue. A priority queue is not FIFO — that is a heap. A linear array that only grows rear wastes slots after dequeue; circular wrap is the cure.",
      howTo: [
        "Enqueue: write at rear, then rear = (rear+1)%C (circular) or tail = new node.",
        "Dequeue: read at front, then front = (front+1)%C or head = head.next.",
        "Empty: front==rear (reserved-slot scheme) or size==0. Full: (rear+1)%C==front or size==C.",
        "Trace BFS with a queue: the oldest waiting vertex is processed next.",
      ],
      bullets: [
        "FIFO. Linked head+tail or circular array: Θ(1) enqueue/dequeue.",
        "BFS, buffers, printers. Not a priority queue.",
        "Linear queue without wrap wastes space after dequeue.",
      ],
      examples: [
        {
          title: "Circular queue wrap-around",
          prompt:
            "Capacity C=5, reserved-slot full test, start empty front=rear=0. Enqueue 10,20,30,40. Dequeue twice. Enqueue 50,60. Does 60 succeed? Live elements?",
          language: "java",
          code: `int C = 5;
Integer[] a = new Integer[C];
int front = 0, rear = 0;
// empty: front==rear
// full:  (rear+1)%C == front
// enq: a[rear]=x; rear=(rear+1)%C
// deq: x=a[front]; front=(front+1)%C`,
          steps: [
            {
              do: "Enqueue 10,20,30,40. After those four the array is [10,20,30,40,_], front=0, rear=4. (4+1)%5==front so full at size 4.",
              why: "Reserved-slot: max live size is C−1. The fifth physical slot stays empty on purpose.",
            },
            {
              do: "Dequeue twice: 10 then 20. After the second dequeue front=2, rear=4. Live 30,40.",
              why: "Dequeue moves front. Old 10 and 20 are stale, outside the live window.",
            },
            {
              do: "Enqueue 50: a[4]=50, rear=0. Enqueue 60: a[0]=60, rear=1. After 60 the live cells are 30,40,50,60. front=2, rear=1, full again.",
              why: "rear wrapped to 0 and reused the slots dequeue had freed.",
            },
            {
              do: "60 succeeded. A non-circular array would have said ‘rear at the end’ and rejected 60 with two free slots at the front.",
              why: "Wrap-around is the definition of a ring buffer.",
            },
          ],
          result: "60 wraps into index 0. Live 30,40,50,60. front=2, rear=1, full. Max live size C−1=4.",
        },
        {
          title: "BFS queue vs DFS stack after expanding A",
          prompt:
            "Graph A→B, A→C. Neighbours alphabetical. After expanding A, what is the BFS queue? What is the DFS stack if we push reversed?",
          language: "python",
          code: `from collections import deque
g = {"A": ["B", "C"], "B": [], "C": []}
q = deque(["A"])
u = q.popleft()
for v in g[u]:
    q.append(v)
print("bfs", list(q))
st = ["A"]
u = st.pop()
for v in reversed(g[u]):
    st.append(v)
print("dfs", st)`,
          steps: [
            {
              do: "BFS: dequeue A, enqueue B then C. After expanding A the queue is B, C.",
              why: "FIFO: B was first in, so B is processed next.",
            },
            {
              do: "DFS: pop A, push C then B. After expanding A the stack is C, B with B on top.",
              why: "LIFO: B is processed next so we go deep into B before C.",
            },
            {
              do: "Same neighbours, different end. BFS stays wide. DFS goes deep.",
              why: "The ADT is the algorithm.",
            },
            {
              do: "A printer queue is the BFS picture: first job submitted is first printed.",
              why: "FIFO matches fairness-by-arrival, not priority.",
            },
          ],
          result: "BFS queue [B, C]. DFS stack [C, B] (B on top).",
        },
        {
          title: "Linear queue that forgets to wrap",
          prompt:
            "Capacity 4, front=0, rear=0, no wrap. Enqueue A,B,C,D. Dequeue A,B. Can you enqueue E?",
          language: "python",
          code: `# linear: rear only grows
# after 4 enqueues rear==4, 'full'
# after 2 dequeues front==2, two slots free at 0 and 1
# without wrap, E is still rejected`,
          steps: [
            {
              do: "Four enqueues fill indexes 0..3, rear=4. The linear implementation reports full.",
              why: "It treats ‘rear hit capacity’ as full, not ‘size==capacity’.",
            },
            {
              do: "Two dequeues move front to 2. Live data sits at 2,3. Slots 0 and 1 are free.",
              why: "Dequeue freed space at the front.",
            },
            {
              do: "Without wrap, enqueue E still sees rear=4 and fails.",
              why: "The queue pretends to be full at size 2. That is memory wastage.",
            },
            {
              do: "Circular rear=(rear+1)%4 reuses index 0. E would succeed.",
              why: "The cure is wrap-around, not a bigger array.",
            },
          ],
          result: "Linear queue rejects E even with two free slots. Circular queue accepts E.",
        },
      ],
    },
    {
      heading: "BST — inorder is sorted",
      body: "A binary search tree stores keys so that every left subtree is smaller than the node and every right subtree is larger. Search and insert walk one root-to-leaf path. On a balanced tree that path is Θ(log n). Sorted inserts into a plain BST make a chain of height Θ(n).\n\nInorder (left, node, right) always emits keys in sorted order. That is the BST theorem. Preorder is the insert fingerprint of that shape. A heap is not a BST: parent beats children, but left versus right is free, so inorder of a heap is not sorted.",
      howTo: [
        "Insert: from the root, go left if key < node, right if key > node, hang the new node on a null child.",
        "Search: the same walk. Miss at null.",
        "To list sorted keys: inorder — fully left, print, fully right.",
        "If the insert sequence was already sorted, draw a spine and tick Θ(n) search, not Θ(log n).",
      ],
      bullets: [
        "Left < node < right. Inorder = sorted keys.",
        "Balanced Θ(log n). Skewed Θ(n).",
        "Heap ≠ BST. AVL/red-black = BST + height cap.",
      ],
      examples: [
        {
          title: "Insert 50, 30, 70, 20, 40, 60, 80 then inorder",
          prompt: "Draw the tree. List inorder. Why is it sorted?",
          language: "python",
          code: `class N:
    def __init__(self, k):
        self.k, self.l, self.r = k, None, None
def insert(root, k):
    if root is None:
        return N(k)
    if k < root.k:
        root.l = insert(root.l, k)
    else:
        root.r = insert(root.r, k)
    return root
def inorder(t, acc):
    if t:
        inorder(t.l, acc)
        acc.append(t.k)
        inorder(t.r, acc)
root = None
for k in [50, 30, 70, 20, 40, 60, 80]:
    root = insert(root, k)
acc = []
inorder(root, acc)
print(acc)`,
          steps: [
            {
              do: "50 is root. 30 left of 50. 70 right of 50.",
              why: "Each insert walks the BST rule from the root and hangs on a null child.",
            },
            {
              do: "20 left of 30. 40 right of 30. 60 left of 70. 80 right of 70. Shape: 50 with left 30 (20,40) and right 70 (60,80).",
              why: "Every left child is smaller, every right child is larger.",
            },
            {
              do: "Inorder left-node-right: 20, 30, 40, 50, 60, 70, 80.",
              why: "Inorder of a BST is sorted by the left < node < right invariant.",
            },
            {
              do: "Preorder would be 50, 30, 20, 40, 70, 60, 80 — the insert fingerprint, not sorted.",
              why: "Only inorder is the sorted listing. Do not confuse the two.",
            },
          ],
          result: "Inorder 20 30 40 50 60 70 80. Tree is balanced height 2.",
        },
        {
          title: "Search 40 vs 45 — only the path is touched",
          prompt: "In that tree, which keys are compared for 40 and for 45?",
          language: "java",
          code: `Node cur = root;
while (cur != null) {
    if (key == cur.k) return cur;
    cur = (key < cur.k) ? cur.left : cur.right;
}`,
          steps: [
            {
              do: "Search 40: 40<50 go left, 40>30 go right, 40==40 hit. Compared 50, 30, 40.",
              why: "A BST search only walks one path. Other branches are skipped.",
            },
            {
              do: "Search 45: 45<50 left, 45>30 right, 45>40 go to 40’s right, which is null. Miss. Compared 50, 30, 40.",
              why: "A miss is a null child, not a full scan.",
            },
            {
              do: "Nodes 20, 60, 70, 80 were never looked at.",
              why: "That pruning is the BST point versus an unsorted array.",
            },
            {
              do: "n=7, height 3 ≈ log₂ 8. If inserts had been 20,30,40,… the path would be Θ(n).",
              why: "Θ(log n) needs a short tree, not only the BST property.",
            },
          ],
          result: "Both searches compare 50, 30, 40 only. 40 hits. 45 misses at null.",
        },
        {
          title: "Sorted inserts make a spine — inorder still sorted",
          prompt: "Insert 10, 20, 30, 40 into an empty BST. Height? Inorder? Search cost for 40?",
          language: "python",
          code: `# 10
#   20
#     30
#       40
# inorder still 10,20,30,40
# search 40 takes 4 compares`,
          steps: [
            {
              do: "Each new key is larger than all existing keys, so it always hangs as a right child. Spine 10-20-30-40.",
              why: "A plain BST does not rotate. Sorted input degenerates to a list.",
            },
            {
              do: "Inorder is still 10, 20, 30, 40.",
              why: "The BST property holds. Correctness survived. Height died.",
            },
            {
              do: "Search 40 compares 10, 20, 30, 40 — four steps, Θ(n).",
              why: "Worst-case search is the height. Here height is n−1.",
            },
            {
              do: "AVL/red-black would rotate. A heap would not keep inorder sorted.",
              why: "Tick Θ(n) for an ordinary BST on sorted input, not Θ(log n).",
            },
          ],
          result: "Right spine, height 3, inorder 10 20 30 40, search 40 in 4 compares, Θ(n).",
        },
      ],
    },
    {
      heading: "Heap — complete tree, parent beats children",
      body: "A max-heap is a complete binary tree (filled left to right) where every parent is ≥ its children. A min-heap flips the inequality. Completeness lets us use an array: index i has left 2i+1, right 2i+2, parent floor((i−1)/2) (0-based). Height is always Θ(log n).\n\nInsert: append at the end, sift up. Extract-max: swap root with the last leaf, shrink, sift down. Build-heap bottom-up is Θ(n), not Θ(n log n). Inorder of a heap is not sorted. A heap is a priority queue, not a search tree.",
      howTo: [
        "Check completeness (no holes on a level except the last, packed left) and the parent ≥ children rule (max-heap).",
        "Insert: write the new key at the next array slot, swap with parent while it is larger.",
        "Extract-max: answer is a[0]. Move a[n-1] to a[0], n--, sift down along the larger child.",
        "Do not read inorder and expect sorted keys. Peek min/max is the root.",
      ],
      bullets: [
        "Complete tree in an array. Parent ≥ children (max-heap).",
        "Insert / extract Θ(log n). Build-heap Θ(n).",
        "Not a BST: inorder is not sorted.",
      ],
      examples: [
        {
          title: "Insert 15 into [10, 7, 8, 3, 2, 4]",
          prompt: "Max-heap array [10, 7, 8, 3, 2, 4]. Insert 15. Array after each sift-up swap?",
          language: "java",
          code: `int[] a = {10, 7, 8, 3, 2, 4, 0};
int n = 6;
a[n] = 15;
n++;
int i = n - 1;
while (i > 0 && a[(i - 1) / 2] < a[i]) {
    int p = (i - 1) / 2;
    int t = a[i];
    a[i] = a[p];
    a[p] = t;
    i = p;
}`,
          steps: [
            {
              do: "Append 15 at index 6. After the append the array is 10, 7, 8, 3, 2, 4, 15. Parent of 6 is 2 (value 8).",
              why: "Insert always grows the complete tree by one leaf at the end.",
            },
            {
              do: "15>8, swap. After that swap the array is 10, 7, 15, 3, 2, 4, 8. i moves to 2. Parent is 0 (value 10).",
              why: "Sift up while the child beats the parent.",
            },
            {
              do: "15>10, swap. After that swap the array is 15, 7, 10, 3, 2, 4, 8. i is the root. Stop.",
              why: "The root has no parent. Two swaps, Θ(height)=Θ(log n).",
            },
            {
              do: "15 ≥ 7 and 10. Heap property restored. Inorder would not be sorted (7 then 15 then 3…).",
              why: "A heap only orders parent versus children, not left versus right.",
            },
          ],
          result: "[15, 7, 10, 3, 2, 4, 8]. Sift-up path 6→2→0.",
        },
        {
          title: "Extract-max from that heap",
          prompt: "One extract-max on [15, 7, 10, 3, 2, 4, 8]. New root and remaining heap?",
          language: "cpp",
          code: `// pop 15; last leaf 8 moves to root; n = 6
// [8,7,10,3,2,4]; sift down
// children 7 and 10, swap with 10 -> [10,7,8,3,2,4]
// index 2=8, left child 4, 8>4 stop`,
          steps: [
            {
              do: "The max is the root 15. Swap with last leaf 8, shrink n to 6. After the swap the heap array is 8, 7, 10, 3, 2, 4.",
              why: "Extract-max always takes a[0] and repairs by sifting the last leaf down.",
            },
            {
              do: "Sift down i=0: children 7 and 10. Larger child 10 > 8, swap. After that swap the array is 10, 7, 8, 3, 2, 4.",
              why: "Sift down along the larger child so the parent-beats-children rule returns.",
            },
            {
              do: "i=2 holds 8. Only child 4. 8≥4, stop.",
              why: "A node that already beats its children is done.",
            },
            {
              do: "Extracted 15. Remaining max-heap [10, 7, 8, 3, 2, 4]. Cost Θ(log n).",
              why: "n extracts in decreasing order is heap-sort’s second phase.",
            },
          ],
          result: "Extracted 15. Remaining [10, 7, 8, 3, 2, 4].",
        },
        {
          title: "Build-heap is linear; n inserts are not",
          prompt:
            "n keys already in an array versus n inserts into an empty heap. Θ bounds?",
          language: "python",
          code: `# n inserts: sum log k = Theta(n log n)
# bottom-up heapify: most nodes are near the leaves, sift-down is short
# work = Theta(n)
# last non-leaf index = n//2 - 1 (0-based)`,
          steps: [
            {
              do: "n inserts: the k-th insert sifts up O(log k). Sum is Θ(n log n).",
              why: "Leaves are inserted last and may travel the full height.",
            },
            {
              do: "Bottom-up: call sift-down on every non-leaf from the last parent down to the root. Half the nodes are leaves and do no work.",
              why: "Most sifts are short. The geometric sum of heights is Θ(n).",
            },
            {
              do: "Exam trap: ‘creating a heap is always n log n’. False for Floyd’s bottom-up method.",
              why: "True only if the only primitive you use is insert.",
            },
            {
              do: "Use bottom-up when the array is already filled. Use insert when keys stream in.",
              why: "Same ADT, two construction costs.",
            },
          ],
          result: "n inserts Θ(n log n). Bottom-up heapify Θ(n).",
        },
      ],
    },
    {
      heading: "Hash table — expected O(1)",
      body: "A hash table maps a key to a bucket with h(k). Under a uniform hash, insert, search, and delete are expected Θ(1). Worst case is Θ(n) if every key collides. Load factor α = n/m. Rehash when α gets high.\n\nChaining stores a list in each bucket; α may exceed 1. Open addressing stores keys in the array itself; α must stay < 1. A hash table does not keep keys sorted. Need min / inorder → BST. Need extract-max → heap. Need exact id → hash.",
      howTo: [
        "Compute the home bucket h(k) mod m.",
        "If the slot/list is empty, put the key there (O(1)). If not, walk the chain or the probe sequence.",
        "Expected chain length is about α. That is why search is expected O(1+α).",
        "If the question needs order or min/max, do not pick a hash table.",
      ],
      bullets: [
        "Expected O(1) insert/search/delete; worst O(n); unordered.",
        "α = n/m. Chaining allows α>1. Open addressing needs α<1.",
        "Not a priority queue and not a sorted map.",
      ],
      examples: [
        {
          title: "Chaining: h(k)=k mod 7",
          prompt:
            "Insert 50, 700, 76, 85, 92 into 7 buckets, prepend on collide. Where is 92? Cost to search 92? Cost to miss 33?",
          language: "python",
          code: `m = 7
b = [[] for _ in range(m)]
for k in [50, 700, 76, 85, 92]:
    b[k % 7].insert(0, k)
print(b)`,
          steps: [
            {
              do: "50%7=1 → bucket 1: [50]. 700%7=0 → [700]. 76%7=6 → [76].",
              why: "Home bucket is k mod m. Empty bucket insert is O(1).",
            },
            {
              do: "85%7=1, collide, prepend: bucket 1 is [85, 50]. 92%7=1, prepend: bucket 1 is [92, 85, 50].",
              why: "Chaining keeps all colliding keys in one list. α may exceed 1.",
            },
            {
              do: "Search 92 hashes to 1, first node is 92, one comparison — expected O(1) when chains are short.",
              why: "Expected cost is O(1+α), not a full table scan.",
            },
            {
              do: "Search 33: 33%7=5, bucket empty, miss in O(1). Worst case would be every key in one bucket, Θ(n).",
              why: "O(1) is expected, not guaranteed. Adversarial keys can collide.",
            },
          ],
          result: "92 is at the head of bucket 1. Hit 92 in one step. Miss 33 on empty bucket 5. Expected O(1).",
        },
        {
          title: "Which structure: search id, smallest id, highest priority",
          prompt:
            "(i) search a given id (ii) the smallest id (iii) extract the highest priority. Hash vs BST vs heap, expected times.",
          language: "java",
          code: `// (i) HashMap expected O(1)
// (ii) TreeSet.first() O(log n); hash must scan O(n)
// (iii) max-heap extract O(log n); hash must scan O(n)`,
          steps: [
            {
              do: "Exact id, no order: hash table, expected Θ(1).",
              why: "Hashing is built for ‘this key, this bucket’.",
            },
            {
              do: "Smallest id: BST leftmost Θ(log n), or min-heap peek Θ(1) if the heap is keyed by id. Hash must scan Θ(n).",
              why: "A hash table has no left-to-right order.",
            },
            {
              do: "Highest priority extract: max-heap Θ(log n). Hash keyed by id cannot extract max without a scan.",
              why: "A heap’s invariant is parent ≥ children. A hash has no such root.",
            },
            {
              do: "One structure rarely wins all three. Combine a HashMap with a heap of handles if you need both.",
              why: "Pick the invariant that matches the query.",
            },
          ],
          result: "(i) hash expected O(1) (ii) BST or min-heap (iii) max-heap. Hash loses min/max.",
        },
        {
          title: "Collision: chaining vs linear probing for key 42",
          prompt:
            "m=10, h(k)=k mod 10. Slot 2 already holds 12. Insert 42. Where does it go in chaining? In linear probing?",
          language: "python",
          code: `# chaining: bucket 2 list becomes [42, 12] (prepend)
# linear probing: slot 2 full, try 3, 4, ... first hole
# later search of 42: chaining looks only at bucket 2
# probing walks 2, 3, ... until 42 or a hole`,
          steps: [
            {
              do: "h(42)=2, same as h(12)=2. Collision.",
              why: "Two keys, one home slot. Hashing does not avoid all collisions.",
            },
            {
              do: "Chaining: attach 42 in bucket 2’s list. Slot 3 is untouched. Search 42 hashes to 2 and walks that list. Expected O(1+α).",
              why: "Other keys that hash elsewhere are not slowed.",
            },
            {
              do: "Linear probing: slot 2 full, store 42 at the first open slot (usually 3). Search walks from 2 until 42 or a hole.",
              why: "Open addressing stores the key in the table array. α must stay < 1.",
            },
            {
              do: "Both still expected O(1) at low load. A long linear cluster makes nearby keys slow. That is why probing rehashes earlier than chaining.",
              why: "O(1) is about load factor and a good hash, not about never colliding.",
            },
          ],
          result: "Chaining keeps 42 in bucket 2’s list. Linear probing parks it in the next free slot after 2. Expected search stays O(1) if α is small.",
        },
      ],
    },
  ],
};
