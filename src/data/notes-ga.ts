import type { TopicNote } from "@/data/notes";

export const notesGa: TopicNote = {
  topic: "ga",
  title: "Financial GA — simple notes",
  blurb:
    "Class-10 class notes on the securities market, plus five tiny examples per topic. Pictures first: umpire, ticket window, locker-bank, secret exam paper, fuse. Then the exam rule.",
  blocks: [
    {
      heading: "Who is SEBI",
      body: "Picture SEBI as the umpire on the share-market field. The umpire does not print rupees or set the repo rate — that is RBI, the money printer and the banks’ bank. SEBI watches brokers, listed companies, mutual funds, depositories, and stock exchanges so the game stays fair for investors.\n\nExam rule: SEBI is the Securities and Exchange Board of India. Its own law is the SEBI Act, 1992. It existed from 12 April 1988 without that statute; 1992 gave it legal powers. Headquarters are in Mumbai (Bandra Kurla Complex), not New Delhi. Its job is to protect investors in securities, help the securities market grow, and regulate that market. The Companies Act, 2013 did not create SEBI. SCRA, 1956 is the stock-exchange recognition law, not SEBI’s own Act.",
      howTo: [
        "Ask: is this about SEBI’s own law, its city, or its job?",
        "Law: SEBI Act, 1992. City: Mumbai. Job: protect, develop, and regulate the securities market.",
        "Drop options that give RBI tools (repo, CRR, SLR) or New Delhi as HQ.",
        "Drop ‘created by the Companies Act’ or ‘created by the RBI Act’.",
        "If two laws appear, pick the one that actually made SEBI a statutory board.",
      ],
      bullets: [
        "SEBI Act, 1992. HQ: Mumbai. Started 1988; became a statutory board in 1992.",
        "Three jobs: protect investors, develop the market, regulate the market.",
        "SEBI is the umpire. RBI is the money printer. Do not swap them.",
        "Not MCA. Not the body that sets repo, CRR, or SLR.",
        "New Delhi is a regional office, not HQ.",
      ],
      examples: [
        {
          title: "The law that created statutory SEBI",
          prompt:
            "SEBI got statutory powers under which law? (A) Companies Act, 2013 (B) SEBI Act, 1992 (C) SCRA, 1956 only (D) RBI Act, 1934.",
          steps: [
            {
              do: "Ask what the question wants: SEBI’s own law.",
              why: "Many laws mention listed companies. Only one law made SEBI a statutory board.",
            },
            {
              do: "Drop (A), (C), and (D).",
              why: "Companies Act is company law (MCA). SCRA recognises stock exchanges. RBI Act creates the Reserve Bank.",
            },
            {
              do: "Pick (B) SEBI Act, 1992.",
              why: "1988 was SEBI without its own Act. 1992 is the statute that gave it powers.",
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
              why: "New Delhi is a regional office. Many Union bodies sit there, so people guess it. It is not HQ.",
            },
            {
              do: "Kolkata and Hyderabad are also not HQ.",
              why: "Kolkata is another regional office. Hyderabad is a common wrong city in regulator questions.",
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
              do: "Tick anything that is a share-market licence or a fair-play rule.",
              why: "Brokers and insider trading sit in SEBI’s law. That is (B).",
            },
            {
              do: "Drop repo, CRR, and Union G-secs.",
              why: "Those are RBI / government money-and-debt tools, not SEBI’s work.",
            },
            {
              do: "If an option says ‘SEBI sets repo’, reject the whole option.",
              why: "One wrong referee word spoils a sentence that otherwise sounds official.",
            },
          ],
          result:
            "(B) Brokers and insider trading are SEBI. Repo, CRR, and G-sec issuance are not.",
        },
        {
          title: "1988 start versus 1992 statute",
          prompt:
            "True or false, and fix the false line: (i) SEBI existed from 12 April 1988 (ii) it became a statutory board under the Companies Act, 2013 (iii) its own law is the SEBI Act, 1992.",
          steps: [
            {
              do: "Mark (i) true.",
              why: "SEBI was set up on 12 April 1988, still without its own Act.",
            },
            {
              do: "Mark (ii) false.",
              why: "The Companies Act is company law under MCA. It did not create SEBI.",
            },
            {
              do: "Mark (iii) true.",
              why: "1992 is the statute that gave the Board legal powers.",
            },
            {
              do: "Write the fix for (ii): became statutory under the SEBI Act, 1992.",
              why: "One own Act. Do not swap in SCRA or the RBI Act either.",
            },
            {
              do: "If a follow-up asks HQ, answer Mumbai, not New Delhi.",
              why: "City and statute are two different facts. Do not mix them in one blank.",
            },
            {
              do: "If a follow-up says ‘created by SCRA, 1956’, reject it.",
              why: "SCRA recognises stock exchanges. It is not SEBI’s own law.",
            },
          ],
          result:
            "(i) true (1988). (ii) false — not the Companies Act. (iii) true — SEBI Act, 1992.",
        },
        {
          title: "Three jobs in the SEBI Act, not money-policy tools",
          prompt:
            "SEBI’s statutory job is to: (A) set CRR and issue Union G-secs (B) protect investors in securities, develop the securities market, and regulate that market (C) licence banks and run RTGS (D) sit in New Delhi as the central bank.",
          steps: [
            {
              do: "Recall the three-part job: protect, develop, regulate the securities market.",
              why: "That is the plain reading of SEBI’s own Act. Pick (B).",
            },
            {
              do: "Drop (A).",
              why: "CRR and Union G-secs are RBI / government money-and-debt tools.",
            },
            {
              do: "Drop (C).",
              why: "Bank licences and RTGS are RBI payment-and-banking work.",
            },
            {
              do: "Drop (D).",
              why: "SEBI HQ is Mumbai. SEBI is not the central bank. New Delhi is a regional office, not HQ.",
            },
            {
              do: "If an option keeps the three jobs but adds ‘and sets the repo rate’, reject the whole option.",
              why: "One false referee word spoils an otherwise official sentence.",
            },
            {
              do: "Write a margin split: securities market → SEBI; banks and rupees → RBI.",
              why: "That split also answers ‘who registers brokers’ versus ‘who sets SLR’.",
            },
          ],
          result:
            "(B) Protect, develop, regulate the securities market. Not CRR, not repo, not New Delhi as HQ.",
        },
      ],
    },
    {
      heading: "Who regulates what — SEBI vs RBI vs IFSCA",
      body: "Picture different games with different referees. Share-market play — brokers, listed companies, mutual funds, insider trading — goes to the SEBI umpire. Bank money, cash ratios, and government-bond issue go to RBI, the money printer. A shop inside GIFT City (an IFSC) goes to IFSCA.\n\nExam rule: security, stock exchange, broker, mutual fund, listed-company filing, FPI, or insider trading → SEBI. Bank deposit, bank licence, payments, repo, CRR, SLR, or primary issue of Union government securities → RBI. A product, service, or institution inside an IFSC (GIFT City, Gandhinagar) → IFSCA, the unified IFSC regulator (IFSCA Act, 2019). A listed NBFC answers to RBI as an NBFC and to SEBI for listing and disclosure. FDI policy sits with the government; FPI registration is still SEBI. Insurance is IRDAI. Pensions / NPS are PFRDA. If two referees could be argued, pick the one that actually licences the activity named in the question.",
      howTo: [
        "Name the activity in the question, not the group’s famous parent.",
        "Securities / listing / brokers / funds / FPIs → SEBI.",
        "Banks / payments / repo / CRR / SLR / G-sec issuance → RBI.",
        "Inside GIFT City IFSC → IFSCA.",
        "If the stem has two slices (listed NBFC, IFSC unit), give two labels. Do not force one referee for the whole group.",
      ],
      bullets: [
        "SEBI: securities market. RBI: banks and money. IFSCA: IFSC / GIFT City.",
        "Listed NBFC = RBI + SEBI. FPI registration = SEBI.",
        "Who sets repo? Always RBI. Who registers brokers? Always SEBI.",
        "Insurance → IRDAI. Pensions / NPS → PFRDA. FDI policy → government.",
        "IFSCA’s own law is the IFSCA Act, 2019.",
      ],
      examples: [
        {
          title: "FPI registration",
          prompt:
            "Foreign Portfolio Investors in India are registered (for securities-market conduct) by: (A) IRDAI only (B) SEBI (C) PFRDA only (D) CCI only.",
          steps: [
            {
              do: "Name the activity: buying Indian securities as a portfolio investor.",
              why: "That is share-market activity, so the registration certificate is SEBI’s.",
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
        {
          title: "GIFT City IFSC is IFSCA, not a second SEBI HQ",
          prompt:
            "A broker-dealer unit inside GIFT City IFSC is licensed for that IFSC business by: (A) SEBI only, because all brokers are always SEBI (B) IFSCA (C) IRDAI (D) PFRDA.",
          steps: [
            {
              do: "Name the place: inside an IFSC (GIFT City, Gandhinagar).",
              why: "Place beats the brand word broker. Inside IFSC → IFSCA.",
            },
            {
              do: "Pick (B) IFSCA.",
              why: "IFSCA is the unified IFSC regulator under the IFSCA Act, 2019.",
            },
            {
              do: "Drop (A)’s always.",
              why: "A domestic NSE broker is SEBI. The same group’s IFSC unit is not ‘just SEBI by habit’.",
            },
            {
              do: "Drop IRDAI and PFRDA.",
              why: "Insurance and pensions / NPS are different trees unless the stem names those products.",
            },
            {
              do: "Do not write ‘RBI regulates every GIFT banking word, so IFSCA is fake’.",
              why: "IFSC banking units sit under IFSCA as the unified IFSC regulator, not as a domestic RBI branch with another name.",
            },
            {
              do: "If the next line names a domestic NSE cash trade by the parent, label that slice SEBI.",
              why: "One group can have two labels. Do not force one referee for the whole brand.",
            },
          ],
          result:
            "(B) IFSCA for the IFSC unit. Domestic securities still SEBI; do not mix IRDAI or PFRDA.",
        },
        {
          title: "IRDAI, PFRDA, and FDI are not FPI registration",
          prompt:
            "Match: (i) insurance company licence (ii) NPS / pension fund regulation (iii) FPI certificate to buy listed Indian securities (iv) FDI policy. Options mix IRDAI, PFRDA, SEBI, and the government.",
          steps: [
            {
              do: "(i) insurance licence → IRDAI.",
              why: "Insurance is not a SEBI broker licence and not an RBI bank licence.",
            },
            {
              do: "(ii) NPS / pensions → PFRDA.",
              why: "Pension Fund Regulatory and Development Authority is the pension tree.",
            },
            {
              do: "(iii) FPI certificate → SEBI.",
              why: "Buying listed securities as a portfolio investor is share-market conduct. FEMA/RBI still matter for forex, but the FPI registration is SEBI’s.",
            },
            {
              do: "(iv) FDI policy → the government (exam English: government / DPIIT path), not IRDAI.",
              why: "Foreign direct investment rules are not a stock-broker licence.",
            },
            {
              do: "Reject ‘CCI registers FPIs’ and ‘PFRDA sets repo’.",
              why: "Competition and pensions are different trees. Repo stays with RBI.",
            },
            {
              do: "Write one line: activity in the stem, not the group’s famous parent.",
              why: "A bank-promoted fund is still a mutual fund under SEBI if the stem is the scheme.",
            },
          ],
          result:
            "IRDAI insurance; PFRDA pensions; SEBI FPI certificate; government FDI policy. Repo stays RBI.",
        },
      ],
    },
    {
      heading: "Primary versus secondary market",
      body: "Picture a first-day ticket window. The company selling new shares is that window: fresh tickets, and the theatre keeps the money. The secondary market is people reselling used tickets in the street. The theatre does not get that cash.\n\nExam rule: the primary market is where securities are born or issued again by the company — IPO, FPO, rights issue, preferential allotment, QIP. Fresh capital for the company is the usual primary story. The secondary market is where those already-issued securities trade later on NSE, BSE, and other exchanges. An Offer for Sale (OFS) of already-issued shares is a sale by existing holders, not a fresh issue, even though it uses exchange pipes. A QIP is still primary: the company issues new paper to institutions. Do not call the unofficial IPO grey market a SEBI market.",
      howTo: [
        "Ask: is new paper coming from the company, or are old shares changing hands?",
        "New / further issue → primary. Later exchange trade → secondary.",
        "OFS of existing shares → secondary sale, not an IPO.",
        "QIP / rights / IPO allotment of fresh capital → primary.",
        "If the company does not get the money, it is usually not a primary issue.",
      ],
      bullets: [
        "Primary = first-day ticket window. Company issues paper (IPO / FPO / rights / QIP / preferential).",
        "Secondary = used tickets. Exchange trading of paper that already exists.",
        "OFS ≠ IPO. QIP is still primary.",
        "If the company does not receive the cheque, it is usually secondary.",
        "The unofficial IPO grey market is not a SEBI-recognised exchange.",
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
              why: "The seller (via broker / clearing) gets the funds. The company is not the other side of the trade.",
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
              why: "It uses exchange pipes, so it looks ‘primary-like’, but the company does not receive fresh capital from those old shares.",
            },
            {
              do: "Keep QIP on the primary side if it appears in the next option.",
              why: "Students mix OFS and QIP. QIP is a further issue; OFS is not.",
            },
          ],
          result: "False. OFS is a sale of existing shares, not a fresh IPO.",
        },
        {
          title: "Rights and preferential are primary; later NSE trade is not",
          prompt:
            "Classify: (i) a listed company offers new shares to existing holders in a rights issue (ii) it allots new shares to a selected person in a preferential issue (iii) you buy those shares two months later on NSE.",
          steps: [
            {
              do: "(i) rights issue of new shares → primary.",
              why: "The company issues paper. Fresh capital usually comes in. Existing holders get the offer, but it is still an issue, not an exchange trade.",
            },
            {
              do: "(ii) preferential allotment of new shares → primary.",
              why: "New paper to a chosen buyer. Same test: is paper being issued?",
            },
            {
              do: "(iii) later NSE purchase → secondary.",
              why: "The shares already exist. You pay another investor, not the company.",
            },
            {
              do: "Do not call a rights issue an OFS.",
              why: "OFS sells old shares. Rights create (or issue) new ones.",
            },
            {
              do: "If bonus shares appear in a later option, they are not a cash IPO.",
              why: "A bonus capitalises reserves. It does not bring in fresh subscription money like an IPO.",
            },
            {
              do: "Repeat the money test: does the company receive this cheque?",
              why: "Yes for a fresh rights or preferential issue. No for the later NSE trade.",
            },
          ],
          result:
            "Rights and preferential issues of new shares are primary. The later NSE buy is secondary.",
        },
        {
          title: "FPO is still primary; the unofficial grey market is not a SEBI market",
          prompt:
            "True or false: (i) a further public offer of fresh shares is primary (ii) the unofficial IPO grey market is a SEBI-recognised exchange (iii) buying in that grey book is the same as allotment in the IPO.",
          steps: [
            {
              do: "(i) True. An FPO of new shares is a further issue.",
              why: "The company puts paper out again. That is still the primary market.",
            },
            {
              do: "(ii) False. The unofficial grey market is not a SEBI-recognised stock exchange.",
              why: "NSE and BSE are recognised markets. A kerb premium book is not.",
            },
            {
              do: "(iii) False. Grey-market chat is not IPO allotment.",
              why: "Allotment is the primary issue. A side bet on the listing premium does not issue the share.",
            },
            {
              do: "If the stem says selling shareholders in an offer for sale in the IPO document, split the money.",
              why: "Fresh issue proceeds go to the company. OFS proceeds go to selling holders. Both can sit in one offer document.",
            },
            {
              do: "Keep QIP on the primary side if it appears next.",
              why: "QIP is a further issue to institutions, not a grey-market trade.",
            },
            {
              do: "Write: recognised secondary market = exchange. Unofficial grey book ≠ that market.",
              why: "Do not call the grey market ‘SEBI’s primary market’.",
            },
          ],
          result:
            "(i) true (FPO of fresh shares is primary). (ii) false. (iii) false. Grey market ≠ IPO allotment.",
        },
      ],
    },
    {
      heading: "How a trade settles — T+1 walk-through",
      body: "Picture this clock: you trade today, and the money and the shares swap on the next working day. That is T+1. T is the trade date. +1 is the next settlement day — not always the next calendar day, because Sundays and holidays do not count.\n\nExam rule: for ordinary listed cash equity in India, the default cycle is T+1 from 27 January 2023. Walk-through: you buy on Monday in the regular session; if Tuesday is a working settlement day, pay-in and pay-out happen Tuesday. If Tuesday is a settlement holiday, completion moves to Wednesday; the trade is still a Monday trade. Before that, cash equities ran T+2 (including in 2020). T+1 was phased through 2022 and finished market-wide on 27 January 2023. Optional T+0 from 28 March 2024 is a narrower same-day path for a limited basket. It runs beside T+1. It is not the default for every stock. A clearing corporation still sits in the middle (novation). T+1 did not abolish clearing.",
      howTo: [
        "Write T = trade date. Ask what the default cycle is for that paper’s year.",
        "For today’s default cash equity, add one settlement day (T+1).",
        "If that next day is a settlement holiday, slide to the next working settlement day.",
        "Do not call an ordinary T+1 trade ‘same-day’. Same-day is optional T+0.",
        "Keep the year labels: 2020 = T+2; 27 Jan 2023 onwards = T+1 default; Mar 2024 = optional T+0 extra path.",
      ],
      bullets: [
        "T+1 = trade today, money and shares swap next working (settlement) day.",
        "Default cash equity from 27 January 2023.",
        "A holiday on T+1 slides completion; it does not rewrite the trade date.",
        "2020 default was still T+2. Optional T+0 from 28 March 2024 is extra and limited.",
        "The clearing corporation still stands in the middle. T+1 did not abolish it.",
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
        {
          title: "Friday trade, weekend is not a settlement day",
          prompt:
            "An investor buys a T+1 cash-equity stock in the regular session on Friday. Saturday and Sunday are not settlement days. When do shares and money normally finish moving?",
          steps: [
            {
              do: "Set T = Friday.",
              why: "That is the trade date in the regular session.",
            },
            {
              do: "Ask what the next settlement day is. Skip Saturday and Sunday.",
              why: "T+1 counts settlement (working) days, not raw calendar nights.",
            },
            {
              do: "Complete on Monday if Monday is a working settlement day.",
              why: "Friday + next settlement day = Monday in a normal week.",
            },
            {
              do: "Reject ‘settled Friday evening’ and ‘settled Saturday’.",
              why: "Friday finish would be T+0. Saturday is not a cash-equity settlement day in this picture.",
            },
            {
              do: "Do not call it a Monday trade.",
              why: "The bargain was struck Friday. Only pay-in slid to the next working day.",
            },
            {
              do: "If Monday is also a settlement holiday, slide again to Tuesday.",
              why: "Same holiday rule as a Tuesday holiday after a Monday trade.",
            },
          ],
          result:
            "Monday (if it is a working settlement day). Friday trade → next settlement day under T+1, not Saturday.",
        },
        {
          title: "Optional T+0 is extra; clearing is not abolished",
          prompt:
            "True or false: (i) from 28 March 2024, every listed stock must settle the same day (ii) T+1 remains the default cash-equity cycle (iii) T+1 removed the clearing corporation.",
          steps: [
            {
              do: "(i) False. March 2024 began an optional T+0 path for a limited basket.",
              why: "It was not mandatory for every listed stock and did not replace T+1.",
            },
            {
              do: "(ii) True. T+1 is still the default from 27 January 2023.",
              why: "Optional T+0 runs beside T+1. Default and extra path are two labels.",
            },
            {
              do: "(iii) False. A clearing corporation still sits in the middle (novation).",
              why: "Faster settlement did not abolish the CCP. T+1 is a clock, not a new legal counterparty.",
            },
            {
              do: "If the stem says ‘initially 25 stocks’, keep 25. Do not write 250.",
              why: "The first basket size is a load-bearing number. Inflating it is a GA fault.",
            },
            {
              do: "If the stem is a 2020 paper, do not import T+1 as already universal.",
              why: "2020 default cash equity was still T+2.",
            },
            {
              do: "Write the year strip: 2020 T+2 · 27 Jan 2023 T+1 default · Mar 2024 optional limited T+0.",
              why: "Mixing the three clocks is the usual trap.",
            },
          ],
          result:
            "(i) false (ii) true (iii) false. T+0 extra and limited; T+1 default; CCP still novates.",
        },
      ],
    },
    {
      heading: "Depositories — NSDL and CDSL",
      body: "Picture a locker-bank for shares. You do not keep paper certificates in a drawer. The depository holds electronic (demat) balances, the way a bank holds rupees in an account, not coins in your pocket.\n\nExam rule: India has two depositories — NSDL (National Securities Depository Limited) and CDSL (Central Depository Services (India) Limited). The law is the Depositories Act, 1996. Both are in Mumbai. You open a demat account through a Depository Participant (DP), often a bank or a broker. The depository is the registered owner on the books; you are the beneficial owner. Units of the same share (same ISIN) are fungible: interchangeable balances, not unique paper serial numbers. Clearing corporations (such as NSE Clearing or ICCL) are a different layer: they stand between buyer and seller for settlement risk. Depositories then move the securities when instructed. A DP is not the company’s auditor. Depositories do not set the repo rate.",
      howTo: [
        "Ask: holding shares in demat, or guaranteeing a trade, or setting a policy rate?",
        "Demat holding → NSDL or CDSL, via a DP. Law: Depositories Act, 1996.",
        "Trade guarantee / novation → clearing corporation, not the depository.",
        "Repo → RBI, never a depository.",
        "Fungible = same-ISIN units are interchangeable book-entry amounts.",
      ],
      bullets: [
        "Depository = locker-bank for shares. Two names: NSDL and CDSL. Both in Mumbai.",
        "Access via a DP. Law: Depositories Act, 1996.",
        "Investor = beneficial owner. Depository = registered owner.",
        "Holdings of one ISIN are fungible (interchangeable balances).",
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
              why: "That substitution is novation. One member’s default is the CCP’s problem, not a hunt for the original other side.",
            },
            {
              do: "NSDL or CDSL then move the securities on instructions.",
              why: "Depositories are the locker-bank pipes, not the trade-guarantee layer.",
            },
            {
              do: "Do not merge the two in one option.",
              why: "Exam traps say ‘NSDL novates trades’ or ‘the DP sets margins’. Those mix layers.",
            },
          ],
          result:
            "CCP novates and manages settlement risk. Depositories credit/debit demat. Different jobs.",
        },
        {
          title: "Two depositories, 1996 Act, Mumbai",
          prompt:
            "Pick the accurate set: (A) One depository in New Delhi under the RBI Act, 1934 (B) NSDL and CDSL, Depositories Act, 1996, both in Mumbai (C) NSDL only, Companies Act, 2013 (D) CDSL sets the repo rate.",
          steps: [
            {
              do: "Count the depositories: two — NSDL and CDSL.",
              why: "There is not a single national depository as the whole answer. Both names matter.",
            },
            {
              do: "Name the law: Depositories Act, 1996.",
              why: "Not the RBI Act and not the Companies Act as the depository’s own statute.",
            },
            {
              do: "Name the city: both depositories are in Mumbai.",
              why: "Same city trap as SEBI HQ. New Delhi is the wrong default guess.",
            },
            {
              do: "Drop (D). Repo is RBI.",
              why: "A depository does not set policy rates.",
            },
            {
              do: "Drop (A) and (C) as mixed laws and a missing second depository.",
              why: "One false statute or one missing name fails the set.",
            },
            {
              do: "Add the access path: you go through a DP, not a walk-in NSDL counter as the normal retail path.",
              why: "That is the next sentence if the option says ‘no intermediary’.",
            },
          ],
          result:
            "(B) NSDL and CDSL; Depositories Act, 1996; Mumbai. Not repo, not New Delhi HQ.",
        },
        {
          title: "Beneficial owner versus registered owner",
          prompt:
            "In a demat holding, who is the beneficial owner, and who is usually the registered owner on the issuer’s books? (A) investor beneficial; depository registered (B) DP beneficial; RBI registered (C) clearing corporation beneficial; SEBI registered (D) AMC beneficial; AMFI registered.",
          steps: [
            {
              do: "Pick (A).",
              why: "You own the economic rights (beneficial owner). The depository is the registered owner on the company’s register.",
            },
            {
              do: "Drop (B). A DP is the investor-facing agent, not the beneficial owner of your shares.",
              why: "The DP opens the account. It does not become you. RBI is not on the share register.",
            },
            {
              do: "Drop (C). The CCP novates trades; it is not your standing share owner.",
              why: "Wrong layer. Settlement risk ≠ demat title.",
            },
            {
              do: "Drop (D). Mutual-fund bodies are a different product.",
              why: "AMFI is not a depository. An AMC manages a scheme, not your equity demat title.",
            },
            {
              do: "Add fungible: same-ISIN units are interchangeable balances.",
              why: "You sell 50 units of that ISIN, not 50 unique paper serials.",
            },
            {
              do: "If asked who moves the shares after a trade, say the depository on instructions, after the CCP has novated.",
              why: "Two jobs: guarantee versus book-entry.",
            },
          ],
          result:
            "(A) Investor = beneficial owner; depository = registered owner. DP faces you; CCP is another layer.",
        },
      ],
    },
    {
      heading: "Insider trading / PIT — one page",
      body: "Picture someone who already saw the school exam paper, then bets on who will top the class. That is the insider picture: secret news that can move a price, then a trade. The secret is unpublished company news, not a guess from the newspaper.\n\nExam rule: insider trading, in exam English, is trading in a company’s securities while you have unpublished price-sensitive information (UPSI). The main SEBI code is the PIT Regulations, 2015 (Prohibition of Insider Trading). Connected people (directors, officers, employees, some advisers) and often their immediate relatives sit in the net. Designated persons also face a trading window: typically closed from quarter-end until 48 hours after results. A closed-window trade can breach the code even if nobody proves a profit. You may share UPSI only for a real work or legal need, on a need-to-know basis, with records. An oral ‘I promise not to trade’ is not a safe harbour. PIT is not the same as market fraud on the order book (circular trades, spoofing, front-running a client order) — that is mainly PFUTP. Late company disclosure of a signed material deal is mainly LODR, not PIT by itself.",
      howTo: [
        "Ask: did someone trade (or tip) on unpublished company news that can move the price? → PIT.",
        "Ask: did someone trick the market (fake volume, jump a client order)? → PFUTP, not PIT first.",
        "Ask: did the company stay silent on a material event? → LODR disclosure, not PIT first.",
        "Trading window closed for designated persons → code problem even without a proven profit.",
        "Drop ‘oral promise’ and ‘I own only 50 shares’ as defences.",
      ],
      bullets: [
        "Insider = secret exam paper, then a trade. The secret is UPSI.",
        "PIT 2015: no trading on UPSI; share only for a real need, with records.",
        "Connected persons + trading window + contra-trade rules.",
        "Window typically closed from quarter-end until 48 hours after results.",
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
              why: "That is classic UPSI — the secret exam paper.",
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
        {
          title: "Late company disclosure is LODR first, not PIT by itself",
          prompt:
            "A listed company sits silent for days after signing a material deal. No employee trade is described. First label? (A) PIT 2015 because all silence is insider trading (B) LODR disclosure duty (C) CRR (D) Depositories Act only.",
          steps: [
            {
              do: "Ask what is missing: a public filing of a material event, not a named insider trade.",
              why: "Company-to-market speech is listing disclosure (LODR), not PIT first.",
            },
            {
              do: "Pick (B).",
              why: "LODR is the code that says tell the exchange a material event in time.",
            },
            {
              do: "Drop (A)’s because all silence is insider trading.",
              why: "PIT needs trading or tipping on UPSI. Silence by the company is a different duty.",
            },
            {
              do: "Drop CRR and the Depositories Act as the main label.",
              why: "Wrong machines: reserve ratio and demat law.",
            },
            {
              do: "If the next sentence adds ‘the CFO’s spouse bought yesterday’, then add PIT.",
              why: "Now you have unpublished news plus a connected trade. Two codes can sit together, but the stem here had no trade.",
            },
            {
              do: "Keep PFUTP for fake volume / jumping a client, not for this silence.",
              why: "Order-book fraud is still a third tree.",
            },
          ],
          result:
            "(B) LODR first when the company stays silent on a material deal. PIT needs a trade or tip on UPSI.",
        },
        {
          title: "Closed window and a 50-share defence",
          prompt:
            "A designated person buys 50 shares in the closed window after quarter-end and says ‘too small to matter, and I did not know the result number’. Defence? (A) Valid, because 50 is below a SEBI rupee floor in the Act (B) Weak — the window is a preventive PIT rule (C) Valid if they use a spouse account (D) Valid because T+1 had not settled.",
          steps: [
            {
              do: "Name the person: designated, so the trading window applies.",
              why: "The window typically runs from quarter-end until 48 hours after results.",
            },
            {
              do: "Pick (B). Treat the trade as a code problem even without a proven profit.",
              why: "The paper does not need the exact result number or a huge gain.",
            },
            {
              do: "Drop (A). ‘Only 50 shares’ is not a safe harbour in this exam story.",
              why: "Size is not a defence. The notes already drop ‘I own only 50 shares’.",
            },
            {
              do: "Drop (C). A spouse / immediate-relative account is usually still in the net.",
              why: "PIT does not stop at the employee’s own demat.",
            },
            {
              do: "Drop (D). Settlement cycle is not a PIT defence.",
              why: "T+1 is when shares move. It does not reopen a closed window.",
            },
            {
              do: "If asked about a contra trade six weeks later, remember designated persons also face a contra-trade cooling period (commonly six months in the code).",
              why: "Window and contra-trade are two preventive PIT tools, not PFUTP.",
            },
          ],
          result:
            "(B) Closed-window trades can breach PIT without a big profit. Size, spouse, and T+1 are not defences.",
        },
      ],
    },
    {
      heading: "Mutual funds and the NAV idea",
      body: "Picture a shared pizza of stocks and cash. NAV is the price of one slice — one mutual-fund unit. Many people pool money; the fund house buys a portfolio; each unit’s price is that pizza divided fairly.\n\nExam rule: SEBI regulates mutual funds (Mutual Funds Regulations, 1996). AMFI is the industry association, not the regulator. Three layers: Sponsor (promotes the fund house) → Trustees (oversee) → Asset Management Company or AMC (manages the money). A custodian holds securities. An RTA processes unit transactions. NAV per unit is (assets − liabilities) / number of units. If assets are ₹5,200 crore, liabilities ₹80 crore, and units 160 crore, NAV = (5,200 − 80) / 160 = ₹32. Open-ended schemes issue and redeem on an ongoing basis at NAV (subject to cut-off times). Close-ended schemes do not redeem daily; liquidity is often on the exchange, at a market price that can differ from NAV.",
      howTo: [
        "Regulator first: SEBI, not AMFI.",
        "Sketch Sponsor → Trustee → AMC.",
        "NAV = (assets − liabilities) / units. Subtract before you divide.",
        "Open-ended = ongoing buy/sell at NAV. Close-ended = no daily redeem at NAV.",
        "Drop options that say ‘AMFI regulates’ or that treat NAV as the AMC’s stock-exchange last-traded price.",
      ],
      bullets: [
        "NAV = price of one mutual-fund unit = (assets − liabilities) / units.",
        "SEBI regulates; AMFI is the trade body.",
        "Sponsor promotes; trustees oversee; AMC manages; custodian holds securities.",
        "Open-ended: ongoing NAV flow. Close-ended: typically listed, no daily NAV redeem.",
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
        {
          title: "Sponsor, trustee, AMC — do not swap the layers",
          prompt:
            "Match: (i) promotes the fund house (ii) oversees the AMC in the investors’ interest (iii) manages the money (iv) holds the scheme’s securities. Choose from Sponsor, Trustees, AMC, custodian.",
          steps: [
            {
              do: "(i) Sponsor promotes the fund house.",
              why: "The sponsor stands behind the AMC. It is not AMFI and not SEBI.",
            },
            {
              do: "(ii) Trustees oversee.",
              why: "Trustees watch the AMC for unit-holders. They do not pick every stock themselves as the day-to-day manager.",
            },
            {
              do: "(iii) AMC manages the money.",
              why: "Asset Management Company is the manager. NAV is published for the scheme, not as AMFI’s licence.",
            },
            {
              do: "(iv) Custodian holds the securities.",
              why: "Custody is safekeeping. An RTA (registrar) processes unit buy/sell paperwork — a fifth layer if the stem asks.",
            },
            {
              do: "Regulator remains SEBI (Mutual Funds Regulations, 1996).",
              why: "AMFI is the trade body. NSDL may hold units in demat; it does not replace SEBI.",
            },
            {
              do: "If an option says ‘the trustee sets CRR’, reject it.",
              why: "Wrong regulator family.",
            },
          ],
          result:
            "Sponsor promotes; trustees oversee; AMC manages; custodian holds securities. SEBI regulates.",
        },
        {
          title: "NAV subtracts liabilities; listed price can differ",
          prompt:
            "Assets ₹1,000 crore, liabilities ₹40 crore, units 80 crore. A student writes NAV = 1,000 / 80 = ₹12.50 and says a close-ended unit must trade at that NAV on NSE. Fix both mistakes.",
          steps: [
            {
              do: "Subtract first: net assets = 1,000 − 40 = 960 crore.",
              why: "Liabilities come off before you divide. The student skipped that step.",
            },
            {
              do: "Divide 960 by 80 = ₹12 per unit.",
              why: "NAV = (assets − liabilities) / units. ₹12, not ₹12.50.",
            },
            {
              do: "Say what close-ended means: no daily redeem at NAV as the usual path.",
              why: "Liquidity is often on the exchange.",
            },
            {
              do: "Exchange price can sit above or below NAV.",
              why: "The listed quote is a market price, not an AMC NAV print by force.",
            },
            {
              do: "Open-ended units are the ones you buy and sell on most days at NAV (cut-off rules apply).",
              why: "Do not swap the two types.",
            },
            {
              do: "Keep SEBI as regulator; AMFI still is not.",
              why: "A NAV sum does not change who licences the industry.",
            },
          ],
          result:
            "NAV = ₹12, not ₹12.50. A close-ended listed price can differ from NAV.",
        },
      ],
    },
    {
      heading: "Circuit breakers",
      body: "Picture a fuse in the wall. When the whole market jumps too hard, the fuse trips and trading stops for a while. That is a market-wide circuit breaker — not a cap on one share, and not the money printer’s job.\n\nExam rule: a market-wide circuit breaker can halt the whole cash and derivatives market when Nifty 50 or Sensex moves 10%, 15%, or 20% from the previous close. Clock time matters. A 10% move before 1:00 p.m. typically brings a 45-minute halt. Between 1:00 p.m. and 2:30 p.m., a 10% move is a shorter (15-minute) halt. After 2:30 p.m., a 10% move does not halt the market under the standard timetable. A 20% move stops trading for the rest of the day at any time. Stock-specific price bands (2%, 5%, 10%, 20% on individual shares) are a different tool. They limit one scrip. They are not the Nifty 10% market-wide halt. A circuit breaker is not novation (that is the clearing corporation becoming the central counterparty). It is not the PIT insider-trading window.",
      howTo: [
        "Ask: whole market on Nifty/Sensex, or one stock’s band?",
        "Whole market → 10 / 15 / 20% versus previous close.",
        "Read the clock: 10% before 1 p.m. ≠ 10% after 2:30 p.m. ≠ any-time 20%.",
        "Do not apply a 5% stock band rule to an index halt question.",
        "Reject options that call the halt ‘PIT’ or ‘novation’.",
      ],
      bullets: [
        "Circuit breaker = a fuse. Whole-market halt on a big Nifty 50 or Sensex jump.",
        "MWCB: 10%, 15%, 20% versus previous close.",
        "20% = rest of the day at any hour. Late-day 10% (after 2:30 p.m.) = no halt.",
        "Stock bands (2 / 5 / 10 / 20% on one scrip) ≠ market-wide circuit breaker.",
        "Not novation. Not the PIT window.",
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
              why: "That is the circuit breaker — the fuse.",
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
        {
          title: "15% uses a different afternoon clock than 10%",
          prompt:
            "Nifty 50 falls 15% from the previous close. What is the halt if the print is (i) 11:00 a.m. (ii) 1:20 p.m. (iii) 2:20 p.m.?",
          steps: [
            {
              do: "Confirm it is MWCB on Nifty versus previous close, not a 5% stock band.",
              why: "15% is the middle index step (10 / 15 / 20).",
            },
            {
              do: "(i) 11:00 a.m. is before 1:00 p.m. → 1 hour 45 minutes halt.",
              why: "The morning 15% pause is longer than the morning 10% pause (45 minutes).",
            },
            {
              do: "(ii) 1:20 p.m. is between 1:00 p.m. and 2:00 p.m. → 45 minutes.",
              why: "For 15%, the short afternoon window ends at 2:00 p.m., not 2:30 p.m.",
            },
            {
              do: "(iii) 2:20 p.m. is after 2:00 p.m. → rest of the day.",
              why: "A late 15% print closes the session. Do not apply the 10% ‘after 2:30, no halt’ rule here.",
            },
            {
              do: "Write the trap: 10% after 2:30 p.m. does not halt; 15% after 2:00 p.m. does.",
              why: "Students reuse the 10% timetable and miss the 2:00 p.m. cut.",
            },
            {
              do: "20% at any hour is still rest of the day.",
              why: "Do not give 20% a 45-minute haircut.",
            },
          ],
          result:
            "15% at 11:00 → 1h 45m; at 1:20 → 45m; at 2:20 → closed for the day. Not the 10% clock.",
        },
        {
          title: "Either index can trigger; cash and F&O both halt",
          prompt:
            "True or false: (i) only Nifty 50 can trigger MWCB, never Sensex (ii) a 10% Sensex move versus previous close can halt the market (iii) the halt is cash only; index futures keep trading.",
          steps: [
            {
              do: "(i) False. Either Nifty 50 or Sensex can trigger.",
              why: "The notes say Nifty 50 or Sensex versus previous close.",
            },
            {
              do: "(ii) True. A 10/15/20% Sensex shock is enough.",
              why: "You do not need both indices to print the same number.",
            },
            {
              do: "(iii) False. The market-wide brake covers cash and derivatives together.",
              why: "It is a whole-market pause, not a single-stock band and not ‘cash only’.",
            },
            {
              do: "Still separate stock-specific bands (2%, 5%, 10%, 20% on one scrip).",
              why: "Those limit one share. They are not this index halt.",
            },
            {
              do: "Reject ‘the 10% halt is novation’ and ‘the 10% halt is the PIT window’.",
              why: "Novation is CCP substitution. PIT is insider trading. Different pipes.",
            },
            {
              do: "Read the clock before you quote 45 minutes.",
              why: "Time of day changes a 10% or 15% halt. 20% does not need the clock.",
            },
          ],
          result:
            "(i) false (ii) true (iii) false. Either benchmark; cash and F&O; bands are a different tool.",
        },
      ],
    },
    {
      heading: "Chairpersons — keep the years apart",
      body: "Picture a class prefect who changes each year. You would not write last year’s prefect on this year’s form. SEBI Chairperson is the same kind of fact: read the paper’s year before you write the name.\n\nExam rule: Ajay Tyagi was Chairperson from 1 March 2017 until 28 February 2022. For a 2020 paper, Tyagi is the answer. Madhabi Puri Buch took charge on 1 March 2022 (SEBI’s first woman Chairperson) and served until 28 February 2025. For 2022 after 1 March, 2023, and all of calendar 2024, Buch is the Chairperson. Do not back-date Pandey into 2024. Tuhin Kanta Pandey assumed charge on 1 March 2025. For a 2025 paper, Pandey is the Chairperson. Buch did not start a second consecutive term. Shaktikanta Das was RBI Governor in that era, not SEBI Chair. Labels: Tyagi until Feb 2022 · Buch Mar 2022–Feb 2025 · Pandey from Mar 2025.",
      howTo: [
        "Read the question’s year (or the date in the stem) before you name anyone.",
        "Until 28 Feb 2022 → Tyagi. 1 Mar 2022–28 Feb 2025 → Buch. From 1 Mar 2025 → Pandey.",
        "Drop RBI Governor names in a SEBI Chair question.",
        "Drop ‘Buch throughout 2025’ and ‘Pandey in 2022’.",
        "First woman Chairperson attaches to Buch (March 2022), not to a later Chair.",
      ],
      bullets: [
        "Tyagi: Mar 2017 – Feb 2022 (correct for 2020).",
        "Buch: Mar 2022 – Feb 2025; first woman Chairperson (correct for 2024).",
        "Pandey: from Mar 2025 (correct for 2025 papers).",
        "Shaktikanta Das was RBI Governor, not SEBI Chair.",
        "Do not invent new years. Do not mix 2022 and 2025 names.",
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
        {
          title: "First woman Chairperson is Buch, March 2022",
          prompt:
            "SEBI’s first woman Chairperson is: (A) a 2025 fact attached to Pandey (B) Madhabi Puri Buch, who took charge on 1 March 2022 (C) Ajay Tyagi (D) the RBI Governor in 2022.",
          steps: [
            {
              do: "Pick (B). Buch took charge on 1 March 2022.",
              why: "That is both the first-woman label and the start of her term.",
            },
            {
              do: "Drop (A). Pandey is the 2025 Chair, not the first woman Chair.",
              why: "Do not move Buch’s first-woman fact onto the next name.",
            },
            {
              do: "Drop (C). Tyagi is the 2017–Feb 2022 Chair, a man, and the 2020-cycle answer.",
              why: "Right person for 2020, wrong person for this stem.",
            },
            {
              do: "Drop (D). RBI Governor ≠ SEBI Chair.",
              why: "Shaktikanta Das was RBI Governor in that era, not SEBI Chair.",
            },
            {
              do: "Write her end date: 28 February 2025.",
              why: "She did not start a second consecutive term on 1 March 2025.",
            },
            {
              do: "For a 2023 or 2024 paper, Buch is still the Chairperson answer.",
              why: "Pandey must not be back-dated into 2024.",
            },
          ],
          result:
            "(B) Madhabi Puri Buch from 1 March 2022 (first woman Chair). Pandey is March 2025.",
        },
        {
          title: "Three labels on one timeline",
          prompt:
            "Fill: (i) 1 March 2017 – 28 February 2022 (ii) 1 March 2022 – 28 February 2025 (iii) from 1 March 2025. Names: Tyagi, Buch, Pandey. Kill Das if he appears.",
          steps: [
            {
              do: "(i) Ajay Tyagi.",
              why: "That whole window is Tyagi, including the 2020 Grade A cycle.",
            },
            {
              do: "(ii) Madhabi Puri Buch.",
              why: "That whole window is Buch, including all of calendar 2024.",
            },
            {
              do: "(iii) Tuhin Kanta Pandey.",
              why: "He assumed charge on 1 March 2025. That is the 2025-paper label.",
            },
            {
              do: "Draw the hand-off days: 28 Feb / 1 Mar, twice (2022 and 2025).",
              why: "The exam loves the exact charge dates, not ‘sometime in 2022’.",
            },
            {
              do: "If Shaktikanta Das appears, label him RBI Governor, not SEBI Chair.",
              why: "Wrong institution.",
            },
            {
              do: "If a stem says ‘throughout 2025’, do not answer Buch.",
              why: "Buch’s term ended 28 February 2025. Most of calendar 2025 is Pandey.",
            },
            {
              do: "If a stem says ‘February 2022’, still Tyagi until the 28th.",
              why: "Buch starts only on 1 March 2022. Do not jump early.",
            },
          ],
          result:
            "Tyagi to 28 Feb 2022; Buch 1 Mar 2022–28 Feb 2025; Pandey from 1 Mar 2025. Das is RBI.",
        },
      ],
    },
    {
      heading: "RBI tools — repo, CRR, SLR",
      body: "Picture RBI as the money printer and the banks’ bank. SEBI is still only the market umpire. Do not give the umpire the printing press. Repo, CRR, and SLR are RBI tools, one sentence each.\n\nExam rule: the repo rate is the rate at which RBI lends rupees to banks against eligible collateral (usually government securities) to inject short-term liquidity. CRR (cash reserve ratio) is the share of a bank’s deposits (NDTL) that it must keep as cash with RBI. That cash is not lent out. A CRR hike drains liquidity. SLR (statutory liquidity ratio) is the share of deposits a bank must hold in eligible safe liquid assets — mainly government securities, and as the rules allow, cash and gold. SLR is not a SEBI listing rule. SEBI does not set repo, CRR, or SLR. Quoted percentages change; learn the instrument, not a stale number as if it were in the Act.",
      howTo: [
        "Read the stem: lending against collateral, cash parked at RBI, or a slice in G-secs?",
        "Against collateral, RBI → banks → repo.",
        "Cash balance at RBI as a ratio of deposits → CRR.",
        "Mandatory slice in eligible liquid assets (mostly G-secs) → SLR.",
        "If the option says SEBI sets any of the three, it is wrong.",
      ],
      bullets: [
        "RBI = money printer / banks’ bank. SEBI = umpire. Do not swap them.",
        "Repo: RBI lends to banks against collateral (liquidity in).",
        "CRR: cash with RBI as a share of deposits (cannot be lent). A hike drains liquidity.",
        "SLR: share of deposits in eligible liquid assets, mainly G-secs.",
        "SEBI does not set repo, CRR, or SLR. Learn the tool, not a stale percentage.",
      ],
      examples: [
        {
          title: "One sentence each",
          prompt:
            "Match in one line: repo, CRR, SLR. Who sets all three?",
          steps: [
            {
              do: "Repo: RBI lends to banks against eligible securities at the repo rate.",
              why: "That is liquidity injection, with collateral. Direction: rupees out from RBI to banks.",
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
              why: "SEBI does not run money-policy ratios.",
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
              why: "One wrong referee word is enough.",
            },
          ],
          result:
            "False. Repo is RBI → banks against collateral. Brokers are SEBI, but they do not set repo.",
        },
        {
          title: "Reverse repo absorbs; repo injects",
          prompt:
            "RBI wants to drain surplus rupees for a day without changing CRR. Which tool fits? (A) repo lending to banks (B) reverse repo (banks park funds with RBI) (C) a SEBI circular to brokers (D) lowering SLR so banks must buy more G-secs from SEBI.",
          steps: [
            {
              do: "Name the need: drain (absorb) short-term liquidity.",
              why: "Repo lending does the opposite — it injects rupees.",
            },
            {
              do: "Pick (B) reverse repo: banks place funds with RBI, usually against collateral in the old LAF picture.",
              why: "Money goes to RBI. That is a drain. CRR is not being rewritten.",
            },
            {
              do: "Drop (A). Repo lending injects.",
              why: "Direction was already a separate item. Do not mix the two names.",
            },
            {
              do: "Drop (C). Brokers and circulars are SEBI.",
              why: "This is a money-market liquidity problem, not a listing rule.",
            },
            {
              do: "Drop (D). SLR is a stock of eligible liquid assets, and SEBI does not set it.",
              why: "Even the true idea ‘SLR uses G-secs’ cannot save a wrong setter.",
            },
            {
              do: "If the stem instead says ‘inject overnight’, switch to repo lending against G-sec collateral.",
              why: "Same family, opposite direction.",
            },
          ],
          result:
            "(B) Reverse repo absorbs. Repo lending injects. CRR/SLR are ratios; SEBI sets neither.",
        },
        {
          title: "CRR is cash at RBI; SLR is a G-sec-heavy slice",
          prompt:
            "Which pair is right? (A) CRR = cash balance with RBI as a share of deposits; SLR = share of deposits in eligible liquid assets, mainly G-secs (B) CRR = SEBI listing fee; SLR = PIT window (C) Both are set by SEBI (D) SLR cash is lent out as personal loans the same day.",
          steps: [
            {
              do: "Pick (A).",
              why: "CRR is idle cash at the Reserve Bank. SLR is the statutory liquid-asset slice, mostly government securities (and as rules allow, cash and gold).",
            },
            {
              do: "Drop (B). Listing fees and PIT are SEBI market-integrity / listing facts.",
              why: "Wrong family of tools.",
            },
            {
              do: "Drop (C). RBI sets CRR and SLR.",
              why: "SEBI does not run money-policy ratios.",
            },
            {
              do: "Drop (D). SLR assets are a required holding, not a same-day personal-loan pool.",
              why: "The point of SLR is a liquid, safe buffer — mainly G-secs.",
            },
            {
              do: "Add direction: a CRR hike drains lendable cash; it is not an overnight reverse-repo trade by another name.",
              why: "Ratio versus LAF operation.",
            },
            {
              do: "Do not memorise a stale CRR% as if it were printed in the RBI Act.",
              why: "The instrument stays; the quoted number moves.",
            },
          ],
          result:
            "(A) CRR = cash at RBI. SLR = eligible liquid assets, mainly G-secs. Both RBI, not SEBI.",
        },
      ],
    },
  ],
};
