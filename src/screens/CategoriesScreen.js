import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppContext } from '../contexts/AppContext';

export default function CategoriesScreen() {
  const { categories, setCategories, darkMode } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    target: '0',
    spent: '0',
  });
  
  const styles = getStyles(darkMode);
  
  const handleSave = () => {
    const target = parseFloat(formData.target) || 0;
    const spent = parseFloat(formData.spent) || 0;
    
    if (editingCategory) {
      // Update existing category
      const updatedCategories = categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...formData, target, spent }
          : cat
      );
      setCategories(updatedCategories);
    } else {
      // Add new category
      const newCategory = {
        id: Date.now().toString(),
        ...formData,
        target,
        spent,
      };
      setCategories([...categories, newCategory]);
    }
    
    closeModal();
  };
  
  const handleDelete = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };
  
  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        target: category.target.toString(),
        spent: category.spent.toString(),
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        target: '0',
        spent: '0',
      });
    }
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setModalVisible(false);
    setEditingCategory(null);
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
            <Text style={styles.emptySubtext}>නව කාණ්ඩයක් එක් කරන්න</Text>
          </View>
        ) : (
          categories.map(category => {
            const progress = getProgress(category.spent, category.target);
            const isOverBudget = category.spent > category.target;
            
            return (
              <View key={category.id} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryAmount}>
                      රු {category.spent.toLocaleString()} / රු {category.target.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.categoryActions}>
                    <TouchableOpacity 
                      style={styles.editButton}
                      onPress={() => openModal(category)}
                    >
                      <Icon name="pencil" size={20} color="#6366f1" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.deleteButton}
                      onPress={() => handleDelete(category.id)}
                    >
                      <Icon name="delete" size={20} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill,
                        { 
                          width: `${progress}%`,
                          backgroundColor: isOverBudget ? '#ef4444' : '#10b981'
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[
                    styles.progressText,
                    isOverBudget && styles.overBudgetText
                  ]}>
                    {progress.toFixed(0)}%
                  </Text>
                </View>
                
                {isOverBudget && (
                  <View style={styles.warningBadge}>
                    <Icon name="alert" size={16} color="#ef4444" />
                    <Text style={styles.warningText}>
                      අයවැය ඉක්මවා ගොස් ඇත
                    </Text>
                  </View>
                )}
              </View>
            );
          })
        )}
      </ScrollView>
      
      {/* Add Button */}
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
              placeholder="ඉලක්ක මුදල (රු)"
              placeholderTextColor="#6b7280"
              keyboardType="numeric"
              value={formData.target}
              onChangeText={(text) => setFormData({ ...formData, target: text })}
            />
            
            <TextInput
              style={styles.input}
              placeholder="වැය කළ මුදල (රු)"
              placeholderTextColor="#6b7280"
              keyboardType="numeric"
              value={formData.spent}
              onChangeText={(text) => setFormData({ ...formData, spent: text })}
            />
            
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
  categoryCard: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
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
  categoryAmount: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
  },
  categoryActions: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    padding: 8,
  },
  deleteButton: {
    padding: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: darkMode ? '#334155' : '#e5e7eb',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressText: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
    fontWeight: '600',
    minWidth: 45,
    textAlign: 'right',
  },
  overBudgetText: {
    color: '#ef4444',
  },
  warningBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
    padding: 8,
    backgroundColor: '#fef2f2',
    borderRadius: 8,
  },
  warningText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
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
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    backgroundColor: '#6366f1',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
