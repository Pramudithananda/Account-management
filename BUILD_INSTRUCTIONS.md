# APK Build Instructions - බහු ගිණුම් කළමනාකරණ පද්ධතිය

මෙම යෙදුම React Native (Expo) භාවිතයෙන් සාදා ඇති අතර, බහු පරිශීලක ප්‍රොෆයිල් කළමනාකරණය සහිතව APK file එකක් සාදා ගැනීමේ උපදෙස් මෙහි ඇත.

## පූර්ව අවශ්‍යතා (Prerequisites)

### 1. Node.js සහ npm ස්ථාපනය කරන්න
```bash
# Node.js version 16 හෝ ඊට වැඩි අනුවාදයක් අවශ්‍ය වේ
node --version
npm --version
```

### 2. Expo CLI ස්ථාපනය කරන්න
```bash
npm install -g expo-cli
npm install -g eas-cli
```

## ව්‍යාපෘතිය සකසන්න (Project Setup)

### 1. Dependencies ස්ථාපනය කරන්න
```bash
cd /workspace
npm install
```

### 2. Expo ගිණුමක් සාදා Login වන්න
```bash
# Expo ගිණුමක් නොමැති නම්, https://expo.dev/ වෙත ගොස් ගිණුමක් සාදන්න
eas login
```

### 3. EAS Build සකසන්න
```bash
# EAS project එක configure කරන්න
eas build:configure
```

## APK Build කිරීමේ ක්‍රම (Build Methods)

### ක්‍රමය 1: EAS Build භාවිතයෙන් (නිර්දේශිත)

#### Development Build
```bash
# Development APK එකක් සාදන්න (පරීක්ෂණ සඳහා)
eas build --platform android --profile preview
```

#### Production Build
```bash
# Production APK එකක් සාදන්න (බෙදාහැරීම සඳහා)
eas build --platform android --profile production
```

Build ක්‍රියාවලිය සම්පූර්ණ වූ පසු, APK file එක ඔබගේ Expo dashboard එකේ දිස්වේ.
Link එක terminal එකේ දිස්වේ හෝ https://expo.dev/accounts/[your-account]/projects/sinhala-expense-tracker/builds වෙත යන්න.

### ක්‍රමය 2: Local Build (Expo Go එකෙන් පරීක්ෂා කිරීමට)

```bash
# Development server එක ආරම්භ කරන්න
npm start

# හෝ
expo start

# Android emulator එකේ විවෘත කරන්න
npm run android
```

### ක්‍රමය 3: Classic Expo Build (පැරණි ක්‍රමය)

```bash
# APK සාදන්න
expo build:android -t apk

# AAB (App Bundle) සාදන්න - Play Store සඳහා
expo build:android -t app-bundle
```

## APK Download කරගන්න

### EAS Build එකකින්

1. Build එක සම්පූර්ණ වූ පසු, terminal එකේ link එක click කරන්න
2. හෝ Expo Dashboard වෙත යන්න: https://expo.dev
3. ඔබේ project එක තෝරන්න
4. "Builds" tab එක තෝරන්න
5. Latest build එක තෝරා "Download" button එක click කරන්න

### QR Code භාවිතයෙන් Device එකට Install කරන්න

Build එක සම්පූර්ණ වූ පසු:
1. QR code එක scan කරන්න
2. APK file එක download වේ
3. Install කරන්න (Unknown sources වලින් install කිරීමට permission දෙන්න)

## පරීක්ෂා කිරීම (Testing)

### Android Emulator එකේ පරීක්ෂා කරන්න
```bash
# Emulator එක start කරන්න (Android Studio installed නම්)
emulator -avd [emulator_name]

# App එක run කරන්න
npm run android
```

### Physical Device එකේ පරීක්ෂා කරන්න
```bash
# USB debugging enable කරන්න device එකේ
# USB cable එකෙන් connect කරන්න
npm run android
```

### Expo Go App භාවිතයෙන්
```bash
# Development server start කරන්න
npm start

# Expo Go app එකෙන් QR code එක scan කරන්න
```

## Build Scripts

