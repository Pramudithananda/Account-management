# Sinhala Expense Tracker

බැංකු ගිණුම්, මුදල් ගිණුම් සහ වියමන මාරුකරණය එක් තැනකින් කළමණාකරණය කරන React Native (Expo) යෙදුමකි. AsyncStorage මත පදනම් වීම නිසා ඔෆ්ලයින් ක්‍රියාකාරිත්වය සහ උඩුගත කළ data backup JSON එකක් ලබා දේ.

## 🔑 ප්‍රධාන විශේෂාංග
- **Multiple accounts** – bank/cash/returns ගිණුම් එකිනෙකාට වෙනම වර්ණ, ශේෂ සහ account numbers සමඟ.
- **Transfers & adjustments** – ගිණුමකට හෝ ගිණුම් අතරට ගනුදෙනු (income/expense/transfer) ලියවිල්ල.
- **Budget categories** – වියදම් ඉලක්ක, progress bars, Sinhala UI.
- **Dashboard** – නවතම transactions, live net worth, quick CTA buttons.
- **Settings** – Dark mode toggle, demo data reset, transaction/category purging, JSON backup preview.
- **Persistent storage** – AsyncStorage හරහා සියලුම ගිණුම්, කාණ්ඩ, ගනුදෙනු සුරක්ෂිතව තබයි.

## 🧱 Tech Stack
- Expo SDK 49 / React Native 0.72
- React Navigation (stack + bottom tabs)
- AsyncStorage
- react-native-vector-icons / react-native-color-picker

## 🚀 Setup & Development
```bash
npm install
npm run start          # Expo Dev Tools
npm run android        # open Android emulator/device via Expo Go
```

### Linting (optional)
```
npx expo-doctor
```

## 📦 Building a Downloadable APK
### Option 1 – Expo Application Services (recommended)
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview   # or production
```
Build artifacts will be hosted by Expo and shareable via a public link.

### Option 2 – Local Gradle build (debug/release)
1. Prebuild the native Android project:
   ```bash
   npx expo prebuild --platform android
   ```
2. Generate a debug APK:
   ```bash
   cd android
   ./gradlew assembleDebug
   ```
   Output: `android/app/build/outputs/apk/debug/app-debug.apk`
3. For a release APK, create/sign a keystore and run `./gradlew assembleRelease`, then grab `app-release.apk`.

> සිස්ටම් JDK/Android SDK variables (`JAVA_HOME`, `ANDROID_HOME`) සකස් කර ඇති බව සහතික කරගන්න.

## 📁 Project Structure
```
App.js                   # Context + navigation
src/
  screens/
    DashboardScreen.js
    BankAccountsScreen.js
    CashAccountsScreen.js
    CategoriesScreen.js
    SettingsScreen.js
    AddTransactionScreen.js
```

## 🧪 Manual Test Checklist
- Add/update/delete bank & cash accounts
- Record income / expense / transfer
- Verify balances + budgets update immediately
- Toggle dark mode and restart app (persistence)
- Reset demo data and confirm sample entities reload

ස්වභාවික Sinhala UI text අලුත් විස්තරයක් අවශ්‍ය නම් `src/screens` ඇතුළත සෘජුව සංස්කරණය කළ හැක. මෙම repo එකෙන් ලබාගන්නා APK එක Play Store ට upload කිරීමට පෙර සහතික කිරීමක් අවශ්‍ය බව මතක තබා ගන්න.
