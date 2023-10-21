import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import Report from './screens/Report';
import HeatMap from './screens/HeatMap';
const Stack = createNativeStackNavigator();

export default class App extends Component {

  // Initialize Firebase
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          gestureEnabled: false
        }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} initialParams={{sentSuccess: false}} />
          <Stack.Screen name="Report" component={Report} />
          <Stack.Screen name="HeatMap" component={HeatMap} />


        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}