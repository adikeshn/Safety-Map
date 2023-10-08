import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../FirebaseHandler';


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
  }
    signOut = () => {
      auth.signOut()
      this.props.navigation.navigate("Login")

    }

    render(){
        return (
            <View style={styles.container}>
              <TouchableOpacity onPress={this.signOut}><Text>Sign Out</Text></TouchableOpacity>
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
