# APK Build Instructions (සිංහල)

## පූර්වාවශ්‍යතා (Prerequisites)

1. **Node.js** ස්ථාපනය කරන්න (v16 හෝ ඉහළ)
2. **Expo CLI** ස්ථාපනය කරන්න:
   ```bash
   npm install -g expo-cli eas-cli
   ```
3. **Expo Account** එකක් සාදන්න: https://expo.dev

## APK Build කිරීම

### Method 1: EAS Build (අනුමත කරන ලද ක්‍රමය)

1. **Dependencies ස්ථාපනය කරන්න:**
   ```bash
   npm install
   ```

2. **Expo Account හා Login වන්න:**
   ```bash
   eas login
   ```

3. **EAS Build Configure කරන්න:**
   ```bash
   eas build:configure
   ```

4. **Android APK Build කරන්න:**
   ```bash
   npm run build:android:apk
   ```
   හෝ
   ```bash
   eas build --platform android --profile production-apk
   ```

5. **Build Status පරීක්ෂා කරන්න:**
   ```bash
   eas build:list
   ```

6. **APK Download කරන්න:**
   - Expo dashboard හරහා: https://expo.dev/accounts/[your-account]/builds
   - Build complete වූ පසු download link එක ලැබෙනු ඇත

### Method 2: Local Build (Local Development)

1. **Android Studio ස්ථාපනය කරන්න**

2. **Android SDK ස්ථාපනය කරන්න**

3. **Prebuild කරන්න:**
   ```bash
   npm run prebuild
   ```

4. **Android Project Build කරන්න:**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

5. **APK File Location:**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

## Development Mode

### Development Server Start කරන්න:
```bash
npm start
```

### Android Emulator හරහා Run කරන්න:
```bash
npm run android
```

## Project Structure

```
/workspace
├── app.js                 # Main App Component
├── app.json              # Expo Configuration
├── babel.config.js       # Babel Configuration
├── eas.json              # EAS Build Configuration
├── package.json          # Dependencies
├── src/
│   └── screens/         # Screen Components
│       ├── DashboardScreen.js
│       ├── BankAccountsScreen.js
│       ├── CashAccountsScreen.js
│       ├── CategoriesScreen.js
│       ├── SettingsScreen.js
│       └── AddTransactionScreen.js
└── assets/              # Images and Icons (create this folder)
    ├── icon.png         # App Icon (1024x1024)
    ├── splash.png       # Splash Screen (1242x2436)
    └── adaptive-icon.png # Android Adaptive Icon (1024x1024)
```

## Features

### Multiple Account Management:
- ✅ Multiple Bank Accounts
- ✅ Multiple Cash Accounts
- ✅ Account Color Coding
- ✅ Account Balance Tracking
- ✅ Transaction Management
- ✅ Category Management
- ✅ Dark Mode Support
- ✅ Sinhala Language Support

## Troubleshooting

### Build Errors:
1. **"expo-build-properties not found"**
   ```bash
   npm install expo-build-properties
   ```

2. **"EAS CLI not found"**
   ```bash
   npm install -g eas-cli
   ```

3. **"Android SDK not found"**
   - Android Studio හරහා Android SDK ස්ථාපනය කරන්න
   - Environment variables set කරන්න

### Runtime Errors:
1. **"Module not found"**
   ```bash
   npm install
   ```

2. **"Vector Icons not showing"**
   ```bash
   npx react-native link react-native-vector-icons
   ```

## Notes

- APK file size: ~25-35 MB (approximate)
- Minimum Android Version: Android 6.0 (API 23)
- Target Android Version: Android 14 (API 34)

## Support

Build process හිදී ගැටලු ඇත්නම්:
1. Expo documentation පරීක්ෂා කරන්න: https://docs.expo.dev
2. EAS Build documentation: https://docs.expo.dev/build/introduction/
