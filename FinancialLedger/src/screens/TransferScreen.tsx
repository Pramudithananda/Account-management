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

const TransferScreen: React.FC = () => {
  const navigation = useNavigation();
  const { accounts, transferFromBankToCash, addTransaction } = useApp();
  
  const [transferType, setTransferType] = useState<'bank-to-cash' | 'cash-to-bank'>('bank-to-cash');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const bankAccount = accounts.find(a => a.type === 'bank');
  const cashAccount = accounts.find(a => a.type === 'cash');

  const formatCurrency = (value: number) => {
    return `රු ${value.toLocaleString('si-LK', { minimumFractionDigits: 2 })}`;
  };

  const handleTransfer = async () => {
    const transferAmount = parseFloat(amount);
    
    if (!amount || isNaN(transferAmount) || transferAmount <= 0) {
      Alert.alert('දෝෂය', 'කරුණාකර වලංගු මුදලක් ඇතුළත් කරන්න');
      return;
    }

    if (!description.trim()) {
      Alert.alert('දෝෂය', 'කරුණාකර විස්තරයක් ඇතුළත් කරන්න');
      return;
    }

    const sourceAccount = transferType === 'bank-to-cash' ? bankAccount : cashAccount;
    const targetAccount = transferType === 'bank-to-cash' ? cashAccount : bankAccount;

    if (!sourceAccount || !targetAccount) {
      Alert.alert('දෝෂය', 'ගිණුම් සොයාගත නොහැක');
      return;
    }

    if (sourceAccount.balance < transferAmount) {
      Alert.alert('දෝෂය', 'ප්‍රමාණවත් ශේෂයක් නොමැත');
      return;
    }

    setLoading(true);
    try {
      if (transferType === 'bank-to-cash') {
        await transferFromBankToCash(transferAmount, description);
      } else {
        await addTransaction({
          date: new Date(),
          amount: transferAmount,
          type: 'transfer',
          fromAccount: cashAccount?.id,
          toAccount: bankAccount?.id,
          description,
        });
      }
      
      Alert.alert(
        'සාර්ථකයි',
        `${formatCurrency(transferAmount)} සාර්ථකව මාරු කරන ලදි`,
        [{ text: 'හරි', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('දෝෂය', 'මුදල් මාරු කිරීමේදී දෝෂයක් ඇති විය');
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
            <Title style={styles.title}>මුදල් මාරු කිරීම</Title>
            
            {/* Account Balances */}
            <View style={styles.balanceContainer}>
              <View style={styles.balanceCard}>
                <MaterialCommunityIcons name="bank" size={24} color="#4CAF50" />
                <Text style={styles.balanceLabel}>බැංකු ශේෂය</Text>
                <Text style={styles.balanceAmount}>
                  {formatCurrency(bankAccount?.balance || 0)}
                </Text>
              </View>
              
              <MaterialCommunityIcons name="swap-horizontal" size={30} color="#6200EE" />
              
              <View style={styles.balanceCard}>
                <MaterialCommunityIcons name="cash" size={24} color="#2196F3" />
                <Text style={styles.balanceLabel}>අතැති මුදල්</Text>
                <Text style={styles.balanceAmount}>
                  {formatCurrency(cashAccount?.balance || 0)}
                </Text>
              </View>
            </View>

            {/* Transfer Type */}
            <View style={styles.radioContainer}>
              <Text style={styles.label}>මාරු කිරීමේ දිශාව</Text>
              <RadioButton.Group
                onValueChange={value => setTransferType(value as any)}
                value={transferType}
              >
                <View style={styles.radioItem}>
                  <RadioButton value="bank-to-cash" />
                  <Text style={styles.radioLabel}>බැංකුවෙන් අතට</Text>
                </View>
                <View style={styles.radioItem}>
                  <RadioButton value="cash-to-bank" />
                  <Text style={styles.radioLabel}>අතින් බැංකුවට</Text>
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
              numberOfLines={3}
              style={styles.input}
              left={<TextInput.Icon icon="text" />}
            />

            {/* Helper Text */}
            <HelperText type="info" visible={true}>
              {transferType === 'bank-to-cash'
                ? 'බැංකු ගිණුමෙන් මුදල් ගෙන අතට ගැනීම'
                : 'අතැති මුදල් බැංකුවට තැන්පත් කිරීම'}
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
                onPress={handleTransfer}
                style={styles.button}
                loading={loading}
                disabled={loading}
              >
                මාරු කරන්න
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  balanceCard: {
    alignItems: 'center',
    flex: 1,
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

export default TransferScreen;