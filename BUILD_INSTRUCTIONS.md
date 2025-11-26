# APK Build Instructions - ගිණුම් කළමනාකරණය

මෙම යෙදුම Sinhala භාෂාවෙන් තනන ලද බහු ගිණුම් කළමනාකරණ පද්ධතියකි (Multiple Account Management System).

## පද්ධති අවශ්‍යතා / System Requirements

1. Node.js (v16 හෝ ඊට වැඩි)
2. npm හෝ yarn
3. Expo CLI
4. EAS CLI (APK build කිරීම සඳහා)

## ස්ථාපනය / Installation

### 1. Dependencies ස්ථාපනය කරන්න

```bash
npm install
```

හෝ

```bash
yarn install
```

### 2. Expo CLI ස්ථාපනය (තවමත් නොමැති නම්)

```bash
npm install -g expo-cli
```

### 3. EAS CLI ස්ථාපනය (APK build සඳහා)

```bash
npm install -g eas-cli
```

## Development සඳහා ධාවනය කරන්න / Run for Development

### Android Emulator හෝ Device එකේ

```bash
npm start
# ඉන්පසු 'a' ඔබන්න Android සඳහා
```

හෝ

```bash
npm run android
```

### iOS (Mac පමණි)

```bash
npm run ios
```

### Web Browser

```bash
npm run web
```

## APK File එකක් සෑදීම / Building APK

### Method 1: EAS Build භාවිතා කරමින් (නිර්දේශිත)

#### පියවර 1: Expo ගිණුමක් සාදන්න

Expo වෙබ් අඩවියට යන්න: https://expo.dev/signup

#### පියවර 2: EAS හි Login වන්න

```bash
eas login
```

#### පියවර 3: Project එක Configure කරන්න

```bash
eas build:configure
```

#### පියවර 4: APK Build කරන්න

**Preview Build (Testing සඳහා):**
```bash
eas build --platform android --profile preview
```

**Production Build (Release සඳහා):**
```bash
eas build --platform android --profile production
```

Build එක සම්පූර්ණ වූ පසු, ඔබට APK file එක download කරගත හැක.

### Method 2: Local Build (Advanced)

#### පියවර 1: Expo Eject කරන්න

```bash
expo eject
```

#### පියවර 2: Android Studio භාවිතා කරන්න

1. Android Studio විවෘත කරන්න
2. `android` folder එක විවෘත කරන්න
3. Build > Build Bundle(s) / APK(s) > Build APK(s)
4. APK file එක `android/app/build/outputs/apk/` හි සොයා ගත හැක

### Method 3: Expo Build Service (පැරණි ක්‍රමය)

```bash
expo build:android -t apk
```

## APK ස්ථාපනය කරන්න / Install APK

1. APK file එක download කරන්න
2. Android device එකට transfer කරන්න
3. File manager භාවිතා කර APK file එක tap කරන්න
4. "Install from unknown sources" ඉඩ දෙන්න (අවශ්‍ය නම්)
5. Install button එක click කරන්න

## විශේෂාංග / Features

### බහු ගිණුම් කළමනාකරණය / Multiple Account Management

1. **බැංකු ගිණුම් / Bank Accounts**
   - බැංකු ගිණුම් එකතු කරන්න
   - ගිණුම් අංකය සහ වර්ණ සමඟ
   - ශේෂය නිරීක්ෂණය කරන්න

2. **මුදල් ගිණුම් / Cash Accounts**
   - විවිධ මුදල් ගිණුම් (පුබුන, වොලට්, ආදිය)
   - වර්ණ කේත සමඟ
   - සැබෑ කාලීන ශේෂය

3. **වියදම් කාණ්ඩ / Expense Categories**
   - කාණ්ඩ අනුව වියදම් නිරීක්ෂණය
   - ඉලක්ක සහ වියදම් ප්‍රමාණය
   - Progress tracking

4. **ගනුදෙනු / Transactions**
   - ආදායම් සහ වියදම් එකතු කරන්න
   - ගිණුම් අතර මාරු කරන්න
   - ගනුදෙනු ඉතිහාසය

5. **Dashboard**
   - සියලු ගිණුම් සාරාංශය
   - මෑත ගනුදෙනු
   - ඉක්මන් ක්‍රියා

6. **සැකසීම් / Settings**
   - අඳුරු/දීප්ත මාදිලිය
   - දත්ත Export/Backup
   - සියලු දත්ත මකන්න

## දත්ත ගබඩාව / Data Storage

යෙදුම AsyncStorage භාවිතා කරයි (Local Storage):
- සියලු දත්ත device එකේ ගබඩා වේ
- Internet අවශ්‍ය නැත
- දත්ත සුරක්ෂිත හා පුද්ගලික

## ගැටළු නිරාකරණය / Troubleshooting

### Build Errors

1. **Node Modules ගැටළු:**
```bash
rm -rf node_modules
npm install
```

2. **Cache Issues:**
```bash
expo start -c
```

3. **Android Gradle Errors:**
```bash
cd android
./gradlew clean
cd ..
```

### Runtime Errors

1. Metro Bundler restart කරන්න
2. Device/Emulator restart කරන්න
3. App uninstall කර නැවත install කරන්න

## APK නිකුත් කිරීම / Release APK

Production APK සඳහා:

1. `app.json` හි version number වැඩි කරන්න
2. Signing key එකක් සාදන්න (release builds සඳහා)
3. EAS build production profile එක භාවිතා කරන්න

```bash
eas build --platform android --profile production
```

## ආරක්ෂාව / Security

- සියලු දත්ත device එකේම ගබඩා වේ
- No cloud sync (වෙනස් කළ හැක)
- No external API calls
- දත්ත encrypt කර ගබඩා කිරීම නිර්දේශිත (future enhancement)

## සහාය / Support

ගැටළු හෝ ප්‍රශ්න සඳහා:
1. GitHub Issues විවෘත කරන්න
2. සංවර්ධකයා සමඟ සම්බන්ධ වන්න

## License

MIT License - Free to use and modify

---

## Quick Start Commands

```bash
# Project setup
npm install

# Run on Android
npm run android

# Build APK (requires EAS account)
eas build --platform android --profile preview

# Start development server
npm start
```

## APK Download කිරීම

EAS build එක සම්පූර්ණ වූ පසු:
1. Build URL එක email එකට එවනු ලැබේ
2. හෝ EAS dashboard එකෙන් download කරන්න: https://expo.dev/accounts/[your-account]/projects/[project-name]/builds
3. QR code එක scan කරන්න හෝ direct link එක භාවිතා කරන්න
4. APK file එක download වේ

---

**සටහන:** මෙම යෙදුම React Native Expo භාවිතයෙන් සාදා ඇත. APK file size ආසන්න වශයෙන් 30-50MB විය හැක.
