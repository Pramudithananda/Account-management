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

const PRESET_COLORS = [
  '#f43f5e',
  '#fb923c',
  '#fbbf24',
  '#14b8a6',
  '#0ea5e9',
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
];

export default function CategoriesScreen() {
  const { categories, setCategories, transactions, darkMode } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    target: '',
    color: PRESET_COLORS[0],
  });

  const styles = getStyles(darkMode);

  const categoryUsageMap = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === 'expense' && transaction.categoryId) {
        acc[transaction.categoryId] =
          (acc[transaction.categoryId] || 0) + Math.abs(transaction.amount);
      }
      return acc;
    }, {});
  }, [transactions]);

  const displayCategories = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        spent: categoryUsageMap[category.id] ?? category.spent ?? 0,
      })),
    [categories, categoryUsageMap],
  );

  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        target: category.target?.toString() || '',
        color: category.color || PRESET_COLORS[0],
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        target: '',
        color: PRESET_COLORS[0],
      });
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      Alert.alert('නාමය අවශ්‍යයි', 'කාණ්ඩ නමක් ලබා දෙන්න.');
      return;
    }

    const parsedTarget = parseFloat(formData.target);
    if (!parsedTarget || parsedTarget <= 0) {
      Alert.alert('වේලාවක්', 'ගොල්මට්ටමේ ඉලක්ක මුදල 0 ට වඩා වැඩියි විය යුතුය.');
      return;
    }

    if (editingCategory) {
      const updated = categories.map((category) =>
        category.id === editingCategory.id
          ? {
              ...category,
              name: formData.name.trim(),
              target: parsedTarget,
              color: formData.color,
            }
          : category,
      );
      setCategories(updated);
    } else {
      const newCategory = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        target: parsedTarget,
        color: formData.color,
        spent: 0,
      };
      setCategories([...categories, newCategory]);
    }

    setModalVisible(false);
    setEditingCategory(null);
  };

  const handleDelete = (categoryId) => {
    Alert.alert('කාණ්ඩය මකන්න', 'ඔබට දත්ත මකන්නට ඇත්තේද?', [
      { text: 'අවලංගු කරන්න', style: 'cancel' },
      {
        text: 'මකන්න',
        style: 'destructive',
        onPress: () => {
          const filtered = categories.filter((category) => category.id !== categoryId);
          setCategories(filtered);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        {displayCategories.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name='playlist-plus' size={64} color='#94a3b8' />
            <Text style={styles.emptyTitle}>කාණ්ඩ නොමැත</Text>
            <Text style={styles.emptySubtitle}>නව කාණ්ඩයක් එක් කර පියවර ආරම්භ කරන්න.</Text>
          </View>
        ) : (
          displayCategories.map((category) => {
            const progress = Math.min(
              100,
              Math.round(((category.spent || 0) / (category.target || 1)) * 100),
            );
            return (
              <View key={category.id} style={styles.categoryCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.titleRow}>
                    <View
                      style={[styles.colorDot, { backgroundColor: category.color || '#f97316' }]}
                    />
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </View>
                  <View style={styles.cardActions}>
                    <TouchableOpacity onPress={() => openModal(category)}>
                      <Icon name='pencil' size={20} color='#6366f1' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(category.id)}>
                      <Icon name='delete' size={20} color='#ef4444' />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.targetLabel}>ඉලක්කය: රු {category.target?.toLocaleString()}</Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${progress}%`, backgroundColor: category.color || '#6366f1' },
                    ]}
                  />
                </View>
                <View style={styles.metricsRow}>
                  <View>
                    <Text style={styles.metricLabel}>වැය වූ මුදල</Text>
                    <Text style={styles.metricValue}>රු {category.spent?.toLocaleString() || 0}</Text>
                  </View>
                  <View>
                    <Text style={styles.metricLabel}>ඉතිරි</Text>
                    <Text style={styles.metricValue}>
                      රු {(category.target - (category.spent || 0)).toLocaleString()}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.metricLabel}>ප්‍රගතිය</Text>
                    <Text style={styles.metricValue}>{progress}%</Text>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => openModal()}>
        <Icon name='plus' size={28} color='#fff' />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType='slide' onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingCategory ? 'කාණ්ඩය සංස්කරණය' : 'නව කාණ්ඩයක්'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder='කාණ්ඩ නම'
              placeholderTextColor='#94a3b8'
              value={formData.name}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, name: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder='මාසික ඉලක්කය (රු)'
              placeholderTextColor='#94a3b8'
              keyboardType='numeric'
              value={formData.target}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, target: text }))}
            />

            <Text style={styles.colorLabel}>වර්ණය තෝරන්න</Text>
            <View style={styles.colorGrid}>
              {PRESET_COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorSwatch,
                    { backgroundColor: color },
                    formData.color === color && styles.selectedColorSwatch,
                  ]}
                  onPress={() => setFormData((prev) => ({ ...prev, color }))}
                >
                  {formData.color === color && <Icon name='check' size={20} color='#fff' />}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>අවලංගු</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleSave}>
                <Text style={styles.modalButtonText}>සුරකින්න</Text>
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
    categoryCard: {
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      borderRadius: 18,
      padding: 18,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 6,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    colorDot: {
      width: 16,
      height: 16,
      borderRadius: 8,
    },
    categoryName: {
      color: darkMode ? '#fff' : '#0f172a',
      fontSize: 18,
      fontWeight: '700',
    },
    cardActions: {
      flexDirection: 'row',
      gap: 12,
    },
    targetLabel: {
      color: darkMode ? '#cbd5f5' : '#475569',
      marginBottom: 10,
    },
    progressBar: {
      backgroundColor: darkMode ? '#334155' : '#e2e8f0',
      height: 10,
      borderRadius: 999,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 999,
    },
    metricsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 14,
    },
    metricLabel: {
      color: darkMode ? '#94a3b8' : '#64748b',
      fontSize: 12,
    },
    metricValue: {
      color: darkMode ? '#fff' : '#0f172a',
      fontWeight: '700',
      marginTop: 4,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
    },
    emptyTitle: {
      marginTop: 12,
      fontSize: 18,
      fontWeight: '700',
      color: darkMode ? '#fff' : '#0f172a',
    },
    emptySubtitle: {
      color: darkMode ? '#94a3b8' : '#475569',
      marginTop: 6,
      textAlign: 'center',
    },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#6366f1',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
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
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 16,
      textAlign: 'center',
    },
    input: {
      backgroundColor: darkMode ? '#1e293b' : '#f8fafc',
      borderRadius: 12,
      padding: 14,
      color: darkMode ? '#fff' : '#0f172a',
      borderWidth: 1,
      borderColor: darkMode ? '#334155' : '#e2e8f0',
      marginBottom: 12,
    },
    colorLabel: {
      color: darkMode ? '#cbd5f5' : '#0f172a',
      marginBottom: 8,
      fontWeight: '600',
    },
    colorGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 16,
    },
    colorSwatch: {
      width: 48,
      height: 48,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedColorSwatch: {
      borderColor: '#fff',
      elevation: 2,
    },
    modalActions: {
      flexDirection: 'row',
      gap: 10,
    },
    modalButton: {
      flex: 1,
      alignItems: 'center',
      padding: 14,
      borderRadius: 12,
    },
    cancelButton: {
      backgroundColor: '#475569',
    },
    saveButton: {
      backgroundColor: '#4f46e5',
    },
    modalButtonText: {
      color: '#fff',
      fontWeight: '600',
    },
  });
