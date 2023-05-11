import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const TabBar = ({ activeTab, setActiveTab }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
      <TouchableOpacity onPress={() => setActiveTab(1)} style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ color: activeTab === 1 ? 'blue' : 'black' }}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab(2)} style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ color: activeTab === 2 ? 'blue' : 'black' }}>Formulaire</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab(3)} style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ color: activeTab === 3 ? 'blue' : 'black' }}>Historique</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;