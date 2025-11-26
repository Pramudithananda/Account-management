import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppProvider } from './src/contexts/AppContext';

// Screens
import DashboardScreen from './src/screens/DashboardScreen';
import BankAccountsScreen from './src/screens/BankAccountsScreen';
import CashAccountsScreen from './src/screens/CashAccountsScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
  return (
    <AppProvider>
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
    </AppProvider>
  );
}
