# ඉක්මන් ආරම්භය - Quick Start Guide

## 📱 APK File එක ලබා ගන්න

### ක්‍රමය 1: Cloud Build (ඉක්මනින් සහ පහසුවෙන්) ⭐ Recommended

#### පියවර:

1. **Terminal/Command Prompt විවෘත කරන්න**

2. **ව්‍යාපෘතියට යන්න:**
```bash
cd /workspace
```

3. **Build Script එක ධාවනය කරන්න:**

**Windows:**
```bash
npm run build:preview
```

**Linux/Mac:**
```bash
./build-apk.sh
```
හෝ
```bash
bash build-apk.sh
```

4. **Expo Account එකට Login වන්න:**
   - නොමැති නම් https://expo.dev/ වෙත ගොස් නොමිලේ ගිණුමක් සාදන්න
   - Terminal එකේ email සහ password ඇතුළත් කරන්න

5. **Build වෙන තෙක් රැඳී සිටින්න:**
   - මිනිත්තු 10-20ක් පමණ ගතවේ
   - Terminal එකේ progress පෙන්වයි

6. **APK Download කරන්න:**
   - Build complete වූ පසු, terminal එකේ link එකක් පෙන්වයි
   - ඒ link එක click කරලා APK file එක download කරන්න
   
   **හෝ** Website එකෙන්:
   - https://expo.dev/ වෙත යන්න
   - "Projects" click කරන්න
   - ඔබේ project එක select කරන්න
   - "Builds" tab එක click කරන්න
   - Latest build එකේ "Download" click කරන්න

---

### ක්‍රමය 2: සම්පූර්ණ Manual Process

#### A. EAS CLI Install කරන්න:
```bash
npm install -g eas-cli
```

#### B. Login වන්න:
```bash
eas login
```

#### C. Build කරන්න:
```bash
cd /workspace
eas build --platform android --profile preview
```

#### D. Download කරන්න:
Build complete වූ පසු terminal එකේ ලැබෙන link එකෙන්

---

## 📲 APK Install කරන්නේ කෙසේද

### Android Phone එකේ:

1. **Settings විවෘත කරන්න**

2. **Security/Privacy වෙත යන්න**

3. **Unknown Sources Enable කරන්න:**
   - "Install unknown apps" හොයන්න
   - ඔබ භාවිතා කරන browser/file manager enable කරන්න

4. **APK File එක Phone එකට Transfer කරන්න:**
   
   **Option 1 - USB Cable:**
   - Phone එක computer එකට connect කරන්න
   - APK file එක phone storage එකට copy කරන්න
   
   **Option 2 - Cloud:**
   - APK file එක Google Drive/Dropbox එකකට upload කරන්න
   - Phone එකෙන් download කරන්න
   
   **Option 3 - Email:**
   - APK file එක email එකකට attach කරන්න
   - Phone එකෙන් email එක open කරලා download කරන්න

5. **Install කරන්න:**
   - File Manager විවෘත කරන්න
   - Downloads folder එක විවෘත කරන්න
   - APK file එක tap කරන්න
   - "Install" click කරන්න
   - Install complete වූ පසු "Open" click කරන්න

---

## ✨ යෙදුම භාවිතා කරන්නේ කෙසේද

### පළමු වතාවට:

1. **යෙදුම විවෘත කරන්න**

2. **Default User වශයෙන් "පරිශීලකයා 1" ලෙස login වේ**

3. **Settings වෙත ගොස් ඔබේ නම වෙනස් කරන්න:**
   - පහළින් "සැකසුම්" (Settings) tab එක click කරන්න
   - "නව ගිණුමක් එක් කරන්න" click කරන්න
   - ඔබේ නම ඇතුළත් කරන්න
   - "එක් කරන්න" click කරන්න
   - "ගිණුම මාරු කරන්න" click කරලා ඔබේ ගිණුම select කරන්න

### ගිණුම් එක් කරන්න:

1. **බැංකු ගිණුම:**
   - "බැංකු" tab එක click කරන්න
   - + Button එක click කරන්න
   - බැංකු නම, ගිණුම් අංකය, ශේෂය ඇතුළත් කරන්න
   - වර්ණය තෝරන්න
   - "සුරකින්න" click කරන්න

