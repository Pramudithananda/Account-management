# ගිණුම් කළමනාකරණය - Multiple Account Management App

React Native සහ Expo භාවිතා කරමින් සාදන ලද බහු ගිණුම් කළමනාකරණ යෙදුමකි. මෙම යෙදුම ඔබට බහු බැංකු ගිණුම් සහ මුදල් ගිණුම් කළමනාකරණය කිරීමට උපකාරී වේ.

## Features (විශේෂාංග)

### Multiple Account Management
- ✅ **බහු බැංකු ගිණුම්** - අසීමිත බැංකු ගිණුම් එක් කර කළමනාකරණය කරන්න
- ✅ **බහු මුදල් ගිණුම්** - විවිධ මුදල් ගිණුම් (පුබුන, වොලට්, ආදිය) කළමනාකරණය
- ✅ **වර්ණ කේතනය** - සෑම ගිණුමක්ම විවිධ වර්ණවලින් හඳුනාගන්න
- ✅ **ශේෂය ලුහුබැඳීම** - සෑම ගිණුමකම ශේෂය ස්වයංක්‍රීයව යාවත්කාලීන වේ

### Transaction Management
- ✅ **ගනුදෙනු එක් කිරීම** - ආදායම් සහ වියදම් එක් කරන්න
- ✅ **ගිණුම් අතර මාරුව** - ගිණුම් අතර මුදල් මාරු කරන්න
- ✅ **ගනුදෙනු ඉතිහාසය** - සියලු ගනුදෙනු ඉතිහාසය බලන්න

### Category Management
- ✅ **කාණ්ඩ කළමනාකරණය** - වියදම් කාණ්ඩ නිර්මාණය කර කළමනාකරණය
- ✅ **ඉලක්ක සැකසීම** - සෑම කාණ්ඩයකටම ඉලක්කයක් සැකසීම
- ✅ **ප්‍රගතිය ලුහුබැඳීම** - කාණ්ඩ අනුව වියදම් ප්‍රගතිය බලන්න

### User Experience
- ✅ **අඳුරු ප්‍රකාරය** - Dark mode සහාය
- ✅ **සිංහල භාෂාව** - සම්පූර්ණ සිංහල භාෂා සහාය
- ✅ **අලංකාර UI** - නවීන සහ භාවිතා කිරීමට පහසු අතුරු මුහුණත

## Installation (ස්ථාපනය)

### Prerequisites
- Node.js (v16 හෝ ඉහළ)
- npm හෝ yarn
- Expo CLI

### Steps

1. **Dependencies ස්ථාපනය:**
   ```bash
   npm install
   ```

2. **Development Server Start කරන්න:**
   ```bash
   npm start
   ```

3. **Android Emulator හරහා Run කරන්න:**
   ```bash
   npm run android
   ```

## APK Build කිරීම

APK file එක build කිරීම සඳහා `BUILD_INSTRUCTIONS.md` file එක බලන්න.

### Quick Build:
```bash
# EAS Build (Recommended)
npm run build:android:apk
```

## Project Structure

```
/workspace
├── app.js                      # Main App Component
├── app.json                    # Expo Configuration
├── babel.config.js             # Babel Configuration
├── eas.json                    # EAS Build Configuration
├── package.json                # Dependencies
├── BUILD_INSTRUCTIONS.md       # Detailed Build Instructions
├── src/
│   └── screens/
│       ├── DashboardScreen.js      # Main Dashboard
│       ├── BankAccountsScreen.js   # Bank Accounts Management
│       ├── CashAccountsScreen.js   # Cash Accounts Management
│       ├── CategoriesScreen.js     # Category Management
│       ├── SettingsScreen.js       # App Settings
│       └── AddTransactionScreen.js # Add Transactions
└── assets/                     # Images and Icons
```

## Usage (භාවිතා කිරීම)

### 1. ගිණුම් එක් කිරීම
- **බැංකු ගිණුම්:** "බැංකු" tab එකට ගොස් "+" button එක ඔබන්න
- **මුදල් ගිණුම්:** "මුදල්" tab එකට ගොස් "+" button එක ඔබන්න

### 2. ගනුදෙනු එක් කිරීම
- Dashboard හි "+" button එක ඔබන්න
- ගනුදෙනුවේ විස්තර, මුදල, වර්ගය (ආදායම/වියදම) ඇතුළත් කරන්න
- ගිණුම තෝරන්න

### 3. කාණ්ඩ කළමනාකරණය
- "කාණ්ඩ" tab එකට ගොස් නව කාණ්ඩයක් එක් කරන්න
- ඉලක්කය සැකසීමෙන් වියදම් ප්‍රගතිය ලුහුබැඳීම

## Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **AsyncStorage** - Local data storage
- **React Native Vector Icons** - Icons
- **React Native Color Picker** - Color selection

## License

Private project - All rights reserved

## Support

ගැටලු හෝ ප්‍රශ්න සඳහා, build instructions file එක බලන්න.
