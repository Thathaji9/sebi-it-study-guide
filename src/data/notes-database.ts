import type { TopicNote } from "@/data/notes";

export const notesDatabase: TopicNote = {
  topic: "database",
  title: "Database — simple notes",
  blurb:
    "We explain a database like class notes a Class-10 student can read: pictures of a bank, a school register, and a dictionary. Then we solve five tiny examples in each topic, one row or one number at a time.",
  blocks: [
    {
      heading: "What is a DBMS?",
      body: "A DBMS is a computer program that looks after a database the way a careful bank clerk looks after account files. You do not dump papers in a room. The clerk can start a new file (create), open one file and look (read), change a number on a page (update), or remove a closed file (delete). Those four jobs are the daily loop.\n\nThe same clerk keeps two promises. Integrity means the files stay consistent: two people cannot share one account number, and a balance cannot be a letter. Security means the ATM customer sees only their own page, while the manager may see more. A DBMS is that clerk, written as software.",
      howTo: [
        "Name the job: add a row, read a row, change a cell, or remove a row.",
        "Point at the one row you touch. Do not mix two jobs in one sentence.",
        "Ask integrity: would this break a unique number or a must-fill box?",
        "Ask security: is this user allowed to see or change this row?",
        "Write the table after the job. Count the rows again.",
      ],
      bullets: [
        "DBMS = software that stores and guards a database.",
        "Create = add. Read = look. Update = change. Delete = remove.",
        "Integrity = rules stay true (unique IDs, no empty primary key).",
        "Security = the right person sees the right rows.",
        "A database is the data. A DBMS is the program around it.",
      ],
      examples: [
        {
          title: "Create one new student",
          prompt:
            "STUDENT is (11, Anu), (12, Bala). Add (13, Chet). What job is that, and how many rows after?",
          code: "roll | name\n-----+------\n  11 | Anu\n  12 | Bala",
          steps: [
            {
              do: "Look at row 1: roll 11, name Anu. That row already exists.",
              why: "Create does not rewrite an old row. First see what is already there.",
            },
            {
              do: "Look at row 2: roll 12, name Bala. That row already exists too.",
              why: "Two rows now. Chet is not on the page yet.",
            },
            {
              do: "Write a brand-new row: roll 13, name Chet.",
              why: "Create means “add a file”, not “change a name”.",
            },
            {
              do: "Do not change Anu or Bala while you add Chet.",
              why: "If you rewrote Bala, that would be Update, a different job.",
            },
            {
              do: "Count rows: 11, 12, 13. That is three.",
              why: "Create raises the row count by one.",
            },
            {
              do: "Name the job: Create (insert).",
              why: "The exam word for “add a row” is Create.",
            },
          ],
          result: "Create. The table has three rows: Anu, Bala, Chet.",
        },
        {
          title: "Read one bank balance",
          prompt:
            "ACCOUNT is (A1, 300), (A2, 150), (A3, 90). Meera may see only A2. What does Read return for her?",
          code: "acc | rupees\n----+-------\n A1 |    300\n A2 |    150\n A3 |     90",
          steps: [
            {
              do: "Look at row A1: ₹300. Meera is not allowed this page.",
              why: "Security: a customer does not open every file in the vault.",
            },
            {
              do: "Look at row A2: ₹150. This is Meera’s account.",
              why: "Read means look, not change. The number stays 150.",
            },
            {
              do: "Look at row A3: ₹90. Skip it. Not her file.",
              why: "Read still respects security. The clerk does not hand over A3.",
            },
            {
              do: "Return only 150 for account A2.",
              why: "A Read answers “what is written here?”, one row.",
            },
            {
              do: "Do not write a new number. That would be Update.",
              why: "Looking is not changing.",
            },
            {
              do: "Row count is still three.",
              why: "Read never adds or removes a row.",
            },
          ],
          result: "Read returns ₹150 for A2. A1 and A3 stay hidden.",
        },
        {
          title: "Update one name",
          prompt:
            "STUDENT is (11, Anu), (12, Bala), (13, Chet). Change Bala to Bali. What job, and what does row 12 show?",
          code: "roll | name\n-----+------\n  11 | Anu\n  12 | Bala\n  13 | Chet",
          steps: [
            {
              do: "Look at row 11: Anu. Leave it.",
              why: "Update touches one cell, not the whole register.",
            },
            {
              do: "Look at row 12: the name is Bala. This is the cell to change.",
              why: "You found the one row whose roll is 12.",
            },
            {
              do: "Write Bali in place of Bala. Roll stays 12.",
              why: "Update changes a value. It does not invent a new roll number.",
            },
            {
              do: "Look at row 13: Chet. Leave it.",
              why: "Chet was not named in the question.",
            },
            {
              do: "Count rows: still three.",
              why: "Update does not add a row. Create would have made a fourth.",
            },
            {
              do: "Name the job: Update.",
              why: "Same file, new spelling on the page.",
            },
          ],
          result: "Update. Row 12 is now (12, Bali). Still three rows.",
        },
        {
          title: "Delete a closed account",
          prompt:
            "ACCOUNT is (A1, 300), (A2, 0), (A3, 90). Close A2 and remove it. How many rows remain?",
          code: "acc | rupees\n----+-------\n A1 |    300\n A2 |      0\n A3 |     90",
          steps: [
            {
              do: "Look at A1: ₹300. Keep this row.",
              why: "Delete names one file. A1 is still open.",
            },
            {
              do: "Look at A2: ₹0. This is the closed account.",
              why: "The question says remove A2, not change its balance.",
            },
            {
              do: "Remove the A2 row from the table.",
              why: "Delete means the file is gone, not just set to zero.",
            },
            {
              do: "Look at A3: ₹90. Keep this row.",
              why: "A3 was not closed.",
            },
            {
              do: "Count rows: A1 and A3. That is two.",
              why: "Delete lowers the row count by one.",
            },
            {
              do: "Name the job: Delete.",
              why: "If you only wrote 0 on A2 and kept the row, that would be Update.",
            },
          ],
          result: "Delete. Two rows left: (A1, 300) and (A3, 90).",
        },
        {
          title: "Integrity then security",
          prompt:
            "STUDENT already has roll 11 Anu. (i) Insert another roll 11 Ria. (ii) Let a student read every phone number in the school. Which promise breaks in each case?",
          code: "roll | name | phone\n-----+------+-------\n  11 | Anu  | 98001",
          steps: [
            {
              do: "Look at the only row: roll 11 is already Anu.",
              why: "A roll number is an ID. IDs must not repeat.",
            },
            {
              do: "(i) A second row with roll 11 Ria would make two people share one ID.",
              why: "Integrity forbids two files with the same official number.",
            },
            {
              do: "The DBMS should reject that insert.",
              why: "Integrity is a rule the program enforces, not a wish.",
            },
            {
              do: "(ii) A student who can Read every phone is looking at other people’s files.",
              why: "Security is “who may see this row?”, not “is the number unique?”.",
            },
            {
              do: "The unique-roll rule can still be true while privacy is broken.",
              why: "Integrity and security are two different promises.",
            },
            {
              do: "Fix (i) with a unique primary key. Fix (ii) with logins and views.",
              why: "Keys guard integrity. Permissions guard security.",
            },
          ],
          result: "(i) Integrity breaks. (ii) Security breaks. Different promises.",
        },
      ],
    },
    {
      heading: "Three levels of a database",
      body: "A database has three levels, like one bank building with a basement, a main office, and different counters. The internal level is the basement: bytes, files, and disk blocks. The conceptual level is the main office: the one full set of tables everyone agrees on. The external level is the counters: each kind of user sees a different view of the same facts.\n\nPicture an ATM, a branch clerk, and a manager. The ATM shows only your balance and a withdraw button. The clerk sees your name, PAN, and last five deposits. The manager sees a report of all accounts in the branch. All three look at the same basement of bytes. Only the view changes.",
      howTo: [
        "Name the level: disk/bytes = internal, tables = conceptual, one user’s screen = external.",
        "Ask who is looking: ATM, clerk, or manager. That picks the external view.",
        "If only the file layout on disk changes, the tables can stay. That is physical independence.",
        "If a table gains a column the ATM does not need, the ATM view can stay. That is logical independence.",
        "Never say the ATM “has its own database”. It has its own view.",
      ],
      bullets: [
        "Internal = how bytes sit on disk.",
        "Conceptual = the one full table design.",
        "External = different user views.",
        "ATM ≠ clerk ≠ manager, same bank data.",
        "Physical independence: change disk, keep tables.",
        "Logical independence: change tables, keep old views where possible.",
      ],
      examples: [
        {
          title: "Name the three people",
          prompt:
            "Same bank data. ATM shows A2 balance 150. Clerk sees A2 name Meera and PAN. Manager sees a sum of all accounts 540. Which level is each screen?",
          code: "acc | name  | pan      | rupees\n----+-------+----------+-------\n A1 | Anu   | AAAAA1111|    300\n A2 | Meera | BBBBB2222|    150\n A3 | Chet  | CCCCC3333|     90",
          steps: [
            {
              do: "ATM screen: only A2 and 150. That is one user’s cut of the data.",
              why: "External level = a view. The ATM is a counter, not the whole office.",
            },
            {
              do: "Clerk screen: Meera plus PAN plus 150. Still one user’s cut, just a wider one.",
              why: "Another external view of the same conceptual table.",
            },
            {
              do: "Manager screen: 300+150+90 = 540. A report, still a view.",
              why: "The manager does not get a second basement. The same rows are summed.",
            },
            {
              do: "The one table with acc, name, pan, rupees is the conceptual level.",
              why: "Conceptual = the agreed full picture, not one person’s window.",
            },
            {
              do: "How those four columns sit in disk blocks is the internal level.",
              why: "Internal is bytes. Users never draw the basement.",
            },
            {
              do: "Write: three external views, one conceptual table, one internal store.",
              why: "Three people, one bank, three levels.",
            },
          ],
          result: "ATM, clerk, manager = three external views. The full table is conceptual. Disk is internal.",
        },
        {
          title: "Internal means disk",
          prompt:
            "The DBA moves account rows from one big file to three disk blocks, still the same numbers. Does the ATM screen change? Which level changed?",
          code: "block 1: A1 300\nblock 2: A2 150\nblock 3: A3  90",
          steps: [
            {
              do: "Old picture: all three rows in one file. New picture: three blocks.",
              why: "That is a storage story. Storage is the internal level.",
            },
            {
              do: "A1 is still 300. A2 is still 150. A3 is still 90.",
              why: "The facts did not change. Only the basement shelves moved.",
            },
            {
              do: "The conceptual table is still ACCOUNT(acc, rupees).",
              why: "Tables did not gain or lose a column.",
            },
            {
              do: "The ATM still shows A2 = 150.",
              why: "External views read the conceptual facts, not block numbers.",
            },
            {
              do: "Name the change: internal only.",
              why: "Physical data independence: disk layout can change under the tables.",
            },
            {
              do: "Do not call this a new database.",
              why: "Same bank, new filing of the same pages.",
            },
          ],
          result: "Internal level changed. ATM still shows 150. Physical independence.",
        },
        {
          title: "Conceptual is the table list",
          prompt:
            "The bank agrees on two tables: ACCOUNT(acc, rupees) and CUSTOMER(acc, name, pan). Is that internal, conceptual, or external?",
          code: "ACCOUNT(acc, rupees)\nCUSTOMER(acc, name, pan)",
          steps: [
            {
              do: "Read ACCOUNT: one row per account number and balance.",
              why: "This is a table heading, not a disk block map.",
            },
            {
              do: "Read CUSTOMER: one row per name and PAN, tied to acc.",
              why: "Again a table heading. The whole office agrees on it.",
            },
            {
              do: "This pair of headings is the conceptual schema.",
              why: "Conceptual = the one full design of tables.",
            },
            {
              do: "It is not internal: no bytes, no block numbers.",
              why: "Internal would say “hash file on cylinder 4”.",
            },
            {
              do: "It is not one external view: both tables together are the full picture.",
              why: "An ATM view would hide PAN and maybe hide ACCOUNT rows that are not yours.",
            },
            {
              do: "Tick conceptual.",
              why: "Exam word for “the tables of the whole database”.",
            },
          ],
          result: "Conceptual level. Two agreed tables, not a disk map and not one user’s screen.",
        },
        {
          title: "ATM view hides PAN",
          prompt:
            "Full table CUSTOMER(acc, name, pan, rupees). ATM view is (acc, rupees) for the logged-in acc only. Row A2 is Meera, PAN BBBBB2222, ₹150. What does the ATM show?",
          code: "acc | name  | pan       | rupees\n----+-------+-----------+-------\n A2 | Meera | BBBBB2222 |    150",
          steps: [
            {
              do: "Look at the full row: four facts about A2.",
              why: "Conceptual row = every agreed column.",
            },
            {
              do: "ATM view keeps acc and rupees.",
              why: "External view = a chosen subset of columns.",
            },
            {
              do: "Drop name Meera from the ATM screen.",
              why: "The ATM job does not need the name on this paper.",
            },
            {
              do: "Drop PAN BBBBB2222 from the ATM screen.",
              why: "Security: PAN is not for the street machine.",
            },
            {
              do: "Keep 150 next to A2.",
              why: "That is the one number the customer came for.",
            },
            {
              do: "Label: external view of one conceptual row.",
              why: "Same basement, smaller window.",
            },
          ],
          result: "ATM shows (A2, 150) only. Name and PAN stay in the conceptual table.",
        },
        {
          title: "Add a column, ATM stays",
          prompt:
            "Clerk asks to store email on CUSTOMER. ATM still shows only (acc, rupees). Which level grows, and does the ATM program have to change?",
          code: "before: CUSTOMER(acc, name, pan, rupees)\nafter:  CUSTOMER(acc, name, pan, rupees, email)",
          steps: [
            {
              do: "The table heading gains email. That is a conceptual change.",
              why: "A new agreed column is a change to the full design.",
            },
            {
              do: "Internal storage must find a place for the extra bytes.",
              why: "Disk follows the tables, but the exam name for “new column” is still conceptual.",
            },
            {
              do: "ATM view still lists only acc and rupees.",
              why: "The external view did not ask for email.",
            },
            {
              do: "ATM program can keep working without a rewrite.",
              why: "Logical data independence: old views survive some table changes.",
            },
            {
              do: "The clerk’s view may now show email.",
              why: "A different external view can grow. The ATM view need not.",
            },
            {
              do: "Do not say “we built a second database for email”.",
              why: "One conceptual table, extra column, old ATM window kept.",
            },
          ],
          result: "Conceptual table grows by email. ATM view can stay. Logical independence.",
        },
      ],
    },
    {
      heading: "ER diagram pieces",
      body: "An ER diagram is a picture of things and links, like a school map drawn with four stamps. A rectangle is an entity: a real thing we store, such as a Student. An oval is an attribute: a fact on that thing, such as Roll_no. A diamond is a relationship: a link, such as Enrols. A double rectangle is a weak entity: a thing with no ID of its own, such as a Locker that only makes sense inside one school.\n\nA strong entity can stand alone, like a student with a roll number. A weak entity borrows the owner’s key and adds a small local name, like “School A, Locker 12”. Two schools may both have a Locker 12. The double box is the exam picture of that dependent thing.",
      howTo: [
        "Circle people, places, and objects → rectangles (entities).",
        "Circle facts on one thing (name, date) → ovals (attributes).",
        "Circle verbs between things (enrols, owns) → diamonds (relationships).",
        "Ask: does this thing have its own ID? If no, draw a double rectangle.",
        "Write the weak key as owner key + partial key.",
      ],
      bullets: [
        "Rectangle = entity (Student, Account).",
        "Oval = attribute (Roll_no, Balance).",
        "Diamond = relationship (Enrols, Holds).",
        "Double rectangle = weak entity (Locker, Dependent).",
        "Strong = own ID. Weak = owner’s ID + a local name.",
      ],
      examples: [
        {
          title: "Stamp a rectangle for Student",
          prompt:
            "We store Anu, Bala, and Chet as people in a school register. What ER stamp is Student? Sketch: [ Student ].",
          code: "+-----------+\n|  Student  |   ← rectangle\n+-----------+",
          steps: [
            {
              do: "Anu is a person we store. Bala is a person we store. Chet is a person we store.",
              why: "An entity is a real thing with rows, not a single number.",
            },
            {
              do: "The type of those people is Student.",
              why: "The rectangle names the kind of thing, not one row.",
            },
            {
              do: "Draw a rectangle labelled Student.",
              why: "Exam stamp for an entity is a box.",
            },
            {
              do: "Do not draw a diamond for Student.",
              why: "A diamond is a link between things, not the thing itself.",
            },
            {
              do: "Do not draw a double box yet. Student has its own roll number.",
              why: "Own ID → strong entity → single rectangle.",
            },
            {
              do: "Write: Student is an entity.",
              why: "One stamp, one meaning.",
            },
          ],
          result: "Student is a rectangle (strong entity).",
        },
        {
          title: "Stamp an oval for Roll_no",
          prompt:
            "Each student has a roll number: Anu 11, Bala 12, Chet 13. What stamp is Roll_no? Sketch an oval on the Student box.",
          code: "  (Roll_no)\n      |\n+-----------+\n|  Student  |\n+-----------+",
          steps: [
            {
              do: "Look at Anu: her roll is 11. That is a fact on Anu.",
              why: "An attribute lives on one entity, like a label on a file.",
            },
            {
              do: "Look at Bala: roll 12. Same kind of fact, different value.",
              why: "The oval names the kind of fact. The number is the value.",
            },
            {
              do: "Look at Chet: roll 13. Still the same attribute.",
              why: "Three values, one oval.",
            },
            {
              do: "Draw an oval Roll_no linked to Student.",
              why: "Exam stamp for an attribute is an oval.",
            },
            {
              do: "Do not make Roll_no a second rectangle.",
              why: "A roll number is not a separate person. It is a fact on the person.",
            },
            {
              do: "Underline Roll_no if it is the key.",
              why: "A key attribute is often drawn underlined in the oval.",
            },
          ],
          result: "Roll_no is an oval on Student (key attribute).",
        },
        {
          title: "Stamp a diamond for Enrols",
          prompt:
            "Anu enrols in Maths. Bala enrols in Maths. Chet enrols in Hindi. What stamp is Enrols between Student and Course?",
          code: "[Student] ----< Enrols >---- [Course]\n rectangle      diamond        rectangle",
          steps: [
            {
              do: "Student is a thing. Course is a thing. Two rectangles.",
              why: "Entities first. The link comes after.",
            },
            {
              do: "“Enrols” is the verb between them, not a third person.",
              why: "A relationship is a link, like a handshake.",
            },
            {
              do: "Draw a diamond Enrols between the two boxes.",
              why: "Exam stamp for a relationship is a diamond.",
            },
            {
              do: "Anu–Maths is one handshake. Bala–Maths is another. Chet–Hindi is a third.",
              why: "Each pair is one relationship instance.",
            },
            {
              do: "Do not draw Enrols as a rectangle unless the exam promotes it to an associative entity.",
              why: "The basic stamp is a diamond.",
            },
            {
              do: "Write: Enrols is a relationship.",
              why: "Verb between two nouns.",
            },
          ],
          result: "Enrols is a diamond between Student and Course.",
        },
        {
          title: "Double rectangle for a dependent",
          prompt:
            "EMPLOYEE has emp_id. A child is stored only as (emp_id, child_name). Two employees may both have a child “Ria”. What stamp is Child?",
          code: "[EMPLOYEE] ====< has >==== [[ Child ]]\n  strong     identifying      weak (double box)",
          steps: [
            {
              do: "Employee has emp_id. That person can stand alone. Single rectangle.",
              why: "Own ID → strong entity.",
            },
            {
              do: "Child “Ria” is not unique in the whole company.",
              why: "Two families can both name a child Ria.",
            },
            {
              do: "The child’s full name in the database is emp_id plus child_name.",
              why: "A weak entity borrows the owner’s key.",
            },
            {
              do: "Draw Child as a double rectangle.",
              why: "Exam stamp for a weak entity is a double box.",
            },
            {
              do: "The link “has” is identifying: often a double diamond.",
              why: "The child cannot be identified without the parent.",
            },
            {
              do: "child_name is a partial key (often a dashed underline).",
              why: "Partial key = unique only inside one owner.",
            },
          ],
          result: "Child is a double rectangle (weak). Key = (emp_id, child_name).",
        },
        {
          title: "Strong student, weak locker",
          prompt:
            "School has school_id. Locker has only locker_no 12. Two schools both have locker 12. Student has roll 11. Classify School, Student, Locker.",
          code: "[School] --owns-- [[ Locker ]]     [Student]\n  strong              weak            strong",
          steps: [
            {
              do: "School has school_id. Strong. Single rectangle.",
              why: "The school can be named without pointing at a locker.",
            },
            {
              do: "Student has roll 11. Strong. Single rectangle.",
              why: "A roll number is a global ID in this register.",
            },
            {
              do: "Locker 12 in School A and locker 12 in School B are different lockers.",
              why: "locker_no alone does not pick one locker in the world.",
            },
            {
              do: "Locker is weak. Double rectangle. Key = (school_id, locker_no).",
              why: "Owner key + local number.",
            },
            {
              do: "Do not mark Student weak. Roll 11 already names the person.",
              why: "Weak is “no ID of its own”, not “small object”.",
            },
            {
              do: "Do not mark School weak. It owns the locker; it is not owned.",
              why: "The owner is strong. The dependent is weak.",
            },
          ],
          result: "School strong, Student strong, Locker weak with key (school_id, locker_no).",
        },
      ],
    },
    {
      heading: "Kinds of attributes",
      body: "An attribute is a fact on an entity, like a field on a student form. A simple attribute is one box you cannot split, such as Roll_no. If that simple fact is the ID, it is a key attribute (often underlined). A composite attribute is a group of boxes under one name, such as Name split into First and Last.\n\nA multivalued attribute is a fact that can have several values at once, such as Phone: 98001 and 98002. We draw it as a double oval. A derived attribute is a fact we can compute from another, such as Age from Date_of_birth. We draw it as a dashed oval. We store the date; we calculate the age.",
      howTo: [
        "Ask: is this one box or a group? Group → composite (Name = First + Last).",
        "Ask: can this fact have many values at once? Yes → double oval (Phone).",
        "Ask: do we store it or compute it? Compute → dashed oval (Age from DOB).",
        "Ask: does this fact unique-name the row? Yes → key (underline).",
        "Draw one student and hang every oval on that rectangle.",
      ],
      bullets: [
        "Simple / key: one box. Key is underlined (Roll_no).",
        "Composite: Name → First, Last.",
        "Multivalued: double oval (Phone).",
        "Derived: dashed oval (Age from DOB).",
        "Store DOB, do not store Age, unless the paper says to.",
      ],
      examples: [
        {
          title: "Roll_no is a simple key",
          prompt:
            "Anu 11, Bala 12, Chet 13. Each has one roll. Classify Roll_no and sketch the oval.",
          code: "  (Roll_no)   ← single oval, underlined\n      |\n [ Student ]",
          steps: [
            {
              do: "Look at Anu: one number 11. You cannot split 11 into smaller student facts.",
              why: "Simple means atomic: one box.",
            },
            {
              do: "Look at Bala: one number 12. Same shape.",
              why: "Still one value per student.",
            },
            {
              do: "Look at Chet: 13. Still one value.",
              why: "No list inside the box.",
            },
            {
              do: "11, 12, 13 are all different. Roll_no names the row.",
              why: "A key attribute uniquely identifies the entity.",
            },
            {
              do: "Draw a single oval, underline Roll_no.",
              why: "Key = underlined oval, not a double oval.",
            },
            {
              do: "Do not mark it derived. Nobody computes 11 from another column here.",
              why: "The school assigns the roll. It is stored.",
            },
          ],
          result: "Roll_no is a simple key attribute (single underlined oval).",
        },
        {
          title: "Name splits into First and Last",
          prompt:
            "The form says Name, but the values are Anu Shah, Bala Rao, Chet Iyer. Classify Name.",
          code: "        (Name)\n        /    \\\n  (First)    (Last)\n Anu          Shah",
          steps: [
            {
              do: "Look at Anu Shah. First = Anu. Last = Shah. Two boxes under one heading.",
              why: "Composite means a group with named parts.",
            },
            {
              do: "Look at Bala Rao. First = Bala. Last = Rao.",
              why: "Same composite, next row.",
            },
            {
              do: "Look at Chet Iyer. First = Chet. Last = Iyer.",
              why: "Walk one row at a time. Each name still has two parts.",
            },
            {
              do: "Draw oval Name with two child ovals First and Last.",
              why: "Exam picture of composite is an oval that branches.",
            },
            {
              do: "Do not call Name multivalued. Anu does not have two full names at once.",
              why: "Composite = parts of one value. Multivalued = many values.",
            },
            {
              do: "First and Last themselves are simple.",
              why: "The leaves of the composite are simple attributes.",
            },
          ],
          result: "Name is composite: First + Last. Not multivalued.",
        },
        {
          title: "Two phones, double oval",
          prompt:
            "Anu’s phones are 98001 and 98002. Bala has only 77001. Classify Phone.",
          code: "  (( Phone ))   ← double oval\n       |\n  [ Student ]\n\nAnu: 98001, 98002\nBala: 77001",
          steps: [
            {
              do: "Look at Anu: two numbers in the same kind of fact, Phone.",
              why: "Multivalued = several values at the same time.",
            },
            {
              do: "Look at Bala: one number. A multivalued attribute may still hold one value.",
              why: "“Can have many” is the test, not “must have many”.",
            },
            {
              do: "Draw a double oval for Phone.",
              why: "Exam stamp for multivalued is a double oval.",
            },
            {
              do: "Do not put both numbers in one simple cell if you are designing tables later.",
              why: "A list in one cell will break 1NF. That is a later block.",
            },
            {
              do: "Do not call Phone composite. 98001 is not “first + last”.",
              why: "Composite splits one value. Multivalued repeats one kind of value.",
            },
            {
              do: "Do not underline Phone. Two students might share a number later, and Anu has two.",
              why: "A key is one unique ID, not a bag of phones.",
            },
          ],
          result: "Phone is multivalued (double oval). Anu has two values; Bala has one.",
        },
        {
          title: "Age is dashed, DOB is stored",
          prompt:
            "Anu’s date of birth is 2012-04-01. Today the office prints Age 14. Classify DOB and Age.",
          code: "  (DOB)     ( Age )   ← Age dashed oval\n    |         :\n [ Student ]",
          steps: [
            {
              do: "Look at DOB 2012-04-01. That date is written on the form and stored.",
              why: "Stored facts are solid ovals.",
            },
            {
              do: "Age 14 is 2026 minus 2012, using the birthday.",
              why: "Derived means we can compute it from another stored fact.",
            },
            {
              do: "Draw Age as a dashed oval hanging on Student.",
              why: "Exam stamp for derived is a dashed oval.",
            },
            {
              do: "Draw DOB as a normal oval.",
              why: "We store the date so Age can be recomputed next year.",
            },
            {
              do: "Do not store Age as the only birth fact. Next year 14 would be wrong.",
              why: "Derived values go stale. The source date does not.",
            },
            {
              do: "Do not call Age multivalued. A person has one age at a time.",
              why: "Dashed ≠ double. Different stamps.",
            },
          ],
          result: "DOB is stored (solid oval). Age is derived (dashed oval).",
        },
        {
          title: "Hang four ovals on one Student",
          prompt:
            "Student Anu: roll 11, name Anu Shah, phones 98001 and 98002, DOB 2012-04-01 (age printed 14). Label each attribute kind.",
          code: "           (Roll_no)\n               |\n (First)-(Name)-(Last)     ((Phone))\n               |               |\n          [ Student ]----------+\n               :\n            (Age)     (DOB)",
          steps: [
            {
              do: "Roll 11: one ID. Simple key. Underline.",
              why: "One box, unique.",
            },
            {
              do: "Name Anu Shah: First Anu, Last Shah. Composite.",
              why: "One name, two parts.",
            },
            {
              do: "Phones 98001 and 98002. Multivalued. Double oval.",
              why: "Two values of the same fact.",
            },
            {
              do: "DOB 2012-04-01 stored. Solid oval.",
              why: "Source fact.",
            },
            {
              do: "Age 14 computed. Dashed oval.",
              why: "Derived from DOB.",
            },
            {
              do: "All hang on one Student rectangle.",
              why: "Attributes belong to an entity, not to a diamond unless the paper says so.",
            },
          ],
          result: "Key Roll_no, composite Name, multivalued Phone, stored DOB, derived Age.",
        },
      ],
    },
    {
      heading: "Relationships 1:1, 1:N, M:N",
      body: "A relationship says how many of one thing match how many of another, like seats and bags in a school story. 1:1 means one to one: each student has one locker, each locker has one student. 1:N means one to many: one city has many brokers, each broker has one city. M:N means many to many: one student takes many courses, one course has many students.\n\nThen we map the picture to tables. 1:1 can put a unique foreign key on either side. 1:N puts the foreign key on the many side (the broker stores city_id). M:N needs a third table, a sign-up sheet with both keys, like ENROL(student_id, course_id).",
      howTo: [
        "Read the English: “one … many …” not the table you wish you had.",
        "1:1 → unique FK on one side (or merge if both must exist).",
        "1:N → FK column on the N side.",
        "M:N → third table whose key is both IDs.",
        "Walk one pair: Anu–Locker 12, or Anu–Maths, then the next pair.",
      ],
      bullets: [
        "1:1 student ↔ locker (one each).",
        "1:N city → brokers (FK on broker).",
        "M:N student ↔ course (third table).",
        "Never put many IDs in one cell.",
        "The “many” side holds the foreign key.",
      ],
      examples: [
        {
          title: "One student, one locker",
          prompt:
            "Anu has locker 12. Bala has locker 13. Chet has locker 14. No locker is shared. Name the cardinality.",
          code: "student | locker\n--------+-------\n Anu    |    12\n Bala   |    13\n Chet   |    14",
          steps: [
            {
              do: "Look at Anu: exactly one locker, 12.",
              why: "From student to locker the count is one.",
            },
            {
              do: "Look at locker 12: exactly one student, Anu.",
              why: "From locker to student the count is also one.",
            },
            {
              do: "Look at Bala: locker 13 only. Locker 13: Bala only.",
              why: "Walk the next row. Same 1 and 1.",
            },
            {
              do: "Look at Chet: locker 14 only. Locker 14: Chet only.",
              why: "Still no sharing.",
            },
            {
              do: "Name it 1:1.",
              why: "One to one on both sides.",
            },
            {
              do: "Map: STUDENT(roll, locker_no UNIQUE) or LOCKER(locker_no, roll UNIQUE).",
              why: "A 1:1 foreign key must stay unique so two students cannot share.",
            },
          ],
          result: "1:1. Unique locker_no on STUDENT (or unique roll on LOCKER).",
        },
        {
          title: "One city, many brokers",
          prompt:
            "Pune has brokers B1 and B2. Mumbai has broker B3. Each broker has one HQ city. Name the cardinality.",
          code: "broker | city\n-------+--------\n B1    | Pune\n B2    | Pune\n B3    | Mumbai",
          steps: [
            {
              do: "Look at B1: one city, Pune.",
              why: "Each broker points to one city.",
            },
            {
              do: "Look at B2: one city, Pune. Same city as B1.",
              why: "A city may hold many brokers.",
            },
            {
              do: "Look at B3: one city, Mumbai.",
              why: "Still one city per broker.",
            },
            {
              do: "Look at Pune: two brokers, B1 and B2. Look at Mumbai: one broker, B3.",
              why: "One to many from city to broker.",
            },
            {
              do: "Name it 1:N (city : broker).",
              why: "One city, N brokers. Each broker has 1 city.",
            },
            {
              do: "Do not call it M:N. One broker does not sit in two HQ cities here.",
              why: "M:N would need a broker in two cities at once.",
            },
          ],
          result: "1:N from city to broker. Each broker has one city.",
        },
        {
          title: "Many students, many courses",
          prompt:
            "Anu takes Maths and Hindi. Bala takes Maths. Chet takes Hindi. Maths has Anu and Bala. Name the cardinality.",
          code: "student | course\n--------+-------\n Anu    | Maths\n Anu    | Hindi\n Bala   | Maths\n Chet   | Hindi",
          steps: [
            {
              do: "Look at Anu: two courses, Maths and Hindi.",
              why: "From student to course the count can be many.",
            },
            {
              do: "Look at Bala: one course, Maths. Still allowed.",
              why: "Many-to-many allows one as a special case of many.",
            },
            {
              do: "Look at Chet: one course, Hindi.",
              why: "Walk every student before you name the shape.",
            },
            {
              do: "Look at Maths: Anu and Bala. Two students.",
              why: "From course to student the count is also many.",
            },
            {
              do: "Look at Hindi: Anu and Chet. Two students.",
              why: "Both sides are many.",
            },
            {
              do: "Name it M:N.",
              why: "Students share courses; courses share students.",
            },
          ],
          result: "M:N between Student and Course.",
        },
        {
          title: "Put the city key on the broker",
          prompt:
            "CITY(city_id, city_name). BROKER needs a headquarters. Rows: B1 Pune, B2 Pune, B3 Mumbai. Where does the foreign key go?",
          code: "CITY\ncity_id | city_name\n--------+----------\n PUNE   | Pune\n MUM    | Mumbai\n\nBROKER\nbroker | city_id\n-------+--------\n B1    | PUNE\n B2    | PUNE\n B3    | MUM",
          steps: [
            {
              do: "This is 1:N: one city, many brokers.",
              why: "The many side holds the pointer.",
            },
            {
              do: "Look at B1: store city_id PUNE on the B1 row.",
              why: "B1 has room for one city number.",
            },
            {
              do: "Look at B2: store city_id PUNE on the B2 row.",
              why: "Two brokers may copy the same city_id. That is the “many”.",
            },
            {
              do: "Look at B3: store city_id MUM.",
              why: "Still one extra column, not a list.",
            },
            {
              do: "Do not put broker_id on CITY as a single cell of B1,B2.",
              why: "A list in CITY would break 1NF and freeze how many brokers fit.",
            },
            {
              do: "CITY stays two rows. BROKER stays three rows with a city_id column.",
              why: "1:N map = FK on the N-side table.",
            },
          ],
          result: "FK city_id sits on BROKER. CITY has no broker list.",
        },
        {
          title: "M:N needs a third table",
          prompt:
            "Anu-Maths, Anu-Hindi, Bala-Maths. Map to tables. Where does grade B+ for Anu in Maths live?",
          code: "STUDENT(roll, name)\nCOURSE(cid, title)\nENROL(roll, cid, grade)\n\nENROL rows:\nroll | cid   | grade\n-----+-------+------\n  11 | MATH  | B+\n  11 | HIN   | A\n  12 | MATH  | A",
          steps: [
            {
              do: "Keep STUDENT as one table of people. Keep COURSE as one table of subjects.",
              why: "Each already has its own ID.",
            },
            {
              do: "Look at the pair Anu–Maths. That pair is one row in ENROL.",
              why: "M:N is a sign-up sheet: one row per handshake.",
            },
            {
              do: "Grade B+ belongs to that pair, so it sits on the ENROL row (11, MATH, B+).",
              why: "A fact about the link is not a fact about the student alone.",
            },
            {
              do: "Look at Anu–Hindi: second ENROL row, grade A.",
              why: "Same student, different pair, different grade.",
            },
            {
              do: "Look at Bala–Maths: third ENROL row.",
              why: "Walk each pair. Do not stuff courses into a list on STUDENT.",
            },
            {
              do: "Primary key of ENROL is (roll, cid).",
              why: "The pair is the ID of the handshake.",
            },
          ],
          result: "Three tables. Grade lives on ENROL(roll, cid, grade).",
        },
      ],
    },
    {
      heading: "Relational model words",
      body: "The relational model stores facts in tables, like a school register ruled into boxes. A table is also called a relation. One row is a tuple: one student’s full line. One column is an attribute: the heading Roll or Name. The schema is the heading plus the table name: STUDENT(roll, name, phone) — the empty form before you write names.\n\nDegree is how many columns. Cardinality is how many rows. NULL is an empty box meaning “unknown or not applicable”, not the number 0 and not the word none unless you wrote none. Walk one cell: if the phone box is blank, that is NULL.",
      howTo: [
        "Point: table = whole grid, row = one line, column = one heading.",
        "Copy the heading: that string is the schema.",
        "Count columns → degree. Count rows → cardinality.",
        "A blank cell is NULL. Do not add it as 0.",
        "After an insert or delete, recount cardinality. Degree stays unless you add a column.",
      ],
      bullets: [
        "Relation = table. Tuple = row. Attribute = column.",
        "Schema = table name + headings.",
        "Degree = # columns. Cardinality = # rows.",
        "NULL = empty / unknown, not 0.",
        "One cell holds one value (or NULL).",
      ],
      examples: [
        {
          title: "Name table, row, column",
          prompt:
            "Grid: (11, Anu, 98001), (12, Bala, 77001). Point at the table, at Bala’s row, at the name column.",
          code: "STUDENT\nroll | name | phone\n-----+------+-------\n  11 | Anu  | 98001\n  12 | Bala | 77001",
          steps: [
            {
              do: "The whole grid named STUDENT is the table (relation).",
              why: "Relation is the exam word for this grid.",
            },
            {
              do: "Look at line (12, Bala, 77001). That whole line is one tuple.",
              why: "A tuple is one row, all columns together.",
            },
            {
              do: "Look at Anu’s line (11, Anu, 98001). That is a second tuple.",
              why: "Two rows, two tuples.",
            },
            {
              do: "The heading name is one attribute (column).",
              why: "Attribute = column heading, not one cell.",
            },
            {
              do: "The cell “Bala” is a value of attribute name in Bala’s tuple.",
              why: "Value sits at the crossing of row and column.",
            },
            {
              do: "Say the three words: relation STUDENT, tuple (12, Bala, 77001), attribute name.",
              why: "Match picture to vocabulary.",
            },
          ],
          result: "Table = STUDENT. Bala’s row is a tuple. name is an attribute.",
        },
        {
          title: "Degree is three",
          prompt:
            "STUDENT(roll, name, phone) with two data rows. What is the degree? What if we add column city?",
          code: "roll | name | phone\n-----+------+-------\n  11 | Anu  | 98001\n  12 | Bala | 77001",
          steps: [
            {
              do: "Count headings: roll, name, phone. That is 1, 2, 3.",
              why: "Degree counts columns, not rows.",
            },
            {
              do: "Degree = 3.",
              why: "Three attributes.",
            },
            {
              do: "Do not answer 2. Two is the number of rows.",
              why: "Rows are cardinality, next word.",
            },
            {
              do: "Add heading city. Count again: roll, name, phone, city.",
              why: "A new column raises degree by one.",
            },
            {
              do: "New degree = 4.",
              why: "Walk the headings, not the data values.",
            },
            {
              do: "The two people are still two rows until we insert.",
              why: "Degree change is a schema change, not an insert.",
            },
          ],
          result: "Degree is 3. After city, degree is 4.",
        },
        {
          title: "Cardinality grows by one insert",
          prompt:
            "Two rows Anu and Bala. Insert Chet (13, Chet, 66001). Cardinality before and after?",
          code: "before: 2 rows\nroll | name | phone\n-----+------+-------\n  11 | Anu  | 98001\n  12 | Bala | 77001",
          steps: [
            {
              do: "Count current rows: Anu, Bala. Cardinality = 2.",
              why: "Cardinality = how many tuples now.",
            },
            {
              do: "Degree is still 3 (roll, name, phone).",
              why: "Insert does not add a heading.",
            },
            {
              do: "Insert one tuple (13, Chet, 66001).",
              why: "Create adds one row.",
            },
            {
              do: "Count rows: Anu, Bala, Chet. Cardinality = 3.",
              why: "Each insert raises cardinality by one.",
            },
            {
              do: "Delete Bala. Count: Anu, Chet. Cardinality = 2 again.",
              why: "Delete lowers cardinality by one.",
            },
            {
              do: "Write both numbers when asked before/after.",
              why: "Cardinality is a count of the instance, not of the schema.",
            },
          ],
          result: "Cardinality 2, then 3 after Chet. Degree stays 3.",
        },
        {
          title: "Schema versus the filled page",
          prompt:
            "Heading STUDENT(roll, name, phone) is printed blank, then the clerk writes two rows. What is schema? What is instance?",
          code: "schema:  STUDENT(roll, name, phone)\ninstance:\n  11 | Anu  | 98001\n  12 | Bala | 77001",
          steps: [
            {
              do: "Read the blank form: table name plus three headings.",
              why: "Schema is the design, like an empty register ruling.",
            },
            {
              do: "That string STUDENT(roll, name, phone) is the schema.",
              why: "Exam one-liner for schema.",
            },
            {
              do: "Look at the first filled row (11, Anu, 98001).",
              why: "Data values are the instance, not the schema.",
            },
            {
              do: "Look at the second filled row (12, Bala, 77001).",
              why: "The instance is the set of tuples together.",
            },
            {
              do: "If tomorrow Chet is added, schema is unchanged, instance grows.",
              why: "Schema stays; cardinality of the instance changes.",
            },
            {
              do: "If we add column city, schema changes.",
              why: "New heading = new schema.",
            },
          ],
          result: "Schema = STUDENT(roll, name, phone). Instance = the two filled rows.",
        },
        {
          title: "NULL is not zero",
          prompt:
            "Chet’s phone box is empty. Anu’s phone is 98001. Bala’s balance in another table is 0. Which cells are NULL?",
          code: "roll | name | phone\n-----+------+-------\n  11 | Anu  | 98001\n  12 | Bala | 77001\n  13 | Chet |  NULL\n\nACCOUNT A2 rupees = 0",
          steps: [
            {
              do: "Look at Anu’s phone 98001. A known number. Not NULL.",
              why: "NULL means the box is empty of a known value.",
            },
            {
              do: "Look at Bala’s phone 77001. Known. Not NULL.",
              why: "Walk each phone cell.",
            },
            {
              do: "Look at Chet’s phone: blank. That cell is NULL.",
              why: "Unknown or not given.",
            },
            {
              do: "Look at account A2 = 0 rupees. That is the number zero, a known balance.",
              why: "Zero is a value. NULL is the absence of a value.",
            },
            {
              do: "Do not store the letters NULL as Chet’s name. Name is Chet.",
              why: "NULL is a mark on a cell, not a person’s name.",
            },
            {
              do: "Cardinality is still 3 in STUDENT. The Chet row exists.",
              why: "A row with a NULL cell still counts as a tuple.",
            },
          ],
          result: "Only Chet’s phone is NULL. Balance 0 is not NULL.",
        },
      ],
    },
    {
      heading: "Keys",
      body: "A key is a name-tag that picks out one row, like a roll number on a school register. A superkey is any set of columns that never matches two rows — even if it has extra baggage. A candidate key is a superkey with no spare column: drop any piece and two rows could clash. We pick one candidate as the primary key, the official tag. It may not be NULL. Other candidates become alternate keys.\n\nA composite key is a candidate made of two or more columns, like (class, roll). A foreign key is a copy of another table’s key, like writing a friend’s roll on an enrol form. Referential integrity: a non-empty foreign key must match a real parent row. Picture Student_ID versus Email versus Phone: ID is primary, Email can be alternate if unique and filled, Phone often cannot.",
      howTo: [
        "List columns. Ask which sets never repeat across two rows.",
        "Drop spare columns until it breaks. Those minimal sets are candidate keys.",
        "Pick one candidate as primary. Mark it NOT NULL.",
        "Leftover candidates = alternate. Two-or-more columns = composite.",
        "A column that copies another table’s key is foreign. Check the parent row exists.",
      ],
      bullets: [
        "Superkey ⊇ candidate. Primary = chosen candidate, NOT NULL.",
        "Alternate = candidate not chosen.",
        "Composite = key with two or more columns.",
        "Foreign key = copy of a parent key. Referential integrity.",
        "Student_ID primary; Email maybe alternate; Phone often not a key.",
      ],
      examples: [
        {
          title: "Student_ID is the official tag",
          prompt:
            "Rows: (1, anu@school, 98001), (2, bala@school, 98002), (3, chet@school, NULL). sid never repeats. Pick super / candidate / primary for sid.",
          code: "sid | email         | phone\n----+---------------+-------\n  1 | anu@school    | 98001\n  2 | bala@school   | 98002\n  3 | chet@school   |  NULL",
          steps: [
            {
              do: "Look at sid 1, 2, 3. Three different numbers. sid alone names each row.",
              why: "A set that unique-names every row is a superkey.",
            },
            {
              do: "{sid} has no spare column you can drop. It is also a candidate key.",
              why: "Candidate = minimal superkey.",
            },
            {
              do: "The school prints sid on every form. That chosen candidate is the primary key.",
              why: "Primary = the official roll number.",
            },
            {
              do: "sid 3 is 3, not blank. Primary key cannot be NULL.",
              why: "Entity integrity: the official tag must exist.",
            },
            {
              do: "{sid, email} still unique-names rows, but email is extra baggage. Superkey, not candidate.",
              why: "Super allows extra columns. Candidate does not.",
            },
            {
              do: "Write: {sid} is candidate and primary. {sid, phone} is a superkey.",
              why: "Phone is spare when sid is already enough.",
            },
          ],
          result: "{sid} is the candidate and primary key. Superkeys include {sid} plus extras.",
        },
        {
          title: "Email can be the other candidate",
          prompt:
            "Same three rows. Each email is different and filled. If primary is sid, what is email?",
          code: "sid | email         | phone\n----+---------------+-------\n  1 | anu@school    | 98001\n  2 | bala@school   | 98002\n  3 | chet@school   |  NULL",
          steps: [
            {
              do: "Look at anu@school: only row 1. Look at bala@school: only row 2. Look at chet@school: only row 3.",
              why: "Email unique-names each row.",
            },
            {
              do: "No email is blank. So {email} is a candidate key too.",
              why: "A candidate must be unique and not NULL.",
            },
            {
              do: "The school already chose sid as primary. Then email is an alternate key.",
              why: "Alternate = a candidate we did not pick as official.",
            },
            {
              do: "Do not call email primary while sid is the official tag.",
              why: "Only one primary. The other candidate waits as alternate.",
            },
            {
              do: "{email, phone} is a superkey, not a candidate (phone is spare).",
              why: "Same extra-baggage rule.",
            },
            {
              do: "If one more student had no email, {email} would stop being a candidate.",
              why: "NULL on a candidate is not allowed.",
            },
          ],
          result: "{email} is a candidate and an alternate key. Primary stays {sid}.",
        },
        {
          title: "Phone is not a key",
          prompt:
            "Chet’s phone is NULL. Later two students might share a home phone. Is {phone} a candidate?",
          code: "sid | phone\n----+-------\n  1 | 98001\n  2 | 98002\n  3 |  NULL",
          steps: [
            {
              do: "Look at row 1: phone 98001. Look at row 2: 98002. Different.",
              why: "Start by walking the known numbers.",
            },
            {
              do: "Look at row 3: phone is NULL. A candidate key cell cannot be empty.",
              why: "Entity integrity is for keys. Phone fails already.",
            },
            {
              do: "A second student could later reuse 98001 (home landline).",
              why: "If two rows can share the value, it is not unique.",
            },
            {
              do: "{phone} is not a superkey and not a candidate.",
              why: "NULL plus possible repeats.",
            },
            {
              do: "SQL UNIQUE still sometimes allows several NULLs. That is weaker than a candidate key.",
              why: "Exam candidate key = unique and not null.",
            },
            {
              do: "Keep phone as an ordinary attribute.",
              why: "Not every unique-looking column is a key.",
            },
          ],
          result: "{phone} is not a key. Chet’s NULL already kills it as a candidate.",
        },
        {
          title: "Class plus roll is composite",
          prompt:
            "Two classes. 10-A has roll 1 Anu and roll 2 Bala. 10-B also has roll 1 Chet. What is the primary key?",
          code: "class | roll | name\n------+------+------\n 10-A |    1 | Anu\n 10-A |    2 | Bala\n 10-B |    1 | Chet",
          steps: [
            {
              do: "Look at roll 1: Anu in 10-A and Chet in 10-B. Roll alone repeats.",
              why: "{roll} is not unique. Not a candidate.",
            },
            {
              do: "Look at class 10-A: two students. Class alone repeats.",
              why: "{class} is not unique.",
            },
            {
              do: "Look at the pair (10-A, 1): only Anu. Pair (10-A, 2): only Bala. Pair (10-B, 1): only Chet.",
              why: "The two columns together name each row.",
            },
            {
              do: "{class, roll} is a candidate key. It has two columns, so it is composite.",
              why: "Composite = more than one column in the key.",
            },
            {
              do: "Pick {class, roll} as primary. Neither piece may be NULL.",
              why: "Every column of a primary key is NOT NULL.",
            },
            {
              do: "Do not add name to the key. Two students could share a name.",
              why: "Name is extra baggage, not needed to identify.",
            },
          ],
          result: "Primary key is composite {class, roll}. Roll alone is not a key.",
        },
        {
          title: "Enrol copies Student_ID",
          prompt:
            "STUDENT has sid 1, 2, 3. ENROL wants a row (sid 1, MATH). Then someone types sid 9. What happens?",
          code: "STUDENT sid: 1, 2, 3\n\nENROL\nsid | cid\n----+------\n  1 | MATH   ← legal\n  9 | MATH   ← no parent",
          steps: [
            {
              do: "Look at STUDENT: parent keys 1, 2, 3.",
              why: "A foreign key must copy a real parent key.",
            },
            {
              do: "Look at ENROL row (1, MATH). Parent 1 exists. Legal.",
              why: "Referential integrity holds for this row.",
            },
            {
              do: "sid on ENROL is a foreign key to STUDENT.sid.",
              why: "It is a copy of someone else’s primary key.",
            },
            {
              do: "Look at a proposed row (9, MATH). There is no student 9.",
              why: "The copy points at a missing file.",
            },
            {
              do: "The DBMS must reject sid 9 (unless the paper allows NULL to mean “no student yet”).",
              why: "Referential integrity: non-empty FK matches a parent row.",
            },
            {
              do: "Do not delete student 1 while ENROL still holds sid 1, unless you also delete or retarget those enrol rows.",
              why: "Parent cannot vanish while children point at it.",
            },
          ],
          result: "(1, MATH) is legal. (9, MATH) breaks referential integrity.",
        },
      ],
    },
    {
      heading: "1NF then 2NF",
      body: "First normal form is a tidy grid: one value in each cell, like one phone number in one box, not “98001, 98002” squeezed together. If a cell holds a list, split it into more rows (or a second table) until every box is atomic. That is 1NF.\n\nSecond normal form starts from 1NF and adds one extra promise when the primary key has two parts. No extra fact may depend on only a piece of that key. If student name hangs off student_id alone while the key is (student_id, course_id), that is a partial dependency. Move the name to a STUDENT table. Leave grade with the full pair.",
      howTo: [
        "Open every cell. If you see a list or a repeating group, split rows until 1NF.",
        "Write the primary key. If it is one column, 2NF is already true once you have 1NF.",
        "If the key is composite, underline facts that need only one piece of the key.",
        "Move those partial facts into a table whose key is that piece.",
        "Keep facts that need the whole key (like grade) in the pair table.",
      ],
      bullets: [
        "1NF: atomic cells, no lists.",
        "2NF: 1NF + no partial dependency on part of a composite key.",
        "Single-column primary key: 1NF already implies 2NF.",
        "student_name depends on sid, not on (sid, cid) → not 2NF.",
        "grade depends on (sid, cid) → stays with the pair.",
      ],
      examples: [
        {
          title: "A list in one cell fails 1NF",
          prompt:
            "Row (11, Anu, “98001, 98002”). Row (12, Bala, “77001”). Who breaks 1NF?",
          code: "roll | name | phones\n-----+------+-------------\n  11 | Anu  | 98001, 98002\n  12 | Bala | 77001",
          steps: [
            {
              do: "Look at Anu’s phones cell: two numbers in one box, joined by a comma.",
              why: "1NF wants one value per cell. A list is not atomic.",
            },
            {
              do: "Look at Bala’s phones cell: one number 77001. That box is already atomic.",
              why: "Walk one row at a time. Bala is fine; Anu is not.",
            },
            {
              do: "The table is not in 1NF because of Anu’s cell.",
              why: "One bad cell fails the whole table.",
            },
            {
              do: "Do not blame the two rows. Blame the list inside the cell.",
              why: "1NF is about values, not about how many students.",
            },
            {
              do: "Name the fix: split Anu into two rows, next example.",
              why: "Each phone gets its own row (or a PHONE table).",
            },
            {
              do: "Write: not 1NF.",
              why: "Comma-separated phones are the classic fail.",
            },
          ],
          result: "Not 1NF. Anu’s phone cell holds a list.",
        },
        {
          title: "Split phones into atomic rows",
          prompt:
            "Rewrite Anu and Bala so every phone is its own cell. What are the 1NF rows?",
          code: "roll | name | phone\n-----+------+-------\n  11 | Anu  | 98001\n  11 | Anu  | 98002\n  12 | Bala | 77001",
          steps: [
            {
              do: "Take Anu’s first number 98001. Write row (11, Anu, 98001).",
              why: "One phone, one row.",
            },
            {
              do: "Take Anu’s second number 98002. Write row (11, Anu, 98002).",
              why: "The second value gets its own box, not a comma.",
            },
            {
              do: "Take Bala’s 77001. Write row (12, Bala, 77001).",
              why: "Bala was already atomic; copy him once.",
            },
            {
              do: "Every phone cell now holds one number.",
              why: "That is the 1NF test.",
            },
            {
              do: "Anu’s name repeats on two rows. That is allowed in 1NF.",
              why: "1NF does not yet forbid repeating names. 2NF will care when the key is composite.",
            },
            {
              do: "A neater design later: STUDENT(roll, name) and PHONE(roll, phone).",
              why: "Still 1NF. The list is gone either way.",
            },
          ],
          result: "1NF rows: (11, Anu, 98001), (11, Anu, 98002), (12, Bala, 77001).",
        },
        {
          title: "Name hangs off half the key",
          prompt:
            "ENROL key is (sid, cid). Rows: (1, MATH, Anu, B+), (1, HIN, Anu, A), (2, MATH, Bala, A). Is sname fully dependent on the key?",
          code: "sid | cid  | sname | grade\n----+------+-------+------\n  1 | MATH | Anu   | B+\n  1 | HIN  | Anu   | A\n  2 | MATH | Bala  | A",
          steps: [
            {
              do: "Look at row 1: sid 1, course MATH, name Anu, grade B+.",
              why: "Grade B+ is about this pair (1, MATH).",
            },
            {
              do: "Look at row 2: sid 1, course HIN, name Anu again, grade A.",
              why: "The name Anu did not need the course. It followed sid 1 only.",
            },
            {
              do: "Look at row 3: sid 2, name Bala. Name follows sid again.",
              why: "sname depends on sid, which is only part of the composite key.",
            },
            {
              do: "That is a partial dependency. Table is not in 2NF.",
              why: "2NF forbids extras that need only a piece of the key.",
            },
            {
              do: "grade B+ changed to A when the course changed. Grade needs the full key.",
              why: "Grade is not partial. Name is.",
            },
            {
              do: "If the key were only sid, this test would not apply the same way.",
              why: "Partial dependency needs a composite key.",
            },
          ],
          result: "Not 2NF. sname depends on sid only, not on (sid, cid).",
        },
        {
          title: "Split until 2NF",
          prompt:
            "From the three ENROL rows, build STUDENT and GRADE tables that are in 2NF.",
          code: "STUDENT          ENROL\nsid | sname      sid | cid  | grade\n----+------      ----+------+------\n  1 | Anu          1 | MATH | B+\n  2 | Bala         1 | HIN  | A\n                   2 | MATH | A",
          steps: [
            {
              do: "Move Anu once: STUDENT (1, Anu).",
              why: "Name belongs with sid, the piece it depends on.",
            },
            {
              do: "Move Bala once: STUDENT (2, Bala).",
              why: "Walk the other student. Do not store Anu twice.",
            },
            {
              do: "Keep (1, MATH, B+) in ENROL. Key is still (sid, cid).",
              why: "Grade needs the full pair.",
            },
            {
              do: "Keep (1, HIN, A) in ENROL.",
              why: "Next pair, next grade.",
            },
            {
              do: "Keep (2, MATH, A) in ENROL.",
              why: "Last pair.",
            },
            {
              do: "STUDENT key is sid (one column). ENROL has no extra that hangs off sid alone.",
              why: "Both tables now satisfy 2NF.",
            },
          ],
          result: "2NF: STUDENT(sid, sname) and ENROL(sid, cid, grade).",
        },
        {
          title: "Already 2NF with a single key",
          prompt:
            "ACCOUNT(acc, name, rupees) primary key acc. Rows (A1, Meera, 150), (A2, Chet, 90). Any partial dependency?",
          code: "acc | name  | rupees\n----+-------+-------\n A1 | Meera |    150\n A2 | Chet  |     90",
          steps: [
            {
              do: "Look at the key: acc only. One column.",
              why: "Partial dependency is “depends on part of a composite key”. There is no part to split.",
            },
            {
              do: "Look at row A1: name Meera and rupees 150 both hang off A1.",
              why: "Each extra uses the whole (only) key.",
            },
            {
              do: "Look at row A2: Chet and 90 hang off A2.",
              why: "Same story, next row.",
            },
            {
              do: "Cells are atomic. 1NF holds.",
              why: "No lists.",
            },
            {
              do: "1NF plus single-column key ⇒ 2NF.",
              why: "There cannot be a partial dependency.",
            },
            {
              do: "Do not start splitting name into another table just for 2NF.",
              why: "2NF is already satisfied. (3NF is a later question.)",
            },
          ],
          result: "Already 2NF. Single-column key, atomic cells.",
        },
      ],
    },
    {
      heading: "3NF and BCNF",
      body: "Third normal form starts from 2NF and forbids a chain: key → extra → another extra. If roll tells you hostel, and hostel tells you hostel_phone, then hostel_phone depends on roll only through hostel. That is a transitive dependency. Move hostel_phone into a HOSTEL table. A Class-10 picture: the roll number should not store the hostel’s landline; the hostel file should.\n\nBCNF is a stricter lock: every determinant must be a candidate key. A determinant is a column set that tells you another column. If teacher → subject but teacher is not a candidate key, the table can be 3NF and still fail BCNF. Split so that each “this tells you that” rule starts from a real key.",
      howTo: [
        "Confirm 2NF first (atomic cells, no partials).",
        "Trace arrows: if A → B and B → C and A is the key, C is transitive. Split C off with B.",
        "List determinants (left sides of FDs). Each must be a candidate key for BCNF.",
        "If a determinant is not a candidate, split that FD into its own table.",
        "Walk one row’s phone or teacher value so the chain is visible.",
      ],
      bullets: [
        "3NF: 2NF + no transitive dependency of a non-key on the key.",
        "key → hostel → hostel_phone is the classic chain.",
        "BCNF: every determinant is a candidate key.",
        "3NF can hold while BCNF fails (teacher → subject).",
        "BCNF ⇒ 3NF ⇒ 2NF ⇒ 1NF.",
      ],
      examples: [
        {
          title: "Hostel phone through hostel",
          prompt:
            "STUDENT(roll, hostel, hostel_phone). Rows: (11, H1, 2222), (12, H1, 2222), (13, H2, 3333). roll → hostel, hostel → hostel_phone.",
          code: "roll | hostel | hostel_phone\n-----+--------+--------------\n  11 | H1     | 2222\n  12 | H1     | 2222\n  13 | H2     | 3333",
          steps: [
            {
              do: "Look at roll 11: hostel H1, phone 2222.",
              why: "The landline is a fact about H1, not about Anu’s roll.",
            },
            {
              do: "Look at roll 12: also H1, also 2222. The phone repeated with the hostel.",
              why: "When hostel stayed H1, the phone stayed 2222.",
            },
            {
              do: "Look at roll 13: hostel H2, phone 3333. Phone changed when hostel changed.",
              why: "hostel → hostel_phone.",
            },
            {
              do: "roll → hostel → hostel_phone is a transitive chain.",
              why: "A non-key (phone) depends on the key through another non-key (hostel).",
            },
            {
              do: "Table is not in 3NF (assume it is already 2NF: key is roll alone).",
              why: "3NF forbids that chain.",
            },
            {
              do: "If H1’s landline changes, two student rows would need a rewrite. That is the pain.",
              why: "Transitive extras duplicate.",
            },
          ],
          result: "Not 3NF. hostel_phone is transitive via hostel.",
        },
        {
          title: "Split the hostel file",
          prompt:
            "From those three student rows, make 3NF tables. Where does 2222 live?",
          code: "STUDENT              HOSTEL\nroll | hostel        hostel | hostel_phone\n-----+-------        -------+--------------\n  11 | H1              H1   | 2222\n  12 | H1              H2   | 3333\n  13 | H2",
          steps: [
            {
              do: "Keep (11, H1) on STUDENT. Keep (12, H1). Keep (13, H2).",
              why: "roll → hostel stays with the student.",
            },
            {
              do: "Write HOSTEL once: (H1, 2222).",
              why: "The landline lives with the hostel, one row.",
            },
            {
              do: "Write HOSTEL (H2, 3333).",
              why: "Walk the other hostel number.",
            },
            {
              do: "Do not keep 2222 on both student 11 and student 12.",
              why: "That was the duplicate the chain caused.",
            },
            {
              do: "HOSTEL key is hostel. STUDENT key is roll. No transitive extra on STUDENT.",
              why: "3NF: non-key phone is gone from STUDENT.",
            },
            {
              do: "To print Anu’s hostel phone, join 11 → H1 → 2222.",
              why: "The chain is now two tables, not one messy grid.",
            },
          ],
          result: "3NF: STUDENT(roll, hostel) and HOSTEL(hostel, hostel_phone).",
        },
        {
          title: "Teacher tells you the subject",
          prompt:
            "TEACH(student, subject, teacher). Rows: (Anu, Maths, Rao), (Bala, Maths, Rao), (Chet, Hindi, Iyer). Each teacher teaches only one subject. Keys?",
          code: "student | subject | teacher\n--------+---------+--------\n Anu    | Maths   | Rao\n Bala   | Maths   | Rao\n Chet   | Hindi   | Iyer",
          steps: [
            {
              do: "Look at Anu–Maths–Rao. Look at Bala–Maths–Rao. Same teacher, same subject.",
              why: "teacher → subject (Rao always Maths).",
            },
            {
              do: "Look at Iyer: Hindi. One teacher, one subject.",
              why: "Confirm the FD on the next teacher.",
            },
            {
              do: "A student can take two subjects, so student alone is not a key.",
              why: "Need the pair to name a row. Candidate key {student, subject} (and maybe {student, teacher}).",
            },
            {
              do: "Rao is not a candidate key: Rao appears on two student rows.",
              why: "teacher does not unique-name the whole row.",
            },
            {
              do: "teacher → subject and teacher is not a candidate key.",
              why: "That fails BCNF: every determinant must be a candidate key.",
            },
            {
              do: "This can still be 3NF if subject is a prime attribute (part of a candidate key).",
              why: "3NF lets a prime attribute be transitively / non-key-determined in this pattern. BCNF does not.",
            },
          ],
          result: "Determinant teacher is not a candidate key. Not BCNF.",
        },
        {
          title: "Split to BCNF",
          prompt:
            "From Rao-Maths and Iyer-Hindi, build BCNF tables for students and teachers.",
          code: "TEACHER             ENROL\nteacher | subject    student | teacher\n--------+--------    --------+--------\n Rao    | Maths      Anu     | Rao\n Iyer   | Hindi      Bala    | Rao\n                     Chet    | Iyer",
          steps: [
            {
              do: "Put Rao → Maths in TEACHER as one row.",
              why: "The FD teacher → subject gets its own table whose key is teacher.",
            },
            {
              do: "Put Iyer → Hindi in TEACHER as the next row.",
              why: "Walk the second teacher.",
            },
            {
              do: "Anu points at Rao. Bala points at Rao. Chet points at Iyer.",
              why: "The pair table stores who is taught by whom.",
            },
            {
              do: "In TEACHER, the determinant teacher is now the primary key.",
              why: "BCNF wants every determinant to be a candidate key. It is.",
            },
            {
              do: "In ENROL, {student, teacher} can be the key (one teacher per student-subject story).",
              why: "No leftover teacher → subject inside ENROL.",
            },
            {
              do: "To know Anu’s subject, join Anu → Rao → Maths.",
              why: "Subject is looked up from the teacher file.",
            },
          ],
          result: "BCNF: TEACHER(teacher, subject) and ENROL(student, teacher).",
        },
        {
          title: "Already BCNF",
          prompt:
            "STUDENT(sid, sname, email) with sid → sname email and email → sid sname. Two candidate keys. Any bad determinant?",
          code: "sid | sname | email\n----+-------+-------------\n  1 | Anu   | anu@school\n  2 | Bala  | bala@school",
          steps: [
            {
              do: "Look at sid 1: tells you Anu and anu@school. {sid} is a candidate key.",
              why: "A key as determinant is allowed in BCNF.",
            },
            {
              do: "Look at email anu@school: tells you sid 1 and Anu. {email} is the other candidate.",
              why: "Alternate key is still a candidate key.",
            },
            {
              do: "sname Anu does not tell you the email. Two Anus could exist in a bigger table.",
              why: "sname is not a determinant of the other columns here as a key rule.",
            },
            {
              do: "Every stated determinant is a candidate key.",
              why: "That is the BCNF test.",
            },
            {
              do: "Then 3NF, 2NF, 1NF all hold as well.",
              why: "The chain of forms: BCNF is strongest among these four.",
            },
            {
              do: "Do not split this table for BCNF.",
              why: "Already clean.",
            },
          ],
          result: "Already BCNF. Determinants {sid} and {email} are both candidate keys.",
        },
      ],
    },
    {
      heading: "What is tuple calculus?",
      body: "Tuple relational calculus is a way to write what rows you want, not how to fetch them. Think of a wish list, not a recipe. You name a tuple variable t, say which table it comes from, and say a condition. The engine may scan, index, or join however it likes. Relational algebra is the recipe (select, project, join). Calculus is the wish.\n\nThe exam spelling looks like { t | t ∈ Employee ∧ t.salary > 50000 }. Read the symbols one by one: braces mean the set of answers, t is one row variable, the bar means “such that”, ∈ means “is a row of”, ∧ means “and”, t.salary is the salary cell on that row.",
      howTo: [
        "Read left to right: set of t such that condition.",
        "Translate ∈ as “row of this table”. Translate ∧ ∨ ¬ as and, or, not.",
        "Translate t.col as “the col cell of row t”.",
        "Translate ∃ as “there exists a row” and ∀ as “every row”.",
        "To write: name the result tuple, name the table, write the filter in symbols.",
      ],
      bullets: [
        "{ t | … } = set of tuples t such that …",
        "t ∈ Employee = t is a row of Employee.",
        "∧ and, ∨ or, ¬ not.",
        "∃ there exists. ∀ for all.",
        "Calculus = what. Algebra = how.",
      ],
      examples: [
        {
          title: "Read salary above 50000",
          prompt:
            "Read { t | t ∈ Employee ∧ t.salary > 50000 }. Employee rows: (Anu, 40000), (Bala, 60000), (Chet, 50000), (Dia, 72000).",
          code: "{ t | t ∈ Employee ∧ t.salary > 50000 }",
          steps: [
            {
              do: "Braces { } mean “the set of answers”. t is one row variable.",
              why: "Calculus names a tuple, not a scan order.",
            },
            {
              do: "The bar | means “such that”. The wish follows the bar.",
              why: "Left = what you collect. Right = the test.",
            },
            {
              do: "t ∈ Employee means t is a row of Employee. Walk Anu first: salary 40000. 40000 > 50000 is false. Drop Anu.",
              why: "One row, one test.",
            },
            {
              do: "Walk Bala: 60000 > 50000 is true. Keep Bala.",
              why: "∧ joins “in Employee” with the salary test. Both must hold.",
            },
            {
              do: "Walk Chet: 50000 > 50000 is false. Drop Chet. Walk Dia: 72000 > 50000 is true. Keep Dia.",
              why: "Greater-than does not keep the equal 50000.",
            },
            {
              do: "Result set is Bala and Dia. We never said “scan the file from the top”.",
              why: "That is what-not-how. Algebra would have written σ_salary>50000(Employee).",
            },
          ],
          result: "Bala and Dia. Chet’s 50000 is not greater than 50000.",
        },
        {
          title: "Write students in Pune",
          prompt:
            "STUDENT rows: (11, Anu, Pune), (12, Bala, Mumbai), (13, Chet, Pune). Write TRC for whole student rows in Pune.",
          code: "roll | name | city\n-----+------+--------\n  11 | Anu  | Pune\n  12 | Bala | Mumbai\n  13 | Chet | Pune",
          steps: [
            {
              do: "We want whole rows, so the result variable is t, a full student tuple.",
              why: "If we wanted only names, we would build a different shape. Here keep t.",
            },
            {
              do: "Say t comes from STUDENT: t ∈ Student.",
              why: "∈ pins the table.",
            },
            {
              do: "Filter the city cell: t.city = 'Pune'.",
              why: "Dot means that column on that row.",
            },
            {
              do: "Join with and: t ∈ Student ∧ t.city = 'Pune'.",
              why: "∧ is the comma “and” between tests.",
            },
            {
              do: "Wrap as { t | t ∈ Student ∧ t.city = 'Pune' }.",
              why: "Set-builder spelling.",
            },
            {
              do: "Walk rows: Anu Pune keep, Bala Mumbai drop, Chet Pune keep.",
              why: "Check the wish against each tuple.",
            },
          ],
          result: "{ t | t ∈ Student ∧ t.city = 'Pune' } returns Anu and Chet.",
        },
        {
          title: "Read “there exists” an enrol",
          prompt:
            "Read { t | t ∈ Student ∧ ∃ e ∈ Enrol (e.roll = t.roll ∧ e.cid = 'MATH') }. Enrol: (11, MATH), (11, HIN), (12, HIN).",
          code: "{ t | t ∈ Student ∧ ∃ e ∈ Enrol (e.roll = t.roll ∧ e.cid = 'MATH') }\n\nStudent: 11 Anu, 12 Bala, 13 Chet",
          steps: [
            {
              do: "t is a Student row. ∃ e means “there exists an Enrol row e”.",
              why: "∃ is a hunt: at least one matching e.",
            },
            {
              do: "Walk t = Anu 11. Hunt e with e.roll = 11 and e.cid = MATH. Found (11, MATH). Keep Anu.",
              why: "The exists test succeeded for 11.",
            },
            {
              do: "Walk t = Bala 12. Enrol has (12, HIN) only, not MATH. No such e. Drop Bala.",
              why: "∃ fails if every e misses the condition.",
            },
            {
              do: "Walk t = Chet 13. No Enrol row with roll 13. Drop Chet.",
              why: "No handshake, no keep.",
            },
            {
              do: "∧ ties “is a student” to “has a MATH enrol”.",
              why: "Both sides must hold.",
            },
            {
              do: "This is a join-like wish. We still did not write a join operator.",
              why: "Calculus states the match e.roll = t.roll, not the algorithm.",
            },
          ],
          result: "Only Anu (roll 11). Bala and Chet have no MATH enrol.",
        },
        {
          title: "Write Anu’s course ids",
          prompt:
            "Anu is roll 11. Enrol: (11, MATH), (11, HIN), (12, MATH). Write TRC for course ids Anu takes. Result should feel like a set of cid values.",
          code: "Enrol\nroll | cid\n-----+------\n  11 | MATH\n  11 | HIN\n  12 | MATH",
          steps: [
            {
              do: "We want course ids, not whole enrol rows. Let the result be t with t.cid filled from Enrol.",
              why: "Say what you want in the braces.",
            },
            {
              do: "Need an enrol row e such that e.roll = 11 and t.cid = e.cid.",
              why: "Copy the cid from a row that belongs to Anu.",
            },
            {
              do: "Write { t | ∃ e ∈ Enrol (e.roll = 11 ∧ t.cid = e.cid) }.",
              why: "∃ picks Anu’s enrol lines; t holds the cid.",
            },
            {
              do: "Walk e = (11, MATH): t.cid = MATH. Keep MATH.",
              why: "First of Anu’s courses.",
            },
            {
              do: "Walk e = (11, HIN): t.cid = HIN. Keep HIN.",
              why: "Second course.",
            },
            {
              do: "Walk e = (12, MATH): e.roll is 12, not 11. Skip. MATH is already in from Anu anyway.",
              why: "Bala’s MATH is not Anu’s row, even if the cid letters match.",
            },
          ],
          result: "{ t | ∃ e ∈ Enrol (e.roll = 11 ∧ t.cid = e.cid) } gives MATH and HIN.",
        },
        {
          title: "Read two conditions with and",
          prompt:
            "Read { t | t ∈ Account ∧ t.city = 'Pune' ∧ t.rupees > 100 }. Rows: (A1, Pune, 300), (A2, Pune, 90), (A3, Mumbai, 150), (A4, Pune, 100).",
          code: "{ t | t ∈ Account ∧ t.city = 'Pune' ∧ t.rupees > 100 }",
          steps: [
            {
              do: "t ∈ Account: start with all four account rows.",
              why: "∈ names the table.",
            },
            {
              do: "A1 Pune 300: city Pune true, 300 > 100 true. Keep A1.",
              why: "∧ needs both filters true.",
            },
            {
              do: "A2 Pune 90: city true, 90 > 100 false. Drop A2.",
              why: "One false kills the and.",
            },
            {
              do: "A3 Mumbai 150: city false. Drop A3 even though 150 > 100.",
              why: "Wrong city.",
            },
            {
              do: "A4 Pune 100: 100 > 100 is false. Drop A4.",
              why: "The wish was strictly greater, like the salary example.",
            },
            {
              do: "If the paper wanted or, it would have used ∨. Then Mumbai 150 might survive.",
              why: "∨ versus ∧ is a favourite swap on MCQs.",
            },
          ],
          result: "Only A1. Pune and rupees strictly above 100.",
        },
      ],
    },
    {
      heading: "File organisation",
      body: "File organisation is how rows sit on disk, like how a bank stores paper files. A heap file is a jumble: new pages are appended anywhere there is space, like dropping a new form on top of a pile. To find roll 111 you may scan every page. A sequential file keeps rows sorted on a key, like a register in roll order. You walk until 111, and you can stop when the key has gone past.\n\nA hash file turns the key into a block number: hash(111) → block 7, then look only there. ISAM pairs a sorted file with an index: first look in a small index, then jump into the sequential data. Picture: heap = pile, sequential = sorted book, hash = locker number from a formula, ISAM = contents page plus sorted chapters.",
      howTo: [
        "Name the organisation before you search: heap, sorted, hash, or ISAM.",
        "Heap: scan from the start until you find the key (or finish).",
        "Sequential: walk in key order; stop when the stored key exceeds the target.",
        "Hash: compute the block from the key, then search that block only.",
        "ISAM: read the index, then sequential-search the pointed slice.",
      ],
      bullets: [
        "Heap = append anywhere; find = scan.",
        "Sequential = sorted on key; range is easy.",
        "Hash = key → block; equality is fast, range is not.",
        "ISAM = index + sequential data.",
        "Insert in a sorted file may shift rows; heap insert is cheap.",
      ],
      examples: [
        {
          title: "Heap scan for roll 111",
          prompt:
            "Heap pages in arrival order: 205, 40, 111, 88. Find 111. How many rolls do you look at?",
          code: "page pile: 205 , 40 , 111 , 88",
          steps: [
            {
              do: "Heap has no order. Start at the first stored value 205. 205 is not 111.",
              why: "Append-anywhere means the target can sit anywhere.",
            },
            {
              do: "Next value 40. 40 is not 111.",
              why: "Keep scanning. Do not jump.",
            },
            {
              do: "Next value 111. Match. Stop.",
              why: "A heap search can stop at a hit, but it had no shortcut to this slot.",
            },
            {
              do: "You looked at three numbers: 205, 40, 111. You did not need 88.",
              why: "Count the comparisons until the hit.",
            },
            {
              do: "If 111 had been last, you would have looked at all four.",
              why: "Worst case is a full scan.",
            },
            {
              do: "Insert of a new roll 50 would just append, not sit between 40 and 111.",
              why: "Heap insert is cheap; order is not kept.",
            },
          ],
          result: "Heap: look at 205, then 40, then 111. Found after three looks.",
        },
        {
          title: "Sorted file, stop past the key",
          prompt:
            "Sequential file sorted by roll: 40, 88, 111, 205. Find 111. Then say why you would stop if you were seeking 90.",
          code: "sorted: 40 , 88 , 111 , 205",
          steps: [
            {
              do: "Look at 40. 40 < 111. Go on.",
              why: "Sorted order lets you walk upward.",
            },
            {
              do: "Look at 88. 88 < 111. Go on.",
              why: "Still too small.",
            },
            {
              do: "Look at 111. Match. Stop.",
              why: "Found in three looks, same count as the heap this time, but the path was ordered.",
            },
            {
              do: "Now seek 90. Look at 40 (too small), 88 (too small), 111 (111 > 90).",
              why: "Once the stored key passes 90, 90 cannot appear later.",
            },
            {
              do: "Stop at 111 without reading 205. Report not found.",
              why: "Sequential search may fail early. Heap cannot fail early on a missing key.",
            },
            {
              do: "A range 88 to 111 is just a walk along neighbours.",
              why: "Sorted files are good at ranges. Hash is not.",
            },
          ],
          result: "Find 111 after 40 then 88. Missing 90 is known when you see 111.",
        },
        {
          title: "Hash key to a block",
          prompt:
            "Hash is roll mod 4. Blocks: 0 holds 40,88; 1 holds 205; 2 empty; 3 holds 111. Find 111.",
          code: "h(roll) = roll mod 4\nblock 0: 40, 88\nblock 1: 205\nblock 2: (empty)\nblock 3: 111",
          steps: [
            {
              do: "Compute 111 mod 4. 108 is 27×4, remainder 3. Hash = 3.",
              why: "Hash turns the key into a block number.",
            },
            {
              do: "Go only to block 3. Do not open block 0.",
              why: "Equality search does not scan the heap.",
            },
            {
              do: "Inside block 3, look at 111. Match.",
              why: "A block may still hold a few rows. Walk those.",
            },
            {
              do: "You never compared 40, 88, or 205.",
              why: "Wrong remainder, wrong block.",
            },
            {
              do: "A range 88 to 111 would need many blocks (88 mod 4 = 0, 111 mod 4 = 3).",
              why: "Hash scatters neighbours. Bad for ranges.",
            },
            {
              do: "Insert 50: 50 mod 4 = 2, append in block 2.",
              why: "Insert goes to the hashed block, not to sorted place.",
            },
          ],
          result: "hash(111)=3, read block 3, find 111. Other blocks untouched.",
        },
        {
          title: "ISAM: index then sequential",
          prompt:
            "Index says: block A starts at 40, block B starts at 111, block C starts at 205. Data B holds 111, 150. Find 111.",
          code: "index (first key → block):\n  40  → A\n 111  → B\n 205  → C\n\nblock B: 111, 150",
          steps: [
            {
              do: "Read the index line 40 → A. Target 111 is not in the 40-start slice if the next start is 111.",
              why: "ISAM index stores the first key of each sequential block.",
            },
            {
              do: "Read the index line 111 → B. This start key equals the target. Choose block B.",
              why: "Index pick, not a full data scan.",
            },
            {
              do: "Do not open C (starts at 205). 111 cannot live there.",
              why: "Sequential data plus index = jump, then local walk.",
            },
            {
              do: "Open block B. First data value 111. Match.",
              why: "Sequential search inside the chosen block.",
            },
            {
              do: "If you needed 150, you would still be in B: after 111 comes 150.",
              why: "The slice is sorted. Neighbours stay together.",
            },
            {
              do: "Name it ISAM: index + sequential file.",
              why: "Not a pure heap, not a pure hash.",
            },
          ],
          result: "Index chooses block B; sequential read finds 111.",
        },
        {
          title: "Pick a file for the job",
          prompt:
            "Jobs: (i) append a log row fast, (ii) find acc A2 by exact id, (iii) print accounts with roll 100–120. Heap, hash, or sequential?",
          code: "(i) new log line\n(ii) WHERE acc = 'A2'\n(iii) rolls 100 to 120",
          steps: [
            {
              do: "(i) A log line should not reshuffle a sorted book. Heap append is the cheap picture.",
              why: "Heap = drop on the pile.",
            },
            {
              do: "(ii) Exact id A2: hash maps the key to one block. Good fit.",
              why: "Equality loves hash.",
            },
            {
              do: "(iii) Range 100–120: sorted sequential (or ISAM) keeps neighbours together.",
              why: "A hash would scatter 100 and 120.",
            },
            {
              do: "Heap for (iii) would scan everything. Possible but slow.",
              why: "Organisation matches the question’s verb: append, equal, range.",
            },
            {
              do: "ISAM would also serve (iii): index to the 100-block, then walk to 120.",
              why: "ISAM is sequential plus a contents page.",
            },
            {
              do: "Write: heap / hash / sequential (or ISAM).",
              why: "One organisation per job.",
            },
          ],
          result: "(i) heap (ii) hash (iii) sequential or ISAM.",
        },
      ],
    },
    {
      heading: "B+ trees and cluster files",
      body: "A B+ tree is a dictionary for a file. Internal pages hold only guide words, like the letters on a dictionary thumb index. Every real key and every row pointer (or the row itself) sits at the bottom, on the leaf pages. Leaves are chained left to right, so a range is a walk along the bottom, not a hop around the attic.\n\nA cluster file stores related rows of two tables together for joins, like clipping a student’s enrol lines behind that student’s card in one folder. When you open Anu, Maths and Hindi are already in the same pocket. Unclustered storage keeps STUDENT in one file and ENROL in another, so a join hops between folders.",
      howTo: [
        "Draw root, then inner guides, then a leaf row of all keys in order.",
        "To find a key: compare with inner guides, go down, then walk the leaf.",
        "To range-search: find the start key at a leaf, then follow leaf next-links.",
        "Cluster: ask if the two tables’ matching rows share a disk pocket.",
        "Never store data in inner B+ nodes in the standard exam picture — data is at leaves.",
      ],
      bullets: [
        "B+ internal = guides only. All data keys at leaves.",
        "Leaves linked → easy range (dictionary pages).",
        "Cluster = related rows of two tables stored together.",
        "Join on a cluster can avoid hopping files.",
        "B-tree vs B+: exams want “data at leaves” for B+.",
      ],
      examples: [
        {
          title: "Dictionary: data only at leaves",
          prompt:
            "Root guides: 50 | 100. Leaves: 20,40,50  then  60,80,100  then  111,150. Where is 111 stored? In the root?",
          code: "        [ 50 | 100 ]\n         /    |     \\\n   20 40 50  60 80 100  111 150\n        leaves (all real keys)",
          steps: [
            {
              do: "Look at the root: 50 and 100. These are guide posts, not the student file.",
              why: "Internal nodes in a B+ tree do not hold the records.",
            },
            {
              do: "Look at the first leaf: 20, 40, 50. Real keys live here.",
              why: "All data at leaves.",
            },
            {
              do: "Look at the middle leaf: 60, 80, 100.",
              why: "100 appears in the root as a guide and again at the leaf as a real key.",
            },
            {
              do: "Look at the last leaf: 111, 150. 111 sits here.",
              why: "That is the only place the record 111 lives.",
            },
            {
              do: "111 is not stored in the root.",
              why: "Root has 50 and 100 as separators, not the 111 row.",
            },
            {
              do: "Picture a dictionary: thumb letters versus the words on the page.",
              why: "Guides upstairs, words downstairs.",
            },
          ],
          result: "111 is on the leaf. The root only guides. All data at leaves.",
        },
        {
          title: "Walk down to 111",
          prompt:
            "Same tree: root 50 | 100. Find 111, one comparison at a time.",
          code: "root:   <50    50–100    >100\nleaves: 20 40 50 | 60 80 100 | 111 150",
          steps: [
            {
              do: "At the root, compare 111 with 50. 111 > 50, so skip the left branch.",
              why: "One number, one decision.",
            },
            {
              do: "Compare 111 with 100. 111 > 100, so take the right branch.",
              why: "Second guide. Still not a leaf.",
            },
            {
              do: "Land on the right leaf. Read first leaf key 111. Match.",
              why: "Data comparison happens at the leaf.",
            },
            {
              do: "You did not open the 20-40-50 leaf.",
              why: "Guides saved a full scan.",
            },
            {
              do: "You did not open the 60-80-100 leaf.",
              why: "111 is after 100.",
            },
            {
              do: "Two internal comparisons, then one leaf hit.",
              why: "Height of this tiny tree is root plus leaf.",
            },
          ],
          result: "Path: skip <50, skip 50–100, open >100 leaf, find 111.",
        },
        {
          title: "Range along the leaf chain",
          prompt:
            "Leaves chained: [20,40,50] → [60,80,100] → [111,150]. List keys from 80 to 111.",
          code: "leaf1 → leaf2 → leaf3\n20 40 50 | 60 80 100 | 111 150",
          steps: [
            {
              do: "Find the start 80 by going down the tree to leaf2.",
              why: "Range still begins with an equality-style descent to the first key.",
            },
            {
              do: "In leaf2, read 60 (too small), then 80 (keep), then 100 (keep).",
              why: "Walk one key at a time on the leaf.",
            },
            {
              do: "Follow the next-leaf pointer to leaf3. Do not climb the root.",
              why: "B+ leaves are linked for ranges, like dictionary pages.",
            },
            {
              do: "In leaf3, read 111 (keep). 111 is the end of the asked range.",
              why: "Stop when the key passes the end.",
            },
            {
              do: "Do not take 150.",
              why: "150 is outside 80–111.",
            },
            {
              do: "Result keys: 80, 100, 111.",
              why: "A heap or hash would not offer this neighbour walk.",
            },
          ],
          result: "80, 100, 111. Walk leaf2 then the next leaf. No root hop.",
        },
        {
          title: "Cluster Anu with her courses",
          prompt:
            "Cluster file pocket: Anu card, then enrol MATH B+, then enrol HIN A. Bala is a later pocket. How many pockets to print Anu’s grades?",
          code: "pocket Anu:  [Student Anu] [MATH B+] [HIN A]\npocket Bala: [Student Bala] [MATH A]",
          steps: [
            {
              do: "Open Anu’s pocket. The student row is here.",
              why: "Cluster stores the parent and its child rows together.",
            },
            {
              do: "Next in the same pocket: MATH B+.",
              why: "Related ENROL row sits beside the student.",
            },
            {
              do: "Next in the same pocket: HIN A.",
              why: "Second child, still the same folder.",
            },
            {
              do: "Stop. Do not open Bala’s pocket.",
              why: "Anu’s join is done. One pocket.",
            },
            {
              do: "If the files were separate, you would fetch Anu from STUDENT then hunt two ENROL pages.",
              why: "Unclustered join hops.",
            },
            {
              do: "Name: cluster file on Student–Enrol.",
              why: "Built for that join.",
            },
          ],
          result: "One pocket. Anu plus both grades sit together.",
        },
        {
          title: "Unclustered join hops",
          prompt:
            "STUDENT file page has Anu. ENROL file pages have MATH for many students, Hindi elsewhere. Print Anu’s two grades.",
          code: "STUDENT page: Anu, Bala\nENROL page 1: (Bala, MATH) (Anu, MATH) …\nENROL page 2: (Anu, HIN) (Chet, HIN) …",
          steps: [
            {
              do: "Read Anu from the STUDENT page.",
              why: "Parent file first.",
            },
            {
              do: "Hop to ENROL page 1 to find (Anu, MATH).",
              why: "Child rows are not in Anu’s student pocket.",
            },
            {
              do: "Hop to ENROL page 2 to find (Anu, HIN).",
              why: "The second child lives on a different page.",
            },
            {
              do: "Two extra hops after the student page. Three touches.",
              why: "Unclustered join cost is extra I/O.",
            },
            {
              do: "Bala’s MATH on page 1 does not help Anu’s Hindi.",
              why: "Packed by course file order, not by student pocket.",
            },
            {
              do: "A cluster would have avoided the two ENROL hops for this one-student join.",
              why: "That is why cluster files exist.",
            },
          ],
          result: "Unclustered: student page plus two enrol pages. Cluster would be one pocket.",
        },
      ],
    },
    {
      heading: "Indexing",
      body: "An index is a small contents page for a big file, like the front of a dictionary. A dense index has one index entry per row. A sparse index has one index entry per block (only the first key of that block). A primary index is built on the ordered file’s primary key. A clustering index is built on a non-key column the file is sorted by (many rows share a city). A secondary index is on a column the file is not sorted by.\n\nTo find roll 111 through two index levels, walk the top guide, then the leaf of the index, then the data block. One number at a time: compare, choose a pointer, compare again.",
      howTo: [
        "Ask dense or sparse: one entry per row, or per block?",
        "Ask what the file is sorted on. That column’s index is primary or clustering.",
        "Any other column’s index is secondary (always dense in the usual exam picture).",
        "To search: start at the top index level, follow one pointer, repeat, then read the data row.",
        "Walk roll 111 with written comparisons so you do not skip a level.",
      ],
      bullets: [
        "Dense = one index entry per record. Sparse = one per block.",
        "Primary index: ordered primary key, usually sparse.",
        "Clustering index: ordered non-key (e.g. city).",
        "Secondary index: unordered column, dense.",
        "Two-level search: root → index leaf → data.",
      ],
      examples: [
        {
          title: "Dense versus sparse on four rolls",
          prompt:
            "Data blocks: block1 has 40, 88; block2 has 111, 205. Write a dense index and a sparse index on roll.",
          code: "block1: 40, 88\nblock2: 111, 205",
          steps: [
            {
              do: "Dense means one entry per row. List 40, 88, 111, 205 — four entries.",
              why: "Every record has a pointer in a dense index.",
            },
            {
              do: "Sparse means one entry per block. Block1’s first key is 40. Block2’s first key is 111.",
              why: "Two blocks, two sparse entries.",
            },
            {
              do: "Sparse index is (40 → block1), (111 → block2).",
              why: "You store the first key of each block.",
            },
            {
              do: "To find 88 with sparse: 40 ≤ 88 < 111, open block1, then look at 40, then 88.",
              why: "Sparse jumps to a block; the block is still searched.",
            },
            {
              do: "To find 88 with dense: the index has an 88 line that points at the row.",
              why: "Dense can point at the record, not only the block.",
            },
            {
              do: "Fewer index lines in sparse: 2 versus 4.",
              why: "That is the space trade.",
            },
          ],
          result: "Dense: 40,88,111,205. Sparse: 40→block1, 111→block2.",
        },
        {
          title: "Primary index on sorted roll",
          prompt:
            "File is sorted by roll, primary key. Sparse index as above. Is this primary, clustering, or secondary?",
          code: "ordered file on roll (unique)\n40, 88 | 111, 205",
          steps: [
            {
              do: "The data file is in roll order. Roll is the primary key.",
              why: "Primary index is defined on the ordered primary key.",
            },
            {
              do: "The index on roll is therefore a primary index.",
              why: "Name follows the ordered key.",
            },
            {
              do: "It is usually sparse, because one key per block is enough when keys are unique and sorted.",
              why: "Unique + sorted ⇒ first key identifies the block.",
            },
            {
              do: "It is not clustering in the “non-key” sense. Clustering indexes sit on a non-unique ordered column.",
              why: "City with many students is clustering. Unique roll is primary.",
            },
            {
              do: "It is not secondary. Secondary would be an index on name while the file stays in roll order.",
              why: "Secondary ≠ the sort column.",
            },
            {
              do: "Tick: primary (sparse) index on roll.",
              why: "Sorted unique key.",
            },
          ],
          result: "Primary index on roll. Sparse is the usual picture.",
        },
        {
          title: "Clustering city versus secondary name",
          prompt:
            "File sorted by city: Pune Anu, Pune Bala, Mumbai Chet. Index on city? Index on name?",
          code: "sorted by city:\nPune    Anu\nPune    Bala\nMumbai  Chet",
          steps: [
            {
              do: "City is not unique. Two Pune rows. The file is still sorted by city.",
              why: "A clustering index is on a non-key ordered column.",
            },
            {
              do: "Index on city is clustering. One index entry can point at the first Pune block.",
              why: "All Pune rows sit together.",
            },
            {
              do: "Name is not the sort column. Anu then Bala then Chet is not name order (Bala would follow Anu, but Chet is under Mumbai).",
              why: "The file order is city, not name.",
            },
            {
              do: "Index on name is secondary. It must be dense: one entry per student name.",
              why: "Names are scattered relative to city order.",
            },
            {
              do: "To find all Pune students, clustering city index is the natural tool.",
              why: "They share blocks.",
            },
            {
              do: "To find Bala by name, use the secondary name index, then jump to his row.",
              why: "Secondary = extra contents page for an unsorted column.",
            },
          ],
          result: "City index = clustering. Name index = secondary (dense).",
        },
        {
          title: "Find roll 111 down two index levels",
          prompt:
            "Top index: 40 | 111. Second level: 40,88 pointing at block1; 111,205 pointing at block2. Data block2: 111, 205. Find 111 step by step.",
          code: "level 1:     [ 40 | 111 ]\nlevel 2:   40,88 → blk1     111,205 → blk2\ndata:      blk1: 40,88      blk2: 111,205",
          steps: [
            {
              do: "At level 1, compare 111 with 40. 111 > 40, so look at the next guide.",
              why: "One number at a time at the top level.",
            },
            {
              do: "Level 1 next guide is 111. Equal to the target. Follow the pointer toward the 111-group.",
              why: "Top level chooses which second-level page to open.",
            },
            {
              do: "At level 2, read first key 111. Match the search key.",
              why: "Second index level names the data block.",
            },
            {
              do: "Follow the pointer to data block2. Do not open block1 (40, 88).",
              why: "Two-level index skipped the wrong block.",
            },
            {
              do: "In block2, look at first data value 111. Found.",
              why: "Last step is the data row, not another index.",
            },
            {
              do: "If the second data value 205 were needed, you would read it next in the same block.",
              why: "You already paid for the block.",
            },
            {
              do: "Count: one comparison at level 1, one at level 2, one in data.",
              why: "That is the two-level walk the exam wants written out.",
            },
          ],
          result: "Level1 → 111-group, level2 → block2, data row 111. Block1 never opened.",
        },
        {
          title: "Secondary index on name to find Bala",
          prompt:
            "Data file in roll order: (11, Anu), (12, Chet), (13, Bala). Dense name index: Anu→11, Bala→13, Chet→12. Find Bala.",
          code: "data (roll order): 11 Anu | 12 Chet | 13 Bala\nname index: Anu→r11, Bala→r13, Chet→r12",
          steps: [
            {
              do: "The data file is not sorted by name (Anu, Chet, Bala).",
              why: "So the name index is secondary.",
            },
            {
              do: "Open the dense name index. First entry Anu. Not Bala.",
              why: "Walk index entries in name order, not roll order.",
            },
            {
              do: "Next index entry Bala → roll 13.",
              why: "Dense secondary stores one pointer per name.",
            },
            {
              do: "Follow the pointer to the data row (13, Bala).",
              why: "The jump may skip Chet’s row in the middle of the data file.",
            },
            {
              do: "Do not scan Anu then Chet then Bala in the data file unless you have no index.",
              why: "The index exists to avoid that scan.",
            },
            {
              do: "If two students were named Bala, a secondary index would list two pointers.",
              why: "Non-unique secondary: one name, many row-ids.",
            },
          ],
          result: "Secondary name index: skip Anu, read Bala→13, fetch row 13.",
        },
      ],
    },
    {
      heading: "ACID and mixed-up reads",
      body: "ACID is four promises a bank DBMS makes about a transaction, like a counter slip for ₹300. Atomicity: the whole slip happens or none of it — a transfer does not keep the debit and drop the credit. Consistency: rules stay true — two accounts that started at 300 and 200 still total 500 after a move. Isolation: two cashiers do not see each other’s half-done slips. Durability: once the clerk stamps committed, a power cut must not erase the new balances.\n\nWhen isolation is weak, exam bugs appear on a ₹300 account. Dirty read: you read a number that is later rolled back. Lost update: two withdrawals both start from 300 and both write 200, so one ₹100 vanishes. Non-repeatable (inconsistent) read: you read 300, someone commits a withdraw, you read 200 in the same transaction.",
      howTo: [
        "Name the ACID word from the story: all-or-nothing, rule, two cashiers, after-commit crash.",
        "Draw the ₹ box. Write the number after each read or write.",
        "Dirty: write without commit, other reads it, then rollback.",
        "Lost update: two reads of the same old value, both write their own new value.",
        "Non-repeatable: same reader, two different committed numbers.",
      ],
      bullets: [
        "A atomic (all or nothing). C consistent (rules). I isolated. D durable (after commit).",
        "Dirty read = read uncommitted data.",
        "Lost update = two writes, one overwrite.",
        "Non-repeatable / inconsistent read = two different answers in one transaction.",
        "Walk the rupee box; do not name the bug before the numbers.",
      ],
      examples: [
        {
          title: "Atomic transfer of ₹100",
          prompt:
            "A has ₹300, B has ₹200. Transfer ₹100 A→B. Show the box if the system crashes after debit but before credit. Then show commit.",
          code: "A: 300    B: 200    total 500",
          steps: [
            {
              do: "Start: A=300, B=200. Total 500.",
              why: "Write both numbers before any edit.",
            },
            {
              do: "Debit A: 300−100=200. Now A=200, B=200. Total 400 if we stop here.",
              why: "Half a transfer is a broken slip.",
            },
            {
              do: "Crash before credit. Atomicity must rollback the debit. A returns to 300, B stays 200.",
              why: "All or nothing. Nothing means both old values.",
            },
            {
              do: "Retry: debit A to 200, credit B to 300, then commit. A=200, B=300. Total 500.",
              why: "Both arms of the slip, then commit.",
            },
            {
              do: "Consistency: total 500 before and after the successful transfer.",
              why: "Money did not appear or vanish.",
            },
            {
              do: "Name Atomicity for the crash-in-the-middle, Consistency for the total.",
              why: "Two ACID letters in one story.",
            },
          ],
          result: "Crash mid-transfer rolls back to 300 and 200. After commit: A 200, B 300, total 500.",
        },
        {
          title: "Durability after the stamp",
          prompt:
            "A was 300. Withdraw ₹50 commits. A is 250 on screen. Power fails. What must A be after reboot?",
          code: "commit stamp on withdraw 50\nA should stay 250",
          steps: [
            {
              do: "Before the withdraw, A=300.",
              why: "Old durable value.",
            },
            {
              do: "Withdraw writes 250 and the transaction commits.",
              why: "Commit is the clerk’s stamp.",
            },
            {
              do: "Power fails. RAM is gone. Disk (or log) must still hold 250.",
              why: "Durability = committed facts survive a crash.",
            },
            {
              do: "After reboot A=250, not 300.",
              why: "Rolling back a committed withdraw would break durability.",
            },
            {
              do: "If the crash was before commit, A would still be 300 (atomicity).",
              why: "The stamp is the line between A and D.",
            },
            {
              do: "Name Durability.",
              why: "Exam word for “after commit, crash cannot undo”.",
            },
          ],
          result: "A remains ₹250 after reboot. Committed work is durable.",
        },
        {
          title: "Dirty read on ₹300",
          prompt:
            "A starts at ₹300. T1 writes A=50 (not committed). T2 reads A. T1 rolls back. What did T2 see, and what is A really?",
          code: "A starts 300\nT1: write 50, not committed\nT2: read A\nT1: rollback",
          steps: [
            {
              do: "Box starts at 300.",
              why: "Committed truth at the beginning.",
            },
            {
              do: "T1 writes 50 but does not commit. The box looks like 50 inside T1’s slip.",
              why: "Uncommitted write.",
            },
            {
              do: "T2 reads the box and gets 50.",
              why: "T2 read a value that is not stamped yet.",
            },
            {
              do: "T1 rolls back. The box returns to 300.",
              why: "Atomicity undoes T1.",
            },
            {
              do: "T2 still believes 50. That belief is false.",
              why: "Dirty read = read uncommitted data that may vanish.",
            },
            {
              do: "True A after rollback is 300.",
              why: "Walk the real box last so the bug has a number.",
            },
          ],
          result: "T2 dirty-read ₹50. After rollback A is ₹300.",
        },
        {
          title: "Lost update, two ₹100 withdrawals",
          prompt:
            "A is ₹300. T1 and T2 both withdraw ₹100. Both read 300. Both write 200. What should A be, and what is A?",
          code: "A = 300\nT1 read 300\nT2 read 300\nT1 write 200\nT2 write 200",
          steps: [
            {
              do: "Box is 300.",
              why: "Start number.",
            },
            {
              do: "T1 reads 300. Plans 300−100=200.",
              why: "First cashier copies the old balance.",
            },
            {
              do: "T2 also reads 300. Plans 300−100=200.",
              why: "Second cashier copied the same old balance. Isolation failed.",
            },
            {
              do: "T1 writes 200. Box=200.",
              why: "First withdraw applied.",
            },
            {
              do: "T2 writes 200. Box=200 again. T1’s write is overwritten.",
              why: "Lost update: one of the two ₹100 deductions disappeared.",
            },
            {
              do: "Two withdrawals should have left 100. Box shows 200.",
              why: "₹100 vanished from the books.",
            },
          ],
          result: "A is ₹200, but two ₹100 withdrawals should leave ₹100. Lost update.",
        },
        {
          title: "Non-repeatable read of the same account",
          prompt:
            "T1 reads A=300. T2 withdraws ₹100 and commits. T1 reads A again. What two numbers did T1 see?",
          code: "T1: read A → 300\nT2: withdraw 100, commit, A=200\nT1: read A → 200",
          steps: [
            {
              do: "T1’s first read: 300. Write that down.",
              why: "First look in the same transaction.",
            },
            {
              do: "T2 subtracts 100 and commits. Real box is now 200.",
              why: "This write is committed, so it is not a dirty read.",
            },
            {
              do: "T1’s second read: 200.",
              why: "Same cashier, same account, new number.",
            },
            {
              do: "300 then 200 in one transaction is a non-repeatable read (inconsistent read).",
              why: "Repeat the same read, different answer.",
            },
            {
              do: "Not a lost update: T1 did not write a stale 300 over T2.",
              why: "Different bug. T1 only read twice.",
            },
            {
              do: "Not dirty: T2 had committed before the second read.",
              why: "Dirty needs an uncommitted value.",
            },
          ],
          result: "T1 saw ₹300 then ₹200. Non-repeatable / inconsistent read.",
        },
      ],
    },
    {
      heading: "Locks and two-phase locking",
      body: "A lock is a paper clip on a row so cashiers do not mix slips. A shared lock S means “I am reading; other readers may also clip S, but nobody may write”. An exclusive lock X means “I am writing; nobody else may read or write this row”. Two-phase locking (2PL) is a simple timetable: first only grow (take locks), then only shrink (give locks back). After you unlock anything, you must not lock anything else.\n\nWalk one ₹300 row: T1 takes X, writes 200, keeps the clip until it commits (strict 2PL). T2 waits. That blocking is how lost updates and dirty reads are stopped. Optimistic / timestamp idea in one line: instead of locking, stamp each transaction with a time and check the order at the end — or abort if a later stamp touched the row first.",
      howTo: [
        "For a read, take S. For a write, take X. If the other clip conflicts, wait.",
        "S with S is allowed. S with X is not. X with X is not.",
        "Draw a time line. All lock-takes must finish before the first unlock (2PL).",
        "If a lock is taken after an unlock, it is not 2PL.",
        "Strict 2PL: hold X until commit so nobody dirty-reads your write.",
      ],
      bullets: [
        "S = shared read. X = exclusive write.",
        "S+S yes. S+X no. X+X no.",
        "2PL: grow, then shrink. Never lock after unlock.",
        "Strict 2PL holds X until commit.",
        "OCC / timestamp: stamp the txn; check order at commit instead of locking (one exam line).",
      ],
      examples: [
        {
          title: "One writer takes X on ₹300",
          prompt:
            "A is 300. T1 wants to set A to 200. What lock? Can T2 read A at the same time?",
          code: "A = 300\nT1: write 200",
          steps: [
            {
              do: "T1 will change the box, so T1 needs an X lock on A.",
              why: "Writes take exclusive clips.",
            },
            {
              do: "T1 takes X. Box is clipped for writing.",
              why: "No second cashier should touch it.",
            },
            {
              do: "T2 wants to read. A read wants S. S conflicts with X.",
              why: "S+X is not allowed.",
            },
            {
              do: "T2 waits. T2 does not read 200 until T1’s lock story allows it.",
              why: "Waiting is the isolation tool.",
            },
            {
              do: "T1 writes 200, then later drops X (at unlock / commit).",
              why: "Then T2 may take S and read 200 if T1 committed.",
            },
            {
              do: "If T1 had only been reading, S would have been enough.",
              why: "Match lock type to the job: read S, write X.",
            },
          ],
          result: "T1 takes X. T2 cannot S-read A until X is gone.",
        },
        {
          title: "Two readers may both take S",
          prompt:
            "A is 300. T1 reads A. T2 reads A. No writes. Locks?",
          code: "T1: read A\nT2: read A",
          steps: [
            {
              do: "T1 takes S on A. Reads 300.",
              why: "Read → shared.",
            },
            {
              do: "T2 also wants to read. S+S is allowed. T2 takes S. Reads 300.",
              why: "Many readers, one box, no writer.",
            },
            {
              do: "Neither may upgrade to X while the other still holds S.",
              why: "A writer would need X, and S+X conflicts.",
            },
            {
              do: "The box stays 300. No lost update, because nobody wrote.",
              why: "Two S locks do not change rupees.",
            },
            {
              do: "If T3 arrives to withdraw, T3 waits for both S locks to go.",
              why: "X waits for readers to finish.",
            },
            {
              do: "Name: compatible shared locks.",
              why: "Exam pair: S compatible with S.",
            },
          ],
          result: "T1 S and T2 S together. Both read ₹300. No X yet.",
        },
        {
          title: "S then X must wait",
          prompt:
            "T1 holds S on A (read 300). T2 wants to write 200. What happens to T2?",
          code: "T1: S, read 300\nT2: wants X, write 200",
          steps: [
            {
              do: "T1 already holds S.",
              why: "A reader’s clip is on the row.",
            },
            {
              do: "T2 asks for X. X conflicts with S.",
              why: "Writer cannot share with a reader.",
            },
            {
              do: "T2 waits. T2 does not write 200 yet.",
              why: "Lock wait, not a dirty overwrite.",
            },
            {
              do: "T1 finishes and unlocks S.",
              why: "The reader’s clip comes off.",
            },
            {
              do: "T2 takes X, writes 200.",
              why: "Now exclusive is free.",
            },
            {
              do: "If T1 tried to read again after T2 commits, T1 would see 200 (new transaction or after unlock).",
              why: "The wait prevented T2 from writing under T1’s feet.",
            },
          ],
          result: "T2 waits for T1’s S to drop, then takes X and writes 200.",
        },
        {
          title: "Grow then shrink on two rows",
          prompt:
            "T1 locks A, locks B, writes both, unlocks A, unlocks B. Is this 2PL? Time line: XA, XB, write, UA, UB.",
          code: "grow:  lock A, lock B\nwork:  write A, write B\nshrink: unlock A, unlock B",
          steps: [
            {
              do: "First event: lock A. Growing phase starts.",
              why: "Locks only so far. No unlock yet.",
            },
            {
              do: "Second event: lock B. Still growing. Two clips taken.",
              why: "2PL allows many lock-takes in a row.",
            },
            {
              do: "Writes happen while both locks are held. Still no unlock.",
              why: "Work may sit inside the grow phase.",
            },
            {
              do: "Unlock A. Shrinking phase starts. No new lock may be taken after this.",
              why: "First unlock ends growing.",
            },
            {
              do: "Unlock B. Still shrinking. Legal.",
              why: "Only unlocks remain.",
            },
            {
              do: "This timetable is 2PL (and if unlocks wait until commit, it is strict 2PL).",
              why: "Grow, then shrink. One hill, not two.",
            },
          ],
          result: "Yes, 2PL: both locks before any unlock.",
        },
        {
          title: "Unlock then lock again fails 2PL",
          prompt:
            "T1: lock A, unlock A, lock B. Why is this not 2PL? What bug window opens on A?",
          code: "lock A → unlock A → lock B   ← illegal 2PL",
          steps: [
            {
              do: "Lock A. Growing.",
              why: "First clip.",
            },
            {
              do: "Unlock A. Shrinking has begun.",
              why: "The first unlock is the peak of the hill.",
            },
            {
              do: "Lock B after that unlock. That is a second grow. 2PL forbids it.",
              why: "Never lock after unlock.",
            },
            {
              do: "Between unlock A and later commit, another T2 could take X on A and commit.",
              why: "Early unlock is a window. Strict 2PL would have kept X until commit.",
            },
            {
              do: "T1 might then read A again (if it still needed A) and see T2’s number — a non-repeatable read — or T2 might have dirty-read T1 if T1 had written and unlocked too soon.",
              why: "2PL exists to close these mix-ups.",
            },
            {
              do: "Fix: lock A and lock B first, work, then unlock both (hold X until commit for strict 2PL).",
              why: "One growing phase, one shrinking phase.",
            },
          ],
          result: "Not 2PL. A lock after an unlock is a second growing phase.",
        },
      ],
    },
  ],
};
