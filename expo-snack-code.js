// Financial Ledger App - Expo Snack Version
// Copy this code to https://snack.expo.dev

import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [bankBalance, setBankBalance] = useState(0);
  const [cashBalance, setCashBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [categories] = useState([
    { id: 1, name: 'පෑන් මිලදී ගැනීම්', icon: '✏️', budget: 10000, spent: 0 },
    { id: 2, name: 'ලිපි ද්‍රව්‍ය', icon: '📁', budget: 15000, spent: 0 },
    { id: 3, name: 'ප්‍රවාහන', icon: '🚗', budget: 20000, spent: 0 },
    { id: 4, name: 'ආහාර', icon: '🍔', budget: 25000, spent: 0 },
  ]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transferAmount, setTransferAmount] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const bank = await AsyncStorage.getItem('bankBalance');
      const cash = await AsyncStorage.getItem('cashBalance');
      const trans = await AsyncStorage.getItem('transactions');
      
      if (bank) setBankBalance(parseFloat(bank));
      if (cash) setCashBalance(parseFloat(cash));
      if (trans) setTransactions(JSON.parse(trans));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('bankBalance', bankBalance.toString());
      await AsyncStorage.setItem('cashBalance', cashBalance.toString());
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const addIncome = (amount) => {
    const newBalance = bankBalance + parseFloat(amount);
    setBankBalance(newBalance);
    const newTransaction = {
      id: Date.now(),
      type: 'income',
      amount: parseFloat(amount),
      date: new Date().toISOString(),
      description: 'ආදායම',
    };
    setTransactions([newTransaction, ...transactions]);
    saveData();
    Alert.alert('සාර්ථකයි', `රු ${amount} බැංකු ගිණුමට එකතු කරන ලදි`);
  };

  const transferToCash = () => {
    const amount = parseFloat(transferAmount);
    if (amount > bankBalance) {
      Alert.alert('දෝෂය', 'ප්‍රමාණවත් මුදල් නැත');
      return;
    }
    setBankBalance(bankBalance - amount);
    setCashBalance(cashBalance + amount);
    const newTransaction = {
      id: Date.now(),
      type: 'transfer',
      amount: amount,
      date: new Date().toISOString(),
      description: 'බැංකුවෙන් අතට',
    };
    setTransactions([newTransaction, ...transactions]);
    saveData();
    Alert.alert('සාර්ථකයි', `රු ${amount} අතට මාරු කරන ලදි`);
    setTransferAmount('');
  };

  const makeExpense = () => {
    const amount = parseFloat(expenseAmount);
    if (amount > cashBalance) {
      Alert.alert('දෝෂය', 'අතැති මුදල් ප්‍රමාණවත් නැත');
      return;
    }
    if (!selectedCategory) {
      Alert.alert('දෝෂය', 'කාණ්ඩයක් තෝරන්න');
      return;
    }
    setCashBalance(cashBalance - amount);
    const newTransaction = {
      id: Date.now(),
      type: 'expense',
      amount: amount,
      category: selectedCategory.name,
      date: new Date().toISOString(),
      description: `${selectedCategory.name} වියදම`,
    };
    setTransactions([newTransaction, ...transactions]);
    saveData();
    Alert.alert('සාර්ථකයි', `රු ${amount} ${selectedCategory.name} සඳහා වියදම් කරන ලදි`);
    setExpenseAmount('');
    setSelectedCategory(null);
  };

  const DashboardTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>බැංකු ශේෂය</Text>
        <Text style={styles.balanceAmount}>රු {bankBalance.toFixed(2)}</Text>
      </View>
      
      <View style={[styles.balanceCard, { backgroundColor: '#2196F3' }]}>
        <Text style={styles.balanceTitle}>අතැති මුදල්</Text>
        <Text style={styles.balanceAmount}>රු {cashBalance.toFixed(2)}</Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            Alert.prompt(
              'ආදායම එකතු කරන්න',
              'මුදල ඇතුළත් කරන්න:',
              (amount) => amount && addIncome(amount)
            );
          }}>
          <Text style={styles.actionButtonText}>➕ ආදායම</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setActiveTab('transfer')}>
          <Text style={styles.actionButtonText}>🔄 මාරු කිරීම</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setActiveTab('expense')}>
          <Text style={styles.actionButtonText}>💸 වියදම</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>මෑත ගනුදෙනු</Text>
        {transactions.slice(0, 5).map((trans) => (
          <View key={trans.id} style={styles.transactionItem}>
            <Text>{trans.description}</Text>
            <Text style={trans.type === 'income' ? styles.income : styles.expense}>
              {trans.type === 'income' ? '+' : '-'}රු {trans.amount.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const TransferTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabTitle}>බැංකුවෙන් අතට මුදල් මාරු කිරීම</Text>
      
      <View style={styles.inputContainer}>
        <Text>බැංකු ශේෂය: රු {bankBalance.toFixed(2)}</Text>
        <Text>අතැති මුදල්: රු {cashBalance.toFixed(2)}</Text>
        
        <TextInput
          style={styles.input}
          placeholder="මාරු කිරීමට මුදල"
          value={transferAmount}
          onChangeText={setTransferAmount}
          keyboardType="numeric"
        />
        
        <TouchableOpacity style={styles.submitButton} onPress={transferToCash}>
          <Text style={styles.submitButtonText}>මාරු කරන්න</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ExpenseTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabTitle}>වියදම් එකතු කිරීම</Text>
      
      <View style={styles.inputContainer}>
        <Text>අතැති මුදල්: රු {cashBalance.toFixed(2)}</Text>
        
        <Text style={styles.label}>කාණ්ඩය තෝරන්න:</Text>
        <View style={styles.categoryGrid}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryItem,
                selectedCategory?.id === cat.id && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(cat)}>
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="වියදම් මුදල"
          value={expenseAmount}
          onChangeText={setExpenseAmount}
          keyboardType="numeric"
        />
        
        <TouchableOpacity style={styles.submitButton} onPress={makeExpense}>
          <Text style={styles.submitButtonText}>වියදම එකතු කරන්න</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6200EE" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💰 Financial Ledger</Text>
        <Text style={styles.headerSubtitle}>මූල්‍ය පොත</Text>
      </View>

      {activeTab === 'dashboard' && <DashboardTab />}
      {activeTab === 'transfer' && <TransferTab />}
      {activeTab === 'expense' && <ExpenseTab />}

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'dashboard' && styles.activeTab]}
          onPress={() => setActiveTab('dashboard')}>
          <Text style={styles.tabText}>🏠 Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'transfer' && styles.activeTab]}
          onPress={() => setActiveTab('transfer')}>
          <Text style={styles.tabText}>🔄 Transfer</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'expense' && styles.activeTab]}
          onPress={() => setActiveTab('expense')}>
          <Text style={styles.tabText}>💸 Expense</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200EE',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  balanceCard: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  balanceTitle: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  actionButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
  },
  actionButtonText: {
    textAlign: 'center',
    fontSize: 14,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
  },
  income: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  expense: {
    color: '#f44336',
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#6200EE',
  },
  tabText: {
    fontSize: 12,
  },
  tabTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#6200EE',
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 8,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 12,
  },
  categoryItem: {
    width: '48%',
    padding: 12,
    margin: '1%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#E3F2FD',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
  },
});