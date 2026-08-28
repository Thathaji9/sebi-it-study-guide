import type { TopicNote } from "@/data/notes";

export const notesDs: TopicNote = {
  topic: "ds",
  title: "Data Structures",
  blurb:
    "Phase 2 heavy-hitter: arrays, linked lists, stacks, circular queues, BST, heaps, hashing, matrices and JSON-as-tree. Every structure is paired with the complexity the MCQ will ask and a pointer/index dry-run.",
  blocks: [
    {
      heading: "Arrays: layout, operations, rotation",
      body: `An array stores n elements of the same type in contiguous memory. Indexing a[i] is Θ(1) because the address is base + i×size. That random-access guarantee is why binary search, heaps, and matrices are array-backed. The price is a fixed (or geometrically resized) capacity and expensive inserts in the middle.

Scan, find-max, and copy are Θ(n). Insert or delete at index i in a packed array shifts the tail: Θ(n−i), worst Θ(n) at the front. Append at the end of a dynamic array is amortised Θ(1) if you resize by a constant factor (Java ArrayList, C++ vector, Python list). A single resize is Θ(n), but the geometric series of copies sums to O(1) per append.

Rotation left by k means the new array is a[k..n) followed by a[0..k). The reversal trick is in-place and Θ(n): reverse the whole array, reverse the first n−k, reverse the last k (for a left rotate; right rotate reverses the two pieces first). A k-cell temp buffer is simpler but uses extra memory. k is taken modulo n; rotating by n is a no-op.

Two-pointer tricks live on arrays: reverse, palindrome check, two-sum on a sorted array, sliding window, Kadane’s maximum subarray. Multidimensional arrays in C/Java are row-major: a[i][j] sits at i×ncols+j. Fortran is column-major — only mention it if the question does.

Exam traps: ‘access is O(1) therefore insert is O(1)’ is false. Unsorted search is Θ(n); sorted search is Θ(log n) but only after a Θ(n log n) sort. A negative index in Python wraps; Java/C++ do not. Bounds errors are the buffer-overflow story from the security paper.`,
      bullets: [
        "Index Θ(1); insert/delete in the middle Θ(n); append amortised Θ(1) if geometrically resized.",
        "Left rotate by k: reverse-all, reverse prefix n−k, reverse suffix k (or equivalent three reverses).",
        "k ← k mod n. Empty and n=1 are no-ops.",
        "Row-major: a[i][j] at i×ncols + j.",
      ],
      examples: [
        {
          title: "Left-rotate [1,2,3,4,5,6,7] by 2 using reversal",
          prompt:
            "Rotate the array left by k=2 in place with the three-reverse method. Show the array after each reverse.",
          language: "python",
          code: `a = [1, 2, 3, 4, 5, 6, 7]
k = 2
def rev(i, j):
    while i < j:
        a[i], a[j] = a[j], a[i]
        i += 1
        j -= 1
n = len(a)
rev(0, n-1)       # whole
rev(0, n-k-1)     # new prefix of length n-k = 5
rev(n-k, n-1)     # new suffix of length k = 2
print(a)`,
          steps: [
            "Goal: [3,4,5,6,7,1,2]. k=2, n=7, k already in range.",
            "Reverse all: [7,6,5,4,3,2,1]. The two that should land at the tail (1,2) are now at the front in reverse.",
            "Reverse the first n−k=5 cells: reverse [7,6,5,4,3] → [3,4,5,6,7,2,1]. The left-rotated body is in place.",
            "Reverse the last k=2 cells: [2,1] → [1,2]. Array is [3,4,5,6,7,1,2].",
            "Right rotate by 2 would reverse the two pieces first then the whole, yielding [6,7,1,2,3,4,5]. Using a temp of the first k cells and then copying is Θ(n) time Θ(k) extra and is equally acceptable if the question does not demand in-place.",
          ],
          result:
            "After the three reverses: [3, 4, 5, 6, 7, 1, 2]. Left rotate by 2 of [1..7].",
        },
        {
          title: "Insert 9 at index 2 in a packed array of capacity 8",
          prompt:
            "Array a[0..4] = [4, 1, 7, 3, 8], size=5, capacity=8. Insert value 9 at index 2. Count the moves. What if capacity had been 5?",
          language: "java",
          code: `int[] a = new int[8];
int size = 5;
a[0]=4; a[1]=1; a[2]=7; a[3]=3; a[4]=8;
int idx = 2, val = 9;
for (int i = size; i > idx; i--) a[i] = a[i-1];
a[idx] = val;
size++;`,
          steps: [
            "Capacity 8 > size 5, so no resize. The tail from index 2 must slide one slot right to free a[2].",
            "Loop i=5 down to 3: a[5]←a[4]=8, a[4]←a[3]=3, a[3]←a[2]=7. Three assignments. a is now [4,1,7,7,3,8,_,_].",
            "Write a[2]=9. size becomes 6. Result [4,1,9,7,3,8,_,_].",
            "If capacity had been 5, we first allocate a new array (typically 10), copy 5 elements, then shift. The copy is Θ(n); still Θ(n) overall, but with a larger constant and a new allocation.",
            "Inserting at the end (index=size) needs zero shifts — that is the amortised-O(1) append. Inserting at 0 shifts all n elements and is the worst case.",
          ],
          result:
            "[4, 1, 9, 7, 3, 8] with three tail moves. Mid-array insert is Θ(n); a full capacity triggers a Θ(n) resize first.",
        },
        {
          title: "Kadane on [−2, 1, −3, 4, −1, 2, 1, −5, 4]",
          prompt:
            "Maximum subarray sum with Kadane. Trace the running ‘best ending here’ and the global best after each index.",
          language: "cpp",
          code: `int a[] = {-2,1,-3,4,-1,2,1,-5,4};
int best = a[0], cur = a[0];
for (int i = 1; i < 9; i++) {
    cur = max(a[i], cur + a[i]);
    best = max(best, cur);
}`,
          steps: [
            "i=0: cur=−2, best=−2. (Always seed with a[0], not 0, so that an all-negative array returns the largest negative rather than ‘empty sum 0’, unless the problem allows empty.)",
            "i=1, a=1: cur=max(1, −2+1)=1, best=1. i=2, a=−3: cur=max(−3, 1−3)=−2, best stays 1.",
            "i=3, a=4: cur=max(4, −2+4)=4, best=4. A new subarray starts at 4 because the prefix was harmful.",
            "i=4..6: cur=3, then 5, then 6. best=6. Subarray [4, −1, 2, 1] sums to 6.",
            "i=7, a=−5: cur=1, best stays 6. i=8, a=4: cur=5, still < 6. Answer 6. Time Θ(n), extra Θ(1) — an array algorithm the exam contrasts with the Θ(n²) ‘all subarrays’ brute force.",
          ],
          result:
            "Maximum subarray sum is 6, from [4, −1, 2, 1]. Kadane is Θ(n) using the array’s sequential layout.",
        },
        {
          title: "Complexity sheet for the four basic array jobs",
          prompt:
            "Fill best/average/worst for: (i) access by index, (ii) search unsorted, (iii) search sorted, (iv) insert at front of a packed array of size n.",
          language: "python",
          code: `# (i)  a[i]           best=avg=worst = Theta(1)
# (ii) linear scan    best Theta(1) if first cell, avg/worst Theta(n)
# (iii) binary search best Theta(1) if mid hits, avg/worst Theta(log n)
# (iv) insert front   always Theta(n) shifts, plus possible Theta(n) resize`,
          steps: [
            "Access by index does one address computation. No loop. Θ(1) in every case, provided the index is in range.",
            "Unsorted search is a scan. Best: the key sits at a[0], Θ(1). Worst: absent or at the end, Θ(n). Average n/2 probes under uniform location, still Θ(n).",
            "Sorted search with binary search: best Θ(1) (first mid), average and worst Θ(log n). Linear scan on a sorted array is still Θ(n) worst — sorting only helps if you use it.",
            "Insert at index 0 always shifts n elements. Resize, if needed, is another Θ(n). There is no ‘best case’ shortcut unless the implementation is a deque (which is not a packed array).",
            "This table is the reason you pick an array for indexing-heavy work and a linked list (next section) for mid-sequence inserts when you already hold a node pointer.",
          ],
          result:
            "Access Θ(1). Unsorted search Θ(n) typical. Sorted binary search Θ(log n). Front insert Θ(n). Arrays win at indexing, lose at mid-inserts.",
        },
      ],
    },
    {
      heading: "Singly and doubly linked lists",
      body: `A singly linked list node holds a value and a pointer to the next node. The list is identified by its head (and optionally a tail for O(1) append). There is no Θ(1) indexing: reaching the k-th node is Θ(k). Insert after a given node is Θ(1) pointer rewiring: n.next = new; new.next = old_next. Insert at the head is Θ(1). Delete the successor of a given node is Θ(1); delete a given node when you only have the head is Θ(n) because you must find the predecessor.

A doubly linked list adds a prev pointer. Delete of a given node becomes Θ(1) (relink neighbours). Reverse traversal is free. The cost is one extra pointer per node and more careful edge cases at both ends. Java’s LinkedList, LRU-cache maps, and browser history are doubly linked.

Sentinel / dummy head nodes remove the ‘is the list empty?’ special case: every real node has a predecessor. Circular singly lists make the last node point at the head; Josephus and round-robin schedulers use them. Detecting a cycle is Floyd’s tortoise-and-hare: two pointers at 1× and 2× speed meet iff there is a cycle, then resetting one to head finds the cycle entrance in Θ(n).

Arrays beat lists at cache locality (contiguous loads) and random access. Lists beat arrays at splicing when you already hold the node, and at growing without a resize copy. The exam loves ‘what is the time to insert after a given node?’ — Θ(1) for a list, Θ(n) for an array — and ‘find the middle in one pass’ (slow/fast pointers).

Reversing a singly list is a three-pointer walk (prev, cur, nxt) in Θ(n). Merging two sorted lists is the merge of merge-sort and is the reason merge-sort on lists needs no extra array. Dummy-node merge is the clean code the interview round wants.`,
      bullets: [
        "Singly: insert-after known node Θ(1); index-k Θ(k); delete given node Θ(n) without pred.",
        "Doubly: delete given node Θ(1); walk either direction.",
        "Floyd cycle: slow+fast; meeting ⇒ cycle.",
        "Reverse singly: three pointers, Θ(n), Θ(1) extra.",
      ],
      examples: [
        {
          title: "Insert 4 after node 2 in 1→2→3",
          prompt:
            "Singly list head=1 → 2 → 3. You hold a pointer p to the node 2. Insert 4 after p. Draw the two pointer assignments. Contrast with insert before p.",
          language: "java",
          code: `class Node { int v; Node next; Node(int v){ this.v=v; } }
Node p = /* node 2 */;
Node x = new Node(4);
x.next = p.next;  // x -> 3
p.next = x;       // 2 -> x
// list is 1 -> 2 -> 4 -> 3`,
          steps: [
            "Allocate node x with value 4. Its next is currently null.",
            "First assignment x.next = p.next attaches 4 to 3. If you wrote p.next = x first you would lose the pointer to 3 — the classic order bug.",
            "Second assignment p.next = x attaches 2 to 4. The chain is 1→2→4→3. Two writes, Θ(1).",
            "Insert *before* p is not Θ(1) on a singly list: you must walk from the head to find p’s predecessor, Θ(n), unless you copy p’s value into a new successor and overwrite p (a trick that fails at the tail or with external pointers).",
            "On a doubly list, insert before p is also Θ(1): relink p.prev. That extra prev pointer is exactly what you buy.",
          ],
          result:
            "1→2→4→3 after two assignments (new.next first, then p.next). Insert-after is Θ(1); insert-before on a singly list is Θ(n) without the predecessor.",
        },
        {
          title: "Reverse 1→2→3→4 with three pointers",
          prompt:
            "Iteratively reverse a singly list. Show prev, cur after every iteration. What is the new head?",
          language: "python",
          code: `def reverse(head):
    prev, cur = None, head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev  # new head`,
          steps: [
            "Init prev=None, cur=1. nxt will be saved each time so we do not lose the rest of the list.",
            "Iter 1: nxt=2, 1.next←None, prev=1, cur=2. List fragment: 1→None, leftover 2→3→4.",
            "Iter 2: nxt=3, 2.next←1, prev=2, cur=3. Fragment 2→1→None.",
            "Iter 3: nxt=4, 3.next←2, prev=3, cur=4. Fragment 3→2→1. Iter 4: nxt=None, 4.next←3, prev=4, cur=None. Loop ends.",
            "Return prev=4. Full list 4→3→2→1. A stack of nodes would also reverse but uses Θ(n) extra memory; the three-pointer walk is Θ(1) extra.",
          ],
          result: "New head is 4. List 4→3→2→1. Invariant: prev is the head of the already-reversed prefix.",
        },
        {
          title: "Floyd cycle detection on 1→2→3→4→5→3",
          prompt:
            "Node 5 points back to 3. Tortoise moves 1 step, hare 2 steps, both start at 1. When do they meet? How do you then find the cycle entrance?",
          language: "cpp",
          code: `// positions after each hare-move pair (slow, fast)
// start: (1,1)
// (2,3), (3,5), (4,4)  meet at 4
// reset slow to head=1, both walk 1 step:
// (2,5), (3,3)  meet at 3 = entrance`,
          steps: [
            "Start slow=fast=1. Advance: slow=2, fast=3. Then slow=3, fast=5. Then slow=4, fast=4 (5→3→4). They meet inside the cycle at node 4.",
            "Meeting proves a cycle. If fast ever hits null, there is no cycle (hare reaches the tail).",
            "To find the entrance: set slow back to head, keep fast at the meeting point, walk both one step at a time. They meet at 3.",
            "Why: if the stem has length μ and the cycle length λ, they meet at μ steps from the entrance after reset. Here μ=2 (1,2 then 3), λ=3 (3,4,5).",
            "Exam alternative: a visited-set of node identities is O(n) extra memory and also works; Floyd is the O(1)-extra answer they want when they mention two pointers.",
          ],
          result:
            "Meet at node 4 (in the cycle). Reset-and-walk meets at node 3, the start of the cycle. Cycle length 3, stem 1→2.",
        },
        {
          title: "Doubly-list delete versus singly-list delete",
          prompt:
            "You hold a pointer p to the middle node of (a) a doubly list and (b) a singly list. Delete p. State the pointer writes and the complexities.",
          language: "java",
          code: `// doubly: p.prev.next = p.next; p.next.prev = p.prev;  // ends: check nulls
// singly, only p: cannot find predecessor. Must walk from head. Theta(n).
// singly, given pred: pred.next = p.next;  // Theta(1)`,
          steps: [
            "Doubly, both neighbours exist: p.prev.next ← p.next and p.next.prev ← p.prev. Two writes, Θ(1). Head/tail need a null check or a sentinel.",
            "Singly with only p: the predecessor’s next still points at p. You cannot name that predecessor without a walk from the head, Θ(n).",
            "Singly with predecessor pred: pred.next ← p.next, Θ(1). This is why singly-list APIs often pass the predecessor, or why we insert/delete *after* a known node.",
            "The overwrite-trick (copy p.next.value into p, then delete p.next) is Θ(1) but fails if p is the tail or if other structures alias p.next.",
            "Space: doubly uses one extra pointer per node. For an LRU cache the Θ(1) delete is worth it; for a million tiny integers it may not be.",
          ],
          result:
            "Doubly: Θ(1) relink of two neighbours. Singly with only p: Θ(n) walk. Singly with pred: Θ(1). That is the doubly-list value proposition.",
        },
      ],
    },
    {
      heading: "Stacks and postfix evaluation",
      body: `A stack is LIFO. The ADT is push, pop, peek, isEmpty. An array stack with a top index is Θ(1) per operation (overflow if capacity is exceeded). A linked stack pushes at the head and never overflows except by memory. Call stacks, DFS, undo buffers, matching brackets, and the shunting-yard algorithm are the applications.

Postfix (Reverse Polish) evaluation is the canonical stack dry-run. Scan tokens left to right. A number is pushed. An operator pops two operands (the first pop is the right operand), applies the operator, and pushes the result. At the end the stack holds one value — the answer. Prefix would use a stack too but is scanned right-to-left (or uses two stacks). Infix needs precedence and parentheses; shunting-yard converts infix to postfix using an operator stack.

The exam expression 5 1 2 + 4 * + 3 − is Dijkstra’s example: 5 + ((1+2)×4) − 3 = 14. Write the stack after every token; that is the whole question. Unary minus is a trap (it is not binary); the SEBI paper uses binary operators only.

Balanced parentheses: push an opening bracket, pop on a closing bracket and require a matching kind. Empty stack at the end is success. Next-greater-element and histogram-rectangle are monotonic-stack problems that Phase-2 coding-style MCQs sometimes mimic with a small array.

Underflow (pop on empty) and overflow (push on a full array stack) are the two error states. A question that asks ‘minimum stack capacity to evaluate this postfix’ wants the maximum depth the stack ever reaches during the scan.`,
      bullets: [
        "LIFO. Array or linked; each op Θ(1).",
        "Postfix: push numbers; on operator pop right then left, push result.",
        "Final stack size 1 is the value. Depth = extra memory used.",
        "Infix → postfix: shunting yard (operator stack + precedence).",
      ],
      examples: [
        {
          title: "Evaluate postfix 5 1 2 + 4 * + 3 −",
          prompt:
            "Show the stack after each token of 5 1 2 + 4 * + 3 −. Identify the left and right operand of every operator.",
          language: "python",
          code: `tokens = ["5","1","2","+","4","*","+","3","-"]
st = []
for t in tokens:
    if t not in "+-*/":
        st.append(int(t))
    else:
        b = st.pop()   # right
        a = st.pop()   # left
        if t == "+": st.append(a+b)
        elif t == "-": st.append(a-b)
        elif t == "*": st.append(a*b)
        else: st.append(a//b)
    print(t, st)`,
          steps: [
            "Token 5: push. Stack [5]. Token 1: push [5, 1]. Token 2: push [5, 1, 2].",
            "Token +: pop right=2, left=1, push 1+2=3. Stack [5, 3]. This is the inner (1+2).",
            "Token 4: push [5, 3, 4]. Token *: pop right=4, left=3, push 3×4=12. Stack [5, 12]. This is (1+2)×4.",
            "Token +: pop right=12, left=5, push 5+12=17. Stack [17]. This is 5+((1+2)×4).",
            "Token 3: push [17, 3]. Token −: pop right=3, left=17, push 17−3=14. Stack [14]. Empty of operators, one value remains.",
          ],
          result:
            "Value 14. Stack snapshots: [5] → [5,1] → [5,1,2] → [5,3] → [5,3,4] → [5,12] → [17] → [17,3] → [14]. Max depth 3.",
        },
        {
          title: "Infix 5+(1+2)*4-3 to postfix via shunting yard",
          prompt:
            "Convert 5 + ( 1 + 2 ) * 4 − 3 to postfix. Precedence: * / bind tighter than + −; both left-associative. Show the operator stack and the output list after each token.",
          language: "java",
          code: `// token stream: 5 + ( 1 + 2 ) * 4 - 3
// numbers go to output; ( is pushed; ) flushes until (
// + or - flush operators of >= precedence, then push
// end of input flushes the operator stack`,
          steps: [
            "5 → output [5]. + → op-stack [+]. ( → op-stack [+, (]. 1 → output [5,1]. + → push (the ( blocks), op-stack [+, (, +]. 2 → output [5,1,2].",
            ") flushes until (: pop + to output. Output [5,1,2,+]. Discard the ‘(’. Op-stack [+].",
            "* has higher precedence than the stacked +, so just push. Op-stack [+, *]. 4 → output [5,1,2,+,4].",
            "− has lower precedence than *, so pop * to output, then − equals + so pop + to output, then push −. Output [5,1,2,+,4,*,+]. Op-stack [−].",
            "3 → output [5,1,2,+,4,*,+,3]. End: pop −. Postfix 5 1 2 + 4 * + 3 −, which is the previous example. Evaluating it yielded 14, matching ordinary infix.",
          ],
          result:
            "Postfix 5 1 2 + 4 * + 3 −. Shunting-yard used an operator stack of max depth 3 (the ‘(’ and two operators).",
        },
        {
          title: "Balanced brackets ( ) [ ] { }",
          prompt:
            "Decide whether ‘([{}])()’ and ‘([)]’ are balanced. Show the stack after every character of each string.",
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
            "([{}])(): push (, push [, push {, pop { on }, pop [ on ], pop ( on ), push (, pop ( on ). Stack empty at end → balanced.",
            "Snapshots for the first string: [(] [([] [([{] [([] [(] [] [(] []. Never a mismatch.",
            "([)]: push (, push [, then ) wants to match the top, which is [, but ) pairs with (. Fail immediately. The remaining ] is not even read.",
            "A closing bracket on an empty stack is also a fail (too many closers). Leftover openings at the end (e.g. ‘(()’ ) fail the final emptiness test.",
            "This is the same LIFO discipline as nested function calls and HTML tags. A queue would be the wrong ADT because the most recently opened bracket must close first.",
          ],
          result:
            "‘([{}])()’ is balanced. ‘([)]’ fails when ‘)’ sees ‘[’ on the stack. Matching brackets are a stack problem, not a queue problem.",
        },
        {
          title: "Minimum stack capacity for a postfix expression",
          prompt:
            "For 5 1 2 + 4 * + 3 − the stack depth sequence is 1,2,3,2,3,2,1,2,1. What capacity is necessary and sufficient? Give a postfix of four numbers that needs depth 4.",
          language: "python",
          code: `# depth increases by 1 on a number, decreases by 1 on a binary operator
# (pop 2, push 1: net -1)
# well-formed postfix of n numbers and (n-1) operators ends at depth 1
# max depth is between 1 and n`,
          steps: [
            "Each number pushes (+1). Each binary operator pops two and pushes one (−1). The running depth of 5 1 2 + 4 * + 3 − peaked at 3.",
            "Capacity 3 is necessary (we observed depth 3) and sufficient (we never needed 4). An array stack of size 3 evaluates this expression without overflow.",
            "Four numbers in a row at the start, e.g. 1 2 3 4 + + +, reach depth 4 before any operator. That is the worst postfix shape (a fully left-unreduced list of operands).",
            "A fully reduced chain 1 2 + 3 + 4 + never exceeds depth 2. Same numbers, different postfix, different capacity.",
            "Exam phrasing: ‘the maximum number of elements on the stack while converting / evaluating’. Count; do not guess n.",
          ],
          result:
            "This expression needs capacity 3. The postfix 1 2 3 4 + + + needs capacity 4. Peak depth, not n, is the answer.",
        },
      ],
    },
    {
      heading: "Queues and circular buffers",
      body: `A queue is FIFO. The ADT is enqueue (rear), dequeue (front), peek, isEmpty. A linked queue with head and tail pointers is Θ(1) per operation. An array queue that always dequeues by shifting left is Θ(n) per dequeue and is the wrong implementation.

A circular array queue of capacity C stores at most C−1 elements if you keep a reserved empty slot to distinguish full from empty (front==rear empty; (rear+1)%C==front full). Alternatively you store an explicit size counter and may use all C slots. Enqueue: a[rear]=x; rear=(rear+1)%C. Dequeue: x=a[front]; front=(front+1)%C. Both Θ(1).

BFS uses a queue. Printers, message buffers, sliding-window ‘next k’, and a router’s output buffer are queues. A deque (double-ended queue) inserts and deletes at both ends; a circular array or a doubly list implements it. A priority queue is not FIFO — it is a heap (next section).

Ring buffers in OS and networking are circular queues: a producer writes at rear, a consumer reads at front, wrap-around reuses the storage. Overwriting the unread front is data loss (the security/availability angle); blocking or dropping is the policy.

Exam traps: ‘queue with two stacks’ — enqueue into in-stack, dequeue by flushing in-stack into out-stack if out-stack is empty; amortised Θ(1). ‘Stack with two queues’ is possible but ugly (one of the queues holds the reversed order). Linear versus circular is the difference between ‘rear hits the physical end even though slot 0 is free’ and wrap-around.`,
      bullets: [
        "FIFO. Linked head+tail or circular array: Θ(1) enqueue/dequeue.",
        "Circular: index wrap (i+1)%C. Full/empty via size or a reserved slot.",
        "BFS, buffers, printers. Not a priority queue.",
        "Two stacks simulate a queue (lazy transfer).",
      ],
      examples: [
        {
          title: "Circular queue of capacity 5, reserved-slot scheme",
          prompt:
            "Capacity C=5, reserved-slot full test. Start empty front=rear=0. Enqueue 10,20,30,40. Then dequeue twice. Then enqueue 50,60. Show front, rear, and the array after each step. Does 60 succeed?",
          language: "java",
          code: `int C = 5;
Integer[] a = new Integer[C];
int front = 0, rear = 0;
// empty: front==rear
// full:  (rear+1)%C == front
// enq: a[rear]=x; rear=(rear+1)%C
// deq: x=a[front]; front=(front+1)%C`,
          steps: [
            "Empty: front=rear=0, array [_,_,_,_,_]. Enqueue 10,20,30,40: rear walks 1,2,3,4. Array [10,20,30,40,_], front=0, rear=4. (rear+1)%5=0==front, so the queue is full with 4 elements (C−1).",
            "The fifth physical slot stays empty on purpose. Enqueue 50 would be rejected: full. That is the reserved-slot scheme.",
            "Dequeue twice: 10 then 20. front walks 1 then 2. Array still holds the stale 10,20 but they are outside [front,rear). Live cells: 30,40. front=2, rear=4. Not full: (4+1)%5=0 ≠ 2.",
            "Enqueue 50: a[4]=50, rear=(4+1)%5=0. Array [10,20,30,40,50] with live 30,40,50. Enqueue 60: a[0]=60, rear=1. Live 30,40,50,60. front=2, rear=1. (1+1)%5=2==front → full again.",
            "60 succeeded because wrap-around reused slot 0 that dequeue had freed. A non-circular array would have said ‘rear at the end’ even with two free slots at the front — the whole point of the ring.",
          ],
          result:
            "After the trace: live elements 30,40,50,60, front=2, rear=1, full. 60 wrapped into index 0. Max live size is C−1=4 under reserved-slot.",
        },
        {
          title: "BFS uses a queue, DFS a stack — same graph, different ADT",
          prompt:
            "Graph A→B, A→C, B→D. Start at A, neighbours in alphabetical order. Show the queue of BFS versus the stack of iterative DFS after the first expansion of A.",
          language: "python",
          code: `from collections import deque
g = {"A":["B","C"], "B":["D"], "C":[], "D":[]}
# BFS
q = deque(["A"]); print("bfs start", list(q))
u = q.popleft()
for v in g[u]: q.append(v)
print("bfs after A", list(q))
# DFS iterative: push neighbours right-to-left so B is popped first
st = ["A"]
u = st.pop()
for v in reversed(g[u]): st.append(v)
print("dfs after A", st)`,
          steps: [
            "BFS queue after expanding A: [B, C] (FIFO: B was enqueued first and will be processed first).",
            "Iterative DFS stack after expanding A (push C then B, or push reversed): [C, B] so pop yields B first — going deep into B’s branch before C, matching recursive DFS with sorted adjacency.",
            "Next BFS step dequeues B and enqueues D: queue [C, D]. Levels {A} then {B,C} then {D}.",
            "Next DFS pop is B, push D: stack [C, D]. Then pop D, then C. Order A,B,D,C — depth first.",
            "The only difference in the skeleton code is popleft versus pop. That is the ADT contrast the exam wants, not a new graph algorithm.",
          ],
          result:
            "After expanding A: BFS queue [B,C], DFS stack [C,B] (B on top). Same neighbours, different pop end, different visit order.",
        },
        {
          title: "Queue from two stacks",
          prompt:
            "Simulate a queue with in-stack and out-stack. Enqueue 1,2,3. Dequeue once (should yield 1). Enqueue 4. Dequeue three times. When does the O(n) transfer happen?",
          language: "cpp",
          code: `stack<int> in, out;
auto enq = [&](int x){ in.push(x); };
auto deq = [&](){
    if (out.empty()) {
        while (!in.empty()) { out.push(in.top()); in.pop(); }
    }
    int x = out.top(); out.pop(); return x;
};`,
          steps: [
            "enq 1,2,3: in-stack top=3 (bottom 1). out empty. No transfer yet. Enqueue is always Θ(1) into in.",
            "First deq: out is empty, so transfer: pop in onto out. out top=1 (then 2, then 3). Pop out → 1. FIFO delivered. The transfer was Θ(n) this once.",
            "enq 4: goes to in (in: [4]). out still [2,3] with 2 on top. We do not transfer while out is non-empty, otherwise we would scramble order.",
            "deq → 2, deq → 3, both Θ(1) off out. Next deq finds out empty, transfers 4, pops 4.",
            "Each element is moved at most twice (into in, into out) so amortised dequeue is Θ(1). Worst-case one dequeue is Θ(n) — say that if they ask worst case.",
          ],
          result:
            "Dequeue order 1,2,3,4. Transfer happens only when out is empty (here: before the first deq, and before deq of 4). Amortised Θ(1).",
        },
        {
          title: "Linear array queue that forgets to wrap",
          prompt:
            "Capacity 4, front=0, rear=0, no wrap. Enqueue A,B,C,D. Dequeue A,B. Can you enqueue E? What does circularity fix?",
          language: "python",
          code: `# linear (wrong for a ring):
# rear only grows; after 4 enqueues rear==4, 'full'
# even after 2 dequeues, rear==4 so E is rejected, two slots wasted
# circular: rear = (rear+1)%4 reuses index 0 and 1`,
          steps: [
            "Four enqueues fill indices 0..3, rear=4. The linear implementation reports full because rear hit capacity.",
            "Two dequeues move front to 2. Live data occupies indices 2,3. Slots 0 and 1 are logically free.",
            "Without wrap, enqueue E still sees rear=4 and fails. The queue pretends to be full at size 2.",
            "Circular rear=(rear+1)%4 after D would have rear=0 once we also moved front, or with reserved-slot the wrap is on every step. E lands in a freed slot.",
            "MCQ: ‘a linear queue suffers from memory wastage after repeated dequeue’ — the cure is circular increment, not a larger array (though resizing is a separate strategy).",
          ],
          result:
            "Linear queue rejects E even though two slots are free. A circular queue reuses them. Wrap-around is the definition of a ring buffer.",
        },
      ],
    },
    {
      heading: "Binary search trees: insert, search, inorder",
      body: `A binary search tree (BST) stores keys so that every node’s left subtree is strictly less than the node and the right subtree is strictly greater (duplicates, if allowed, must pick a side and stick to it). Search, insert and delete follow a single root-to-leaf path. On a balanced tree that path is Θ(log n); on a degenerate chain (sorted insertions into an unbalanced BST) it is Θ(n).

Insert: walk as in search until a null child, hang the new node there. No rotations in a plain BST. Search: compare, go left or right, miss at null. Inorder traversal (left, node, right) emits keys in sorted order — that is the BST theorem the exam quotes. Preorder is the insertion fingerprint of that exact shape; postorder is useful for deleting a tree bottom-up.

Delete has three cases: leaf (drop it), one child (bypass), two children (replace with inorder successor — leftmost of the right subtree — then delete that successor, which has no left child). Forgetting the successor case is the usual MCQ distractor.

Balanced variants (AVL, red-black, B-trees) keep height Θ(log n) with rotations or block splits. They are still BSTs in the search sense. A heap is not a BST: it orders parent versus children but not left versus right, so inorder of a heap is not sorted.

Complexity recap: balanced BST search/insert/delete Θ(log n); unbalanced worst Θ(n); inorder listing of all keys Θ(n). Range queries ‘keys between L and R’ walk the relevant paths plus the output size. Successor of a node is either the leftmost of the right subtree or the nearest ancestor from which you took a left turn.`,
      bullets: [
        "Left < node < right. Inorder = sorted keys.",
        "Insert/search: one path. Balanced Θ(log n), skewed Θ(n).",
        "Delete two-children: replace by inorder successor (or predecessor).",
        "Heap ≠ BST. AVL/RB = BST + height invariant.",
      ],
      examples: [
        {
          title: "Insert 50, 30, 70, 20, 40, 60, 80 then inorder",
          prompt:
            "Start from an empty BST. Insert the sequence 50, 30, 70, 20, 40, 60, 80. Draw parent pointers. Then list inorder, preorder and postorder.",
          language: "python",
          code: `class N:
    def __init__(self, k):
        self.k, self.l, self.r = k, None, None
def insert(root, k):
    if root is None: return N(k)
    if k < root.k: root.l = insert(root.l, k)
    else:          root.r = insert(root.r, k)
    return root
def inorder(t, acc):
    if t:
        inorder(t.l, acc); acc.append(t.k); inorder(t.r, acc)
root = None
for k in [50,30,70,20,40,60,80]:
    root = insert(root, k)`,
          steps: [
            "50 becomes the root. 30 < 50 → left of 50. 70 > 50 → right of 50. The tree is a V.",
            "20 < 50 and 20 < 30 → left of 30. 40 < 50 and 40 > 30 → right of 30. Left subtree of 50 is complete: 30 with children 20, 40.",
            "60 > 50 and 60 < 70 → left of 70. 80 > 50 and 80 > 70 → right of 70. The tree is a perfect binary tree of height 2 (3 levels).",
            "Inorder left-node-right: 20, 30, 40, 50, 60, 70, 80 — sorted, as promised. That is the check you run after any insert sequence.",
            "Preorder (node-left-right): 50, 30, 20, 40, 70, 60, 80 — this is also the sequence you would insert to rebuild the same shape. Postorder: 20, 40, 30, 60, 80, 70, 50.",
          ],
          result:
            "Shape: 50 with left 30 (20,40) and right 70 (60,80). Inorder 20 30 40 50 60 70 80. Preorder 50 30 20 40 70 60 80.",
        },
        {
          title: "Search 40 and search 45 in that tree",
          prompt:
            "Using the BST of the previous example, trace the comparisons for keys 40 (present) and 45 (absent). How many comparisons in each case?",
          language: "java",
          code: `Node cur = root;
while (cur != null) {
    if (key == cur.k) return cur;
    cur = (key < cur.k) ? cur.left : cur.right;
}
return null; // miss`,
          steps: [
            "Search 40: compare with 50, 40<50 go left. Compare with 30, 40>30 go right. Compare with 40, hit. Three comparisons, which is the height of that node.",
            "Search 45: 45<50 left, 45>30 right, 45>40 so go to 40’s right child, which is null. Miss after three comparisons plus a null check.",
            "No node is examined except those on the search path. The left-of-30 nodes 20 and the entire right subtree of 50 are skipped. That pruning is the BST point.",
            "In an unsorted array, finding 40 would take up to 7 scans. In a balanced BST of n=7, height 3 ≈ log₂ 8. If we had inserted 20,30,40,50,60,70,80 in sorted order the tree would be a right spine of height 7, and search would be Θ(n).",
            "The exam may show a picture and ask ‘which keys are compared while searching 45?’ Answer: 50, 30, 40 only.",
          ],
          result:
            "40 found along 50→30→40 (3 compares). 45 misses along 50→30→40→null. Path-only work; other branches untouched.",
        },
        {
          title: "Delete 30 (two children) from the same tree",
          prompt:
            "Delete key 30, which has two children 20 and 40. Use the inorder-successor method. What is the tree after the delete? What would predecessor have done?",
          language: "cpp",
          code: `// 30 has two children. Successor = min of right subtree = 40 (leftmost of 40-null).
// Copy 40 into 30's key, then delete the original 40 (a leaf).
// Tree: 50; left is now 40 with left child 20; right still 70 (60,80).`,
          steps: [
            "30 is not a leaf and has two children, so we cannot just bypass. Find inorder successor: leftmost node of the right subtree of 30, which is 40 (40 has no left child).",
            "Copy 40’s key into the 30-node (or relink 40 into 30’s place). Then delete the successor node 40, which is a leaf: 30-node’s right becomes null.",
            "Resulting tree: 50; left child holds 40 with a left child 20; right child still 70 with 60 and 80. Inorder: 20, 40, 50, 60, 70, 80 — 30 is gone, order preserved.",
            "Inorder predecessor would have been the rightmost of the left subtree, i.e. 20. Copying 20 up and deleting that leaf is equally correct; the tree shape would differ (50’s left would be 20 with a right child 40).",
            "One-child delete is a bypass (parent points at the only child). Leaf delete is parent’s child ← null. Always handle the two-child case via successor or predecessor — never drop both subtrees.",
          ],
          result:
            "After successor-delete of 30: 50 with left 40 (left child 20) and right 70 (60,80). Inorder 20 40 50 60 70 80.",
        },
        {
          title: "Sorted insert sequence makes a degenerate BST",
          prompt:
            "Insert 10, 20, 30, 40 into an empty unbalanced BST. What is the height? What are search costs? Which structure would self-balance?",
          language: "python",
          code: `# each new key is larger than all existing -> always a right child
# 10
#   20
#     30
#       40
# height 3 (edges) / 4 nodes. Search 40 takes 4 compares.
# AVL would rotate on the third insert (imbalance 2) into a balanced shape.`,
          steps: [
            "10 is root. 20>10 → right of 10. 30>10 and 30>20 → right of 20. 40 hangs off 30. A linked-list of right children.",
            "Height is 3 (or 4 levels, depending on the ‘height of a leaf = 0 or 1’ convention — state yours). Search, insert, delete are all Θ(n) in this shape.",
            "Inorder is still 10,20,30,40 — the BST property holds. Correctness survived; complexity died. That is the unbalanced-BST exam moral.",
            "An AVL tree would see balance factor −2 on node 20 after inserting 30, rotate left, and finish as a small balanced tree. Red-black would recolour/rotate similarly. A heap would not keep inorder sorted.",
            "If the question gives a sorted input and an ordinary BST, tick Θ(n) worst case, not Θ(log n). Θ(log n) needs a balance guarantee or a hash table or a B-tree.",
          ],
          result:
            "Right spine 10-20-30-40, height 3, search 40 in 4 compares, Θ(n) operations. AVL/red-black would have rotated; a plain BST does not.",
        },
      ],
    },
    {
      heading: "Heaps: insert, extract-max, heapify",
      body: `A binary max-heap is a complete binary tree (filled level by level, left to right) in which every parent is ≥ its children. A min-heap flips the inequality. Completeness lets us store the heap in an array: index i has left 2i+1, right 2i+2, parent floor((i−1)/2) (0-based). Height is always Θ(log n) because a complete tree is balanced in shape even though it is not a BST.

Insert: append at the next leaf (end of the array) and sift up — swap with the parent while the heap property is violated. Θ(log n) worst, Θ(1) best (the new key is already small enough in a max-heap). Extract-max: the root is the answer; move the last leaf into the root, shrink size, sift down (heapify) along the larger child. Θ(log n).

Build-heap (heapify the whole array) is not n inserts. Bottom-up: call sift-down on every non-leaf from the last parent down to the root. The sum of the heights is Θ(n), so build is linear. Heap-sort is build Θ(n) plus n extracts Θ(n log n).

Heaps implement priority queues: Dijkstra, Prim, Huffman, OS schedulers, top-K. They do not give a sorted inorder, do not support fast arbitrary delete of a given key unless you have an index handle, and do not search in o(n). Decrease-key is Θ(log n) with a handle (binary heap) or amortised better in a Fibonacci heap.

Exam picture questions: ‘is this array a max-heap?’ — check every parent against both children. ‘One sift-down step’ — compare the node with its two children, swap with the larger if needed, recurse. Off-by-one in 1-based versus 0-based indexing is the usual arithmetic trap.`,
      bullets: [
        "Complete tree in an array. Parent ≥ children (max-heap).",
        "Insert: append + sift up Θ(log n). Extract: root ↔ last, sift down Θ(log n).",
        "Build-heap bottom-up Θ(n), not Θ(n log n).",
        "Not a BST: inorder is not sorted. Priority queue, not a search tree.",
      ],
      examples: [
        {
          title: "One sift-down (heapify) on [3, 9, 2, 1, 4, 5]",
          prompt:
            "0-based max-heapify at index 0, heap-size 6. Array [3, 9, 2, 1, 4, 5]. Show each comparison and swap until the heap property holds at the root’s path.",
          language: "python",
          code: `a = [3, 9, 2, 1, 4, 5]
def heapify(i, n):
    while True:
        L, R, largest = 2*i+1, 2*i+2, i
        if L < n and a[L] > a[largest]: largest = L
        if R < n and a[R] > a[largest]: largest = R
        if largest == i: return
        a[i], a[largest] = a[largest], a[i]
        i = largest
heapify(0, 6)
print(a)`,
          steps: [
            "i=0 holds 3. Left child index 1 holds 9, right child index 2 holds 2. The larger of {3,9,2} is 9 at index 1. 3<9, so swap: [9, 3, 2, 1, 4, 5]. Continue at i=1.",
            "i=1 now holds 3. Left child index 3 holds 1, right child index 4 holds 4. Larger of {3,1,4} is 4 at index 4. Swap 3 and 4: [9, 4, 2, 1, 3, 5]. Continue at i=4.",
            "i=4 holds 3. Left child would be 9, right 10 — both ≥ 6, so no children. Stop.",
            "Root 9 is ≥ children 4 and 2, and node 4 is ≥ children 1 and 3. Index 2 still holds 2 with a child 5, which violates the heap property — heapify(0) only sifts the original root’s path and does not repair sibling subtrees.",
            "A full bottom-up build would also heapify index 2 (swap 2 with 5) and yield [9,4,5,1,3,2]. For this question, one root heapify stops at [9,4,2,1,3,5].",
          ],
          result:
            "After heapify(0): [9, 4, 2, 1, 3, 5]. Path 0→1→4. Index 2 still violates (2<5); a full build-heap would fix that separately.",
        },
        {
          title: "Insert 15 into max-heap [10, 7, 8, 3, 2, 4]",
          prompt:
            "Insert 15 into the max-heap stored as [10, 7, 8, 3, 2, 4]. Show the array after the append and after each sift-up swap.",
          language: "java",
          code: `int[] a = {10,7,8,3,2,4, 0}; // extra slot
int n = 6;
a[n] = 15; n++;                 // append
int i = n-1;
while (i > 0 && a[(i-1)/2] < a[i]) {
    int p = (i-1)/2;
    int t = a[i]; a[i] = a[p]; a[p] = t;
    i = p;
}`,
          steps: [
            "Append 15 at index 6. Array [10, 7, 8, 3, 2, 4, 15]. Completeness is preserved (next leaf, left to right). Parent of 6 is 2 (value 8).",
            "15>8, swap: [10, 7, 15, 3, 2, 4, 8]. i moves to 2. Parent of 2 is 0 (value 10).",
            "15>10, swap: [15, 7, 10, 3, 2, 4, 8]. i moves to 0, which has no parent. Stop.",
            "Two swaps, Θ(height)=Θ(log n). If we had inserted 1, zero swaps would occur (best case Θ(1)).",
            "The new array is a max-heap: 15 ≥ 7 and 10; 10 ≥ 4 and 8; 7 ≥ 3 and 2. Insert did not need a full rebuild.",
          ],
          result:
            "After insert: [15, 7, 10, 3, 2, 4, 8]. Sift-up path index 6→2→0. Two swaps.",
        },
        {
          title: "Extract-max from [15, 7, 10, 3, 2, 4, 8]",
          prompt:
            "Perform one extract-max on the heap from the previous example. Who becomes the new root, and what does sift-down do?",
          language: "cpp",
          code: `// pop 15; move last leaf 8 to root; n drops to 6
// array [8,7,10,3,2,4]; heapify index 0
// children 7 and 10, swap with 10 -> [10,7,8,3,2,4]
// index 2=8, children 4 and 6(out); 8>4 stop`,
          steps: [
            "The max is the root 15. Swap it with the last leaf 8 and shrink n to 6. Array [8, 7, 10, 3, 2, 4] with 15 now sitting in the discarded tail (heap-sort would keep it there).",
            "Sift down i=0: children 7 (i=1) and 10 (i=2). Larger child 10 > 8, swap: [10, 7, 8, 3, 2, 4]. i=2.",
            "i=2 holds 8. Left child index 5 holds 4, right index 6 is out of the heap. 8≥4, stop.",
            "New heap [10, 7, 8, 3, 2, 4]. Extract-max returned 15. Cost Θ(log n), same as insert.",
            "n extract-max operations empty the heap in sorted decreasing order — that is heap-sort’s second phase. Combined with Θ(n) build, sort is Θ(n log n) in-place, not stable.",
          ],
          result:
            "Extracted 15. Remaining max-heap [10, 7, 8, 3, 2, 4]. Sift-down swapped 8 with 10 then stopped.",
        },
        {
          title: "Build-heap is linear: why n inserts are worse",
          prompt:
            "Compare ‘insert n keys into an empty heap’ versus ‘heapify an existing array of n keys’. Give the Θ bounds and a one-line reason.",
          language: "python",
          code: `# n inserts: each sift-up is O(log n), total O(n log n)
# bottom-up: heapify nodes at height h; there are ~ n/2^{h+1} of them
# work = sum_h (n/2^{h+1}) * O(h) = O(n) * sum h/2^h = O(n)
# last parent index = n//2 - 1 in 0-based`,
          steps: [
            "n inserts: the k-th insert sifts up a tree of size k, O(log k). Sum_{k=1..n} log k = Θ(n log n). Leaves are inserted last and may travel the full height.",
            "Bottom-up build: most nodes live near the leaves, where sift-down is O(1). Half the nodes are leaves and do no work. A quarter sit at height 1, and so on. The geometric sum is Θ(n).",
            "Practical check: heap-sort calls build once (linear) then n extracts (n log n). Replacing build by n inserts would worsen the leading term’s constant and the asymptotic of the build phase.",
            "Exam trap: ‘creating a heap is always n log n’. False for Floyd’s bottom-up method. True if the only primitive you use is insert.",
            "Index of the last non-leaf is floor(n/2)−1 (0-based). The build loop runs i from that index down to 0 calling heapify(i).",
          ],
          result:
            "n inserts: Θ(n log n). Bottom-up heapify: Θ(n). Use bottom-up when the array is already filled; use insert when keys stream in.",
        },
      ],
    },
    {
      heading: "Hashing as a data structure",
      body: `From the DS paper’s point of view a hash table is an unordered dictionary: insert, search, delete in expected Θ(1) under uniform hashing, worst Θ(n) when all keys collide. The array of buckets is the backing store; the hash function and the collision strategy (chaining or open addressing) are the policy.

Load factor α = n/m. Rehash (allocate a larger array, re-insert everything) when α exceeds a threshold (0.75 is the usual open-addressing / Java HashMap trigger). Rehash is Θ(n) but amortised over the preceding inserts. Choosing m as a prime (or a power of two with a mixing hash) reduces systematic collisions.

Chaining: each bucket is a list (or a red-black tree past a length cutoff). α may exceed 1. Open addressing: all keys live in the table array; α must stay < 1; deletions use tombstones. Linear probing clusters; double hashing spreads.

A hash table does not keep keys in order. If you need ordered iteration, use a BST / TreeMap or maintain a parallel insertion-order list (LinkedHashMap). Hashing a mutable key (a list you later append to) loses the entry — keys must be immutable for the lifetime of the table.

SEBI overlaps this section with the algorithms hashing notes. Here the emphasis is the ADT, the array+list picture, and complexities next to BST and heap: hash expected O(1) search but no min, BST O(log n) search and min via leftmost, heap O(1) min/max but O(n) search.`,
      bullets: [
        "Expected O(1) insert/search/delete; worst O(n); unordered.",
        "α=n/m; rehash when α is high. m prime or power of two with a good mix.",
        "Chaining vs open addressing: see algorithms notes; tombstones on open-address delete.",
        "Not a priority queue, not a sorted map. Keys must be immutable.",
      ],
      examples: [
        {
          title: "Where does key 42 go, and what if the slot is taken?",
          prompt:
            "m=10, h(k)=k mod 10. Table already holds 12 at slot 2. Insert 42. Show chaining versus linear probing.",
          language: "python",
          code: `# chaining: bucket 2 becomes [42, 12] (prepend) or [12, 42]
# linear probing: slot 2 full, try 3, 4, ... first hole
# search 42 later: chaining looks only at bucket 2; probing walks from 2 until 42 or a hole`,
          steps: [
            "h(42)=2, same as h(12)=2. Collision is certain — two keys, one home slot.",
            "Chaining: attach 42 in bucket 2’s list. Slot 3 is untouched. Search 42 hashes to 2 and walks the list.",
            "Linear probing: slot 2 occupied, probe 3. If empty, store 42 at 3. Search 42 starts at 2, skips 12, finds 42 at 3. A hole before 42 would be a false miss — that is why deletes need tombstones.",
            "If 10 more keys all hashed to 2, chaining’s bucket-2 list has length 11 (search Θ(α_local)), while linear probing would have made a cluster of 11 consecutive slots and slowed every nearby key.",
            "Rehash at α>0.7 (probing) or α>1 (chaining, optional) allocates m′≈2m and reinserts. 42’s new home is 42 mod m′, not necessarily related to 2.",
          ],
          result:
            "Chaining stores 42 in bucket 2’s list. Linear probing stores it in the first open slot after 2 (usually 3). Same hash, different collision layout.",
        },
        {
          title: "ADT comparison: hash vs BST vs heap for three queries",
          prompt:
            "You need (i) search a given id, (ii) the smallest id, (iii) extract the highest priority. Which structure for each, and the expected time?",
          language: "java",
          code: `// (i) HashMap / unordered_map     expected O(1), worst O(n)
//     TreeMap / TreeSet           O(log n) guaranteed if balanced
// (ii) TreeSet.first()            O(log n) (leftmost)
//     heap is O(1) only for the min if it is a min-heap, but then search is O(n)
// (iii) max-heap extract          O(log n)
//     BST max is rightmost        O(log n) but extract needs delete too`,
          steps: [
            "Search by exact id with no order needed: hash table, expected Θ(1). A BST is the worst-case Θ(log n) alternative if you fear adversarial keys.",
            "Smallest id: a min-heap’s root is Θ(1) peek but only if the heap’s order is the id. A BST’s leftmost is Θ(log n) (Θ(1) with a cached pointer). A hash table must scan all keys, Θ(n).",
            "Highest priority extract: max-heap, Θ(log n). A BST keyed by priority also works at Θ(log n) with delete. A hash table keyed by id cannot extract max without a scan or a second index.",
            "Real systems combine them: a HashMap for id lookup plus a heap of handles for priority, or a TreeMap if you need ordered iteration too.",
            "Tick the structure whose invariant matches the query. ‘Use a heap for everything’ fails search; ‘use a hash for everything’ fails min/max.",
          ],
          result:
            "(i) hash expected O(1) (ii) BST leftmost or min-heap peek (iii) max-heap extract. One structure rarely wins all three.",
        },
        {
          title: "Rehash doubles m: where do the old keys go?",
          prompt:
            "m=4, h(k)=k mod 4, chaining. Keys 1, 4, 9 live in buckets 1, 0, 1. Rehash to m=8 with h(k)=k mod 8. Place them.",
          language: "cpp",
          code: `// old: bucket0: [4]  bucket1: [9,1]  (prepend order arbitrary)
// new m=8:
// 1 % 8 = 1
// 4 % 8 = 4
// 9 % 8 = 1
// 4 moved house; 1 and 9 still share a bucket`,
          steps: [
            "Old homes: 4→0, 1→1, 9→1. α=3/4.",
            "New m=8: 4→4 (moved), 1→1 (stayed), 9→1 (stayed). A rehash is not a no-op even for keys that ‘look small’.",
            "Every key is reinserted from scratch; you cannot just copy bucket lists, because h changed. Time Θ(n).",
            "9 and 1 still collide. Doubling m halves expected α but does not eliminate a pair that remains congruent modulo the new m as well (here 9≡1 mod 8).",
            "A different hash (e.g. multiply-shift) might split them. Rehashing is about α, not a promise that every old collision dies.",
          ],
          result:
            "After rehash to 8: 4 in bucket 4; 1 and 9 still in bucket 1. Rehash is Θ(n) reinsertion, not a pointer copy of old chains.",
        },
        {
          title: "Why a mutable list is a bad hash key",
          prompt:
            "In Java, use a mutable List as a HashMap key, then list.add(3). What happens to a later get(key)?",
          language: "java",
          code: `List<Integer> key = new ArrayList<>(List.of(1, 2));
Map<List<Integer>, String> m = new HashMap<>();
m.put(key, "A");
key.add(3);                 // mutates the key
String v = m.get(key);      // looks in a different bucket
// also m.get(List.of(1,2)) misses, and the entry is stranded`,
          steps: [
            "put hashes the list [1,2], say into bucket 17, and stores the entry there.",
            "key.add(3) changes the list’s hashCode (it depends on the elements). The object is still the same reference, but its hash is now different.",
            "get(key) hashes [1,2,3] and looks in a different bucket. The entry in bucket 17 is never seen. The map appears to have lost ‘A’.",
            "Even get(List.of(1,2)) fails: that is a different object, and the stranded entry is no longer under hash [1,2] either if equals still sees [1,2,3].",
            "Rule: hash keys must be immutable (String, Integer, a frozen tuple, a record of immutables). BST keys should also not change, or the tree order breaks. This is a DS question that overlaps security (integrity of the lookup invariant).",
          ],
          result:
            "After mutating the list, get cannot find the entry: it is stranded in the old bucket. Never use a mutable object as a hash key.",
        },
      ],
    },
    {
      heading: "Matrices and JSON as trees",
      body: `A matrix is a 2-D array. In row-major layout (C, Java, Python C-order) a[i][j] lives at base+(i×ncols+j)×size. Column-major (Fortran, MATLAB default, R matrices) uses i+j×nrows. Cache-friendly loops walk the stored dimension last. An n×n dense matrix uses Θ(n²) memory; a sparse matrix (CSR/CSC, adjacency list) uses Θ(n+nnz).

Common matrix jobs: transpose Θ(n²), multiply naïve Θ(n³), Strassen o(n³), rotate 90° in-place (transpose then reverse each row), spiral listing, search in a row-and-column sorted matrix (staircase from top-right in O(n+m)). Indexing mistakes (swap of row/col, 0 vs 1) dominate MCQ traps.

JSON is a tree, not a table. A JSON value is an object (unordered string-keyed map of values), an array (ordered list of values), or a scalar (string, number, boolean, null). Nested objects and arrays give a rooted tree. Paths like user.roles[1] are root-to-leaf walks. Parsing JSON is recursive descent; a DOM is the explicit tree; SAX/event parsers are a stack walk that never materialises the whole tree.

Treating JSON as a relational table fails when keys are missing, arrays nest, or types mix. Flattening to a map of path→scalar is a tree-to-table projection used in logs. XML is a similar tree with attributes; the DS paper names JSON specifically.

Exam crossover: a JSON object is a hash map of children; a JSON array is an array list; nesting is a tree; a pointer to a nested object is a child reference. Traversal is DFS (preorder of keys) or BFS (level by nesting depth). Cycle-free by spec — JSON cannot encode a pointer cycle without an extra id/ref convention.`,
      bullets: [
        "Row-major: a[i][j] at i×ncols+j. Naïve multiply n³. Sparse: store nonzeros.",
        "Rotate 90° CW: transpose then reverse rows.",
        "JSON value = object | array | scalar. Nested ⇒ tree. Path = tree walk.",
        "Object ≈ map, array ≈ list. No cycles. Missing keys are normal.",
      ],
      examples: [
        {
          title: "Row-major address of a[2][3] in a 4×5 matrix",
          prompt:
            "Base address B=1000, 4 rows, 5 columns, each element 4 bytes, row-major, 0-based. Address of a[2][3]? Of a[3][0]? Contrast with column-major.",
          language: "cpp",
          code: `// row-major: addr = B + (i*ncols + j) * size
// a[2][3] -> 1000 + (2*5 + 3)*4 = 1000 + 13*4 = 1052
// a[3][0] -> 1000 + (3*5 + 0)*4 = 1000 + 15*4 = 1060
// column-major: B + (i + j*nrows)*size
// a[2][3] -> 1000 + (2 + 3*4)*4 = 1000 + 14*4 = 1056`,
          steps: [
            "Row-major packs row 0’s five elements first (offsets 0..4), then row 1 (5..9), then row 2 (10..14). a[2][3] is the 4th element of row 2, linear index 2×5+3=13.",
            "Byte offset 13×4=52. Address 1000+52=1052.",
            "a[3][0] is the first element of the last row, linear index 15, address 1060. It sits immediately after a[2][4] in row-major.",
            "Column-major would pack column 0 first (a[0][0], a[1][0], a[2][0], a[3][0]), so a[2][3] is in column 3, index 2+3×4=14, address 1056. Same indices, different address.",
            "A C nested loop for(i) for(j) a[i][j] walks row-major and is cache-friendly. Swapping the loops on a large matrix is a measurable slowdown and a systems-MCQ cameo.",
          ],
          result:
            "Row-major a[2][3] at 1052, a[3][0] at 1060. Column-major a[2][3] at 1056. Layout — not just indices — decides the address.",
        },
        {
          title: "Rotate a 3×3 matrix 90° clockwise in place",
          prompt:
            "Matrix [[1,2,3],[4,5,6],[7,8,9]]. Rotate 90° clockwise by transpose then reverse each row. Show both stages.",
          language: "python",
          code: `a = [[1,2,3],[4,5,6],[7,8,9]]
n = 3
for i in range(n):
    for j in range(i+1, n):
        a[i][j], a[j][i] = a[j][i], a[i][j]
for i in range(n):
    a[i].reverse()
print(a)  # [[7,4,1],[8,5,2],[9,6,3]]`,
          steps: [
            "Transpose (swap a[i][j] with a[j][i] for j>i): [[1,4,7],[2,5,8],[3,6,9]]. Rows become columns.",
            "Reverse each row: row0 [1,4,7]→[7,4,1], row1 [2,5,8]→[8,5,2], row2 [3,6,9]→[9,6,3].",
            "Check corners after 90° clockwise: 1 moves from (0,0) to (0,2), 3 from (0,2) to (2,2), 9 from (2,2) to (2,0), 7 from (2,0) to (0,0). The result matches.",
            "90° counter-clockwise is transpose then reverse columns (or reverse rows first then transpose). 180° is reverse rows and columns.",
            "In-place for n×n; a non-square m×n rotate needs a new n×m buffer. Time Θ(n²), extra Θ(1) for square in-place.",
          ],
          result:
            "[[7,4,1],[8,5,2],[9,6,3]]. Stage 1 transpose, stage 2 reverse each row. 1 moved from (0,0) to (0,2).",
        },
        {
          title: "JSON document as a tree: walk user.roles[1]",
          prompt:
            "Document {\"user\": {\"id\": 1, \"roles\": [\"admin\", \"it\"]}}. Draw the tree. How many steps to read user.roles[1]? What DS is each node?",
          language: "python",
          code: `doc = {"user": {"id": 1, "roles": ["admin", "it"]}}
print(doc["user"]["roles"][1])  # "it"
# tree:
# root(object)
#   └── user(object)
#         ├── id(scalar 1)
#         └── roles(array)
#               ├── [0] scalar "admin"
#               └── [1] scalar "it"`,
          steps: [
            "Root is a JSON object (hash map). One child key \"user\" whose value is another object. That object has two children: \"id\" (number 1) and \"roles\" (array of two strings).",
            "Path user.roles[1]: hash lookup \"user\" at the root, hash lookup \"roles\" in that object, then array index 1. Three hops. Value \"it\".",
            "Each object node is a map (average O(1) keyed access). Each array node is a list (O(1) index, O(n) scan). Scalars are leaves. The document is a tree because every value has one parent except the root.",
            "Missing path user.email is a missing-child, not an exception in some APIs (optional chaining) and a KeyError in others. Arrays have no holes in JSON (nulls must be explicit).",
            "Pretty-print / DFS preorder visits root, then user, then id, then roles, then admin, then it. BFS would visit by nesting depth. Either is a tree traversal — the same BFS/DFS as in the algorithms notes, on a different payload.",
          ],
          result:
            "Tree of 6 nodes (root, user, id, roles, admin, it). user.roles[1] = \"it\" in three hops. Objects are maps; arrays are lists; nesting is a tree.",
        },
        {
          title: "Staircase search in a row-and-column sorted matrix",
          prompt:
            "Matrix rows and columns are sorted ascending:\n1  4  7 11\n2  5  8 12\n3  6  9 16\n10 13 14 17\nSearch 9 starting at the top-right. Trace the walk. Why is this O(n+m), not binary search’s log(nm)?",
          language: "java",
          code: `int[][] a = {{1,4,7,11},{2,5,8,12},{3,6,9,16},{10,13,14,17}};
int r = 0, c = 3, t = 9;
while (r < 4 && c >= 0) {
    if (a[r][c] == t) break;
    if (a[r][c] > t) c--;   // this column's remaining values are even larger
    else r++;               // this row's remaining values are even smaller
}`,
          steps: [
            "Start r=0,c=3, a[0][3]=11 > 9, so 9 cannot be in this column (everything below 11 is ≥11). c←2.",
            "a[0][2]=7 < 9, so 9 cannot be in this row to the left (those are ≤7). r←1.",
            "a[1][2]=8 < 9, r←2. a[2][2]=9, hit. Path (0,3)→(0,2)→(1,2)→(2,2).",
            "Each step discards a row or a column, so at most n+m steps. Binary-searching each row would be n log m, which is also fine but slower in the typical square case if you count the worse of the two.",
            "You cannot flatten to 1-D binary search: 11 sits before 2 in row-major order, so the virtual 1-D array is not sorted. Flattening only works when the first of row i+1 is ≥ last of row i (a stronger global order).",
          ],
          result:
            "9 found at (2,2) after the walk 11→7→8→9. O(n+m) staircase from a corner. Row-major flattening is not sorted, so one global binary search would be wrong.",
        },
      ],
    },
  ],
};
