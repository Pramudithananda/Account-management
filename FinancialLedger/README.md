# Financial Ledger Mobile App - මූල්‍ය පොත

A comprehensive React Native mobile application for managing bank accounts, cash flow, and expense tracking with budget management capabilities. The app is designed for tracking money flow from bank accounts to cash and then to specific expense categories with target budgets.

## Features

### 🏦 Account Management
- **Bank Account**: Track bank balance and transactions
- **Cash Account**: Monitor cash on hand
- **Real-time Balance Updates**: Automatic balance updates with every transaction

### 💸 Transaction Management
- **Income Tracking**: Add income directly to bank or cash accounts
- **Expense Recording**: Track expenses from cash with category allocation
- **Money Transfers**: Transfer money between bank and cash accounts
- **Transaction History**: View all transactions with search and filter capabilities

### 📊 Expense Categories
- **Custom Categories**: Create and manage expense categories (e.g., Pens, Stationery, Transport, Food)
- **Budget Targets**: Set target amounts for each category
- **Progress Tracking**: Visual progress bars showing spending against targets
- **Over-budget Alerts**: Visual indicators when spending exceeds targets

### 🎯 Key Features
- **Sinhala & English Interface**: Bilingual support
- **Beautiful Modern UI**: Clean and intuitive Material Design
- **Data Persistence**: All data saved locally using AsyncStorage
- **Real-time Updates**: Instant balance and category updates
- **Search & Filter**: Easy transaction search and filtering

## Installation

### Prerequisites
- Node.js (v20 or higher)
- npm or yarn
- React Native development environment set up
- Android Studio (for Android development)
- Xcode (for iOS development - Mac only)

### Setup Steps

1. **Clone the repository**
```bash
cd /workspace/FinancialLedger
```

2. **Install dependencies**
```bash
npm install
```

3. **iOS specific setup (Mac only)**
```bash
cd ios && pod install && cd ..
```

4. **Android specific setup**
Make sure you have Android SDK installed and ANDROID_HOME environment variable set.

## Running the App

### Android
```bash
# Start Metro bundler
npx react-native start

# In another terminal, run Android app
npx react-native run-android
```

### iOS (Mac only)
```bash
# Start Metro bundler
npx react-native start

# In another terminal, run iOS app
npx react-native run-ios
```

## Usage Guide

### 1. Dashboard
- View bank and cash account balances
- See recent transactions
- Quick access to common actions
- View expense category summaries

### 2. Adding Income
- Navigate to "ආදායම් එකතු කරන්න" (Add Income)
- Select target account (Bank or Cash)
- Enter amount and description
- Optional: Add reference number

### 3. Bank to Cash Transfer
- Navigate to "මුදල් මාරු කරන්න" (Transfer Money)
- Select transfer direction
- Enter amount and description
- Money moves between accounts

### 4. Recording Expenses
- Navigate to "වියදම් එකතු කරන්න" (Add Expense)
- Select expense category
- Enter amount directly OR
- Enter quantity × unit price (e.g., 100 pens × Rs. 100 each)
- Add description
- Expense deducted from cash, added to category

### 5. Managing Categories
- Navigate to Categories tab
- Add new categories with custom icons and colors
- Set target budgets
- Edit or delete existing categories
- Monitor spending progress

### 6. Viewing Transactions
- Navigate to Transactions tab
- Search by description, account, or category
- Filter by transaction type
- View grouped by date
- Delete unwanted transactions

## Example Workflow

**Purchasing Pens:**
1. **Initial Setup**: Bank balance = Rs. 50,000, Cash = Rs. 0
2. **Withdraw Cash**: Transfer Rs. 10,000 from Bank to Cash
   - Bank: Rs. 40,000, Cash: Rs. 10,000
3. **Buy Pens**: Purchase 100 pens at Rs. 100 each
   - Select "පෑන් මිලදී ගැනීම්" category
   - Enter quantity: 100, unit price: 100
   - Cash: Rs. 0, Pen Category Expense: Rs. 10,000
4. **Track Progress**: See that Rs. 10,000 spent against target

## Data Structure

### Accounts
- Bank Account (මූලික බැංකු ගිණුම)
- Cash Account (අතැති මුදල්)

### Transaction Types
- **Income**: Money coming in
- **Expense**: Money going out (with category)
- **Transfer**: Money moving between accounts

### Categories
Each category tracks:
- Current spending amount
- Target budget amount
- Visual progress indicator
- Custom icon and color

## Technical Details

### Built With
- React Native 0.81.4
- TypeScript
- React Navigation (Bottom Tabs + Stack)
- React Native Paper (UI Components)
- AsyncStorage (Data Persistence)
- React Context API (State Management)

### Project Structure
```
FinancialLedger/
├── src/
│   ├── types/          # TypeScript type definitions
│   ├── services/       # Storage and API services
│   ├── context/        # React Context for state management
│   ├── screens/        # All app screens
│   ├── navigation/     # Navigation configuration
│   └── components/     # Reusable components
├── App.tsx             # Main app component
└── package.json        # Dependencies
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
```bash
npx react-native start --reset-cache
```

2. **Build errors on Android**
```bash
cd android && ./gradlew clean && cd ..
npx react-native run-android
```

3. **iOS pod issues**
```bash
cd ios && pod deintegrate && pod install && cd ..
```

## Future Enhancements
- Export reports to PDF
- Cloud backup and sync
- Multiple currency support
- Recurring transactions
- Budget alerts and notifications
- Charts and analytics
- Multi-user support

## License
This project is created for educational and personal use.

## Support
For issues or questions, please check the documentation or create an issue in the repository.