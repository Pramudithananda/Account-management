import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// Context
import { UserProfileProvider, useUserProfile } from './src/contexts/UserProfileContext';

// Screens
import UserSelectionScreen from './src/screens/UserSelectionScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import BankAccountsScreen from './src/screens/BankAccountsScreen';
import CashAccountsScreen from './src/screens/CashAccountsScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  const { currentUser } = useUserProfile();
  const darkMode = currentUser?.settings?.darkMode ?? true;

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
        tabBarInactiveTintColor: darkMode ? '#94a3b8' : '#64748b',
        headerStyle: {
          backgroundColor: darkMode ? '#1e1b4b' : '#6366f1',
        },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: darkMode ? '#1e1b4b' : '#fff',
          borderTopColor: darkMode ? '#334155' : '#e2e8f0',
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

function AppNavigator() {
  const { currentUser, loading } = useUserProfile();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  const darkMode = currentUser?.settings?.darkMode ?? true;

  return (
    <>
      <StatusBar style={darkMode ? 'light' : 'auto'} />
      <NavigationContainer>
        <Stack.Navigator>
          {!currentUser ? (
            <Stack.Screen 
              name="UserSelection" 
              component={UserSelectionScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen 
                name="Main" 
                component={MainTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="UserSelection" 
                component={UserSelectionScreen}
                options={{ 
                  title: 'පරිශීලකයා තෝරන්න',
                  headerStyle: { 
                    backgroundColor: darkMode ? '#1e1b4b' : '#6366f1' 
                  },
                  headerTintColor: '#fff'
                }}
              />
              <Stack.Screen 
                name="AddTransaction" 
                component={AddTransactionScreen}
                options={{ 
                  title: 'නව ගනුදෙනුවක්',
                  headerStyle: { 
                    backgroundColor: darkMode ? '#1e1b4b' : '#6366f1' 
                  },
                  headerTintColor: '#fff'
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <UserProfileProvider>
      <AppNavigator />
    </UserProfileProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
});
