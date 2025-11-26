import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppContext } from '../contexts/AppContext';

export default function SettingsScreen() {
  const { 
    darkMode, 
    setDarkMode, 
    currentUser, 
    users, 
    addUser, 
    switchUser, 
    deleteUser 
  } = useContext(AppContext);
  
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [switchUserModalVisible, setSwitchUserModalVisible] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
  });
  
  const styles = getStyles(darkMode);
  
  const handleAddUser = () => {
    if (!newUserForm.name.trim()) {
      Alert.alert('දෝෂය', 'කරුණාකර නමක් ඇතුළත් කරන්න');
      return;
    }
    
    addUser(newUserForm);
    setNewUserForm({ name: '', email: '' });
    setAddUserModalVisible(false);
    Alert.alert('සාර්ථකයි', 'නව පරිශීලක ගිණුම එක් කරන ලදී');
  };
  
  const handleSwitchUser = (user) => {
    switchUser(user.id);
    setSwitchUserModalVisible(false);
    Alert.alert('සාර්ථකයි', `${user.name} ගිණුමට මාරු විය`);
  };
  
  const handleDeleteUser = (userId) => {
    if (users.length === 1) {
      Alert.alert('දෝෂය', 'අවසන් පරිශීලක ගිණුම මකා දැමිය නොහැක');
      return;
    }
    
    Alert.alert(
      'තහවුරු කරන්න',
      'ඔබට මෙම පරිශීලක ගිණුම මකා දැමීමට අවශ්‍යද?',
      [
        { text: 'අවලංගු', style: 'cancel' },
        { 
          text: 'මකන්න', 
          style: 'destructive',
          onPress: () => {
            deleteUser(userId);
            Alert.alert('සාර්ථකයි', 'පරිශීලක ගිණුම මකා දමන ලදී');
          }
        },
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Current User Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>වත්මන් පරිශීලකයා</Text>
          <View style={styles.currentUserCard}>
            <Icon name="account-circle" size={60} color="#6366f1" />
            <View style={styles.currentUserInfo}>
              <Text style={styles.currentUserName}>{currentUser?.name}</Text>
              <Text style={styles.currentUserEmail}>{currentUser?.email || 'ඊමේල් නැත'}</Text>
            </View>
          </View>
        </View>
        
        {/* User Management Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>පරිශීලක කළමනාකරණය</Text>
            <Text style={styles.sectionSubtitle}>
              {users.length} පරිශීලක{users.length !== 1 ? 'යන්' : 'යා'}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => setSwitchUserModalVisible(true)}
          >
            <Icon name="account-switch" size={24} color="#6366f1" />
            <Text style={styles.actionText}>ගිණුම මාරු කරන්න</Text>
            <Icon name="chevron-right" size={24} color="#6b7280" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => setAddUserModalVisible(true)}
          >
            <Icon name="account-plus" size={24} color="#10b981" />
            <Text style={styles.actionText}>නව ගිණුමක් එක් කරන්න</Text>
            <Icon name="chevron-right" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>
        
        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>පෙනුම</Text>
          
          <View style={styles.settingCard}>
            <View style={styles.settingLeft}>
              <Icon name="theme-light-dark" size={24} color="#f59e0b" />
              <Text style={styles.settingText}>අඳුරු මාදිලිය</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#d1d5db', true: '#6366f1' }}
              thumbColor={darkMode ? '#fff' : '#f3f4f6'}
            />
          </View>
        </View>
        
        {/* App Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>යෙදුම පිළිබඳ</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>අනුවාදය</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>නිර්මාණය</Text>
            <Text style={styles.infoValue}>Sinhala Expense Tracker</Text>
          </View>
        </View>
      </ScrollView>
      
      {/* Add User Modal */}
      <Modal
        visible={addUserModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAddUserModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>නව පරිශීලක ගිණුමක් එක් කරන්න</Text>
            
            <TextInput
              style={styles.input}
              placeholder="නම"
              placeholderTextColor="#6b7280"
              value={newUserForm.name}
              onChangeText={(text) => setNewUserForm({ ...newUserForm, name: text })}
            />
            
            <TextInput
              style={styles.input}
              placeholder="ඊමේල් (අනිවාර්ය නොවේ)"
              placeholderTextColor="#6b7280"
              keyboardType="email-address"
              value={newUserForm.email}
              onChangeText={(text) => setNewUserForm({ ...newUserForm, email: text })}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setAddUserModalVisible(false)}
              >
                <Text style={styles.buttonText}>අවලංගු කරන්න</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddUser}
              >
                <Text style={styles.buttonText}>එක් කරන්න</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Switch User Modal */}
      <Modal
        visible={switchUserModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSwitchUserModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>ගිණුම මාරු කරන්න</Text>
            
            <ScrollView style={styles.userList}>
              {users.map(user => (
                <View key={user.id} style={styles.userItem}>
                  <TouchableOpacity 
                    style={[
                      styles.userButton,
                      currentUser?.id === user.id && styles.currentUserButton
                    ]}
                    onPress={() => handleSwitchUser(user)}
                  >
                    <Icon 
                      name="account-circle" 
                      size={40} 
                      color={currentUser?.id === user.id ? '#6366f1' : '#6b7280'} 
                    />
                    <View style={styles.userButtonInfo}>
                      <Text style={styles.userButtonName}>{user.name}</Text>
                      <Text style={styles.userButtonEmail}>{user.email || 'ඊමේල් නැත'}</Text>
                    </View>
                    {currentUser?.id === user.id && (
                      <Icon name="check-circle" size={24} color="#6366f1" />
                    )}
                  </TouchableOpacity>
                  
                  {currentUser?.id !== user.id && users.length > 1 && (
                    <TouchableOpacity 
                      style={styles.deleteUserButton}
                      onPress={() => handleDeleteUser(user.id)}
                    >
                      <Icon name="delete" size={20} color="#ef4444" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </ScrollView>
            
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton, { marginTop: 15 }]}
              onPress={() => setSwitchUserModalVisible(false)}
            >
              <Text style={styles.buttonText}>වසන්න</Text>
            </TouchableOpacity>
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
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionSubtitle: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
  },
  currentUserCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 20,
    borderRadius: 15,
    gap: 15,
  },
  currentUserInfo: {
    flex: 1,
  },
  currentUserName: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  currentUserEmail: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
  },
  actionText: {
    flex: 1,
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 16,
    fontWeight: '500',
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 18,
    borderRadius: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 16,
    fontWeight: '500',
  },
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
  },
  infoLabel: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
  },
  infoValue: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 14,
    fontWeight: '600',
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
    maxHeight: '80%',
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
  userList: {
    maxHeight: 400,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  userButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: darkMode ? '#334155' : '#f1f5f9',
    padding: 15,
    borderRadius: 12,
    gap: 12,
  },
  currentUserButton: {
    backgroundColor: darkMode ? '#1e3a8a' : '#e0e7ff',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  userButtonInfo: {
    flex: 1,
  },
  userButtonName: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  userButtonEmail: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 12,
  },
  deleteUserButton: {
    padding: 10,
  },
});
