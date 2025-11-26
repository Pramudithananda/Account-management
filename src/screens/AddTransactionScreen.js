import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppContext } from '../../app';

export default function AddTransactionScreen({ navigation }) {
  const { accounts, setAccounts, transactions, setTransactions, categories, darkMode } = useContext(AppContext);
  
  const [transactionType, setTransactionType] = useState('expense'); // 'income' or 'expense'
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    accountType: 'bank', // 'bank' or 'cash'
    accountId: '',
    categoryId: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });
  
  const styles = getStyles(darkMode);
  
  const handleSave = () => {
    // Validation
    if (!formData.description || !formData.amount) {
      Alert.alert('දෝෂය', 'කරුණාකර විස්තර සහ මුදල ඇතුලත් කරන්න');
      return;
    }
    
    if (!formData.accountId) {
      Alert.alert('දෝෂය', 'කරුණාකර ගිණුමක් තෝරන්න');
      return;
    }
    
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('දෝෂය', 'වලංගු මුදලක් ඇතුලත් කරන්න');
      return;
    }
    
    // Create transaction
    const newTransaction = {
      id: Date.now().toString(),
      description: formData.description,
      amount: transactionType === 'expense' ? -amount : amount,
      accountType: formData.accountType,
      accountId: formData.accountId,
      categoryId: formData.categoryId,
      type: transactionType,
      date: formData.date,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
    };
    
    // Update account balance
    const updatedAccounts = { ...accounts };
    const accountList = formData.accountType === 'bank' ? updatedAccounts.bank : updatedAccounts.cash;
    const accountIndex = accountList.findIndex(acc => acc.id === formData.accountId);
    
    if (accountIndex !== -1) {
      accountList[accountIndex].balance += newTransaction.amount;
    }
    
    // Update transactions
    setTransactions([newTransaction, ...transactions]);
    setAccounts(updatedAccounts);
    
    Alert.alert(
      'සාර්ථකයි',
      'ගනුදෙනුව සාර්ථකව එක් කරන ලදි',
      [
        { text: 'හරි', onPress: () => navigation.goBack() }
      ]
    );
  };
  
  const getAccountsList = () => {
    return formData.accountType === 'bank' ? accounts.bank : accounts.cash;
  };
  
  return (
    <ScrollView style={styles.container}>
      {/* Transaction Type Selector */}
      <View style={styles.typeSelector}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            transactionType === 'expense' && styles.typeButtonActive,
            transactionType === 'expense' && styles.typeButtonExpense
          ]}
          onPress={() => setTransactionType('expense')}
        >
          <Icon 
            name="arrow-down" 
            size={24} 
            color={transactionType === 'expense' ? '#fff' : (darkMode ? '#94a3b8' : '#64748b')} 
          />
          <Text style={[
            styles.typeButtonText,
            transactionType === 'expense' && styles.typeButtonTextActive
          ]}>
            වියදම
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.typeButton,
            transactionType === 'income' && styles.typeButtonActive,
            transactionType === 'income' && styles.typeButtonIncome
          ]}
          onPress={() => setTransactionType('income')}
        >
          <Icon 
            name="arrow-up" 
            size={24} 
            color={transactionType === 'income' ? '#fff' : (darkMode ? '#94a3b8' : '#64748b')} 
          />
          <Text style={[
            styles.typeButtonText,
            transactionType === 'income' && styles.typeButtonTextActive
          ]}>
            ආදායම
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Form */}
      <View style={styles.formContainer}>
        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>විස්තර *</Text>
          <TextInput
            style={styles.input}
            placeholder="ගනුදෙනු විස්තර"
            placeholderTextColor="#6b7280"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
          />
        </View>
        
        {/* Amount */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>මුදල (රු) *</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>රු</Text>
            <TextInput
              style={[styles.input, styles.amountInput]}
              placeholder="0.00"
              placeholderTextColor="#6b7280"
              keyboardType="numeric"
              value={formData.amount}
              onChangeText={(text) => setFormData({ ...formData, amount: text })}
            />
          </View>
        </View>
        
        {/* Account Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>ගිණුම් වර්ගය *</Text>
          <View style={styles.accountTypeSelector}>
            <TouchableOpacity
              style={[
                styles.accountTypeButton,
                formData.accountType === 'bank' && styles.accountTypeButtonActive
              ]}
              onPress={() => setFormData({ ...formData, accountType: 'bank', accountId: '' })}
            >
              <Icon name="bank" size={20} color={formData.accountType === 'bank' ? '#6366f1' : '#6b7280'} />
              <Text style={[
                styles.accountTypeText,
                formData.accountType === 'bank' && styles.accountTypeTextActive
              ]}>
                බැංකුව
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.accountTypeButton,
                formData.accountType === 'cash' && styles.accountTypeButtonActive
              ]}
              onPress={() => setFormData({ ...formData, accountType: 'cash', accountId: '' })}
            >
              <Icon name="cash" size={20} color={formData.accountType === 'cash' ? '#10b981' : '#6b7280'} />
              <Text style={[
                styles.accountTypeText,
                formData.accountType === 'cash' && styles.accountTypeTextActive
              ]}>
                මුදල්
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Select Account */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>ගිණුම තෝරන්න *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.accountList}>
            {getAccountsList().map(account => (
              <TouchableOpacity
                key={account.id}
                style={[
                  styles.accountCard,
                  formData.accountId === account.id && styles.accountCardActive,
                  { borderLeftColor: account.color || '#6366f1' }
                ]}
                onPress={() => setFormData({ ...formData, accountId: account.id })}
              >
                <View style={[styles.accountColorDot, { backgroundColor: account.color || '#6366f1' }]} />
                <Text style={styles.accountName}>{account.name}</Text>
                <Text style={styles.accountBalance}>රු {account.balance.toLocaleString()}</Text>
              </TouchableOpacity>
            ))}
            
            {getAccountsList().length === 0 && (
              <View style={styles.noAccountsCard}>
                <Text style={styles.noAccountsText}>ගිණුම් නැත</Text>
              </View>
            )}
          </ScrollView>
        </View>
        
        {/* Category (for expenses) */}
        {transactionType === 'expense' && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>කාණ්ඩය</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
              <TouchableOpacity
                style={[
                  styles.categoryChip,
                  !formData.categoryId && styles.categoryChipActive
                ]}
                onPress={() => setFormData({ ...formData, categoryId: '' })}
              >
                <Text style={styles.categoryChipText}>කිසිවක් නැත</Text>
              </TouchableOpacity>
              
              {categories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryChip,
                    formData.categoryId === category.id && styles.categoryChipActive
                  ]}
                  onPress={() => setFormData({ ...formData, categoryId: category.id })}
                >
                  <Text style={styles.categoryChipText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        
        {/* Date */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>දිනය</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#6b7280"
            value={formData.date}
            onChangeText={(text) => setFormData({ ...formData, date: text })}
          />
        </View>
        
        {/* Notes */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>සටහන්</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            placeholder="අමතර විස්තර (අත්‍යවශ්‍ය නොවේ)"
            placeholderTextColor="#6b7280"
            multiline
            numberOfLines={4}
            value={formData.notes}
            onChangeText={(text) => setFormData({ ...formData, notes: text })}
          />
        </View>
        
        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            { backgroundColor: transactionType === 'expense' ? '#ef4444' : '#10b981' }
          ]}
          onPress={handleSave}
        >
          <Icon name="check" size={24} color="#fff" />
          <Text style={styles.saveButtonText}>ගනුදෙනුව එක් කරන්න</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const getStyles = (darkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkMode ? '#0f172a' : '#f1f5f9',
  },
  typeSelector: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    gap: 10,
  },
  typeButtonActive: {
    transform: [{ scale: 1.02 }],
  },
  typeButtonExpense: {
    backgroundColor: '#ef4444',
  },
  typeButtonIncome: {
    backgroundColor: '#10b981',
  },
  typeButtonText: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 16,
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  formContainer: {
    padding: 15,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    color: darkMode ? '#fff' : '#1e293b',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    borderRadius: 10,
    paddingLeft: 15,
  },
  currencySymbol: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  accountTypeSelector: {
    flexDirection: 'row',
    gap: 10,
  },
  accountTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    gap: 8,
  },
  accountTypeButtonActive: {
    borderWidth: 2,
    borderColor: darkMode ? '#6366f1' : '#6366f1',
  },
  accountTypeText: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
    fontWeight: '600',
  },
  accountTypeTextActive: {
    color: darkMode ? '#fff' : '#1e293b',
  },
  accountList: {
    flexDirection: 'row',
  },
  accountCard: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    minWidth: 120,
    borderLeftWidth: 4,
  },
  accountCardActive: {
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  accountColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  accountName: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  accountBalance: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 12,
  },
  noAccountsCard: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noAccountsText: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
  },
  categoryList: {
    flexDirection: 'row',
  },
  categoryChip: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryChipActive: {
    backgroundColor: '#8b5cf6',
  },
  categoryChipText: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
    fontWeight: '600',
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 10,
    gap: 10,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
