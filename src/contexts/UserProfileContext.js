import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load users and current user from storage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const storedCurrentUser = await AsyncStorage.getItem('currentUser');
      
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        setUsers(parsedUsers);
        
        if (storedCurrentUser) {
          const currentUserId = JSON.parse(storedCurrentUser);
          const user = parsedUsers.find(u => u.id === currentUserId);
          if (user) {
            setCurrentUser(user);
          }
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveUsers = async (updatedUsers) => {
    try {
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error saving users:', error);
    }
  };

  const saveCurrentUser = async (userId) => {
    try {
      await AsyncStorage.setItem('currentUser', JSON.stringify(userId));
    } catch (error) {
      console.error('Error saving current user:', error);
    }
  };

  // Create new user profile
  const createUser = async (userData) => {
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      avatar: userData.avatar || null,
      createdAt: new Date().toISOString(),
      accounts: {
        bank: [],
        cash: [],
        returns: []
      },
      transactions: [],
      categories: [
        { id: '1', name: 'ආහාර', icon: 'food', target: 15000, spent: 0, color: '#ef4444' },
        { id: '2', name: 'ප්‍රවාහන', icon: 'car', target: 10000, spent: 0, color: '#3b82f6' },
        { id: '3', name: 'විනෝදාංශ', icon: 'gamepad', target: 5000, spent: 0, color: '#8b5cf6' },
        { id: '4', name: 'උපයෝගිතා', icon: 'lightbulb', target: 8000, spent: 0, color: '#f59e0b' },
      ],
      settings: {
        darkMode: true,
        currency: 'රු',
        language: 'si'
      }
    };

    const updatedUsers = [...users, newUser];
    await saveUsers(updatedUsers);
    return newUser;
  };

  // Switch to different user
  const switchUser = async (userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      await saveCurrentUser(userId);
    }
  };

  // Update user data
  const updateUser = async (userId, updates) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    );
    await saveUsers(updatedUsers);
    
    if (currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, ...updates });
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    const updatedUsers = users.filter(u => u.id !== userId);
    await saveUsers(updatedUsers);
    
    if (currentUser && currentUser.id === userId) {
      if (updatedUsers.length > 0) {
        await switchUser(updatedUsers[0].id);
      } else {
        setCurrentUser(null);
        await AsyncStorage.removeItem('currentUser');
      }
    }
  };

  // Update accounts for current user
  const updateAccounts = async (accounts) => {
    if (currentUser) {
      await updateUser(currentUser.id, { accounts });
    }
  };

  // Update transactions for current user
  const updateTransactions = async (transactions) => {
    if (currentUser) {
      await updateUser(currentUser.id, { transactions });
    }
  };

  // Update categories for current user
  const updateCategories = async (categories) => {
    if (currentUser) {
      await updateUser(currentUser.id, { categories });
    }
  };

  // Update settings for current user
  const updateSettings = async (settings) => {
    if (currentUser) {
      await updateUser(currentUser.id, { 
        settings: { ...currentUser.settings, ...settings } 
      });
    }
  };

  const value = {
    currentUser,
    users,
    loading,
    createUser,
    switchUser,
    updateUser,
    deleteUser,
    updateAccounts,
    updateTransactions,
    updateCategories,
    updateSettings,
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within UserProfileProvider');
  }
  return context;
};
