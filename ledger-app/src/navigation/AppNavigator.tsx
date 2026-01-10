import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import DashboardScreen from '../screens/DashboardScreen';
import AddCategoryScreen from '../screens/AddCategoryScreen';
import IncomeScreen from '../screens/IncomeScreen';
import TransferScreen from '../screens/TransferScreen';
import PurchaseScreen from '../screens/PurchaseScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Ledger' }} />
        <Stack.Screen name="Income" component={IncomeScreen} options={{ title: 'Receive Income' }} />
        <Stack.Screen name="Transfer" component={TransferScreen} options={{ title: 'Transfer to Cash' }} />
        <Stack.Screen name="Purchase" component={PurchaseScreen} options={{ title: 'Purchase' }} />
        <Stack.Screen name="AddCategory" component={AddCategoryScreen} options={{ title: 'New Category' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

