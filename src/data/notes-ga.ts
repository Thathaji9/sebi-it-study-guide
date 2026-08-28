import type { TopicNote } from "@/data/notes";

export const notesGa: TopicNote = {
  topic: "ga",
  title: "Financial GA — techniques (beginner)",
  blurb:
    "Ten simple techniques for financial general awareness. Who SEBI is. Who regulates what. Primary versus secondary market. How a cash-equity trade settles. What depositories do. Insider trading in one page. Mutual funds and NAV. Circuit breakers. Chairpersons by year so 2022 and 2025 never mix. RBI tools in one sentence each.",
  blocks: [
    {
      heading: "Who is SEBI",
      body: "SEBI is the Securities and Exchange Board of India. It is the statutory regulator of India’s securities market. Its own law is the SEBI Act, 1992. SEBI had existed from 12 April 1988 without that statute; 1992 gave it legal powers. Headquarters are in Mumbai (Bandra Kurla Complex), not New Delhi.\n\nSEBI’s job in plain words: protect investors in securities, help the securities market grow, and regulate that market. It registers brokers and other intermediaries, watches listed-company disclosure, runs rules against insider trading and market fraud, and oversees mutual funds, depositories, and stock exchanges.\n\nSEBI is not the central bank. It does not set the repo rate, CRR, or SLR. It does not issue Union government bonds. The Companies Act, 2013 did not create SEBI. The stock-exchange recognition law is a different Act (SCRA, 1956).",
      howTo: [
        "Ask: is this about SEBI’s own law, its city, or its job?",
        "Law: SEBI Act, 1992. City: Mumbai. Job: securities market — investors, development, regulation.",
        "Kill options that give RBI tools (repo, CRR) or New Delhi as HQ.",
        "Kill ‘created by the Companies Act’ or ‘created by the RBI Act’.",
        "If the stem mixes two statutes, pick the one that actually created the Board.",
      ],
      bullets: [
        "SEBI Act, 1992. HQ: Mumbai. Started 1988; became a statutory board in 1992.",
        "Protects investors, develops the securities market, regulates that market.",
        "Not RBI. Not MCA. Not the body that sets repo.",
      ],
      examples: [
        {
          title: "The law that created statutory SEBI",
          prompt:
            "SEBI got statutory powers under which law? (A) Companies Act, 2013 (B) SEBI Act, 1992 (C) SCRA, 1956 only (D) RBI Act, 1934.",
          steps: [
            {
              do: "Ask what the question wants: the Board’s own constitutive Act.",
              why: "Many laws touch listed companies. Only one law created SEBI as a statutory body.",
            },
            {
              do: "Drop (A), (C), and (D).",
              why: "Companies Act is company law (MCA). SCRA recognises stock exchanges. RBI Act creates the Reserve Bank.",
            },
            {
              do: "Pick (B) SEBI Act, 1992.",
              why: "1988 was non-statutory SEBI. 1992 is the statute that gave it powers.",
            },
          ],
          result: "SEBI Act, 1992. HQ is a separate fact: Mumbai.",
        },
        {
          title: "Headquarters",
          prompt:
            "SEBI’s head office is in: (A) New Delhi (B) Kolkata (C) Mumbai (D) Hyderabad.",
          steps: [
            {
              do: "Pick Mumbai.",
              why: "SEBI Bhavan is in Bandra Kurla Complex, Mumbai. That is HQ.",
            },
            {
              do: "Treat New Delhi as a trap.",
              why: "New Delhi is a regional office and a common guess because many Union bodies sit there. It is not HQ.",
            },
            {
              do: "Kolkata and Hyderabad are also not HQ.",
              why: "Kolkata is another regional office. Hyderabad is a frequent distractor in regulator questions.",
            },
          ],
          result: "(C) Mumbai. New Delhi is not SEBI HQ.",
        },
        {
          title: "What SEBI regulates — not what RBI does",
          prompt:
            "Which is a SEBI job rather than an RBI job? (A) Setting the repo rate (B) Registering stock brokers and prohibiting insider trading (C) Issuing Union government bonds (D) Fixing CRR.",
          steps: [
            {
              do: "Tick anything that is a security-market licence or a market-integrity rule.",
              why: "Brokers and insider trading sit in SEBI’s statute. That is (B).",
            },
            {
              do: "Drop repo, CRR, and Union G-secs.",
              why: "Those are RBI / government money-and-debt tools, not SEBI’s constitutive work.",
            },
            {
              do: "If an option says ‘SEBI sets repo’, reject the whole option.",
              why: "One false regulator word poisons a sentence that otherwise sounds official.",
            },
          ],
          result:
            "(B) Brokers and insider trading are SEBI. Repo, CRR, and G-sec issuance are not.",
        },
      ],
    },
    {
      heading: "Who regulates what — SEBI vs RBI vs IFSCA",
      body: "Use a decision tree. Do not guess from the brand name of the group.\n\nIs it a security, a stock exchange, a broker, a mutual fund, a listed-company filing, an FPI, or insider trading? → SEBI.\n\nIs it a bank deposit, a bank licence, payments, the repo rate, CRR, SLR, or the primary issue of Union government securities? → RBI.\n\nIs it a financial product, service, or institution inside an IFSC (GIFT City, Gandhinagar)? → IFSCA, the unified IFSC regulator (IFSCA Act, 2019).\n\nOverlaps are real. A listed NBFC answers to RBI as an NBFC and to SEBI for listing and disclosure. FDI policy sits with the government; FPI registration is still SEBI. Insurance is IRDAI. Pensions / NPS are PFRDA. If two regulators could be argued, pick the one that actually licences or conducts the activity named in the stem.",
      howTo: [
        "Name the activity in the stem, not the group’s famous parent.",
        "Securities / listing / brokers / funds / FPIs → SEBI.",
        "Banks / payments / repo / CRR / SLR / G-sec issuance → RBI.",
        "Inside GIFT City IFSC → IFSCA.",
        "If the stem has two slices (listed NBFC, IFSC unit), give two labels. Do not force one regulator for the whole group.",
      ],
      bullets: [
        "SEBI: securities market. RBI: banks and money. IFSCA: IFSC / GIFT City.",
        "Listed NBFC = RBI + SEBI. FPI registration = SEBI.",
        "Who sets repo? Always RBI. Who registers brokers? Always SEBI.",
      ],
      examples: [
        {
          title: "FPI registration",
          prompt:
            "Foreign Portfolio Investors in India are registered (for securities-market conduct) by: (A) IRDAI only (B) SEBI (C) PFRDA only (D) CCI only.",
          steps: [
            {
              do: "Name the activity: buying Indian securities as a portfolio investor.",
              why: "That is securities-market activity, so the registration certificate is SEBI’s.",
            },
            {
              do: "Drop IRDAI, PFRDA, and CCI.",
              why: "Insurance, pensions, and competition are different trees.",
            },
            {
              do: "Do not say ‘RBI registers FPIs’.",
              why: "RBI still matters for forex (FEMA), but the FPI certificate is SEBI’s.",
            },
          ],
          result: "(B) SEBI registers FPIs. FDI policy is a government lane, not IRDAI.",
        },
        {
          title: "Repo versus a stock broker",
          prompt:
            "The repo rate is the rate at which: (A) SEBI charges brokers (B) RBI lends to banks against eligible collateral (C) depositors earn on savings by statute. Follow-up: who regulates a stock broker?",
          steps: [
            {
              do: "Pick (B) for repo.",
              why: "Repo is RBI injecting rupees, with the bank giving G-sec collateral. It is not a SEBI fee.",
            },
            {
              do: "Label the broker as SEBI.",
              why: "A stock broker is a securities intermediary. RBI does not licence brokers.",
            },
            {
              do: "Write the split in the margin.",
              why: "Price of overnight secured liquidity = RBI. Licence to deal in shares for clients = SEBI.",
            },
          ],
          result: "Repo = RBI → banks against collateral. Brokers = SEBI.",
        },
        {
          title: "Listed NBFC and a GIFT City unit",
          prompt:
            "A listed deposit-taking NBFC issues a bond; the same group opens an IFSC banking unit at GIFT City. Who regulates which slice?",
          steps: [
            {
              do: "NBFC licence and deposit rules → RBI.",
              why: "Being an NBFC is a banking-system fact, even if the company is famous on NSE.",
            },
            {
              do: "Equity listing, share disclosures, listed-debt process → SEBI.",
              why: "Once shares or listed bonds are securities, SEBI’s listing rules apply.",
            },
            {
              do: "IFSC banking unit at GIFT City → IFSCA.",
              why: "Inside an IFSC, IFSCA is the unified regulator. It is not ‘just a domestic RBI branch’.",
            },
          ],
          result:
            "RBI (NBFC), SEBI (listing), IFSCA (GIFT IFSC unit). One group, three labels.",
        },
      ],
    },
    {
      heading: "Primary versus secondary market",
      body: "The primary market is where securities are born or issued again by the company: IPO, FPO, rights issue, preferential allotment, QIP. The company (or selling shareholders in some offers) puts paper into the market. Fresh capital for the company is the usual primary story.\n\nThe secondary market is where those already-issued securities trade later: NSE, BSE, and other exchanges. The company does not receive that money. You buy from another investor.\n\nAn Offer for Sale (OFS) of already-issued shares on the exchange is a sale by existing holders. It is not a fresh issue of capital, even though it uses exchange pipes. A QIP is still primary: the company issues new paper to institutions.\n\nDo not call the unofficial IPO grey market a SEBI market.",
      howTo: [
        "Ask: is new paper coming from the company (or a further issue), or are old shares changing hands?",
        "New / further issue → primary. Later exchange trade → secondary.",
        "OFS of existing shares → secondary sale, not an IPO.",
        "QIP / rights / IPO allotment of fresh capital → primary.",
        "If the company does not get the money, it is usually not a primary issue.",
      ],
      bullets: [
        "Primary: IPO / FPO / rights / QIP / preferential — paper is issued.",
        "Secondary: exchange trading of paper that already exists.",
        "OFS ≠ IPO. QIP is still primary.",
      ],
      examples: [
        {
          title: "Four instruments — primary or secondary",
          prompt:
            "Classify: (i) a company allots fresh shares in an IPO (ii) you buy those shares next week on NSE (iii) promoters sell a block via OFS (iv) the company issues new shares to QIBs in a QIP.",
          steps: [
            {
              do: "(i) IPO allotment of fresh capital → primary.",
              why: "The company is issuing paper for the first time in that offer. Issue proceeds go to the company (in a fresh issue).",
            },
            {
              do: "(ii) later NSE purchase → secondary.",
              why: "The seller is another investor. The company does not get that money.",
            },
            {
              do: "(iii) OFS → secondary sale.",
              why: "The shares already existed. Promoters (or other holders) are selling them. Not an IPO.",
            },
            {
              do: "(iv) QIP → primary further issue.",
              why: "New paper to qualified institutions, even though the company is already listed.",
            },
          ],
          result:
            "IPO and QIP are primary. Exchange purchase is secondary. OFS is a sale of existing shares.",
        },
        {
          title: "Who receives the money?",
          prompt:
            "You buy 100 shares of a listed company on BSE from another client. Who receives your money? (A) the company as IPO proceeds (B) the selling investor (through the market plumbing) (C) SEBI as a listing fee (D) RBI as CRR.",
          steps: [
            {
              do: "This is a secondary-market trade.",
              why: "The shares were already issued. You are not in an IPO allotment.",
            },
            {
              do: "Pick (B).",
              why: "The seller (via broker / clearing) gets the funds. The company is not the counterparty.",
            },
            {
              do: "Drop (A), (C), and (D).",
              why: "IPO proceeds are primary. SEBI fees and CRR are different machines.",
            },
          ],
          result:
            "(B) The selling investor. Secondary trades do not raise capital for the company.",
        },
        {
          title: "Trap: calling OFS an IPO",
          prompt:
            "True or false: an Offer for Sale of promoter shares on the exchange is the same as the company issuing a fresh IPO.",
          steps: [
            {
              do: "Mark false.",
              why: "IPO / fresh issue creates new shares (or at least raises primary capital in a public issue of new paper). OFS sells old shares.",
            },
            {
              do: "Say what OFS is: a special window to sell existing shares.",
              why: "It uses exchange infrastructure, so it looks ‘primary-like’, but the company does not receive fresh capital from those old shares.",
            },
            {
              do: "Keep QIP on the primary side if it appears in the next option.",
              why: "Students mix OFS and QIP. QIP is a further issue; OFS is not.",
            },
          ],
          result: "False. OFS is a sale of existing shares, not a fresh IPO.",
        },
      ],
    },
    {
      heading: "How a trade settles — T+1 walk-through",
      body: "Settlement is the day funds and shares actually change hands after you trade. For ordinary listed cash equity in India, the default cycle is T+1 from 27 January 2023. T is the trade date. +1 is the next settlement (business) day, not always the next calendar day.\n\nWalk-through: you buy on Monday in the regular session. If Tuesday is a working settlement day, pay-in and pay-out happen Tuesday — your demat is credited, the seller is paid. If Tuesday is a settlement holiday, completion moves to Wednesday. The trade is still a Monday trade.\n\nBefore that, cash equities ran T+2 (including in 2020). T+1 was phased through 2022 and finished market-wide on 27 January 2023. Optional T+0 from 28 March 2024 is a narrower same-day path for a limited basket. It runs beside T+1. It is not the default for every stock.\n\nA clearing corporation still sits in the middle (novation). T+1 did not abolish clearing.",
      howTo: [
        "Write T = trade date. Ask what the default cycle is for that paper’s year.",
        "For today’s default cash equity, add one settlement day (T+1).",
        "If that next day is a settlement holiday, slide to the next working settlement day.",
        "Do not call an ordinary T+1 trade ‘same-day’. Same-day is optional T+0.",
        "Keep the year labels: 2020 = T+2; 27 Jan 2023 onwards = T+1 default; Mar 2024 = optional T+0 extra path.",
      ],
      bullets: [
        "T+1 = next settlement day after the trade, from 27 January 2023 for cash equity.",
        "Holiday on T+1 slides completion; it does not re-book the trade date.",
        "Optional T+0 is extra and limited, not a replacement of T+1.",
      ],
      examples: [
        {
          title: "Monday trade, Tuesday working",
          prompt:
            "An investor buys 100 shares of a T+1 cash-equity stock on Monday. Tuesday is a working settlement day. When do shares and money normally finish moving?",
          steps: [
            {
              do: "Set T = Monday.",
              why: "That is the trade date in the regular session.",
            },
            {
              do: "Add one settlement day: Tuesday.",
              why: "T+1 means the next settlement day, which here is Tuesday.",
            },
            {
              do: "Describe Tuesday: buyer pays in funds, seller pays in shares, then pay-out credits demat and money.",
              why: "Settlement is both legs, not only the share credit.",
            },
            {
              do: "Reject ‘settled Monday itself’.",
              why: "Monday finish would be T+0, which is not the default cycle.",
            },
          ],
          result: "Tuesday. Monday trade → next settlement day under T+1.",
        },
        {
          title: "Monday trade, Tuesday holiday",
          prompt:
            "Same Monday purchase, but Tuesday is a settlement holiday and Wednesday is not. When does T+1 complete?",
          steps: [
            {
              do: "Keep T = Monday.",
              why: "A holiday does not rewrite the trade date.",
            },
            {
              do: "Skip Tuesday. Complete on Wednesday.",
              why: "T+1 counts settlement days, not raw calendar nights.",
            },
            {
              do: "Do not call it a Wednesday trade.",
              why: "The bargain was struck Monday. Only the pay-in day slid.",
            },
          ],
          result:
            "Wednesday. T+1 = next settlement day, so a Tuesday holiday pushes completion by one working day.",
        },
        {
          title: "Do not mix T+2, T+1, and T+0 years",
          prompt:
            "Match the cycle to the year: (A) 2020 default cash equity (B) market-wide default from 27 January 2023 (C) 28 March 2024 limited same-day path.",
          steps: [
            {
              do: "(A) 2020 → T+2.",
              why: "T+1 was not finished then. A 2020 paper that says ‘T+1 for every stock from 2018’ is false.",
            },
            {
              do: "(B) 27 January 2023 onwards → T+1 default.",
              why: "That is the date remaining stocks moved. 2024 and 2025 papers still treat T+1 as the default.",
            },
            {
              do: "(C) 28 March 2024 → optional T+0 beta, limited basket, beside T+1.",
              why: "It did not replace T+1 and was not mandatory for every listed stock.",
            },
          ],
          result:
            "2020 = T+2; from 27 Jan 2023 = T+1 default; Mar 2024 = optional limited T+0 extra path.",
        },
      ],
    },
    {
      heading: "Depositories — NSDL and CDSL",
      body: "A depository keeps shares in electronic (demat) form. India has two: NSDL (National Securities Depository Limited) and CDSL (Central Depository Services (India) Limited). The law is the Depositories Act, 1996. Both depositories are in Mumbai.\n\nYou do not usually walk into NSDL or CDSL yourself. You open a demat account through a Depository Participant (DP) — often a bank or a broker. The depository is the registered owner on the books; you are the beneficial owner. Units of the same share (same ISIN) are fungible: they are interchangeable balances, not unique paper certificate numbers.\n\nClearing corporations (such as NSE Clearing or ICCL) are a different layer. They stand between buyer and seller for settlement risk. Depositories then move the securities when instructed. A DP is not the company’s auditor. Depositories do not set the repo rate.",
      howTo: [
        "Ask: holding shares in demat, or guaranteeing a trade, or setting a policy rate?",
        "Demat holding → NSDL or CDSL, via a DP. Law: Depositories Act, 1996.",
        "Trade guarantee / novation → clearing corporation, not the depository.",
        "Repo → RBI, never a depository.",
        "Fungible = same-ISIN units are interchangeable book-entry amounts.",
      ],
      bullets: [
        "Two depositories: NSDL and CDSL. Access via DPs. Act: 1996.",
        "Investor = beneficial owner. Holdings of one ISIN are fungible.",
        "Depository ≠ clearing corporation ≠ RBI.",
      ],
      examples: [
        {
          title: "How an investor holds demat shares",
          prompt:
            "Which statement is accurate? (A) Investors must deal directly with NSDL/CDSL with no intermediary (B) a DP is the investor-facing agent; shares are electronic book-entry (C) a DP is the issuer’s statutory auditor (D) depositories set the repo rate.",
          steps: [
            {
              do: "Pick (B).",
              why: "The DP faces you. The depository runs the book-entry system. You are the beneficial owner.",
            },
            {
              do: "Reject (A).",
              why: "Retail investors go through registered DPs, not a walk-in counter at NSDL as the normal path.",
            },
            {
              do: "Reject (C) and (D).",
              why: "Auditors are not DPs. Repo is RBI.",
            },
          ],
          result:
            "(B). DP faces the investor; NSDL/CDSL hold the electronic record.",
        },
        {
          title: "What fungible means",
          prompt:
            "You sell 50 shares of a listed company from your demat. What did you sell? (A) 50 unique paper certificates with serial numbers (B) 50 interchangeable units of that ISIN (C) a loan from RBI (D) a mutual-fund NAV.",
          steps: [
            {
              do: "Pick (B).",
              why: "Demat units of the same ISIN are fungible. You hold a balance, not 50 labelled sheets.",
            },
            {
              do: "Reject (A) as the old physical-certificate picture.",
              why: "That is what depositories replaced.",
            },
            {
              do: "Reject (C) and (D).",
              why: "Wrong machines: money-policy and funds.",
            },
          ],
          result: "(B) Interchangeable book-entry units of the same ISIN.",
        },
        {
          title: "Depository versus clearing corporation",
          prompt:
            "After an NSE cash trade, who becomes buyer to every seller for settlement risk, and who then moves the shares in demat?",
          steps: [
            {
              do: "Clearing corporation (e.g. NSE Clearing) stands in the middle.",
              why: "That substitution is novation. One member’s default is the CCP’s problem, not a hunt for the original counterparty.",
            },
            {
              do: "NSDL or CDSL then move the securities on instructions.",
              why: "Depositories are the book-entry pipes, not the trade-guarantee layer.",
            },
            {
              do: "Do not merge the two in one option.",
              why: "Exam traps say ‘NSDL novates trades’ or ‘the DP sets margins’. Those mix layers.",
            },
          ],
          result:
            "CCP novates and manages settlement risk. Depositories credit/debit demat. Different jobs.",
        },
      ],
    },
    {
      heading: "Insider trading / PIT — one page",
      body: "Insider trading, in exam English, is trading in a company’s securities while you have unpublished price-sensitive information (UPSI) — news that can move the price and is not yet public (for example, unpublished quarterly results).\n\nThe main SEBI code is the PIT Regulations, 2015 (Prohibition of Insider Trading). Connected people (directors, officers, employees, some advisers) and often their immediate relatives sit in the net. Designated persons also face a trading window: typically closed from quarter-end until 48 hours after results. A closed-window trade can breach the code even if nobody proves a profit.\n\nYou may share UPSI only for a real work or legal need, on a need-to-know basis, with records. An oral ‘I promise not to trade’ is not a safe harbour. A private chat group is still communication.\n\nPIT is not the same as market fraud on the order book (circular trades, spoofing, front-running a client order). That is mainly PFUTP. Front-running uses the client’s coming order, not issuer UPSI. Late company disclosure of a signed material deal is mainly LODR, not PIT by itself.",
      howTo: [
        "Ask: did someone trade (or tip) on unpublished company news that can move the price? → PIT.",
        "Ask: did someone trick the market (fake volume, jump a client order)? → PFUTP, not PIT first.",
        "Ask: did the company stay silent on a material event? → LODR disclosure, not PIT first.",
        "Trading window closed for designated persons → code problem even without a proven profit.",
        "Kill ‘oral promise’ and ‘I own only 50 shares’ as defences.",
      ],
      bullets: [
        "PIT 2015: no trading on UPSI; careful communication only for a real need.",
        "Connected persons + trading window + contra-trade rules.",
        "PIT ≠ PFUTP (fraud on the market) ≠ LODR (company must tell the market).",
      ],
      examples: [
        {
          title: "CFO’s spouse before results",
          prompt:
            "A CFO’s spouse buys shares two days before quarterly results are published. Primary SEBI code? (A) PIT 2015 (B) a repo with RBI (C) Depositories Act only (D) ‘no rule because the spouse is not an employee’.",
          steps: [
            {
              do: "Name the information: unpublished results.",
              why: "That is classic UPSI.",
            },
            {
              do: "Name the people: CFO is connected / designated; spouse is usually in the immediate-relative net.",
              why: "PIT does not stop at the employee’s own trading account.",
            },
            {
              do: "Pick (A) PIT 2015.",
              why: "The fact pattern is unpublished issuer news plus a connected household trade.",
            },
          ],
          result: "(A) PIT 2015. Not repo, not ‘depositories only’, not a spouse loophole.",
        },
        {
          title: "Broker jumps a client order — not PIT first",
          prompt:
            "A broker buys for the firm’s own book seconds before placing a large client buy. Most natural label? (A) PIT because all secrets are UPSI (B) front-running / unfair trade practice (PFUTP) (C) a legitimate circuit filter (D) T+1 settlement.",
          steps: [
            {
              do: "Name the secret: the client’s coming order, not the company’s unpublished results.",
              why: "PIT needs issuer UPSI. Order-flow is a different secret.",
            },
            {
              do: "Pick (B) front-running / PFUTP.",
              why: "Trading ahead of a client to ride the impact is the textbook unfair-practice picture.",
            },
            {
              do: "Drop circuit filters and T+1.",
              why: "Those are market-structure facts, not a licence to jump a client.",
            },
          ],
          result:
            "(B) Front-running / PFUTP. Lead with PIT only if issuer UPSI is also in the stem.",
        },
        {
          title: "Sharing UPSI and the closed window",
          prompt:
            "UPSI may be shared most defensibly when: (A) the recipient promises not to trade orally (B) it is needed for a legitimate purpose or legal duty, with safeguards (C) it is posted in a private group. A designated person trades in a closed window and says ‘I did not know the result number’.",
          steps: [
            {
              do: "Pick (B) for communication.",
              why: "Need-to-know work or law, with the company’s process and records, is the PIT path. Oral promises and private groups are not.",
            },
            {
              do: "Treat the closed-window trade as a code breach.",
              why: "The window is a preventive rule. The paper does not require proof of profit or of knowing the exact number.",
            },
            {
              do: "Do not reach for PFUTP on this employee-window fact alone.",
              why: "Wrong code. Window + designated person = PIT code, not order-book fraud.",
            },
          ],
          result:
            "Share UPSI only for a real need with safeguards. Closed-window trades can breach PIT without a proven profit.",
        },
      ],
    },
    {
      heading: "Mutual funds and the NAV idea",
      body: "A mutual fund pools many investors’ money to buy a portfolio. SEBI regulates mutual funds (Mutual Funds Regulations, 1996). AMFI is the industry association, not the regulator.\n\nThree layers: Sponsor (promotes the fund house) → Trustees (oversee) → Asset Management Company or AMC (manages the money). A custodian holds securities. An RTA processes unit transactions.\n\nNAV (net asset value) per unit is (assets − liabilities) / number of units. If assets are ₹5,200 crore, liabilities ₹80 crore, and units 160 crore, NAV = (5,200 − 80) / 160 = ₹32.\n\nOpen-ended schemes issue and redeem on an ongoing basis at NAV (subject to cut-off times). Close-ended schemes do not redeem daily; liquidity is often on the exchange, at a market price that can differ from NAV.",
      howTo: [
        "Regulator first: SEBI, not AMFI.",
        "Sketch Sponsor → Trustee → AMC.",
        "NAV = (assets − liabilities) / units. Subtract before you divide.",
        "Open-ended = ongoing buy/sell at NAV. Close-ended = no daily redeem at NAV.",
        "Kill options that say ‘AMFI regulates’ or that treat NAV as a stock-exchange last-traded price of the AMC.",
      ],
      bullets: [
        "SEBI regulates; AMFI is the trade body.",
        "NAV per unit = (assets − liabilities) / units.",
        "Open-ended versus close-ended is about daily NAV flow, not about ‘safe versus unsafe’.",
      ],
      examples: [
        {
          title: "Compute NAV",
          prompt:
            "Scheme assets ₹5,200 crore, liabilities ₹80 crore, units 160 crore. NAV per unit?",
          steps: [
            {
              do: "Net assets = 5,200 − 80 = 5,120 crore.",
              why: "Liabilities come off first. Do not divide 5,200 by 160.",
            },
            {
              do: "Divide 5,120 by 160.",
              why: "NAV is net assets per unit. 5,120 / 160 = 32.",
            },
            {
              do: "Write ₹32 per unit.",
              why: "Same rupee unit as the inputs. The AMC publishes NAV; that does not make AMFI the regulator.",
            },
          ],
          result: "NAV = ₹32. Formula: (assets − liabilities) / units.",
        },
        {
          title: "Who is the regulator?",
          prompt:
            "Who regulates mutual funds in India? (A) AMFI (B) SEBI (C) NSDL (D) IFSCA for every onshore equity fund.",
          steps: [
            {
              do: "Pick (B) SEBI.",
              why: "The 1996 regulations are SEBI’s. That is the exam fact.",
            },
            {
              do: "AMFI is the association of fund houses.",
              why: "Associations lobby and run campaigns. They do not licence the industry.",
            },
            {
              do: "NSDL is a depository. IFSCA is for IFSC business.",
              why: "Wrong layer / wrong geography for a plain onshore equity fund.",
            },
          ],
          result: "(B) SEBI. AMFI ≠ regulator.",
        },
        {
          title: "Open-ended versus close-ended",
          prompt:
            "An investor wants to buy and sell units on most days at NAV. Another scheme is listed and does not redeem daily. Name the two types.",
          steps: [
            {
              do: "Daily NAV sale and repurchase → open-ended.",
              why: "That is the default retail mutual-fund shape.",
            },
            {
              do: "No daily redeem, often listed → close-ended.",
              why: "You mostly exit on the exchange, at a price that can differ from NAV.",
            },
            {
              do: "Do not say close-ended means ‘SEBI does not regulate it’.",
              why: "Both types sit under the same 1996 regulations.",
            },
          ],
          result:
            "Open-ended: ongoing NAV flow. Close-ended: typically listed, no daily NAV redeem.",
        },
      ],
    },
    {
      heading: "Circuit breakers",
      body: "A market-wide circuit breaker can halt the whole cash and derivatives market when Nifty 50 or Sensex moves 10%, 15%, or 20% from the previous close. It is an index shock brake, not a single-stock band.\n\nClock time matters. A 10% move before 1:00 p.m. typically brings a 45-minute halt. Between 1:00 p.m. and 2:30 p.m., a 10% move is a shorter (15-minute) halt. After 2:30 p.m., a 10% move does not halt the market under the standard timetable. A 20% move stops trading for the rest of the day at any time.\n\nStock-specific price bands (2%, 5%, 10%, 20% on individual shares) are a different tool. They limit one scrip. They are not the Nifty 10% market-wide halt.\n\nA circuit breaker is not novation (that is the clearing corporation becoming the central counterparty). It is not the PIT insider-trading window.",
      howTo: [
        "Ask: whole market on Nifty/Sensex, or one stock’s band?",
        "Whole market → 10 / 15 / 20% versus previous close.",
        "Read the clock: 10% before 1 p.m. ≠ 10% after 2:30 p.m. ≠ any-time 20%.",
        "Do not apply a 5% stock band rule to an index halt question.",
        "Reject options that call the halt ‘PIT’ or ‘novation’.",
      ],
      bullets: [
        "MWCB: 10%, 15%, 20% on Nifty 50 or Sensex versus previous close.",
        "20% = rest of the day. Late-day 10% = no halt.",
        "Stock bands ≠ market-wide circuit breaker.",
      ],
      examples: [
        {
          title: "10% at 12:10 versus 10% at 2:40 versus 20%",
          prompt:
            "Nifty 50 falls 10% from the previous close at 12:10 p.m. What happens? What if the same 10% print is at 2:40 p.m.? What if it is a 20% fall at 12:10 p.m.?",
          steps: [
            {
              do: "12:10 p.m. is before 1:00 p.m. → 45-minute market-wide halt on a 10% breach.",
              why: "The timetable is stricter in the morning.",
            },
            {
              do: "2:40 p.m. is after 2:30 p.m. → no 10% halt.",
              why: "A late 10% print does not stop the day under the standard 10% rule.",
            },
            {
              do: "20% at 12:10 p.m. → trading closed for the rest of the day.",
              why: "20% is the full-day brake at any hour. Do not apply the 45-minute 10% rule to it.",
            },
          ],
          result:
            "10% at 12:10 → 45-minute halt. 10% at 2:40 → no halt. 20% at 12:10 → closed for the day.",
        },
        {
          title: "Stock band is not MWCB",
          prompt:
            "True or false: (i) a 5% band on one cash stock is the same as a 10% Nifty market-wide halt (ii) market-wide circuits use Sensex or Nifty 50 versus previous close.",
          steps: [
            {
              do: "(i) False.",
              why: "A stock band limits that scrip. MWCB can halt the whole market on an index trigger.",
            },
            {
              do: "(ii) True.",
              why: "Either benchmark’s 10/15/20% move versus previous close can trigger the index halt.",
            },
            {
              do: "If an option defines MWCB as ‘SEBI’s PIT window’, reject it.",
              why: "Circuit breakers are market-structure / surveillance, not insider-trading codes.",
            },
          ],
          result: "(i) false (ii) true. Bands ≠ market-wide circuit breaker ≠ PIT.",
        },
        {
          title: "Not novation",
          prompt:
            "A student writes: ‘The 10% Nifty halt is novation.’ Fix the sentence in beginner words.",
          steps: [
            {
              do: "Define the halt: a pause (or close) of trading after a large index move.",
              why: "That is the circuit breaker.",
            },
            {
              do: "Define novation: the clearing corporation becomes buyer to every seller and seller to every buyer.",
              why: "That happens on ordinary days. It is not a halt.",
            },
            {
              do: "Write: ‘The 10% Nifty halt is a market-wide circuit breaker, not novation.’",
              why: "Two different pipes. Mixing them is a common trap option.",
            },
          ],
          result:
            "Circuit breaker = trading halt on a big index move. Novation = CCP substitution. Not the same.",
        },
      ],
    },
    {
      heading: "Chairpersons — keep the years apart",
      body: "Do not treat ‘who is SEBI Chairperson?’ as a timeless fact. The correct name depends on the paper’s year.\n\nAjay Tyagi was Chairperson from 1 March 2017 until 28 February 2022. For a 2020 paper, Tyagi is the answer. Buch and Pandey had not yet taken charge.\n\nMadhabi Puri Buch took charge on 1 March 2022 (SEBI’s first woman Chairperson) and served until 28 February 2025. For 2022 after 1 March, 2023, and all of calendar 2024, Buch is the Chairperson. Do not back-date Pandey into 2024.\n\nTuhin Kanta Pandey assumed charge on 1 March 2025. For a 2025 paper, Pandey is the Chairperson. Buch did not start a second consecutive term. Shaktikanta Das was RBI Governor in that era, not SEBI Chair.\n\nWrite the labels: Tyagi until Feb 2022 · Buch Mar 2022–Feb 2025 · Pandey from Mar 2025.",
      howTo: [
        "Read the question’s year (or the date in the stem) before you name anyone.",
        "Until 28 Feb 2022 → Tyagi. 1 Mar 2022–28 Feb 2025 → Buch. From 1 Mar 2025 → Pandey.",
        "Kill RBI Governor names in a SEBI Chair question.",
        "Kill ‘Buch throughout 2025’ and ‘Pandey in 2022’.",
        "First woman Chairperson attaches to Buch (March 2022), not to a later Chair.",
      ],
      bullets: [
        "Tyagi: Mar 2017 – Feb 2022 (correct for 2020).",
        "Buch: Mar 2022 – Feb 2025; first woman Chairperson (correct for 2024).",
        "Pandey: from Mar 2025 (correct for 2025 papers).",
      ],
      examples: [
        {
          title: "2020-cycle Chairperson",
          prompt:
            "Who was SEBI Chairperson during the 2020 Grade A cycle? (A) Ajay Tyagi (B) Madhabi Puri Buch (C) Tuhin Kanta Pandey (D) Shaktikanta Das.",
          steps: [
            {
              do: "Place 2020 inside Tyagi’s term (Mar 2017–Feb 2022).",
              why: "The recruitment year sits before Buch took charge.",
            },
            {
              do: "Drop Buch (2022) and Pandey (2025).",
              why: "Later chairs cannot be imported into a 2020 paper.",
            },
            {
              do: "Drop Das.",
              why: "He was RBI Governor, not SEBI Chair.",
            },
          ],
          result: "(A) Ajay Tyagi. 2020 → Tyagi, not Buch or Pandey.",
        },
        {
          title: "Calendar year 2024",
          prompt:
            "Who was SEBI Chairperson through calendar year 2024? (A) Ajay Tyagi (B) Tuhin Kanta Pandey (C) Madhabi Puri Buch (D) Shaktikanta Das.",
          steps: [
            {
              do: "Tyagi had left in February 2022.",
              why: "He is not a 2024 fact.",
            },
            {
              do: "Pandey took charge only on 1 March 2025.",
              why: "He cannot be the 2024 Chair. Do not back-date him.",
            },
            {
              do: "Pick Buch. Drop Das.",
              why: "Buch’s term ran 1 March 2022 through 28 February 2025, covering all of 2024. Das is RBI.",
            },
          ],
          result: "(C) Madhabi Puri Buch through 2024. Pandey is a 2025 fact.",
        },
        {
          title: "1 March 2025",
          prompt:
            "Who assumed charge as SEBI Chairperson on 1 March 2025? (A) Madhabi Puri Buch, second consecutive term (B) Ajay Tyagi (C) Tuhin Kanta Pandey (D) Shaktikanta Das.",
          steps: [
            {
              do: "Buch’s term ended 28 February 2025.",
              why: "She did not begin a second consecutive term the next day. (A) is false.",
            },
            {
              do: "Tyagi did not return. Das was never SEBI Chair.",
              why: "Old name and wrong regulator.",
            },
            {
              do: "Pick Tuhin Kanta Pandey from 1 March 2025.",
              why: "That is the 2025 label. Pair it: Buch until Feb 2025; Pandey from Mar 2025.",
            },
          ],
          result:
            "(C) Tuhin Kanta Pandey from 1 March 2025. Buch’s term had already ended.",
        },
      ],
    },
    {
      heading: "RBI tools — repo, CRR, SLR",
      body: "Learn each tool as one sentence. Do not mix them with SEBI.\n\nRepo: the repo rate is the rate at which RBI lends rupees to banks against eligible collateral (usually government securities) to inject short-term liquidity.\n\nCRR (cash reserve ratio): the share of a bank’s deposits (NDTL) that it must keep as cash with RBI. That cash is not lent out. A CRR hike drains liquidity.\n\nSLR (statutory liquidity ratio): the share of deposits a bank must hold in eligible safe liquid assets — mainly government securities, and as the rules allow, cash and gold. SLR is not a SEBI listing rule.\n\nSEBI does not set repo, CRR, or SLR. Quoted percentages change; learn the instrument, not a stale number as if it were in the Act.",
      howTo: [
        "Read the stem: lending against collateral, cash parked at RBI, or a slice in G-secs?",
        "Against collateral, RBI → banks → repo.",
        "Cash balance at RBI as a ratio of deposits → CRR.",
        "Mandatory slice in eligible liquid assets (mostly G-secs) → SLR.",
        "If the option says SEBI sets any of the three, it is wrong.",
      ],
      bullets: [
        "Repo: RBI lends to banks against collateral (liquidity in).",
        "CRR: cash with RBI as a share of deposits (cannot be lent).",
        "SLR: share of deposits in eligible liquid assets, mainly G-secs.",
      ],
      examples: [
        {
          title: "One sentence each",
          prompt:
            "Match in one line: repo, CRR, SLR. Who sets all three?",
          steps: [
            {
              do: "Repo: RBI lends to banks against eligible securities at the repo rate.",
              why: "That is liquidity injection, collateralised. Direction: rupees out from RBI to banks.",
            },
            {
              do: "CRR: banks must keep a stated share of deposits as cash with RBI.",
              why: "That cash is idle at the central bank. A hike is a drain, not an overnight reverse trade.",
            },
            {
              do: "SLR: banks must keep a stated share of deposits in eligible liquid assets, mostly G-secs.",
              why: "It constrains what the balance sheet can do. It is not LODR and not a SEBI circuit.",
            },
            {
              do: "Label the setter: RBI for all three.",
              why: "SEBI does not run monetary-policy ratios.",
            },
          ],
          result:
            "Repo = collateralised RBI lending to banks. CRR = cash at RBI. SLR = liquid-asset slice. All RBI.",
        },
        {
          title: "Direction of liquidity",
          prompt:
            "A CRR hike and a repo operation (RBI lending) — which injects liquidity into banks, and which drains it?",
          steps: [
            {
              do: "Repo lending injects.",
              why: "RBI gives rupees (against collateral). Banks have more cash to work with in the short run.",
            },
            {
              do: "A CRR hike drains.",
              why: "A bigger slice of deposits must sit as cash at RBI, so less can be lent.",
            },
            {
              do: "Do not call CRR ‘SEBI’s listing ratio’.",
              why: "Wrong regulator and wrong instrument family.",
            },
          ],
          result: "Repo lending injects. CRR hike drains. Both are RBI tools.",
        },
        {
          title: "Trap: SEBI’s repo to brokers",
          prompt:
            "True or false: SEBI sets the repo rate that brokers pay to trade on NSE.",
          steps: [
            {
              do: "Mark false.",
              why: "Repo in Paper 1 is RBI’s collateralised lending to banks, not a SEBI brokerage tariff.",
            },
            {
              do: "Brokers are SEBI-registered intermediaries.",
              why: "That licence fact does not move repo from RBI to SEBI.",
            },
            {
              do: "If an option mixes ‘SEBI’s repo’ with a true broker sentence, reject it.",
              why: "One wrong regulator word is enough.",
            },
          ],
          result:
            "False. Repo is RBI → banks against collateral. Brokers are SEBI, but they do not set repo.",
        },
      ],
    },
  ],
};