package.json file එකේ මෙම scripts ඇත:

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "build:android": "eas build --platform android --profile production",
    "build:android:preview": "eas build --platform android --profile preview"
  }
}
```

භාවිතා කරන්න:
```bash
npm run build:android          # Production APK
npm run build:android:preview  # Preview APK
```

## යෙදුම් විශේෂාංග (App Features)

### බහු ප්‍රොෆයිල් කළමනාකරණය (Multi-Profile Management)
- ✅ බහු පරිශීලක ප්‍රොෆයිල් සාදන්න
- ✅ ප්‍රොෆයිල් අතර මාරු වන්න
- ✅ සෑම ප්‍රොෆයිලයකටම වෙන වෙනම දත්ත
- ✅ අභිරුචි avatars සහ වර්ණ

### ගිණුම් කළමනාකරණය (Account Management)
- ✅ බැංකු ගිණුම් කළමනාකරණය
- ✅ මුදල් ගිණුම් කළමනාකරණය
- ✅ වර්ණ කේතනය සහිත ගිණුම්

### ගනුදෙනු ලේඛනය (Transaction Recording)
- ✅ ආදායම් සහ වියදම් ලේඛනය
- ✅ කාණ්ඩ අනුව සංවිධානය
- ✅ Dashboard සමග සංක්ෂිප්ත විස්තර

### දත්ත සුරැකීම (Data Storage)
- ✅ Local AsyncStorage භාවිතයෙන් දත්ත සුරැකීම
- ✅ Profile-specific data isolation
- ✅ Dark mode සහාය

## දෝෂ නිරාකරණය (Troubleshooting)

### Build Errors

#### "AAPT: error: resource android:attr/lStar not found"
```bash
# Java version මාරු කරන්න
sudo update-alternatives --config java
# Java 11 තෝරන්න
```

#### "SDK location not found"
```bash
# Android SDK path set කරන්න
export ANDROID_SDK_ROOT=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

#### Dependencies Issues
```bash
# Node modules නැවත install කරන්න
rm -rf node_modules
npm install

# Cache clear කරන්න
npm start --reset-cache
```

### Installation Issues

#### APK Install වීමෙන් වළකිනවා
- Settings > Security > "Unknown sources" enable කරන්න
- හෝ Settings > Apps > Special Access > Install unknown apps > [Your Browser] > Allow

## APK File Size අඩු කරන්න

### 1. Production build භාවිතා කරන්න
```bash
eas build --platform android --profile production
```

### 2. Unused dependencies ඉවත් කරන්න
```bash
npm prune --production
```

### 3. ProGuard enable කරන්න
app.json file එකේ:
```json
{
  "android": {
    "enableProguardInReleaseBuilds": true,
    "enableShrinkResourcesInReleaseBuilds": true
  }
}
```

## Build Output

සාර්ථක build එකකින් පසු ඔබට ලැබෙනවා:
- **APK file**: `sinhala-expense-tracker-vX.X.X.apk`
- **Size**: ~25-40 MB (optimized build)
- **Minimum Android Version**: Android 5.0 (API 21)

## Distribution (බෙදාහැරීම)

### Option 1: Direct APK Sharing
- APK file එක download කර share කරන්න
- Users install කිරීමට "Unknown sources" enable කළ යුතුයි

### Option 2: Google Play Store
1. AAB file එකක් සාදන්න:
```bash
eas build --platform android --profile production
```
2. Google Play Console එකට upload කරන්න
3. App review process එක සම්පූර්ණ කරන්න

### Option 3: Internal Distribution
- Firebase App Distribution
- TestFlight (iOS සඳහා)
- Custom distribution server

## සහාය (Support)

Build issues ඇති වුවහොත්:
1. Expo documentation: https://docs.expo.dev/
2. EAS Build docs: https://docs.expo.dev/build/introduction/
3. React Native docs: https://reactnative.dev/

## Version Information

- **App Version**: 2.0.0
- **React Native**: 0.72.6
- **Expo SDK**: ~49.0.15
- **Node**: >= 16.0.0

---

**සටහන**: මෙම යෙදුම බහු පරිශීලක ප්‍රොෆයිල් කළමනාකරණය සහිතව සාදා ඇති අතර, සෑම ප්‍රොෆයිලයකටම වෙන වෙනම දත්ත ගබඩාවක් ඇත. සියලුම දත්ත device එකේම local storage එකේ සුරකිනු ලබයි.
