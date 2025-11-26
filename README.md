# සිංහල Expense Tracker - බහු ගිණුම් කළමනාකරණ පද්ධතිය

<div align="center">

## 🌟 Multi-Account Personal Finance Manager

**React Native** • **Expo** • **Sinhala Language** • **Multi-Profile Support**

[![React Native](https://img.shields.io/badge/React%20Native-0.72.6-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~49.0.15-000020.svg)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📖 විස්තරය (Description)

බහු පරිශීලක ප්‍රොෆයිල් කළමනාකරණය සහිත සම්පූර්ණ මුදල් කළමනාකරණ යෙදුමකි. සිංහල භාෂාවෙන් නිර්මාණය කර ඇති මෙම යෙදුම මගින් ඔබට:

A complete personal finance management application with multi-user profile support. Built in Sinhala language, allowing you to:

- ✅ බහු පරිශීලක ප්‍රොෆයිල් සාදන්න සහ කළමනාකරණය කරන්න
- ✅ බැංකු සහ මුදල් ගිණුම් ලේඛනය
- ✅ ආදායම් සහ වියදම් ලිපිගත කරන්න
- ✅ අයවැය කාණ්ඩ කළමනාකරණය කරන්න
- ✅ සියලු දත්ත local storage එකේ සුරක්ෂිතව ගබඩා කරන්න

---

## ✨ විශේෂාංග (Features)

### 🎭 බහු ප්‍රොෆයිල් කළමනාකරණය (Multi-Profile Management)

- **අසීමිත ප්‍රොෆයිල්**: පවුලේ සෑම සාමාජිකයකු සඳහාම වෙන වෙනම ප්‍රොෆයිල්
- **අභිරුචි Avatars**: සෑම ප්‍රොෆයිලයකටම අනන්‍ය emoji avatars
- **වර්ණ කේතනය**: හඳුනා ගැනීමට පහසු වර්ණ තේමා
- **Data Isolation**: සෑම ප්‍රොෆයිලයකටම වෙන වෙනම දත්ත ගබඩාව
- **ඉක්මන් මාරුව**: Profile අතර පහසුවෙන් මාරු වන්න

### 💰 ගිණුම් කළමනාකරණය (Account Management)

#### බැංකු ගිණුම් (Bank Accounts)
- ✓ බහු බැංකු ගිණුම් එකතු කරන්න
- ✓ ගිණුම් අංක සහ වර්ග ලේඛනය
- ✓ ශේෂ ලුහුබැදීම
- ✓ වර්ණ කේතනය සහිත හඳුනාගැනීම

#### මුදල් ගිණුම් (Cash Accounts)
- ✓ විවිධ මුදල් මූලාශ්‍ර කළමනාකරණය
- ✓ පුබුන, වොලට්, අතේ මුදල් ආදිය
- ✓ Real-time balance updates

### 💸 ගනුදෙනු කළමනාකරණය (Transaction Management)

- **ආදායම් ලේඛනය**: සියලු ආදායම් මූලාශ්‍ර track කරන්න
- **වියදම් ලේඛනය**: වියදම් විස්තරාත්මකව සටහන් කරන්න
- **කාණ්ඩ**: ගනුදෙනු කාණ්ඩ අනුව සංවිධානය කරන්න
- **දින වාර්තා**: දිනයට අනුව ගනුදෙනු පෙරීම

### 📊 Dashboard සහ වාර්තා (Dashboard & Reports)

- සජීවී balance summaries
- මාසික වියදම් විශ්ලේෂණය
- කාණ්ඩ අනුව අයවැය tracking
- දෘශ්‍ය progress bars

### 🌙 අතිරේක විශේෂාංග (Additional Features)

- **Dark Mode**: Eye-friendly අඳුරු තේමාව
- **Responsive Design**: සියලු screen sizes සඳහා optimize කර ඇත
- **Offline First**: Internet connection නොමැතිව වැඩ කරයි
- **Fast Performance**: Smooth animations සහ transitions
- **Data Persistence**: සියලු දත්ත local storage එකේ සුරකිනවා

---

## 🚀 ස්ථාපනය සහ භාවිතය (Installation & Usage)

### පූර්ව අවශ්‍යතා (Prerequisites)

```bash
# Node.js (version 16 or higher)
node --version

# npm or yarn
npm --version
```

### 1. Repository Clone කරන්න

```bash
git clone <repository-url>
cd workspace
```

### 2. Dependencies Install කරන්න

```bash
npm install
```

### 3. Development Server එක Start කරන්න

```bash
# Expo development server
npm start

# හෝ Android emulator එකේ විවෘත කරන්න
npm run android

# හෝ iOS simulator එකේ විවෘත කරන්න
npm run ios
```

### 4. APK Build කරන්න

සම්පූර්ණ build උපදෙස් සඳහා [BUILD_INSTRUCTIONS.md](BUILD_INSTRUCTIONS.md) බලන්න.

```bash
# Quick build command
npm run build:android
```

---

## 📱 භාවිත උපදෙස් (Usage Guide)

### ප්‍රථම වතාවට භාවිතය (First Time Setup)

1. **යෙදුම විවෘත කරන්න**: ප්‍රොෆයිල් තේරීමේ screen එක පෙනේ
2. **නව ප්‍රොෆයිලයක් සාදන්න**:
   - "නව ප්‍රොෆයිලයක් සාදන්න" button එක click කරන්න
   - නමක් ඇතුළත් කරන්න
   - Avatar එකක් තෝරන්න
   - වර්ණයක් තෝරන්න
   - "සාදන්න" click කරන්න
3. **ප්‍රොෆයිලය තෝරන්න**: නිර්මාණය කළ ප්‍රොෆයිලය click කරන්න

### ගිණුම් එකතු කිරීම (Adding Accounts)

#### බැංකු ගිණුමක්:
1. "බැංකු" tab එක තෝරන්න
2. + button එක click කරන්න
3. බැංකු නම, ගිණුම් අංකය, ශේෂය ඇතුළත් කරන්න
4. වර්ණයක් තෝරන්න
5. "සුරකින්න" click කරන්න

#### මුදල් ගිණුමක්:
1. "මුදල්" tab එක තෝරන්න
2. + button එක click කරන්න
3. ගිණුමේ නම සහ ශේෂය ඇතුළත් කරන්න
4. වර්ණයක් තෝරන්න
5. "සුරකින්න" click කරන්න

### ගනුදෙනුවක් එකතු කිරීම (Adding Transactions)

1. Dashboard එකේ + button එක click කරන්න
2. "වියදම" හෝ "ආදායම" තෝරන්න
3. මුදල ඇතුළත් කරන්න
4. විස්තරය ලියන්න
5. කාණ්ඩය සහ ගිණුම තෝරන්න
6. "ගනුදෙනුව සුරකින්න" click කරන්න

### ප්‍රොෆයිල් මාරු කිරීම (Switching Profiles)

1. "සැකසුම්" tab එක තෝරන්න
2. "ප්‍රොෆයිලය මාරු කරන්න" click කරන්න
3. අවශ්‍ය ප්‍රොෆයිලය තෝරන්න

---

## 🏗️ ව්‍යාපෘති ව්‍යුහය (Project Structure)

```
workspace/
├── src/
│   ├── screens/              # සියලු screen components
│   │   ├── ProfileSelectionScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── BankAccountsScreen.js
│   │   ├── CashAccountsScreen.js
│   │   ├── CategoriesScreen.js
│   │   ├── SettingsScreen.js
│   │   └── AddTransactionScreen.js
│   ├── contexts/             # React contexts
│   │   └── ProfileContext.js
│   ├── components/           # Reusable components
│   └── utils/               # Utility functions
├── assets/                   # Images, icons, fonts
├── App.js                   # Main app component
├── app.json                 # Expo configuration
├── eas.json                 # EAS Build configuration
├── package.json             # Dependencies
├── BUILD_INSTRUCTIONS.md    # Detailed build guide
└── README.md               # This file
```

---

## 🛠️ තාක්ෂණික තොරතුරු (Technical Stack)

### Core Technologies
- **React Native**: 0.72.6
- **Expo**: ~49.0.15
- **React Navigation**: 6.x
- **AsyncStorage**: 1.18.2

### UI Libraries
- **React Native Vector Icons**: 10.0.2
- **React Native Color Picker**: 0.6.0
- **React Native Safe Area Context**: 4.6.3

### State Management
- **React Context API**: Profile සහ App state කළමනාකරණය
- **Local Storage**: AsyncStorage මගින්

### Navigation
- **Bottom Tabs**: Main navigation
- **Stack Navigator**: Screen transitions

---

## 📦 Dependencies

```json
{
  "react": "18.2.0",
  "react-native": "0.72.6",
  "expo": "~49.0.15",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/bottom-tabs": "^6.5.11",
  "@react-navigation/native-stack": "^6.9.17",
  "@react-native-async-storage/async-storage": "1.18.2",
  "react-native-vector-icons": "^10.0.2",
  "react-native-color-picker": "^0.6.0"
}
```

---

## 🔐 දත්ත ආරක්ෂාව (Data Security)

- සියලු දත්ත device එකේම local storage එකේ සුරකිනවා
- Cloud sync නැත (privacy සඳහා)
- Profile-specific data isolation
- No analytics හෝ tracking

---

## 🎨 UI/UX Features

- **සිංහල භාෂාව**: සම්පූර්ණයෙන්ම සිංහලෙන්
- **Intuitive Navigation**: පහසු bottom tab navigation
- **Visual Feedback**: Smooth animations සහ transitions
- **Color Coding**: ඉක්මන් හඳුනාගැනීම සඳහා
- **Dark Mode**: Eye strain අඩු කරන තේමාව
- **Responsive Design**: සියලු Android devices

---

## 📱 System Requirements

### Android
- **Minimum**: Android 5.0 (API 21)
- **Recommended**: Android 8.0 or higher
- **Storage**: 50 MB free space
- **RAM**: 2 GB or more

### Development
- **Node.js**: 16.0.0 or higher
- **npm**: 7.0.0 or higher
- **Expo CLI**: Latest version

---

## 🚀 Build & Deploy

### Local Development
```bash
npm start           # Start Expo dev server
npm run android     # Run on Android
npm run ios         # Run on iOS
```

### Production Build
```bash
# Using EAS Build (Recommended)
eas build --platform android --profile production

# Traditional Expo Build
expo build:android -t apk
```

සම්පූර්ණ උපදෙස් [BUILD_INSTRUCTIONS.md](BUILD_INSTRUCTIONS.md) එකේ.

---

## 🤝 දායක වීම (Contributing)

දායක වීම් සාදරයෙන් පිළිගනිමු! Please:

1. Repository එක fork කරන්න
2. Feature branch එකක් සාදන්න
3. Changes commit කරන්න
4. Branch එක push කරන්න
5. Pull Request එකක් open කරන්න

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 සහාය (Support)

Issues හෝ questions ඇත්නම්:
- GitHub Issues: [Create an issue](../../issues)
- Email: support@example.com

---

## 🎯 අනාගත සංවර්ධන (Future Enhancements)

- [ ] Cloud backup සහාය
- [ ] Export/Import දත්ත (CSV, JSON)
- [ ] Charts සහ graphs
- [ ] Receipt scanning
- [ ] Reminders සහ notifications
- [ ] Multi-currency සහාය
- [ ] Expense sharing (පවුලේ සාමාජිකයන් සමඟ)

---

## 📸 Screenshots

_(Screenshots will be added here)_

---

<div align="center">

### 💖 Made with Love for Sinhala Users

**Version 2.0.0** • බහු ගිණුම් කළමනාකරණය සහිතව

සියලු හිමිකම් ඇවිරිණි © 2025

</div>
