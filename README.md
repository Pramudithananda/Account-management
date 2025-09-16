# Budget Tracker App (මුදල් කළමනාකරණ)

A comprehensive React Native budget tracking application designed for Sinhala-speaking users. This app helps users manage their finances by tracking bank balance, cash balance, expense categories, and transactions.

## Key Features

### 1. **Balance Management**
- **Bank Balance (බැංකු ශේෂය)**: Tracks money in the bank account
- **Cash Balance (මුදල් ශේෂය)**: Tracks physical cash on hand
- Money flows from bank → cash → expense categories

### 2. **Transaction Types**
- **Income (මුදල් ලබාගැනීම)**: Transfer money from bank to cash
- **Expense (වියදම් කරන්න)**: Spend cash on specific categories

### 3. **Expense Categories**
Pre-configured categories with budget tracking:
- **පෑන් මිලදී ගැනීම්** (Pan Purchases) - Budget: රු 10,000
- **කෑම** (Food) - Budget: රු 15,000  
- **ප්‍රවාහන** (Transportation) - Budget: රු 8,000

Each category includes:
- Current balance
- Target budget
- Amount spent
- Progress percentage
- Remaining budget
- Unit price tracking

### 4. **Visual Progress Tracking**
- Progress bars for each category
- Color-coded indicators (blue for normal, red for over-budget)
- Percentage completion display
- Remaining budget calculations

### 5. **Transaction History**
- Recent transactions display (last 10)
- Transaction details with timestamps
- Income/expense categorization
- Sinhala date formatting

### 6. **User Interface**
- Modern Material Design-inspired UI
- Sinhala language support
- Responsive design with proper spacing
- Modal-based transaction entry
- Icon-based navigation using Ionicons

## Technical Implementation

### State Management
Uses React hooks for state management:
- `useState` for all app state
- Real-time balance updates
- Transaction history tracking

### Key Functions
- `addTransaction()`: Handles both income and expense transactions
- `formatCurrency()`: Formats numbers in Sinhala rupee format
- `getProgressPercentage()`: Calculates budget progress
- `resetModal()`: Clears modal form data

### Validation & Error Handling
- Amount validation (must be positive)
- Sufficient cash balance checking
- Category selection requirement for expenses
- User-friendly error messages in Sinhala

## App Flow

1. **Initial State**: User starts with රු 50,000 in bank, රු 0 in cash
2. **Get Cash**: User transfers money from bank to cash (income transaction)
3. **Make Expenses**: User spends cash on categories (expense transactions)
4. **Track Progress**: Visual progress bars show budget utilization
5. **View History**: Recent transactions are displayed for reference

## File Structure

```
/workspace/
├── BudgetTrackerApp.js    # Main application component
└── README.md              # This documentation
```

## Dependencies

- React Native
- @expo/vector-icons (Ionicons)
- Standard React Native components

## Styling

- Uses StyleSheet for component styling
- Consistent color scheme (blues, greens, reds)
- Proper elevation and shadow effects
- Responsive design principles
- Accessibility considerations

## Potential Enhancements

1. **Data Persistence**: Add AsyncStorage for data persistence
2. **Category Management**: Allow users to add/edit/delete categories
3. **Date Range Filtering**: Filter transactions by date ranges
4. **Export Functionality**: Export transaction data
5. **Charts & Analytics**: Add visual analytics and spending trends
6. **Multi-currency Support**: Support for different currencies
7. **Backup & Sync**: Cloud backup functionality
8. **Notifications**: Budget limit notifications
9. **Receipt Scanning**: Camera integration for receipt capture
10. **Recurring Transactions**: Support for recurring income/expenses

## Usage Notes

- The app is designed for personal finance management
- All text is in Sinhala for local users
- Follows a simple bank → cash → category flow
- Visual feedback helps users stay within budgets
- Clean, intuitive interface suitable for all age groups