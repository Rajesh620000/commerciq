// ==========================================================================
// APP STATE & CONSTANTS
// ==========================================================================
const STATE = {
    user: null,
    phone: null,
    subject: 'accountancy', // accountancy, bst, economics, mixed
    questionCount: '10', // '10', '20', '50', 'infinite'
    timerMode: 'classic', // classic, timed
    
    // Active session variables
    currentQuestionIndex: 0,
    score: 0,
    skippedCount: 0,
    startTime: null,
    sessionTimer: null,
    questionTimer: null,
    questionSecondsLeft: 60,
    
    // Questions list
    questionsList: [],
    currentQuestion: null,
    
    // Calculator state
    calcInput: '0',
    calcFormula: ''
};

// Subject details
const SUBJECT_DETAILS = {
    accountancy: { name: 'Accountancy', icon: 'fa-calculator' },
    bst: { name: 'Business Studies', icon: 'fa-briefcase' },
    economics: { name: 'Economics', icon: 'fa-chart-line' },
    mixed: { name: 'Mixed Commerce', icon: 'fa-shuffle' }
};

// Loading statuses for simulated dynamic compilation
const LOADER_STATUSES = {
    accountancy: [
        "Allocating partner sharing accounts...",
        "Evaluating share forfeiture ledgers...",
        "Formulating Quick & Liquid ratios...",
        "Valuating Super Profit Goodwill..."
    ],
    bst: [
        "Sourcing Fayol's 14 principles...",
        "Simulating corporate command structure...",
        "Auditing marketing mix channels...",
        "Indexing SEBI market rules..."
    ],
    economics: [
        "Synthesizing GDP and NNP aggregates...",
        "Modulating Legal Reserve Ratios...",
        "Compiling credit multiplier weights...",
        "Balancing Fiscal Deficit accounts..."
    ],
    mixed: [
        "Cross-compiling Accountancy ledger...",
        "Aggregating Business Studies cases...",
        "Modeling Macroeconomics formulas...",
        "Randomizing board paper matrix..."
    ]
};

// ==========================================================================
// INITIALIZATION & LOGIN MANAGEMENT
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupEventListeners();
    initCalculator();
});

function initApp() {
    const savedName = localStorage.getItem('commerciq_name');
    const savedPhone = localStorage.getItem('commerciq_phone');
    
    if (savedName && savedPhone) {
        STATE.user = savedName;
        STATE.phone = savedPhone;
        showDashboard();
    } else {
        document.getElementById('global-header').classList.add('hidden');
        showSection('login-screen');
    }
}

function showSection(sectionId) {
    document.querySelectorAll('.view').forEach(sec => {
        sec.classList.remove('active');
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function showDashboard() {
    document.getElementById('welcome-name').textContent = STATE.user;
    document.getElementById('header-username').textContent = STATE.user;
    
    // Show global header
    document.getElementById('global-header').classList.remove('hidden');
    
    updateConfigSelectionVisuals();
    showSection('setup-screen');
}

// Theme is handled purely by CSS now — no JS body class changes needed

// Synchronize visual toggles with STATE
function updateConfigSelectionVisuals() {
    document.querySelectorAll('#question-count-toggle .seg').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-value') === STATE.questionCount);
    });
    document.querySelectorAll('#timer-toggle .seg').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-value') === STATE.timerMode);
    });
}

// ==========================================================================
// EVENT LISTENERS SETUP
// ==========================================================================
function setupEventListeners() {
    // Login Submission
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validateAndLogin();
    });

    // Subject tile selections
    document.querySelectorAll('.subject-tile').forEach(card => {
        card.addEventListener('click', (e) => {
            const subjectVal = e.currentTarget.getAttribute('data-subject');
            STATE.subject = subjectVal;
            triggerDynamicLoader(() => {
                startQuizSession();
            });
        });
    });

    // Length Configuration toggles
    const qCountButtons = document.querySelectorAll('#question-count-toggle .seg');
    qCountButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            qCountButtons.forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            STATE.questionCount = target.getAttribute('data-value');
        });
    });

    // Timer Mode Configuration toggles
    const timerButtons = document.querySelectorAll('#timer-toggle .seg');
    timerButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            timerButtons.forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            STATE.timerMode = target.getAttribute('data-value');
        });
    });

    // Logout
    document.getElementById('btn-logout').addEventListener('click', () => {
        localStorage.removeItem('commerciq_name');
        localStorage.removeItem('commerciq_phone');
        STATE.user = null;
        STATE.phone = null;
        document.getElementById('global-header').classList.add('hidden');
        showSection('login-screen');
    });

    // Answer click selector (delegated)
    const optionsGrid = document.getElementById('options-grid');
    optionsGrid.addEventListener('click', (e) => {
        const optionBtn = e.target.closest('.opt-btn');
        if (!optionBtn || optionBtn.classList.contains('locked')) return;
        
        document.querySelectorAll('.opt-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        optionBtn.classList.add('selected');
        document.getElementById('btn-submit-answer').removeAttribute('disabled');
    });

    // Lock selected option
    document.getElementById('btn-submit-answer').addEventListener('click', () => {
        submitSelectedAnswer();
    });

    // Skip
    document.getElementById('btn-skip-question').addEventListener('click', () => {
        skipActiveQuestion();
    });

    // End Quiz early
    document.getElementById('btn-finish-quiz').addEventListener('click', () => {
        finishQuizEarly();
    });

    // Floating Calculator Widget controls
    document.getElementById('btn-toggle-calc').addEventListener('click', () => {
        toggleCalculatorWidget();
    });
    
    document.getElementById('btn-close-calc').addEventListener('click', () => {
        document.getElementById('calc-widget').classList.add('hidden');
    });

    // Result panel controls
    document.getElementById('btn-setup-retry').addEventListener('click', () => {
        showDashboard();
    });

    document.getElementById('btn-restart-quiz').addEventListener('click', () => {
        triggerDynamicLoader(() => {
            startQuizSession();
        });
    });

    document.getElementById('btn-download-pdf').addEventListener('click', () => {
        downloadPdfReportCard();
    });
}

// User credentials validation
function validateAndLogin() {
    const nameInput = document.getElementById('user-name');
    const phoneInput = document.getElementById('user-phone');
    const nameError = document.getElementById('name-error');
    const phoneError = document.getElementById('phone-error');
    
    let isValid = true;
    
    if (nameInput.value.trim().length < 3) {
        nameError.style.display = 'block';
        nameInput.classList.add('invalid');
        isValid = false;
    } else {
        nameError.style.display = 'none';
        nameInput.classList.remove('invalid');
    }
    
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneInput.value.trim())) {
        phoneError.style.display = 'block';
        phoneInput.classList.add('invalid');
        isValid = false;
    } else {
        phoneError.style.display = 'none';
        phoneInput.classList.remove('invalid');
    }
    
    if (isValid) {
        STATE.user = nameInput.value.trim();
        STATE.phone = phoneInput.value.trim();
        
        localStorage.setItem('commerciq_name', STATE.user);
        localStorage.setItem('commerciq_phone', STATE.phone);
        
        // Show simulated loader on first login for wow factor
        triggerDynamicLoader(() => {
            showDashboard();
        });
    }
}

