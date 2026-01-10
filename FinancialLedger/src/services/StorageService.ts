import AsyncStorage from '@react-native-async-storage/async-storage';
import { Account, Transaction, ExpenseCategory, Budget } from '../types';

const STORAGE_KEYS = {
  ACCOUNTS: '@financial_ledger_accounts',
  TRANSACTIONS: '@financial_ledger_transactions',
  CATEGORIES: '@financial_ledger_categories',
  BUDGETS: '@financial_ledger_budgets',
};

class StorageService {
  // Accounts
  async getAccounts(): Promise<Account[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.ACCOUNTS);
      return jsonValue != null ? JSON.parse(jsonValue) : this.getDefaultAccounts();
    } catch (e) {
      console.error('Error reading accounts:', e);
      return this.getDefaultAccounts();
    }
  }

  async saveAccounts(accounts: Account[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(accounts);
      await AsyncStorage.setItem(STORAGE_KEYS.ACCOUNTS, jsonValue);
    } catch (e) {
      console.error('Error saving accounts:', e);
    }
  }

  async updateAccountBalance(accountId: string, newBalance: number): Promise<void> {
    const accounts = await this.getAccounts();
    const accountIndex = accounts.findIndex(a => a.id === accountId);
    if (accountIndex !== -1) {
      accounts[accountIndex].balance = newBalance;
      await this.saveAccounts(accounts);
    }
  }

  // Transactions
  async getTransactions(): Promise<Transaction[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      if (jsonValue != null) {
        const transactions = JSON.parse(jsonValue);
        return transactions.map((t: any) => ({
          ...t,
          date: new Date(t.date),
        }));
      }
      return [];
    } catch (e) {
      console.error('Error reading transactions:', e);
      return [];
    }
  }

  async saveTransaction(transaction: Transaction): Promise<void> {
    try {
      const transactions = await this.getTransactions();
      transactions.unshift(transaction);
      const jsonValue = JSON.stringify(transactions);
      await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, jsonValue);
    } catch (e) {
      console.error('Error saving transaction:', e);
    }
  }

  async deleteTransaction(transactionId: string): Promise<void> {
    try {
      const transactions = await this.getTransactions();
      const filtered = transactions.filter(t => t.id !== transactionId);
      const jsonValue = JSON.stringify(filtered);
      await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, jsonValue);
    } catch (e) {
      console.error('Error deleting transaction:', e);
    }
  }

  // Expense Categories
  async getCategories(): Promise<ExpenseCategory[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return jsonValue != null ? JSON.parse(jsonValue) : this.getDefaultCategories();
    } catch (e) {
      console.error('Error reading categories:', e);
      return this.getDefaultCategories();
    }
  }

  async saveCategories(categories: ExpenseCategory[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(categories);
      await AsyncStorage.setItem(STORAGE_KEYS.CATEGORIES, jsonValue);
    } catch (e) {
      console.error('Error saving categories:', e);
    }
  }

  async updateCategoryAmount(categoryId: string, amount: number): Promise<void> {
    const categories = await this.getCategories();
    const categoryIndex = categories.findIndex(c => c.id === categoryId);
    if (categoryIndex !== -1) {
      categories[categoryIndex].currentAmount += amount;
      await this.saveCategories(categories);
    }
  }

  // Budgets
  async getBudgets(): Promise<Budget[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.BUDGETS);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error reading budgets:', e);
      return [];
    }
  }

  async saveBudget(budget: Budget): Promise<void> {
    try {
      const budgets = await this.getBudgets();
      const existingIndex = budgets.findIndex(
        b => b.categoryId === budget.categoryId && b.month === budget.month
      );
      if (existingIndex !== -1) {
        budgets[existingIndex] = budget;
      } else {
        budgets.push(budget);
      }
      const jsonValue = JSON.stringify(budgets);
      await AsyncStorage.setItem(STORAGE_KEYS.BUDGETS, jsonValue);
    } catch (e) {
      console.error('Error saving budget:', e);
    }
  }

  // Default data
  private getDefaultAccounts(): Account[] {
    return [
      {
        id: 'bank-main',
        name: 'මූලික බැංකු ගිණුම',
        type: 'bank',
        balance: 0,
        color: '#4CAF50',
        icon: 'bank',
      },
      {
        id: 'cash-hand',
        name: 'අතැති මුදල්',
        type: 'cash',
        balance: 0,
        color: '#2196F3',
        icon: 'cash',
      },
    ];
  }

  private getDefaultCategories(): ExpenseCategory[] {
    return [
      {
        id: 'cat-pens',
        name: 'පෑන් මිලදී ගැනීම්',
        targetAmount: 10000,
        currentAmount: 0,
        icon: 'pencil',
        color: '#FF9800',
        description: 'කාර්යාලයීය පෑන් මිලදී ගැනීම්',
      },
      {
        id: 'cat-stationery',
        name: 'ලිපි ද්‍රව්‍ය',
        targetAmount: 15000,
        currentAmount: 0,
        icon: 'folder',
        color: '#9C27B0',
        description: 'කාර්යාලයීය ලිපි ද්‍රව්‍ය',
      },
      {
        id: 'cat-transport',
        name: 'ප්‍රවාහන',
        targetAmount: 20000,
        currentAmount: 0,
        icon: 'car',
        color: '#00BCD4',
        description: 'ප්‍රවාහන වියදම්',
      },
      {
        id: 'cat-food',
        name: 'ආහාර',
        targetAmount: 25000,
        currentAmount: 0,
        icon: 'food',
        color: '#FF5722',
        description: 'ආහාර සහ බීම',
      },
    ];
  }

  // Clear all data
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    } catch (e) {
      console.error('Error clearing data:', e);
    }
  }
}

export default new StorageService();