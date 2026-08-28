import { makeQuestion } from "@/data/make-question";

const q = makeQuestion(1, 2);

export const phase1HardProg = [
  q(
    "prog-21",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["1 P", "1 C", "2 P", "2 C"],
    1,
    "Fields are selected from the reference's compile-time type, so p.x is Parent.x. Overridden instance methods use dynamic dispatch, so p.m() invokes Child.m().",
    {
      language: "java",
      code: `class Parent {
  int x = 1;
  String m() { return "P"; }
}
class Child extends Parent {
  int x = 2;
  @Override String m() { return "C"; }
}
public class Main {
  public static void main(String[] args) {
    Parent p = new Child();
    System.out.print(p.x + " " + p.m());
  }
}`,
    },
  ),
  q(
    "prog-22",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["A.s A.p", "B.s A.p", "A.s B.p", "B.s B.p"],
    0,
    "A.call binds the static s() and private p() to declarations in A. Neither static method hiding nor a same-named private method in B participates in dynamic dispatch.",
    {
      language: "java",
      code: `class A {
  static String s() { return "A.s"; }
  private String p() { return "A.p"; }
  String call() { return s() + " " + p(); }
}
class B extends A {
  static String s() { return "B.s"; }
  private String p() { return "B.p"; }
}
public class Main {
  public static void main(String[] args) {
    A x = new B();
    System.out.print(x.call());
  }
}`,
    },
  ),
  q(
    "prog-23",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["Parent:Object", "Child:String", "Child:Object", "Parent:String"],
    2,
    "Overload resolution uses p's compile-time type, selecting show(Object). Dynamic dispatch then invokes Child.show(Object); the String overload was never in the overload set.",
    {
      language: "java",
      code: `class Parent {
  String show(Object x) { return "Parent:Object"; }
}
class Child extends Parent {
  @Override String show(Object x) { return "Child:Object"; }
  String show(String x) { return "Child:String"; }
}
public class Main {
  public static void main(String[] args) {
    Parent p = new Child();
    System.out.print(p.show("sebi"));
  }
}`,
    },
  ),
  q(
    "prog-24",
    "programming",
    "hard",
    "What is the exact output of the Java constructor chain?",
    ["B5 C5 C0", "B6 C0 C5", "B6 C5 C0", "C5 B6 C0"],
    2,
    "Child() first delegates to Child(5), which explicitly calls Base(6). The delegated constructor completes before the body of Child() prints C0.",
    {
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
public class Main {
  public static void main(String[] args) {
    new Child();
  }
}`,
    },
  ),
  q(
    "prog-25",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["1", "2", "No value; finally makes the method void", "Compilation fails because finally cannot return"],
    1,
    "The pending return value 1 is discarded when finally executes its own return. The method therefore returns 2.",
    {
      language: "java",
      code: `public class Main {
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
    },
  ),
  q(
    "prog-26",
    "programming",
    "hard",
    "What is the result of compiling this Java method?",
    [
      "It compiles and an IOException is handled by the second catch",
      "It compiles, but both catches can handle an IOException",
      "It fails because IOException is not a checked exception",
      "It fails because the IOException catch is unreachable",
    ],
    3,
    "Exception already catches every IOException, so the following narrower catch is unreachable. Java requires catches to be ordered from more specific to more general.",
    {
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
    },
  ),
  q(
    "prog-27",
    "programming",
    "hard",
    "What is printed by the Java program on a conforming implementation?",
    ["true true", "true false", "false true", "false false"],
    1,
    "Integer.valueOf must cache values from -128 through 127, so the 127 references are identical. Caching 128 is not required and the two boxing operations here produce distinct objects under the specified expression.",
    {
      language: "java",
      code: `public class Main {
  public static void main(String[] args) {
    Integer a = 127, b = 127;
    Integer c = 128, d = 128;
    System.out.print((a == b) + " " + (c == d));
  }
}`,
    },
  ),
  q(
    "prog-28",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["true true", "true false", "false true", "false false"],
    2,
    "s2 is not a constant variable, so += constructs a runtime concatenation result rather than reusing the interned literal. Reference equality is false, while content equality is true.",
    {
      language: "java",
      code: `public class Main {
  public static void main(String[] args) {
    String s1 = "ab";
    String s2 = "a";
    s2 += "b";
    System.out.print((s1 == s2) + " " + s1.equals(s2));
  }
}`,
    },
  ),
  q(
    "prog-29",
    "programming",
    "hard",
    "What happens when the Java program runs?",
    [
      "It prints 1",
      "It prints null1",
      "It throws NullPointerException during unboxing",
      "It fails to compile because Integer cannot be added to int",
    ],
    2,
    "The + operation requires n to be unboxed to int. Unboxing a null Integer throws NullPointerException before the addition or print.",
    {
      language: "java",
      code: `public class Main {
  public static void main(String[] args) {
    Integer n = null;
    int x = n + 1;
    System.out.print(x);
  }
}`,
    },
  ),
  q(
    "prog-30",
    "programming",
    "hard",
    "What happens at the marked Java call?",
    [
      "It prints 42",
      "It invokes Box.set(Object) without a cast",
      "It throws ClassCastException before StringBox.set executes",
      "It fails to compile even with a raw reference",
    ],
    2,
    "Erasure creates a bridge set(Object) in StringBox that casts its argument to String before delegating. The raw call compiles with a warning, but the bridge cast of Integer fails.",
    {
      language: "java",
      code: `class Box<T> {
  void set(T x) { System.out.print("Box"); }
}
class StringBox extends Box<String> {
  @Override void set(String x) { System.out.print(x); }
}
public class Main {
  public static void main(String[] args) {
    Box b = new StringBox();
    b.set(42); // marked call
  }
}`,
    },
  ),
  q(
    "prog-31",
    "programming",
    "hard",
    "Assuming join completes normally, what is printed by the Java program?",
    ["T T", "F F", "F T", "T F"],
    2,
    "Calling run() is an ordinary call on the main thread, so the current thread is not the Thread object. start() creates execution on that Thread object, making the second comparison true.",
    {
      language: "java",
      code: `public class Main {
  public static void main(String[] args) throws InterruptedException {
    Thread t = new Thread() {
      @Override public void run() {
        System.out.print(Thread.currentThread() == this ? "T" : "F");
      }
    };
    t.run();
    System.out.print(" ");
    t.start();
    t.join();
  }
}`,
    },
  ),
  q(
    "prog-32",
    "programming",
    "hard",
    "Two threads invoke work(), one on a and one on b. Which statement is correct?",
    [
      "They can never overlap because work is synchronized",
      "They lock Counter.class and therefore serialize",
      "They may overlap because a and b have different instance monitors",
      "The program has a data race on the monitor itself",
    ],
    2,
    "A synchronized instance method acquires the receiver's monitor. Calls on distinct Counter objects use distinct locks and may execute concurrently.",
    {
      language: "java",
      code: `class Counter {
  synchronized void work() {
    // critical section that uses only this object's state
  }
}
Counter a = new Counter();
Counter b = new Counter();`,
    },
  ),
  q(
    "prog-33",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["abc:true", "cba:true", "abc:false", "cba:false"],
    1,
    "append returns the same mutable StringBuilder, so a and b alias. reverse mutates that one object to cba.",
    {
      language: "java",
      code: `public class Main {
  public static void main(String[] args) {
    StringBuilder a = new StringBuilder("ab");
    StringBuilder b = a.append("c");
    b.reverse();
    System.out.print(a + ":" + (a == b));
  }
}`,
    },
  ),
  q(
    "prog-34",
    "programming",
    "hard",
    "Which statement correctly constructs an instance of the non-static member class I?",
    [
      "O.I i = new O.I();",
      "O.I i = new O().new I();",
      "I i = new O().I();",
      "O.I i = O.new I();",
    ],
    1,
    "A non-static member class instance must be associated with an enclosing O instance. The syntax is outerExpression.new I().",
    {
      language: "java",
      code: `class O {
  int x = 7;
  class I {
    int get() { return x; }
  }
}`,
    },
  ),
  q(
    "prog-35",
    "programming",
    "hard",
    "What is the exact initialization output when new B() is first executed?",
    [
      "AS BS AI AC BI BC",
      "AS AI AC BS BI BC",
      "BS AS BI AI AC BC",
      "AS BS BI BC AI AC",
    ],
    0,
    "Class initialization runs parent static code before child static code. Object initialization then runs A's instance block and constructor before B's instance block and constructor.",
    {
      language: "java",
      code: `class A {
  static { System.out.print("AS "); }
  { System.out.print("AI "); }
  A() { System.out.print("AC "); }
}
class B extends A {
  static { System.out.print("BS "); }
  { System.out.print("BI "); }
  B() { System.out.print("BC"); }
}
public class Main {
  public static void main(String[] args) {
    new B();
  }
}`,
    },
  ),
  q(
    "prog-36",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["Number:1.5", "Integer:1.5", "Number:7", "Integer:7"],
    3,
    "Integer is a valid covariant return type for Number. Dynamic dispatch invokes B.f(), so the returned object's runtime class is Integer and its value is 7.",
    {
      language: "java",
      code: `class A {
  Number f() { return 1.5; }
}
class B extends A {
  @Override Integer f() { return 7; }
}
public class Main {
  public static void main(String[] args) {
    A a = new B();
    Object x = a.f();
    System.out.print(x.getClass().getSimpleName() + ":" + x);
  }
}`,
    },
  ),
  q(
    "prog-37",
    "programming",
    "hard",
    "What is printed by the Java try-with-resources program?",
    ["body:A:B", "B:A:body", "body:B:A", "A:B:body"],
    2,
    "The body exception remains primary. Resources close in reverse declaration order, so exceptions B and then A are attached as suppressed exceptions in that order.",
    {
      language: "java",
      code: `class R implements AutoCloseable {
  private final String name;
  R(String name) { this.name = name; }
  @Override public void close() throws Exception {
    throw new Exception(name);
  }
}
public class Main {
  public static void main(String[] args) {
    try (R a = new R("A"); R b = new R("B")) {
      throw new Exception("body");
    } catch (Exception e) {
      System.out.print(e.getMessage());
      for (Throwable s : e.getSuppressed()) {
        System.out.print(":" + s.getMessage());
      }
    }
  }
}`,
    },
  ),
  q(
    "prog-38",
    "programming",
    "hard",
    "Which overload is selected by f(null)?",
    [
      "f(Object)",
      "f(String)",
      "f(Integer)",
      "None; the call is ambiguous at compile time",
    ],
    3,
    "String and Integer are both more specific than Object, but neither is more specific than the other. Therefore no unique most-specific overload exists.",
    {
      language: "java",
      code: `class Test {
  static void f(Object x) {}
  static void f(String x) {}
  static void f(Integer x) {}
  public static void main(String[] args) {
    f(null);
  }
}`,
    },
  ),
  q(
    "prog-39",
    "programming",
    "hard",
    "What is printed when new B() executes?",
    ["-1:5", "0:5", "5:5", "0:0"],
    1,
    "A's constructor dynamically dispatches to B.f(), but B's field initializer has not run yet, so x still has its default value 0. After super construction, x becomes 5.",
    {
      language: "java",
      code: `class A {
  A() { System.out.print(f()); }
  int f() { return -1; }
}
class B extends A {
  int x = 5;
  @Override int f() { return x; }
  B() { System.out.print(":" + x); }
}
public class Main {
  public static void main(String[] args) {
    new B();
  }
}`,
    },
  ),
  q(
    "prog-40",
    "programming",
    "hard",
    "What is the result of compiling class Test?",
    [
      "It compiles because the generic arguments differ",
      "It compiles and overload resolution uses each list's element type",
      "It fails because both methods erase to f(List)",
      "It fails only when either method is called",
    ],
    2,
    "Both parameter types erase to List, giving the methods the same erased signature. Java rejects the name clash when the class is compiled.",
    {
      language: "java",
      code: `import java.util.List;
class Test {
  void f(List<String> xs) {}
  void f(List<Integer> xs) {}
}`,
    },
  ),
  q(
    "prog-41",
    "programming",
    "hard",
    "What is printed by this C++ program?",
    ["B", "D", "DB", "BD"],
    2,
    "A virtual base destructor makes deletion through Base* dispatch to Derived::~Derived first, followed by Base::~Base. Thus both subobjects are destroyed in derived-to-base order.",
    {
      language: "cpp",
      code: `#include <iostream>
struct Base {
  virtual ~Base() { std::cout << "B"; }
};
struct Derived : Base {
  ~Derived() override { std::cout << "D"; }
};
int main() {
  Base* p = new Derived;
  delete p;
}`,
    },
  ),
  q(
    "prog-42",
    "programming",
    "hard",
    "What is printed by the C++ calls to g and h?",
    ["5 5", "5 6", "6 6", "6 7"],
    1,
    "g receives a copy, so its increment does not change the caller's x. h receives an lvalue reference and increments x from 5 to 6.",
    {
      language: "cpp",
      code: `#include <iostream>
void g(int x) { ++x; }
void h(int& x) { ++x; }
int main() {
  int x = 5;
  g(x);
  std::cout << x << " ";
  h(x);
  std::cout << x;
}`,
    },
  ),
  q(
    "prog-43",
    "programming",
    "hard",
    "What is printed by the C++ program?",
    ["3 0", "3 1", "4 0", "4 1"],
    3,
    "Dereferencing p changes the caller's x through the copied pointer value. Assigning nullptr changes only the local pointer copy, so the caller's p still equals &x.",
    {
      language: "cpp",
      code: `#include <iostream>
void k(int* p) {
  ++*p;
  p = nullptr;
}
int main() {
  int x = 3;
  int* p = &x;
  k(p);
  std::cout << x << " " << (p == &x);
}`,
    },
  ),
  q(
    "prog-44",
    "programming",
    "hard",
    "What is printed by the C++ virtual-inheritance program?",
    ["1 1", "7 1", "1 7", "7 7"],
    3,
    "Virtual inheritance gives D only one shared A subobject. Both B and C paths therefore refer to the same x, and the unqualified d.x is unambiguous.",
    {
      language: "cpp",
      code: `#include <iostream>
struct A { int x = 1; };
struct B : virtual A {};
struct C : virtual A {};
struct D : B, C {};
int main() {
  D d;
  d.B::x = 7;
  std::cout << d.C::x << " " << d.x;
}`,
    },
  ),
  q(
    "prog-45",
    "programming",
    "hard",
    "What is printed by the C++ program?",
    ["BB", "BD", "DB", "DD"],
    1,
    "Virtual calls made in B's constructor dispatch only within the currently constructed B portion. After construction, the call through B* dispatches to D::f().",
    {
      language: "cpp",
      code: `#include <iostream>
struct B {
  B() { f(); }
  virtual void f() { std::cout << "B"; }
  virtual ~B() = default;
};
struct D : B {
  void f() override { std::cout << "D"; }
};
int main() {
  D d;
  B* p = &d;
  p->f();
}`,
    },
  ),
  q(
    "prog-46",
    "programming",
    "hard",
    "What is printed by the C++ program?",
    ["CC", "CA", "AC", "AA"],
    1,
    "Initialization of b from a invokes the copy constructor. c already exists, so c = a invokes copy assignment.",
    {
      language: "cpp",
      code: `#include <iostream>
struct X {
  X() = default;
  X(const X&) { std::cout << "C"; }
  X& operator=(const X&) {
    std::cout << "A";
    return *this;
  }
};
int main() {
  X a;
  X b = a;
  X c;
  c = a;
}`,
    },
  ),
  q(
    "prog-47",
    "programming",
    "hard",
    "Which statement about the empty C++ class E is guaranteed by the language?",
    [
      "sizeof(E) is 0",
      "sizeof(E) is at least 1",
      "sizeof(E) always equals sizeof(void*)",
      "E cannot be instantiated without a data member",
    ],
    1,
    "A complete object must have nonzero size so distinct objects can have distinct addresses. The exact size is implementation-dependent, but sizeof(E) is at least 1.",
    {
      language: "cpp",
      code: `struct E {};`,
    },
  ),
  q(
    "prog-48",
    "programming",
    "hard",
    "On an ABI where sizeof(int) = alignof(int) = 4 and char has size/alignment 1, what is sizeof(P)?",
    ["6", "8", "10", "12"],
    3,
    "Three bytes pad c before i, and three tail-padding bytes follow d so successive P objects keep i aligned. The layout is 1 + 3 + 4 + 1 + 3 = 12 bytes.",
    {
      language: "cpp",
      code: `struct P {
  char c;
  int i;
  char d;
};`,
    },
  ),
  q(
    "prog-49",
    "programming",
    "hard",
    "Which numbered C++ line is ill-formed because the constructor is explicit?",
    ["Only line 1", "Only line 2", "Only line 3", "Only line 4"],
    0,
    "Copy-initialization in line 1 would require an implicit conversion from int to X, which explicit forbids. Direct initialization and explicit construction remain valid.",
    {
      language: "cpp",
      code: `struct X {
  explicit X(int) {}
};
void take(X) {}

X a = 3;       // line 1
X b(3);        // line 2
X c{3};        // line 3
take(X{3});    // line 4`,
    },
  ),
  q(
    "prog-50",
    "programming",
    "hard",
    "What is printed by the C++ smart-pointer program?",
    ["false 1", "false 2", "true 1", "true 2"],
    3,
    "Moving transfers the unique_ptr and leaves u empty. Copying a shared_ptr creates a second owner of the same allocation, so the use count is 2.",
    {
      language: "cpp",
      code: `#include <iostream>
#include <memory>
int main() {
  auto u = std::make_unique<int>(1);
  auto v = std::move(u);
  auto s = std::make_shared<int>(2);
  auto t = s;
  std::cout << std::boolalpha
            << (u == nullptr) << " " << s.use_count();
}`,
    },
  ),
  q(
    "prog-51",
    "programming",
    "hard",
    "The loop stops immediately after a push_back that increases vector capacity. What is then true of it?",
    [
      "It still denotes the original second element",
      "Only end() is invalidated",
      "It is invalid because reallocation invalidates all iterators",
      "It is valid unless the inserted value equals the second element",
    ],
    2,
    "A capacity increase means the vector's storage was reallocated. Reallocation invalidates every iterator, pointer, and reference to its elements, so it must not be dereferenced.",
    {
      language: "cpp",
      code: `#include <vector>
std::vector<int> v{1, 2, 3};
auto it = v.begin() + 1;
auto cap = v.capacity();
while (v.capacity() == cap) {
  v.push_back(0);
}`,
    },
  ),
  q(
    "prog-52",
    "programming",
    "hard",
    "What is printed by the C++ template/overload program?",
    ["NNN", "NTT", "TNT", "TTT"],
    1,
    "For f(1), the non-template exact match is preferred over an equally good template match. f<>(1) forces the template, and double has no matching non-template overload.",
    {
      language: "cpp",
      code: `#include <iostream>
template<class T>
void f(T) { std::cout << "T"; }
void f(int) { std::cout << "N"; }
int main() {
  f(1);
  f<>(1);
  f(1.0);
}`,
    },
  ),
  q(
    "prog-53",
    "programming",
    "hard",
    "What is printed by the C++ const-overload program?",
    ["NN", "NC", "CN", "CC"],
    1,
    "The non-const object selects the non-const overload. A const object can call only the const-qualified overload.",
    {
      language: "cpp",
      code: `#include <iostream>
struct X {
  void f() { std::cout << "N"; }
  void f() const { std::cout << "C"; }
};
int main() {
  X x;
  const X y;
  x.f();
  y.f();
}`,
    },
  ),
  q(
    "prog-54",
    "programming",
    "hard",
    "What is printed by the C++ program?",
    ["B1", "B2", "D1", "D2"],
    2,
    "Default arguments are substituted from the static type at the call site, so x defaults to 1 from B. The virtual call still dispatches to D::f, producing D1.",
    {
      language: "cpp",
      code: `#include <iostream>
struct B {
  virtual void f(int x = 1) { std::cout << "B" << x; }
  virtual ~B() = default;
};
struct D : B {
  void f(int x = 2) override { std::cout << "D" << x; }
};
int main() {
  D d;
  B* p = &d;
  p->f();
}`,
    },
  ),
  q(
    "prog-55",
    "programming",
    "hard",
    "What is printed by the C++ program?",
    ["BB", "BD", "DB", "DD"],
    1,
    "Passing by value slices D to a standalone B object, so the first call prints B. Passing by reference preserves the dynamic type and the second call dispatches to D.",
    {
      language: "cpp",
      code: `#include <iostream>
struct B {
  virtual void f() const { std::cout << "B"; }
  virtual ~B() = default;
};
struct D : B {
  void f() const override { std::cout << "D"; }
};
void byValue(B b) { b.f(); }
void byRef(const B& b) { b.f(); }
int main() {
  D d;
  byValue(d);
  byRef(d);
}`,
    },
  ),
  q(
    "prog-56",
    "programming",
    "hard",
    "What is printed after the compiler-generated copy constructor copies Box?",
    ["1 0", "1 1", "9 0", "9 1"],
    3,
    "The generated copy constructor copies the pointer value, not the pointed-to int. Both boxes therefore alias x; changing through b is visible through a and the pointers compare equal.",
    {
      language: "cpp",
      code: `#include <iostream>
struct Box {
  int* p;
  explicit Box(int* p) : p(p) {}
};
int main() {
  int x = 1;
  Box a(&x);
  Box b = a;
  *b.p = 9;
  std::cout << *a.p << " " << (a.p == b.p);
}`,
    },
  ),
  q(
    "prog-57",
    "programming",
    "hard",
    "What is printed by C++ reference overload resolution?",
    ["LCR", "LLR", "CCR", "LCC"],
    0,
    "A mutable lvalue binds to int&, a const lvalue binds to const int&, and a temporary binds to int&&. Hence the overload sequence is L, C, R.",
    {
      language: "cpp",
      code: `#include <iostream>
void f(int&) { std::cout << "L"; }
void f(const int&) { std::cout << "C"; }
void f(int&&) { std::cout << "R"; }
int main() {
  int x = 1;
  const int y = 2;
  f(x);
  f(y);
  f(3);
}`,
    },
  ),
  q(
    "prog-58",
    "programming",
    "hard",
    "What is printed while constructing D?",
    ["1B2CD", "2C1BD", "3BCD", "12BCD"],
    2,
    "The most-derived class D constructs the shared virtual base A and its A(3) initializer prevails. B and C are then constructed in base-list order, followed by D's body.",
    {
      language: "cpp",
      code: `#include <iostream>
struct A {
  A(int x) { std::cout << x; }
};
struct B : virtual A {
  B() : A(1) { std::cout << "B"; }
};
struct C : virtual A {
  C() : A(2) { std::cout << "C"; }
};
struct D : B, C {
  D() : A(3) { std::cout << "D"; }
};
int main() {
  D d;
}`,
    },
  ),
  q(
    "prog-59",
    "programming",
    "hard",
    "Which statement correctly compares sizeof on local and parameter arrays in C?",
    [
      "Both expressions equal 10 * sizeof(int)",
      "The local expression is 10 * sizeof(int), while the parameter expression is sizeof(int*)",
      "The local expression is sizeof(int*), while the parameter expression is 10 * sizeof(int)",
      "Both expressions equal sizeof(int*)",
    ],
    1,
    "The local a is an actual array, so sizeof measures all ten elements. In a function parameter, int a[10] is adjusted to int*, so sizeof a measures a pointer.",
    {
      code: `#include <stddef.h>
void f(int a[10]) {
  size_t parameter_size = sizeof a;
}
int main(void) {
  int a[10];
  size_t local_size = sizeof a;
}`,
    },
  ),
  q(
    "prog-60",
    "programming",
    "hard",
    "What is printed by the well-defined C program?",
    ["10 20 30", "10 21 30", "20 21 30", "20 20 30"],
    1,
    "*p++ is parsed as *(p++), so x receives 10 and p advances. (*p)++ then yields 20 while incrementing the second array element to 21.",
    {
      code: `#include <stdio.h>
int main(void) {
  int a[] = {10, 20, 30};
  int *p = a;
  int x = *p++;
  int y = (*p)++;
  (void)y;
  printf("%d %d %d", x, *p, a[2]);
}`,
    },
  ),
  q(
    "prog-61",
    "programming",
    "hard",
    "What is printed by the C program?",
    ["1", "4", "5", "9"],
    2,
    "f changes only its by-value struct copy. g receives a pointer to the original struct and adds 4 to its x, changing the caller's value from 1 to 5.",
    {
      code: `#include <stdio.h>
struct S { int x; };
void f(struct S s) { s.x += 4; }
void g(struct S *s) { s->x += 4; }
int main(void) {
  struct S s = {1};
  f(s);
  g(&s);
  printf("%d", s.x);
}`,
    },
  ),
  q(
    "prog-62",
    "programming",
    "hard",
    "What is printed after the C struct assignment?",
    ["1 1", "1 9", "9 1", "9 9"],
    1,
    "Struct assignment copies each member by value, including the embedded array. b.a is independent storage, so changing it does not alter x.a.",
    {
      code: `#include <stdio.h>
struct S { int a[2]; };
int main(void) {
  struct S x = {{1, 2}};
  struct S b = x;
  b.a[0] = 9;
  printf("%d %d", x.a[0], b.a[0]);
}`,
    },
  ),
  q(
    "prog-63",
    "programming",
    "hard",
    "Which modification is defined by the C standard?",
    [
      "p[0] = 'S' only",
      "a[0] = 'S' only",
      "Both modifications",
      "Neither modification",
    ],
    1,
    "a is a writable array initialized with a copy of the literal. p points at a string literal; attempting to modify that literal has undefined behavior.",
    {
      code: `char a[] = "sebi";
char *p = "sebi";

a[0] = 'S';
p[0] = 'S';`,
    },
  ),
  q(
    "prog-64",
    "programming",
    "hard",
    "Which pair of C statements is valid for the declarations shown?",
    [
      "p++; q++;",
      "(*p)++; (*q)++;",
      "p++; (*q)++;",
      "(*p)++; q++;",
    ],
    2,
    "p is a mutable pointer to const char, so p may move but its pointee is read-only through p. q is a const pointer to mutable char, so its pointee may change but q may not move.",
    {
      code: `char a[] = "ab";
const char *p = a;
char *const q = a;`,
    },
  ),
  q(
    "prog-65",
    "programming",
    "hard",
    "What is printed by the C program?",
    ["11 11", "11 20", "20 11", "20 20"],
    1,
    "The macro substitution makes x equal to 4 * 2 + 3, which is 11. M is one integer value equal to 5, so y is 20.",
    {
      code: `#include <stdio.h>
#define N 2+3
int main(void) {
  const int M = 2 + 3;
  int x = 4 * N;
  int y = 4 * M;
  printf("%d %d", x, y);
}`,
    },
  ),
  q(
    "prog-66",
    "programming",
    "hard",
    "What is printed by this well-defined C program?",
    ["1 2 3", "1 3 3", "2 3 3", "1 3 2"],
    1,
    "Each increment is in a separate full expression. a receives the old value 1, i then becomes 2, and pre-increment makes both b and the final i equal to 3.",
    {
      code: `#include <stdio.h>
int main(void) {
  int i = 1;
  int a = i++;
  int b = ++i;
  printf("%d %d %d", a, b, i);
}`,
    },
  ),
  q(
    "prog-67",
    "programming",
    "hard",
    "What is printed by the C pointer-to-array program?",
    ["4 5", "4 6", "6 4", "6 5"],
    2,
    "p points to rows of three ints, so p + 1 reaches the second row. p[1][2] is 6 and (*(p + 1))[0] is 4.",
    {
      code: `#include <stdio.h>
int main(void) {
  int a[2][3] = {{1, 2, 3}, {4, 5, 6}};
  int (*p)[3] = a;
  printf("%d %d", p[1][2], (*(p + 1))[0]);
}`,
    },
  ),
  q(
    "prog-68",
    "programming",
    "hard",
    "What string is printed by the C program?",
    ["AABCD", "ABBCD", "ABCDA", "The behavior is undefined because the ranges overlap"],
    0,
    "memmove is specifically defined for overlapping ranges and behaves as if it used a temporary buffer. Copying ABCD one byte right produces AABCD.",
    {
      code: `#include <stdio.h>
#include <string.h>
int main(void) {
  char s[] = "ABCDE";
  memmove(s + 1, s, 4);
  printf("%s", s);
}`,
    },
  ),
  q(
    "prog-69",
    "programming",
    "hard",
    "Which statement about the returned C pointers is correct?",
    [
      "Both pointers remain valid after their functions return",
      "Only the pointer returned by bad remains valid",
      "Only the pointer returned by ok remains valid",
      "Neither pointer remains valid",
    ],
    2,
    "The automatic local x in bad ceases to exist at return, leaving a dangling pointer. The static local x in ok has static storage duration and remains alive.",
    {
      code: `int *bad(void) {
  int x = 1;
  return &x;
}
int *ok(void) {
  static int x = 1;
  return &x;
}`,
    },
  ),
  q(
    "prog-70",
    "programming",
    "hard",
    "What is printed by the C program?",
    ["1 1", "1 2", "2 1", "2 2"],
    1,
    "Postfix ++ binds before ->, so p++->v means (p++)->v. x receives the first member value 1, and p then points to the second struct whose value is 2.",
    {
      code: `#include <stdio.h>
struct N { int v; };
int main(void) {
  struct N a[] = {{1}, {2}};
  struct N *p = a;
  int x = p++->v;
  printf("%d %d", x, p->v);
}`,
    },
  ),
  q(
    "prog-71",
    "programming",
    "hard",
    "What is printed by the C program?",
    ["1 2", "2 2", "2 4", "4 8"],
    2,
    "A static local is initialized once and retains its value across calls. The first call doubles x to 2 and the second doubles the same x to 4.",
    {
      code: `#include <stdio.h>
int f(void) {
  static int x = 1;
  x *= 2;
  return x;
}
int main(void) {
  int a = f();
  int b = f();
  printf("%d %d", a, b);
}`,
    },
  ),
  q(
    "prog-72",
    "programming",
    "hard",
    "What does row_width return in this C program?",
    ["1", "2", "3", "sizeof(int*) / sizeof(int)"],
    2,
    "The outer array parameter adjusts to a pointer, but *a is still one row of type int[3]. Dividing that row's size by one element's size yields 3.",
    {
      code: `#include <stddef.h>
size_t row_width(int a[][3]) {
  return sizeof *a / sizeof **a;
}
int main(void) {
  int m[2][3] = {{0}};
  return row_width(m) == 3 ? 0 : 1;
}`,
    },
  ),
  q(
    "prog-73",
    "programming",
    "hard",
    "What is printed by the C program?",
    ["4 2", "4 4", "2 2", "2 4"],
    0,
    "sizeof counts all four array elements, including bytes after the first null character. strlen stops at the first null, after a and b, so it returns 2.",
    {
      code: `#include <stdio.h>
#include <string.h>
int main(void) {
  char s[] = {'a', 'b', '\\0', 'c'};
  printf("%zu %zu", sizeof s, strlen(s));
}`,
    },
  ),
  q(
    "prog-74",
    "programming",
    "hard",
    "Assuming malloc succeeds, which statement describes the C program?",
    [
      "It requests 2 * sizeof(int) bytes and prints 9",
      "It requests 6 * sizeof(int) bytes and prints 9",
      "It requests 6 * sizeof(int*) bytes and prints 9",
      "p[1][2] is invalid because p is not an int**",
    ],
    1,
    "The pointed-to type is an array of three ints, so sizeof *p is 3 * sizeof(int). Two such rows are allocated, and p[1][2] validly selects the sixth int.",
    {
      code: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
  int (*p)[3] = malloc(2 * sizeof *p);
  p[1][2] = 9;
  printf("%d", p[1][2]);
  free(p);
}`,
    },
  ),
  q(
    "prog-75",
    "programming",
    "hard",
    "What value does f(5) return?",
    ["11", "16", "21", "25"],
    2,
    "The values are f(0)=1, f(1)=1, f(2)=3, f(3)=5, f(4)=11, and f(5)=21. Each value uses the two already determined smaller arguments.",
    {
      code: `int f(int n) {
  if (n <= 1) return 1;
  return f(n - 1) + 2 * f(n - 2);
}`,
    },
  ),
  q(
    "prog-76",
    "programming",
    "hard",
    "Starting with the static variable initialized to zero, what does f(3) return?",
    ["18", "21", "24", "30"],
    2,
    "Before the base case, x accumulates 3+2+1=6. The base returns 6, and each of the three unwinding additions uses the same current static x=6, giving 24.",
    {
      code: `int f(int n) {
  static int x = 0;
  if (n == 0) return x;
  x += n;
  return f(n - 1) + x;
}`,
    },
  ),
  q(
    "prog-77",
    "programming",
    "hard",
    "What is printed by trace(3)?",
    ["321123", "321321", "123321", "312213"],
    0,
    "The first prints occur while recursion descends: 3,2,1. The second prints occur while calls unwind: 1,2,3.",
    {
      code: `void trace(int n) {
  if (n == 0) return;
  print(n);
  trace(n - 1);
  print(n);
}`,
    },
  ),
  q(
    "prog-78",
    "programming",
    "hard",
    "What value is returned by f(4)?",
    ["0", "1", "2", "3"],
    1,
    "f(1)=1-g(0)=0, so g(3)=3-f(1)=3. Therefore f(4)=4-g(3)=1.",
    {
      code: `int f(int n) {
  if (n <= 0) return 0;
  return n - g(n - 1);
}
int g(int n) {
  if (n <= 0) return 1;
  return n - f(n - 2);
}`,
    },
  ),
  q(
    "prog-79",
    "programming",
    "hard",
    "For n = 2^k, what are the total running time and maximum recursion-stack space?",
    [
      "Time Θ(log n), stack Θ(log n)",
      "Time Θ(n), stack Θ(log n)",
      "Time Θ(n), stack Θ(n)",
      "Time Θ(n log n), stack Θ(log n)",
    ],
    1,
    "The recurrence T(n)=2T(n/2)+Θ(1) has Θ(n) total calls. Only one root-to-leaf path is active at once, and its depth is Θ(log n).",
    {
      code: `void f(int n) {
  if (n <= 1) return;
  f(n / 2);
  f(n / 2);
}`,
    },
  ),
  q(
    "prog-80",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["1", "2", "3", "Compilation fails because b is reassigned"],
    1,
    "Java passes the object reference by value. Mutating the referenced original object sets its v to 2, while reassigning the local parameter cannot redirect the caller's variable.",
    {
      language: "java",
      code: `class Box { int v = 1; }
public class Main {
  static void change(Box b) {
    b.v = 2;
    b = new Box();
    b.v = 3;
  }
  public static void main(String[] args) {
    Box b = new Box();
    change(b);
    System.out.print(b.v);
  }
}`,
    },
  ),
  q(
    "prog-81",
    "programming",
    "hard",
    "What is printed by the Java scope-resolution program?",
    ["3 4", "5 1", "5 6", "3 6"],
    2,
    "The parameter x shadows the field and becomes 5. this.x explicitly denotes the field, which increases from 1 by that 5 to become 6.",
    {
      language: "java",
      code: `class A {
  int x = 1;
  void f(int x) {
    x += 2;
    this.x += x;
    System.out.print(x + " " + this.x);
  }
}
public class Main {
  public static void main(String[] args) {
    new A().f(3);
  }
}`,
    },
  ),
  q(
    "prog-82",
    "programming",
    "hard",
    "What is printed when both C++ reference parameters alias x?",
    ["3", "4", "5", "6"],
    3,
    "After a += 1, the shared object x is 3. Since b and a name that same object, b += a doubles the current value to 6.",
    {
      language: "cpp",
      code: `#include <iostream>
void f(int& a, int& b) {
  a += 1;
  b += a;
}
int main() {
  int x = 2;
  f(x, x);
  std::cout << x;
}`,
    },
  ),
  q(
    "prog-83",
    "programming",
    "hard",
    "Under C's lexical scoping rules, what is printed?",
    ["1", "2", "An indeterminate value", "A compile-time redeclaration error"],
    0,
    "The body of f resolves x where f is defined, namely the file-scope x. The block-local x in g does not dynamically affect f.",
    {
      code: `#include <stdio.h>
int x = 1;
void f(void) {
  printf("%d", x);
}
void g(void) {
  int x = 2;
  f();
}
int main(void) {
  g();
}`,
    },
  ),
  q(
    "prog-84",
    "programming",
    "hard",
    "What is printed by the Java program?",
    ["10 5", "6 5", "10 9", "6 9"],
    3,
    "private restricts access by class, not by object instance. transferTo is code inside Account, so it may update other.balance as well as this.balance.",
    {
      language: "java",
      code: `final class Account {
  private int balance;
  Account(int balance) { this.balance = balance; }
  void transferTo(Account other, int amount) {
    balance -= amount;
    other.balance += amount;
  }
  int balance() { return balance; }
}
public class Main {
  public static void main(String[] args) {
    Account a = new Account(10);
    Account b = new Account(5);
    a.transferTo(b, 4);
    System.out.print(a.balance() + " " + b.balance());
  }
}`,
    },
  ),
  q(
    "prog-85",
    "programming",
    "hard",
    "What is printed by the Java overload/override combination?",
    ["V-A", "V-D", "S-A", "S-D"],
    2,
    "Overload resolution uses a's declared type Animal, selecting visit(Animal). That selected signature is virtual, so dispatch invokes SV.visit(Animal).",
    {
      language: "java",
      code: `class Animal {}
class Dog extends Animal {}
class V {
  String visit(Animal x) { return "V-A"; }
  String visit(Dog x) { return "V-D"; }
}
class SV extends V {
  @Override String visit(Animal x) { return "S-A"; }
  @Override String visit(Dog x) { return "S-D"; }
}
public class Main {
  public static void main(String[] args) {
    V v = new SV();
    Animal a = new Dog();
    System.out.print(v.visit(a));
  }
}`,
    },
  ),
  q(
    "prog-86",
    "programming",
    "hard",
    "What happens when the Java program calls f(0)?",
    [
      "It terminates when n reaches 3",
      "It terminates when n reaches 1",
      "It recurses indefinitely until StackOverflowError",
      "It fails to compile because n++ cannot be an argument",
    ],
    2,
    "Post-increment passes the old value to the recursive call. Every new frame therefore receives 0, so the base case is never reached.",
    {
      language: "java",
      code: `public class Main {
  static void f(int n) {
    if (n == 3) return;
    f(n++);
  }
  public static void main(String[] args) {
    f(0);
  }
}`,
    },
  ),
  q(
    "prog-87",
    "programming",
    "hard",
    "What is printed by the C++ program?",
    ["B", "D", "The call is ambiguous", "Compilation fails because f(int) is hidden"],
    1,
    "Declaring f(double) in D hides all B overloads named f. The call converts 1 to double and invokes D::f(double).",
    {
      language: "cpp",
      code: `#include <iostream>
struct B {
  void f(int) { std::cout << "B"; }
};
struct D : B {
  void f(double) { std::cout << "D"; }
};
int main() {
  D d;
  d.f(1);
}`,
    },
  ),
  q(
    "prog-88",
    "programming",
    "hard",
    "What is the result of compiling class C?",
    [
      "It compiles and A.f wins because A is listed first",
      "It compiles and B.f wins because B is listed last",
      "It compiles but calling f is ambiguous at runtime",
      "It fails because C must override the conflicting default method",
    ],
    3,
    "C inherits unrelated defaults with the same signature and neither interface is more specific. Java requires C to provide an override that resolves the conflict.",
    {
      language: "java",
      code: `interface A {
  default String f() { return "A"; }
}
interface B {
  default String f() { return "B"; }
}
class C implements A, B {}`,
    },
  ),
  q(
    "prog-89",
    "programming",
    "hard",
    "What is printed by the C++ recursion with a reference parameter?",
    ["3", "4", "5", "6"],
    0,
    "The descending calls add 3+2+1, taking x to 6. Each of the three returning frames then decrements the same referenced x once, leaving 3.",
    {
      language: "cpp",
      code: `#include <iostream>
void f(int n, int& x) {
  if (n == 0) return;
  x += n;
  f(n - 1, x);
  --x;
}
int main() {
  int x = 0;
  f(3, x);
  std::cout << x;
}`,
    },
  ),
  q(
    "prog-90",
    "programming",
    "hard",
    "Rectangle yields 20 but Square yields 16 in areaAfterResize. Which OOP conclusion best follows?",
    [
      "Square demonstrates valid substitutability because both results are positive",
      "Square violates the Liskov substitution principle for this Rectangle contract",
      "Rectangle violates encapsulation because its setters are public",
      "The result is caused by static method overloading",
    ],
    1,
    "The function relies on width and height being independently settable, a behavioral promise Square breaks. A Square therefore cannot safely substitute for this Rectangle abstraction.",
    {
      language: "java",
      code: `class Rectangle {
  protected int w, h;
  void setW(int w) { this.w = w; }
  void setH(int h) { this.h = h; }
  int area() { return w * h; }
}
class Square extends Rectangle {
  @Override void setW(int w) { this.w = this.h = w; }
  @Override void setH(int h) { this.w = this.h = h; }
}
static int areaAfterResize(Rectangle r) {
  r.setW(5);
  r.setH(4);
  return r.area();
}`,
    },
  ),
];
