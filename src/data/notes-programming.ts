import type { TopicNote } from "@/data/notes";

export const notesProgramming: TopicNote = {
  topic: "programming",
  title: "Programming — simple notes",
  blurb:
    "We explain Java and C++ like class notes a Class-10 student can read: a stamp on a counter, a photocopy of a page, a shop with two windows. Then we walk five tiny examples in each topic, one line at a time.",
  blocks: [
    {
      heading: "What is i++ vs ++i?",
      body: "i++ is like stamping today’s number on a form, then adding 1 to the counter. The form gets the old number. The counter becomes bigger after the stamp. ++i is the other way: first add 1 to the counter, then stamp the new number on the form.\n\nA lonely i++; or a lonely ++i; only turns the counter. Nobody saves the stamp, so both leave i the same at the end. The difference shows up when you store the value, print it, or use it as an array index. Draw three columns: i before, number used, i after. In C++, two ++ on the same i in one line is not a defined answer. Do not guess a number for that.",
      howTo: [
        "Write i before the line.",
        "If you see i++, copy the old i, then add 1 to i.",
        "If you see ++i, add 1 to i first, then copy the new i.",
        "Fill a table: i before | number used | i after.",
        "A lonely i++ or ++i in a for-loop only adds 1. Nobody reads the stamp.",
      ],
      bullets: [
        "i++ = stamp the old number, then add 1.",
        "++i = add 1 first, then stamp the new number.",
        "for (i = 0; i < n; i++) and ++i in the update run the body the same number of times.",
        "The difference shows only when you save, print, or index with the ++.",
        "Do not guess C++ i++ + ++i on the same variable. That answer is not defined.",
      ],
      examples: [
        {
          title: "Saved values of i++ and ++i — Java",
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
            {
              do: "Start table: i = 1. a and b are not set yet.",
              why: "Always write the old i before you stamp or add 1.",
            },
            {
              do: "a = i++. Number stamped is 1, so a = 1. Then i becomes 2. Table: a=1, i=2.",
              why: "i++ means stamp the old i, then add 1 to the counter.",
            },
            {
              do: "b = ++i. First i becomes 3. Number stamped is 3, so b = 3. Table: a=1, b=3, i=3.",
              why: "++i means add 1 first, then stamp the new i.",
            },
            {
              do: "print a, b, i with spaces → 1 3 3.",
              why: "The print reads the table. It does not stamp again.",
            },
          ],
          result: "1 3 3",
        },
        {
          title: "Array index with i++ then ++i — Java",
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
            {
              do: "Start: i = 0. Array: box 0→10, 1→20, 2→30, 3→40.",
              why: "The index used is the stamped number, not the i you see later.",
            },
            {
              do: "a[i++]: index stamped is 0, so 10. Then i becomes 1.",
              why: "i++ stamps the old index, then adds 1.",
            },
            {
              do: "Next, a[++i]: i goes 1→2 first. Index stamped is 2, so 30.",
              why: "++i adds 1 before the index is read. Java finishes the left part before the right part.",
            },
            {
              do: "print 10 30. Final i is 2.",
              why: "We skipped box 1 because ++i jumped from 1 to 2.",
            },
          ],
          result: "10 30",
        },
        {
          title: "return i++ on a field — Java",
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
            {
              do: "new C(): the object’s i = 7.",
              why: "The ++ is on the object’s counter, not on a photocopy of a number.",
            },
            {
              do: "return i++: number sent back is 7. Then the object’s i becomes 8.",
              why: "i++ still means stamp old, then add 1. The add happens before the method really leaves.",
            },
            {
              do: "x = 7. c.i is 8.",
              why: "x stored the stamped number. The object kept the +1.",
            },
            {
              do: "print 7 8.",
              why: "The return value and the later field are two different columns of the same table.",
            },
          ],
          result: "7 8",
        },
        {
          title: "for-update i++ and ++i run the body the same times",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    int a = 0, b = 0;
    for (int i = 0; i < 3; i++) a++;
    for (int j = 0; j < 3; ++j) b++;
    System.out.print(a + " " + b);
  }
}`,
          steps: [
            {
              do: "A for-loop does: start once, test, body, add 1, test, body, add 1… until the test is false.",
              why: "The update is a lonely statement. Nobody saves the stamp.",
            },
            {
              do: "First loop: i is 0, 1, 2. Each time the body does a++. After three bodies a is 3. Then i becomes 3 and i < 3 fails.",
              why: "i++ in the update still adds 1 after the body. The old stamp is thrown away.",
            },
            {
              do: "Second loop: j is 0, 1, 2. Each time the body does b++. After three bodies b is 3. Then ++j makes j=3 and the test fails.",
              why: "++j in the update also just adds 1. There is nobody reading the stamped number.",
            },
            {
              do: "Both loops ran the body 3 times. print 3 3.",
              why: "i++ vs ++i only differs when you save or print the stamp. A lonely update does not.",
            },
            {
              do: "Do not rewrite this as ‘++j starts at 1 so the body runs twice’. Start is still j = 0.",
              why: "The ++ sits in the update slot, not in the start slot.",
            },
          ],
          result: "3 3",
        },
        {
          title: "i++ as an array store index",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    int i = 0;
    int[] a = { 0, 0, 0 };
    a[i++] = 5;
    a[i++] = 7;
    System.out.print(a[0] + " " + a[1] + " " + a[2] + " " + i);
  }
}`,
          steps: [
            {
              do: "Start table: i = 0. Array is [0, 0, 0].",
              why: "Write i before each store. The index used is the stamped number, not the later i.",
            },
            {
              do: "a[i++] = 5. Index stamped is 0, so a[0] = 5. Then i becomes 1. Array is [5, 0, 0].",
              why: "i++ means use the old i as the index, then add 1.",
            },
            {
              do: "a[i++] = 7. Index stamped is 1, so a[1] = 7. Then i becomes 2. Array is [5, 7, 0].",
              why: "Same rule on the next line. We did not skip a box.",
            },
            {
              do: "a[2] was never written, so it stays 0. Final i is 2.",
              why: "Two stores used indexes 0 and 1. i was bumped twice.",
            },
            {
              do: "print 5 7 0 2.",
              why: "Read the table. Do not mix this with ++i, which would have started at index 1.",
            },
          ],
          result: "5 7 0 2",
        },
      ],
    },
    {
      heading: "What is pass-by-value?",
      body: "Pass-by-value is like handing someone a photocopy of a page. They can scribble on the copy. Your original notebook stays the same. In Java every argument is a photocopy. For an int, the photocopy is the number. For an array or object, the photocopy is the arrow that points at the real box.\n\nIf they write on the box through that arrow (a[0]=8), you see it, because there is still one box. If they throw away their photocopy and pick a new arrow (a = new …), your arrow does not move. C++ is the same for a plain int. int& is not a photocopy: it is a second name written on your original page. int* is a photocopy of an address; *p writes through to your int. Swapping the photocopied addresses p and q does not swap the caller’s pointer names.",
      howTo: [
        "Ask: did the method get a photocopy of a number, a photocopy of an arrow, or a C++ second name?",
        "If the body writes x = … it only changes the photocopy (unless the parameter is int&).",
        "If the body writes a[i]= or *p= it changes the shared box.",
        "After the call, look only at the caller’s names.",
        "Java cannot make the caller’s local point at a different object.",
      ],
      bullets: [
        "Java always passes a photocopy, never the original name.",
        "A photocopy of an arrow still points at the same box, so a[0]= is seen.",
        "a = new … moves only the photocopy. The caller’s arrow stays.",
        "C++ int& is a second name on the original page. C++ int* is a copied address.",
        "Integer in Java cannot be rewritten in place, so a swap(Integer, Integer) cannot help.",
      ],
      examples: [
        {
          title: "Java int swap fails",
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
            {
              do: "main table: x=1, y=2.",
              why: "These are the only names the print will see.",
            },
            {
              do: "swap gets photocopies: a=1, b=2. a and b are new slots.",
              why: "Java pass-by-value copies the number, like a photocopy of a page.",
            },
            {
              do: "Inside swap: t=1, a=2, b=1. Caller x and y stay 1 and 2.",
              why: "Writing on the photocopy never writes the caller’s original.",
            },
            {
              do: "print 1 2.",
              why: "The swap finished on copies. The originals were never touched.",
            },
          ],
          result: "1 2",
        },
        {
          title: "C++ int& swap works",
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
            {
              do: "main: x=1, y=2.",
              why: "int& does not make new ints. a is another name written on x’s page.",
            },
            {
              do: "t = a copies 1. a = b writes 2 into x. Table: x=2, y=2, t=1.",
              why: "Writing the second name writes the caller’s variable.",
            },
            {
              do: "b = t writes 1 into y. Table: x=2, y=1.",
              why: "b is a second name for y, so the second write finishes the swap.",
            },
            {
              do: "cout prints 21 with no space.",
              why: "The caller’s x and y really changed.",
            },
          ],
          result: "21",
        },
        {
          title: "Java array: shared object, rebound copy",
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
            {
              do: "main: x → box [1, 2], length 2.",
              why: "The name x holds an arrow, not the cells themselves.",
            },
            {
              do: "bump photocopies the arrow. a and x point at the same array. a[0]=8 writes the box. Array is [8, 2].",
              why: "A photocopy of an arrow still points at the same box, so slot writes are shared.",
            },
            {
              do: "a = new int[]{9} moves only the photocopy a. x still points at [8, 2].",
              why: "Throwing away the photocopy never moves the caller’s arrow.",
            },
            {
              do: "print 8 2.",
              why: "x[0] is the changed slot. x.length is still 2.",
            },
          ],
          result: "8 2",
        },
        {
          title: "Java object: field write is shared, new is not",
          prompt: "What is printed?",
          language: "java",
          code: `class Box { int n; }
class Main {
  static void bump(Box b) {
    b.n = 9;
    b = new Box();
    b.n = 1;
  }
  public static void main(String[] args) {
    Box x = new Box();
    x.n = 3;
    bump(x);
    System.out.print(x.n);
  }
}`,
          steps: [
            {
              do: "main: x → a Box with n=3.",
              why: "x holds an arrow. The number 3 lives in the Box, not in x itself.",
            },
            {
              do: "bump photocopies the arrow. b and x point at the same Box. b.n = 9 writes that Box. n is 9.",
              why: "A photocopy of an arrow still points at the same box, so field writes are shared.",
            },
            {
              do: "b = new Box() makes a second Box and moves only b. Then b.n = 1 writes the second Box.",
              why: "Moving the photocopy never moves the caller’s arrow x.",
            },
            {
              do: "bump returns. x still points at the first Box, whose n is 9.",
              why: "The 1 was written on a box nobody in main can see.",
            },
            {
              do: "print 9.",
              why: "Ask two questions: did we write a field of the shared box, or did we move the photocopy?",
            },
          ],
          result: "9",
        },
        {
          title: "C++ pointer: *p writes, p = moves the copy",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
void f(int* p) {
  *p = 8;
  int y = 1;
  p = &y;
}
int main() {
  int x = 3;
  f(&x);
  std::cout << x;
}`,
          steps: [
            {
              do: "main: x = 3. f(&x) photocopies the address of x into p.",
              why: "int* is a copied address, not a second name of the pointer itself.",
            },
            {
              do: "*p = 8 writes through the address. x becomes 8.",
              why: "*p means ‘the int sitting at that address’. That int is the caller’s x.",
            },
            {
              do: "p = &y moves only the photocopy p so it points at local y. x is still 8.",
              why: "Assigning p never changes main’s idea of ‘where x lives’.",
            },
            {
              do: "y dies when f returns. Nobody needed y. x is still 8.",
              why: "The write that mattered was *p, not the later p =.",
            },
            {
              do: "print 8. To swap two caller ints you need int& or you swap *p and *q, not p and q.",
              why: "Same Java lesson: write through the arrow, or the photocopy only moves.",
            },
          ],
          result: "8",
        },
      ],
    },
    {
      heading: "What is overload vs override?",
      body: "Overload is like one shop name with two counters: ‘pay by cash’ and ‘pay by card’. You pick the counter before you enter, from the signboard (the types the compiler can see). Override is like the person who actually showed up at the window. The child class rewrites the parent’s method. Java looks at the real object, not the name on the ticket.\n\nSame name, different parameter lists → overload, chosen before the program runs. Same name, same parameters, child class → override, chosen from the real object if the method is virtual. Fields do not override. static methods do not override. private methods do not override. In C++ you need the word virtual or the parent method still runs.",
      howTo: [
        "Write the variable’s type (the signboard) and the object’s type (who showed up).",
        "Same name, different parameters → overload. Pick from the signboard.",
        "Same name, same parameters, child class → override. Pick from who showed up, if the method is virtual.",
        "Fields, static, and private always use the signboard.",
        "In C++, no virtual means the parent method still runs.",
      ],
      bullets: [
        "Overload = same shop, different counters, chosen before you enter.",
        "Override = the person who actually showed up at the window.",
        "Parent p = new Child(): p.x is Parent’s field; p.m() is Child’s instance method.",
        "Child.show(String) does not override Parent.show(Object).",
        "C++ without virtual: p->f() is Base::f even if the object is Derived.",
        "static and private do not override. Fields do not override.",
      ],
      examples: [
        {
          title: "Field from the variable, method from the object — Java",
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
            {
              do: "p’s signboard says Parent. The person who showed up is Child. There are two x boxes: Parent.x=1 and Child.x=2.",
              why: "Two classes can each have a field named x. They are two slots, not one rewrite.",
            },
            {
              do: "p.x uses the signboard Parent → 1.",
              why: "Field access follows the signboard. Fields never override.",
            },
            {
              do: "p.m() is an instance method. Child rewrites m → C.",
              why: "Override waits for the person who showed up.",
            },
            {
              do: "print 1 C.",
              why: "One print mixes a signboard field with a real-object method.",
            },
          ],
          result: "1 C",
        },
        {
          title: "Overload first, then override — Java",
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
            {
              do: "p’s signboard says Parent. Parent only has show(Object). That is the counter we pick.",
              why: "Overload uses the methods the signboard can see, even if the argument is a String.",
            },
            {
              do: "Child.show(String) is not in that list.",
              why: "Extra counters in the child are invisible through a Parent ticket.",
            },
            {
              do: "When the program runs, the person who showed up is Child. Child rewrites show(Object) → CO.",
              why: "After overload picks a counter, override can still replace that one method.",
            },
            {
              do: "print CO. CS is never called.",
              why: "Pick the counter first (overload), then see who showed up (override).",
            },
          ],
          result: "CO",
        },
        {
          title: "C++ virtual vs not virtual",
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
            {
              do: "p’s signboard says B*. The person who showed up is D.",
              why: "C++ uses the pointer’s type unless the method is virtual.",
            },
            {
              do: "f is virtual. p->f() runs D::f → Df.",
              why: "virtual means look at who showed up.",
            },
            {
              do: "g is not virtual. p->g() runs B::g → Bg.",
              why: "Without virtual, the compiler wires g to B forever.",
            },
            {
              do: "Output DfBg.",
              why: "Same object, two rules: virtual vs not virtual.",
            },
          ],
          result: "DfBg",
        },
        {
          title: "static does not override — Java",
          prompt: "What is printed?",
          language: "java",
          code: `class P {
  static String s() { return "P"; }
  String t() { return "Pt"; }
}
class C extends P {
  static String s() { return "C"; }
  @Override String t() { return "Ct"; }
}
class Main {
  public static void main(String[] args) {
    P p = new C();
    System.out.print(p.s() + " " + p.t());
  }
}`,
          steps: [
            {
              do: "p’s signboard says P. The person who showed up is C.",
              why: "Write both labels before you pick a method.",
            },
            {
              do: "s() is static in both classes. p.s() is chosen from the signboard P → P.",
              why: "static is not ‘who showed up’. Java even warns that p.s() should be written P.s().",
            },
            {
              do: "C.s() hides P.s(); it does not override. The object C is ignored for s.",
              why: "Same name and empty parameters is still not override when the method is static.",
            },
            {
              do: "t() is an instance method. C rewrites t. p.t() → Ct.",
              why: "Instance override waits for the person who showed up.",
            },
            {
              do: "print P Ct.",
              why: "One print mixes a signboard static with a real-object instance method.",
            },
          ],
          result: "P Ct",
        },
        {
          title: "private is not override — Java",
          prompt: "What is printed?",
          language: "java",
          code: `class P {
  private String h() { return "P"; }
  String go() { return h(); }
}
class C extends P {
  String h() { return "C"; }
}
class Main {
  public static void main(String[] args) {
    P p = new C();
    System.out.print(p.go());
  }
}`,
          steps: [
            {
              do: "p’s signboard says P. The person who showed up is C. go() is inherited from P.",
              why: "C does not rewrite go, so go’s body is still P’s body.",
            },
            {
              do: "Inside P.go() the call is h(). P.h() is private.",
              why: "A private method is invisible outside P, including in a child.",
            },
            {
              do: "C.h() looks like a rewrite, but it is a new method. It does not replace P.h().",
              why: "private methods do not override. There is no ‘who showed up’ call here.",
            },
            {
              do: "go() therefore runs P.h() → P, even though the object is C.",
              why: "The call is wired to P before the program runs.",
            },
            {
              do: "print P. If h() had been public (or protected) in both classes, the print would have been C.",
              why: "The word private decides whether the child’s rewrite is a real override.",
            },
          ],
          result: "P",
        },
      ],
    },
    {
      heading: "What is a constructor?",
      body: "A constructor is the builder who puts up a house. The child’s house sits on the parent’s house, so you build the parent house first. super(…) is ‘please build the parent now’. this(…) is ‘please start from my other door first; that door will still build the parent’.\n\nA constructor has the class name and no return type. It runs when you write new. In Java the first line must be this(…) or super(…) if you write either. If you write neither, Java inserts super(). You cannot write both in the same constructor. C++ builds the base class first, then this class. Destruction is the reverse: child first, then parent. If you delete a child through a parent pointer, the parent destructor must be virtual, or cleanup is not defined.",
      howTo: [
        "Find new Class(…). That is the constructor that starts.",
        "If the first line is this(…), jump to that other door. Come back later for the rest of the body.",
        "If the first line is super(…) (or C++ base), build the parent house first.",
        "Prints in constructors go parent then child.",
        "Prints in destructors go child then parent.",
      ],
      bullets: [
        "Build the parent house first, then the child.",
        "new Child() prints Base then Child if both constructors print.",
        "Java: this() or super() first — never both in one constructor.",
        "If you write neither, Java inserts super() with no arguments.",
        "delete (Base*)child is defined only if ~Base is virtual.",
        "Child fields are set after super returns and before the child constructor body.",
      ],
      examples: [
        {
          title: "Java this() then super() — print order",
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
            {
              do: "new Child() enters Child(). First line this(5). The print C0 waits.",
              why: "this() must be first. The rest of this constructor runs after the other door returns.",
            },
            {
              do: "Child(int n) with n=5. First line super(n+1) → super(6).",
              why: "The other door still has to build the parent house before its own body.",
            },
            {
              do: "Base(6) prints B6 and a space. Buffer is \"B6 \".",
              why: "Parent constructor body runs before the child’s remaining lines.",
            },
            {
              do: "Child(int) prints C5 and a space. Buffer is \"B6 C5 \". Then Child() prints C0. Buffer is \"B6 C5 C0\".",
              why: "After super returns, each constructor body runs on the way back out.",
            },
          ],
          result: "B6 C5 C0",
        },
        {
          title: "C++ build then destroy in reverse",
          prompt: "What is printed? (x is an automatic object)",
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
            {
              do: "D x starts. Base B() runs first and prints B.",
              why: "C++ always builds the parent house before the child body.",
            },
            {
              do: "Then D() prints D. Buffer is BD.",
              why: "The object is fully built only after the child constructor finishes.",
            },
            {
              do: "main ends. ~D runs first and prints d. Buffer is BDd.",
              why: "Pulling down the house is the reverse of building it.",
            },
            {
              do: "Then ~B prints b. Buffer is BDdb.",
              why: "Parent destructor runs after the child destructor body.",
            },
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
            {
              do: "new D builds B then D. No prints here.",
              why: "Constructors are silent in this program. The question is delete.",
            },
            {
              do: "p’s signboard says B*. The object is D. ~B is virtual, so delete p starts at ~D.",
              why: "A virtual destructor looks at who showed up, like a virtual method.",
            },
            {
              do: "~D prints D. Then ~B prints B. Buffer is DB.",
              why: "After the child destructor, the parent destructor still runs.",
            },
            {
              do: "If ~B were not virtual, this delete would not be defined. Do not pick “only B” as a defined answer.",
              why: "Without virtual, the compiler would call only ~B and skip ~D.",
            },
          ],
          result: "DB",
        },
        {
          title: "Missing super(int) is a compile error",
          prompt: "Does this compile?",
          language: "java",
          code: `class Base {
  Base(int n) { System.out.print("B" + n); }
}
class Child extends Base {
  Child() { System.out.print("C"); }
}`,
          steps: [
            {
              do: "Child() does not write this(…) or super(…). Java therefore inserts super().",
              why: "If you write neither, the first hidden line is always super() with no arguments.",
            },
            {
              do: "Base has only Base(int). There is no Base() constructor.",
              why: "Once you write any constructor, Java stops giving you a free no-arg constructor.",
            },
            {
              do: "The inserted super() has no matching constructor. javac rejects Child().",
              why: "The parent house must be built first. Java will not guess super(0) for you.",
            },
            {
              do: "Fix: Child() { super(1); … } or add Base() { } in the parent.",
              why: "Either give the parent a no-arg constructor, or call the one that exists.",
            },
            {
              do: "Result is compile error. There is no runtime print of C.",
              why: "Constructors that cannot start the parent never run.",
            },
          ],
          result: "compile error",
        },
        {
          title: "Java field init runs after super, before the child body",
          prompt: "What is printed?",
          language: "java",
          code: `class Base {
  Base() { System.out.print("B"); }
}
class Child extends Base {
  int x = printX();
  static int printX() { System.out.print("X"); return 1; }
  Child() { System.out.print("C"); }
}
class Main {
  public static void main(String[] args) {
    new Child();
  }
}`,
          steps: [
            {
              do: "new Child() starts Child(). There is no this() or super(…), so Java inserts super().",
              why: "The parent constructor always runs before this class finishes building.",
            },
            {
              do: "Base() prints B. Buffer is B.",
              why: "Parent body is first. Parent house first.",
            },
            {
              do: "Back in Child, instance fields are set. x = printX() prints X. Buffer is BX.",
              why: "Field starters run after super returns and before the rest of the child constructor.",
            },
            {
              do: "Then the Child() body prints C. Buffer is BXC.",
              why: "Constructor body is last for this class.",
            },
            {
              do: "print BXC. Remember the order: parent constructor, child fields, child body.",
              why: "A field starter is not ‘before everything’. It is after the parent is built.",
            },
          ],
          result: "BXC",
        },
      ],
    },
    {
      heading: "What is finally?",
      body: "finally is the school bell. The bell still rings even if the test is cancelled, even if you finished early, even if you were sent out. try is the test. catch is the teacher who handles a problem. finally is the bell that always rings when you leave that room.\n\nJava tries catch clauses from top to bottom and uses the first type that fits. Put the most specific type first. catch (Exception) above catch (IOException) does not compile: the second catch can never run. A return in try still runs finally first. If finally itself returns, that value wins and the try return is dropped.",
      howTo: [
        "Run the try body until it ends or throws.",
        "If it throws, walk catch from top to bottom. Use the first matching type.",
        "Then run finally. Always, unless the whole JVM is dying.",
        "If both try and finally return, the finally return is the method’s result.",
        "An assignment in finally still happens, but it does not replace a saved return.",
      ],
      bullets: [
        "The school bell still rings even if the test is cancelled.",
        "catch (Exception) then catch (IOException) is a compile error.",
        "try { return 1; } finally { return 2; } returns 2.",
        "try { return 1; } finally { x = 2; } still returns 1. The assignment runs but does not replace the saved 1.",
        "finally also runs when the throw will keep going to the caller.",
        "Most specific catch on top, most general catch at the bottom.",
      ],
      examples: [
        {
          title: "finally runs after try and catch",
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
            {
              do: "try prints T. Buffer is T.",
              why: "The try body (the test) runs until the throw.",
            },
            {
              do: "throw RuntimeException. catch (RuntimeException) matches and prints C. Buffer is TC.",
              why: "The first matching catch is the teacher who handles it. The exception stops here.",
            },
            {
              do: "finally prints F. Buffer is TCF.",
              why: "The school bell still rings after a successful catch.",
            },
            {
              do: "main ends normally. Output TCF.",
              why: "Handled exception + finally is a normal finish, not a crash.",
            },
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
            {
              do: "try hits return 1 and saves waiting answer 1.",
              why: "A return in try does not leave the method until the bell (finally) finishes.",
            },
            {
              do: "finally runs and hits return 2. Waiting answer becomes 2. The 1 is dropped.",
              why: "A return in finally replaces any saved try/catch return.",
            },
            {
              do: "f returns 2. print 2.",
              why: "The method has one return value. finally spoke last.",
            },
            {
              do: "If finally only did x = 2 with no return, the method would still return 1.",
              why: "Writing a box in finally is not the same as return in finally.",
            },
          ],
          result: "2",
        },
        {
          title: "catch order can be a compile error",
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
            {
              do: "FileInputStream.read can throw IOException. IOException is a kind of Exception.",
              why: "A child type is already covered by a parent catch above it.",
            },
            {
              do: "First catch (Exception e) already handles every IOException.",
              why: "Java picks the first catch whose type fits. Nothing can reach the second catch.",
            },
            {
              do: "Second catch (IOException) is unreachable. javac rejects it.",
              why: "An unreachable catch is a compile error, not a runtime “E versus I” race.",
            },
            {
              do: "Result is compile error. The fix is IOException first, then Exception.",
              why: "Most specific type on top, most general type at the bottom.",
            },
          ],
          result: "compile error",
        },
        {
          title: "finally assignment does not replace a saved return",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  static int x;
  static int f() {
    try {
      return 1;
    } finally {
      x = 2;
    }
  }
  public static void main(String[] args) {
    System.out.print(f() + " " + x);
  }
}`,
          steps: [
            {
              do: "try hits return 1 and saves waiting answer 1.",
              why: "The method does not leave until the bell (finally) finishes.",
            },
            {
              do: "finally runs x = 2. Field x becomes 2. There is no return in finally.",
              why: "Writing a box is not a return. The saved 1 stays the method result.",
            },
            {
              do: "f returns 1. After the call, x is 2.",
              why: "Side jobs in finally still happen. They just do not replace the saved return.",
            },
            {
              do: "print 1 2.",
              why: "Contrast with finally { return 2; }, which would have printed 2.",
            },
            {
              do: "Exam trap: ‘finally always wins the return’. Only a return in finally wins.",
              why: "Read the finally body. Assignment vs return are different.",
            },
          ],
          result: "1 2",
        },
        {
          title: "finally still runs when the exception is not caught here",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  static void f() {
    try {
      System.out.print("T");
      throw new RuntimeException();
    } finally {
      System.out.print("F");
    }
  }
  public static void main(String[] args) {
    try {
      f();
    } catch (RuntimeException e) {
      System.out.print("C");
    }
  }
}`,
          steps: [
            {
              do: "f’s try prints T. Buffer is T. Then it throws RuntimeException.",
              why: "There is no catch inside f. The throw is not handled here.",
            },
            {
              do: "f still runs finally and prints F. Buffer is TF. Then the exception leaves f.",
              why: "The school bell still rings on the way out, even when the throw will keep going.",
            },
            {
              do: "main’s catch matches RuntimeException and prints C. Buffer is TFC.",
              why: "The handler lives in the caller, after f’s finally has already run.",
            },
            {
              do: "Output TFC, not TC then F, and not TF with a crash and no C.",
              why: "Order is: try of f, finally of f, then the caller’s catch.",
            },
            {
              do: "If finally had thrown a new exception, that new one would have hidden the RuntimeException.",
              why: "A throw (or return) in finally replaces the waiting throw from try.",
            },
          ],
          result: "TFC",
        },
      ],
    },
    {
      heading: "What is a Java String?",
      body: "A Java String is a laminated card. You cannot scribble on it. concat, substring, toUpperCase, and replace print a new card. If you ignore the new card, your hand still holds the old one. s.concat(\"c\") without s = leaves s unchanged.\n\nStringBuilder is a notebook you can write in. append and reverse change the same notebook. Two names that point at one notebook see each other’s writing. == on String tests ‘same card’, not ‘same letters’. Use equals for letters.",
      howTo: [
        "Ask: is this a String (laminated card) or a StringBuilder (notebook)?",
        "String method → new card. If you do not assign, the old name is unchanged.",
        "StringBuilder method → same notebook changes, even if you ignore the return (it returns this).",
        "== is same card. equals is same letters.",
        "s = s + \"x\" moves the name s onto a new card.",
      ],
      bullets: [
        "A String is laminated. You cannot scribble on it.",
        "s = s + \"x\" moves s. s.concat(\"x\") must be assigned or it is thrown away.",
        "StringBuilder.append returns this, so chaining writes on one notebook.",
        "\"ab\" == s+\"b\" with a non-final s is usually false. s.equals(\"ab\") can still be true.",
        "== is identity (same card). equals is letters.",
        "Ignoring toUpperCase or replace leaves the old card in your hand.",
      ],
      examples: [
        {
          title: "Discarded concat leaves s alone",
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
            {
              do: "s points at the laminated card \"ab\".",
              why: "String names hold an arrow to a card you cannot scribble on.",
            },
            {
              do: "s.concat(\"c\") prints a new card \"abc\" and throws it away. s still points at \"ab\".",
              why: "Ignoring a String method result does not write s.",
            },
            {
              do: "t = s.concat(\"c\") keeps a new \"abc\". s is still \"ab\".",
              why: "You must assign if you want the new card in a name.",
            },
            {
              do: "print ab abc.",
              why: "Two arrows, two cards.",
            },
          ],
          result: "ab abc",
        },
        {
          title: "StringBuilder: two names, one object",
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
            {
              do: "sb → notebook holding ab. tb = sb copies the arrow. One notebook.",
              why: "tb = sb does not copy the letters. It copies the arrow.",
            },
            {
              do: "sb.append(\"c\") writes in place to abc. tb sees abc too.",
              why: "append changes the notebook, not a new card.",
            },
            {
              do: "tb.reverse() writes the same notebook to cba.",
              why: "reverse also writes in place. Both names share it.",
            },
            {
              do: "sb == tb is true. toString is cba. print cba true.",
              why: "== on two builders tests the same arrow, not the letters.",
            },
          ],
          result: "cba true",
        },
        {
          title: "Runtime concat: == false, equals true",
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
            {
              do: "s1 → shared printed card \"ab\". s2 → shared printed card \"a\".",
              why: "Literals can share one card. That is not the later join.",
            },
            {
              do: "s2 += \"b\" is s2 = s2 + \"b\". s2 is not final, so this prints a new card while the program runs.",
              why: "A new String is a different arrow even when the letters match.",
            },
            {
              do: "s1 == s2 is false (different cards).",
              why: "== on String is ‘same card’, not ‘same letters’.",
            },
            {
              do: "s1.equals(s2) is true (letters a,b). print false true.",
              why: "equals reads characters. Use it for content.",
            },
          ],
          result: "false true",
        },
        {
          title: "Discarded toUpperCase and replace leave s alone",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    String s = "ab";
    s.toUpperCase();
    s.replace('a', 'x');
    System.out.print(s);
  }
}`,
          steps: [
            {
              do: "s points at the laminated card \"ab\".",
              why: "A String card cannot change its letters.",
            },
            {
              do: "s.toUpperCase() prints a new card \"AB\" and throws it away. s still points at \"ab\".",
              why: "Ignoring a String method result does not write s.",
            },
            {
              do: "s.replace('a', 'x') prints a new card \"xb\" and throws it away. s is still \"ab\".",
              why: "replace also returns a new card. The old card is untouched.",
            },
            {
              do: "print ab.",
              why: "Both calls were wasted because nobody stored the new card.",
            },
            {
              do: "The fix is s = s.toUpperCase() or String t = s.replace(...).",
              why: "You must assign if you want the new letters.",
            },
          ],
          result: "ab",
        },
        {
          title: "Assigned + and concat: equals true, == usually false",
          prompt: "What is printed?",
          language: "java",
          code: `class Main {
  public static void main(String[] args) {
    String s = "a";
    s = s + "b";
    String t = "a".concat("b");
    System.out.print(s.equals(t) + " " + (s == t));
  }
}`,
          steps: [
            {
              do: "s starts as the printed card \"a\". Then s = s + \"b\" prints a new \"ab\" while the program runs and points s at it.",
              why: "s is not final, so + is not folded into the shared printed card \"ab\".",
            },
            {
              do: "t = \"a\".concat(\"b\") also prints a new \"ab\" card.",
              why: "concat always returns a new String when the argument is not empty.",
            },
            {
              do: "s.equals(t) compares letters a,b → true.",
              why: "equals is content. Both cards hold a then b.",
            },
            {
              do: "s == t compares arrows. Two new cards → false.",
              why: "== on String is same card, not same letters.",
            },
            {
              do: "print true false.",
              why: "Assigned concat worked. Same-card still failed. Use equals in exam answers about content.",
            },
          ],
          result: "true false",
        },
      ],
    },
    {
      heading: "What is recursion vs a loop?",
      body: "Recursion is like a Russian doll, or like calling yourself with a smaller job. fact(4) waits for fact(3), which waits for fact(2), until a tiny doll (the base case) returns a number with no further call. A loop is one person at one desk, updating one box again and again. fact(4) in a loop is f=1; multiply by 2, 3, 4. Same answer, no pile of waiting dolls.\n\nEvery recursive call needs a base case that returns without calling itself. Fibonacci is the usual trap: fib(n) = fib(n-1)+fib(n-2) asks the same smaller n many times. A loop (or a remembered table) computes each n once. Missing the base case grows the pile of dolls until the program dies. A loop with a bad test can run forever, but it does not grow a call pile.",
      howTo: [
        "Find the base case. If n is already small, write the return value and stop.",
        "For recursion, draw one doll (one stack frame) per call. Write what that doll is waiting for.",
        "Walk back out: each doll uses the number that returned from the smaller doll.",
        "For a loop, keep one row: the running answer and the loop index. Update the row each trip.",
        "If the same n is asked twice (fib), count the extra calls. A loop would do that n once.",
      ],
      bullets: [
        "Recursion = a Russian doll: call yourself with a smaller job.",
        "Base case first. No base case → stack overflow, not a number.",
        "factorial(n) = n * factorial(n-1). A loop multiplies 1..n at one desk.",
        "Naive fib is correct but slow: the same fib(k) is drawn many times in the tree.",
        "A loop of n steps is enough for fib if you keep the last two numbers.",
        "Missing base case → pile of calls. Missing i++ → one spinning desk.",
      ],
      examples: [
        {
          title: "Recursive factorial — stack of waiting multiplies",
          prompt: "What does fact(4) return? Show the stack.",
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
            {
              do: "fact(4): n is 4, not ≤ 1, so it must compute 4 * fact(3). Doll 4 waits.",
              why: "The multiply cannot finish until the smaller doll returns.",
            },
            {
              do: "fact(3) waits for 3 * fact(2). fact(2) waits for 2 * fact(1). Pile is 4, 3, 2, 1.",
              why: "Each call is a new doll with its own n. Draw them nested, like Russian dolls.",
            },
            {
              do: "fact(1): n ≤ 1, return 1. This is the tiniest doll. No further call.",
              why: "The pile stops growing only when a doll returns a number with no recursive call.",
            },
            {
              do: "Walk back: fact(2) = 2*1 = 2. fact(3) = 3*2 = 6. fact(4) = 4*6 = 24.",
              why: "Each waiting multiply uses the number that returned from the smaller doll.",
            },
            {
              do: "print 24. Peak pile was four dolls (4 down to 1).",
              why: "The extra cost of recursion here is the pile of dolls, not a wrong answer.",
            },
          ],
          result: "24",
        },
        {
          title: "Loop factorial — one frame, same 24",
          prompt: "What is printed? How many frames?",
          language: "java",
          code: `class Main {
  static int fact(int n) {
    int f = 1;
    for (int i = 2; i <= n; i++) f = f * i;
    return f;
  }
  public static void main(String[] args) {
    System.out.print(fact(4));
  }
}`,
          steps: [
            {
              do: "One call fact(4). Table: f=1, i will run 2, 3, 4.",
              why: "A loop is one person at one desk. There is no fact(3) call.",
            },
            {
              do: "i=2: f = 1*2 = 2. i=3: f = 2*3 = 6. i=4: f = 6*4 = 24. Then i=5 fails i<=4.",
              why: "Each trip multiplies the next integer into the running box f.",
            },
            {
              do: "return 24. print 24.",
              why: "Same answer as the recursive trace. The homework is the table, not a pile of dolls.",
            },
            {
              do: "Peak extra stack is one frame. Recursion needed four frames for n=4.",
              why: "That is the exam contrast: same product, different memory shape.",
            },
            {
              do: "fact(1) or fact(0): the loop body never runs, f stays 1. That matches 0! = 1 and 1! = 1.",
              why: "The loop’s ‘base’ is the starting f=1, not a recursive return.",
            },
          ],
          result: "24",
        },
        {
          title: "Recursive fib(5) — the tree repeats work",
          prompt: "What does fib(5) return, and why is it slower than a loop?",
          language: "java",
          code: `class Main {
  static int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
  }
  public static void main(String[] args) {
    System.out.print(fib(5));
  }
}`,
          steps: [
            {
              do: "Base: fib(0)=0, fib(1)=1. fib(5) = fib(4)+fib(3).",
              why: "Write the two smaller dolls before you open them.",
            },
            {
              do: "fib(4)=fib(3)+fib(2). Now fib(3) appears under fib(5) and again under fib(4).",
              why: "The naive tree does not remember answers. The same n is asked more than once.",
            },
            {
              do: "Expand until bases: fib(2)=fib(1)+fib(0)=1+0=1. fib(3)=2, fib(4)=3, fib(5)=5.",
              why: "The values are the usual 0,1,1,2,3,5. The tree is still correct.",
            },
            {
              do: "Count calls: fib(5) does two calls, fib(4) two more, and fib(3) is fully drawn twice. Many dolls for a tiny n.",
              why: "Time grows like the Fibonacci numbers themselves, not like n.",
            },
            {
              do: "print 5. The exam point is not the 5. It is that fib(3) was paid for twice.",
              why: "A loop (next example) pays for each k once.",
            },
          ],
          result: "5  (fib(3) is computed more than once in the tree)",
        },
        {
          title: "Loop fib — keep the last two numbers",
          prompt: "What is printed for n = 5?",
          language: "java",
          code: `class Main {
  static int fib(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
      int c = a + b;
      a = b;
      b = c;
    }
    return b;
  }
  public static void main(String[] args) {
    System.out.print(fib(5));
  }
}`,
          steps: [
            {
              do: "n=5, not a base. Start a=0 (fib 0), b=1 (fib 1). One desk only.",
              why: "We store the last two answers instead of calling fib again.",
            },
            {
              do: "i=2: c=0+1=1, then a=1, b=1. Table is fib2=1.",
              why: "c is the next Fibonacci number. Then slide the window forward.",
            },
            {
              do: "i=3: c=1+1=2 → a=1, b=2. i=4: c=1+2=3 → a=2, b=3. i=5: c=2+3=5 → a=3, b=5.",
              why: "Five is reached in n−1 steps after the bases.",
            },
            {
              do: "return b which is 5. print 5.",
              why: "Same answer as recursive fib(5), but each i was done once.",
            },
            {
              do: "This loop is the usual exam ‘better fib’. Recursion with a remembered table is also linear; bare recursion is not.",
              why: "The bug in naive fib is repeated work, not a wrong formula.",
            },
          ],
          result: "5",
        },
        {
          title: "Missing base case blows the stack; a bad loop runs forever",
          prompt: "What happens? (two snippets)",
          language: "java",
          code: `static int badFact(int n) {
  return n * badFact(n - 1); // no if
}
static int badLoop(int n) {
  int f = 1, i = 2;
  while (i <= n) f = f * i; // forgot i++
  return f;
}`,
          steps: [
            {
              do: "badFact(4) calls badFact(3), then 2, 1, 0, −1, … There is no if that returns a number.",
              why: "Without a tiniest doll the pile of frames never stops growing.",
            },
            {
              do: "The JVM throws StackOverflowError. You never get a product.",
              why: "Each call uses stack space. The machine runs out.",
            },
            {
              do: "badLoop(4): i stays 2 forever, so i <= n stays true. f is multiplied by 2 again and again.",
              why: "A forgotten i++ is an infinite loop at one desk. The pile does not grow.",
            },
            {
              do: "The program hangs (or wraps the int) but it is not StackOverflowError.",
              why: "Same missing ‘stop’, different memory. Recursion needs a base return; a loop needs the index to move.",
            },
            {
              do: "Exam pick: missing base case → stack overflow. Missing i++ → infinite loop.",
              why: "Name the failure from the shape: pile of dolls vs one spinning desk.",
            },
          ],
          result: "badFact → StackOverflowError. badLoop → infinite loop (no growing stack).",
        },
      ],
    },
  ],
};
