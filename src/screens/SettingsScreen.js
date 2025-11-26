import React, { useContext, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
  Share,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppContext } from '../../App';

export default function SettingsScreen() {
  const {
    accounts,
    transactions,
    categories,
    darkMode,
    setDarkMode,
    resetAllData,
    importBackup,
  } = useContext(AppContext);

  const [importModalVisible, setImportModalVisible] = useState(false);
  const [importPayload, setImportPayload] = useState('');

  const styles = getStyles(darkMode);

  const totals = useMemo(() => {
    const sumBalances = (list = []) =>
      list.reduce((sum, account) => sum + (Number(account.balance) || 0), 0);

    return {
      bank: { count: accounts.bank.length, balance: sumBalances(accounts.bank) },
      cash: { count: accounts.cash.length, balance: sumBalances(accounts.cash) },
      returns: { count: accounts.returns.length, balance: sumBalances(accounts.returns) },
      transactions: transactions.length,
      categories: categories.length,
    };
  }, [accounts, transactions, categories]);

  const handleExport = async () => {
    const payload = {
      accounts,
      transactions,
      categories,
      darkMode,
    };

    try {
      await Share.share({
        title: 'Sinhala Expense Tracker Export',
        message: JSON.stringify(payload, null, 2),
      });
    } catch (error) {
      Alert.alert('දෝෂයක්', 'දත්ත export කිරීම අසාර්ථක විය.');
    }
  };

  const handleReset = () => {
    Alert.alert('දත්ත පිරිසිදු කිරීම', 'සියළුම දත්ත ඉවත් වේ. ඔබට විශ්වාසද?', [
      { text: 'අවලංගු', style: 'cancel' },
      {
        text: 'පිරිසදු කරන්න',
        style: 'destructive',
        onPress: async () => {
          await resetAllData();
          Alert.alert('සාර්ථකයි', 'දත්ත නවීකරණය කරන ලදි.');
        },
      },
    ]);
  };

  const handleImport = async () => {
    if (!importPayload.trim()) {
      Alert.alert('දත්ත අවශ්‍යයි', 'JSON දත්ත ඇතුළත් කරන්න.');
      return;
    }
    try {
      const parsed = JSON.parse(importPayload);
      await importBackup(parsed);
      setImportModalVisible(false);
      setImportPayload('');
      Alert.alert('සාර්ථකයි', 'දත්ත ආයාත කරන ලදි.');
    } catch (error) {
      Alert.alert('වැරදි JSON', 'පරීක්ෂා කර නැවත උත්සාහ කරන්න.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>පෙනුම</Text>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingDescription}>
                {darkMode ? 'අඳුරු තේමාව සක්‍රීයයි' : 'ආලෝකමත් පෙනුම සක්‍රීයයි'}
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={(value) => setDarkMode(value)}
              thumbColor={darkMode ? '#6366f1' : '#94a3b8'}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>ගිණුම් සාරාංශය</Text>
          <View style={styles.summaryGrid}>
            {[
              { label: 'බැංකු', data: totals.bank },
              { label: 'මුදල්', data: totals.cash },
              { label: 'Returns', data: totals.returns },
            ].map((item) => (
              <View key={item.label} style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>{item.label}</Text>
                <Text style={styles.summaryValue}>{item.data.count} ගිණුම්</Text>
                <Text style={styles.summaryAmount}>
                  රු {item.data.balance.toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>දත්ත හා ආරක්ෂාව</Text>
          <TouchableOpacity style={styles.actionRow} onPress={handleExport}>
            <Icon name='download-box' size={22} color='#4f46e5' />
            <View style={styles.actionCopy}>
              <Text style={styles.actionLabel}>දත්ත Export</Text>
              <Text style={styles.actionDescription}>
                JSON ගොනුවක් ලෙස දත්ත බෙදා හදා ගන්න.
              </Text>
            </View>
            <Icon name='chevron-right' size={20} color='#94a3b8' />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => setImportModalVisible(true)}
          >
            <Icon name='upload' size={22} color='#0ea5e9' />
            <View style={styles.actionCopy}>
              <Text style={styles.actionLabel}>දත්ත Import</Text>
              <Text style={styles.actionDescription}>පෙර ගොනුවකින් දත්ත ආනයනය කරන්න.</Text>
            </View>
            <Icon name='chevron-right' size={20} color='#94a3b8' />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionRow} onPress={handleReset}>
            <Icon name='trash-can-outline' size={22} color='#ef4444' />
            <View style={styles.actionCopy}>
              <Text style={[styles.actionLabel, { color: '#ef4444' }]}>සියලු දත්ත මකන්න</Text>
              <Text style={styles.actionDescription}>මකා දැමූ පසු නැවත ලබා ගත නොහැක.</Text>
            </View>
            <Icon name='chevron-right' size={20} color='#94a3b8' />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>පද්ධති තත්ත්වය</Text>
          <View style={styles.statusRow}>
            <Icon name='file-document' size={20} color='#6366f1' />
            <Text style={styles.statusText}>ගනුදෙනු {totals.transactions}</Text>
          </View>
          <View style={styles.statusRow}>
            <Icon name='shape' size={20} color='#10b981' />
            <Text style={styles.statusText}>කාණ්ඩ {totals.categories}</Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        transparent
        animationType='slide'
        visible={importModalVisible}
        onRequestClose={() => setImportModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>JSON දත්ත ඇතුළත් කරන්න</Text>
            <TextInput
              style={styles.modalInput}
              placeholder='{ "accounts": { ... } }'
              placeholderTextColor='#94a3b8'
              value={importPayload}
              onChangeText={setImportPayload}
              multiline
              numberOfLines={6}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setImportModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>ඉවත් වන්න</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleImport}
              >
                <Text style={styles.modalButtonText}>Import</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const getStyles = (darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
    },
    card: {
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      borderRadius: 18,
      padding: 18,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: darkMode ? '#334155' : '#e2e8f0',
    },
    cardTitle: {
      color: darkMode ? '#fff' : '#0f172a',
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 12,
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    settingLabel: {
      color: darkMode ? '#fff' : '#0f172a',
      fontSize: 16,
      fontWeight: '600',
    },
    settingDescription: {
      color: darkMode ? '#94a3b8' : '#475569',
      marginTop: 4,
    },
    summaryGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    summaryItem: {
      flex: 1,
      backgroundColor: darkMode ? '#0f172a' : '#f1f5f9',
      borderRadius: 16,
      padding: 14,
    },
    summaryLabel: {
      color: darkMode ? '#cbd5f5' : '#475569',
      fontSize: 12,
    },
    summaryValue: {
      color: darkMode ? '#fff' : '#0f172a',
      fontWeight: '700',
      marginTop: 6,
    },
    summaryAmount: {
      color: '#10b981',
      fontWeight: '600',
      marginTop: 4,
    },
    actionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderTopWidth: 1,
      borderColor: darkMode ? '#27344a' : '#f1f5f9',
    },
    actionCopy: {
      flex: 1,
      marginLeft: 12,
    },
    actionLabel: {
      color: darkMode ? '#fff' : '#0f172a',
      fontSize: 15,
      fontWeight: '600',
    },
    actionDescription: {
      color: darkMode ? '#94a3b8' : '#64748b',
      fontSize: 12,
      marginTop: 2,
    },
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 10,
    },
    statusText: {
      color: darkMode ? '#fff' : '#0f172a',
      fontSize: 15,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    modalContent: {
      width: '100%',
      backgroundColor: darkMode ? '#0f172a' : '#fff',
      borderRadius: 20,
      padding: 20,
    },
    modalTitle: {
      color: darkMode ? '#fff' : '#0f172a',
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 10,
    },
    modalInput: {
      minHeight: 140,
      borderWidth: 1,
      borderColor: darkMode ? '#334155' : '#e2e8f0',
      borderRadius: 14,
      padding: 12,
      color: darkMode ? '#fff' : '#0f172a',
      backgroundColor: darkMode ? '#1e293b' : '#f8fafc',
      textAlignVertical: 'top',
    },
    modalActions: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 16,
    },
    modalButton: {
      flex: 1,
      padding: 14,
      borderRadius: 14,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: '#475569',
    },
    confirmButton: {
      backgroundColor: '#4f46e5',
    },
    modalButtonText: {
      color: '#fff',
      fontWeight: '600',
    },
  });
