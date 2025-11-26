import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Multi-user state
  const [users, setUsers] = useState([
    { id: '1', name: 'පරිශීලකයා 1', email: 'user1@example.com' }
  ]);
  const [currentUser, setCurrentUser] = useState(null);
  
  // App state (stored per user)
  const [accounts, setAccounts] = useState({
    bank: [],
    cash: [],
    returns: []
  });
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  
  // Load all data on app start
  useEffect(() => {
    loadAppData();
  }, []);
  
  // Load user-specific data when user changes
  useEffect(() => {
    if (currentUser) {
      loadUserData(currentUser.id);
    }
  }, [currentUser]);
  
  // Load app-level data (users list and current user)
  const loadAppData = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('app_users');
      const storedCurrentUserId = await AsyncStorage.getItem('app_currentUserId');
      const storedDarkMode = await AsyncStorage.getItem('app_darkMode');
      
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        setUsers(parsedUsers);
        
        // Set current user
        if (storedCurrentUserId) {
          const user = parsedUsers.find(u => u.id === storedCurrentUserId);
          if (user) {
            setCurrentUser(user);
          } else {
            setCurrentUser(parsedUsers[0]);
          }
        } else {
          setCurrentUser(parsedUsers[0]);
        }
      } else {
        // First time setup - create default user
        const defaultUser = { id: '1', name: 'පරිශීලකයා 1', email: '' };
        setUsers([defaultUser]);
        setCurrentUser(defaultUser);
        await AsyncStorage.setItem('app_users', JSON.stringify([defaultUser]));
        await AsyncStorage.setItem('app_currentUserId', defaultUser.id);
      }
      
      if (storedDarkMode) {
        setDarkMode(JSON.parse(storedDarkMode));
      }
    } catch (error) {
      console.error('Error loading app data:', error);
    }
  };
  
  // Load user-specific data
  const loadUserData = async (userId) => {
    try {
      const storedAccounts = await AsyncStorage.getItem(`user_${userId}_accounts`);
      const storedTransactions = await AsyncStorage.getItem(`user_${userId}_transactions`);
      const storedCategories = await AsyncStorage.getItem(`user_${userId}_categories`);
      
      if (storedAccounts) setAccounts(JSON.parse(storedAccounts));
      else setAccounts({ bank: [], cash: [], returns: [] });
      
      if (storedTransactions) setTransactions(JSON.parse(storedTransactions));
      else setTransactions([]);
      
      if (storedCategories) setCategories(JSON.parse(storedCategories));
      else {
        // Initialize with sample data for new users
        const defaultCategories = [
          { id: '1', name: 'පෙන් මැදි ගැනීම', target: 10000, spent: 3000 },
          { id: '2', name: 'කෑම', target: 10000, spent: 2500 }
        ];
        setCategories(defaultCategories);
        await AsyncStorage.setItem(`user_${userId}_categories`, JSON.stringify(defaultCategories));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };
  
  // Save user-specific data
  const saveUserData = async (key, data) => {
    if (!currentUser) return;
    try {
      await AsyncStorage.setItem(`user_${currentUser.id}_${key}`, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };
  
  // User management functions
  const addUser = async (userData) => {
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email || '',
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    
    try {
      await AsyncStorage.setItem('app_users', JSON.stringify(updatedUsers));
      
      // Initialize empty data for new user
      await AsyncStorage.setItem(`user_${newUser.id}_accounts`, JSON.stringify({ bank: [], cash: [], returns: [] }));
      await AsyncStorage.setItem(`user_${newUser.id}_transactions`, JSON.stringify([]));
      await AsyncStorage.setItem(`user_${newUser.id}_categories`, JSON.stringify([
        { id: '1', name: 'පෙන් මැදි ගැනීම', target: 10000, spent: 0 },
        { id: '2', name: 'කෑම', target: 10000, spent: 0 }
      ]));
    } catch (error) {
      console.error('Error adding user:', error);
    }
    
    return newUser;
  };
  
  const switchUser = async (userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      try {
        await AsyncStorage.setItem('app_currentUserId', userId);
      } catch (error) {
        console.error('Error switching user:', error);
      }
    }
  };
  
  const deleteUser = async (userId) => {
    if (users.length <= 1) return; // Don't delete the last user
    
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    
    try {
      await AsyncStorage.setItem('app_users', JSON.stringify(updatedUsers));
      
      // Delete user data
      await AsyncStorage.removeItem(`user_${userId}_accounts`);
      await AsyncStorage.removeItem(`user_${userId}_transactions`);
      await AsyncStorage.removeItem(`user_${userId}_categories`);
      
      // If deleted user was current user, switch to first available user
      if (currentUser?.id === userId) {
        await switchUser(updatedUsers[0].id);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  // Context value
  const contextValue = {
    // User management
    users,
    currentUser,
    addUser,
    switchUser,
    deleteUser,
    
    // User data
    accounts,
    setAccounts: (newAccounts) => {
      setAccounts(newAccounts);
      saveUserData('accounts', newAccounts);
    },
    transactions,
    setTransactions: (newTransactions) => {
      setTransactions(newTransactions);
      saveUserData('transactions', newTransactions);
    },
    categories,
    setCategories: (newCategories) => {
      setCategories(newCategories);
      saveUserData('categories', newCategories);
    },
    
    // App settings
    darkMode,
    setDarkMode: async (mode) => {
      setDarkMode(mode);
      try {
        await AsyncStorage.setItem('app_darkMode', JSON.stringify(mode));
      } catch (error) {
        console.error('Error saving dark mode:', error);
      }
    },
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
