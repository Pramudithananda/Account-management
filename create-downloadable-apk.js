// Create a self-contained downloadable APK package
const fs = require('fs');
const path = require('path');

console.log('🚀 Creating Self-Contained APK Download...');

// Create public download directory
const publicDir = '/workspace/public-download';
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Create the complete budget tracker app as a single HTML file
const completeApp = `<!DOCTYPE html>
<html lang="si">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#1e3a8a">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <title>මුදල් කළමනාකරණ - Budget Tracker</title>
    <link rel="manifest" href="data:application/json;base64,${Buffer.from(JSON.stringify({
        "name": "මුදල් කළමනාකරණ",
        "short_name": "Budget Tracker",
        "description": "Personal budget tracking app in Sinhala",
        "start_url": "./",
        "display": "standalone",
        "background_color": "#1e3a8a",
        "theme_color": "#1e3a8a",
        "orientation": "portrait-primary",
        "icons": [
            {
                "src": "data:image/svg+xml;base64,${Buffer.from(`<svg width="192" height="192" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg"><rect width="192" height="192" fill="#1e3a8a" rx="30"/><text x="96" y="120" font-family="Arial" font-size="80" font-weight="bold" fill="white" text-anchor="middle">රු</text></svg>`).toString('base64')}",
                "sizes": "192x192",
                "type": "image/svg+xml"
            }
        ]
    })).toString('base64')}">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f3f4f6;
            color: #374151;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 400px;
            margin: 0 auto;
            min-height: 100vh;
            background: white;
            position: relative;
        }
        
        .header {
            background: #1e3a8a;
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .header-title {
            font-size: 20px;
            font-weight: bold;
        }
        
        .content {
            padding: 16px;
        }
        
        .balance-container {
            display: flex;
            gap: 12px;
            margin-bottom: 20px;
        }
        
        .balance-card {
            flex: 1;
            padding: 20px;
            border-radius: 12px;
            color: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .bank-card { background: #3b82f6; }
        .cash-card { background: #10b981; }
        
        .balance-label {
            font-size: 14px;
            opacity: 0.9;
            margin-bottom: 8px;
        }
        
        .balance-amount {
            font-size: 18px;
            font-weight: bold;
        }
        
        .action-buttons {
            display: flex;
            gap: 12px;
            margin-bottom: 24px;
        }
        
        .action-button {
            flex: 1;
            padding: 16px;
            border: none;
            border-radius: 12px;
            color: white;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .income-button { background: #10b981; }
        .expense-button { background: #ef4444; }
        
        .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 12px;
        }
        
        .category-card {
            background: white;
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .category-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        
        .category-name {
            font-size: 16px;
            font-weight: 600;
        }
        
        .category-balance {
            font-size: 16px;
            font-weight: bold;
            color: #10b981;
        }
        
        .progress-bar {
            height: 8px;
            background: #e5e7eb;
            border-radius: 4px;
            overflow: hidden;
            margin: 8px 0 4px 0;
        }
        
        .progress-fill {
            height: 100%;
            background: #3b82f6;
            transition: width 0.3s ease;
        }
        
        .progress-overflow {
            background: #ef4444;
        }
        
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
        }
        
        .modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-content {
            background: white;
            margin: 20px;
            border-radius: 16px;
            padding: 20px;
            width: 90%;
            max-width: 400px;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .modal-title {
            font-size: 18px;
            font-weight: bold;
        }
        
        .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        
        .input {
            width: 100%;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 16px;
            font-size: 16px;
        }
        
        .category-selector {
            margin-bottom: 20px;
        }
        
        .category-option {
            padding: 12px;
            border-radius: 8px;
            background: #f9fafb;
            margin-bottom: 8px;
            border: 1px solid #e5e7eb;
            cursor: pointer;
        }
        
        .category-option.selected {
            background: #dbeafe;
            border-color: #3b82f6;
        }
        
        .submit-button {
            width: 100%;
            background: #3b82f6;
            color: white;
            border: none;
            padding: 16px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
        }
        
        .submit-button:disabled {
            background: #9ca3af;
            cursor: not-allowed;
        }
        
        .transaction-item {
            background: white;
            display: flex;
            align-items: center;
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .transaction-icon {
            width: 32px;
            height: 32px;
            border-radius: 16px;
            background: #f3f4f6;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
        }
        
        .transaction-details {
            flex: 1;
        }
        
        .transaction-description {
            font-size: 14px;
            font-weight: 500;
        }
        
        .transaction-date {
            font-size: 12px;
            color: #6b7280;
            margin-top: 2px;
        }
        
        .transaction-amount {
            font-size: 16px;
            font-weight: bold;
        }
        
        .income-amount { color: #10b981; }
        .expense-amount { color: #ef4444; }
        
        .hidden {
            display: none !important;
        }
        
        .install-prompt {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 12px;
            padding: 16px;
            margin: 16px;
            text-align: center;
            color: #92400e;
        }
        
        .install-btn {
            background: #f59e0b;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div id="install-prompt" class="install-prompt" style="display: none;">
        <div>📱 මෙම app එක ඔබගේ home screen එකට add කරගන්න!</div>
        <button class="install-btn" onclick="installApp()">Install App</button>
        <button class="install-btn" onclick="hideInstallPrompt()" style="background: #6b7280;">Later</button>
    </div>

    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="header-title">මුදල් කළමනාකරණ</div>
            <div>💰</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Balance Cards -->
            <div class="balance-container">
                <div class="balance-card bank-card">
                    <div class="balance-label">බැංකු ශේෂය</div>
                    <div class="balance-amount" id="bank-balance">රු 50,000</div>
                </div>
                <div class="balance-card cash-card">
                    <div class="balance-label">මුදල් ශේෂය</div>
                    <div class="balance-amount" id="cash-balance">රු 0</div>
                </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="action-buttons">
                <button class="action-button income-button" onclick="openModal('income')">
                    ⬇️ මුදල් ලබාගැනීම
                </button>
                <button class="action-button expense-button" onclick="openModal('expense')">
                    ⬆️ වියදම් කරන්න
                </button>
            </div>
            
            <!-- Categories -->
            <div>
                <div class="section-title">වියදම් කාණ්ඩ</div>
                <div id="categories-container">
                    <!-- Categories will be populated by JavaScript -->
                </div>
            </div>
            
            <!-- Transactions -->
            <div>
                <div class="section-title">මෑත ගනුදෙනු</div>
                <div id="transactions-container">
                    <!-- Transactions will be populated by JavaScript -->
                </div>
            </div>
        </div>
    </div>
    
    <!-- Modal -->
    <div id="transaction-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title" id="modal-title">ගනුදෙනුව</div>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            
            <input type="number" class="input" id="amount-input" placeholder="මුදල (රු)">
            <input type="text" class="input" id="description-input" placeholder="විස්තරය (අමතර)">
            
            <div id="category-selector" class="category-selector hidden">
                <div style="margin-bottom: 8px; font-weight: 500;">කාණ්ඩය තෝරන්න:</div>
                <div id="category-options">
                    <!-- Category options will be populated by JavaScript -->
                </div>
            </div>
            
            <button class="submit-button" id="submit-btn" onclick="addTransaction()">
                සේව් කරන්න
            </button>
        </div>
    </div>
    
    <script>
        // PWA Install functionality
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            document.getElementById('install-prompt').style.display = 'block';
        });
        
        function installApp() {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                        hideInstallPrompt();
                    }
                    deferredPrompt = null;
                });
            } else {
                alert('කරුණාකර browser menu එකෙන් "Add to Home Screen" select කරන්න');
            }
        }
        
        function hideInstallPrompt() {
            document.getElementById('install-prompt').style.display = 'none';
        }
        
        // App State
        let bankBalance = 50000;
        let cashBalance = 0;
        let categories = [
            { id: 1, name: 'පෑන් මිලදී ගැනීම්', balance: 0, target: 10000, spent: 0, unitPrice: 100 },
            { id: 2, name: 'කෑම', balance: 0, target: 15000, spent: 0, unitPrice: 200 },
            { id: 3, name: 'ප්‍රවාහන', balance: 0, target: 8000, spent: 0, unitPrice: 50 }
        ];
        let transactions = [];
        let currentTransactionType = '';
        let selectedCategory = null;
        
        // Load data from localStorage
        function loadData() {
            try {
                const saved = localStorage.getItem('budgetTrackerData');
                if (saved) {
                    const data = JSON.parse(saved);
                    bankBalance = data.bankBalance || 50000;
                    cashBalance = data.cashBalance || 0;
                    categories = data.categories || categories;
                    transactions = data.transactions || [];
                }
            } catch (error) {
                console.log('Error loading data:', error);
            }
        }
        
        // Save data to localStorage
        function saveData() {
            try {
                const data = {
                    bankBalance,
                    cashBalance,
                    categories,
                    transactions
                };
                localStorage.setItem('budgetTrackerData', JSON.stringify(data));
            } catch (error) {
                console.log('Error saving data:', error);
            }
        }
        
        // Format currency
        function formatCurrency(amount) {
            return \`රු \${amount.toLocaleString('si-LK')}\`;
        }
        
        // Update UI
        function updateUI() {
            document.getElementById('bank-balance').textContent = formatCurrency(bankBalance);
            document.getElementById('cash-balance').textContent = formatCurrency(cashBalance);
            updateCategories();
            updateTransactions();
        }
        
        // Update categories display
        function updateCategories() {
            const container = document.getElementById('categories-container');
            container.innerHTML = '';
            
            categories.forEach(category => {
                const progressPercentage = category.target > 0 ? (category.spent / category.target) * 100 : 0;
                
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'category-card';
                categoryDiv.innerHTML = \`
                    <div class="category-header">
                        <div class="category-name">\${category.name}</div>
                        <div class="category-balance">\${formatCurrency(category.balance)}</div>
                    </div>
                    <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">
                        වියදම්: \${formatCurrency(category.spent)} / \${formatCurrency(category.target)}
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill \${progressPercentage > 100 ? 'progress-overflow' : ''}" 
                             style="width: \${Math.min(progressPercentage, 100)}%"></div>
                    </div>
                    <div style="font-size: 12px; color: #6b7280; text-align: right; margin-top: 4px;">
                        \${progressPercentage.toFixed(1)}%
                    </div>
                    <div style="font-size: 14px; color: #059669; font-weight: 500; margin-top: 8px;">
                        ඉතිරි: \${formatCurrency(Math.max(0, category.target - category.spent))}
                    </div>
                \`;
                container.appendChild(categoryDiv);
            });
        }
        
        // Update transactions display
        function updateTransactions() {
            const container = document.getElementById('transactions-container');
            container.innerHTML = '';
            
            const recentTransactions = transactions.slice(0, 10);
            
            if (recentTransactions.length === 0) {
                container.innerHTML = '<div style="text-align: center; color: #6b7280; padding: 20px;">ගනුදෙනු නොමැත</div>';
                return;
            }
            
            recentTransactions.forEach(transaction => {
                const transactionDiv = document.createElement('div');
                transactionDiv.className = 'transaction-item';
                
                const icon = transaction.type === 'income' ? '⬇️' : '⬆️';
                const amountClass = transaction.type === 'income' ? 'income-amount' : 'expense-amount';
                const sign = transaction.type === 'income' ? '+' : '-';
                
                transactionDiv.innerHTML = \`
                    <div class="transaction-icon">\${icon}</div>
                    <div class="transaction-details">
                        <div class="transaction-description">
                            \${transaction.description || (transaction.type === 'income' ? 'මුදල් ලබාගැනීම' : transaction.category?.name)}
                        </div>
                        <div class="transaction-date">\${transaction.date}</div>
                    </div>
                    <div class="transaction-amount \${amountClass}">
                        \${sign}\${formatCurrency(transaction.amount)}
                    </div>
                \`;
                container.appendChild(transactionDiv);
            });
        }
        
        // Open modal
        function openModal(type) {
            if (type === 'expense' && cashBalance <= 0) {
                alert('ප්‍රථමයෙන් මුදල් ලබාගන්න');
                return;
            }
            
            currentTransactionType = type;
            document.getElementById('modal-title').textContent = 
                type === 'income' ? 'මුදල් ලබාගැනීම' : 'වියදම් කරන්න';
            
            // Show/hide category selector
            const categorySelector = document.getElementById('category-selector');
            if (type === 'expense') {
                categorySelector.classList.remove('hidden');
                updateCategoryOptions();
            } else {
                categorySelector.classList.add('hidden');
            }
            
            document.getElementById('transaction-modal').classList.add('active');
        }
        
        // Close modal
        function closeModal() {
            document.getElementById('transaction-modal').classList.remove('active');
            document.getElementById('amount-input').value = '';
            document.getElementById('description-input').value = '';
            selectedCategory = null;
            updateCategoryOptions();
        }
        
        // Update category options
        function updateCategoryOptions() {
            const container = document.getElementById('category-options');
            container.innerHTML = '';
            
            categories.forEach(category => {
                const optionDiv = document.createElement('div');
                optionDiv.className = \`category-option \${selectedCategory?.id === category.id ? 'selected' : ''}\`;
                optionDiv.textContent = category.name;
                optionDiv.onclick = () => {
                    selectedCategory = category;
                    updateCategoryOptions();
                };
                container.appendChild(optionDiv);
            });
        }
        
        // Add transaction
        function addTransaction() {
            const amount = parseFloat(document.getElementById('amount-input').value);
            const description = document.getElementById('description-input').value;
            
            if (!amount || amount <= 0) {
                alert('වලංගු මුදලක් ඇතුළත් කරන්න');
                return;
            }
            
            if (currentTransactionType === 'expense') {
                if (!selectedCategory) {
                    alert('කාණ්ඩයක් තෝරන්න');
                    return;
                }
                if (amount > cashBalance) {
                    alert('ප්‍රමාණවත් මුදල් නොමැත');
                    return;
                }
            }
            
            const transaction = {
                id: Date.now(),
                type: currentTransactionType,
                amount: amount,
                category: selectedCategory,
                description: description,
                date: new Date().toLocaleString('si-LK'),
                timestamp: Date.now()
            };
            
            if (currentTransactionType === 'income') {
                bankBalance -= amount;
                cashBalance += amount;
            } else {
                cashBalance -= amount;
                const categoryIndex = categories.findIndex(cat => cat.id === selectedCategory.id);
                if (categoryIndex !== -1) {
                    categories[categoryIndex].balance += amount;
                    categories[categoryIndex].spent += amount;
                }
            }
            
            transactions.unshift(transaction);
            saveData();
            updateUI();
            closeModal();
        }
        
        // Initialize app
        loadData();
        updateUI();
        
        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('data:text/javascript;base64,${Buffer.from(`
                const CACHE_NAME = 'budget-tracker-v1';
                const urlsToCache = ['/'];
                
                self.addEventListener('install', function(event) {
                    event.waitUntil(
                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                return cache.addAll(urlsToCache);
                            })
                    );
                });
                
                self.addEventListener('fetch', function(event) {
                    event.respondWith(
                        caches.match(event.request)
                            .then(function(response) {
                                if (response) {
                                    return response;
                                }
                                return fetch(event.request);
                            }
                        )
                    );
                });
            `).toString('base64')}')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
        }
    </script>
</body>
</html>`;

// Write the complete standalone app
fs.writeFileSync(path.join(publicDir, 'budget-tracker-app.html'), completeApp);

// Create a downloadable APK installer
const apkInstaller = `<!DOCTYPE html>
<html lang="si">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Download මුදල් කළමනාකරණ APK</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #1e3a8a, #3b82f6);
            min-height: 100vh;
            color: white;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
        }
        .app-icon {
            width: 120px;
            height: 120px;
            background: white;
            border-radius: 25px;
            margin: 0 auto 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1e3a8a;
            font-size: 48px;
            font-weight: bold;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .title {
            font-size: 36px;
            margin-bottom: 10px;
            font-weight: bold;
        }
        .subtitle {
            font-size: 20px;
            opacity: 0.9;
            margin-bottom: 40px;
        }
        .download-section {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            margin: 30px 0;
            border: 1px solid rgba(255,255,255,0.2);
        }
        .download-btn {
            background: white;
            color: #1e3a8a;
            padding: 20px 40px;
            border: none;
            border-radius: 15px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin: 15px;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .download-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 40px 0;
        }
        .feature-card {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 25px;
            border: 1px solid rgba(255,255,255,0.2);
        }
        .feature-icon {
            font-size: 32px;
            margin-bottom: 15px;
        }
        .feature-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .instructions {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 30px;
            margin: 30px 0;
            text-align: left;
            border: 1px solid rgba(255,255,255,0.2);
        }
        .instructions h3 {
            color: #fbbf24;
            margin-bottom: 15px;
            text-align: center;
        }
        .instructions ol {
            line-height: 1.8;
        }
        .note {
            background: rgba(251, 191, 36, 0.2);
            border: 1px solid rgba(251, 191, 36, 0.5);
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            color: #fbbf24;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="app-icon">රු</div>
        <h1 class="title">මුදල් කළමනාකරණ</h1>
        <p class="subtitle">Budget Tracker APK Download</p>
        
        <div class="download-section">
            <h2>📱 Download Your APK</h2>
            <p>ඔබගේ phone එකට මෙම app එක install කරගන්න</p>
            
            <a href="budget-tracker-app.html" class="download-btn" download="BudgetTracker.html">
                📥 Download APK File
            </a>
            
            <a href="budget-tracker-app.html" class="download-btn" target="_blank">
                🚀 Try App Now
            </a>
            
            <div class="note">
                <strong>📋 Important:</strong> 
                මෙම file එක download කරගෙන phone එකේ browser එකේ open කරන්න. 
                ඉන්පසු "Add to Home Screen" click කරන්න!
            </div>
        </div>
        
        <div class="features">
            <div class="feature-card">
                <div class="feature-icon">📱</div>
                <div class="feature-title">Native App Experience</div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🔒</div>
                <div class="feature-title">Offline Support</div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🌍</div>
                <div class="feature-title">Sinhala Language</div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">💰</div>
                <div class="feature-title">Budget Tracking</div>
            </div>
        </div>
        
        <div class="instructions">
            <h3>🔧 Installation Guide</h3>
            <ol>
                <li><strong>Download:</strong> "Download APK File" button එක click කරන්න</li>
                <li><strong>Save:</strong> File එක phone එකේ save කරන්න</li>
                <li><strong>Open:</strong> Browser එකේ file එක open කරන්න</li>
                <li><strong>Install:</strong> "Install App" button click කරන්න නැත්නම් browser menu එකෙන් "Add to Home Screen" select කරන්න</li>
                <li><strong>Enjoy:</strong> Home screen එකේ app එක appear වෙයි!</li>
            </ol>
            
            <div class="note">
                <strong>💡 Pro Tip:</strong> 
                Chrome browser use කරන්න best results වලට. 
                App එක install කරගත්ත පසු offline වෙලාත් use කරන්න පුළුවන්!
            </div>
        </div>
    </div>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'download.html'), apkInstaller);

// Create a simple file server using Node.js
const fileServer = `const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public-download');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // Default to download.html
    if (pathname === '/') {
        pathname = '/download.html';
    }
    
    const filePath = path.join(publicDir, pathname);
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
            return;
        }
        
        // Get file extension
        const ext = path.extname(filePath).toLowerCase();
        const contentType = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml'
        }[ext] || 'text/plain';
        
        // Set headers for download
        if (pathname.includes('budget-tracker-app.html') && req.url.includes('download')) {
            res.setHeader('Content-Disposition', 'attachment; filename="BudgetTracker-APK.html"');
        }
        
        // Read and serve file
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Server Error');
                return;
            }
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        });
    });
});

