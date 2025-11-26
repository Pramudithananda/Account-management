import React, { useContext, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppContext } from '../../App';

export default function SettingsScreen() {
  const {
    accounts,
    transactions,
    setTransactions,
    categories,
    setCategories,
    darkMode,
    setDarkMode,
    resetData,
    isRestoring,
  } = useContext(AppContext);

  const styles = useMemo(() => getStyles(darkMode), [darkMode]);

  const stats = useMemo(() => {
    const totalBank = accounts.bank.reduce((sum, acc) => sum + (acc.balance || 0), 0);
    const totalCash = accounts.cash.reduce((sum, acc) => sum + (acc.balance || 0), 0);
    const totalReturns = accounts.returns.reduce((sum, acc) => sum + (acc.balance || 0), 0);

    return {
      totalAccounts: accounts.bank.length + accounts.cash.length + accounts.returns.length,
      totalBank,
      totalCash,
      totalReturns,
      transactionCount: transactions.length,
      categoryCount: categories.length,
    };
  }, [accounts, transactions, categories]);

  const backupJson = useMemo(
    () =>
      JSON.stringify(
        {
          accounts,
          transactions,
          categories,
        },
        null,
        2
      ),
    [accounts, transactions, categories]
  );

  const handleClearTransactions = () => {
    if (!transactions.length) {
      Alert.alert('දත්ත නැත', 'මකාදමන ගනුදෙනු නොමැත.');
      return;
    }

    Alert.alert('ගනුදෙනු මකාදමන්න', 'සියලු ගනුදෙනු මකාදමනවාද?', [
      { text: 'නැහැ', style: 'cancel' },
      {
        text: 'ඔව්',
        style: 'destructive',
        onPress: () => setTransactions([]),
      },
    ]);
  };

  const handleResetBudgets = () => {
    Alert.alert('කාණ්ඩ Reset', 'සියලු කාණ්ඩ ඉවත් කරන්න?', [
      { text: 'නවතින්න', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: () => setCategories([]),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>තාමස කිරීම්</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.rowTitle}>Dark Mode</Text>
            <Text style={styles.rowSubtitle}>අඩි රෑ පසුබග</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={(value) => setDarkMode(value)}
            trackColor={{ false: '#cbd5f5', true: '#6366f1' }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ගිණුම් සංඛ්‍යාත</Text>
        <View style={styles.statsGrid}>
          <StatCard
            icon="bank"
            label="බැංකු මුදල්"
            value={`රු ${stats.totalBank.toLocaleString()}`}
            accent="#6366f1"
          />
          <StatCard
            icon="cash"
            label="මුදල් ශේෂය"
            value={`රු ${stats.totalCash.toLocaleString()}`}
            accent="#10b981"
          />
          <StatCard
            icon="account-multiple"
            label="ගිණුම් ගණන"
            value={`${stats.totalAccounts}`}
            accent="#f97316"
          />
          <StatCard
            icon="file-chart"
            label="ගනුදෙනු"
            value={`${stats.transactionCount}`}
            accent="#facc15"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>දත්ත පාලනය</Text>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleClearTransactions}
        >
          <Icon name="trash-can-outline" size={20} color="#f87171" />
          <View style={styles.actionBody}>
            <Text style={styles.actionTitle}>ගනුදෙනු හිස් කරන්න</Text>
            <Text style={styles.actionSubtitle}>සියලු history මකා දමන්න</Text>
          </View>
          <Icon name="chevron-right" size={22} color="#94a3b8" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleResetBudgets}>
          <Icon name="folder-remove" size={20} color="#fb7185" />
          <View style={styles.actionBody}>
            <Text style={styles.actionTitle}>කාණ්ඩ Reset</Text>
            <Text style={styles.actionSubtitle}>ආදායම්/වියදම් ඉලක්කය නැවත සකසන්න</Text>
          </View>
          <Icon name="chevron-right" size={22} color="#94a3b8" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={resetData} disabled={isRestoring}>
          <Icon name="backup-restore" size={20} color="#38bdf8" />
          <View style={styles.actionBody}>
            <Text style={styles.actionTitle}>Demo දත්ත නැවත</Text>
            <Text style={styles.actionSubtitle}>
              {isRestoring ? 'පූරණය වෙමින්...' : 'පෙරනිමි දත්ත වලට නැවත යන්න'}
            </Text>
          </View>
          <Icon name="chevron-right" size={22} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>බැකප් JSON</Text>
        <View style={styles.backupCard}>
          <Text style={styles.backupHint}>
            මෙම JSON string එක copy කරලා ඕන තැනින් import කරන්න
          </Text>
          <ScrollView horizontal>
            <Text style={styles.backupText}>{backupJson}</Text>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
  function StatCard({ icon, label, value, accent }) {
    return (
      <View
        style={[
          styles.statCard,
          {
            borderColor: accent + '55',
            backgroundColor: darkMode ? '#1e293b' : '#fff',
          },
        ]}
      >
        <View style={[styles.iconBadge, { backgroundColor: accent + '20' }]}>
          <Icon name={icon} size={20} color={accent} />
        </View>
        <Text style={[styles.statLabel, { color: darkMode ? '#cbd5f5' : '#475569' }]}>
          {label}
        </Text>
        <Text style={[styles.statValue, { color: darkMode ? '#fff' : '#0f172a' }]}>
          {value}
        </Text>
      </View>
    );
  }
}

function getStyles(darkMode) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
      padding: 16,
    },
    section: {
      marginBottom: 24,
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      borderRadius: 20,
      padding: 16,
      borderWidth: 1,
      borderColor: darkMode ? '#334155' : '#e2e8f0',
    },
    sectionTitle: {
      color: darkMode ? '#e0e7ff' : '#0f172a',
      fontWeight: '700',
      fontSize: 16,
      marginBottom: 12,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rowTitle: {
      color: darkMode ? '#f8fafc' : '#0f172a',
      fontWeight: '600',
      fontSize: 15,
    },
    rowSubtitle: {
      color: darkMode ? '#94a3b8' : '#475569',
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    statCard: {
      width: '48%',
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      gap: 6,
    },
    iconBadge: {
      width: 36,
      height: 36,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 6,
    },
    statLabel: {
      fontSize: 13,
      fontWeight: '600',
    },
    statValue: {
      fontSize: 18,
      fontWeight: '800',
    },
    actionButton: {
      flexDirection: 'row',
      backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
      borderRadius: 16,
      padding: 14,
      alignItems: 'center',
      gap: 12,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: darkMode ? '#334155' : '#e2e8f0',
    },
    actionBody: {
      flex: 1,
    },
    actionTitle: {
      color: darkMode ? '#f8fafc' : '#0f172a',
      fontWeight: '600',
    },
    actionSubtitle: {
      color: darkMode ? '#94a3b8' : '#475569',
      fontSize: 12,
    },
    backupCard: {
      backgroundColor: darkMode ? '#0f172a' : '#f1f5f9',
      borderRadius: 14,
      padding: 12,
      borderWidth: 1,
      borderColor: darkMode ? '#334155' : '#e2e8f0',
    },
    backupHint: {
      color: darkMode ? '#94a3b8' : '#475569',
      marginBottom: 8,
    },
    backupText: {
      color: darkMode ? '#e0e7ff' : '#0f172a',
      fontFamily: 'Courier',
      fontSize: 12,
      minWidth: '100%',
    },
  });
}
