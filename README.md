# Sinhala Expense Tracker – Multi Account Manager

සිංහල භාෂාවෙන් භාවිතා කළ හැකි විසිතුරු ගිණුම් කළමනාකරණය කිරීමේ React Native (Expo) යෙදවුමකි. බැංකු / මුදල් ගිණුම්, වර්ගස්ථ වියදම්, ගනුදෙනු සහ දත්ත backup/restore හැකියාවන් එක් ඇප් එකක් තුළින්ම කළ හැක.

## සවිස්තරාත්මක හැකියාවන්
- බැංකු, මුදල් සහ Return ගිණුම් කිහිපයක් රැස් කර ශේෂයන් පවත්වා ගැනීම
- අදායම් / වියදම් / Transfer ගනුදෙනු සටහන් කිරීම සහ ගිණුම් අතර මුදල් මාරු කිරීම
- කාණ්ඩ අනුව බජට් සකස් කර ප්‍රගතිය දසුන් කිරීම
- Dark mode, දත්ත export/import (JSON) සහ මුලු පද්ධතිය පිරිසිදු කිරීම
- AsyncStorage මත තතු ස්වයංක්‍රීයව රදවා ගැනීම

## සෙට්අප් කිරීම
1. අවශ්‍යතා
   - Node.js 18+
   - npm (හෝ yarn)
   - Expo CLI (`npm install -g expo-cli`)
2. ලයිබ්රරි ස්ථාපනය
   ```bash
   npm install
   ```
3. ඇප් එක ධාවනය කිරීම
   ```bash
   npx expo start
   ```
   QR කේතය Android/iOS Expo Go යෙදවුමෙන් scan කර live preview බලන්න.

## APK ගොනුව සාදන ආකාරය (Downloadable build)
1. EAS CLI ස්ථාපනය:
   ```bash
   npm install -g eas-cli
   ```
2. Expo/EAS වෙත login වන්න:
   ```bash
   eas login
   ```
3. build ප්‍රොෆයිල් `eas.json` තුළම සකස් කර ඇත (`preview` → APK build). APK එකක් සඳහා:
   ```bash
   eas build -p android --profile preview
   ```
4. build අවසන් වූ පසු CLI තුළ link එකක් ලැබෙන අතර එය භාවිතයෙන් APK එක ඩවුන්ලෝඩ් කරගත හැක. Play Store සඳහා AAB අවශ්‍ය නම් `--profile production` භාවිත කරන්න.

## දත්ත Backup / Restore
- Settings පිටුවෙන් JSON export බහිරිගත කර Share හරහා දොඹලන්න.
- භාවිතා කළ JSON එකම Import විකල්පයෙන් ඇතුළත් කලහොත් මීට පෙර තත්ත්වය නැවත ලබා ගත හැක.

## ප්‍රධාන ෆෝල්ඩර් වගුව
```
app.js                 // ප්‍රධාන navigation + context
src/screens/*          // UI screen logic (Dashboard, Accounts, Categories, Settings, etc.)
app.json / eas.json    // Expo + EAS configuration
package.json           // Dependencies
```

ප්‍රශ්නිරහිත build එකක් සඳහා `npm install` → `npx expo start` → `eas build` පියවර අනුගමනය කරන්න. අවශ්‍ය නම් Expo credentials භාවිතයෙන් keystore/play-console විස්තර configure කර ගත හැක.*** End Patch