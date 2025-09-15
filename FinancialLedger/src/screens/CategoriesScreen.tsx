import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import {
  Card,
  Title,
  FAB,
  TextInput,
  Button,
  IconButton,
  ProgressBar,
  Portal,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useApp } from '../context/AppContext';
import { ExpenseCategory } from '../types';

const CategoriesScreen: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useApp();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ExpenseCategory | null>(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  
  // Form states
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('folder');
  const [selectedColor, setSelectedColor] = useState('#FF9800');

  const icons = [
    'pencil', 'folder', 'car', 'food', 'home', 'shopping',
    'medical-bag', 'school', 'phone', 'laptop', 'book', 'gift'
  ];
  
  const colors = [
    '#FF9800', '#4CAF50', '#2196F3', '#9C27B0', '#FF5722',
    '#00BCD4', '#FFC107', '#795548', '#607D8B', '#E91E63'
  ];

  const formatCurrency = (amount: number) => {
    return `රු ${amount.toLocaleString('si-LK', { minimumFractionDigits: 2 })}`;
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setName('');
    setTargetAmount('');
    setDescription('');
    setSelectedIcon('folder');
    setSelectedColor('#FF9800');
    setModalVisible(true);
  };

  const openEditModal = (category: ExpenseCategory) => {
    setEditingCategory(category);
    setName(category.name);
    setTargetAmount(category.targetAmount.toString());
    setDescription(category.description || '');
    setSelectedIcon(category.icon);
    setSelectedColor(category.color);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('දෝෂය', 'කරුණාකර නමක් ඇතුළත් කරන්න');
      return;
    }

    const target = parseFloat(targetAmount);
    if (!targetAmount || isNaN(target) || target <= 0) {
      Alert.alert('දෝෂය', 'කරුණාකර වලංගු ඉලක්ක මුදලක් ඇතුළත් කරන්න');
      return;
    }

    try {
      if (editingCategory) {
        await updateCategory({
          ...editingCategory,
          name,
          targetAmount: target,
          description,
          icon: selectedIcon,
          color: selectedColor,
        });
        Alert.alert('සාර්ථකයි', 'කාණ්ඩය යාවත්කාලීන කරන ලදි');
      } else {
        await addCategory({
          name,
          targetAmount: target,
          currentAmount: 0,
          description,
          icon: selectedIcon,
          color: selectedColor,
        });
        Alert.alert('සාර්ථකයි', 'නව කාණ්ඩය එකතු කරන ලදි');
      }
      setModalVisible(false);
    } catch (error) {
      Alert.alert('දෝෂය', 'කාණ්ඩය සුරැකීමේදී දෝෂයක් ඇති විය');
    }
  };

  const handleDelete = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory(categoryToDelete);
        Alert.alert('සාර්ථකයි', 'කාණ්ඩය මකා දමන ලදි');
      } catch (error) {
        Alert.alert('දෝෂය', 'කාණ්ඩය මකා දැමීමේදී දෝෂයක් ඇති විය');
      }
    }
    setDeleteDialogVisible(false);
    setCategoryToDelete(null);
  };

  const confirmDelete = (categoryId: string) => {
    setCategoryToDelete(categoryId);
    setDeleteDialogVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title style={styles.title}>වියදම් කාණ්ඩ</Title>
        
        {categories.map((category) => {
          const progress = category.targetAmount > 0 
            ? category.currentAmount / category.targetAmount 
            : 0;
          const isOverBudget = category.currentAmount > category.targetAmount;
          
          return (
            <Card key={category.id} style={styles.card}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <View style={styles.categoryHeader}>
                    <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
                      <MaterialCommunityIcons
                        name={category.icon as any}
                        size={24}
                        color="white"
                      />
                    </View>
                    <View style={styles.categoryDetails}>
                      <Text style={styles.categoryName}>{category.name}</Text>
                      {category.description && (
                        <Text style={styles.categoryDescription}>{category.description}</Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.actions}>
                    <IconButton
                      icon="pencil"
                      size={20}
                      onPress={() => openEditModal(category)}
                    />
                    <IconButton
                      icon="delete"
                      size={20}
                      onPress={() => confirmDelete(category.id)}
                    />
                  </View>
                </View>
                
                <View style={styles.amountContainer}>
                  <View style={styles.amountRow}>
                    <Text style={styles.amountLabel}>වියදම් කළ මුදල:</Text>
                    <Text style={[styles.amountValue, isOverBudget && styles.overBudget]}>
                      {formatCurrency(category.currentAmount)}
                    </Text>
                  </View>
                  <View style={styles.amountRow}>
                    <Text style={styles.amountLabel}>ඉලක්ක මුදල:</Text>
                    <Text style={styles.amountValue}>
                      {formatCurrency(category.targetAmount)}
                    </Text>
                  </View>
                </View>
                
                <ProgressBar
                  progress={Math.min(progress, 1)}
                  color={isOverBudget ? '#f44336' : category.color}
                  style={styles.progressBar}
                />
                
                <View style={styles.progressInfo}>
                  <Text style={styles.progressText}>
                    {(progress * 100).toFixed(1)}% භාවිතා කර ඇත
                  </Text>
                  {isOverBudget && (
                    <Text style={styles.overBudgetText}>
                      ඉලක්කය ඉක්මවා ඇත!
                    </Text>
                  )}
                </View>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={openAddModal}
      />

      {/* Add/Edit Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Title style={styles.modalTitle}>
              {editingCategory ? 'කාණ්ඩය සංස්කරණය' : 'නව කාණ්ඩය'}
            </Title>
            
            <ScrollView>
              <TextInput
                label="කාණ්ඩ නම"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
              />
              
              <TextInput
                label="ඉලක්ක මුදල (රු)"
                value={targetAmount}
                onChangeText={setTargetAmount}
                keyboardType="decimal-pad"
                mode="outlined"
                style={styles.input}
              />
              
              <TextInput
                label="විස්තරය (අවශ්‍ය නම්)"
                value={description}
                onChangeText={setDescription}
                mode="outlined"
                multiline
                numberOfLines={2}
                style={styles.input}
              />
              
              <Text style={styles.label}>අයිකනය තෝරන්න</Text>
              <View style={styles.iconGrid}>
                {icons.map((icon) => (
                  <TouchableOpacity
                    key={icon}
                    style={[
                      styles.iconOption,
                      selectedIcon === icon && styles.selectedIcon,
                    ]}
                    onPress={() => setSelectedIcon(icon)}
                  >
                    <MaterialCommunityIcons
                      name={icon as any}
                      size={24}
                      color={selectedIcon === icon ? 'white' : '#333'}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              
              <Text style={styles.label}>වර්ණය තෝරන්න</Text>
              <View style={styles.colorGrid}>
                {colors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      selectedColor === color && styles.selectedColor,
                    ]}
                    onPress={() => setSelectedColor(color)}
                  />
                ))}
              </View>
            </ScrollView>
            
            <View style={styles.modalButtons}>
              <Button
                mode="outlined"
                onPress={() => setModalVisible(false)}
                style={styles.modalButton}
              >
                අවලංගු කරන්න
              </Button>
              <Button
                mode="contained"
                onPress={handleSave}
                style={styles.modalButton}
              >
                සුරකින්න
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={() => setDeleteDialogVisible(false)}>
          <Dialog.Title>තහවුරු කරන්න</Dialog.Title>
          <Dialog.Content>
            <Paragraph>මෙම කාණ්ඩය මකා දැමීමට අවශ්‍යද?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>අවලංගු කරන්න</Button>
            <Button onPress={handleDelete} textColor="#f44336">මකා දමන්න</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryDetails: {
    marginLeft: 12,
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
  },
  amountContainer: {
    marginTop: 16,
    marginBottom: 12,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  amountLabel: {
    fontSize: 14,
    color: '#666',
  },
  amountValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  overBudget: {
    color: '#f44336',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  overBudgetText: {
    fontSize: 12,
    color: '#f44336',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200EE',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  iconOption: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    margin: 4,
  },
  selectedIcon: {
    backgroundColor: '#6200EE',
    borderColor: '#6200EE',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  colorOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    margin: 4,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default CategoriesScreen;