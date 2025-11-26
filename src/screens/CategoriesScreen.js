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
import { AppContext } from '../../App';

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
      const updatedCategories = categories.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, ...formData, target, spent }
          : cat
      );
      setCategories(updatedCategories);
    } else {
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
  
  const getProgressPercentage = (spent, target) => {
    if (target === 0) return 0;
    return Math.min((spent / target) * 100, 100);
  };
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.categoriesList}>
        {categories.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="folder-outline" size={64} color="#6b7280" />
            <Text style={styles.emptyText}>කාණ්ඩ නැත</Text>
            <Text style={styles.emptySubtext}>නව කාණ්ඩයක් එක් කරන්න</Text>
          </View>
        ) : (
          categories.map(category => {
            const progress = getProgressPercentage(category.spent, category.target);
            const remaining = category.target - category.spent;
            
            return (
              <View key={category.id} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryName}>{category.name}</Text>
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
                
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: `${progress}%`,
                          backgroundColor: progress > 100 ? '#ef4444' : '#10b981'
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {progress.toFixed(1)}% භාවිතා කර ඇත
                  </Text>
                </View>
                
                <View style={styles.categoryStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>ඉලක්කය</Text>
                    <Text style={styles.statValue}>රු {category.target.toLocaleString()}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>වියදම්</Text>
                    <Text style={[styles.statValue, { color: '#ef4444' }]}>
                      රු {category.spent.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>ඉතිරි</Text>
                    <Text style={[styles.statValue, { color: remaining >= 0 ? '#10b981' : '#ef4444' }]}>
                      රු {remaining.toLocaleString()}
                    </Text>
                  </View>
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
              placeholder="කාණ්ඩ නම"
              placeholderTextColor="#6b7280"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            
            <TextInput
              style={styles.input}
              placeholder="ඉලක්කය (රු)"
              placeholderTextColor="#6b7280"
              keyboardType="numeric"
              value={formData.target}
              onChangeText={(text) => setFormData({ ...formData, target: text })}
            />
            
            <TextInput
              style={styles.input}
              placeholder="වියදම් (රු)"
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
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryName: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
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
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: darkMode ? '#334155' : '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 12,
  },
  categoryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 12,
    marginBottom: 5,
  },
  statValue: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 16,
    fontWeight: 'bold',
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
