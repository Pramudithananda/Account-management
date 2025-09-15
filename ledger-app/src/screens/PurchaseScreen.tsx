import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useLedgerStore, formatCurrency } from '../store/ledger';

type Props = NativeStackScreenProps<RootStackParamList, 'Purchase'>;

export default function PurchaseScreen({ navigation }: Props) {
  const { categories, cashBalance, purchase } = useLedgerStore();
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? '');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');

  const onSubmit = () => {
    if (!categoryId) return Alert.alert('No category selected');
    const qty = Number(quantity);
    const up = unitPrice ? Number(unitPrice) : null;
    if (!Number.isFinite(qty) || qty <= 0) return Alert.alert('Invalid quantity');
    if (up != null && (!Number.isFinite(up) || up <= 0)) return Alert.alert('Invalid unit price');

    const category = categories.find((c) => c.id === categoryId);
    const appliedUnitPrice = up != null ? up : category?.unitPrice ?? 0;
    const expectedAmount = appliedUnitPrice * qty;
    if (expectedAmount > cashBalance) return Alert.alert('Not enough cash');

    purchase({ categoryId, quantity: qty, unitPrice: up });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cash Balance</Text>
      <Text style={styles.value}>{formatCurrency(cashBalance)}</Text>

      <Text style={styles.label}>Category ID</Text>
      <TextInput
        value={categoryId}
        onChangeText={setCategoryId}
        placeholder="Paste category ID (temporary)"
        style={styles.input}
      />
      <Text style={styles.help}>Note: For simplicity, enter category ID from Dashboard list.</Text>

      <Text style={styles.label}>Quantity</Text>
      <TextInput value={quantity} onChangeText={setQuantity} keyboardType="numeric" placeholder="e.g., 10" style={styles.input} />

      <Text style={styles.label}>Unit Price (optional)</Text>
      <TextInput value={unitPrice} onChangeText={setUnitPrice} keyboardType="numeric" placeholder="e.g., 100" style={styles.input} />

      <TouchableOpacity style={styles.btn} onPress={onSubmit}>
        <Text style={styles.btnText}>Record Purchase</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 14, color: '#374151', marginTop: 8 },
  value: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', padding: 10, borderRadius: 8, marginTop: 6 },
  help: { fontSize: 12, color: '#6b7280', marginTop: 4 },
  btn: { backgroundColor: '#111827', padding: 12, borderRadius: 8, marginTop: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
});

