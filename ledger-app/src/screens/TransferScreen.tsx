import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useLedgerStore, formatCurrency } from '../store/ledger';

type Props = NativeStackScreenProps<RootStackParamList, 'Transfer'>;

export default function TransferScreen({ navigation }: Props) {
  const transferToCash = useLedgerStore((s) => s.transferToCash);
  const { bankBalance, cashBalance } = useLedgerStore();
  const [amount, setAmount] = useState('');

  const onSubmit = () => {
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) {
      Alert.alert('Invalid amount', 'Enter a positive number.');
      return;
    }
    if (value > bankBalance) {
      Alert.alert('Not enough in bank', 'Amount exceeds bank balance.');
      return;
    }
    transferToCash(value);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bank ➜ Cash</Text>
      <Text style={styles.value}>Bank: {formatCurrency(bankBalance)} | Cash: {formatCurrency(cashBalance)}</Text>
      <Text style={styles.label}>Amount</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="e.g., 5000"
        style={styles.input}
      />
      <TouchableOpacity style={styles.btn} onPress={onSubmit}>
        <Text style={styles.btnText}>Transfer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 14, color: '#374151', marginTop: 8 },
  value: { fontSize: 14, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', padding: 10, borderRadius: 8, marginTop: 6 },
  btn: { backgroundColor: '#111827', padding: 12, borderRadius: 8, marginTop: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
});

