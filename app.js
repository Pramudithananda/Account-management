import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// App Context for state management
export const AppContext = React.createContext();

const createEmptyAccounts = () => ({
  bank: [],
  cash: [],
  returns: [],
});

const CATEGORY_SEED = [
  { id: '1', name: 'පෙන් මැදි ගැනීම', target: 10000, color: '#6366f1' },
  { id: '2', name: 'කෑම', target: 10000, color: '#10b981' },
];

const createDefaultCategories = () => CATEGORY_SEED.map((category) => ({ ...category }));

function MainTabs() {
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
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#1e1b4b',
        },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#1e1b4b',
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
  const [accounts, setAccountsState] = useState(createEmptyAccounts());
  const [transactions, setTransactionsState] = useState([]);
  const [categories, setCategoriesState] = useState(createDefaultCategories());
  const [darkMode, setDarkModeState] = useState(true);
  
  // Load data from AsyncStorage
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    try {
      const storedAccounts = await AsyncStorage.getItem('accounts');
      const storedTransactions = await AsyncStorage.getItem('transactions');
      const storedCategories = await AsyncStorage.getItem('categories');
      const storedDarkMode = await AsyncStorage.getItem('darkMode');
      
      if (storedAccounts) setAccountsState(JSON.parse(storedAccounts));
      if (storedTransactions) setTransactionsState(JSON.parse(storedTransactions));
      if (storedCategories) {
        setCategoriesState(JSON.parse(storedCategories));
      } else {
        const defaults = createDefaultCategories();
        setCategoriesState(defaults);
        await AsyncStorage.setItem('categories', JSON.stringify(defaults));
      }
      if (storedDarkMode) setDarkModeState(JSON.parse(storedDarkMode));
      
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };
  
  const saveData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
  const resetAllData = async () => {
    try {
      const emptyAccounts = createEmptyAccounts();
      const defaultCategories = createDefaultCategories();
      setAccountsState(emptyAccounts);
      setTransactionsState([]);
      setCategoriesState(defaultCategories);
      setDarkModeState(true);
      await AsyncStorage.multiRemove(['accounts', 'transactions', 'categories', 'darkMode']);
      await AsyncStorage.setItem('categories', JSON.stringify(defaultCategories));
    } catch (error) {
      console.error('Error resetting data:', error);
    }
  };

  const importBackup = async (payload = {}) => {
    try {
      if (payload.accounts) {
        setAccountsState(payload.accounts);
        await saveData('accounts', payload.accounts);
      }
      if (payload.transactions) {
        setTransactionsState(payload.transactions);
        await saveData('transactions', payload.transactions);
      }
      if (payload.categories) {
        setCategoriesState(payload.categories);
        await saveData('categories', payload.categories);
      }
      if (typeof payload.darkMode === 'boolean') {
        setDarkModeState(payload.darkMode);
        await saveData('darkMode', payload.darkMode);
      }
    } catch (error) {
      console.error('Error importing data:', error);
      throw error;
    }
  };

  const contextValue = {
    accounts,
    setAccounts: (newAccounts) => {
      setAccountsState(newAccounts);
      saveData('accounts', newAccounts);
    },
    transactions,
    setTransactions: (newTransactions) => {
      setTransactionsState(newTransactions);
      saveData('transactions', newTransactions);
    },
    categories,
    setCategories: (newCategories) => {
      setCategoriesState(newCategories);
      saveData('categories', newCategories);
    },
    darkMode,
    setDarkMode: (mode) => {
      setDarkModeState(mode);
      saveData('darkMode', mode);
    },
    resetAllData,
    importBackup,
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      <NavigationContainer>
        <Stack.Navigator>
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
              headerStyle: { backgroundColor: '#1e1b4b' },
              headerTintColor: '#fff'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}