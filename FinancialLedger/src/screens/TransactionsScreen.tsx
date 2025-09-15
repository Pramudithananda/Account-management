import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  Searchbar,
  Chip,
  IconButton,
  Portal,
  Dialog,
  Paragraph,
  Button,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useApp } from '../context/AppContext';
import { Transaction } from '../types';
import moment from 'moment';

const TransactionsScreen: React.FC = () => {
  const { transactions, accounts, categories, deleteTransaction } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);

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

  const getAccountName = (accountId?: string) => {
    if (!accountId) return '';
    const account = accounts.find(a => a.id === accountId);
    return account?.name || '';
  };

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return '';
    const category = categories.find(c => c.id === categoryId);
    return category?.name || '';
  };

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(t => t.type === selectedType);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(query) ||
        t.reference?.toLowerCase().includes(query) ||
        getAccountName(t.fromAccount).toLowerCase().includes(query) ||
        getAccountName(t.toAccount).toLowerCase().includes(query) ||
        getCategoryName(t.category).toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [transactions, selectedType, searchQuery, accounts, categories]);

  const groupedTransactions = useMemo(() => {
    const groups: { [key: string]: Transaction[] } = {};
    
    filteredTransactions.forEach(transaction => {
      const date = moment(transaction.date).format('YYYY-MM-DD');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
    });

    return Object.entries(groups).map(([date, items]) => ({
      date,
      items,
    })).sort((a, b) => b.date.localeCompare(a.date));
  }, [filteredTransactions]);

  const confirmDelete = (transactionId: string) => {
    setTransactionToDelete(transactionId);
    setDeleteDialogVisible(true);
  };

  const handleDelete = async () => {
    if (transactionToDelete) {
      try {
        await deleteTransaction(transactionToDelete);
        Alert.alert('සාර්ථකයි', 'ගනුදෙනුව මකා දමන ලදි');
      } catch (error) {
        Alert.alert('දෝෂය', 'ගනුදෙනුව මකා දැමීමේදී දෝෂයක් ඇති විය');
      }
    }
    setDeleteDialogVisible(false);
    setTransactionToDelete(null);
  };

  const renderTransaction = ({ item }: { item: Transaction }) => {
    const color = getTransactionColor(item.type);
    
    return (
      <Card style={styles.transactionCard}>
        <Card.Content>
          <View style={styles.transactionRow}>
            <MaterialCommunityIcons
              name={getTransactionIcon(item.type) as any}
              size={36}
              color={color}
            />
            
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionDescription}>{item.description}</Text>
              
              {item.type === 'transfer' && (
                <Text style={styles.transactionMeta}>
                  {getAccountName(item.fromAccount)} → {getAccountName(item.toAccount)}
                </Text>
              )}
              
              {item.type === 'income' && (
                <Text style={styles.transactionMeta}>
                  {getAccountName(item.toAccount)}
                </Text>
              )}
              
              {item.type === 'expense' && (
                <Text style={styles.transactionMeta}>
                  {getAccountName(item.fromAccount)}
                  {item.category && ` • ${getCategoryName(item.category)}`}
                </Text>
              )}
              
              {item.reference && (
                <Text style={styles.transactionReference}>යොමුව: {item.reference}</Text>
              )}
              
              <Text style={styles.transactionTime}>
                {moment(item.date).format('HH:mm')}
              </Text>
            </View>
            
            <View style={styles.transactionRight}>
              <Text style={[styles.transactionAmount, { color }]}>
                {item.type === 'income' ? '+' : item.type === 'expense' ? '-' : ''}
                {formatCurrency(item.amount)}
              </Text>
              <IconButton
                icon="delete"
                size={20}
                onPress={() => confirmDelete(item.id)}
              />
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderDateGroup = ({ item }: { item: { date: string; items: Transaction[] } }) => {
    const isToday = moment(item.date).isSame(moment(), 'day');
    const isYesterday = moment(item.date).isSame(moment().subtract(1, 'day'), 'day');
    
    let dateLabel = moment(item.date).format('YYYY MMMM DD');
    if (isToday) dateLabel = 'අද';
    else if (isYesterday) dateLabel = 'ඊයේ';
    
    return (
      <View>
        <Text style={styles.dateHeader}>{dateLabel}</Text>
        {item.items.map(transaction => (
          <View key={transaction.id}>
            {renderTransaction({ item: transaction })}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>ගනුදෙනු</Title>
        
        <Searchbar
          placeholder="සොයන්න..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        
        <View style={styles.filterChips}>
          <Chip
            selected={selectedType === 'all'}
            onPress={() => setSelectedType('all')}
            style={styles.chip}
          >
            සියල්ල
          </Chip>
          <Chip
            selected={selectedType === 'income'}
            onPress={() => setSelectedType('income')}
            style={styles.chip}
          >
            ආදායම්
          </Chip>
          <Chip
            selected={selectedType === 'expense'}
            onPress={() => setSelectedType('expense')}
            style={styles.chip}
          >
            වියදම්
          </Chip>
          <Chip
            selected={selectedType === 'transfer'}
            onPress={() => setSelectedType('transfer')}
            style={styles.chip}
          >
            මාරු කිරීම්
          </Chip>
        </View>
      </View>
      
      {groupedTransactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="receipt" size={64} color="#ccc" />
          <Text style={styles.emptyText}>ගනුදෙනු නොමැත</Text>
        </View>
      ) : (
        <FlatList
          data={groupedTransactions}
          renderItem={renderDateGroup}
          keyExtractor={item => item.date}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={() => setDeleteDialogVisible(false)}>
          <Dialog.Title>තහවුරු කරන්න</Dialog.Title>
          <Dialog.Content>
            <Paragraph>මෙම ගනුදෙනුව මකා දැමීමට අවශ්‍යද?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>අවලංගු කරන්න</Button>
            <Button onPress={handleDelete} textColor="#f44336">මකා දමන්න</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
  },
  searchBar: {
    marginBottom: 12,
    elevation: 0,
    backgroundColor: '#f5f5f5',
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  listContent: {
    padding: 16,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  transactionCard: {
    marginBottom: 8,
    elevation: 1,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 12,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  transactionMeta: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  transactionReference: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  transactionTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
});

export default TransactionsScreen;