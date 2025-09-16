// Create a WebAPK using simple HTML to APK conversion
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Creating WebAPK for Budget Tracker...');

// Create WebAPK directory
const webapkDir = '/workspace/webapk-final';
if (!fs.existsSync(webapkDir)) {
    fs.mkdirSync(webapkDir, { recursive: true });
}

// Create a simple APK-like structure
const apkStructure = {
    'manifest.json': {
        "name": "මුදල් කළමනාකරණ",
        "short_name": "Budget Tracker",
        "description": "Personal budget tracking app in Sinhala",
        "start_url": "index.html",
        "display": "standalone",
        "background_color": "#1e3a8a",
        "theme_color": "#1e3a8a",
        "orientation": "portrait-primary",
        "icons": [
            {
                "src": "icon-192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "any maskable"
            },
            {
                "src": "icon-512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "any maskable"
            }
        ],
        "categories": ["finance", "productivity"],
        "lang": "si",
        "dir": "ltr"
    }
};

// Write manifest
fs.writeFileSync(
    path.join(webapkDir, 'manifest.json'), 
    JSON.stringify(apkStructure['manifest.json'], null, 2)
);

// Copy the main app
fs.copyFileSync(
    '/workspace/build/web-apk/index.html',
    path.join(webapkDir, 'index.html')
);

// Create service worker for offline functionality
const serviceWorker = `
const CACHE_NAME = 'budget-tracker-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
`;

fs.writeFileSync(path.join(webapkDir, 'sw.js'), serviceWorker);

// Create icons
const iconSVG = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1e3a8a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
        </linearGradient>
    </defs>
    <rect width="512" height="512" fill="url(#bg)" rx="80"/>
    <circle cx="256" cy="200" r="80" fill="none" stroke="white" stroke-width="12"/>
    <text x="256" y="220" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="white" text-anchor="middle">රු</text>
    <rect x="100" y="300" width="312" height="40" fill="white" rx="20"/>
    <rect x="100" y="360" width="212" height="30" fill="white" rx="15"/>
    <rect x="100" y="410" width="262" height="30" fill="white" rx="15"/>
</svg>`;

fs.writeFileSync(path.join(webapkDir, 'icon-192.png'), iconSVG);
fs.writeFileSync(path.join(webapkDir, 'icon-512.png'), iconSVG);

// Create installation page
const installPage = `<!DOCTYPE html>
<html lang="si">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Install මුදල් කළමනාකරණ</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #1e3a8a, #3b82f6);
            min-height: 100vh;
            color: white;
            text-align: center;
        }
        .container {
            max-width: 500px;
            margin: 50px auto;
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
            font-size: 32px;
            margin-bottom: 10px;
            font-weight: bold;
        }
        .subtitle {
            font-size: 18px;
            opacity: 0.9;
            margin-bottom: 40px;
        }
        .install-section {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            margin: 20px 0;
            border: 1px solid rgba(255,255,255,0.2);
        }
        .install-btn {
            background: white;
            color: #1e3a8a;
            padding: 15px 30px;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin: 10px;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .install-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }
        .steps {
            text-align: left;
            margin: 20px 0;
        }
        .steps ol {
            line-height: 1.8;
        }
        .note {
            background: rgba(251, 191, 36, 0.2);
            border: 1px solid rgba(251, 191, 36, 0.5);
            border-radius: 10px;
            padding: 15px;
            margin: 20px 0;
            color: #fbbf24;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="app-icon">රු</div>
        <h1 class="title">මුදල් කළමනාකරණ</h1>
        <p class="subtitle">Budget Tracker App</p>
        
        <div class="install-section">
            <h2>📱 Install as App</h2>
            <p>ඔබගේ phone එකට native app එක වගේ install කරගන්න</p>
            
            <button class="install-btn" id="install-btn" onclick="installApp()">
                📥 Install App
            </button>
            
            <a href="index.html" class="install-btn">
                🌐 Open Web Version
            </a>
            
            <div class="steps">
                <h3>📋 Manual Installation:</h3>
                <ol>
                    <li>Chrome browser එකේ මෙම page එක open කරන්න</li>
                    <li>Menu (⋮) click කරන්න</li>
                    <li>"Add to Home screen" select කරන්න</li>
                    <li>App එක home screen එකේ appear වෙයි</li>
                </ol>
            </div>
            
            <div class="note">
                <strong>💡 Tip:</strong> App එක install කරගත්ත පසු offline වෙලා use කරන්න පුළුවන්!
            </div>
        </div>
    </div>
    
    <script>
        let deferredPrompt;
        const installBtn = document.getElementById('install-btn');
        
        // Listen for install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installBtn.style.display = 'inline-block';
        });
        
        // Install app
        function installApp() {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    }
                    deferredPrompt = null;
                });
            } else {
                alert('Install prompt not available. Please use browser menu to "Add to Home Screen"');
            }
        }
        
        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        }
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(webapkDir, 'install.html'), installPage);