// ==========================================================================
// DYNAMIC ANIMATED LOADER OVERLAY (Wow element)
// ==========================================================================
function triggerDynamicLoader(callback) {
    const overlay = document.getElementById('loading-overlay');
    const progressBar = document.getElementById('loader-progress-bar');
    const statusText = document.getElementById('loader-status');
    const titleText = document.getElementById('loader-title');
    
    const subjectName = SUBJECT_DETAILS[STATE.subject].name;
    titleText.textContent = `Preparing ${subjectName}`;
    
    // Reset loader elements
    progressBar.style.width = '0%';
    statusText.textContent = "Initializing templates...";
    overlay.classList.remove('hidden');
    
    const statuses = LOADER_STATUSES[STATE.subject] || LOADER_STATUSES.mixed;
    let progress = 0;
    
    const duration = 1400; // Total loading time
    const intervalTime = 40;
    const steps = duration / intervalTime;
    const progressPerStep = 100 / steps;
    
    const loaderInterval = setInterval(() => {
        progress += progressPerStep;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        
        // Cycle status messages dynamically based on progress
        if (progress < 25) {
            statusText.textContent = statuses[0];
        } else if (progress < 55) {
            statusText.textContent = statuses[1];
        } else if (progress < 80) {
            statusText.textContent = statuses[2];
        } else {
            statusText.textContent = statuses[3];
        }
        
        if (progress >= 100) {
            clearInterval(loaderInterval);
            setTimeout(() => {
                overlay.classList.add('hidden');
                if (callback) callback();
            }, 200);
        }
    }, intervalTime);
}

// ==========================================================================
// FLOATING FINANCIAL CALCULATOR DRAGGABLE & SYSTEM
// ==========================================================================
function initCalculator() {
    const calc = document.getElementById('calc-widget');
    const calcHeader = document.getElementById('calc-header');
    
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    
    calcHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        const rect = calc.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        calcHeader.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;
        
        const maxX = window.innerWidth - calc.offsetWidth;
        const maxY = window.innerHeight - calc.offsetHeight;
        
        newX = Math.max(10, Math.min(newX, maxX - 10));
        newY = Math.max(10, Math.min(newY, maxY - 10));
        
        calc.style.left = `${newX}px`;
        calc.style.top = `${newY}px`;
        calc.style.bottom = 'auto';
        calc.style.right = 'auto';
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        calcHeader.style.cursor = 'move';
    });
    
    document.querySelectorAll('.ck').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const el = e.target.closest('.ck');
            const btnVal = el.textContent.trim();
            const action = el.getAttribute('data-action');
            handleCalculatorInput(btnVal, action);
        });
    });
}

function toggleCalculatorWidget() {
    const calc = document.getElementById('calc-widget');
    calc.classList.toggle('hidden');
    
    if (!calc.classList.contains('hidden')) {
        calc.style.bottom = '24px';
        calc.style.right = '24px';
        calc.style.left = 'auto';
        calc.style.top = 'auto';
    }
}

