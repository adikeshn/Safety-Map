import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


export default class HomeScreen extends Component {
    render(){
        return (
            <View style={styles.container}>
              <Text>This is a homescreen</Text>
              <StatusBar style="auto" />
            </View>
          );
    }
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
