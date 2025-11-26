import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUserProfile } from '../contexts/UserProfileContext';

export default function AddTransactionScreen({ navigation }) {
  const { currentUser, updateTransactions, updateCategories } = useUserProfile();
  const [type, setType] = useState('expense'); // expense or income
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const darkMode = currentUser?.settings?.darkMode ?? true;
  const styles = getStyles(darkMode);

  const categories = currentUser?.categories || [];
  const transactions = currentUser?.transactions || [];

  const handleSave = async () => {
    if (!amount || !description) {
      Alert.alert('දෝෂය', 'කරුණාකර සියලුම තොරතුරු පුරවන්න');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('දෝෂය', 'කරුණාකර වලංගු මුදලක් ඇතුළත් කරන්න');
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      type,
      amount: type === 'expense' ? -parsedAmount : parsedAmount,
      description,
      categoryId: selectedCategory,
      date,
      createdAt: new Date().toISOString(),
    };

    // Update transactions
    const updatedTransactions = [newTransaction, ...transactions];
    await updateTransactions(updatedTransactions);

    // Update category spent amount if expense
    if (type === 'expense' && selectedCategory) {
      const updatedCategories = categories.map(cat =>
        cat.id === selectedCategory
          ? { ...cat, spent: cat.spent + parsedAmount }
          : cat
      );
      await updateCategories(updatedCategories);
    }

    Alert.alert(
      'සාර්ථකයි',
      'ගනුදෙනුව සාර්ථකව එක් කරන ලදි',
      [{ text: 'හරි', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Type Selector */}
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'expense' && styles.typeButtonExpense,
            ]}
            onPress={() => setType('expense')}
          >
            <Icon
              name="arrow-down"
              size={24}
              color={type === 'expense' ? '#fff' : '#ef4444'}
            />
            <Text
              style={[
                styles.typeText,
                type === 'expense' && styles.typeTextActive,
              ]}
            >
              වියදම
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'income' && styles.typeButtonIncome,
            ]}
            onPress={() => setType('income')}
          >
            <Icon
              name="arrow-up"
              size={24}
              color={type === 'income' ? '#fff' : '#10b981'}
            />
            <Text
              style={[
                styles.typeText,
                type === 'income' && styles.typeTextActive,
              ]}
            >
              ආදායම
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount Input */}
        <View style={styles.amountSection}>
          <Text style={styles.label}>මුදල</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>රු</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor="#6b7280"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              autoFocus
            />
          </View>
        </View>

        {/* Description Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>විස්තරය</Text>
          <TextInput
            style={styles.input}
            placeholder="ගනුදෙනු විස්තරය"
            placeholderTextColor="#6b7280"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Category Selector */}
        {type === 'expense' && categories.length > 0 && (
          <View style={styles.categorySection}>
            <Text style={styles.label}>කාණ්ඩය (විකල්ප)</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesScroll}
            >
              {categories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category.id && styles.categoryChipSelected,
                    { borderColor: category.color },
                  ]}
                  onPress={() =>
                    setSelectedCategory(
                      selectedCategory === category.id ? null : category.id
                    )
                  }
                >
                  <Icon
                    name={category.icon}
                    size={20}
                    color={
                      selectedCategory === category.id
                        ? '#fff'
                        : category.color
                    }
                  />
                  <Text
                    style={[
                      styles.categoryChipText,
                      selectedCategory === category.id &&
                        styles.categoryChipTextSelected,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Date Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>දිනය</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#6b7280"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            { backgroundColor: type === 'expense' ? '#ef4444' : '#10b981' },
          ]}
          onPress={handleSave}
        >
          <Icon name="check" size={24} color="#fff" />
          <Text style={styles.saveButtonText}>සුරකින්න</Text>
        </TouchableOpacity>
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
    content: {
      padding: 20,
    },
    typeSelector: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 30,
    },
    typeButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      borderRadius: 15,
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      borderWidth: 2,
      borderColor: 'transparent',
      gap: 10,
    },
    typeButtonExpense: {
      backgroundColor: '#ef4444',
      borderColor: '#ef4444',
    },
    typeButtonIncome: {
      backgroundColor: '#10b981',
      borderColor: '#10b981',
    },
    typeText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? '#fff' : '#1e293b',
    },
    typeTextActive: {
      color: '#fff',
    },
    amountSection: {
      marginBottom: 25,
    },
    label: {
      color: darkMode ? '#94a3b8' : '#64748b',
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 10,
    },
    amountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      borderRadius: 15,
      padding: 20,
    },
    currencySymbol: {
      color: darkMode ? '#fff' : '#1e293b',
      fontSize: 32,
      fontWeight: 'bold',
      marginRight: 10,
    },
    amountInput: {
      flex: 1,
      color: darkMode ? '#fff' : '#1e293b',
      fontSize: 32,
      fontWeight: 'bold',
    },
    inputSection: {
      marginBottom: 25,
    },
    input: {
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      color: darkMode ? '#fff' : '#1e293b',
      padding: 18,
      borderRadius: 15,
      fontSize: 16,
      minHeight: 60,
      textAlignVertical: 'top',
    },
    categorySection: {
      marginBottom: 25,
    },
    categoriesScroll: {
      flexGrow: 0,
    },
    categoryChip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 25,
      backgroundColor: darkMode ? '#1e293b' : '#fff',
      borderWidth: 2,
      marginRight: 10,
      gap: 8,
    },
    categoryChipSelected: {
      backgroundColor: '#6366f1',
      borderColor: '#6366f1',
    },
    categoryChipText: {
      color: darkMode ? '#fff' : '#1e293b',
      fontSize: 14,
      fontWeight: '600',
    },
    categoryChipTextSelected: {
      color: '#fff',
    },
    saveButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 18,
      borderRadius: 15,
      marginTop: 20,
      gap: 10,
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
