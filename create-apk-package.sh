#!/bin/bash

echo "📱 Creating Budget Tracker APK Package..."

# Create APK package directory
mkdir -p /workspace/apk-package

# Copy the Cordova project
cp -r /workspace/BudgetTrackerAPK /workspace/apk-package/

# Create a simple APK using apktool approach
echo "🔧 Creating APK structure..."

# Create APK directory structure
mkdir -p /workspace/apk-package/apk-build/{assets/www,res,META-INF}

# Copy web content to assets
cp -r /workspace/BudgetTrackerAPK/www/* /workspace/apk-package/apk-build/assets/www/

# Create AndroidManifest.xml
cat > /workspace/apk-package/apk-build/AndroidManifest.xml << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.budgettracker.sinhala"
    android:versionCode="1"
    android:versionName="1.0.0">
    
    <uses-sdk android:minSdkVersion="22" android:targetSdkVersion="35" />
    
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    
    <application
        android:allowBackup="true"
        android:icon="@drawable/icon"
        android:label="මුදල් කළමනාකරණ"
        android:theme="@android:style/Theme.NoTitleBar">
        
        <activity
            android:name="MainActivity"
            android:exported="true"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale"
            android:theme="@android:style/Theme.DeviceDefault.NoActionBar"
            android:windowSoftInputMode="adjustResize"
            android:screenOrientation="portrait">
            
            <intent-filter android:label="@string/launcher_name">
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
EOF

# Create a basic WebView-based APK template
cat > /workspace/apk-package/WebViewAPK.java << 'EOF'
package com.budgettracker.sinhala;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebSettings;

public class MainActivity extends Activity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        webView = new WebView(this);
        setContentView(webView);
        
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        
        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("file:///android_asset/www/index.html");
    }
    
    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
EOF

# Create a simple build script
cat > /workspace/apk-package/build-instructions.md << 'EOF'
# APK Build Instructions

## Files Created:
- `BudgetTrackerAPK/` - Complete Cordova project
- `apk-build/` - APK structure with AndroidManifest.xml
- `WebViewAPK.java` - Simple WebView activity

## To Build APK:

### Method 1: Using Android Studio
1. Install Android Studio
2. Open the BudgetTrackerAPK project
3. Build APK using: Build → Build Bundle(s)/APK(s) → Build APK(s)

### Method 2: Using Command Line (with Android SDK)
```bash
# Set up environment
export ANDROID_HOME=/path/to/android-sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

# Build with Cordova
cd BudgetTrackerAPK
cordova build android --release
```

### Method 3: Online APK Builder
1. Visit: https://appsgeyser.com or https://websitetoapk.com
2. Upload the www/ folder contents
3. Configure app settings:
   - App Name: මුදල් කළමනාකරණ
   - Package: com.budgettracker.sinhala
   - Version: 1.0.0
4. Download generated APK

## APK Features:
- Native Android app with WebView
- Offline functionality
- Local data storage
- Full Sinhala language support
- Portrait orientation locked
- Custom app icon and splash screen
EOF

# Create downloadable web version
mkdir -p /workspace/apk-package/web-version
cp -r /workspace/build/web-apk/* /workspace/apk-package/web-version/

# Create final package
cd /workspace/apk-package
tar -czf Budget-Tracker-APK-Package.tar.gz BudgetTrackerAPK/ apk-build/ WebViewAPK.java build-instructions.md web-version/

echo "✅ APK Package Created!"
echo "📦 Location: /workspace/apk-package/Budget-Tracker-APK-Package.tar.gz"
echo "📋 Contains:"
echo "   - Complete Cordova project"
echo "   - APK build structure"
echo "   - Build instructions"
echo "   - Web version for testing"
echo ""
echo "🔧 To build actual APK, follow instructions in build-instructions.md"
echo "🌐 Or use the web version that works like a native app!"