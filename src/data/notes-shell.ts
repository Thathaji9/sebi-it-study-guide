import type { TopicNote } from "@/data/notes";

export const notesShell: TopicNote = {
  topic: "shell",
  title: "Linux Shell — worked notes",
  blurb:
    "SEBI Grade A IT shell questions are traces: quotes, special parameters, [ ] tests with spaces, pipelines and redirection, chmod bits, and return versus exit. Write the command line, expand every $parameter, then print the output on paper.",
  blocks: [
    {
      heading: "Variables and quoting",
      body: "A shell variable is assigned with name=value and no spaces around =. Retrieval is $name or ${name}. Unquoted expansion undergoes word-splitting on IFS and globbing. Double quotes stop word-splitting and globbing but still expand $name, command substitution, and arithmetic. Single quotes stop all expansion: '$name' is the five characters dollar-n-a-m-e if the name is name… actually the characters $, n, a, m, e — the dollar is literal.\n\nexport VAR=value marks the variable for child processes. A variable set without export is visible only in the current shell. VAR=value command sets VAR only for that one command. unset VAR removes it. ${#VAR} is length; ${VAR:-default} substitutes default if VAR is unset or empty; ${VAR:=default} also assigns.\n\nConcatenation is juxtaposition: prefix=${USER}_desk. Arithmetic is $((x+1)) in POSIX sh, or let/(( )) in bash. Do not use $x inside $(( )) with a leading dollar if you want POSIX clarity — bash accepts $(( $x + 1 )) too.\n\nExam traps: spaces around = make the shell try to run a command named VAR. echo $empty with empty= expands to zero words, so echo sees no argument and prints a blank line; echo \"$empty\" passes an empty argument and still prints a blank line, but test -z \"$empty\" versus test -z $empty differ when empty is unset (the unquoted form can pass zero arguments to test and break).",
      bullets: [
        "Assignment: name=value, no spaces. Double quotes expand; single quotes do not.",
        "Unquoted $var is split on IFS and globbed. Quote it unless you intend that.",
        "export publishes to children. VAR=value cmd is a one-shot environment.",
      ],
      examples: [
        {
          title: "Three echo lines: unquoted, double, single",
          prompt:
            "Script env: file='trade 2026.dat' (one variable, a space in the value). Commands: echo $file ; echo \"$file\" ; echo '$file'. Trace word-splitting. Assume no glob match for trade.",
          code: "file='trade 2026.dat'\necho $file\necho \"$file\"\necho '$file'",
          language: "bash",
          steps: [
            "Assignment uses single quotes so the space is stored. file holds trade 2026.dat as one value.",
            "Unquoted $file is split on IFS (space): echo receives two arguments, trade and 2026.dat. echo joins them with a single space. Output: trade 2026.dat. (If two files named trade and 2026.dat existed as globs this could also expand; they do not.)",
            "Double-quoted \"$file\" is one argument. echo prints trade 2026.dat, same looking line, but it is one word internally (important for rm, mv, [ -f ]).",
            "Single-quoted '$file' does not expand. echo prints $file literally, six characters: dollar, f, i, l, e.",
            "On paper write three output lines: trade 2026.dat / trade 2026.dat / $file and mark that only the middle one is safe as a filename.",
            "rm $file would try to remove two paths. rm \"$file\" removes the one file with a space in its name.",
          ],
          result:
            "Line1: trade 2026.dat (split). Line2: trade 2026.dat (one word). Line3: $file (literal).",
        },
        {
          title: "Spaces around = are not an assignment",
          prompt:
            "The candidate types count = 5 then echo $count. The script already had count=2. What runs, and what is printed?",
          code: "count=2\ncount = 5\necho $count",
          language: "bash",
          steps: [
            "count=2 assigns 2. So far count is 2.",
            "count = 5 is three words: command count, argument =, argument 5. The shell looks for an executable named count, not an assignment.",
            "If no such command exists, bash prints count: command not found (or similar) on stderr. The assignment never happens.",
            "echo $count still expands to 2. Output: 2.",
            "count= 5 (space after =) is an assignment of empty to count, then a command named 5. count becomes empty; then 5: command not found.",
            "Exam: assignment is a prefix token with = and no unquoted spaces around the equals.",
          ],
          result:
            "count = 5 is a command, not an assignment. echo prints 2. stderr: command not found.",
        },
        {
          title: "export versus one-shot environment",
          prompt:
            "Commands: nse=1 ; sh -c 'echo nse=$nse' ; export nse=1 ; sh -c 'echo nse=$nse' ; bse=2 sh -c 'echo bse=$bse nse=$nse' . Parent still has nse exported and never assigned bse except in the one-shot.",
          code: "nse=1\nsh -c 'echo nse=$nse'\nexport nse=1\nsh -c 'echo nse=$nse'\nbse=2 sh -c 'echo bse=$bse nse=$nse'",
          language: "bash",
          steps: [
            "nse=1 without export: child sh -c does not see nse. First echo: nse= (empty).",
            "export nse=1: nse is now in the environment. Second child: nse=1.",
            "bse=2 sh -c '...' puts bse=2 only in that child’s environment. Child prints bse=2 and nse=1 (nse still exported from the parent).",
            "After that command returns, the parent has no bse. echo $bse in the parent prints empty.",
            "Single quotes around the -c script protect $nse from the parent. The child shell, not the parent, expands $nse. If you had used double quotes, the parent would expand first and the child would see a constant.",
            "On paper: three printed lines nse=  /  nse=1  /  bse=2 nse=1 and parent bse unset.",
          ],
          result:
            "Unexported nse is invisible to the child; export publishes it; VAR=value cmd is per-child. Printed: nse= ; nse=1 ; bse=2 nse=1.",
        },
        {
          title: "${var:-default} versus empty string",
          prompt:
            "Trace: unset x ; echo ${x:-a} ; x= ; echo ${x:-a} ; x=b ; echo ${x:-a} ; unset y ; echo ${y-a} ; y= ; echo ${y-a}. Note :- versus -.",
          code: "unset x\necho ${x:-a}\nx=\necho ${x:-a}\nx=b\necho ${x:-a}\nunset y\necho ${y-a}\ny=\necho ${y-a}",
          language: "bash",
          steps: [
            "x is unset. ${x:-a} uses a because unset-or-empty. Prints a.",
            "x= assigns empty. ${x:-a} still uses a (empty counts). Prints a.",
            "x=b is set and non-empty. Prints b.",
            "${y-a} (no colon) substitutes a only when y is unset, not when y is empty.",
            "y unset: ${y-a} prints a. y= empty: ${y-a} prints empty (a blank line).",
            "Memorise: colon in :- ?= += means “unset or empty”. Without colon, only unset. SEBI loves the colon.",
          ],
          result: "Prints: a / a / b / a / (empty line). Empty is not unset for ${y-a}.",
        },
      ],
    },
    {
      heading: "Special parameters: $0 $1 $# $@ $? $$ $!",
      body: "Positional parameters are the script name and its arguments. $0 is the script name as invoked (possibly a path). $1, $2, … are the arguments. $# is the count of positional parameters excluding $0. $@ and $* both expand to all arguments; inside double quotes, \"$@\" is the safe one: each argument is a separate word even if it contains spaces. \"$*\" is a single word with arguments joined by the first IFS character (usually space).\n\n$? is the exit status of the last foreground pipeline, 0 meaning success. $$ is the current shell’s PID. $! is the PID of the last job started in the background. $_ is the last argument of the previous command (less often tested). shift discards $1 and renumbers.\n\nWhen you trace a script, first write the invocation line, then a table: $0, $#, $1, $2, $@. Then execute each echo. Do not invent $1 from inside the script; it comes only from the command line (or from set --).\n\nset -- a \"b c\" d rebuilds the positional list. After that $# is 3, $2 is b c with a space. This is how functions receive \"$@\" when you write f \"$@\".",
      bullets: [
        "$0 script name; $1… arguments; $# count; \"$@\" all args, separately; \"$*\" one word.",
        "$? last status (0 = true). $$ this PID. $! last background PID.",
        "Always quote \"$@\" when forwarding arguments. Bare $@ splits on spaces.",
      ],
      examples: [
        {
          title: "Full trace of specials on one command line",
          prompt:
            "File /home/desk/show.sh contains the script below. Invocation: bash /home/desk/show.sh INEA INEB. Assume the process PID is 4421 and the last command in the script (true) succeeds. Trace every printed line.",
          code: "#!/bin/bash\necho zero=$0\necho one=$1\necho two=$2\necho hash=$#\necho at=$@\necho star=$*\ntrue\necho status=$?\necho pid=$$",
          language: "bash",
          steps: [
            "Invocation: bash /home/desk/show.sh INEA INEB. $0 is /home/desk/show.sh (the script name bash is given). $1=INEA, $2=INEB, $3 unset, $#=2.",
            "echo zero=$0 prints zero=/home/desk/show.sh.",
            "echo one=$1 prints one=INEA. echo two=$2 prints two=INEB.",
            "echo hash=$# prints hash=2.",
            "echo at=$@ and echo star=$* both print at=INEA INEB and star=INEA INEB here because neither argument has spaces. They will differ in the next example.",
            "true exits 0, so echo status=$? prints status=0. echo pid=$$ prints pid=4421. $! is unused: no background job, so $! is empty if printed.",
          ],
          result:
            "zero=/home/desk/show.sh ; one=INEA ; two=INEB ; hash=2 ; at=INEA INEB ; star=INEA INEB ; status=0 ; pid=4421.",
        },
        {
          title: "\"$@\" versus \"$*\" versus unquoted with a spaced argument",
          prompt:
            "Invocation: bash show.sh 'trade 1' INEB. Script: printf '<%s>\\n' \"$@\" ; printf '<%s>\\n' \"$*\" ; printf '<%s>\\n' $@ . Three blocks of output.",
          code: "printf '<%s>\\n' \"$@\"\nprintf '<%s>\\n' \"$*\"\nprintf '<%s>\\n' $@",
          language: "bash",
          steps: [
            "Positional: $1=trade 1 (with space), $2=INEB, $#=2.",
            "\"$@\" expands to two quoted words: 'trade 1' and INEB. printf prints two lines: <trade 1> then <INEB>.",
            "\"$*\" expands to one word: trade 1 INEB (joined by space). printf prints one line: <trade 1 INEB>.",
            "Unquoted $@ undergoes splitting: three words trade, 1, INEB. printf prints three lines: <trade> <1> <INEB>. The spaced argument is destroyed.",
            "Unquoted $* splits the same way here. The difference between $@ and $* is visible when quoted.",
            "Rule for wrappers: cmd \"$@\" forwards exactly. cmd \"$*\" forwards one mashed argument. cmd $@ is always wrong for filenames.",
          ],
          result:
            "\"$@\" → two lines <trade 1> and <INEB>. \"$*\" → one line <trade 1 INEB>. Unquoted $@ → three lines <trade> <1> <INEB>.",
        },
        {
          title: "$? after a failing pipeline and after !",
          prompt:
            "Commands, each followed by echo $?: ls /no/such/path ; true | false ; false | true ; false ; echo $? (the last $? is from echo, a trick). Then a separate: false ; echo status=$? . PID not needed.",
          code: "ls /no/such/path\necho $?\ntrue | false\necho $?\nfalse | true\necho $?\nfalse\necho $?\nfalse\necho status=$?",
          language: "bash",
          steps: [
            "ls on a missing path returns non-zero, typically 2. First echo $? prints 2 (or 1, depending on ls). Treat as non-zero, exam usually says “non-zero”.",
            "true | false : pipeline status is the last command, false, so 1. Second echo prints 1. (set -o pipefail would also look at true, but it is off by default.)",
            "false | true : last command true, status 0, even though false failed. Third echo prints 0. This is the pipeline trap.",
            "The next bare false ; echo $?  — wait, the prompt also had false ; echo $? as a trick: after echo prints the status, $? becomes 0 because echo succeeded. So a following echo $? would print 0, not 1.",
            "The separate pair false ; echo status=$? prints status=1, because that echo reads $? from false, then $? becomes 0 after echo, which you do not print.",
            "On paper: missing ls → non-zero; true|false → 1; false|true → 0; echo status=$? after false → status=1.",
          ],
          result:
            "ls missing: non-zero. true|false → 1. false|true → 0 (no pipefail). false then echo status=$? → status=1.",
        },
        {
          title: "$$ versus $! with a background job",
          prompt:
            "Script run as PID 7700: echo $$ ; sleep 30 & echo $! ; echo $?. The sleep is still running. Predict the three numbers’ roles, not the exact sleep PID except that it differs from 7700.",
          code: "echo $$\nsleep 30 &\necho $!\necho $?",
          language: "bash",
          steps: [
            "$$ is the shell running the script: 7700. First line: 7700.",
            "sleep 30 & starts a background child. $! becomes that child’s PID, say 7704. Second printed line: 7704 (≠ 7700).",
            "Starting a background job succeeds, so $? after the & line is 0. Third line: 0. It is not the exit status of sleep, which has not finished.",
            "wait $! would block until sleep ends, then $? would be sleep’s status (0 if it ran 30 seconds, 128+signal if killed).",
            "kill $! sends a signal to the sleep, not to the shell. kill $$ would signal the shell itself.",
            "If two jobs are backgrounded, $! is the most recent only. Jobs -l lists both; you must have saved the first PID in a variable.",
          ],
          result:
            "Prints 7700, then the sleep PID (≠ 7700), then 0. $? is not sleep’s exit until you wait.",
        },
      ],
    },
    {
      heading: "[ ] tests: -f -d -z and the spaces",
      body: "[ is a command (a synonym for test). ] is its required last argument. Because it is a command, it needs spaces: [ -f \"$f\" ] is four words (or five with quotes). [-f \"$f\"] is a command named [-f which does not exist. [ -f\"$f\" ] glues the operator to the filename. The spaces are not decoration; they are word separators.\n\nUnary file tests: -f regular file, -d directory, -e exists, -L symlink, -r readable, -w writable, -x executable, -s non-empty file. String tests: -z STRING true if length 0, -n STRING true if length > 0. Binary: STRING1 = STRING2 (POSIX single =), STRING1 != STRING2, INTEGER -eq -ne -lt -le -gt -ge. File newer: file1 -nt file2.\n\nAlways quote the operand: [ -z \"$name\" ]. Unquoted [ -z $name ] with name empty becomes [ -z ] which is a syntax error (unary -z missing its argument). [ $a -eq 5 ] with a empty becomes [ -eq 5 ], also an error. Numeric tests on non-integers error.\n\n[[ ]] is a bash keyword, not POSIX, and does not word-split. SEBI still asks the POSIX [ ] form and the space rule. Combine with -a / -o inside one [ ] (old) or two tests joined by && / || (preferred): [ -f \"$f\" ] && [ -r \"$f\" ].",
      bullets: [
        "[ is test. Spaces required: [ -f file ]. Missing spaces ⇒ command not found or a glued operand.",
        "-f file, -d directory, -z empty string, -n non-empty, -eq numeric, = string.",
        "Quote \"$var\". Unquoted empty vars eat the operator and crash test.",
      ],
      examples: [
        {
          title: "Missing spaces: four spellings of a file test",
          prompt:
            "f=trade.dat and the file exists. Evaluate: [ -f \"$f\" ] ; [-f \"$f\"] ; [ -f\"$f\" ] ; [ -f $f ]. For each, say success/fail/error.",
          code: "f=trade.dat\n[ -f \"$f\" ]\n[-f \"$f\"]\n[ -f\"$f\" ]\n[ -f $f ]",
          language: "bash",
          steps: [
            "[ -f \"$f\" ] is test -f trade.dat. File exists and is regular. Status 0.",
            "[-f \"$f\"] looks up a command named [-f. command not found. Status 127. Not a test at all.",
            "[ -f\"$f\" ] is test with one argument -ftrade.dat (operator glued to name). A single-argument test is true if the string is non-empty, so this is true for the wrong reason, or in some test implementations it is an error. POSIX: [ string ] is true if string is non-empty. So it may return 0 without ever checking the file. Deadly.",
            "[ -f $f ] unquoted but f has no space: still two arguments -f and trade.dat. Works here. It would break if f were trade 2026.dat.",
            "Only the first form is always right. The fourth is coincidentally right for this value.",
            "Write on paper: 0, 127, accidental-true-or-error, 0-but-fragile.",
          ],
          result:
            "[ -f \"$f\" ] succeeds. [-f \"$f\"] is command not found. [ -f\"$f\" ] does not test the file. Unquoted works only because f has no spaces.",
        },
        {
          title: "-z versus -n on empty, unset, and zero",
          prompt:
            "Cases: unset a ; a= ; a=0 ; a=trade. For each, [ -z \"$a\" ] and [ -n \"$a\" ]. Then the unquoted trap: a= ; [ -z $a ].",
          code: "unset a\n[ -z \"$a\" ]; echo z_unset=$?\n[ -n \"$a\" ]; echo n_unset=$?\na=\n[ -z \"$a\" ]; echo z_empty=$?\na=0\n[ -z \"$a\" ]; echo z_zero=$?\na=trade\n[ -z \"$a\" ]; echo z_trade=$?\na=\n[ -z $a ]; echo unquoted=$?",
          language: "bash",
          steps: [
            "Unset a, quoted: -z is true (0), -n is false (1). Empty string is length 0.",
            "a= empty: same as unset for -z/-n. z true, n false.",
            "a=0: length 1, the character zero. -z false, -n true. -z is not a numeric test. 0 is not empty.",
            "a=trade: -z false, -n true.",
            "a= empty, unquoted [ -z $a ]: after expansion the command is [ -z ] which is missing an argument. test errors, status 2, often with a diagnostic on stderr.",
            "Numeric emptiness would be [ \"${a:-0}\" -eq 0 ], which treats both unset and 0 as zero. That is a different question.",
          ],
          result:
            "-z true for unset and empty; false for 0 and trade. Unquoted [ -z $a ] with empty a errors. 0 is non-empty.",
        },
        {
          title: "-f versus -d versus -e on a directory and a missing path",
          prompt:
            "Paths: /etc (directory), /etc/passwd (file), /no/such. For each, [ -e p ], [ -f p ], [ -d p ]. Fill a 3×3 true/false table.",
          code: "[ -e /etc ]; [ -f /etc ]; [ -d /etc ]\n[ -e /etc/passwd ]; [ -f /etc/passwd ]; [ -d /etc/passwd ]\n[ -e /no/such ]; [ -f /no/such ]; [ -d /no/such ]",
          language: "bash",
          steps: [
            "/etc exists, is a directory, not a regular file. -e true, -f false, -d true.",
            "/etc/passwd exists, regular file, not a directory. -e true, -f true, -d false.",
            "/no/such does not exist. All three false. -f does not distinguish “missing” from “exists but is a directory”; use -e or -d as well if you need that.",
            "A symlink to a file: -f usually follows and is true; -L is true for the symlink itself. Exam usually ignores -L unless named.",
            "[ -f /etc/passwd -a -r /etc/passwd ] is old-style AND inside one test. Safer: [ -f /etc/passwd ] && [ -r /etc/passwd ].",
            "Status of a true test is 0, which looks like C’s false if you mix languages. In shell, 0 is success.",
          ],
          result:
            "/etc: e=T f=F d=T. /etc/passwd: e=T f=T d=F. /no/such: all F.",
        },
        {
          title: "String = versus numeric -eq",
          prompt:
            "x=08 ; y=8. Compare [ \"$x\" = \"$y\" ] with [ \"$x\" -eq \"$y\" ]. Then [ \"$x\" -eq 8 ] and a bad [ \"$x\" = 8 ] without quotes on 8 (still fine) versus [ $x -eq 8 ] with x=08.",
          code: "x=08\ny=8\n[ \"$x\" = \"$y\" ]; echo str=$?\n[ \"$x\" -eq \"$y\" ]; echo num=$?",
          language: "bash",
          steps: [
            "String = compares character by character. 08 is not 8. str status = 1 (false).",
            "Numeric -eq parses 08 as octal in bash arithmetic… actually bash [ -eq ] treats 08 as octal 8, which equals 8, status 0; POSIX test may error on leading-zero octal or treat as invalid. In bash: 08 -eq 8 is true.",
            "Safer exam statement: = is string; -eq is integer. Leading zeros make them disagree. Do not use -eq on non-digits (member ids like M1).",
            "If x were M1, [ \"$x\" -eq 1 ] errors: integer expression expected.",
            "[ \"$x\" = 8 ] is still a string compare of 08 versus 8, false. Quotes on 8 are optional because 8 has no spaces; quotes on $x are not optional in general.",
            "Paper answer for SEBI: string false, numeric true in bash for 08 vs 8; never -eq on IDs.",
          ],
          result:
            "[ 08 = 8 ] false (string). [ 08 -eq 8 ] true in bash (integer). Use = for codes, -eq for integers.",
        },
      ],
    },
    {
      heading: "if/then/fi, for, and while",
      body: "if list; then list; elif list; then list; else list; fi. The condition is a command list, not a boolean type. if [ \"$x\" -eq 1 ]; then … fi runs test, and the then-branch runs if that command’s status is 0. if grep -q INEA file; then … fi is idiomatic: grep -q is silent and returns 0 on a match.\n\nfor name in word-list; do list; done iterates words, not lines, unless you change IFS. for f in *.dat; do … done globs in the current directory; if the glob matches nothing, bash (nullglob off) iterates a literal *.dat. Always quote \"$f\" inside the loop.\n\nwhile list; do list; done repeats as long as list’s status is 0. while read -r line; do … done < file reads lines. Infinite loop: while true; do … done. until is while-not.\n\ncase $1 in INEA|INEB) … ;; *) … ;; esac is the switch. Patterns are globs, not regex, unless you enable extglob. ;; ends a clause. A common exam script: if [ $# -lt 2 ]; then echo usage; exit 1; fi then a for arg in \"$@\"; do … done.",
      bullets: [
        "if cmd; then … fi — then-branch if cmd returns 0.",
        "for x in list: iterates words. Quote \"$x\". Nullglob off leaves a literal *.",
        "while cmd; do … done. while read -r line; do … done < file for line loops.",
      ],
      examples: [
        {
          title: "if/elif on $#: usage guard",
          prompt:
            "Script: if [ $# -lt 2 ]; then echo usage; exit 1; elif [ \"$1\" = --help ]; then echo help; exit 0; else echo run \"$1\" \"$2\"; fi. Invocations: bash s.sh ; bash s.sh --help ; bash s.sh INEA INEB ; bash s.sh --help INEB.",
          code: "if [ $# -lt 2 ]; then\n  echo usage\n  exit 1\nelif [ \"$1\" = --help ]; then\n  echo help\n  exit 0\nelse\n  echo run \"$1\" \"$2\"\nfi",
          language: "bash",
          steps: [
            "bash s.sh: $#=0 < 2, then-branch: prints usage, exits 1. $1 is empty, elif never runs.",
            "bash s.sh --help: $#=1 < 2, still usage, exit 1. --help never reaches elif because the arity guard wins. This is a script bug an exam can ask you to spot.",
            "bash s.sh INEA INEB: $#=2, skip then. $1 is INEA, not --help. else: prints run INEA INEB, status 0.",
            "bash s.sh --help INEB: $#=2, skip then. $1 is --help, elif prints help, exit 0. INEB is ignored.",
            "To allow --help with no extra args, test help first: if [ \"$1\" = --help ]; then … elif [ $# -lt 2 ]; then …",
            "Paper outputs: usage / usage / run INEA INEB / help with statuses 1, 1, 0, 0.",
          ],
          result:
            "0 args → usage (1). --help alone → usage (1), not help. INEA INEB → run. --help INEB → help (0).",
        },
        {
          title: "for loop over \"$@\" with a spaced filename",
          prompt:
            "Invocation: bash s.sh 'trade 1.dat' miss.dat. Body: for f in \"$@\"; do if [ -f \"$f\" ]; then echo has \"$f\"; else echo miss \"$f\"; fi; done. trade 1.dat exists; miss.dat does not.",
          code: "for f in \"$@\"; do\n  if [ -f \"$f\" ]; then\n    echo has \"$f\"\n  else\n    echo miss \"$f\"\n  fi\ndone",
          language: "bash",
          steps: [
            "\"$@\" yields two iterations: f='trade 1.dat' then f='miss.dat'.",
            "First: [ -f \"trade 1.dat\" ] true. Prints has trade 1.dat.",
            "Second: [ -f \"miss.dat\" ] false. Prints miss miss.dat.",
            "If the for had been for f in $@ (unquoted), the first argument would split and the loop would run three times: trade, 1.dat, miss.dat, all missing except possibly a file named trade.",
            "If the for had been for f in $*; quoted \"$*\" is one iteration with both names in f, and [ -f ] would look for a single file named trade 1.dat miss.dat.",
            "Two printed lines: has trade 1.dat and miss miss.dat.",
          ],
          result:
            "has trade 1.dat ; miss miss.dat. Unquoted $@ would have split the first name into two iterations.",
        },
        {
          title: "while read loop and the last line without newline",
          prompt:
            "File nums.txt has two lines: 10\\n20 with a trailing newline, and a second file bad.txt has 10\\n20 with no newline after 20. Script: n=0; while read -r x; do n=$((n+1)); echo got \"$x\"; done < file; echo count=$n. Run on both files.",
          code: "n=0\nwhile read -r x; do\n  n=$((n+1))\n  echo got \"$x\"\ndone < nums.txt\necho count=$n",
          language: "bash",
          steps: [
            "read returns 0 when it reads a line terminated by newline. nums.txt: two successful reads, n=2, prints got 10, got 20, count=2.",
            "bad.txt: first read gets 10 (status 0). Second read gets 20 but hits EOF before newline; read returns non-zero. The while condition fails.",
            "POSIX trap: the last partial line is in x but the loop body is skipped because status is non-zero. n stays 1. Prints got 10 then count=1. 20 is lost.",
            "Fix used in real scripts: while read -r x || [ -n \"$x\" ]; do … done so a final partial line still runs the body.",
            "Without redirection, while read reads stdin (the keyboard). The < file must attach to the loop, not only to read, unless you use exec < file.",
            "Paper: nums.txt count=2; bad.txt without the || fix count=1 and 20 dropped. That is a known SEBI-style gotcha if they mention “no newline”.",
          ],
          result:
            "Newline-terminated file: two got-lines, count=2. Missing final newline: last line skipped, count=1 unless you add || [ -n \"$x\" ].",
        },
        {
          title: "while versus for on a command substitution",
          prompt:
            "Files in the current directory: a.dat, b.dat. Compare for f in $(ls *.dat); do echo \"$f\"; done with for f in *.dat; do echo \"$f\"; done. Then add a file named 'c d.dat'.",
          code: "for f in $(ls *.dat); do echo \"$f\"; done\nfor f in *.dat; do echo \"$f\"; done",
          language: "bash",
          steps: [
            "Without spaces in names, both loops print a.dat then b.dat. They look equal.",
            "Add c d.dat. $(ls *.dat) is unquoted command substitution: word-split into a.dat, b.dat, c, d.dat. Four iterations, two of them wrong names.",
            "for f in *.dat globs to three words: a.dat, b.dat, and c d.dat as one word (globbing does not split on spaces inside a match). Three correct iterations.",
            "ls in scripts is itself a smell (parsing ls). Prefer globs or find -print0 | while IFS= read -r -d '' f.",
            "A glob that matches nothing (no .dat files, nullglob off) iterates once with f='*.dat'. [ -f \"$f\" ] then fails and you can skip.",
            "Exam: never for f in $(ls …) when names can contain spaces; use for f in *.dat.",
          ],
          result:
            "Glob for-loop keeps c d.dat as one item. $(ls) splits it into c and d.dat.",
        },
      ],
    },
    {
      heading: "Functions: return versus exit",
      body: "A shell function is name() { list; } or function name { list; } in bash. Parameters inside the function are a new positional list: $1 of the function is the first argument to the call, not the script’s $1, unless you called the function with the script’s \"$@\". $0 usually stays the script name. $# is the function’s argument count.\n\nreturn N ends the function with status N (0–255). The script continues after the call. exit N ends the whole shell (the script), not just the function. If the function is sourced in an interactive shell, exit will log you out — a famous incident. Prefer return in functions; use exit only for the script’s main usage-error path.\n\nThe function’s status is that of return, or of the last command if you fall off the end. if f; then … tests that status. Capturing output is $(f); capturing status is f; s=$? — you cannot do both without a helper, because $? after assignment is the assignment’s status.\n\nLocal variables: local x=1 in bash, not POSIX. Without local, x=1 inside a function overwrites a global x. SEBI may not ask local, but traces that set x inside a function and then echo $x outside are asking this.",
      bullets: [
        "return: leave the function, script continues. exit: leave the process (the script).",
        "Function $1…$# are the call’s arguments, not the script’s, unless you passed \"$@\".",
        "Status of a function is return N or the last command. if f; then tests it.",
      ],
      examples: [
        {
          title: "return 3 versus exit 3 from a function",
          prompt:
            "Script: f() { echo in-f; return 3; echo dead; } ; f ; echo after=$? ; g() { echo in-g; exit 3; echo also-dead; } ; g ; echo never. Trace stdout and the process status.",
          code: "f() { echo in-f; return 3; echo dead; }\nf\necho after=$?\ng() { echo in-g; exit 3; echo also-dead; }\ng\necho never",
          language: "bash",
          steps: [
            "f runs, prints in-f, return 3 skips echo dead. Control returns to the script.",
            "echo after=$? prints after=3. The script is still alive.",
            "g runs, prints in-g, exit 3 terminates the whole script. echo also-dead and echo never do not run.",
            "The process status seen by the OS is 3 (from exit), not 0.",
            "If g had used return 3, never would print and the script would end with echo’s status 0 unless you later exit 3.",
            "Printed lines: in-f, after=3, in-g. Not printed: dead, also-dead, never.",
          ],
          result:
            "return 3 continues the script (after=3). exit 3 kills the script after in-g; never is not printed; process status 3.",
        },
        {
          title: "Function positionals versus script positionals",
          prompt:
            "Invocation: bash s.sh INEA INEB. Body: f() { echo f0=$0 f1=$1 fhash=$#; } ; echo s1=$1 ; f X ; echo s1again=$1. Trace the three echos.",
          code: "f() { echo f0=$0 f1=$1 fhash=$#; }\necho s1=$1\nf X\necho s1again=$1",
          language: "bash",
          steps: [
            "Script $1 is INEA, $2 is INEB, $# is 2.",
            "echo s1=$1 prints s1=INEA.",
            "Call f X: inside f, $1 is X, $# is 1. $0 is still s.sh (or bash, depending on invocation). Prints f0=s.sh f1=X fhash=1 (path of s.sh as invoked).",
            "After f returns, script $1 is still INEA. Functions do not permanently steal the script’s positionals (they save and restore them). Prints s1again=INEA.",
            "f \"$@\" would have set the function’s $1 to INEA and $# to 2. That is how you forward.",
            "shift inside f would only shift the function’s copies, not the script’s INEA, in bash.",
          ],
          result:
            "s1=INEA; f sees $1=X and $#=1; s1again=INEA. Function positionals are the call’s arguments.",
        },
        {
          title: "if f ; then — testing a function status",
          prompt:
            "ok() { return 0; } ; bad() { return 5; } ; if ok; then echo A; else echo B; fi ; if bad; then echo C; else echo D; fi ; bad ; echo last=$?",
          code: "ok() { return 0; }\nbad() { return 5; }\nif ok; then echo A; else echo B; fi\nif bad; then echo C; else echo D; fi\nbad\necho last=$?",
          language: "bash",
          steps: [
            "ok returns 0, if treats that as true. Prints A.",
            "bad returns 5, if treats non-zero as false. else-branch prints D. C is skipped.",
            "bad again; echo last=$? prints last=5.",
            "return values above 255 wrap modulo 256. return 256 is 0 in bash — a nasty true. Stay in 0–255.",
            "ok without return would return the status of the last command in the body. An empty body returns 0.",
            "Printed: A, D, last=5.",
          ],
          result: "A then D then last=5. if uses the function’s return status; 0 is true.",
        },
        {
          title: "exit in a function versus the caller’s trap",
          prompt:
            "Script: trap 'echo caught' EXIT ; die() { echo dying; exit 2; } ; echo start ; die ; echo after. What runs, and what is the process status?",
          code: "trap 'echo caught' EXIT\ndie() {\n  echo dying\n  exit 2\n}\necho start\ndie\necho after",
          language: "bash",
          steps: [
            "trap EXIT registers a handler for shell exit, including exit from a function.",
            "start prints. die prints dying then exit 2.",
            "EXIT trap runs: prints caught. after does not run.",
            "Process status is still 2 (the exit argument). The trap does not reset it unless the trap script itself ends with exit 0.",
            "If die used return 2, EXIT would not fire yet, after would print, and the script would need a later exit to fire the trap.",
            "Printed order: start, dying, caught. Status 2.",
          ],
          result:
            "start, dying, caught (EXIT trap). after skipped. Process status 2. return would not fire EXIT yet.",
        },
      ],
    },
    {
      heading: "Pipes and redirection: > >> 2> and pipelines",
      body: "A pipeline cmd1 | cmd2 connects cmd1’s stdout to cmd2’s stdin. Both commands run concurrently. The pipeline’s status is cmd2’s status unless pipefail is set. Redirection attaches files: > file truncates and writes stdout; >> file appends stdout; 2> file sends stderr; 2>> appends stderr; &> file (bash) sends both. n>&m duplicates file descriptor n onto m.\n\nOrder: cmd > out 2> err splits the streams. cmd > both 2>&1 sends stderr to where stdout currently goes (the file both). cmd 2>&1 > both is a common mistake: 2>&1 first points stderr at the terminal (stdout’s old target), then stdout is pointed at both, and stderr stays on the terminal. Always 2>&1 after the stdout redirect if you want both in the file.\n\nHere-doc: cmd << EOF … EOF. Here-string (bash): cmd <<< word. /dev/null discards. exec > log 2>&1 redirects the rest of the script.\n\nFilters in pipelines: grep, cut, sort, uniq, awk, wc. Each reads stdin if no file is named. cat file | wc -l is a useless use of cat; wc -l < file or wc -l file is enough, but the pipeline still traces cleanly on paper.",
      bullets: [
        "> truncates stdout; >> appends; 2> stderr; 2>&1 after > file merges stderr into that file.",
        "cmd1 | cmd2 : stdout1 → stdin2. Status is cmd2’s unless pipefail.",
        "2>&1 > file leaves stderr on the terminal. > file 2>&1 is the merge you wanted.",
      ],
      examples: [
        {
          title: "Trace > versus >> on a log file",
          prompt:
            "Start with no file log. Commands: echo one > log ; echo two > log ; echo three >> log ; cat log. Write the file after each step.",
          code: "echo one > log\necho two > log\necho three >> log\ncat log",
          language: "bash",
          steps: [
            "echo one > log creates log, truncates if needed, writes one\\n. File: one.",
            "echo two > log truncates again, writes two\\n. The line one is gone. File: two.",
            "echo three >> log appends. File: two\\nthree.",
            "cat log prints two lines: two then three.",
            "If log had been a directory or unwritable, the redirect would fail before echo runs (the shell opens the file). echo would not run; $? non-zero.",
            "set -C (noclobber) would refuse echo two > log because log exists; use >| to override. >> would still be allowed.",
          ],
          result: "cat prints two / three. The second > wiped one. >> kept two and added three.",
        },
        {
          title: "2> versus 2>&1 merge order",
          prompt:
            "cmd is a script that echoes stdout-line on stdout and stderr-line on stderr. Compare (a) cmd > out 2> err (b) cmd > both 2>&1 (c) cmd 2>&1 > both. Files start absent.",
          code: "cmd() { echo stdout-line; echo stderr-line >&2; }\ncmd > out 2> err\ncmd > both 2>&1\ncmd 2>&1 > both2",
          language: "bash",
          steps: [
            "(a) stdout-line in out, stderr-line in err. Terminal silent.",
            "(b) > both first points fd1 at file both. 2>&1 then points fd2 at the same file. both contains both lines (order may interleave). Terminal silent.",
            "(c) 2>&1 first points fd2 at the current fd1, the terminal. Then > both2 points fd1 at both2. fd2 still the terminal. both2 has stdout-line; stderr-line appears on the terminal. This is the trap.",
            "To append both streams: >> both 2>&1.",
            "2> /dev/null keeps stdout and discards errors. > /dev/null 2>&1 discards both (silent success or failure).",
            "Paper: (a) split; (b) merged in both; (c) stdout in file, stderr on terminal.",
          ],
          result:
            "(a) split files. (b) > both 2>&1 merges. (c) 2>&1 > file leaves stderr on the terminal.",
        },
        {
          title: "Pipeline: grep then wc",
          prompt:
            "File t.txt lines: INEA 10, INEB 4, INEA 7, INEC 1. Command: grep INEA t.txt | wc -l . Then grep INEA t.txt | grep -v 10 | wc -l. Trace stdin/stdout of each stage.",
          code: "grep INEA t.txt | wc -l\ngrep INEA t.txt | grep -v 10 | wc -l",
          language: "bash",
          steps: [
            "grep INEA t.txt writes two lines to stdout: INEA 10 and INEA 7. INEB and INEC dropped.",
            "wc -l reads those two lines, prints 2 (usually with leading spaces). Pipeline status is wc’s 0.",
            "Second pipeline: first grep still emits two INEA lines. grep -v 10 drops lines containing 10, so INEA 10 dies, INEA 7 lives. wc -l prints 1.",
            "grep’s stdin is the file because a filename was given. wc’s stdin is the pipe, so wc does not print a filename.",
            "If grep matches nothing, it still exits 1, but with pipefail off the pipeline status is wc’s 0 on zero lines. wc -l prints 0.",
            "Useless-use-of-cat: cat t.txt | grep INEA is the same data as grep INEA t.txt.",
          ],
          result: "First pipeline prints 2. Second prints 1 (the INEA 7 line only).",
        },
        {
          title: "Redirect the whole script versus one command",
          prompt:
            "Script: echo a ; echo b >&2 ; echo c. Run as bash s.sh > log 2>&1 versus bash s.sh 2> log versus ( echo a ; echo b >&2 ) > log. What is on the terminal?",
          code: "echo a\necho b >&2\necho c\n# run: bash s.sh > log 2>&1",
          language: "bash",
          steps: [
            "bash s.sh > log 2>&1 attaches the shell’s stdout and stderr to log before the script runs. a, b, c all go to log. Terminal silent.",
            "bash s.sh 2> log attaches only stderr. a and c (stdout) hit the terminal; b hits log.",
            "A grouping ( echo a ; echo b >&2 ) > log redirects only that group’s stdout. a in log, b on the terminal (stderr not redirected), and c is outside the group so on the terminal if it were outside — in the prompt the group is only a and b.",
            "exec > log 2>&1 inside a script permanently redirects the rest of that process, similar to invoking the script with > log 2>&1.",
            "Background: bash s.sh > log 2>&1 & still writes to log; the terminal is free. $! is the script’s PID.",
            "Paper for the first run: terminal empty, log has a, b, c (order a, b, c unless buffering shuffles stdout/stderr).",
          ],
          result:
            "bash s.sh > log 2>&1: all three lines in log, terminal empty. 2> log alone: b in log, a and c on the terminal.",
        },
      ],
    },
    {
      heading: "chmod, grep, wc, ps, kill",
      body: "chmod changes permission bits. Symbolic: u/g/o/a plus +/−/= and r/w/x. Numeric (octal): three digits owner-group-other, bits 4 read, 2 write, 1 execute. 754 is rwxr-xr--. 644 is rw-r--r--. 755 is rwxr-xr-x. chmod +x file is a+x. chmod -R walks a tree (dangerous). umask subtracts bits from new files.\n\ngrep prints matching lines. -i ignore case, -v invert, -c count matches, -n line numbers, -E extended regex, -F fixed string, -l filenames only, -q silent (status only). Exit 0 if any match, 1 if none, 2 if error.\n\nwc counts lines (-l), words (-w), bytes (-c) or chars (-m). Default prints all three plus the filename. Piped wc has no filename.\n\nps lists processes. ps PID, ps -ef or ps aux (BSD). Columns you need: PID, PPID, CMD. kill [-s SIG] PID sends a signal, default SIGTERM (15), which can be caught. kill -9 / SIGKILL cannot be caught. kill -l lists names. kill %1 kills job 1 of the current shell. Do not kill -9 first; TERM then wait, then KILL is the civilised order.",
      bullets: [
        "chmod octal: 4r 2w 1x per u/g/o. 754 = rwxr-xr--. 644 files, 755 dirs/scripts.",
        "grep -i -v -c -n -E -q. Status 0 match, 1 no match.",
        "kill PID = SIGTERM 15. kill -9 = SIGKILL. $! and $$ are the PIDs you already traced.",
      ],
      examples: [
        {
          title: "Decode chmod 754 and a symbolic change",
          prompt:
            "File starts as 644 rw-r--r--. Commands: chmod 754 trade.sh ; ls -l trade.sh ; chmod o+w,g-x trade.sh. Write bits after each chmod. Who can execute after 754?",
          code: "chmod 754 trade.sh\nchmod o+w,g-x trade.sh",
          language: "bash",
          steps: [
            "644 = owner rw, group r, other r. No execute.",
            "754: 7=4+2+1 rwx owner, 5=4+1 r-x group, 4=r other. ls -l: -rwxr-xr--. Owner and group can execute; other can only read.",
            "chmod o+w,g-x: other gains w → r- becomes rw- for other. group loses x → r-x becomes r-- for group. Owner untouched rwx.",
            "Final: rwx r-- rw- which is 7 4 6, octal 746.",
            "chmod +x is a+x: would add execute to u,g,o that do not have it. After 746 that would become 757 if applied instead of the symbolic pair — not asked, but know +x is not 755 by itself on a 644 file: 644+111 = 755, yes for files that had no x. For 746, a+x would set x on all three: 757.",
            "Directory execute bit is search (you can cd and lookup names). A directory 644 is unusual and blocks cd for the owner even though they can read the listing on some systems inconsistently — exam: dirs 755, files 644.",
          ],
          result:
            "After 754: rwxr-xr-- (owner+group execute). After o+w,g-x: rwxr--rw- (746). Other can write, group cannot execute.",
        },
        {
          title: "grep -c -v -i on a four-line file",
          prompt:
            "File alerts.txt: nse INEA, BSE ineb, nse INEC, nse inea. Commands: grep nse alerts.txt | wc -l ; grep -c nse alerts.txt ; grep -ci nse alerts.txt ; grep -v nse alerts.txt ; grep -E 'INE[AB]' alerts.txt.",
          code: "grep nse alerts.txt | wc -l\ngrep -c nse alerts.txt\ngrep -ci nse alerts.txt\ngrep -v nse alerts.txt\ngrep -E 'INE[AB]' alerts.txt",
          language: "bash",
          steps: [
            "grep nse (case-sensitive) matches lines 1, 3, 4 (line 2 is BSE). Three lines. wc -l prints 3. grep -c nse also prints 3. They agree here.",
            "grep -ci nse ignores case so BSE’s line still does not match (no nse substring; BSE is different). Still 3. If a line said NSE, -i would add it.",
            "Wait: line 2 is 'BSE ineb' — no nse. -ci still 3. Line 4 'nse inea' matches.",
            "grep -v nse prints the lines that do NOT contain nse: only BSE ineb.",
            "grep -E 'INE[AB]' matches INEA or INEB as regex. Line 1 INEA yes; line 2 ineb — case sensitive, INE[AB] does not match ineb; line 3 INEC no (C not A/B); line 4 inea no (case). Only line 1.",
            "grep -Ei 'INE[AB]' would match line 1 INEA, line 2 ineb, line 4 inea. Three lines. -E is ERE; without -E, [AB] still works in basic grep, but | would not.",
          ],
          result:
            "nse count 3; -v prints BSE ineb; -E 'INE[AB]' prints only nse INEA. -i would pull inea/ineb in as well.",
        },
        {
          title: "wc -l -w -c on a here-string",
          prompt:
            "printf 'a b\\nc\\n' | wc -l -w -c . Count lines, words, bytes. Remember the newlines are bytes.",
          code: "printf 'a b\\nc\\n' | wc -l -w -c",
          language: "bash",
          steps: [
            "Bytes: a space b newline c newline. Characters a, space, b, \\n, c, \\n → 6 bytes.",
            "Lines (-l): wc counts newline characters. Two newlines → 2. (A missing final newline would under-count lines, same trap as while read.)",
            "Words (-w): a, b, c → 3. Space and newline are separators.",
            "Default wc order is lines words bytes: 2 3 6. Piped, no filename column.",
            "wc -c counts bytes, wc -m counts characters (same here in ASCII). A UTF-8 rupee symbol would make -c > -m.",
            "grep -c versus wc -l: grep -c counts matching lines; wc -l counts all lines on its stdin. After a grep, they match.",
          ],
          result: "2 lines, 3 words, 6 bytes. wc prints 2 3 6.",
        },
        {
          title: "ps, $!, and kill -TERM then kill -9",
          prompt:
            "Script: sleep 300 & echo pid=$! ; kill -s TERM $! ; sleep 1 ; ps -p $! ; kill -9 $! 2>/dev/null ; echo done. sleep does not trap TERM, so it dies on the first kill. Trace statuses and why -9 is skipped in the success path.",
          code: "sleep 300 &\necho pid=$!\nkill -s TERM $!\nsleep 1\nps -p $!\nkill -9 $! 2>/dev/null\necho done",
          language: "bash",
          steps: [
            "sleep 300 & : $! is the sleep PID, say 8802. echo pid=8802.",
            "kill -s TERM 8802 sends SIGTERM (15), same as kill 8802. sleep has no trap, so it terminates.",
            "After sleep 1, ps -p 8802 finds no process (or shows a zombie briefly). ps non-zero if empty.",
            "kill -9 8802 would send SIGKILL. The PID is already gone, so kill errors “no such process”; 2>/dev/null hides it. You do not need -9 if TERM worked.",
            "If sleep had trap '' TERM, TERM would be ignored, ps would still show 8802, and kill -9 would be required to murder it. Exam: -9 is last resort because the process cannot flush files.",
            "kill $$ from inside the script would terminate the script itself, not the sleep. kill $! is the background child. Printed: pid=8802 then done.",
          ],
          result:
            "TERM is enough for untrapped sleep; ps then misses the PID; -9 is unnecessary (and would fail with no such process). Use $! not $$.",
        },
      ],
    },
  ],
};
