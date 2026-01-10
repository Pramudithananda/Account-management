/**
 * Financial Ledger App
 * A comprehensive financial management app for tracking bank accounts,
 * cash flow, and expense categories with budget management
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    <AppProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#6200EE"
      />
      <AppNavigator />
    </AppProvider>
  );
}

export default App;