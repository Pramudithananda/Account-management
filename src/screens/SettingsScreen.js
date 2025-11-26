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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../app';

export default function SettingsScreen() {
  const { darkMode, setDarkMode, setAccounts, setTransactions, setCategories } = useContext(AppContext);
  
  const styles = getStyles(darkMode);
  
  const handleClearAllData = () => {
    Alert.alert(
      'සියලු දත්ත මකන්න',
      'ඔබට සියලු දත්ත මකා දැමීමට අවශ්‍යද? මෙම ක්‍රියාව අහෝසි කළ නොහැක.',
      [
        { text: 'අවලංගු', style: 'cancel' },
        { 
          text: 'මකන්න', 
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setAccounts({ bank: [], cash: [], returns: [] });
              setTransactions([]);
              setCategories([]);
              Alert.alert('සාර්ථකයි', 'සියලු දත්ත මකා දමා ඇත');
            } catch (error) {
              Alert.alert('දෝෂය', 'දත්ත මකාදැමීමේදී දෝෂයක් සිදු විය');
            }
          }
        }
      ]
    );
  };
  
  const handleExportData = async () => {
    try {
      const accounts = await AsyncStorage.getItem('accounts');
      const transactions = await AsyncStorage.getItem('transactions');
      const categories = await AsyncStorage.getItem('categories');
      
      const exportData = {
        accounts: accounts ? JSON.parse(accounts) : null,
        transactions: transactions ? JSON.parse(transactions) : null,
        categories: categories ? JSON.parse(categories) : null,
        exportDate: new Date().toISOString(),
      };
      
      // In a real app, you would save this to a file or share it
      console.log('Export Data:', JSON.stringify(exportData, null, 2));
      Alert.alert('සාර්ථකයි', 'දත්ත export කර ඇත (console බලන්න)');
    } catch (error) {
      Alert.alert('දෝෂය', 'දත්ත export කිරීමේදී දෝෂයක් සිදු විය');
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      {/* App Info */}
      <View style={styles.section}>
        <View style={styles.appInfoCard}>
          <Icon name="wallet" size={48} color="#6366f1" />
          <Text style={styles.appName}>ගිණුම් කළමනාකරණය</Text>
          <Text style={styles.appVersion}>අනුවාදය 1.0.0</Text>
        </View>
      </View>
      
      {/* Appearance Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>පෙනුම</Text>
        
        <View style={styles.settingCard}>
          <View style={styles.settingLeft}>
            <Icon name="theme-light-dark" size={24} color={darkMode ? '#fff' : '#1e293b'} />
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>අඳුරු මාදිලිය</Text>
              <Text style={styles.settingDescription}>අඳුරු තේමාව සක්‍රීය කරන්න</Text>
            </View>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#d1d5db', true: '#6366f1' }}
            thumbColor={darkMode ? '#fff' : '#f3f4f6'}
          />
        </View>
      </View>
      
      {/* Data Management */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>දත්ත කළමනාකරණය</Text>
        
        <TouchableOpacity 
          style={styles.settingCard}
          onPress={handleExportData}
        >
          <View style={styles.settingLeft}>
            <Icon name="download" size={24} color="#10b981" />
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>දත්ත Export කරන්න</Text>
              <Text style={styles.settingDescription}>ඔබගේ දත්ත බැකප් කරන්න</Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color={darkMode ? '#6b7280' : '#9ca3af'} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.settingCard, styles.dangerCard]}
          onPress={handleClearAllData}
        >
          <View style={styles.settingLeft}>
            <Icon name="delete-forever" size={24} color="#ef4444" />
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, styles.dangerText]}>සියලු දත්ත මකන්න</Text>
              <Text style={styles.settingDescription}>සියලු ගිණුම් සහ ගනුදෙනු මකන්න</Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color="#ef4444" />
        </TouchableOpacity>
      </View>
      
      {/* Account Statistics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>සංඛ්‍යාලේඛන</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Icon name="bank" size={32} color="#6366f1" />
            <Text style={styles.statValue}>-</Text>
            <Text style={styles.statLabel}>බැංකු ගිණුම්</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icon name="cash" size={32} color="#10b981" />
            <Text style={styles.statValue}>-</Text>
            <Text style={styles.statLabel}>මුදල් ගිණුම්</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icon name="folder" size={32} color="#8b5cf6" />
            <Text style={styles.statValue}>-</Text>
            <Text style={styles.statLabel}>කාණ්ඩ</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icon name="swap-horizontal" size={32} color="#f59e0b" />
            <Text style={styles.statValue}>-</Text>
            <Text style={styles.statLabel}>ගනුදෙනු</Text>
          </View>
        </View>
      </View>
      
      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>පිළිබඳව</Text>
        
        <View style={styles.aboutCard}>
          <Text style={styles.aboutText}>
            මෙම යෙදුම ඔබගේ පුද්ගලික මුදල් කළමනාකරණය කිරීම සඳහා නිර්මාණය කර ඇත. 
            බැංකු ගිණුම්, මුදල් ගිණුම් සහ වියදම් කාණ්ඩ කළමනාකරණය කරන්න.
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 ගිණුම් කළමනාකරණය</Text>
        <Text style={styles.footerText}>සියලු හිමිකම් ඇවිරිණි</Text>
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
    paddingHorizontal: 15,
    marginTop: 20,
  },
  sectionTitle: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 10,
    letterSpacing: 1,
  },
  appInfoCard: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
  appName: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
  },
  appVersion: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
    marginTop: 5,
  },
  settingCard: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  settingDescription: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 12,
  },
  dangerCard: {
    borderWidth: 1,
    borderColor: darkMode ? '#7f1d1d' : '#fee2e2',
  },
  dangerText: {
    color: '#ef4444',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statCard: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
  },
  statValue: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  statLabel: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  aboutCard: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 20,
    borderRadius: 10,
  },
  aboutText: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    color: darkMode ? '#6b7280' : '#9ca3af',
    fontSize: 12,
    marginTop: 3,
  },
});
