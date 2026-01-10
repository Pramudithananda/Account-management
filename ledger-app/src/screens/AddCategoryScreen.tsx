import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useLedgerStore } from '../store/ledger';

type Props = NativeStackScreenProps<RootStackParamList, 'AddCategory'>;

export default function AddCategoryScreen({ navigation }: Props) {
  const addCategory = useLedgerStore((s) => s.addCategory);
  const [name, setName] = useState('');
  const [targetUnits, setTargetUnits] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const onSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Name required');
      return;
    }
    const tu = targetUnits ? Number(targetUnits) : null;
    const up = unitPrice ? Number(unitPrice) : null;
    const ta = targetAmount ? Number(targetAmount) : null;
    if (tu != null && (!Number.isFinite(tu) || tu <= 0)) return Alert.alert('Invalid target units');
    if (up != null && (!Number.isFinite(up) || up <= 0)) return Alert.alert('Invalid unit price');
    if (ta != null && (!Number.isFinite(ta) || ta <= 0)) return Alert.alert('Invalid target amount');

    addCategory({ name, targetUnits: tu, unitPrice: up, targetAmount: ta });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category Name</Text>
      <TextInput value={name} onChangeText={setName} placeholder="e.g., Pens" style={styles.input} />

      <Text style={styles.help}>Either set units and unit price, or a total target amount.</Text>

      <Text style={styles.label}>Target Units</Text>
      <TextInput value={targetUnits} onChangeText={setTargetUnits} keyboardType="numeric" placeholder="e.g., 100" style={styles.input} />

      <Text style={styles.label}>Unit Price</Text>
      <TextInput value={unitPrice} onChangeText={setUnitPrice} keyboardType="numeric" placeholder="e.g., 100" style={styles.input} />

      <Text style={styles.label}>Target Amount</Text>
      <TextInput value={targetAmount} onChangeText={setTargetAmount} keyboardType="numeric" placeholder="e.g., 10000" style={styles.input} />

      <TouchableOpacity style={styles.btn} onPress={onSubmit}>
        <Text style={styles.btnText}>Add Category</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 14, color: '#374151', marginTop: 8 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', padding: 10, borderRadius: 8, marginTop: 6 },
  help: { fontSize: 12, color: '#6b7280', marginTop: 4 },
  btn: { backgroundColor: '#111827', padding: 12, borderRadius: 8, marginTop: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
});

