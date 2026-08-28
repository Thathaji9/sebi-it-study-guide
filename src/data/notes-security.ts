import type { TopicNote } from "@/data/notes";

export const notesSecurity: TopicNote = {
  topic: "security",
  title: "Security — techniques (beginner)",
  blurb:
    "Security is keeping secrets, spotting tampering, and staying open for honest users. Tag every incident with C, I, or A first. Then pick hashing versus encryption, and know what ransomware actually breaks. Name the control that restores that letter.",
  blocks: [
    {
      heading: "CIA triad",
      body: "Confidentiality is “only the right people may read it” — a lock on a diary. Integrity is “nobody silently changed it” — a wax seal. Availability is “it works when we need it” — the library stays open.\n\nEncryption, passwords, and TLS serve C. Hashes, MACs, and signatures serve I. Backups, spare servers, and DDoS defence serve A. Authentication is “who are you?”. Authorisation is “what may you do?”. Do not mix them. Ransomware usually breaks I and A, and sometimes C if a copy was stolen.",
      howTo: [
        "Read the stem. Tag C, I, A (or a pair). Then pick the control that restores that tag.",
        "Encryption without backups does not restore A after ransomware. A hash without a secret does not prove who sent it.",
        "A firewall does not restore a wiped disk. MFA does not fix a missing owner check (IDOR).",
        "Authn succeeded ≠ authz succeeded. Empty logs break accountability, a cousin of I.",
      ],
      bullets: [
        "C: secrecy — encryption, ACL, TLS. Failure = leak.",
        "I: no silent change — hash, MAC, signature. Failure = tamper.",
        "A: usable when needed — backup, HA, DDoS defence. Failure = down. Ransomware typically I+A, sometimes C too.",
      ],
      examples: [
        {
          title: "Tag five incidents",
          prompt:
            "(i) attacker reads HR mail on open SMTP (ii) one digit of a published NAV flipped (iii) SYN flood (iv) ransomware encrypts servers and steals a copy (v) intern given lasting admin.",
          steps: [
            {
              do: "(i) C eavesdrop (ii) I silent change (iii) A DoS (iv) I+A, plus C if the stolen copy matters (v) C+I+A via excess privilege.",
              why: "Open mail is a diary without a lock. A flipped figure is a broken seal. A flood shuts the library. Ransomware both seals files in a box you cannot open and may photocopy them. Standing admin is a master key left with a visitor.",
            },
            {
              do: "Fix C with TLS; I with a signature or hash; A with SYN cookies; ransomware A with offline backups; (v) with least privilege.",
              why: "Match the control to the letter that broke.",
            },
            {
              do: "Integrity is not confidentiality: a public circular can still need a seal.",
              why: "Anyone may read it; nobody may silently rewrite it.",
            },
          ],
          result:
            "(i) C (ii) I (iii) A (iv) I+A plus C if exfiltrated (v) C+I+A. Tag the goal, then the control.",
        },
        {
          title: "Which control restores which letter?",
          prompt:
            "Match: disk encryption; vendor SHA-256 of a download; weekly offline backups; MFA on VPN; a second availability zone.",
          steps: [
            {
              do: "Disk encryption → C. Digest check → I. Backups → A. MFA → authn (protects C of the path). Extra AZ → A.",
              why: "A stolen laptop cannot be read (C) but the owner still lost use (A). Backups do not encrypt the live database.",
            },
            {
              do: "Do not credit a backup as a confidentiality control, or disk encryption as an availability control.",
              why: "CIA answers want the control’s main letter, not every side-effect.",
            },
            {
              do: "If the digest is fetched over the same broken channel, it is weak; a signature is stronger authenticity.",
              why: "An attacker who changes the file can change an unsigned hash next to it.",
            },
          ],
          result:
            "FDE → C; digest → I; backups → A; MFA → authn/C of the channel; extra AZ → A.",
        },
        {
          title: "Public hash versus encrypted laptop with no backup",
          prompt:
            "A public PDF plus SHA-256 on HTTPS. A salary file encrypted on a laptop, no backup. What does each guarantee?",
          steps: [
            {
              do: "Circular+hash: integrity (and site authenticity via HTTPS), not secrecy. Anyone may read the PDF.",
              why: "The wax seal is for a public notice. That is not a failure of C.",
            },
            {
              do: "Encrypted salary file: C. Without a MAC, I is not designed in. Without a backup, A dies if the disk or key dies.",
              why: "Lost keys = lost data. Classic “C at the expense of A”.",
            },
            {
              do: "Pick the letters the asset needs. More crypto is not automatically more security.",
              why: "The public file needed I. The laptop needed C and A.",
            },
          ],
          result:
            "Public circular+hash: I, not C. Encrypted salary, no backup: C, weak A. Match controls to goals.",
        },
      ],
    },
    {
      heading: "Hashing versus encryption versus MAC versus signature",
      body: "A hash (SHA-256) is a fingerprint: one-way, fixed length, no key. You cannot “decrypt” it. Anyone can recompute it, so a hash beside a message is not authenticity.\n\nEncryption is a locked box: reversible with a key. Symmetric (AES) uses one secret; asymmetric (RSA) uses public to lock, private to unlock. A MAC is a keyed stamp among friends who share a secret — detects tampering, not courtroom non-repudiation (either friend could have stamped). A digital signature uses a private key to sign and a public key to verify — anyone can check, only the holder could have signed. Exam grid: hide → encrypt; detect only → hash; shared-secret authenticity → MAC; public verify / non-repudiation → signature.",
      howTo: [
        "Need secrecy → encrypt (prefer AEAD: ciphertext + tag). Need detect-tamper, no key yet → hash.",
        "Need detect-tamper among key-holders → MAC. Need any citizen to verify SEBI sent it → signature.",
        "Password storage → slow KDF, not reversible encryption, not raw SHA-256.",
        "Bare hash(M) next to M is circular: the attacker re-hashes. That is why TLS uses MAC/AEAD.",
      ],
      bullets: [
        "Hash: one-way, no key, integrity of content, not authenticity.",
        "Encrypt: reversible with a key, confidentiality. Prefer AEAD.",
        "MAC: keyed tag among friends. Signature: private sign, public verify, non-repudiation.",
      ],
      examples: [
        {
          title: "Which primitive?",
          prompt:
            "(i) hide a backup on tape (ii) detect bit-rot of that tape (iii) any citizen verifies a SEBI PDF (iv) VPN packets not modified.",
          steps: [
            {
              do: "(i) encrypt (ii) hash or the AEAD tag (iii) signature (iv) MAC/AEAD on the session key.",
              why: "A fingerprint does not hide the backup. Citizens cannot share a SEBI MAC key. VPN peers already share a session secret — a per-packet signature would be slow and pointless.",
            },
            {
              do: "Public audience ⇒ signature. Shared secret ⇒ MAC. Hide ⇒ encrypt. Detect only ⇒ hash.",
              why: "That four-way grid is the whole MCQ family.",
            },
            {
              do: "AES-GCM can do (i) and (ii) together (C+I). Still pick the word the stem asked for.",
              why: "Combining is allowed; the mark scheme wants the primitive named.",
            },
          ],
          result:
            "(i) encrypt (ii) hash or AEAD tag (iii) signature (iv) MAC/AEAD.",
        },
        {
          title: "Why hash(message) is not a MAC",
          prompt:
            "Client sends M and H=SHA-256(M) in the clear. Attacker changes M to M′. Can they fool a verifier that only checks hash(received)==H?",
          steps: [
            {
              do: "Yes. The attacker computes H′ = SHA-256(M′) and replaces both. The verifier hashes what it got and compares to the also-replaced H′ — always succeeds.",
              why: "A fingerprint is public. Shipping it next to the message, unprotected, is checking two attacker-controlled values against each other.",
            },
            {
              do: "A MAC adds a secret K. HMAC(K, M′) cannot be made without K. A signature needs the private key.",
              why: "Authenticity needs something the attacker does not have.",
            },
            {
              do: "This is why “we hashed the password on the wire without TLS” still lets someone steal the hash (replay / pass-the-hash).",
              why: "Unkeyed hash is not a lock and not a stamp.",
            },
          ],
          result:
            "Bare hash(M) beside M is not authenticity: the attacker re-hashes. Need a MAC or a signature. Hash is unkeyed.",
        },
        {
          title: "AES-CBC with no MAC is C without I",
          prompt:
            "A developer stores AES-CBC ciphertext, no tag. Which CIA letter is missing? Name a modern replacement.",
          steps: [
            {
              do: "Confidentiality can hold (random IV). Integrity and authenticity are missing. Bit-flips and padding oracles follow.",
              why: "A locked box whose seal you can peel and restick is not a sealed box. CBC does not detect a modified ciphertext.",
            },
            {
              do: "Use AES-GCM or ChaCha20-Poly1305: ciphertext + auth tag. Decrypt refuses garbage if the tag fails.",
              why: "AEAD is C+I in one standardised box. TLS 1.3 is AEAD-only.",
            },
            {
              do: "Encrypt-then-MAC (HMAC over IV||C) also restores I. AEAD is that pattern, harder to get wrong.",
              why: "Integrity is not optional. “Why not ECB” (identical blocks leak) is the same moral: encryption without care leaks I or C.",
            },
          ],
          result:
            "CBC-only is C without I. Use AES-GCM or ChaCha20-Poly1305. TLS 1.3 is AEAD-only.",
        },
      ],
    },
    {
      heading: "Web attacks: SQLi, XSS, CSRF",
      body: "SQL injection happens when user text is glued into a SQL sentence, so the attacker can change the grammar. Fix: prepared statements (parse first, bind values later), like filling a form with a name in a data box, not rewriting the form’s printed words.\n\nXSS injects script into a page other people will run — stored (saved), reflected (in a URL once), or DOM (client-side). CSRF tricks a logged-in browser into sending a real cookie’d request the user did not mean (hidden form on attacker.org). Different sinks: database parser vs browser vs cookie auto-send. Parameterise SQL. Encode output. Tokenise state-changing posts.",
      howTo: [
        "UNION/OR in logs → SQLi. Encode/CSP/HttpOnly for XSS. CSRF token or SameSite for forged posts.",
        "SQLi defence to write: prepared statements / bound parameters, plus least-privilege DB account.",
        "XSS: context-aware output encoding + CSP. HttpOnly stops JS reading the cookie; the browser still sends it.",
        "CSRF needs the victim logged in. XSS can steal the session even without a third-site form. Do not mix the names.",
      ],
      bullets: [
        "SQLi: concat SQL + input. Fix: bound parameters.",
        "XSS: attacker script in others’ browsers. Fix: encode output, CSP, HttpOnly.",
        "CSRF: forged request with victim cookies. Fix: CSRF token, SameSite.",
      ],
      examples: [
        {
          title: "Concatenated SQL versus placeholders",
          prompt:
            "Login builds SQL by gluing name and password with quotes. Why is extra syntax in the name field dangerous? Show the prepared-statement idea.",
          code: "PreparedStatement ps = conn.prepareStatement(\n    \"SELECT * FROM users WHERE name = ? AND pass = ?\");\nps.setString(1, name);\nps.setString(2, pass);",
          language: "java",
          steps: [
            {
              do: "With concatenation the database parses SQL after the name is spliced in. Quotes in the name can close the string and add more SQL (the classic tautology / UNION story).",
              why: "The parser cannot see a boundary between the programmer’s sentence and the user’s words. That is a confused deputy.",
            },
            {
              do: "Prepared statement: send the SQL with ? first (parsed), then bind the name as data. Quotes inside the value cannot close a string already parsed.",
              why: "Structure stays SELECT … WHERE name=? AND pass=?. Input stays a value, like a filled blank on a printed form.",
            },
            {
              do: "Also store a KDF of the password, not pass in cleartext, and use a least-privilege DB account.",
              why: "Parameterisation is the primary mark. The rest is defence in depth.",
            },
          ],
          result:
            "Concatenation lets input change SQL structure. Prepared statements parse first, bind later, so input stays data.",
        },
        {
          title: "Stored XSS in a comment",
          prompt:
            "Comments store raw HTML and the profile page echoes it. User B opens that profile while logged in. What can a script do? Three reductions?",
          steps: [
            {
              do: "The script runs as the site, in B’s browser, and can call APIs with B’s cookies, steal a non-HttpOnly session, or fake a login form.",
              why: "The application treated the comment as HTML, not as text. Same origin = the site’s powers.",
            },
            {
              do: "Encode < to &lt; at the HTML-text sink. CSP with a nonce and no unsafe-inline. Cookie HttpOnly; Secure; SameSite.",
              why: "Encode stops the tag. CSP blocks leftover script. HttpOnly hides the cookie from JS (CSRF can remain). Defence in depth.",
            },
            {
              do: "This is a browser-origin problem, not a SQL parser problem. SQLi would be at the database.",
              why: "Different sink, different fix. Do not “sanitize input” as a vague 2-marker; name the sink.",
            },
          ],
          result:
            "Stored comment script runs as the site in B’s browser. Encode output, CSP, HttpOnly+Secure cookies.",
        },
        {
          title: "CSRF on change-email",
          prompt:
            "Bank session cookie, no SameSite, no CSRF token. Victim visits attacker.org which auto-POSTs to bank.example/email. What happens? How does a token stop it?",
          steps: [
            {
              do: "The browser attaches the bank cookie. The bank sees a genuine logged-in POST and changes the email. Authn was valid; intent was not.",
              why: "CSRF is a confused deputy of the cookie jar. No script need run on the bank’s origin.",
            },
            {
              do: "A random token in the real form, checked server-side. attacker.org cannot read it (same-origin). Missing/wrong token → reject. SameSite=Lax/Strict also withholds the cookie on that cross-site POST.",
              why: "The attacker cannot guess a secret they cannot see. Modern browsers default toward Lax; exams still want the token as the classic fix.",
            },
            {
              do: "XSS on the bank would let the attacker read the token and defeat CSRF defences. Stacked bugs.",
              why: "CSRF tokens assume the origin’s HTML is not already scriptable.",
            },
          ],
          result:
            "The bank performs a state change the victim did not intend. CSRF token (and SameSite) stop cross-origin POSTs. CSRF ≠ XSS.",
        },
      ],
    },
    {
      heading: "Phishing, MITM, and ransomware",
      body: "Phishing is a fake trusted message that steals passwords or drops malware — a forged note from “the school office”. Spear-phishing is targeted. MFA that is not origin-bound (SMS OTP) can still be relayed live. FIDO2 binds the answer to the real site name.\n\nMITM sits on the path (rogue Wi-Fi, ARP spoof) and can read, change, or drop traffic. TLS with a checked certificate turns them into someone who can only delay packets.\n\nRansomware locks files (or locks and steals them) and sells the key. Integrity of the bytes is gone, availability is gone, confidentiality may be gone (double extortion). Restore from offline/immutable backups; paying is not a control.",
      howTo: [
        "Name the primary attack the stem described, then CIA letters, then one prevent and one recover control.",
        "Look-alike domain + form → phishing (C of the password). Padlock on the wrong name is not “TLS failed”.",
        "HTTP on a rogue AP → C and I fail. HTTPS + valid cert + HSTS → AP cannot read or forge the page.",
        "Ransomware tabletop: isolate first, rotate credentials, notify, restore from a backup that was not mounted. Never “pay” as the A plan.",
      ],
      bullets: [
        "Phishing: fake trust to steal or infect. MFA + DMARC + training. FIDO2 is phishing-resistant; SMS OTP is not.",
        "MITM: on-path read/alter. TLS with validation, HSTS.",
        "Ransomware: I+A (often C). Immutable backups, least privilege, EDR. Payment is not the availability plan.",
      ],
      examples: [
        {
          title: "Look-alike login page",
          prompt:
            "Email “from SEBI” links to sebi-gov.in/login (hyphen). User types the password. CIA letter? Why SMS OTP still fails? What would FIDO2 do?",
          steps: [
            {
              do: "Confidentiality of the password is lost. A valid TLS padlock on sebi-gov.in only proves the attacker owns that host.",
              why: "Users must check the name, not only the lock. HSTS on the real name does not protect a different name.",
            },
            {
              do: "SMS/email OTP is phishable: the fake page asks for the OTP and a proxy submits password+OTP to the real site in seconds.",
              why: "MFA that is not bound to the origin is still a C-fail in a live relay.",
            },
            {
              do: "FIDO2 origin-binds the assertion to sebi.gov.in. A token for sebi-gov.in will not satisfy the real site.",
              why: "Phishing-resistant MFA. Also DMARC, reporting, block look-alikes. Training helps but is not enough alone.",
            },
          ],
          result:
            "C of the password (and of any relayed OTP). FIDO2 survives; SMS OTP does not. Padlock ≠ the right site.",
        },
        {
          title: "Coffee-shop MITM: HTTP versus HTTPS",
          prompt:
            "Rogue AP. http://news.example versus https://bank.example with a valid cert and HSTS. What can the AP read or change?",
          steps: [
            {
              do: "HTTP: AP sees and can modify everything (C and I fail). HTTPS validated: AP sees IPs, maybe SNI, sizes — not the HTTP body. Forgery breaks the AEAD tag.",
              why: "Cleartext is a postcard. TLS with the right name is a locked, sealed envelope. The AP can still drop packets (A).",
            },
            {
              do: "HSTS stops SSL-strip (rewriting https links to http). Clicking through a cert warning undoes the model.",
              why: "“Accept this cert” is volunteering to talk to the MITM.",
            },
            {
              do: "A corporate inspect-proxy the laptop trusts is an intentional MITM versus the cafe, not versus the company.",
              why: "You encrypted to the proxy. That is a policy choice, not cafe-grade C to the bank.",
            },
          ],
          result:
            "HTTP: AP can read and alter all. HTTPS+valid cert+HSTS: AP cannot read or forge application data; can drop/delay. Never click through bank cert warnings.",
        },
        {
          title: "Ransomware tabletop",
          prompt:
            "Documents replaced by .enc files, ransom note, a copy was uploaded. Tag C/I/A. Order: isolate, restore last week’s offline backup, rotate credentials, notify.",
          steps: [
            {
              do: "I: bytes are not the originals. A: staff cannot open files. C: stolen copy is a leak even if you restore.",
              why: "Ransomware is a CIA incident, not “just malware”. Double extortion is C plus the lock.",
            },
            {
              do: "Isolate first so the restore is not re-encrypted. Rotate credentials the actor may have. Notify as required. Restore from an offline/immutable backup; test a sample file.",
              why: "Containment protects A of the backup. Paying funds crime and may fail. An untested backup is a hope, not a control.",
            },
            {
              do: "Prevention extras: FIM, segmentation, EDR, least privilege, email filtering.",
              why: "The exam wants prevent and recover, not only one.",
            },
          ],
          result:
            "I+A, plus C if exfiltrated. Isolate, rotate, notify, restore from offline backups. Payment is not the A plan.",
        },
      ],
    },
    {
      heading: "Buffer overflow (software security)",
      body: "A buffer overflow writes past the end of a fixed box in memory, like pouring too much water into a cup so it spoils the papers beside it. In classic C, those papers include the return address. Integrity of control flow is lost; the program may crash (A) or jump somewhere unintended. gets() and unbounded strcpy are the textbook triggers.\n\nDefences: bounded copies (fgets, snprintf), memory-safe languages, stack canaries, NX (data is not executable), ASLR (addresses unpredictable). Java throwing ArrayIndexOutOfBounds is not a C smash — the JVM checks the rim of the cup. Memory safety ≠ absence of SQLi.",
      howTo: [
        "Unbounded write into a fixed buffer → overflow. Name I of adjacent state (often the return address), then A (crash), maybe C (leak/hijack).",
        "Code fix first: fgets(buf, sizeof buf, stdin) / snprintf, not “enable ASLR” alone.",
        "Canary detects before jump. NX stops executing the spilled bytes. ASLR makes a guessed jump miss. Bounds check prevents the write.",
        "Java/Python growing lists are a different bug class. They can still have injection.",
      ],
      bullets: [
        "Overflow: write past a buffer, smash adjacent state (often the return address).",
        "Impact: I of control flow, A (crash), sometimes C.",
        "Fix: bounded copies, safe languages, canaries, NX, ASLR. gets/strcpy on untrusted input is the trigger.",
      ],
      examples: [
        {
          title: "gets() on a 16-byte stack buffer",
          prompt:
            "char buf[16]; gets(buf); then the function returns. How can CIA break? Three mitigations?",
          code: "void greet(void) {\n    char buf[16];\n    gets(buf);  /* unbounded */\n}",
          language: "cpp",
          steps: [
            {
              do: "gets reads until newline, ignoring 16. Longer input overwrites neighbours, often the saved return address (I of control data).",
              why: "The cup overflowed onto the return ticket. The CPU will jump where those bytes say.",
            },
            {
              do: "Unmapped jump → crash (A). Crafted jump → unintended instructions (then any CIA of the process). The exam wants the picture, not a working exploit.",
              why: "Integrity first; availability often follows; confidentiality if hijack reads secrets.",
            },
            {
              do: "Fix: fgets(buf, sizeof buf, stdin). Mitigations: canary (detect, abort), NX, ASLR. None make gets safe; they raise the bar.",
              why: "Removing gets is the decades-old rule. Flags are belts; the bounded read is the trousers.",
            },
          ],
          result:
            "Unbounded gets overwrites adjacent stack (I), often crashes (A), can hijack control. Use fgets/snprintf, canaries, NX, ASLR.",
        },
        {
          title: "Match the mitigation",
          prompt:
            "Match canary, NX, ASLR, bounds check: (i) never write past 16 bytes (ii) overwritten return detected before jump (iii) bytes in the buffer cannot run as code (iv) a guessed jump misses.",
          steps: [
            {
              do: "(i) bounds check / fgets / safe language (ii) canary (iii) NX/DEP (iv) ASLR.",
              why: "Prevention beats detection beats mitigation. Mention the bounded copy first if they ask for a code fix.",
            },
            {
              do: "Canary: the write already happened, but control is not transferred; process aborts (small A to avoid a worse one).",
              why: "Detection at return time, not prevention of the spill.",
            },
            {
              do: "NX does not stop return-oriented reuse of existing code. ASLR entropy can leak via over-reads. Defence in depth: all four.",
              why: "No single flag is the whole story. The syllabus answer still starts with “check lengths; do not use gets”.",
            },
          ],
          result:
            "(i) bounds check (ii) canary (iii) NX (iv) ASLR. Prevention first.",
        },
        {
          title: "Java bounds check versus C overflow",
          prompt:
            "Java a[i]=x with i==a.length. C buf[i]=x with i==sizeof(buf). Contrast CIA and “memory safety”.",
          steps: [
            {
              do: "Java throws ArrayIndexOutOfBoundsException. Adjacent objects are not overwritten. Local A of that request; I of the heap layout holds.",
              why: "The JVM checks the rim of the cup. Controlled failure, not a smash.",
            },
            {
              do: "C’s one-past write is undefined. Neighbour bytes change. I of process memory is the memory-unsafety contrast.",
              why: "No automatic check. That is the syllabus exhibit.",
            },
            {
              do: "Memory safety ≠ application security. Java can still concat SQL or store unsalted SHA-1. Pick the bug class the stem shows.",
              why: "Safe languages reduce overflows; they do not remove injection or bad crypto.",
            },
          ],
          result:
            "Java throws (local A, no smash). C overwrites neighbours (I). Memory safety ≠ absence of SQLi.",
        },
      ],
    },
    {
      heading: "Authentication, MFA, and password KDFs",
      body: "Authentication factors: something you know (password), have (token, phone, FIDO key), are (fingerprint). MFA means two different categories — two passwords are not MFA. Password + TOTP is MFA (still phishable). Smart card + PIN is textbook MFA. FIDO2 is phishing-resistant.\n\nNever store reversible AES(password) with a key in config. Never store raw SHA-256(password): fast, unsalted, rainbow-tableable. Use a slow KDF (Argon2id, bcrypt, scrypt, PBKDF2) with a unique random salt per user. Salt is not secret; it makes every row a different lock. A pepper is a secret kept off the database (KMS). Stretching makes each guess expensive.",
      howTo: [
        "MFA test: two different categories, independent. know+know or are+are is not MFA.",
        "Stolen dump → salted slow KDF + pepper. Live guessing → lockout, rate-limit, MFA.",
        "Verify by recomputing the KDF, not by decrypting. You never need the plaintext password.",
        "TLS still required so the password is not sniffed. The KDF protects the file at rest, not the wire.",
      ],
      bullets: [
        "Factors: know / have / are. MFA = two different categories. FIDO2 resists phishing; SMS OTP does not.",
        "Store Argon2id/bcrypt/scrypt/PBKDF2(password, salt, cost). Never raw hash, never AES(password) in app config.",
        "Salt: per-user, unique, not secret. Pepper: secret, off-DB. Stretching slows guesses.",
      ],
      examples: [
        {
          title: "Unsalted SHA-256 dump",
          prompt:
            "8 million SHA-256(password) values, no salt. Why rainbow tables work, why duplicates show, and the salted KDF repair.",
          code: "salt = os.urandom(16)\nstored = salt + hashlib.pbkdf2_hmac(\n    \"sha256\", password.encode(), salt, 200_000)",
          language: "python",
          steps: [
            {
              do: "SHA-256 is fast. One rainbow table of common passwords cracks every user who chose Welcome@123. Identical hashes mean identical passwords.",
              why: "No salt ⇒ one fingerprint recipe for the whole school. Two students with the same password look the same in the dump.",
            },
            {
              do: "Repair: random 16-byte salt per user, slow KDF, store algorithm+cost+salt+digest. Verify by recomputing.",
              why: "Salt makes precomputed tables need a copy per user — infeasible. Stretching makes each guess hurt on a GPU.",
            },
            {
              do: "Still use TLS on login and MFA. The KDF is for stolen-at-rest dumps, not a substitute for lockout.",
              why: "Online and offline guessing are different controls.",
            },
          ],
          result:
            "Unsalted SHA-256 is fast and rainbow-tableable, and it reveals duplicates. Per-user salt + slow KDF makes offline guessing expensive and unique per row.",
        },
        {
          title: "Is this MFA?",
          prompt:
            "(i) password + TOTP (ii) password + security question (iii) fingerprint + face (iv) smart card + PIN (v) password + email code to the same mailbox.",
          steps: [
            {
              do: "(i) MFA know+have. (ii) not — two knows. (iii) not — two biometrics. (iv) MFA have+know. (v) weak / often not independent.",
              why: "MFA means two different factor families, not two passwords. The mailbox is often unlocked with the same password.",
            },
            {
              do: "Password + TOTP is MFA but still phishable. FIDO2 is the phishing-resistant upgrade.",
              why: "“Is it MFA?” and “is it phish-resistant?” are different questions.",
            },
            {
              do: "Smart card + PIN is the classic: the PIN is useless without the card; the card is locked without the PIN.",
              why: "Independence is the point.",
            },
          ],
          result:
            "(i) MFA (ii) not (iii) not (iv) MFA (v) weak. MFA = two different categories.",
        },
        {
          title: "Pepper versus salt versus AES(password)",
          prompt:
            "Where does the salt live? Where would a pepper live? Why is AES(password) with a key in app config worse than Argon2id?",
          steps: [
            {
              do: "Salt lives in the same row as the digest: unique, random, not secret. Pepper lives in KMS/HSM, not in the DB.",
              why: "Salt’s job is uniqueness. Pepper’s job is “dump of the users table is not enough”.",
            },
            {
              do: "AES(password) is reversible. DB dump + config dump = every password in plaintext. Users reuse them elsewhere. You do not need plaintext to authenticate.",
              why: "A KDF has no undo key. Verification is compare-the-fingerprint, not open-the-box.",
            },
            {
              do: "Raising Argon2 cost on next login is easy. Rotating an AES password key requires re-encrypting every row and still leaves reversible secrets.",
              why: "Wrong tool for password storage.",
            },
          ],
          result:
            "Salt in the row (public, unique). Pepper in KMS (secret). Argon2id beats AES(password) because verification must not be reversible.",
        },
      ],
    },
    {
      heading: "Network audit versus systems audit, and TLS",
      body: "A network audit looks at paths and plumbing: firewalls, segmentation, open ports, Wi-Fi, VPN. Question: “can an outsider reach the database port?” A systems audit looks at hosts and apps: patches, accounts, EDR, logs, backups. Question: “is this server unpatched and running as root?”\n\nTLS gives a confidential, integrity-protected, authenticated pipe between two applications — a locked, sealed envelope to a named server — if the client checks the certificate. It does not hide IPs, does not stop phishing on a look-alike domain with its own cert, does not fix SQLi/XSS/CSRF, and does not restore ransomware files. HTTPS is HTTP over TLS on 443.",
      howTo: [
        "Path/ACL/VLAN/SSID → network. OS/DBA/password/patch/log → systems. Some findings have both owners.",
        "TLS jobs in order: TCP, Hello (cipher), cert validate (server authenticity), ephemeral keys, AEAD records (C+I of HTTP).",
        "Browser must check name, expiry, chain. Otherwise you encrypted to the wrong party.",
        "Write findings as condition, CIA impact, owner, remediation, retest — not the adjective “insecure”.",
      ],
      bullets: [
        "Network audit: firewalls, segmentation, ports, Wi-Fi, VPN, flows.",
        "Systems audit: OS patches, accounts, EDR, logs, app/DB config, backups.",
        "TLS: C+I in transit + server authenticity if the cert is validated. Not anti-phish for the wrong hostname, not authz.",
      ],
      examples: [
        {
          title: "Network or systems finding?",
          prompt:
            "(i) firewall allows 0.0.0.0/0 to 5432 (ii) PostgreSQL as root, two years unpatched (iii) guest SSID on finance VLAN (iv) local Admin password Password@1 on 40 hosts (v) no central syslog.",
          steps: [
            {
              do: "(i) network ACL (ii) systems host/DBA (iii) network segmentation (iv) systems accounts (v) systems logging (unless the stem blamed the collector network).",
              why: "Network = paths and forwarding devices. Systems = OS/app/account state. A perfect firewall still leaves local SQLi; a perfect host still leaves an open 5432.",
            },
            {
              do: "0.0.0.0/0 to a DB port is “the world can walk the path”. Guest-on-finance-VLAN is “two halls are one hall”.",
              why: "Evidence is nmap, ACL dump, wireless survey — not adjectives.",
            },
            {
              do: "Password reuse is identity/host config; segmentation would only slow the later hop.",
              why: "Tag the control that failed, then the extra layers.",
            },
          ],
          result:
            "(i) network (ii) systems (iii) network (iv) systems (v) systems. Network = paths; systems = OS/app/account state.",
        },
        {
          title: "What TLS does on https://example.com",
          prompt:
            "Browser to example.com:443, valid public-CA cert, no client cert. Five jobs and the CIA letter of each.",
          steps: [
            {
              do: "TCP first (just the pipe). Hello agrees TLS 1.3 + AEAD. Certificate + proof = authenticity of example.com. Ephemeral ECDHE = session keys (forward secrecy). Application data in AEAD records = C+I of HTTP.",
              why: "Locked sealed envelope, after you checked the name on the door. IPs and 443 are still visible.",
            },
            {
              do: "Without cert checks you may encrypt to a MITM — C toward the attacker, useless. No client cert: the human is not yet authenticated; login still happens inside the tunnel.",
              why: "TLS authenticated the server, not the user, and not authorisation inside the app.",
            },
            {
              do: "Forward secrecy means a later stolen disk should not unlock today’s recorded session.",
              why: "Ephemeral keys are throwaway per session, not the certificate’s long-term key.",
            },
          ],
          result:
            "After TCP: Hello → cert validate (server authenticity) → ephemeral keys → AEAD records (C+I of HTTP). TLS did not authenticate the user and did not hide the IP.",
        },
        {
          title: "TLS does not fix these",
          prompt:
            "One line each: why TLS does not stop SQLi, stored XSS, CSRF, look-alike phishing, ransomware on a file server.",
          steps: [
            {
              do: "SQLi: the payload rides inside the tunnel, then is concatenated into SQL. XSS: TLS delivers what the origin sent, which is the malicious HTML. CSRF: a real TLS session to the real host, with real cookies.",
              why: "TLS is C+I of the path. Injection, script, and forged intent are application bugs after decrypt.",
            },
            {
              do: "Look-alike domains have their own valid certs — padlock on the wrong name. Ransomware is a host disk I/A incident, not a path problem.",
              why: "TLS is working as specified. Use FIDO/DMARC for phish; backups/EDR for ransom; tokens for CSRF; encode for XSS; bind parameters for SQLi.",
            },
            {
              do: "Exam phrase: TLS protects data in transit (C+I) and authenticates that server name, given validation. Then stop.",
              why: "Do not claim TLS as a universal control.",
            },
          ],
          result:
            "TLS = C+I of the path + server auth for that name. It does not fix injection, XSS, CSRF, look-alike phishing, or ransomware.",
        },
      ],
    },
  ],
};
