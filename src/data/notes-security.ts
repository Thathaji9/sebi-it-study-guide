import type { TopicNote } from "@/data/notes";

export const notesSecurity: TopicNote = {
  topic: "security",
  title: "Information and Cyber Security",
  blurb:
    "CIA triad, crypto primitives (hash, encrypt, MAC, signature), web and network attacks, ransomware and buffer overflows, authentication and password KDFs, network versus systems audit, and what TLS actually buys you. Classify the incident first; name the control second.",
  blocks: [
    {
      heading: "CIA triad with scenarios",
      body: `Confidentiality, Integrity and Availability are the three classic security goals. Every control and every incident in the paper maps onto at least one. Confidentiality: only authorised parties read the data. Encryption, access control, NDAs, screen privacy, and TLS in transit serve it. A leaked database dump, a shoulder-surfed password, and a mis-sent email are confidentiality failures.

Integrity: data (and software) are not altered undetected. Hashing, MACs, digital signatures, write-once logs, file-integrity monitoring, and input validation serve it. A tampered salary figure, a defaced home page, and a bit-flip that nobody notices are integrity failures. Integrity is not confidentiality: a public software download can still need a signature.

Availability: authorised users can use the system when they should. Redundancy, backups, DDoS defence, patching, incident response, and UPS serve it. Ransomware that encrypts files, a SYN flood, a deleted VM without backup, and a failed disk in a RAID-0 stripe are availability failures. Ransomware usually hits integrity as well (bytes changed) and often confidentiality (exfiltration, ‘double extortion’).

Non-repudiation, authenticity and accountability are close cousins. Authenticity is ‘who is this?’ (authn). Authorisation is ‘what may they do?’ (authz). Non-repudiation is ‘they cannot deny the act’ (digital signatures plus key hygiene and timestamps). Do not mix authn with authz: logging in proves identity; the ACL decides the delete button.

Exam method: read the stem, tag C, I, A (or a pair), then pick the control that restores that tag. Encryption without backups does not restore availability after ransomware. A hash without a secret does not restore authenticity. A firewall does not restore a wiped disk.`,
      bullets: [
        "C: secrecy — encryption, ACL, TLS. Failure = leak, eavesdrop.",
        "I: no silent change — hash, MAC, signature, FIM. Failure = tamper.",
        "A: usable when needed — backup, HA, DDoS defence. Failure = down.",
        "Authn ≠ authz. Ransomware typically I+A, sometimes C too.",
      ],
      examples: [
        {
          title: "Classify five incidents into C / I / A",
          prompt:
            "Tag each: (i) attacker reads HR mail on an open SMTP session, (ii) attacker flips one digit of a published NAV file, (iii) SYN flood fills the TCP backlog, (iv) ransomware encrypts file servers and steals a copy, (v) an intern is given admin ‘temporarily’ and never revoked.",
          language: "python",
          code: `# (i) C     eavesdrop on cleartext mail
# (ii) I    undetected modification of a figure
# (iii) A    DoS, handshake backlog
# (iv) I+A  (and C if the stolen copy is the point of the leak)
# (v) C+I+A  broken authz; they can read, change, and delete`,
          steps: [
            "Open SMTP is cleartext. The attacker learned content they were not authorised to see. Confidentiality. Fix: SMTPS/STARTTLS plus network controls. Integrity of the mail may still be intact.",
            "One digit of NAV changed is integrity. Investors reading the file get a wrong number. A public hash or a signature would have detected it. Availability of the website may still be fine.",
            "SYN flood is availability (Transport-layer DoS). Existing sessions’ confidentiality is untouched. SYN cookies and rate limits restore A.",
            "Ransomware: files are no longer the original bytes (integrity) and users cannot use them (availability). If a copy was stolen, confidentiality too — ‘double extortion’.",
            "Standing admin rights are an authorisation failure that endangers all three: the intern can read (C), alter (I) and shut down (A). Least privilege and recertification are the controls.",
          ],
          result:
            "(i) C (ii) I (iii) A (iv) I+A, plus C if exfiltrated (v) C+I+A via excess privilege. Tag the goal that broke, then pick the matching control.",
        },
        {
          title: "Which control restores which letter?",
          prompt:
            "Match: disk encryption at rest; SHA-256 of a download plus the vendor’s published digest; weekly offline backups; MFA on VPN; a second availability zone. Each to C, I or A.",
          language: "java",
          code: `// FDE / LUKS / BitLocker     -> C (stolen laptop cannot be read)
// vendor digest check        -> I (and authenticity if the digest is signed)
// offline backups            -> A (and I of the restore point, not of live data)
// MFA on VPN                 -> authenticity / C of the network path
// second AZ                  -> A`,
          steps: [
            "Full-disk encryption is confidentiality of data at rest. A thief with the laptop still causes an availability incident for the owner, but not a leak if the key is absent.",
            "Comparing a SHA-256 to a vendor digest is integrity of the download. If the digest itself is fetched over the same compromised channel, it is weak; a signature (next section) is stronger authenticity.",
            "Offline backups restore availability after wipe/ransom. They do not encrypt the live database (not C) and they do not stop the live tamper (not I of production).",
            "MFA on VPN is authentication, which protects confidentiality of the internal network (and integrity of what the session may change, by keeping strangers out). The primary tick is ‘authn / C of the channel’.",
            "A second AZ is availability. It does not encrypt and does not detect tampering. CIA answers are often ‘this control’s main letter’, not every side-effect.",
          ],
          result:
            "Disk encryption C; digest check I; backups A; MFA authn (protects C); extra AZ A. Do not credit a backup as a confidentiality control.",
        },
        {
          title: "Integrity without confidentiality, and vice versa",
          prompt:
            "A public SEBI circular is posted as PDF plus a SHA-256 on the HTTPS site. A staff salary file is encrypted on a laptop with no backup. What does each setup guarantee, and what does it not?",
          language: "cpp",
          code: `// circular: anyone may read (C not required). hash detects change (I).
//   HTTPS authenticates the SEBI site so the hash itself is trusted.
// salary file: encryption hides it (C). no hash/MAC -> silent corruption
//   possible. no backup -> availability depends on that one disk.`,
          steps: [
            "The circular is meant to be public. Confidentiality is not a goal. Integrity is: a forged circular would mislead the market. The hash (and HTTPS hosting) serve I and authenticity of the source.",
            "Anyone can still read the PDF. That is not a failure. If the question asks ‘which CIA goal is the hash for?’ the answer is integrity.",
            "The salary file’s encryption serves confidentiality. A flipped bit in the ciphertext typically becomes garbage on decrypt (sometimes detected, sometimes not, depending on the mode). Without a MAC you do not have a designed integrity check.",
            "No backup: if the laptop dies, availability is gone even though C was perfect. Encryption without backup is a classic ‘C at the expense of A’ own-goal (lost keys = lost data).",
            "So: public hash = I without C. Encrypted-only laptop = C without A (and weak I). Real designs pick the letters the asset needs.",
          ],
          result:
            "Public circular+hash: integrity (and site authenticity), not secrecy. Encrypted salary file with no backup: confidentiality, weak availability. Match controls to goals, not ‘more crypto is more security’.",
        },
        {
          title: "Authn, authz, accounting — a login that still fails CIA",
          prompt:
            "A user authenticates with a correct password, is authorised only to read, but the application logs nothing and an IDOR bug lets them fetch another user’s document by changing ?id=17 to ?id=18. Which letters break?",
          language: "python",
          code: `# authn succeeded (they are who they say)
# authz intended: read-self only, but IDOR skipped the owner check
# accounting/audit log empty -> cannot reconstruct
# C breaks (they read another's document)
# I may be intact if they only GET
# A intact`,
          steps: [
            "Authentication worked. MFA would not have stopped this: the actor is a legitimate user in the wrong object’s namespace.",
            "Authorisation was supposed to bind the document id to the session’s user id. Insecure Direct Object Reference skips that check. Authz failed.",
            "Confidentiality of user 18’s document broke. Integrity of the store is intact if the verb was read-only. Availability is intact.",
            "Empty logs break accountability (a cousin of I: the audit trail’s integrity/completeness). You cannot prove who read id=18.",
            "Fix is server-side owner checks plus logging, not ‘more encryption of the password database’. CIA analysis has to follow the actual failure.",
          ],
          result:
            "Authn OK, authz failed, C failed (cross-user read), I/A of the file store OK, accounting failed. IDOR is an authorisation bug, not a hashing bug.",
        },
      ],
    },
    {
      heading: "Hashing versus encryption versus MAC versus digital signature",
      body: `A cryptographic hash (SHA-256, SHA-3, BLAKE2) maps arbitrary input to a fixed digest. It is one-way (pre-image resistance), collision-resistant, and deterministic. No key. You cannot ‘decrypt’ a hash. Use it for file integrity, content-addressed storage, and as a building block. Do not use it alone as authentication: anyone can recompute hash(message) if they can change the message.

Encryption is reversible with a key. Symmetric (AES-GCM, ChaCha20-Poly1305): same secret for lock and unlock, fast, needs key distribution. Asymmetric (RSA-OAEP, ECIES): public to encrypt, private to decrypt, slow, solves distribution. Encryption without integrity (ECB, unauthenticated CBC) is a 1990s trap; modern modes are AEAD (encrypt-then-MAC in one box). Encryption serves confidentiality. It does not by itself prove who sent the ciphertext.

A MAC (HMAC-SHA-256, CMAC, Poly1305) is a keyed integrity tag. Holder of the secret key can generate and verify. It proves the message was not altered by anyone who does not know the key (authenticity of the origin among key-holders). It does not prove anything to a third party in court: both sides share the key, so either could have made the tag. Non-repudiation is not a MAC property.

A digital signature (RSA-PSS, ECDSA, Ed25519) uses a private key to sign and a public key to verify. Anyone can verify; only the private-key holder can sign. That is authenticity plus non-repudiation (with a well-run PKI and timestamp). You sign a hash of the message, not the whole file, for speed. Signatures do not hide the message; combine with encryption if you also need C.

Exam grid: need secrecy → encrypt. Need detect tamper, no key yet → hash. Need detect tamper among friends who share a secret → MAC. Need public verifiability / non-repudiation → signature. Password storage → slow KDF (later section), not reversible encryption and not raw SHA-256.`,
      bullets: [
        "Hash: one-way, no key, integrity of content, not authenticity.",
        "Encrypt: reversible with a key, confidentiality. Prefer AEAD.",
        "MAC: keyed tag, authenticity among key-holders, not non-repudiation.",
        "Signature: private sign, public verify, non-repudiation + integrity.",
      ],
      examples: [
        {
          title: "Which primitive for four jobs?",
          prompt:
            "Pick hash / encrypt / MAC / sign: (i) hide a database backup on tape, (ii) detect accidental corruption of that tape, (iii) let any citizen verify a SEBI PDF came from SEBI, (iv) let a VPN gateway and a laptop prove packets were not modified in between.",
          language: "python",
          code: `# (i) encrypt (AES-GCM etc.)  -- C
# (ii) hash (or the GCM tag)  -- I of storage
# (iii) digital signature     -- public verify
# (iv) MAC (or AEAD)          -- shared secret on the VPN SA`,
          steps: [
            "Tape sitting in a courier van needs confidentiality: encryption with a key that is not in the same envelope. A hash would not hide the backup.",
            "Accidental bit rot is integrity. A SHA-256 stored separately (or the AEAD tag) detects it. A signature also would, but you do not need non-repudiation against the courier.",
            "Citizens do not share a secret with SEBI. A MAC would be unverifiable without leaking the key. A public-key signature on the PDF (or on its hash) is the tool.",
            "A VPN already has a shared session key from IKE/TLS. A MAC or AEAD tag on each packet is cheap and enough. Signatures per packet would be slow and pointless; both endpoints are equal peers, not a public audience.",
            "Combining is allowed: encrypt-then-MAC / AEAD does (i) and (ii) together. Still pick the primitive the stem asked for.",
          ],
          result:
            "(i) encrypt (ii) hash or AEAD tag (iii) signature (iv) MAC/AEAD. Public audience ⇒ signature. Shared secret ⇒ MAC. Hide ⇒ encrypt. Detect only ⇒ hash.",
        },
        {
          title: "Why hash(message) is not a MAC",
          prompt:
            "A client sends message M and H=SHA-256(M) in the clear. An on-path attacker changes M to M′. Can they fool a verifier that only checks SHA-256(received)==H? What extra ingredient would stop them?",
          language: "java",
          code: `// attacker computes H' = SHA-256(M') and replaces both M and H
// verifier hashes what it got, compares to the (also replaced) H, accepts
// MAC: T = HMAC(K, M). attacker does not have K, cannot make T'
// signature: S = Sign(sk, M). attacker does not have sk`,
          steps: [
            "A hash is public. Anyone who can modify M can also compute the matching digest. Shipping the digest next to the message, unprotected, is a circular integrity check.",
            "The verifier that ‘just re-hashes and compares’ is comparing two attacker-controlled values. It will always succeed after a swap of (M,H) for (M′,H′).",
            "A MAC adds a secret key. The attacker can change M but cannot produce HMAC(K, M′) without K. The verifier who holds K rejects.",
            "A signature adds a private key the attacker does not have. The public key can be distributed (via TLS/PKI) so the verifier need not share a secret with the sender.",
            "This is why TLS uses a MAC/AEAD, not a bare hash, and why ‘we hashed the password on the wire without TLS’ still leaves the hash stealable (pass-the-hash / replay).",
          ],
          result:
            "Bare hash(M) beside M is not authenticity: the attacker re-hashes. Need a MAC (shared K) or a signature (private key). Hash is unkeyed.",
        },
        {
          title: "Signature versus encryption with RSA — do not swap the keys",
          prompt:
            "RSA public key (n,e), private d. To encrypt a short session key for Alice, who applies which exponent? To sign a digest, who applies which exponent? Why do we sign the hash, not the whole document?",
          language: "cpp",
          code: `// encrypt to Alice:  C = K^e  mod n    (anyone) ; Alice K = C^d mod n
// sign by Alice:     S = H(M)^d mod n  (Alice)  ; anyone checks S^e == H(M)
// textbook RSA is not the scheme you ship; OAEP for encrypt, PSS for sign
// we hash first because RSA handles only a short block and hashing binds all bits`,
          steps: [
            "Encryption for Alice uses her public e so that only her d can reverse it. Anyone can encrypt; only Alice decrypts. That is confidentiality toward Alice.",
            "Signature by Alice uses her private d on the digest. Anyone uses e to verify. That is authenticity/non-repudiation. Swapping the words ‘encrypt with private key’ is a sloppy metaphor the exam still sometimes uses — prefer ‘sign’.",
            "If you ‘encrypt with the private key’ and forget to hash, you sign one block, not the document, and you build a decryption oracle. Real schemes (PSS, OAEP) pad for a reason.",
            "Hash-then-sign: the digest is a short, fixed string RSA/ECDSA can swallow, and a collision-resistant hash means a signature on H(M) binds all of M.",
            "AES (symmetric) does not have this public/private split. RSA/ECDSA exist precisely so verifiers need no shared secret.",
          ],
          result:
            "Encrypt to Alice: public e. Sign as Alice: private d on H(M). Verify/encrypt the other way. Hash-then-sign is mandatory. Do not call a signature ‘encrypting with the private key’ in a precise answer.",
        },
        {
          title: "AEAD versus ‘AES-CBC then hope’",
          prompt:
            "A developer stores AES-CBC(ciphertext) with no MAC. Which CIA letter is missing? Name a modern replacement and what it outputs.",
          language: "python",
          code: `# AES-CBC alone: confidentiality (if IV random) but not integrity
# attacker can flip bits in ciphertext and flip predictable bits of plaintext
# AES-GCM / ChaCha20-Poly1305: ciphertext + auth tag (AEAD)
# decrypt refuses to return plaintext if the tag fails`,
          steps: [
            "CBC with a random IV can hide the plaintext (C, under textbook assumptions). It does not detect a modified ciphertext. Integrity is missing; authenticity is missing.",
            "Bit-flipping on CBC ciphertext changes the next block’s plaintext in a controlled way. Padding-oracle attacks turn the server into a decryption helper. Both are integrity failures that leak C too.",
            "AEAD (AES-GCM, ChaCha20-Poly1305) returns ciphertext plus a tag. Decrypt verifies the tag first and refuses garbage. That is C+I in one primitive.",
            "TLS 1.3 only uses AEAD. The exam’s ‘why not ECB’ (identical blocks) and ‘why not CBC-without-MAC’ are the same moral: encryption without integrity is incomplete.",
            "A separate HMAC over IV||C would also restore I (encrypt-then-MAC). AEAD is that pattern, standardised and harder to get wrong.",
          ],
          result:
            "CBC-only is C without I. Use AES-GCM or ChaCha20-Poly1305 (ciphertext + tag). TLS 1.3 is AEAD-only. Integrity is not optional.",
        },
      ],
    },
    {
      heading: "Web attacks: SQL injection, XSS, CSRF",
      body: `SQL injection (SQLi) happens when untrusted input is concatenated into a SQL string, so the attacker can change the statement’s structure (add OR, UNION, comments, a second command). The defence is parameterised queries / prepared statements (the SQL is parsed with placeholders, values bound separately), plus least-privilege DB accounts, input validation, and denying stacked queries. ORM parameter binding counts if it actually binds. String-building inside the ORM does not.

Cross-site scripting (XSS) injects script into a page that other users’ browsers will run. Stored XSS sits in the database; reflected XSS rides a crafted URL; DOM XSS is client-side only. Impact: session theft, fake login forms, malware. Defence: context-aware output encoding, Content-Security-Policy, HttpOnly cookies, sanitising rich HTML with a real library. Escaping only quotes in SQL does not fix XSS; they are different sinks.

Cross-site request forgery (CSRF) makes a victim’s browser send an already-authenticated request (cookie auto-attached) to a victim site, without the victim intending it. Impact: change email, transfer money, change password. Defence: anti-CSRF tokens bound to the session, SameSite cookies, checking Origin/Referer, re-auth for sensitive actions. CSRF needs the victim logged in; XSS can steal the session even without a third-site form.

Exam contrasts: SQLi is a server/database confusion of code and data. XSS is a browser confusion of code and data. CSRF is a confused-deputy of the browser’s cookie jar. Parameterise SQL. Encode output. Tokenise state-changing requests. ‘Sanitize all input’ is true but too vague for a 2-marker; name the sink.`,
      bullets: [
        "SQLi: concat SQL + input. Fix: bound parameters, least privilege.",
        "XSS: attacker script in others’ browsers. Fix: encode output, CSP, HttpOnly.",
        "CSRF: forged request with victim cookies. Fix: CSRF token, SameSite.",
        "Different sinks, different defences. Do not mix the three names.",
      ],
      examples: [
        {
          title: "Concatenated SQL versus a parameterised query",
          prompt:
            "Login code concatenates the name and password into a SQL string (quotes around each field). Walk through a normal name alice, then why extra SQL syntax in the name field is dangerous. Show the prepared-statement fix.",
          language: "java",
          code: `// BAD — string concatenation, SQL parsed AFTER the name is spliced in
String q = "SELECT * FROM users WHERE name = '" + name
         + "' AND pass = '" + pass + "'";
stmt.execute(q);

// GOOD — parse first, bind values later; extra quotes stay data
PreparedStatement ps = conn.prepareStatement(
    "SELECT * FROM users WHERE name = ? AND pass = ?");
ps.setString(1, name);
ps.setString(2, pass);
ps.executeQuery();`,
          steps: [
            "With name=alice and a matching password, the concatenated string is a single SELECT that returns at most one user. The application then creates a session. That is the intended path.",
            "The database does not see a boundary between the programmer’s SQL and the user input. Whatever bytes arrive in name sit inside the quotes — or close those quotes and add more SQL. The parser at the database is the confused deputy.",
            "Textbook illustration used in every exam: a name field that contains a quote plus OR plus a tautology can make the WHERE clause true for the first user, skipping the password check. The precise payload is not the point; the concatenation is.",
            "Prepared statement: the SQL string with ? is sent to the database and parsed first. setString binds alice (or a malicious string) as a typed value. Quotes inside the value cannot close a string that is already parsed. Structure stays SELECT … WHERE name=? AND pass=?.",
            "Also: store a KDF of the password, not pass in cleartext; use least-privilege DB accounts so even a residual injection cannot DROP TABLE. Parameterisation is the primary fix the mark scheme wants.",
          ],
          result:
            "Concatenation lets input change SQL structure (classic tautology / UNION / comment tricks). Prepared statements parse first, bind later, so input stays data. That is the SQLi defence to write in the answer booklet.",
        },
        {
          title: "Stored XSS in a comment box",
          prompt:
            "A comments field stores raw HTML and the profile page echoes it into the DOM. User B later opens that profile while logged in. What can a script in the comment do, and which three headers/flags reduce the blast radius?",
          language: "python",
          code: `# stored XSS: payload persisted, then executed in victims' origin
# can: read document.cookie (unless HttpOnly), call APIs as the user,
#      rewrite the page into a fake login (phishing combo)
# reduce: Content-Security-Policy default-src 'self'; script-src nonce-...
#         Set-Cookie: session=...; HttpOnly; Secure; SameSite=Lax
#         output encode < as &lt; in HTML text context`,
          steps: [
            "The application treats the comment as HTML, not as text. A script tag (or an event handler) stored once will run in every visitor’s browser under the site’s origin.",
            "Same-origin means the script can call the site’s APIs with the victim’s cookies. That is account takeover if the session cookie is readable or automatically sent.",
            "HttpOnly stops JavaScript from reading the cookie (the browser still sends it on requests — CSRF remains, XSS-to-API also remains). Secure stops the cookie on HTTP. SameSite reduces CSRF, not XSS.",
            "CSP with a nonce/hash and no unsafe-inline blocks the injected script from running even if it sits in the HTML. Encoding < to &lt; at the HTML-text sink stops it from being a tag in the first place. Defence in depth: encode AND CSP.",
            "Reflected XSS would have ridden a URL parameter echoed once; DOM XSS would have been a client-side write to innerHTML. Same family, different storage. SQLi would have been at the database, not in B’s browser.",
          ],
          result:
            "Stored comment script runs as the site, in B’s browser, and can abuse B’s session. Encode output, CSP, HttpOnly+Secure cookies. XSS is a browser-origin problem, not a SQL parser problem.",
        },
        {
          title: "CSRF on a ‘change email’ POST",
          prompt:
            "Bank site uses a session cookie without SameSite, no CSRF token. Victim is logged in. They visit attacker.org which contains a hidden form POSTing to bank.example/email. What happens, and how does a synchroniser token stop it?",
          language: "java",
          code: `// attacker.org HTML: form action=https://bank.example/email method=POST
// hidden field email=attacker@evil
// auto-submit. browser attaches bank.example's session cookie (old default)
// bank sees a genuine logged-in POST, changes the email
// fix: hidden field csrf=random-per-session, verified server-side
// attacker.org cannot read that token (same-origin). SameSite=Lax/Strict
// also blocks the cookie on this cross-site POST.`,
          steps: [
            "The request is a real browser request from the victim, with the victim’s cookies. The bank’s server cannot tell from TCP that the user did not click its own ‘Save’ button.",
            "Without a secret the attacker cannot know, the POST looks legitimate. Email becomes attacker-controlled, then password-reset flows go to them. Authn of the session was valid; intent was not.",
            "A synchroniser token is a random value stored in the session and placed in the real form. The attacker’s third-party page cannot read it (same-origin policy). The server rejects POSTs with a missing/wrong token.",
            "SameSite=Lax or Strict cookies are not sent on that cross-site POST, so the session is absent and the attack fails even without a token. Modern browsers default toward Lax; the exam still wants the token as the classic fix.",
            "XSS in bank.example would let the attacker read the token and defeat CSRF defences. CSRF tokens assume the origin’s HTML is not already scriptable. Different bugs, stacked defences.",
          ],
          result:
            "The bank executes a state change the victim did not intend, using the victim’s cookie. CSRF token (and SameSite) stop cross-origin POSTs. CSRF ≠ XSS: no script need run on the bank’s origin.",
        },
        {
          title: "Name the bug from the symptom",
          prompt:
            "Four stems: (a) UNION SELECT shows up in web logs, (b) a tweeted URL contains <script> and the search page highlights it, (c) users who visited a forum have their sessions stolen, (d) users who visited a news site find their ‘transfer’ happened. Tag SQLi / reflected XSS / stored XSS / CSRF.",
          language: "cpp",
          code: `// (a) SQLi          UNION is SQL, server-side query rewrite
// (b) reflected XSS  payload in the URL, echoed once
// (c) stored XSS     payload sat on the forum, many victims
// (d) CSRF           no script on the bank needed; a third-site trigger`,
          steps: [
            "UNION SELECT is SQL grammar. The application put a parameter into a query. SQLi. Look at the database logs and parameterise.",
            "A URL that contains a script and a page that echoes the query string is reflected XSS. One victim per click. Encode the search parameter.",
            "Forum + many stolen sessions is stored XSS: the payload is in the site’s own HTML for every viewer. Encode on output, CSP, rotate cookies.",
            "A transfer after visiting an unrelated news site, with no bank XSS mentioned, is CSRF. The news site caused the browser to hit the bank’s state-changing URL with cookies.",
            "If the news site had framed the bank and also stolen a token via XSS, you would have both. The exam usually gives one signature clue: SQL keyword, URL echo, persisted HTML, or third-site form.",
          ],
          result:
            "(a) SQLi (b) reflected XSS (c) stored XSS (d) CSRF. Keywords: UNION → SQLi; URL echo → reflected; stored page → stored XSS; third-site + cookies → CSRF.",
        },
      ],
    },
    {
      heading: "Phishing, MITM, and ransomware",
      body: `Phishing is social engineering via a message that impersonates a trusted party to steal credentials, install malware, or trigger a wire. Spear-phishing is targeted; whaling targets executives; smishing is SMS; vishing is voice. Technical cousins: look-alike domains, IDN homographs, fake login pages, attachment macros. Controls: user training, SPF/DKIM/DMARC, link isolation, MFA (phishing-resistant: FIDO2; OTP MFA can still be phished in real time), reporting buttons. Phishing is primarily a confidentiality (credential theft) and sometimes integrity/availability (payload) problem.

Man-in-the-middle (MITM) sits on the path: rogue AP, ARP spoofing, compromised proxy, BGP hijack. The attacker can read (C), modify (I), and drop (A) traffic. Defence: TLS with proper certificate validation (not clicking through warnings), HSTS, VPNs on untrusted networks, 802.1X on wired, DHCP snooping/dynamic ARP inspection on LANs. TLS-with-validation converts the MITM into someone who can only delay packets, not read them.

Ransomware encrypts (or encrypts-and-exfiltrates) data and sells the key / silence. CIA: integrity of files is gone (ciphertext replaced plaintext), availability is gone (business cannot work), confidentiality may be gone (stolen copy). Controls: offline/immutable backups, least privilege, patching, EDR, email filtering, network segmentation, never paying as a policy (exam-friendly: backups beat payment). Restore tests matter; an untested backup is an availability hope, not a control.

These three chain: a phish delivers the ransomware; a MITM on a software-update path delivers a trojan; a phish steals a VPN password and then the attacker MITMs an internal session. Exam answers should name the primary attack the stem described, then the CIA letters, then one preventive and one detective/recovery control.`,
      bullets: [
        "Phishing: fake trust to steal or infect. MFA + DMARC + training.",
        "MITM: on-path read/alter. TLS with validation, HSTS, 802.1X.",
        "Ransomware: I+A (often C). Immutable backups, least privilege, EDR.",
        "OTP MFA is phishable; FIDO2/WebAuthn is not, in the usual relay.",
      ],
      examples: [
        {
          title: "Spear-phish that captures a password",
          prompt:
            "An email ‘from SEBI’ links to sebi-gov.in/login (note the hyphen) serving a form that POSTs to the attacker. The user types the password. Which CIA letter? Why does SMS OTP still fail here? What would FIDO2 have done?",
          language: "python",
          code: `# look-alike domain, TLS maybe even valid for THAT domain
# user submits password to attacker -> Confidentiality of the credential
# realtime phishing proxy can also replay the OTP to the real site
# FIDO2 origin-binds the assertion to sebi.gov.in, not sebi-gov.in`,
          steps: [
            "The user intended sebi.gov.in and landed on a different registrable domain. The password’s confidentiality is lost the moment it is typed. Integrity of SEBI’s real site is untouched.",
            "A valid TLS padlock on sebi-gov.in only proves the attacker owns that host. Users must check the name, not only the lock. HSTS on the real name does not protect a different name.",
            "SMS/email OTP is phishable: the fake page asks for the OTP too and a proxy submits password+OTP to the real site within seconds. MFA that is not origin-bound is still C-fail.",
            "FIDO2/WebAuthn includes the origin in the signed challenge. The authenticator will not produce a token for sebi-gov.in that the real sebi.gov.in will accept. That is phishing-resistant MFA.",
            "Org controls: DMARC to make spoofed ‘From: SEBI’ harder, reporting, and blocking newly seen look-alikes. Training helps but is not sufficient alone.",
          ],
          result:
            "Confidentiality of the password (and of any OTP that was relayed). Look-alike domain + form. FIDO2 origin-binding survives; SMS OTP does not. Padlock ≠ the right site.",
        },
        {
          title: "Coffee-shop MITM on HTTP versus HTTPS",
          prompt:
            "Two connections from the same laptop on a rogue AP: http://news.example and https://bank.example with a valid cert and HSTS. What can the AP operator read or change on each?",
          language: "java",
          code: `// HTTP: AP sees and can modify all bytes (C and I fail). Can inject ads/malware.
// HTTPS validated: AP sees IPs, SNI (maybe), sizes. Cannot read HTTP body
//   or change it without breaking the AEAD tag. Downgrade blocked by HSTS.
// If the user clicks through a cert warning, MITM is back (SSL stripping + fake cert).`,
          steps: [
            "HTTP is cleartext. The rogue AP is a classic MITM: read cookies, change article text, inject a script. C and I both fail. A is at the AP’s mercy too.",
            "HTTPS with a certificate that chains to a public CA and matches bank.example: the AP does not have bank.example’s private key, so it cannot produce a valid AEAD tag for a forged page. C and I of the HTTP inside TLS hold.",
            "The AP can still drop packets (A) or measure sizes. That is not a full MITM of the application data.",
            "HSTS tells the browser never to use HTTP on bank.example, blocking SSL-strip (the trick of rewriting https links to http). Clicking through a warning (‘accept this cert’) undoes the whole model.",
            "Corporate TLS interception that the laptop trusts (custom CA) is an intentional MITM. Security-wise it has C of the path relative to the cafe, not relative to the corporate proxy.",
          ],
          result:
            "HTTP: AP can read and alter everything. HTTPS+valid cert+HSTS: AP cannot read or forge application data; can only drop/delay. Never click through cert warnings on a bank.",
        },
        {
          title: "Ransomware tabletop: which CIA letters and which restore?",
          prompt:
            "A file server’s documents are replaced by .enc files; a ransom note demands Bitcoin; threat intel says a copy was uploaded. Tag C/I/A. Order the recovery actions: isolate, restore from last week’s offline backup, rotate credentials, notify.",
          language: "cpp",
          code: `// I: bytes on disk are not the original documents
// A: business cannot open the documents
// C: stolen copy is a leak (double extortion)
// recover A from BACKUPS, not from paying (paying funds crime, no guarantee)
// isolate first so the restore is not re-encrypted`,
          steps: [
            "Integrity: plaintext documents are gone, ciphertext sits in their place. Availability: staff cannot work. Confidentiality: the uploaded copy is a leak, even if you restore.",
            "Isolate (pull NICs, disable accounts, segment) so the actor cannot encrypt the restore. This is containment, protecting A of the backup.",
            "Rotate credentials and keys the actor may have used (C and I of future sessions). Notify legal/compliance/regulators as required — a process control, not a crypto control.",
            "Restore from an offline/immutable backup that was not mounted at the time of encryption. Test a sample file before declaring victory. Paying the ransom is not a control and may fail.",
            "A hash inventory (FIM) would have detected I earlier; segmentation would have limited A; EDR might have caught the encryptor. Prevention and recovery both belong in the answer.",
          ],
          result:
            "I+A, plus C if exfiltrated. Isolate, rotate, notify, restore from offline backups. Payment is not the availability plan. Ransomware is not ‘just malware’; it is a CIA incident.",
        },
        {
          title: "Which attack? Four one-liners",
          prompt:
            "Name phishing / MITM / ransomware / (none): (i) fake invoice attachment with a macro, (ii) ARP spoofing on a LAN then reading telnet, (iii) files renamed .locked plus a note, (iv) a brute-force SSH login from a botnet.",
          language: "python",
          code: `# (i) phishing (or spear-phish) delivering malware
# (ii) MITM (ARP spoof is the position; telnet leak is C)
# (iii) ransomware
# (iv) none of those three: credential stuffing / brute force
#      (availability if it knocks SSH over, confidentiality if it gets in)`,
          steps: [
            "A fake invoice is impersonation to make a human run a payload. Phishing (attachment variant). The macro’s later behaviour might be ransomware, but the delivery attack in the stem is phish.",
            "ARP spoofing puts the attacker on the path; telnet is cleartext. MITM plus a confidentiality leak. TLS/SSH and DAI would have helped.",
            "Renamed files plus a note is the ransomware signature. Backups, not anti-phish posters, restore A.",
            "SSH brute force is an authentication attack, not phishing (no impersonating message), not MITM (no path position needed), not ransomware (no encryptor mentioned). Lockout, keys, MFA, fail2ban.",
            "The exam sometimes stacks them (phish → ransomware). Answer the attack the stem actually described first.",
          ],
          result:
            "(i) phishing (ii) MITM (iii) ransomware (iv) brute-force/authn attack, not the three named. Read the stem’s mechanism, not only the impact.",
        },
      ],
    },
    {
      heading: "Buffer overflow and software-development security",
      body: `A buffer overflow writes more bytes into a fixed buffer than it can hold, overwriting adjacent memory. On a classic C stack, that adjacent memory includes the saved frame pointer and the return address. Integrity of control flow is lost: the function may return to an unexpected address. Availability often fails too (crash). Confidentiality can fail if the overwrite leaks (over-read, Heartbleed-style) or if hijacked control reads secrets.

Root cause: languages that do not bound-check (C/C++), APIs like gets, unbounded strcpy/sprintf, trusting a length field from the network. Defences in layers: safe languages or sanitizers; bounded functions (strcpy_s, snprintf); compiler canaries (stack cookies); NX/DEP (non-executable stack); ASLR (randomise addresses); Control-Flow Integrity; not running as root. Input validation at the application edge is necessary but not sufficient if an inner parser still uses a raw C buffer.

Related bugs: integer overflow that makes an allocation too small then a copy too large; off-by-one; format-string bugs (%n); use-after-free. The exam’s one-liner is ‘check lengths; do not use gets; enable canaries and NX’. A Java/Python list that grows is not a C buffer overflow; those languages can still have injection and logic bugs.

Software-development security (the syllabus heading) is the rest of the secure-SDLC: threat modelling, least privilege, dependency scanning, signed builds, secrets not in git, parameterised queries (previous section), and not rolling your own crypto. Overflow is the memory-safety exhibit; injection is the input-handling exhibit.`,
      bullets: [
        "Overflow: write past a buffer, smash adjacent state (often the return address).",
        "Impact: I of control flow, A (crash), sometimes C (leaks, hijack).",
        "Fix: bounded copies, memory-safe languages, canaries, NX, ASLR, CFI.",
        "gets/strcpy on untrusted input is the textbook trigger. Java lists are a different bug class.",
      ],
      examples: [
        {
          title: "Why gets() on a 16-byte stack buffer is undefined",
          prompt:
            "C function: char buf[16]; gets(buf); on a function that then returns. Describe, without shellcode, how CIA can break. Name three compiler/OS mitigations.",
          language: "cpp",
          code: `void greet(void) {
    char buf[16];
    gets(buf);        // unbounded read from stdin into 16 bytes
}
// adjacent stack: saved RBP, return address, perhaps a canary
// too-long input overwrites those words (integrity of control data)
// process may SIGSEGV (availability) or return somewhere unintended`,
          steps: [
            "gets reads until newline, ignoring the 16-byte size. Any longer line writes past buf. That is the overflow.",
            "On a typical stack layout the saved return address sits at a higher address than buf. Overwriting it is an integrity failure of control flow: the CPU will jump where those bytes say.",
            "If the new address is unmapped, the process crashes (availability). If it points at a gadget, the attacker may run unintended instructions (I of control, then any CIA of the process). The exam wants this picture, not a working exploit.",
            "Mitigations: a stack canary checked before return (detect I, then abort — a controlled A); NX so bytes in buf are not executable; ASLR so a guessed jump misses. None of these make gets safe; they raise the bar.",
            "The correct code fix is a bounded read (fgets(buf, sizeof buf, stdin)) plus a language or sanitizer that fails closed. Removing gets is a decades-old CERT rule.",
          ],
          result:
            "Unbounded gets overwrites adjacent stack (I of return address), often crashes (A), and can hijack control. Use fgets/snprintf, canaries, NX, ASLR. Do not ‘just compile C’.",
        },
        {
          title: "Integer overflow leading to a short allocation",
          prompt:
            "n comes from the network. code: size = n * 16; p = malloc(size); memcpy(p, data, n*16); with 32-bit size. Why can this overflow a heap buffer even if memcpy’s length ‘matches’ size?",
          language: "cpp",
          code: `// n from the network, 32-bit size_t
// size = n * 16;          // wraps, e.g. n=0x10000001 -> size=0x10
// p = malloc(size);       // 16-byte block
// memcpy(p, data, n * 16ULL); // 64-bit length still huge -> heap overflow
// exam picture: allocate small, copy large -> I/A of heap metadata`,
          steps: [
            "n * 16 can wrap modulo 2³². The allocation becomes tiny while the attacker still has a large n in mind.",
            "If malloc uses the wrapped size and memcpy uses a separately computed unwrapped length, the copy writes far past the block. Heap metadata (adjacent chunk headers) is overwritten — integrity of the allocator, then crashes or hijack.",
            "If both use the wrapped value, you ‘only’ get a truncated copy (integrity of the payload, not a smash). The dangerous pattern is inconsistent length math.",
            "Fix: use saturating or checked arithmetic (or size_t with an explicit overflow test) before allocate-and-copy; cap n; use a memory-safe language. Fuzzing finds these.",
            "This is still a buffer overflow family bug: the destination is smaller than the write. The trigger was arithmetic, not gets.",
          ],
          result:
            "Wrapped allocation + large copy = heap overflow (I/A). Check multiplication before malloc. One length, checked once, used for both allocate and copy.",
        },
        {
          title: "Which mitigation stops which step?",
          prompt:
            "Match canary, NX, ASLR, bounds check: (i) input never writes past 16 bytes, (ii) overwritten return is detected before jump, (iii) bytes placed in the buffer cannot be executed as code, (iv) a guessed absolute jump misses.",
          language: "java",
          code: `// (i) bounds check / fgets / safe language     -- stop the write
// (ii) stack canary                             -- detect I, abort
// (iii) NX / DEP                                -- data is not code
// (iv) ASLR                                     -- addresses unpredictable
// CFI would additionally constrain jump targets`,
          steps: [
            "A real bounds check (or a safe language) is prevention: the overflow does not happen. This is the best answer when the question says ‘eliminate the bug’.",
            "A canary is detection at return time. The write already happened (I of the buffer’s neighbours), but control is not transferred. The process aborts (a small A hit to avoid a worse one).",
            "NX/DEP marks the stack non-executable. Injected instruction bytes in buf will fault if jumped to. Return-oriented programming still tries to reuse existing executable code — NX is not the whole story.",
            "ASLR randomises base addresses so a hardcoded jump is wrong. Entropy and information leaks (over-reads) decide whether it holds.",
            "Defence in depth: all four. The syllabus ‘software development security’ answer should mention a bounds-checked copy first, then the OS/compiler flags.",
          ],
          result:
            "(i) bounds check (ii) canary (iii) NX (iv) ASLR. Prevention beats detection beats mitigation. Mention fgets/snprintf before ‘enable ASLR’ if asked for a code fix.",
        },
        {
          title: "Java ArrayIndexOutOfBounds versus C overflow",
          prompt:
            "A Java method does a[i] = x with i==a.length. A C method does buf[i]=x with i==sizeof(buf). Contrast the CIA impact and the ‘memory safety’ exam phrase.",
          language: "python",
          code: `# Java: JVM checks bounds, throws exception, no adjacent overwrite
#       A of this request fails (500); I of the process holds
# C: undefined behaviour, adjacent memory overwritten, I of process state
# memory-safe language: no spatial overflow of object bounds
# Java still has SQLi/XSS if you concat strings; safety != security`,
          steps: [
            "Java’s array store is bounds-checked. i==length throws ArrayIndexOutOfBoundsException. Adjacent objects are not overwritten. Integrity of the JVM heap layout holds.",
            "The request may fail (availability of that operation). If uncaught, the thread or request dies. That is a controlled failure, not a smash.",
            "C’s buf[i] with i==sizeof(buf) is already one past the end. No automatic check. Neighbour bytes change. This is the memory-unsafety the syllabus contrasts.",
            "Memory safety is not application security. A Java app can still concatenate SQL, reflect XSS, or store unsalted SHA-1 passwords. Different chapter.",
            "Exam tick: ‘managed/safe languages reduce buffer overflows; they do not remove injection or bad crypto.’ Pick the bug class the stem actually shows.",
          ],
          result:
            "Java throws (local A, no smash). C overwrites neighbours (I of process memory). Memory safety ≠ absence of SQLi. Use the right control for the right bug.",
        },
      ],
    },
    {
      heading: "Authentication factors, MFA, and password KDFs",
      body: `Authentication factors: something you know (password, PIN), have (hardware token, phone, smart card, FIDO key), are (fingerprint, face, iris). Somewhere you are (network location) is a weaker additional signal. Multi-factor authentication (MFA) combines at least two different categories. Two passwords are not MFA. A password plus a TOTP app is MFA (know + have). A password plus a fingerprint is MFA (know + are).

Quality of factors: passwords are phishable and reuse-prone. SMS OTP is phishable and SIM-swappable (have, but a weak have). TOTP is phishable in real time but not SIM-swappable. Push-MFA can be fatigued. FIDO2/WebAuthn is origin-bound and phishing-resistant. Biometrics are not secret (you leave fingerprints) and need a liveness check; they are hard to rotate.

Password storage: never store reversible encryption of passwords with an app-wide key if you can avoid it (a DB dump plus that key is game over). Never store raw SHA-256(password): it is fast, unsalted, and rainbow-tableable. Use a password-based KDF: bcrypt, scrypt, Argon2id, or PBKDF2 with a per-user random salt, a high work factor, and a pepper (optional secret in an HSM) for defence in depth. Verify by recomputing the KDF, not by decrypting.

A salt is a unique non-secret per user, stored next to the hash, that makes precomputed rainbow tables useless and makes two users with the same password look different. A pepper is a secret not stored in the DB. Stretching (iterations / memory-hard) makes each guess expensive for the attacker. TLS still required so the password is not sniffed on the wire; the KDF protects the file at rest.

Exam: ‘why not MD5(password)’ — fast, broken, no salt. ‘why salt’ — rainbow tables and duplicate detection. ‘why not encrypt passwords’ — reversible if the key leaks; you never need the plaintext. ‘MFA factor types’ — know/have/are, two different.`,
      bullets: [
        "Factors: know / have / are. MFA = two different categories.",
        "FIDO2 is phishing-resistant; SMS OTP is not.",
        "Store Argon2id/bcrypt/scrypt/PBKDF2(password, salt, cost). Never raw hash.",
        "Salt is per-user and non-secret. Pepper is a secret. Stretching slows guesses.",
      ],
      examples: [
        {
          title: "Why hash(password) without salt fails",
          prompt:
            "A dump contains SHA-256(password) for 8 million users, no salt. Explain rainbow tables, identical-password detection, and the salted KDF repair. Show a verify() sketch.",
          language: "python",
          code: `import os, hashlib
# BAD
stored = hashlib.sha256(password.encode()).hexdigest()

# GOOD sketch (PBKDF2 for illustration; prefer argon2id in production)
salt = os.urandom(16)
stored = salt + hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 200_000)

def verify(password, stored):
    salt, dk = stored[:16], stored[16:]
    return hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 200_000) == dk`,
          steps: [
            "SHA-256 is fast: a GPU tries billions of candidates per second. An unsalted dump is an offline guessing game against every user at once.",
            "Rainbow tables: precomputed hash→password maps for common passwords. Without a salt, one table cracks every user who chose ‘Welcome@123’. With a 16-byte salt, the table would have to be recomputed per user — infeasible.",
            "Identical hashes mean identical passwords. An attacker who cracks one intern’s ‘123456’ instantly flags every other 123456 account. Per-user salts make the stored strings differ.",
            "Repair: generate a random salt per user, run a slow KDF (Argon2id preferred; PBKDF2 acceptable in exam code), store algorithm+cost+salt+digest. Verify by recomputing with the same parameters.",
            "Still use TLS on login (C in transit) and account lockout / MFA (to slow online guesses). The KDF is for stolen-at-rest dumps, not a substitute for MFA.",
          ],
          result:
            "Unsalted SHA-256 is fast and rainbow-tableable, and it reveals duplicate passwords. Per-user salt + slow KDF (Argon2id/bcrypt/PBKDF2) makes offline guessing expensive and unique per row.",
        },
        {
          title: "Is this MFA? Five pairs",
          prompt:
            "Classify as MFA or not: (i) password + TOTP, (ii) password + security question, (iii) fingerprint + face, (iv) smart card + PIN, (v) password + ‘email a code to the same person’.",
          language: "java",
          code: `// (i) know + have          MFA
// (ii) know + know         NOT MFA (two knowledge factors)
// (iii) are + are          NOT MFA (two biometrics; one category)
// (iv) have + know         MFA (card + PIN)  -- the classic two-factor card
// (v) know + a mailbox often protected by the same password -- weak / often NOT
//     counted as true second factor; exam usually says 'not independent'`,
          steps: [
            "Password + TOTP: knowledge plus a device that holds the TOTP secret. Two categories. MFA. (Still phishable, but it is MFA.)",
            "Password + mother’s maiden name: both knowledge. An attacker who dumped the user profile may have both. Not MFA.",
            "Fingerprint + face: both inherence. A single compromised device with both sensors, or two stolen biometric templates, is still one category. Not MFA by the definition the syllabus uses.",
            "Smart card + PIN: possession plus knowledge. The PIN is useless without the card; the card is locked without the PIN. Textbook MFA.",
            "Email code: the mailbox is often unlocked with the same password (or a recovered password). Independence is weak. Many mark schemes treat ‘password + email OTP to same account’ as not a strong second factor. Prefer an authenticator app or FIDO key.",
          ],
          result:
            "(i) MFA (ii) not (two knows) (iii) not (two biometrics) (iv) MFA (v) weak / not independent. MFA means two different factor categories, not two passwords.",
        },
        {
          title: "Online versus offline guessing",
          prompt:
            "Attacker A sprays 10 passwords at the live login API. Attacker B stole the bcrypt dump. Which controls slow A? Which slow B? Why does a 12-character passphrase still need the KDF?",
          language: "cpp",
          code: `// A online: rate-limit, lockout, CAPTCHA, MFA, IP reputation, WAF
// B offline: KDF cost, salt, pepper in HSM, not being dumped (TDE, least privilege)
// passphrase entropy slows both, but GPUs still try trillions of SHA-256/s
// bcrypt/argon2 cut B to tens of thousands/s, which is the point`,
          steps: [
            "A is constrained by the application. Lockout after N failures, exponential backoff, MFA challenge, and anomaly detection all apply. A KDF that takes 50 ms also slightly slows A, but A is already network-bound.",
            "B is unconstrained by the API. Only the cost of each hash guess matters. Salt stops rainbow tables; iterations/memory-hard stop GPUs; a pepper in an HSM stops B until the pepper leaks too.",
            "A 12-character passphrase has more entropy than ‘Password1’, so both A and B need more guesses. Against unsalted SHA-256, B still finishes common-passphrase lists quickly. The KDF is what makes each guess hurt.",
            "Encryption of the password column with AES and a key sitting in the same dump does not help B — they decrypt then hash-guess, or just decrypt to plaintext if you stored reversibly. KDFs are one-way on purpose.",
            "Defence in depth: prevent the dump (C of the DB), slow the dump (KDF), and make the live login useless without a second factor (MFA).",
          ],
          result:
            "Online (A): lockout, MFA, rate-limit. Offline (B): salted slow KDF + not dumping the DB. Passphrase entropy helps both; without a KDF, B still wins against fast hashes.",
        },
        {
          title: "Pepper versus salt, and why encryption is the wrong store",
          prompt:
            "Design the stored password field. Where does the salt live? Where would a pepper live? Why is AES(password) with a key in app config worse than Argon2id?",
          language: "python",
          code: `# stored row:  argon2id$v=19$m=65536,t=3,p=1$<salt>$<digest>
# salt: in the row, unique, not secret
# pepper: HMAC key or extra secret in HSM / KMS, NOT in the DB
# AES(password) with KEY in config: DB dump + config dump = all passwords
#   in plaintext after one decrypt; also you never need plaintext`,
          steps: [
            "Salt lives in the same database row as the digest. It must be unique and random. Secrecy is not required; uniqueness is.",
            "Pepper lives outside the DB (KMS/HSM/app secret). A dump of the users table without the pepper cannot even start Argon2 with the right parameters. Compromise of both stores is needed.",
            "AES(password) is reversible. Anyone with the config key gets the actual passwords and will try them on every other site (users reuse). You do not need the plaintext to authenticate — only to compare a KDF.",
            "If the AES key is in the same git repo as the app, a single breach yields every password. A KDF has no equivalent ‘undo key’.",
            "Rotation: raising Argon2 cost on next login is easy. Rotating an AES password-encrypting key requires re-encrypting every row and still leaves you with reversible secrets.",
          ],
          result:
            "Salt in the row (unique, public). Pepper in KMS (secret, off-DB). Argon2id/bcrypt beat AES(password) because verification must not be reversible and a stolen config key must not yield plaintext passwords.",
        },
      ],
    },
    {
      heading: "Network audit versus systems audit, and TLS’s job",
      body: `A network audit examines the plumbing: topology, firewall rules, segmentation, open ports, VPN config, wireless (WPA2/3 vs open), NAC/802.1X, IDS/IPS placement, flow logs, DNS hygiene, BGP/route filters, TLS versions offered, and whether admin protocols (Telnet, SNMPv1) still exist. Typical artefacts: nmap/nessus of the perimeter, firewall rule review, packet captures of a span port, NetFlow, wireless survey. Question: ‘can an outsider reach the DB port? is guest Wi-Fi isolated?’

A systems (host / IS) audit examines the endpoints and applications: patch level, hardening baselines (CIS), local accounts, sudoers, AV/EDR, logging (and whether logs leave the host), file integrity, password policy, running services, database user grants, application configs, backup jobs. Artefacts: CIS-CAT, vulnerability scans of OS packages, config dumps, interview with the sysadmin. Question: ‘is this server a domain-admin workstation with an unpatched kernel?’

Overlap exists (a server’s listening ports are both), but the syllabus wants the distinction: network = paths and perimeter devices; systems = hosts, OS, apps, data stores. An IS audit in the broader RBI/SEBI sense also covers policies, SDLC, change management, and access recertification — governance, not only nmap.

TLS (Transport Layer Security) provides a confidential, integrity-protected, authenticated channel between two applications. Handshake: agree version/ciphers, authenticate the server with a certificate (and optionally the client), derive session keys, then AEAD-protect records. It does not hide IPs or SNI (always), does not stop phishing on a look-alike domain with its own cert, does not replace application authz, and is not a firewall. TLS 1.3 removes 1.0/1.1 foot-guns and is AEAD-only.

HTTPS is HTTP over TLS on 443. SMTPS/IMAPS/POP3S similarly wrap those apps. Mutual TLS (mTLS) is client certificates as a have-factor. Certificate pinning is extra distrust of the public CA set. The exam phrase: ‘TLS protects data in transit (C+I) and authenticates the server (authenticity), given that the client validates the certificate.’`,
      bullets: [
        "Network audit: firewalls, segmentation, ports, Wi-Fi, VPN, flows.",
        "Systems audit: OS patches, accounts, EDR, logs, app/DB config, backups.",
        "TLS: C+I in transit + server authenticity if the cert is validated.",
        "TLS is not hiding of IPs, not anti-phish for the wrong hostname, not authz.",
      ],
      examples: [
        {
          title: "Pick network audit or systems audit",
          prompt:
            "Tag each finding: (i) firewall allows 0.0.0.0/0 to 5432, (ii) PostgreSQL runs as root and is two years unpatched, (iii) guest SSID is on the same VLAN as finance, (iv) local Administrator password is ‘Password@1’ on 40 hosts, (v) no central syslog.",
          language: "python",
          code: `# (i) network     perimeter / ACL
# (ii) systems     host + DBMS hardening
# (iii) network     segmentation / WLAN
# (iv) systems     local account policy (could be domain GPO = systems)
# (v) systems      (host logging); also a SOC/network-log question
#     if the stem says 'switches don't export NetFlow' that would be network`,
          steps: [
            "0.0.0.0/0 to 5432 is a path from the world to a DB port. Firewall rule review is a network audit finding. (The DB should also refuse, which is systems — but the finding as written is the ACL.)",
            "Running as root, unpatched: host/DBA hygiene. Systems audit. A perfect firewall would still leave local attacks and app SQLi in play.",
            "Guest SSID sharing finance VLAN is segmentation, a network finding. A wireless survey plus switch VLAN dump shows it.",
            "Local Administrator password reuse is a systems/identity finding. Mimikatz-style lateral movement follows. Network segmentation would slow it, but the control that failed is host config.",
            "No central syslog: the hosts are not shipping logs (systems) and the SOC cannot hunt (operations). In a ‘network vs systems’ binary, tick systems unless the stem blamed the collector network.",
          ],
          result:
            "(i) network (ii) systems (iii) network (iv) systems (v) systems (logging). Network = paths and devices that forward; systems = OS/app/account state.",
        },
        {
          title: "What TLS does on https://example.com, step by step",
          prompt:
            "A browser talks to example.com:443. List five handshake jobs in order and the CIA letter each one serves. Assume a valid public-CA cert and no client cert.",
          language: "java",
          code: `// 1 TCP three-way handshake          (not TLS yet; just A of the pipe)
// 2 ClientHello / ServerHello        agree TLS 1.3 + AEAD cipher
// 3 server Certificate + proof       authenticity of example.com (has sk)
// 4 key schedule from ephemeral ECDHE  forward secrecy, then AEAD keys
// 5 application data in TLS records  C + I of HTTP
// browser MUST check name, expiry, chain, revocation -- or MITM wins`,
          steps: [
            "TCP connects first. That is not confidentiality. Anyone on the path sees the IPs and 443.",
            "TLS Hello agrees a modern cipher. TLS 1.3 uses AEAD only (C+I of records). A downgrade to a null cipher would be a failure of this step; 1.3’s design makes that much harder.",
            "The server presents a certificate for example.com and proves possession of the private key. The browser validates chain, name, time. This is authenticity of the server. Without it, a MITM presents their own cert and you have encrypted-to-the-wrong-party (C toward the attacker — useless).",
            "Ephemeral key exchange produces session keys that will not be recoverable from a later stolen server disk (forward secrecy). Then HTTP rides in AEAD records: C and I of the GET and the cookies.",
            "No client certificate here: the user is not yet authenticated. Application login (password/MFA) still has to happen inside the tunnel. TLS authenticated the server, not the human.",
          ],
          result:
            "After TCP: Hello (cipher) → cert validate (server authenticity) → ephemeral keys (C with forward secrecy) → AEAD records (C+I of HTTP). TLS did not authenticate the user and did not hide the IP.",
        },
        {
          title: "TLS does not fix these five bugs",
          prompt:
            "Explain in one line each why TLS does not stop: SQLi, stored XSS, CSRF, phishing on a look-alike domain, ransomware on a file server.",
          language: "cpp",
          code: `// SQLi: payload is inside the TLS tunnel, still concatenated into SQL
// XSS:  script is stored/served by the origin, TLS delivers it intact (I of the
//       channel, not of the HTML logic)
// CSRF: browser sends cookies on a TLS connection to the real bank
// phish: sebi-gov.in has its OWN valid cert; TLS is working as specified
// ransom: attacker already on the server; disk I/A, not a path problem`,
          steps: [
            "SQLi is an application/database confusion after decrypt. TLS delivered the malicious string confidentially and intact. Parameterise SQL.",
            "Stored XSS is the origin sending attacker HTML. TLS guarantees you got what the server sent, which is the problem. Encode output.",
            "CSRF uses a real TLS session to the real host, with real cookies. The channel is healthy; the intent is forged. CSRF tokens.",
            "Look-alike domains have their own legitimate certificates. The padlock on the wrong name is not a TLS failure. User/FIDO/DMARC.",
            "Ransomware on a mounted share is a host incident. TLS on the NIC does not decrypt-restore files. Backups and EDR.",
          ],
          result:
            "TLS = C+I of the path + server auth for that name. It does not fix injection, XSS, CSRF, look-alike phishing, or ransomware. Use the control that matches the bug.",
        },
        {
          title: "An audit finding written in CIA language",
          prompt:
            "Write a four-line finding: ‘Telnet (port 23) is open from the user VLAN to routers.’ Include condition, CIA impact, network-vs-systems tag, and a remediation.",
          language: "python",
          code: `# Condition: routers accept Telnet from the user VLAN (port 23 open)
# Impact: C (credentials and configs in clear), I (configs can be changed
#         by a MITM), A (anyone who logs in can reboot)
# Audit type: network (protocol on the path / management plane)
#             plus systems (the router OS still offers telnetd)
# Remediation: disable Telnet, allow SSH only from a jump VLAN, 802.1X`,
          steps: [
            "Condition is factual and testable: nmap or a netflow shows 23/tcp open from that VLAN. Auditors write evidence, not adjectives.",
            "CIA: Telnet is cleartext, so confidentiality of passwords and of every keystroke fails on any MITM. A MITM can also inject commands (integrity). A brute-forced Telnet login can reboot the box (availability).",
            "The open path is a network finding; the fact that the image still contains telnetd is a systems/hardening finding. Good reports tag both owners: network team to ACL, platform team to disable the daemon.",
            "Remediation: SSH only, management VLAN, MFA on the jump host, banner, logging to syslog. Re-test with nmap from the user VLAN (expect filtered/closed).",
            "This is how SEBI-style descriptive answers should look: evidence, CIA, owner, fix, retest. A one-word ‘insecure’ scores poorly.",
          ],
          result:
            "Telnet-from-users: network+systems finding, C+I+A impact, fix by SSH-from-jump-VLAN and disabling telnetd. Write condition, impact, owner, remediation.",
        },
      ],
    },
  ],
};