function handleCalculatorInput(value, action) {
    const display = document.getElementById('calc-display');
    const formula = document.getElementById('calc-formula');
    
    if (action === 'clear') {
        STATE.calcInput = '0';
        STATE.calcFormula = '';
    } else if (action === 'backspace') {
        if (STATE.calcInput.length > 1) {
            STATE.calcInput = STATE.calcInput.slice(0, -1);
        } else {
            STATE.calcInput = '0';
        }
    } else if (action === 'percent') {
        try {
            const currentNum = parseFloat(STATE.calcInput);
            if (!isNaN(currentNum)) {
                STATE.calcInput = (currentNum / 100).toString();
            }
        } catch (err) {
            STATE.calcInput = 'Error';
        }
    } else if (action === 'divide' || action === 'multiply' || action === 'subtract' || action === 'add') {
        const symbol = action === 'divide' ? '/' : action === 'multiply' ? '*' : action === 'subtract' ? '-' : '+';
        const displaySymbol = action === 'divide' ? '÷' : action === 'multiply' ? '×' : action === 'subtract' ? '-' : '+';
        
        if (STATE.calcFormula.endsWith('/') || STATE.calcFormula.endsWith('*') || STATE.calcFormula.endsWith('-') || STATE.calcFormula.endsWith('+')) {
            if (STATE.calcInput === '0') {
                STATE.calcFormula = STATE.calcFormula.slice(0, -1) + symbol;
                formula.textContent = formula.textContent.slice(0, -1) + displaySymbol;
                return;
            }
        }
        
        STATE.calcFormula += STATE.calcInput + symbol;
        formula.textContent = STATE.calcFormula.replace(/\*/g, '×').replace(/\//g, '÷');
        STATE.calcInput = '0';
    } else if (value === '=') {
        try {
            const fullExpression = STATE.calcFormula + STATE.calcInput;
            if (!fullExpression) return;
            
            const sanitizedExpression = fullExpression.replace(/÷/g, '/').replace(/×/g, '*');
            
            let result = eval(sanitizedExpression);
            if (result % 1 !== 0) {
                result = parseFloat(result.toFixed(6));
            }
            
            formula.textContent = fullExpression + ' =';
            STATE.calcInput = result.toString();
            STATE.calcFormula = '';
        } catch (err) {
            STATE.calcInput = 'Error';
            STATE.calcFormula = '';
        }
    } else {
        if (value === '.') {
            if (STATE.calcInput.includes('.')) return;
        }
        
        if (STATE.calcInput === '0' && value !== '.') {
            STATE.calcInput = value;
        } else {
            STATE.calcInput += value;
        }
    }
    
    display.textContent = STATE.calcInput.substring(0, 12);
}

// ==========================================================================
// INFINITE RANDOMIZED QUESTION GENERATOR ENGINE
// ==========================================================================
const INDIAN_NAMES = ['Aman', 'Bhavna', 'Charu', 'Deepak', 'Esha', 'Farhan', 'Gaurav', 'Harish', 'Isha', 'Jatin', 'Karan', 'Lata', 'Manish', 'Neha', 'Om', 'Pooja', 'Rohan', 'Sneha', 'Tushar', 'Vijay'];
const COMPANY_NAMES = ['Vedic Exports Ltd.', 'Apex Infra Corp.', 'Indus Organic Foods', 'Shakti Alloys Ltd.', 'BlueSky Software', 'Himalaya Herbal Ltd.', 'Narmada Cement Co.', 'Ganga Textiles', 'Saraswati Publications', 'Bharat Auto Parts'];
const PARTNERSHIP_NAMES = [
    { p1: 'Ravi', p2: 'Kavi' }, { p1: 'Amit', p2: 'Sumit' }, { p1: 'Rahul', p2: 'Sachin' },
    { p1: 'Priya', p2: 'Riya' }, { p1: 'Vijay', p2: 'Ajay' }, { p1: 'Neha', p2: 'Sneha' }
];

function generateQuestion(subject) {
    let activeSubject = subject;
    if (subject === 'mixed') {
        const subjects = ['accountancy', 'bst', 'economics'];
        activeSubject = subjects[Math.floor(Math.random() * subjects.length)];
    }
    
    if (activeSubject === 'accountancy') {
        return generateAccountancyQuestion();
    } else if (activeSubject === 'bst') {
        return generateBstQuestion();
    } else {
        return generateEconomicsQuestion();
    }
}

// --- Accountancy Templates ---
function generateAccountancyQuestion() {
    const templates = [
        // Partnership Ratios
        () => {
            const p = PARTNERSHIP_NAMES[Math.floor(Math.random() * PARTNERSHIP_NAMES.length)];
            const r1 = Math.floor(Math.random() * 3) + 2;
            const r2 = Math.floor(Math.random() * 2) + 1;
            const newShareNum = 1;
            const newShareDen = Math.random() > 0.5 ? 5 : 6;
            const newPartner = Math.random() > 0.5 ? 'Kabir' : 'Karan';
            
            const totalRatio = r1 + r2;
            const remainingShare = newShareDen - 1;
            
            const commonDen = totalRatio * newShareDen;
            const aShare = r1 * remainingShare;
            const bShare = r2 * remainingShare;
            const cShare = totalRatio;
            
            let n1 = aShare, n2 = bShare, n3 = cShare;
            let gcdVal = gcd(n1, gcd(n2, n3));
            n1 /= gcdVal; n2 /= gcdVal; n3 /= gcdVal;
            
            const correctRatio = `${n1}:${n2}:${n3}`;
            const wrong1 = `${r1}:${r2}:1`;
            const wrong2 = `${n1 + 1}:${n2 + 1}:${n3}`;
            const wrong3 = `${n1 * 2}:${n2}:${n3 + 1}`;
            
            const options = shuffleArray([correctRatio, wrong1, wrong2, wrong3]);
            
            return {
                subject: 'accountancy',
                text: `${p.p1} and ${p.p2} are partners sharing profits in the ratio ${r1}:${r2}. They admit ${newPartner} into partnership for 1/${newShareDen}th share in the profits. Calculate the new profit sharing ratio.`,
                options: options.shuffled,
                answerIndex: options.shuffled.indexOf(correctRatio),
                explanation: `<strong>Step-by-step Solution:</strong><br>
                1. Total Profit share = 1<br>
                2. Share given to ${newPartner} = 1/${newShareDen}<br>
                3. Remaining share for existing partners = 1 - 1/${newShareDen} = ${remainingShare}/${newShareDen}<br>
                4. ${p.p1}'s new share = ${r1}/${totalRatio} of ${remainingShare}/${newShareDen} = ${r1 * remainingShare}/${commonDen}<br>
                5. ${p.p2}'s new share = ${r2}/${totalRatio} of ${remainingShare}/${newShareDen} = ${r2 * remainingShare}/${commonDen}<br>
                6. ${newPartner}'s share = 1/${newShareDen} = ${totalRatio}/${commonDen}<br>
                Comparing shares gives ratio ${aShare}:${bShare}:${cShare}, which simplifies to <strong>${correctRatio}</strong>.`
            };
        },
        
        // Quick Assets / Quick Ratio
        () => {
            const cl = (Math.floor(Math.random() * 8) + 4) * 20000;
            const currentRatio = parseFloat((Math.random() * 1.5 + 1.5).toFixed(1));
            const ca = Math.round(cl * currentRatio);
            const inv = Math.round(cl * (Math.random() * 0.5 + 0.4));
            const quickRatioVal = parseFloat(((ca - inv) / cl).toFixed(2));
            
            const correctStr = `${quickRatioVal}:1`;
            const wrong1 = `${(quickRatioVal + 0.5).toFixed(2)}:1`;
            const wrong2 = `${(ca / cl).toFixed(2)}:1`;
            const wrong3 = `${(inv / cl).toFixed(2)}:1`;
            
            const options = shuffleArray([correctStr, wrong1, wrong2, wrong3]);
            
            return {
                subject: 'accountancy',
                text: `From the following details, calculate the Quick Ratio (Liquid Ratio):<br>
                • Current Assets = ₹${ca.toLocaleString('en-IN')}<br>
                • Current Liabilities = ₹${cl.toLocaleString('en-IN')}<br>
                • Inventory = ₹${inv.toLocaleString('en-IN')}`,
                options: options.shuffled,
                answerIndex: options.shuffled.indexOf(correctStr),
                explanation: `<strong>Step-by-step Solution:</strong><br>
                1. <strong>Quick Assets Formula:</strong> Current Assets - Inventory<br>
                &nbsp;&nbsp;&nbsp;&nbsp;Quick Assets = ₹${ca.toLocaleString('en-IN')} - ₹${inv.toLocaleString('en-IN')} = ₹${(ca - inv).toLocaleString('en-IN')}<br>
                2. <strong>Quick Ratio Formula:</strong> Quick Assets / Current Liabilities<br>
                &nbsp;&nbsp;&nbsp;&nbsp;Quick Ratio = ₹${(ca - inv).toLocaleString('en-IN')} / ₹${cl.toLocaleString('en-IN')} = <strong>${quickRatioVal}:1</strong>.`
            };
        },
        
        // Share Forfeiture and Capital Reserve
        () => {
            const co = COMPANY_NAMES[Math.floor(Math.random() * COMPANY_NAMES.length)];
            const shares = (Math.floor(Math.random() * 5) + 2) * 100;
            const nominal = 10;
            const calledUp = Math.random() > 0.5 ? 10 : 8;
            const unpaid = Math.random() > 0.5 ? 3 : 2;
            const paid = calledUp - unpaid;
            
            const reissued = Math.random() > 0.5 ? shares : shares / 2;
            const reissuePrice = Math.floor(Math.random() * 3) + 7;
            const discountAllowed = nominal - reissuePrice;
            
            const capitalReserveVal = reissued * (paid - discountAllowed);
            
            const correctVal = `₹${capitalReserveVal.toLocaleString('en-IN')}`;
            const wrong1 = `₹${(reissued * paid).toLocaleString('en-IN')}`;
            const wrong2 = `₹${(shares * paid).toLocaleString('en-IN')}`;
            const wrong3 = `₹${Math.max(0, capitalReserveVal - 500).toLocaleString('en-IN')}`;
            
            const options = shuffleArray([correctVal, wrong1, wrong2, wrong3]);
            
            return {
                subject: 'accountancy',
                text: `${co} forfeited ${shares} Equity shares of ₹${nominal} each, on which ₹${calledUp} per share was called up, for non-payment of first call of ₹${unpaid} per share. Out of these, ${reissued} shares were reissued as fully paid up for ₹${reissuePrice} per share. What amount should be transferred to Capital Reserve Account?`,
                options: options.shuffled,
                answerIndex: options.shuffled.indexOf(correctVal),
                explanation: `<strong>Step-by-step Solution:</strong><br>
                1. <strong>Forfeited amount per share</strong> = Called Up - Unpaid Call = ₹${calledUp} - ₹${unpaid} = ₹${paid}<br>
                2. <strong>Total forfeited on reissued shares</strong> = ${reissued} shares × ₹${paid} = ₹${reissued * paid}<br>
                3. <strong>Discount allowed on reissue</strong> = Face Value (₹${nominal}) - Reissue Price (₹${reissuePrice}) = ₹${discountAllowed} per share<br>
                &nbsp;&nbsp;&nbsp;&nbsp;Total discount allowed = ${reissued} shares × ₹${discountAllowed} = ₹${reissued * discountAllowed}<br>
                4. <strong>Transfer to Capital Reserve</strong> = Total Forfeited - Reissue Discount = ₹${reissued * paid} - ₹${reissued * discountAllowed} = <strong>₹${capitalReserveVal.toLocaleString('en-IN')}</strong>.`
            };
        },
        
        // Super Profit Goodwill
        () => {
            const avgProfit = (Math.floor(Math.random() * 8) + 12) * 10000;
            const capEmployed = (Math.floor(Math.random() * 5) + 6) * 100000;
            const nrr = Math.random() > 0.5 ? 10 : 12;
            const yearsPurchase = Math.random() > 0.5 ? 2 : 3;
            
            const normalProfit = capEmployed * (nrr / 100);
            const superProfit = avgProfit - normalProfit;
            const goodwill = superProfit * yearsPurchase;
            
            const correctStr = `₹${goodwill.toLocaleString('en-IN')}`;
            const wrong1 = `₹${(avgProfit * yearsPurchase).toLocaleString('en-IN')}`;
            const wrong2 = `₹${(normalProfit * yearsPurchase).toLocaleString('en-IN')}`;
            const wrong3 = `₹${Math.max(10000, goodwill - 20000).toLocaleString('en-IN')}`;
            
            const options = shuffleArray([correctStr, wrong1, wrong2, wrong3]);
            
            return {
                subject: 'accountancy',
                text: `Compute the Goodwill of a firm at ${yearsPurchase} years' purchase of Super Profit based on the following details:<br>
                • Average Profits of last 3 years: ₹${avgProfit.toLocaleString('en-IN')}<br>
                • Capital Employed in the business: ₹${capEmployed.toLocaleString('en-IN')}<br>
                • Normal Rate of Return: ${nrr}%`,
                options: options.shuffled,
                answerIndex: options.shuffled.indexOf(correctStr),
                explanation: `<strong>Step-by-step Solution:</strong><br>
                1. <strong>Normal Profit</strong> = Capital Employed × Normal Rate of Return = ₹${capEmployed.toLocaleString('en-IN')} × ${nrr}% = ₹${normalProfit.toLocaleString('en-IN')}<br>
                2. <strong>Super Profit</strong> = Average Profit - Normal Profit = ₹${avgProfit.toLocaleString('en-IN')} - ₹${normalProfit.toLocaleString('en-IN')} = ₹${superProfit.toLocaleString('en-IN')}<br>
                3. <strong>Goodwill</strong> = Super Profit × Years' Purchase = ₹${superProfit.toLocaleString('en-IN')} × ${yearsPurchase} = <strong>₹${goodwill.toLocaleString('en-IN')}</strong>.`
            };
        },
        
        // Debt Equity Ratio
        () => {
            const equity = (Math.floor(Math.random() * 8) + 4) * 50000;
            const debtRatio = Math.random() > 0.5 ? 2 : 1.5;
            const debt = equity * debtRatio;
            
            const correctStr = `${debtRatio}:1`;
            const wrong1 = `${(1 / debtRatio).toFixed(2)}:1`;
            const wrong2 = `3:1`;
            const wrong3 = `${debtRatio + 1}:1`;
            
            const options = shuffleArray([correctStr, wrong1, wrong2, wrong3]);
            
            return {
                subject: 'accountancy',
                text: `If Shareholders' Equity is ₹${equity.toLocaleString('en-IN')} and Long-term Borrowings are ₹${debt.toLocaleString('en-IN')}, what is the Debt-to-Equity Ratio of the enterprise?`,
                options: options.shuffled,
                answerIndex: options.shuffled.indexOf(correctStr),
                explanation: `<strong>Step-by-step Solution:</strong><br>
                1. <strong>Debt-Equity Ratio Formula:</strong> Long-term Debt / Shareholders' Equity<br>
                2. Debt = ₹${debt.toLocaleString('en-IN')}<br>
                3. Equity = ₹${equity.toLocaleString('en-IN')}<br>
                4. Ratio = ₹${debt.toLocaleString('en-IN')} / ₹${equity.toLocaleString('en-IN')} = <strong>${debtRatio}:1</strong>.`
            };
        }
    ];
    
    return templates[Math.floor(Math.random() * templates.length)]();
}

// --- Business Studies Templates ---
function generateBstQuestion() {
    const templates = [
        () => {
            const name = INDIAN_NAMES[Math.floor(Math.random() * INDIAN_NAMES.length)];
            const co = COMPANY_NAMES[Math.floor(Math.random() * COMPANY_NAMES.length)];
            
            const principles = [
                {
                    name: 'Unity of Command',
                    desc: `${name}, an executive at ${co}, receives conflicting instructions from both the marketing head and the sales manager. She is confused about whose directives to prioritize. Which principle of Fayol is violated?`,
                    wrong: ['Unity of Direction', 'Scalar Chain', 'Division of Work']
                },
                {
                    name: 'Division of Work',
                    desc: `At ${co}, work is divided into small specialized tasks, and each job is performed by trained specialists. This boosts overall efficiency and productivity. Identify the Fayol principle applied.`,
                    wrong: ['Discipline', 'Remuneration of Employees', 'Authority and Responsibility']
                },
                {
                    name: 'Scalar Chain',
                    desc: `In case of an emergency at ${co}, two operators from different departments need to communicate directly by bypassing standard channels using a 'Gang Plank'. This exception relates to which principle?`,
                    wrong: ['Unity of Command', 'Order', 'Equity']
                },
                {
                    name: 'Equity',
                    desc: `The managing director of ${co} ensures there is no discrimination on account of gender, caste, or religion when determining staff salaries and promotions. Which principle of Fayol is being honored?`,
                    wrong: ['Order', 'Initiative', 'Espirit de Corps']
                }
            ];
            
            const chosen = principles[Math.floor(Math.random() * principles.length)];
            const options = shuffleArray([chosen.name, ...chosen.wrong]);
            
            return {
                subject: 'bst',
                text: chosen.desc,
                options: options.shuffled,
                answerIndex: options.shuffled.indexOf(chosen.name),
                explanation: `<strong>Conceptual Context:</strong><br>
                • <strong>${chosen.name}</strong> is the principle being discussed. Fayol proposed 14 principles of general management to establish systematic administrative behavior in organizations.`
            };
        },
        
        () => {
            const techniques = [
                {
                    name: 'Functional Foremanship',
                    desc: `Which technique of Taylor breaks the principle of Unity of Command to split planning and execution functions, assigning 8 distinct bosses to oversee a worker?`,
                    wrong: ['Time Study', 'Differential Piece Wage System', 'Standardisation of Work']
                },
                {
                    name: 'Differential Piece Wage System',
                    desc: `A factory rewards workers by paying high rates to those who exceed standard output and lower rates to those who fall short. This technique of Taylor is called:`,
                    wrong: ['Method Study', 'Fatigue Study', 'Functional Foremanship']
                },
                {
                    name: 'Method Study',
                    desc: `The management technique that aims to find the 'one best way' of doing a job to minimize production cost and maximize utilization of resources is:`,
                    wrong: ['Motion Study', 'Time Study', 'Fatigue Study']
                }
            ];
            
            const chosen = techniques[Math.floor(Math.random() * techniques.length)];
            const options = shuffleArray([chosen.name, ...chosen.wrong]);
            
            return {
                subject: 'bst',
                text: chosen.desc,
                options: options.shuffled,
                answerIndex: options.shuffled.indexOf(chosen.name),
                explanation: `<strong>Conceptual Context:</strong><br>
                F.W. Taylor, the Father of Scientific Management, introduced standard techniques (like <strong>${chosen.name}</strong>) to scientifically measure work and improve factory shop-floor efficiency.`
            };
        },
        
        () => {
            const functions = [
                {
                    name: 'Controlling',
                    desc: `Which management function involves establishing performance standards, measuring actual results, comparing them, and initiating corrective actions?`,
                    wrong: ['Planning', 'Organising', 'Directing']
                },
                {
                    name: 'Staffing',
                    desc: `The management function that encompasses human resource planning, recruitment, selection, placement, training, and performance appraisal is:`,
                    wrong: ['Organising', 'Directing', 'Controlling']
                },
                {
                    name: 'Planning',
                    desc: `Which function of management bridges the gap between where the organization is today and where it wants to reach in the future by setting advance goals?`,
                    wrong: ['Organising', 'Staffing', 'Directing']
                }
            ];
            
            const chosen = functions[Math.floor(Math.random() * functions.length)];
            const options = shuffleArray([chosen.name, ...chosen.wrong]);
            
            return {
                subject: 'bst',
                text: chosen.desc,
                options: options.shuffled,
                answerIndex: options.shuffled.indexOf(chosen.name),
                explanation: `<strong>Conceptual Context:</strong><br>
                Management processes are cyclic, initiating with <strong>Planning</strong> and concluding with <strong>Controlling</strong>. The core function described here is <strong>${chosen.name}</strong>.`
            };
        },
        
        () => {
            const instruments = [
                {
                    name: 'Treasury Bill',
                    desc: `Which money market instrument is issued by the Reserve Bank of India on behalf of the Central Government to meet short-term liquidity, and is also known as a Zero Coupon Bond?`,
                    wrong: ['Commercial Paper', 'Certificate of Deposit', 'Call Money']
                },
                {
                    name: 'Commercial Paper',
                    desc: `An unsecured promissory note issued by highly rated creditworthy corporations to bridge finance their seasonal working capital needs is:`,
                    wrong: ['Treasury Bill', 'Certificate of Deposit', 'Mutual Fund']
                },
                {
                    name: 'SEBI',
                    desc: `Which regulator in India is statutory, formed to protect the interests of retail investors and regulate capital markets, stock brokers, and merchant bankers?`,
                    wrong: ['Reserve Bank of India', 'Ministry of Finance', 'NITI Aayog']
                }
            ];
            
            const chosen = instruments[Math.floor(Math.random() * instruments.length)];
            const options = shuffleArray([chosen.name, ...chosen.wrong]);
            
            return {
                subject: 'bst',
                text: chosen.desc,
                options: options.shuffled,
                answerIndex: options.shuffled.indexOf(chosen.name),
                explanation: `<strong>Conceptual Context:</strong><br>
                Financial markets are split into Money Market (short term) and Capital Market (long term). <strong>${chosen.name}</strong> is a vital component regulated to maintain financial integrity.`
            };
        }
    ];
    
    return templates[Math.floor(Math.random() * templates.length)]();
}

// --- Economics Templates ---
function generateEconomicsQuestion() {
    const templates = [
        // GDP to NNP aggregates
        () => {
            const gdp = (Math.floor(Math.random() * 8) + 12) * 1000;
            const dep = (Math.floor(Math.random() * 5) + 6) * 100;
            const nfia = (Math.floor(Math.random() * 5) - 2) * 100;
            const nit = (Math.floor(Math.random() * 4) + 6) * 100;
            
            const nnpFc = gdp - dep + nfia - nit;
            
            const correctStr = `₹${nnpFc} Crores`;
            const wrong1 = `₹${gdp - dep} Crores`;
            const wrong2 = `₹${gdp - dep - nit} Crores`;
            const wrong3 = `₹${gdp + nfia} Crores`;
            
            const options = shuffleArray([correctStr, wrong1, wrong2, wrong3]);
            
            return {
                subject: 'economics',
                text: `Calculate <strong>National Income (NNP at FC)</strong> based on the following macroeconomic aggregates:<br>
                • GDP at Market Price (GDP_MP) = ₹${gdp} Crores<br>
                • Depreciation = ₹${dep} Crores<br>
                • Net Factor Income from Abroad (NFIA) = ₹${nfia} Crores<br>
                • Net Indirect Taxes (NIT) = ₹${nit} Crores`,
                options: options.shuffled,
                answerIndex: options.shuffled.indexOf(correctStr),
                explanation: `<strong>Step-by-step Solution:</strong><br>
                1. <strong>National Income (NNP_FC) Formula:</strong> GDP_MP - Depreciation + NFIA - NIT<br>
                2. Substituing the values:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;NNP_FC = ₹${gdp} - ₹${dep} + (₹${nfia}) - ₹${nit}<br>
                &nbsp;&nbsp;&nbsp;&nbsp;NNP_FC = ₹${gdp - dep} + (₹${nfia}) - ₹${nit}<br>
                &nbsp;&nbsp;&nbsp;&nbsp;NNP_FC = ₹${gdp - dep + nfia} - ₹${nit}<br>
                &nbsp;&nbsp;&nbsp;&nbsp;NNP_FC = <strong>₹${nnpFc} Crores</strong>.`
            };
        },
        
        // Legal Reserve Ratio multiplier
        () => {
            const lrr = Math.random() > 0.5 ? 10 : 20;
            const initialDeposit = (Math.floor(Math.random() * 8) + 2) * 1000;
            
            const moneyMultiplier = 100 / lrr;
            const totalCredit = initialDeposit * moneyMultiplier;
            
            const correctStr = `₹${totalCredit.toLocaleString('en-IN')}`;
            const wrong1 = `₹${(initialDeposit * (lrr / 100)).toLocaleString('en-IN')}`;
            const wrong2 = `₹${(initialDeposit + 5000).toLocaleString('en-IN')}`;
            const wrong3 = `₹${(initialDeposit * 2).toLocaleString('en-IN')}`;
            
            const options = shuffleArray([correctStr, wrong1, wrong2, wrong3]);
            
            return {
                subject: 'economics',
                text: `If the Legal Reserve Ratio (LRR) is set by the RBI at ${lrr}%, and the commercial banking system receives an initial primary deposit of ₹${initialDeposit.toLocaleString('en-IN')}, what is the maximum amount of credit/money that can be created in the economy?`,
                options: options.shuffled,
                answerIndex: options.shuffled.indexOf(correctStr),
                explanation: `<strong>Step-by-step Solution:</strong><br>
                1. <strong>Money Multiplier Formula:</strong> 1 / LRR = 1 / ${(lrr/100)} = ${moneyMultiplier}<br>
                2. <strong>Total Credit Created</strong> = Initial Deposit × Money Multiplier<br>
                &nbsp;&nbsp;&nbsp;&nbsp;Total Credit = ₹${initialDeposit.toLocaleString('en-IN')} × ${moneyMultiplier} = <strong>₹${totalCredit.toLocaleString('en-IN')}</strong>.`
            };
        },
        
        // Monetary policy controls
        () => {
            const scenarios = [
                {
                    tool: 'increase the Repo Rate',
                    text: `During high inflation periods in India, the Reserve Bank of India (RBI) is most likely to:`,
                    wrong: ['decrease the Repo Rate', 'decrease the Cash Reserve Ratio', 'purchase Government Securities in Open Market']
                },
                {
                    tool: 'Cash Reserve Ratio (CRR)',
                    text: `The statutory proportion of net demand and time liabilities that commercial banks are required to maintain in cash balance with the RBI is known as:`,
                    wrong: ['Statutory Liquidity Ratio (SLR)', 'Marginal Standing Facility', 'Repo Rate']
                },
                {
                    tool: 'Autonomous items',
                    text: `Balance of Payments transactions that are undertaken independently of the state of BoP to earn profits are referred to as:`,
                    wrong: ['Accommodating items', 'Official Reserve transactions', 'Transfer items']
                }
            ];
            
            const chosen = scenarios[Math.floor(Math.random() * scenarios.length)];
            const options = shuffleArray([chosen.tool, ...chosen.wrong]);
            
            return {
                subject: 'economics',
                text: chosen.text,
                options: options.shuffled,
                answerIndex: options.shuffled.indexOf(chosen.tool),
                explanation: `<strong>Macroeconomics Principles:</strong><br>
                • The correct concept is <strong>${chosen.tool}</strong>. The RBI administers quantitative tools (like CRR, Repo Rate) to regulate credit money supply, stabilizing inflation/deflation.`
            };
        },
        
        // Government budget fiscal deficits
        () => {
            const revExp = (Math.floor(Math.random() * 5) + 8) * 1000;
            const revRec = (Math.floor(Math.random() * 4) + 5) * 1000;
            const capExp = (Math.floor(Math.random() * 3) + 4) * 1000;
            const capRecExBorrowings = (Math.floor(Math.random() * 2) + 2) * 1000;
            
            const fiscalDeficit = (revExp + capExp) - (revRec + capRecExBorrowings);
            
            const correctStr = `₹${fiscalDeficit} Crores`;
            const wrong1 = `₹${revExp - revRec} Crores`;
            const wrong2 = `₹${(revExp + capExp) - revRec} Crores`;
            const wrong3 = `₹${(capExp - capRecExBorrowings)} Crores`;
            
            const options = shuffleArray([correctStr, wrong1, wrong2, wrong3]);
            
            return {
                subject: 'economics',
                text: `Determine the <strong>Fiscal Deficit</strong> of the government based on these annual budget variables:<br>
                • Revenue Expenditure = ₹${revExp} Crores<br>
                • Revenue Receipts = ₹${revRec} Crores<br>
                • Capital Expenditure = ₹${capExp} Crores<br>
                • Capital Receipts (excluding borrowings) = ₹${capRecExBorrowings} Crores`,
                options: options.shuffled,
                answerIndex: options.shuffled.indexOf(correctStr),
                explanation: `<strong>Step-by-step Solution:</strong><br>
                1. <strong>Fiscal Deficit Formula:</strong> Total Expenditure - Total Receipts (excluding borrowings)<br>
                &nbsp;&nbsp;&nbsp;&nbsp;Total Expenditure = Rev Exp + Cap Exp = ₹${revExp} + ₹${capExp} = ₹${revExp + capExp} Crores<br>
                &nbsp;&nbsp;&nbsp;&nbsp;Total Receipts (ex. borrowings) = Rev Receipts + Cap Receipts (ex. borrowings) = ₹${revRec} + ₹${capRecExBorrowings} = ₹${revRec + capRecExBorrowings} Crores<br>
                2. Fiscal Deficit = ₹${revExp + capExp} - ₹${revRec + capRecExBorrowings} = <strong>₹${fiscalDeficit} Crores</strong>.`
            };
        }
    ];
    
    return templates[Math.floor(Math.random() * templates.length)]();
}

function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return { shuffled: copy, original: array };
}

