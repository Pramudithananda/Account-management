import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useLedgerStore, formatCurrency } from '../store/ledger';

type Props = NativeStackScreenProps<RootStackParamList, 'Income'>;

export default function IncomeScreen({ navigation }: Props) {
  const addIncome = useLedgerStore((s) => s.addIncome);
  const bankBalance = useLedgerStore((s) => s.bankBalance);
  const [amount, setAmount] = useState('');

  const onSubmit = () => {
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) {
      Alert.alert('Invalid amount', 'Enter a positive number.');
      return;
    }
    addIncome(value);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Bank Balance</Text>
      <Text style={styles.value}>{formatCurrency(bankBalance)}</Text>
      <Text style={styles.label}>Amount</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="e.g., 10000"
        style={styles.input}
      />
      <TouchableOpacity style={styles.btn} onPress={onSubmit}>
        <Text style={styles.btnText}>Add Income</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 14, color: '#374151', marginTop: 8 },
  value: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', padding: 10, borderRadius: 8, marginTop: 6 },
  btn: { backgroundColor: '#111827', padding: 12, borderRadius: 8, marginTop: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
});

