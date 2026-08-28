import type { TopicNote } from "@/data/notes";

export const notesShell: TopicNote = {
  topic: "shell",
  title: "Shell — techniques (beginner)",
  blurb:
    "The shell is a typed conversation with the computer. Expand every $name on paper, then print the line. Specials to memorise: $# (how many arguments) and $? (did the last command succeed). Quote filenames that contain spaces.",
  blocks: [
    {
      heading: "Variables and quoting",
      body: "A shell variable is a labelled box: name=value with no spaces around =. Read it with $name or ${name}. Unquoted $name is split on spaces (IFS) and may glob. Double quotes still expand $name but keep it as one word. Single quotes print the dollar letters as-is — like putting a sticky note that says “$file” instead of opening the box.\n\nexport publishes the box to child programs. name=value cmd sets it for one command only.",
      howTo: [
        "Assignment is one token: count=5. Spaces around = run a command named count.",
        "Need the value as one filename → \"$file\". Need the letters dollar-f-i-l-e → '$file'.",
        "Unquoted $empty can vanish (zero words). Quote it in tests.",
        "export for children; VAR=value cmd for a one-shot.",
      ],
      bullets: [
        "name=value, no spaces. Double quotes expand; single quotes do not.",
        "Unquoted $var is split and globbed. Quote unless you mean that.",
        "export publishes to children. VAR=value cmd is per-command.",
      ],
      examples: [
        {
          title: "Three echo lines",
          prompt:
            "file='trade 2026.dat'. Then: echo $file ; echo \"$file\" ; echo '$file'.",
          code: "file='trade 2026.dat'\necho $file\necho \"$file\"\necho '$file'",
          language: "bash",
          steps: [
            {
              do: "Unquoted $file splits on the space: echo gets two words. It prints trade 2026.dat (joined with one space).",
              why: "Unquoted expansion is “tip the box onto the desk”. Spaces become word breaks.",
            },
            {
              do: "\"$file\" is one word. Same looking print, but rm \"$file\" would remove the one real file.",
              why: "Double quotes keep the spaces inside the value.",
            },
            {
              do: "'$file' prints the five characters $file.",
              why: "Single quotes are a glass case: no expansion.",
            },
          ],
          result:
            "Line1: trade 2026.dat (split). Line2: trade 2026.dat (one word). Line3: $file (literal).",
        },
        {
          title: "Spaces around = are not assignment",
          prompt: "count=2 then count = 5 then echo $count. What prints?",
          code: "count=2\ncount = 5\necho $count",
          language: "bash",
          steps: [
            {
              do: "count=2 stores 2. count = 5 is three words: run command count with arguments = and 5.",
              why: "Assignment cannot have spaces around =. The shell looks for a program named count.",
            },
            {
              do: "Usually: count: command not found. count stays 2. echo prints 2.",
              why: "The failed command did not write the box.",
            },
            {
              do: "count= 5 (space after =) would empty count, then try to run a command named 5.",
              why: "Exam: assignment is a prefix token with an equals and no unquoted spaces.",
            },
          ],
          result: "count = 5 is a command, not an assignment. echo prints 2.",
        },
        {
          title: "${x:-a} versus empty",
          prompt:
            "unset x; echo ${x:-a}; x= ; echo ${x:-a}; x=b; echo ${x:-a}; then ${y-a} with y unset vs y empty.",
          code: "unset x\necho ${x:-a}\nx=\necho ${x:-a}\nx=b\necho ${x:-a}",
          language: "bash",
          steps: [
            {
              do: "${x:-a} uses a when x is unset or empty. Prints a, then a, then b.",
              why: "The colon in :- means “unset or empty”, like a default if the box is missing or blank.",
            },
            {
              do: "${y-a} (no colon) uses a only when y is unset. Empty y prints a blank line.",
              why: "Without the colon, empty is “set, just blank” — you do not substitute.",
            },
            {
              do: "Memorise: colon ⇒ empty counts as missing.",
              why: "SEBI loves the colon. :- ?= += all follow that rule.",
            },
          ],
          result: "Prints a / a / b. Empty is not unset for ${y-a}.",
        },
      ],
    },
    {
      heading: "Special parameters: $0 $1 $# $@ $? $$ $!",
      body: "Positional parameters are the script name and the words after it. $0 is the script’s name. $1, $2, … are the arguments. $# is how many arguments (not counting $0) — like counting how many names were called out. $@ is all arguments; \"$@\" keeps each one whole even with spaces. \"$*\" mashes them into one word.\n\n$? is the exit status of the last foreground pipeline: 0 means success (true in if). $$ is this shell’s process id. $! is the id of the last background job. shift throws away $1 and renumbers.",
      howTo: [
        "Write the invocation line. Fill a table: $0, $#, $1, $2, then expand each echo.",
        "Forward arguments with \"$@\", never bare $@, never \"$*\" unless you want one mashed word.",
        "Pipeline $? is the last command unless pipefail is on. false | true → 0.",
        "$? after echo is echo’s status (0), not the previous failure — print it in the same echo as status=$? .",
      ],
      bullets: [
        "$0 name; $1… args; $# count; \"$@\" each arg separately; \"$*\" one word.",
        "$? last status (0 = success). $$ this PID. $! last background PID.",
        "Always quote \"$@\" when forwarding. Bare $@ splits on spaces.",
      ],
      examples: [
        {
          title: "Trace $0 $1 $# $?",
          prompt:
            "bash /home/desk/show.sh INEA INEB. Script echoes $0, $1, $2, $#, then true, then $?. PID 4421.",
          code: "echo zero=$0\necho one=$1\necho two=$2\necho hash=$#\ntrue\necho status=$?\necho pid=$$",
          language: "bash",
          steps: [
            {
              do: "$0=/home/desk/show.sh, $1=INEA, $2=INEB, $#=2.",
              why: "$# counts arguments, not the script name. Like “how many names after the command”.",
            },
            {
              do: "true succeeds, so $? is 0. $$ is 4421.",
              why: "0 is success in the shell (the opposite of C’s true=1).",
            },
            {
              do: "$@ and $* look the same here because neither argument has a space. They differ when quoted with spaces (next example).",
              why: "The difference is visible with \"$@\" versus \"$*\".",
            },
          ],
          result:
            "zero=/home/desk/show.sh ; one=INEA ; two=INEB ; hash=2 ; status=0 ; pid=4421.",
        },
        {
          title: "\"$@\" versus \"$*\" with a space",
          prompt:
            "bash show.sh 'trade 1' INEB. printf '<%s>\\n' with \"$@\", then \"$*\", then unquoted $@.",
          code: "printf '<%s>\\n' \"$@\"\nprintf '<%s>\\n' \"$*\"\nprintf '<%s>\\n' $@",
          language: "bash",
          steps: [
            {
              do: "\"$@\" → two lines <trade 1> and <INEB>.",
              why: "Each argument stays one word, space and all — the safe tray of plates.",
            },
            {
              do: "\"$*\" → one line <trade 1 INEB>.",
              why: "All arguments glued with the first IFS character (usually space).",
            },
            {
              do: "Unquoted $@ splits: <trade> <1> <INEB> — three lines. The spaced name is destroyed.",
              why: "Wrappers must use cmd \"$@\". cmd $@ is always wrong for filenames.",
            },
          ],
          result:
            "\"$@\" two lines. \"$*\" one mashed line. Unquoted $@ three lines.",
        },
        {
          title: "$? after a pipeline",
          prompt: "true | false ; echo $?   then   false | true ; echo $?   then   false ; echo status=$?",
          code: "true | false\necho $?\nfalse | true\necho $?\nfalse\necho status=$?",
          language: "bash",
          steps: [
            {
              do: "true | false → last command is false → $? is 1. false | true → last is true → $? is 0.",
              why: "Default pipeline status is the last stage. pipefail (off by default) would also look at true.",
            },
            {
              do: "false ; echo status=$? prints status=1. After that echo, $? becomes 0 because echo succeeded.",
              why: "If you echo $? on a later line, you print echo’s success, not false. Capture immediately.",
            },
            {
              do: "ls on a missing path is non-zero (often 2). Treat as “non-zero” if the paper is vague.",
              why: "The exam wants “success is 0; anything else is failure” more than the exact code.",
            },
          ],
          result:
            "true|false → 1. false|true → 0 (no pipefail). false then echo status=$? → status=1.",
        },
      ],
    },
    {
      heading: "[ ] tests: spaces, -f, -z",
      body: "[ is a command (another name for test). ] is its last argument. Spaces are required: [ -f \"$f\" ] is several words. [-f \"$f\"] looks for a program named [-f. Think of [ as a verb that needs gaps between its toys.\n\n-f regular file, -d directory, -e exists. -z string is true if length 0. -n is non-empty. = is string compare; -eq is integer. Always quote \"$var\": unquoted empty becomes [ -z ] and test errors.",
      howTo: [
        "Write spaces: [ -f \"$f\" ]. Missing space ⇒ not a test.",
        "Quote the operand. Empty unquoted vars eat the operator.",
        "-z is length, not “numeric zero”. The character 0 has length 1.",
        "Prefer [ -f \"$f\" ] && [ -r \"$f\" ] over old -a inside one test.",
      ],
      bullets: [
        "[ is test. Spaces required. Missing spaces ⇒ command not found or a glued operand.",
        "-f file, -d directory, -z empty string, -n non-empty, -eq numeric, = string.",
        "Quote \"$var\". 0 is not empty.",
      ],
      examples: [
        {
          title: "Four spellings of a file test",
          prompt:
            "f=trade.dat exists. [ -f \"$f\" ] ; [-f \"$f\"] ; [ -f\"$f\" ] ; [ -f $f ].",
          code: "f=trade.dat\n[ -f \"$f\" ]\n[-f \"$f\"]\n[ -f\"$f\" ]\n[ -f $f ]",
          language: "bash",
          steps: [
            {
              do: "[ -f \"$f\" ] succeeds (status 0). [-f \"$f\"] is command not found (127).",
              why: "Without a space after [, the shell does not run test. It searches PATH for [-f.",
            },
            {
              do: "[ -f\"$f\" ] glues to -ftrade.dat. POSIX [ string ] is true if the string is non-empty — true for the wrong reason.",
              why: "You never checked the file. Deadly coincidence.",
            },
            {
              do: "Unquoted [ -f $f ] works only because f has no space. 'trade 2026.dat' would break it.",
              why: "Only the first form is always right.",
            },
          ],
          result:
            "[ -f \"$f\" ] succeeds. [-f \"$f\"] is command not found. Glued -f does not test the file.",
        },
        {
          title: "-z on unset, empty, and 0",
          prompt: "unset a; a= ; a=0 ; a=trade. [ -z \"$a\" ] each time. Then a= ; [ -z $a ] unquoted.",
          code: "unset a\n[ -z \"$a\" ]   # true\na=\n[ -z \"$a\" ]   # true\na=0\n[ -z \"$a\" ]   # false",
          language: "bash",
          steps: [
            {
              do: "-z is true for unset and empty. False for 0 and for trade.",
              why: "0 is a character. Length 1. -z is not a numeric test.",
            },
            {
              do: "Unquoted [ -z $a ] with empty a becomes [ -z ] — missing argument, test errors (status 2).",
              why: "The empty value vanished, so -z had nothing to measure. Quote.",
            },
            {
              do: "-n is the opposite of -z on a quoted string.",
              why: "Non-empty versus empty. Still not “is this the number zero”.",
            },
          ],
          result:
            "-z true for unset and empty; false for 0. Unquoted empty errors. 0 is non-empty.",
        },
        {
          title: "-f versus -d versus -e",
          prompt: "/etc (dir), /etc/passwd (file), /no/such. Fill -e -f -d for each.",
          code: "[ -e /etc ]; [ -f /etc ]; [ -d /etc ]\n[ -e /etc/passwd ]; [ -f /etc/passwd ]; [ -d /etc/passwd ]",
          language: "bash",
          steps: [
            {
              do: "/etc: exists, not a regular file, is a directory → e T, f F, d T.",
              why: "-f means “plain file”, not “anything on disk”. A folder fails -f.",
            },
            {
              do: "/etc/passwd: e T, f T, d F. /no/such: all F.",
              why: "Missing path fails every existence test. -f does not tell you “missing” versus “is a directory” — use -e or -d too.",
            },
            {
              do: "True test status is 0. In shell, 0 is success (if treats 0 as true).",
              why: "Do not mix with C, where 0 is false.",
            },
          ],
          result: "/etc: e=T f=F d=T. /etc/passwd: e=T f=T d=F. /no/such: all F.",
        },
      ],
    },
    {
      heading: "if / for / while",
      body: "if cmd; then … fi runs the then-branch when cmd’s status is 0. The condition is a command, not a boolean type. if grep -q INEA file; then is idiomatic.\n\nfor name in word-list walks words, not lines (unless you change IFS). for f in *.dat uses globbing; quote \"$f\" inside. while cmd; do … done repeats while cmd succeeds. while read -r line; do … done < file reads lines. A last line without a newline can be skipped unless you add || [ -n \"$line\" ].",
      howTo: [
        "if uses the command’s exit status. 0 → then. Non-zero → else.",
        "Loop over arguments with for f in \"$@\". Never for f in $(ls …) when names can have spaces.",
        "Attach < file to the whole while-read loop.",
        "Test --help before the “need two args” guard if both should work.",
      ],
      bullets: [
        "if cmd; then … fi — then-branch if cmd returns 0.",
        "for x in list: words. Quote \"$x\". Nullglob off leaves a literal *.",
        "while read -r line; do … done < file. Missing final newline can drop the last line.",
      ],
      examples: [
        {
          title: "if/elif on $#",
          prompt:
            "if [ $# -lt 2 ]; then echo usage; exit 1; elif [ \"$1\" = --help ]; then echo help; else echo run … fi. Try: no args; --help alone; INEA INEB; --help INEB.",
          code: "if [ $# -lt 2 ]; then\n  echo usage\n  exit 1\nelif [ \"$1\" = --help ]; then\n  echo help\nelse\n  echo run \"$1\" \"$2\"\nfi",
          language: "bash",
          steps: [
            {
              do: "0 args and --help alone both hit $# -lt 2 → usage, status 1. --help never reaches elif.",
              why: "The arity guard wins first. That is a script bug exams like you to spot.",
            },
            {
              do: "INEA INEB → else: run INEA INEB. --help INEB → help (INEB ignored).",
              why: "Once $# is 2, the elif can see $1.",
            },
            {
              do: "To allow --help with no extra args, test help first, then $#.",
              why: "Order of if tests is the whole story.",
            },
          ],
          result:
            "0 args → usage (1). --help alone → usage (1). INEA INEB → run. --help INEB → help (0).",
        },
        {
          title: "for over \"$@\" with a spaced name",
          prompt:
            "bash s.sh 'trade 1.dat' miss.dat. Loop: if [ -f \"$f\" ]; then echo has; else echo miss. First file exists.",
          code: "for f in \"$@\"; do\n  if [ -f \"$f\" ]; then echo has \"$f\"\n  else echo miss \"$f\"\n  fi\ndone",
          language: "bash",
          steps: [
            {
              do: "Two iterations: has trade 1.dat ; miss miss.dat.",
              why: "\"$@\" keeps the spaced name as one f.",
            },
            {
              do: "Unquoted for f in $@ would split into trade, 1.dat, miss.dat — three loops, mostly misses.",
              why: "Same trap as echo $file.",
            },
            {
              do: "for f in \"$*\" is one iteration with both names inside f — [ -f ] looks for a single impossible filename.",
              why: "\"$*\" is one mashed argument.",
            },
          ],
          result:
            "has trade 1.dat ; miss miss.dat. Unquoted $@ would have split the first name.",
        },
        {
          title: "Glob versus $(ls) with a space in the name",
          prompt:
            "Files a.dat, b.dat, and c d.dat. for f in $(ls *.dat) versus for f in *.dat.",
          code: "for f in $(ls *.dat); do echo \"$f\"; done\nfor f in *.dat; do echo \"$f\"; done",
          language: "bash",
          steps: [
            {
              do: "$(ls *.dat) word-splits: a.dat, b.dat, c, d.dat — four wrong iterations.",
              why: "Command substitution is unquoted, so spaces in names become breaks. Parsing ls is a smell.",
            },
            {
              do: "for f in *.dat globs to three words; c d.dat stays one match.",
              why: "Globbing does not split on spaces inside a filename.",
            },
            {
              do: "If no .dat files and nullglob is off, the loop runs once with f='*.dat'. [ -f \"$f\" ] then fails.",
              why: "A literal star is the empty-directory trap. Skip with a file test.",
            },
          ],
          result:
            "Glob keeps c d.dat as one item. $(ls) splits it into c and d.dat.",
        },
      ],
    },
    {
      heading: "Functions: return versus exit",
      body: "A function is a named recipe: name() { list; }. Inside, $1 is the function’s argument, not the script’s, unless you passed \"$@\". return N leaves the function; the script continues. exit N leaves the whole script (the process) — like walking out of the building instead of finishing the recipe.\n\nif f; then tests the function’s status (return value, or the last command). Status wraps modulo 256; return 256 is 0 in bash — accidental true.",
      howTo: [
        "Need to stop only the recipe → return. Need to stop the script → exit (usually in main, not in helpers).",
        "After f, $? is f’s status until another command runs.",
        "Function $1…$# are the call’s arguments. Script $1 is restored after return.",
        "exit from a function still runs EXIT traps, then the process dies.",
      ],
      bullets: [
        "return: leave the function. exit: leave the process (the script).",
        "Function $1…$# are the call’s arguments, not the script’s, unless you passed \"$@\".",
        "if f; then uses the function’s status; 0 is true.",
      ],
      examples: [
        {
          title: "return 3 versus exit 3",
          prompt:
            "f returns 3 after echo in-f. Then echo after=$?. g exits 3 after echo in-g. Then echo never.",
          code: "f() { echo in-f; return 3; echo dead; }\nf\necho after=$?\ng() { echo in-g; exit 3; echo also-dead; }\ng\necho never",
          language: "bash",
          steps: [
            {
              do: "f prints in-f, skips dead, script prints after=3.",
              why: "return hands a status back and continues the caller.",
            },
            {
              do: "g prints in-g, then exit 3 kills the script. also-dead and never do not run. Process status 3.",
              why: "exit is “leave the building”. The OS sees 3.",
            },
            {
              do: "If g had returned 3, never would print and the script would likely end 0 from echo.",
              why: "That is why helpers should return, not exit — unless you really mean “abort everything”.",
            },
          ],
          result:
            "return 3 continues (after=3). exit 3 stops after in-g; never is not printed; process status 3.",
        },
        {
          title: "Function $1 versus script $1",
          prompt:
            "bash s.sh INEA INEB. echo s1=$1; f X (function echoes f1 and $#); echo s1again=$1.",
          code: "f() { echo f0=$0 f1=$1 fhash=$#; }\necho s1=$1\nf X\necho s1again=$1",
          language: "bash",
          steps: [
            {
              do: "Script $1 is INEA. After f X, function $1 is X and $# is 1. Then s1again is still INEA.",
              why: "A function gets its own argument list, like a helper who is handed one tool. The script’s list is saved and restored.",
            },
            {
              do: "f \"$@\" would have set the function’s $1 to INEA and $# to 2.",
              why: "That is how you forward the original arguments.",
            },
            {
              do: "$0 stays the script name (as invoked).",
              why: "Functions do not rename the program.",
            },
          ],
          result:
            "s1=INEA; f sees $1=X and $#=1; s1again=INEA.",
        },
        {
          title: "if f ; then",
          prompt: "ok returns 0; bad returns 5. if ok; if bad; then bad; echo last=$?",
          code: "ok() { return 0; }\nbad() { return 5; }\nif ok; then echo A; else echo B; fi\nif bad; then echo C; else echo D; fi\nbad\necho last=$?",
          language: "bash",
          steps: [
            {
              do: "ok → then → A. bad → else → D. Then last=5.",
              why: "if treats 0 as true and any other status as false.",
            },
            {
              do: "return 256 becomes 0 in bash (mod 256). Stay in 0–255.",
              why: "A wrapped 0 looks like success — a nasty true.",
            },
            {
              do: "An empty function body returns 0. A body without return uses the last command’s status.",
              why: "Falling off the end is still a status.",
            },
          ],
          result: "A then D then last=5. if uses the function’s return status.",
        },
      ],
    },
    {
      heading: "Pipes and redirection",
      body: "cmd1 | cmd2 connects cmd1’s stdout to cmd2’s stdin — a hose. Both run together. Status is cmd2’s unless pipefail. > file wipes the file then writes stdout. >> appends. 2> sends stderr. 2>&1 after > file pours stderr into the same file.\n\nOrder trap: cmd 2>&1 > file first points stderr at the terminal, then points stdout at the file, so errors still show on screen. You wanted > file 2>&1.",
      howTo: [
        "> wipe-and-write stdout. >> append. 2> stderr. Merge with > file 2>&1 (2>&1 last).",
        "Trace a pipeline stage by stage: who reads the file, who reads the hose, what is printed.",
        "Redirecting the whole script (bash s.sh > log 2>&1) catches every echo, including stderr.",
        "Empty grep still lets wc print 0; pipeline status is wc’s 0 unless pipefail.",
      ],
      bullets: [
        "> truncates stdout; >> appends; 2> stderr; > file 2>&1 merges.",
        "cmd1 | cmd2 : stdout1 → stdin2. Status is cmd2 unless pipefail.",
        "2>&1 > file leaves stderr on the terminal. That is the trap.",
      ],
      examples: [
        {
          title: "> versus >>",
          prompt: "echo one > log ; echo two > log ; echo three >> log ; cat log.",
          code: "echo one > log\necho two > log\necho three >> log\ncat log",
          language: "bash",
          steps: [
            {
              do: "First > creates log with one. Second > wipes it; now two. >> adds three.",
              why: "> is “new page”. >> is “write at the bottom”.",
            },
            {
              do: "cat prints two then three. Line one is gone.",
              why: "The second truncate threw it away.",
            },
            {
              do: "If the redirect cannot open the file, echo does not run.",
              why: "The shell opens the file before starting the command.",
            },
          ],
          result: "cat prints two / three. The second > wiped one.",
        },
        {
          title: "2>&1 merge order",
          prompt:
            "cmd prints stdout-line and stderr-line. Compare (a) > out 2> err (b) > both 2>&1 (c) 2>&1 > both.",
          code: "cmd() { echo stdout-line; echo stderr-line >&2; }\ncmd > out 2> err\ncmd > both 2>&1\ncmd 2>&1 > both2",
          language: "bash",
          steps: [
            {
              do: "(a) split files. (b) both lines in both (stderr follows stdout to the file).",
              why: "2>&1 means “stderr, copy whatever stdout currently is”. Do that after > file.",
            },
            {
              do: "(c) 2>&1 first clones the terminal; then > both2 moves only stdout. stderr stays on the terminal.",
              why: "This is the classic order bug. Draw the arrows in time.",
            },
            {
              do: "Silent everything: > /dev/null 2>&1. Keep stdout, hide errors: 2> /dev/null.",
              why: "/dev/null is the bin.",
            },
          ],
          result:
            "(a) split. (b) > both 2>&1 merges. (c) 2>&1 > file leaves stderr on the terminal.",
        },
        {
          title: "grep | wc -l",
          prompt:
            "t.txt: INEA 10, INEB 4, INEA 7, INEC 1. grep INEA t.txt | wc -l then grep INEA | grep -v 10 | wc -l.",
          code: "grep INEA t.txt | wc -l\ngrep INEA t.txt | grep -v 10 | wc -l",
          language: "bash",
          steps: [
            {
              do: "First grep emits two INEA lines. wc -l prints 2.",
              why: "The hose carries those two lines. wc reads the hose, not the file, so no filename column.",
            },
            {
              do: "grep -v 10 drops the line containing 10. One line left. wc prints 1.",
              why: "-v is invert-match: keep lines that do not contain the pattern.",
            },
            {
              do: "If grep matches nothing it exits 1, but wc still prints 0 and (without pipefail) the pipeline is 0.",
              why: "Status is the last command. That is the same trap as false | true.",
            },
          ],
          result: "First pipeline prints 2. Second prints 1 (INEA 7 only).",
        },
      ],
    },
    {
      heading: "chmod, grep, wc, kill",
      body: "chmod sets permission bits. Octal digits are owner, group, other. Each digit is 4 read + 2 write + 1 execute. 754 is rwxr-xr--. 644 is a typical file; 755 a typical script or directory.\n\ngrep prints matching lines (-i case, -v invert, -c count, -E extra regex). Status 0 if any match, 1 if none. wc -l lines, -w words, -c bytes. kill PID sends SIGTERM (15, polite); kill -9 is SIGKILL (cannot be caught). Use $! for the background child, not $$ (that is the shell itself).",
      howTo: [
        "Decode octal left to right: u, g, o. Add 4/2/1 for r/w/x.",
        "grep -c counts matching lines; wc -l counts all lines on its stdin.",
        "TERM first, wait, then -9 only if it is still alive. Do not kill $$ when you meant $!.",
        "Directory execute bit is “search / cd”. Files 644, dirs 755 is the exam default.",
      ],
      bullets: [
        "chmod octal: 4r 2w 1x per u/g/o. 754 = rwxr-xr--.",
        "grep -i -v -c -n -E -q. Status 0 match, 1 no match.",
        "kill PID = SIGTERM 15. kill -9 = SIGKILL. $! is the background child.",
      ],
      examples: [
        {
          title: "chmod 754 then a symbolic tweak",
          prompt:
            "Start 644. chmod 754 trade.sh then chmod o+w,g-x. Bits after each? Who can execute after 754?",
          code: "chmod 754 trade.sh\nchmod o+w,g-x trade.sh",
          language: "bash",
          steps: [
            {
              do: "754 = owner rwx (7), group r-x (5), other r (4). Owner and group can execute.",
              why: "7=4+2+1, 5=4+1, 4=read only. Execute on a file means “run this script”.",
            },
            {
              do: "o+w gives other write; g-x takes group execute. Final rwx r-- rw- = 746.",
              why: "Symbolic chmod adds or subtracts one bit family. Owner stayed rwx.",
            },
            {
              do: "chmod +x is a+x (all three). It is not automatically 755 unless you started from 644 with no x.",
              why: "644 + execute on u,g,o = 755. From 746, a+x would be 757.",
            },
          ],
          result:
            "After 754: rwxr-xr-- (owner+group execute). After o+w,g-x: rwxr--rw- (746).",
        },
        {
          title: "grep -c -v -E",
          prompt:
            "alerts.txt: nse INEA, BSE ineb, nse INEC, nse inea. grep nse | wc -l ; grep -c nse ; grep -v nse ; grep -E 'INE[AB]'.",
          code: "grep nse alerts.txt | wc -l\ngrep -c nse alerts.txt\ngrep -v nse alerts.txt\ngrep -E 'INE[AB]' alerts.txt",
          language: "bash",
          steps: [
            {
              do: "Case-sensitive nse matches lines 1, 3, 4 (not BSE ineb). Count 3. -v prints only BSE ineb.",
              why: "-c and wc -l agree here because every matching line is printed once.",
            },
            {
              do: "-E 'INE[AB]' is INEA or INEB, case-sensitive → only line 1 (nse INEA). ineb/inea fail case; INEC fails [AB].",
              why: "-E is extended regex. Add -i to pull inea/ineb in as well.",
            },
            {
              do: "grep -ci nse still 3 here (line 2 has no nse substring even ignoring case).",
              why: "BSE ≠ nse. -i does not invent letters that are not there.",
            },
          ],
          result:
            "nse count 3; -v prints BSE ineb; -E 'INE[AB]' prints only nse INEA.",
        },
        {
          title: "kill $! not $$",
          prompt:
            "sleep 300 & ; echo pid=$! ; kill -s TERM $! . sleep does not trap TERM. Why is kill -9 usually unnecessary? Why not kill $$?",
          code: "sleep 300 &\necho pid=$!\nkill -s TERM $!",
          language: "bash",
          steps: [
            {
              do: "$! is the sleep PID. TERM (default kill) is enough; sleep dies. ps then misses it.",
              why: "Untrapped TERM ends the process. -9 is the last resort because the process cannot flush files.",
            },
            {
              do: "kill $$ would signal the shell running the script, not the sleep.",
              why: "$$ is “me”. $! is “the child I just backgrounded”.",
            },
            {
              do: "Starting & succeeds, so $? is 0 even while sleep is still running. wait $! to see sleep’s real status.",
              why: "Background start is not “sleep finished”.",
            },
          ],
          result:
            "TERM is enough for untrapped sleep. Use $!, not $$. -9 only if it ignored TERM.",
        },
      ],
    },
  ],
};