function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
}

// ==========================================================================
// QUIZ ENGINE FLOW MANAGEMENT
// ==========================================================================
function startQuizSession() {
    STATE.currentQuestionIndex = 0;
    STATE.score = 0;
    STATE.skippedCount = 0;
    STATE.questionsList = [];
    STATE.startTime = new Date();
    
    STATE.calcInput = '0';
    STATE.calcFormula = '';
    document.getElementById('calc-display').textContent = '0';
    document.getElementById('calc-formula').textContent = '';
    
    const badge = document.getElementById('active-subject-badge');
    const details = SUBJECT_DETAILS[STATE.subject];
    badge.innerHTML = `<i class="fa-solid ${details.icon}"></i> ${details.name}`;
    
    showSection('quiz-screen');
    
    loadNextQuestion();
}

function loadNextQuestion() {
    const nextQ = generateQuestion(STATE.subject);
    STATE.currentQuestion = nextQ;
    STATE.questionsList.push(nextQ);
    
    STATE.currentQuestionIndex++;
    
    // Setup Header progress labels
    const progressText = document.getElementById('quiz-progress-text');
    if (STATE.questionCount === 'infinite') {
        progressText.textContent = `Practice Mode - Question ${STATE.currentQuestionIndex}`;
        document.getElementById('quiz-progress-bar').style.width = '100%';
    } else {
        const total = parseInt(STATE.questionCount);
        progressText.textContent = `Question ${STATE.currentQuestionIndex} of ${total}`;
        const pct = (STATE.currentQuestionIndex / total) * 100;
        document.getElementById('quiz-progress-bar').style.width = `${pct}%`;
    }
    
    // Update Answered statistics count in header
    document.getElementById('answered-count').textContent = STATE.questionsList.length - 1;
    
    document.getElementById('question-text').innerHTML = nextQ.text;
    
    // Option grid rendering
    const optionsGrid = document.getElementById('options-grid');
    optionsGrid.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D'];
    nextQ.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'opt-btn';
        btn.setAttribute('data-index', idx);
        
        btn.innerHTML = `
            <span class="opt-letter">${letters[idx]}</span>
            <span class="opt-content">${opt}</span>
        `;
        
        optionsGrid.appendChild(btn);
    });
    
    document.getElementById('btn-submit-answer').setAttribute('disabled', 'true');
    document.getElementById('btn-submit-answer').innerHTML = `Lock Answer <i class="fa-solid fa-lock"></i>`;
    document.getElementById('btn-skip-question').style.display = 'inline-flex';
    
    resetTimer();
}

