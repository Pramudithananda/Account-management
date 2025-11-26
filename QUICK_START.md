# 🚀 Quick Start Guide - ඉක්මන් ආරම්භක මාර්ගෝපදේශය

## මිනිත්තු 5 කින් APK එකක් සාදන්න!

### Step 1: පූර්ව සූදානම (Prerequisites)
```bash
# Node.js installed ද? පරීක්ෂා කරන්න
node --version

# නැත්නම් Node.js download කරන්න: https://nodejs.org/
```

### Step 2: Dependencies Install කරන්න
```bash
cd /workspace
npm install
```

### Step 3: Expo CLI Install කරන්න
```bash
npm install -g expo-cli eas-cli
```

### Step 4: Expo Account එකක් සාදා Login වන්න
```bash
# https://expo.dev/ වෙත ගොස් account එකක් සාදන්න
eas login
```

### Step 5: APK Build කරන්න
```bash
# Preview APK (පරීක්ෂණ සඳහා - ඉක්මන්)
eas build --platform android --profile preview

# හෝ Production APK (බෙදාහැරීම සඳහා)
eas build --platform android --profile production
```

### Step 6: Download කරන්න
Build එක සම්පූර්ණ වූ පසු terminal එකේ link එක click කරන්න හෝ:
1. https://expo.dev වෙත යන්න
2. ඔබේ project තෝරන්න
3. "Builds" tab එකේ APK download කරන්න

## 📱 පරීක්ෂා කිරීම (Quick Test)

Development mode එකේ පරීක්ෂා කරන්න:
```bash
# Start development server
npm start

# QR code එක Expo Go app එකෙන් scan කරන්න
# හෝ 'a' press කරලා Android emulator එකේ open කරන්න
```

## ⚡ වේගවත් Build (Alternative)

EAS build slow නම්, Classic build භාවිතා කරන්න:
```bash
expo build:android -t apk
```

## 🎯 යෙදුම භාවිතය

1. **ප්‍රොෆයිලයක් සාදන්න**: පළමු වතාවට open කරන විට
2. **ගිණුමක් එකතු කරන්න**: බැංකු හෝ මුදල් tab එකෙන්
3. **ගනුදෙනුවක් එකතු කරන්න**: Dashboard එකේ + button එක click කරන්න

## 🔥 Common Issues

### Build fails?
```bash
# Cache clear කරන්න
npm start --reset-cache

# හෝ dependencies නැවත install කරන්න
rm -rf node_modules
npm install
```

### APK install වේද?
- Settings > Security > "Unknown sources" enable කරන්න
- හෝ Settings > Apps > Special Access > Install unknown apps

## 📚 වැඩි විස්තර

- සම්පූර්ණ build උපදෙස්: [BUILD_INSTRUCTIONS.md](BUILD_INSTRUCTIONS.md)
- යෙදුම විශේෂාංග: [README.md](README.md)

---

**සටහන**: Build ක්‍රියාවලිය මිනිත්තු 10-20 ක් පමණ ගත විය හැක (internet speed අනුව).
