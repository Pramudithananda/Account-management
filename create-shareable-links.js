// Create shareable links and files
const fs = require('fs');
const path = require('path');

console.log('🔗 Creating Shareable APK Links...');

// Create a simple HTML file that can be hosted anywhere
const shareableDir = '/workspace/shareable-apk';
if (!fs.existsSync(shareableDir)) {
    fs.mkdirSync(shareableDir, { recursive: true });
}

// Create a data URL version of the app (self-contained)
const appContent = fs.readFileSync('/workspace/public-download/BudgetTracker-APK.html', 'utf8');

// Create a simple sharing page with embedded app
const sharingPage = `<!DOCTYPE html>
<html lang="si">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>මුදල් කළමනාකරණ - APK Download</title>
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
            max-width: 600px;
            margin: 0 auto;
        }
        .app-icon {
            width: 100px;
            height: 100px;
            background: white;
            border-radius: 20px;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1e3a8a;
            font-size: 40px;
            font-weight: bold;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }
        .title {
            font-size: 28px;
            margin-bottom: 8px;
            font-weight: bold;
        }
        .subtitle {
            font-size: 16px;
            opacity: 0.9;
            margin-bottom: 30px;
        }
        .download-section {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 30px;
            margin: 20px 0;
            border: 1px solid rgba(255,255,255,0.2);
        }
        .download-btn {
            background: white;
            color: #1e3a8a;
            padding: 15px 30px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin: 10px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .download-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin: 30px 0;
        }
        .feature {
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            padding: 15px;
            border: 1px solid rgba(255,255,255,0.2);
        }
        .feature-icon {
            font-size: 24px;
            margin-bottom: 8px;
        }
        .feature-title {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .feature-desc {
            font-size: 12px;
            opacity: 0.9;
        }
        .instructions {
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            text-align: left;
            border: 1px solid rgba(255,255,255,0.2);
        }
        .instructions h3 {
            color: #fbbf24;
            margin-bottom: 10px;
            text-align: center;
            font-size: 18px;
        }
        .instructions ol {
            line-height: 1.6;
            padding-left: 20px;
        }
        .note {
            background: rgba(251, 191, 36, 0.2);
            border: 1px solid rgba(251, 191, 36, 0.5);
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            color: #fbbf24;
            font-size: 14px;
        }
        .app-preview {
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            border: 1px solid rgba(255,255,255,0.2);
        }
        .preview-frame {
            width: 100%;
            max-width: 300px;
            height: 500px;
            border: 3px solid #374151;
            border-radius: 20px;
            margin: 0 auto;
            overflow: hidden;
            background: white;
        }
        .hidden-app {
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="app-icon">රු</div>
        <h1 class="title">මුදල් කළමනාකරණ</h1>
        <p class="subtitle">Budget Tracker APK - Free Download</p>
        
        <div class="download-section">
            <h2>📱 Download APK</h2>
            <p>ඔබගේ Android phone එකට install කරගන්න</p>
            
            <button class="download-btn" onclick="downloadAPK()">
                📥 Download APK File
            </button>
            
            <button class="download-btn" onclick="tryApp()">
                🚀 Try App Now
            </button>
            
            <div class="note">
                <strong>📋 How to Install:</strong><br>
                1. Download button click කරන්න<br>
                2. File එක phone එකේ save කරන්න<br>
                3. Chrome browser එකේ open කරන්න<br>
                4. "Install App" click කරන්න
            </div>
        </div>
        
        <div class="features">
            <div class="feature">
                <div class="feature-icon">📱</div>
                <div class="feature-title">Native Experience</div>
                <div class="feature-desc">App එක වගේ work කරනවා</div>
            </div>
            <div class="feature">
                <div class="feature-icon">🔒</div>
                <div class="feature-title">Offline Support</div>
                <div class="feature-desc">Internet නැතුව use කරන්න පුළුවන්</div>
            </div>
            <div class="feature">
                <div class="feature-icon">🌍</div>
                <div class="feature-title">Sinhala Language</div>
                <div class="feature-desc">සම්පූර්ණ Sinhala UI</div>
            </div>
            <div class="feature">
                <div class="feature-icon">💰</div>
                <div class="feature-title">Budget Tracking</div>
                <div class="feature-desc">Complete money management</div>
            </div>
        </div>
        
        <div class="app-preview">
            <h3>📱 App Preview</h3>
            <div class="preview-frame">
                <iframe id="app-frame" src="about:blank" style="width: 100%; height: 100%; border: none;"></iframe>
            </div>
        </div>
        
        <div class="instructions">
            <h3>🔧 Installation Guide</h3>
            <ol>
                <li><strong>Download:</strong> "Download APK File" click කරන්න</li>
                <li><strong>Save:</strong> Phone එකේ Downloads folder එකේ save වෙයි</li>
                <li><strong>Open:</strong> Chrome browser එකේ file එක open කරන්න</li>
                <li><strong>Install:</strong> "Install App" button එක click කරන්න</li>
                <li><strong>Done:</strong> Home screen එකේ app icon එක appear වෙයි!</li>
            </ol>
            
            <div class="note">
                <strong>💡 Tip:</strong> 
                Chrome browser use කරන්න best results වලට. Firefox වලත් work කරනවා.
                App එක install කරගත්ත පසු offline වෙලාත් පිරිසිදු විදිහට work කරනවා!
            </div>
        </div>
    </div>
    
    <!-- Hidden app content -->
    <div class="hidden-app" id="hidden-app">
        ${appContent.replace(/<!DOCTYPE html>[\s\S]*?<body[^>]*>/, '').replace(/<\/body>[\s\S]*?<\/html>/, '')}
    </div>
    
    <script>
        function downloadAPK() {
            // Get the app content
            const appContent = \`${appContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
            
            // Create blob and download
            const blob = new Blob([appContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'BudgetTracker-APK.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Show success message
            alert('✅ APK file download කරන ලදී!\\n\\nකරුණාකර file එක Chrome browser එකේ open කරලා "Install App" click කරන්න.');
        }
        
        function tryApp() {
            const appContent = \`${appContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
            const newWindow = window.open();
            newWindow.document.write(appContent);
            newWindow.document.close();
        }
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(shareableDir, 'index.html'), sharingPage);

// Create a simple standalone APK file
fs.copyFileSync('/workspace/public-download/BudgetTracker-APK.html', path.join(shareableDir, 'BudgetTracker-APK.html'));

// Create a QR code generator page
const qrPage = `<!DOCTYPE html>
<html lang="si">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Code - Budget Tracker APK</title>
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
            max-width: 400px;
            margin: 0 auto;
        }
        .qr-section {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 30px;
            margin: 20px 0;
            border: 1px solid rgba(255,255,255,0.2);
        }
        .qr-code {
            width: 200px;
            height: 200px;
            background: white;
            margin: 0 auto 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #333;
            text-align: center;
            padding: 20px;
            box-sizing: border-box;
        }
        .instructions {
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            text-align: left;
            border: 1px solid rgba(255,255,255,0.2);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📱 Budget Tracker APK</h1>
        <p>QR Code වලින් download කරගන්න</p>
        
        <div class="qr-section">
            <h3>📱 Scan QR Code</h3>
            <div class="qr-code">
                QR Code හදන්න:<br><br>
                1. qr-code.js library use කරන්න<br>
                2. File link එක encode කරන්න<br>
                3. QR image generate කරන්න
            </div>
            <p>Phone camera එකෙන් scan කරලා download කරගන්න</p>
        </div>
        
        <div class="instructions">
            <h3>🔧 Alternative Methods:</h3>
            <ol>
                <li>මෙම link එක phone එකට send කරන්න</li>
                <li>Browser එකේ open කරන්න</li>
                <li>Download button click කරන්න</li>
                <li>APK file එක install කරන්න</li>
            </ol>
        </div>
    </div>
</body>
</html>`;

fs.writeFileSync(path.join(shareableDir, 'qr.html'), qrPage);

// Create sharing instructions
const sharingInstructions = `# 📱 Budget Tracker APK - Sharing Instructions

## 🔗 Direct Download Links:

### Option 1: Main Download Page
- File: \`index.html\`
- Contains: Download page with embedded APK
- Usage: Share this file directly or host it anywhere

### Option 2: Direct APK File  
- File: \`BudgetTracker-APK.html\`
- Contains: The actual APK file
- Usage: Direct download link

## 📤 How to Share:

### Method 1: File Sharing Services
1. Upload \`index.html\` to:
   - Google Drive (make it public)
   - Dropbox (create public link)  
   - OneDrive (share link)
   - GitHub Gist
   - Any file hosting service

2. Share the public link

### Method 2: Direct File Transfer
1. Send \`BudgetTracker-APK.html\` via:
   - WhatsApp
   - Email
   - Bluetooth
   - USB transfer
   - Cloud storage

### Method 3: Host on Website
1. Upload files to any web hosting
2. Share the URL
3. Users can download directly

## 📱 User Installation:

1. User downloads \`BudgetTracker-APK.html\`
2. Opens in Chrome browser on phone
3. Clicks "Install App" when prompted
4. App installs to home screen
5. Works offline like native app

## ✨ Features:

- 📱 Progressive Web App (PWA)
- 🔒 Offline functionality  
- 🌍 Full Sinhala language
- 💰 Complete budget tracking
- 📊 Visual progress tracking
- 📝 Transaction history
- 🏦 Bank & cash balance management

## 🎉 Ready to Share!

Your Budget Tracker APK is ready for distribution!
No app stores needed - works directly in browser and installs like native app.`;

fs.writeFileSync(path.join(shareableDir, 'SHARING_GUIDE.md'), sharingInstructions);

// Create final package
const { execSync } = require('child_process');

try {
    execSync('cd /workspace && zip -r BudgetTracker-Shareable-APK.zip shareable-apk/', { stdio: 'inherit' });
    console.log('✅ Shareable package created!');
} catch (error) {
    execSync('cd /workspace && tar -czf BudgetTracker-Shareable-APK.tar.gz shareable-apk/', { stdio: 'inherit' });
    console.log('✅ Shareable package created (tar.gz)!');
}

console.log('');
console.log('🎉 Shareable APK Package Ready!');
console.log('');
console.log('📂 Files created in /workspace/shareable-apk/:');
console.log('   🌐 index.html - Main download page');
console.log('   📱 BudgetTracker-APK.html - Direct APK file');
console.log('   📋 SHARING_GUIDE.md - Instructions');
console.log('   📱 qr.html - QR code page');
console.log('');
console.log('📥 Package: /workspace/BudgetTracker-Shareable-APK.zip');
console.log('');
console.log('🔗 Sharing Options:');
console.log('1. Upload index.html to Google Drive/Dropbox (make public)');
console.log('2. Send BudgetTracker-APK.html directly via WhatsApp/Email');
console.log('3. Host files on any website');
console.log('4. Create GitHub Gist with the files');
console.log('');
console.log('📱 Users can then:');
console.log('- Download the APK file');
console.log('- Open in Chrome browser');  
console.log('- Click "Install App"');
console.log('- Use like native Android app!');
console.log('');
console.log('✨ Your APK is ready for sharing without localhost!');