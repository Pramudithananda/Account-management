# Money Manager App

A comprehensive React Native mobile application for managing bank accounts, cash, and expense tracking with goal management features.

## Features

### 🏦 Account Management
- **Bank Account**: Main account for receiving money
- **Cash Account**: Physical cash tracking
- **Expense Accounts**: Specific accounts for different expense categories (e.g., Pen Purchases)
- **Savings Accounts**: Dedicated savings tracking

### 💰 Transaction System
- **Income**: Money coming into accounts
- **Expenses**: Money spent on specific items/services
- **Transfers**: Moving money between accounts
- **Real-time Balance Updates**: Automatic balance calculations

### 🎯 Goal Management
- Set spending goals for specific accounts
- Track progress with visual progress bars
- Monitor remaining amounts needed to reach goals
- Example: Track pen purchases with a goal of 100 pens at Rs 100 each

### 📊 Dashboard
- Total balance overview
- Income vs expenses summary
- Goal progress tracking
- Recent transactions
- Quick action buttons

### 📱 User Interface
- Modern Material Design 3 interface
- Intuitive navigation with bottom tabs
- Search and filter transactions
- Responsive design for all screen sizes

## How It Works

### Example: Pen Purchase Tracking
1. **Initial Setup**: Create a "Pen Purchases" expense account with a goal of Rs 10,000 (100 pens × Rs 100)
2. **Money Flow**: 
   - Money comes into Bank Account (income)
   - Transfer money from Bank to Cash Account
   - When buying pens, transfer from Cash to Pen Purchases account
3. **Goal Tracking**: 
   - Pen Purchases account balance increases with each purchase
   - Progress bar shows completion percentage
   - Remaining amount is calculated and displayed

### Account Types
- **Bank Account**: Primary account for receiving money
- **Cash Account**: Physical cash management
- **Expense Accounts**: Category-specific spending (Pens, Food, etc.)
- **Savings Accounts**: Long-term savings goals

## Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS:
```bash
cd ios && pod install && cd ..
```

3. Run the app:
```bash
# Android
npm run android

# iOS
npm run ios
```

## Project Structure

```
src/
├── screens/           # Main app screens
│   ├── DashboardScreen.tsx
│   ├── AccountsScreen.tsx
│   ├── TransactionsScreen.tsx
│   ├── AddTransactionScreen.tsx
│   └── AccountDetailScreen.tsx
├── services/          # Business logic
│   ├── StorageService.ts
│   └── TransactionService.ts
├── types/             # TypeScript definitions
│   └── index.ts
└── styles/            # Theme and styling
    └── theme.ts
```

## Key Components

### StorageService
- Manages local data persistence using AsyncStorage
- Handles accounts, transactions, and goals
- Provides CRUD operations for all data types

### TransactionService
- Processes all financial transactions
- Updates account balances automatically
- Provides transaction filtering and reporting

### Account Management
- Multiple account types support
- Goal tracking with progress visualization
- Real-time balance updates

## Usage Examples

### Adding a Transaction
1. Navigate to "Add Transaction"
2. Select transaction type (Income/Expense/Transfer)
3. Choose from and to accounts
4. Enter amount and description
5. Select category
6. Submit transaction

### Tracking Goals
1. Create an expense account with a goal amount
2. Add goal description (e.g., "100 pens at Rs 100 each")
3. Monitor progress on dashboard and account details
4. View remaining amount needed to reach goal

### Managing Accounts
1. View all accounts on Accounts screen
2. See balance and goal progress for each account
3. Access detailed transaction history
4. Add new transactions directly from account details

## Technologies Used

- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **React Navigation**: Screen navigation
- **React Native Paper**: Material Design components
- **AsyncStorage**: Local data persistence
- **React Native Vector Icons**: Icon library

## Future Enhancements

- Data export/import functionality
- Cloud synchronization
- Advanced reporting and analytics
- Budget management features
- Receipt photo attachments
- Multi-currency support
- Backup and restore functionality

## License

This project is created for educational and personal use.