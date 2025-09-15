import AsyncStorage from '@react-native-async-storage/async-storage';
import { Account, Transaction, Goal } from '../types';

const STORAGE_KEYS = {
  ACCOUNTS: 'accounts',
  TRANSACTIONS: 'transactions',
  GOALS: 'goals',
};

export class StorageService {
  // Account operations
  static async getAccounts(): Promise<Account[]> {
    try {
      const accountsJson = await AsyncStorage.getItem(STORAGE_KEYS.ACCOUNTS);
      if (accountsJson) {
        const accounts = JSON.parse(accountsJson);
        return accounts.map((account: any) => ({
          ...account,
          createdAt: new Date(account.createdAt),
          updatedAt: new Date(account.updatedAt),
        }));
      }
      return [];
    } catch (error) {
      console.error('Error getting accounts:', error);
      return [];
    }
  }

  static async saveAccounts(accounts: Account[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
    } catch (error) {
      console.error('Error saving accounts:', error);
    }
  }

  static async addAccount(account: Account): Promise<void> {
    const accounts = await this.getAccounts();
    accounts.push(account);
    await this.saveAccounts(accounts);
  }

  static async updateAccount(accountId: string, updates: Partial<Account>): Promise<void> {
    const accounts = await this.getAccounts();
    const index = accounts.findIndex(acc => acc.id === accountId);
    if (index !== -1) {
      accounts[index] = { ...accounts[index], ...updates, updatedAt: new Date() };
      await this.saveAccounts(accounts);
    }
  }

  // Transaction operations
  static async getTransactions(): Promise<Transaction[]> {
    try {
      const transactionsJson = await AsyncStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      if (transactionsJson) {
        const transactions = JSON.parse(transactionsJson);
        return transactions.map((transaction: any) => ({
          ...transaction,
          date: new Date(transaction.date),
        }));
      }
      return [];
    } catch (error) {
      console.error('Error getting transactions:', error);
      return [];
    }
  }

  static async saveTransactions(transactions: Transaction[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transactions:', error);
    }
  }

  static async addTransaction(transaction: Transaction): Promise<void> {
    const transactions = await this.getTransactions();
    transactions.push(transaction);
    await this.saveTransactions(transactions);
  }

  // Goal operations
  static async getGoals(): Promise<Goal[]> {
    try {
      const goalsJson = await AsyncStorage.getItem(STORAGE_KEYS.GOALS);
      if (goalsJson) {
        const goals = JSON.parse(goalsJson);
        return goals.map((goal: any) => ({
          ...goal,
          targetDate: goal.targetDate ? new Date(goal.targetDate) : undefined,
        }));
      }
      return [];
    } catch (error) {
      console.error('Error getting goals:', error);
      return [];
    }
  }

  static async saveGoals(goals: Goal[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
    } catch (error) {
      console.error('Error saving goals:', error);
    }
  }

  static async addGoal(goal: Goal): Promise<void> {
    const goals = await this.getGoals();
    goals.push(goal);
    await this.saveGoals(goals);
  }

  static async updateGoal(goalId: string, updates: Partial<Goal>): Promise<void> {
    const goals = await this.getGoals();
    const index = goals.findIndex(goal => goal.id === goalId);
    if (index !== -1) {
      goals[index] = { ...goals[index], ...updates };
      await this.saveGoals(goals);
    }
  }

  // Initialize default data
  static async initializeDefaultData(): Promise<void> {
    const accounts = await this.getAccounts();
    if (accounts.length === 0) {
      const defaultAccounts: Account[] = [
        {
          id: '1',
          name: 'Bank Account',
          type: 'bank' as any,
          balance: 0,
          color: '#2196F3',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Cash',
          type: 'cash' as any,
          balance: 0,
          color: '#4CAF50',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          name: 'Pen Purchases',
          type: 'expense' as any,
          balance: 0,
          goalAmount: 10000, // Rs 10,000 goal for pen purchases
          goalDescription: 'Target: 100 pens at Rs 100 each',
          color: '#FF9800',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      await this.saveAccounts(defaultAccounts);
    }
  }
}