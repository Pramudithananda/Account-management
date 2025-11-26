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
import { TriangleColorPicker } from 'react-native-color-picker';
import { AppContext } from '../../app';

const PRESET_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', 
  '#84cc16', '#22c55e', '#10b981', '#14b8a6',
  '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
  '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
];

export default function CashAccountsScreen() {
  const { accounts, setAccounts, darkMode } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    balance: '0',
    color: '#10b981',
  });
  
  const styles = getStyles(darkMode);
  
  // Calculate total
  const totalBalance = accounts.cash.reduce((sum, acc) => sum + (acc.balance || 0), 0);
  
  const handleSave = () => {
    const balance = parseFloat(formData.balance) || 0;
    
    if (editingAccount) {
      // Update existing account
      const updatedAccounts = {
        ...accounts,
        cash: accounts.cash.map(acc => 
          acc.id === editingAccount.id 
            ? { ...acc, ...formData, balance }
            : acc
        )
      };
      setAccounts(updatedAccounts);
    } else {
      // Add new account
      const newAccount = {
        id: Date.now().toString(),
        ...formData,
        balance,
      };
      setAccounts({
        ...accounts,
        cash: [...accounts.cash, newAccount]
      });
    }
    
    closeModal();
  };
  
  const handleDelete = (id) => {
    setAccounts({
      ...accounts,
      cash: accounts.cash.filter(acc => acc.id !== id)
    });
  };
  
  const openModal = (account = null) => {
    if (account) {
      setEditingAccount(account);
      setFormData({
        name: account.name,
        balance: account.balance.toString(),
        color: account.color || '#10b981',
      });
    } else {
      setEditingAccount(null);
      setFormData({
        name: '',
        balance: '0',
        color: '#10b981',
      });
    }
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setModalVisible(false);
    setEditingAccount(null);
    setColorPickerVisible(false);
  };
  
  const selectPresetColor = (color) => {
    setFormData({ ...formData, color });
  };
  
  return (
    <View style={styles.container}>
      {/* Total Balance */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>සම්පූර්ණ මුදල් ශේෂය</Text>
        <Text style={styles.totalAmount}>රු {totalBalance.toLocaleString()}</Text>
        <Text style={styles.accountCount}>{accounts.cash.length} ගිණුම් වලින්</Text>
      </View>
      
      {/* Accounts List */}
      <ScrollView style={styles.accountsList}>
        {accounts.cash.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="cash-multiple" size={64} color="#6b7280" />
            <Text style={styles.emptyText}>මුදල් ගිණුම් නැත</Text>
            <Text style={styles.emptySubtext}>නව ගිණුමක් එක් කරන්න</Text>
          </View>
        ) : (
          accounts.cash.map(account => (
            <View 
              key={account.id} 
              style={[
                styles.accountCard,
                { borderLeftColor: account.color || '#10b981', borderLeftWidth: 5 }
              ]}
            >
              <View style={styles.accountInfo}>
                <View style={styles.accountHeader}>
                  <View 
                    style={[
                      styles.colorIndicator, 
                      { backgroundColor: account.color || '#10b981' }
                    ]} 
                  />
                  <Text style={styles.accountName}>{account.name}</Text>
                </View>
                <Text style={styles.accountBalance}>
                  ශේෂය: රු {account.balance.toLocaleString()}
                </Text>
              </View>
              <View style={styles.accountActions}>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => openModal(account)}
                >
                  <Icon name="pencil" size={20} color="#10b981" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => handleDelete(account.id)}
                >
                  <Icon name="delete" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>
                {editingAccount ? 'ගිණුම සංස්කරණය' : 'නව මුදල් ගිණුමක් එක් කරන්න'}
              </Text>
              
              <TextInput
                style={styles.input}
                placeholder="ගිණුම් නම (උදා: පුබුන මුදල්, වොලට්)"
                placeholderTextColor="#6b7280"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />
              
              <TextInput
                style={styles.input}
                placeholder="ශේෂය (රු)"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
                value={formData.balance}
                onChangeText={(text) => setFormData({ ...formData, balance: text })}
              />
              
              {/* Color Picker Section */}
              <View style={styles.colorSection}>
                <Text style={styles.colorLabel}>වර්ණය තෝරන්න</Text>
                
                {/* Selected Color Display */}
                <View style={styles.selectedColorContainer}>
                  <View 
                    style={[
                      styles.selectedColorBox, 
                      { backgroundColor: formData.color }
                    ]} 
                  />
                  <Text style={styles.selectedColorText}>{formData.color}</Text>
                </View>
                
                {/* Preset Colors */}
                <Text style={styles.presetLabel}>ඉක්මන් වර්ණ</Text>
                <View style={styles.presetColorsGrid}>
                  {PRESET_COLORS.map((color) => (
                    <TouchableOpacity
                      key={color}
                      style={[
                        styles.presetColorBox,
                        { backgroundColor: color },
                        formData.color === color && styles.selectedPresetColor
                      ]}
                      onPress={() => selectPresetColor(color)}
                    >
                      {formData.color === color && (
                        <Icon name="check" size={20} color="#fff" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
                
                {/* Custom Color Picker Toggle */}
                <TouchableOpacity 
                  style={styles.customColorButton}
                  onPress={() => setColorPickerVisible(!colorPickerVisible)}
                >
                  <Icon name="palette" size={20} color="#10b981" />
                  <Text style={styles.customColorText}>
                    {colorPickerVisible ? 'වර්ණ තෝරනය වසන්න' : 'අභිරුචි වර්ණයක් තෝරන්න'}
                  </Text>
                </TouchableOpacity>
                
                {/* Advanced Color Picker */}
                {colorPickerVisible && (
                  <View style={styles.colorPickerContainer}>
                    <TriangleColorPicker
                      color={formData.color}
                      onColorChange={(color) => setFormData({ ...formData, color })}
                      onColorSelected={(color) => setFormData({ ...formData, color })}
                      style={styles.colorPicker}
                    />
                  </View>
                )}
              </View>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={closeModal}
                >
                  <Text style={styles.buttonText}>අවලංගු කරන්න</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.modalButton, 
                    styles.saveButton,
                    { backgroundColor: formData.color }
                  ]}
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
  totalCard: {
    backgroundColor: '#10b981',
    padding: 25,
    margin: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  totalLabel: {
    color: '#d1fae5',
    fontSize: 14,
    marginBottom: 10,
  },
  totalAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  accountCount: {
    color: '#d1fae5',
    fontSize: 12,
  },
  accountsList: {
    flex: 1,
    padding: 15,
  },
  accountCard: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 18,
    fontWeight: 'bold',
  },
  accountBalance: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  accountActions: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    padding: 8,
  },
  deleteButton: {
    padding: 8,
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
    backgroundColor: '#10b981',
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
  colorSection: {
    marginBottom: 20,
  },
  colorLabel: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  selectedColorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: darkMode ? '#334155' : '#f1f5f9',
    borderRadius: 10,
    marginBottom: 15,
  },
  selectedColorBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 2,
    borderColor: darkMode ? '#475569' : '#cbd5e1',
  },
  selectedColorText: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 16,
    fontWeight: '600',
  },
  presetLabel: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
    marginBottom: 10,
  },
  presetColorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  presetColorBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPresetColor: {
    borderColor: darkMode ? '#fff' : '#1e293b',
    borderWidth: 3,
  },
  customColorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: darkMode ? '#334155' : '#f1f5f9',
    borderRadius: 10,
    gap: 8,
  },
  customColorText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '600',
  },
  colorPickerContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: darkMode ? '#334155' : '#f1f5f9',
    borderRadius: 10,
  },
  colorPicker: {
    height: 300,
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
    backgroundColor: '#10b981',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});