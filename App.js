import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileProvider, ProfileContext } from './src/contexts/ProfileContext';

// Screens
import DashboardScreen from './src/screens/DashboardScreen';
import BankAccountsScreen from './src/screens/BankAccountsScreen';
import CashAccountsScreen from './src/screens/CashAccountsScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import ProfileSelectionScreen from './src/screens/ProfileSelectionScreen';

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

function AppContent() {
  const { currentProfile, loading } = useContext(ProfileContext);
  const [accounts, setAccounts] = useState({
    bank: [],
    cash: [],
    returns: []
  });
  
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  
  // Load profile-specific data from AsyncStorage
  useEffect(() => {
    if (currentProfile) {
      loadProfileData();
    }
  }, [currentProfile]);
  
  const loadProfileData = async () => {
    if (!currentProfile) return;
    
    try {
      const profileId = currentProfile.id;
      
      const storedAccounts = await AsyncStorage.getItem(`profile_${profileId}_accounts`);
      const storedTransactions = await AsyncStorage.getItem(`profile_${profileId}_transactions`);
      const storedCategories = await AsyncStorage.getItem(`profile_${profileId}_categories`);
      const storedDarkMode = await AsyncStorage.getItem(`profile_${profileId}_darkMode`);
      
      if (storedAccounts) setAccounts(JSON.parse(storedAccounts));
      if (storedTransactions) setTransactions(JSON.parse(storedTransactions));
      if (storedCategories) setCategories(JSON.parse(storedCategories));
      if (storedDarkMode) setDarkMode(JSON.parse(storedDarkMode));
      
      // Initialize with sample data if empty
      if (!storedCategories) {
        const defaultCategories = [
          { id: '1', name: 'ආහාර', target: 50000, spent: 0 },
          { id: '2', name: 'ප්‍රවාහන', target: 20000, spent: 0 },
          { id: '3', name: 'විනෝදාස්වාදය', target: 15000, spent: 0 }
        ];
        setCategories(defaultCategories);
        await AsyncStorage.setItem(`profile_${profileId}_categories`, JSON.stringify(defaultCategories));
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };
  
  const saveProfileData = async (key, data) => {
    if (!currentProfile) return;
    
    try {
      await AsyncStorage.setItem(`profile_${currentProfile.id}_${key}`, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };
  
  const contextValue = {
    accounts,
    setAccounts: (newAccounts) => {
      setAccounts(newAccounts);
      saveProfileData('accounts', newAccounts);
    },
    transactions,
    setTransactions: (newTransactions) => {
      setTransactions(newTransactions);
      saveProfileData('transactions', newTransactions);
    },
    categories,
    setCategories: (newCategories) => {
      setCategories(newCategories);
      saveProfileData('categories', newCategories);
    },
    darkMode,
    setDarkMode: (mode) => {
      setDarkMode(mode);
      saveProfileData('darkMode', mode);
    },
  };

  if (loading) {
    return null; // Or a loading screen
  }
  
  return (
    <AppContext.Provider value={contextValue}>
      <NavigationContainer>
        <Stack.Navigator>
          {!currentProfile ? (
            <Stack.Screen 
              name="ProfileSelection" 
              component={ProfileSelectionScreen}
              options={{ 
                headerShown: false,
              }}
            />
          ) : (
            <>
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
              <Stack.Screen 
                name="ProfileSelection" 
                component={ProfileSelectionScreen}
                options={{ 
                  title: 'ප්‍රොෆයිල් තෝරන්න',
                  headerStyle: { backgroundColor: '#1e1b4b' },
                  headerTintColor: '#fff'
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <AppContent />
    </ProfileProvider>
  );
}
