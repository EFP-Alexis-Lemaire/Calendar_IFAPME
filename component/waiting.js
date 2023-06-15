import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Waiting = () => {
  return (
    <View style={styles.container}>
        <Text>CHARGEMENT</Text>
      <AntDesign name="loading1" size={24} color="#6750A4" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Waiting;
