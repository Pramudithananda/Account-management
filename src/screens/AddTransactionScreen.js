import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppContext } from '../../App';

const TRANSACTION_TYPES = [
  { key: 'income', label: 'ආදායම', icon: 'arrow-down-bold-circle' },
  { key: 'expense', label: 'වියදම', icon: 'arrow-up-bold-circle' },
  { key: 'transfer', label: 'මාරු', icon: 'swap-horizontal' },
];

const ACCOUNT_TYPE_OPTIONS = [
  { key: 'bank', label: 'බැංකු ගිණුම්' },
  { key: 'cash', label: 'මුදල් ගිණුම්' },
  { key: 'returns', label: 'Returns' },
];

const today = () => new Date().toISOString().split('T')[0];

export default function AddTransactionScreen({ navigation }) {
  const {
    accounts,
    setAccounts,
    transactions,
    setTransactions,
    categories,
    setCategories,
    darkMode,
  } = useContext(AppContext);

  const [form, setForm] = useState({
    description: '',
    amount: '',
    date: today(),
    type: 'income',
    categoryId: categories[0]?.id || null,
    sourceAccountType: 'bank',
    sourceAccountId: '',
    targetAccountType: 'cash',
    targetAccountId: '',
    notes: '',
  });

  const styles = getStyles(darkMode);

  const availableSourceAccounts = useMemo(
    () => accounts[form.sourceAccountType] || [],
    [accounts, form.sourceAccountType],
  );

  const availableTargetAccounts = useMemo(
    () => accounts[form.targetAccountType] || [],
    [accounts, form.targetAccountType],
  );

  useEffect(() => {
    if (availableSourceAccounts.length === 0 && form.sourceAccountId !== '') {
      setForm((prev) => ({ ...prev, sourceAccountId: '' }));
      return;
    }
    const exists = availableSourceAccounts.some((item) => item.id === form.sourceAccountId);
    if (!exists) {
      setForm((prev) => ({ ...prev, sourceAccountId: availableSourceAccounts[0]?.id || '' }));
    }
  }, [availableSourceAccounts, form.sourceAccountId]);

  useEffect(() => {
    if (availableTargetAccounts.length === 0 && form.targetAccountId !== '') {
      setForm((prev) => ({ ...prev, targetAccountId: '' }));
      return;
    }
    const exists = availableTargetAccounts.some((item) => item.id === form.targetAccountId);
    if (!exists) {
      setForm((prev) => ({ ...prev, targetAccountId: availableTargetAccounts[0]?.id || '' }));
    }
  }, [availableTargetAccounts, form.targetAccountId]);

  const hasAnyAccounts = useMemo(
    () =>
      Object.values(accounts).some((group) => Array.isArray(group) && group.length > 0),
    [accounts],
  );

  const handleSelectType = (type) => {
    setForm((prev) => ({ ...prev, type }));
  };

  const handleSourceTypeChange = (typeKey) => {
    const firstId = accounts[typeKey]?.[0]?.id || '';
    setForm((prev) => ({
      ...prev,
      sourceAccountType: typeKey,
      sourceAccountId: firstId,
    }));
  };

  const handleTargetTypeChange = (typeKey) => {
    const firstId = accounts[typeKey]?.[0]?.id || '';
    setForm((prev) => ({
      ...prev,
      targetAccountType: typeKey,
      targetAccountId: firstId,
    }));
  };

  const adjustAccountBalance = (state, typeKey, accountId, delta) => {
    if (!accountId || !state[typeKey]) {
      return state;
    }

    return {
      ...state,
      [typeKey]: state[typeKey].map((account) =>
        account.id === accountId
          ? {
              ...account,
              balance: parseFloat(((account.balance || 0) + delta).toFixed(2)),
            }
          : account,
      ),
    };
  };

  const handleSave = () => {
    const parsedAmount = parseFloat(form.amount);

    if (!form.description.trim()) {
      Alert.alert('දත්ත අවශ්‍යයි', 'ගනුදෙනුවේ විස්තරය ඇතුළත් කරන්න.');
      return;
    }

    if (!parsedAmount || parsedAmount <= 0) {
      Alert.alert('වැරදි මුදලක්', 'රුපියල් මුදල 0 ට වඩා වැඩියි විය යුතුය.');
      return;
    }

    if (!hasAnyAccounts) {
      Alert.alert('ගිණුම් නැත', 'පළමුව බැංකු හෝ මුදල් ගිණුම් එකතු කරන්න.');
      return;
    }

    const sourceAccounts = accounts[form.sourceAccountType] || [];
    const sourceAccount = sourceAccounts.find((acc) => acc.id === form.sourceAccountId);

    if (!sourceAccount) {
      Alert.alert('ගිණුමක් තෝරන්න', 'ගනුදෙනුවට වලංගු ගිණුමක් අවශ්‍යයි.');
      return;
    }

    if (form.type === 'transfer') {
      if (!form.targetAccountId) {
        Alert.alert('ඉලක්ක ගිණුමක්', 'මාරුව සඳහා ඉලක්ක ගිණුමක් තෝරන්න.');
        return;
      }
      if (
        form.targetAccountType === form.sourceAccountType &&
        form.targetAccountId === form.sourceAccountId
      ) {
        Alert.alert('වලංගු නොවන තේරීම', 'මාරුව සඳහා වෙනස් ගිණුම් දෙකක් අවශ්‍යයි.');
        return;
      }
    }

    const currentBalance = sourceAccount.balance || 0;
    if ((form.type === 'expense' || form.type === 'transfer') && currentBalance < parsedAmount) {
      Alert.alert('මුදල් ප්‍රමාණය', 'මෙම ගිණුමට තරම් මුදල් නොමැත.');
      return;
    }

    let updatedAccounts = { ...accounts };
    const adjustments = [];

    if (form.type === 'income') {
      adjustments.push({
        typeKey: form.sourceAccountType,
        id: form.sourceAccountId,
        delta: parsedAmount,
      });
    }

    if (form.type === 'expense') {
      adjustments.push({
        typeKey: form.sourceAccountType,
        id: form.sourceAccountId,
        delta: -parsedAmount,
      });
    }

    if (form.type === 'transfer') {
      adjustments.push({
        typeKey: form.sourceAccountType,
        id: form.sourceAccountId,
        delta: -parsedAmount,
      });
      adjustments.push({
        typeKey: form.targetAccountType,
        id: form.targetAccountId,
        delta: parsedAmount,
      });
    }

    adjustments.forEach((adj) => {
      updatedAccounts = adjustAccountBalance(updatedAccounts, adj.typeKey, adj.id, adj.delta);
    });

    setAccounts(updatedAccounts);

    if (form.type === 'expense' && form.categoryId) {
      const nextCategories = categories.map((category) =>
        category.id === form.categoryId
          ? {
              ...category,
              spent: (category.spent || 0) + parsedAmount,
            }
          : category,
      );
      setCategories(nextCategories);
    }

    const newTransaction = {
      id: Date.now().toString(),
      description: form.description.trim(),
      date: form.date,
      type: form.type,
      amount: form.type === 'expense' ? -parsedAmount : parsedAmount,
      categoryId: form.type === 'transfer' ? null : form.categoryId,
      sourceAccount: {
        type: form.sourceAccountType,
        id: form.sourceAccountId,
      },
      targetAccount:
        form.type === 'transfer'
          ? { type: form.targetAccountType, id: form.targetAccountId }
          : null,
      notes: form.notes.trim(),
    };

    setTransactions([newTransaction, ...transactions]);

    setForm({
      description: '',
      amount: '',
      date: today(),
      type: form.type,
      categoryId: categories[0]?.id || null,
      sourceAccountType: form.sourceAccountType,
      sourceAccountId: availableSourceAccounts[0]?.id || '',
      targetAccountType: form.targetAccountType,
      targetAccountId: availableTargetAccounts[0]?.id || '',
      notes: '',
    });

    Alert.alert('සාර්ථකයි', 'ගනුදෙනුව සුරකින ලදි.', [
      { text: 'හරි', onPress: () => navigation.goBack() },
    ]);
  };

  if (!hasAnyAccounts) {
    return (
      <View style={styles.emptyState}>
        <Icon name="bank-plus" size={72} color="#6366f1" />
        <Text style={styles.emptyTitle}>පළමුව ගිණුම් එකතු කරන්න</Text>
        <Text style={styles.emptySubtitle}>
          බැංකු හෝ නಗදු ගිණුමක් එක් කළ පසු ගනුදෙනු සටහන් කළ හැක.
        </Text>
        <TouchableOpacity style={styles.emptyButton} onPress={() => navigation.navigate('Bank')}>
          <Text style={styles.emptyButtonText}>බැංකු පිටුවට යන්න</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.sectionLabel}>ගනුදෙනු වර්ගය</Text>
      <View style={styles.typeRow}>
        {TRANSACTION_TYPES.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.typeChip,
              form.type === option.key && styles.selectedChip,
            ]}
            onPress={() => handleSelectType(option.key)}
          >
            <Icon
              name={option.icon}
              size={20}
              color={form.type === option.key ? '#fff' : '#6366f1'}
            />
            <Text
              style={[
                styles.typeChipText,
                form.type === option.key && styles.selectedChipText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>ගිණුම</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.accountTypes}>
        {ACCOUNT_TYPE_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.accountTypeChip,
              form.sourceAccountType === option.key && styles.activeAccountTypeChip,
            ]}
            onPress={() => handleSourceTypeChange(option.key)}
          >
            <Text
              style={[
                styles.accountChipText,
                form.sourceAccountType === option.key && styles.activeAccountChipText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.accountScroller}
      >
        {availableSourceAccounts.map((account) => (
          <TouchableOpacity
            key={account.id}
            style={[
              styles.accountCard,
              form.sourceAccountId === account.id && styles.selectedAccountCard,
            ]}
            onPress={() => setForm((prev) => ({ ...prev, sourceAccountId: account.id }))}
          >
            <View style={[styles.accountColor, { backgroundColor: account.color || '#6366f1' }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.accountName}>{account.name}</Text>
              <Text style={styles.accountBalance}>රු {account.balance?.toLocaleString() || 0}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {availableSourceAccounts.length === 0 && (
          <View style={styles.noAccountCard}>
            <Text style={styles.noAccountText}>මෙම වර්ගයේ ගිණුම් නොමැත</Text>
          </View>
        )}
      </ScrollView>

      {form.type === 'transfer' && (
        <>
          <Text style={styles.sectionLabel}>ඉලක්ක ගිණුම</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.accountTypes}>
            {ACCOUNT_TYPE_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.accountTypeChip,
                  form.targetAccountType === option.key && styles.activeAccountTypeChip,
                ]}
                onPress={() => handleTargetTypeChange(option.key)}
              >
                <Text
                  style={[
                    styles.accountChipText,
                    form.targetAccountType === option.key && styles.activeAccountChipText,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.accountScroller}
          >
            {availableTargetAccounts.map((account) => (
              <TouchableOpacity
                key={account.id}
                style={[
                  styles.accountCard,
                  form.targetAccountId === account.id && styles.selectedAccountCard,
                ]}
                onPress={() => setForm((prev) => ({ ...prev, targetAccountId: account.id }))}
              >
                <View
                  style={[styles.accountColor, { backgroundColor: account.color || '#22c55e' }]}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.accountName}>{account.name}</Text>
                  <Text style={styles.accountBalance}>
                    රු {account.balance?.toLocaleString() || 0}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            {availableTargetAccounts.length === 0 && (
              <View style={styles.noAccountCard}>
                <Text style={styles.noAccountText}>මෙම වර්ගයේ ගිණුම් නොමැත</Text>
              </View>
            )}
          </ScrollView>
        </>
      )}

      <Text style={styles.sectionLabel}>විස්තර</Text>
      <TextInput
        style={styles.input}
        placeholder="උදාහරණයක් ලෙස - ගසක් මිලදී ගැනීම"
        placeholderTextColor="#94a3b8"
        value={form.description}
        onChangeText={(text) => setForm((prev) => ({ ...prev, description: text }))}
      />

      <View style={styles.inlineFields}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionLabel}>මුදල (රු)</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            keyboardType="decimal-pad"
            placeholderTextColor="#94a3b8"
            value={form.amount}
            onChangeText={(text) => setForm((prev) => ({ ...prev, amount: text }))}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.sectionLabel}>දිනය</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#94a3b8"
            value={form.date}
            onChangeText={(text) => setForm((prev) => ({ ...prev, date: text }))}
          />
        </View>
      </View>

      {form.type !== 'transfer' && (
        <>
          <Text style={styles.sectionLabel}>කාණ්ඩය</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  form.categoryId === category.id && styles.activeCategoryChip,
                ]}
                onPress={() => setForm((prev) => ({ ...prev, categoryId: category.id }))}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    form.categoryId === category.id && styles.activeCategoryChipText,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
            {categories.length === 0 && (
              <View style={styles.noAccountCard}>
                <Text style={styles.noAccountText}>කාණ්ඩ නොමැත</Text>
              </View>
            )}
          </ScrollView>
        </>
      )}

      <Text style={styles.sectionLabel}>අමතර සටහන්</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="අවසරයක්, විස්තරයක්, ඇගයීමක්..."
        placeholderTextColor="#94a3b8"
        value={form.notes}
        multiline
        numberOfLines={4}
        onChangeText={(text) => setForm((prev) => ({ ...prev, notes: text }))}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Icon name="content-save" size={20} color="#fff" />
        <Text style={styles.saveButtonText}>ගනුදෙනුව සුරකින්න</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const getStyles = (darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
      padding: 16,
    },
    sectionLabel: {
      color: darkMode ? '#cbd5f5' : '#0f172a',
      fontWeight: '600',
      marginTop: 16,
      marginBottom: 8,
    },
    typeRow: {
      flexDirection: 'row',
      gap: 10,
    },
    typeChip: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#6366f1',
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 6,
    },
    selectedChip: {
      backgroundColor: '#6366f1',
    },
    typeChipText: {
      color: '#6366f1',
      fontWeight: '600',
    },
    selectedChipText: {
      color: '#fff',
    },
    accountTypes: {
      marginTop: 8,
    },
    accountTypeChip: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: darkMode ? '#1e293b' : '#e2e8f0',
      marginRight: 10,
    },
    activeAccountTypeChip: {
      backgroundColor: '#4f46e5',
    },
    accountChipText: {
      color: darkMode ? '#94a3b8' : '#475569',
      fontWeight: '600',
    },
    activeAccountChipText: {
      color: '#fff',
    },
    accountScroller: {
      marginTop: 12,
    },
    accountCard: {
      width: 220,
      padding: 16,
      marginRight: 12,
      borderRadius: 16,
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      borderWidth: 1,
      borderColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    selectedAccountCard: {
      borderColor: '#6366f1',
    },
    accountColor: {
      width: 14,
      height: 60,
      borderRadius: 8,
    },
    accountName: {
      color: darkMode ? '#fff' : '#0f172a',
      fontWeight: '700',
      marginBottom: 4,
    },
    accountBalance: {
      color: '#10b981',
      fontWeight: '600',
    },
    noAccountCard: {
      padding: 16,
      borderRadius: 16,
      backgroundColor: darkMode ? '#1e293b' : '#e2e8f0',
      justifyContent: 'center',
      alignItems: 'center',
    },
    noAccountText: {
      color: darkMode ? '#94a3b8' : '#475569',
    },
    input: {
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      borderRadius: 12,
      padding: 14,
      color: darkMode ? '#fff' : '#0f172a',
      borderWidth: 1,
      borderColor: darkMode ? '#334155' : '#cbd5f5',
    },
    inlineFields: {
      flexDirection: 'row',
      marginTop: 10,
    },
    categoryRow: {
      marginTop: 8,
    },
    categoryChip: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#94a3b8',
      marginRight: 10,
    },
    activeCategoryChip: {
      backgroundColor: '#10b981',
      borderColor: '#10b981',
    },
    categoryChipText: {
      color: darkMode ? '#cbd5f5' : '#0f172a',
      fontWeight: '600',
    },
    activeCategoryChipText: {
      color: '#fff',
    },
    multilineInput: {
      minHeight: 100,
      textAlignVertical: 'top',
      marginBottom: 16,
    },
    saveButton: {
      backgroundColor: '#4f46e5',
      padding: 16,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 10,
      marginTop: 10,
    },
    saveButtonText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 16,
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
    },
    emptyTitle: {
      color: darkMode ? '#fff' : '#0f172a',
      fontSize: 20,
      fontWeight: '700',
      marginTop: 16,
    },
    emptySubtitle: {
      color: darkMode ? '#94a3b8' : '#475569',
      textAlign: 'center',
      marginTop: 8,
      lineHeight: 20,
    },
    emptyButton: {
      marginTop: 20,
      backgroundColor: '#6366f1',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 999,
    },
    emptyButtonText: {
      color: '#fff',
      fontWeight: '600',
    },
  });
