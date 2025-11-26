# 🚀 ඉක්මන් ආරම්භය - සිංහල වියදම් ට්‍රැකර්

## 📱 APK එකක් ඉක්මනින් Build කරන්න

### ක්‍රමය 1️⃣: Expo EAS (ඉතාම පහසුයි! 🌟)

#### පියවර 1: ස්ථාපනය
```bash
# මෙම folder එකට යන්න
cd /workspace

# Node packages install කරන්න
npm install

# Expo CLI install කරන්න (global)
npm install -g expo-cli eas-cli
```

#### පියවර 2: Expo වෙත Login වන්න
```bash
eas login
```
- Email: ඔබගේ Expo email
- Password: ඔබගේ password

**Expo account නැද්ද?** https://expo.dev වෙත ගොස් නොමිලේ සාදන්න!

#### පියවර 3: Build කරන්න
```bash
# පරීක්ෂණ සඳහා (fast - 10-15 minutes)
npm run build:preview

# අවසාන APK (optimized - 15-20 minutes)
npm run build:production
```

#### පියවර 4: APK Download කරන්න
Build එක complete වුණාම:
1. Terminal එකේ link එක copy කරන්න
2. Browser එකෙන් open කරන්න
3. "Download APK" click කරන්න
4. APK file එක ඔබගේ phone එකට transfer කරන්න
5. Install කරන්න! ✅

---

## ⚡ මෙන්න ඒක පේළියට!

### සම්පූර්ණ Setup සිට Build දක්වා
```bash
# 1. Install කරන්න
npm install

# 2. Login වන්න
eas login

# 3. Build කරන්න
npm run build:preview

# Build link එක terminal එකේ දිස්වේවි!
```

---

## 🧪 Build කිරීමට පෙර පරීක්ෂා කරන්න

### Expo Go App එකෙන්
```bash
# Development server start කරන්න
npm start

# Phone එකේ Expo Go app open කරන්න
# QR code එක scan කරන්න
# App එක run වේවි!
```

ඔබට app එක කැමති නම් පමණක් build කරන්න 👍

---

## 🎯 අවශ්‍ය දේවල්

### ස්ථාපිත විය යුතු:
- ✅ Node.js (16+) - https://nodejs.org/
- ✅ npm හෝ yarn
- ✅ Expo account - https://expo.dev/

### පරීක්ෂා කරන්න:
```bash
node --version    # v16.0.0 හෝ ඉහළ විය යුතුය
npm --version
```

---

## 🔥 Common Commands

```bash
# App run කරන්න (development)
npm start

# Cache clear කරන්න
npm run clear-cache

# Preview build (fast)
npm run build:preview

# Production build (optimized)
npm run build:production

# Local build (advanced)
npm run build:local
```

---

## 📱 APK Install කරන්නේ කෙසේද?

### Android Phone එකේ:
1. 📥 APK file download කරන්න
2. 📁 File Manager open කරන්න
3. 📲 APK file tap කරන්න
4. ⚙️ "Install unknown apps" allow කරන්න (settings එකේ)
5. ✅ Install click කරන්න
6. 🎉 Open කරලා භාවිතා කරන්න!

---

## 💡 Pro Tips

### Tip 1: වේගවත් Build
- Preview profile use කරන්න පරීක්ෂා කිරීම සඳහා
- Production profile play store upload සඳහා

### Tip 2: Build Status බලන්න
```
https://expo.dev
```
Login වන්න > Projects > ඔබේ build බලන්න

### Tip 3: Build Failed නම්
```bash
# Cache clear කරන්න
npm run clear-cache

# node_modules නැවත install
rm -rf node_modules
npm install

# නැවත try කරන්න
npm run build:preview
```

---

## 🎨 App Customize කරන්න

### App නම වෙනස් කරන්න
`app.json` file එකේ:
```json
"name": "ඔබගේ App නම"
```

### App Icon එක්  කරන්න
1. 1024x1024 PNG image එකක් සාදන්න
2. `assets/icon.png` ලෙස save කරන්න
3. Rebuild කරන්න

---

## ❓ Issues?

### "expo: command not found"
```bash
npm install -g expo-cli
```

### "eas: command not found"
```bash
npm install -g eas-cli
```

### "Login failed"
- Email verify කළා ද බලන්න
- Password reset කරන්න expo.dev වෙතින්

### "Build failed"
```bash
# Dependencies update කරන්න
npm update

# නැවත try කරන්න
npm run build:preview --clear-cache
```

---

## 🎊 Build සාර්ථකයි!

ඔබට දැන් තිබේ:
- ✅ Working APK file එකක්
- ✅ බහු පරිශීලක support
- ✅ සම්පූර්ණ expense tracking
- ✅ Sinhala interface

---

## 📖 වැඩි විස්තර සඳහා

විස්තරාත්මක උපදෙස්: [`BUILD_APK_INSTRUCTIONS.md`](./BUILD_APK_INSTRUCTIONS.md)

---

**ප්‍රශ්න තිබේ ද?** GitHub issue එකක් create කරන්න!

**සාර්ථකව build කළා නම්** ⭐ star එකක් දෙන්න repo එකට!

---

🇱🇰 **Made with ❤️ for Sri Lankan Community**
