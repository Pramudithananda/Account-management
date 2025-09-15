import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DashboardScreen from './src/screens/DashboardScreen';
import AccountsScreen from './src/screens/AccountsScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import AccountDetailScreen from './src/screens/AccountDetailScreen';
import { theme } from './src/styles/theme';
import { AppInitializer } from './src/services/AppInitializer';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'Accounts') {
            iconName = 'account-balance';
          } else if (route.name === 'Transactions') {
            iconName = 'receipt';
          } else {
            iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Accounts" component={AccountsScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    // Initialize app data when app starts
    AppInitializer.initializeApp();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Main" 
            component={TabNavigator} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="AddTransaction" 
            component={AddTransactionScreen}
            options={{ title: 'Add Transaction' }}
          />
          <Stack.Screen 
            name="AccountDetail" 
            component={AccountDetailScreen}
            options={{ title: 'Account Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;