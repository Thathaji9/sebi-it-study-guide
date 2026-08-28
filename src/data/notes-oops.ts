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
      ],
    },
  ],
};
