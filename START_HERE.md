# 🎉 ආයුබෝවන්! Welcome!

## මෙම Repository එක සම්පූර්ණයෙන්ම සූදානම්!

ඔබේ **Sinhala Expense Tracker** යෙදුම බහු ගිණුම් කළමනාකරණ විශේෂාංග සමඟ සම්පූර්ණයෙන්ම නිර්මාණය කර අවසන්!

---

## 🚀 ඉක්මන් ආරම්භය (Quick Start)

### පියවර 1: Dependencies Install කරන්න

```bash
cd /workspace
npm install
```

### පියවර 2: APK Build කරන්න

**Option A - Automated Script (Recommended):**
```bash
./build-apk.sh
```

**Option B - Direct Command:**
```bash
npm run build:preview
```

**Option C - Manual:**
```bash
# EAS CLI install කරන්න
npm install -g eas-cli

# Login වන්න
eas login

# Build කරන්න
eas build --platform android --profile preview
```

### පියවර 3: APK Download කරන්න
- Build complete වූ පසු terminal එකේ link එකෙන්
- හෝ https://expo.dev/ → Projects → Your Project → Builds

### පියවර 4: Install කරන්න
- APK file එක Android phone එකට transfer කරන්න
- Unknown sources enable කරන්න
- APK tap කරලා install කරන්න

---

## 📚 ලේඛන (Documentation)

### අවශ්‍ය ගොනු:

1. **QUICKSTART_SINHALA.md** ⭐ මෙතනින් පටන් ගන්න
   - ඉක්මන් APK build උපදෙස්
   - Install කරන ආකාරය
   - යෙදුම භාවිත කරන ආකාරය

2. **BUILD_INSTRUCTIONS.md**
   - විස්තරාත්මක build උපදෙස්
   - 3 Build methods
   - Troubleshooting

3. **APP_FEATURES.md**
   - සියලු විශේෂාංග විස්තර
   - Use cases
   - Technical details

4. **PROJECT_COMPLETE.md**
   - Project overview
   - සම්පූර්ණ කළ කාර්යයන්
   - Technical specifications

5. **README.md**
   - Project overview (English)
   - Installation guide
   - Contributing guidelines

---

## ✨ නිර්මාණය කළ විශේෂාංග

### 🎯 බහු පරිශීලක පද්ධතිය (Multi-User System)
- ✅ එක් device එකෙන් බහු users
- ✅ Users add/delete/switch කරන්න
- ✅ සෑම user කෙනෙකුටම වෙනම data
- ✅ User profiles සමඟ

### 💰 ගිණුම් කළමනාකරණය
- ✅ බැංකු ගිණුම් (Bank accounts)
- ✅ මුදල් ගිණුම් (Cash accounts)
- ✅ Custom colors
- ✅ Balance tracking

### 📊 වියදම් නිරීක්ෂණය
- ✅ ආදායම් සහ වියදම්
- ✅ Transaction history
- ✅ Date tracking
- ✅ Categories

### 📈 අයවැය කළමනාකරණය
- ✅ Budget categories
- ✅ Target setting
- ✅ Progress tracking
- ✅ Over-budget warnings

### ⚙️ සැකසුම්
- ✅ User management
- ✅ Dark/Light mode
- ✅ අඳුරු/දීප්ත මාදිලි
- ✅ App information

### 🌐 සිංහල භාෂාව
- ✅ සම්පූර්ණයෙන්ම සිංහල UI
- ✅ සිංහල labels
- ✅ සිංහල messages

---

## 📱 Build කරන්න දැන් (Build Now)

### ක්‍රමය 1: Automated Script ⭐

```bash
cd /workspace
./build-apk.sh
```

එක් command එකකින් සම්පූර්ණ process එක!

### ක්‍රමය 2: NPM Script

```bash
cd /workspace
npm run build:preview
```

### ක්‍රමය 3: Step by Step

```bash
# 1. EAS CLI install
npm install -g eas-cli

# 2. Login to Expo
eas login

# 3. Navigate to project
cd /workspace

# 4. Build APK
eas build --platform android --profile preview

# 5. Download from link provided
```

---

## 🎓 යෙදුම භාවිත කරන්නේ කෙසේද

### පළමු වතාවට:

1. යෙදුම open කරන්න
2. Default user ලෙස "පරිශීලකයා 1" ලෙස login වේ
3. Settings → "නව ගිණුමක් එක් කරන්න"
4. ඔබේ නම ඇතුළත් කරන්න
5. "ගිණුම මාරු කරන්න" භාවිතා කරන්න

### Accounts Add කරන්න:

**බැංකු ගිණුමක්:**
1. "බැංකු" tab → + button
2. බැංකු නම, ගිණුම් අංකය, ශේෂය
3. වර්ණය තෝරන්න
4. "සුරකින්න"

**මුදල් ගිණුමක්:**
1. "මුදල්" tab → + button
2. ගිණුම් නම, ශේෂය
3. වර්ණය තෝරන්න
4. "සුරකින්න"

### ගනුදෙනුවක් Add කරන්න:

1. Dashboard → + button (පහළ දකුණු කෙළවර)
2. වියදම/ආදායම තෝරන්න
3. විස්තර ඇතුළත් කරන්න
4. මුදල ඇතුළත් කරන්න
5. "ගනුදෙනුව සුරකින්න"

