import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Category = {
  id: string;
  name: string;
  targetUnits: number | null;
  unitPrice: number | null;
  targetAmount: number; // total target value in currency
  purchasedUnits: number;
  purchasedAmount: number; // accumulated value
};

type LedgerState = {
  bankBalance: number;
  cashBalance: number;
  categories: Category[];
  addIncome: (amount: number) => void;
  transferToCash: (amount: number) => void;
  addCategory: (input: {
    name: string;
    targetUnits?: number | null;
    unitPrice?: number | null;
    targetAmount?: number | null;
  }) => void;
  purchase: (input: {
    categoryId: string;
    quantity: number;
    unitPrice?: number | null; // optional override per purchase
  }) => void;
  resetAll: () => void;
};

const generateId = () => Math.random().toString(36).slice(2, 10);

export const useLedgerStore = create<LedgerState>()(
  persist(
    (set, get) => ({
      bankBalance: 0,
      cashBalance: 0,
      categories: [],

      addIncome: (amount: number) => {
        if (!Number.isFinite(amount) || amount <= 0) return;
        set((state) => ({ bankBalance: state.bankBalance + amount }));
      },

      transferToCash: (amount: number) => {
        if (!Number.isFinite(amount) || amount <= 0) return;
        const { bankBalance, cashBalance } = get();
        if (amount > bankBalance) return;
        set({ bankBalance: bankBalance - amount, cashBalance: cashBalance + amount });
      },

      addCategory: ({ name, targetUnits = null, unitPrice = null, targetAmount = null }) => {
        if (!name.trim()) return;
        let computedTargetAmount = 0;
        if (targetUnits != null && unitPrice != null) {
          computedTargetAmount = targetUnits * unitPrice;
        } else if (targetAmount != null) {
          computedTargetAmount = targetAmount;
        }

        const newCategory: Category = {
          id: generateId(),
          name: name.trim(),
          targetUnits: targetUnits ?? null,
          unitPrice: unitPrice ?? null,
          targetAmount: Math.max(0, computedTargetAmount),
          purchasedUnits: 0,
          purchasedAmount: 0,
        };

        set((state) => ({ categories: [newCategory, ...state.categories] }));
      },

      purchase: ({ categoryId, quantity, unitPrice = null }) => {
        if (!Number.isFinite(quantity) || quantity <= 0) return;
        const { categories, cashBalance } = get();
        const categoryIndex = categories.findIndex((c) => c.id === categoryId);
        if (categoryIndex === -1) return;
        const category = categories[categoryIndex];

        const appliedUnitPrice = unitPrice != null ? unitPrice : category.unitPrice ?? 0;
        const amount = appliedUnitPrice * quantity;
        if (amount <= 0) return;
        if (amount > cashBalance) return;

        const updatedCategory: Category = {
          ...category,
          purchasedUnits: category.purchasedUnits + quantity,
          purchasedAmount: category.purchasedAmount + amount,
        };

        const updatedCategories = [...categories];
        updatedCategories[categoryIndex] = updatedCategory;

        set({
          categories: updatedCategories,
          cashBalance: cashBalance - amount,
        });
      },

      resetAll: () => set({ bankBalance: 0, cashBalance: 0, categories: [] }),
    }),
    {
      name: 'ledger-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        bankBalance: state.bankBalance,
        cashBalance: state.cashBalance,
        categories: state.categories,
      }),
    }
  )
);

export const formatCurrency = (value: number) => {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(
      value
    );
  } catch {
    return `Rs ${value.toFixed(0)}`;
  }
};

