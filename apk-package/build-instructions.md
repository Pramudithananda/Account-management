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
