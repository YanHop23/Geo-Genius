import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/login/login'; // Ваш компонент входу
import EntireScreen from './components/login/entire';
import RegisterScreen from './components/login/register';
import HomeScreen from './components/home/home';
import Map from './components/home/map';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userId, setUserId] = useState(0); 
  const [initialRoute, setInitialRoute] = useState('home'); 


  useEffect(() => {
    if (userId === 0) {
      setInitialRoute('login');
    } else {
      setInitialRoute('home');
    }
  }, [userId]); // Залежність: зміна userId

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="login"
          options={{ title: 'Welcome' }}
        >
          {(props) => <Login {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name="home"
          initialParams={{ userId }}
          options={{ headerShown: false }}
        >
          {(props) => <HomeScreen {...props} />} 
        </Stack.Screen>

        <Stack.Screen name="map" component={Map} />
        <Stack.Screen name="entire" options={{ title: 'Welcome' }}>
          {(props) => <EntireScreen {...props} setUserId={setUserId} />}
        </Stack.Screen>

        <Stack.Screen name="register" options={{ title: 'Welcome' }}>
          {(props) => <RegisterScreen {...props} setUserId={setUserId} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
