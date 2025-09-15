import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Account, Transaction, ExpenseCategory, Budget } from '../types';
import StorageService from '../services/StorageService';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'react-native-uuid';

interface AppContextType {
  accounts: Account[];
  transactions: Transaction[];
  categories: ExpenseCategory[];
  budgets: Budget[];
  loading: boolean;
  
  // Account methods
  updateAccountBalance: (accountId: string, newBalance: number) => Promise<void>;
  
  // Transaction methods
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  deleteTransaction: (transactionId: string) => Promise<void>;
  
  // Category methods
  addCategory: (category: Omit<ExpenseCategory, 'id'>) => Promise<void>;
  updateCategory: (category: ExpenseCategory) => Promise<void>;
  deleteCategory: (categoryId: string) => Promise<void>;
  
  // Budget methods
  saveBudget: (budget: Omit<Budget, 'id'>) => Promise<void>;
  
  // Transfer methods
  transferFromBankToCash: (amount: number, description: string) => Promise<void>;
  makePurchase: (categoryId: string, amount: number, description: string) => Promise<void>;
  
  // Utility methods
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [loadedAccounts, loadedTransactions, loadedCategories, loadedBudgets] = await Promise.all([
        StorageService.getAccounts(),
        StorageService.getTransactions(),
        StorageService.getCategories(),
        StorageService.getBudgets(),
      ]);
      
      setAccounts(loadedAccounts);
      setTransactions(loadedTransactions);
      setCategories(loadedCategories);
      setBudgets(loadedBudgets);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await loadData();
  };

  const updateAccountBalance = async (accountId: string, newBalance: number) => {
    await StorageService.updateAccountBalance(accountId, newBalance);
    const updatedAccounts = accounts.map(acc =>
      acc.id === accountId ? { ...acc, balance: newBalance } : acc
    );
    setAccounts(updatedAccounts);
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: uuidv4() as string,
    };
    
    await StorageService.saveTransaction(newTransaction);
    setTransactions([newTransaction, ...transactions]);
    
    // Update account balances based on transaction type
    if (transaction.type === 'transfer' && transaction.fromAccount && transaction.toAccount) {
      const fromAccount = accounts.find(a => a.id === transaction.fromAccount);
      const toAccount = accounts.find(a => a.id === transaction.toAccount);
      
      if (fromAccount && toAccount) {
        await updateAccountBalance(fromAccount.id, fromAccount.balance - transaction.amount);
        await updateAccountBalance(toAccount.id, toAccount.balance + transaction.amount);
      }
    } else if (transaction.type === 'income' && transaction.toAccount) {
      const account = accounts.find(a => a.id === transaction.toAccount);
      if (account) {
        await updateAccountBalance(account.id, account.balance + transaction.amount);
      }
    } else if (transaction.type === 'expense' && transaction.fromAccount) {
      const account = accounts.find(a => a.id === transaction.fromAccount);
      if (account) {
        await updateAccountBalance(account.id, account.balance - transaction.amount);
      }
      
      // Update category amount if expense has a category
      if (transaction.category) {
        await StorageService.updateCategoryAmount(transaction.category, transaction.amount);
        const updatedCategories = categories.map(cat =>
          cat.id === transaction.category
            ? { ...cat, currentAmount: cat.currentAmount + transaction.amount }
            : cat
        );
        setCategories(updatedCategories);
      }
    }
  };

  const deleteTransaction = async (transactionId: string) => {
    await StorageService.deleteTransaction(transactionId);
    setTransactions(transactions.filter(t => t.id !== transactionId));
  };

  const addCategory = async (category: Omit<ExpenseCategory, 'id'>) => {
    const newCategory: ExpenseCategory = {
      ...category,
      id: uuidv4() as string,
    };
    
    const updatedCategories = [...categories, newCategory];
    await StorageService.saveCategories(updatedCategories);
    setCategories(updatedCategories);
  };

  const updateCategory = async (category: ExpenseCategory) => {
    const updatedCategories = categories.map(cat =>
      cat.id === category.id ? category : cat
    );
    await StorageService.saveCategories(updatedCategories);
    setCategories(updatedCategories);
  };

  const deleteCategory = async (categoryId: string) => {
    const updatedCategories = categories.filter(cat => cat.id !== categoryId);
    await StorageService.saveCategories(updatedCategories);
    setCategories(updatedCategories);
  };

  const saveBudget = async (budget: Omit<Budget, 'id'>) => {
    const newBudget: Budget = {
      ...budget,
      id: uuidv4() as string,
    };
    
    await StorageService.saveBudget(newBudget);
    const existingIndex = budgets.findIndex(
      b => b.categoryId === budget.categoryId && b.month === budget.month
    );
    
    if (existingIndex !== -1) {
      const updatedBudgets = [...budgets];
      updatedBudgets[existingIndex] = newBudget;
      setBudgets(updatedBudgets);
    } else {
      setBudgets([...budgets, newBudget]);
    }
  };

  const transferFromBankToCash = async (amount: number, description: string) => {
    const bankAccount = accounts.find(a => a.type === 'bank');
    const cashAccount = accounts.find(a => a.type === 'cash');
    
    if (bankAccount && cashAccount) {
      await addTransaction({
        date: new Date(),
        amount,
        type: 'transfer',
        fromAccount: bankAccount.id,
        toAccount: cashAccount.id,
        description: description || 'බැංකුවෙන් මුදල් ගැනීම',
      });
    }
  };

  const makePurchase = async (categoryId: string, amount: number, description: string) => {
    const cashAccount = accounts.find(a => a.type === 'cash');
    
    if (cashAccount) {
      await addTransaction({
        date: new Date(),
        amount,
        type: 'expense',
        fromAccount: cashAccount.id,
        category: categoryId,
        description,
      });
    }
  };

  const value: AppContextType = {
    accounts,
    transactions,
    categories,
    budgets,
    loading,
    updateAccountBalance,
    addTransaction,
    deleteTransaction,
    addCategory,
    updateCategory,
    deleteCategory,
    saveBudget,
    transferFromBankToCash,
    makePurchase,
    refreshData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};