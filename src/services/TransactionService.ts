import { Transaction, Account, TransactionType } from '../types';
import { StorageService } from './StorageService';

export class TransactionService {
  static async createTransaction(
    fromAccountId: string,
    toAccountId: string,
    amount: number,
    description: string,
    category: string,
    type: TransactionType
  ): Promise<void> {
    const transaction: Transaction = {
      id: Date.now().toString(),
      fromAccountId,
      toAccountId,
      amount,
      description,
      category,
      date: new Date(),
      type,
    };

    // Add transaction to storage
    await StorageService.addTransaction(transaction);

    // Update account balances
    await this.updateAccountBalances(fromAccountId, toAccountId, amount, type);
  }

  static async updateAccountBalances(
    fromAccountId: string,
    toAccountId: string,
    amount: number,
    type: TransactionType
  ): Promise<void> {
    const accounts = await StorageService.getAccounts();
    
    const fromAccountIndex = accounts.findIndex(acc => acc.id === fromAccountId);
    const toAccountIndex = accounts.findIndex(acc => acc.id === toAccountId);

    if (fromAccountIndex !== -1 && toAccountIndex !== -1) {
      // Update from account balance
      if (type === TransactionType.INCOME) {
        // For income, money comes into the account
        accounts[fromAccountIndex].balance += amount;
      } else {
        // For transfers and expenses, money goes out
        accounts[fromAccountIndex].balance -= amount;
      }

      // Update to account balance
      if (type === TransactionType.EXPENSE) {
        // For expenses, money goes to expense account
        accounts[toAccountIndex].balance += amount;
      } else if (type === TransactionType.TRANSFER) {
        // For transfers, money goes to destination account
        accounts[toAccountIndex].balance += amount;
      }

      // Save updated accounts
      await StorageService.saveAccounts(accounts);
    }
  }

  static async getTransactionsByAccount(accountId: string): Promise<Transaction[]> {
    const transactions = await StorageService.getTransactions();
    return transactions.filter(
      transaction => 
        transaction.fromAccountId === accountId || 
        transaction.toAccountId === accountId
    );
  }

  static async getRecentTransactions(limit: number = 10): Promise<Transaction[]> {
    const transactions = await StorageService.getTransactions();
    return transactions
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit);
  }

  static async getTransactionsByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<Transaction[]> {
    const transactions = await StorageService.getTransactions();
    return transactions.filter(
      transaction => 
        transaction.date >= startDate && transaction.date <= endDate
    );
  }

  static async getTotalExpenses(): Promise<number> {
    const transactions = await StorageService.getTransactions();
    return transactions
      .filter(transaction => transaction.type === TransactionType.EXPENSE)
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  static async getTotalIncome(): Promise<number> {
    const transactions = await StorageService.getTransactions();
    return transactions
      .filter(transaction => transaction.type === TransactionType.INCOME)
      .reduce((total, transaction) => total + transaction.amount, 0);
  }
}