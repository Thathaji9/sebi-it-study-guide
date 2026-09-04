export type PrecisDrill = {
  id: string;
  passage: string;
  wordLimit: number;
  model: string;
};

export const precisDrills: PrecisDrill[] = [
  {
    id: "pre-01",
    passage: `The closing price of a security is more than the last number on a screen. It values portfolios, determines index levels and influences collateral calls. A closing auction can concentrate genuine buying and selling interest, but concentration also makes the final minutes attractive to traders who wish to influence a benchmark with limited capital.

The answer is not to disperse every order through continuous trading. An auction often produces a better price precisely because participants meet at one point. Its integrity depends on design: indicative prices should be visible, order changes should be traceable, and the uncrossing method should not reward the participant who is merely fastest at the deadline. A short randomised close can reduce attempts to act at the final possible instant, though excessive uncertainty may deter legitimate orders.

Supervision should therefore examine the economic effect of late orders, their relation to positions settled at the closing price, and repeated patterns across days. A large order is not improper merely because it moves the market. The relevant distinction is between seeking execution and purchasing an artificial valuation. Well-designed auctions make that distinction easier to investigate while preserving the benefit of pooled liquidity.`,
    wordLimit: 90,
    model:
      "Closing prices affect portfolios, indices and collateral, so closing auctions combine useful liquidity with a risk of benchmark influence. Continuous trading is not necessarily safer because concentration can improve price discovery. Integrity requires visible indicative prices, traceable order changes and an uncrossing method that does not privilege last-second speed; limited randomisation may also help. Supervision should relate late orders to positions benefiting from the close and identify repeated conduct. Price impact alone is insufficient: the essential distinction is between obtaining execution and creating an artificial valuation.",
  },
  {
    id: "pre-02",
    passage: `A regulation may be uniform on paper yet unequal in operation. A large intermediary can distribute the cost of a new reporting requirement across millions of accounts, while a small intermediary may need the same software, specialist review and certification for a modest business. Exempting every small entity would invite regulatory arbitrage, but imposing identical machinery can reduce competition without reducing risk.

Proportionality should not mean weaker duties of honesty, segregation or client protection. It should concern the manner in which compliance is demonstrated. A simple business with no custody and limited products may submit a standard return and undergo targeted inspection. A complex group handling client assets may require continuous reporting, independent assurance and detailed recovery tests. The distinction must rest on observable exposure, not on persuasive claims of inconvenience.

Rules should also permit movement between tiers. Growth, new permissions or repeated deficiencies should trigger stronger controls, while a reduced risk profile should not remain burdened forever by an obsolete classification. Such a framework protects common outcomes without pretending that every regulated entity creates the same pathway of harm. Proportionate regulation is rigorous when it measures risk honestly; it becomes indulgence only when size is treated as an excuse for misconduct.`,
    wordLimit: 90,
    model:
      "Uniform compliance requirements can impose disproportionate costs on small intermediaries and weaken competition, although broad exemptions invite arbitrage. Proportionality should preserve common duties of honesty, segregation and client protection while varying how compliance is shown. Limited, non-custodial businesses may use standard returns and targeted inspections, whereas complex custodial groups require continuous reporting, assurance and recovery testing. Tiers should depend on observable exposure and change with growth, permissions or deficiencies. Thus, rigorous proportionality aligns supervisory machinery with risk without allowing an entity's size to excuse misconduct.",
  },
  {
    id: "pre-03",
    passage: `Machine-readable corporate filings promise quicker comparison and fewer clerical errors. Yet a filing schema is not the company itself. When a new transaction does not fit an available field, the preparer may force it into the nearest category so that the portal accepts the form. A technically valid return can then convey a financially misleading picture.

Validation should therefore operate at two levels. Basic rules can reject impossible dates, broken totals and missing identifiers. More difficult questions require an explanation field, review by a responsible officer and the ability to extend the taxonomy under controlled governance. If every extension is freely invented, comparison disappears; if no extension is permitted, unusual but material facts disappear instead.

The regulator should monitor where filers repeatedly use residual categories and where manual overrides cluster. Those patterns reveal defects in the schema as well as possible avoidance by issuers. Versions of the taxonomy must remain accessible because a later investigator needs to know what the form allowed on the day of filing. Structured data is most valuable when it improves inquiry, not when successful submission is mistaken for truthful disclosure.`,
    wordLimit: 90,
    model:
      "Machine-readable filings improve comparison and detect clerical errors, but schema compliance does not guarantee truthful disclosure. Unusual transactions may be forced into unsuitable fields merely to secure portal acceptance. Validation should reject basic inconsistencies while allowing governed explanations and taxonomy extensions for difficult cases. Unlimited extensions would destroy comparability, whereas rigid categories could conceal material facts. Regulators should study residual-field use and override patterns to identify both schema weaknesses and issuer avoidance, while retaining old taxonomy versions. Structured filing should support inquiry rather than make technical acceptance a substitute for substance.",
  },
  {
    id: "pre-04",
    passage: `Market institutions increasingly connect through application programming interfaces. These connections reduce manual work, but they also convert a single credential into a channel through which orders, client data or funds may move at machine speed. A password policy designed for employees is inadequate for a token that operates continuously without human observation.

Control begins with narrow authority. A token used to retrieve contract notes should not also place orders, and a development credential should never reach production. Expiry, rotation and immediate revocation must be designed before an incident, not improvised after a vendor is compromised. Institutions should record which system used a credential, from where, and for what action, while avoiding logs that themselves expose the secret.

Regulators need not prescribe one authentication product. They should require intermediaries to demonstrate an inventory of machine identities, limits on each identity and a tested method for disabling connections without closing the entire business. This shifts attention from whether an API is modern to whether its authority is governable. Connectivity is beneficial only when an institution can identify and contain the machine acting in its name.`,
    wordLimit: 90,
    model:
      "Application programming interfaces improve efficiency but allow a compromised machine credential to move orders, data or funds rapidly. Human password policies do not adequately govern continuously operating tokens. Controls should restrict each token's purpose, separate development from production, and provide planned expiry, rotation and revocation. Audit records must identify use without revealing secrets. Rather than mandate a particular product, regulators should seek inventories of machine identities, defined authority and tested isolation procedures. The proper test of connectivity is whether the institution can identify and contain every machine acting on its behalf.",
  },
  {
    id: "pre-05",
    passage: `Disclosure is often discussed as a race to publish, but accuracy also depends on the ability to correct. An issuer may discover that a filed table contains a wrong unit, that a subsidiary was omitted, or that an estimate rested on incomplete information. Quietly replacing the document creates a cleaner website and a dirtier public record.

A correction framework should distinguish harmless presentation errors from changes that alter an investor's understanding. Both may be corrected, but a material correction requires a dated notice, a reason and a clear account of which figures changed. The earlier version should remain available with an unmistakable warning. Otherwise, a person who traded on the original filing cannot later establish what the market was told.

Frequent correction is also supervisory information. It may indicate weak controls even where no single mistake is serious. Conversely, punishing every prompt correction as evidence of guilt may encourage concealment. Regulation should reward timely candour while examining repeated failures in preparation and approval. A trustworthy disclosure system is not one that pretends errors never occur; it is one that preserves an intelligible history of how public information was repaired.`,
    wordLimit: 90,
    model:
      "Reliable disclosure requires transparent correction as well as prompt publication. Quiet replacement of an erroneous filing destroys evidence of what investors originally saw. Corrections should distinguish presentational mistakes from material changes, with material cases carrying a dated notice, reasons and identified revisions. Earlier versions must remain accessible and clearly marked. Repeated corrections can expose weak internal controls, but treating every voluntary correction as guilt may encourage concealment. Regulation should therefore support timely candour while supervising recurring failures, preserving a clear history of changes to public information.",
  },
  {
    id: "pre-06",
    passage: `Retail trading applications often celebrate activity through streaks, badges and urgent prompts. None of these features compels a trade, and each can be defended as ordinary interface design. Their combined effect, however, may convert a considered investment decision into a habit of responding to signals supplied by the platform.

A ban on colour or animation would be both crude and easy to evade. The better question is whether the design systematically increases transactions from which the platform earns while withholding information that would slow the user down. A prompt announcing unusual market movement should display risk and cost with the same prominence as opportunity. Defaults for complex products should reflect the consequence of error, not the revenue value of an extra click.

Evidence should guide intervention. Platforms can test whether a feature raises rapid reversals, repeated losses or trading immediately after a notification. Supervisors can require controlled trials of major design changes and retain the results for inspection. This does not make the regulator a designer of mobile screens. It recognises that conduct can be embedded in architecture. When an intermediary chooses the sequence and emphasis of every choice, interface design becomes part of its duty towards the client.`,
    wordLimit: 90,
    model:
      "Trading applications may use streaks, badges and urgent prompts to turn considered investment into habitual response. Banning particular visual devices would be crude; scrutiny should instead ask whether design increases revenue-producing trades while suppressing caution. Risk and cost should accompany opportunity prominently, and defaults should reflect potential harm. Platforms can measure whether features cause rapid reversals, repeated losses or notification-led trading, while supervisors may inspect controlled tests of major changes. Since intermediaries determine the order and emphasis of choices, interface architecture forms part of their conduct duty.",
  },
  {
    id: "pre-07",
    passage: `An identifier is commonly treated as a permanent label. In securities markets, the underlying person or instrument may change while the label survives, or the label may change while the economic interest continues. Companies merge, funds rename schemes, clients move residence and legal entities are reorganised. A database that stores only the current value loses the path by which past transactions remain connected.

Good identifier governance therefore requires lineage. Every creation, correction, merger and retirement should have an effective date, an authorised source and a link to the earlier record. Historical identifiers should not be recycled merely because they appear unused. Nor should two records be joined solely because their names resemble each other; an erroneous merge can contaminate surveillance as seriously as a missed connection.

Responsibility cannot rest entirely with reporting entities, which may see only their own fragment. A designated steward must resolve conflicts and publish rules for challenging a link. Analysts should be able to reproduce the identity map that existed at the time of an investigation. Unique numbers are useful, but continuity comes from governed relationships among them. Without lineage, a market may possess many clean labels and still lack institutional memory.`,
    wordLimit: 90,
    model:
      "Market identifiers are not truly permanent because persons and instruments may be renamed, merged, reorganised or retired. Storing only current values breaks links with past transactions. Governance must preserve lineage for each creation, correction, merger and retirement, supported by dates, authorised sources and prior records. Retired identifiers should not be recycled, while uncertain records should not be merged merely on name similarity. A designated steward should resolve conflicts and permit challenges. Reproducible historical identity maps, rather than clean numbers alone, provide the continuity needed for reliable supervision.",
  },
  {
    id: "pre-08",
    passage: `Faster securities settlement reduces the period during which a failed counterparty can impose loss. It does not remove the need for funding; it advances it. Brokers and custodians must obtain cash and securities earlier, often before cross-border investors or smaller participants can complete their internal approvals. Risk may therefore move from the clearing corporation to the balance sheets that supply intraday liquidity.

Mandating universal prefunding would simplify assurance but could lock idle resources away from productive use. It may also favour institutions able to maintain large buffers. A sound transition should measure peak liquidity needs, permit reliable collateral arrangements and coordinate cut-off times across payment, depository and foreign-exchange systems. Exceptional delays should be visible, but exceptions must not become an informal longer cycle available only to influential firms.

The success of a shorter cycle should not be judged solely by the percentage of trades settled on time. Supervisors should examine concentration in liquidity providers, rejected instructions, borrowing costs and whether smaller investors face earlier, more expensive deadlines. Speed is valuable when the supporting network can meet it fairly. A market that settles quickly by excluding participants or concentrating financing risk has improved one statistic while weakening the system around it.`,
    wordLimit: 100,
    model:
      "Shorter settlement lowers counterparty exposure but brings funding obligations forward, shifting risk towards providers of intraday cash and securities. Universal prefunding offers certainty but immobilises resources and may favour firms with large buffers. Transition should measure peak liquidity, support dependable collateral and align payment, depository and foreign-exchange cut-offs, with transparent and limited exceptions. Performance must be assessed beyond timely-settlement rates by tracking liquidity concentration, rejected instructions, borrowing costs and burdens on smaller investors. Settlement speed is beneficial only if the supporting network supplies funding fairly without creating new concentration.",
  },
  {
    id: "pre-09",
    passage: `A surveillance system is judged easily by the number of alerts it produces and poorly by the conduct it fails to see. High volumes may create an appearance of vigilance while officers repeatedly close harmless cases. If closure reasons are recorded only as free text, the institution learns little from the labour consumed.

Alert review should create structured feedback. Officers should state whether data were wrong, the rule was too broad, the conduct was legitimate, or further evidence disproved the suspicion. Periodic analysis can then identify rules that waste attention and market segments where genuine cases repeatedly begin. Reducing an unproductive alert is not relaxation if the saved capacity is directed towards more credible risk.

Feedback must not become automatic self-cancellation. A manipulator may imitate patterns previously classified as benign, and rare misconduct may never supply enough examples for statistical confidence. Changes to detection rules should therefore be documented, tested against historical periods and approved independently of the team seeking a lower workload. Effective surveillance is a learning process with institutional challenge. It improves not by producing the largest queue, but by explaining what each resolved alert teaches about the next one.`,
    wordLimit: 90,
    model:
      "Large alert volumes can create an illusion of effective surveillance while officers repeatedly dismiss harmless cases. Structured closure reasons should distinguish data faults, broad rules, legitimate conduct and disproved suspicion. Analysing this feedback can remove wasteful alerts and redirect attention to credible risks. However, past dismissals must not automatically disable detection because manipulators adapt and rare abuse provides limited evidence. Rule changes should be documented, tested historically and independently approved. Surveillance should be judged by institutional learning and the quality of attention, not by the size of its alert queue.",
  },
  {
    id: "pre-10",
    passage: `A cloud contract may promise high availability yet say little about departure. Market institutions often discover their dependence only when they attempt to move data, rebuild controls or operate during a dispute with the provider. An exit plan written after relations deteriorate is not a plan; it is a negotiation conducted under operational pressure.

Portability requires more than a downloadable archive. The institution must know the format of records, the dependencies of applications, the ownership of encryption keys and the time needed to restore service elsewhere. Some managed services have no exact substitute, so an honest plan may retain selected dependence while providing a reduced essential service through another route. Pretending that every component can move immediately merely hides the most difficult choices.

Supervisors should ask for tested exit evidence, including restoration of a representative workload and reconciliation of records after transfer. They should also examine whether contract termination would remove access to logs needed for pending investigations. Cloud use can remain efficient and secure without being instantly interchangeable. The regulatory objective is credible recoverability and continuing legal access, not a fictional promise that a major platform can be replaced overnight.`,
    wordLimit: 90,
    model:
      "Cloud availability promises do not address dependence during departure or provider disputes. Effective portability requires knowledge of record formats, application dependencies, encryption-key ownership and restoration time, not merely a data archive. Since some managed services lack substitutes, plans may preserve limited dependence while providing essential service elsewhere. Supervisors should demand tested restoration, post-transfer reconciliation and continued access to investigative logs after termination. The objective is credible recovery and legal access, rather than an unrealistic assertion that every component of a major cloud platform can be replaced immediately.",
  },
  {
    id: "pre-11",
    passage: `Market rumours increasingly circulate in closed digital groups rather than on public pages. Privacy settings do not make such messages harmless, but they do complicate investigation. A forwarded image may lose its source, a deleted account may reappear under another name, and a message shown by one complainant may be genuine yet incomplete.

Enforcement should resist two shortcuts. It should not treat every member of a group as part of a common scheme, because passive receipt is not agreement. Nor should it abandon the evidence merely because the platform cannot certify every step. Investigators can compare timestamps with trading, trace payments, seek original devices and establish whether administrators directed coordinated action. The strength lies in several consistent links, not in the dramatic wording of one screenshot.

Platforms and intermediaries should preserve relevant records when a lawful notice is received, with a clear chain of custody and limits on unrelated collection. Overbroad monitoring of private conversation would chill legitimate discussion and produce unmanageable data. The proper response to closed networks is disciplined evidence: identify conduct, connect speakers to economic benefit and preserve context. Secrecy may increase suspicion, but proof must still concern participation rather than mere presence.`,
    wordLimit: 90,
    model:
      "Closed digital groups complicate market investigations because messages lose source and context, accounts change and screenshots may be incomplete. Enforcement should neither presume that every member joined a scheme nor discard uncertified digital evidence. Timestamps, trades, payments, original devices and administrator directions can form consistent links. Lawful preservation should maintain chain of custody while limiting unrelated collection, since broad monitoring would chill legitimate discussion and overwhelm supervision. Secrecy alone is not proof; investigators must connect particular conduct and speakers to coordinated participation and economic benefit.",
  },
  {
    id: "pre-12",
    passage: `An institution may maintain duplicate trading servers and still have a single point of failure. Both sites may depend on the same telecommunications route, identity provider, software release process or small team of specialists. Resilience measured by the number of machines can therefore conceal concentration in services that are less visible.

Dependency mapping should begin with critical market functions, not with an inventory of equipment. For each function, management should identify the people, data, vendors and utilities whose failure would stop delivery. The exercise must extend beyond direct contracts because two different vendors may rely on the same underlying network or name-resolution service. Confidentiality is necessary, but it should not prevent the regulator from seeing aggregate concentrations across institutions.

Testing should then remove a dependency rather than merely announce an emergency. A successful exercise demonstrates that authority can transfer, data remain consistent and participants receive usable communication under stress. Failures discovered in a test are evidence of learning, not reasons to design an easier test next year. Operational resilience is not the possession of spare assets. It is a verified ability to continue an essential market function when an assumed support is unavailable.`,
    wordLimit: 90,
    model:
      "Duplicate servers do not ensure resilience when sites share telecommunications, identity systems, release processes or specialists. Mapping should start from critical functions and identify all supporting people, data, vendors and utilities, including hidden common dependencies below direct contracts. Regulators need aggregate visibility of concentration while respecting confidentiality. Exercises should actually remove a dependency and test transfer of authority, data consistency and communication. Problems found should guide improvement rather than easier future tests. Resilience is the demonstrated continuation of an essential function without an assumed support, not the mere ownership of spare equipment.",
  },
  {
    id: "pre-13",
    passage: `Consolidated trading data can help a regulator detect relationships that no single intermediary can see. The same dataset may reveal an investor's wealth, habits, associations and periods of inactivity. Its value for supervision is therefore inseparable from the risk created by collecting it in one place.

Purpose limitation must be operational, not ceremonial. Access should be granted for defined inquiries, queries should be logged, and analysts should receive the least identifying detail needed for the task. Development teams can often test detection logic on masked or synthetic records. When real identities are necessary, later review should establish whether the use remained connected to the authorised objective.

Retention also requires discrimination. Evidence linked to a proceeding may need to survive for years, while a broad exploratory extract need not be copied into personal folders indefinitely. Deletion schedules, legal holds and independent access review can coexist. Privacy does not require blinding the regulator, and market integrity does not justify unlimited internal curiosity. A legitimate surveillance system must protect citizens not only from misconduct in the market but also from unnecessary observation by the institution entrusted with their data.`,
    wordLimit: 90,
    model:
      "Consolidated trading data strengthens supervision but also exposes investors' wealth, habits and associations. Purpose limitation should be enforced through inquiry-specific access, query logs and minimal identifying detail; masked or synthetic data can support much development work. Use of real identities requires later review against the authorised objective. Retention should distinguish evidence under legal hold from exploratory extracts that need not persist in personal storage. Deletion and access review can coexist with enforcement needs. Legitimate surveillance must address market misconduct without granting the regulator unlimited scope to observe citizens.",
  },
  {
    id: "pre-14",
    passage: `Open-source software allows market institutions to inspect code, avoid some licence costs and share improvements. Visibility, however, is not the same as maintenance. A small library may sit inside hundreds of systems although no organisation has accepted responsibility for reviewing its changes or responding when its lone maintainer leaves.

Procurement should therefore consider the health of a project as carefully as its technical features. Relevant questions include who can approve changes, how releases are signed, how quickly vulnerabilities are addressed and whether the institution can maintain a critical component if the public project stops. Contributing fixes upstream may reduce private divergence and spread the cost of review. Keeping every modification secret can create a neglected internal version that receives no community repair.

Not every dependency needs institutional sponsorship, and compulsory rewriting would waste scarce expertise. Priority should follow the consequence of failure and the ease with which malicious code could enter. An inventory of components, verified sources and planned replacement is more useful than a broad claim that open software is either safe or dangerous. Its resilience depends on sustained governance around the code, not on the fact that the code can be read.`,
    wordLimit: 90,
    model:
      "Open-source software offers inspectability, lower licence costs and shared improvement, but visible code may still lack responsible maintenance. Institutions should assess project governance, signed releases, vulnerability response and their ability to sustain critical components if public support ends. Upstream contributions can reduce risky private divergence. Controls should be proportionate to failure impact and opportunities for malicious entry, rather than require universal rewriting. Component inventories, verified sources and replacement plans are more useful than general claims about safety. Resilience arises from continuing governance, not merely access to source code.",
  },
  {
    id: "pre-15",
    passage: `Environmental disclosure increasingly combines measured facts with estimates. A company may know electricity purchased at its own plants but rely on assumptions for suppliers, leased offices or product use. Presenting all figures with equal precision gives an impression of certainty that the underlying information cannot support.

Useful reporting should identify the boundary of measurement, the major assumptions and the proportion derived from estimates. Comparability does not require every issuer to possess identical data on the first day. It requires readers to understand why two totals differ and whether a year-to-year improvement reflects lower impact, a changed method or a narrower boundary. Restating prior figures after a method changes may be more honest than preserving a false trend.

External assurance can improve discipline, but its scope must be visible. Verification of arithmetic is not verification of supplier evidence, and a limited review should not be advertised as proof of every sustainability claim. Regulators should focus on consistency between the number, its method and the confidence attached to it. ESG disclosure becomes decision-useful when uncertainty is described with the same care as performance, rather than hidden behind a precise decimal.`,
    wordLimit: 90,
    model:
      "Environmental reports mix measured data with estimates, yet equal precision can falsely imply equal certainty. Issuers should disclose measurement boundaries, assumptions and estimated proportions. Comparability depends on explaining differences and whether trends arise from real improvement, changed methods or narrower coverage; restatement may preserve honesty after methodological change. External assurance helps only when its scope is clear, since checking arithmetic differs from verifying source evidence. Regulation should align each number with its method and confidence. ESG information becomes useful when uncertainty is reported as carefully as performance.",
  },
  {
    id: "pre-16",
    passage: `Business decisions now occur through messaging applications that were designed for conversation, not record retention. A blanket instruction never to discuss work on such channels is easy to issue and often impossible to follow, particularly during travel or an operational incident. When formal systems are slow, employees will choose the tool that allows the decision to be made.

Books-and-records policy should begin by identifying communications that evidence an order, approval, recommendation or conflict. Approved channels for those matters must be usable on ordinary devices and capable of capture. If an urgent decision occurs elsewhere, the employee should transfer the substance promptly into the official record. Repeated use of disappearing messages for regulated activity should attract stronger consequences than an accidental message that is properly regularised.

Monitoring must remain proportionate. Collecting every private conversation would invade personal life without guaranteeing a complete business record, especially where employees use several devices. Training, periodic certification and targeted review can support technical capture. The aim is not to preserve every greeting. It is to reconstruct material decisions and responsibility. Recordkeeping succeeds when compliant communication is practical and evasion is detectable, not when a severe policy exists only in the staff handbook.`,
    wordLimit: 100,
    model:
      "Messaging applications facilitate business decisions but were not built for retention, and absolute bans are often unrealistic when formal systems are inconvenient. Recordkeeping rules should identify communications evidencing orders, approvals, recommendations or conflicts and provide usable approved channels that capture them. Urgent decisions made elsewhere should be promptly transferred, while repeated use of disappearing messages deserves stronger treatment than a corrected accident. Universal collection would invade privacy without ensuring completeness. Proportionate capture, training, certification and targeted review should preserve material decisions and accountability by making compliance practical and deliberate evasion detectable.",
  },
  {
    id: "pre-17",
    passage: `Market data is produced by trading activity, yet access to it is frequently sold as a specialised product. Exchanges need revenue to maintain reliable feeds, but pricing can affect competition when a new broker, researcher or trading venue cannot obtain information on terms comparable to established firms.

Fair access does not require every user to receive every feed without charge. Real-time, depth and historical products impose different costs and serve different purposes. The concern arises when fee structures are opaque, discounts depend on private negotiation, or basic regulatory obligations effectively force intermediaries to buy an expensive bundle. A faster premium feed also deserves scrutiny if the slower public feed is deliberately degraded rather than naturally cheaper to provide.

Oversight should require published categories, objective eligibility and enough cost explanation to test discrimination. It should also recognise investment in data quality and security, since price control that weakens the feed would harm the whole market. Market data policy must balance infrastructure funding with contestability. Information generated at a common trading venue should not become a barrier that protects incumbents merely because they were first able to afford it.`,
    wordLimit: 90,
    model:
      "Exchanges require revenue for dependable market-data services, but pricing may hinder competition when newer participants cannot obtain comparable access. Fairness does not imply free access because real-time, depth and historical products differ in cost and purpose. Problems arise from opaque fees, privately negotiated discounts, compulsory bundles or deliberate degradation of public feeds to favour premium products. Oversight should seek published categories, objective eligibility and cost explanations while preserving incentives for quality and security. Data generated at a common venue should fund infrastructure without becoming an artificial barrier protecting established firms.",
  },
  {
    id: "pre-18",
    passage: `Outcome-based regulation is attractive because technology and business models change faster than detailed rules. An instruction to maintain effective risk controls appears more durable than a catalogue of prescribed systems. Yet an outcome without evidence can become a phrase that every institution claims to satisfy until a failure proves otherwise.

The regulator should pair outcomes with demonstrable capabilities. An intermediary asked to protect client assets might show daily reconciliations, separation of authority and tested escalation for differences. The precise software can vary, but the evidence should establish who acted, how exceptions were resolved and whether management saw recurring weaknesses. Minimum controls remain justified where experience shows that voluntary interpretation repeatedly omits an essential safeguard.

Prescriptive rules also require review. A control that once reduced risk may become a ritual after systems change, consuming resources while creating false comfort. Periodic withdrawal of obsolete prescriptions is as important as adding new ones. The durable approach is neither unrestricted discretion nor an expanding manual. It states the public outcome, identifies credible evidence and updates minimum safeguards when actual failures reveal what judgement alone did not supply.`,
    wordLimit: 90,
    model:
      "Outcome-based rules adapt to changing technology but become empty if institutions can claim compliance without evidence. Regulators should link outcomes to demonstrable capabilities such as reconciliations, separated authority, escalation and records showing how exceptions reached management. Software may vary, though minimum controls remain warranted where discretion repeatedly omits essential safeguards. Prescriptive requirements must also be removed when technological change turns them into costly rituals. Durable regulation combines a clear public outcome, credible evidence and revised minimum safeguards informed by actual failures, avoiding both unchecked discretion and endless detailed manuals.",
  },
  {
    id: "pre-19",
    passage: `Automation of corporate actions is usually justified by efficiency. Dividends, rights issues and redemptions involve dates, rates, eligibility rules and large numbers of accounts, so manual processing invites error. The danger is that an incorrect instruction can also be distributed automatically to every account before any person notices.

Reliable automation should concentrate human attention on exceptions rather than remove it from the process. Systems can compare issuer announcements with depository records, reject impossible dates and flag unusual rate changes. A responsible officer should review unresolved differences, and release authority should be separate from the person who entered a manual override. Reconciliation after payment remains necessary because successful transmission does not prove correct receipt.

Responsibility must also survive the chain of issuer, registrar, depository and intermediary. Each participant should record the version received, transformations applied and acknowledgements returned. Without such traceability, every entity can show that its own screen was green while investors remain unpaid. Automation is sound when it makes errors visible, bounded and reversible. Speed alone merely allows a common mistake to travel farther before accountability catches it.`,
    wordLimit: 90,
    model:
      "Corporate-action automation reduces manual error across dividends, rights issues and redemptions, but can rapidly distribute one incorrect instruction to all accounts. Systems should validate dates and rates, compare source records and direct human attention to exceptions. Manual overrides require separate release authority, and post-payment reconciliation remains essential. Issuers, registrars, depositories and intermediaries must preserve received versions, transformations and acknowledgements so responsibility cannot disappear between systems. Good automation makes mistakes visible, limited and reversible; transmission speed without traceability only spreads error before accountability can respond.",
  },
  {
    id: "pre-20",
    passage: `A backup is often counted as evidence of cyber resilience. Its real value appears only when an institution can restore it into a trustworthy environment. Ransomware may remain undetected long enough to enter several backup generations, while compromised administrator accounts can corrupt both production data and the systems intended for recovery.

Restoration tests should therefore assume that ordinary credentials and parts of the network are unsafe. An isolated environment, independently controlled keys and verified software images may be needed before records are loaded. The institution must then reconcile restored positions and transactions against external sources; a system that starts successfully but contains an earlier ledger is not ready for the market.

Recovery priorities should follow critical functions rather than convenience. Public communication must explain which services and records are current, because premature reopening can multiply disputed trades. Regulators should seek evidence of full restoration drills, including the time required and the discrepancies found, instead of accepting a certificate that copies were created. Cyber recovery is not the return of blinking servers. It is the return of reliable market state under controlled authority.`,
    wordLimit: 90,
    model:
      "Backups provide cyber resilience only when they can be restored into a trusted environment. Ransomware and compromised administrators may contaminate several generations and recovery systems. Tests should assume unsafe networks and credentials, using isolation, independent keys and verified images before loading data. Restored positions must be reconciled externally because a functioning system may contain an outdated ledger. Recovery should prioritise critical functions and communicate record currency before reopening. Regulators need evidence from complete restoration drills, including time and discrepancies, since true recovery means reliable market state under controlled authority, not merely active servers.",
  },
  {
    id: "pre-21",
    passage: `Companies increasingly present adjusted measures to explain performance that statutory accounts allegedly obscure. Excluding a one-time cost may help investors understand continuing operations. Repeatedly excluding restructuring, customer acquisition or share-based payment, however, can turn an ordinary expense into a permanent exception.

Regulation should not prohibit every measure outside accounting standards. Management may possess useful insight into how it evaluates the business. That insight becomes credible when the measure has a stable definition, reconciles clearly to audited figures and appears with no greater prominence than the statutory result. If the definition changes, the reason and effect on prior periods should be shown.

Supervisors should examine consistency across good and bad years. A measure designed only after profits disappoint is less informative than one used internally and reported over time. Boards and audit committees should approve definitions because presentation choices can influence remuneration and market expectations. Alternative measures should illuminate the accounts, not compete with them. Disclosure is fair when investors can see both management's analytical lens and every adjustment through which that lens was constructed.`,
    wordLimit: 90,
    model:
      "Adjusted performance measures can explain continuing operations, but recurring exclusions may disguise ordinary costs as exceptions. They should not be banned because management's analytical view can be useful. Credibility requires stable definitions, clear reconciliation to audited figures and no greater prominence than statutory results; changes should explain effects on prior periods. Supervisors should test consistency across favourable and weak years, while boards and audit committees should approve definitions that may affect pay and expectations. Such measures should clarify, not rival, accounts by making management's perspective and all adjustments transparent.",
  },
  {
    id: "pre-22",
    passage: `Investor complaints are often treated as individual files to be closed within a deadline. Timely redress matters, but closure statistics can hide a product or process that repeatedly creates the same grievance. Ten small complaints about failed withdrawals may reveal more operational risk than one large dispute with unusual facts.

Complaint systems should therefore preserve structured information about the product, channel, issue, resolution and time taken at each stage. Similar cases can then be grouped without denying individual review. A sudden rise in password-reset complaints may point to attempted account takeover; repeated suitability complaints may expose an incentive problem rather than widespread customer misunderstanding.

Intermediaries should be required to show how complaint patterns reach product managers and senior management. Refunds alone may compensate past harm while leaving the faulty journey unchanged. Regulators, in turn, should avoid crude league tables that encourage firms to recategorise complaints or discourage reporting. The proper measure is whether evidence from grievances changes controls, design or supervision. A complaint is both a claim by one investor and a low-cost sensor of conditions affecting many others.`,
    wordLimit: 90,
    model:
      "Closing investor complaints promptly is necessary, but aggregate closure rates may conceal recurring product or process failures. Structured records of products, channels, issues, resolutions and delay allow similar cases to reveal operational, security or incentive problems. Patterns should reach product managers and senior management because refunds address past harm without repairing faulty systems. Regulators should avoid simplistic rankings that encourage reclassification or suppressed reporting. Effective complaint handling uses each grievance both as an individual claim requiring redress and as a supervisory signal capable of changing controls, design and oversight.",
  },
  {
    id: "pre-23",
    passage: `Penalties for failed settlement encourage participants to deliver cash and securities on time. When a security is genuinely scarce, however, a penalty does not create it. Repeated charges may simply move through the chain from a seller to a broker and finally to a client, while the underlying shortage continues.

A mature settlement framework combines deterrence with mechanisms for obtaining temporary supply. Transparent securities lending, predictable auction procedures and early notice of likely failure allow obligations to be completed without rewarding deliberate non-delivery. Charges should increase where a participant repeatedly sells without arrangements, but an isolated operational error should not be treated like a strategy that relies on failing.

Data should identify whether failures cluster by security, intermediary, client type or stage of processing. A market-wide shortage calls for different action from a weak broker control. Regulators should also watch whether borrowing is concentrated among a few providers able to demand excessive terms. Settlement discipline is strongest when participants expect both a credible consequence for avoidable failure and an orderly route to cure genuine scarcity. Punishment without diagnosis may raise costs while leaving delivery no more reliable.`,
    wordLimit: 90,
    model:
      "Settlement penalties deter late delivery but cannot create genuinely scarce securities and may merely pass costs to clients. A sound framework combines consequences with transparent lending, predictable auctions and early warning so temporary supply can cure shortages. Repeated sales without delivery arrangements deserve stronger charges than isolated operational errors. Supervisors should analyse whether failures cluster by security, intermediary, client or processing stage and monitor concentration among lenders. Reliable settlement requires diagnosis, a proportionate penalty for avoidable failure and an orderly cure for scarcity; punishment alone may increase costs without improving delivery.",
  },
  {
    id: "pre-24",
    passage: `Electronic books and records can be altered without the visible marks left on paper. An access log helps, but a privileged administrator may be able to change both the record and the log that describes the change. Retention measured only by years says little about whether the stored account can still be trusted.

Integrity requires layers. Important events should carry reliable time, source and sequence information, and later corrections should create new entries rather than overwrite history. Cryptographic checks can reveal alteration, while copies held under separate authority can prevent one compromised account from rewriting every version. These controls do not prove that the original statement was true; they prove what was recorded and whether it was subsequently changed.

Long retention also creates practical duties. Formats, keys and explanatory metadata must remain usable after software and staff have changed. Periodic retrieval tests should confirm that an investigator can reconstruct a transaction without depending on the vendor that built the old system.

Technology cannot replace accountable custody. Named officers must own retention schedules, legal holds, access review and authorised disposal. Trustworthy electronic records arise from the combination of tamper evidence, reproducibility and institutional responsibility, not from a storage claim that data have been kept somewhere for the prescribed period.`,
    wordLimit: 110,
    model:
      "Electronic records may be altered together with their logs, so retention duration alone does not establish trust. Critical events should preserve time, source and sequence, while corrections should add entries instead of overwriting history. Cryptographic checks and separately controlled copies can expose or limit alteration, though they establish record integrity rather than original truth. Long-term usability also requires preserved formats, keys, metadata and retrieval tests independent of former vendors. Named officers must govern schedules, legal holds, access and disposal. Reliable electronic books combine tamper evidence, reproducible reconstruction and accountable institutional custody.",
  },
];
