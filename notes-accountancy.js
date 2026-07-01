const ACCOUNTANCY_NOTES = [
    {
        title: "Chapter 1: Accounting for Partnership Firms (Fundamentals)",
        content: `
            <h4>1. Comprehensive Definition of Partnership</h4>
            <p>According to Section 4 of the Indian Partnership Act, 1932, <strong>Partnership</strong> is defined as "the relation between persons who have agreed to share the profits of a business carried on by all or any of them acting for all." Individuals who have entered into partnership with one another are called individually "partners" and collectively "a firm", and the name under which their business is carried on is called the "firm name".</p>
            <p><strong>Essential Characteristics of Partnership:</strong></p>
            <ul>
                <li><strong>Two or More Persons:</strong> There must be at least two competent persons to form a partnership. According to Companies Miscellaneous Rules 2014, the maximum number of partners is restricted to 50. Minors, persons of unsound mind, and persons disqualified by law cannot enter into a partnership contract.</li>
                <li><strong>Agreement:</strong> Partnership is the result of an agreement (written or oral). It does not arise from status or operation of law.</li>
                <li><strong>Existence of Business and Profit Motive:</strong> The agreement must be to carry on some lawful business or profession with the intention of earning profits. Co-ownership of property does not constitute a partnership unless business is carried on.</li>
                <li><strong>Sharing of Profits:</strong> The agreement must aim at sharing profits. If a person is deprived of a share of profits, they cannot be a partner. Sharing of losses is not essential, as a partner can be admitted for profits only.</li>
                <li><strong>Mutual Agency:</strong> This is the cardinal test of partnership. The business must be carried on by all or any of them acting for all. This means each partner is both an agent (capable of binding other partners by their acts) and a principal (bound by the acts of other partners).</li>
            </ul>

            <h4>2. Partnership Deed and Legal Rules</h4>
            <p>The <strong>Partnership Deed</strong> is a written document that contains the terms of the agreement between the partners. It is also known as the <em>Articles of Partnership</em>. Although the law does not make it compulsory to have a written deed, it is highly recommended to avoid misunderstandings and legal disputes. It typically contains details like name of the firm, nature of business, capital contribution of each partner, profit-sharing ratio, interest on capital/drawings, salaries, audit procedures, and rules for dissolution.</p>
            
            <h4>3. Provisions Applicable in the Absence of a Partnership Deed</h4>
            <p>If partners do not draft a Partnership Deed, or if the deed is silent on specific matters, the provisions of the Indian Partnership Act, 1932 apply automatically:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 12px 0;">
                <thead>
                    <tr>
                        <th style="border: 1px solid var(--border); padding: 8px;">Matter / Issue</th>
                        <th style="border: 1px solid var(--border); padding: 8px;">Provision Applicable</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border: 1px solid var(--border); padding: 8px;">Sharing of Profits & Losses</td>
                        <td style="border: 1px solid var(--border); padding: 8px;">Profits and losses are to be shared equally among all partners, regardless of capital contribution.</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid var(--border); padding: 8px;">Interest on Capital (IOC)</td>
                        <td style="border: 1px solid var(--border); padding: 8px;">No interest on capital is allowed to any partner. If the deed allows it, it is paid only out of profits.</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid var(--border); padding: 8px;">Interest on Drawings (IOD)</td>
                        <td style="border: 1px solid var(--border); padding: 8px;">No interest is charged on drawings made by partners.</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid var(--border); padding: 8px;">Interest on Partner's Loan</td>
                        <td style="border: 1px solid var(--border); padding: 8px;">Allowed at a fixed rate of <strong>6% per annum</strong>. This is a charge against profit, meaning it must be paid even in case of losses.</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid var(--border); padding: 8px;">Salary / Commission to Partners</td>
                        <td style="border: 1px solid var(--border); padding: 8px;">No partner is entitled to any salary, commission, or remuneration for taking part in business operations.</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid var(--border); padding: 8px;">Admission of a New Partner</td>
                        <td style="border: 1px solid var(--border); padding: 8px;">A new partner can only be admitted with the consent of all existing partners.</td>
                    </tr>
                </tbody>
            </table>

            <h4>4. Special Accounting Treatments</h4>
            <p><strong>P&L Appropriation Account:</strong> This is a nominal account prepared after the P&L Account. It starts with the Net Profit/Loss transferred from the P&L Account. It is debited with Interest on Capital, Partner Salaries, Commissions, and transfers to reserves. It is credited with Interest on Drawings. The remaining distributable profit is divided among partners in their profit-sharing ratio.</p>
            <p><strong>Fixed vs. Fluctuating Capitals:</strong></p>
            <ul>
                <li><strong>Fixed Capital Method:</strong> Capital accounts are only altered by additional capital introduction or permanent withdrawal. Two accounts are maintained for each partner:
                    <ol>
                        <li><em>Capital Account:</em> Records only capital contributions.</li>
                        <li><em>Current Account:</em> Records all adjustments like interest, drawings, salaries, share of profits.</li>
                    </ol>
                </li>
                <li><strong>Fluctuating Capital Method:</strong> Only one Capital Account is maintained for each partner. All transactions (drawings, interest, salaries, profits) are recorded directly in this account, causing the balance to fluctuate constantly.</li>
            </ul>

            <h4>5. Goodwill: Concept, Factors, and Valuation Methods</h4>
            <p>Goodwill is an intangible asset that represents the value of a firm's reputation and business connections, allowing it to earn higher profits (super profits) than a new or normal firm. Factors affecting goodwill include managerial skill, quality of products, favorable location, market monopoly, and long-term contracts.</p>
            <p><strong>Methods of Valuation:</strong></p>
            <ul>
                <li><strong>Average Profit Method:</strong> 
                    <ul>
                        <li>Simple Average: <span class="formula-box">Goodwill = Average Profit × No. of Years' Purchase</span></li>
                        <li>Weighted Average (used when profits show a rising or falling trend): <span class="formula-box">Goodwill = Weighted Average Profit × No. of Years' Purchase</span></li>
                    </ul>
                </li>
                <li><strong>Super Profit Method:</strong> Calculates excess earnings above normal industry profits:
                    <div class="formula-box">
                        Normal Profit = Capital Employed × (Normal Rate of Return / 100)<br>
                        Super Profit = Average Actual Profit - Normal Profit<br>
                        Goodwill = Super Profit × No. of Years' Purchase
                    </div>
                </li>
                <li><strong>Capitalization Method:</strong>
                    <ul>
                        <li>Capitalization of Average Profit: <span class="formula-box">Capitalized Value = (Average Profit × 100) / Normal Rate of Return. Goodwill = Capitalized Value - Net Assets.</span></li>
                        <li>Capitalization of Super Profit: <span class="formula-box">Goodwill = (Super Profit × 100) / Normal Rate of Return.</span></li>
                    </ul>
                </li>
            </ul>

            <h4 style="color: #a78bfa;">Short Answer Questions (1-2 Marks)</h4>
            <div class="warn-box"><strong>Q1. State the minimum and maximum number of partners in a partnership firm.</strong><br><em>Ans:</em> The minimum number of partners is 2. The maximum number is limited to 50 under the Companies (Miscellaneous) Rules, 2014.</div>
            <div class="warn-box"><strong>Q2. What is meant by Mutual Agency in partnership?</strong><br><em>Ans:</em> It means that every partner acts as both an agent of the other partners (binding them by their actions) and a principal (being bound by the actions of other partners).</div>
            <div class="warn-box"><strong>Q3. Why is a Partnership Deed important?</strong><br><em>Ans:</em> It is important because it regulates the rights, duties, and liabilities of partners, and acts as a legal reference to resolve conflicts and disputes.</div>
            <div class="warn-box"><strong>Q4. How is Interest on Partner's Loan treated in accounts?</strong><br><em>Ans:</em> It is treated as a charge against profit, meaning it is debited to the Profit & Loss Account (not P&L Appropriation) and must be paid even in case of a net loss.</div>
            <div class="warn-box"><strong>Q5. Distinguish between Charge against Profit and Appropriation of Profit.</strong><br><em>Ans:</em> A charge against profit is an expense that must be paid regardless of profit (e.g., manager's salary, interest on loan). An appropriation is a distribution of profit made only if profits are earned (e.g., partner's salary, transfer to reserve).</div>
            <div class="warn-box"><strong>Q6. Define Capital Employed.</strong><br><em>Ans:</em> It is the total capital investment made by partners in the firm. Formula: Capital Employed = Total Assets - External Liabilities (or Partners' Capital + Reserves).</div>

            <h4 style="color: #f472b6;">Long Answer Questions (3-6 Marks)</h4>
            <div class="warn-box"><strong>Q1. Explain the legal rules regarding division of profits, interest on capital, drawings, salary, and loan in the absence of a written partnership agreement.</strong><br><em>Ans:</em> In the absence of a written agreement, the Indian Partnership Act, 1932 mandates the following rules:
            1. **Profit/Loss Sharing:** All profits and losses are shared equally among partners, irrespective of their capital contribution.
            2. **Interest on Capital:** No partner is allowed any interest on their capital.
            3. **Interest on Drawings:** No interest is charged on the drawings made by partners.
            4. **Partner Salary/Remuneration:** No partner is entitled to salary, commission, or allowance for participating in the business.
            5. **Interest on Partner's Loan:** If a partner advances a loan to the firm, they receive interest at 6% p.a. as a compulsory charge.</div>
            <div class="warn-box"><strong>Q2. Distinguish between Fixed Capital and Fluctuating Capital Accounts in detail.</strong><br><em>Ans:</em> 
            1. **Number of Accounts:** Under the Fixed method, two accounts (Capital and Current) are maintained. Under Fluctuating, only one Capital Account is kept.
            2. **Adjustments:** Fixed capital records only capital additions/withdrawals in the Capital account, with drawings, interest, and salaries going to the Current account. Fluctuating capital records all these adjustments directly in the Capital account.
            3. **Account Balance:** Fixed capital account balances generally do not change year-over-year. Fluctuating balances change constantly with every transaction.
            4. **Negative Balance:** Fixed capital account balance can never show a debit (negative) balance. A Current account or fluctuating capital account can show a negative balance.</div>
            <div class="warn-box"><strong>Q3. Explain the different methods of valuing Goodwill of a partnership firm with formulas.</strong><br><em>Ans:</em> 
            1. **Average Profit Method:** Simple Average = (Total Profits / No. of Years). Goodwill = Simple Average Profit × No. of Years' Purchase.
            2. **Weighted Average Profit Method:** Weighted Average = (Total of Weighted Profits / Total weights). Goodwill = Weighted Average Profit × No. of Years' Purchase.
            3. **Super Profit Method:** Super Profit = Average Profit - Normal Profit (where Normal Profit = Capital Employed × Normal Rate of Return / 100). Goodwill = Super Profit × No. of Years' Purchase.
            4. **Capitalization of Average Profit:** Capitalized Value = (Average Profit × 100) / Normal Rate of Return. Goodwill = Capitalized Value - Net Assets.
            5. **Capitalization of Super Profit:** Goodwill = (Super Profit × 100) / Normal Rate of Return.</div>
            <div class="warn-box"><strong>Q4. How is interest on drawings calculated under different cases of regular drawings?</strong><br><em>Ans:</em> Formula: Interest = Total Drawings × Rate/100 × Average Period/12.
            * **Case 1: Monthly Drawings:** 
              - Beginning of every month: Average Period = (12 + 1) / 2 = 6.5 months.
              - Middle of every month: Average Period = (11.5 + 0.5) / 2 = 6.0 months.
              - End of every month: Average Period = (11 + 0) / 2 = 5.5 months.
            * **Case 2: Quarterly Drawings:**
              - Beginning of every quarter: Average Period = (12 + 3) / 2 = 7.5 months.
              - Middle of every quarter: Average Period = (10.5 + 1.5) / 2 = 6.0 months.
              - End of every quarter: Average Period = (9 + 0) / 2 = 4.5 months.</div>
            <div class="warn-box"><strong>Q5. Draw up the format of a Profit and Loss Appropriation Account and explain its adjustments.</strong><br><em>Ans:</em> The P&L Appropriation Account is structured as follows:
            * **Credit Side:** Net Profit (from P&L A/c), Interest on Drawings (debited to partners' capital).
            * **Debit Side:** Net Loss (if any), Interest on Capital, Partner Salaries, Partner Commissions, Transfer to Reserves.
            * **Balance:** The remaining balance is the divisible profit, distributed to partners' capital accounts in their profit-sharing ratio. It operates strictly as an appropriation of profits.</div>
            <div class="warn-box"><strong>Q6. Discuss the legal rights of a partner in a partnership firm.</strong><br><em>Ans:</em> A partner has the following rights under the Act:
            1. Right to participate in the conduct and management of the business.
            2. Right to be consulted and express opinion on business matters.
            3. Right to inspect and copy book of accounts of the firm.
            4. Right to share profits equally or in the agreed ratio.
            5. Right to receive interest at 6% p.a. on loans advanced to the firm.
            6. Right to prevent the admission of a new partner.
            7. Right to retire from the firm after giving proper notice.</div>

            <h4 style="color: #34d399;">Bonus Question</h4>
            <div class="warn-box"><strong>Bonus Q: Explain the concept of 'Past Adjustments' and how errors/omissions of interest or salaries are rectified.</strong><br><em>Ans:</em> Past adjustments are corrections made when error or omission (like omitting interest on capital, interest on drawings, or partner salaries) is discovered after the accounts have been closed. Instead of altering the closed accounts, a **rectification journal entry** is passed at the beginning of the next accounting year. A "Statement Showing Adjustments" is prepared to find the net debit or credit effect on each partner's capital account, and an entry is passed: Debited Partner's Capital/Current A/c Dr. to Credited Partner's Capital/Current A/c.</div>
        `
    },
    {
        title: "Chapter 2: Accounting for Share Capital",
        content: `
            <h4>1. Legal Nature of a Joint Stock Company</h4>
            <p>A <strong>Company</strong> is defined under Section 2(20) of the Companies Act, 2013 as "a company incorporated under this Act or under any previous company law." It is an artificial person created by law, possessing a separate legal identity distinct from its members, perpetual succession (the company continues to exist even if all members die), and a common seal representing its formal signature.</p>
            <p><strong>Classification of Companies:</strong></p>
            <ul>
                <li><strong>One Person Company (OPC):</strong> A company with only one person as a member (Section 2(62)).</li>
                <li><strong>Private Company:</strong> Section 2(68) defines it as a company that restricts the transfer of shares, has a minimum of 2 and maximum of 200 members, and prohibits inviting the public to subscribe to its securities.</li>
                <li><strong>Public Company:</strong> Section 2(71) defines it as a company which is not a private company, has a minimum of 7 members and no maximum limit, and is allowed to invite the public to subscribe to its shares/debentures.</li>
            </ul>

            <h4>2. Categories of Share Capital and Subscriptions</h4>
            <p>Share Capital refers to the capital raised by a company through the issue of shares. It is presented in the Balance Sheet under the following categories:</p>
            <ol>
                <li><strong>Authorized / Nominal Capital:</strong> The maximum amount of share capital a company is registered to issue. It is stated in the Memorandum of Association (Objects/Capital Clause).</li>
                <li><strong>Issued Capital:</strong> The part of authorized capital offered to the public for subscription.</li>
                <li><strong>Subscribed Capital:</strong> The part of issued capital applied for by the public. Classified into:
                    <ul>
                        <li><em>Subscribed and Fully Paid:</em> When the company has called the full face value and received it.</li>
                        <li><em>Subscribed but not Fully Paid:</em> When the company has either not called the full face value, or a shareholder has failed to pay the called-up amount.</li>
                    </ul>
                </li>
            </ol>
            <p><strong>Minimum Subscription:</strong> According to Section 39 of the Companies Act, 2013, a company cannot allot shares to the public unless the minimum subscription (fixed by SEBI at **90%** of the issued amount) is subscribed and received within 30 days of the prospectus issue.</p>

            <h4>3. Issue of Shares: Process and Prices</h4>
            <p>Shares can be issued at par (issue price = face value) or at a premium (issue price > face value). Premium is credited to the <strong>Securities Premium Reserve A/c</strong>. Section 52(2) restricts the use of this reserve to:</p>
            <ul>
                <li>Issuing fully paid bonus shares.</li>
                <li>Writing off preliminary expenses or expenses on issue of shares.</li>
                <li>Providing for premium payable on redemption of debentures or preference shares.</li>
                <li>Buying back its own shares.</li>
            </ul>

            <h4>4. Forfeiture, Reissue, and Capital Reserve</h4>
            <p>If a shareholder fails to pay the allotment or call money on their shares, the Board of Directors can forfeit (cancel) their shares after giving proper notice. Upon forfeiture:</p>
            <ul>
                <li>Share Capital Account is debited with the amount **called up** on the forfeited shares.</li>
                <li>Securities Premium A/c is debited only if it was called but **not received**.</li>
                <li>Calls-in-Arrears A/c is credited with the **unpaid amount**.</li>
                <li>Forfeited Shares Account is credited with the **amount already paid** by the shareholder.</li>
            </ul>
            <p>When forfeited shares are reissued, any discount allowed on reissue is debited to the Forfeited Shares A/c (discount cannot exceed the forfeited amount). The remaining balance in the Forfeited Shares A/c represents a capital gain and is transferred to the **Capital Reserve Account**.</p>

            <h4 style="color: #a78bfa;">Short Answer Questions (1-2 Marks)</h4>
            <div class="warn-box"><strong>Q1. What is an artificial person in the context of a company?</strong><br><em>Ans:</em> A company is called an artificial person because it is created by legal process and has legal rights (to own property, sue, and be sued) similar to a natural person, although it has no physical body.</div>
            <div class="warn-box"><strong>Q2. What are the rules regarding the issue of shares at a discount?</strong><br><em>Ans:</em> Under Section 53 of the Companies Act, 2013, a company cannot issue shares at a discount. Any such issue is void, except in the case of Sweat Equity Shares issued to employees or directors.</div>
            <div class="warn-box"><strong>Q3. Explain the term 'Calls-in-Arrears'.</strong><br><em>Ans:</em> It is the part of called-up capital that has not been paid by shareholders by the due date. It is deducted from Subscribed Capital in the Balance Sheet.</div>
            <div class="warn-box"><strong>Q4. Define 'Calls-in-Advance'.</strong><br><em>Ans:</em> It refers to money paid by a shareholder to the company before the company formally calls for it. It is shown as a Current Liability in the Balance Sheet.</div>
            <div class="warn-box"><strong>Q5. What is the maximum discount a company can offer on the reissue of forfeited shares?</strong><br><em>Ans:</em> The maximum discount allowed on reissue cannot exceed the amount already received (forfeited) on those shares.</div>
            <div class="warn-box"><strong>Q6. Define Reserve Capital.</strong><br><em>Ans:</em> Reserve Capital is a part of uncalled share capital which a company resolves by special resolution not to call up except in the event of winding up.</div>

            <h4 style="color: #f472b6;">Long Answer Questions (3-6 Marks)</h4>
            <div class="warn-box"><strong>Q1. Explain the legal provisions and accounting entries for the forfeiture of shares issued at a premium.</strong><br><em>Ans:</em> When shares issued at a premium are forfeited, the treatment of premium depends on whether it has been received:
            1. **Premium Received:** If the premium has already been received, it cannot be cancelled or debited. It remains in the Securities Premium Reserve. Entry: Share Capital A/c Dr (Called-up value) to Calls-in-Arrears A/c (Unpaid amount) to Forfeited Shares A/c (Paid amount).
            2. **Premium Not Received:** If the premium was called but not paid, it must be debited to cancel the premium. Entry: Share Capital A/c Dr (Called-up value) & Securities Premium A/c Dr (Unpaid premium) to Calls-in-Arrears A/c to Forfeited Shares A/c.</div>
            <div class="warn-box"><strong>Q2. Discuss the concept of Over-subscription and detail the Pro-rata Allotment procedure.</strong><br><em>Ans:</em> Over-subscription is when a company receives applications for more shares than it offered. To handle this, the company can perform a **Pro-rata Allotment**, which is a proportional allotment of shares to all applicants. For example, if a company offers 10,000 shares and receives applications for 15,000, it can allot shares in a 2:3 ratio. The excess application money is not refunded but is carried forward and adjusted against the allotment and call money due from the shareholders. If the excess money is still left after allotment and calls, it is refunded.</div>
            <div class="warn-box"><strong>Q3. Distinguish between Equity Shares and Preference Shares in detail.</strong><br><em>Ans:</em> 
            1. **Dividend Priority:** Preference shares have a prior right to receive dividends before equity shares. Equity shares receive dividends only after preference dividends are paid.
            2. **Dividend Rate:** Preference shares have a fixed rate of dividend (e.g., 9% Preference Shares). Equity shares have a fluctuating rate depending on company profits.
            3. **Repayment of Capital:** On winding up, preference capital is repaid before equity capital.
            4. **Voting Rights:** Equity shares have voting rights on all matters. Preference shares only vote on matters directly affecting their rights.
            5. **Redemption:** Preference shares are redeemable; equity shares are not redeemed during the company's lifetime (except buyback).</div>
            <div class="warn-box"><strong>Q4. Explain the accounting treatment of shares issued for consideration other than cash.</strong><br><em>Ans:</em> Sometimes a company acquires assets or businesses and issues shares to the vendors instead of cash. Accounting entries:
            1. **Purchase of Assets:** Asset A/c Dr. to Vendor A/c. (If buying a business: Assets Dr, Goodwill Dr (if purchase price > assets) to Liabilities to Vendor to Capital Reserve (if purchase price < assets)).
            2. **Allotment of Shares:**
               - *At Par:* Vendor A/c Dr. to Share Capital A/c.
               - *At Premium:* Vendor A/c Dr. to Share Capital A/c to Securities Premium Reserve A/c.
               Number of Shares to Issue = Purchase Consideration / Issue Price per Share.</div>
            <div class="warn-box"><strong>Q5. Write detailed journal entries for the issue of shares from Application to Call stages.</strong><br><em>Ans:</em> 
            1. **On Receipt of Application Money:** Bank A/c Dr. to Share Application A/c.
            2. **On Allotment of Shares:** Share Application A/c Dr. to Share Capital A/c (and to Securities Premium Reserve if premium).
            3. **On Allotment Money Due:** Share Allotment A/c Dr. to Share Capital A/c.
            4. **On Receipt of Allotment Money:** Bank A/c Dr. to Share Allotment A/c.
            5. **On Call Money Due:** Share First/Final Call A/c Dr. to Share Capital A/c.
            6. **On Receipt of Call Money:** Bank A/c Dr. to Share First/Final Call A/c (with Calls-in-Arrears debited if any unpaid).</div>
            <div class="warn-box"><strong>Q6. Distinguish between Reserve Capital and Capital Reserve.</strong><br><em>Ans:</em> 
            1. **Creation:** Reserve Capital is created out of uncalled capital; Capital Reserve is created out of capital profits (e.g., sale of fixed assets, reissue of shares).
            2. **Resolution:** Reserve Capital requires a special resolution to be passed; Capital Reserve is created automatically out of capital profits.
            3. **Calling:** Reserve Capital can only be called up at the time of winding up; Capital Reserve is already called and received.
            4. **Disclosure:** Capital Reserve is shown under "Reserves and Surplus" in the Balance Sheet; Reserve Capital is not shown in the balance sheet, only in the uncalled capital notes.</div>

            <h4 style="color: #34d399;">Bonus Question</h4>
            <div class="warn-box"><strong>Bonus Q: What is an Under-subscription? What is its effect on accounting entries?</strong><br><em>Ans:</em> Under-subscription occurs when the public applies for fewer shares than the company offered (e.g., company issues 10,000 shares but gets applications for 9,500). As long as the minimum subscription of 90% is met, the company can proceed with allotment. The key effect is that **all accounting entries (application, allotment, calls) are made based on the number of shares applied for (9,500)**, not the number of shares offered (10,000).</div>
        `
    },
    {
        title: "Chapter 3: Financial Statements of a Company",
        content: `
            <h4>1. Objectives of Financial Statements</h4>
            <p>Financial statements are the end product of accounting. They include the Balance Sheet, Statement of Profit & Loss, Notes to Accounts, and Cash Flow Statement. They must present a true and fair view of the company's financial state.</p>
            
            <h4>2. Schedule III Formats</h4>
            <p>Schedule III of the Companies Act, 2013 dictates a vertical format. This ensures uniformity, transparency, and easy comparability across companies.</p>

            <div class="tip-box">
                <strong>Key Summary:</strong> Company Balance Sheets classify items into Current and Non-Current categories based on an operating cycle of 12 months.
            </div>

            <h4 style="color: #a78bfa;">Short Answer Questions (1-2 Marks)</h4>
            <div class="warn-box"><strong>Q1. What is an Operating Cycle?</strong><br><em>Ans:</em> The time between the acquisition of assets for processing and their realization in cash or cash equivalents.</div>
            <div class="warn-box"><strong>Q2. Under what heading is 'Capital Reserve' shown?</strong><br><em>Ans:</em> Reserves and Surplus (under Shareholders' Funds).</div>
            <div class="warn-box"><strong>Q3. Where are 'Loose Tools' shown in the Balance Sheet?</strong><br><em>Ans:</em> Under Inventories (Current Assets).</div>
            <div class="warn-box"><strong>Q4. Under what head is 'Premium on Redemption of Debentures' shown?</strong><br><em>Ans:</em> Non-Current Liabilities (under Long-term Liabilities).</div>
            <div class="warn-box"><strong>Q5. What is the main heading for 'Public Deposits'?</strong><br><em>Ans:</em> Non-Current Liabilities (under Long-term Borrowings).</div>
            <div class="warn-box"><strong>Q6. Name the two parts of Schedule III.</strong><br><em>Ans:</em> Part I (Balance Sheet) and Part II (Statement of Profit and Loss).</div>

            <h4 style="color: #f472b6;">Long Answer Questions (3-6 Marks)</h4>
            <div class="warn-box"><strong>Q1. Explain the major heads of the Equity and Liabilities side of a Company Balance Sheet.</strong><br><em>Ans:</em> 
            1. **Shareholders' Funds:** Share Capital, Reserves & Surplus, Money received against share warrants.
            2. **Share Application Money Pending Allotment:** Funds received for shares not yet allotted.
            3. **Non-Current Liabilities:** Long-term debts, deferred tax liabilities, long-term provisions.
            4. **Current Liabilities:** Short-term borrowings, trade payables, short-term provisions.</div>
            <div class="warn-box"><strong>Q2. Discuss how current assets are classified under Schedule III.</strong><br><em>Ans:</em> Current Assets are classified into:
            1. Current Investments (securities held for < 12 months).
            2. Inventories (raw materials, work-in-progress, finished goods, loose tools).
            3. Trade Receivables (debtors and bills receivable).
            4. Cash and Cash Equivalents (cash in hand, bank balances).
            5. Short-term Loans and Advances.
            6. Other Current Assets (prepaid expenses).</div>
            <div class="warn-box"><strong>Q3. Explain the objective and importance of preparing Notes to Accounts.</strong><br><em>Ans:</em> Notes to Accounts provide detailed breakdowns of the figures presented in the Balance Sheet and Statement of Profit and Loss. They are important because they disclose critical accounting policies, specify share capital details, and explain calculations, ensuring complete transparency for stakeholders.</div>
            <div class="warn-box"><strong>Q4. How is the Statement of Profit and Loss structured under Part II of Schedule III?</strong><br><em>Ans:</em> It is structured vertically:
            1. Revenue from Operations + Other Income = Total Revenue.
            2. Deduct Expenses (Cost of materials, Employee benefits, Finance costs, Depreciation).
            3. Total Revenue - Total Expenses = Profit Before Tax (PBT).
            4. PBT - Tax Expense = Profit After Tax (PAT).</div>
            <div class="warn-box"><strong>Q5. Distinguish between Current and Non-Current Liabilities with examples.</strong><br><em>Ans:</em> 
            * **Current Liabilities:** Settled within 12 months or the operating cycle (e.g., Trade Payables, Bills Payable, Bank Overdraft).
            * **Non-Current Liabilities:** Due for settlement after 12 months or the operating cycle (e.g., Long-term Bank Loans, Debentures).</div>
            <div class="warn-box"><strong>Q6. What are the limitations of Financial Statements?</strong><br><em>Ans:</em> Limitations include:
            1. They reflect historical costs, not current values.
            2. Qualitative factors (employee skills, reputation) are ignored.
            3. They are subject to window dressing (manipulation of accounts).
            4. Inflationary effects are not adjusted.</div>

            <h4 style="color: #34d399;">Bonus Question</h4>
            <div class="warn-box"><strong>Bonus Q: In which heading of the Balance Sheet do we show 'Unclaimed Dividend'? Why?</strong><br><em>Ans:</em> Unclaimed Dividend is shown under **Current Liabilities** under the sub-heading **Other Current Liabilities**. This is because it represents a liability that must be paid to shareholders on demand, which is expected to occur within 12 months.</div>
        `
    },
    {
        title: "Chapter 4: Analysis of Financial Statements",
        content: `
            <h4>1. Financial Analysis & Ratio Analysis</h4>
            <p>Financial statement analysis involves interpreting financial data to evaluate a company's profitability, solvency, and efficiency. <strong>Ratio Analysis</strong> mathematically relates two items in the financial statements to facilitate comparison.</p>
            
            <h4>2. Liquidity, Solvency, and Profitability Ratios</h4>
            <p>Ratios are grouped into Liquidity Ratios (Current, Quick), Solvency Ratios (Debt-Equity, Proprietary), Activity Ratios (Turnovers), and Profitability Ratios (Gross/Net Profit %).</p>

            <div class="tip-box">
                <strong>Key Summary:</strong> Ratios offer standard benchmarks. A Current Ratio of 2:1 and a Quick Ratio of 1:1 are generally considered ideal for short-term financial safety.
            </div>

            <h4 style="color: #a78bfa;">Short Answer Questions (1-2 Marks)</h4>
            <div class="warn-box"><strong>Q1. What is the ideal Current Ratio?</strong><br><em>Ans:</em> 2:1 is the generally accepted ideal Current Ratio.</div>
            <div class="warn-box"><strong>Q2. State the formula for Debt-to-Equity Ratio.</strong><br><em>Ans:</em> Debt-Equity Ratio = Long-Term Debt / Shareholders' Funds.</div>
            <div class="warn-box"><strong>Q3. What is the formula for the Interest Coverage Ratio?</strong><br><em>Ans:</em> Interest Coverage Ratio = EBIT / Interest on Long-Term Debt (expressed in 'Times').</div>
            <div class="warn-box"><strong>Q4. How do you calculate Cost of Revenue from Operations (COGS)?</strong><br><em>Ans:</em> COGS = Opening Inventory + Net Purchases + Direct Expenses - Closing Inventory.</div>
            <div class="warn-box"><strong>Q5. Name two solvency ratios.</strong><br><em>Ans:</em> Debt-Equity Ratio and Proprietary Ratio.</div>
            <div class="warn-box"><strong>Q6. What does a high Inventory Turnover Ratio indicate?</strong><br><em>Ans:</em> It indicates fast movement of stock, high efficiency, and quick sales.</div>

            <h4 style="color: #f472b6;">Long Answer Questions (3-6 Marks)</h4>
            <div class="warn-box"><strong>Q1. Explain the significance of Liquidity Ratios and list their components.</strong><br><em>Ans:</em> Liquidity ratios assess a firm's ability to meet its short-term liabilities when due. Component ratios:
            1. **Current Ratio:** Current Assets / Current Liabilities. Indicates general coverage of short-term debts.
            2. **Quick Ratio:** Quick Assets / Current Liabilities. Indicates immediate cash-generating capability.</div>
            <div class="warn-box"><strong>Q2. Discuss the importance and calculation of Solvency Ratios.</strong><br><em>Ans:</em> Solvency ratios evaluate long-term financial health and the firm's ability to pay interest and principal. Ratios:
            1. **Debt-Equity:** Measures debt vs equity financing (Ideal 2:1).
            2. **Total Assets to Debt:** Total Assets / Long-term Debt. Measures safety margin for lenders.
            3. **Interest Coverage:** Net Profit before Interest and Tax / Interest. Shows how many times profits cover interest obligations.</div>
            <div class="warn-box"><strong>Q3. Explain the meaning and utility of Comparative and Common-Size Statements.</strong><br><em>Ans:</em> 
            * <strong>Comparative Statements:</strong> Compare figures of two or more years horizontally. Useful for detecting growth or decline trends.
            * <strong>Common-Size Statements:</strong> Convert absolute values to vertical percentages of a base figure. Useful for analyzing internal structure and comparing firms of different sizes.</div>
            <div class="warn-box"><strong>Q4. What is the Inventory Turnover Ratio? Explain its formula, units, and significance.</strong><br><em>Ans:</em> 
            * **Meaning:** It measures how quickly inventory is sold and replaced.
            * **Formula:** ITR = Cost of Revenue from Operations / Average Inventory.
            * **Significance:** Expressed in "Times". A high ratio shows efficiency; a low ratio suggests overstocking, obsolete stock, or poor sales.</div>
            <div class="warn-box"><strong>Q5. Explain three major profitability ratios with formulas.</strong><br><em>Ans:</em> 
            1. **Gross Profit Ratio:** (Gross Profit / Net Revenue) × 100. Measures production efficiency.
            2. **Net Profit Ratio:** (Net Profit / Net Revenue) × 100. Measures overall operational efficiency.
            3. **Return on Investment (ROI):** (Net Profit before Interest & Tax / Capital Employed) × 100. Measures profitability of total funds used.</div>
            <div class="warn-box"><strong>Q6. Discuss the limitations of Ratio Analysis.</strong><br><em>Ans:</em> Limitations:
            1. Ratios rely on historical data, which may not reflect future conditions.
            2. Price level changes (inflation) distort ratio comparisons.
            3. Different accounting policies (e.g., depreciation methods) hinder inter-firm comparisons.
            4. Ratios do not resolve qualitative problems.</div>

            <h4 style="color: #34d399;">Bonus Question</h4>
            <div class="warn-box"><strong>Bonus Q: A firm has a Current Ratio of 2.5:1. If it pays a current liability of ₹10,000, will the Current Ratio increase, decrease, or remain unchanged? Explain.</strong><br><em>Ans:</em> The Current Ratio will **increase**. Since the starting ratio is greater than 1 (2.5:1), an equal reduction in both Current Assets (Cash) and Current Liabilities (Creditors) reduces the denominator proportionally more than the numerator, resulting in a higher ratio.</div>
        `
    },
    {
        title: "Chapter 5: Cash Flow Statement",
        content: `
            <h4>1. Cash Flow Mechanics</h4>
            <p>A <strong>Cash Flow Statement</strong> tracks the inflows and outflows of cash and cash equivalents. It is prepared as per the indirect or direct method in accordance with Accounting Standard-3 (AS-3).</p>
            
            <h4>2. The Three Cash Flow Activities</h4>
            <p>Cash flows are categorized into **Operating** (core transactions), **Investing** (buying/selling non-current assets), and **Financing** (equity and debt transactions).</p>

            <div class="tip-box">
                <strong>Key Summary:</strong> Cash equivalents include treasury bills and short-term commercial papers. Transactions that simply shift cash (like depositing cash into bank) do not represent cash flows.
            </div>

            <h4 style="color: #a78bfa;">Short Answer Questions (1-2 Marks)</h4>
            <div class="warn-box"><strong>Q1. What is AS-3?</strong><br><em>Ans:</em> The Accounting Standard that guides the preparation and presentation of the Cash Flow Statement.</div>
            <div class="warn-box"><strong>Q2. Is 'Cash deposited into bank' a cash flow?</strong><br><em>Ans:</em> No, it is a movement between components of cash and cash equivalents, not a flow.</div>
            <div class="warn-box"><strong>Q3. Give an example of a cash inflow from investing activities.</strong><br><em>Ans:</em> Sale of machinery, interest received, or dividend received on investments.</div>
            <div class="warn-box"><strong>Q4. How is buyback of shares treated in CFS?</strong><br><em>Ans:</em> It is a cash outflow under Financing Activities.</div>
            <div class="warn-box"><strong>Q5. What is the effect of increase in current liabilities on operating cash flow?</strong><br><em>Ans:</em> It is added back to operating profit because it indicates expenses incurred but not yet paid in cash.</div>
            <div class="warn-box"><strong>Q6. How are tax refunds treated in the Cash Flow Statement?</strong><br><em>Ans:</em> Tax refunds are deducted from income tax paid under Operating Activities.</div>

            <h4 style="color: #f472b6;">Long Answer Questions (3-6 Marks)</h4>
            <div class="warn-box"><strong>Q1. Explain the differences between Operating, Investing, and Financing activities.</strong><br><em>Ans:</em> 
            1. **Operating:** Daily business transactions (e.g., cash sales, payments to suppliers).
            2. **Investing:** Buying/selling long-term assets and investments (e.g., purchase of land, sale of machinery).
            3. **Financing:** Actions that change the capital structure (e.g., issuing shares, paying dividends).</div>
            <div class="warn-box"><strong>Q2. How is Net Profit Before Tax and Extraordinary Items calculated?</strong><br><em>Ans:</em> It is calculated by taking Closing Surplus (P&L balance) minus Opening Surplus, and adding back:
            1. Transfer to General Reserve.
            2. Proposed Dividend of current year.
            3. Interim Dividend paid during the year.
            4. Provision for Tax made during the year.
            5. Deducting extraordinary incomes/credits.</div>
            <div class="warn-box"><strong>Q3. Describe how non-cash and non-operating items are adjusted in Operating Activities.</strong><br><em>Ans:</em> Under the indirect method, we add back non-cash expenses (depreciation, goodwill written off) and non-operating expenses (interest on debentures) to Net Profit. We deduct non-operating incomes (interest/dividend received, profit on sale of assets) because they belong to investing activities.</div>
            <div class="warn-box"><strong>Q4. Explain the treatment of Proposed Dividend and Interim Dividend.</strong><br><em>Ans:</em> 
            * **Proposed Dividend:** The dividend proposed in the previous year is added back to Net Profit (Operating) and shown as an outflow under Financing Activities. Current year's proposed dividend is ignored.
            * **Interim Dividend:** Paid during the year; added back to Net Profit (Operating) and shown as an outflow under Financing Activities.</div>
            <div class="warn-box"><strong>Q5. Discuss the benefits of preparing a Cash Flow Statement.</strong><br><em>Ans:</em> Benefits include:
            1. Helps evaluate the firm's liquidity and solvency positions.
            2. Explains the difference between Net Profit and Net Cash Flow.
            3. Assists in planning and budgeting future cash requirements.
            4. Facilitates checking internal cash efficiency.</div>
            <div class="warn-box"><strong>Q6. How are transactions of financial enterprises different from non-financial enterprises in CFS?</strong><br><em>Ans:</em> For financial enterprises:
            1. Interest and dividends received/paid are Operating Activities.
            2. Loans granted and deposits received are Operating Activities.
            For non-financial enterprises, these are Investing or Financing activities.</div>

            <h4 style="color: #34d399;">Bonus Question</h4>
            <div class="warn-box"><strong>Bonus Q: A company purchased machinery for ₹10,000, paying ₹2,000 in cash and issuing equity shares for the balance. How is this recorded in the Cash Flow Statement?</strong><br><em>Ans:</em> Only the actual cash paid of **₹2,000** is recorded as an outflow under **Investing Activities** (Purchase of Machinery). The issue of equity shares for the remaining ₹8,000 is a non-cash transaction and is excluded from the statement, though disclosed in the notes.</div>
        `
    }
];
