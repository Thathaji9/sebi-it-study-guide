import type { TopicNote } from "@/data/notes";

export const notesOops: TopicNote = {
  topic: "oops",
  title: "OOP — techniques (beginner)",
  blurb:
    "Four pillars, one sentence each. Abstraction shows the useful face and hides the rest. Encapsulation keeps data private and changes it with methods. Inheritance means a child is a parent and reuses its tools. Polymorphism means one name, many behaviours: overload at compile time, override at run time.",
  blocks: [
    {
      heading: "Four pillars — one sentence each",
      body: "Abstraction: show only what a user needs, hide how it is done. Encapsulation: keep data private; change it only with methods. Inheritance: a child class is a parent class, so it gets the parent’s fields and methods. Polymorphism: one name can do different work — overload at compile time, override at run time.\n\nA public field is not encapsulated even if getters exist. You cannot new an abstract class or a Java interface. Child c = new Child() is IS-A Parent, so Parent p = c is legal. A Car that has an Engine field is HAS-A, not IS-A.",
      howTo: [
        "Read the question word: hide-how → abstraction; private field → encapsulation; is-a / extends → inheritance; same name different work → polymorphism.",
        "If the code says new AbstractType(), that is a compile error (abstraction tool).",
        "If a subclass reads a private parent field, that is a compile error (encapsulation).",
        "If Parent p = new Child() compiles, that is inheritance (IS-A).",
      ],
      bullets: [
        "Abstraction: show what, hide how. You cannot construct the abstract type.",
        "Encapsulation: private data + methods. A public field breaks it.",
        "Inheritance: Child IS-A Parent. Composition (a field) is HAS-A.",
        "Polymorphism: overload = compile time. override = run time.",
      ],
      examples: [
        {
          title: "Abstraction: Shape reference, Square object",
          prompt: "What is printed? Would new Shape() compile?",
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
            {
              do: "Shape is abstract. new Shape() would not compile. new Square() is legal.",
              why: "Abstraction lets you name the type Shape without building a bare Shape.",
            },
            {
              do: "x has type Shape. The object is Square.",
              why: "You program to the abstract face. The real object fills in area().",
            },
            {
              do: "x.area() runs Square’s 3*3 = 9. x.tag() runs the inherited 1. print 10.",
              why: "The abstract method is implemented in the child. The concrete method is reused.",
            },
            {
              do: "new Shape() is a compile error, not a runtime crash.",
              why: "The compiler forbids constructing the abstract type.",
            },
          ],
          result: "10  (new Shape() would be a compile error)",
        },
        {
          title: "Encapsulation: private field is invisible in the child",
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
            {
              do: "P.x is private. Only P’s own body may name x.",
              why: "Encapsulation hides the representation. private is the lock.",
            },
            {
              do: "C.leak() writes return x. C is a child, but private is not inherited as a usable name.",
              why: "A subclass does not get a key to private fields. It may call get().",
            },
            {
              do: "get() would compile: it reads x inside P.",
              why: "Methods of P are allowed to see P’s private data.",
            },
            {
              do: "leak() does not compile. Result: compile error.",
              why: "The child’s direct use of x breaks encapsulation, so javac stops it.",
            },
          ],
          result: "compile error",
        },
        {
          title: "Inheritance IS-A vs composition HAS-A",
          prompt: "What is printed? Does Engine e = c compile?",
          language: "java",
          code: `class Animal {}
class Dog extends Animal {}
class Engine { int rpm = 800; }
class Car { Engine e = new Engine(); }
class Main {
  public static void main(String[] args) {
    Animal a = new Dog();
    System.out.print((a instanceof Dog) + " " + (a instanceof Animal));
  }
}`,
          steps: [
            {
              do: "Dog extends Animal, so Dog IS-A Animal. Animal a = new Dog() is legal.",
              why: "Inheritance is the IS-A link. A child may be stored in a parent variable.",
            },
            {
              do: "Runtime object is Dog. a instanceof Dog is true. a instanceof Animal is true. print true true.",
              why: "Every Dog is an Animal. instanceof follows IS-A.",
            },
            {
              do: "Car HAS-A Engine (a field). Engine e = c does not compile.",
              why: "A field is composition, not inheritance. Car is not an Engine.",
            },
            {
              do: "Dog d = new Animal() would also not compile.",
              why: "IS-A goes child → parent, not parent → child.",
            },
          ],
          result: "true true  (Engine e = car is a compile error)",
        },
        {
          title: "You cannot new an interface",
          prompt: "What is printed? Would Payable p = new Payable() compile?",
          language: "java",
          code: `interface Payable { int pay(); }
class Emp implements Payable {
  public int pay() { return 10; }
}
class Main {
  public static void main(String[] args) {
    Payable p = new Emp();
    System.out.print(p.pay());
  }
}`,
          steps: [
            {
              do: "Payable is an interface. It shows the face pay() and hides how money is computed.",
              why: "Abstraction: a type the caller can name without constructing a bare Payable.",
            },
            {
              do: "new Payable() would not compile. new Emp() is legal. Emp IS-A Payable.",
              why: "You cannot construct the abstract type. You construct a class that implements it.",
            },
            {
              do: "p has type Payable. The object is Emp. p.pay() runs Emp’s 10. print 10.",
              why: "Polymorphism: one name pay, the object’s body runs.",
            },
            {
              do: "Emp must implement pay() or it would have to be abstract too.",
              why: "The contract is not optional once you say implements.",
            },
            {
              do: "Result 10, and new Payable() is a compile error.",
              why: "Same rule as abstract class: the useful face is not a concrete object.",
            },
          ],
          result: "10  (new Payable() would be a compile error)",
        },
        {
          title: "Public field plus a getter is still not encapsulation",
          prompt: "Is class Box { public int n; int getN() { return n; } } encapsulated?",
          language: "java",
          code: `class Box {
  public int n;
  int getN() { return n; }
}`,
          steps: [
            {
              do: "n is public. Any other class may write box.n = −99.",
              why: "Encapsulation needs the data hidden. public is an open window.",
            },
            {
              do: "getN() exists, but it is not the only door. The field is still reachable.",
              why: "A getter does not cancel a public field.",
            },
            {
              do: "Exam answer: this is not encapsulation.",
              why: "The pillar failed at the specifier, not at the missing method.",
            },
            {
              do: "Fix: private int n; and keep getN() (and a setter if writes are allowed).",
              why: "Methods become the only legal path.",
            },
            {
              do: "Abstraction can still show getN() as the useful face. Encapsulation is the private lock behind that face.",
              why: "The two pillars are related, but ‘has a getter’ ≠ encapsulated.",
            },
          ],
          result: "No. A public field is not encapsulation, even with a getter.",
        },
      ],
    },
    {
      heading: "Compile-time vs runtime polymorphism",
      body: "Compile-time polymorphism is overloading. Several methods share a name and differ by parameters. The compiler picks one using the types it can see: the variable’s type and the argument types.\n\nRuntime polymorphism is overriding. A child rewrites a parent instance method with the same signature. Java instance methods are virtual. The object’s real class wins. C++ needs the word virtual. static, private, and fields are always compile-time. Extra overloads that exist only in the child are invisible through a parent variable.",
      howTo: [
        "Write two labels: variable type (compile time) and object type (run time).",
        "Different parameter lists → overload. Search only the variable’s type. That is compile time.",
        "Same signature in a child → override. If the method is virtual, use the object’s type. That is run time.",
        "Fields, static, and private: ignore the object. Use the variable’s type.",
      ],
      bullets: [
        "Same name + different params → overload (compile time).",
        "Same name + same params in a subclass → override (run time, if virtual).",
        "C++ without virtual is hiding, not runtime polymorphism.",
      ],
      examples: [
        {
          title: "Overload is compile time — exact match wins",
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
            {
              do: "Two methods named f. No child class. This is overload only.",
              why: "Compile-time polymorphism lives in one class as different parameter lists.",
            },
            {
              do: "p.f(1): argument is int → exact match f(int) → Pi.",
              why: "The compiler sees 1 as int. It does not wait for run time.",
            },
            {
              do: "p.f(1.0): argument is double → f(double) → Pd.",
              why: "1.0 is a double literal. A different overload is chosen.",
            },
            {
              do: "print PiPd.",
              why: "Both picks were frozen before the program ran.",
            },
          ],
          result: "PiPd",
        },
        {
          title: "Override is run time — the object wins",
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
            {
              do: "x’s variable type is P. The object is C.",
              why: "This is the standard exam picture for runtime polymorphism.",
            },
            {
              do: "f() has the same signature in C. That is override, not overload.",
              why: "Same name and same empty parameter list in a child.",
            },
            {
              do: "Java instance methods are virtual. x.f() runs C.f → C.",
              why: "Runtime polymorphism reads the object, not the variable.",
            },
            {
              do: "If f were static, P.f would run instead. print C.",
              why: "static binds at compile time. Instance override binds at run time.",
            },
          ],
          result: "C",
        },
        {
          title: "Mix: overload on the variable, then override on the object",
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
            {
              do: "p.f(\"x\"): variable type P, so only f(Object) is visible. Signature f(Object) is chosen at compile time.",
              why: "Overload cannot see Child-only methods through a Parent variable.",
            },
            {
              do: "The object is C, so C.f(Object) runs → Cobj.",
              why: "After the signature is chosen, override still uses the real object.",
            },
            {
              do: "c.f(\"x\"): variable type C. Overloads f(Object) and f(String). String is a better match → Cstr.",
              why: "The same object with a Child variable has a bigger overload set.",
            },
            {
              do: "print CobjCstr.",
              why: "Compile time picked the signature. Run time picked the body. Extra child overloads need a child variable.",
            },
          ],
          result: "CobjCstr",
        },
        {
          title: "C++ without virtual is compile-time, even with a child object",
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
  P* p = new C;
  p->f();
}`,
          steps: [
            {
              do: "p has type P*. The object is C. f is not virtual.",
              why: "C++ uses the pointer’s type unless you write virtual.",
            },
            {
              do: "p->f() is bound to P::f at compile time → P.",
              why: "This is hiding, not runtime polymorphism.",
            },
            {
              do: "C::f is never called through p, even though new C created a C.",
              why: "The object type is ignored when the method is not virtual.",
            },
            {
              do: "If f were virtual in P, the print would be C.",
              why: "virtual is the C++ switch that turns override into run-time dispatch.",
            },
            {
              do: "print P. Exam phrase: no virtual → no runtime polymorphism.",
              why: "Java instance methods are virtual by default. C++ is not.",
            },
          ],
          result: "P",
        },
        {
          title: "A field is compile-time even when the method is not",
          prompt: "What is printed?",
          language: "java",
          code: `class P {
  int n = 1;
  int f() { return n; }
}
class C extends P {
  int n = 9;
  @Override int f() { return n; }
}
class Main {
  public static void main(String[] args) {
    P p = new C();
    System.out.print(p.n + " " + p.f());
  }
}`,
          steps: [
            {
              do: "p’s variable type is P. The object is C. Heap has P.n=1 and C.n=9.",
              why: "Two fields named n. Fields never override.",
            },
            {
              do: "p.n uses the variable type → 1.",
              why: "Field access is compile-time polymorphism’s cousin: it does not wait for the object.",
            },
            {
              do: "p.f() is an overridden instance method. C.f runs. Inside C.f, n means C.n → 9.",
              why: "The method body uses the class it was written in. Override picked C.f.",
            },
            {
              do: "print 1 9.",
              why: "Same name n, two rules: field from the variable, method from the object.",
            },
            {
              do: "If C did not override f, p.f() would run P.f and return P.n which is 1.",
              why: "P.f cannot see C.n. Only C’s own body names C.n.",
            },
          ],
          result: "1 9",
        },
      ],
    },
    {
      heading: "Access specifiers — who may touch the field",
      body: "private: only this class. public: everyone. protected: this class and its children (Java also lets the same package in).\n\nPython uses a name convention (_hidden, __mangled). It is not a compiler lock. The exam still asks what Java/C++ would forbid.",
      howTo: [
        "Name the field’s specifier: private, protected, or public.",
        "Name the place that wants to read it: same class, child class, or stranger.",
        "If the place is not allowed, the program does not compile.",
        "Remember: a public getter is the legal door into a private field.",
      ],
      bullets: [
        "private = this class only. public = anyone. protected = family (and Java package).",
        "Child code cannot write parent.privateField.",
        "Python _x is a hint, not a lock.",
      ],
      examples: [
        {
          title: "Private vs public getter",
          prompt: "Which line compiles: System.out.print(p.x); or System.out.print(p.getX()); if x is private?",
          language: "java",
          code: `class P { private int x = 7; int getX() { return x; } }`,
          steps: [
            { do: "x is private. Other classes may not write p.x.", why: "private is a compiler lock." },
            { do: "getX() is package/public enough to call. It runs inside P, so it may read x.", why: "The getter is the door." },
            { do: "p.x does not compile. p.getX() prints 7.", why: "Same data, different legal path." },
            { do: "A child class still cannot name x if it is private.", why: "private is not for children. protected would be." },
            { do: "Exam pick: use the getter.", why: "That is encapsulation in one line." },
          ],
          result: "p.getX() compiles and prints 7. p.x does not compile.",
        },
        {
          title: "Protected in a child",
          prompt: "Parent has protected int k. Child method returns k. Legal?",
          steps: [
            { do: "protected allows the child to name k.", why: "That is the point of protected." },
            { do: "A stranger class still cannot write parent.k.", why: "protected is not public." },
            { do: "If k were private, the child method would not compile.", why: "private stops even family." },
            { do: "So return k inside Child is legal when k is protected.", why: "Specifier matches the place." },
            { do: "Java extra: same-package classes also see protected. C++ does not use packages.", why: "If the paper is Java, remember the package door." },
          ],
          result: "Yes — a child may read a protected parent field. A stranger may not.",
        },
        {
          title: "Public field is not encapsulated",
          prompt: "class Box { public int n; }  Is this encapsulation?",
          steps: [
            { do: "Anyone can write box.n = −99.", why: "public means no door and no lock." },
            { do: "There is no hidden representation.", why: "Encapsulation needs private (or protected) data." },
            { do: "Adding a getter later does not fix the public field.", why: "The field is still an open window." },
            { do: "Exam answer: this is not encapsulation.", why: "The pillar failed at the specifier." },
            { do: "Fix: private int n; plus get/set if needed.", why: "Methods become the only door." },
          ],
          result: "No. A public field is not encapsulation.",
        },
        {
          title: "Default (package) access is not public",
          prompt: "class P { int n = 3; } with no word before int. Can a class in another package read p.n?",
          language: "java",
          code: `package a;
