import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  ProgressBar,
  Button,
  Surface,
  Text,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Account, Transaction, DashboardData } from '../types';
import { StorageService } from '../services/StorageService';
import { TransactionService } from '../services/TransactionService';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboardData = async () => {
    try {
      const accounts = await StorageService.getAccounts();
      const recentTransactions = await TransactionService.getRecentTransactions(5);
      const totalExpenses = await TransactionService.getTotalExpenses();
      const totalIncome = await TransactionService.getTotalIncome();
      
      const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
      
      const goalsProgress = accounts
        .filter(account => account.goalAmount && account.goalAmount > 0)
        .map(account => ({
          id: account.id,
          accountId: account.id,
          targetAmount: account.goalAmount!,
          currentAmount: account.balance,
          description: account.goalDescription || '',
          isCompleted: account.balance >= account.goalAmount!,
        }));

      setDashboardData({
        totalBalance,
        totalExpenses,
        totalIncome,
        accounts,
        recentTransactions,
        goalsProgress,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const formatCurrency = (amount: number) => {
    return `Rs ${amount.toLocaleString()}`;
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

  if (!dashboardData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Total Balance Card */}
      <Card style={styles.totalBalanceCard}>
        <Card.Content>
          <Title style={styles.totalBalanceTitle}>Total Balance</Title>
          <Text style={styles.totalBalanceAmount}>
            {formatCurrency(dashboardData.totalBalance)}
          </Text>
        </Card.Content>
      </Card>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <Card style={styles.summaryCard}>
          <Card.Content style={styles.summaryContent}>
            <Icon name="trending-up" size={24} color="#4CAF50" />
            <View style={styles.summaryText}>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={styles.summaryAmount}>
                {formatCurrency(dashboardData.totalIncome)}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.summaryCard}>
          <Card.Content style={styles.summaryContent}>
            <Icon name="trending-down" size={24} color="#F44336" />
            <View style={styles.summaryText}>
              <Text style={styles.summaryLabel}>Expenses</Text>
              <Text style={styles.summaryAmount}>
                {formatCurrency(dashboardData.totalExpenses)}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Goals Progress */}
      {dashboardData.goalsProgress.length > 0 && (
        <Card style={styles.goalsCard}>
          <Card.Content>
            <Title>Goals Progress</Title>
            {dashboardData.goalsProgress.map((goal) => {
              const progress = goal.targetAmount > 0 ? goal.currentAmount / goal.targetAmount : 0;
              return (
                <View key={goal.id} style={styles.goalItem}>
                  <View style={styles.goalHeader}>
                    <Text style={styles.goalDescription}>{goal.description}</Text>
                    <Text style={styles.goalAmount}>
                      {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                    </Text>
                  </View>
                  <ProgressBar
                    progress={Math.min(progress, 1)}
                    color={progress >= 1 ? '#4CAF50' : '#2196F3'}
                    style={styles.progressBar}
                  />
                  <Text style={styles.goalRemaining}>
                    Remaining: {formatCurrency(Math.max(0, goal.targetAmount - goal.currentAmount))}
                  </Text>
                </View>
              );
            })}
          </Card.Content>
        </Card>
      )}

      {/* Accounts Overview */}
      <Card style={styles.accountsCard}>
        <Card.Content>
          <Title>Accounts</Title>
          {dashboardData.accounts.map((account) => (
            <Surface key={account.id} style={styles.accountItem}>
              <View style={styles.accountHeader}>
                <View style={styles.accountInfo}>
                  <Icon
                    name={getAccountIcon(account.type)}
                    size={20}
                    color={account.color}
                  />
                  <Text style={styles.accountName}>{account.name}</Text>
                </View>
                <Text style={styles.accountBalance}>
                  {formatCurrency(account.balance)}
                </Text>
              </View>
            </Surface>
          ))}
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Accounts' as never)}
            style={styles.viewAllButton}
          >
            View All Accounts
          </Button>
        </Card.Content>
      </Card>

      {/* Recent Transactions */}
      <Card style={styles.transactionsCard}>
        <Card.Content>
          <Title>Recent Transactions</Title>
          {dashboardData.recentTransactions.length > 0 ? (
            dashboardData.recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionDescription}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {transaction.date.toLocaleDateString()}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    {
                      color: transaction.type === 'income' ? '#4CAF50' : '#F44336',
                    },
                  ]}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noTransactions}>No transactions yet</Text>
          )}
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Transactions' as never)}
            style={styles.viewAllButton}
          >
            View All Transactions
          </Button>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <Card style={styles.actionsCard}>
        <Card.Content>
          <Title>Quick Actions</Title>
          <View style={styles.actionsContainer}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('AddTransaction' as never)}
              style={styles.actionButton}
              icon="plus"
            >
              Add Transaction
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('Accounts' as never)}
              style={styles.actionButton}
              icon="account-balance"
            >
              Manage Accounts
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
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
  totalBalanceCard: {
    margin: 16,
    backgroundColor: '#2196F3',
  },
  totalBalanceTitle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
  },
  totalBalanceAmount: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
  },
  summaryContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryText: {
    marginLeft: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  goalsCard: {
    margin: 16,
    marginTop: 0,
  },
  goalItem: {
    marginVertical: 8,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  goalDescription: {
    flex: 1,
    fontSize: 14,
  },
  goalAmount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginVertical: 4,
  },
  goalRemaining: {
    fontSize: 12,
    color: '#666',
  },
  accountsCard: {
    margin: 16,
    marginTop: 0,
  },
  accountItem: {
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountName: {
    marginLeft: 8,
    fontSize: 16,
  },
  accountBalance: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionsCard: {
    margin: 16,
    marginTop: 0,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '500',
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noTransactions: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    padding: 20,
  },
  actionsCard: {
    margin: 16,
    marginTop: 0,
    marginBottom: 32,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  viewAllButton: {
    marginTop: 16,
  },
});

export default DashboardScreen;