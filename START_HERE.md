# 🚀 මෙතැනින් පටන් ගන්න / START HERE

## ස්වාගතයි! Welcome to Account Management App!

මෙම document එක ඔබගේ යෙදුම APK file එකක් බවට පත් කිරීමට උදව් කරයි.

This document will help you turn this app into an APK file.

---

## ⚡ Quick Start (5 Steps)

### 1️⃣ Setup කරන්න / Setup

```bash
./setup.sh
```

මෙය automatically:
- Node modules install කරයි
- Expo CLI check කරයි
- EAS CLI install කරයි
- Project එක setup කරයි

### 2️⃣ Test කරන්න / Test

```bash
npm start
```

Then press `a` for Android or `i` for iOS (Mac only)

### 3️⃣ APK Build කරන්න / Build APK

```bash
./build-apk.sh
```

Follow the prompts:
- Login to Expo (පළමු වතාවට)
- Select build type (Preview recommended)
- Wait for build to complete (~15 minutes)

### 4️⃣ Download කරන්න / Download

Build එක සම්පූර්ණ වූ පසු:
- Check your email for download link
- හෝ visit: https://expo.dev/accounts/[your-account]/builds

### 5️⃣ Install කරන්න / Install

- APK file එක download කරන්න
- Android device එකට transfer කරන්න
- Install කරන්න

---

## 📚 විස්තරාත්මක මාර්ගෝපදේශ / Detailed Guides

ඔබට වැඩි විස්තර අවශ්‍ය නම්:

1. **QUICK_START.md** - ඉක්මන් ආරම්භය
2. **BUILD_INSTRUCTIONS.md** - සම්පූර්ණ build guide
3. **README.md** - විශේෂාංග සහ භාවිතය
4. **PROJECT_SUMMARY.md** - Technical details

---

## 🎯 පළමු වතාවට / First Time Users

### පෙර අවශ්‍යතා / Prerequisites

ඔබ සතුව තිබිය යුතුයි:
- ✅ Computer (Windows/Mac/Linux)
- ✅ Internet connection
- ✅ Android phone (APK test කිරීමට)

### ඔබට Install කළ යුතුයි / What You Need to Install

කිසිවක් අතින් install කිරීමට අවශ්‍ය නැත! `./setup.sh` script එක සියල්ල කරයි.

Nothing to install manually! The `./setup.sh` script does everything.

---

## 🔐 Expo Account

APK build කිරීමට Expo account එකක් අවශ්‍යයි:

1. Visit: https://expo.dev/signup
2. Create free account
3. Verify email
4. Done!

---

## 💻 Commands සාරාංශය / Command Summary

```bash
# Setup everything
./setup.sh

# Start development server
npm start

# Build APK (interactive)
./build-apk.sh

# Build APK (manual)
npm run build:preview

# Clear cache if issues
npm run clear
```

---

## 📱 විශේෂාංග / Features

ඔබගේ යෙදුමට ඇති විශේෂාංග:

✅ බහු බැංකු ගිණුම් / Multiple bank accounts
✅ බහු මුදල් ගිණුම් / Multiple cash accounts
✅ වියදම් කාණ්ඩ / Expense categories
✅ ආදායම් සහ වියදම් / Income & expenses
✅ Dashboard සමඟ / With dashboard
✅ Dark/Light mode
✅ සම්පූර්ණ සිංහල UI / Full Sinhala UI
✅ Color coding
✅ Budget tracking

---

## 🐛 ගැටළු ඇති නම් / If You Have Issues

### Setup ගැටළු / Setup Issues

```bash
# Dependencies නැවත install කරන්න
rm -rf node_modules
npm install
```

### Build ගැටළු / Build Issues

```bash
# Cache clear කරන්න
npm start -- --clear

# EAS නැවත login කරන්න
eas logout
eas login
```

### App ධාවනය නොවන්නේ නම් / App Not Running

```bash
# Metro bundler restart කරන්න
npm start -- --reset-cache
```

---

## 📊 Build Time අපේක්ෂා / Expected Build Times

- **Setup**: 5-10 minutes (first time only)
- **Development**: Instant (npm start)
- **APK Build**: 10-20 minutes (depends on Expo servers)

---

## ✅ Checklist

### Setup කිරීමට පෙර / Before Setup
- [ ] Git repository clone කර ඇත
- [ ] Terminal/Command Prompt විවෘත කර ඇත
- [ ] Project folder එකේ සිටී

### Setup කිරීමෙන් පසු / After Setup
- [ ] npm start වැඩ කරයි
- [ ] App එක emulator/device එකේ විවෘත වේ
- [ ] සියල්ල හොඳින් ක්‍රියාත්මක වේ

### Build කිරීමට පෙර / Before Build
- [ ] Expo account created
- [ ] EAS login complete
- [ ] App tested and working

### Build කිරීමෙන් පසු / After Build
- [ ] Build email received
- [ ] APK downloaded
- [ ] App installed on Android
- [ ] Tested on real device

---

## 🎨 Assets (Optional)

ඔබගේම icon එකක් අවශ්‍ය නම්:

1. `assets/` folder එකට යන්න
2. `icon.png` (1024x1024) add කරන්න
3. `splash.png` (1284x2778) add කරන්න
4. නැවත build කරන්න

Details: `assets/README.md`

---

## 🚀 Build Steps විස්තරාත්මකව / Detailed Build Steps

### Step 1: Terminal විවෘත කරන්න

```bash
cd /path/to/account-management
```

### Step 2: Setup Run කරන්න

```bash
chmod +x setup.sh
./setup.sh
```

Wait for completion...

### Step 3: Test කරන්න

```bash
npm start
```

Press `a` to open Android, `w` for web

### Step 4: Build Script Run කරන්න

```bash
chmod +x build-apk.sh
./build-apk.sh
```

### Step 5: Options තෝරන්න

```
1) Preview Build (Testing) - ප්‍රදර්ශන Build ← අපි මේක තෝරමු
2) Production Build (Release) - නිෂ්පාදන Build
3) Development Build - සංවර්ධන Build
4) Configure EAS Build - EAS Build සකසන්න
5) Exit - පිටවන්න
```

Press `1` and Enter

### Step 6: Login (First time only)

```
Email: your@email.com
Password: ********
```

### Step 7: Wait

Build process starts...
- ⏳ Uploading project
- ⏳ Installing dependencies
- ⏳ Building APK
- ⏳ ~15 minutes

### Step 8: Download

Email එකක් එයි:
- "Your build is complete!"
- Click download link
- හෝ dashboard එකෙන් download කරන්න

### Step 9: Install

- APK file open කරන්න
- Install button click කරන්න
- "Unknown sources" allow කරන්න
- Done!

---

## 📞 උදවු අවශ්‍ය නම් / Need Help?

### Documents:
- `QUICK_START.md` - Quick guide
- `BUILD_INSTRUCTIONS.md` - Detailed build guide
- `README.md` - Full documentation

### Common Issues:
- `CHANGELOG.md` - Known issues
- GitHub Issues - Bug reports

---

## 🎉 සාර්ථකව සම්පූර්ණ කළා නම් / If Successfully Completed

ඔබට දැන් තිබේ:
- ✅ Working React Native app
- ✅ APK file
- ✅ Installable on any Android device
- ✅ Sinhala UI
- ✅ Multiple account management
- ✅ Full offline functionality

---

## 📱 යෙදුම භාවිතය / Using the App

### පළමු වරට විවෘත කළ විට / First Time Opening

1. **Dashboard දිස් වේ / Dashboard appears**
   - Empty state පෙන්වයි
   - "Add" buttons තිබේ

2. **බැංකු ගිණුමක් එකතු කරන්න / Add Bank Account**
   - "බැංකු" tab click කරන්න
   - + button click කරන්න
   - Details fill කරන්න
   - Save

3. **මුදල් ගිණුමක් එකතු කරන්න / Add Cash Account**
   - "මුදල්" tab click කරන්න
   - + button click කරන්න
   - Details fill කරන්න
   - Save

4. **කාණ්ඩයක් එකතු කරන්න / Add Category**
   - "කාණ්ඩ" tab click කරන්න
   - + button click කරන්න
   - Name, target, spent fill කරන්න
   - Save

5. **ගනුදෙනුවක් එකතු කරන්න / Add Transaction**
   - Dashboard එකේ + button
   - හෝ "බැංකු Withdraw" button
   - Details fill කරන්න
   - Save

---

## 🔥 Pro Tips

1. **Color Coding භාවිතා කරන්න**
   - ගිණුම් වලට විවිධ වර්ණ දෙන්න
   - පහසුවෙන් හඳුනාගත හැක

2. **Categories නිර්මාණය කරන්න**
   - ආහාර, ප්‍රවාහන, බිල්පත්, ආදිය
   - Budget tracking වැදගත්

3. **Regular Updates**
   - දිනපතා transactions add කරන්න
   - Monthly reports check කරන්න

4. **Backup Data**
   - Settings > Export Data
   - Regular backups ගන්න

---

## 🌟 සතුටු වෙන්න! / Enjoy!

ඔබගේ යෙදුම සාර්ථකව ක්‍රියාත්මක වේ!

Your app is successfully working!

**Next Steps:**
- Share with friends
- Get feedback
- Improve features
- Update regularly

---

## 📢 අවසන් පණිවිඩය / Final Message

APK එක දැන් build කර download කරගෙන ඕනෑම Android device එකක install කරගත හැක!

The APK can now be built, downloaded, and installed on any Android device!

**සියල්ල සූදානම්! Everything is ready! 🎉**

---

**ස්තූතියි! Thank you! 🙏**

සතුටින් භාවිතා කරන්න! / Enjoy using your app!