function resetTimer() {
    clearInterval(STATE.questionTimer);
    const timerBubble = document.getElementById('timer-bubble');
    
    if (STATE.timerMode === 'classic') {
        timerBubble.style.display = 'none';
    } else {
        timerBubble.style.display = 'inline-flex';
        timerBubble.classList.remove('danger-time');
        STATE.questionSecondsLeft = 60;
        document.getElementById('timer-text').textContent = '01:00';
        
        STATE.questionTimer = setInterval(() => {
            STATE.questionSecondsLeft--;
            
            let displayMin = Math.floor(STATE.questionSecondsLeft / 60);
            let displaySec = STATE.questionSecondsLeft % 60;
            displaySec = displaySec < 10 ? '0' + displaySec : displaySec;
            document.getElementById('timer-text').textContent = `0${displayMin}:${displaySec}`;
            
            if (STATE.questionSecondsLeft <= 15) {
                timerBubble.classList.add('danger-time');
            }
            
            if (STATE.questionSecondsLeft <= 0) {
                clearInterval(STATE.questionTimer);
                autoTimeOutQuestion();
            }
        }, 1000);
    }
}

function autoTimeOutQuestion() {
    STATE.currentQuestion.status = 'incorrect';
    STATE.currentQuestion.userSelected = -1; // timed out
    
    evaluateFlowTransition();
}