2. **මුදල් ගිණුම:**
   - "මුදල්" tab එක click කරන්න
   - + Button එක click කරන්න
   - ගිණුම් නම (උදා: පුබුන මුදල්, වොලට්)
   - ශේෂය ඇතුළත් කරන්න
   - වර්ණය තෝරන්න
   - "සුරකින්න" click කරන්න

### ගනුදෙනු Add කරන්න:

1. **Dashboard වෙත යන්න**

2. **පහළ දකුණු කෙළවරේ + Button එක click කරන්න**

3. **ගනුදෙනු විස්තර ඇතුළත් කරන්න:**
   - වර්ගය (වියදම/ආදායම)
   - විස්තරය
   - මුදල
   - දිනය
   - කාණ්ඩය (අනිවාර්ය නොවේ)

4. **"ගනුදෙනුව සුරකින්න" click කරන්න**

### කාණ්ඩ කළමනාකරණය:

1. **"කාණ්ඩ" tab එක click කරන්න**

2. **+ Button එක click කරන්න**

3. **කාණ්ඩ විස්තර ඇතුළත් කරන්න:**
   - කාණ්ඩයේ නම (උදා: කෑම, ප්‍රවාහන)
   - ඉලක්ක මුදල (මාසික අයවැය)
   - වැය කළ මුදල

4. **"සුරකින්න" click කරන්න**

### බහු පරිශීලකයන්:

1. **Settings වෙත යන්න**

2. **"නව ගිණුමක් එක් කරන්න" click කරන්න**

3. **නව පරිශීලකයාගේ නම ඇතුළත් කරන්න**

4. **"ගිණුම මාරු කරන්න" භාවිතයෙන් පරිශීලකයින් අතර මාරු වන්න**

---

## 🔧 ගැටළු විසඳීම

### Build Fails

**Problem:** "No Project ID" error
**විසඳුම:**
```bash
eas build:configure
```

**Problem:** Build එක fail වේ
**විසඳුම:**
1. Internet connection check කරන්න
2. Expo account එකට properly login වී ඇතිදැයි check කරන්න
3. නැවත try කරන්න

### APK Install නොවේ

**Problem:** "App not installed" error
**විසඳුම:**
1. Phone එකේ storage space check කරන්න
2. Previous version එකක් තිබේ නම් එය uninstall කරන්න
3. Unknown sources properly enable කර ඇතිදැයි check කරන්න
4. Phone එක restart කරලා නැවත try කරන්න

### යෙදුම Crash වේ

**විසඳුම:**
1. යෙදුම close කරන්න
2. යෙදුම clear cache කරන්න:
   - Settings -> Apps -> Expense Tracker -> Storage -> Clear Cache
3. නැවත open කරන්න

---

## 📞 සහාය

### ලේඛන:
- README.md - ප්‍රධාන ලේඛනය
- BUILD_INSTRUCTIONS.md - විස්තරාත්මක build උපදෙස්
- QUICKSTART_SINHALA.md - මෙම ගොනුව

### Online සහාය:
- Expo Docs: https://docs.expo.dev/
- React Native Docs: https://reactnative.dev/
- Expo Forums: https://forums.expo.dev/

### ගැටළු Report කරන්න:
GitHub Issues භාවිතා කරන්න

---

## 💡 Tips

1. **Regular Backups:**
   - ඔබේ දත්ත phone එකේ පමණක් save වේ
   - Important data export කරන්න

2. **Multiple Users:**
   - පවුලේ සෑම කෙනෙකුටම වෙනම profile එකක් සාදන්න
   - එක් device එකෙන් සියල්ලන්ගේ accounts manage කරන්න

3. **Categories:**
   - මාසික budget සඳහා categories භාවිතා කරන්න
   - අයවැය ඉක්මවා යන තැන් track කරන්න

4. **Colors:**
   - විවිධ accounts සඳහා විවිධ colors භාවිතා කරන්න
   - ඉක්මනින් identify කිරීමට පහසු වේ

---

## 🎉 සාර්ථකව Install කළා!

දැන් ඔබට:
- ✅ බහු පරිශීලක accounts manage කළ හැක
- ✅ බැංකු සහ මුදල් accounts track කළ හැක
- ✅ ආදායම් සහ වියදම් record කළ හැක
- ✅ අයවැය කාණ්ඩ manage කළ හැක
- ✅ සම්පූර්ණයෙන්ම සිංහලෙන් භාවිතා කළ හැක

**සතුටින් භාවිතා කරන්න! 🎊**
