import type { TopicNote } from "@/data/notes";

export const notesProgramming: TopicNote = {
  topic: "programming",
  title: "Java / C / C++ — worked notes",
  blurb:
    "SEBI Grade A IT paper-2 programmes are almost always dry-runs: a short Java, C or C++ fragment, four output choices, and a trap that hinges on binding, lifetime or evaluation order. Trace every statement into a table of locals, the object on the heap, and the printed buffer. Recursion is just a stack of those tables. Overload resolution, field access, static calls and private methods bind on the compile-time type; only virtual / overridden instance methods wait for the runtime object. super()/this() must be the first constructor action; a C++ destructor is the reverse of construction, and delete through a base pointer is defined only if that destructor is virtual. i++ yields the old value then increments; ++i increments then yields. String methods return new objects; StringBuilder mutates. catch the most specific type first; finally still runs; a return inside finally replaces the pending value. C++ default arguments are evaluated at the call site, in the caller’s context, each time the argument is omitted.",
  blocks: [
    {
      heading: "Iteration vs recursion",
      body: "A loop reuses one stack frame and updates a handful of locals until a condition fails. Recursion creates a fresh frame per call: parameters, locals, and a return address. The base case is the only frame that does not call further; after it returns, frames pop and combine results. Java and C++ do not guarantee tail-call elimination, so a linear recursion of depth n uses Θ(n) stack even when a loop would use Θ(1).\n\nExam questions mix a recursive definition with a small n and ask for the printed value or the number of calls. Draw one row per live frame: function name, parameter n, and what that frame will multiply or add after the recursive result comes back. Count the base-case hits if they ask how many times a print runs.\n\nMutual recursion (even calling odd, tree left then right) is the same table, just with two function names. An infinite loop spins forever; unbounded recursion dies with StackOverflowError / stack overflow. If the code both prints before the recursive call and after it, you are looking at preorder plus postorder on the call tree.\n\nWhen an MCQ gives both a loop and a recursive function, fill the loop table first — it is usually the same numeric result — then count recursive frames only if they ask for prints or call counts.",
      bullets: [
        "Loop: one frame, mutating i / acc. Recursion: n frames, immutable n in each Java/C++ call (the caller’s n is a copy).",
        "fact(n) = n * fact(n-1) does the multiply on the way back up, not on the way down.",
        "Java has no guaranteed tail recursion; do not pick “O(1) stack” for a recursive linear function.",
      ],
      examples: [
        {
          title: "Recursive factorial — Java",
          prompt: "Trace fact(4) and give the printed value.",
          language: "java",
          code: `class Main {
  static int fact(int n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
  }
  public static void main(String[] args) {
    System.out.print(fact(4));
  }
}`,
          steps: [
            "main calls fact(4). Frame table: [fact n=4]. 4 <= 1 is false, so this frame waits on 4 * fact(3).",
            "fact(3): [n=4 | n=3]. 3 <= 1 false, waits on 3 * fact(2).",
            "fact(2): [n=4 | n=3 | n=2]. waits on 2 * fact(1).",
            "fact(1): [n=4 | n=3 | n=2 | n=1]. 1 <= 1 true, return 1. No further call.",
            "Unwinding: fact(2) = 2*1 = 2. fact(3) = 3*2 = 6. fact(4) = 4*6 = 24. print 24.",
          ],
          result: "24",
        },
        {
          title: "Print-before and print-after — Java",
          prompt: "What does rec(3) print? (no spaces)",
          language: "java",
          code: `class Main {
  static void rec(int n) {
    if (n == 0) return;
    System.out.print(n);
    rec(n - 1);
    System.out.print(n);
  }
  public static void main(String[] args) {
    rec(3);
  }
}`,
          steps: [
            "rec(3): print 3, then call rec(2). Buffer = 3. Frames: [n=3].",
            "rec(2): print 2, call rec(1). Buffer = 32. Frames: [n=3 | n=2].",
            "rec(1): print 1, call rec(0). Buffer = 321. Frames: [n=3 | n=2 | n=1].",
            "rec(0): n == 0, return immediately. No print.",
            "Pop rec(1): post-print 1. Buffer = 3211. Pop rec(2): print 2 → 32112. Pop rec(3): print 3 → 321123.",
          ],
          result: "321123",
        },
        {
          title: "Iterative sum vs the recursive twin — C++",
          prompt: "The loop and the recursion compute the same n? Print both results.",
          language: "cpp",
          code: `#include <iostream>
int rec(int n) {
  if (n == 0) return 0;
  return n + rec(n - 1);
}
int main() {
  int n = 4, s = 0;
  for (int i = 1; i <= n; i++) s += i;
  std::cout << s << rec(4);
}`,
          steps: [
            "Loop init: n=4, s=0, i will run 1..4. Table: i | s",
            "i=1: s=0+1=1. i=2: s=1+2=3. i=3: s=3+3=6. i=4: s=6+4=10. i=5 stops.",
            "rec(4) waits 4+rec(3); rec(3) waits 3+rec(2); rec(2) waits 2+rec(1); rec(1) waits 1+rec(0); rec(0) returns 0.",
            "Unwinding: 1+0=1, 2+1=3, 3+3=6, 4+6=10. Same 10 as the loop (sum 1..n).",
            "cout prints s then rec(4) with no separator: 10 and 10 concatenated.",
          ],
          result: "1010",
        },
        {
          title: "How many base-case hits? — Java Fibonacci",
          prompt: "How many times is the n<=1 return taken while evaluating fib(4)? Print that count.",
          language: "java",
          code: `class Main {
  static int hits = 0;
  static int fib(int n) {
    if (n <= 1) { hits++; return n; }
    return fib(n - 1) + fib(n - 2);
  }
  public static void main(String[] args) {
    fib(4);
    System.out.print(hits);
  }
}`,
          steps: [
            "Call tree for fib(4): fib(3)+fib(2). fib(3)=fib(2)+fib(1). fib(2)=fib(1)+fib(0) on every fib(2).",
            "Leaves are n=1 or n=0. List leaves left-to-right: from fib(4)→fib(3)→fib(2)→fib(1), then fib(0); then fib(3)’s fib(1); then fib(4)’s fib(2)→fib(1), fib(0).",
            "That is five leaf calls: (1), (0), (1), (1), (0). hits increments once per leaf.",
            "Internal nodes fib(4), fib(3), fib(2), fib(2) do not touch hits. fib(4) value is 3 but we print hits, not the Fibonacci number.",
            "After fib(4) returns, hits=5. print 5.",
          ],
          result: "5",
        },
      ],
    },
    {
      heading: "Scope and shadowing",
      body: "A name is resolved in the innermost block that declares it, then outward: local → enclosing block → method parameter → instance field / class member → static / global. A same-named inner declaration hides (shadows) the outer one for the rest of that inner block. this.x / ::x / ClassName.x is how you still reach the hidden name.\n\nJava for-loop int i lives only in the loop (Java 8+). A second for with int i in the same method is legal because the first i is out of scope. C++ is the same for a for-init declaration. A C++ if (int x = f()) { } scopes x to the if/else.\n\nShadowing does not mutate the outer variable. Assigning to the inner x leaves the field / outer x unchanged. Exams love a field x = 1, a local x = 2, and a print of x versus this.x.\n\nIf two declarations of i appear in one method, check whether they sit in disjoint scopes (two for-loops) before you pick “compile error”. A parameter named like a field is the same trap as a local: this.n = n is the write they omitted.",
      bullets: [
        "Innermost declaration wins. this.x / obj.x reads the field, not the local.",
        "Two locals named x in the same block: compile error (duplicate).",
        "C++ global int x; then local x; ::x is the global.",
      ],
      examples: [
        {
          title: "Field vs local — Java",
          prompt: "What is printed?",
          language: "java",
          code: `class Box {
  int x = 1;
  void m() {
    int x = 2;
    System.out.print(x + " " + this.x);
  }
  public static void main(String[] args) {
    new Box().m();
  }
}`,
          steps: [
            "new Box(): field x is 1. Object table: {x: 1}.",
            "m() declares local int x = 2. Frame: local x=2, this.x=1. The local shadows the field.",
            "Bare x in the print is the local (2).",
            "this.x is the field (1). The assignment to local x never wrote the field.",
            "print with a space: 2 then 1.",
          ],
          result: "2 1",
        },
        {
          title: "Block shadowing — C++",
          prompt: "What does main print?",
          language: "cpp",
          code: `#include <iostream>
int x = 1;
int main() {
  int x = 2;
  {
    int x = 3;
    std::cout << x;
  }
  std::cout << x << ::x;
}`,
          steps: [
            "Global x=1. main’s local x=2 shadows the global for the rest of main.",
            "Inner block declares another x=3. Inside the braces, bare x is 3. First cout prints 3.",
            "Inner x is destroyed at the closing brace. It does not assign 3 into main’s x.",
            "After the block, bare x is main’s local again (2). Second cout prints 2.",
            "::x is the global (1). Concatenated output with no spaces: 321.",
          ],
          result: "321",
        },
        {
          title: "Loop index scope — Java",
          prompt: "Does this compile, and if so what is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    int s = 0;
    for (int i = 0; i < 2; i++) s += i;
    for (int i = 10; i < 12; i++) s += i;
    System.out.print(s);
  }
}`,
          steps: [
            "First for declares i in the loop’s own scope. i=0: s=0. i=1: s=1. i=2 stops. First i is then out of scope.",
            "Second for may declare a new int i. That is not a duplicate in main’s block.",
            "i=10: s=1+10=11. i=11: s=11+11=22. i=12 stops.",
            "There is no i in main after the loops; only s is printed.",
            "s=22. Compiles and prints 22.",
          ],
          result: "22",
        },
        {
          title: "Parameter shadows the field — Java",
          prompt: "After set(9), what is printed?",
          language: "java",
          code: `class C {
  int n = 0;
  void set(int n) { n = n; }
  public static void main(String[] args) {
    C c = new C();
    c.set(9);
    System.out.print(c.n);
  }
}`,
          steps: [
            "new C(): field n=0.",
            "set(9): parameter n=9. The parameter shadows the field for the whole method body.",
            "n = n assigns the parameter to itself. Dead store. Field this.n is never written.",
            "Correct write would be this.n = n. That is not what the body does.",
            "c.n is still 0. print 0.",
          ],
          result: "0",
        },
      ],
    },
    {
      heading: "Pass-by-value, reference, and pointer",
      body: "Java is pass-by-value only. For a primitive, the callee gets a copy of the bits. For an object, the callee gets a copy of the reference: both variables point at the same heap object, so mutating fields/array slots is visible to the caller, but rebinding the parameter (a = new … / a = null) is not.\n\nC and C++ pass primitives by value unless you take an address. C++ adds references: void swap(int& a, int& b) names the caller’s objects. A pointer parameter (int* p) is itself passed by value (the address is copied) but *p writes through to the caller’s int. Swapping two pointers in the callee does not swap the caller’s pointer variables unless you pass int** or int*& .\n\nExam trap: a Java swap(Integer a, Integer b) cannot rebind the caller’s variables, and Integer is immutable so you cannot even mutate a value in place. An int[] can be swapped at the slots because the array object is shared.\n\nAsk three questions on every call: is the parameter a copy of a scalar, a copy of a reference/pointer, or a C++ alias? Then ask whether the callee writes through (*p, a[i]=, append) or rebinds (a = …).",
      bullets: [
        "Java: cannot make the caller’s local start pointing at a different object.",
        "C++ int& : alias. C++ int* : copy of an address; dereference to mutate.",
        "Reassigning a Java parameter vs calling a mutating method (list.add, arr[i]=) are different stories.",
      ],
      examples: [
        {
          title: "Java primitive swap fails",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  static void swap(int a, int b) {
    int t = a; a = b; b = t;
  }
  public static void main(String[] args) {
    int x = 1, y = 2;
    swap(x, y);
    System.out.print(x + " " + y);
  }
}`,
          steps: [
            "main: x=1, y=2.",
            "swap copies: parameter a=1, b=2. Caller x,y unchanged so far.",
            "t=1, a=2, b=1. Callee table: a=2, b=1. These are different slots from x,y.",
            "swap returns. main’s x and y were never written.",
            "print 1 2.",
          ],
          result: "1 2",
        },
        {
          title: "C++ reference swap works",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
void swap(int& a, int& b) {
  int t = a; a = b; b = t;
}
int main() {
  int x = 1, y = 2;
  swap(x, y);
  std::cout << x << y;
}`,
          steps: [
            "main: x=1, y=2.",
            "swap(x,y): a is an alias for x, b an alias for y. No extra int objects.",
            "t=1 (copy of x). a=b writes y’s 2 into x. Table: x=2, y=2, t=1.",
            "b=t writes 1 into y. Table: x=2, y=1.",
            "cout << x << y prints 21.",
          ],
          result: "21",
        },
        {
          title: "C++ pointer: mutate through, do not swap the pointers",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
void f(int* p, int* q) {
  *p = 9;
  int* t = p; p = q; q = t;
}
int main() {
  int x = 1, y = 2;
  int* px = &x; int* py = &y;
  f(px, py);
  std::cout << x << y << *px << *py;
}`,
          steps: [
            "x=1, y=2, px=&x, py=&y.",
            "f copies the addresses: p=&x, q=&y. *p = 9 writes through to x. Table: x=9, y=2.",
            "t=p; p=q; q=t swaps only the callee’s pointer copies. px and py in main are untouched.",
            "Return: x=9, y=2, *px is still x (9), *py is still y (2).",
            "cout concatenates 9 2 9 2 → 9292.",
          ],
          result: "9292",
        },
        {
          title: "Java array is a shared object",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  static void bump(int[] a) {
    a[0] = 8;
    a = new int[] { 9 };
  }
  public static void main(String[] args) {
    int[] x = { 1, 2 };
    bump(x);
    System.out.print(x[0] + " " + x.length);
  }
}`,
          steps: [
            "main: x → heap [1, 2], length 2.",
            "bump copies the reference: a and x point at the same array. a[0]=8 writes the heap. Array is [8, 2].",
            "a = new int[]{9} rebinds only the parameter a to a new length-1 array. x in main still points at [8, 2].",
            "Return. x[0] is 8, x.length is 2.",
            "print 8 2.",
          ],
          result: "8 2",
        },
      ],
    },
    {
      heading: "Overload vs override; fields, static, private",
      body: "Overloading is several methods with the same name and different parameter lists in one class (or inherited and not overriding). The compiler picks one using the call’s compile-time argument types. That is static / compile-time polymorphism. C++ operator overloading is the same idea.\n\nOverriding is a subclass instance method with the same signature. In Java every instance method is virtual; in C++ you need the virtual keyword on the base. The call uses the runtime class of the object (dynamic dispatch / vtable), not the type of the variable. Fields never override: p.x uses the field declared in the compile-time type of p. static methods hide rather than override; the compile-time type wins. private methods are not visible to subclasses, so a same-named private in the child is a new method; a call inside the parent still binds to the parent’s private.\n\nA favourite SEBI/GATE combo: Parent p = new Child(); print p.x, p.m(), p.s() where x is a field, m is an instance method, s is static. Expect field and static from Parent, instance method from Child.\n\nWrite P/C above the variable and above the object. Fields, statics and privates read the variable’s type; instance methods read the object’s type if they are virtual / overridable.",
      bullets: [
        "Overload set is frozen at compile time; then the chosen signature is dispatched (if virtual).",
        "Child.show(String) does not override Parent.show(Object). Extra overloads in the child are invisible through a Parent reference.",
        "C++ without virtual: p->f() is Base::f even if the object is Derived.",
      ],
      examples: [
        {
          title: "Java field compile-time, method runtime",
          prompt: "What is printed?",
          language: "java",
          code: `class Parent {
  int x = 1;
  String m() { return "P"; }
}
class Child extends Parent {
  int x = 2;
  @Override String m() { return "C"; }
}
class Main {
  public static void main(String[] args) {
    Parent p = new Child();
    System.out.print(p.x + " " + p.m());
  }
}`,
          steps: [
            "p’s compile-time type is Parent; runtime object is Child. Heap has Parent.x=1 and Child.x=2 (two fields).",
            "p.x: field access uses compile-time type Parent → 1.",
            "p.m(): instance method, virtual. Child overrides m → \"C\".",
            "No autoboxing trick; concatenation is int + space + String.",
            "print 1 C.",
          ],
          result: "1 C",
        },
        {
          title: "Static and private bind in the parent — Java",
          prompt: "What is printed?",
          language: "java",
          code: `class A {
  static String s() { return "As"; }
  private String p() { return "Ap"; }
  String call() { return s() + p(); }
}
class B extends A {
  static String s() { return "Bs"; }
  private String p() { return "Bp"; }
}
class Main {
  public static void main(String[] args) {
    A x = new B();
    System.out.print(x.call());
  }
}`,
          steps: [
            "x.call() is an instance method inherited by B. Body of A.call runs (B does not override call).",
            "Inside A.call, s() is static. The compiler binds s() to A.s. Hiding in B is ignored. Yields As.",
            "Inside A.call, p() is private in A. Invokespecial A.p. B.p is a different private method and is not in the dispatch.",
            "A.p returns Ap. Concatenation As + Ap with no space.",
            "print AsAp.",
          ],
          result: "AsAp",
        },
        {
          title: "C++ virtual vs non-virtual",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
struct B {
  virtual void f() { std::cout << "Bf"; }
  void g() { std::cout << "Bg"; }
};
struct D : B {
  void f() { std::cout << "Df"; }
  void g() { std::cout << "Dg"; }
};
int main() {
  B* p = new D;
  p->f();
  p->g();
}`,
          steps: [
            "p has static type B*, dynamic type D.",
            "f is virtual. p->f() looks up D’s vtable slot → Df.",
            "g is not virtual. p->g() is bound at compile time to B::g → Bg.",
            "D::g exists but is not selected through a B*. (p->g() would be Dg only if g were virtual or the static type were D*.)",
            "Output concatenated: DfBg.",
          ],
          result: "DfBg",
        },
        {
          title: "Overload chosen, then override — Java",
          prompt: "What is printed?",
          language: "java",
          code: `class Parent {
  String show(Object x) { return "PO"; }
}
class Child extends Parent {
  @Override String show(Object x) { return "CO"; }
  String show(String x) { return "CS"; }
}
class Main {
  public static void main(String[] args) {
    Parent p = new Child();
    System.out.print(p.show("sebi"));
  }
}`,
          steps: [
            "Compile-time type of p is Parent. Parent has only show(Object). Overload resolution picks show(Object) even though the argument is a String.",
            "Child.show(String) is not in the overload set of a Parent reference.",
            "The chosen signature show(Object) is an instance method. Runtime type Child overrides it with Child.show(Object).",
            "Child.show(Object) returns CO. The String overload is never called.",
            "print CO.",
          ],
          result: "CO",
        },
      ],
    },
    {
      heading: "Constructors, this()/super(), destructors",
      body: "A constructor has the class name and no return type. In Java the first statement must be this(…) or super(…) if you write either; otherwise the compiler inserts super(). this() delegates to a sibling constructor; that sibling will call super (explicitly or implicitly). Instance field initialisers and instance blocks of this class run after the super constructor returns and before the rest of this constructor’s body.\n\nC++ constructs bases first, then members in declaration order, then the constructor body. Destruction is the exact reverse: body of ~Derived, then derived members, then ~Base. If you delete a derived object through a Base*, Base’s destructor must be virtual; otherwise the call is statically ~Base and the program has undefined behaviour (derived cleanup skipped).\n\nWhile a C++ constructor is running, the object’s dynamic type is the class under construction. A virtual call from Base::Base() uses Base’s vtable, not Derived’s — another standard MCQ.\n\nPencil the chain as a stack: this()/super() or C++ base initialisers first, prints on the way down for construction and on the way up for destruction.",
      bullets: [
        "Java: this() or super() first; you cannot have both in the same constructor.",
        "new Child() prints Base then Child if both constructors print.",
        "delete (Base*)derived with non-virtual ~Base: do not pick a tidy “only ~Base” as defined behaviour — it is UB. If ~Base is virtual, ~Derived then ~Base.",
      ],
      examples: [
        {
          title: "Java this() then super() chain",
          prompt: "What is the exact output (spaces included)?",
          language: "java",
          code: `class Base {
  Base(int n) { System.out.print("B" + n + " "); }
}
class Child extends Base {
  Child() {
    this(5);
    System.out.print("C0");
  }
  Child(int n) {
    super(n + 1);
    System.out.print("C" + n + " ");
  }
}
class Main {
  public static void main(String[] args) {
    new Child();
  }
}`,
          steps: [
            "new Child() enters Child(). First statement this(5) — the no-arg body is postponed.",
            "Child(int n) with n=5. First statement super(n+1) i.e. super(6).",
            "Base(6) prints B6 and a space. Buffer = \"B6 \".",
            "Child(int) body prints C5 and a space. Buffer = \"B6 C5 \".",
            "Delegating Child() body prints C0. Buffer = \"B6 C5 C0\".",
          ],
          result: "B6 C5 C0",
        },
        {
          title: "C++ construct then destroy in reverse",
          prompt: "What is printed? (objects are automatic)",
          language: "cpp",
          code: `#include <iostream>
struct B {
  B() { std::cout << "B"; }
  ~B() { std::cout << "b"; }
};
struct D : B {
  D() { std::cout << "D"; }
  ~D() { std::cout << "d"; }
};
int main() {
  D x;
}`,
          steps: [
            "D x: construct base B first. B() prints B.",
            "Then D() body prints D. Buffer = BD. Object fully constructed.",
            "main ends. Destroy x: ~D runs first, prints d. Buffer = BDd.",
            "Then ~B prints b. Buffer = BDdb.",
            "No heap, no virtual needed here because the static type is D (automatic object).",
          ],
          result: "BDdb",
        },
        {
          title: "Virtual destructor through Base*",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
struct B {
  virtual ~B() { std::cout << "B"; }
};
struct D : B {
  ~D() { std::cout << "D"; }
};
int main() {
  B* p = new D;
  delete p;
}`,
          steps: [
            "new D constructs B then D (no prints in constructors here).",
            "p has static type B*, dynamic type D. ~B is virtual, so delete p dispatches ~D first.",
            "~D prints D. After ~D’s body, the base destructor ~B runs automatically.",
            "~B prints B. Buffer = DB.",
            "If ~B were not virtual this delete would be undefined behaviour; do not claim it prints only B as a defined result.",
          ],
          result: "DB",
        },
        {
          title: "Virtual call inside a C++ constructor",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
struct B {
  B() { f(); }
  virtual void f() { std::cout << "B"; }
};
struct D : B {
  void f() { std::cout << "D"; }
};
int main() {
  D x;
  x.f();
}`,
          steps: [
            "D x starts: enter B::B() before D is constructed.",
            "Inside B::B(), the virtual call f() uses B’s vtable. Prints B. (Calling the not-yet-constructed D::f would be unsafe; the language forbids it.)",
            "Then D’s constructor body (empty). Object is now a D.",
            "x.f() is a virtual call on a complete D → D::f prints D.",
            "Output BD.",
          ],
          result: "BD",
        },
      ],
    },
    {
      heading: "i++ vs ++i",
      body: "i++ is post-increment: the expression’s value is the old i, then i is increased by one. ++i is pre-increment: i is increased, then the expression’s value is the new i. In a standalone statement i++; versus ++i; the later value of i is the same; only the expression value differs.\n\nIn subscripts and argument lists the difference is visible: a[i++] uses the old index then bumps i; a[++i] bumps first. Java and C++ evaluate the operand of ++ as a variable (lvalue); you cannot ++(i+1). Sequence-point / unsequenced ++ on the same scalar twice in one expression (i = i++ + ++i) is undefined in C++ and should not be “traced” as if it were Java.\n\nJava does define left-to-right evaluation, but exam setters still prefer clean cases: one ++ per statement, or a[i++] next to a[++i] after the first has finished. Draw a row: i before, value yielded, i after.\n\nOne ++ per expression is the safe exam habit. If a C++ question does i++ + ++i on the same scalar, the answer is undefined behaviour, not a number you can dry-run.",
      bullets: [
        "return i++; returns the old value; i in the caller’s copy of the local is irrelevant after return, but if i is a field you will see the bump.",
        "for (int i = 0; i < n; i++) vs ++i: same trip count.",
        "Do not “solve” unsequenced C++ i++ + ++i; the answer is undefined behaviour.",
      ],
      examples: [
        {
          title: "Yielded value versus later i — Java",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    int i = 1;
    int a = i++;
    int b = ++i;
    System.out.print(a + " " + b + " " + i);
  }
}`,
          steps: [
            "Start: i=1.",
            "a = i++: yield 1 into a, then i becomes 2. Table: a=1, i=2.",
            "b = ++i: i becomes 3, yield 3 into b. Table: a=1, b=3, i=3.",
            "print a, b, i with spaces.",
            "Output 1 3 3.",
          ],
          result: "1 3 3",
        },
        {
          title: "Array index with mixed ++ — Java",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    int i = 0;
    int[] a = { 10, 20, 30, 40 };
    System.out.print(a[i++] + " " + a[++i]);
  }
}`,
          steps: [
            "i=0, a=[10,20,30,40].",
            "a[i++]: index 0, yield a[0]=10, then i=1.",
            "After the first operand of + is done, evaluate a[++i]: ++i makes i=2, yield a[2]=30.",
            "Java left-to-right: first 10, then 30. i ends at 2.",
            "print 10 30.",
          ],
          result: "10 30",
        },
        {
          title: "return i++ from a field — Java",
          prompt: "What is printed?",
          language: "java",
          code: `class C {
  int i = 7;
  int f() { return i++; }
  public static void main(String[] args) {
    C c = new C();
    int x = c.f();
    System.out.print(x + " " + c.i);
  }
}`,
          steps: [
            "c.i starts at 7.",
            "f does return i++: the pending return value is 7, then the field i is incremented to 8.",
            "x captures 7. The increment is not lost — it is on the object, not a local copy of a primitive parameter.",
            "print x (7) and c.i (8).",
            "Output 7 8.",
          ],
          result: "7 8",
        },
        {
          title: "for-loop trip count is the same — C++",
          prompt: "How many times does the body run for i++ versus ++i in the update?",
          language: "cpp",
          code: `#include <iostream>
int main() {
  int a = 0, b = 0;
  for (int i = 0; i < 3; i++) a++;
  for (int i = 0; i < 3; ++i) b++;
  std::cout << a << b;
}`,
          steps: [
            "First loop: i=0,1,2 body; update i++ after each body. Three bodies. a=3.",
            "The update expression’s yielded value is discarded. i++ vs ++i only changes that discarded value.",
            "Second loop: i=0,1,2 as well; ++i still takes i from 0→1, 1→2, 2→3. Three bodies. b=3.",
            "a and b are both 3.",
            "cout prints 33.",
          ],
          result: "33",
        },
      ],
    },
    {
      heading: "String immutability vs StringBuilder",
      body: "java.lang.String is immutable: every concat, substring, toUpperCase, replace allocates a new String (implementation may share a byte array, but the public result is a different object you must keep). s.concat(\"c\") without assigning back leaves s unchanged. == on strings tests reference identity; interned literals can be ==, but runtime concatenation usually is not. Prefer equals.\n\nStringBuilder (and StringBuffer) is a mutable sequence. append, reverse, delete, setCharAt change the same object. sb.append(\"c\") mutates even if you ignore the returned this. Two references to one builder see each other’s appends.\n\nC++ std::string is mutable (s[0]='A', s += \"x\"). C char[] is mutable; a string literal char *p = \"hi\" is not a safe write target. When a question mixes String and StringBuilder, first decide which object identity the variable still holds.\n\nIf the method result is ignored, a String is unchanged. If the variable is a StringBuilder, assume mutation even when the call is chained.",
      bullets: [
        "s = s + \"x\" rebinds s. s.concat(\"x\") returns a new String; assign it or it is discarded.",
        "StringBuilder.append returns this, so chaining mutates one object.",
        "\"ab\" == \"a\"+\"b\" may be true (constant fold). \"ab\" == s+\"b\" with non-final s is typically false.",
      ],
      examples: [
        {
          title: "Discarded concat — Java",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    String s = "ab";
    s.concat("c");
    String t = s.concat("c");
    System.out.print(s + " " + t);
  }
}`,
          steps: [
            "s → interned \"ab\".",
            "s.concat(\"c\") allocates \"abc\" and throws it away. s still → \"ab\".",
            "t = s.concat(\"c\") captures a new \"abc\". s unchanged.",
            "print s then t.",
            "Output ab abc.",
          ],
          result: "ab abc",
        },
        {
          title: "StringBuilder shares mutation",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    StringBuilder sb = new StringBuilder("ab");
    StringBuilder tb = sb;
    sb.append("c");
    tb.reverse();
    System.out.print(sb.toString() + " " + (sb == tb));
  }
}`,
          steps: [
            "sb → builder holding ab. tb = sb: both references, one object.",
            "sb.append(\"c\") mutates to abc. tb sees abc.",
            "tb.reverse() mutates the same object to cba.",
            "sb == tb is true (same reference). toString is cba.",
            "print cba true.",
          ],
          result: "cba true",
        },
        {
          title: "Runtime concat vs interned literal",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    String s1 = "ab";
    String s2 = "a";
    s2 += "b";
    System.out.print((s1 == s2) + " " + s1.equals(s2));
  }
}`,
          steps: [
            "s1 → interned \"ab\". s2 → interned \"a\".",
            "s2 += \"b\" is s2 = s2 + \"b\". s2 is not a constant variable (not final), so this is a runtime concatenation, new object.",
            "s1 == s2 compares references: false.",
            "s1.equals(s2) compares characters a,b: true.",
            "print false true.",
          ],
          result: "false true",
        },
        {
          title: "C++ std::string is mutable",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
#include <string>
int main() {
  std::string s = "ab";
  std::string t = s;
  s[0] = 'X';
  s += "c";
  std::cout << s << t;
}`,
          steps: [
            "s = \"ab\". t = s copies the characters (t is a distinct string, not an alias).",
            "s[0] = 'X' mutates s only → \"Xb\". t is still \"ab\".",
            "s += \"c\" mutates s → \"Xbc\".",
            "cout << s << t with no space: Xbc then ab.",
            "Output Xbcab.",
          ],
          result: "Xbcab",
        },
      ],
    },
    {
      heading: "Exceptions: catch order, finally; C++ default arguments",
      body: "Java tries the catch clauses in source order and picks the first that can handle the thrown type. A catch (Exception e) before catch (IOException e) makes the second unreachable — compile error. Always order most-specific to most-general. finally runs on the way out of the try/catch whether the try succeeded, threw and was caught, or is about to propagate — except JVM halt / infinite loop. A return in try still executes finally before the method really returns. If finally itself returns, that value wins and the pending try/catch return is discarded (legal but a warning).\n\nC++ default arguments are substituted at the call site using the declaration the caller sees. The default expression is evaluated each time the call omits that argument, in the caller’s context (so it can read a global that changed since the function was defined). Defaults are filled from the right: you may omit a tail of arguments, not a hole in the middle. Repeating a default on the definition after it appeared on a prior declaration is an error.\n\nDo not confuse Java overload defaults (there are none; you overload) with C++ defaults. Java varargs are a different mechanism.\n\nRead catch types top to bottom for reachability; then ask whether finally returns. For C++ defaults, evaluate the default expression in the caller, once per omitted argument.",
      bullets: [
        "catch (Exception) then catch (IOException): compile error, unreachable.",
        "try { return 1; } finally { return 2; } → method returns 2.",
        "try { return 1; } finally { x = 2; } → still returns 1; the assignment runs but does not replace the captured return unless x is what you return after.",
        "C++ f(int a, int b = g++) evaluates g++ at each call that omits b.",
      ],
      examples: [
        {
          title: "catch order is a compile error",
          prompt: "What is the result of compiling read()?",
          language: "java",
          code: `import java.io.*;
class Test {
  static void read() {
    try {
      new FileInputStream("x").read();
    } catch (Exception e) {
      System.out.print("E");
    } catch (IOException e) {
      System.out.print("I");
    }
  }
}`,
          steps: [
            "FileInputStream.read throws IOException (checked), a subclass of Exception.",
            "First catch (Exception e) already handles every IOException.",
            "Second catch (IOException) is unreachable. javac rejects unreachable catch clauses.",
            "This is not a runtime “E versus I” question; compilation fails.",
            "Correct order would be IOException first, then Exception.",
          ],
          result: "compile error",
        },
        {
          title: "finally runs after try print and catch",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    try {
      System.out.print("T");
      throw new RuntimeException();
    } catch (RuntimeException e) {
      System.out.print("C");
    } finally {
      System.out.print("F");
    }
  }
}`,
          steps: [
            "try prints T. Buffer = T.",
            "throw RuntimeException. Matched by catch (RuntimeException). catch prints C. Buffer = TC.",
            "finally always scheduled on the way out. Prints F. Buffer = TCF.",
            "Exception is considered handled; main completes normally.",
            "Output TCF.",
          ],
          result: "TCF",
        },
        {
          title: "return in finally wins",
          prompt: "What does f() return (printed)?",
          language: "java",
          code: `class Main {
  static int f() {
    try {
      return 1;
    } finally {
      return 2;
    }
  }
  public static void main(String[] args) {
    System.out.print(f());
  }
}`,
          steps: [
            "try evaluates return 1 and captures pending result 1.",
            "finally runs before the method actually returns.",
            "finally’s return 2 captures a new pending result and discards 1.",
            "Method returns 2 to main.",
            "print 2. (A finally that only assigns a local, without return, would have left 1 in place.)",
          ],
          result: "2",
        },
        {
          title: "C++ defaults evaluated at the call site",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
int k = 0;
int next() { return ++k; }
void f(int a = next()) { std::cout << a; }
int main() {
  f();
  f();
  f(9);
  std::cout << k;
}`,
          steps: [
            "k=0. First f() omits a, so the call site evaluates next(): ++k → k=1, returns 1. f prints 1. Buffer=1.",
            "Second f() omits a again. next(): ++k → k=2, returns 2. f prints 2. Buffer=12.",
            "f(9) supplies a. next() is not called. f prints 9. Buffer=129. k still 2.",
            "If defaults were frozen at definition time, both omitted calls would have used a stale 0; they do not.",
            "cout << k prints 2. Full output 1292.",
          ],
          result: "1292",
        },
      ],
    },
  ],
};
