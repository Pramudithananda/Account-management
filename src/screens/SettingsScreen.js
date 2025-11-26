import React from 'react';
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
import { useUserProfile } from '../contexts/UserProfileContext';

export default function SettingsScreen({ navigation }) {
  const { currentUser, updateSettings, switchUser, users } = useUserProfile();
  
  const darkMode = currentUser?.settings?.darkMode ?? true;
  const styles = getStyles(darkMode);

  const handleToggleDarkMode = async () => {
    await updateSettings({ darkMode: !darkMode });
  };

  const handleSwitchUser = () => {
    Alert.alert(
      'පරිශීලකයා මාරු කරන්න',
      'ඔබට වෙනත් පරිශීලක ගිණුමකට මාරු වීමට අවශ්‍යද?',
      [
        { text: 'අවලංගු කරන්න', style: 'cancel' },
        {
          text: 'මාරු වන්න',
          onPress: () => navigation.navigate('UserSelection'),
        },
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert(
      'දත්ත අපනයනය',
      'මෙම විශේෂාංගය ඉදිරියේදී එක් වනු ඇත.',
      [{ text: 'හරි' }]
    );
  };

  const handleBackupData = () => {
    Alert.alert(
      'දත්ත උපස්ථය',
      'මෙම විශේෂාංගය ඉදිරියේදී එක් වනු ඇත.',
      [{ text: 'හරි' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* User Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>පරිශීලක ගිණුම</Text>
        
        <TouchableOpacity style={styles.profileCard}>
          <View style={styles.profileLeft}>
            <View style={styles.avatar}>
              <Icon name="account-circle" size={50} color="#6366f1" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{currentUser?.name || 'පරිශීලකයා'}</Text>
              {currentUser?.email && (
                <Text style={styles.profileEmail}>{currentUser.email}</Text>
              )}
              {currentUser?.phone && (
                <Text style={styles.profilePhone}>{currentUser.phone}</Text>
              )}
            </View>
          </View>
          <Icon name="chevron-right" size={24} color="#94a3b8" />
        </TouchableOpacity>

        {users.length > 1 && (
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleSwitchUser}
          >
            <View style={styles.settingLeft}>
              <Icon name="account-switch" size={24} color="#6366f1" />
              <Text style={styles.settingText}>පරිශීලකයා මාරු කරන්න</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{users.length} ගිණුම්</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Appearance Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>පෙනුම</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Icon 
              name={darkMode ? 'weather-night' : 'weather-sunny'} 
              size={24} 
              color={darkMode ? '#8b5cf6' : '#f59e0b'} 
            />
            <Text style={styles.settingText}>අඳුරු මාදිලිය</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={handleToggleDarkMode}
            trackColor={{ false: '#cbd5e1', true: '#8b5cf6' }}
            thumbColor={darkMode ? '#fff' : '#f1f5f9'}
          />
        </View>
      </View>

      {/* Data Management Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>දත්ත කළමනාකරණය</Text>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handleBackupData}
        >
          <View style={styles.settingLeft}>
            <Icon name="cloud-upload" size={24} color="#10b981" />
            <Text style={styles.settingText}>දත්ත උපස්ථය</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#94a3b8" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handleExportData}
        >
          <View style={styles.settingLeft}>
            <Icon name="download" size={24} color="#3b82f6" />
            <Text style={styles.settingText}>දත්ත අපනයනය</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {/* Statistics Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>සංඛ්‍යාලේඛන</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Icon name="bank" size={32} color="#6366f1" />
            <Text style={styles.statValue}>
              {currentUser?.accounts?.bank?.length || 0}
            </Text>
            <Text style={styles.statLabel}>බැංකු ගිණුම්</Text>
          </View>

          <View style={styles.statCard}>
            <Icon name="cash-multiple" size={32} color="#10b981" />
            <Text style={styles.statValue}>
              {currentUser?.accounts?.cash?.length || 0}
            </Text>
            <Text style={styles.statLabel}>මුදල් ගිණුම්</Text>
          </View>

          <View style={styles.statCard}>
            <Icon name="folder" size={32} color="#8b5cf6" />
            <Text style={styles.statValue}>
              {currentUser?.categories?.length || 0}
            </Text>
            <Text style={styles.statLabel}>කාණ්ඩ</Text>
          </View>

          <View style={styles.statCard}>
            <Icon name="swap-horizontal" size={32} color="#f59e0b" />
            <Text style={styles.statValue}>
              {currentUser?.transactions?.length || 0}
            </Text>
            <Text style={styles.statLabel}>ගනුදෙනු</Text>
          </View>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>යෙදුම පිළිබඳ</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Icon name="information" size={24} color="#94a3b8" />
            <Text style={styles.settingText}>අනුවාදය</Text>
          </View>
          <Text style={styles.versionText}>1.0.0</Text>
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Icon name="cellphone" size={24} color="#94a3b8" />
            <Text style={styles.settingText}>ප්ලැට්ෆෝමය</Text>
          </View>
          <Text style={styles.versionText}>React Native</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🇱🇰 සිංහල වියදම් ට්‍රැකර්
        </Text>
        <Text style={styles.footerSubtext}>
          බහු පරිශීලක ගිණුම් කළමනාකරණය සමඟ
        </Text>
      </View>
    </ScrollView>
  );
}

const getStyles = (darkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkMode ? '#0f172a' : '#f1f5f9',
  },
  section: {
    padding: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  profileCard: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
    marginBottom: 2,
  },
  profilePhone: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
  },
  settingItem: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 16,
    marginLeft: 15,
  },
  badge: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  versionText: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  statValue: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  statLabel: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    padding: 30,
    alignItems: 'center',
  },
  footerText: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  footerSubtext: {
    color: darkMode ? '#64748b' : '#94a3b8',
    fontSize: 12,
  },
});
