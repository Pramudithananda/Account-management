import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Card, Title, Paragraph, Avatar, Button, ProgressBar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useApp } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { accounts, transactions, categories, loading, refreshData } = useApp();
  const [refreshing, setRefreshing] = React.useState(false);

  const bankAccount = accounts.find(a => a.type === 'bank');
  const cashAccount = accounts.find(a => a.type === 'cash');
  
  const recentTransactions = transactions.slice(0, 5);
  
  const totalExpenses = categories.reduce((sum, cat) => sum + cat.currentAmount, 0);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refreshData();
    setRefreshing(false);
  }, [refreshData]);

  const formatCurrency = (amount: number) => {
    return `රු ${amount.toLocaleString('si-LK', { minimumFractionDigits: 2 })}`;
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'income':
        return 'arrow-down-circle';
      case 'expense':
        return 'arrow-up-circle';
      case 'transfer':
        return 'swap-horizontal-circle';
      default:
        return 'circle';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'income':
        return '#4CAF50';
      case 'expense':
        return '#f44336';
      case 'transfer':
        return '#2196F3';
      default:
        return '#757575';
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>මූල්‍ය පොත</Text>
        <Text style={styles.headerSubtitle}>Financial Ledger</Text>
      </View>

      {/* Account Cards */}
      <View style={styles.accountsContainer}>
        <Card style={[styles.accountCard, { backgroundColor: '#4CAF50' }]}>
          <Card.Content>
            <View style={styles.accountHeader}>
              <MaterialCommunityIcons name="bank" size={30} color="white" />
              <Text style={styles.accountType}>බැංකු ගිණුම</Text>
            </View>
            <Text style={styles.accountBalance}>
              {formatCurrency(bankAccount?.balance || 0)}
            </Text>
          </Card.Content>
        </Card>

        <Card style={[styles.accountCard, { backgroundColor: '#2196F3' }]}>
          <Card.Content>
            <View style={styles.accountHeader}>
              <MaterialCommunityIcons name="cash" size={30} color="white" />
              <Text style={styles.accountType}>අතැති මුදල්</Text>
            </View>
            <Text style={styles.accountBalance}>
              {formatCurrency(cashAccount?.balance || 0)}
            </Text>
          </Card.Content>
        </Card>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Transfer')}
        >
          <MaterialCommunityIcons name="bank-transfer" size={30} color="#4CAF50" />
          <Text style={styles.actionText}>මුදල් මාරු කරන්න</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Expense')}
        >
          <MaterialCommunityIcons name="cart" size={30} color="#FF9800" />
          <Text style={styles.actionText}>වියදම් එකතු කරන්න</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Income')}
        >
          <MaterialCommunityIcons name="cash-plus" size={30} color="#4CAF50" />
          <Text style={styles.actionText}>ආදායම් එකතු කරන්න</Text>
        </TouchableOpacity>
      </View>

      {/* Expense Categories */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title>වියදම් කාණ්ඩ</Title>
            <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
              <Text style={styles.seeAll}>සියල්ල බලන්න</Text>
            </TouchableOpacity>
          </View>
          
          {categories.slice(0, 4).map((category) => {
            const progress = category.targetAmount > 0 
              ? category.currentAmount / category.targetAmount 
              : 0;
            
            return (
              <View key={category.id} style={styles.categoryItem}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryInfo}>
                    <MaterialCommunityIcons 
                      name={category.icon as any} 
                      size={24} 
                      color={category.color} 
                    />
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </View>
                  <Text style={styles.categoryAmount}>
                    {formatCurrency(category.currentAmount)}
                  </Text>
                </View>
                <ProgressBar
                  progress={Math.min(progress, 1)}
                  color={progress > 1 ? '#f44336' : category.color}
                  style={styles.progressBar}
                />
                <Text style={styles.categoryTarget}>
                  ඉලක්කය: {formatCurrency(category.targetAmount)}
                </Text>
              </View>
            );
          })}
        </Card.Content>
      </Card>

      {/* Recent Transactions */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title>මෑත ගනුදෙනු</Title>
            <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
              <Text style={styles.seeAll}>සියල්ල බලන්න</Text>
            </TouchableOpacity>
          </View>
          
          {recentTransactions.length === 0 ? (
            <Text style={styles.emptyText}>ගනුදෙනු නොමැත</Text>
          ) : (
            recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <MaterialCommunityIcons
                  name={getTransactionIcon(transaction.type) as any}
                  size={36}
                  color={getTransactionColor(transaction.type)}
                />
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionDescription}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {moment(transaction.date).format('YYYY-MM-DD HH:mm')}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    { color: getTransactionColor(transaction.type) },
                  ]}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </Text>
              </View>
            ))
          )}
        </Card.Content>
      </Card>

      {/* Summary Card */}
      <Card style={[styles.card, styles.summaryCard]}>
        <Card.Content>
          <Title>සාරාංශය</Title>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>මුළු ශේෂය:</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency((bankAccount?.balance || 0) + (cashAccount?.balance || 0))}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>මුළු වියදම්:</Text>
            <Text style={[styles.summaryValue, { color: '#f44336' }]}>
              {formatCurrency(totalExpenses)}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200EE',
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  accountsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: -30,
  },
  accountCard: {
    flex: 1,
    marginHorizontal: 8,
    elevation: 4,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  accountType: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
  },
  accountBalance: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  actionButton: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    minWidth: 100,
  },
  actionText: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAll: {
    color: '#6200EE',
    fontSize: 14,
  },
  categoryItem: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryName: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  categoryTarget: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 12,
  },
  transactionDescription: {
    fontSize: 14,
    color: '#333',
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    paddingVertical: 20,
  },
  summaryCard: {
    marginBottom: 32,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default DashboardScreen;