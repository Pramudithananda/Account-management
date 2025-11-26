import React, { useContext, useState } from 'react';
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
import { AppContext } from '../../App';

export default function SettingsScreen() {
  const { darkMode, setDarkMode, accounts, transactions, categories } = useContext(AppContext);
  const [isExporting, setIsExporting] = useState(false);
  
  const styles = getStyles(darkMode);
  
  const handleExportData = async () => {
    try {
      setIsExporting(true);
      const data = {
        accounts,
        transactions,
        categories,
        exportDate: new Date().toISOString(),
      };
      
      // In a real app, you would share this data or save to file
      Alert.alert(
        'දත්ත Export කරන ලදි',
        `ගිණුම්: ${accounts.bank.length + accounts.cash.length}\nගනුදෙනු: ${transactions.length}\nකාණ්ඩ: ${categories.length}`,
        [{ text: 'හරි' }]
      );
    } catch (error) {
      Alert.alert('දෝෂය', 'දත්ත export කිරීමේදී දෝෂයක් ඇති විය');
    } finally {
      setIsExporting(false);
    }
  };
  
  const handleClearData = () => {
    Alert.alert(
      'සියලු දත්ත මකන්න',
      'ඔබට සියලු දත්ත මකා දැමීමට අවශ්‍යද? මෙම ක්‍රියාව ආපසු හැරවිය නොහැක.',
      [
        { text: 'අවලංගු කරන්න', style: 'cancel' },
        {
          text: 'මකන්න',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('සාර්ථක', 'සියලු දත්ත මකා දමන ලදි');
            } catch (error) {
              Alert.alert('දෝෂය', 'දත්ත මකා දැමීමේදී දෝෂයක් ඇති විය');
            }
          },
        },
      ]
    );
  };
  
  const getTotalAccounts = () => {
    return accounts.bank.length + accounts.cash.length + accounts.returns.length;
  };
  
  return (
    <ScrollView style={styles.container}>
      {/* App Info */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="information" size={24} color="#6366f1" />
          <Text style={styles.sectionTitle}>තොරතුරු</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>ගිණුම් ගණන</Text>
          <Text style={styles.infoValue}>{getTotalAccounts()}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>ගනුදෙනු ගණන</Text>
          <Text style={styles.infoValue}>{transactions.length}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>කාණ්ඩ ගණන</Text>
          <Text style={styles.infoValue}>{categories.length}</Text>
        </View>
      </View>
      
      {/* Appearance Settings */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="palette" size={24} color="#6366f1" />
          <Text style={styles.sectionTitle}>පෙනුම</Text>
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Icon name="theme-light-dark" size={24} color={darkMode ? '#fff' : '#1e293b'} />
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>අඳුරු ප්‍රකාරය</Text>
              <Text style={styles.settingDescription}>
                අඳුරු හෝ එළි ප්‍රකාරය තෝරන්න
              </Text>
            </View>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#767577', true: '#6366f1' }}
            thumbColor={darkMode ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>
      
      {/* Data Management */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="database" size={24} color="#6366f1" />
          <Text style={styles.sectionTitle}>දත්ත කළමනාකරණය</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handleExportData}
          disabled={isExporting}
        >
          <View style={styles.settingLeft}>
            <Icon name="download" size={24} color="#10b981" />
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>දත්ත Export කරන්න</Text>
              <Text style={styles.settingDescription}>
                සියලු දත්ත backup කරන්න
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color={darkMode ? '#94a3b8' : '#64748b'} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handleClearData}
        >
          <View style={styles.settingLeft}>
            <Icon name="delete-sweep" size={24} color="#ef4444" />
            <View style={styles.settingText}>
              <Text style={[styles.settingLabel, { color: '#ef4444' }]}>
                සියලු දත්ත මකන්න
              </Text>
              <Text style={styles.settingDescription}>
                සියලු දත්ත ස්ථිරව මකා දමන්න
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color={darkMode ? '#94a3b8' : '#64748b'} />
        </TouchableOpacity>
      </View>
      
      {/* About */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="information-outline" size={24} color="#6366f1" />
          <Text style={styles.sectionTitle}>අප ගැන</Text>
        </View>
        <View style={styles.aboutCard}>
          <Text style={styles.appName}>ගිණුම් කළමනාකරණය</Text>
          <Text style={styles.appVersion}>වෙළුම 1.0.0</Text>
          <Text style={styles.appDescription}>
            බහු ගිණුම් කළමනාකරණය සඳහා පහසුකම් සහිත මුදල් කළමනාකරණ යෙදුමකි
          </Text>
        </View>
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
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  sectionTitle: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
  },
  infoValue: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingItem: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 15,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  settingDescription: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 12,
  },
  aboutCard: {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  appName: {
    color: darkMode ? '#fff' : '#1e293b',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  appVersion: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
    marginBottom: 15,
  },
  appDescription: {
    color: darkMode ? '#94a3b8' : '#64748b',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
