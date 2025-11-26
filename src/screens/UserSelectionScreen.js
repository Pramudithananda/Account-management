import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUserProfile } from '../contexts/UserProfileContext';

export default function UserSelectionScreen({ navigation }) {
  const { users, currentUser, switchUser, createUser, deleteUser } = useUserProfile();
  const [modalVisible, setModalVisible] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');

  const handleUserSelect = async (userId) => {
    await switchUser(userId);
    navigation.replace('Main');
  };

  const handleCreateUser = async () => {
    if (!newUserName.trim()) {
      Alert.alert('දෝෂය', 'කරුණාකර නමක් ඇතුළත් කරන්න');
      return;
    }

    try {
      const newUser = await createUser({
        name: newUserName.trim(),
        email: newUserEmail.trim(),
        phone: newUserPhone.trim(),
      });
      
      setModalVisible(false);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPhone('');
      
      await switchUser(newUser.id);
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('දෝෂය', 'පරිශීලකයා සාදන අතරතුර දෝෂයක් ඇති විය');
    }
  };

  const handleDeleteUser = (userId, userName) => {
    Alert.alert(
      'පරිශීලකයා මකන්න',
      `ඔබට ${userName} මකා දැමීමට අවශ්‍යද? මෙය සියලුම දත්ත මකා දමනු ඇත.`,
      [
        { text: 'අවලංගු කරන්න', style: 'cancel' },
        {
          text: 'මකන්න',
          style: 'destructive',
          onPress: async () => {
            await deleteUser(userId);
            if (users.length === 1) {
              // Last user deleted, show modal to create new one
              setModalVisible(true);
            }
          },
        },
      ]
    );
  };

  const renderUserCard = ({ item }) => {
    const isActive = currentUser && currentUser.id === item.id;
    
    return (
      <TouchableOpacity
        style={[styles.userCard, isActive && styles.activeUserCard]}
        onPress={() => handleUserSelect(item.id)}
      >
        <View style={styles.userAvatar}>
          <Icon name="account-circle" size={60} color={isActive ? '#6366f1' : '#94a3b8'} />
          {isActive && (
            <View style={styles.activeBadge}>
              <Icon name="check" size={16} color="#fff" />
            </View>
          )}
        </View>
        
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          {item.email && <Text style={styles.userEmail}>{item.email}</Text>}
          {item.phone && <Text style={styles.userPhone}>{item.phone}</Text>}
          <Text style={styles.userDate}>
            සාදන ලද: {new Date(item.createdAt).toLocaleDateString('si-LK')}
          </Text>
        </View>
        
        {users.length > 1 && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteUser(item.id, item.name)}
          >
            <Icon name="delete-outline" size={24} color="#ef4444" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="account-multiple" size={48} color="#6366f1" />
        <Text style={styles.headerTitle}>පරිශීලක ගිණුම් තෝරන්න</Text>
        <Text style={styles.headerSubtitle}>
          {users.length === 0 
            ? 'ආරම්භ කිරීමට නව ගිණුමක් සාදන්න' 
            : 'ඔබගේ ගිණුම තෝරන්න හෝ නව එකක් සාදන්න'}
        </Text>
      </View>

      {users.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="account-off-outline" size={80} color="#cbd5e1" />
          <Text style={styles.emptyText}>පරිශීලක ගිණුම් නැත</Text>
          <TouchableOpacity
            style={styles.createFirstButton}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="account-plus" size={24} color="#fff" />
            <Text style={styles.createFirstButtonText}>පළමු ගිණුම සාදන්න</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={users}
            renderItem={renderUserCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.userList}
            showsVerticalScrollIndicator={false}
          />
          
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="plus" size={28} color="#fff" />
          </TouchableOpacity>
        </>
      )}

      {/* Create User Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>නව පරිශීලක ගිණුමක් සාදන්න</Text>
            
            <View style={styles.inputContainer}>
              <Icon name="account" size={24} color="#6366f1" />
              <TextInput
                style={styles.input}
                placeholder="නම *"
                placeholderTextColor="#94a3b8"
                value={newUserName}
                onChangeText={setNewUserName}
                autoFocus
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="email" size={24} color="#6366f1" />
              <TextInput
                style={styles.input}
                placeholder="ඊමේල් (විකල්ප)"
                placeholderTextColor="#94a3b8"
                value={newUserEmail}
                onChangeText={setNewUserEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="phone" size={24} color="#6366f1" />
              <TextInput
                style={styles.input}
                placeholder="දුරකථන අංකය (විකල්ප)"
                placeholderTextColor="#94a3b8"
                value={newUserPhone}
                onChangeText={setNewUserPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setNewUserName('');
                  setNewUserEmail('');
                  setNewUserPhone('');
                }}
              >
                <Text style={styles.buttonText}>අවලංගු කරන්න</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleCreateUser}
              >
                <Text style={styles.buttonText}>සාදන්න</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
  userList: {
    padding: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeUserCard: {
    borderColor: '#6366f1',
    backgroundColor: '#312e81',
  },
  userAvatar: {
    position: 'relative',
    marginRight: 15,
  },
  activeBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#22c55e',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },
  userDate: {
    fontSize: 12,
    color: '#64748b',
  },
  deleteButton: {
    padding: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#64748b',
    marginTop: 20,
    marginBottom: 30,
  },
  createFirstButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366f1',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    gap: 10,
  },
  createFirstButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6366f1',
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1e293b',
    width: '90%',
    padding: 25,
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 25,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 15,
    paddingLeft: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
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
