import React, { useContext, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppContext } from '../../App';

export default function CategoriesScreen() {
  const { categories, setCategories, transactions, darkMode } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    target: '0',
  });

  const spendingByCategory = useMemo(() => {
    return transactions.reduce((acc, txn) => {
      if (txn.type === 'expense' && txn.categoryId) {
        acc[txn.categoryId] = (acc[txn.categoryId] || 0) + Math.abs(txn.amount);
      }
      return acc;
    }, {});
  }, [transactions]);

  const totals = useMemo(() => {
    const target = categories.reduce((sum, cat) => sum + Number(cat.target || 0), 0);
    const spent = categories.reduce(
      (sum, cat) => sum + (spendingByCategory[cat.id] || 0),
      0
    );
    return { target, spent };
  }, [categories, spendingByCategory]);

  const styles = getStyles(darkMode);

  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        target: String(category.target || 0),
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        target: '0',
      });
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingCategory(null);
  };

  const handleSave = () => {
    const name = formData.name.trim();
    const target = parseFloat(formData.target) || 0;

    if (!name) {
      Alert.alert('කාණ්ඩ නම අවශ්‍යයි');
      return;
    }

    if (target < 0) {
      Alert.alert('වලංගු ඉලක්කයක් ඇතුල් කරන්න');
      return;
    }

    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, name, target } : cat
        )
      );
    } else {
      setCategories([
        ...categories,
        { id: `cat-${Date.now()}`, name, target },
      ]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    Alert.alert('මකා දැමීම', 'මෙම කාණ්ඩය මකාදමන්නද?', [
      { text: 'නැහැ', style: 'cancel' },
      {
        text: 'ඔව්',
        style: 'destructive',
        onPress: () => setCategories(categories.filter((cat) => cat.id !== id)),
      },
    ]);
  };

  const renderCategoryCard = (category) => {
    const spent = spendingByCategory[category.id] || 0;
    const target = Number(category.target || 0);
    const progress = target === 0 ? 0 : Math.min(1, spent / target);

    return (
      <View key={category.id} style={styles.categoryCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.categoryName}>{category.name}</Text>
          <View style={styles.cardActions}>
            <TouchableOpacity onPress={() => openModal(category)}>
              <Icon name="pencil" size={20} color="#fbbf24" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(category.id)}>
              <Icon name="delete" size={20} color="#f87171" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            රු {spent.toLocaleString()} / {target.toLocaleString()}
          </Text>
          <Text
            style={[
              styles.progressStatus,
              progress >= 1 && styles.progressExceeded,
            ]}
          >
            {Math.round(progress * 100)}%
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress * 100}%`,
                backgroundColor: progress >= 1 ? '#ef4444' : '#22d3ee',
              },
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.summaryCard}>
          <Icon name="target" size={36} color="#facc15" />
          <Text style={styles.summaryLabel}>මාසික ඉලක්කය</Text>
          <Text style={styles.summaryAmount}>රු {totals.target.toLocaleString()}</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryMeta}>වියදම්: රු {totals.spent.toLocaleString()}</Text>
            <Text style={styles.summaryMeta}>
              ඉතුරු: රු {(totals.target - totals.spent).toLocaleString()}
            </Text>
          </View>
        </View>

        {categories.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="playlist-plus" size={48} color="#94a3b8" />
            <Text style={styles.emptyTitle}>කාණ්ඩ එකතු කර නැත</Text>
            <Text style={styles.emptySubtitle}>
              ඔබගේ වියදම් හසුරුවන්න නව කාණ්ඩ සකසා ගන්න
            </Text>
          </View>
        ) : (
          categories.map(renderCategoryCard)
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => openModal()}>
        <Icon name="plus" size={26} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingCategory ? 'කාණ්ඩය සංස්කරණය කරන්න' : 'නව කාණ්ඩයක්'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="කාණ්ඩ නම (උදා: ඉන්ධන)"
              placeholderTextColor="#94a3b8"
              value={formData.name}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, name: text }))}
            />

            <TextInput
              style={styles.input}
              placeholder="මාසික ඉලක්කය (රු)"
              placeholderTextColor="#94a3b8"
              keyboardType="numeric"
              value={formData.target}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, target: text }))}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.buttonText}>අවලංගු</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>සුරකින්න</Text>
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
    content: {
      padding: 16,
      paddingBottom: 120,
    },
    summaryCard: {
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      padding: 20,
      borderRadius: 18,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: darkMode ? '#334155' : '#e2e8f0',
      alignItems: 'flex-start',
      gap: 6,
    },
    summaryLabel: {
      color: darkMode ? '#94a3b8' : '#475569',
      fontWeight: '600',
    },
    summaryAmount: {
      fontSize: 32,
      fontWeight: '800',
      color: darkMode ? '#e0e7ff' : '#1e1b4b',
    },
    summaryRow: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    summaryMeta: {
      color: darkMode ? '#cbd5f5' : '#475569',
      fontWeight: '600',
    },
    categoryCard: {
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      padding: 18,
      borderRadius: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: darkMode ? '#334155' : '#e2e8f0',
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    categoryName: {
      color: darkMode ? '#f8fafc' : '#0f172a',
      fontSize: 18,
      fontWeight: '700',
    },
    cardActions: {
      flexDirection: 'row',
      gap: 12,
    },
    progressRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
    },
    progressText: {
      color: darkMode ? '#cbd5f5' : '#475569',
      fontWeight: '600',
    },
    progressStatus: {
      fontWeight: '700',
      color: '#2dd4bf',
    },
    progressExceeded: {
      color: '#f87171',
    },
    progressBar: {
      height: 10,
      borderRadius: 20,
      backgroundColor: darkMode ? '#0f172a' : '#e2e8f0',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 20,
    },
    emptyState: {
      alignItems: 'center',
      padding: 40,
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: darkMode ? '#334155' : '#e2e8f0',
      marginTop: 30,
    },
    emptyTitle: {
      color: darkMode ? '#f8fafc' : '#0f172a',
      fontWeight: '700',
      fontSize: 18,
      marginTop: 12,
    },
    emptySubtitle: {
      color: darkMode ? '#cbd5f5' : '#475569',
      textAlign: 'center',
      marginTop: 6,
    },
    fab: {
      position: 'absolute',
      right: 24,
      bottom: 24,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#6366f1',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 6,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    modalContent: {
      width: '100%',
      backgroundColor: darkMode ? '#0f172a' : '#fff',
      borderRadius: 20,
      padding: 20,
    },
    modalTitle: {
      color: darkMode ? '#f8fafc' : '#0f172a',
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      backgroundColor: darkMode ? '#1e293b' : '#f1f5f9',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      color: darkMode ? '#f8fafc' : '#0f172a',
      borderWidth: 1,
      borderColor: darkMode ? '#334155' : '#e2e8f0',
    },
    modalButtons: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 10,
    },
    cancelButton: {
      flex: 1,
      backgroundColor: '#475569',
      padding: 14,
      borderRadius: 12,
      alignItems: 'center',
    },
    saveButton: {
      flex: 1,
      backgroundColor: '#6366f1',
      padding: 14,
      borderRadius: 12,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '700',
    },
  });
