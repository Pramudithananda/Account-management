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
  const [accounts, setAccounts] = useState({
    bank: [],
    cash: [],
    returns: []
  });
  
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  
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
      
      if (storedAccounts) setAccounts(JSON.parse(storedAccounts));
      if (storedTransactions) setTransactions(JSON.parse(storedTransactions));
      if (storedCategories) setCategories(JSON.parse(storedCategories));
      if (storedDarkMode) setDarkMode(JSON.parse(storedDarkMode));
      
      // Initialize with sample data if empty
      if (!storedCategories) {
        const defaultCategories = [
          { id: '1', name: 'ආහාර', target: 10000, spent: 3000 },
          { id: '2', name: 'ප්‍රවාහන', target: 5000, spent: 2500 }
        ];
        setCategories(defaultCategories);
        await AsyncStorage.setItem('categories', JSON.stringify(defaultCategories));
      }
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
  
  const contextValue = {
    accounts,
    setAccounts: (newAccounts) => {
      setAccounts(newAccounts);
      saveData('accounts', newAccounts);
    },
    transactions,
    setTransactions: (newTransactions) => {
      setTransactions(newTransactions);
      saveData('transactions', newTransactions);
    },
    categories,
    setCategories: (newCategories) => {
      setCategories(newCategories);
      saveData('categories', newCategories);
    },
    darkMode,
    setDarkMode: (mode) => {
      setDarkMode(mode);
      saveData('darkMode', mode);
    },
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
