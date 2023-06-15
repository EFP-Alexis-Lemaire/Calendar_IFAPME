import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import FormPage from './pages/FormPage';
import HistoryPage from './pages/HistoryPage';
import ChangePage from './pages/ChangePage';
import TabBar from './component/TabBar';
import RegistrationPage from './pages/RegistrationPage';

const Stack = createStackNavigator();

const App = () => {
  const [activeTab, setActiveTab] = useState(2);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const handleLogin = (token) => {
    setActiveTab(2)
    setIsLoggedIn(true);
    setToken(token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken('');
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          initialParams={{
            handleLoginCallback: handleLogin,
            setToken: setToken,
          }}
        >
          {(props) => (
            <LoginScreen {...props} handleLoginCallback={handleLogin} setToken={setToken} />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Registration"
          component={RegistrationPage}
          options={{ headerShown: false }}
        />

        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="Profile"
              component={ProfilePage}
              options={{ headerShown: false }}
              initialParams={{
                token: token,
                handleLogout: handleLogout,
              }}
            />
            <Stack.Screen
              name="Form"
              component={FormPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="History"
              component={HistoryPage}
              options={{ headerShown: false }}
              initialParams={{
                token: token,
              }}
            />
            <Stack.Screen
              name="Change"
              component={ChangePage}
              options={{ headerShown: false }}
              initialParams={{
                token: token,
              }}
            />
          </>
        ) : (
          <>
            {/* Reste du code pour les écrans lorsqu'un utilisateur n'est pas connecté */}
          </>
        )}
      </Stack.Navigator>
      {isLoggedIn && <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />}
    </NavigationContainer>
  );
};

export default App;