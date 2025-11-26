# ඉක්මන් ආරම්භය / Quick Start Guide

## 🎯 APK එකක් ඉක්මනින් සෑදීම / Building APK Quickly

### විකල්පය 1: Automated Script භාවිතා කරන්න (නිර්දේශිත)

```bash
# Build script එක run කරන්න
./build-apk.sh
```

Script එක automatically:
- EAS CLI check කරයි
- Login status පරීක්ෂා කරයි
- Build options පෙන්වයි
- APK build කරයි

### විකල්පය 2: Manual Commands

```bash
# 1. Dependencies ස්ථාපනය
npm install

# 2. EAS CLI ස්ථාපනය (global)
npm install -g eas-cli

# 3. Expo account එකට login
eas login

# 4. Build configure කරන්න (first time only)
eas build:configure

# 5. APK build කරන්න
eas build --platform android --profile preview
```

---

## 📱 APK Download කරගන්න

Build සම්පූර්ණ වූ පසු:

1. **Email පරීක්ෂා කරන්න**
   - Build complete email එක එයි
   - Download link එක click කරන්න

2. **EAS Dashboard**
   - https://expo.dev වෙත යන්න
   - Your account > Projects > sinhala-account-manager
   - Builds tab එකට යන්න
   - Latest build එක download කරන්න

3. **QR Code**
   - Build complete වූ පසු QR code එකක් ලැබේ
   - Mobile phone එකෙන් scan කරන්න
   - Direct download

---

## 🔧 පළමු වතාවට ස්ථාපනය / First Time Setup

```bash
# Repository clone කරන්න
git clone <repository-url>
cd account-management

# Dependencies install කරන්න
npm install

# Development server start කරන්න
npm start
```

---

## 🚀 Development Commands

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS (Mac only)
npm run ios

# Run on Web
npm run web

# Clear cache
npm start -- --clear
```

---

## 📦 Build Profiles

### Preview Build (නිර්දේශිත - Testing සඳහා)
```bash
eas build --platform android --profile preview
```
- ඉක්මනින් build වේ
- Testing සඳහා සුදුසුයි
- APK format
- ~50MB size

### Production Build (Release සඳහා)
```bash
eas build --platform android --profile production
```
- Optimized build
- Play Store upload සඳහා සුදුසුයි
- Smaller size
- Better performance

---

## 🐛 Common Issues / සාමාන්‍ය ගැටළු

### 1. EAS Login ගැටළු

```bash
# Logout සහ නැවත login
eas logout
eas login
```

### 2. Build Failed

```bash
# Dependencies නැවත install කරන්න
rm -rf node_modules
npm install

# Cache clear කරන්න
npm start -- --clear
```

### 3. "Project not found" Error

```bash
# EAS configure කරන්න
eas build:configure
```

---

## 📲 APK Install කරන්න

### Method 1: USB Cable
1. APK file එක download කරන්න
2. USB cable භාවිතා කර phone එකට copy කරන්න
3. File manager විවෘත කරන්න
4. APK file එක tap කරන්න
5. Install කරන්න

### Method 2: Direct Download (Phone එකෙන්)
1. Download link එක phone browser එකෙන් open කරන්න
2. APK file එක download කරන්න
3. Downloads folder එකට යන්න
4. APK file එක tap කරන්න
5. "Install from unknown sources" allow කරන්න
6. Install කරන්න

---

## ⚡ Quick Tips

### විකාශන සඳහා / For Testing:
```bash
./build-apk.sh
# Then select option 1 (Preview Build)
```

### නිෂ්පාදනය සඳහා / For Release:
```bash
./build-apk.sh
# Then select option 2 (Production Build)
```

### Build Status පරීක්ෂා කරන්න:
- Visit: https://expo.dev/accounts/[your-account]/projects
- හෝ email එක check කරන්න

---

## 🎯 Build Time

- Preview Build: ~10-15 minutes
- Production Build: ~15-20 minutes
- Development Build: ~10-15 minutes

**Note:** First build එක වැඩි කාලයක් ගත විය හැක.

---

## 📞 Help

විස්තරාත්මක instructions සඳහා:
- [BUILD_INSTRUCTIONS.md](./BUILD_INSTRUCTIONS.md) - සම්පූර්ණ build guide
- [README.md](./README.md) - Project documentation

---

## ✅ Checklist

Build කිරීමට පෙර:

- [ ] Node.js installed (v16+)
- [ ] npm හෝ yarn installed
- [ ] Expo account created
- [ ] EAS CLI installed
- [ ] Logged in to EAS
- [ ] `npm install` completed

Build කිරීමෙන් පසු:

- [ ] Build email received
- [ ] APK downloaded
- [ ] Tested on Android device
- [ ] App works correctly

---

**සුභ පැතුම්! Good luck with your build! 🚀**
