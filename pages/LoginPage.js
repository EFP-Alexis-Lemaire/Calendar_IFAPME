import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Waiting from '../component/waiting';

const LoginScreen = ({ handleLoginCallback, setToken }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true); 
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
      navigation.navigate('Form');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  const handleRegistration = () => {
    navigation.navigate('Registration');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page de connexion</Text>
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
      {loading ? (
        <Waiting /> 
      ) : (
        <>
          <Button mode="contained" onPress={handleLogin}>
            Se connecter
          </Button>
          <Button onPress={handleRegistration}>
            <Text>Créer un compte</Text>
          </Button>
        </>
      )}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    marginBottom: 16,
  },
});

export default LoginScreen;
