import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  Button,
  FAB,
  Text,
  Surface,
  IconButton,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Account, AccountType } from '../types';
import { StorageService } from '../services/StorageService';

const AccountsScreen = () => {
  const navigation = useNavigation();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAccounts = async () => {
    try {
      const accountsData = await StorageService.getAccounts();
      setAccounts(accountsData);
    } catch (error) {
      console.error('Error loading accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const formatCurrency = (amount: number) => {
    return `Rs ${amount.toLocaleString()}`;
  };

  const getAccountIcon = (type: AccountType) => {
    switch (type) {
      case AccountType.BANK:
        return 'account-balance';
      case AccountType.CASH:
        return 'money';
      case AccountType.EXPENSE:
        return 'shopping-cart';
      case AccountType.SAVINGS:
        return 'savings';
      default:
        return 'account-balance-wallet';
    }
  };

  const getAccountTypeColor = (type: AccountType) => {
    switch (type) {
      case AccountType.BANK:
        return '#2196F3';
      case AccountType.CASH:
        return '#4CAF50';
      case AccountType.EXPENSE:
        return '#FF9800';
      case AccountType.SAVINGS:
        return '#9C27B0';
      default:
        return '#666';
    }
  };

  const handleAccountPress = (account: Account) => {
    navigation.navigate('AccountDetail' as never, { account } as never);
  };

  const handleAddAccount = () => {
    Alert.alert(
      'Add New Account',
      'This feature will be implemented in the next version.',
      [{ text: 'OK' }]
    );
  };

  const renderAccountItem = ({ item }: { item: Account }) => {
    const progress = item.goalAmount && item.goalAmount > 0 
      ? Math.min(item.balance / item.goalAmount, 1) 
      : 0;

    return (
      <Card 
        style={styles.accountCard}
        onPress={() => handleAccountPress(item)}
      >
        <Card.Content>
          <View style={styles.accountHeader}>
            <View style={styles.accountInfo}>
              <Icon
                name={getAccountIcon(item.type)}
                size={24}
                color={getAccountTypeColor(item.type)}
              />
              <View style={styles.accountDetails}>
                <Title style={styles.accountName}>{item.name}</Title>
                <Text style={styles.accountType}>
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)} Account
                </Text>
              </View>
            </View>
            <View style={styles.accountBalance}>
              <Text style={styles.balanceAmount}>
                {formatCurrency(item.balance)}
              </Text>
              {item.goalAmount && item.goalAmount > 0 && (
                <Text style={styles.goalText}>
                  Goal: {formatCurrency(item.goalAmount)}
                </Text>
              )}
            </View>
          </View>

          {item.goalAmount && item.goalAmount > 0 && (
            <View style={styles.goalSection}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalDescription}>
                  {item.goalDescription || 'Goal Progress'}
                </Text>
                <Text style={styles.goalProgress}>
                  {Math.round(progress * 100)}%
                </Text>
              </View>
              <View style={styles.progressContainer}>
                <View 
                  style={[
                    styles.progressBar,
                    {
                      width: `${progress * 100}%`,
                      backgroundColor: progress >= 1 ? '#4CAF50' : '#2196F3',
                    }
                  ]}
                />
              </View>
              <Text style={styles.goalRemaining}>
                Remaining: {formatCurrency(Math.max(0, item.goalAmount - item.balance))}
              </Text>
            </View>
          )}

          <View style={styles.accountActions}>
            <Button
              mode="outlined"
              compact
              onPress={() => handleAccountPress(item)}
              style={styles.actionButton}
            >
              View Details
            </Button>
            <Button
              mode="outlined"
              compact
              onPress={() => {
                navigation.navigate('AddTransaction' as never, { 
                  fromAccount: item 
                } as never);
              }}
              style={styles.actionButton}
            >
              Add Transaction
            </Button>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="account-balance-wallet" size={64} color="#ccc" />
      <Text style={styles.emptyStateText}>No accounts found</Text>
      <Text style={styles.emptyStateSubtext}>
        Add your first account to start tracking your finances
      </Text>
      <Button
        mode="contained"
        onPress={handleAddAccount}
        style={styles.emptyStateButton}
      >
        Add Account
      </Button>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading accounts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={accounts}
        renderItem={renderAccountItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
      
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAddAccount}
        label="Add Account"
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
  listContainer: {
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
    marginBottom: 12,
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
    fontSize: 18,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  goalText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  goalSection: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  goalDescription: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  goalProgress: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  goalRemaining: {
    fontSize: 12,
    color: '#666',
  },
  accountActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
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
    marginBottom: 24,
  },
  emptyStateButton: {
    marginTop: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default AccountsScreen;