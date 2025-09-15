export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  goalAmount?: number;
  goalDescription?: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum AccountType {
  BANK = 'bank',
  CASH = 'cash',
  EXPENSE = 'expense',
  SAVINGS = 'savings',
}

export interface Transaction {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  type: TransactionType;
}

export enum TransactionType {
  TRANSFER = 'transfer',
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface ExpenseCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Goal {
  id: string;
  accountId: string;
  targetAmount: number;
  currentAmount: number;
  description: string;
  targetDate?: Date;
  isCompleted: boolean;
}

export interface DashboardData {
  totalBalance: number;
  totalExpenses: number;
  totalIncome: number;
  accounts: Account[];
  recentTransactions: Transaction[];
  goalsProgress: Goal[];
}