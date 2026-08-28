import type { TopicNote } from "@/data/notes";

export const notesProgramming: TopicNote = {
  topic: "programming",
  title: "Java / C / C++ — techniques (beginner)",
  blurb:
    "Exam programs are short. Make a table of every variable. Walk one line at a time. i++ uses the old number then adds 1. Java always copies the argument. Overload is chosen before the program runs; override waits for the real object. A constructor builds the parent first. finally still runs. A Java String never changes in place.",
  blocks: [
    {
      heading: "i++ vs ++i",
      body: "i++ is post-increment. The expression uses the old i, then i becomes i+1. ++i is pre-increment. i becomes i+1 first, then the expression uses the new i. A lone i++; and a lone ++i; leave i the same at the end. The difference shows up when you save the value, print it, or use it as an array index.\n\nDraw three columns: i before, value used, i after. Do one ++ per line. In C++, two ++ on the same i in one expression is undefined. Do not guess a number for that.",
      howTo: [
        "Write i before the line.",
        "If you see i++, copy the old i, then add 1 to i.",
        "If you see ++i, add 1 to i first, then copy the new i.",
        "Fill a table: i before | value used | i after.",
      ],
      bullets: [
        "i++ = use old, then add 1. ++i = add 1, then use new.",
        "for (i = 0; i < n; i++) and ++i in the update run the body the same number of times.",
        "Do not dry-run C++ i++ + ++i on the same variable. That is undefined.",
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
              why: "Always write the old i before you apply ++.",
            },
            {
              do: "a = i++. Value used is 1, so a = 1. Then i becomes 2. Table: a=1, i=2.",
              why: "i++ means use the old i, then add 1.",
            },
            {
              do: "b = ++i. First i becomes 3. Value used is 3, so b = 3. Table: a=1, b=3, i=3.",
              why: "++i means add 1 first, then use the new i.",
            },
            {
              do: "print a, b, i with spaces → 1 3 3.",
              why: "The print uses the table, not a second round of ++.",
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
              do: "Start: i = 0. Array: index 0→10, 1→20, 2→30, 3→40.",
              why: "The index used is the value of the ++ expression, not the later i.",
            },
            {
              do: "a[i++]: index used is 0, so 10. Then i becomes 1.",
              why: "i++ uses the old index, then adds 1.",
            },
            {
              do: "Next, a[++i]: i goes 1→2 first. Index used is 2, so 30.",
              why: "++i adds 1 before the index is read. Java finishes the left operand before the right one.",
            },
            {
              do: "print 10 30. Final i is 2.",
              why: "We skipped index 1 because ++i jumped from 1 to 2.",
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
              do: "new C(): field i = 7.",
              why: "The ++ is on the object field, not on a copy of a parameter.",
            },
            {
              do: "return i++: value sent back is 7. Then the field i becomes 8.",
              why: "i++ still means use old, then add 1. The add happens before the method really leaves.",
            },
            {
              do: "x = 7. c.i is 8.",
              why: "x stored the yielded value. The object kept the bump.",
            },
            {
              do: "print 7 8.",
              why: "The return value and the later field are two different columns of the same table.",
            },
          ],
          result: "7 8",
        },
      ],
    },
    {
      heading: "Pass-by-value",
      body: "Java always passes a copy. For int, the copy is the number. Changing the parameter does not change the caller’s variable. For an object or array, the copy is the arrow (the reference). Both arrows can point at the same heap object, so a[0]=8 is seen by the caller, but a = new … only moves the copy.\n\nC++ is the same for a plain int. int& is an alias: the parameter is another name for the caller’s variable. int* is a copy of an address; *p writes through to the caller’s int. Swapping the pointers p and q does not swap the caller’s pointer variables.",
      howTo: [
        "Ask: did the callee get a copy of a number, a copy of an arrow, or a C++ alias?",
        "If the body writes x = … it only changes the copy (unless the parameter is int&).",
        "If the body writes a[i]= or *p= it changes the shared object.",
        "After the call, look only at the caller’s names.",
      ],
      bullets: [
        "Java cannot make the caller’s local point at a different object.",
        "C++ int& is an alias. C++ int* is a copied address.",
        "Integer in Java is immutable, so a swap(Integer, Integer) cannot help.",
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
              do: "swap copies: a=1, b=2. a and b are new slots.",
              why: "Java pass-by-value copies the bits of the int.",
            },
            {
              do: "Inside swap: t=1, a=2, b=1. Caller x and y stay 1 and 2.",
              why: "Assigning a parameter never writes the caller’s local.",
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
              why: "int& does not make new ints. a is another name for x.",
            },
            {
              do: "t = a copies 1. a = b writes 2 into x. Table: x=2, y=2, t=1.",
              why: "Writing the alias writes the caller’s variable.",
            },
            {
              do: "b = t writes 1 into y. Table: x=2, y=1.",
              why: "b is an alias for y, so the second write finishes the swap.",
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
              do: "main: x → heap [1, 2], length 2.",
              why: "The variable x holds an arrow, not the cells themselves.",
            },
            {
              do: "bump copies the arrow. a and x point at the same array. a[0]=8 writes the heap. Array is [8, 2].",
              why: "A copy of a reference still points at the same object, so slot writes are shared.",
            },
            {
              do: "a = new int[]{9} moves only the copy a. x still points at [8, 2].",
              why: "Rebinding a parameter never moves the caller’s arrow.",
            },
            {
              do: "print 8 2.",
              why: "x[0] is the mutated slot. x.length is still 2.",
            },
          ],
          result: "8 2",
        },
      ],
    },
    {
      heading: "Overload vs override",
      body: "Overload means the same name with different parameter lists in one class. The compiler picks one using the types it can see (the variable’s type and the argument types). That happens before the program runs.\n\nOverride means a child class rewrites a parent instance method with the same signature. Java instance methods are virtual. The real object’s class wins at run time. Fields do not override. static methods do not override. private methods do not override. In C++ you need the word virtual or the parent method still runs.",
      howTo: [
        "Write the variable’s type (what the compiler sees) and the object’s type (what new created).",
        "Same name, different parameters → overload. Pick from the variable’s type.",
        "Same name, same parameters, child class → override. Pick from the object if the method is virtual.",
        "Fields, static, and private always use the variable’s type.",
      ],
      bullets: [
        "Parent p = new Child(): p.x is Parent’s field; p.m() is Child’s instance method.",
        "Child.show(String) does not override Parent.show(Object).",
        "C++ without virtual: p->f() is Base::f even if the object is Derived.",
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
              do: "p’s variable type is Parent. The object is Child. Heap has Parent.x=1 and Child.x=2.",
              why: "Two classes can each have a field named x. They are two slots, not one override.",
            },
            {
              do: "p.x uses the variable type Parent → 1.",
              why: "Field access is compile-time. Fields never override.",
            },
            {
              do: "p.m() is an instance method. Child overrides m → C.",
              why: "Override waits for the real object.",
            },
            {
              do: "print 1 C.",
              why: "One print mixes a compile-time field with a run-time method.",
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
              do: "p’s variable type is Parent. Parent only has show(Object). The compiler picks show(Object).",
              why: "Overload uses the methods the variable’s type can see, even if the argument is a String.",
            },
            {
              do: "Child.show(String) is not in that list.",
              why: "Extra overloads in the child are invisible through a Parent reference.",
            },
            {
              do: "At run time the object is Child. Child overrides show(Object) → CO.",
              why: "After overload picks a signature, override can still replace that one method.",
            },
            {
              do: "print CO. CS is never called.",
              why: "Compile-time pick, then run-time body.",
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
              do: "p has type B*. The object is D.",
              why: "C++ uses the pointer’s type unless the method is virtual.",
            },
            {
              do: "f is virtual. p->f() runs D::f → Df.",
              why: "virtual means override at run time.",
            },
            {
              do: "g is not virtual. p->g() runs B::g → Bg.",
              why: "Without virtual, the compiler binds g to B forever.",
            },
            {
              do: "Output DfBg.",
              why: "Same object, two rules: virtual vs not virtual.",
            },
          ],
          result: "DfBg",
        },
      ],
    },
    {
      heading: "Constructors",
      body: "A constructor has the class name and no return type. It runs when you write new. In Java the first line must be this(…) or super(…) if you write either. If you write neither, Java inserts super(). You cannot write both in the same constructor. this() calls a sibling constructor. That sibling will call super.\n\nC++ builds the base class first, then this class. Destruction is the reverse: child destructor, then parent. If you delete a child through a parent pointer, the parent destructor must be virtual, or cleanup is undefined.",
      howTo: [
        "Find new Class(…). That is the constructor that starts.",
        "If the first line is this(…), jump to that sibling. Come back later for the rest of the body.",
        "If the first line is super(…) (or C++ base), run the parent constructor first.",
        "Prints in constructors go parent then child. Prints in destructors go child then parent.",
      ],
      bullets: [
        "new Child() prints Base then Child if both constructors print.",
        "Java: this() or super() first — never both in one constructor.",
        "delete (Base*)child is defined only if ~Base is virtual.",
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
              why: "this() must be first. The rest of this constructor runs after the sibling returns.",
            },
            {
              do: "Child(int n) with n=5. First line super(n+1) → super(6).",
              why: "The sibling still has to build the parent before its own body.",
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
              why: "C++ always constructs the parent before the child body.",
            },
            {
              do: "Then D() prints D. Buffer is BD.",
              why: "The object is fully built only after the child constructor finishes.",
            },
            {
              do: "main ends. ~D runs first and prints d. Buffer is BDd.",
              why: "Destruction is the reverse of construction.",
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
              do: "p has type B*. The object is D. ~B is virtual, so delete p starts at ~D.",
              why: "A virtual destructor uses the real object, like a virtual method.",
            },
            {
              do: "~D prints D. Then ~B prints B. Buffer is DB.",
              why: "After the child destructor, the parent destructor still runs.",
            },
            {
              do: "If ~B were not virtual, this delete would be undefined. Do not pick “only B” as a defined answer.",
              why: "Without virtual, the compiler would call only ~B and skip ~D.",
            },
          ],
          result: "DB",
        },
      ],
    },
    {
      heading: "finally",
      body: "Java tries catch clauses from top to bottom and uses the first type that fits. Put the most specific type first. catch (Exception) above catch (IOException) does not compile: the second catch can never run.\n\nfinally runs when you leave the try/catch — success, caught throw, or throw that will keep going. A return in try still runs finally first. If finally itself returns, that value wins and the try return is dropped.",
      howTo: [
        "Run the try body until it ends or throws.",
        "If it throws, walk catch from top to bottom. Use the first matching type.",
        "Then run finally. Always, unless the whole JVM is dying.",
        "If both try and finally return, the finally return is the method’s result.",
      ],
      bullets: [
        "catch (Exception) then catch (IOException) is a compile error.",
        "try { return 1; } finally { return 2; } returns 2.",
        "try { return 1; } finally { x = 2; } still returns 1. The assignment runs but does not replace the saved 1.",
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
              why: "The try body runs until the throw.",
            },
            {
              do: "throw RuntimeException. catch (RuntimeException) matches and prints C. Buffer is TC.",
              why: "The first matching catch handles the throw. The exception stops here.",
            },
            {
              do: "finally prints F. Buffer is TCF.",
              why: "finally still runs after a successful catch.",
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
              do: "try hits return 1 and saves pending result 1.",
              why: "A return in try does not leave the method until finally finishes.",
            },
            {
              do: "finally runs and hits return 2. Pending result becomes 2. The 1 is dropped.",
              why: "A return in finally replaces any saved try/catch return.",
            },
            {
              do: "f returns 2. print 2.",
              why: "The method has one return value. finally spoke last.",
            },
            {
              do: "If finally only did x = 2 with no return, the method would still return 1.",
              why: "Assignment in finally is not the same as return in finally.",
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
              why: "Unreachable catch is a compile error, not a runtime “E versus I” race.",
            },
            {
              do: "Result is compile error. The fix is IOException first, then Exception.",
              why: "Most specific type on top, most general type at the bottom.",
            },
          ],
          result: "compile error",
        },
      ],
    },
    {
      heading: "Java String immutability",
      body: "A Java String cannot change its letters. concat, substring, toUpperCase, and replace make a new String. If you ignore the result, the old variable still points at the old letters. s.concat(\"c\") without s = leaves s unchanged.\n\nStringBuilder is a mutable box. append and reverse change the same object. Two variables that point at one builder see each other’s edits. == on String tests “same object”, not “same letters”. Use equals for letters.",
      howTo: [
        "Ask: is this a String or a StringBuilder?",
        "String method → new object. If you do not assign, the old variable is unchanged.",
        "StringBuilder method → same object changes, even if you ignore the return (it returns this).",
        "== is identity. equals is letters.",
      ],
      bullets: [
        "s = s + \"x\" rebinds s. s.concat(\"x\") must be assigned or it is thrown away.",
        "StringBuilder.append returns this, so chaining mutates one object.",
        "\"ab\" == s+\"b\" with a non-final s is usually false. s.equals(\"ab\") can still be true.",
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
              do: "s points at \"ab\".",
              why: "String variables hold an arrow to an unchangeable object.",
            },
            {
              do: "s.concat(\"c\") builds \"abc\" and throws it away. s still points at \"ab\".",
              why: "Ignoring a String method result does not write s.",
            },
            {
              do: "t = s.concat(\"c\") keeps a new \"abc\". s is still \"ab\".",
              why: "You must assign if you want the new String.",
            },
            {
              do: "print ab abc.",
              why: "Two arrows, two objects.",
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
              do: "sb → builder holding ab. tb = sb copies the arrow. One object.",
              why: "tb = sb does not copy the letters. It copies the reference.",
            },
            {
              do: "sb.append(\"c\") mutates to abc. tb sees abc too.",
              why: "append changes the builder in place.",
            },
            {
              do: "tb.reverse() mutates the same object to cba.",
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
              do: "s1 → interned \"ab\". s2 → interned \"a\".",
              why: "Literals can share one object. That is not the later concat.",
            },
            {
              do: "s2 += \"b\" is s2 = s2 + \"b\". s2 is not final, so this builds a new object at run time.",
              why: "A new String is a different arrow even when the letters match.",
            },
            {
              do: "s1 == s2 is false (different objects).",
              why: "== on String is identity.",
            },
            {
              do: "s1.equals(s2) is true (letters a,b). print false true.",
              why: "equals reads characters. Use it for content.",
            },
          ],
          result: "false true",
        },
      ],
    },
  ],
};
