import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const ProfilePage = ({ route, navigation }) => {
  const { token, handleLogout } = route.params;
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('https://tfe-back.onrender.com/api/user/userInformation', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur :', error);
      }
    };

    fetchUserInfo();
  }, [token]);

  return (
    <View style={styles.container}>
      {userInfo ? (
        <View style={styles.profileContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.field}>
              <Text style={styles.label}>Nom d'utilisateur:</Text>
              <Text style={styles.text}>{userInfo.username}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.text}>{userInfo.email}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Nom complet:</Text>
              <Text style={styles.text}>{userInfo.full_name}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Déconnexion</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.loadingText}>Chargement des informations utilisateur...</Text>
      )}
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
  profileContainer: {
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#6750A4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  header: {
    backgroundColor: '#6750A4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#6750A4',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  button: {
    backgroundColor: '#6750A4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});

export default ProfilePage;
