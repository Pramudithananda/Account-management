# Assets Folder

මෙම folder එකේ යෙදුමේ images, icons සහ splash screens තබන්න.

Place your app's images, icons, and splash screens in this folder.

## Required Assets / අවශ්‍ය Assets

### 1. icon.png
- Size: 1024x1024 px
- Format: PNG
- Use: App icon (all platforms)
- යෙදුමේ ප්‍රධාන icon එක

### 2. splash.png
- Size: 1284x2778 px (or similar ratio)
- Format: PNG
- Use: Splash screen when app starts
- යෙදුම ආරම්භ වන විට පෙන්වන screen එක

### 3. adaptive-icon.png
- Size: 1024x1024 px
- Format: PNG
- Use: Android adaptive icon
- Android සඳහා විශේෂ icon එක

### 4. favicon.png (Optional / අත්‍යවශ්‍ය නොවේ)
- Size: 48x48 px
- Format: PNG
- Use: Web version icon

## Creating Icons / Icons සෑදීම

### Option 1: Use Online Tools

1. **Icon Generator:**
   - Visit: https://www.appicon.co/
   - Upload your logo/image
   - Generate all required sizes
   - Download and extract to this folder

2. **Expo Icon Generator:**
   - Visit: https://icon.kitchen/
   - Design your icon
   - Download for Expo

### Option 2: Use Figma/Photoshop

1. Create a 1024x1024 canvas
2. Design your app icon
3. Export as PNG
4. Save as icon.png

### Option 3: Use Placeholder (For Testing)

For quick testing, you can use solid color placeholders:

```bash
# Create simple colored placeholder (requires ImageMagick)
convert -size 1024x1024 xc:#6366f1 icon.png
convert -size 1284x2778 xc:#1e1b4b splash.png
convert -size 1024x1024 xc:#6366f1 adaptive-icon.png
```

## Current Status / වර්තමාන තත්ත්වය

```
assets/
├── icon.png            ❌ Not created yet
├── splash.png          ❌ Not created yet
├── adaptive-icon.png   ❌ Not created yet
└── favicon.png         ❌ Optional
```

## Design Guidelines / නිර්මාණ මාර්ගෝපදේශ

### Icon Design:
- ✅ Simple and recognizable
- ✅ Works well at small sizes
- ✅ Clear on all backgrounds
- ✅ Represents "Account Management"
- ❌ Avoid too much text
- ❌ Avoid complex details

### Suggested Icon Ideas:
- 💰 Wallet icon
- 🏦 Bank building
- 📊 Chart/Graph
- 💳 Card icon
- 📱 Phone with money
- සිංහල "ගි" letter stylized

### Colors:
- Primary: #6366f1 (Indigo)
- Secondary: #1e1b4b (Dark Blue)
- Accent: #10b981 (Green)
- Background: #1e1b4b

## After Adding Assets / Assets එකතු කළ පසු

1. Update the status above
2. Test the app:
   ```bash
   npm start
   ```
3. Build APK:
   ```bash
   ./build-apk.sh
   ```

## Need Help? / උදවු අවශ්‍යද?

- Check Expo documentation: https://docs.expo.dev/guides/app-icons/
- Ask in Expo forums: https://forums.expo.dev/
- Or use AI image generators to create icons

---

**Note:** Expo will use default icons if these files are missing, but custom icons are recommended for a professional look.

**සටහන:** මෙම files නොමැති නම් Expo default icons භාවිතා කරයි, නමුත් professional look එකක් සඳහා custom icons නිර්දේශ කෙරේ.
