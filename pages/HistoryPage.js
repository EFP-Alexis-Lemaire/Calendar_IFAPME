import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Waiting from '../component/waiting';

const HistoryPage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      setLoading(true); 
      const response = await fetch('https://tfe-back.onrender.com/api/calendar', {
        method: 'GET',
      });
      const data = await response.json();
      setLessons(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  const deleteNewDate = async (id) => {
    try {
      const response = await fetch(`https://tfe-back.onrender.com/api/calendar/${id}/newdate`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchLessons();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = () => {
    fetchLessons();
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Historique</Text>
          <TouchableOpacity onPress={handleRefresh}>
            <Text style={styles.refreshButton}>Actualiser</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {loading ? (
            <Waiting />
          ) : (
            lessons.map((lesson) => (
              <View key={lesson.id} style={styles.lessonContainer}>
                {lesson.lessonNewDate !== null && (
                  <View>
                    <Text style={styles.lessonName}>Nom du cours: {lesson.lessonName}</Text>
                    <Text style={styles.lessonLocation}>Lieu: {lesson.lessonLocation}</Text>
                    <Text style={styles.lessonClass}>Classe: {lesson.lessonClass}</Text>
                    <Text style={styles.lessonDate}>Date d'origine: {new Date(lesson.lessonDate).toLocaleDateString()} {new Date(lesson.lessonDate).toLocaleTimeString()}</Text>
                    <Text style={[styles.lessonNewDate, lesson.lessonNewDate && styles.modifiedLessonDate]}>Date après modification: {new Date(lesson.lessonNewDate).toLocaleDateString()} {new Date(lesson.lessonNewDate).toLocaleTimeString()}</Text>
                    <TouchableOpacity onPress={() => deleteNewDate(lesson.id)}>
                      <Text style={styles.deleteButton}>Supprimer le changement d'horaire</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f9ff',
  },
  profileContainer: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#6750A4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 150, // Ajout de la marge supérieure pour le header
    marginBottom: 110
  },
  header: {
    backgroundColor: '#6750A4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    border: 10,
    borderRadius: 10,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  refreshButton: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  lessonContainer: {
    width: '90%',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#6750A4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'center', // Add this line to center the container horizontally
    justifyContent: 'center', // Add this line to center the content vertically
  },
  lessonName: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: 'bold',
  },
  lessonLocation: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  lessonClass: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  lessonDate: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  lessonNewDate: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  modifiedLessonDate: {
    color: '#6750A4',
  },
  deleteButton: {
    color: 'red',
    textDecorationLine: 'underline',
  },
});

export default HistoryPage;
