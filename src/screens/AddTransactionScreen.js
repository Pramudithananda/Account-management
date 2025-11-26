import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppContext } from '../../App';

export default function AddTransactionScreen({ navigation }) {
  const { transactions, setTransactions, accounts, darkMode } = useContext(AppContext);
  
  const [formData, setFormData] = useState({
    type: 'expense', // expense or income
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    account: '',
  });

  const styles = getStyles(darkMode);

  const handleSave = () => {
    if (!formData.amount || !formData.description || !formData.account) {
      Alert.alert('දෝෂය', 'කරුණාකර සියලු අවශ්‍ය තොරතුරු පුරවන්න');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('දෝෂය', 'කරුණාකර වලංගු මුදලක් ඇතුළත් කරන්න');
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      ...formData,
      amount: formData.type === 'expense' ? -amount : amount,
      createdAt: new Date().toISOString(),
    };

    setTransactions([newTransaction, ...transactions]);
    Alert.alert('සාර්ථකයි', 'ගනුදෙනුව එකතු කරන ලදී', [
      {
        text: 'හරි',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const allAccounts = [
    ...accounts.bank.map(acc => ({ ...acc, type: 'bank' })),
    ...accounts.cash.map(acc => ({ ...acc, type: 'cash' })),
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Transaction Type */}
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              formData.type === 'expense' && styles.typeButtonActive,
              formData.type === 'expense' && styles.expenseButton,
            ]}
            onPress={() => setFormData({ ...formData, type: 'expense' })}
          >
            <Icon
              name="arrow-down"
              size={24}
              color={formData.type === 'expense' ? '#fff' : '#ef4444'}
            />
            <Text
              style={[
                styles.typeButtonText,
                formData.type === 'expense' && styles.typeButtonTextActive,
              ]}
            >
              වියදම
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              formData.type === 'income' && styles.typeButtonActive,
              formData.type === 'income' && styles.incomeButton,
            ]}
            onPress={() => setFormData({ ...formData, type: 'income' })}
          >
            <Icon
              name="arrow-up"
              size={24}
              color={formData.type === 'income' ? '#fff' : '#10b981'}
            />
            <Text
              style={[
                styles.typeButtonText,
                formData.type === 'income' && styles.typeButtonTextActive,
              ]}
            >
              ආදායම
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>මුදල (රු)</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor="#6b7280"
            keyboardType="decimal-pad"
            value={formData.amount}
            onChangeText={(text) => setFormData({ ...formData, amount: text })}
          />
        </View>

        {/* Description */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>විස්තරය</Text>
          <TextInput
            style={styles.input}
            placeholder="ගනුදෙනු විස්තරය"
            placeholderTextColor="#6b7280"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
          />
        </View>

        {/* Category */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>කාණ්ඩය (විකල්ප)</Text>
          <TextInput
            style={styles.input}
            placeholder="උදා: ආහාර, ප්‍රවාහන"
            placeholderTextColor="#6b7280"
            value={formData.category}
            onChangeText={(text) => setFormData({ ...formData, category: text })}
          />
        </View>

        {/* Account Selection */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>ගිණුම</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.accountScroll}>
            {allAccounts.map((account) => (
              <TouchableOpacity
                key={account.id}
                style={[
                  styles.accountOption,
                  formData.account === account.id && styles.accountOptionSelected,
                  { borderColor: account.color || '#6366f1' },
                ]}
                onPress={() => setFormData({ ...formData, account: account.id })}
              >
                <Icon
                  name={account.type === 'bank' ? 'bank' : 'cash'}
                  size={20}
                  color={formData.account === account.id ? '#fff' : (account.color || '#6366f1')}
                />
                <Text
                  style={[
                    styles.accountOptionText,
                    formData.account === account.id && styles.accountOptionTextSelected,
                  ]}
                >
                  {account.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Date */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>දිනය</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#6b7280"
            value={formData.date}
            onChangeText={(text) => setFormData({ ...formData, date: text })}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            { backgroundColor: formData.type === 'expense' ? '#ef4444' : '#10b981' },
          ]}
          onPress={handleSave}
        >
          <Icon name="check" size={24} color="#fff" />
          <Text style={styles.saveButtonText}>ගනුදෙනුව සුරකින්න</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const getStyles = (darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#0f172a' : '#f1f5f9',
    },
    content: {
      padding: 15,
    },
    typeSelector: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 25,
    },
    typeButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      borderRadius: 15,
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      borderWidth: 2,
      borderColor: 'transparent',
      gap: 8,
    },
    typeButtonActive: {
      borderColor: 'transparent',
    },
    expenseButton: {
      backgroundColor: '#ef4444',
    },
    incomeButton: {
      backgroundColor: '#10b981',
    },
    typeButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: darkMode ? '#fff' : '#1e293b',
    },
    typeButtonTextActive: {
      color: '#fff',
    },
    formGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: darkMode ? '#fff' : '#1e293b',
      marginBottom: 10,
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
    amountInput: {
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      color: darkMode ? '#fff' : '#1e293b',
      padding: 20,
      borderRadius: 15,
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      borderWidth: 2,
      borderColor: darkMode ? '#334155' : '#e2e8f0',
    },
    accountScroll: {
      marginTop: 10,
    },
    accountOption: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      paddingHorizontal: 16,
      borderRadius: 25,
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      borderWidth: 2,
      marginRight: 10,
      gap: 8,
    },
    accountOptionSelected: {
      backgroundColor: '#6366f1',
      borderColor: '#6366f1',
    },
    accountOptionText: {
      fontSize: 14,
      fontWeight: '600',
      color: darkMode ? '#fff' : '#1e293b',
    },
    accountOptionTextSelected: {
      color: '#fff',
    },
    saveButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 18,
      borderRadius: 15,
      marginTop: 20,
      gap: 10,
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
