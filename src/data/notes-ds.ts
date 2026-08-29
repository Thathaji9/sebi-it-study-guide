import type { TopicNote } from "@/data/notes";

export const notesDs: TopicNote = {
  topic: "ds",
  title: "Data structures — simple notes",
  blurb:
    "We explain data structures like class notes a Class-10 student can read: a stack of plates, a ticket line, a family tree, a loud pyramid, a locker number, treasure-map arrows, nested labelled boxes. Then we solve five tiny examples in each topic, one push or one pointer at a time.",
  blocks: [
    {
      heading: "Stack — plates, and postfix",
      body: "Picture a stack of plates in a canteen. You put a clean plate on top. You take a plate from the top. The last plate you put on is the first you take off (LIFO). Push adds on top. Pop removes the top. Each job is Θ(1).\n\nOn the exam, postfix (Reverse Polish) is that plate rule as a dry-run. Scan tokens left to right. A number is pushed. An operator pops two values: the first pop is the right operand, the second pop is the left operand. Push the result. At the end the stack holds one number — the answer. Write the stack after every token. Peak depth is the capacity you needed. Matching brackets are the same last-on, first-off rule. A queue would close the oldest opener first, which is not how brackets nest.",
      howTo: [
        "Scan tokens left to right.",
        "Number → put a plate on top (push).",
        "Operator → pop right, pop left, apply, push the result.",
        "After each token write the stack from bottom to top. The last remaining number is the value.",
        "Peak depth, not n, is the array capacity you needed.",
        "Matching brackets: push an opener, pop only if the closer matches the top plate.",
      ],
      bullets: [
        "Stack = plates. Last on, first off. First pop is the right operand.",
        "Well-formed postfix of n numbers and n−1 operators ends with one value.",
        "Peak depth, not n, is the needed capacity.",
        "Matching brackets need a stack, not a ticket line.",
        "Infix to postfix uses the same plate stack for operators (tighter op sits on top).",
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
              why: "A number always goes on the plate pile. Depth is now 3.",
            },
            {
              do: "Token +: pop right=2, left=1, push 3. After token + the stack is 5, 3.",
              why: "An operator pops two plates, uses left op right, and pushes one. Net depth −1.",
            },
            {
              do: "Token 4: stack is 5, 3, 4. Token *: pop right=4, left=3, push 12. After token * the stack is 5, 12.",
              why: "That 12 is (1+2)×4. The top plate was 4, so 4 is the right operand.",
            },
            {
              do: "Token +: stack is 17. Token 3: stack is 17, 3. Token −: pop right=3, left=17, push 14. Stack is 14. Peak depth was 3.",
              why: "Final size 1 is the value. Peak depth is how many plates you needed at once.",
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
              why: "Numbers wait on the plate pile until their operator arrives.",
            },
            {
              do: "Minus: first pop is 5 (right). Second pop is 9 (left).",
              why: "The top plate is the most recent number, which is the right operand.",
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
              why: "An opening bracket waits on the plate pile until its closer arrives.",
            },
            {
              do: "Then } pops {, ] pops [, ) pops (, () pops the last pair. Stack empty → balanced.",
              why: "The most recently opened bracket must close first. That is last-plate-off.",
            },
            {
              do: "([)]: push (, push [. Then ) wants the top, which is [, but ) pairs with (. Fail.",
              why: "A mismatch at pop means the closer does not match the latest opener.",
            },
            {
              do: "A queue would close the oldest opener first, which is not how brackets nest.",
              why: "Nested structure is a plate problem, not a ticket-line problem.",
            },
          ],
          result: "‘([{}])()’ is balanced. ‘([)]’ fails. Matching brackets need a stack.",
        },
        {
          title: "Peak depth is the capacity, not n",
          prompt:
            "Postfix 1 2 3 4 + + +. Four numbers, three pluses. Peak stack depth? Contrast 1 2 + 3 + 4 +.",
          language: "python",
          code: `# 1 2 3 4 + + +   peak depth 4
# 1 2 + 3 + 4 +   peak depth 2`,
          steps: [
            {
              do: "1 2 3 4 + + +: after the four numbers the stack is 1, 2, 3, 4. Peak depth 4. Then each + shrinks by one, down to 10.",
              why: "All operands arrived before any operator. You needed four plates at once.",
            },
            {
              do: "1 2 + 3 + 4 +: after 1 2 the depth is 2, + makes 3, push 3 depth 2, + makes 6, push 4 depth 2, + makes 10. Peak 2.",
              why: "Each operator cleaned two numbers before the next operand arrived.",
            },
            {
              do: "Both expressions use 4 numbers. Capacity is the peak, not n.",
              why: "Exam: ‘how big an array for this postfix?’ → peak plate count.",
            },
            {
              do: "Well-formed postfix of n numbers and n−1 operators still ends with one value in both traces.",
              why: "Ending size 1 is correctness. Peak is the memory question.",
            },
          ],
          result: "Peak 4 versus peak 2. Same n=4, different capacity. Size the stack to the peak.",
        },
        {
          title: "Infix to postfix with an operator stack",
          prompt:
            "Convert 3 + 4 * 5 to postfix. * binds tighter than +. Show the operator stack after each token.",
          language: "python",
          code: `# tokens 3 + 4 * 5
# 3          out 3        ops []
# +          out 3        ops [+]
# 4          out 3 4      ops [+]
# *          out 3 4      ops [+ *]   * beats +
# 5          out 3 4 5    ops [+ *]
# flush      out 3 4 5 * +`,
          steps: [
            {
              do: "Numbers go straight to the output. 3 then later 4 then 5.",
              why: "Postfix keeps operands in the same order. Only operators move.",
            },
            {
              do: "+: operator stack empty, push +. Then *: * has higher precedence, so it sits on top of +. Stack is +, *.",
              why: "A tighter operator must wait closer to its operands, as the top plate.",
            },
            {
              do: "End of input: pop * then +. Output 3 4 5 * +.",
              why: "Flush the plates so * (the top) is applied before +.",
            },
            {
              do: "Check: postfix 3 4 5 * + = 3+(4*5)=23, not (3+4)*5. The stack encoded precedence.",
              why: "That is the same plate rule as evaluation, run in reverse for conversion.",
            },
          ],
          result: "Postfix 3 4 5 * +. Operator stack after *: [+, *]. Flush * then +.",
        },
      ],
    },
    {
      heading: "Queue — a ticket line",
      body: "Picture a ticket line. The first person who joined is the first served (FIFO). Enqueue adds at the rear. Dequeue removes the front. A linked queue with head and tail pointers is Θ(1) per job. A circular array uses (i+1)%C so free slots at the front can be reused.\n\nOn the exam, BFS uses this ticket line. Printers and buffers use a queue. A priority queue is not FIFO — that is a heap (a loud pyramid). A linear array that only grows rear wastes slots after dequeue; circular wrap is the cure. Reserved-slot full test: max live size is C−1. A size counter can fill all C slots.",
      howTo: [
        "Enqueue: write at rear, then rear = (rear+1)%C (circular) or tail = new node.",
        "Dequeue: read at front, then front = (front+1)%C or head = head.next.",
        "Empty: front==rear (reserved-slot scheme) or size==0. Full: (rear+1)%C==front or size==C.",
        "Trace BFS with a queue: the oldest waiting room is processed next.",
        "A printer is a ticket line: first job in is first printed. A stack would print the last job first.",
        "Without wrap, dequeue frees the front but a linear rear still says ‘full’. Circular wrap reuses those slots.",
      ],
      bullets: [
        "Queue = ticket line. First in, first out.",
        "Linked head+tail or circular array: Θ(1) enqueue/dequeue.",
        "BFS, buffers, printers. Not a priority queue (that is a heap).",
        "Linear queue without wrap wastes space after dequeue.",
        "Reserved-slot max live is C−1. Size-counter max live is C.",
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
              why: "Take-from-front moves front. Old 10 and 20 are stale, outside the live window.",
            },
            {
              do: "Enqueue 50: a[4]=50, rear=0. Enqueue 60: a[0]=60, rear=1. After 60 the live cells are 30,40,50,60. front=2, rear=1, full again.",
              why: "rear wrapped to 0 and reused the slots dequeue had freed. That is the ring.",
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
              do: "BFS: take A from the front, put B then C at the back. After expanding A the queue is B, C.",
              why: "Ticket line: B was first in, so B is served next.",
            },
            {
              do: "DFS: pop A, push C then B. After expanding A the stack is C, B with B on top.",
              why: "Plates: B is taken next so we go deep into B before C.",
            },
            {
              do: "Same neighbours, different end. BFS stays wide. DFS goes deep.",
              why: "The picture is the algorithm: fire/ticket line versus maze/plates.",
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
              why: "Take-from-front freed space at the start of the ticket line.",
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
        {
          title: "Reserved-slot full test versus a size counter",
          prompt:
            "C=4. Scheme A: full when (rear+1)%C==front (max live 3). Scheme B: store size, full when size==C (max live 4). After three enqueues from empty, is A full?",
          language: "java",
          code: `// A reserved-slot: live max = C-1
// B size counter: live max = C
// empty both: front==rear and size==0`,
          steps: [
            {
              do: "Empty: front=rear=0. Enqueue three items. rear=3, front=0. (3+1)%4==0 so scheme A says full. Live size 3.",
              why: "One physical slot is kept empty so full and empty are not the same test front==rear.",
            },
            {
              do: "Scheme B: size=3, C=4, not full. You may enqueue a fourth item. Then size==4.",
              why: "The extra integer size tells empty from full, so every slot can hold a value.",
            },
            {
              do: "Both are Θ(1). Pick one invariant and stick to it in the dry-run.",
              why: "Mixing the two tests is how exam traces disagree.",
            },
            {
              do: "Linked queue with head and tail does not need this wrap arithmetic at all.",
              why: "Nodes grow. Empty is head==null. Full is only if memory dies.",
            },
          ],
          result: "Reserved-slot A is full after 3 of 4 slots. Size-counter B still has room. Max live is C−1 versus C.",
        },
        {
          title: "Printer jobs are a queue, not a stack",
          prompt:
            "Jobs arrive A, then B, then C. The printer is FIFO. Print order? What if it were a stack? Which ADT is a priority queue?",
          language: "python",
          code: `from collections import deque
q = deque()
q.append("A"); q.append("B"); q.append("C")
print(q.popleft(), q.popleft(), q.popleft())  # A B C
st = ["A", "B", "C"]
print(st.pop(), st.pop(), st.pop())  # C B A`,
          steps: [
            {
              do: "FIFO queue: dequeue A, then B, then C. First submitted is first printed.",
              why: "Fairness-by-arrival is the ticket-line rule.",
            },
            {
              do: "If the printer were a stack, C would print first (last in, first out). That starves early jobs.",
              why: "Wrong picture. Nested undo is plates; a waiting line is a ticket queue.",
            },
            {
              do: "A priority queue (heap) would print the highest-priority job, which may be B in the middle.",
              why: "That is not FIFO. Do not call a loud pyramid ‘a queue’ on the exam unless they say priority.",
            },
            {
              do: "BFS uses the printer picture: oldest waiting room next. DFS uses the plate picture.",
              why: "Picture = algorithm.",
            },
          ],
          result: "Printer FIFO: A, B, C. Stack would print C, B, A. Priority queue is a heap, not FIFO.",
        },
      ],
    },
    {
      heading: "BST — family tree, left is smaller",
      body: "Picture a family tree where every left child is a smaller number and every right child is a larger number. Search and insert walk one root-to-leaf path, like asking ‘smaller? go left; larger? go right.’ On a balanced tree that path is Θ(log n). Sorted inserts into a plain BST make a chain of height Θ(n).\n\nOn the exam, inorder (left, node, right) always emits keys in sorted order. That is the BST theorem. Preorder is the insert fingerprint of that shape. A heap is not a BST: parent is louder than children, but left versus right is free, so inorder of a heap is not sorted. AVL/red-black = BST + height cap.",
      howTo: [
        "Insert: from the root, go left if key < node, right if key > node, hang the new node on a null child.",
        "Search: the same walk. Miss at null.",
        "To list sorted keys: inorder — fully left, print, fully right.",
        "If the insert sequence was already sorted, draw a spine and tick Θ(n) search, not Θ(log n).",
        "Delete with two children: copy the inorder successor (min of the right subtree), then delete that successor.",
        "Need extract-max → heap. Need sorted listing → BST inorder. Do not mix the pictures.",
      ],
      bullets: [
        "BST = family tree. Left < node < right. Inorder = sorted keys.",
        "Balanced Θ(log n). Skewed Θ(n).",
        "Heap ≠ BST. AVL/red-black = BST + height cap.",
        "Preorder is the insert fingerprint, not the sorted listing.",
        "Two-child delete uses the inorder successor (or predecessor).",
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
              why: "Each insert walks the family-tree rule from the root and hangs on a null child.",
            },
            {
              do: "20 left of 30. 40 right of 30. 60 left of 70. 80 right of 70. Shape: 50 with left 30 (20,40) and right 70 (60,80).",
              why: "Every left child is smaller, every right child is larger.",
            },
            {
              do: "Inorder left-node-right: 20, 30, 40, 50, 60, 70, 80.",
              why: "Inorder of a BST is sorted by the left < node < right rule.",
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
              why: "A BST search only walks one path of the family tree. Other branches are skipped.",
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
              why: "Θ(log n) needs a short tree, not only the left-smaller rule.",
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
              why: "The family-tree rule still holds. Correctness survived. Height died.",
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
        {
          title: "Delete 30: node with two children",
          prompt:
            "Tree from 50, 30, 70, 20, 40. Delete 30. Which key replaces 30? What is inorder after the delete?",
          language: "python",
          code: `# 30 has two children 20 and 40
# inorder successor of 30 is the min of the right subtree = 40
# copy 40 into 30's place, then delete the old 40 (a leaf)
# inorder was 20 30 40 50 70 -> 20 40 50 70`,
          steps: [
            {
              do: "30 has left 20 and right 40. You cannot hang both children on one pointer. Pick the inorder successor (min of the right subtree) = 40.",
              why: "Successor is the next key in sorted order, so it still sits between the left subtree and the rest of the right subtree.",
            },
            {
              do: "Copy 40 into the node that held 30. Then delete the old leaf 40. Shape: 50, left 40 with left 20, right 70.",
              why: "The successor had no left child (it was the min), so deleting it is easy.",
            },
            {
              do: "Inorder 20, 40, 50, 70 — still sorted, 30 is gone.",
              why: "Delete must keep the family-tree rule. Inorder staying sorted is the check.",
            },
            {
              do: "A leaf delete (20) is just a null child. A one-child delete splices that child up. Two children need successor (or predecessor).",
              why: "Three cases. The two-child case is the one exams love.",
            },
          ],
          result: "Replace 30 by successor 40. Inorder 20 40 50 70. BST property kept.",
        },
        {
          title: "Heap inorder is not sorted — BST inorder is",
          prompt:
            "Max-heap array [10, 7, 8, 3, 2]. Draw the tree. Inorder? Why must you not call this a BST?",
          language: "java",
          code: `// tree:     10
//         7    8
//       3  2
// inorder left-node-right: 3, 7, 2, 10, 8  -- not sorted
// 7's right child 2 is smaller than 7, which a BST would forbid`,
          steps: [
            {
              do: "Complete tree: 10 at root, 7 and 8 children, 3 and 2 under 7. Parent ≥ children holds (max-heap).",
              why: "Heap order is vertical: parent is louder. Left versus right is free.",
            },
            {
              do: "Inorder 3, 7, 2, 10, 8 — not sorted.",
              why: "If it were a family-tree BST, inorder would be sorted. It is not, so it is not a BST.",
            },
            {
              do: "2 sits to the right of 7 and is smaller than 7. A BST would have sent 2 left.",
              why: "That single counter-example kills ‘every heap is a BST’.",
            },
            {
              do: "Need sorted listing → BST inorder. Need extract-max → heap. Do not mix the pictures.",
              why: "Same binary tree drawing, two different contracts.",
            },
          ],
          result: "Heap inorder 3,7,2,10,8 (not sorted). BST inorder would be sorted. Heap ≠ BST.",
        },
      ],
    },
    {
      heading: "Heap — a pyramid, parent is louder",
      body: "Picture a pyramid of voices: a parent is always louder than their kids (max-heap). A min-heap flips the rule: parent is quieter. The pyramid is complete — filled left to right, no holes except maybe on the last row, packed left. Completeness lets us use an array: index i has left 2i+1, right 2i+2, parent floor((i−1)/2) (0-based). Height is always Θ(log n).\n\nOn the exam, insert: append at the end, sift up. Extract-max: swap root with the last leaf, shrink, sift down. Build-heap bottom-up is Θ(n), not Θ(n log n). Inorder of a heap is not sorted. A heap is a priority queue, not a search tree. Peek min/max is the root.",
      howTo: [
        "Check completeness (no holes on a level except the last, packed left) and the parent-louder-than-kids rule (max-heap).",
        "Insert: write the new key at the next array slot, swap with parent while it is louder.",
        "Extract-max: answer is a[0]. Move a[n-1] to a[0], n--, sift down along the louder child.",
        "Do not read inorder and expect sorted keys. Peek min/max is the root.",
        "n inserts are Θ(n log n). Bottom-up heapify is Θ(n).",
        "Name min vs max before you sift. Soonest deadline is a min-heap. Highest score is a max-heap.",
      ],
      bullets: [
        "Heap = a pyramid where the parent is louder than the kids (max-heap).",
        "Complete tree in an array. Insert / extract Θ(log n). Build-heap Θ(n).",
        "Not a BST: inorder is not sorted.",
        "Priority queue, not a search tree. Peek is the root.",
        "0-based: parent floor((i−1)/2), left 2i+1, right 2i+2.",
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
              why: "Insert always grows the complete pyramid by one leaf at the end.",
            },
            {
              do: "15>8, swap. After that swap the array is 10, 7, 15, 3, 2, 4, 8. i moves to 2. Parent is 0 (value 10).",
              why: "Sift up while the child is louder than the parent.",
            },
            {
              do: "15>10, swap. After that swap the array is 15, 7, 10, 3, 2, 4, 8. i is the root. Stop.",
              why: "The root has no parent. Two swaps, Θ(height)=Θ(log n).",
            },
            {
              do: "15 ≥ 7 and 10. Heap property restored. Inorder would not be sorted (7 then 15 then 3…).",
              why: "A pyramid only orders parent versus kids, not left versus right.",
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
              why: "Sift down along the louder child so the parent-beats-kids rule returns.",
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
              why: "Leaves are inserted last and may travel the full height of the pyramid.",
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
              why: "Same pyramid, two construction costs.",
            },
          ],
          result: "n inserts Θ(n log n). Bottom-up heapify Θ(n).",
        },
        {
          title: "Array indexes: parent, left, right",
          prompt:
            "0-based heap [15, 7, 10, 3, 2, 4, 8]. Parent of index 6? Children of index 1? Who is the last parent?",
          language: "python",
          code: `a = [15, 7, 10, 3, 2, 4, 8]
n = 7
i = 6
print("parent", (i - 1) // 2, a[(i - 1) // 2])
print("left of 1", 2 * 1 + 1, "right", 2 * 1 + 2)
print("last parent", n // 2 - 1)`,
          steps: [
            {
              do: "Parent of i is floor((i−1)/2). Parent of 6 is 2, value 10.",
              why: "That is the sift-up step when you insert at the end of the pyramid.",
            },
            {
              do: "Left child 2i+1, right 2i+2. Index 1 (value 7) has left 3 (value 3) and right 4 (value 2).",
              why: "Sift-down compares those two kids and swaps with the louder one (max-heap).",
            },
            {
              do: "Last parent is n//2 − 1 = 2 (value 10). Indexes 3,4,5,6 are leaves.",
              why: "Bottom-up heapify starts at the last parent, not at the last leaf.",
            },
            {
              do: "1-based lecture notes use parent i/2, left 2i, right 2i+1. Do not mix the two formulas in one trace.",
              why: "The exam will say 0-based or show an array that starts at index 0.",
            },
          ],
          result: "Parent of 6 is 2 (10). Children of 1 are 3 and 4. Last parent index 2.",
        },
        {
          title: "Min-heap of the same keys",
          prompt:
            "Build a min-heap by inserting 10, 7, 8, 3. After all inserts, what is the root? Extract-min twice?",
          language: "cpp",
          code: `// min-heap: parent <= children
// insert 10 -> [10]
// 7 sifts up -> [7, 10]
// 8 -> [7, 10, 8]
// 3 sifts up past 7 -> [3, 7, 8, 10]
// extract-min: 3, then 7`,
          steps: [
            {
              do: "Min-heap sifts up while the child is quieter than the parent (flip of max-heap).",
              why: "The root must be the quietest key — the smallest number.",
            },
            {
              do: "After 10,7,8,3 the array is [3, 7, 8, 10]. Root 3. Inorder is not sorted (7, 3, 10, 8… depending on shape).",
              why: "Still not a family-tree BST. Only the root is the answer to ‘who is min?’.",
            },
            {
              do: "Extract-min: take 3, move last leaf 10 to root, sift down. Next root is 7. Second extract returns 7.",
              why: "n extracts in order is heap-sort for increasing order on a min-heap.",
            },
            {
              do: "Priority queue of ‘soonest deadline’ is a min-heap. ‘Highest score’ is a max-heap. Same code, flipped compare.",
              why: "Name min vs max before you sift.",
            },
          ],
          result: "Min-heap root 3. Extract-min twice: 3 then 7. Remaining heap rooted at 8.",
        },
      ],
    },
    {
      heading: "Hash table — locker number from a name",
      body: "Picture a bank of lockers. You turn a name into a locker number with h(k). Under a fair hash, insert, search, and delete are expected Θ(1). Worst case is Θ(n) if every key collides into one locker. Load factor α = n/m. Rehash when α gets high.\n\nOn the exam, chaining stores a list in each locker; α may exceed 1. Open addressing stores keys in the array itself; α must stay < 1. A hash table does not keep keys sorted. Need min / inorder → BST family tree. Need extract-max → heap pyramid. Need exact id → hash locker.",
      howTo: [
        "Compute the home locker h(k) mod m.",
        "If the slot/list is empty, put the key there (O(1)). If not, walk the chain or the probe sequence.",
        "Expected chain length is about α. That is why search is expected O(1+α).",
        "If the question needs order or min/max, do not pick a hash table.",
        "Rehash when α grows: new locker = h(k) mod new_m for every key.",
        "O(1) is expected, not guaranteed. Adversarial keys can all share one locker.",
      ],
      bullets: [
        "Hash = locker number from a name. Expected O(1) insert/search/delete; worst O(n); unordered.",
        "α = n/m. Chaining allows α>1. Open addressing needs α<1.",
        "Not a priority queue and not a sorted map.",
        "Exact id → hash. Smallest id → BST or min-heap. Highest priority → max-heap.",
        "A bad hash collapses to one chain of length n.",
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
              do: "50%7=1 → locker 1: [50]. 700%7=0 → [700]. 76%7=6 → [76].",
              why: "Home locker is k mod m. Empty locker insert is O(1).",
            },
            {
              do: "85%7=1, collide, prepend: locker 1 is [85, 50]. 92%7=1, prepend: locker 1 is [92, 85, 50].",
              why: "Chaining keeps all colliding keys in one list. α may exceed 1.",
            },
            {
              do: "Search 92 hashes to 1, first node is 92, one comparison — expected O(1) when chains are short.",
              why: "Expected cost is O(1+α), not a full locker scan.",
            },
            {
              do: "Search 33: 33%7=5, locker empty, miss in O(1). Worst case would be every key in one locker, Θ(n).",
              why: "O(1) is expected, not guaranteed. Nasty keys can collide.",
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
              why: "Lockers are built for ‘this name, this number’.",
            },
            {
              do: "Smallest id: BST leftmost Θ(log n), or min-heap peek Θ(1) if the heap is keyed by id. Hash must scan Θ(n).",
              why: "A locker bank has no left-to-right family-tree order.",
            },
            {
              do: "Highest priority extract: max-heap Θ(log n). Hash keyed by id cannot extract max without a scan.",
              why: "A pyramid’s rule is parent louder than kids. A hash has no such root.",
            },
            {
              do: "One structure rarely wins all three. Combine a HashMap with a heap of handles if you need both.",
              why: "Pick the picture that matches the query.",
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
              why: "Two names, one home locker. Hashing does not avoid all collisions.",
            },
            {
              do: "Chaining: attach 42 in locker 2’s list. Slot 3 is untouched. Search 42 hashes to 2 and walks that list. Expected O(1+α).",
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
        {
          title: "Load factor α = n/m, then rehash",
          prompt:
            "m=8 buckets, n=6 keys, chaining. α? If the table doubles to m=16 and rehashes, what is new α? Why rehash at all?",
          language: "python",
          code: `n, m = 6, 8
alpha = n / m  # 0.75
m2 = 16
alpha2 = n / m2  # 0.375
# rehash: new_bucket = h(k) % m2 for every key`,
          steps: [
            {
              do: "α = 6/8 = 0.75. Expected chain length is about 0.75, so search is still expected a small constant.",
              why: "α is average keys per locker. That is the O(1+α) story.",
            },
            {
              do: "Double m to 16 and recompute h(k) mod 16 for every key. New α = 6/16 = 0.375.",
              why: "Rehash is required because the home locker depends on m. You cannot just copy lists into a bigger bank blindly unless h already used a 2-power trick.",
            },
            {
              do: "If you never rehash, n grows, α grows, chains become Θ(n), and ‘expected O(1)’ dies.",
              why: "Amortised insert stays O(1) if you double occasionally: one Θ(n) pause, then many cheap inserts.",
            },
            {
              do: "Open addressing must rehash before α hits 1 (no empty slot). Chaining may allow α>1 but still rehashes for speed.",
              why: "Full table versus slow table are different failure modes.",
            },
          ],
          result: "α=0.75 then 0.375 after doubling. Rehash so expected chain length stays small.",
        },
        {
          title: "Worst case: every key in one chain",
          prompt:
            "h(k)=k mod 7, but every key is 7, 14, 21, 28 (all ≡ 0). n=4. Search cost for 28? What would a BST cost?",
          language: "java",
          code: `// bucket 0: 28 -> 21 -> 14 -> 7   (prepend)
// search 28 is 1 step (head)
// search 7 is 4 steps = Theta(n)
// BST of the same keys is a spine or balanced; still O(log n) if balanced`,
          steps: [
            {
              do: "All four keys hash to locker 0. The table is one linked list of length 4. Other lockers empty.",
              why: "A bad hash (or adversarial keys) collapses to Θ(n).",
            },
            {
              do: "Search 7 walks the whole chain — 4 compares, Θ(n). Expected O(1) assumed a uniform hash, which failed.",
              why: "O(1) is expected, not worst-case. Write that sentence on the paper.",
            },
            {
              do: "A balanced BST of 4 keys searches in Θ(log n). A heap cannot search 28 in log n without extra maps.",
              why: "If the exam wants guaranteed log n search, tick the family tree, not the locker bank.",
            },
            {
              do: "Defence: a better hash, universal hashing, or a tree in each locker (Java’s late conversion of long chains).",
              why: "The ADT still looks like a map. The worst-case bound can be repaired.",
            },
          ],
          result: "All keys in bucket 0. Worst search Θ(n). Expected O(1) needs a hash that spreads.",
        },
      ],
    },
    {
      heading: "Linked list and JSON — arrows and nested boxes",
      body: "Picture a treasure map of arrows. Each box holds a value and an arrow to the next box. The empty list is a null head. There is no back arrow, so you cannot jump to the previous box unless you kept it. Insert at the head is Θ(1): new.next = head, head = new. Insert or delete in the middle needs the box before the hole — walk from the head, Θ(n).\n\nJSON is nested labelled boxes: an object is a box whose children are named fields; an array is a box whose children are numbered. Nested JSON is just a nested tree. Walk it like DFS on objects. There is no cycle in well-formed JSON. A tail pointer makes append Θ(1); without it, append is Θ(n).",
      howTo: [
        "Draw boxes and arrows. Head points at the first box. Last next is null.",
        "Insert at head: new.next = head; head = new. Insert after box p: new.next = p.next; p.next = new.",
        "Delete after p: p.next = p.next.next (do not lose the rest of the map). Deleting the head is head = head.next.",
        "JSON: each { } is a parent box. Each key is an edge label. Arrays are ordered children. Recurse into nested objects.",
        "Wire the new box to the rest of the chain before you overwrite an old arrow, or you lose the treasure.",
        "JSON is a tree of nested labelled boxes, not a BST: names are field labels, not ordered search keys.",
      ],
      bullets: [
        "Linked list = treasure-map arrows. Value + next. Head insert/delete Θ(1). Middle needs the previous box, Θ(n) to find.",
        "No tail pointer ⇒ append is Θ(n). A tail pointer makes append Θ(1).",
        "JSON = nested labelled boxes. Walk children; there is no cycle in well-formed JSON.",
        "Order of pointer writes matters: link, then move head.",
        "A stack of plates can be a linked list that always inserts and deletes at the head.",
      ],
      examples: [
        {
          title: "Insert 9 at the head",
          prompt:
            "List head → 3 → 5 → 7 → null. Insert 9 at the head. Pointer writes? New head?",
          language: "python",
          code: `class Node:
    def __init__(self, val, nxt=None):
        self.val, self.next = val, nxt
head = Node(3, Node(5, Node(7)))
new = Node(9)
new.next = head
head = new`,
          steps: [
            {
              do: "Allocate a box 9. Set 9.next = head (currently 3). Then head = 9.",
              why: "The new box must point at the old chain before you move head, or you lose 3-5-7.",
            },
            {
              do: "After those two writes the list is 9 → 3 → 5 → 7. Old boxes were not copied.",
              why: "Insert at head is two arrow assignments, Θ(1).",
            },
            {
              do: "If you wrote head = new first, with new.next still null, the old list is leaked.",
              why: "Order of arrow writes matters. Link, then move head.",
            },
            {
              do: "A stack of plates implemented with a linked list always inserts and deletes at the head. That is why push/pop are Θ(1).",
              why: "Last-on, first-off matches head operations.",
            },
          ],
          result: "9.next = old head, then head = 9. List 9 → 3 → 5 → 7. Θ(1).",
        },
        {
          title: "Insert 4 after node 3",
          prompt:
            "Same list 3 → 5 → 7. Insert 4 after the node holding 3. Which pointers change?",
          language: "java",
          code: `// p points at 3
// new node 4
// 4.next = p.next;   // 4 -> 5
// p.next = 4;        // 3 -> 4`,
          steps: [
            {
              do: "Let p point at 3. p.next is 5. Create box 4. First set 4.next = p.next so 4 points at 5.",
              why: "Hold the rest of the treasure map before you overwrite p.next.",
            },
            {
              do: "Then p.next = 4. List is 3 → 4 → 5 → 7.",
              why: "Two writes. The box after p is the insertion point.",
            },
            {
              do: "If you set p.next = 4 first, you lose the pointer to 5 unless you saved it.",
              why: "Same order rule as head insert: wire the new box to the tail side first.",
            },
            {
              do: "Finding p is Θ(n) if you only have the head and a value to match. The insert itself is Θ(1) once p is known.",
              why: "Walk vs splice are different costs.",
            },
          ],
          result: "4.next = 3.next, then 3.next = 4. List 3 → 4 → 5 → 7.",
        },
        {
          title: "Delete 5 from 3 → 5 → 7",
          prompt:
            "Singly linked, only head. Delete the node with value 5. Why do you need the node before 5?",
          language: "cpp",
          code: `// walk prev so prev->next is the node to drop
// prev->next = prev->next->next;
// 3's next becomes 7; node 5 is unlinked`,
          steps: [
            {
              do: "Start at head 3. 3.next is 5, the victim. You cannot ask 5 for its previous box — there is no prev arrow.",
              why: "Singly linked means one arrow forward. Delete in the middle needs the predecessor.",
            },
            {
              do: "Set 3.next = 5.next (which is 7). List is 3 → 7. Box 5 is unlinked.",
              why: "That one assignment splices 5 out. Do not forget to keep 7.",
            },
            {
              do: "If the victim is the head (delete 3), the write is head = head.next. No predecessor exists.",
              why: "Head delete is a special case.",
            },
            {
              do: "A doubly linked list stores prev, so you can delete from a pointer to the victim in Θ(1). You pay extra memory per box.",
              why: "Same family, extra arrow.",
            },
          ],
          result: "Need predecessor 3. Set 3.next = 7. Head delete would be head = head.next.",
        },
        {
          title: "JSON object is a tree of named children",
          prompt:
            "JSON {\"user\": {\"id\": 7, \"name\": \"Ana\"}, \"ok\": true}. Draw the tree. What is the parent of \"Ana\"? Path to id?",
          language: "python",
          code: `doc = {"user": {"id": 7, "name": "Ana"}, "ok": True}
print(doc["user"]["id"])  # path user -> id`,
          steps: [
            {
              do: "Root box has two children: key user (an object) and key ok (leaf true).",
              why: "Each JSON object is a labelled box. Keys are edge names.",
            },
            {
              do: "The user box has children id=7 and name=\"Ana\". Those two leaves sit under user, not under the root.",
              why: "Nesting in the file is parenthood in the tree of boxes.",
            },
            {
              do: "Parent of \"Ana\" is the user object. Path from the root to id is user → id. Value 7.",
              why: "A path is a sequence of labels, like a file path.",
            },
            {
              do: "This is not a graph with cycles. Well-formed JSON is a tree (or a forest if you have a top-level array of roots).",
              why: "Walk with recursion / DFS. No visited-set is required if you trust the parser.",
            },
          ],
          result: "Root —user→ {id:7, name:Ana}, —ok→ true. Path to id is user.id = 7.",
        },
        {
          title: "JSON array and nested walk",
          prompt:
            "[ {\"x\": 1}, {\"x\": 2, \"ys\": [3, 4]} ]. How many object nodes? How do you print every x? Why is this a tree not a BST?",
          language: "python",
          code: `doc = [{"x": 1}, {"x": 2, "ys": [3, 4]}]
for item in doc:
    print(item["x"])
print(doc[1]["ys"][1])  # 4`,
          steps: [
            {
              do: "Root is an array (ordered children 0 and 1). Child 0 is {x:1}. Child 1 is {x:2, ys:[3,4]}. ys is a nested array of two leaves.",
              why: "Arrays are boxes with numbered edges 0,1,2,… Objects have named edges.",
            },
            {
              do: "Two object boxes (plus the root array and the ys array). Print x by walking each element of the root array and reading key x.",
              why: "A loop on an array is walking siblings. Recurse when a value is another object/array.",
            },
            {
              do: "doc[1][\"ys\"][1] is 4: child 1 → ys → index 1.",
              why: "Mix of named and numbered edges on one path.",
            },
            {
              do: "Not a BST: keys are field names, not ordered search keys, and left/right does not mean smaller/larger. It is just nested labelled boxes.",
              why: "Use tree language (parent, child, path). Do not run inorder and expect sorted numbers.",
            },
          ],
          result: "Root array of two objects; nested array ys. Paths mix names and indexes. JSON tree ≠ BST.",
        },
      ],
    },
  ],
};
