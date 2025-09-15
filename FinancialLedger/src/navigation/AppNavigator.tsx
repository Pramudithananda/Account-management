import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import TransferScreen from '../screens/TransferScreen';
import ExpenseScreen from '../screens/ExpenseScreen';
import IncomeScreen from '../screens/IncomeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200EE',
    accent: '#03DAC6',
  },
};

const DashboardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DashboardHome"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Transfer"
        component={TransferScreen}
        options={{ 
          title: 'මුදල් මාරු කිරීම',
          headerStyle: {
            backgroundColor: '#6200EE',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Expense"
        component={ExpenseScreen}
        options={{ 
          title: 'වියදම් එකතු කිරීම',
          headerStyle: {
            backgroundColor: '#6200EE',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Income"
        component={IncomeScreen}
        options={{ 
          title: 'ආදායම් එකතු කිරීම',
          headerStyle: {
            backgroundColor: '#6200EE',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

const TransactionsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TransactionsList"
        component={TransactionsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const CategoriesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoriesList"
        component={CategoriesScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: string = 'home';

              if (route.name === 'Dashboard') {
                iconName = 'view-dashboard';
              } else if (route.name === 'Transactions') {
                iconName = 'format-list-bulleted';
              } else if (route.name === 'Categories') {
                iconName = 'folder-multiple';
              }

              return (
                <MaterialCommunityIcons
                  name={iconName as any}
                  size={size}
                  color={color}
                />
              );
            },
            tabBarActiveTintColor: '#6200EE',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          <Tab.Screen
            name="Dashboard"
            component={DashboardStack}
            options={{ title: 'මුල් පිටුව' }}
          />
          <Tab.Screen
            name="Transactions"
            component={TransactionsStack}
            options={{ title: 'ගනුදෙනු' }}
          />
          <Tab.Screen
            name="Categories"
            component={CategoriesStack}
            options={{ title: 'කාණ්ඩ' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default AppNavigator;