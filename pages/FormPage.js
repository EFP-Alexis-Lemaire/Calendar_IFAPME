import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FormPage = ({ route, navigation }) => {
  const [scheduleData, setScheduleData] = useState([]);
  const { token } = route.params;

  const handleRefresh = () => {
    fetch('https://tfe-back.onrender.com/api/calendar', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setScheduleData(data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetch('https://tfe-back.onrender.com/api/calendar', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setScheduleData(data))
      .catch(error => console.error(error));
  }, []);

  const handleScheduleItemClick = (scheduleItem) => {
    navigation.navigate('Change', { scheduleItem });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  const isLessonExpired = (dateString) => {
    const currentDate = new Date();
    const lessonDate = new Date(dateString);
    return lessonDate < currentDate;
  };

  const sortedUpcomingLessons = scheduleData
    .filter((scheduleItem) => !isLessonExpired(scheduleItem.lessonDate))
    .sort((a, b) => new Date(a.lessonDate) - new Date(b.lessonDate));

  const sortedCompletedLessons = scheduleData
    .filter((scheduleItem) => isLessonExpired(scheduleItem.lessonDate))
    .sort((a, b) => new Date(b.lessonDate) - new Date(a.lessonDate));

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Planning des cours</Text>          
          <TouchableOpacity onPress={handleRefresh}>
            <Text style={styles.refreshButton}>Actualiser</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Prochains cours</Text>
            <ScrollView style={styles.scrollContainer1}>
              {sortedUpcomingLessons.map((scheduleItem) => (
                <TouchableOpacity
                  key={scheduleItem.id}
                  style={styles.lessonContainer}
                  onPress={() => handleScheduleItemClick(scheduleItem)}
                >
                  <Text style={styles.date}>
                    Date du cours :
                    {formatDate(scheduleItem.lessonDate)}
                  </Text>
                  <Text style={styles.location}>Lieux : {scheduleItem.lessonLocation}</Text>
                  <Text style={styles.className}>Nom du cours : {scheduleItem.lessonName}</Text>
                  {scheduleItem.lessonNewDate && (
                    <Text style={styles.newDate}> Nouvelle date : {formatDate(scheduleItem.lessonNewDate)}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Cours terminés</Text>
            <ScrollView style={styles.scrollContainer2}>
              {sortedCompletedLessons.map((scheduleItem) => (
                <TouchableOpacity
                  key={scheduleItem.id}
                  style={styles.lessonContainer}
                  onPress={() => handleScheduleItemClick(scheduleItem)}
                  disabled={true}
                >
                  <Text style={styles.date}>
                    Date du cours :
                    {formatDate(scheduleItem.lessonDate)}
                  </Text>
                  <Text style={styles.location}>Lieux : {scheduleItem.lessonLocation}</Text>
                  <Text style={styles.className}>Nom du cours : {scheduleItem.lessonName}</Text>
                  {scheduleItem.lessonNewDate && (
                    <Text style={styles.newDate}>Nouvelle date : {formatDate(scheduleItem.lessonNewDate)}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
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
    marginTop: 150, 
    marginBottom: 110,

  },
  header: {
    backgroundColor: '#6750A4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  contentContainer: {
    padding: 15,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  scrollContainer1: {
    height: '50%'
  },
  scrollContainer2: {
    height: '25%'
  },
  lessonContainer: {
    width: '100%',
    marginBottom: 20,
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
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    marginBottom: 5,
  },
  className: {
    fontSize: 14,
    marginBottom: 5,

  },
  newDate: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'red'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  refreshButton: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
});

export default FormPage;
