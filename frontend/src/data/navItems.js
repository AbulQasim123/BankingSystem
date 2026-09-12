// Central source of truth for the mega-menu structure.
// Every link has a `slug` that maps 1:1 to an entry in `navContent.js`
// and is used to build the route: /info/:slug

export const navItems = [
    {
        title: 'Accounts & Deposits',
        links: [
            { label: 'Savings Account', slug: 'savings-account' },
            { label: 'Current Account', slug: 'current-account' },
            { label: 'Fixed Deposit', slug: 'fixed-deposit' },
            { label: 'Recurring Deposit', slug: 'recurring-deposit' },
            { label: 'Salary Account', slug: 'salary-account' },
        ],
    },
    {
        title: 'Cards',
        links: [
            { label: 'Debit Cards', slug: 'debit-cards' },
            { label: 'Credit Cards', slug: 'credit-cards' },
            { label: 'Card Offers', slug: 'card-offers' },
            { label: 'Block a Card', slug: 'block-a-card' },
            { label: 'Rewards', slug: 'rewards' },
        ],
    },
    {
        title: 'Loans',
        links: [
            { label: 'Home Loan', slug: 'home-loan' },
            { label: 'Car Loan', slug: 'car-loan' },
            { label: 'Personal Loan', slug: 'personal-loan' },
            { label: 'Education Loan', slug: 'education-loan' },
            { label: 'Gold Loan', slug: 'gold-loan' },
        ],
    },
    {
        title: 'Rates & Offers',
        links: [
            { label: 'Interest Rates', slug: 'interest-rates' },
            { label: 'Festive Offers', slug: 'festive-offers' },
            { label: 'Cashback Deals', slug: 'cashback-deals' },
            { label: 'Fee Schedule', slug: 'fee-schedule' },
        ],
    },
    {
        title: 'Investments',
        links: [
            { label: 'Mutual Funds', slug: 'mutual-funds' },
            { label: 'Stocks & ETFs', slug: 'stocks-etfs' },
            { label: 'Bonds', slug: 'bonds' },
            { label: 'Insurance', slug: 'insurance' },
            { label: 'Tax Saver', slug: 'tax-saver' },
        ],
    },
];

export default navItems;
