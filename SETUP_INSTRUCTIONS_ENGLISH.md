# 🚀 Setup & Build Instructions (English)

## Multi-Account React Native Expense Tracker

### Features
- ✅ Multiple user profiles on single device
- ✅ Bank account management with colors
- ✅ Cash account management
- ✅ Budget categories with progress tracking
- ✅ Transaction history
- ✅ Dark/Light mode
- ✅ Data persistence per user

---

## Quick Build (Fastest Method)

### Requirements
1. **Node.js 16+** - Download from https://nodejs.org/
2. **Expo Account** - Free signup at https://expo.dev/

### Steps

#### 1. Install Dependencies
```bash
cd /workspace
npm install
```

#### 2. Install Build Tools
```bash
npm install -g expo-cli eas-cli
```

#### 3. Login to Expo
```bash
eas login
```
Enter your Expo email and password.

#### 4. Build APK
```bash
# Fast preview build (10-15 min)
npm run build:preview

# Production build (15-20 min)
npm run build:production
```

#### 5. Download APK
- Wait for build to complete
- Copy the download link from terminal
- Open in browser
- Click "Download APK"
- Transfer to Android phone
- Install and enjoy!

---

## Test Before Building

### Using Expo Go (No Build Required)
```bash
# Start development server
npm start

# Install Expo Go app on phone
# Scan QR code
# App runs instantly!
```

---

## Build Profiles

### Preview (Recommended for Testing)
- Fast build time
- Internal distribution
- Good for testing

### Production (For Distribution)
- Optimized build
- Smaller file size
- Play Store ready

---

## Commands Reference

```bash
# Development
npm start                    # Start dev server
npm run android             # Run on Android emulator
npm run clear-cache         # Clear Metro cache

# Building
npm run build:preview       # Fast build for testing
npm run build:production    # Optimized production build
npm run build:local         # Build locally (advanced)
```

---

## Customization

### Change App Name
Edit `app.json`:
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug"
  }
}
```

### Change Package Name
Edit `app.json`:
```json
{
  "android": {
    "package": "com.yourcompany.yourapp"
  }
}
```

### Add App Icon
1. Create 1024x1024 PNG image
2. Save as `assets/icon.png`
3. Rebuild app

---

## Troubleshooting

### Build Failed
```bash
# Clear cache and retry
npm run build:preview --clear-cache

# Update dependencies
npm update
npm audit fix
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### expo/eas command not found
```bash
npm install -g expo-cli eas-cli
```

---

## App Usage

### First Time Setup
1. Open app
2. Create first user profile
3. Add bank/cash accounts
4. Create budget categories
5. Start tracking expenses!

### Multiple Users
1. Go to Settings
2. Tap "Switch User"
3. Tap "+" to add new user
4. Create new profile
5. Each user has separate data!

### Features
- **Dashboard**: Overview of all accounts
- **Bank**: Manage bank accounts with custom colors
- **Cash**: Manage cash accounts (wallet, pocket, etc.)
- **Categories**: Budget tracking with progress bars
- **Settings**: User management, dark mode, stats

---

## File Structure

```
/workspace/
├── src/
│   ├── contexts/
│   │   └── UserProfileContext.js    # Multi-user management
│   ├── screens/
│   │   ├── UserSelectionScreen.js   # User switcher
│   │   ├── DashboardScreen.js
│   │   ├── BankAccountsScreen.js
│   │   ├── CashAccountsScreen.js
│   │   ├── CategoriesScreen.js
│   │   ├── SettingsScreen.js
│   │   └── AddTransactionScreen.js
│   └── components/
├── assets/
├── App.js                            # Entry point
├── app.json                          # Expo config
├── eas.json                          # Build config
└── package.json
```

---

## Tech Stack

- **Framework**: React Native (Expo 49)
- **Navigation**: React Navigation v6
- **Storage**: AsyncStorage (local)
- **Icons**: MaterialCommunityIcons
- **State**: React Context API
- **Language**: Sinhala UI

---

## Publishing to Play Store

### 1. Build AAB (Required for Play Store)
```bash
eas build --platform android --profile production
```

### 2. Create Play Console Account
- Go to https://play.google.com/console
- Pay $25 one-time fee

### 3. Upload to Play Store
- Create new app
- Fill app details
- Upload AAB file
- Submit for review

---

## Future Enhancements

- [ ] Cloud backup
- [ ] Biometric authentication
- [ ] PDF/CSV export
- [ ] Recurring transactions
- [ ] Bill reminders
- [ ] Charts & analytics
- [ ] Family sharing

---

## Support

- **Documentation**: See `BUILD_APK_INSTRUCTIONS.md` for detailed guide
- **Issues**: Create GitHub issue
- **Expo Docs**: https://docs.expo.dev/
- **React Native**: https://reactnative.dev/

---

## License

MIT License - Free to use and modify!

---

**Made with ❤️ for Sinhala Community**

🇱🇰 Developed in Sri Lanka
