import React, { useState } from 'react';
import { View } from 'react-native';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/LoginPage';
import FormPage from './pages/FormPage';
import HistoryPage from './pages/HistoryPage';
import TabBar from './component/TabBar';

const App = () => {
  const [activeTab, setActiveTab] = useState(1); // Défaut : activeTab = 1 pour afficher la page du profil après la connexion
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <LoginPage handleLogin={handleLogin} />;
      case 1:
        return <ProfilePage />;
      case 2:
        return <FormPage />;
      case 3:
        return <HistoryPage />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!isLoggedIn && <LoginPage handleLogin={handleLogin} />}
      {isLoggedIn && <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />}
      {isLoggedIn && renderContent()}
    </View>
  );
};

export default App;