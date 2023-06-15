import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const ChangePage = ({ route, navigation }) => {
  const { scheduleItem } = route.params;
  const [selectedDate, setSelectedDate] = useState(scheduleItem.date);

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
  };

  const backToForm = () => {
    navigation.navigate('Form');
  };


  const handleSave = () => {
    fetch(`https://tfe-back.onrender.com/api/calendar/${scheduleItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lessonNewDate: selectedDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Alert.alert('Succès', 'Les modifications ont été enregistrées avec succès.');
        navigation.navigate('Form');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Erreur', "Une erreur s'est produite lors de l'enregistrement des modifications.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nouvelle Date</Text>
      <Calendar style={styles.calendar}
        onDayPress={handleDateSelect}
        markedDates={{ [selectedDate]: { selected: true } }}
      />
      <View style={styles.buttonLayout}>
        <TouchableOpacity style={styles.buttonReturn} onPress={backToForm} >
          <Text style={styles.buttonTextReturn}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSave} >
          <Text style={styles.buttonText}>Modifier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#6750A4',
    marginBottom: 5,
  },
  buttonLayout: {
    flexDirection: 'row',
  },
  buttonReturn: {
    borderStyle: 'solid', 
    borderWidth: 2,
    borderColor: '#6750A4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#6750A4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
  },
  buttonTextReturn: {
    color: '#6750A4',
  },
});

export default ChangePage;
