import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  TextInput,
  Button,
  SegmentedButtons,
  Menu,
  Text,
} from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Account, TransactionType } from '../types';
import { StorageService } from '../services/StorageService';
import { TransactionService } from '../services/TransactionService';

const AddTransactionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [transactionType, setTransactionType] = useState(TransactionType.TRANSFER);
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  
  // Menu states
  const [fromAccountMenuVisible, setFromAccountMenuVisible] = useState(false);
  const [toAccountMenuVisible, setToAccountMenuVisible] = useState(false);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Business',
    'Other',
  ];

  useEffect(() => {
    loadAccounts();
    
    // If coming from account detail, pre-select the account
    const params = route.params as any;
    if (params?.fromAccount) {
      setFromAccountId(params.fromAccount.id);
    }
  }, [route.params]);

  const loadAccounts = async () => {
    try {
      const accountsData = await StorageService.getAccounts();
      setAccounts(accountsData);
    } catch (error) {
      console.error('Error loading accounts:', error);
    }
  };

  const getAccountName = (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId);
    return account ? account.name : 'Select Account';
  };

  const handleSubmit = async () => {
    if (!fromAccountId || !toAccountId || !amount || !description) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (fromAccountId === toAccountId) {
      Alert.alert('Error', 'From and To accounts cannot be the same');
      return;
    }

    setLoading(true);
    try {
      await TransactionService.createTransaction(
        fromAccountId,
        toAccountId,
        amountValue,
        description,
        category || 'General',
        transactionType
      );

      Alert.alert(
        'Success',
        'Transaction added successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('Error creating transaction:', error);
      Alert.alert('Error', 'Failed to create transaction');
    } finally {
      setLoading(false);
    }
  };

  const getTransactionTypeButtons = () => {
    return [
      {
        value: TransactionType.TRANSFER,
        label: 'Transfer',
        icon: 'swap-horiz',
      },
      {
        value: TransactionType.INCOME,
        label: 'Income',
        icon: 'trending-up',
      },
      {
        value: TransactionType.EXPENSE,
        label: 'Expense',
        icon: 'trending-down',
      },
    ];
  };

  const getFilteredAccounts = (excludeId?: string) => {
    return accounts.filter(account => account.id !== excludeId);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Transaction Type</Title>
          <SegmentedButtons
            value={transactionType}
            onValueChange={setTransactionType}
            buttons={getTransactionTypeButtons()}
            style={styles.segmentedButtons}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Account Details</Title>
          
          <Menu
            visible={fromAccountMenuVisible}
            onDismiss={() => setFromAccountMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setFromAccountMenuVisible(true)}
                style={styles.menuButton}
                contentStyle={styles.menuButtonContent}
              >
                {getAccountName(fromAccountId)}
              </Button>
            }
          >
            {getFilteredAccounts(toAccountId).map((account) => (
              <Menu.Item
                key={account.id}
                onPress={() => {
                  setFromAccountId(account.id);
                  setFromAccountMenuVisible(false);
                }}
                title={account.name}
              />
            ))}
          </Menu>

          <Text style={styles.fieldLabel}>From Account</Text>

          <Menu
            visible={toAccountMenuVisible}
            onDismiss={() => setToAccountMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setToAccountMenuVisible(true)}
                style={styles.menuButton}
                contentStyle={styles.menuButtonContent}
              >
                {getAccountName(toAccountId)}
              </Button>
            }
          >
            {getFilteredAccounts(fromAccountId).map((account) => (
              <Menu.Item
                key={account.id}
                onPress={() => {
                  setToAccountId(account.id);
                  setToAccountMenuVisible(false);
                }}
                title={account.name}
              />
            ))}
          </Menu>

          <Text style={styles.fieldLabel}>To Account</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Transaction Details</Title>
          
          <TextInput
            label="Amount (Rs)"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            style={styles.input}
            multiline
          />

          <Menu
            visible={categoryMenuVisible}
            onDismiss={() => setCategoryMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setCategoryMenuVisible(true)}
                style={styles.menuButton}
                contentStyle={styles.menuButtonContent}
              >
                {category || 'Select Category'}
              </Button>
            }
          >
            {categories.map((cat) => (
              <Menu.Item
                key={cat}
                onPress={() => {
                  setCategory(cat);
                  setCategoryMenuVisible(false);
                }}
                title={cat}
              />
            ))}
          </Menu>

          <Text style={styles.fieldLabel}>Category</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.summarySection}>
            <Title>Transaction Summary</Title>
            <Text style={styles.summaryText}>
              {transactionType === TransactionType.TRANSFER && 'Transfer'}
              {transactionType === TransactionType.INCOME && 'Income'}
              {transactionType === TransactionType.EXPENSE && 'Expense'}
            </Text>
            <Text style={styles.summaryText}>
              From: {getAccountName(fromAccountId)}
            </Text>
            <Text style={styles.summaryText}>
              To: {getAccountName(toAccountId)}
            </Text>
            {amount && (
              <Text style={styles.summaryAmount}>
                Amount: Rs {parseFloat(amount).toLocaleString()}
              </Text>
            )}
          </View>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
          style={styles.submitButton}
        >
          Add Transaction
        </Button>
        
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          Cancel
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    margin: 16,
    marginBottom: 8,
  },
  segmentedButtons: {
    marginTop: 16,
  },
  input: {
    marginBottom: 16,
  },
  menuButton: {
    marginBottom: 8,
  },
  menuButtonContent: {
    justifyContent: 'flex-start',
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  summarySection: {
    marginTop: 8,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginTop: 8,
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  submitButton: {
    marginBottom: 12,
  },
  cancelButton: {
    marginBottom: 12,
  },
});

export default AddTransactionScreen;