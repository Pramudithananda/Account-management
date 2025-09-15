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
  RadioButton,
  HelperText,
} from 'react-native-paper';
import { useApp } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const IncomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { accounts, addTransaction } = useApp();
  
  const [targetAccount, setTargetAccount] = useState<string>('bank-main');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);

  const bankAccount = accounts.find(a => a.type === 'bank');
  const cashAccount = accounts.find(a => a.type === 'cash');

  const formatCurrency = (value: number) => {
    return `රු ${value.toLocaleString('si-LK', { minimumFractionDigits: 2 })}`;
  };

  const handleIncome = async () => {
    const incomeAmount = parseFloat(amount);
    
    if (!amount || isNaN(incomeAmount) || incomeAmount <= 0) {
      Alert.alert('දෝෂය', 'කරුණාකර වලංගු මුදලක් ඇතුළත් කරන්න');
      return;
    }

    if (!description.trim()) {
      Alert.alert('දෝෂය', 'කරුණාකර විස්තරයක් ඇතුළත් කරන්න');
      return;
    }

    setLoading(true);
    try {
      await addTransaction({
        date: new Date(),
        amount: incomeAmount,
        type: 'income',
        toAccount: targetAccount,
        description,
        reference: reference.trim() || undefined,
      });
      
      Alert.alert(
        'සාර්ථකයි',
        `${formatCurrency(incomeAmount)} ආදායම සාර්ථකව එකතු කරන ලදි`,
        [{ text: 'හරි', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('දෝෂය', 'ආදායම එකතු කිරීමේදී දෝෂයක් ඇති විය');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>ආදායම් එකතු කිරීම</Title>
            
            {/* Account Balances */}
            <View style={styles.balanceContainer}>
              <View style={styles.balanceCard}>
                <MaterialCommunityIcons name="bank" size={24} color="#4CAF50" />
                <Text style={styles.balanceLabel}>බැංකු ශේෂය</Text>
                <Text style={styles.balanceAmount}>
                  {formatCurrency(bankAccount?.balance || 0)}
                </Text>
              </View>
              
              <View style={styles.balanceCard}>
                <MaterialCommunityIcons name="cash" size={24} color="#2196F3" />
                <Text style={styles.balanceLabel}>අතැති මුදල්</Text>
                <Text style={styles.balanceAmount}>
                  {formatCurrency(cashAccount?.balance || 0)}
                </Text>
              </View>
            </View>

            {/* Target Account Selection */}
            <View style={styles.radioContainer}>
              <Text style={styles.label}>ආදායම ලැබෙන ගිණුම</Text>
              <RadioButton.Group
                onValueChange={value => setTargetAccount(value)}
                value={targetAccount}
              >
                <View style={styles.radioItem}>
                  <RadioButton value="bank-main" />
                  <Text style={styles.radioLabel}>බැංකු ගිණුම</Text>
                </View>
                <View style={styles.radioItem}>
                  <RadioButton value="cash-hand" />
                  <Text style={styles.radioLabel}>අතැති මුදල්</Text>
                </View>
              </RadioButton.Group>
            </View>

            {/* Amount Input */}
            <TextInput
              label="මුදල (රු)"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="currency-inr" />}
            />
            
            {/* Description Input */}
            <TextInput
              label="විස්තරය"
              value={description}
              onChangeText={setDescription}
              mode="outlined"
              multiline
              numberOfLines={2}
              style={styles.input}
              placeholder="උදා: මාසික වැටුප, විකුණුම් ආදායම"
              left={<TextInput.Icon icon="text" />}
            />
            
            {/* Reference Input */}
            <TextInput
              label="යොමු අංකය (අවශ්‍ය නම්)"
              value={reference}
              onChangeText={setReference}
              mode="outlined"
              style={styles.input}
              placeholder="උදා: චෙක්පත් අංකය, රිසිට් අංකය"
              left={<TextInput.Icon icon="file-document" />}
            />

            {/* Helper Text */}
            <HelperText type="info" visible={true}>
              {targetAccount === 'bank-main'
                ? 'ආදායම සෘජුවම බැංකු ගිණුමට එකතු වේ'
                : 'ආදායම අතැති මුදල් ලෙස එකතු වේ'}
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
                onPress={handleIncome}
                style={styles.button}
                loading={loading}
                disabled={loading}
                buttonColor="#4CAF50"
              >
                ආදායම එකතු කරන්න
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
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  balanceCard: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  radioContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  radioLabel: {
    fontSize: 14,
    color: '#333',
  },
  input: {
    marginBottom: 16,
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

export default IncomeScreen;