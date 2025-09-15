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
  Button,
  ProgressBar,
  Surface,
} from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Account, Transaction, TransactionType } from '../types';
import { StorageService } from '../services/StorageService';
import { TransactionService } from '../services/TransactionService';

const AccountDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [account, setAccount] = useState<Account | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const params = route.params as { account: Account };

  useEffect(() => {
    if (params?.account) {
      setAccount(params.account);
      loadAccountTransactions(params.account.id);
    }
  }, [params]);

  const loadAccountTransactions = async (accountId: string) => {
    try {
      const accountTransactions = await TransactionService.getTransactionsByAccount(accountId);
      setTransactions(accountTransactions.sort((a, b) => b.date.getTime() - a.date.getTime()));
    } catch (error) {
      console.error('Error loading account transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (account) {
      await loadAccountTransactions(account.id);
    }
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

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'bank':
        return 'account-balance';
      case 'cash':
        return 'money';
      case 'expense':
        return 'shopping-cart';
      case 'savings':
        return 'savings';
      default:
        return 'account-balance-wallet';
    }
  };

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'bank':
        return '#2196F3';
      case 'cash':
        return '#4CAF50';
      case 'expense':
        return '#FF9800';
      case 'savings':
        return '#9C27B0';
      default:
        return '#666';
    }
  };

  const getTransactionIcon = (type: TransactionType, fromAccountId: string) => {
    const isIncoming = fromAccountId !== account?.id;
    
    switch (type) {
      case TransactionType.INCOME:
        return 'trending-up';
      case TransactionType.EXPENSE:
        return 'trending-down';
      case TransactionType.TRANSFER:
        return isIncoming ? 'arrow-downward' : 'arrow-upward';
      default:
        return 'receipt';
    }
  };

  const getTransactionColor = (type: TransactionType, fromAccountId: string) => {
    const isIncoming = fromAccountId !== account?.id;
    
    switch (type) {
      case TransactionType.INCOME:
        return '#4CAF50';
      case TransactionType.EXPENSE:
        return '#F44336';
      case TransactionType.TRANSFER:
        return isIncoming ? '#4CAF50' : '#F44336';
      default:
        return '#666';
    }
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    const isIncoming = item.fromAccountId !== account?.id;
    const isOutgoing = item.toAccountId !== account?.id && item.fromAccountId === account?.id;

    return (
      <Card style={styles.transactionCard}>
        <Card.Content>
          <View style={styles.transactionHeader}>
            <View style={styles.transactionInfo}>
              <Icon
                name={getTransactionIcon(item.type, item.fromAccountId)}
                size={24}
                color={getTransactionColor(item.type, item.fromAccountId)}
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
                    color: getTransactionColor(item.type, item.fromAccountId),
                  },
                ]}
              >
                {isIncoming ? '+' : '-'}
                {formatCurrency(item.amount)}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="receipt" size={64} color="#ccc" />
      <Text style={styles.emptyStateText}>No transactions found</Text>
      <Text style={styles.emptyStateSubtext}>
        This account doesn't have any transactions yet
      </Text>
    </View>
  );

  if (loading || !account) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading account details...</Text>
      </View>
    );
  }

  const progress = account.goalAmount && account.goalAmount > 0 
    ? Math.min(account.balance / account.goalAmount, 1) 
    : 0;

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            {/* Account Info Card */}
            <Card style={styles.accountCard}>
              <Card.Content>
                <View style={styles.accountHeader}>
                  <View style={styles.accountInfo}>
                    <Icon
                      name={getAccountIcon(account.type)}
                      size={32}
                      color={getAccountTypeColor(account.type)}
                    />
                    <View style={styles.accountDetails}>
                      <Title style={styles.accountName}>{account.name}</Title>
                      <Text style={styles.accountType}>
                        {account.type.charAt(0).toUpperCase() + account.type.slice(1)} Account
                      </Text>
                    </View>
                  </View>
                  <View style={styles.accountBalance}>
                    <Text style={styles.balanceAmount}>
                      {formatCurrency(account.balance)}
                    </Text>
                  </View>
                </View>

                {/* Goal Progress */}
                {account.goalAmount && account.goalAmount > 0 && (
                  <View style={styles.goalSection}>
                    <View style={styles.goalHeader}>
                      <Text style={styles.goalDescription}>
                        {account.goalDescription || 'Goal Progress'}
                      </Text>
                      <Text style={styles.goalProgress}>
                        {Math.round(progress * 100)}%
                      </Text>
                    </View>
                    <ProgressBar
                      progress={progress}
                      color={progress >= 1 ? '#4CAF50' : '#2196F3'}
                      style={styles.progressBar}
                    />
                    <View style={styles.goalAmounts}>
                      <Text style={styles.goalCurrent}>
                        Current: {formatCurrency(account.balance)}
                      </Text>
                      <Text style={styles.goalTarget}>
                        Target: {formatCurrency(account.goalAmount)}
                      </Text>
                    </View>
                    <Text style={styles.goalRemaining}>
                      Remaining: {formatCurrency(Math.max(0, account.goalAmount - account.balance))}
                    </Text>
                  </View>
                )}

                {/* Quick Actions */}
                <View style={styles.actionsContainer}>
                  <Button
                    mode="contained"
                    onPress={() => navigation.navigate('AddTransaction' as never, { 
                      fromAccount: account 
                    } as never)}
                    style={styles.actionButton}
                    icon="plus"
                  >
                    Add Transaction
                  </Button>
                </View>
              </Card.Content>
            </Card>

            {/* Transaction History Header */}
            <View style={styles.transactionHeader}>
              <Title>Transaction History</Title>
              <Text style={styles.transactionCount}>
                {transactions.length} transactions
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
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
  },
  accountCard: {
    marginBottom: 16,
    elevation: 2,
  },
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  accountDetails: {
    marginLeft: 12,
    flex: 1,
  },
  accountName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  accountType: {
    fontSize: 14,
    color: '#666',
  },
  accountBalance: {
    alignItems: 'flex-end',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  goalSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  goalDescription: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  goalProgress: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginVertical: 8,
  },
  goalAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  goalCurrent: {
    fontSize: 14,
    color: '#666',
  },
  goalTarget: {
    fontSize: 14,
    color: '#666',
  },
  goalRemaining: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F44336',
  },
  actionsContainer: {
    marginTop: 16,
  },
  actionButton: {
    marginBottom: 8,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionCount: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 16,
  },
  transactionCard: {
    marginBottom: 12,
    marginHorizontal: 16,
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
});

export default AccountDetailScreen;