# යෙදුම් විශේෂාංග - App Features

## 🌟 ප්‍රධාන විශේෂාංග

### 1. බහු පරිශීලක සහාය (Multi-User Support)
- එක් උපාංගයකින් බහු පරිශීලක ගිණුම් කළමනාකරණය
- පරිශීලකයින් අතර ඉක්මනින් මාරු වීම
- සෑම පරිශීලකයෙකුටම වෙන වෙනම:
  - බැංකු ගිණුම්
  - මුදල් ගිණුම්
  - ගනුදෙනු ඉතිහාසය
  - කාණ්ඩ සහ අයවැය
- පරිශීලකයින් එක් කිරීම/මකා දැමීම
- සුරක්ෂිත data isolation

**භාවිත අවස්ථා:**
- පවුලේ සෑම කෙනෙකුගේම වියදම් වෙන වෙනම track කරන්න
- බිස්නස් සහ පුද්ගලික accounts වෙන් කරන්න
- හවුල්කරුවන් සමඟ device එකක් share කරන්න

---

### 2. බැංකු ගිණුම් කළමනාකරණය (Bank Account Management)

#### විශේෂාංග:
- ✅ අසීමිත බැංකු ගිණුම් එක් කරන්න
- ✅ ගිණුම් අංකය සහ වර්ගය save කරන්න
- ✅ Real-time balance tracking
- ✅ සෑම ගිණුමකටම custom colors
- ✅ සම්පූර්ණ balance summary
- ✅ Edit/Delete ක්‍රියාකාරිත්වය

#### තොරතුරු:
- බැංකු නම
- ගිණුම් අංකය
- ගිණුම් වර්ගය (චෙක්පත්, ඉතිරි කිරීම්, ආදිය)
- වත්මන් ශේෂය
- Custom වර්ණ කේතය

**උදාහරණ:**
```
බැංකු නම: සම්පත් බැංකුව
ගිණුම් අංකය: 123456789
වර්ගය: චෙක්පත් ගිණුම
ශේෂය: රු 50,000
වර්ණය: නිල් (#6366f1)
```

---

### 3. මුදල් ගිණුම් කළමනාකරණය (Cash Account Management)

#### විශේෂාංග:
- ✅ බහු මුදල් locations track කරන්න
- ✅ පුබුන මුදල්, වොලට්, ආදිය වෙන් කරන්න
- ✅ Color-coded organization
- ✅ ඉක්මන් balance overview
- ✅ Easy add/edit/delete

#### භාවිත අවස්ථා:
- පුබුන මුදල
- වැඩ කාමරයේ මුදල් තැන්පත්
- විවිධ මුදල් wallets
- වෙළඳ පොළ මුදල්
- හදිසි මුදල් reserves

**උදාහරණ:**
```
නම: පුබුන මුදල්
ශේෂය: රු 5,000
වර්ණය: කොළ (#10b981)

නම: වොලට් 1
ශේෂය: රු 2,500
වර්ණය: තැඹිලි (#f59e0b)
```

---

### 4. ගනුදෙනු නිරීක්ෂණය (Transaction Tracking)

#### විශේෂාංග:
- ✅ ආදායම් සහ වියදම් record කරන්න
- ✅ විස්තරාත්මක descriptions
- ✅ දින සටහන් සමඟ
- ✅ කාණ්ඩ tagging
- ✅ සමස්ත ඉතිහාසය
- ✅ Edit/Delete options

#### ගනුදෙනු විස්තර:
- විස්තරය/Description
- මුදල (positive = ආදායම, negative = වියදම)
- දිනය
- කාණ්ඩය
- වර්ගය (ආදායම/වියදම)

**Dashboard පෙන්වන්නේ:**
- මෑත ගනුදෙනු 10
- ගනුදෙනු දිනය
- විස්තරය
- මුදල (වර්ණ කේතීකරණය)
- සංස්කරණ/මකන්න options

---

### 5. කාණ්ඩ සහ අයවැය (Categories & Budget)

#### විශේෂාංග:
- ✅ Custom expense categories
- ✅ Monthly budget targets
- ✅ Spent tracking
- ✅ Progress visualization
- ✅ Over-budget warnings
- ✅ Category-wise spending analysis

#### Category තොරතුරු:
- කාණ්ඩයේ නම
- ඉලක්ක මුදල (Monthly budget)
- වැය කළ මුදල
- Progress percentage
- Visual progress bar

**Default Categories:**
- පෙන් මැදි ගැනීම
- කෑම
- (ඔබට තවත් add කළ හැක)

**Progress Indicators:**
- Green: Budget ඇතුළත
- Red: Budget එක ඉක්මවා ගොස් ඇත
- Percentage display
- Warning badges

---

### 6. Dashboard සංග්‍රහය (Dashboard Overview)

#### පෙන්වන්නේ:
- ✅ User profile info
- ✅ සියලු accounts summary
- ✅ ත්‍රිමාණ balance cards:
  - පුබුන මුදල් (මුදල් ගිණුම්)
  - ඇත්නික්කා මුදල් (වියදම්)
  - Returns (return accounts)
