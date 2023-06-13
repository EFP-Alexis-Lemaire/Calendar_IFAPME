import React, { useState } from 'react';
import { View, Text, Button, Alert, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DatePicker from '@react-native-community/datetimepicker';

const ChangePage = ({ route, navigation }) => {
  const { scheduleItem } = route.params;
  const [selectedDate, setSelectedDate] = useState(scheduleItem.date);
  const [selectedTime, setSelectedTime] = useState(scheduleItem.time || '');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    setShowCalendar(false);
  };

  const handleTimeSelect = () => {
    setShowTimePicker(true);
  };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      const formattedTime = new Date(selectedTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setSelectedTime(formattedTime);
    }

    setShowTimePicker(false);
  };

  const handleSave = () => {
    fetch(`https://tfe-back.onrender.com/api/calendar/${scheduleItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lessonNewDate: selectedDate,
        lessonNewTime: selectedTime,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Alert.alert('Succès', 'Les modifications ont été enregistrées avec succès.');
        navigation.navigate('HistoryPage');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Erreur', "Une erreur s'est produite lors de l'enregistrement des modifications.");
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

      <Text>Heure:</Text>
      <Button title="Sélectionner l'heure" onPress={handleTimeSelect} />
      {showTimePicker && (
        <DatePicker
          value={new Date()}
          mode="time"
          is24Hour
          display="default"
          onChange={handleTimeChange}
        />
      )}
      {selectedTime ? (
        <Text style={{ marginTop: 8 }}>{selectedTime}</Text>
      ) : (
        <Text style={{ marginTop: 8 }}>Aucune heure sélectionnée</Text>
      )}

      <Button title="Modifier" onPress={handleSave} />
    </View>
  );
};

export default ChangePage;
