# Sinhala Expense Tracker - බහු ගිණුම් කළමනාකරණ යෙදුම

සිංහල භාෂාවෙන් නිර්මාණය කළ පූර්ණ විශේෂාංග සහිත වියදම් නිරීක්ෂණ යෙදුමකි. බහු පරිශීලක ගිණුම් සහාය සහ සම්පූර්ණ ගිණුම් කළමනාකරණය.

## ප්‍රධාන විශේෂාංග

### 🎯 බහු පරිශීලක සහාය
- එක් උපාංගයකින් බහු පරිශීලක ගිණුම් කළමනාකරණය කරන්න
- පරිශීලකයින් අතර ඉක්මනින් මාරු වන්න
- සෑම පරිශීලකයෙකුටම වෙන වෙනම දත්ත ගබඩාව

### 💰 ගිණුම් කළමනාකරණය
- බැංකු ගිණුම් කළමනාකරණය
- මුදල් ගිණුම් කළමනාකරණය
- අභිරුචි වර්ණ සහිත ගිණුම් සංවිධානය

### 📊 වියදම් නිරීක්ෂණය
- ආදායම් සහ වියදම් නිරීක්ෂණය
- කාණ්ඩ අනුව අයවැය කළමනාකරණය
- සංඛ්‍යාන සහ වාර්තා

### 🎨 පරිශීලක අත්දැකීම
- අඳුරු සහ දීප්ත මාදිලි
- සම්පූර්ණයෙන්ම සිංහල භාෂා සහාය
- ආකර්ෂණීය සහ භාවිතා කිරීමට පහසු UI

## ස්ථාපනය

### අවශ්‍යතා
- Node.js (v14 හෝ ඊට වැඩි)
- Expo CLI
- Android Studio (Android සඳහා)

### පියවර

1. Repository එක clone කරන්න:
```bash
git clone <repository-url>
cd workspace
```

2. Dependencies ස්ථාපනය කරන්න:
```bash
npm install
```

3. යෙදුම ධාවනය කරන්න:
```bash
npm start
```

## APK සාදන්නේ කෙසේද

### EAS Build භාවිතයෙන්

1. EAS CLI ස්ථාපනය කරන්න:
```bash
npm install -g eas-cli
```

2. Expo ගිණුමකට login වන්න:
```bash
eas login
```

3. ව්‍යාපෘතිය configure කරන්න:
```bash
eas build:configure
```

4. APK සාදන්න:
```bash
eas build --platform android --profile preview
```

### Local Build (Expo Go නොමැතිව)

```bash
expo build:android -t apk
```

## තිර රූප

- Dashboard - සියලු ගිණුම් සංග්‍රහය
- ගිණුම් කළමනාකරණය - බැංකු සහ මුදල් ගිණුම්
- කාණ්ඩ - වියදම් කාණ්ඩ නිරීක්ෂණය
- සැකසුම් - බහු පරිශීලක කළමනාකරණය

## තාක්ෂණික තොරතුරු

- **Framework**: React Native (Expo)
- **Navigation**: React Navigation
- **State Management**: Context API
- **Storage**: AsyncStorage
- **Icons**: MaterialCommunityIcons
- **UI Components**: Custom components

## සංවර්ධකයින් සඳහා

### ව්‍යාපෘති ව්‍යුහය

```
/workspace
  /src
    /screens        # සියලු තිර සංරචක
    /contexts       # Context providers (AppContext)
    /components     # නැවත භාවිතා කළ හැකි සංරචක
  /assets          # රූප සහ අක්ෂර
  App.js           # ප්‍රධාන යෙදුම් සංරචකය
  app.json         # Expo වින්‍යාසය
  eas.json         # EAS Build වින්‍යාසය
```

### දායක වීම

1. Repository එක fork කරන්න
2. Feature branch එකක් සාදන්න
3. වෙනස්කම් commit කරන්න
4. Branch එක push කරන්න
5. Pull Request එකක් විවෘත කරන්න

## බලපත්‍රය

MIT License

## සහාය

ගැටළු හෝ ප්‍රශ්න සඳහා GitHub Issues භාවිතා කරන්න.

---

**නිර්මාණය කර ඇත්තේ ❤️ සමඟින් React Native සහ Expo භාවිතයෙන්**
