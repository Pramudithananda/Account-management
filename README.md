# ගිණුම් කළමනාකරණය | Account Management System

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.72.6-61DAFB.svg)
![Expo](https://img.shields.io/badge/Expo-49.0.15-000020.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

සිංහල භාෂාවෙන් තනන ලද සම්පූර්ණ බහු ගිණුම් කළමනාකරණ පද්ධතිය

A complete Multiple Account Management System in Sinhala Language

</div>

---

## 📱 විශේෂාංග / Features

### 🏦 බැංකු ගිණුම් කළමනාකරණය / Bank Account Management
- බහු බැංකු ගිණුම් එකතු කරන්න
- ගිණුම් අංකය සහ වර්ණ කේත සමඟ සංවිධානය කරන්න
- සැබෑ කාලීන ශේෂය නිරීක්ෂණය
- ගිණුම් සංස්කරණය සහ මකා දැමීම

### 💰 මුදල් ගිණුම් / Cash Accounts
- පුබුන, වොලට්, සාක්කුව, ආදි මුදල් ගිණුම්
- වර්ණ කේත භාවිතයෙන් පහසුවෙන් හඳුනා ගැනීම
- මුළු මුදල් ශේෂය Dashboard එකේ

### 📊 වියදම් කාණ්ඩ / Expense Categories
- විවිධ කාණ්ඩ අනුව වියදම් කළමනාකරණය
- ඉලක්ක මුදල සහ වියදම් කළ මුදල tracking
- Progress bars භාවිතයෙන් දෘශ්‍ය නිරීක්ෂණය
- Budget ඉක්මවීම අනතුරු ඇඟවීම්

### 💸 ගනුදෙනු කළමනාකරණය / Transaction Management
- ආදායම් සහ වියදම් ගනුදෙනු එකතු කරන්න
- ගිණුම් අතර මුදල් මාරු කිරීම
- විස්තරාත්මක ගනුදෙනු සටහන්
- කාණ්ඩ අනුව ගනුදෙනු සංවිධානය

### 🎨 පරිශීලක අතුරු මුහුණත / User Interface
- අඳුරු සහ දීප්ත මාදිලි (Dark & Light Mode)
- සිංහල භාෂාව සඳහා සම්පූර්ණ සහාය
- ආකර්ෂණීය වර්ණ තේරීමක් (Color Picker)
- Responsive design - සියලු screen sizes සඳහා

### ⚙️ සැකසීම් / Settings
- Dark/Light mode toggle
- දත්ත Export/Backup කිරීම
- සියලු දත්ත මකා දැමීම
- යෙදුම් සංඛ්‍යාලේඛන

---

## 🚀 ස්ථාපනය / Installation

### පූර්ව අවශ්‍යතා / Prerequisites

```bash
node --version  # v16 හෝ ඊට වැඩි / v16 or higher
npm --version   # 7 හෝ ඊට වැඩි / 7 or higher
```

### 1️⃣ Repository Clone කරන්න

```bash
git clone https://github.com/your-username/account-management.git
cd account-management
```

### 2️⃣ Dependencies ස්ථාපනය

```bash
npm install
```

හෝ

```bash
yarn install
```

### 3️⃣ Development Server ආරම්භ කරන්න

```bash
npm start
```

---

## 📱 යෙදුම ධාවනය කරන්න / Run the App

### Android

```bash
npm run android
```

හෝ Expo Go app භාවිතා කරන්න:
1. Play Store එකෙන් Expo Go download කරන්න
2. `npm start` command එක run කරන්න
3. QR code එක scan කරන්න

### iOS (Mac පමණි / Mac only)

```bash
npm run ios
```

### Web Browser

```bash
npm run web
```

---

## 📦 APK සෑදීම / Build APK

විස්තරාත්මක build instructions සඳහා [BUILD_INSTRUCTIONS.md](./BUILD_INSTRUCTIONS.md) බලන්න

### ඉක්මන් ක්‍රමය / Quick Method

```bash
# EAS CLI ස්ථාපනය
npm install -g eas-cli

# Login
eas login

# Build configure
eas build:configure

# APK build
eas build --platform android --profile preview
```

Build සම්පූර්ණ වූ පසු APK download link එක email එකට එවනු ලැබේ.

---

## 🏗️ Project Structure

```
account-management/
├── App.js                          # Main app entry point
├── app.json                        # Expo configuration
├── eas.json                        # EAS Build configuration
├── package.json                    # Dependencies
├── src/
│   ├── screens/
│   │   ├── DashboardScreen.js      # මුල් පිටුව / Dashboard
│   │   ├── BankAccountsScreen.js   # බැංකු ගිණුම් / Bank Accounts
│   │   ├── CashAccountsScreen.js   # මුදල් ගිණුම් / Cash Accounts
│   │   ├── CategoriesScreen.js     # කාණ්ඩ / Categories
│   │   ├── SettingsScreen.js       # සැකසීම් / Settings
│   │   └── AddTransactionScreen.js # ගනුදෙනු / Transactions
│   └── components/                 # Reusable components
├── assets/                         # Images, icons, fonts
└── BUILD_INSTRUCTIONS.md           # Detailed build guide
```

---

## 🛠️ තාක්ෂණයන් / Technologies

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **AsyncStorage** - Local data storage
- **React Native Vector Icons** - Icons
- **React Native Color Picker** - Color selection

---

## 💾 දත්ත ගබඩාව / Data Storage

යෙදුම AsyncStorage භාවිතා කරයි:
- ✅ සියලු දත්ත device එකේම ගබඩා වේ
- ✅ Internet connection අවශ්‍ය නැත
- ✅ දත්ත සම්පූර්ණයෙන්ම පුද්ගලික
- ✅ No cloud sync (privacy focused)

---

## 📸 Screenshots

### Dashboard
මුළු ගිණුම් summary, මෑත ගනුදෙනු සහ ඉක්මන් ක්‍රියා

### Bank Accounts
බහු බැංකු ගිණුම් වර්ණ කේත සමඟ කළමනාකරණය කරන්න

### Cash Accounts
පුබුන, වොලට් ආදී මුදල් ගිණුම් නිරීක්ෂණය කරන්න

### Categories
වියදම් කාණ්ඩ අනුව budget tracking කරන්න

### Transactions
ආදායම් සහ වියදම් විස්තරාත්මකව record කරන්න

---

## 🎯 භාවිත ආකාරය / How to Use

### 1. බැංකු ගිණුමක් එකතු කරන්න

1. "බැංකු" tab එකට යන්න
2. + button එක click කරන්න
3. බැංකු නම, ගිණුම් අංකය සහ ශේෂය ඇතුලත් කරන්න
4. වර්ණයක් තෝරන්න
5. "සුරකින්න" click කරන්න

### 2. මුදල් ගිණුමක් එකතු කරන්න

1. "මුදල්" tab එකට යන්න
2. + button එක click කරන්න
3. ගිණුම් නම සහ ශේෂය ඇතුලත් කරන්න
4. වර්ණයක් තෝරන්න
5. "සුරකින්න" click කරන්න

### 3. වියදම් කාණ්ඩයක් එකතු කරන්න

1. "කාණ්ඩ" tab එකට යන්න
2. + button එක click කරන්න
3. කාණ්ඩ නම, ඉලක්ක මුදල සහ වියදම් කළ මුදල ඇතුලත් කරන්න
4. "සුරකින්න" click කරන්න

### 4. ගනුදෙනුවක් එකතු කරන්න

1. Dashboard එකේ "බැංකු Withdraw" හෝ + button එක click කරන්න
2. ආදායම හෝ වියදම තෝරන්න
3. විස්තර, මුදල සහ ගිණුම තෝරන්න
4. කාණ්ඩයක් තෝරන්න (වියදම් සඳහා)
5. "ගනුදෙනුව එක් කරන්න" click කරන්න

---

## 🔧 සංවර්ධනය / Development

### Debug Mode

```bash
npm start
```

Terminal එකේ:
- `a` ඔබන්න - Android එකට විවෘත කරන්න
- `i` ඔබන්න - iOS එකට විවෘත කරන්න
- `w` ඔබන්න - Web browser එකට විවෘත කරන්න
- `r` ඔබන්න - App එක reload කරන්න

### Clear Cache

```bash
npm start -- --clear
```

---

## 🐛 ගැටළු නිරාකරණය / Troubleshooting

### Dependencies ගැටළු

```bash
rm -rf node_modules
npm install
```

### Metro Bundler ගැටළු

```bash
npx react-native start --reset-cache
```

### Android Build ගැටළු

```bash
cd android
./gradlew clean
cd ..
```

---

## 🚀 අනාගත සංවර්ධන / Future Enhancements

- [ ] දත්ත Backup/Restore Cloud සමඟ
- [ ] Charts සහ Reports
- [ ] Monthly/Yearly summaries
- [ ] Recurring transactions
- [ ] Bill reminders
- [ ] Multi-currency support
- [ ] Data encryption
- [ ] Biometric authentication
- [ ] Export to PDF/Excel
- [ ] Widgets

---

## 🤝 Contributing

Contributions welcome! නව features, bug fixes හෝ improvements සඳහා:

1. Fork කරන්න
2. Feature branch එකක් සාදන්න (`git checkout -b feature/NewFeature`)
3. Changes commit කරන්න (`git commit -m 'Add NewFeature'`)
4. Branch එක push කරන්න (`git push origin feature/NewFeature`)
5. Pull Request එකක් විවෘත කරන්න

---

## 📄 License

MIT License - Free to use, modify and distribute

---

## 📞 සහාය / Support

ගැටළු හෝ ප්‍රශ්න සඳහා:
- GitHub Issues විවෘත කරන්න
- Email: support@example.com

---

## 👨‍💻 සංවර්ධකයා / Developer

React Native සහ Expo භාවිතයෙන් සිංහල භාෂාව සඳහා සංවර්ධනය කරන ලදී.

---

<div align="center">

**ස්තූතියි! Thank you for using this app! 🙏**

Made with ❤️ in Sri Lanka 🇱🇰

</div>
