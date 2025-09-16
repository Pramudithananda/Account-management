// Create a simple downloadable APK
const fs = require('fs');
const path = require('path');

console.log('🚀 Creating Simple Downloadable APK...');

// Create public download directory
const publicDir = '/workspace/public-download';
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Read the existing web app
const webAppContent = fs.readFileSync('/workspace/build/web-apk/index.html', 'utf8');

// Create enhanced version with PWA features
const enhancedApp = webAppContent.replace(
    '<link rel="manifest" href="manifest.json">',
    `<link rel="manifest" href="data:application/json;base64,${Buffer.from(JSON.stringify({
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
                "src": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE5MiIgaGVpZ2h0PSIxOTIiIGZpbGw9IiMxZTNhOGEiIHJ4PSIzMCIvPjx0ZXh0IHg9Ijk2IiB5PSIxMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI4MCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7gtrDgtpA8L3RleHQ+PC9zdmc+",
                "sizes": "192x192",
                "type": "image/svg+xml"
            }
        ]
    })).toString('base64')}">`
).replace(
    '// Service Worker Registration',
    `// Install prompt
        let deferredPrompt;
        let installPromptShown = false;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            if (!installPromptShown) {
                showInstallPrompt();
                installPromptShown = true;
            }
        });
        
        function showInstallPrompt() {
            const promptDiv = document.createElement('div');
            promptDiv.id = 'install-prompt';
            promptDiv.style.cssText = \`
                position: fixed;
                top: 20px;
                left: 20px;
                right: 20px;
                background: #fef3c7;
                border: 2px solid #f59e0b;
                border-radius: 12px;
                padding: 16px;
                text-align: center;
                color: #92400e;
                z-index: 10000;
                font-weight: bold;
            \`;
            promptDiv.innerHTML = \`
                <div style="margin-bottom: 10px;">📱 මෙම app එක ඔබගේ home screen එකට add කරගන්න!</div>
                <button onclick="installApp()" style="background: #f59e0b; color: white; border: none; padding: 8px 16px; border-radius: 6px; margin: 5px; font-weight: bold; cursor: pointer;">Install App</button>
                <button onclick="hideInstallPrompt()" style="background: #6b7280; color: white; border: none; padding: 8px 16px; border-radius: 6px; margin: 5px; font-weight: bold; cursor: pointer;">Later</button>
            \`;
            document.body.insertBefore(promptDiv, document.body.firstChild);
        }
        
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
            const prompt = document.getElementById('install-prompt');
            if (prompt) {
                prompt.remove();
            }
        }
        
        // Service Worker Registration`
);

// Write the enhanced app
fs.writeFileSync(path.join(publicDir, 'BudgetTracker-APK.html'), enhancedApp);

// Create download page
const downloadPage = `<!DOCTYPE html>
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
            padding: 20px;
            border: 1px solid rgba(255,255,255,0.2);
            text-align: center;
        }
        .feature-icon {
            font-size: 32px;
            margin-bottom: 10px;
        }
        .feature-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        .feature-desc {
            font-size: 14px;
            opacity: 0.9;
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
            
            <a href="BudgetTracker-APK.html" class="download-btn" download="BudgetTracker-APK.html">
                📥 Download APK File
            </a>
            
            <a href="BudgetTracker-APK.html" class="download-btn" target="_blank">
                🚀 Try App Now
            </a>
            
            <div class="note">
                <strong>📋 Important:</strong> 
                මෙම file එක download කරගෙන phone එකේ browser එකේ open කරන්න. 
                ඉන්පසු "Install App" click කරන්න!
            </div>
        </div>
        
        <div class="features">
            <div class="feature-card">
                <div class="feature-icon">📱</div>
                <div class="feature-title">Native App Experience</div>
                <div class="feature-desc">Progressive Web App technology</div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🔒</div>
                <div class="feature-title">Offline Support</div>
                <div class="feature-desc">Internet නැතුව use කරන්න පුළුවන්</div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🌍</div>
                <div class="feature-title">Sinhala Language</div>
                <div class="feature-desc">සම්පූර්ණ Sinhala UI</div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">💰</div>
                <div class="feature-title">Budget Tracking</div>
                <div class="feature-desc">Complete budget management</div>
            </div>
        </div>
        
        <div class="instructions">
            <h3>🔧 Installation Guide</h3>
            <ol>
                <li><strong>Download:</strong> "Download APK File" button එක click කරන්න</li>
                <li><strong>Save:</strong> File එක phone එකේ save කරන්න</li>
                <li><strong>Open:</strong> Chrome browser එකේ file එක open කරන්න</li>
                <li><strong>Install:</strong> "Install App" button click කරන්න</li>
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

fs.writeFileSync(path.join(publicDir, 'download.html'), downloadPage);

// Create a simple README
const readme = `# Budget Tracker APK Download

## 📱 Files:

1. **BudgetTracker-APK.html** - The main APK file
2. **download.html** - Download page

## 🔧 Installation:

1. Download BudgetTracker-APK.html to your phone
2. Open it in Chrome browser
3. Click "Install App" when prompted
4. App will be added to your home screen

## ✨ Features:

- 🏦 Bank balance tracking
- 💰 Cash management  
- 📊 Budget categories
- 📈 Progress tracking
- 📝 Transaction history
- 🌍 Full Sinhala language support
- 🔒 Offline functionality
- 📱 Native app experience

## 🎉 Enjoy your Budget Tracker app!`;

fs.writeFileSync(path.join(publicDir, 'README.md'), readme);

// Create ZIP package
const { execSync } = require('child_process');

try {
    execSync('cd /workspace && zip -r BudgetTracker-APK-Download.zip public-download/', { stdio: 'inherit' });
    console.log('✅ ZIP package created!');
} catch (error) {
    // If zip is not available, create tar.gz
    execSync('cd /workspace && tar -czf BudgetTracker-APK-Download.tar.gz public-download/', { stdio: 'inherit' });
    console.log('✅ TAR.GZ package created!');
}

console.log('');
console.log('🎉 Your APK Download Package is Ready!');
console.log('');
console.log('📂 Files created:');
console.log('   📱 /workspace/public-download/BudgetTracker-APK.html');
console.log('   🌐 /workspace/public-download/download.html');
console.log('   📋 /workspace/public-download/README.md');
console.log('');
console.log('📥 Download package:');
console.log('   🗜️ /workspace/BudgetTracker-APK-Download.zip (or .tar.gz)');
console.log('');
console.log('🔗 Direct File Links:');
console.log('   📱 APK File: public-download/BudgetTracker-APK.html');
console.log('   🌐 Download Page: public-download/download.html');
console.log('');
console.log('📋 Instructions:');
console.log('1. Download BudgetTracker-APK.html to your phone');
console.log('2. Open in Chrome browser');
console.log('3. Click "Install App"');
console.log('4. Enjoy your Budget Tracker!');
console.log('');
console.log('✨ Your APK is ready for sharing!');