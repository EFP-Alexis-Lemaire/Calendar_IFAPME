import React, { useState } from 'react';
import { View, Text, Button, Alert, TimePickerAndroid } from 'react-native';
import { Calendar } from 'react-native-calendars';

const ChangePage = ({ route, navigation }) => {
  const { scheduleItem } = route.params;
  const [selectedDate, setSelectedDate] = useState(scheduleItem.date);
  const [selectedTime, setSelectedTime] = useState(scheduleItem.time);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    setShowCalendar(false);
  };

  const handleTimeSelect = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        is24Hour: true,
      });

      if (action !== TimePickerAndroid.dismissedAction) {
        const formattedHour = String(hour).padStart(2, '0');
        const formattedMinute = String(minute).padStart(2, '0');
        setSelectedTime(`${formattedHour}:${formattedMinute}`);
      }
    } catch (error) {
      console.error(error);
    }
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
      <Text style={{ marginTop: 8 }}>{selectedTime}</Text>

      <Button title="Modifier" onPress={handleSave} />
    </View>
  );
};

export default ChangePage;
