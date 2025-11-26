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
import { AppContext } from '../contexts/AppContext';

export default function AddTransactionScreen({ navigation }) {
  const { transactions, setTransactions, darkMode } = useContext(AppContext);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense', // expense or income
    category: '',
  });
  
  const styles = getStyles(darkMode);
  
  const handleSave = () => {
    if (!formData.description || !formData.amount) {
      Alert.alert('දෝෂය', 'කරුණාකර සියලු අවශ්‍ය ක්ෂේත්‍ර පුරවන්න');
      return;
    }
    
    const newTransaction = {
      id: Date.now().toString(),
      description: formData.description,
      amount: formData.type === 'expense' 
        ? -Math.abs(parseFloat(formData.amount))
        : Math.abs(parseFloat(formData.amount)),
      date: formData.date,
      category: formData.category || 'වෙනත්',
    };
    
    setTransactions([newTransaction, ...transactions]);
    Alert.alert('සාර්ථකයි', 'ගනුදෙනුව එක් කරන ලදී');
    navigation.goBack();
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Transaction Type */}
        <View style={styles.section}>
          <Text style={styles.label}>ගනුදෙනු වර්ගය</Text>
          <View style={styles.typeButtons}>
            <TouchableOpacity 
              style={[
                styles.typeButton, 
                formData.type === 'expense' && styles.typeButtonActive,
                formData.type === 'expense' && styles.expenseButton
              ]}
              onPress={() => setFormData({ ...formData, type: 'expense' })}
            >
              <Icon 
                name="arrow-down" 
                size={24} 
                color={formData.type === 'expense' ? '#fff' : '#ef4444'} 
              />
              <Text style={[
                styles.typeButtonText,
                formData.type === 'expense' && styles.typeButtonTextActive
              ]}>
                වියදම
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.typeButton, 
                formData.type === 'income' && styles.typeButtonActive,
                formData.type === 'income' && styles.incomeButton
              ]}
              onPress={() => setFormData({ ...formData, type: 'income' })}
            >
              <Icon 
                name="arrow-up" 
                size={24} 
                color={formData.type === 'income' ? '#fff' : '#10b981'} 
              />
              <Text style={[
                styles.typeButtonText,
                formData.type === 'income' && styles.typeButtonTextActive
              ]}>
                ආදායම
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.label}>විස්තරය</Text>
          <TextInput
            style={styles.input}
            placeholder="ගනුදෙනුවේ විස්තරය"
            placeholderTextColor="#6b7280"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
          />
        </View>
        
        {/* Amount */}
        <View style={styles.section}>
          <Text style={styles.label}>මුදල (රු)</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>රු</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor="#6b7280"
              keyboardType="numeric"
              value={formData.amount}
              onChangeText={(text) => setFormData({ ...formData, amount: text })}
            />
          </View>
        </View>
        
        {/* Date */}
        <View style={styles.section}>
          <Text style={styles.label}>දිනය</Text>
          <TextInput
            style={styles.input}
            value={formData.date}
            onChangeText={(text) => setFormData({ ...formData, date: text })}
          />
        </View>
        
        {/* Category */}
        <View style={styles.section}>
          <Text style={styles.label}>කාණ්ඩය</Text>
          <TextInput
            style={styles.input}
            placeholder="කාණ්ඩය (අනිවාර්ය නොවේ)"
            placeholderTextColor="#6b7280"
            value={formData.category}
            onChangeText={(text) => setFormData({ ...formData, category: text })}
          />
        </View>
        
        {/* Save Button */}
        <TouchableOpacity 
          style={[
            styles.saveButton,
            formData.type === 'expense' ? styles.expenseButton : styles.incomeButton
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

const getStyles = (darkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkMode ? '#0f172a' : '#f1f5f9',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  label: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 15,
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 10,
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
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 16,
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  input: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    color: darkMode ? '#fff' : '#1e293b',
    padding: 18,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 2,
    borderColor: darkMode ? '#334155' : '#e5e7eb',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    borderRadius: 12,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: darkMode ? '#334155' : '#e5e7eb',
  },
  currencySymbol: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    color: darkMode ? '#fff' : '#1e293b',
    padding: 18,
    fontSize: 24,
    fontWeight: 'bold',
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
