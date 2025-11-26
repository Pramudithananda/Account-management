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
import { ProfileContext } from '../contexts/ProfileContext';

const AVATARS = ['👤', '👨', '👩', '👦', '👧', '🧑', '👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓', '🧔', '👱'];
const COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', 
  '#84cc16', '#22c55e', '#10b981', '#14b8a6',
  '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
  '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
];

export default function ProfileSelectionScreen({ navigation }) {
  const { profiles, createProfile, switchProfile, deleteProfile } = useContext(ProfileContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[11]);

  const handleCreateProfile = async () => {
    if (!profileName.trim()) {
      Alert.alert('දෝෂය', 'කරුණාකර ප්‍රොෆයිල් නමක් ඇතුළත් කරන්න');
      return;
    }

    try {
      await createProfile({
        name: profileName,
        avatar: selectedAvatar,
        color: selectedColor,
      });
      setModalVisible(false);
      setProfileName('');
      setSelectedAvatar(AVATARS[0]);
      setSelectedColor(COLORS[11]);
    } catch (error) {
      Alert.alert('දෝෂය', 'ප්‍රොෆයිලය නිර්මාණය කිරීමේ දෝෂයක්');
    }
  };

  const handleSelectProfile = async (profileId) => {
    try {
      await switchProfile(profileId);
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('දෝෂය', 'ප්‍රොෆයිලය මාරු කිරීමේ දෝෂයක්');
    }
  };

  const handleDeleteProfile = (profileId) => {
    Alert.alert(
      'ප්‍රොෆයිලය මකන්න',
      'ඔබට මෙම ප්‍රොෆයිලය සහ එහි සියලුම දත්ත මකා දැමීමට අවශ්‍යද?',
      [
        { text: 'අවලංගු කරන්න', style: 'cancel' },
        {
          text: 'මකන්න',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProfile(profileId);
            } catch (error) {
              Alert.alert('දෝෂය', 'ප්‍රොෆයිලය මකා දැමීමේ දෝෂයක්');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ගිණුම් කළමනාකරණය</Text>
        <Text style={styles.subtitle}>ප්‍රොෆයිලයක් තෝරන්න හෝ නව එකක් සාදන්න</Text>
      </View>

      <ScrollView style={styles.profilesList}>
        {profiles.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="account-group-outline" size={80} color="#6b7280" />
            <Text style={styles.emptyText}>ප්‍රොෆයිල් නැත</Text>
            <Text style={styles.emptySubtext}>ආරම්භ කිරීමට නව ප්‍රොෆයිලයක් සාදන්න</Text>
          </View>
        ) : (
          profiles.map((profile) => (
            <View key={profile.id} style={[styles.profileCard, { borderLeftColor: profile.color }]}>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => handleSelectProfile(profile.id)}
              >
                <View style={[styles.avatarContainer, { backgroundColor: profile.color }]}>
                  <Text style={styles.avatar}>{profile.avatar}</Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{profile.name}</Text>
                  <Text style={styles.profileDate}>
                    නිර්මාණය: {new Date(profile.createdAt).toLocaleDateString('si-LK')}
                  </Text>
                </View>
                <Icon name="chevron-right" size={24} color="#6b7280" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteProfile(profile.id)}
              >
                <Icon name="delete" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Icon name="plus" size={24} color="#fff" />
        <Text style={styles.addButtonText}>නව ප්‍රොෆයිලයක් සාදන්න</Text>
      </TouchableOpacity>

      {/* Create Profile Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>නව ප්‍රොෆයිලයක් සාදන්න</Text>

              <TextInput
                style={styles.input}
                placeholder="ප්‍රොෆයිල් නම"
                placeholderTextColor="#6b7280"
                value={profileName}
                onChangeText={setProfileName}
              />

              <Text style={styles.sectionLabel}>අවතාරය තෝරන්න</Text>
              <View style={styles.avatarGrid}>
                {AVATARS.map((avatar) => (
                  <TouchableOpacity
                    key={avatar}
                    style={[
                      styles.avatarOption,
                      selectedAvatar === avatar && styles.selectedAvatarOption,
                    ]}
                    onPress={() => setSelectedAvatar(avatar)}
                  >
                    <Text style={styles.avatarText}>{avatar}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.sectionLabel}>වර්ණය තෝරන්න</Text>
              <View style={styles.colorGrid}>
                {COLORS.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      selectedColor === color && styles.selectedColorOption,
                    ]}
                    onPress={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && (
                      <Icon name="check" size={20} color="#fff" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>අවලංගු කරන්න</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton, { backgroundColor: selectedColor }]}
                  onPress={handleCreateProfile}
                >
                  <Text style={styles.buttonText}>සාදන්න</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
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
    backgroundColor: '#1e293b',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
  profilesList: {
    flex: 1,
    padding: 15,
  },
  profileCard: {
    backgroundColor: '#1e293b',
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 5,
    overflow: 'hidden',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  avatar: {
    fontSize: 32,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  profileDate: {
    fontSize: 12,
    color: '#94a3b8',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 10,
    textAlign: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    margin: 15,
    padding: 18,
    borderRadius: 15,
    gap: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1e293b',
    width: '90%',
    maxHeight: '85%',
    padding: 20,
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#334155',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  avatarOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAvatarOption: {
    borderColor: '#6366f1',
    backgroundColor: '#475569',
  },
  avatarText: {
    fontSize: 28,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColorOption: {
    borderColor: '#fff',
    borderWidth: 3,
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
    backgroundColor: '#6366f1',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
