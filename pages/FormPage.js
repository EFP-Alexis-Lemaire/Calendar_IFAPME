import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';


const FormPage = () => {
  const { scheduleItem } = route.params;
  const [selectedDate, setSelectedDate] = useState(scheduleItem.date);
  const [location, setLocation] = useState(scheduleItem.location);
  const [classroom, setClassroom] = useState(scheduleItem.classroom);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    setShowCalendar(false);
  };

  const handleSave = () => {
    fetch('https://tfe-back.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedDate,
        location,
        classroom,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Alert.alert('Success', 'Les modifications ont été enregistrées avec succès.');
        navigation.navigate('HistoryPage');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Erreur', "Une erreur s'est produite lors de l'enregistrement des modifications.");
      });
  };

  const handleDelete = () => {
    fetch('https://tfe-back.onrender.com/api/auth/login', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selectedDate,
        location,
        classroom,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Alert.alert('Success', 'L\'entrée a été supprimée avec succès.');
        navigation.navigate('HistoryPage');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Erreur', "Une erreur s'est produite lors de la suppression de l'entrée.");
      });
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Date:</Text>
      <Button title="Sélectionner la date" onPress={() => setShowCalendar(true)} />
      {showCalendar && (
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={{ [selectedDate]: { selected: true } }}
        />
      )}

      <Text>Lieu:</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12 }}
      />

      <Text>Classe:</Text>
      <TextInput
        value={classroom}
        onChangeText={setClassroom}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12 }}
      />

      <Button title="Modifier" onPress={handleSave} />
      <Button title="Supprimer" onPress={handleDelete} />
    </View>
  );
};


export default FormPage;
  
