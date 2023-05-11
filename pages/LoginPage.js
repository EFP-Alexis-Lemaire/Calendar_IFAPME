import React from 'react';
import { View, Text, Button } from 'react-native';

const LoginPage = ({ setActiveTab }) => {
  const handleLogin = () => {
    setActiveTab(1); // Redirige vers la page du profil après la connexion
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Page</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginPage;