import React, { useContext, useState } from 'react';
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
import { AppContext } from '../../app';

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
    
    if (!formData.name) {
      Alert.alert('දෝෂය', 'කරුණාකර කාණ්ඩ නම ඇතුලත් කරන්න');
      return;
    }
    
    if (editingCategory) {
      // Update existing category
      const updatedCategories = categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, name: formData.name, target, spent }
          : cat
      );
      setCategories(updatedCategories);
    } else {
      // Add new category
      const newCategory = {
        id: Date.now().toString(),
        name: formData.name,
        target,
        spent,
      };
      setCategories([...categories, newCategory]);
    }
    
    closeModal();
  };
  
  const handleDelete = (id) => {
    Alert.alert(
      'තහවුරු කරන්න',
      'ඔබට මෙම කාණ්ඩය මකා දැමීමට අවශ්‍යද?',
      [
        { text: 'අවලංගු', style: 'cancel' },
        { 
          text: 'මකන්න', 
          style: 'destructive',
          onPress: () => {
            setCategories(categories.filter(cat => cat.id !== id));
          }
        }
      ]
    );
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
  
  const getProgressPercentage = (spent, target) => {
    if (target === 0) return 0;
    return Math.min((spent / target) * 100, 100);
  };
  
  return (
    <View style={styles.container}>
      {/* Header Stats */}
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>වියදම් කාණ්ඩ</Text>
        <Text style={styles.headerSubtitle}>මුළු කාණ්ඩ: {categories.length}</Text>
      </View>
      
      {/* Categories List */}
      <ScrollView style={styles.categoriesList}>
        {categories.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="folder-outline" size={64} color="#6b7280" />
            <Text style={styles.emptyText}>කාණ්ඩ නැත</Text>
            <Text style={styles.emptySubtext}>නව කාණ්ඩයක් එක් කරන්න</Text>
          </View>
        ) : (
          categories.map(category => {
            const percentage = getProgressPercentage(category.spent, category.target);
            const isOverBudget = category.spent > category.target;
            
            return (
              <View key={category.id} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryBudget}>
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
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar,
                      { 
                        width: `${percentage}%`,
                        backgroundColor: isOverBudget ? '#ef4444' : '#10b981'
                      }
                    ]} 
                  />
                </View>
                
                <View style={styles.categoryFooter}>
                  <Text style={[styles.percentageText, isOverBudget && styles.overBudget]}>
                    {percentage.toFixed(1)}%
                  </Text>
                  <Text style={styles.remainingText}>
                    ඉතිරි: රු {Math.max(0, category.target - category.spent).toLocaleString()}
                  </Text>
                </View>
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
              placeholder="කාණ්ඩ නම (උදා: ආහාර, ප්‍රවාහන)"
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
              placeholder="වියදම් කළ මුදල (රු)"
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
  headerCard: {
    backgroundColor: '#8b5cf6',
    padding: 25,
    margin: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    color: '#e9d5ff',
    fontSize: 14,
  },
  categoriesList: {
    flex: 1,
    padding: 15,
  },
  categoryCard: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
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
  editButton: {
    padding: 5,
  },
  deleteButton: {
    padding: 5,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: darkMode ? '#334155' : '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  categoryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  percentageText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: 'bold',
  },
  overBudget: {
    color: '#ef4444',
  },
  remainingText: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 12,
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
    backgroundColor: '#8b5cf6',
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
    backgroundColor: '#8b5cf6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
