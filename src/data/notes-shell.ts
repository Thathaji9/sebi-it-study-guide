import type { TopicNote } from "@/data/notes";

export const notesShell: TopicNote = {
  topic: "shell",
  title: "Shell — simple notes",
  blurb:
    "We explain the UNIX shell like class notes a Class-10 student can read: a clerk who types commands, labelled jars, quotes that keep spaces as one word. Then we solve five tiny examples in each topic, one line at a time.",
  blocks: [
    {
      heading: "Variables and quoting",
      body: "The shell is a clerk who types commands for UNIX. A variable is a labelled jar: name=value with no spaces around =. Read it with $name or ${name}. Quotes keep spaces as one word. Double quotes still open the jar ($file becomes the value) but keep it as one word. Single quotes print the dollar letters as-is — a sticky note that says “$file” instead of opening the jar. Unquoted $name is split on spaces and may glob.\n\nexport publishes the jar to child programs. name=value cmd sets it for one command only. Unquoted empty can vanish (zero words). Quote it in tests. Assignment is one token: count=5. Spaces around = run a command named count.",
      howTo: [
        "Assignment is one token: count=5. Spaces around = run a command named count.",
        "Need the value as one filename → \"$file\". Need the letters dollar-f-i-l-e → '$file'.",
        "Unquoted $empty can vanish (zero words). Quote it in tests.",
        "export for children; VAR=value cmd for a one-shot.",
        "Hash on a name (${#lot}) is “how many characters in the jar”. Hash alone ($#) is “how many arguments”.",
      ],
      bullets: [
        "Shell = a clerk who types commands for UNIX.",
        "$name = a labelled jar. name=value, no spaces around =.",
        "Quotes keep spaces as one word. Double quotes expand; single quotes do not.",
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
              why: "Unquoted expansion tips the jar onto the desk. Spaces become word breaks.",
            },
            {
              do: "\"$file\" is one word. Same looking print, but rm \"$file\" would remove the one real file.",
              why: "Quotes keep spaces as one word. Double quotes still open the jar.",
            },
            {
              do: "'$file' prints the five characters $file.",
              why: "Single quotes are a glass case: no expansion. The sticky note says “$file”.",
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
              why: "Assignment cannot have spaces around =. The clerk looks for a program named count.",
            },
            {
              do: "Usually: count: command not found. count stays 2. echo prints 2.",
              why: "The failed command did not write the jar.",
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
              why: "The colon in :- means “unset or empty”, like a default if the jar is missing or blank.",
            },
            {
              do: "${y-a} (no colon) uses a only when y is unset. Empty y prints a blank line.",
              why: "Without the colon, empty is “set, just blank” — you do not substitute.",
            },
            {
              do: "Memorise: colon ⇒ empty counts as missing.",
              why: "The exam loves the colon. :- ?= += all follow that rule.",
            },
          ],
          result: "Prints a / a / b. Empty is not unset for ${y-a}.",
        },
        {
          title: "export versus one-shot VAR=value cmd",
          prompt:
            "PATH is the usual path. Then: TRACE=1 show.sh ; echo TRACE=$TRACE ; export TRACE=1 ; show.sh. Child show.sh prints TRACE=${TRACE:-unset}. What prints?",
          code: "TRACE=1 ./show.sh\necho TRACE=$TRACE\nexport TRACE=1\n./show.sh",
          language: "bash",
          steps: [
            {
              do: "TRACE=1 ./show.sh sets TRACE only for that child. The child prints TRACE=1.",
              why: "name=value cmd is a one-shot sticker on that command, not on your clerk’s desk.",
            },
            {
              do: "After it returns, echo TRACE=$TRACE in the parent prints TRACE= (empty) if TRACE was never set in this shell.",
              why: "The one-shot did not write the parent’s jar. export was not used yet.",
            },
            {
              do: "export TRACE=1 publishes the jar. The second ./show.sh also prints TRACE=1, and the parent now has TRACE=1 too.",
              why: "export is “put this on the tray that children inherit”.",
            },
            {
              do: "TRACE=1 without export, then ./show.sh as a separate line, would still print unset in the child.",
              why: "A shell variable is private until exported. Assignment alone is not a passport.",
            },
            {
              do: "Quote if the value has spaces: NOTE='lot 14' ./show.sh, not NOTE=lot 14 ./show.sh (that would run 14 as a command).",
              why: "Word splitting happens before the child starts. Quotes keep spaces as one word.",
            },
          ],
          result:
            "One-shot: child sees 1, parent TRACE still empty. export: both see 1. Bare TRACE=1 does not pass to a later child.",
        },
        {
          title: "rm $lot versus rm \"$lot\"",
          prompt:
            "lot='fill 18.csv' exists as one file. Compare rm $lot with rm \"$lot\" and echo ${#lot}.",
          code: "lot='fill 18.csv'\necho ${#lot}\nrm $lot\nrm \"$lot\"",
          language: "bash",
          steps: [
            {
              do: "${#lot} is 11 (length of the value: f-i-l-l-space-1-8-.-c-s-v). It is not $# (argument count).",
              why: "Hash on a name is “how many characters in the jar”. Hash alone is “how many arguments”.",
            },
            {
              do: "Unquoted rm $lot becomes rm fill 18.csv — two arguments. rm looks for a file named fill and a file named 18.csv, not the real name.",
              why: "Unquoted expansion splits on spaces. That is tipping the jar onto the desk.",
            },
            {
              do: "rm \"$lot\" is one word and removes fill 18.csv.",
              why: "Quotes keep spaces as one word. That is the filename form.",
            },
            {
              do: "rm '$lot' would look for a file whose name is the five characters dollar-l-o-t.",
              why: "Single quotes are a glass case: no expansion.",
            },
            {
              do: "Always quote \"$lot\" in tests and in rm/mv/cp unless you mean globbing and splitting.",
              why: "Exam default: quote. Unquoted is a deliberate split.",
            },
          ],
          result:
            "${#lot}=11. rm $lot splits into fill and 18.csv. rm \"$lot\" removes the one real file.",
        },
      ],
    },
    {
      heading: "Special parameters: $0 $1 $# $@ $? $$ $!",
      body: "Positional parameters are the script name and the words after it. $0 is the script’s name. $1, $2, … are the arguments. $# is how many arguments (not counting $0) — like counting how many names were called out. $@ is all arguments; \"$@\" keeps each one whole even with spaces. \"$*\" mashes them into one word.\n\n$? is whether the last job succeeded: 0 means yes (true in if). $$ is this shell’s process id. $! is the id of the last background job. shift throws away $1 and renumbers. Pipeline $? is the last command unless pipefail is on. false | true → 0. $? after echo is echo’s status (0) — print it in the same echo as status=$? .",
      howTo: [
        "Write the invocation line. Fill a table: $0, $#, $1, $2, then expand each echo.",
        "Forward arguments with \"$@\", never bare $@, never \"$*\" unless you want one mashed word.",
        "Pipeline $? is the last command unless pipefail is on. false | true → 0.",
        "$? after echo is echo’s status (0), not the previous failure — print it in the same echo as status=$? .",
        "shift drops $1 and slides everyone left. $0 does not change.",
      ],
      bullets: [
        "$0 name; $1… args; $# = how many arguments; \"$@\" each arg separately; \"$*\" one word.",
        "$? = did the last job succeed (0 = yes). $$ this PID. $! last background PID.",
        "Always quote \"$@\" when forwarding. Bare $@ splits on spaces.",
        "shift throws away $1 and renumbers. It never consumes $0.",
        "Capture $? immediately. The next echo overwrites it with 0.",
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
              why: "$# is how many arguments, not the script name. Like “how many names after the command”.",
            },
            {
              do: "true succeeds, so $? is 0. $$ is 4421.",
              why: "$? = did the last job succeed. 0 means yes (the opposite of C’s true=1).",
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
              why: "Each argument stays one word, space and all — quotes keep spaces as one word.",
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
              why: "Default pipeline status is the last stage. $? = did that last job succeed (0 = yes).",
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
        {
          title: "shift then $1 and $#",
          prompt:
            "bash pack.sh LOTA LOTB LOTC. Script: echo before=$# $1; shift; echo after=$# $1; shift; echo last=$# $1.",
          code: "echo before=$# $1\nshift\necho after=$# $1\nshift\necho last=$# $1",
          language: "bash",
          steps: [
            {
              do: "Start: $0=pack.sh (or the path used), $1=LOTA, $2=LOTB, $3=LOTC, $#=3.",
              why: "$# is how many arguments, not the script name.",
            },
            {
              do: "First shift throws LOTA away and renumbers. Now $1=LOTB, $2=LOTC, $#=2. before printed 3 LOTA.",
              why: "shift is “drop the first name on the roll and slide everyone left”.",
            },
            {
              do: "Second shift: $1=LOTC, $#=1. after printed 2 LOTB. last prints 1 LOTC.",
              why: "Each shift reduces $# by one (until there are no arguments left).",
            },
            {
              do: "$0 does not change. A third shift would make $#=0 and $1 empty.",
              why: "The script name is not an argument. You cannot shift it away.",
            },
            {
              do: "A loop while [ $# -gt 0 ]; do echo \"$1\"; shift; done walks LOTA, LOTB, LOTC without globbing.",
              why: "That is the classic “eat arguments” pattern. Quote \"$1\" in case a name has a space.",
            },
          ],
          result:
            "before=3 LOTA; after=2 LOTB; last=1 LOTC. $0 stays pack.sh. shift never consumes $0.",
        },
        {
          title: "Capture $? before the next echo",
          prompt:
            "ls /no/such/pack ; echo first=$? ; echo second=$? . Then true; x=$?; false; echo keep=$x now=$? .",
          code: "ls /no/such/pack\necho first=$?\necho second=$?\ntrue\nx=$?\nfalse\necho keep=$x now=$?",
          language: "bash",
          steps: [
            {
              do: "ls on a missing path is non-zero (often 2). first=$? prints that non-zero.",
              why: "$? is the last foreground job. Capture it immediately.",
            },
            {
              do: "second=$? prints 0, because the previous echo succeeded.",
              why: "echo overwrites $?. A later echo $? is echo’s success (0 = yes), not ls.",
            },
            {
              do: "true; x=$? stores 0 in x. false then echo keep=$x now=$? prints keep=0 now=1.",
              why: "Saving $? in a variable freezes the old status. now=$? is false’s 1.",
            },
            {
              do: "Do not write echo $? on a following line if you still need the failure code for if or exit.",
              why: "The exam trap is “they printed 0 after a failed ls”.",
            },
            {
              do: "$$ is this shell’s PID, not a status. $! is the last background PID. Do not mix them with $?.",
              why: "Three different jars: status, me, my background child.",
            },
          ],
          result:
            "first=non-zero (ls). second=0 (echo). keep=0 now=1. Save $? before the next command.",
        },
      ],
    },
    {
      heading: "[ ] tests: spaces, -f, -z",
      body: "[ is a command (another name for test). ] is its last argument. Spaces are required: [ -f \"$f\" ] is several words. [-f \"$f\"] looks for a program named [-f. Think of [ as a verb that needs gaps between its toys.\n\n-f regular file, -d directory, -e exists. -z string is true if length 0. -n is non-empty. = is string compare; -eq is integer. Always quote \"$var\": unquoted empty becomes [ -z ] and test errors. -z is length, not “numeric zero”. The character 0 has length 1. True test status is 0 (success).",
      howTo: [
        "Write spaces: [ -f \"$f\" ]. Missing space ⇒ not a test.",
        "Quote the operand. Empty unquoted vars eat the operator.",
        "-z is length, not “numeric zero”. The character 0 has length 1.",
        "Prefer [ -f \"$f\" ] && [ -r \"$f\" ] over old -a inside one test.",
        "Use = for text, -eq for integers. 08 equals 8 for -eq, not for =.",
      ],
      bullets: [
        "[ is test. Spaces required. Missing spaces ⇒ command not found or a glued operand.",
        "-f file, -d directory, -z empty string, -n non-empty, -eq numeric, = string.",
        "Quote \"$var\". 0 is not empty.",
        "True test status is 0. In the shell, 0 means yes.",
        "Unquoted empty becomes [ -z ] or [ -eq 8 ] and test errors.",
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
              why: "Without a space after [, the clerk does not run test. It searches PATH for [-f.",
            },
            {
              do: "[ -f\"$f\" ] glues to -ftrade.dat. POSIX [ string ] is true if the string is non-empty — true for the wrong reason.",
              why: "You never checked the file. Deadly coincidence.",
            },
            {
              do: "Unquoted [ -f $f ] works only because f has no space. 'trade 2026.dat' would break it.",
              why: "Quotes keep spaces as one word. Only the first form is always right.",
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
              why: "$? = did the last job succeed (0 = yes). Do not mix with C, where 0 is false.",
            },
          ],
          result: "/etc: e=T f=F d=T. /etc/passwd: e=T f=T d=F. /no/such: all F.",
        },
        {
          title: "String = versus numeric -eq",
          prompt:
            "a=08; b=8; [ \"$a\" = \"$b\" ]; [ \"$a\" -eq \"$b\" ]; [ 08 -eq 8 ]. Which are true? What about [ 08 -eq 08 ] in a strict integer test?",
          code: "a=08\nb=8\n[ \"$a\" = \"$b\" ]\n[ \"$a\" -eq \"$b\" ]",
          language: "bash",
          steps: [
            {
              do: "[ \"$a\" = \"$b\" ] compares text. 08 is not the same letters as 8 → false.",
              why: "= is string compare, like matching spellings on a form.",
            },
            {
              do: "[ \"$a\" -eq \"$b\" ] compares integers. 08 equals 8 → true in bash test (leading zeros allowed here).",
              why: "-eq is numeric. 0 is not empty, and 08 is a number eight for -eq.",
            },
            {
              do: "[ \"$a\" -gt \"$b\" ] is false (8 is not greater than 8). [ \"$a\" = 08 ] would be true (same letters).",
              why: "Pick the operator that matches the English: “same digits on the page” versus “same integer”.",
            },
            {
              do: "Spaces still required: [\"$a\"=\"$b\"] is not a test.",
              why: "[ is a command. Glueing the arguments invents a different program.",
            },
            {
              do: "Always quote \"$a\". Empty unquoted [ $a -eq 8 ] becomes [ -eq 8 ] and test errors.",
              why: "The empty value vanished, so -eq lost its left operand.",
            },
          ],
          result:
            "String = is false for 08 versus 8. Numeric -eq is true. Use = for text, -eq for integers.",
        },
        {
          title: "Quote both sides of a string test",
          prompt:
            "p='lot 7'; q='lot 7'; r=. [ \"$p\" = \"$q\" ]; [ $p = $q ]; [ \"$r\" = \"\" ]; [ -n \"$r\" ].",
          code: "p='lot 7'\nq='lot 7'\nr=\n[ \"$p\" = \"$q\" ]\n[ $p = $q ]\n[ \"$r\" = \"\" ]",
          language: "bash",
          steps: [
            {
              do: "[ \"$p\" = \"$q\" ] is true — one word on each side, spaces kept.",
              why: "Quotes keep spaces as one word. Each phrase is a single operand of test.",
            },
            {
              do: "Unquoted [ $p = $q ] becomes [ lot 7 = lot 7 ] — too many arguments, test errors (status 2).",
              why: "Spaces split. test then sees lot, 7, =, lot, 7 instead of two strings.",
            },
            {
              do: "[ \"$r\" = \"\" ] is true (empty equals empty). [ -n \"$r\" ] is false. [ -z \"$r\" ] is true.",
              why: "-n is non-empty, -z is empty. Quote so empty does not vanish.",
            },
            {
              do: "Unquoted [ -z $r ] becomes [ -z ] and errors, same trap as the earlier empty -z example.",
              why: "Quote every operand. The exam will put a space in the value.",
            },
            {
              do: "Prefer [ \"$p\" = \"$q\" ] && [ -f \"$p\" ] as two tests rather than old -a inside one [ ].",
              why: "Two short tests are clearer and avoid -a precedence puzzles.",
            },
          ],
          result:
            "Quoted = succeeds. Unquoted $p = $q errors. Empty r: = \"\" true, -n false. Quote both sides.",
        },
      ],
    },
    {
      heading: "if / for / while",
      body: "if cmd; then … fi runs the then-branch when cmd’s status is 0 (the last job succeeded). The condition is a command, not a boolean type. if grep -q INEA file; then is idiomatic.\n\nfor name in word-list walks words, not lines (unless you change IFS). for f in *.dat uses globbing; quote \"$f\" inside. while cmd; do … done repeats while cmd succeeds. while read -r line; do … done < file reads lines. A last line without a newline can be skipped unless you add || [ -n \"$line\" ]. Loop over arguments with for f in \"$@\". Never for f in $(ls …) when names can have spaces.",
      howTo: [
        "if uses the command’s exit status. 0 → then (last job succeeded). Non-zero → else.",
        "Loop over arguments with for f in \"$@\". Never for f in $(ls …) when names can have spaces.",
        "Attach < file to the whole while-read loop.",
        "Test --help before the “need two args” guard if both should work.",
        "Keep a last line without a newline: while read -r line || [ -n \"$line\" ].",
      ],
      bullets: [
        "if cmd; then … fi — then-branch if cmd returns 0 (success).",
        "for x in list: words. Quote \"$x\". Nullglob off leaves a literal *.",
        "while read -r line; do … done < file. Missing final newline can drop the last line.",
        "\"$@\" keeps a spaced name as one f. Unquoted $@ splits it.",
        "if grep -q PAT file uses grep’s status. Do not pipe grep -q to wc inside if.",
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
              why: "$# is how many arguments. The arity guard wins first. That is a script bug exams like you to spot.",
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
              why: "\"$@\" keeps the spaced name as one f. Quotes keep spaces as one word.",
            },
            {
              do: "Unquoted for f in $@ would split into trade, 1.dat, miss.dat — three loops, mostly misses.",
              why: "Same trap as echo $file: tipping the jar onto the desk.",
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
        {
          title: "while read drops a last line without newline",
          prompt:
            "File end.txt is three lines: alpha, beta, gamma with no newline after gamma. while read -r line; do echo \"$line\"; done < end.txt. What prints? How do you keep gamma?",
          code: "while read -r line; do\n  echo \"$line\"\ndone < end.txt",
          language: "bash",
          steps: [
            {
              do: "read returns success only when it sees a newline (or a delimiter). alpha and beta print. gamma has no newline, so a bare while read skips it.",
              why: "The last incomplete line is a classic off-by-one. read’s status is 1 at EOF even if line holds text.",
            },
            {
              do: "Fix: while read -r line || [ -n \"$line\" ]; do echo \"$line\"; done < end.txt.",
              why: "If read failed but the jar still has letters, run the body once more for that tail.",
            },
            {
              do: "Attach < end.txt to the whole loop, not to echo inside. Otherwise read waits on the keyboard.",
              why: "The file must feed the while, like a hose into the loop.",
            },
            {
              do: "Use read -r so backslashes in a line are not eaten. Quote \"$line\" when you echo.",
              why: "-r is raw. Unquoted $line would split and glob.",
            },
            {
              do: "for line in $(cat end.txt) would also split on spaces and is the wrong tool for lines.",
              why: "for walks words. while read walks lines (with IFS).",
            },
          ],
          result:
            "Bare while read prints alpha and beta, drops gamma. Add || [ -n \"$line\" ] to keep the last line.",
        },
        {
          title: "if grep -q as a command test",
          prompt:
            "File watch.dat has INEZ 4 and INEX 1. if grep -q INEZ watch.dat; then echo hit; else echo miss; fi. Then grep -q INEZ | wc -l inside if (wrong). Status of grep -q with no match?",
          code: "if grep -q INEZ watch.dat; then\n  echo hit\nelse\n  echo miss\nfi",
          language: "bash",
          steps: [
            {
              do: "grep -q INEZ succeeds (status 0) because a match exists. if takes the then-branch and prints hit. -q stays quiet (no matched line on stdout).",
              why: "if uses the command’s exit status. 0 → then (last job succeeded). grep’s 0 means “I found something”.",
            },
            {
              do: "grep -q INEZ on a file with no INEZ exits 1. if would print miss. That 1 is “no match”, not a crash.",
              why: "grep: 0 match, 1 no match, 2 error. if treats any non-zero as else.",
            },
            {
              do: "if grep -q INEZ watch.dat | wc -l is a trap: the pipeline’s status is wc’s 0 even when grep finds nothing (no pipefail).",
              why: "You wanted grep’s status. The hose made wc the last command, so if would always look true.",
            },
            {
              do: "Do not parse grep’s printed line as a boolean. Use the status, or grep -c and [ \"$n\" -gt 0 ].",
              why: "The condition is a command, not a string type.",
            },
            {
              do: "Quote the file: grep -q INEZ \"$f\" when f may have spaces.",
              why: "Same filename rule as rm \"$f\". Quotes keep spaces as one word.",
            },
          ],
          result:
            "if grep -q INEZ … prints hit (status 0). No match → else, status 1. Do not pipe grep -q to wc inside if.",
        },
      ],
    },
    {
      heading: "Functions: return versus exit",
      body: "A function is a named recipe: name() { list; }. Inside, $1 is the function’s argument, not the script’s, unless you passed \"$@\". return N leaves the function; the script continues. exit N leaves the whole script (the process) — like walking out of the building instead of finishing the recipe.\n\nif f; then tests the function’s status (return value, or the last command). Status wraps modulo 256; return 256 is 0 in bash — accidental true. After f, $? is f’s status until another command runs. Function $1…$# are the call’s arguments. Script $1 is restored after return. Need to stop only the recipe → return. Need to stop the script → exit (usually in main, not in helpers).",
      howTo: [
        "Need to stop only the recipe → return. Need to stop the script → exit (usually in main, not in helpers).",
        "After f, $? is f’s status until another command runs.",
        "Function $1…$# are the call’s arguments. Script $1 is restored after return.",
        "Forward script args with peek \"$@\". Bare peek $* splits spaces.",
        "No return? The last command in the body is the status. Stay in 0–255.",
      ],
      bullets: [
        "return: leave the function. exit: leave the process (the script).",
        "Function $1…$# are the call’s arguments, not the script’s, unless you passed \"$@\".",
        "if f; then uses the function’s status; 0 means yes.",
        "No return uses the last command’s status. Empty body is 0.",
        "return 256 becomes 0 in bash (mod 256). Stay in 0–255.",
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
              why: "return hands a status back and continues the caller. Finish the recipe, stay in the building.",
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
              why: "That is how you forward the original arguments. $# is how many arguments the helper received.",
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
              why: "if treats 0 as true (last job succeeded) and any other status as false.",
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
        {
          title: "No return uses the last command",
          prompt:
            "warn() { echo warn-out; false; }  then warn; echo st=$? .  ok2() { echo ok-out; true; } then ok2; echo st=$? . Empty body e() { :; } — status?",
          code: "warn() { echo warn-out; false; }\nwarn\necho st=$?\nok2() { echo ok-out; true; }\nok2",
          language: "bash",
          steps: [
            {
              do: "warn prints warn-out, then false. There is no return, so the function’s status is false’s 1. st=1.",
              why: "Falling off the end uses the last command’s status. return is optional.",
            },
            {
              do: "ok2’s last command is true, so st=0 after ok2.",
              why: "if ok2; then would take the then-branch. 0 means yes in the shell.",
            },
            {
              do: "An empty-looking e() { :; } runs : (true), status 0. A truly empty {} also returns 0.",
              why: "No news is success unless a command failed.",
            },
            {
              do: "return 256 becomes 0 in bash (mod 256). Stay in 0–255 if you write return N.",
              why: "A wrapped 0 looks like success — a nasty true.",
            },
            {
              do: "echo after a helper still overwrites $?. Capture st=$? on the next line, or use if warn; then.",
              why: "Same capture rule as for plain commands.",
            },
          ],
          result:
            "warn → st=1 from false. ok2 → 0 from true. Empty / : body is 0. Last command is the status if you omit return.",
        },
        {
          title: "Forward script args with \"$@\"",
          prompt:
            "bash wrap.sh 'lot 3' NSE. inside wrap: peek() { echo p1=$1 phash=$#; }; peek; peek \"$@\"; peek $*. What does each peek see?",
          code: "peek() { echo p1=$1 phash=$#; }\npeek\npeek \"$@\"\npeek $*",
          language: "bash",
          steps: [
            {
              do: "peek with no arguments: function $1 empty, $#=0. Script $1 is still lot 3 after return.",
              why: "A function gets its own argument list. The script’s list is saved and restored.",
            },
            {
              do: "peek \"$@\" forwards two words: p1=lot 3 (one word), phash=2.",
              why: "\"$@\" is the safe tray. Quotes keep the spaced name as one $1 inside peek.",
            },
            {
              do: "peek $* (unquoted) splits: three function arguments lot, 3, NSE — p1=lot, phash=3.",
              why: "Unquoted $* / $@ destroy spaces. Wrappers must use cmd \"$@\".",
            },
            {
              do: "peek \"$*\" would pass one mashed argument 'lot 3 NSE', phash=1.",
              why: "\"$*\" is one word. Rarely what you want for filenames.",
            },
            {
              do: "$0 stays wrap.sh (as invoked). Functions do not rename the program.",
              why: "Helper recipes keep the script’s name.",
            },
          ],
          result:
            "peek: $#=0. peek \"$@\": $1='lot 3', $#=2. peek $*: splits to three words. Forward with \"$@\".",
        },
      ],
    },
    {
      heading: "Pipes and redirection",
      body: "cmd1 | cmd2 is a pipe: the output of one worker becomes the input of the next. Both run together. Status is cmd2’s unless pipefail. > file wipes the file then writes stdout. >> appends. 2> sends stderr. 2>&1 after > file pours stderr into the same file.\n\nOrder trap: cmd 2>&1 > file first points stderr at the terminal, then points stdout at the file, so errors still show on screen. You wanted > file 2>&1. Empty grep still lets wc print 0; pipeline status is wc’s 0 unless pipefail. Redirecting the whole script (bash s.sh > log 2>&1) catches every echo, including stderr.",
      howTo: [
        "> wipe-and-write stdout. >> append. 2> stderr. Merge with > file 2>&1 (2>&1 last).",
        "Trace a pipeline stage by stage: who reads the file, who reads the hose, what is printed.",
        "Redirecting the whole script (bash s.sh > log 2>&1) catches every echo, including stderr.",
        "Empty grep still lets wc print 0; pipeline status is wc’s 0 unless pipefail.",
        "A pipe carries stdout only. Hide find’s error with 2>/dev/null on that stage, not on wc.",
      ],
      bullets: [
        "Pipe = output of one worker becomes input of the next. Status is cmd2 unless pipefail.",
        "> truncates stdout; >> appends; 2> stderr; > file 2>&1 merges.",
        "2>&1 > file leaves stderr on the terminal. That is the trap.",
        "The hose carries stdout. stderr is a separate stream unless you merge it.",
        "$? of a pipeline is the last worker (0 = yes) unless pipefail.",
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
              why: "The clerk opens the file before starting the command.",
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
              why: "The pipe means grep’s output becomes wc’s input. wc reads the hose, not the file, so no filename column.",
            },
            {
              do: "grep -v 10 drops the line containing 10. One line left. wc prints 1.",
              why: "-v is invert-match: keep lines that do not contain the pattern.",
            },
            {
              do: "If grep matches nothing it exits 1, but wc still prints 0 and (without pipefail) the pipeline is 0.",
              why: "Status is the last worker. $? = did that last job succeed (0 = yes). Same trap as false | true.",
            },
          ],
          result: "First pipeline prints 2. Second prints 1 (INEA 7 only).",
        },
        {
          title: "Hide stderr of one pipeline stage",
          prompt:
            "find /no/vault -name '*.csv' | wc -l   then   find /no/vault -name '*.csv' 2>/dev/null | wc -l. What is on the screen each time? Pipeline status without pipefail?",
          code: "find /no/vault -name '*.csv' | wc -l\nfind /no/vault -name '*.csv' 2>/dev/null | wc -l",
          language: "bash",
          steps: [
            {
              do: "find writes an error to stderr (missing /no/vault). That error still shows on the terminal. The hose only carries stdout, which is empty. wc -l prints 0.",
              why: "A pipe connects stdout to the next stdin. stderr is a separate stream unless you merge it.",
            },
            {
              do: "2>/dev/null on find hides the error. wc still prints 0. The screen is quiet except for that 0.",
              why: "/dev/null is the bin for that command’s stderr. wc is not redirected.",
            },
            {
              do: "Without pipefail, pipeline status is wc’s 0 even though find failed.",
              why: "Same trap as false | true. Status is the last worker.",
            },
            {
              do: "find … 2>&1 | wc -l would send the error line into wc and count it as 1 (or more) — usually the wrong answer.",
              why: "Merging stderr into the hose turns error text into “data”. Hide or keep it; do not accidentally count it.",
            },
            {
              do: "Redirect the whole script with bash s.sh > log 2>&1 if you want every echo and every error in one file.",
              why: "> log 2>&1 (2>&1 last) is the merge order. 2>&1 > log would leave errors on the terminal.",
            },
          ],
          result:
            "First: error on screen, wc prints 0. Second: silent, wc prints 0. Status is 0 (wc) unless pipefail.",
        },
        {
          title: ">> log 2>&1 versus 2>&1 >> log",
          prompt:
            "log already holds old. cmd prints stdout-ok and stderr-bad. (a) cmd >> log 2>&1 (b) cmd 2>&1 >> log2. What lands where? Is old kept?",
          code: "cmd() { echo stdout-ok; echo stderr-bad >&2; }\ncmd >> log 2>&1\ncmd 2>&1 >> log2",
          language: "bash",
          steps: [
            {
              do: "(a) >> log appends stdout to log (old kept). 2>&1 then points stderr at the same place. Both lines append to log.",
              why: "2>&1 means “stderr, copy whatever stdout currently is”. Do that after the file redirect.",
            },
            {
              do: "(b) 2>&1 first clones the terminal; then >> log2 moves only stdout. stderr-bad still shows on the screen. log2 gets stdout-ok appended.",
              why: "This is the same order bug as 2>&1 > file, now with append.",
            },
            {
              do: "> log 2>&1 would have wiped old first, then written both streams. >> keeps old.",
              why: "> is “new page”. >> is “write at the bottom”.",
            },
            {
              do: "If log cannot be opened, cmd does not run.",
              why: "The clerk opens the file before starting the command.",
            },
            {
              do: "Silent everything: >> /dev/null 2>&1 still discards both (append to the bin is still the bin).",
              why: "Need a real file only when you want to keep the text.",
            },
          ],
          result:
            "(a) >> log 2>&1 appends both lines, old kept. (b) 2>&1 >> log2 leaves stderr on the terminal.",
        },
      ],
    },
    {
      heading: "chmod, grep, wc, kill",
      body: "chmod says who may read, write, or run the file. Octal digits are owner, group, other. Each digit is 4 read + 2 write + 1 execute. 754 is rwxr-xr--. 644 is a typical file; 755 a typical script or directory. Directory execute is “search / cd”.\n\ngrep prints matching lines (-i case, -v invert, -c count, -E extra regex). Status 0 if any match, 1 if none. wc -l lines, -w words, -c bytes. kill PID sends SIGTERM (15, polite); kill -9 is SIGKILL (cannot be caught). Use $! for the background child, not $$ (that is the shell itself). TERM first, wait, then -9 only if it is still alive.",
      howTo: [
        "Decode octal left to right: u, g, o. Add 4/2/1 for r/w/x.",
        "grep -c counts matching lines; wc -l counts all lines on its stdin.",
        "TERM first, wait, then -9 only if it is still alive. Do not kill $$ when you meant $!.",
        "Directory execute bit is “search / cd”. Files 644, dirs 755 is the exam default.",
        "kill -0 PID probes “is it alive?”. It does not kill.",
      ],
      bullets: [
        "chmod = who may read / write / run the file. Octal: 4r 2w 1x per u/g/o. 754 = rwxr-xr--.",
        "grep -i -v -c -n -E -q. Status 0 match, 1 no match.",
        "wc -l lines, -w words, -c bytes.",
        "kill PID = SIGTERM 15. kill -9 = SIGKILL. $! is the background child.",
        "Directory x is enter/cd. Directory r is list. Do not kill $$.",
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
              why: "chmod says who may read / write / run. 7=4+2+1, 5=4+1, 4=read only. Execute on a file means “run this script”.",
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
              why: "$$ is “me” (the clerk). $! is “the child I just backgrounded”.",
            },
            {
              do: "Starting & succeeds, so $? is 0 even while sleep is still running. wait $! to see sleep’s real status.",
              why: "Background start is not “sleep finished”. $? = did that last job succeed (0 = yes).",
            },
          ],
          result:
            "TERM is enough for untrapped sleep. Use $!, not $$. -9 only if it ignored TERM.",
        },
        {
          title: "chmod 640 then 711",
          prompt:
            "Start 644. chmod 640 hold.cfg then chmod 711 run.sh. Bits after each? Who can read hold.cfg after 640? Who can cd into a directory chmod’d 711?",
          code: "chmod 640 hold.cfg\nchmod 711 run.sh",
          language: "bash",
          steps: [
            {
              do: "640 = owner rw (6), group r (4), other none (0). Letters: rw-r----- . Owner and group can read; other cannot. Nobody has execute.",
              why: "chmod says who may read / write / run. 6=4+2, 4=read, 0=nothing. Config files are often 640 so other cannot read secrets.",
            },
            {
              do: "711 = owner rwx (7), group --x (1), other --x (1). Letters: rwx--x--x.",
              why: "7=4+2+1. 1 is execute only — no read, no write.",
            },
            {
              do: "On a directory, execute is “search / cd”. 711 lets others cd through a folder without listing names (no r).",
              why: "Directory r is list, x is enter, w is create/delete (with sticky bit stories later).",
            },
            {
              do: "On run.sh, 711 lets others execute the script if they already know the path, even if they cannot read it — some systems still need r to run a script.",
              why: "Exam default: 755 for scripts (rwxr-xr-x). 711 is the “enter but do not list” directory trick.",
            },
            {
              do: "chmod +x hold.cfg from 640 would become 751 (u+x,g+x,o+x on 640 → 7 5 1). It is not automatically 755.",
              why: "+x is a+x. Start from 644 to land on 755.",
            },
          ],
          result:
            "640 = rw-r----- (group can read hold.cfg, other cannot). 711 = rwx--x--x (others can cd/exec, not list/read).",
        },
        {
          title: "grep -q status and kill 0",
          prompt:
            "alerts2.txt: NSE INEZ, bse inez. if grep -q NSE alerts2.txt; then echo yes; fi. grep -c -i inez. Then sleep 200 & ; kill -0 $! ; kill -0 $$.",
          code: "if grep -q NSE alerts2.txt; then echo yes; fi\ngrep -c -i inez alerts2.txt\nsleep 200 &\nkill -0 $!",
          language: "bash",
          steps: [
            {
              do: "grep -q NSE matches line 1, status 0, if prints yes. Line 2 has no NSE (case-sensitive).",
              why: "-q is quiet membership. Status 0 means hit (last job succeeded). Do not count on stdout.",
            },
            {
              do: "grep -c -i inez counts both lines → 2 (INEZ and inez). -c prints the count, not the lines.",
              why: "-i ignores case. -c is “how many matching lines”, not wc of the whole file.",
            },
            {
              do: "kill -0 $! tests whether the sleep PID exists (and you may signal it). It does not kill. Status 0 if alive.",
              why: "Signal 0 is a probe. $! is the sleep you just backgrounded.",
            },
            {
              do: "kill -0 $$ is also 0 — the shell is alive. That does not mean you should kill $$.",
              why: "$$ is me (the clerk). Probing yourself succeeds. Killing $$ would abort the script.",
            },
            {
              do: "After kill $! (TERM), kill -0 $! fails (non-zero) once sleep is gone. Do not send -9 first.",
              why: "TERM first, wait, then -9 only if it is still alive. Untrapped sleep dies on TERM.",
            },
          ],
          result:
            "grep -q NSE → yes. grep -c -i inez → 2. kill -0 $! probes the sleep; kill -0 $$ probes the shell. Use $! to manage the child.",
        },
      ],
    },
  ],
};
