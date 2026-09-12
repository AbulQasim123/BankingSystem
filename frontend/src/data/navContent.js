import {
    FaPiggyBank, FaWallet, FaCoins, FaSyncAlt, FaMoneyCheckAlt,
    FaRegCreditCard, FaCreditCard, FaGift, FaBan, FaAward,
    FaHome, FaCar, FaUserTie, FaGraduationCap, FaRing,
    FaPercentage, FaCalendarAlt, FaTags, FaFileInvoiceDollar,
    FaChartPie, FaChartLine, FaFileContract, FaUmbrella, FaReceipt,
} from 'react-icons/fa';

// Full detail content for every link inside the navbar mega-menu.
// Keyed by slug (see navItems.js). Consumed by pages/InfoPage.jsx.
export const navContent = {
    // ---------- Accounts & Deposits ----------
    'savings-account': {
        category: 'Accounts & Deposits',
        icon: FaPiggyBank,
        title: 'Savings Account',
        tagline: 'Everyday saving, made effortless.',
        description:
            'A zero-hassle savings account built for daily banking — instant transfers, a linked debit card, and interest that grows with your balance.',
        highlights: [
            'Earn up to 4% p.a. on your balance, credited quarterly',
            'Free digital debit card and unlimited UPI transfers',
            'Zero balance option available for students and first-time account holders',
        ],
        stats: [
            { label: 'Interest rate', value: 'up to 4% p.a.' },
            { label: 'Min. balance', value: '₹0 – ₹10,000' },
            { label: 'Account opening', value: '100% online, 5 mins' },
        ],
    },
    'current-account': {
        category: 'Accounts & Deposits',
        icon: FaWallet,
        title: 'Current Account',
        tagline: 'Built for business, ready for volume.',
        description:
            'A current account designed for businesses and professionals who need high transaction limits, overdraft facilities, and dedicated relationship support.',
        highlights: [
            'No limit on the number of transactions per month',
            'Overdraft facility linked to your average balance',
            'Free cheque books, RTGS/NEFT, and doorstep banking',
        ],
        stats: [
            { label: 'Transaction limit', value: 'Unlimited' },
            { label: 'Overdraft', value: 'Up to ₹25 lakh' },
            { label: 'Best for', value: 'Businesses & professionals' },
        ],
    },
    'fixed-deposit': {
        category: 'Accounts & Deposits',
        icon: FaCoins,
        title: 'Fixed Deposit',
        tagline: 'Lock in a rate, watch it grow.',
        description:
            'Park your savings in a fixed deposit and earn guaranteed, predictable returns over a tenure you choose — from 7 days to 10 years.',
        highlights: [
            'Interest rates up to 7.5% p.a. for senior citizens',
            'Flexible tenures from 7 days to 10 years',
            'Loan against FD available up to 90% of deposit value',
        ],
        stats: [
            { label: 'Interest rate', value: '6.5% – 7.5% p.a.' },
            { label: 'Tenure', value: '7 days – 10 yrs' },
            { label: 'Premature withdrawal', value: 'Allowed, nominal charge' },
        ],
    },
    'recurring-deposit': {
        category: 'Accounts & Deposits',
        icon: FaSyncAlt,
        title: 'Recurring Deposit',
        tagline: 'Small monthly deposits, big future goals.',
        description:
            'Build a savings habit with a recurring deposit — invest a fixed amount every month and earn FD-like returns at maturity.',
        highlights: [
            'Start with as little as ₹500 per month',
            'Interest rates on par with fixed deposits',
            'Tenures from 6 months to 10 years',
        ],
        stats: [
            { label: 'Min. monthly deposit', value: '₹500' },
            { label: 'Interest rate', value: 'up to 7% p.a.' },
            { label: 'Tenure', value: '6 months – 10 yrs' },
        ],
    },
    'salary-account': {
        category: 'Accounts & Deposits',
        icon: FaMoneyCheckAlt,
        title: 'Salary Account',
        tagline: 'Zero balance banking for working professionals.',
        description:
            'A dedicated salary account for employees, with zero minimum balance requirement, a premium debit card, and preferential loan rates.',
        highlights: [
            'Zero minimum balance for as long as your salary is credited',
            'Free premium debit card with airport lounge access',
            'Preferential interest rates on personal and home loans',
        ],
        stats: [
            { label: 'Min. balance', value: '₹0' },
            { label: 'Debit card', value: 'Free, premium tier' },
            { label: 'Loan rate benefit', value: 'Up to 0.5% off' },
        ],
    },

    // ---------- Cards ----------
    'debit-cards': {
        category: 'Cards',
        icon: FaRegCreditCard,
        title: 'Debit Cards',
        tagline: 'Tap, swipe, or withdraw — your money, instantly.',
        description:
            'A debit card linked directly to your account for ATM withdrawals, in-store payments, and online shopping, with zero-liability fraud protection.',
        highlights: [
            'Contactless tap-and-pay on all POS terminals',
            'Free withdrawals at 1,000+ QNB ATMs nationwide',
            'Instant block/unblock from the app if lost or stolen',
        ],
        stats: [
            { label: 'Daily ATM limit', value: 'Up to ₹1,00,000' },
            { label: 'Annual fee', value: '₹0 for salary accounts' },
            { label: 'Issuance', value: 'Instant virtual card' },
        ],
    },
    'credit-cards': {
        category: 'Cards',
        icon: FaCreditCard,
        title: 'Credit Cards',
        tagline: 'Spend smart, earn more with every swipe.',
        description:
            'Flexible credit lines with reward points, fuel surcharge waivers, and interest-free periods of up to 50 days on purchases.',
        highlights: [
            'Up to 50 days interest-free credit period',
            '2X reward points on dining and travel spends',
            'Zero joining fee for salary account holders',
        ],
        stats: [
            { label: 'Credit limit', value: '₹50,000 – ₹10,00,000' },
            { label: 'Interest-free period', value: 'Up to 50 days' },
            { label: 'Reward rate', value: 'Up to 2X points' },
        ],
    },
    'card-offers': {
        category: 'Cards',
        icon: FaGift,
        title: 'Card Offers',
        tagline: 'More value on the purchases you already make.',
        description:
            'Ongoing discounts, cashback, and no-cost EMI offers from partner brands across dining, travel, electronics, and fashion.',
        highlights: [
            'Up to 15% instant discount at partner dining outlets',
            'No-cost EMI on electronics and appliances',
            'Exclusive travel offers with flight and hotel partners',
        ],
        stats: [
            { label: 'Active offers', value: '40+ brands' },
            { label: 'Categories', value: 'Dining, travel, shopping' },
            { label: 'Refreshed', value: 'Every month' },
        ],
    },
    'block-a-card': {
        category: 'Cards',
        icon: FaBan,
        title: 'Block a Card',
        tagline: 'Lost your card? Freeze it in seconds.',
        description:
            'Instantly block a lost or stolen debit or credit card from your dashboard, and order a replacement without visiting a branch.',
        highlights: [
            'Instant block from the app or net banking, 24/7',
            'No charges for blocking in case of loss or theft',
            'Replacement card dispatched within 5–7 working days',
        ],
        stats: [
            { label: 'Block time', value: 'Instant' },
            { label: 'Availability', value: '24/7' },
            { label: 'Replacement', value: '5–7 working days' },
        ],
        ctaLabelLoggedOut: 'Sign in to manage cards',
    },
    rewards: {
        category: 'Cards',
        icon: FaAward,
        title: 'Rewards',
        tagline: 'Turn spending into savings.',
        description:
            'Earn reward points on eligible debit and credit card transactions, redeemable for vouchers, statement credit, or partner catalogue items.',
        highlights: [
            '1 point for every ₹100 spent on eligible transactions',
            'Redeem points for vouchers, flights, or statement credit',
            'Points never expire as long as the account stays active',
        ],
        stats: [
            { label: 'Earn rate', value: '1 pt / ₹100 spent' },
            { label: 'Redemption', value: 'Vouchers, flights, cashback' },
            { label: 'Expiry', value: 'None, while active' },
        ],
    },

    // ---------- Loans ----------
    'home-loan': {
        category: 'Loans',
        icon: FaHome,
        title: 'Home Loan',
        tagline: 'Your dream home, financed the smart way.',
        description:
            'Competitive interest rates and tenures of up to 30 years to help you buy, build, or renovate your home.',
        highlights: [
            'Interest rates starting at 8.4% p.a.',
            'Loan tenure of up to 30 years',
            'Financing of up to 90% of the property value',
        ],
        stats: [
            { label: 'Interest rate', value: 'from 8.4% p.a.' },
            { label: 'Tenure', value: 'up to 30 yrs' },
            { label: 'Financing', value: 'up to 90% of value' },
        ],
    },
    'car-loan': {
        category: 'Loans',
        icon: FaCar,
        title: 'Car Loan',
        tagline: "Drive today, pay comfortably over time.",
        description:
            'Finance a new or used car with quick approvals, flexible EMIs, and funding of up to 100% of the on-road price for select models.',
        highlights: [
            'Approval in as little as 24 hours',
            'Financing up to 100% of on-road price',
            'Tenure up to 7 years with flexible EMIs',
        ],
        stats: [
            { label: 'Interest rate', value: 'from 8.75% p.a.' },
            { label: 'Tenure', value: 'up to 7 yrs' },
            { label: 'Approval', value: 'as fast as 24 hrs' },
        ],
    },
    'personal-loan': {
        category: 'Loans',
        icon: FaUserTie,
        title: 'Personal Loan',
        tagline: "Funds for life's plans, no collateral needed.",
        description:
            'An unsecured loan for weddings, travel, medical needs, or debt consolidation — with minimal paperwork and fast disbursal.',
        highlights: [
            'No collateral or guarantor required',
            'Disbursal within 24–48 hours of approval',
            'Flexible tenure from 12 to 60 months',
        ],
        stats: [
            { label: 'Loan amount', value: '₹50,000 – ₹25,00,000' },
            { label: 'Interest rate', value: 'from 10.5% p.a.' },
            { label: 'Disbursal', value: '24–48 hrs' },
        ],
    },
    'education-loan': {
        category: 'Loans',
        icon: FaGraduationCap,
        title: 'Education Loan',
        tagline: "Invest in your future, one semester at a time.",
        description:
            'Cover tuition, hostel, and living costs for higher education in India or abroad, with a moratorium period until course completion.',
        highlights: [
            'Covers tuition, hostel, travel, and equipment costs',
            'Repayment starts 6–12 months after course completion',
            'Tax benefits under Section 80E on interest paid',
        ],
        stats: [
            { label: 'Loan amount', value: 'up to ₹40,00,000' },
            { label: 'Interest rate', value: 'from 9.0% p.a.' },
            { label: 'Moratorium', value: 'course + 6–12 months' },
        ],
    },
    'gold-loan': {
        category: 'Loans',
        icon: FaRing,
        title: 'Gold Loan',
        tagline: 'Unlock the value of your gold, instantly.',
        description:
            'Borrow against your gold jewellery with quick disbursal, minimal documentation, and safekeeping of your gold in secure vaults.',
        highlights: [
            'Disbursal within a few hours of gold valuation',
            'Up to 75% of gold value as loan amount',
            'Secure vault storage with insurance coverage',
        ],
        stats: [
            { label: 'Loan-to-value', value: 'up to 75%' },
            { label: 'Interest rate', value: 'from 9.5% p.a.' },
            { label: 'Disbursal', value: 'same day' },
        ],
    },

    // ---------- Rates & Offers ----------
    'interest-rates': {
        category: 'Rates & Offers',
        icon: FaPercentage,
        title: 'Interest Rates',
        tagline: 'Transparent rates, no surprises.',
        description:
            'A complete view of current interest rates across savings accounts, deposits, and loans — updated regularly to reflect the latest policy changes.',
        highlights: [
            'Savings account interest up to 4% p.a.',
            'Fixed deposit rates up to 7.5% p.a. for senior citizens',
            'Home and personal loan rates starting at 8.4% p.a.',
        ],
        stats: [
            { label: 'Savings', value: 'up to 4% p.a.' },
            { label: 'Fixed deposits', value: '6.5% – 7.5% p.a.' },
            { label: 'Home loan', value: 'from 8.4% p.a.' },
        ],
    },
    'festive-offers': {
        category: 'Rates & Offers',
        icon: FaCalendarAlt,
        title: 'Festive Offers',
        tagline: 'Seasonal savings on the things you love.',
        description:
            'Limited-time festive offers on loans, cards, and deposits — including waived processing fees and bonus interest rates.',
        highlights: [
            'Processing fee waivers on home and car loans',
            'Bonus 0.25% interest on new fixed deposits',
            'Extra reward points on festive shopping',
        ],
        stats: [
            { label: 'Offer window', value: 'Festive season only' },
            { label: 'Processing fee', value: 'Waived on select loans' },
            { label: 'Bonus interest', value: '+0.25% p.a.' },
        ],
    },
    'cashback-deals': {
        category: 'Rates & Offers',
        icon: FaTags,
        title: 'Cashback Deals',
        tagline: 'Get money back on everyday spends.',
        description:
            'Cashback on utility bill payments, grocery shopping, and fuel purchases made through your QNB debit or credit card.',
        highlights: [
            'Up to 5% cashback on utility bill payments',
            '2% cashback on fuel purchases, capped monthly',
            '1% flat cashback on grocery and supermarket spends',
        ],
        stats: [
            { label: 'Utility bills', value: 'up to 5% back' },
            { label: 'Fuel', value: '2% back' },
            { label: 'Groceries', value: '1% flat back' },
        ],
    },
    'fee-schedule': {
        category: 'Rates & Offers',
        icon: FaFileInvoiceDollar,
        title: 'Fee Schedule',
        tagline: 'Every charge, laid out clearly.',
        description:
            'A transparent breakdown of account maintenance, transaction, and service charges so there are never any hidden fees.',
        highlights: [
            'No hidden charges on standard transactions',
            'Free monthly statements and passbook updates',
            'Reduced fees for salary and senior citizen accounts',
        ],
        stats: [
            { label: 'Account maintenance', value: '₹0 – ₹500 / qtr' },
            { label: 'ATM withdrawals', value: 'Free up to 5 / month' },
            { label: 'Cheque book', value: 'First 2 free / year' },
        ],
    },

    // ---------- Investments ----------
    'mutual-funds': {
        category: 'Investments',
        icon: FaChartPie,
        title: 'Mutual Funds',
        tagline: 'Grow your wealth with expert-managed funds.',
        description:
            'Invest in equity, debt, and hybrid mutual funds through SIPs or a lump sum, matched to your risk appetite and goals.',
        highlights: [
            'Start a SIP with as little as ₹500 per month',
            'Choose from 200+ funds across risk categories',
            'Zero commission on direct plans',
        ],
        stats: [
            { label: 'Min. SIP', value: '₹500 / month' },
            { label: 'Fund options', value: '200+' },
            { label: 'Plan type', value: 'Direct, zero commission' },
        ],
    },
    'stocks-etfs': {
        category: 'Investments',
        icon: FaChartLine,
        title: 'Stocks & ETFs',
        tagline: 'Trade the markets from your banking app.',
        description:
            'A linked demat and trading account to buy and sell stocks, ETFs, and IPOs directly, with real-time market data.',
        highlights: [
            'Free demat account opening for new customers',
            'Flat brokerage on intraday and delivery trades',
            'Access to IPOs, ETFs, and F&O from one dashboard',
        ],
        stats: [
            { label: 'Account opening', value: 'Free' },
            { label: 'Brokerage', value: 'Flat ₹20 or 0.05%' },
            { label: 'Markets', value: 'Equity, ETFs, F&O' },
        ],
    },
    bonds: {
        category: 'Investments',
        icon: FaFileContract,
        title: 'Bonds',
        tagline: 'Steady, predictable returns for the long term.',
        description:
            'Invest in government and corporate bonds for fixed returns with lower volatility than equity markets.',
        highlights: [
            'Government bonds with sovereign-backed safety',
            'Corporate bonds offering higher fixed yields',
            'Tenures ranging from 1 to 40 years',
        ],
        stats: [
            { label: 'Yield', value: '6.5% – 9% p.a.' },
            { label: 'Tenure', value: '1 – 40 yrs' },
            { label: 'Risk', value: 'Low to moderate' },
        ],
    },
    insurance: {
        category: 'Investments',
        icon: FaUmbrella,
        title: 'Insurance',
        tagline: 'Protection for what matters most.',
        description:
            'Life, health, and general insurance plans bundled with your banking relationship, with cashless claims and easy renewals.',
        highlights: [
            'Life cover available from a low daily-equivalent premium',
            'Cashless hospitalization at 8,000+ network hospitals',
            'Easy online renewal and claim tracking',
        ],
        stats: [
            { label: 'Life cover', value: 'up to ₹1 crore' },
            { label: 'Network hospitals', value: '8,000+' },
            { label: 'Claim settlement', value: 'Online, cashless' },
        ],
    },
    'tax-saver': {
        category: 'Investments',
        icon: FaReceipt,
        title: 'Tax Saver',
        tagline: 'Save tax while you save for the future.',
        description:
            'Tax-saving fixed deposits and ELSS mutual funds that qualify for deductions under Section 80C, with lock-in periods to match your goals.',
        highlights: [
            'Deduction of up to ₹1.5 lakh under Section 80C',
            'ELSS funds with the shortest lock-in among 80C options — 3 years',
            'Tax-saver FDs with a 5-year lock-in and guaranteed returns',
        ],
        stats: [
            { label: '80C limit', value: '₹1.5 lakh / year' },
            { label: 'ELSS lock-in', value: '3 years' },
            { label: 'Tax-saver FD lock-in', value: '5 years' },
        ],
    },
};

export default navContent;