---

## 📂 ව්‍යාපෘති ව්‍යුහය (Project Structure)

```
/workspace/
├── App.js                      # Main app
├── app.json                    # Expo config
├── eas.json                    # Build config
├── package.json                # Dependencies
│
├── src/
│   ├── screens/                # All screens
│   │   ├── DashboardScreen.js
│   │   ├── BankAccountsScreen.js
│   │   ├── CashAccountsScreen.js
│   │   ├── CategoriesScreen.js
│   │   ├── SettingsScreen.js
│   │   └── AddTransactionScreen.js
│   │
│   └── contexts/
│       └── AppContext.js       # Multi-user state
│
└── Documentation/
    ├── README.md
    ├── QUICKSTART_SINHALA.md   ⭐ Start here!
    ├── BUILD_INSTRUCTIONS.md
    ├── APP_FEATURES.md
    └── PROJECT_COMPLETE.md
```

---

## 🔧 Available Commands

```bash
# Development
npm start              # Start Expo dev server
npm run android        # Run on Android device/emulator
npm run ios            # Run on iOS device/simulator
npm run web            # Run in web browser

# Building
npm run build:preview     # Build APK (recommended)
npm run build:production  # Build for production
./build-apk.sh            # Automated build script

# Testing
npm test               # Run tests (if configured)
```

---

## 💡 Tips

### පළමු Build:
- Expo account එකක් අවශ්‍යය (නොමිලේ)
- Stable internet connection
- මිනිත්තු 10-20ක් විතර ගතවේ
- පළමු වතාවට slow විය හැක

### නැවත Build:
- වඩාත් ඉක්මන්ව (cache භාවිතා කරයි)
- Incremental builds
- මිනිත්තු 5-10ක් විතර

### Development Testing:
```bash
# Expo Go app install කරන්න phone එකේ
# Project run කරන්න:
npm start

# QR code scan කරන්න Expo Go app එකෙන්
```

---

## 🆘 Help & Support

### ගැටළුවක් තිබේ නම්:

1. **QUICKSTART_SINHALA.md** බලන්න
   - Troubleshooting section

2. **BUILD_INSTRUCTIONS.md** බලන්න
   - විස්තරාත්මක උපදෙස්

3. **Expo Documentation:**
   - https://docs.expo.dev/

4. **Community:**
   - Expo Forums: https://forums.expo.dev/
   - Stack Overflow (tag: expo)

---

## 📋 Checklist

Build කිරීමට පෙර:
- [ ] Node.js installed (v14+)
- [ ] npm installed
- [ ] Expo account created
- [ ] Stable internet connection

Build කිරීම:
- [ ] `npm install` run කර ඇත
- [ ] Build script run කර ඇත
- [ ] Build successful
- [ ] APK downloaded

Install කිරීම:
- [ ] Unknown sources enabled
- [ ] APK transferred to phone
- [ ] APK installed
- [ ] App working

---

## 🎯 ඊළඟ පියවර (Next Steps)

### දැන්:
```bash
cd /workspace
npm install
./build-apk.sh
```

### පසුව:
1. ✅ APK download කරන්න
2. ✅ Phone එකේ install කරන්න
3. ✅ Open කරන්න
4. ✅ Users add කරන්න
5. ✅ Accounts add කරන්න
6. ✅ Transactions track කරන්න
7. ✅ සතුටින් භාවිතා කරන්න! 🎉

---

## 🌟 විශේෂාංග සාරාංශය

| විශේෂාංගය | තත්ත්වය |
|-----------|---------|
| Multi-User System | ✅ සම්පූර්ණයි |
| Bank Accounts | ✅ සම්පූර්ණයි |
| Cash Accounts | ✅ සම්පූර්ණයි |
| Transactions | ✅ සම්පූර්ණයි |
| Categories | ✅ සම්පූර්ණයි |
| Budget Tracking | ✅ සම්පූර්ණයි |
| Dark Mode | ✅ සම්පූර්ණයි |
| Sinhala UI | ✅ සම්පූර්ණයි |
| Custom Colors | ✅ සම්පූර්ණයි |
| Data Persistence | ✅ සම්පූර්ණයි |

---

## 🚀 Ready to Build!

ඔබේ යෙදුම සූදානම්!

```bash
# මෙම command එක run කරන්න:
cd /workspace && ./build-apk.sh
```

**හෝ**

QUICKSTART_SINHALA.md ගොනුව කියවන්න සම්පූර්ණ උපදෙස් සඳහා.

---

## 📞 Contact & Support

- 📖 Documentation: මෙම folder එකේ ඇති MD files
- 🌐 Expo: https://expo.dev/
- 💬 Forums: https://forums.expo.dev/
- 📚 React Native: https://reactnative.dev/

---

## 🎊 සාර්ථකව සූදානම්!

ඔබේ **Sinhala Expense Tracker** යෙදුම **බහු ගිණුම් කළමනාකරණය** සමඟ සූදානම්!

**දැන් APK build කරන්න සහ භාවිතා කරන්න! 🚀**

---

**Created with ❤️ | නිර්මාණය ආදරයෙන්**
