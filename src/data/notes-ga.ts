import type { TopicNote } from "@/data/notes";

export const notesGa: TopicNote = {
  topic: "ga",
  title: "Financial GA for SEBI — worked notes",
  blurb:
    "Phase I Paper 1 General Awareness is a screening paper: about 25 marks, 30% sectional cut-off, marks do not enter the final merit. Financial-sector items (SEBI Act, market infrastructure, RBI tools, who regulates whom) are the cheapest marks if you can name the statute and reject the distractor. Label every chairperson and settlement-cycle date so a 2024 memory and a 2025 paper never get mixed.",
  blocks: [
    {
      heading: "SEBI Act, 1992 — HQ, preamble, and statutory functions",
      body: "The Securities and Exchange Board of India was first set up as a non-statutory body on 12 April 1988 by a Government of India resolution. The SEBI Act, 1992 then gave the Board statutory status. The Act received the President’s assent on 4 April 1992 and is treated as having come into force on 30 January 1992. Exam options that say SEBI was created by the Companies Act, 2013, the RBI Act, 1934, or the Securities Contracts (Regulation) Act, 1956 alone are wrong: those statutes sit in the same neighbourhood, but the Board’s own constitutive statute is the SEBI Act, 1992.\n\nHeadquarters are in Mumbai (SEBI Bhavan, Bandra Kurla Complex). Regional offices include New Delhi, Kolkata, Chennai and Ahmedabad; there are also local offices. Do not pick New Delhi just because other Union regulators sit there. The Securities Appellate Tribunal (SAT) is also in Mumbai; an appeal from SAT on a question of law goes to the Supreme Court (Section 15Z).\n\nThe preamble of the Act states three linked duties: protect the interests of investors in securities; promote the development of the securities market; and regulate that market. Section 11(1) restates those duties. Section 11(2) then lists measures: regulating stock-exchange business; registering and regulating intermediaries, depositories, custodians, foreign portfolio investors and others; prohibiting fraudulent and unfair trade practices; prohibiting insider trading; regulating substantial acquisition of shares and takeovers; promoting investor education and training of intermediaries; inspection, inquiry and audit; and calling for information. Section 11B (directions), Section 11D (cease-and-desist), Section 12 (registration of intermediaries) and Chapter VIA (civil penalties / adjudication) are the usual follow-up sections.\n\nA related statute map is worth memorising as a set, not as a blur. SCRA, 1956: recognition of stock exchanges and contracts in securities. Depositories Act, 1996: dematerialised holding and beneficial ownership. Companies Act, 2013: incorporation, accounts, and some corporate-governance duties (Ministry of Corporate Affairs). FEMA, 1999: capital-account and forex (RBI / Central Government). SEBI’s LODR, PIT, PFUTP, ICDR, SAST and intermediary regulations are subordinate legislation under the SEBI Act, not substitute Acts.",
      bullets: [
        "Constitutive statute: SEBI Act, 1992 (non-statutory SEBI from 12 April 1988).",
        "HQ: Mumbai. SAT: Mumbai. Supreme Court on a question of law from SAT.",
        "Preamble / s.11: protect investors, develop the market, regulate the market.",
        "Do not confuse SEBI Act 1992 with SCRA 1956, Depositories Act 1996, or Companies Act 2013.",
      ],
      examples: [
        {
          title: "Identify the constitutive statute",
          prompt:
            "SEBI was given statutory powers under which law? Options: (A) Companies Act, 2013 (B) SEBI Act, 1992 (C) SCRA, 1956 only (D) RBI Act, 1934.",
          steps: [
            "Ask what the question wants: the Board’s own constitutive Act, not every law that touches listed companies.",
            "Companies Act, 2013 is MCA/RoC company law. Listed companies also obey it, but it did not create SEBI.",
            "SCRA, 1956 recognises stock exchanges and regulates contracts in securities. It is complementary, not the SEBI Act.",
            "RBI Act, 1934 constitutes the Reserve Bank. Monetary policy and banking are not SEBI’s constitutive base.",
            "SEBI existed from 1988 without statute; the SEBI Act, 1992 is the statute that clothed it with powers. Pick (B).",
          ],
          result:
            "SEBI Act, 1992. Remember 12 April 1988 (non-statutory) versus 1992 (statutory, in force 30 January 1992).",
        },
        {
          title: "Headquarters versus SAT versus New Delhi distractors",
          prompt:
            "SEBI’s head office is in: (A) New Delhi (B) Kolkata (C) Mumbai (D) Hyderabad. A follow-up asks where an appeal from a SEBI adjudication typically goes first.",
          steps: [
            "Head office is Mumbai (BKC), not New Delhi. Regional offices include New Delhi, Kolkata, Chennai, Ahmedabad — those are not HQ.",
            "Hyderabad hosts other financial-market infrastructure (for example some depositories’ operations historically) but is not SEBI HQ.",
            "First statutory appeal from many SEBI orders is to the Securities Appellate Tribunal, also in Mumbai, not to a High Court as of right on facts.",
            "From SAT, a further appeal on a question of law lies to the Supreme Court (s.15Z), not a routine second SAT.",
            "So HQ = Mumbai; first appeal = SAT (Mumbai); law-point appeal = Supreme Court. Option (C) for HQ.",
          ],
          result:
            "HQ Mumbai; SAT Mumbai; Supreme Court on a question of law. New Delhi is a regional office, not HQ.",
        },
        {
          title: "Match the function to Section 11 language",
          prompt:
            "Which of the following is a statutory function of SEBI rather than of RBI? (A) Setting the repo rate (B) Registering stock brokers and prohibiting insider trading (C) Issuing dated G-secs for the Union (D) Fixing CRR.",
          steps: [
            "Repo, CRR, and the primary issuance of Union G-secs are RBI / Government of India functions. Strike (A), (C), (D).",
            "Section 11(2) expressly covers registering intermediaries (including stock brokers) and prohibiting insider trading.",
            "Investor protection and development of the securities market are the preamble duties that sit on top of those measures.",
            "A direction restraining an intermediary pending inquiry is a preventive market-integrity tool (s.11B style), not a monetary-policy tool.",
            "Therefore (B) is the SEBI function. If an option mixes ‘SEBI sets repo’, reject it even if the rest of the sentence sounds official.",
          ],
          result:
            "Registering brokers and prohibiting insider trading are SEBI s.11 functions. Repo, CRR and G-sec issuance are not.",
        },
        {
          title: "Statute map — which Act for which fact",
          prompt:
            "Match: (i) recognition of a stock exchange (ii) dematerialisation of shares (iii) constitution of SEBI (iv) incorporation of a public company. Choose the four Acts in order.",
          steps: [
            "Recognition of stock exchanges and the legal character of contracts in securities: Securities Contracts (Regulation) Act, 1956.",
            "Book-entry holding, beneficial owner versus registered owner, and depository regulation: Depositories Act, 1996.",
            "Constitution, Board, functions, penalties, SAT: SEBI Act, 1992.",
            "Incorporation, share capital, accounts, and MCA filings: Companies Act, 2013 (not SEBI Act).",
            "Write the order: SCRA 1956; Depositories Act 1996; SEBI Act 1992; Companies Act 2013. A listed company can be touched by all four; the question is which Act is the right hook.",
          ],
          result:
            "(i) SCRA 1956 (ii) Depositories Act 1996 (iii) SEBI Act 1992 (iv) Companies Act 2013.",
        },
      ],
    },
    {
      heading: "Chairperson timeline — keep 2020 / 2022 / 2024 / 2025 papers apart",
      body: "SEBI’s Board (Section 4) has a Chairman appointed by the Central Government, plus members drawn from the Union Finance and Law ministries, one member from the Reserve Bank of India, and five other members of whom at least three shall be whole-time members. The Chairperson is the fact the paper will actually ask. Do not treat ‘who is Chairperson’ as a timeless GK item: a 2020 paper, a 2022 paper, a 2024 paper and a 2025 paper have three different correct names.\n\nAjay Tyagi served as Chairperson from 1 March 2017 until 28 February 2022. For the 2020 Grade A cycle, Tyagi is the correct Chairperson. Madhabi Puri Buch is a trap in a 2020 question: she had not yet taken charge.\n\nMadhabi Puri Buch took charge on 1 March 2022 as SEBI’s first woman Chairperson, succeeding Tyagi. She remained in office through calendar year 2024 and until 28 February 2025. For any 2022 (after 1 March), 2023, or 2024 paper, Buch is the Chairperson. Tuhin Kanta Pandey is a trap in those papers: he had not yet assumed charge. Shaktikanta Das was RBI Governor in that period, not SEBI Chair.\n\nTuhin Kanta Pandey, a 1987-batch IAS officer and former Finance Secretary / Secretary, Department of Revenue (and earlier Secretary, DIPAM), assumed charge as Chairperson on 1 March 2025 for a three-year term. For a 2025 paper, Pandey is the Chairperson. Buch’s term had ended on 28 February 2025; she did not begin a second consecutive term. Ajay Tyagi did not return in 2025. Label every current-affairs note with the month: ‘Buch, Mar 2022–Feb 2025’ and ‘Pandey, from 1 Mar 2025’.",
      bullets: [
        "Ajay Tyagi: 1 March 2017 – 28 February 2022 (correct for 2020 papers).",
        "Madhabi Puri Buch: 1 March 2022 – 28 February 2025; first woman Chairperson (correct for 2022 after 1 Mar, 2023, 2024).",
        "Tuhin Kanta Pandey: from 1 March 2025 (correct for 2025 papers). Former Finance Secretary, not RBI Governor.",
        "Never answer ‘who is SEBI Chair?’ without the paper’s year.",
      ],
      examples: [
        {
          title: "2020-cycle Chairperson",
          prompt:
            "Who was Chairperson of SEBI during the 2020 Officer Grade A cycle? (A) U.K. Sinha (B) Ajay Tyagi (C) Madhabi Puri Buch (D) Tuhin Kanta Pandey.",
          steps: [
            "Place the recruitment year: 2020 sits inside Tyagi’s term (Mar 2017–Feb 2022).",
            "U.K. Sinha’s term ended in 2017 when Tyagi took over. Too early.",
            "Madhabi Puri Buch took charge only on 1 March 2022. Too late for 2020.",
            "Tuhin Kanta Pandey took charge only on 1 March 2025. Far too late.",
            "Select Ajay Tyagi. Write in the margin: 2020 → Tyagi; 2022–24 → Buch; 2025 → Pandey.",
          ],
          result:
            "Ajay Tyagi (Mar 2017–Feb 2022). Buch and Pandey are later chairs; do not import them into a 2020 paper.",
        },
        {
          title: "March 2022 succession",
          prompt:
            "Who became Chairperson of SEBI in March 2022, succeeding Ajay Tyagi? (A) Shaktikanta Das (B) Madhabi Puri Buch (C) Tuhin Kanta Pandey (D) Ajay Tyagi continuing.",
          steps: [
            "Tyagi’s term ended 28 February 2022. Someone new took charge on 1 March 2022.",
            "Shaktikanta Das was RBI Governor, not SEBI Chair. Cross-regulator name trap.",
            "Tuhin Kanta Pandey is the March 2025 successor, three years later. Do not collapse 2022 and 2025.",
            "Buch is SEBI’s first woman Chairperson — that biographical fact attaches to March 2022, not to 2025.",
            "Answer: Madhabi Puri Buch from 1 March 2022. If the question adds ‘first woman Chairperson’, still Buch, not a later Chair.",
          ],
          result:
            "Madhabi Puri Buch, 1 March 2022, first woman Chairperson, succeeding Ajay Tyagi.",
        },
        {
          title: "Calendar year 2024 Chairperson",
          prompt:
            "Who was Chairperson of SEBI through calendar year 2024? (A) Ajay Tyagi (B) Tuhin Kanta Pandey (C) Shaktikanta Das (D) Madhabi Puri Buch.",
          steps: [
            "Tyagi had already demitted office in February 2022. He is not a 2024 fact.",
            "Pandey assumed charge on 1 March 2025, so he cannot be the 2024 Chair.",
            "Das is RBI, not SEBI. Same name-trap as in 2022 questions.",
            "Buch’s term ran 1 March 2022 through 28 February 2025, covering all of calendar 2024.",
            "A 2024 paper that says ‘Pandey has already completed a three-year term beginning March 2022’ is false: that timeline was Buch’s, not Pandey’s.",
          ],
          result:
            "Madhabi Puri Buch through 2024. Pandey is a 2025 fact; do not back-date him.",
        },
        {
          title: "1 March 2025 Chairperson",
          prompt:
            "Who assumed charge as Chairperson of SEBI on 1 March 2025? (A) Madhabi Puri Buch, beginning a second consecutive term (B) Ajay Tyagi (C) Tuhin Kanta Pandey (D) Shaktikanta Das. Also: what was Pandey’s immediate Union role?",
          steps: [
            "Buch’s term ended 28 February 2025. She did not start a second consecutive term on 1 March 2025.",
            "Tyagi did not return. Das was never SEBI Chair.",
            "Tuhin Kanta Pandey assumed charge on 1 March 2025 for a three-year term.",
            "He came most immediately from Finance Secretary / Secretary, Department of Revenue. He had earlier been Secretary, DIPAM. He was not RBI Governor, not IRDAI Chair, not Chief Justice.",
            "A 2025 statement ‘Buch remained Chairperson throughout 2025’ is false. Correct pairing: Buch until Feb 2025; Pandey from Mar 2025.",
          ],
          result:
            "Tuhin Kanta Pandey from 1 March 2025; former Finance Secretary. Buch’s term had already ended 28 February 2025.",
        },
      ],
    },
    {
      heading: "Who regulates X? — intermediaries, decision trees, SEBI ≠ RBI",
      body: "A large share of Paper 1 GA is a jurisdiction question wearing current-affairs clothes. Draw a decision tree before you look at options. Is the activity a security, a listed-company disclosure, a mutual fund, an FPI, a broker, an investment adviser, a research analyst, an AIF, a REIT, or a stock exchange? That is SEBI (SEBI Act plus the matching regulations). Is it a bank deposit, payment system, CRR/SLR, repo, bank licence, or primary G-sec issuance? That is RBI. Is it insurance? IRDAI. Pension funds / NPS architecture? PFRDA. Competition / combinations? CCI. Incorporation and unlisted-company accounts? MCA. Capital-account / forex? FEMA — RBI and the Central Government — but FPI registration itself is SEBI.\n\nSection 12 of the SEBI Act requires specified intermediaries to obtain a certificate of registration. The classic list includes stock brokers, merchant bankers, underwriters, registrars to an issue and share transfer agents, bankers to an issue, portfolio managers, investment advisers, research analysts, depositories and depository participants, custodians, credit rating agencies, and collective-investment / mutual-fund related entities as the regulations provide. Sub-broker as a separate registration category has been largely migrated; do not treat ‘sub-broker’ as the live 2025 label unless the question is historical.\n\nOverlaps exist and the exam loves them. A listed NBFC answers to RBI as an NBFC and to SEBI LODR as a listed entity. An IFSC entity at GIFT City answers to IFSCA for financial products and services in the IFSC, even if the same group is SEBI- or RBI-regulated onshore. FDI policy sits with DPIIT / the Central Government; once the money is portfolio investment in Indian securities, FPI registration and conduct are SEBI. SCORES (SEBI Complaints Redress System) is SEBI’s investor-grievance platform; it does not decide criminal guilt and does not guarantee compensation for market loss.\n\nIf two regulators could be argued, pick the one whose statute actually registers or conducts the activity named in the stem. ‘Banks lend’ is RBI even if the borrower is a broker. ‘Broker defaults on a client securities payout’ is SEBI even if the broker also has a bank account. ‘Who sets repo?’ is always RBI. ‘Who registers FPIs?’ is always SEBI.",
      bullets: [
        "SEBI: securities, exchanges, brokers, MFs, FPIs, PIT/PFUTP/LODR, depositories.",
        "RBI: banks, payments, monetary policy, G-secs primary/debt management, CRR/SLR/repo/SDF.",
        "IFSCA: financial products/services inside an IFSC (GIFT City). IRDAI insurance; PFRDA pensions; CCI combinations.",
        "Listed NBFC: RBI + SEBI LODR. FPI registration: SEBI. FDI policy: government/DPIIT.",
      ],
      examples: [
        {
          title: "Decision tree — FPI versus FDI versus bank",
          prompt:
            "FPIs in India are regulated (for registration and securities-market conduct) by: (A) IRDAI only (B) SEBI (C) PFRDA only (D) CCI only.",
          steps: [
            "Name the activity: a Foreign Portfolio Investor buys Indian securities. That is securities-market activity.",
            "IRDAI is insurance. PFRDA is pensions. CCI is competition. None of them registers FPIs.",
            "FDI policy (strategic / controlling investment, including the 10% reclassification threshold from FPI to FDI in a listed company) sits with the government / DPIIT, not IRDAI.",
            "FEMA still constrains capital-account flows (RBI / government), but the FPI registration certificate and SEBI (FPI) Regulations, 2019 are SEBI’s.",
            "Answer: SEBI. If an option says ‘RBI registers FPIs’, reject it; RBI’s hook is FEMA, not the FPI certificate.",
          ],
          result:
            "SEBI registers and regulates FPIs (2019 Regulations). FDI policy is government/DPIIT; FEMA is RBI/government.",
        },
        {
          title: "Decision tree — repo versus broker versus G-sec",
          prompt:
            "The repo rate is the rate at which: (A) banks lend to the government without collateral (B) RBI lends to banks against eligible collateral (liquidity injection) (C) SEBI charges brokers (D) depositors earn on savings by statute. Who then regulates a stock broker?",
          steps: [
            "Repo is a liquidity-adjustment facility of RBI: RBI injects rupees, banks give eligible G-sec collateral. Pick (B).",
            "(A) describes an unsecured loan to government — not repo. (C) invents a SEBI ‘repo charge’ — nonsense. (D) is a savings-deposit rate, a different price.",
            "Standing Deposit Facility (SDF, from 8 April 2022) is the uncollateralised floor where banks park surplus at RBI — the opposite direction from repo.",
            "A stock broker is a SEBI-registered intermediary under s.12 and the Stock Brokers Regulations. RBI does not license brokers.",
            "Write the split: price of overnight secured liquidity = RBI; licence to deal in securities for clients = SEBI.",
          ],
          result:
            "Repo is RBI→banks against collateral. Brokers are SEBI. Never let a monetary-policy noun pull a securities intermediary with it.",
        },
        {
          title: "Decision tree — listed NBFC and GIFT City",
          prompt:
            "A listed deposit-taking NBFC issues a corporate bond; the same group opens an IFSC banking unit at GIFT City. Who regulates which slice?",
          steps: [
            "NBFC licence, prudential norms, deposit-taking: Reserve Bank of India (RBI Act / RBI NBFC directions).",
            "Equity listing, LODR disclosures, PIT on the listed shares, and listed-debt issuance process: SEBI.",
            "The bond, if listed, is a security. Credit-rating agencies that rate it are SEBI-registered. Default of the NBFC as a company can still be an RBI supervisory event.",
            "The IFSC banking unit at GIFT City is an IFSCA-regulated financial institution for IFSC business, not a domestic RBI branch in the ordinary sense.",
            "Answer in three labels: onshore NBFC = RBI; listed securities = SEBI; IFSC unit = IFSCA. Do not pick a single regulator for the whole group.",
          ],
          result:
            "RBI (NBFC), SEBI (listing/PIT/listed debt), IFSCA (GIFT IFSC unit). Group membership does not collapse the tree.",
        },
        {
          title: "Decision tree — grievance, insurance, pension, competition",
          prompt:
            "Match the platform/regulator: (i) SCORES (ii) a life-insurance policy grievance (iii) NPS architecture (iv) a merger notification above thresholds.",
          steps: [
            "SCORES is SEBI’s securities-market investor grievance system. It tracks complaints against listed companies and intermediaries; it is not a criminal court and not a guaranteed payout.",
            "Life insurance: IRDAI and the insurer’s grievance channel / Insurance Ombudsman — not SEBI, even if the insurer is listed (listing is a separate SEBI hook).",
            "NPS and many pension products: PFRDA. SEBI does not run NPS.",
            "Combinations / mergers above CCI thresholds: Competition Commission of India. SEBI’s SAST open-offer rules can also fire on an acquisition of listed shares — a parallel hook, not a substitute for CCI.",
            "If the stem is ‘securities complaint about a broker’, SCORES/SEBI. If it is ‘policy claim’, IRDAI. Do not pick SEBI for every financial complaint.",
          ],
          result:
            "SCORES→SEBI; insurance→IRDAI; NPS→PFRDA; merger notification→CCI (SAST may still apply to listed-share acquisitions).",
        },
      ],
    },
    {
      heading: "LODR, PIT insider trading, and PFUTP — identify the statute",
      body: "Three SEBI regulations are asked by name. Learn what each one is for, and refuse to use PIT when the fact pattern is market manipulation, or LODR when the fact pattern is trading on unpublished information.\n\nSEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015 (LODR) bind listed entities and specified listed debt issuers. They are the continuing-disclosure and corporate-governance code after listing: board composition (Reg. 17), audit committee, related-party transactions, financial-result filings (Reg. 33), and disclosure of material events (Reg. 30). Materiality is both event-list based and principle based: an event that can affect the listed entity’s performance or the price of securities. LODR is about what the company must tell the market, not about a connected person trading.\n\nSEBI (Prohibition of Insider Trading) Regulations, 2015 (PIT) replaced the 1992 PIT regulations. The core prohibition is trading in securities while in possession of unpublished price-sensitive information (UPSI), and communicating UPSI except for a legitimate purpose, performance of duties, or legal obligation. Connected persons (directors, officers, employees, fiduciaries, consultants) and immediate relatives (often deemed) sit in the net. Designated persons face a trading window (typically closed from the end of the quarter until 48 hours after results), contra-trade restrictions (commonly six months), disclosures, and a structured digital database of who received UPSI. Communication of UPSI is defensible when it is need-to-know for a legitimate purpose with recorded safeguards — not because the recipient ‘promised not to trade’ orally or posted in a private chat. A designated person who trades while the window is closed can breach the code even if profit or actual knowledge of the results is not proved.\n\nSEBI (Prohibition of Fraudulent and Unfair Trade Practices relating to Securities Market) Regulations, 2003 (PFUTP) catch deception of the market: circular trading, wash trades, pump-and-dump, spoofing / layering style order-book tricks, benchmark manipulation, and front-running a client order. Front-running (broker trades ahead of a large client order) is PFUTP / fraud, not automatically PIT: PIT needs issuer UPSI; front-running needs misuse of order-flow information. 2022 amendments widened dealing-in-securities and rumour-related language; you need the idea, not a section number.\n\nICDR 2018 (primary issues), SAST 2011 (open offer, typically 25% trigger, creeping acquisition in the 25–75% band), and Buy-back Regulations 2018 are the other named codes. If the stem is an IPO prospectus, think ICDR. If it is a 26% acquisition of a listed company, think SAST. If it is a promoter buying in a closed window on tomorrow’s results, think PIT. If it is matched circular volume to paint the tape, think PFUTP. If it is a late disclosure of a material contract, think LODR Reg. 30.",
      bullets: [
        "LODR 2015: listed-entity disclosure and governance (Reg. 30 material events, Reg. 33 results).",
        "PIT 2015: UPSI, connected persons, trading window, contra trade, SDD — not the same as PFUTP.",
        "PFUTP 2003: fraud on the market, front-running, circular trades, pump-and-dump.",
        "ICDR 2018 = issues; SAST 2011 = takeovers; Buy-back 2018 = buy-backs.",
      ],
      examples: [
        {
          title: "Identify the statute — insider versus fraud versus listing",
          prompt:
            "A CFO’s spouse buys shares two days before quarterly results are published. Separately, a broker buys for the proprietary book seconds before placing a large client buy. Separately, a listed company sits on a signed material acquisition for a week without a stock-exchange intimation. Name the primary SEBI code for each.",
          steps: [
            "CFO is a connected / designated person; unpublished results are UPSI; the spouse is typically in the immediate-relative net. Primary code: PIT Regulations, 2015. Trading-window rules may also be breached.",
            "The broker’s information is the client’s impending order, not issuer UPSI. That is front-running / unfair trade practice: PFUTP 2003 (and broker conduct rules). Do not call it PIT unless issuer UPSI is also present.",
            "A signed material acquisition not intimated is a continuing-disclosure failure: LODR Reg. 30 (material events), not PIT by itself.",
            "If the same company officers then traded, you can stack PIT on LODR. The question asked the primary hook for each slice — keep them separate until the facts merge.",
            "Write: (1) PIT 2015 (2) PFUTP 2003 (3) LODR 2015. Reject ‘FEMA’, ‘GST Act’, and ‘Negotiable Instruments Act’ as insider-trading answers.",
          ],
          result:
            "Spouse+results → PIT 2015. Broker ahead of client → PFUTP 2003. Silent material deal → LODR 2015 Reg. 30.",
        },
        {
          title: "PIT — UPSI communication and trading window",
          prompt:
            "Under PIT, unpublished price-sensitive information may be communicated most defensibly when: (A) the recipient promises not to trade orally (B) it is needed for a legitimate purpose, duties, or legal obligations and safeguards are followed (C) the recipient owns fewer than 100 shares (D) it is posted in a private social-media group. A designated person trades in a closed window and claims ignorance of the results.",
          steps: [
            "PIT allows communication of UPSI for legitimate purpose / duties / legal obligation, on a need-to-know basis, with the listed entity’s policy and usually an entry in the structured digital database. That is (B).",
            "(A) fails: an oral promise is not a statutory safe harbour. (C) fails: holding size is irrelevant to the prohibition. (D) fails: a private group is still communication to persons who do not need the UPSI.",
            "Trading-window closure is a preventive code rule for designated persons around results. Breach does not require proof of profit or of actual knowledge of the number in the results.",
            "Contrast: a random public shareholder who is not connected and has no UPSI is not in the PIT designated-person window (they may still be in PIT if they actually possess UPSI).",
            "Answer the communication limb as (B); answer the closed-window trade as a code breach even without proven profit. PFUTP is not required for that employee-window fact.",
          ],
          result:
            "Legitimate-purpose communication with safeguards is the PIT path. Closed-window trades by designated persons can breach the code without proof of profit.",
        },
        {
          title: "PFUTP — front-running is not a repo",
          prompt:
            "A broker trades ahead of a large client order to benefit from expected price impact. The conduct is most naturally examined as: (A) front-running and a fraudulent/unfair trade practice (B) a risk-free repo (C) a depository reconciliation (D) a legitimate circuit filter.",
          steps: [
            "The broker used non-public order-flow information for a proprietary advantage. That is the textbook front-running fact pattern.",
            "PFUTP 2003 is the SEBI regulation aimed at fraudulent and unfair trade practices in the securities market. Broker regulations and the code of conduct sit alongside.",
            "Repo is an RBI collateralised liquidity transaction. It has nothing to do with jumping a client order.",
            "Depository reconciliation is an operational NSDL/CDSL/DP process. Circuit filters are exchange price bands, not a licence to trade ahead of clients.",
            "Pick (A). If the same person also had issuer UPSI, you may add PIT; the stem did not give issuer UPSI, so do not lead with PIT.",
          ],
          result:
            "Front-running / PFUTP. Distinct from PIT (issuer UPSI) and unrelated to repo, depositories, or circuit filters.",
        },
        {
          title: "LODR versus ICDR versus SAST",
          prompt:
            "Match: (i) IPO offer document and eligibility (ii) listed company misses a material-event intimation (iii) acquirer crosses 25% of a listed company (iv) company buys back listed shares.",
          steps: [
            "IPO / FPO / rights / preferential / QIP process and offer-document disclosures: SEBI (ICDR) Regulations, 2018.",
            "Continuing disclosure after listing: LODR 2015. A missed material-event intimation is LODR, not ICDR.",
            "Substantial acquisition and open-offer trigger (the standard 25% initial trigger, plus creeping acquisition rules in the 25–75% range): SEBI (SAST) Regulations, 2011.",
            "Listed-share buy-back: SEBI (Buy-back of Securities) Regulations, 2018, plus Companies Act buy-back provisions.",
            "Order: ICDR 2018; LODR 2015; SAST 2011; Buy-back 2018. A 26% creeping story that you answer as LODR is the usual mix-up.",
          ],
          result:
            "(i) ICDR 2018 (ii) LODR 2015 (iii) SAST 2011 (iv) Buy-back 2018.",
        },
      ],
    },
    {
      heading: "Primary versus secondary market, FPIs, and mutual funds",
      body: "The primary market is where securities are issued for the first time (or further issued by the company): IPOs, FPOs, rights issues, preferential allotments, QIPs, and many debt issuances. Price discovery may be book-built or fixed-price. Merchant bankers (lead managers), registrars, bankers to the issue, and underwriters are the SEBI-registered cast; ICDR 2018 is the rulebook. An Offer for Sale (OFS) of already-issued shares through the exchange mechanism is a sale by existing holders, often promoters, and sits at the boundary — it is not a fresh issue of capital even though it uses exchange infrastructure.\n\nThe secondary market is where issued securities are subsequently traded: NSE, BSE, and MSEI in equities, plus debt segments and the derivatives market. Listing after a primary issue is the bridge. Cash-market trades in listed equity now default to T+1 rolling settlement (from 27 January 2023). Derivatives (F&O) are a secondary-market product with their own clearing and margins. Do not call the IPO grey-market an official SEBI market.\n\nForeign Portfolio Investors are governed by the SEBI (FPI) Regulations, 2019, which replaced the 2014 Regulations and collapsed three categories into two. Category I includes government and government-related investors, sovereign wealth funds, pension and university funds and certain regulated entities from FATF-compliant jurisdictions. Category II is other eligible FPIs. Registration is through a Designated Depository Participant. Holding 10% or more in a listed Indian company is the usual threshold at which the investment is reclassified towards FDI. NRIs are not the ordinary FPI vehicle.\n\nMutual funds are governed by the SEBI (Mutual Funds) Regulations, 1996. The three-tier structure is Sponsor → Trustees (who oversee) → Asset Management Company (which manages). A custodian holds securities; an RTA processes units; AMFI is the industry association, not the regulator. NAV = (assets − liabilities) / outstanding units. Open-ended schemes issue and redeem continuously; close-ended schemes do not, except as the scheme documents provide; interval schemes sit between. TER (total expense ratio) is capped by slab. Cut-off time for applicable NAV (commonly 3:00 p.m. for equity and many non-liquid debt schemes) is a conduct rule, not a trivia date. Risk-o-meter and product labelling are disclosure tools. AMFI is not SEBI; SEBI is the regulator.",
      bullets: [
        "Primary: IPO/FPO/rights/QIP/preferential — ICDR 2018, merchant bankers.",
        "Secondary: exchange trading of already-issued securities; cash equity default T+1 since 27 Jan 2023.",
        "FPI Regulations 2019: Category I and II; SEBI registration via DDP; ~10% listed-company line toward FDI.",
        "MF Regulations 1996: Sponsor–Trustee–AMC; NAV; open vs close-ended; AMFI ≠ regulator.",
      ],
      examples: [
        {
          title: "Primary or secondary — four instruments",
          prompt:
            "Classify: (i) a company allots fresh shares in an IPO (ii) you buy those shares next week on NSE (iii) promoters sell a block via OFS on the exchange (iv) the company issues new shares to QIBs in a QIP.",
          steps: [
            "IPO allotment of fresh capital is primary-market issuance under ICDR. The company receives the issue proceeds (subject to offer structure).",
            "A later purchase on NSE is secondary-market trading. The seller is another investor; the company does not receive that money.",
            "OFS is a sale of already-issued shares by existing holders using exchange infrastructure. It does not raise new capital for the company. Treat it as a secondary sale with a special window, not as an IPO.",
            "QIP is a further issuance of securities to qualified institutional buyers — primary (further issue), ICDR, even though listing is already in place.",
            "Write: (i) primary (ii) secondary (iii) secondary sale / OFS, not fresh capital (iv) primary further issue. The trap is calling OFS an IPO.",
          ],
          result:
            "IPO and QIP are primary. Exchange purchase is secondary. OFS is a sale of existing shares, not a fresh issue.",
        },
        {
          title: "FPI category and the 10% line",
          prompt:
            "A sovereign wealth fund from an FATF-compliant jurisdiction registers to buy listed Indian shares, currently 4% of a company. What category is it, who registers it, and what happens if it crosses 10%?",
          steps: [
            "Sovereign wealth funds from FATF-compliant jurisdictions are the textbook Category I FPI under the 2019 Regulations (Category III from 2014 is gone).",
            "Registration is with SEBI through a Designated Depository Participant, not with IRDAI or PFRDA.",
            "At 4% the holding is ordinary FPI portfolio investment, subject to sectoral and FPI group limits as applicable.",
            "At 10% or more of a listed Indian company, the investment is generally to be reclassified in the FDI lane (government/DPIIT policy plus FEMA), not left as ordinary FPI.",
            "Do not say RBI ‘registers’ the SWF. RBI’s FEMA role remains, but the FPI certificate is SEBI’s. Do not use 2014’s three-category scheme in a 2024/25 paper.",
          ],
          result:
            "Category I FPI, SEBI via DDP. Crossing 10% in a listed company is the usual FPI→FDI reclassification line.",
        },
        {
          title: "Mutual-fund three-tier and NAV",
          prompt:
            "Scheme assets are Rs 5,200 crore, liabilities Rs 80 crore, units outstanding 160 crore. Who calculates NAV as a legal actor, and what is NAV per unit? Who is not the regulator: AMFI or SEBI?",
          steps: [
            "Net assets = 5,200 − 80 = 5,120 crore rupees.",
            "NAV per unit = 5,120 crore / 160 crore units = 5,120 / 160 = 32 rupees.",
            "The AMC computes and publishes NAV as per SEBI MF Regulations and the scheme documents; the trustee oversees the AMC; the sponsor stands behind the AMC’s eligibility.",
            "The custodian holds the securities; the RTA processes unit-holder transactions. Neither of them is the ‘fund’ in the legal-scheme sense.",
            "SEBI is the regulator (1996 Regulations). AMFI is the trade association. If an option says ‘AMFI regulates mutual funds’, it is false.",
          ],
          result:
            "NAV = Rs 32. Three-tier: Sponsor–Trustee–AMC. Regulator = SEBI, not AMFI.",
        },
        {
          title: "Open-ended versus close-ended versus interval",
          prompt:
            "An investor wants daily subscription and redemption at NAV. Another scheme lists on the exchange and does not redeem daily. A third opens only in specified windows. Name the three MF types and the regulation year.",
          steps: [
            "Daily ongoing sale and repurchase at NAV (subject to cut-off and liquidity rules) is an open-ended scheme — the default retail MF.",
            "A scheme that does not continuously issue/redeem, often listed, is close-ended. Liquidity is mainly on the exchange, at market price, which can differ from NAV.",
          "Interval schemes combine both: they open for sale/repurchase only in stated intervals.",
            "All three are still under SEBI (Mutual Funds) Regulations, 1996. Listing of close-ended units also attracts exchange/LODR-type duties as applicable.",
            "Cut-off time (commonly 3:00 p.m. for many equity applications) decides which day’s NAV applies; it does not convert a close-ended scheme into an open-ended one.",
          ],
          result:
            "Open-ended (daily NAV flow); close-ended (typically listed, no daily redeem); interval (windows). Statute: MF Regulations, 1996.",
        },
      ],
    },
    {
      heading: "NSDL/CDSL, clearing, T+1 walk-through, and optional T+0",
      body: "India’s depository system rests on the Depositories Act, 1996. Two depositories hold dematerialised securities in book-entry form: NSDL (National Securities Depository Limited — the first depository, operations from 1996) and CDSL (Central Depository Services (India) Limited — 1999). Both are headquartered in Mumbai. Investors do not usually open an account by walking into NSDL/CDSL; they go through a Depository Participant (DP) — a bank, broker or other SEBI-registered DP. The depository is the registered owner; the investor is the beneficial owner. Holdings of the same ISIN are fungible: units are interchangeable, not tied to a physical certificate number.\n\nClearing corporations sit between counterparties. NSE Clearing Ltd (formerly NSCCL) clears NSE trades; Indian Clearing Corporation Ltd (ICCL) clears BSE trades. By novation, the CCP becomes buyer to every seller and seller to every buyer. Margins (SPAN / VaR, extreme-loss, mark-to-market) and a core Settlement Guarantee Fund with a default waterfall are the risk stack. Depositories move securities; clearing corporations ensure the funds-versus-securities obligation is defined and guaranteed up to the waterfall. Do not say NSDL ‘sets the repo rate’ or that a DP is the issuer’s auditor.\n\nSettlement-cycle dates must be labelled by year. Cash equities used T+2 rolling settlement for years (T+2 was in force in 2020). SEBI’s 2021 decision led to a phased T+1 roll-out through 2022; remaining stocks moved on 27 January 2023. From that date the default cash-equity cycle is T+1: funds and securities are exchanged on the next settlement / business day after the trade date, not necessarily the next calendar day. If you buy on Monday and Tuesday is a settlement holiday, completion is Wednesday.\n\nOptional T+0 is a later, narrower path. From 28 March 2024 exchanges offered a beta same-day cycle for a limited basket (initially 25 stocks), running alongside T+1, not replacing it. It was not mandatory for every listed scrip, not a return to T+5, and not a commodities-only product. Later 2024 phases widened the basket and the set of brokers; T+1 remained the default. A 2022 paper must not treat universal T+1 as already finished in 2020, and must not treat T+0 as the 2022 design. A 2024 paper must treat T+1 as already market-wide and T+0 as an optional limited add-on. A 2025 paper still treats T+1 as the default; optional T+0 continued as an additional path, not as compulsory T+0 for every scrip.",
      bullets: [
        "Depositories Act 1996; NSDL (1996) and CDSL (1999); access via DPs; beneficial owner; fungible ISINs.",
        "CCPs: NSE Clearing Ltd, ICCL; novation; margins; core SGF.",
        "Default cash equity: T+2 in 2020; phased T+1 in 2022; market-wide T+1 from 27 January 2023.",
        "Optional T+0 beta from 28 March 2024 (initially 25 scrips), alongside T+1, not a full-market mandate.",
      ],
      examples: [
        {
          title: "T+1 walk-through of a Monday trade",
          prompt:
            "An investor buys 100 shares of a T+1 cash-equity scrip on Monday in the regular session. Trace funds and securities if (i) Tuesday is a working settlement day (ii) Tuesday is a settlement holiday and Wednesday is not.",
          steps: [
            "Trade date T is Monday. In rolling T+1, the intended pay-in / pay-out day is the next settlement day, not ‘one month later’ and not T+5.",
            "Case (i): Tuesday is a business/settlement day. On Tuesday the buyer’s funds are paid in, the seller’s securities are paid in, and the CCP / depositories complete pay-out: shares credit the buyer’s demat, money credits the seller’s funds account (via brokers/clearing members).",
            "Case (ii): Tuesday is a settlement holiday. T+1 means next settlement day, so Wednesday. The trade is still a Monday trade; it is not re-booked as a Wednesday trade.",
            "Optional T+0 would have tried to finish on Monday evening for an opted-in scrip and opted-in path. That is a separate cycle; it does not rewrite the default T+1 Monday trade in case (i).",
            "If an option says ‘settled Monday itself’ for an ordinary T+1 trade, it is describing T+0, which is not the default. Answer: (i) Tuesday (ii) Wednesday.",
          ],
          result:
            "T+1 = next settlement day. Monday trade → Tuesday, or Wednesday if Tuesday is a settlement holiday. T+0 is optional and separate.",
        },
        {
          title: "Label the year — T+2, T+1, T+0",
          prompt:
            "Which statement matches which Grade A cycle? (A) 2020 default cycle (B) 2022 paper on T+1 (C) 2024 default cycle (D) March 2024 T+0 launch.",
          steps: [
            "2020: cash equities were on T+2. T+1 had not been completed; T+0 was not the default. A 2020 option that says ‘T+1 for every scrip from 2018’ is false.",
            "2022: SEBI had announced a phased shift to T+1; remaining stocks were scheduled for January 2023. A 2022 paper should say T+1 was in progress, not already universal, and not already replaced by T+0.",
            "From 27 January 2023, T+1 is market-wide for cash equities. A 2024 paper’s default cycle is therefore T+1, already in force — not ‘still T+2’.",
            "28 March 2024: optional T+0 beta for a limited set (initially 25 scrips), additional to T+1, not a mandate for all stocks, not T+5, not commodities-only.",
            "2025: default remains T+1; optional T+0 is still an extra path, not compulsory T+0 for every listed scrip. Match: (A) T+2 (B) phased T+1, not finished (C) T+1 (D) limited optional T+0 beta.",
          ],
          result:
            "2020=T+2; 2022=phased T+1 unfinished; 27 Jan 2023 onwards default T+1; 28 Mar 2024=optional T+0 beta beside T+1.",
        },
        {
          title: "Depository versus DP versus clearing corporation",
          prompt:
            "Which statement is accurate? (A) Investors must transact directly with NSDL/CDSL with no intermediary (B) a DP is the investor-facing agent; securities are demat book-entry (C) a DP is the issuer’s statutory auditor (D) depositories set the repo rate. What does fungibility of an ISIN mean?",
          steps: [
            "Investors access NSDL/CDSL through registered DPs. (A) is false.",
            "(B) is the correct structural sentence: DP faces the investor; the depository runs the book-entry system; the investor is beneficial owner.",
            "(C) confuses a DP with an audit firm. (D) confuses a depository with RBI.",
            "Fungibility: units of the same ISIN are interchangeable. You hold a balance, not a unique certificate number as in the physical era.",
            "Clearing is a different entity: NSE Clearing / ICCL novate trades. NSDL/CDSL then move the securities on settlement instructions. Do not merge CCP and depository in one option.",
          ],
          result:
            "(B) is correct. Fungibility = interchangeable book-entry units of an ISIN. Repo is RBI; auditors are not DPs.",
        },
        {
          title: "Novation and why T+1 still needs a CCP",
          prompt:
            "In T+1, why does a clearing corporation still stand in the middle? Distinguish novation, margins, and the core SGF from a mere depository transfer.",
          steps: [
            "On trade day the buyer and seller match on the exchange. They do not remain each other’s legal counterparties for settlement.",
            "Novation: the CCP becomes buyer to every seller and seller to every buyer. One member’s default is the CCP’s problem, managed through the waterfall, not a bilateral hunt.",
            "Margins (VaR/SPAN, extreme loss, MTM) pre-fund risk. Shortening T+2 to T+1 cuts overnight counterparty hours but does not delete the need for margins.",
            "Core Settlement Guarantee Fund and the default waterfall are the mutualised last layers. A depository credit of shares is the securities leg; it is not itself the guarantee.",
            "So T+1 is a calendar change plus operational compression; CCP novation remains the legal design. An option ‘T+1 abolished clearing’ is false.",
          ],
          result:
            "CCP novation + margins + SGF still apply in T+1. Depositories move securities; they do not replace the CCP.",
        },
      ],
    },
    {
      heading: "Circuit breakers and F&O — what the cash market halt is not",
      body: "Index-based market-wide circuit breakers on NSE/BSE are triggered by a move in either Nifty 50 or Sensex versus the previous close, at 10%, 15% and 20%. They halt the market for a defined time, then allow a reopening procedure. Timing matters. A 10% move before 1:00 p.m. typically brings a 45-minute halt; between 1:00 p.m. and 2:30 p.m. a 15-minute halt; after 2:30 p.m. there is no 10% halt. A 15% move before 1:00 p.m. is a 1 hour 45 minute halt; 1:00–2:00 p.m. a 45-minute halt; after 2:00 p.m. trading is halted for the rest of the day. A 20% move halts trading for the remainder of the day at any time. These are not the same as stock-specific price bands (2%, 5%, 10%, 20% surveillance bands, and dynamic bands on F&O stocks).\n\nFutures and options are exchange-traded derivatives. Index contracts are cash-settled. Single-stock futures and options in India use physical settlement of the underlying (the post-2018 / 2019 reform — do not still write ‘all cash-settled stocks’). Lot size, expiry, and margins (SPAN + exposure, plus MTM on futures) are the daily machinery. Weekly expiries on index options became a retail-volume engine; after the 2024 review SEBI tightened index-derivatives risk measures (including contract-size, expiry design so that each exchange has a limited weekly expiry benchmark, and stricter expiry-day margins). Those 2024 measures remained part of the 2025 architecture; they were not a one-month experiment and not a repeal of PIT.\n\nOpen interest, put-call ratio, and rolling of positions are analysis vocabulary, not statutes. Position limits exist at client and market-wide level. A circuit filter on a cash stock is not a ‘legitimate’ way to front-run (see PFUTP). A market-wide circuit breaker is not novation. Novation is the CCP substitution of counterparties.\n\nCommodity F&O on MCX/NCDEX have their own clearing and, for some products, different regulators/history; onshore commodity derivatives exchanges are in SEBI’s securities-market perimeter after the 2015 merger of FMC into SEBI. Do not answer a cash-equity T+1 question with NCDEX options.",
      bullets: [
        "MWCB: 10 / 15 / 20% on Nifty 50 or Sensex; halt lengths depend on clock time; 20% ends the day.",
        "Stock bands (2/5/10/20% and dynamic F&O bands) ≠ index MWCB.",
        "Index F&O cash-settled; stock F&O physically settled. 2024 index-options risk package continued into 2025.",
        "FMC merged into SEBI (2015) for commodity derivatives exchanges.",
      ],
      examples: [
        {
          title: "Apply the 10% market-wide halt clock",
          prompt:
            "Nifty 50 falls 10% from the previous close at 12:10 p.m. What happens? What if the same 10% print occurs at 2:40 p.m.? What if it is a 20% fall at 12:10 p.m.?",
          steps: [
            "Identify which circuit: index market-wide 10%, not a 5% stock band.",
            "12:10 p.m. is before 1:00 p.m., so a 10% breach brings a 45-minute halt, then a reopening procedure.",
            "2:40 p.m. is after 2:30 p.m.: a 10% move does not halt the market under the standard timetable.",
            "A 20% move at any time, including 12:10 p.m., halts trading for the rest of the day — not 45 minutes.",
            "Do not apply the 15% 1h45 rule to a 10% breach. Write three answers: 45-min halt; no 10% halt; rest-of-day halt.",
          ],
          result:
            "10% at 12:10 → 45-minute MWCB halt. 10% at 2:40 → no halt. 20% at 12:10 → trading closed for the day.",
        },
        {
          title: "Stock band versus MWCB versus novation",
          prompt:
            "True or false: (i) a 5% band on a cash stock is the same as a 10% Nifty MWCB (ii) novation is the MWCB halt (iii) MWCB uses Sensex or Nifty 50 previous close.",
          steps: [
            "(i) False. Stock-specific price bands stop or limit that scrip. MWCB can halt the whole market on an index trigger.",
            "(ii) False. Novation is the clearing corporation becoming the central counterparty. It happens on ordinary days without any halt.",
            "(iii) True. Either benchmark’s 10/15/20% move versus previous close can trigger the index MWCB.",
            "March 2020 COVID crashes used these MWCB rules — a 2020-paper fact — but the timetable itself is standing exchange/SEBI architecture, not a one-year rule.",
            "If an option defines MWCB as ‘SEBI’s PIT window’, reject it. Circuit breakers are market-structure / surveillance, not insider-trading codes.",
          ],
          result:
            "(i) false (ii) false (iii) true. Bands ≠ MWCB ≠ novation ≠ PIT.",
        },
        {
          title: "F&O settlement type and the 2024–25 risk package",
          prompt:
            "Which is correct in a 2025 paper? (A) all stock options are cash-settled as in the mid-2010s (B) index derivatives are cash-settled; stock F&O are physically settled (C) the 2024 index-options measures were repealed in full in 2025 (D) those measures replaced the PIT regulations.",
          steps: [
            "Index futures/options settle in cash against the index. There is no delivery of 50 stocks on Nifty expiry.",
            "Single-stock F&O moved to physical settlement; (A) is outdated. (B) is the current design.",
            "The 2024 contract-size / weekly-expiry / expiry-margin package was still part of the 2025 risk architecture, not a closed episode and not repealed in full. (C) is false.",
            "PIT 2015 remains the insider-trading code. F&O risk measures did not repeal it. (D) is false.",
            "Weekly expiries were restricted (one benchmark weekly expiry path per exchange as designed after the review), not restored as unrestricted weeklies on every index. Pick (B).",
          ],
          result:
            "Index F&O cash-settled; stock F&O physically settled. 2024 index-options risk measures continued in 2025; they did not replace PIT.",
        },
        {
          title: "Who regulates a commodity futures exchange after 2015",
          prompt:
            "A gold futures contract on MCX and a Nifty option on NSE: who is the securities-market regulator, and why is ‘NCDEX only’ a bad option in a cash-equity T+0 question?",
          steps: [
            "Forward Markets Commission was merged into SEBI in 2015. Onshore commodity derivatives exchanges (MCX, NCDEX) are in SEBI’s perimeter.",
            "NSE index options were always in SEBI’s securities-market perimeter. Both products in the stem are therefore SEBI-regulated exchange derivatives (plus the exchange and its CCP).",
            "IFSCA would appear only if the contract were in an IFSC (for example certain GIFT products), which the stem did not say.",
            "RBI does not license MCX gold futures or Nifty options. It may still care about banks’ derivative exposures prudentially.",
            "A cash-equity T+0 question that offers ‘T+0 only for commodity options on NCDEX’ is mixing products. T+0 beta was a cash-equity optional cycle, not an NCDEX-only rule.",
          ],
          result:
            "SEBI regulates both MCX gold futures (post-2015) and NSE index options. Do not dump cash-equity T+0 onto NCDEX.",
        },
      ],
    },
    {
      heading: "G-secs versus corporate bonds, RBI tools, inflation targeting, IFSCA / GIFT City",
      body: "Government securities are Union or State liabilities. Dated G-secs and Treasury Bills (91, 182 and 364 days) are issued and managed with RBI as debt manager; State Development Loans are state paper. Trading among NDS-OM members is a G-sec market with CCIL as CCP. Credit risk is sovereign (or state), not a corporate rating story. Retail Direct is RBI’s retail access path. Corporate bonds are company (or NBFC/issuer) paper: credit risk, rating, and — if listed — SEBI’s debt-listing / LODR-type duties. Yields sit above G-secs by a credit spread. Do not say SEBI ‘issues’ G-secs or that RBI ‘registers’ a listed corporate-bond prospectus the way SEBI does.\n\nRBI’s operating toolkit for Paper 1: repo rate — RBI injects liquidity against eligible collateral (LAF). SDF (Standing Deposit Facility, 8 April 2022) — banks park surplus at RBI without collateral; it became the floor of the corridor, with reverse repo no longer the working floor. MSF (Marginal Standing Facility) is the ceiling, typically 25 basis points above repo, against excess SLR. The corridor is therefore SDF (floor) – repo (policy rate) – MSF (ceiling). CRR is the share of NDTL to be held as cash with RBI (unremunerated in the ordinary exam telling). SLR is the share to be held in eligible liquid assets (G-secs, cash, gold as specified). Open-market operations and the bank rate complete the usual list. Quoted percentages change; learn the instrument, not a stale 6.50% as if it were in the Act.\n\nFlexible inflation targeting (RBI Act amendment, 2016) gives the Monetary Policy Committee a CPI inflation target of 4% with a ±2 percentage-point band (2–6%). The MPC has six members (three from RBI including the Governor as Chair, three external). Majority vote; Governor has a casting vote. If inflation is outside the band for three consecutive quarters, RBI writes to the government. The framework was renewed for five years from 1 April 2021. SEBI does not sit on the MPC and does not set repo.\n\nIFSCA is the International Financial Services Centres Authority, constituted under the IFSCA Act, 2019, operational from 27 April 2020, headquartered at GIFT City, Gandhinagar, Gujarat. It is the unified regulator for financial products, financial services and financial institutions in an IFSC — the onshore split of RBI/SEBI/IRDAI/PFRDA is pooled for IFSC business. GIFT City is a SEZ hosting India’s IFSC, not SEBI’s Mumbai HQ and not a substitute for the SEBI Act. First Chairperson of IFSCA was Injeti Srinivas; do not confuse that with SEBI’s Buch/Pandey timeline.",
      bullets: [
        "G-secs/T-bills/SDLs: RBI/government, CCIL, sovereign/state credit. Listed corporate bonds: issuer credit + SEBI.",
        "Repo = RBI lends to banks vs collateral. SDF (Apr 2022) = uncollateralised floor. MSF = ceiling. CRR/SLR = ratios.",
        "FIT: 4% CPI ±2% (2–6%), MPC of 6, 2016 architecture. SEBI ≠ MPC.",
        "IFSCA Act 2019; HQ GIFT City, Gandhinagar; unified IFSC regulator from 27 Apr 2020.",
      ],
      examples: [
        {
          title: "G-sec or corporate bond — four statements",
          prompt:
            "True or false: (i) a 10-year Union G-sec is issued under SEBI ICDR (ii) a listed NBFC bond can be a SEBI-listed security (iii) T-bills are 91/182/364-day instruments (iv) CCIL is to G-secs roughly what a stock CCP is to equities.",
          steps: [
            "(i) False. Union G-secs are government issuance with RBI as manager, not an ICDR IPO of a company.",
            "(ii) True. The NBFC is RBI-regulated as an NBFC; the listed bond is still a security with SEBI listing/disclosure hooks.",
            "(iii) True. Those three tenors are the standard T-bill set in exam facts.",
            "(iv) True in function: CCIL is the CCP / clearing entity for the G-sec and related money-market stack; NSE Clearing/ICCL play that role in cash equities.",
            "A yield 80 bps above the G-sec for a AAA corporate is the credit spread. That spread is not ‘SEBI’s repo’.",
          ],
          result:
            "(i) false (ii) true (iii) true (iv) true. Issuance of G-secs is not ICDR; listed corporate debt still sees SEBI.",
        },
        {
          title: "Repo, SDF, CRR, SLR — who injects and who parks",
          prompt:
            "Match direction of liquidity: repo, SDF, CRR hike, SLR. Then: who sets these — SEBI or RBI?",
          steps: [
            "Repo: RBI injects rupees, bank pledges eligible securities. Policy rate in the LAF corridor.",
            "SDF (from 8 April 2022): bank parks surplus at RBI, no collateral. Floor of the corridor; this is why ‘reverse repo is always the floor’ is outdated after April 2022.",
            "CRR hike: banks must keep more cash idle at RBI — durable liquidity drain, not a bilateral overnight trade.",
            "SLR: banks must hold a slice of NDTL in eligible liquid assets (largely G-secs). A hike constrains balance-sheet room; it is not SEBI LODR.",
            "All four are RBI tools. SEBI does not set repo, SDF, CRR or SLR. If an option says ‘SEBI’s repo to brokers’, reject it.",
          ],
          result:
            "Repo injects; SDF absorbs (floor from Apr 2022); CRR/SLR are structural ratios. All RBI, never SEBI.",
        },
        {
          title: "Inflation targeting — numbers that do not move with the Chair",
          prompt:
            "The FIT target is: (A) WPI 5% with no band (B) CPI 4% with a 2–6% tolerance band, MPC of six (C) a SEBI circular on T+0 (D) the Finance Bill setting repo. What is an MPC failure?",
          steps: [
            "India’s flexible inflation target is CPI (combined) 4%, tolerance 2–6%. (B) is the architecture from the 2016 amendment and the government–RBI agreement.",
            "MPC: six members, majority, Governor’s casting vote. Three RBI (including Governor as Chair) and three external. SEBI’s Chair is not a member.",
            "Failure to meet the target is defined as inflation outside the band for three consecutive quarters, triggering a written explanation to the government — not an automatic sacking, and not a SEBI enquiry.",
            "(C) T+0 is a securities-settlement design. (D) the Finance Bill does not set the repo rate; the MPC does.",
            "Do not quote a week’s repo print as if it were in the RBI Act. The 4%±2% target is the examinable constant; the repo rate is the moving instrument.",
          ],
          result:
            "CPI 4% with 2–6% band; six-member MPC; three-quarter breach → letter to government. Repo is not in the Finance Bill; SEBI is not on the MPC.",
        },
        {
          title: "IFSCA / GIFT City versus SEBI Mumbai",
          prompt:
            "IFSCA has its headquarters at: (A) Mumbai BKC (B) GIFT City, Gandhinagar (C) New Delhi North Block (D) Hyderabad. What does ‘unified regulator’ mean, and when did the Authority become operational?",
          steps: [
            "IFSCA Act, 2019; Authority operational 27 April 2020; HQ at GIFT City, Gandhinagar, Gujarat. Pick (B).",
            "Mumbai BKC is SEBI HQ, not IFSCA HQ. North Block is Union government. Hyderabad is a distractor used in many regulator questions.",
            "Unified regulator means that, inside an IFSC, IFSCA exercises the powers that RBI, SEBI, IRDAI and PFRDA would exercise onshore for financial products, services and institutions as the IFSC law provides.",
            "GIFT City is a SEZ hosting the IFSC. It is not itself a stock exchange, and it is not a 2022 substitute for SEBI’s domestic jurisdiction over NSE cash equities.",
            "First IFSCA Chairperson Injeti Srinivas is a separate timeline from SEBI’s Tyagi → Buch (Mar 2022) → Pandey (Mar 2025). Do not mix those names.",
          ],
          result:
            "IFSCA HQ: GIFT City, Gandhinagar (IFSCA Act 2019; operational 27 Apr 2020). Unified IFSC regulator; SEBI remains the onshore securities regulator from Mumbai.",
        },
      ],
    },
  ],
};
