import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useLedgerStore, formatCurrency } from '../store/ledger';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

export default function DashboardScreen({ navigation }: Props) {
  const { bankBalance, cashBalance, categories } = useLedgerStore();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bank</Text>
          <Text style={styles.amount}>{formatCurrency(bankBalance)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cash</Text>
          <Text style={styles.amount}>{formatCurrency(cashBalance)}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <ActionButton label="Income" onPress={() => navigation.navigate('Income')} />
        <ActionButton label="Transfer" onPress={() => navigation.navigate('Transfer')} />
        <ActionButton label="Purchase" onPress={() => navigation.navigate('Purchase')} />
        <ActionButton label="Add Category" onPress={() => navigation.navigate('AddCategory')} />
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No categories yet.</Text>}
        renderItem={({ item }) => {
          const progress = item.targetAmount > 0 ? Math.min(1, item.purchasedAmount / item.targetAmount) : 0;
          const progressPercent = Math.round(progress * 100);
          const unitsInfo =
            item.targetUnits != null
              ? `${item.purchasedUnits}/${item.targetUnits} units`
              : `${formatCurrency(item.purchasedAmount)}${item.targetAmount ? ' / ' + formatCurrency(item.targetAmount) : ''}`;

          return (
            <View style={styles.category}>
              <Text style={styles.categoryName}>{item.name}</Text>
              <Text style={styles.categorySub}>{unitsInfo}</Text>
              {item.targetAmount > 0 && (
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

function ActionButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.actionBtn}>
      <Text style={styles.actionText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  row: { flexDirection: 'row', gap: 12 },
  card: { flex: 1, backgroundColor: '#f3f4f6', padding: 12, borderRadius: 8 },
  cardTitle: { fontSize: 14, color: '#374151' },
  amount: { fontSize: 20, fontWeight: '600', marginTop: 4 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 12 },
  actionBtn: { backgroundColor: '#111827', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8 },
  actionText: { color: '#fff', fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginVertical: 8 },
  category: { backgroundColor: '#f9fafb', padding: 12, borderRadius: 8, marginBottom: 10 },
  categoryName: { fontSize: 16, fontWeight: '600' },
  categorySub: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  progressBar: { height: 8, backgroundColor: '#e5e7eb', borderRadius: 6, overflow: 'hidden', marginTop: 8 },
  progressFill: { height: 8, backgroundColor: '#10b981' },
  empty: { color: '#6b7280' },
});

