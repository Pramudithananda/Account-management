# APK සාදන්නේ කෙසේද - Build Instructions

මෙම ලේඛනයෙන් ඔබට Android APK file එකක් සෑදීම සඳහා අවශ්‍ය සියලු පියවර විස්තර කෙරේ.

## Method 1: EAS Build (Recommended - Cloud Build)

### Prerequisites
1. Expo ගිණුමක් (නොමැති නම් https://expo.dev/ හි නොමිලේ සාදන්න)
2. Node.js installed
3. Internet connection

### Steps:

#### 1. EAS CLI ස්ථාපනය කරන්න
```bash
npm install -g eas-cli
```

#### 2. Expo account එකට login වන්න
```bash
eas login
```

#### 3. Project configure කරන්න
```bash
cd /workspace
eas build:configure
```

#### 4. APK Build කරන්න
```bash
# Preview build (APK file එකක් ලබා ගන්න)
eas build --platform android --profile preview
```

#### 5. APK Download කරන්න
Build එක complete වූ පසු, terminal එකේ link එකක් පෙන්වයි. ඒ link එක click කරලා APK file එක download කරන්න.

**හෝ** Expo website එකෙන් download කරන්න:
- https://expo.dev/ වෙත යන්න
- Projects -> Your Project -> Builds
- Latest build එක click කරලා "Download" කරන්න

## Method 2: Local Build (Without Expo Go)

### Prerequisites
1. Android Studio installed
2. Android SDK
3. Java JDK

### Steps:

```bash
# 1. Dependencies install කරන්න
npm install

# 2. Android build configuration
npx expo prebuild --platform android

# 3. Build APK
cd android
./gradlew assembleRelease

# APK file එක මෙතන හමුවේ:
# android/app/build/outputs/apk/release/app-release.apk
```

## Method 3: Expo Development Build

```bash
# Development build එකක් සාදන්න
eas build --profile development --platform android

# Build complete වූ පසු APK download කරන්න
```

## Build Profiles (eas.json)

### Preview Profile
```json
"preview": {
  "distribution": "internal",
  "android": {
    "buildType": "apk"
  }
}
```
- Testing සඳහා හොඳයි
- APK file එකක් generate කරනවා
- Google Play Store එකට upload කිරීමට අවශ්‍ය නැහැ

### Production Profile
```json
"production": {
  "android": {
    "buildType": "apk"
  }
}
```
- Release version
- Google Play Store upload සඳහා AAB file එකක් සාදන්න

## සාදන ලද APK Install කරන්නේ කෙසේද

### Android Device එකේ:

1. **Unknown Sources Enable කරන්න:**
   - Settings -> Security
   - "Unknown Sources" හෝ "Install unknown apps" enable කරන්න

2. **APK File එක Transfer කරන්න:**
   - USB cable එකක් භාවිතයෙන් phone එකට transfer කරන්න
   - හෝ Google Drive, Dropbox වැනි cloud service එකක් භාවිතා කරන්න
   - හෝ Email එකක් භාවිතා කරන්න

3. **Install කරන්න:**
   - File manager එකෙන් APK file එක tap කරන්න
   - "Install" click කරන්න
   - App එක open කරන්න

## Troubleshooting

### Build Fails

**Error: "No Project ID"**
```bash
# Project එක Expo account එකට link කරන්න
eas build:configure
```

**Error: "Android keystore not found"**
```bash
# Expo automatic keystore එකක් generate කරයි
# "Would you like us to handle the process?" -> Yes
```

### APK Won't Install

1. Sufficient storage space ඇති බව තහවුරු කරන්න
2. Previous version එකක් නම්, එය uninstall කරන්න
3. Unknown sources properly enabled කර ඇති බව check කරන්න

## Build Options

### Smaller APK Size
```bash
# ProGuard enable කරන්න android/app/build.gradle එකේ:
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
    }
}
```

### Debug APK
```bash
cd android
./gradlew assembleDebug
```

## Cost

- **EAS Build Free Tier:**
  - මාසිකව builds 30ක් නොමිලේ
  - Android සහ iOS support

- **Paid Plans:**
  - More builds needed නම්
  - Priority build queue
  - https://expo.dev/pricing බලන්න

## Support

Build issues නම්:
1. https://docs.expo.dev/build/introduction/
2. Expo Forums: https://forums.expo.dev/
3. Stack Overflow: tag [expo]

## Summary - ඉක්මන් පියවර

```bash
# 1. Install EAS CLI
npm install -g eas-cli

# 2. Login
eas login

# 3. Build
cd /workspace
eas build --platform android --profile preview

# 4. Download APK from the link provided
```

**Build කාලය:** සාමාන්‍යයෙන් මිනිත්තු 10-20 ක් විතර

---

**සටහන:** පළමු build එක slow විය හැක. ඊළඟ builds ඉක්මන්ව complete වේ.
