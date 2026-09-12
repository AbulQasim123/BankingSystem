-- ============================================================
--  QNB Banking System - PostgreSQL schema (Neon)
--  Run this once against your Neon database before starting the app:
--    psql "<your DATABASE_URL>" -f schema.sql
--  (or paste it into the Neon SQL editor)
-- ============================================================

-- ---------- USERS ----------
CREATE TABLE IF NOT EXISTS users (
    id                  SERIAL PRIMARY KEY,
    name                VARCHAR(100)  NOT NULL,
    email               VARCHAR(255)  NOT NULL UNIQUE,
    user_id             VARCHAR(50)   NOT NULL UNIQUE,
    password            VARCHAR(255)  NOT NULL,
    reset_token         VARCHAR(255),
    reset_token_expiry  TIMESTAMP,
    created_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ---------- ACCOUNTS ----------
-- user_id references users.user_id; deleting a user cascades to their accounts.
CREATE TABLE IF NOT EXISTS accounts (
    id              SERIAL PRIMARY KEY,
    user_id         VARCHAR(50)    NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    account_number  VARCHAR(30)    NOT NULL UNIQUE,
    account_type    VARCHAR(20)    NOT NULL,
    balance         NUMERIC(15,2)  NOT NULL DEFAULT 0,
    created_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- ---------- TRANSACTIONS ----------
-- account_number references accounts.account_number; deleting an account
-- cascades to its transactions.
CREATE TABLE IF NOT EXISTS transactions (
    id                SERIAL PRIMARY KEY,
    account_number    VARCHAR(30)    NOT NULL REFERENCES accounts(account_number) ON DELETE CASCADE,
    amount            NUMERIC(15,2)  NOT NULL,
    transaction_type  VARCHAR(20)    NOT NULL,   -- 'deposit' | 'withdrawal'
    description       TEXT,
    status            VARCHAR(20)    DEFAULT 'success',
    transaction_time  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- ---------- TRANSFERS ----------
CREATE TABLE IF NOT EXISTS transfers (
    id                       SERIAL PRIMARY KEY,
    sender_account_number    VARCHAR(30)    NOT NULL,
    receiver_account_number  VARCHAR(30)    NOT NULL,
    amount                   NUMERIC(15,2)  NOT NULL,
    description              TEXT,
    status                   VARCHAR(20)    DEFAULT 'success',   -- 'success' | 'fail'
    transfer_time            TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
--  TRIGGER: auto-update account balance after a transaction
--  (replaces the original MySQL "AFTER INSERT ON transactions" trigger)
--  The transaction controller inserts the row and lets this trigger
--  adjust accounts.balance.
-- ============================================================
CREATE OR REPLACE FUNCTION update_balance_after_transaction()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.transaction_type = 'deposit' THEN
        UPDATE accounts
           SET balance = balance + NEW.amount
         WHERE account_number = NEW.account_number;
    ELSIF NEW.transaction_type = 'withdrawal' THEN
        UPDATE accounts
           SET balance = balance - NEW.amount
         WHERE account_number = NEW.account_number;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_balance ON transactions;

CREATE TRIGGER trg_update_balance
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_balance_after_transaction();

-- ============================================================
--  PRODUCTS CATALOG (Accounts & Deposits / Cards / Loans /
--  Rates & Offers / Investments) — powers the navbar mega-menu
--  and the /info/:slug pages on the frontend.
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
    id           SERIAL PRIMARY KEY,
    slug         VARCHAR(60)   NOT NULL UNIQUE,
    category     VARCHAR(50)   NOT NULL,
    icon         VARCHAR(40)   NOT NULL,   -- react-icons/fa component name
    title        VARCHAR(100)  NOT NULL,
    tagline      VARCHAR(200),
    description  TEXT,
    highlights   TEXT[],
    stats        JSONB,                    -- [{ "label": "...", "value": "..." }, ...]
    cta_label    VARCHAR(60),              -- optional override, e.g. "Sign in to manage cards"
    is_active    BOOLEAN       DEFAULT true,
    created_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ---------- PRODUCT APPLICATIONS ----------
-- Records a user "applying" for / expressing interest in a product
-- from the /info/:slug page (Open Account, Apply for Loan, etc.)
CREATE TABLE IF NOT EXISTS product_applications (
    id             SERIAL PRIMARY KEY,
    user_id        VARCHAR(50)   NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    product_slug   VARCHAR(60)   NOT NULL REFERENCES products(slug) ON DELETE CASCADE,
    amount         NUMERIC(15,2),
    notes          TEXT,
    status         VARCHAR(20)   DEFAULT 'pending',   -- 'pending' | 'approved' | 'rejected'
    created_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ---------- SEED DATA ----------
INSERT INTO products (slug, category, icon, title, tagline, description, highlights, stats, cta_label) VALUES
('savings-account', 'Accounts & Deposits', 'FaPiggyBank', 'Savings Account', 'Everyday saving, made effortless.',
 'A zero-hassle savings account built for daily banking — instant transfers, a linked debit card, and interest that grows with your balance.',
 ARRAY['Earn up to 4% p.a. on your balance, credited quarterly','Free digital debit card and unlimited UPI transfers','Zero balance option available for students and first-time account holders'],
 '[{"label":"Interest rate","value":"up to 4% p.a."},{"label":"Min. balance","value":"₹0 – ₹10,000"},{"label":"Account opening","value":"100% online, 5 mins"}]', NULL),

('current-account', 'Accounts & Deposits', 'FaWallet', 'Current Account', 'Built for business, ready for volume.',
 'A current account designed for businesses and professionals who need high transaction limits, overdraft facilities, and dedicated relationship support.',
 ARRAY['No limit on the number of transactions per month','Overdraft facility linked to your average balance','Free cheque books, RTGS/NEFT, and doorstep banking'],
 '[{"label":"Transaction limit","value":"Unlimited"},{"label":"Overdraft","value":"Up to ₹25 lakh"},{"label":"Best for","value":"Businesses & professionals"}]', NULL),

('fixed-deposit', 'Accounts & Deposits', 'FaCoins', 'Fixed Deposit', 'Lock in a rate, watch it grow.',
 'Park your savings in a fixed deposit and earn guaranteed, predictable returns over a tenure you choose — from 7 days to 10 years.',
 ARRAY['Interest rates up to 7.5% p.a. for senior citizens','Flexible tenures from 7 days to 10 years','Loan against FD available up to 90% of deposit value'],
 '[{"label":"Interest rate","value":"6.5% – 7.5% p.a."},{"label":"Tenure","value":"7 days – 10 yrs"},{"label":"Premature withdrawal","value":"Allowed, nominal charge"}]', NULL),

('recurring-deposit', 'Accounts & Deposits', 'FaSyncAlt', 'Recurring Deposit', 'Small monthly deposits, big future goals.',
 'Build a savings habit with a recurring deposit — invest a fixed amount every month and earn FD-like returns at maturity.',
 ARRAY['Start with as little as ₹500 per month','Interest rates on par with fixed deposits','Tenures from 6 months to 10 years'],
 '[{"label":"Min. monthly deposit","value":"₹500"},{"label":"Interest rate","value":"up to 7% p.a."},{"label":"Tenure","value":"6 months – 10 yrs"}]', NULL),

('salary-account', 'Accounts & Deposits', 'FaMoneyCheckAlt', 'Salary Account', 'Zero balance banking for working professionals.',
 'A dedicated salary account for employees, with zero minimum balance requirement, a premium debit card, and preferential loan rates.',
 ARRAY['Zero minimum balance for as long as your salary is credited','Free premium debit card with airport lounge access','Preferential interest rates on personal and home loans'],
 '[{"label":"Min. balance","value":"₹0"},{"label":"Debit card","value":"Free, premium tier"},{"label":"Loan rate benefit","value":"Up to 0.5% off"}]', NULL),

('debit-cards', 'Cards', 'FaRegCreditCard', 'Debit Cards', 'Tap, swipe, or withdraw — your money, instantly.',
 'A debit card linked directly to your account for ATM withdrawals, in-store payments, and online shopping, with zero-liability fraud protection.',
 ARRAY['Contactless tap-and-pay on all POS terminals','Free withdrawals at 1,000+ QNB ATMs nationwide','Instant block/unblock from the app if lost or stolen'],
 '[{"label":"Daily ATM limit","value":"Up to ₹1,00,000"},{"label":"Annual fee","value":"₹0 for salary accounts"},{"label":"Issuance","value":"Instant virtual card"}]', NULL),

('credit-cards', 'Cards', 'FaCreditCard', 'Credit Cards', 'Spend smart, earn more with every swipe.',
 'Flexible credit lines with reward points, fuel surcharge waivers, and interest-free periods of up to 50 days on purchases.',
 ARRAY['Up to 50 days interest-free credit period','2X reward points on dining and travel spends','Zero joining fee for salary account holders'],
 '[{"label":"Credit limit","value":"₹50,000 – ₹10,00,000"},{"label":"Interest-free period","value":"Up to 50 days"},{"label":"Reward rate","value":"Up to 2X points"}]', NULL),

('card-offers', 'Cards', 'FaGift', 'Card Offers', 'More value on the purchases you already make.',
 'Ongoing discounts, cashback, and no-cost EMI offers from partner brands across dining, travel, electronics, and fashion.',
 ARRAY['Up to 15% instant discount at partner dining outlets','No-cost EMI on electronics and appliances','Exclusive travel offers with flight and hotel partners'],
 '[{"label":"Active offers","value":"40+ brands"},{"label":"Categories","value":"Dining, travel, shopping"},{"label":"Refreshed","value":"Every month"}]', NULL),

('block-a-card', 'Cards', 'FaBan', 'Block a Card', 'Lost your card? Freeze it in seconds.',
 'Instantly block a lost or stolen debit or credit card from your dashboard, and order a replacement without visiting a branch.',
 ARRAY['Instant block from the app or net banking, 24/7','No charges for blocking in case of loss or theft','Replacement card dispatched within 5–7 working days'],
 '[{"label":"Block time","value":"Instant"},{"label":"Availability","value":"24/7"},{"label":"Replacement","value":"5–7 working days"}]', 'Sign in to manage cards'),

('rewards', 'Cards', 'FaAward', 'Rewards', 'Turn spending into savings.',
 'Earn reward points on eligible debit and credit card transactions, redeemable for vouchers, statement credit, or partner catalogue items.',
 ARRAY['1 point for every ₹100 spent on eligible transactions','Redeem points for vouchers, flights, or statement credit','Points never expire as long as the account stays active'],
 '[{"label":"Earn rate","value":"1 pt / ₹100 spent"},{"label":"Redemption","value":"Vouchers, flights, cashback"},{"label":"Expiry","value":"None, while active"}]', NULL),

('home-loan', 'Loans', 'FaHome', 'Home Loan', 'Your dream home, financed the smart way.',
 'Competitive interest rates and tenures of up to 30 years to help you buy, build, or renovate your home.',
 ARRAY['Interest rates starting at 8.4% p.a.','Loan tenure of up to 30 years','Financing of up to 90% of the property value'],
 '[{"label":"Interest rate","value":"from 8.4% p.a."},{"label":"Tenure","value":"up to 30 yrs"},{"label":"Financing","value":"up to 90% of value"}]', NULL),

('car-loan', 'Loans', 'FaCar', 'Car Loan', 'Drive today, pay comfortably over time.',
 'Finance a new or used car with quick approvals, flexible EMIs, and funding of up to 100% of the on-road price for select models.',
 ARRAY['Approval in as little as 24 hours','Financing up to 100% of on-road price','Tenure up to 7 years with flexible EMIs'],
 '[{"label":"Interest rate","value":"from 8.75% p.a."},{"label":"Tenure","value":"up to 7 yrs"},{"label":"Approval","value":"as fast as 24 hrs"}]', NULL),

('personal-loan', 'Loans', 'FaUserTie', 'Personal Loan', 'Funds for life''s plans, no collateral needed.',
 'An unsecured loan for weddings, travel, medical needs, or debt consolidation — with minimal paperwork and fast disbursal.',
 ARRAY['No collateral or guarantor required','Disbursal within 24–48 hours of approval','Flexible tenure from 12 to 60 months'],
 '[{"label":"Loan amount","value":"₹50,000 – ₹25,00,000"},{"label":"Interest rate","value":"from 10.5% p.a."},{"label":"Disbursal","value":"24–48 hrs"}]', NULL),

('education-loan', 'Loans', 'FaGraduationCap', 'Education Loan', 'Invest in your future, one semester at a time.',
 'Cover tuition, hostel, and living costs for higher education in India or abroad, with a moratorium period until course completion.',
 ARRAY['Covers tuition, hostel, travel, and equipment costs','Repayment starts 6–12 months after course completion','Tax benefits under Section 80E on interest paid'],
 '[{"label":"Loan amount","value":"up to ₹40,00,000"},{"label":"Interest rate","value":"from 9.0% p.a."},{"label":"Moratorium","value":"course + 6–12 months"}]', NULL),

('gold-loan', 'Loans', 'FaRing', 'Gold Loan', 'Unlock the value of your gold, instantly.',
 'Borrow against your gold jewellery with quick disbursal, minimal documentation, and safekeeping of your gold in secure vaults.',
 ARRAY['Disbursal within a few hours of gold valuation','Up to 75% of gold value as loan amount','Secure vault storage with insurance coverage'],
 '[{"label":"Loan-to-value","value":"up to 75%"},{"label":"Interest rate","value":"from 9.5% p.a."},{"label":"Disbursal","value":"same day"}]', NULL),

('interest-rates', 'Rates & Offers', 'FaPercentage', 'Interest Rates', 'Transparent rates, no surprises.',
 'A complete view of current interest rates across savings accounts, deposits, and loans — updated regularly to reflect the latest policy changes.',
 ARRAY['Savings account interest up to 4% p.a.','Fixed deposit rates up to 7.5% p.a. for senior citizens','Home and personal loan rates starting at 8.4% p.a.'],
 '[{"label":"Savings","value":"up to 4% p.a."},{"label":"Fixed deposits","value":"6.5% – 7.5% p.a."},{"label":"Home loan","value":"from 8.4% p.a."}]', NULL),

('festive-offers', 'Rates & Offers', 'FaCalendarAlt', 'Festive Offers', 'Seasonal savings on the things you love.',
 'Limited-time festive offers on loans, cards, and deposits — including waived processing fees and bonus interest rates.',
 ARRAY['Processing fee waivers on home and car loans','Bonus 0.25% interest on new fixed deposits','Extra reward points on festive shopping'],
 '[{"label":"Offer window","value":"Festive season only"},{"label":"Processing fee","value":"Waived on select loans"},{"label":"Bonus interest","value":"+0.25% p.a."}]', NULL),

('cashback-deals', 'Rates & Offers', 'FaTags', 'Cashback Deals', 'Get money back on everyday spends.',
 'Cashback on utility bill payments, grocery shopping, and fuel purchases made through your QNB debit or credit card.',
 ARRAY['Up to 5% cashback on utility bill payments','2% cashback on fuel purchases, capped monthly','1% flat cashback on grocery and supermarket spends'],
 '[{"label":"Utility bills","value":"up to 5% back"},{"label":"Fuel","value":"2% back"},{"label":"Groceries","value":"1% flat back"}]', NULL),

('fee-schedule', 'Rates & Offers', 'FaFileInvoiceDollar', 'Fee Schedule', 'Every charge, laid out clearly.',
 'A transparent breakdown of account maintenance, transaction, and service charges so there are never any hidden fees.',
 ARRAY['No hidden charges on standard transactions','Free monthly statements and passbook updates','Reduced fees for salary and senior citizen accounts'],
 '[{"label":"Account maintenance","value":"₹0 – ₹500 / qtr"},{"label":"ATM withdrawals","value":"Free up to 5 / month"},{"label":"Cheque book","value":"First 2 free / year"}]', NULL),

('mutual-funds', 'Investments', 'FaChartPie', 'Mutual Funds', 'Grow your wealth with expert-managed funds.',
 'Invest in equity, debt, and hybrid mutual funds through SIPs or a lump sum, matched to your risk appetite and goals.',
 ARRAY['Start a SIP with as little as ₹500 per month','Choose from 200+ funds across risk categories','Zero commission on direct plans'],
 '[{"label":"Min. SIP","value":"₹500 / month"},{"label":"Fund options","value":"200+"},{"label":"Plan type","value":"Direct, zero commission"}]', NULL),

('stocks-etfs', 'Investments', 'FaChartLine', 'Stocks & ETFs', 'Trade the markets from your banking app.',
 'A linked demat and trading account to buy and sell stocks, ETFs, and IPOs directly, with real-time market data.',
 ARRAY['Free demat account opening for new customers','Flat brokerage on intraday and delivery trades','Access to IPOs, ETFs, and F&O from one dashboard'],
 '[{"label":"Account opening","value":"Free"},{"label":"Brokerage","value":"Flat ₹20 or 0.05%"},{"label":"Markets","value":"Equity, ETFs, F&O"}]', NULL),

('bonds', 'Investments', 'FaFileContract', 'Bonds', 'Steady, predictable returns for the long term.',
 'Invest in government and corporate bonds for fixed returns with lower volatility than equity markets.',
 ARRAY['Government bonds with sovereign-backed safety','Corporate bonds offering higher fixed yields','Tenures ranging from 1 to 40 years'],
 '[{"label":"Yield","value":"6.5% – 9% p.a."},{"label":"Tenure","value":"1 – 40 yrs"},{"label":"Risk","value":"Low to moderate"}]', NULL),

('insurance', 'Investments', 'FaUmbrella', 'Insurance', 'Protection for what matters most.',
 'Life, health, and general insurance plans bundled with your banking relationship, with cashless claims and easy renewals.',
 ARRAY['Life cover available from a low daily-equivalent premium','Cashless hospitalization at 8,000+ network hospitals','Easy online renewal and claim tracking'],
 '[{"label":"Life cover","value":"up to ₹1 crore"},{"label":"Network hospitals","value":"8,000+"},{"label":"Claim settlement","value":"Online, cashless"}]', NULL),

('tax-saver', 'Investments', 'FaReceipt', 'Tax Saver', 'Save tax while you save for the future.',
 'Tax-saving fixed deposits and ELSS mutual funds that qualify for deductions under Section 80C, with lock-in periods to match your goals.',
 ARRAY['Deduction of up to ₹1.5 lakh under Section 80C','ELSS funds with the shortest lock-in among 80C options — 3 years','Tax-saver FDs with a 5-year lock-in and guaranteed returns'],
 '[{"label":"80C limit","value":"₹1.5 lakh / year"},{"label":"ELSS lock-in","value":"3 years"},{"label":"Tax-saver FD lock-in","value":"5 years"}]', NULL)

ON CONFLICT (slug) DO NOTHING;