- ✅ ඉක්මන් actions:
  - බැංකු නැතානාද
  - බැංකු Withdraw
  - විදියම කරන්න
- ✅ මෑත ගනුදෙනු list
- ✅ Floating + button නව transactions සඳහා

#### Color Coding:
- කහ: මුදල් (Cash)
- රතු: වියදම් (Expenses)
- Light රතු: Returns
- නිල්: Actions
- කොළ: ආදායම්

---

### 7. සැකසුම් සහ පුද්ගලීකරණය (Settings & Personalization)

#### පරිශීලක කළමනාකරණය:
- ✅ වත්මන් user profile view
- ✅ නව users add කරන්න
- ✅ Users අතර switch කරන්න
- ✅ Users delete කරන්න
- ✅ User details edit කරන්න

#### Appearance:
- ✅ අඳුරු/දීප්ත මාදිලි toggle
- ✅ Auto theme persistence
- ✅ High contrast colors
- ✅ සිංහල font support

#### යෙදුම් තොරතුරු:
- අනුවාදය
- නිර්මාණය details

---

### 8. Data Management

#### ගබඩා කිරීම:
- ✅ Local AsyncStorage භාවිතය
- ✅ Automatic data persistence
- ✅ User-specific data isolation
- ✅ Real-time saves
- ✅ No internet required

#### Data Structure:
```
User 1:
  ├── Accounts (Bank + Cash)
  ├── Transactions
  └── Categories

User 2:
  ├── Accounts (Bank + Cash)
  ├── Transactions
  └── Categories

App Settings:
  ├── Dark Mode
  ├── Current User
  └── Users List
```

---

### 9. User Interface විශේෂාංග

#### Design:
- ✅ Material Design inspired
- ✅ Bottom tab navigation
- ✅ Floating action buttons
- ✅ Modal forms
- ✅ Color pickers
- ✅ Progress bars
- ✅ Empty states
- ✅ Loading states

#### සිංහල භාෂාව:
- ✅ සම්පූර්ණයෙන්ම සිංහල interface
- ✅ සිංහල placeholders
- ✅ සිංහල error messages
- ✅ සිංහල button labels
- ✅ සිංහල navigation

#### Icons:
- MaterialCommunityIcons භාවිතය
- Intuitive icon selection
- Color-coded icons
- Consistent styling

---

### 10. වර්ණ පුද්ගලීකරණය (Color Customization)

#### විශේෂාංග:
- ✅ Preset colors (16 options)
- ✅ Custom color picker
- ✅ Triangle color selector
- ✅ HEX color display
- ✅ Real-time preview
- ✅ Color persistence

#### භාවිත අවස්ථා:
- විවිධ accounts වෙන් කරන්න
- ඉක්මනින් identify කරන්න
- Personal preferences
- Account categories

**Preset Colors:**
- රතු, තැඹිලි, කහ, කහ-කොළ
- කොළ, අලංකාර කොළ, නිල්-කොළ
- sky blue, නිල්, indigo, purple
- magenta, pink

---

## 🎯 Performance විශේෂාංග

### ඉක්මන්:
- ⚡ Instant data loading
- ⚡ Smooth animations
- ⚡ Responsive UI
- ⚡ Optimized rendering
- ⚡ Efficient state management

### ආරක්ෂාව:
- 🔒 Local data storage
- 🔒 No cloud sync (privacy)
- 🔒 User data isolation
- 🔒 No permissions required

### Reliability:
- ✅ Automatic saves
- ✅ Data persistence
- ✅ Error handling
- ✅ Graceful degradation
- ✅ Offline-first

---

## 📊 භාවිත Scenarios

### පවුල් අයවැය:
- පියා, මව, දරුවන් වෙන වෙනම profiles
- සෑම කෙනෙකුගේම වියදම් track කරන්න
- මාසික පවුල් අයවැය manage කරන්න

### Business use:
- ව්‍යාපාරික සහ පුද්ගලික accounts වෙන් කරන්න
- බහු business accounts manage කරන්න
- Expense categories අනුව track කරන්න

### Student budgeting:
- මාසික දීමනාව track කරන්න
- වියදම් categories (books, food, transport)
- Savings goals monitor කරන්න

### Freelancers:
- විවිධ projects track කරන්න
- ආදායම් සහ වියදම් වෙන් කරන්න
- විවිධ clients සඳහා accounts

---

## 🔄 Future පහසුකම් (සැලසුම් කර ඇත)

- 📊 Charts සහ graphs
- 📤 Data export (CSV, PDF)
- 🔔 Budget alerts
- 📅 Recurring transactions
- 🔍 Advanced search සහ filters
- 📈 Financial reports
- 💱 Multiple currency support
- ☁️ Optional cloud backup
- 🔗 Bank API integration

---

**මෙම යෙදුම සම්පූර්ණයෙන්ම නොමිලේ සහ open source!**
