import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const TabBar = ({ activeTab, setActiveTab }) => {
  const navigation = useNavigation();

  const handleTabPress = (tabIndex, screenName) => {
    setActiveTab(tabIndex);
    navigation.navigate(screenName);
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
      <TouchableOpacity onPress={() => handleTabPress(1, 'Profile')} style={{ flex: 1, alignItems: 'center' }}>
        <Icon name="user" size={20} color={activeTab === 1 ? 'blue' : 'black'} />
        <Text style={{ color: activeTab === 1 ? 'blue' : 'black' }}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress(2, 'Form')} style={{ flex: 1, alignItems: 'center' }}>
        <Icon name="pencil" size={20} color={activeTab === 2 ? 'blue' : 'black'} />
        <Text style={{ color: activeTab === 2 ? 'blue' : 'black' }}>Formulaire</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress(3, 'History')} style={{ flex: 1, alignItems: 'center' }}>
        <Icon name="history" size={20} color={activeTab === 3 ? 'blue' : 'black'} />
        <Text style={{ color: activeTab === 3 ? 'blue' : 'black' }}>Historique</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;