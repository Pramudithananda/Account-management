import React, { useContext, useState, useEffect } from 'react';
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
import { AppContext } from '../../App';

export default function AddTransactionScreen({ navigation }) {
  const { accounts, setAccounts, transactions, setTransactions, darkMode } = useContext(AppContext);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'income', // 'income' or 'expense'
    accountType: 'bank', // 'bank' or 'cash'
    accountId: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });
  
  const styles = getStyles(darkMode);
  
  useEffect(() => {
    // Set default account if available
    if (formData.accountType === 'bank' && accounts.bank.length > 0 && !formData.accountId) {
      setFormData({ ...formData, accountId: accounts.bank[0].id });
    } else if (formData.accountType === 'cash' && accounts.cash.length > 0 && !formData.accountId) {
      setFormData({ ...formData, accountId: accounts.cash[0].id });
    }
  }, [formData.accountType]);
  
  const handleSave = () => {
    if (!formData.description || !formData.amount || !formData.accountId) {
      Alert.alert('දෝෂය', 'කරුණාකර සියලු තොරතුරු පුරවන්න');
      return;
    }
    
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('දෝෂය', 'වලංගු මුදලක් ඇතුළත් කරන්න');
      return;
    }
    
    const transactionAmount = formData.type === 'expense' ? -amount : amount;
    
    // Update account balance
    const updatedAccounts = { ...accounts };
    if (formData.accountType === 'bank') {
      updatedAccounts.bank = accounts.bank.map(acc =>
        acc.id === formData.accountId
          ? { ...acc, balance: (acc.balance || 0) + transactionAmount }
          : acc
      );
    } else {
      updatedAccounts.cash = accounts.cash.map(acc =>
        acc.id === formData.accountId
          ? { ...acc, balance: (acc.balance || 0) + transactionAmount }
          : acc
      );
    }
    setAccounts(updatedAccounts);
    
    // Add transaction
    const newTransaction = {
      id: Date.now().toString(),
      ...formData,
      amount: transactionAmount,
      timestamp: new Date().toISOString(),
    };
    setTransactions([...transactions, newTransaction]);
    
    Alert.alert('සාර්ථක', 'ගනුදෙනුව සාර්ථකව එක් කරන ලදි', [
      { text: 'හරි', onPress: () => navigation.goBack() }
    ]);
  };
  
  const getAvailableAccounts = () => {
    if (formData.accountType === 'bank') {
      return accounts.bank;
    }
    return accounts.cash;
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        {/* Transaction Type */}
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              formData.type === 'income' && styles.typeButtonActive,
              { backgroundColor: formData.type === 'income' ? '#10b981' : 'transparent' }
            ]}
            onPress={() => setFormData({ ...formData, type: 'income' })}
          >
            <Icon name="arrow-down" size={24} color={formData.type === 'income' ? '#fff' : '#10b981'} />
            <Text style={[
              styles.typeButtonText,
              formData.type === 'income' && styles.typeButtonTextActive
            ]}>
              ආදායම
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.typeButton,
              formData.type === 'expense' && styles.typeButtonActive,
              { backgroundColor: formData.type === 'expense' ? '#ef4444' : 'transparent' }
            ]}
            onPress={() => setFormData({ ...formData, type: 'expense' })}
          >
            <Icon name="arrow-up" size={24} color={formData.type === 'expense' ? '#fff' : '#ef4444'} />
            <Text style={[
              styles.typeButtonText,
              formData.type === 'expense' && styles.typeButtonTextActive
            ]}>
              වියදම
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Account Type */}
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
              styles.accountTypeButtonText,
              formData.accountType === 'bank' && styles.accountTypeButtonTextActive
            ]}>
              බැංකු
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
              styles.accountTypeButtonText,
              formData.accountType === 'cash' && styles.accountTypeButtonTextActive
            ]}>
              මුදල්
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Account Selection */}
        {getAvailableAccounts().length > 0 ? (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ගිණුම තෝරන්න</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.accountScroll}>
              {getAvailableAccounts().map(account => (
                <TouchableOpacity
                  key={account.id}
                  style={[
                    styles.accountChip,
                    formData.accountId === account.id && styles.accountChipActive,
                    { borderColor: account.color || '#6366f1' }
                  ]}
                  onPress={() => setFormData({ ...formData, accountId: account.id })}
                >
                  <View style={[styles.accountChipColor, { backgroundColor: account.color || '#6366f1' }]} />
                  <Text style={[
                    styles.accountChipText,
                    formData.accountId === account.id && styles.accountChipTextActive
                  ]}>
                    {account.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.warningBox}>
            <Icon name="alert" size={24} color="#f59e0b" />
            <Text style={styles.warningText}>
              {formData.accountType === 'bank' 
                ? 'කරුණාකර මුලින්ම බැංකු ගිණුමක් එක් කරන්න'
                : 'කරුණාකර මුලින්ම මුදල් ගිණුමක් එක් කරන්න'}
            </Text>
          </View>
        )}
        
        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>විස්තර</Text>
          <TextInput
            style={styles.input}
            placeholder="ගනුදෙනුවේ විස්තර"
            placeholderTextColor="#6b7280"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
          />
        </View>
        
        {/* Amount */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>මුදල (රු)</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor="#6b7280"
            keyboardType="numeric"
            value={formData.amount}
            onChangeText={(text) => setFormData({ ...formData, amount: text })}
          />
        </View>
        
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
        
        {/* Category (optional) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>කාණ්ඩය (විකල්ප)</Text>
          <TextInput
            style={styles.input}
            placeholder="කාණ්ඩය"
            placeholderTextColor="#6b7280"
            value={formData.category}
            onChangeText={(text) => setFormData({ ...formData, category: text })}
          />
        </View>
        
        {/* Save Button */}
        <TouchableOpacity 
          style={[
            styles.saveButton,
            { backgroundColor: formData.type === 'income' ? '#10b981' : '#ef4444' }
          ]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>ගනුදෙනුව සුරකින්න</Text>
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
  form: {
    padding: 15,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  typeButtonActive: {
    borderColor: 'transparent',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: darkMode ? '#94a3b8' : '#64748b',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  accountTypeSelector: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  accountTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    gap: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  accountTypeButtonActive: {
    borderColor: darkMode ? '#6366f1' : '#6366f1',
  },
  accountTypeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  accountTypeButtonTextActive: {
    color: darkMode ? '#fff' : '#1e293b',
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
    borderWidth: 1,
    borderColor: darkMode ? '#334155' : '#e2e8f0',
  },
  accountScroll: {
    marginTop: 10,
  },
  accountChip: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    gap: 6,
  },
  accountChipActive: {
    backgroundColor: darkMode ? '#334155' : '#f1f5f9',
  },
  accountChipColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  accountChipText: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
    fontWeight: '500',
  },
  accountChipTextActive: {
    color: darkMode ? '#fff' : '#1e293b',
    fontWeight: '600',
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    gap: 10,
  },
  warningText: {
    color: '#92400e',
    fontSize: 14,
    flex: 1,
  },
  saveButton: {
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
