import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  Card,
  Title,
  Text,
  FAB,
  Chip,
  Searchbar,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Transaction, TransactionType } from '../types';
import { TransactionService } from '../services/TransactionService';
import { StorageService } from '../services/StorageService';

const TransactionsScreen = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<TransactionType | 'all'>('all');

  const loadData = async () => {
    try {
      const [transactionsData, accountsData] = await Promise.all([
        TransactionService.getTransactions(),
        StorageService.getAccounts(),
      ]);
      
      // Sort transactions by date (newest first)
      const sortedTransactions = transactionsData.sort(
        (a, b) => b.date.getTime() - a.date.getTime()
      );
      
      setTransactions(sortedTransactions);
      setFilteredTransactions(sortedTransactions);
      setAccounts(accountsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, searchQuery, selectedType]);

  const filterTransactions = () => {
    let filtered = transactions;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(transaction => transaction.type === selectedType);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const formatCurrency = (amount: number) => {
    return `Rs ${amount.toLocaleString()}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getAccountName = (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId);
    return account ? account.name : 'Unknown Account';
  };

  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case TransactionType.INCOME:
        return 'trending-up';
      case TransactionType.EXPENSE:
        return 'trending-down';
      case TransactionType.TRANSFER:
        return 'swap-horiz';
      default:
        return 'receipt';
    }
  };

  const getTransactionColor = (type: TransactionType) => {
    switch (type) {
      case TransactionType.INCOME:
        return '#4CAF50';
      case TransactionType.EXPENSE:
        return '#F44336';
      case TransactionType.TRANSFER:
        return '#2196F3';
      default:
        return '#666';
    }
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    const isIncome = item.type === TransactionType.INCOME;
    const isExpense = item.type === TransactionType.EXPENSE;
    const isTransfer = item.type === TransactionType.TRANSFER;

    return (
      <Card style={styles.transactionCard}>
        <Card.Content>
          <View style={styles.transactionHeader}>
            <View style={styles.transactionInfo}>
              <Icon
                name={getTransactionIcon(item.type)}
                size={24}
                color={getTransactionColor(item.type)}
              />
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionDescription}>
                  {item.description}
                </Text>
                <Text style={styles.transactionDate}>
                  {formatDate(item.date)}
                </Text>
                <Text style={styles.transactionCategory}>
                  {item.category}
                </Text>
              </View>
            </View>
            <View style={styles.transactionAmount}>
              <Text
                style={[
                  styles.amountText,
                  {
                    color: isIncome ? '#4CAF50' : isExpense ? '#F44336' : '#2196F3',
                  },
                ]}
              >
                {isIncome ? '+' : isExpense ? '-' : ''}
                {formatCurrency(item.amount)}
              </Text>
            </View>
          </View>

          {isTransfer && (
            <View style={styles.transferDetails}>
              <Text style={styles.transferText}>
                From: {getAccountName(item.fromAccountId)}
              </Text>
              <Text style={styles.transferText}>
                To: {getAccountName(item.toAccountId)}
              </Text>
            </View>
          )}

          {isIncome && (
            <View style={styles.transferDetails}>
              <Text style={styles.transferText}>
                To: {getAccountName(item.toAccountId)}
              </Text>
            </View>
          )}

          {isExpense && (
            <View style={styles.transferDetails}>
              <Text style={styles.transferText}>
                From: {getAccountName(item.fromAccountId)}
              </Text>
              <Text style={styles.transferText}>
                To: {getAccountName(item.toAccountId)}
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="receipt" size={64} color="#ccc" />
      <Text style={styles.emptyStateText}>No transactions found</Text>
      <Text style={styles.emptyStateSubtext}>
        {searchQuery || selectedType !== 'all'
          ? 'Try adjusting your filters'
          : 'Add your first transaction to get started'}
      </Text>
    </View>
  );

  const renderFilterChips = () => (
    <View style={styles.filterContainer}>
      <Chip
        selected={selectedType === 'all'}
        onPress={() => setSelectedType('all')}
        style={styles.filterChip}
      >
        All
      </Chip>
      <Chip
        selected={selectedType === TransactionType.INCOME}
        onPress={() => setSelectedType(TransactionType.INCOME)}
        style={styles.filterChip}
        icon="trending-up"
      >
        Income
      </Chip>
      <Chip
        selected={selectedType === TransactionType.EXPENSE}
        onPress={() => setSelectedType(TransactionType.EXPENSE)}
        style={styles.filterChip}
        icon="trending-down"
      >
        Expense
      </Chip>
      <Chip
        selected={selectedType === TransactionType.TRANSFER}
        onPress={() => setSelectedType(TransactionType.TRANSFER)}
        style={styles.filterChip}
        icon="swap-horiz"
      >
        Transfer
      </Chip>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading transactions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search transactions..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
        {renderFilterChips()}
      </View>

      <FlatList
        data={filteredTransactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddTransaction' as never)}
        label="Add Transaction"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  searchbar: {
    marginBottom: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  transactionCard: {
    marginBottom: 12,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  transactionInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  transactionDetails: {
    marginLeft: 12,
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  transactionCategory: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transferDetails: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#F8F9FA',
    borderRadius: 6,
  },
  transferText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#666',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default TransactionsScreen;