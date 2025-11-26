# 💰 Sinhala Expense Tracker - බහු පරිශීලක ගිණුම් කළමනාකරණය

React Native Expo යෙදුමක් - බහු පරිශීලක profile management සහිත සම්පූර්ණ වියදම් ට්‍රැකර්

## 🎯 විශේෂාංග (Features)

### 👥 බහු පරිශීලක කළමනාකරණය
- ✅ එක් device එකක පරිශීලකයින් කීපදෙනෙකු
- ✅ වෙනස් profile සඳහා අනන්‍ය දත්ත
- ✅ පරිශීලක අතර ඉක්මනින් මාරුවීම
- ✅ දත්ත වෙන්කොට ගබඩා කිරීම

### 💸 මුදල් කළමනාකරණය
- 🏦 බැංකු ගිණුම් (වර්ණ සමඟ)
- 💵 මුදල් ගිණුම් (පුබුන, වොලට්, ආදිය)
- 📊 කාණ්ඩ සහ බජට් ට්‍රැකිං
- 📈 ගනුදෙනු ඉතිහාසය
- 🌙 අඳුරු/ආලෝක මාදිලිය
- 🎨 වර්ණ customization

## 🚀 Quick Start

### 1. ස්ථාපනය (Installation)
```bash
# Dependencies install කරන්න
npm install

# Development server start කරන්න
npm start
```

### 2. පරීක්ෂා කිරීම (Testing)
```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

### 3. APK Build කරන්න
සම්පූර්ණ උපදෙස් සඳහා [`BUILD_APK_INSTRUCTIONS.md`](./BUILD_APK_INSTRUCTIONS.md) බලන්න

```bash
# Preview build (fast)
npm run build:preview

# Production build
npm run build:production
```

## 📱 App භාවිතය

### පළමු වරට
1. App open කරන්න
2. පළමු පරිශීලකයා සාදන්න
3. බැංකු/මුදල් ගිණුම් එක් කරන්න
4. කාණ්ඩ සාදන්න
5. ගනුදෙනු track කරන්න!

### තවත් පරිශීලකයින්
- සැකසුම් > පරිශීලකයා මාරු කරන්න
- "+" click කරන්න
- නව profile සාදන්න

## 🛠️ තාක්ෂණය (Tech Stack)

- **Framework:** React Native (Expo)
- **Navigation:** React Navigation
- **Storage:** AsyncStorage
- **Icons:** MaterialCommunityIcons
- **Language:** Sinhala (සිංහල)

## 📂 Project Structure

```
/workspace/
├── src/
│   ├── contexts/
│   │   └── UserProfileContext.js    # User management context
│   ├── screens/
│   │   ├── UserSelectionScreen.js   # Multi-user selection
│   │   ├── DashboardScreen.js
│   │   ├── BankAccountsScreen.js
│   │   ├── CashAccountsScreen.js
│   │   ├── CategoriesScreen.js
│   │   ├── SettingsScreen.js
│   │   └── AddTransactionScreen.js
│   └── components/
├── assets/
├── App.js                            # Main entry point
├── app.json                          # Expo configuration
├── eas.json                          # EAS Build configuration
└── package.json
```

## 🎨 Customization

### වර්ණ වෙනස් කරන්න
Screens වල color constants edit කරන්න

### භාෂාව එක් කරන්න
නව translations context එකක් සාදන්න

### Features එක් කරන්න
නව screens සහ navigation items add කරන්න

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

## 🐛 Troubleshooting

### Build Issues
```bash
# Cache clear කරන්න
expo start -c

# Dependencies යාවත්කාලීන කරන්න
npm update
```

### App Crashes
```bash
# node_modules නැවත install කරන්න
rm -rf node_modules
npm install
```

වැඩි විස්තර සඳහා [`BUILD_APK_INSTRUCTIONS.md`](./BUILD_APK_INSTRUCTIONS.md) බලන්න

## 📄 License

MIT License - ඔබට කැමති ආකාරයට භාවිතා කරන්න!

## 🤝 Contributing

PRs welcome! සිංහල භාෂාවට සහාය දක්වන්න.

## 📞 Support

Issues හෝ questions සඳහා GitHub issue එකක් create කරන්න.

---

**Made with ❤️ for Sinhala Community**

🇱🇰 Sri Lankan භාවිතය සඳහා විශේෂයෙන් නිර්මාණය කර ඇත