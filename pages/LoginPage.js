import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({ handleLoginCallback, setToken }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://tfe-back.onrender.com/api/auth/login',
        {
          username: email,
          password: password,
        }
      );

      const token = response.headers['authorization'].substring(7);

      setToken(token);
      handleLoginCallback(token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegistration = () => {
    navigation.navigate('Registration');
  };
  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Mot de passe"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin}>
        Se connecter
      </Button>
      <Button onPress={handleRegistration}>
        <Text>Créer un compte</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
  },
});

export default LoginScreen;
