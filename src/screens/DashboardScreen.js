import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppContext } from '../../App';

export default function DashboardScreen({ navigation }) {
  const { accounts, transactions, darkMode } = useContext(AppContext);
  
  // Calculate totals
  const totalBank = accounts.bank.reduce((sum, acc) => sum + (acc.balance || 0), 0);
  const totalCash = accounts.cash.reduce((sum, acc) => sum + (acc.balance || 0), 0);
  const totalReturns = accounts.returns.reduce((sum, acc) => sum + (acc.balance || 0), 0);
  
  const styles = getStyles(darkMode);
  
  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <Text style={styles.transactionDate}>{item.date}</Text>
        <Text style={styles.transactionDesc}>{item.description}</Text>
        <View style={styles.transactionTags}>
          <Icon name="pencil" size={16} color="#6366f1" />
          <Text style={styles.tagText}>සංස්කරණය</Text>
          <Icon name="delete" size={16} color="#ef4444" style={{ marginLeft: 10 }} />
          <Text style={styles.tagText}>මකන්න</Text>
        </View>
      </View>
      <Text style={[styles.transactionAmount, item.amount < 0 && styles.negativeAmount]}>
        රු {item.amount.toLocaleString()}
      </Text>
    </View>
  );
  
  return (
    <ScrollView style={styles.container}>
      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <TouchableOpacity 
          style={[styles.card, styles.cashCard]}
          onPress={() => navigation.navigate('Cash')}
        >
          <Text style={styles.cardTitle}>පුබුන මුදල්</Text>
          <Text style={styles.cardAmount}>රු {totalCash.toLocaleString()}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.card, styles.expenseCard]}
          onPress={() => navigation.navigate('Categories')}
        >
          <Text style={styles.cardTitle}>ඇත්නික්කා මුදල්</Text>
          <Text style={styles.cardAmount}>රු 24,500</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.card, styles.returnCard]}
        >
          <Text style={styles.cardTitle}>Return</Text>
          <Text style={styles.cardAmount}>රු {totalReturns.toLocaleString()}</Text>
        </TouchableOpacity>
      </View>
      
      {/* Action Buttons */}
      <TouchableOpacity 
        style={[styles.actionButton, styles.bankButton]}
        onPress={() => navigation.navigate('Bank')}
      >
        <Icon name="bank" size={24} color="#fff" />
        <Text style={styles.actionButtonText}>බැංකු නැතානාද</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.actionButton, styles.withdrawButton]}
        onPress={() => navigation.navigate('AddTransaction')}
      >
        <Icon name="cash" size={24} color="#fff" />
        <Text style={styles.actionButtonText}>බැංකු Withdraw</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.actionButton, styles.chartButton]}
      >
        <Icon name="chart-line" size={24} color="#fff" />
        <Text style={styles.actionButtonText}>විදියම කරන්න</Text>
      </TouchableOpacity>
      
      {/* Recent Transactions */}
      <View style={styles.transactionsSection}>
        <Text style={styles.sectionTitle}>මානකාලික ගනුදෙනු</Text>
        
        {transactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="clipboard-text-outline" size={48} color="#6b7280" />
            <Text style={styles.emptyText}>ගනුදෙනු නැත</Text>
          </View>
        ) : (
          <FlatList
            data={transactions.slice(0, 10)}
            renderItem={renderTransaction}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        )}
      </View>
      
      {/* Add Transaction Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AddTransaction')}
      >
        <Icon name="plus" size={28} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const getStyles = (darkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkMode ? '#0f172a' : '#f1f5f9',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    gap: 10,
  },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 15,
    minHeight: 120,
    justifyContent: 'center',
  },
  cashCard: {
    backgroundColor: '#eab308',
  },
  expenseCard: {
    backgroundColor: '#ef4444',
  },
  returnCard: {
    backgroundColor: '#f87171',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  cardAmount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 15,
    gap: 10,
  },
  bankButton: {
    backgroundColor: '#6366f1',
  },
  withdrawButton: {
    backgroundColor: '#10b981',
  },
  chartButton: {
    backgroundColor: '#ef4444',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  transactionsSection: {
    padding: 15,
    marginTop: 10,
  },
  sectionTitle: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 15,
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  transactionLeft: {
    flex: 1,
  },
  transactionDate: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 12,
    marginBottom: 5,
  },
  transactionDesc: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 14,
    marginBottom: 8,
  },
  transactionTags: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 12,
    marginLeft: 5,
  },
  transactionAmount: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: 'bold',
  },
  negativeAmount: {
    color: '#ef4444',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 16,
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});