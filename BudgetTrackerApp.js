import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Modal, 
  Alert,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BudgetTrackerApp = () => {
  // State Management
  const [bankBalance, setBankBalance] = useState(50000);
  const [cashBalance, setCashBalance] = useState(0);
  const [categories, setCategories] = useState([
    { id: 1, name: 'පෑන් මිලදී ගැනීම්', balance: 0, target: 10000, spent: 0, unitPrice: 100 },
    { id: 2, name: 'කෑම', balance: 0, target: 15000, spent: 0, unitPrice: 200 },
    { id: 3, name: 'ප්‍රවාහන', balance: 0, target: 8000, spent: 0, unitPrice: 50 }
  ]);
  
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState('');

  // Add Transaction Function
  const addTransaction = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('දෝෂය', 'වලංගු මුදලක් ඇතුළත් කරන්න');
      return;
    }

    const transactionAmount = parseFloat(amount);
    const newTransaction = {
      id: Date.now(),
      type: transactionType,
      amount: transactionAmount,
      category: selectedCategory,
      description: description,
      date: new Date().toLocaleString('si-LK'),
      timestamp: Date.now()
    };

    if (transactionType === 'income') {
      // Bank to Cash transfer
      setBankBalance(prev => prev - transactionAmount);
      setCashBalance(prev => prev + transactionAmount);
      
    } else if (transactionType === 'expense') {
      // Cash to Category transfer
      if (cashBalance < transactionAmount) {
        Alert.alert('දෝෂය', 'ප්‍රමාණවත් මුදල් නොමැත');
        return;
      }
      
      setCashBalance(prev => prev - transactionAmount);
      setCategories(prev => prev.map(cat => 
        cat.id === selectedCategory?.id 
          ? { 
              ...cat, 
              balance: cat.balance + transactionAmount,
              spent: cat.spent + transactionAmount 
            }
          : cat
      ));
    }

    setTransactions(prev => [newTransaction, ...prev]);
    resetModal();
  };

  const resetModal = () => {
    setModalVisible(false);
    setAmount('');
    setDescription('');
    setSelectedCategory(null);
  };

  const formatCurrency = (amount) => {
    return `රු ${amount.toLocaleString('si-LK')}`;
  };

  const getProgressPercentage = (spent, target) => {
    return target > 0 ? (spent / target) * 100 : 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1e3a8a" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>මුදල් කළමනාකරණ</Text>
        <Ionicons name="wallet" size={24} color="white" />
      </View>

      <ScrollView style={styles.content}>
        {/* Balance Cards */}
        <View style={styles.balanceContainer}>
          <View style={[styles.balanceCard, styles.bankCard]}>
            <Ionicons name="card" size={24} color="white" />
            <Text style={styles.balanceLabel}>බැංකු ශේෂය</Text>
            <Text style={styles.balanceAmount}>{formatCurrency(bankBalance)}</Text>
          </View>

          <View style={[styles.balanceCard, styles.cashCard]}>
            <Ionicons name="cash" size={24} color="white" />
            <Text style={styles.balanceLabel}>මුදල් ශේෂය</Text>
            <Text style={styles.balanceAmount}>{formatCurrency(cashBalance)}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.incomeButton]}
            onPress={() => {
              setTransactionType('income');
              setModalVisible(true);
            }}
          >
            <Ionicons name="arrow-down" size={20} color="white" />
            <Text style={styles.actionButtonText}>මුදල් ලබාගැනීම</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.expenseButton]}
            onPress={() => {
              if (cashBalance <= 0) {
                Alert.alert('දෝෂය', 'ප්‍රථමයෙන් මුදල් ලබාගන්න');
                return;
              }
              setTransactionType('expense');
              setModalVisible(true);
            }}
          >
            <Ionicons name="arrow-up" size={20} color="white" />
            <Text style={styles.actionButtonText}>වියදම් කරන්න</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>වියදම් කාණ්ඩ</Text>
          {categories.map(category => {
            const progressPercentage = getProgressPercentage(category.spent, category.target);
            
            return (
              <View key={category.id} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryBalance}>{formatCurrency(category.balance)}</Text>
                </View>
                
                <View style={styles.categoryDetails}>
                  <Text style={styles.categorySpent}>
                    වියදම්: {formatCurrency(category.spent)} / {formatCurrency(category.target)}
                  </Text>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${Math.min(progressPercentage, 100)}%` },
                        progressPercentage > 100 ? styles.progressOverflow : null
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {progressPercentage.toFixed(1)}%
                  </Text>
                </View>
                
                <Text style={styles.remainingBudget}>
                  ඉතිරි: {formatCurrency(Math.max(0, category.target - category.spent))}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>මෑත ගනුදෙනු</Text>
          {transactions.slice(0, 10).map(transaction => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <Ionicons 
                  name={transaction.type === 'income' ? 'arrow-down' : 'arrow-up'} 
                  size={16} 
                  color={transaction.type === 'income' ? '#10b981' : '#ef4444'} 
                />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionDescription}>
                  {transaction.description || (transaction.type === 'income' ? 'මුදල් ලබාගැනීම' : transaction.category?.name)}
                </Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text style={[
                styles.transactionAmount,
                transaction.type === 'income' ? styles.incomeAmount : styles.expenseAmount
              ]}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Transaction Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => resetModal()}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {transactionType === 'income' ? 'මුදල් ලබාගැනීම' : 'වියදම් කරන්න'}
              </Text>
              <TouchableOpacity onPress={() => resetModal()}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="මුදල (රු)"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="විස්තරය (අමතර)"
              value={description}
              onChangeText={setDescription}
            />

            {transactionType === 'expense' && (
              <View style={styles.categorySelector}>
                <Text style={styles.inputLabel}>කාණ්ඩය තෝරන්න:</Text>
                {categories.map(category => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryOption,
                      selectedCategory?.id === category.id && styles.selectedCategory
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text style={styles.categoryOptionText}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.submitButton,
                (!amount || (transactionType === 'expense' && !selectedCategory)) && styles.disabledButton
              ]}
              onPress={addTransaction}
              disabled={!amount || (transactionType === 'expense' && !selectedCategory)}
            >
              <Text style={styles.submitButtonText}>
                {transactionType === 'income' ? 'ලබාගන්න' : 'වියදම් කරන්න'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#1e3a8a',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  balanceContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  balanceCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  bankCard: {
    backgroundColor: '#3b82f6',
  },
  cashCard: {
    backgroundColor: '#10b981',
  },
  balanceLabel: {
    color: 'white',
    fontSize: 14,
    marginTop: 8,
    opacity: 0.9,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    gap: 8,
  },
  incomeButton: {
    backgroundColor: '#10b981',
  },
  expenseButton: {
    backgroundColor: '#ef4444',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 12,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  categoryBalance: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  categoryDetails: {
    marginBottom: 8,
  },
  categorySpent: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  progressOverflow: {
    backgroundColor: '#ef4444',
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'right',
  },
  remainingBudget: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  transactionsContainer: {
    marginBottom: 20,
  },
  transactionItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  transactionDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  incomeAmount: {
    color: '#10b981',
  },
  expenseAmount: {
    color: '#ef4444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  categorySelector: {
    marginBottom: 20,
  },
  categoryOption: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedCategory: {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
  },
  categoryOptionText: {
    fontSize: 14,
    color: '#374151',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BudgetTrackerApp;