function submitSelectedAnswer() {
    const selectedBtn = document.querySelector('.opt-btn.selected');
    if (!selectedBtn) return;
    
    clearInterval(STATE.questionTimer);
    
    const selectedIdx = parseInt(selectedBtn.getAttribute('data-index'));
    const isCorrect = selectedIdx === STATE.currentQuestion.answerIndex;
    
    STATE.currentQuestion.userSelected = selectedIdx;
    
    if (isCorrect) {
        STATE.score++;
        STATE.currentQuestion.status = 'correct';
    } else {
        STATE.currentQuestion.status = 'incorrect';
    }
    
    evaluateFlowTransition();
}

function skipActiveQuestion() {
    clearInterval(STATE.questionTimer);
    STATE.skippedCount++;
    STATE.currentQuestion.userSelected = null;
    STATE.currentQuestion.status = 'skipped';
    
    evaluateFlowTransition();
}

function evaluateFlowTransition() {
    if (STATE.questionCount !== 'infinite') {
        const total = parseInt(STATE.questionCount);
        if (STATE.currentQuestionIndex >= total) {
            showResultsSummary();
            return;
        }
    }
    
    loadNextQuestion();
}

function finishQuizEarly() {
    clearInterval(STATE.questionTimer);
    
    const activeSubmitBtn = document.getElementById('btn-submit-answer');
    if (activeSubmitBtn && activeSubmitBtn.hasAttribute('disabled')) {
        // Discard the last question generated as it wasn't locked/answered
        STATE.questionsList.pop();
    }
    
    showResultsSummary();
}

