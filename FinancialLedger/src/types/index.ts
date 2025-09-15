export interface Account {
  id: string;
  name: string;
  type: 'bank' | 'cash' | 'expense';
  balance: number;
  color: string;
  icon: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  icon: string;
  color: string;
  description?: string;
}

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  fromAccount?: string;
  toAccount?: string;
  category?: string;
  description: string;
  reference?: string;
}

export interface Budget {
  id: string;
  categoryId: string;
  month: string;
  targetAmount: number;
  spentAmount: number;
}

export interface DashboardData {
  bankBalance: number;
  cashBalance: number;
  totalExpenses: number;
  recentTransactions: Transaction[];
  expenseCategories: ExpenseCategory[];
}