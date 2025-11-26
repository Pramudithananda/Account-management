import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUserProfile } from '../contexts/UserProfileContext';

export default function CategoriesScreen() {
  const { currentUser, updateCategories } = useUserProfile();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    target: '0',
    icon: 'folder',
  });

  const categories = currentUser?.categories || [];
  const darkMode = currentUser?.settings?.darkMode ?? true;
  const styles = getStyles(darkMode);

  const ICONS = [
    'food', 'car', 'home', 'shopping-outline', 'gamepad', 
    'lightbulb', 'medkit', 'school', 'gift', 'phone',
    'laptop', 'credit-card', 'fitness', 'baby-carriage', 'paw'
  ];

  const handleSave = async () => {
    if (!formData.name.trim()) {
      Alert.alert('දෝෂය', 'කරුණාකර කාණ්ඩයේ නම ඇතුළත් කරන්න');
      return;
    }

    const target = parseFloat(formData.target) || 0;
    
    let updatedCategories;
    if (editingCategory) {
      updatedCategories = categories.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, name: formData.name, target, icon: formData.icon }
          : cat
      );
    } else {
      const newCategory = {
        id: Date.now().toString(),
        name: formData.name,
        target,
        spent: 0,
        icon: formData.icon,
        color: getRandomColor(),
      };
      updatedCategories = [...categories, newCategory];
    }

    await updateCategories(updatedCategories);
    closeModal();
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'කාණ්ඩය මකන්න',
      'ඔබට මෙම කාණ්ඩය මකා දැමීමට අවශ්‍යද?',
      [
        { text: 'අවලංගු කරන්න', style: 'cancel' },
        {
          text: 'මකන්න',
          style: 'destructive',
          onPress: async () => {
            const updatedCategories = categories.filter(cat => cat.id !== id);
            await updateCategories(updatedCategories);
          },
        },
      ]
    );
  };

  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        target: category.target.toString(),
        icon: category.icon || 'folder',
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        target: '0',
        icon: 'folder',
      });
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingCategory(null);
  };

  const getRandomColor = () => {
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getProgress = (spent, target) => {
    if (target === 0) return 0;
    return Math.min((spent / target) * 100, 100);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {categories.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="folder-outline" size={64} color="#6b7280" />
            <Text style={styles.emptyText}>කාණ්ඩ නැත</Text>
            <Text style={styles.emptySubtext}>බජට් කළමනාකරණය සඳහා කාණ්ඩ එක් කරන්න</Text>
          </View>
        ) : (
          categories.map(category => {
            const progress = getProgress(category.spent, category.target);
            const remaining = category.target - category.spent;
            
            return (
              <View key={category.id} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryTitleRow}>
                    <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
                      <Icon name={category.icon} size={24} color="#fff" />
                    </View>
                    <View style={styles.categoryInfo}>
                      <Text style={styles.categoryName}>{category.name}</Text>
                      <Text style={styles.categoryBudget}>
                        රු {category.spent.toLocaleString()} / රු {category.target.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.categoryActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => openModal(category)}
                    >
                      <Icon name="pencil" size={20} color="#6366f1" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleDelete(category.id)}
                    >
                      <Icon name="delete" size={20} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${progress}%`,
                        backgroundColor: progress >= 100 ? '#ef4444' : category.color
                      }
                    ]} 
                  />
                </View>

                <View style={styles.categoryFooter}>
                  <Text style={[
                    styles.remainingText,
                    remaining < 0 && styles.overBudget
                  ]}>
                    {remaining >= 0 
                      ? `ඉතිරිය: රු ${remaining.toLocaleString()}`
                      : `වැඩිය: රු ${Math.abs(remaining).toLocaleString()}`
                    }
                  </Text>
                  <Text style={styles.progressText}>{progress.toFixed(1)}%</Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => openModal()}
      >
        <Icon name="plus" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Add/Edit Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>
                {editingCategory ? 'කාණ්ඩය සංස්කරණය' : 'නව කාණ්ඩයක් එක් කරන්න'}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="කාණ්ඩයේ නම"
                placeholderTextColor="#6b7280"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />

              <TextInput
                style={styles.input}
                placeholder="මසික ඉලක්කය (රු)"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
                value={formData.target}
                onChangeText={(text) => setFormData({ ...formData, target: text })}
              />

              <Text style={styles.iconLabel}>අයිකනය තෝරන්න</Text>
              <View style={styles.iconGrid}>
                {ICONS.map(icon => (
                  <TouchableOpacity
                    key={icon}
                    style={[
                      styles.iconOption,
                      formData.icon === icon && styles.selectedIcon
                    ]}
                    onPress={() => setFormData({ ...formData, icon })}
                  >
                    <Icon 
                      name={icon} 
                      size={28} 
                      color={formData.icon === icon ? '#6366f1' : '#94a3b8'} 
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={closeModal}
                >
                  <Text style={styles.buttonText}>අවලංගු කරන්න</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSave}
                >
                  <Text style={styles.buttonText}>සුරකින්න</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const getStyles = (darkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkMode ? '#0f172a' : '#f1f5f9',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    marginTop: 50,
  },
  emptyText: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 18,
    marginTop: 15,
    fontWeight: '600',
  },
  emptySubtext: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  categoryCard: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categoryBudget: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
  },
  categoryActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    padding: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: darkMode ? '#334155' : '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  categoryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  remainingText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '600',
  },
  overBudget: {
    color: '#ef4444',
  },
  progressText: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    width: '90%',
    maxHeight: '85%',
    padding: 20,
    borderRadius: 15,
  },
  modalTitle: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: darkMode ? '#334155' : '#f1f5f9',
    color: darkMode ? '#fff' : '#1e293b',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  iconLabel: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  iconOption: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: darkMode ? '#334155' : '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedIcon: {
    borderColor: '#6366f1',
    backgroundColor: darkMode ? '#312e81' : '#e0e7ff',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6b7280',
  },
  saveButton: {
    backgroundColor: '#8b5cf6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
