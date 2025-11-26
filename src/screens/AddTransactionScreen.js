import React, { useContext, useMemo, useState } from 'react';
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

const TRANSACTION_TYPES = [
  { id: 'expense', label: 'වියදම්', icon: 'arrow-down-bold-circle' },
  { id: 'income', label: 'ආදායම', icon: 'arrow-up-bold-circle' },
  { id: 'transfer', label: 'මාරු කිරීම', icon: 'swap-horizontal' },
];

const ACCOUNT_META = {
  bank: { label: 'බැංකු', icon: 'bank' },
  cash: { label: 'මුදල්', icon: 'cash' },
  returns: { label: 'Returns', icon: 'chart-line' },
};

const buildDateString = () => new Date().toISOString().split('T')[0];

export default function AddTransactionScreen({ navigation }) {
  const {
    accounts,
    setAccounts,
    setTransactions,
    categories,
    darkMode,
  } = useContext(AppContext);

  const styles = getStyles(darkMode);

  const [formData, setFormData] = useState({
    transactionType: 'expense',
    accountType: 'bank',
    toAccountType: 'cash',
    accountId: accounts.bank[0]?.id ?? '',
    toAccountId: accounts.cash[0]?.id ?? '',
    amount: '',
    description: '',
    categoryId: categories[0]?.id ?? '',
    date: buildDateString(),
  });

  const availableAccounts = useMemo(() => ({
    bank: accounts.bank || [],
    cash: accounts.cash || [],
    returns: accounts.returns || [],
  }), [accounts]);

  const handleTypeChange = (transactionType) => {
    setFormData((prev) => ({
      ...prev,
      transactionType,
    }));
  };

  const updateBalance = (list, accountId, delta) =>
    list.map((account) =>
      account.id === accountId
        ? { ...account, balance: Number(account.balance || 0) + delta }
        : account
    );

  const handleSubmit = () => {
    const amountValue = parseFloat(formData.amount);

    if (!amountValue || amountValue <= 0) {
      Alert.alert('වලංගු මුදලක් ඇතුල් කරන්න');
      return;
    }

    if (!formData.accountId && formData.transactionType !== 'transfer') {
      Alert.alert('කරුණාකර ගිණුමක් තෝරන්න');
      return;
    }

    if (formData.transactionType === 'transfer') {
      if (!formData.accountId || !formData.toAccountId) {
        Alert.alert('ගිණුම් තෝරාගන්න', 'ගිණුම් දෙකම තෝරාගන්න.');
        return;
      }
      if (
        formData.accountId === formData.toAccountId &&
        formData.accountType === formData.toAccountType
      ) {
        Alert.alert('වලංගු මාරුවක් නොවේ', 'එම ගිණුමටම මාරු කල නොහැක.');
        return;
      }
    }

    const description = formData.description.trim() || 'නව ගනුදෙනුවක්';
    const date = formData.date || buildDateString();

    setAccounts((prev) => {
      const updated = { ...prev };

      if (formData.transactionType === 'transfer') {
        updated[formData.accountType] = updateBalance(
          prev[formData.accountType],
          formData.accountId,
          -amountValue
        );
        updated[formData.toAccountType] = updateBalance(
          prev[formData.toAccountType],
          formData.toAccountId,
          amountValue
        );
      } else {
        const delta = formData.transactionType === 'expense' ? -amountValue : amountValue;
        updated[formData.accountType] = updateBalance(
          prev[formData.accountType],
          formData.accountId,
          delta
        );
      }

      return updated;
    });

    const baseTransaction = {
      id: `txn-${Date.now()}`,
      description,
      amount: formData.transactionType === 'expense' ? -amountValue : amountValue,
      date,
      type: formData.transactionType,
    };

    const newTransaction =
      formData.transactionType === 'transfer'
        ? {
            ...baseTransaction,
            amount: amountValue,
            fromAccountType: formData.accountType,
            fromAccountId: formData.accountId,
            toAccountType: formData.toAccountType,
            toAccountId: formData.toAccountId,
          }
        : {
            ...baseTransaction,
            accountType: formData.accountType,
            accountId: formData.accountId,
            categoryId: formData.transactionType === 'expense' ? formData.categoryId : null,
          };

    setTransactions((prev) => [newTransaction, ...prev]);
    navigation.goBack();
  };

  const renderAccountPills = (type, mode = 'from') => {
    const list = availableAccounts[type];
    const selectedId = mode === 'from' ? formData.accountId : formData.toAccountId;

    if (!list.length) {
      return (
        <View style={styles.emptyAccounts}>
          <Text style={styles.emptyAccountsTitle}>ගිණුම් නොමැත</Text>
          <Text style={styles.emptyAccountsSubtitle}>පළමුව ගිණුමක් එක් කරන්න</Text>
        </View>
      );
    }

    return (
      <View style={styles.accountGrid}>
        {list.map((account) => (
          <TouchableOpacity
            key={account.id}
            style={[
              styles.accountPill,
              selectedId === account.id && {
                borderColor: account.color || '#6366f1',
                backgroundColor: (account.color || '#6366f1') + '22',
              },
            ]}
            onPress={() => {
              setFormData((prev) =>
                mode === 'from'
                  ? { ...prev, accountId: account.id }
                  : { ...prev, toAccountId: account.id }
              );
            }}
          >
            <Icon
              name={ACCOUNT_META[type]?.icon || 'wallet'}
              size={18}
              color={account.color || '#6366f1'}
            />
            <View>
              <Text
                style={[
                  styles.accountPillTitle,
                  selectedId === account.id && { color: account.color || '#6366f1' },
                ]}
              >
                {account.name}
              </Text>
              <Text style={styles.accountPillSubtitle}>
                රු {Number(account.balance || 0).toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderCategoryChips = () => {
    if (formData.transactionType !== 'expense') {
      return null;
    }

    if (!categories.length) {
      return (
        <View style={styles.emptyCategories}>
          <Text style={styles.emptyAccountsTitle}>කාණ්ඩ නොමැත</Text>
          <Text style={styles.emptyAccountsSubtitle}>කාණ්ඩ එක් කර budgets ගිණුම් කරන්න</Text>
        </View>
      );
    }

    return (
      <View style={styles.chipContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.chip,
              formData.categoryId === category.id && styles.activeChip,
            ]}
            onPress={() => setFormData((prev) => ({ ...prev, categoryId: category.id }))}
          >
            <Text
              style={[
                styles.chipLabel,
                formData.categoryId === category.id && styles.activeChipLabel,
              ]}
            >
              {category.name}
            </Text>
            <Text style={styles.chipMeta}>රු {category.target?.toLocaleString() ?? 0}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>ගනුදෙනුවේ වර්ගය</Text>
        <View style={styles.typeRow}>
          {TRANSACTION_TYPES.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeButton,
                formData.transactionType === type.id && styles.typeButtonActive,
              ]}
              onPress={() => handleTypeChange(type.id)}
            >
              <Icon
                name={type.icon}
                size={20}
                color={formData.transactionType === type.id ? '#fff' : '#94a3b8'}
              />
              <Text
                style={[
                  styles.typeButtonLabel,
                  formData.transactionType === type.id && styles.typeButtonLabelActive,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>මුදල</Text>
        <TextInput
          style={styles.input}
          placeholder="රු 0.00"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
          value={formData.amount}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, amount: text }))}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>විස්තර</Text>
        <TextInput
          style={styles.input}
          placeholder="උදා: ඉන්ධන, super market"
          placeholderTextColor="#94a3b8"
          value={formData.description}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, description: text }))}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>දිනය</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#94a3b8"
          value={formData.date}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, date: text }))}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>කාණ්ඩය</Text>
        {renderCategoryChips()}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>
          {formData.transactionType === 'transfer' ? 'FROM ගිණුම' : 'ගිණුම'}
        </Text>
        <View style={styles.accountTabs}>
          {Object.keys(ACCOUNT_META).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.accountTab,
                formData.accountType === type && styles.accountTabActive,
              ]}
              onPress={() =>
                setFormData((prev) => ({
                  ...prev,
                  accountType: type,
                  accountId: availableAccounts[type][0]?.id ?? '',
                }))
              }
            >
              <Icon
                name={ACCOUNT_META[type].icon}
                size={18}
                color={formData.accountType === type ? '#fff' : '#94a3b8'}
              />
              <Text
                style={[
                  styles.accountTabLabel,
                  formData.accountType === type && styles.accountTabLabelActive,
                ]}
              >
                {ACCOUNT_META[type].label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {renderAccountPills(formData.accountType, 'from')}
      </View>

      {formData.transactionType === 'transfer' && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>TO ගිණුම</Text>
          <View style={styles.accountTabs}>
            {Object.keys(ACCOUNT_META).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.accountTab,
                  formData.toAccountType === type && styles.accountTabActive,
                ]}
                onPress={() =>
                  setFormData((prev) => ({
                    ...prev,
                    toAccountType: type,
                    toAccountId: availableAccounts[type][0]?.id ?? '',
                  }))
                }
              >
                <Icon
                  name={ACCOUNT_META[type].icon}
                  size={18}
                  color={formData.toAccountType === type ? '#fff' : '#94a3b8'}
                />
                <Text
                  style={[
                    styles.accountTabLabel,
                    formData.toAccountType === type && styles.accountTabLabelActive,
                  ]}
                >
                  {ACCOUNT_META[type].label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {renderAccountPills(formData.toAccountType, 'to')}
        </View>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Icon name="check" size={20} color="#fff" />
        <Text style={styles.submitLabel}>ගනුදෙනුව සුරකින්න</Text>
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
    section: {
      marginBottom: 20,
    },
    sectionLabel: {
      color: darkMode ? '#f8fafc' : '#0f172a',
      fontWeight: '700',
      marginBottom: 10,
      fontSize: 16,
    },
    typeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
    },
    typeButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: darkMode ? '#334155' : '#cbd5f5',
      gap: 8,
    },
    typeButtonActive: {
      backgroundColor: '#6366f1',
      borderColor: '#6366f1',
    },
    typeButtonLabel: {
      color: darkMode ? '#94a3b8' : '#475569',
      fontWeight: '600',
    },
    typeButtonLabelActive: {
      color: '#fff',
    },
    input: {
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: darkMode ? '#334155' : '#cbd5f5',
      color: darkMode ? '#f8fafc' : '#0f172a',
      fontSize: 16,
    },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    chip: {
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: darkMode ? '#334155' : '#cbd5f5',
      backgroundColor: darkMode ? '#1e293b' : '#fff',
    },
    activeChip: {
      backgroundColor: '#6366f1',
      borderColor: '#6366f1',
    },
    chipLabel: {
      color: darkMode ? '#94a3b8' : '#475569',
      fontWeight: '600',
    },
    activeChipLabel: {
      color: '#fff',
    },
    chipMeta: {
      fontSize: 12,
      color: darkMode ? '#cbd5f5' : '#64748b',
    },
    accountTabs: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 12,
    },
    accountTab: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: darkMode ? '#334155' : '#cbd5f5',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    accountTabActive: {
      backgroundColor: '#818cf8',
      borderColor: '#6366f1',
    },
    accountTabLabel: {
      color: darkMode ? '#94a3b8' : '#475569',
      fontWeight: '600',
    },
    accountTabLabelActive: {
      color: '#fff',
    },
    accountGrid: {
      gap: 10,
    },
    accountPill: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: darkMode ? '#334155' : '#cbd5f5',
    },
    accountPillTitle: {
      color: darkMode ? '#f8fafc' : '#0f172a',
      fontWeight: '700',
    },
    accountPillSubtitle: {
      color: darkMode ? '#cbd5f5' : '#475569',
      fontSize: 12,
    },
    emptyAccounts: {
      padding: 20,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#f87171',
      backgroundColor: '#f8717111',
    },
    emptyAccountsTitle: {
      color: '#f87171',
      fontWeight: '700',
      marginBottom: 4,
    },
    emptyAccountsSubtitle: {
      color: darkMode ? '#e2e8f0' : '#991b1b',
    },
    emptyCategories: {
      padding: 16,
      borderRadius: 12,
      backgroundColor: darkMode ? '#1e293b' : '#e2e8f0',
    },
    submitButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      borderRadius: 14,
      backgroundColor: '#6366f1',
      marginTop: 10,
      gap: 10,
    },
    submitLabel: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 16,
    },
  });
