import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppContext } from '../../App';
import { ProfileContext } from '../contexts/ProfileContext';

export default function SettingsScreen({ navigation }) {
  const { darkMode, setDarkMode } = useContext(AppContext);
  const { currentProfile, profiles } = useContext(ProfileContext);

  const styles = getStyles(darkMode);

  const handleSwitchProfile = () => {
    navigation.navigate('ProfileSelection');
  };

  const handleExportData = () => {
    Alert.alert('Export දත්ත', 'මෙම විශේෂාංගය ඉක්මනින් එකතු කෙරේ');
  };

  const handleImportData = () => {
    Alert.alert('Import දත්ත', 'මෙම විශේෂාංගය ඉක්මනින් එකතු කෙරේ');
  };

  const handleBackup = () => {
    Alert.alert('Backup', 'දත්ත backup කරන ලදී');
  };

  const handleAbout = () => {
    Alert.alert(
      'අප ගැන',
      'සිංහල Expense Tracker\nසංස්කරණය: 2.0.0\n\nබහු පරිශීලක ගිණුම් කළමනාකරණ පද්ධතිය සමඟ ඔබේ මුදල් කළමනාකරණය කරන්න.'
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ප්‍රොෆයිලය</Text>

        <View style={styles.profileCard}>
          <View style={[styles.profileAvatar, { backgroundColor: currentProfile?.color || '#6366f1' }]}>
            <Text style={styles.profileAvatarText}>{currentProfile?.avatar || '👤'}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{currentProfile?.name || 'පරිශීලක'}</Text>
            <Text style={styles.profileSubtext}>{profiles.length} ප්‍රොෆයිල් තිබේ</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.settingItem} onPress={handleSwitchProfile}>
          <Icon name="account-switch" size={24} color="#6366f1" />
          <Text style={styles.settingText}>ප්‍රොෆයිලය මාරු කරන්න</Text>
          <Icon name="chevron-right" size={24} color={darkMode ? '#94a3b8' : '#64748b'} />
        </TouchableOpacity>
      </View>

      {/* Appearance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>පෙනුම</Text>

        <View style={styles.settingItem}>
          <Icon name="theme-light-dark" size={24} color="#6366f1" />
          <Text style={styles.settingText}>අඳුරු මාදිලිය</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#767577', true: '#818cf8' }}
            thumbColor={darkMode ? '#6366f1' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Data Management */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>දත්ත කළමනාකරණය</Text>

        <TouchableOpacity style={styles.settingItem} onPress={handleExportData}>
          <Icon name="export" size={24} color="#10b981" />
          <Text style={styles.settingText}>දත්ත Export කරන්න</Text>
          <Icon name="chevron-right" size={24} color={darkMode ? '#94a3b8' : '#64748b'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handleImportData}>
          <Icon name="import" size={24} color="#0ea5e9" />
          <Text style={styles.settingText}>දත්ත Import කරන්න</Text>
          <Icon name="chevron-right" size={24} color={darkMode ? '#94a3b8' : '#64748b'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handleBackup}>
          <Icon name="cloud-upload" size={24} color="#6366f1" />
          <Text style={styles.settingText}>Backup සාදන්න</Text>
          <Icon name="chevron-right" size={24} color={darkMode ? '#94a3b8' : '#64748b'} />
        </TouchableOpacity>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>යෙදුම ගැන</Text>

        <TouchableOpacity style={styles.settingItem} onPress={handleAbout}>
          <Icon name="information" size={24} color="#8b5cf6" />
          <Text style={styles.settingText}>අප ගැන</Text>
          <Icon name="chevron-right" size={24} color={darkMode ? '#94a3b8' : '#64748b'} />
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <Icon name="cellphone-android" size={24} color="#6b7280" />
          <Text style={styles.settingText}>සංස්කරණය</Text>
          <Text style={styles.versionText}>2.0.0</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          බහු පරිශීලක ගිණුම් කළමනාකරණ පද්ධතිය සමඟ
        </Text>
        <Text style={styles.footerText}>සියලු හිමිකම් ඇවිරිණි © 2025</Text>
      </View>
    </ScrollView>
  );
}

const getStyles = (darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#0f172a' : '#f1f5f9',
    },
    section: {
      marginBottom: 20,
      paddingHorizontal: 15,
      paddingTop: 15,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: darkMode ? '#94a3b8' : '#64748b',
      marginBottom: 10,
      marginLeft: 5,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    profileCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      padding: 15,
      borderRadius: 15,
      marginBottom: 10,
    },
    profileAvatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 15,
    },
    profileAvatarText: {
      fontSize: 32,
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? '#fff' : '#1e293b',
      marginBottom: 5,
    },
    profileSubtext: {
      fontSize: 14,
      color: darkMode ? '#94a3b8' : '#64748b',
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    settingText: {
      flex: 1,
      fontSize: 16,
      color: darkMode ? '#fff' : '#1e293b',
      marginLeft: 15,
    },
    versionText: {
      fontSize: 14,
      color: darkMode ? '#94a3b8' : '#64748b',
    },
    footer: {
      alignItems: 'center',
      padding: 30,
      paddingBottom: 50,
    },
    footerText: {
      fontSize: 12,
      color: darkMode ? '#64748b' : '#94a3b8',
      textAlign: 'center',
      marginBottom: 5,
    },
  });