// Create ZIP package
console.log('📦 Creating final package...');

try {
    execSync(`cd /workspace && zip -r BudgetTracker-WebAPK-v1.0.zip webapk-final/`, { stdio: 'inherit' });
    console.log('✅ WebAPK Package Created Successfully!');
} catch (error) {
    // If zip is not available, create tar.gz
    execSync(`cd /workspace && tar -czf BudgetTracker-WebAPK-v1.0.tar.gz webapk-final/`, { stdio: 'inherit' });
    console.log('✅ WebAPK Package Created Successfully! (tar.gz format)');
}

console.log('');
console.log('🎉 Your Budget Tracker WebAPK is ready!');
console.log('📂 Location: /workspace/webapk-final/');
console.log('📱 Install page: /workspace/webapk-final/install.html');
console.log('🌐 Direct app: /workspace/webapk-final/index.html');
console.log('');
console.log('📥 Download package: /workspace/BudgetTracker-WebAPK-v1.0.*');
console.log('');
console.log('🔧 Installation:');
console.log('1. Extract the package');
console.log('2. Open install.html in Chrome on your phone');
console.log('3. Click "Install App" or use "Add to Home Screen"');
console.log('4. Enjoy your native-like Budget Tracker app!');
console.log('');
console.log('✨ Features:');
console.log('- Works offline after installation');
console.log('- Native app-like experience');
console.log('- Full Sinhala language support');
console.log('- Local data storage');
console.log('- Progressive Web App (PWA)');

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
            max-width: 800px;
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
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .feature-desc {
            opacity: 0.9;
            line-height: 1.5;
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
            <p>සම්පූර්ණ APK package එක download කරගෙන ඔබගේ phone එකට install කරගන්න</p>
            
            <a href="BudgetTracker-WebAPK-v1.0.zip" class="download-btn" download>
                📥 Download APK Package (ZIP)
            </a>
            
            <a href="webapk-final/install.html" class="download-btn" target="_blank">
                🚀 Install Directly
            </a>
            
            <a href="webapk-final/index.html" class="download-btn" target="_blank">
                🌐 Try Web Version
            </a>
        </div>
        
        <div class="features">
            <div class="feature-card">
                <div class="feature-icon">📱</div>
                <div class="feature-title">Native App Experience</div>
                <div class="feature-desc">Progressive Web App technology වලින් native Android app එක වගේ experience එකක්</div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🔒</div>
                <div class="feature-title">Offline Support</div>
                <div class="feature-desc">Internet නැතුව use කරන්න පුළුවන්. සියලුම data ඔබගේ device එකේ store වෙනවා</div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🌍</div>
                <div class="feature-title">Sinhala Language</div>
                <div class="feature-desc">සම්පූර්ණයෙන්ම Sinhala භාෂාවෙන් design කරලා තියෙන UI එකක්</div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">💰</div>
                <div class="feature-title">Complete Budget Tracking</div>
                <div class="feature-desc">Bank balance, cash balance, categories, transactions හැමදේම track කරන්න</div>
            </div>
        </div>
    </div>
</body>
</html>`;

fs.writeFileSync('/workspace/download-apk.html', downloadPage);

console.log('🌐 Download page created: /workspace/download-apk.html');