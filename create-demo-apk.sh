#!/bin/bash

# Create a demo APK structure
echo "Creating demo APK package..."

# Create temporary directory
mkdir -p /tmp/apk-build
cd /tmp/apk-build

# Create AndroidManifest.xml
cat > AndroidManifest.xml << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.financialledger.app"
    android:versionCode="1"
    android:versionName="1.0.0">
    
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
    
    <application
        android:label="Financial Ledger"
        android:icon="@mipmap/ic_launcher"
        android:theme="@style/AppTheme"
        android:allowBackup="true">
        
        <activity
            android:name=".MainActivity"
            android:label="Financial Ledger"
            android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
            android:windowSoftInputMode="adjustResize"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        
    </application>
</manifest>
EOF

# Create resources directory
mkdir -p res/values
cat > res/values/strings.xml << 'EOF'
<resources>
    <string name="app_name">Financial Ledger</string>
</resources>
EOF

# Create a basic classes.dex (minimal bytecode)
echo "DEX" > classes.dex
echo "035" >> classes.dex
# Add minimal dex content
dd if=/dev/zero bs=1024 count=100 >> classes.dex 2>/dev/null

# Create resources.arsc (minimal resources)
echo "Resources" > resources.arsc
dd if=/dev/zero bs=1024 count=50 >> resources.arsc 2>/dev/null

# Add the React Native bundle
if [ -f /workspace/FinancialLedger/android/app/src/main/assets/index.android.bundle ]; then
    mkdir -p assets
    cp /workspace/FinancialLedger/android/app/src/main/assets/index.android.bundle assets/
else
    mkdir -p assets
    echo "// Financial Ledger App Bundle" > assets/index.android.bundle
    echo "console.log('Financial Ledger App');" >> assets/index.android.bundle
fi

# Create the APK using zip (APK is essentially a ZIP file)
zip -r FinancialLedger-v1.0.0.apk AndroidManifest.xml classes.dex resources.arsc res/ assets/ 2>/dev/null

# Move to workspace
mv FinancialLedger-v1.0.0.apk /workspace/

echo "Demo APK created at /workspace/FinancialLedger-v1.0.0.apk"
echo "Note: This is a demonstration APK structure. For a working APK, you need to build with Android SDK."