import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Card,
  TextInput,
  Button,
  Title,
  List,
  Chip,
  HelperText,
} from 'react-native-paper';
import { useApp } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ExpenseScreen: React.FC = () => {
  const navigation = useNavigation();
  const { accounts, categories, makePurchase } = useApp();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const cashAccount = accounts.find(a => a.type === 'cash');

  const formatCurrency = (value: number) => {
    return `රු ${value.toLocaleString('si-LK', { minimumFractionDigits: 2 })}`;
  };

  const calculateTotal = () => {
    const qty = parseFloat(quantity) || 0;
    const price = parseFloat(unitPrice) || 0;
    return qty * price;
  };

  const handleExpense = async () => {
    const expenseAmount = amount ? parseFloat(amount) : calculateTotal();
    
    if (!selectedCategory) {
      Alert.alert('දෝෂය', 'කරුණාකර වියදම් කාණ්ඩයක් තෝරන්න');
      return;
    }

    if (expenseAmount <= 0) {
      Alert.alert('දෝෂය', 'කරුණාකර වලංගු මුදලක් ඇතුළත් කරන්න');
      return;
    }

    if (!description.trim()) {
      Alert.alert('දෝෂය', 'කරුණාකර විස්තරයක් ඇතුළත් කරන්න');
      return;
    }

    if (!cashAccount) {
      Alert.alert('දෝෂය', 'අතැති මුදල් ගිණුම සොයාගත නොහැක');
      return;
    }

    if (cashAccount.balance < expenseAmount) {
      Alert.alert('දෝෂය', 'අතැති මුදල් ප්‍රමාණවත් නොමැත');
      return;
    }

    setLoading(true);
    try {
      let fullDescription = description;
      if (quantity && unitPrice) {
        fullDescription += ` (${quantity} × රු ${unitPrice})`;
      }
      
      await makePurchase(selectedCategory, expenseAmount, fullDescription);
      
      Alert.alert(
        'සාර්ථකයි',
        `${formatCurrency(expenseAmount)} වියදම සාර්ථකව එකතු කරන ලදි`,
        [{ text: 'හරි', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('දෝෂය', 'වියදම එකතු කිරීමේදී දෝෂයක් ඇති විය');
    } finally {
      setLoading(false);
    }
  };

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>වියදම් එකතු කිරීම</Title>
            
            {/* Cash Balance */}
            <View style={styles.balanceCard}>
              <MaterialCommunityIcons name="cash" size={30} color="#2196F3" />
              <View style={styles.balanceInfo}>
                <Text style={styles.balanceLabel}>අතැති මුදල් ශේෂය</Text>
                <Text style={styles.balanceAmount}>
                  {formatCurrency(cashAccount?.balance || 0)}
                </Text>
              </View>
            </View>

            {/* Category Selection */}
            <View style={styles.categorySection}>
              <Text style={styles.label}>වියදම් කාණ්ඩය තෝරන්න</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.categoryChips}>
                  {categories.map((category) => (
                    <Chip
                      key={category.id}
                      selected={selectedCategory === category.id}
                      onPress={() => setSelectedCategory(category.id)}
                      style={[
                        styles.chip,
                        selectedCategory === category.id && { backgroundColor: category.color }
                      ]}
                      textStyle={selectedCategory === category.id ? { color: 'white' } : {}}
                      icon={() => (
                        <MaterialCommunityIcons
                          name={category.icon as any}
                          size={20}
                          color={selectedCategory === category.id ? 'white' : category.color}
                        />
                      )}
                    >
                      {category.name}
                    </Chip>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Selected Category Info */}
            {selectedCategoryData && (
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryInfoText}>
                  දැනට වියදම්: {formatCurrency(selectedCategoryData.currentAmount)}
                </Text>
                <Text style={styles.categoryInfoText}>
                  ඉලක්කය: {formatCurrency(selectedCategoryData.targetAmount)}
                </Text>
                <Text style={[
                  styles.categoryInfoText,
                  { color: selectedCategoryData.currentAmount > selectedCategoryData.targetAmount ? '#f44336' : '#4CAF50' }
                ]}>
                  ඉතිරිය: {formatCurrency(selectedCategoryData.targetAmount - selectedCategoryData.currentAmount)}
                </Text>
              </View>
            )}

            {/* Amount Input Options */}
            <View style={styles.amountSection}>
              <Text style={styles.label}>මුදල ඇතුළත් කිරීම</Text>
              
              {/* Direct Amount */}
              <TextInput
                label="සම්පූර්ණ මුදල (රු)"
                value={amount}
                onChangeText={(text) => {
                  setAmount(text);
                  setQuantity('');
                  setUnitPrice('');
                }}
                keyboardType="decimal-pad"
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="currency-inr" />}
              />
              
              <Text style={styles.orText}>හෝ</Text>
              
              {/* Quantity and Unit Price */}
              <View style={styles.row}>
                <TextInput
                  label="ප්‍රමාණය"
                  value={quantity}
                  onChangeText={(text) => {
                    setQuantity(text);
                    setAmount('');
                  }}
                  keyboardType="decimal-pad"
                  mode="outlined"
                  style={[styles.input, styles.halfInput]}
                />
                <TextInput
                  label="ඒකක මිල (රු)"
                  value={unitPrice}
                  onChangeText={(text) => {
                    setUnitPrice(text);
                    setAmount('');
                  }}
                  keyboardType="decimal-pad"
                  mode="outlined"
                  style={[styles.input, styles.halfInput]}
                />
              </View>
              
              {quantity && unitPrice && (
                <View style={styles.totalCard}>
                  <Text style={styles.totalLabel}>මුළු මුදල:</Text>
                  <Text style={styles.totalAmount}>{formatCurrency(calculateTotal())}</Text>
                </View>
              )}
            </View>

            {/* Description Input */}
            <TextInput
              label="විස්තරය"
              value={description}
              onChangeText={setDescription}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
              placeholder="උදා: කාර්යාලයීය පෑන් මිලදී ගැනීම"
              left={<TextInput.Icon icon="text" />}
            />

            {/* Helper Text */}
            <HelperText type="info" visible={true}>
              අතැති මුදල් වලින් වියදම් කිරීම
            </HelperText>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={() => navigation.goBack()}
                style={styles.button}
                disabled={loading}
              >
                අවලංගු කරන්න
              </Button>
              <Button
                mode="contained"
                onPress={handleExpense}
                style={styles.button}
                loading={loading}
                disabled={loading || (!amount && (!quantity || !unitPrice))}
              >
                වියදම එකතු කරන්න
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    elevation: 2,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  balanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    marginBottom: 20,
  },
  balanceInfo: {
    marginLeft: 12,
  },
  balanceLabel: {
    fontSize: 12,
    color: '#666',
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    marginTop: 4,
  },
  categorySection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  categoryChips: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  chip: {
    marginRight: 8,
  },
  categoryInfo: {
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 16,
  },
  categoryInfoText: {
    fontSize: 14,
    marginVertical: 2,
  },
  amountSection: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 8,
  },
  totalCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#333',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default ExpenseScreen;