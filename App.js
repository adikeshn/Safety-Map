import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
const Stack = createNativeStackNavigator();

export default class App extends Component {

  // Initialize Firebase
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}