import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import DashboardScreen from './src/screens/DashboardScreen';
import BankAccountsScreen from './src/screens/BankAccountsScreen';
import CashAccountsScreen from './src/screens/CashAccountsScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';

const STORAGE_KEYS = {
  accounts: 'accounts',
  transactions: 'transactions',
  categories: 'categories',
  darkMode: 'darkMode',
};

const DEFAULT_ACCOUNTS = {
  bank: [
    {
      id: 'bank-1',
      name: 'BOC சம்பලා',
      accountNumber: '1234567890',
      type: 'Salary',
      balance: 150000,
      color: '#6366f1',
    },
    {
      id: 'bank-2',
      name: 'People\'s Investment',
      accountNumber: '9876543210',
      type: 'Investment',
      balance: 82000,
      color: '#f97316',
    },
  ],
  cash: [
    {
      id: 'cash-1',
      name: 'පෞද්ගලික මුදල්',
      balance: 18500,
      color: '#10b981',
    },
  ],
  returns: [],
};

const DEFAULT_CATEGORIES = [
  { id: 'cat-food', name: 'ආහාර', target: 25000 },
  { id: 'cat-fuel', name: 'ඉන්ධන', target: 18000 },
  { id: 'cat-bills', name: 'බිල්පත්', target: 22000 },
];

const DEFAULT_TRANSACTIONS = [
  {
    id: 'txn-1',
    description: 'ඉන්ධන',
    amount: -6500,
    date: new Date().toISOString().split('T')[0],
    type: 'expense',
    accountType: 'cash',
    accountId: 'cash-1',
    categoryId: 'cat-fuel',
  },
  {
    id: 'txn-2',
    description: 'මාසික වැටුප',
    amount: 185000,
    date: new Date().toISOString().split('T')[0],
    type: 'income',
    accountType: 'bank',
    accountId: 'bank-1',
    categoryId: null,
  },
];

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// App Context for state management
export const AppContext = React.createContext(null);

