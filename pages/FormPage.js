import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const FormPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      const response = await axios.get(`https://tfe-back.onrender.com/api/auth/login=${email}`);
      if (response.data.length > 0) {
        Alert.alert('Error', 'Email already exists');
        return;
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while checking email');
      return;
    }
    try {
      const response = await axios.post(`STRAPI`, {
        username: email,
        email,
        password,
        firstName,
        lastName
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Registration successful');
        navigation.navigate('LoginPage');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while registering');
    }
  };return (
    <View>
      
      <Text>First Name</Text>
      <TextInput value={firstName} onChangeText={setFirstName} />

      <Text>Last Name</Text>
      <TextInput value={lastName} onChangeText={setLastName} />

      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />

      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry={true} />

      <Text>Confirm Password</Text>
      <TextInput value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} />

      <TouchableOpacity onPress={handleRegister}>
        <Text>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormPage;
  
