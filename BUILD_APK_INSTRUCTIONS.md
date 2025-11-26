# 📱 Sinhala Expense Tracker - APK Build Instructions
## බහු පරිශීලක ගිණුම් කළමනාකරණය සමඟ

මෙම යෙදුම **React Native** සහ **Expo** භාවිතයෙන් නිර්මාණය කර ඇත. බහු පරිශීලක profile management සහිත APK file එකක් build කරන්න පහත උපදෙස් අනුගමනය කරන්න.

---

## 🎯 විශේෂාංග (Features)

### ✨ බහු පරිශීලක කළමනාකරණය
- 🔄 එක් device එකක පරිශීලකයින් කීපදෙනෙකු
- 👤 වෙනස් profile සඳහා අනන්‍ය දත්ත
- 🔐 පරිශීලක අතර මාරුවීමේ හැකියාව
- 💾 දත්ත වෙන්කොට ගබඩා කිරීම

### 💰 මුදල් කළමනාකරණය
- 🏦 බැංකු ගිණුම් කළමනාකරණය (වර්ණ සහිත)
- 💵 මුදල් ගිණුම් (පුබුන, වොලට්, ආදිය)
- 📊 කාණ්ඩ සහ බජට් ට්‍රැකිං
- 📈 ගනුදෙනු ඉතිහාසය
- 🌙 අඳුරු/ආලෝක මාදිලිය

---

## 📋 අවශ්‍යතා (Prerequisites)

### 1. Node.js සහ npm ස්ථාපනය කරන්න
```bash
# Node.js version 16 හෝ ඉහළ අවශ්‍යයි
node --version  # v16.0.0 හෝ ඉහළ විය යුතුය
npm --version
```

**Download:** https://nodejs.org/

### 2. Expo CLI ස්ථාපනය කරන්න
```bash
npm install -g expo-cli
npm install -g eas-cli
```

### 3. Expo ගිණුමක් සාදන්න
- https://expo.dev වෙත යන්න
- නොමිලේ ගිණුමක් සාදන්න
- Email verify කරන්න

---

## 🚀 ක්‍රමය 1: Expo EAS Build (නිර්දේශිතයි ⭐)

### Step 1: Dependencies ස්ථාපනය
```bash
cd /workspace
npm install
```

### Step 2: Expo වෙත Login වන්න
```bash
eas login
```
ඔබගේ Expo email සහ password ඇතුළත් කරන්න.

### Step 3: Project Configure කරන්න
```bash
eas build:configure
```

### Step 4: APK Build කරන්න

#### Preview Build (පරීක්ෂණ සඳහා - වේගවත්)
```bash
eas build --platform android --profile preview
```

#### Production Build (අවසාන APK)
```bash
eas build --platform android --profile production
```

### Step 5: APK Download කරන්න
Build සම්පූර්ණ වූ පසු:
1. Terminal එකේ දිස්වන link එක copy කරන්න
2. Browser එකෙන් link එක open කරන්න
3. **Download APK** button එක click කරන්න
4. APK file එක ඔබගේ phone එකට transfer කරන්න
5. Install කරන්න!

---

## 🏗️ ක්‍රමය 2: Local Build (Advanced)

### Step 1: Dependencies ස්ථාපනය
```bash
npm install
```

### Step 2: Android Studio Setup
1. Android Studio download කරන්න: https://developer.android.com/studio
2. Android SDK ස්ථාපනය කරන්න
3. Environment variables set කරන්න:
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

### Step 3: Build කරන්න
```bash
# Expo prebuild (native folders generate කරයි)
npx expo prebuild --platform android

# Android build
cd android
./gradlew assembleRelease

# APK file location:
# android/app/build/outputs/apk/release/app-release.apk
```

---

## 📦 ක්‍රමය 3: Expo Go සමඟ පරීක්ෂා කිරීම (Build නැතිව)

### Step 1: Expo Go App Install කරන්න
- Android phone එකේ Play Store එකෙන් "Expo Go" app install කරන්න

### Step 2: Development Server Start කරන්න
```bash
npm start
# හෝ
expo start
```

### Step 3: QR Code Scan කරන්න
- Phone එකේ Expo Go app open කරන්න
- Terminal එකේ QR code එක scan කරන්න
- යෙදුම phone එකේ run වේවි!

**සටහන:** මෙය build කළ APK එකක් නොවේ. පරීක්ෂා කිරීම සඳහා පමණි.

---

## 🎨 Customization

### App නම වෙනස් කරන්න
`app.json` file එකේ:
```json
{
  "expo": {
    "name": "ඔබගේ App නම",
    "slug": "your-app-slug"
  }
}
```

### App Icon වෙනස් කරන්න
1. 1024x1024 PNG image එකක් සාදන්න
2. `assets/icon.png` ලෙස save කරන්න
3. Rebuild කරන්න

### Package Name වෙනස් කරන්න
`app.json` file එකේ:
```json
{
  "android": {
    "package": "com.yourcompany.yourapp"
  }
}
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Metro bundler error"
```bash
# Cache clear කරන්න
expo start -c
# හෝ
npx expo start --clear
```

### Issue 2: "Build failed on EAS"
```bash
# Dependencies යාවත්කාලීන කරන්න
npm update
npm audit fix

# නැවත try කරන්න
eas build --platform android --profile preview --clear-cache
```

### Issue 3: "App crashes on open"
- `package.json` හි dependencies හරි ද බලන්න
- Node version 16+ ද බලන්න
- npm install නැවත run කරන්න

### Issue 4: "Cannot find module"
```bash
# node_modules delete කරලා නැවත install කරන්න
rm -rf node_modules
npm install
```

---

## 📱 APK Install කරන්නේ කෙසේද?

### Android Phone එකේ:
1. APK file එක phone එකට transfer කරන්න
2. File Manager open කරන්න
3. APK file එක tap කරන්න
4. "Install from unknown sources" enable කරන්න (අවශ්‍ය නම්)
5. Install button click කරන්න
6. Open කරන්න!

---

## 🔧 Build Scripts (package.json එකට add කරන්න)

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "build:preview": "eas build --platform android --profile preview",
    "build:production": "eas build --platform android --profile production",
    "build:apk": "eas build --platform android --profile production --local"
  }
}
```

