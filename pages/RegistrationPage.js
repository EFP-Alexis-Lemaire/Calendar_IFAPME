import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

const Registration = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://tfe-back.onrender.com/api/auth/register', {
        username,
        email,
        password,
        full_name: fullName
      });

      // Redirection vers la page de connexion
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement :', error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack(); // Retourne à l'écran précédent (dans ce cas, l'écran "Login")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Création de compte</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom complet"
        onChangeText={text => setFullName(text)}
      />
      <Button
        mode="contained"
        onPress={handleRegister}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        S'inscrire
      </Button>
      <Button onPress={handleGoBack} style={styles.button}>
        Retourner à la page de connexion
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f9ff',
    padding: 20,
  },
  input: {
    width: '80%',
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    marginTop: 10,
    width: '80%',
  },
  buttonLabel: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
});

export default Registration;