// ==========================================================================
// RESULTS DASHBOARD GENERATOR
// ==========================================================================
function showResultsSummary() {
    clearInterval(STATE.questionTimer);
    
    document.getElementById('results-user-detail').innerHTML = `
        <span style="font-family: var(--font-heading); font-weight: 700; color: #fff;">${STATE.user.toUpperCase()}</span> 
        &nbsp;•&nbsp; CONTACT: ${STATE.phone}
    `;
    
    const totalQuestions = STATE.questionsList.length;
    
    if (totalQuestions === 0) {
        alert("You must answer or skip at least one question before ending the quiz.");
        showDashboard();
        return;
    }
    
    const correctCount = STATE.score;
    const skippedCount = STATE.skippedCount;
    const incorrectCount = totalQuestions - correctCount - skippedCount;
    
    const accuracy = totalQuestions > skippedCount ? Math.round((correctCount / (totalQuestions - skippedCount)) * 100) : 0;
    const finalPercent = Math.round((correctCount / totalQuestions) * 100);
    
    // Radial gauge calculation (radius 74, circumference = 2 * PI * 74 = 465)
    const strokeDashOffset = 465 - (465 * finalPercent) / 100;
    const ring = document.getElementById('score-ring-fill');
    ring.style.strokeDashoffset = strokeDashOffset;
    
    document.getElementById('score-percent').textContent = `${finalPercent}%`;
    document.getElementById('score-ratio').textContent = `${correctCount}/${totalQuestions} Qs`;
    
    let rating = 'Keep Practicing!';
    if (finalPercent >= 90) rating = 'Master Performance!';
    else if (finalPercent >= 75) rating = 'Excellent Work!';
    else if (finalPercent >= 50) rating = 'Satisfactory Progress!';
    
    document.getElementById('score-rating').textContent = rating;
    
    document.getElementById('accuracy-lbl').textContent = `${accuracy}%`;
    document.getElementById('accuracy-bar').style.width = `${accuracy}%`;
    
    const timeDiffMs = new Date() - STATE.startTime;
    const minutes = Math.floor(timeDiffMs / 60000);
    const seconds = Math.floor((timeDiffMs % 60000) / 1000);
    const timeDisplay = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
    document.getElementById('time-spent-lbl').textContent = timeDisplay;
    
    const timePct = Math.min(100, (timeDiffMs / 300000) * 100); // normalizes against 5 mins max
    document.getElementById('time-spent-bar').style.width = `${timePct}%`;
    
    document.getElementById('correct-count-lbl').textContent = correctCount;
    document.getElementById('incorrect-count-lbl').textContent = incorrectCount;
    document.getElementById('skipped-count-lbl').textContent = skippedCount;
    
    renderDetailsReviewList();
    
    // Persist this attempt for the admin panel
    saveAttemptToHistory({
        name: STATE.user,
        phone: STATE.phone,
        subject: SUBJECT_DETAILS[STATE.subject].name,
        total: totalQuestions,
        correct: correctCount,
        incorrect: incorrectCount,
        skipped: skippedCount,
        percent: finalPercent,
        accuracy: accuracy,
        time: timeDisplay,
        mode: STATE.timerMode,
        questionCount: STATE.questionCount,
        date: new Date().toISOString()
    });
    
    showSection('results-screen');
}