---

## 📊 Build Profiles (eas.json)

### Preview Profile
- ඉක්මන් build
- පරීක්ෂා කිරීම සඳහා
- Internal distribution

### Production Profile
- Optimized build
- Play Store upload සඳහා සුදුසු
- App signing සමඟ

---

## 🌟 යෙදුම භාවිතා කරන්නේ කෙසේද?

### 1. පළමු පරිශීලකයා සාදන්න
- App open කරන්න
- "පළමු ගිණුම සාදන්න" click කරන්න
- නම, email, phone ඇතුළත් කරන්න
- "සාදන්න" click කරන්න

### 2. බැංකු ගිණුම එක් කරන්න
- "බැංකු" tab එකට යන්න
- "+" button click කරන්න
- බැංකු විස්තර ඇතුළත් කරන්න
- වර්ණයක් තෝරන්න
- "සුරකින්න" click කරන්න

### 3. මුදල් ගිණුම එක් කරන්න
- "මුදල්" tab එකට යන්න
- ගිණුම් නම ඇතුළත් කරන්න (උදා: පුබුන මුදල්, වොලට්)
- ශේෂය ඇතුළත් කරන්න

### 4. කාණ්ඩ සාදන්න
- "කාණ්ඩ" tab එකට යන්න
- නව කාණ්ඩයක් එක් කරන්න
- මාසික ඉලක්කයක් set කරන්න
- Icon එකක් තෝරන්න

### 5. ගනුදෙනු එක් කරන්න
- "+" (Floating button) click කරන්න
- වියදම හෝ ආදායම තෝරන්න
- මුදල සහ විස්තරය ඇතුළත් කරන්න
- කාණ්ඩයක් තෝරන්න (වියදම් සඳහා)
- "සුරකින්න" click කරන්න

### 6. තවත් පරිශීලකයින් එක් කරන්න
- "සැකසුම්" tab එකට යන්න
- "පරිශීලකයා මාරු කරන්න" click කරන්න
- "+" button click කරන්න
- නව පරිශීලක විස්තර ඇතුළත් කරන්න

### 7. පරිශීලක අතර මාරු වන්න
- "සැකසුම්" > "පරිශීලකයා මාරු කරන්න"
- පරිශීලකයෙක් තෝරන්න
- තෝරාගත් පරිශීලකයාගේ දත්ත පමණක් පෙන්වයි

---

## 🎁 Extra Features

### Dark Mode
- "සැකසුම්" > "අඳුරු මාදිලිය" toggle කරන්න
- ස්වයංක්‍රීයව save වේ

### Color Customization
- ගිණුම් සඳහා 16+ preset colors
- Custom color picker
- සෑම ගිණුමකටම අනන්‍ය වර්ණ

### Data Persistence
- සියලුම දත්ත local storage එකේ save වේ
- App close කළාට පසුවත් දත්ත තිබේ
- පරිශීලක අතර දත්ත isolated වේ

---

## 📞 උදව් සහ සහාය

### Build Issues
- Expo Documentation: https://docs.expo.dev/
- EAS Build Docs: https://docs.expo.dev/build/introduction/
- Expo Forums: https://forums.expo.dev/

### React Native Issues
- React Native Docs: https://reactnative.dev/
- Stack Overflow: Search "React Native Expo"

---

## 🚢 Play Store වෙත Upload කරන්න (Optional)

### 1. Google Play Console Account සාදන්න
- https://play.google.com/console
- $25 one-time fee

### 2. AAB Build කරන්න
```bash
# APK වෙනුවට AAB build කරන්න
eas build --platform android --profile production
```

### 3. Play Console Upload කරන්න
- New app create කරන්න
- App details fill කරන්න
- AAB file upload කරන්න
- Content rating complete කරන්න
- Submit for review

---

## ✅ Checklist - Build කිරීමට පෙර

- [ ] Node.js ස්ථාපිත ද?
- [ ] Expo CLI ස්ථාපිත ද?
- [ ] Expo ගිණුමක් තිබේ ද?
- [ ] npm install run කළා ද?
- [ ] app.json customize කළා ද?
- [ ] Assets (icon, splash) එක් කළා ද?
- [ ] eas.json configure කළා ද?

---

## 🎉 සාර්ථකව Build කළ පසු

1. ✅ APK file download වනු ඇත
2. 📱 Phone එකට transfer කරන්න
3. 🔧 Install කරන්න
4. 🎊 App භාවිතා කිරීම ආරම්භ කරන්න!

---

## 📝 සටහන්

- **Build time:** සාමාන්‍යයෙන් 10-20 minutes
- **File size:** ~30-50 MB (APK)
- **Min Android Version:** Android 5.0 (API 21+)
- **Target Android Version:** Android 13 (API 33)

---

## 🔮 Future Enhancements

- [ ] Cloud backup integration
- [ ] Biometric authentication
- [ ] Data export (PDF, CSV)
- [ ] Recurring transactions
- [ ] Bill reminders
- [ ] Multi-currency support
- [ ] Charts and analytics
- [ ] Shared accounts (family)

---

**Developed with ❤️ for Sinhala Users**

සිංහල භාෂාවෙන් මුදල් කළමනාකරණය ඉතා පහසුව!

🇱🇰 **Made in Sri Lanka**
