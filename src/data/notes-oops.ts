import type { TopicNote } from "@/data/notes";

export const notesOops: TopicNote = {
  topic: "oops",
  title: "OOP — worked notes",
  blurb:
    "SEBI Grade A OOP questions mix definitions with short Java and C++ traces. The four pillars: abstraction (show the essential interface), encapsulation (bundle state with methods and hide it), inheritance (IS-A reuse/extension), polymorphism (one name, many behaviours — overload at compile time, override at run time). Access specifiers differ by language: C++ public/protected/private; Java adds package-private default and a package-inclusive protected; Python uses convention (_ / __ mangling), not the compiler. Abstract class vs interface is “can I keep fields and concrete methods, and can I inherit several?” Constructor chaining is super()/this() first in Java and base-then-derived in C++. The diamond problem is two copies of a grand-base unless C++ virtual inheritance (or Java/Python single class inheritance plus interfaces). IS-A is inheritance; HAS-A is composition.",
  blocks: [
    {
      heading: "Abstraction",
      body: "Abstraction is the design act of exposing what a client may do and hiding how it is done. A payment API’s charge(amount) is the abstraction; card-network bytes are the implementation. In code this is a well-chosen class/interface, not a comment. Abstract classes and interfaces are language tools for abstraction; a concrete class with all fields public is a weak one.\n\nExam wording: “which concept hides internal details and shows only functionality?” → abstraction (sometimes they say encapsulation for hiding state — see the next section for the distinction they actually mark). Abstraction is about the interface you publish; encapsulation is about locking the representation behind that interface.\n\nA dry-run still matters: if a reference is typed as an abstract Shape and the object is a Circle, a virtual area() call is polymorphism using an abstract type. The abstract type cannot be instantiated.\n\nIf the question is “cannot create an object of”, look for abstract / interface / pure virtual. If it is “hides how, shows what”, pick abstraction and then check they did not want encapsulation for the private-field wording.",
      bullets: [
        "Cannot new an abstract class / interface (Java). C++: cannot instantiate a class with a pure virtual that is still unimplemented.",
        "Abstraction ≠ data hiding word-for-word, but MCQs sometimes treat them as a pair.",
      ],
      examples: [
        {
          title: "Cannot construct the abstract type — Java",
          prompt: "What is the result?",
          language: "java",
          code: `abstract class Shape {
  abstract int area();
  int tag() { return 1; }
}
class Square extends Shape {
  int s = 3;
  int area() { return s * s; }
}
class Main {
  public static void main(String[] args) {
    Shape x = new Square();
    System.out.print(x.area() + x.tag());
  }
}`,
          steps: [
            "Shape is abstract; new Shape() would be a compile error. new Square() is legal.",
            "x has compile-time type Shape, runtime Square.",
            "x.area() is abstract in Shape, implemented in Square. Dynamic dispatch → 3*3=9.",
            "x.tag() is a concrete method inherited from Shape → 1. Not abstract, still callable on a Shape ref.",
            "print 9+1 with no space → 10. The program compiles and runs.",
          ],
          result: "10",
        },
        {
          title: "new on the abstract name — Java compile error",
          prompt: "What is the result of compiling this main?",
          language: "java",
          code: `abstract class Shape {
  abstract int area();
}
class Main {
  public static void main(String[] args) {
    Shape s = new Shape();
  }
}`,
          steps: [
            "Shape is declared abstract.",
            "new Shape() is forbidden even if you later meant to assign a subclass.",
            "There is no anonymous implementation here.",
            "javac reports that Shape is abstract; cannot be instantiated.",
            "Result is a compile error, not a runtime exception.",
          ],
          result: "compile error",
        },
        {
          title: "C++ pure virtual",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
struct Shape {
  virtual int area() const = 0;
  int tag() const { return 1; }
};
struct Square : Shape {
  int s = 3;
  int area() const override { return s * s; }
};
int main() {
  Square q;
  Shape& r = q;
  std::cout << r.area() << r.tag();
}`,
          steps: [
            "Shape is abstract because area is pure virtual (=0). Shape s; would not compile.",
            "Square implements area, so Square q is allowed. Construction: Shape subobject then Square.",
            "r is a Shape& bound to q. r.area() is virtual → Square::area → 9.",
            "r.tag() is non-virtual concrete → 1.",
            "cout 91.",
          ],
          result: "91",
        },
        {
          title: "Abstract type as a parameter — Java",
          prompt: "What is printed?",
          language: "java",
          code: `abstract class Animal {
  abstract String speak();
}
class Dog extends Animal {
  String speak() { return "woof"; }
}
class Main {
  static void play(Animal a) {
    System.out.print(a.speak());
  }
  public static void main(String[] args) {
    play(new Dog());
  }
}`,
          steps: [
            "play expects Animal, an abstract type. That is the abstraction: any Animal.",
            "new Dog() is an Animal (IS-A). Passed by value of the reference.",
            "a.speak() dispatched to Dog.speak → woof.",
            "If Cat also extends Animal, play works without changing play — that is the point of the abstract parameter.",
            "print woof.",
          ],
          result: "woof",
        },
      ],
    },
    {
      heading: "Encapsulation and access specifiers",
      body: "Encapsulation puts data and the methods that maintain it in one unit and restricts direct access. The usual Java pattern is private fields with getters/setters (or none — better invariants). A public field breaks encapsulation even if the class “looks OOP”.\n\nC++: public (everyone), protected (class + derived), private (class + friends). Default for class is private; for struct is public. Java: public, protected (package + subclasses, including subclasses in other packages), default package-private (no modifier: same package only), private (the class only). A Java subclass in another package cannot see a package-private member; it can see protected.\n\nPython: name_ is a convention (“internal”). __name inside class C is mangled to _C__name, which stops accidental subclass clashes, not a determined debugger. There is no public keyword. Trace Java/C++ access errors as compile errors; Python attribute access usually succeeds unless you rely on mangling.\n\nA public field is not encapsulated even if getters exist. Java protected is visible in the package; C++ protected is not. That single difference decides many “does this compile?” items.",
      bullets: [
        "Java protected ≠ C++ protected (Java protected is also package-visible).",
        "friend in C++ is an encapsulation escape hatch; Java has no friend.",
      ],
      examples: [
        {
          title: "Java private field is invisible in the subclass",
          prompt: "What is the result?",
          language: "java",
          code: `class P {
  private int x = 1;
  int get() { return x; }
}
class C extends P {
  int leak() { return x; }
}`,
          steps: [
            "P.x is private. Only P’s body (and nested classes) may name x.",
            "C.leak() tries to read x. C is a subclass but private is not protected.",
            "get() would compile (inherited public/package method reading x inside P).",
            "leak() does not compile.",
            "Result: compile error.",
          ],
          result: "compile error",
        },
        {
          title: "Java protected through a subclass in the same package",
          prompt: "What is printed? (same package)",
          language: "java",
          code: `class P {
  protected int x = 4;
}
class C extends P {
  int f() { return x + 1; }
}
class Main {
  public static void main(String[] args) {
    System.out.print(new C().f());
  }
}`,
          steps: [
            "C inherits protected x. In C.f, bare x is P.x = 4.",
            "return 4+1=5.",
            "main prints 5.",
            "If C were in another package, C.f could still use x (protected + subclass). A non-subclass in that other package could not.",
            "Output 5.",
          ],
          result: "5",
        },
        {
          title: "C++ private vs public struct/class",
          prompt: "Which line fails, and what does the valid program print?",
          language: "cpp",
          code: `#include <iostream>
class A {
  int x = 1;
 public:
  int get() const { return x; }
};
struct B {
  int y = 2;
};
int main() {
  A a; B b;
  std::cout << a.get() << b.y;
}`,
          steps: [
            "class A: members are private by default. int x is private. a.x would be a compile error.",
            "get() is public and runs inside A, so it may read x. Returns 1.",
            "struct B: members public by default. b.y is legal (2).",
            "The program as written never names a.x. It compiles.",
            "cout 12.",
          ],
          result: "12",
        },
        {
          title: "Python mangling is not privacy",
          prompt: "What is printed?",
          language: "python",
          code: `class C:
    def __init__(self):
        self._ok = 1
        self.__hid = 2
c = C()
print(c._ok, c._C__hid)
print(hasattr(c, "__hid"))`,
          steps: [
            "_ok is a plain attribute. c._ok is 1. Convention only.",
            "__hid in class C is stored as _C__hid. Direct c.__hid would typically miss (and name-mangle on the access side inside the class only).",
            "c._C__hid reaches 2. Encapsulation is not enforced.",
            "hasattr(c, '__hid') is False because the attribute’s real name is _C__hid.",
            "print 1 2 then False.",
          ],
          result: "1 2\nFalse",
        },
      ],
    },
    {
      heading: "Inheritance (IS-A) vs composition (HAS-A)",
      body: "Inheritance says Child is a Parent: it can be used where a Parent is required (Liskov). Java extends one class, implements many interfaces. C++ may inherit several classes (multiple inheritance). Python class C(A, B) is multiple inheritance with C3 MRO.\n\nHAS-A is composition: Car has an Engine field. Prefer composition when you want to reuse without advertising IS-A (a Stack should not extend ArrayList just to steal methods — it has a list). MCQs: “reusability by creating an object of another class” → composition; “reusability by acquiring properties of a parent” → inheritance.\n\nInherited members: public/protected methods and fields (language rules above). Constructors are not inherited. Private members are inherited as storage in C++/Java but are not named in the child. The child may add fields; that is still IS-A, not HAS-A, unless those fields are the point of a separate type you are modelling.\n\ninstanceof / a Base* = &derived success means IS-A. A field of another type is HAS-A. Prefer composition when you are not willing to advertise substitutability.",
      bullets: [
        "extends / : public Base → IS-A. A field of type Engine → HAS-A.",
        "instanceof / dynamic_cast success is evidence of IS-A.",
      ],
      examples: [
        {
          title: "IS-A assignment — Java",
          prompt: "What is printed?",
          language: "java",
          code: `class Animal {}
class Dog extends Animal {}
class Main {
  public static void main(String[] args) {
    Animal a = new Dog();
    System.out.print((a instanceof Dog) + " " + (a instanceof Animal));
  }
}`,
          steps: [
            "Dog extends Animal: Dog IS-A Animal. Animal a = new Dog() is legal.",
            "Runtime object is Dog. a instanceof Dog is true.",
            "a instanceof Animal is true (every Dog is an Animal).",
            "The reverse Dog d = new Animal() would not compile.",
            "print true true.",
          ],
          result: "true true",
        },
        {
          title: "HAS-A does not make an Engine an IS-A Car — Java",
          prompt: "What is the result of compiling the marked line?",
          language: "java",
          code: `class Engine {
  int rpm = 800;
}
class Car {
  Engine e = new Engine();
}
class Main {
  public static void main(String[] args) {
    Car c = new Car();
    Engine e = c;
  }
}`,
          steps: [
            "Car HAS-A Engine (field e). There is no extends relationship.",
            "c’s type is Car. Engine e = c needs Car IS-A Engine, which is false.",
            "javac: incompatible types: Car cannot be converted to Engine.",
            "c.e would be the valid way to get the Engine.",
            "compile error.",
          ],
          result: "compile error",
        },
        {
          title: "C++ public inheritance is IS-A",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
struct Engine { int rpm = 800; };
struct Car : Engine {};
int main() {
  Car c;
  Engine* p = &c;
  std::cout << p->rpm;
}`,
          steps: [
            "struct Car : Engine means public inheritance (struct default). Car IS-A Engine.",
            "Engine* p = &c is allowed. p->rpm is 800.",
            "This models “Car is an Engine”, which is usually a bad domain model, but it is valid C++ IS-A.",
            "If the exam wanted HAS-A they would write Engine e; inside Car, not : Engine.",
            "print 800.",
          ],
          result: "800",
        },
        {
          title: "Composition call-through — Java",
          prompt: "What is printed?",
          language: "java",
          code: `class Engine {
  String go() { return "vroom"; }
}
class Car {
  private Engine e = new Engine();
  String go() { return e.go(); }
}
class Main {
  public static void main(String[] args) {
    System.out.print(new Car().go());
  }
}`,
          steps: [
            "Car does not extend Engine. It holds a private Engine (HAS-A, encapsulated).",
            "Car.go() delegates to e.go() — a wrapping method, not inheritance.",
            "new Car() constructs Car, which constructs Engine.",
            "go() returns vroom.",
            "print vroom.",
          ],
          result: "vroom",
        },
      ],
    },
    {
      heading: "Polymorphism, override vs overload",
      body: "Polymorphism: the same message, different behaviour. Compile-time (static) polymorphism is overloading — and C++ templates / operator overloading. Run-time (dynamic) polymorphism is overriding virtual instance methods. Java: all instance methods are virtual unless final/private/static. C++: only methods declared virtual (and their overrides).\n\nOverride: same signature in a subclass, replacing dispatch. Annotate @Override in Java to make a mismatch a compile error. Overload: same name, different parameter list, resolved with the compile-time types of the arguments (and the compile-time type of the receiver for Java).\n\nA Parent reference to a Child object: the overload is chosen from Parent’s methods, then that signature is dispatched to Child if overridden. Extra overloads only in Child are invisible. That mixed question is the highest-yield OOP trace on the paper.\n\nSame name + different parameter lists → overload (compile-time). Same name + same parameters in a subclass → override (run-time if virtual). C++ without virtual is hiding, not overriding.",
      bullets: [
        "Same name + different params → overload (compile-time).",
        "Same name + same params + subclass → override (run-time, if virtual).",
      ],
      examples: [
        {
          title: "Java override through a base reference",
          prompt: "What is printed?",
          language: "java",
          code: `class P {
  String f() { return "P"; }
}
class C extends P {
  @Override String f() { return "C"; }
}
class Main {
  public static void main(String[] args) {
    P x = new C();
    System.out.print(x.f());
  }
}`,
          steps: [
            "x compile-time P, runtime C.",
            "f() is an instance method with the same signature — override.",
            "Dispatch uses C.f → C.",
            "If f were static, P.f would run instead.",
            "print C.",
          ],
          result: "C",
        },
        {
          title: "Java overload is compile-time on the reference",
          prompt: "What is printed?",
          language: "java",
          code: `class P {
  String f(int n) { return "Pi"; }
  String f(double n) { return "Pd"; }
}
class Main {
  public static void main(String[] args) {
    P p = new P();
    System.out.print(p.f(1) + p.f(1.0));
  }
}`,
          steps: [
            "Two overloads in the same class. No subclass.",
            "p.f(1): argument int → exact match f(int) → Pi. Not f(double) (would require widening, worse than exact).",
            "p.f(1.0): double literal → f(double) → Pd.",
            "Concatenation PiPd.",
            "print PiPd.",
          ],
          result: "PiPd",
        },
        {
          title: "C++ non-virtual is not runtime polymorphism",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
struct P {
  void f() { std::cout << "P"; }
};
struct C : P {
  void f() { std::cout << "C"; }
};
int main() {
  C obj;
  P* p = &obj;
  p->f();
  obj.f();
}`,
          steps: [
            "f is not virtual. C::f hides P::f rather than overriding it in the vtable sense.",
            "p->f(): static type P* → P::f prints P.",
            "obj.f(): static type C → C::f prints C.",
            "Same object, two different functions selected by the static type.",
            "Output PC.",
          ],
          result: "PC",
        },
        {
          title: "Override + extra overload in the child — Java",
          prompt: "What is printed?",
          language: "java",
          code: `class P {
  String f(Object o) { return "Pobj"; }
}
class C extends P {
  @Override String f(Object o) { return "Cobj"; }
  String f(String s) { return "Cstr"; }
}
class Main {
  public static void main(String[] args) {
    P p = new C();
    C c = new C();
    System.out.print(p.f("x") + c.f("x"));
  }
}`,
          steps: [
            "p.f(\"x\"): compile-time receiver P, so only f(Object) is considered. Signature f(Object) chosen. Runtime C overrides it → Cobj.",
            "c.f(\"x\"): compile-time receiver C. Overloads f(Object) and f(String). String is more specific → Cstr.",
            "Same runtime class, different compile-time types, different overload sets.",
            "Concatenation CobjCstr.",
            "print CobjCstr.",
          ],
          result: "CobjCstr",
        },
      ],
    },
    {
      heading: "Abstract class vs interface",
      body: "Java abstract class: 0..n abstract methods, can have constructors, instance fields, concrete methods, private members. A class extends at most one abstract (or concrete) class. Java interface: all implementations are multiple. Historically interface methods were public abstract and fields public static final. Modern Java allows default and static methods on interfaces; SEBI still often treats “interface = 100% abstract, public, multiple inheritance of type”.\n\nC++ has no interface keyword: a class with only pure virtuals is an interface in style. Multiple inheritance of such classes is how C++ models several interfaces. Python abc.ABC / @abstractmethod is the analogue; you can still multiply inherit.\n\nPick abstract class when you want shared fields or a partial implementation and a single lineage. Pick interface when you want a capability (Comparable, Runnable) mixed into unrelated classes.\n\nJava: extends one class, implements many interfaces. C++ models an interface as a class of pure virtuals and may inherit several. Classic Java interface fields are public static final.",
      bullets: [
        "Java: extends one, implements many. C++: inherit many, possibly virtual bases.",
        "Interface fields in classic Java: public static final only.",
      ],
      examples: [
        {
          title: "Java class implements two interfaces",
          prompt: "What is printed?",
          language: "java",
          code: `interface Fly { String fly(); }
interface Swim { String swim(); }
class Duck implements Fly, Swim {
  public String fly() { return "F"; }
  public String swim() { return "S"; }
}
class Main {
  public static void main(String[] args) {
    Fly f = new Duck();
    Swim s = (Swim) f;
    System.out.print(f.fly() + s.swim());
  }
}`,
          steps: [
            "Duck implements Fly and Swim — multiple types, one class. Legal.",
            "Fly f = new Duck(): f’s compile-time type only sees fly().",
            "f is also a Swim at runtime. Cast (Swim) f succeeds. s.swim() → S.",
            "f.fly() → F. Concatenation FS.",
            "print FS.",
          ],
          result: "FS",
        },
        {
          title: "Java cannot extend two classes",
          prompt: "What is the result?",
          language: "java",
          code: `class A {}
class B {}
class C extends A, B {}`,
          steps: [
            "Java allows at most one extends clause for classes.",
            "class C extends A, B is a syntax/semantic error.",
            "C could extend A and implement an interface that B would have been.",
            "This is the language-level reason Java uses interfaces for multiple IS-A of API.",
            "compile error.",
          ],
          result: "compile error",
        },
        {
          title: "Abstract class may keep state — Java",
          prompt: "What is printed?",
          language: "java",
          code: `abstract class Acc {
  int n;
  Acc(int n) { this.n = n; }
  abstract int bump();
}
class A2 extends Acc {
  A2() { super(3); }
  int bump() { return ++n; }
}
class Main {
  public static void main(String[] args) {
    System.out.print(new A2().bump());
  }
}`,
          steps: [
            "Abstract Acc has a field and a constructor — allowed (unlike a classic interface).",
            "A2() must call super(3). Acc stores n=3.",
            "bump is implemented in A2: ++n → n=4, return 4.",
            "Interfaces could not (classically) hold this per-object n.",
            "print 4.",
          ],
          result: "4",
        },
        {
          title: "C++ two “interfaces” via pure virtual bases",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
struct Fly { virtual const char* fly() = 0; };
struct Swim { virtual const char* swim() = 0; };
struct Duck : Fly, Swim {
  const char* fly() override { return "F"; }
  const char* swim() override { return "S"; }
};
int main() {
  Duck d;
  Fly* f = &d;
  Swim* s = &d;
  std::cout << f->fly() << s->swim();
}`,
          steps: [
            "Fly and Swim are interface-like (pure virtuals). Duck inherits both — multiple inheritance.",
            "Fly* f = &d; f->fly() virtual → Duck::fly → F.",
            "Swim* s = &d; s->swim() → S.",
            "This is legal C++. The next block covers what happens if Fly and Swim themselves share a grand-base (diamond).",
            "Output FS.",
          ],
          result: "FS",
        },
      ],
    },
    {
      heading: "Constructor chaining and the diamond problem",
      body: "Java constructors chain: this() or super() first. The Object constructor runs at the top of the extends chain, then each subclass initialisers and body on the way down. C++: bases in the order they appear in the class-head (not the order in your mem-initialiser list, except that the list chooses which constructor), then members, then the body.\n\nThe diamond: D inherits B and C, both inherit A. Without help, D contains two A subobjects (B’s A and C’s A). Calling a method of A through D is ambiguous. C++ virtual inheritance: class B : virtual public A, class C : virtual public A collapses to one A, constructed by the most derived class D. Java has no class diamond because of single class inheritance; default methods on two interfaces can still clash and must be overridden.\n\nExam line: “virtual base class in C++ solves” → diamond / duplicate grand-base. Not the same as a virtual function, though both use the word virtual.\n\nConstruction prints base then derived; destruction is the reverse. Two A subobjects (no virtual inheritance) make d.x ambiguous. One shared A (virtual inheritance) is constructed by the most derived class.",
      bullets: [
        "virtual function → runtime method. virtual inheritance → one shared base subobject.",
        "Most derived class constructs the virtual base.",
      ],
      examples: [
        {
          title: "Java constructor chain prints",
          prompt: "What is printed?",
          language: "java",
          code: `class A {
  A() { System.out.print("A"); }
}
class B extends A {
  B() { System.out.print("B"); }
  B(int n) { this(); System.out.print(n); }
}
class Main {
  public static void main(String[] args) {
    new B(1);
  }
}`,
          steps: [
            "new B(1) enters B(int). First statement this() → B().",
            "B() has implicit super() → A(). A prints A.",
            "B() body prints B. Buffer AB.",
            "B(int) body prints 1. Buffer AB1.",
            "print AB1.",
          ],
          result: "AB1",
        },
        {
          title: "C++ two A subobjects without virtual inheritance",
          prompt: "This layout is the diamond. What happens at d.x?",
          language: "cpp",
          code: `struct A { int x = 1; };
struct B : A {};
struct C : A {};
struct D : B, C {};
int main() {
  D d;
  d.x = 2;
}`,
          steps: [
            "B contains an A. C contains an A. D contains both. Two x members.",
            "d.x is ambiguous: B::x or C::x? The compiler rejects the access.",
            "d.B::x = 2 would compile and leave C::x at 1.",
            "This is the diamond problem (duplicate grand-base), not a virtual-function issue.",
            "compile error.",
          ],
          result: "compile error",
        },
        {
          title: "C++ virtual inheritance shares A",
          prompt: "What is printed?",
          language: "cpp",
          code: `#include <iostream>
struct A { int x; A() { x = 1; } };
struct B : virtual A {};
struct C : virtual A {};
struct D : B, C {
  D() { x = 7; }
};
int main() {
  D d;
  std::cout << d.x << d.B::x << d.C::x;
}`,
          steps: [
            "B and C virtually inherit A. D has one A subobject.",
            "D() is the most derived; it constructs A (A() sets x=1) then B, C, then body x=7.",
            "d.x, d.B::x, d.C::x all name that one x. All 7.",
            "No ambiguity. cout 777.",
            "If virtual were omitted this would not compile (previous example).",
          ],
          result: "777",
        },
        {
          title: "Java default-method clash must be overridden",
          prompt: "What is the result of compiling I3 without overriding n?",
          language: "java",
          code: `interface I1 { default int n() { return 1; } }
interface I2 { default int n() { return 2; } }
interface I3 extends I1, I2 {}`,
          steps: [
            "I3 inherits two default n() implementations. Java does not pick one.",
            "I3 must override n() and may pick I1.super.n() or I2.super.n() or new code.",
            "As written, I3 is a compile error.",
            "This is the interface analogue of a diamond, without duplicate fields (interfaces do not hold per-object fields classically).",
            "compile error.",
          ],
          result: "compile error",
        },
      ],
    },
  ],
};
