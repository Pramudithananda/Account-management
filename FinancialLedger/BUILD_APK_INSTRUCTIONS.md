# APK Build Instructions - Financial Ledger App

## 📱 APK එක හදන ක්‍රමය

මෙම environment එකේ Android SDK නොමැති නිසා, ඔබගේ පරිගණකයේ APK file එක build කරගන්න පහත උපදෙස් අනුගමනය කරන්න:

## Prerequisites (අවශ්‍ය මෘදුකාංග)

1. **Java Development Kit (JDK) 17**
   - Download: https://adoptium.net/
   
2. **Android Studio**
   - Download: https://developer.android.com/studio
   - Android SDK ස්වයංක්‍රීයව install වේ

3. **Node.js & npm**
   - ඔබ දැනටමත් install කර ඇත

## Step 1: Project Download කරගන්න

```bash
# Project files download කරගන්න
cd /workspace
tar -czf FinancialLedger.tar.gz FinancialLedger/
```

## Step 2: ඔබගේ පරිගණකයේ Setup කරන්න

1. Download කරගත් project extract කරන්න
2. Terminal/Command Prompt විවෘත කරන්න
3. Project folder එකට navigate කරන්න:

```bash
cd FinancialLedger
npm install
```

## Step 3: Android Environment Setup

### Windows:
```bash
# Environment variables set කරන්න
setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"
setx PATH "%PATH%;%ANDROID_HOME%\platform-tools"
```

### Mac/Linux:
```bash
# ~/.bashrc හෝ ~/.zshrc file එකට add කරන්න
export ANDROID_HOME=$HOME/Library/Android/sdk  # Mac
export ANDROID_HOME=$HOME/Android/Sdk           # Linux
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## Step 4: Debug APK Build කරන්න (වේගවත්)

```bash
cd android
./gradlew assembleDebug  # Linux/Mac
gradlew.bat assembleDebug # Windows
```

**Output location:** `android/app/build/outputs/apk/debug/app-debug.apk`

## Step 5: Release APK Build කරන්න (Production)

### 5.1 Signing Key සාදන්න (පළමු වතාවට පමණක්)

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Password එකක් දෙන්න සහ මතක තබාගන්න!

### 5.2 Signing Configuration එකතු කරන්න

`android/gradle.properties` file එකට add කරන්න:

```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your_password_here
MYAPP_RELEASE_KEY_PASSWORD=your_password_here
```

### 5.3 Build Configuration Update කරන්න

`android/app/build.gradle` file එකේ:

```gradle
android {
    ...
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}
```

### 5.4 Release APK Build කරන්න

```bash
cd android
./gradlew assembleRelease  # Linux/Mac
gradlew.bat assembleRelease # Windows
```

**Output location:** `android/app/build/outputs/apk/release/app-release.apk`

## Step 6: APK Install කරන්න

### USB හරහා (Developer Mode enable කරන්න)
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Manual Installation
1. APK file එක phone එකට copy කරන්න
2. File manager හරහා APK click කරන්න
3. "Install from Unknown Sources" allow කරන්න
4. Install කරන්න

## 🎯 Quick Build Script

පහත script එක `build-apk.sh` (Linux/Mac) හෝ `build-apk.bat` (Windows) ලෙස save කරන්න:

### Linux/Mac (build-apk.sh):
```bash
#!/bin/bash
echo "Building Financial Ledger APK..."
cd android
./gradlew clean
./gradlew assembleDebug
echo "APK built successfully!"
echo "Location: android/app/build/outputs/apk/debug/app-debug.apk"
```

### Windows (build-apk.bat):
```batch
@echo off
echo Building Financial Ledger APK...
cd android
gradlew.bat clean
gradlew.bat assembleDebug
echo APK built successfully!
echo Location: android\app\build\outputs\apk\debug\app-debug.apk
```

## 📦 Alternative: Online APK Builder

ඔබට local build කිරීමට නොහැකි නම්:

1. **Expo EAS Build** භාවිතා කරන්න:
   - https://expo.dev/eas
   - Free tier available

2. **Appetize.io** භාවිතා කරන්න (Testing):
   - https://appetize.io/
   - Browser එකේම test කරන්න පුළුවන්

## ⚠️ Important Notes

1. **Debug APK** - Development සඳහා පමණක්, slower performance
2. **Release APK** - Production use සඳහා, optimized & signed
3. **First time build** - වේලාව ගතවේ (10-15 minutes)
4. **Subsequent builds** - වේගවත් (2-3 minutes)

## 🔧 Troubleshooting

### Error: SDK location not found
```bash
# Create local.properties file
echo "sdk.dir=/path/to/Android/Sdk" > android/local.properties
```

### Error: License not accepted
```bash
# Accept all licenses
$ANDROID_HOME/tools/bin/sdkmanager --licenses
```

### Build cache issues
```bash
cd android
./gradlew clean
cd ..
npx react-native start --reset-cache
```

## 📱 Minimum Requirements

- Android 5.0 (API level 21) හෝ ඊට වැඩි
- ARM හෝ x86 architecture
- 100MB free storage

## 🚀 Next Steps

APK build වූ පසු:
1. ඔබගේ phone එකේ install කරන්න
2. Test කරන්න
3. Google Play Store upload කිරීමට Release APK භාවිතා කරන්න

---

**සහාය සඳහා:** ගැටළු ඇත්නම් error messages screenshot කරගෙන share කරන්න.