function MainTabs() {
  const { darkMode } = React.useContext(AppContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'Bank') {
            iconName = 'bank';
          } else if (route.name === 'Cash') {
            iconName = 'cash';
          } else if (route.name === 'Categories') {
            iconName = 'folder';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          }
          
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: darkMode ? '#94a3b8' : '#475569',
        headerStyle: {
          backgroundColor: darkMode ? '#1e1b4b' : '#e2e8f0',
        },
        headerTintColor: darkMode ? '#fff' : '#0f172a',
        tabBarStyle: {
          backgroundColor: darkMode ? '#1e1b4b' : '#fff',
          borderTopColor: darkMode ? '#312e81' : '#cbd5f5',
        },
        tabBarLabelStyle: {
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ title: 'මුල් පිටුව' }}
      />
      <Tab.Screen 
        name="Bank" 
        component={BankAccountsScreen}
        options={{ title: 'බැංකු' }}
      />
      <Tab.Screen 
        name="Cash" 
        component={CashAccountsScreen}
        options={{ title: 'මුදල්' }}
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoriesScreen}
        options={{ title: 'කාණ්ඩ' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: 'සැකසුම්' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [accounts, setAccounts] = useState(DEFAULT_ACCOUNTS);
  const [transactions, setTransactions] = useState(DEFAULT_TRANSACTIONS);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [darkMode, setDarkMode] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  
  const saveData = useCallback(async (key, data) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  }, []);
  
  const persistAccounts = useCallback((value) => {
    setAccounts((prev) => {
      const next = typeof value === 'function' ? value(prev) : value;
      saveData(STORAGE_KEYS.accounts, next);
      return next;
    });
  }, [saveData]);
  
  const persistTransactions = useCallback((value) => {
    setTransactions((prev) => {
      const next = typeof value === 'function' ? value(prev) : value;
      saveData(STORAGE_KEYS.transactions, next);
      return next;
    });
  }, [saveData]);
  
  const persistCategories = useCallback((value) => {
    setCategories((prev) => {
      const next = typeof value === 'function' ? value(prev) : value;
      saveData(STORAGE_KEYS.categories, next);
      return next;
    });
  }, [saveData]);
  
  const persistDarkMode = useCallback((value) => {
    setDarkMode(value);
    saveData(STORAGE_KEYS.darkMode, value);
  }, [saveData]);
  
  const hydrateDefaults = useCallback(async () => {
    const payloads = [
      [STORAGE_KEYS.accounts, DEFAULT_ACCOUNTS],
      [STORAGE_KEYS.transactions, DEFAULT_TRANSACTIONS],
      [STORAGE_KEYS.categories, DEFAULT_CATEGORIES],
    ];
    
    payloads.forEach(([key, value]) => {
      saveData(key, value);
    });
    persistDarkMode(true);
    setAccounts(DEFAULT_ACCOUNTS);
    setTransactions(DEFAULT_TRANSACTIONS);
    setCategories(DEFAULT_CATEGORIES);
  }, [persistDarkMode, saveData]);
  
  const loadData = useCallback(async () => {
    try {
      const [
        storedAccounts,
        storedTransactions,
        storedCategories,
        storedDarkMode
      ] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.accounts),
        AsyncStorage.getItem(STORAGE_KEYS.transactions),
        AsyncStorage.getItem(STORAGE_KEYS.categories),
        AsyncStorage.getItem(STORAGE_KEYS.darkMode),
      ]);
      
      if (storedAccounts) {
        setAccounts(JSON.parse(storedAccounts));
      } else {
        await saveData(STORAGE_KEYS.accounts, DEFAULT_ACCOUNTS);
      }
      
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      } else {
        await saveData(STORAGE_KEYS.transactions, DEFAULT_TRANSACTIONS);
      }
      
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      } else {
        await saveData(STORAGE_KEYS.categories, DEFAULT_CATEGORIES);
      }
      
      if (storedDarkMode !== null) {
        setDarkMode(JSON.parse(storedDarkMode));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsHydrated(true);
    }
  }, [saveData]);
  
  useEffect(() => {
    loadData();
  }, [loadData]);
  
  const resetData = useCallback(async () => {
    try {
      setIsRestoring(true);
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
      await hydrateDefaults();
    } catch (error) {
      console.error('Error resetting data:', error);
    } finally {
      setIsRestoring(false);
    }
  }, [hydrateDefaults]);
  
  const navigationTheme = useMemo(() => {
    if (darkMode) {
      return {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: '#818cf8',
          background: '#0f172a',
          card: '#1e1b4b',
          text: '#fff',
          border: '#312e81',
        },
      };
    }
    
    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: '#4c1d95',
        background: '#f8fafc',
        card: '#fff',
        text: '#0f172a',
        border: '#cbd5f5',
      },
    };
  }, [darkMode]);
  
  const contextValue = useMemo(() => ({
    accounts,
    setAccounts: persistAccounts,
    transactions,
    setTransactions: persistTransactions,
    categories,
    setCategories: persistCategories,
    darkMode,
    setDarkMode: persistDarkMode,
    resetData,
    seedDemoData: hydrateDefaults,
    isRestoring,
  }), [
    accounts,
    persistAccounts,
    transactions,
    persistTransactions,
    categories,
    persistCategories,
    darkMode,
    persistDarkMode,
    resetData,
    hydrateDefaults,
    isRestoring,
  ]);
  
  if (!isHydrated) {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
      }}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={{
          color: darkMode ? '#cbd5f5' : '#334155',
          marginTop: 16,
          fontWeight: '600',
        }}>
          දත්ත පූරණය වෙමින්...
        </Text>
      </View>
    );
  }
  
  return (
    <AppContext.Provider value={contextValue}>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: darkMode ? '#1e1b4b' : '#e2e8f0',
            },
            headerTintColor: darkMode ? '#fff' : '#0f172a',
            contentStyle: {
              backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
            },
          }}
        >
          <Stack.Screen 
            name="Main" 
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="AddTransaction" 
            component={AddTransactionScreen}
            options={{ 
              title: 'නව ගනුදෙනුවක්',
              presentation: 'modal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}