function renderDetailsReviewList() {
    const list = document.getElementById('review-questions-list');
    list.innerHTML = '';
    
    STATE.questionsList.forEach((q, idx) => {
        const item = document.createElement('div');
        item.className = `review-item ${q.status}`;
        
        let statusText = 'Correct';
        let statusClass = 'correct';
        if (q.status === 'incorrect') {
            statusText = q.userSelected === -1 ? 'Timed Out' : 'Incorrect';
            statusClass = 'incorrect';
        } else if (q.status === 'skipped') {
            statusText = 'Skipped';
            statusClass = 'skipped';
        }
        
        const subDetails = SUBJECT_DETAILS[q.subject] || { name: 'Commerce' };
        
        let userSelectedAnsText = 'No Answer';
        if (q.userSelected !== null && q.userSelected !== undefined && q.userSelected >= 0) {
            userSelectedAnsText = q.options[q.userSelected];
        }
        const correctAnsText = q.options[q.answerIndex];
        
        item.innerHTML = `
            <div class="review-badge-row">
                <span class="review-subject-badge">${subDetails.name.toUpperCase()}</span>
                <span class="review-status-pill ${statusClass}">${statusText.toUpperCase()}</span>
            </div>
            
            <div class="review-question-text">
                Question ${idx + 1}: ${q.text}
            </div>
            
            <div class="review-answers-grid">
                <div class="review-ans-bubble user-ans">
                    <span class="lbl">Your Response</span>
                    <span class="val">${userSelectedAnsText}</span>
                </div>
                <div class="review-ans-bubble correct-ans">
                    <span class="lbl">Correct Answer</span>
                    <span class="val">${correctAnsText}</span>
                </div>
            </div>
            
            <div class="review-explanation">
                ${q.explanation}
            </div>
        `;
        
        list.appendChild(item);
    });
}

// ==========================================================================
// PDF REPORT CARD GENERATION (jspdf Integration)
// ==========================================================================
function downloadPdfReportCard() {
    const { jsPDF } = window.jspdf;
    if (!jsPDF) {
        alert('PDF library failed to load. Please check your internet connection.');
        return;
    }
    
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
    });
    
    // Header section
    doc.setFillColor(8, 12, 23); // Dark theme color
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('COMMERCIQ REPORT CARD', 15, 20);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text('Class 12 Commerce Evaluation Sheet', 15, 27);
    doc.text(`Report generated on: ${new Date().toLocaleDateString('en-IN')}`, 140, 20);
    
    // User credentials block
    doc.setLineWidth(0.3);
    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(255, 255, 255);
    doc.rect(15, 50, 180, 36, 'F');
    doc.rect(15, 50, 180, 36, 'D');
    
    doc.setFontSize(11);
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('STUDENT PROFILE', 20, 58);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Name: ${STATE.user.toUpperCase()}`, 20, 66);
    doc.text(`Phone Number: ${STATE.phone}`, 20, 72);
    doc.text(`Subject: ${SUBJECT_DETAILS[STATE.subject].name.toUpperCase()}`, 20, 78);
    
    // Score board card
    const scorePercent = Math.round((STATE.score / STATE.questionsList.length) * 100);
    doc.setFillColor(241, 245, 249);
    doc.rect(130, 55, 55, 26, 'F');
    doc.rect(130, 55, 55, 26, 'D');
    
    doc.setFont('Helvetica', 'bold');
    doc.text('FINAL SCORE', 135, 62);
    doc.setFontSize(24);
    doc.setTextColor(16, 185, 129); // Success color (Green)
    doc.text(`${scorePercent}%`, 135, 75);
    
    // Table block details
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(11);
    doc.setFont('Helvetica', 'bold');
    doc.text('PERFORMANCE ANALYTICS', 15, 100);
    
    doc.setFillColor(248, 250, 252);
    doc.rect(15, 105, 180, 8, 'F');
    doc.rect(15, 105, 180, 8, 'D');
    doc.setFontSize(9);
    doc.text('METRIC CATEGORY', 18, 110);
    doc.text('VALUE', 85, 110);
    doc.text('DESCRIPTION', 115, 110);
    
    const totalQCount = STATE.questionsList.length;
    const skipped = STATE.skippedCount;
    const incorrect = totalQCount - STATE.score - skipped;
    const netAccuracy = totalQCount > skipped ? Math.round((STATE.score / (totalQCount - skipped)) * 100) : 0;
    
    const rows = [
        { metric: 'Correct Answers', val: STATE.score.toString(), desc: 'Questions answered correctly' },
        { metric: 'Incorrect Answers', val: incorrect.toString(), desc: 'Incorrect responses locked' },
        { metric: 'Skipped Questions', val: skipped.toString(), desc: 'Skipped/timed out questions' },
        { metric: 'Accuracy Rate', val: `${netAccuracy}%`, desc: 'Ratio excluding skipped' }
    ];
    
    let yOffset = 113;
    rows.forEach((row) => {
        doc.rect(15, yOffset, 180, 8, 'D');
        doc.setFont('Helvetica', 'normal');
        doc.text(row.metric, 18, yOffset + 5);
        doc.text(row.val, 85, yOffset + 5);
        doc.text(row.desc, 115, yOffset + 5);
        yOffset += 8;
    });
    
    // Question review items
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('QUESTION RESPONSE HISTORY', 15, 160);
    
    let reviewY = 166;
    doc.setFontSize(8.5);
    
    STATE.questionsList.forEach((q, idx) => {
        if (reviewY > 265) {
            doc.addPage();
            doc.setFillColor(8, 12, 23);
            doc.rect(0, 0, 210, 10, 'F');
            reviewY = 20;
        }
        
        doc.rect(15, reviewY, 180, 20, 'D');
        
        doc.setFont('Helvetica', 'bold');
        const statusStr = q.status.toUpperCase();
        if (statusStr === 'CORRECT') doc.setTextColor(22, 163, 74);
        else if (statusStr === 'INCORRECT') doc.setTextColor(220, 38, 38);
        else doc.setTextColor(217, 119, 6);
        
        doc.text(`Q${idx + 1}: [${statusStr}]`, 18, reviewY + 5);
        doc.setTextColor(15, 23, 42);
        
        const plainText = q.text.replace(/<[^>]*>/g, '').substring(0, 95) + (q.text.length > 95 ? '...' : '');
        doc.setFont('Helvetica', 'normal');
        doc.text(`Q: ${plainText}`, 18, reviewY + 10);
        
        let userSelectedAnsText = 'No Answer';
        if (q.userSelected !== null && q.userSelected !== undefined && q.userSelected >= 0) {
            userSelectedAnsText = q.options[q.userSelected];
        }
        doc.text(`Selected: ${userSelectedAnsText.substring(0, 35)} | Correct: ${q.options[q.answerIndex].substring(0, 35)}`, 18, reviewY + 15);
        
        reviewY += 23;
    });
    
    const filename = `Commerciq_${STATE.user.replace(/\s+/g, '_')}_Report.pdf`;
    doc.save(filename);
}

// ==========================================================================
// ATTEMPT HISTORY STORAGE (for Admin Panel)
// ==========================================================================
function saveAttemptToHistory(record) {
    try {
        const KEY = 'commerciq_attempts';
        const existing = JSON.parse(localStorage.getItem(KEY) || '[]');
        record.id = Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
        existing.push(record);
        localStorage.setItem(KEY, JSON.stringify(existing));
    } catch (e) {
        console.warn('Could not save attempt to history:', e);
    }
}
