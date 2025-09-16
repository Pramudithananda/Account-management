#!/bin/bash

echo "📦 Creating Budget Tracker Release Package..."

# Create release directory
mkdir -p build/release

# Copy web APK
cp -r build/web-apk build/release/

# Create a simple APK wrapper (WebView based)
cat > build/release/INSTALL_GUIDE.md << 'EOF'
# මුදල් කළමනාකරණ - Budget Tracker

## 📱 Installation Options

### Option 1: Progressive Web App (PWA) - Recommended
1. Open `web-apk/index.html` in Chrome/Firefox on your phone
2. Click "Add to Home Screen" from browser menu
3. The app will install like a native app

### Option 2: Direct Web Access
1. Open `web-apk/index.html` in any browser
2. Bookmark for easy access
3. Works on any device with a browser

## ✨ Features
- 🏦 Bank balance tracking (බැංකු ශේෂය)
- 💰 Cash balance tracking (මුදල් ශේෂය) 
- 📊 Budget categories with progress bars
- 📝 Transaction history
- 🌍 Full Sinhala language support
- 💾 Automatic data saving (localStorage)

## 🎯 How to Use
1. **Get Cash**: Transfer money from bank to cash
2. **Make Expenses**: Spend cash on different categories
3. **Track Progress**: Monitor your spending with visual progress bars
4. **View History**: Check your recent transactions

## 🔧 Technical Details
- Built with HTML5, CSS3, JavaScript
- Progressive Web App (PWA) compatible
- Works offline after first load
- Data stored locally on your device
- No internet required after installation

## 📞 Support
This is a simple budget tracking app designed for personal use.
All data is stored locally on your device for privacy.
EOF

# Create ZIP package
cd build/release
zip -r "Budget-Tracker-Sinhala-v1.0.zip" web-apk/ INSTALL_GUIDE.md
cd ../..

# Create download page
cat > build/release/download.html << 'EOF'
<!DOCTYPE html>
<html lang="si">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>මුදල් කළමනාකරණ - Download</title>
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
        .features-grid {
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
        }
        .instructions ol {
            line-height: 1.8;
        }
        .instructions li {
            margin-bottom: 8px;
        }
        .note {
            background: rgba(251, 191, 36, 0.2);
            border: 1px solid rgba(251, 191, 36, 0.5);
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            color: #fbbf24;
        }
        @media (max-width: 600px) {
            .title { font-size: 28px; }
            .subtitle { font-size: 16px; }
            .download-section { padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="app-icon">රු</div>
        <h1 class="title">මුදල් කළමනාකරණ</h1>
        <p class="subtitle">Personal Budget Tracker App</p>
        
        <div class="download-section">
            <h2>📱 Download Your App</h2>
            <p>ඔබගේ phone එකට මෙම app එක download කරගන්න</p>
            
            <a href="Budget-Tracker-Sinhala-v1.0.zip" class="download-btn" download>
                📥 Complete Package Download
            </a>
            
            <a href="web-apk/index.html" class="download-btn" target="_blank">
                🌐 Open Web Version
            </a>
            
            <div class="note">
                <strong>📋 Quick Start:</strong> 
                Web version එක phone browser එකේ open කරලා "Add to Home Screen" click කරන්න. 
                Native app එක වගේ install වෙයි!
            </div>
        </div>
        
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">🏦</div>
                <div class="feature-title">Balance Tracking</div>
                <div class="feature-desc">බැංකු ශේෂය සහ cash balance track කරන්න</div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">📊</div>
                <div class="feature-title">Budget Categories</div>
                <div class="feature-desc">කාණ්ඩ අනුව budget කරලා progress track කරන්න</div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">📝</div>
                <div class="feature-title">Transaction History</div>
                <div class="feature-desc">සියලුම ගනුදෙනු history එක record කරන්න</div>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🌍</div>
                <div class="feature-title">Sinhala Support</div>
                <div class="feature-desc">සම්පූර්ණයෙන්ම Sinhala භාෂාවෙන්</div>
            </div>
        </div>
        
        <div class="instructions">
            <h3>🚀 Installation Guide</h3>
            <ol>
                <li><strong>Mobile (Recommended):</strong> Web version එක phone browser එකේ open කරන්න</li>
                <li>Browser menu එකේ "Add to Home Screen" click කරන්න</li>
                <li>App එක home screen එකේ appear වෙයි</li>
                <li>Native app එක වගේ use කරන්න පුළුවන්</li>
            </ol>
            
            <h3>💻 Computer Usage</h3>
            <ol>
                <li>Download කරපු ZIP file එක extract කරන්න</li>
                <li>web-apk folder එකේ index.html file එක browser එකේ open කරන්න</li>
                <li>Bookmark කරගෙන use කරන්න</li>
            </ol>
        </div>
    </div>
</body>
</html>
EOF

echo "✅ Release package created!"
echo "📦 Location: build/release/"
echo "🌐 Download page: build/release/download.html"
echo "📱 ZIP package: build/release/Budget-Tracker-Sinhala-v1.0.zip"
echo ""
echo "🎉 Your Budget Tracker app is ready!"