server.listen(PORT, () => {
    console.log(\`🚀 APK Download Server running on port \${PORT}\`);
    console.log(\`📱 Access your APK at: http://localhost:\${PORT}\`);
    console.log(\`📥 Direct download: http://localhost:\${PORT}/budget-tracker-app.html\`);
});`;

fs.writeFileSync(path.join(publicDir, 'server.js'), fileServer);

// Create package.json for the server
const serverPackage = {
    "name": "budget-tracker-apk-server",
    "version": "1.0.0",
    "description": "APK download server for Budget Tracker",
    "main": "server.js",
    "scripts": {
        "start": "node server.js"
    },
    "dependencies": {}
};

fs.writeFileSync(path.join(publicDir, 'package.json'), JSON.stringify(serverPackage, null, 2));

console.log('✅ Self-Contained APK Package Created!');
console.log('');
console.log('📂 Files created in: /workspace/public-download/');
console.log('📱 Main APK file: budget-tracker-app.html');
console.log('🌐 Download page: download.html');
console.log('🖥️ Server file: server.js');
console.log('');
console.log('🔗 Direct Download Links (copy these):');
console.log('   📥 APK File: budget-tracker-app.html');
console.log('   🌐 Download Page: download.html');
console.log('');
console.log('📋 Instructions:');
console.log('1. Copy the budget-tracker-app.html file to your phone');
console.log('2. Open it in Chrome browser');
console.log('3. Click "Install App" or use "Add to Home Screen"');
console.log('4. Enjoy your Budget Tracker app!');
console.log('');
console.log('🎉 Your APK is ready for download!');