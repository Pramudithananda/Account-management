import React, { useContext, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppContext } from '../../App';

const ACCOUNT_META = {
  bank: { icon: 'bank', label: 'බැංකු' },
  cash: { icon: 'cash', label: 'මුදල්' },
  returns: { icon: 'chart-line', label: 'Returns' },
};

export default function DashboardScreen({ navigation }) {
  const { accounts, transactions, categories, darkMode } = useContext(AppContext);
  const styles = useMemo(() => getStyles(darkMode), [darkMode]);

  const stats = useMemo(() => {
    const totalBank = accounts.bank.reduce((sum, acc) => sum + (acc.balance || 0), 0);
    const totalCash = accounts.cash.reduce((sum, acc) => sum + (acc.balance || 0), 0);
    const totalReturns = accounts.returns.reduce((sum, acc) => sum + (acc.balance || 0), 0);
    const netWorth = totalBank + totalCash + totalReturns;
    return { totalBank, totalCash, totalReturns, netWorth };
  }, [accounts]);

  const allAccounts = useMemo(() => {
    return [
      ...accounts.bank.map((acc) => ({ ...acc, type: 'bank' })),
      ...accounts.cash.map((acc) => ({ ...acc, type: 'cash' })),
      ...accounts.returns.map((acc) => ({ ...acc, type: 'returns' })),
    ].sort((a, b) => (b.balance || 0) - (a.balance || 0));
  }, [accounts]);

  const spendingByCategory = useMemo(() => {
    return transactions.reduce((acc, txn) => {
      if (txn.type === 'expense' && txn.categoryId) {
        acc[txn.categoryId] = (acc[txn.categoryId] || 0) + Math.abs(txn.amount);
      }
      return acc;
    }, {});
  }, [transactions]);

  const recentTransactions = useMemo(() => transactions.slice(0, 6), [transactions]);

  const goToAddTransaction = () => {
    navigation.getParent()?.navigate('AddTransaction');
  };

  const renderTransaction = (txn) => {
    const isExpense = txn.type === 'expense';
    const isTransfer = txn.type === 'transfer';
    const iconName = isTransfer
      ? 'swap-horizontal'
      : isExpense
      ? 'arrow-down-bold'
      : 'arrow-up-bold';
    const amountColor = isTransfer ? '#38bdf8' : isExpense ? '#f87171' : '#34d399';

    return (
      <View key={txn.id} style={styles.transactionItem}>
        <View style={styles.transactionLeft}>
          <View style={styles.transactionTopRow}>
            <Icon name={iconName} size={20} color={amountColor} />
            <Text style={styles.transactionDesc}>{txn.description}</Text>
          </View>
          <Text style={styles.transactionDate}>{txn.date}</Text>
          {isTransfer ? (
            <Text style={styles.transactionMeta}>
              {ACCOUNT_META[txn.fromAccountType]?.label} ➜ {ACCOUNT_META[txn.toAccountType]?.label}
            </Text>
          ) : (
            <Text style={styles.transactionMeta}>
              {ACCOUNT_META[txn.accountType]?.label}
            </Text>
          )}
        </View>
        <Text style={[styles.transactionAmount, { color: amountColor }]}>
          {isExpense ? '-' : isTransfer ? '' : '+'}රු {Math.abs(txn.amount).toLocaleString()}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.summaryGrid}>
        <SummaryCard
          title="සම්පූර්ණ මූල්‍ය"
          amount={stats.netWorth}
          icon="wallet-outline"
          accent="#38bdf8"
        />
        <SummaryCard
          title="බැංකු ශේෂය"
          amount={stats.totalBank}
          icon="bank"
          accent="#a855f7"
          onPress={() => navigation.navigate('Bank')}
        />
        <SummaryCard
          title="මුදල්/වොලට්"
          amount={stats.totalCash}
          icon="cash"
          accent="#10b981"
          onPress={() => navigation.navigate('Cash')}
        />
      </View>

      <View style={styles.quickRow}>
        <TouchableOpacity style={styles.quickButton} onPress={goToAddTransaction}>
          <Icon name="plus-circle" size={20} color="#fff" />
          <Text style={styles.quickButtonText}>නව ගනුදෙනුව</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickButtonOutline}
          onPress={() => navigation.navigate('Categories')}
        >
          <Icon name="folder" size={20} color="#6366f1" />
          <Text style={styles.quickButtonOutlineText}>බජට්ස්</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ගිණුම් ශේෂය</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Bank')}>
            <Text style={styles.sectionLink}>වැඩි විස්තර</Text>
          </TouchableOpacity>
        </View>
        {allAccounts.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="playlist-plus" size={36} color="#94a3b8" />
            <Text style={styles.emptyText}>ගිණුම් එක් කර නැත</Text>
          </View>
        ) : (
          allAccounts.slice(0, 5).map((account) => (
            <View key={account.id} style={styles.accountRow}>
              <View style={styles.accountLeft}>
                <View
                  style={[
                    styles.accountAvatar,
                    { backgroundColor: (account.color || '#6366f1') + '22' },
                  ]}
                >
                  <Icon
                    name={ACCOUNT_META[account.type]?.icon || 'wallet'}
                    size={20}
                    color={account.color || '#6366f1'}
                  />
                </View>
                <View>
                  <Text style={styles.accountName}>{account.name}</Text>
                  <Text style={styles.accountMeta}>
                    {ACCOUNT_META[account.type]?.label}{' '}
                    {account.accountNumber ? `• ${account.accountNumber}` : ''}
                  </Text>
                </View>
              </View>
              <Text style={styles.accountAmount}>
                රු {Number(account.balance || 0).toLocaleString()}
              </Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>වියදම් ඉලක්ක</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
            <Text style={styles.sectionLink}>සංස්කරණය</Text>
          </TouchableOpacity>
        </View>
        {categories.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="target" size={36} color="#94a3b8" />
            <Text style={styles.emptyText}>කාණ්ඩ සකසා නැත</Text>
          </View>
        ) : (
          categories.slice(0, 4).map((category) => {
            const spent = spendingByCategory[category.id] || 0;
            const target = Number(category.target || 0);
            const progress = target === 0 ? 0 : Math.min(1, spent / target);
            return (
              <View key={category.id} style={styles.budgetRow}>
                <View style={styles.budgetHeader}>
                  <Text style={styles.budgetName}>{category.name}</Text>
                  <Text style={styles.budgetAmount}>
                    රු {spent.toLocaleString()} / {target.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${progress * 100}%`,
                        backgroundColor: progress >= 1 ? '#f87171' : '#34d399',
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })
        )}
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>අවසන් ගනුදෙනු</Text>
          <TouchableOpacity onPress={goToAddTransaction}>
            <Text style={styles.sectionLink}>නව ගනුදෙනුවක්</Text>
          </TouchableOpacity>
        </View>
        {recentTransactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="clipboard-text-outline" size={36} color="#94a3b8" />
            <Text style={styles.emptyText}>ගනුදෙනුක් නැත</Text>
          </View>
        ) : (
          recentTransactions.map(renderTransaction)
        )}
      </View>

      <TouchableOpacity style={styles.fab} onPress={goToAddTransaction}>
        <Icon name="plus" size={28} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
}

function SummaryCard({ title, amount, icon, accent, onPress }) {
  return (
    <TouchableOpacity
      style={[summaryStyles.card, { backgroundColor: accent + '22', borderColor: accent + '55' }]}
      activeOpacity={onPress ? 0.85 : 1}
      onPress={onPress}
    >
      <View style={[summaryStyles.iconWrap, { backgroundColor: accent + '33' }]}>
        <Icon name={icon} size={20} color={accent} />
      </View>
      <Text style={summaryStyles.cardTitle}>{title}</Text>
      <Text style={[summaryStyles.cardAmount, { color: accent }]}>
        රු {amount.toLocaleString()}
      </Text>
    </TouchableOpacity>
  );
}

const summaryStyles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 12,
    marginRight: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: '#94a3b8',
    fontWeight: '600',
  },
  cardAmount: {
    fontSize: 22,
    fontWeight: '800',
  },
});

const getStyles = (darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#0f172a' : '#f1f5f9',
      padding: 16,
    },
    summaryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 10,
    },
    quickRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
    },
    quickButton: {
      flex: 1,
      backgroundColor: '#6366f1',
      padding: 14,
      borderRadius: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    quickButtonText: {
      color: '#fff',
      fontWeight: '700',
    },
    quickButtonOutline: {
      flex: 1,
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      padding: 14,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: '#6366f1',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    quickButtonOutlineText: {
      color: '#6366f1',
      fontWeight: '700',
    },
    sectionCard: {
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      borderRadius: 20,
      padding: 18,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: darkMode ? '#334155' : '#e2e8f0',
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    sectionTitle: {
      color: darkMode ? '#f8fafc' : '#0f172a',
      fontWeight: '700',
      fontSize: 16,
    },
    sectionLink: {
      color: '#818cf8',
      fontWeight: '600',
    },
    emptyState: {
      alignItems: 'center',
      padding: 20,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: darkMode ? '#334155' : '#e2e8f0',
    },
    emptyText: {
      color: darkMode ? '#cbd5f5' : '#475569',
      marginTop: 8,
    },
    accountRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    accountLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    accountAvatar: {
      width: 44,
      height: 44,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    accountName: {
      color: darkMode ? '#f8fafc' : '#0f172a',
      fontWeight: '600',
    },
    accountMeta: {
      color: darkMode ? '#94a3b8' : '#475569',
      fontSize: 12,
    },
    accountAmount: {
      color: darkMode ? '#f8fafc' : '#0f172a',
      fontWeight: '700',
    },
    budgetRow: {
      marginBottom: 12,
    },
    budgetHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    budgetName: {
      color: darkMode ? '#f8fafc' : '#0f172a',
      fontWeight: '600',
    },
    budgetAmount: {
      color: darkMode ? '#94a3b8' : '#475569',
      fontWeight: '600',
    },
    progressBar: {
      height: 8,
      borderRadius: 20,
      backgroundColor: darkMode ? '#0f172a' : '#e2e8f0',
    },
    progressFill: {
      height: '100%',
      borderRadius: 20,
    },
    transactionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: darkMode ? '#334155' : '#e2e8f0',
    },
    transactionLeft: {
      flex: 1,
      marginRight: 10,
    },
    transactionTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    transactionDesc: {
      color: darkMode ? '#f8fafc' : '#0f172a',
      fontWeight: '600',
    },
    transactionDate: {
      color: darkMode ? '#94a3b8' : '#64748b',
      fontSize: 12,
    },
    transactionMeta: {
      color: darkMode ? '#cbd5f5' : '#475569',
      fontSize: 12,
    },
    transactionAmount: {
      fontWeight: '700',
      fontSize: 16,
    },
    fab: {
      position: 'absolute',
      bottom: 24,
      right: 24,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#6366f1',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 6,
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
  });