public class P { int n = 3; }
// package b;
// class Q { int f(P p) { return p.n; } }  // does not compile`,
          steps: [
            {
              do: "No private, protected, or public on n. That is default (package) access.",
              why: "Java has four specifiers. Blank is a real specifier, not ‘public’.",
            },
            {
              do: "A class in the same package may read p.n.",
              why: "Default means ‘this package only’.",
            },
            {
              do: "A class in another package may not read p.n. That line does not compile.",
              why: "Package b is a stranger to package a’s default field.",
            },
            {
              do: "A child in another package also cannot read default n. The child would need protected (or public).",
              why: "protected is the family door across packages. Default is not.",
            },
            {
              do: "Exam pick: blank ≠ public. Other package → compile error.",
              why: "If the paper wanted everyone, it would have written public.",
            },
          ],
          result: "No. Default (package) field is invisible in another package — compile error.",
        },
        {
          title: "Python _x is a hint, not a Java private lock",
          prompt: "After self._n = 1, can other Python code read obj._n?",
          language: "python",
          code: `class P:
    def __init__(self):
        self._n = 1
        self.__m = 2
p = P()
print(p._n)
print(p._P__m)`,
          steps: [
            {
              do: "_n is a convention: ‘please treat as internal’. Python still allows p._n. print 1.",
              why: "A leading underscore is not a compiler lock.",
            },
            {
              do: "__m is name-mangled to _P__m. p.__m would fail, but p._P__m still works. print 2.",
              why: "Mangling avoids accidental clashes in subclasses. It is still not Java private.",
            },
            {
              do: "Java private int n would make p.n a compile error in another class.",
              why: "The exam still wants the Java/C++ rule when the language is Java.",
            },
            {
              do: "So: Python can read _n. Java could not read a private n.",
              why: "Do not mix the languages in one answer.",
            },
            {
              do: "Result of this Python snippet: 1 then 2.",
              why: "Hints vs locks. Encapsulation in Python is mostly by agreement.",
            },
          ],
          result: "1 then 2. Other Python code may read _n. Java private would not compile.",
        },
      ],
    },
    {
      heading: "IS-A vs HAS-A — extends vs a field",
      body: "IS-A: Child extends Parent. A Square is a Shape. You may write Shape s = new Square().\n\nHAS-A: a field. A Car has an Engine. Car does not extend Engine. You write Engine e inside Car. The trap is calling every ‘uses’ relationship inheritance.",
      howTo: [
        "Say the English sentence: ‘X is a Y’ or ‘X has a Y’.",
        "is-a → extends / inheritance. has-a → a field (composition).",
        "If you can legally write Y ref = new X(), it is IS-A.",
        "If X only stores a Y, it is HAS-A.",
      ],
      bullets: [
        "IS-A = inheritance. HAS-A = a field.",
        "Square is a Shape. Car has an Engine.",
        "Do not extend just to reuse a helper. Prefer a field.",
      ],
      examples: [
        {
          title: "Legal assignment",
          prompt: "Square extends Shape. Is Shape s = new Square(); legal? Is Engine e = new Car(); legal if Car has an Engine field?",
          steps: [
            { do: "Square is a Shape. Shape s = new Square() is legal IS-A.", why: "A child object may be stored in a parent variable." },
            { do: "Car has an Engine. Car is not an Engine.", why: "HAS-A is not inheritance." },
            { do: "Engine e = new Car() does not compile.", why: "Those types are not in an is-a line." },
            { do: "Car may hold Engine eng; and call eng.start().", why: "That is composition." },
            { do: "Exam: pick IS-A only for extends.", why: "‘Uses’ is not ‘is’." },
          ],
          result: "Shape s = new Square() yes. Engine e = new Car() no.",
        },
        {
          title: "Why not extend Engine",
          prompt: "A coder writes class Car extends Engine. What goes wrong in the model?",
          steps: [
            { do: "That claims every Car is an Engine.", why: "extends always means IS-A." },
            { do: "A function void tune(Engine e) could then receive a Car.", why: "IS-A lets a Car stand where an Engine was expected." },
            { do: "That is the wrong model. Cars are not engines.", why: "Reuse should have been a field." },
            { do: "Write class Car { Engine e; } instead.", why: "HAS-A keeps the types honest." },
            { do: "Exam phrase: prefer composition over inheritance when there is no is-a.", why: "A standard OOP MCQ." },
          ],
          result: "Car extends Engine is a false IS-A. Use a field.",
        },
        {
          title: "Stack of IS-A",
          prompt: "C extends B, B extends A. Is A x = new C(); legal?",
          steps: [
            { do: "C is a B, and B is an A, so C is an A.", why: "IS-A chains." },
            { do: "A x = new C() compiles.", why: "A parent variable may hold any descendant." },
            { do: "C y = new A() does not compile.", why: "You cannot put a parent object in a child variable without a cast, and the object still is not a C." },
            { do: "Methods overridden in C still run if they were declared on A and the object is C.", why: "Runtime polymorphism follows the object." },
            { do: "Legal assignment is A x = new C().", why: "Up the tree is always safe." },
          ],
          result: "Yes. C is-a A through B.",
        },
        {
          title: "A list of Parent may hold Child objects",
          prompt: "What is printed?",
          language: "java",
          code: `class Animal { String kind() { return "A"; } }
class Dog extends Animal {
  @Override String kind() { return "D"; }
}
class Main {
  public static void main(String[] args) {
    Animal[] arr = { new Animal(), new Dog() };
    System.out.print(arr[0].kind() + arr[1].kind());
  }
}`,
          steps: [
            {
              do: "Animal[] is an array of Animal variables. Each slot may hold an Animal or any IS-A Animal.",
              why: "Inheritance lets a child sit where a parent was declared.",
            },
            {
              do: "arr[0] holds a plain Animal. arr[1] holds a Dog. Both assignments are legal.",
              why: "Dog IS-A Animal. The array does not need a Dog[] type.",
            },
            {
              do: "arr[0].kind() runs Animal.kind → A. arr[1].kind() runs Dog.kind → D.",
              why: "Override is runtime polymorphism on each slot’s real object.",
            },
            {
              do: "print AD. Engine[] could not hold a Car that only HAS-A Engine.",
              why: "HAS-A does not make Car an Engine, so it cannot sit in an Engine[] slot.",
            },
            {
              do: "Exam: a parent-typed collection is the usual IS-A picture, plus override on the way out.",
              why: "One array, two bodies, because of inheritance.",
            },
          ],
          result: "AD",
        },
        {
          title: "Downcast needs a real child object",
          prompt: "Which line compiles and runs?",
          language: "java",
          code: `Animal a1 = new Dog();
Animal a2 = new Animal();
Dog d1 = (Dog) a1;   // ok
// Dog d2 = (Dog) a2; // compiles, then ClassCastException
// Dog d3 = a1;       // compile error (needs a cast)`,
          steps: [
            {
              do: "Dog d3 = a1 does not compile. The variable type is Animal. Java will not silently downcast.",
              why: "Child variable ← parent variable needs an explicit cast.",
            },
            {
              do: "Dog d1 = (Dog) a1 compiles and runs: the object really is a Dog.",
              why: "The cast is legal when IS-A holds at run time.",
            },
            {
              do: "Dog d2 = (Dog) a2 compiles (the cast is written) but the object is Animal, not a Dog. ClassCastException.",
              why: "A cast is a run-time check, not a magic convertor.",
            },
            {
              do: "instanceof Dog is true for a1 and false for a2. Guard a downcast with instanceof.",
              why: "That is the safe exam pattern.",
            },
            {
              do: "HAS-A never gets you a legal cast: (Engine) car does not compile if Car does not extend Engine.",
              why: "Casts follow IS-A, not ‘has a field of that type’.",
            },
          ],
          result: "(Dog) a1 succeeds. (Dog) a2 throws. Dog d = a1 does not compile.",
        },
      ],
    },
    {
      heading: "Constructors and super() / this() first",
      body: "A constructor has the class name and no return type. It runs when you write new. In Java, if you write this(…) or super(…), that call must be the first statement. You cannot write both in the same constructor. You cannot put a print before super(). If you write neither, Java inserts super() with no arguments.\n\nthis(…) jumps to a sibling constructor in the same class. That sibling is responsible for calling super (or another this that eventually calls super). The parent is always built before the rest of the child body. Prints therefore go parent first, then child. If the parent has no no-arg constructor, a child that relies on inserted super() does not compile.",
      howTo: [
        "Find new Class(…). That constructor starts.",
        "If the first line is this(…), jump there. The rest of this body waits.",
        "If the first line is super(…) — or Java inserted super() — run the parent constructor first.",
        "You cannot write super and this in one constructor, and nothing may sit above them.",
        "Prints: parent body, then child body on the way back out.",
      ],
      bullets: [
        "this() or super() must be first. Never both in one constructor.",
        "If you write neither, Java inserts super().",
        "Parent constructor runs before child field inits and child body.",
        "No parent no-arg constructor + inserted super() = compile error.",
      ],
      examples: [
        {
          title: "Inserted super() — parent print then child print",
          prompt: "What is printed?",
          language: "java",
          code: `class Base {
  Base() { System.out.print("B"); }
}
class Child extends Base {
  Child() { System.out.print("C"); }
}
class Main {
  public static void main(String[] args) {
    new Child();
  }
}`,
          steps: [
            {
              do: "new Child() enters Child(). There is no this() or super(…) written.",
              why: "Java therefore inserts super() as the hidden first line.",
            },
            {
              do: "super() runs Base(). Base prints B. Buffer is B.",
              why: "The parent must exist before the child body runs.",
            },
            {
              do: "Base() returns. Child() body prints C. Buffer is BC.",
              why: "The rest of the child constructor waits until super returns.",
            },
            {
              do: "print BC. Not CB.",
              why: "A common trap is thinking the child’s first written line runs first. It does not.",
            },
            {
              do: "new Base() would print only B. The child constructor never runs for a Base object.",
              why: "You get the constructors of the class you constructed, plus its parents.",
            },
          ],
          result: "BC",
        },
        {
          title: "this() first, then super() in the sibling",
          prompt: "What is printed?",
          language: "java",
          code: `class Base {
  Base(int n) { System.out.print("B" + n); }
}
class Child extends Base {
  Child() {
    this(2);
    System.out.print("Z");
  }
  Child(int n) {
    super(n);
    System.out.print("C" + n);
  }
}
class Main {
  public static void main(String[] args) {
    new Child();
  }
}`,
          steps: [
            {
              do: "new Child() enters Child(). First line this(2). The print Z waits.",
              why: "this() must be first. The rest of this constructor runs after the sibling returns.",
            },
            {
              do: "Child(int n) with n=2. First line super(2).",
              why: "The sibling still has to build the parent. this() does not skip super.",
            },
            {
              do: "Base(2) prints B2. Buffer is B2.",
              why: "Parent body runs before any remaining child lines.",
            },
            {
              do: "Child(int) prints C2. Buffer is B2C2. Then Child() prints Z. Buffer is B2C2Z.",
              why: "Each constructor body runs on the way back out, after its this/super returns.",
            },
            {
              do: "print B2C2Z.",
              why: "Order: parent, then the constructor that called super, then the constructor that called this.",
            },
          ],
          result: "B2C2Z",
        },
        {
          title: "this() and super() in the same constructor — compile error",
          prompt: "Does this compile?",
          language: "java",
          code: `class Base {
  Base() { }
}
class Child extends Base {
  Child() {
    super();
    this(1);
  }
  Child(int n) { }
}`,
          steps: [
            {
              do: "Child() tries to call super() and this(1) in the same constructor.",
              why: "Java allows at most one of these, and it must be the first statement.",
            },
            {
              do: "Even swapping them (this then super) is illegal in one body.",
              why: "this() already jumps to a sibling that will call super. A second super would build the parent twice.",
            },
            {
              do: "A print before super() is also illegal: System.out.print(\"X\"); super(); does not compile.",
              why: "Nothing may sit above this() or super(). First means first.",
            },
            {
              do: "javac rejects Child(). There is no runtime output.",
              why: "Constructor chaining is checked before the program runs.",
            },
            {
              do: "Fix: keep only this(1); in Child(), and put super(); (or rely on inserted super()) in Child(int).",
              why: "One doorway per constructor: either a sibling or the parent.",
            },
          ],
          result: "compile error",
        },
        {
          title: "Inserted super() fails when the parent has no Base()",
          prompt: "Does this compile?",
          language: "java",
          code: `class Base {
  Base(int n) { System.out.print(n); }
}
class Child extends Base {
  Child() {
    System.out.print("C");
  }
}`,
          steps: [
            {
              do: "Child() does not call this or super, so Java inserts super().",
              why: "That inserted call has zero arguments.",
            },
            {
              do: "Base only declares Base(int). Writing that constructor removed the free Base().",
              why: "A class with any written constructor does not get a default no-arg constructor.",
            },
            {
              do: "Inserted super() has nothing to bind to. compile error.",
              why: "Java will not invent super(0) for you.",
            },
            {
              do: "Fix: Child() { super(1); System.out.print(\"C\"); } which would print 1C.",
              why: "The first statement must be a real parent constructor that exists.",
            },
            {
              do: "The print C never runs, because the class does not compile.",
              why: "Do not pick C or 1C as a runtime answer.",
            },
          ],
          result: "compile error",
        },
        {
          title: "this() chain of two siblings, then super",
          prompt: "What is printed?",
          language: "java",
          code: `class Base {
  Base() { System.out.print("B"); }
}
class Child extends Base {
  Child() { this(1); System.out.print("Z"); }
  Child(int n) { this(n, 2); System.out.print("Y"); }
  Child(int n, int m) { System.out.print("X" + n + m); }
}
class Main {
  public static void main(String[] args) {
    new Child();
  }
}`,
          steps: [
            {
              do: "new Child() → Child() → this(1) so Z waits. Then Child(int) → this(n,2) so Y waits.",
              why: "Each this() is first in its constructor. Bodies stack up to run later.",
            },
            {
              do: "Child(int,int) has no this() or super(…). Java inserts super(). Base() prints B.",
              why: "The last constructor in the this-chain is the one that actually builds the parent.",
            },
            {
              do: "Then Child(int,int) body prints X12 (n=1, m=2). Buffer is BX12.",
              why: "After super returns, that constructor’s own lines run.",
            },
            {
              do: "Then Child(int) prints Y. Then Child() prints Z. Buffer is BX12YZ.",
              why: "Unwind the this-chain in reverse: deepest body first after super, then each waiter.",
            },
            {
              do: "print BX12YZ.",
              why: "Parent once, then the three child bodies from the inside out.",
            },
          ],
          result: "BX12YZ",
        },
      ],
    },
  ],
};
